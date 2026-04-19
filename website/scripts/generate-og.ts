#!/usr/bin/env bun
import { createHash } from 'node:crypto';
import { access, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import matter from 'gray-matter';
import satori from 'satori';

const REPO_ROOT = join(import.meta.dir, '..', '..');
const OUT_DIR = join(import.meta.dir, '..', 'public', 'og');
const CACHE_FILE = join(OUT_DIR, '.cache.json');

interface Talk {
  slug: string;
  title: string;
  event: string;
  date: string;
  locationCity: string;
  locationCountry: string;
  hash: string;
}

async function loadFont(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`font fetch failed: ${url}`);
  return await res.arrayBuffer();
}

async function exists(p: string): Promise<boolean> {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function collectTalks(): Promise<Talk[]> {
  const years = await readdir(REPO_ROOT, { withFileTypes: true });
  const out: Talk[] = [];
  for (const y of years) {
    if (!y.isDirectory() || !/^\d{4}$/.test(y.name)) continue;
    const ydir = join(REPO_ROOT, y.name);
    const entries = await readdir(ydir, { withFileTypes: true });
    for (const e of entries) {
      if (!e.isDirectory() || !/^\d{4}-\d{2}-\d{2}-/.test(e.name)) continue;
      const path = join(ydir, e.name, 'README.md');
      const content = await readFile(path, 'utf8');
      const { data } = matter(content);
      const hash = createHash('sha1').update(JSON.stringify(data)).digest('hex').slice(0, 12);
      out.push({
        slug: e.name,
        title: String(data.title),
        event: String(data.event),
        date:
          typeof data.date === 'string'
            ? data.date
            : new Date(data.date as Date).toISOString().slice(0, 10),
        // biome-ignore lint/suspicious/noExplicitAny: loose shape from frontmatter
        locationCity: (data.location as any)?.city ?? '',
        // biome-ignore lint/suspicious/noExplicitAny: loose shape from frontmatter
        locationCountry: (data.location as any)?.country ?? '',
        hash,
      });
    }
  }
  return out;
}

function buildTree(talk: Talk) {
  const d = new Date(talk.date);
  const dateFmt = d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  return {
    type: 'div',
    props: {
      style: {
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #6D0F1A 0%, #4A0A12 100%)',
        color: '#F4EDE0',
        fontFamily: 'Inter',
        padding: '64px',
        justifyContent: 'space-between',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              fontSize: 24,
              letterSpacing: 4,
              textTransform: 'uppercase',
              opacity: 0.75,
            },
            children: 'Juraci Paixão Kröhling',
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', gap: 24 },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: 'Fraunces',
                    fontSize: 72,
                    lineHeight: 1.05,
                    fontWeight: 700,
                  },
                  children: talk.title,
                },
              },
              {
                type: 'div',
                props: { style: { fontSize: 28, opacity: 0.85 }, children: talk.event },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              fontSize: 22,
              opacity: 0.8,
            },
            children: [
              {
                type: 'div',
                props: {
                  children: `${dateFmt} · ${talk.locationCity}, ${talk.locationCountry}`,
                },
              },
              { type: 'div', props: { children: 'kroehling.de' } },
            ],
          },
        },
      ],
    },
  };
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const cache: Record<string, string> = (await exists(CACHE_FILE))
    ? JSON.parse(await readFile(CACHE_FILE, 'utf8'))
    : {};
  const talks = await collectTalks();

  let fraunces: ArrayBuffer;
  let inter: ArrayBuffer;
  try {
    [fraunces, inter] = await Promise.all([
      loadFont(
        'https://raw.githubusercontent.com/fontsource/font-files/main/fonts/google/fraunces/files/fraunces-latin-700-normal.woff',
      ),
      loadFont(
        'https://raw.githubusercontent.com/fontsource/font-files/main/fonts/google/inter/files/inter-latin-600-normal.woff',
      ),
    ]);
  } catch (e) {
    console.warn(
      `[og] font fetch failed (${e instanceof Error ? e.message : e}); skipping OG generation`,
    );
    return;
  }

  let generated = 0;
  let cached = 0;
  for (const talk of talks) {
    const outPath = join(OUT_DIR, `${talk.slug}.png`);
    if (cache[talk.slug] === talk.hash && (await exists(outPath))) {
      cached++;
      continue;
    }
    // biome-ignore lint/suspicious/noExplicitAny: satori accepts a custom vdom shape
    const svg = await satori(buildTree(talk) as any, {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Fraunces', data: fraunces, weight: 700, style: 'normal' },
        { name: 'Inter', data: inter, weight: 600, style: 'normal' },
      ],
    });
    const png = new Resvg(svg).render().asPng();
    await writeFile(outPath, png);
    cache[talk.slug] = talk.hash;
    generated++;
  }
  await writeFile(CACHE_FILE, `${JSON.stringify(cache, null, 2)}\n`);
  console.log(`[og] generated: ${generated}, cached: ${cached}`);
}

if (import.meta.main) {
  try {
    await main();
  } catch (e) {
    console.warn(
      `[og] failed: ${e instanceof Error ? e.message : e}. Build continues without new OG images.`,
    );
  }
}

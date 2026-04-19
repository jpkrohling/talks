#!/usr/bin/env bun
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';

const OUT_DIR = join(import.meta.dir, '..', 'public', 'og');

async function loadFont(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(url);
  return await res.arrayBuffer();
}

const fraunces = await loadFont(
  'https://raw.githubusercontent.com/fontsource/font-files/main/fonts/google/fraunces/files/fraunces-latin-700-normal.woff',
);
const inter = await loadFont(
  'https://raw.githubusercontent.com/fontsource/font-files/main/fonts/google/inter/files/inter-latin-600-normal.woff',
);

interface PageOg {
  name: string; // filename (no extension)
  eyebrow: string; // top label
  headline: string; // big headline
  tagline: string; // secondary line
}

const PAGES: PageOg[] = [
  {
    name: 'default',
    eyebrow: 'Juraci Paixão Kröhling',
    headline: 'kroehling.de',
    tagline: 'CEO of OllyGarden · OpenTelemetry Governance · Speaker',
  },
  {
    name: 'home',
    eyebrow: 'Juraci Paixão Kröhling',
    headline: 'Observability is a garden.',
    tagline: 'CEO of OllyGarden · OpenTelemetry Governance',
  },
  {
    name: 'cv',
    eyebrow: 'Juraci Paixão Kröhling',
    headline: 'Curriculum Vitae',
    tagline: 'Experience · Patents · Publications · Education',
  },
  {
    name: 'talks',
    eyebrow: 'Juraci Paixão Kröhling',
    headline: '62 conference talks',
    tagline: 'KubeCon · FOSDEM · GopherCon · DevOpsDays · Devoxx',
  },
  {
    name: 'projects',
    eyebrow: 'Juraci Paixão Kröhling',
    headline: 'Projects & Affiliations',
    tagline: 'OllyGarden · OpenTelemetry · Jaeger · OCB · OTel Operator',
  },
  {
    name: 'press',
    eyebrow: 'Juraci Paixão Kröhling',
    headline: 'Press & Media Kit',
    tagline: 'Bios (EN · DE · PT) · Headshots · One-liner',
  },
  {
    name: 'badges',
    eyebrow: 'Juraci Paixão Kröhling',
    headline: 'Verified Badges',
    tagline: 'Credly · OpenTelemetry · Kubernetes · Cloud Native',
  },
];

function buildTree(page: PageOg) {
  return {
    type: 'div',
    props: {
      style: {
        width: '1200px',
        height: '630px',
        background: 'linear-gradient(135deg, #6D0F1A 0%, #4A0A12 100%)',
        color: '#F4EDE0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 72,
        fontFamily: 'Inter',
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
            children: page.eyebrow,
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', gap: 16 },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: 'Fraunces',
                    fontSize: 96,
                    fontWeight: 700,
                    lineHeight: 1.05,
                    letterSpacing: '-0.02em',
                  },
                  children: page.headline,
                },
              },
              {
                type: 'div',
                props: {
                  style: { fontSize: 28, opacity: 0.85 },
                  children: page.tagline,
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: { fontSize: 22, opacity: 0.7 },
            children: 'kroehling.de',
          },
        },
      ],
    },
  };
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  for (const page of PAGES) {
    // biome-ignore lint/suspicious/noExplicitAny: satori accepts a custom vdom shape
    const svg = await satori(buildTree(page) as any, {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Fraunces', data: fraunces, weight: 700, style: 'normal' },
        { name: 'Inter', data: inter, weight: 600, style: 'normal' },
      ],
    });
    const out = join(OUT_DIR, `${page.name}.png`);
    await writeFile(out, new Resvg(svg).render().asPng());
    console.log(`Wrote ${out}`);
  }
}

await main();

#!/usr/bin/env bun
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';

const OUT = join(import.meta.dir, '..', 'public', 'og', 'default.png');

async function loadFont(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(url);
  return await res.arrayBuffer();
}

const fraunces = await loadFont(
  'https://raw.githubusercontent.com/fontsource/font-files/main/fonts/google/fraunces/files/fraunces-latin-700-normal.woff',
);

const tree = {
  type: 'div',
  props: {
    style: {
      width: '1200px',
      height: '630px',
      background: 'linear-gradient(135deg, #6D0F1A, #4A0A12)',
      color: '#F4EDE0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 64,
      fontFamily: 'Fraunces',
    },
    children: [
      {
        type: 'div',
        props: {
          style: { fontSize: 96, fontWeight: 700, lineHeight: 1.05 },
          children: 'Juraci Paixão Kröhling',
        },
      },
      {
        type: 'div',
        props: {
          style: { fontSize: 32, opacity: 0.8, marginTop: 16 },
          children: 'Talks · OpenTelemetry · Observability',
        },
      },
    ],
  },
};

// biome-ignore lint/suspicious/noExplicitAny: satori accepts a custom vdom shape
const svg = await satori(tree as any, {
  width: 1200,
  height: 630,
  fonts: [{ name: 'Fraunces', data: fraunces, weight: 700, style: 'normal' }],
});
await mkdir(join(import.meta.dir, '..', 'public', 'og'), { recursive: true });
await writeFile(OUT, new Resvg(svg).render().asPng());
console.log(`Wrote ${OUT}`);

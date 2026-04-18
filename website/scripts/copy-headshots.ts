#!/usr/bin/env bun
import { copyFile, mkdir, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const SRC = join(import.meta.dir, '..', '..', 'headshots');
const DEST = join(import.meta.dir, '..', 'public', 'press-assets');

async function main() {
  await mkdir(DEST, { recursive: true });
  const files = await readdir(SRC);
  let n = 0;
  for (const f of files) {
    await copyFile(join(SRC, f), join(DEST, f));
    n++;
  }
  console.log(`Copied ${n} headshot files`);
}

await main();

#!/usr/bin/env bun
import { access, copyFile, mkdir, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const REPO_ROOT = join(import.meta.dir, '..', '..');
const DEST = join(import.meta.dir, '..', 'public', 'talks');

async function exists(p: string): Promise<boolean> {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  let copied = 0;
  const years = await readdir(REPO_ROOT, { withFileTypes: true });
  for (const y of years) {
    if (!y.isDirectory() || !/^\d{4}$/.test(y.name)) continue;
    const yearDir = join(REPO_ROOT, y.name);
    const talks = await readdir(yearDir, { withFileTypes: true });
    for (const t of talks) {
      if (!t.isDirectory() || !/^\d{4}-\d{2}-\d{2}-/.test(t.name)) continue;
      const slidesSrc = join(yearDir, t.name, 'slides.pdf');
      if (!(await exists(slidesSrc))) continue;
      const slidesDest = join(DEST, t.name, 'slides.pdf');
      await mkdir(join(DEST, t.name), { recursive: true });
      await copyFile(slidesSrc, slidesDest);
      copied++;
    }
  }
  console.log(`Copied ${copied} slide PDFs to public/talks/`);
}

await main();

#!/usr/bin/env bun
import { access, copyFile, mkdir, readFile, readdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import matter from 'gray-matter';

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

function isAbsoluteUrl(s: string): boolean {
  return /^https?:\/\//.test(s);
}

async function main() {
  // Clean destination so stale/renamed files don't linger.
  await rm(DEST, { recursive: true, force: true });

  let copied = 0;
  const years = await readdir(REPO_ROOT, { withFileTypes: true });
  for (const y of years) {
    if (!y.isDirectory() || !/^\d{4}$/.test(y.name)) continue;
    const yearDir = join(REPO_ROOT, y.name);
    const talks = await readdir(yearDir, { withFileTypes: true });
    for (const t of talks) {
      if (!t.isDirectory() || !/^\d{4}-\d{2}-\d{2}-/.test(t.name)) continue;
      const talkDir = join(yearDir, t.name);
      const readmePath = join(talkDir, 'README.md');
      if (!(await exists(readmePath))) continue;

      const raw = await readFile(readmePath, 'utf8');
      const { data } = matter(raw);
      const slides = typeof data.slides === 'string' ? data.slides : null;
      const recording = typeof data.recording === 'string' ? data.recording : null;

      const assets: string[] = [];
      if (slides) assets.push(slides);
      if (recording && !isAbsoluteUrl(recording)) assets.push(recording);

      for (const asset of assets) {
        const src = join(talkDir, asset);
        if (!(await exists(src))) continue;
        const destFile = join(DEST, t.name, asset);
        await mkdir(join(DEST, t.name), { recursive: true });
        await copyFile(src, destFile);
        copied++;
      }
    }
  }
  console.log(`Copied ${copied} talk assets (slides + recordings) to public/talks/`);
}

await main();

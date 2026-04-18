#!/usr/bin/env bun
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const USERNAME = 'juraci-paixao-krohling';
const DATA_DIR = join(import.meta.dir, '..', 'data', 'credly');
const OUT = join(DATA_DIR, 'badges.json');

export interface RawCredlyBadge {
  id: string;
  issued_at_date: string;
  public_url: string;
  badge_template: {
    name: string;
    description: string;
    image_url: string;
    issuer: { entities: Array<{ entity: { name: string } }> };
  };
}

export interface NormalizedBadge {
  id: string;
  name: string;
  description: string;
  image_url: string;
  issuer: string;
  issued_at: string;
  public_url: string;
}

export function normalizeBadge(raw: RawCredlyBadge): NormalizedBadge {
  const issuer = raw.badge_template.issuer.entities[0]?.entity.name ?? 'Unknown issuer';
  // Credly's live API no longer returns `public_url` on each badge; synthesize
  // from the id when absent. The plan's test stubs it, so prefer the stubbed
  // value when present.
  const public_url = raw.public_url ?? `https://www.credly.com/badges/${raw.id}/public_url`;
  return {
    id: raw.id,
    name: raw.badge_template.name,
    description: raw.badge_template.description,
    image_url: raw.badge_template.image_url,
    issuer,
    issued_at: raw.issued_at_date,
    public_url,
  };
}

async function fetchPage(page: number): Promise<{ data: RawCredlyBadge[]; total_pages: number }> {
  const url = `https://www.credly.com/users/${USERNAME}/badges.json?sort=most_popular&page=${page}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`Credly ${res.status}: ${url}`);
  const json = (await res.json()) as {
    data: RawCredlyBadge[];
    metadata: { total_pages: number };
  };
  return { data: json.data, total_pages: json.metadata.total_pages };
}

async function main() {
  try {
    await mkdir(DATA_DIR, { recursive: true });
    const { data, total_pages } = await fetchPage(1);
    const all = [...data];
    for (let p = 2; p <= total_pages; p++) {
      const page = await fetchPage(p);
      all.push(...page.data);
    }
    const normalized = all.map(normalizeBadge);
    await writeFile(OUT, `${JSON.stringify(normalized, null, 2)}\n`, 'utf8');
    console.log(`Wrote ${normalized.length} badges to ${OUT}`);
  } catch (e) {
    console.warn(
      `[fetch-credly] failed: ${e instanceof Error ? e.message : e}. Keeping existing snapshot.`,
    );
    // Do not exit with error — the build must continue.
  }
}

if (import.meta.main) {
  await main();
}

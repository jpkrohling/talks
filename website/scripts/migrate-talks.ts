#!/usr/bin/env bun
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import matter from 'gray-matter';
import { stringify as yamlStringify } from 'yaml';

const REPO_ROOT = join(import.meta.dir, '..', '..');

interface Location {
  city: string;
  country: string;
  flag: string;
}
interface CoSpeaker {
  name: string;
  company: string;
}
interface Frontmatter {
  title: string;
  event: string;
  event_slug: string;
  date: string;
  location: Location;
  event_link?: string;
  recording?: string;
  slides?: string;
  tags: string[];
  featured?: boolean;
  co_speakers?: CoSpeaker[];
}

export interface ParseResult {
  alreadyMigrated: boolean;
  frontmatter: Frontmatter;
  body: string;
}

const MONTHS: Record<string, string> = {
  january: '01',
  jan: '01',
  february: '02',
  feb: '02',
  march: '03',
  mar: '03',
  april: '04',
  apr: '04',
  may: '05',
  june: '06',
  jun: '06',
  july: '07',
  jul: '07',
  august: '08',
  aug: '08',
  september: '09',
  sep: '09',
  sept: '09',
  october: '10',
  oct: '10',
  november: '11',
  nov: '11',
  december: '12',
  dec: '12',
};

function extractTableField(md: string, field: string): string | undefined {
  const re = new RegExp(`\\|\\s*${field}\\s*\\|\\s*([^\\n|]+?)\\s*\\|`, 'i');
  const m = md.match(re);
  return m ? m[1].trim() : undefined;
}

function parseLinkCell(v: string): { text: string; href?: string } {
  const m = v.match(/^\[(.+)\]\((.+)\)$/);
  if (m) return { text: m[1], href: m[2] };
  return { text: v.trim() };
}

function parseDate(whenRaw: string): string {
  // Accepts e.g. "March 26, 2026", "Apr 18, 2023", "February 1st, 2023", "June 06, 2024"
  const cleaned = whenRaw.replace(/(\d+)(st|nd|rd|th)/i, '$1').trim();
  const m = cleaned.match(/^(\w+)\.?\s+(\d{1,2}),\s+(\d{4})$/);
  if (!m) throw new Error(`Cannot parse date: ${whenRaw}`);
  const mm = MONTHS[m[1].toLowerCase()];
  if (!mm) throw new Error(`Unknown month: ${m[1]} (from "${whenRaw}")`);
  return `${m[3]}-${mm}-${m[2].padStart(2, '0')}`;
}

/**
 * Parses a legacy "Where" cell into city/country/flag.
 *
 * Supported shapes (flag may be a regional-indicator sequence or a black-flag
 * tag sequence like 🏴󠁧󠁢󠁳󠁣󠁴󠁿):
 *   "Amsterdam, Netherlands 🇳🇱"            -> city="Amsterdam", country="Netherlands"
 *   "Berlin, 🇩🇪"                            -> city="Berlin", country="" (flag only)
 *   "Atlanta, GA, 🇺🇸"                       -> city="Atlanta", country="GA" (state treated as country line)
 *   "Online, 🌍" / "Virtual, 🌍"             -> city="Online"/"Virtual", country=""
 *   "Online 🌐"                              -> city="Online", country=""
 *   "Florianópolis, SC, 🇧🇷 (Virtual)"       -> trailing "(Virtual)" stripped; city="Florianópolis", country="SC"
 *   "Virtual, St. Petersburg, 🇷🇺"           -> city="Virtual", country="St. Petersburg"
 */
function parseLocation(whereRaw: string): Location {
  let trimmed = whereRaw.trim();

  // Strip trailing parenthetical notes like "(Virtual)".
  trimmed = trimmed.replace(/\s*\([^)]*\)\s*$/, '').trim();

  // Flag detection: try regional-indicator pair first (2x U+1F1E6–U+1F1FF),
  // then black-flag + tag sequence (U+1F3F4 followed by tag chars U+E0020-E007F),
  // then single emoji (🌍, 🌐, etc.).
  let flag = '';
  const regionalIndicator = trimmed.match(/[\u{1F1E6}-\u{1F1FF}]{2}$/u);
  const blackFlagTag = trimmed.match(/\u{1F3F4}[\u{E0020}-\u{E007F}]+$/u);
  const singleEmoji = trimmed.match(/(?:\p{Extended_Pictographic}\uFE0F?|[\u{1F300}-\u{1FAFF}])$/u);
  if (blackFlagTag) {
    flag = blackFlagTag[0];
  } else if (regionalIndicator) {
    flag = regionalIndicator[0];
  } else if (singleEmoji) {
    flag = singleEmoji[0];
  }

  let noFlag = flag ? trimmed.slice(0, -flag.length).trim() : trimmed;
  // Strip any trailing parenthetical note that appeared *before* the flag
  // (e.g. "Online (Virtual) 🌐" -> noFlag is "Online (Virtual)").
  noFlag = noFlag.replace(/\s*\([^)]*\)\s*$/, '').trim();
  // Strip trailing comma if present
  const cleaned = noFlag.replace(/,\s*$/, '').trim();
  const parts = cleaned
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  const city = parts[0] ?? cleaned;
  const country = parts.slice(1).join(', ');
  return { city, country, flag };
}

function extractCoSpeakers(md: string): CoSpeaker[] | undefined {
  const m = md.match(/(?:^|\n)##\s+Co-speakers?\s*\n([\s\S]*?)(?=\n##\s|\n*$)/i);
  if (!m) return undefined;
  const lines = m[1]
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.startsWith('*'));
  const speakers = lines
    .map((l) => l.replace(/^\*\s*/, ''))
    .map((l) => {
      const [name, ...companyParts] = l.split(',').map((s) => s.trim());
      const company = companyParts.join(', ');
      return { name, company };
    })
    .filter((s) => s.name);
  return speakers.length > 0 ? speakers : undefined;
}

function stripLegacySections(md: string): string {
  // Remove the leading `# Title` line
  let out = md.replace(/^#\s+[^\n]+\n+/, '');
  // Remove the metadata table (from first `|` line through the final `|`-terminated row).
  // We match the longest contiguous run of lines starting with `|`.
  out = out.replace(/^(\|[^\n]*\n)+/m, '');
  // Remove any Co-speakers section
  out = out.replace(/(?:^|\n)##\s+Co-speakers?\s*\n[\s\S]*?(?=\n##\s|$)/i, '');
  return `${out.trim()}\n`;
}

function deriveEventSlug(event: string): string {
  return event
    .toLowerCase()
    .replace(/[+]/g, 'and')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function parseLegacyReadme(content: string, slug: string): ParseResult {
  const parsed = matter(content);
  if (Object.keys(parsed.data).length > 0) {
    return {
      alreadyMigrated: true,
      frontmatter: parsed.data as Frontmatter,
      body: parsed.content,
    };
  }

  const titleMatch = content.match(/^#\s+(.+?)\s*$/m);
  if (!titleMatch) throw new Error(`No title h1 in ${slug}`);
  const title = titleMatch[1].trim();

  const event = extractTableField(content, 'Event');
  const when = extractTableField(content, 'When');
  const where = extractTableField(content, 'Where');
  // "Recording" is the canonical label, but some old READMEs use "Video".
  const recording = extractTableField(content, 'Recording') ?? extractTableField(content, 'Video');
  const slides = extractTableField(content, 'Slides');
  const link = extractTableField(content, 'Link');

  if (!event || !when || !where) {
    throw new Error(
      `Missing required fields in ${slug}: event=${!!event} when=${!!when} where=${!!where}`,
    );
  }

  const recCell = recording ? parseLinkCell(recording) : undefined;
  const slidesCell = slides ? parseLinkCell(slides) : undefined;
  const linkCell = link ? parseLinkCell(link) : undefined;

  const frontmatter: Frontmatter = {
    title,
    event,
    event_slug: deriveEventSlug(event),
    date: parseDate(when),
    location: parseLocation(where),
    tags: [],
  };

  // Treat sentinel strings ("None", "Missing") as absent.
  const isAbsent = (text: string | undefined) =>
    !text || /^(none|missing|n\/a)$/i.test(text.trim());

  if (recCell?.href && !isAbsent(recCell.text)) {
    frontmatter.recording = recCell.href;
  }
  if (slidesCell?.href && !isAbsent(slidesCell.text)) {
    frontmatter.slides = slidesCell.href;
  }
  if (linkCell?.href && !isAbsent(linkCell.text)) {
    frontmatter.event_link = linkCell.href;
  }

  const coSpeakers = extractCoSpeakers(content);
  if (coSpeakers) frontmatter.co_speakers = coSpeakers;

  const body = stripLegacySections(content);

  return { alreadyMigrated: false, frontmatter, body };
}

async function findTalkDirs(): Promise<string[]> {
  const dirs: string[] = [];
  const years = await readdir(REPO_ROOT, { withFileTypes: true });
  for (const y of years) {
    if (!y.isDirectory()) continue;
    if (!/^\d{4}$/.test(y.name)) continue;
    const yearDir = join(REPO_ROOT, y.name);
    const entries = await readdir(yearDir, { withFileTypes: true });
    for (const e of entries) {
      if (e.isDirectory() && /^\d{4}-\d{2}-\d{2}-/.test(e.name)) {
        dirs.push(join(yearDir, e.name));
      }
    }
  }
  return dirs.sort();
}

async function main(): Promise<void> {
  const dry = process.argv.includes('--dry');
  const dirs = await findTalkDirs();
  let migrated = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (const dir of dirs) {
    const slug = dir.split('/').pop()!;
    const readmePath = join(dir, 'README.md');
    try {
      const content = await readFile(readmePath, 'utf8');
      const result = parseLegacyReadme(content, slug);
      if (result.alreadyMigrated) {
        skipped++;
        continue;
      }
      const frontmatterYaml = yamlStringify(result.frontmatter, { lineWidth: 0 }).trimEnd();
      const out = `---\n${frontmatterYaml}\n---\n\n${result.body}`;
      if (dry) {
        console.log(`\n--- ${slug} ---\n${out.slice(0, 600)}...`);
      } else {
        await writeFile(readmePath, out, 'utf8');
      }
      migrated++;
    } catch (e) {
      errors.push(`${slug}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  console.log(
    `\n${dry ? '[DRY] ' : ''}Migrated: ${migrated}, Skipped (already migrated): ${skipped}`,
  );
  if (errors.length) {
    console.error(`\nErrors (${errors.length}):`);
    for (const err of errors) console.error(`  - ${err}`);
    process.exit(1);
  }
}

if (import.meta.main) {
  await main();
}

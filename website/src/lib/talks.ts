import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';

export type Talk = CollectionEntry<'talks'>;

export async function getAllTalks(): Promise<Talk[]> {
  const talks = await getCollection('talks');
  return talks.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getFeaturedTalks(): Promise<Talk[]> {
  const all = await getAllTalks();
  return all.filter((t) => t.data.featured);
}

export function getYearGroups(talks: Talk[]): Array<{ year: number; talks: Talk[] }> {
  const groups = new Map<number, Talk[]>();
  for (const t of talks) {
    const y = t.data.date.getFullYear();
    if (!groups.has(y)) groups.set(y, []);
    groups.get(y)!.push(t);
  }
  return [...groups.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, talks]) => ({ year, talks }));
}

export function talkUrl(slug: string): string {
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  return `${base}talks/${slug}/`;
}

export function allTags(talks: Talk[]): Array<{ tag: string; count: number }> {
  const counts = new Map<string, number>();
  for (const t of talks) {
    for (const tag of t.data.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag, count]) => ({ tag, count }));
}

export function allEvents(
  talks: Talk[],
): Array<{ event_slug: string; event: string; count: number }> {
  const byEvent = new Map<string, { event: string; count: number }>();
  for (const t of talks) {
    const prev = byEvent.get(t.data.event_slug) ?? { event: t.data.event, count: 0 };
    prev.count++;
    byEvent.set(t.data.event_slug, prev);
  }
  return [...byEvent.entries()]
    .sort((a, b) => b[1].count - a[1].count)
    .map(([event_slug, v]) => ({ event_slug, event: v.event, count: v.count }));
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function formatDateShort(d: Date): string {
  return d.toLocaleDateString('en-US', { year: '2-digit', month: 'short' });
}

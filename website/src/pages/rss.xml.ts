import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getAllTalks } from '../lib/talks';

export async function GET(context: APIContext) {
  const talks = await getAllTalks();
  return rss({
    title: 'Juraci Paixão Kröhling — Talks',
    description: 'Conference talks by Juraci Paixão Kröhling.',
    site: context.site!,
    items: talks.map((t) => ({
      title: t.data.title,
      pubDate: t.data.date,
      description: `${t.data.event} · ${t.data.location.city}, ${t.data.location.country}`,
      link: `/talks/${t.id}/`,
      categories: t.data.tags,
    })),
  });
}

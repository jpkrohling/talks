import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { formatPlace } from '../lib/place';
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
      description: `${t.data.event} · ${formatPlace(t.data.location)}`,
      link: `/talks/${t.id}/`,
      categories: t.data.tags,
    })),
  });
}

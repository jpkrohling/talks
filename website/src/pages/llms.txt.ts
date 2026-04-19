import type { APIContext } from 'astro';
import { allTags, formatDate, getAllTalks } from '../lib/talks';

export async function GET(context: APIContext) {
  const talks = await getAllTalks();
  const tags = allTags(talks);
  const site = context.site!.toString().replace(/\/$/, '');
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const origin = `${site}${base}`;

  const lines: string[] = [];
  lines.push('# Juraci Paixão Kröhling');
  lines.push('');
  lines.push(
    '> CEO of OllyGarden, OpenTelemetry Governance Committee member, emeritus maintainer of the OpenTelemetry Collector and Jaeger. Creator of the Jaeger Operator, OpenTelemetry Operator, OpenTelemetry Collector Builder (OCB), and load-balancing exporter. Co-founder of Telemetry Drops, an OpenTelemetry training program. Speaker on observability, distributed tracing, and related open-source topics.',
  );
  lines.push('');
  lines.push('## Key pages');
  lines.push(`- [Home](${origin}/): identity, featured talks, projects`);
  lines.push(`- [Talks archive](${origin}/talks/): ${talks.length} conference talks`);
  lines.push(`- [Topics](${origin}/topics/): ${tags.length} speaking topics`);
  lines.push(
    `- [Projects](${origin}/projects/): OllyGarden, OpenTelemetry, Telemetry Drops, Jaeger Operator, OTel Operator, OCB, load-balancing exporter; emeritus: OTel Collector, Jaeger`,
  );
  lines.push(`- [Press / media kit](${origin}/press/): 3-language bios, headshots`);
  lines.push(`- [CV](${origin}/cv/): experience, patents, publications, education`);
  lines.push(`- [Credly badges](${origin}/badges/): verified credentials`);
  lines.push('');
  lines.push('## Topics');
  for (const { tag, count } of tags) {
    lines.push(`- [${tag}](${origin}/topics/${tag}/) — ${count} talk${count === 1 ? '' : 's'}`);
  }
  lines.push('');
  lines.push('## All talks');
  for (const t of talks) {
    const date = formatDate(t.data.date);
    const loc = `${t.data.location.city}, ${t.data.location.country}`;
    lines.push(
      `- [${t.data.title}](${origin}/talks/${t.id}/) — ${t.data.event} · ${date} · ${loc}${t.data.tags.length ? ` · tags: ${t.data.tags.join(', ')}` : ''}`,
    );
  }
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

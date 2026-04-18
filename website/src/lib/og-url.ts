export function talkOgUrl(slug: string, site: URL): string {
  const origin = site.toString().replace(/\/$/, '');
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${origin}${base}/og/${slug}.png`;
}

export function siteOgUrl(site: URL): string {
  const origin = site.toString().replace(/\/$/, '');
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${origin}${base}/og/default.png`;
}

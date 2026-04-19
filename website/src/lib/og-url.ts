function ogBase(site: URL): string {
  const origin = site.toString().replace(/\/$/, '');
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${origin}${base}/og`;
}

export function talkOgUrl(slug: string, site: URL): string {
  return `${ogBase(site)}/${slug}.png`;
}

export function siteOgUrl(site: URL): string {
  return `${ogBase(site)}/default.png`;
}

/** Per-page OG image for the fixed top-level pages. Falls back to default. */
export function pageOgUrl(
  name: 'home' | 'talks' | 'cv' | 'projects' | 'press' | 'badges',
  site: URL,
): string {
  return `${ogBase(site)}/${name}.png`;
}

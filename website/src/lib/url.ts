const BASE = import.meta.env.BASE_URL;

export function withBase(path: string): string {
  const base = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
  const p = path.startsWith('/') ? path : `/${path}`;
  return base + p;
}

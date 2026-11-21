export interface Place {
  city: string;
  region?: string;
  country?: string;
}

/** Formats a talk location as "City, Region" or "City, Country", skipping empty parts. */
export function formatPlace({ city, region, country }: Place): string {
  return [city, region || country].filter(Boolean).join(', ');
}

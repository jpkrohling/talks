import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const talks = defineCollection({
  loader: glob({
    pattern: '[0-9][0-9][0-9][0-9]/[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]-*/README.md',
    base: '../', // from website/ -> repo root
    generateId: ({ entry }) => {
      // entry is like "2026/2026-03-24-kubecon-eu-otel-project-update/README.md"
      const parts = entry.split('/');
      return parts[1]; // the directory name is the slug
    },
  }),
  schema: z.object({
    title: z.string().min(1),
    event: z.string().min(1),
    event_slug: z.string().min(1),
    date: z.coerce.date(),
    location: z.object({
      city: z.string().min(1),
      // Legacy READMEs predating the country field use empty strings; keep them as-is
      // rather than backfilling unreliably.
      country: z.string().default(''),
      flag: z.string().optional().default(''),
    }),
    event_link: z.string().url().optional(),
    // Most recordings are YouTube URLs, but one legacy entry (2020 FOSDEM) ships
    // a local webm file alongside the README. Accept any non-empty string here.
    recording: z.string().min(1).optional(),
    slides: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    co_speakers: z
      .array(z.object({ name: z.string(), company: z.string().optional().default('') }))
      .optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    url: z.string().url().optional(),
    period: z.string().optional(),
    order: z.number().default(100),
    // Groups the entry on the Projects page.
    //   current  — active roles
    //   started  — open-source projects Juraci created or kicked off
    //   emeritus — retired maintainer roles
    category: z.enum(['current', 'started', 'emeritus']).default('current'),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/experience' }),
  schema: z.object({
    role: z.string(),
    company: z.string(),
    location: z.string().optional(),
    start: z.string(), // ISO YYYY-MM (sorting key)
    end: z.string().default('present'), // ISO YYYY-MM or 'present'
    dates_display: z.string(), // human-readable span, e.g. "Nov 2022 – Dec 2024"
    order: z.number().default(100),
  }),
});

const patents = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/patents' }),
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    number: z.string().optional(),
    order: z.number().default(100),
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    publication: z.string(),
    date: z.string(), // YYYY-MM (sort key + display)
  }),
});

const books = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/books' }),
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    publisher: z.string(),
    isbn: z.string().optional(),
    role: z.string(),
    year: z.number().optional(),
    order: z.number().default(100),
  }),
});

export const collections = { talks, projects, experience, patents, publications, books };

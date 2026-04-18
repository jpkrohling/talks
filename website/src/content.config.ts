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
  }),
});

export const collections = { talks, projects };

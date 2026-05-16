import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    github: z.string().url(),
    demo: z.string().url().optional(),
    thumb: z.string(),
    order: z.number(),
    tags: z.array(z.enum(['Active', 'Stale', 'Demo', 'Learning', 'Tool', 'Archived'])).default([]),
    language: z.enum(['Scala', 'Python', 'Go', 'JavaScript', 'TypeScript', 'Rust', 'Other']).optional(),
  }),
});

export const collections = { projects };

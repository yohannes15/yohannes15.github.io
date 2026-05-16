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
  }),
});

export const collections = { projects };

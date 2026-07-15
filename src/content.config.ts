import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const entrySchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  excerpt: z.string().optional(),
  image: z.string().optional(),
  heroImage: z.string().optional(),
  heroCaption: z.string().optional(),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: entrySchema,
});

const adventures = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/adventures' }),
  schema: entrySchema,
});

export const collections = { projects, adventures };

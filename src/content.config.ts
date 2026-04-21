import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  type: 'content',
  loader: glob({ pattern: 'blog/**/*.{md,mdx}', base: './src/content' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      description: z.string().optional(),
      pubDate: z.string(),
      tags: z.array(z.string()),
      icon: image().optional(),
      ogImage: image().optional(),
      iconAlt: z.string().optional(),
      draft: z.boolean().optional(),
    }),
});

export const collections = { blog };

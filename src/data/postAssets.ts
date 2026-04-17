import type { ImageMetadata } from 'astro';

const iconModules = import.meta.glob<{ default: ImageMetadata }>('@/assets/posts/*/icon.png', {
  eager: true,
});

const iconBySlug = Object.entries(iconModules).reduce<Record<string, ImageMetadata>>(
  (acc, [path, mod]) => {
    const slug = path.split('/').at(-2);
    if (slug) acc[slug] = mod.default;
    return acc;
  },
  {}
);

export function getPostIcon(slug: string): ImageMetadata | undefined {
  return iconBySlug[slug];
}

import type { ImageMetadata } from 'astro';
import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';

import { getPostIcon } from '@/data/postAssets';

export interface PostMeta {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  pubDate: string;
  tags: string[];
  icon?: ImageMetadata;
  ogImage?: ImageMetadata;
  iconAlt?: string;
  draft?: boolean;
}

export type BlogEntry = CollectionEntry<'blog'>;

const legacyPosts: PostMeta[] = [
  {
    id: 'harness-agentic-control',
    title: 'Harness Engineering para agentes tipo OpenCode',
    subtitle: 'Control loop, contracts y señales de deriva',
    description: 'Modelo operativo para agentes con herramientas, contratos y evidencia',
    pubDate: '2026-04-15',
    tags: ['harness', 'agents', 'orchestration'],
    icon: getPostIcon('harness-agentic-control'),
    ogImage: getPostIcon('harness-agentic-control'),
    iconAlt: 'Harness Engineering para agentes tipo OpenCode',
  },
  {
    id: 'harness-agentic-control-astro',
    title: 'Harness Engineering para agentes tipo OpenCode (Astro)',
    subtitle: 'Legacy Astro · Control loop, contracts y señales de deriva',
    description: 'Version legacy del post, previo a la migracion MDX',
    pubDate: '2026-04-15',
    tags: ['harness', 'agents', 'orchestration', 'legacy'],
    icon: getPostIcon('harness-agentic-control'),
    ogImage: getPostIcon('harness-agentic-control'),
    iconAlt: 'Harness Engineering para agentes tipo OpenCode',
    draft: true,
  },
  {
    id: 'llm-context-limitations',
    title: 'Limitaciones de los LLM en la actualidad',
    subtitle: 'Ventana de contexto y Smart Context',
    description: 'Ventana de contexto, Smart Context y estrategias para ahorrar tokens',
    pubDate: '2026-03-20',
    tags: ['llm', 'context'],
    icon: getPostIcon('llm-context-limitations'),
    ogImage: getPostIcon('llm-context-limitations'),
    iconAlt: 'Limitaciones de los LLM en la actualidad',
  },
  {
    id: 'harness-engineering',
    title: 'Harness Engineering',
    subtitle: 'Guía práctica',
    description: 'Guía práctica · OpenCode + Sub-agentes',
    pubDate: '2026-04-01',
    tags: ['guide'],
    icon: getPostIcon('harness-engineering'),
    ogImage: getPostIcon('harness-engineering'),
    iconAlt: 'Harness Engineering',
  },
  {
    id: 'bienvenidos',
    title: 'Bienvenidos al blog',
    subtitle: 'Punto de partida',
    description: 'Punto de partida · De qué va este espacio',
    pubDate: '2026-03-15',
    tags: ['meta'],
    icon: getPostIcon('bienvenidos'),
    ogImage: getPostIcon('bienvenidos'),
    iconAlt: 'Bienvenidos al blog',
  },
];

function mapEntry(entry: BlogEntry): PostMeta {
  return {
    id: entry.id.replace(/^blog\//, '').replace(/\.(md|mdx)$/, ''),
    title: entry.data.title,
    subtitle: entry.data.subtitle,
    description: entry.data.description,
    pubDate: entry.data.pubDate,
    tags: entry.data.tags,
    icon: entry.data.icon,
    ogImage: entry.data.ogImage,
    iconAlt: entry.data.iconAlt,
    draft: entry.data.draft,
  };
}

async function getAllPosts(): Promise<PostMeta[]> {
  const collectionPosts = (await getCollection('blog')).map(mapEntry);
  const merged = new Map<string, PostMeta>();

  legacyPosts.forEach((post) => merged.set(post.id, post));
  collectionPosts.forEach((post) => merged.set(post.id, post));

  return Array.from(merged.values());
}

export async function getPost(id: string): Promise<PostMeta | undefined> {
  const posts = await getAllPosts();
  return posts.find((post) => post.id === id);
}

export async function getPublishedPosts(): Promise<PostMeta[]> {
  const posts = await getAllPosts();
  return posts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
}

export interface PostMeta {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  pubDate: string;
  tags: string[];
  draft?: boolean;
}

export const posts: PostMeta[] = [
  {
    id: 'harness-agentic-control',
    title: 'Harness Engineering para agentes tipo OpenCode',
    subtitle: 'Control loop, contracts y señales de deriva',
    description: 'Modelo operativo para agentes con herramientas, contratos y evidencia',
    pubDate: '2026-04-15',
    tags: ['harness', 'agents', 'orchestration'],
  },
  {
    id: 'llm-context-limitations',
    title: 'Limitaciones de los LLM en la actualidad',
    subtitle: 'Ventana de contexto y Smart Context',
    description: 'Ventana de contexto, Smart Context y estrategias para ahorrar tokens',
    pubDate: '2026-03-20',
    tags: ['llm', 'context'],
  },
  {
    id: 'harness-engineering',
    title: 'Harness Engineering',
    subtitle: 'Guía práctica',
    description: 'Guía práctica · OpenCode + Sub-agentes',
    pubDate: '2026-04-01',
    tags: ['guide'],
  },
  {
    id: 'bienvenidos',
    title: 'Bienvenidos al blog',
    subtitle: 'Punto de partida',
    description: 'Punto de partida · De qué va este espacio',
    pubDate: '2026-03-15',
    tags: ['meta'],
  },
];

export function getPost(id: string): PostMeta | undefined {
  return posts.find((p) => p.id === id);
}

export function getPublishedPosts(): PostMeta[] {
  return posts
    .filter((p) => !p.draft)
    .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
}

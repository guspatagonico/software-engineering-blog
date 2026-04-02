# Software Engineering Blog

> Where systems thinking meets applied intelligence.

An interactive blog at the intersection of **software engineering**, **software architecture**,
and **agentic development**. Each post is a living artifact — data visualizations, architecture
diagrams, math expressions, and interactive charts that you can explore, not just read.

---

## What this is about

Modern software engineering doesn't stop at clean code. The frontier has moved to:

- **Harness Engineering** — designing the constraints that keep autonomous agents convergent.
  Not prompt engineering. Not fine-tuning. The structural envelope.
- **Context Engineering** — the art of fitting the right information into the smallest
  possible space. The most scarce resource in every LLM interaction.
- **Agentic Architectures** — sub-agents, orchestration, fork-join patterns, drift detection.
  Building systems that think in parallel without losing coherence.
- **Software Architecture at scale** — emergent design, modular boundaries, the Lyapunov
  functions of system evolution.
- **Automation as epistemology** — not "let the machine do it" but "what does the machine
  reveal about the problem."

This blog explores these ideas through working code, not theory.

---

## Tech Stack

| Layer           | Choice                       | Why                                            |
| --------------- | ---------------------------- | ---------------------------------------------- |
| Framework       | [Astro](https://astro.build) | Islands architecture — ship zero JS by default |
| Interactivity   | [React](https://react.dev)   | Only where needed: charts, toggles, forms      |
| Language        | TypeScript (strict)          | No `any`, no excuses                           |
| Styling         | CSS + design tokens          | Scoped, predictable, no runtime cost           |
| Content         | MDX + Zod schemas            | Type-safe frontmatter, component-rich posts    |
| Testing         | Vitest                       | Unit/component tests                           |
| Package manager | [pnpm](https://pnpm.io)      | Fast, disk-efficient, strict                   |

---

## Quick Start

```bash
# Clone and install
git clone https://github.com/guspatagonico/software-engineering-blog
cd software-engineering-blog
pnpm install

# Development
pnpm dev          # → http://localhost:4321/software-engineering

# Production build
pnpm build        # → dist/

# Quality checks
pnpm lint         # ESLint + Prettier
pnpm typecheck    # astro check + tsc --noEmit
```

> **Note:** This blog runs under the `/software-engineering` base path.

---

## Project Structure

```
src/
├── components/     # React (.tsx) and Astro (.astro) components
├── layouts/        # Page layouts (Base, Page, BlogPost)
├── pages/          # Astro file-based routes
├── content/        # MDX blog posts (content collections)
├── styles/         # Global CSS / design tokens
└── types/          # TypeScript type definitions
```

**Routes:** `/` (homepage with blog posts) · `/about` · `/now` · `/contact` · `/blog/{slug}`

---

## Design Philosophy

**Progressive disclosure.** Every post starts with the core idea. Visualizations expand
on click. Code is runnable. Diagrams are explorable. You control the depth.

**Convergent envelopes.** Like a well-harnessed agent, the content narrows from broad
concepts to precise implementations. No drift. No entropy.

**Interactivity where it matters.** A static blog can teach. An interactive one can
demonstrate. We choose demonstration.

---

## Contributing

Pull requests welcome. Before submitting:

1. Run `pnpm lint` and `pnpm typecheck` to ensure code quality
2. Follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages
3. Keep PRs focused and small

See [AGENTS.md](AGENTS.md) for internal development workflow.

---

## License

Copyright © Gustavo Adrián Salvini. All rights reserved.

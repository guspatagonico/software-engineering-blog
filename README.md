# Software Engineering Blog

> Where systems thinking meets applied intelligence.

An interactive blog at the intersection of **software engineering**, **software architecture**, and **agentic development**. Each post is a living artifact — data visualizations, architecture diagrams, math expressions, and interactive charts that you can explore, not just read.

Built with **Astro**, **React islands**, and **TypeScript**, this blog demonstrates modern frontend patterns while exploring the bleeding edge of AI-augmented software development.

---

## 🚀 Current Features

- **URL Hash-Based Section Navigation** — Share direct links to specific sections within posts (e.g., `/blog/llm-context-limitations#fundamentos`)
- **Scroll Progress Indicator** — Visual green progress bar tracking reading position
- **Section Navigation** — Tab-based navigation for multi-section blog posts with smooth panel transitions
- **Post Meta Footer** — Publication date and tags displayed in a floating panel (desktop) or fixed bar (mobile)
- **SEO-Optimized** — OpenGraph article tags, keywords meta, canonical URLs, and structured data
- **Responsive Design** — Pixel-perfect layouts from mobile to desktop with sticky navigation
- **Dark/Light Theme** — Automatic theme detection with manual toggle
- **Zero-JS by Default** — Astro's islands architecture ships JavaScript only where interactivity is needed

---

## 💡 What This Blog Explores

Modern software engineering doesn't stop at clean code. The frontier has moved to:

### Harness Engineering

Designing the constraints that keep autonomous agents convergent. Not prompt engineering. Not fine-tuning. The **structural envelope** that guides multi-agent systems toward coherent outcomes without losing exploratory capability.

### Context Engineering

The art of fitting the right information into the smallest possible space. The most scarce resource in every LLM interaction. Techniques like:

- Smart Context management
- Token optimization strategies
- MCP (Model Context Protocol) patterns
- Handoff-based session continuity

### Agentic Architectures

Building systems that think in parallel without losing coherence:

- Sub-agent orchestration patterns
- Fork-join workflows
- Drift detection and correction
- Convergent envelope design

### Software Architecture at Scale

Emergent design, modular boundaries, and the Lyapunov functions of system evolution. Architecture as a living system that adapts while maintaining invariants.

### Automation as Epistemology

Not "let the machine do it" but **"what does the machine reveal about the problem"**. Using coding agents as thinking partners, not just code generators.

---

## 🛠️ Tech Stack

| Layer           | Choice                       | Why                                            |
| --------------- | ---------------------------- | ---------------------------------------------- |
| Framework       | [Astro](https://astro.build) | Islands architecture — ship zero JS by default |
| Interactivity   | [React](https://react.dev)   | Only where needed: charts, toggles, forms      |
| Language        | TypeScript (strict)          | No `any`, no excuses                           |
| Styling         | CSS + design tokens          | Scoped, predictable, no runtime cost           |
| Content         | Astro components + Zod       | Type-safe frontmatter, component-rich posts    |
| Testing         | Vitest                       | Unit/component tests                           |
| Package manager | [pnpm](https://pnpm.io)      | Fast, disk-efficient, strict                   |

---

## 🚀 Quick Start

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
pnpm test         # Vitest unit tests
```

> **Note:** This blog runs under the `/software-engineering` base path.

---

## 📁 Project Structure

```
src/
├── components/     # React (.tsx) and Astro (.astro) components
│   ├── SectionNav/ # Tab-based section navigation
│   └── ...
├── layouts/        # Page layouts (Base, BlogPost)
├── pages/          # Astro file-based routes
│   ├── blog/       # Individual blog posts
│   └── index.astro # Homepage with sorted posts
├── data/           # Posts metadata and utilities
├── styles/         # Global CSS / design tokens
└── types/          # TypeScript type definitions
```

**Routes:** `/` (homepage) · `/about` · `/now` · `/contact` · `/blog/{slug}`

---

## 🎯 Design Philosophy

**Progressive disclosure.** Every post starts with the core idea. Visualizations expand on click. Code is runnable. Diagrams are explorable. You control the depth.

**Convergent envelopes.** Like a well-harnessed agent, the content narrows from broad concepts to precise implementations. No drift. No entropy.

**Interactivity where it matters.** A static blog can teach. An interactive one can demonstrate. We choose demonstration.

---

## 🤝 Let's Collaborate

I'm actively seeking fellow travelers exploring the **agentic development frontier**. Whether you're:

- **Building harness engineering patterns** for multi-agent systems
- **Experimenting with context optimization** and LLM limitations
- **Developing sub-agent orchestration** workflows
- **Researching the state of the art** in coding agents and AI-augmented development
- **Working on similar projects** and want to share knowledge

### 📬 Get in Touch

**Gustavo Adrián Salvini**

- 📧 Email: [guspatagonico@gmail.com](mailto:guspatagonico@gmail.com)
- 🐦 X/Twitter: [@guspatagonico](https://x.com/guspatagonico)
- 💻 GitHub: [@guspatagonico](https://github.com/guspatagonico)
- 🌐 Website: [gustavosalvini.com.ar](https://gustavosalvini.com.ar)

I'm interested in:

- **Knowledge sharing** — Discussing patterns, failures, and breakthroughs in agentic workflows
- **Collaborative projects** — Building tools and frameworks together
- **Consulting opportunities** — Helping teams adopt agentic development practices
- **Speaking/writing** — Sharing experiences at conferences or publications

If you're working on something interesting in this space, **let's talk**. The best ideas emerge from conversation, not isolation.

---

## 📖 Contributing

Pull requests welcome! Before submitting:

1. Run `pnpm lint` and `pnpm typecheck` to ensure code quality
2. Follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages
3. Keep PRs focused and small
4. See [AGENTS.md](AGENTS.md) for detailed development workflow and conventions

---

## 📄 License

[MIT](LICENSE) © Gustavo Adrián Salvini

This project is open source and available for use, modification, and distribution under the MIT License.

---

_Built with curiosity, caffeine, and copious amounts of AI assistance. The future of software engineering is collaborative — between humans and machines._

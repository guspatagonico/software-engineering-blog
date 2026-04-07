---
children_hash: f2a13a90de13dd90f3ef09f5f6f08985ff0f574b0c343477e8948126daf06ae3
compression_ratio: 0.47145328719723184
condensation_order: 3
covers: [project_guidelines/_index.md, project_management/_index.md, ui/_index.md]
covers_token_total: 2312
summary_level: d3
token_count: 1090
type: summary
---
# Structural Summary (Level d3)

## project_guidelines domain
- **Agents (project_guidelines/agents)**: Captures pnpm-centric build/tooling rules, SectionNav/panel layout patterns, security/workflow policies, and dispatcher-based agent orchestration. Key facts include pnpm-only scripts (`install`, `dev`, `build`, `preview`, lint/format/typecheck, Vitest, Playwright e2e), strict styling conventions (2‑space indent, single quotes, `@/` aliasing), SectionNav icons limited to a vetted set, and git worktrees/hand-off mechanics anchored by `_handoff`. Dispatcher sequences pnpm commands, security checks, and handoff file generation.

- **Blog Post Architecture (project_guidelines/blog_post_architecture)**: Enforces `BlogPost` layout with SectionNav client-loaded, mirrored panel IDs/classes (`panel`/`panel active`), and consistent shared components (`Highlight`, `Card`, `ConvergentEnvelope`). SectionNav icons must come from the approved set (◈ ▸ ▣ …), and every post must register a homepage card (index.astro) to surface new content.

- **Dev Process (project_guidelines/dev_process)**: Documents the style/workflow pipeline: lint/typecheck/format → tests → conventional commits → worktree push → PR via `gh`. Strict conventions cover naming (component/hook/util/store styles), import order, error handling (no swallowed errors), Vite server settings (`host: 0.0.0.0`, `allowedHosts: ["galadriel"]`), and security (no repo secrets). Highlights include dispatcher-driven agent parallelism, SectionNav requiring `client:load`, React islands only when needed, and LocalStorage-based theme persistence.

- **Run Commands (project_guidelines/run_commands)**: Lists pnpm scripts for setup (`install`), dev (`pnpm dev` on localhost:4321), production build/preview, quality gates (`lint`, `format`, `typecheck`), and tests (Vitest `pnpm test`, Playwright `pnpm test:e2e`). Reinforces pnpm-only policy referenced by dev process and agent workflows.

## project_management domain
- **Domain Context (project_management/context.md)**: Houses curated handoff summaries capturing work status, touched files, pending actions, and blockers (excluding low-level implementation). Ownership attributed to Gustavo Adrián Salvini to ensure future contributors can resume.

- **Handoffs topic (project_management/handoffs)**: April 4, 2026 handoff documents metadata/SEO rollouts (Head, Navbar, Footer, Base, BlogPost, index.astro, posts) ensuring canonical/open graph consistency; centralized post-content.css styling plus layout constraints (900px max-width desktop, full-width mobile), canonical base URL `https://dev.ecim.tech`. Lists pending Playwright E2E/blog post work and procedural reminder to follow checklists before closing iterations. Links back to project_guidelines/dev_process for workflow context.

## ui domain
- **Domain Context (ui/context.md)**: Establishes Design Systems & Frontend knowledge for immersive visuals, covering canvas/WebGL backgrounds and animated UI components while excluding copy/data/back-end logic.

- **Visual Effects topic (ui/visual_effects)**: Focuses on MatrixBackground and related animated experiences; encourages linking to other UI effects for cohesive documentation.

- **Matrix Background component (ui/visual_effects/matrix_background.md)**:
  - Task/Flow: Canvas mounts fullscreen, initializes 180 depth-layered streams, and executes frame loop that clears canvas, updates streams/characters, regenerates data, and responds to resize/mouse/theme events.
  - Structure & Dependencies: Each stream stores characters, gradients, gem metadata, depth-aware shading, and respects theme settings via LocalStorage/media queries; CSS module ensures positioning with monospace font stack (Noto Sans Mono, MS Gothic, Hiragino Sans).
  - Highlights/Facts: Stream count 180, CHAR_CHANGE_RATE=0.3, CHAR_CHANGE_COUNT=2; character pool 70% Latin/30% katakana; gems (e.g., gustavo, robotics) spawn with GEM_CHANCE=0.002; mouse repulsion radius 200 px with exponential force plus depth-specific vortex pulls; layered alpha blending maintains performance.

## Drill-down guidance
- For domain scope or usage rationale: read each `context.md`.
- For topic‑level detail: open `*/_index.md`.
- For implementation specifics (constants, behaviors, rules): review individual entries such as `matrix_background.md` or `handoff_2026_04_04.md`.
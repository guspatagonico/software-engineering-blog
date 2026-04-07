---
children_hash: 1f2b8db2bd4d2cb1bf845bc0cb41e7d23d8222391db8f2b3d3aff5aa45bce173
compression_ratio: 0.5223748338502436
condensation_order: 3
covers: [project_guidelines/_index.md, project_management/_index.md, ui/_index.md]
covers_token_total: 2257
summary_level: d3
token_count: 1179
type: summary
---
# Structural Summary (Level d3)

## project_guidelines domain
- **Agents (_index, context.md, project_agent_handbook.md)**  
  - Purpose: define pnpm-only workflow, dispatcher pattern, and security/process rules for agent-based contributions.  
  - Key rules: pnpm scripts (`install`, `dev`, `build`, `preview`, lint/format/typecheck), Vitest/Playwright for tests, enforced TypeScript/style conventions, git worktree strategy, no secrets, Vite host/allowedHosts configuration, 4h PR SLA, denial of apologies.  
  - UI/layout expectations: every post uses `BlogPost`, `SectionNav client:load`, panels with `panel` classes, approved icon set, consistent shared components (`Highlight`, `Card`, `ConvergentEnvelope`), SectionNav-panel pairing, homepage card registration.  
  - Dispatcher: orchestrates pnpm commands, security checks, handoffs, and multi-agent collaboration (e.g., `@component-builder`, `@blog-writer`).

- **Blog Post Architecture (_index)**  
  - Structure: `BlogPost` layout, defined `sections` array, SectionNav rendered with `client:load`, panels tied to SectionNav entries (`panel-{section.id}`, only first active).  
  - Components: reused UI elements, inline styling templates, and approved SectionNav icons (◈ ▸ ▣ ◑ ⊕ ⬡ → ⟳ ✓ ≡ ∑).  
  - Rule: each new article must add a homepage card (`src/pages/index.astro`).

- **Dev Process (_index)**  
  - Flow: style/naming → pnpm lint/typecheck/format → tests → conventional commit → push via worktree → PR via `gh` → cleanup.  
  - Conventions: 2-space indent, single quotes, trailing commas, interface props, import ordering (Node/external → Astro → `@/` → relative), naming presets per asset type, strict error handling, preserved Vite config, theme persistence via LocalStorage, discourage React islands unless needed.  
  - Dependencies: pnpm, ESLint plugins, TypeScript, Astro layouts, `gh`.  
  - Highlights: parallel agents, dispatcher use, SectionNav/client:load requirement, pnpm enforcement.

- **Run Commands (_index, build_and_run_commands.md)**  
  - Canonical commands: `pnpm install` (lockfile), `pnpm dev` (`localhost:4321`), `pnpm build`, `pnpm preview`, `pnpm lint`, `pnpm format`, `pnpm typecheck`, `pnpm test` (Vitest), `pnpm test:e2e` (Playwright).  
  - Role: referenced by dev process/agents; reinforces pnpm-only policy for dependency and CI workflows.

## project_management domain
- **Context (context.md)**  
  - Domain intent: capture handoffs (decisions, blockers, touched files) for quick resumption; excludes implementation depth; owned by Gustavo Adrián Salvini.

- **Handoffs (_index, handoff_2026_04_04.md)**  
  - Snapshot: April 4, 2026 rollout covering SEO/metadata, centralized styling, canonical titles, pending Playwright/blog-post work.  
  - Files touched: `Head.astro`, `Navbar`, `Footer`, `Base`, `BlogPost`, `index.astro`, targeted blog pages, shared `post-content.css` (aligned with homepage/global/page/post-list styles), typography/branding unify, canonical URL anchored to `https://dev.ecim.tech`, max-width 900px.  
  - Pending: Playwright E2E, new blog-post creation; no blockers; rule reminding not to create handoffs unless requested.

- **Run Commands (git_worktree_location.md)**  
  - Policy: all worktrees under `<project>/.worktrees/<branch>`; create with `git worktree add .worktrees/<branch> -b <branch>`, ensure `.worktrees` exists, centralizes tooling and cleanup.

## ui domain
- **Context (context.md)**  
  - Purpose: document immersive UI (canvas/WebGL backgrounds, particle simulations, interactive components); excludes copy/backend logic; owned by Design Systems & Frontend.

- **Visual Effects (_index, matrix_background.md, matrix_background_toggle.md, dodecahedron_toggle.md, glassy_navigation_layout.md)**  
  - Matrix background: theme-aware canvas pipeline, weighted depth streams, gem flicker probabilistics, mouse-driven repulsion/vortex, breakpoint-specific stream counts, pauseable loops, CSS sync.  
  - Toggle: Base.astro embeds, `initMatrixState`, LocalStorage `matrix-bg-visible`, event-driven visibility halts animation when off.  
  - Dodecahedron button: Three.js renderer (antialias, ACESFilmic, PCFShadowMap, DPR cap), theme-linked colors, hover/touch handling, `toggle-matrix-background` event dispatch, teardown logic.  
  - Layout/glass styling: Navbar/Footer glass backdrops (blur/saturate tokens), sticky behavior, mobile drawer (280px slide, staggered link reveals), token/body-class coordination for overlays.  
  - Relationships: matrix animation engine referenced by toggle and Dodecahedron controls; glass layout shares theme tokens with animated elements.

Drill down into each listed entry for implementation specifics, API settings, and stylings.
---
children_hash: a4a183981f15f9f926f65b2eadd54be54d45dfcfd7bfbc20fa90f146f4b22d24
compression_ratio: 0.4665362035225049
condensation_order: 3
covers: [project_guidelines/_index.md, project_management/_index.md, ui/_index.md]
covers_token_total: 2555
summary_level: d3
token_count: 1192
type: summary
---
# Structural Summary (Level d3)

## project_guidelines
- **Agents (agents/_index.md, context.md, project_agent_handbook.md)**: Centralizes pnpm-only build/test scripts, strict TypeScript/style rules, layout conventions (BlogPost layout → SectionNav client:load, panel IDs `panel-{section.id}`, approved icon set, shared Highlight/Card/ConvergentEnvelope components), and operational rules (git worktrees for complex changes, `_handoff` logs, no secrets, dispatcher orchestrating pnpm commands + agent roles). Dispatcher coordinates security checks, handoff writes, and agent assignments, linking to dev process operations.

- **Blog Post Architecture (blog_post_architecture/_index.md, blog_post_architecture.md)**: Enforces post structure: `sections` + SectionNav rendered client-side, matching panels (`panel`/`panel active`), consistent shared components for styling, dedicated homepage card registration in `src/pages/index.astro`, and SectionNav icons restricted to `◈ ▸ ▣ ◑ ⊕ ⬡ → ⟳ ✓ ≡ ∑`. Architecture ensures visual/UX consistency across blog content.

- **Dev Process (dev_process/_index.md, development_process_and_rules.md)**: Captures workflow: style/naming conventions (2-space indent, single quotes, trailing commas, interface-based props, import ordering), error-handling discipline, Vite config (`host: '0.0.0.0'`, `allowedHosts: ['galadriel']`), theme persistence via LocalStorage, pnpm/ESLint/TypeScript stack, Git worktree usage, pre-commit lint/typecheck/tests, follow-up PR via `gh`, and agent parallelization via dispatcher.

- **Run Commands (run_commands/_index.md, build_and_run_commands.md)**: Canonical pnpm scripts for install/dev/build/preview/lint/format/typecheck plus Vitest/Playwright testing; reinforces pnpm-only rule referenced by dev process and agent playbooks.

## project_management
- **Domain Intent (context.md)**: Maintains succinct session handoffs documenting decisions, blockers, files, and pending actions; excludes implementation minutiae; Gustavo Adrián Salvini owns domain and links to dev process governance.

- **Handoffs (handoffs/_index.md and children)**: Current-session-only rule (`current_session_handoff_rule.md`) ensures fresh task log without duplication; April 4 handoff (`handoff_2026_04_04.md`) details SEO/Open Graph logic (e.g., canonical `https://dev.ecim.tech`, title pattern “The SE Blog | Gustavo Adrián Salvini”), shared component/CSS dependencies, pending Playwright E2E work, and rules forbidding unsanctioned handoff creation until outstanding work completes.

- **Run Commands (run_commands/_index.md, git_worktree_location.md)**: Mandates storing every worktree under `<project_folder>/.worktrees/<branch_name>` created via `git worktree add .worktrees/<branch_name> -b <branch_name>`, keeping cleanup centralized and forbidding off-location worktrees.

## ui
- **Domain Purpose (context.md)**: Captures immersive visual effects (canvas/WebGL backgrounds, particle simulations, responsive UI) for implementation/tuning, authored by Design Systems & Frontend, while excluding copy/data/back-end concerns.

- **Visual Effects (visual_effects/_index.md)**:
  - **Matrix Background (matrix_background.md)**: Five-layer canvas with responsive stream counts, gem-word timers, `CHAR_CHANGE_RATE=0.3`, theme detection, pointer-driven shockwaves/vortex within 200 px, and `requestAnimationFrame` rendering with cleanup hooks.
  - **Matrix Background Toggle (matrix_background_toggle.md)**: `Base.astro` listens for `toggle-matrix-background`, toggles `matrix-bg-visible` class, persists preference in localStorage, and suspends rendering when hidden.
  - **Dodecahedron Toggle (dodecahedron_toggle.md)**: Three.js button (128 px) with dodecahedron/wireframe/glow meshes, multi-light setup (ambient/directional/fill/rim/point), theme-aware materials, hover/touch animations, DPR cap at 3, precise renderer settings (ACESFilmicToneMapping, PCFShadowMap, exposure 1.0), and toggles matrix background visibility while disposing GL resources on unmount.
  - **Glassy Navigation Layout (glassy_navigation_layout.md)**: `Navbar.astro`/`Footer.astro` use shared glass tokens (`--glass-bg`, etc.), mobile drawer animation tied to `data-visible` + `nav-open` body class, and ARIA/data attributes ensure consistent styling and accessibility across themes.
  - **Scroll Feedback System (scroll_feedback_system.md)**: Layout wraps `.content` in `.page-container`, hides scrollbars, ties `ScrollIndicator.astro` progress bar (3 px green) to scroll events, auto-hides Dodecahedron on scroll after 2 s (unless home page), and ensures Base/BlogPost plus CSS maintain scroll anchoring.

Each entry references precise architectural decisions, dependencies, and relationships for easy drill-down into the respective files.
---
children_hash: f59b5a4712f5a501a0e4803d84bdeaa3e3c5a51efbfbb36046aa6b1c5f26ab50
compression_ratio: 0.3900481540930979
condensation_order: 3
covers: [project_guidelines/_index.md, project_management/_index.md, ui/_index.md]
covers_token_total: 3115
summary_level: d3
token_count: 1215
type: summary
---
# Structural Knowledge Summary (Level d3)

## project_guidelines
- **Agents**: `context.md` plus `project_agent_handbook.md` describe the dispatcher-style agent flow: pnpm scripts (install/dev/build/preview/lint/typecheck/format/test/e2e), security checks, and `_handoff` exports run sequentially; enforce pnpm-only tooling, strict formatting (TypeScript strict, 2-space, single quotes, `@/` aliases), component layout (BlogPost + SectionNav + Panel structure), shared UI components, git worktree usage, no secrets/`.env`, locked Vite host config, GH CLI PR creation, non-apologetic review tone, and day-3 freeze.  
- **Blog Post Architecture**: `blog_post_architecture.md` details mandated layout (BlogPost import, SectionNav client:load, panel IDs, first panel active), shared UI components, icon whitelist, inline styling, and homepage registration requirement, linking to dev process expectations.  
- **Dev Process**: Enforces flow (style → lint/typecheck/format → tests → conventional commit via git worktree → GH CLI PR → cleanup), strict style/naming/import order, no silent errors, locked Vite config, secrets ban, and integration with SectionNav/React islands/LocalStorage theme persistence; facts include TypeScript strict mode, pre-commit checks, and security protections.  
- **Git Safe Mutations**: `context.md` + `git_mutation_approval_rule.md` codify explicit user consent before commit/push/force, ensuring manual approval even after checks.  
- **Run Commands**: `build_and_run_commands.md` catalogs pnpm lifecycle commands (install/dev/build/preview/lint/typecheck/format/test/test:e2e) reinforcing pnpm-only policy and linking back to dev process expectations.

## project_management
- **Domain Intent** (`context.md`): Captures concise, current-session handoffs (tasks, decisions, blockers, files, pending work) under Gustavo’s ownership while excluding implementation detail.  
- **Handoffs**: `_index.md` points to `context.md`, `current_session_handoff_rule.md` (enforce current-session-only entries, accurate tracking, no duplication), and `handoff_2026_04_04.md` (docs on SEO/Open Graph, canonical URLs tied to `https://dev.ecim.tech`, styling updates spanning Head/Navbar/Footer/Base/BlogPost/CSS, pending Playwright E2E work, and rule against premature handoff creation).  
- **Run Commands**: `git_worktree_location.md` enforces centralized `.worktrees/<branch>` usage via `git worktree add`, prohibiting worktrees outside that directory for cleanup/tooling consistency.

## ui
- **Domain Purpose** (`context.md`): Documents immersive visuals (canvas/WebGL rain, particles, pointer-driven effects) and interactive components reacting to pointer/theme while excluding copy/data/backend logic; owned by Design Systems & Frontend.  
- **Blog Post Layout**:  
  - `blog_post_meta_footer_and_tags.md` prescribes layout chain (Navbar → ScrollIndicator → hero → slot → fixed meta footer → Footer), responsive meta footer offsets, teal tag chip styling, and hash-navigation script that syncs SectionNav, smooth-scrolls on small screens, and emits `section-activated`.  
  - `context.md` synthesizes these patterns, their dependency on Navbar/ScrollIndicator/SectionNav/Footer, and relates to `visual_effects/scroll_feedback_system.md`.  
- **Visual Effects Topic**: `context.md` defines MatrixBackground’s multi-layer rain, gem words, pointer/theme forces, and tuning guidance, serving as the hub.  
  - **Matrix Background**: `matrix_background.md` details five canvas layers (speeds, sizes, alphas, responsive stream counts, gem words with paused updates), theme auto-detection, 200px interaction radius for shockwaves/vortices, and cleanup via `requestAnimationFrame`.  
  - **Matrix Background Toggle**: `matrix_background_toggle.md` covers `Base.astro` wrapper with toggle events, localStorage persistence (`matrix-background-visible`), default hidden state, and render pausing when off.  
  - **Dodecahedron Toggle**: `dodecahedron_toggle.md` documents the Three.js button (128px, z-index 40) with mesh/light setup, theme-aware materials, pointer/touch animations, toggle events, renderer disposal, and device pixel ratio cap.  
  - **Glassy Navigation Layout**: `glassy_navigation_layout.md` explains blur/saturate tokens, mobile drawer overlays with data attributes for visibility, and JS toggles that manage `data-visible`/`nav-open` states shared across themes.  
  - **Scroll Feedback System**: `scroll_feedback_system.md` describes the flex `.page-container` layout, hidden native scrollbars, `ScrollIndicator.astro` progress bars, Dodecahedron auto-hide timer, scroll event wiring to indicators/timer, and necessary Base/BlogPost/CSS tweaks.  

Readers requiring implementation details should drill into each referenced entry (`project_guidelines/*`, `project_management/*`, `ui/*`) following these structural relationships.
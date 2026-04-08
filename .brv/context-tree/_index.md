---
children_hash: e8b3da1136397b696fe2ee37e852e9c82888c401feabe921bb3c1b8664d61f53
compression_ratio: 0.42794279427942794
condensation_order: 3
covers: [project_guidelines/_index.md, project_management/_index.md, ui/_index.md]
covers_token_total: 2727
summary_level: d3
token_count: 1167
type: summary
---
### project_guidelines
- **Root Context (`context.md`)**: Defines pnpm-centered lifecycle (install/dev/build/lint/test), spelling out ownership (Gustavo Adrián Salvini), CI/onboarding focus, and constraints (no feature narratives).
- **agents**: `context.md` + `project_agent_handbook.md` detail PNPM dispatcher agents enforcing scripts (install/dev/build/preview/lint/typecheck/test/playwright), strict stylistic conventions (TypeScript strict, single quotes, 2-space indent, `@/` aliasing, `<Image />` usage), layout mandates (BlogPost + SectionNav/panel IDs), worktree/security rules (GH CLI PRs, no secrets/`.env`, locked Vite config), and git handoff automation—key reference for coordination and security workflows.
- **blog_post_architecture**: `blog_post_architecture.md` and `context.md` specify the structural template (BlogPost import, section ids/icons, SectionNav client:load, linked panels with only first `active`, shared components like Highlight/Card/ConvergentEnvelope, icon whitelist) plus homepage registration requirement; connected to `dev_process/context.md` for broader workflow compliance.
- **dev_process**: `context.md` and `development_process_and_rules.md` capture enforced flow (style checks → pnpm lint/typecheck/format → tests → git worktree commits → GH CLI PRs), naming/import conventions, security posture (immutable Vite block, zero error swallowing, no secrets), tooling stack (pnpm, ESLint, TypeScript, Astro layouts, LocalStorage theme persistence), and highlight requirements (SectionNav client loads). 
- **git_safe_mutations**: `context.md` and `git_mutation_approval_rule.md` codify mandate to secure explicit user consent before any git mutation (detect pending changes → confirm checks → ask for approval quote).
- **run_commands**: `build_and_run_commands.md` catalogues pnpm-only lifecycle commands (install/dev/build/preview/lint/format/typecheck/Vitest/Playwright e2e) tied to dev_process for upstream validation.

### project_management
- **Domain Intent (`context.md`)**: Captures session handoff snapshots (tasks, blockers, files, pending actions) without implementation details; owned by Gustavo Adrián Salvini.
- **handoffs topic**: 
  - `context.md` links governance to `project_guidelines/dev_process`. 
  - `current_session_handoff_rule.md` enforces current-session-only entries (log post-task, no duplication) for crisp tracking.
  - `handoff_2026_04_04.md` documents April 4 handoff: SEO/OpenGraph metadata, canonical URL anchored at `https://dev.ecim.tech`, naming conventions (“The SE Blog | Gustavo Adrián Salvini”), shared component/CSS dependencies (Head, Navbar, Footer, Base, BlogPost, homepage, `src/styles/post-content.css`), pending Playwright e2e setup, and prohibition on new handoffs until outstanding tasks clear.
- **run_commands topic**: `git_worktree_location.md` insists all worktrees reside under `<project_folder>/.worktrees/<branch>` with `git worktree add` into `.worktrees`, prepping directory and forbidding external locations.

### ui
- **Domain Context (`context.md`)**: Houses immersive UI effects (canvas/WebGL/particle layers) while excluding copy/content/backends; used for implementation/tuning.
- **visual_effects topic**:
  - `context.md` ties MatrixBackground, performance safeguards, and theme handling.
  - `matrix_background.md` details quintuple canvas layers, responsive stream/count/alpha controls, gem-word timers, `CHAR_CHANGE_RATE`, theme/mouse listening, pointer-driven shockwave/vortex within 200 px, `requestAnimationFrame` rendering, and teardown logic.
  - `matrix_background_toggle.md` explains `Base.astro` listener for `toggle-matrix-background`, toggling visibility class/localStorage state, and MatrixBackground halting when hidden.
  - `dodecahedron_toggle.md` covers the Three.js button (128 px, dodecahedron & wireframe/glow meshes), ambient/directional/fill/rim/point lights, theme-aware materials, hover/touch animations, `toggle-matrix-background` dispatch, devicePixelRatio cap=3, antialiasing tone mapping/exposure settings, event listeners cleanup, and pointer/touch interaction rules.
  - `glassy_navigation_layout.md` describes Navbar/Footer glass surfaces using shared tokens (`--glass-bg`, etc.), mobile drawer toggles tied to `data-visible` + `nav-open` body class, drawer ARIA/data attributes, and cross-theme token reuse.
  - `scroll_feedback_system.md` explains `.page-container` flex + scrollable `.content`, hidden scrollbar, `ScrollIndicator.astro` progress bar under headers, scroll events updating width, Dodecahedron auto-hide timer (2 s off-home, `autoHideOnScroll=false` default), and layout/CSS adjustments spanning Base/BlogPost.
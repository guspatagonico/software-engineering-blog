---
children_hash: 028f0643acf27b4f308a4d4e9dc4b57b931ef8c68c4b0968ffa4969f667c8da7
compression_ratio: 0.39120631341600903
condensation_order: 3
covers: [facts/_index.md, project_guidelines/_index.md, project_management/_index.md, ui/_index.md]
covers_token_total: 3548
summary_level: d3
token_count: 1388
type: summary
---
### facts Domain (facts/_index.md)
- **Purpose & Scope:** Captures individual communication preferences—primarily the “caveman full mode” directive for terse, factual responses—excluding broader policy or technical documentation.
- **Structure & Drill-Down:** 
  - `personal/context.md` frames domain intent around terse phrasing and technical accuracy.
  - `personal/caveman_style_preference.md` documents the workflow (user signal → mode switch → terse replies) plus the explicit guardrails agents must follow whenever this preference applies.

### project_guidelines Domain (project_guidelines/_index.md)
- **Domain Intent:** Establishes pnpm-centric conventions, CI/onboarding guidance, and ownership (Gustavo Adrián Salvini) while excluding feature narratives.
- **Agents Topic (project_guidelines/agents):**
  - Documents pnpm command set, security/git rules, SectionNav/panel layout expectations, and dispatcher-style multi-agent workflow pulling `_handoff` metadata.
  - Captures strict formatting (2-space, single quotes, aliases), layout requirements (BlogPost, SectionNav bodies, panel IDs, shared components), and systemic rules (worktree policy, handoff command, secret prohibition, PR/CI SLAs, no apologies).
- **Blog Post Architecture Topic (project_guidelines/blog_post_architecture):**
  - Enforces BlogPost layout structure (Navbar, ScrollIndicator, hero, SectionNav/panels, highlighted components) and icon set.
  - Links to dev process expectations for SectionNav client loads and Astro/React integrations and mandates homepage registration for each new post.
- **Dev Process Topic (project_guidelines/dev_process):**
  - Describes workflow (style → lint/typecheck/format → tests → conventional commits → GH CLI PRs → worktree cleanup), naming/import conventions, and prohibited behaviors (errors, secrets, Vite config changes).
  - Dependencies/Highlights: pnpm, ESLint plugins, TypeScript strict mode, Astro layouts, SectionNav, React islands, LocalStorage theme persistence.
- **Git Safe Mutations Topic (project_guidelines/git_safe_mutations):**
  - Codifies explicit user approval before any git mutation (commit/push/force) with a flow of checks → confirmation question → action, ensuring agents never bypass user consent.
- **Run Commands Topic (project_guidelines/run_commands):**
  - Catalogs pnpm-only lifecycle commands (install, dev, build, preview, lint/typecheck/format, Vitest, Playwright) to reinforce consistent dependency, dev, and QA tooling aligned with `dev_process`.

### project_management Domain (project_management/_index.md)
- **Domain Purpose:** Records session handoffs (completed tasks, decisions, blockers, pending actions, touched files) under Gustavo’s ownership; implementation details excluded unless handoff-relevant.
- **Handoffs Topic:**
  - `context.md` anchors what belongs (succinct summaries tied to decisions/blockers).
  - `current_session_handoff_rule.md` enforces session-bounded summaries (new work only, concise delivery).
  - `handoff_2026_04_04.md` captures April 4 rollout (SEO/metadata, style centralization, homepage/blog practices, pending Playwright E2E) and touched files (Head, Navbar, Footer, layouts, CSS).
  - `hybrid_session_state_approach.md` explains ByteRover for durable knowledge vs. handoffs for ephemeral task state, guiding agents to query ByteRover first and touch handoffs only on request.
- **Run Commands Topic (project_management/run_commands):**
  - `git_worktree_location.md` mandates all worktrees live under `<project>/.worktrees/<branch>` (created via `git worktree add`), simplifying tooling and cleanup.

### ui Domain (ui/_index.md)
- **Domain Focus:** Documents immersive frontend visuals (Canvas/WebGL, animated backgrounds, pointer/theme interactions) while excluding content copy or backend logic.

#### blog_post_layout Topic
- `context.md` explains `BlogPost.astro` layout (Navbar → ScrollIndicator → hero → content slot → Footer), responsive meta footer positioning, and SectionNav hash navigation with smooth-scroll behavior, ensuring panel activation logic is consistent.
- `blog_post_meta_footer_and_tags.md` outlines fixed-position meta footer offsets (desktop/mobile), uppercase teal tag chips, and hash navigation rules (panel reactivation, `section-activated` events).
- `post_content_styles.md` (and `_index.md`) detail shared styling in `src/styles/post-content.css` (wrappers, grids, accent helpers, data blocks, vocabulary columns) plus reliance on theme tokens.

#### visual_effects Topic
- `context.md` defines animated UI elements, MatrixBackground, toggles, and cleanup responsibilities.
- `matrix_background.md` describes five-layer canvas with stream/window counts, gem-word animations, theme detection/persistence, mouse shockwaves within 200 px, and requestAnimationFrame cleanup.
- `matrix_background_toggle.md` explains `Base.astro` toggle logic, event listening, localStorage persistence, hiding logic, and draw loop short-circuiting.
- `dodecahedron_toggle.md` covers the 128 px Three.js toggle (meshes, lighting, theme-aware materials, hover/touch animations, matrix visibility toggle, resource cleanup, DPR cap, tone mapping).
- `glassy_navigation_layout.md` specifies Navbar/Footer glass surfaces (backdrop tokens), mobile drawer animation mechanics tied to `data-visible` attributes/body classes, and token reuse across themes.
- `scroll_feedback_system.md` links layout adjustments (page container, hidden scrollbars, ScrollIndicator, dodecahedron auto-hide timeout) to other visual components for cohesive feedback.
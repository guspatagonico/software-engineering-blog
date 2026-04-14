---
children_hash: 15fe309cb73b7c90ce08c352e42a091bb8fb32a244f53b5df7a5ffc38a173820
compression_ratio: 0.5725530458590007
condensation_order: 3
covers: [facts/_index.md, project_guidelines/_index.md, project_management/_index.md, ui/_index.md]
covers_token_total: 2922
summary_level: d3
token_count: 1673
type: summary
---
# Structural Summary (Level d3)

## facts domain
- **Purpose & Ownership (facts/_index.md):** Records persona-level communication directives (caveman-style terse responses) for context engineers; excludes general policies.
- **personal topic:**  
  - `caveman_style_preference.*` details switch workflow (user triggers mode → agent responds tersely) and captures operational facts; ties back to `context.md` overview so agents understand both intent and requirements.

## project_guidelines domain
- **Domain overview (project_guidelines/_index.md):** Central repository of build/lint/test/run conventions plus onboarding rules; enforces pnpm-only tooling and consistent layout/orchestration policies across agents, dev process, run commands, and git workflow.
- **topics & relationships:**  
  - `agents` (see `agents/_index.md`, `project_agent_handbook.md`): Defines pnpm tooling, layout/panel rules, worktree security, `_handoff` command, dispatcher orchestration; referenced by `dev_process`, `run_commands`, and `git_safe_mutations`.  
  - `blog_post_architecture` (see `_index.md`, `blog_post_architecture.md`): Prescribes `BlogPost` layout stack, SectionNav hash sync, panel IDs/classes, approved iconography, shared UI components, and home-card registration; depends on `dev_process` for workflow norms and `agents` for enforcement procedures.  
  - `dev_process` (`dev_process/_index.md`, `development_process_and_rules.md`): Covers style/tip/top conventions, error/security rules (no secrets, locked Vite), dispatcher agent patterns, git worktree + GH PR flow, and gating (lint/typecheck/tests before push); ties back to `context.md` and links to `harness_engineering`.  
  - `run_commands` (`run_commands/_index`, `build_and_run_commands.md`): Catalogs pnpm install/dev/build/preview/lint/format/typecheck/Vitest/Playwright commands; depends on pnpm-only stance from `context.md`.  
  - `git_safe_mutations` (`context.md`, `git_mutation_approval_rule.md`): Enforces explicit consent workflow for commits/pushes, referencing `agents` and `run_commands` for worktree placement.  
  - `harness_engineering` (see its own domain) cross-referenced for tooling/budget/orchestration patterns linking to `dev_process` and `project_management/handoffs`.

## project_management domain
- **Domain role (`context.md`):** Captures session handoff summaries (completed work, decisions, blockers, pending actions, touched files); owned by Gustavo, excludes implementation details unless tied to handoff narrative.
- **hand-offs topic:**  
  - `context.md`: Canonical scope and links back to `project_guidelines/dev_process`.  
  - `current_session_handoff_rule.md`: Mandates session-bounded summaries with flow (track → concise handoff → deliver) and dependency on up-to-date tracking, preventing duplication.  
  - `handoff_2026_04_04.md`: Documents SEO/metadata rollout, style migrations (`src/styles/post-content.css`), homepage/blog title rules, touched components/layouts/CSS, site URL, pending Playwright + posts; instructs not to process handoffs without request.  
  - `hybrid_session_state_approach.md`: Dual-store strategy (ByteRover for durable patterns, handoffs for ephemeral session info); agents must auto-query ByteRover and only access handoffs on request, separating persistence responsibilities.
- **run_commands topic (`git_worktree_location.md`):** Standardizes worktree location at `<project>/.worktrees/<branch>`, flow for branch creation, dependency on existing `.worktrees` directory, and benefits for tooling/onboarding.

## ui domain
- **Domain overview (`context.md`):** Documents immersive visuals/animated UI delivered by Design Systems & Frontend (canvas, WebGL, pointer-aware components).
- **blog_post_layout topic (`blog_post_layout/_index.md`):**  
  - Layout flow from `context.md`/`Blog Post Layout`: `BlogPost.astro` stacking (Navbar → ScrollIndicator → hero → main slot → post-meta overlay → Footer) with SectionNav hash sync.  
  - `blog_post_meta_footer_and_tags.md`: Fixed meta footer metrics (70 px above viewport desktop, max 280 px width, mobile full-width tag rows, teal chip styling).  
  - Hash navigation script: manages `.active`, `panel-<hash>`, smooth scroll below 1024 px, dispatches `section-activated` events.  
  - `post_content_styles.*`: Defines `src/styles/post-content.css` utilities (grids, tables, accent helpers, panels/callouts, vocabulary grid) built on theme tokens.
- **harness_engineering topic (`harness_engineering/_index.md`):**  
  - `harness_engineering_page.md`: Multi-tab page covering mental models, subagents, orchestration, tools, checklist, vocabulary; integrates convergence metaphors and Lyapunov/barrier cues for agent/orchestrator duties.  
  - Animation/accessibility rules: ConvergentEnvelope parameters (X0=28, X1=592, Yc=130, A=82, λ=2.8, ω=5π, N=400), respects `prefers-reduced-motion`, persists mode via `STORAGE_KEY`, forbids toggle during crossfade per Rule 1.  
  - Orchestration flow: mental-model narrative → sub-agent contracts/budgets → context/session-state handoffs → fork-join orchestration with stage tokens/drift signals → tool matrices/checklists → vocabulary/styling; enforces ~5800-token budget.  
  - Drift rules/checklists: avoid conflicting writes, validate forks independently, wait for orchestrator readiness, react to drift with interrupts/schema reruns/splitting after >2 auto-corrections, and maintain budgets/contracts/handoffs (Rules 2–3).
- **visual_effects topic (`visual_effects/_index.md`):**  
  - `matrix_background.*`: Canvas layers with speed/size/alpha controls, responsive stream counts (60/180/220), 44 gem words, theme detection (DOM/storage/prefers-color), mouse shockwaves/vortex within 200 px, `requestAnimationFrame` lifecycle.  
  - `matrix_background_toggle.md`: `Base.astro` wrapper toggling `matrix-bg-visible`, persisting visibility state; MatrixBackground halts when hidden.  
  - `dodecahedron_toggle.md`: 128 px Three.js toggle button (z-index 40), manages theme/resizes, dispatches toggle events, caps DPR at 3, uses ACESFilmic tone mapping + PCF shadows, hover/pointer/touch behavior, and disposes renderer assets on unmount.  
  - `glassy_navigation_layout.md`: Navbar/Footer use blur/saturate glass tokens (`--glass-bg`, `--glass-bg-mobile`, `--overlay-bg`); mobile drawer toggles via aria/data attributes and `nav-open` body class; tokens shared across themes.  
  - `scroll_feedback_system.md`: `.page-container` flex layout, `ScrollIndicator.astro` (3 px green bar) tied to scroll events, Dodecahedron uses `autoHideOnScroll` prop to hide after 2 s, scroll updates indicator width and resets Dodecahedron timer, layout/CSS keep scroll behavior stable.
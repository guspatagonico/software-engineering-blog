---
children_hash: de28ad255cfa83dc3ed568d4b68e29c7f86cda0f0f512ec75521408ba591d326
compression_ratio: 0.3465319497542327
condensation_order: 3
covers: [facts/_index.md, project_guidelines/_index.md, project_management/_index.md, ui/_index.md]
covers_token_total: 3662
summary_level: d3
token_count: 1269
type: summary
---
### Domain: facts
- **Purpose**: Documents the “caveman full mode” preference for terse, verbatim responses with strict technical fidelity.
- **Structure**: Use `facts/context.md` for the domain intent and `personal/_index.md` plus `personal/caveman_style_preference.*` for the operational workflow (preference detection → mode switch → terse replies).
- **Drill-down**: Review `personal/caveman_style_preference.md` for the exact task, flow, and extracted facts that enforce this behavior.

### Domain: project_guidelines
- **context.md**: Defines pnpm-only lifecycle conventions, ownership (Gustavo Adrián Salvini), and usage guidance; serves as the entry point for repo-wide build/lint/test/run/process rules.
- **Topical breakdown**:
  - `agents/` (`context.md`, `project_agent_handbook.md`): Dispatcher-style pnpm tooling (install/dev/build/preview/lint/typecheck/format/test/playwright) plus SectionNav/panel layout conventions and strict git/security rules (worktree use, `_handoff`, secret prohibition, immutable Vite block, review rules).
  - `blog_post_architecture/` (`blog_post_architecture.md`, `context.md`): Enforces BlogPost + SectionNav integration, panel structure (first panel active, IDs `panel-{section.id}`), shared UI components, icon whitelist, and homepage registration; related to `dev_process/context.md`.
  - `dev_process/` (`context.md`): Workflow from styling to tests to git worktree commits/PRs, import/naming conventions, lint/typecheck requirements, security/immutable configs, agent collaboration, and dependencies (pnpm, ASTRO layouts, ESLint plugins).
  - `git_safe_mutations/` (`context.md`, `git_mutation_approval_rule.md`): Consent workflow—no git mutations without explicit user approval—even after checks pass, codified in AGENTS.md.
  - `run_commands/` (`build_and_run_commands.md`, `context.md`): pnpm command catalog (install, dev, build, preview, lint/typecheck/format/test/test:e2e) reinforcing pnpm-only policy and linked to `dev_process`.

### Domain: project_management
- **context.md**: Captures session handoff expectations (completed work, decisions, blockers, pending actions, touched files) owned by Gustavo Adrián Salvini; excludes implementation detail unless tied to handoff narrative.
- **Topics**:
  - `handoffs/`:
    - `context.md`: Canonical scope for handoff entries.
    - `current_session_handoff_rule.md`: Enforces session-bounded, non-duplicative reports focusing on new work and blockers.
    - `handoff_2026_04_04.md`: Example capturing SEO/metadata rollout, style centralization, touched files (Head, Navbar, Footer, layouts, CSS, blog pages), pending Playwright E2E and future posts.
    - `hybrid_session_state_approach.md`: Dual-store pattern (ByteRover for durable knowledge, handoffs for ephemeral session state) with agent startup guidance (auto-query ByteRover, defer handoffs until requested).
  - `run_commands/git_worktree_location.md`: Specifies centralizing worktrees under `<project>/.worktrees/<branch>` with creation flow via `git worktree add`, requiring `.worktrees` directory.

### Domain: ui
- **context.md**: Captures immersive, interactive frontend visuals (canvas/WebGL backgrounds, pointer/theme reactions) and excludes backend/data logic; owned by design/frontend teams.
- **Topics**:
  - `blog_post_layout/`:
    - `blog_post_meta_footer_and_tags.md`: Layout flow (Navbar → ScrollIndicator → hero → slot → meta footer → Footer), responsive meta footer/tag styling, hash-navigation script coordinating SectionNav state, and script-triggered events; enforces teal tag design and fixed footer behavior.
    - `context.md`: Synthesizes fixed meta footer, tags, hash script, and dependencies on Navbar/ScrollIndicator/SectionNav/Footer; links to `visual_effects/scroll_feedback_system.md`.
  - `visual_effects/`:
    - `context.md`: Hub for MatrixBackground ligand, pointer/theme forces, and tuning.
    - `matrix_background.md`: Canvas layering (five layers, responsive stream counts, char update rates), mouse/keyboard interactions, theme detection, and lifecycle cleanup.
    - `matrix_background_toggle.md`: `Base.astro` wrapper managing visibility state, event listeners, localStorage persistence, and rendering pause when hidden.
    - `dodecahedron_toggle.md`: Three.js button with theme-aware lighting, hover/touch behaviors, event dispatching (`toggle-matrix-background`), renderer disposal, and device pixel ratio cap.
    - `glassy_navigation_layout.md`: Navbar/Footer glassmorphism (backdrop filters, tokens), mobile drawer toggles via data attributes/classes, and consistent tokens across themes.
    - `scroll_feedback_system.md`: Scroll layout (`.page-container`, `.content`, Navbar), ScrollIndicator progress bars, Dodecahedron auto-hide logic, and scroll event-driven flows updating indicators and toggles.

Readers can drill into each entry (e.g., `blog_post_meta_footer_and_tags.md`, `visual_effects/matrix_background.md`) for implementation specifics, while the summaries outline the structural relationships, key facts, and architectural decisions across domains.
---
children_hash: a5d85dde9afc267dee9bcbe88d889f72f3d72d79648b9b7c7d571881198200ca
compression_ratio: 0.632258064516129
condensation_order: 2
covers: [context.md, handoffs/_index.md, run_commands/_index.md]
covers_token_total: 775
summary_level: d2
token_count: 490
type: summary
---
## project_management

- **Domain intent:** Capture session handoff summaries (completed tasks, decisions, blocked/pending work, touched files) so new contributors can resume work quickly; excludes deep implementation detail.
- **Ownership:** Gustavo Adrián Salvini.
- **Entry reference:** `context.md`.

## handoffs

- **Purpose:** Chronicle April 4, 2026 state (SEO/metadata rollout, centralized post styling, canonical title rules, pending Playwright E2E work); cross-links to `project_guidelines/dev_process`.
- **`handoff_2026_04_04.md`:**
  - **Task flow:** Completed SEO/Open Graph/Twitter metadata updates with canonical URL logic; component updates touching `Head.astro`, `Navbar`, `Footer`, `Base`, `BlogPost`, `index.astro`, and targeted blog pages; future Playwright/blog-post work remains outstanding.
  - **Architecture/style outcomes:** Shared blog styling consolidated into `src/styles/post-content.css`, with homepage/global/page/post-list CSS aligned; typography, tables, and “The SE Blog | Gustavo Adrián Salvini” title/logo unified; canonical configuration anchored to `https://dev.ecim.tech`, content max width capped at 900px on large screens (100% on small).
  - **Dependencies/facts:** Playwright E2E and new blog-post creation pending; no blockers noted.
  - **Rules note:** Do not generate/process new handoff files unless requested; complete pending checklist before closing iteration.

## run_commands

- **`git_worktree_location.md`:**
  - **Purpose:** Require all worktrees to reside under `<project_folder>/.worktrees/<branch_name>` to keep repositories centralized.
  - **Flow:** Create feature branch, run `git worktree add .worktrees/<branch_name> -b <branch_name>`, find the new worktree under `.worktrees`.
  - **Dependency:** `.worktrees` directory must exist at project root beforehand.
  - **Highlight/fact:** Centralized worktrees ease cleanup, onboarding, and tooling; no worktree should exist outside the enforced path.
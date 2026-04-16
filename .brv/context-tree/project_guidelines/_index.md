---
children_hash: 6898ad1bca7bc9bc34ef7c4963ffbcf2d2eda1af729e087c9551276dfc32cc66
compression_ratio: 0.1880481337956353
condensation_order: 2
covers: [agents/_index.md, architecture/_index.md, blog_post_architecture/_index.md, context.md, dev_process/_index.md, git_safe_mutations/_index.md, harness_engineering/_index.md, run_commands/_index.md, ui_design/_index.md]
covers_token_total: 4903
summary_level: d2
token_count: 922
type: summary
---
# Domain: Project Guidelines (Level d2 Summary)

The `project_guidelines` domain establishes the foundational standards for the Software Engineering Blog, integrating specialized agent orchestration, strict development workflows, and a cohesive architectural framework for interactive content.

## Agent Ecosystem & Orchestration
The project operates on a **Fork-Join dispatcher model** managed by a central `@orchestrator`. This system is designed to minimize "entropy" (uncoordinated drift) through strict constraints and budget management.

*   **Orchestration Framework**: Uses the **Envolvente Convergente** mental model, employing Barrier and Lyapunov functions to ensure task convergence. Parallel execution is permitted only for independent outputs (e.g., different files).
*   **Drift Management**: The system monitors for signals such as scope expansion, schema mismatches, and excessive auto-correction loops (>2 iterations).
*   **Context Budgeting**: Sub-agents are capped at **~5,800 tokens**. Global state is maintained in `session-state.md` (never passed to sub-agents), while `_handoff` commands facilitate state transfer between roles.
*   **Specialized Roles**: Includes `@project-leader`, `@component-builder`, `@blog-writer`, `@tester`, and `@plan`.
*   **Drill-down**: See `agents/` for orchestration patterns and `harness_engineering/` for the mathematical convergence framework.

## Development Process & Git Policy
Consistency is enforced through a **pnpm-only** workflow and mandatory quality gates.

*   **Git Mutation Gating**: Explicit user consent is required for all `git commit` or `push` operations, regardless of lint/test success.
*   **Worktree Policy**: Mandatory for new features and refactors; direct `main` commits are restricted to trivial fixes.
*   **Quality Gates**: `pnpm lint`, `pnpm typecheck`, and relevant tests (Vitest/Playwright) must pass before any commit.
*   **Security**: Strict prohibition against committing secrets, API keys, or `.env` files.
*   **Drill-down**: Refer to `dev_process/` for code standards and `git_safe_mutations/` for consent rules.

## Blog Post & UI Architecture
The blog utilizes an **Astro + React hybrid model**, prioritizing layout stability and interactive navigation.

*   **Structural Requirements**: Posts must use the `BlogPost` layout and `SectionNav` component (`client:load`). Content is organized into discrete `panel` sections with strict ID naming (`panel-{id}`).
*   **State Persistence**: Managed via a unified `localStorage` key (`gsalvini-se-blog`) in `src/utils/storage.ts`. It handles theme, background visibility, and checklist states with SSR-safe guards.
*   **Mobile Performance**: Implements early viewport detection in the document head to prevent hydration flickering. Mobile viewports (<767px) trigger specific CSS adaptations and container constraints (`overscroll-behavior: none`).
*   **Design Constraints**: Navigation icons are restricted to a specific set (e.g., `◈ ▸ ▣ ◑ ⊕`).
*   **Drill-down**: See `blog_post_architecture/` for layout rules, `ui_design/` for mobile patterns, and `architecture/` for state persistence logic.

## Execution & Deployment
Standardized commands ensure environment parity from local development to production.

*   **Lifecycle Scripts**: `pnpm dev` (port 4321), `pnpm build`, and `pnpm preview`.
*   **Testing Suite**: Bifurcated into **Vitest** (unit/regression) and **Playwright** (E2E).
*   **Production Upload**: Managed via `/dist-upload` using `gsupload -b frontend`. The system supports interactive relaying of production prompts to the user.
*   **Drill-down**: See `run_commands/` for the full script manifest and deployment workflows.
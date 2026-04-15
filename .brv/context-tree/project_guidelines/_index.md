---
children_hash: a67cd9c4c4905387df4c52bfc805b7beeb58a1196a9290eefb5749ef04b2f37a
compression_ratio: 0.19461471103327496
condensation_order: 2
covers: [agents/_index.md, architecture/_index.md, blog_post_architecture/_index.md, context.md, dev_process/_index.md, git_safe_mutations/_index.md, harness_engineering/_index.md, run_commands/_index.md, ui_design/_index.md]
covers_token_total: 4568
summary_level: d2
token_count: 889
type: summary
---
# Domain: Project Guidelines (d2 Summary)

This domain establishes the architectural, operational, and governance standards for the Software Engineering Blog. It integrates agent-driven development workflows with a rigorous interactive UI framework and centralized state management.

## 1. Agent Governance & Orchestration
The project operates under a strict agent-driven framework defined by the **AGENTS.md** manifesto.
*   **Operational Standards**: Mandates a **pnpm-only** workflow, **TypeScript strict mode**, and **git worktrees** for non-trivial features. Agents are prohibited from committing secrets or including their names in documentation (see `agents/project_agent_handbook.md`).
*   **Harness Engineering**: Employs the **Envolvente Convergente Framework**, using Barrier and Lyapunov functions to ensure sub-agent interventions converge toward project goals while managing entropy and drift (see `agents/harness_engineering/_index.md`).
*   **Context Management**: Strictly budgets sub-agent context to **~5800 tokens**. Global state is maintained in `session-state.md` and transferred via standardized handoff templates (see `agents/context_window_and_handoff_strategy.md`).
*   **Mutation Gating**: All git commits and pushes require explicit user consent, regardless of lint or typecheck success (see `project_guidelines/git_safe_mutations/_index.md`).

## 2. Blog Architecture & UI Standards
Every blog post follows a standardized interactive layout to ensure platform-wide consistency.
*   **Layout Pattern**: Posts must utilize the `BlogPost` layout and `SectionNav` component (with `client:load`). Content is organized into a **Panel System** where IDs follow the `panel-{section.id}` pattern (see `blog_post_architecture/_index.md`).
*   **Visual Language**: Navigation icons are restricted to an approved set (◈ ▸ ▣ ◑ ⊕ ⬡). Reusable components like `Highlight`, `Card`, and `ConvergentEnvelope` are mandatory for cohesive styling.
*   **Mobile Performance**: Implements early viewport detection (mobile < 767px) in the document head to prevent hydration flickering and layout shifts. `SectionNav` automatically expands at viewports > 1024px (see `ui_design/mobile_ui_performance_patterns.md`).

## 3. Development Process & Infrastructure
The repository enforces a standardized lifecycle for code quality and deployment.
*   **Workflow Gates**: Core flow requires style enforcement → `pnpm lint/typecheck/format` → Vitest/Playwright execution → Conventional Commits → PR via `gh` CLI (see `dev_process/_index.md`).
*   **State Persistence**: Centralized management via `src/utils/storage.ts` using a single `localStorage` key (`gsalvini-se-blog`). It handles theme, background visibility, and checklist states with SSR-safe window checks (see `architecture/state_persistence_and_storage.md`).
*   **Execution Environment**: Defines standardized commands for local development (`pnpm dev`), testing (`pnpm test`, `pnpm test:e2e`), and production asset management via the `/dist-upload` command (see `run_commands/_index.md`).

## 4. Key Drill-down References
*   **agents/**: Core governance, sub-agent anatomy, and orchestration rules.
*   **architecture/**: State persistence logic and storage schemas.
*   **blog_post_architecture/**: BlogPost layout conventions and panel systems.
*   **dev_process/**: Coding standards, import ordering, and PR workflows.
*   **harness_engineering/**: Mathematical models for convergence and context budgeting.
*   **run_commands/**: Script manifest for build, test, and production deployment.
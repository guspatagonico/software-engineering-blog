---
children_hash: 9ffc615a27297f2424d69f570471df9af7c93e2be8ec45bb9160a0c344b5a97c
compression_ratio: 0.26880222841225626
condensation_order: 2
covers: [agents/_index.md, blog_post_architecture/_index.md, context.md, dev_process/_index.md, git_safe_mutations/_index.md, harness_engineering/_index.md, run_commands/_index.md]
covers_token_total: 3590
summary_level: d2
token_count: 965
type: summary
---
# Domain: Project Guidelines (d2 Summary)

This domain establishes the foundational standards for the Software Engineering Blog, governing agent orchestration, development workflows, and architectural consistency. It integrates rigorous technical gates with a specialized framework for autonomous agent collaboration.

## 1. Agent Governance & Orchestration
The repository operates under a strict agent-driven model defined by the **AGENTS.md** manifesto and the **Harness Engineering** framework.
*   **Operational Standards**: Mandates a **pnpm-only** workflow, **TypeScript strict mode**, and **git worktrees** for non-trivial features. Agents are prohibited from committing secrets or identifying themselves in documentation (see `agents/project_agent_handbook.md`).
*   **Envolvente Convergente Framework**: A mathematical mental model using **Barrier Functions (CBF)** and **Lyapunov Functions** to ensure agent interventions converge toward goals while managing entropy and drift (see `harness_engineering/envolvente_convergente_framework.md`).
*   **Sub-Agent Anatomy**: Ephemeral units with scope descriptions **≤ 2 sentences**, defined context budgets (~5800 tokens), and explicit output contracts (see `agents/sub_agent_design_and_anatomy.md`).
*   **Orchestration Patterns**: Uses a **Fork-Join** pattern for parallel tasks. Drift signals (e.g., auto-correction loops >2) trigger interrupts. Orchestrators maintain `session-state.md` as the global source of truth (see `agents/orchestration_and_drift_management.md`).

## 2. Development Process & Quality Gates
A standardized lifecycle ensures code quality and repository safety across all environments.
*   **Workflow Flow**: Style enforcement → `pnpm lint/typecheck/format` → Test execution (Vitest/Playwright) → Conventional commit → Push via worktree → `gh` PR creation (see `dev_process/_index.md`).
*   **Git Mutation Gating**: Explicit user consent is required for any `git commit` or `push` operation, regardless of automated check success (see `git_safe_mutations/git_mutation_approval_rule.md`).
*   **Command Families**: Centralized pnpm scripts for setup (`install`), development (`dev`), production (`build/preview`), and verification (`test`, `test:e2e`) (see `run_commands/build_and_run_commands.md`).
*   **Coding Standards**: 2-space indentation, single quotes, and ordered imports (Node → Astro → `@/` aliases → relative) (see `dev_process/development_process_and_rules.md`).

## 3. Blog Architecture & UI Standards
Consistency across the Astro-based platform is maintained through enforced layout patterns and shared components.
*   **Layout Pattern**: Every post must import the `BlogPost` layout and integrate `SectionNav` with `client:load`. New posts must be registered in `src/pages/index.astro` (see `blog_post_architecture/_index.md`).
*   **Panel System**: Content is organized into `div` panels with IDs following the `panel-{section.id}` pattern. The initial view is controlled via the `panel active` class.
*   **UI Components**: Reusable components include `Highlight`, `Card`, and `ConvergentEnvelope`. Media must use the `astro:assets` `<Image />` component.
*   **Visual Language**: Navigation icons are restricted to an approved set (e.g., ◈ ▸ ▣ ◑ ⊕ ⬡) to ensure UI uniformity (see `agents/context.md`).

## 4. Resource & Context Management
To prevent context collapse and maintain performance, strict resource budgeting is applied.
*   **Context Budgeting**: Sub-agent context is capped at **~5800 tokens**, partitioned into System (800), Spec (1500), Files (3000), and Handoff (500) (see `agents/context_window_and_handoff_strategy.md`).
*   **Handoff Strategy**: Standardized templates facilitate responsibility transfers between specialized agents (e.g., `pmpro-css` to `pmpro-js`), documenting artifacts, key state, and result status (DONE|PARTIAL|BLOCKED).
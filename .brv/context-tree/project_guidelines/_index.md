---
children_hash: bcfc4542e0fbb59c31cd43bc260b3b6610bb9a82dc0806c73e2dfa4f5e572119
compression_ratio: 0.19061913696060037
condensation_order: 2
covers: [agentic-control-loop-harness-engineering-integration.md, agents/_index.md, architecture/_index.md, blog_post_architecture/_index.md, context.md, dev_process/_index.md, git_safe_mutations/_index.md, harness_engineering/_index.md, run_commands/_index.md]
covers_token_total: 5330
summary_level: d2
token_count: 1016
type: summary
---
# Project Guidelines: Structural Summary (Level d2)

The Software Engineering Blog project is governed by a high-integrity development lifecycle that integrates formal control theory into agentic workflows, a strict Astro-based architectural standard, and automated quality gates.

## Agentic Orchestration and Harness Engineering
The project utilizes a specialized **Dispatcher Pattern** to manage complex tasks through parallel sub-agents, governed by the **Harness Engineering** framework to prevent "Agentic Entropy" or drift.

*   **Control Theory Integration**: The **Envolvente Convergente** framework uses Lyapunov and Barrier functions to ensure agent actions monotonically approach objectives. This is visualized via the **Harness Agentic Control** UI, featuring a 'Drift Map' and Evidence Cards.
*   **Orchestration Patterns**: A central orchestrator manages a **Fork-Join pattern** for parallel execution. Parallelism is restricted to independent branches with no shared write-access.
*   **Context and Budgeting**: Sub-agents operate under a strict **5,800 token budget** following the "Rule of Gold" (scopes must be describable in two sentences). Global state is maintained in `session-state.md` and is excluded from sub-agent contexts to prevent saturation.
*   **Drift Management**: Orchestrators monitor for signals such as scope expansion, barrier violations, and auto-correction loops, triggering redirection when detected.
*   **Drill-down**: See **agents/_index.md**, **harness_engineering/_index.md**, and **agentic-control-loop-harness-engineering-integration.md**.

## Technical Architecture and State Management
The system employs an **Astro + React hybrid "Island" architecture**, prioritizing performance and centralized state integrity.

*   **D2 Diagram Optimization**: Implements a three-tier rendering pattern (detection-transformer-renderer). The ~8MB D2 WASM module is lazy-loaded as a `manualChunk` (`d2-wasm`) only when `[data-d2-diagram="true"]` markers are detected.
*   **Centralized Persistence**: All user preferences (theme, background visibility, interactive states) are stored under a single `localStorage` key: `gsalvini-se-blog`. Operations must use the `updateStorage` helper to ensure SSR safety and data integrity.
*   **Blog Post Standards**: Every post must implement the `BlogPost` layout and `SectionNav` component (`client:load`). Content is organized into discrete panels using the `id="panel-{id}"` convention, with the first panel marked `active`.
*   **Drill-down**: See **architecture/_index.md** and **blog_post_architecture/_index.md**.

## Development Process and Quality Gates
The repository enforces a standardized, high-integrity workflow centered on **pnpm** and strict TypeScript enforcement.

*   **Workflow and Tooling**: **pnpm** is the exclusive package manager. The standard lifecycle progresses from `install` to `dev`, `lint`, `typecheck`, and `build`. **Conventional Commits** and the **GitHub CLI (gh)** are mandatory for state changes.
*   **Git Mutation Gating**: Explicit user consent is required for all git mutations (commit, push, force-push), as codified in **AGENTS.md line 229**. Lint and typecheck success do not override this requirement.
*   **Testing Layers**: Testing is bifurcated into unit/regression tests via **Vitest** and E2E testing via **Playwright**.
*   **Asset and Content Management**: The project is transitioning from `.astro` to `.mdx` for blog posts. Post-specific assets must reside in `src/assets/posts/<slug>/` and use the Astro `<Image />` component.
*   **Deployment**: Production assets are managed via the `/dist-upload` command, which utilizes `gsupload` with interactive confirmation relaying.
*   **Drill-down**: See **dev_process/_index.md**, **run_commands/_index.md**, and **git_safe_mutations/_index.md**.

## Domain Governance
*   **Ownership**: Gustavo Adrián Salvini.
*   **Purpose**: To maintain consistency across environments for the interactive blog through standardized build, lint, and test gates.
*   **Drill-down**: See **context.md**.
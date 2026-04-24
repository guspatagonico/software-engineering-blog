---
children_hash: 5ffc45d19eb5ab38f895ae773eae523e00b0f7c08fc763c8705952607041d9b3
compression_ratio: 0.1839426191577973
condensation_order: 2
covers: [agents/_index.md, blog_post_architecture/_index.md, context.md, dev_process/_index.md, git_safe_mutations/_index.md, harness_engineering/_index.md, run_commands/_index.md]
covers_token_total: 4322
summary_level: d2
token_count: 795
type: summary
---
# Domain: project_guidelines (Level d2 Summary)

The `project_guidelines` domain establishes the high-integrity operational framework for the Software Engineering Blog. It integrates agentic orchestration, strict architectural standards, and automated development workflows to ensure consistency across the Astro + React hybrid environment.

## 1. Agent Ecosystem and Orchestration
The project operates via a **Dispatcher Pattern**, utilizing specialized sub-agents (e.g., `@blog-writer`, `@tester`) managed by an `@orchestrator`.
*   **Control Theory Framework**: The **Envolvente Convergente Framework** uses Lyapunov functions and Barrier Functions (CBF) to ensure agent behavior monotonically approaches objectives while preventing scope drift.
*   **Drift & Entropy Management**: Orchestration interventions are triggered by "Entropía Agéntica" signals, including scope expansion, barrier violations, or excessive correction loops.
*   **Operational Budgets**: Sub-agents adhere to the **"Rule of Gold"** (scopes must be describable in <2 sentences) and a strict **~5800-token context budget**.
*   **Drill-down**: `agents/_index.md`, `harness_engineering/_index.md`.

## 2. Core Architecture and Blog Standards
The repository utilizes an **Astro + React hybrid island architecture**, where React is reserved for interactive visualizations and mathematical notations.
*   **Blog Post Structure**: All posts must implement the `BlogPost` layout and `SectionNav` component (using `client:load`). Content is organized into discrete panels (`id="panel-{id}"`) with specific CSS class transitions (`panel active`).
*   **Asset Management**: Local images must use the Astro `<Image />` component. Post-specific assets are localized in `src/assets/posts/<slug>/`.
*   **Design System**: Visual consistency is enforced through a restricted icon set (e.g., ◈, ▣, ⬡) and shared UI components like `ConvergentEnvelope`.
*   **Drill-down**: `blog_post_architecture/_index.md`, `dev_process/_index.md`.

## 3. Development Process and Quality Gates
A standardized, **pnpm-exclusive** workflow governs all lifecycle phases from local development to production.
*   **Command Lifecycle**: The standard progression is `pnpm install` → `pnpm dev` → `pnpm lint` → `pnpm typecheck` → `pnpm build`.
*   **Git & Mutation Policy**: **Conventional Commits** are mandatory. The **Git Mutation Gating** rule requires explicit user consent before any `commit` or `push`, regardless of lint/typecheck success. Complex features must use **Git Worktrees** in `.worktrees/`.
*   **Testing Suite**: Bifurcated into unit/regression testing via **Vitest** and E2E testing via **Playwright**.
*   **Drill-down**: `dev_process/_index.md`, `run_commands/_index.md`, `git_safe_mutations/_index.md`.

## 4. Environment and Security
*   **Secrets & Safety**: Committing credentials or `.env` files is strictly prohibited. Destructive Git commands (force push/hard reset) are banned unless explicitly authorized.
*   **Deployment**: Production assets are managed via the `/dist-upload` command, which utilizes `gsupload` with interactive response piping.
*   **Drill-down**: `run_commands/_index.md`, `context.md`.
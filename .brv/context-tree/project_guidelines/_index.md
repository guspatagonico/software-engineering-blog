---
children_hash: 91dc3b7c622a353968768789eec48ad4ffe6e38ce760c42b65d59329b061b0eb
compression_ratio: 0.24923857868020305
condensation_order: 2
covers: [agents/_index.md, architecture/_index.md, blog_post_architecture/_index.md, context.md, dev_process/_index.md, git_safe_mutations/_index.md, harness_engineering/_index.md, run_commands/_index.md]
covers_token_total: 3940
summary_level: d2
token_count: 982
type: summary
---
# Domain: Project Guidelines (d2 Summary)

This structural summary synthesizes the architectural standards, operational workflows, and engineering frameworks governing the Software Engineering Blog. It establishes a unified model for agent-driven development, state management, and interactive content delivery.

## 1. Agent Governance and Orchestration
The development lifecycle is managed through a rigorous agent-orchestration framework that prioritizes context efficiency and safety.

*   **Operational Standards (agents/_index.md, context.md)**: Mandates a **pnpm-only** workflow, **TypeScript strict mode**, and **git worktrees** for non-trivial features. Security is enforced via a strict prohibition on committing secrets and a requirement for explicit user consent before any git mutation (**git_safe_mutations/_index.md**).
*   **Sub-Agent Anatomy (agents/_index.md)**: Ephemeral units defined by the "Rule of Gold" (scope ≤ 2 sentences). They operate within a strict **~5800 token context budget** and utilize standardized handoff templates (Summary, Artifacts, Key State, Result status).
*   **Orchestration Patterns (agents/_index.md, harness_engineering/_index.md)**: Employs a **Fork-Join pattern** for parallel execution, ensuring branches write to independent files. The orchestrator monitors for "drift signals" such as scope expansion or repeated correction loops.

## 2. Engineering Frameworks
The repository utilizes specialized mental models and centralized utilities to maintain system integrity.

*   **Envolvente Convergente (harness_engineering/_index.md)**: A mathematical framework for solution convergence using **Barrier Functions (CBF)** to prohibit invalid regions and **Lyapunov Functions** to reduce distance to the target goal.
*   **State Persistence (architecture/_index.md)**: Centralized state management via `src/utils/storage.ts` using a unified `localStorage` key (`gsalvini-se-blog`). It handles schema migration for legacy keys and implements SSR guards for Astro compatibility.
*   **Quality Gates (run_commands/_index.md, dev_process/_index.md)**: Enforces a strict flow: `pnpm lint/typecheck/format` → Vitest/Playwright testing → Conventional Commits → PR creation via `gh` CLI.

## 3. Blog Architecture and UI Standards
Consistency across interactive blog posts is maintained through enforced layout patterns and component reuse.

*   **Layout Pattern (blog_post_architecture/_index.md, agents/_index.md)**: Every post must import the `BlogPost` layout and render `SectionNav` with `client:load`.
*   **Panel System**: Content must be organized into `div` panels with IDs following the `panel-{section.id}` pattern. The initial state requires the first panel to be marked `panel active`.
*   **Visual Language**: Restricts navigation icons to an approved set (◈ ▸ ▣ ◑ ⊕ ⬡) and mandates the use of `astro:assets` for media.
*   **Shared Components**: Cohesive styling is achieved through the reuse of `Highlight`, `Card`, and `ConvergentEnvelope` components.

## 4. Command and Workflow Reference
*   **Setup & Dev**: `pnpm install` and `pnpm dev` (port 4321).
*   **Verification**: `pnpm lint`, `pnpm typecheck`, `pnpm test` (Vitest), and `pnpm test:e2e` (Playwright).
*   **Git Policy**: Explicit approval is required for all mutations; lint/typecheck success does not override this gate (**git_mutation_approval_rule.md**).

### Drill-down References
*   **agents/**: Detailed agent manifesto, handoff strategies, and orchestration invariants.
*   **harness_engineering/**: Mathematical foundations of the convergence framework and animation constants.
*   **architecture/**: Persistence schema and storage migration logic.
*   **blog_post_architecture/**: Specific panel conventions and UI component integration.
*   **dev_process/**: Naming conventions, import ordering, and PR workflows.
*   **run_commands/**: Comprehensive pnpm script definitions and quality gate commands.
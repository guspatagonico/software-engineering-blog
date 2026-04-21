---
children_hash: 44c1518d67da42cc27d53774286a9becb8e8107f9f7d7761ce496960611275b0
compression_ratio: 0.1917368632170076
condensation_order: 2
covers: [agents/_index.md, architecture/_index.md, blog_post_architecture/_index.md, context.md, dev_process/_index.md, git_safe_mutations/_index.md, harness_engineering/_index.md, run_commands/_index.md, ui_design/_index.md]
covers_token_total: 4986
summary_level: d2
token_count: 956
type: summary
---
# Project Guidelines Structural Summary (Level d2)

The Software Engineering Blog project is governed by a high-integrity development framework that integrates specialized agent orchestration, strict architectural patterns, and automated quality gates. The system prioritizes consistency across its Astro + React hybrid environment through standardized workflows and durable state management.

### Agent Ecosystem & Orchestration
The project employs a **Fork-Join dispatcher model** managed by a central **@orchestrator**. This framework is designed to minimize "drift" (uncoordinated local optimizations) and maintain strict context efficiency.
*   **Orchestration Framework**: Utilizes the **Envolvente Convergente** mental model, applying Barrier and Lyapunov functions to ensure agent actions converge toward project goals.
*   **Drift Management**: Systems monitor for scope expansion, schema mismatches, and repeated correction loops.
*   **Context Budgeting**: Sub-agents operate under a strict **~5,800 token budget**. Global state is maintained in `session-state.md` and transferred via compressed templates in `_handoffs/`.
*   **Drill-down**: See `agents/` for agent specifications and `harness_engineering/` for the mathematical foundations of the convergence framework.

### Core Architecture & State Management
The technical stack is a **Hybrid Island Architecture** using **Astro** for static content and **React** for interactive "islands."
*   **State Persistence**: Centralized in `src/utils/storage.ts` using a unified `localStorage` key (`gsalvini-se-blog`). It manages theme, background visibility, and checklist states with built-in SSR safety and legacy migration logic.
*   **UI/UX Standards**: Mobile performance is prioritized through early viewport detection (inline scripts in `<head>`) to prevent hydration flickering. Layout stability is enforced via precomputed states for async labels.
*   **Drill-down**: Refer to `architecture/` for persistence logic and `ui_design/` for mobile performance patterns.

### Development Process & Quality Gates
A standardized lifecycle ensures repository integrity through mandatory automation and strict git policies.
*   **Workflow**: Strictly **pnpm-only**. The standard lifecycle follows `install` → `dev` → `lint` → `typecheck` → `build`.
*   **Git Policy**: Complex features require **Git Worktrees** in `.worktrees/`. A "Git Mutation Gating" rule requires explicit user consent before any `commit` or `push`, regardless of lint success.
*   **Testing**: Bifurcated into unit/regression testing (**Vitest**) and E2E testing (**Playwright**).
*   **Drill-down**: See `dev_process/` for workflow rules, `run_commands/` for the script manifest, and `git_safe_mutations/` for mutation approval protocols.

### Blog Post Structural Standards
All blog content must adhere to specific structural requirements to maintain interactivity and visual cohesion.
*   **Layout Requirements**: Every post must implement the `BlogPost` layout and the `SectionNav` component (loaded with `client:load`).
*   **Panel System**: Content must be organized into discrete panels using `id="panel-{id}"` naming conventions.
*   **Asset Management**: Local images must use the Astro `<Image />` component. Post-specific assets are localized to `src/assets/posts/<slug>/`.
*   **Visual Consistency**: Navigation icons are restricted to a predefined set (e.g., `◈ ▸ ▣ ◑ ⊕ ⬡`).
*   **Drill-down**: Detailed layout and component rules are located in `blog_post_architecture/`.

### Key Repository Rules
*   **Rule 3**: Never use apologies.
*   **Security**: API keys and secrets must never be committed; agent names are prohibited in metadata.
*   **SLA**: Initial PR reviews have a maximum 4-hour SLA.
*   **Change Freeze**: Requirement changes after Day 3 of a sprint are deferred.
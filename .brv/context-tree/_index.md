---
children_hash: f3addb622e0087a5bd070fa5938f1f1f77647db36b8b0a552dd6cc6c08133195
compression_ratio: 0.31858688733290896
condensation_order: 3
covers: [facts/_index.md, project_guidelines/_index.md, project_management/_index.md, ui/_index.md]
covers_token_total: 3142
summary_level: d3
token_count: 1001
type: summary
---
# Software Engineering Blog Knowledge Base Summary (Level d3)

This structural summary integrates the foundational guidelines, management practices, and UI architecture of the Software Engineering Blog project. It synthesizes the project's commitment to strict development workflows, specialized agent orchestration, and an immersive, high-performance interactive interface.

## 1. Core Project Governance & Workflow
The project is governed by strict quality gates and environment isolation policies to ensure repository integrity and session continuity.

*   **Development Standards**: Enforces a **pnpm-only** workflow. Mandatory quality gates (`pnpm lint`, `pnpm typecheck`, Vitest/Playwright) must pass before any commit.
*   **Git & Mutation Policy**: Mandatory use of **Git worktrees** for all non-trivial features, located in `.worktrees/<branch_name>`. Explicit user consent is required for all `git commit` or `push` operations.
*   **Session Management**: Employs a **Hybrid State Strategy**. Durable knowledge (patterns/preferences) is managed by ByteRover, while ephemeral session state (tasks/blockers) is tracked via `_handoff` files.
*   **Drill-down**: See `project_guidelines/dev_process/`, `project_management/git_workflow/`, and `project_management/handoffs/`.

## 2. Agent Ecosystem & Orchestration
The system utilizes a specialized multi-agent architecture designed to minimize uncoordinated drift and maximize task convergence.

*   **Orchestration Framework**: Operates on a **Fork-Join dispatcher model** managed by `@orchestrator`. It uses the **Envolvente Convergente** mental model (Barrier and Lyapunov functions) to ensure task completion.
*   **Operational Constraints**: Sub-agents (e.g., `@blog-writer`, `@component-builder`) are capped at a **~5,800 token budget**. Global state is maintained in `session-state.md` and never passed directly to sub-agents.
*   **Drift Monitoring**: The system triggers alerts for scope expansion, schema mismatches, or auto-correction loops exceeding two iterations.
*   **Drill-down**: See `project_guidelines/agents/` and `project_guidelines/harness_engineering/`.

## 3. UI Architecture & Interactive Design
The blog is built on an **Astro + React hybrid model**, prioritizing layout stability, persistent state, and immersive visual effects.

*   **Structural Framework**: All posts must utilize the `BlogPost` layout and `SectionNav` component (`client:load`). Content is organized into discrete `panel-{id}` sections.
*   **Content Styling**: A utility-first CSS framework (`post-content.css`) standardizes technical documentation, including responsive grids and specialized vocabulary layouts.
*   **Interactive Systems**: 
    *   **SectionNav**: React-based navigation that synchronizes active states with URL hashes and `matchMedia` breakpoints.
    *   **Visual Effects**: Includes a WebGL/Canvas **Matrix Background** (digital rain with mouse forces) and a Three.js **Dodecahedron Interface** for effect toggling.
*   **Performance & Persistence**: Implements early viewport detection to prevent hydration flickering. State (theme, checklists, background visibility) is persisted via a unified `localStorage` key (`gsalvini-se-blog`).
*   **Drill-down**: See `ui/blog_post_layout/`, `ui/navigation/`, `ui/visual_effects/`, and `project_guidelines/ui_design/`.

## 4. Communication & Personalization
Captures individualized preferences to guide agent behavior and maintain stylistic consistency.

*   **Caveman Mode**: A specific communication preference for terse, fragment-based responses that omit filler while maintaining strict technical accuracy.
*   **Drill-down**: See `facts/personal/`.

## 5. Execution & Deployment
Standardized lifecycle scripts ensure parity across environments.

*   **Scripts**: `pnpm dev` (port 4321), `pnpm build`, and `pnpm preview`.
*   **Deployment**: Production uploads are handled via `/dist-upload` using `gsupload -b frontend`.
*   **Drill-down**: See `project_guidelines/run_commands/`.
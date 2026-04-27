---
children_hash: c126fba9c20b2e9fc76c0bb95c7c0bef0a752c4d441c8b2111360647a92ecc16
compression_ratio: 0.33379026730637423
condensation_order: 3
covers: [facts/_index.md, project_guidelines/_index.md, project_management/_index.md, ui/_index.md]
covers_token_total: 2918
summary_level: d3
token_count: 974
type: summary
---
# Structural Summary: Software Engineering Blog Knowledge Base (Level d3)

This summary synthesizes the operational, architectural, and visual standards of the Software Engineering Blog, integrating agent-driven development with a high-performance Astro/React frontend.

## 1. Agent Ecosystem & Operational Framework
The project utilizes a **Dispatcher Pattern** where an `@orchestrator` manages specialized sub-agents (e.g., `@blog-writer`, `@tester`) within a strict **~5800 token budget**.

*   **Harness Engineering**: Guided by the **Envolvente Convergente** model, ensuring agent actions monotonically approach project objectives through control theory principles.
*   **Drift & Orchestration**: Employs a **Fork-Join pattern** for parallel execution, triggered by "drift signals" like scope expansion or auto-correction loops.
*   **Handoff Strategy**: Uses a **Hybrid State Strategy** where durable knowledge (patterns/preferences) is managed by ByteRover, while ephemeral session state (tasks/blockers) is tracked via **Compressed Handoff Templates** in `_handoffs/`.
*   **Drill-down**: `project_guidelines/agents/_index.md`, `project_guidelines/harness_engineering/_index.md`, `project_management/handoffs/_index.md`.

## 2. Core Architecture & Technical Standards
The site follows an **Astro + React "Island" architecture**, prioritizing static performance with targeted interactivity.

*   **Blog Post Structure**: Mandatory `BlogPost` layout and `SectionNav` component (`client:load`). Content is organized into `panels` with strict `panel-{id}` naming and specific CSS transitions.
*   **Diagram Pipeline**: A three-tier system for D2/WASM assets using dynamic imports (`D2DiagramsTransformer.tsx`) and a `MutationObserver` for theme synchronization.
*   **Persistence Layer**: Centralized in `src/utils/storage.ts` using a single `gsalvini-se-blog` localStorage key for themes, toggles, and checklist states.
*   **Development Workflow**: Exclusive use of **pnpm**. Strict Git policies require **Worktrees** for non-trivial features (located in `.worktrees/`) and explicit user consent for all mutations.
*   **Drill-down**: `project_guidelines/architecture/_index.md`, `project_guidelines/dev_process/_index.md`, `project_management/git_workflow/_index.md`.

## 3. UI, Visual Experience & Design Systems
The `ui` domain governs immersive components and responsive layouts through theme-aware feedback systems.

*   **Layout & Navigation**: `BlogPost.astro` enforces a layered structure (sticky header `z-index: 40`, fixed footer `z-index: 45`) and `overscroll-behavior: none` for mobile. `SectionNav` synchronizes via a hash-navigation script and `section-activated` events.
*   **Visual Effects**: 
    *   **Matrix Background**: A five-layer character rain (`MatrixBackground.tsx`) with responsive stream density (60-220 streams).
    *   **Dodecahedron Toggle**: A Three.js 3D interactive button for background state management.
    *   **Glassy UI**: Centralized `backdrop-filter` tokens in `tokens.css` for navigation and footers.
*   **Content Utilities**: Specialized styles in `src/styles/post-content.css` for vocabulary grids (175px labels), table accent highlighting (`.table-accent-2/3`), and responsive tag chips.
*   **Drill-down**: `ui/blog_post_layout/_index.md`, `ui/visual_effects/_index.md`, `ui/design_system/glossary_vocabulary_layout.md`.

## 4. Project Conventions & Governance
*   **Formatting**: Strict HTML/JSX/MDX standards; closing angle brackets (`>`) must remain on the same line as the tag boundary.
*   **Git Policy**: Conventional Commits are mandatory. The `main` branch is reserved for trivial fixes; all other changes require PRs via GitHub CLI.
*   **Security**: Strict prohibition against committing secrets or including agent names in public documentation.
*   **Drill-down**: `facts/conventions/_index.md`, `project_management/context.md`.
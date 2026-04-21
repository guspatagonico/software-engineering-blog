---
children_hash: 5cd7c7d3ae408f30f2a026b92b6ec63d743bb2894f2e297ccc2f11b7ed28c13a
compression_ratio: 0.2766975770266228
condensation_order: 3
covers: [facts/_index.md, project_guidelines/_index.md, project_management/_index.md, ui/_index.md]
covers_token_total: 3343
summary_level: d3
token_count: 925
type: summary
---
# Software Engineering Blog Structural Summary (Level d3)

The Software Engineering Blog is a high-integrity technical platform built on an Astro + React hybrid architecture. It is governed by a rigorous development framework that integrates specialized agent orchestration, mathematical convergence models for project management, and a performance-tuned UI system.

### 1. Core Architecture & Development Standards
The project utilizes a **Hybrid Island Architecture**, leveraging Astro for static content and React for interactive components.

*   **State Management**: Centralized in `src/utils/storage.ts` using a unified `localStorage` key (`gsalvini-se-blog`). It handles theme, background visibility, and checklist states with SSR safety and legacy migration logic. (Ref: `project_guidelines/architecture/`)
*   **Quality Gates**: A strictly **pnpm-only** workflow is enforced. Git operations require **Worktrees** for non-trivial tasks (located in `.worktrees/`) and a mandatory "Mutation Gating" rule requiring explicit user consent for commits/pushes. (Ref: `project_guidelines/dev_process/`, `project_management/git_workflow/`)
*   **Blog Standards**: Posts must use the `BlogPost` layout and `SectionNav` component. Content is organized into discrete panels (`id="panel-{id}"`) with assets localized to `src/assets/posts/<slug>/`. (Ref: `project_guidelines/blog_post_architecture/`)

### 2. Agent Ecosystem & Project Management
The system employs a sophisticated agent orchestration model designed to minimize "drift" and maximize context efficiency.

*   **Orchestration Framework**: Managed by a central **@orchestrator** using a **Fork-Join dispatcher model**. It applies the **Envolvente Convergente** mental model (Barrier and Lyapunov functions) to ensure agent actions converge toward project goals. (Ref: `project_guidelines/agents/`, `project_guidelines/harness_engineering/`)
*   **Context & Handoffs**: Agents operate under a strict **~5,800 token budget**. A **Hybrid State Strategy** partitions knowledge between durable architectural decisions (managed by ByteRover) and ephemeral session states (tracked in `_handoffs/`). (Ref: `project_management/handoffs/`)
*   **SLA & Governance**: PR reviews have a 4-hour SLA. Requirement changes are frozen after Day 3 of a sprint. (Ref: `project_guidelines/context.md`)

### 3. UI/UX & Visual Systems
The UI domain focuses on immersive, high-performance visuals and responsive technical documentation.

*   **Layout & Styling**: `BlogPost.astro` manages global navigation and sticky headers. Styling is driven by `post-content.css`, providing specialized utilities for data visualization, technical callouts (`.post-panel`), and glossary grids. (Ref: `ui/blog_post_layout/`, `ui/design_system/`)
*   **Navigation**: The React-based `SectionNav.tsx` manages section activation via URL hashes, using `RequestAnimationFrame` to prevent DOM race conditions. (Ref: `ui/navigation/`)
*   **Immersive Effects**: A five-layer **Matrix Background** canvas system features mouse-driven shockwaves and flicker-animated "gem words." Interactions are triggered by a Three.js-based **Dodecahedron Toggle**. (Ref: `ui/visual_effects/`)

### 4. Personal Preferences & Branding
Strict linguistic and branding constraints are enforced across all interactions and site elements.

*   **Communication Style**: Agents must use **Caveman Full Mode** (terse fragments) while maintaining a zero-paraphrase policy for technical content. (Ref: `facts/personal/caveman_style_preference.md`)
*   **Identity**: Site-wide branding is restricted to the copyright signature: `© Gustavo Adrián Salvini`. (Ref: `facts/personal/site_footer_copyright_preference.md`)
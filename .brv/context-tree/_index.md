---
children_hash: 90394eed057f3e25dd4450f98de3c5b2b0c6fd8a80059ecef998832c6bb117f7
compression_ratio: 0.3434639326254119
condensation_order: 3
covers: [facts/_index.md, project_guidelines/_index.md, project_management/_index.md, ui/_index.md]
covers_token_total: 2731
summary_level: d3
token_count: 938
type: summary
---
# Software Engineering Blog: Structural Knowledge Overview (Level d3)

This summary synthesizes the operational, architectural, and visual frameworks of the Software Engineering Blog, integrating agentic workflows with high-integrity development standards and immersive UI patterns.

## 1. Operational Framework & Agent Ecosystem
The project utilizes a high-integrity agentic model governed by strict control theory and resource management.

*   **Dispatcher Pattern & Orchestration**: Operations are managed by an `@orchestrator` directing specialized sub-agents (e.g., `@blog-writer`, `@tester`). Behavior is constrained by the **Envolvente Convergente Framework**, using Lyapunov and Barrier Functions to prevent scope drift and ensure objective convergence.
*   **Entropy Management**: System interventions are triggered by "Entropía Agéntica" signals (scope expansion or correction loops). Agents operate under a **~5800-token context budget** and the **"Rule of Gold"** (scopes must be <2 sentences).
*   **Session Continuity**: Employs a **Hybrid State Strategy**. Durable knowledge (patterns/preferences) is managed by ByteRover, while ephemeral session state (tasks/blockers) is tracked via handoff files.
*   **Drill-down**: `project_guidelines/agents/`, `project_guidelines/harness_engineering/`, `project_management/handoffs/`.

## 2. Core Architecture & Development Standards
A strict **Astro + React hybrid island architecture** ensures performance, with React reserved for interactive visualizations.

*   **Blog Standards**: Posts implement the `BlogPost` layout and `SectionNav` component. Content is organized into discrete panels (`id="panel-{id}"`) with specific CSS transitions. Local images must use the Astro `<Image />` component.
*   **Git & Mutation Policy**: **Conventional Commits** are mandatory. The **Git Mutation Gating** rule requires explicit user consent for all commits/pushes. Non-trivial work must use **Git Worktrees** located in `.worktrees/<branch_name>`.
*   **Workflow Lifecycle**: Standardized via **pnpm**: `install` → `dev` → `lint` → `typecheck` → `build`. Production deployment uses the `/dist-upload` command via `gsupload`.
*   **Drill-down**: `project_guidelines/blog_post_architecture/`, `project_guidelines/dev_process/`, `project_management/git_workflow/`.

## 3. UI, Visual Experience & Design System
The frontend focuses on immersive, theme-aware interactions and responsive structural integrity.

*   **Layout Architecture**: `BlogPost.astro` manages a layered structure with a sticky header (`z-index: 40`) and a fixed metadata footer. It enforces `overscroll-behavior: none` on mobile to prevent bounce effects.
*   **Visual Effects System**:
    *   **Matrix Background**: A five-layer character rain with responsive stream density (60-220 streams).
    *   **Dodecahedron Toggle**: A Three.js 3D interactive button that manages background state and persists via `localStorage`.
    *   **Glassy UI**: Centralized `backdrop-filter` tokens applied to navigation and footers.
*   **Content Utilities**: Specialized styles for vocabulary grids (175px labels), table accent highlighting (`.table-accent-2/3`), and responsive teal tag chips.
*   **Drill-down**: `ui/blog_post_layout/`, `ui/visual_effects/`, `ui/design_system/`.

## 4. Project Conventions & Facts
Standardized preferences and formatting rules ensure consistency across the codebase.

*   **Formatting Standards**: HTML/JSX/MDX tags must keep closing angle brackets (`>`) on the same line as the tag boundary; leading brackets on new lines are prohibited.
*   **Attribution & Ownership**: Project owned by Gustavo Adrián Salvini; managed by ByteRover context engineer.
*   **Drill-down**: `facts/conventions/`, `facts/personal/`.
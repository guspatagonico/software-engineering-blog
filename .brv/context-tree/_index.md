---
children_hash: 416042f37ed0f090bfb2a9d0c8b59e73ed6c80285e4528dfc98075da3258b61c
compression_ratio: 0.3987150415721844
condensation_order: 3
covers: [project_guidelines/_index.md, project_management/_index.md, ui/_index.md]
covers_token_total: 2646
summary_level: d3
token_count: 1055
type: summary
---
# Software Engineering Blog: Structural Knowledge Summary (Level d3)

The Software Engineering Blog project is a high-integrity Astro + React hybrid platform governed by a mathematical orchestration framework and strict architectural standards. The system prioritizes repository integrity, mobile-first performance, and immersive visual experiences through a unified development lifecycle.

### 1. Agent Orchestration & Development Governance
The project utilizes a specialized agent ecosystem designed for high-precision task execution and minimal context drift.
*   **Orchestration Framework**: Managed by a central **@orchestrator** using the **Envolvente Convergente** model (Barrier/Lyapunov functions) to ensure goal convergence. Sub-agents operate under a strict **~5,800 token budget** with state transferred via `_handoffs/`.
*   **Git & Mutation Policy**: Enforces environment isolation via **Git Worktrees** in `.worktrees/`. A "Git Mutation Gating" rule requires explicit user consent for all commits/pushes.
*   **Session Continuity**: Employs a **Hybrid State Strategy** where durable knowledge (patterns/preferences) is separated from ephemeral session state (tasks/blockers).
*   **Drill-down**: `project_guidelines/agents/`, `project_guidelines/harness_engineering/`, `project_management/git_workflow/`, `project_management/handoffs/`.

### 2. Core Architecture & State Management
The technical stack leverages a **Hybrid Island Architecture** to balance static content delivery with interactive stateful components.
*   **State Persistence**: Centralized in `src/utils/storage.ts` using a unified `localStorage` key (`gsalvini-se-blog`) to manage themes, visual toggles, and checklist states with SSR safety.
*   **Mobile Performance**: Prioritizes layout stability through early viewport detection in `<head>` and precomputed states to prevent hydration flickering.
*   **Workflow**: Strictly **pnpm-only** lifecycle (`install` → `dev` → `lint` → `typecheck` → `build`) with bifurcated testing via **Vitest** and **Playwright**.
*   **Drill-down**: `project_guidelines/architecture/`, `project_guidelines/ui_design/`, `project_guidelines/dev_process/`.

### 3. UI/UX & Blog Content Standards
Content is structured into interactive panels to maintain visual cohesion and navigation accuracy.
*   **Layout Architecture**: `BlogPost.astro` implements a layered z-index system (Header: 40, Footer: 45) and enforces `overscroll-behavior: none` for mobile stability.
*   **Component Requirements**: Every post must use the `SectionNav` component (`client:load`) and organize content into discrete panels (`id="panel-{id}"`).
*   **Styling Utilities**: `src/styles/post-content.css` provides specialized layouts for glossaries (175px labels), framed metadata cards, and responsive tag chips.
*   **Asset Management**: Local images must use the Astro `<Image />` component, localized to `src/assets/posts/<slug>/`.
*   **Drill-down**: `project_guidelines/blog_post_architecture/`, `ui/blog_post_layout/`.

### 4. Visual Effects & Interactive Systems
The visual layer provides theme-aware feedback using Canvas, WebGL, and Three.js.
*   **Matrix Background**: A five-layer character rain system in `MatrixBackground.tsx` with responsive stream density (60-220). It short-circuits when inactive to preserve performance.
*   **Interactive Toggles**: A Three.js **Dodecahedron** button dispatches global events to toggle background visibility, with state persisted in `localStorage`.
*   **Glassy UI**: Centralized `backdrop-filter` patterns in `tokens.css` for navigation and footers, with saturation boosts for post cards in dark mode.
*   **Scroll Feedback**: Integrates a 3px `ScrollIndicator.astro` with a `.page-container` frame that suppresses native scrollbars.
*   **Drill-down**: `ui/visual_effects/`.

### 5. Key Repository Constraints
*   **Communication**: Rule 3 explicitly prohibits apologies in agent responses.
*   **SLA & Planning**: 4-hour SLA for PR reviews; requirement changes after Day 3 of a sprint are deferred.
*   **Security**: Agent names are prohibited in metadata; secrets must never be committed.
*   **Drill-down**: `project_guidelines/context.md`, `project_management/context.md`.
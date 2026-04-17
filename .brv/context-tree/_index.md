---
children_hash: b1ac54cc169c0c3ee300454fb570c9f604cf31738767cf6e84668a8c2456506e
compression_ratio: 0.25415533393774553
condensation_order: 3
covers: [facts/_index.md, project_guidelines/_index.md, project_management/_index.md, ui/_index.md]
covers_token_total: 3309
summary_level: d3
token_count: 841
type: summary
---
# Software Engineering Blog: Structural Knowledge Summary (Level d3)

This summary synthesizes the foundational domains of the Software Engineering Blog, integrating personal preferences, project governance, architectural standards, and UI frameworks.

## 1. Core Identity & Communication (Facts)
The **facts** domain governs the persona and branding of the platform. It enforces a strict interaction model designed for maximum efficiency and technical fidelity.
*   **Linguistic Model**: Mandates **Caveman Full Mode** (terseness, fragments, no filler) while maintaining a **Zero-paraphrase policy** for technical entities and signatures.
*   **Branding**: Strict attribution requirement for the site footer: `© Gustavo Adrián Salvini`.
*   **Drill-down**: `facts/personal/` (style and attribution).

## 2. Project Governance & Workflow (Project Management & Guidelines)
The project utilizes a highly structured development lifecycle to minimize "entropy" and ensure environment isolation.
*   **Agent Orchestration**: Operates on a **Fork-Join dispatcher model** managed by `@orchestrator`. It employs the **Envolvente Convergente** framework to ensure task convergence and manages a strict **~5,800 token budget** per sub-agent.
*   **Git & Environment Policy**: 
    *   **Isolation**: Mandatory use of **Git worktrees** located in `.worktrees/<branch_name>`.
    *   **Quality Gates**: **pnpm-only** workflow requiring `lint`, `typecheck`, and Vitest/Playwright passes before any commit.
    *   **Consent**: Explicit user approval is required for all `git commit` or `push` operations.
*   **Session Continuity**: Uses a **Hybrid State Strategy**. Durable knowledge (patterns/decisions) is curated by ByteRover, while ephemeral state (tasks/blockers) is tracked via `_handoff` files.
*   **Drill-down**: `project_guidelines/agents/`, `project_management/git_workflow/`, `project_management/handoffs/`.

## 3. Technical Architecture (Blog & UI)
The platform is built as an **Astro + React hybrid**, optimized for technical documentation and high-performance visual effects.
*   **Layout & Content**:
    *   **Standardization**: Uses `BlogPost.astro` with a sticky header and `SectionNav` for hash-based navigation. Content is partitioned into `panel-{id}` sections.
    *   **Styling**: `post-content.css` provides specialized utilities for technical callouts, data blocks, and two-column glossary grids.
*   **State & Persistence**: Centralized `localStorage` management (`gsalvini-se-blog`) handles theme, checklist completion, and scroll positions with SSR-safe guards.
*   **Visual Systems**:
    *   **Immersive UI**: Features a five-layer **Matrix Background** with mouse-driven shockwaves and a **Three.js Dodecahedron Toggle** for event dispatching.
    *   **Performance**: Implements early viewport detection to prevent hydration flickering and utilizes `RequestAnimationFrame` for DOM measurements.
*   **Drill-down**: `ui/blog_post_layout/`, `ui/visual_effects/`, `project_guidelines/blog_post_architecture/`.

## 4. Execution & Deployment
Standardized lifecycle scripts ensure parity across environments.
*   **Scripts**: `pnpm dev` (4321), `pnpm build`, and `pnpm preview`.
*   **Deployment**: Production uploads are handled via `gsupload -b frontend` through the `/dist-upload` command.
*   **Drill-down**: `project_guidelines/run_commands/`.
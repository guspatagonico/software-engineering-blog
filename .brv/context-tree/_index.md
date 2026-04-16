---
children_hash: 346e85c8d64bb125f73b175613645e76794633f4850b5fd1e0dccb824d89633c
compression_ratio: 0.3017241379310345
condensation_order: 3
covers: [facts/_index.md, project_guidelines/_index.md, project_management/_index.md, ui/_index.md]
covers_token_total: 3364
summary_level: d3
token_count: 1015
type: summary
---
# Software Engineering Blog: Structural Knowledge Summary (Level d3)

This summary integrates the foundational preferences, project guidelines, management workflows, and UI architecture of the Software Engineering Blog. It synthesizes durable knowledge across four primary domains.

## 1. Core Identity & Personal Preferences
The **facts** domain governs the persona and branding of the project, enforced by the ByteRover context engineer.
*   **Communication Model**: Mandates **Caveman Full Mode** for all agent interactions—prioritizing fragments and extreme brevity while maintaining 100% technical fidelity for entity names and signatures.
*   **Branding**: Strict attribution requirement for the site footer: `© Gustavo Adrián Salvini`.
*   **Drill-down**: `facts/personal/` for linguistic constraints and branding strings.

## 2. Project Guidelines & Agent Orchestration
The **project_guidelines** domain defines the "Envolvente Convergente" framework, balancing specialized agent automation with strict quality gates.
*   **Agent Ecosystem**: Operates on a **Fork-Join dispatcher model** managed by `@orchestrator`. Sub-agents (e.g., `@blog-writer`, `@tester`) are capped at **~5,800 tokens** and use `_handoff` commands for state transfer.
*   **Drift Control**: Monitors for scope expansion and excessive auto-correction loops (>2 iterations) to prevent uncoordinated drift.
*   **Development Workflow**: Enforces a **pnpm-only** environment. Mandatory quality gates include `pnpm lint`, `pnpm typecheck`, and Vitest/Playwright suites.
*   **Git Policy**: Explicit user consent is required for all mutations. Direct `main` commits are restricted to trivial fixes; all others require PRs.
*   **Drill-down**: `project_guidelines/agents/` for orchestration and `project_guidelines/dev_process/` for workflow rules.

## 3. Project Management & Session Continuity
The **project_management** domain ensures environment isolation and tracks ephemeral progress across sessions.
*   **Environment Isolation**: Mandatory use of **Git worktrees** located in `.worktrees/<branch_name>` for all non-trivial features and refactors.
*   **Hybrid State Strategy**: Partitioning of knowledge into **Durable** (patterns/preferences in ByteRover) and **Ephemeral** (tasks/blockers in handoff files). Agents auto-query durable knowledge but only access handoffs on request.
*   **Handoff Standards**: Files must capture completed tasks, decisions, and pending actions for the active session only.
*   **Drill-down**: `project_management/git_workflow/` for worktree policies and `project_management/handoffs/` for state strategies.

## 4. UI Architecture & Visual Framework
The **ui** domain manages the immersive, high-performance interface and interactive blog components.
*   **Layout & Content**: Uses an **Astro + React hybrid model**. `BlogPost.astro` manages scroll behavior and mobile hydration, while `post-content.css` provides standardized scaffolding for technical grids and tables.
*   **Interactive Navigation**: The `SectionNav` component synchronizes UI state with URL hashes and `matchMedia` responsive breakpoints.
*   **Visual Effects**: Includes a WebGL **Matrix Background** with interactive mouse forces and a Three.js **Dodecahedron** toggle.
*   **State Persistence**: Unified `localStorage` management (`gsalvini-se-blog`) for theme, background visibility, and checklist completion states.
*   **Mobile Optimization**: Early viewport detection in the document head prevents hydration flickering; viewports <767px trigger specific container constraints.
*   **Drill-down**: `ui/blog_post_layout/` for core architecture and `ui/visual_effects/` for animation logic.

## Key Architectural Decisions
*   **Dispatcher Model**: Fork-Join orchestration with Lyapunov-based convergence.
*   **State Store**: Unified namespaced `localStorage` for all UI preferences.
*   **Isolation**: Worktree-first development to maintain repository cleanliness.
*   **Fidelity**: Zero-paraphrase policy for technical entities despite "Caveman" stylistic compression.
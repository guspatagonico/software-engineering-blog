---
children_hash: a41eb82708c5672ab8ef550815c685116aedbc6efc64d74457355b370f79daad
compression_ratio: 0.3007246376811594
condensation_order: 3
covers: [facts/_index.md, project_guidelines/_index.md, project_management/_index.md, ui/_index.md]
covers_token_total: 3036
summary_level: d3
token_count: 913
type: summary
---
# Software Engineering Blog Knowledge Summary (Level d3)

This summary synthesizes the foundational guidelines, management protocols, and architectural systems governing the Astro-based Software Engineering Blog. It integrates agent-driven orchestration with rigorous development standards and immersive UI patterns.

## 1. Governance & Orchestration (Project Guidelines)
The repository operates under a specialized autonomous agent model that prioritizes technical fidelity and mathematical convergence.
*   **Agent Frameworks**: Governed by the **AGENTS.md** manifesto and the **Envolvente Convergente Framework**, which utilizes Barrier and Lyapunov functions to manage agent drift. Sub-agents are ephemeral units with strict **~5800 token** context budgets and explicit output contracts.
*   **Communication Standards**: The **facts** domain (specifically the `personal` topic) enforces "caveman full mode"—a preference for terse, fragment-based communication that maintains absolute technical accuracy while omitting conversational filler.
*   **Operational Rules**: Mandates **pnpm-only** workflows, **TypeScript strict mode**, and centralized **git worktrees** located in `.worktrees/<branch_name>`.
*   **Key Entries**: `project_guidelines/agents/`, `project_guidelines/harness_engineering/`, `facts/personal/caveman_style_preference.md`.

## 2. Development Lifecycle & Quality Gates
A standardized pipeline ensures repository safety and code consistency through automated and manual gates.
*   **Workflow Flow**: Style enforcement → `pnpm lint/typecheck/format` → Vitest/Playwright testing → Conventional commits → `gh` PR creation.
*   **Mutation Gating**: Explicit user consent is required for all `git commit` or `push` operations, serving as a final manual override to automated checks.
*   **Coding Standards**: Enforces 2-space indentation, single quotes, and a strict import order (Node → Astro → `@/` aliases → relative).
*   **Key Entries**: `project_guidelines/dev_process/`, `project_guidelines/git_safe_mutations/`, `project_guidelines/run_commands/`.

## 3. Project Management & Handoffs
Management is split between durable knowledge persistence and ephemeral session tracking.
*   **Hybrid State Approach**: Uses **ByteRover** for durable knowledge (patterns, decisions) and standardized handoff files for ephemeral state (tasks, blockers, touched files).
*   **Session Boundaries**: Handoffs must be session-bounded, concise, and only include newly completed work to prevent context bloat.
*   **Key Entries**: `project_management/handoffs/`, `project_management/context.md`, `project_management/handoffs/hybrid_session_state_approach.md`.

## 4. UI Architecture & Visual Systems
The blog utilizes an immersive, interactive design system built on Astro and WebGL/Canvas.
*   **Blog Layout**: Centered on `BlogPost.astro`, featuring a hero header, `ScrollIndicator`, and a fixed `post-meta-footer`. Content is organized into panels with IDs following `panel-{section.id}`.
*   **Interactive Effects**: 
    *   **Matrix Background**: A 5-depth digital rain system with 44 curated "gem words" and mouse-driven shockwaves.
    *   **Dodecahedron Toggle**: A Three.js-based 3D interface element that triggers the matrix background events.
*   **Design Language**: Minimalist typography-first approach (e.g., Glossary system) using amber accents and approved navigation symbols (◈ ▸ ▣ ◑ ⊕ ⬡).
*   **Styling**: Centralized in `src/styles/post-content.css`, utilizing glassy effects (`--glass-bg`) and responsive grids.
*   **Key Entries**: `ui/blog_post_layout/`, `ui/visual_effects/`, `ui/design_system/`, `ui/harness_engineering/`.
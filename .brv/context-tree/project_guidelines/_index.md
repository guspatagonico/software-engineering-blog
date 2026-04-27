---
children_hash: 7c7a1f65c917b2a6f89cd2a5333eb19686857482e65f96d3b44e9c46990d2414
compression_ratio: 0.19314580031695722
condensation_order: 2
covers: [agents/_index.md, architecture/_index.md, blog_post_architecture/_index.md, context.md, dev_process/_index.md, git_safe_mutations/_index.md, harness_engineering/_index.md, run_commands/_index.md]
covers_token_total: 5048
summary_level: d2
token_count: 975
type: summary
---
# Project Guidelines: Structural Overview (d2)

The `project_guidelines` domain establishes the operational, architectural, and procedural standards for the Software Engineering Blog. It integrates specialized agent orchestration, a hybrid Astro/React architecture, and strict quality-gated development workflows.

## 1. Agent Ecosystem and Orchestration
The project operates via a **Dispatcher Pattern** where an `@orchestrator` manages specialized sub-agents (e.g., `@blog-writer`, `@tester`) defined in `.opencode/agents/`.

*   **Orchestration Patterns**: Utilizes a **Fork-Join pattern** for parallel task execution. Interventions are triggered by "drift signals" such as scope expansion, barrier violations, or excessive auto-correction loops.
*   **Harness Engineering Framework**: Guided by the **Envolvente Convergente** model, which uses control theory (Lyapunov functions, Barrier functions) to ensure agent actions monotonically decrease the distance to project objectives.
*   **Context & Budgets**: Enforces a strict **~5800 token budget** per sub-agent. The **"Rule of Gold"** mandates that any task requiring >2 sentences to describe must be sub-scoped.
*   **Handoffs**: State transfer occurs via **Compressed Handoff Templates** in `_handoffs/`. `session-state.md` remains the global source of truth but is never injected directly into sub-agent context.
*   **Drill-down**: `agents/_index.md`, `harness_engineering/_index.md`

## 2. Core Architecture and State Management
The blog utilizes an **Astro + React hybrid "Island" architecture**, prioritizing static performance while enabling complex interactivity.

*   **Blog Post Structure**: Mandatory use of `BlogPost` layout and `SectionNav` component (`client:load`). Content must be organized into `panels` with strict ID naming (`panel-{id}`) and specific CSS class transitions (`panel active`).
*   **D2 Diagram Pipeline**: A three-tier rendering system handles heavy D2/WASM assets (~8MB). It uses dynamic imports (`D2DiagramsTransformer.tsx`), React hydration (`D2DiagramRenderer.tsx`), and a `MutationObserver` for real-time theme synchronization.
*   **Persistence Layer**: Centralized in `src/utils/storage.ts` using a single localStorage key (`gsalvini-se-blog`). It tracks themes, visual toggles, and checklist states with SSR-safe checks.
*   **Asset Management**: Local images must use the Astro `<Image />` component; post-specific assets are localized to `src/assets/posts/<slug>/`.
*   **Drill-down**: `architecture/_index.md`, `blog_post_architecture/_index.md`

## 3. Development Process and Quality Gates
A standardized high-integrity workflow enforced through automated scripts and strict Git policies.

*   **Toolchain**: **pnpm** is the exclusive package manager. The lifecycle follows: `install` → `dev` → `lint` → `typecheck` → `build`.
*   **Git Policy**: 
    *   **Worktrees**: Required for non-trivial features via the `.worktrees/` directory.
    *   **Mutation Gating**: Explicit user consent is required for any `git commit` or `push`, regardless of lint/typecheck success.
    *   **Safety**: Force pushes and hard resets are prohibited.
*   **Testing**: Bifurcated into unit/regression testing (**Vitest**) and E2E testing (**Playwright**).
*   **Standards**: Strict TypeScript (no `any`), Conventional Commits, and `@/` path aliasing.
*   **Drill-down**: `dev_process/_index.md`, `git_safe_mutations/_index.md`, `run_commands/_index.md`

## 4. Operational Environment
*   **Production**: Deployment involves specialized interactive commands (e.g., `/dist-upload`) using `gsupload`.
*   **Visual Constraints**: Restricted icon set (◈ ▸ ▣ ◑ ⊕ ⬡ → ⟳ ✓ ≡ ∑) and mandatory dark/light mode support.
*   **Security**: Strict prohibition against committing secrets, `.env` files, or including agent names in public-facing documentation/commits.
*   **Drill-down**: `run_commands/_index.md`, `context.md`
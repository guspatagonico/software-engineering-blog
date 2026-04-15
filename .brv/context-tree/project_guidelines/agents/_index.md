---
children_hash: a7271e114f0a04f9fb503804c8fff4e37aa6863ff5583571fcb0f5d34730c418
compression_ratio: 0.35037954454654413
condensation_order: 1
covers: [context.md, context_window_and_handoff_strategy.md, orchestration_and_drift_management.md, project_agent_handbook.md, sub_agent_design_and_anatomy.md]
covers_token_total: 2503
summary_level: d1
token_count: 877
type: summary
---
# Domain: Agents (d1 Summary)

This domain documents the architectural standards, operational workflows, and governance rules for the agent-driven development of the Software Engineering Blog. It establishes a rigorous framework for context management, sub-agent orchestration, and blog post construction.

## 1. Core Agent Governance (project_agent_handbook.md)
The **AGENTS.md** handbook serves as the primary manifesto for project contributors, detailing the technical environment and behavioral constraints.
*   **Workflow & Tooling**: Mandates a **pnpm-only** workflow for all lifecycle scripts (install, build, lint, typecheck, format). It enforces **TypeScript strict mode**, 2-space indentation, and the `@/` import alias.
*   **Security & Git**: Strict prohibition against committing secrets or `.env` files. **Git worktrees** are required for non-trivial features. Agents must never include their names in commits or documentation.
*   **Testing**: Standardized entry points for **Vitest** (unit) and **Playwright** (e2e).

## 2. Blog Architecture & UI Standards (project_agent_handbook.md, context.md)
Every blog post must adhere to a specific interactive layout to ensure consistency across the Astro-based platform.
*   **Layout Components**: Posts must import `BlogPost` and `SectionNav` (with `client:load`).
*   **Panel System**: Content is organized into panels. The first must be marked `panel active`; subsequent panels are `panel`. IDs must follow the `panel-{section.id}` pattern.
*   **Visual Language**: Navigation icons are restricted to a specific set (e.g., ◈ ▸ ▣ ◑ ⊕ ⬡). Components like `Highlight`, `Card`, and `ConvergentEnvelope` must be reused.
*   **Media**: Use `astro:assets` `<Image />` component instead of standard `<img>` tags.

## 3. Sub-Agent Design & Anatomy (sub_agent_design_and_anatomy.md)
Sub-agents are designed as specialized, ephemeral units with strict operational boundaries.
*   **The Rule of Gold**: Sub-agent scope descriptions must be **≤ 2 sentences** to prevent scope creep.
*   **Anatomy**: Every sub-agent requires a single output type (**Artefacto de salida**), a defined context budget (file list), and an explicit contract (schema mapping).
*   **Constraint Theory**: Favors **structural constraints** (e.g., restricted file paths) over instructional constraints, which are considered weak and prone to failure.

## 4. Orchestration & Drift Management (orchestration_and_drift_management.md)
The orchestrator manages sub-agent execution without engaging in domain-level reasoning.
*   **Fork-Join Pattern**: Used for parallel execution of independent sub-agents.
*   **Drift Signals**: Indicators of failure include scope expansion (longer-than-expected output), barrier violations (modifying out-of-scope files), and **auto-correction loops (>2 iterations)**.
*   **Intervention Rules**: Sub-agents cannot write to the same file; outputs must be independent and validatable in isolation.

## 5. Context & Handoff Strategy (context_window_and_handoff_strategy.md)
To maintain performance and accuracy, context is strictly budgeted.
*   **Context Budget**: Target sub-agent context is **~5800 tokens** (System: 800, Spec: 1500, Files: 3000, Handoff: 500).
*   **Session State**: `session-state.md` is the global source of truth maintained by the orchestrator and is **never** passed into sub-agent context.
*   **Handoffs**: Standardized templates include Summary, Artifacts (paths), Key State (next agent), and Result status (DONE|PARTIAL|BLOCKED).
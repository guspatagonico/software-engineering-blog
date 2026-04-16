---
children_hash: abaa629065cd25f504d01222be64925ba958a8c09b5864f9fc3e110110871f66
compression_ratio: 0.29470316388197654
condensation_order: 1
covers: [context.md, context_window_and_handoff_strategy.md, orchestration_and_drift_management.md, project_agent_handbook.md, specialized_agents_and_orchestration.md, sub_agent_design_and_anatomy.md]
covers_token_total: 2813
summary_level: d1
token_count: 829
type: summary
---
# Domain: Agents

The agent ecosystem for the Software Engineering Blog project is built on a specialized dispatcher model and a strict orchestration framework designed to minimize drift and manage context efficiently.

## Agent Architecture & Orchestration
The project utilizes a **Fork-Join pattern** where a central **@orchestrator** measures progress toward objectives and dispatches tasks to specialized sub-agents without deep domain reasoning. Key orchestration components include:

*   **Specialized Agents**: Roles include `@project-leader`, `@orchestrator`, `@component-builder`, `@blog-writer`, `@tester`, `@explore`, and `@plan`.
*   **Drift Management**: The orchestrator monitors for drift signals such as scope expansion, barrier violations, schema mismatches (broken contracts), and auto-correction loops exceeding two iterations.
*   **Sub-agent Design (Rule of Gold)**: Sub-agent scope must be defined in $\le$ 2 sentences. Each sub-agent must have a single output type (*Artefacto de salida*) and operate under explicit context and tool budgets.
*   **Constraint Philosophy**: Structural constraints (e.g., restricted MCP paths) are prioritized as strong barriers over weak instructional constraints.

For details on orchestration patterns and drift signals, see **orchestration_and_drift_management.md**. For sub-agent specifications, refer to **sub_agent_design_and_anatomy.md**.

## Context & Handoff Strategy
To maintain performance, the system enforces a target sub-agent context budget of **~5,800 tokens** (System: 800, Spec: 1500, Files: 3000, Handoff: 500). 

*   **Session State**: `session-state.md` serves as the global source of truth maintained by the orchestrator and is never passed into sub-agent context.
*   **Handoffs**: The `_handoff` command generates compressed templates in `_handoffs/` containing completion summaries, artifact paths, key state for the next agent, and blockers.

Detailed budget breakdowns and templates are located in **context_window_and_handoff_strategy.md**.

## Project Standards & Rules (AGENTS.md)
The **Project Agent Handbook** defines the technical environment and mandatory conventions for all contributors:

*   **Workflow**: Strictly **pnpm-only** for all scripts (`dev`, `build`, `lint`, `typecheck`, `format`). Git worktrees are required for non-trivial features.
*   **Blog Architecture**: Posts must use the `BlogPost` layout and `SectionNav` component (loaded with `client:load`). 
    *   **Panels**: Must use `id="panel-{id}"`; the first panel must have the `active` class.
    *   **Icons**: Restricted to a specific set: `◈ ▸ ▣ ◑ ⊕ ⬡ → ⟳ ✓ ≡ ∑`.
*   **Security & Privacy**: API keys and secrets must never be committed. Agent names are prohibited in commit messages, documentation, or co-author trailers.
*   **Development Rules**: 
    *   Requirement changes after Day 3 are deferred to the next sprint.
    *   Initial PR reviews have a maximum 4-hour SLA.
    *   **Rule 3**: Never use apologies.

Comprehensive command lists, layout samples, and verbatim rules are found in **project_agent_handbook.md**.

## Knowledge Map
*   **context.md**: High-level overview and navigation of the agent domain.
*   **specialized_agents_and_orchestration.md**: Documentation of the dispatcher pattern and agent directory (`.opencode/agents/`).
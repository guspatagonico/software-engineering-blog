---
children_hash: f04c52c2273be8bb34d3f454a953ea960bf05fa1cac656edc0598a5cda051a45
compression_ratio: 0.278759586528843
condensation_order: 1
covers: [context.md, orchestration_and_drift_management.md, project_agent_handbook.md, specialized_agents_and_orchestration.md, sub_agent_design_and_anatomy.md]
covers_token_total: 2999
summary_level: d1
token_count: 836
type: summary
---
# Domain: Agents

The agent ecosystem for the Software Engineering Blog project is built on a specialized dispatcher pattern, strict context budgeting, and a comprehensive handbook (AGENTS.md) that governs development workflows, security, and architectural standards.

## Agent Architecture & Orchestration
The project utilizes a **Dispatcher Pattern** where a main agent or orchestrator breaks down complex tasks for specialized sub-agents.
*   **Specialized Roles**: Agents include `@project-leader`, `@orchestrator`, `@component-builder`, `@blog-writer`, `@tester`, `@explore`, and `@plan`. New agents are defined via markdown files in `.opencode/agents/` (**specialized_agents_and_orchestration.md**).
*   **Orchestrator Role**: Measures distance to objectives and redirects without domain-specific "thinking." It manages the **Fork-Join pattern** for parallel execution (**orchestration_and_drift_management.md**).
*   **Drift Management**: Orchestrators monitor for drift signals such as scope expansion (output length), barrier violations (modifications outside scope), ambiguity, broken contracts (schema mismatch), and auto-correction loops (>2 iterations).

## Sub-agent Design & Context Budgeting
Sub-agents follow a strict "Minimum Sufficient Context" strategy to optimize the ~5800 token budget (**sub_agent_design_and_anatomy.md**).
*   **The Rule of Gold**: If a sub-agent's scope requires more than two sentences to describe, it is over-scoped.
*   **Anatomy**: Every sub-agent has a single output artifact type, an exact context budget of visible files, an explicit tool budget, and a defined I/O schema contract.
*   **Budget Allocation**: Target distribution is System (800), Spec (1500), Archivos (3000), and Handoff (500).
*   **State Management**: `session-state.md` is the global source of truth maintained by the orchestrator and is **never** included in sub-agent context.
*   **Skill Conversion**: Formatting instructions exceeding ~200 tokens must be converted into a "Skill" to preserve context.

## Project Standards & Workflow (AGENTS.md)
The **project_agent_handbook.md** defines the core operational rules for the Astro-based blog.
*   **Tech Stack**: pnpm-only workflow for all scripts (install, build, lint, etc.). Uses TypeScript strict mode, 2-space indents, and `@/` aliases.
*   **Blog Layout Convention**: Posts must use `BlogPost` and `SectionNav` (with `client:load`). Panels must use the `panel-{id}` naming convention, with the first panel marked as `active`.
*   **UI Components**: Mandatory reuse of `Highlight`, `Card`, and `ConvergentEnvelope`. Icons for navigation must be selected from a prescribed set (◈, ▸, ▣, etc.).
*   **Security & Git**: API keys and agent names are strictly prohibited in commits/docs. Git worktrees are required for non-trivial features.
*   **Handoff Protocol**: The `_handoff` command generates a compressed status file in `_handoffs/` covering completed work, artifacts, key state, and blockers.

## Key Rules & Constraints
*   **SLA**: Requirement changes after day 3 are deferred; initial PR reviews have a 4-hour max SLA.
*   **Communication**: Never use apologies in agent responses.
*   **Isolation**: Sub-agents must not write to the same file simultaneously; outputs must be independent and validatable in isolation (**orchestration_and_drift_management.md**).
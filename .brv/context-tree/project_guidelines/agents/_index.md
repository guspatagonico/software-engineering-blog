---
children_hash: edf91b5a9580dfc2a6bfc5cf71cb8d588c3426976dc1c4f0ebdcc2501b4bd4ab
compression_ratio: 0.2514812376563529
condensation_order: 1
covers: [context.md, context_window_and_handoff_strategy.md, orchestration_and_drift_management.md, project_agent_handbook.md, specialized_agents_and_orchestration.md, sub_agent_design_and_anatomy.md]
covers_token_total: 3038
summary_level: d1
token_count: 764
type: summary
---
# Domain: Agents

The `agents` domain establishes the operational framework for the Software Engineering Blog project, covering the specialized agent ecosystem, context management strategies, and strict architectural conventions defined in the `AGENTS.md` handbook.

## Agent Ecosystem and Orchestration
The project utilizes a **Dispatcher Pattern** to manage complexity by delegating tasks to specialized sub-agents via `@mention` (e.g., `@blog-writer`, `@component-builder`, `@tester`).
- **Orchestrator Role**: The `@orchestrator` measures progress toward objectives and manages task dispatching without domain-specific reasoning. It utilizes a **Fork-Join pattern** for parallel execution of independent sub-agents.
- **Drift Management**: Orchestration interventions are triggered by drift signals such as scope expansion (output longer than expected), barrier violations (modifications outside scope), or auto-correction loops exceeding 2 iterations.
- **Agent Definition**: New agents are defined via markdown files with frontmatter in `.opencode/agents/`.
- **References**: `orchestration_and_drift_management.md`, `specialized_agents_and_orchestration.md`

## Sub-Agent Design and Context Strategy
Sub-agents operate under the **"Rule of Gold"**: if a scope requires >2 sentences to describe, it is over-scoped.
- **Anatomy**: Every sub-agent has a single output artifact type, an exact context budget, an explicit tool budget, and a defined input/output contract.
- **Context Window Budget**: Target budget is **~5800 tokens** (System: 800, Spec: 1500, Files: 3000, Handoff: 500).
- **Minimum Sufficient Context**: A strategy to use context efficiently. If formatting instructions exceed ~200 tokens, they must be converted into a **Skill**.
- **Handoff Procedures**: State transfer occurs via a **Compressed Handoff Template** (Summary, Artifact Paths, Key State, Pending, Blockers, Result). `session-state.md` serves as the global source of truth but never enters sub-agent context.
- **References**: `sub_agent_design_and_anatomy.md`, `context_window_and_handoff_strategy.md`

## Development and Architectural Rules
The `AGENTS.md` handbook prescribes strict technical and collaborative standards.
- **Workflow**: **pnpm-only** workflow for all scripts. Git worktrees are required for non-trivial features. The `_handoff` command is used to generate session summaries in `_handoffs/`.
- **Blog Architecture**: Posts must use the `BlogPost` layout and `SectionNav` component (loaded with `client:load`).
    - **Panel Convention**: First panel must be `class="panel active"`; others are `class="panel"`. IDs must be prefixed with `panel-`.
    - **Icons**: Restricted set: ◈ ▸ ▣ ◑ ⊕ ⬡ → ⟳ ✓ ≡ ∑.
- **Code Style**: TypeScript strict mode, 2-space indents, single quotes, and `@/` alias for imports. Use `<Image />` from `astro:assets`.
- **Security & Privacy**: Never commit secrets or `.env` files. **Crucial Rule**: Never include agent names in commit messages, PRs, or documentation.
- **References**: `project_agent_handbook.md`, `context.md`
---
title: Harness Engineering Page
summary: Documents harness engineering page structure, ConvergentEnvelope animation defaults, context and tool budgets, orchestration drift signals, checklists, and styling rules.
tags: []
related: [project_management/handoffs/context.md, project_management/handoffs/hybrid_session_state_approach.md]
keywords: []
importance: 65
recency: 1
maturity: validated
accessCount: 5
createdAt: '2026-04-14T01:44:02.186Z'
updatedAt: '2026-04-14T01:44:02.186Z'
---
## Reason
Capture the section layout, animation behavior, budgets, and orchestration guidance documented on the harness engineering page.

## Raw Concept
**Task:**
Document the Harness Engineering page layout, interactive ConvergentEnvelope animation, orchestration guidance, and mental-model artifacts that keep sub-agent work bounded.

**Changes:**
- Described the ConvergentEnvelope animation defaults, wobble variables, phase labels, gradients, glow filters, and CSS transition details used to visualize convergence vs entropía.
- Captured the harness page sections for the mental model, sub-agent contracts, context budgets, orchestration fork-join diagram, skills/MCP matrices, checklists, and vocabulary definitions.
- Outlined the context budget template, handoff template fields, session-state workflow, drift signal actions, and checklist queries that orchestrator and sub-agents must verify.

**Flow:**
Mental-model narrative → sub-agent contracts and budgets → context window controls with session-state + handoff templates → orchestration fork-join stages and drift handling → tool/skill matrices and checklists → vocabulary + styling rules.

**Timestamp:** 2026-04-14

**Author:** Harness Engineering Team

## Narrative
### Structure
The page is organized into labeled project tabs (mental-model, subagentes, context, orq, tools, checklist, and vocab) with descriptive panels explaining convergent envelope metaphors, barrier/Lyapunov functions, and the “entropía vs convergencia” framing before detailing agent/orchestrator responsibilities.

### Dependencies
The ConvergentEnvelope animation honors prefers-reduced-motion, swaps to pre-computed static data when animations are disabled, persists the mode via STORAGE_KEY in localStorage, and guards against toggling while a crossfade animation is running.

### Highlights
Key highlights include the ConvergentEnvelope animation with constant-driven envelopes and phase labels, a fork-join orchestration diagram showing stage tokens, a drift signal table mapping signals to actions, and explicit checklists that ensure artifacts, budgets, contracts, session state, and handoffs stay within scope.

### Rules
Rule 1: Do not switch the ConvergentEnvelope mode during a crossfade animation.
Rule 2: Only parallelize a fork when no branch writes clash, each branch can be validated individually, and outputs are independent.
Rule 3: Follow the drift signal responses (scope expansion interrupts redefines, out-of-scope edits revert or split, domain questions clarify, schema mismatches re-run, more than two auto-corrections change focus or split the task).

### Examples
Examples: The context budget template totals ~5800 tokens across system prompt, spec, files, and recent handoffs with explicit exclusions; session-state.md for pivot.lat tracks completed/in-progress/decisions/blockers (phase 2/4 with pmpro-css done) so charts and budgeted responsibilities stay synchronized.

## Facts
- **convergent_envelope_switcher**: ConvergentEnvelope switcher defaults to animated mode, stores the selection in localStorage under STORAGE_KEY, and the crossfade guard prevents toggling while the animation is running. [project]
- **convergent_envelope_animation_constants**: The ConvergentEnvelope animation uses constants X0=28, X1=592, Yc=130, A=82, lambda=2.8, omega=5π, N=400 along with wobble variables (envA, envLambda, envOmega, phaseShift, touchFactor) to build static and animated paths, areas, and divider points. [project]
- **context_budget_limit**: Context budget templates cap combined system/spec/files/handoff tokens at roughly 5800 and explicitly exclude large diagrams or stale handoffs when switching focus. [convention]
- **orchestration_parallel_conditions**: Parallel forks only run when no branch writes to the same file, outputs can be validated independently, and the orchestrator can declare each output ready, while drift signals prescribe specific actions like pause, split, or re-clarify. [convention]

- **Key points**
  - Harness Engineering page documents the layout, animation defaults, orchestration guidance, and mental-model artifacts that bound sub-agent work.
  - ConvergentEnvelope animation uses detailed constants, wobble variables, phase labels, gradients, glow filters, and respects prefers-reduced-motion with storage-guarded mode switching and crossfade locks.
  - Context budget template caps combined tokens (~5800) across system prompts/specs/files/handoffs, excludes large diagrams/stale handoffs, and ties to session-state metadata for pivot tracking.
  - Orchestration follows fork-join stages with explicit drift signal table/actions and rules for parallel branches, drift handling, and scope control (e.g., interruptions, splits, reverts, schema re-runs).
  - Checklists ensure artifacts/budgets/contracts/session states/handoffs stay within scope; vocab/styling rules codify framing (convergence vs entropía).

- **Structure / sections summary**
  - **Project tabs overview**: Tabs for mental-model, subagents, context, orq, tools, checklist, vocab describe metaphors, functions, framing, and responsibilities.
  - **ConvergentEnvelope animation**: Defaults, constants (X0, X1, Yc, A, λ, ω, N), wobble vars, phase labels, gradients, glow filters, CSS transitions, and reduced-motion handling with storage and guard rules.
  - **Mental-model & contracts**: Narrative builds from mental model to sub-agent contracts/budgets, emphasizing barrier/Lyapunov concepts and convergence entropía framing.
  - **Context budgets & session-state**: Template limits (~5800 tokens), field-based handoff template, session-state workflow (pivot.lat with completed/in-progress/decisions/blockers), focus-switch exclusions.
  - **Orchestration & drift**: Fork-join diagram with stage tokens, drift signal/action table, rules for when to parallelize branches, drift response actions (pause/split/clarify/revert).
  - **Tools/skills matrices & checklists**: Ensures validation of artifacts, budgets, contracts, session state, handoffs; includes queries for orchestrator/sub-agent verification.
  - **Vocabulary & styling**: Definitions and styling rules that support consistent framing and UI behavior.

- **Notable entities, patterns, decisions**
  - **Entities**: ConvergentEnvelope animation switcher (STORAGE_KEY), animation constants (X0, X1, Yc, A, λ, ω, N), wobble parameters (envA, envLambda, envOmega, phaseShift, touchFactor); context budget template (~5800 tokens); session-state.md pivot.lat tracking.
  - **Patterns**: Flow from mental-model → contracts/budgets → context controls → orchestration/drift → tools/checklists → vocab/styling; explicit drift signal responses dictating pause/split/re-clarify/re-run actions; strict parallelization rules ensuring no conflicting writes and independent validations.
  - **Decisions/rules**: Don’t toggle ConvergentEnvelope during crossfade; parallel forks require independent outputs without write clashes; drift signals mandate specific responses (scope expansion interrupts, out-of-scope edits revert/split, domain questions clarify, schema mismatches re-run, >2 auto-corrections shift focus/split task); context budgets enforce explicit exclusions when switching focus.
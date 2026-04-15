---
title: Harness Engineering Page
summary: Harness Engineering page outlines ConvergentEnvelope behavior, context budgets, parallel orchestration conditions, drift handling, tool budgets, and glossary/checklist guidance.
tags: []
related: [project_guidelines/dev_process/development_process_and_rules.md, project_management/handoffs/context.md]
keywords: []
importance: 56
recency: 1
maturity: draft
accessCount: 2
createdAt: '2026-04-14T01:44:46.897Z'
updatedAt: '2026-04-14T01:44:46.897Z'
---
## Reason
Document the Harness Engineering page layout, animation defaults, budgets, orchestration rules, and vocabulary/checklist guidance.

## Raw Concept
**Task:**
Document the Harness Engineering page guidance covering ConvergentEnvelope defaults, context budgets, orchestration rules, and vocabulary for drift-handling.

**Changes:**
- Captured ConvergentEnvelope switcher defaults, animation constants, guards, gradients, and static/animated group rendering plus CSS transitions.
- Summarized page structure spanning mental models, sub-agent contracts, context budgets, orchestrator tabs, tool matrix, checklists, and vocabulary.
- Described context budget template (~5800 tokens), session-state.md conventions, handoff template fields, and example pmpro-css→pmpro-js status/responsibility updates.
- Outlined fork-join orchestration invariants, stage token animations, drift signal response table, and skill/MCP tool budgets for sub-agents and orchestrator.

**Flow:**
The page moves from the mental model and sub-agent contract definitions through context budgeting, fork/join orchestration diagrams, tool/skill budget matrices, checklist validations, and vocabulary/style notes.

**Timestamp:** 2026-04-14

**Author:** Harness Engineering team

## Narrative
### Structure
Sections introduce the convergent envelope mental model, describe sub-agent contracts (single responsibility, bounded context, artifact/tool/context budgets, anti-patterns), explain context budgeting and session-state use, show fork/join orchestration tabs with animation tokens, lay out the tool/skill budget matrix, provide checklist prompts for sub-agents/orchestrator/context validation, and define vocabulary/glossary terms alongside layout/styles (.phase-diagram, .fj-stage-token, responsive adjustments).

### Dependencies
Depends on the ConvergentEnvelope SVG component, styling for .curves/.phase-diagram/.fork-join-diagram, session-state.md for shared state, and handoff templates exemplifying pmpro-css→pmpro-js transfers.

### Highlights
Highlights localStorage persistence, precise animation constants plus gradients/glow filters, the ~5800-token context budget template, fork/join parallelism rules with stage tokens, drift signal table, and the tool/skill budget matrix that enforces bounded sub-agent behavior.

### Rules
Condition 1: Parallel branches must not write to the same file. Condition 2: Branch outputs must be independent so they can be validated on their own. Condition 3: The orchestrator must be able to validate each branch output before joining.

### Examples
Checklist prompts ask about artifact type, artifact/tool/context budgets, session-state updates, handoff specs, and phase milestones; vocabulary entries define convergent envelope, entropía agéntica, drift, fork-join, and sub-agent contracts with CSS styling hints.

## Facts
- **convergent_envelope_switcher**: ConvergentEnvelope switcher defaults to animated mode, saves preference under STORAGE_KEY in localStorage, and uses a crossfade guard to block toggles while animating before reverting to static data when animation is disabled. [project]
- **convergent_envelope_animation_parameters**: Animation constructs static and animated points/paths with constants X0=28, X1=592, Yc=130, A=82, lambda=2.8, omega=5π, N=400 plus wobble-modified envA/envLambda/envOmega/phaseShift/touchFactor while honoring prefers-reduced-motion fallbacks. [project]
- **context_budget_limits**: Context budgets cap system/spec/files/handoff tokens to roughly 5800 total, require explicit exclusions, and rely on a shared session-state.md tracking completed/in-progress work, decisions, and blockers. [convention]
- **fork_join_parallel_rules**: Fork-join orchestration executes only when branches write different files, produce independent outputs, and allow the orchestrator to validate each output before joining. [convention]
- **drift_signal_responses**: Drift signals escalate via scope expansion, edits to out-of-scope files, domain questions, schema mismatches, or repeated correction loops, prompting interrupts, clarifications, or splits. [project]
- **tool_budget_matrix**: Tool budgets list pmpro-css, paypal-nvp, pmpro-js, wp-db, and orchestrator scopes covering filesystem permissions, db-client/web-fetch allowances, and required skills for bounded sub-agent work. [project]

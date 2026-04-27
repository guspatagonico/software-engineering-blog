---
title: Harness Engineering Framework
summary: 'Harness Engineering: Convergent Envelope (narrowing scope), Barrier/Lyapunov functions, and Entropy management'
tags: []
keywords: []
importance: 50
recency: 1
maturity: draft
createdAt: '2026-04-24T15:55:04.831Z'
updatedAt: '2026-04-27T21:50:00.000Z'
consolidated_at: '2026-04-27T21:50:20.975Z'
consolidated_from: [{date: '2026-04-27T21:50:20.975Z', path: project_guidelines/harness_engineering/envolvente_convergente_framework.md, reason: 'Both files cover the core Harness Engineering mental model (Convergent Envelope, Barrier/Lyapunov functions). ''harness_engineering_framework.md'' is the more recent and comprehensive orchestration-focused version.'}]
related: [project_guidelines/agents/orchestration_and_drift_management.md]
---
## Reason
Document core mental model and orchestration patterns for Harness Engineering, consolidating Envolvente Convergente concepts.

## Raw Concept
**Task:**
Define Harness Engineering framework and orchestration

**Flow:**
Dispersion -> Barrier Functions -> Lyapunov Functions -> Convergence (Orchestrator -> Sub-agents -> Validation -> Convergence)

**Timestamp:** 2026-04-24

## Narrative
### Structure
Core mental model based on control theory (Lyapunov/Barrier functions). The Envolvente Convergente is a dynamic envelope that tolerates initial dispersion and narrows toward a solution. Orchestration uses Fork-Join for parallelism.

### Highlights
Convergent Envelope narrows action space; Barrier functions (CBF) define prohibited regions (e.g., restricted MCP paths) or 'repulsive walls' to prevent scope violations; Lyapunov Functions ensure each intervention reduces distance to the goal; Drift signals trigger redirection.

### Rules
Rule 1: Every orchestrator intervention must monotonically decrease distance to objective.
Rule 2: Parallelism requires no shared write-access, independent outputs, and isolatability.
Rule 3: Entropy is the accumulation of drift from uncoordinated local optimizations without global coherence.
Rule 4: Convergence is an accounted action space with clear feedback loops.

## Facts
- **Convergent Envelope**: The harness defines a dynamic envelope that tolerates initial dispersion and narrows as the process advances.
- **Barrier Functions**: Barrier Functions (CBF) are structural constraints that define 'repulsive walls' to prevent scope violations.
- **Lyapunov Functions**: Lyapunov Functions require every orchestrator intervention to monotonically decrease the distance to the objective.
- **Entropy**: Entropy (Entropía agéntica) is the accumulation of drift from local optimizations without global coherence.
- **Convergence**: Convergence involves a bounded action space with clear feedback loops.
- **Orchestrator Role**: The orchestrator measures distance to the goal and redirects without thinking about the domain.
- **Fork-Join Pattern**: The Fork-Join Pattern involves parallel execution of independent sub-agents followed by a validation join.
- **Parallelism Conditions**: Parallelism conditions require no shared write-access to files, independent outputs, and outputs that are isolatable for validation.
- **Drift Signals**: Drift signals include long output (scope expansion), out-of-scope edits (barrier violation), domain questions (ambiguous spec), schema mismatch (broken contract), and correction loops (premature convergence).
- **Session state**: Session state is the compressed global state maintained exclusively by the orchestrator.
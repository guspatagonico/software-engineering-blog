---
title: Harness Engineering Framework
summary: 'Harness Engineering: Convergent Envelope (narrowing scope), Barrier/Lyapunov functions, and Entropy management'
tags: []
keywords: []
importance: 50
recency: 1
maturity: draft
createdAt: '2026-04-24T15:55:04.831Z'
updatedAt: '2026-04-24T15:55:04.831Z'
---
## Reason
Document core mental model and orchestration patterns for Harness Engineering

## Raw Concept
**Task:**
Define Harness Engineering framework and orchestration

**Flow:**
Orchestrator -> Sub-agents (Parallel/Sequential) -> Validation -> Convergence

**Timestamp:** 2026-04-24

## Narrative
### Structure
Core mental model based on control theory (Lyapunov/Barrier functions). Orchestration uses Fork-Join for parallelism.

### Highlights
Convergent Envelope narrows action space; Barrier functions prevent scope violations; Drift signals trigger redirection.

### Rules
Rule 1: Every orchestrator intervention must monotonically decrease distance to objective.
Rule 2: Parallelism requires no shared write-access, independent outputs, and isolatability.

## Facts
- **Convergent Envelope**: The harness defines a dynamic envelope that tolerates initial dispersion and narrows as the process advances.
- **Barrier Functions**: Barrier Functions (CBF) are structural constraints that define 'repulsive walls' to prevent scope violations.
- **Lyapunov Functions**: Lyapunov Functions require every orchestrator intervention to monotonically decrease the distance to the objective.
- **Entropy**: Entropy is the accumulation of drift from local optimizations without global coherence.
- **Convergence**: Convergence involves a bounded action space with clear feedback loops.
- **Orchestrator Role**: The orchestrator measures distance to the goal and redirects without thinking about the domain.
- **Fork-Join Pattern**: The Fork-Join Pattern involves parallel execution of independent sub-agents followed by a validation join.
- **Parallelism Conditions**: Parallelism conditions require no shared write-access to files, independent outputs, and outputs that are isolatable for validation.
- **Drift Signals**: Drift signals include long output (scope expansion), out-of-scope edits (barrier violation), domain questions (ambiguous spec), schema mismatch (broken contract), and correction loops (premature convergence).
- **Envolvente convergente**: Envolvente convergente is the range of tolerable behavior narrowing toward a solution.
- **Entropía agéntica**: Entropía agéntica is the accumulation of drift resulting in incoherent results.
- **Session state**: Session state is the compressed global state maintained exclusively by the orchestrator.

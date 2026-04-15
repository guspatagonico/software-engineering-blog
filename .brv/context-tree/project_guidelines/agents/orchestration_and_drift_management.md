---
title: Orchestration and Drift Management
summary: 'Orchestration: Fork-Join pattern, drift signals (expansion, violation, ambiguity, broken contract, loops), and interventions'
tags: []
keywords: []
importance: 50
recency: 1
maturity: draft
createdAt: '2026-04-15T02:24:52.900Z'
updatedAt: '2026-04-15T02:24:52.900Z'
---
## Reason
Document orchestration patterns and drift signals

## Raw Concept
**Task:**
Define orchestration roles and drift management actions

**Flow:**
Orchestration -> Drift Detection -> Signal Analysis -> Action

**Timestamp:** 2026-04-14

## Narrative
### Structure
Orchestrator measures distance to objective and redirects; does not think about the domain. Fork-Join: Parallel execution of independent sub-agents.

### Highlights
Drift signals include: Output longer than expected (scope expansion), modifications outside scope (barrier violation), domain questions (ambiguity), schema mismatch (broken contract), and auto-correction loops (>2).

### Rules
Condition 1: Sub-agents do not write to the same file. Condition 2: Outputs are independent. Condition 3: Orchestrator can validate output in isolation.

## Facts
- **orchestrator_role**: The orchestrator measures distance to objective without thinking about the domain [convention]
- **drift_signal_loops**: Auto-correction loops exceeding 2 iterations signal premature convergence [convention]

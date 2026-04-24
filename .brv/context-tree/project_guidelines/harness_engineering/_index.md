---
children_hash: eb0e51c783ee3e04b5b6a2673b6c2803b8236b51486536c4c5754bacaab849ae
compression_ratio: 0.29941373534338356
condensation_order: 1
covers: [context.md, envolvente_convergente_framework.md, harness_engineering_framework.md, harness_engineering_page.md]
covers_token_total: 2388
summary_level: d1
token_count: 715
type: summary
---
# Harness Engineering Structural Summary

Harness Engineering provides the architectural framework and control theory mental models for managing agentic workflows, focusing on convergence, drift prevention, and structured orchestration.

## Core Framework: Envolvente Convergente
The **Envolvente Convergente Framework** (see `envolvente_convergente_framework.md` and `harness_engineering_framework.md`) uses control theory to guide agent behavior:
*   **Convergent Envelope**: A dynamic boundary that tolerates initial dispersion but narrows toward a specific solution as the process advances.
*   **Barrier Functions (CBF)**: Structural constraints defining "prohibited regions" or repulsive walls to prevent scope violations and restricted path access.
*   **Lyapunov Functions**: A requirement that every orchestrator intervention must monotonically decrease the distance to the objective.
*   **Entropy Management**: Monitoring "Entropía Agéntica"—the accumulation of drift from uncoordinated local optimizations—to ensure global coherence.

## Orchestration Patterns and Rules
The system utilizes a **Fork-Join Pattern** for parallel execution (detailed in `harness_engineering_framework.md` and `harness_engineering_page.md`):
*   **Parallelism Invariants**: Execution is permitted only if branches have no shared write-access, produce independent outputs, and remain isolatable for validation.
*   **Drift Signals**: Triggers for redirection include scope expansion (long output), out-of-scope edits, domain questions (ambiguous specs), schema mismatches, and correction loops.
*   **Orchestrator Role**: Maintains the **Session State** (compressed global state) and measures distance to goals without deep domain engagement.

## Technical Implementation and Budgets
The **Harness Engineering Page** (`harness_engineering_page.md`) defines the practical constraints for sub-agents:
*   **Context Budgeting**: Enforces a ~5800-token cap covering system, spec, files, and handoff tokens. It relies on `session-state.md` for tracking progress and blockers.
*   **Tool/Skill Matrix**: Defines specific scopes (e.g., `pmpro-css`, `wp-db`, `paypal-nvp`) to enforce bounded behavior and filesystem/database permissions.
*   **UI/Animation**: The `ConvergentEnvelope` switcher utilizes `localStorage` persistence and specific animation constants (e.g., $X0=28, X1=592, \omega=5\pi$) with `prefers-reduced-motion` fallbacks.

## Key Relationships and Drill-down
*   **Development Process**: Integration with `project_guidelines/dev_process/development_process_and_rules.md`.
*   **State Management**: Dependencies on `session-state.md` and `project_management/handoffs/context.md` for cross-session continuity.
*   **Validation**: Sub-agent contracts and checklist prompts (artifact type, phase milestones) ensure convergence before joining parallel branches.
# Harness Engineering Framework Overview

## Key Points
*   **Control Theory Foundation:** The framework applies control theory concepts—specifically Lyapunov and Barrier functions—to manage agentic workflows and ensure goal alignment.
*   **Convergent Envelope:** Action spaces are designed to be broad initially but must narrow dynamically as the process advances toward a solution.
*   **Monotonic Progress:** A core rule dictates that every orchestrator intervention must monotonically decrease the distance to the objective, preventing regression.
*   **Entropy Management:** The framework identifies "Agentic Entropy" as the accumulation of drift from local optimizations that lack global coherence.
*   **Domain-Agnostic Orchestration:** The orchestrator focuses on measuring distance to goals and enforcing constraints rather than deep domain reasoning.

## Structure & Sections
*   **Reason & Raw Concept:** Establishes the core mental model and the high-level flow: Orchestrator → Sub-agents → Validation → Convergence.
*   **Narrative:** 
    *   *Structure:* Details the use of Fork-Join patterns for parallelism.
    *   *Highlights:* Defines the Convergent Envelope and the role of drift signals.
*   **Rules:** Sets strict constraints for orchestrator interventions and the technical requirements for parallel execution.
*   **Facts:** A glossary of technical definitions, including specific drift signals (e.g., schema mismatch, scope expansion) and state management protocols.

## Notable Entities, Patterns, and Decisions

### Entities
*   **Orchestrator:** The central controller responsible for measuring goal distance and maintaining the compressed **Session State**.
*   **Sub-agents:** Independent units executed in parallel or sequence to perform specific tasks.

### Patterns
*   **Fork-Join Pattern:** Parallel execution of sub-agents followed by a unified validation join.
*   **Barrier Functions (CBF):** Structural constraints acting as "repulsive walls" to prevent agents from exceeding their defined scope.
*   **Lyapunov Functions:** A mathematical approach used to ensure that every step taken by the system moves it closer to a stable end-state (the goal).

### Key Decisions
*   **Parallelism Constraints:** Parallel execution is strictly forbidden unless there is zero shared write-access and outputs are fully isolatable.
*   **Drift Signal Triggers:** Specific behaviors—such as "long output" (scope expansion) or "domain questions" (ambiguous spec)—are codified as signals that require immediate redirection by the orchestrator.
*   **State Centralization:** Session state must be maintained exclusively by the orchestrator to prevent incoherent results from distributed sub-agents.
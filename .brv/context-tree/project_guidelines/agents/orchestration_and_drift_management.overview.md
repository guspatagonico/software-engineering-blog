# Orchestration and Drift Management Overview

## Key Points
* **Orchestrator Role:** The orchestrator functions as a distance-to-objective measure and redirection mechanism; it is explicitly designed to be domain-agnostic.
* **Fork-Join Pattern:** Utilizes parallel execution of independent sub-agents to handle complex tasks.
* **Drift Detection:** Systemic monitoring for signals that indicate a deviation from the intended path or scope.
* **Operational Constraints:** Sub-agents are prohibited from writing to the same file, and their outputs must remain independent and isolatable for validation.
* **Loop Threshold:** Auto-correction loops are capped at two iterations; exceeding this signals "premature convergence" and requires intervention.

## Structure Summary
* **Reason & Raw Concept:** Defines the core task of establishing orchestration roles and the flow from detection to action.
* **Narrative - Structure:** Details the functional behavior of the orchestrator and the implementation of the Fork-Join pattern.
* **Narrative - Highlights:** Categorizes specific drift signals (Expansion, Violation, Ambiguity, Broken Contract, and Loops).
* **Narrative - Rules:** Establishes the three primary conditions for sub-agent execution and output validation.
* **Facts:** Formalizes conventions regarding the orchestrator's role and loop thresholds.

## Notable Entities, Patterns, and Decisions

### Patterns
* **Fork-Join:** A pattern for parallelizing independent sub-agent tasks.
* **Orchestration Flow:** A four-stage lifecycle: Orchestration → Drift Detection → Signal Analysis → Action.

### Drift Signals (Decision Matrix)
| Signal | Description |
| :--- | :--- |
| **Scope Expansion** | Output length exceeds expectations. |
| **Barrier Violation** | Modifications made outside the defined scope. |
| **Ambiguity** | Sub-agents asking domain-specific questions. |
| **Broken Contract** | Schema mismatches in output. |
| **Auto-correction Loops** | More than two attempts to self-fix. |

### Key Decisions
* **Domain Decoupling:** The orchestrator is intentionally restricted from "thinking" about the domain to maintain objective distance measurement.
* **Isolation Requirement:** Orchestrators must be able to validate sub-agent output in isolation, ensuring modularity and preventing cascading failures.
* **Concurrency Rule:** Strict prohibition of multiple sub-agents writing to a single file to prevent race conditions or state corruption.
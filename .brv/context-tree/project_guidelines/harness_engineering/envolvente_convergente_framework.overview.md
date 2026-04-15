# Envolvente Convergente Framework Overview

## Key Points
* **Dynamic Envelope Strategy:** The framework utilizes a dynamic envelope that tolerates initial system dispersion and progressively narrows toward a defined solution.
* **Safety via Barrier Functions:** Control Barrier Functions (CBF) are employed to establish structural constraints and define prohibited regions or restricted paths.
* **Goal-Oriented Convergence:** Lyapunov Functions are integrated to ensure that every intervention or system action measurably reduces the distance to the target goal.
* **Entropy as Drift:** The framework defines entropy as the accumulated drift resulting from uncoordinated local optimizations.
* **Feedback-Driven Convergence:** Successful convergence is characterized as an "accounted action space" supported by clear, continuous feedback loops.

## Structure / Sections Summary
* **Reason & Raw Concept:** Establishes the framework as a core harness engineering mental model and outlines the logical flow: *Dispersion → Barrier Functions → Lyapunov Functions → Convergence*.
* **Narrative:** Describes the operational behavior of the envelope and the specific roles of CBF (prohibition) and Lyapunov (reduction) functions.
* **Rules:** Formalizes the relationship between entropy (uncoordinated drift) and convergence (accounted action space).
* **Facts:** Provides concise definitions for the project's primary technical components.

## Notable Entities, Patterns, and Decisions

### Entities
* **Envolvente Convergente:** The overarching dynamic envelope framework.
* **Control Barrier Functions (CBF):** The mechanism for defining structural constraints and prohibited regions.
* **Lyapunov Functions:** The mathematical tools used to ensure directional progress toward a goal.

### Patterns
* **The Convergence Flow:** A specific sequence of operations starting with initial dispersion, applying barriers to restrict movement, and using Lyapunov functions to drive the system toward a solution.
* **Narrowing Envelope:** The pattern of moving from a broad, tolerant state to a highly constrained, solution-oriented state.

### Decisions
* **Definition of Entropy:** A decision to frame entropy specifically as "accumulated drift from uncoordinated local optimizations" rather than general disorder.
* **Feedback Requirement:** The framework mandates that convergence must be backed by feedback loops to be considered valid.
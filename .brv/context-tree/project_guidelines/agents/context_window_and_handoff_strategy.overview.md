### Key Points
*   **Context Budget Target:** Establishes a strict sub-agent context limit of approximately **5,800 tokens** to ensure efficiency.
*   **Token Allocation:** The budget is divided into System (800), Spec (1,500), Archivos/Files (3,000), and Handoff (500).
*   **Global State Management:** `session-state.md` serves as the single global source of truth maintained by the orchestrator but is explicitly excluded from sub-agent contexts.
*   **Compressed Handoffs:** Utilizes a standardized, high-density template to pass information between agents without exceeding the 500-token handoff limit.
*   **Status Reporting:** Every handoff must conclude with a definitive status: `DONE`, `PARTIAL`, or `BLOCKED`.

### Structure Summary
*   **Reason & Raw Concept:** Defines the motivation for context management and outlines the logical flow (System → Spec → Archivos → Handoff).
*   **Narrative:** Details the specific token distribution and the architectural role of the orchestrator in managing session state.
*   **Examples:** Provides the "Handoff Comprimido" (Compressed Handoff) schema.
*   **Facts:** Formalizes the context budget and the `session_state_rule` as project conventions.

### Notable Entities, Patterns, and Decisions

#### Entities
*   **Orchestrator:** The central entity responsible for maintaining the global state.
*   **Sub-agent:** The execution unit subject to the 5,800-token context constraint.
*   **session-state.md:** The primary tracking document for the entire session.

#### Patterns
*   **Minimum Sufficient Context:** A strategy of providing only the necessary data to sub-agents to prevent context bloat.
*   **Handoff Comprimido:** A structured template containing:
    *   **Completado:** Summary of work.
    *   **Artefactos:** File paths created or modified.
    *   **Estado clave:** Instructions for the next agent.
    *   **Pendiente:** Out-of-scope items.
    *   **Blockers:** Impediments.
    *   **Resultado:** Final status flag.

#### Decisions
*   **Context Isolation:** The decision to keep `session-state.md` out of sub-agent context to save tokens and prevent agents from over-stepping their specific task scope.
*   **Fixed Budgeting:** Hard-coding token limits for different components of the prompt to ensure predictable performance.
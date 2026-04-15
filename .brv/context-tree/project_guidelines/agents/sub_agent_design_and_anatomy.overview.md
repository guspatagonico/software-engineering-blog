# Sub-agent Design and Anatomy Overview

### Key Points
*   **The Rule of Gold:** Sub-agent scope descriptions must be strictly limited to two sentences or fewer to ensure focus and prevent scope creep.
*   **Single Output Constraint:** Every sub-agent must have a single, clearly defined output type (*Artefacto de salida*).
*   **Constraint Hierarchy:** Structural constraints (e.g., restricted file paths or limited tool access) are "strong" barriers, whereas instructional constraints (prompt-based rules) are "weak" and prone to failure.
*   **Explicit Budgeting:** Sub-agents operate under defined budgets for context (specific file lists) and tools (enabled MCPs).
*   **Contract-Driven Design:** Interactions are governed by explicit contracts and schema mapping rather than ambiguous natural language instructions.

### Structure / Sections Summary
*   **Reason & Raw Concept:** Establishes the purpose of the document and the logical flow of sub-agent creation: *Scope $\rightarrow$ Budgets $\rightarrow$ Contract $\rightarrow$ Output*.
*   **Narrative:** Explores the anatomy of a sub-agent and the philosophy of "barrier functions," emphasizing that technical restrictions outperform prompt-based instructions.
*   **Rules & Facts:** Formalizes the design conventions, specifically the "Rule of Gold" and the requirement for singular output types.

### Notable Entities, Patterns, and Decisions

**Entities**
*   **Artefacto de salida:** The singular, formal output produced by the sub-agent.
*   **MCP (Model Context Protocol):** The framework used to define and restrict the "Tool budget" available to the agent.
*   **Contrato explícito:** The schema mapping that defines how the sub-agent receives and sends data.

**Patterns**
*   **Structural Barrier Functions:** A design pattern where system limits (like restricted directory access) are used to enforce behavior instead of relying on the LLM's adherence to instructions.
*   **Anti-pattern: Full-stack Access:** Granting a sub-agent broad access is identified as a source of entropy and system failure.

**Decisions**
*   **Instructional vs. Structural:** The design framework explicitly favors structural constraints over instructional ones to ensure reliability.
*   **Scope Limitation:** A hard limit of $\le$ 2 sentences for scope is mandated to force modularity.
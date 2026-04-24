# Sub-agent Design and Anatomy Overview

## Key Points
*   **The Rule of Gold**: A sub-agent is over-scoped if its purpose cannot be described in two sentences or fewer.
*   **Anatomy of a Sub-agent**: Defined by four pillars: a single output artifact type, an exact context budget (visible files), an explicit tool budget, and a strict I/O schema contract.
*   **Minimum Sufficient Context (MSC)**: A strategy to maximize efficiency by treating context as a scarce resource, targeting a total budget of ~5,800 tokens.
*   **Structural vs. Instructional Constraints**: Structural constraints (e.g., restricted filesystem MCPs) are preferred over instructional prompts because they make violations "physically" impossible for the agent.
*   **Skill Conversion Pattern**: To maintain efficiency, any formatting instructions exceeding ~200 tokens must be offloaded and converted into a dedicated "Skill."
*   **Compressed Handoff**: State transfer between agents is managed via a specific template that includes completed tasks, artifact paths, key state, pending items, and blockers.

## Structure Summary
*   **Reason & Raw Concept**: Defines the document's purpose, source files, and the high-level flow (Scope → Budgets → Contract → Output).
*   **Narrative**: Outlines the core philosophy of sub-agent anatomy and highlights the "Rule of Gold" and MSC strategy.
*   **Rules**: Establishes hard constraints for scoping and the threshold for converting instructions into Skills.
*   **Facts**: Provides technical specifications, including the token budget breakdown, handoff requirements, and specific sub-agent examples.

## Notable Entities, Patterns, and Decisions

### Entities (Example Sub-agents)
*   `pmpro-css`: Dedicated to styling.
*   `paypal-nvp`: Handles API integration.
*   `slim-routes`: Manages endpoint definitions.
*   `atlas-entities`: Manages ORM/entity definitions.

### Patterns
*   **Context Budget Template (~5,800 tokens)**:
    *   System: 800 tokens
    *   Spec Task: 1,500 tokens
    *   Files: 3,000 tokens
    *   Handoff: 500 tokens
*   **Compressed Handoff Template**: A standardized state-transfer object containing `completed_tasks`, `artifact_paths`, `next_agent_state`, `pending_items`, `blockers`, and `result_status`.

### Key Decisions
*   **Constraint Hierarchy**: Prioritize Model Context Protocol (MCP) restrictions over prompt-based instructions to ensure reliability.
*   **Token Management**: Explicitly limit formatting instructions to 200 tokens to prevent prompt bloat, forcing modularization into Skills.
# Specialized Agents and Orchestration: Overview

### Key Points
*   **Dispatcher Model:** The system utilizes a dispatcher pattern where a central agent decomposes complex tasks and delegates them to specialized sub-agents.
*   **Modular Agent Definition:** New agents are created by adding markdown files with specific frontmatter to the `.opencode/agents/` directory.
*   **Hierarchical Workflow:** The operational flow follows a structured path: Main Agent → Orchestrator → Specialized Sub-agents → Synthesis.
*   **Strict Documentation Rules:** A specific project rule prohibits the inclusion of agent names (e.g., @orchestrator) in commit messages or general documentation.
*   **Invocation Method:** Specialized agents are triggered via `@mention` syntax within the ecosystem.

### Structure Summary
*   **Metadata:** Defines the document's lifecycle (draft), importance, and creation date (April 2026).
*   **Reason & Raw Concept:** Establishes the intent to document the ecosystem based on `AGENTS.md` and identifies the core file locations.
*   **Narrative:** Provides a high-level overview of the agent list, the dispatcher pattern, and the primary rules for agent management.
*   **Facts:** Formalizes the specific role of the `@orchestrator` and the technical convention for agent creation.

### Notable Entities, Patterns, and Decisions

#### Entities (Specialized Agents)
*   `@orchestrator`: The primary dispatcher responsible for task breakdown.
*   `@project-leader`: High-level oversight.
*   `@component-builder`: Specialized in technical construction.
*   `@blog-writer`: Content generation specialist.
*   `@tester`, `@explore`, `@plan`: Utility agents for validation and strategy.

#### Patterns
*   **Dispatcher Pattern:** A design choice to handle complexity by routing tasks through a central coordinator rather than using a single monolithic agent.
*   **Synthesis Phase:** The final step in the workflow where sub-agent outputs are consolidated.

#### Key Decisions
*   **Directory-Based Configuration:** All agent logic and definitions are centralized in `.opencode/agents/`.
*   **Anonymity in Metadata:** Decision to keep agent identifiers out of the version control history (commit messages) and external documentation to maintain a clean project log.
*   **Frontmatter Requirement:** Mandatory use of markdown frontmatter for any new agent definitions to ensure system compatibility.
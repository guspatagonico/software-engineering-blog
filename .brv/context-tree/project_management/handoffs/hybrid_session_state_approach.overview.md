### Key Points
- ByteRover stores durable knowledge (patterns, decisions, preferences) that agents must query automatically at session start.
- Handoffs serve as ephemeral session state storage for artifacts like completed tasks, blockers, and next steps, accessed only upon explicit user request.
- Agents prioritize ByteRover queries to reduce noise and only read handoffs when users demand current session context.
- Hybrid approach separates long-lived knowledge from short-lived context, ensuring lightweight access to session state.
- Policy reinforces hidden handoffs until needed, keeping agent sessions focused.

### Structure / Sections Summary
- **Reason:** States intent to document persistent vs. ephemeral session state and agent behavior during session initialization.
- **Raw Concept:** Lists task, changes, relevant files, flow, timestamp, and author capturing the approach’s essentials and modifications.
- **Narrative:**
  - **Structure:** Explains coexistence of ByteRover (durable state) and handoffs (ephemeral state).
  - **Dependencies:** Defines required agent behavior (ByteRover first, handoffs hidden until requested).
  - **Highlights:** Emphasizes responsibility split and agent preference for ByteRover to minimize noise.
- **Facts:** Enumerates conventions about knowledge storage, session state allocation, and agent startup behavior.

### Notable Entities, Patterns, or Decisions
- **Entities:** ByteRover (persistent knowledge store), Handoffs (.brv/context-tree/project_management/handoffs) for ephemeral state, agents operating within this flow.
- **Decision Pattern:** Agents auto-query ByteRover before considering handoffs, keeping handoff access user-triggered.
- **Policy Decision:** Handoffs stay hidden unless explicitly requested to maintain lightweight sessions and avoid unnecessary reads.
- **Flow:** Agent session start → ByteRover query → Handoff only if user requests ephemeral context.
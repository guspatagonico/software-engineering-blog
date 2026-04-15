---
title: Hybrid Session State Approach
summary: Defines how ByteRover stores durable knowledge while handoffs capture ephemeral session state, and how agents prioritize querying each store.
tags: []
related: [project_management/handoffs/context.md]
keywords: []
importance: 67
recency: 1
maturity: validated
accessCount: 4
updateCount: 1
createdAt: '2026-04-13T14:40:06.574Z'
updatedAt: '2026-04-13T14:40:25.894Z'
---
## Reason
Document persistent vs ephemeral session state handling and agent behavior at session start

## Raw Concept
**Task:**
Document the hybrid session state approach for agents using ByteRover and handoffs

**Changes:**
- Clarified which content is stored in the persistent knowledge base versus handoff files
- Defined agent behavior for querying each store depending on the session phase
- Reinforced the policy that handoffs are only read when users demand ephemeral state
- Mapped persistent knowledge to ByteRover (patterns, decisions, preferences)
- Assigned ephemeral session artifacts (completed tasks, blockers, next steps) to handoffs
- Set agent behavior to auto-query ByteRover first and only access handoffs when explicitly requested

**Files:**
- .brv/context-tree/project_management/handoffs

**Flow:**
Agent session start -> query ByteRover for persistent knowledge -> consult handoff only when users request ephemeral state

**Timestamp:** 2026-04-13

**Author:** ByteRover context engineer

## Narrative
### Structure
ByteRover retains durable knowledge (patterns, decisions, preferences) while the shared handoff channel records ephemeral session states such as completed tasks, blockers, and next steps; the two systems coexist but serve different lifespans.

### Dependencies
Agents must auto-query ByteRover at the beginning of a session to load persistent knowledge before checking handoffs, and handoffs remain hidden until explicitly asked to keep session context lightweight.

### Highlights
Hybrid approach splits responsibilities to keep persistent knowledge centralized and ephemeral state lightweight; agents consistently prefer ByteRover, reducing noise from frequent handoff reads.

## Facts
- **knowledge_storage**: ByteRover persists knowledge such as patterns, decisions, and preferences across sessions. [project]
- **session_state**: Handoffs hold ephemeral session state like completed tasks, blockers, and next steps. [project]
- **agent_startup**: Agents auto-query ByteRover at session start before reading any handoff notes. [convention]

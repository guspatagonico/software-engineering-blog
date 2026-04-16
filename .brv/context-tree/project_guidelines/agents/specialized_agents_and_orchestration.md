---
title: Specialized Agents and Orchestration
summary: Project uses a dispatcher model with specialized agents like @orchestrator, @blog-writer, and @component-builder.
tags: []
keywords: []
importance: 50
recency: 1
maturity: draft
createdAt: '2026-04-16T11:44:12.557Z'
updatedAt: '2026-04-16T11:44:12.557Z'
---
## Reason
Documenting the specialized agents and their roles from AGENTS.md

## Raw Concept
**Task:**
Document agent ecosystem and dispatcher pattern

**Files:**
- AGENTS.md
- .opencode/agents/

**Flow:**
Main agent -> Orchestrator -> Specialized Subagents -> Synthesis

**Timestamp:** 2026-04-16

## Narrative
### Structure
Specialized agents: @project-leader, @orchestrator, @component-builder, @blog-writer, @tester, @explore, @plan.

### Highlights
Dispatcher pattern for complex tasks. Invoke agents via @mention.

### Rules
Rule 1: Never include agent names in commit messages or docs.
Rule 2: New agents require frontmatter in .opencode/agents/ markdown files.

## Facts
- **orchestrator_role**: The @orchestrator agent is responsible for breaking down complex tasks and dispatching them. [project]
- **agent_creation**: New agents are defined by adding markdown files to the .opencode/agents/ directory. [convention]

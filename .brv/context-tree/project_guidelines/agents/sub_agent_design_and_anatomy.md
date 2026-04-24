---
title: Sub-agent Design and Anatomy
summary: Sub-agent Rule of Gold, anatomy (artifact/budget/contract), and Minimum Sufficient Context strategy
tags: []
keywords: []
importance: 55
recency: 1
maturity: draft
updateCount: 1
createdAt: '2026-04-15T02:24:52.899Z'
updatedAt: '2026-04-24T15:55:04.834Z'
---
## Reason
Document sub-agent design principles and context strategies

## Raw Concept
**Task:**
Define sub-agent design and context management

**Files:**
- src/components/posts/HarnessEngineeringExtras.astro

**Flow:**
Scope -> Budgets -> Contract -> Output

**Timestamp:** 2026-04-24

## Narrative
### Structure
Sub-agents have defined anatomy: single output type, exact context budget, explicit tool budget, and contract.

### Highlights
Rule of Gold: Scope < 2 sentences. Minimum Sufficient Context (~5800 tokens). Compressed handoff for state transfer.

### Rules
Rule of Gold: If a sub-agent's scope requires >2 sentences to describe, it is over-scoped.
Rule: If formatting instructions exceed ~200 tokens, convert them into a Skill.

## Facts
- **Rule of Gold**: The Rule of Gold states that if a sub-agent's scope requires more than 2 sentences to describe, it is over-scoped.
- **Anatomy**: Sub-agent anatomy consists of a single output artifact type, an exact context budget of visible files, an explicit tool budget, and a defined input/output schema contract.
- **Sub-agent Examples**: Examples of sub-agents include pmpro-css for styling, paypal-nvp for API integration, slim-routes for endpoints, and atlas-entities for ORM.
- **Minimum Sufficient Context**: Minimum Sufficient Context is the strategy of using the scarcest resource (context) efficiently.
- **Budget Template**: A context budget template of ~5800 tokens allocates 800 for system, 1500 for spec task, 3000 for files, and 500 for handoff.
- **Compressed Handoff**: The Compressed Handoff Template includes completed tasks, exact artifact paths, key state for the next agent, pending items, blockers, and a result status.
- **Skills/MCPs**: Structural constraints like restricted filesystem MCPs are stronger than instructional constraints and make violations physically impossible.
- **Skill Conversion Pattern**: If formatting instructions exceed ~200 tokens, they should be converted into a Skill.

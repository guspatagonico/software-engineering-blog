---
title: Sub-agent Design and Anatomy
summary: Sub-agent Rule of Gold, anatomy (artifact/budget/contract), and Minimum Sufficient Context strategy (~5800 tokens).
tags: []
keywords: []
importance: 55
recency: 1
maturity: draft
updateCount: 2
createdAt: '2026-04-15T02:24:52.899Z'
updatedAt: '2026-04-27T21:50:00.000Z'
consolidated_at: '2026-04-27T21:50:20.978Z'
consolidated_from:
  - {date: '2026-04-27T21:50:20.978Z', path: project_guidelines/agents/context_window_and_handoff_strategy.md, reason: 'Both files define sub-agent constraints, context budgets (~5800 tokens), and handoff templates. ''sub_agent_design_and_anatomy.md'' provides the broader design context while ''context_window_and_handoff_strategy.md'' focuses on the token breakdown.'}
---
## Reason
Document sub-agent design principles, context management strategies, and handoff templates.

## Raw Concept
**Task:**
Define sub-agent design, context management, and handoff protocols

**Files:**
- src/components/posts/HarnessEngineeringExtras.astro

**Flow:**
System -> Spec -> Archivos -> Handoff -> Total Budget (Scope -> Budgets -> Contract -> Output)

**Timestamp:** 2026-04-24

## Narrative
### Structure
Sub-agents have defined anatomy: single output type, exact context budget, explicit tool budget, and contract. Total budget target is ~5800 tokens.

### Highlights
Rule of Gold: Scope < 2 sentences. Minimum Sufficient Context (~5800 tokens). Compressed handoff for state transfer. Session-state.md is the single global source of truth maintained by the orchestrator; it never enters sub-agent context.

### Rules
Rule of Gold: If a sub-agent's scope requires >2 sentences to describe, it is over-scoped.
Rule: If formatting instructions exceed ~200 tokens, convert them into a Skill.
Rule: Session-state.md is the global source of truth and never enters sub-agent context.

### Examples
**Budget Template (~5800 tokens):**
- System: 800
- Spec: 1500
- Archivos: 3000
- Handoff: 500

**Handoff Comprimido:**
- Completado (summary of work)
- Artefactos (exact paths)
- Estado clave (instructions for next agent)
- Pendiente (out of scope/remaining)
- Blockers (impediments)
- Resultado (DONE|PARTIAL|BLOCKED)

## Facts
- **Rule of Gold**: The Rule of Gold states that if a sub-agent's scope requires more than 2 sentences to describe, it is over-scoped.
- **Anatomy**: Sub-agent anatomy consists of a single output artifact type, an exact context budget of visible files, an explicit tool budget, and a defined input/output schema contract.
- **Minimum Sufficient Context**: Minimum Sufficient Context is the strategy of using the scarcest resource (context) efficiently, targeting ~5800 tokens.
- **Budget Allocation**: Target budget: System (800), Spec (1500), Archivos (3000), Handoff (500).
- **Session State Rule**: Session-state.md is the global source of truth and never enters sub-agent context.
- **Skills/MCPs**: Structural constraints like restricted filesystem MCPs are stronger than instructional constraints.
- **Skill Conversion Pattern**: If formatting instructions exceed ~200 tokens, they should be converted into a Skill.
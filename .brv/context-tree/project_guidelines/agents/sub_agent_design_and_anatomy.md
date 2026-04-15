---
title: Sub-agent Design and Anatomy
summary: 'Sub-agent design: Rule of Gold (<= 2 sentences scope), single output type, explicit budgets (context/tool), and explicit contracts'
tags: []
keywords: []
importance: 50
recency: 1
maturity: draft
createdAt: '2026-04-15T02:24:52.899Z'
updatedAt: '2026-04-15T02:24:52.899Z'
---
## Reason
Document sub-agent design rules and anatomy

## Raw Concept
**Task:**
Define sub-agent design rules and anatomical structure

**Flow:**
Scope -> Budgets -> Contract -> Output

**Timestamp:** 2026-04-14

## Narrative
### Structure
Anatomy includes Artefacto de salida (single type), Context budget (file list), Tool budget (enabled MCPs), and Contrato explícito (schema mapping).

### Highlights
Structural constraints (e.g., restricted MCP paths) are strong barrier functions. Instructional constraints are weak and prone to failure.

### Rules
Rule of Gold: Scope description must be <= 2 sentences. Anti-patterns: Full-stack access (entropy), ambiguous output types, instructional-only (weak) barriers.

## Facts
- **sub_agent_scope_rule**: Sub-agent scope descriptions must be 2 sentences or less (Rule of Gold) [convention]
- **sub_agent_output_rule**: Sub-agents must have a single output type (Artefacto de salida) [convention]
- **constraint_strength**: Structural constraints are strong barrier functions; instructional constraints are weak [convention]

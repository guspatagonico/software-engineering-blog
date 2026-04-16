---
title: Context Window and Handoff Strategy
summary: 'Context strategy: minimum sufficient context (~5800 tokens total) and compressed handoff templates'
tags: []
keywords: []
importance: 53
recency: 1
maturity: draft
accessCount: 1
createdAt: '2026-04-15T02:24:52.899Z'
updatedAt: '2026-04-15T02:24:52.899Z'
---
## Reason
Document context management and handoff templates

## Raw Concept
**Task:**
Define context window budget and handoff template

**Flow:**
System -> Spec -> Archivos -> Handoff -> Total Budget

**Timestamp:** 2026-04-14

## Narrative
### Structure
Total budget target: ~5800 tokens (System: 800, Spec: 1500, Archivos: 3000, Handoff: 500).

### Highlights
Session-state.md is the single global source of truth maintained by the orchestrator; never enters sub-agent context.

### Examples
Handoff Comprimido: Completado (summary), Artefactos (paths), Estado clave (next agent), Pendiente (out of scope), Blockers, Resultado (DONE|PARTIAL|BLOCKED).

## Facts
- **context_budget**: The target sub-agent context budget is approximately 5800 tokens [convention]
- **session_state_rule**: Session-state.md is the global source of truth and never enters sub-agent context [convention]

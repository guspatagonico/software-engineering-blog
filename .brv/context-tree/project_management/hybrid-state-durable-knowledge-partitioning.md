---
confidence: 0.9
sources:
  - project_management/_index.md
  - project_guidelines/_index.md
synthesized_at: '2026-04-27T21:50:31.311Z'
type: synthesis
---

# Hybrid State & Durable Knowledge Partitioning

The project enforces a strict 'Hybrid State Strategy' that separates durable architectural patterns (curated by ByteRover) from ephemeral session state (handoff files), optimizing agent context windows and preventing redundant information processing.

## Evidence

- **project_management**: Employs a dual-store pattern where durable knowledge is auto-queried at startup, while ephemeral handoffs (tasks, blockers) are only accessed upon request.
- **project_guidelines**: Enforces a strict ~5800 token budget per sub-agent and uses Compressed Handoff Templates in _handoffs/ to maintain the Rule of Gold.

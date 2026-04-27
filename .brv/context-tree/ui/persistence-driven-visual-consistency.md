---
confidence: 0.8
sources:
  - project_guidelines/_index.md
  - ui/_index.md
synthesized_at: '2026-04-27T21:50:31.317Z'
type: synthesis
---

# Persistence-Driven Visual Consistency

A centralized persistence layer in src/utils/storage.ts serves as the single source of truth for visual state (Matrix, themes, checklists), bridging static Astro layouts with interactive React/Three.js components.

## Evidence

- **project_guidelines**: Uses a single localStorage key (gsalvini-se-blog) to track visual toggles and checklist states with SSR-safe checks.
- **ui**: The Dodecahedron (Three.js) toggle dispatches events to the Matrix system while persisting state in localStorage, with Base.astro acting as the central listener.

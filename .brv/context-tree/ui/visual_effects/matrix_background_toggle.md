---
title: Matrix Background Toggle
tags: []
related: [ui/visual_effects/matrix_background.md]
keywords: []
importance: 50
recency: 1
maturity: draft
createdAt: '2026-04-07T11:37:40.443Z'
updatedAt: '2026-04-07T11:37:40.443Z'
---
## Raw Concept
**Task:**
Document the toggling, persistence, and visibility gating around the matrix background effect that runs inside Base layout.

**Changes:**
- Ensure Base.astro embeds MatrixBackground behind #matrix-bg-wrapper and defaults showBackground=false to avoid rendering on first load.
- Wire Dodecahedron clicks to dispatch toggle-matrix-background events so the background state can be toggled on demand.
- Track visibility through the matrix-bg-visible class, MutationObserver, and localStorage so MatrixBackground can gate its draw loop.

**Files:**
- src/layouts/Base.astro
- src/components/MatrixBackground/MatrixBackground.tsx

**Flow:**
Base layout initMatrixState reads matrix-background-visible and toggles body class -> Dodecahedron click dispatches toggle-matrix-background -> Base updates class/localStorage -> MatrixBackground MutationObserver and isVisibleRef track class -> draw() returns immediately when hidden, otherwise renders streams and listens for theme changes.

**Timestamp:** 2026-04-07

## Narrative
### Structure
Base.astro wraps the global layout, embeds #matrix-bg-wrapper with MatrixBackground, and wires an inline initMatrixState script that updates the matrix-bg-visible class and localStorage whenever a toggle-matrix-background event arrives.

### Dependencies
MatrixBackground relies on the body matrix-bg-visible class, a MutationObserver to react to attribute changes, and the toggle-matrix-background event emitted by Dodecahedron to know when it should render.

### Highlights
State is persisted through localStorage so the user’s preference survives page reloads, and MatrixBackground short-circuits its draw loop whenever the effect is hidden to conserve CPU even though it still schedules animation frames.

## Facts
- **matrix_background_default**: Matrix background is disabled by default because Base.astro passes showBackground=false and the inline initMatrixState script waits for an explicit toggle before adding matrix-bg-visible to the body. [project]
- **matrix_background_toggle_event**: Dodecahedron dispatches a toggle-matrix-background event that Base.astro listens for to flip the matrix-bg-visible class and persist the new state to localStorage under matrix-background-visible. [project]
- **matrix_background_rendering**: The MatrixBackground draw loop returns immediately whenever body lacks matrix-bg-visible so no GPU/CPU work happens while the effect is hidden. [project]

---
title: Dodecahedron Toggle
tags: []
related: [ui/visual_effects/matrix_background.md, ui/visual_effects/glassy_navigation_layout.md]
keywords: []
importance: 50
recency: 1
maturity: draft
createdAt: '2026-04-07T11:35:58.807Z'
updatedAt: '2026-04-07T11:35:58.807Z'
---
## Raw Concept
**Task:**
Document the Dodecahedron-based matrix background toggle including setup, interaction states, and rendering configuration.

**Changes:**
- Implements a dedicated interactive 3D toggle button that dispatches toggle-matrix-background events.
- Adds hover/touch-aware speed, scale, and glow animations plus responsive resize handling and cleanup.
- Syncs material and light colors to the active theme and ensures the renderer uses high-fidelity settings (antialias, ACESFilmicToneMapping, PCFShadowMap).

**Files:**
- src/components/Dodecahedron/Dodecahedron.tsx

**Flow:**
Mount component -> build Three.js scene, geometry, materials, and lights -> animate rotation/scale/glow with hover smoothing -> listen for theme changes, resize, and matrix toggle clicks -> dispose resources on unmount.

**Timestamp:** 2026-04-07

**Author:** UI Team

## Narrative
### Structure
The component renders a transparent 128px button that anchors a Three.js canvas inside. The scene contains a Dodecahedron mesh, inner glow mesh, wireframe, and multiple light sources (ambient, directional, fill, rim, point). Lighting and materials swap colors based on the detected light or dark theme, and hover/touch states manipulate rotation speed, scale, and glow pulse before passing control back to the animation loop.

### Dependencies
Relies on Three.js for scene/geometry/rendering, the document theme-changed CustomEvent to refresh colors, navigator/window touch detection for interaction gating, and the matrix background subsystem listening for toggle-matrix-background events. It also requires window resize events to keep the camera/projection synchronized and cleans up renderer/geometry/material resources on unmount.

### Highlights
Smooth speed easing toggles between hover and idle states, the inner glow material pulses via a sine wave, the button dispatches the matrix toggle event on click, and cleanup removes listeners and disposes every Three.js object to avoid leaks while the renderer uses a pixel ratio cap of three for high-DPI consistency.

## Facts
- **toggle_event**: Clicking the Dodecahedron button dispatches the 'toggle-matrix-background' custom event so the matrix background layer can show or hide. [project]
- **hover_behavior**: On non-touch devices, hovering pauses the rotation and smoothly scales the geometry to 115% while introducing a gentle pulse before resuming normal speed on mouse leave. [project]
- **touch_behavior**: Touch devices skip hover transitions so a tap just toggles the matrix background without changing the rotation or scale. [project]
- **renderer_settings**: WebGLRenderer is configured with antialiasing, alpha transparency, device pixel ratio clamped to 3, ACESFilmicToneMapping, PCFShadowMap, and toneMapping exposure 1.0 to balance quality and performance. [project]
- **positioning**: The button is fixed at bottom-right (74px from bottom, 24px from right) with a 128px square footprint and z-index 40 so it layers beneath the navbar (50+) and footer while remaining reachable. [project]

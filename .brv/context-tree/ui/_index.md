---
children_hash: 0a5113d3036bb8ce94f94a080700c0a84ec0d123b8dfa0e9d21572d7b9acdca2
compression_ratio: 0.42946990116801437
condensation_order: 2
covers: [context.md, visual_effects/_index.md]
covers_token_total: 1113
summary_level: d2
token_count: 478
type: summary
---
# ui Structural Summary

## Domain Purpose & Scope
- **ui/context.md** defines the domain for immersive animated interfaces (Canvas/WebGL backgrounds, particle simulations, interactive components) while excluding copy and backend logic; owned by Design Systems & Frontend and used for documenting implementation/optimization.

## visual_effects Overview
- **visual_effects/_index.md** collects the visual narratives below.

### Core Animation
- **matrix_background.md**: Details MatrixBackground rendering pipeline (theme-aware canvas setup, weighted depth streams, gem-word flicker probability, mouse repulsion/vortex). Performance tuning includes breakpoint stream counts (60/180/220) and pauseable gem updates; CSS modules keep size/theme in sync.
- **matrix_background_toggle.md**: Describes Base.astro embedding, `initMatrixState`, localStorage persistence of `matrix-bg-visible` class, and event-driven visibility that halts the animation loop when disabled.
- **dodecahedron_toggle.md**: Describes the Three.js Dodecahedron button (128px, glow/wireframe, theme-linked colors, hover/touch handling), renderer settings (antialias, ACESFilmic, PCFShadowMap, capped DPR), event dispatch for `toggle-matrix-background`, and cleanup.

### Layout & Theme Dressing
- **glassy_navigation_layout.md**: Captures Navbar/Footer glassy backdrops (blur/saturate tokens, sticky placement), mobile drawer behaviors (280px sliding panel, link reveal delays 0.05–0.2s), and enforced token/body-class coordination for consistent overlays.

### Relationships
- Matrix background (`matrix_background.md`) is the animation engine referenced by the toggle (`matrix_background_toggle.md`) and Dodecahedron button (`dodecahedron_toggle.md`); layout glass styling (`glassy_navigation_layout.md`) shares theme token dependencies with those effects.

Drill into the listed files for detailed implementation, events, and styling rules.
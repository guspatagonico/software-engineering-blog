---
children_hash: b311c1ebcc73223607a67e827ad5c1d8cfe9e2551228703056a1ee257603f67c
compression_ratio: 0.2801642451042325
condensation_order: 1
covers: [context.md, dodecahedron_toggle.md, glassy_navigation_layout.md, matrix_background.md, matrix_background_toggle.md]
covers_token_total: 3166
summary_level: d1
token_count: 887
type: summary
---
# ui/visual_effects Summary

## visual_effects/context.md
- **MatrixBackground component**: multi-layered Kodama-inspired rain with depth styling, gem word flickers, mouse-based repulsion/vortex dynamics, and theme-aware presentation; performance balanced via tunable stream counts and character-change pacing.
- **Anchor for related entries**: `ui/visual_effects/matrix_background.md` details animation internals, while other visual effects (toggle/button/layout) reference this core behavior.

## matrix_background.md
- **Task & flow**: Responsive MatrixBackground animation initializes theme/canvas, generates weighted depth layers with gem placements, drives render loop with requestAnimationFrame, and reacts to resize/mouse/theme events before cleanup.
- **Key facts**: stream counts adjust by breakpoint (60/180/220), 44 curated gem words embed at 70% probability with per-character timers, mouse influence extends 200px with shockwave/vortex adjustments, dark/light palettes vary accordingly.
- **Rules & highlights**: avoid blocking draw work, gem updates pause default changes, toggle between teal/dark tones, rely on CSS module for sizing and theme synchronization.

## matrix_background_toggle.md
- **Flow & structure**: Base.astro embeds MatrixBackground in `#matrix-bg-wrapper`, runs `initMatrixState` to manage the `matrix-bg-visible` body class via localStorage, and listens for Dodecahedron-emitted `toggle-matrix-background` events; MatrixBackground short-circuits rendering when hidden.
- **Facts**: default off until user toggles, event-driven toggle with persistence, draw loop exits when visibility class absent to save GPU/CPU.

## dodecahedron_toggle.md
- **Component anatomy**: Transparent 128px button housing a Three.js scene with Dodecahedron mesh, glow, wireframe, and multiple lights; colors sync with theme changes, hover/touch states adjust rotation/scale/glow, and disposed resources prevent leaks.
- **Flow**: mount → build scene/materials → animate with hover smoothing → listen for theme/resize/toggle events → cleanup on unmount.
- **Facts**: dispatches `toggle-matrix-background`, hover smooths scaling/rotation, touch taps skip hover effects, renderer uses antialias + ACESFilmic + PCFShadowMap + capped device pixel ratio, positioned bottom-right at z-index 40.

## glassy_navigation_layout.md
- **Composition**: Navbar and Footer share glassy backdrop (blur + saturation) and sticky placement; mobile overlay/drawer reuse theme tokens (`--glass-bg`, `--glass-bg-mobile`, `--overlay-bg`) with JS-driven visibility toggles and staggered link reveals; Footer mirrors glass styling and contact button highlights.
- **Facts**: glass surfaces use `backdrop-filter: blur(12px) saturate(180%)`; mobile drawer is 280px sliding panel with link delays from 0.05s to 0.2s; tokens ensure theme parity; includes rules enforcing token usage and consistent data-visible/body class coordination.

## Relationships & Drill-down
- **Matrix background core** (`matrix_background.md`) connects to toggle (`matrix_background_toggle.md`) and Dodecahedron button (`dodecahedron_toggle.md`).
- **Layout dressing** (`glassy_navigation_layout.md`) shares theme-token dependencies and aesthetic alignment with the visual effects domain.
- **Reference entry names**: explore specific files (e.g., `ui/visual_effects/matrix_background.md`, `ui/visual_effects/matrix_background_toggle.md`, `ui/visual_effects/dodecahedron_toggle.md`, `ui/visual_effects/glassy_navigation_layout.md`) for detailed implementation, interactions, and rules.
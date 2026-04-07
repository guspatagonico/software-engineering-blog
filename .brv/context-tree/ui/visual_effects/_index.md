---
children_hash: c71142aa964ee90a9c2581ad95b437c11408617afae1963084de37513a257ea0
compression_ratio: 0.5518814139110604
condensation_order: 1
covers: [context.md, matrix_background.md]
covers_token_total: 877
summary_level: d1
token_count: 484
type: summary
---
## Domain: ui/visual_effects

### visual_effects/context.md
- **Scope:** Describes the MatrixBackground component; multi-layered, interactive rain effect with mouse repulsion and theme-aware lighting.
- **Key Concepts:** Layer-based depth styling, gem word placement with flickering, mouse proximity forces (vortex pulls), and performance tuning via stream and character update rates.
- **Relationships:** Related to other visual effect components under the same domain for broader UI animations.

### Matrix Background Component (matrix_background.md)
- **Task & Flow:** Implements the homepage’s immersive digital rain by mounting a canvas-ref React component that sizes to the viewport, initializes 180 streams across five depth layers, loops through drawing/animation (clearing, updating character states, regenerating off-screen streams), and reacts to resize/mouse/theme events.
- **Structure & Dependencies:** Each stream holds characters, brightness gradients, optional gem metadata, and depth-based color/shadow adjustments; rendering respects dark/light themes, mouse offsets, and relies on CSS module positioning plus a monospace font stack (Noto Sans Mono, MS Gothic, Hiragino Sans) synchronized with localStorage/theme media queries.
- **Highlights & Facts:**
  - Streams: 180 columns with varying speed/alpha/font size across five layers; CHAR_CHANGE_RATE 0.3, CHAR_CHANGE_COUNT 2 govern refresh rates.
  - Characters: 70% Latin, 30% Japanese katakana from dedicated constants; draw order sorted roughly by depth.
  - Gems: 30 hidden words (e.g., gustavo, robotics, kernel panic, linus torvalds) appear with GEM_CHANCE 0.002, flickering via independent gemTimers.
  - Mouse Interaction: 200 px radius, exponential repulsion with subtle vortex pulls tailored per depth, keeping motion soft.
  - Performance: Layered alpha blending and regeneration keeps the cyber-noir aesthetic fluid while supporting interactive effects.
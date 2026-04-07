---
children_hash: d52db4f05de9755bcd45ffc3f87f2d510fec83f2a2b1f7f020e140575e96a7ca
compression_ratio: 0.22292350416561474
condensation_order: 1
covers: [context.md, dodecahedron_toggle.md, glassy_navigation_layout.md, matrix_background.md, matrix_background_toggle.md, scroll_feedback_system.md]
covers_token_total: 3961
summary_level: d1
token_count: 883
type: summary
---
# visual_effects (domain overview)
- **context.md**: Defines the MatrixBackground component’s layered rain, gem-word highlights, mouse interaction forces, and performance tuning. Serves as hub for related visual effect components.

## Component Summaries
- **Matrix Background (`matrix_background.md`)**
  - **Architecture**: Five-depth canvas layers managing speed, size, alpha, and column coverage with responsive stream counts (60/180/220 per device) and 44 curated gem words that flicker via per-character timers.
  - **Interactions**: Theme detection (DOM attribute, storage events, prefers-color-scheme), mouse-driven shockwave/vortex within 200px radius, and responsive resize/mouse/theme listeners. Gem words pause character updates while regular characters change at CHAR_CHANGE_RATE=0.3.
  - **Rules**: Rendering avoids blocking draw frames (requestAnimationFrame) and cleans up listeners; gem timers preserve their state.

- **Matrix Background Toggle (`matrix_background_toggle.md`)**
  - **Flow**: `Base.astro` embeds `#matrix-bg-wrapper`, initializes matrix state, listens to `toggle-matrix-background`, updates `matrix-bg-visible` class/localStorage, and MatrixBackground short-circuits draw loop when hidden.
  - **Persistence**: Default hidden (`showBackground=false`), user toggle persists via `matrix-background-visible` localStorage, and MatrixBackground only renders when `matrix-bg-visible` is present.

- **Dodecahedron Toggle (`dodecahedron_toggle.md`)**
  - **Structure**: 128px Three.js button fixed bottom-right (z-index 40) containing dodecahedron/wireframe/glow meshes plus ambient/directional/fill/rim/point lights; theme-aware material swaps and hover/touch animations for rotation, scale, and glow pulsing.
  - **Dependencies & Cleanup**: Listens for theme-change events, window resize, and dispatches `toggle-matrix-background`; disposes renderer/geometry/material on unmount and caps devicePixelRatio at 3 with antialias, ACESFilmicToneMapping, PCFShadowMap, exposure 1.0.
  - **Facts**: Hover pauses rotation/scale on pointer devices, touch taps only toggle visibility, clicking emits `toggle-matrix-background`, button placement ensures consistent overlay.

- **Glassy Navigation Layout (`glassy_navigation_layout.md`)**
  - **Structure**: `Navbar.astro` and `Footer.astro` adopt backdrop-filter blur/saturate glass surfaces driven by tokens (`--glass-bg`, `--glass-bg-mobile`, `--overlay-bg`), plus mobile drawer overlay with staggered link reveal delays and aria/data attributes controlling visibility.
  - **Dependencies**: Shared glass tokens in `tokens.css`; mobile drawer relies on JS toggles for data-visible/body classes to animate overlay/drawer together.
  - **Rules**: Glass surfaces must use shared tokens for both themes; mobile drawer visibility strictly tied to `data-visible` attributes and `nav-open` body class.

- **Scroll Feedback System (`scroll_feedback_system.md`)**
  - **Architecture**: `.page-container` flex wrapper + scrollable `.content` keeps page scroll at viewport edge while Navbar and headers host ScrollIndicator; native scrollbars hidden globally.
  - **Components**: `ScrollIndicator.astro` renders 3px green progress bar under Navbar and headers; Dodecahedron gains `autoHideOnScroll` prop (false default) to hide after 2s inactivity when scrolling non-home pages.
  - **Flow**: Scroll events update indicator width and trigger Dodecahedron visibility timer; layout updates include Base and BlogPost layout changes plus CSS adjustments for scroll behavior.
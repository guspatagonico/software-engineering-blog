---
children_hash: 5675fd161ae8e9d1086c35ec838c1f1751015859c0c5e1a87d8312fa7489711f
compression_ratio: 0.18730086481565772
condensation_order: 1
covers: [context.md, dodecahedron_toggle.md, glassy_navigation_layout.md, matrix_background.md, matrix_background_post_card_styles.md, matrix_background_toggle.md, scroll_feedback_system.md]
covers_token_total: 4394
summary_level: d1
token_count: 823
type: summary
---
# Domain: visual_effects

The visual effects system provides a high-fidelity, interactive layer for the blog, centered around a responsive Matrix-style background, a 3D interactive toggle, and theme-aware glass surfaces. The architecture emphasizes performance through visibility gating and resource cleanup.

## Core Components & Systems

### Matrix Background System
The system renders a multi-layer "Kodama-style" rain of characters with deep interactivity.
*   **Matrix Background ([matrix_background.md](matrix_background.md))**: A full-screen canvas using five depth layers. It features responsive stream counts (60 mobile, 180 tablet, 220 desktop), 44 curated "gem words" with flicker timers, and mouse-driven shockwaves/vortex pulls within a 200px radius.
*   **Visibility & Persistence ([matrix_background_toggle.md](matrix_background_toggle.md))**: Managed via the `.matrix-bg-visible` body class and `localStorage`. The `draw()` loop short-circuits when hidden to eliminate CPU/GPU overhead.
*   **Post Card Integration ([matrix_background_post_card_styles.md](matrix_background_post_card_styles.md))**: Applies `backdrop-filter: blur(10px) saturate(120%)` to blog cards when the matrix is active. Overrides are explicitly disabled in light mode to preserve readability.

### Interactive 3D Control
*   **Dodecahedron Toggle ([dodecahedron_toggle.md](dodecahedron_toggle.md))**: A Three.js-based interactive button (`src/components/Dodecahedron/Dodecahedron.tsx`) that dispatches `toggle-matrix-background` events. It features theme-synced materials, high-fidelity renderer settings (ACESFilmicToneMapping, PCFShadowMap), and smooth easing for hover/touch states.
*   **Auto-Hide Logic ([scroll_feedback_system.md](scroll_feedback_system.md))**: On non-homepage views, the Dodecahedron uses an `autoHideOnScroll` prop to fade out after two seconds of scroll inactivity.

### Navigation & Layout Effects
*   **Glassy Navigation ([glassy_navigation_layout.md](glassy_navigation_layout.md))**: Implements `backdrop-filter: blur(12px) saturate(180%)` across the `Navbar` and `Footer`. It uses theme-aware tokens (`--glass-bg`, `--overlay-bg`) defined in `tokens.css`.
*   **Mobile Drawer**: A 280px wide drawer with staggered link reveal delays (0.05s to 0.2s) and visibility driven by `data-visible` attributes.

### Scroll Feedback System
*   **Scroll Indicator ([scroll_feedback_system.md](scroll_feedback_system.md))**: A 3px green progress bar anchored 48px from the top.
*   **Scroll Architecture**: Nests a `.page-container` flex parent with a scrollable `.content` area. Native scrollbars are suppressed globally (`scrollbar-width: none`) in favor of the visual indicator.

## Architectural Decisions & Patterns
*   **Event-Driven State**: Interaction between the 3D toggle and the background layer is decoupled via `CustomEvent` (`toggle-matrix-background`).
*   **Performance Gating**: Use of `MutationObserver` and visibility checks to pause heavy animation loops.
*   **Theme Synchronization**: Visual effects listen for `data-theme` attribute changes and `prefers-color-scheme` to swap palettes (e.g., dark mode layered colors vs. light mode teal tones).
*   **Resource Management**: Strict disposal of Three.js geometries and materials on unmount to prevent memory leaks.
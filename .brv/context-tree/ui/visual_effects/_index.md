---
children_hash: 6ba281a8c3bbc483e5afc83c87822e13cdc8424be8a196a27e4c35119b2caef6
compression_ratio: 0.17429094236047576
condensation_order: 1
covers: [context.md, dodecahedron_toggle.md, glassy_navigation_layout.md, matrix_background.md, matrix_background_post_card_styles.md, matrix_background_toggle.md, scroll_feedback_system.md]
covers_token_total: 4372
summary_level: d1
token_count: 762
type: summary
---
The **visual_effects** domain defines a suite of interactive, theme-aware components and layout patterns designed to enhance the site's aesthetic and user feedback. The system centers on a high-performance Matrix background, a 3D interactive toggle, and a custom scroll feedback architecture.

### 1. Matrix Background System
The core visual effect is a multi-layered, responsive animation that renders a "Kodama-style" character rain.
*   **Core Component**: `MatrixBackground.tsx` manages a full-screen canvas with five depth layers. It features responsive stream counts (60 mobile, 180 tablet, 220 desktop) and a curated list of 44 "gem words" that flicker and flash via per-character timers.
*   **Interactivity**: Supports mouse-driven shockwaves and vortex pulls within a 200px radius.
*   **Performance & Gating**: The system defaults to hidden (`showBackground=false`). The `draw()` loop short-circuits when the `matrix-bg-visible` class is absent from the body to conserve CPU/GPU resources.
*   **Card Integration**: `matrix_background_post_card_styles.md` documents scoped overrides for `.post-card`. These apply `backdrop-filter: blur(10px)` and saturation boosts only when the matrix is active and the theme is **not** light, preserving readability in light mode.

### 2. Interactive Controls & Persistence
*   **Dodecahedron Toggle**: `Dodecahedron.tsx` is a Three.js-based 3D button fixed at the bottom-right. It dispatches `toggle-matrix-background` events and features smooth speed easing and geometry scaling (115%) on hover.
*   **State Management**: `Base.astro` listens for toggle events, updating the `matrix-bg-visible` body class and persisting the state in `localStorage` under `matrix-background-visible`.
*   **Auto-Hide Logic**: On non-homepage views, the Dodecahedron uses an `autoHideOnScroll` prop to fade out after two seconds of scroll inactivity.

### 3. Navigation & Layout Effects
*   **Glassy UI**: `glassy_navigation_layout.md` describes the application of `backdrop-filter: blur(12px) saturate(180%)` to the `Navbar.astro` and `Footer.astro`. It utilizes centralized theme tokens (`--glass-bg`, `--overlay-bg`) in `tokens.css`.
*   **Mobile Drawer**: Features a 280px wide slide-out panel with staggered link reveal delays (0.05s to 0.2s) driven by `data-visible` attributes.

### 4. Scroll Feedback Architecture
*   **Scroll Indicator**: `ScrollIndicator.astro` renders a 3px green progress bar anchored 48px from the top (beneath the Navbar) or within blog headers.
*   **Container Structure**: The layout uses a `.page-container` flex frame wrapping a scrollable `.content` area. This ensures the browser scrollbar remains at the viewport edge while native scrollbars are suppressed via CSS (`scrollbar-width: none`).

### Key Entry References
*   **Matrix Core**: `matrix_background.md`, `context.md`
*   **Interaction**: `dodecahedron_toggle.md`, `matrix_background_toggle.md`
*   **Layout & Feedback**: `glassy_navigation_layout.md`, `scroll_feedback_system.md`, `matrix_background_post_card_styles.md`
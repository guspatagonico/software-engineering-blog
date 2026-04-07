---
children_hash: d7e2cedd0203a1a38b503d1543ec6430110c9360141105da6c133ed39b4db001
compression_ratio: 0.7150537634408602
condensation_order: 2
covers: [context.md, visual_effects/_index.md]
covers_token_total: 1116
summary_level: d2
token_count: 798
type: summary
---
### Domain: ui
- **Purpose & Scope**: Records immersive interface visuals (canvas/WebGL backgrounds, particle simulations, custom responsive UI) while excluding content copy, data models, and backend logic; owned by Design Systems & Frontend.
- **Usage**: Source for implementation, tuning, and optimization notes on animated UI layers.

### Topic: visual_effects
- **Context Hub** (`visual_effects/context.md`): Centralizes knowledge on MatrixBackground (layered digital rain, gem-word highlights, pointer-aware forces) plus performance safeguards and theme handling, anchoring the downstream visual components.

#### Matrix Background (`matrix_background.md`)
- **Architecture**: Five canvas depth layers with responsive stream counts (60–220), controlled speed/alpha/column coverage; 44 gem words with independent timers; character updates governed by `CHAR_CHANGE_RATE=0.3`.
- **Interactions & Dependencies**: Theme detection via DOM/storage/prefers-color-scheme, mouse-driven shockwave/vortex within 200 px, responsive listeners for resize/mouse/theme; gem timers pause during gem-word focus; renders via `requestAnimationFrame` with cleanup of listeners and timers.

#### Matrix Background Toggle (`matrix_background_toggle.md`)
- **Flow & Persistence**: `Base.astro` wraps `#matrix-bg-wrapper`, listens for `toggle-matrix-background`, toggles `matrix-bg-visible` class and localStorage key; MatrixBackground halts drawing when hidden. Default state hidden, user preference persisted.

#### Dodecahedron Toggle (`dodecahedron_toggle.md`)
- **Structure & Lighting**: Fixed 128 px Three.js button with dodecahedron/wireframe/glow meshes plus ambient/directional/fill/rim/point lights; theme-aware materials, hover/touch animations (rotation, scale, glow), `toggle-matrix-background` dispatches.
- **Dependencies & Constraints**: Responds to theme-change and resize events; caps devicePixelRatio at 3; uses antialiasing, ACESFilmicToneMapping, PCFShadowMap, exposure 1.0; disposes renderer/geometry/material on unmount; pointer hover pauses rotation/scale while touch taps only toggle visibility.

#### Glassy Navigation Layout (`glassy_navigation_layout.md`)
- **Structure**: `Navbar.astro`/`Footer.astro` use backdrop-filter blur/saturate glass surfaces driven by `--glass-bg`, `--glass-bg-mobile`, `--overlay-bg` tokens; mobile drawer overlay reveals links with staggered delays and ARIA/data attributes governing visibility.
- **Dependencies & Rules**: Shared glass tokens in `tokens.css`, mobile drawer toggles synchronized with data-visible attribute plus `nav-open` body class; glass styling must use shared tokens consistently across themes.

#### Scroll Feedback System (`scroll_feedback_system.md`)
- **Architecture**: `.page-container` flex wrapper with scrollable `.content` keeps viewport scroll anchored; global scrollbar hiding, Navbar/headers host `ScrollIndicator.astro` progress bar (3 px green) beneath.
- **Components & Flow**: Scroll events adjust indicator width and trigger Dodecahedron auto-hide timer (`autoHideOnScroll=false` default, hides after 2 s on non-home pages); layout updates span Base and BlogPost layouts plus CSS tweaks to maintain scroll behavior.
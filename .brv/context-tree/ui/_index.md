---
children_hash: 78db1fc6ae83b231116348bf6f85d18efd7ea7104873b74df0f48d942d76a3f0
compression_ratio: 0.6245772266065389
condensation_order: 2
covers: [blog_post_layout/_index.md, context.md, visual_effects/_index.md]
covers_token_total: 1774
summary_level: d2
token_count: 1108
type: summary
---
### Domain Overview: `ui`
- **Purpose & Scope (`context.md`)**: Captures immersive interface visuals/animated backgrounds used across the site; focuses on Canvas/WebGL effects, layered digital rain, particle systems, and pointer/theme‑responsive components. Excludes content copy, data models, backend logic. Owned by Design Systems & Frontend, aimed at documenting implementation/tuning/optimization.

---

### Topic: `blog_post_layout`
- **Layout Structure (`context.md`)**: `BlogPost.astro` composes Navbar → ScrollIndicator → hero header → slot content → Footer, with a responsive meta footer overlay positioned differently on desktop (vertical stack) versus mobile (horizontal row). Hash‑navigation script syncs SectionNav panels, emits `section-activated`, and smooth-scrolls under 1024 px.
- **Meta Footer & Tags (`blog_post_meta_footer_and_tags.md`)**:
  - Footer positioning: fixed 70 px above viewport on desktop/tablet (max 280 px width, z-index 35); at 53 px (mobile) / 47 px (small mobile) above Footer while keeping content scrollable.
  - Tags: uppercase teal chips (9px, 700 weight, padded borders) that shrink/res-wrap on small screens.
  - Hash nav rules: clears `.active` panels, reactivates `panel-<hash>`, smooth-scrolls on narrow viewports, and dispatches `section-activated` events before/after Astro page load.
- **Content Styling (`post_content_styles.md` & `_index.md`)**:
  - Shared utilities in `src/styles/post-content.css`: `.content` wrapper, responsive grids (`.post-grid`, `.card-stack`), accent/muted table helpers (coloring second/third columns), panel/callout blocks with teal accents, `.data-block` metadata frames, and 175 px vocabulary term columns with amber text.
  - Styling flow: wrapper → grids → tables → accent helpers → panels/callouts → data blocks → utility text states → vocabulary grid. Relies on theme tokens (`--teal`, `--border`, `--surface`, etc.) and accent table variables.

---

### Topic: `visual_effects`
- **Domain Context (`visual_effects/_index.md` + `context.md`)**: Serves as the hub for animated UI elements, especially MatrixBackground and related toggles/components; documents layered rain, gem-word highlights, mouse interactions, and performance tuning for Canvas/WebGL effects. Emphasizes shared tokens, listeners, and cleanup responsibilities.
- **Components & Relationships**:
  - **Matrix Background (`matrix_background.md`)**: Five-layer canvas managing speed/size/alpha/columns with responsive stream counts (60/180/220), 44 flickering gem words (pause gem timers while others change at CHAR_CHANGE_RATE=0.3), theme detection (attributes/storage/events), mouse shockwave/vortex within 200 px, and ensured cleanup via requestAnimationFrame loops and listeners.
  - **Matrix Background Toggle (`matrix_background_toggle.md`)**: `Base.astro` wraps `#matrix-bg-wrapper`, watches `toggle-matrix-background` events, toggles `matrix-bg-visible` class/localStorage, and short-circuits MatrixBackground draw loop when hidden. Default state hidden; visibility persists via `matrix-background-visible`.
  - **Dodecahedron Toggle (`dodecahedron_toggle.md`)**: Fixed 128 px button (z-index 40) housing Three.js meshes (dodecahedron, wireframe, glow) with ambient/directional/fill/rim/point lights; theme-aware materials, hover/touch animations (rotation/scale/glow), toggles matrix background via `toggle-matrix-background`, listens to theme changes, resizes, and disposes WebGL resources (caps devicePixelRatio at 3, uses ACESFilmicToneMapping, PCFShadowMap, exposure 1.0). Hover pauses animations on pointers; touches only toggle visibility.
  - **Glassy Navigation Layout (`glassy_navigation_layout.md`)**: `Navbar.astro` and `Footer.astro` employ backdrop-filter blur/saturate glass surfaces driven by tokens (`--glass-bg`, `--glass-bg-mobile`, `--overlay-bg`); mobile drawer uses JS toggles to animate overlay/drawer linked to `data-visible` attributes and `nav-open` body class with staggered reveal delays. Glass surfaces must use shared tokens across themes.
  - **Scroll Feedback System (`scroll_feedback_system.md`)**: Layout wraps content with `.page-container` flex + scrollable `.content`, hides native scrollbars, and places ScrollIndicator (3 px green bar) under Navbar/headers; scroll events update indicator width and trigger Dodecahedron auto-hide (enabled on non-home pages with 2 s timeout). Layout adjustments relate to Base and BlogPost updates.
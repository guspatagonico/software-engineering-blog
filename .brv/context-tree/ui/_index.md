---
children_hash: cbb008e0a9c3eb631588c88275fb030d0253fc59342b58622f3812e8d527d6e7
compression_ratio: 0.7307692307692307
condensation_order: 2
covers: [blog_post_layout/_index.md, context.md, visual_effects/_index.md]
covers_token_total: 1612
summary_level: d2
token_count: 1178
type: summary
---
# ui Domain Structure (Level d2)

- **Purpose & Scope (`context.md`)**  
  - Captures immersive interface visuals (canvas/WebGL backgrounds, layered rain, particle sims) and interactive components reacting to pointer/theme inputs; excludes content copy, data models, backend logic.  
  - Owned by Design Systems & Frontend; used for documenting implementation, tuning, optimization of animated UI elements.

## blog_post_layout Topic Overview
- **`blog_post_meta_footer_and_tags.md`**  
  - Layout chain: Navbar → ScrollIndicator → sticky hero header → slot → fixed meta footer → Footer, with hash-navigation script synchronizing SectionNav and enforcing layout rules.  
  - Meta footer variants: Desktop/tablet – 70px bottom offset, 280px max-width, flush edges; mobile (<767px) – full-width row 53px above Footer with z-index 45; small mobile (<480px) – offset reduces to 47px via tighter padding.  
  - Tag chips: uppercase teal, 9px/700 weight, 3×8px padding, teal border, responsive padding shrink; mobile chips remain flex-wrap friendly.  
  - Hash navigation script: on `DOMContentLoaded`/`astro:page-load`, clears `.active`, applies to hash targets, smooth-scrolls below 1024px, emits `section-activated` events; enforces layout rules alongside fixed footer/tag behavior.

- **`context.md` (blog_post_layout)**  
  - Synthesizes fixed meta footer patterns, teal responsive tags, and hash-navigation helper; highlights dependencies on Navbar, ScrollIndicator, SectionNav, Footer, and the hash script’s role in coordination.  
  - Relates to `ui/visual_effects/scroll_feedback_system.md` for downstream navigation feedback integration.

## visual_effects Topic Set
- **`context.md` (visual_effects domain entry)**  
  - Defines MatrixBackground’s layered rain, gem-word highlights, pointer and theme forces, and performance tuning; serves as hub for related visual components.

- **Component Breakdown**
  - **Matrix Background (`matrix_background.md`)**  
    - Five canvas layers manage speed/size/alpha/column coverage with responsive stream counts (60/180/220) and 44 gem words; gem char updates pause while regular chars update at `CHAR_CHANGE_RATE=0.3`.  
    - Interactions: theme detection via DOM attribute/storage/prefers-color-scheme, mouse-driven shockwaves/vortices within 200px, responsive listeners; renders via `requestAnimationFrame`, cleans listeners, preserves gem timer state.

  - **Matrix Background Toggle (`matrix_background_toggle.md`)**  
    - `Base.astro` hosts `#matrix-bg-wrapper`, initializes matrix visibility state, listens for `toggle-matrix-background`, toggles `matrix-bg-visible` class/localStorage, and MatrixBackground stops rendering when hidden.  
    - Defaults to hidden with persistence via `matrix-background-visible` key.

  - **Dodecahedron Toggle (`dodecahedron_toggle.md`)**  
    - Fixed 128px Three.js button (z-index 40) with dodecahedron/wireframe/glow meshes; uses ambient/directional/fill/rim/point lights, theme-aware materials, pointer hover/touch animations for rotation/scale/glow.  
    - Reacts to theme-change/resizes, dispatches `toggle-matrix-background`, caps `devicePixelRatio` at 3, disposes renderer/geometry/material on unmount, enforces ACESFilmicToneMapping, `PCFShadowMap`, exposure 1.0.  
    - Hover pauses animations on pointer devices; touch toggles only; click emits toggle event; placement ensures consistent overlay.

  - **Glassy Navigation Layout (`glassy_navigation_layout.md`)**  
    - Navbar/Footer use backdrop-filter blur/saturate glass surfaces controlled by tokens (`--glass-bg`, `--glass-bg-mobile`, `--overlay-bg`); mobile drawer overlays with staggered link reveal delays, aria/data attributes controlling visibility.  
    - JS toggles manage drawer vis states via `data-visible` and `nav-open` body class; shared tokens used by both themes; visibility tightly tied to data attributes/class.

  - **Scroll Feedback System (`scroll_feedback_system.md`)**  
    - Layout: `.page-container` flex wrapper + scrollable `.content` keeps page scroll at viewport edge while Navbar and headers host `ScrollIndicator`; native scrollbars hidden globally.  
    - Components: `ScrollIndicator.astro` renders 3px green progress bars under Navbar/headers; Dodecahedron gets `autoHideOnScroll` prop (false default) to hide after 2s inactivity on non-home pages.  
    - Flow: Scroll events update indicator width and trigger Dodecahedron visibility timer; changes include Base/BlogPost layout tweaks and CSS adjustments for scroll behavior.

Readers seeking implementation detail should drill into each entry (`blog_post_meta_footer_and_tags.md`, `visual_effects/*`) while understanding these structural relationships and rules.
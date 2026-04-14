---
children_hash: 5fc0f1a673221b851dc0ea75f3740bd50e20cb93dbfd8500fb34b73b5b78a989
compression_ratio: 0.5192483959670028
condensation_order: 2
covers: [blog_post_layout/_index.md, context.md, harness_engineering/_index.md, visual_effects/_index.md]
covers_token_total: 2182
summary_level: d2
token_count: 1133
type: summary
---
# ui domain overview
- **Purpose & Ownership**: Captures immersive visuals/animated UI (canvas, WebGL rain, pointer-aware components) curated by Design Systems & Frontend for documenting implementation/tuning of animated experiences (`context.md`).

## blog_post_layout topic (see `blog_post_layout/_index.md`)
- **Layout flow**: `context.md` and `Blog Post Layout` describe `BlogPost.astro` layering—Navbar → ScrollIndicator → hero → main slot → post-meta footer overlay → Footer, with hash-navigation syncing SectionNav panels.
- **Meta footer** (`blog_post_meta_footer_and_tags.md`): Fixed 70 px above viewport on desktop/tablet with max 280 px width; shifts to full-width tag rows before the Footer on mobile breakpoints; tags rendered as teal chips (uppercase, 9 px font, padded) that shrink/respect wrapping.
- **Hash navigation rules**: Inline script resets `.active`, assigns `panel-<hash>`, smooth-scrolls under 1024 px, and dispatches `section-activated` events to keep SectionNav aligned.
- **Content styling** (`post_content_styles.md` + `_index`): `src/styles/post-content.css` defines `.content`, grids (`.post-grid`, `.card-stack`), tables, accent/muted helpers, panels/callouts, `.data-block`, utility text states, and vocabulary grid (175 px term column, amber text) built atop theme tokens (`--teal`, `--border`, `--surface`).

## harness_engineering topic (see `harness_engineering/_index.md`)
- **Page structure**: Multi-tab Harness Engineering page (`harness_engineering_page.md`) covers mental models, subagents, context, orchestration, tools, checklist, vocabulary, tying convergence metaphors and Lyapunov/barrier cues to agent/orchestrator responsibilities.
- **Animation & accessibility**: ConvergentEnvelope animation parameters (X0=28, X1=592, Yc=130, A=82, λ=2.8, ω=5π, N=400) expose wobble variables; respects `prefers-reduced-motion`, persists mode via `STORAGE_KEY`, forbids toggling during crossfade per Rule 1.
- **Orchestration governance**: Workflow moves from mental-model narrative → sub-agent contracts/budgets → context/session-state handoffs → fork-join orchestration with stage tokens/drift signals → tool matrices/checklists → vocabulary/styling; enforces context budget limit (~5800 tokens).
- **Rules & drift handling**: Forks must avoid conflicting writes, validate independently, wait for orchestrator readiness; drift reactions include scope interrupts, schema reruns, and splitting focus after >2 auto-corrections, with explicit checklists ensuring budgets/contracts/handoffs remain bounded (Rules 2–3).

## visual_effects domain (`visual_effects/_index.md`)
- **Matrix Background core** (`matrix_background.md`/`context.md`): Layered canvas with five-depth speed/size/alpha controls, responsive stream counts (60/180/220), 44 gem words flickering via per-character timers; theme detection (DOM attribute, storage, prefers-color-scheme), mouse shockwaves/vortex within 200 px radius, gem word update pauses; rendering uses `requestAnimationFrame` with cleanup/listener teardown.
- **Matrix toggle** (`matrix_background_toggle.md`): `Base.astro` hosts `#matrix-bg-wrapper`, initializes state, listens for `toggle-matrix-background`, toggles `matrix-bg-visible` class/localStorage, and MatrixBackground stops drawing when hidden; default hidden (`showBackground=false`) with persistence.
- **Dodecahedron toggle** (`dodecahedron_toggle.md`): Fixed 128 px button (z-index 40) with Three.js meshes and thematic lighting; listens for theme changes/resizes, dispatches `toggle-matrix-background`, caps DPR at 3, uses ACESFilmic tone mapping + PCF shadows; hover pauses rotation/scale on pointer devices, touch taps only toggle visibility, clicks emit toggle event; disposes renderer/geometry/material on unmount.
- **Glassy navigation layout** (`glassy_navigation_layout.md`): `Navbar.astro`/`Footer.astro` adopt blur/saturate glass panels driven by tokens (`--glass-bg`, `--glass-bg-mobile`, `--overlay-bg`); mobile drawer uses hero toggles (aria/data attributes, `nav-open` body class) for overlay/drawer animations; glass surfaces must reuse shared tokens across themes.
- **Scroll feedback system** (`scroll_feedback_system.md`): `.page-container` flexes with scrollable `.content`, Navbar/headers host `ScrollIndicator.astro` (3 px green bar); Dodecahedron uses `autoHideOnScroll` prop (default false) to hide after 2 s of activity on non-home pages; scroll events update indicator width and trigger Dodecahedron timer; layout + CSS adjustments keep viewport scroll behavior stable.
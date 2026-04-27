---
children_hash: 8491e934d958930bd69f16a42bc5a1cc86c6cd9547dd2ba06c76e966c604edfe
compression_ratio: 0.3453441295546559
condensation_order: 2
covers: [blog_post_layout/_index.md, context.md, interactive-panel-section-synchronization-pattern.md, persistence-driven-visual-consistency.md, visual_effects/_index.md]
covers_token_total: 2470
summary_level: d2
token_count: 853
type: summary
---
# Structural Summary: UI and Visual Architecture (Level D2)

The UI architecture is a high-fidelity, interactive system that bridges static Astro layouts with dynamic React/Three.js components. It is governed by a centralized persistence layer and an event-driven synchronization pattern to maintain visual consistency across immersive effects and structured blog content.

### Core Architectural Patterns
*   **Panel-Section Synchronization**: A mandated architecture for interactive layouts. It uses strict `panel-{id}` naming conventions and `panel active` CSS transitions, synchronized via hash-change listeners and `section-activated` CustomEvents to manage state in Astro's static-first environment. (Reference: `interactive-panel-section-synchronization-pattern.md`)
*   **Persistence-Driven Consistency**: A centralized layer in `src/utils/storage.ts` (using the `gsalvini-se-blog` localStorage key) serves as the single source of truth for visual toggles (Matrix, themes) and checklist states, ensuring SSR-safe synchronization between the base layout and interactive islands. (Reference: `persistence-driven-visual-consistency.md`)

### Blog Layout and Content Architecture
The system employs a multi-layered structure defined in `src/layouts/BlogPost.astro` that adapts dynamically to viewports. (Reference: `blog_post_layout/_index.md`)
*   **Responsive Navigation**: Features a sticky header at `top: 48px` and a 272px metadata rail for desktop (>= 1024px). Mobile views utilize a client-side `moveTagsInline()` script to migrate metadata into the main content flow.
*   **Standardized Content Toolkit**: `src/styles/post-content.css` provides specialized blocks including **Vocabulary Grids** (175px term column), **Data Blocks** (framed key/value rows), and table accent helpers.
*   **Agentic Control Interface**: A specialized subset for technical evidence featuring an SVG-based **Drift Map** that uses `data-score` attributes to drive filtering logic via threshold sliders.

### Visual Effects and Immersive Systems
The visual layer emphasizes performance through visibility gating and resource cleanup, centered on a responsive Matrix-style background and 3D controls. (Reference: `visual_effects/_index.md`)
*   **Matrix Background System**: A five-layer "Kodama-style" canvas rendering responsive stream counts (60-220) and 44 curated "gem words." It integrates with blog cards via `backdrop-filter` and short-circuits its draw loop when hidden to eliminate overhead.
*   **Interactive 3D Control**: The **Dodecahedron Toggle** (`src/components/Dodecahedron/Dodecahedron.tsx`) acts as the primary controller, dispatching `toggle-matrix-background` events. It features theme-synced materials and an `autoHideOnScroll` logic for non-homepage views.
*   **Glassy Surfaces**: Implements high-saturation blurs (`blur(12px) saturate(180%)`) across the `Navbar` and `Footer` using theme-aware tokens (`--glass-bg`, `--overlay-bg`).

### Constraints and Performance Rules
*   **Scroll Management**: Global suppression of native scrollbars (`scrollbar-width: none`) in favor of a 3px green progress indicator anchored 48px from the top.
*   **Z-Index Hierarchy**: Sticky Headers (40) < Meta Footer (45) < Global Footer (50).
*   **Resource Management**: Strict disposal of Three.js geometries and materials on unmount; heavy animation loops are paused via `MutationObserver` and visibility checks.
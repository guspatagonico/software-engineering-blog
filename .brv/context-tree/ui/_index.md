---
children_hash: 82764498a04a32b11834d93f20f2ea4a1f1c9fa08aa10aec04616664630ca0f0
compression_ratio: 0.42119419042495965
condensation_order: 2
covers: [blog_post_layout/_index.md, context.md, visual_effects/_index.md]
covers_token_total: 1859
summary_level: d2
token_count: 783
type: summary
---
# UI and Visual Experience Architecture

The `ui` domain governs the immersive, interactive, and structural frontend components of the site, focusing on responsive blog layouts and high-performance visual effects.

### Blog Post Layout and Component System
The layout architecture provides a consistent reading experience through responsive structural components and shared utility styles.

*   **Core Layout (BlogPost.astro)**: Implements a layered structure with a sticky header (`z-index: 40`), a scrollable `.content` wrapper, and a fixed metadata footer (`z-index: 45`). It enforces strict mobile scroll behavior (`overscroll-behavior: none`) to prevent bounce effects.
*   **Responsive Metadata Footer**: Adapts positioning based on breakpoints, shifting from a right-aligned desktop block to a full-width mobile row positioned above the global footer.
*   **Content Utilities**: Defined in `src/styles/post-content.css`, these include:
    *   **Table & Data Helpers**: Accent and muted column highlighting (`.table-accent-2/3`) and framed metadata cards.
    *   **Vocabulary Grids**: A specialized two-column layout for glossaries (175px labels).
    *   **Tag Chips**: Responsive teal chips with mobile-optimized padding.
*   **Navigation Sync**: A hash-navigation script synchronizes the `SectionNav` component, managing `.active` class toggling and dispatching `section-activated` events for UI state consistency.
*   **Entry Reference**: See **blog_post_layout/_index.md**, **blog_post_meta_footer_and_tags.md**, and **blogpost_layout_architecture.md**.

### Visual Effects and Interactive Backgrounds
The visual system utilizes Canvas, WebGL, and Three.js to provide theme-aware feedback and aesthetic depth.

*   **Matrix Background (MatrixBackground.tsx)**: A five-layer "Kodama-style" character rain. It features responsive stream density (60 to 220 streams) and "gem word" flickering. Performance is optimized by short-circuiting the draw loop when the `matrix-bg-visible` class is absent.
*   **Dodecahedron Toggle (Dodecahedron.tsx)**: A Three.js 3D interactive button that dispatches `toggle-matrix-background` events. It includes hover-based geometry scaling and persists state via `localStorage`.
*   **Glassy UI Patterns**: Centralized in `tokens.css`, applying `backdrop-filter` (blur/saturate) to navigation and footer elements. Post cards receive specific saturation boosts only when the matrix background is active in dark mode.
*   **Scroll Feedback**: A custom architecture featuring a 3px progress bar (`ScrollIndicator.astro`) and a `.page-container` flex frame that suppresses native scrollbars while maintaining viewport-edge scroll tracking.
*   **Entry Reference**: See **visual_effects/_index.md**, **matrix_background.md**, and **scroll_feedback_system.md**.

### Key Relationships
*   **Layout & Effects**: Layout components integrate with the scroll feedback system and matrix-aware card styles for cohesive theme transitions.
*   **State & Persistence**: Global state for visual toggles is managed in `Base.astro` and persisted across sessions, influencing component hydration and visibility.
---
children_hash: 40067b9a8733f18c0170a17d72f7499d64fca809b3463a4564b4de3445ea98ec
compression_ratio: 0.23838630806845965
condensation_order: 1
covers: [blog_post_meta_footer_and_tags.md, blogpost_layout_architecture.md, context.md, post_content_styles.md, post_content_styles/_index.md]
covers_token_total: 3272
summary_level: d1
token_count: 780
type: summary
---
# Blog Post Layout and Content Architecture

The blog post system utilizes a standardized Astro layout and a shared CSS utility framework to ensure consistent navigation, metadata display, and content styling across all engineering posts.

## Core Layout Architecture
The `src/layouts/BlogPost.astro` component serves as the primary shell, integrating global navigation with post-specific interactive elements.
*   **Structural Layers**: Stitches together the `Navbar`, `ScrollIndicator`, a sticky `post-header` (top: 48px, z-index 40), and the main content slot.
*   **Scroll Management**: The `.post-layout` container hides scrollbars via `webkit-scrollbar: none` and implements `overscroll-behavior: none` on mobile to prevent bounce.
*   **Navigation Sync**: An inline hash-navigation script runs before and after page load to synchronize `SectionNav`. It toggles `.active` classes on panels, dispatches `section-activated` events, and manages smooth-scrolling for viewports under 1024px.
*   **Mobile Hydration**: Early-execution scripts detect mobile states (width ≤ 767px) to set `document.documentElement.dataset.sectionsCollapsed`.

## Post Meta Footer and Tagging
A specialized fixed overlay surfaces metadata without obstructing the primary reading flow.
*   **Positioning Logic**: 
    *   **Desktop/Tablet**: Fixed 70px from bottom, right-aligned (max-width 280px), sitting flush against the global Footer.
    *   **Mobile (<767px)**: Transitions to a full-width row 53px above the footer.
    *   **Small Mobile (<480px)**: Offset reduces to 47px to match narrowed footer padding.
*   **Tag System**: Renders uppercase teal chips using specific theme tokens (`rgba(0,212,170,0.15)` background). Padding scales from 3px×8px on desktop to 2px×6px on mobile.

## Content Styling Framework (`post-content.css`)
Reusable CSS scaffolding provides a consistent visual language for technical documentation.
*   **Layout Helpers**: Includes `.content` responsive wrappers, `.post-grid` for multi-column layouts, and `.card-stack` for vertical normalization.
*   **Data Display**:
    *   **Enhanced Tables**: Supports column-specific highlighting via `.table-accent-2/3` and `.table-muted-2/3`, driven by CSS variables like `--table-accent-color`.
    *   **Panels & Callouts**: `.post-panel` and `.post-panel-lg` provide padded containers for diagrams, while `.post-callout` uses left-border accents for emphasis.
    *   **Data Blocks**: The `.data-block` utility creates structured key-value cards with 16px padding and 4px border-radius.
    *   **Vocabulary Grids**: `.vocab-item` enforces a two-column grid (175px amber term column + 1fr description) for glossaries.
*   **Utility Classes**: Standardized inline cues for technical text, including `.teal`, `.tick`, `.cross`, `.cm` (comments), and `.kw` (keywords).

## Key References
*   **Layout & Navigation**: `blogpost_layout_architecture.md`, `blog_post_meta_footer_and_tags.md`
*   **Styling Utilities**: `post_content_styles.md`, `post_content_styles/_index.md`
*   **Component Relationships**: `ui/visual_effects/scroll_feedback_system.md` (Related)
---
children_hash: 98b450f2a6a3725325cc36312c797dcf699b8d0f24d3dd77ca031e69003eb813
compression_ratio: 0.21325811001410439
condensation_order: 1
covers: [blog_post_meta_footer_and_tags.md, blogpost_layout_architecture.md, context.md, post_content_styles.md, post_list_and_card_styles.md, post_list_styles/_index.md]
covers_token_total: 3545
summary_level: d1
token_count: 756
type: summary
---
# Blog Post Layout and Component Architecture

The blog post layout system integrates responsive structural components, shared content styling utilities, and interactive navigation scripts to provide a consistent long-form reading experience.

### Core Layout Structure
*   **BlogPost.astro**: The primary layout component that layers a sticky header (`z-index: 40`), a scrollable `.content` wrapper, and a fixed metadata footer (`z-index: 45`). It enforces `scrollbar-width: none` and `overscroll-behavior: none` on mobile to prevent bounce effects.
*   **Post Meta Footer**: A fixed overlay for publication dates and tags. It uses a responsive positioning system:
    *   **Desktop/Tablet**: Fixed 70px from bottom, right-aligned (max-width 280px).
    *   **Mobile (<767px)**: Full-width row positioned 53px above the global footer.
    *   **Small Mobile (<480px)**: Offset reduced to 47px to match footer padding.
*   **Entry Reference**: See **blog_post_meta_footer_and_tags.md** and **blogpost_layout_architecture.md** for breakpoint logic and z-index hierarchies.

### Content and Component Styling
*   **Shared Post Styles**: Defined in `src/styles/post-content.css`, providing reusable layout patterns for long-form content:
    *   **Table Helpers**: `.table-accent-2/3` and `.table-muted-2/3` for column highlighting, with convenience classes like `.table-accent-teal`.
    *   **Data Blocks**: Framed key/value metadata cards with 16px padding and 1px borders.
    *   **Vocabulary Grids**: A two-column layout (175px label + 1fr description) for glossaries.
    *   **Tag Chips**: Uppercase teal chips (`9px` font) that shrink padding on mobile while maintaining flexible wrapping.
*   **Post List Grid**: A responsive homepage grid using `minmax(260px, 1fr)` with frosted-glass cards (`backdrop-filter`) and a custom `postCardReveal` animation.
*   **Entry Reference**: See **post_content_styles.md** and **post_list_and_card_styles.md** for utility class definitions and grid specifications.

### Navigation and Interactivity
*   **Hash Navigation Script**: An inline script executing on `DOMContentLoaded` and `astro:page-load`. It synchronizes the `SectionNav` component by:
    1.  Toggling `.active` classes on target panels.
    2.  Implementing a scroll priority sequence (target `.content` -> `.post-layout` -> `window`).
    3.  Dispatching a `section-activated` CustomEvent to keep UI components in sync.
*   **Mobile Hydration**: Early inline scripts detect viewport width to set `document.documentElement.dataset.sectionsCollapsed` for mobile-optimized hydration.
*   **Entry Reference**: See **blogpost_layout_architecture.md** for event dispatching and scroll priority details.

### Key Relationships
*   **Visual Effects**: Layout components integrate with the `scroll_feedback_system.md` and `matrix_background_post_card_styles.md` for theme-aware depth and animations.
*   **Navigation**: The layout relies on `SectionNav` for table-of-contents synchronization via the hash-navigation flow.
---
children_hash: 8905645c7fccb9632d2dfa77f9d5e9f035725402216a646921296c0d8c34f3c2
compression_ratio: 0.22092206880411888
condensation_order: 1
covers: [blog_post_meta_footer_and_tags.md, blogpost_layout_architecture.md, context.md, harness_agentic_control/_index.md, metadata_rail_implementation.md, post_content_styles.md, post_list_styles/_index.md]
covers_token_total: 4273
summary_level: d1
token_count: 944
type: summary
---
# Structural Summary: Blog Post Layout and UI Architecture

The blog post layout architecture is a multi-layered system integrating sticky navigation, responsive metadata rails, and specialized content styling. It relies on a combination of Astro components, centralized CSS utilities, and inline client-side scripts to manage state and responsiveness.

### Layout and Navigation Architecture
The core structure is defined in `src/layouts/BlogPost.astro`, which coordinates the following elements:
*   **Sticky Header and Scroll Indicators**: A `post-header` is fixed at `top: 48px` (z-index 40). A `ScrollIndicator` provides visual feedback during content consumption.
*   **Metadata Rail and Footer**: 
    *   **Desktop (>= 1024px)**: A 272px wide sticky metadata rail (`<aside>`) displays the date (YYYY-MM-DD), Post ID (JetBrains Mono), and tags.
    *   **Mobile/Tablet (< 1024px)**: The rail is hidden. A client-side script (`moveTagsInline()`) migrates tags into the main content area.
    *   **Post Meta Footer**: A fixed overlay anchored above the global footer. It transitions from a right-aligned box on desktop (70px bottom offset) to a full-width row on mobile (47px-53px offset).
*   **Hash Navigation Sync**: Inline scripts handle `astro:page-load` events to synchronize the `SectionNav` component. The `activateSection` function manages panel activation and smooth scrolling for viewports under 1024px.

### Content Styling and UI Components
Shared styles in `src/styles/post-content.css` and `src/styles/post-list.css` provide a standardized toolkit for long-form content:
*   **Typography and Grids**: The `.content` wrapper implements typography resets and responsive card stacks. Homepage and post lists use a `repeat(auto-fit, minmax(260px, 1fr))` grid.
*   **Specialized Content Blocks**:
    *   **Data Blocks**: Framed key/value rows with 16px padding and 1px borders for structured metadata.
    *   **Vocabulary Grids**: A two-column layout (175px term column + 1fr description) for glossaries.
    *   **Table Helpers**: Accent classes (`.table-accent-teal`, `.table-accent-red`) target specific columns using theme variables.
*   **Visual Effects**: Implementation of "frosted glass" via `backdrop-filter` (blur 6px-8px) and a `.post-card::after` shine effect for interactive elements.

### Harness Agentic Control Interface
A specialized UI subset for technical evidence and drift visualization:
*   **Drift Map**: An SVG-based grid in `HarnessAgenticControlExtras.astro`. It uses a `data-score` attribute to drive filtering logic, toggling `.is-muted` classes based on threshold sliders.
*   **Evidence Cards**: Interactive cards that mirror homepage styles but include specific support for `matrix-bg-visible` high-contrast states.

### Key Architectural Rules and Constraints
*   **Scroll Management**: Scrollbars are hidden on `.post-layout` using `webkit-scrollbar: none`. Mobile views use `overscroll-behavior: none` to prevent bounce.
*   **Z-Index Hierarchy**: Sticky headers (40) < Meta Footer (45) < Global Footer (50).
*   **Event Pattern**: Components must listen for the `section-activated` CustomEvent to maintain synchronization between the content and navigation rails.

**Reference Entries:**
*   `blog_post_meta_footer_and_tags.md`: Breakpoint-specific footer offsets and tag styling.
*   `blogpost_layout_architecture.md`: Sticky header logic and scrollbar suppression.
*   `metadata_rail_implementation.md`: Desktop sidebar specs and mobile tag migration.
*   `post_content_styles.md`: Vocabulary grids, data blocks, and table accent helpers.
*   `harness_agentic_control/_index.md`: Drift Map SVG logic and score-based filtering.
*   `post_list_styles/_index.md`: Responsive grid patterns and frosted glass saturation levels.
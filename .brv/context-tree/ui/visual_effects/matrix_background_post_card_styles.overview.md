# Matrix Background Post Card Styles Overview

### Key Points
* **Theme Scoping:** Matrix background visual overrides for post cards are explicitly disabled in light mode (`:not([data-theme="light"])`) to ensure text readability.
* **Visual Enhancements:** When the Matrix effect is active, post cards utilize `backdrop-filter` with a 10px blur and 120% saturation to separate content from the background animation.
* **Opacity Management:** Overrides use linear gradients with specific opacity levels (0.75 to 0.88) to balance the "Matrix" aesthetic with legibility.
* **Conditional Logic:** Styles are triggered by the presence of the `.matrix-bg-visible` class on the `body` element.

### Structure Summary
* **Reason & Raw Concept:** Outlines the primary task of refining post card visuals and lists specific CSS property changes and file locations.
* **Narrative:** 
    * **Structure:** Details the role of `src/styles/post-list.css`.
    * **Highlights:** Specifies the technical values for gradients and filters.
    * **Rules:** Establishes the logic for light mode exclusion and the use of backdrop filters.
* **Facts:** Provides formalized project definitions for the Matrix background behavior and filter specifications.

### Notable Entities, Patterns, and Decisions

#### Entities
* **`.post-card`**: The primary CSS class targeted for visual overrides.
* **`src/styles/post-list.css`**: The source file containing the implementation.
* **`matrix-bg-visible`**: The state-dependent class applied to the body to toggle the effect.

#### Patterns
* **Negative Selection Pattern**: Using `:not([data-theme="light"])` to apply styles to all themes *except* light mode, rather than white-listing dark/high-contrast themes individually.
* **Layered Visuals**: Combining `linear-gradient` with `backdrop-filter` (blur/saturate) to create a "glassmorphism" effect that maintains contrast against moving background elements.

#### Decisions
* **Readability Priority**: A conscious decision was made to keep light mode styles standard, even when the Matrix effect is active, to prevent accessibility or legibility regressions.
* **Filter Specifications**: Standardized on `blur(10px)` and `saturate(120%)` as the optimal configuration for content "pop."
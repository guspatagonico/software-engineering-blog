### Key Points
*   **Responsive Grid Layout:** Utilizes CSS Grid with `repeat(auto-fit, minmax(260px, 1fr))` to create a flexible post-card gallery.
*   **Glassmorphism Effects:** Implements frosted-glass aesthetics using `backdrop-filter` with specific blur and saturation values tailored for light and dark themes.
*   **Matrix Mode Support:** Includes specialized overrides for "Matrix background" mode, increasing blur to 10px and darkening gradients to maintain readability.
*   **Entry Animations:** Features a standardized `postCardReveal` animation with a 0.45s duration for card appearance.
*   **Mobile Optimization:** Automatically switches to a single-column layout when the viewport width is 767px or less.

### Structure / Sections Summary
*   **Reason & Raw Concept:** Identifies the primary task (defining homepage CSS) and the target file location (`src/styles/post-list.css`).
*   **Narrative:** Describes the technical implementation of the grid, the use of CSS variables for theme consistency, and the logic behind the reveal animations.
*   **Rules:** Establishes constraints for developers, such as the mandatory use of `!important` for specific overrides and mobile breakpoint definitions.
*   **Examples & Facts:** Provides concrete CSS variable values for light/dark modes and technical specifications for layout behavior.

### Notable Entities, Patterns, and Decisions
*   **Entities:**
    *   `src/styles/post-list.css`: The central stylesheet for post components.
    *   `postCardReveal`: The specific CSS animation keyframe used for card entry.
*   **Design Patterns:**
    *   **Frosted-Glass (Glassmorphism):** A visual style relying on `backdrop-filter` (blur/saturate).
    *   **Theme-Specific Gradients:** Using `linear-gradient(135deg, ...)` to differentiate light and dark modes.
*   **Technical Decisions:**
    *   **Consistency Enforcement:** The decision to use `!important` on borders and colors to prevent theme leakage or inconsistency.
    *   **Readability Overrides:** Increasing blur to 10px specifically for Matrix mode to ensure text remains legible over dynamic backgrounds.
    *   **Breakpoint Selection:** 767px is defined as the threshold for mobile single-column view.
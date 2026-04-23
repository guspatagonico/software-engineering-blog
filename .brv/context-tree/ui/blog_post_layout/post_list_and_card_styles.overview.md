### Key Points
* **Responsive Grid Layout**: Implements a CSS Grid for the homepage post list with a minimum column width of 260px.
* **Card Geometry**: Post cards utilize a 14px border-radius and a flex-column internal layout.
* **Custom Animations**: Features a specific `postCardReveal` animation for card entry.
* **Advanced Hover Effects**: Uses a pseudo-element (`::after`) with a 120-degree linear gradient to create a sliding "shine" effect.
* **Theming**: Includes specialized light mode styling using green-to-white gradients.

### Structure / Sections Summary
* **Reason & Raw Concept**: Establishes the intent to document the homepage architecture and identifies the primary source files (`post-list.css`, `post-tags.css`).
* **Narrative**: Provides a high-level overview of the layout logic, card styling, and visual highlights like animations and hover states.
* **Facts**: Codifies specific technical constraints and design constants used in the project.

### Notable Entities, Patterns, and Decisions
*   **Entities**: 
    *   `.post-card`: The primary UI component.
    *   `.post-list`: The parent grid container.
*   **Design Decisions**:
    *   **Grid Constraint**: `minmax(260px, 1fr)` ensures responsiveness while maintaining a minimum card size.
    *   **Border Radius**: Standardized at 14px for all post cards.
*   **Technical Patterns**:
    *   **Flexbox/Grid Hybrid**: Uses CSS Grid for the outer container and Flexbox for internal card alignment.
    *   **Pseudo-element Styling**: Implementation of hover effects via `::after` to avoid interfering with core card content.
    *   **Animation Flow**: A defined sequence from grid layout initialization to reveal animations and interactive hover states.
# SectionNav Component Overview

### Key Points
* **Hash-Based State Management**: Initializes `activeId` from the URL hash, validating it against a sections array and defaulting to the first section if invalid.
* **Non-Polluting Navigation**: Updates the URL hash using `window.history.replaceState` to allow deep linking without cluttering the browser's back/forward history.
* **Responsive Logic**: Uses `matchMedia` to handle state for mobile (< 768px) and desktop (>= 1024px) views, including a `useRef` hook to ensure initialization occurs only once.
* **Dynamic DOM Manipulation**: Injects a mobile header (`.panel-mobile-header`) into the active panel and sets a global `data-sections-collapsed` attribute on the `documentElement` for CSS hooks.
* **Event Synchronization**: Integrates with external scripts via a `section-activated` CustomEvent and includes a 50ms hydration delay to ensure React components are ready before execution.

### Structure / Sections Summary
* **Reason & Raw Concept**: Defines the component's purpose for interactive blog posts and identifies the primary file location (`src/components/SectionNav/SectionNav.tsx`).
* **Narrative**: 
    * **Structure**: Outlines the React implementation using `useState`, `useEffect`, and media query listeners.
    * **Highlights**: Focuses on history management and integration with `BlogPost` inline scripts.
    * **Rules**: Lists specific implementation requirements for initialization, responsive behavior, and DOM injection.
* **Facts**: Provides technical specifications regarding ID prefixes (`panel-`), CSS classes (`button--active`), and timing logic.

### Notable Entities, Patterns, and Decisions
* **Entities**:
    * `SectionNav`: The primary React component.
    * `BlogPost`: The parent context/script that interacts with the navigation.
    * `section-activated`: The CustomEvent used for state synchronization.
* **Patterns**:
    * **Dynamic Injection**: Moving UI elements (mobile headers) into panels at runtime to prevent content duplication in the source code.
    * **Global State Hook**: Using `data-` attributes on the `html` element to bridge component state with global CSS styling.
* **Decisions**:
    * **History Management**: Choosing `replaceState` over `pushState` to maintain a clean user history during active browsing.
    * **Hydration Guard**: Implementing a 50ms delay for hash navigation to prevent race conditions during React hydration.
    * **ID Prefixing**: Standardizing content targets with a `panel-` prefix for predictable DOM selection.
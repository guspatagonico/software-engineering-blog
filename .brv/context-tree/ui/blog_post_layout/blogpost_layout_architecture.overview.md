### Key Points
* **Standardized Layout Architecture**: Utilizes a sticky header (z-index 40) and a fixed meta footer (z-index 45) within the `BlogPost.astro` component.
* **Early State Detection**: Employs inline scripts to detect mobile viewports (≤767px) and set `data-sections-collapsed` before full hydration.
* **Navigation Synchronization**: Uses a custom `section-activated` event and a hash navigation script with a 50ms delay to sync the `SectionNav` component.
* **Responsive Meta Footer**: Transitions from a right-aligned desktop position (70px from bottom) to a full-width fixed mobile bar (max-width 1399px) with a top border and shadow.
* **Scroll Management**: Hides scrollbars on `.post-layout` and implements `overscroll-behavior: none` on mobile to prevent browser bounce.

### Structure / Sections Summary
* **Reason & Raw Concept**: Defines the objective to standardize blog post navigation and layout, identifying `src/layouts/BlogPost.astro` as the primary file.
* **Narrative**: Outlines the visual hierarchy (flex-direction, z-indexing) and the logic for late-hydration hash navigation.
* **Rules**: Lists specific CSS requirements, including scrollbar visibility, mobile bounce prevention, and event dispatching protocols.
* **Facts**: Provides technical specifications regarding breakpoints (1400px, 1023px, 767px, 480px), z-index layering, and the `activateSection` scroll priority sequence.

### Notable Entities, Patterns, and Decisions

#### Entities
* **`BlogPost.astro`**: The core layout component.
* **`SectionNav`**: The component synchronized via the `section-activated` event.
* **`post-meta-footer`**: A UI element that dynamically repositions based on viewport width.

#### Patterns
* **Inline Script Hydration**: Using inline scripts for immediate mobile detection and hash resolution to avoid layout shift or sync delays.
* **Event-Driven State**: Decoupling the layout's scroll logic from the navigation UI through custom DOM events.
* **Scroll Priority Sequence**: The `activateSection` function targets containers in a specific order: `.content` → `.post-layout` → `window`.

#### Key Decisions
* **Z-Index Layering**: Established a hierarchy where the Global Footer (50) > Meta Footer (45) > Post Header (40).
* **Scrollbar Suppression**: Explicitly hiding scrollbars using `scrollbar-width: none` and `webkit-scrollbar: none` for a cleaner reading experience.
* **Mobile Alignment**: Adjusting the meta footer to `bottom: 47px` on devices under 480px to account for reduced global footer padding.
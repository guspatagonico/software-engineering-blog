# SectionNav Component Overview

### Key Points
* **Race Condition Mitigation**: Implements multiple `checkScrollPosition` calls using `requestAnimationFrame` (RAF) and `setTimeout` (100-150ms) to ensure DOM rendering and state updates (like `isCollapsed`) are complete before measurement.
* **Scroll Persistence**: Automatically saves and restores scroll positions for individual sections using local storage, keyed by `window.location.pathname` and `sectionId`.
* **Brief Section Logic**: Specifically handles short content (where `scrollHeight <= clientHeight`) by ensuring the "next" hint button remains visible even if the user hasn't scrolled.
* **Hysteresis Threshold**: Utilizes a 150px buffer for "near bottom" detection to trigger UI changes reliably.
* **State Synchronization**: Manages the flow from section activation to state updates, scroll restoration, and final position verification.

### Structure Summary
* **Reason & Raw Concept**: Outlines the primary motivation (fixing race conditions) and lists the specific file changes and execution flow.
* **Narrative**: Describes the component architecture, external dependencies (storage utils), and the specific rules governing mobile hint behavior.
* **Facts**: Provides technical specifications regarding the timing of scroll checks, the definition of "brief sections," and the storage keying strategy.

### Notable Entities, Patterns, and Decisions

#### Entities
* **`SectionNav.tsx`**: The primary React component.
* **`@/utils/storage`**: Utility used for `readStorage` and `updateStorage` operations.
* **`checkScrollPosition`**: The core logic function for determining hint visibility.

#### Patterns
* **Delayed Execution Pattern**: Combining RAF and `setTimeout` to bridge the gap between React state updates and browser layout/paint cycles.
* **Keyed Persistence**: Using a composite key (`pathname` + `sectionId`) to ensure scroll memory is context-aware.

#### Decisions
* **150px Hysteresis**: Chosen as the threshold for "near bottom" detection to provide a smoother user experience on mobile.
* **Always-on Hints for Brief Sections**: A UX decision to prevent users from getting "stuck" on short sections that don't trigger standard scroll listeners.
* **Execution Order**: Strict rule that `checkScrollPosition` must run only after the panel DOM is rendered and the scroll position has been restored.
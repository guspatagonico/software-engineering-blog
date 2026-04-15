---
title: SectionNav Component
summary: SectionNav component with hash-based state initialization, mobile collapse logic, and dynamic header injection.
tags: []
keywords: []
importance: 50
recency: 1
maturity: draft
createdAt: '2026-04-15T14:56:35.235Z'
updatedAt: '2026-04-15T14:56:35.235Z'
---
## Reason
Document SectionNav component logic and state management

## Raw Concept
**Task:**
Implement SectionNav component for interactive blog posts

**Files:**
- src/components/SectionNav/SectionNav.tsx

**Flow:**
Initialize state from hash -> listen for hash changes/events -> update active section -> scroll to content -> inject mobile header

**Timestamp:** 2026-04-15

## Narrative
### Structure
React component using useState for activeId, isCollapsed, and isMobile. Uses useEffect for media query listeners and hash change handling.

### Highlights
Uses window.history.replaceState for hash updates; integrates with BlogPost inline scripts via "section-activated" CustomEvent.

### Rules
1. Initialize activeId from URL hash if valid, otherwise default to first section.
2. Use matchMedia for responsive state initialization (mobile < 768px, desktop >= 1024px).
3. Inject mobile header dynamically into active panel to avoid content duplication.
4. Sync collapse state to documentElement data attribute for global CSS hooks.

## Facts
- **SectionNav**: SectionNav initializes the activeId state by checking window.location.hash and validating it against the provided sections array.
- **Hash Navigation**: SectionNav updates the URL hash using window.history.replaceState(null, '', `#${id}`) to prevent polluting the browser history during navigation.
- **SectionNav**: SectionNav dynamically injects a '.panel-mobile-header' div containing an icon and label into the active section's panel element.
- **SectionNav**: The component sets the 'data-sections-collapsed' attribute on document.documentElement to facilitate global CSS styling based on the navigation state.
- **SectionNav**: The component uses a useRef (hasInitialized) to ensure the initial collapse state is only set once based on the mobile media query.
- **SectionNav**: The SectionNav component applies a 'button--active' class to buttons when their corresponding section is active.
- **Hash Navigation**: Hash navigation identifies target content by appending the URL hash to the 'panel-' ID prefix.
- **Hash Navigation**: The hash navigation system dispatches a 'section-activated' CustomEvent to allow the SectionNav component to synchronize its state.
- **Hash Navigation**: Hash navigation logic includes a 50ms delay before execution to ensure React components have hydrated.

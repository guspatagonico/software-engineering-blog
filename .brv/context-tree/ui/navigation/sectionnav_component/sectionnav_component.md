---
title: SectionNav Component
summary: SectionNav with scroll position persistence, mobile hint button race condition fixes, and brief section handling.
tags: []
keywords: []
importance: 50
recency: 1
maturity: draft
createdAt: '2026-04-17T22:29:39.780Z'
updatedAt: '2026-04-17T22:29:39.780Z'
---
## Reason
Document SectionNav race conditions and scroll handling logic

## Raw Concept
**Task:**
Implement and document SectionNav with scroll persistence and mobile hint logic

**Changes:**
- Added multiple checkScrollPosition calls with RAF + setTimeout to fix race conditions
- Implemented brief section detection for always-on next hint
- Added scroll position restoration on section activation

**Files:**
- src/components/SectionNav/SectionNav.tsx

**Flow:**
activateSection -> update state -> restore scroll -> checkScrollPosition (delayed)

**Timestamp:** 2026-04-17

## Narrative
### Structure
React component managing section navigation, URL hash synchronization, and mobile-specific hint buttons.

### Dependencies
Uses readStorage/updateStorage from @/utils/storage for persistence.

### Highlights
Prevents race conditions between DOM rendering, state updates (isCollapsed), and scroll measurements using 100-150ms delays.

### Rules
Rule 1: checkScrollPosition must run AFTER panel DOM is rendered, isCollapsed is updated, and scroll is restored.
Rule 2: Brief sections (scrollHeight <= clientHeight) always show hint if not the last section.
Rule 3: Hysteresis for "near bottom" detection is set to 150px.

### Examples
checkScrollPosition logic handles both window and element-level scrolling targets.

## Facts
- **sectionnav_race_conditions**: SectionNav uses multiple checkScrollPosition calls with RAF + setTimeout delays (100-150ms) to prevent race conditions. [project]
- **sectionnav_brief_sections**: Brief sections (scrollHeight <= clientHeight) always show the next hint button on mobile unless it is the last section. [project]
- **sectionnav_scroll_persistence**: Scroll positions are persisted in local storage keyed by window.location.pathname and sectionId. [project]

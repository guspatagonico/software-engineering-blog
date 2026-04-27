---
title: Harness Agentic Control Components
summary: Interactive Drift Map with threshold filtering and Evidence Cards aligned with homepage card styles
tags: []
related: [ui/blog_post_layout/post_list_styles/post_list_and_card_component_styles.md]
keywords: []
createdAt: '2026-04-27T21:34:32.804Z'
updatedAt: '2026-04-27T21:34:32.804Z'
---
## Reason
Documenting Drift Map and Evidence Card implementations for Harness Agentic Control post

## Raw Concept
**Task:**
Implement interactive Drift Map and Evidence Cards in HarnessAgenticControlExtras.astro

**Files:**
- src/components/posts/HarnessAgenticControlExtras.astro

**Flow:**
Slider input -> applyThreshold() -> toggle is-muted class on cells based on data-score

**Timestamp:** 2026-04-27

## Narrative
### Structure
The component consists of a Drift Map (SVG-based grid) and an Evidence List (Grid of interactive cards).

### Highlights
Interactive threshold filtering for drift signals; light/dark theme support with specific gradients; matrix background integration.

### Rules
Rule 1: Drift Map cells must have data-score attribute for filtering logic.
Rule 2: Evidence cards must match homepage card grid behavior (minmax 260px).
Rule 3: Use .is-muted class for filtered-out cells in Drift Map.
Rule 4: Apply backdrop-filter for frosted glass effect on evidence cards.

### Examples
Evidence card light theme bg: linear-gradient(135deg, rgba(0, 128, 104, 0.11), rgba(255, 255, 255, 0.74))

## Facts
- **layout_pattern**: Evidence cards use CSS Grid with minmax(260px, 1fr) for responsiveness. [project]
- **visual_logic**: Drift Map cells use score-based coloring: 0 (muted), 1 (teal), 2 (orange), 3 (red). [project]
- **styling**: Evidence cards support a 'matrix-bg-visible' state with high-contrast borders and deep gradients. [project]
- **responsive_design**: Responsive breakpoint for Drift Map and Evidence list is 767px. [project]

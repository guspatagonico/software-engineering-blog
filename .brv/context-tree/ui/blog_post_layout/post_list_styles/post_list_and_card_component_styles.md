---
title: Post List and Card Component Styles
summary: Post-card layout with frosted-glass effects, theme-specific gradients, and matrix background overrides
tags: []
related: [ui/visual_effects/matrix_background_post_card_styles.md, ui/blog_post_layout/post_list_and_card_styles.md]
keywords: []
importance: 55
recency: 1
maturity: draft
updateCount: 1
createdAt: '2026-04-23T22:18:44.301Z'
updatedAt: '2026-04-23T22:21:36.024Z'
---
## Reason
Curate homepage post-card frosted-glass and matrix background visibility styles

## Raw Concept
**Task:**
Define CSS styles for homepage post list and individual post cards

**Files:**
- src/styles/post-list.css

**Flow:**
Grid layout -> Post card reveal animation -> Hover effects -> Theme/Matrix overrides

**Timestamp:** 2026-04-23

## Narrative
### Structure
Styles defined in src/styles/post-list.css using CSS variables for theme consistency. Grid uses repeat(auto-fit, minmax(260px, 1fr)).

### Highlights
Enhanced frosted-glass presence with backdrop-filter. Animation-driven reveal for cards. Specific overrides for matrix background mode to ensure readability.

### Rules
Rule 1: Use !important for border and color overrides to ensure consistency across themes.
Rule 2: Reveal animation uses postCardReveal with a 0.45s duration.
Rule 3: Mobile view (max-width: 767px) switches to a single-column grid.

### Examples
Post card light mode variables:
--post-card-light-bg: linear-gradient(135deg, rgba(0, 128, 104, 0.1), rgba(255, 255, 255, 0.82));
--post-card-light-backdrop: blur(6px) saturate(108%);

## Facts
- **post_list_grid**: Post cards use a grid layout with a minimum width of 260px per item [project]
- **frosted_glass_dark**: Dark mode post cards use backdrop-filter blur(8px) and saturate(118%) [project]
- **frosted_glass_light**: Light mode post cards use backdrop-filter blur(6px) and saturate(108%) [project]
- **matrix_mode_overrides**: Matrix background visibility overrides post-card background to a darker gradient with 10px blur [project]

---
title: Post List and Card Styles
summary: Homepage post list grid layout with responsive cards, icons, and reveal animations.
tags: []
keywords: []
importance: 50
recency: 1
maturity: draft
createdAt: '2026-04-23T22:05:54.764Z'
updatedAt: '2026-04-23T22:05:54.764Z'
---
## Reason
Document homepage post list and card architecture

## Raw Concept
**Task:**
Document post list grid and card styling

**Files:**
- src/styles/post-list.css
- src/styles/post-tags.css

**Flow:**
grid layout -> post-card reveal animation -> hover states

**Timestamp:** 2026-04-23

## Narrative
### Structure
Post list uses a CSS Grid (minmax 260px). Cards feature a 14px border-radius, flex-column layout, and a custom "postCardReveal" animation.

### Highlights
Includes specialized light mode gradients (green to white) and hover effects with a pseudo-element shine effect.

### Examples
Hover effect uses .post-card::after with a 120deg linear gradient that slides into view.

## Facts
- **post_list_grid_min_width**: Post list grid uses a minimum column width of 260px [project]
- **post_card_border_radius**: Post cards have a 14px border radius [project]

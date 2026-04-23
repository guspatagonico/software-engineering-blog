---
title: Matrix Background Post Card Styles
summary: Scoped matrix card overrides to non-light themes to preserve readability in light mode.
tags: []
keywords: []
importance: 50
recency: 1
maturity: draft
createdAt: '2026-04-23T22:05:54.762Z'
updatedAt: '2026-04-23T22:05:54.762Z'
---
## Reason
Document matrix background styles for post cards and light mode fix

## Raw Concept
**Task:**
Implement and refine Matrix background visual effects for post cards

**Changes:**
- Scoped .post-card background/border overrides for matrix-bg-visible to :not([data-theme="light"])
- Added backdrop-filter blur and saturate to post cards when matrix is active
- Ensured readability remains unchanged in light theme when matrix effect is active

**Files:**
- src/styles/post-list.css

**Flow:**
body.matrix-bg-visible -> check theme -> apply scoped styles to .post-card

**Timestamp:** 2026-04-23

## Narrative
### Structure
The .post-card styles in src/styles/post-list.css handle both standard layout and Matrix effect overrides.

### Highlights
Matrix effect overrides use linear gradients with low opacity (0.75-0.88), 10px blur, and 120% saturation to ensure content pop against the falling characters.

### Rules
Rule 1: Matrix background overrides must NOT apply in light mode to preserve readability.
Rule 2: Use backdrop-filter for better text legibility when matrix is active.

## Facts
- **matrix_bg_light_mode**: Matrix background post card overrides are disabled in light mode [project]
- **post_card_matrix_filter**: Post cards use backdrop-filter blur(10px) when matrix is visible [project]

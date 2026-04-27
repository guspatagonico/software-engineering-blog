---
title: Post List and Card Component Styles
summary: Post-card layout with frosted-glass effects, theme-specific gradients, hover shine effects, and matrix background overrides
tags: []
related: [ui/visual_effects/matrix_background_post_card_styles.md, ui/blog_post_layout/harness_agentic_control/harness_agentic_control_components.md]
keywords: []
importance: 55
recency: 1
maturity: draft
updateCount: 2
createdAt: '2026-04-23T22:18:44.301Z'
updatedAt: '2026-04-27T21:50:00.000Z'
consolidated_at: '2026-04-27T21:50:09.972Z'
consolidated_from: [{date: '2026-04-27T21:50:09.972Z', path: ui/blog_post_layout/post_list_and_card_styles.md, reason: 'Both files document the same homepage post list and card styling in src/styles/post-list.css. ''post_list_and_card_component_styles.md'' is more recent and detailed regarding frosted-glass and matrix overrides, while ''post_list_and_card_styles.md'' contains specific hover effect examples (shine effect) and border-radius facts.'}]
---
## Reason
Curate homepage post-card frosted-glass, matrix background visibility, and interaction styles

## Raw Concept
**Task:**
Define CSS styles for homepage post list and individual post cards

**Files:**
- src/styles/post-list.css
- src/styles/post-tags.css

**Flow:**
Grid layout -> Post card reveal animation -> Hover effects (shine) -> Theme/Matrix overrides

**Timestamp:** 2026-04-23

## Narrative
### Structure
Styles defined in src/styles/post-list.css using CSS variables for theme consistency. Grid uses repeat(auto-fit, minmax(260px, 1fr)). Cards feature a 14px border-radius and a flex-column layout.

### Highlights
Enhanced frosted-glass presence with backdrop-filter. Animation-driven reveal for cards. Specific overrides for matrix background mode to ensure readability. Includes specialized light mode gradients (green to white) and hover effects with a pseudo-element shine effect.

### Rules
Rule 1: Use !important for border and color overrides to ensure consistency across themes.
Rule 2: Reveal animation uses postCardReveal with a 0.45s duration.
Rule 3: Mobile view (max-width: 767px) switches to a single-column grid.

### Examples
Post card light mode variables:
--post-card-light-bg: linear-gradient(135deg, rgba(0, 128, 104, 0.1), rgba(255, 255, 255, 0.82));
--post-card-light-backdrop: blur(6px) saturate(108%);

Hover effect uses .post-card::after with a 120deg linear gradient that slides into view.

## Facts
- **post_list_grid**: Post cards use a grid layout with a minimum width of 260px per item [project]
- **post_card_border_radius**: Post cards have a 14px border radius [project]
- **frosted_glass_dark**: Dark mode post cards use backdrop-filter blur(8px) and saturate(118%) [project]
- **frosted_glass_light**: Light mode post cards use backdrop-filter blur(6px) and saturate(108%) [project]
- **matrix_mode_overrides**: Matrix background visibility overrides post-card background to a darker gradient with 10px blur [project]
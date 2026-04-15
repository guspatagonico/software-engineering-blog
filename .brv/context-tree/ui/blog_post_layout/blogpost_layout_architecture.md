---
title: BlogPost Layout Architecture
summary: BlogPost layout with sticky headers, fixed meta footers, and inline scripts for hash navigation and mobile hydration.
tags: []
keywords: []
importance: 50
recency: 1
maturity: draft
createdAt: '2026-04-15T14:56:35.238Z'
updatedAt: '2026-04-15T14:56:35.238Z'
---
## Reason
Document BlogPost layout structure, styling, and hash navigation sync

## Raw Concept
**Task:**
Standardize BlogPost layout and navigation sync

**Files:**
- src/layouts/BlogPost.astro

**Flow:**
Render Head -> execute inline mobile check -> render Navbar/Header -> render content slot -> render Meta Footer -> execute hash navigation script

**Timestamp:** 2026-04-15

## Narrative
### Structure
Astro layout with sticky header (z-index 40) and fixed meta footer (z-index 45). Uses flex-direction column with scrollbar hiding on main layout.

### Highlights
Inline scripts handle early mobile state detection and late-hydration hash navigation with 50ms delay.

### Rules
1. Hide scrollbars on .post-layout using webkit-scrollbar: none.
2. Position post-meta-footer 70px from bottom on desktop, full-width above footer on mobile.
3. Use overscroll-behavior: none on mobile post-layout to prevent bounce.
4. Dispatch "section-activated" event after hash resolution to sync SectionNav component.

## Facts
- **BlogPost Layout**: The component listens for a custom 'section-activated' event dispatched by a BlogPost inline script to synchronize its internal state.
- **BlogPost Layout**: The activateSection function implements a scroll priority sequence targeting '.content', then '.post-layout', and finally the window object.
- **BlogPost**: The BlogPost layout uses an inline script to set 'document.documentElement.dataset.sectionsCollapsed' to 'true' if the window width is 767px or less.
- **BlogPost**: The BlogPost layout features a sticky 'post-header' positioned at 'top: 48px' with a z-index of 40.
- **BlogPost**: The 'post-meta-footer' is fixed 70px from the bottom of the viewport to remain positioned above the global footer.
- **BlogPost**: The BlogPost layout hides the '.post-layout' scrollbar using 'scrollbar-width: none' and 'display: none' for webkit-scrollbar.
- **BlogPost Layout**: The post-meta-footer component transitions to a full-width fixed layout at the bottom of the screen for viewports narrower than 1400px.
- **Mobile UI Design**: The post-meta-footer is assigned a z-index of 45 to ensure it remains above page content but below the main footer which has a z-index of 50.
- **BlogPost Layout**: On mobile devices with a max-width of 480px, the post-meta-footer bottom position is set to 47px to align with the footer's reduced padding.
- **BlogPost Layout**: For tablet and mobile views (max-width: 1023px), post tags are styled with a 9px font size and 2px 6px padding to optimize for smaller screens.
- **BlogPost Layout**: The post-meta-footer on desktop screens (min-width: 1400px) is positioned 70px from the bottom and aligned to the right.
- **Mobile UI Design**: The post-meta-footer uses a flexbox layout with flex-direction: row, justify-content: flex-start, and a 16px gap on mobile and tablet devices.
- **Mobile UI Design**: The post-meta-footer on mobile/tablet screens (max-width: 1399px) features a top border of 1px solid var(--border) and a box-shadow of 0 -2px 8px rgba(0, 0, 0, 0.2).

---
title: Scroll Feedback System
tags: []
related: [ui/visual_effects/dodecahedron_toggle.md]
keywords: []
importance: 64
recency: 1
maturity: draft
accessCount: 3
updateCount: 1
createdAt: '2026-04-07T18:00:12.146Z'
updatedAt: '2026-04-07T18:02:08.278Z'
---
## Raw Concept
**Task:**
Describe the ScrollIndicator-driven feedback system, the scroll container restructuring, and the Dodecahedron auto-hide prop added on 2026-04-07.

**Changes:**
- Added ScrollIndicator.astro with scroll listeners that compute width progress and hide the native scrollbar.
- Reworked Base.astro, BlogPost.astro, and related CSS so a .page-container flex frame wraps a scrollable .content area, keeping the browser scrollbar at the viewport edge.
- Extended Dodecahedron with an autoHideOnScroll prop wired through Base.astro so non-homepage pages hide the shape after two seconds of scroll inactivity.

**Files:**
- src/components/ScrollIndicator.astro
- src/components/Dodecahedron/Dodecahedron.tsx
- src/layouts/Base.astro
- src/layouts/BlogPost.astro
- src/styles/global.css
- src/styles/post-content.css
- src/components/Footer.astro

**Flow:**
Navbar/blog headers host the ScrollIndicator -> .content scroll events update progress and hide scrollbars -> progress values drive CSS width adjustments -> inactivity also resets the Dodecahedron auto-hide timer so the animation hides after two seconds without scroll activity.

**Timestamp:** 2026-04-07

## Narrative
### Structure
Base.astro now wraps the app in a .page-container flex layer with a scrollable .content sub-container so scrolling stays pinned to the viewport edge while Navbar and blog post headers can overlay the ScrollIndicator. Footer and post headers reuse the same indicator layout for continuity.

### Dependencies
BlogPost.astro positions the ScrollIndicator within the header, global.css/post-content.css hide native scrollbars, and Base.astro forwards autoHideOnScroll={!isHome} to the Dodecahedron so the homepage keeps the shape visible.

### Highlights
ScrollIndicator surfaces scroll progress as a 3px green bar, native scrollbars are suppressed for a cleaner chrome, and the Dodecahedron auto-hides two seconds after scrolling stops on non-home pages while remaining active on the homepage.

## Facts
- **scroll_indicator**: ScrollIndicator renders a solid 3px green horizontal line anchored beneath the Navbar (48px from the top) and at the top edge of blog post headers to reflect scroll progress. [project]
- **scrollbar_visibility**: Scrollbars are hidden globally with scrollbar-width: none plus ::-webkit-scrollbar { display: none } while the indicator width is driven by scroll events on the tracked content element. [environment]
- **page_scroll_architecture**: The page scroll architecture nests a .page-container flex parent with overflow hidden around a .content scroll area so the browser scrollbar stays at the viewport edge instead of hugging .main-content. [project]
- **dodecahedron_autohide**: Dodecahedron now accepts an autoHideOnScroll boolean (default false) that shows the shape during .content scroll activity and hides it after two seconds of inactivity while leaving it visible on the homepage. [project]

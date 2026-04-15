---
title: Blog Post Meta Footer and Tags
tags: []
related: [ui/visual_effects/scroll_feedback_system.md]
keywords: []
importance: 56
recency: 1
maturity: draft
accessCount: 2
createdAt: '2026-04-08T02:59:01.945Z'
updatedAt: '2026-04-08T02:59:01.945Z'
---
## Raw Concept
**Task:**
Capture the BlogPost.astro layout and styles for the hero header, ScrollIndicator, fixed meta footer, tag chips, and hash-navigation helper so future tweaks follow the existing pattern.

**Changes:**
- Added the post-meta-footer overlay to surface publish date and tags without interfering with the scrollable post content.
- Defined specific breakpoints for desktop (70px above footer), tablet (narrowed to 240px), mobile (full-width with custom padding), and small mobile (reduced padding and offset).
- Established teal tag chips that honor the same border/background pairings across breakpoints while shrinking their padding on small screens.
- Embedded a hash-navigation script that keeps SectionNav synced when hashes change before and after Astro page load.

**Files:**
- src/layouts/BlogPost.astro

**Flow:**
Render Navbar, ScrollIndicator, sticky hero header, and content slot -> conditionally render post-meta-footer (desktop: vertical stack, mobile: horizontal row) -> invoke Footer -> execute inline hash-navigation script to toggle panels and emit events.

**Timestamp:** 2026-04-08

## Narrative
### Structure
BlogPost.astro stitches together Navbar, ScrollIndicator, hero header, and the post slot before layering a fixed post-meta-footer that displays publication metadata and tag chips; the footer remains anchored above the global Footer while keeping the main content scrollable.

### Dependencies
Depends on Navbar, ScrollIndicator, Footer, and SectionNav (listens for section-activated events). The hash script accesses document panels by id, toggles .active classes, and triggers smooth scrolling on widths under 1024px.

### Highlights
Meta footer uses breakpoints to jump from desktop right-aligned boxes to mobile full-width rows while computing bottom offsets from Footer padding/borders; tag chips share teal styling and wrap on small widths; inline hash navigation ensures SectionNav stays in sync.

### Rules
Rule 1: Keep .post-meta-footer fixed above Footer with desktop offset 70px, tablet 70px with 240px max width, mobile 53px full-width, and small mobile 47px offset when padding shrinks.
Rule 2: Maintain post-tag chips uppercase with teal coloring and reduce padding from 3px×8px to 2px×6px on mobile.
Rule 3: Hash navigation must run before and after Astro page loads, remove .active from all panels, add it to the target panel, smooth-scroll on widths under 1024px, and emit `section-activated` events for SectionNav.

### Examples
Example meta footer markup includes a .post-meta-inner pair of spans for label + date, and .post-meta-tags mapping over post.tags to render .post-tag chips. The hash navigation script grabs the hash, looks for panel-<hash>, toggles the class set, scrolls on mobile, and dispatches a CustomEvent with detail { sectionId: hash }.

## Facts
- **meta_footer_position**: Desktop and tablet screens keep post-meta-footer fixed 70px above the viewport bottom with a 280px max width, z-index 35, right border removed, and -2px horizontal box-shadow so it sits flush against the floating Footer edge. [project]
- **mobile_meta_footer_offset**: Mobile (<767px) shifts the panel to full-width row 53px above Footer (derived from Footer padding 16px×2 + border 1px + ~20px content) with top-only border and z-index 45, while smaller mobile (<480px) lowers bottom offset to 47px by settling on 12px vertical padding. [project]
- **post_tag_chip_style**: Post tags render as uppercase teal chips: 9px font, 700 weight, 3px×8px padding, rgba(0,212,170,0.15) background, 1px rgba(0,212,170,0.3) border, and shrink to 2px×6px padding on mobile while continuing to wrap flexibly. [project]
- **hash_navigation_flow**: An inline hash-navigation script listens for DOMContentLoaded and astro:page-load, toggles .active panels, scrolls to the selected panel on widths under 1024px, and dispatches section-activated CustomEvents for SectionNav. [project]

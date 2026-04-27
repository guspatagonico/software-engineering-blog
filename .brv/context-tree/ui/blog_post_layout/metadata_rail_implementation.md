---
title: Metadata Rail Implementation
summary: Sticky right-side metadata rail for BlogPost layout with responsive behavior and mobile tag migration.
tags: []
related: [ui/blog_post_layout/blogpost_layout_architecture.md, project_guidelines/blog_post_architecture/blog_post_layout_and_components.md, ui/blog_post_layout/blog_post_meta_footer_and_tags.md]
keywords: []
createdAt: '2026-04-27T17:27:30.855Z'
updatedAt: '2026-04-27T17:27:30.855Z'
---
## Reason
Curate desktop-only sticky metadata rail for blog posts

## Raw Concept
**Task:**
Implement sticky metadata rail for BlogPost layout

**Changes:**
- Added sticky right aside for metadata (Date, ID, Tags)
- Implemented mobile tag migration script
- Added date formatting utility for YYYY-MM-DD

**Files:**
- src/layouts/BlogPost.astro
- src/styles/blog-post.css

**Flow:**
Desktop: Sidebar sticky -> Tablet/Mobile: Sidebar hidden -> Client Script: Move tags to main content

**Timestamp:** 2026-04-27

## Narrative
### Structure
The layout uses a .post-layout container with a slot and an <aside> for the rail. The rail is sticky with a calculated top offset.

### Dependencies
Depends on --post-header-height CSS variable and data-header-compact attribute for scroll sync.

### Highlights
Sticky behavior (top: calc(48px + var(--post-header-height))), 272px width, scrollable if overflowed, hidden on mobile.

### Rules
Rule 1: Rail must be hidden below 1024px
Rule 2: Dates must follow YYYY-MM-DD format
Rule 3: Post ID must use monospace font

### Examples
Mobile tag migration: moveTagsInline() checks if content contains tags before appending.

## Facts
- **ui_specs**: Desktop metadata rail width is 272px [project]
- **ui_responsiveness**: Metadata rail is visible only for screens >= 1024px [project]
- **typography**: Post IDs use JetBrains Mono font in the metadata rail [project]

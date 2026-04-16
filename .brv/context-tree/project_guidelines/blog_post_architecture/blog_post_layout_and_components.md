---
title: Blog Post Layout and Components
summary: Blog posts use SectionNav + panels layout. Interactive elements use React islands with client:load.
tags: []
keywords: []
importance: 50
recency: 1
maturity: draft
createdAt: '2026-04-16T11:44:12.563Z'
updatedAt: '2026-04-16T11:44:12.563Z'
---
## Reason
Documenting the blog post structure and component usage from AGENTS.md

## Raw Concept
**Task:**
Define blog post structure and UI components

**Files:**
- AGENTS.md
- src/layouts/BlogPost.astro

**Flow:**
Astro route -> BlogPost layout -> SectionNav -> Panels

**Timestamp:** 2026-04-16

## Narrative
### Structure
Blog posts require SectionNav with client:load. Panels use panel- prefix for IDs. First panel is active.

### Highlights
Interactive viz, charts, and math support. Astro + React hybrid architecture.

### Rules
Rule 1: Always use SectionNav.
Rule 2: Use icons from provided set for nav items.
Rule 3: Decompose monolith seed templates into components.

### Examples
◈ ▸ ▣ ◑ ⊕ ⬡ → ⟳ ✓ ≡ ∑ 👤 🧠 ⚙ ✦ ⚠ ⧉

## Facts
- **blog_post_layout**: Blog posts are standalone .astro files that must include a SectionNav component. [convention]
- **image_rendering**: Local images must be rendered using the Astro <Image /> component. [convention]

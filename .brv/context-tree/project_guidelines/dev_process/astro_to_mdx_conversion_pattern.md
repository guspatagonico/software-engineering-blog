---
title: Astro to MDX Conversion Pattern
tags: []
keywords: []
importance: 50
recency: 1
maturity: draft
createdAt: '2026-04-21T18:10:15.166Z'
updatedAt: '2026-04-21T18:10:15.166Z'
---
## Raw Concept
**Task:**
Convert blog posts from .astro to .mdx format

**Changes:**
- Front matter conversion to YAML
- Exporting sections and contextModels arrays
- Wrapping panels in <div class="content">
- Updating src/data/posts.ts with draft entries for original files

**Flow:**
Astro file -> Front matter conversion -> Import/Export setup -> Content wrapping -> Data update -> Validation

**Timestamp:** 2026-04-21

## Narrative
### Structure
MDX posts follow a specific hierarchy: Front matter -> Imports/Exports -> SectionNav -> Content Div -> Panels.

### Dependencies
Requires SectionNav component and post-content.css styles.

### Highlights
Maintains identical panel IDs for consistency. First panel must have class="active". Does not require BlogPost wrapper (handled by [slug].astro).

### Rules
Rule 1: ALL panels MUST be wrapped in <div class="content">.
Rule 2: Export const sections = [...] is required for SectionNav.
Rule 3: Maintain original metadata (title, tags, icon, etc.) in front matter.

### Examples
Example structure:
<SectionNav client:load sections={sections} />
<div class="content">
  <div class="panel active" id="panel-intro">...</div>
</div>

## Facts
- **blog_post_format**: Blog posts are being converted from .astro to .mdx format [convention]
- **mdx_exports**: MDX posts must export a 'sections' array [convention]
- **mdx_structure**: MDX posts must wrap panels in a <div class="content"> [convention]

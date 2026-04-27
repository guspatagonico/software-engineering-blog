---
title: HTML Tag Formatting
summary: HTML/MDX/JSX tags must keep the closing bracket > on the same line as the tag boundary
tags: []
keywords: []
importance: 50
recency: 1
maturity: draft
createdAt: '2026-04-24T16:02:55.001Z'
updatedAt: '2026-04-27T21:50:21.039Z'
consolidated_at: '2026-04-27T21:50:25.507Z'
consolidated_from: [{date: '2026-04-27T21:50:25.507Z', path: facts/conventions/html_tag_formatting.abstract.md, reason: These files are redundant components of the same knowledge entry. The .abstract.md and .overview.md are auxiliary files derived from or summarizing the main .md file. Consolidating them into the primary knowledge file ensures a single source of truth.}, {date: '2026-04-27T21:50:25.507Z', path: facts/conventions/html_tag_formatting.overview.md, reason: These files are redundant components of the same knowledge entry. The .abstract.md and .overview.md are auxiliary files derived from or summarizing the main .md file. Consolidating them into the primary knowledge file ensures a single source of truth.}]
related: [facts/conventions/context.md]
---
## Reason
Store formatting preference for HTML/MDX/JSX tag closing brackets to maintain consistent tag structure across all markup and component-based files.

## Raw Concept
**Task:**
Document HTML/MDX/JSX tag formatting preference

**Timestamp:** 2026-04-24

**Entities:** HTML, MDX, JSX

## Narrative
### Highlights
Applies to HTML, MDX, and JSX files to maintain consistent tag structure. This is a specific decision to standardize on "same-line" closing brackets, which may differ from some formatting styles (like certain Prettier configurations) that allow dangling brackets for multi-attribute tags.

### Rules
Rule: Always write HTML/MDX/JSX tags so the closing angle bracket '>' stays on the same line as the tag boundary. 

**Prohibited Pattern:** Avoid "dangling" brackets where the `>` character appears as a leading character on a new line.

## Facts
- **html_tag_formatting**: Always write HTML/MDX/JSX tags so the closing angle bracket '>' stays on the same line as the tag boundary (avoid leading '>' on following lines). [preference]
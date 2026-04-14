---
title: Post Content Styles
summary: Shared blog post CSS defines responsive content wrappers, table accent/muted helpers, panels, callouts, data-blocks, and vocab grids for reuse.
tags: []
related: [ui/blog_post_layout/context.md]
keywords: []
importance: 53
recency: 1
maturity: draft
accessCount: 1
createdAt: '2026-04-14T00:17:09.299Z'
updatedAt: '2026-04-14T00:17:09.299Z'
---
## Reason
Document the shared post-content.css helpers used by blog posts

## Raw Concept
**Task:**
Document the shared styling utilities exported by src/styles/post-content.css for blog post content.

**Changes:**
- Established the scrollable .content wrapper plus typography resets and responsive grids/card stacks so long-form posts maintain consistent spacing.
- Added accent/muted column helpers, panel/callout layouts, data-block tables, and vocabulary list grids so posts can share data display conventions without inline CSS tweaks.

**Files:**
- src/styles/post-content.css

**Flow:**
content wrapper -> grid/card helpers -> table structure -> accent/muted helpers -> panel/callout blocks -> data-block tables -> utility text classes -> vocabulary grid

**Timestamp:** 2026-04-13

**Author:** Frontend Team

## Narrative
### Structure
Organizes the shared post styles into sequential sections for the scrollable .content region, responsive grids and stacks, unified table styling and accent/muted helpers, reusable panels and callouts, the boxed data-block, shared utility text colors, and the vocabulary list grid to keep every post visually consistent.

### Dependencies
Relies on the theme palette variables (--teal, --teal-dark, --amber, --red, --border, --surface, --bg, --text, --text-dim) plus the table accent/muted CSS variables so accentized columns flow with the existing theme tokens.

### Highlights
Highlights include accent/muted column classes (.table-accent-2/3, .table-muted-2/3) whose colors default to theme variables but can be retargeted with --table-accent-color/--table-muted-color, padded diagram panels (.post-panel/.post-panel-lg), left-border callouts (.post-callout), the structured .data-block layout, shared utility states (teal/tick/cross/cm/kw), and the vocabulary grid (vocab-item/vocab-term).

### Examples
Apply .table-accent-3 and .table-accent-teal to highlight a third column with the teal accent while keeping the rest of the table on the surface/border palette; wrap glossary entries in a vocab-item/vocab-term pair to align the term column at 175px with amber text and keep descriptions flush in the second column.

## Facts
- **table_accent_helpers**: Table accent helpers table-accent-2 and table-accent-3 color the second or third column using --table-accent-color with table-accent-red and table-accent-teal convenience classes. [project]
- **data_block_layout**: The data-block component frames key/value rows with 16px padding, a 1px border, border-radius 4px, and italicized notes/footers so structured metadata appears like a labeled card. [project]
- **vocab_list_layout**: Vocabulary lists use a two-column grid (175px label + 1fr description) with amber term coloring so glossary entries stay aligned and highlighted. [project]

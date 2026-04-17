---
title: Post Content Styles
summary: Centralized post-content CSS defines layout helpers, tables accents/muted columns, panels, callouts, data blocks, vocab glossary rows, and inline text utilities for blog posts.
tags: []
related: [ui/blog_post_layout/context.md]
keywords: []
importance: 65
recency: 1
maturity: validated
accessCount: 5
createdAt: '2026-04-14T00:17:24.192Z'
updatedAt: '2026-04-14T00:17:24.192Z'
---
## Reason
Document shared blog post body utilities from src/styles/post-content.css.

## Raw Concept
**Task:**
Document the shared post-content styling utilities and helper classes defined in src/styles/post-content.css.

**Changes:**
- Added table accent/muted column helpers with configurable CSS variables (--table-accent-color, --table-muted-color).
- Introduced reusable containers for diagrams, callouts, data blocks, and vocabulary rows to eliminate inline CSS in posts.
- Defined inline text utilities (.teal, .tick, .cross, .cm, .kw) plus grid/stack helpers (.post-grid, .card-stack) for consistent spacing.

**Files:**
- src/styles/post-content.css

**Flow:**
.content -> grid and stack helpers -> tables with accent/muted columns -> panels and callouts -> data blocks -> vocabulary rows + inline text cues.

**Timestamp:** 2026-04-14

## Narrative
### Structure
post-content.css centralizes blog post body styling: top-level .content layout (scroll hints and responsive padding), grid (.post-grid) and stack (.card-stack) helpers, table styles with accents/muted columns, diagram panels (.post-panel/-.post-panel-lg), callouts, multi-section data blocks, and glossary rows plus inline color cues.

### Dependencies
Relies on theme tokens such as --teal, --teal-dark, --border, --surface, --bg, --text, --text-dim, --red, --amber to keep containers consistent.

### Highlights
Tables collapse borders, stripe even rows, and let columns opt into accent/muted colors through helper classes tied to CSS variables. Panels/callouts/data blocks share surface/border radius tokens for coherent containers. Vocabulary rows enforce term column widths and amber text for clarity.

### Examples
Use .post-grid for two-column data cards, .card-stack for stacked cards, .post-callout for warnings, .data-block for stat blocks, .vocab-item/.vocab-term for glossary entries, and inline utilities (.teal, .tick, .cross, .cm, .kw) for emphasis.

## Facts
- **table_accent_columns**: Classes .table-accent-2 and .table-accent-3 keep columns two and three prominent by applying var(--table-accent-color, var(--red)) plus font-weight 600. [project]
- **table_muted_columns**: Classes .table-muted-2 and .table-muted-3 tone down columns two and three with var(--table-muted-color, var(--text-dim)) for lower-priority data. [project]
- **post_panel**: .post-panel and .post-panel-lg wrap diagrams or explanations with surface backgrounds, borders, rounded corners, and 20-24px padding. [project]
- **post_callout**: .post-callout relies on a teal 3px left border, surface background, and italic textual content to highlight callouts. [project]
- **data_block**: .data-block mimics spaced key-value pre blocks with headers, separators, lists, notes, and footer text styled via surface/border tokens. [project]
- **vocab_list**: Vocabulary rows use a 175px term column, 16px gap, amber term color, and subtle bottom border for consistent glossary visuals. [project]

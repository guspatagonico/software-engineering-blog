### Key Points
- Centralizes blog post body styling in `src/styles/post-content.css`, covering layout helpers, tables, panels, callouts, data blocks, vocab rows, and inline text utilities for consistent appearance.
- Grid (`.post-grid`) and stack (`.card-stack`) helpers manage responsive spacing; `.content` sets scroll hints and padding context.
- Table helpers provide accent (`.table-accent-2/3`) and muted (`.table-muted-2/3`) column styling with configurable CSS variables for prominence control.
- Panel/callout containers (`.post-panel`, `.post-panel-lg`, `.post-callout`) share surface/border tokens and padding, ensuring cohesive diagram/callout presentation.
- Data blocks (`.data-block`) and glossary rows (`.vocab-item`, `.vocab-term`) enforce structured layouts, colored accents, and consistent typography/borders.
- Inline text utilities (`.teal`, `.tick`, `.cross`, `.cm`, `.kw`) support emphasis and notation within prose.

### Structure / Sections Summary
1. **Reason / Raw Concept** – Establishes task of documenting `post-content.css`, highlighting helper additions and flow within `.content`.
2. **Narrative** – Describes structure of CSS, dependency on theme tokens, highlights (tables, containers, vocab rows), and usage examples of helpers/utilities.
3. **Facts** – Calls out specific helper groups (table accent/muted columns, panels, callouts, data blocks, vocabulary rows) with their styling intent and token usage.

### Notable Entities, Patterns, Decisions
- **Theme Tokens**: Relies on tokens like `--teal`, `--border`, `--surface`, `--text-dim`, `--red`, `--amber` to keep containers consistent and theme-aligned.
- **Variable-driven Column Styling**: Accent/muted table column helpers use CSS vars (`--table-accent-color`, `--table-muted-color`) to tune prominence per table without altering markup.
- **Reusable Containers**: Introduced `.post-panel[-lg]`, `.post-callout`, `.data-block`, `.vocab-item`/`.vocab-term` to replace inline CSS and ensure shared spacing, borders, and typography.
- **Inline Utilities**: `.teal`, `.tick`, `.cross`, `.cm`, `.kw` offer semantic shorthand for inline emphasis, status indicators, or keyword highlighting within posts.
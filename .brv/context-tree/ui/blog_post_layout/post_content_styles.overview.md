- **Key Points**
  - Shared `post-content.css` provides reusable layout helpers—from the scrollable `.content` wrapper to responsive grids, tables, panels, callouts, and glossary grids—for consistent long-form blog styling.
  - Table accent/muted column utilities (`.table-accent-2/3`, `.table-muted-2/3`, accent-specific shortcuts) layer themed highlights atop the core table palette via CSS variables.
  - Panel and callout components (`.post-panel`, `.post-panel-lg`, `.post-callout`) deliver padded containers with accent borders for diagrams or emphasized notes.
  - The `.data-block` pattern frames metadata with padding, borders, and italic notes, while shared text state classes (teal, tick, cross, etc.) standardize inline emphasis.
  - Vocabulary grids (`.vocab-item`/`.vocab-term`) align term labels at 175 px with amber coloring beside descriptions, ensuring glossaries stay structured and highlighted.

- **Structure / Sections Summary**
  1. **Scrollable Content Wrapper:** Defines the `.content` container with typography resets and responsive spacing for blog posts.
  2. **Responsive Grid/Card Helpers:** Establishes grid and card stack utilities for adaptive layout within long-form content.
  3. **Table Structure & Accent/Muted Helpers:** Unifies table styling plus column-level accent/muted helpers tied to theme colors and CSS variables.
  4. **Panels & Callouts:** Introduces padded panel blocks and left-border callouts for diagrams or highlighted notices.
  5. **Data-Block Layout:** Frames structured metadata rows with consistent padding/borders and italicized annotations.
  6. **Utility Text Classes:** Provides shared text states (teal, tick, cross, cm, kw) for semantic coloring within content.
  7. **Vocabulary Grid:** Defines the glossary grid with term/description pairing, amber text, and fixed-width label alignment.

- **Notable Entities, Patterns, or Decisions**
  - **Entities:** Theme palette variables (`--teal`, `--amber`, `--border`, etc.) drive the color system, while `--table-accent-color`/`--table-muted-color` allow retargeting accent helpers.
  - **Patterns:** Sequential flow maps from the content wrapper through grids, tables, panels, data blocks, utilities, and the vocab grid to ensure consistent styling order.
  - **Decisions:** Accent/muted column helpers default to theme tokens but accept overrides via CSS variables; vocabulary grid uses fixed 175 px label width and amber term color to maintain legibility and emphasis.
---
children_hash: d32c9b82d8ba7bd17acb6316da64a5eec7062fe69a1fb0f7f29d9daf3b0ea9d2
compression_ratio: 0.2372112211221122
condensation_order: 1
covers: [blog_post_meta_footer_and_tags.md, context.md, post_content_styles.md, post_content_styles/_index.md]
covers_token_total: 2424
summary_level: d1
token_count: 575
type: summary
---
### Blog Post Layout
- **Context Overview**: `context.md` defines the BlogPost layout, highlighting the hero header, ScrollIndicator, fixed post meta footer, and hash-navigation interop for SectionNav.
- **Structural Flow**: `BlogPost.astro` renders Navbar → ScrollIndicator → hero header → content slot, then overlays the responsive post-meta-footer (desktop vertical stack vs. mobile horizontal row), followed by Footer and the hash-navigation script that syncs SectionNav panels.
- **Key Relationships**: Meta footer depends on Navbar, ScrollIndicator, Footer, and SectionNav; the hash script toggles `.active` panels, smooth-scrolls under 1024px, and dispatches `section-activated` events to keep navigation aligned.

### Blog Post Meta Footer and Tags (`blog_post_meta_footer_and_tags.md`)
- **Meta Footer Behavior**: Fixed 70 px above the viewport for desktop/tablet (max 280 px width, z-index 35, flush box-shadow) and shifts to full-width rows at 53 px (mobile) or 47 px (small mobile) above Footer, keeping main content scrollable underneath.
- **Post Tag Styling**: Tags render as uppercase teal chips (9px font, 700 weight, 3×8 px padding with teal border/background) and shrink to 2×6 px on small screens while wrapping flexibly.
- **Hash Navigation Rules**: Inline script runs before/after Astro page load, clears `.active` from all panels, reassigns it to `panel-<hash>`, smooth-scrolls if width <1024 px, and emits `section-activated` CustomEvents for SectionNav.

### Post Content Styles (`post_content_styles.md` + `_index` summary)
- **Shared Styling Utilities**: `src/styles/post-content.css` defines the `.content` wrapper, responsive grids (`.post-grid`, `.card-stack`), accent/muted table helpers, panel/callout blocks, `.data-block`, utility text states, and vocabulary grids to keep blog content consistent.
- **Structural Sequence**: Content wrapper → grid/card helpers → table structure → accent/muted helpers → panels/callouts → data-block → utility classes → vocabulary grid.
- **Highlights & Dependencies**: Relies on theme tokens (`--teal`, `--border`, `--surface`, etc.) and table accent variables; accent helpers color the second/third columns, panels add teal accents, `.data-block` frames metadata, and vocabulary rows enforce a 175 px term column with amber text.
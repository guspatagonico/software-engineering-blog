---
children_hash: 31d2f2b4f8217178de5d1022c53c1a9273545525b09cd9befe4dfff28bb527e2
compression_ratio: 0.5724020442930153
condensation_order: 1
covers: [context.md, html_tag_formatting.md]
covers_token_total: 587
summary_level: d1
token_count: 336
type: summary
---
# Domain: facts/conventions

This domain establishes project-wide coding standards and formatting preferences for markup and component-based files.

## Structural Overview

### Markup Formatting Standards
The project enforces a strict convention for HTML, MDX, and JSX tag structures to ensure visual consistency across all templates and components.

*   **Bracket Placement Policy**: A mandatory rule requires that the closing angle bracket `>` of any tag must remain on the same line as the tag boundary. This standard explicitly prohibits "dangling" brackets where the `>` character appears as a leading character on a new line, even in cases of multi-attribute tags.
*   **Implementation Scope**: This preference applies globally to all HTML, MDX, and JSX files, overriding alternative formatting styles (such as certain Prettier configurations) that might otherwise permit dangling brackets.

## Knowledge Entries

*   **[context.md](facts/conventions/context.md)**: Provides the high-level overview of project conventions, including HTML formatting, JSX/MDX syntax, and bracket placement.
*   **[html_tag_formatting.md](facts/conventions/html_tag_formatting.md)**: Contains the specific architectural decision and prohibited patterns regarding tag boundary formatting. Reference this entry for the exact rule text and entity relationships.
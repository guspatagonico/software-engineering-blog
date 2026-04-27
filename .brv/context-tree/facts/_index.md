---
children_hash: 0dbeb8642833d0a542ca18126d1518778c0c029f343ad244e2702c4ceadc0a2d
compression_ratio: 0.9204771371769384
condensation_order: 2
covers: [context.md, conventions/_index.md]
covers_token_total: 503
summary_level: d2
token_count: 463
type: summary
---
# Domain: facts

The `facts` domain serves as the repository for personal preferences and project-wide conventions that govern agent behavior and code formatting. It is structured to separate individual communication styles from technical implementation standards.

## Structural Overview

### Personal Preferences
This area focuses on person-level directives that influence how agents interact and format responses.
*   **Scope**: Includes tone, communication style, and individual response formatting.
*   **Ownership**: Managed by the ByteRover context engineer to enforce personal communication rules.
*   **Reference**: [context.md](facts/context.md)

### Project Conventions
The `conventions/` sub-domain establishes mandatory coding and markup standards to ensure visual and structural consistency across the codebase.
*   **Markup Formatting Standards**: Enforces a strict policy for HTML, MDX, and JSX tag structures.
    *   **Bracket Placement Policy**: The closing angle bracket `>` must remain on the same line as the tag boundary. "Dangling" brackets (where `>` is a leading character on a new line) are explicitly prohibited, even for multi-attribute tags.
    *   **Implementation**: This rule overrides standard formatting configurations (e.g., Prettier) and applies globally to all component and markup files.
*   **Reference**: [conventions/_index.md](facts/conventions/_index.md)

## Knowledge Entries

*   **[context.md](facts/context.md)**: Defines the purpose, scope, and ownership of the personal facts domain.
*   **[conventions/context.md](facts/conventions/context.md)**: High-level overview of project-wide conventions including JSX/MDX syntax.
*   **[conventions/html_tag_formatting.md](facts/conventions/html_tag_formatting.md)**: Detailed architectural decision and prohibited patterns regarding tag boundary formatting.
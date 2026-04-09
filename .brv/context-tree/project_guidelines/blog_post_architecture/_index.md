---
tags: []
keywords: []
importance: 56
recency: 1
maturity: draft
accessCount: 2
---
## blog_post_architecture
- **Purpose & Scope**: Defines the enforced BlogPost layout pattern that every entry must follow, covering SectionNav integration, panel conventions, shared UI components, and homepage card updates (see `blog_post_architecture.md` entries for details).
- **Structure**:
  - Every post imports the `BlogPost` layout, prepares a `sections` array (id/icon/label), and renders SectionNav with `client:load`.
  - Panels mirror SectionNav entries using `div`s with IDs `panel-{section.id}` and classes `panel`/`panel active`; only the first panel is initially active.
  - Shared UI components (`Highlight`, `Card`, `ConvergentEnvelope`) ensure cohesive styling while inline styles on `.content` and `.panel` match the template.
- **Dependencies & Integration**:
  - SectionNav requires client:load for interactive updates.
  - Icons must be drawn from the approved set (◈ ▸ ▣ ◑ ⊕ ⬡ → ⟳ ✓ ≡ ∑).
  - Every new post must also register a corresponding card on the homepage (`src/pages/index.astro`) to surface the article immediately.
- **Conventions & Facts**:
  - Panel IDs follow the `panel-{section.id}` pattern to tie navigation to toggling behavior.
  - The first panel gets the `panel active` class and subsequent panels use `panel` only.
  - SectionNav icons and panel structure are standardized (see `blog_post_architecture.md` for specifics).
- **Related Guidance**: See `context.md` under `project_guidelines/dev_process` for broader workflow expectations linked to this topic.
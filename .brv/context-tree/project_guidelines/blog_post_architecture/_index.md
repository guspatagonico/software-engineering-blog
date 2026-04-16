---
children_hash: 61765f3cefa488ccd176a4f94d6b2d1f318022b402abd19d9b6acbf8fab747e9
compression_ratio: 0.540952380952381
condensation_order: 1
covers: [blog_post_architecture.md, blog_post_layout_and_components.md, context.md]
covers_token_total: 1050
summary_level: d1
token_count: 568
type: summary
---
# Blog Post Architecture & Layout Summary

This domain defines the mandatory structural patterns and component integrations required for all blog entries to maintain a cohesive, interactive user experience.

### Core Architectural Decisions
*   **Layout & Navigation**: Every blog post is a standalone `.astro` file that must implement the `BlogPost` layout and integrate the `SectionNav` component using `client:load` for browser-side interactivity.
*   **Panel System**: Content is organized into discrete sections called panels. These must follow a strict naming convention: `id="panel-{section.id}"`. 
    *   The first panel must have the classes `panel active`.
    *   Subsequent panels use the `panel` class and remain hidden until toggled via the navigation.
*   **Asset Management**: Local images must be rendered using the Astro `<Image />` component to ensure optimized delivery.

### Component Integration & Patterns
*   **SectionNav Icons**: Navigation icons are restricted to a specific set to maintain visual consistency: `◈ ▸ ▣ ◑ ⊕ ⬡ → ⟳ ✓ ≡ ∑ 👤 🧠 ⚙ ✦ ⚠ ⧉`.
*   **Shared UI Library**: Posts should leverage shared components including `Highlight`, `Card`, and `ConvergentEnvelope`. Monolithic templates should be decomposed into these reusable components.
*   **Hybrid Architecture**: The system utilizes an Astro + React hybrid model, specifically employing React islands for interactive visualizations, charts, and mathematical notations.

### Key Relationships & Synchronizations
*   **Homepage Integration**: Every new post requires a corresponding card entry in `src/pages/index.astro` to ensure visibility on the landing page.
*   **Workflow Dependencies**: This architecture is closely linked to the `project_guidelines/dev_process` for standardizing how new content is staged and rendered.

### Reference Entries
*   **blog_post_architecture.md**: Details the mandated `SectionNav` integration, panel class conventions, and homepage card requirements.
*   **blog_post_layout_and_components.md**: Outlines the Astro + React hybrid architecture and specific rules for component decomposition and image rendering.
*   **context.md**: Provides a high-level overview of the `BlogPost` layout and its relationship to the broader development process.
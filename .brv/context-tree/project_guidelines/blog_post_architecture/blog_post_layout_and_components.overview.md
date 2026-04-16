# Blog Post Layout and Components Overview

### Key Points
* **Hybrid Architecture:** Blog posts utilize an Astro + React hybrid architecture, leveraging React islands with `client:load` for interactive elements.
* **Mandatory Navigation:** Every blog post must include a `SectionNav` component to facilitate navigation between content sections.
* **Panel-Based Layout:** Content is organized into panels where the first panel is active by default, and all panel IDs must use the `panel-` prefix.
* **Asset Optimization:** Local images are required to be rendered using the Astro `<Image />` component rather than standard HTML tags.
* **Component Decomposition:** Developers are instructed to decompose monolithic seed templates into smaller, reusable components.

### Structure / Sections Summary
* **Reason & Raw Concept:** Establishes the documentation's purpose based on `AGENTS.md` and identifies the primary layout file (`src/layouts/BlogPost.astro`).
* **Narrative:** 
    * **Structure:** Details the technical flow from Astro routes to specific UI components.
    * **Highlights:** Lists supported features such as interactive visualizations, charts, and math support.
    * **Rules:** Defines strict constraints regarding navigation, icon sets, and template management.
* **Facts:** Formalizes specific conventions for layout requirements and image rendering.

### Notable Entities, Patterns, and Decisions

**Entities**
* `SectionNav`: The primary navigation component required for all posts.
* `BlogPost.astro`: The core layout file governing blog post structure.
* `AGENTS.md`: The source documentation defining these standards.

**Patterns**
* **Island Architecture:** Using `client:load` for interactive visualizations and charts within a static Astro framework.
* **ID Prefixing:** A strict naming convention (`panel-{name}`) for content sections to ensure consistency and functionality.
* **Iconography:** A specific set of symbols (e.g., ◈, 🧠, ⚙, ⧉) is designated for use within navigation items.

**Decisions**
* **Standalone Files:** Blog posts are defined as standalone `.astro` files.
* **Active State:** The decision to programmatically set the first panel as the active state upon load.
* **Standardized Image Handling:** Enforcement of the Astro `<Image />` component for all local assets to ensure optimized rendering.
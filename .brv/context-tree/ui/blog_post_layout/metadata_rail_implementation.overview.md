# Metadata Rail Implementation Overview

### Key Points
* **Sticky Metadata Rail:** Implements a right-side `<aside>` for blog posts containing the Date, Post ID, and Tags.
* **Responsive Behavior:** The rail is strictly desktop-only, visible only on screens $\ge$ 1024px.
* **Mobile Tag Migration:** Uses a client-side script (`moveTagsInline()`) to move tags from the hidden sidebar into the main content area on mobile/tablet devices.
* **Standardized Formatting:** Enforces YYYY-MM-DD date formats and monospace typography for technical identifiers.
* **Header Synchronization:** Sticky positioning uses a calculated offset based on the `--post-header-height` CSS variable to ensure alignment during scrolling.

### Structure / Sections Summary
* **Reason & Concept:** Defines the task of curating a desktop-only rail and lists the primary file changes (`BlogPost.astro`, `blog-post.css`).
* **Narrative:** 
    * **Structure:** Details the `.post-layout` container and the use of the `<aside>` element.
    * **Dependencies:** Explains the reliance on CSS variables and the `data-header-compact` attribute for scroll sync.
    * **Rules:** Establishes the 1024px visibility threshold and formatting requirements.
* **Facts:** Provides specific technical specifications regarding width, breakpoints, and typography.

### Notable Entities, Patterns, and Decisions
* **Entities:**
    * `BlogPost.astro`: The primary layout component.
    * `moveTagsInline()`: The script responsible for DOM manipulation during responsive transitions.
    * **JetBrains Mono**: The specific font designated for Post IDs.
* **Design Patterns:**
    * **Conditional Visibility:** Using CSS media queries to hide the rail on smaller screens while using JavaScript to "migrate" essential data (tags) to the visible viewport.
    * **Calculated Sticky Positioning:** `top: calc(48px + var(--post-header-height))` ensures the rail respects the dynamic height of the site header.
* **Key Decisions:**
    * **Fixed Width:** The rail is locked to 272px.
    * **Breakpoint:** 1024px is the hard cutoff for the desktop layout.
    * **Date Format:** Strict adherence to YYYY-MM-DD for consistency.
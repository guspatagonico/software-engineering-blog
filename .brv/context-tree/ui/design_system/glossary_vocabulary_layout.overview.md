### Key Points
*   **Responsive Layout:** The glossary utilizes a standard vertical flow for mobile and transitions to a two-column grid alignment for desktop displays.
*   **Visual Minimalisms:** Design rules explicitly reject card-based boxes in favor of subtle horizontal dividers (`border-bottom`) to separate entries.
*   **Typography & Styling:** Glossary terms are defined as compact, uppercase labels featuring an amber accent color.
*   **Logical Sequence:** Every entry follows a strict structural flow: Term → Label → Definition → Divider.

### Structure / Sections Summary
*   **Reason & Raw Concept:** Establishes the purpose of the document (design system rules) and defines the fundamental sequence of UI elements.
*   **Narrative:** Elaborates on the responsive behavior (Mobile vs. Desktop) and highlights specific aesthetic choices regarding borders and accents.
*   **Facts:** Formalizes the design conventions as technical requirements, specifically regarding the `glossary_visuals` and `glossary_term_style`.

### Notable Entities, Patterns, & Decisions
*   **Entities:**
    *   **Term:** The primary vocabulary word.
    *   **Label:** The metadata or category associated with the term.
    *   **Definition:** The descriptive paragraph.
    *   **Divider:** The visual boundary between entries.
*   **Design Patterns:**
    *   **Two-Column Desktop Grid:** A specific layout decision for larger screens to optimize space.
    *   **Border-Bottom Convention:** The use of CSS borders instead of container components (cards).
*   **Key Decisions:**
    *   **Color Palette:** Selection of "Amber" as the primary accent color for labels.
    *   **Case Styling:** Mandatory uppercase transformation for term labels to ensure a "compact" visual feel.
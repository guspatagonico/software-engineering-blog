### Key Points
* **Bracket Placement:** The closing angle bracket (`>`) must always remain on the same line as the tag boundary.
* **Scope of Application:** This formatting rule applies to HTML, MDX, and JSX files.
* **Prohibited Pattern:** Avoid "dangling" brackets where the `>` character appears as a leading character on a new line.
* **Objective:** To maintain a consistent tag structure across all markup and component-based files.

### Structure / Sections Summary
* **Metadata:** Defines the document's lifecycle status (draft), importance (50), and creation date (April 2026).
* **Reason:** Establishes the intent to store specific formatting preferences for markup languages.
* **Raw Concept:** Provides a high-level task description and timestamp for the formatting standard.
* **Narrative:** 
    * **Highlights:** Identifies the specific file types affected.
    * **Rules:** Explicitly defines the syntax requirement for tag closing.
* **Facts:** Formalizes the preference into a single actionable rule statement (`html_tag_formatting`).

### Notable Entities, Patterns, or Decisions
* **Entities:** HTML, MDX, JSX.
* **Decision:** Standardized on "same-line" closing brackets. This is a departure from some formatting styles (like certain Prettier configurations) that allow or require the closing bracket to be on a new line for multi-attribute tags.
* **Pattern:** `html_tag_formatting` — a specific preference key used to enforce tag boundary consistency.
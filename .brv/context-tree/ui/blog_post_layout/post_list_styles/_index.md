---
children_hash: 9ad609317b046451ce29ec4bf1c788b37b3c6cab9c038a16b63cc9eb63b4b2cf
compression_ratio: 0.753968253968254
condensation_order: 0
covers: [post_list_and_card_component_styles.md]
covers_token_total: 504
summary_level: d0
token_count: 380
type: summary
---
# Post List and Card Component Architecture

The homepage UI utilizes a responsive grid system and sophisticated visual effects to manage post-card presentation across different themes and background modes.

### Layout and Grid Structure
*   **Grid Configuration**: Implemented in `src/styles/post-list.css` using `repeat(auto-fit, minmax(260px, 1fr))`.
*   **Mobile Adaptation**: A single-column layout is enforced for viewports under 767px.
*   **Entry Reference**: See **post_list_and_card_component_styles.md** for specific CSS variable definitions.

### Visual Effects and Theming
*   **Frosted Glass**: Cards utilize `backdrop-filter` for depth.
    *   **Dark Mode**: `blur(8px)` and `saturate(118%)`.
    *   **Light Mode**: `blur(6px)` and `saturate(108%)`.
*   **Animations**: Cards employ a `postCardReveal` animation with a 0.45s duration.
*   **Matrix Mode Overrides**: When the matrix background is active, card backgrounds transition to a darker gradient with an increased `10px` blur to maintain legibility.

### Key Architectural Decisions
*   **Style Enforcement**: The system uses `!important` for border and color overrides to guarantee consistency across theme transitions.
*   **Theme Variables**: Specific gradients like `--post-card-light-bg` (135deg linear gradient) are used to maintain brand identity within the frosted-glass effect.
*   **Relationships**: This component integrates closely with the broader visual effects system (see `ui/visual_effects/matrix_background_post_card_styles.md`).
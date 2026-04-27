---
children_hash: 2dd59270df8b7e3e527bbb4c5d5cce8aceae45effce19963de5a660b59fe8f3c
compression_ratio: 0.9811320754716981
condensation_order: 0
covers: [harness_agentic_control_components.md]
covers_token_total: 477
summary_level: d0
token_count: 468
type: summary
---
# Structural Summary: Harness Agentic Control UI

The Harness Agentic Control interface implements specialized interactive components designed for drift visualization and evidence presentation, integrated within the blog's architectural patterns.

### Core Components and Implementation
*   **Drift Map**: An SVG-based grid system located in `src/components/posts/HarnessAgenticControlExtras.astro`. It utilizes a slider-driven control loop where input triggers `applyThreshold()`, toggling the `.is-muted` class on cells based on their `data-score` attribute.
*   **Evidence Cards**: A grid of interactive cards that mirror the homepage card styles. They utilize `backdrop-filter` for frosted glass effects and support a `matrix-bg-visible` state for high-contrast borders.

### Architectural Decisions and Rules
*   **Layout Consistency**: Evidence cards are mandated to follow the project's standard responsive grid behavior using `minmax(260px, 1fr)` (Rule 2).
*   **Data-Driven Styling**: Drift Map cells must include a `data-score` attribute to enable filtering logic (Rule 1). Visual logic maps scores to specific states: 0 (muted), 1 (teal), 2 (orange), and 3 (red).
*   **Theme Integration**: Components support light/dark modes with specific linear gradients (e.g., teal/white gradients for light theme) and matrix background integration.
*   **Responsiveness**: Both the Drift Map and Evidence list target a 767px breakpoint for layout shifts.

### Key Relationships
*   **Style Alignment**: These components are explicitly aligned with the global post list and card styles defined in `ui/blog_post_layout/post_list_styles/post_list_and_card_component_styles.md`.

For detailed implementation logic and specific CSS class definitions, refer to:
*   **harness_agentic_control_components.md** (Drift Map filtering, Evidence card gradients, and responsive logic)
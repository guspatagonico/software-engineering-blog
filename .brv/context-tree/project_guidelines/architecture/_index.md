---
children_hash: 49322cad7ae5e8b9a9c65668618223fb2441d74702712c1dcd9d77a9e00d6100
compression_ratio: 0.5145784081954294
condensation_order: 1
covers: [d2_diagram_optimization.md, state_persistence_and_storage.md]
covers_token_total: 1269
summary_level: d1
token_count: 653
type: summary
---
# Architecture and State Management Overview

This structural overview covers the implementation of dynamic diagram rendering and centralized state persistence within the blog architecture.

## D2 Diagram Optimization
The system employs a three-tier architecture to handle heavy D2/WASM rendering (~8MB) without impacting initial page load performance.

*   **Rendering Pipeline**:
    *   **Detection**: `BlogPost.astro` uses an inline module script to scan for `[data-d2-diagram="true"]` markers.
    *   **Transformation**: If markers are found, `D2DiagramsTransformer.tsx` is dynamically imported to locate containers and extract DSL code from the `[data-d2-code]` attribute.
    *   **Hydration**: The `D2DiagramRenderer.tsx` React component hydrates the container, ensuring the `@terrastruct/d2` module is loaded only once via a `d2ModulePromise` singleton.
*   **Performance & Build Configuration**:
    *   **Vite Optimization**: `astro.config.mjs` defines a `manualChunks` entry for `d2-wasm` and increases the `chunkSizeWarningLimit` to 8500 to accommodate WASM assets.
    *   **SVG Post-processing**: The renderer automatically makes diagram backgrounds transparent by targeting the first `<rect>` element and supports interactive pan/zoom functionality.
*   **Theme Synchronization**: A `MutationObserver` monitors the `data-theme` attribute on `document.documentElement` to trigger real-time diagram theme updates.
*   **Key Entry**: [d2_diagram_optimization.md](d2_diagram_optimization.md)

## State Persistence and Storage
The project utilizes a unified persistence strategy to manage user preferences and interactive state across sessions.

*   **Centralized Management**: All persistence logic is encapsulated in `src/utils/storage.ts`, utilizing a single localStorage key: `gsalvini-se-blog`.
*   **Data Schema**: The `PersistedState` interface tracks:
    *   `theme` (Light/Dark mode)
    *   `matrixBackgroundVisible` (Visual effects toggle)
    *   `convergentEnvelopeMode` (Harness engineering framework state)
    *   `checklists` (User progress tracking)
*   **Operational Rules**:
    *   **Consistency**: State modifications must use the `updateStorage` helper to maintain read-modify-write integrity.
    *   **SSR Safety**: All storage operations include checks for `window !== undefined` to prevent errors during Astro build-time/server-side rendering.
    *   **Migration**: The system includes logic to migrate legacy keys (e.g., `theme`, `matrix-background-visible`) into the unified store.
*   **Key Entry**: [state_persistence_and_storage.md](state_persistence_and_storage.md)
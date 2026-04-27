---
children_hash: 51fc592ef6fee59936298a7ee5d7af93c6f09a841a67afbc59a77bb14e876063
compression_ratio: 0.5065434949961509
condensation_order: 1
covers: [d2_diagram_optimization.md, state_persistence_and_storage.md]
covers_token_total: 1299
summary_level: d1
token_count: 658
type: summary
---
# Architecture and State Management Overview

This domain covers the technical foundations for interactive diagram rendering and unified state persistence within the Astro-based blog architecture.

## D2 Diagram Optimization
The system implements a high-performance, three-tier rendering architecture for D2 diagrams, focusing on bundle size optimization and real-time theme synchronization.

*   **Architecture & Flow**: Uses a detection-transformer-renderer pattern. `BlogPost.astro` detects `[data-d2-diagram="true"]` markers and triggers a dynamic import of `D2DiagramsTransformer.tsx`, which hydrates the `D2DiagramRenderer.tsx` React component.
*   **Performance Optimization**:
    *   **Lazy Loading**: The ~8MB D2 WASM module is isolated into a `manualChunk` named `d2-wasm` and loaded only when required.
    *   **Build Configuration**: `astro.config.mjs` increases `chunkSizeWarningLimit` to 8500 to accommodate WASM assets.
    *   **Singleton Pattern**: Uses `d2ModulePromise` to ensure the module is imported only once per session.
*   **Interactive Features**: Supports SVG post-processing for transparent backgrounds and interactive pan/zoom functionality.
*   **Theme Sync**: Utilizes a `MutationObserver` on `document.documentElement` to monitor `data-theme` changes and update diagram visuals in real-time.
*   **Key Files**: `src/components/D2DiagramRenderer.tsx`, `src/components/D2DiagramsTransformer.tsx`, `src/layouts/BlogPost.astro`.
*   **Reference**: [d2_diagram_optimization.md](d2_diagram_optimization.md)

## State Persistence and Storage
A centralized persistence strategy ensures consistent user preferences and component states across sessions using a unified storage schema.

*   **Centralized Management**: All state is stored under a single `localStorage` key (`gsalvini-se-blog`) to prevent namespace clutter.
*   **Schema & Interface**: The `PersistedState` interface in `src/utils/storage.ts` defines the structure for:
    *   `theme` (light/dark)
    *   `matrixBackgroundVisible`
    *   `convergentEnvelopeMode`
    *   `checklists` (interactive progress)
*   **Operational Rules**:
    *   **Consistency**: Modifications must use the `updateStorage` helper to maintain read-modify-write integrity.
    *   **SSR Safety**: All storage operations include `window` checks to prevent errors during Astro's build-time/server-side rendering.
    *   **Migration**: Includes logic to migrate legacy keys into the unified storage object.
*   **Key Files**: `src/utils/storage.ts`, `src/layouts/Base.astro`.
*   **Reference**: [state_persistence_and_storage.md](state_persistence_and_storage.md)
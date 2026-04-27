### Key Points
* **Lazy Loading Strategy**: D2 WASM (~8MB) is excluded from the main bundle and only loaded dynamically when a `[data-d2-diagram]` marker is detected on a page.
* **Three-Tier Architecture**: Implementation uses an Astro layout for detection, a transformer utility for hydration, and a React renderer for WASM interaction.
* **Vite Optimization**: Configures `manualChunks` to isolate D2 into a `d2-wasm` chunk and increases `chunkSizeWarningLimit` to 8500 to accommodate the large binary.
* **Theme Synchronization**: Uses a `MutationObserver` on `document.documentElement` to track `data-theme` changes and update diagram styles in real-time.
* **SVG Post-Processing**: The renderer automatically modifies generated SVGs to ensure transparent backgrounds and supports interactive pan/zoom functionality.

### Structure / Sections Summary
* **Reason & Raw Concept**: Defines the core task of optimizing D2 in Astro. Lists modified files and outlines the technical flow from detection to SVG rendering.
* **Narrative**: 
    * **Structure**: Explains the relationship between the Astro layout, the transformer, and the React renderer.
    * **Highlights**: Focuses on bundle size optimization and interactive features.
    * **Rules**: Establishes mandatory data attributes (`data-d2-diagram`, `data-d2-code`, `data-d2-processed`) for the hydration lifecycle.
* **Facts**: Provides granular technical details, including specific Vite settings, the use of a singleton promise for module loading, and decoding methods for WASM responses.

### Notable Entities, Patterns, and Decisions

#### Entities
* **`@terrastruct/d2`**: The WASM-based engine used for diagram generation.
* **`D2DiagramRenderer`**: A React component that manages the D2 lifecycle, pan/zoom state, and theme syncing.
* **`D2DiagramsTransformer`**: A utility that finds DOM containers and triggers React hydration.
* **`BlogPost.astro`**: The entry point layout that conditionally imports the transformer.

#### Patterns
* **Marker-Based Hydration**: Uses `[data-d2-diagram="true"]` to identify targets and `[data-d2-processed="true"]` to prevent duplicate hydration cycles.
* **Singleton Promise**: Employs `d2ModulePromise` to ensure the heavy D2 module is only imported once across the application lifecycle.
* **Observer Pattern**: Utilizes `MutationObserver` to listen for global theme changes, ensuring diagrams match the site's light/dark mode.

#### Technical Decisions
* **Manual Chunking**: Explicitly assigned `@terrastruct/d2` to a named Vite chunk (`d2-wasm`) for better caching and load control.
* **WASM Limit Adjustment**: Increased the `chunkSizeWarningLimit` in `astro.config.mjs` to suppress warnings caused by the 8MB D2 binary.
* **SVG Manipulation**: Chose to post-process the D2 output (replacing the first `<rect>` fill) rather than relying on D2 DSL for transparency.
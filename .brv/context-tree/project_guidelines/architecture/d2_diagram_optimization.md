---
title: D2 Diagram Optimization
summary: D2 diagram lazy loading, Vite chunk optimization, and React renderer architecture with theme synchronization.
tags: []
related: []
keywords: []
createdAt: '2026-04-27T16:33:41.525Z'
updatedAt: '2026-04-27T16:33:41.525Z'
---
## Reason
Document D2 diagram lazy loading and optimization strategy

## Raw Concept
**Task:**
Implement and optimize D2 diagram rendering in Astro

**Changes:**
- Implemented lazy loading for D2 diagrams via BlogPost layout
- Added D2DiagramRenderer React component with theme sync
- Configured Vite manualChunks for D2 WASM and dependencies
- Increased chunkSizeWarningLimit for WASM support

**Files:**
- astro.config.mjs
- src/components/D2DiagramRenderer.tsx
- src/components/D2DiagramsTransformer.tsx
- src/layouts/BlogPost.astro

**Flow:**
BlogPost detects [data-d2-diagram] -> dynamic import D2DiagramsTransformer -> find containers -> hydrate D2DiagramRenderer -> dynamic import @terrastruct/d2 -> render SVG

**Timestamp:** 2026-04-27

## Narrative
### Structure
The architecture uses a three-tier approach: (1) Astro layout detection, (2) a transformer utility for hydration, and (3) a React renderer for the actual D2/WASM interaction.

### Dependencies
Depends on @terrastruct/d2 (WASM), React (for renderer), and Astro (for layout and page lifecycle).

### Highlights
Optimizes bundle size by keeping D2 WASM (~8MB) out of the main entry point; synchronizes themes in real-time via MutationObserver; supports interactive pan/zoom.

### Rules
Rule 1: Always use [data-d2-diagram="true"] marker for hydration. Rule 2: Store D2 DSL in [data-d2-code] attribute. Rule 3: Use [data-d2-processed="true"] to prevent double hydration.

### Examples
Lazy loading script in BlogPost.astro checks for querySelector('[data-d2-diagram="true"]') before importing the transformer.

## Facts
- **Chunk Loading**: D2 is lazily loaded only on pages with diagram markers to optimize chunk loading.
- **D2DiagramRenderer**: D2DiagramRenderer dynamic-imports @terrastruct/d2 at runtime.
- **astro.config.mjs**: The chunkSizeWarningLimit in astro.config.mjs is raised to 8500 to accommodate WASM chunks.
- **manualChunks**: The @terrastruct/d2 module is assigned to a manual chunk named d2-wasm.
- **D2DiagramRenderer**: D2DiagramRenderer uses a singleton promise named d2ModulePromise to ensure the D2 module is imported only once.
- **D2DiagramRenderer**: Theme detection is implemented by observing the data-theme attribute on document.documentElement using a MutationObserver.
- **D2DiagramRenderer**: The renderer post-processes SVGs to make backgrounds transparent by replacing the first <rect> fill with 'transparent'.
- **D2DiagramRenderer**: D2DiagramRenderer supports pan and zoom interactions with defined constants for min, max, and step values.
- **D2DiagramsTransformer**: D2DiagramsTransformer identifies target elements using the [data-d2-diagram="true"] attribute.
- **Attributes**: The [data-d2-processed="true"] attribute is used as a marker to prevent double hydration of diagrams.
- **BlogPost.astro**: BlogPost layout uses an inline module script to load the transformer only if diagram markers are present on the page.
- **D2DiagramsTransformer**: D2 DSL code is extracted from the [data-d2-code] attribute of the container element.
- **D2DiagramRenderer**: The renderer handles edge cases where d2.render() returns a compiled object instead of an SVG by resetting the instance.
- **D2DiagramRenderer**: Uint8Array or Blob responses from the D2 renderer are decoded using TextDecoder.
- **Attributes**: The [data-theme] root attribute is used to synchronize diagram themes between light and dark modes.

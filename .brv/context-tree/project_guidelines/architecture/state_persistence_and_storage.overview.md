### Key Points
* **Centralized Management:** All application state is persisted under a single `localStorage` key (`gsalvini-se-blog`) to minimize namespace clutter.
* **State Schema:** The system tracks themes, matrix background visibility, convergent envelope mode, and checklist progress via a `PersistedState` interface.
* **SSR Compatibility:** Implementation includes checks for `window === undefined` to ensure compatibility with Astro's server-side rendering and build processes.
* **Consistency Pattern:** Employs a strict "read-modify-write" flow using an `updateStorage` helper to prevent state desynchronization.
* **Legacy Support:** Includes built-in migration logic to transition data from older, individual keys (e.g., `theme`, `matrix-background-visible`) to the new unified structure.

### Structure Summary
* **Reason:** Defines the goal of documenting a unified persistence strategy.
* **Raw Concept:** Lists technical implementation details, including affected files (storage utils, UI components, layouts) and the operational data flow.
* **Narrative:** Explains the architectural logic, highlighting the centralized schema and safety rules for developers.
* **Facts:** Provides specific technical identifiers for the storage key and the properties contained within the state object.

### Notable Entities, Patterns, and Decisions
* **Entities:** 
    * `gsalvini-se-blog`: The primary centralized `localStorage` key.
    * `PersistedState`: The TypeScript interface defining the storage schema.
* **Patterns:**
    * **Read-Modify-Write:** Enforced via the `updateStorage` helper to ensure consistency when updating the state object.
    * **SSR Guard:** Conditional checks for the `window` object to prevent execution errors during Astro build-time or server-side execution.
* **Decisions:**
    * **Unified Key Strategy:** Moving away from multiple discrete keys to a single JSON-serialized object.
    * **Migration Logic:** Explicitly handling legacy keys to ensure a seamless user experience during the transition to the unified system.
    * **Centralized Logic:** Logic is isolated in `src/utils/storage.ts` rather than being scattered across UI components.
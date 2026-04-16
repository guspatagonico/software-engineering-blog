### Key Points
*   **Exclusive Package Management:** The project strictly requires `pnpm`; the use of `npm` or `yarn` is prohibited.
*   **Hybrid Architecture:** Utilizes Astro for routing and static page generation, while leveraging React "islands" for complex client-side interactivity.
*   **Strict Quality Gates:** Mandatory execution of `pnpm lint` and `pnpm typecheck` is required before any code commits.
*   **Standardized Tooling:** Testing is split between Vitest (unit/integration) and Playwright (E2E), with Prettier enforcing specific formatting rules.
*   **Path Aliasing:** All cross-folder imports must use the `@/` path alias to maintain clean and relocatable module references.

### Structure Summary
*   **Reason & Raw Concept:** Outlines the motivation for standardizing the workflow (derived from `AGENTS.md`) and lists the primary files affected (`package.json`).
*   **Narrative:** 
    *   *Structure:* Details the standard command lifecycle (install, dev, build, etc.).
    *   *Highlights:* Defines the relationship between Astro and React.
    *   *Rules:* Establishes the core constraints for developers.
    *   *Examples:* Provides specific syntax for targeted testing.
*   **Facts:** A technical breakdown of the environment settings, including TypeScript strict mode and specific Prettier configurations (2-space indent, single quotes).

### Notable Entities, Patterns, and Decisions

#### Entities
*   **pnpm:** The sole authorized package manager.
*   **Astro:** The primary framework for routing and static content.
*   **React:** Used specifically for interactive "islands."
*   **Vitest & Playwright:** The designated testing frameworks.

#### Patterns
*   **Island Architecture:** Combining static HTML (Astro) with isolated interactive components (React).
*   **Standardized Workflow:** A linear progression from installation to build: `install` → `dev` → `lint` → `typecheck` → `build`.
*   **Path Aliasing:** Use of `@/` for internal module resolution.

#### Decisions
*   **Strict TypeScript:** Enabled and enforced across the entire codebase.
*   **Pre-Commit Requirements:** Linting and type-checking are non-optional steps in the development lifecycle.
*   **Formatting Constraints:** Explicit enforcement of 2-space indentation and `es5` trailing commas.
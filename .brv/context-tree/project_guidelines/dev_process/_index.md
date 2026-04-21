---
children_hash: 6c6902134f5373091a89fea243bb29dab94f4e5d283c58a152bff9866a9cbd2b
compression_ratio: 0.2428529325081049
condensation_order: 1
covers: [agent_guidelines_and_workflow.md, astro_to_mdx_conversion_pattern.md, context.md, development_process_and_rules.md, project_workflow_and_commands.abstract.md, project_workflow_and_commands.md, project_workflow_and_commands.overview.md]
covers_token_total: 3393
summary_level: d1
token_count: 824
type: summary
---
# Development Process and Workflow Summary (d1)

The development process for the SE Blog project is a standardized, high-integrity workflow centered on an Astro + React hybrid architecture, strict TypeScript enforcement, and automated quality gates.

## Core Architecture and Frameworks
*   **Hybrid Island Architecture**: The project uses **Astro** for routing and static content, reserving **React** "islands" exclusively for interactive elements.
*   **Package Management**: **pnpm** is the exclusive package manager; `npm` and `yarn` are strictly prohibited.
*   **TypeScript Standards**: Strict mode is mandatory. Developers must use `interface` for prop definitions and strictly avoid the `any` type.
*   **Path Aliasing**: All cross-folder imports must utilize the `@/` alias for clean module resolution.
*   **Persistence**: `LocalStorage` is the designated driver for theme persistence (dark/light mode).

## Development Workflow and Git Policy
*   **Command Lifecycle**: The standard progression is `pnpm install` → `pnpm dev` → `pnpm lint` → `pnpm typecheck` → `pnpm build`.
*   **Git Worktrees**: Complex features, refactors, or exploratory work must be performed in the `.worktrees/` directory. Trivial fixes may be applied directly to `main`.
*   **Quality Gates**: Execution of `pnpm lint` and `pnpm typecheck` is mandatory before every commit.
*   **Commits and PRs**: The project enforces **Conventional Commits** and requires the **GitHub CLI (gh)** for managing pull requests and repository actions.
*   **Testing**: Unit and integration testing are handled by **Vitest**, while E2E testing is performed via **Playwright**.

## Blog Post Standards and Conversion
*   **MDX Transition**: Posts are transitioning from `.astro` to `.mdx` format.
*   **Structural Requirements**:
    *   Every post must utilize the `BlogPost` layout and the `SectionNav` component (with `client:load`).
    *   MDX posts must export a `sections` array and wrap all panels in a `<div class="content">`.
    *   Panels must follow the naming convention `id="panel-{section.id}"`, with the first panel assigned the `panel active` class.
*   **Asset Management**: Post-specific assets reside in `src/assets/posts/<slug>/`. Local images must use the Astro `<Image />` component.
*   **Integration**: Every new post requires a corresponding homepage card entry in `src/pages/index.astro`.

## Security and Environment Rules
*   **Secrets Policy**: Committing API keys, `.env` files, or credentials is strictly prohibited.
*   **Vite Configuration**: Modification of the `vite.config.mjs` server block (specifically `host` and `allowedHosts`) is prohibited to maintain environment stability.
*   **Safety**: Destructive git commands (force push, hard reset) are prohibited unless explicitly instructed.

## Reference Entries
*   **agent_guidelines_and_workflow.md**: Detailed agent-specific instructions and UI/UX constraints (e.g., approved icon sets).
*   **development_process_and_rules.md**: Core repository-wide conventions, naming standards, and error-handling expectations.
*   **astro_to_mdx_conversion_pattern.md**: Technical specifications for converting legacy Astro posts to the new MDX format.
*   **project_workflow_and_commands.md**: Standardization of build, test, and formatting commands.
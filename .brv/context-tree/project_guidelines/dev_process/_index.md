---
children_hash: 3efa55f834ac5ef331be60d9297066ed3316e1f4bf415970b7fc6aa8538f371b
compression_ratio: 0.5065502183406113
condensation_order: 1
covers: [context.md, development_process_and_rules.md, project_workflow_and_commands.md]
covers_token_total: 1374
summary_level: d1
token_count: 696
type: summary
---
# Domain: dev_process

The development process domain centralizes repository-wide standards for code style, architectural patterns, security, and git workflows. It ensures consistency across the Astro-based blog platform through strict tooling enforcement and specialized agent orchestration.

## Core Development Standards
Detailed in **development_process_and_rules.md** and **project_workflow_and_commands.md**:
*   **Tooling**: **pnpm** is the exclusive package manager. **TypeScript strict mode** is mandatory, utilizing interfaces for prop typing and prohibiting `any`.
*   **Code Style**: 2-space indentation, single quotes, and ES5 trailing commas.
*   **Import Ordering**: 
    1. Node/external libraries
    2. Astro framework imports
    3. `@/` path aliases
    4. Relative imports within the feature folder.
*   **Naming Conventions**: Strict patterns are defined for components, hooks, utilities, stores, CSS modules, constants, and types.

## Architectural Patterns
Referenced in **context.md** and **development_process_and_rules.md**:
*   **Component Strategy**: Astro components are used for static content, while React islands (using `client:load`) handle complex interactivity.
*   **Persistence**: LocalStorage drives dark/light mode state.
*   **Interactive Posts**: Interactive blog posts must utilize the `SectionNav` component.
*   **Agent Orchestration**: Complex work is managed via a parallel task dispatcher, splitting tasks between specialized agents such as `@component-builder` and `@blog-writer`.

## Workflow and Git Policy
Outlined in **development_process_and_rules.md** and **project_workflow_and_commands.md**:
*   **Git Worktrees**: Mandatory for new features, refactors, and exploratory work; direct commits to `main` are reserved for trivial fixes.
*   **Pre-commit Requirements**: `pnpm lint`, `pnpm typecheck`, and relevant tests must pass before any commit.
*   **PR Process**: PRs are created via the **gh CLI** only after automated checks pass.
*   **Commit Policy**: No commits or pushes should occur until explicit user authorization is provided.

## Security and Project Rules
Preserved in **development_process_and_rules.md**:
*   **Secrets**: Strict prohibition against committing API keys, `.env` files, or secrets.
*   **Server Config**: The `vite.config.mjs` server block (host: `0.0.0.0`, allowedHosts: `["galadriel"]`) must remain unmodified.
*   **Error Handling**: Errors must never be swallowed; explicit handling is required.

## Command Reference
Summarized in **project_workflow_and_commands.md**:
*   **Lifecycle**: `pnpm install` → `pnpm dev` → `pnpm lint` → `pnpm typecheck` → `pnpm build`.
*   **Testing**: Vitest and Playwright are used for testing; single file tests are run via `pnpm test -- path/to/file.test.ts`.
---
children_hash: c01b313d15706653075148aad717dc25e32462856abfb3737db0460cff7a12ed
compression_ratio: 0.5077220077220077
condensation_order: 1
covers: [build_and_run_commands.md, context.md, production_asset_upload.md]
covers_token_total: 1036
summary_level: d1
token_count: 526
type: summary
---
# Domain: run_commands

This domain defines the standardized execution environment for the Software Engineering blog, covering local development, quality assurance, and production deployment workflows.

## Core Package Management and Scripts
The project enforces **pnpm** as the exclusive package manager for all lifecycle phases. All commands must be executed via pnpm to ensure dependency consistency across local and CI environments.

*   **Development & Build**: `pnpm dev` launches the Astro server at `localhost:4321`. Production cycles utilize `pnpm build` followed by `pnpm preview`.
*   **Quality Control**: Standardized scripts exist for `pnpm lint`, `pnpm typecheck`, and `pnpm format`.
*   **Drill-down**: See `build_and_run_commands.md` for the full script manifest and `context.md` for topic overview.

## Testing Architecture
The testing suite is bifurcated into unit and end-to-end (E2E) layers, primarily driven by Vitest and Playwright.

*   **Unit/Regression**: Managed by **Vitest** via `pnpm test`. Supports watch mode (`pnpm test:watch`) and filtering via path or `-t` substring matching.
*   **E2E**: Managed by **Playwright** via `pnpm test:e2e`.
*   **Drill-down**: Detailed authoring strategies are located in `build_and_run_commands.md`.

## Production Deployment Workflow
Production asset management is handled through a specialized interactive command structure.

*   **Asset Upload**: The `/dist-upload` command (configured in `.opencode/commands/dist-upload.md`) executes `gsupload -b frontend *` from the project root.
*   **Interactive Handling**: The workflow specifically supports interactive confirmation relaying. The system detects prompts from `gsupload`, relays them to the user, and pipes responses back to the process.
*   **Drill-down**: See `production_asset_upload.md` for exact execution rules and configuration paths.

## Key Relationships
*   **Process Integration**: These commands implement the standards defined in `project_guidelines/dev_process`.
*   **Configuration**: Primary command definitions reside in `package.json` and `.opencode/commands/`.
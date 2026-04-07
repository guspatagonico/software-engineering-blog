---
children_hash: 8e6b567611e392eaf43e5da1e2530a0ed2d19fb5682ea90180f81c4bf348f512
compression_ratio: 0.5438311688311688
condensation_order: 1
covers: [build_and_run_commands.md, context.md]
covers_token_total: 616
summary_level: d1
token_count: 335
type: summary
---
## Domain-Level Structural Summary: `project_guidelines/run_commands`

### Overview
- **Purpose:** Capture all pnpm-centric commands for dependency management, development flows, and automated checks on the Software Engineering blog repository.
- **Key Flow:** `pnpm install` → `pnpm dev` for local work → `pnpm build`/`pnpm preview` for production artifacts → linting/formatting/typechecking commands → `pnpm test` variants (unit + Playwright) for verification.

### Command Families (see `build_and_run_commands.md`)
- **Setup & Development:** `pnpm install` locks dependencies via `pnpm-lock.yaml`; `pnpm dev` launches Astro on `localhost:4321`.
- **Production Build & Preview:** Scripts documented in `package.json` cover build artifacts and preview runs.
- **Quality Gates:** `pnpm lint`, `pnpm format`, and `pnpm typecheck` ensure stylistic and static correctness; all must use pnpm (npm/yarn prohibited).
- **Testing Strategy:** Vitest powers `pnpm test` with path filtering, pattern matching, and watch mode; Playwright end-to-end suites run through `pnpm test:e2e`.

### Context & Relationships (see `context.md`)
- Reinforces the pnpm-only policy and enumerates the key scripts (install, dev, build/preview, lint/typecheck/format, Vitest+Playwright tests).
- References related process guidance in `project_guidelines/dev_process`.
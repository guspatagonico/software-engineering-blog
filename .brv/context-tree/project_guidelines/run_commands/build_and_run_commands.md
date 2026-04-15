---
title: Build and Run Commands
tags: []
keywords: []
importance: 59
recency: 1
maturity: draft
accessCount: 3
createdAt: '2026-04-06T17:42:32.225Z'
updatedAt: '2026-04-06T17:42:32.225Z'
---
## Raw Concept
**Task:**
Document the pnpm-based build, lint, test, and run commands that contributors must use when working on the Software Engineering blog.

**Changes:**
- Established pnpm as the exclusive package manager for all local and CI commands.
- Described the pnpm scripts for dependency install, dev server, production build/preview, formatting, linting, and typechecking.
- Captured the test authoring strategy with Vitest and Playwright entry points.

**Files:**
- package.json
- pnpm-lock.yaml

**Flow:**
pnpm install → pnpm dev for local development; when ready, run pnpm build, pnpm preview, pnpm lint/typecheck/format, and execute pnpm test variants for coverage; Playwright scenarios execute via pnpm test:e2e.

**Timestamp:** 2026-04-06

## Narrative
### Structure
The repo uses pnpm scripts grouped by purpose: install, dev, build/preview, formatting/linting/typechecking, and testing. Contributors should check package.json before running any script to confirm that the arguments match the current release.

### Dependencies
Vitest drives unit/regression tests, while Playwright runs end-to-end suites; pnpm ensures consistent dependency resolution.

### Highlights
Commands must always be executed through pnpm rather than npm or yarn. pnpm dev launches the Astro site on localhost:4321. pnpm test supports filtering by file path or test name and offers watch and Playwright variants for rapid feedback.

## Facts
- **package_manager**: pnpm is the only supported package manager for install, dev, build, preview, lint, format, and typecheck flows. [project]
- **testing_framework**: Vitest runs via pnpm test with optional path filters or -t substring matching; pnpm test:watch runs Vitest in watch mode and pnpm test:e2e drives Playwright. [project]
- **dev_server**: pnpm dev starts the Astro dev server on localhost:4321 after pnpm install installs dependencies. [environment]

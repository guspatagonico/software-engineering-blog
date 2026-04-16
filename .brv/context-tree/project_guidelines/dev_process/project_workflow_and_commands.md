---
title: Project Workflow and Commands
summary: Project uses pnpm, Astro + React islands, and strict TypeScript. Guidelines cover build/test commands, code style, and naming conventions.
tags: []
keywords: []
importance: 50
recency: 1
maturity: draft
createdAt: '2026-04-16T11:44:12.554Z'
updatedAt: '2026-04-16T11:44:12.554Z'
---
## Reason
Standardizing build, run, and workflow commands from AGENTS.md

## Raw Concept
**Task:**
Define project build, test, and style guidelines

**Changes:**
- Consolidated build and run commands
- Documented code style and naming conventions

**Files:**
- AGENTS.md
- package.json

**Flow:**
pnpm install -> pnpm dev -> pnpm lint -> pnpm typecheck -> pnpm build

**Timestamp:** 2026-04-16

## Narrative
### Structure
Build commands using pnpm: install, dev, build, preview, lint, typecheck, format. Testing uses Vitest and Playwright.

### Highlights
Astro for routing and static pages, React for complex interactivity. Strict TypeScript and Prettier enforcement.

### Rules
Rule 1: Use pnpm only.
Rule 2: Run pnpm lint and pnpm typecheck before committing.
Rule 3: Use @/ path alias for cross-folder imports.

### Examples
pnpm test -- path/to/file.test.ts (single file test)

## Facts
- **package_manager**: The project uses pnpm as the exclusive package manager; npm and yarn are prohibited. [convention]
- **typescript_mode**: TypeScript strict mode is enabled and enforced across the codebase. [project]
- **formatting**: The project uses a 2-space indentation, single quotes, and es5 trailing commas. [convention]

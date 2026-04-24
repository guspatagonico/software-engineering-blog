---
title: Development Process and Rules
tags: []
keywords: []
importance: 100
recency: 1
maturity: core
accessCount: 38
createdAt: '2026-04-06T17:42:32.228Z'
updatedAt: '2026-04-06T17:42:32.228Z'
---
## Raw Concept
**Task:**
Document repository-wide development conventions, security rules, agent orchestration guidance, and git workflow so contributors understand what is enforced beyond feature code.

**Changes:**
- Mandated 2-space indentation, single quotes, trailing commas, and interface-based prop typing with co-located tests/styles.
- Clarified naming conventions for components, hooks, utilities, stores, CSS modules, constants, and types.
- Outlined error handling expectations, Astro-specific requirements, and the prohibition against committing secrets.
- Captured instructions on dispatcher-style parallel task execution, specialized agents, git worktree usage, and PR creation via gh.

**Files:**
- AGENTS.md
- package.json

**Flow:**
Adhere to the code style rules → run pnpm lint/typecheck/format → run necessary tests → commit with a conventional commit message → push from the git worktree → use gh pr create after the branch passes automated checks → remove the worktree after merge.

**Timestamp:** 2026-04-06

## Narrative
### Structure
The AGENTS manifesto breaks down into sections covering style, imports, components, naming, types, error handling, Astro-specific notes, security/project rules, parallel task patterns, custom agents, and the git/worktree workflow.

### Dependencies
Relies on pnpm, ESLint with @astrojs/eslint-plugin and eslint-plugin-react-hooks, TypeScript, Astro layouts, and gh CLI for PR management.

### Highlights
Use SectionNav with client:load for interactive posts, keep shared components co-located with their tests and styles, never swallow errors, and keep the vite.config.mjs server block intact. Create all git worktrees under `[project]/.worktrees/` for new features, complex refactors, and explorations. The parallel task dispatcher encourages splitting complex work into subagents like @component-builder and @blog-writer. Secrets stay out of the repo, and commit/push waits until the user explicitly gives the go-ahead.

### Rules
Rule 1: Never commit API keys, secrets, or .env files. Rule 2: Do not remove or modify the vite.config.mjs server block (host: "0.0.0.0", allowedHosts: ["galadriel"]). Rule 3: Never push or commit until the user explicitly asks. Rule 4: Use git worktrees for new features, complex refactors, and exploratory work; create them under `[project]/.worktrees/`; trivial fixes can touch main. Rule 5: Run pnpm lint and pnpm typecheck before every commit and create PRs via gh CLI.

## Facts
- **typescript_strict_mode**: TypeScript strict mode is enabled for all code, and components use interfaces for props while avoiding any. [project]
- **import_order**: Import order must be: Node/external libs, Astro framework imports, @/ alias paths, then relative imports within the same feature folder. [convention]
- **git_worktree_policy**: Use git worktrees for new features, complex refactors, and explorations; trivial fixes may be done directly on main. Create worktrees under `[project]/.worktrees/`. [convention]
- **pre_commit_checks**: Before committing, run pnpm lint, pnpm typecheck, and any relevant tests; use gh CLI to create PRs only after the branch passes verification. [convention]
- **secrets_policy**: Never commit API keys, secrets, or .env files, and keep the vite.config.mjs server block (host: "0.0.0.0", allowedHosts: ["galadriel"]). [project]
- **component_split**: LocalStorage drives persistence for dark/light mode; the team prefers Astro components for static content and React islands for interactive widgets. [environment]

---
title: Agent Guidelines and Workflow
tags: []
keywords: []
importance: 50
recency: 1
maturity: draft
createdAt: '2026-04-20T17:10:59.923Z'
updatedAt: '2026-04-20T17:10:59.923Z'
---
## Raw Concept
**Task:**
Define core development guidelines and agent workflow for the SE Blog project

**Files:**
- AGENTS.md
- package.json
- src/pages/index.astro

**Flow:**
Code changes -> pnpm lint/typecheck -> local verification (port 4321) -> Conventional Commits -> gh PR

**Timestamp:** 2026-04-20

## Narrative
### Structure
The project follows a strict Astro + React architecture with pnpm as the sole package manager. Core directories include src/pages (routes), src/layouts (base/blog), src/components (shared UI), and src/assets/posts (post-specific assets).

### Highlights
Emphasis on pnpm exclusivity, worktree usage for complex tasks, and strict blog post structure (SectionNav/Panels). Security boundaries prohibit secret exposure and process-kill commands.

### Rules
1. Use pnpm for all lifecycle commands (install, lint, typecheck, format, test).
2. Every blog post must use BlogPost layout + SectionNav component (client:load).
3. Panels must use id="panel-{section.id}"; the first panel must have class="panel active".
4. SectionNav icons must be selected from the approved set: ◈ ▸ ▣ ◑ ⊕ ⬡ → ⟳ ✓ ≡ ∑ 👤 🧠 ⚙ ✦ ⚠ ⧉.
5. New posts require a homepage card entry in src/pages/index.astro.
6. Local testing URL: http://localhost:4321/software-engineering.
7. Use .worktrees/ directory for complex or exploratory work.
8. Mandatory pre-commit checks: pnpm lint and pnpm typecheck.
9. Use Conventional Commits and gh CLI for repo actions.
10. Prefer Astro components; use React only for interactive islands.
11. Use interfaces for props; strictly avoid "any".
12. Do not modify Vite server host/allowedHosts settings.
13. Do not use destructive git commands (force push/hard reset) or commit secrets.

## Facts
- **pnpm**: Use pnpm exclusively for all package management tasks including install, lint, typecheck, format, and tests; npm and yarn are strictly prohibited.
- **Worktrees**: Worktrees for complex, destructive, or exploratory work must be created under the [project]/.worktrees directory; trivial fixes can be performed directly on the main branch.
- **Components**: Every blog post must utilize the BlogPost layout and the SectionNav component with the client:load directive.
- **Assets**: Post-specific assets must be stored in src/assets/posts/<slug>/ and local images must be rendered using the <Image /> component from astro:assets.
- **UI/UX**: Section panels must use the naming convention id="panel-{section.id}", with the initial panel assigned the "panel active" class.
- **Icons**: Icons for SectionNav must be restricted to the following set: ◈ ▸ ▣ ◑ ⊕ ⬡ → ⟳ ✓ ≡ ∑ 👤 🧠 ⚙ ✦ ⚠ ⧉.
- **Integration**: A corresponding homepage card entry must be added to src/pages/index.astro for every new blog post created.
- **Quality Control**: Mandatory verification steps before committing include running pnpm lint and pnpm typecheck.
- **Git**: Use the GitHub CLI (gh) for managing pull requests and repository actions, and follow Conventional Commits for all messages.
- **Frameworks**: Prefer Astro components for static content, reserving React islands only for necessary interactive elements.
- **TypeScript**: Maintain strict TypeScript standards by using interface for prop definitions and avoiding the any type.
- **Directory Map**: The repository structure follows: src/pages/ for routes, src/layouts/ for layouts, src/components/ for shared UI, src/styles/ for global CSS, and public/ for global static assets.
- **Protection**: Do not commit secrets, .env files, or credentials, and avoid using destructive git commands like force push or hard reset unless explicitly instructed.
- **Vite**: Modification of the Vite server block (specifically host and allowedHosts) in vite.config is prohibited.
- **Dev Server**: Use the existing local testing server at http://localhost:4321/software-engineering instead of starting new dev server processes like pnpm dev or pnpm build unless requested.

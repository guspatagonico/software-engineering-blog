# AGENTS.md — Software Engineering Blog

## Project Overview

Interactive Software Engineering blog with data visualizations, charts, tables, math
expressions, architecture diagrams, and dark/light mode.  
Astro framework with React islands for interactive components.

### Author

Gustavo Adrián Salvini · guspatagonico@gmail.com · https://github.com/guspatagonico

---

## Build & Run Commands

Uses **pnpm** (never npm/yarn).

```bash
pnpm install          # install dependencies
pnpm dev              # start dev server (Astro on localhost:4321)
pnpm build            # production build → dist/
pnpm preview          # serve production build locally
pnpm lint             # run ESLint + Prettier check
pnpm lint:fix         # auto-fix lint issues
pnpm typecheck        # run astro check + tsc --noEmit
pnpm format           # run Prettier on src/
```

### Testing

```bash
pnpm test             # run all tests (Vitest)
pnpm test -- path/to/file.test.ts        # single test file
pnpm test -- -t "test name substring"     # single test by name
pnpm test:watch       # Vitest in watch mode
pnpm test:e2e         # Playwright end-to-end
```

No test framework assumed — check `package.json` scripts before running.

---

## Architecture

### Routing (Astro file-based)

| Path         | Type           | Notes                       |
| ------------ | -------------- | --------------------------- |
| `/about`     | Static page    |                             |
| `/now`       | Static page    |                             |
| `/contact`   | Static + form  | Links to github, x.com, gustavosalvini.com.ar |
| `/blog`      | Posts loop     |                             |
| `/blog/{slug}` | Single post  | MDX content + React islands |

### Component structure

```
src/
  components/     # React (.tsx) and Astro (.astro) components
  layouts/        # page layouts
  pages/          # Astro routes
  content/        # MDX blog posts (content collections)
  styles/         # global CSS / design tokens
  stores/         # Zustand stores
  utils/          # pure helper functions
  lib/            # external integrations
```

### State Management

- **Zustand** for React component state.
- **localStorage** for persistence (dark/light mode toggle, etc.) — no cookies.
- Avoid global Astro state; prefer props and content collections.

---

## Code Style

### General

- TypeScript strict mode enabled.
- 2-space indentation, single quotes, trailing commas (es5).
- Prettier enforces formatting — run `pnpm format` before committing.
- ESLint with `@astrojs/eslint-plugin` and `eslint-plugin-react-hooks`.

### Imports

```ts
// 1. Node / external libs
import { z } from 'zod';

// 2. Astro framework
import { Image } from 'astro:assets';

// 3. Internal aliases (@/ = src/)
import type { Post } from '@/types';
import { formatDate } from '@/utils/date';
import ThemeToggle from '@/components/ThemeToggle';

// 4. Relative (only within the same feature folder)
import { useChartConfig } from './hooks';
```

Use `@/` path alias for cross-folder imports; relative imports only within the same
feature directory.

### Components

- Astro components (`.astro`) for static content and layouts.
- React components (`.tsx`) only when interactivity is needed (charts, toggles, forms).
- Props typed with `interface`, not `type` — one interface per component.
- Co-locate component, test, and styles: `Button/` → `Button.tsx`, `Button.test.tsx`, `Button.module.css`.

### Naming

| Item          | Convention          | Example              |
| ------------- | ------------------- | -------------------- |
| Components    | PascalCase          | `FunnelChart.tsx`    |
| Hooks         | camelCase w/ `use`  | `useDarkMode.ts`     |
| Utilities     | camelCase           | `formatDate.ts`      |
| Stores        | camelCase           | `themeStore.ts`      |
| CSS modules   | camelCase           | `funnelChart.module.css` |
| Constants     | UPPER_SNAKE_CASE   | `MAX_RETRIES`        |
| Types/Interfaces | PascalCase       | `ChartConfig`        |

### Types

- Prefer `interface` for object shapes; `type` for unions/intersections/aliases.
- Avoid `any` — use `unknown` and narrow. Enable `@typescript-eslint/no-explicit-any`.
- Export types from a barrel `types/index.ts` when shared across modules.
- Use `satisfies` operator for config objects to keep literal types.

### Error Handling

- Use typed error classes (`class AppError extends Error`) for domain errors.
- Wrap async operations in try/catch; surface user-friendly messages.
- Never swallow errors silently — log with context or rethrow.
- In React: use error boundaries for island crash isolation.

### Astro-specific

- Use `<Image />` from `astro:assets` — never raw `<img>` for local images.
- Content collections with Zod schemas for frontmatter validation.
- Define `getStaticPaths()` in dynamic routes; no SSR by default.
- Use `<ViewTransitions />` for SPA-like navigation if enabled in layout.

---

## Security & Project Rules

- **Never** commit API keys, secrets, or `.env` files. Update `.gitignore` accordingly.
- **Never** include agent names in commit messages, co-author trailers, PR text, or docs.
- Do not remove/modify the `server` block in `vite.config.ts` (`host: '0.0.0.0'`,
  `allowedHosts: ['galadriel']`) — LAN dev convenience, must be preserved.

---

## Development Workflow

### Commits

Every commit message **must** follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add funnel chart component
fix: correct dark mode toggle persistence
docs: update AGENTS.md with workflow rules
refactor: extract date formatting utility
chore: bump astro to 4.x
```

Run `pnpm lint` and `pnpm typecheck` before committing.

### Branching Strategy

- **New features or important bugfixes** → create a new branch from `main`.
- **Trivial fixes** (typos, one-liners) → commit directly to `main` with a `fix:` message.
- Branch names should be **short and descriptive**:
  - `feat/funnel-chart`
  - `fix/dark-mode-toggle`
  - `refactor/date-utils`

### PR → Merge Flow

1. Create a branch when the user requests a new feature.
2. Develop on that branch with conventional commits.
3. Open a PR to `main` when ready.
4. Merge the PR to integrate into `main`.
5. Delete the branch after merge.

Do not merge branches without a PR. The user may ask to skip the branch for trivial changes.

---

## Handoffs

Handoff files live in `_handoffs/` and capture the current project state to resume
sessions without divergence.

- **Default naming**: `handoff-{YYYY-MM-DD}-{HH-mm}.md`  
  Example: `handoff-2026-04-01-14-30.md`
- Custom names may be specified when requested.
- Contents: completed tasks, in-progress work, blockers, decisions made, and next steps.

---

## Seed

Use `_seed/harness_engineering.html` as the starting template for new blog posts. It
contains a monolith HTML with embedded CSS and JS — decompose it into Astro components
+ React islands following the architecture above.

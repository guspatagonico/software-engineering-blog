# AGENTS.md — Software Engineering Blog

## Project Overview

Interactive Software Engineering blog. Data viz, charts, tables, math, diagrams, dark/light mode. Astro + React islands.

### Author

Gustavo Adrián Salvini · guspatagonico@gmail.com · https://github.com/guspatagonico

---

## Build & Run Commands

Use **pnpm** (never npm/yarn).

```bash
pnpm install          # install deps
pnpm dev              # dev server (localhost:4321)
pnpm build            # production → dist/
pnpm preview          # serve prod locally
pnpm lint             # ESLint + Prettier check
pnpm lint:fix         # auto-fix lint
pnpm typecheck        # astro check + tsc --noEmit
pnpm format           # Prettier on src/
```

### Testing

```bash
pnpm test             # all tests (Vitest)
pnpm test -- path/to/file.test.ts        # single file
pnpm test -- -t "test name"              # single test
pnpm test:watch       # Vitest watch mode
pnpm test:e2e         # Playwright e2e
```

Check `package.json` scripts before running.

---

## Architecture

### Routing (Astro file-based)

| Path           | Type          | Notes                                         |
| -------------- | ------------- | --------------------------------------------- |
| `/` (homepage) | Posts loop    | Blog is homepage — no `/blog`                 |
| `/about`       | Static page   |                                               |
| `/now`         | Static page   |                                               |
| `/contact`     | Static + form | Links to github, x.com, gustavosalvini.com.ar |
| `/blog/{slug}` | Single post   | Standalone `.astro` files with section nav    |

### Blog post layout convention

Every blog post **must** follow this structure:

```astro
---
import BlogPost from '../../layouts/BlogPost.astro';
import SectionNav from '../../components/SectionNav/SectionNav';

const sections = [
  { id: 'section-one', icon: '◈', label: 'Section One' },
  { id: 'section-two', icon: '▸', label: 'Section Two' },
];
---

<BlogPost title="Post Title" subtitle="Subtitle">
  <SectionNav client:load sections={sections} />

  <div class="content">
    <div class="panel active" id="panel-section-one">
      <h2>Section One</h2>
      <!-- content -->
    </div>

    <div class="panel" id="panel-section-two">
      <h2>Section Two</h2>
      <!-- content -->
    </div>
  </div>

  <style>
    .content {
      flex: 1;
      overflow-y: auto;
      padding: 28px 32px;
    }
    .content p {
      font-size: 16px;
    }
    .content ul,
    .content ol {
      font-size: 16px;
      padding-left: 1.5rem;
      margin: 0.75rem 0;
    }
    .content ul li,
    .content ol li {
      font-size: 16px;
      margin-bottom: 0.4rem;
      line-height: 1.6;
    }
    .content h3 {
      font-size: 14px;
    }
    .panel {
      display: none;
    }
    .panel.active {
      display: block;
    }
  </style>
</BlogPost>
```

Key rules:

- Always use `SectionNav` with `client:load` — never raw content without section navigation.
- First panel gets `class="panel active"`, rest get `class="panel"`.
- Panel `id` must be `panel-{section.id}` (prefixed with `panel-`).
- Reuse existing components: `Highlight`, `Card`, `ConvergentEnvelope`, etc.
- Add a card entry on `src/pages/index.astro` for every new post.
- Use icons from: `◈ ▸ ▣ ◑ ⊕ ⬡ → ⟳ ✓ ≡ ∑ 👤 🧠 ⚙ ✦ ⚠ ⧉` for section nav items.

### Component structure

```
src/
  components/     # React (.tsx) and Astro (.astro) components
  layouts/        # page layouts
  pages/          # Astro routes
  content/        # MDX blog posts (content collections)
  styles/         # global CSS / design tokens
  utils/          # pure helper functions
  lib/            # external integrations
```

### State Management

- Prefer **plain Astro components** with inline `<script>` for interactive UI (theme toggle).
- Use React (`.tsx`) only when interactivity needs React-specific features (charts, complex state).
- **localStorage** for persistence (dark/light mode, etc.) — no cookies.
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

// 4. Relative (only within same feature folder)
import { useChartConfig } from './hooks';
```

Use `@/` path alias for cross-folder imports; relative imports only within same feature directory.

### Components

- Astro components (`.astro`) for static content and layouts.
- React components (`.tsx`) only when interactivity needed (charts, toggles, forms).
- Props typed with `interface`, not `type` — one interface per component.
- Co-locate component, test, and styles: `Button/` → `Button.tsx`, `Button.test.tsx`, `Button.module.css`.

### Naming

| Item             | Convention         | Example                  |
| ---------------- | ------------------ | ------------------------ |
| Components       | PascalCase         | `FunnelChart.tsx`        |
| Hooks            | camelCase w/ `use` | `useDarkMode.ts`         |
| Utilities        | camelCase          | `formatDate.ts`          |
| Stores           | camelCase          | `themeStore.ts`          |
| CSS modules      | camelCase          | `funnelChart.module.css` |
| Constants        | UPPER_SNAKE_CASE   | `MAX_RETRIES`            |
| Types/Interfaces | PascalCase         | `ChartConfig`            |

### Types

- Prefer `interface` for object shapes; `type` for unions/intersections/aliases.
- Avoid `any` — use `unknown` and narrow. Enable `@typescript-eslint/no-explicit-any`.
- Export types from barrel `types/index.ts` when shared across modules.
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
- Do not remove/modify `server` block in `vite.config.ts` (`host: '0.0.0.0'`, `allowedHosts: ['galadriel']`) — LAN dev convenience, must be preserved.
- **Never** commit and push until user explicitly asks.
- Use **GitHub CLI (`gh`)** for PR creation, issue management, and repo operations.

---

## Parallel Task Execution

### Task Dispatcher Pattern

Complex tasks should be decomposed into smaller parallel subtasks using a dispatcher model:

1. **Main agent** → Analyzes request, breaks into independent tasks
2. **Parallel subagents** → Execute subtasks concurrently
3. **Main agent** → Synthesizes results, reports to user

### Custom Agents

Specialized agents defined in `.opencode/agents/`:

| Agent                | Purpose                                                        |
| -------------------- | -------------------------------------------------------------- |
| `@project-leader`    | Takes notes, creates high-level plans, delegates to Plan agent |
| `@orchestrator`      | Breaks down complex tasks, dispatches to specialized agents    |
| `@component-builder` | Creates React/Astro components following conventions           |
| `@blog-writer`       | Creates blog posts with SectionNav + panels layout             |
| `@tester`            | Writes Vitest tests for components and utilities               |
| `@explore`           | Built-in read-only codebase exploration                        |
| `@plan`              | Built-in Plan agent for detailed planning and analysis         |

### Usage

Invoke specialized agent by mentioning it:

```
@component-builder create a FunnelChart component
```

Or let orchestrator dispatch automatically:

```
@orchestrator I need to add a new blog post with a chart component and tests
```

### Creating New Agents

Add markdown files to `.opencode/agents/`:

```markdown
---
description: Brief description of agent purpose
mode: subagent
tools:
  write: true
  edit: true
  bash: false
---

Agent-specific instructions here...
```

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

### Git Worktree Workflow

This project uses **git worktrees** to keep `main` branch clean and enable parallel work.

#### When to use worktrees

- **New features** → always use a worktree
- **Complex refactoring** → always use a worktree
- **Extensive exploratory work** → always use a worktree
- **Trivial fixes** (typos, one-liners) → work directly in main

#### Workflow

1. **Create a worktree** for the feature:

   ```bash
   git worktree add ../software-engineering-{feature-name} -b feat/{feature-name}
   ```

   Example:

   ```bash
   git worktree add ../software-engineering-funnel-chart -b feat/funnel-chart
   ```

2. **Navigate to the worktree** and develop:

   ```bash
   cd ../software-engineering-funnel-chart
   pnpm install
   pnpm dev
   ```

3. **Work in the worktree**: commit with conventional messages, run tests, lint, typecheck.

4. **When ready**: push branch to remote and create a PR:

   ```bash
   git push -u origin feat/funnel-chart
   gh pr create --title "feat: add funnel chart component" --body "$(cat <<'EOF'
   ## Summary
   - Bullet point describing the feature

   ## Testing
   - Describe how to test this feature
   EOF
   )"
   ```

5. **After PR merge**: remove the worktree:
   ```bash
   git worktree remove ../software-engineering-funnel-chart
   git branch -d feat/funnel-chart
   ```

#### Branch naming

- Features: `feat/{short-name}` (e.g., `feat/funnel-chart`)
- Bug fixes: `fix/{short-name}` (e.g., `fix/dark-mode-toggle`)
- Refactors: `refactor/{short-name}` (e.g., `refactor/date-utils`)

#### Rules

- **Never** commit and push until user explicitly asks.
- Do not merge branches without a PR.
- Keep `main` clean — only merged PRs touch it.
- Run `pnpm lint` and `pnpm typecheck` before committing.

---

## Session State & Knowledge Management

Hybrid approach using **Byterover** (persistent knowledge) and **handoffs** (ephemeral session state).

### Byterover (`.brv/context-tree/`)

Persistent project knowledge base. Auto-queries at session start.

```bash
brv query "how are blog posts structured?"     # Retrieve knowledge
brv curate "Decision: use pnpm only, never npm/yarn"  # Save knowledge
```

**Store in Byterover:**

- Architecture patterns and conventions
- Key decisions and their rationale
- User preferences (communication style, workflow choices)
- Component usage patterns and examples
- Troubleshooting notes

### Handoffs (`_handoffs/`)

Ephemeral session state. User explicitly triggers creation/reading.

- **Default naming**: `handoff-{YYYY-MM-DD}-{HH-mm}.md`
- Contents: completed tasks (current session only), in-progress work, blockers, next steps
- **Do not read automatically** — only when user explicitly asks

**Command:** `/handoff` creates handoff automatically (fetches git status, generates sections, writes to `_handoffs/`)

### When to use what

| Type                    | Use                | Storage                  |
| ----------------------- | ------------------ | ------------------------ |
| Pattern/convention      | Byterover `curate` | Persistent, searchable   |
| Architecture decision   | Byterover `curate` | Persistent, searchable   |
| User preference         | Byterover `curate` | Persistent, searchable   |
| Today's completed tasks | Handoff file       | Ephemeral, session-bound |
| Current blockers        | Handoff file       | Ephemeral, session-bound |
| Next steps              | Handoff file       | Ephemeral, session-bound |

**Language:** All docs (README, handoffs, config comments) in English. Blog posts may be Spanish or English.

---

## Seed

Use `_seed/harness_engineering.html` as starting template for new blog posts. It contains a monolith HTML with embedded CSS and JS — decompose it into Astro components + React islands following the architecture above.

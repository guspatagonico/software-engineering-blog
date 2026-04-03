# Project Notes

## Ideas

- Layout and styles separation (DRY for Astro layouts)
- Additional blog posts on software engineering topics
- E2E test setup with Playwright
- Dark mode toggle for code blocks
- SEO optimization

## Decisions

- Blog is the homepage (no separate /blog route)
- ThemeToggle uses pure Astro + inline script (no React hydration)
- Worktrees for all features, direct work on main for trivial fixes
- SectionNav + panels layout for all blog posts
- Blog posts in `src/pages/blog/*.astro` (file-based routing) - NOT content collections
- Single source of truth for post metadata: `src/data/posts.ts`
- **Known Astro limitation**: MDX in content collections (glob loader) doesn't process MDX components properly - treated as raw text. Client-side directives (`client:load`, etc.) don't work.

## TODOs

- [x] Layout and styles refactoring (DRY principles)
- [x] Post metadata centralized in src/data/posts.ts
- [ ] E2E test setup (Playwright)
- [ ] Additional blog posts
- [ ] SEO meta tags for blog posts

## Blockers

none

## Context

- Astro framework with React islands for interactive components
- Uses pnpm, never npm/yarn
- Vitest for unit/component tests
- Conventional commits required

## Architecture (Updated)

```
src/
├── components/
│   └── Head/
│       └── Head.astro          ← Shared <head> (meta, fonts, theme)
├── data/
│   └── posts.ts                ← Post metadata (single source of truth)
├── layouts/
│   ├── Base.astro              ← Simple pages (index)
│   ├── Page.astro              ← Static pages (about, now, contact)
│   └── BlogPost.astro          ← Blog posts with SectionNav
├── pages/
│   ├── blog/                   ← Blog posts (*.astro files, not MD)
│   │   ├── bienvenidos.astro
│   │   ├── harness-engineering.astro
│   │   └── llm-context-limitations.astro
│   ├── index.astro             ← Homepage (imports from data/posts.ts)
│   ├── about.astro
│   ├── now.astro
│   └── contact.astro
├── styles/
│   ├── tokens.css              ← Design tokens
│   ├── global.css              ← Base typography
│   ├── page.css                ← Shared static page styles
│   └── post-list.css           ← Homepage post list styles
```

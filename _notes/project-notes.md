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
- Worktree location: `.worktrees/{branch-name}/`
- Mobile menu: hamburger icon with slide-in panel, staggered link animation
- SectionNav: collapsible with green arrow toggle button
- Grid layouts: unified in `post-content.css` for DRY
- Logo: 18px size, teal color for logo-mark, white for logo-text
- Site URL: `https://dev.ecim.tech` (for canonical URLs in SEO)

## TODOs

- [x] Layout and styles refactoring (DRY principles)
- [x] Post metadata centralized in src/data/posts.ts
- [x] Responsive design (mobile hamburger menu, SectionNav, Footer)
- [x] SEO meta tags for blog posts
- [ ] E2E test setup (Playwright)
- [ ] Additional blog posts

## Blockers

none

## Context

- Branch: main (clean, up-to-date with origin)
- All checks pass: pnpm lint, pnpm typecheck, pnpm build
- Last PR merged: #1 (feat/responsive) - Apr 3, 2026

## Architecture (Updated)

```
src/
├── components/
│   ├── Head/
│   │   └── Head.astro              ← Shared <head> (meta, fonts, theme)
│   ├── Header/
│   │   ├── Header.astro            ← Logo + desktop nav
│   │   ├── MobileNav.tsx           ← Hamburger + slide-in menu
│   │   ├── MobileNav.css
│   │   └── ThemeToggle.tsx         ← Theme toggle (React)
│   ├── SectionNav/
│   │   ├── SectionNav.tsx          ← Collapsible section nav
│   │   ├── SectionNav.css
│   │   └── SectionNav.test.tsx
│   ├── Footer/
│   │   └── Footer.astro
│   ├── PostCard/
│   │   ├── PostCard.astro
│   │   └── PostCard.css
│   └── ...
├── data/
│   └── posts.ts                    ← Post metadata (single source of truth)
├── layouts/
│   ├── Base.astro                  ← Simple pages (index)
│   ├── Page.astro                  ← Static pages (about, now, contact)
│   └── BlogPost.astro              ← Blog posts with SectionNav
├── pages/
│   ├── blog/                       ← Blog posts (*.astro files, not MD)
│   │   ├── bienvenidos.astro
│   │   ├── harness-engineering.astro
│   │   └── llm-context-limitations.astro
│   ├── index.astro                 ← Homepage (imports from data/posts.ts)
│   ├── about.astro
│   ├── now.astro
│   └── contact.astro
├── styles/
│   ├── tokens.css                  ← Design tokens
│   ├── global.css                  ← Base typography
│   ├── page.css                    ← Shared static page styles
│   ├── post-list.css               ← Homepage post list styles
│   ├── post-content.css           ← Blog post grid + layout styles
│   └── header.css                 ← Header + mobile nav styles
```

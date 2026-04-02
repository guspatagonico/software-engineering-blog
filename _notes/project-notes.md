# Project Notes

## Ideas

- Additional blog posts on software engineering topics
- E2E test setup with Playwright
- Dark mode toggle for code blocks
- SEO optimization

## Decisions

- Blog is the homepage (no separate /blog route)
- ThemeToggle uses pure Astro + inline script (no React hydration)
- Worktrees for all features, direct work on main for trivial fixes
- SectionNav + panels layout for all blog posts

## TODOs

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

# AGENTS.md — Software Engineering Blog

## Repository evidence basis

- Stack: Astro + React islands; TypeScript strict.
- Package manager: `pnpm` only (see `package.json`).
- Local testing URL: `http://localhost:4321/software-engineering` (use existing server).

## Clarification gate

- Ask only if ambiguity remains after scanning repo evidence and would materially change the result.
- Max 3 targeted questions; otherwise proceed with safe defaults.

## Do

- Use `pnpm` for install, lint, typecheck, format, and tests.
- Use `<Image />` from `astro:assets` for local images.
- Keep post assets in `src/assets/posts/<slug>/`.
- Use GitHub CLI (`gh`) for PRs and repo actions.
- Run `pnpm lint` and `pnpm typecheck` before commits.

## Don't

- Do not use npm/yarn.
- Do not run dev servers (`pnpm dev`, `pnpm build`, `pnpm preview`) unless explicitly asked.
- Do not commit/push unless explicitly requested.
- Do not modify the Vite `server` block in `vite.config` (host/allowedHosts).
- Do not commit secrets, `.env`, or credentials.
- Do not use destructive git commands (force push, hard reset) unless explicitly asked.

## Quick commands

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm format
pnpm test
```

## Repo map

- `src/pages/` — routes (`/blog/{slug}` are standalone `.astro` files)
- `src/layouts/` — Base and BlogPost layouts
- `src/components/` — shared UI components
- `src/styles/` — global styles
- `src/assets/posts/<slug>/` — post-specific images/icons
- `public/` — global static assets (favicons/vendor)
- `_handoffs/` — session handoffs
- `_seed/` — seed HTML template for blog posts

## Working rules

- Every blog post must use `BlogPost` + `SectionNav` with `client:load`.
- Panels use `id="panel-{section.id}"`; first panel has `class="panel active"`.
- SectionNav icons must be from: `◈ ▸ ▣ ◑ ⊕ ⬡ → ⟳ ✓ ≡ ∑ 👤 🧠 ⚙ ✦ ⚠ ⧉`.
- Add a homepage card entry in `src/pages/index.astro` for every new post.
- Prefer Astro components for static content; React only when necessary.
- Use `interface` for props; avoid `any`.
- Use worktrees for new features, complex refactors, or exploratory work; trivial fixes can go on `main`.
- Create worktrees under `[project]/.worktrees/`.

## Verification steps

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test` (when tests are relevant)

## Security boundaries

- Never expose secrets or tokens in code, logs, or commits.
- Never run process-kill commands (`pkill`, `kill`).
- Use the existing dev server if asked (do not start a new one).

## When stuck / escalation

- Re-read this file and the relevant source file.
- Check `README.md` and `_seed/` for layout guidance.
- Ask a minimal, blocking question only if needed.

## PR/change checklist

- Confirm branch/worktree is correct for the scope.
- Update homepage card for new posts.
- Run lint/typecheck; include test results when applicable.
- Use Conventional Commits for messages.

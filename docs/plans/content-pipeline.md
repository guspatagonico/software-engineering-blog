# Content Pipeline Plan

## Scope and goals

- Define a repeatable workflow for adding and maintaining blog posts.
- Standardize post assets (icons, images, diagrams) and metadata handling.
- Ensure homepage cards and post headers stay consistent and stable.

## Non-goals

- No CMS or backend authoring system.
- No SEO overhaul beyond existing metadata patterns.
- No automation that requires running new dev servers.

## Current-state assumptions

- Posts are standalone `.astro` files under `src/pages/blog/`.
- Post assets live in `src/assets/posts/<slug>/` and use `astro:assets`.
- Homepage cards render from `src/pages/index.astro`.

## Risks and dependencies

- Image optimization depends on the `sharp` package being installed.
- Missing or misnamed asset files can break icon/OG rendering.
- Large images can introduce layout shift or slow down cards.

## Phases with checklists

### Phase 1 — Asset and metadata baseline

- [ ] Define the post slug and create `src/pages/blog/<slug>.astro`.
- [ ] Create `src/assets/posts/<slug>/` for post assets.
- [ ] Add `icon.png` when needed for cards/header/OG.
- [ ] Ensure `src/data/posts.ts` entry includes title, description, tags, and pubDate.

### Phase 2 — Content and layout

- [ ] Use `BlogPost` + `SectionNav` with `client:load`.
- [ ] Ensure panel IDs follow `panel-{section.id}` and first panel is `active`.
- [ ] Validate icon presence and alt text (title used by default).

### Phase 3 — Card and header validation

- [ ] Confirm homepage cards render icon + excerpt alignment.
- [ ] Confirm post header icon sits left of title/subtitle on mobile and desktop.
- [ ] Review layout stability (no visible shifts).

### Phase 4 — Verification and delivery

- [ ] Run `pnpm lint` and `pnpm typecheck`.
- [ ] Sanity-check the post in the existing local server if requested.
- [ ] Update handoff if the session ends with unfinished work.

## Verification commands and acceptance criteria

- `pnpm lint` and `pnpm typecheck` pass.
- New post appears on homepage card list.
- Icon renders when `src/assets/posts/<slug>/icon.png` exists; no icon when absent.
- Post header layout matches desktop/mobile alignment expectations.

## Delivery evidence

- Commit/PR reference.
- Screenshot(s) of homepage card and post header.
- Notes on asset locations and any exceptions.

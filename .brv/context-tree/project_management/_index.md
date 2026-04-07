---
children_hash: 3d40e9264b12b2160b957b33a521639e00887f204706390206d093be202e529b
compression_ratio: 0.4315886134067952
condensation_order: 2
covers: [context.md, handoffs/_index.md, run_commands/_index.md]
covers_token_total: 1089
summary_level: d2
token_count: 470
type: summary
---
# Project Management – Structural Summary (d2)

## Domain Intent and Ownership
- **context.md** defines the domain’s mission: capture concise session handoff summaries that record completed tasks, decisions, blockers, files touched, and pending actions so collaborators can resume work efficiently; Gustavo Adrián Salvini owns this domain.
- Scope intentionally excludes implementation minutiae, focusing only on the high-level snapshot of session work.

## Handoffs Topic
- **handoffs/_index.md** (d1 summary) points to three child entries:
  - **context.md** (as above) explains domain purpose and links to governance in `project_guidelines/dev_process`.
  - **current_session_handoff_rule.md** outlines the current-session-only rule set—task completion → log in current handoff → exclude prior entries—with emphasis on accurate tracking, no duplication, and brevity to keep handoff docs relevant.
  - **handoff_2026_04_04.md** provides the April 4 handoff: details of SEO/Open Graph metadata, canonical URL logic anchored at `https://dev.ecim.tech`, homepage/blog title conventions (“The SE Blog | Gustavo Adrián Salvini”), shared `src/styles/post-content.css`, and consistent component updates (`Head`, `Navbar`, `Footer`, `Base`, `BlogPost`, homepage, etc.); notes dependencies on those components and CSS placement, mentions pending Playwright E2E setup and future posts, and encodes rules against unsanctioned handoff creation until pending items complete.

## Run Commands Topic
- **run_commands/_index.md** (d1 summary) references:
  - **git_worktree_location.md** which enforces keeping every worktree inside `<project_folder>/.worktrees/<branch_name>` using `git worktree add .worktrees/<branch_name> -b <branch_name>`, requiring the `.worktrees` directory prep, ensuring centralized management for cleanup and tooling, and forbidding worktrees outside that location.
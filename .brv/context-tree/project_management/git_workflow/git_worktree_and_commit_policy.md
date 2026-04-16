---
title: Git Worktree and Commit Policy
summary: Git workflow mandates worktrees for features/refactors, conventional commits, and PR-based merging.
tags: []
keywords: []
importance: 50
recency: 1
maturity: draft
createdAt: '2026-04-16T11:44:12.562Z'
updatedAt: '2026-04-16T11:44:12.562Z'
---
## Reason
Documenting the git worktree workflow and commit standards

## Raw Concept
**Task:**
Define git workflow and commit standards

**Changes:**
- Implemented git worktree workflow

**Flow:**
git worktree add -> develop -> push -> gh pr create -> merge -> git worktree remove

**Timestamp:** 2026-04-16

## Narrative
### Structure
Worktree workflow for features/refactors. Trivial fixes allowed on main. Conventional commits (feat, fix, docs, refactor, chore).

### Highlights
Use GitHub CLI (gh) for PRs. Main branch kept clean via PR-only merges.

### Rules
Rule 1: Never commit/push until user asks.
Rule 2: Run lint/typecheck before committing.
Rule 3: Branch names: feat/, fix/, refactor/.

## Facts
- **git_worktree**: The project uses git worktrees for new features, complex refactoring, and extensive exploratory work. [convention]
- **commit_format**: All commit messages must follow the Conventional Commits specification. [convention]

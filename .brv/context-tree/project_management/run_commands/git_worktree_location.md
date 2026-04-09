---
title: Git Worktree Location
tags: []
keywords: []
importance: 53
recency: 1
maturity: draft
accessCount: 1
createdAt: '2026-04-07T02:59:52.171Z'
updatedAt: '2026-04-07T02:59:52.171Z'
---
## Raw Concept
**Task:**
Document the enforced location policy for git worktrees in this project.

**Changes:**
- Established the preferred directory (.worktrees) for git worktrees.
- Provided the canonical git worktree creation command example.

**Flow:**
Create feature branch -> run git worktree add .worktrees/<branch_name> -b <branch_name> -> worktree appears under project/.worktrees

**Timestamp:** 2026-04-07

## Narrative
### Structure
Project worktrees must be nested inside <project_folder>/.worktrees so they remain within the main repo directory and avoid sibling directory clutter.

### Dependencies
Requires the project root to have a .worktrees directory ready before adding new worktrees.

### Highlights
Keeps all active worktrees centralized and simplifies cleanup, onboarding, and relative tooling that assumes a single parent repository.

## Facts
- **git_worktree_location**: All git worktrees for this project must reside under <project_folder>/.worktrees/<branch_name> instead of any sibling directory. [convention]

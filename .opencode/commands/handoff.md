---
description: Create a handoff file capturing current project state
agent: build
---

Create a handoff file in `_handoffs/` capturing the current project state.

The file should be named with the pattern: `handoff-{YYYY-MM-DD}-{HH-mm}.md`

Include these sections:

## Completed

- List of completed tasks (checkboxes with [x])

## Decisions Made

- Key architectural or implementation decisions

## Files Modified

- List of modified files

## Files Deleted

- List of deleted files (if any)

## Pending

- List of pending/uncompleted tasks (checkboxes with [ ])

## Blockers

- Any blockers or dependencies

Use shell output for context:

- Git status: !`git status --short`
- Recent commits: !`git log --oneline -10`

Write the file and confirm the path.

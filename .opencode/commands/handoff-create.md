---
description: Create a handoff file from current session only (no long-term memory)
---

Create a handoff file in `_handoffs/` capturing only work from the current session.
Do not use long-term memory (ByteRover or any persisted context). Only use the current session context and the shell output below.

File naming: `handoff-{YYYY-MM-DD}-{HH-mm}.md`

Sections:

## Completed

- Tasks completed in the current session only (checkboxes with [x])

## Decisions Made

- Key decisions from this session

## Files Modified

- Files modified in this session
- Exclude the handoff file itself to avoid recursion
- Exclude any files under `.brv/`

## Pending

- Pending tasks (checkboxes with [ ])

## Blockers

- Any blockers

Use shell output:

- Git status: !`git status --short`
- Recent commits: !`git log --oneline -10`

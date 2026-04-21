---
mode: agent
description: Import the latest handoff file
---

Import the latest handoff file from `_handoffs/` into the current conversation.

Workflow:

1. Find all `handoff-*.md` files.
2. Parse filenames to extract datetime (format: `handoff-YYYY-MM-DD-{HH-mm}.md`).
3. Sort by datetime descending and select the most recent file.
4. Read and display its contents, then merge its sections into the current conversation by:
   - Summarizing completed tasks.
   - Capturing key decisions.
   - Identifying pending tasks and blockers.

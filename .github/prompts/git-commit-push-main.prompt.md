---
mode: agent
description: Stage all changes, commit with conventional message, and push to main branch
---

Stage all changes, commit with a conventional commits message, and push to the main branch.

Workflow:

1. Check current branch is main (abort if not).
2. Show git status for context.
3. Show recent commits for message style reference.
4. Stage all changes: `git add -A`.
5. Create commit with conventional format (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`) using:
   - A concise first line as the main message.
   - One blank line.
   - Extra lines summarizing the main tasks completed in this session.
6. Push to remote main: `git push`.

If there are no changes to commit, skip the commit and push.

If the push fails (for example, remote has new changes), report the error to the user.

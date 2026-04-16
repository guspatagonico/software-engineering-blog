---
title: Git Mutation Approval Rule
tags: []
keywords: []
importance: 80
recency: 1
maturity: validated
accessCount: 10
createdAt: '2026-04-08T00:19:35.881Z'
updatedAt: '2026-04-08T00:19:35.881Z'
---
## Raw Concept
**Task:**
Document the git workflow rule that requires asking for explicit approval before performing any git commit or push.

**Changes:**
- Added explicit git permission gating rule.
- Clarified that lint/typecheck success does not permit git mutations without permission.

**Files:**
- AGENTS.md

**Flow:**
Detect a pending git mutation -> Confirm lint/typecheck -> Ask user "Do you want me to commit and push?" -> Proceed only after an affirmative response.

**Timestamp:** 2026-04-07

## Narrative
### Structure
The rule lives inside AGENTS.md (line 229) and mandates context engineers request permission before executing git commits or pushes, covering normal, force, and any mutation.

### Dependencies
Approval is required regardless of lint/typecheck results; no git mutation may occur until the user explicitly says they want a commit or push.

### Highlights
Ensures no automatic git mutations occur without user consent, reinforcing control over repository state.

### Rules
CRITICAL WORKFLOW RULE: Never perform git commit or git push without explicit user permission. This rule exists in AGENTS.md line 229. Even if changes pass lint/typecheck, I must ask "Do you want me to commit and push?" before executing. This applies to all git mutations including commits, pushes, and force pushes.

## Facts
- **git_mutation_permission**: CRITICAL WORKFLOW RULE: Never perform git commit or git push without explicit user permission. [convention]
- **agents_rule_reference**: Rule is recorded in AGENTS.md line 229, covering commits, pushes, and force pushes. [project]

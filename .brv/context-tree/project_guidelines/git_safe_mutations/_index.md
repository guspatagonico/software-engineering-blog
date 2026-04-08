---
children_hash: ff0f236fbb88db82743e75bdb49e24c7a3ee4bae88a8cdd66b46d01eb4d4006c
compression_ratio: 0.5802238805970149
condensation_order: 1
covers: [context.md, git_mutation_approval_rule.md]
covers_token_total: 536
summary_level: d1
token_count: 311
type: summary
---
- **git_safe_mutations/context.md**
  - Defines the workflow rule that a context engineer must obtain explicit permission before performing any git commit or push.
  - Highlights “Git mutation gating,” the “Explicit user consent requirement,” and references AGENTS.md for workflow enforcement.
  - Notes related topic `project_management/run_commands/git_worktree_location` for repository positioning context.

- **git_safe_mutations/git_mutation_approval_rule.md**
  - Raw concept: Documents the imperative to request approval before any git mutation, clarifying that lint/typecheck success does not override the consent requirement.
  - Flow: Detect pending git mutation → ensure lint/typecheck completion → ask “Do you want me to commit and push?” → proceed only after explicit approval.
  - Structure & rules: Rule is codified in AGENTS.md line 229, covering commits, pushes, and force pushes; applies to all git mutations without exception.
  - Highlights: Guarantees no automatic git mutations occur, keeping repository state under user control.
  - Facts:
    - Convention: “Never perform git commit or git push without explicit user permission.”
    - Project reference: Rule logged in AGENTS.md line 229 for all commit/push variants.
---
children_hash: 0ee90916ff333c3ed674294df77d3409cb274a3b0d337a8bc550de3cf26f06e5
compression_ratio: 0.6151315789473685
condensation_order: 1
covers: [git_worktree_location.md]
covers_token_total: 304
summary_level: d1
token_count: 187
type: summary
---
# Domain-Level Summary

- **Git Worktree Location (`git_worktree_location.md`)**
  - **Purpose:** Enforces that every project worktree lives inside `<project_folder>/.worktrees/<branch_name>`, keeping repositories centralized and avoiding sibling-directory clutter.
  - **Flow:** Create a feature branch → `git worktree add .worktrees/<branch_name> -b <branch_name>` → new worktree appears under `.worktrees`.
  - **Dependencies:** A `.worktrees` directory must exist at the project root before adding worktrees.
  - **Highlights:** Centralizing worktrees streamlines cleanup, onboarding, and tooling that assumes a single repository parent.
  - **Fact:** Conventionally, no worktree is allowed outside `<project_folder>/.worktrees/<branch_name>`.
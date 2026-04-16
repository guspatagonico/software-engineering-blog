---
children_hash: bf29c9b558805f7624ff4dbe85e17d94a271f1386b5f0b273dcacc37ea7b0fb4
compression_ratio: 0.5547886108714409
condensation_order: 2
covers: [context.md, git_workflow/_index.md, handoffs/_index.md, run_commands/_index.md]
covers_token_total: 1159
summary_level: d2
token_count: 643
type: summary
---
# Domain: project_management

The project management domain centralizes session continuity, version control standards, and environment isolation strategies to ensure consistent development across contributors.

## Git Workflow and Environment Isolation
The project enforces a strict isolation policy using Git worktrees and standardized commit practices to maintain repository integrity.

*   **Worktree Management**: Mandatory for all non-trivial work (features, refactors, exploration). Worktrees must be located within `<project_folder>/.worktrees/<branch_name>` to prevent filesystem clutter and streamline cleanup.
    *   **Workflow**: `git worktree add` → Development → `push` → `gh pr create` → Merge → `git worktree remove`.
    *   **Reference**: `git_workflow/_index.md`, `run_commands/git_worktree_location.md`
*   **Branching and Commits**: Branch names must use `feat/`, `fix/`, or `refactor/` prefixes. Commits must follow **Conventional Commits** (e.g., `feat:`, `fix:`) and pass mandatory `lint` and `typecheck` hooks.
    *   **Reference**: `git_workflow/git_worktree_and_commit_policy.md`

## Session Continuity and Handoffs
Knowledge is partitioned between durable architectural decisions and ephemeral session state to optimize agent performance and context window usage.

*   **Hybrid State Strategy**: Employs a dual-store pattern where ByteRover manages durable knowledge (patterns, preferences) and handoff files track ephemeral session state (tasks, blockers). Agents are instructed to auto-query durable knowledge at startup but only access handoffs upon explicit request.
    *   **Reference**: `handoffs/hybrid_session_state_approach.md`
*   **Handoff Standards**: Handoffs must only document work completed in the active session, avoiding duplication of previous notes. They capture completed tasks, decisions, touched files, and pending actions.
    *   **Reference**: `handoffs/current_session_handoff_rule.md`, `handoffs/context.md`
*   **Historical Context (April 4, 2026)**: Records the rollout of SEO/metadata (Open Graph/Twitter), shared styling migration to `src/styles/post-content.css`, and typography updates. Identifies the site URL as `https://dev.ecim.tech`.
    *   **Reference**: `handoffs/handoff_2026_04_04.md`

## Quality and Governance
*   **Ownership**: Gustavo Adrián Salvini.
*   **Quality Gate**: No code is pushed without explicit user request and successful execution of pre-commit quality checks.
*   **Main Branch**: Reserved strictly for trivial fixes; all other changes require PR-based merging via GitHub CLI.
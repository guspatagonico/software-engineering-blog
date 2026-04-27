---
children_hash: a78e5c1ce788628270abdd0c623a8301785efbed8d6fe6f8452316980ef8a9b7
compression_ratio: 0.5576208178438662
condensation_order: 2
covers: [context.md, handoffs/_index.md, hybrid-state-durable-knowledge-partitioning.md, run_commands/_index.md]
covers_token_total: 1076
summary_level: d2
token_count: 600
type: summary
---
# Domain: project_management

The project management domain centralizes session-based state, architectural decision-making, and specialized workflow commands. It operates on a dual-store model that distinguishes between long-term durable knowledge and short-term ephemeral tasks.

## Handoffs and Session State
The handoff system captures the state of work to ensure continuity across sessions while managing agent context window efficiency.

*   **Handoff Context (`context.md` / `handoffs/_index.md`):** Serves as the domain anchor, documenting the state of SEO/metadata rollouts, shared styling (`post-content.css`), and homepage conventions. It links to broader process guidance in `project_guidelines/dev_process`.
*   **Current Session Rule (`current_session_handoff_rule.md`):** Mandates that handoffs only include work completed in the active session. It enforces non-duplication and brevity to ensure focus on new outstanding work.
*   **Hybrid State Strategy (`hybrid_session_state_approach.md` / `hybrid-state-durable-knowledge-partitioning.md`):** Defines a strict partitioning of knowledge:
    *   **Durable Knowledge:** Architectural patterns, decisions, and preferences curated by ByteRover; auto-queried at session start.
    *   **Ephemeral State:** Tasks, blockers, and next steps tracked in `_handoffs/`; accessed only upon explicit request.
    *   **Constraints:** Enforces a ~5800 token budget per sub-agent and utilizes Compressed Handoff Templates to maintain the "Rule of Gold."
*   **Historical State (`handoff_2026_04_04.md`):** Records the implementation of Open Graph/Twitter metadata, typography updates, and the migration of styles to `src/styles/post-content.css`. Identifies the site URL as `https://dev.ecim.tech`.

## Run Commands and Infrastructure
Standardized commands and filesystem conventions ensure environment consistency across different worktrees.

*   **Git Worktree Location (`git_worktree_location.md` / `run_commands/_index.md`):** Enforces a centralized repository structure where all feature branches must reside within `<project_folder>/.worktrees/<branch_name>`.
    *   **Workflow:** `git worktree add .worktrees/<branch_name> -b <branch_name>`.
    *   **Requirement:** The `.worktrees` directory must exist at the project root.
    *   **Decision:** Prohibits worktrees outside the designated path to streamline cleanup and tooling integration.
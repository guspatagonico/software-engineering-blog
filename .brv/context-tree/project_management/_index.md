---
children_hash: 7b25463b26e352b0d8fe835ac4d80d55b4365f61186dde22fe8473eedaff12fa
compression_ratio: 0.7245444801714899
condensation_order: 2
covers: [context.md, handoffs/_index.md, run_commands/_index.md]
covers_token_total: 933
summary_level: d2
token_count: 676
type: summary
---
## project_management domain overview
- **Purpose & Ownership**: `context.md` defines the domain’s role in recording session handoff summaries (tasks done, decisions, blockers, pending actions, touched files) and names Gustavo Adrián Salvini as owner; it excludes implementation-level details.
- **Scope enforcement**: Summaries should focus on completed work, decisions, blockers, pending actions, and touched files, keeping implementation specifics out of this domain unless directly tied to the handoff narrative.

## handoffs topic (d2 structural summary)
- **Context anchor (`context.md`)**: Serves as the canonical reference for what belongs in handoff entries (completed work, decisions, blockers, pending actions, touched files) and links to broader process guidance in `project_guidelines/dev_process`.
- **Current session rule (`current_session_handoff_rule.md`)**:
  - Enforces session-bounded summaries: include only newly completed work, omit prior items, and keep descriptions concise.
  - Flow: session task tracking → concise handoff creation → delivery to stakeholder.
  - Dependencies: requires up-to-date completion tracking and non-duplication to keep recipients focused on outstanding work.
- **April 4, 2026 handoff (`handoff_2026_04_04.md`)**:
  - Captures SEO/metadata rollout, shared styling migration into `src/styles/post-content.css`, homepage and blog title conventions, and touched files (Head, Navbar, Footer, layouts, blog pages, CSS).
  - Highlights: site URL `https://dev.ecim.tech`, max-width rules, new title suffix strategy, centralized styles, pending Playwright E2E work and additional posts.
  - Operational note: do not process handoffs without explicit request.
- **Hybrid session state approach (`hybrid_session_state_approach.md`)**:
  - Establishes dual-store behavior: ByteRover for durable knowledge (patterns, decisions, preferences) and handoffs for ephemeral session state (tasks, blockers, next steps).
  - Agent startup guidance: auto-query ByteRover, defer handoff access until explicitly requested; enforces responsibility separation and persistence rules.

## run_commands topic
- **Worktree convention (`git_worktree_location.md`)**:
  - Purpose: centralize every project worktree inside `<project_folder>/.worktrees/<branch_name>` to avoid sibling-directory clutter.
  - Flow: create feature branch → `git worktree add .worktrees/<branch_name> -b <branch_name>` → new worktree under `.worktrees`.
  - Dependencies: `.worktrees` directory must exist at project root before adding worktrees.
  - Highlights/fact: Centralizing worktrees simplifies cleanup, onboarding, tooling assumptions, and no worktree is allowed outside the prescribed location.
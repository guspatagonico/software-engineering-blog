---
children_hash: dc656bd1293bc59c985a864365f6cf1c9a359a661f26d5bde78ac25ac7974200
compression_ratio: 0.15016059957173447
condensation_order: 2
covers: [agents/_index.md, blog_post_architecture/_index.md, context.md, dev_process/_index.md, git_safe_mutations/_index.md, harness_engineering/_index.md, run_commands/_index.md]
covers_token_total: 3736
summary_level: d2
token_count: 561
type: summary
---
### project_guidelines
- **Purpose & Usage:** Captures repository-wide build/lint/test/run conventions plus onboarding guidance, linking agents, blog post layout, dev process, run commands, and git governance under a cohesive pnpm-driven workflow.
- **Structure:**  
  - `context.md`: Domain overview (purpose, scope, ownership, usage) for automation and onboarding; anchors other topics.  
  - `agents/_index.md`: Handbook entry summarizing pnpm-only tooling, layout conventions, SectionNav/panel requirements, worktree/security rules, `_handoff` command, and dispatcher-based agent orchestration (see `context.md` for cross-links; `project_agent_handbook.md` for full AGENTS.md transcription).
  - `blog_post_architecture/_index.md`: Layout rules mandating `BlogPost` layout, SectionNav client:load, panel IDs/classes, approved icon set, shared UI components, and homepage card registration; detailed anatomy available in `blog_post_architecture.md`.
  - `dev_process/_index.md`: Enforces style/import/typing conventions, error handling, security (no secrets, locked Vite server config), dispatcher agent patterns, git worktree + gh PR flow, and check gates (lint/typecheck/tests before commit/push) with references to `context.md` and `development_process_and_rules.md`.
  - `run_commands/_index.md`: pnpm command taxonomy (install, dev server, build/preview, lint/format/typecheck, Vitest/Playwright tests) with dependencies on `context.md` for pnpm-only policy; `build_and_run_commands.md` holds the full script list.
  - `git_safe_mutations/_index.md`: Permission-enforced git workflow from `git_safe_mutations/context.md` and `git_mutation_approval_rule.md`, emphasizing explicit consent before any commit/push (linked to AGENTS.md rules and run_commands context for worktree placement).
- **Relationships:**  
  - `agents` topic codifies behaviors referenced by `dev_process`, `run_commands`, and `git_safe_mutations`.  
  - `blog_post_architecture` depends on `dev_process` for broader workflow expectations and ties back to `agents` for layout enforcement policies.  
  - `harness_engineering` (separate domain) is referenced for tooling, budget, and orchestration patterns linking to `dev_process` and `project_management/handoffs`.
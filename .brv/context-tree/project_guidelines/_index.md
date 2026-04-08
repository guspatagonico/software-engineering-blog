---
children_hash: baa3fe464e89f38657cf227c8363425e2294951a51b4e44b5363d42789705e2a
compression_ratio: 0.45664309639002604
condensation_order: 2
covers: [agents/_index.md, blog_post_architecture/_index.md, context.md, dev_process/_index.md, git_safe_mutations/_index.md, run_commands/_index.md]
covers_token_total: 2687
summary_level: d2
token_count: 1227
type: summary
---
# Structural Summary — Level d2

## project_guidelines
- **Purpose & Scope (context.md)**: Defines repo-wide pnpm-driven build/lint/test/run conventions, ownership (Gustavo Adrián Salvini), and usage guidance for onboarding/CI automation while excluding feature-level narratives.

### agents (project_guidelines/agents)
- **High-Level Coverage**: Captures AGENTS.md via `context.md` and `project_agent_handbook.md`, documenting pnpm-only tooling, repository security/git/worktree rules, layout conventions (SectionNav/panels), and the dispatcher-style multi-agent workflow coordinating pnpm scripts, security checks, and `_handoff` metadata exports.
- **Key Architecture & Rules**:
  - Tooling: `pnpm` scripts (install, dev @ localhost:4321, build, preview, lint/lint:fix, typecheck, format, Vitest, Playwright e2e); TypeScript strict mode; 2-space indentation; single quotes; `@/` alias usage; co-located components/tests/styles; `<Image />` from `astro:assets`.
  - Layout: Every post uses `BlogPost`, `SectionNav client:load`, panel structure (first panel active, IDs `panel-{section.id}`), and shared components (Highlight/Card/ConvergentEnvelope) aligning with prescribed directories; SectionNav icons limited to approved set.
  - Process & Security: Git worktree mandate for complex work, `_handoff` command capturing repo state, strict prohibition on secrets/`.env`, immutable Vite server block (`host: '0.0.0.0'`, `allowedHosts: ['galadriel']`), GH CLI PR creation, no agent naming or co-author trailers in commits, zero apologies in reviews, day 3 change freeze, PR reviews within 4h SLA.
  - Agent Behavior: Dispatcher pattern triggering pnpm commands, security checks, and handoff artifacts ensures consistent agent execution.

### blog_post_architecture (project_guidelines/blog_post_architecture)
- **Layout Enforcement** (`blog_post_architecture.md` & `context.md`):
  - Every entry imports `BlogPost`, defines sections with id/icon/label, renders `SectionNav client:load`, and aligns panels (`div` with `panel-{section.id}`) so navigation toggles active content; only first panel uses `panel active`.
  - Shared UI components (Highlight, Card, ConvergentEnvelope) and inline `.content`/`.panel` styling enforce uniform presentation; SectionNav icons constrained to `◈ ▸ ▣ ◑ ⊕ ⬡ → ⟳ ✓ ≡ ∑`.
  - Integration requirements include registering each new post on the homepage (`src/pages/index.astro`) immediately.
- **Relation**: Linked to `project_guidelines/dev_process/context.md` for broader workflow expectations (processor integration, SectionNav client loads, use of Astro components/React islands).

### dev_process (project_guidelines/dev_process)
- **Workflow & Enforcement**:
  - Core flow: style enforcement → `pnpm lint/typecheck/format` → tests → commit (conventional messages) via git worktree → PR with GH CLI post-checks → worktree removal.
  - Style/naming: 2-space indent, single quotes, trailing commas, interface-prop typing, import ordering (Node/external → Astro → `@/` aliases → same-feature relative), naming conventions for components/hooks/utils/stores/CSS/types.
  - Error handling/security: No swallowed errors, immutable Vite server block, prohibition on committing secrets/API keys/`.env`.
  - Collaboration: Parallel agent dispatcher (e.g., `@component-builder`, `@blog-writer`), git worktrees for non-trivial work, lint/typecheck prior to every commit, GH CLI for PRs; secrets and Vite config protected.
- **Dependencies & Highlights**: pnpm, ESLint (`@astrojs/eslint-plugin`, `eslint-plugin-react-hooks`), TypeScript, Astro layouts; SectionNav client:load usage; prefer Astro components for static content, React islands for interactivity; LocalStorage for theme persistence.
- **Facts for Drill-Down**: TypeScript strict mode, enforced import order, standard git worktrees, required pre-commit checks, secrets/Vite config protections.

### git_safe_mutations (project_guidelines/git_safe_mutations)
- **Mandated Consent Workflow** (`context.md` & `git_mutation_approval_rule.md`):
  - No git commit/push/force push without explicit user approval regardless of lint/typecheck status.
  - Flow: detect pending mutation → ensure checks passed → ask “Do you want me to commit and push?” → proceed after consent.
  - Rule codified in AGENTS.md line 229; commitment to keep repo state under user control.

### run_commands (project_guidelines/run_commands)
- **Command Catalog** (`build_and_run_commands.md` & `context.md`):
  - pnpm-only lifecycle: `pnpm install` (locks dependencies), `pnpm dev` (Astro on `localhost:4321`), `pnpm build`/`preview`, lint/format/typecheck commands, Vitest (`pnpm test`) with filtering/watch modes, Playwright e2e (`pnpm test:e2e`).
  - Purpose: document dependency management, development, and quality checks, reinforcing pnpm-only policy.
  - Relationship: Ties into `project_guidelines/dev_process` for upstream workflow expectations.
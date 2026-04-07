---
children_hash: d5dd195c26df13d2dc83944af3cafa5f5a2217843f405e64497587ea8781543e
compression_ratio: 0.46057192374350087
condensation_order: 2
covers: [agents/_index.md, blog_post_architecture/_index.md, context.md, dev_process/_index.md, run_commands/_index.md]
covers_token_total: 2308
summary_level: d2
token_count: 1063
type: summary
---
# Structural Summary of `project_guidelines` Domain (Level d2)

## Agents
- **Purpose & Coverage**: Documents AGENTS.md via `context.md` (overview of pnpm toolchain, SectionNav/panel layout, security/git/worktree rules, dispatcher pattern) and `project_agent_handbook.md` (full agent handbook with raw concepts, dependencies, rules, facts).
- **Key Systems**:
  - **Build & Tooling**: pnpm-only workflow (`install`, `dev` on `localhost:4321`, `build`, `preview`, lint/format/typecheck, Vitest, Playwright e2e); strict TypeScript, 2-space indentation, single quotes, `@/` alias, colocated component/test/style files, `<Image />` from `astro:assets`.
  - **Content Layout**: Blog posts use `BlogPost`, `SectionNav client:load`, panels inside `.content` with ids `panel-{section.id}` and CSS classes (`panel active` first, others `panel`); SectionNav icons limited to approved set; shared components (`Highlight`, `Card`, `ConvergentEnvelope`) standardize UI.
  - **Process & Security Rules**: git worktrees for complex work (trivial fixes on `main`), `_handoff` command writes git state to `_handoffs/`, no committing secrets/`.env`, maintain routing table, Vite server block fixed (`host: '0.0.0.0'`, `allowedHosts: ['galadriel']`), PR/issue flow via `gh`, PR reviews within 4h SLA, deny apologies.
  - **Agent Dispatch**: Dispatcher orchestrates pnpm commands, security checks, handoff file generation; core agent usage pattern described in `context.md`.

## Blog Post Architecture
- **Focus**: Enforces `BlogPost` layout pattern for every article, covering SectionNav setup, panel conventions, shared UI components, and homepage card registration (`src/pages/index.astro`).
- **Structure & Rules**:
  - Import `BlogPost`, prepare `sections` array (id/icon/label), render `SectionNav client:load`.
  - Panels mirror SectionNav entries (`div` IDs `panel-{section.id}`, classes `panel`/`panel active`, only first active).
  - Shared components (`Highlight`, `Card`, `ConvergentEnvelope`) applied for consistent styling; inline styles dictated by template.
  - SectionNav icons drawn from approved set (◈ ▸ ▣ ◑ ⊕ ⬡ → ⟳ ✓ ≡ ∑).
  - Each new post must add corresponding homepage card to keep content surfaced.

## Dev Process
- **Scope & Flow**: Governs style, naming, error handling, security, parallel agent orchestration, git/PR workflow: style enforcement → `pnpm lint/typecheck/format` → tests → commit (conventional) → push via worktree → PR via `gh` post-checks → worktree cleanup.
- **Key Conventions**:
  - Style/naming: 2-space indent, single quotes, trailing commas, interface-based props, import ordering (Node/external → Astro → `@/` aliases → feature-relative), prescribed naming for components/hooks/utilities/stores/css/constants/types.
  - Error handling & config: never swallow errors, keep Vite server config (`host: '0.0.0.0'`, `allowedHosts: ["galadriel"]`), no secrets in repo.
  - Parallel work & agents: dispatcher splits tasks among agents (e.g., `@component-builder`, `@blog-writer`).
  - Git/PR: git worktrees standard for larger work, run lint/typecheck/tests pre-commit, push after verification, open PR via `gh`.
- **Dependencies**: pnpm, ESLint (`@astrojs/eslint-plugin`, `eslint-plugin-react-hooks`), TypeScript, Astro layouts, `gh` CLI.
- **Highlights**: SectionNav must use `client:load`, prefer Astro components for static content, React islands only when needed, maintain Vite config, enforce strict TypeScript, manage theme persistence via LocalStorage.

## Run Commands
- **Purpose & Flow**: Catalogs pnpm scripts for dependency management, development, production builds, quality gates, and tests (Vitest + Playwright).
- **Command Families** (`build_and_run_commands.md`):
  - Setup/Development: `pnpm install` (locks deps via `pnpm-lock.yaml`), `pnpm dev` (Astro server `localhost:4321`).
  - Production: `pnpm build`, `pnpm preview`.
  - Quality: `pnpm lint`, `pnpm format`, `pnpm typecheck` (pnpm usage enforced, npm/yarn prohibited).
  - Testing: Vitest (`pnpm test` with filters/patterns/watch), Playwright (`pnpm test:e2e`).
- **Relations**: Reinforces pnpm-only policy and scripts referenced by `project_guidelines/dev_process`; serves as canonical command reference when orchestrating CI or agent workflows.
---
children_hash: b5d2221021a161a0f0c913b2a1ff2074589b73a0ca25c6f2f5d32f760767c3e5
compression_ratio: 0.5336734693877551
condensation_order: 1
covers: [context.md, development_process_and_rules.md]
covers_token_total: 980
summary_level: d1
token_count: 523
type: summary
---
# dev_process
- **Scope & Flow**: Governs repository-wide code style, naming, error handling, security, parallel task orchestration, and git/PR workflows. Core flow: enforce style → run `pnpm lint/typecheck/format` → execute needed tests → commit (conventional messages) → push via dedicated git worktree → open PR through `gh` once automated checks pass → remove worktree post-merge.
- **Key Concepts & Rules**:
  - Style: 2-space indentation, single quotes, trailing commas, interface-based prop typing (no `any`), co-locate tests/styles with components.
  - Imports: Ordered as Node/external → Astro framework → `@/` aliases → relative within feature folders.
  - Naming: Specific conventions for components, hooks, utilities, stores, CSS modules, constants, and types.
  - Error handling: Never swallow errors; keep Vite server block (host `0.0.0.0`, `allowedHosts: ["galadriel"]`) unchanged.
  - Security: Never commit secrets/API keys/.env files.
  - Parallel work: Dispatcher pattern splitting work across agents like `@component-builder` and `@blog-writer`.
  - Git/PR: Use git worktrees for larger efforts (trivial fixes may touch `main`), run lint/typecheck before every commit, push only when cleared, and create PRs via `gh`.
- **Dependencies & Highlights**: Relies on pnpm, ESLint with `@astrojs/eslint-plugin` and `eslint-plugin-react-hooks`, TypeScript, Astro layouts, and `gh` CLI. Highlights include using `SectionNav` with `client:load`, preferring Astro components for static content and React islands for interactivity, and keeping the Vite server config intact.
- **Fact summary (for drill-down)**: TypeScript strict mode is enforced; imports follow the prescribed order; git worktrees are standard for non-trivial work; pre-commit checks include lint/typecheck/tests and PR creation only after verification; secrets and the Vite config are protected; dark/light persistence uses `LocalStorage` with Astro/React component preferences.

Reference entries: `context.md` (dev_process overview) and `development_process_and_rules.md` (detailed conventions, rules, and facts).
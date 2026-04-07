---
children_hash: 2e30d4697ff2712005d63f179405de23497339800e38d67ef680fb0b9f6ac197
compression_ratio: 0.4435590969455511
condensation_order: 1
covers: [context.md, project_agent_handbook.md]
covers_token_total: 1506
summary_level: d1
token_count: 668
type: summary
---
### Domain: project_guidelines › agents
- **Purpose:** Captures the AGENTS.md handbook for the Software Engineering Blog project, covering commands, architecture patterns, styling, security, worktree policies, and agent behaviors.
- **Key Documents:**
  - `context.md`: High-level overview, highlights pnpm-only workflow, blog post layout conventions (SectionNav, panels), security/git/worktree rules, and the custom agent dispatcher pattern; links to related topics for run commands, post architecture, and dev process.
  - `project_agent_handbook.md`: Detailed transcription of AGENTS.md with raw concepts, narrative structure, dependencies, highlights, required rules, and key facts.

### Summary of Structural Insights
- **Build & Tooling Expectations (linked to `context.md` and detailed in the handbook):**
  - pnpm is the sole package manager; scripts include install, dev (Astro server on localhost:4321), build, preview, lint, lint:fix, typecheck, format, Vitest, and Playwright e2e entries.
  - TypeScript strict mode, 2-space indentation, single quotes, and `@/` alias for imports.
  - Co-locate component, test, and style files per set structure; use `<Image />` from `astro:assets`.

- **Content & Layout Architecture:**
  - Every blog post must wrap content with `BlogPost`, include `SectionNav client:load`, and place panels (first with `panel active`, others with `panel`) inside `.content`.
  - Panel ids follow the `panel-{section.id}` prefix; SectionNav icons limited to the specified set.
  - Components reuse Highlight, Card, ConvergentEnvelope, etc., with SectionNav relying on prescribed directories (components, layouts, pages, styles, content, utils, lib) and React islands only when necessary.

- **Process, Security, and Collaboration Rules:**
  - Worktree usage required for complex work, trivial fixes may stay on main; git worktrees and `_handoff` command (captures git status + commits, writes to `_handoffs/`).
  - Never commit secrets or `.env`, include SectionNav, maintain routing table (Astro routes).
  - Server block in `vite.config.ts` must remain unchanged (`host: '0.0.0.0'`, `allowedHosts: ['galadriel']`).
  - PR/issue tasks handled via GitHub CLI (gh); commits must never mention agent names or include co-author trailers.
  - Rule-based rehearsal: change requests after day 3 deferred, PR reviews within 4h SLA, zero apologies.

- **Agent & Handoff Procedures:**
  - `_handoff` command centralizes recent git metadata into `_handoffs/`.
  - Agents follow a dispatcher pattern that orchestrates pnpm commands, security checks, and handoff file generation, aligning with the overall agent usage pattern described in `context.md`.
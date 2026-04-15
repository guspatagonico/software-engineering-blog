---
title: Project Agent Handbook
tags: []
related: [project_guidelines/run_commands/build_and_run_commands.md, project_guidelines/blog_post_architecture/blog_post_architecture.md, project_guidelines/dev_process/development_process_and_rules.md]
keywords: []
importance: 100
recency: 1
maturity: core
accessCount: 88
createdAt: '2026-04-06T18:03:13.518Z'
updatedAt: '2026-04-06T18:03:13.518Z'
---
## Raw Concept
**Task:**
Document the AGENTS.md handbook covering commands, architecture, styling, security, and collaboration rules for the Software Engineering Blog.

**Changes:**
- Captured the pnpm-only install, build, lint, typecheck, format, and Vitest commands plus Playwright e2e entry points.
- Recorded the routing table, blog post layout template, component structure, and state management expectations.
- Summarized security directives, git worktree policies, parallel agent pattern, handoff command, and seed template usage.

**Files:**
- AGENTS.md

**Flow:**
AGENTS handbook content -> blog architecture + style expectations -> project rules & agents workflow

**Timestamp:** 2026-04-06

## Narrative
### Structure
AGENTS.md opens with the project overview emphasizing an interactive Astro-based blog full of data visualizations, charts, math, and dark/light mode support built on React islands. It lists the required Astro routes via a routing table and prescribes that each blog post imports BlogPost and SectionNav with client:load, wraps panels within a content container, and marks the first panel with "panel active" while the rest are "panel". Component, layout, page, content, style, utils, and lib folders follow the stated structure, and state should default to plain Astro components with inline scripts unless React-specific needs arise.

### Dependencies
SectionNav must be loaded with client:load and reuse existing components like Highlight, Card, and ConvergentEnvelope. The project depends on the listed src directories, and the SectionNav icons must come from the prescribed set.

### Highlights
Key highlights include pnpm-only scripts (install, dev, build, preview, lint, lint:fix, typecheck, format) plus Vitest and Playwright test commands, TypeScript strict mode with 2-space indent and single quotes, the "@/" alias for cross-folder imports, co-located component/test/style triads, and using <Image /> from astro:assets instead of raw <img>.

### Rules
Key rules preserved verbatim:
- Always use SectionNav with client:load — never raw content without section navigation.
- First panel gets `class="panel active"`, rest get `class="panel"`.
- Panel `id` must be `panel-{section.id}` (prefixed with `panel-`).
- Reuse existing components: Highlight, Card, ConvergentEnvelope, etc.
- Add a card entry on the homepage (src/pages/index.astro) for every new post.
- Use icons from: ◈ ▸ ▣ ◑ ⊕ ⬡ → ⟳ ✓ ≡ ∑ for section nav items.
- Never commit API keys, secrets, or .env files. Update .gitignore accordingly.
- Never include agent names in commit messages, co-author trailers, PR text, or docs.
- Do not remove/modify the server block in vite.config.ts (host: '0.0.0.0', allowedHosts: ['galadriel']).
- Never commit and push until the user explicitly asks to do so.
- Use GitHub CLI (gh) for PR creation, issue management, and repo operations.
- Rule 1: All requirement changes after day 3 deferred to next sprint.
- Rule 2: Max 4-hour SLA for initial PR reviews.
- Rule 3: Never use apologies.

### Examples
Blog post layout sample from AGENTS.md:
```astro
---
import BlogPost from '../../layouts/BlogPost.astro';
import SectionNav from '../../components/SectionNav/SectionNav';

const sections = [
  { id: 'section-one', icon: '◈', label: 'Section One' },
  { id: 'section-two', icon: '▸', label: 'Section Two' },
];
---

<BlogPost title="Post Title" subtitle="Subtitle">
  <SectionNav client:load sections={sections} />

  <div class="content">
    <div class="panel active" id="panel-section-one">
      <h2>Section One</h2>
      <!-- content -->
    </div>

    <div class="panel" id="panel-section-two">
      <h2>Section Two</h2>
      <!-- content -->
    </div>
  </div>

  <style>
    .content {
      flex: 1;
      overflow-y: auto;
      padding: 28px 32px;
    }
    .content p {
      font-size: 16px;
    }
    .content ul,
    .content ol {
      font-size: 16px;
      padding-left: 1.5rem;
      margin: 0.75rem 0;
    }
    .content ul li,
    .content ol li {
      font-size: 16px;
      margin-bottom: 0.4rem;
      line-height: 1.6;
    }
    .content h3 {
      font-size: 14px;
    }
    .panel {
      display: none;
    }
    .panel.active {
      display: block;
    }
  </style>
</BlogPost>
```

## Facts
- **package_manager**: pnpm is the only package manager for installs and scripts; npm/yarn must never be used. [project]
- **dev_server**: pnpm dev launches the Astro dev server on localhost:4321. [project]
- **sectionnav_structure**: Every blog post must include SectionNav with client:load, panel ids prefixed with panel-, and the first panel marked panel active. [convention]
- **sectionnav_icons**: SectionNav icons must be chosen from ◈ ▸ ▣ ◑ ⊕ ⬡ → ⟳ ✓ ≡ ∑. [convention]
- **worktree_usage**: Git worktrees are required for new features, complex refactors, or exploratory work, while trivial fixes can stay on main. [convention]
- **handoff_command**: _handoff gathers git status and recent commits then writes a handoff file to _handoffs/. [project]

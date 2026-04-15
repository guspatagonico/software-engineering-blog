---
description: Create a long-form SE blog post from template
agent: se-blog-post
---

Create a new long-form SE blog post using `_seed/se-blog-template.astro`.

Requirements:

- Ask for slug, title, subtitle, description, pubDate (YYYY-MM-DD), tags.
- Create `src/pages/blog/{slug}.astro` based on the template.
- Replace `slug-goes-here` and fill in content for every section.
- Add citations for verified facts and label hypotheses clearly.
- Include at least 3 visuals (Mermaid/C4/draw-io).
- Update `src/data/posts.ts` with the new post metadata.
- Ensure icons are from the approved list in AGENTS.md.
- Validate against `_seed/se-blog-checklist.md` and report any gaps.

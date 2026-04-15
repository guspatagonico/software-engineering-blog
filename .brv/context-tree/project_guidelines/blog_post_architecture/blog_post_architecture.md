---
title: Blog Post Architecture
tags: []
keywords: []
importance: 100
recency: 1
maturity: core
accessCount: 48
createdAt: '2026-04-06T17:42:32.227Z'
updatedAt: '2026-04-06T17:42:32.227Z'
---
## Raw Concept
**Task:**
Capture the blog post structure, mandated SectionNav integration, and supporting shared components so future posts maintain the interactive layout.

**Changes:**
- Required BlogPost entries to import SectionNav and define their sections array before rendering.
- Enforced the panel class/id conventions so client-driven section toggling works predictably.
- Mandated reuse of shared UI components such as Highlight, Card, and ConvergentEnvelope and the addition of homepage card links for new posts.

**Files:**
- src/layouts/BlogPost.astro
- src/pages/index.astro

**Flow:**
Define a sections array with id/icon/label → wrap content in the BlogPost layout → render SectionNav with client:load → render panel divs with ids panel-{section.id} and class panel/panel active → import shared UI components for cards and highlights → style .content and .panel elements inline as shown in the template.

**Timestamp:** 2026-04-06

## Narrative
### Structure
Each blog post imports BlogPost, SectionNav, and a sections array. SectionNav renders the clickable navigation (icons limited to ◈ ▸ ▣ ◑ ⊕ ⬡ → ⟳ ✓ ≡ ∑) and panels below toggle visibility by sharing the panel and panel active classes. Shared UI elements such as Highlight, Card, and ConvergentEnvelope keep the appearance cohesive.

### Dependencies
Relies on Astro layouts and React islands when interactive UI is required; SectionNav must use client:load so the navigation updates in the browser.

### Highlights
Panels follow a strict naming pattern (panel-{section.id}) so button clicks can open the correct panel. The first panel is active by default; others hide until toggled. Every new post ensures it has a homepage card, keeping the landing page in sync with the latest content.

## Facts
- **section_nav_panels**: Every blog post must render SectionNav with client:load and panels whose id is prefixed with panel- followed by the section id. [convention]
- **panel_visibility**: The first panel receives class "panel active" while subsequent panels use class "panel" so only one panel is visible at a time. [convention]
- **section_nav_icons**: SectionNav icons must be selected from the list ◈ ▸ ▣ ◑ ⊕ ⬡ → ⟳ ✓ ≡ ∑. [convention]
- **homepage_cards**: Every new post also adds a card entry on the homepage (src/pages/index.astro) so readers see it immediately. [convention]

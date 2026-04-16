---
title: Mobile UI Performance Patterns
summary: Patterns for avoiding layout shifts and managing complex mobile UI states in Astro/React hybrid environments.
tags: []
keywords: []
importance: 53
recency: 1
maturity: draft
accessCount: 1
createdAt: '2026-04-15T14:56:35.242Z'
updatedAt: '2026-04-15T14:56:35.242Z'
---
## Reason
Document design decisions for mobile UI performance and layout stability

## Raw Concept
**Task:**
Define mobile UI stability and performance patterns

**Timestamp:** 2026-04-15

## Narrative
### Structure
Focus on early state detection via inline scripts and avoidance of layout shifts during hydration.

### Highlights
Precomputed state for labels; data-attribute hooks for CSS-driven visibility.

### Rules
Rule: Use placeholders or precomputed initial state for labels populated after async/late state resolution to avoid layout shifts.
Rule: Detect mobile status (max-width: 767px) as early as possible (inline script in head) to set initial UI flags.

## Facts
- **Mobile UI**: Use placeholders or precomputed initial state for mobile UI labels populated after async state resolution to avoid layout shifts on first paint.
- **Mobile UI**: The component uses window.matchMedia('(max-width: 767px)') to determine mobile status and initial collapse state.
- **Mobile UI**: SectionNav automatically expands (sets isCollapsed to false) when the viewport matches a min-width of 1024px.
- **Mobile UI**: Mobile UI design for the BlogPost layout includes setting 'overscroll-behavior: none' on the '.post-layout' container.
- **Mobile UI**: On mobile devices, the 'post-header' h1 font size is reduced to 16px and the layout switches to a column flex direction.

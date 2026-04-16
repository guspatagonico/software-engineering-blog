---
title: Matrix Background
tags: []
related: [ui/visual_effects/context.md]
keywords: []
importance: 85
recency: 1
maturity: core
accessCount: 10
updateCount: 1
createdAt: '2026-04-07T01:50:56.523Z'
updatedAt: '2026-04-07T02:51:28.121Z'
---
## Raw Concept
**Task:**
Describe the updated MatrixBackground animation component for the UI visual effects library

**Changes:**
- Made stream counts responsive to viewport width with discrete counts for mobile/tablet/desktop columns.
- Inserted a curated list of 44 gem words with randomized placement, brightness boosts, and flicker timers per stream.
- Added theme detection (DOM attribute, storage events, prefers-color-scheme) plus mouse-driven shockwave/vortex effects for richer interactivity.

**Files:**
- src/components/MatrixBackground/MatrixBackground.tsx
- src/components/MatrixBackground/MatrixBackground.module.css

**Flow:**
Mount component -> initialize theme + canvas sizing -> init responsive streams with weighted layer selection -> start draw loop that renders characters with gem styling and updates state -> respond to resize/mouse/theme events -> regenerate streams when off-screen -> cleanup listeners + animation frame

**Timestamp:** 2026-04-07

## Narrative
### Structure
MatrixBackground renders a full-screen canvas using five depth layers, each layer controlling speed, font size, alpha, and column coverage. Streams are regenerated per column with randomized start positions, brightness gradients, and optional gem inserts. Animation responds to theme state, mouse position, and viewport resizing.

### Dependencies
Relies on MatrixBackground.module.css for canvas sizing, listens to document.documentElement data-theme attribute, storage events, a theme-changed custom event, and prefers-color-scheme to keep colors in sync. Mouse movement, resize, and MutationObserver callbacks keep the animation reactive.

### Highlights
Gem words blink with occasional flashes, guided by timers that swap characters briefly. Dark mode uses layered color palettes while light mode shifts to teal tones. Mouse proximity generates subtle shockwaves and vortex pulls that nudge nearby streams.

### Rules
Rule: Avoid blocking render work inside draw; updates run via requestAnimationFrame and cleanup removes all listeners. Rule: Gem positions pause regular character updates to preserve their timers; non-gem characters change at a CHAR_CHANGE_RATE of 0.3 with CHAR_CHANGE_COUNT adjustments.

## Facts
- **stream_counts**: Stream counts are responsive: 60 columns on mobile (<768px), 180 on tablet (768-1024px), and 220 on desktop. [project]
- **gem_words**: Each stream has a 70% chance of embedding one of 44 curated gem words that flash via per-character timers. [project]
- **mouse_effects**: Mouse influence occurs within a 200px radius, driving exponential shockwave displacement, vortex pull, and layer-specific alpha adjustments. [project]

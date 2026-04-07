---
title: Matrix Background
tags: []
keywords: []
importance: 50
recency: 1
maturity: draft
createdAt: '2026-04-07T01:50:56.523Z'
updatedAt: '2026-04-07T01:50:56.523Z'
---
## Raw Concept
**Task:**
Capture the MatrixBackground component that renders the immersive interactive digital rain effect on the homepage.

**Changes:**
- Added 180-stream canvas renderer with five depth-based layers.
- Mixed Latin and Japanese katakana characters to echo a cyber-noir aesthetic.
- Embedded 30 hidden gem words with rare flickering events and mouse-influenced displacement.

**Files:**
- src/components/MatrixBackground/MatrixBackground.tsx
- src/components/MatrixBackground/MatrixBackground.module.css

**Flow:**
Mount component -> size canvas to viewport -> initialize streams with layer weights -> animate draw loop (clear, render per-stream character states, update gem timers, regenerate off-screen streams) -> respond to resize/mouse/theme events.

**Timestamp:** 2026-04-06

## Narrative
### Structure
MatrixBackground is a React component that uses a <canvas> ref and an effect to manage the render loop. Streams are generated per layer weight, each carrying characters, brightness gradients, and optional gem metadata that determines flicker behavior. The draw routine clears the canvas, iterates through streams in their roughly sorted order, adjusts color/shadow based on depth, head/tail position, and dark/light themes, and finally applies mouse offsets before drawing each glyph.

### Dependencies
Relies on the MatrixBackground CSS module for positioning, localStorage/theme media queries to sync with site theme, and a font stack that includes Noto Sans Mono, MS Gothic, and Hiragino Sans for consistent monospace glyphs.

### Highlights
Hidden gem words include terms like gustavo, robotics, kernel panic, and linus torvalds and flash rarely (0.2% per character) with bright green glow. Mouse interactions use a 200px radius, exponential falloff, and subtle vortex pulls so pointers repel the streams while keeping the motion soft. Stream regenerations keep 180 columns flowing with CHAR_CHANGE_RATE 0.3, CHAR_CHANGE_COUNT 2, and layered alpha blending to maintain performance while preserving the retro matrix aesthetic.

## Facts
- **stream_density**: MatrixBackground runs 180 streams distributed across five depth layers with varying speeds, alphas, and font sizes. [project]
- **character_mix**: Character composition is 70% Latin characters and 30% Japanese katakana, drawn from LATIN_CHARS and JAPANESE_CHARS constants. [project]
- **gem_words**: Hidden gem words (30 listed terms) appear with GEM_CHANCE 0.002 and have independent gemTimers controlling flicker cadence. [project]
- **mouse_interaction**: Mouse influence radius is 200px, applying exponential repulsion, offset vortices, and subtle pulls that depend on layer depth. [project]
- **char_refresh**: Characters refresh at CHAR_CHANGE_RATE 0.3 with CHAR_CHANGE_COUNT 2, while gem tiles flicker at separate timers when gemTimers expire. [project]

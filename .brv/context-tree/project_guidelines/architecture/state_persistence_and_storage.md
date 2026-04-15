---
title: State Persistence and Storage
summary: Centralized localStorage management using gsalvini-se-blog key with support for theme, matrix background, and checklist persistence.
tags: []
keywords: []
importance: 50
recency: 1
maturity: draft
createdAt: '2026-04-15T13:18:35.710Z'
updatedAt: '2026-04-15T13:18:35.710Z'
---
## Reason
Document unified localStorage persistence strategy

## Raw Concept
**Task:**
Implement unified state persistence

**Files:**
- src/utils/storage.ts
- src/components/Checklist/Checklist.tsx
- src/components/ThemeToggle.astro
- src/components/Head/Head.astro
- src/layouts/Base.astro

**Flow:**
readStorage() -> update state -> updateStorage() -> writeStorage()

**Timestamp:** 2026-04-15

## Narrative
### Structure
Persistence logic is centralized in src/utils/storage.ts with a PersistedState interface defining the schema.

### Highlights
Uses a single localStorage key to avoid clutter. Includes migration logic for legacy keys (theme, matrix-background-visible).

### Rules
Rule 1: Always use updateStorage helper to modify state to ensure read-modify-write consistency.
Rule 2: Check for window undefined to support SSR/Astro build-time safety.

## Facts
- **storage_key**: Central localStorage key is 'gsalvini-se-blog' [project]
- **persisted_state**: State includes theme, matrixBackgroundVisible, convergentEnvelopeMode, and checklists [project]

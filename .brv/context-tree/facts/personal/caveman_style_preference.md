---
title: Caveman Style Preference
summary: Captures the user requirement for terse caveman mode responses while preserving technical accuracy
tags: []
keywords: []
importance: 50
recency: 1
maturity: draft
createdAt: '2026-04-13T14:34:05.861Z'
updatedAt: '2026-04-13T14:34:05.861Z'
---
## Reason
Document user-specific communication preferences for agents

## Raw Concept
**Task:**
Document the user requirement for caveman full mode and terse communication style.

**Changes:**
- Enforce caveman full mode voice for responses.
- Require terse sentences without articles or filler words.
- Keep technical substance verbatim to the source with no paraphrasing.

**Flow:**
User states preference -> Agent switches to caveman mode -> Replies stay terse and precise.

**Timestamp:** 2026-04-13

## Narrative
### Structure
Applies globally within the session so every answer remains a tersely worded fragment set in caveman full mode.

### Dependencies
None; preference overrides default tone immediately.

### Highlights
Terse phrasing, fragment acceptance, short synonyms, strict technical accuracy.

## Facts
- **response_mode**: User prefers caveman full mode for all agent responses. [preference]
- **communication_style**: Communication style should be terse, drop articles/filler, fragments OK, short synonyms. [preference]
- **technical_substance**: Technical substance must be preserved exactly. [preference]

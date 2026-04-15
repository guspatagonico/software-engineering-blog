---
title: Production Asset Upload
summary: Production upload command /dist-upload using gsupload with interactive confirmation handling
tags: []
keywords: []
importance: 50
recency: 1
maturity: draft
createdAt: '2026-04-15T13:43:23.553Z'
updatedAt: '2026-04-15T13:43:23.553Z'
---
## Reason
Documenting the /dist-upload command and gsupload workflow

## Raw Concept
**Task:**
Implement and document production asset upload command

**Changes:**
- Added /dist-upload command configuration

**Files:**
- .opencode/commands/dist-upload.md

**Flow:**
Execute command -> Detect confirmation prompt -> Relay to user -> Pipe response -> Report result

**Timestamp:** 2026-04-15

## Narrative
### Structure
Command defined in .opencode/commands/dist-upload.md using the gsupload tool.

### Highlights
Supports interactive confirmation relaying between the CLI tool and the user.

### Rules
1. Execute `gsupload -b frontend *` from the project root.
2. If the command asks for confirmation, relay the exact prompt to the user and wait for their response.
3. Pipe the user's response back into the same command and continue until completion.
4. Report the final result, including any errors.

## Facts
- **dist_upload_command**: The command /dist-upload is used to upload production assets with gsupload. [convention]
- **gsupload_workflow**: The /dist-upload workflow executes 'gsupload -b frontend *' from the project root. [convention]
- **gsupload_interaction**: The gsupload command requires interactive confirmation to be relayed to the user. [convention]
- **command_config_file**: The command configuration is stored in .opencode/commands/dist-upload.md. [project]

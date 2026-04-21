---
mode: agent
description: Upload production assets with gsupload
---

Run the production upload for this project.

Do not run any other commands or skills before invoking gsupload.

Workflow:

1. Execute `gsupload -b frontend "*"` from the project root.
2. If the command asks for confirmation, relay the exact prompt to the user and wait for their response.
3. Pipe the user's response back into the same command and continue until completion.
4. Report the final result, including any errors.

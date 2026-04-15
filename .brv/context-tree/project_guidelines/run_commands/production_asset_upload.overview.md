### Key Points
* **Command Purpose**: The `/dist-upload` command is established to handle the uploading of production assets.
* **Tooling**: The workflow utilizes the `gsupload` CLI tool, specifically targeting the `frontend` bucket.
* **Interactive Handling**: A critical feature of the command is its ability to relay interactive confirmation prompts from the CLI tool to the user and pipe responses back to the process.
* **Execution Context**: The command must be executed from the project root directory using the syntax `gsupload -b frontend *`.
* **Configuration Storage**: Command definitions and configurations are maintained within the `.opencode/commands/dist-upload.md` file.

### Structure Summary
* **Reason**: Brief justification for documenting the command and the `gsupload` workflow.
* **Raw Concept**: Technical overview including task definitions, file impacts, and a high-level execution flow (Execute -> Detect -> Relay -> Pipe -> Report).
* **Narrative**: Detailed breakdown of the command structure, highlights regarding interactivity, and specific operational rules for execution.
* **Facts**: A list of formalized conventions and project-specific metadata regarding the command and its configuration.

### Notable Entities, Patterns, and Decisions
* **Entities**:
    * `gsupload`: The primary CLI tool used for asset transmission.
    * `frontend`: The specific bucket identifier used in the upload command.
    * `.opencode/commands/dist-upload.md`: The designated configuration file.
* **Patterns**:
    * **Interactive Relay Pattern**: The system is designed to act as a bridge for interactive CLI prompts, ensuring that automated commands can still handle manual confirmation steps without breaking the execution flow.
* **Decisions**:
    * **Root Execution**: The decision to enforce command execution from the project root to ensure path consistency for the wildcard (`*`) glob.
    * **Standardized Command Mapping**: Mapping the complex `gsupload` string to a simplified `/dist-upload` command for better developer ergonomics.
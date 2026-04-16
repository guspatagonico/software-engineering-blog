### Key Points
* **Worktree-Centric Development:** Mandatory use of `git worktree` for features, complex refactors, and exploratory work to maintain a clean environment.
* **Conventional Commits:** All commit messages must adhere to the Conventional Commits specification (e.g., `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`).
* **PR-Driven Workflow:** Merges to the `main` branch are restricted to Pull Requests created via the GitHub CLI (`gh`), ensuring the main branch remains stable.
* **Pre-Commit Validation:** Developers are required to run linting and typechecking tools before committing any code.
* **Branch Naming Convention:** Branches must be prefixed according to their purpose: `feat/`, `fix/`, or `refactor/`.

### Structure / Sections Summary
* **Reason & Raw Concept:** Outlines the motivation for the policy and provides the high-level command sequence (`add` -> `develop` -> `push` -> `pr create` -> `merge` -> `remove`).
* **Narrative:** 
    * **Structure:** Defines the scope of worktree usage versus trivial fixes.
    * **Highlights:** Emphasizes the use of the GitHub CLI and branch cleanliness.
    * **Rules:** Lists specific constraints regarding commit timing, validation, and naming.
* **Facts:** Formalizes the project conventions for `git_worktree` and `commit_format`.

### Notable Entities, Patterns, and Decisions
* **Entities:**
    * **GitHub CLI (`gh`):** Designated tool for managing Pull Requests.
    * **Main Branch:** The protected target for all merges; direct pushes are limited to "trivial fixes."
* **Patterns:**
    * **Worktree Lifecycle:** A pattern of creating isolated linked working trees for tasks and deleting them immediately after the PR is merged.
    * **Conventional Commits:** A standardized pattern for automated or readable changelogs.
* **Decisions:**
    * **Validation First:** A hard decision to mandate linting and typechecking as a prerequisite for commits.
    * **Worktree over Branching:** A preference for worktrees over standard branch switching to handle features and refactors.
    * **Restricted Commits:** A rule prohibiting commits or pushes until specifically requested by the user/workflow.
### Key Points
- **Convergent Envelope Controls**: Switcher defaults to animated mode with localStorage persistence guarding transitions; defined animation constants, wobble modifiers, and reduced-motion fallbacks ensure consistent behavior across states.
- **Context Budgeting**: Enforces ~5.8k token cap across system/spec/files/handoff entries, requires explicit exclusions, and pairs with `session-state.md` tracking to keep shared state, decisions, and blockers transparent.
- **Fork/Join Orchestration Rules**: Parallel branches must write distinct files, deliver independently validatable outputs, and allow the orchestrator to verify each before recombining, preventing conflicts and ensuring deterministic joins.
- **Drift Handling & Vocabulary**: Drift signal responses guide scope expansions, file edits, domain clarifications, schema adjustments, and split workflows; glossary entries (e.g., convergent envelope, entropía agéntica) standardize terminology and CSS styling cues.
- **Tool & Skill Budgets**: Matrix defines allowances for pmpro-css, paypal-nvp, pmpro-js, wp-db, and orchestrator roles, including filesystem, db-client/web-fetch permissions, and required expertise to keep sub-agents within bounded contexts.
- **Checklist Guidance**: Validations cover artifact/tool/context budgets, session-state updates, handoff details, and phase milestones to enforce contract compliance for both sub-agents and orchestrator phases.

### Structure / Sections Summary
1. **Reason & Raw Concept**: Establishes document objective—capturing ConvergentEnvelope behavior, budgets, orchestration rules, and vocabulary/style guidance—plus a flow overview moving from models to checklists.
2. **Narrative**
   - *Structure*: Describes section sequencing from mental models through budgets, orchestration diagrams, tool matrices, checklists, and glossary/style notes.
   - *Dependencies*: Lists required components (SVG/styling/session-state/handoff templates).
   - *Highlights*: Emphasizes localStorage persistence, animation constants, context budget template, fork/join rules, drift table, and tool budget matrix.
   - *Rules & Examples*: States parallelism constraints and checklist/vocabulary entries instrumental for enforcing sub-agent contracts.
3. **Facts**: Provides concretely enumerated items for switcher behavior, animation parameters, context limits, orchestration rules, drift responses, and tool budget matrix.

### Notable Entities, Patterns, and Decisions
- **Entities**: `ConvergentEnvelope`, `session-state.md`, tool scopes (pmpro-css, paypal-nvp, pmpro-js, wp-db), orchestrator components, and glossary terms like *entropía agéntica* and *fork-join*.
- **Patterns**:
  - *Context Budget Template*: Structured around ~5800 tokens with explicit exclusions to bound work.
  - *Fork/Join Guardrails*: Parallel branches governed by file exclusivity, independency, and validator-ready outputs before joins.
  - *Drift Signal Table*: Escalation pattern linking drift symptoms to interrupts, clarifications, or workflow splits.
- **Decisions**:
  - Animation preferences are stored via `STORAGE_KEY`, with crossfade guards to avoid mid-transition toggles.
  - Tool budgets specify precise permission scopes, ensuring sub-agents operate within bounded capabilities.
  - Checklist prompts enforce documentation of budgets, updates, and validations before proceeding between phases.
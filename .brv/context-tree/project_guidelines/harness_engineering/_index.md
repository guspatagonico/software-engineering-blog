---
children_hash: b5d03f5e91068d14e9646e71f9ccfede98049464b1d8ee0a76bdb5177464407b
compression_ratio: 0.3237095363079615
condensation_order: 1
covers: [context.md, harness_engineering_framework.md, harness_engineering_page.md]
covers_token_total: 2286
summary_level: d1
token_count: 740
type: summary
---
# Harness Engineering (d1)

Harness Engineering provides a control-theory-based framework for managing agentic workflows, focusing on convergence, context management, and parallel orchestration. It defines the "Convergent Envelope" mental model to guide sub-agents from initial dispersion toward a validated goal.

### Core Mental Model & Framework
The framework utilizes control theory concepts to ensure goal alignment and prevent "Agentic Entropy" (drift from uncoordinated local optimizations).
- **Convergent Envelope**: A dynamic boundary that tolerates initial exploration but narrows action space as a solution approaches.
- **Barrier Functions (CBF)**: Structural constraints or "repulsive walls" that prevent scope violations and restricted path access.
- **Lyapunov Functions**: A requirement that every orchestrator intervention must monotonically decrease the distance to the objective.
- **Convergence**: A bounded action space maintained through clear feedback loops and accounted actions.
- **Reference**: *harness_engineering_framework.md*

### Orchestration & Parallelism
Orchestration follows a **Fork-Join** pattern to manage parallel sub-agent execution while maintaining global coherence.
- **Fork-Join Rules**: Parallelism is permitted only when branches have no shared write-access, produce independent outputs, and allow for isolated validation.
- **Orchestrator Role**: Measures distance to goals and redirects agents without deep domain involvement; maintains the **Session State** (compressed global state).
- **Drift Signals**: Triggers for redirection include scope expansion, out-of-scope edits, domain-specific questions, schema mismatches, and premature convergence loops.
- **Reference**: *harness_engineering_framework.md*, *harness_engineering_page.md*

### Resource & Context Budgeting
Strict constraints are applied to prevent context window saturation and ensure sub-agent focus.
- **Context Budget**: Capped at ~5,800 tokens, covering system specs, files, and handoffs.
- **Session State**: Uses `session-state.md` to track completed work, decisions, and blockers across handoffs.
- **Tool/Skill Matrix**: Defines bounded permissions for sub-agents (e.g., `pmpro-css`, `wp-db`, `orchestrator`) covering filesystem, database, and web-fetch allowances.
- **Reference**: *context.md*, *harness_engineering_page.md*

### Implementation & UI Standards
The Harness Engineering interface implements specific visual and persistence patterns to reflect the mental model.
- **ConvergentEnvelope Switcher**: Supports static and animated modes with `localStorage` persistence and `prefers-reduced-motion` fallbacks.
- **Animation Constants**: Uses precise mathematical parameters (X0=28, X1=592, Yc=130, A=82) and wobble-modified paths to visualize the envelope.
- **UI Components**: Employs `.phase-diagram`, `.fj-stage-token`, and `.curves` classes for orchestration visualization.
- **Reference**: *harness_engineering_page.md*
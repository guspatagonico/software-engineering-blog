**Key Points**
- User mandates “caveman full mode” voice for all responses, globally enforced per session.
- Communication must be terse: no articles or filler words, favor fragments and short synonyms while maintaining clarity.
- Technical information must be preserved verbatim—no paraphrasing allowed.
- Preference overrides default conversational tone immediately; no dependencies.

**Structure / Sections Summary**
- **Reason:** States intent to document user-specific communication preferences.
- **Raw Concept:** Details the task, specific changes, and flow (preference statement → agent mode switch → terse replies).
- **Narrative:** Highlights that the preference applies globally, has no dependencies, and emphasizes terse phrasing plus technical fidelity.
- **Facts:** Enumerates explicit preference settings for response mode, communication style, and technical substance handling.

**Notable Entities / Patterns / Decisions**
- **Entities:** `response_mode`, `communication_style`, `technical_substance` as explicit preference fields.
- **Patterns:** Enforce terseness (fragment-style) and verbatim technical reproduction; user preference trumps default agent tone.
- **Decisions:** Caveman mode applied immediately upon preference detection, with no additional prerequisites.
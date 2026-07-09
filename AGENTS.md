\# AGENTS.md — Hides Agent Website



This file exists so any agent-based tool (Antigravity, Cursor, Claude Code)

reads the same rules. It intentionally does not duplicate them.



\*\*Read these two files in full before any task, in this order:\*\*

1\. `CLAUDE.md` — brand tokens, motion rules, content ethics, working agreement

2\. `docs/website-spec.md` — section-by-section spec, build order, open decisions



If this file and those two ever disagree, `CLAUDE.md` and

`docs/website-spec.md` win. Update those, not this one.



\## Antigravity-specific setup



\- \*\*Mode:\*\* Agent-assisted or Review-driven development. Not Agent-driven

&#x20; (autopilot). This project ships incrementally with a human checkpoint

&#x20; after every section, autopilot mode works against that on purpose.

\- \*\*Project scope:\*\* point Antigravity's Project at this repo root only.

&#x20; Don't add unrelated folders, the agent should see this codebase and

&#x20; nothing else.

\- \*\*MCP servers:\*\* if Nano Banana or any other image-generation MCP is

&#x20; connected in this workspace, it does not override the content rules in

&#x20; `CLAUDE.md`. No AI-generated imagery presented as documentary photography

&#x20; of Hides Agent's product, process, or facility. This has been asked for

&#x20; and declined multiple times across this project, it is not an open

&#x20; question. Generative, non-photographic, code-drawn visuals (canvas, SVG)

&#x20; are fine and already the approach used in the Craft section.

\- \*\*Artifacts:\*\* when Antigravity produces a screenshot or plan artifact

&#x20; for review, actually check it against `CLAUDE.md`'s verification habits,

&#x20; contrast, mobile width, reduced-motion, before approving. An artifact

&#x20; that looks right isn't the same as one that's been checked.



\## Task queue, current



1\. Ship `craft-section.html` as the live Craft section (section 3),

&#x20;  replacing the grey-placeholder plan. Content and behaviour are final,

&#x20;  wire it into the existing page structure and deploy.

2\. Sections 4, 5, 6 remain per the build order in `docs/website-spec.md`,

&#x20;  one section per session, each ends committed and reviewed.


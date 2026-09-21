// Beat 3 of ticket #23's resolved narrative. The agent's first AGENT.md
// draft only captures what it was just told to fix (the two landmines from
// beat 2) — not the structural facts nobody had mentioned yet. The human
// has to prompt for those too, even for the "core knowledge" artifact
// meant to save the next person from relearning them.

import { line, file, transcript } from "./existing-project-shared";

export function mount(container: HTMLElement): void {
  container.innerHTML = transcript([
    line("agent", "Here's what I've written down so far."),
    file(
      "AGENT.md (draft)",
      `# Riverside Ticketing

Express + EJS + jQuery, SQLite via \`better-sqlite3\`. No test suite.

- \`tickets.status\` is free text, not an enum. Compare case-insensitively —
  legacy rows have inconsistent casing.
- No CSV-writing utility exists yet; use a small audited dependency,
  don't hand-roll escaping.`
    ),
    line(
      "human",
      "This is missing the access-control rule we just talked about, and there's nothing about routes.js being one giant file people shouldn't casually split. Add both — that's exactly the kind of thing the next person needs on day one.",
      {
        note: "<strong>Human guides the doc itself:</strong> even the \"core knowledge\" artifact needed a nudge — the agent captured what it had just been told to fix, but not the standing structural facts nobody had mentioned yet.",
        humanLed: true,
      }
    ),
    file(
      "AGENT.md (updated)",
      `# Riverside Ticketing

Express + EJS + jQuery, SQLite via \`better-sqlite3\`. No test suite.

- All routes live in \`routes.js\` (1,200+ lines). Don't split it as a
  side effect of an unrelated change.
- Auth: \`req.session.role\` is \`"admin"\` or \`"agent"\`, checked inline
  in each handler. Agents act only on tickets where
  \`assignee_id = req.session.userId\`; admins act on all tickets. Any
  new ticket-scoped route must respect this.
- \`tickets.status\` is free text, not an enum. Compare case-insensitively —
  legacy rows have inconsistent casing.
- No CSV-writing utility exists yet; use a small audited dependency,
  don't hand-roll escaping.`
    ),
  ]);
}

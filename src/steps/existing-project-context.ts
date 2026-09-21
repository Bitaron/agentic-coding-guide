// Beat 2 of ticket #23's resolved narrative. The agent reads the code at
// face value — it finds where to add the filter but doesn't question the
// data itself. The human flags two landmines unprompted: dirty free-text
// `status` casing, and the CSV-escaping risk of hand-rolling instead of
// using a library. Neither catch comes from the agent.

import { line, file, transcript } from "./existing-project-shared";

export function mount(container: HTMLElement): void {
  container.innerHTML = transcript([
    line(
      "agent",
      "Reading routes.js. Looks like all the ticket routes live in one file, and I can filter by adding a <code class=\"inline\">status</code> condition to the existing query.",
      {
        note: "<strong>Why this matters:</strong> the agent's read is surface-level — it found where to add the filter but didn't question the data itself.",
      }
    ),
    file(
      "routes.js (excerpt)",
      `app.get('/tickets', (req, res) => {
  const role = req.session.role;
  const rows = role === 'admin'
    ? db.prepare('SELECT * FROM tickets').all()
    : db.prepare('SELECT * FROM tickets WHERE assignee_id = ?').all(req.session.userId);
  res.render('tickets/list', { rows });
});`
    ),
    line(
      "human",
      "Before you wire up the filter — status is just a free-text column, not an enum. There's old data with weird casing, like \"Closed\" instead of \"closed\". If you match it exactly you'll silently drop rows.",
      {
        note: "<strong>Human catches it:</strong> this is a real production landmine the agent didn't spot from the schema alone — it took the human, who knows the data's history, to flag it before code got written.",
        humanLed: true,
      }
    ),
    line("agent", "Got it, I'll compare case-insensitively then."),
    line(
      "human",
      "Also — for the CSV part, don't hand-roll the writing yourself. I've seen comma/quote escaping bugs from homemade CSV code before. Just pull in a small, well-used library.",
      {
        note: "<strong>Human guides again:</strong> a second unprompted correction — the agent hadn't raised the escaping risk on its own; it was heading toward the easy, riskier path.",
        humanLed: true,
      }
    ),
    line(
      "agent",
      "Makes sense, I'll add <code class=\"inline\">json2csv</code> as a dependency instead."
    ),
  ]);
}

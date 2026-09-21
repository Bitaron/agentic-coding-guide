// Beat 5 of ticket #23's resolved narrative — the section's closing beat.
// The human catches a real bug in code review: a missing auth guard, found
// by comparing the new route against the codebase's own established
// pattern (the role check in routes.js, first read in
// existing-project-context.ts). The agent did not catch this itself, and
// this project has no tests that would have caught it either.

import { line, file, transcript } from "./existing-project-shared";

export function mount(container: HTMLElement): void {
  container.innerHTML = transcript([
    line(
      "human",
      "Looking at the diff — the export route checks <code class=\"inline\">req.session.role === 'admin'</code> to decide the query, but there's no check that <code class=\"inline\">req.session.userId</code> even exists first. What happens if someone hits this URL without a session?",
      {
        note: "<strong>Human catches the real bug:</strong> a missing auth guard, found by comparing the new route against the codebase's own established pattern — not something the agent flagged itself, and not something tests would have caught either, since this project has none.",
        humanLed: true,
      }
    ),
    line(
      "agent",
      "You're right, that would throw instead of returning 401. Fixing it to match the guard the other routes use."
    ),
    file(
      "routes.js (fix)",
      `app.get('/tickets/export.csv', (req, res) => {
  if (!req.session.userId) return res.sendStatus(401);
  const role = req.session.role;
  // ...unchanged filter logic
});`
    ),
    line("human", "That matches the pattern everywhere else now. Approved — merge it."),
  ]);
}

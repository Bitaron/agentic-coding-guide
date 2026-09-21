// Beat 1 of the "Working in an existing project" section's five-beat
// narrative (ticket #23, resolved). Fictional subject and change, stated
// once here since this is the section's first step: "Riverside Ticketing,"
// a small legacy support-ticket app (Express + jQuery + SQLite, one
// 1,200-line routes.js, no tests), asked to add status filtering + CSV
// export. The agent jumps toward implementation without asking about
// access; the human stops it and volunteers the admin/agent ownership
// split unprompted — the first of the section's human-initiated catches.

import { line, transcript } from "./existing-project-shared";

export function mount(container: HTMLElement): void {
  container.innerHTML = `
    <p class="ex-intro">
      "Riverside Ticketing," a small, messy, fictional internal
      support-ticket app &mdash; Express + jQuery + SQLite, one
      1,200-line <code class="inline">routes.js</code>, no tests.
      Requested change: add status filtering + CSV export. The agent below
      is deliberately ordinary, not exceptionally sharp &mdash; most of the
      catches across this story come from the human actively steering and
      reviewing, not from the agent anticipating everything on its own.
    </p>

    ${transcript([
      line("human", "Add status filtering + CSV export to the tickets list."),
      line(
        "agent",
        "Sure, I can add that. I'll take a look at the codebase and get started.",
        {
          note: "<strong>Why this matters:</strong> the agent's default move is to jump straight to implementation — it didn't ask who uses this or what the access rules are. Left alone, it would have built <em>something</em>, just not necessarily the right thing.",
        }
      ),
      line(
        "human",
        "Hold on, don't start yet. Not everyone should be able to export everything — agents can only export their own tickets, admins get everyone's. Did you check who's using this and how before diving in?",
        {
          note: "<strong>Human steers:</strong> the human stops the agent and volunteers the access-control rule unprompted, rather than waiting for the agent to ask a sharp question it wasn't going to ask.",
          humanLed: true,
        }
      ),
      line(
        "agent",
        "I hadn't gotten to permissions yet — good to know. I'll make sure export respects that split."
      ),
    ])}
  `;
}

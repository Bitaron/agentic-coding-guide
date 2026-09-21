// Beat 4 of ticket #23's resolved narrative. The agent's plan is
// technically fine but drops the ownership-scoping requirement already
// established twice (beats 1 and 2 — see existing-project-ask.ts and
// existing-project-context.ts). The human catches it before any code
// exists, which is the cheaper place to catch it.

import { line, transcript } from "./existing-project-shared";

export function mount(container: HTMLElement): void {
  container.innerHTML = transcript([
    line(
      "agent",
      "Plan: (1) add <code class=\"inline\">?status=</code> to the tickets list query, matched case-insensitively; (2) add a <code class=\"inline\">/tickets/export.csv</code> route using <code class=\"inline\">json2csv</code>; (3) add a status dropdown and an \"Export CSV\" link to the list view.",
      {
        note: "<strong>Why this matters:</strong> the plan is technically fine but incomplete — it never mentions the ownership scoping the human already established twice. It's an easy detail to drop between \"decided\" and \"written down.\"",
      }
    ),
    line(
      "human",
      "Two things: the export route needs the same admin/agent scoping as the list route — don't let it become an unfiltered admin-only assumption by accident. And the export link should carry whatever status filter is currently on screen, not export everything.",
      {
        note: "<strong>Human reviews the plan, not just the diff:</strong> both corrections happen before any code exists — cheaper to redirect a plan than to unwind an implementation.",
        humanLed: true,
      }
    ),
    line(
      "agent",
      "Updating the plan: export route re-uses the exact same role/ownership branch as the list route, and its link carries the current <code class=\"inline\">?status=</code> value. Proceeding with this version."
    ),
  ]);
}

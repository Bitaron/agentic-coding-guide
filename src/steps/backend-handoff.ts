// Beat 3 of the Backend dev example's three-beat narrative (see
// backend-planning.ts for the shared grounding note): the on-screen question
// about portability, answered by committing a handoff document, then proven
// in practice on the other computer, then closed out five days later back
// on the first. The first shot crops the bottom half of the same frame
// backend-structure.ts crops the top half of (see that file's note) rather
// than duplicating the image. Two computer switches happen in this beat,
// each marked explicitly per issue #18's acceptance criteria.

import { shotFigure, handoffMarker, type Shot } from "./backend-shared";
import shotQuestion from "../../backendExample/secondComputer/Screenshot From 2026-09-11 02-43-36.png";
import shotAnswer from "../../backendExample/secondComputer/Screenshot From 2026-09-11 02-46-15.png";
import shotProof from "../../backendExample/firstComputer/Screenshot From 2026-09-11 19-43-05.png";
import shotFinalTree from "../../backendExample/secondComputer/Screenshot From 2026-09-15 10-19-18.png";

const SHOT_QUESTION: Shot = {
  src: shotQuestion,
  machine: 2,
  timestamp: "Sep 11, 2:43 AM",
  crop: "bottom",
  alt: "Terminal session with the typed question: “if I open this project in different pc with different claude will it start from here? if not create handoff document”, and the agent starting to check what state does and doesn't travel with the repo.",
  caption:
    "Mid-session, the question gets typed in plain English: “if I open this project in different pc with different claude will it start from here? if not create handoff document.”",
};

const SHOT_ANSWER: Shot = {
  src: shotAnswer,
  machine: 2,
  timestamp: "Sep 11, 2:46 AM",
  alt: "Terminal session showing an edit to AGENTS.md adding an “Agent skills / Issue tracker” section pointing at the project's GitHub issues and wayfinder map, then committed and pushed as pull request #21.",
  caption:
    "Answered with a commit, not a promise: an “Issue tracker” section added to AGENTS.md, pointing straight at the wayfinder map — committed and pushed as PR #21.",
};

const SHOT_PROOF: Shot = {
  src: shotProof,
  machine: 1,
  timestamp: "Sep 11, 7:43 PM",
  alt: "Terminal session on a different working directory, running the wayfinder skill cold after /clear; it asks which map to work through, then reads AGENTS.md and runs “gh issue view 1”.",
  caption:
    "Hours later, on the other computer: a fresh session, wayfinder invoked cold, reading that same pointer to find out which map to resume.",
};

const SHOT_FINAL: Shot = {
  src: shotFinalTree,
  machine: 2,
  timestamp: "Sep 15, 10:19 AM",
  alt: "IntelliJ project tree showing the realized Maven modules: file-manager-api, -core, -parent, -service, -spring-boot-autoconfigure, -spring-boot-starter, -storage-api, -storage-local, -storage-s3, -test-support, -usage-example.",
  caption:
    "Five days later, back on Computer 2: the plan realized in IntelliJ — a few names refined along the way (“file-manager-service” where the plan said “standalone-server”, plus dedicated storage-api and test-support modules).",
};

export function mount(container: HTMLElement): void {
  container.innerHTML = `
    <p class="bx-intro">The literal question, asked and answered on screen
      &mdash; then proven, not just claimed, on the other computer.</p>

    <div class="bx-shots">
      ${shotFigure(SHOT_QUESTION)}
      ${shotFigure(SHOT_ANSWER)}
      ${handoffMarker(2, 1)}
      ${shotFigure(SHOT_PROOF)}
      ${handoffMarker(1, 2)}
      ${shotFigure(SHOT_FINAL)}
    </div>

    <p class="bx-outro">The map itself closed on September 12; its 21
      resolved decisions were synthesized into a full spec, published as its
      own issue and ready for implementation.</p>
  `;
}

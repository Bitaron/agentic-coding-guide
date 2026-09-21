// Representation choice (per .claude/skills/create-section/SKILL.md): real
// product screenshots, not a diagram — this section's whole point is to
// show the actual backend build, per ProjectBrief.md §6. Beat 1 of the
// three-beat narrative curated in ticket #3 (issue #18's parent): the
// project description gets charted as a wayfinder map before any code
// exists. Screenshots and captions are grounded in what's on screen and in
// the backend project's own resolved wayfinder map
// (spring-boot-file-manager#1) — nothing here is invented.

import { shotFigure, type Shot } from "./backend-shared";
import shotProjectDetail from "../../backendExample/secondComputer/Screenshot From 2026-09-10 17-57-29.png";
import shotMapFound from "../../backendExample/secondComputer/Screenshot From 2026-09-11 02-20-43.png";

const PROJECT_DESCRIPTION = `File manager service.
Multi tenant
Java, Spring boot latest
Usable both as library and service
File storage should be swappable.
Swagger doc with documentation
Documentation for library use.
Api key authentication
File secure and non secure access
Full file management service like google drive(so the structure should be such so that it can be extended)
Maven multi modal design
Full unit test
Integration test.
Deep module with clean interface.`;

const SHOTS: Shot[] = [
  {
    src: shotProjectDetail,
    machine: 2,
    timestamp: "Sep 10, 5:57 PM",
    alt: "Terminal session titled “Fleshing out Project detail”, an agent summarizing the project description and proposing to chart it as a wayfinder map.",
    caption:
      "The raw project description is read and immediately called out as “too big for one session” — logged as a wayfinder map instead of just started.",
  },
  {
    src: shotMapFound,
    machine: 2,
    timestamp: "Sep 11, 2:20 AM",
    alt: "Terminal session titled “wayfinder skill setup”, reporting that a map for this exact project already exists with 9 decisions recorded and 9 open tickets.",
    caption:
      "Re-invoked later that night, wayfinder finds its own map still standing — “File Manager Spec” (issue #1), 9 decisions recorded, 9 tickets open — and picks it up instead of charting a new one.",
  },
];

export function mount(container: HTMLElement): void {
  container.innerHTML = `
    <p class="bx-intro">A multi-tenant Spring Boot file-management library,
      built end to end with an AI coding agent across two computers. Before
      any code exists, the raw project description becomes a destination.</p>

    <div class="bx-source">
      <div class="bx-source-path">backendExample/ProjectDescription.txt</div>
      <pre class="bx-source-body">${PROJECT_DESCRIPTION}</pre>
    </div>

    <div class="bx-shots">
      ${SHOTS.map(shotFigure).join("")}
    </div>
  `;
}

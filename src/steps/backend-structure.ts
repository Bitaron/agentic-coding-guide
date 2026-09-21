// Beat 2 of the Backend dev example's three-beat narrative (see
// backend-planning.ts for the shared grounding note): three structural
// decisions, each its own resolved ticket on the backend project's wayfinder
// map (spring-boot-file-manager#1). The first screenshot is a real frame
// that also carries Beat 3's handoff question below the fold — cropped to
// its top half here; backend-handoff.ts crops the same file's bottom half
// rather than duplicating the image. The source computer switches partway
// through this beat (Computer 2 to Computer 1), marked explicitly per issue
// #18's acceptance criteria.

import { shotFigure, handoffMarker, type Shot } from "./backend-shared";
import shotJavaBaseline from "../../backendExample/secondComputer/Screenshot From 2026-09-11 02-43-36.png";
import shotModuleTree from "../../backendExample/firstComputer/Screenshot From 2026-09-11 20-16-29.png";
import shotEmbeddedClosed from "../../backendExample/firstComputer/Screenshot From 2026-09-12 18-33-21.png";

const SHOT_JAVA: Shot = {
  src: shotJavaBaseline,
  machine: 2,
  timestamp: "Sep 11, 2:43 AM",
  crop: "top",
  alt: "Terminal session reporting that ticket #11 is resolved: Java 25, Spring Boot 4.1.1, and Lombok 1.18.42+ decided as the project's baseline.",
  caption:
    "Ticket #11, resolved: Java 25, Spring Boot 4.1.1, Lombok 1.18.42+ — decided on their own footing, not by copying an older sibling project's Java 21 pin.",
};

const SHOT_MODULES: Shot = {
  src: shotModuleTree,
  machine: 1,
  timestamp: "Sep 11, 8:16 PM",
  alt: "Terminal session showing the full proposed Maven module tree — core, autoconfigure, starter, api, two storage backends, a standalone server, a usage example — with the user replying “Yes, record it and close the ticket.”",
  caption:
    "Ticket #12's module tree — core, autoconfigure, starter, api, two storage backends, a standalone server, a usage example — reviewed and confirmed: “Yes, record it and close the ticket.”",
};

const SHOT_EMBEDDED: Shot = {
  src: shotEmbeddedClosed,
  machine: 1,
  timestamp: "Sep 12, 6:33 PM",
  alt: "GitHub issue list for the spring-boot-file-manager repository, showing “Embedded Mode integration shape #17” closed alongside the map's other resolved tickets.",
  caption:
    "Ticket #17 settles what Embedded Mode actually asks of a host app: no Spring Data JPA repositories (so the library can't silently disable a host's own repository scanning), one property to pick a storage backend, and calls that take an already-resolved tenant and actor directly — never a raw ApiKey secret.",
};

export function mount(container: HTMLElement): void {
  container.innerHTML = `
    <p class="bx-intro">Three real decisions, each its own ticket on the
      backend project's wayfinder map — including confirming, early on, that
      Embedded Mode itself is the library, with a thin remote-client library
      deliberately pushed to v2.</p>

    <div class="bx-shots">
      ${shotFigure(SHOT_JAVA)}
      ${handoffMarker(2, 1)}
      ${shotFigure(SHOT_MODULES)}
      ${shotFigure(SHOT_EMBEDDED)}
    </div>
  `;
}

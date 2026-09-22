// Representation choice (per .claude/skills/create-section/SKILL.md): a
// rule-vs-guard callout (reusing the shared .callout component already
// established for the model-landscape arc) plus a click-through card
// switcher for the four test kinds, reusing the nav-button/detail-panel
// pattern already established by hooks.ts/tdd.ts rather than inventing a
// new interaction for the same shape of content.
//
// Grounded in the real backend project, Bitaron/spring-boot-file-manager:
// unit test, integration test, and controller test all cite real files and
// docs/testing.md. Architecture test (ArchUnit) is explicitly illustrative
// — that project has no ArchUnit dependency in any module's pom.xml — but
// the rule it would enforce is real, taken verbatim from that project's own
// docs/architecture.md, which states it only in prose today.

interface GuardKind {
  name: string;
  guards: string;
  example: string;
}

const KINDS: GuardKind[] = [
  {
    name: "Unit test",
    guards:
      "One unit of domain logic, in isolation — no framework, no real I/O standing behind it.",
    example:
      "file-manager-core's domain rules (tenant isolation, visibility-gated access, trash lifecycle) run with no Spring context and no real StorageBackend — fake/in-memory implementations only. Cited from that project's docs/testing.md.",
  },
  {
    name: "Integration test",
    guards:
      "The real path through multiple real pieces wired together — not each piece's own logic, but whether they cooperate correctly once assembled.",
    example:
      "file-manager-service's FileControllerIntegrationTest and its siblings exercise the full Standalone Service — REST controller → core → a real StorageBackend via Testcontainers — asserting on HTTP status and body, not just a service-layer return value.",
  },
  {
    name: "Controller test",
    guards:
      "One controller's own request/response mapping, isolated from the service logic underneath it — a slice, not the whole stack.",
    example:
      "AccessTokenControllerTest mounts only AccessTokenController in a standalone MockMvc instance with a mocked AccessTokenService — proving that controller's own Purpose-driven Content-Disposition header and 404 mapping, not AccessTokenService.redeem's behavior (a separate unit test already owns that).",
  },
  {
    name: "Architecture test",
    guards:
      "The shape of the codebase itself — which module is allowed to depend on which — enforced as code instead of left as a sentence someone has to remember to reread.",
    example:
      "Illustrative — this project has no ArchUnit dependency yet. But the rule it would enforce is real: docs/architecture.md already states “no core or service code should import a storage SDK directly” and “controllers are a thin translation layer onto core's services — no business rules live in a controller.” Written down; not yet a guard.",
  },
];

export function mount(container: HTMLElement): void {
  let active = 0;

  container.innerHTML = `
    <p class="gdr-intro">TDD produces a test. A GuardRail is the wider
      category that test belongs to: a check enforced by something that
      runs, rather than a rule an agent has to read, remember, and choose to
      follow.</p>

    <div class="callout">
      <p class="callout-heading">Rule vs. guard</p>
      <p class="callout-body"><strong>Rule</strong>: written in prose —
        CLAUDE.md, AGENT.md, a prompt, a spec. It only holds if an agent
        reads it, remembers it, and applies it — this session, and every
        session after.</p>
      <p class="callout-conclusion"><strong>Guard</strong>: enforced by
        something that runs. It fires the same way regardless of which
        agent is doing the work, or how carefully it read the rules.</p>
    </div>

    <p class="gdr-why">The backend dev example's own project brief already
      asked for two guards outright — <em>“Full unit test”</em> and
      <em>“Integration test”</em> (see Planning &amp; spec). Even a brief
      that plans for tests still leaves gaps a plain rule can't close: a
      controller test and an architecture test are the two layers under
      that brief that stayed unwritten.</p>

    <div class="gdr-nav">
      ${KINDS.map(
        (k, i) => `<button class="gdr-nav-btn" data-kind="${i}" type="button">${k.name}</button>`
      ).join("")}
    </div>

    <div class="gdr-panel">
      <p class="gdr-panel-guards"></p>
      <p class="gdr-panel-example"></p>
    </div>

    <p class="gdr-caption">Hooks, introduced earlier in this section, are
      the same category by a different name — a Stop hook running the test
      suite is a guard, not a rule. The backend dev example's real suite
      already carries unit, integration, and controller tests; its
      architecture rules are, for now, still just written down.</p>
  `;

  const navButtons = Array.from(container.querySelectorAll<HTMLButtonElement>(".gdr-nav-btn"));
  const guardsEl = container.querySelector<HTMLElement>(".gdr-panel-guards")!;
  const exampleEl = container.querySelector<HTMLElement>(".gdr-panel-example")!;

  function render(): void {
    const kind = KINDS[active];
    guardsEl.innerHTML = `<strong>${kind.name}</strong> — ${kind.guards}`;
    exampleEl.textContent = kind.example;
    navButtons.forEach((btn, i) => btn.classList.toggle("current", i === active));
  }

  navButtons.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      active = i;
      render();
    });
  });

  render();
}

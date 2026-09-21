// Representation choice (per .claude/skills/create-section/SKILL.md): the
// exact delegation tree from ProjectBrief.md §4.12, with a click-to-reveal
// panel per sub-agent (same progressive-disclosure pattern as traditional-
// development's stage panel) plus a reveal for "why delegation helps" per
// the brief's explicit ask to "show why delegation can be useful for larger
// tasks." Each sub-agent's one-line role is read directly off its name in
// the brief, not invented; the delegation benefits are the standard,
// unattributed reasoning the brief asks for, not a claim about this
// project's own agent setup.

interface SubAgent {
  name: string;
  role: string;
}

const SUB_AGENTS: SubAgent[] = [
  { name: "Research Agent", role: "Gathers and evaluates information the main agent needs before acting." },
  { name: "Architecture Agent", role: "Works out how a change should be structured before code is written." },
  { name: "Implementation Agent", role: "Writes the actual code for the delegated piece of work." },
  { name: "Testing Agent", role: "Verifies the implementation behaves correctly." },
];

const REASONS = [
  "Each sub-agent works with a smaller, focused context instead of the whole task at once.",
  "Specialized work can happen in parallel instead of one agent doing everything in sequence.",
  "The main agent stays free to coordinate instead of getting buried in implementation detail.",
  "Each piece of delegated work is easier to review and verify on its own.",
];

export function mount(container: HTMLElement): void {
  let activeIndex = 0;
  let reasonsShown = false;

  container.innerHTML = `
    <p class="sub-intro">A single agent can only hold so much in view at
      once. For larger tasks, a main agent can delegate specialized pieces
      of work to other agents instead of doing everything itself.</p>

    <div class="sub-tree">
      <div class="sub-tree-root">Main Agent</div>
      <div class="sub-tree-children">
        ${SUB_AGENTS.map(
          (a, i) =>
            `<button class="sub-tree-child" data-agent="${i}" type="button">${a.name}</button>`
        ).join("")}
      </div>
    </div>

    <div class="sub-panel">
      <h2 class="sub-panel-heading"></h2>
      <p class="sub-panel-role"></p>
    </div>

    <button class="sub-reveal" type="button">Why does delegation help? →</button>
    <ul class="sub-reasons" hidden>
      ${REASONS.map((r) => `<li>${r}</li>`).join("")}
    </ul>
  `;

  const children = Array.from(
    container.querySelectorAll<HTMLButtonElement>(".sub-tree-child")
  );
  const panelHeading = container.querySelector<HTMLElement>(".sub-panel-heading")!;
  const panelRole = container.querySelector<HTMLElement>(".sub-panel-role")!;
  const revealBtn = container.querySelector<HTMLButtonElement>(".sub-reveal")!;
  const reasonsList = container.querySelector<HTMLElement>(".sub-reasons")!;

  function render(): void {
    const agent = SUB_AGENTS[activeIndex];
    panelHeading.textContent = agent.name;
    panelRole.textContent = agent.role;
    children.forEach((btn, i) => btn.classList.toggle("current", i === activeIndex));
  }

  children.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      activeIndex = i;
      render();
    });
  });

  revealBtn.addEventListener("click", () => {
    reasonsShown = !reasonsShown;
    reasonsList.hidden = !reasonsShown;
    revealBtn.textContent = reasonsShown
      ? "← Hide"
      : "Why does delegation help? →";
  });

  render();
}

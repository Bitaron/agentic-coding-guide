// Representation choice (per .claude/skills/create-section/SKILL.md): the
// exact four-stage flow from ProjectBrief.md §5 (id ralahb) as a click-through
// chain — same progressive-disclosure shape as sub-agents' delegation tree —
// grounded in Spec Kit, the concrete example the brief names. Spec Kit's
// command names (/specify, /plan, /tasks) are real, public facts about that
// tool, not a claim about this project's own history.

interface Stage {
  label: string;
  detail: string;
}

const STAGES: Stage[] = [
  {
    label: "Idea",
    detail: "A feature request or problem, described in plain language — no structure yet.",
  },
  {
    label: "Specification",
    detail:
      "Spec Kit's /specify command turns the idea into a written spec: what to build and why, before any code exists.",
  },
  {
    label: "Implementation",
    detail:
      "Spec Kit's /plan and /tasks commands turn the spec into a technical approach and a task list; an agent then implements against it.",
  },
  {
    label: "Verification",
    detail:
      "The finished implementation is checked against the spec it was built from — not just against whatever the code happens to do.",
  },
];

export function mount(container: HTMLElement): void {
  let active = 0;

  container.innerHTML = `
    <p class="spec-intro">Before writing code, a requirement can be turned
      into a structured specification — a written description of what to
      build and why, checked before implementation starts rather than
      discovered mid-build.</p>

    <div class="spec-chain" role="img" aria-label="Idea leads to specification, then implementation, then verification">
      ${STAGES.map(
        (s, i) =>
          `<button class="spec-node" data-stage="${i}" type="button">${s.label}</button>`
      ).join('<div class="spec-arrow">↓</div>')}
    </div>

    <div class="spec-panel">
      <h2 class="spec-panel-heading"></h2>
      <p class="spec-panel-detail"></p>
    </div>

    <p class="spec-lead">Spec Kit is GitHub's open-source toolkit for exactly
      this workflow: a small set of slash commands that keep an AI coding
      agent working from an explicit written spec instead of an ad-hoc
      prompt.</p>

    <p class="spec-caption">The spec is the checkpoint: catching a wrong idea
      here is far cheaper than catching it after implementation.</p>
  `;

  const nodes = Array.from(container.querySelectorAll<HTMLButtonElement>(".spec-node"));
  const heading = container.querySelector<HTMLElement>(".spec-panel-heading")!;
  const detail = container.querySelector<HTMLElement>(".spec-panel-detail")!;

  function render(): void {
    const stage = STAGES[active];
    heading.textContent = stage.label;
    detail.textContent = stage.detail;
    nodes.forEach((node, i) => node.classList.toggle("current", i === active));
  }

  nodes.forEach((node, i) => {
    node.addEventListener("click", () => {
      active = i;
      render();
    });
  });

  render();
}

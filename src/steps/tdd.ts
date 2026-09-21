// Representation choice (per .claude/skills/create-section/SKILL.md): the
// exact cycle from ProjectBrief.md §5 (id iz2y8k) as a click-through chain
// (sub-agents' progressive-disclosure pattern) with an explicit loop-back
// label rather than a full play/pause animation — the cyclic behavior only
// needs to be communicated, not played frame by frame, since agentic-loop's
// step already owns that kind of demo. The delegation half reuses the
// root→children flow from Skills/Plugins for "one cycle, three responsibilities."
// Backend/Frontend dev example sections aren't built yet (per mcp.ts's same
// situation), so this step points forward to them by their real section
// names instead of fabricating a worked example early.

import { rootFlow } from "./shared";

interface Stage {
  label: string;
  detail: string;
}

const STAGES: Stage[] = [
  {
    label: "Write test",
    detail: "Write a test for behavior that doesn't exist yet. It should fail — there's nothing to make it pass.",
  },
  {
    label: "Implement",
    detail: "Write the minimum implementation needed to make that failing test pass.",
  },
  {
    label: "Run test",
    detail: "Run the test. If it passes, the implementation satisfies what was specified; if not, keep implementing.",
  },
  {
    label: "Refactor",
    detail: "Clean up the passing implementation without changing its behavior — the test keeps it honest.",
  },
];

interface Role {
  name: string;
  detail: string;
}

const ROLES: Role[] = [
  { name: "Test creation", detail: "Writes the failing test that defines the behavior, before any implementation exists." },
  { name: "Implementation", detail: "Writes the code that makes the test pass, working from the test rather than a separate spec." },
  { name: "Verification", detail: "Confirms the test actually passes and the behavior is correct — a check independent of the agent that implemented it." },
];

export function mount(container: HTMLElement): void {
  let active = 0;

  container.innerHTML = `
    <p class="tdd-intro">Test-Driven Development inverts the usual order:
      the test is written before the implementation it's meant to check.</p>

    <div class="tdd-chain" role="img" aria-label="Write test, implement, run test, refactor, looping back to write test">
      ${STAGES.map(
        (s, i) =>
          `<button class="tdd-node" data-stage="${i}" type="button">${s.label}</button>`
      ).join('<div class="tdd-arrow">↓</div>')}
      <div class="tdd-loop-back">↻ back to Write test</div>
    </div>

    <div class="tdd-panel">
      <h2 class="tdd-panel-heading"></h2>
      <p class="tdd-panel-detail"></p>
    </div>

    <p class="tdd-lead">Agentic development can support this discipline
      rather than bypass it, by splitting the cycle's responsibilities across
      different agents:</p>

    ${rootFlow(
      "TDD cycle split across test creation, implementation, and verification",
      "TDD cycle",
      ROLES.map((r) => r.name)
    )}

    <dl class="tdd-roles">
      ${ROLES.map(
        (r) => `
        <div class="tdd-role">
          <dt>${r.name}</dt>
          <dd>${r.detail}</dd>
        </div>`
      ).join("")}
    </dl>

    <p class="tdd-caption">The Backend dev example and Frontend dev example
      sections carry this further with a demonstrated agent split across
      those same three responsibilities — this step is the concept; those
      sections are the worked example.</p>
  `;

  const nodes = Array.from(container.querySelectorAll<HTMLButtonElement>(".tdd-node"));
  const heading = container.querySelector<HTMLElement>(".tdd-panel-heading")!;
  const detail = container.querySelector<HTMLElement>(".tdd-panel-detail")!;

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

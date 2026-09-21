// Representation choice (per .claude/skills/create-section/SKILL.md):
// a progressive-disclosure diagram. ProjectBrief.md §3.1 asks for the flow
// to "visually demonstrate how work moves between humans, plans,
// developers, and code" — the four entities map 1:1 onto the three stages
// (Planning = Humans→Plan, Work Division = Plan→Developers,
// Implementation = Developers→Code), so each stage lights up exactly one
// segment of a single connecting line rather than three disconnected
// diagrams.

interface Stage {
  label: string;
  heading: string;
  items: string[];
}

const NODES = ["Humans", "Plan", "Developers", "Code"];

const STAGES: Stage[] = [
  {
    label: "Planning",
    heading: "Planning",
    items: ["Requirements", "Analysis", "Architecture/design", "Planning"],
  },
  {
    label: "Work Division",
    heading: "Work Division",
    items: [
      "Divide work among developers",
      "Assign responsibilities",
      "Coordinate implementation",
      "Manage dependencies",
    ],
  },
  {
    label: "Implementation",
    heading: "Implementation",
    items: [
      "Developers inspect the codebase",
      "Implement features",
      "Run tests",
      "Debug",
      "Review and integrate changes",
    ],
  },
];

export function mount(container: HTMLElement): () => void {
  let stageIndex = 0;

  container.innerHTML = `
    <p class="trad-intro">A conventional software project moves work through
      three stages — from people, to a plan, to the developers who turn it
      into code.</p>
    <div class="trad-track" role="img" aria-label="Work moving from humans to plan to developers to code">
      <div class="trad-line">
        ${STAGES.map((_, i) => `<div class="trad-segment" data-segment="${i}"></div>`).join("")}
      </div>
      <div class="trad-nodes">
        ${NODES.map((n, i) => `<div class="trad-node" data-node="${i}">${n}</div>`).join("")}
      </div>
    </div>
    <div class="trad-stage-nav">
      ${STAGES.map(
        (s, i) =>
          `<button class="trad-stage-btn" data-stage="${i}" type="button">${i + 1}. ${s.label}</button>`
      ).join("")}
    </div>
    <div class="trad-panel">
      <h2 class="trad-panel-heading"></h2>
      <ul class="trad-panel-list"></ul>
    </div>
    <div class="trad-controls">
      <button class="trad-back" type="button">← Back</button>
      <button class="trad-forward" type="button">Next stage →</button>
    </div>
  `;

  const segments = Array.from(container.querySelectorAll<HTMLElement>(".trad-segment"));
  const nodes = Array.from(container.querySelectorAll<HTMLElement>(".trad-node"));
  const stageButtons = Array.from(
    container.querySelectorAll<HTMLButtonElement>(".trad-stage-btn")
  );
  const panelHeading = container.querySelector<HTMLElement>(".trad-panel-heading")!;
  const panelList = container.querySelector<HTMLElement>(".trad-panel-list")!;
  const backBtn = container.querySelector<HTMLButtonElement>(".trad-back")!;
  const forwardBtn = container.querySelector<HTMLButtonElement>(".trad-forward")!;

  function render(): void {
    segments.forEach((seg, i) => {
      seg.classList.toggle("done", i < stageIndex);
      seg.classList.toggle("current", i === stageIndex);
    });
    nodes.forEach((node, i) => {
      // node i is the start of segment i and the end of segment i-1
      const touchedByDone = i < stageIndex || i - 1 < stageIndex;
      const touchedByCurrent = i === stageIndex || i - 1 === stageIndex;
      node.classList.toggle("current", touchedByCurrent);
      node.classList.toggle("done", !touchedByCurrent && touchedByDone);
    });
    stageButtons.forEach((btn, i) => {
      btn.classList.toggle("current", i === stageIndex);
      btn.classList.toggle("done", i < stageIndex);
    });

    const stage = STAGES[stageIndex];
    panelHeading.textContent = stage.heading;
    panelList.innerHTML = stage.items.map((item) => `<li>${item}</li>`).join("");

    backBtn.disabled = stageIndex === 0;
    forwardBtn.disabled = stageIndex === STAGES.length - 1;
    forwardBtn.textContent =
      stageIndex === STAGES.length - 1 ? "Implementation reached" : "Next stage →";
  }

  function goTo(i: number): void {
    stageIndex = Math.min(Math.max(i, 0), STAGES.length - 1);
    render();
  }

  backBtn.addEventListener("click", () => goTo(stageIndex - 1));
  forwardBtn.addEventListener("click", () => goTo(stageIndex + 1));
  stageButtons.forEach((btn, i) => btn.addEventListener("click", () => goTo(i)));

  render();

  return () => {
    // No timers/listeners outlive the container removal, but kept for
    // symmetry with steps that do need teardown.
  };
}

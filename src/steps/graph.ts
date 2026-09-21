// Representation choice (per .claude/skills/create-section/SKILL.md): an
// SVG node/edge diagram, deliberately non-linear — the Agentic loop step
// (§4.15) already shows a single repeating cycle, so Graph (§4.16) needs a
// visual that reads as a graph rather than another loop: a branching
// decision plus a dependency back-edge, which is what the brief asks this
// step to convey ("states, decisions, dependencies, and transitions").
// Click-to-reveal descriptions instead of autoplay, since exploring a graph
// at one's own pace (not watching a forced sequence) is the point.

interface Node {
  id: string;
  label: string;
  x: number; // 0-100
  y: number; // 0-40
  shape: "box" | "diamond";
  description: string;
}

const NODES: Node[] = [
  {
    id: "write",
    label: "Write code",
    x: 8,
    y: 20,
    shape: "box",
    description: "A state: work in progress.",
  },
  {
    id: "test",
    label: "Run tests",
    x: 34,
    y: 20,
    shape: "box",
    description: "A state: automated verification runs.",
  },
  {
    id: "decision",
    label: "Tests pass?",
    x: 60,
    y: 20,
    shape: "diamond",
    description: "A decision: the workflow branches based on the outcome.",
  },
  {
    id: "done",
    label: "Done",
    x: 90,
    y: 6,
    shape: "box",
    description: "A state: the goal is satisfied — the graph has nowhere further to go.",
  },
  {
    id: "fix",
    label: "Fix",
    x: 60,
    y: 34,
    shape: "box",
    description: "A state reached only when the decision says no.",
  },
];

export function mount(container: HTMLElement): void {
  container.innerHTML = `
    <p class="gr-intro">Not every agentic workflow is a straight line or a
      single cycle. It can branch on a decision, and a later step can depend
      on an earlier one running again — which is easier to see as a graph
      than to describe in prose.</p>

    <div class="gr-diagram-scroll">
      <div class="gr-diagram" role="img" aria-label="Write code leads to run tests, which leads to a tests-pass decision; yes leads to done, no leads to fix, and fix depends on running tests again">
        <svg class="gr-edges" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <marker id="gr-arrowhead" markerWidth="3" markerHeight="3" refX="2.6" refY="1.5" markerUnits="userSpaceOnUse" orient="auto">
              <path d="M0,0 L3,1.5 L0,3 z" fill="currentColor" />
            </marker>
          </defs>
          <path class="gr-edge" d="M 12 20 L 29 20" marker-end="url(#gr-arrowhead)" />
          <path class="gr-edge" d="M 38 20 L 54 20" marker-end="url(#gr-arrowhead)" />
          <path class="gr-edge" d="M 65 17 L 84 8" marker-end="url(#gr-arrowhead)" />
          <path class="gr-edge" d="M 60 24 L 60 29" marker-end="url(#gr-arrowhead)" />
          <path class="gr-edge gr-edge-dep" d="M 55 33 C 38 33, 28 28, 32 23" marker-end="url(#gr-arrowhead)" />
          <text class="gr-edge-label" x="73" y="10">yes</text>
          <text class="gr-edge-label" x="62" y="27">no</text>
          <text class="gr-edge-label gr-edge-label-dep" x="12" y="32">depends on retesting</text>
        </svg>

        <div class="gr-nodes">
          ${NODES.map(
            (n) => `
            <button
              class="gr-node gr-node-${n.shape}"
              style="left:${n.x}%; top:${(n.y / 40) * 100}%"
              data-node="${n.id}"
              type="button"
            >${n.label}</button>`
          ).join("")}
        </div>
      </div>
    </div>
    <p class="gr-scroll-hint">Scroll to see the full diagram →</p>

    <p class="gr-desc"></p>
    <p class="gr-caption">Solid arrows are transitions. The arrow from
      <strong>Fix</strong> back to <strong>Run tests</strong> is a dependency,
      not a plain step-to-step move — <strong>Fix</strong> isn't finished
      until tests have run again.</p>
  `;

  const nodeButtons = Array.from(container.querySelectorAll<HTMLButtonElement>(".gr-node"));
  const descEl = container.querySelector<HTMLElement>(".gr-desc")!;

  function select(id: string): void {
    const node = NODES.find((n) => n.id === id)!;
    descEl.textContent = node.description;
    nodeButtons.forEach((btn) => btn.classList.toggle("current", btn.dataset.node === id));
  }

  nodeButtons.forEach((btn) => {
    btn.addEventListener("click", () => select(btn.dataset.node!));
  });

  select(NODES[0].id);
}

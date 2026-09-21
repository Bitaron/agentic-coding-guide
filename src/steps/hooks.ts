// Representation choice (per .claude/skills/create-section/SKILL.md): a
// switchable event → hook → action pipeline, reusing the stage-switcher
// pattern already established by econ-stage-nav/cmp-tab. ProjectBrief.md
// §4.14 asks for "simple examples and visual workflows" without specifying
// which events — PreToolUse/PostToolUse/Stop are real, documented Claude
// Code hook events (not invented), chosen because they're the ones most
// directly tied to concepts already on screen (tool calls, session end).

interface HookExample {
  event: string;
  match: string;
  action: string;
  note: string;
}

const EXAMPLES: HookExample[] = [
  {
    event: "PreToolUse",
    match: "Bash",
    action: "Block the command",
    note: "Runs before a tool executes — can inspect the proposed call and stop it before anything happens.",
  },
  {
    event: "PostToolUse",
    match: "Edit / Write",
    action: "Run a formatter",
    note: "Runs after a tool completes — can react to what just happened, like reformatting a file that was just edited.",
  },
  {
    event: "Stop",
    match: "session end",
    action: "Run the test suite",
    note: "Runs when the agent finishes responding — can verify the session's work before it's considered done.",
  },
];

export function mount(container: HTMLElement): void {
  let active = 0;

  container.innerHTML = `
    <p class="hk-intro">A hook is a shell command the harness runs
      automatically when a development event happens — a tool call, a file
      edit, the end of a session — without the model having to be asked.</p>

    <div class="hk-nav">
      ${EXAMPLES.map(
        (e, i) => `<button class="hk-nav-btn" data-example="${i}" type="button">${e.event}</button>`
      ).join("")}
    </div>

    <div class="hk-pipeline" role="img" aria-label="Event triggers a matching hook, which runs an action">
      <div class="hk-stage">
        <div class="hk-stage-label">Event</div>
        <div class="hk-stage-value hk-stage-event"></div>
      </div>
      <div class="hk-pipeline-arrow">→</div>
      <div class="hk-stage">
        <div class="hk-stage-label">Matches</div>
        <div class="hk-stage-value hk-stage-match"></div>
      </div>
      <div class="hk-pipeline-arrow">→</div>
      <div class="hk-stage">
        <div class="hk-stage-label">Action</div>
        <div class="hk-stage-value hk-stage-action"></div>
      </div>
    </div>

    <p class="hk-note"></p>

    <p class="hk-caption">The event names above (<code class="inline">PreToolUse</code>,
      <code class="inline">PostToolUse</code>, <code class="inline">Stop</code>)
      are real Claude Code hook events — this is how the harness itself
      wires automation to development events, not a hypothetical API.</p>
  `;

  const navButtons = Array.from(container.querySelectorAll<HTMLButtonElement>(".hk-nav-btn"));
  const eventEl = container.querySelector<HTMLElement>(".hk-stage-event")!;
  const matchEl = container.querySelector<HTMLElement>(".hk-stage-match")!;
  const actionEl = container.querySelector<HTMLElement>(".hk-stage-action")!;
  const noteEl = container.querySelector<HTMLElement>(".hk-note")!;

  function render(): void {
    const example = EXAMPLES[active];
    eventEl.textContent = example.event;
    matchEl.textContent = example.match;
    actionEl.textContent = example.action;
    noteEl.textContent = example.note;
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

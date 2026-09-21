// Representation choice (per .claude/skills/create-section/SKILL.md):
// a two-example toggle, echoing stateless-sessions' reveal pattern.
// ProjectBrief.md §4.9 only asks to "explain how instructions are provided
// to an AI model and how prompt quality affects results" — the brief gives
// no concrete example, so the vague/specific pair below is an illustrative
// teaching example (same convention as token-generation's sentence), not an
// invented project detail.

interface Example {
  label: string;
  prompt: string;
  result: string;
}

const EXAMPLES: Record<"vague" | "specific", Example> = {
  vague: {
    label: "Vague prompt",
    prompt: "Fix the bug.",
    result:
      "The model has to guess which bug, in which file, and what \"fixed\" should look like. It may guess wrong, ask a clarifying question, or produce a plausible-looking change that misses the real problem.",
  },
  specific: {
    label: "Specific prompt",
    prompt:
      "In UserService, fix the crash that happens when a user signs up without an email address — it should return a validation error instead of throwing.",
    result:
      "The model has a concrete target: which file, which condition, and what the correct behavior is. It can act directly instead of guessing.",
  },
};

export function mount(container: HTMLElement): void {
  let active: keyof typeof EXAMPLES = "vague";

  container.innerHTML = `
    <p class="pr-intro">A prompt is the instruction you give a model. The
      model has no access to what you meant — only to what you actually
      wrote — so how precisely a prompt states the goal, the constraints,
      and the relevant details directly shapes how good the result can be.</p>
    <div class="pr-tabs">
      <button class="pr-tab" data-example="vague" type="button">${EXAMPLES.vague.label}</button>
      <button class="pr-tab" data-example="specific" type="button">${EXAMPLES.specific.label}</button>
    </div>
    <div class="pr-panel">
      <div class="pr-prompt-label">Prompt</div>
      <pre class="pr-prompt-text"></pre>
      <div class="pr-arrow">↓</div>
      <div class="pr-result-label">What the model has to work with</div>
      <p class="pr-result-text"></p>
    </div>
    <p class="pr-caption">Same underlying task, two different prompts — the
      difference isn't the model, it's what the model was given to work
      with.</p>
  `;

  const tabs = Array.from(container.querySelectorAll<HTMLButtonElement>(".pr-tab"));
  const promptText = container.querySelector<HTMLElement>(".pr-prompt-text")!;
  const resultText = container.querySelector<HTMLElement>(".pr-result-text")!;

  function render(): void {
    const example = EXAMPLES[active];
    promptText.textContent = example.prompt;
    resultText.textContent = example.result;
    tabs.forEach((tab) => {
      tab.classList.toggle("current", tab.dataset.example === active);
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      active = tab.dataset.example as keyof typeof EXAMPLES;
      render();
    });
  });

  render();
}

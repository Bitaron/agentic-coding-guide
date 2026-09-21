// Representation choice (per .claude/skills/create-section/SKILL.md):
// ProjectBrief.md §4.2-§4.4 explicitly asks these three providers to land
// as "one comparative step, not three separate ones" (per issue #14's
// resolved breakdown). A tab switcher — reusing the prompt step's tab
// pattern — keeps them on one step while still letting each provider's
// different shape of table (3-row category table, 2-row model table,
// 3-vendor prose) get its own panel instead of being forced into one
// layout.

import { dataTable, factorChain, type Row } from "./shared";

interface Panel {
  id: string;
  label: string;
  html: string;
}

const OPENAI_ROWS: Row[] = [
  { cells: ["Fast / Cost-sensitive", "GPT-5.6 Luna", "High-volume and cost-sensitive workloads"] },
  { cells: ["Balanced", "GPT-5.6 Terra", "Balance of capability and cost"] },
  { cells: ["Frontier / Deep reasoning", "GPT-5.6 Sol", "Complex professional work and coding"] },
];

const GROK_ROWS: Row[] = [
  { cells: ["Grok 4.3", "none / low / medium / high / xhigh"] },
  { cells: ["Grok 4.5", "low / medium / high / xhigh"] },
];

const PANELS: Panel[] = [
  {
    id: "openai",
    label: "OpenAI",
    html: `
      <p class="cmp-panel-lead">The current GPT-5.6 family maps onto the
        same conceptual framework:</p>
      ${dataTable(["Conceptual category", "Example", "Role"], OPENAI_ROWS)}
      <p class="cmp-panel-note">These models support configurable reasoning
        levels including <code class="inline">none</code>,
        <code class="inline">low</code>, <code class="inline">medium</code>,
        <code class="inline">high</code>, <code class="inline">xhigh</code>,
        and <code class="inline">max</code>.</p>
      <p class="cmp-panel-caption">The category is about workload
        selection — not simply "bigger model = better."</p>
    `,
  },
  {
    id: "spacexai",
    label: "SpaceXAI",
    html: `
      <p class="cmp-panel-lead">SpaceXAI demonstrates the same concept
        through Grok:</p>
      ${dataTable(["Model", "Reasoning effort"], GROK_ROWS, "data-table-2col")}
      <p class="cmp-panel-note">Grok 4.3 supports configurable reasoning
        from none through xhigh, while Grok 4.5 supports low through xhigh
        and defaults to high.</p>
      ${factorChain(
        "Same provider plus different model plus different effort leads to different reasoning, cost, and latency behavior",
        ["Same provider", "Different model", "Different effort"],
        "Different reasoning/cost/latency behavior"
      )}
      <p class="cmp-panel-caption">SpaceXAI also exposes
        <code class="inline">reasoning_tokens</code> in usage information
        for supported reasoning models.</p>
    `,
  },
  {
    id: "chinese",
    label: "Chinese model ecosystem",
    html: `
      <p class="cmp-panel-lead">The same reasoning/effort concept also
        appears across Chinese model providers:</p>
      <div class="cmp-vendor">
        <h3 class="cmp-vendor-name">DeepSeek</h3>
        <p class="cmp-vendor-body">V4.1-Flash and V4-Pro support thinking
          and offer configurable effort such as <code class="inline">low</code>,
          <code class="inline">high</code>, and <code class="inline">max</code>.
          DeepSeek describes low as suitable for simpler tasks, high for
          daily agent workflows, and max for more complex tasks.</p>
      </div>
      <div class="cmp-vendor">
        <h3 class="cmp-vendor-name">Qwen</h3>
        <p class="cmp-vendor-body">Qwen's reasoning models are an example
          of the same broader thinking-model category. Qwen describes
          Qwen3-Max-Thinking as a flagship reasoning model with additional
          test-time scaling and agent capabilities.</p>
      </div>
      <div class="cmp-vendor">
        <h3 class="cmp-vendor-name">Kimi</h3>
        <p class="cmp-vendor-body">Kimi's current coding models support
          reasoning effort such as <code class="inline">low</code>,
          <code class="inline">high</code>, and <code class="inline">max</code>,
          with different models having different defaults. Kimi's coding
          documentation also exposes model-level effort configuration and
          sub-agent effort binding.</p>
      </div>
      <p class="cmp-panel-caption">These are examples in the broader
        reasoning-model ecosystem — not exact equivalents of Anthropic's
        Haiku/Sonnet/Opus categories.</p>
    `,
  },
];

export function mount(container: HTMLElement): void {
  let active = 0;

  container.innerHTML = `
    <p class="cmp-intro">The same capability/effort framework shows up
      across other providers too — with each one shaping it differently.</p>

    <div class="cmp-tabs">
      ${PANELS.map(
        (p, i) => `<button class="cmp-tab" data-panel="${i}" type="button">${p.label}</button>`
      ).join("")}
    </div>

    <div class="cmp-panel"></div>
  `;

  const tabs = Array.from(container.querySelectorAll<HTMLButtonElement>(".cmp-tab"));
  const panel = container.querySelector<HTMLElement>(".cmp-panel")!;

  function render(): void {
    panel.innerHTML = PANELS[active].html;
    tabs.forEach((tab, i) => tab.classList.toggle("current", i === active));
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => {
      active = i;
      render();
    });
  });

  render();
}

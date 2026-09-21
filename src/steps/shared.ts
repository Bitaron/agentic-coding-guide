// Markup builders for the two widgets reused across the model-landscape
// arc's step files (model-categories, provider-comparison, token-economics,
// model-selection) — kept alongside the shared CSS components of the same
// name in style.css instead of duplicated per file.

export interface Row {
  cells: string[];
}

export function dataTable(headers: string[], rows: Row[], modifier?: string): string {
  return `
    <div class="data-table${modifier ? ` ${modifier}` : ""}" style="--data-cols: ${headers.length}">
      <div class="data-row data-row-head">
        ${headers.map((h) => `<div class="data-cell">${h}</div>`).join("")}
      </div>
      ${rows
        .map(
          (r) => `
        <div class="data-row">
          ${r.cells.map((c) => `<div class="data-cell">${c}</div>`).join("")}
        </div>`
        )
        .join("")}
    </div>
  `;
}

export function factorChain(ariaLabel: string, items: string[], result: string): string {
  return `
    <div class="factor-chain" role="img" aria-label="${ariaLabel}">
      <ul class="factor-chain-items">
        ${items.map((i) => `<li>${i}</li>`).join("")}
      </ul>
      <div class="factor-chain-arrow">↓</div>
      <div class="factor-chain-result">${result}</div>
    </div>
  `;
}

/** A root box branching to a row of children — one package/parent naming
 * several named pieces it provides (a skill calling other skills, a plugin
 * bundling skills). Used by the Skills and Plugins steps. */
export function rootFlow(ariaLabel: string, root: string, children: string[]): string {
  return `
    <div class="flow" role="img" aria-label="${ariaLabel}">
      <div class="flow-root">${root}</div>
      <div class="flow-children">
        ${children.map((c) => `<div class="flow-child">${c}</div>`).join("")}
      </div>
    </div>
  `;
}

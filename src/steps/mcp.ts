// Representation choice (per .claude/skills/create-section/SKILL.md): a
// conceptual flow plus real, already-verifiable citations rather than a
// built demo. ProjectBrief.md §4.19 says the *frontend-development example*
// should carry the real MCP-based workflow, not this step — that section
// isn't built yet (issues #19/#20), so this step stays conceptual and
// points forward instead of fabricating that workflow early. The two
// citations below (Lazyweb, Playwright) are both already real and checkable
// in this repo's own history, giving the concept concrete grounding without
// getting ahead of the section that's meant to own it.

export function mount(container: HTMLElement): void {
  container.innerHTML = `
    <p class="mcp-intro">The Model Context Protocol is a standard way for an
      agent to reach outside its built-in abilities — to call an external
      tool or pull in outside data — without that integration being
      hand-built into the agent itself.</p>

    <div class="mcp-flow" role="img" aria-label="Agent connects through MCP to an external tool or data source">
      <div class="mcp-flow-node">Agent</div>
      <div class="mcp-flow-arrow">↔</div>
      <div class="mcp-flow-node mcp-flow-protocol">MCP</div>
      <div class="mcp-flow-arrow">↔</div>
      <div class="mcp-flow-node">External tool / data source</div>
    </div>

    <div class="callout mcp-callout">
      <h3 class="callout-heading">Already in use on this project</h3>
      <p class="callout-body">This repository has already used two MCP
        servers for real work, not as a demo:</p>
      <ul class="callout-list">
        <li><strong>Lazyweb MCP</strong> — pulled real UI references while
          settling this site's own visual direction (issue #11).</li>
        <li><strong>Playwright MCP</strong> — verified steps in a real
          browser, at desktop and mobile viewports, before they merged.</li>
      </ul>
    </div>

    <p class="mcp-caption">The Frontend dev example section carries this
      further with a complete, real MCP-based workflow — this step is the
      concept; that section is the worked example.</p>
  `;
}

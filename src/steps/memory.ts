// Representation choice (per .claude/skills/create-section/SKILL.md): text
// plus a real example, reusing the shared .callout component already
// defined for the model-landscape arc rather than inventing a new
// comparison widget. ProjectBrief.md §4.17 names Beads' four properties
// explicitly (quoted verbatim below) and separately lists Jira/GitHub
// Issues/PM systems as alternatives without giving them the same level of
// detail — the callout keeps that asymmetry honest instead of inventing
// matching detail for the others. The GitHub Issues line cites this
// repository's own real tracker (docs/agents/issue-tracker.md), not a
// hypothetical.

export function mount(container: HTMLElement): void {
  container.innerHTML = `
    <p class="mem-intro">A single model interaction doesn't remember
      anything once it ends. To retain information across sessions, an
      agentic coding system needs somewhere external to persist it.</p>

    <p class="mem-default">The default is often a plain Markdown file — but
      Markdown-based memory has limitations: it's just text, with none of
      the structure, querying, or built-in collaboration that a dedicated
      system provides.</p>

    <p class="mem-alt-lead">Memory can instead be backed by systems built for
      exactly this:</p>
    <ul class="mem-alt-list">
      <li>Jira</li>
      <li>GitHub Issues — this repository's own decisions and open tickets
        already live there, not in a Markdown file (see
        <code class="inline">docs/agents/issue-tracker.md</code>)</li>
      <li>other project management systems</li>
      <li>other persistent stores</li>
    </ul>

    <div class="callout mem-callout">
      <h3 class="callout-heading">Beads</h3>
      <p class="callout-body">A lightweight local task/memory manager, used
        here as an example of what a dedicated system can offer over a bare
        Markdown file:</p>
      <ul class="callout-list">
        <li>stays with the source repository</li>
        <li>can be committed to Git</li>
        <li>can be pushed with the project</li>
        <li>allows collaboration across developers</li>
      </ul>
    </div>

    <p class="mem-caption">Markdown isn't the only option — it's the
      lowest-friction default. Which store fits is a practical choice, not a
      fixed rule.</p>
  `;
}

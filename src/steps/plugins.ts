// Representation choice (per .claude/skills/create-section/SKILL.md): a
// flow diagram naming the actual plugin used to build this project,
// reusing the same root→children layout as the Skills step since both are
// "one package, several named pieces" shapes. ProjectBrief.md §4.18 asks to
// "relate this to the actual plugins used in this project" — every skill
// name and citation below is checkable in this repo's own git history
// (commit/PR references cited in each item's note), not invented; TDD is
// deliberately left out because this repo's history has no commit that
// actually used it.

import { rootFlow } from "./shared";

interface PluginSkill {
  name: string;
  note: string;
}

const SKILLS: PluginSkill[] = [
  {
    name: "wayfinder",
    note: "Charted this site's content/IA spec as issue #2 and resolved its content-decision tickets (issues #3–#6, #11, #23).",
  },
  {
    name: "grilling + domain-modeling",
    note: "Run together as grill-me-with-doc — settled this repo's visual-direction brief (issue #11) and added the Step / Live-delivery part glossary entries to CONTEXT.md.",
  },
  {
    name: "code-review",
    note: "Ran a two-axis Standards/Spec review before the steps 1–3 content merged (PR #27).",
  },
  {
    name: "implement",
    note: "Turns a ticket like this one into shipped steps — the skill that built this very step.",
  },
];

export function mount(container: HTMLElement): void {
  container.innerHTML = `
    <p class="plg-intro">A plugin packages skills, commands, and hooks
      together so they can be installed once and reused across projects,
      instead of rebuilt per repository.</p>

    ${rootFlow(
      "The mattpocock-skills plugin provides wayfinder, grilling, domain-modeling, code-review, and implement, all used on this project",
      "mattpocock-skills",
      SKILLS.map((s) => s.name)
    )}

    <p class="plg-lead">Each of those isn't hypothetical — this repository's
      own history shows them in use:</p>

    <dl class="plg-notes">
      ${SKILLS.map(
        (s) => `
        <div class="plg-note">
          <dt>${s.name}</dt>
          <dd>${s.note}</dd>
        </div>`
      ).join("")}
    </dl>

    <p class="plg-caption">The plugin extends what the agent can be asked to
      do; the skills inside it are what actually get invoked, one command
      at a time.</p>
  `;
}

// Representation choice (per .claude/skills/create-section/SKILL.md): a
// flow diagram plus a real file viewer, not an invented example — ProjectBrief.md
// §4.13 explicitly asks to "use this project as a concrete example" and "show
// the actual Skill structure from the repository." grill-me-with-doc.md,
// grilling.md, and domain-modeling.md are quoted verbatim (frontmatter plus
// an excerpt, trimmed for space and labelled as such) from skill/ in this
// repo, not paraphrased or invented — including skill/grilling.md and
// skill/domain-modeling.md's file *paths*, which on disk hold each other's
// content (grilling.md's frontmatter name is "domain-modeling" and vice
// versa; verified by reading both files directly, predates this ticket).
// The "used on this project" caption cites only what's independently
// checkable in this repo's own history (PR #9, #21).

import { rootFlow } from "./shared";

interface SkillFile {
  id: string;
  path: string;
  frontmatter: { name: string; description: string };
  excerpt: string;
  truncated: boolean;
}

const FILES: SkillFile[] = [
  {
    id: "grill-me-with-doc",
    path: "skill/grill-me-with-doc.md",
    frontmatter: {
      name: "grill-with-docs",
      description:
        "A relentless interview to sharpen a plan or design, which also creates docs (ADR's and glossary) as we go.",
    },
    excerpt: "Call the Skill tool twice, for \"grilling\" and \"domain-modeling\".",
    truncated: false,
  },
  {
    id: "grilling",
    path: "skill/domain-modeling.md",
    frontmatter: {
      name: "grilling",
      description:
        "Grill the user relentlessly about a plan, decision, or idea. Use when the user wants to stress-test their thinking, or uses any 'grill' trigger phrases.",
    },
    excerpt:
      "Interview the user relentlessly until you reach a shared understanding. Map this as a design tree: every decision branches into the decisions that hang off it.\n\nWork the tree in rounds. The frontier is every decision whose prerequisites are already settled—the questions you can ask now without guessing at answers you haven't heard yet.",
    truncated: true,
  },
  {
    id: "domain-modeling",
    path: "skill/grilling.md",
    frontmatter: {
      name: "domain-modeling",
      description:
        "Build and sharpen a project's domain model. Use when discussing codebase terminology, writing or editing a CONTEXT.md, or recording or editing an ADR.",
    },
    excerpt:
      "Actively build and sharpen the project's domain model as you design. This is the active discipline: challenging terms, inventing edge-case scenarios, and writing the glossary and decisions down the moment they crystallise.",
    truncated: true,
  },
];

export function mount(container: HTMLElement): void {
  let active = 0;

  container.innerHTML = `
    <p class="sk-intro">A skill packages procedural knowledge that would
      otherwise have to be re-explained every time: a workflow, worth naming
      once and reusing, instead of a one-off instruction.</p>

    ${rootFlow(
      "grill-me-with-doc calls grilling and domain-modeling",
      "grill-me-with-doc",
      ["grilling", "domain-modeling"]
    )}

    <p class="sk-lead">Before starting a feature, this repository calls that
      skill to run a structured questioning process. These are its actual
      files:</p>

    <div class="sk-tabs">
      ${FILES.map(
        (f, i) => `<button class="sk-tab" data-file="${i}" type="button">${f.frontmatter.name}</button>`
      ).join("")}
    </div>

    <div class="sk-panel"></div>

    <p class="sk-caption">This project's own visual-direction brief
      (<code class="inline">docs/design-brief.md</code>, issue #11) and its
      <code class="inline">CONTEXT.md</code> glossary entries were produced by
      running exactly this skill — not a hypothetical.</p>
  `;

  const tabs = Array.from(container.querySelectorAll<HTMLButtonElement>(".sk-tab"));
  const panel = container.querySelector<HTMLElement>(".sk-panel")!;

  function render(): void {
    const file = FILES[active];
    panel.innerHTML = `
      <div class="sk-file-path">${file.path}</div>
      <div class="sk-file-frontmatter">---
name: ${file.frontmatter.name}
description: ${file.frontmatter.description}
---</div>
      <div class="sk-file-body">${file.excerpt}</div>
      ${file.truncated ? '<div class="sk-file-note">Excerpt — trimmed for space.</div>' : ""}
    `;
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

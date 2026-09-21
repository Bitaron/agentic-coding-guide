// Representation choice (per .claude/skills/create-section/SKILL.md): a
// real file viewer, same shape as the Skills step's tabbed excerpt reader,
// since ProjectBrief.md §5 explicitly asks to "show real ADR artifacts from
// the project where appropriate." ADR-0002 is quoted in full and split into
// its problem/alternative/consequence sentences verbatim (no paraphrasing)
// as the annotated walkthrough; ADR-0001/0003/0004 are quoted verbatim
// (0001 and 0004 trimmed for space, labelled as such, same convention as
// skills.ts) in the browsable tab list. All four files are real, at
// docs/adr/ in this repo, not invented examples.

interface AdrSegment {
  label: string;
  text: string;
}

const WALKTHROUGH_TITLE =
  "Per-step routes use the History API with a GitHub Pages 404.html fallback, not hash routing";

const WALKTHROUGH: AdrSegment[] = [
  {
    label: "Problem",
    text: "Each step in the stepped/slide-deck navigation gets its own real URL (e.g. /intro/3), deep-linkable and back/forward-safe. GitHub Pages is a static host with no server-side rewrites, so clean paths need the standard workaround: a 404.html that redirects unknown paths back to index.html, which then replays the intended route client-side.",
  },
  {
    label: "Alternative considered",
    text: "We chose this over hash-based routing (#/intro/3), which needs no such trick and would have been the simpler default, because the user wants real paths rather than hash fragments.",
  },
  {
    label: "Consequence",
    text: "No router library: routing is small enough to hand-write in vanilla TS, consistent with the repo's no-framework stance.",
  },
];

interface AdrFile {
  number: string;
  path: string;
  title: string;
  excerpt: string;
  truncated: boolean;
}

const FILES: AdrFile[] = [
  {
    number: "ADR-0001",
    path: "docs/adr/0001-wayfinder-map-destination.md",
    title: "Wayfinder map destination is a decisions-only IA spec for all named sections",
    excerpt:
      "The site's content isn't yet specified, and building it directly would mean discovering structure mid-implementation. We decided the wayfinder map's destination is a full content/information-architecture spec covering all named sections, stopping at decisions rather than pulling implementation into the map — a separate build effort executes the spec afterward. We considered scoping to a narrower first slice (e.g. Intro to AI only) but rejected it: the sections are already named and interrelated, so specifying only one risks decisions that don't hold up once the others are drafted.",
    truncated: true,
  },
  {
    number: "ADR-0003",
    path: "docs/adr/0003-frontend-dev-example-freezes-at-launch.md",
    title: "Frontend dev example section freezes at launch instead of updating continuously",
    excerpt:
      'The Frontend dev example section documents this repo\'s own build with periodic screenshots, which made it tempting to treat the section as perpetually "live" — updating forever as the codebase keeps changing after the teaching site ships. We decided it instead freezes at this site\'s launch: screenshot capture and narrative curation happen once, covering the build up to launch, and the section is not revisited as a maintenance task afterward. We considered keeping it continuously live, mirroring the fact that development doesn\'t stop, but rejected it: this is teaching material for a specific session rather than a maintained product, a frozen case study curates into a clean narrative the same way the Backend dev example did (three fixed beats, not an open-ended feed), and "living forever" has no natural stopping point.',
    truncated: true,
  },
  {
    number: "ADR-0004",
    path: "docs/adr/0004-visual-direction-title-card-and-shared-frame-morph.md",
    title: "Visual direction: title-card layout with expandable nav sidebar, shared-frame-morph transitions",
    excerpt:
      "The site's visual language (issue #11) needed a base palette/layout and a step-transition style before any scaffolding code could be written. Both were prototyped rather than decided from description — the base-palette question in particular needed a second round after the first was rejected outright.",
    truncated: true,
  },
];

export function mount(container: HTMLElement): void {
  let active = 0;

  container.innerHTML = `
    <p class="adr-intro">Recording why a decision was made — not just what
      was decided — means the same debate doesn't happen again the next time
      someone touches the code.</p>

    <p class="adr-lead">This project records decisions with its own
      <code class="inline">grill-me-with</code> skill and the domain-modeling
      process (see the Skills step) as design questions come up — not written
      up after the fact. Each decision is captured as an Architecture
      Decision Record naming the problem, the alternatives considered, and
      the consequences of the choice:</p>

    <div class="adr-walkthrough">
      <div class="adr-walkthrough-path">docs/adr/0002-pushstate-routing-with-404-fallback.md</div>
      <h2 class="adr-walkthrough-title">${WALKTHROUGH_TITLE}</h2>
      ${WALKTHROUGH.map(
        (seg) => `
        <div class="adr-segment">
          <div class="adr-segment-label">${seg.label}</div>
          <p class="adr-segment-text">${seg.text}</p>
        </div>`
      ).join("")}
    </div>

    <p class="adr-more-lead">Three more real decisions from this repo's own
      history:</p>

    <div class="adr-tabs">
      ${FILES.map(
        (f, i) => `<button class="adr-tab" data-file="${i}" type="button">${f.number}</button>`
      ).join("")}
    </div>

    <div class="adr-panel"></div>
  `;

  const tabs = Array.from(container.querySelectorAll<HTMLButtonElement>(".adr-tab"));
  const panel = container.querySelector<HTMLElement>(".adr-panel")!;

  function render(): void {
    const file = FILES[active];
    panel.innerHTML = `
      <div class="adr-file-path">${file.path}</div>
      <h3 class="adr-file-title">${file.title}</h3>
      <p class="adr-file-excerpt">${file.excerpt}</p>
      ${file.truncated ? '<div class="adr-file-note">Excerpt — trimmed for space.</div>' : ""}
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

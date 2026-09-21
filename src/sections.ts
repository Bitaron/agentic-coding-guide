import { mount as mountTraditionalDevelopment } from "./steps/traditional-development";
import { mount as mountTokenGeneration } from "./steps/token-generation";
import { mount as mountStatelessSessions } from "./steps/stateless-sessions";
import { mount as mountModelCategories } from "./steps/model-categories";
import { mount as mountProviderComparison } from "./steps/provider-comparison";
import { mount as mountTokenEconomics } from "./steps/token-economics";
import { mount as mountModelSelection } from "./steps/model-selection";
import { mount as mountPrompt } from "./steps/prompt";
import { mount as mountContextWindow } from "./steps/context-window";
import { mount as mountAgents } from "./steps/agents";
import { mount as mountSubAgents } from "./steps/sub-agents";
import { mount as mountSkills } from "./steps/skills";
import { mount as mountHooks } from "./steps/hooks";
import { mount as mountAgenticLoop } from "./steps/agentic-loop";
import { mount as mountGraph } from "./steps/graph";
import { mount as mountMemory } from "./steps/memory";
import { mount as mountPlugins } from "./steps/plugins";
import { mount as mountMcp } from "./steps/mcp";
import { mount as mountSpecification } from "./steps/specification";
import { mount as mountAdr } from "./steps/adr";
import { mount as mountTdd } from "./steps/tdd";
import { mount as mountCodeReview } from "./steps/code-review";
import { mount as mountFrontendIntro } from "./steps/frontend-intro";
import { mount as mountFrontendDesignResearch } from "./steps/frontend-design-research";
import { mount as mountFrontendBrowserTesting } from "./steps/frontend-browser-testing";
import { mount as mountBackendPlanning } from "./steps/backend-planning";
import { mount as mountBackendStructure } from "./steps/backend-structure";
import { mount as mountBackendHandoff } from "./steps/backend-handoff";

export interface Step {
  title: string;
  /** Plain-HTML body for text-only steps. */
  body?: string;
  /**
   * For steps whose representation is a diagram/animation/demo rather than
   * prose (per .claude/skills/create-section/SKILL.md's representation-type
   * choice): mounts interactive content into the given container and
   * returns an optional cleanup (e.g. to stop a running animation) that's
   * called before the step is torn down.
   */
  mount?: (container: HTMLElement) => (() => void) | void;
  /**
   * Steps whose content needs more than the default 62ch reading column
   * (diagrams, side-by-side comparisons) opt into the wider layout.
   */
  wide?: boolean;
}

export interface Section {
  id: string;
  label: string;
  steps: Step[];
}

// Content-specific tickets (see the "AI Coding Session Website —
// content/IA spec" wayfinder map, issue #2) replace these placeholder
// steps section by section. "Working in an existing project" has no
// content decision yet, so it gets a route and nav entry only — its
// structure is not invented here.
export const sections: Section[] = [
  {
    id: "intro",
    label: "Intro to AI",
    steps: [
      {
        title: "Traditional software building",
        wide: true,
        mount: mountTraditionalDevelopment,
      },
      {
        title: "Token generation",
        wide: true,
        mount: mountTokenGeneration,
      },
      {
        title: "Stateless sessions",
        wide: true,
        mount: mountStatelessSessions,
      },
      // Steps 4-7: the model landscape arc, ProjectBrief.md §4.1-§4.8 minus
      // §4.7 (merged into "Context window" below per issue #15). Built by
      // issue #14.
      {
        title: "Model categories & reasoning effort",
        wide: true,
        mount: mountModelCategories,
      },
      {
        title: "Model categories across providers",
        wide: true,
        mount: mountProviderComparison,
      },
      {
        title: "Reasoning effort & token consumption",
        wide: true,
        mount: mountTokenEconomics,
      },
      {
        title: "Model selection as an engineering trade-off",
        wide: true,
        mount: mountModelSelection,
      },
      {
        title: "Prompt",
        wide: true,
        mount: mountPrompt,
      },
      {
        title: "Context window",
        wide: true,
        mount: mountContextWindow,
      },
      {
        title: "Agents",
        wide: true,
        mount: mountAgents,
      },
      {
        title: "Sub-agents",
        wide: true,
        mount: mountSubAgents,
      },
      // Steps 12-18: the agentic toolbox's tooling/infra half. Built by
      // issue #16.
      {
        title: "Skills",
        wide: true,
        mount: mountSkills,
      },
      {
        title: "Hooks",
        wide: true,
        mount: mountHooks,
      },
      {
        title: "Agentic loop",
        wide: true,
        mount: mountAgenticLoop,
      },
      {
        title: "Graph",
        wide: true,
        mount: mountGraph,
      },
      {
        title: "Memory",
        mount: mountMemory,
      },
      {
        title: "Plugins",
        mount: mountPlugins,
      },
      {
        title: "MCP",
        mount: mountMcp,
      },
      // Steps 19-22: SE practices in agentic development. Built by issue #17.
      {
        title: "Specification",
        wide: true,
        mount: mountSpecification,
      },
      {
        title: "ADR — Architecture Decision Records",
        wide: true,
        mount: mountAdr,
      },
      {
        title: "TDD",
        wide: true,
        mount: mountTdd,
      },
      {
        title: "Code review",
        mount: mountCodeReview,
      },
    ],
  },
  {
    id: "backend",
    label: "Backend dev example",
    steps: [
      {
        title: "Planning & spec",
        wide: true,
        mount: mountBackendPlanning,
      },
      {
        title: "Structural decisions",
        wide: true,
        mount: mountBackendStructure,
      },
      {
        title: "The handoff, made literal",
        wide: true,
        mount: mountBackendHandoff,
      },
    ],
  },
  {
    id: "frontend",
    label: "Frontend dev example",
    steps: [
      {
        title: "This site is the example",
        wide: true,
        mount: mountFrontendIntro,
      },
      {
        title: "Design research — Lazyweb MCP",
        wide: true,
        mount: mountFrontendDesignResearch,
      },
      {
        title: "Browser testing — Playwright MCP",
        wide: true,
        mount: mountFrontendBrowserTesting,
      },
    ],
  },
  {
    id: "existing-project",
    label: "Working in an existing project",
    steps: [
      {
        title: "Coming soon",
        body: "This section's content has not been decided yet.",
      },
    ],
  },
];

export function findSection(id: string): Section | undefined {
  return sections.find((s) => s.id === id);
}

# Implementer Handoff — Staff Engineering Review of the Agentic Coding Guide

**Reviewed artifact:** https://bitaron.github.io/agentic-coding-guide/ (all 33 steps, 4 sections)
**Reviewed source:** `src/sections.ts`, `src/steps/*.ts`, `ProjectBrief.md`, `CONTEXT.md`, `docs/adr/*`, `.github/workflows/deploy.yml`, GitHub Issues #2–#34 (all closed)
**Review date:** 2026-09-22
**Reviewer frame:** Staff Software Engineer / agentic-coding practitioner, evaluating fitness for engineers who will apply this to real production systems.

---

## 0. Scope note and standing assumptions

Every content issue in this repo is closed. The site is **complete against its own brief**. Therefore every gap below is a gap in `ProjectBrief.md` itself, not unshipped work — fixing them means amending the brief, not just executing it.

This document is written under the assumptions in §5 (Grilling). If the answers there differ, the P-ranking in §3 changes; the findings themselves do not.

---

## 1. Executive Critique Summary

### 1.1 Key strengths — protect these, they are the guide's differentiator

1. **Evidential honesty is best-in-class.** Every step file carries a "Representation choice" comment stating what is real, what is illustrative, and why that visual form was chosen. `plugins.ts` deliberately omits TDD "because this repo's history has no commit that actually used it." `frontend-design-research.ts` keeps a lazyweb query that "returned mostly unrelated results" in the record. A screenshot is kept with the capture tool's own toast visible "since it's an honest artifact of how this very sequence of screenshots exists at all." Round 1 of the design work is shown being **rejected** ("q3 all are generic"). This is rarer and more valuable than anything else on the site. It is currently an implementation-comment property, invisible to readers — see P1-4.

2. **`Working in an existing project` is the strongest section by a wide margin.** Its stated throughline — "the agent below is deliberately ordinary… most of the catches come from the human actively steering and reviewing" — is the honest, correct, non-hype claim about agentic coding in legacy systems. Beat 4 (human corrects the *plan*, not the diff) demonstrates the single highest-leverage HITL principle on the site.

3. **The ADR step shows real artifacts, not a template.** ADR-0002 quoted verbatim, split into Problem / Alternative / Consequence, with three more real decisions browsable. This is how to teach ADRs.

4. **Two-computer backend handoff is a genuinely good demonstration** of context portability: the question typed in plain English, answered with a commit, then *proven* cold on the other machine. "Answered with a commit, not a promise" is the right instinct.

5. **The visual/interaction discipline holds.** No purple gradients, no glassmorphism, no fake dashboards. Interactions carry meaning (e.g. `model-categories.ts` uses two *independent* selectors specifically to operationalize "capability and effort are separate dials" as a behavior rather than a sentence). Diagram-vs-prose choices are deliberate and documented.

### 1.2 Fatal flaws — must fix before this is credible to a senior audience

**F1 — The guide teaches TDD and code review while having zero automated verification, and makes a forward promise it does not keep.**
`src/steps/tdd.ts` closes with: *"The Backend dev example and Frontend dev example sections carry this further with a demonstrated agent split across those same three responsibilities — this step is the concept; those sections are the worked example."* **No such demonstration exists** in either section. Meanwhile `plugins.ts` correctly states TDD was never used here. The repo has **no test files, no test script** (`package.json` has only `dev`/`build`/`preview`) and CI is build-and-deploy only (`tsc -b && vite build`). On a site whose entire credibility rests on "nothing is invented, everything is cited," this is the one uncited promise — and it is in the step about verification. A reviewer who checks one claim will check this one.

**F2 — Validation gates, the core of safe agentic engineering, are never taught as a system.**
The site has tests (conceptual), browser testing (real), and a six-bullet review list. It has no **verification ladder**: compile → typecheck → lint → unit → integration → browser → human. No definition of done. No acceptance criteria as an artifact. No CI as the agent's feedback loop. `hooks.ts` shows `Stop → run the test suite` — the exact mechanism for automating a gate — and never connects it to validation. An agent without gates is a code generator; the gate model is what makes it an engineering tool, and it is the largest conceptual hole in the guide.

**F3 — Task decomposition is demonstrated everywhere and taught nowhere.**
The `wayfinder` map → decisions → tickets workflow is the most transferable practice in the entire repo. It produced this site's own IA spec (#2), the backend spec, and 21 resolved decisions. A backend screenshot caption even carries the key judgment verbatim: *"too big for one session."* Yet there is **no concept step** for it. It appears as one line in the Plugins step. A reader sees the outputs of excellent decomposition without ever being taught to do it.

**F4 — No failure-mode model, and no security or trust content.**
Nothing on: hallucinated APIs, plausible-but-wrong code, silent scope drift, sycophantic agreement, context poisoning, error compounding across long loops. The MCP step describes arbitrary external tools and data flowing into the agent's context with **zero** mention of prompt injection via tool results, credential scope, or MCP-server supply-chain trust. Hooks are arbitrary shell execution wired to model-triggered events, presented without a single caution. For any enterprise reader these are the *first* questions asked, and the guide has no answer.

**F5 — There is no spine.** 33 steps, each self-contained, no shared state, no carried example. The reader never follows one unit of work end to end: request → decomposition → context → plan → gate → implement → verify → review → merge. The one section that does this (`existing-project`, 5 steps) is buried at the very end.

### 1.3 Major gaps

| # | Gap | Impact |
|---|---|---|
| G1 | **Design-by-contract / interface design absent.** The backend source description literally says *"Deep module with clean interface"* and the guide never teaches that explicit contracts (types, schemas, invariants) are the highest-leverage lever on agent output quality. | Highest-value SE principle for agentic work, missing entirely. |
| G2 | **Context *curation* vs. context *awareness*.** `context-window.ts` shows a useful/expensive/noisy bar — descriptive only. No operations taught: AGENT.md vs. skill vs. prompt; when to clear; compaction and its risks; retrieval vs. file-dumping; sub-agents as context isolation; tool-result bloat. | The #1 daily skill of agentic coding is presented as a concept, not a practice. |
| G3 | **Model-driven vs. code-driven control flow never distinguished.** The Graph step draws a flowchart (write → test → pass? → done/fix). The actual teaching — when to hand control to the model (agentic loop) vs. constrain it in a deterministic state machine (workflow graph), and the determinism/auditability/cost trade-off — is absent. | Enterprise architecture decision, unaddressed. |
| G4 | **Sub-agents taught with the naive taxonomy.** Research/Architecture/Implementation/Testing agents, with "work can happen in parallel" and no mention of coordination cost, handoff fidelity loss, shared-state conflict, or non-determinism. In practice sub-agents earn their keep on read-heavy fan-out returning *conclusions*, not on parallel writers. | Actively misleading at scale. |
| G5 | **External claims are the only uncited claims on the site.** Internal facts are meticulously sourced to PRs and files. Every external fact — provider model names, supported effort levels, "Anthropic notes…", "DeepSeek describes…" — appears as bare assertion with no link and no as-of date, hardcoded into TS constants. | Perishable and unverifiable; inverts the site's own standard. |
| G6 | **Provider catalogue consumes ~14% of the intro for low durability.** Three of 22 intro steps on a taxonomy that will be stale within months and is not actionable. The durable idea (capability × effort are independent dials; effort is provider-relative) fits in one step. | Poor content ROI; maintenance debt. |
| G7 | **No practice loop, no exercises, no checkpoints, no misconception checks.** Every step is intro → widget → caption. The brief requires the site "remain useful as standalone learning material after the live session" — as standalone material it has no way for a reader to find out whether they learned anything. | Ironic in a guide about evaluation loops. |
| G8 | **No audience statement or prerequisites.** Content oscillates from "what is a token" to "sub-agent effort binding in Kimi's coding docs" with no stated reader. | Both audiences are under-served. |
| G9 | **Traditional development is a waterfall strawman.** Requirements → analysis → architecture → divide → implement, with no feedback loop, no CI/CD, no iteration. The whole "AI changes this" argument rests on a baseline no modern team recognizes. | Undermines credibility in the first step the reader sees. |
| G10 | **No treatment of**: version-control discipline with agents (branch-per-task, worktrees, small reviewable PRs), CI, provenance/licensing of generated code, secrets in context, cost attribution, observability of agent runs, team policy. | The actual enterprise adoption blockers. |
| G11 | **Memory step uses the wrong axis.** It frames the choice as Markdown vs. dedicated system, conflating three different problems with different lifetimes: session context, durable project knowledge (AGENT.md/CONTEXT.md), and task/decision state (issues). Also recommends Beads while the repo itself uses GitHub Issues. | Muddles a concept the repo actually models well. |
| G12 | **Accessibility defect, repeated.** `role="img"` wraps interactive `<button>` elements in `graph.ts`, `tdd.ts`, `specification.ts`, `model-categories.ts`. Per ARIA, descendants of `role="img"` are presentational — these controls are removed from the accessibility tree and the steps become unusable with assistive tech. | Real, mechanical, fixable defect in 4 steps. |
| G13 | **Illustrative numbers presented as data.** `context-window.ts` hardcodes 70/20/10, 40/30/30, 15/15/70 and an invented "Effective, usable context: High / Reduced / Low" ordinal, unlabeled as illustrative — in the one step whose brief explicitly warns against stating fixed numbers. | Violates the site's own standard. |

---

## 2. Target Architecture & Workflow Guidelines

These are the guidelines the revised guide should both *teach* and *obey*. They define the target state the revision tasks in §3 move toward.

### 2.1 Content architecture: adopt a spine

Restructure from **22 concepts → 11 examples** to **concept clusters interleaved with one carried example**.

Choose **one** unit of work (recommended: the existing-project change — status filtering + CSV export) and carry it as a recurring "the spine" panel through every concept cluster. Each concept step ends with one line: *how this concept applies to the spine task right now*. The reader sees one task move request → decomposition → context → plan → gate → implement → verify → review → merge, with concepts introduced at the moment they are needed.

### 2.2 Teach the verification ladder as a first-class object

Introduce a named artifact — the **gate ladder** — ordered cheapest-to-most-expensive, with the rule *"push every check as far left as it will go, because left-hand gates run without a human."*

```
compile → typecheck → lint/format → unit → integration → browser/E2E → human review → merge
         └── automatable via hooks ──────────────────┘   └── reserve for judgment ──┘
```

Wire this explicitly to the Hooks step (`Stop → run the test suite` is a gate, say so), to TDD (a test is an executable acceptance criterion that converts a human gate into an automatic one — *this*, not "TDD is still good," is the argument), and to code review (review is what's left after the automatable gates have run, not a substitute for them).

### 2.3 Teach context as a set of operations, not a property

Replace "context window is big but not all useful" with a **placement decision table**: for a given piece of knowledge, does it belong in the system prompt, `AGENT.md`, a skill, a retrieved file, a sub-agent's isolated context, or an issue? Keyed on: lifetime (task / project / permanent), size, and how often it's needed. Include the disposal operations: clearing, compaction and what it loses, and delegating fan-out reads to a sub-agent so only the conclusion returns.

### 2.4 Human-in-the-loop as a control model, not an anecdote

Promote the existing-project section's implicit lesson to an explicit principle set:

- **Gate placement:** approving a *plan* is cheaper than approving a *diff*, which is cheaper than unwinding a *merge*. (The section already demonstrates this in Beat 4 — name it.)
- **Autonomy by blast radius:** the criterion for requiring human approval is reversibility and reach, not task difficulty.
- **Reviewing at scale:** what a human checks when they cannot read every line — contracts, gate coverage, and diffs against the codebase's own established patterns. (Beat 5 is exactly this: the bug was found by comparing the new route against the pattern used everywhere else.)

### 2.5 Sourcing policy: extend the site's own standard to external claims

The repo already enforces "never invent details about the real project." Extend it: **every external factual claim carries a source link and an as-of date.** Volatile provider facts move out of TS constants into a single dated, sourced data module so staleness is visible and repairable in one place.

### 2.6 Practise what is taught (the site as its own case study)

The site's most persuasive asset is that it *is* the example. Close the remaining gaps between preaching and practice:

- Add a test suite and wire it into CI as a gate before deploy — then cite that CI run from the TDD and Code review steps as real evidence, the same way Skills and ADR cite real files.
- Where a practice genuinely wasn't followed, **say so on the page** with an ADR, rather than removing the claim silently. An honest "we skipped TDD here and this is what it cost us" is worth more than a clean claim, and is consistent with the guide's existing instincts (rejected round 1, failed lazyweb query, capture-tool toast).

### 2.7 Non-goals (explicitly out of scope)

- Do not add a framework. The vanilla TS / no-dependency stance is correct and is itself teaching material.
- Do not expand the provider catalogue. Shrink it.
- Do not soften the existing-project section's "the agent is deliberately ordinary" framing. That honesty is the point.

---

## 3. Actionable Revision Tasks

Each task states **Input → Operation → Output**. P0 blocks credibility; P1 is the substance gap; P2 is polish and durability.

### P0 — Correctness and credibility (do first)

**P0-1 · Resolve the TDD forward-reference contradiction**
- *Input:* `src/steps/tdd.ts` (closing caption), `src/steps/plugins.ts` (the note that TDD was never used here), backend + frontend section content.
- *Operation:* Pick one and execute fully. **(a)** Delete the unsupported forward reference and replace it with an honest ADR-backed note that this project did not use TDD, plus what that cost (no regression safety net on 33 interactive steps). **(b)** Or make it true: build the three-responsibility agent split for a real change in this repo, capture it, and cite it. Recommended: **(a) now, (b) later** — (a) is honest and immediate.
- *Output:* No claim on the site that lacks a citable artifact. New `docs/adr/0005-no-tdd-on-this-repo.md` if (a).

**P0-2 · Add a test suite and make CI a gate**
- *Input:* `package.json`, `.github/workflows/deploy.yml`, `src/router.ts`, `src/sections.ts`, the 33 `mount()` functions.
- *Operation:* Add Vitest. Minimum viable coverage that is honest rather than decorative: (i) every step's `mount()` renders without throwing and its cleanup runs; (ii) router resolves `/section/n`, handles out-of-range and unknown sections, and the 404 fallback replays the intended route; (iii) `nextSection`/`findSection` boundaries. Add `npm test` and insert it into the deploy workflow **before** the build step, so a red test blocks the deploy.
- *Output:* `npm test` passes; CI fails the deploy on a red test; the gate ladder in §2.2 is demonstrably real on this repo.

**P0-3 · Fix the `role="img"` accessibility defect**
- *Input:* `src/steps/graph.ts`, `tdd.ts`, `specification.ts`, `model-categories.ts` (plus audit `shared.ts` `factorChain`/`rootFlow` and `frontend-shared.ts` `flowChain` for the same pattern with any future interactive children).
- *Operation:* Remove `role="img"` from any container holding focusable controls. Replace with a `<figure>`/`group` + visually-hidden description, or move the `aria-label` narrative into a sibling visually-hidden element, so the buttons remain in the accessibility tree. Keep `role="img"` only on genuinely static diagrams.
- *Output:* Every interactive diagram is keyboard- and screen-reader-operable; add a regression test asserting buttons are exposed.

**P0-4 · Label illustrative data as illustrative**
- *Input:* `src/steps/context-window.ts` (`MIXES` percentages, `effective` ordinal).
- *Operation:* Add an on-page label stating the proportions are illustrative, not measured — matching the convention `token-generation.ts` already uses ("Simplified for clarity… the word-sized chips are not [accurate]"). Either drop the "Effective, usable context: High/Reduced/Low" readout or state explicitly that it is a qualitative illustration.
- *Output:* No unlabeled invented number anywhere on the site.

**P0-5 · Source and date every external claim**
- *Input:* `provider-comparison.ts`, `model-categories.ts`, `token-economics.ts`, `specification.ts`, `hooks.ts`.
- *Operation:* Create `src/data/providers.ts` holding all volatile external facts with a `sourceUrl` and `asOf` per claim. Render an "as of <date> — source" affordance next to each. Add a repo-level policy line to `AGENT.md`: *external factual claims require a source link and an as-of date.*
- *Output:* Every external claim is checkable; staleness is visible and fixable in one file.

### P1 — Substance (the actual engineering content)

**P1-1 · Add a "Decomposition" concept step** *(closes F3)*
- *Input:* Backend screenshots (the "too big for one session" frame, the wayfinder map with 9 decisions / 9 tickets), issue #2, `docs/agents/issue-tracker.md`.
- *Operation:* New step in the Intro section, placed immediately after Prompt/Context and **before** Agents. Teach: how to recognize work too big for one agent session; decisions-before-implementation (the wayfinder pattern: chart the map, resolve decisions as tickets, synthesize a spec, then build); how to size a unit of agent work; acceptance criteria as the ticket's contract. Ground every claim in this repo's own real map and tickets.
- *Output:* The most transferable practice in the repo becomes teachable, not just visible.

**P1-2 · Add a "Validation gates" concept step** *(closes F2)*
- *Input:* §2.2 gate ladder, `hooks.ts`, `tdd.ts`, `code-review.ts`, the new CI from P0-2.
- *Operation:* New step introducing the ladder as an interactive object: the reader moves a gate left or right and sees the cost/latency/human-cost consequence. Explicitly retro-fit the neighbouring steps — Hooks gains "this is how you automate a gate," TDD gains "a test is an executable acceptance criterion that turns a human gate into an automatic one," Code review gains "review is what remains after the automatable gates have run."
- *Output:* The reader leaves with a definition of done they can apply.

**P1-3 · Add a "Failure modes & trust boundaries" step** *(closes F4)*
- *Input:* The existing-project section's five human-led catches (already a de-facto failure taxonomy), MCP and Hooks steps.
- *Operation:* Two parts. **(a) Failure gallery:** plausible-but-wrong code, hallucinated APIs, silent scope drift, sycophantic agreement, dropped requirements between "decided" and "written down" (the guide already demonstrates this one in existing-project Beat 4 — reuse it), error compounding over long loops. Each with the countermeasure that catches it, keyed to a gate from P1-2. **(b) Trust boundaries:** MCP servers and hooks execute untrusted input and arbitrary commands — prompt injection via tool results, credential scope, server provenance, approval of tool calls, secrets in context.
- *Output:* The enterprise reader's first questions have answers.

**P1-4 · Surface the sourcing discipline to readers**
- *Input:* The "Representation choice" comment at the top of all 33 step files (currently invisible to readers).
- *Operation:* Add a per-step "How this step is grounded" affordance rendering the real/illustrative distinction the comment already makes, plus a short site-level page stating the sourcing standard. This converts the guide's best property from an implementation detail into a teaching artifact — and models the standard it asks readers to adopt.
- *Output:* The differentiator becomes visible.

**P1-5 · Add a contracts/interface-design step** *(closes G1)*
- *Input:* The backend project description's own `"Deep module with clean interface"` line, the backend module tree (ticket #12), Embedded Mode's interface decisions (ticket #17 — already an excellent real contract: no JPA repositories, one property for storage backend, resolved tenant/actor passed in, never a raw ApiKey secret).
- *Operation:* New step teaching: explicit contracts (types, schemas, invariants, pre/postconditions) are the highest-leverage input to agent output quality, because they make "correct" checkable without a human. Ticket #17 is already a perfect worked example — use it.
- *Output:* The guide's central SE claim, currently missing, is made with real material.

**P1-6 · Rebuild the Graph step around control flow** *(closes G3)*
- *Input:* `src/steps/graph.ts`.
- *Operation:* Replace the write→test→pass? flowchart with the actual teaching: model-decided control flow (agentic loop — flexible, non-deterministic, expensive, hard to audit) vs. code-decided control flow (workflow graph — deterministic, resumable, checkpointable, auditable, rigid), and the criteria for choosing. Frame it as an architecture decision with a trade-off table.
- *Output:* A step that earns its position instead of restating the loop.

**P1-7 · Rewrite sub-agents with the honest trade-off** *(closes G4)*
- *Input:* `src/steps/sub-agents.ts`.
- *Operation:* Keep the delegation tree; replace the four-role taxonomy's framing. Lead with the real mechanism: **context isolation** — a sub-agent reads widely and returns a conclusion, keeping the caller's context clean. Add the costs: coordination overhead, handoff fidelity loss, non-determinism, shared-state/merge conflict when parallel agents write. State when *not* to delegate.
- *Output:* Advice that survives contact with a real codebase.

**P1-8 · Repair the Intro section's ordering** *(closes part of F5, G8)*
- *Input:* `src/sections.ts` step order.
- *Operation:* Proposed order — (1) Traditional development *(fixed per P2-1)*, (2) Token generation, (3) Stateless sessions, (4) **Memory** *(moved adjacent — same idea, two halves)*, (5) Prompt, (6) Context window, (7) **Decomposition** *(new, P1-1)*, (8) Agents, (9) Agentic loop, (10) Sub-agents, (11) Graph/control flow, (12) Skills, (13) Hooks, (14) Plugins, (15) MCP, (16) **Model landscape — one merged step** *(P2-2; now the reader knows the workloads before choosing a model for them)*, (17) Specification, (18) **Contracts** *(new, P1-5)*, (19) **Validation gates** *(new, P1-2)*, (20) TDD, (21) Code review, (22) **Failure modes & trust boundaries** *(new, P1-3)*.
- *Output:* Concepts arrive when the reader needs them; the tooling cluster is no longer interrupted; model selection follows workload understanding.

**P1-9 · Introduce the spine** *(closes F5)*
- *Input:* The existing-project narrative, all Intro concept steps.
- *Operation:* Per §2.1, carry one task across the concept steps with a recurring one-line "on the spine task, this means…" panel. Do not duplicate the existing-project section — thread it.
- *Output:* One continuous mental model instead of 22 disconnected ones.

### P2 — Durability and polish

**P2-1 · Fix the traditional-development strawman** *(G9)* — Add the feedback loops the current diagram omits: requirements churn, review, CI, iteration, production feedback. The contrast with agentic development should be "who does the work and how fast the loop closes," not "waterfall vs. AI." *Input:* `traditional-development.ts`. *Output:* A baseline a senior engineer recognizes.

**P2-2 · Collapse the provider catalogue** *(G6)* — Merge `model-categories` + `provider-comparison` + `token-economics` + `model-selection` from 4 steps into 2: one on the durable idea (capability × effort are independent dials, effort is provider-relative, token economics of agentic loops), one dated/sourced reference table fed from P0-5's data module. *Output:* ~2 steps of budget freed for P1 content; one maintenance point.

**P2-3 · Re-axis the Memory step** *(G11)* — Reframe from "Markdown vs. dedicated system" to the three distinct persistence problems (session context / durable project knowledge / task-and-decision state), each with its own lifetime, access pattern, and fitting store. Use this repo's real setup (`AGENT.md` + `CONTEXT.md` + GitHub Issues) as the worked example; keep Beads as a named alternative rather than the recommendation the repo doesn't follow.

**P2-4 · Add a practice loop** *(G7)* — One checkpoint per cluster: a short "what would you do here" with a revealed answer, or a misconception check. Reuse the existing progressive-disclosure pattern; no new component needed.

**P2-5 · State the audience and prerequisites** *(G8)* — A short entry step naming who this is for, what it assumes, and what it does not cover. Add a self-paced progress indicator so a reader knows where they are in 33 steps.

**P2-6 · Add agent-era version-control and delivery practice** *(G10)* — Branch-per-task, worktrees for parallel agents, small reviewable PRs, commit hygiene, provenance of generated code. This repo already does all of it (worktrees, PR #21/#27, branch-per-ticket) — cite the real history.

**P2-7 · Strengthen the browser-testing step** — Currently an 8-node label chain plus two reused frames. Add what is actually checked and one real assertion, so it instructs rather than only evidences. Keep its existing honesty note about the missing desktop/mobile comparison shot.

**P2-8 · Soften `mcp.ts`'s "complete workflow" forward reference** — The frontend section delivers design research and browser testing, which is real but less than "a complete, real MCP-based workflow." Match the claim to the artifact.

---

## 4. Acceptance Criteria & Verification Checklist

The implementer agent must satisfy every box. Each is mechanically checkable.

### 4.1 Global invariants (must hold after every task)

- [ ] `npm run build` passes (`tsc -b && vite build`), zero TS errors.
- [ ] `npm test` exists and passes; CI fails the deploy on a red test.
- [ ] Every step still mounts and unmounts without console errors, verified in a real browser at desktop **and** mobile widths (the repo's own established practice — Playwright MCP).
- [ ] No step makes a factual claim about this project that cannot be traced to a real file, commit, PR, or issue in this repo.
- [ ] No step makes an external factual claim without a source link and an as-of date.
- [ ] No invented number appears without an on-page label marking it illustrative.
- [ ] No new dependency added beyond the test runner, unless it is justified in an ADR.
- [ ] Design-philosophy constraints in `AGENT.md` still hold (no gradients/glassmorphism/decorative animation; every visual element has a communication purpose).
- [ ] Each new or materially changed decision is recorded as an ADR in `docs/adr/`.
- [ ] `CONTEXT.md` glossary updated for any new domain term introduced (e.g. *gate ladder*, *spine*).

### 4.2 Per-task acceptance

| Task | Done when |
|---|---|
| P0-1 | `grep -n "worked example" src/steps/tdd.ts` returns nothing unsupported; every remaining claim in `tdd.ts` resolves to a real artifact; ADR recorded if option (a). |
| P0-2 | `npm test` runs ≥1 test per step `mount()`, plus router boundary cases; deploy workflow runs tests before build; a deliberately broken test blocks the deploy in a dry run. |
| P0-3 | No element with `role="img"` contains a focusable descendant (assert this in a test); all four steps fully keyboard-navigable; screen-reader pass on `graph.ts`. |
| P0-4 | `context-window.ts` renders an on-page illustrative-data label; the "Effective" readout is either removed or explicitly qualified. |
| P0-5 | All volatile external facts live in one dated, sourced module; each renders its source affordance; `AGENT.md` records the sourcing policy. |
| P1-1 | New Decomposition step cites this repo's real wayfinder map (#2) and the backend map's 9-decisions/9-tickets frame; teaches session-sizing and acceptance criteria. |
| P1-2 | Gate ladder step is interactive; Hooks, TDD, and Code review each explicitly reference it; the ladder matches the CI built in P0-2. |
| P1-3 | Failure gallery lists ≥6 failure modes each paired with a countermeasure keyed to a gate; trust-boundary content covers prompt injection via tool results, credential scope, and MCP-server provenance. |
| P1-4 | Every step exposes its real/illustrative grounding to the reader; a site-level sourcing-standard page exists. |
| P1-5 | Contracts step uses backend ticket #17's real interface decisions as its worked example. |
| P1-6 | Graph step presents model-driven vs. code-driven control flow with a trade-off table; no longer duplicates the agentic-loop cycle. |
| P1-7 | Sub-agents step leads with context isolation and names ≥3 concrete costs of delegation, including a "don't delegate when…" rule. |
| P1-8 | `src/sections.ts` matches the proposed order; every route `/intro/N` resolves; deep links to the previously-numbered steps either still work or are redirected (**routing regression risk — cover with tests**). |
| P1-9 | ≥8 Intro concept steps carry a spine panel referencing the same carried task. |
| P2-* | Each closes its named gap; each is traceable to a GitHub issue with acceptance criteria, per this repo's own tracker convention. |

### 4.3 Definition of done for the whole revision

A senior engineer reading the guide end to end can, without further reading:

1. **Decompose** a real feature into agent-sized units with explicit acceptance criteria.
2. **Curate context** deliberately — knowing what belongs in `AGENT.md` vs. a skill vs. a prompt vs. a sub-agent.
3. **Define a gate ladder** for their own repo and automate its left-hand half.
4. **Name ≥5 agent failure modes** and the gate that catches each.
5. **Place human review** where it is cheapest (plan over diff over merge) and justify autonomy by blast radius.
6. **Articulate the trust boundary** an MCP server or hook introduces.
7. **Point to real evidence** for every practice the guide recommends — including the ones this project did *not* follow.

If a reader finishes with "they used impressive tools" rather than "here is my operating procedure," the revision has failed.

---

## 5. Grilling — open ambiguities that re-rank this backlog

These are unresolved and my assumptions are stated. If an answer differs, the ranking in §3 changes; the findings do not.

**Q1 — Who is this for, exactly?**
The content spans "what is a token" to "Kimi's sub-agent effort binding." Those are different people. *Assumed:* working software engineers, 2+ years, new to agentic workflows — which is what justifies prioritizing gates/decomposition/failure modes over model taxonomy. If the real audience is executives or absolute beginners, P1-2/P1-3/P1-5 drop and P2-5 rises to P0.

**Q2 — Is the live session or the standalone artifact the primary product?**
Front-loading 22 concept steps is defensible for a presenter who narrates the spine aloud and fatal for a self-paced reader. *Assumed:* the brief's stated requirement — "remain useful as standalone learning material after the live session" — is binding, which is what makes F5 (no spine) and G7 (no practice loop) serious. If the live session dominates, P1-9 and P2-4 drop to P2.

**Q3 — Is `ProjectBrief.md` amendable, or is it a fixed contract?**
Every gap here is a gap in the brief. Every issue is closed; the site fully satisfies its spec. *Assumed:* the brief is amendable. If it is frozen, this document becomes a proposal for a v2 brief and nothing in §3 can be executed as-is.

**Q4 — What is the enterprise claim, and what backs it?**
The evidence base is one Spring Boot library, one teaching site, and one *fictional* legacy app. None is a multi-team production system. *Assumed:* the guide should scope its claims to what the evidence supports and say so, rather than generalize. If it must genuinely address enterprise systems, the missing content (monorepos, CI at scale, policy, cost attribution, observability, compliance) is a second project, not a revision.

**Q5 — Will the provider catalogue be maintained?**
Hardcoded model names in TS constants are a standing liability with no owner. *Assumed:* no one will maintain them, which is why P2-2 says shrink and P0-5 says date-and-source. If there is a committed maintainer and a refresh cadence, P2-2 is unnecessary.

**Q6 — Is the site allowed to say it failed at something?**
P0-1 option (a) and §2.6 both ask the site to state on-page that this project skipped TDD. Its existing instincts say yes (rejected round 1, failed lazyweb query, capture toast kept in frame). *Assumed:* yes. If the site must present an unblemished process, P0-1 forces option (b) — build the TDD demonstration for real — which is substantially more work.

**Q7 — Whose repo is the backend example, and can it be extended?**
`spring-boot-file-manager` is referenced by issue number throughout but is a separate repo. Several tasks (P1-5's contracts example, a real TDD demonstration) want material from it. *Assumed:* it is accessible and citable, since the guide already cites its issues. If not, those tasks fall back to this repo's own history.

---

## 6. One-paragraph verdict

This is an unusually honest piece of teaching material with a rigorous sourcing discipline that most engineering documentation does not achieve — and it is currently teaching the *vocabulary* of agentic coding rather than the *engineering* of it. A reader finishes able to define a hook, a skill, a sub-agent, and an MCP server, and unable to decompose a feature for an agent, define a gate that catches its mistakes, or name what happens when it is confidently wrong. The fix is not more concepts. It is three new steps (decomposition, gates, failure modes), a spine that carries one task through all of them, and closing the two places where the site asks the reader to do something it does not do itself: keeping a promise it cannot cite, and shipping 33 interactive steps with no tests.

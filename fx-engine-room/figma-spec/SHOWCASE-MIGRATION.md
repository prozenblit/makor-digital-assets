# FX Engine Room showcase: migration to the shared showcase kit

Date: 2026-10-15. Changed file: `fx-engine-room/design-system/showcase.html` only (tokens.css, components.css, assets, kit, other platforms, hub untouched). Structure follows `shared/showcase-kit/STRUCTURE.md` and `MIGRATION.md`.

Size: 464,763 B -> 520,841 B (the 8 foundations, the 4 reference sections, per-card source/copy chrome and 45 frame templates carry more markup than the old chrome).

## What changed

- Head: Nunito Google Fonts link, `tokens.css`, `components.css` kept; `../../shared/showcase-kit/showcase-kit.css` added; all `sc-*` chrome CSS removed. One inline `<style>` block: the `--sk-*` mapping on `.sk-app` (dark platform, all values from the platform tokens) plus "showcase support" rules (listed under Deviations).
- Body: `.sk-app` > top bar (logo = `icon-logo-fx-mark-50`, the logo already used; title "FX Engine Room design system"; "Source: Figma FX Engine Room · Section 3 · harvested 2026-10-14"; search; no theme toggle because the platform is dark-only) > kit-built nav > sections. Script `showcase-kit.js` at the end, then one platform script (demo interactivity, banner detection, frame toggles, Replay, screen Copy HTML).
- Overview: lead (old intro text, `?noscale` sentence moved to a callout), the `text-box: trim-both` warning banner (`#scTextBoxWarn`, hidden by default, same detection script `CSS.supports('text-box','trim-both')`), count chips, four-badge legend, large-frame and verification callouts (1245 checks, all pass).
- Foundations: exactly the 8 fixed ids; extras are sub-headings (legacy ids `f-figma`, `f-raw`, `f-semantic`, `f-input-fill`, `f-heights`, `f-shell` kept on the `h3`; `f-type`, `f-effects` kept as empty anchors, so old deep links resolve).
- Components: 65 cards, ids unchanged, grouped by role (9 groups) into 25 sections (`c-<group>-<name>`), anatomy title / Source / stage / Copy HTML / notes. Per-variant captions are `sk-variant__cap`; `sc-ext` -> `sk-badge--extended` (49) with the "why" text beside it. 5 captions that already said "alt"/"alternate" also got an Alt badge (additive).
- Frames: the 45 `sc-fit` frames (38 in cards, 7 screens) are `.sk-frame` + `<template>` with `data-sk-w/h` = the measured natural size of the old frame (screens 1440x1024, Trading Account 1280x1040; card frames e.g. 1384x56, 628x693, 1070x587). Card-frame demo markup sits in `.sk-demo` inside the template so the kit's Copy HTML works.
- Screens: 7 sections `s-*`, each with one `figure.sk-screen` (`<id>-frame`), Fit / 100% toggle from the kit.
- Reference: `r-decisions` (22 former inconsistency rows + 5 migration rows), `r-dead-code`, `r-extended-index` (49 rows, one per Extended badge, linked to its card), `r-open-decisions` (10 questions).
- Old `?noscale`: replaced by the kit's Fit / 100% toggle on every screen caption, plus a Fit / 100% toggle in the foot of every card that contains frames (page script, because the kit only toggles screens). `?noscale` itself still works (all frames start at 100%). Documented in the Overview.

## Old -> new mapping

| Old | New |
|---|---|
| intro + `#scTextBoxWarn` | `#overview` (banner kept inside) |
| `f-figma`, `f-raw`, `f-semantic`, `f-input-fill` | `f-colours` (h3 sub-headings) |
| `f-type` | `f-typography` |
| `f-radii`, `f-spacing` | `f-radii`, `f-spacing` |
| `f-effects` | `f-shadows` |
| (none; timings from build-notes.md / components.css) | `f-motion` (new content) |
| `f-heights`, `f-shell` | `f-sizes` (+ z-index "Not defined in the source") |
| `f-icons` | `f-icons` |
| `cs-buttons` (13 cards) | `c-actions-buttons`; `c-btn-icon` -> `c-actions-icon-buttons`; `c-tabs` -> `c-navigation-tabs` |
| `cs-fields` | `c-forms-input` (input, search), `c-forms-select` (select), `c-forms-chips` (chips, textarea); `c-dropdown-list` -> `c-overlays-dropdown-list` |
| `cs-selection` | `c-selection-checkbox`, `-radio`, `-switch`; `c-segmented` (from Modals) -> `c-selection-segmented` |
| `cs-chips-tags` | `c-indicators-chips`; `c-pulse` (from Shell) -> `c-indicators-live` |
| `cs-overlays` | `c-feedback-tooltip` (tooltip), `c-overlays-menus`, `c-overlays-filters` (2 cards), `c-navigation-paging` (pagination, scrollbar) |
| `cs-shell` (9 cards) | `c-navigation-shell` (8 cards) + `c-indicators-live` |
| `cs-auth` | `c-patterns-auth` |
| `cs-entities` | `c-data-entities` (list, group card), `c-patterns-trading-account` (2 cards) |
| `cs-modals` | `c-overlays-modals` (5 cards) + `c-selection-segmented` |
| `cs-widgets` | `c-patterns-widgets` |
| `cs-blotter` | `c-data-blotter` (toolbar, table, deleted, animation); `c-patterns-reports` (reports, file list) |
| `s-login`, `s-entities`, `s-ta`, `s-dashboard`, `s-blotter`, `s-deal`, `s-reports` (articles) | sections `s-*` (same ids), figure ids `s-*-frame` |
| `inconsistencies` | `r-decisions` (anchor `inconsistencies` kept) |
| (hidden/not-built/TODO lists in build-notes, VERIFICATION, CLAUDE.md) | `r-dead-code`, `r-open-decisions` |
| 49 `sc-ext` badges | `r-extended-index` (49 rows) |

## Verification (Chrome 155, headless via CDP, 1440x900 / 1500x1000; fonts loaded)

| Check | Result |
|---|---|
| SKSnap, demo level (every element inside the old `.sc-v__el`, `.sc-fit__inner`, surface samples vs `.sk-demo`, `.sk-frame__inner`; animations disabled both runs) | 5,190 vs 5,190 elements, **0 changed, 0 only-before, 0 only-after** |
| SKSnap incl. foundation specimens (type specimens, icon gallery) | 5,217 vs 5,217; only the 5 inherited table / chrome properties of the type specimens (`border-collapse`, border-spacing, `overflow-wrap`, `white-space` from the old `<td>` vs new `<div>`) and the 5 gallery flags (inherit chrome font/colour) differ; the type tuples themselves are identical |
| SKSnap literal `.sc-stage` vs `.sk-stage` (+ screen frames) | 0 changed among matched elements; residue is chrome only: 204 caption keys (class-less `figcaption` before, classed after), `br` (49), 40 caption "why" spans, 4 surface samples that moved into stages; counts 5,465 vs 5,239 because the old stage also held the screens' captions |
| `SK.problems` | `[]` |
| Console / network | 0 errors, 0 failed requests on `showcase?all` (served by `npx serve`); 70 `<img>` all load, 74 CSS `url()` assets all 200 |
| Nav | 45 items, each opens exactly one non-empty section and sets `aria-current` |
| Deep links | `#c-btn-primary`, `#c-blotter-anim`, `#s-deal-frame`, `#f-heights`, `#f-input-fill`, `#inconsistencies`, `#cs-modals`, `#c-modal-perm`, `#s-login` open the right section and scroll to the target; `?all` shows all 45 sections |
| Frames | scaled box height = h x scale (checked); lazy render confirmed; Fit / 100% toggle on a screen (scale 1.000, `is-100`) and in a card foot works; `?noscale` starts at 100% with the toggle pressed |
| Copy HTML | card (Primary button: 5 demos joined), card whose frames were not rendered yet (renders them first, 1,755 / 1,966 chars); screen button copies the frame markup; all show "Copied ✓" |
| Replay | re-creates `.blotter-anim` |
| Tabs demo click | still toggles `.is-active` |
| Banner | with `CSS.supports('text-box','trim-both')` forced false, `#scTextBoxWarn` is shown (display block) |

Counts old -> new:

| | Old | New |
|---|---|---|
| Foundations / nav sections | 11 | 8 (+ overview) |
| Component groups / sections | 11 groups | 9 role groups, 25 sections |
| Component cards (demos) | 65 | 65 |
| Screens | 7 | 7 |
| Variants (`sc-v` / `sk-variant`) | 265 (220 + 45 frames) | 262 card variants (220 + 4 surface samples + 38 card frames) + 7 screen frames |
| Frames | 45 | 45 |
| Extended badges | 50 (49 + 1 in intro) | 50 (49 + 1 legend); chip says 49 |
| Alt badges | 0 | 5 (+ legend) |
| Swatches / icon cards / `<img>` assets | 66 / 70 / 70 | 66 / 70 / 70 |
| Inconsistency rows | 22 | 22 (+ 5 migration rows = 27) |
| Copy HTML buttons | 72 | 65 cards + 7 screens = 72 |
| Tallest section | (one page, 64,288 px) | `f-colours` 9,739 px (next: `c-overlays-modals` 8,255 px) |

Screenshots (Overview, Colours, Buttons card, Shell frames, Log In screen, Extended index, Decisions): `fxmig/shots/*.png` in the migration scratchpad.

## Deviations and explanations

1. **Showcase-support CSS** (inline block, not inside any demo): stage background per surface (`.sk-stage.surface-*` sets `--sk-stage-bg`; the surface classes stay on the stage because they set `--input-fill`), frame box transparent inside stages, `.sk-variant.fx-fit {width:100%}`, `:where(.sk-stage, .sk-frame__inner) b` (the old global `b` weight rule; specificity kept at 0,0,1 so cascade order is identical; r-decisions 23), swatch dot / height bar / surface-row helpers for foundation blocks, `#scTextBoxWarn[hidden]`.
2. **Screens**: the content template is wrapped in `<div class="sk-demo surface-page" style="display:contents">` so the old stage's `surface-page` (`--input-fill`) still reaches the screen.
3. **Copy HTML**: the kit copies `.sk-demo` markup joined by blank lines; the old per-caption comments and click-a-caption copy are gone. The kit has no Copy HTML for screens: a page-script button in each screen caption copies the frame template. A capture-phase hook renders a card's lazy frames before copying.
4. **Replay** button moved from the card head to the card foot (`data-fx-replay`).
5. **Source line**: old `Figma: ...` text kept verbatim after `Source:`.
6. **Content added**: Motion section, Dead code, Open decisions, Alt badges (5), 5 decision rows, hidden `h3` anchors; old "Click any caption to copy that variant" sentence dropped from the Buttons lead; Shell lead no longer lists the live pulse (moved to Indicators).
7. **Foundation chrome** is rebuilt (swatches, type rows, samples, icon cards), so it is not demo-identical by design; values and text are copied from the old markup.
8. Old `h2` part headings `components`, `screens`, `decisions` (ids) have no equivalent and were not kept as anchors.
9. `f-colours` is 9,739 px tall (66 swatches + 8 semantic tables); within the ~15,000 px guideline.

## Generator

`scratchpad/fxmig/gen.mjs` (parse5; reads `fx.old.html` and `frames-old.json`, writes the page; demo markup is copied from source offsets). Support scripts in the same folder: `m1.mjs` (measure old frames), `snap.mjs` (SKSnap before/after + order-independent compare), `verify.mjs`, `shots.mjs`. Scratchpad path: `%TEMP%\claude\...\eceaf49d-b0e0-4a52-9314-d3f4c8bbf136\scratchpad\fxmig`.

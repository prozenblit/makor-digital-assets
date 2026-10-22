# Equity Derivatives Auction - showcase migration onto the shared showcase kit

Date 2026-10-15. Scope: `equity-derivatives/design-system/showcase.html` only. `tokens.css`, `components.css`, `tokens.json`, `components.md`, `CLAUDE.md`, `assets/`, the kit (`shared/showcase-kit/`), other platforms and the hub were not touched.

Kit rules followed: `shared/showcase-kit/STRUCTURE.md` (binding), `MIGRATION.md`, `template.html`.

## 1. What changed

| Area | Before | After |
|---|---|---|
| Size | 380,013 bytes, 665 lines | 503,835 bytes (+123,822: 90,846 of Copy HTML sources, new Reference text, kit markup) |
| Chrome | hand-written `.sc-top`, `.sc-nav` (52 links, scroll spy), `.sc-main`, parts (Foundations / Components / Screens / Decisions), one long scrolling page | kit chrome: `.sk-app`, `.sk-top` (Makor M mark, title "Equity Derivatives Auction design system", source line "Source: Figma Equity Derivatives Auction · Section2 · harvested 2026-10-14", search), kit-built nav (Overview, Foundations 8, Components by role, Screens 14, Reference 4), one section visible at a time (hash routed, `?all` shows all) |
| Head | tokens.css, components.css, Lato link, 111 CSS rules | same three links, then `showcase-kit.css`; a token mapping on `.sk-app` (dark platform, `--sk-*` from `tokens.css` variables only); 14 kept demo-support rules + 10 `eq-` / `sk-` support rules (see section 4) |
| Scripts | pretty-printer, frame fit, scroll spy, Copy HTML, Show HTML toggle, then the live demo behaviours | `showcase-kit.js`, then the live demo behaviours unchanged (dropdown menu, time stepper, check, tabs, segmented, toggle, countdown, Bid/Ask validation). Fit, spy, copy and Show HTML code removed (the kit replaces them) |
| Foundations | 7 sections | 8 fixed ids: the old 7 plus Motion (new) and Sizes & layout (old "Control heights and shell geometry" + a z-index table). Swatches, type rows, samples, icon gallery rebuilt with the kit blocks |
| Components | 30 cards in 5 groups, each with its own per-variant stage | 30 cards (ids unchanged) in 10 role groups, one section per old card + 1 cross-reference section; each card has Source line, stage, captions, Copy HTML, notes |
| Screens | 14 `.sc-screen` articles with a page-script scaler | 14 sections `s-*` (old ids kept as section ids), each with a `figure.sk-screen` and a `.sk-frame` at the Figma size (13 x 1440x1024, 1 x 1920x1080), content in `<template>` (lazy render), Fit / 100% toggle |
| Reference | Decisions (30 rows) | `r-decisions` (30 rows, same text, new columns + status; plus migration notes M1-M8), `r-dead-code`, `r-extended-index` (49 rows, linked), `r-open-decisions` (13 questions) |

Generator (kept for reproducibility, in the session scratchpad `.../scratchpad/eqmig/`): `build-showcase.js` (parse + restructure), `texts.js` (hand-written overview / motion / dead-code / open-decision text and the head), `mini-html.js` (offset-preserving parser), `fit-heights.json` (measured natural heights of the 31 in-card frames), `equity.old.html` (the original, sha1 `5b29e97e711659411b4ee1491e00e613db1a2b80`). Run `node build-showcase.js`. Demo markup is copied byte for byte from the original; only chrome is rewritten. Verification scripts: `snap-before.mjs`, `snap-after.mjs`, `verify2.mjs`, `verify3.mjs`, `shots.mjs`.

## 2. Old to new mapping

### Foundations

| Old | New |
|---|---|
| `#f-colors` Colours (23 Figma variables, 7 raw, 6 alias tables, 4 Extended swatches) | `#f-colours` (each old block = `h3.sk-h3`; swatches as `sk-swatch`; alias tables as `sk-table`) |
| `#f-type` Typography (font card, 6-size scale, 43-row tuple table) | `#f-typography` |
| `#f-radii` (14 tiles) | `#f-radii` (`sk-sample`) |
| `#f-spacing` (13 rows) | `#f-spacing` (`sk-sample`) |
| `#f-shadows` Shadows and blur (4 shadows + scrim blur demo) | `#f-shadows` Shadows & effects |
| (none) | `#f-motion` "Not defined in the source." + the facts recorded in build-notes (no transition/animation/keyframes in tokens.css / components.css; skeleton is static; countdown is behaviour, not motion) |
| `#f-heights` Control heights and shell geometry (13 heights + 15 `--layout-*` rows) | `#f-sizes` Sizes & layout (sub-headings Control heights, Shell geometry, z-index; the six literal z-index values of components.css are listed) |
| `#f-icons` Icons (31 gallery cards) | `#f-icons` Icons & logos (31 `sk-icon`) |

Old ids `#f-colors`, `#f-type`, `#f-heights`, `#inconsistencies` are kept as empty anchors inside the new sections.

### Components (card id unchanged)

| Old group / card | Card id | New section | Nav group |
|---|---|---|---|
| Controls / Text input | `c-text-input` | `c-forms-text-input` | Forms & inputs |
| Controls / Search | `c-search` | `c-forms-search` | Forms & inputs |
| Controls / Date | `c-date` | `c-forms-date` | Forms & inputs |
| Controls / Dropdown + open menu | `c-dropdown` | `c-forms-dropdown` (open menu variants stay in this card) | Forms & inputs |
| Controls / Time (stepper) | `c-time` | `c-forms-time` | Forms & inputs |
| Controls / Check | `c-check` | `c-selection-check` | Selection controls |
| Controls / Segmented control | `c-segmented` | `c-selection-segmented-control` | Selection controls |
| Controls / Toggle | `c-toggle` | `c-selection-toggle` | Selection controls |
| Controls / Button | `c-button` | `c-actions-button` | Actions |
| Controls / Button with arrow | `c-button-arrow` | `c-actions-button-arrow` | Actions |
| Controls / Icon buttons and row actions | `c-icon-button` | `c-actions-icon-buttons` | Actions |
| Controls / Tabs | `c-tabs` | `c-navigation-tabs` | Navigation |
| Feedback / Time chip | `c-chip-time` | `c-indicators-time-chip` | Indicators |
| Feedback / Equilibrium Price chip | `c-chip-eq` | `c-indicators-equilibrium-chip` | Indicators |
| Feedback / Row status icons | `c-row-icons` | `c-indicators-row-status-icons` | Indicators |
| Feedback / Toast / tooltip chips | `c-toast` | `c-feedback-toast-tooltip` | Feedback |
| Feedback / Order cell states | `c-cell-states` | `c-feedback-order-cell-states` (judgement: match / error / partial states of order-entry cells) | Feedback |
| Feedback / Notification cards | `c-notification` | `c-feedback-notification-cards` | Feedback |
| Overlays and modals / Scrim, modal, field | `c-modal` | `c-overlays-modal` | Overlays |
| (open menu, from Dropdown) | - | `c-overlays-open-menu` (cross-reference to `#c-dropdown`, no duplicate demo) | Overlays |
| Overlays and modals / Scrollbar | `c-scrollbar` | `c-overlays-scrollbar` | Overlays |
| Patterns / New Auction modal | `c-new-auction` | `c-overlays-new-auction-modal` | Overlays |
| Patterns / Admin modals | `c-admin-modals` | `c-overlays-admin-modals` | Overlays |
| Patterns / App shell | `c-shell` | `c-navigation-app-shell` | Navigation |
| Patterns / Session card | `c-session-card` | `c-data-session-card` | Data display |
| Patterns / Instrument table | `c-itable` | `c-data-instrument-table` | Data display |
| Patterns / Statics lists | `c-statics` | `c-data-statics-lists` | Data display |
| Patterns / Aggregate + Global order book | `c-orderbook` | `c-patterns-order-books` | Platform patterns |
| Patterns / Audit Log | `c-audit` | `c-patterns-audit-log` | Platform patterns |
| Patterns / Log In | `c-login` | `c-patterns-log-in` | Platform patterns |
| Behaviour (EXTENDED) / Bid / Ask validation | `c-order-validation` | `c-extended-bid-ask-validation` | Extended states |

Deep links to a card id (`#c-itable`) open the section and scroll to the card; old nav labels are the new nav labels.

### Screens and decisions

| Old | New |
|---|---|
| `s-trade`, `s-new-auction`, `s-client-1440`, `s-client-1920`, `s-lever`, `s-freeze`, `s-summary`, `s-login`, `s-clients`, `s-traders`, `s-trader-modals`, `s-internal-modals`, `s-client-new`, `s-client-edit` (articles) | same ids as sections; the figure is `<id>-frame`; titles (including "(sic)") and Figma node source lines unchanged; description paragraph = section lead |
| `#inconsistencies` (table, 30 rows) | `#r-decisions` (same 30 rows: # · Source · What = "Topic. What Figma has" · Chosen behaviour · Status) |
| (none) | `#r-dead-code`, `#r-extended-index`, `#r-open-decisions` (new, built from build-notes / VERIFICATION / components.md / CLAUDE.md and from the page) |

## 3. Verification (2026-10-15, headless Chrome 155 over CDP, 1440 px viewport)

1. **Computed styles.** `SKSnap` baseline taken on the original, diffed on the migrated page with `?all` (roots before: `.sc-stage, .sc-fit__inner, .sc-icon__img, .sc-icon__masks`; after: `.sk-stage, .sk-frame__inner, .sk-icon__sample`; setInterval frozen in both runs so the countdown chip is identical). **4,222 elements before, 4,222 after, `ok: true`, 0 changed, 0 onlyBefore, 0 onlyAfter**, with the old card order restored in the DOM for the comparison (the kit's role grouping reorders identical elements, which made 6 same-key `span.icon` entries compare in a different order; an order-insensitive comparison of all 4,222 element signatures also shows 0 differing keys). Two real differences were found and fixed before the final run: the old `.sc-icon__img img` size cap and the `.sc-frame__bg` helper rules (both restored as demo support). A second, independent per-element comparison of every computed property (except layout-resolved sizes) over all 145 variants and 14 screens (4,149 elements) also found no difference.
2. **Kit contract.** `SK.problems` = `[]`; console: no errors or warnings (a `data:` favicon removes the old 404); 50 distinct asset URLs referenced in the page all 200, no failed request under `npx serve` either (32/32 `<img>` loaded; the stylesheet-referenced masks load too). All 58 nav items open exactly one non-empty section and set `aria-current`; deep links `#f-colours`, `#c-forms-text-input`, `#c-text-input` (card), `#c-itable`, `#s-trade`, `#s-client-1920`, `#r-extended-index`, legacy `#f-colors`, `#inconsistencies` resolve. `?all` shows 58/58 sections (checked on the clean URL and under `npx serve`, which redirects `.html` and drops `?all`, as documented). Copy HTML: clicked on 3 cards, text equals the card's source and the button shows "Copied ✓"; **all 30 sources are identical to what the old Copy HTML produced** (same formatter, run against the old page). Live behaviours checked: dropdown, toggle, tabs, segmented, time stepper, Bid/Ask validation on and off, countdown.
3. **Counts (old to new).**

| Item | Old | New |
|---|---|---|
| Nav entries | 52 | 58 (1 overview + 8 foundations + 31 component sections + 14 screens + 4 reference) |
| Foundations sections | 7 | 8 (Motion added, Control heights merged into Sizes & layout) |
| Component cards / Copy HTML buttons | 30 / 30 | 30 / 30 |
| Variants (figure + stage) | 145 | 145 (`.sk-variant`) |
| In-card frames (scaled) | 31 | 31 (`.sk-frame`, measured heights) |
| Screens | 14 | 14, at 1440x1024 (13) and 1920x1080 (1) |
| Extended badges | 50 (49 + 1 in the lead) | 50 (49 counted by the kit + 1 in the legend) |
| Alt badges | 5 (4 + 1 in the lead) | 5 (4 + 1 in the legend), wording "Alt" |
| "Figma-defined" badges | 29 | 0 (see deviations) |
| Swatches / icons / type rows / radius + shadow tiles / spacing + height rows | 34 / 31 / 43 / 14 + 5 / 13 + 13 | 34 / 31 / 43 / 14 + 5 / 13 + 13 |
| Decision rows | 30 | 30 (+ 8 migration notes in a separate table) |
| Assets | 31 `<img>` + 20 masks | 51 SVG files; 32 `<img>` (31 gallery + the logo, which was a CSS mask before) |
| Text parity | - | all words of the 30 cards, 14 screens, Foundations and decisions are present in the new page (case / punctuation-insensitive; only renamed headings differ) |

4. **Screenshots** (1280 px wide, viewed): Overview, Colours (top and scrolled), Typography, Icons & logos, Shadows & effects, Sizes & layout, Text input, Dropdown + open menu, Instrument table, Trade Auction screen, Client Auctions 1920 screen, Known inconsistencies, Extended index (files in the scratchpad `eqmig/shots/`). One layout defect was found and fixed: long unbreakable role texts overflowed swatch cards.
5. **Size and height.** New file 503,835 bytes (was 380,013). Tallest section: **Colours 5,391 px** (then Known inconsistencies 3,038, Admin modals 2,754, App shell 2,753); limit ~15,000 px. Nothing needed splitting.

## 4. Deviations and judgement calls

1. **Demo-support CSS (flagged in `#r-decisions`, M1-M2).** `.sk-demo` carries the old stage's flex context (`display:flex; flex-wrap:wrap; align-items:flex-start; gap:16px`); without it children that were flex items (blockified `display`, no inline baseline gap) compute differently. `.eq-demo--inner / --page / --menu`, `.sk-variant--wide`, `.eq-frame--page` reproduce the old stage surfaces. The old demo-helper classes (`.sc-stack .sc-row .sc-cell .sc-scroll .sc-frame(__bg, --side) .sc-static-empty`) and the foundations specimen classes (`.sc-dot .sc-onfill .sc-blurdemo`) are kept under their old names because they appear in demo markup. Also `.sk-icon__sample img` size cap and an `overflow-wrap` tweak for swatch / sample / icon captions.
2. **Default variants no longer sit in their own bordered box.** Each old variant had its own panel box (padding 24, ring, radius 4); the kit has one stage per card on the panel colour (`--sk-stage-bg`). Only variants that used the inner / page surface keep a boxed tile. Layout inside every demo is unchanged (see verification 1).
3. **Copy HTML uses `<template data-sk-source>` on every card** (the kit copies `.sk-demo` markup, which for frame variants lives in a lazy `<template>`). The text is generated with the old formatter, so output equals the old button's. Cost: 90,846 bytes of duplicated markup in inert templates.
4. **Dropped chrome:** the empty `Show HTML` details (30), the `Figma-defined` badge (29, the Source line states the origin), the old page parts / hero, scroll spy, smooth scroll, the second top-bar line (file id, page, Section2 node: moved to the Overview and to the source line's tooltip). `ALT` is now the kit's `Alt`.
5. **Open menu under Overlays** is a cross-reference section (callout + link) rather than a second copy of the demos, so card, variant and Extended-badge counts stay equal. Say if a real duplicate card is preferred.
6. **Role grouping judgement calls:** Order cell states and Notification cards in Feedback; Order books and Audit Log in Platform patterns (domain composites); Session card, Instrument table, Statics lists in Data display; New Auction modal and Admin modals in Overlays; App shell and Tabs in Navigation; chips and row status icons in Indicators.
7. **Motion** is "Not defined in the source." with the supporting facts; Sizes & layout also lists the six literal z-index values (components.css L419, L601, L631, L686, L775, L893; line numbers as of this date).
8. **Screen captions:** the old size text ("· 1440x1024") is replaced by the kit's size / scale label; the screen description is the section lead. Figure ids are `<old id>-frame` because the section took the old id.
9. **Status column** is new information: 4 rows are marked Open (6 blur, 9 typos, 12 header controls, 25 thumb positions), 26 Decided; row 24 reads "Decided (owner, 2026-10-14)" per CLAUDE.md while its original text (which still says "flag for the owner") is kept verbatim. The mismatch is listed in `#r-open-decisions`.
10. **Dark only:** no theme toggle (the platform defines no light theme). The kit chrome uses weights 600 / 700; the existing Google Fonts link loads Lato 400 only, so chrome headings use the browser's synthesised bold (demos are unaffected, they use only Lato 400).
11. **Extended index reasons** are generic by state (hover = `--color-ext-hover`, focus = `--color-ext-focus`, ...) taken from build-notes; per-card detail stays in each card's note.
12. **Not verified here:** Safari / Firefox, keyboard / screen-reader behaviour beyond the kit's contract, a pixel diff against Figma (out of scope for a structure migration; the content and computed styles of every demo equal the previous page).

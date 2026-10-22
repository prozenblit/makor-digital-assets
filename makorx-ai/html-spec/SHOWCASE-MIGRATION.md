# MakorX.AI (HR app) design-system showcase: migration to the shared showcase kit

Date: 2026-10-15. File changed: `makorx-ai/design-system/showcase.html` only (766,552 B -> 776,900 B). `tokens.css`, `components.css`, `tokens.json`, `components.md`, `CLAUDE.md`, `assets/`, the kit, the other platforms (incl. `makorx-ai/auth-design-system/`) and the hub are untouched.

Generator (kept, reproducible): `makorx-ai/html-spec/showcase-migration/` = `build.js` (+ `lib.js` balanced-tag scanner, `support.css`, `platform.js`) and `showcase.before-migration.html` (the old page). Run: `cd makorx-ai/html-spec/showcase-migration && node build.js` (writes `../../design-system/showcase.html`; byte-identical to the shipped file). The generator never re-serialises a DOM: every demo cell, frame and snippet is copied as text between balanced tags.

## 1. What changed

* Chrome = `.sk-app` (kit): top bar, generated left nav (Foundations / Components / Screens / Reference), hash routing, `?all`, search (`/`), prev/next, Copy HTML, lazy scale-to-fit frames. Removed: all `sc-*` chrome rules, the hand-written nav and scroll-spy, the copy / fit / width handlers, `html{scroll-behavior:smooth}`, the `SNIP` dictionary (its texts now live in `<template data-sk-source>` per card).
* Top bar: logo = `assets/logo-mark.svg` (the HR app's logo asset); title "MakorX.AI design system"; source "Source: MakorX.AI HR app (makor-hr/employees.html) · harvested 2026-10-14"; search; theme toggle (`data-sk-theme-toggle`).
* Head: Geist + Lexend Exa `<link>` kept, `tokens.css` + `components.css` kept, then `../../shared/showcase-kit/showcase-kit.css`; `showcase-kit.js` at the end of `<body>`. `--sk-*` are mapped on `.sk-app` from the platform tokens (page `--color-canvas`, cards/nav/top bar `--color-surface`, tint `--color-fill-subtle`, hairlines `--color-border-divider`, text `--color-text-primary` / `-secondary`, accent `--color-brand` with `--color-text-on-brand`, badges from `--color-warning-text` / `-success-text` / `-info-text`, font `--font-primary`, stage `--color-surface` = what the old stage sat on). Because the mapping is on `.sk-app`, `body.dark` flips the whole chrome.
* Theme: the kit toggle calls `SK.onThemeToggle` -> `document.body.classList.toggle('dark')` + `localStorage['makor-dm']` (the app's own key); a stored `makor-dm = 1` is still honoured on first load. `toggleDarkMode()` (used by the app's profile-menu row inside the frames) now calls `SK.setTheme`, so the top-bar button follows. Frames and demos render in the main document, so they follow `body.dark`; the old behaviour "a theme change flips every `.dm-switch`" is kept (also for frames rendered later). The side-by-side Light | Dark blocks keep their `.theme-light` / `.theme-dark` containers.
* Demos: platform markup, classes, inline styles, forced states, text and order are unchanged. The old per-variant wrapper `.sc-cell` is the kit's `.sk-demo` hook; the 102 cells that carried `style` / `.sc-ovf` / `.sc-bgc` / `.sc-rel` keep that wrapper inside `.sk-demo`.
* Platform script kept (selects, tabs, sorting, modals, toast, success popup, nav dropdowns, datepicker, phone picker, save bar, tile selection, pool / TT rows, WFH calendar, timesheet, tooltip) and moved after the kit. Edits: the two `.sc-frame` selectors (`scope()`, `openModal`) now use `.sk-frame__inner`; showcase-only code removed; `a[href="#"]` clicks inside stages are cancelled (they would trigger the kit's hash routing).

## 2. Old -> new mapping

**Overview** (`overview`): old intro (h2, lead with the Extended badge, 6 stat chips) -> kit chips (sections 37, components 60, screens 16 [override], extended 18, assets 49) + the 6 old chips kept as "Page statistics (pre-migration page)" + badge legend + the old Screens lead + a callout explaining the chip counts.

**Foundations** (old ids kept as empty anchors `<a id>`): Colours `f-colors` -> `f-colours`; Typography `f-type` -> `f-typography`; `f-radii`, `f-spacing`, `f-shadows`, `f-motion`, `f-sizes`, `f-icons` unchanged. Old `h4.sc-h4` blocks -> `h3.sk-h3` (ids such as `f-colors-surface` kept), `sc-table` -> `sk-table`. Converted to kit blocks: radii and border widths 15 -> `sk-samples`, icon gallery 49 -> `sk-icons`, named text roles 32 -> `sk-type` rows (live `.type-*` samples). Kept as platform-token blocks with `sc-*` support classes: colour swatch tables with light and dark swatches (243 rows), the Light | Dark panel pair, font / weight / line-height / letter-spacing cards, spacing bars, shadow rows, motion rows, layout schematic, z-index bars.

**Components** (card ids `d-*` unchanged):

| Old section | Cards | New nav group / item (section id) |
|---|---|---|
| `c-buttons` | 7 | Actions / Buttons (`c-actions-buttons`) |
| `c-inputs` | 6 | Forms & inputs / Inputs & fields (`c-forms-inputs`) |
| `c-select` | 4 | Forms & inputs / Select / combobox (`c-forms-select`) |
| `c-pickers` | 3 | Forms & inputs / Datepicker & phone picker (`c-forms-pickers`): `d-pick-date` (input states), `d-pick-range`, `d-pick-phone` |
| `c-pickers` (calendar popup) | +1 | Overlays / Calendar popup (`c-overlays-calendar`): `d-pick-date-popup` (open day view, open year view, live) |
| `c-checks` | 4 | Selection controls / Checkbox / radio / toggle (`c-selection-controls`) |
| `c-badges` | 6 + 3 map tables | Indicators / Badges & pills (`c-indicators-badges`) |
| `c-avatars` | 2 | Indicators / Avatars (`c-indicators-avatars`) |
| `c-toast` | 2 | Feedback / Toast & popups (`c-feedback-toast`) |
| `c-modals` | 5 | Overlays / Modals & backdrops (`c-overlays-modals`) |
| `c-dropdowns` | 3 | Overlays / Dropdowns & quick card (`c-overlays-dropdowns`) |
| `c-tabs` | 4 | Navigation / Tabs (`c-navigation-tabs`) |
| `c-extended` | 14 (+ index) | Extended states / EXTENDED states (`c-extended-states`); the 20-row index moved to `r-extended-index` |

Old section ids (`c-buttons`, `c-inputs`, ...) remain as anchors inside the new sections.

**Screens** (one nav item per screen / flow; each screen = a `.sk-card` with Source line, `figure.sk-screen` frame(s), Copy HTML, notes; old `#s-screens` anchor kept in the first item):

| Nav item (section id) | Cards (old demo ids) | Frames |
|---|---|---|
| Top nav + menus (`s-nav`) | `d-scr-nav` | 1920x640 |
| Employee list (`s-employee-list`) | `d-scr-employees`, `d-scr-group` | 1920 / 2200 / 2560 x 1080; 1920 / 2560 x 520 |
| Employee detail (`s-employee-detail`) | `d-scr-detail`, `d-scr-detail-records` | 1920 / 2200 / 2560 x 1080; 1920 / 2560 x 760 |
| New Employee modal (`s-new-employee`) | `d-scr-newemp` | 1920x1080 |
| HR Requests (`s-hr-requests`) | `d-scr-requests` | 1920x1080 |
| Time Tracking (`s-time-tracking`) | `d-scr-tt` | 1920x1080 |
| Pool (`s-pool`) | `d-scr-pool`, `d-scr-pool-empty` | 1920x1080, 1920x560 |
| My Profile: My Info / People directory + quick card / WFH / Timesheets (`s-my-info`, `s-people-directory`, `s-wfh`, `s-timesheet`) | `d-scr-myinfo`, `d-scr-people`, `d-scr-wfh`, `d-scr-timesheet` | 1920x1080 each |
| My Profile: Time Off (`s-time-off`) | `d-scr-timeoff`, `d-scr-timeoff-req` | 1920x1080 each |

**Reference:** `bugs` -> `r-decisions` (42 rows; columns reordered to # · Source (file + line) · What · Chosen behaviour · Status; status chips mapped fixed / decided / open; the 3 GUESSED dark value rows keep their highlight); `dead` -> `r-dead-code` (13 rows); the 20-row EXTENDED index -> `r-extended-index` (links `view` kept); `open` -> `r-open-decisions` (9 items). The old anchors `#bugs`, `#dead`, `#open`, `#x-index` still resolve.

## 3. Counts

| | Old | New | Note |
|---|---|---|---|
| Sections (`.sc-sec` / `.sk-section`) | 25 (incl. intro) | 38 (incl. overview) | 8 + 13 + 12 + 4 + overview; chip "37 sections" (old chip said 21 = 8 + 12 + 1) |
| Demo cards | 75 (59 component + 16 screen) | 76 | the Datepicker demo is two cards (see 4.1); component cards 60 + screen cards 16 |
| Variants / states | 271 `sc-v` + 16 screens = 287 | 271 `.sk-variant` + 16 screens | equal |
| Screens / frames | 16 `.sc-fit` | 16 screens, 22 `.sk-frame` | 6 extra width frames (4.2) |
| Source lines (`Source: employees.html Lnnn` / EXTENDED) | 75 | 76 | one per card; both Datepicker cards keep the line |
| Copy HTML buttons | 75 | 76 | |
| Extended badges | 38 = 14 demo + 20 index + 4 in text | 39 = 14 + 20 + 4 + 1 (legend); chip counts 18 | the kit chip excludes legend and index |
| Colour roles | 243 rows | 243 rows | |
| Bug rows / flagged | 42 / 3 | 42 / 3 | |
| EXTENDED index rows | 20 | 20 | one extra link (4.8) |
| Dead-code rows / open decisions | 13 / 9 | 13 / 9 | |
| Assets | 49 SVG in `assets/` (18 `<img>` in the old DOM) | 49 (chip), `assets/` untouched | frames are lazy, `<img>` appear when rendered |
| Size | 766,552 B | 776,900 B | |

## 4. Decisions and deviations

1. **Datepicker split.** The owner's mapping asks for the calendar popup under Overlays. The old card had 5 variants; the first 2 (closed / hover, focus) stay in `d-pick-date` (Forms), the last 3 (open day view, open year view, live) form `d-pick-date-popup` (Overlays / Calendar popup). Copy HTML texts are the matching halves of the old snippet. Costs one card (59 -> 60 component cards). The input card's note is new text (it points to the popup card); the old note stays on the popup card.
2. **Wide frames.** The kit has no frame-width option. The 2200 / 2560 variants are separate `figure.sk-screen` frames inside the same card, each captioned "viewport width N". To avoid triplicating ~100 KB of markup per screen, only the 1920 frame carries the `<template>`; the others carry an empty `<template>` plus `data-hr-clone` and are filled from it on the kit's `sk:frame` event (`platform.js`). Result: Employee list 3 + 2 frames, Employee detail 3 + 2 frames. The Overview chip "screens" is overridden to 16 (`data-sk-screens`) because the kit would count 22 frames.
3. **Screens inside cards.** STRUCTURE §8 has a bare `figure.sk-screen`; the kit's Copy HTML needs a `.sk-card` / `.sk-alt` ancestor, and the old page had a Copy button per screen. Each screen is therefore a `.sk-card` (title, Source line, stage with the figure(s), Copy HTML, notes) in an `s-*` section. The frame's own `<template>` carries `data-sk-source`, so Copy HTML returns the frame markup exactly as the old button did (`.sc-frame` innerHTML). The old per-screen state text ("Alex Smith selected (Overview)") is the figure caption; the kit adds the size / scale label and the Fit / 100% toggle (old "Actual size"). The old per-screen "Light / Dark" button is gone (global toggle).
4. **Copy HTML = template text.** Each card carries `<template data-sk-source>` with the old `SNIP` text (screens: the frame template). The kit returns `template.innerHTML`, i.e. DOM-serialised markup: 62 of 76 cards copy exactly the old text; 14 differ only by serialising boolean attributes as `disabled=""` / `checked=""` / `readonly=""` (DOM-equal, checked). The old `.sc-cell` wrapper styles were never part of the snippets and still are not.
5. **Stage overflow.** `.sk-stage` scrolls horizontally (hence vertically); 11 cards with live popups (custom select, datepicker, phone picker, `data-tip`, combobox) use `.sk-stage--visible` so panels are not clipped.
6. **Support CSS.** The page keeps a `/* demo support */` block (rules moved from the old chrome: `.sc-cell`, `.sc-ovf`, `.sc-rel`, `.sc-bgc`, colour swatch / pair blocks, cards, bars, layout schematic, z-index bars, `.sc-count`, `.sc-cm`, `.sc-ext-why`) and the frame adaptations `100vh -> 1080px`, retargeted from `.sc-frame` to `.sk-frame__inner` (same specificity). `.sk-frame__inner` gets the old frame's `background: var(--color-page-bg)` / `color`. `html[data-sk-theme="dark"]{color-scheme:normal}` stops the kit's built-in dark set from re-skinning UA-styled controls inside demos (the app sets no `color-scheme`). Flagged in `r-decisions` (callout).
7. **Kit gaps worked around in the page, kit untouched:** (a) `.sk-screen` has no `scroll-margin-top`, so deep links to a frame hid under the top bar (added); (b) `.sk-section__lead code` is not styled (leads are `div.sk-section__lead.sk-prose`); (c) at "100%" the kit clears the frame's transform, which would release `position:fixed` overlays of a frame to the viewport (`.sk-frame.is-100 .sk-frame__inner{transform:translateZ(0)}`); (d) no width option / no copy scope for bare screens (2, 3).
8. **Extended index.** Moved from `c-extended-states` to `r-extended-index` (20 rows kept); row 13 gets a second link to the avatar-size card `d-av-util` (no old row linked it). The one sentence in the Extended lead that said "at the end of this section" now links to the Reference page.
9. **Colours tables.** Column widths Token / Light / Dark narrowed (250 / 230 / 250 -> 200 / 176 / 220 px) and `.sc-cm` line-height 1.35 so the Colours page is 13,807 px tall at 1280 px wide (15,457 px with the old widths).
10. **Chrome text.** `Source:` bold prefix is plain text; `sc-ext` -> `sk-badge--extended`; `sc-tag` -> `sk-status`; section leads and notes keep their inline markup.
11. **Known, pre-existing:** icons are CSS masks (`mask-image: url(assets/*.svg)`); over `file://` Chrome blocks them (CORS), use `npx serve` (`.../showcase?all`).

## 5. Verification

Environment: Chrome 155 headless over CDP, `npx serve . --listen 3456`, viewport 1280 x 900 (snapshots 1600 x 1000). Scripts (kept): `showcase-migration/verify/` (`baseline.mjs` = old page, `verify-snap.mjs`, `verify-behaviour.mjs`, `smoke.mjs`, `found-snap.mjs`, `shots2.mjs`; they expect the old page temporarily served as `design-system/showcase.old.html`, deleted afterwards).

1. **SKSnap, both themes** (`SKSnap.take`, kit tool; transitions finished and infinite animations reset to t=0 before each take; roots old `.sc-stage, .sc-fit__inner`, new `.sk-stage:not(:has(.sk-frame)), .sk-frame[data-sk-w="1920"] .sk-frame__inner`):

   | Set | Elements before / after | onlyBefore | onlyAfter | changed (multiset) |
   |---|---|---|---|---|
   | light | 7,507 / 7,236 | 0 | 0 | 0 |
   | dark | 7,507 / 7,236 | 0 | 0 | 0 |
   | 2200 frames light / dark (old: `data-w` switched to 2200 vs new 2200 frames) | 852 / 852 | 0 | 0 | 0 / 0 |
   | 2560 frames light / dark | 1,452 / 1,452 | 0 | 0 | 0 / 0 |

   Foundation blocks that stayed platform-token blocks (`.sc-pair`, `.sc-grid3`, `.sc-sp-list`, `.sc-fxrow`, `.sc-layout`, `.sc-z`, `.sc-row`, icon samples, `.sc-kv`; 356 elements, both themes): 0 style differences except 1 `div.dir-row` whose resolved `grid-template-columns` follows its box width (290 vs 285 px).

   Explained differences: the 271 `<figcaption>` elements are now `.sk-variant__cap` (chrome class, ignored by the tool): 7,507 - 271 = 7,236; 7 elements (generic `div`, two avatars) differ only by position because sections moved (the per-key multiset of styles is identical). Old `dm-switch.on` demo state is reproduced exactly in dark.
2. **Kit and behaviour:** `SK.problems` = `[]`; console errors 0 (load, all routes, `?all` with every frame rendered); 61 requests, no 4xx / 5xx / failed, every `assets/*.svg` 200, all 23 `<img>` loaded after rendering all frames; all 38 nav items open exactly one non-empty section (arrow / Home / End, search "datepicker" -> 2 hits); 15 deep links (`#f-colours`, `#c-actions-buttons`, card ids `#d-btn-filled`, `#d-scr-employees-2560`, screen `#s-pool`, old ids `#f-colors`, `#c-buttons`, `#bugs`, `#s-screens`, `#x-index`, ...) open the right section and scroll to the target; `?all` shows 38 / 38 sections (also from `file://`); Copy HTML clicked on all 76 cards (62 exact, 14 DOM-equal, 4.4); theme toggle flips top bar, page, cards and the frames in both directions, persists after reload, and the app's profile-menu row still toggles it; frames: scaled box height = h x scale for every frame, far frames render only when scrolled near, 100% mode keeps fixed overlays inside the frame; smoke checks: custom select, live datepicker, detail tabs, toast, modal open / close, app-launcher menu in a frame.
3. **Counts:** section 3.
4. **Screenshots** (1280 px wide, headless Chrome, `showcase-migration/screenshots/`): Overview, Colours light and dark, Radii, Buttons card, Select card (dark), Employee list screen light and dark, Time Tracking dark, Decisions, Extended index.
5. **Size and height:** 776,900 B (old 766,552 B). Tallest section: Colours, 13,807 px at 1280 px wide; next Modals 6,574 px, Extended states 5,702 px, Typography 4,733 px, Decisions 4,210 px.

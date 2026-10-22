# OG Risk Arb showcase: migration to the shared showcase kit

Date: 2026-10-15. File changed: `og-risk-arb/design-system/showcase.html` only (`tokens.css`, `components.css`, `assets/`, `components.md`, `CLAUDE.md`, the kit, other platforms and hub files untouched). Structure follows `shared/showcase-kit/STRUCTURE.md`; procedure `MIGRATION.md`.

Reproducible: `figma-spec/showcase-migration/build-showcase.js` (Node + `jsdom`) converts the pre-migration page `figma-spec/showcase-migration/showcase.before-migration.html` (671,199 bytes, the uncommitted version that git does not hold) into `showcase.html`:
`node build-showcase.js showcase.before-migration.html <out>/showcase.html`. Demos are moved, never edited; only chrome classes (`sc-*`) are renamed to kit classes (`sk-*`). Screenshots: `figma-spec/showcase-migration/screenshots/`.

## 1. What changed

* Head: platform `tokens.css` / `components.css` and the Google Fonts link (Geist 400-700, Inter 400/500) kept; kit CSS linked after them (`../../shared/showcase-kit/showcase-kit.css`); `showcase-kit.js` at the end of `<body>`. All old `.sc-*` chrome rules deleted. Inline `<style>` now holds: the `--sk-*` mapping on `.sk-app` (light theme only, from OG tokens), one compat rule, and the demo-support rules (section 5).
* Chrome: `div.sk-app` > top bar (Oscar Gruss wordmark `assets/og-wordmark.svg`, "OG Risk Arb design system", "Source: Figma OG Risk Arb · Section 1 · harvested 2026-10-14", search) > kit-built nav (Overview, Foundations 8, Components by role, Screens 16, Reference 4). No theme toggle (platform is light only, `CLAUDE.md` section 1).
* Overview: lead, kit count chips (49 sections, 65 components, 16 screens, 85 extended, 125 assets), four-badge legend, notes (screens text, fonts).
* Cards: kit anatomy (title + badges, `Source: <old Figma line>`, stage with variants and captions, Copy HTML, notes). Card ids unchanged (65). Every old section id (112 ids in total) still resolves: old section ids became empty anchors or sub-heading ids inside the new sections; screen figure ids became the screen section ids.
* Screens: 16 sections `s-*`, each `figure.sk-screen` with `.sk-frame` (`data-sk-w/h` = Figma frame size, content in `<template>`, lazy, Fit / 100% toggle). The 26 mini-frames inside cards (old `.sc-fit-s`) and the grid map (old `.sc-fit`) are `.sk-frame` too.
* Platform demo script kept (tabs, chips, segmented, nav chevrons, calendar tags, password reveal, rich-text toggles, accordion, closable tabs) as `wire(root)`; it also runs on every lazily rendered frame (`sk:frame`). Old fit script, copy handler, scroll-spy and `scroll-behavior: smooth` removed.

## 2. Mapping old to new

### Foundations (9 old sections to the 8 fixed)

| Old | New |
|---|---|
| `#f-colour` Colour | `f-colours` (h3 blocks: Named palette, Raw hues, Alpha tints, Semantic aliases + h4 text / surface / border / brand / status / icon) |
| `#f-pills` Pill & priority colour map | `f-colours`, h3 `#f-pills` |
| `#f-type` Type scale, `#f-roles` | `f-typography` (h3 `#f-roles`) |
| `#f-radius` | `f-radii` |
| `#f-space` | `f-spacing` |
| `#f-shadow` Shadows, blur & strokes | `f-shadows` (effect styles, layers table, blur, h3 `#f-strokes` stroke weights) |
| `#f-strokes` control heights / widths | `f-sizes` (Control heights, Control widths) |
| `#f-grid` Grid & shell geometry | `f-sizes`, h3 `#f-grid` (frame) |
| `#f-icons` Icon gallery, `#f-logos` | `f-icons` (h3 `#f-logos`) |
| (none) | `f-motion`: "Not defined in the source." |

### Components (18 old sections to 21 sections in 9 role groups)

| Old section | Old cards | New section (group) |
|---|---|---|
| `c-buttons` Buttons | b-primary, b-outline, b-outline-green, b-yellow, b-orange, b-screen, b-focus | `c-actions-buttons` (Actions) |
| `c-pills` (links) | p-links | `c-actions-links` (Actions) |
| `c-fields` Form fields | f-input, f-select, f-calendar, f-search, f-password | `c-forms-fields` (Forms & inputs) |
| `c-rich` Rich text | r-toolbar, r-editor | `c-forms-rich-text` (Forms & inputs) |
| `c-selection` | s-checkbox, s-radio, s-toggle, s-scroll | `c-selection-controls` (Selection controls) |
| `c-day` DAY cell | d-day, d-day-ext | `c-selection-day-cell` (Selection controls) |
| `c-pills` (segmented) | p-seg | `c-selection-segmented` (Selection controls) |
| `c-pills` (pills, chips) | p-pills, p-text, p-chips | `c-indicators-pills-chips` (Indicators) |
| `c-topbar` (search, menu) | tb-search, tb-account | `c-overlays-search-menus` (Overlays) |
| `c-nav` Navigation | n-nav, n-handle, n-nav-ext | `c-navigation-nav` (Navigation) |
| `c-tabs` Tabs | t-tabs, t-alt, t-ext | `c-navigation-tabs` (Navigation) |
| `c-topbar` (top bar) | tb-topbar | `c-navigation-top-bar` (Navigation) |
| `c-tables` Tables | tb-deals ... tb-admin (6) | `c-data-tables` (Data display) |
| `c-dashboard` | db-deals, db-events, db-updates, db-ext | `c-patterns-dashboard-panels` (Platform patterns) |
| `c-lists` All Deals list | l-controls, l-filter | `c-patterns-all-deals-list` (Platform patterns) |
| `c-deal` Deal page | dp-header, dp-terms, dp-side, dp-content | `c-patterns-deal-page` (Platform patterns) |
| `c-forms` Forms (New Deal) | fm-grid ... fm-actions (5) | `c-patterns-new-deal-form` (Platform patterns) |
| `c-events` | ev-toolbar, ev-month, ev-week, ev-list | `c-patterns-events-calendar` (Platform patterns) |
| `c-login` | lg-card, lg-ext | `c-patterns-login-auth` (Platform patterns) |
| `c-admin` | ad-settings, ad-cards, ad-sectors | `c-patterns-admin` (Platform patterns) |
| `c-extended` Extended generics | x-generic | `c-extended-generics` (Extended states) |

Feedback group: omitted (empty). The tooltip / toast / skeleton / empty state card stays in Extended states as instructed.

### Screens and reference

| Old | New |
|---|---|
| `#screens` (16 figures `s-dashboard` ... `s-navs`) | 16 sections `s-dashboard`, `s-search`, `s-alldeals`, `s-alldeals-collapsed`, `s-drafts`, `s-deal`, `s-newdeal`, `s-newdeal-empty`, `s-month`, `s-week`, `s-day`, `s-login`, `s-forgot`, `s-otp`, `s-admin`, `s-navs`; `#screens` is an anchor in `s-dashboard` |
| `#inconsistencies` (29 rows) | `r-decisions` (29 rows `# · Source (class / token) · What · Chosen behaviour · Status`, all "Decided") + a second table of 8 migration notes (M1-M8) |
| (none) | `r-dead-code` (generated from `build-notes.md`, `VERIFICATION.md`, `CLAUDE.md`: Laura shell, "final fonts 2px up", unused text styles, `.deals-panel__scroll`, unloaded 9.2 MB login background, screens not re-assembled, week time grid, corner smoothing, deleted test pages; items invented by the previous design system) |
| (none) | `r-extended-index` (generated from the page: 85 Extended rows linking to their cards, then 9 Alt and 5 Outside rows) |
| (none) | `r-open-decisions` (10 questions from `build-notes.md` / `VERIFICATION.md` / this migration) |
| hero | `overview` |

## 3. Verification (Chrome headless over CDP, `npx serve`, 2026-10-15)

| Check | Result |
|---|---|
| `SK.problems` (page opened as `…/showcase?all`) | `[]` |
| Console | 0 errors, 0 warnings (old page: 1 error, favicon 404; the new head has `<link rel="icon" href="data:,">`) |
| Network | 0 failed, 0 status >= 400; asset request set identical to the old page (124 unique asset URLs, all 200); Geist / Inter load from Google Fonts |
| Nav | 50 items (Overview + 49); every item opens exactly one active section, `aria-current` correct, text length > 20 |
| Deep links | `#b-primary` (card), `#tb-search`, `#x-generic`, `#f-pills`, `#f-strokes` (sub-heading), old ids `#f-colour`, `#c-pills`, `#screens`, `#inconsistencies`, `#s-navs`, `#c-actions-buttons`, `#f-icons` all open the right section; unknown hash opens Overview |
| `?all` | `SK.all` true, all sections visible, frames render lazily (17 of 43 unrendered at load, 0 after print render) |
| Keyboard / search | ArrowDown / End / Home move nav focus; search "tabs" shows "Tabs" and expands its closed group (needs the compat rule, section 5) |
| Copy HTML | 65 / 65 cards produce exactly the text the old button produced (old algorithm, with the scale wrappers of framed cards removed); button shows `Copied ✓` (clipboard stubbed; the kit's textarea fallback is untouched) |
| Demo behaviour | tab selection works in cards and inside a lazily rendered screen frame; `href="#"` links do not change the route |
| Frames | 43 frames: scaled box height = h x scale for all (tolerance 1.5 px); Fit / 100% toggle works |
| Page weight | 863,101 bytes (old 671,199), about 85 KB gzipped |
| Tallest section | Icons & logos 9,063 px; next Colours 7,729 px; Extended index 5,078 px (limit 15,000). Old page was one 63,227 px page |

### Counts, old vs new

| | Old | New | Note |
|---|---|---|---|
| Sections (excl. overview / hero) | 29 | 49 | 9 old foundations to 8; 18 old component sections to 21 (3 splits); 1 screens section to 16; 1 decisions section to 4 reference; overview added |
| Component cards | 65 | 65 | ids unchanged |
| Variants (`figure.sc-v` / `.sk-variant`) | 245 | 245 | |
| Screens | 16 | 16 | same Figma sizes (1920x1080, 1920x2638, 1920x1544, 1440x1024, 1000x1080) |
| Variants + screens | 261 | 261 | stated in the overview lead |
| Extended badges (cards) | 85 (86 with the hero sentence) | 85 | kit chip counts outside the legend and the index |
| Alt / Outside badges | 9 / 5 (+1 / +1 in the hero sentence) | 9 / 5 | legend entries replace the hero badges |
| Copy HTML buttons, `Source:` lines | 65, 65 | 65, 65 | plus 16 screen Source lines |
| Colour swatches | 91 | 91 | |
| Inconsistency rows | 29 | 29 | plus 8 migration notes in a separate table |
| Icon gallery | 74 cards (5 cells each) + 8 logos | 301 `sk-icon` cards: 293 samples (67 originals, 56 x 4 colour variants, 2 rasters) + 8 logos | kit card = one rendered sample with its file name |
| Asset files / unique asset URLs requested / `document.images` | 125 / 124 / 213 | 125 / 124 / 213 | identical URL set |
| Frames (`.sc-fit` + `.sc-fit-s`) | 17 + 26 | 43 | |

### Style snapshot (SKSnap, every computed property of every element inside the demos)

* Demos only (`.sc-stage, .sc-fit__in, .sc-fit-s__in` vs `.sk-stage, .sk-frame__inner`; lazily rendered frames rendered through the `beforeprint` hook; the 245 old un-classed `figcaption` captions marked as chrome, as the tool does for `sc-*` / `sk-*` classes): `SKSnap.diff('before')` returns **ok: true**, 8,552 elements before and after, 0 changed, 0 only-before, 0 only-after.
* Demos plus foundation samples (adds specimens, pill map cells, icon samples, logos, roles table): 9,205 before, 8,914 after; 0 only-after; 5 only-before (the old `<i>` colour labels of the icon gallery, replaced by kit captions); **61 changed, all explained**: 22 pills / priorities in the pill map and 39 type or link specimens sit in kit chrome (`.sk-table`, `.sk-type__sample`) instead of the old chrome table; the only differing properties are inherited from that container and have no visual effect (`text-align` start vs left, `overflow-wrap` normal vs anywhere, `border-collapse` / `border-spacing` of the old table). None of the 61 is inside a `.sk-stage`.

## 4. Deviations

1. Section count: 29 to 49 (kit rules: one section per component family and per screen; Components regrouped by role). Three old sections were split by role: Pills, chips, toggles & links (3 sections), Top bar, search & menus (2). Card ids unchanged.
2. Badge wording kept as in the Figma-derived page: card badges read "Alternate" (kit: Alt) and "Outside Section 1" (kit: Outside canonical), with their tooltips; the legend states the equivalence. Listed as open decision 9.
3. Icon gallery restructured to the kit's one-sample-per-card format (file name + colour variant), 293 samples instead of 74 five-cell cards. The intro text (verbatim) still says "the four colour cells".
4. Copy HTML on the 15 cards that contain scale frames uses `<template data-sk-source>` with the component markup only; the old button copied the scale wrappers too (they were chrome).
5. Mini-frames inside cards keep their old fixed scale (explicit frame width, `data-sk-toggle="off"`) and render immediately (no template); screens and the grid map render lazily.
6. Decisions table: the harvest rows have no file/line, so the Source column shows the class / token cell and the header reads "Source (class / token)"; Status "Decided" for all 29 (the page intro states they are owner decisions).
7. Swatches that are semantic aliases have no Figma node id; their source line reads "Source: tokens.css (alias)".
8. `--sk-mono-font` is mapped to Geist (platform rule: no monospace); `--sk-shadow: none` (flat panels); muted and badge colours are mixed from tokens with black / primary text to keep text contrast (the raw Grey 1 / orange / blue fail AA at chrome sizes).
9. Old `.sc-sp` spacers (7) became `margin-top: 16px` on the next `.sk-variants`.

## 5. Page-level CSS beyond the token mapping (listed in `r-decisions` M2, M8)

* Compat: `.sk-nav.is-filtering .sk-nav__items[hidden] { display: block !important; }`. `components.css` sets `[hidden] { display: none !important }`, which defeats the kit rule that opens collapsed nav groups while searching. Kit finding: the kit rule should be `!important` itself (or the kit should un-hide groups in JS) so platforms with a global `[hidden]` reset work without a patch.
* Demo support (foundation illustrations, not in `components.css`): `.sc-g*` and `.sc-gridmap` (grid-geometry map, 9 rules), `.sc-blur-demo*` (scrim blur sample, 4 rules).

## 6. Checklist (MIGRATION.md section 7)

Only `showcase.html` changed in `design-system/` (`showcase.old.html` removed); head order and `.sk-app` mapping present; top bar complete; `#overview` with chips and legend; 8 Foundations ids, extras as sub-headings; Components grouped by role in canonical order; 16 screens with `data-sk-w/h` and templates; 4 Reference sections; platform scripts after the kit; `SK.problems` `[]`; console clean; no 404; counts equal; `SKSnap.diff` ok for the demos.

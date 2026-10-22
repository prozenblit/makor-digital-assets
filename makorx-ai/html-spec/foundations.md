# MakorX.AI HR app (`makor-hr/employees.html`) - FOUNDATIONS + SCREEN/CSS INVENTORY

Harvester: foundations + inventory. Source of truth = the built app `makor-hr/employees.html` (5743 lines). Figma ignored by owner decision. Existing `makorx-ai/design-system/*` and `auth-design-system/*` were read only for the DEVIATIONS section, never trusted.

Reference convention: `L123` = line 123 of `employees.html`; "(computed)" = measured with `getComputedStyle` / `getBoundingClientRect` in a real Chrome tab (light and `body.dark`), not read from CSS; "(source)" = read from CSS text.

## 0. How the data was gathered and how to read it

- `<style>` = lines 11-1719 (closing tag L1720). 1515 rules parsed (617 are `body.dark ...` rules). JS render code + HTML body = L1721-5743.
- Crawl: every view and every overlay was opened in light AND dark mode (employee list + 4 detail tabs + inactive employee, dept dropdown open, New Employee modal, Pool + detail + New Pool modal, Time Tracking + detail + fill-all + confirm, Requests, app dropdown, profile dropdown, My Info, WFH, Time Off, Timesheets, People/Directory, quick card, request modal, request-success, fill/calc/ts modals, time-off request page, datepicker, phone picker, toast). 153 distinct light text tuples / 77 distinct (family,size,weight,line-height,letter-spacing,transform,decoration,style) tuples - identical set in dark mode (only colour changes).
- CAVEAT 1 (DPR): the measuring browser ran at devicePixelRatio 1.5. Chrome snaps borders to whole device pixels, so a source `1px` border reports computed `0.666667px`, and sizes that include a border show `x.67` (e.g. a nominal 65px row measures 64.67). Source values below are authoritative; computed numbers are given where they are the only evidence. Nominal widths: border = 1px unless stated.
- CAVEAT 2 (viewport): measurements in the main tab were at 2321 CSS px wide; layout-skeleton numbers at 1024/1280/1440/1920 were taken from same-origin iframes of those widths (section 4.3).
- Transitions were switched off while measuring (to read final states); transition values are from source.
- Dark mode toggled by adding/removing `body.dark` directly (the app's own toggle `toggleDarkMode()` L5720 also writes `localStorage['makor-dm']='1'|'0'`; init at end of file reads it).
- Raw artefacts used for the tables (not shipped): class-by-class computed metrics (Appendix B), full light->dark rule map (Appendix A).

## 1. CASCADE: what is effective, duplicated, dead, leaking

### 1.1 Structure of the stylesheet (source)
| lines | content | notes |
|---|---|---|
| L11-14 | reset (`*{box-sizing:border-box;margin:0;padding:0}`), `html,body{height:100%}`, base `body`, `input,select,textarea,button{font-family:inherit;font-size:inherit}` | |
| L16-28 | `/* NAV */` top nav | real block |
| L29-40 | `/* APP DROPDOWN */` | real block |
| L42-49 | layout (`.page`, `.page-center`, `.split-left/right`, `.tab-body`) | |
| L51-65 | left header + buttons (`btn-outline/primary/cancel/cta`) | |
| L67-92 | toolbar, search, custom select | |
| L94-125 | employee table, avatar, dept badge, status pill | |
| L127-230 | detail empty, header, stat bar, tabs, section band, fields grid, records table, timesheet placeholder | |
| L232-278 | HR Requests view | |
| L280-387 | Time Tracking view + fill-all + confirm overlays | |
| L389-417 | `/* MODAL */` modal system A (`.modal-overlay` + `.modal`, 740px) | |
| L419-483 | Pool view | |
| L485-548 | `MY PROFILE / WORKSPACE (merged)`: duplicate `body` rule, duplicate `.nav-sub`, sidebar, content card, profile tabs, ws-panels | the merge produced the duplicates below |
| L550 | `/* BUTTONS */` header with NO rules under it | empty comment |
| L552-583 | Today panel (`.today-*`, `.event-row`, `.ev-*`, `.announce-*`, `.stat-row`) | panel is hard-hidden, see 1.3 |
| L585-609 | phone field + country-code picker | |
| L611-674 | My Info fields, save bar, datepicker | |
| L676-732 | Directory + employee quick card + `@keyframes dir-flash` | |
| L734-787 | WFH | |
| L789-809 | My Requests table | |
| L811-821 | `/* MODAL */` (second heading) request-type picker / modal-row | contents of the request modal |
| L823 | `/* APP DROPDOWN */` second heading, empty | |
| L825-827 | toast | |
| L829-880 | Timesheet | |
| L882-962 | Time Off + request page | |
| L964-1023 | modal system B (`.modal-backdrop`), success card, ts/calc modals | overrides system A by specificity |
| L1025-1026 | `#myprofile-view` | |
| L1028-1044 | profile dropdown + dm-switch + `.emp-table tr.na-row td` | |
| L1046-1719 | DARK MODE (617 rules) | |

### 1.2 Duplicate selectors (same selector defined twice) - the later one wins; effective result noted
| selector | lines | verdict |
|---|---|---|
| `body` | L13 and L487 | L487 repeats the L13 values AND adds `overflow-y:scroll;--wfh-icon-bg:#c1f0d5;--off-icon-bg:#dbeafe`. Effective = union. Page always shows a vertical scrollbar. |
| `body.dark{--wfh-icon-bg...}` L488 and `body.dark{background:#111214;...}` L1049 | | two different declarations on same selector, both apply: `--wfh-icon-bg:rgba(23,148,132,0.22);--off-icon-bg:rgba(37,99,235,0.18)` + bg/color/scrollbar |
| `.nav-sub` | L23 and L491 | identical declarations. L491 = pure duplicate (dead). |
| `.btn-cancel` / `.btn-cancel:hover` | L61-62 and L1007-1008 | declarations equal in value (height:38px; padding:0 20px; radius 4px; border 1px solid #c4cdd8; bg transparent; 14px/600 #7c8dac; transition background 0.12s; hover bg #f5f5f8). L1007 wins by order; no visible difference. L61 block is therefore redundant. |
| `.sidebar-icon` | L517 and L518 | split declarations (`margin-top:3px` + the rest). Effective = union. |
| `#panel-myinfo .card-header` | L618 and L622 | union: `padding:8px 0 10px; border-bottom:none; display:flex; align-items:center; gap:8px; justify-content:flex-start`. Note L619 `#panel-timeoff .card-header{padding:10px 20px}` and L560 `.card-header{padding:16px 20px;...space-between}` are the base. |

### 1.3 Two modal systems (specificity, not duplication)
- System A, `.modal-overlay` > `.modal` (L390-417): used by `#reqModal`, `#empModal`, `#poolModal`, `#holderModal`, `#memberModal`. Panel 740px wide, max-height 82vh, radius 4px, border 1px #e5e7ec, shadow `0 8px 40px rgba(0,0,0,0.16)`, header 20px 24px, title 16px/700 #1a1a1a, close = 32px square radius 4px, transparent. Overlay `rgba(0,0,0,0.28)`, z-index 900, fade 0.18s, panel `translateY(10px)->0` 0.18s.
- System B, `.modal-backdrop` > `.modal` (L967-985): used by `#fillModal`, `#calcModal`, `#tsModal`. Because `.modal-backdrop .modal` (0,2,0) beats `.modal` (0,1,0), the same `.modal` element becomes: width 560px (max-width 94vw), `display:block`, `max-height:none`, `border:none`, `transform:none;transition:none`, shadow `0 24px 60px rgba(0,0,0,0.2)`, header padding 22px 24px 18px, title 18px/800 colour **#005268**, close button 32px **circle** with 1.5px #e5e7ec border. Scrim `rgba(0,0,0,0.45)`, z-index 800, no fade (display:none -> flex).
- System C, bespoke boxes: `.tt-fillall-box` 420px (L362) and `.tt-confirm-box` 340px (L377) on overlays with `rgba(0,0,0,0.28)`, z-index 1000, fade 0.15s. `.req-success-card` 360px (L971) on blurred scrim (`rgba(20,30,48,0.35)`, `backdrop-filter:blur(6px)`, z 900, fade 0.25s). `.emp-qcard` 520px (L712) scrim `rgba(0,0,0,0.45)` z 300.

### 1.4 Dead / unreachable CSS (verified by grepping the markup + JS for the class token; 0 hits = never emitted)
Never referenced anywhere in HTML or JS (rules are DEAD): `.groupby-label`, `.fc-value.muted`, `.rv-details-primary`, `.rv-details-sub`, `.rv-details-note`, `.rv-duration`, `.rv-dur-unit`, `.rv-date`, `.rv-reviewer` (+ their dark rules), `.tt-badge-none`, `.fields-1`, `.dept-filters`, `.dept-chip` (+`.active`, hover, dark), `.wfh-prefs-footer`, `.wfh-legend-dot.away`, `.wfh-status-pill.away`, `.req-toolbar`, `.req-table-wrap`, `.ts-select` (+focus, dark), `.hist-controls`, `.req-date-row`, `.req-select-to` (+focus), `.req-success-actions`, `.req-success-btn-new`, `.req-success-btn-back` (+hover, dark; the success card has NO action buttons in the DOM), `.req-date-cell` (+dark), `.day-hours.empty` (only the `.zero`/default forms are emitted), `.groupby-wrap` has no label child.
Present in markup/JS but with NO CSS rule at all: `btn-ghost` (L2231 region), `info-field-input`, `info-field-value`, `field`, `modal-textarea` (two `<textarea class="modal-textarea">` in request forms: rendered with browser-default border `#767676`, white bg in dark mode, black text in dark - see gaps), `cust-select__value`, `dir-alpha-group`, `pref-fill` (JS-only hooks).
Reachable only inside `#panel-today` (L2227: `style="display:none!important"`, "Today panel removed" comment L2225) = effectively dead: `.today-greeting`, `.today-grid`, `.event-row`, `.ev-avatar`, `.ev-info/name/sub/badge(.birthday,.anniversary)`, `.announce-*`, `.stat-row/.stat-label/.stat-value(.teal)`, `.card-count`. (`.card`, `.card-header`, `.card-title`, `.card-body` ARE used by My Info / Time Off.) Colours only there: `#fff7ed`, `#ea7a1e`, `#ede9fe`, avatar inline `#e07b3a`, `#6c6fd4`, `#3a7bd5`.
State-only rules (not dead): `.open`, `.show`, `.visible`, `.active`, `.selected`, `.has-value`, `.today`, `.ready`, `.sorted` etc. only exist after a user action.

### 1.5 Overrides and !important
- 50 `!important` in the file (49 in CSS): L95-96 group header (light), dark dept/drawer badges (to beat JS inline `style="background:..;color:.."`), dark `.rv-type-icon`, `.req-icon-sm`, `.req-type-icon-lg`, `.wfh-stat-icon-*`, `.split-right` (beats inline `style="background:#f5f5f8"` on `#poolSplitRight`), disabled dark buttons (`opacity:1!important`), `#panel-myinfo{padding-top:8px!important}`, `tt-section-row td` bg.
- Inline-colour remapping in dark (L1702-1711): attribute-substring selectors `body.dark [style*="color:#7c8dac"]{color:#8a97aa!important}`, `#a8b6cd`->`#8a97aa`, `#b0b8c8`->`#8a97aa`, `#c4cdd9`->`#505a6c`, `#c4cdd8`->`#505a6c`, `background:#fef3ec`->`rgba(251,146,60,0.14)`, `#eef2ff`->`rgba(99,102,241,0.14)`, `#dbeafe`->`rgba(37,99,235,0.15)`. These only match when the style string contains the exact no-space text (`color:#7c8dac`).
- All 617 dark rules are scoped `body.dark ...` (specificity +0,1,1) so order does not matter, with ONE LEAK: L1608 `body.dark .phone-flag,.phone-code-val{color:#e2e8f4}` - the second selector is unscoped, so in LIGHT mode `.phone-code-val` is `#e2e8f4` (near-white on white; computed `rgb(226,232,244)`). Bug.
- Dark rules that do NOT exist (light value leaks through in dark, computed): `.nav-sub` stays `#7c8dac`; `.cc-out` hrs/time `#c8d0da` and date `#b8c0cc`; `.req-star #da4d43`; `.dm-switch` off track `#e5e7ec`; `small` in `.sidebar-text` `#a8b6cd`; `.modal` shadow stays `rgba(0,0,0,0.16)`; `.tt-fillall-overlay`/`.tt-confirm-overlay` scrim stays `rgba(0,0,0,0.28)`; `#timetracking-view`/`#requests-view` keep `0 2px 8px rgba(0,0,0,0.06)`; `.modal-textarea` is unstyled in both modes.
- Dark mode is NOT a media query: no `@media` of any kind exists in the file (grep 0), no `prefers-color-scheme`, no `prefers-reduced-motion`.

## 2. COLOUR PALETTE

Counts: "CSS decls" = number of declarations carrying that colour in the stylesheet (light table counts non-dark rules, dark table counts `body.dark` rules). "computed elements" = number of unique rendered elements across the full crawl that show it as text colour / background / border colour. Roles/selectors are from the source. Both tables are complete (every distinct colour value used in the stylesheet or observed computed).

### 2.1 Foundations in one view (source -> computed verified)
| role | LIGHT | DARK |
|---|---|---|
| page bg | `#fff` (L13) | `#111214` (L1049) |
| nav bar | `#fff`, bottom border `1px solid #e5e7ec` (L17) | `#18181c`, bottom border `rgba(255,255,255,0.12)` (L1055) |
| panels/cards (split-left, tables wrap, detail header/stat bar/tabs, sidebar, content card) | `#fff` | `#202226` |
| elevated (dropdowns, modals, toast, select panel, datepicker, phone drop, outline btn bg) | `#fff` | `#26292e` |
| My Profile page canvas (`#myprofile-view`) | `#f5f5f8` (L1025) | `#111214` (L1083) |
| pool detail pane canvas | `#f5f5f8` inline (L2127) | `#202226` (`.split-right!important`) |
| table header / group header / section band | th `#f5f5f8`; section-band `#fff`; group-header `#f5f5f8` | th `#111214` (emp, records) or `#202226` (rv/tt/req/hist tables); section-band `#111214`; group-header `#111214` |
| row hover / active row | `#f5f5f8` / `#f5f5f8` + `inset 3px 0 0 #005268` on first cell | `rgba(255,255,255,0.03)` / `rgba(255,255,255,0.04)` + `inset 3px 0 0 #0cb8d0` |
| border default | `#e5e7ec` | split: `rgba(255,255,255,0.12)` header/section dividers (46 uses), `0.07` card/panel outlines (37), `0.10` control borders (37), `0.09` row separators (9), `0.08` dropdown/modal outlines, `0.06`/`0.05`/`0.04` fine lines |
| border strong (cancel buttons) | `#c4cdd8` | no border: `.btn-cancel` -> `background:rgba(255,255,255,0.08);border:none` (L1094); other cancels `rgba(255,255,255,0.10)` |
| text primary | `#1a1a1a` (and `#000` on nav, avatars, names) | `#e2e8f4` (and `#c8d4e8` for items/options/nav links) |
| text secondary | `#7c8dac` | `#8a97aa` |
| text tertiary / placeholder / th | `#a8b6cd` | `#505a6c` |
| brand | `#005268` | `#0cb8d0` |
| brand hover | opacity 0.85 on filled buttons; `#003d50` (dir-row name hover, dead success btn); `#004257` (datepicker selected hover) | opacity 0.85 still (no colour); `#0aacc3` (dp-day.selected:hover, success back btn hover (dead)) |
| text on brand button | `#fff` | `#111214` (but hover-filled outline buttons use `#fff`: `.btn-save.ready:hover`, `.btn-req-send:hover`, `.btn-close-calc:hover`, `.dp-day.selected`) |
| focus ring | border `#005268` + `0 0 0 3px rgba(0,82,104,0.12)` (also `0 0 0 3px rgba(0,82,104,0.10)` dir-search; `0 0 0 2px rgba(0,82,104,0.1)` tt-fill-input, tt-fillall-input) | border `#0cb8d0` + `0 0 0 3px rgba(12,184,208,0.12)` (`0.10` dir-search; `2px 0.12` tt inputs) |
| selected / current tint | `#f0f8fa` (app-drop current, phone-code selected, req-type selected, dp-day hover, dir-you, wfh today) and `rgba(0,82,104,0.08)` (req-tab.active) | `rgba(12,184,208,0.10)` / `0.12` / `0.08` |
| overlay scrims | `rgba(0,0,0,0.28)` (modal-overlay, tt overlays), `rgba(0,0,0,0.45)` (modal-backdrop, quick card), `rgba(20,30,48,0.35)`+blur(6px) (success) | `rgba(0,0,0,0.55)` modal-overlay, `0.60` modal-backdrop + quick card, `rgba(0,5,20,0.65)` success, tt overlays stay `0.28` |
| toast | bg `#1a1a1a`, text `#fff` (L826) | bg `#26292e`, text `#e2e8f4`, `1px solid rgba(255,255,255,0.10)` (L1677) |
| scrollbar thumb | `rgba(0,0,0,0.10)` (tab-body, modal-body), `0.08` (rv-list, tt lists, popups), `0.12` (emp-table tbody, pools-list, req/hist scroll); 6px wide, radius 2px | `rgba(255,255,255,0.09)` (global `body.dark *::-webkit-scrollbar-thumb`), hover `rgba(255,255,255,0.28)`, `scrollbar-color rgba(255,255,255,0.08) transparent` on body |

### 2.2 Light palette (every colour)
| colour | CSS decls (source) | computed elements: text / bg / border | role | example selectors (source) |
|---|---|---|---|---|
| `#e5e7ec` | 136 | 2 / 21 / 998 | BORDER default (cards, inputs, tables, nav bottom, dividers); record-badge bg; dm-switch off track; inactive dept pill bg; calc-user-avatar bg; day-hours.empty text; drawer-dot text | .top-nav{border-bottom}; .nav-avatar{border}; .app-drop{border} |
| `#005268` | 103 | 75 / 24 / 7 | BRAND: primary button bg, active tab/link, sort/active text, focus border, selected markers (inset 3px), dp selected, save-bar bg, icons; modal-title in modal-backdrop; page titles | .app-drop-item-current .app-drop-item-na{color}; .app-drop-item-badge{color}; .btn-outline:hover{border-color} |
| `#1a1a1a` | 102 | 1256 / 1 / 0 | TEXT primary (body); toast bg; nav apps-icon stroke | body{color}; .nav-avatar{color}; .app-drop-item-name{color} |
| `#ffffff` | 97 | 22 / 215 / 0 | SURFACE (see #ffffff) | body{background}; .top-nav{background}; .app-drop{background} |
| `#a8b6cd` | 86 | 699 / 0 / 6 | TEXT tertiary (table/col headers, labels, placeholders, muted); hover border of select/input; inactive avatar ring+text; scrollbar none | .app-drop-section{color}; .cust-select__trigger:hover{border-color}; .emp-table th{color} |
| `#7c8dac` | 83 | 345 / 0 / 0 | TEXT secondary (subtitles, nav-sub, secondary button text, modal-label, icons); placeholder in search-input; inactive link | .nav-sub{color}; .btn-cancel{color}; .search-input::placeholder{color} |
| `#f5f5f8` | 58 | 0 / 98 / 42 | SURFACE raised: table header, row hover/active, group header, readonly field, chips bg, sidebar-profile, inline-list-item, nav-avatar bg, wfh day-box; 'denied' pill bg; hover bg of cancel buttons | .nav-avatar{background}; .app-drop-item:hover:not(.app-drop-item-{background}; .btn-cancel:hover{background} |
| `#000000` | 12 | 337 / 0 / 0 | TEXT black: nav wordmark, nav links, avatar initials, .emp-name | .nav-wordmark{color}; .nav-link{color}; .emp-avatar{color} |
| `rgba(0,0,0,0.3)` | 11 | 0 / 0 / 136 | BORDER avatar ring / req-success-card shadow | .emp-avatar{border}; .drawer-avatar{border}; .rv-avatar{border} |
| `#c1f0d5` | 11 | 0 / 55 / 1 | STATUS success bg: Active pill, active-badge, inline-badge.active, approved wfh prefs, wfh-day-box checked, wfh legend dot, --wfh-icon-bg | .status-active{background}; .active-badge{background}; .inline-badge.active{background} |
| `rgba(0,0,0,0.06)` | 11 | 0 / 0 / 0 | SHADOW colour: card (0 2px 8px) and 2nd layer of dropdown shadow | .app-drop{box-shadow}; .page-center{box-shadow}; .cust-select__panel{box-shadow} |
| `rgba(0,82,104,0.12)` | 11 | 0 / 0 / 0 | FOCUS RING: 3px ring (search/modal/field/datepicker/phone inputs) | .search-input:focus{box-shadow}; .modal-input:focus{box-shadow}; .phone-input-wrap:focus-within{box-shadow} |
| `#179484` | 10 | 52 / 0 / 0 | STATUS success text (teal-green): Active pill, wfh badge, hist-table pos, req-status.approved, req-success-icon | .status-active{color}; .active-badge{color}; .inline-badge.active{color} |
| `#da4d43` | 10 | 12 / 0 / 0 | STATUS error text: Inactive pill, req-star, hist-table neg, entry-remove text | .status-inactive{color}; .inactive-badge{color}; .inline-list-item-remove:hover{color} |
| `rgba(0,0,0,0.12)` | 10 | 0 / 0 / 0 | SHADOW colour: dropdown layer 1; pool-emp-drop; (light-mode scrollbar thumb for emp-table = 0.12) | .app-drop{box-shadow}; .cust-select__panel{box-shadow}; .emp-table tbody{scrollbar-color} |
| `#fde8e6` | 9 | 0 / 7 / 0 | STATUS error bg: Inactive pill, req-status.denied, wfh-status-pill.away (dead), entry-remove border/hover, inline remove hover | .status-inactive{background}; .inactive-badge{background}; .inline-list-item-remove:hover{background} |
| `#c4cdd8` | 7 | 0 / 0 / 11 | BORDER strong: cancel buttons (btn-cancel, tt-fill-cancel, ts-btn, btn-req-cancel, tt-btn-fill-all, tt-confirm-cancel) | .btn-cancel{border}; .tt-fill-cancel{border}; .tt-btn-fill-all{border} |
| `#f0f8fa` | 7 | 0 / 4 / 0 | SELECTED/CURRENT tint: app-drop current item, phone-code-opt.selected, req-type-btn.selected, dp-day hover, dir-you bg, wfh-cell.today bg | .app-drop-item-current{background}; .phone-code-opt.selected{background}; .dp-day:hover{background} |
| `rgba(0,0,0,0.08)` | 7 | 0 / 0 / 0 | SCROLLBAR thumb/scrollbar-color (rv-list, tt-list, popups) | .rv-list{scrollbar-color}; .rv-list::-webkit-scrollbar-thumb{background}; .tt-list-scroll{scrollbar-color} |
| `#d97706` | 6 | 12 / 0 / 0 | STATUS warning text (amber): rv-status.pending, wfh-prefs-badge.pending, cc-low hrs/time, wfh pending-day check | .rv-status.pending{color}; .tt-cal-cell.cc-low{background}; .tt-cal-cell.cc-low{background} |
| `rgba(0,0,0,0.1)` | 6 | 0 / 0 / 0 | SCROLLBAR thumb (tab-body, modal-body) | .tab-body{scrollbar-color}; .tab-body::-webkit-scrollbar-thumb{background}; .modal-body{scrollbar-color} |
| `#f0f1f4` | 4 | 0 / 10 / 70 | DIVIDER fine: tt-cal-cell grid lines, sidebar-divider | .tt-cal-cell{border-right}; .tt-cal-cell{border-bottom}; .tt-cal-cell.cc-out{background} |
| `#dbeafe` | 4 | 0 / 18 / 0 | INFO/office blue bg: wfh legend dot office, wfh-status-pill.office, --off-icon-bg, wfh-stat-icon-office; (inline #dbeafe also remapped in dark) | body{--off-icon-bg}; .wfh-legend-dot.office{background}; .wfh-status-pill.office{background} |
| `#fef3c7` | 4 | 0 / 14 / 0 | STATUS warning bg: tt-badge-pending, wfh-prefs-badge.pending, req-status.pending, wfh pending-day box | .tt-badge-pending{background}; .wfh-prefs-badge.pending{background}; .wfh-day-check.pending-day input:checked{background} |
| `rgba(0,0,0,0.05)` | 4 | 0 / 0 / 0 | SHADOW colour: inner card (0 2px 8px) | .emp-table-wrap{box-shadow}; #hrReqList{box-shadow}; .tt-inner-card{box-shadow} |
| `#c1ecf0` | 3 | 0 / 84 / 0 | TEAL-CYAN tint: Fixed Income dept bg; pool-badge.members bg; dp-nav hover border; dp-day.today border | .pool-badge.members{background}; .dp-nav:hover{border-color}; .dp-day.today:not(.selected){border} |
| `#059669` | 3 | 72 / 0 / 0 | STATUS success text (calendar normal hrs/time; tt-approved-tag; copy-check) | .tt-cal-cell.cc-normal{background}; .tt-cal-cell.cc-normal{background}; .tt-approved-tag{color} |
| `#c8d0da` | 3 | 30 / 0 / 0 | TEXT disabled/out-of-month calendar: cc-out hrs/time, cc-wknd date | .tt-cal-cell.cc-out{background}; .tt-cal-cell.cc-out{background}; .tt-cal-cell.cc-wknd{background} |
| `#16a34a` | 3 | 13 / 0 / 7 | STATUS approved (green) text/border: rv-status.approved, rv-btn-approve (border+text) | .rv-status.approved{color}; .rv-btn-approve{border}; .rv-btn-approve{color} |
| `#dc2626` | 3 | 9 / 0 / 7 | STATUS danger text/border: rv-btn-deny, cc-missing label, sick req icon (JS), ttFill invalid border (JS inline) | .rv-btn-deny{border}; .rv-btn-deny{color}; .tt-cal-cell.cc-missing{cursor} |
| `#1d4ed8` | 3 | 16 / 0 / 0 | BLUE text: wfh-status-pill.office, timeoff req icon | .wfh-status-pill.office{color}; .req-icon-sm[data-reqtype="timeoff"]{color}; .wfh-stat-icon-office svg{stroke} |
| `#fafafa` | 3 | 0 / 10 / 0 | SURFACE subtle: calendar weekend / off / sick cells, wfh-cell.weekend | .tt-cal-cell.cc-off{background}; .tt-cal-cell.cc-sick{background}; .wfh-cell.weekend{background} |
| `rgba(0,0,0,0.28)` | 3 | 0 / 5 / 0 | OVERLAY scrim: .modal-overlay, .tt-fillall-overlay, .tt-confirm-overlay (light) | .tt-fillall-overlay{background}; .tt-confirm-overlay{background}; .modal-overlay{background} |
| `rgba(0,82,104,0.1)` | 3 | 0 / 0 / 0 | FOCUS RING (dir-search 3px; tt inputs 2px) | .tt-fill-input:focus{box-shadow}; .tt-fillall-input:focus{box-shadow}; .dir-search:focus{box-shadow} |
| `rgba(0,0,0,0.2)` | 3 | 0 / 0 / 0 | SHADOW colour: emp-qcard, .modal-backdrop .modal (0 24px 60px); dm-thumb (0 1px 3px) | .emp-qcard{box-shadow}; .modal-backdrop .modal{box-shadow}; .dm-thumb{box-shadow} |
| `#92400e` | 2 | 16 / 0 / 0 | STATUS warning text (dark amber): tt-badge-pending, tt-section-lbl--pending | .tt-section-lbl--pending{color}; .tt-badge-pending{color} |
| `#f0fdf4` | 2 | 0 / 6 / 0 | STATUS bg approved: rv-status.approved bg; rv-btn-approve hover | .rv-status.approved{background}; .rv-btn-approve:hover{background} |
| `rgba(0,0,0,0.45)` | 2 | 0 / 4 / 0 | OVERLAY scrim: .modal-backdrop (calc/fill/ts modals), .emp-qcard-backdrop (light) | .emp-qcard-backdrop{background}; /* ═════════════════════════════════════{background} |
| `#f59e0b` | 2 | 0 / 2 / 0 | ACCENT amber: tt-section-dot; wfh pending-day box border | .tt-section-dot{background}; .wfh-day-check.pending-day input:checked{border-color} |
| `rgba(0,0,0,0.14)` | 2 | 0 / 0 / 0 | SHADOW colour: tt-fillall-box / tt-confirm-box | .tt-fillall-box{box-shadow}; .tt-confirm-box{box-shadow} |
| `#7c3aed` | 2 | 0 / 0 / 0 | VIOLET text: ev-badge.anniversary (hidden Today panel), location req icon | .ev-badge.anniversary{color}; .req-icon-sm[data-reqtype="location"]{color} |
| `rgba(0,82,104,0.08)` | 2 | 0 / 0 / 0 | BRAND chip bg: dept-chip.active (dead), req-tab.active | .dept-chip.active{background}; .req-tab.active{background} |
| `#003d50` | 2 | 0 / 0 / 0 | BRAND deep: dir-row hover name; req-success-btn-back hover (dead) | .dir-row:hover .dir-name{color}; .req-success-btn-back:hover{background} |
| `#e8f4f7` | 2 | 0 / 0 / 0 | ANIMATION: dir-flash highlight (keyframes) | @keyframes dir-flash{0%{background}; @keyframes dir-flash{0%{background} |
| `#cad8f4` | 1 | 0 / 89 / 0 | DEPT bg Equities; pool-badge.holders bg | .pool-badge.holders{background} |
| `#f0fdf8` | 1 | 0 / 36 / 0 | SURFACE: tt-cal-cell.cc-normal | .tt-cal-cell.cc-normal{background} |
| `#d1fae5` | 1 | 0 / 28 / 0 | STATUS bg approved: tt-badge-approved | .tt-badge-approved{background} |
| `#065f46` | 1 | 28 / 0 / 0 | STATUS text approved: tt-badge-approved | .tt-badge-approved{color} |
| `#edf7f5` | 1 | 0 / 21 / 0 | SURFACE: rv-table tr.is-new td (New request row) | .rv-table tr.is-new td{background} |
| `#d0d7e3` | 1 | 11 / 0 / 0 | TEXT disabled: dp-day.other-month | .dp-day.other-month{color} |
| `#2456a0` | 1 | 9 / 0 / 0 | DEPT text Equities; pool-badge.holders text | .pool-badge.holders{color} |
| `#b8c0cc` | 1 | 8 / 0 / 0 | TEXT disabled: cc-out date | .tt-cal-cell.cc-out{background} |
| `#f0f0f2` | 1 | 0 / 0 / 5 | DIVIDER: records-table td bottom border (only use) | .records-table td{border-bottom} |
| `#fff8ec` | 1 | 0 / 4 / 0 | STATUS bg pending: rv-status.pending (only use) | .rv-status.pending{background} |
| `#d1d5db` | 1 | 4 / 0 / 0 | TEXT disabled: tt-cal-head weekend label | .tt-cal-head span.tt-wknd{color} |
| `#fffbeb` | 1 | 0 / 4 / 0 | SURFACE: tt-cal-cell.cc-low | .tt-cal-cell.cc-low{background} |
| `#0d6e7a` | 1 | 4 / 0 / 0 | DEPT text Fixed Income; pool-badge.members text | .pool-badge.members{color} |
| `#d4eee9` | 1 | 0 / 3 / 0 | STATUS bg 'new': rv-status.new | .rv-status.new{background} |
| `#fef2f2` | 1 | 0 / 3 / 0 | bg: rv-btn-deny hover; sick req icon bg (JS) | .rv-btn-deny:hover{background} |
| `#fff5f5` | 1 | 0 / 2 / 0 | SURFACE: tt-cal-cell.cc-missing | .tt-cal-cell.cc-missing{background} |
| `#f87171` | 1 | 2 / 0 / 0 | TEXT: cc-missing date (light) | .tt-cal-cell.cc-missing{cursor} |
| `#e8f4f8` | 1 | 0 / 1 / 0 | SURFACE: app-drop-item-badge bg ('Current') | .app-drop-item-badge{background} |
| `rgba(255,255,255,0.65)` | 1 | 1 / 0 / 0 | text: day-date.today on brand chip | .day-date.today{color} |
| `rgba(20,30,48,0.35)` | 1 | 0 / 1 / 0 | OVERLAY scrim of the request-success backdrop (+ backdrop-filter blur(6px)) | .req-success-backdrop{background} |
| `#e8f5f3` | 1 | 0 / 1 / 0 | bg: req-success-icon | .req-success-icon{background} |
| `#e3f3f1` | 1 | 0 / 0 / 0 | SURFACE: rv-table tr.is-new:hover td | .rv-table tr.is-new:hover td{background} |
| `#fde68a` | 1 | 0 / 0 / 0 | BORDER/line: tt-section-lbl--pending::after | .tt-section-lbl--pending{color} |
| `#ececf0` | 1 | 0 / 0 / 0 | SURFACE: tt selected row hover | .tt-table tr.tt-selected td{background} |
| `#ffe8e8` | 1 | 0 / 0 / 0 | SURFACE: cc-missing hover | .tt-cal-cell.cc-missing{cursor} |
| `rgba(0,0,0,0.16)` | 1 | 0 / 0 / 0 | SHADOW colour: .modal (740px) | .modal{box-shadow} |
| `#fff7ed` | 1 | 0 / 0 / 0 | bg: ev-badge.birthday (hidden Today panel) | .ev-badge.birthday{background} |
| `#ea7a1e` | 1 | 0 / 0 / 0 | (see examples) | .ev-badge.birthday{color} |
| `#ede9fe` | 1 | 0 / 0 / 0 | bg: ev-badge.anniversary | .ev-badge.anniversary{background} |
| `rgba(255,255,255,0.75)` | 1 | 0 / 0 / 0 | text on save-bar: btn-discard-bar | .btn-discard-bar{color} |
| `rgba(255,255,255,0.4)` | 1 | 0 / 0 / 0 | border on save-bar: btn-discard-bar | .btn-discard-bar{border} |
| `rgba(255,255,255,0.7)` | 1 | 0 / 0 / 0 | hover border btn-discard-bar | .btn-discard-bar:hover{border-color} |
| `#004257` | 1 | 0 / 0 / 0 | BRAND hover: dp-day.selected hover (only use) | .dp-day.selected:hover{background} |
| `#f5f7fa` | 1 | 0 / 0 / 0 | SURFACE: dir-row hover | .dir-row:hover{background} |
| `#f0f4f8` | 1 | 0 / 0 / 0 | SURFACE: eqa-btn hover | .eqa-btn:hover{background} |
| `#0d7a5f` | 0 | 9 / 0 / 0 | DEPT text Technology |  |
| `#c8f0e0` | 0 | 0 / 9 / 0 | DEPT bg Technology |  |
| `#eff6ff` | 0 | 0 / 8 / 0 | bg (JS-inline): Annual Leave icon bg (rv-type-icon, REQ type map line 3815) and timeoff req-icon-sm bg (REQ_BG, line 4933) |  |
| `#a35c18` | 0 | 7 / 0 / 0 | DEPT text Operations |  |
| `#fce8d0` | 0 | 0 / 7 / 0 | DEPT bg Operations (also inline JS) |  |
| `rgba(0,0,0,0)` | 0 | 0 / 0 / 6 | transparent: inactive tab 2px underline (border-bottom-color) - computed only |  |
| `#6e42a0` | 0 | 4 / 0 / 0 | DEPT text Compliance |  |
| `#1a5a7a` | 0 | 4 / 0 / 0 | DEPT text Finance |  |
| `#f0eafc` | 0 | 0 / 4 / 0 | DEPT bg Compliance |  |
| `#d8eef8` | 0 | 0 / 4 / 0 | DEPT bg Finance |  |
| `#f0f4ff` | 0 | 0 / 4 / 0 | bg (JS-inline): Remote Office icon bg (line 3818) |  |
| `#e2e8f4` | 0 | 3 / 0 / 0 | BUG: .phone-code-val gets dark text colour in LIGHT mode (selector leak, line 1608: `body.dark .phone-flag,.phone-code-val{...}`) |  |
| `#c4cdd9` | 0 | 2 / 0 / 0 | text (inline HTML in hidden Today panel) - dark-remapped to #505a6c |  |
| `#fef3ec` | 0 | 0 / 2 / 0 | bg (inline HTML): reminder-icon (birthday) bg; dark-remapped |  |
| `#767676` | 0 | 0 / 0 / 2 | UA default border of <textarea class="modal-textarea"> - class has NO CSS rule (gap/bug) |  |
| `#b0b8c8` | 0 | 1 / 0 / 0 | text (inline HTML): empty "—" placeholder value in sidebar - dark-remapped to #8a97aa |  |
| `#f5f3ff` | 0 | 0 / 1 / 0 | bg (JS-inline): location req-icon-sm bg (REQ_BG) |  |
| `#ecfdf5` | 0 | 0 / 1 / 0 | bg (JS-inline): WFH Schedule icon bg (line 3817) |  |
| `#eef2ff` | 0 | 0 / 1 / 0 | bg (inline HTML): reminder-icon (celebration) bg; dark-remapped |  |


### 2.3 Dark palette (every colour)
| colour | CSS decls (source) | computed elements: text / bg / border | role | example selectors (source) |
|---|---|---|---|---|
| `#e2e8f4` | 105 | 1134 / 0 / 0 | TEXT primary (dark) | /* ═════════════════════════════════════{color}; body.dark .nav-wordmark{color}; body.dark .nav-avatar{color} |
| `#0cb8d0` | 101 | 76 / 21 / 8 | BRAND (dark): primary btn bg, active tab/link, focus border, icons, selected markers, dm-switch on | body.dark .dm-switch.on{background}; body.dark .app-drop-item-current .app-dr{color}; body.dark .app-drop-item-badge{color} |
| `#505a6c` | 89 | 688 / 0 / 5 | TEXT tertiary/muted/placeholder/th; inactive avatar ring (dark) | body.dark .search-input::placeholder{color}; body.dark .search-icon{color}; body.dark .cust-select__trigger{color} |
| `#8a97aa` | 77 | 588 / 0 / 0 | TEXT secondary (dark) | body.dark .profile-drop-email{color}; body.dark .profile-drop-item-icon{color}; body.dark .groupby-label{color} |
| `rgba(255,255,255,0.12)` | 46 | 0 / 0 / 198 | BORDER strong (nav bottom, header/section/table-head divider, 46 uses) | body.dark .top-nav{border-bottom-color}; body.dark .profile-drop-header{border-bottom-color}; body.dark .left-header{border-bottom-color} |
| `#202226` | 39 | 0 / 68 / 0 | SURFACE panels/cards: split-left/right, emp-table-wrap, detail header/stat-bar/tabs, cards, sidebar, content-card | body.dark .split-left{background}; body.dark .split-right{background}; body.dark .emp-table-wrap{background} |
| `rgba(255,255,255,0.1)` | 37 | 0 / 0 / 120 | BORDER inputs/controls/secondary buttons | body.dark .search-input{border-color}; body.dark .cust-select__trigger{border-color}; body.dark .modal-input{border-color} |
| `rgba(255,255,255,0.07)` | 37 | 0 / 18 / 36 | BORDER card/panel outer (page-center, split-left, tables wrap) + subtle divider fills | body.dark .profile-drop-divider{background}; body.dark .app-drop-divider{background}; body.dark .page-center{border-color} |
| `#26292e` | 30 | 0 / 70 / 0 | SURFACE elevated: dropdowns, modals, toast, btn-outline bg, nav menus, disabled btn bg, phone drop, datepicker | body.dark .profile-drop{background}; body.dark .app-drop{background}; body.dark .btn-primary:disabled{background} |
| `rgba(255,255,255,0.06)` | 21 | 0 / 15 / 6 | SURFACE neutral chip/icon bg; border rows (reminder-row etc.) | body.dark .btn-outline:disabled{border-color}; body.dark .dept-badge{background}; body.dark .drawer-dept-badge{background} |
| `#111214` | 18 | 17 / 23 / 0 | SURFACE deepest: page bg, table header bg, group header, section-band, my-profile view bg; TEXT on brand buttons | /* ═════════════════════════════════════{background}; body.dark #myprofile-view{background}; body.dark .btn-primary{color} |
| `rgba(12,184,208,0.12)` | 18 | 0 / 2 / 0 | FOCUS RING (dark) 3px; selected chip/tab bg; dir-you bg; today day-chip bg | body.dark .search-input:focus{box-shadow}; body.dark .modal-input:focus{box-shadow}; body.dark .modal-select:focus{box-shadow} |
| `rgba(255,255,255,0.04)` | 15 | 0 / 29 / 40 | ACTIVE row/selected bg; sidebar-profile; readonly field | body.dark .emp-table tr.active-row td{background}; body.dark .pool-row.active{background}; body.dark .tt-table tr.tt-selected td{background} |
| `rgba(255,255,255,0.28)` | 14 | 4 / 0 / 137 | BORDER avatar ring; scrollbar thumb hover; drawer-dot; app-drop-section text | body.dark *::-webkit-scrollbar-thumb:hov{background}; body.dark .nav-avatar{border-color}; body.dark .app-drop-section{color} |
| `#f87171` | 14 | 18 / 0 / 7 | STATUS inactive/danger text | body.dark .rv-btn-deny{border-color}; body.dark .rv-btn-deny{color}; body.dark .status-inactive{color} |
| `rgba(255,255,255,0.08)` | 13 | 0 / 6 / 12 | BORDER elevated surfaces (dropdown/modal); scrollbar thumb | /* ═════════════════════════════════════{scrollbar-color}; body.dark .profile-drop{border-color}; body.dark .app-drop{border-color} |
| `rgba(255,255,255,0.05)` | 11 | 0 / 0 / 90 | HOVER bg of menu items/options; cal cell vertical border | body.dark .profile-drop-item:hover{background}; body.dark .app-drop-item:hover:not(.app-{background}; body.dark .cust-select__option:hover{background} |
| `#2dd4bf` | 10 | 58 / 0 / 0 | STATUS active text; Fixed Income dept; wfh pill | body.dark .status-active{color}; body.dark .dept-badge[data-dept="Fixed I{color}; body.dark .drawer-dept-badge[data-dept="{color} |
| `rgba(255,255,255,0.09)` | 9 | 0 / 0 / 709 | BORDER table row separators | body.dark *::-webkit-scrollbar-thumb{background}; body.dark .emp-table td{border-bottom-color}; body.dark .records-table td{border-bottom-color} |
| `#34d399` | 9 | 113 / 0 / 7 | STATUS approved text (green); rv-btn-approve; cc-normal | body.dark .rv-btn-approve{border-color}; body.dark .rv-btn-approve{color}; body.dark .tt-badge-approved{color} |
| `#c8d4e8` | 9 | 62 / 0 / 0 | TEXT item/option/nav-link/secondary-button (dark) | body.dark .nav-link{color}; body.dark .profile-drop-item-label{color}; body.dark .app-drop-item-name{color} |
| `#fbbf24` | 9 | 28 / 2 / 0 | STATUS pending text (amber) | body.dark .tt-section-lbl--pending{color}; body.dark .tt-section-dot{background}; body.dark .tt-badge-pending{color} |
| `rgba(0,0,0,0.5)` | 7 | 0 / 0 / 0 | SHADOW colour: dropdown/page-center/phone drop/pool-emp-drop (dark) | body.dark .profile-drop{box-shadow}; body.dark .app-drop{box-shadow}; body.dark .page-center{box-shadow} |
| `rgba(255,255,255,0.03)` | 7 | 0 / 0 / 0 | ROW HOVER bg | body.dark .emp-table tr:hover td{background}; body.dark .pool-row:hover{background}; body.dark .tt-table tr.tt-data-row:hover{background} |
| `rgba(248,113,113,0.15)` | 6 | 0 / 7 / 0 | STATUS inactive bg | body.dark .status-inactive{background}; body.dark .inactive-badge{background}; body.dark .inline-badge.inactive{background} |
| `#ffffff` | 6 | 1 / 3 / 0 | SURFACE (see #ffffff) | body.dark .btn-save.ready:hover{color}; body.dark .btn-req-send:hover{color}; body.dark .req-success-btn-new:hover{color} |
| `rgba(12,184,208,0.1)` | 6 | 0 / 2 / 0 | SELECTED tint: app-drop current, phone-code-opt.selected, dp-day hover, eqa hover | body.dark .app-drop-item-current{background}; body.dark .dp-day:hover{background}; body.dark .dp-year-item:hover{background} |
| `rgba(0,0,0,0.6)` | 5 | 0 / 4 / 0 | SHADOW colour: emp-qcard / modal-backdrop .modal / req-success-card; OVERLAY scrim: modal-backdrop, emp-qcard-backdrop (dark) | body.dark .modal-backdrop{background}; body.dark .modal-backdrop .modal{box-shadow}; body.dark .req-success-card{box-shadow} |
| `rgba(255,255,255,0.2)` | 5 | 0 / 0 / 0 | HOVER border for inputs | body.dark .cust-select__trigger:hover{border-color}; body.dark .modal-backdrop .modal-close:h{border-color}; body.dark .bal-action-btn:hover{border-color} |
| `rgba(45,212,191,0.16)` | 4 | 0 / 46 / 0 | STATUS active bg | body.dark .status-active{background}; body.dark .active-badge{background}; body.dark .inline-badge.active{background} |
| `#60a5fa` | 4 | 16 / 0 / 0 | BLUE: wfh office pill text; annual/timeoff icon text | body.dark .rv-type-icon[data-reqtype="an{color}; body.dark .wfh-status-pill.office{color}; body.dark .req-icon-sm[data-reqtype="tim{color} |
| `rgba(99,152,255,0.16)` | 3 | 0 / 89 / 0 | DEPT bg Equities; pool-badge.holders bg | body.dark .dept-badge[data-dept="Equitie{background}; body.dark .drawer-dept-badge[data-dept="{background}; body.dark .pool-badge.holders{background} |
| `#7aabff` | 3 | 89 / 0 / 0 | DEPT text Equities | body.dark .dept-badge[data-dept="Equitie{color}; body.dark .drawer-dept-badge[data-dept="{color}; body.dark .pool-badge.holders{color} |
| `rgba(52,211,153,0.15)` | 3 | 0 / 34 / 0 | STATUS approved bg | body.dark .tt-badge-approved{background}; body.dark .rv-status.approved{background}; body.dark .req-status.approved{background} |
| `#2a3548` | 3 | 15 / 0 / 0 | TEXT/dim: weekend label, other-month day, day-hours.empty | body.dark .tt-cal-head span.tt-wknd{color}; body.dark .day-hours.empty{color}; body.dark .dp-day.other-month{color} |
| `rgba(255,255,255,0.02)` | 3 | 0 / 10 / 0 | cal cell off/out bg | body.dark .tt-cal-cell.cc-out{background}; body.dark .tt-cal-cell.cc-off{background}; body.dark .tt-cal-cell.cc-sick{background} |
| `#4ade80` | 3 | 9 / 0 / 0 | DEPT text Technology | body.dark .dept-badge[data-dept="Technol{color}; body.dark .drawer-dept-badge[data-dept="{color}; body.dark .rv-type-icon[data-reqtype="wf{color} |
| `#fb923c` | 3 | 8 / 0 / 0 | DEPT text Operations; birthday | body.dark .dept-badge[data-dept="Operati{color}; body.dark .drawer-dept-badge[data-dept="{color}; body.dark .ev-badge.birthday{color} |
| `rgba(167,139,250,0.16)` | 3 | 0 / 4 / 0 | DEPT bg Compliance; anniversary | body.dark .dept-badge[data-dept="Complia{background}; body.dark .drawer-dept-badge[data-dept="{background}; body.dark .ev-badge.anniversary{background} |
| `#a78bfa` | 3 | 4 / 0 / 0 | DEPT text Compliance; anniversary | body.dark .dept-badge[data-dept="Complia{color}; body.dark .drawer-dept-badge[data-dept="{color}; body.dark .ev-badge.anniversary{color} |
| `rgba(251,191,36,0.15)` | 3 | 0 / 4 / 0 | STATUS pending bg | body.dark .rv-status.pending{background}; body.dark .req-status.pending{background}; body.dark .wfh-prefs-badge.pending{background} |
| `rgba(52,211,153,0.1)` | 2 | 0 / 36 / 0 | cc-normal bg; rv-btn-approve hover | body.dark .rv-btn-approve:hover{background}; body.dark .tt-cal-cell.cc-normal{background} |
| `rgba(255,255,255,0.01)` | 2 | 0 / 26 / 0 | cal weekend bg | body.dark .tt-cal-cell.cc-wknd{background}; body.dark .wfh-cell.weekend{background} |
| `rgba(251,191,36,0.16)` | 2 | 0 / 14 / 0 | tt-badge-pending / wfh pending check bg | body.dark .tt-badge-pending{background}; body.dark .wfh-day-check.pending-day inp{background} |
| `rgba(52,211,153,0.14)` | 2 | 0 / 9 / 0 | DEPT bg Technology | body.dark .dept-badge[data-dept="Technol{background}; body.dark .drawer-dept-badge[data-dept="{background} |
| `rgba(251,146,60,0.16)` | 2 | 0 / 8 / 0 | DEPT bg Operations | body.dark .dept-badge[data-dept="Operati{background}; body.dark .drawer-dept-badge[data-dept="{background} |
| `rgba(37,99,235,0.16)` | 2 | 0 / 7 / 0 | annual/timeoff req icon bg | body.dark .rv-type-icon[data-reqtype="an{background}; body.dark .req-icon-sm[data-reqtype="tim{background} |
| `rgba(45,212,191,0.14)` | 2 | 0 / 6 / 0 | DEPT bg Fixed Income | body.dark .dept-badge[data-dept="Fixed I{background}; body.dark .drawer-dept-badge[data-dept="{background} |
| `rgba(96,186,240,0.16)` | 2 | 0 / 6 / 0 | DEPT bg Finance | body.dark .dept-badge[data-dept="Finance{background}; body.dark .drawer-dept-badge[data-dept="{background} |
| `#60baf0` | 2 | 6 / 0 / 0 | DEPT text Finance | body.dark .dept-badge[data-dept="Finance{color}; body.dark .drawer-dept-badge[data-dept="{color} |
| `rgba(12,184,208,0.15)` | 2 | 0 / 4 / 0 | STATUS new bg (rv-status.new, app-drop badge) | body.dark .app-drop-item-badge{background}; body.dark .rv-status.new{background} |
| `rgba(124,58,237,0.16)` | 2 | 0 / 4 / 0 | location req icon bg | body.dark .rv-type-icon[data-reqtype="lo{background}; body.dark .req-icon-sm[data-reqtype="loc{background} |
| `rgba(220,38,38,0.16)` | 2 | 0 / 3 / 0 | sick req icon bg | body.dark .rv-type-icon[data-reqtype="si{background}; body.dark .req-icon-sm[data-reqtype="sic{background} |
| `rgba(255,255,255,0.22)` | 2 | 2 / 0 / 0 | disabled text on btn-primary (dark) | body.dark .btn-primary:disabled{color}; body.dark .req-type-btn:hover{border-color} |
| `rgba(248,113,113,0.1)` | 2 | 0 / 2 / 0 | cc-missing bg; rv-btn-deny hover | body.dark .rv-btn-deny:hover{background}; body.dark .tt-cal-cell.cc-missing{background} |
| `rgba(45,212,191,0.5)` | 2 | 0 / 1 / 1 | wfh legend dot / checked border | body.dark .wfh-legend-dot.wfh{background}; body.dark .wfh-day-check input:checked~.{border-color} |
| `rgba(23,148,132,0.22)` | 2 | 0 / 1 / 0 | --wfh-icon-bg / wfh-stat-icon-wfh | body.dark{--wfh-icon-bg}; body.dark .wfh-stat-icon-wfh{background} |
| `rgba(37,99,235,0.18)` | 2 | 0 / 1 / 0 | --off-icon-bg / wfh-stat-icon-office | body.dark{--off-icon-bg}; body.dark .wfh-stat-icon-office{background} |
| `rgba(12,184,208,0.08)` | 2 | 0 / 1 / 0 | req-type-btn.selected bg; calc-accrual-btn hover | body.dark .req-type-btn.selected{background}; body.dark .calc-accrual-btn:hover{background} |
| `#c4b5fd` | 2 | 0 / 0 / 0 | VIOLET light: location req icon text | body.dark .rv-type-icon[data-reqtype="lo{color}; body.dark .req-icon-sm[data-reqtype="loc{color} |
| `#0aacc3` | 2 | 0 / 0 / 0 | BRAND hover (dark): req-success-btn-back hover; dp-day.selected hover | body.dark .req-success-btn-back:hover{background}; body.dark .dp-day.selected:hover{background} |
| `rgba(12,184,208,0.4)` | 2 | 0 / 0 / 0 | border: dp-nav hover, dp-day.today | body.dark .dp-nav:hover{border-color}; body.dark .dp-day.today:not(.selected){border-color} |
| `rgba(34,211,238,0.16)` | 1 | 0 / 80 / 0 | pool-badge.members bg | body.dark .pool-badge.members{background} |
| `#22d3ee` | 1 | 80 / 0 / 0 | CYAN: pool-badge.members text | body.dark .pool-badge.members{color} |
| `rgba(12,184,208,0.06)` | 1 | 0 / 21 / 0 | rv-table tr.is-new td | body.dark .rv-table tr.is-new td{background} |
| `rgba(96,165,250,0.18)` | 1 | 0 / 16 / 0 | wfh office pill bg | body.dark .wfh-status-pill.office{background} |
| `rgba(45,212,191,0.18)` | 1 | 0 / 6 / 0 | wfh pill bg | body.dark .wfh-status-pill.wfh{background} |
| `rgba(251,191,36,0.1)` | 1 | 0 / 4 / 0 | cc-low bg | body.dark .tt-cal-cell.cc-low{background} |
| `rgba(0,0,0,0.55)` | 1 | 0 / 3 / 0 | OVERLAY scrim: modal-overlay (dark) | body.dark .modal-overlay{background} |
| `rgba(251,146,60,0.14)` | 1 | 0 / 2 / 0 | inline #fef3ec reminder-icon override | body.dark [style*="background:#fef3ec"]{background} |
| `#18181c` | 1 | 0 / 1 / 0 | SURFACE nav bar | body.dark .top-nav{background} |
| `rgba(255,255,255,0.18)` | 1 | 1 / 0 / 0 | disabled text on btn-outline (dark) | body.dark .btn-outline:disabled{color} |
| `rgba(5,150,105,0.16)` | 1 | 0 / 1 / 0 | wfh req icon bg | body.dark .rv-type-icon[data-reqtype="wf{background} |
| `rgba(0,5,20,0.65)` | 1 | 0 / 1 / 0 | OVERLAY scrim: req-success-backdrop (dark) | body.dark .req-success-backdrop{background} |
| `rgba(23,148,132,0.18)` | 1 | 0 / 1 / 0 | req-success-icon bg | body.dark .req-success-icon{background} |
| `rgba(12,184,208,0.75)` | 1 | 1 / 0 / 0 | text day-date.today | body.dark .day-date.today{color} |
| `rgba(96,165,250,0.5)` | 1 | 0 / 1 / 0 | wfh legend office | body.dark .wfh-legend-dot.office{background} |
| `rgba(45,212,191,0.2)` | 1 | 0 / 1 / 0 | wfh-day-box checked bg | body.dark .wfh-day-check input:checked~.{background} |
| `rgba(99,102,241,0.14)` | 1 | 0 / 1 / 0 | inline #eef2ff override | body.dark [style*="background:#eef2ff"]{background} |
| `rgba(255,255,255,0.55)` | 1 | 0 / 0 / 0 | nav apps-icon circle fill (dark) | body.dark .nav-apps-icon circle{fill} |
| `rgba(255,255,255,0.13)` | 1 | 0 / 0 / 0 | btn-cancel hover bg (dark) | body.dark .btn-cancel:hover{background} |
| `rgba(251,191,36,0.25)` | 1 | 0 / 0 / 0 | tt-section-lbl--pending::after line | body.dark .tt-section-lbl--pending::afte{background} |
| `rgba(248,113,113,0.16)` | 1 | 0 / 0 / 0 | cc-missing hover | body.dark .tt-cal-cell.cc-missing:hover{background} |
| `rgba(12,184,208,0.09)` | 1 | 0 / 0 / 0 | rv-table tr.is-new:hover td | body.dark .rv-table tr.is-new:hover td{background} |
| `rgba(248,113,113,0.3)` | 1 | 0 / 0 / 0 | entry-remove border | body.dark .entry-remove{border-color} |
| `rgba(248,113,113,0.5)` | 1 | 0 / 0 / 0 | wfh legend away (dead) | body.dark .wfh-legend-dot.away{background} |
| `rgba(251,191,36,0.5)` | 1 | 0 / 0 / 0 | wfh pending-day border | body.dark .wfh-day-check.pending-day inp{border-color} |
| `rgba(255,255,255,0.25)` | 1 | 0 / 0 / 0 | wfh day box hover border | body.dark .wfh-day-check:hover .wfh-day-{border-color} |
| `rgba(12,184,208,0.07)` | 1 | 0 / 0 / 0 | wfh-cell.today bg | body.dark .wfh-cell.today{background} |
| `rgba(248,113,113,0.18)` | 1 | 0 / 0 / 0 | wfh away pill bg (dead) | body.dark .wfh-status-pill.away{background} |
| `rgba(234,122,30,0.16)` | 1 | 0 / 0 / 0 | birthday badge bg | body.dark .ev-badge.birthday{background} |
| `rgba(37,99,235,0.15)` | 1 | 0 / 0 / 0 | inline #dbeafe override | body.dark [style*="background:#dbeafe"]{background} |
| `#c8d0da` | 0 | 30 / 0 / 0 | light-mode colour NOT overridden: cc-out hrs/time (tt calendar out-of-month cells) |  |
| `#b8c0cc` | 0 | 8 / 0 / 0 | light-mode colour NOT overridden: cc-out date |  |
| `rgba(0,0,0,0)` | 0 | 0 / 0 / 6 | transparent: inactive tab 2px underline (border-bottom-color) - computed only |  |
| `#da4d43` | 0 | 5 / 0 / 0 | not overridden in dark: .req-star required asterisk |  |
| `#000000` | 0 | 2 / 0 / 0 | UNSTYLED .modal-textarea (UA default) text in dark |  |
| `rgba(0,0,0,0.28)` | 0 | 0 / 2 / 0 | OVERLAY scrim tt-fillall/tt-confirm overlays (NO dark override: stays 0.28) |  |
| `#767676` | 0 | 0 / 0 / 2 | UA default textarea border (no CSS rule) |  |
| `#7c8dac` | 0 | 1 / 0 / 0 | not overridden in dark: .nav-sub text |  |
| `#a8b6cd` | 0 | 1 / 0 / 0 | not overridden in dark: `small` inside .sidebar-text |  |
| `#e5e7ec` | 0 | 0 / 1 / 0 | not overridden in dark: .dm-switch off track |  |


### 2.4 Data-driven / JS-generated colours
- Department badges (JS map `DC`, L3508; applied as inline `style="background:..;color:.."` on `.dept-badge` L3618 and `.drawer-dept-badge` L3682; `data-dept` attribute drives the dark override). Light is the JS value; dark is the CSS `!important` override (L1139-1152):

| dept | LIGHT bg / text (JS) | DARK bg / text (CSS) |
|---|---|---|
| Equities | `#cad8f4` / `#2456a0` | `rgba(99,152,255,0.16)` / `#7aabff` |
| Fixed Income | `#c1ecf0` / `#0d6e7a` | `rgba(45,212,191,0.14)` / `#2dd4bf` |
| Technology | `#c8f0e0` / `#0d7a5f` | `rgba(52,211,153,0.14)` / `#4ade80` |
| Operations | `#fce8d0` / `#a35c18` | `rgba(251,146,60,0.16)` / `#fb923c` |
| Compliance | `#f0eafc` / `#6e42a0` | `rgba(167,139,250,0.16)` / `#a78bfa` |
| Finance | `#d8eef8` / `#1a5a7a` | `rgba(96,186,240,0.16)` / `#60baf0` |
| inactive employee (any dept) | `#e5e7ec` / `#a8b6cd` (JS inline) | NOT grey: the badge still carries `data-dept`, so the dark `!important` dept rule wins - computed for an inactive Fixed Income badge in dark = `rgba(45,212,191,0.14)` / `rgb(45,212,191)`; `data-inactive="true"` is set by JS but no CSS reads it (the generic grey `rgba(255,255,255,0.06)`/`#505a6c` rule is never reached for the six real depts) |
| unknown dept | `#f5f5f8` / `#7c8dac` (JS fallback) | |

- Employee status pill (static classes): `.status-active` `#c1f0d5` / `#179484`; `.status-inactive` `#fde8e6` / `#da4d43` (L124-125). Dark: `rgba(45,212,191,0.16)`/`#2dd4bf`, `rgba(248,113,113,0.15)`/`#f87171`. Same pair on `.active-badge/.inactive-badge` (pool members), `.inline-badge.active/.inactive`.
- Request type colours (JS map, L3815-3818 `bg`/`color`; used inline on `.rv-type-icon`): annual `#eff6ff`/`#2563eb`; sick `#fef2f2`/`#dc2626`; wfh `#ecfdf5`/`#059669`; location `#f0f4ff`/`#3b5fc0`. Dark (CSS `!important`, keyed on `data-reqtype`): annual `rgba(37,99,235,0.16)`/`#60a5fa`; sick `rgba(220,38,38,0.16)`/`#f87171`; wfh `rgba(5,150,105,0.16)`/`#4ade80`; location `rgba(124,58,237,0.16)`/`#c4b5fd`; default `rgba(255,255,255,0.06)`/`#8a97aa`. My-profile request list (`.req-icon-sm`, `REQ_BG` L4933): timeoff `#eff6ff` + text `#1d4ed8`; sick `#fef2f2` + `#da4d43`; location `#f5f3ff` + `#7c3aed` (CSS L1694-1696); dark L1698-1701.
- Status pills by view (the same semantic state uses DIFFERENT colours per view):
  - HR Requests `.rv-status`: new `#d4eee9`/`#005268`; pending `#fff8ec`/`#d97706`; approved `#f0fdf4`/`#16a34a`; denied `#f5f5f8`/`#a8b6cd`. Dark: new `rgba(12,184,208,0.15)`/`#0cb8d0`; pending `rgba(251,191,36,0.15)`/`#fbbf24`; approved `rgba(52,211,153,0.15)`/`#34d399`; denied `rgba(255,255,255,0.06)`/`#505a6c`.
  - My requests `.req-status`: pending `#fef3c7`/`#d97706`; approved `#c1f0d5`/`#179484`; denied `#fde8e6`/`#da4d43`. Dark `rgba(251,191,36,0.15)`/`#fbbf24`; `rgba(52,211,153,0.15)`/`#34d399`; `rgba(248,113,113,0.15)`/`#f87171`.
  - Time tracking `.tt-badge-pending` `#fef3c7`/`#92400e`; `.tt-badge-approved` `#d1fae5`/`#065f46`; `.tt-badge-none` `#f5f5f8`/`#a8b6cd` (dead). Dark `rgba(251,191,36,0.16)`/`#fbbf24`; `rgba(52,211,153,0.15)`/`#34d399`; `rgba(255,255,255,0.06)`/`#505a6c`.
  - WFH `.wfh-status-pill`: wfh `#c1f0d5`/`#179484`; office `#dbeafe`/`#1d4ed8`; (away `#fde8e6`/`#da4d43` dead). Dark wfh `rgba(45,212,191,0.18)`/`#2dd4bf`, office `rgba(96,165,250,0.18)`/`#60a5fa`.
  - `.wfh-prefs-badge` approved `#c1f0d5`/`#179484`; pending `#fef3c7`/`#d97706`. `.pool-badge.holders` `#cad8f4`/`#2456a0`; `.pool-badge.members` `#c1ecf0`/`#0d6e7a` (dark `rgba(99,152,255,0.16)`/`#7aabff`; `rgba(34,211,238,0.16)`/`#22d3ee`); `.pool-badge.grey` = opacity 0.45.
- Time-tracking calendar cell states (`.tt-cal-cell.cc-*`, L338-344): out `#f0f1f4` (date `#b8c0cc`, hrs/time `#c8d0da`); weekend `#f5f5f8` (date `#c8d0da`); normal `#f0fdf8` (hrs/time `#059669`); low `#fffbeb` (`#d97706`); off/sick `#fafafa` (label `#a8b6cd`); missing `#fff5f5` hover `#ffe8e8` (date `#f87171`, label `#dc2626`). Dark L1290-1305. Weekday header weekend label light `#d1d5db`, dark `#2a3548`.
- WFH calendar (L772-785): weekend `#fafafa`, today `#f0f8fa` (number chip `#005268`/`#fff`, dark `rgba(12,184,208,0.12)`/`#0cb8d0`), faded opacity 0.3.
- Avatars: all initial-avatars are transparent with `1px solid rgba(0,0,0,0.30)` ring and `#000` text (dark: ring `rgba(255,255,255,0.28)`, text `#e2e8f4`); inactive: ring + text `#a8b6cd` (dark `#505a6c`). `.calc-user-avatar` = square 4px `#e5e7ec` / `#7c8dac`. No coloured avatars exist except the hidden-panel `.ev-avatar` inline colours. There is no avatar colour palette.
- Logo mark (inline SVG L1728): rounded square 32x32 rx 4 `#005268`, blurred blobs `#00589F`, `#00635B`, `#00B8B8`, white glyph paths; same artwork in light and dark. Apps-launcher icon: 9 circles r=2 stroke `#1a1a1a` 1.2 (dark: `fill:rgba(255,255,255,0.55)`, stroke none; `.nav-apps-icon` opacity 0.7, hover 1).
- Inline JS validation error: `style.borderColor='#dc2626'` on tt fill inputs (L4188-4189); `#059669` copy-check (L4738).

### 2.5 LIGHT -> DARK mapping of every `body.dark` override
Aggregated by value pair (colour-bearing properties only; every pair is a literal pair read from a light rule and its dark counterpart on the same selector). A complete per-rule listing (961 declarations, with source lines) is in Appendix A.
| LIGHT | → DARK | count | properties |
|---|---|---|---|
| `#005268` | `#0cb8d0` | 90 | background, color, border-color, border-bottom-color |
| `#1a1a1a` | `#e2e8f4` | 89 | color |
| `#a8b6cd` | `#505a6c` | 72 | color, border-color |
| `#7c8dac` | `#8a97aa` | 67 | color |
| `#fff` | `#202226` | 30 | background |
| `#fff` | `#26292e` | 25 | background |
| `#fff` | `#111214` | 12 | background, color |
| `#f5f5f8` | `rgba(255,255,255,0.04)` | 12 | background |
| `0 0 0 3px rgba(0,82,104,0.12)` | `0 0 0 3px rgba(12,184,208,0.12)` | 11 | box-shadow |
| `transparent` | `transparent` | 11 | background |
| `#fff` | `transparent` | 10 | background, background-color |
| `#f5f5f8` | `rgba(255,255,255,0.06)` | 10 | background |
| `#000` | `#e2e8f4` | 9 | color |
| `#f5f5f8` | `rgba(255,255,255,0.05)` | 9 | background |
| `#e5e7ec` | `rgba(255,255,255,0.07)` | 8 | background |
| `#1a1a1a` | `#c8d4e8` | 8 | color |
| `#7c8dac` | `#505a6c` | 8 | color |
| `#da4d43` | `#f87171` | 8 | color |
| `#179484` | `#2dd4bf` | 7 | color |
| `#fde8e6` | `rgba(248,113,113,0.15)` | 6 | background |
| `#f5f5f8` | `#202226` | 6 | background |
| `#fff` | `#fff` | 6 | color |
| `0 8px 32px rgba(0,0,0,0.12),0 2px 8px rgba(0,0,0,0.06)` | `0 8px 32px rgba(0,0,0,0.50)` | 4 | box-shadow |
| `#f0f8fa` | `rgba(12,184,208,0.10)` | 4 | background |
| `#f5f5f8` | `#111214` | 4 | background |
| `0 2px 8px rgba(0,0,0,0.05)` | `none` | 4 | box-shadow |
| `#f5f5f8` | `rgba(255,255,255,0.03)` | 4 | background |
| `#c1f0d5` | `rgba(45,212,191,0.16)` | 4 | background |
| `#d97706` | `#fbbf24` | 4 | color |
| `#a8b6cd` | `rgba(255,255,255,0.20)` | 3 | border-color |
| `#a8b6cd` | `#8a97aa` | 3 | color |
| `#16a34a` | `#34d399` | 2 | color |
| `#f5f5f8!important` | `#111214!important` | 2 | background |
| `#fef3c7` | `rgba(251,191,36,0.16)` | 2 | background |
| `0 0 0 2px rgba(0,82,104,0.1)` | `0 0 0 2px rgba(12,184,208,0.12)` | 2 | box-shadow |
| `rgba(0,0,0,0.45)` | `rgba(0,0,0,0.60)` | 2 | background |
| `0 24px 60px rgba(0,0,0,0.2)` | `0 24px 60px rgba(0,0,0,0.60)` | 2 | box-shadow |
| `#7c8dac` | `rgba(255,255,255,0.20)` | 2 | border-color |
| `rgba(0,82,104,0.08)` | `rgba(12,184,208,0.12)` | 2 | background |
| `#fef3c7` | `rgba(251,191,36,0.15)` | 2 | background |
| `#179484` | `#34d399` | 2 | color |
| `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' widt` | `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' hei` | 2 | background-image |
| `no-repeat` | `no-repeat` | 2 | background-repeat |
| `right 10px center` | `right 10px center` | 2 | background-position |
| `#005268` | `rgba(12,184,208,0.12)` | 2 | background |
| `#c1f0d5` | `rgba(45,212,191,0.50)` | 2 | background, border-color |
| `0 2px 8px rgba(0,0,0,0.06)` | `none` | 2 | box-shadow |
| `#000000` | `#e2e8f4` | 2 | color |
| `#1d4ed8` | `#60a5fa!important` | 2 | color, stroke |
| `#fff` | `#18181c` | 1 | background |
| `#000` | `#c8d4e8` | 1 | color |
| `#f5f5f8` | `transparent` | 1 | background |
| `#a8b6cd` | `rgba(255,255,255,0.28)` | 1 | color |
| `#e8f4f8` | `rgba(12,184,208,0.15)` | 1 | background |
| `0 2px 8px rgba(0,0,0,0.06)` | `0 4px 24px rgba(0,0,0,0.50)` | 1 | box-shadow |
| `#fff` | `#202226!important` | 1 | background |
| `transparent` | `rgba(255,255,255,0.08)` | 1 | background |
| `1px solid #c4cdd8` | `none` | 1 | border |
| `#f5f5f8` | `rgba(255,255,255,0.13)` | 1 | background |
| `#f0fdf4` | `rgba(52,211,153,0.10)` | 1 | background |
| `#dc2626` | `#f87171` | 1 | color |
| `#fef2f2` | `rgba(248,113,113,0.10)` | 1 | background |
| `#005268` | `#505a6c` | 1 | color |
| `inset 3px 0 0 #005268` | `inset 3px 0 0 #0cb8d0` | 1 | box-shadow |
| `#e5e7ec` | `rgba(255,255,255,0.28)` | 1 | color |
| `rgba(0,0,0,0.28)` | `rgba(0,0,0,0.55)` | 1 | background |
| `url("data:image/svg+xml,%3csvg width='12' height='8' viewbox='0 0 12 8` | `url("data:image/svg+xml,%3csvg width='12' height='8' viewbox='0 0 12 8' fill='no` | 1 | background-image |
| `#1a1a1a` | `#8a97aa` | 1 | color |
| `#cad8f4` | `rgba(99,152,255,0.16)` | 1 | background |
| `#2456a0` | `#7aabff` | 1 | color |
| `#c1ecf0` | `rgba(34,211,238,0.16)` | 1 | background |
| `#0d6e7a` | `#22d3ee` | 1 | color |
| `0 6px 20px rgba(0,0,0,0.12)` | `0 6px 20px rgba(0,0,0,0.50)` | 1 | box-shadow |
| `#92400e}.tt-section-lbl--pending::after{background:#fde68a` | `#fbbf24` | 1 | color |
| `#f59e0b` | `#fbbf24` | 1 | background |
| `#f5f5f8}.tt-table tr.tt-selected td:first-child{box-shadow:inset 3px 0` | `rgba(255,255,255,0.04)` | 1 | background |
| `#fff!important` | `#202226!important` | 1 | background |
| `#92400e` | `#fbbf24` | 1 | color |
| `#d1fae5` | `rgba(52,211,153,0.15)` | 1 | background |
| `#065f46` | `#34d399` | 1 | color |
| `#d1d5db` | `#2a3548` | 1 | color |
| `#f0f1f4}.tt-cal-cell.cc-out .cc-date{color:#b8c0cc}.tt-cal-cell.cc-out` | `rgba(255,255,255,0.02)` | 1 | background |
| `#f5f5f8}.tt-cal-cell.cc-wknd .cc-date{color:#c8d0da` | `rgba(255,255,255,0.01)` | 1 | background |
| `#f0fdf8}.tt-cal-cell.cc-normal .cc-hrs{color:#059669}.tt-cal-cell.cc-n` | `rgba(52,211,153,0.10)` | 1 | background |
| `#fffbeb}.tt-cal-cell.cc-low .cc-hrs{color:#d97706}.tt-cal-cell.cc-low ` | `rgba(251,191,36,0.10)` | 1 | background |
| `#fff5f5` | `rgba(248,113,113,0.10)` | 1 | background |
| `#fafafa}.tt-cal-cell.cc-off .cc-absent-lbl{color:#a8b6cd` | `rgba(255,255,255,0.02)` | 1 | background |
| `#fafafa}.tt-cal-cell.cc-sick .cc-absent-lbl{color:#a8b6cd` | `rgba(255,255,255,0.02)` | 1 | background |
| `#059669` | `#34d399` | 1 | color |
| `#edf7f5` | `rgba(12,184,208,0.06)` | 1 | background |
| `#e3f3f1` | `rgba(12,184,208,0.09)` | 1 | background |
| `#d4eee9` | `rgba(12,184,208,0.15)` | 1 | background |
| `#fff8ec` | `rgba(251,191,36,0.15)` | 1 | background |
| `#f0fdf4` | `rgba(52,211,153,0.15)` | 1 | background |
| `#005268` | `#e2e8f4` | 1 | color |
| `#7c8dac` | `rgba(255,255,255,0.22)` | 1 | border-color |
| `#f0f8fa` | `rgba(12,184,208,0.08)` | 1 | background |
| `#c1f0d5` | `rgba(52,211,153,0.15)` | 1 | background |
| `rgba(20,30,48,0.35)` | `rgba(0,5,20,0.65)` | 1 | background |
| `0 24px 64px rgba(0,0,0,0.30)` | `0 24px 64px rgba(0,0,0,0.60)` | 1 | box-shadow |
| `#e8f5f3` | `rgba(23,148,132,0.18)` | 1 | background |
| `#003d50` | `#0aacc3` | 1 | background |
| `white` | `#0cb8d0` | 1 | color |
| `rgba(255,255,255,0.65)` | `rgba(12,184,208,0.75)` | 1 | color |
| `#e5e7ec` | `#2a3548` | 1 | color |
| `#e5e7ec` | `#26292e` | 1 | background |
| `#f5f5f8` | `rgba(12,184,208,0.08)` | 1 | background |
| `#dbeafe` | `rgba(96,165,250,0.50)` | 1 | background |
| `#fde8e6` | `rgba(248,113,113,0.50)` | 1 | background |
| `#c1f0d5` | `rgba(45,212,191,0.20)` | 1 | background |
| `#f59e0b` | `rgba(251,191,36,0.50)` | 1 | border-color |
| `#7c8dac` | `rgba(255,255,255,0.25)` | 1 | border-color |
| `#fafafa` | `rgba(255,255,255,0.01)` | 1 | background |
| `#f0f8fa` | `rgba(12,184,208,0.07)` | 1 | background |
| `#fff` | `#0cb8d0` | 1 | color |
| `#c1f0d5` | `rgba(45,212,191,0.18)` | 1 | background |
| `#dbeafe` | `rgba(96,165,250,0.18)` | 1 | background |
| `#1d4ed8` | `#60a5fa` | 1 | color |
| `#fde8e6` | `rgba(248,113,113,0.18)` | 1 | background |
| `#f0f1f4` | `rgba(255,255,255,0.07)` | 1 | background |
| `#c1ecf0` | `rgba(12,184,208,0.40)` | 1 | border-color |
| `#d0d7e3` | `#2a3548` | 1 | color |
| `#004257` | `#0aacc3` | 1 | background |
| `0 8px 24px rgba(0,0,0,0.10),0 2px 6px rgba(0,0,0,0.06)` | `0 8px 24px rgba(0,0,0,0.50)` | 1 | box-shadow |
| `0 0 0 3px rgba(0,82,104,0.10)` | `0 0 0 3px rgba(12,184,208,0.10)` | 1 | box-shadow |
| `#f5f7fa` | `rgba(255,255,255,0.03)` | 1 | background |
| `#003d50` | `#0cb8d0` | 1 | color |
| `#f0f8fa` | `rgba(12,184,208,0.12)` | 1 | background |
| `#f0f4f8` | `rgba(12,184,208,0.10)` | 1 | background |
| `#fff7ed` | `rgba(234,122,30,0.16)` | 1 | background |
| `#ea7a1e` | `#fb923c` | 1 | color |
| `#ede9fe` | `rgba(167,139,250,0.16)` | 1 | background |
| `#7c3aed` | `#a78bfa` | 1 | color |
| `#1a1a1a` | `#26292e` | 1 | background |
| `#fff` | `#e2e8f4` | 1 | color |
| `#da4d43` | `#f87171!important` | 1 | color |
| `#7c3aed` | `#c4b5fd!important` | 1 | color |
| `#c1f0d5` | `rgba(23,148,132,0.22)!important` | 1 | background |
| `#179484` | `#2dd4bf!important` | 1 | stroke |
| `#dbeafe` | `rgba(37,99,235,0.18)!important` | 1 | background |


Rules whose dark value has no light counterpart on the same selector (282 declarations: dark-only structure such as `.split-left{background:#202226}` where the light value is `#fff` set elsewhere/inherited) are marked "no light rule" in Appendix A.

## 3. TYPE SCALE

Base: `body{font-family:'Geist',-apple-system,BlinkMacSystemFont,sans-serif;font-size:14px;line-height:1.5;color:#1a1a1a;background:#fff}` (L13, repeated L487); computed body: Geist 14px / 400 / 21px, `rgb(26,26,26)` on `rgb(255,255,255)`, `overflow-y:scroll`. Form controls: `font-family:inherit;font-size:inherit` (L14). Fonts: Google Fonts `Geist:wght@100..900` and `Lexend+Exa:wght@100..900`, `display=swap` (L9; both load as variable fonts, verified `document.fonts`). Only weights 400/500/600/700/800 are used. No `font-variant-numeric`, no tabular figures anywhere. `font-family:monospace` is used once (`.mf-value.mono`, L456: 14px/600 `#005268`); `.fc-value.mono` is NOT monospace (still Geist 500).

Wordmark / sub-label (Lexend Exa, the only two uses): `.nav-wordmark` Lexend Exa 18px / weight 400 / line-height 1 / `#000` (dark `#e2e8f4`), text "MAKOR X.AI", no transform, no letter-spacing (L22). `.nav-sub` Lexend Exa 14px / 400 / line-height 1 / `#7c8dac` (L23; no dark override), text "HR" or "My Profile" (set by `setNavApp()` L5495). Stack = wordmark 18px + gap 2px + sub 14px = 34px block (computed 131.75 x 34).

Nav links: Geist 14px / 400 / `#000` / no underline; active: weight 600, `text-decoration:underline; text-underline-offset:3px; text-decoration-thickness:2px` (L25-26, computed verified); hover `opacity:0.7`. Dark `#c8d4e8`.

### 3.1 Named roles (source)
| role | tuple | selectors / lines |
|---|---|---|
| Page title (panel header) | 16px/1.5 800 `#1a1a1a` | `.left-title` L54, `.rv-title` L236, `.tt-title` L284, `.member-name` L450 |
| Detail name | 18px 800 lh 1.2 | `.drawer-name` L137 |
| Modal title A | 16px 700 `#1a1a1a` | `.modal-title` L395 |
| Modal title B / success / request page | 18px 800 `#005268` (modal-backdrop); 20px 800 `#005268` (`.req-success-title` L973); 26px 800 `#005268` (`.request-page-title` L922); 17px 700 `#005268` (`.tt-fillall-title` L365); 15px 700 `#1a1a1a` (`.tt-confirm-title` L379) | |
| Big numbers | 28px 800 lh 1 (`.bal-number` L888); 28px 800 `#005268` (`.calc-result-number` L1018); 26px 800 `#005268` lh 1.1 (`.ts-stat-value` L870); 22px 700 lh 1 (`.wfh-stat-num` L769); 18px 800 lh 1.2 (`.tt-stat-val` L324); 16px 700 (`.detail-stat-value` L151) | |
| Section band | 14px 700 `#1a1a1a` | `.section-band` L167 |
| Card/section title (My Info) | 14px 700, `text-transform:none;letter-spacing:0` | `#panel-myinfo .card-title` L623 |
| Uppercase label L (table headers) | 12px 700 uppercase ls 0.06em `#a8b6cd` | `.emp-table th`, `.rv-table th`, `.tt-table th` (L104, 243, 296), `.fill-modal-label`, `.time-label` (L845, 993), `.group-header-row td` L95 (colour `#7c8dac`), `.modal-section-title` L404 (`#7c8dac`), `.pool-group-lbl` L422 (`#7c8dac`), `.card-title` L561 (`#7c8dac`) |
| Uppercase label M | 11px 700 uppercase ls 0.07em | `.tt-section-lbl` L291, `.tt-cal-title` L326 (`#7c8dac`), `.tt-fillall-lbl` L371, `.req-table th`/`.hist-table th` (11px 700 ls 0.06em) L799/910, `.wfh-cal-daylabel` 11/700 ls 0.06em `#7c8dac`, `.wfh-day-label` 11/600 ls 0.06em |
| Uppercase label S | 10px 700 uppercase | ls 0.04em `.dp-wd` (no transform), ls 0.05em `.tt-cal-head span`, ls 0.06em `.field-label` L631 / `.tt-stat-lbl` L325 / `.detail-stat-label` (600) L152, ls 0.07em `.ts-stat-label` L869, ls 0.08em `.sidebar-label` L515 & `.reminders-card-title` L501, ls 0.10em `.app-drop-section` L32 (`#a8b6cd`), `.dir-alpha-header` 11px 700 ls 0.1em no transform L694 |
| Field label (view mode) | 12px 500 `#a8b6cd` | `.fc-label` L195, `.pool-meta-label`, `.mf-label` |
| Field value | 14px 500 `#1a1a1a` (`.fc-value`), 12px 500 (`.fc-value.small`), 14px 600 (`.mf-value`, `.pool-meta-value`) | |
| Form label | 12px 500 `#7c8dac` (`.modal-label` L408); 12px 600 `#1a1a1a` (`.req-label` L926) | |
| Body / table cell | 14px 400 (`.emp-table td` inherits), 13px (tt, rv, req cells), 12px secondary | |
| Secondary meta | 12px 400 `#7c8dac` (`.emp-email`, `.drawer-email`, `.sp-role` 500, `.reminder-detail`); 11px 400 `#7c8dac` (`.req-type-desc`, `.tt-emp-dept`, `.profile-drop-email`) | |
| Badges / pills | 12px 600 pad 3px 10px (status, drawer dept, tt, rv 4px 10px); 12px 500 (`.dept-badge`); 11px 600-700 (`.req-status`, `.ev-badge`, `.wfh-prefs-badge`); 10px 700 uppercase ls 0.04em (`.wfh-status-pill`); 10px 700 ls 0.04em (`.app-drop-item-badge`, `.dir-you`) | |
| Buttons | 14px 500 (btn-primary/outline/cta), 14px 600 (cancel, tt-*, ts-btn), 13px 500 (btn-inline-add), 13px 600 (rv-btn, tt-fill-*), 12px 500 (btn-add-member) | |
| Tabs | 14px 500 `#7c8dac` -> active 600 `#005268` (`.detail-tab`); 14px 600 `#7c8dac` -> active 700 `#005268` (`.profile-tab`) | |
| Calendar text | 13px 700 lh 1.2 `.cc-hrs`; 10px 500 `.cc-time` (opacity 0.65 declared); 10px 600 `.cc-date`; 9.5px 600 `.cc-absent-lbl` | |
| Placeholder | colour `#a8b6cd` (inputs) / `#7c8dac` (`.search-input`, `.time-input`) / dark `#505a6c` | |
| Italic | only `.rv-details-note` (dead) | no italics rendered |

Line-heights (source): only the values 1, 1.1, 1.2, 1.4, 1.45, 1.5 (inherited body), 1.6 are ever set; buttons/inputs use `normal`. Letter-spacing values used: 0.02em, 0.04em, 0.05em, 0.06em, 0.07em, 0.08em, 0.10em/0.1em, `-0.3px` (`.sp-name`), `0`. No text-shadow. `text-overflow:ellipsis` on names/emails/stat values/table cells.

### 3.2 Every distinct computed text style (both modes)
Rows are unique (family, size/line-height, weight, letter-spacing, transform, decoration, style) tuples; "elements" is the number of unique rendered elements in the full crawl (light); the two colour columns show every colour seen with that tuple in light and dark (count of elements in parentheses). 77 tuples.
| # | family | size / line-height | weight | letter-spacing | transform | decoration | style | elements (light) | colour light (n) | colour dark (n) | sample selectors |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Geist | 12px / 18px | 500 | normal | none | none | normal | 491 | `#a8b6cd` (407), `#7c8dac` (45), `#2456a0` (9), `#0d7a5f` (9), `#a35c18` (7), `#0d6e7a` (4), `#6e42a0` (4), `#1a5a7a` (4), `#005268` (1), `#1a1a1a` (1) | `#505a6c` (403), `#8a97aa` (45), `#7aabff` (9), `#4ade80` (9), `#fb923c` (8), `#60baf0` (6), `#2dd4bf` (5), `#a78bfa` (4), `#0cb8d0` (1), `#e2e8f4` (1) | .dept-badge, .fc-label, .pool-meta-label, .mf-label |
| 2 | Geist | 14px / 21px | 600 | normal | none | none | normal | 413 | `#1a1a1a` (363), `#000000` (37), `#005268` (5), `#a8b6cd` (4), `#7c8dac` (4) | `#8a97aa` (244), `#e2e8f4` (160), `#0cb8d0` (5), `#505a6c` (4) | .emp-name, .fc-link, .manager-name, .modal-add-entry |
| 3 | Geist | 14px / 21px | 500 | normal | none | none | normal | 308 | `#000000` (212), `#1a1a1a` (58), `#a8b6cd` (35), `#005268` (1), `#7c8dac` (1), `#ffffff` (1) | `#e2e8f4` (110), `#7aabff` (80), `#22d3ee` (80), `#505a6c` (35), `#c8d4e8` (1), `#0cb8d0` (1), `#8a97aa` (1) | .nav-avatar, .drawer-role, .fc-value, .holder-avatar |
| 4 | Geist | 12px / 18px | 400 | normal | none | none | normal | 213 | `#7c8dac` (123), `#1a1a1a` (64), `#a8b6cd` (24), `#e5e7ec` (2) | `#8a97aa` (114), `#e2e8f4` (64), `#505a6c` (33), `rgba(255,255,255,0.28)` (2) | .emp-email, .drawer-email, .reminder-detail, .wfh-stat-label |
| 5 | Geist | 12px / 18px | 600 | normal | none | none | normal | 201 | `#179484` (45), `#7c8dac` (35), `#005268` (34), `#065f46` (28), `#1a1a1a` (15), `#92400e` (14), `#da4d43` (12), `#a8b6cd` (8), `#16a34a` (6), `#d97706` (4) | `#2dd4bf` (46), `#8a97aa` (35), `#34d399` (34), `#0cb8d0` (34), `#fbbf24` (18), `#e2e8f4` (15), `#f87171` (7), `#505a6c` (7), `#da4d43` (5) | .status-pill, .active-badge, .inactive-badge, .req-star |
| 6 | Geist | 14px / 21px | 400 | normal | none | none | normal | 172 | `#1a1a1a` (133), `#7c8dac` (22), `#a8b6cd` (13), `#000000` (4) | `#e2e8f4` (127), `#505a6c` (27), `#c8d4e8` (10), `#8a97aa` (8) | .nav-link, .cust-select__value, .req-success-sub, .upcoming-name |
| 7 | Geist | 14px / 21px | 700 | normal | none | none | normal | 140 | `#1a1a1a` (138), `#005268` (2) | `#e2e8f4` (138), `#0cb8d0` (2) | .section-band, .pool-name, span, .upcoming-date |
| 8 | Geist | 13px / 19.5px | 400 | normal | none | none | normal | 122 | `#1a1a1a` (99), `#7c8dac` (19), `#a8b6cd` (4) | `#e2e8f4` (84), `#8a97aa` (19), `#c8d4e8` (15), `#505a6c` (4) | .inline-list-empty, .tt-confirm-body, .tt-det-meta, .rv-submitted-str |
| 9 | Geist | 13px / 19.5px | 600 | normal | none | none | normal | 113 | `#1a1a1a` (111), `#005268` (2) | `#e2e8f4` (101), `#c8d4e8` (10), `#0cb8d0` (2) | .req-type-label, .tt-emp-name, td, .rv-dur-str |
| 10 | Geist | 13px / 19.5px | 500 | normal | none | none | normal | 112 | `#1a1a1a` (58), `#000000` (43), `#d0d7e3` (11) | `#e2e8f4` (88), `#c8d4e8` (13), `#2a3548` (11) | .tt-avatar, .manager-avatar, .rv-type-label, .app-drop-item-name |
| 11 | Geist | 14px / normal | 400 | normal | none | none | normal | 75 | `#1a1a1a` (67), `#7c8dac` (4), `#000000` (2), `#a8b6cd` (2) | `#e2e8f4` (69), `#8a97aa` (4), `#000000` (2) | .search-input, .modal-input, .modal-select, .datepicker-input |
| 12 | Geist | 10px / 15px | 600 | normal | none | none | normal | 70 | `#a8b6cd` (42), `#c8d0da` (18), `#b8c0cc` (8), `#f87171` (2) | `#505a6c` (42), `#c8d0da` (18), `#b8c0cc` (8), `#f87171` (2) | .cc-date |
| 13 | Geist | 13px / 19.5px | 700 | normal | none | none | normal | 47 | `#1a1a1a` (43), `#005268` (3), `#ffffff` (1) | `#e2e8f4` (43), `#0cb8d0` (3), `#ffffff` (1) | td, .profile-drop-name, .reminder-when, .dp-day |
| 14 | Geist | 13px / 15.6px | 700 | normal | none | none | normal | 46 | `#059669` (36), `#c8d0da` (6), `#d97706` (4) | `#34d399` (36), `#c8d0da` (6), `#fbbf24` (4) | .cc-hrs |
| 15 | Geist | 10px / 12px | 500 | normal | none | none | normal | 46 | `#059669` (36), `#c8d0da` (6), `#d97706` (4) | `#34d399` (36), `#c8d0da` (6), `#fbbf24` (4) | .cc-time |
| 16 | Geist | 11px / 16.5px | 400 | normal | none | none | normal | 45 | `#7c8dac` (45) | `#8a97aa` (45) | .req-type-desc, .tt-emp-dept, .profile-drop-email |
| 17 | Geist | 12px / 18px | 700 | 0.72px | uppercase | none | normal | 40 | `#a8b6cd` (28), `#7c8dac` (11), `#005268` (1) | `#505a6c` (28), `#8a97aa` (11), `#0cb8d0` (1) | .sorted, th, .fill-modal-label, .time-label |
| 18 | Geist | 12px / 18px | 700 | normal | none | none | normal | 34 | `#1a1a1a` (33), `#ffffff` (1) | `#e2e8f4` (33), `#0cb8d0` (1) | .day-name |
| 19 | Geist | 11px / 16.5px | 500 | normal | none | none | normal | 34 | `#a8b6cd` (33), `rgba(255,255,255,0.65)` (1) | `#8a97aa` (33), `rgba(12,184,208,0.75)` (1) | .day-date |
| 20 | Geist | 15px / 22.5px | 500 | normal | none | none | normal | 32 | `#000000` (32) | `#e2e8f4` (32) | .dir-avatar |
| 21 | Geist | 10px / 15px | 700 | 0.6px | uppercase | none | normal | 29 | `#a8b6cd` (29) | `#505a6c` (29) | .tt-stat-lbl, .field-label |
| 22 | Geist | 14px / normal | 500 | normal | none | none | normal | 22 | `#ffffff` (12), `#1a1a1a` (4), `#7c8dac` (3), `#005268` (2), `#a8b6cd` (1) | `#111214` (10), `#8a97aa` (3), `rgba(255,255,255,0.22)` (2), `#0cb8d0` (2), `#e2e8f4` (2), `#c8d4e8` (1), `rgba(255,255,255,0.18)` (1), `#505a6c` (1) | .btn-primary, .btn-cta, .ts-btn-primary, .detail-tab |
| 23 | Geist | 10px / 15px | 700 | 0.4px | uppercase | none | normal | 22 | `#1d4ed8` (16), `#179484` (6) | `#60a5fa` (16), `#2dd4bf` (6) | .wfh-status-pill |
| 24 | Geist | 16px / 24px | 800 | normal | none | none | normal | 18 | `#1a1a1a` (18) | `#e2e8f4` (18) | .left-title, #empCount, #poolCount, .member-name |
| 25 | Geist | 11px / 16.5px | 700 | 1.1px | none | none | normal | 17 | `#a8b6cd` (17) | `#505a6c` (17) | .dir-alpha-header |
| 26 | Geist | 14px / normal | 600 | normal | none | none | normal | 16 | `#7c8dac` (11), `#ffffff` (3), `#005268` (2) | `#8a97aa` (11), `#111214` (3), `#0cb8d0` (2) | .detail-tab, .calc-accrual-btn, .btn-cancel, .tt-confirm-cancel |
| 27 | Geist | 16px / 24px | 700 | normal | none | none | normal | 15 | `#1a1a1a` (14), `#7c8dac` (1) | `#e2e8f4` (14), `#8a97aa` (1) | .detail-stat-value, .modal-title, .tt-det-name, .wfh-month-label |
| 28 | Geist | 10px / 15px | 700 | 0.5px | uppercase | none | normal | 14 | `#a8b6cd` (10), `#d1d5db` (4) | `#505a6c` (10), `#2a3548` (4) | span, .tt-wknd |
| 29 | Geist | 13px / normal | 600 | normal | none | none | normal | 14 | `#16a34a` (7), `#dc2626` (7) | `#34d399` (7), `#f87171` (7) | .rv-btn-approve, .rv-btn-deny |
| 30 | Geist | 18px / 18px | 400 | normal | none | none | normal | 11 | `#1a1a1a` (10), `#005268` (1) | `#c8d4e8` (10), `#0cb8d0` (1) | .opt-flag |
| 31 | monospace | 14px / 21px | 600 | normal | none | none | normal | 10 | `#005268` (10) | `#0cb8d0` (10) | .mf-value |
| 32 | Geist | 10px / 15px | 400 | normal | none | none | normal | 9 | `#a8b6cd` (7), `#c4cdd9` (2) | `#505a6c` (9) | span, .mini-bar-label |
| 33 | Geist | 11px / 16.5px | 700 | 0.77px | uppercase | none | normal | 8 | `#a8b6cd` (4), `#92400e` (2), `#7c8dac` (2) | `#505a6c` (4), `#fbbf24` (2), `#8a97aa` (2) | .tt-fillall-lbl, .tt-section-lbl, .tt-cal-title |
| 34 | Geist | 10px / 15px | 700 | 0.4px | none | none | normal | 8 | `#a8b6cd` (7), `#005268` (1) | `#505a6c` (7), `#0cb8d0` (1) | .app-drop-item-badge, .dp-wd |
| 35 | Geist | 11px / 16.5px | 700 | 0.66px | uppercase | none | normal | 7 | `#7c8dac` (7) | `#505a6c` (7) | .wfh-cal-daylabel |
| 36 | Geist | 14px / 14px | 500 | normal | none | none | normal | 6 | `#1a1a1a` (3), `#e2e8f4` (3) | `#e2e8f4` (6) | .phone-flag, .phone-code-val |
| 37 | Geist | 18px / 21.6px | 800 | normal | none | none | normal | 5 | `#1a1a1a` (5) | `#e2e8f4` (5) | .drawer-name, .tt-stat-val |
| 38 | Geist | 10px / 15px | 700 | 0.8px | uppercase | none | normal | 5 | `#a8b6cd` (5) | `#505a6c` (5) | .sidebar-label, .reminders-card-title |
| 39 | Geist | 14px / 20.3px | 500 | normal | none | none | normal | 5 | `#1a1a1a` (4), `#b0b8c8` (1) | `#e2e8f4` (4), `#8a97aa` (1) | .sidebar-text |
| 40 | Geist | 11px / 16.5px | 600 | 0.66px | uppercase | none | normal | 5 | `#7c8dac` (5) | `#8a97aa` (5) | .wfh-day-label |
| 41 | Geist | 12px / 18px | 600 | 0.72px | uppercase | none | normal | 5 | `#a8b6cd` (5) | `#505a6c` (5) | .period-divider |
| 42 | Geist | 10px / 15px | 600 | 0.6px | uppercase | none | normal | 4 | `#a8b6cd` (4) | `#505a6c` (4) | .detail-stat-label |
| 43 | Geist | 16px / normal | 400 | normal | none | none | normal | 4 | `#1a1a1a` (2), `#7c8dac` (2) | `#e2e8f4` (2), `#8a97aa` (2) | .tt-fillall-input, .modal-close |
| 44 | Geist | 9.5px / 14.25px | 600 | normal | none | none | normal | 4 | `#a8b6cd` (2), `#dc2626` (2) | `#505a6c` (2), `#f87171` (2) | .cc-absent-lbl |
| 45 | Geist | 18px / 27px | 400 | normal | none | none | normal | 3 | `#1a1a1a` (3) | `#e2e8f4` (3) | .reminder-icon |
| 46 | Geist | 13px / normal | 400 | normal | none | none | normal | 3 | `#1a1a1a` (3) | `#e2e8f4` (3) | .dir-search, .dir-select |
| 47 | Geist | 18px / 27px | 800 | normal | none | none | normal | 3 | `#005268` (3) | `#0cb8d0` (3) | .modal-title |
| 48 | Geist | 14px / 21px | 600 | normal | none | underline | normal | 2 | `#000000` (2) | `#c8d4e8` (2) | .nav-link |
| 49 | Geist | 18px / 27px | 500 | normal | none | none | normal | 2 | `#a8b6cd` (1), `#000000` (1) | `#505a6c` (1), `#e2e8f4` (1) | .drawer-avatar, .sp-avatar |
| 50 | Geist | 13px / normal | 500 | normal | none | none | normal | 2 | `#ffffff` (2) | `#111214` (2) | .btn-inline-add |
| 51 | Geist | 12px / normal | 500 | normal | none | none | normal | 2 | `#ffffff` (2) | `#111214` (2) | .btn-add-member |
| 52 | Geist | 16px / 24px | 500 | normal | none | none | normal | 2 | `#000000` (2) | `#e2e8f4` (2) | .tt-det-avatar |
| 53 | Geist | 10px / 15px | 700 | 1px | uppercase | none | normal | 2 | `#a8b6cd` (2) | `rgba(255,255,255,0.28)` (2) | .app-drop-section |
| 54 | Geist | 22px / 22px | 700 | normal | none | none | normal | 2 | `#1a1a1a` (2) | `#e2e8f4` (2) | .wfh-stat-num |
| 55 | Geist | 16px / 24px | 400 | normal | none | none | normal | 2 | `#a8b6cd` (1), `#7c8dac` (1) | `#505a6c` (1), `#8a97aa` (1) | .req-date-sep, .modal-close |
| 56 | Geist | 10px / 15px | 700 | 0.7px | uppercase | none | normal | 2 | `#a8b6cd` (2) | `#505a6c` (2) | .ts-stat-label |
| 57 | Lexend Exa | 18px / 18px | 400 | normal | none | none | normal | 1 | `#000000` (1) | `#e2e8f4` (1) | .nav-wordmark |
| 58 | Lexend Exa | 14px / 14px | 400 | normal | none | none | normal | 1 | `#7c8dac` (1) | `#7c8dac` (1) | .nav-sub |
| 59 | Geist | 12px / 18px | 600 | 0.24px | none | none | normal | 1 | `#7c8dac` (1) | `#8a97aa` (1) | .record-badge |
| 60 | Geist | 20px / 30px | 800 | normal | none | none | normal | 1 | `#005268` (1) | `#0cb8d0` (1) | .req-success-title |
| 61 | Geist | 17px / 25.5px | 700 | normal | none | none | normal | 1 | `#005268` (1) | `#0cb8d0` (1) | .tt-fillall-title |
| 62 | Geist | 15px / 22.5px | 700 | normal | none | none | normal | 1 | `#1a1a1a` (1) | `#e2e8f4` (1) | .tt-confirm-title |
| 63 | Geist | 16px / 19.2px | 800 | -0.3px | none | none | normal | 1 | `#1a1a1a` (1) | `#e2e8f4` (1) | .sp-name |
| 64 | Geist | 12px / 17.4px | 500 | normal | none | none | normal | 1 | `#a8b6cd` (1) | `#a8b6cd` (1) | small |
| 65 | Geist | 12px / 17.4px | 400 | normal | none | none | normal | 1 | `#a8b6cd` (1) | `#505a6c` (1) | .field-note |
| 66 | Geist | 11px / 16.5px | 700 | normal | none | none | normal | 1 | `#179484` (1) | `#2dd4bf` (1) | .wfh-prefs-badge |
| 67 | Geist | 12px / 16.8px | 400 | normal | none | none | normal | 1 | `#7c8dac` (1) | `#8a97aa` (1) | .wfh-prefs-sub |
| 68 | Geist | 26px / 39px | 800 | normal | none | none | normal | 1 | `#005268` (1) | `#0cb8d0` (1) | .request-page-title |
| 69 | Geist | 14px / normal | 700 | normal | none | none | normal | 1 | `#1a1a1a` (1) | `#e2e8f4` (1) | .bal-sidebar-date |
| 70 | Geist | 26px / 28.6px | 800 | normal | none | none | normal | 1 | `#005268` (1) | `#0cb8d0` (1) | .ts-stat-value |
| 71 | Geist | 20px / 22px | 800 | normal | none | none | normal | 1 | `#005268` (1) | `#0cb8d0` (1) | .ts-stat-value |
| 72 | Geist | 10px / 15px | 700 | normal | none | none | normal | 1 | `#005268` (1) | `#0cb8d0` (1) | .dir-you |
| 73 | Geist | 28px / 42px | 800 | normal | none | none | normal | 1 | `#005268` (1) | `#0cb8d0` (1) | .calc-result-number |
| 74 | Geist | 18px / 27px | 700 | normal | none | none | normal | 1 | `#1a1a1a` (1) | `#e2e8f4` (1) | .modal-day-label |
| 75 | Geist | 21px / 31.5px | 500 | normal | none | none | normal | 1 | `#000000` (1) | `#e2e8f4` (1) | .emp-qcard-avatar |
| 76 | Geist | 18px / 21.6px | 700 | normal | none | none | normal | 1 | `#1a1a1a` (1) | `#e2e8f4` (1) | .emp-qcard-name |
| 77 | Geist | 13px / 18.2px | 400 | normal | none | none | normal | 1 | `#7c8dac` (1) | `#8a97aa` (1) | .emp-qcard-sub |


## 4. RADII, BORDERS, SHADOWS, MOTION, Z-INDEX, OPACITY

### 4.1 Radii (source, counts of declarations)
`4px` x125 (everything: cards, buttons, inputs, badges, dropdowns, modals, tabs, table wraps, nav dropdown), `50%` x22 (avatars, nav-avatar, round close buttons `.tt-fillall-close`, `.modal-backdrop .modal-close`, `.emp-qcard-close`, `.bal-action-btn`, `.entry-remove`, `.req-success-icon`, today dot in WFH cell, announce-dot, section dot), `2px` x7 (scrollbar thumbs 2px; `.wfh-legend-dot` 2px), `8px` x1 (`.dm-switch`), `2px 3px 0 0` (`.mini-bar`), partial `4px 0 0 4px` / `0 4px 4px 0` (`.phone-code-btn`, `.phone-number-input`), `4px 4px 0 0`/`0 0 4px 4px` (`.phone-code-opt` first/last), `0` (`#panel-myinfo .card`). No radius above 4px except the 8px switch and 50% circles. Computed set (light and dark identical): 4px (694 elements), 50% (151), `2px 3px 0 0` (7), `4px 0 0 4px` (3), `0 4px 4px 0` (3), 2px (2), 8px (1).

### 4.2 Border widths/colours by class (source)
- `1px solid #e5e7ec`: top-nav bottom, nav-avatar, page-center, split-left right, left-header/detail-header/stat-bar/tabs bottom, inputs/triggers/search/select/datepicker/phone wrap, tables (th bottom, td bottom), cards, modal panels, dropdowns, toolbars, section-band top and bottom, records-table-wrap top, calendars, `.rv-*`, `.tt-*`, `.hist-*`.
- Row separators: `#e5e7ec` (emp/rv/tt/records main tables, member-card, pool-row), `#f0f0f2` (`.records-table td`, only use), `#f5f5f8` (`.req-table td`, `.hist-table td`, `.upcoming-row`, `.day-row`, `.bal-sidebar-item`), `#f0f1f4` (tt calendar cell grid, `.sidebar-divider` bg).
- Strong: `1px solid #c4cdd8` cancel buttons (x7). `1px solid #16a34a` / `#dc2626` approve/deny.
- 1.5px: `1.5px solid #e5e7ec` (`.wfh-day-box`, `.modal-close` B, `.emp-qcard-close`, `.bal-action-btn`), `1.5px solid #005268` (`.btn-req-send`, `.calc-accrual-btn`, `.btn-close-calc`, `.req-success-btn-new`(dead)), `1.5px solid #a8b6cd` (`.btn-save` disabled), `1.5px solid rgba(255,255,255,0.4)` (`.btn-discard-bar`), `1.5px solid #fde8e6` (`.entry-remove`), `1.5px solid #c1ecf0` (`.dp-day.today`).
- 2px: `.req-type-btn` `2px solid #e5e7ec` / selected `#005268` (L816-818); tab underline `2px solid transparent` -> `#005268` (`.detail-tab`, margin-bottom -1px); `.profile-tab` underline `2.5px` (L534, computed 2px at DPR 1.5 rounding).
- 3px: `.pool-row.active{border-left:3px solid #005268}`; `inset 3px 0 0 #005268` active-row marker on first cell (emp-table L114, tt-table L300).
- Avatar ring `1px solid rgba(0,0,0,0.30)` x11; inactive `#a8b6cd`.
- Dark border values: see 2.1 and Appendix A.

### 4.3 Shadows (source; all box-shadows in the file)
| value | used by | dark value |
|---|---|---|
| `0 2px 8px rgba(0,0,0,0.06)` x5 | `.page-center`, `#requests-view`, `#timetracking-view`, `.sidebar`, `.reminders-card` | page-center -> `0 4px 24px rgba(0,0,0,0.50)`; sidebar/reminders -> `none`; requests/timetracking view unchanged (0.06) |
| `0 2px 8px rgba(0,0,0,0.05)` x4 | `.emp-table-wrap`, `#hrReqList`, `.tt-inner-card`, `.content-card-wrap` | `none` (emp-table-wrap, hrReqList, tt-inner-card, content-card-wrap) |
| `0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)` x4 | `.app-drop`, `.profile-drop`, `.cust-select__panel`, `.datepicker-cal` | `0 8px 32px rgba(0,0,0,0.50)` |
| `0 8px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)` | `.phone-code-drop` | `0 8px 24px rgba(0,0,0,0.50)` |
| `0 6px 20px rgba(0,0,0,0.12)` | `.pool-emp-drop` | `0 6px 20px rgba(0,0,0,0.50)` |
| `0 8px 40px rgba(0,0,0,0.16)` | `.modal` (system A) | unchanged (no dark rule) |
| `0 8px 40px rgba(0,0,0,0.14)` | `.tt-fillall-box` | unchanged |
| `0 8px 32px rgba(0,0,0,0.14)` | `.tt-confirm-box` | unchanged |
| `0 24px 60px rgba(0,0,0,0.2)` | `.emp-qcard`, `.modal-backdrop .modal` | `0 24px 60px rgba(0,0,0,0.60)` |
| `0 24px 64px rgba(0,0,0,0.30)` | `.req-success-card` | `0 24px 64px rgba(0,0,0,0.60)` |
| `0 1px 3px rgba(0,0,0,0.20)` | `.dm-thumb` | unchanged |
| `0 0 0 3px rgba(0,82,104,0.12)` x11 (focus ring) | search, modal-input/select, field-value, datepicker-input, ts-select, fill-modal-input, req-*, time-input, phone-wrap:focus-within | `0 0 0 3px rgba(12,184,208,0.12)` |
| `0 0 0 3px rgba(0,82,104,0.10)` | `.dir-search:focus` | `rgba(12,184,208,0.10)` |
| `0 0 0 2px rgba(0,82,104,0.1)` x2 | `.tt-fill-input:focus`, `.tt-fillall-input:focus` | `0 0 0 2px rgba(12,184,208,0.12)` |
| `inset 3px 0 0 #005268` | `tr.active-row td:first-child` (emp), `tr.tt-selected td:first-child` | `inset 3px 0 0 #0cb8d0` |
Computed confirmation and element counts: Appendix C. No `filter`, no `drop-shadow`, no gradients (grep `gradient` = 0 in the whole file; the logo SVG uses blurred shapes only). One `backdrop-filter: blur(6px)` (success backdrop L969).

### 4.4 Transitions & animation (source; all declared, easing is always the default `ease` unless noted)
| duration | property | used by |
|---|---|---|
| 0.10s | background | `.app-drop-item`, `.pool-emp-drop-item`, `.pool-row`, `.phone-code-opt`, `.dp-day`, `.dp-year-item`, `.dir-row`, `.wfh-cell`, `.profile-drop-item`; `all` on `.dept-chip`(dead); `color` on `.dir-name` |
| 0.12s | background, opacity, border-color, color, `all` | buttons (`opacity` on filled buttons, `background` on cancels, `border-color,color` on `.btn-outline`), `.detail-tab` (`color,border-color`), `.modal-close`, `.eqa-btn`, `.wfh-nav-btn`, `.cust-select__trigger` (border-color), `.modal-input` (`border-color,box-shadow`), `.req-tab`, `.req-type-btn`, `.wfh-day-box` (`all`), `.dir-search` |
| 0.15s | border-color, box-shadow, color, transform, opacity | `.field-value`/`.datepicker-input`/`.phone-input-wrap` (`border-color 0.15s,box-shadow 0.15s`), `.req-date-input`, `.time-input`, `.bal-action-btn`, `.profile-tab`/`.back-link` (color), `.cust-select__chevron` + `.phone-drop-arrow` (transform), `.tt-fillall-overlay`/`.tt-confirm-overlay` (opacity) + boxes (transform 0.15s), `.btn-save-bar` (opacity), `.dp-nav` |
| 0.18s | opacity, transform, background | `.modal-overlay` (opacity), `.modal` (transform translateY 10px->0), `.dm-switch` (background), `.dm-thumb` (transform translateX 14px) |
| 0.20s | opacity, transform | `.toast` (`opacity 0.2s,transform 0.2s`; `translateX(-50%) translateY(16px)` -> `translateY(0)`; shown 2800ms by `showToast()` L5010) |
| 0.25s | opacity | `.req-success-backdrop` |
| none | | `.modal-backdrop` open/close (display toggle), `.modal-backdrop .modal` (`transition:none;transform:none`) |
- Keyframes: only `@keyframes dir-flash{0%{background:#e8f4f7}60%{background:#e8f4f7}100%{background:transparent}}` (L731) used as `animation:dir-flash 1.4s ease-out` on `.dir-row-highlight` (the only non-default easing; added by JS L3066 when jumping to a manager in Directory).
- Hover opacity: filled buttons `opacity:0.85`; `.nav-link:hover` 0.7; `.nav-apps-icon` 0.7->1; `.add-entry-link:hover` 0.75; `.modal-add-entry:hover` 0.75; `.hist-range-icon` 0.7->1.
- Dark-only transition changes: none. No `prefers-reduced-motion` handling. Transition hover patterns are applied uniformly in both modes.

### 4.5 z-index map (source)
`1` sticky table headers (`.rv-table th`, `.tt-table th`, `.req-table th`, `.hist-table th`) < `10` `.save-bar` < `50` `#myprofile-view` < `100` `.top-nav` < `200` `.datepicker-cal` < `300` `.phone-code-drop`, `.emp-qcard-backdrop` < `500` `.cust-select__panel` < `800` `.modal-backdrop` < `900` `.modal-overlay`, `.req-success-backdrop` < `1000` `.tt-fillall-overlay`, `.tt-confirm-overlay` < `9000` `.app-drop`, `.profile-drop` < `9999` `.pool-emp-drop`, `.toast`.
Note: the quick card (300) sits below the modal-backdrop (800) and below the datepicker context only because they are never open together; `.cust-select__panel` 500 sits above the datepicker 200.

### 4.6 Opacity usage (source)
`0.85` hover on filled buttons (x9); `0.7` nav-link hover and apps/range icon rest; `0.65` `.cc-time` and `input[type=date]` indicator hover; `0.75` add-entry hovers; `0.45` `.pool-badge.grey` and inline disabled buttons (`style="opacity:0.45;cursor:not-allowed"` on `#wfhPrefsBtn`, `#resetWFHBtn`, `#saveWFHBtn`); `0.42` `.app-drop-item-noaccess`; `0.4` `.sort-icon` rest (1 when sorted); `0.38` date-picker indicator rest; `0.3` `.wfh-cell.faded`; `0`/`1` overlay fades. Dark disabled buttons: `opacity:1!important` with explicit colours (`#26292e`, `rgba(255,255,255,0.22)`/`0.18`).

## 5. SPACING & SIZES

### 5.1 Spacing values observed (source; declaration counts)
- Padding: `0 12px` x13 (triggers/small buttons), `3px 10px` x11 (badges), `0 20px` x8 (cancel buttons), `12px 16px` x8 (table cells, tabs), `16px` x6 (scroll lists), `0 14px` x5 (btn-primary/outline), `0 24px` x5 (cta, tabs), `16px 24px` x5 (modal footer, detail footer, body-wrap), `20px 24px` x5 (modal header, member-card), `6px 0` x4 (dropdown shells), `24px` x4 (detail header, modal body), `8px 16px` x4 (req/hist table cells), `10px 16px` (select options, tt cells), `14px 20px` (detail-stat, pool-row), `10px 24px` (records th, save bar), `12px 20px` (holder-row, toast), `18px 20px`, `18px 24px`, `0 28px`, `16px 20px`, `20px 20px 12px` (left-header), `2px 6px` (mini badges), `3px 8px` (record-badge), `4px 10px` (rv-status), `6px 14px` (pool-badge), `9px 14px` (app-drop-item), `9px 16px` (profile-drop-item), `8px 14px` (phone option), `40px 36px 32px` (success card), `28px` (quick card), `24px 24px 20px` (confirm box).
- Gap values: `10px` x26, `8px` x22, `6px` x20, `12px` x16, `14px` x12, `4px` x9, `16px` x8, `2px` x5, `20px` x2, `5px`, `7px`, `24px`, `32px`, `80px` (`.nav-left`), grid gaps `20px 24px` (`.fields-grid`), `14px 16px` (`.modal-grid`), `16px 24px` (`.member-fields`), `12px` (summary grids), `2px` (datepicker days).
- Margins: `12px 0` (the three `.page-center`-like containers), `4px 0` (dropdown dividers), `10px 0` sidebar divider, `8px 0` period divider, `-24px -24px 24px` save-bar, `0 -16px` (`.dir-row`), `0 auto` body-wrap.
- Scale actually present: 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 18, 20, 22, 24, 28, 32, 36, 40, 60 (not a clean 4px scale).

### 5.2 Fixed control heights / widths (source; confirmed computed where marked)
| thing | size | lines |
|---|---|---|
| top nav | height 74px, padding `0 40px`, `position:fixed` z 100 | L17 |
| nav logo mark | 32x32 (rx 4); apps icon 24x24 | L1727-1728 |
| nav gap | `.nav-left` gap 80px; `.nav-logo-wrap` 16px; `.nav-links` gap 32px; `.nav-right` 10px | L18-27 |
| nav avatar | 42x42 circle | L28 |
| app dropdown | width 226px, top 82px, left 40px, radius 4, padding `6px 0` | L30 |
| profile dropdown | width 220px, top 82px, right 40px | L1029 |
| buttons | `btn-primary/outline` h36 (pad 0 14); `btn-cancel/btn-cta/tt-btn-*/ts-btn*/btn-req-cancel` h38; `btn-req-send/btn-save/btn-close-calc/req-success-btn*` h40; `btn-save-bar/discard` h34; `rv-btn-approve/deny`, `btn-add-member` h30 (add-member pad 0 10); `tt-fill-save/cancel`, `tt-fill-input` h32; `btn-inline-add` h40; icon buttons `eqa-btn` 32x32, `modal-close` 32x32, `inline-list-item-remove` 24x24, `bal-action-btn` 28 circle, `dp-nav` 28, `wfh-nav-btn` 32 | |
| inputs | `search-input`, `cust-select__trigger`, `modal-input/select`, `field-value`, `datepicker-input`, `phone-input-wrap`, `time-input`, `ampm-select`, `req-*` inputs, `fill-modal-input`, `ts-select`: **40px**; `dir-search`, `dir-select`: 38px; `hist-range-picker` 36px; `tt-fillall-input` 44px (16px text); `tt-fill-input` 32px | |
| custom select widths | dept 152, office 124, status 114, group 136 (employee); pool company 138, team 120, desk 112, group 136; search-wrap flex 1, min 180, max 220 (RV/TT search max 300 inline) | L86-89, 480-483 |
| avatars | 28 (`req-icon-sm` square), 30 (`rv-type-icon`/`period-icon`/`bal-sidebar-icon` squares), 32 (manager), 34 (`tt-avatar`), 36 (`emp-avatar`, `rv-avatar`), 38 (`holder-avatar`, `ev-avatar`, `reminder-icon` sq), 42 (nav), 44 (`dir-avatar`, `tt-det-avatar`, `calc-user-avatar` sq 4px), 48 (`drawer-avatar`), 52 (`sp-avatar`), 64 (`emp-qcard-avatar`, `req-success-icon`) | |
| table rows (computed, DPR1.5; nominal = +0.33..0.67) | emp-table row 64.67 (padding 12px 16px; 2-line name/email cell, avatar 36), th 42.33 (12 + 18 + 12), rv-table td 60.67, tt-table th 42.33, tt-table td padding 10px 16px | |
| stat bar | `.detail-stat` padding 14px 20px, value 16px, label 10px; bar height 71.67 (computed) | |
| detail header | padding 24px, gap 14px, height 123-175px depending on width | |
| tab height | `.detail-tabs` 43.67 (padding 12px 16px, 14px text); `.content-tabs` 48.67 (padding 13px 18px) | |
| modal widths | A `.modal` 740 (max-height 82vh); B `.modal-backdrop .modal` 560 (max 94vw); `tt-fillall-box` 420; `tt-confirm-box` 340; `req-success-card` 360 (max 92vw); `emp-qcard` 520; datepicker 280; phone drop min 200/max-h 240; pool-emp-drop max-h 200; `request-balance-sidebar` 320; `left-col` 360 (sidebar 350 computed); `timesheet-sidebar` 190; `.profile-drop` 220; `.tt-list-panel` flex 0 0 56% | |
| other | `.tt-cal-cell` min-height 78; `.wfh-cell` 8px padding; `.dir-row` grid `68px 1fr 1fr 260px`; `.fields-grid` 3 cols `1fr 1fr 1fr`, padding `12px 24px 24px`, gap `20px 24px`; `.modal-grid` 3 cols gap `14px 16px`; `.member-fields` 3 cols; `.today-grid` `1fr 280px`; `.dm-switch` 32x18 (thumb 14, travel 14px); `.dp-day` 34h; `.dp-year-grid` 4 cols | |

Full class-by-class computed box table: Appendix B.

### 5.3 Layout skeleton
- `.top-nav` fixed 74px. `.page{padding-top:74px;height:100vh;display:flex;overflow:hidden;padding-left:210px;padding-right:210px}` (L43) - the 210px side gutters are FIXED at every viewport width (no media queries), so content width = viewport - 420px.
- Content containers (`#emp-view`, `#pool-view` = `.page-center`; `#requests-view`, `#timetracking-view` same box): `flex:1; margin:12px 0; border:1px solid #e5e7ec; border-radius:4px; box-shadow:0 2px 8px rgba(0,0,0,0.06); overflow:hidden; background #fff`.
- Employee/Pool split: `.split-left{width:54%;flex-shrink:0;border-right:1px solid #e5e7ec}` | `.split-right{flex:1}`. Time Tracking: list panel `flex:0 0 56%` | detail panel flex 1. Requests: single full-width table.
- Left panel stack: `.left-header` (padding `20px 20px 12px`, bottom border) containing title row (margin-bottom 14px) + toolbar (gap 8px, wrap), then `.emp-list-scroll` (padding 16px) holding `.emp-table-wrap` (bordered card, radius 4, shadow `0 2px 8px rgba(0,0,0,0.05)`); header table uses `display:table` thead + scrolling `tbody{display:block;overflow-y:scroll;scrollbar-gutter:stable}`.
- Right panel stack: `.detail-header` > `.detail-stat-bar` (4 equal cells) > `.detail-tabs` > `.tab-body` (scroll) containing `.section-band` + `.fields-grid` pairs.
- My Profile: `#myprofile-view{position:fixed;top:74px;left:0;right:0;bottom:0;overflow-y:auto;background:#f5f5f8;z-index:50}`; `.body-wrap{max-width:1400px;margin:0 auto;padding:16px 24px;gap:20px}`; `.left-col{width:360px;position:sticky;top:90px;max-height:calc(100vh - 106px);gap:12px}`; `.content{flex:1}`; `.content-card-wrap{height:calc(100vh - 108px)}`; `.ws-panel.active{display:block;overflow-y:auto}` padding `20px 24px 24px`; tabs bar `padding 0 24px`.
- Media queries / breakpoints: none (0). Measured layout at four viewport widths (computed; x, y, w, h; left padding 210 -> `#emp-view` is 210px from the left edge; widths shown include the 15px scrollbar the body reserves):

| element | 1024 | 1280 | 1440 | 1920 |
|---|---|---|---|---|
| `.top-nav` | 1008.67x74 | 1264.67x74 | 1424.67x74 | 1904.67x74 |
| `#emp-view` | 588.67x802 | 844.67x802 | 1004.67x802 | 1484.67x802 |
| `.split-left` w | 317.16 | 455.4 | 541.79 | 801 |
| `.split-right` w | 270.18 | 387.94 | 461.54 | 682.33 |
| `.detail-header` h | 175.26 | 149.26 | 149.26 | 123.26 |
| `.fields-grid` w | 260.18 | 377.94 | 451.54 | 672.33 |
| `#myprofile .body-wrap` w | 1008.67 | 1264.67 | 1400 | 1400 |
| `.left-col` w | 360 | 360 | 360 | 360 |
| `.content-card-wrap` w | 580.67 | 836.67 | 972 | 972 |
At 1024 the employee table header cells collapse to 0px width (table-layout fixed inside a 284px wrapper): the app is not usable below ~1280px.

## 6. INVENTORY (views, overlays, components)

### 6.1 Views and how they are reached
| view | root DOM | css | reached by |
|---|---|---|---|
| Employee list + detail (default) | `#emp-view.page-center` > `.split-left` (`#empBody`, `#empCount`, `.toolbar`, `#cs-dept/#cs-office/#cs-status/#cs-group`) + `#splitRight` (`#detailEmpty`, `#detailContent`: `.detail-header` (`#dAvatar #dName #dPill #dRole #dRec #dDept #dEmail`), `.detail-stat-bar`, `.detail-tabs` Overview/Jobs/Records/Timesheet, panes `#tab-overview #tab-jobs #tab-records #tab-timesheet`) | L42-230 | nav link "Employee" `#nav-employee` (`showEmployeeView()`), app menu "HR", default on load; click a row |
| Pool | `#pool-view.page-center` > `.split-left` (`#poolsList`, filters `#pool-cs-company/-team/-desk/-group`, `#poolCount`) + `#poolSplitRight` | L419-483 | nav "Pool" `#nav-pool` |
| Time Tracking | `#timetracking-view` (`.tt-header`, `.tt-body` > `.tt-list-panel` (`#ttTableWrap`) + `.tt-detail-panel` (`#ttDetailEmpty`, `#ttDetailInner` > `#ttDetailScroll`, `#ttDetailFooter`)) | L280-387 | nav "Time Tracking" `#nav-timetracking` |
| Requests (HR) | `#requests-view` (`.rv-header`, `.rv-list` > `#hrReqList`) | L232-278 | nav "Requests" `#nav-requests` |
| My Profile / My Info | `#myprofile-view` > `.body-wrap` > `.left-col` (`.sidebar`, `.reminders-card#upcomingTimeOffCard`) + `.content` > `.content-card-wrap` > `.content-tabs` (data-tab `myinfo` "Information", `wfh` "WFH Schedule", `timeoff` "Time Off", `timesheet` "Timesheets") + panels `#panel-myinfo`, `#panel-wfh`, `#panel-timeoff`, `#panel-timesheet` | L485-548 + panels' blocks | app launcher (apps icon, `toggleAppDrop()`) -> "My Profile"; in HR nav switch: nav shows "My Info"/"People" (`#myprofile-nav-links`) |
| People / Directory | `#panel-directory` (inside `#myprofile-view`, side column and tabs hidden by `wsSwitchSection('people')`) | L676-709 | nav link "People" `#nav-people` in My Profile mode |
| Time Off request page | `.timeoff-request-view` inside `#panel-timeoff` (`.request-layout`, `.request-form-wrap`, `.request-balance-sidebar`) | L918-962 | Time Off tab -> balance card icons (`showRequestView`) |
| Today | `#panel-today` | L552-583 | NOT reachable (hard-hidden) |
Nav sub-label switches "HR" <-> "My Profile". There is no login screen, no settings page, no 404 in this file.

### 6.2 Overlays / transient components
| component | DOM | css | trigger |
|---|---|---|---|
| App launcher dropdown | `#appDrop.app-drop` (sections "Platform Apps", "No Access"; items `.app-drop-item(-current/-noaccess)`, badge "Current") | L29-40 | apps icon in nav |
| Profile dropdown (+ dark-mode switch) | `#profileDrop.profile-drop`, `.dm-switch#dmSwitch` | L1028-1042 | nav avatar `PR` |
| Custom select | `.cust-select` > `.cust-select__trigger` + `__panel` + `__option(.selected)` | L74-89 | filter toolbars, modals |
| Phone country-code picker | `.phone-input-wrap` > `.phone-code-wrap` > `.phone-code-btn` + `.phone-code-drop` | L588-609 | My Info / New Employee phone fields |
| Datepicker (3 instances: `dp*`, `rdp*` request, `nedp*` new employee) | `.datepicker-wrap`, `.datepicker-cal`, `.dp-*` | L645-674 | date inputs |
| Pool member/holder autocomplete | `.pool-emp-drop` | L473-479 | pool modals |
| New Employee modal | `#empModal.modal-overlay` (3-col `.modal-grid`) | L389-417 | "New Employee" button (L1789 `openEmpModal()`) |
| New Pool / Add holder / Add member modals | `#poolModal`, `#holderModal`, `#memberModal` `.modal-overlay` | L389-417, 458-470 | "New Pool"; `.btn-add-member` in pool-detail section headers (L4439-4440) |
| Request modal | `#reqModal.modal-overlay` (`.req-type-grid`, `#reqFormBody`) | L811-821 | Time Off tab "New Request" button (L2799) |
| Request success | `#reqSuccessBackdrop` | L969-979 | after submit |
| Fill workdays / Calculate time off / Timesheet entry | `#fillModal`, `#calcModal`, `#tsModal` `.modal-backdrop` | L964-1023 | `#fillModal`: `.ts-btn-primary` in Timesheets sidebar (L2743); `#calcModal`: calculator icon on Time Off balance cards (L2762, 2781); `#tsModal`: `.day-row` add-entry in Timesheets (L2683-2720) |
| Fill hours (TT) | `#ttFillBar.tt-fill-bar` (inline bar), `#ttFillAllOverlay` | L345-373 | `#ttFillBar`: click a Missing calendar cell (`openFillHours` L4134); `#ttFillAllOverlay`: `.tt-btn-fill-all` (`openFillAllModal` L4076) |
| Approve confirm | `#ttConfirmOverlay` | L375-386 | TT approve |
| Employee quick card | `#empQCard.emp-qcard-backdrop` > `.emp-qcard` | L710-732 | click a name in People/Directory (`openEmpCard`, L4713) |
| Toast | `#toast.toast(.show)` | L825-827 | `showToast()` |
| Save bar | `.save-bar(.visible)` sticky at top of My Info | L638-644 | editing My Info fields |

### 6.3 Component families present (by DOM evidence)
Buttons (primary, outline, cta, cancel, ghost-outline-brand `btn-req-send/btn-close-calc/calc-accrual-btn/btn-save.ready`, approve/deny, icon-only circles/squares, save-bar pair); text input, search input, custom select, native select (3 styled variants: modal-select, field-value select, ts/ampm/dir-select), date input native + custom datepicker, time input, number input, textarea (one unstyled), checkbox (custom `wfh-day-check` day boxes only), phone input; tabs (underline: `detail-tab`, `profile-tab`; pill-ish: `req-tab`); badges/pills (dept, status, request status, tt status, wfh, pool, dir-you, count badges); avatars (initials, outlined); tables (emp, records, rv, tt, req, hist; sticky th, sortable th with `.sort-icon`, group-header rows, `.is-new` row tint, `.na-row` inactive rows); cards (card/card-header/card-title/card-body, sidebar, reminders, balance, stat, prefs, pool-right-section, member-card, inner-card); section band + fields grid (label-above-value); calendars (tt monthly grid, wfh monthly grid, datepicker); stat bar / stat tiles / mini bar chart; empty states (detail-empty, tt-detail-empty, pool-empty-state, rv-empty, req-empty, timesheet-ph, inline-list-empty); toggle switch (dm-switch); dropdown menus (app, profile, select panel, phone drop, autocomplete); modal (3 systems) + confirm box + success card; toast; scrollbars (custom 6px); save bar; list rows (pool-row, holder-row, dir-row, reminder-row, upcoming-row, day-row, event-row hidden); inline add list (`inline-add-row`, `inline-list-item`). This is roughly 40-45 families by my grouping; the app has no component abstraction layer, so "43 components" is not derivable from the app (see section 7).

### 6.4 Duplicate / dead CSS blocks - summary of which wins
See 1.2 (duplicate selectors), 1.3 (modal systems), 1.4 (dead/never emitted/hidden-panel). Net: L23 `.nav-sub` or L491 (identical); L13 or L487 `body` (union); L61-62 or L1007-1008 `.btn-cancel` (L1007 wins, identical); `.modal-backdrop .modal*` wins over `.modal*` for the three B modals; all `body.dark` rules win over light rules (specificity) except `!important`-flagged light rules (group header rows L95-96 are `!important` in light and have their own `!important` dark rules at L1133-1134).

## 7. DEVIATIONS: statements in `makorx-ai/design-system/CLAUDE.md` / `tokens.css` that the app contradicts

| # | claim (file) | app evidence |
|---|---|---|
| 1 | CLAUDE.md "Border radius is always 4px... only exceptions avatars (50%) and the dark mode toggle pill (8px)" | Also 2px (scrollbar thumbs L49/102/240/289/316, `.wfh-legend-dot` L744), `2px 3px 0 0` (`.mini-bar` L874), partial radii on `.phone-code-btn/.phone-number-input/.phone-code-opt` (L592, 601-602, 608), `0` on `#panel-myinfo .card` (L617); circles also on `.bal-action-btn`, `.entry-remove`, `.tt-fillall-close`, `.modal-backdrop .modal-close`, `.emp-qcard-close`; `.calc-user-avatar` is a 4px square |
| 2 | "Lexend Exa is for the logo wordmark only - never use it in UI" | `.nav-sub` (the "HR"/"My Profile" label under the wordmark, L23/L491) is also Lexend Exa 14px/400 `#7c8dac`; `.nav-wordmark` is 18px/400 line-height 1 |
| 3 | "Brand dark = `#0cb8d0`" | CONFIRMED for text/borders/fills; BUT dark primary buttons use text `#111214` and several hover-filled outline buttons use text `#fff` on `#0cb8d0` (L1392, 1444, 1463, 1511, 1597, 1602) - mixed. `--color-brand-hover` dark `#0aacc3` appears only twice (L1465, L1598); filled-button hover is `opacity:0.85` |
| 4 | "Page bg `#ffffff`; Raised `#f5f5f8` used for ... sidebar" | My Profile `.sidebar` is `#fff` (L499); the raised grey is `#f5f5f8` only on the My Profile canvas (`#myprofile-view`, L1025), `.sidebar-profile` (L509), table headers, etc. Dark: canvas `#111214`, sidebar `#202226` (not `#26292e` as the token file's dark "surface-raised") |
| 5 | tokens.css dark `--color-surface-raised: #26292e` used generically; "Elevated `#26292e`" | Dark table headers are `#111214` (emp, records, group header, section-band, pool-group-lbl) or `#202226` (rv/tt/req/hist/tt-cal-head); `#26292e` only on dropdowns, modals, toast, outline/cancel/nav buttons, phone/datepicker, `.day-chip`, `.btn-save` |
| 6 | tokens.css dark `--color-border: rgba(255,255,255,0.08)`, `--color-border-strong: rgba(255,255,255,0.14)` | App uses at least 8 different dark border alphas: 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.10, 0.12 (and `0.28` for avatars); there is NO 0.14. Light `#c4cdd8` strong border becomes `border:none` + `rgba(255,255,255,0.08)` bg on `.btn-cancel` |
| 7 | Status table "New / Info = `rgba(0,82,104,0.08)` / `#005268`" | App `rv-status.new` is `#d4eee9` / `#005268` (L262). `rgba(0,82,104,0.08)` appears only on `.req-tab.active` and dead `.dept-chip.active` |
| 8 | "Pending / Warning `#fef3c7` / `#d97706`" | Three light pendings: `#fef3c7`/`#d97706` (`req-status`, `wfh-prefs-badge`), `#fff8ec`/`#d97706` (`rv-status.pending`), `#fef3c7`/`#92400e` (`tt-badge-pending`, `tt-section-lbl--pending`) |
| 9 | "Active / Approved `#c1f0d5` / `#179484`" | Approved varies per view: `#f0fdf4`/`#16a34a` (rv), `#d1fae5`/`#065f46` (tt), `#c1f0d5`/`#179484` (req-status, status-active) |
| 10 | "Do not add new status colors - use the existing 5-state system" | The app has no such system: 5 views x own palettes; plus WFH (`#dbeafe/#1d4ed8` office), pool badges, calendar-cell states, `birthday/anniversary` |
| 11 | "Control heights: 36 buttons, 38 larger buttons + search inputs, 40 form inputs" | The main toolbar `.search-input` is 40px (L71), not 38; only `.dir-search`/`.dir-select` are 38px. Also existing heights not listed: 30, 32, 34, 44 (tt-fillall-input), 40 buttons (`btn-req-send`, `btn-save`, `btn-close-calc`, `btn-inline-add`) |
| 12 | Avatar sizes "32,36,42,44,48,64" | Also 28, 30, 34, 38, 52 (`sp-avatar`); avatars always transparent with ring - ring colour `rgba(0,0,0,0.30)` correct; dark ring `rgba(255,255,255,0.28)` |
| 13 | Dark shadows "Card `0 4px 24px 0.50`, Modal `0 8px 40px 0.50`" | Only `.page-center` gets `0 4px 24px 0.50`; other cards go to `box-shadow:none`; `.modal` (system A), `.tt-fillall-box`, `.tt-confirm-box` keep their LIGHT shadows (0.16/0.14) in dark; there is no dark `0 8px 40px 0.50` anywhere |
| 14 | Shadows "Modal `0 8px 40px 0.16`; Overlay `0 24px 60px 0.20`" | CONFIRMED, but `0 8px 40px 0.14` (`tt-fillall-box`) and `0 8px 32px 0.14` (`tt-confirm-box`) also exist, plus `0 24px 64px 0.30` success card |
| 15 | "Modal... Overlay `rgba(0,0,0,0.28)`, width 740" | True for system A only; system B is 560px with scrim 0.45 and a different header (18px/800/`#005268`, circular close) |
| 16 | tokens.css `--z-modal: 900; --z-dropdown: 9000` (only 4 z tokens) | App uses 12 distinct z-index values (1,10,50,100,200,300,500,800,900,1000,9000,9999) |
| 17 | "Transitions: 0.10/0.12/0.15/0.18/0.20; always ease" | Also `0.25s` (success backdrop) and `1.4s ease-out` (dir-flash keyframes) |
| 18 | "Active nav link: underline, offset 3px, thickness 2px" | CONFIRMED (computed). Inactive links are weight 400 `#000`, hover opacity 0.7 |
| 19 | "Uppercase labels: 12px/700/0.06em/`#a8b6cd`... section labels/card titles" | Only table headers match exactly. `.card-title` is 12px/700/0.06em `#7c8dac` (not `#a8b6cd`); `.modal-section-title`, `.pool-group-lbl`, `.group-header-row td` also `#7c8dac`; label sizes 9.5/10/11/12px with spacings 0.04-0.10em |
| 20 | "Page/section titles 16-18px, 700-800" | Also 15px, 17px, 20px, 22px, 26px, 28px headings exist (see 3.1) |
| 21 | "No gradients" | CONFIRMED in CSS (the logo SVG has blurred shapes inside the mark only) |
| 22 | "Desktop-only; no breakpoints" | CONFIRMED (0 `@media`) - but this means layout breaks below ~1280 (fixed 210px gutters) |
| 23 | "`components.css` - full CSS for all 43 components" / components.md lists Checkbox, Radio, Autocomplete/Combobox, Filter chips, Time picker, File upload, Date-range picker, Alert, Tooltip, Progress, Spinner, Skeleton, Confirmation dialog, Sidebar navigation, Page header, Breadcrumb, Stepper, Pagination, Detail drawer (right-slide), Timeline, Tag input, KPI card | NOT in the app: radio (0), file upload (0), alert/banner (0 - validation uses `alert()` L2043 etc.), tooltip (only native `title`), progress (0), spinner (0), skeleton (0), breadcrumb (0), stepper (0), pagination (0), timeline (0), tag input (0), sidebar navigation (0: only a top nav; My Profile has an info sidebar card), page header, right-slide detail drawer (the "drawer" is an inline split panel - classes only named `drawer-*`), filter chips (dead `.dept-chip`). Checkbox exists only as `.wfh-day-check` (hidden native input + styled box). Present but under-documented: autocomplete (`pool-emp-drop`), confirm box (`tt-confirm-box`), phone picker |
| 24 | CLAUDE.md "Do not use Tailwind" | n/a - app is plain CSS (CONFIRMED) |
| 25 | tokens.css `--color-surface-divider #f0f1f4` "section dividers"; `--color-border-today` `#c1ecf0` | Section dividers are `#e5e7ec` (`.section-band` L169-170); `#f0f1f4` only calendar grid + sidebar divider; `#c1ecf0` is dp today border / dp-nav hover |
| 26 | tokens `--text-sm 11px "dept labels"` etc | `dept-badge` is 12px/500 |
| 27 | Typography "Body: Geist weight 400, 14px/1.5" | CONFIRMED (computed 14px/21px/400) |

## 8. GAPS: what the app lacks (each searched; grep counts over the whole file)
- Keyboard focus rings on buttons/links/tabs/rows: `:focus-visible` = 0, `:focus` only on text inputs (37 rules), 22 `outline:none` declarations - buttons/links use the browser default ring (not themed); table rows and tabs are `div/tr` with `onclick`, `tabindex` = 0, `role=` = 0, `aria-` = 0 (no ARIA anywhere).
- Error / invalid / validation states: `error`, `invalid`, `:invalid` = 0 (no styled error input, no helper/error text). Validation uses native `alert()` (L2043, 2045, 2769, 2819, 2838); one inline red border (`#dc2626`) on TT fill inputs (JS L4188). Required marker `.req-star #da4d43` exists but no required styling on inputs.
- Disabled states: only dark `.btn-primary/.btn-outline:disabled` (L1090, 1093); no light-mode `:disabled` rule (light disabled = inline `opacity:0.45;cursor:not-allowed`); no disabled input style.
- Tooltips: none (native `title=` attributes only, 8 uses).
- Skeleton / spinner / progress / loading: 0 (one string match is "skeleton staff" copy).
- Alerts/banners/inline messages: 0 (only toast + success card).
- Pagination / breadcrumbs / stepper / timeline: 0.
- Radio, file upload, multi-select, tag input, switch other than dark-mode: 0.
- Hover/active/pressed states: hover exists broadly; `:active` pressed states = 0.
- Reduced-motion, high-contrast, `prefers-color-scheme`: 0.
- Responsive/mobile: 0 media queries.
- Text selection, `::selection`, `caret-color` (only datepicker), print styles: 0.
- Favicon/title tokens: `<title>` only.
- Icon system: all icons are inline `stroke="currentColor"` SVG (stroke-width 1.5, 1.8, 2, 2.5; sizes 12-40px; 24x24 viewBox), plus emoji (reminders, flags). No icon font/sprite.
- Colour tokens/CSS variables: the app defines only two custom properties (`--wfh-icon-bg`, `--off-icon-bg`, L487-488); every other value is a literal.
- Dark-mode coverage holes listed in 1.5 (nav-sub, cc-out text, req-star, dm-switch track, modal-textarea, shadows, tt overlays).

---

## Appendix A - complete `body.dark` override map (light value vs dark value, per declaration)
| dark rule line | selector (after `body.dark`) | property | LIGHT value (rule line) | DARK value |
|---|---|---|---|---|
| 488 | `body` | --wfh-icon-bg | `#c1f0d5` (L487) | `rgba(23,148,132,0.22)` |
| 488 | `body` | --off-icon-bg | `#dbeafe` (L487) | `rgba(37,99,235,0.18)` |
| 1046 | `body` | background | `#fff` (L487) | `#111214` |
| 1046 | `body` | color | `#1a1a1a` (L487) | `#e2e8f4` |
| 1046 | `body` | scrollbar-width | *(no light rule for this exact selector — inherits/UA/other rule)* | `thin` |
| 1046 | `body` | scrollbar-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.08) transparent` |
| 1050 | `*::-webkit-scrollbar` | width | *(no light rule for this exact selector — inherits/UA/other rule)* | `6px` |
| 1050 | `*::-webkit-scrollbar` | height | *(no light rule for this exact selector — inherits/UA/other rule)* | `6px` |
| 1051 | `*::-webkit-scrollbar-track` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `transparent` |
| 1052 | `*::-webkit-scrollbar-thumb` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.09)` |
| 1052 | `*::-webkit-scrollbar-thumb` | border-radius | *(no light rule for this exact selector — inherits/UA/other rule)* | `2px` |
| 1053 | `*::-webkit-scrollbar-thumb:hover` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.28)` |
| 1055 | `.top-nav` | background | `#fff` (L17) | `#18181c` |
| 1055 | `.top-nav` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1056 | `.nav-wordmark` | color | `#000` (L22) | `#e2e8f4` |
| 1057 | `.nav-link` | color | `#000` (L25) | `#c8d4e8` |
| 1058 | `.nav-apps-icon circle` | fill | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.55)` |
| 1058 | `.nav-apps-icon circle` | stroke | *(no light rule for this exact selector — inherits/UA/other rule)* | `none` |
| 1059 | `.nav-avatar` | background | `#f5f5f8` (L28) | `transparent` |
| 1059 | `.nav-avatar` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.28)` |
| 1059 | `.nav-avatar` | color | `#1a1a1a` (L28) | `#e2e8f4` |
| 1061 | `.profile-drop` | background | `#fff` (L1029) | `#26292e` |
| 1061 | `.profile-drop` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.08)` |
| 1061 | `.profile-drop` | box-shadow | `0 8px 32px rgba(0,0,0,0.12),0 2px 8px rgba(0,0,0,0.06)` (L1029) | `0 8px 32px rgba(0,0,0,0.50)` |
| 1062 | `.profile-drop-header` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1063 | `.profile-drop-name` | color | `#1a1a1a` (L1032) | `#e2e8f4` |
| 1064 | `.profile-drop-email` | color | `#7c8dac` (L1033) | `#8a97aa` |
| 1065 | `.profile-drop-divider` | background | `#e5e7ec` (L1034) | `rgba(255,255,255,0.07)` |
| 1066 | `.profile-drop-item:hover` | background | `#f5f5f8` (L1036) | `rgba(255,255,255,0.05)` |
| 1067 | `.profile-drop-item-icon` | color | `#7c8dac` (L1037) | `#8a97aa` |
| 1068 | `.profile-drop-item-label` | color | `#1a1a1a` (L1038) | `#c8d4e8` |
| 1069 | `.dm-switch.on` | background | `#005268` (L1040) | `#0cb8d0` |
| 1071 | `.app-drop` | background | `#fff` (L30) | `#26292e` |
| 1071 | `.app-drop` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.08)` |
| 1071 | `.app-drop` | box-shadow | `0 8px 32px rgba(0,0,0,0.12),0 2px 8px rgba(0,0,0,0.06)` (L30) | `0 8px 32px rgba(0,0,0,0.50)` |
| 1072 | `.app-drop-item:hover:not(.app-drop-item-current):not(.app-drop-item-noaccess)` | background | `#f5f5f8` (L34) | `rgba(255,255,255,0.05)` |
| 1073 | `.app-drop-item-current` | background | `#f0f8fa` (L35) | `rgba(12,184,208,0.10)` |
| 1074 | `.app-drop-item-name` | color | `#1a1a1a` (L37) | `#c8d4e8` |
| 1075 | `.app-drop-item-current .app-drop-item-name` | color | `#005268` (L38) | `#0cb8d0` |
| 1076 | `.app-drop-section` | color | `#a8b6cd` (L32) | `rgba(255,255,255,0.28)` |
| 1077 | `.app-drop-divider` | background | `#e5e7ec` (L40) | `rgba(255,255,255,0.07)` |
| 1078 | `.app-drop-item-badge` | background | `#e8f4f8` (L39) | `rgba(12,184,208,0.15)` |
| 1078 | `.app-drop-item-badge` | color | `#005268` (L39) | `#0cb8d0` |
| 1080 | `.page-center` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.07)` |
| 1080 | `.page-center` | box-shadow | `0 2px 8px rgba(0,0,0,0.06)` (L44) | `0 4px 24px rgba(0,0,0,0.50)` |
| 1081 | `.split-left` | background | `#fff` (L45) | `#202226` |
| 1081 | `.split-left` | border-right-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.07)` |
| 1082 | `.split-right` | background | `#fff` (L46) | `#202226!important` |
| 1083 | `#myprofile-view` | background | `#f5f5f8` (L1025) | `#111214` |
| 1085 | `.left-header` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1086 | `.left-title` | color | `#1a1a1a` (L54) | `#e2e8f4` |
| 1087 | `.groupby-label` | color | `#7c8dac` (L92) | `#8a97aa` |
| 1089 | `.btn-primary` | background | `#005268` (L58) | `#0cb8d0` |
| 1089 | `.btn-primary` | color | `#fff` (L58) | `#111214` |
| 1090 | `.btn-primary:disabled` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `#26292e` |
| 1090 | `.btn-primary:disabled` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.22)` |
| 1090 | `.btn-primary:disabled` | opacity | *(no light rule for this exact selector — inherits/UA/other rule)* | `1!important` |
| 1090 | `.btn-primary:disabled` | cursor | *(no light rule for this exact selector — inherits/UA/other rule)* | `not-allowed` |
| 1090 | `.btn-primary[disabled]` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `#26292e` |
| 1090 | `.btn-primary[disabled]` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.22)` |
| 1090 | `.btn-primary[disabled]` | opacity | *(no light rule for this exact selector — inherits/UA/other rule)* | `1!important` |
| 1090 | `.btn-primary[disabled]` | cursor | *(no light rule for this exact selector — inherits/UA/other rule)* | `not-allowed` |
| 1091 | `.btn-outline` | background | `#fff` (L56) | `#26292e` |
| 1091 | `.btn-outline` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1091 | `.btn-outline` | color | `#1a1a1a` (L56) | `#c8d4e8` |
| 1092 | `.btn-outline:hover` | border-color | `#005268` (L57) | `#0cb8d0` |
| 1092 | `.btn-outline:hover` | color | `#005268` (L57) | `#0cb8d0` |
| 1093 | `.btn-outline:disabled` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `#26292e` |
| 1093 | `.btn-outline:disabled` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.06)` |
| 1093 | `.btn-outline:disabled` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.18)` |
| 1093 | `.btn-outline:disabled` | opacity | *(no light rule for this exact selector — inherits/UA/other rule)* | `1!important` |
| 1093 | `.btn-outline:disabled` | cursor | *(no light rule for this exact selector — inherits/UA/other rule)* | `not-allowed` |
| 1093 | `.btn-outline[disabled]` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `#26292e` |
| 1093 | `.btn-outline[disabled]` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.06)` |
| 1093 | `.btn-outline[disabled]` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.18)` |
| 1093 | `.btn-outline[disabled]` | opacity | *(no light rule for this exact selector — inherits/UA/other rule)* | `1!important` |
| 1093 | `.btn-outline[disabled]` | cursor | *(no light rule for this exact selector — inherits/UA/other rule)* | `not-allowed` |
| 1094 | `.btn-cancel` | background | `transparent` (L1007) | `rgba(255,255,255,0.08)` |
| 1094 | `.btn-cancel` | border | `1px solid #c4cdd8` (L1007) | `none` |
| 1094 | `.btn-cancel` | color | `#7c8dac` (L1007) | `#8a97aa` |
| 1095 | `.btn-cancel:hover` | background | `#f5f5f8` (L1008) | `rgba(255,255,255,0.13)` |
| 1096 | `.btn-cta` | background | `#005268` (L63) | `#0cb8d0` |
| 1096 | `.btn-cta` | color | `#fff` (L63) | `#111214` |
| 1097 | `.btn-add-member` | background | `#005268` (L440) | `#0cb8d0` |
| 1097 | `.btn-add-member` | color | `#fff` (L440) | `#111214` |
| 1098 | `.btn-inline-add` | background | `#005268` (L460) | `#0cb8d0` |
| 1098 | `.btn-inline-add` | color | `#fff` (L460) | `#111214` |
| 1099 | `.rv-btn-approve` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#34d399` |
| 1099 | `.rv-btn-approve` | color | `#16a34a` (L273) | `#34d399` |
| 1100 | `.rv-btn-approve:hover` | background | `#f0fdf4` (L274) | `rgba(52,211,153,0.10)` |
| 1101 | `.rv-btn-deny` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#f87171` |
| 1101 | `.rv-btn-deny` | color | `#dc2626` (L275) | `#f87171` |
| 1102 | `.rv-btn-deny:hover` | background | `#fef2f2` (L276) | `rgba(248,113,113,0.10)` |
| 1104 | `.search-input` | background | `#fff` (L71) | `transparent` |
| 1104 | `.search-input` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1104 | `.search-input` | color | `#1a1a1a` (L71) | `#e2e8f4` |
| 1105 | `.search-input::placeholder` | color | `#7c8dac` (L72) | `#505a6c` |
| 1106 | `.search-input:focus` | border-color | `#005268` (L73) | `#0cb8d0` |
| 1106 | `.search-input:focus` | box-shadow | `0 0 0 3px rgba(0,82,104,0.12)` (L73) | `0 0 0 3px rgba(12,184,208,0.12)` |
| 1107 | `.search-icon` | color | `#005268` (L70) | `#505a6c` |
| 1109 | `.cust-select__trigger` | background | `#fff` (L75) | `transparent` |
| 1109 | `.cust-select__trigger` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1109 | `.cust-select__trigger` | color | `#7c8dac` (L75) | `#505a6c` |
| 1110 | `.cust-select__trigger.has-value` | color | `#1a1a1a` (L76) | `#e2e8f4` |
| 1111 | `.cust-select__trigger:hover` | border-color | `#a8b6cd` (L77) | `rgba(255,255,255,0.20)` |
| 1112 | `.cust-select.open .cust-select__trigger` | border-color | `#005268` (L78) | `#0cb8d0` |
| 1113 | `.cust-select__chevron` | color | `#005268` (L79) | `#0cb8d0` |
| 1114 | `.cust-select__panel` | background | `#fff` (L81) | `#26292e` |
| 1114 | `.cust-select__panel` | box-shadow | `0 8px 32px rgba(0,0,0,0.12),0 2px 8px rgba(0,0,0,0.06)` (L81) | `0 8px 32px rgba(0,0,0,0.50)` |
| 1115 | `.cust-select__option` | color | `#1a1a1a` (L83) | `#c8d4e8` |
| 1116 | `.cust-select__option:hover` | background | `#f5f5f8` (L84) | `rgba(255,255,255,0.05)` |
| 1117 | `.cust-select__option.selected` | color | `#005268` (L85) | `#0cb8d0` |
| 1119 | `.emp-table-wrap` | background | `#fff` (L97) | `#202226` |
| 1119 | `.emp-table-wrap` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.07)` |
| 1119 | `.emp-table-wrap` | box-shadow | `0 2px 8px rgba(0,0,0,0.05)` (L97) | `none` |
| 1120 | `.emp-table th` | background | `#f5f5f8` (L104) | `#111214` |
| 1120 | `.emp-table th` | color | `#a8b6cd` (L104) | `#505a6c` |
| 1120 | `.emp-table th` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1121 | `.emp-table th:hover` | color | `#005268` (L105) | `#0cb8d0` |
| 1122 | `.emp-table th.sorted` | color | `#005268` (L107) | `#0cb8d0` |
| 1123 | `.emp-table td` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.09)` |
| 1123 | `.emp-table td` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#e2e8f4` |
| 1124 | `.emp-table tr:hover td` | background | `#f5f5f8` (L112) | `rgba(255,255,255,0.03)` |
| 1125 | `.emp-table tr.active-row td` | background | `#f5f5f8` (L113) | `rgba(255,255,255,0.04)` |
| 1126 | `.emp-table tr.active-row td:first-child` | box-shadow | `inset 3px 0 0 #005268` (L114) | `inset 3px 0 0 #0cb8d0` |
| 1127 | `.emp-name` | color | `#000` (L119) | `#e2e8f4` |
| 1128 | `.emp-name.inactive` | color | `#a8b6cd` (L120) | `#505a6c` |
| 1129 | `.emp-email` | color | `#7c8dac` (L121) | `#8a97aa` |
| 1130 | `.emp-table tr.na-row td` | color | `#a8b6cd` (L1044) | `#505a6c` |
| 1131 | `.emp-avatar` | background | `transparent` (L117) | `transparent` |
| 1131 | `.emp-avatar` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.28)` |
| 1131 | `.emp-avatar` | color | `#000` (L117) | `#e2e8f4` |
| 1132 | `.emp-avatar.inactive` | border-color | `#a8b6cd` (L118) | `#505a6c` |
| 1132 | `.emp-avatar.inactive` | color | `#a8b6cd` (L118) | `#505a6c` |
| 1133 | `.group-header-row td` | background | `#f5f5f8!important` (L95) | `#111214!important` |
| 1133 | `.group-header-row td` | color | `#7c8dac` (L95) | `#505a6c` |
| 1133 | `.group-header-row td` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)!important` |
| 1134 | `.group-header-row:hover td` | background | `#f5f5f8!important` (L96) | `#111214!important` |
| 1136 | `.status-active` | background | `#c1f0d5` (L124) | `rgba(45,212,191,0.16)` |
| 1136 | `.status-active` | color | `#179484` (L124) | `#2dd4bf` |
| 1137 | `.status-inactive` | background | `#fde8e6` (L125) | `rgba(248,113,113,0.15)` |
| 1137 | `.status-inactive` | color | `#da4d43` (L125) | `#f87171` |
| 1139 | `.dept-badge` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.06)!important` |
| 1139 | `.dept-badge` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#505a6c!important` |
| 1140 | `.dept-badge[data-dept="Equities"]` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(99,152,255,0.16)!important` |
| 1140 | `.dept-badge[data-dept="Equities"]` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#7aabff!important` |
| 1141 | `.dept-badge[data-dept="Fixed Income"]` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(45,212,191,0.14)!important` |
| 1141 | `.dept-badge[data-dept="Fixed Income"]` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#2dd4bf!important` |
| 1142 | `.dept-badge[data-dept="Technology"]` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(52,211,153,0.14)!important` |
| 1142 | `.dept-badge[data-dept="Technology"]` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#4ade80!important` |
| 1143 | `.dept-badge[data-dept="Operations"]` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(251,146,60,0.16)!important` |
| 1143 | `.dept-badge[data-dept="Operations"]` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#fb923c!important` |
| 1144 | `.dept-badge[data-dept="Compliance"]` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(167,139,250,0.16)!important` |
| 1144 | `.dept-badge[data-dept="Compliance"]` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#a78bfa!important` |
| 1145 | `.dept-badge[data-dept="Finance"]` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(96,186,240,0.16)!important` |
| 1145 | `.dept-badge[data-dept="Finance"]` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#60baf0!important` |
| 1146 | `.drawer-dept-badge` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.06)!important` |
| 1146 | `.drawer-dept-badge` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#505a6c!important` |
| 1147 | `.drawer-dept-badge[data-dept="Equities"]` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(99,152,255,0.16)!important` |
| 1147 | `.drawer-dept-badge[data-dept="Equities"]` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#7aabff!important` |
| 1148 | `.drawer-dept-badge[data-dept="Fixed Income"]` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(45,212,191,0.14)!important` |
| 1148 | `.drawer-dept-badge[data-dept="Fixed Income"]` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#2dd4bf!important` |
| 1149 | `.drawer-dept-badge[data-dept="Technology"]` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(52,211,153,0.14)!important` |
| 1149 | `.drawer-dept-badge[data-dept="Technology"]` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#4ade80!important` |
| 1150 | `.drawer-dept-badge[data-dept="Operations"]` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(251,146,60,0.16)!important` |
| 1150 | `.drawer-dept-badge[data-dept="Operations"]` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#fb923c!important` |
| 1151 | `.drawer-dept-badge[data-dept="Compliance"]` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(167,139,250,0.16)!important` |
| 1151 | `.drawer-dept-badge[data-dept="Compliance"]` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#a78bfa!important` |
| 1152 | `.drawer-dept-badge[data-dept="Finance"]` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(96,186,240,0.16)!important` |
| 1152 | `.drawer-dept-badge[data-dept="Finance"]` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#60baf0!important` |
| 1154 | `.active-badge` | background | `#c1f0d5` (L451) | `rgba(45,212,191,0.16)` |
| 1154 | `.active-badge` | color | `#179484` (L451) | `#2dd4bf` |
| 1155 | `.inactive-badge` | background | `#fde8e6` (L452) | `rgba(248,113,113,0.15)` |
| 1155 | `.inactive-badge` | color | `#da4d43` (L452) | `#f87171` |
| 1156 | `.inline-badge.active` | background | `#c1f0d5` (L471) | `rgba(45,212,191,0.16)` |
| 1156 | `.inline-badge.active` | color | `#179484` (L471) | `#2dd4bf` |
| 1157 | `.inline-badge.inactive` | background | `#fde8e6` (L472) | `rgba(248,113,113,0.15)` |
| 1157 | `.inline-badge.inactive` | color | `#da4d43` (L472) | `#f87171` |
| 1159 | `.detail-header` | background | `#fff` (L131) | `#202226` |
| 1159 | `.detail-header` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1160 | `.drawer-avatar` | background | `transparent` (L133) | `transparent` |
| 1160 | `.drawer-avatar` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.28)` |
| 1160 | `.drawer-avatar` | color | `#000` (L133) | `#e2e8f4` |
| 1161 | `.drawer-avatar.inactive` | border-color | `#a8b6cd` (L134) | `#505a6c` |
| 1161 | `.drawer-avatar.inactive` | color | `#a8b6cd` (L134) | `#505a6c` |
| 1162 | `.drawer-name` | color | `#1a1a1a` (L137) | `#e2e8f4` |
| 1163 | `.drawer-role` | color | `#1a1a1a` (L138) | `#c8d4e8` |
| 1164 | `.drawer-email` | color | `#7c8dac` (L142) | `#8a97aa` |
| 1165 | `.record-badge` | background | `#e5e7ec` (L140) | `rgba(255,255,255,0.07)` |
| 1165 | `.record-badge` | color | `#7c8dac` (L140) | `#8a97aa` |
| 1166 | `.drawer-dot` | color | `#e5e7ec` (L145) | `rgba(255,255,255,0.28)` |
| 1167 | `.drawer-meta-link` | color | `#005268` (L143) | `#0cb8d0` |
| 1169 | `.detail-stat-bar` | background | `#fff` (L148) | `#202226` |
| 1169 | `.detail-stat-bar` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1170 | `.detail-stat` | border-right-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.07)` |
| 1171 | `.detail-stat-value` | color | `#1a1a1a` (L151) | `#e2e8f4` |
| 1172 | `.detail-stat-label` | color | `#a8b6cd` (L152) | `#505a6c` |
| 1174 | `.detail-tabs` | background | `#fff` (L155) | `#202226` |
| 1174 | `.detail-tabs` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1175 | `.detail-tab` | color | `#7c8dac` (L156) | `#8a97aa` |
| 1176 | `.detail-tab:hover` | color | `#1a1a1a` (L157) | `#e2e8f4` |
| 1177 | `.detail-tab.active` | color | `#005268` (L158) | `#0cb8d0` |
| 1177 | `.detail-tab.active` | border-bottom-color | `#005268` (L158) | `#0cb8d0` |
| 1179 | `.section-band` | background | `#fff` (L162) | `#111214` |
| 1179 | `.section-band` | border-top-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1179 | `.section-band` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1179 | `.section-band` | color | `#1a1a1a` (L162) | `#e2e8f4` |
| 1181 | `.fc-label` | color | `#a8b6cd` (L195) | `#505a6c` |
| 1182 | `.fc-value` | color | `#1a1a1a` (L205) | `#e2e8f4` |
| 1183 | `.fc-link` | color | `#005268` (L219) | `#0cb8d0` |
| 1184 | `.fc-value.muted` | color | `#a8b6cd` (L218) | `#505a6c` |
| 1186 | `.records-table-wrap` | border-top-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1187 | `.records-table th` | color | `#a8b6cd` (L225) | `#505a6c` |
| 1187 | `.records-table th` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1187 | `.records-table th` | background | `#f5f5f8` (L225) | `#111214` |
| 1188 | `.records-table td` | color | `#1a1a1a` (L226) | `#e2e8f4` |
| 1188 | `.records-table td` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.09)` |
| 1190 | `.detail-empty` | color | `#a8b6cd` (L128) | `#505a6c` |
| 1191 | `.timesheet-ph` | color | `#a8b6cd` (L230) | `#505a6c` |
| 1191 | `.timesheet-ph` | border-top-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1193 | `.modal-overlay` | background | `rgba(0,0,0,0.28)` (L390) | `rgba(0,0,0,0.55)` |
| 1194 | `.modal-overlay .modal` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `#26292e` |
| 1194 | `.modal-overlay .modal` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.08)` |
| 1195 | `.modal-header` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1196 | `.modal-title` | color | `#1a1a1a` (L395) | `#e2e8f4` |
| 1197 | `.modal-close` | color | `#7c8dac` (L396) | `#8a97aa` |
| 1198 | `.modal-close:hover` | background | `#f5f5f8` (L397) | `rgba(255,255,255,0.06)` |
| 1198 | `.modal-close:hover` | color | `#1a1a1a` (L397) | `#e2e8f4` |
| 1199 | `.modal-footer` | border-top-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1200 | `.modal-section-title` | color | `#7c8dac` (L404) | `#8a97aa` |
| 1201 | `.modal-input` | background | `#fff` (L409) | `transparent` |
| 1201 | `.modal-input` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1201 | `.modal-input` | color | `#1a1a1a` (L409) | `#e2e8f4` |
| 1202 | `.modal-input::placeholder` | color | `#a8b6cd` (L410) | `#505a6c` |
| 1203 | `.modal-input[type="date"]::-webkit-calendar-picker-indicator` | filter | *(no light rule for this exact selector — inherits/UA/other rule)* | `invert(1)` |
| 1203 | `.modal-input[type="date"]::-webkit-calendar-picker-indicator` | opacity | `0.38` (L412) | `0.30` |
| 1204 | `.modal-input[type="date"]::-webkit-calendar-picker-indicator:hover` | opacity | `0.65` (L413) | `0.55` |
| 1205 | `.modal-input[type="date"].dt-empty::-webkit-datetime-edit` | color | `#a8b6cd` (L414) | `#505a6c` |
| 1206 | `.modal-input:focus` | border-color | `#005268` (L411) | `#0cb8d0` |
| 1206 | `.modal-input:focus` | box-shadow | `0 0 0 3px rgba(0,82,104,0.12)` (L411) | `0 0 0 3px rgba(12,184,208,0.12)` |
| 1207 | `.modal-select` | background-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `transparent` |
| 1207 | `.modal-select` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1207 | `.modal-select` | color | `#1a1a1a` (L409) | `#e2e8f4` |
| 1207 | `.modal-select` | background-image | `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns=` (L416) | `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2` |
| 1208 | `.modal-select:focus` | border-color | `#005268` (L411) | `#0cb8d0` |
| 1208 | `.modal-select:focus` | box-shadow | `0 0 0 3px rgba(0,82,104,0.12)` (L411) | `0 0 0 3px rgba(12,184,208,0.12)` |
| 1209 | `.modal-label` | color | `#7c8dac` (L408) | `#8a97aa` |
| 1210 | `.modal-divider` | background | `#e5e7ec` (L417) | `rgba(255,255,255,0.07)` |
| 1212 | `#poolSplitRight` | scrollbar-width | *(no light rule for this exact selector — inherits/UA/other rule)* | `thin` |
| 1212 | `#poolSplitRight` | scrollbar-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.08) transparent` |
| 1213 | `#poolSplitRight::-webkit-scrollbar` | width | *(no light rule for this exact selector — inherits/UA/other rule)* | `6px` |
| 1214 | `#poolSplitRight::-webkit-scrollbar-track` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `transparent` |
| 1215 | `#poolSplitRight::-webkit-scrollbar-thumb` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.08)` |
| 1215 | `#poolSplitRight::-webkit-scrollbar-thumb` | border-radius | *(no light rule for this exact selector — inherits/UA/other rule)* | `2px` |
| 1216 | `.pool-group-lbl` | background | `#f5f5f8` (L422) | `#111214` |
| 1216 | `.pool-group-lbl` | color | `#7c8dac` (L422) | `#505a6c` |
| 1216 | `.pool-group-lbl` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1217 | `.pool-row` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1218 | `.pool-row:hover` | background | `#f5f5f8` (L424) | `rgba(255,255,255,0.03)` |
| 1219 | `.pool-row.active` | background | `#f5f5f8` (L425) | `rgba(255,255,255,0.04)` |
| 1219 | `.pool-row.active` | border-left-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#0cb8d0` |
| 1220 | `.pool-row.active .pool-name` | color | `#005268` (L426) | `#0cb8d0` |
| 1221 | `.pool-name` | color | `#1a1a1a` (L427) | `#e2e8f4` |
| 1222 | `.pool-meta-label` | color | `#a8b6cd` (L430) | `#505a6c` |
| 1223 | `.pool-meta-value` | color | `#1a1a1a` (L431) | `#8a97aa` |
| 1224 | `.pool-badge.holders` | background | `#cad8f4` (L434) | `rgba(99,152,255,0.16)` |
| 1224 | `.pool-badge.holders` | color | `#2456a0` (L434) | `#7aabff` |
| 1225 | `.pool-badge.members` | background | `#c1ecf0` (L435) | `rgba(34,211,238,0.16)` |
| 1225 | `.pool-badge.members` | color | `#0d6e7a` (L435) | `#22d3ee` |
| 1226 | `.pool-badge span` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `inherit!important` |
| 1227 | `.pool-right-section` | background | `#fff` (L438) | `#202226` |
| 1227 | `.pool-right-section` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.07)` |
| 1228 | `.pool-right-section-header` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1228 | `.pool-right-section-header` | color | `#1a1a1a` (L439) | `#e2e8f4` |
| 1229 | `.holder-row` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1230 | `.holder-avatar` | background | `transparent` (L444) | `transparent` |
| 1230 | `.holder-avatar` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.28)` |
| 1230 | `.holder-avatar` | color | `#1a1a1a` (L444) | `#e2e8f4` |
| 1231 | `.holder-name` | color | `#1a1a1a` (L445) | `#e2e8f4` |
| 1232 | `.holder-id` | color | `#a8b6cd` (L446) | `#505a6c` |
| 1233 | `.member-card` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1234 | `.member-name` | color | `#1a1a1a` (L450) | `#e2e8f4` |
| 1235 | `.mf-label` | color | `#a8b6cd` (L454) | `#505a6c` |
| 1236 | `.mf-value` | color | `#1a1a1a` (L455) | `#e2e8f4` |
| 1237 | `.mf-value.mono` | color | `#005268` (L456) | `#0cb8d0` |
| 1238 | `.inline-list-item` | background | `#f5f5f8` (L464) | `rgba(255,255,255,0.05)` |
| 1238 | `.inline-list-item` | color | `#1a1a1a` (L464) | `#e2e8f4` |
| 1239 | `.inline-list-item-name` | color | `#1a1a1a` (L466) | `#e2e8f4` |
| 1240 | `.inline-list-item-meta` | color | `#7c8dac` (L467) | `#8a97aa` |
| 1241 | `.inline-list-item-remove` | color | `#a8b6cd` (L468) | `#505a6c` |
| 1242 | `.inline-list-item-remove:hover` | background | `#fde8e6` (L469) | `rgba(248,113,113,0.15)` |
| 1242 | `.inline-list-item-remove:hover` | color | `#da4d43` (L469) | `#f87171` |
| 1243 | `.inline-list-empty` | color | `#a8b6cd` (L463) | `#505a6c` |
| 1244 | `.pool-emp-drop` | background | `#fff` (L473) | `#26292e` |
| 1244 | `.pool-emp-drop` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.08)` |
| 1244 | `.pool-emp-drop` | box-shadow | `0 6px 20px rgba(0,0,0,0.12)` (L473) | `0 6px 20px rgba(0,0,0,0.50)` |
| 1245 | `.pool-emp-drop-item` | color | `#1a1a1a` (L475) | `#c8d4e8` |
| 1246 | `.pool-emp-drop-item:hover` | background | `#f5f5f8` (L476) | `rgba(255,255,255,0.05)` |
| 1247 | `.pool-emp-drop-meta` | color | `#7c8dac` (L478) | `#8a97aa` |
| 1248 | `.pool-emp-drop-empty` | color | `#a8b6cd` (L479) | `#505a6c` |
| 1249 | `.pool-empty-state` | color | `#a8b6cd` (L457) | `#505a6c` |
| 1250 | `.pool-empty-state svg` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#505a6c!important` |
| 1252 | `#timetracking-view` | background | `#fff` (L281) | `#202226` |
| 1252 | `#timetracking-view` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.07)` |
| 1253 | `.tt-header` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1254 | `.tt-title` | color | `#1a1a1a` (L284) | `#e2e8f4` |
| 1255 | `.tt-list-panel` | border-right-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.07)` |
| 1256 | `.tt-inner-card` | background | `#fff` (L290) | `#202226` |
| 1256 | `.tt-inner-card` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.07)` |
| 1256 | `.tt-inner-card` | box-shadow | `0 2px 8px rgba(0,0,0,0.05)` (L290) | `none` |
| 1257 | `.tt-section-lbl` | color | `#a8b6cd` (L291) | `#505a6c` |
| 1258 | `.tt-section-lbl::after` | background | `#e5e7ec` (L292) | `rgba(255,255,255,0.07)` |
| 1259 | `.tt-section-lbl--pending` | color | `#92400e}.tt-section-lbl--pending::after{background:#fde68a` (L293) | `#fbbf24` |
| 1260 | `.tt-section-lbl--pending::after` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(251,191,36,0.25)` |
| 1261 | `.tt-section-dot` | background | `#f59e0b` (L294) | `#fbbf24` |
| 1262 | `.tt-table th` | background | `#f5f5f8` (L296) | `#202226` |
| 1262 | `.tt-table th` | color | `#a8b6cd` (L296) | `#505a6c` |
| 1262 | `.tt-table th` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1263 | `.tt-table td` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.09)` |
| 1263 | `.tt-table td` | color | `#1a1a1a` (L297) | `#e2e8f4` |
| 1264 | `.tt-table tr.tt-data-row:hover td` | background | `#f5f5f8` (L299) | `rgba(255,255,255,0.03)` |
| 1265 | `.tt-table tr.tt-selected td` | background | `#f5f5f8}.tt-table tr.tt-selected td:first-child{box-shadow:inset 3px 0 0 #005268}.tt-table` (L300) | `rgba(255,255,255,0.04)` |
| 1266 | `.tt-table tr.tt-selected td:first-child` | box-shadow | *(no light rule for this exact selector — inherits/UA/other rule)* | `inset 3px 0 0 #0cb8d0` |
| 1267 | `.tt-table tr.tt-selected:hover td` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.06)` |
| 1268 | `.tt-table tr.tt-section-row td` | background | `#fff!important` (L301) | `#202226!important` |
| 1269 | `.tt-avatar` | background | `transparent` (L304) | `transparent` |
| 1269 | `.tt-avatar` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.28)` |
| 1269 | `.tt-avatar` | color | `#000` (L304) | `#e2e8f4` |
| 1270 | `.tt-emp-name` | color | `#1a1a1a` (L305) | `#e2e8f4` |
| 1271 | `.tt-emp-dept` | color | `#7c8dac` (L306) | `#8a97aa` |
| 1272 | `.tt-badge-pending` | background | `#fef3c7` (L307) | `rgba(251,191,36,0.16)` |
| 1272 | `.tt-badge-pending` | color | `#92400e` (L307) | `#fbbf24` |
| 1273 | `.tt-badge-approved` | background | `#d1fae5` (L308) | `rgba(52,211,153,0.15)` |
| 1273 | `.tt-badge-approved` | color | `#065f46` (L308) | `#34d399` |
| 1274 | `.tt-badge-none` | background | `#f5f5f8` (L309) | `rgba(255,255,255,0.06)` |
| 1274 | `.tt-badge-none` | color | `#a8b6cd` (L309) | `#505a6c` |
| 1275 | `.tt-detail-empty` | color | `#a8b6cd` (L312) | `#505a6c` |
| 1276 | `.tt-det-name` | color | `#1a1a1a` (L319) | `#e2e8f4` |
| 1277 | `.tt-det-meta` | color | `#7c8dac` (L320) | `#8a97aa` |
| 1278 | `.tt-det-avatar` | background | `transparent` (L318) | `transparent` |
| 1278 | `.tt-det-avatar` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.28)` |
| 1278 | `.tt-det-avatar` | color | `#000` (L318) | `#e2e8f4` |
| 1279 | `.tt-stats` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.07)` |
| 1280 | `.tt-stat` | border-right-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.07)` |
| 1281 | `.tt-stat-val` | color | `#1a1a1a` (L324) | `#e2e8f4` |
| 1282 | `.tt-stat-lbl` | color | `#a8b6cd` (L325) | `#505a6c` |
| 1283 | `.tt-cal-title` | color | `#7c8dac` (L326) | `#8a97aa` |
| 1284 | `.tt-cal` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.07)` |
| 1285 | `.tt-cal-head` | background | `#f5f5f8` (L328) | `#202226` |
| 1285 | `.tt-cal-head` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1286 | `.tt-cal-head span` | color | `#a8b6cd` (L329) | `#505a6c` |
| 1287 | `.tt-cal-head span.tt-wknd` | color | `#d1d5db` (L330) | `#2a3548` |
| 1288 | `.tt-cal-cell` | border-right-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.05)` |
| 1288 | `.tt-cal-cell` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.09)` |
| 1289 | `.cc-date` | color | `#a8b6cd` (L334) | `#505a6c` |
| 1290 | `.tt-cal-cell.cc-out` | background | `#f0f1f4}.tt-cal-cell.cc-out .cc-date{color:#b8c0cc}.tt-cal-cell.cc-out .cc-hrs{color:#c8d0` (L338) | `rgba(255,255,255,0.02)` |
| 1291 | `.tt-cal-cell.cc-wknd` | background | `#f5f5f8}.tt-cal-cell.cc-wknd .cc-date{color:#c8d0da` (L339) | `rgba(255,255,255,0.01)` |
| 1292 | `.tt-cal-cell.cc-normal` | background | `#f0fdf8}.tt-cal-cell.cc-normal .cc-hrs{color:#059669}.tt-cal-cell.cc-normal .cc-time{color` (L340) | `rgba(52,211,153,0.10)` |
| 1293 | `.tt-cal-cell.cc-normal .cc-hrs` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#34d399` |
| 1294 | `.tt-cal-cell.cc-normal .cc-time` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#34d399` |
| 1295 | `.tt-cal-cell.cc-low` | background | `#fffbeb}.tt-cal-cell.cc-low .cc-hrs{color:#d97706}.tt-cal-cell.cc-low .cc-time{color:#d977` (L341) | `rgba(251,191,36,0.10)` |
| 1296 | `.tt-cal-cell.cc-low .cc-hrs` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#fbbf24` |
| 1297 | `.tt-cal-cell.cc-low .cc-time` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#fbbf24` |
| 1298 | `.tt-cal-cell.cc-missing` | background | `#fff5f5` (L344) | `rgba(248,113,113,0.10)` |
| 1299 | `.tt-cal-cell.cc-missing:hover` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(248,113,113,0.16)` |
| 1300 | `.tt-cal-cell.cc-missing .cc-date` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#f87171` |
| 1301 | `.tt-cal-cell.cc-missing .cc-absent-lbl` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#f87171` |
| 1302 | `.tt-cal-cell.cc-off` | background | `#fafafa}.tt-cal-cell.cc-off .cc-absent-lbl{color:#a8b6cd` (L342) | `rgba(255,255,255,0.02)` |
| 1303 | `.tt-cal-cell.cc-off .cc-absent-lbl` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#505a6c` |
| 1304 | `.tt-cal-cell.cc-sick` | background | `#fafafa}.tt-cal-cell.cc-sick .cc-absent-lbl{color:#a8b6cd` (L343) | `rgba(255,255,255,0.02)` |
| 1305 | `.tt-cal-cell.cc-sick .cc-absent-lbl` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#505a6c` |
| 1306 | `.tt-fill-bar` | background | `#fff` (L345) | `#202226` |
| 1306 | `.tt-fill-bar` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.07)` |
| 1307 | `.tt-fill-lbl` | color | `#1a1a1a` (L347) | `#e2e8f4` |
| 1308 | `.tt-fill-hint` | color | `#7c8dac` (L348) | `#8a97aa` |
| 1309 | `.tt-fill-input` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `transparent` |
| 1309 | `.tt-fill-input` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1309 | `.tt-fill-input` | color | `#1a1a1a` (L349) | `#e2e8f4` |
| 1310 | `.tt-fill-input:focus` | border-color | `#005268` (L350) | `#0cb8d0` |
| 1310 | `.tt-fill-input:focus` | box-shadow | `0 0 0 2px rgba(0,82,104,0.1)` (L350) | `0 0 0 2px rgba(12,184,208,0.12)` |
| 1311 | `.tt-fill-save` | background | `#005268` (L351) | `#0cb8d0` |
| 1311 | `.tt-fill-save` | color | `#fff` (L351) | `#111214` |
| 1312 | `.tt-fill-cancel` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1312 | `.tt-fill-cancel` | color | `#7c8dac` (L353) | `#8a97aa` |
| 1313 | `.tt-fill-cancel:hover` | background | `#f5f5f8` (L354) | `rgba(255,255,255,0.04)` |
| 1314 | `.tt-detail-footer` | border-top-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1315 | `.tt-btn-approve` | background | `#005268` (L356) | `#0cb8d0` |
| 1315 | `.tt-btn-approve` | color | `#fff` (L356) | `#111214` |
| 1316 | `.tt-btn-fill-all` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1316 | `.tt-btn-fill-all` | color | `#7c8dac` (L358) | `#8a97aa` |
| 1317 | `.tt-btn-fill-all:hover` | background | `#f5f5f8` (L359) | `rgba(255,255,255,0.04)` |
| 1318 | `.tt-fillall-close` | background | `#fff` (L366) | `transparent` |
| 1318 | `.tt-fillall-close` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1318 | `.tt-fillall-close` | color | `#7c8dac` (L366) | `#8a97aa` |
| 1319 | `.tt-fillall-close:hover` | background | `#f5f5f8` (L367) | `rgba(255,255,255,0.06)` |
| 1319 | `.tt-fillall-close:hover` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#e2e8f4` |
| 1320 | `.tt-fillall-input[type="time"]::-webkit-calendar-picker-indicator` | filter | *(no light rule for this exact selector — inherits/UA/other rule)* | `invert(1) sepia(1) saturate(3) hue-rotate(155deg)` |
| 1320 | `.tt-fillall-input[type="time"]::-webkit-calendar-picker-indicator` | opacity | *(no light rule for this exact selector — inherits/UA/other rule)* | `0.8` |
| 1320 | `.tt-fillall-input[type="time"]::-webkit-calendar-picker-indicator` | cursor | *(no light rule for this exact selector — inherits/UA/other rule)* | `pointer` |
| 1321 | `.tt-fillall-box` | background | `#fff` (L362) | `#26292e` |
| 1321 | `.tt-fillall-box` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.08)` |
| 1322 | `.tt-fillall-title` | color | `#005268` (L365) | `#0cb8d0` |
| 1323 | `.tt-fillall-desc` | color | `#7c8dac` (L369) | `#8a97aa` |
| 1324 | `.tt-fillall-lbl` | color | `#a8b6cd` (L371) | `#505a6c` |
| 1325 | `.tt-fillall-input` | background | `#fff` (L372) | `transparent` |
| 1325 | `.tt-fillall-input` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1325 | `.tt-fillall-input` | color | `#1a1a1a` (L372) | `#e2e8f4` |
| 1326 | `.tt-fillall-input:focus` | border-color | `#005268` (L373) | `#0cb8d0` |
| 1326 | `.tt-fillall-input:focus` | box-shadow | `0 0 0 2px rgba(0,82,104,0.1)` (L373) | `0 0 0 2px rgba(12,184,208,0.12)` |
| 1327 | `.tt-fillall-footer` | border-top-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1328 | `.tt-confirm-box` | background | `#fff` (L377) | `#26292e` |
| 1328 | `.tt-confirm-box` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.08)` |
| 1329 | `.tt-confirm-title` | color | `#1a1a1a` (L379) | `#e2e8f4` |
| 1330 | `.tt-confirm-body` | color | `#7c8dac` (L380) | `#8a97aa` |
| 1331 | `.tt-confirm-emp` | color | `#1a1a1a` (L381) | `#e2e8f4` |
| 1332 | `.tt-confirm-cancel` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1332 | `.tt-confirm-cancel` | color | `#7c8dac` (L383) | `#8a97aa` |
| 1333 | `.tt-confirm-cancel:hover` | background | `#f5f5f8` (L384) | `rgba(255,255,255,0.04)` |
| 1334 | `.tt-confirm-ok` | background | `#005268` (L385) | `#0cb8d0` |
| 1334 | `.tt-confirm-ok` | color | `#fff` (L385) | `#111214` |
| 1335 | `.tt-approved-tag` | color | `#059669` (L387) | `#34d399` |
| 1337 | `#requests-view` | background | `#fff` (L233) | `#202226` |
| 1337 | `#requests-view` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.07)` |
| 1338 | `.rv-header` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1339 | `.rv-title` | color | `#1a1a1a` (L236) | `#e2e8f4` |
| 1340 | `#hrReqList` | background | `#fff` (L241) | `#202226` |
| 1340 | `#hrReqList` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.07)` |
| 1340 | `#hrReqList` | box-shadow | `0 2px 8px rgba(0,0,0,0.05)` (L241) | `none` |
| 1341 | `.rv-table th` | background | `#f5f5f8` (L243) | `#202226` |
| 1341 | `.rv-table th` | color | `#a8b6cd` (L243) | `#505a6c` |
| 1341 | `.rv-table th` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1342 | `.rv-table td` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.09)` |
| 1343 | `.rv-table tr:hover td` | background | `#f5f5f8` (L246) | `rgba(255,255,255,0.03)` |
| 1344 | `.rv-table tr.is-new td` | background | `#edf7f5` (L247) | `rgba(12,184,208,0.06)` |
| 1345 | `.rv-table tr.is-new:hover td` | background | `#e3f3f1` (L248) | `rgba(12,184,208,0.09)` |
| 1346 | `.rv-avatar` | background | `transparent` (L250) | `transparent` |
| 1346 | `.rv-avatar` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.28)` |
| 1346 | `.rv-avatar` | color | `#000` (L250) | `#e2e8f4` |
| 1347 | `.rv-emp-name` | color | `#1a1a1a` (L251) | `#e2e8f4` |
| 1348 | `.rv-type-label` | color | `#1a1a1a` (L254) | `#e2e8f4` |
| 1349 | `.rv-details-primary` | color | `#1a1a1a` (L255) | `#e2e8f4` |
| 1350 | `.rv-details-sub` | color | `#7c8dac` (L256) | `#8a97aa` |
| 1351 | `.rv-details-note` | color | `#a8b6cd` (L257) | `#505a6c` |
| 1352 | `.rv-duration` | color | `#1a1a1a` (L258) | `#e2e8f4` |
| 1353 | `.rv-dur-unit` | color | `#7c8dac` (L259) | `#8a97aa` |
| 1354 | `.rv-date` | color | `#a8b6cd` (L260) | `#505a6c` |
| 1355 | `.rv-status.new` | background | `#d4eee9` (L262) | `rgba(12,184,208,0.15)` |
| 1355 | `.rv-status.new` | color | `#005268` (L262) | `#0cb8d0` |
| 1356 | `.rv-status.pending` | background | `#fff8ec` (L263) | `rgba(251,191,36,0.15)` |
| 1356 | `.rv-status.pending` | color | `#d97706` (L263) | `#fbbf24` |
| 1357 | `.rv-status.approved` | background | `#f0fdf4` (L264) | `rgba(52,211,153,0.15)` |
| 1357 | `.rv-status.approved` | color | `#16a34a` (L264) | `#34d399` |
| 1358 | `.rv-status.denied` | background | `#f5f5f8` (L265) | `rgba(255,255,255,0.06)` |
| 1358 | `.rv-status.denied` | color | `#a8b6cd` (L265) | `#505a6c` |
| 1359 | `.rv-reviewer` | color | `#a8b6cd` (L278) | `#505a6c` |
| 1360 | `.rv-empty` | color | `#a8b6cd` (L277) | `#505a6c` |
| 1361 | `.rv-detail-str` | color | `#1a1a1a` (L267) | `#c8d4e8` |
| 1362 | `.rv-dur-str` | color | `#1a1a1a` (L268) | `#e2e8f4` |
| 1363 | `.rv-submitted-str` | color | `#7c8dac` (L269) | `#8a97aa` |
| 1364 | `.rv-type-icon` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.06)!important` |
| 1364 | `.rv-type-icon` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#8a97aa!important` |
| 1365 | `.rv-type-icon[data-reqtype="annual"]` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(37,99,235,0.16)!important` |
| 1365 | `.rv-type-icon[data-reqtype="annual"]` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#60a5fa!important` |
| 1366 | `.rv-type-icon[data-reqtype="sick"]` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(220,38,38,0.16)!important` |
| 1366 | `.rv-type-icon[data-reqtype="sick"]` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#f87171!important` |
| 1367 | `.rv-type-icon[data-reqtype="wfh"]` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(5,150,105,0.16)!important` |
| 1367 | `.rv-type-icon[data-reqtype="wfh"]` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#4ade80!important` |
| 1368 | `.rv-type-icon[data-reqtype="location"]` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(124,58,237,0.16)!important` |
| 1368 | `.rv-type-icon[data-reqtype="location"]` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#c4b5fd!important` |
| 1370 | `.modal-backdrop` | background | `rgba(0,0,0,0.45)` (L964) | `rgba(0,0,0,0.60)` |
| 1371 | `.modal-backdrop .modal` | background | `#fff` (L980) | `#26292e` |
| 1371 | `.modal-backdrop .modal` | box-shadow | `0 24px 60px rgba(0,0,0,0.2)` (L980) | `0 24px 60px rgba(0,0,0,0.60)` |
| 1372 | `.modal-backdrop .modal-header` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1373 | `.modal-backdrop .modal-title` | color | `#005268` (L982) | `#0cb8d0` |
| 1374 | `.modal-backdrop .modal-close` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1374 | `.modal-backdrop .modal-close` | background | `#fff` (L983) | `#26292e` |
| 1374 | `.modal-backdrop .modal-close` | color | `#7c8dac` (L983) | `#8a97aa` |
| 1375 | `.modal-backdrop .modal-close:hover` | border-color | `#7c8dac` (L984) | `rgba(255,255,255,0.20)` |
| 1375 | `.modal-backdrop .modal-close:hover` | color | `#005268` (L984) | `#e2e8f4` |
| 1376 | `.modal-backdrop .modal-footer` | background | `#fff` (L985) | `#26292e` |
| 1376 | `.modal-backdrop .modal-footer` | border-top-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1377 | `.modal-day` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1378 | `.modal-day-icon` | background | `#f5f5f8` (L987) | `rgba(255,255,255,0.06)` |
| 1379 | `.modal-day-label` | color | `#1a1a1a` (L988) | `#e2e8f4` |
| 1380 | `.modal-day-total` | color | `#7c8dac` (L1004) | `#8a97aa` |
| 1381 | `.modal-day-total strong` | color | `#1a1a1a` (L1005) | `#e2e8f4` |
| 1382 | `.modal-add-entry` | color | `#005268` (L1002) | `#0cb8d0` |
| 1383 | `.time-label` | color | `#a8b6cd` (L993) | `#505a6c` |
| 1384 | `.time-input` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `transparent` |
| 1384 | `.time-input` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1384 | `.time-input` | color | `#1a1a1a` (L995) | `#e2e8f4` |
| 1385 | `.time-input:focus` | border-color | `#005268` (L996) | `#0cb8d0` |
| 1385 | `.time-input:focus` | box-shadow | `0 0 0 3px rgba(0,82,104,0.12)` (L996) | `0 0 0 3px rgba(12,184,208,0.12)` |
| 1386 | `.ampm-select` | background-color | `#fff` (L998) | `transparent` |
| 1386 | `.ampm-select` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1386 | `.ampm-select` | color | `#1a1a1a` (L998) | `#e2e8f4` |
| 1387 | `.ampm-select:focus` | border-color | `#005268` (L999) | `#0cb8d0` |
| 1388 | `.entry-remove` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(248,113,113,0.30)` |
| 1388 | `.entry-remove` | background | `#fff` (L1000) | `#26292e` |
| 1388 | `.entry-remove` | color | `#da4d43` (L1000) | `#f87171` |
| 1389 | `.entry-remove:hover` | background | `#fde8e6` (L1001) | `rgba(248,113,113,0.15)` |
| 1390 | `.btn-save` | background | `#fff` (L1009) | `#26292e` |
| 1390 | `.btn-save` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1390 | `.btn-save` | color | `#a8b6cd` (L1009) | `#505a6c` |
| 1391 | `.btn-save.ready` | border-color | `#005268` (L1010) | `#0cb8d0` |
| 1391 | `.btn-save.ready` | color | `#005268` (L1010) | `#0cb8d0` |
| 1392 | `.btn-save.ready:hover` | background | `#005268` (L1011) | `#0cb8d0` |
| 1392 | `.btn-save.ready:hover` | color | `#fff` (L1011) | `#fff` |
| 1393 | `.req-type-btn` | background | `#fff` (L816) | `#202226` |
| 1393 | `.req-type-btn` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1394 | `.req-type-btn:hover` | border-color | `#7c8dac` (L817) | `rgba(255,255,255,0.22)` |
| 1395 | `.req-type-btn.selected` | border-color | `#005268` (L818) | `#0cb8d0` |
| 1395 | `.req-type-btn.selected` | background | `#f0f8fa` (L818) | `rgba(12,184,208,0.08)` |
| 1396 | `.req-type-label` | color | `#1a1a1a` (L820) | `#e2e8f4` |
| 1397 | `.req-type-desc` | color | `#7c8dac` (L821) | `#8a97aa` |
| 1399 | `.balance-card` | background | `#fff` (L886) | `#202226` |
| 1399 | `.balance-card` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.07)` |
| 1400 | `.bal-icon` | color | `#005268` (L887) | `#0cb8d0` |
| 1401 | `.bal-number` | color | `#1a1a1a` (L888) | `#e2e8f4` |
| 1402 | `.bal-name` | color | `#1a1a1a` (L889) | `#e2e8f4` |
| 1403 | `.bal-sub` | color | `#a8b6cd` (L890) | `#505a6c` |
| 1404 | `.bal-action-btn` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1404 | `.bal-action-btn` | background | `#fff` (L892) | `#26292e` |
| 1405 | `.bal-action-btn:hover` | border-color | `#7c8dac` (L893) | `rgba(255,255,255,0.20)` |
| 1406 | `.upcoming-row` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.09)` |
| 1407 | `.upcoming-icon-wrap` | background | `#f5f5f8` (L896) | `rgba(255,255,255,0.06)` |
| 1407 | `.upcoming-icon-wrap` | color | `#7c8dac` (L896) | `#8a97aa` |
| 1408 | `.upcoming-date` | color | `#1a1a1a` (L897) | `#e2e8f4` |
| 1409 | `.upcoming-name` | color | `#7c8dac` (L898) | `#8a97aa` |
| 1410 | `.req-tab` | background | `#fff` (L794) | `#26292e` |
| 1410 | `.req-tab` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1410 | `.req-tab` | color | `#7c8dac` (L794) | `#8a97aa` |
| 1411 | `.req-tab.active` | background | `rgba(0,82,104,0.08)` (L795) | `rgba(12,184,208,0.12)` |
| 1411 | `.req-tab.active` | border-color | `#005268` (L795) | `#0cb8d0` |
| 1411 | `.req-tab.active` | color | `#005268` (L795) | `#0cb8d0` |
| 1412 | `.req-table-wrap` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.07)` |
| 1413 | `.req-table th` | background | `#f5f5f8` (L799) | `#202226` |
| 1413 | `.req-table th` | color | `#a8b6cd` (L799) | `#505a6c` |
| 1413 | `.req-table th` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1414 | `.req-table td` | color | `#1a1a1a` (L800) | `#e2e8f4` |
| 1414 | `.req-table td` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.03)` |
| 1415 | `.req-table td small` | color | `#a8b6cd` (L802) | `#505a6c` |
| 1416 | `.req-status.pending` | background | `#fef3c7` (L806) | `rgba(251,191,36,0.15)` |
| 1416 | `.req-status.pending` | color | `#d97706` (L806) | `#fbbf24` |
| 1417 | `.req-status.approved` | background | `#c1f0d5` (L807) | `rgba(52,211,153,0.15)` |
| 1417 | `.req-status.approved` | color | `#179484` (L807) | `#34d399` |
| 1418 | `.req-status.denied` | background | `#fde8e6` (L808) | `rgba(248,113,113,0.15)` |
| 1418 | `.req-status.denied` | color | `#da4d43` (L808) | `#f87171` |
| 1419 | `.req-empty` | color | `#a8b6cd` (L809) | `#505a6c` |
| 1420 | `.back-link` | color | `#7c8dac` (L920) | `#8a97aa` |
| 1421 | `.back-link:hover` | color | `#005268` (L921) | `#0cb8d0` |
| 1422 | `.request-page-title` | color | `#005268` (L922) | `#0cb8d0` |
| 1423 | `.request-form-wrap` | background | `#fff` (L924) | `#202226` |
| 1423 | `.request-form-wrap` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.07)` |
| 1424 | `.req-label` | color | `#1a1a1a` (L926) | `#e2e8f4` |
| 1425 | `.req-date-input` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `transparent` |
| 1425 | `.req-date-input` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1425 | `.req-date-input` | color | `#1a1a1a` (L932) | `#e2e8f4` |
| 1426 | `.req-date-input:focus` | border-color | `#005268` (L934) | `#0cb8d0` |
| 1426 | `.req-date-input:focus` | box-shadow | `0 0 0 3px rgba(0,82,104,0.12)` (L934) | `0 0 0 3px rgba(12,184,208,0.12)` |
| 1427 | `.req-amount-input` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `transparent` |
| 1427 | `.req-amount-input` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1427 | `.req-amount-input` | color | `#1a1a1a` (L939) | `#e2e8f4` |
| 1428 | `.req-amount-input:focus` | border-color | `#005268` (L940) | `#0cb8d0` |
| 1428 | `.req-amount-input:focus` | box-shadow | `0 0 0 3px rgba(0,82,104,0.12)` (L940) | `0 0 0 3px rgba(12,184,208,0.12)` |
| 1429 | `.req-amount-unit` | color | `#7c8dac` (L945) | `#8a97aa` |
| 1430 | `.req-textarea-to` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `#202226` |
| 1430 | `.req-textarea-to` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1430 | `.req-textarea-to` | color | `#1a1a1a` (L946) | `#e2e8f4` |
| 1431 | `.req-textarea-to:focus` | border-color | `#005268` (L947) | `#0cb8d0` |
| 1432 | `.req-date-sep` | color | `#a8b6cd` (L935) | `#505a6c` |
| 1433 | `.request-balance-sidebar` | background | `#fff` (L948) | `#202226` |
| 1433 | `.request-balance-sidebar` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.07)` |
| 1434 | `.bal-sidebar-header` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1434 | `.bal-sidebar-header` | color | `#7c8dac` (L949) | `#8a97aa` |
| 1435 | `.bal-sidebar-date` | color | `#1a1a1a` (L950) | `#e2e8f4` |
| 1436 | `.bal-sidebar-item` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.04)` |
| 1437 | `.bal-sidebar-icon` | background | `#f5f5f8` (L955) | `rgba(255,255,255,0.06)` |
| 1437 | `.bal-sidebar-icon` | color | `#7c8dac` (L955) | `#8a97aa` |
| 1438 | `.bal-sidebar-name` | color | `#1a1a1a` (L956) | `#e2e8f4` |
| 1439 | `.bal-sidebar-amount` | color | `#a8b6cd` (L957) | `#505a6c` |
| 1440 | `.request-footer` | border-top-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1441 | `.btn-req-cancel` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1441 | `.btn-req-cancel` | color | `#7c8dac` (L959) | `#8a97aa` |
| 1442 | `.btn-req-cancel:hover` | background | `#f5f5f8` (L960) | `rgba(255,255,255,0.04)` |
| 1443 | `.btn-req-send` | background | `#fff` (L961) | `#202226` |
| 1443 | `.btn-req-send` | color | `#005268` (L961) | `#0cb8d0` |
| 1443 | `.btn-req-send` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#0cb8d0` |
| 1444 | `.btn-req-send:hover` | background | `#005268` (L962) | `#0cb8d0` |
| 1444 | `.btn-req-send:hover` | color | `#fff` (L962) | `#fff` |
| 1445 | `.hist-table th` | background | `#f5f5f8` (L910) | `#202226` |
| 1445 | `.hist-table th` | color | `#a8b6cd` (L910) | `#505a6c` |
| 1445 | `.hist-table th` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1446 | `.hist-table td` | color | `#1a1a1a` (L911) | `#e2e8f4` |
| 1446 | `.hist-table td` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.03)` |
| 1447 | `.hist-table td:first-child` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#8a97aa` |
| 1448 | `.hist-range-picker` | background | `#fff` (L900) | `#26292e` |
| 1448 | `.hist-range-picker` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1449 | `.hist-range-picker:focus-within` | border-color | `#005268` (L901) | `#0cb8d0` |
| 1450 | `.hist-range-icon` | color | `#005268` (L902) | `#0cb8d0` |
| 1451 | `.hist-range-sep` | color | `#a8b6cd` (L904) | `#505a6c` |
| 1452 | `.hist-range-input` | color | `#1a1a1a` (L905) | `#e2e8f4` |
| 1453 | `.hist-table td.num` | color | `#a8b6cd` (L915) | `#505a6c` |
| 1454 | `.hist-table td.num:last-child` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#e2e8f4` |
| 1455 | `.hist-table td.pos` | color | `#179484` (L916) | `#34d399` |
| 1456 | `.hist-table td.neg` | color | `#da4d43` (L917) | `#f87171` |
| 1457 | `.req-success-backdrop` | background | `rgba(20,30,48,0.35)` (L969) | `rgba(0,5,20,0.65)` |
| 1458 | `.req-success-card` | background | `#fff` (L971) | `#26292e` |
| 1458 | `.req-success-card` | box-shadow | `0 24px 64px rgba(0,0,0,0.30)` (L971) | `0 24px 64px rgba(0,0,0,0.60)` |
| 1459 | `.req-success-icon` | background | `#e8f5f3` (L972) | `rgba(23,148,132,0.18)` |
| 1459 | `.req-success-icon` | color | `#179484` (L972) | `#2dd4bf` |
| 1460 | `.req-success-title` | color | `#005268` (L973) | `#0cb8d0` |
| 1461 | `.req-success-sub` | color | `#7c8dac` (L974) | `#8a97aa` |
| 1462 | `.req-success-btn-new` | background | `#fff` (L976) | `#202226` |
| 1462 | `.req-success-btn-new` | color | `#005268` (L976) | `#0cb8d0` |
| 1462 | `.req-success-btn-new` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#0cb8d0` |
| 1463 | `.req-success-btn-new:hover` | background | `#005268` (L977) | `#0cb8d0` |
| 1463 | `.req-success-btn-new:hover` | color | `#fff` (L977) | `#fff` |
| 1464 | `.req-success-btn-back` | background | `#005268` (L978) | `#0cb8d0` |
| 1464 | `.req-success-btn-back` | color | `#fff` (L978) | `#111214` |
| 1465 | `.req-success-btn-back:hover` | background | `#003d50` (L979) | `#0aacc3` |
| 1467 | `.ts-select` | background-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `transparent` |
| 1467 | `.ts-select` | background-image | `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' v` (L836) | `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' f` |
| 1467 | `.ts-select` | background-repeat | `no-repeat` (L836) | `no-repeat` |
| 1467 | `.ts-select` | background-position | `right 10px center` (L836) | `right 10px center` |
| 1467 | `.ts-select` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1467 | `.ts-select` | color | `#1a1a1a` (L836) | `#e2e8f4` |
| 1468 | `.ts-select:focus` | border-color | `#005268` (L837) | `#0cb8d0` |
| 1468 | `.ts-select:focus` | box-shadow | `0 0 0 3px rgba(0,82,104,0.12)` (L837) | `0 0 0 3px rgba(12,184,208,0.12)` |
| 1469 | `.ts-btn` | background | `transparent` (L839) | `transparent` |
| 1469 | `.ts-btn` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1469 | `.ts-btn` | color | `#7c8dac` (L839) | `#8a97aa` |
| 1470 | `.ts-btn:hover` | background | `#f5f5f8` (L840) | `rgba(255,255,255,0.04)` |
| 1471 | `.ts-btn-primary` | background | `#005268` (L841) | `#0cb8d0` |
| 1471 | `.ts-btn-primary` | color | `#fff` (L841) | `#111214` |
| 1472 | `.day-row` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.04)` |
| 1473 | `.day-chip` | background | `#fff` (L857) | `#26292e` |
| 1474 | `.day-chip.today` | background | `#005268` (L858) | `rgba(12,184,208,0.12)` |
| 1474 | `.day-chip.today` | border | *(no light rule for this exact selector — inherits/UA/other rule)* | `1.5px solid #0cb8d0` |
| 1475 | `.day-name` | color | `#1a1a1a` (L859) | `#e2e8f4` |
| 1476 | `.day-date` | color | `#a8b6cd` (L861) | `#8a97aa` |
| 1477 | `.day-name.today` | color | `white` (L860) | `#0cb8d0` |
| 1478 | `.day-date.today` | color | `rgba(255,255,255,0.65)` (L862) | `rgba(12,184,208,0.75)` |
| 1479 | `.day-hours` | color | `#1a1a1a` (L863) | `#e2e8f4` |
| 1480 | `.day-hours.zero` | color | `#a8b6cd` (L864) | `#505a6c` |
| 1481 | `.day-hours.empty` | color | `#e5e7ec` (L865) | `#2a3548` |
| 1482 | `.day-range` | color | `#a8b6cd` (L866) | `#505a6c` |
| 1483 | `.approval-note` | background | `#f5f5f8` (L867) | `rgba(255,255,255,0.04)` |
| 1483 | `.approval-note` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.07)` |
| 1483 | `.approval-note` | color | `#7c8dac` (L867) | `#8a97aa` |
| 1484 | `.ts-stat-card` | background | `#fff` (L868) | `#202226` |
| 1484 | `.ts-stat-card` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.07)` |
| 1485 | `.ts-stat-label` | color | `#a8b6cd` (L869) | `#505a6c` |
| 1486 | `.ts-stat-value` | color | `#005268` (L870) | `#0cb8d0` |
| 1487 | `.ts-stat-sub` | color | `#a8b6cd` (L871) | `#505a6c` |
| 1488 | `.mini-bar.filled` | background | `#005268` (L875) | `#0cb8d0` |
| 1489 | `.mini-bar.empty` | background | `#e5e7ec` (L876) | `rgba(255,255,255,0.07)` |
| 1490 | `.mini-bar-label` | color | `#a8b6cd` (L877) | `#505a6c` |
| 1491 | `.add-entry-link` | color | `#005268` (L878) | `#0cb8d0` |
| 1492 | `.fill-modal-label` | color | `#a8b6cd` (L845) | `#505a6c` |
| 1493 | `.fill-modal-input` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `transparent` |
| 1493 | `.fill-modal-input` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1493 | `.fill-modal-input` | color | `#1a1a1a` (L846) | `#e2e8f4` |
| 1494 | `.fill-modal-input:focus` | border-color | `#005268` (L847) | `#0cb8d0` |
| 1494 | `.fill-modal-input:focus` | box-shadow | `0 0 0 3px rgba(0,82,104,0.12)` (L847) | `0 0 0 3px rgba(12,184,208,0.12)` |
| 1495 | `.fill-modal-note` | color | `#7c8dac` (L848) | `#8a97aa` |
| 1496 | `.fill-modal-footer` | border-top-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1497 | `.period-label` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#e2e8f4` |
| 1498 | `.period-divider` | color | `#a8b6cd` (L853) | `#505a6c` |
| 1499 | `.period-divider::before` | background | `#e5e7ec` (L854) | `rgba(255,255,255,0.07)` |
| 1499 | `.period-divider::after` | background | `#e5e7ec` (L854) | `rgba(255,255,255,0.07)` |
| 1500 | `.period-icon` | background | `#f5f5f8` (L851) | `rgba(255,255,255,0.06)` |
| 1501 | `.calc-modal-user` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1502 | `.calc-user-avatar` | background | `#e5e7ec` (L1013) | `#26292e` |
| 1502 | `.calc-user-avatar` | color | `#7c8dac` (L1013) | `#8a97aa` |
| 1503 | `.calc-fields` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1504 | `.calc-result-wrap` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1505 | `.calc-result-box` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1506 | `.calc-result-number` | color | `#005268` (L1018) | `#0cb8d0` |
| 1507 | `.calc-accrual-btn` | background | `#fff` (L1019) | `#202226` |
| 1507 | `.calc-accrual-btn` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#0cb8d0` |
| 1507 | `.calc-accrual-btn` | color | `#005268` (L1019) | `#0cb8d0` |
| 1508 | `.calc-accrual-btn:hover` | background | `#f5f5f8` (L1020) | `rgba(12,184,208,0.08)` |
| 1509 | `.calc-footer` | background | `#fff` (L1021) | `#202226` |
| 1510 | `.btn-close-calc` | background | `#fff` (L1022) | `#202226` |
| 1510 | `.btn-close-calc` | color | `#005268` (L1022) | `#0cb8d0` |
| 1510 | `.btn-close-calc` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#0cb8d0` |
| 1511 | `.btn-close-calc:hover` | background | `#005268` (L1023) | `#0cb8d0` |
| 1511 | `.btn-close-calc:hover` | color | `#fff` (L1023) | `#fff` |
| 1513 | `.wfh-month-label` | color | `#1a1a1a` (L739) | `#e2e8f4` |
| 1514 | `.wfh-nav-btn` | background | `#fff` (L740) | `#26292e` |
| 1514 | `.wfh-nav-btn` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1514 | `.wfh-nav-btn` | color | `#7c8dac` (L740) | `#8a97aa` |
| 1515 | `.wfh-nav-btn:hover` | background | `#f5f5f8` (L741) | `rgba(255,255,255,0.05)` |
| 1515 | `.wfh-nav-btn:hover` | color | `#1a1a1a` (L741) | `#e2e8f4` |
| 1516 | `.wfh-legend-item` | color | `#7c8dac` (L743) | `#8a97aa` |
| 1517 | `.wfh-legend-dot.wfh` | background | `#c1f0d5` (L745) | `rgba(45,212,191,0.50)` |
| 1518 | `.wfh-legend-dot.office` | background | `#dbeafe` (L746) | `rgba(96,165,250,0.50)` |
| 1519 | `.wfh-legend-dot.away` | background | `#fde8e6` (L747) | `rgba(248,113,113,0.50)` |
| 1520 | `.wfh-prefs-card` | background | `#fff` (L749) | `#202226` |
| 1520 | `.wfh-prefs-card` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.07)` |
| 1521 | `.wfh-prefs-title` | color | `#1a1a1a` (L751) | `#e2e8f4` |
| 1522 | `.wfh-prefs-badge.approved` | background | `#c1f0d5` (L753) | `rgba(45,212,191,0.16)` |
| 1522 | `.wfh-prefs-badge.approved` | color | `#179484` (L753) | `#2dd4bf` |
| 1523 | `.wfh-prefs-badge.pending` | background | `#fef3c7` (L754) | `rgba(251,191,36,0.15)` |
| 1523 | `.wfh-prefs-badge.pending` | color | `#d97706` (L754) | `#fbbf24` |
| 1524 | `.wfh-prefs-sub` | color | `#7c8dac` (L755) | `#8a97aa` |
| 1525 | `.wfh-day-label` | color | `#7c8dac` (L759) | `#8a97aa` |
| 1526 | `.wfh-day-box` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1526 | `.wfh-day-box` | background | `#f5f5f8` (L760) | `rgba(255,255,255,0.04)` |
| 1527 | `.wfh-day-check input:checked~.wfh-day-box` | background | `#c1f0d5` (L761) | `rgba(45,212,191,0.20)` |
| 1527 | `.wfh-day-check input:checked~.wfh-day-box` | border-color | `#c1f0d5` (L761) | `rgba(45,212,191,0.50)` |
| 1527 | `.wfh-day-check input:checked~.wfh-day-box` | color | `#179484` (L761) | `#2dd4bf` |
| 1528 | `.wfh-day-check.pending-day input:checked~.wfh-day-box` | background | `#fef3c7` (L762) | `rgba(251,191,36,0.16)` |
| 1528 | `.wfh-day-check.pending-day input:checked~.wfh-day-box` | border-color | `#f59e0b` (L762) | `rgba(251,191,36,0.50)` |
| 1528 | `.wfh-day-check.pending-day input:checked~.wfh-day-box` | color | `#d97706` (L762) | `#fbbf24` |
| 1529 | `.wfh-day-check:hover .wfh-day-box` | border-color | `#7c8dac` (L765) | `rgba(255,255,255,0.25)` |
| 1530 | `.wfh-stat-card` | background | `#fff` (L767) | `#202226` |
| 1530 | `.wfh-stat-card` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.07)` |
| 1531 | `.wfh-stat-num` | color | `#1a1a1a` (L769) | `#e2e8f4` |
| 1532 | `.wfh-stat-label` | color | `#7c8dac` (L770) | `#8a97aa` |
| 1533 | `.wfh-cal` | background | `#fff` (L771) | `#202226` |
| 1533 | `.wfh-cal` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.07)` |
| 1534 | `.wfh-cal-head` | background | `#f5f5f8` (L772) | `#202226` |
| 1534 | `.wfh-cal-head` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1535 | `.wfh-cal-daylabel` | color | `#7c8dac` (L773) | `#505a6c` |
| 1536 | `.wfh-cell` | border-right-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.05)` |
| 1536 | `.wfh-cell` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.09)` |
| 1537 | `.wfh-cell.weekend` | background | `#fafafa` (L778) | `rgba(255,255,255,0.01)` |
| 1538 | `.wfh-cell.today` | background | `#f0f8fa` (L779) | `rgba(12,184,208,0.07)` |
| 1539 | `.wfh-cell-num` | color | `#7c8dac` (L780) | `#8a97aa` |
| 1540 | `.wfh-cell.today .wfh-cell-num` | background | `#005268` (L781) | `rgba(12,184,208,0.12)` |
| 1540 | `.wfh-cell.today .wfh-cell-num` | color | `#fff` (L781) | `#0cb8d0` |
| 1541 | `.wfh-status-pill.wfh` | background | `#c1f0d5` (L783) | `rgba(45,212,191,0.18)` |
| 1541 | `.wfh-status-pill.wfh` | color | `#179484` (L783) | `#2dd4bf` |
| 1542 | `.wfh-status-pill.office` | background | `#dbeafe` (L784) | `rgba(96,165,250,0.18)` |
| 1542 | `.wfh-status-pill.office` | color | `#1d4ed8` (L784) | `#60a5fa` |
| 1543 | `.wfh-status-pill.away` | background | `#fde8e6` (L785) | `rgba(248,113,113,0.18)` |
| 1543 | `.wfh-status-pill.away` | color | `#da4d43` (L785) | `#f87171` |
| 1545 | `.sidebar` | background | `#fff` (L499) | `#202226` |
| 1545 | `.sidebar` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.07)` |
| 1545 | `.sidebar` | box-shadow | `0 2px 8px rgba(0,0,0,0.06)` (L499) | `none` |
| 1546 | `.reminders-card` | background | `#fff` (L500) | `#202226` |
| 1546 | `.reminders-card` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.07)` |
| 1546 | `.reminders-card` | box-shadow | `0 2px 8px rgba(0,0,0,0.06)` (L500) | `none` |
| 1547 | `.reminders-card-title` | color | `#a8b6cd` (L501) | `#505a6c` |
| 1548 | `.reminder-row` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.06)` |
| 1549 | `.reminder-name` | color | `#1a1a1a` (L506) | `#e2e8f4` |
| 1550 | `.reminder-detail` | color | `#7c8dac` (L507) | `#8a97aa` |
| 1551 | `.reminder-when` | color | `#005268` (L508) | `#0cb8d0` |
| 1552 | `.sidebar-profile` | background | `#f5f5f8` (L509) | `rgba(255,255,255,0.04)` |
| 1553 | `.sp-avatar` | background | `transparent` (L510) | `transparent` |
| 1553 | `.sp-avatar` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.28)` |
| 1553 | `.sp-avatar` | color | `#000000` (L510) | `#e2e8f4` |
| 1554 | `.sp-name` | color | `#1a1a1a` (L512) | `#e2e8f4` |
| 1555 | `.sp-role` | color | `#7c8dac` (L513) | `#8a97aa` |
| 1556 | `.sidebar-label` | color | `#a8b6cd` (L515) | `#505a6c` |
| 1557 | `.sidebar-text` | color | `#1a1a1a` (L519) | `#e2e8f4` |
| 1558 | `.sidebar-icon` | color | `#7c8dac` (L518) | `#8a97aa` |
| 1559 | `.sidebar-divider` | background | `#f0f1f4` (L521) | `rgba(255,255,255,0.07)` |
| 1560 | `.manager-avatar` | background | `transparent` (L524) | `transparent` |
| 1560 | `.manager-avatar` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.28)` |
| 1560 | `.manager-avatar` | color | `#000000` (L524) | `#e2e8f4` |
| 1561 | `.manager-name` | color | `#005268` (L525) | `#0cb8d0` |
| 1562 | `.manager-role` | color | `#a8b6cd` (L526) | `#505a6c` |
| 1564 | `.content-card-wrap` | background | `#fff` (L530) | `#202226` |
| 1564 | `.content-card-wrap` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.07)` |
| 1564 | `.content-card-wrap` | box-shadow | `0 2px 8px rgba(0,0,0,0.05)` (L530) | `none` |
| 1565 | `.content-tabs` | background | `#fff` (L531) | `#202226` |
| 1565 | `.content-tabs` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1566 | `.profile-tab` | color | `#7c8dac` (L534) | `#8a97aa` |
| 1567 | `.profile-tab:hover` | color | `#1a1a1a` (L535) | `#e2e8f4` |
| 1568 | `.profile-tab.active` | color | `#005268` (L536) | `#0cb8d0` |
| 1568 | `.profile-tab.active` | border-bottom-color | `#005268` (L536) | `#0cb8d0` |
| 1570 | `#panel-myinfo .card` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1571 | `#panel-myinfo .card-title` | color | `#1a1a1a` (L623) | `#e2e8f4` |
| 1572 | `.field-label` | color | `#a8b6cd` (L631) | `#505a6c` |
| 1573 | `.field-value` | background | `#fff` (L632) | `transparent` |
| 1573 | `.field-value` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1573 | `.field-value` | color | `#1a1a1a` (L632) | `#e2e8f4` |
| 1574 | `.field-value::placeholder` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#505a6c` |
| 1575 | `.field-value.readonly-field` | background | `#f5f5f8` (L633) | `rgba(255,255,255,0.04)` |
| 1575 | `.field-value.readonly-field` | color | `#7c8dac` (L633) | `#8a97aa` |
| 1576 | `.field-value:not(.readonly-field):hover` | border-color | `#a8b6cd` (L634) | `rgba(255,255,255,0.20)` |
| 1577 | `.field-value:not(.readonly-field):focus` | border-color | `#005268` (L635) | `#0cb8d0` |
| 1577 | `.field-value:not(.readonly-field):focus` | box-shadow | `0 0 0 3px rgba(0,82,104,0.12)` (L635) | `0 0 0 3px rgba(12,184,208,0.12)` |
| 1578 | `select.field-value` | background-color | `#fff` (L636) | `transparent` |
| 1578 | `select.field-value` | background-image | `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' v` (L636) | `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' f` |
| 1578 | `select.field-value` | background-repeat | `no-repeat` (L636) | `no-repeat` |
| 1578 | `select.field-value` | background-position | `right 10px center` (L636) | `right 10px center` |
| 1579 | `.field-note` | color | `#a8b6cd` (L637) | `#505a6c` |
| 1580 | `.save-bar` | background | `#005268` (L638) | `#0cb8d0` |
| 1580 | `.save-bar` | color | `#fff` (L638) | `#111214` |
| 1582 | `.datepicker-input` | background | `#fff` (L648) | `transparent` |
| 1582 | `.datepicker-input` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1582 | `.datepicker-input` | color | `#1a1a1a` (L648) | `#e2e8f4` |
| 1583 | `.datepicker-input::placeholder` | color | `#a8b6cd` (L649) | `#505a6c` |
| 1584 | `.datepicker-input:hover` | border-color | `#a8b6cd` (L650) | `rgba(255,255,255,0.20)` |
| 1585 | `.datepicker-input:focus` | border-color | `#005268` (L651) | `#0cb8d0` |
| 1585 | `.datepicker-input:focus` | box-shadow | `0 0 0 3px rgba(0,82,104,0.12)` (L651) | `0 0 0 3px rgba(12,184,208,0.12)` |
| 1586 | `.datepicker-icon` | color | `#005268` (L653) | `#0cb8d0` |
| 1587 | `.datepicker-cal` | background | `#fff` (L654) | `#26292e` |
| 1587 | `.datepicker-cal` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.08)` |
| 1587 | `.datepicker-cal` | box-shadow | `0 8px 32px rgba(0,0,0,0.12),0 2px 8px rgba(0,0,0,0.06)` (L654) | `0 8px 32px rgba(0,0,0,0.50)` |
| 1588 | `.dp-month-label` | color | `#1a1a1a` (L657) | `#e2e8f4` |
| 1589 | `.dp-month-label:hover` | color | `#005268` (L658) | `#0cb8d0` |
| 1590 | `.dp-nav` | background | `#fff` (L659) | `#202226` |
| 1590 | `.dp-nav` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1590 | `.dp-nav` | color | `#7c8dac` (L659) | `#8a97aa` |
| 1591 | `.dp-nav:hover` | background | `#f5f5f8` (L660) | `rgba(255,255,255,0.06)` |
| 1591 | `.dp-nav:hover` | color | `#005268` (L660) | `#0cb8d0` |
| 1591 | `.dp-nav:hover` | border-color | `#c1ecf0` (L660) | `rgba(12,184,208,0.40)` |
| 1592 | `.dp-wd` | color | `#a8b6cd` (L662) | `#505a6c` |
| 1593 | `.dp-day` | color | `#1a1a1a` (L664) | `#e2e8f4` |
| 1594 | `.dp-day:hover` | background | `#f0f8fa` (L665) | `rgba(12,184,208,0.10)` |
| 1594 | `.dp-day:hover` | color | `#005268` (L665) | `#0cb8d0` |
| 1595 | `.dp-day.other-month` | color | `#d0d7e3` (L666) | `#2a3548` |
| 1596 | `.dp-day.other-month:hover` | background | `#f5f5f8` (L667) | `rgba(255,255,255,0.04)` |
| 1596 | `.dp-day.other-month:hover` | color | `#a8b6cd` (L667) | `#505a6c` |
| 1597 | `.dp-day.selected` | background | `#005268` (L668) | `#0cb8d0` |
| 1597 | `.dp-day.selected` | color | `#fff` (L668) | `#fff` |
| 1598 | `.dp-day.selected:hover` | background | `#004257` (L669) | `#0aacc3` |
| 1599 | `.dp-day.today:not(.selected)` | color | `#005268` (L670) | `#0cb8d0` |
| 1599 | `.dp-day.today:not(.selected)` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(12,184,208,0.40)` |
| 1600 | `.dp-year-item` | color | `#1a1a1a` (L672) | `#e2e8f4` |
| 1601 | `.dp-year-item:hover` | background | `#f0f8fa` (L673) | `rgba(12,184,208,0.10)` |
| 1601 | `.dp-year-item:hover` | color | `#005268` (L673) | `#0cb8d0` |
| 1602 | `.dp-year-item.selected` | background | `#005268` (L674) | `#0cb8d0` |
| 1602 | `.dp-year-item.selected` | color | `#fff` (L674) | `#fff` |
| 1604 | `.phone-input-wrap` | background | `#fff` (L585) | `#26292e` |
| 1604 | `.phone-input-wrap` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1605 | `.phone-input-wrap:focus-within` | border-color | `#005268` (L589) | `#0cb8d0` |
| 1605 | `.phone-input-wrap:focus-within` | box-shadow | `0 0 0 3px rgba(0,82,104,0.12)` (L589) | `0 0 0 3px rgba(12,184,208,0.12)` |
| 1606 | `.phone-code-btn` | background | `#fff` (L592) | `#26292e` |
| 1606 | `.phone-code-btn` | border-right-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1607 | `.phone-code-btn:hover` | background | `#f5f5f8` (L593) | `rgba(255,255,255,0.05)` |
| 1608 | `.phone-flag` | color | `#1a1a1a` (L594) | `#e2e8f4` |
| 1608 | `.phone-code-val` | color | `#1a1a1a` (L595) | `#e2e8f4` |
| 1609 | `.phone-drop-arrow` | color | `#a8b6cd` (L596) | `#505a6c` |
| 1610 | `.phone-code-drop` | background | `#fff` (L598) | `#26292e` |
| 1610 | `.phone-code-drop` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.08)` |
| 1610 | `.phone-code-drop` | box-shadow | `0 8px 24px rgba(0,0,0,0.10),0 2px 6px rgba(0,0,0,0.06)` (L598) | `0 8px 24px rgba(0,0,0,0.50)` |
| 1611 | `.phone-code-opt` | color | `#1a1a1a` (L600) | `#c8d4e8` |
| 1612 | `.phone-code-opt:hover` | background | `#f5f5f8` (L603) | `rgba(255,255,255,0.05)` |
| 1613 | `.phone-code-opt.selected` | background | `#f0f8fa` (L604) | `rgba(12,184,208,0.10)` |
| 1613 | `.phone-code-opt.selected` | color | `#005268` (L604) | `#0cb8d0` |
| 1614 | `.opt-name` | color | `#7c8dac` (L607) | `#505a6c` |
| 1615 | `.phone-number-input` | color | `#1a1a1a` (L608) | `#e2e8f4` |
| 1616 | `.phone-number-input::placeholder` | color | `#a8b6cd` (L609) | `#505a6c` |
| 1618 | `.dir-search` | background | `#fff` (L682) | `transparent` |
| 1618 | `.dir-search` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1618 | `.dir-search` | color | `#1a1a1a` (L682) | `#e2e8f4` |
| 1619 | `.dir-search::placeholder` | color | `#a8b6cd` (L683) | `#505a6c` |
| 1620 | `.dir-search:focus` | border-color | `#005268` (L684) | `#0cb8d0` |
| 1620 | `.dir-search:focus` | box-shadow | `0 0 0 3px rgba(0,82,104,0.10)` (L684) | `0 0 0 3px rgba(12,184,208,0.10)` |
| 1621 | `.dir-search-icon` | color | `#7c8dac` (L681) | `#505a6c` |
| 1622 | `.dir-ctrl-label` | color | `#a8b6cd` (L685) | `#505a6c` |
| 1623 | `.dir-select` | background-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `transparent` |
| 1623 | `.dir-select` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1623 | `.dir-select` | color | `#1a1a1a` (L686) | `#e2e8f4` |
| 1624 | `.dir-select:focus` | border-color | `#005268` (L687) | `#0cb8d0` |
| 1625 | `.dir-count` | color | `#7c8dac` (L688) | `#8a97aa` |
| 1626 | `.dept-chip` | background | `#fff` (L690) | `#26292e` |
| 1626 | `.dept-chip` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1626 | `.dept-chip` | color | `#7c8dac` (L690) | `#8a97aa` |
| 1627 | `.dept-chip.active` | background | `rgba(0,82,104,0.08)` (L691) | `rgba(12,184,208,0.12)` |
| 1627 | `.dept-chip.active` | color | `#005268` (L691) | `#0cb8d0` |
| 1627 | `.dept-chip.active` | border-color | `#005268` (L691) | `#0cb8d0` |
| 1628 | `.dept-chip:hover:not(.active)` | background | `#f5f5f8` (L692) | `rgba(255,255,255,0.05)` |
| 1629 | `.dir-alpha-header` | color | `#a8b6cd` (L694) | `#505a6c` |
| 1629 | `.dir-alpha-header` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1630 | `.dir-row` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.09)` |
| 1631 | `.dir-row:hover` | background | `#f5f7fa` (L697) | `rgba(255,255,255,0.03)` |
| 1632 | `.dir-row:hover .dir-name` | color | `#003d50` (L698) | `#0cb8d0` |
| 1633 | `.dir-avatar` | background | `transparent` (L699) | `transparent` |
| 1633 | `.dir-avatar` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.28)` |
| 1633 | `.dir-avatar` | color | `#000` (L699) | `#e2e8f4` |
| 1634 | `.dir-name` | color | `#1a1a1a` (L701) | `#e2e8f4` |
| 1635 | `.dir-you` | background | `#f0f8fa` (L702) | `rgba(12,184,208,0.12)` |
| 1635 | `.dir-you` | color | `#005268` (L702) | `#0cb8d0` |
| 1636 | `.dir-sub` | color | `#7c8dac` (L703) | `#8a97aa` |
| 1637 | `.dir-contact-row` | color | `#1a1a1a` (L705) | `#e2e8f4` |
| 1638 | `.dir-contact-icon` | color | `#a8b6cd` (L706) | `#505a6c` |
| 1639 | `.dir-reports` | color | `#7c8dac` (L707) | `#8a97aa` |
| 1640 | `.dir-manager-link` | color | `#005268` (L708) | `#0cb8d0` |
| 1642 | `.emp-qcard-backdrop` | background | `rgba(0,0,0,0.45)` (L711) | `rgba(0,0,0,0.60)` |
| 1643 | `.emp-qcard` | background | `#fff` (L712) | `#26292e` |
| 1643 | `.emp-qcard` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.08)` |
| 1643 | `.emp-qcard` | box-shadow | `0 24px 60px rgba(0,0,0,0.2)` (L712) | `0 24px 60px rgba(0,0,0,0.60)` |
| 1644 | `.emp-qcard-close` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.10)` |
| 1644 | `.emp-qcard-close` | background | `#fff` (L713) | `#26292e` |
| 1644 | `.emp-qcard-close` | color | `#7c8dac` (L713) | `#8a97aa` |
| 1645 | `.emp-qcard-close:hover` | background | `#f5f5f8` (L714) | `rgba(255,255,255,0.06)` |
| 1646 | `.emp-qcard-avatar` | background | `transparent` (L716) | `transparent` |
| 1646 | `.emp-qcard-avatar` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.28)` |
| 1646 | `.emp-qcard-avatar` | color | `#000` (L716) | `#e2e8f4` |
| 1647 | `.emp-qcard-name` | color | `#1a1a1a` (L717) | `#e2e8f4` |
| 1648 | `.emp-qcard-sub` | color | `#7c8dac` (L718) | `#8a97aa` |
| 1649 | `.emp-qcard-rows` | border-top-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1650 | `.emp-qcard-row` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.06)` |
| 1650 | `.emp-qcard-row` | color | `#1a1a1a` (L720) | `#e2e8f4` |
| 1651 | `.emp-qcard-icon` | color | `#a8b6cd` (L722) | `#505a6c` |
| 1652 | `.emp-qcard-email-row` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.06)` |
| 1652 | `.emp-qcard-email-row` | color | `#1a1a1a` (L723) | `#e2e8f4` |
| 1653 | `.eqa-btn` | color | `#a8b6cd` (L727) | `#505a6c` |
| 1654 | `.eqa-btn:hover` | color | `#005268` (L728) | `#0cb8d0` |
| 1654 | `.eqa-btn:hover` | background | `#f0f4f8` (L728) | `rgba(12,184,208,0.10)` |
| 1656 | `.today-greeting h1` | color | `#1a1a1a` (L556) | `#e2e8f4` |
| 1657 | `.today-greeting p` | color | `#7c8dac` (L557) | `#8a97aa` |
| 1658 | `.card` | background | `#fff` (L559) | `#202226` |
| 1658 | `.card` | border-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.07)` |
| 1659 | `.card-header` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.12)` |
| 1660 | `.card-title` | color | `#7c8dac` (L561) | `#505a6c` |
| 1661 | `.card-count` | color | `#a8b6cd` (L562) | `#505a6c` |
| 1662 | `.event-row` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.06)` |
| 1663 | `.ev-name` | color | `#1a1a1a` (L568) | `#e2e8f4` |
| 1664 | `.ev-sub` | color | `#7c8dac` (L569) | `#8a97aa` |
| 1665 | `.ev-badge.birthday` | background | `#fff7ed` (L571) | `rgba(234,122,30,0.16)` |
| 1665 | `.ev-badge.birthday` | color | `#ea7a1e` (L571) | `#fb923c` |
| 1666 | `.ev-badge.anniversary` | background | `#ede9fe` (L572) | `rgba(167,139,250,0.16)` |
| 1666 | `.ev-badge.anniversary` | color | `#7c3aed` (L572) | `#a78bfa` |
| 1667 | `.announce-row` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.06)` |
| 1668 | `.announce-dot` | background | `#005268` (L575) | `#0cb8d0` |
| 1669 | `.announce-title` | color | `#1a1a1a` (L576) | `#e2e8f4` |
| 1670 | `.announce-body` | color | `#7c8dac` (L577) | `#8a97aa` |
| 1671 | `.announce-date` | color | `#a8b6cd` (L578) | `#505a6c` |
| 1672 | `.stat-row` | border-bottom-color | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.06)` |
| 1673 | `.stat-label` | color | `#7c8dac` (L581) | `#8a97aa` |
| 1674 | `.stat-value` | color | `#1a1a1a` (L582) | `#e2e8f4` |
| 1675 | `.stat-value.teal` | color | `#005268` (L583) | `#0cb8d0` |
| 1677 | `.toast` | background | `#1a1a1a` (L826) | `#26292e` |
| 1677 | `.toast` | color | `#fff` (L826) | `#e2e8f4` |
| 1677 | `.toast` | border | *(no light rule for this exact selector — inherits/UA/other rule)* | `1px solid rgba(255,255,255,0.10)` |
| 1682 | `.tt-days-cell` | color | `#7c8dac` (L1679) | `#8a97aa` |
| 1682 | `.tt-sub-cell` | color | `#7c8dac` (L1680) | `#8a97aa` |
| 1683 | `.tt-approved-date` | color | `#a8b6cd` (L1681) | `#8a97aa` |
| 1687 | `.req-sub-cell` | color | `#7c8dac` (L1685) | `#8a97aa` |
| 1688 | `.req-date-cell` | color | `#a8b6cd` (L1686) | `#8a97aa` |
| 1690 | `.req-type-icon-lg` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.07)!important` |
| 1691 | `.req-type-icon-lg svg` | stroke | *(no light rule for this exact selector — inherits/UA/other rule)* | `currentColor!important` |
| 1692 | `.req-type-btn .req-type-icon-lg` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#8a97aa` |
| 1698 | `.req-icon-sm` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(255,255,255,0.07)!important` |
| 1698 | `.req-icon-sm` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#8a97aa!important` |
| 1699 | `.req-icon-sm[data-reqtype="timeoff"]` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(37,99,235,0.16)!important` |
| 1699 | `.req-icon-sm[data-reqtype="timeoff"]` | color | `#1d4ed8` (L1694) | `#60a5fa!important` |
| 1700 | `.req-icon-sm[data-reqtype="sick"]` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(220,38,38,0.16)!important` |
| 1700 | `.req-icon-sm[data-reqtype="sick"]` | color | `#da4d43` (L1695) | `#f87171!important` |
| 1701 | `.req-icon-sm[data-reqtype="location"]` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(124,58,237,0.16)!important` |
| 1701 | `.req-icon-sm[data-reqtype="location"]` | color | `#7c3aed` (L1696) | `#c4b5fd!important` |
| 1703 | `[style*="color:#7c8dac"]` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#8a97aa!important` |
| 1704 | `[style*="color:#a8b6cd"]` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#8a97aa!important` |
| 1705 | `[style*="color:#b0b8c8"]` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#8a97aa!important` |
| 1706 | `[style*="color:#c4cdd9"]` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#505a6c!important` |
| 1707 | `[style*="color:#c4cdd8"]` | color | *(no light rule for this exact selector — inherits/UA/other rule)* | `#505a6c!important` |
| 1709 | `[style*="background:#fef3ec"]` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(251,146,60,0.14)!important` |
| 1710 | `[style*="background:#eef2ff"]` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(99,102,241,0.14)!important` |
| 1711 | `[style*="background:#dbeafe"]` | background | *(no light rule for this exact selector — inherits/UA/other rule)* | `rgba(37,99,235,0.15)!important` |
| 1716 | `.wfh-stat-icon-wfh` | background | `#c1f0d5` (L1712) | `rgba(23,148,132,0.22)!important` |
| 1717 | `.wfh-stat-icon-wfh svg` | stroke | `#179484` (L1713) | `#2dd4bf!important` |
| 1718 | `.wfh-stat-icon-office` | background | `#dbeafe` (L1714) | `rgba(37,99,235,0.18)!important` |
| 1719 | `.wfh-stat-icon-office svg` | stroke | `#1d4ed8` (L1715) | `#60a5fa!important` |


## Appendix B - computed box metrics per class (light mode)
Viewport 2321px wide for fluid widths; DPR 1.5 (see caveat 1). Fixed sizes (W x H) are reliable; fluid widths depend on the viewport.
| class (computed, light, vp 2321px wide, DPR 1.5) | tag | box W x H | padding | margin | gap | radius | position/z | display |
|---|---|---|---|---|---|---|---|---|
| `.active-badge` | span | 56.72 x 24 | 3px 10px |  |  | 4px |  | block |
| `.active-row` | tr | 973.72 x 64.67 |  |  |  |  |  | table |
| `.ampm-select` | select | 63.33 x 40 | 0px 28px 0px 12px |  |  | 4px |  | block |
| `.app-drop-divider` | div | 224.67 x 1 |  | 4px 0px |  |  |  | block |
| `.app-drop-item` | div | 224.67 x 37.5 | 9px 14px |  | 10px |  |  | flex |
| `.app-drop-item-badge` | span | 52.03 x 19 | 2px 6px |  |  | 4px |  | block |
| `.app-drop-item-name` | span | 134.64 x 19.5 |  |  |  |  |  | block |
| `.app-drop-item.app-drop-item-current` | div | 224.67 x 37.5 | 9px 14px |  | 10px |  |  | flex |
| `.app-drop-item.app-drop-item-noaccess` | div | 224.67 x 37.5 | 9px 14px |  | 10px |  |  | flex |
| `.app-drop-section` | div | 224.67 x 27 | 8px 14px 4px |  |  |  |  | block |
| `.app-drop.open` | div | 226 x 563.83 | 6px 0px |  |  | 4px | fixed / z9000 | block |
| `.approval-note` | div | 697.33 x 43.33 | 12px 16px | 16px 0px 0px | 8px | 4px |  | flex |
| `.back-link` | div | 41.88 x 21 |  | 0px 0px 18px | 6px |  |  | inline-flex |
| `.bal-sidebar-amount` | div | 102.65 x 18 |  | 1px 0px 0px |  |  |  | block |
| `.bal-sidebar-date` | input | 185.92 x 32 |  |  |  |  |  | block |
| `.bal-sidebar-header` | div | 318.67 x 60.67 | 14px 18px |  | 10px |  |  | flex |
| `.bal-sidebar-icon` | div | 30 x 30 |  |  |  | 4px |  | flex |
| `.bal-sidebar-item` | div | 318.67 x 61.67 | 12px 18px |  | 12px |  |  | flex |
| `.bal-sidebar-name` | div | 102.65 x 18 |  |  |  |  |  | block |
| `.body-wrap` | div | 1400 x 1177 | 16px 24px | 0px 460.667px | 20px |  |  | flex |
| `.btn-add-member` | button | 98.88 x 30 | 0px 10px |  | 4px | 4px |  | flex |
| `.btn-cancel` | button | 88.05 x 38 | 0px 20px |  |  | 4px |  | block |
| `.btn-close-calc` | button | 91.89 x 40 | 0px 26px |  |  | 4px |  | block |
| `.btn-cta` | button | 159.31 x 38 | 0px 24px |  |  | 4px |  | block |
| `.btn-inline-add` | button | 62.84 x 40 | 0px 14px | 22px 0px 0px |  | 4px |  | block |
| `.btn-outline` | button | 74.9 x 36 | 0px 14px |  | 6px | 4px |  | flex |
| `.btn-primary` | button | 145.17 x 36 | 0px 14px |  | 6px | 4px |  | flex |
| `.btn-req-cancel` | button | 88.05 x 38 | 0px 20px |  |  | 4px |  | block |
| `.btn-req-send` | button | 142.53 x 40 | 0px 24px |  | 8px | 4px |  | flex |
| `.btn-row` | div | 145.17 x 36 |  |  | 8px |  |  | flex |
| `.btn-save` | button | 82.99 x 40 | 0px 24px |  |  | 4px |  | block |
| `.calc-accrual-btn` | button | 148.16 x 36 | 7px 14px | 14px 0px 0px | 7px | 4px |  | inline-flex |
| `.calc-fields` | div | 620 x 105.67 | 20px 24px |  | 14px |  |  | flex |
| `.calc-footer` | div | 620 x 68 | 14px 24px |  |  |  |  | flex |
| `.calc-modal-user` | div | 620 x 80.67 | 18px 24px |  | 14px |  |  | flex |
| `.calc-result-box` | div | 572 x 79.33 | 18px 20px |  |  | 4px |  | block |
| `.calc-result-number` | div | 530.67 x 42 |  |  |  |  |  | block |
| `.calc-result-wrap` | div | 620 x 162 | 16px 24px |  |  |  |  | block |
| `.calc-user-avatar` | div | 44 x 44 |  |  |  | 4px |  | flex |
| `.calc-user-name` | div | 136.45 x 24 |  |  |  |  |  | block |
| `.card` | div | 922.67 x 235.06 |  |  |  |  |  | block |
| `.card-body` | div | 922.67 x 195.4 | 10px 0px 20px |  |  |  |  | block |
| `.card-header` | div | 922.67 x 39 | 8px 0px 10px |  | 8px |  |  | flex |
| `.card-title` | div | 137.8 x 21 |  |  |  |  |  | block |
| `.cc-absent-lbl` | span | 32.29 x 14.25 |  | 1px 0px 0px |  |  |  | block |
| `.cc-date` | span | 12.57 x 15 |  |  |  |  |  | block |
| `.cc-hrs` | span | 25.67 x 15.59 |  |  |  |  |  | block |
| `.cc-time` | span | 55.22 x 12 |  |  |  |  |  | block |
| `.content` | main | 972 x 1145 |  |  |  |  |  | block |
| `.content-card-wrap` | div | 972 x 1145 |  |  |  | 4px |  | flex |
| `.content-inner` | div | 922.67 x 1000.06 |  |  |  |  |  | block |
| `.content-tabs` | div | 970.67 x 48.67 | 0px 24px |  | 0px |  |  | flex |
| `.cust-select` | div | 219.56 x 40 |  |  |  |  | relative | block |
| `.cust-select__option` | div | 152 x 41 | 10px 16px |  |  |  |  | block |
| `.cust-select__option.selected` | div | 152 x 41 | 10px 16px |  |  |  |  | block |
| `.cust-select__panel` | div | 152 x 299 | 6px 0px |  |  | 4px | absolute / z500 | block |
| `.cust-select__trigger` | div | 152 x 40 | 0px 12px |  | 8px | 4px |  | inline-flex |
| `.cust-select__trigger.has-value` | div | 219.55 x 40 | 0px 12px |  | 8px | 4px |  | inline-flex |
| `.cust-select__value` | span | 76.73 x 21 |  |  |  |  |  | block |
| `.cust-select__value.has-value` | span | 85.57 x 21 |  |  |  |  |  | block |
| `.cust-select.cs-dept` | div | 152 x 40 |  |  |  |  | relative | block |
| `.cust-select.cs-dept.open` | div | 152 x 40 |  |  |  |  | relative | block |
| `.cust-select.cs-group` | div | 136 x 40 |  |  |  |  | relative | block |
| `.cust-select.cs-office` | div | 124 x 40 |  |  |  |  | relative | block |
| `.cust-select.cs-status` | div | 114 x 40 |  |  |  |  | relative | block |
| `.cust-select.pool-cs-company` | div | 137 x 40 |  |  |  |  | relative | block |
| `.cust-select.pool-cs-desk` | div | 171 x 40 |  |  |  |  | relative | block |
| `.cust-select.pool-cs-group` | div | 136 x 40 |  |  |  |  | relative | block |
| `.cust-select.pool-cs-team` | div | 173 x 40 |  |  |  |  | relative | block |
| `.datepicker-cal.open` | div | 280 x 318.33 | 16px |  |  | 4px | absolute / z200 | block |
| `.datepicker-icon` | span | 16 x 16 |  |  |  |  | absolute | flex |
| `.datepicker-input` | input | 219.55 x 40 | 0px 36px 0px 12px |  |  | 4px |  | block |
| `.datepicker-input-wrap` | div | 219.55 x 40 |  |  |  |  | relative | flex |
| `.datepicker-input.req-date-native` | input | 249.94 x 40 | 0px 36px 0px 12px |  |  | 4px |  | block |
| `.datepicker-wrap` | div | 219.55 x 40 |  |  |  |  | relative | block |
| `.day-chip` | div | 68 x 49.5 | 7px 10px |  |  | 4px |  | block |
| `.day-chip.today` | div | 68 x 49.5 | 7px 10px |  |  | 4px |  | block |
| `.day-date` | div | 48 x 16.5 |  | 1px 0px 0px |  |  |  | block |
| `.day-date.today` | div | 48 x 16.5 |  | 1px 0px 0px |  |  |  | block |
| `.day-hours` | div | 108.91 x 21 |  |  |  |  |  | block |
| `.day-hours.zero` | div | 102.01 x 21 |  |  |  |  |  | block |
| `.day-name` | div | 48 x 18 |  |  |  |  |  | block |
| `.day-name.today` | div | 48 x 18 |  |  |  |  |  | block |
| `.day-range` | div | 108.91 x 18 |  |  |  |  |  | block |
| `.day-row` | div | 656 x 70.17 | 10px 0px |  | 14px |  |  | flex |
| `.dept-badge` | span | 64.83 x 24 | 3px 10px |  |  | 4px |  | inline-block |
| `.detail-header` | div | 866.95 x 123.26 | 24px |  | 14px |  | relative | flex |
| `.detail-stat` | div | 216.9 x 71 | 14px 20px |  |  |  |  | block |
| `.detail-stat-bar` | div | 866.95 x 71.67 |  |  |  |  |  | flex |
| `.detail-stat-label` | div | 176.23 x 15 |  | 4px 0px 0px |  |  |  | block |
| `.detail-stat-value` | div | 176.23 x 24 |  |  |  |  |  | block |
| `.detail-tab` | button | 64.41 x 44 | 12px 16px | 0px 0px -1px |  |  |  | block |
| `.detail-tab.active` | button | 95.05 x 44 | 12px 16px | 0px 0px -1px |  |  |  | block |
| `.detail-tabs` | div | 866.95 x 43.67 | 0px 0px 0px 4px |  |  |  |  | flex |
| `.dir-alpha-group` | div | 1287.33 x 105.17 |  |  |  |  |  | block |
| `.dir-alpha-header` | div | 1287.33 x 37.17 | 12px 0px 8px |  |  |  |  | block |
| `.dir-avatar` | div | 44 x 44 |  |  |  | 50% |  | flex |
| `.dir-contact` | div | 455.67 x 40 |  |  | 4px |  |  | flex |
| `.dir-contact-row` | div | 455.67 x 18 |  |  | 6px |  |  | flex |
| `.dir-count` | div | 59.72 x 19.5 |  | 0px 0px 0px 395.854px |  |  |  | block |
| `.dir-ctrl-label` | span | 49.55 x 18 |  |  |  |  |  | block |
| `.dir-info` | div | 455.67 x 41 |  |  |  |  |  | block |
| `.dir-list` | div | 1287.33 x 2817.83 |  |  |  |  |  | flex |
| `.dir-manager-link` | span | 85.35 x 15.33 |  |  |  |  |  | inline |
| `.dir-name` | div | 455.67 x 21 |  |  | 6px |  |  | flex |
| `.dir-name-link` | span | 107.65 x 21 |  |  |  |  |  | block |
| `.dir-reports` | div | 260 x 18 |  |  | 6px |  |  | flex |
| `.dir-row` | div | 1319.33 x 68 | 12px 16px | 0px -16px | 16px | 4px |  | grid |
| `.dir-search` | input | 420 x 38 | 0px 12px 0px 38px |  |  | 4px |  | inline-block |
| `.dir-search-wrap` | div | 420 x 38 |  |  |  |  | relative | block |
| `.dir-select` | select | 112.67 x 38 | 0px 28px 0px 12px |  |  | 4px |  | block |
| `.dir-sub` | div | 455.67 x 18 |  | 2px 0px 0px |  |  |  | block |
| `.dir-toolbar` | div | 1287.33 x 38 |  | 0px 0px 14px | 16px |  |  | flex |
| `.dir-you` | span | 29.76 x 19 | 2px 6px |  |  | 4px |  | block |
| `.dm-switch` | div | 32 x 18 |  |  |  | 8px | relative | block |
| `.dm-thumb` | div | 14 x 14 |  |  |  | 50% | absolute | block |
| `.dp-day` | div | 33.52 x 34 |  |  |  | 4px |  | flex |
| `.dp-day.other-month` | div | 33.52 x 34 |  |  |  | 4px |  | flex |
| `.dp-day.selected` | div | 33.52 x 34 |  |  |  | 4px |  | flex |
| `.dp-days` | div | 246.67 x 214 |  |  | 2px |  |  | grid |
| `.dp-header` | div | 246.67 x 28 |  | 0px 0px 14px |  |  |  | flex |
| `.dp-month-label` | span | 63.32 x 21 |  |  |  |  |  | block |
| `.dp-nav` | button | 28 x 28 |  |  |  | 4px |  | flex |
| `.dp-wd` | div | 35.23 x 23 | 4px 0px |  |  |  |  | block |
| `.dp-weekdays` | div | 246.67 x 23 |  | 0px 0px 6px |  |  |  | grid |
| `.drawer-avatar` | div | 48 x 48 |  |  |  | 50% |  | flex |
| `.drawer-avatar.inactive` | div | 48 x 48 |  |  |  | 50% |  | flex |
| `.drawer-dept-badge` | span | 95.94 x 24 | 3px 10px |  |  | 4px |  | block |
| `.drawer-dot` | span | 2.42 x 18 |  |  |  |  |  | block |
| `.drawer-email` | span | 114.36 x 18 |  |  |  |  |  | block |
| `.drawer-header-info` | div | 756.95 x 74.59 |  |  |  |  |  | block |
| `.drawer-meta-link` | span | 52.59 x 18 |  |  |  |  |  | block |
| `.drawer-meta-row` | div | 756.95 x 24 |  |  | 8px |  |  | flex |
| `.drawer-name` | span | 82.43 x 21.59 |  |  |  |  |  | block |
| `.drawer-name-row` | div | 756.95 x 21.59 |  | 0px 0px 2px | 8px |  |  | flex |
| `.drawer-role` | div | 756.95 x 21 |  | 0px 0px 6px |  |  |  | block |
| `.emp-avatar` | div | 36 x 36 |  |  |  | 50% |  | flex |
| `.emp-avatar.inactive` | div | 36 x 36 |  |  |  | 50% |  | flex |
| `.emp-cell` | div | 261.72 x 40 |  |  | 10px |  |  | flex |
| `.emp-email` | div | 120.09 x 18 |  | 1px 0px 0px |  |  |  | block |
| `.emp-email.inactive` | div | 114.36 x 18 |  | 1px 0px 0px |  |  |  | block |
| `.emp-list-scroll` | div | 1017.05 x 1031.33 | 16px |  |  |  |  | flex |
| `.emp-name` | div | 120.09 x 21 |  |  |  |  |  | block |
| `.emp-name.inactive` | div | 114.36 x 21 |  |  |  |  |  | block |
| `.emp-qcard` | div | 520 x 338 | 28px |  |  | 4px | relative | block |
| `.emp-qcard-avatar` | div | 64 x 64 |  |  |  | 50% |  | flex |
| `.emp-qcard-backdrop` | div | 2306 x 1253.33 |  |  |  |  | fixed / z300 | flex |
| `.emp-qcard-close` | div | 32 x 32 |  |  |  | 50% | absolute | flex |
| `.emp-qcard-email-actions` | div | 72 x 32 |  |  | 8px |  |  | flex |
| `.emp-qcard-email-main` | div | 378.67 x 21 |  |  | 12px |  |  | flex |
| `.emp-qcard-email-row` | div | 462.67 x 54.67 | 11px 0px |  | 12px |  |  | flex |
| `.emp-qcard-email-text` | span | 350.67 x 21 |  |  |  |  |  | block |
| `.emp-qcard-head` | div | 462.67 x 64 | 0px 40px 0px 0px | 0px 0px 20px | 16px |  |  | flex |
| `.emp-qcard-name` | div | 277.85 x 21.59 |  | 0px 0px 4px |  |  |  | block |
| `.emp-qcard-row` | div | 462.67 x 43.67 | 11px 0px |  | 12px |  |  | flex |
| `.emp-qcard-rows` | div | 462.67 x 196.67 |  | 2px 0px 0px |  |  |  | block |
| `.emp-qcard-sub` | div | 277.85 x 18.2 |  |  |  |  |  | block |
| `.emp-table` | table | 983.72 x 998 |  |  |  |  |  | flex |
| `.emp-table-wrap` | div | 985.05 x 999.33 |  |  |  | 4px |  | flex |
| `.entry-row` | div | 512 x 64 |  |  | 10px |  |  | flex |
| `.eqa-btn` | button | 32 x 32 |  |  |  | 4px |  | flex |
| `.fc` | div | 253.65 x 43 |  |  |  |  |  | block |
| `.fc-label` | div | 808.95 x 18 |  | 0px 0px 4px |  |  |  | block |
| `.fc-link` | span | 66.82 x 18 |  |  |  |  |  | inline |
| `.fc-value` | div | 808.95 x 21 |  |  |  |  |  | block |
| `.fc-value.mono` | div | 253.65 x 21 |  |  |  |  |  | block |
| `.fc-value.small` | div | 256.99 x 18 |  |  |  |  |  | block |
| `.fc.fc-full` | div | 808.95 x 43 |  |  |  |  |  | block |
| `.field` | div | 453.33 x 61 |  |  |  |  |  | block |
| `.field-group` | div | 922.67 x 61 |  | 0px 0px 20px |  |  |  | block |
| `.field-label` | div | 453.33 x 15 |  | 0px 0px 6px |  |  |  | block |
| `.field-note` | div | 453.33 x 17.4 |  | 6px 0px 0px |  |  |  | block |
| `.field-value` | input | 453.33 x 40 | 0px 12px |  |  | 4px |  | flex |
| `.field-value.readonly-field` | input | 453.33 x 40 | 0px 12px |  |  | 4px |  | flex |
| `.fields-grid` | div | 856.95 x 205 | 12px 24px 24px |  | 20px 24px |  |  | grid |
| `.fields.fields-2` | div | 922.67 x 61 |  |  | 16px |  |  | grid |
| `.fields.fields-3` | div | 922.67 x 61 |  |  | 16px |  |  | grid |
| `.fields.fields-4` | div | 922.67 x 61 |  |  | 16px |  |  | grid |
| `.fill-modal-field` | div | 198 x 66 |  |  |  |  |  | block |
| `.fill-modal-footer` | div | 412 x 58.67 | 20px 0px 0px |  | 10px |  |  | flex |
| `.fill-modal-input` | input | 198 x 40 | 0px 12px |  |  | 4px |  | inline-block |
| `.fill-modal-label` | div | 198 x 18 |  | 0px 0px 8px |  |  |  | block |
| `.fill-modal-note` | p | 412 x 36 |  | 0px 0px 20px |  |  |  | block |
| `.fill-modal-row` | div | 412 x 66 |  | 0px 0px 20px | 16px |  |  | flex |
| `.groupby-wrap` | div | 136 x 40 |  |  | 8px |  |  | flex |
| `.holder-avatar` | div | 38 x 38 |  |  |  | 50% |  | flex |
| `.holder-id` | div | 102.91 x 18 |  | 1px 0px 0px |  |  |  | block |
| `.holder-name` | div | 102.91 x 21 |  |  |  |  |  | block |
| `.holder-row` | div | 809.33 x 64.67 | 12px 20px |  | 14px |  |  | flex |
| `.inactive-badge` | span | 65.96 x 24 | 3px 10px |  |  | 4px |  | block |
| `.inline-add-row` | div | 630.67 x 64 |  | 0px 0px 10px | 8px |  |  | flex |
| `.inline-list` | div | 630.67 x 32 |  |  | 6px |  |  | flex |
| `.inline-list-empty` | div | 630.67 x 31.5 | 6px 0px |  |  |  |  | block |
| `.is-new` | tr | 1866.67 x 60.67 |  |  |  |  |  | table-row |
| `.left-col` | div | 360 x 932.52 |  |  | 12px |  | sticky | flex |
| `.left-header` | div | 1017.05 x 122.67 | 20px 20px 12px |  |  |  |  | block |
| `.left-title` | div | 119.43 x 24 |  |  |  |  |  | block |
| `.left-title-row` | div | 977.05 x 36 |  | 0px 0px 14px |  |  |  | flex |
| `.manager-avatar` | div | 32 x 32 |  |  |  | 50% |  | flex |
| `.manager-name` | div | 97.72 x 21 |  |  |  |  |  | block |
| `.manager-role` | div | 97.72 x 18 |  |  |  |  |  | block |
| `.member-card` | div | 809.33 x 298.67 | 20px 24px |  |  |  |  | block |
| `.member-card-header` | div | 761.33 x 24 |  | 0px 0px 14px |  |  |  | flex |
| `.member-fields` | div | 761.33 x 220 |  |  | 16px 24px |  |  | grid |
| `.member-name` | div | 118.79 x 24 |  |  |  |  |  | block |
| `.mf-label` | div | 237.77 x 18 |  | 0px 0px 4px |  |  |  | block |
| `.mf-value` | div | 237.77 x 21 |  |  |  |  |  | block |
| `.mf-value.mono` | div | 237.77 x 21 |  |  |  |  |  | block |
| `.mini-bar-label` | div | 6.41 x 15 |  |  |  |  |  | block |
| `.mini-bar-wrap` | div | 18.09 x 51 |  |  | 4px |  |  | flex |
| `.mini-bar.empty` | div | 18.09 x 12 |  |  |  | 2px 3px 0px 0px |  | block |
| `.mini-bar.filled` | div | 18.09 x 32 |  |  |  | 2px 3px 0px 0px |  | block |
| `.mini-chart` | div | 156.67 x 40 |  | 14px 0px 0px | 5px |  |  | flex |
| `.modal` | div | 740 x 520 |  |  |  | 4px |  | flex |
| `.modal-actions` | div | 181.04 x 40 |  |  | 10px |  |  | flex |
| `.modal-add-entry` | div | 83.63 x 21 |  | 14px 0px 0px | 6px |  |  | inline-flex |
| `.modal-backdrop.open` | div | 2306 x 1253.33 |  |  |  |  | fixed / z800 | flex |
| `.modal-body` | div | 738.67 x 377.33 | 24px |  |  |  |  | block |
| `.modal-close` | button | 32 x 32 |  |  |  | 4px |  | flex |
| `.modal-day` | div | 560 x 78.67 | 18px 24px |  | 14px |  |  | flex |
| `.modal-day-icon` | div | 42 x 42 |  |  |  | 4px |  | flex |
| `.modal-day-label` | div | 69.86 x 27 |  |  |  |  |  | block |
| `.modal-day-total` | div | 120.38 x 21 |  |  |  |  |  | block |
| `.modal-divider` | div | 690.67 x 1 |  | 4px 0px 24px |  |  |  | block |
| `.modal-entries` | div | 560 x 104 | 20px 24px |  |  |  |  | block |
| `.modal-field` | div | 339.33 x 64 |  |  | 6px |  |  | flex |
| `.modal-field.full` | div | 690.67 x 64 |  |  | 6px |  |  | flex |
| `.modal-footer` | div | 738.67 x 68.67 | 16px 24px |  | 8px |  |  | flex |
| `.modal-grid` | div | 690.67 x 142 |  |  | 14px 16px |  |  | grid |
| `.modal-header` | div | 738.67 x 72.67 | 20px 24px |  |  |  |  | flex |
| `.modal-input` | input | 339.33 x 40 | 0px 12px |  |  | 4px |  | block |
| `.modal-label` | label | 339.33 x 18 |  |  |  |  |  | block |
| `.modal-overlay.open` | div | 2321.33 x 1253.33 |  |  |  |  | fixed / z900 | flex |
| `.modal-row` | div | 690.67 x 64 |  |  | 12px |  |  | grid |
| `.modal-section` | div | 690.67 x 174 |  | 0px 0px 24px |  |  |  | block |
| `.modal-section-title` | div | 690.67 x 18 |  | 0px 0px 14px |  |  |  | block |
| `.modal-select` | select | 690.67 x 40 | 0px 32px 0px 12px |  |  | 4px |  | block |
| `.modal-textarea` | textarea | 690.67 x 37.33 |  |  |  |  |  | block |
| `.modal-title` | span | 103.71 x 24 |  |  |  |  |  | block |
| `.na-row` | tr | 973.72 x 64.67 |  |  |  |  |  | table |
| `.na-row.active-row` | tr | 973.72 x 64.67 |  |  |  |  |  | table |
| `.nav-avatar` | div | 42 x 42 |  |  |  | 50% |  | flex |
| `.nav-left` | div | 638.47 x 34 |  |  | 80px |  |  | flex |
| `.nav-link` | a | 28.28 x 21 |  |  |  |  |  | block |
| `.nav-link.active` | a | 65.59 x 21 |  |  |  |  |  | block |
| `.nav-links` | div | 338.72 x 21 |  |  | 32px |  |  | flex |
| `.nav-logo-text` | div | 131.75 x 34 |  |  | 2px |  |  | flex |
| `.nav-logo-wrap` | div | 219.75 x 34 |  |  | 16px |  |  | flex |
| `.nav-right` | div | 42 x 42 |  |  | 10px |  |  | flex |
| `.nav-sub` | span | 131.75 x 14 |  |  |  |  |  | block |
| `.nav-wordmark` | span | 131.75 x 18 |  |  |  |  |  | block |
| `.opt-code` | span | 40 x 19.5 |  |  |  |  |  | block |
| `.opt-flag` | span | 22 x 18 |  |  |  |  |  | flex |
| `.opt-name` | span | 74.24 x 18 |  |  |  |  |  | block |
| `.page` | div | 2306 x 1253.33 | 74px 210px 0px |  |  |  |  | flex |
| `.page-center` | div | 1886 x 1155.33 |  | 12px 0px |  | 4px |  | flex |
| `.period-divider` | div | 656 x 18 |  | 8px 0px | 10px |  |  | flex |
| `.period-heading` | div | 656 x 30 |  | 0px 0px 16px | 10px |  |  | flex |
| `.period-icon` | div | 30 x 30 |  |  |  | 4px |  | flex |
| `.period-label` | div | 127.47 x 24 |  |  |  |  |  | block |
| `.phone-code-btn` | div | 65.65 x 38 | 0px 8px 0px 10px |  | 4px | 4px 0px 0px 4px |  | flex |
| `.phone-code-drop` | div | 200 x 240 |  |  |  | 4px | absolute / z300 | block |
| `.phone-code-opt` | div | 188.67 x 52 | 8px 14px |  | 10px |  |  | flex |
| `.phone-code-opt.selected` | div | 188.67 x 35.5 | 8px 14px |  | 10px | 4px 4px 0px 0px |  | flex |
| `.phone-code-val` | span | 13.55 x 14 |  |  |  |  |  | block |
| `.phone-code-wrap` | div | 65.65 x 38.67 |  |  |  |  | relative | block |
| `.phone-code-wrap.open` | div | 65.65 x 38.67 |  |  |  |  | relative | block |
| `.phone-flag` | span | 13.43 x 14 |  |  |  |  |  | block |
| `.phone-input-wrap` | div | 453.33 x 40 |  |  |  | 4px | relative | flex |
| `.phone-number-input` | input | 386.35 x 38 | 0px 12px |  |  | 0px 4px 4px 0px |  | block |
| `.pool-badge.holders` | div | 64.98 x 33 | 6px 14px |  | 8px | 4px |  | flex |
| `.pool-badge.holders.grey` | div | 65.43 x 33 | 6px 14px |  | 8px | 4px |  | flex |
| `.pool-badge.members` | div | 72.95 x 33 | 6px 14px |  | 8px | 4px |  | flex |
| `.pool-badge.members.grey` | div | 67.43 x 33 | 6px 14px |  | 8px | 4px |  | flex |
| `.pool-badges` | div | 143.93 x 33 |  |  | 6px |  | absolute | flex |
| `.pool-empty-state` | div | 826 x 1106 |  |  | 12px |  |  | flex |
| `.pool-meta` | div | 972.67 x 40 | 0px 120px 0px 0px |  | 0px |  |  | flex |
| `.pool-meta-item` | div | 284.22 x 40 |  |  |  |  |  | block |
| `.pool-meta-label` | div | 284.22 x 18 |  | 0px 0px 1px |  |  |  | block |
| `.pool-meta-value` | div | 284.22 x 21 |  |  |  |  |  | block |
| `.pool-name` | div | 972.67 x 21 |  | 0px 0px 6px |  |  |  | block |
| `.pool-right-section` | div | 810.67 x 378.67 |  | 0px 0px 16px |  | 4px |  | block |
| `.pool-right-section-header` | div | 809.33 x 54.67 | 12px 16px 12px 20px |  |  |  |  | flex |
| `.pool-row` | div | 1015.33 x 95.67 | 14px 20px |  |  |  | relative | block |
| `.pool-row.active` | div | 1015.33 x 95.67 | 14px 20px |  |  |  | relative | block |
| `.pools-list` | div | 1025.33 x 1031.33 |  |  |  |  |  | block |
| `.profile-drop-email` | div | 186.67 x 16.5 |  | 2px 0px 0px |  |  |  | block |
| `.profile-drop-header` | div | 218.67 x 60.67 | 12px 16px 10px |  |  |  |  | block |
| `.profile-drop-item` | div | 218.67 x 37.5 | 9px 16px |  | 10px |  |  | flex |
| `.profile-drop-item-icon` | span | 14 x 14 |  |  |  |  |  | flex |
| `.profile-drop-item-label` | span | 120.67 x 19.5 |  |  |  |  |  | block |
| `.profile-drop-name` | div | 186.67 x 19.5 |  |  |  |  |  | block |
| `.profile-drop.open` | div | 220 x 111.5 | 6px 0px |  |  | 4px | fixed / z9000 | block |
| `.profile-tab` | div | 134.01 x 49 | 13px 18px | 0px 0px -1px |  |  |  | block |
| `.profile-tab.active` | div | 115.34 x 49 | 13px 18px | 0px 0px -1px |  |  |  | block |
| `.record-badge` | span | 72.69 x 24 | 3px 8px |  |  | 4px |  | block |
| `.records-table` | table | 866.95 x 129.33 |  |  |  |  |  | table |
| `.records-table-wrap` | div | 866.95 x 130 |  |  |  |  |  | block |
| `.reminder-detail` | div | 197.72 x 18 |  | 2px 0px 0px |  |  |  | block |
| `.reminder-icon` | div | 38 x 38 |  |  |  | 4px |  | flex |
| `.reminder-info` | div | 197.72 x 41 |  |  |  |  |  | block |
| `.reminder-name` | div | 197.72 x 21 |  |  |  |  |  | block |
| `.reminder-row` | div | 322.67 x 67.67 | 13px 0px |  | 12px |  |  | flex |
| `.reminder-when` | div | 62.95 x 19.5 |  |  |  |  |  | block |
| `.reminders-card` | div | 360 x 253.67 | 18px 18px 12px |  |  | 4px |  | block |
| `.reminders-card-title` | div | 322.67 x 15 |  | 0px 0px 12px |  |  |  | block |
| `.req-amount-input` | input | 90 x 40 | 0px 12px |  |  | 4px |  | block |
| `.req-amount-row` | div | 529.33 x 40 |  |  | 10px |  |  | flex |
| `.req-amount-unit` | span | 30.01 x 21 |  |  |  |  |  | block |
| `.req-date-from-to` | div | 529.33 x 65 |  |  | 10px |  |  | flex |
| `.req-date-group` | div | 249.94 x 65 |  |  |  |  |  | block |
| `.req-date-input` | input | 279 x 40 | 0px 12px |  |  | 4px |  | inline-block |
| `.req-date-sep.req-date-sep-mid` | span | 9.46 x 24 |  | 0px 0px 11px |  |  |  | block |
| `.req-field` | div | 529.33 x 65 |  | 0px 0px 20px |  |  |  | block |
| `.req-label` | div | 249.94 x 18 |  | 0px 0px 7px | 2px |  |  | flex |
| `.req-star` | span | 5.09 x 18 |  |  |  |  |  | block |
| `.req-success-backdrop.open` | div | 2306 x 1253.33 |  |  |  |  | fixed / z900 | flex |
| `.req-success-card` | div | 360 x 240 | 40px 36px 32px |  | 16px | 4px |  | flex |
| `.req-success-icon` | div | 64 x 64 |  |  |  | 50% |  | flex |
| `.req-success-sub` | p | 288 x 42 |  |  |  |  |  | block |
| `.req-success-title` | p | 192.25 x 30 |  |  |  |  |  | block |
| `.req-textarea-to` | textarea | 529.33 x 90 | 10px 12px |  |  | 4px |  | inline-block |
| `.req-type-btn` | div | 340.33 x 120 | 16px 12px |  | 6px | 4px |  | flex |
| `.req-type-btn.selected` | div | 340.33 x 120 | 16px 12px |  | 6px | 4px |  | flex |
| `.req-type-desc` | div | 116.01 x 16.5 |  |  |  |  |  | block |
| `.req-type-grid` | div | 690.67 x 120 |  | 0px 0px 20px | 10px |  |  | grid |
| `.req-type-icon-lg` | div | 36 x 36 |  |  |  | 4px |  | flex |
| `.req-type-label` | div | 52.7 x 19.5 |  |  |  |  |  | block |
| `.request-balance-sidebar` | div | 320 x 554.67 |  |  |  | 4px |  | block |
| `.request-footer` | div | 529.33 x 60.67 | 20px 0px 0px | 24px 0px 0px | 14px |  |  | flex |
| `.request-form-wrap` | div | 578.67 x 554.67 | 24px |  |  | 4px |  | block |
| `.request-layout` | div | 922.67 x 554.67 |  |  | 24px |  |  | flex |
| `.request-page-title` | div | 922.67 x 39 |  | 0px 0px 24px |  |  |  | block |
| `.rv-actions` | div | 142.4 x 30 |  |  | 8px |  |  | flex |
| `.rv-avatar` | div | 36 x 36 |  |  |  | 50% |  | flex |
| `.rv-btn-approve` | button | 77.38 x 30 | 0px 12px |  |  | 4px |  | block |
| `.rv-btn-deny` | button | 57.02 x 30 | 0px 12px |  |  | 4px |  | block |
| `.rv-detail-str` | div | 300 x 19.5 |  |  |  |  |  | block |
| `.rv-dur-str` | td | 115.79 x 60.67 | 12px 16px |  |  |  |  | table-cell |
| `.rv-emp` | div | 274.05 x 36 |  |  | 10px |  |  | flex |
| `.rv-emp-name` | span | 89.08 x 21 |  |  |  |  |  | block |
| `.rv-header` | div | 1900 x 122.67 | 20px 20px 0px |  |  |  |  | block |
| `.rv-list` | div | 1900 x 1031.33 | 16px |  |  |  |  | block |
| `.rv-status.approved` | span | 75.36 x 26 | 4px 10px |  | 4px | 4px |  | inline-flex |
| `.rv-status.denied` | span | 60.26 x 26 | 4px 10px |  | 4px | 4px |  | inline-flex |
| `.rv-status.new` | span | 55.77 x 26 | 4px 10px |  | 4px | 4px |  | inline-flex |
| `.rv-status.pending` | span | 66.73 x 26 | 4px 10px |  | 4px | 4px |  | inline-flex |
| `.rv-submitted-str` | td | 201.89 x 60.67 | 12px 16px |  |  |  |  | table-cell |
| `.rv-table` | table | 1866.67 x 952 |  |  |  |  |  | table |
| `.rv-title` | div | 108.78 x 24 |  |  |  |  |  | block |
| `.rv-title-row` | div | 1860 x 36 |  | 0px 0px 14px |  |  |  | flex |
| `.rv-toolbar` | div | 1860 x 52 | 0px 0px 12px |  | 12px |  |  | flex |
| `.rv-type` | div | 248.06 x 30 |  |  | 8px |  |  | flex |
| `.rv-type-icon` | div | 30 x 30 |  |  |  | 4px |  | flex |
| `.rv-type-label` | span | 81.33 x 19.5 |  |  |  |  |  | block |
| `.search-icon` | span | 16 x 16 |  |  |  |  | absolute | flex |
| `.search-input` | input | 205.52 x 40 | 0px 12px 0px 36px |  |  | 4px |  | inline-block |
| `.search-wrap` | div | 205.52 x 40 |  |  |  |  | relative | block |
| `.section-band` | div | 856.95 x 54.33 | 16px 20px |  |  |  |  | block |
| `.section-band.first` | div | 856.95 x 53.67 | 16px 20px |  |  |  |  | block |
| `.sidebar` | aside | 360 x 433.19 | 18px 16px |  |  | 4px |  | block |
| `.sidebar-divider` | div | 326.67 x 1 |  | 10px 0px |  |  |  | block |
| `.sidebar-icon` | div | 16 x 14 |  | 3px 0px 0px |  |  |  | flex |
| `.sidebar-label` | div | 326.67 x 15 |  | 0px 0px 8px |  |  |  | block |
| `.sidebar-manager` | div | 326.67 x 39 |  |  | 10px |  |  | flex |
| `.sidebar-profile` | div | 326.67 x 80 | 14px 16px | 0px 0px 14px | 14px | 4px |  | flex |
| `.sidebar-row` | div | 326.67 x 20.29 |  | 0px 0px 8px | 8px |  |  | flex |
| `.sidebar-section` | div | 326.67 x 128.17 |  | 0px 0px 14px |  |  |  | block |
| `.sidebar-text` | div | 112.25 x 20.29 |  |  |  |  |  | block |
| `.sort-icon` | span | 12 x 12 |  | 0px 0px 0px 4px |  |  |  | inline-flex |
| `.sorted` | th | 303.72 x 42.33 | 12px 16px |  |  |  |  | table-cell |
| `.sp-avatar` | div | 52 x 52 |  |  |  | 50% |  | flex |
| `.sp-info` | div | 158.66 x 39.2 |  |  |  |  |  | flex |
| `.sp-name` | div | 158.66 x 19.2 |  |  |  |  |  | block |
| `.sp-role` | div | 158.66 x 18 |  | 2px 0px 0px |  |  |  | block |
| `.split-left` | div | 1017.72 x 1154 |  |  |  |  |  | flex |
| `.split-right` | div | 866.95 x 1154 |  |  |  |  |  | flex |
| `.status-pill.status-active` | span | 56.72 x 24 | 3px 10px |  |  | 4px |  | inline-flex |
| `.status-pill.status-inactive` | span | 65.96 x 24 | 3px 10px |  |  | 4px |  | inline-flex |
| `.tab-body` | div | 866.95 x 915.41 |  |  |  |  |  | block |
| `.tab-panel.active` | div | 856.95 x 1449.33 |  |  |  |  |  | block |
| `.time-group` | div | 149.33 x 64 |  |  | 6px |  |  | flex |
| `.time-input` | input | 80 x 40 | 0px 12px |  |  | 4px |  | block |
| `.time-inputs` | div | 149.33 x 40 |  |  | 6px |  |  | flex |
| `.time-label` | div | 149.33 x 18 |  |  |  |  |  | block |
| `.timeoff-request-view` | div | 922.67 x 656.67 |  |  |  |  |  | block |
| `.timesheet-layout` | div | 907.33 x 2701.67 |  |  | 20px |  |  | flex |
| `.timesheet-main` | div | 697.33 x 2701.67 |  |  |  |  |  | block |
| `.timesheet-ph` | div | 866.95 x 200 | 40px |  | 10px |  |  | flex |
| `.timesheet-sidebar` | div | 190 x 339.26 |  |  |  |  |  | block |
| `.toast.show` | div | 127.47 x 45 | 12px 20px |  |  | 4px | fixed / z9999 | block |
| `.toolbar` | div | 977.05 x 40 |  |  | 8px |  |  | flex |
| `.top-nav` | nav | 2306 x 74 | 0px 40px |  |  |  | fixed / z100 | flex |
| `.ts-btn` | button | 88.05 x 38 | 0px 20px |  | 6px | 4px |  | flex |
| `.ts-btn-primary` | button | 190 x 38 | 0px 20px | 4px 0px 0px | 6px | 4px |  | flex |
| `.ts-controls` | div | 907.33 x 40 |  | 0px 0px 20px | 10px |  |  | flex |
| `.ts-stat-card` | div | 190 x 156.93 | 16px | 0px 0px 12px |  | 4px |  | block |
| `.ts-stat-label` | div | 156.67 x 15 |  | 0px 0px 4px |  |  |  | block |
| `.ts-stat-sub` | div | 156.67 x 18 |  | 4px 0px 0px |  |  |  | block |
| `.ts-stat-value` | div | 156.67 x 28.59 |  |  |  |  |  | block |
| `.tt-avatar` | div | 34 x 34 |  |  |  | 50% |  | flex |
| `.tt-badge-approved` | span | 75.36 x 24 | 3px 10px |  |  | 4px |  | inline-flex |
| `.tt-badge-pending` | span | 120.91 x 24 | 3px 10px |  |  | 4px |  | inline-flex |
| `.tt-body` | div | 1900 x 1031.33 |  |  |  |  |  | flex |
| `.tt-btn-approve` | button | 112.04 x 38 | 0px 28px |  |  | 4px |  | block |
| `.tt-btn-fill-all` | button | 152.07 x 38 | 0px 20px |  |  | 4px |  | block |
| `.tt-cal` | div | 788 x 423 |  |  |  | 4px |  | block |
| `.tt-cal-body` | div | 786.67 x 390 |  |  |  |  |  | grid |
| `.tt-cal-cell.cc-low` | div | 112.38 x 78 | 6px 2px |  | 2px |  |  | flex |
| `.tt-cal-cell.cc-missing` | div | 112.38 x 78 | 6px 2px |  | 2px |  |  | flex |
| `.tt-cal-cell.cc-normal` | div | 112.39 x 78 | 6px 2px |  | 2px |  |  | flex |
| `.tt-cal-cell.cc-off` | div | 112.38 x 78 | 6px 2px |  | 2px |  |  | flex |
| `.tt-cal-cell.cc-out` | div | 112.38 x 78 | 6px 2px |  | 2px |  |  | flex |
| `.tt-cal-cell.cc-wknd` | div | 112.39 x 78 | 6px 2px |  | 2px |  |  | flex |
| `.tt-cal-head` | div | 786.67 x 31.67 |  |  |  |  |  | grid |
| `.tt-cal-title` | div | 788 x 16.5 |  | 0px 0px 10px |  |  |  | block |
| `.tt-confirm-actions` | div | 290.67 x 38 |  |  | 8px |  |  | flex |
| `.tt-confirm-body` | div | 290.67 x 39 |  | 0px 0px 20px |  |  |  | block |
| `.tt-confirm-box` | div | 340 x 170.83 | 24px 24px 20px |  |  | 4px |  | block |
| `.tt-confirm-cancel` | button | 88.05 x 38 | 0px 20px |  |  | 4px |  | block |
| `.tt-confirm-ok` | button | 104.04 x 38 | 0px 24px |  |  | 4px |  | block |
| `.tt-confirm-overlay.open` | div | 2306 x 1253.33 |  |  |  |  | fixed / z1000 | flex |
| `.tt-confirm-title` | div | 290.67 x 22.5 |  | 0px 0px 6px |  |  |  | block |
| `.tt-data-row` | tr | 1020 x 57.67 |  |  |  |  |  | table-row |
| `.tt-data-row.tt-selected` | tr | 1020 x 57.67 |  |  |  |  |  | table-row |
| `.tt-days-cell` | td | 96.9 x 57.67 | 10px 16px |  |  |  |  | table-cell |
| `.tt-det-avatar` | div | 44 x 44 |  |  |  | 50% |  | flex |
| `.tt-det-head` | div | 788 x 45.5 |  | 0px 0px 20px | 14px |  |  | flex |
| `.tt-det-meta` | div | 89.93 x 19.5 |  | 2px 0px 0px |  |  |  | block |
| `.tt-det-name` | div | 89.93 x 24 |  |  |  |  |  | block |
| `.tt-detail-footer` | div | 836 x 70.67 | 16px 24px |  | 12px |  |  | flex |
| `.tt-detail-inner.visible` | div | 836 x 1031.33 |  |  |  |  |  | flex |
| `.tt-detail-panel` | div | 836 x 1031.33 |  |  |  |  |  | flex |
| `.tt-detail-scroll` | div | 836 x 960.67 | 24px |  |  |  |  | block |
| `.tt-emp-cell` | div | 210.6 x 37 |  |  | 10px |  |  | flex |
| `.tt-emp-dept` | div | 71.78 x 16.5 |  | 1px 0px 0px |  |  |  | block |
| `.tt-emp-name` | div | 71.78 x 19.5 |  |  |  |  |  | block |
| `.tt-fillall-body` | div | 418.67 x 100.5 | 14px 24px 0px |  |  |  |  | block |
| `.tt-fillall-box` | div | 420 x 254.5 |  |  |  | 4px |  | block |
| `.tt-fillall-close` | button | 32 x 32 |  |  |  | 50% |  | flex |
| `.tt-fillall-fields` | div | 370.67 x 66.5 |  | 0px 0px 4px | 12px |  |  | grid |
| `.tt-fillall-footer` | div | 418.67 x 78.67 | 20px 24px | 20px 0px 0px | 10px |  |  | flex |
| `.tt-fillall-header` | div | 418.67 x 54 | 22px 24px 0px |  |  |  |  | flex |
| `.tt-fillall-input` | input | 179.33 x 44 | 0px 12px |  |  | 4px |  | inline-block |
| `.tt-fillall-lbl` | div | 179.33 x 16.5 |  | 0px 0px 6px |  |  |  | block |
| `.tt-fillall-overlay.open` | div | 2306 x 1253.33 |  |  |  |  | fixed / z1000 | flex |
| `.tt-fillall-title` | span | 138 x 25.5 |  |  |  |  |  | block |
| `.tt-header` | div | 1900 x 122.67 | 20px 20px 0px |  |  |  |  | block |
| `.tt-inner-card` | div | 1021.33 x 1338.67 |  |  |  | 4px |  | block |
| `.tt-list-panel` | div | 1064 x 1031.33 |  |  |  |  |  | flex |
| `.tt-list-scroll` | div | 1063.33 x 1031.33 | 16px |  |  |  |  | block |
| `.tt-section-dot` | span | 6 x 6 |  |  |  | 50% |  | block |
| `.tt-section-lbl` | div | 988 x 16.5 |  |  | 8px |  |  | flex |
| `.tt-section-lbl.tt-section-lbl--pending` | div | 988 x 16.5 |  |  | 8px |  |  | flex |
| `.tt-section-row` | tr | 1020 x 39.17 |  |  |  |  |  | table-row |
| `.tt-stat` | div | 393.67 x 64.59 | 12px 14px |  |  |  |  | block |
| `.tt-stat-lbl` | div | 365 x 15 |  | 4px 0px 0px |  |  |  | block |
| `.tt-stat-val` | div | 365 x 21.59 |  |  |  |  |  | block |
| `.tt-stats` | div | 788 x 65.93 |  | 0px 0px 22px |  | 4px |  | flex |
| `.tt-sub-cell` | td | 166.44 x 57.67 | 10px 16px |  |  |  |  | table-cell |
| `.tt-table` | table | 1020 x 1337.33 |  |  |  |  |  | table |
| `.tt-title` | div | 200.18 x 24 |  |  |  |  |  | block |
| `.tt-title-row` | div | 1860 x 36 |  | 0px 0px 14px |  |  |  | flex |
| `.tt-toolbar` | div | 1860 x 52 | 0px 0px 12px |  | 12px |  |  | flex |
| `.tt-wknd` | span | 112.39 x 31 | 8px 4px |  |  |  |  | block |
| `.upcoming-date` | div | 110 x 21 |  |  |  |  |  | block |
| `.upcoming-icon-wrap` | div | 32 x 32 |  |  |  | 4px |  | flex |
| `.upcoming-name` | div | 91.88 x 21 |  |  |  |  |  | block |
| `.upcoming-row` | div | 322.67 x 54.67 | 11px 0px |  | 14px |  |  | flex |
| `.wfh-cal` | div | 922.67 x 680.54 |  |  |  | 4px |  | flex |
| `.wfh-cal-body` | div | 921.33 x 642.04 |  |  |  |  |  | grid |
| `.wfh-cal-daylabel` | div | 131.61 x 36.5 | 10px 0px |  |  |  |  | block |
| `.wfh-cal-head` | div | 921.33 x 37.17 |  |  |  |  |  | grid |
| `.wfh-cell` | div | 131.61 x 128.41 | 8px |  | 4px |  |  | flex |
| `.wfh-cell-num` | div | 114.95 x 18 |  |  |  |  |  | block |
| `.wfh-cell.faded` | div | 131.61 x 128.41 | 8px |  | 4px |  |  | flex |
| `.wfh-cell.weekend` | div | 131.61 x 128.41 | 8px |  | 4px |  |  | flex |
| `.wfh-day-box` | div | 38 x 38 |  |  |  | 4px |  | flex |
| `.wfh-day-check` | label | 38 x 60.5 |  |  | 6px |  |  | flex |
| `.wfh-day-label` | div | 28.46 x 16.5 |  |  |  |  |  | block |
| `.wfh-legend` | div | 106.47 x 18 |  |  | 14px |  |  | flex |
| `.wfh-legend-dot.office` | div | 10 x 10 |  |  |  | 2px |  | block |
| `.wfh-legend-dot.wfh` | div | 10 x 10 |  |  |  | 2px |  | block |
| `.wfh-legend-item` | div | 42.85 x 18 |  |  | 6px |  |  | flex |
| `.wfh-month-label` | div | 176 x 24 |  |  |  |  |  | block |
| `.wfh-month-nav` | div | 260 x 32 |  |  | 10px |  |  | flex |
| `.wfh-nav-btn` | button | 32 x 32 |  |  |  | 4px |  | flex |
| `.wfh-prefs-badge.approved` | div | 72.16 x 22.5 | 3px 10px |  |  | 4px |  | block |
| `.wfh-prefs-card` | div | 922.67 x 161.13 | 20px 22px | 0px 0px 16px |  | 4px |  | block |
| `.wfh-prefs-days` | div | 222 x 60.5 |  |  | 8px |  |  | flex |
| `.wfh-prefs-header` | div | 877.33 x 22.5 |  | 0px 0px 4px |  |  |  | flex |
| `.wfh-prefs-sub` | div | 877.33 x 16.79 |  | 0px 0px 16px |  |  |  | block |
| `.wfh-prefs-title` | div | 93.15 x 21 |  |  |  |  |  | block |
| `.wfh-save-row` | div | 922.67 x 36 |  | 16px 0px 0px | 8px |  |  | flex |
| `.wfh-stat-card` | div | 455.33 x 79.33 | 18px 20px |  | 14px | 4px |  | flex |
| `.wfh-stat-icon.wfh-stat-icon-office` | div | 40 x 40 |  |  |  | 4px |  | flex |
| `.wfh-stat-icon.wfh-stat-icon-wfh` | div | 40 x 40 |  |  |  | 4px |  | flex |
| `.wfh-stat-label` | div | 56.63 x 18 |  | 2px 0px 0px |  |  |  | block |
| `.wfh-stat-num` | div | 56.63 x 22 |  |  |  |  |  | block |
| `.wfh-status-pill.office` | div | 52.32 x 21 | 3px 7px | 4px 0px 0px |  | 4px |  | block |
| `.wfh-status-pill.office.pref-fill` | div | 52.32 x 21 | 3px 7px | 4px 0px 0px |  | 4px |  | block |
| `.wfh-status-pill.wfh` | div | 38.2 x 21 | 3px 7px | 4px 0px 0px |  | 4px |  | block |
| `.wfh-status-pill.wfh.pref-fill` | div | 38.2 x 21 | 3px 7px | 4px 0px 0px |  | 4px |  | block |
| `.wfh-summary-grid` | div | 922.67 x 79.33 |  | 0px 0px 16px | 12px |  |  | grid |
| `.wfh-toolbar` | div | 922.67 x 32 |  | 0px 0px 14px |  |  |  | flex |
| `.ws-panel.active` | div | 970.67 x 1095 | 8px 24px 24px |  |  |  |  | block |


## Appendix C - computed shadows (element counts, both modes)

### Computed box-shadows (light)
| value | elements | views | selectors |
|---|---|---|---|
| `rgba(0,0,0,0.06)0px2px8px0px` | 7 | 5 | .page-center, #timetracking-view, #requests-view, .sidebar |
| `rgba(0,0,0,0.05)0px2px8px0px` | 5 | 5 | .emp-table-wrap, .tt-inner-card, #hrReqList, .content-card-wrap |
| `rgba(0,0,0,0.16)0px8px40px0px` | 5 | 1 | .modal |
| `rgba(0,0,0,0.12)0px8px32px0px,rgba(0,0,0,0.06)0px2px8px0px` | 4 | 4 | .cust-select__panel, .app-drop, .profile-drop, .datepicker-cal |
| `rgba(0,0,0,0.2)0px24px60px0px` | 4 | 4 | .modal, .emp-qcard |
| `#0052683px0px0px0pxinset` | 3 | 3 | td |
| `rgba(0,0,0,0.3)0px24px64px0px` | 1 | 1 | .req-success-card |
| `rgba(0,0,0,0.14)0px8px40px0px` | 1 | 1 | .tt-fillall-box |
| `rgba(0,0,0,0.14)0px8px32px0px` | 1 | 1 | .tt-confirm-box |
| `rgba(0,0,0,0.2)0px1px3px0px` | 1 | 1 | .dm-thumb |
| `rgba(0,0,0,0.1)0px8px24px0px,rgba(0,0,0,0.06)0px2px6px0px` | 1 | 1 | .phone-code-drop |

### Computed box-shadows (dark)
| value | elements | views | selectors |
|---|---|---|---|
| `rgba(0,0,0,0.16)0px8px40px0px` | 5 | 1 | .modal |
| `rgba(0,0,0,0.5)0px8px32px0px` | 4 | 4 | .cust-select__panel, .app-drop, .profile-drop, .datepicker-cal |
| `rgba(0,0,0,0.6)0px24px60px0px` | 4 | 4 | .modal, .emp-qcard |
| `#0cb8d03px0px0px0pxinset` | 3 | 3 | td |
| `rgba(0,0,0,0.5)0px4px24px0px` | 2 | 2 | .page-center |
| `rgba(0,0,0,0.06)0px2px8px0px` | 2 | 2 | #timetracking-view, #requests-view |
| `rgba(0,0,0,0.6)0px24px64px0px` | 1 | 1 | .req-success-card |
| `rgba(0,0,0,0.14)0px8px40px0px` | 1 | 1 | .tt-fillall-box |
| `rgba(0,0,0,0.14)0px8px32px0px` | 1 | 1 | .tt-confirm-box |
| `rgba(0,0,0,0.2)0px1px3px0px` | 1 | 1 | .dm-thumb |
| `rgba(0,0,0,0.5)0px8px24px0px` | 1 | 1 | .phone-code-drop |


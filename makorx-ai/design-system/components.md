# MakorX.AI HR — components.md

Copy-paste markup + behaviour for every component and pattern of the MakorX.AI HR app design system.
**Source of truth: the built app `makor-hr/employees.html`** (Figma is irrelevant by owner decision). Companion files: `tokens.css` / `tokens.json` (tokens), `components.css` (all CSS, PART 1 controls + PART 2 patterns), `assets/` (icons + logo + `MANIFEST.md`), `showcase.html` (live, light + dark), `CLAUDE.md` (agent brief), `../html-spec/build-notes.md` (stage notes, the 42 source bugs, derivations) and `../html-spec/VERIFICATION.md`.

Every snippet below is the markup used in `showcase.html` (verified against the LIVE app in light and dark). Class names are **the app's own class names** - design-system markup == app markup. Demo-only wrappers are not included. "Source: employees.html L…" lines point at the app's CSS so you can re-check a value.

## 1. Conventions (read first)

- **Theme**: light = `:root`, dark = class `dark` on `<body>` (the app's own mechanism; `localStorage['makor-dm']`). `.theme-light` / `.theme-dark` force a theme on a container (do NOT nest a light container inside `body.dark`: structural dark rules such as `:is(body.dark,.theme-dark) .btn-cancel{border:none}` would still match).
- **Page skeleton**
```html
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=Lexend+Exa:wght@400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components.css">
<body>                       <!-- add class="dark" for dark mode -->
  <nav class="top-nav">…</nav>   <!-- fixed 74px; use .top-nav.is-static only inside documentation pages -->
  <div class="page">…</div>      <!-- padding 74px 210px 0; height 100vh -->
  <div class="toast"></div>
</body>
```
- **Icons (mask recipe)**: `<span class="icon icon-plus icon-14"></span>` - colour = `color`; sizes `.icon-12/13/14/16/18/20/22/22x20/24/28/32/36/40`. Each `icon-NAME` maps to `assets/NAME.svg` (49 files, listed in `assets/MANIFEST.md`). The app's inline `<svg stroke="currentColor">` is equally valid. **Exceptions**: the apps launcher stays INLINE (`<svg class="nav-apps-icon">` with 9 circles; dark mode fills the circles); the logo is `<img src="assets/logo-mark.svg" width="32" height="32">`; the ✕ × ‹ ▶ ⊕ ＋ ⏱ glyphs and flag / reminder emoji are TEXT (as in the app).
- **Data-driven colours are attributes, never inline styles**: department badge `data-dept="Equities|Fixed Income|Technology|Operations|Compliance|Finance"` (+ `data-inactive="true"` -> grey in both themes; unknown dept = no attribute); HR request tile `.rv-type-icon[data-reqtype="annual|sick|wfh|location"]`; My Profile tiles `.req-icon-sm[data-reqtype="timeoff|sick|location"]` and `.req-type-icon-lg[data-reqtype="timeoff|location"]`; reminders `.reminder-icon[data-kind="birthday|anniversary"]`. Maps: §6.
- **Greys that the app writes inline** become classes: `.type-secondary` (#7c8dac), `.type-muted` (#a8b6cd; dark #505a6c).
- **State classes**: the app's own are kept (`.open .show .visible .active .selected .has-value .on .ready .sorted`); forced twins for documentation: `.is-hover .is-focus .is-open .is-selected .is-active .is-checked .is-on .is-visible .is-disabled .is-inactive .is-invalid`.
- **Panel scopes**: the app styles some containers by ID (`#requests-view`, `#timetracking-view`, `#myprofile-view`, `#panel-myinfo/-directory/-wfh/-timeoff`, `#dPill`, `#hrReqList`, `#poolSplitRight`, `#timeoff-main`); both the ID and the class twin exist (`.requests-view`, `.timetracking-view`, `.myprofile-view`, `.panel-myinfo`…, `.detail-pill`, `.rv-card`, `.pool-split-right`, `.timeoff-main`). Prefer the class twins.
- **Disabled**: `<button disabled>` (or `.is-disabled`); NEVER inline `opacity:.45` (bug #16). Hover is suppressed on disabled buttons (bug #17).
- **Desktop only**: the app has ZERO `@media`. See §8.

## 2. Token naming (tokens.css / tokens.json)

All values come from `tokens.css` (690 custom properties, mirrored 1:1 in `tokens.json`, viewer-compatible). Light values live on `:root`, dark overrides on `body.dark` / `.theme-dark`. Names are by ROLE: `--color-<role>` (243 roles, 222 with a dark pair: surface, overlay, text, border, brand, focus, status, department, request-type, scrollbar), `--font-primary / -display / -mono`, `--font-size-N`, `--font-weight-*`, `--line-height-*`, `--letter-spacing-*`, `--space-N` (observed), `--radius-*`, `--border-width-*`, `--control-h-*`, `--size-*`, `--shadow-*`, `--duration-*`, `--easing-*`, `--z-*`, `--opacity-*`. Full tables with light / dark values: `CLAUDE.md` §4-§6 and showcase → Foundations.

| need | token (light / dark) |
|---|---|
| brand | `--color-brand` #005268 / #0cb8d0 |
| page / card / popover | `--color-page-bg` #ffffff / #111214 · `--color-surface` #ffffff / #202226 · `--color-surface-elevated` #ffffff / #26292e |
| text | `--color-text-primary` #1a1a1a / #e2e8f4 · `-secondary` #7c8dac / #8a97aa · `-tertiary` #a8b6cd / #505a6c |
| borders (by role) | `--color-border-divider / -card / -control / -row / -popover` #e5e7ec / rgba(255,255,255,.12 / .07 / .10 / .09 / .08) |
| focus ring | `--shadow-focus` 0 0 0 3px `--color-focus-ring` |
| radius | `--radius-base` 4px (circle 50%, switch 8px) |
| control heights | `--control-h-btn` 36 · `-btn-lg` 38 · `-input` 40 · `-btn-sm` 32 · `-btn-xs` 30 |
| motion | `--duration-base` .12s · `-medium` .15s · `-modal` .18s · `-toast` .20s |

## 3. Components

### Buttons

Every button class of the app (they are not one family: heights 30/32/34/36/38/40, three cancel recipes, four outline-brand recipes). Hover and disabled are shown with the forced classes `.is-hover` / `.is-disabled` (the real pseudo-classes work as well). Disabled is class/attribute based in BOTH themes (bug #16); hover is suppressed on disabled buttons (bug #17). The app has no `:active` style and no custom focus style.

#### Filled brand buttons
Source: employees.html L58-59, L63-64, L841-842, L356-357, L385-386, L351-352, L440-441, L460-461; dark L1089-1098

Fill = `--color-brand`, text = `--color-text-on-brand` (light #fff / dark #111214). Hover = opacity .85 (.12s). Disabled: light opacity .45 + not-allowed; dark explicit #26292e / rgba(255,255,255,.22) at opacity 1.

```html
<!-- .btn-primary 36 / 0 14 / 14·500 · L58 -->
<button class="btn-primary"><span class="icon icon-plus icon-14"></span> New Employee</button>

<!-- .btn-cta 38 / 0 24 / 14·500 · L63 -->
<button class="btn-cta">Create Employee</button>

<!-- .ts-btn-primary 38 / 0 20 · L841 -->
<button class="ts-btn-primary">Fill Workdays</button>

<!-- .tt-btn-approve 38 / 0 28 / 14·600 · L356 -->
<button class="tt-btn-approve">Approve</button>

<!-- .tt-confirm-ok 38 / 0 24 / 14·600 · L385 -->
<button class="tt-confirm-ok">Approve</button>

<!-- .tt-fill-save 32 / 0 14 / 13·600 · L351 -->
<button class="tt-fill-save">Save</button>

<!-- .btn-add-member 30 / 0 10 / 12·500 · L440 -->
<button class="btn-add-member"><span class="icon icon-plus-bold icon-12"></span> Add Member</button>

<!-- .btn-inline-add 40 / 0 14 / 13·500 · L460 -->
<button class="btn-inline-add">+ Add</button>

<!-- Time Off "New Request" = .btn-primary + inline size (L2797) -->
<button class="btn-primary" style="height:32px;font-size:13px;padding:0 14px"><span class="icon icon-plus-bold icon-13"></span> New Request</button>

<!-- hover (.is-hover) -->
<button class="btn-primary is-hover"><span class="icon icon-plus icon-14"></span> New Employee</button>

<!-- disabled -->
<button class="btn-primary" disabled><span class="icon icon-plus icon-14"></span> New Employee</button>

<!-- disabled (.btn-cta) -->
<button class="btn-cta" disabled>Create Employee</button>
```

#### Outline and cancel buttons
Source: employees.html L56-57, L61-62, L1007-1008, L839-840, L358-359, L383-384, L353-354, L959-960; dark L1091-1096, L1312-1316, L1332, L1441, L1469

`.btn-cancel` is the effective cancel (light: transparent + 1px #c4cdd8; dark: translucent fill, no border). The other four cancel classes keep a 1px translucent border in dark and hover to `--color-fill-subtle`.

```html
<!-- .btn-outline 36 · L56 (default) -->
<button class="btn-outline">Cancel</button>

<!-- .btn-outline hover -->
<button class="btn-outline is-hover">Cancel</button>

<!-- .btn-outline disabled -->
<button class="btn-outline" disabled>Cancel</button>

<!-- .btn-cancel 38 / 0 20 / 14·600 · L61, L1007 (dark: filled, NO border) -->
<button class="btn-cancel">Cancel</button>

<!-- .btn-req-cancel · L959 -->
<button class="btn-req-cancel">Cancel</button>

<!-- .ts-btn · L839 -->
<button class="ts-btn">Cancel</button>

<!-- .tt-btn-fill-all · L358 -->
<button class="tt-btn-fill-all">Fill All Workdays</button>

<!-- .tt-confirm-cancel · L383 -->
<button class="tt-confirm-cancel">Cancel</button>

<!-- .tt-fill-cancel 32 / 0 12 / 13·600 · L353 -->
<button class="tt-fill-cancel">Cancel</button>

<!-- .btn-cancel hover -->
<button class="btn-cancel is-hover">Cancel</button>

<!-- .ts-btn hover -->
<button class="ts-btn is-hover">Cancel</button>
```

#### Outline-brand buttons and the timesheet save button
Source: employees.html L961-962, L1022-1023, L1019-1020, L1009-1011; dark L1443-1444, L1507-1511, L1390-1392

`.btn-req-send` / `.btn-close-calc`: 1.5px brand border, fill on hover (text stays #fff in both themes). `.btn-save` looks disabled until JS adds `.ready` (all rows valid).

```html
<!-- .btn-req-send 40 / 0 24 -->
<button class="btn-req-send">Send Request</button>

<!-- .btn-req-send hover -->
<button class="btn-req-send is-hover">Send Request</button>

<!-- .btn-close-calc 40 / 0 26 -->
<button class="btn-close-calc">Close</button>

<!-- .calc-accrual-btn 36 -->
<button class="calc-accrual-btn" style="margin-top:0">▶ Accrual Details</button>

<!-- .btn-save (not ready) -->
<button class="btn-save">Save</button>

<!-- .btn-save.ready -->
<button class="btn-save ready">Save</button>

<!-- .btn-save.ready hover -->
<button class="btn-save ready is-hover">Save</button>
```

#### Approve / Deny (HR requests)
Source: employees.html L273-276; dark L1099-1102

```html
<!-- .rv-btn-approve 30 / 0 12 / 13·600 -->
<button class="rv-btn-approve">Approve</button>

<!-- hover -->
<button class="rv-btn-approve is-hover">Approve</button>

<!-- .rv-btn-deny -->
<button class="rv-btn-deny">Deny</button>

<!-- hover -->
<button class="rv-btn-deny is-hover">Deny</button>
```

#### Save bar and its buttons
Source: employees.html L638-644; dark L1580 (buttons unchanged in dark)

Appears above the first card on the FIRST change (sticky top 0, bleeds over the 24px card padding with margin -24 -24 24). `.btn-save-bar` stays white-on-brand in both themes. Discard = DECIDED: restore the initial values (the app calls `location.reload()`).

```html
<!-- .save-bar.visible > .btn-discard-bar + .btn-save-bar -->
<div data-dirty>
  <div class="save-bar visible">
    <span>You have unsaved changes</span>
    <div class="save-bar-actions">
      <button class="btn-discard-bar">Discard</button>
      <button class="btn-save-bar">Save changes</button>
    </div>
  </div>
  <div class="field-label">First Name</div>
  <input class="field-value" value="Rachel">
</div>

<!-- hover: discard / save -->
<div class="save-bar visible">
  <span>You have unsaved changes</span>
  <div class="save-bar-actions">
    <button class="btn-discard-bar is-hover">Discard</button>
    <button class="btn-save-bar is-hover">Save changes</button>
  </div>
</div>
```
Behaviour: `savebar`, `toast` (see §5).

#### Icon-only buttons
Source: employees.html L396-397, L983-984, L713-714, L366-367, L740-741, L659-660, L892-893, L727-729, L1000-1001, L468-469; dark L1197-1198, L1374-1375, L1644-1645, L1318-1319, L1514-1515, L1590-1591, L1404-1405, L1653-1654, L1388-1389, L1241-1242

Circles (`50%`) exist only for the family-B close, quick-card close, fill-all close, balance action and entry remove; the rest are 4px squares. The family-B / quick-card / entry-remove glyphs are TEXT characters in the app (✕ ×), kept as text.

```html
<!-- .modal-close 32 (A) -->
<button class="modal-close"><span class="icon icon-close icon-16"></span></button>

<!-- hover -->
<button class="modal-close is-hover"><span class="icon icon-close icon-16"></span></button>

<!-- .emp-qcard-close 32 circle -->
<div class="emp-qcard-close" style="top:0;right:0">✕</div>

<!-- .tt-fillall-close 32 circle -->
<button class="tt-fillall-close"><span class="icon icon-close-bold icon-14"></span></button>

<!-- .wfh-nav-btn 32 -->
<button class="wfh-nav-btn"><span class="icon icon-chevron-left-bold icon-14"></span></button>

<!-- hover -->
<button class="wfh-nav-btn is-hover"><span class="icon icon-chevron-right-bold icon-14"></span></button>

<!-- .dp-nav 28 -->
<button class="dp-nav"><span class="icon icon-chevron-left icon-14"></span></button>

<!-- hover -->
<button class="dp-nav is-hover"><span class="icon icon-chevron-right icon-14"></span></button>

<!-- .bal-action-btn 28 circle -->
<div class="bal-action-btn" title="Request time off"><span class="icon icon-arrow-up-right icon-14"></span></div>

<!-- hover -->
<div class="bal-action-btn is-hover" title="Calculate balance"><span class="icon icon-calculator icon-14"></span></div>

<!-- .eqa-btn 32 (icon 18) -->
<button class="eqa-btn" title="Copy email"><span class="icon icon-copy icon-18"></span></button>

<!-- hover -->
<a class="eqa-btn is-hover" href="#" title="Open in Outlook"><span class="icon icon-mail-envelope icon-18"></span></a>

<!-- .entry-remove 28 circle -->
<div class="entry-remove">×</div>

<!-- hover -->
<div class="entry-remove is-hover">×</div>

<!-- .inline-list-item-remove 24 -->
<button class="inline-list-item-remove"><span class="icon icon-close-bold icon-12"></span></button>

<!-- hover -->
<button class="inline-list-item-remove is-hover"><span class="icon icon-close-bold icon-12"></span></button>
```

#### Text links and link buttons
Source: employees.html L1002-1003, L878-880, L920-921, L219-220, L143-144, L708-709; dark L1382, L1491, L1420-1421

`.add-entry-link` is invisible until its `.day-row` is hovered (opacity 0 → 1, .15s).

```html
<!-- .modal-add-entry -->
<div class="modal-add-entry" style="margin-top:0">⊕ Add Entry</div>

<!-- hover -->
<div class="modal-add-entry is-hover" style="margin-top:0">⊕ Add Entry</div>

<!-- .add-entry-link (inside a hovered .day-row) -->
<div class="day-row is-hover" style="padding:0"><div class="add-entry-link">＋ Add Time Entry</div></div>

<!-- .back-link -->
<div class="back-link" style="margin-bottom:0">‹ Back</div>

<!-- hover -->
<div class="back-link is-hover" style="margin-bottom:0">‹ Back</div>

<!-- .fc-link -->
<span class="fc-link">Beth Kline</span>

<!-- hover (underline) -->
<span class="fc-link is-hover">Beth Kline</span>

<!-- .drawer-meta-link -->
<span class="drawer-meta-link">+ Add job</span>

<!-- .dir-manager-link -->
<span class="dir-manager-link">Laura Kim</span>
```

### Inputs & fields

Four text-input families (search 40px, modal-input 40px, My Info field-value 40px, time/date/amount inputs) plus the 38px directory search. Focus = brand border + 3px ring (`--shadow-focus`; 2px for the timesheet fill inputs, 3px/.10 for the directory search). Placeholder colours differ by family (bug #19 fixes the missing ones).

#### Search
Source: employees.html L68-73; dark L1104-1107

The main search input is **40px** (not 38; 38px is only `.dir-search`). Icon = brand (dark #505a6c). No hover, no transition.

```html
<!-- default -->
<div class="search-wrap"><span class="search-icon"><span class="icon icon-search icon-16"></span></span><input class="search-input" type="text" placeholder="Search"></div>

<!-- focus (.is-focus) -->
<div class="search-wrap"><span class="search-icon"><span class="icon icon-search icon-16"></span></span><input class="search-input is-focus" type="text" placeholder="Search"></div>

<!-- with value -->
<div class="search-wrap"><span class="search-icon"><span class="icon icon-search icon-16"></span></span><input class="search-input" type="text" value="Equities"></div>

<!-- max-width:300px (Requests / Time Tracking toolbar) -->
<div class="search-wrap" style="max-width:300px"><span class="search-icon"><span class="icon icon-search icon-16"></span></span><input class="search-input" type="text" placeholder="Search"></div>
```

#### Modal input / select / textarea
Source: employees.html L406-416, L942, L946-947; dark L1201-1209, L1430-1431

`.modal-textarea` has NO CSS in the app (renders as an unstyled UA textarea, bug #8); here it is styled exactly like `.req-textarea-to` (min-height 90, 10/12 padding, focus = border only).

```html
<!-- .modal-input default -->
<div class="modal-field"><label class="modal-label">First Name</label><input class="modal-input" type="text" placeholder="e.g. Alex"></div>

<!-- focus -->
<div class="modal-field"><label class="modal-label">First Name</label><input class="modal-input is-focus" type="text" value="Alex"></div>

<!-- type=email (full-width field in a modal-grid) -->
<div class="modal-field"><label class="modal-label">Work Email</label><input class="modal-input" type="email" placeholder="name@makor.com"></div>

<!-- .modal-select (native, brand chevron) -->
<div class="modal-field"><label class="modal-label">Type</label><select class="modal-select"><option>Annual Leave</option><option>Sick Leave</option></select></div>

<!-- type=date -->
<div class="modal-field"><label class="modal-label">From</label><input class="modal-input" type="date" value="2026-09-15"></div>

<!-- .modal-textarea (decision #8) -->
<div class="modal-field"><label class="modal-label">Notes (optional)</label><textarea class="modal-textarea" placeholder="Anything the team should know…"></textarea></div>

<!-- .req-textarea-to -->
<textarea class="req-textarea-to" placeholder="Optional note..."></textarea>
```

#### My Info field (.field-value)
Source: employees.html L629-637; dark L1572-1579

Label = 10px/700 uppercase. Hover border `--color-border-hover`. Readonly = `.readonly-field` (fill-subtle, secondary text, no pointer events). The same class also styles the native `<select>` (brand chevron).

```html
<!-- default -->
<div class="field"><div class="field-label">First Name</div><input type="text" class="field-value" value="Rachel"></div>

<!-- placeholder -->
<div class="field"><div class="field-label">Middle Name</div><input type="text" class="field-value" placeholder="—"></div>

<!-- hover -->
<div class="field"><div class="field-label">Last Name</div><input type="text" class="field-value is-hover" value="Sternberg"></div>

<!-- focus -->
<div class="field"><div class="field-label">Last Name</div><input type="text" class="field-value is-focus" value="Sternberg"></div>

<!-- readonly + .field-note -->
<div class="field"><div class="field-label">Work Email</div><input type="email" class="field-value readonly-field" value="rsternberg@makorsecurities.com" readonly><div class="field-note">Managed by IT — contact your admin to change it.</div></div>

<!-- select.field-value -->
<div class="field"><div class="field-label">Gender</div><select class="field-value"><option>— Select —</option><option selected>Female</option><option>Male</option></select></div>

<!-- optional marker (inline in the app; use .type-muted) -->
<div class="field"><div class="field-label">Secondary Phone <span class="type-muted" style="font-weight:400;text-transform:none;letter-spacing:0;font-size:10px">(optional)</span></div><input type="email" class="field-value" placeholder="personal@email.com"></div>
```

#### Time Off form inputs and labels
Source: employees.html L926-927, L932-947; dark L1425-1432

`.req-label` carries the required star (`.req-star` = `--color-danger-text`; dark #f87171 is a fix for bug #5). Empty date text = tertiary until `.has-date` (bug #19).

```html
<!-- .req-label + datepicker input (empty) -->
<div><div class="req-label">From <span class="req-star">*</span></div><input class="datepicker-input req-date-native" placeholder="dd/mm/yyyy" readonly></div>

<!-- .has-date -->
<div><div class="req-label">To <span class="req-star">*</span></div><input class="datepicker-input req-date-native has-date" value="18/09/2026" readonly></div>

<!-- .req-date-input 160 (native date) -->
<input class="req-date-input" type="date" value="2026-09-15">

<!-- .req-amount-input 90 + unit -->
<div class="req-amount-row"><input class="req-amount-input" type="number" min="0" step="0.5" placeholder="0"><span class="req-amount-unit">days</span></div>

<!-- .req-date-sep -->
<span class="req-date-sep">–</span>
```

#### Time, fill and entry inputs
Source: employees.html L992-997, L845-847, L349-350, L371-373; dark L1383-1387, L1492-1494, L1309-1310, L1324-1326

```html
<!-- .time-group: .time-label + .time-input 80 + .ampm-select -->
<div class="time-group"><div class="time-label">Start Time</div><div class="time-inputs"><input class="time-input" type="text" placeholder="hh:mm" maxlength="5"><select class="ampm-select"><option>AM</option><option>PM</option></select></div></div>

<!-- focus -->
<div class="time-group"><div class="time-label">End Time</div><div class="time-inputs"><input class="time-input is-focus" type="text" value="06:00" maxlength="5"><select class="ampm-select is-focus"><option>AM</option><option selected>PM</option></select></div></div>

<!-- .fill-modal-label + .fill-modal-input (type=time) -->
<div><div class="fill-modal-label">Start Time</div><input class="fill-modal-input" type="time" value="09:00"></div>

<!-- .tt-fill-input 32 / 13px / 108w -->
<input class="tt-fill-input" placeholder="e.g. 9:00" type="text">

<!-- focus (2px ring) -->
<input class="tt-fill-input is-focus" value="9:00" type="text">

<!-- .tt-fillall-lbl + .tt-fillall-input 44 / 16px -->
<div><div class="tt-fillall-lbl">Start Time</div><input class="tt-fillall-input" type="time" value="09:00"></div>
```

#### Directory search and selects (13px / 38px)
Source: employees.html L679-688; dark L1618-1624

Dark native chevron = `#0cb8d0` (bug #18: the app leaves the light #005268 stroke).

```html
<!-- .dir-search 38 -->
<div class="dir-search-wrap"><span class="dir-search-icon"><span class="icon icon-search-line icon-16"></span></span><input class="dir-search" type="text" placeholder="Search"></div>

<!-- focus (3px / .10 ring) -->
<div class="dir-search-wrap"><span class="dir-search-icon"><span class="icon icon-search-line icon-16"></span></span><input class="dir-search is-focus" type="text" value="Laura"></div>

<!-- .dir-select 38 -->
<select class="dir-select"><option>Name</option><option>Department</option><option>Office</option></select>
```

### Select / combobox

The main dropdown is the custom `.cust-select` (trigger 40px + absolutely positioned panel, z-index 500). The panel has NO border in either theme (kept as rendered); options have no transition. Click the demos: the behaviour snippet is class-based and works for any number of selects.

#### Custom select states
Source: employees.html L74-90; dark L1109-1117

Placeholder state (grey) → `.has-value` (primary text) after a pick; the "All" option restores the placeholder colour. Open: border brand, chevron rotates 180° (.15s), panel shadow `--shadow-popover`.

```html
<!-- placeholder (click me) -->
<div class="cust-select cs-dept">
  <div class="cust-select__trigger"><span class="cust-select__value">Department</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
    <div class="cust-select__option selected" data-val="" data-label="Department">All Departments</div>
    <div class="cust-select__option" data-val="Equities">Equities</div>
    <div class="cust-select__option" data-val="Fixed Income">Fixed Income</div>
    <div class="cust-select__option" data-val="Technology">Technology</div>
    <div class="cust-select__option" data-val="Operations">Operations</div>
    <div class="cust-select__option" data-val="Compliance">Compliance</div>
    <div class="cust-select__option" data-val="Finance">Finance</div>
  </div>
</div>

<!-- hover (.is-hover) -->
<div class="cust-select cs-dept">
  <div class="cust-select__trigger is-hover"><span class="cust-select__value">Department</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
    <div class="cust-select__option selected" data-val="" data-label="Department">All Departments</div>
    <div class="cust-select__option" data-val="Equities">Equities</div>
    <div class="cust-select__option" data-val="Fixed Income">Fixed Income</div>
    <div class="cust-select__option" data-val="Technology">Technology</div>
    <div class="cust-select__option" data-val="Operations">Operations</div>
    <div class="cust-select__option" data-val="Compliance">Compliance</div>
    <div class="cust-select__option" data-val="Finance">Finance</div>
  </div>
</div>

<!-- has-value -->
<div class="cust-select cs-dept">
  <div class="cust-select__trigger has-value"><span class="cust-select__value">Equities</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
    <div class="cust-select__option" data-val="" data-label="Equities">All Departments</div>
    <div class="cust-select__option selected" data-val="Equities">Equities</div>
    <div class="cust-select__option" data-val="Fixed Income">Fixed Income</div>
    <div class="cust-select__option" data-val="Technology">Technology</div>
    <div class="cust-select__option" data-val="Operations">Operations</div>
    <div class="cust-select__option" data-val="Compliance">Compliance</div>
    <div class="cust-select__option" data-val="Finance">Finance</div>
  </div>
</div>

<!-- open (.is-open, selected option brand/500) -->
<div class="cust-select cs-dept is-open">
  <div class="cust-select__trigger has-value"><span class="cust-select__value">Fixed Income</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
    <div class="cust-select__option" data-val="" data-label="Fixed Income">All Departments</div>
    <div class="cust-select__option" data-val="Equities">Equities</div>
    <div class="cust-select__option selected" data-val="Fixed Income">Fixed Income</div>
    <div class="cust-select__option" data-val="Technology">Technology</div>
    <div class="cust-select__option" data-val="Operations">Operations</div>
    <div class="cust-select__option" data-val="Compliance">Compliance</div>
    <div class="cust-select__option" data-val="Finance">Finance</div>
  </div>
</div>
```
Behaviour: `select` (see §5).

#### Toolbar widths (fixed trigger widths)
Source: employees.html L86-89, L480-483, L91-92

Trigger widths are classes on the wrapper: `.cs-dept` 152, `.cs-office` 124, `.cs-status` 114, `.cs-group` / `.pool-cs-group` 136, `.pool-cs-company` 138, `.pool-cs-team` 120, `.pool-cs-desk` 112. **App behaviour not reproduced:** for the three pool selects the app's JS (`poolPopulateDynamic`, L4351-4370) overwrites the trigger width with an inline value = widest option text + 48px (e.g. 137 / 173 / 171); the DS keeps the class widths (the initial CSS state). `.groupby-wrap` + `.toolbar-spacer` push "Group by" to the right.

```html
<!-- Employee toolbar -->
<div class="toolbar">
  <div class="search-wrap"><span class="search-icon"><span class="icon icon-search icon-16"></span></span><input class="search-input" type="text" placeholder="Search"></div>
  <div class="cust-select cs-dept">
  <div class="cust-select__trigger"><span class="cust-select__value">Department</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
    <div class="cust-select__option selected" data-val="" data-label="Department">All Departments</div>
    <div class="cust-select__option" data-val="Equities">Equities</div>
    <div class="cust-select__option" data-val="Fixed Income">Fixed Income</div>
  </div>
</div>
  <div class="cust-select cs-office">
  <div class="cust-select__trigger"><span class="cust-select__value">Office</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
    <div class="cust-select__option selected" data-val="" data-label="Office">All Offices</div>
    <div class="cust-select__option" data-val="New York">New York</div>
    <div class="cust-select__option" data-val="London">London</div>
  </div>
</div>
  <div class="cust-select cs-status">
  <div class="cust-select__trigger"><span class="cust-select__value">Status</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
    <div class="cust-select__option selected" data-val="" data-label="Status">All</div>
    <div class="cust-select__option" data-val="Active">Active</div>
    <div class="cust-select__option" data-val="Inactive">Inactive</div>
  </div>
</div>
  <div class="toolbar-spacer"></div>
  <div class="groupby-wrap"><div class="cust-select cs-group">
  <div class="cust-select__trigger"><span class="cust-select__value">Group by</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
    <div class="cust-select__option selected" data-val="" data-label="Group by">None</div>
    <div class="cust-select__option" data-val="Department">Department</div>
    <div class="cust-select__option" data-val="Office">Office</div>
    <div class="cust-select__option" data-val="Division">Division</div>
  </div>
</div></div>
</div>

<!-- Pool toolbar widths (138 / 120 / 112) -->
<div class="toolbar">
  <div class="cust-select pool-cs-company">
  <div class="cust-select__trigger"><span class="cust-select__value">Company</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
    <div class="cust-select__option selected" data-val="" data-label="Company">All</div>
    <div class="cust-select__option" data-val="Makor">Makor</div>
    <div class="cust-select__option" data-val="Makor Capital">Makor Capital</div>
  </div>
</div>
  <div class="cust-select pool-cs-team">
  <div class="cust-select__trigger"><span class="cust-select__value">Team</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
    <div class="cust-select__option selected" data-val="" data-label="Team">All</div>
    <div class="cust-select__option" data-val="Makor FX">Makor FX</div>
  </div>
</div>
  <div class="cust-select pool-cs-desk">
  <div class="cust-select__trigger"><span class="cust-select__value">Desk</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
    <div class="cust-select__option selected" data-val="" data-label="Desk">All</div>
    <div class="cust-select__option" data-val="Makor Securities">Makor Securities</div>
  </div>
</div>
</div>
```

#### Select inside a modal field
Source: employees.html L415, L3368-3377

Inside `.modal-field` the trigger fills the field (100%). DECIDED (bug #14): the app sets `.modal-body{overflow-y:visible}` while a select is open, which lets the modal footer detach below the modal at tall viewports; the DS keeps `overflow-y:auto` and expects popups inside modals to be portalled (as `.pool-emp-drop` already is).

```html
<!-- .modal-field > .cust-select (closed) -->
<div class="modal-field"><label class="modal-label">Gender</label><div class="cust-select ">
  <div class="cust-select__trigger"><span class="cust-select__value">Select…</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
    <div class="cust-select__option selected" data-val="" data-label="Select…">Select…</div>
    <div class="cust-select__option" data-val="Male">Male</div>
    <div class="cust-select__option" data-val="Female">Female</div>
    <div class="cust-select__option" data-val="Non-binary">Non-binary</div>
    <div class="cust-select__option" data-val="Prefer not to say">Prefer not to say</div>
  </div>
</div></div>

<!-- has-value "Active" -->
<div class="modal-field"><label class="modal-label">Status</label><div class="cust-select ">
  <div class="cust-select__trigger has-value"><span class="cust-select__value">Active</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
    <div class="cust-select__option selected" data-val="" data-label="Active">Active</div>
    <div class="cust-select__option" data-val="Inactive">Inactive</div>
  </div>
</div></div>
```

#### Combobox / autocomplete (pool employee search)
Source: employees.html L473-479; dark L1244-1248

A `position:fixed` portal panel (z-index 9999, max-height 200, shadow `--shadow-combo`) positioned under the input by JS; opens on focus, filters on input, closes 180 ms after blur. Item = name 13/500 + meta 12 secondary. (The showcase frame is a transformed box, so "fixed" is relative to the frame.)

```html
<!-- .pool-emp-drop.is-open -->
<div class="modal-field" style="width:300px;margin:10px"><label class="modal-label">Search Employee</label><input class="modal-input" type="text" placeholder="Type to search…"></div>
<div class="pool-emp-drop is-open" style="top:78px;left:10px;width:300px">
  <div class="pool-emp-drop-item"><span class="pool-emp-drop-name">Avi Bouhadana</span><span class="pool-emp-drop-meta">Director · #3</span></div>
  <div class="pool-emp-drop-item is-hover"><span class="pool-emp-drop-name">Michael Halimi</span><span class="pool-emp-drop-meta">Director · #7</span></div>
  <div class="pool-emp-drop-item"><span class="pool-emp-drop-name">Rachel Sternberg</span><span class="pool-emp-drop-meta">VP · #12</span></div>
</div>

<!-- empty result -->
<div class="pool-emp-drop is-open" style="top:10px;left:10px;width:300px"><div class="pool-emp-drop-empty">No employees found</div></div>
```

### Datepicker & phone picker

Both popups are built by JS in the app and share one CSS set across three datepicker instances (My Info birthday, Time Off from/to, New Employee dob/hire). Day cells: `.other-month`, `.today` (1.5px soft-brand border), `.selected` (brand fill). Year view = 16 years (4 columns).

#### Datepicker
Source: employees.html L645-674; dark L1582-1602

Live demo: click the input. Calendar: 280px, padding 16, shadow `--shadow-popover`, z-index 200. Header month label toggles the year grid; nav buttons step months (or 16 years in year mode).

```html
<!-- input closed (hover) -->
<div class="datepicker-wrap" style="width:240px">
  <div class="datepicker-input-wrap">
    <input type="text" class="datepicker-input is-hover" value="Mar 14, 1986" readonly>
    <span class="datepicker-icon"><span class="icon icon-calendar icon-16"></span></span>
  </div>
  <div class="datepicker-cal">
    <div class="dp-header">
      <button class="dp-nav" data-dir="prev"><span class="icon icon-chevron-left icon-14"></span></button>
      <span class="dp-month-label">Mar 1986</span>
      <button class="dp-nav" data-dir="next"><span class="icon icon-chevron-right icon-14"></span></button>
    </div>
    <div class="dp-dayview">
      <div class="dp-weekdays"><div class="dp-wd">Su</div><div class="dp-wd">Mo</div><div class="dp-wd">Tu</div><div class="dp-wd">We</div><div class="dp-wd">Th</div><div class="dp-wd">Fr</div><div class="dp-wd">Sa</div></div>
      <div class="dp-days"><div class="dp-day other-month">23</div><div class="dp-day other-month">24</div><div class="dp-day other-month">25</div><div class="dp-day other-month">26</div><div class="dp-day other-month">27</div><div class="dp-day other-month">28</div><div class="dp-day">1</div><div class="dp-day">2</div><div class="dp-day">3</div><div class="dp-day">4</div><div class="dp-day">5</div><div class="dp-day">6</div><div class="dp-day">7</div><div class="dp-day">8</div><div class="dp-day">9</div><div class="dp-day">10</div><div class="dp-day">11</div><div class="dp-day">12</div><div class="dp-day">13</div><div class="dp-day selected">14</div><div class="dp-day">15</div><div class="dp-day">16</div><div class="dp-day">17</div><div class="dp-day">18</div><div class="dp-day">19</div><div class="dp-day">20</div><div class="dp-day">21</div><div class="dp-day">22</div><div class="dp-day">23</div><div class="dp-day">24</div><div class="dp-day">25</div><div class="dp-day">26</div><div class="dp-day">27</div><div class="dp-day">28</div><div class="dp-day">29</div><div class="dp-day">30</div><div class="dp-day">31</div><div class="dp-day other-month">1</div><div class="dp-day other-month">2</div><div class="dp-day other-month">3</div><div class="dp-day other-month">4</div><div class="dp-day other-month">5</div></div>
    </div>
    <div class="dp-yearview" style="display:none"><div class="dp-year-grid"></div></div>
  </div>
</div>

<!-- input focus -->
<div class="datepicker-wrap" style="width:240px">
  <div class="datepicker-input-wrap">
    <input type="text" class="datepicker-input is-focus" placeholder="dd/mm/yyyy" readonly>
    <span class="datepicker-icon"><span class="icon icon-calendar icon-16"></span></span>
  </div>
  <div class="datepicker-cal">
    <div class="dp-header">
      <button class="dp-nav" data-dir="prev"><span class="icon icon-chevron-left icon-14"></span></button>
      <span class="dp-month-label">Mar 1986</span>
      <button class="dp-nav" data-dir="next"><span class="icon icon-chevron-right icon-14"></span></button>
    </div>
    <div class="dp-dayview">
      <div class="dp-weekdays"><div class="dp-wd">Su</div><div class="dp-wd">Mo</div><div class="dp-wd">Tu</div><div class="dp-wd">We</div><div class="dp-wd">Th</div><div class="dp-wd">Fr</div><div class="dp-wd">Sa</div></div>
      <div class="dp-days"><div class="dp-day other-month">23</div><div class="dp-day other-month">24</div><div class="dp-day other-month">25</div><div class="dp-day other-month">26</div><div class="dp-day other-month">27</div><div class="dp-day other-month">28</div><div class="dp-day">1</div><div class="dp-day">2</div><div class="dp-day">3</div><div class="dp-day">4</div><div class="dp-day">5</div><div class="dp-day">6</div><div class="dp-day">7</div><div class="dp-day">8</div><div class="dp-day">9</div><div class="dp-day">10</div><div class="dp-day">11</div><div class="dp-day">12</div><div class="dp-day">13</div><div class="dp-day selected">14</div><div class="dp-day">15</div><div class="dp-day">16</div><div class="dp-day">17</div><div class="dp-day">18</div><div class="dp-day">19</div><div class="dp-day">20</div><div class="dp-day">21</div><div class="dp-day">22</div><div class="dp-day">23</div><div class="dp-day">24</div><div class="dp-day">25</div><div class="dp-day">26</div><div class="dp-day">27</div><div class="dp-day">28</div><div class="dp-day">29</div><div class="dp-day">30</div><div class="dp-day">31</div><div class="dp-day other-month">1</div><div class="dp-day other-month">2</div><div class="dp-day other-month">3</div><div class="dp-day other-month">4</div><div class="dp-day other-month">5</div></div>
    </div>
    <div class="dp-yearview" style="display:none"><div class="dp-year-grid"></div></div>
  </div>
</div>

<!-- open - day view (selected 14, hover 21, today 9) -->
<div class="datepicker-wrap" style="width:240px">
  <div class="datepicker-input-wrap">
    <input type="text" class="datepicker-input" value="Mar 14, 1986" readonly>
    <span class="datepicker-icon"><span class="icon icon-calendar icon-16"></span></span>
  </div>
  <div class="datepicker-cal is-open">
    <div class="dp-header">
      <button class="dp-nav" data-dir="prev"><span class="icon icon-chevron-left icon-14"></span></button>
      <span class="dp-month-label">Mar 1986</span>
      <button class="dp-nav" data-dir="next"><span class="icon icon-chevron-right icon-14"></span></button>
    </div>
    <div class="dp-dayview">
      <div class="dp-weekdays"><div class="dp-wd">Su</div><div class="dp-wd">Mo</div><div class="dp-wd">Tu</div><div class="dp-wd">We</div><div class="dp-wd">Th</div><div class="dp-wd">Fr</div><div class="dp-wd">Sa</div></div>
      <div class="dp-days"><div class="dp-day other-month">23</div><div class="dp-day other-month">24</div><div class="dp-day other-month">25</div><div class="dp-day other-month">26</div><div class="dp-day other-month">27</div><div class="dp-day other-month">28</div><div class="dp-day">1</div><div class="dp-day">2</div><div class="dp-day">3</div><div class="dp-day">4</div><div class="dp-day">5</div><div class="dp-day">6</div><div class="dp-day">7</div><div class="dp-day">8</div><div class="dp-day today">9</div><div class="dp-day">10</div><div class="dp-day">11</div><div class="dp-day">12</div><div class="dp-day">13</div><div class="dp-day selected">14</div><div class="dp-day">15</div><div class="dp-day">16</div><div class="dp-day">17</div><div class="dp-day">18</div><div class="dp-day">19</div><div class="dp-day">20</div><div class="dp-day is-hover">21</div><div class="dp-day">22</div><div class="dp-day">23</div><div class="dp-day">24</div><div class="dp-day">25</div><div class="dp-day">26</div><div class="dp-day">27</div><div class="dp-day">28</div><div class="dp-day">29</div><div class="dp-day">30</div><div class="dp-day">31</div><div class="dp-day other-month">1</div><div class="dp-day other-month">2</div><div class="dp-day other-month">3</div><div class="dp-day other-month">4</div><div class="dp-day other-month">5</div></div>
    </div>
    <div class="dp-yearview" style="display:none"><div class="dp-year-grid"></div></div>
  </div>
</div>

<!-- open - year view -->
<div class="datepicker-wrap" style="width:240px">
  <div class="datepicker-input-wrap">
    <input type="text" class="datepicker-input" value="Mar 14, 1986" readonly>
    <span class="datepicker-icon"><span class="icon icon-calendar icon-16"></span></span>
  </div>
  <div class="datepicker-cal is-open">
    <div class="dp-header">
      <button class="dp-nav" data-dir="prev"><span class="icon icon-chevron-left icon-14"></span></button>
      <span class="dp-month-label">Select Year</span>
      <button class="dp-nav" data-dir="next"><span class="icon icon-chevron-right icon-14"></span></button>
    </div>
    <div class="dp-dayview" style="display:none">
      <div class="dp-weekdays"><div class="dp-wd">Su</div><div class="dp-wd">Mo</div><div class="dp-wd">Tu</div><div class="dp-wd">We</div><div class="dp-wd">Th</div><div class="dp-wd">Fr</div><div class="dp-wd">Sa</div></div>
      <div class="dp-days"></div>
    </div>
    <div class="dp-yearview"><div class="dp-year-grid"><div class="dp-year-item">1978</div><div class="dp-year-item">1979</div><div class="dp-year-item">1980</div><div class="dp-year-item">1981</div><div class="dp-year-item">1982</div><div class="dp-year-item">1983</div><div class="dp-year-item">1984</div><div class="dp-year-item">1985</div><div class="dp-year-item selected">1986</div><div class="dp-year-item">1987</div><div class="dp-year-item">1988</div><div class="dp-year-item">1989</div><div class="dp-year-item">1990</div><div class="dp-year-item">1991</div><div class="dp-year-item">1992</div><div class="dp-year-item">1993</div></div></div>
  </div>
</div>

<!-- live (click) -->
<div class="datepicker-wrap" style="width:240px">
  <div class="datepicker-input-wrap">
    <input type="text" class="datepicker-input" placeholder="dd/mm/yyyy" readonly>
    <span class="datepicker-icon"><span class="icon icon-calendar icon-16"></span></span>
  </div>
  <div class="datepicker-cal">
    <div class="dp-header">
      <button class="dp-nav" data-dir="prev"><span class="icon icon-chevron-left icon-14"></span></button>
      <span class="dp-month-label">Oct 2026</span>
      <button class="dp-nav" data-dir="next"><span class="icon icon-chevron-right icon-14"></span></button>
    </div>
    <div class="dp-dayview">
      <div class="dp-weekdays"><div class="dp-wd">Su</div><div class="dp-wd">Mo</div><div class="dp-wd">Tu</div><div class="dp-wd">We</div><div class="dp-wd">Th</div><div class="dp-wd">Fr</div><div class="dp-wd">Sa</div></div>
      <div class="dp-days"><div class="dp-day other-month">27</div><div class="dp-day other-month">28</div><div class="dp-day other-month">29</div><div class="dp-day other-month">30</div><div class="dp-day">1</div><div class="dp-day">2</div><div class="dp-day">3</div><div class="dp-day">4</div><div class="dp-day">5</div><div class="dp-day">6</div><div class="dp-day">7</div><div class="dp-day">8</div><div class="dp-day">9</div><div class="dp-day">10</div><div class="dp-day">11</div><div class="dp-day">12</div><div class="dp-day">13</div><div class="dp-day">14</div><div class="dp-day">15</div><div class="dp-day">16</div><div class="dp-day">17</div><div class="dp-day">18</div><div class="dp-day">19</div><div class="dp-day">20</div><div class="dp-day">21</div><div class="dp-day">22</div><div class="dp-day">23</div><div class="dp-day">24</div><div class="dp-day">25</div><div class="dp-day">26</div><div class="dp-day">27</div><div class="dp-day">28</div><div class="dp-day">29</div><div class="dp-day">30</div><div class="dp-day">31</div></div>
    </div>
    <div class="dp-yearview" style="display:none"><div class="dp-year-grid"></div></div>
  </div>
</div>
```
Behaviour: `datepicker` (see §5).

#### History range picker (native dates)
Source: employees.html L899-906; dark L1448-1452

```html
<!-- .hist-range-picker 36 -->
<div class="hist-range-picker"><input type="date" class="hist-range-input" value="2019-01-01"><span class="hist-range-sep">–</span><input type="date" class="hist-range-input" value="2026-08-27"><span class="icon icon-calendar icon-16 hist-range-icon"></span></div>

<!-- focus-within (.is-focus) -->
<div class="hist-range-picker is-focus"><input type="date" class="hist-range-input" value="2019-01-01"><span class="hist-range-sep">–</span><input type="date" class="hist-range-input" value="2026-08-27"><span class="icon icon-calendar icon-16 hist-range-icon"></span></div>
```

#### Phone-code picker
Source: employees.html L588-609; dark L1604-1616

Segmented field: 40px wrap (1px border, focus ring on the wrap), 38px code button with the flag emoji (text) + code + 12px chevron, panel min-width 200 / max-height 240, shadow `--shadow-popover-sm`, z-index 300. The code value uses `--color-text-primary` (bug #1: the app leaks the dark #e2e8f4 into light).

```html
<!-- closed -->
<div class="phone-input-wrap" style="width:300px">
  <div class="phone-code-wrap">
    <div class="phone-code-btn"><span class="phone-flag">🇺🇸</span><span class="phone-code-val">+1</span><span class="icon icon-chevron-down-sm icon-12 phone-drop-arrow"></span></div>
    <div class="phone-code-drop">
      <div class="phone-code-opt selected"><span class="opt-flag">🇺🇸</span><span class="opt-code">+1</span><span class="opt-name">United States</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇬🇧</span><span class="opt-code">+44</span><span class="opt-name">United Kingdom</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇮🇱</span><span class="opt-code">+972</span><span class="opt-name">Israel</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇦🇪</span><span class="opt-code">+971</span><span class="opt-name">UAE</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇫🇷</span><span class="opt-code">+33</span><span class="opt-name">France</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇩🇪</span><span class="opt-code">+49</span><span class="opt-name">Germany</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇨🇭</span><span class="opt-code">+41</span><span class="opt-name">Switzerland</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇸🇬</span><span class="opt-code">+65</span><span class="opt-name">Singapore</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇭🇰</span><span class="opt-code">+852</span><span class="opt-name">Hong Kong</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇯🇵</span><span class="opt-code">+81</span><span class="opt-name">Japan</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇦🇺</span><span class="opt-code">+61</span><span class="opt-name">Australia</span></div>
    </div>
  </div>
  <input type="tel" class="phone-number-input" value="(212) 555 0147">
</div>

<!-- button hover -->
<div class="phone-input-wrap" style="width:300px">
  <div class="phone-code-wrap">
    <div class="phone-code-btn is-hover"><span class="phone-flag">🇺🇸</span><span class="phone-code-val">+1</span><span class="icon icon-chevron-down-sm icon-12 phone-drop-arrow"></span></div>
    <div class="phone-code-drop">
      <div class="phone-code-opt selected"><span class="opt-flag">🇺🇸</span><span class="opt-code">+1</span><span class="opt-name">United States</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇬🇧</span><span class="opt-code">+44</span><span class="opt-name">United Kingdom</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇮🇱</span><span class="opt-code">+972</span><span class="opt-name">Israel</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇦🇪</span><span class="opt-code">+971</span><span class="opt-name">UAE</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇫🇷</span><span class="opt-code">+33</span><span class="opt-name">France</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇩🇪</span><span class="opt-code">+49</span><span class="opt-name">Germany</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇨🇭</span><span class="opt-code">+41</span><span class="opt-name">Switzerland</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇸🇬</span><span class="opt-code">+65</span><span class="opt-name">Singapore</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇭🇰</span><span class="opt-code">+852</span><span class="opt-name">Hong Kong</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇯🇵</span><span class="opt-code">+81</span><span class="opt-name">Japan</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇦🇺</span><span class="opt-code">+61</span><span class="opt-name">Australia</span></div>
    </div>
  </div>
  <input type="tel" class="phone-number-input" placeholder="Add phone number">
</div>

<!-- wrap focus (.is-focus) -->
<div class="phone-input-wrap is-focus" style="width:300px">
  <div class="phone-code-wrap">
    <div class="phone-code-btn"><span class="phone-flag">🇺🇸</span><span class="phone-code-val">+1</span><span class="icon icon-chevron-down-sm icon-12 phone-drop-arrow"></span></div>
    <div class="phone-code-drop">
      <div class="phone-code-opt selected"><span class="opt-flag">🇺🇸</span><span class="opt-code">+1</span><span class="opt-name">United States</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇬🇧</span><span class="opt-code">+44</span><span class="opt-name">United Kingdom</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇮🇱</span><span class="opt-code">+972</span><span class="opt-name">Israel</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇦🇪</span><span class="opt-code">+971</span><span class="opt-name">UAE</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇫🇷</span><span class="opt-code">+33</span><span class="opt-name">France</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇩🇪</span><span class="opt-code">+49</span><span class="opt-name">Germany</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇨🇭</span><span class="opt-code">+41</span><span class="opt-name">Switzerland</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇸🇬</span><span class="opt-code">+65</span><span class="opt-name">Singapore</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇭🇰</span><span class="opt-code">+852</span><span class="opt-name">Hong Kong</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇯🇵</span><span class="opt-code">+81</span><span class="opt-name">Japan</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇦🇺</span><span class="opt-code">+61</span><span class="opt-name">Australia</span></div>
    </div>
  </div>
  <input type="tel" class="phone-number-input" value="(212) 555 0147">
</div>

<!-- open (.is-open; option 3 hover) -->
<div class="phone-input-wrap" style="width:300px">
  <div class="phone-code-wrap is-open">
    <div class="phone-code-btn"><span class="phone-flag">🇺🇸</span><span class="phone-code-val">+1</span><span class="icon icon-chevron-down-sm icon-12 phone-drop-arrow"></span></div>
    <div class="phone-code-drop">
      <div class="phone-code-opt selected"><span class="opt-flag">🇺🇸</span><span class="opt-code">+1</span><span class="opt-name">United States</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇬🇧</span><span class="opt-code">+44</span><span class="opt-name">United Kingdom</span></div>
      <div class="phone-code-opt is-hover"><span class="opt-flag">🇮🇱</span><span class="opt-code">+972</span><span class="opt-name">Israel</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇦🇪</span><span class="opt-code">+971</span><span class="opt-name">UAE</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇫🇷</span><span class="opt-code">+33</span><span class="opt-name">France</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇩🇪</span><span class="opt-code">+49</span><span class="opt-name">Germany</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇨🇭</span><span class="opt-code">+41</span><span class="opt-name">Switzerland</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇸🇬</span><span class="opt-code">+65</span><span class="opt-name">Singapore</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇭🇰</span><span class="opt-code">+852</span><span class="opt-name">Hong Kong</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇯🇵</span><span class="opt-code">+81</span><span class="opt-name">Japan</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇦🇺</span><span class="opt-code">+61</span><span class="opt-name">Australia</span></div>
    </div>
  </div>
  <input type="tel" class="phone-number-input" value="(212) 555 0147">
</div>
```
Behaviour: `phone` (see §5).

### Checkbox / radio / toggle

The app has NO native-style checkbox or radio: the only checkbox-like control is the WFH day box (38px), selection tiles replace radios, filter pills replace segmented controls, and the only switch is the dark-mode switch. A generic checkbox/radio is provided as EXTENDED (badged).

#### WFH day check (hidden native checkbox + 38px box)
Source: employees.html L756-765, L4831-4837; dark L1525-1529

Native checkbox is `display:none`; the box reacts through `input:checked ~ .wfh-day-box` (forced twin `.is-checked`). `.pending-day` = checked but not yet approved (amber). Hover = border `--color-border-hover-check`. Click the live ones.

```html
<!-- unchecked -->
<label class="wfh-day-check">
  <input type="checkbox">
  <div class="wfh-day-label">Mon</div>
  <div class="wfh-day-box"><span class="icon icon-check icon-14"></span></div>
</label>

<!-- hover -->
<label class="wfh-day-check is-hover">
  <input type="checkbox">
  <div class="wfh-day-label">Tue</div>
  <div class="wfh-day-box"><span class="icon icon-check icon-14"></span></div>
</label>

<!-- checked (approved) -->
<label class="wfh-day-check">
  <input type="checkbox" checked>
  <div class="wfh-day-label">Wed</div>
  <div class="wfh-day-box"><span class="icon icon-check icon-14"></span></div>
</label>

<!-- checked + .pending-day -->
<label class="wfh-day-check pending-day">
  <input type="checkbox" checked>
  <div class="wfh-day-label">Thu</div>
  <div class="wfh-day-box"><span class="icon icon-check icon-14"></span></div>
</label>

<!-- row as in the card (.wfh-prefs-days gap 8) -->
<div class="wfh-prefs-days"><label class="wfh-day-check">
  <input type="checkbox">
  <div class="wfh-day-label">Mon</div>
  <div class="wfh-day-box"><span class="icon icon-check icon-14"></span></div>
</label>
<label class="wfh-day-check">
  <input type="checkbox">
  <div class="wfh-day-label">Tue</div>
  <div class="wfh-day-box"><span class="icon icon-check icon-14"></span></div>
</label>
<label class="wfh-day-check">
  <input type="checkbox" checked>
  <div class="wfh-day-label">Wed</div>
  <div class="wfh-day-box"><span class="icon icon-check icon-14"></span></div>
</label>
<label class="wfh-day-check">
  <input type="checkbox">
  <div class="wfh-day-label">Thu</div>
  <div class="wfh-day-box"><span class="icon icon-check icon-14"></span></div>
</label>
<label class="wfh-day-check">
  <input type="checkbox">
  <div class="wfh-day-label">Fri</div>
  <div class="wfh-day-box"><span class="icon icon-check icon-14"></span></div>
</label></div>
```

#### Request-type tiles (radio-like cards)
Source: employees.html L814-821, L3206-3215; dark L1393-1397, L1690-1692

2px border, brand + `--color-tint-selected-08` when selected. The 36px icon tile takes `data-reqtype` (`timeoff` blue / `location` violet) in light; in dark both become the neutral tile (bug #22 decision: CSS map instead of inline colours).

```html
<!-- default / selected (live: click) -->
<div class="req-type-grid">
  <div class="req-type-btn selected"><div class="req-type-icon-lg" data-reqtype="timeoff"><span class="icon icon-request-annual icon-18"></span></div><div class="req-type-label">Time Off</div><div class="req-type-desc">Annual leave, sick days</div></div>
  <div class="req-type-btn"><div class="req-type-icon-lg" data-reqtype="location"><span class="icon icon-request-location icon-18"></span></div><div class="req-type-label">Another Location</div><div class="req-type-desc">Work from another office</div></div>
</div>

<!-- hover (.is-hover) -->
<div class="req-type-grid" style="margin-bottom:0">
  <div class="req-type-btn is-hover"><div class="req-type-icon-lg" data-reqtype="location"><span class="icon icon-request-location icon-18"></span></div><div class="req-type-label">Another Location</div><div class="req-type-desc">Work from another office</div></div>
</div>
```
Behaviour: `rows` (see §5).

#### Switch (the dark-mode switch)
Source: employees.html L1039-1042; dark L1069

32×18, radius 8 (`--radius-switch`, the only non-4 radius besides circles), thumb 14px circle with `--shadow-thumb`, travel 14px, .18s. Off-track in dark = `rgba(255,255,255,.07)` is a DERIVED value (bug #6, flagged for the owner). The live one flips the whole page (top bar).

```html
<!-- off -->
<div class="dm-switch"><div class="dm-thumb"></div></div>

<!-- on (.on) -->
<div class="dm-switch on"><div class="dm-thumb"></div></div>

<!-- as in the profile menu row -->
<div class="profile-drop-item" style="padding:9px 16px"><span class="profile-drop-item-icon"><span class="icon icon-moon icon-14"></span></span><span class="profile-drop-item-label">Dark mode</span><div class="dm-switch"><div class="dm-thumb"></div></div></div>
```
Behaviour: `theme` (see §5).

#### Checkbox and radio  `EXTENDED`
Source: EXTENDED (derived from the .wfh-day-box recipe, employees.html L760-765): 1.5px control border, brand when checked, hover = border-hover-strong; 18px = switch height; check mark = assets/check.svg - app has no generic checkbox/radio

```html
<!-- checkbox -->
<label class="checkbox"><input type="checkbox"><span class="checkbox-box"></span> Notify manager</label>

<!-- checkbox checked -->
<label class="checkbox"><input type="checkbox" checked><span class="checkbox-box"></span> Notify manager</label>

<!-- radio -->
<label class="radio"><input type="radio" name="r1"><span class="radio-box"></span> Office</label>

<!-- radio checked -->
<label class="radio"><input type="radio" name="r1" checked><span class="radio-box"></span> Remote</label>
```

### Badges & pills

All badge shapes use radius 4 (no pill radius). Department and request-type colours are injected by inline JS in the app; here they are CSS maps keyed by `data-dept` / `data-reqtype` that flip in dark (bug #22). Several status palettes coexist on purpose (employee / HR requests / my requests / timesheet / WFH); they are kept as separate token families.

#### Employee / pool status and record badges
Source: employees.html L123-125, L140, L451-452, L470-472; dark L1136-1137, L1154-1157, L1165

```html
<!-- .status-pill.status-active 12/600 -->
<span class="status-pill status-active">Active</span>

<!-- .status-pill.status-inactive -->
<span class="status-pill status-inactive">Inactive</span>

<!-- .active-badge (pool member) -->
<span class="active-badge">Active</span>

<!-- .inactive-badge -->
<span class="inactive-badge">Inactive</span>

<!-- .inline-badge.active 11/600 -->
<span class="inline-badge active">Active</span>

<!-- .inline-badge.inactive -->
<span class="inline-badge inactive">Inactive</span>

<!-- .record-badge 12/600 ls .02em -->
<span class="record-badge">EMP-001</span>
```

#### HR request, my-request, WFH and timesheet status
Source: employees.html L261-265, L805-808, L752-754, L307-308, L782-784, L39, L702; dark L1355-1358, L1416-1418, L1522-1523, L1272-1273, L1541-1542, L1078, L1635

"New" is `#d4eee9 / #005268` (NOT `rgba(0,82,104,.08)` as the old docs claimed; that value is the active chip/tab fill). `.rv-status` is 12/600 with 4px 10px padding (26px high); `.req-status` and `.wfh-prefs-badge` are 11/700 with 3px 10px.

```html
<!-- .rv-status.new -->
<span class="rv-status new">● New</span>

<!-- .rv-status.pending -->
<span class="rv-status pending">Pending</span>

<!-- .rv-status.approved -->
<span class="rv-status approved">Approved</span>

<!-- .rv-status.denied -->
<span class="rv-status denied">Denied</span>

<!-- .req-status.pending -->
<span class="req-status pending">Pending</span>

<!-- .req-status.approved -->
<span class="req-status approved">Approved</span>

<!-- .req-status.denied -->
<span class="req-status denied">Denied</span>

<!-- .wfh-prefs-badge.pending -->
<span class="wfh-prefs-badge pending">Pending Approval</span>

<!-- .wfh-prefs-badge.approved -->
<span class="wfh-prefs-badge approved">Approved</span>

<!-- .tt-badge-pending -->
<span class="tt-badge-pending">Pending Approval</span>

<!-- .tt-badge-approved -->
<span class="tt-badge-approved">Approved</span>

<!-- .wfh-status-pill.wfh 10/700 uppercase -->
<span class="wfh-status-pill wfh">WFH</span>

<!-- .wfh-status-pill.office -->
<span class="wfh-status-pill office">Office</span>

<!-- .app-drop-item-badge -->
<span class="app-drop-item-badge">Current</span>

<!-- .dir-you -->
<span class="dir-you">You</span>
```

#### Department badges (data-dept map)
Source: employees.html L122, L141, L3508 (DC map), L3618, L3681-3682, L1139-1152

`.dept-badge` 12/500, `.drawer-dept-badge` 12/600, both 3px 10px. Unknown department = grey fallback. Inactive employee = grey in BOTH themes via `data-inactive="true"` (bug #2: the app's dark `[data-dept]` rules out-rank its grey rule, so inactive rows keep the department colour).

```html
<!-- Equities -->
<span class="dept-badge" data-dept="Equities">Equities</span>

<!-- Fixed Income -->
<span class="dept-badge" data-dept="Fixed Income">Fixed Income</span>

<!-- Technology -->
<span class="dept-badge" data-dept="Technology">Technology</span>

<!-- Operations -->
<span class="dept-badge" data-dept="Operations">Operations</span>

<!-- Compliance -->
<span class="dept-badge" data-dept="Compliance">Compliance</span>

<!-- Finance -->
<span class="dept-badge" data-dept="Finance">Finance</span>

<!-- unknown (no data-dept) -->
<span class="dept-badge">Legal</span>

<!-- inactive employee (data-inactive) -->
<span class="dept-badge" data-dept="Equities" data-inactive="true">Equities</span>

<!-- .drawer-dept-badge (600) -->
<span class="drawer-dept-badge" data-dept="Technology">Technology</span>

<!-- .drawer-dept-badge inactive -->
<span class="drawer-dept-badge" data-dept="Fixed Income" data-inactive="true">Fixed Income</span>
```

#### Pool badges (holders / members counts)
Source: employees.html L433-437, L4411-4412; dark L1224-1226

Count text is black in light, inherited in dark (bug #21: the app writes an inline `color:#000` span; one CSS rule here). `.grey` = opacity .45 for a count of 0. Members cyan (#c1ecf0 / dark #22d3ee) differs from the Fixed Income department colour.

```html
<!-- .pool-badge.holders -->
<div class="pool-badge holders"><span class="icon icon-pool-holder icon-20"></span><span>2</span></div>

<!-- .pool-badge.members -->
<div class="pool-badge members"><span class="icon icon-pool-members icon-22x20"></span><span>7</span></div>

<!-- .holders.grey (0) -->
<div class="pool-badge holders grey"><span class="icon icon-pool-holder icon-20"></span><span>0</span></div>

<!-- .members.grey (0) -->
<div class="pool-badge members grey"><span class="icon icon-pool-members icon-22x20"></span><span>0</span></div>
```

#### Request-type icon tiles (data-reqtype map)
Source: employees.html L253, L804, L3814-3819 (REQ_TYPE_META), L4933 (REQ_BG), L1364-1368, L1694-1701

TWO different palettes are kept: HR requests (`.rv-type-icon`, 30px: annual #2563eb, sick #dc2626, wfh #059669, location #3b5fc0) and My Profile (`.req-icon-sm`, 28px: timeoff #1d4ed8, sick #da4d43, location #7c3aed). The light "any other type" tile is DERIVED (#f5f5f8 / #7c8dac; the app only has a dark rule, flagged).

```html
<!-- .rv-type-icon annual -->
<div class="rv-type-icon" data-reqtype="annual"><span class="icon icon-request-annual icon-16"></span></div>

<!-- sick -->
<div class="rv-type-icon" data-reqtype="sick"><span class="icon icon-request-sick icon-16"></span></div>

<!-- wfh -->
<div class="rv-type-icon" data-reqtype="wfh"><span class="icon icon-request-wfh icon-16"></span></div>

<!-- location -->
<div class="rv-type-icon" data-reqtype="location"><span class="icon icon-request-location icon-16"></span></div>

<!-- default (derived) -->
<div class="rv-type-icon"><span class="icon icon-request-annual icon-16"></span></div>

<!-- .req-icon-sm timeoff -->
<div class="req-icon-sm" data-reqtype="timeoff"><span class="icon icon-request-annual icon-18"></span></div>

<!-- sick -->
<div class="req-icon-sm" data-reqtype="sick"><span class="icon icon-request-sick icon-18"></span></div>

<!-- location -->
<div class="req-icon-sm" data-reqtype="location"><span class="icon icon-request-location icon-18"></span></div>

<!-- default -->
<div class="req-icon-sm"><span class="icon icon-request-annual icon-18"></span></div>
```

#### WFH stat tiles, legend dots, reminder tiles
Source: employees.html L744-747, L768, L1712-1719, L2192-2197, L1709-1710

```html
<!-- .wfh-stat-icon.wfh-stat-icon-wfh 40 -->
<div class="wfh-stat-icon wfh-stat-icon-wfh"><span class="icon icon-home icon-20"></span></div>

<!-- .wfh-stat-icon-office -->
<div class="wfh-stat-icon wfh-stat-icon-office"><span class="icon icon-briefcase-sm icon-20"></span></div>

<!-- .wfh-legend-dot.wfh / .office 10px r2 -->
<div style="display:flex;gap:8px"><div class="wfh-legend-dot wfh"></div><div class="wfh-legend-dot office"></div></div>

<!-- .reminder-icon[data-kind=birthday] 38 -->
<div class="reminder-icon" data-kind="birthday">🎂</div>

<!-- anniversary -->
<div class="reminder-icon" data-kind="anniversary">🎉</div>
```

(colour maps: §6)

### Tabs

Three tab patterns + the sortable header: underline detail tabs (2px, 44px bar), My Profile tabs (2.5px underline, 600 → 700 when active) and filter pills (32px, brand tint when active). Switching is a plain `.active` toggle with NO animation.

#### Underline tabs (.detail-tabs)
Source: employees.html L155-160, L3660-3665; dark L1174-1177

Bar = surface + 1px divider, padding `0 0 0 4px`; tab 12/16 padding, 14/500 secondary, active 600 brand with a 2px underline that overlaps the bar border (margin-bottom -1). Live demo: click the tabs.

```html
<!-- live (click) -->
<div>
  <div class="detail-tabs">
    <button class="detail-tab active" data-tab="overview">Overview</button>
    <button class="detail-tab" data-tab="jobs">Jobs</button>
    <button class="detail-tab" data-tab="records">Records</button>
    <button class="detail-tab" data-tab="timesheet">Timesheet</button>
  </div>
  <div class="tab-panel active" data-panel="overview" style="padding:16px">Overview panel</div>
  <div class="tab-panel" data-panel="jobs" style="padding:16px">Jobs panel</div>
  <div class="tab-panel" data-panel="records" style="padding:16px">Records panel</div>
  <div class="tab-panel" data-panel="timesheet" style="padding:16px">Timesheet panel</div>
</div>

<!-- forced: hover on "Jobs" -->
<div class="detail-tabs"><button class="detail-tab is-active">Overview</button><button class="detail-tab is-hover">Jobs</button><button class="detail-tab">Records</button><button class="detail-tab">Timesheet</button></div>
```
Behaviour: `tabs` (see §5).

#### Profile tabs (.content-tabs / .profile-tab)
Source: employees.html L531, L534-536; dark L1565-1568

Bar padding `0 24px`; tab 13/18 padding, 14/600, underline `--border-width-tab-underline` (2.5px); only `color` transitions (.15s).

```html
<!-- live (click) -->
<div class="content-tabs">
  <div class="profile-tab active" data-tab="myinfo">Information</div>
  <div class="profile-tab" data-tab="wfh">WFH Schedule</div>
  <div class="profile-tab" data-tab="timeoff">Time Off</div>
  <div class="profile-tab" data-tab="timesheet">Timesheets</div>
</div>

<!-- forced hover on "Time Off" -->
<div class="content-tabs"><div class="profile-tab is-active">Information</div><div class="profile-tab">WFH Schedule</div><div class="profile-tab is-hover">Time Off</div><div class="profile-tab">Timesheets</div></div>
```
Behaviour: `tabs` (see §5).

#### Filter pills (.req-filter-tabs / .req-tab)
Source: employees.html L793-795, L2790-2795, L4927-4932; dark L1410-1411

Used instead of radios for All / Pending / Approved / Denied (JS `filterRequests`). 32px, 12/500; active = `--color-tint-chip` fill + brand border/text.

```html
<!-- live (click) -->
<div class="req-filter-tabs"><button class="req-tab active">All</button><button class="req-tab">Pending</button><button class="req-tab">Approved</button><button class="req-tab">Denied</button></div>
```
Behaviour: `tabs` (see §5).

#### Sortable table header (sort icons)
Source: employees.html L104-108, L3601-3609; dark L1120-1122

Header hover and `.sorted` = brand. The 12px icon is one of three assets (`sort-unsorted` opacity .4, `sort-asc`, `sort-desc`); `.sorted .sort-icon` opacity 1.

```html
<!-- live: click a header -->
<table class="emp-table" style="height:120px"><thead><tr>
  <th class="sorted" data-col="name" style="width:180px">Employee <span class="sort-icon"><span class="icon icon-sort-asc icon-12"></span></span></th>
  <th data-col="dept" style="width:160px">Department <span class="sort-icon"><span class="icon icon-sort-unsorted icon-12"></span></span></th>
  <th class="is-hover" data-col="role">Job Title <span class="sort-icon"><span class="icon icon-sort-unsorted icon-12"></span></span></th>
</tr></thead><tbody></tbody></table>
```
Behaviour: `sort` (see §5).

### Modals & backdrops

Five dialog families coexist (they are re-skinned by specificity, not duplicated): **A** `.modal-overlay > .modal` (740px, fade + slide 10px .18s), **B** `.modal-backdrop > .modal` (560px, no animation, circular close, brand 18/800 title), **C** `.tt-fillall-overlay` / `.tt-confirm-overlay` (420 / 340px), **D** success popup, **E** quick card. Each demo sits in a framed box (a transformed container, so the "fixed" overlay fills the frame). Dark scrims: A .55, B .60, D rgba(0,5,20,.65); the C scrim and the A/C/B shadows have no dark rule in the app (kept, flagged).

#### Family A: .modal-overlay > .modal (New Request)
Source: employees.html L389-417, L3199-3223; dark L1193-1210

Panel 740 (inline 440 / 620 / 680 in the pool modals), max-height 82vh, header 20/24, body 24, footer space-between 16/24. Overlay is ALWAYS display:flex; `.open` sets opacity 1 + pointer-events (fade .18s) and the panel slides translateY(10px) → 0. Close: Esc, backdrop click, close button, Cancel. Dark: panel #26292e, border .08.

```html
<!-- open (.is-open) -->
<div class="modal-overlay is-open">
  <div class="modal">
    <div class="modal-header">
      <span class="modal-title">New Request</span>
      <button class="modal-close" data-close><span class="icon icon-close icon-16"></span></button>
    </div>
    <div class="modal-body">
      <div class="req-type-grid">
        <div class="req-type-btn selected"><div class="req-type-icon-lg" data-reqtype="timeoff"><span class="icon icon-request-annual icon-18"></span></div><div class="req-type-label">Time Off</div><div class="req-type-desc">Annual leave, sick days</div></div>
        <div class="req-type-btn"><div class="req-type-icon-lg" data-reqtype="location"><span class="icon icon-request-location icon-18"></span></div><div class="req-type-label">Another Location</div><div class="req-type-desc">Work from another office</div></div>
      </div>
      <div class="modal-row">
        <div class="modal-field"><label class="modal-label">From</label><input class="modal-input" type="date"></div>
        <div class="modal-field"><label class="modal-label">To</label><input class="modal-input" type="date"></div>
      </div>
      <div class="modal-field" style="margin-top:12px"><label class="modal-label">Type</label><select class="modal-select"><option>Annual Leave</option><option>Sick Leave</option></select></div>
      <div class="modal-field" style="margin-top:12px"><label class="modal-label">Notes (optional)</label><textarea class="modal-textarea" placeholder="Anything the team should know…"></textarea></div>
    </div>
    <div class="modal-footer">
      <button class="btn-outline" data-close>Cancel</button>
      <button class="btn-primary">Submit Request</button>
    </div>
  </div>
</div>

<!-- live: click "Open" (animated) -->
<button class="btn-primary" data-open="#my-modal">Open modal</button>
<div class="modal-overlay" id="my-modal">
  <div class="modal">… same markup as above (header / body / footer) …</div>
</div>
```
Behaviour: `modal` (see §5).

#### Family A: small form modal (Add Pool Holder, 440)
Source: employees.html L5586-5611

Footer: `.btn-cancel` left, `.btn-cta` right (space-between).

```html
<!-- open -->
<div class="modal-overlay is-open">
  <div class="modal" style="width:440px">
    <div class="modal-header"><span class="modal-title">Add Pool Holder</span><button class="modal-close"><span class="icon icon-close icon-16"></span></button></div>
    <div class="modal-body">
      <div class="modal-section">
        <div class="modal-grid" style="grid-template-columns:1fr 1fr">
          <div class="modal-field"><label class="modal-label">Full Name</label><input class="modal-input" type="text" placeholder="e.g. Avi Cohen"></div>
          <div class="modal-field"><label class="modal-label">Job ID</label><input class="modal-input" type="number" placeholder="Auto"></div>
        </div>
      </div>
    </div>
    <div class="modal-footer"><button class="btn-cancel">Cancel</button><button class="btn-cta">Add Holder</button></div>
  </div>
</div>
```

#### Family B: .modal-backdrop > .modal (Fill workdays, Calculate time off, Timesheet entry)
Source: employees.html L967-968, L980-985, L3252-3344; dark L1370-1376

Same `.modal` element, re-skinned: width 560 default (inline 460 / 620), no border, `--shadow-dialog`, overflow hidden, NO animation (`display:none` → `.open{display:flex}`), header 22/24/18, title 18/800 brand, close = 32px circle (text glyph × / ✕). Entry-modal footer shows the `.btn-save` becoming `.ready`.

```html
<!-- Fill All Workdays (460) -->
<div class="modal-backdrop is-open">
  <div class="modal" style="width:460px">
    <div class="modal-header">
      <div class="modal-title">Fill All Workdays</div>
      <div class="modal-close">✕</div>
    </div>
    <div style="padding:24px">
      <p class="fill-modal-note">Sets Mon–Fri for the entire pay period (Aug 26 – Sep 25) to your default hours. You can adjust individual days after.</p>
      <div class="fill-modal-row">
        <div class="fill-modal-field"><div class="fill-modal-label">Start Time</div><input class="fill-modal-input" type="time" value="09:00"></div>
        <div class="fill-modal-field"><div class="fill-modal-label">End Time</div><input class="fill-modal-input" type="time" value="18:00"></div>
      </div>
      <div class="fill-modal-footer">
        <button class="ts-btn">Cancel</button>
        <button class="ts-btn-primary">Apply to All Workdays</button>
      </div>
    </div>
  </div>
</div>

<!-- Calculate Time Off (620) -->
<div class="modal-backdrop is-open">
  <div class="modal" style="width:620px">
    <div class="modal-header"><div class="modal-title">Calculate Time Off</div><button class="modal-close">×</button></div>
    <div class="calc-modal-user"><div class="calc-user-avatar">RS</div><div class="calc-user-name">Rachel Sternberg</div></div>
    <div class="calc-fields">
      <div style="flex:1"><div class="req-label" style="margin-bottom:7px">Time Off Category</div>
        <div class="cust-select" style="width:100%"><div class="cust-select__trigger" style="width:100%;box-sizing:border-box"><span class="cust-select__value">Annual Leave</span><span class="icon icon-chevron-down-md icon-16 cust-select__chevron"></span></div><div class="cust-select__panel"></div></div></div>
      <div style="flex:1"><div class="req-label" style="margin-bottom:7px">As of Date <span class="req-star">*</span></div><input type="date" class="req-date-input" style="width:100%" value="2026-09-15"></div>
    </div>
    <div class="calc-result-wrap">
      <div class="calc-result-box"><div class="calc-result-number">7.25 days</div></div>
      <button class="calc-accrual-btn">▶ Accrual Details</button>
    </div>
    <div class="calc-footer"><button class="btn-close-calc">Close</button></div>
  </div>
</div>

<!-- Add Timesheet Entry (560) -->
<div class="modal-backdrop is-open">
  <div class="modal">
    <div class="modal-header"><div class="modal-title">Add Timesheet Entry</div><button class="modal-close">×</button></div>
    <div class="modal-day"><div class="modal-day-icon"><span class="icon icon-calendar-compact icon-20"></span></div><div class="modal-day-label">Wednesday, Aug 26</div></div>
    <div class="modal-entries">
      <div class="entry-row">
        <div class="time-group"><div class="time-label">Start Time</div><div class="time-inputs"><input class="time-input" type="text" value="09:00" maxlength="5"><select class="ampm-select"><option selected>AM</option><option>PM</option></select></div></div>
        <div class="time-group"><div class="time-label">End Time</div><div class="time-inputs"><input class="time-input" type="text" value="01:00" maxlength="5"><select class="ampm-select"><option>AM</option><option selected>PM</option></select></div></div>
      </div>
      <div class="entry-row">
        <div class="time-group"><div class="time-label">Start Time</div><div class="time-inputs"><input class="time-input" type="text" value="02:00" maxlength="5"><select class="ampm-select"><option>AM</option><option selected>PM</option></select></div></div>
        <div class="time-group"><div class="time-label">End Time</div><div class="time-inputs"><input class="time-input" type="text" value="06:00" maxlength="5"><select class="ampm-select"><option>AM</option><option selected>PM</option></select></div></div>
        <div class="entry-remove">×</div>
      </div>
    </div>
    <div style="padding:0 24px 16px"><div class="modal-add-entry">⊕ Add Entry</div></div>
    <div class="modal-footer">
      <div class="modal-day-total">Day Total: <strong>8h 00m</strong></div>
      <div class="modal-actions"><button class="btn-cancel">Cancel</button><button class="btn-save ready">Save</button></div>
    </div>
  </div>
</div>
```

#### Family C: fill-all and approve-confirm dialogs
Source: employees.html L360-363, L364-374, L375-382, L5559-5583, L5709-5718; dark L1318-1334

z-index 1000 (above A/B/D). Fade .15s + slide 8px. Scrim .28 in BOTH themes (no dark rule - flagged). Escape does NOT close these (app behaviour kept); backdrop click does. Fields in the fill-all box use `.tt-fillall-input` (44px / 16px).

```html
<!-- .tt-fillall-overlay (420) -->
<div class="tt-fillall-overlay is-open">
  <div class="tt-fillall-box">
    <div class="tt-fillall-header"><span class="tt-fillall-title">Fill All Workdays</span><button class="tt-fillall-close"><span class="icon icon-close-bold icon-14"></span></button></div>
    <div class="tt-fillall-body">
      <p class="tt-fillall-desc">Fill every missing workday in Aug 26 – Sep 25 for Alex Smith with the hours below.</p>
      <div class="tt-fillall-fields">
        <div><div class="tt-fillall-lbl">Start Time</div><input class="tt-fillall-input" type="time" value="09:00"></div>
        <div><div class="tt-fillall-lbl">End Time</div><input class="tt-fillall-input" type="time" value="18:00"></div>
      </div>
    </div>
    <div class="tt-fillall-footer"><button class="btn-cancel">Cancel</button><button class="btn-cta">Apply to All Workdays</button></div>
  </div>
</div>

<!-- .tt-confirm-overlay (340) -->
<div class="tt-confirm-overlay is-open">
  <div class="tt-confirm-box">
    <div class="tt-confirm-title">Approve Timesheet?</div>
    <div class="tt-confirm-body">You're about to approve the timesheet for <span class="tt-confirm-emp">Alex Smith</span>. This action cannot be undone.</div>
    <div class="tt-confirm-actions"><button class="tt-confirm-cancel">Cancel</button><button class="tt-confirm-ok">Approve</button></div>
  </div>
</div>
```

#### Family A: pool modals (New Pool with inline-add lists, Add Pool Member)
Source: employees.html L458-472 (inline-add), L5614-5705 (modals); dark L1238-1243

The pool modals only change the width inline (440 / 620 / 680) and add the `.inline-add-row` + `.inline-list` pattern: a search input + `.btn-inline-add` (aligned with margin-top:22px) above a list of `.inline-list-item` rows (fill-item background, name 13/600 + meta 12 secondary, 24px remove button, optional `.inline-badge`); empty = `.inline-list-empty`. The employee search is the combobox in Select / combobox.

```html
<!-- New Pool (680) -->
<div class="modal-overlay is-open">
  <div class="modal" style="width:680px">
    <div class="modal-header"><span class="modal-title">New Pool</span><button class="modal-close"><span class="icon icon-close icon-16"></span></button></div>
    <div class="modal-body">
      <div class="modal-section">
        <div class="modal-section-title">Pool Identity</div>
        <div class="modal-grid" style="grid-template-columns:1fr">
          <div class="modal-field"><label class="modal-label">Pool Name</label><input class="modal-input" type="text" placeholder="e.g. Global Equities Pool"></div>
        </div>
      </div>
      <div class="modal-divider"></div>
      <div class="modal-section">
        <div class="modal-section-title">Organisation</div>
        <div class="modal-grid" style="grid-template-columns:1fr 1fr">
          <div class="modal-field"><label class="modal-label">Company</label><select class="modal-select"><option value="">Select…</option><option>Makor</option><option>Makor Capital</option></select></div>
          <div class="modal-field"><label class="modal-label">Team</label><select class="modal-select"><option value="">Select…</option><option>Makor Equity</option><option>Makor FX</option></select></div>
          <div class="modal-field" style="grid-column:1/-1"><label class="modal-label">Desk</label><select class="modal-select"><option value="">Select…</option><option>Makor Securities</option></select></div>
        </div>
      </div>
      <div class="modal-divider"></div>
      <div class="modal-section">
        <div class="modal-section-title">Pool Holders</div>
        <div class="inline-add-row">
          <div class="modal-field"><label class="modal-label">Search Employee</label><input class="modal-input" type="text" placeholder="Type to search…" autocomplete="off"></div>
          <button class="btn-inline-add" style="margin-top:22px">+ Add</button>
        </div>
        <div class="inline-list">
          <div class="inline-list-item"><div class="inline-list-item-info"><div class="inline-list-item-name">Benjamin Koskas</div><div class="inline-list-item-meta">Job ID: 457</div></div><button class="inline-list-item-remove"><span class="icon icon-close-bold icon-12"></span></button></div>
          <div class="inline-list-item"><div class="inline-list-item-info"><div class="inline-list-item-name">Emily Roe</div><div class="inline-list-item-meta">Job ID: 712</div></div><button class="inline-list-item-remove"><span class="icon icon-close-bold icon-12"></span></button></div>
        </div>
      </div>
      <div class="modal-divider"></div>
      <div class="modal-section">
        <div class="modal-section-title">Pool Members</div>
        <div class="inline-add-row">
          <div class="modal-field"><label class="modal-label">Search Employee</label><input class="modal-input" type="text" placeholder="Type to search…" autocomplete="off"></div>
          <button class="btn-inline-add" style="margin-top:22px">+ Add</button>
        </div>
        <div class="inline-list">
          <div class="inline-list-item"><div class="inline-list-item-info"><div class="inline-list-item-name">Yoni Blum <span class="inline-badge active">Active</span></div><div class="inline-list-item-meta">Analyst</div></div><button class="inline-list-item-remove"><span class="icon icon-close-bold icon-12"></span></button></div>
          <div class="inline-list-item"><div class="inline-list-item-info"><div class="inline-list-item-name">Clara Ohayon <span class="inline-badge inactive">Inactive</span></div><div class="inline-list-item-meta">Trader</div></div><button class="inline-list-item-remove"><span class="icon icon-close-bold icon-12"></span></button></div>
        </div>
      </div>
    </div>
    <div class="modal-footer"><button class="btn-cancel">Cancel</button><button class="btn-cta">Create Pool</button></div>
  </div>
</div>

<!-- Add Pool Member (620) -->
<div class="modal-overlay is-open">
  <div class="modal" style="width:620px">
    <div class="modal-header"><span class="modal-title">Add Pool Member</span><button class="modal-close"><span class="icon icon-close icon-16"></span></button></div>
    <div class="modal-body">
      <div class="modal-section">
        <div class="modal-section-title">Identity</div>
        <div class="modal-grid" style="grid-template-columns:1fr 1fr">
          <div class="modal-field"><label class="modal-label">Full Name</label><input class="modal-input" type="text" placeholder="e.g. Avi Cohen"></div>
          <div class="modal-field"><label class="modal-label">Email</label><input class="modal-input" type="email" placeholder="name@makor.com"></div>
          <div class="modal-field"><label class="modal-label">Status</label><select class="modal-select"><option>Active</option><option>Inactive</option></select></div>
        </div>
      </div>
      <div class="modal-divider"></div>
      <div class="modal-section">
        <div class="modal-section-title">Role</div>
        <div class="modal-grid" style="grid-template-columns:1fr 1fr">
          <div class="modal-field"><label class="modal-label">Position</label><select class="modal-select"><option>Select…</option><option>Director</option></select></div>
          <div class="modal-field"><label class="modal-label">Hire Date</label><input class="modal-input" type="date"></div>
        </div>
      </div>
    </div>
    <div class="modal-footer"><button class="btn-cancel">Cancel</button><button class="btn-cta">Add Member</button></div>
  </div>
</div>
```

### Toast & popups

One toast element: fixed bottom 32, centred, translateY(16px) → 0 + opacity .2s, visible for **2800 ms**, text only (no icon, no shadow, no variants). Dark: #26292e with a 1px translucent border. The success popup (family D) uses the same 2800 ms timer.

#### Toast
Source: employees.html L825-827, L5010-5014; dark L1677

```html
<!-- .toast.is-visible (static) -->
<div class="toast is-visible">Changes saved</div>

<!-- live: click the button (the real toast appears at the bottom of the viewport for 2800 ms) -->
<button class="btn-outline" onclick="showToast('Personal details saved')">Show toast</button>
<div class="toast"></div>
```
Behaviour: `toast` (see §5).

#### Success popup (family D)
Source: employees.html L969-979, L3226-3234, L5048-5053; dark L1457-1461

Backdrop rgba(20,30,48,.35) + `backdrop-filter: blur(6px)` (dark rgba(0,5,20,.65)), fade .25s; card 360, padding 40/36/32, 64px success icon circle, title 20/800 brand, sub 14 secondary. NO buttons (the app's `.req-success-actions / -btn-new / -btn-back` are dead CSS). Auto-closes after 2800 ms.

```html
<!-- open (.is-open) -->
<div class="req-success-backdrop is-open">
  <div class="req-success-card">
    <div class="req-success-icon"><span class="icon icon-check icon-28"></span></div>
    <p class="req-success-title">Request Submitted</p>
    <p class="req-success-sub">Your request has been sent for approval. You'll be notified once it's reviewed.</p>
  </div>
</div>

<!-- live: click (auto-closes in 2800 ms) -->
<button class="btn-outline" style="margin:16px" onclick="showSuccess('Request Submitted','Your WFH preference has been sent to your manager for approval.')">Show success popup</button>
<div class="req-success-backdrop" id="demo-success">
  <div class="req-success-card">
    <div class="req-success-icon"><span class="icon icon-check icon-28"></span></div>
    <p class="req-success-title">Request Submitted</p>
    <p class="req-success-sub">Your request has been sent for approval. You'll be notified once it's reviewed.</p>
  </div>
</div>
```
Behaviour: `toast` (see §5).

### Dropdowns & quick card

Nav menus open by `display` toggle (no animation) at fixed offsets: `top:82px`, `left:40px` (apps) / `right:40px` (profile), z-index 9000. The employee quick card (family E) opens when a directory ROW is clicked (not on hover).

#### App launcher menu (.app-drop)
Source: employees.html L29-40, L1762-1779; dark L1071-1078

226px; section label 10/700 uppercase .10em; item 13/500, hover `--color-menu-hover` (not for current / no-access); current = tint + brand/600 + "Current" badge; no-access = opacity .42 + not-allowed. Shown with its offset reset to 10/10 inside the frame (real offset 82 / 40 in the screens).

```html
<!-- open -->
<div class="app-drop is-open" style="top:10px;left:10px">
  <div class="app-drop-section">Platform Apps</div>
  <div class="app-drop-item app-drop-item-current"><span class="app-drop-item-name">HR</span><span class="app-drop-item-badge">Current</span></div>
  <div class="app-drop-item"><span class="app-drop-item-name">My Profile</span></div>
  <div class="app-drop-item is-hover"><span class="app-drop-item-name">Compliance</span></div>
  <a class="app-drop-item" href="#"><span class="app-drop-item-name">Derivatives</span></a>
  <a class="app-drop-item" href="#"><span class="app-drop-item-name">Cash Equity</span></a>
  <a class="app-drop-item" href="#"><span class="app-drop-item-name">Ticketing</span></a>
  <a class="app-drop-item" href="#"><span class="app-drop-item-name">IT</span></a>
  <div class="app-drop-divider"></div>
  <div class="app-drop-section">No Access</div>
  <div class="app-drop-item app-drop-item-noaccess"><span class="app-drop-item-name">P&amp;L</span></div>
  <div class="app-drop-item app-drop-item-noaccess"><span class="app-drop-item-name">Accounting</span></div>
  <div class="app-drop-item app-drop-item-noaccess"><span class="app-drop-item-name">Research</span></div>
</div>
```

#### Profile menu (.profile-drop)
Source: employees.html L1028-1042, L1747-1757; dark L1061-1069

220px; header name 13/700 + email 11 secondary; the whole row toggles dark mode. Trigger = `.nav-avatar`.

```html
<!-- open -->
<div class="profile-drop is-open" style="top:10px;right:10px">
  <div class="profile-drop-header"><div class="profile-drop-name">Polina Rozenblit</div><div class="profile-drop-email">prozenblit@makor-capital.com</div></div>
  <div class="profile-drop-item"><span class="profile-drop-item-icon"><span class="icon icon-moon icon-14"></span></span><span class="profile-drop-item-label">Dark mode</span><div class="dm-switch"><div class="dm-thumb"></div></div></div>
</div>
```

#### Employee quick card (family E)
Source: employees.html L710-726, L3237-3249, L4743-4770; dark L1642-1654

520px, padding 28, backdrop rgba(0,0,0,.45) (dark .60), z-index 300, shadow `--shadow-dialog`. The backdrop is visible by default in CSS (the app hides it with an inline `display:none`); the copy button swaps to a green check for 1800 ms. Row icons: `pin-qcard`, `mail`, `phone`, `reports-to`.

```html
<!-- open -->
<div class="emp-qcard-backdrop">
  <div class="emp-qcard">
    <div class="emp-qcard-close">✕</div>
    <div class="emp-qcard-head">
      <div class="emp-qcard-avatar">LK</div>
      <div><div class="emp-qcard-name">Laura Kim</div><div class="emp-qcard-sub">FX Options Trader | Makor</div></div>
    </div>
    <div class="emp-qcard-rows">
      <div class="emp-qcard-row"><span class="icon icon-pin-qcard icon-16 emp-qcard-icon"></span><span>London — 4:12 PM local time</span></div>
      <div class="emp-qcard-email-row">
        <div class="emp-qcard-email-main"><span class="icon icon-mail icon-16 emp-qcard-icon"></span><span class="emp-qcard-email-text">lkim@makor.com</span></div>
        <div class="emp-qcard-email-actions"><button class="eqa-btn" title="Copy email"><span class="icon icon-copy icon-18"></span></button><a class="eqa-btn" href="mailto:lkim@makor.com" title="Open in Outlook"><span class="icon icon-mail-envelope icon-18"></span></a></div>
      </div>
      <div class="emp-qcard-email-row">
        <div class="emp-qcard-email-main"><span class="icon icon-phone icon-16 emp-qcard-icon"></span><span>+44 20 7946 0123</span></div>
        <div class="emp-qcard-email-actions"><button class="eqa-btn" title="Copy phone"><span class="icon icon-copy icon-18"></span></button></div>
      </div>
      <div class="emp-qcard-row"><span class="icon icon-reports-to icon-16 emp-qcard-icon"></span><span>Birthday · Jan 7</span></div>
    </div>
  </div>
</div>
```

### Avatars

Initials only, transparent with a 1px ring (`--color-border-avatar-ring`: black .30 / white .28). There is NO avatar colour palette and no photos. Inactive = grey ring + text. The calculator avatar is a 44px SQUARE (radius 4).

#### Avatar sizes (real class names)
Source: employees.html L117-118, L133-134, L250, L304, L318, L444, L510, L524, L699, L716, L28; dark L1131-1132, L1160-1161, L1553, L1560, L1633, L1646

```html
<!-- .manager-avatar 32 / 13px -->
<div class="manager-avatar">LK</div>

<!-- .tt-avatar 34 / 13px -->
<div class="tt-avatar">AS</div>

<!-- .emp-avatar / .rv-avatar 36 / 14px -->
<div class="emp-avatar">AS</div>

<!-- .holder-avatar 38 / 14px -->
<div class="holder-avatar">BK</div>

<!-- .nav-avatar 42 (fill + border) -->
<div class="nav-avatar">PR</div>

<!-- .dir-avatar 44 / 15px -->
<div class="dir-avatar">RS</div>

<!-- .tt-det-avatar 44 / 16px -->
<div class="tt-det-avatar">AS</div>

<!-- .drawer-avatar 48 / 18px -->
<div class="drawer-avatar">AS</div>

<!-- .sp-avatar 52 / 18px -->
<div class="sp-avatar">RS</div>

<!-- .emp-qcard-avatar 64 / 21px -->
<div class="emp-qcard-avatar">LK</div>

<!-- .emp-avatar.inactive -->
<div class="emp-avatar inactive">ER</div>

<!-- .drawer-avatar.inactive -->
<div class="drawer-avatar inactive">ER</div>

<!-- .calc-user-avatar (4px square) -->
<div class="calc-user-avatar">RS</div>
```

#### DS-only size utilities (.avatar + .avatar-NN)  `EXTENDED`
Source: EXTENDED naming only (sizes and font sizes copied from the real classes above) - DS convenience classes; sizes/fonts are the app's

```html
<!-- .avatar.avatar-32 -->
<div class="avatar avatar-32">AS</div>

<!-- .avatar.avatar-34 -->
<div class="avatar avatar-34">AS</div>

<!-- .avatar.avatar-36 -->
<div class="avatar avatar-36">AS</div>

<!-- .avatar.avatar-38 -->
<div class="avatar avatar-38">AS</div>

<!-- .avatar.avatar-44 -->
<div class="avatar avatar-44">AS</div>

<!-- .avatar.avatar-48 -->
<div class="avatar avatar-48">AS</div>

<!-- .avatar.avatar-52 -->
<div class="avatar avatar-52">AS</div>

<!-- .avatar.avatar-64 -->
<div class="avatar avatar-64">AS</div>
```

### EXTENDED states (not in the app)

Everything on this page is **not in the source app** (the app has 0 `:focus-visible` rules, no error / disabled-input / tooltip / spinner / skeleton / empty-state / alert / tag / pagination / breadcrumb / upload components, and 0 `@media`). Each was derived ONLY from existing tokens and recipes (no new hue, font, radius or breakpoint) and carries a visible EXTENDED badge. The full index (20 items, with derivations) is at the end of this section and in `components.md`.

#### Keyboard focus ring (:focus-visible)  `EXTENDED`
Source: EXTENDED components.css (PART 1 EXTENDED): brand colour, --border-width-thick (2px), offset 2, radius untouched. Tab through the live buttons to see the real rule; the "forced" ones use an inline style that equals the rule. - app has 0 :focus-visible rules and 22 outline:none

Applies to `button, a[href], [role=button], [role=tab], [tabindex]`. Text inputs keep their border + ring (`outline:none`). Rows (`.emp-table tbody tr`, `.rv-table tbody tr`, `.tt-data-row`, `.pool-row`, `.dir-row`, `.cc-missing`, `.wfh-cell`, `.req-tab`) get the same ring INSET (offset -2px) because they sit in overflow-hidden cards.

```html
<!-- live: press Tab -->
<button class="btn-primary">Save</button>

<!-- live: press Tab -->
<button class="detail-tab" style="border:1px solid var(--color-border-control)">Overview</button>

<!-- forced focus-visible (button) -->
<button class="btn-primary">Save</button><!-- focus ring comes from :focus-visible -->

<!-- forced focus-visible (outline button) -->
<button class="btn-outline">Cancel</button>

<!-- forced inset ring (row) -->
<div class="pool-row" tabindex="0">…</div>
```

#### Invalid state and error text  `EXTENDED`
Source: EXTENDED: border = --color-danger-strong (the app's own inline #dc2626); .field-error = .field-note recipe in --color-danger-text. Composite controls: .cust-select.is-invalid, .phone-input-wrap.is-invalid; focus keeps the danger colour. - app uses native alert() (10 places) and one inline #dc2626 border

```html
<!-- .modal-input.is-invalid + .field-error -->
<div class="modal-field"><label class="modal-label">Work Email</label><input class="modal-input is-invalid" type="email" value="alex@"><div class="field-error">Enter a valid email address.</div></div>

<!-- .field-value.is-invalid (My Info) -->
<div class="field"><div class="field-label">Last Name</div><input class="field-value is-invalid" placeholder="—"><div class="field-error">Last name is required.</div></div>

<!-- .search-input.is-invalid -->
<div class="search-wrap"><span class="search-icon"><span class="icon icon-search icon-16"></span></span><input class="search-input is-invalid" value="??"></div>

<!-- .cust-select.is-invalid -->
<div class="modal-field"><label class="modal-label">Department <span class="req-star">*</span></label><div class="cust-select is-invalid">
  <div class="cust-select__trigger"><span class="cust-select__value">Select…</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
    <div class="cust-select__option selected" data-val="" data-label="Select…">Select…</div>
    <div class="cust-select__option" data-val="Equities">Equities</div>
    <div class="cust-select__option" data-val="Finance">Finance</div>
  </div>
</div><div class="field-error">Choose a department.</div></div>

<!-- .phone-input-wrap.is-invalid -->
<div class="phone-input-wrap is-invalid" style="width:300px">
  <div class="phone-code-wrap">
    <div class="phone-code-btn"><span class="phone-flag">🇺🇸</span><span class="phone-code-val">+1</span><span class="icon icon-chevron-down-sm icon-12 phone-drop-arrow"></span></div>
    <div class="phone-code-drop">
      <div class="phone-code-opt selected"><span class="opt-flag">🇺🇸</span><span class="opt-code">+1</span><span class="opt-name">United States</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇬🇧</span><span class="opt-code">+44</span><span class="opt-name">United Kingdom</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇮🇱</span><span class="opt-code">+972</span><span class="opt-name">Israel</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇦🇪</span><span class="opt-code">+971</span><span class="opt-name">UAE</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇫🇷</span><span class="opt-code">+33</span><span class="opt-name">France</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇩🇪</span><span class="opt-code">+49</span><span class="opt-name">Germany</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇨🇭</span><span class="opt-code">+41</span><span class="opt-name">Switzerland</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇸🇬</span><span class="opt-code">+65</span><span class="opt-name">Singapore</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇭🇰</span><span class="opt-code">+852</span><span class="opt-name">Hong Kong</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇯🇵</span><span class="opt-code">+81</span><span class="opt-name">Japan</span></div>
      <div class="phone-code-opt"><span class="opt-flag">🇦🇺</span><span class="opt-code">+61</span><span class="opt-name">Australia</span></div>
    </div>
  </div>
  <input type="tel" class="phone-number-input" value="12">
</div>

<!-- .datepicker-input.is-invalid -->
<div class="datepicker-wrap"><div class="datepicker-input-wrap"><input class="datepicker-input is-invalid" placeholder="dd/mm/yyyy" readonly><span class="datepicker-icon"><span class="icon icon-calendar icon-16"></span></span></div></div>

<!-- .req-textarea-to.is-invalid -->
<textarea class="req-textarea-to is-invalid" placeholder="Note"></textarea>

<!-- .time-input.is-invalid (fill bar) -->
<input class="tt-fill-input is-invalid" value="25:99" type="text">
```

#### Disabled text inputs and selects  `EXTENDED`
Source: EXTENDED: .readonly-field palette (fill-subtle, secondary text) + not-allowed + no pointer events - app only has .readonly-field and disabled buttons

```html
<!-- .modal-input:disabled -->
<div class="modal-field"><label class="modal-label">Company</label><input class="modal-input" value="Makor Capital" disabled></div>

<!-- .field-value:disabled -->
<div class="field"><div class="field-label">Employee ID</div><input class="field-value" value="EMP-0012" disabled></div>

<!-- .search-input:disabled -->
<div class="search-wrap"><span class="search-icon"><span class="icon icon-search icon-16"></span></span><input class="search-input" placeholder="Search" disabled></div>

<!-- .cust-select__trigger.is-disabled -->
<div class="cust-select"><div class="cust-select__trigger is-disabled has-value"><span class="cust-select__value">Equities</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div></div>
```

#### Tooltip  `EXTENDED`
Source: EXTENDED: the toast surface (toast-bg / toast-text) at 12/500, padding 6/10, fade --duration-base - app uses native title="" only (8 places)

Live: hover the buttons. The static one is `.tooltip.is-visible`.

```html
<!-- static -->
<div class="tooltip is-visible" style="top:6px;left:8px">Copy email</div><button class="eqa-btn" style="position:absolute;top:44px;left:8px" title="Copy email"><span class="icon icon-copy icon-18"></span></button>

<!-- live: hover -->
<button class="eqa-btn" data-tip="Open in Outlook" style="position:absolute;top:44px;left:8px"><span class="icon icon-mail-envelope icon-18"></span></button>
```
Behaviour: `tooltip` (see §5).

#### Spinner and skeleton  `EXTENDED`
Source: EXTENDED: spinner = control border + brand arc, 1.4s (--duration-flash) linear; skeleton = fill-neutral, opacity pulse to --opacity-dimmed - app has no loading UI (the only keyframe is dir-flash)

```html
<!-- .spinner 16 -->
<span class="spinner"></span>

<!-- .skeleton lines -->
<div style="display:flex;flex-direction:column;gap:8px"><div class="skeleton" style="width:70%"></div><div class="skeleton"></div><div class="skeleton" style="width:45%"></div></div>

<!-- skeleton rows in a table -->
<table class="emp-table" style="width:520px;height:160px"><tbody>
  <tr class="skeleton-row"><td style="width:40%"><div class="skeleton"></div></td><td><div class="skeleton"></div></td><td><div class="skeleton"></div></td></tr>
  <tr class="skeleton-row"><td style="width:40%"><div class="skeleton"></div></td><td><div class="skeleton"></div></td><td><div class="skeleton"></div></td></tr>
</tbody></table>
```

#### Empty, loading and error panels; employee-table "no results" row  `EXTENDED`
Source: EXTENDED: .rv-empty recipe (flex-centred, 60px 24px, tertiary 14px); loading = .spinner; error = --color-danger-text. .emp-empty = .rv-empty message in a full-width cell. - app renders plain tertiary text or NOTHING (0 rows = empty tbody)

```html
<!-- .state-empty -->
<div class="state-empty"><span class="icon icon-user icon-40"></span><span>No employees match your filters</span></div>

<!-- .state-loading -->
<div class="state-loading"><span class="spinner"></span><span>Loading employees…</span></div>

<!-- .state-error -->
<div class="state-error"><span>Could not load employees.</span><button class="btn-outline">Retry</button></div>

<!-- tr.emp-empty -->
<table class="emp-table" style="width:520px"><tbody><tr class="emp-empty"><td colspan="6">No employees match your filters</td></tr></tbody></table>
```

#### Empty states that DO exist in the app (source-defined, for comparison)
Source: employees.html L128, L277, L457, L230, L324, L803-804, L4010-4013

This demo is NOT extended: these are the app's plain tertiary-text empty states (no title / body / action): `.detail-empty` (40px icon, 14px), `.rv-empty` (60/24), `.req-empty`, `.pool-empty-state`, `.timesheet-ph` (min-height 200), `.tt-detail-empty`, `.inline-list-empty`. The EXTENDED panels above reuse the `.rv-empty` recipe.

```html
<!-- .detail-empty -->
<div class="detail-empty" style="height:100%"><span class="icon icon-user icon-40"></span><span>Select an employee to view their profile</span></div>

<!-- .rv-empty -->
<div class="rv-empty">No requests found</div>

<!-- .req-empty -->
<div class="req-empty">No requests found</div>

<!-- .pool-empty-state -->
<div class="pool-empty-state" style="min-height:0"><span class="icon icon-briefcase icon-40"></span>Select a pool to view details</div>

<!-- .timesheet-ph -->
<div class="timesheet-ph"><span class="icon icon-calendar-light icon-32"></span><span class="type-secondary" style="font-weight:600">Timesheet data pending</span><span class="type-muted" style="font-size:12px;text-align:center">Aggregated hours and attendance data<br>will appear here once connected.</span></div>

<!-- .tt-detail-empty -->
<div class="tt-detail-empty" style="padding-bottom:0;height:100%"><span class="icon icon-calendar-dots icon-36"></span><span>Select a timesheet to review</span></div>

<!-- .inline-list-empty -->
<div class="inline-list"><div class="inline-list-empty">No holders added yet</div></div>
```

#### Tag (removable chip)  `EXTENDED`
Source: EXTENDED: record-badge fill + secondary text; remove = inline-list-item-remove recipe - app has only the dead .dept-chip

```html
<!-- .tag + .tag-remove -->
<span class="tag">Equities <button class="tag-remove"><span class="icon icon-close-bold icon-12"></span></button></span>

<!-- tag list -->
<div style="display:flex;gap:6px"><span class="tag">New York <button class="tag-remove"><span class="icon icon-close-bold icon-12"></span></button></span><span class="tag">London <button class="tag-remove"><span class="icon icon-close-bold icon-12"></span></button></span></div>
```

#### Alert / inline banner  `EXTENDED`
Source: EXTENDED: status bg/text pairs (success / danger / warning / info), 14/500, padding 12/16, radius 4 - app uses window.alert() and the toast only

```html
<!-- .alert.alert-success -->
<div class="alert alert-success">Timesheet saved.</div>

<!-- .alert-danger -->
<div class="alert alert-danger">Could not save the entry.</div>

<!-- .alert-warning -->
<div class="alert alert-warning">3 days are still missing.</div>

<!-- .alert-info -->
<div class="alert alert-info">Managed by IT — contact your admin to change it.</div>
```

#### Progress bar  `EXTENDED`
Source: EXTENDED: mini-bar fill/empty tokens, 4px high (mini-bar min-height), 2px radius; value via --progress - app has only the mini bar chart

```html
<!-- --progress:35% -->
<div class="progress" style="--progress:35%"><div class="progress-bar"></div></div>

<!-- --progress:80% -->
<div class="progress" style="--progress:80%"><div class="progress-bar"></div></div>
```

#### Pagination and breadcrumb  `EXTENDED`
Source: EXTENDED: pagination = .wfh-nav-btn / .req-tab recipe (32px, control border, brand tint when active); breadcrumb = .back-link colours/size, separator tertiary - app has no pager and only a text back-link

```html
<!-- .pagination -->
<div class="pagination"><button class="page-btn"><span class="icon icon-chevron-left-bold icon-14"></span></button><button class="page-btn active">1</button><button class="page-btn">2</button><button class="page-btn">3</button><button class="page-btn"><span class="icon icon-chevron-right-bold icon-14"></span></button></div>

<!-- .breadcrumb -->
<div class="breadcrumb"><a href="#">My Profile</a><span class="breadcrumb-sep">›</span><a href="#">Time Off</a><span class="breadcrumb-sep">›</span><span class="breadcrumb-current">Request Time Off</span></div>
```

#### File drop zone  `EXTENDED`
Source: EXTENDED: input border (1.5px dashed) + brand tint on hover/drag - app has no upload

```html
<!-- .file-drop -->
<div class="file-drop"><span>Drop a file here or click to browse</span><span class="type-muted">PDF, up to 10 MB</span></div>

<!-- hover / drag (.is-drag) -->
<div class="file-drop is-drag"><span>Drop to upload</span></div>
```

#### DS utilities: .theme-light / .theme-dark, .scroll-thin, .is-scroll-x, .top-nav.is-static, forced-state classes  `EXTENDED`
Source: EXTENDED: .theme-light/.theme-dark re-assert a theme on a container (do not nest light inside body.dark); .scroll-thin* = the app's per-container 6px thumb; .is-scroll-x = opt-in overflow-x:auto; .top-nav.is-static = the nav as a normal block for documentation pages - DS-only helpers (no new visual values)

Forced state classes available for demos: `.is-hover .is-focus .is-open .is-selected .is-active .is-checked .is-on .is-visible .is-disabled .is-inactive .is-invalid`. The app's own state classes (`.open .show .visible .active .selected .has-value .on .ready .sorted`) are kept.

```html
<!-- .theme-light panel -->
<div class="theme-light" style="padding:12px;border-radius:4px;border:1px solid var(--color-border-card)"><button class="btn-primary">Primary</button></div>

<!-- .theme-dark panel -->
<div class="theme-dark" style="padding:12px;border-radius:4px;border:1px solid var(--color-border-card)"><button class="btn-primary">Primary</button></div>

<!-- .scroll-thin (hover the scrollbar) -->
<div class="scroll-thin" style="width:180px;height:90px;overflow-y:auto;border:1px solid var(--color-border-card);padding:8px"><div>Row 1</div><div>Row 2</div><div>Row 3</div><div>Row 4</div><div>Row 5</div><div>Row 6</div><div>Row 7</div><div>Row 8</div></div>

<!-- .is-scroll-x -->
<div class="is-scroll-x" style="width:180px;border:1px solid var(--color-border-card)"><div style="width:420px;padding:8px">Wide content that scrolls horizontally</div></div>
```

(EXTENDED index: §7)

## 4. Screens / patterns (condensed markup; the full 1920×1080 frames are in showcase.html → "Copy HTML")

Each screen is re-assembled from the documented classes at 1920×1080 (scaled to fit; the real layout size is shown above each frame). The page theme toggle in the top bar switches the frames between light and dark. Frame adaptations ONLY: `100vh` replaced by 1080px (`.page` 1006px, `.content-card-wrap` 972px, `.left-col` max 974px) and fixed overlays positioned inside the (transformed) frame. Data is the app's sample data.

#### Top nav + menus
Source: employees.html L16-40, L1028-1042, L1724-1779; dark L1054-1078

Fixed 74px bar (padding 0 40, 1px divider); left: apps icon (24, opacity .7 → 1) + 32px logo tile + Lexend Exa lock-up (wordmark 18, "HR" 14 secondary), gap 80, links gap 32 (active = 600 + 2px underline, offset 3); right: 42px avatar. The bar is `position:fixed` in the app; the showcase uses `.top-nav.is-static` EXTENDED (same box, `position:relative`). Click the apps icon / avatar for the live menus.

```html
<!-- HR nav + app menu + profile menu open -->
<nav class="top-nav is-static">
  <div class="nav-left">
    <div class="nav-logo-wrap">
      <svg class="nav-apps-icon" width="24" height="24" viewBox="0 0 24 24"><circle cx="3" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="3" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="3" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/></svg>
      <img src="assets/logo-mark.svg" width="32" height="32" alt="">
      <div class="nav-logo-text"><span class="nav-wordmark">MAKOR X.AI</span><span class="nav-sub">HR</span></div>
    </div>
    <div class="nav-links">
      <a class="nav-link active" href="#">Employee</a>
      <a class="nav-link" href="#">Pool</a>
      <a class="nav-link" href="#">Time Tracking</a>
      <a class="nav-link" href="#">Requests</a>
    </div>
  </div>
  <div class="nav-right">
    <div class="nav-avatar">PR</div>
    <div class="profile-drop is-open">
<!-- … name/email + dark-mode row, see Top nav -->
</div>
  </div>
</nav>
<div class="app-drop is-open">
<!-- … 13 items, see Top nav -->
</div>
```
Behaviour: `dropdowns`, `theme` (see §5).

#### Employee list
Source: employees.html L42-125, L1781-1855; dark L1080-1157

**Layout constraint (documented, not a design):** the page has side gutters of 210px and a 54 / 46 split; the table is `table-layout:fixed` with five fixed columns (140 + 200 + 110 + 130 + 100 = 680px), so the Employee column = `0.54×(W−422)−715` px: 0 at ≤1440, 94 at 1920, 245 at 2200, 440 at 2560. Use the width switch above the frame; ≥2200px is comfortable. Row 3 shows the hover state, row 5 the inactive row (grey in both themes).

```html
<!-- no selection (empty detail pane) -->
<nav class="top-nav is-static">
  <div class="nav-left">
    <div class="nav-logo-wrap">
      <svg class="nav-apps-icon" width="24" height="24" viewBox="0 0 24 24"><circle cx="3" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="3" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="3" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/></svg>
      <img src="assets/logo-mark.svg" width="32" height="32" alt="">
      <div class="nav-logo-text"><span class="nav-wordmark">MAKOR X.AI</span><span class="nav-sub">HR</span></div>
    </div>
    <div class="nav-links">
      <a class="nav-link active" href="#">Employee</a>
      <a class="nav-link" href="#">Pool</a>
      <a class="nav-link" href="#">Time Tracking</a>
      <a class="nav-link" href="#">Requests</a>
    </div>
  </div>
  <div class="nav-right">
    <div class="nav-avatar">PR</div>
    <div class="profile-drop">
<!-- … name/email + dark-mode row, see Top nav -->
</div>
  </div>
</nav>
<div class="app-drop">
<!-- … 13 items, see Top nav -->
</div>
<div class="page">
<div class="page-center">
<div class="split-left">
  <div class="left-header">
    <div class="left-title-row">
      <div class="left-title">Employees (41)</div>
      <div class="btn-row"><button class="btn-primary"><span class="icon icon-plus icon-14"></span> New Employee</button></div>
    </div>
    <div class="toolbar">
      <div class="search-wrap"><span class="search-icon"><span class="icon icon-search icon-16"></span></span><input class="search-input" type="text" placeholder="Search"></div>
      <div class="cust-select cs-dept">
  <div class="cust-select__trigger"><span class="cust-select__value">Department</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
<div class="cust-select__option selected" data-val="" data-label="Department">All Departments</div>
<div class="cust-select__option" data-val="Equities">Equities</div>
<!-- … 5 more -->
</div>
</div>
      <div class="cust-select cs-office">
  <div class="cust-select__trigger"><span class="cust-select__value">Office</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
<div class="cust-select__option selected" data-val="" data-label="Office">All Offices</div>
<div class="cust-select__option" data-val="New York">New York</div>
<!-- … 2 more -->
</div>
</div>
      <div class="cust-select cs-status">
  <div class="cust-select__trigger"><span class="cust-select__value">Status</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
<div class="cust-select__option selected" data-val="" data-label="Status">All</div>
<div class="cust-select__option" data-val="Active">Active</div>
<!-- … 1 more -->
</div>
</div>
      <div class="toolbar-spacer"></div>
      <div class="groupby-wrap"><div class="cust-select cs-group">
  <div class="cust-select__trigger"><span class="cust-select__value">Group by</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
<div class="cust-select__option selected" data-val="" data-label="Group by">None</div>
<div class="cust-select__option" data-val="Department">Department</div>
<!-- … 2 more -->
</div>
</div></div>
    </div>
  </div>
  <div class="emp-list-scroll">
    <div class="emp-table-wrap">
      <table class="emp-table">
      <thead><tr>
        <th data-col="name" class="sorted">Employee <span class="sort-icon"><span class="icon icon-sort-asc icon-12"></span></span></th>
        <th data-col="dept" style="width:140px">Department <span class="sort-icon"><span class="icon icon-sort-unsorted icon-12"></span></span></th>
        <th data-col="role" style="width:200px">Job Title <span class="sort-icon"><span class="icon icon-sort-unsorted icon-12"></span></span></th>
        <th data-col="office" style="width:110px">Office <span class="sort-icon"><span class="icon icon-sort-unsorted icon-12"></span></span></th>
        <th data-col="hire" style="width:130px">Hire Date <span class="sort-icon"><span class="icon icon-sort-unsorted icon-12"></span></span></th>
        <th data-col="status" style="width:100px">Status <span class="sort-icon"><span class="icon icon-sort-unsorted icon-12"></span></span></th>
      </tr></thead>
      <tbody>
<tr class=""><td><div class="emp-cell"><div class="emp-avatar">AS</div><div><div class="emp-name">Alex Smith</div><div class="emp-email">as.smith@makor.com</div></div></div></td><td style="width:140px"><span class="dept-badge" data-dept="Equities">Equities</span></td><td style="width:200px">Senior Equity Trader</td><td style="width:110px">New York</td><td style="width:130px">Jan 15, 2020</td><td style="width:100px"><span class="status-pill status-active">Active</span></td></tr>
<tr class=""><td><div class="emp-cell"><div class="emp-avatar">BK</div><div><div class="emp-name">Beth Kline</div><div class="emp-email">bk.kline@makor.com</div></div></div></td><td style="width:140px"><span class="dept-badge" data-dept="Equities">Equities</span></td><td style="width:200px">Portfolio Manager</td><td style="width:110px">London</td><td style="width:130px">Mar 3, 2018</td><td style="width:100px"><span class="status-pill status-active">Active</span></td></tr>
<!-- … 12 more rows -->
</tbody></table>
    </div>
  </div>
</div>
<div class="split-right">
  <div class="detail-empty"><span class="icon icon-user icon-40"></span><span>Select an employee to view their profile</span></div>
</div>
</div>
</div>
```
Behaviour: `select`, `sort`, `theme` (see §5).

#### Employee list: grouped, sorted, active row
Source: employees.html L95-96, L109-114, L3627-3640; dark L1133-1134

`.group-header-row` (one `<td colspan="6">`, count in a 60%-opacity span): bg = table-head, 12/700 uppercase secondary-group colour, padding 10/16/8; hover does nothing and keeps `cursor:default` (bug #29). Active row: bg + `--shadow-row-marker` (3px inset brand) on the first cell; clicking the active row deselects.

```html
<!-- Group by Department -->
<div class="page">
<div class="page-center">
<div class="split-left">
  <div class="left-header">
    <div class="left-title-row">
      <div class="left-title">Employees (41)</div>
      <div class="btn-row"><button class="btn-primary"><span class="icon icon-plus icon-14"></span> New Employee</button></div>
    </div>
    <div class="toolbar">
      <div class="search-wrap"><span class="search-icon"><span class="icon icon-search icon-16"></span></span><input class="search-input" type="text" placeholder="Search"></div>
      <div class="cust-select cs-dept">
  <div class="cust-select__trigger"><span class="cust-select__value">Department</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
<div class="cust-select__option selected" data-val="" data-label="Department">All Departments</div>
<div class="cust-select__option" data-val="Equities">Equities</div>
<!-- … 5 more -->
</div>
</div>
      <div class="cust-select cs-office">
  <div class="cust-select__trigger"><span class="cust-select__value">Office</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
<div class="cust-select__option selected" data-val="" data-label="Office">All Offices</div>
<div class="cust-select__option" data-val="New York">New York</div>
<!-- … 2 more -->
</div>
</div>
      <div class="cust-select cs-status">
  <div class="cust-select__trigger"><span class="cust-select__value">Status</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
<div class="cust-select__option selected" data-val="" data-label="Status">All</div>
<div class="cust-select__option" data-val="Active">Active</div>
<!-- … 1 more -->
</div>
</div>
      <div class="toolbar-spacer"></div>
      <div class="groupby-wrap"><div class="cust-select cs-group">
  <div class="cust-select__trigger"><span class="cust-select__value">Group by</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
<div class="cust-select__option selected" data-val="" data-label="Group by">None</div>
<div class="cust-select__option" data-val="Department">Department</div>
<!-- … 2 more -->
</div>
</div></div>
    </div>
  </div>
  <div class="emp-list-scroll">
    <div class="emp-table-wrap">
      <table class="emp-table">
      <thead><tr>
        <th data-col="name" class="sorted">Employee <span class="sort-icon"><span class="icon icon-sort-asc icon-12"></span></span></th>
        <th data-col="dept" style="width:140px">Department <span class="sort-icon"><span class="icon icon-sort-unsorted icon-12"></span></span></th>
        <th data-col="role" style="width:200px">Job Title <span class="sort-icon"><span class="icon icon-sort-unsorted icon-12"></span></span></th>
        <th data-col="office" style="width:110px">Office <span class="sort-icon"><span class="icon icon-sort-unsorted icon-12"></span></span></th>
        <th data-col="hire" style="width:130px">Hire Date <span class="sort-icon"><span class="icon icon-sort-unsorted icon-12"></span></span></th>
        <th data-col="status" style="width:100px">Status <span class="sort-icon"><span class="icon icon-sort-unsorted icon-12"></span></span></th>
      </tr></thead>
      <tbody>
<tr class="group-header-row"><td colspan="6">Compliance <span style="opacity:0.6;font-weight:500">(2)</span></td></tr>
<tr class=""><td><div class="emp-cell"><div class="emp-avatar">DW</div><div><div class="emp-name">Dana Weiss</div><div class="emp-email">dw.weiss@makor.com</div></div></div></td><td style="width:140px"><span class="dept-badge" data-dept="Compliance">Compliance</span></td><td style="width:200px">Compliance Officer</td><td style="width:110px">New York</td><td style="width:130px">Feb 11, 2017</td><td style="width:100px"><span class="status-pill status-active">Active</span></td></tr>
<!-- … 9 more rows -->
</tbody></table>
    </div>
  </div>
</div>
<div class="split-right">
  <div class="detail-empty"><span class="icon icon-user icon-40"></span><span>Select an employee to view their profile</span></div>
</div>
</div>
</div>
```

#### Employee detail
Source: employees.html L127-230, L1858-2032; dark L1158-1191

Right pane (46%): header (48px avatar, name 18/800, status pill absolutely at top/right 20), stat bar (4 × flex, 10px labels), underline tabs, then section bands (full-width strips, the app's replacement for cards: dark = #111214) + 3-column fields grids (`.fc` label 12/500 tertiary above value 14/500). The wrapper div carries inline `display:flex;flex-direction:column;flex:1;min-height:0;overflow:hidden` exactly as in the app. Live: click the tabs.

```html
<!-- Alex Smith selected (Overview) -->
<nav class="top-nav is-static">
  <div class="nav-left">
    <div class="nav-logo-wrap">
      <svg class="nav-apps-icon" width="24" height="24" viewBox="0 0 24 24"><circle cx="3" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="3" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="3" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/></svg>
      <img src="assets/logo-mark.svg" width="32" height="32" alt="">
      <div class="nav-logo-text"><span class="nav-wordmark">MAKOR X.AI</span><span class="nav-sub">HR</span></div>
    </div>
    <div class="nav-links">
      <a class="nav-link active" href="#">Employee</a>
      <a class="nav-link" href="#">Pool</a>
      <a class="nav-link" href="#">Time Tracking</a>
      <a class="nav-link" href="#">Requests</a>
    </div>
  </div>
  <div class="nav-right">
    <div class="nav-avatar">PR</div>
    <div class="profile-drop">
<!-- … name/email + dark-mode row, see Top nav -->
</div>
  </div>
</nav>
<div class="app-drop">
<!-- … 13 items, see Top nav -->
</div>
<div class="page">
<div class="page-center">
<div class="split-left">
  <div class="left-header">
    <div class="left-title-row">
      <div class="left-title">Employees (41)</div>
      <div class="btn-row"><button class="btn-primary"><span class="icon icon-plus icon-14"></span> New Employee</button></div>
    </div>
    <div class="toolbar">
      <div class="search-wrap"><span class="search-icon"><span class="icon icon-search icon-16"></span></span><input class="search-input" type="text" placeholder="Search"></div>
      <div class="cust-select cs-dept">
  <div class="cust-select__trigger"><span class="cust-select__value">Department</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
<div class="cust-select__option selected" data-val="" data-label="Department">All Departments</div>
<div class="cust-select__option" data-val="Equities">Equities</div>
<!-- … 5 more -->
</div>
</div>
      <div class="cust-select cs-office">
  <div class="cust-select__trigger"><span class="cust-select__value">Office</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
<div class="cust-select__option selected" data-val="" data-label="Office">All Offices</div>
<div class="cust-select__option" data-val="New York">New York</div>
<!-- … 2 more -->
</div>
</div>
      <div class="cust-select cs-status">
  <div class="cust-select__trigger"><span class="cust-select__value">Status</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
<div class="cust-select__option selected" data-val="" data-label="Status">All</div>
<div class="cust-select__option" data-val="Active">Active</div>
<!-- … 1 more -->
</div>
</div>
      <div class="toolbar-spacer"></div>
      <div class="groupby-wrap"><div class="cust-select cs-group">
  <div class="cust-select__trigger"><span class="cust-select__value">Group by</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
<div class="cust-select__option selected" data-val="" data-label="Group by">None</div>
<div class="cust-select__option" data-val="Department">Department</div>
<!-- … 2 more -->
</div>
</div></div>
    </div>
  </div>
  <div class="emp-list-scroll">
    <div class="emp-table-wrap">
      <table class="emp-table">
      <thead><tr>
        <th data-col="name" class="sorted">Employee <span class="sort-icon"><span class="icon icon-sort-asc icon-12"></span></span></th>
        <th data-col="dept" style="width:140px">Department <span class="sort-icon"><span class="icon icon-sort-unsorted icon-12"></span></span></th>
        <th data-col="role" style="width:200px">Job Title <span class="sort-icon"><span class="icon icon-sort-unsorted icon-12"></span></span></th>
        <th data-col="office" style="width:110px">Office <span class="sort-icon"><span class="icon icon-sort-unsorted icon-12"></span></span></th>
        <th data-col="hire" style="width:130px">Hire Date <span class="sort-icon"><span class="icon icon-sort-unsorted icon-12"></span></span></th>
        <th data-col="status" style="width:100px">Status <span class="sort-icon"><span class="icon icon-sort-unsorted icon-12"></span></span></th>
      </tr></thead>
      <tbody>
<tr class="active-row"><td><div class="emp-cell"><div class="emp-avatar">AS</div><div><div class="emp-name">Alex Smith</div><div class="emp-email">as.smith@makor.com</div></div></div></td><td style="width:140px"><span class="dept-badge" data-dept="Equities">Equities</span></td><td style="width:200px">Senior Equity Trader</td><td style="width:110px">New York</td><td style="width:130px">Jan 15, 2020</td><td style="width:100px"><span class="status-pill status-active">Active</span></td></tr>
<tr class=""><td><div class="emp-cell"><div class="emp-avatar">BK</div><div><div class="emp-name">Beth Kline</div><div class="emp-email">bk.kline@makor.com</div></div></div></td><td style="width:140px"><span class="dept-badge" data-dept="Equities">Equities</span></td><td style="width:200px">Portfolio Manager</td><td style="width:110px">London</td><td style="width:130px">Mar 3, 2018</td><td style="width:100px"><span class="status-pill status-active">Active</span></td></tr>
<!-- … 12 more rows -->
</tbody></table>
    </div>
  </div>
</div>
<div class="split-right">
  <div style="display:flex;flex-direction:column;flex:1;min-height:0;overflow:hidden">
    <div class="detail-header">
      <div class="drawer-avatar">AS</div>
      <div class="drawer-header-info">
        <div class="drawer-name-row"><span class="drawer-name">Alex Smith</span></div>
        <span class="status-pill status-active detail-pill">Active</span>
        <div class="drawer-role">Senior Equity Trader · Senior</div>
        <div class="drawer-meta-row">
          <span class="record-badge">EMP-001</span>
          <span class="drawer-dept-badge" data-dept="Equities">Equities</span>
          <span class="drawer-dot">·</span>
          <span class="drawer-email">as.smith@makor.com</span>
          <span class="drawer-dot">·</span>
          <span class="drawer-meta-link">+ Add job</span>
        </div>
      </div>
    </div>
    <div class="detail-stat-bar">
      <div class="detail-stat"><div class="detail-stat-value">Makor Capital</div><div class="detail-stat-label">NY-EQ-01</div></div>
      <div class="detail-stat"><div class="detail-stat-value">Senior</div><div class="detail-stat-label">Senior Equity Trader</div></div>
      <div class="detail-stat"><div class="detail-stat-value">6y 9m</div><div class="detail-stat-label">Since Jan 2020</div></div>
      <div class="detail-stat"><div class="detail-stat-value">Full</div><div class="detail-stat-label">P&amp;L YTD Access</div></div>
    </div>
    <div class="detail-tabs">
      <button class="detail-tab active" data-tab="overview">Overview</button>
      <button class="detail-tab" data-tab="jobs">Jobs</button>
      <button class="detail-tab" data-tab="records">Records</button>
      <button class="detail-tab" data-tab="timesheet">Timesheet</button>
    </div>
    <div class="tab-body">
      <div class="tab-panel active" data-panel="overview">
        <div class="section-band first">Contact</div>
        <div class="fields-grid">
<div class="fc fc-full"><div class="fc-label">Work Email</div><div class="fc-value">as.smith@makor.com</div></div>
<div class="fc fc-full"><div class="fc-label">Private Email</div><div class="fc-value">alex.smith@gmail.com</div></div>
<div class="fc"><div class="fc-label">Mobile Phone</div><div class="fc-value">+1 (917) 555 0114</div></div>
<!-- … 2 more -->
</div>
        <div class="section-band">Organisation</div>
        <div class="fields-grid">
<div class="fc"><div class="fc-label">Company</div><div class="fc-value">Makor Capital</div></div>
<div class="fc"><div class="fc-label">Desk</div><div class="fc-value">NY-EQ-01</div></div>
<div class="fc"><div class="fc-label">Office</div><div class="fc-value">New York</div></div>
<!-- … 4 more -->
</div>
        <div class="section-band">Personal</div>
        <div class="fields-grid">
<div class="fc"><div class="fc-label">Full Name</div><div class="fc-value">Alex Smith</div></div>
<div class="fc"><div class="fc-label">Date of Birth</div><div class="fc-value">Mar 14, 1988</div></div>
<div class="fc"><div class="fc-label">Gender</div><div class="fc-value">Male</div></div>
<!-- … 2 more -->
</div>
        <div class="section-band">Identity</div>
        <div class="fields-grid">
<div class="fc"><div class="fc-label">Employee ID</div><div class="fc-value mono">EMP-001</div></div>
<div class="fc"><div class="fc-label">MakorX ID</div><div class="fc-value mono">MX-30417</div></div>
<div class="fc"><div class="fc-label">GPI Code</div><div class="fc-value mono">G7731</div></div>
<!-- … 1 more -->
</div>
      </div>
      <div class="tab-panel" data-panel="jobs"><div class="section-band first">Current Position</div><div class="fields-grid">
<div class="fc fc-full"><div class="fc-label">Job Title</div><div class="fc-value">Senior Equity Trader</div></div>
<div class="fc"><div class="fc-label">Level</div><div class="fc-value">Senior</div></div>
<div class="fc"><div class="fc-label">Contract</div><div class="fc-value">Permanent</div></div>
<!-- … 1 more -->
</div></div>
      <div class="tab-panel" data-panel="records">
        <div class="section-band first">System Identity</div>
        <div class="fields-grid"><div class="fc"><div class="fc-label">Employee ID</div><div class="fc-value mono">EMP-001</div></div><div class="fc"><div class="fc-label">MakorX ID</div><div class="fc-value mono">MX-30417</div></div><div class="fc"><div class="fc-label">Last Synced</div><div class="fc-value small">Oct 14, 2026 09:12</div></div></div>
        <div class="section-band">Job History</div>
        <div class="records-table-wrap"><table class="records-table"><thead><tr><th>Effective Date</th><th>Job Title</th><th>Department</th><th>Location</th><th>Reports To</th></tr></thead><tbody>
          <tr><td>Jan 15, 2020</td><td>Equity Trader</td><td>Equities</td><td>New York</td><td>Beth Kline</td></tr>
          <tr><td>Jan 1, 2023</td><td>Senior Equity Trader</td><td>Equities</td><td>New York</td><td>Beth Kline</td></tr>
        </tbody></table></div>
        <div class="section-band">Status History</div>
        <div class="fields-grid" style="padding-bottom:20px"><div class="fc fc-full"><div class="fc-label">Jan 15, 2020</div><div class="fc-value">Active <span class="type-muted" style="font-weight:400;font-size:12px">· Hired</span></div></div></div>
      </div>
      <div class="tab-panel" data-panel="timesheet"><div class="timesheet-ph"><span class="icon icon-calendar-light icon-32"></span><span class="type-secondary" style="font-weight:600">Timesheet data pending</span><span class="type-muted" style="font-size:12px;text-align:center">Aggregated hours and attendance data<br>will appear here once connected.</span></div></div>
    </div>
  </div>
</div>
</div>
</div>
```
Behaviour: `tabs`, `sort` (see §5).

#### Employee detail: Records tab (job history table, status history)
Source: employees.html L222-227, L1993-2018; dark L1186-1188

`.records-table`: th 12/**600** (NOT uppercase) tertiary, padding 10/24, background = table-head (dark #111214); td 14px, padding 12/24, separator `--color-border-row-subtle` (#f0f0f2, the only use). Status history is a `.fields-grid` of full-width `.fc`.

```html
<!-- Records tab -->
<nav class="top-nav is-static">
  <div class="nav-left">
    <div class="nav-logo-wrap">
      <svg class="nav-apps-icon" width="24" height="24" viewBox="0 0 24 24"><circle cx="3" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="3" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="3" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/></svg>
      <img src="assets/logo-mark.svg" width="32" height="32" alt="">
      <div class="nav-logo-text"><span class="nav-wordmark">MAKOR X.AI</span><span class="nav-sub">HR</span></div>
    </div>
    <div class="nav-links">
      <a class="nav-link active" href="#">Employee</a>
      <a class="nav-link" href="#">Pool</a>
      <a class="nav-link" href="#">Time Tracking</a>
      <a class="nav-link" href="#">Requests</a>
    </div>
  </div>
  <div class="nav-right">
    <div class="nav-avatar">PR</div>
    <div class="profile-drop">
<!-- … name/email + dark-mode row, see Top nav -->
</div>
  </div>
</nav>
<div class="app-drop">
<!-- … 13 items, see Top nav -->
</div>
<div class="page">
<div class="page-center">
<div class="split-left">
  <div class="left-header">
    <div class="left-title-row">
      <div class="left-title">Employees (41)</div>
      <div class="btn-row"><button class="btn-primary"><span class="icon icon-plus icon-14"></span> New Employee</button></div>
    </div>
    <div class="toolbar">
      <div class="search-wrap"><span class="search-icon"><span class="icon icon-search icon-16"></span></span><input class="search-input" type="text" placeholder="Search"></div>
      <div class="cust-select cs-dept">
  <div class="cust-select__trigger"><span class="cust-select__value">Department</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
<div class="cust-select__option selected" data-val="" data-label="Department">All Departments</div>
<div class="cust-select__option" data-val="Equities">Equities</div>
<!-- … 5 more -->
</div>
</div>
      <div class="cust-select cs-office">
  <div class="cust-select__trigger"><span class="cust-select__value">Office</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
<div class="cust-select__option selected" data-val="" data-label="Office">All Offices</div>
<div class="cust-select__option" data-val="New York">New York</div>
<!-- … 2 more -->
</div>
</div>
      <div class="cust-select cs-status">
  <div class="cust-select__trigger"><span class="cust-select__value">Status</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
<div class="cust-select__option selected" data-val="" data-label="Status">All</div>
<div class="cust-select__option" data-val="Active">Active</div>
<!-- … 1 more -->
</div>
</div>
      <div class="toolbar-spacer"></div>
      <div class="groupby-wrap"><div class="cust-select cs-group">
  <div class="cust-select__trigger"><span class="cust-select__value">Group by</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
<div class="cust-select__option selected" data-val="" data-label="Group by">None</div>
<div class="cust-select__option" data-val="Department">Department</div>
<!-- … 2 more -->
</div>
</div></div>
    </div>
  </div>
  <div class="emp-list-scroll">
    <div class="emp-table-wrap">
      <table class="emp-table">
      <thead><tr>
        <th data-col="name" class="sorted">Employee <span class="sort-icon"><span class="icon icon-sort-asc icon-12"></span></span></th>
        <th data-col="dept" style="width:140px">Department <span class="sort-icon"><span class="icon icon-sort-unsorted icon-12"></span></span></th>
        <th data-col="role" style="width:200px">Job Title <span class="sort-icon"><span class="icon icon-sort-unsorted icon-12"></span></span></th>
        <th data-col="office" style="width:110px">Office <span class="sort-icon"><span class="icon icon-sort-unsorted icon-12"></span></span></th>
        <th data-col="hire" style="width:130px">Hire Date <span class="sort-icon"><span class="icon icon-sort-unsorted icon-12"></span></span></th>
        <th data-col="status" style="width:100px">Status <span class="sort-icon"><span class="icon icon-sort-unsorted icon-12"></span></span></th>
      </tr></thead>
      <tbody>
<tr class="active-row"><td><div class="emp-cell"><div class="emp-avatar">AS</div><div><div class="emp-name">Alex Smith</div><div class="emp-email">as.smith@makor.com</div></div></div></td><td style="width:140px"><span class="dept-badge" data-dept="Equities">Equities</span></td><td style="width:200px">Senior Equity Trader</td><td style="width:110px">New York</td><td style="width:130px">Jan 15, 2020</td><td style="width:100px"><span class="status-pill status-active">Active</span></td></tr>
<tr class=""><td><div class="emp-cell"><div class="emp-avatar">BK</div><div><div class="emp-name">Beth Kline</div><div class="emp-email">bk.kline@makor.com</div></div></div></td><td style="width:140px"><span class="dept-badge" data-dept="Equities">Equities</span></td><td style="width:200px">Portfolio Manager</td><td style="width:110px">London</td><td style="width:130px">Mar 3, 2018</td><td style="width:100px"><span class="status-pill status-active">Active</span></td></tr>
<!-- … 4 more rows -->
</tbody></table>
    </div>
  </div>
</div>
<div class="split-right">
  <div style="display:flex;flex-direction:column;flex:1;min-height:0;overflow:hidden">
    <div class="detail-header">
      <div class="drawer-avatar">AS</div>
      <div class="drawer-header-info">
        <div class="drawer-name-row"><span class="drawer-name">Alex Smith</span></div>
        <span class="status-pill status-active detail-pill">Active</span>
        <div class="drawer-role">Senior Equity Trader · Senior</div>
        <div class="drawer-meta-row">
          <span class="record-badge">EMP-001</span>
          <span class="drawer-dept-badge" data-dept="Equities">Equities</span>
          <span class="drawer-dot">·</span>
          <span class="drawer-email">as.smith@makor.com</span>
          <span class="drawer-dot">·</span>
          <span class="drawer-meta-link">+ Add job</span>
        </div>
      </div>
    </div>
    <div class="detail-stat-bar">
      <div class="detail-stat"><div class="detail-stat-value">Makor Capital</div><div class="detail-stat-label">NY-EQ-01</div></div>
      <div class="detail-stat"><div class="detail-stat-value">Senior</div><div class="detail-stat-label">Senior Equity Trader</div></div>
      <div class="detail-stat"><div class="detail-stat-value">6y 9m</div><div class="detail-stat-label">Since Jan 2020</div></div>
      <div class="detail-stat"><div class="detail-stat-value">Full</div><div class="detail-stat-label">P&amp;L YTD Access</div></div>
    </div>
    <div class="detail-tabs">
      <button class="detail-tab" data-tab="overview">Overview</button>
      <button class="detail-tab" data-tab="jobs">Jobs</button>
      <button class="detail-tab active" data-tab="records">Records</button>
      <button class="detail-tab" data-tab="timesheet">Timesheet</button>
    </div>
    <div class="tab-body">
      <div class="tab-panel" data-panel="overview">
        <div class="section-band first">Contact</div>
        <div class="fields-grid">
<div class="fc fc-full"><div class="fc-label">Work Email</div><div class="fc-value">as.smith@makor.com</div></div>
<div class="fc fc-full"><div class="fc-label">Private Email</div><div class="fc-value">alex.smith@gmail.com</div></div>
<div class="fc"><div class="fc-label">Mobile Phone</div><div class="fc-value">+1 (917) 555 0114</div></div>
<!-- … 2 more -->
</div>
        <div class="section-band">Organisation</div>
        <div class="fields-grid">
<div class="fc"><div class="fc-label">Company</div><div class="fc-value">Makor Capital</div></div>
<div class="fc"><div class="fc-label">Desk</div><div class="fc-value">NY-EQ-01</div></div>
<div class="fc"><div class="fc-label">Office</div><div class="fc-value">New York</div></div>
<!-- … 4 more -->
</div>
        <div class="section-band">Personal</div>
        <div class="fields-grid">
<div class="fc"><div class="fc-label">Full Name</div><div class="fc-value">Alex Smith</div></div>
<div class="fc"><div class="fc-label">Date of Birth</div><div class="fc-value">Mar 14, 1988</div></div>
<div class="fc"><div class="fc-label">Gender</div><div class="fc-value">Male</div></div>
<!-- … 2 more -->
</div>
        <div class="section-band">Identity</div>
        <div class="fields-grid">
<div class="fc"><div class="fc-label">Employee ID</div><div class="fc-value mono">EMP-001</div></div>
<div class="fc"><div class="fc-label">MakorX ID</div><div class="fc-value mono">MX-30417</div></div>
<div class="fc"><div class="fc-label">GPI Code</div><div class="fc-value mono">G7731</div></div>
<!-- … 1 more -->
</div>
      </div>
      <div class="tab-panel" data-panel="jobs"><div class="section-band first">Current Position</div><div class="fields-grid">
<div class="fc fc-full"><div class="fc-label">Job Title</div><div class="fc-value">Senior Equity Trader</div></div>
<div class="fc"><div class="fc-label">Level</div><div class="fc-value">Senior</div></div>
<div class="fc"><div class="fc-label">Contract</div><div class="fc-value">Permanent</div></div>
<!-- … 1 more -->
</div></div>
      <div class="tab-panel active" data-panel="records">
        <div class="section-band first">System Identity</div>
        <div class="fields-grid"><div class="fc"><div class="fc-label">Employee ID</div><div class="fc-value mono">EMP-001</div></div><div class="fc"><div class="fc-label">MakorX ID</div><div class="fc-value mono">MX-30417</div></div><div class="fc"><div class="fc-label">Last Synced</div><div class="fc-value small">Oct 14, 2026 09:12</div></div></div>
        <div class="section-band">Job History</div>
        <div class="records-table-wrap"><table class="records-table"><thead><tr><th>Effective Date</th><th>Job Title</th><th>Department</th><th>Location</th><th>Reports To</th></tr></thead><tbody>
          <tr><td>Jan 15, 2020</td><td>Equity Trader</td><td>Equities</td><td>New York</td><td>Beth Kline</td></tr>
          <tr><td>Jan 1, 2023</td><td>Senior Equity Trader</td><td>Equities</td><td>New York</td><td>Beth Kline</td></tr>
        </tbody></table></div>
        <div class="section-band">Status History</div>
        <div class="fields-grid" style="padding-bottom:20px"><div class="fc fc-full"><div class="fc-label">Jan 15, 2020</div><div class="fc-value">Active <span class="type-muted" style="font-weight:400;font-size:12px">· Hired</span></div></div></div>
      </div>
      <div class="tab-panel" data-panel="timesheet"><div class="timesheet-ph"><span class="icon icon-calendar-light icon-32"></span><span class="type-secondary" style="font-weight:600">Timesheet data pending</span><span class="type-muted" style="font-size:12px;text-align:center">Aggregated hours and attendance data<br>will appear here once connected.</span></div></div>
    </div>
  </div>
</div>
</div>
</div>
```

#### New Employee modal
Source: employees.html L389-417, L3347-3504; dark L1193-1210

Family A modal (740 wide, max-height 82vh ≈ 885px at 1080) over the employee list; scrim .28 (dark .55), panel shadow 0 8px 40px .16 in BOTH themes (no dark rule). 3-column `.modal-grid`, sections separated by `.modal-divider`, footer Cancel (left) / Create Employee (right). **Defect not reproduced (#14):** in the app, opening a select inside this modal makes the footer detach at tall viewports.

```html
<!-- modal open over the Employee list -->
<nav class="top-nav is-static">
  <div class="nav-left">
    <div class="nav-logo-wrap">
      <svg class="nav-apps-icon" width="24" height="24" viewBox="0 0 24 24"><circle cx="3" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="3" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="3" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/></svg>
      <img src="assets/logo-mark.svg" width="32" height="32" alt="">
      <div class="nav-logo-text"><span class="nav-wordmark">MAKOR X.AI</span><span class="nav-sub">HR</span></div>
    </div>
    <div class="nav-links">
      <a class="nav-link active" href="#">Employee</a>
      <a class="nav-link" href="#">Pool</a>
      <a class="nav-link" href="#">Time Tracking</a>
      <a class="nav-link" href="#">Requests</a>
    </div>
  </div>
  <div class="nav-right">
    <div class="nav-avatar">PR</div>
    <div class="profile-drop">
<!-- … name/email + dark-mode row, see Top nav -->
</div>
  </div>
</nav>
<div class="app-drop">
<!-- … 13 items, see Top nav -->
</div>
<div class="page">
<div class="page-center">
<div class="split-left">
  <div class="left-header">
    <div class="left-title-row">
      <div class="left-title">Employees (41)</div>
      <div class="btn-row"><button class="btn-primary"><span class="icon icon-plus icon-14"></span> New Employee</button></div>
    </div>
    <div class="toolbar">
      <div class="search-wrap"><span class="search-icon"><span class="icon icon-search icon-16"></span></span><input class="search-input" type="text" placeholder="Search"></div>
      <div class="cust-select cs-dept">
  <div class="cust-select__trigger"><span class="cust-select__value">Department</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
<div class="cust-select__option selected" data-val="" data-label="Department">All Departments</div>
<div class="cust-select__option" data-val="Equities">Equities</div>
<!-- … 5 more -->
</div>
</div>
      <div class="cust-select cs-office">
  <div class="cust-select__trigger"><span class="cust-select__value">Office</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
<div class="cust-select__option selected" data-val="" data-label="Office">All Offices</div>
<div class="cust-select__option" data-val="New York">New York</div>
<!-- … 2 more -->
</div>
</div>
      <div class="cust-select cs-status">
  <div class="cust-select__trigger"><span class="cust-select__value">Status</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
<div class="cust-select__option selected" data-val="" data-label="Status">All</div>
<div class="cust-select__option" data-val="Active">Active</div>
<!-- … 1 more -->
</div>
</div>
      <div class="toolbar-spacer"></div>
      <div class="groupby-wrap"><div class="cust-select cs-group">
  <div class="cust-select__trigger"><span class="cust-select__value">Group by</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
<div class="cust-select__option selected" data-val="" data-label="Group by">None</div>
<div class="cust-select__option" data-val="Department">Department</div>
<!-- … 2 more -->
</div>
</div></div>
    </div>
  </div>
  <div class="emp-list-scroll">
    <div class="emp-table-wrap">
      <table class="emp-table">
      <thead><tr>
        <th data-col="name" class="sorted">Employee <span class="sort-icon"><span class="icon icon-sort-asc icon-12"></span></span></th>
        <th data-col="dept" style="width:140px">Department <span class="sort-icon"><span class="icon icon-sort-unsorted icon-12"></span></span></th>
        <th data-col="role" style="width:200px">Job Title <span class="sort-icon"><span class="icon icon-sort-unsorted icon-12"></span></span></th>
        <th data-col="office" style="width:110px">Office <span class="sort-icon"><span class="icon icon-sort-unsorted icon-12"></span></span></th>
        <th data-col="hire" style="width:130px">Hire Date <span class="sort-icon"><span class="icon icon-sort-unsorted icon-12"></span></span></th>
        <th data-col="status" style="width:100px">Status <span class="sort-icon"><span class="icon icon-sort-unsorted icon-12"></span></span></th>
      </tr></thead>
      <tbody>
<tr class=""><td><div class="emp-cell"><div class="emp-avatar">AS</div><div><div class="emp-name">Alex Smith</div><div class="emp-email">as.smith@makor.com</div></div></div></td><td style="width:140px"><span class="dept-badge" data-dept="Equities">Equities</span></td><td style="width:200px">Senior Equity Trader</td><td style="width:110px">New York</td><td style="width:130px">Jan 15, 2020</td><td style="width:100px"><span class="status-pill status-active">Active</span></td></tr>
<tr class=""><td><div class="emp-cell"><div class="emp-avatar">BK</div><div><div class="emp-name">Beth Kline</div><div class="emp-email">bk.kline@makor.com</div></div></div></td><td style="width:140px"><span class="dept-badge" data-dept="Equities">Equities</span></td><td style="width:200px">Portfolio Manager</td><td style="width:110px">London</td><td style="width:130px">Mar 3, 2018</td><td style="width:100px"><span class="status-pill status-active">Active</span></td></tr>
<!-- … 12 more rows -->
</tbody></table>
    </div>
  </div>
</div>
<div class="split-right">
  <div class="detail-empty"><span class="icon icon-user icon-40"></span><span>Select an employee to view their profile</span></div>
</div>
</div>
</div>
<div class="modal-overlay is-open">
  <div class="modal">
    <div class="modal-header">
      <span class="modal-title">New Employee</span>
      <button class="modal-close"><span class="icon icon-close icon-16"></span></button>
    </div>
    <div class="modal-body">
      <div class="modal-section">
        <div class="modal-section-title">Personal</div>
        <div class="modal-grid">
          <div class="modal-field"><label class="modal-label">First Name</label><input class="modal-input" type="text" placeholder="e.g. Alex"></div>
          <div class="modal-field"><label class="modal-label">Last Name</label><input class="modal-input" type="text" placeholder="e.g. Smith"></div>
          <div class="modal-field"><label class="modal-label">Gender</label><div class="cust-select ">
  <div class="cust-select__trigger"><span class="cust-select__value">Select…</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
<div class="cust-select__option selected" data-val="" data-label="Select…">Select…</div>
<div class="cust-select__option" data-val="Male">Male</div>
<!-- … 3 more -->
</div>
</div></div>
          <div class="modal-field"><label class="modal-label">Date of Birth</label><div class="datepicker-wrap" style="width:100%">
  <div class="datepicker-input-wrap">
    <input type="text" class="datepicker-input" placeholder="dd/mm/yyyy" readonly>
    <span class="datepicker-icon"><span class="icon icon-calendar icon-16"></span></span>
  </div>
  <div class="datepicker-cal">
    <div class="dp-header">
      <button class="dp-nav" data-dir="prev"><span class="icon icon-chevron-left icon-14"></span></button>
      <span class="dp-month-label">Mar 1986</span>
      <button class="dp-nav" data-dir="next"><span class="icon icon-chevron-right icon-14"></span></button>
    </div>
    <div class="dp-dayview">
      <div class="dp-weekdays"><div class="dp-wd">Su</div><div class="dp-wd">Mo</div><div class="dp-wd">Tu</div><div class="dp-wd">We</div><div class="dp-wd">Th</div><div class="dp-wd">Fr</div><div class="dp-wd">Sa</div></div>
      <div class="dp-days">
<!-- … 35 day cells -->
</div>
    </div>
    <div class="dp-yearview" style="display:none"><div class="dp-year-grid"></div></div>
  </div>
</div></div>
        </div>
      </div>
      <div class="modal-divider"></div>
      <div class="modal-section">
        <div class="modal-section-title">Contact</div>
        <div class="modal-grid">
          <div class="modal-field full"><label class="modal-label">Work Email</label><input class="modal-input" type="email" placeholder="name@makor.com"></div>
          <div class="modal-field"><label class="modal-label">Mobile Phone</label><input class="modal-input" type="tel" placeholder="+1 000 000 0000"></div>
          <div class="modal-field"><label class="modal-label">Work Phone</label><input class="modal-input" type="tel" placeholder="+1 000 000 0000"></div>
        </div>
      </div>
      <div class="modal-divider"></div>
      <div class="modal-section">
        <div class="modal-section-title">Employment</div>
        <div class="modal-grid">
<div class="modal-field"><label class="modal-label">Job Title</label><input class="modal-input" type="text" placeholder="e.g. Senior Equity Trader"></div>
<div class="modal-field"><label class="modal-label">Department</label><div class="cust-select ">
  <div class="cust-select__trigger"><span class="cust-select__value">Select…</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
<div class="cust-select__option selected" data-val="" data-label="Select…">Select…</div>
<div class="cust-select__option" data-val="Equities">Equities</div>
<!-- … 5 more -->
</div>
</div></div>
<div class="modal-field"><label class="modal-label">Office</label><div class="cust-select ">
  <div class="cust-select__trigger"><span class="cust-select__value">Select…</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
<div class="cust-select__option selected" data-val="" data-label="Select…">Select…</div>
<div class="cust-select__option" data-val="New York">New York</div>
<!-- … 2 more -->
</div>
</div></div>
<div class="modal-field"><label class="modal-label">Hire Date</label><div class="datepicker-wrap" style="width:100%">
  <div class="datepicker-input-wrap">
    <input type="text" class="datepicker-input" placeholder="dd/mm/yyyy" readonly>
    <span class="datepicker-icon"><span class="icon icon-calendar icon-16"></span></span>
  </div>
  <div class="datepicker-cal">
    <div class="dp-header">
      <button class="dp-nav" data-dir="prev"><span class="icon icon-chevron-left icon-14"></span></button>
      <span class="dp-month-label">Mar 1986</span>
      <button class="dp-nav" data-dir="next"><span class="icon icon-chevron-right icon-14"></span></button>
    </div>
    <div class="dp-dayview">
      <div class="dp-weekdays"><div class="dp-wd">Su</div><div class="dp-wd">Mo</div><div class="dp-wd">Tu</div><div class="dp-wd">We</div><div class="dp-wd">Th</div><div class="dp-wd">Fr</div><div class="dp-wd">Sa</div></div>
      <div class="dp-days">
<!-- … 35 day cells -->
</div>
    </div>
    <div class="dp-yearview" style="display:none"><div class="dp-year-grid"></div></div>
  </div>
</div></div>
<!-- … 1 more -->
</div>
      </div>
      <div class="modal-divider"></div>
      <div class="modal-section">
        <div class="modal-section-title">Organisation</div>
        <div class="modal-grid">
          <div class="modal-field"><label class="modal-label">Company</label><input class="modal-input" type="text" placeholder="e.g. Makor Capital"></div>
          <div class="modal-field"><label class="modal-label">Reports To</label><div class="cust-select ">
  <div class="cust-select__trigger"><span class="cust-select__value">Select…</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
<div class="cust-select__option selected" data-val="" data-label="Select…">Select…</div>
<div class="cust-select__option" data-val="Beth Kline">Beth Kline</div>
<!-- … 1 more -->
</div>
</div></div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn-cancel">Cancel</button>
      <button class="btn-cta">Create Employee</button>
    </div>
  </div>
</div>
```
Behaviour: `modal`, `select`, `datepicker` (see §5).

#### HR Requests
Source: employees.html L232-278, L1768-2051 (#requests-view), L3797-3907; dark L1336-1368

Whole-view frame (`.requests-view` = the app's `#requests-view`): header with title + search (max-width 300), scrolling `.rv-list` with one card holding `.rv-table`. Table header = ALT family (dark #202226, not #111214). New rows are tinted (`tr.is-new`); status "● New" is #d4eee9 / #005268. Approve / Deny only on new + pending. Row 4 shows hover. Request-type tile colours come from `data-reqtype`.

```html
<!-- Requests (15) -->
<nav class="top-nav is-static">
  <div class="nav-left">
    <div class="nav-logo-wrap">
      <svg class="nav-apps-icon" width="24" height="24" viewBox="0 0 24 24"><circle cx="3" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="3" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="3" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/></svg>
      <img src="assets/logo-mark.svg" width="32" height="32" alt="">
      <div class="nav-logo-text"><span class="nav-wordmark">MAKOR X.AI</span><span class="nav-sub">HR</span></div>
    </div>
    <div class="nav-links">
      <a class="nav-link" href="#">Employee</a>
      <a class="nav-link" href="#">Pool</a>
      <a class="nav-link" href="#">Time Tracking</a>
      <a class="nav-link active" href="#">Requests</a>
    </div>
  </div>
  <div class="nav-right">
    <div class="nav-avatar">PR</div>
    <div class="profile-drop">
<!-- … name/email + dark-mode row, see Top nav -->
</div>
  </div>
</nav>
<div class="app-drop">
<!-- … 13 items, see Top nav -->
</div>
<div class="page">
<div class="requests-view">
  <div class="rv-header">
    <div class="rv-title-row"><div class="rv-title">Requests (15)</div></div>
    <div class="rv-toolbar"><div class="search-wrap" style="max-width:300px"><span class="search-icon"><span class="icon icon-search icon-16"></span></span><input class="search-input" type="text" placeholder="Search"></div></div>
  </div>
  <div class="rv-list">
    <div class="rv-card">
<table class="rv-table"><thead><tr><th>Employee</th><th>Type</th><th>Details</th><th>Days</th><th>Submitted</th><th>Status</th><th>Actions</th></tr></thead><tbody>
<tr class="is-new">
  <td><div class="rv-emp"><div class="rv-avatar">RS</div><span class="rv-emp-name">Rachel Stone</span></div></td>
  <td><div class="rv-type"><div class="rv-type-icon" data-reqtype="annual"><span class="icon icon-request-annual icon-16"></span></div><span class="rv-type-label">Annual Leave</span></div></td>
  <td><div class="rv-detail-str">Sep 22 – Sep 23 · Rosh Hashanah holiday</div></td>
  <td class="rv-dur-str">2d</td>
  <td class="rv-submitted-str">Sep 19, 2026</td>
  <td><span class="rv-status new">● New</span></td>
  <td><div class="rv-actions"><button class="rv-btn-approve">Approve</button><button class="rv-btn-deny">Deny</button></div></td>
</tr>
<tr class="is-new">
  <td><div class="rv-emp"><div class="rv-avatar">EW</div><span class="rv-emp-name">Ethan Walsh</span></div></td>
  <td><div class="rv-type"><div class="rv-type-icon" data-reqtype="sick"><span class="icon icon-request-sick icon-16"></span></div><span class="rv-type-label">Sick Leave</span></div></td>
  <td><div class="rv-detail-str">Sep 18 · Personal illness</div></td>
  <td class="rv-dur-str">1d</td>
  <td class="rv-submitted-str">Sep 18, 2026</td>
  <td><span class="rv-status new">● New</span></td>
  <td><div class="rv-actions"><button class="rv-btn-approve">Approve</button><button class="rv-btn-deny">Deny</button></div></td>
</tr>
<!-- … 13 more rows -->
</tbody></table>
    </div>
  </div>
</div>
</div>
```

#### Time Tracking
Source: employees.html L280-387, L2054-2083, L3998-4151; dark L1251-1335

List (56%) + detail (44%) inside one frame. Section labels run a hairline (pending = amber); selected row = bg + 3px brand marker; calendar: Sun-first grid with Fri + Sat as the weekend; day variants `cc-normal` (≥7h green), `cc-low` (amber), `cc-off / cc-sick` (grey label), `cc-missing` (clickable, red; opens the fill bar), `cc-wknd`, `cc-out` (outside the pay period; its dark text colours are the DERIVED #2a3548, bug #4 - flagged). Footer: Fill All Workdays (only with missing days) + Approve; approved timesheets show a green tag + date. The fill bar is shown open.

```html
<!-- Alex Smith selected, fill bar open -->
<nav class="top-nav is-static">
  <div class="nav-left">
    <div class="nav-logo-wrap">
      <svg class="nav-apps-icon" width="24" height="24" viewBox="0 0 24 24"><circle cx="3" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="3" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="3" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/></svg>
      <img src="assets/logo-mark.svg" width="32" height="32" alt="">
      <div class="nav-logo-text"><span class="nav-wordmark">MAKOR X.AI</span><span class="nav-sub">HR</span></div>
    </div>
    <div class="nav-links">
      <a class="nav-link" href="#">Employee</a>
      <a class="nav-link" href="#">Pool</a>
      <a class="nav-link active" href="#">Time Tracking</a>
      <a class="nav-link" href="#">Requests</a>
    </div>
  </div>
  <div class="nav-right">
    <div class="nav-avatar">PR</div>
    <div class="profile-drop">
<!-- … name/email + dark-mode row, see Top nav -->
</div>
  </div>
</nav>
<div class="app-drop">
<!-- … 13 items, see Top nav -->
</div>
<div class="page">
<div class="timetracking-view">
  <div class="tt-header">
    <div class="tt-title-row"><div class="tt-title">Time Tracking · 3 Pending</div></div>
    <div class="tt-toolbar"><div class="search-wrap" style="max-width:300px"><span class="search-icon"><span class="icon icon-search icon-16"></span></span><input class="search-input" type="text" placeholder="Search"></div></div>
  </div>
  <div class="tt-body">
    <div class="tt-list-panel">
      <div class="tt-list-scroll">
        <div class="tt-inner-card">
          <table class="tt-table"><thead><tr><th>Employee</th><th>Period</th><th style="text-align:right">Total Hrs</th><th style="text-align:right">Days</th><th>Submitted</th><th>Status</th></tr></thead><tbody>
<tr class="tt-section-row"><td colspan="6"><div class="tt-section-lbl tt-section-lbl--pending"><span class="tt-section-dot"></span>Awaiting Approval (3)</div></td></tr>
<tr class="tt-data-row tt-selected">
  <td><div class="tt-emp-cell"><div class="tt-avatar">AS</div><div><div class="tt-emp-name">Alex Smith</div><div class="tt-emp-dept">Equities</div></div></div></td>
  <td style="font-weight:600">Aug 26 – Sep 25</td>
  <td style="text-align:right;font-weight:700">152h</td>
  <td class="tt-days-cell" style="text-align:right">19</td>
  <td class="tt-sub-cell">Sep 26, 2026</td>
  <td><span class="tt-badge-pending">Pending Approval</span></td>
</tr>
<!-- … 6 more rows -->
</tbody></table>
        </div>
      </div>
    </div>
<div class="tt-detail-panel">
  <div class="tt-detail-inner is-visible">
    <div class="tt-detail-scroll">
      <div class="tt-det-head"><div class="tt-det-avatar">AS</div><div><div class="tt-det-name">Alex Smith</div><div class="tt-det-meta">Equities</div></div></div>
      <div class="tt-stats">
        <div class="tt-stat"><div class="tt-stat-val">152h</div><div class="tt-stat-lbl">Total Hours</div></div>
        <div class="tt-stat"><div class="tt-stat-val">19</div><div class="tt-stat-lbl">Days Worked</div></div>
      </div>
      <div class="tt-cal-title">Aug 26 – Sep 25, 2026</div>
      <div class="tt-cal">
  <div class="tt-cal-head"><span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span class="tt-wknd">Fri</span><span class="tt-wknd">Sat</span></div>
  <div class="tt-cal-body">
<div class="tt-cal-cell cc-out"><span class="cc-date">23</span><span class="cc-hrs">8h</span><span class="cc-time">8:00–16:30</span></div>
<div class="tt-cal-cell cc-out"><span class="cc-date">24</span><span class="cc-hrs">8h</span><span class="cc-time">8:00–16:30</span></div>
<div class="tt-cal-cell cc-out"><span class="cc-date">25</span><span class="cc-hrs">8h</span><span class="cc-time">8:00–16:30</span></div>
<div class="tt-cal-cell cc-normal"><span class="cc-date">26</span><span class="cc-hrs">8h</span><span class="cc-time">9:00–17:00</span></div>
<div class="tt-cal-cell cc-normal"><span class="cc-date">27</span><span class="cc-hrs">8h</span><span class="cc-time">9:00–17:00</span></div>
<div class="tt-cal-cell cc-wknd"><span class="cc-date">28</span></div>
<div class="tt-cal-cell cc-wknd"><span class="cc-date">29</span></div>
<!-- … 28 more cells -->
</div>
</div>
      <div class="tt-fill-bar is-open">
        <span class="tt-fill-lbl">Sep 15</span>
        <input class="tt-fill-input" placeholder="e.g. 9:00" type="text">
        <span class="tt-fill-hint">–</span>
        <input class="tt-fill-input" placeholder="e.g. 18:00" type="text">
        <button class="tt-fill-save">Save</button>
        <button class="tt-fill-cancel">Cancel</button>
      </div>
    </div>
    <div class="tt-detail-footer">
      <button class="tt-btn-fill-all">Fill All Workdays</button>
      <button class="tt-btn-approve">Approve</button>
    </div>
  </div>
</div>
  </div>
</div>
</div>
```
Behaviour: `rows` (see §5).

#### Pool
Source: employees.html L419-483, L2086-2133, L4403-4441; dark L1211-1250

Same split frame as Employees. The right pane is `.split-right.pool-split-right` (= the app's `#poolSplitRight`: muted #f5f5f8 pane in light, panel colour in dark, padding 24, scroll). Row: name 14/700 + three label/value pairs + two count badges (absolute, top-right); active row = bg + 3px left brand border + brand name. Empty state: `.pool-empty-state` ("Select a pool to view details"). Add Holder / Add Member are `.btn-add-member`.

```html
<!-- Pool Makor DRV selected -->
<nav class="top-nav is-static">
  <div class="nav-left">
    <div class="nav-logo-wrap">
      <svg class="nav-apps-icon" width="24" height="24" viewBox="0 0 24 24"><circle cx="3" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="3" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="3" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/></svg>
      <img src="assets/logo-mark.svg" width="32" height="32" alt="">
      <div class="nav-logo-text"><span class="nav-wordmark">MAKOR X.AI</span><span class="nav-sub">HR</span></div>
    </div>
    <div class="nav-links">
      <a class="nav-link" href="#">Employee</a>
      <a class="nav-link active" href="#">Pool</a>
      <a class="nav-link" href="#">Time Tracking</a>
      <a class="nav-link" href="#">Requests</a>
    </div>
  </div>
  <div class="nav-right">
    <div class="nav-avatar">PR</div>
    <div class="profile-drop">
<!-- … name/email + dark-mode row, see Top nav -->
</div>
  </div>
</nav>
<div class="app-drop">
<!-- … 13 items, see Top nav -->
</div>
<div class="page">
<div class="page-center">
  <div class="split-left">
    <div class="left-header">
      <div class="left-title-row"><div class="left-title">Pools (40)</div><button class="btn-primary"><span class="icon icon-plus icon-14"></span> New Pool</button></div>
      <div class="toolbar">
        <div class="search-wrap" style="min-width:0;max-width:180px"><span class="search-icon"><span class="icon icon-search icon-16"></span></span><input class="search-input" type="text" placeholder="Search"></div>
        <div class="cust-select pool-cs-company">
  <div class="cust-select__trigger"><span class="cust-select__value">Company</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
<div class="cust-select__option selected" data-val="" data-label="Company">All</div>
<div class="cust-select__option" data-val="Makor">Makor</div>
<!-- … 3 more -->
</div>
</div>
        <div class="cust-select pool-cs-team">
  <div class="cust-select__trigger"><span class="cust-select__value">Team</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
<div class="cust-select__option selected" data-val="" data-label="Team">All</div>
<div class="cust-select__option" data-val="Makor Equity">Makor Equity</div>
<!-- … 1 more -->
</div>
</div>
        <div class="cust-select pool-cs-desk">
  <div class="cust-select__trigger"><span class="cust-select__value">Desk</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
<div class="cust-select__option selected" data-val="" data-label="Desk">All</div>
<div class="cust-select__option" data-val="Makor Securities">Makor Securities</div>
<!-- … 1 more -->
</div>
</div>
        <div class="toolbar-spacer"></div>
        <div class="cust-select pool-cs-group">
  <div class="cust-select__trigger"><span class="cust-select__value">Group by</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
<div class="cust-select__option selected" data-val="" data-label="Group by">None</div>
<div class="cust-select__option" data-val="Company">Company</div>
<!-- … 2 more -->
</div>
</div>
      </div>
    </div>
    <div class="pools-list">
<div class="pool-row active">
  <div class="pool-name">Pool Makor DRV</div>
  <div class="pool-meta">
    <div class="pool-meta-item"><div class="pool-meta-label">Company:</div><div class="pool-meta-value">Makor</div></div>
    <div class="pool-meta-item"><div class="pool-meta-label">Team:</div><div class="pool-meta-value">Makor Derivatives</div></div>
    <div class="pool-meta-item"><div class="pool-meta-label">Desk:</div><div class="pool-meta-value">Makor Securities</div></div>
  </div>
  <div class="pool-badges">
    <div class="pool-badge holders"><span class="icon icon-pool-holder icon-20"></span><span>3</span></div>
    <div class="pool-badge members"><span class="icon icon-pool-members icon-22x20"></span><span>7</span></div>
  </div>
</div>
<div class="pool-row is-hover">
  <div class="pool-name">ZZ account</div>
  <div class="pool-meta">
    <div class="pool-meta-item"><div class="pool-meta-label">Company:</div><div class="pool-meta-value">Makor</div></div>
    <div class="pool-meta-item"><div class="pool-meta-label">Team:</div><div class="pool-meta-value">Makor FX</div></div>
    <div class="pool-meta-item"><div class="pool-meta-label">Desk:</div><div class="pool-meta-value">Makor Securities</div></div>
  </div>
  <div class="pool-badges">
    <div class="pool-badge holders"><span class="icon icon-pool-holder icon-20"></span><span>1</span></div>
    <div class="pool-badge members"><span class="icon icon-pool-members icon-22x20"></span><span>1</span></div>
  </div>
</div>
<div class="pool-row">
  <div class="pool-name">Makor Securities Account</div>
  <div class="pool-meta">
    <div class="pool-meta-item"><div class="pool-meta-label">Company:</div><div class="pool-meta-value">Makor</div></div>
    <div class="pool-meta-item"><div class="pool-meta-label">Team:</div><div class="pool-meta-value">Company Account</div></div>
    <div class="pool-meta-item"><div class="pool-meta-label">Desk:</div><div class="pool-meta-value">Makor Securities</div></div>
  </div>
  <div class="pool-badges">
    <div class="pool-badge holders grey"><span class="icon icon-pool-holder icon-20"></span><span>0</span></div>
    <div class="pool-badge members grey"><span class="icon icon-pool-members icon-22x20"></span><span>0</span></div>
  </div>
</div>
<!-- … 7 more -->
</div>
  </div>
<div class="split-right pool-split-right">
  <div class="pool-right-section">
<div class="pool-right-section-header"><span>Pool Holders (3)</span><button class="btn-add-member"><span class="icon icon-plus-bold icon-12"></span> Add Holder</button></div>
<div class="holder-row"><div class="holder-avatar">BK</div><div><div class="holder-name">benjamin koskas</div><div class="holder-id">Job ID: 457</div></div></div>
<div class="holder-row"><div class="holder-avatar">ER</div><div><div class="holder-name">emily roe</div><div class="holder-id">Job ID: 712</div></div></div>
<!-- … 1 more -->
</div>
  <div class="pool-right-section">
<div class="pool-right-section-header"><span>Pool Members (7)</span><button class="btn-add-member"><span class="icon icon-plus-bold icon-12"></span> Add Member</button></div>
<div class="member-card"><div class="member-card-header"><div class="member-name">Yoni Blum</div><span class="active-badge">Active</span></div><div class="member-fields">
<div><div class="mf-label">Company</div><div class="mf-value">Makor</div></div>
<div><div class="mf-label">Deck</div><div class="mf-value">Makor Securities</div></div>
<div><div class="mf-label">Team</div><div class="mf-value">Makor Derivatives</div></div>
<div><div class="mf-label">Position</div><div class="mf-value">Analyst</div></div>
<!-- … 7 more -->
</div></div>
<div class="member-card"><div class="member-card-header"><div class="member-name">Clara Ohayon</div><span class="inactive-badge">Inactive</span></div><div class="member-fields">
<div><div class="mf-label">Company</div><div class="mf-value">Makor</div></div>
<div><div class="mf-label">Deck</div><div class="mf-value">Makor Securities</div></div>
<div><div class="mf-label">Team</div><div class="mf-value">Makor Derivatives</div></div>
<div><div class="mf-label">Position</div><div class="mf-value">Trader</div></div>
<!-- … 7 more -->
</div></div>
<!-- … 1 more -->
</div>
</div>
</div>
</div>
```
Behaviour: `rows`, `select` (see §5).

#### Pool: no selection (empty state)
Source: employees.html L2127-2132, L457; dark L1212-1215

```html
<!-- empty -->
<div class="page">
<div class="page-center">
  <div class="split-left">
    <div class="left-header">
      <div class="left-title-row"><div class="left-title">Pools (40)</div><button class="btn-primary"><span class="icon icon-plus icon-14"></span> New Pool</button></div>
      <div class="toolbar">
        <div class="search-wrap" style="min-width:0;max-width:180px"><span class="search-icon"><span class="icon icon-search icon-16"></span></span><input class="search-input" type="text" placeholder="Search"></div>
        <div class="cust-select pool-cs-company">
  <div class="cust-select__trigger"><span class="cust-select__value">Company</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
<div class="cust-select__option selected" data-val="" data-label="Company">All</div>
<div class="cust-select__option" data-val="Makor">Makor</div>
<!-- … 3 more -->
</div>
</div>
        <div class="cust-select pool-cs-team">
  <div class="cust-select__trigger"><span class="cust-select__value">Team</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
<div class="cust-select__option selected" data-val="" data-label="Team">All</div>
<div class="cust-select__option" data-val="Makor Equity">Makor Equity</div>
<!-- … 1 more -->
</div>
</div>
        <div class="cust-select pool-cs-desk">
  <div class="cust-select__trigger"><span class="cust-select__value">Desk</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
<div class="cust-select__option selected" data-val="" data-label="Desk">All</div>
<div class="cust-select__option" data-val="Makor Securities">Makor Securities</div>
<!-- … 1 more -->
</div>
</div>
        <div class="toolbar-spacer"></div>
        <div class="cust-select pool-cs-group">
  <div class="cust-select__trigger"><span class="cust-select__value">Group by</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
<div class="cust-select__option selected" data-val="" data-label="Group by">None</div>
<div class="cust-select__option" data-val="Company">Company</div>
<!-- … 2 more -->
</div>
</div>
      </div>
    </div>
    <div class="pools-list">
<div class="pool-row active">
  <div class="pool-name">Pool Makor DRV</div>
  <div class="pool-meta">
    <div class="pool-meta-item"><div class="pool-meta-label">Company:</div><div class="pool-meta-value">Makor</div></div>
    <div class="pool-meta-item"><div class="pool-meta-label">Team:</div><div class="pool-meta-value">Makor Derivatives</div></div>
    <div class="pool-meta-item"><div class="pool-meta-label">Desk:</div><div class="pool-meta-value">Makor Securities</div></div>
  </div>
  <div class="pool-badges">
    <div class="pool-badge holders"><span class="icon icon-pool-holder icon-20"></span><span>3</span></div>
    <div class="pool-badge members"><span class="icon icon-pool-members icon-22x20"></span><span>7</span></div>
  </div>
</div>
<div class="pool-row is-hover">
  <div class="pool-name">ZZ account</div>
  <div class="pool-meta">
    <div class="pool-meta-item"><div class="pool-meta-label">Company:</div><div class="pool-meta-value">Makor</div></div>
    <div class="pool-meta-item"><div class="pool-meta-label">Team:</div><div class="pool-meta-value">Makor FX</div></div>
    <div class="pool-meta-item"><div class="pool-meta-label">Desk:</div><div class="pool-meta-value">Makor Securities</div></div>
  </div>
  <div class="pool-badges">
    <div class="pool-badge holders"><span class="icon icon-pool-holder icon-20"></span><span>1</span></div>
    <div class="pool-badge members"><span class="icon icon-pool-members icon-22x20"></span><span>1</span></div>
  </div>
</div>
<div class="pool-row">
  <div class="pool-name">Makor Securities Account</div>
  <div class="pool-meta">
    <div class="pool-meta-item"><div class="pool-meta-label">Company:</div><div class="pool-meta-value">Makor</div></div>
    <div class="pool-meta-item"><div class="pool-meta-label">Team:</div><div class="pool-meta-value">Company Account</div></div>
    <div class="pool-meta-item"><div class="pool-meta-label">Desk:</div><div class="pool-meta-value">Makor Securities</div></div>
  </div>
  <div class="pool-badges">
    <div class="pool-badge holders grey"><span class="icon icon-pool-holder icon-20"></span><span>0</span></div>
    <div class="pool-badge members grey"><span class="icon icon-pool-members icon-22x20"></span><span>0</span></div>
  </div>
</div>
<!-- … 7 more -->
</div>
  </div>
<div class="split-right pool-split-right"><div class="pool-empty-state"><span class="icon icon-briefcase icon-40"></span>Select a pool to view details</div></div>
</div>
</div>
```

#### My Profile: My Info
Source: employees.html L494-533, L559-644, L2135-2598; dark L1544-1616

My Profile is a fixed overlay under the nav (`.myprofile-view` = `#myprofile-view`, canvas #f5f5f8 / dark #111214, z-index 50) with a 360px left column of WHITE cards (`.sidebar` = profile card, NOT the invented dark nav) and one content card with a tab bar. My Info re-skins `.card` as flat divided sections (`.panel-myinfo` scope = the app's `#panel-myinfo`). The save bar (hidden here) appears sticky on the first edit - type in any field (live). Readonly fields: `.readonly-field`.

```html
<!-- Information tab -->
<nav class="top-nav is-static">
  <div class="nav-left">
    <div class="nav-logo-wrap">
      <svg class="nav-apps-icon" width="24" height="24" viewBox="0 0 24 24"><circle cx="3" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="3" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="3" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/></svg>
      <img src="assets/logo-mark.svg" width="32" height="32" alt="">
      <div class="nav-logo-text"><span class="nav-wordmark">MAKOR X.AI</span><span class="nav-sub">My Profile</span></div>
    </div>
    <div class="nav-links">
      <a class="nav-link active" href="#">My Info</a>
      <a class="nav-link" href="#">People</a>
    </div>
  </div>
  <div class="nav-right">
    <div class="nav-avatar">PR</div>
    <div class="profile-drop">
<!-- … name/email + dark-mode row, see Top nav -->
</div>
  </div>
</nav>
<div class="app-drop">
<!-- … 13 items, see Top nav -->
</div>
<div class="myprofile-view is-visible">
  <div class="body-wrap">
<div class="left-col">
  <aside class="sidebar">
    <div class="sidebar-profile">
      <div class="sp-avatar">RS</div>
      <div class="sp-info"><div class="sp-name">Rachel Sternberg</div><div class="sp-role">Senior Fixed Income Analyst</div></div>
    </div>
    <div class="sidebar-section">
      <div class="sidebar-label">Contact Details</div>
      <div class="sidebar-row"><div class="sidebar-icon"><span class="icon icon-phone icon-14"></span></div><div class="sidebar-text">+1 (212) 555 0147</div></div>
      <div class="sidebar-row"><div class="sidebar-icon"><span class="icon icon-mobile icon-14"></span></div><div class="sidebar-text type-muted">—</div></div>
      <div class="sidebar-row"><div class="sidebar-icon"><span class="icon icon-mail icon-14"></span></div><div class="sidebar-text">rsternberg@makorsecurities.com</div></div>
      <div class="sidebar-row"><div class="sidebar-icon"><span class="icon icon-pencil icon-14"></span></div><div class="sidebar-text">Senior Fixed Income Analyst</div></div>
    </div>
    <div class="sidebar-divider"></div>
    <div class="sidebar-section">
      <div class="sidebar-label">Hire Date</div>
      <div class="sidebar-row"><div class="sidebar-icon"><span class="icon icon-calendar-compact icon-14"></span></div><div class="sidebar-text">Nov 3, 2015<small>10y · 10mo</small></div></div>
    </div>
    <div class="sidebar-divider"></div>
    <div class="sidebar-section">
      <div class="sidebar-label">Manager</div>
      <div class="sidebar-manager"><div class="manager-avatar">LK</div><div><div class="manager-name">Laura Kim</div><div class="manager-role">FX Options Trader</div></div></div>
    </div>
  </aside>
  <div class="reminders-card">
    <div class="reminders-card-title">Upcoming Celebrations</div>
    <div class="reminder-row"><div class="reminder-icon" data-kind="birthday">🎂</div><div class="reminder-info"><div class="reminder-name">Avi Bouhadana</div><div class="reminder-detail">Birthday</div></div><div class="reminder-when">Tomorrow</div></div>
    <div class="reminder-row"><div class="reminder-icon" data-kind="anniversary">🎉</div><div class="reminder-info"><div class="reminder-name">Sophie Laurent</div><div class="reminder-detail">2 Year Anniversary</div></div><div class="reminder-when">Sep 17</div></div>
    <div class="reminder-row"><div class="reminder-icon" data-kind="birthday">🎂</div><div class="reminder-info"><div class="reminder-name">Michael Halimi</div><div class="reminder-detail">Birthday</div></div><div class="reminder-when">Sep 20</div></div>
  </div>
  <div class="reminders-card">
    <div class="reminders-card-title">Upcoming Time Off</div>
    <div class="upcoming-row"><div class="upcoming-icon-wrap"><span class="icon icon-star icon-14"></span></div><div class="upcoming-date">Sep 12–13</div><div class="upcoming-name">Rosh Hashana</div></div>
    <div class="upcoming-row"><div class="upcoming-icon-wrap"><span class="icon icon-star icon-14"></span></div><div class="upcoming-date">Sep 21</div><div class="upcoming-name">Yom Kippur</div></div>
    <div class="upcoming-row"><div class="upcoming-icon-wrap"><span class="icon icon-star icon-14"></span></div><div class="upcoming-date">Sep 25–Oct 2</div><div class="upcoming-name">Sukkot</div></div>
  </div>
</div>
    <main class="content">
      <div class="content-card-wrap">
        <div class="content-tabs">
  <div class="profile-tab active">Information</div>
  <div class="profile-tab">WFH Schedule</div>
  <div class="profile-tab">Time Off</div>
  <div class="profile-tab">Timesheets</div>
</div>
<div class="ws-panel panel-myinfo active" data-panel="myinfo"><div class="content-inner" data-dirty>
  <div class="save-bar"><span>You have unsaved changes</span><div class="save-bar-actions"><button class="btn-discard-bar">Discard</button><button class="btn-save-bar">Save changes</button></div></div>
  <div class="card"><div class="card-header"><div class="card-title">Contact Information</div></div><div class="card-body">
    <div class="field-group"><div class="fields fields-2">
      <div class="field"><div class="field-label">Work Phone</div><div class="phone-input-wrap" style="">
  <div class="phone-code-wrap">
    <div class="phone-code-btn"><span class="phone-flag">🇺🇸</span><span class="phone-code-val">+1</span><span class="icon icon-chevron-down-sm icon-12 phone-drop-arrow"></span></div>
    <div class="phone-code-drop">
<div class="phone-code-opt selected"><span class="opt-flag">🇺🇸</span><span class="opt-code">+1</span><span class="opt-name">United States</span></div>
<div class="phone-code-opt"><span class="opt-flag">🇬🇧</span><span class="opt-code">+44</span><span class="opt-name">United Kingdom</span></div>
<!-- … 9 more -->
</div>
  </div>
  <input type="tel" class="phone-number-input" value="(212) 555 0147">
</div></div>
      <div class="field"><div class="field-label">Secondary Phone <span class="type-muted" style="font-weight:400;text-transform:none;letter-spacing:0;font-size:10px">(optional)</span></div><div class="phone-input-wrap" style="">
  <div class="phone-code-wrap">
    <div class="phone-code-btn"><span class="phone-flag">🇺🇸</span><span class="phone-code-val">+1</span><span class="icon icon-chevron-down-sm icon-12 phone-drop-arrow"></span></div>
    <div class="phone-code-drop">
<div class="phone-code-opt selected"><span class="opt-flag">🇺🇸</span><span class="opt-code">+1</span><span class="opt-name">United States</span></div>
<div class="phone-code-opt"><span class="opt-flag">🇬🇧</span><span class="opt-code">+44</span><span class="opt-name">United Kingdom</span></div>
<!-- … 9 more -->
</div>
  </div>
  <input type="tel" class="phone-number-input" placeholder="Add phone number">
</div></div>
    </div></div>
    <div class="field-group"><div class="fields fields-2">
      <div class="field"><div class="field-label">Work Email</div><input type="email" class="field-value readonly-field" value="rsternberg@makorsecurities.com" readonly><div class="field-note">Managed by IT — contact your admin to change it.</div></div>
      <div class="field"><div class="field-label">Secondary Email <span class="type-muted" style="font-weight:400;text-transform:none;letter-spacing:0;font-size:10px">(optional)</span></div><input type="email" class="field-value" placeholder="personal@email.com"></div>
    </div></div>
  </div></div>
  <div class="card"><div class="card-header"><div class="card-title">Basic Information</div></div><div class="card-body">
    <div class="field-group"><div class="fields fields-4"><div class="field"><div class="field-label">First Name</div><input type="text" class="field-value" value="Rachel"></div><div class="field"><div class="field-label">Middle Name</div><input type="text" class="field-value" placeholder="—"></div><div class="field"><div class="field-label">Last Name</div><input type="text" class="field-value" value="Sternberg"></div><div class="field"><div class="field-label">Preferred Name</div><input type="text" class="field-value" placeholder="—"></div></div></div>
    <div class="field-group"><div class="fields fields-3">
      <div class="field"><div class="field-label">Date of Birth</div><div class="datepicker-wrap" style="width:100%">
  <div class="datepicker-input-wrap">
    <input type="text" class="datepicker-input" value="Mar 14, 1986" readonly>
    <span class="datepicker-icon"><span class="icon icon-calendar icon-16"></span></span>
  </div>
  <div class="datepicker-cal">
    <div class="dp-header">
      <button class="dp-nav" data-dir="prev"><span class="icon icon-chevron-left icon-14"></span></button>
      <span class="dp-month-label">Mar 1986</span>
      <button class="dp-nav" data-dir="next"><span class="icon icon-chevron-right icon-14"></span></button>
    </div>
    <div class="dp-dayview">
      <div class="dp-weekdays"><div class="dp-wd">Su</div><div class="dp-wd">Mo</div><div class="dp-wd">Tu</div><div class="dp-wd">We</div><div class="dp-wd">Th</div><div class="dp-wd">Fr</div><div class="dp-wd">Sa</div></div>
      <div class="dp-days">
<!-- … 35 day cells -->
</div>
    </div>
    <div class="dp-yearview" style="display:none"><div class="dp-year-grid"></div></div>
  </div>
</div></div>
      <div class="field"><div class="field-label">Gender</div><select class="field-value"><option>— Select —</option><option selected>Female</option><option>Male</option></select></div>
      <div class="field"><div class="field-label">Marital Status</div><select class="field-value"><option>— Select —</option><option selected>Single</option><option>Married</option></select></div>
    </div></div>
    <div class="field-group"><div class="fields fields-3"><div class="field"><div class="field-label">Nationality</div><input type="text" class="field-value" value="Israeli-American"></div><div class="field"><div class="field-label">ID Number</div><input type="text" class="field-value" value="B-98765432"></div><div class="field"><div class="field-label">SSN</div><input type="text" class="field-value" placeholder="—"></div></div></div>
  </div></div>
  <div class="card"><div class="card-header"><div class="card-title">Address</div></div><div class="card-body">
    <div class="field-group"><div class="fields fields-2"><div class="field"><div class="field-label">Street 1</div><input type="text" class="field-value" value="245 Park Avenue"></div><div class="field"><div class="field-label">Street 2 / Apt</div><input type="text" class="field-value" value="Apt 12B"></div></div></div>
    <div class="field-group"><div class="fields fields-3"><div class="field"><div class="field-label">City</div><input type="text" class="field-value" value="New York"></div><div class="field"><div class="field-label">State / Region</div><input type="text" class="field-value" value="NY"></div><div class="field"><div class="field-label">Country</div><input type="text" class="field-value" value="United States"></div></div></div>
  </div></div>
  <div class="card"><div class="card-header"><div class="card-title">Employment</div></div><div class="card-body"><div class="fields fields-3">
    <div class="field"><div class="field-label">Employee ID</div><input type="text" class="field-value readonly-field" value="EMP-0012" readonly></div><div class="field"><div class="field-label">Department</div><input type="text" class="field-value readonly-field" value="Fixed Income" readonly></div><div class="field"><div class="field-label">Office</div><input type="text" class="field-value readonly-field" value="New York" readonly></div>
  </div></div></div>
  <div class="card"><div class="card-header"><div class="card-title">Emergency Contact</div></div><div class="card-body"><div class="fields fields-3">
    <div class="field"><div class="field-label">Full Name</div><input type="text" class="field-value" value="Daniel Sternberg"></div><div class="field"><div class="field-label">Relationship</div><input type="text" class="field-value" value="Brother"></div><div class="field"><div class="field-label">Phone</div><div class="phone-input-wrap" style="">
  <div class="phone-code-wrap">
    <div class="phone-code-btn"><span class="phone-flag">🇺🇸</span><span class="phone-code-val">+1</span><span class="icon icon-chevron-down-sm icon-12 phone-drop-arrow"></span></div>
    <div class="phone-code-drop">
<div class="phone-code-opt selected"><span class="opt-flag">🇺🇸</span><span class="opt-code">+1</span><span class="opt-name">United States</span></div>
<div class="phone-code-opt"><span class="opt-flag">🇬🇧</span><span class="opt-code">+44</span><span class="opt-name">United Kingdom</span></div>
<!-- … 9 more -->
</div>
  </div>
  <input type="tel" class="phone-number-input" value="(917) 555 0381">
</div></div>
  </div></div></div>
</div></div>
      </div>
    </main>
  </div>
</div>
```
Behaviour: `tabs`, `savebar`, `phone`, `datepicker`, `select` (see §5).

#### My Profile: People directory + quick card
Source: employees.html L533, L679-732, L2600-2614, L3237-3249, L4692-4770; dark L1617-1654

The "People" nav page: the left column and the tab bar are hidden, the content card holds a toolbar (38px search + two native selects + count) and an alphabetical list. Row = grid 68 / 1fr / 1fr / 260 (avatar, name + role, contact lines, "Reports to" link); hover = bluish row tint + brand-deep name. Clicking a ROW (not hover) opens the quick card (family E) at the centre. The manager link flashes the target row with `@keyframes dir-flash` (1.4s ease-out; dark tint is DERIVED, bug #13).

```html
<!-- directory with the quick card open -->
<nav class="top-nav is-static">
  <div class="nav-left">
    <div class="nav-logo-wrap">
      <svg class="nav-apps-icon" width="24" height="24" viewBox="0 0 24 24"><circle cx="3" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="3" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="3" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/></svg>
      <img src="assets/logo-mark.svg" width="32" height="32" alt="">
      <div class="nav-logo-text"><span class="nav-wordmark">MAKOR X.AI</span><span class="nav-sub">My Profile</span></div>
    </div>
    <div class="nav-links">
      <a class="nav-link" href="#">My Info</a>
      <a class="nav-link active" href="#">People</a>
    </div>
  </div>
  <div class="nav-right">
    <div class="nav-avatar">PR</div>
    <div class="profile-drop">
<!-- … name/email + dark-mode row, see Top nav -->
</div>
  </div>
</nav>
<div class="app-drop">
<!-- … 13 items, see Top nav -->
</div>
<div class="myprofile-view is-visible">
  <div class="body-wrap">

    <main class="content">
      <div class="content-card-wrap">
        
<div class="ws-panel panel-directory active">
  <div class="dir-toolbar">
    <div class="dir-search-wrap"><span class="dir-search-icon"><span class="icon icon-search-line icon-16"></span></span><input class="dir-search" type="text" placeholder="Search"></div>
    <span class="dir-ctrl-label">Group by</span>
    <select class="dir-select"><option>Name</option><option>Department</option><option>Office</option></select>
    <span class="dir-ctrl-label">Filter by</span>
    <select class="dir-select"><option>All Employees</option></select>
    <div class="dir-count">8 people</div>
  </div>
  <div class="dir-list">
<div class="dir-alpha-group">
  <div class="dir-alpha-header">B</div>
<div class="dir-row">
  <div class="dir-avatar">AB</div>
  <div class="dir-info"><div class="dir-name"><span class="dir-name-link">Avi Bouhadana</span></div><div class="dir-sub">Director, Sales · Makor Dubai, Dubai</div></div>
  <div class="dir-contact"><div class="dir-contact-row"><span class="icon icon-mail icon-13 dir-contact-icon"></span><span>abouhadana@makordubai.com</span></div><div class="dir-contact-row"><span class="icon icon-phone icon-13 dir-contact-icon"></span><span>+971 50 555 0182</span></div></div>
  <div class="dir-reports"><span class="icon icon-user icon-13 dir-contact-icon"></span><span>Reports to <span class="dir-manager-link">Jordan Davis</span></span></div>
</div>
</div>
<!-- … 5 more -->
</div>
</div>
      </div>
    </main>
  </div>
</div>
<div class="emp-qcard-backdrop">
  <div class="emp-qcard">
    <div class="emp-qcard-close">✕</div>
    <div class="emp-qcard-head"><div class="emp-qcard-avatar">EF</div><div><div class="emp-qcard-name">Ethan Friedman</div><div class="emp-qcard-sub">FX Trader | Makor Capital</div></div></div>
    <div class="emp-qcard-rows">
      <div class="emp-qcard-row"><span class="icon icon-pin-qcard icon-16 emp-qcard-icon"></span><span>London — 4:12 PM local time</span></div>
      <div class="emp-qcard-email-row"><div class="emp-qcard-email-main"><span class="icon icon-mail icon-16 emp-qcard-icon"></span><span class="emp-qcard-email-text">efriedman@makorcapital.com</span></div><div class="emp-qcard-email-actions"><button class="eqa-btn" title="Copy email"><span class="icon icon-copy icon-18"></span></button><a class="eqa-btn" href="#" title="Open in Outlook"><span class="icon icon-mail-envelope icon-18"></span></a></div></div>
      <div class="emp-qcard-email-row"><div class="emp-qcard-email-main"><span class="icon icon-phone icon-16 emp-qcard-icon"></span><span>+44 20 7555 0121</span></div><div class="emp-qcard-email-actions"><button class="eqa-btn" title="Copy phone"><span class="icon icon-copy icon-18"></span></button></div></div>
      <div class="emp-qcard-row"><span class="icon icon-reports-to icon-16 emp-qcard-icon"></span><span>Birthday · Jan 30</span></div>
    </div>
  </div>
</div>
```
Behaviour: `dropdowns` (see §5).

#### My Profile: WFH schedule
Source: employees.html L737-787, L2617-2654, L4815-4892; dark L1512-1543

Preference card (5 day boxes + badge + disabled "Request Approval"), two stat cards, month toolbar (32px nav buttons + legend), a Mon-first calendar (`.wfh-cell`: weekday / `.weekend` / `.today` disc / `.faded` filler) and the Reset / Save row. Every weekday cell carries a pill; cells have NO hover state in the app. Click a weekday cell (live) to cycle WFH / Office. Disabled buttons: bug #16 (class-based in both themes).

```html
<!-- WFH Schedule tab, September 2026 -->
<nav class="top-nav is-static">
  <div class="nav-left">
    <div class="nav-logo-wrap">
      <svg class="nav-apps-icon" width="24" height="24" viewBox="0 0 24 24"><circle cx="3" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="3" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="3" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/></svg>
      <img src="assets/logo-mark.svg" width="32" height="32" alt="">
      <div class="nav-logo-text"><span class="nav-wordmark">MAKOR X.AI</span><span class="nav-sub">My Profile</span></div>
    </div>
    <div class="nav-links">
      <a class="nav-link active" href="#">My Info</a>
      <a class="nav-link" href="#">People</a>
    </div>
  </div>
  <div class="nav-right">
    <div class="nav-avatar">PR</div>
    <div class="profile-drop">
<!-- … name/email + dark-mode row, see Top nav -->
</div>
  </div>
</nav>
<div class="app-drop">
<!-- … 13 items, see Top nav -->
</div>
<div class="myprofile-view is-visible">
  <div class="body-wrap">
<div class="left-col">
  <aside class="sidebar">
    <div class="sidebar-profile">
      <div class="sp-avatar">RS</div>
      <div class="sp-info"><div class="sp-name">Rachel Sternberg</div><div class="sp-role">Senior Fixed Income Analyst</div></div>
    </div>
    <div class="sidebar-section">
      <div class="sidebar-label">Contact Details</div>
      <div class="sidebar-row"><div class="sidebar-icon"><span class="icon icon-phone icon-14"></span></div><div class="sidebar-text">+1 (212) 555 0147</div></div>
      <div class="sidebar-row"><div class="sidebar-icon"><span class="icon icon-mobile icon-14"></span></div><div class="sidebar-text type-muted">—</div></div>
      <div class="sidebar-row"><div class="sidebar-icon"><span class="icon icon-mail icon-14"></span></div><div class="sidebar-text">rsternberg@makorsecurities.com</div></div>
      <div class="sidebar-row"><div class="sidebar-icon"><span class="icon icon-pencil icon-14"></span></div><div class="sidebar-text">Senior Fixed Income Analyst</div></div>
    </div>
    <div class="sidebar-divider"></div>
    <div class="sidebar-section">
      <div class="sidebar-label">Hire Date</div>
      <div class="sidebar-row"><div class="sidebar-icon"><span class="icon icon-calendar-compact icon-14"></span></div><div class="sidebar-text">Nov 3, 2015<small>10y · 10mo</small></div></div>
    </div>
    <div class="sidebar-divider"></div>
    <div class="sidebar-section">
      <div class="sidebar-label">Manager</div>
      <div class="sidebar-manager"><div class="manager-avatar">LK</div><div><div class="manager-name">Laura Kim</div><div class="manager-role">FX Options Trader</div></div></div>
    </div>
  </aside>
  <div class="reminders-card">
    <div class="reminders-card-title">Upcoming Celebrations</div>
    <div class="reminder-row"><div class="reminder-icon" data-kind="birthday">🎂</div><div class="reminder-info"><div class="reminder-name">Avi Bouhadana</div><div class="reminder-detail">Birthday</div></div><div class="reminder-when">Tomorrow</div></div>
    <div class="reminder-row"><div class="reminder-icon" data-kind="anniversary">🎉</div><div class="reminder-info"><div class="reminder-name">Sophie Laurent</div><div class="reminder-detail">2 Year Anniversary</div></div><div class="reminder-when">Sep 17</div></div>
    <div class="reminder-row"><div class="reminder-icon" data-kind="birthday">🎂</div><div class="reminder-info"><div class="reminder-name">Michael Halimi</div><div class="reminder-detail">Birthday</div></div><div class="reminder-when">Sep 20</div></div>
  </div>
  <div class="reminders-card">
    <div class="reminders-card-title">Upcoming Time Off</div>
    <div class="upcoming-row"><div class="upcoming-icon-wrap"><span class="icon icon-star icon-14"></span></div><div class="upcoming-date">Sep 12–13</div><div class="upcoming-name">Rosh Hashana</div></div>
    <div class="upcoming-row"><div class="upcoming-icon-wrap"><span class="icon icon-star icon-14"></span></div><div class="upcoming-date">Sep 21</div><div class="upcoming-name">Yom Kippur</div></div>
    <div class="upcoming-row"><div class="upcoming-icon-wrap"><span class="icon icon-star icon-14"></span></div><div class="upcoming-date">Sep 25–Oct 2</div><div class="upcoming-name">Sukkot</div></div>
  </div>
</div>
    <main class="content">
      <div class="content-card-wrap">
        <div class="content-tabs">
  <div class="profile-tab">Information</div>
  <div class="profile-tab active">WFH Schedule</div>
  <div class="profile-tab">Time Off</div>
  <div class="profile-tab">Timesheets</div>
</div>
<div class="ws-panel panel-wfh active" data-panel="wfh">
  <div class="wfh-prefs-card">
    <div class="wfh-prefs-header"><div class="wfh-prefs-title">My WFH Days</div><div class="wfh-prefs-badge approved">Approved</div></div>
    <div class="wfh-prefs-sub">Choose your recurring weekly preference. Changes require manager approval.</div>
    <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:16px">
      <div class="wfh-prefs-days"><label class="wfh-day-check"><input type="checkbox"><div class="wfh-day-label">Mon</div><div class="wfh-day-box"><span class="icon icon-check icon-14"></span></div></label>
<label class="wfh-day-check"><input type="checkbox"><div class="wfh-day-label">Tue</div><div class="wfh-day-box"><span class="icon icon-check icon-14"></span></div></label>
<label class="wfh-day-check"><input type="checkbox" checked><div class="wfh-day-label">Wed</div><div class="wfh-day-box"><span class="icon icon-check icon-14"></span></div></label>
<label class="wfh-day-check"><input type="checkbox"><div class="wfh-day-label">Thu</div><div class="wfh-day-box"><span class="icon icon-check icon-14"></span></div></label>
<label class="wfh-day-check"><input type="checkbox"><div class="wfh-day-label">Fri</div><div class="wfh-day-box"><span class="icon icon-check icon-14"></span></div></label></div>
      <button class="btn-primary" style="flex-shrink:0;margin-bottom:0" disabled>Request Approval</button>
    </div>
  </div>
  <div class="wfh-summary-grid">
    <div class="wfh-stat-card"><div class="wfh-stat-icon wfh-stat-icon-wfh"><span class="icon icon-home icon-20"></span></div><div><div class="wfh-stat-num">5</div><div class="wfh-stat-label">WFH Days</div></div></div>
    <div class="wfh-stat-card"><div class="wfh-stat-icon wfh-stat-icon-office"><span class="icon icon-briefcase-sm icon-20"></span></div><div><div class="wfh-stat-num">17</div><div class="wfh-stat-label">In Office</div></div></div>
  </div>
  <div class="wfh-toolbar" style="margin-bottom:14px">
    <div class="wfh-month-nav"><button class="wfh-nav-btn"><span class="icon icon-chevron-left-bold icon-14"></span></button><div class="wfh-month-label">September 2026</div><button class="wfh-nav-btn"><span class="icon icon-chevron-right-bold icon-14"></span></button></div>
    <div class="wfh-legend"><div class="wfh-legend-item"><div class="wfh-legend-dot wfh"></div>WFH</div><div class="wfh-legend-item"><div class="wfh-legend-dot office"></div>Office</div></div>
  </div>
  <div class="wfh-cal">
    <div class="wfh-cal-head"><div class="wfh-cal-daylabel">Mon</div><div class="wfh-cal-daylabel">Tue</div><div class="wfh-cal-daylabel">Wed</div><div class="wfh-cal-daylabel">Thu</div><div class="wfh-cal-daylabel">Fri</div><div class="wfh-cal-daylabel">Sat</div><div class="wfh-cal-daylabel">Sun</div></div>
    <div class="wfh-cal-body">
<div class="wfh-cell faded"><div class="wfh-cell-num">31</div></div>
<div class="wfh-cell" data-default="office" data-override="office"><div class="wfh-cell-num">1</div><div class="wfh-status-pill office">Office</div></div>
<div class="wfh-cell" data-default="wfh" data-override="office"><div class="wfh-cell-num">2</div><div class="wfh-status-pill office">Office</div></div>
<div class="wfh-cell" data-default="office" data-override="wfh"><div class="wfh-cell-num">3</div><div class="wfh-status-pill wfh">WFH</div></div>
<div class="wfh-cell" data-default="office" data-override="office"><div class="wfh-cell-num">4</div><div class="wfh-status-pill office">Office</div></div>
<div class="wfh-cell weekend"><div class="wfh-cell-num">5</div></div>
<div class="wfh-cell weekend"><div class="wfh-cell-num">6</div></div>
<div class="wfh-cell" data-default="office" data-override="wfh"><div class="wfh-cell-num">7</div><div class="wfh-status-pill wfh">WFH</div></div>
<!-- … remaining cells -->
</div>
  </div>
  <div class="wfh-save-row"><button class="btn-outline" disabled>Reset</button><button class="btn-primary" disabled>Save Schedule</button></div>
</div>
      </div>
    </main>
  </div>
</div>
```
Behaviour: `rows`, `tabs` (see §5).

#### My Profile: Timesheets
Source: employees.html L832-880, L2658-2747; dark L1466-1496

Period select + a card of day rows (68px day chip - today = brand fill, in dark an extra 1.5px brand border (bug #31) - hours + range + a hidden-until-hover "＋ Add Time Entry" link) separated by `.period-divider`s; 190px stats sidebar with a mini bar chart. The pre-selected period renders in the placeholder grey because the app never adds `.has-value` to it (kept as rendered). The two modals (entry, fill) are in the Modals section.

```html
<!-- Timesheets tab -->
<nav class="top-nav is-static">
  <div class="nav-left">
    <div class="nav-logo-wrap">
      <svg class="nav-apps-icon" width="24" height="24" viewBox="0 0 24 24"><circle cx="3" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="3" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="3" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/></svg>
      <img src="assets/logo-mark.svg" width="32" height="32" alt="">
      <div class="nav-logo-text"><span class="nav-wordmark">MAKOR X.AI</span><span class="nav-sub">My Profile</span></div>
    </div>
    <div class="nav-links">
      <a class="nav-link active" href="#">My Info</a>
      <a class="nav-link" href="#">People</a>
    </div>
  </div>
  <div class="nav-right">
    <div class="nav-avatar">PR</div>
    <div class="profile-drop">
<!-- … name/email + dark-mode row, see Top nav -->
</div>
  </div>
</nav>
<div class="app-drop">
<!-- … 13 items, see Top nav -->
</div>
<div class="myprofile-view is-visible">
  <div class="body-wrap">
<div class="left-col">
  <aside class="sidebar">
    <div class="sidebar-profile">
      <div class="sp-avatar">RS</div>
      <div class="sp-info"><div class="sp-name">Rachel Sternberg</div><div class="sp-role">Senior Fixed Income Analyst</div></div>
    </div>
    <div class="sidebar-section">
      <div class="sidebar-label">Contact Details</div>
      <div class="sidebar-row"><div class="sidebar-icon"><span class="icon icon-phone icon-14"></span></div><div class="sidebar-text">+1 (212) 555 0147</div></div>
      <div class="sidebar-row"><div class="sidebar-icon"><span class="icon icon-mobile icon-14"></span></div><div class="sidebar-text type-muted">—</div></div>
      <div class="sidebar-row"><div class="sidebar-icon"><span class="icon icon-mail icon-14"></span></div><div class="sidebar-text">rsternberg@makorsecurities.com</div></div>
      <div class="sidebar-row"><div class="sidebar-icon"><span class="icon icon-pencil icon-14"></span></div><div class="sidebar-text">Senior Fixed Income Analyst</div></div>
    </div>
    <div class="sidebar-divider"></div>
    <div class="sidebar-section">
      <div class="sidebar-label">Hire Date</div>
      <div class="sidebar-row"><div class="sidebar-icon"><span class="icon icon-calendar-compact icon-14"></span></div><div class="sidebar-text">Nov 3, 2015<small>10y · 10mo</small></div></div>
    </div>
    <div class="sidebar-divider"></div>
    <div class="sidebar-section">
      <div class="sidebar-label">Manager</div>
      <div class="sidebar-manager"><div class="manager-avatar">LK</div><div><div class="manager-name">Laura Kim</div><div class="manager-role">FX Options Trader</div></div></div>
    </div>
  </aside>
  <div class="reminders-card">
    <div class="reminders-card-title">Upcoming Celebrations</div>
    <div class="reminder-row"><div class="reminder-icon" data-kind="birthday">🎂</div><div class="reminder-info"><div class="reminder-name">Avi Bouhadana</div><div class="reminder-detail">Birthday</div></div><div class="reminder-when">Tomorrow</div></div>
    <div class="reminder-row"><div class="reminder-icon" data-kind="anniversary">🎉</div><div class="reminder-info"><div class="reminder-name">Sophie Laurent</div><div class="reminder-detail">2 Year Anniversary</div></div><div class="reminder-when">Sep 17</div></div>
    <div class="reminder-row"><div class="reminder-icon" data-kind="birthday">🎂</div><div class="reminder-info"><div class="reminder-name">Michael Halimi</div><div class="reminder-detail">Birthday</div></div><div class="reminder-when">Sep 20</div></div>
  </div>
  <div class="reminders-card">
    <div class="reminders-card-title">Upcoming Time Off</div>
    <div class="upcoming-row"><div class="upcoming-icon-wrap"><span class="icon icon-star icon-14"></span></div><div class="upcoming-date">Sep 12–13</div><div class="upcoming-name">Rosh Hashana</div></div>
    <div class="upcoming-row"><div class="upcoming-icon-wrap"><span class="icon icon-star icon-14"></span></div><div class="upcoming-date">Sep 21</div><div class="upcoming-name">Yom Kippur</div></div>
    <div class="upcoming-row"><div class="upcoming-icon-wrap"><span class="icon icon-star icon-14"></span></div><div class="upcoming-date">Sep 25–Oct 2</div><div class="upcoming-name">Sukkot</div></div>
  </div>
</div>
    <main class="content">
      <div class="content-card-wrap">
        <div class="content-tabs">
  <div class="profile-tab">Information</div>
  <div class="profile-tab">WFH Schedule</div>
  <div class="profile-tab">Time Off</div>
  <div class="profile-tab active">Timesheets</div>
</div>
<div class="ws-panel panel-timesheet active" data-panel="timesheet"><div class="content-inner">
  <div class="ts-controls">
    <div class="cust-select " style="min-width:230px">
  <div class="cust-select__trigger"><span class="cust-select__value">This Pay Period (Aug 26 – Sep 25)</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
<div class="cust-select__option selected" data-val="" data-label="This Pay Period (Aug 26 – Sep 25)">This Pay Period (Aug 26 – Sep 25)</div>
<div class="cust-select__option" data-val="Jul 26 – Aug 25">Jul 26 – Aug 25</div>
<!-- … 1 more -->
</div>
</div>
    <div class="ts-spacer"></div>
  </div>
  <div class="timesheet-layout">
    <div class="timesheet-main">
      <div class="card"><div class="card-body" style="padding-top:20px;padding-bottom:20px">
        <div class="period-heading"><div class="period-icon"><span class="icon icon-calendar-compact icon-16"></span></div><div class="period-label">Aug 26 – Sep 25</div></div>
        <div class="day-row"><div class="day-chip"><div class="day-name">Sun</div><div class="day-date">Aug 23</div></div><div><div class="day-hours">9h 00m</div><div class="day-range">9:00 AM – 6:00 PM</div><div class="add-entry-link">＋ Add Time Entry</div></div></div>
        <div class="day-row"><div class="day-chip"><div class="day-name">Mon</div><div class="day-date">Aug 24</div></div><div><div class="day-hours">9h 00m</div><div class="day-range">9:00 AM – 6:00 PM</div><div class="add-entry-link">＋ Add Time Entry</div></div></div>
        <div class="day-row"><div class="day-chip"><div class="day-name">Tue</div><div class="day-date">Aug 25</div></div><div><div class="day-hours">9h 00m</div><div class="day-range">9:00 AM – 6:00 PM</div><div class="add-entry-link">＋ Add Time Entry</div></div></div>
        <div class="period-divider">Pay Period Begins</div>
        <div class="day-row"><div class="day-chip today"><div class="day-name today">Wed</div><div class="day-date today">Aug 26</div></div><div><div class="day-hours zero">0h 00m</div><div class="add-entry-link">＋ Add Time Entry</div></div></div>
        <div class="day-row"><div class="day-chip"><div class="day-name">Thu</div><div class="day-date">Aug 27</div></div><div><div class="day-hours zero">0h 00m</div><div class="add-entry-link">＋ Add Time Entry</div></div></div>
        <div class="day-row"><div class="day-chip"><div class="day-name">Fri</div><div class="day-date">Aug 28</div></div><div><div class="day-hours zero">0h 00m</div><div class="add-entry-link">＋ Add Time Entry</div></div></div>
        <div class="day-row"><div class="day-chip"><div class="day-name">Sat</div><div class="day-date">Aug 29</div></div><div><div class="day-hours zero">0h 00m</div><div class="add-entry-link">＋ Add Time Entry</div></div></div>
        <div class="period-divider">Week of Aug 30</div>
        <div class="day-row"><div class="day-chip"><div class="day-name">Sun</div><div class="day-date">Aug 30</div></div><div><div class="day-hours zero">0h 00m</div><div class="add-entry-link">＋ Add Time Entry</div></div></div>
        <div class="day-row"><div class="day-chip"><div class="day-name">Mon</div><div class="day-date">Aug 31</div></div><div><div class="day-hours zero">0h 00m</div><div class="add-entry-link">＋ Add Time Entry</div></div></div>
        <div class="day-row"><div class="day-chip"><div class="day-name">Tue</div><div class="day-date">Sep 1</div></div><div><div class="day-hours zero">0h 00m</div><div class="add-entry-link">＋ Add Time Entry</div></div></div>
        <div class="day-row"><div class="day-chip"><div class="day-name">Wed</div><div class="day-date">Sep 2</div></div><div><div class="day-hours zero">0h 00m</div><div class="add-entry-link">＋ Add Time Entry</div></div></div>
        <div class="day-row"><div class="day-chip"><div class="day-name">Thu</div><div class="day-date">Sep 3</div></div><div><div class="day-hours zero">0h 00m</div><div class="add-entry-link">＋ Add Time Entry</div></div></div>
        <div class="approval-note">⏱ Timesheet will be sent for approval on Sep 26</div>
      </div></div>
    </div>
    <div class="timesheet-sidebar">
      <div class="ts-stat-card">
        <div class="ts-stat-label">This Week</div><div class="ts-stat-value">27h 00m</div><div class="ts-stat-sub">Aug 23–29 · 4 days left</div>
        <div class="mini-chart">
          <div class="mini-bar-wrap"><div class="mini-bar filled" style="height:32px"></div><div class="mini-bar-label">S</div></div><div class="mini-bar-wrap"><div class="mini-bar filled" style="height:32px"></div><div class="mini-bar-label">M</div></div><div class="mini-bar-wrap"><div class="mini-bar filled" style="height:32px"></div><div class="mini-bar-label">T</div></div>
          <div class="mini-bar-wrap"><div class="mini-bar empty" style="height:12px"></div><div class="mini-bar-label">W</div></div><div class="mini-bar-wrap"><div class="mini-bar empty" style="height:12px"></div><div class="mini-bar-label">T</div></div><div class="mini-bar-wrap"><div class="mini-bar empty" style="height:12px"></div><div class="mini-bar-label">F</div></div><div class="mini-bar-wrap"><div class="mini-bar empty" style="height:12px"></div><div class="mini-bar-label">S</div></div>
        </div>
      </div>
      <div class="ts-stat-card"><div class="ts-stat-label">Pay Period</div><div class="ts-stat-value" style="font-size:20px">207h 00m</div><div class="ts-stat-sub">Jul 26 – Aug 25</div><div class="ts-stat-sub" style="margin-top:6px">Paid Hours · 207h REG</div></div>
      <button class="ts-btn-primary" style="width:100%;justify-content:center;margin-top:4px">Fill Workdays</button>
    </div>
  </div>
</div></div>
      </div>
    </main>
  </div>
</div>
```
Behaviour: `modal`, `timesheet` (see §5).

#### My Profile: Time Off (main)
Source: employees.html L541-548, L885-962, L2750-3080; dark L1398-1456

Balance cards (number 28/800, two circular 28px action buttons top-right), then two stacked cards that share the remaining height: Requests (filter pills + "New Request" 32px button; table = ALT header family, Details column secondary (decision #7/#35)) and History (native range picker + table with signed colour classes `.neg` / `.pos`; the app renders the whole history table TWICE - bug #12 - once here). Layout uses the `.timeoff-main` twin of `#timeoff-main`.

```html
<!-- Time Off tab -->
<nav class="top-nav is-static">
  <div class="nav-left">
    <div class="nav-logo-wrap">
      <svg class="nav-apps-icon" width="24" height="24" viewBox="0 0 24 24"><circle cx="3" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="3" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="3" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/></svg>
      <img src="assets/logo-mark.svg" width="32" height="32" alt="">
      <div class="nav-logo-text"><span class="nav-wordmark">MAKOR X.AI</span><span class="nav-sub">My Profile</span></div>
    </div>
    <div class="nav-links">
      <a class="nav-link active" href="#">My Info</a>
      <a class="nav-link" href="#">People</a>
    </div>
  </div>
  <div class="nav-right">
    <div class="nav-avatar">PR</div>
    <div class="profile-drop">
<!-- … name/email + dark-mode row, see Top nav -->
</div>
  </div>
</nav>
<div class="app-drop">
<!-- … 13 items, see Top nav -->
</div>
<div class="myprofile-view is-visible">
  <div class="body-wrap">
<div class="left-col">
  <aside class="sidebar">
    <div class="sidebar-profile">
      <div class="sp-avatar">RS</div>
      <div class="sp-info"><div class="sp-name">Rachel Sternberg</div><div class="sp-role">Senior Fixed Income Analyst</div></div>
    </div>
    <div class="sidebar-section">
      <div class="sidebar-label">Contact Details</div>
      <div class="sidebar-row"><div class="sidebar-icon"><span class="icon icon-phone icon-14"></span></div><div class="sidebar-text">+1 (212) 555 0147</div></div>
      <div class="sidebar-row"><div class="sidebar-icon"><span class="icon icon-mobile icon-14"></span></div><div class="sidebar-text type-muted">—</div></div>
      <div class="sidebar-row"><div class="sidebar-icon"><span class="icon icon-mail icon-14"></span></div><div class="sidebar-text">rsternberg@makorsecurities.com</div></div>
      <div class="sidebar-row"><div class="sidebar-icon"><span class="icon icon-pencil icon-14"></span></div><div class="sidebar-text">Senior Fixed Income Analyst</div></div>
    </div>
    <div class="sidebar-divider"></div>
    <div class="sidebar-section">
      <div class="sidebar-label">Hire Date</div>
      <div class="sidebar-row"><div class="sidebar-icon"><span class="icon icon-calendar-compact icon-14"></span></div><div class="sidebar-text">Nov 3, 2015<small>10y · 10mo</small></div></div>
    </div>
    <div class="sidebar-divider"></div>
    <div class="sidebar-section">
      <div class="sidebar-label">Manager</div>
      <div class="sidebar-manager"><div class="manager-avatar">LK</div><div><div class="manager-name">Laura Kim</div><div class="manager-role">FX Options Trader</div></div></div>
    </div>
  </aside>
  <div class="reminders-card">
    <div class="reminders-card-title">Upcoming Celebrations</div>
    <div class="reminder-row"><div class="reminder-icon" data-kind="birthday">🎂</div><div class="reminder-info"><div class="reminder-name">Avi Bouhadana</div><div class="reminder-detail">Birthday</div></div><div class="reminder-when">Tomorrow</div></div>
    <div class="reminder-row"><div class="reminder-icon" data-kind="anniversary">🎉</div><div class="reminder-info"><div class="reminder-name">Sophie Laurent</div><div class="reminder-detail">2 Year Anniversary</div></div><div class="reminder-when">Sep 17</div></div>
    <div class="reminder-row"><div class="reminder-icon" data-kind="birthday">🎂</div><div class="reminder-info"><div class="reminder-name">Michael Halimi</div><div class="reminder-detail">Birthday</div></div><div class="reminder-when">Sep 20</div></div>
  </div>
  <div class="reminders-card">
    <div class="reminders-card-title">Upcoming Time Off</div>
    <div class="upcoming-row"><div class="upcoming-icon-wrap"><span class="icon icon-star icon-14"></span></div><div class="upcoming-date">Sep 12–13</div><div class="upcoming-name">Rosh Hashana</div></div>
    <div class="upcoming-row"><div class="upcoming-icon-wrap"><span class="icon icon-star icon-14"></span></div><div class="upcoming-date">Sep 21</div><div class="upcoming-name">Yom Kippur</div></div>
    <div class="upcoming-row"><div class="upcoming-icon-wrap"><span class="icon icon-star icon-14"></span></div><div class="upcoming-date">Sep 25–Oct 2</div><div class="upcoming-name">Sukkot</div></div>
  </div>
</div>
    <main class="content">
      <div class="content-card-wrap">
        <div class="content-tabs">
  <div class="profile-tab">Information</div>
  <div class="profile-tab">WFH Schedule</div>
  <div class="profile-tab active">Time Off</div>
  <div class="profile-tab">Timesheets</div>
</div>
<div class="ws-panel panel-timeoff active" data-panel="timeoff"><div class="content-inner">
  <div class="timeoff-view timeoff-main">
    <div class="balance-grid">
<div class="balance-card"><div class="bal-icon"><span class="icon icon-calendar-compact icon-22"></span></div><div class="bal-number">7.3</div><div class="bal-name">Annual Leave Available</div><div class="bal-sub"></div><div class="bal-actions"><div class="bal-action-btn" title="Request time off"><span class="icon icon-arrow-up-right icon-14"></span></div><div class="bal-action-btn" title="Calculate balance"><span class="icon icon-calculator icon-14"></span></div></div></div>
<div class="balance-card"><div class="bal-icon"><span class="icon icon-home icon-22"></span></div><div class="bal-number">14</div><div class="bal-name">WFH Used (YTD)</div><div class="bal-sub"></div><div class="bal-actions"><div class="bal-action-btn" title="Request time off"><span class="icon icon-arrow-up-right icon-14"></span></div></div></div>
<!-- … 1 more -->
</div>
    <div class="card" style="margin-top:0;margin-bottom:0">
      <div class="card-header">
        <div style="display:flex;align-items:center;gap:10px"><span class="card-title">Requests</span><div class="req-filter-tabs"><button class="req-tab active">All</button><button class="req-tab">Pending</button><button class="req-tab">Approved</button><button class="req-tab">Denied</button></div></div>
        <button class="btn-primary" style="height:32px;font-size:13px;padding:0 14px"><span class="icon icon-plus-bold icon-13"></span> New Request</button>
      </div>
      <div class="req-list">
<div class="req-table-scroll"><table class="req-table">
  <thead><tr><th style="width:300px">Type</th><th style="width:220px">Date</th><th>Details</th><th style="width:110px;text-align:right">Status</th></tr></thead>
  <tbody>
<tr><td><div class="req-type-cell"><div class="req-icon-sm" data-reqtype="timeoff"><span class="icon icon-request-annual icon-18"></span></div><span class="req-type-title">Annual Leave</span></div></td><td style="white-space:nowrap">Sep 22–23</td><td class="req-sub-cell">Rosh Hashanah holiday</td><td style="text-align:right"><span class="req-status approved">Approved</span></td></tr>
<tr><td><div class="req-type-cell"><div class="req-icon-sm" data-reqtype="location"><span class="icon icon-request-location icon-18"></span></div><span class="req-type-title">Work from Another Office</span></div></td><td style="white-space:nowrap">Sep 8–12</td><td class="req-sub-cell">Dubai · Client meetings</td><td style="text-align:right"><span class="req-status pending">Pending</span></td></tr>
<!-- … 3 more rows -->
</tbody></table></div>
      </div>
    </div>
    <div class="card" style="margin-top:16px;margin-bottom:0">
      <div class="card-header">
        <span class="card-title">History</span>
        <div class="hist-range-picker"><input type="date" class="hist-range-input" value="2019-01-01"><span class="hist-range-sep">–</span><input type="date" class="hist-range-input" value="2026-08-27"><span class="icon icon-calendar icon-16 hist-range-icon"></span></div>
      </div>
      <div class="hist-table-wrap"><div class="hist-table-scroll"><table class="hist-table">
        <thead><tr><th style="width:130px;cursor:pointer">Date <span>↓</span></th><th>Description</th><th style="text-align:right;width:100px">Used (−)</th><th style="text-align:right;width:110px">Earned (+)</th><th style="text-align:right;width:90px">Balance</th></tr></thead>
        <tbody>
<tr><td>22/09/2026</td><td>Company Holiday · Rosh Hashana</td><td class="num">—</td><td class="num">—</td><td class="num">8.30</td></tr>
<tr><td>01/08/2026</td><td>Monthly accrual</td><td class="num">—</td><td class="num pos">+1.25</td><td class="num">8.30</td></tr>
<!-- … 4 more rows -->
</tbody></table></div></div>
    </div>
  </div>
</div></div>
      </div>
    </main>
  </div>
</div>
```
Behaviour: `tabs` (see §5).

#### My Profile: Request Time Off (form page)
Source: employees.html L920-962, L3083-3186; dark L1420-1444

Opened by the arrow button on a balance card (the app toggles `.timeoff-view` / `.timeoff-request-view` with inline display). Hero title 26/800 brand, a form card + a 320px balance sidebar. NOTE the intentional difference to the New Request MODAL (Components → Modals): this page uses `.req-*` controls, the modal uses `.modal-*` controls (owner decision list).

```html
<!-- Request form -->
<nav class="top-nav is-static">
  <div class="nav-left">
    <div class="nav-logo-wrap">
      <svg class="nav-apps-icon" width="24" height="24" viewBox="0 0 24 24"><circle cx="3" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="3" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="3" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="12" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="3" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="12" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="21" cy="21" r="2" fill="none" stroke="#1a1a1a" stroke-width="1.2"/></svg>
      <img src="assets/logo-mark.svg" width="32" height="32" alt="">
      <div class="nav-logo-text"><span class="nav-wordmark">MAKOR X.AI</span><span class="nav-sub">My Profile</span></div>
    </div>
    <div class="nav-links">
      <a class="nav-link active" href="#">My Info</a>
      <a class="nav-link" href="#">People</a>
    </div>
  </div>
  <div class="nav-right">
    <div class="nav-avatar">PR</div>
    <div class="profile-drop">
<!-- … name/email + dark-mode row, see Top nav -->
</div>
  </div>
</nav>
<div class="app-drop">
<!-- … 13 items, see Top nav -->
</div>
<div class="myprofile-view is-visible">
  <div class="body-wrap">
<div class="left-col">
  <aside class="sidebar">
    <div class="sidebar-profile">
      <div class="sp-avatar">RS</div>
      <div class="sp-info"><div class="sp-name">Rachel Sternberg</div><div class="sp-role">Senior Fixed Income Analyst</div></div>
    </div>
    <div class="sidebar-section">
      <div class="sidebar-label">Contact Details</div>
      <div class="sidebar-row"><div class="sidebar-icon"><span class="icon icon-phone icon-14"></span></div><div class="sidebar-text">+1 (212) 555 0147</div></div>
      <div class="sidebar-row"><div class="sidebar-icon"><span class="icon icon-mobile icon-14"></span></div><div class="sidebar-text type-muted">—</div></div>
      <div class="sidebar-row"><div class="sidebar-icon"><span class="icon icon-mail icon-14"></span></div><div class="sidebar-text">rsternberg@makorsecurities.com</div></div>
      <div class="sidebar-row"><div class="sidebar-icon"><span class="icon icon-pencil icon-14"></span></div><div class="sidebar-text">Senior Fixed Income Analyst</div></div>
    </div>
    <div class="sidebar-divider"></div>
    <div class="sidebar-section">
      <div class="sidebar-label">Hire Date</div>
      <div class="sidebar-row"><div class="sidebar-icon"><span class="icon icon-calendar-compact icon-14"></span></div><div class="sidebar-text">Nov 3, 2015<small>10y · 10mo</small></div></div>
    </div>
    <div class="sidebar-divider"></div>
    <div class="sidebar-section">
      <div class="sidebar-label">Manager</div>
      <div class="sidebar-manager"><div class="manager-avatar">LK</div><div><div class="manager-name">Laura Kim</div><div class="manager-role">FX Options Trader</div></div></div>
    </div>
  </aside>
  <div class="reminders-card">
    <div class="reminders-card-title">Upcoming Celebrations</div>
    <div class="reminder-row"><div class="reminder-icon" data-kind="birthday">🎂</div><div class="reminder-info"><div class="reminder-name">Avi Bouhadana</div><div class="reminder-detail">Birthday</div></div><div class="reminder-when">Tomorrow</div></div>
    <div class="reminder-row"><div class="reminder-icon" data-kind="anniversary">🎉</div><div class="reminder-info"><div class="reminder-name">Sophie Laurent</div><div class="reminder-detail">2 Year Anniversary</div></div><div class="reminder-when">Sep 17</div></div>
    <div class="reminder-row"><div class="reminder-icon" data-kind="birthday">🎂</div><div class="reminder-info"><div class="reminder-name">Michael Halimi</div><div class="reminder-detail">Birthday</div></div><div class="reminder-when">Sep 20</div></div>
  </div>
  <div class="reminders-card">
    <div class="reminders-card-title">Upcoming Time Off</div>
    <div class="upcoming-row"><div class="upcoming-icon-wrap"><span class="icon icon-star icon-14"></span></div><div class="upcoming-date">Sep 12–13</div><div class="upcoming-name">Rosh Hashana</div></div>
    <div class="upcoming-row"><div class="upcoming-icon-wrap"><span class="icon icon-star icon-14"></span></div><div class="upcoming-date">Sep 21</div><div class="upcoming-name">Yom Kippur</div></div>
    <div class="upcoming-row"><div class="upcoming-icon-wrap"><span class="icon icon-star icon-14"></span></div><div class="upcoming-date">Sep 25–Oct 2</div><div class="upcoming-name">Sukkot</div></div>
  </div>
</div>
    <main class="content">
      <div class="content-card-wrap">
        <div class="content-tabs">
  <div class="profile-tab">Information</div>
  <div class="profile-tab">WFH Schedule</div>
  <div class="profile-tab active">Time Off</div>
  <div class="profile-tab">Timesheets</div>
</div>
<div class="ws-panel panel-timeoff active" data-panel="timeoff"><div class="content-inner">
  <div class="timeoff-request-view" style="display:block">
    <div class="back-link">‹ Back</div>
    <div class="request-page-title">Request Time Off</div>
    <div class="request-layout">
      <div class="request-form-wrap">
        <div class="req-field"><div class="req-date-from-to">
          <div class="req-date-group"><div class="req-label">From <span class="req-star">*</span></div><div class="datepicker-wrap" style="width:100%">
  <div class="datepicker-input-wrap">
    <input type="text" class="datepicker-input req-date-native" placeholder="dd/mm/yyyy" readonly>
    <span class="datepicker-icon"><span class="icon icon-calendar icon-16"></span></span>
  </div>
  <div class="datepicker-cal">
    <div class="dp-header">
      <button class="dp-nav" data-dir="prev"><span class="icon icon-chevron-left icon-14"></span></button>
      <span class="dp-month-label">Mar 1986</span>
      <button class="dp-nav" data-dir="next"><span class="icon icon-chevron-right icon-14"></span></button>
    </div>
    <div class="dp-dayview">
      <div class="dp-weekdays"><div class="dp-wd">Su</div><div class="dp-wd">Mo</div><div class="dp-wd">Tu</div><div class="dp-wd">We</div><div class="dp-wd">Th</div><div class="dp-wd">Fr</div><div class="dp-wd">Sa</div></div>
      <div class="dp-days">
<!-- … 35 day cells -->
</div>
    </div>
    <div class="dp-yearview" style="display:none"><div class="dp-year-grid"></div></div>
  </div>
</div></div>
          <span class="req-date-sep req-date-sep-mid">–</span>
          <div class="req-date-group"><div class="req-label">To <span class="req-star">*</span></div><div class="datepicker-wrap" style="width:100%">
  <div class="datepicker-input-wrap">
    <input type="text" class="datepicker-input req-date-native" placeholder="dd/mm/yyyy" readonly>
    <span class="datepicker-icon"><span class="icon icon-calendar icon-16"></span></span>
  </div>
  <div class="datepicker-cal">
    <div class="dp-header">
      <button class="dp-nav" data-dir="prev"><span class="icon icon-chevron-left icon-14"></span></button>
      <span class="dp-month-label">Mar 1986</span>
      <button class="dp-nav" data-dir="next"><span class="icon icon-chevron-right icon-14"></span></button>
    </div>
    <div class="dp-dayview">
      <div class="dp-weekdays"><div class="dp-wd">Su</div><div class="dp-wd">Mo</div><div class="dp-wd">Tu</div><div class="dp-wd">We</div><div class="dp-wd">Th</div><div class="dp-wd">Fr</div><div class="dp-wd">Sa</div></div>
      <div class="dp-days">
<!-- … 35 day cells -->
</div>
    </div>
    <div class="dp-yearview" style="display:none"><div class="dp-year-grid"></div></div>
  </div>
</div></div>
        </div></div>
        <div class="req-field"><div class="req-label">Time Off Category <span class="req-star">*</span></div><div class="cust-select " style="width:100%">
  <div class="cust-select__trigger has-value"><span class="cust-select__value">Annual Leave</span><span class="icon icon-chevron-down icon-16 cust-select__chevron"></span></div>
  <div class="cust-select__panel">
<div class="cust-select__option selected" data-val="" data-label="Annual Leave">Annual Leave</div>
<div class="cust-select__option" data-val="WFH">WFH</div>
<!-- … 3 more -->
</div>
</div></div>
        <div class="req-field"><div class="req-label">Amount <span class="req-star">*</span></div><div class="req-amount-row"><input class="req-amount-input" type="number" min="0" step="0.5" placeholder="0"><span class="req-amount-unit">days</span></div></div>
        <div class="req-field"><div class="req-label">Note</div><textarea class="req-textarea-to" placeholder="Optional note..."></textarea></div>
        <div class="request-footer"><button class="btn-req-cancel">Cancel</button><button class="btn-req-send">Send Request</button></div>
      </div>
      <div class="request-balance-sidebar">
        <div class="bal-sidebar-header">Balance as of <input type="date" class="bal-sidebar-date" value="2026-09-15"></div>
        <div class="bal-sidebar-item"><div class="bal-sidebar-icon"><span class="icon icon-calendar-compact icon-16"></span></div><div><div class="bal-sidebar-name">Annual Leave</div><div class="bal-sidebar-amount">7.25 days available</div></div></div>
        <div class="bal-sidebar-item"><div class="bal-sidebar-icon"><span class="icon icon-home icon-16"></span></div><div><div class="bal-sidebar-name">WFH</div><div class="bal-sidebar-amount">0 days used (YTD)</div></div></div>
        <div class="bal-sidebar-item"><div class="bal-sidebar-icon"><span class="icon icon-activity icon-16"></span></div><div><div class="bal-sidebar-name">Sickness</div><div class="bal-sidebar-amount">20.5 days available</div></div></div>
        <div class="bal-sidebar-item"><div class="bal-sidebar-icon"><span class="icon icon-calendar-compact icon-16"></span></div><div><div class="bal-sidebar-name">Appointment</div><div class="bal-sidebar-amount">0 hours used (YTD)</div></div></div>
        <div class="bal-sidebar-item"><div class="bal-sidebar-icon"><span class="icon icon-user-sm icon-16"></span></div><div><div class="bal-sidebar-name">Family Event - Other</div><div class="bal-sidebar-amount">0 days used (YTD)</div></div></div>
        <div class="bal-sidebar-item"><div class="bal-sidebar-icon"><span class="icon icon-heart icon-16"></span></div><div><div class="bal-sidebar-name">Family Event - Bereavement</div><div class="bal-sidebar-amount">0 days available</div></div></div>
        <div class="bal-sidebar-item"><div class="bal-sidebar-icon"><span class="icon icon-briefcase-sm icon-16"></span></div><div><div class="bal-sidebar-name">Miscellaneous - Paid</div><div class="bal-sidebar-amount">0 days used (YTD)</div></div></div>
        <div class="bal-sidebar-item"><div class="bal-sidebar-icon"><span class="icon icon-book-open icon-16"></span></div><div><div class="bal-sidebar-name">Training</div><div class="bal-sidebar-amount">0 days used (YTD)</div></div></div>
      </div>
    </div>
  </div>
</div></div>
      </div>
    </main>
  </div>
</div>
```
Behaviour: `datepicker`, `select` (see §5).

## 5. Behaviour (JavaScript) — the DECIDED intended behaviour

All snippets are class-based (no ids), framework-free and are the code running in `showcase.html`. Where the app has a defect, the snippet implements the intended behaviour (bug numbers refer to `build-notes.md`).

### Dark mode toggle

```js
// Dark mode = class "dark" on <body> (the app's own mechanism). Persist like the app: localStorage 'makor-dm'.
function toggleDarkMode(){
  const on = document.body.classList.toggle('dark');
  document.querySelectorAll('.dm-switch').forEach(s => s.classList.toggle('on', on));
  localStorage.setItem('makor-dm', on ? '1' : '0');
}
if (localStorage.getItem('makor-dm') === '1') { document.body.classList.add('dark'); document.querySelectorAll('.dm-switch').forEach(s => s.classList.add('on')); }
```

### Custom select (.cust-select)

```js
// Custom select (.cust-select): class-based, no ids. One open at a time; outside click / Escape close.
// DECIDED (bug #14): do NOT set .modal-body{overflow-y:visible} when a select opens inside a modal.
document.addEventListener('click', e => {
  const trig = e.target.closest('.cust-select__trigger');
  const opt  = e.target.closest('.cust-select__option');
  document.querySelectorAll('.cust-select.open').forEach(s => { if (!trig || trig.parentElement !== s) s.classList.remove('open'); });
  if (trig) trig.parentElement.classList.toggle('open');
  if (opt) {
    const s = opt.closest('.cust-select');
    s.querySelectorAll('.cust-select__option').forEach(o => o.classList.toggle('selected', o === opt));
    s.querySelector('.cust-select__value').textContent = opt.dataset.label || opt.textContent;
    s.dataset.val = opt.dataset.val || '';
    s.querySelector('.cust-select__trigger').classList.toggle('has-value', !!opt.dataset.val);   // "all/none" option -> placeholder colour
    s.classList.remove('open');
    s.dispatchEvent(new CustomEvent('change', { bubbles: true, detail: opt.dataset.val || '' }));
  }
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') document.querySelectorAll('.cust-select.open').forEach(s => s.classList.remove('open')); });
```

### Tabs and filter pills

```js
// Underline tabs (.detail-tab) -> panels (.tab-panel[data-panel]); active state is .active; no animation.
document.addEventListener('click', e => {
  const b = e.target.closest('.detail-tab[data-tab]'); if (!b) return;
  const bar = b.closest('.detail-tabs'), scope = bar.parentElement;
  bar.querySelectorAll('.detail-tab').forEach(x => x.classList.toggle('active', x === b));
  scope.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.dataset.panel === b.dataset.tab));
});
// Profile tabs (.profile-tab) -> .ws-panel[data-panel];  filter pills (.req-tab): one .active per .req-filter-tabs
document.addEventListener('click', e => {
  const t = e.target.closest('.profile-tab[data-tab]');
  if (t) { const bar = t.closest('.content-tabs'), scope = bar.parentElement;
    bar.querySelectorAll('.profile-tab').forEach(x => x.classList.toggle('active', x === t));
    scope.querySelectorAll('.ws-panel').forEach(p => p.classList.toggle('active', p.dataset.panel === t.dataset.tab)); }
  const r = e.target.closest('.req-tab');
  if (r) r.parentElement.querySelectorAll('.req-tab').forEach(x => x.classList.toggle('active', x === r));
});
```

### Sortable table + row selection

```js
// Sortable table header (.emp-table th[data-col]): click sorts; same column toggles direction.
// Icon files: sort-unsorted / sort-asc / sort-desc. Row click selects (.active-row); clicking the active row deselects.
document.addEventListener('click', e => {
  const th = e.target.closest('.emp-table th[data-col]');
  if (th) {
    const tbl = th.closest('table'), asc = !(th.classList.contains('sorted') && th.dataset.dir === 'asc');
    tbl.querySelectorAll('th[data-col]').forEach(h => { h.classList.remove('sorted'); delete h.dataset.dir; h.querySelector('.sort-icon').innerHTML = '<span class="icon icon-sort-unsorted icon-12"></span>'; });
    th.classList.add('sorted'); th.dataset.dir = asc ? 'asc' : 'desc';
    th.querySelector('.sort-icon').innerHTML = '<span class="icon icon-sort-' + (asc ? 'asc' : 'desc') + ' icon-12"></span>';
    const body = tbl.tBodies[0], i = th.cellIndex, rows = [...body.querySelectorAll('tr:not(.group-header-row)')];
    rows.sort((a, b) => a.cells[i].textContent.trim().localeCompare(b.cells[i].textContent.trim()) * (asc ? 1 : -1)).forEach(r => body.appendChild(r));
  }
  const tr = e.target.closest('.emp-table tbody tr:not(.group-header-row)');
  if (tr) { const was = tr.classList.contains('active-row');
    tr.closest('tbody').querySelectorAll('.active-row').forEach(r => r.classList.remove('active-row'));
    if (!was) tr.classList.add('active-row'); }
});
```

### Modals open / close

```js
// Modals (family A .modal-overlay, B .modal-backdrop, C .tt-*-overlay, D .req-success-backdrop): toggle .open.
// Open: <button data-open="#id">; close: [data-close], backdrop click, Escape. Lock page scroll while open.
const openModal  = el => { el.classList.add('open');    document.body.style.overflow = 'hidden'; (el.querySelector('input,select,textarea') || {focus(){}}).focus(); };
const closeModal = el => { el.classList.remove('open'); if (!document.querySelector('.modal-overlay.open,.modal-backdrop.open,.tt-fillall-overlay.open,.tt-confirm-overlay.open')) document.body.style.overflow = ''; };
document.addEventListener('click', e => {
  const o = e.target.closest('[data-open]');  if (o) { openModal(document.querySelector(o.dataset.open)); return; }
  const c = e.target.closest('[data-close]'); if (c) { closeModal(c.closest('.modal-overlay,.modal-backdrop,.tt-fillall-overlay,.tt-confirm-overlay')); return; }
  if (e.target.matches('.modal-overlay.open,.modal-backdrop.open,.tt-fillall-overlay.open,.tt-confirm-overlay.open')) closeModal(e.target);  // backdrop click
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') document.querySelectorAll('.modal-overlay.open,.modal-backdrop.open').forEach(closeModal); });
// NOTE (app behaviour kept): Escape does NOT close .tt-fillall / .tt-confirm / the success popup.
```

### Toast (2800 ms) and success popup

```js
// Toast (.toast): ONE element, .show for 2800 ms. DECIDED: a second call resets the timer (the app lets the first timer fire early).
let toastTimer;
function showToast(msg){
  const t = document.querySelector('.toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}
// Success popup (.req-success-backdrop): same 2800 ms auto-close, fade .25s, no buttons.
function showSuccess(title, sub){
  const b = document.querySelector('.req-success-backdrop');
  b.querySelector('.req-success-title').textContent = title; b.querySelector('.req-success-sub').textContent = sub;
  b.classList.add('open'); setTimeout(() => b.classList.remove('open'), 2800);
}
```

### Nav dropdowns

```js
// Nav dropdowns: avatar toggles .profile-drop, apps icon toggles .app-drop (.open). Outside click closes both. No animation.
document.addEventListener('click', e => {
  if (e.target.closest('.nav-apps-icon')) document.querySelector('.app-drop').classList.toggle('open');
  else if (!e.target.closest('.app-drop')) document.querySelector('.app-drop').classList.remove('open');
  if (e.target.closest('.nav-avatar')) document.querySelector('.profile-drop').classList.toggle('open');
  else if (!e.target.closest('.profile-drop')) document.querySelector('.profile-drop').classList.remove('open');
  if (e.target.closest('.profile-drop-item')) toggleDarkMode();   // whole row is the click target
});
```

### Datepicker

```js
// Datepicker (.datepicker-wrap): the calendar DOM is built by JS. Same CSS for every instance.
// DECIDED: one generic implementation (the app has 3 copies: dp*, rdp*, nedp*). Output format by input placeholder.
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function dpRender(wrap){
  const s = wrap._s, cal = wrap.querySelector('.datepicker-cal'), label = cal.querySelector('.dp-month-label');
  const dayView = cal.querySelector('.dp-dayview'), yearView = cal.querySelector('.dp-yearview');
  if (s.year) {                                     // year grid: 16 years, centre = view year
    label.textContent = 'Select Year'; dayView.style.display = 'none'; yearView.style.display = 'block';
    let h = '', y0 = s.view.getFullYear() - 8;
    for (let y = y0; y < y0 + 16; y++) h += '<div class="dp-year-item' + (s.date && y === s.date.getFullYear() ? ' selected' : '') + '" data-y="' + y + '">' + y + '</div>';
    yearView.querySelector('.dp-year-grid').innerHTML = h; return;
  }
  const y = s.view.getFullYear(), m = s.view.getMonth(), first = new Date(y, m, 1).getDay(), n = new Date(y, m + 1, 0).getDate(), prev = new Date(y, m, 0).getDate(), t = new Date();
  label.textContent = MONTHS[m] + ' ' + y; dayView.style.display = 'block'; yearView.style.display = 'none';
  let h = '';
  for (let i = 0; i < first; i++) h += '<div class="dp-day other-month" data-d="' + [y, m - 1, prev - first + i + 1] + '">' + (prev - first + i + 1) + '</div>';
  for (let d = 1; d <= n; d++) {
    const sel = s.date && d === s.date.getDate() && m === s.date.getMonth() && y === s.date.getFullYear();
    const tod = d === t.getDate() && m === t.getMonth() && y === t.getFullYear();
    h += '<div class="dp-day' + (sel ? ' selected' : tod ? ' today' : '') + '" data-d="' + [y, m, d] + '">' + d + '</div>';
  }
  for (let i = 1; i <= (7 - (first + n) % 7) % 7; i++) h += '<div class="dp-day other-month" data-d="' + [y, m + 1, i] + '">' + i + '</div>';
  dayView.querySelector('.dp-days').innerHTML = h;
}
document.addEventListener('click', e => {
  const wrap = e.target.closest('.datepicker-wrap');
  document.querySelectorAll('.datepicker-cal.open').forEach(c => { if (!wrap || !wrap.contains(c)) c.classList.remove('open'); });
  if (!wrap) return;
  const w = wrap, s = w._s = w._s || { view: new Date(), date: null, year: false }, cal = w.querySelector('.datepicker-cal');
  if (e.target.closest('.datepicker-input-wrap')) { s.year = false; dpRender(w); cal.classList.toggle('open'); return; }
  if (!cal.contains(e.target)) return;
  const nav = e.target.closest('.dp-nav'), lab = e.target.closest('.dp-month-label'), day = e.target.closest('.dp-day'), yr = e.target.closest('.dp-year-item');
  if (nav) { const dir = nav.dataset.dir === 'prev' ? -1 : 1; s.year ? s.view.setFullYear(s.view.getFullYear() + 16 * dir) : s.view.setMonth(s.view.getMonth() + dir); dpRender(w); }
  if (lab) { s.year = !s.year; dpRender(w); }
  if (yr)  { s.view.setFullYear(+yr.dataset.y); s.year = false; dpRender(w); }
  if (day) { const [Y, M, D] = day.dataset.d.split(',').map(Number); s.date = new Date(Y, M, D);
    w.querySelector('.datepicker-input').value = String(D).padStart(2,'0') + '/' + String(s.date.getMonth() + 1).padStart(2,'0') + '/' + s.date.getFullYear();
    w.querySelector('.datepicker-input').classList.add('has-date'); cal.classList.remove('open'); }
});
```

### Phone-code picker

```js
// Phone-code picker (.phone-code-wrap): .open on the wrap shows the list; picking copies flag + code to the button.
document.addEventListener('click', e => {
  const btn = e.target.closest('.phone-code-btn'), opt = e.target.closest('.phone-code-opt');
  document.querySelectorAll('.phone-code-wrap.open').forEach(w => { if (!btn || btn.parentElement !== w) w.classList.remove('open'); });
  if (btn) btn.parentElement.classList.toggle('open');
  if (opt) { const w = opt.closest('.phone-code-wrap');
    w.querySelectorAll('.phone-code-opt').forEach(o => o.classList.toggle('selected', o === opt));
    w.querySelector('.phone-flag').textContent = opt.querySelector('.opt-flag').textContent;
    w.querySelector('.phone-code-val').textContent = opt.querySelector('.opt-code').textContent;
    w.classList.remove('open'); }
});
```

### Save bar / dirty tracking

```js
// Save bar (My Info): appears on the FIRST change (there is no edit toggle); Save hides it + toast; Discard resets the form
// DECIDED: Discard restores the initial values (the app calls location.reload()).
document.addEventListener('input', e => { const f = e.target.closest('[data-dirty]'); if (f) f.querySelector('.save-bar').classList.add('visible'); });
document.addEventListener('click', e => {
  const bar = e.target.closest('.save-bar'); if (!bar) return;
  if (e.target.closest('.btn-save-bar')) { bar.classList.remove('visible'); showToast('Changes saved'); }
  if (e.target.closest('.btn-discard-bar')) { bar.classList.remove('visible'); bar.closest('[data-dirty]').querySelectorAll('input,select').forEach(i => { if (!i.readOnly) i.value = i.defaultValue; }); }
});
```

### Tiles, rows, WFH calendar, TT fill bar

```js
// Row / tile selection helpers.
// Request-type tiles (.req-type-btn): one .selected per grid. WFH preference days: native checkbox inside .wfh-day-check (display:none) drives the box.
document.addEventListener('click', e => { const b = e.target.closest('.req-type-btn'); if (b) b.parentElement.querySelectorAll('.req-type-btn').forEach(x => x.classList.toggle('selected', x === b)); });
// Pool / time-tracking rows: .active (.pool-row) / .tt-selected (.tt-data-row); clicking the active one deselects.
document.addEventListener('click', e => {
  const r = e.target.closest('.pool-row, .tt-data-row'); if (!r) return;
  const cls = r.classList.contains('pool-row') ? 'active' : 'tt-selected', was = r.classList.contains(cls);
  r.parentElement.querySelectorAll('.' + cls).forEach(x => x.classList.remove(cls)); if (!was) r.classList.add(cls);
});
// WFH calendar: every weekday cell carries a status pill (data-default = the recurring preference).
// Click: no override -> the opposite of the default; override wfh -> office; override office -> back to the default. Weekends / .faded do nothing.
document.addEventListener('click', e => {
  const c = e.target.closest('.wfh-cell:not(.weekend):not(.faded)'); if (!c) return;
  const def = c.dataset.default || 'office', cur = c.dataset.override;
  const next = !cur ? (def === 'wfh' ? 'office' : 'wfh') : cur === 'wfh' ? 'office' : null;
  if (next) c.dataset.override = next; else delete c.dataset.override;
  const st = next || def, p = c.querySelector('.wfh-status-pill');
  p.className = 'wfh-status-pill ' + st; p.textContent = st === 'wfh' ? 'WFH' : 'Office';
});
// Missing day in the TT calendar opens the fill bar: .tt-fill-bar.open
document.addEventListener('click', e => {
  const m = e.target.closest('.tt-cal-cell.cc-missing'); if (m) { const bar = m.closest('.tt-detail-scroll').querySelector('.tt-fill-bar'); bar.querySelector('.tt-fill-lbl').textContent = m.querySelector('.cc-date').textContent; bar.classList.add('open'); }
  if (e.target.closest('.tt-fill-cancel')) e.target.closest('.tt-fill-bar').classList.remove('open');
});
```

### Timesheet entry modal (formatTime / total / .ready)

```js
// Timesheet entry modal: "save" is disabled-looking until every row is valid, then .ready is added (see .btn-save.ready).
// Time inputs auto-insert ':' after 2 digits (formatTime); total = sum of (end - start) with AM/PM -> minutes.
function formatTime(i){ let v = i.value.replace(/\D/g,''); if (v.length > 2) v = v.slice(0,2) + ':' + v.slice(2,4); i.value = v; }
function minutes(t, ap){ const [h, m] = t.split(':').map(Number); if (isNaN(h) || isNaN(m) || m > 59) return null; return ((ap === 'PM' && h !== 12 ? h + 12 : ap === 'AM' && h === 12 ? 0 : h) * 60) + m; }
function updateTotal(modal){
  let total = 0, ok = true;
  modal.querySelectorAll('.entry-row').forEach(r => { const i = r.querySelectorAll('.time-input'), s = r.querySelectorAll('.ampm-select');
    const a = minutes(i[0].value, s[0].value), b = minutes(i[1].value, s[1].value); if (a !== null && b !== null && b > a) total += b - a; else ok = false; });
  modal.querySelector('.modal-day-total strong').textContent = Math.floor(total/60) + 'h ' + String(total%60).padStart(2,'0') + 'm';
  modal.querySelector('.btn-save').classList.toggle('ready', ok && total > 0);
}
```

### Tooltip (EXTENDED)  `EXTENDED`

```js
// Tooltip (EXTENDED): shows .tooltip above any [data-tip] on hover / keyboard focus (replaces the native title attribute).
const tip = Object.assign(document.createElement('div'), { className: 'tooltip' }); document.body.appendChild(tip);
function showTip(el){ tip.textContent = el.dataset.tip; const r = el.getBoundingClientRect(); tip.style.left = (r.left + scrollX) + 'px'; tip.style.top = (r.top + scrollY - 32) + 'px'; tip.classList.add('is-visible'); }
document.addEventListener('mouseover', e => { const t = e.target.closest('[data-tip]'); if (t) showTip(t); });
document.addEventListener('focusin',  e => { const t = e.target.closest('[data-tip]'); if (t) showTip(t); });
document.addEventListener('mouseout', e => { if (e.target.closest('[data-tip]')) tip.classList.remove('is-visible'); });
document.addEventListener('focusout', e => { if (e.target.closest('[data-tip]')) tip.classList.remove('is-visible'); });
```

### Behaviour facts kept from the app (no code needed)
- Employee list: filters AND-combined (search matches name / role / department); the count in the title = filtered length; group by Department / Office / Division renders `.group-header-row` (keys sorted alphabetically; Division = Front Office (Equities, Fixed Income) / Technology / Middle Office (Operations, Compliance) / Back Office).
- Selecting a row opens the detail pane and always resets to the Overview tab; clicking the active row deselects and shows `.detail-empty`.
- Pool toolbar selects: in the app JS sets an inline trigger width = widest option + 48px (the DS keeps the CSS class widths 138 / 120 / 112); filters repopulate on open.
- Escape closes: apps menu, request / timesheet / calculator / employee modals, quick card, fill modal, pool modals; it does NOT close `.tt-fillall`, `.tt-confirm` or the success popup.
- Directory: clicking a ROW opens the quick card (not hover); the "Reports to" link jumps to the manager row and flashes it with `.dir-row-highlight` (`dir-flash` 1.4s ease-out).
- Time Off history: date column toggles order; range inputs filter rows by their dd/mm/yyyy text.
- WFH: weekday cells cycle default → override; weekends / filler cells ignore clicks; Save / Reset / Request Approval start disabled.

## 6. `data-dept` / `data-reqtype` usage (replaces the app's inline JS colours)

```html
<span class="dept-badge" data-dept="Equities">Equities</span>
<span class="dept-badge" data-dept="Equities" data-inactive="true">Equities</span>   <!-- grey, both themes (bug #2) -->
<span class="dept-badge">Legal</span>                                              <!-- unknown dept: grey fallback -->
<span class="drawer-dept-badge" data-dept="Technology">Technology</span>
<div class="rv-type-icon" data-reqtype="annual"><span class="icon icon-request-annual icon-16"></span></div>
<div class="req-icon-sm" data-reqtype="timeoff"><span class="icon icon-request-annual icon-18"></span></div>
<div class="req-type-icon-lg" data-reqtype="location"><span class="icon icon-request-location icon-18"></span></div>
<div class="reminder-icon" data-kind="birthday">🎂</div>
```

| attribute | light bg / text | dark bg / text |
|---|---|---|
| data-dept="equities" | #cad8f4 / #2456a0 | rgba(99,152,255,0.16) / #7aabff |
| data-dept="fixed-income" | #c1ecf0 / #0d6e7a | rgba(45,212,191,0.14) / #2dd4bf |
| data-dept="technology" | #c8f0e0 / #0d7a5f | rgba(52,211,153,0.14) / #4ade80 |
| data-dept="operations" | #fce8d0 / #a35c18 | rgba(251,146,60,0.16) / #fb923c |
| data-dept="compliance" | #f0eafc / #6e42a0 | rgba(167,139,250,0.16) / #a78bfa |
| data-dept="finance" | #d8eef8 / #1a5a7a | rgba(96,186,240,0.16) / #60baf0 |
| data-dept="unknown" | #f5f5f8 / #7c8dac | rgba(255,255,255,0.06) / #505a6c |
| data-dept="inactive" | #e5e7ec / #a8b6cd | rgba(255,255,255,0.06) / #505a6c |
| pool-badge.holders | #cad8f4 / #2456a0 | rgba(99,152,255,0.16) / #7aabff |
| pool-badge.members | #c1ecf0 / #0d6e7a | rgba(34,211,238,0.16) / #22d3ee |

| `.rv-type-icon[data-reqtype]` (HR requests, 30px) | light bg / icon | dark bg / icon |
|---|---|---|
| annual | #eff6ff / #2563eb | rgba(37,99,235,0.16) / #60a5fa |
| sick | #fef2f2 / #dc2626 | rgba(220,38,38,0.16) / #f87171 |
| wfh | #ecfdf5 / #059669 | rgba(5,150,105,0.16) / #4ade80 |
| location | #f0f4ff / #3b5fc0 | rgba(124,58,237,0.16) / #c4b5fd |
| default (derived light) | #f5f5f8 / #7c8dac | rgba(255,255,255,0.06) / #8a97aa |

| `.req-icon-sm[data-reqtype]` (My Profile, 28px) | light bg / icon | dark bg / icon |
|---|---|---|
| timeoff | #eff6ff / #1d4ed8 | rgba(37,99,235,0.16) / #60a5fa |
| sick | #fef2f2 / #da4d43 | rgba(220,38,38,0.16) / #f87171 |
| location | #f5f3ff / #7c3aed | rgba(124,58,237,0.16) / #c4b5fd |
| default (derived light) | #f5f5f8 / #7c8dac | rgba(255,255,255,0.07) / #8a97aa |

The two request palettes DIFFER on purpose (annual #2563eb vs timeoff #1d4ed8, sick #dc2626 vs #da4d43, location #3b5fc0 vs #7c3aed) - both are what the app renders.

## 7. EXTENDED table (everything below is NOT in the app; derivation uses existing tokens only)

| # | name | what | derivation |
|---|---|---|---|
| 1 | Keyboard focus ring | `:focus-visible` on button / a[href] / [role] / [tabindex] | brand colour, 2px (`--border-width-thick`), offset 2, radius untouched (the app has 0 `:focus-visible`, 22 `outline:none`) |
| 2 | `.is-invalid`, `.field-error` | invalid input + message | border = `--color-danger-strong` (the app's inline #dc2626); text = `--color-danger-text` at `.field-note` size |
| 3 | Disabled text inputs / selects | `:disabled` / `.is-disabled` | `.readonly-field` palette + not-allowed |
| 4 | `.tooltip` | label bubble | toast colours at 12px/500 |
| 5 | `.spinner`, `.skeleton` | loading | control border + brand arc / fill-neutral pulse; 1.4s = `--duration-flash` |
| 6 | `.checkbox`, `.radio` | selection controls | `.wfh-day-box` recipe (1.5px border, brand when checked, hover-strong), check = `assets/check.svg` |
| 7 | `.tag`, `.tag-remove` | removable chip | record-badge fill + `.inline-list-item-remove` |
| 8 | `.alert-success/danger/warning/info` | inline banner | status bg/text pairs |
| 9 | `.progress` | bar | mini-bar tokens |
| 10 | `.pagination`, `.page-btn` | pager | `.wfh-nav-btn` / `.req-tab.active` |
| 11 | `.breadcrumb` | trail | `.back-link` colours |
| 12 | `.file-drop` | upload zone | control border (dashed) + brand hover |
| 13 | `.theme-light/.theme-dark`, `.scroll-thin*`, `.is-*`, `.icon*`, `.avatar-NN`, `.type-*` | DS utilities | existing tokens only |
| 14 | `.top-nav.is-static` | nav embedded in a documentation page | same box, `position:relative` |
| 15 | Row `:focus-visible` | brand ring on rows / cells / pills | PART 1 ring but INSET (-2px offset): rows sit in overflow:hidden cards |
| 16 | `.state-empty / .state-loading / .state-error` | empty / loading / error panels | `.rv-empty` recipe; loading = `.spinner`; error = `--color-danger-text` |
| 17 | `.emp-table tr.emp-empty` | "no results" row | `.rv-empty` message in a full-width cell |
| 18 | `.skeleton-row .skeleton` | loading rows in emp / tt / rv tables | `.skeleton` in the standard cell padding |
| 19 | `.cust-select.is-invalid`, `.phone-input-wrap.is-invalid`, `*.is-invalid:focus` | invalid composite controls | `.is-invalid` border = `--color-danger-strong`; focus keeps danger |
| 20 | `.is-scroll-x` + responsive guidance | opt-in `overflow-x:auto` | NO breakpoint invented (nav 74, gutters 210, table >= ~2200px) |

Every EXTENDED rule in `components.css` is preceded by `/* EXTENDED — not in app: … */`; the showcase marks each with an "Extended" badge.

## 8. Desktop-only (no `@media`) and the table-width constraint

The app has **zero `@media` rules** and no `prefers-*` queries; the layout is desktop-only: fixed 74px top nav, **210px page gutters at every width**, a 54 / 46 split (`.split-left` 54%), no sidebar. No breakpoint is defined or invented here either.

**Employee table constraint (documented limitation, bug #28)**: `.emp-table` is `table-layout:fixed` with five fixed pixel columns (140 + 200 + 110 + 130 + 100 = 680px) plus a 10px scrollbar gutter, so the flexible Employee column is `0.54 × (W − 422) − 715` px:

| viewport W | Employee column |
|---|---|
| 1280 / 1440 | 0 px (names invisible; header 680px wide in a 514px box, Hire Date / Status clipped) |
| 1920 | ≈ 94 px (avatar + a few px of the name) |
| 2200 | ≈ 245 px |
| 2560 | ≈ 440 px |

Design for **≥ ~2200px** wide viewports, or put the screen in a container with `.is-scroll-x` (EXTENDED, opt-in `overflow-x:auto`). The proper fix belongs in the app. Frame adaptations in the showcase (`100vh` → 1080px) are chrome only and are not part of the components.

## 9. Known source bugs

42 defects of `employees.html` are documented (file + line + chosen intended behaviour) in `showcase.html` → "Known source bugs & decisions", in `CLAUDE.md` (summary) and in `../html-spec/build-notes.md`. Rule: **document, don't reproduce**. Three dark values have no source and are GUESSED (flagged for the owner): the switch off-track `rgba(255,255,255,0.07)`, the calendar out-of-period text `#2a3548`, the `dir-flash` dark tint `rgba(12,184,208,0.15)`.

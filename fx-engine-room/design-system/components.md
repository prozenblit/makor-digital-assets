# FX Engine Room — components.md

Copy-paste HTML for every component / pattern, with behaviour notes. Source of truth: Figma file `yuJA7DtjFKnqTZQcu2vKYN`, page "Page 1", Section 3 (`7114:14467`); values quoted from `figma-spec/*.md`. Live reference: `showcase.html` (same markup, all states). Anything the design does not draw is marked **EXTENDED** (derived only from existing tokens) — full table at the end. Generated 2026-10-14.

## 0. Setup

```html
<link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,500;0,600;1,500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components.css">   <!-- paths to assets/ are relative to this file -->
```

- Dark mode only, desktop only, no framework. Class names follow the Figma component names (`.btn`, `.input`, `.select`, `.search`, `.tab`, `.switch`, …). Forced state classes exist for documentation (`.is-hover .is-focus .is-active .is-disabled .is-checked .is-indeterminate .is-on`); real pseudo-classes (`:hover :focus-visible :active :disabled :checked`) work.
- **Surface-aware inputs.** Figma's library field fill is #39393C but screens re-fill one step lighter than the surface behind: put `.surface-page` / `.surface-panel` (fields #242428), `.surface-modal` / `.surface-popover` (#39393C) or `.surface-inner` (#242428, panels inside modals) on the container — they set the background AND `--input-fill` / `--checkbox-fill`. Shell, modal, widget, filter and auth containers already do it.

### 0.1 REQUIRED: `text-box: trim-both` (Chrome 133+ / Safari 18.2+)
Figma text boxes are **cap-height boxes** (leading-trim CAP_HEIGHT, line-height AUTO): a 14px text node is 10 high, 12px → 8, 18px → 13, 24px → 17. Loose text that Figma positions by those boxes (page title, entity title, modal title, section/field labels, value boxes, rules box, widget titles…) uses `text-box: trim-both cap alphabetic` in CSS (`.text-trim` utility; already baked into the pattern classes), so cap-to-cap margins equal Figma. **Without browser support these texts render about 5px lower** than the design (controls with fixed heights and centred content are unaffected: error ≤ 0.4px). Verified in Chrome 155. Detect and warn:

```js
if (!CSS.supports('text-box', 'trim-both')) { /* show a banner / accept ~5px offset */ }
```

### 0.2 Icons
Never redraw or hand-write icon paths — use the exported files in `assets/` (node ids and colours in `assets/MANIFEST.md`; every file is shown in the showcase gallery).

```html
<!-- monochrome, recolourable via `color` (mask of the .currentColor.svg twin; size = Figma node size, override with --icon-w/--icon-h) -->
<i class="icon icon-search"></i>
<i class="icon icon-edit-pencil" style="color: var(--color-action-edit)"></i>
<!-- fixed-colour / multi-colour exports: background-image, never recoloured -->
<i class="asset asset-add-button-orange"></i>
<!-- logos and anything else: plain <img> -->
<img src="assets/logo-fxer-stacked-purple.svg" width="52" alt="FX Engine Room">
<!-- flags (5 exported; 16x12 r2, .flag-us is 20x16) -->
<i class="flag flag-au"></i>
```

**TODO assets (not exported from Figma, never hand-draw):** Blotters sidebar status glyph (two 24x24 icons at y936 #FFDC51 / y976 #707079 — `.nav-item--status-yellow|grey` colours are ready), the Prices-toggle 16x16 glyph (3107:7158; `.btn-toggle` icon slot left empty), the right-click menu glyphs for "Copy Lucera Link ID" / "Copy Trade IDs" / "Status" (only the download tray exists), plus-sign 12x12 and small-search 12x12 as separate files (they exist only inside composite assets).

### 0.3 Tokens in one glance
Named Figma variables: `--color-primary-purple` #A4A4FF, `--color-primary-text` #FFFFFF, `--color-secondary-text` #707079, `--color-light-grey-text` #BABEC7, `--color-bg` #000000, `--color-bg-grey-1` #171719, `--color-modal-bg` #242428, `--color-menu-bar` / `--color-separators` / `--color-inputs-on-modal` #39393C, `--color-add-new` #30F0D6, `--color-edit` #FF9747, `--color-delete` #FF7272, `--color-active` #2BDF68, `--color-cancel-button` #E6E6E6. Roles: `--color-surface-*`, `--color-input-*`, `--color-border-*`, `--color-text-*`, `--color-action-*`, `--color-status-*`. Type: `font: var(--type-<role>)` (22 tuples, Nunito only). See `tokens.css` / the showcase.


---

## Buttons

All text buttons: 32px high (24 / 20 for the small families), hug width, SemiBold 14 (12) label — black on filled, coloured on outlined — gap 10 (8 outlined), padding 11/24. Hover is a white overlay or a tinted solid fill. Click any caption to copy that variant.

### Primary button — purple

**Figma:** set "Purple" 4398:15428: Default 4398:15429, hover 4398:15432 (#A4A4FF + #FFFFFF@0.3), disabled 4398:15435 (#707079 / label #BABEC7). Screens: New/Add instance with fill override #A4A4FF ("Save Changes" 139x32, "Log In" 216x32); label stays black SemiBold 14. 32px high, hug width, r4.

Status: **Figma-defined** (states marked EXTENDED below are not drawn in Figma).

`.btn` alone is already the purple primary; `.btn-primary` is the explicit alias. Real `:hover` / `:active` / `:focus-visible` / `:disabled` work; `.is-hover` etc. only force the look for documentation.

```html
<!-- Default -->
<button type="button" class="btn btn-primary">Save Changes</button>

<!-- Hover -->
<button type="button" class="btn btn-primary is-hover">Save Changes</button>

<!-- Pressed — EXTENDED: pressed = hover layers + black@0.2 shade (csv hover overlay value) -->
<button type="button" class="btn btn-primary is-active">Save Changes</button>

<!-- Disabled -->
<button type="button" class="btn btn-primary" disabled>Save Changes</button>

<!-- Focus — EXTENDED: focus ring = 1px #A4A4FF (brand border colour), offset 2px -->
<button type="button" class="btn btn-primary is-focus">Save Changes</button>
```

### Teal New / Add button

**Figma:** set "New/Add" 4398:15337 (page original 28:23): Default 4398:15338 #30F0D6, Hover 4398:15340 (+ #FFFFFF@0.4), Disabled 4398:15342 (#707079 / #BABEC7). "Add New" 109x32. The LIBRARY default is teal; screens override the fill to purple for the primary action (see Primary button) but modals use teal for Create Deal / Add Permissions / Allocate.

Status: **Figma-defined** (states marked EXTENDED below are not drawn in Figma).

`.btn-teal` and `.btn-add` are aliases.

```html
<!-- Default -->
<button type="button" class="btn btn-teal">Add New</button>

<!-- Hover -->
<button type="button" class="btn btn-teal is-hover">Add New</button>

<!-- Pressed — EXTENDED: pressed = hover layers + black@0.2 shade -->
<button type="button" class="btn btn-teal is-active">Add New</button>

<!-- Disabled -->
<button type="button" class="btn btn-teal" disabled>Add New</button>

<!-- Focus — EXTENDED: focus ring = 1px #A4A4FF, offset 2px -->
<button type="button" class="btn btn-teal is-focus">Add New</button>
```

### Cancel / Close (grey-white)

**Figma:** set "Cancel" 4398:15344 (page original 29:110): Default 4398:15345 #E6E6E6; "Disabled" #1 4398:15347 = #E6E6E6 + #FFFFFF@0.3 (this is really HOVER, mis-named); "Disabled" #2 4398:15349 = #707079 / #BABEC7 (the real disabled). Screens: "Cancel" 92x32, "Close" 84x32, "Back" 79x32, inline "RBS" 48x20 (3661:4811).

Status: **Figma-defined** (states marked EXTENDED below are not drawn in Figma).

The Figma set has two variants both named "Disabled"; the first is the hover look (documented in Known inconsistencies).

```html
<!-- Default -->
<button type="button" class="btn btn-cancel">Cancel</button>

<!-- Hover (Figma "Disabled" #1) -->
<button type="button" class="btn btn-cancel is-hover">Cancel</button>

<!-- Disabled (Figma "Disabled" #2) -->
<button type="button" class="btn btn-cancel" disabled>Cancel</button>

<!-- Close 84x32 -->
<button type="button" class="btn btn-cancel">Close</button>

<!-- Inline 48x20 (3661:4811) -->
<button type="button" class="btn btn-cancel btn-xs">RBS</button>

<!-- Focus — EXTENDED: focus ring = 1px #A4A4FF, offset 2px -->
<button type="button" class="btn btn-cancel is-focus">Cancel</button>
```

### Outlined purple

**Figma:** set "Outlined purple" 4398:15474: Default 4398:15475 (stroke 1 INSIDE #A4A4FF), hover 4398:15477 (fill #39394E), disabled 4398:15479 (stroke #707079, label #BABEC7). r3, gap 8. 24px variant "Clear Filters" 99x24 (7022:14510), "All Cash" 99x24; toolbar "Group" 88x32.

Status: **Figma-defined** (states marked EXTENDED below are not drawn in Figma).

```html
<!-- Default -->
<button type="button" class="btn btn-outline-purple">Group</button>

<!-- Hover -->
<button type="button" class="btn btn-outline-purple is-hover">Group</button>

<!-- Disabled -->
<button type="button" class="btn btn-outline-purple" disabled>Group</button>

<!-- Small 24px -->
<button type="button" class="btn btn-outline-purple btn-sm">Clear Filters</button>

<!-- Focus — EXTENDED: focus ring = 1px #A4A4FF, offset 2px -->
<button type="button" class="btn btn-outline-purple is-focus">Group</button>
```

### Button transparent (tinted purple)

**Figma:** set "Button transparent" 4398:15491: Default 4398:15492 (#39394E), Hover 4398:15494 (#39394E + #FFFFFF@0.2 + stroke 1 INSIDE #A4A4FF), disabled 4398:15496 (#707079 / #BABEC7). r3 gap 8. Screens: "Allocate" 102x32 / 86x24 (4250:17595), "Add New" secondary 109x32 in panel headers (3648:7585 area).

Status: **Figma-defined**.

```html
<!-- Default -->
<button type="button" class="btn btn-transparent">Allocate</button>

<!-- Hover -->
<button type="button" class="btn btn-transparent is-hover">Allocate</button>

<!-- Disabled -->
<button type="button" class="btn btn-transparent" disabled>Allocate</button>

<!-- Small 24px -->
<button type="button" class="btn btn-transparent btn-sm">Allocate</button>
```

### Outlined teal (+ library green)

**Figma:** Screens: stroke+text #30F0D6 {Add New} r3 ("Add Currency" 136x32, "Add Permission" 156x32; instance of 4398:15498 with overrides). LIBRARY set "Button transparent 2" 4398:15498 is raw #00FEA9 (Default 4398:15499, hover fill #1B5244 4398:15501, disabled 4398:15503). Toolbar "Give-Up" 3107:7139 uses the raw #00FEA9.

Status: **Figma-defined** (states marked EXTENDED below are not drawn in Figma).

```html
<!-- Default #30F0D6 -->
<button type="button" class="btn btn-outline-teal">Add Permissions</button>

<!-- Hover — EXTENDED: hover fill = existing variable "Green dark" #264342 (pattern of red/blue/yellow dark) -->
<button type="button" class="btn btn-outline-teal is-hover">Add Permissions</button>

<!-- Disabled -->
<button type="button" class="btn btn-outline-teal" disabled>Add Permission</button>

<!-- Library #00FEA9 default -->
<button type="button" class="btn btn-outline-teal btn-outline-teal--library">Button</button>

<!-- Library hover #1B5244 -->
<button type="button" class="btn btn-outline-teal btn-outline-teal--library is-hover">Button</button>

<!-- Library disabled -->
<button type="button" class="btn btn-outline-teal btn-outline-teal--library" disabled>Button</button>

<!-- Give-Up (toolbar, raw #00FEA9) -->
<button type="button" class="btn btn-outline-teal btn-outline-teal--giveup">Give-Up</button>
```

### With dropdown (split button)

**Figma:** set "With dropdown" 4398:15481: Default 4398:15482 (132x32 #30F0D6 r3 gap 8, chevron 10x5 stroke #000 1.3), hover 4398:15485 (+ #FFFFFF@0.4; drawn r4 / gap 10 = alt geometry), disabled 4398:15488 (#707079 / #BABEC7). 24px: "New Trade" 112x24 (4255:16182). "Generate CSV" 154x32 purple (6878:14782).

Status: **Figma-defined** (states marked EXTENDED below are not drawn in Figma).

```html
<!-- Default -->
<button type="button" class="btn btn-with-dropdown">New Trade<i class="icon icon-chevron-down"></i></button>

<!-- Hover -->
<button type="button" class="btn btn-with-dropdown is-hover">New Trade<i class="icon icon-chevron-down"></i></button>

<!-- Hover — alt geometry (as drawn: r4, gap 10) -->
<button type="button" class="btn btn-with-dropdown is-hover is-hover--alt-geometry">New Trade<i class="icon icon-chevron-down"></i></button>

<!-- Disabled -->
<button type="button" class="btn btn-with-dropdown" disabled>New Trade<i class="icon icon-chevron-down"></i></button>

<!-- Small 24px -->
<button type="button" class="btn btn-with-dropdown btn-sm">New Trade<i class="icon icon-chevron-down"></i></button>

<!-- Purple "Generate CSV" -->
<button type="button" class="btn btn-with-dropdown btn-with-dropdown--purple">Generate CSV<i class="icon icon-download-tray"></i></button>

<!-- Market Side > (never drawn enabled) -->
<button type="button" class="btn btn-market-side">Market Side<i class="icon icon-chevron-down"></i></button>

<!-- Market Side > enabled — EXTENDED: enabled state = library "With dropdown" teal (Figma only draws it grey) -->
<button type="button" class="btn btn-market-side is-ready">Market Side<i class="icon icon-chevron-down"></i></button>
```

### Orange / red filled buttons and 24px set

**Figma:** Orange "Amend" 95x32 / "Resend Link" 126x32 = Primary instance fill #FF9747 {Edit} (2259:1398); "Delete" 91x32 #FF7272 {delete}; 24px: "Amend" 80x24, "Delete" 77x24, New/Add 80x24, Allocate 86x24 (6038:14417 toolbar). Label SemiBold 14 / 12 #000000.

Status: **Figma-defined** (states marked EXTENDED below are not drawn in Figma).

```html
<!-- Amend / Resend 32px -->
<button type="button" class="btn btn-orange">Amend</button>

<!-- Delete 32px -->
<button type="button" class="btn btn-delete">Delete</button>

<!-- Amend 24px -->
<button type="button" class="btn btn-orange btn-sm">Amend</button>

<!-- Delete 24px -->
<button type="button" class="btn btn-delete btn-sm">Delete</button>

<!-- New/Add 24px -->
<button type="button" class="btn btn-teal btn-sm">New Trade</button>

<!-- Orange hover — EXTENDED: hover not drawn: white@0.3 overlay like the other filled buttons -->
<button type="button" class="btn btn-orange is-hover">Amend</button>

<!-- Delete hover — EXTENDED: hover not drawn: white@0.3 overlay -->
<button type="button" class="btn btn-delete is-hover">Delete</button>
```

### Outlined red "Review (12)"

**Figma:** set 6113:14388: Default 6113:14386 (stroke+text #FD7557 {Red 2}), hover 6113:14389 (fill #392C2D {red dark}), active 6136:14340 (fill #5A3834 raw), disabled 6403:14741 (stroke #707079, text #BABEC7). 100x24, r2, gap 4, padding 11/16.

Status: **Figma-defined**.

```html
<!-- Default -->
<button type="button" class="btn btn-sm btn-outline-red"><span>Review</span><span>(12)</span></button>

<!-- Hover -->
<button type="button" class="btn btn-sm btn-outline-red is-hover"><span>Review</span><span>(12)</span></button>

<!-- Active (drawn) -->
<button type="button" class="btn btn-sm btn-outline-red is-active"><span>Review</span><span>(12)</span></button>

<!-- Disabled -->
<button type="button" class="btn btn-sm btn-outline-red" disabled><span>Review</span><span>(12)</span></button>
```

### Outlined blue "Give-Up"

**Figma:** set 6113:14402: wrapper 86x24; stroke+text #60A8FF {blue} r2; hover 6113:14403 = wrapper fill #2A313D {blue dark}. (Hover fill sits on a wrapper in Figma, on the button here.)

Status: **Figma-defined**.

```html
<!-- Default -->
<button type="button" class="btn btn-sm btn-outline-blue">Give-Up</button>

<!-- Hover -->
<button type="button" class="btn btn-sm btn-outline-blue is-hover">Give-Up</button>
```

### Outlined yellow "Group"

**Figma:** set 6113:14409: wrapper 74x24; stroke+text #FEE274 {yellow} r2; Variant2 (hover) 6113:14410 = fill #3A3730 {yellow dark}.

Status: **Figma-defined**.

```html
<!-- Default -->
<button type="button" class="btn btn-sm btn-outline-yellow">Group</button>

<!-- Hover -->
<button type="button" class="btn btn-sm btn-outline-yellow is-hover">Group</button>
```

### status (dropdown chip-button)

**Figma:** set "status" 6765:14816: 96x24 #39394E r3 padding 11/20/11/24 gap 8, label SemiBold 12 #A4A4FF + chevron 10x6; hover 6765:14820 (+ #FFFFFF@0.2); disabled 6765:14823 (no fill, stroke #707079, label STAYS #A4A4FF, chevron #BABEC7 — Figma inconsistency, reproduced).

Status: **Figma-defined**.

```html
<!-- Default -->
<button type="button" class="btn btn-sm btn-status">Status<i class="icon icon-chevron-down-purple-10x6"></i></button>

<!-- Hover -->
<button type="button" class="btn btn-sm btn-status is-hover">Status<i class="icon icon-chevron-down-purple-10x6"></i></button>

<!-- Disabled (quirk reproduced) -->
<button type="button" class="btn btn-sm btn-status" disabled>Status<i class="icon icon-chevron-down-purple-10x6"></i></button>
```

### csv button

**Figma:** set "csv" 6804:14833: Default 6804:14832 61x24 #264A35 r2 gap 4 padding 7/8, icon lucide/upload 16x16 + "CSV" INTER Regular 12 #2BDF68 (the only Inter text in the library); hover 6804:14834 = + #000000@0.2 (drawn 30 high: alt, kept 24).

Status: **Figma-defined**.

```html
<!-- Default -->
<button type="button" class="btn btn-csv"><i class="asset asset-lucide-upload-download-green-16"></i>CSV</button>

<!-- Hover -->
<button type="button" class="btn btn-csv is-hover"><i class="asset asset-lucide-upload-download-green-16"></i>CSV</button>
```

### Icon-only buttons

**Figma:** Edit pencil set 4398:15364 (Default 4398:15365 #FF9747, Hover 4398:15367 #FFBF8E); Trash set 4398:15423 (Default 4398:15424 #FF7272, Hover 4398:15426 + white@0.3); amber "+" 32x24 (5539:15220, 5536:14901, 2514:2892); chip icon buttons 32x32 #39393C r4 / r16 round (3107:7140/7142/7144, 5465:14281), 24x24 (4255:16177).

Status: **Figma-defined** (states marked EXTENDED below are not drawn in Figma).

Edit glyph is the 32x32 asset (pencil at 6,6). Hover colours: edit #FFBF8E (raw), trash adds a white@0.3 layer on the glyph.

```html
<!-- Edit — default -->
<button type="button" class="btn-icon btn-edit" aria-label="Edit"><i class="icon icon-edit-pencil"></i></button>

<!-- Edit — hover -->
<button type="button" class="btn-icon btn-edit is-hover" aria-label="Edit"><i class="icon icon-edit-pencil"></i></button>

<!-- Trash — default -->
<button type="button" class="btn-icon btn-trash" aria-label="Delete"><i class="icon icon-trash-red-32"></i></button>

<!-- Trash — hover -->
<button type="button" class="btn-icon btn-trash is-hover" aria-label="Delete"><i class="icon icon-trash-red-32"></i></button>

<!-- Amber "+" 32x24 -->
<button type="button" class="btn-add-icon" aria-label="Add"></button>

<!-- Amber "+" hover — EXTENDED: hover not drawn: white@0.3 layer -->
<button type="button" class="btn-add-icon is-hover" aria-label="Add"></button>

<!-- Chip 32 square (warning) -->
<button type="button" class="btn-icon-chip" aria-label="Warnings"><i class="icon icon-warning"></i></button>

<!-- Chip 32 round (ungrouped) -->
<button type="button" class="btn-icon-chip btn-icon-chip--round" aria-label="Ungrouped"><i class="asset asset-link-broken-yellow-14"></i></button>

<!-- Chip 24 -->
<button type="button" class="btn-icon-chip btn-icon-chip--24" aria-label="Warnings"><i class="icon icon-warning"></i></button>

<!-- Chip hover — EXTENDED: hover not drawn: white@0.2 layer (status recipe) -->
<button type="button" class="btn-icon-chip is-hover" aria-label="Warnings"><i class="icon icon-warning"></i></button>

<!-- Edit focus — EXTENDED: focus ring = 1px #A4A4FF, offset 2px -->
<button type="button" class="btn-icon btn-edit is-focus" aria-label="Edit"><i class="icon icon-edit-pencil"></i></button>
```

### Tabs

**Figma:** set "Tabs" 4398:15351: Active 4398:15352 (label #FFFFFF, bottom 2px INSIDE #A4A4FF), Hover 4398:15354 (fill #171719 "Grey 2" + same underline), "Not  Active" 4398:15356 (label #BABEC7). Admin 102x42 padding 16/32; screens 32 high padding 12/24 (77 instances); one Activity set text 12 (6059:14340).

Status: **Figma-defined** (states marked EXTENDED below are not drawn in Figma).

Active tab = `.is-active` or `aria-selected="true"`. Tab group: put `.tab` buttons in `.tabs` (flex, bottom aligned).

```html
<!-- Not active -->
<button type="button" class="tab">Client</button>

<!-- Hover -->
<button type="button" class="tab is-hover">Client</button>

<!-- Active -->
<button type="button" class="tab is-active">Client</button>

<!-- 32 high (screens) -->
<button type="button" class="tab tab--32 is-active">Account</button>

<!-- 32 high, Medium 12 (6059:14340) -->
<button type="button" class="tab tab--32 tab--12 is-active">Client</button>

<!-- Focus — EXTENDED: focus ring inset 1px #A4A4FF (keeps the underline readable) -->
<button type="button" class="tab is-focus">Client</button>
```

---

## Fields

Field = 32px, r4, padding 8/12/8/8, gap 8, Regular 14; label Regular 12 #707079 above (44 total); fills are surface-aware (see Foundations).

### Input / Input with label / Input Error

**Figma:** Input 4398:15330 (158x32), Input with label 4398:15325 (158x44, label Regular 12 #707079 at y0, field at y12), Input Error 4398:15332 (158x56: stroke 1 INSIDE #FF7272, "Error message" Regular 12 #FF7272 at y48). Field = 32px, r4, padding 8/12/8/8, gap 8, Regular 14. Fill is SURFACE-AWARE (see Foundations).

Status: **Figma-defined** (states marked EXTENDED below are not drawn in Figma).

Width via `--input-w` (default 158) on the control, or `--field-w` on `.field`; inside `.field` the control fills the field. Use a real `<input class="input">`.

```html
<!-- Input -->
<input class="input" value="Text">

<!-- Placeholder -->
<input class="input" placeholder="Search">

<!-- With label (158x44) -->
<div class="field"><span class="field__label">Label</span><input class="input" value="Text"></div>

<!-- Error (158x56) -->
<div class="field field--error"><span class="field__label">Label</span><input class="input is-error" value="Text"><span class="field__error">Error message</span></div>

<!-- Locked / filled (Vanilla MM) -->
<div class="field"><span class="field__label">Label</span><input class="input is-locked" value="Exercise Style"></div>

<!-- Focus — EXTENDED: focus = inset 1px #A4A4FF stroke at the same radius (error stroke wins) -->
<div class="field"><span class="field__label">Label</span><input class="input is-focus" value="Text"></div>

<!-- Disabled — EXTENDED: disabled = the drawn "locked" look with secondary text -->
<div class="field"><span class="field__label">Label</span><input class="input is-disabled" value="Text" disabled></div>
```

### Search

**Figma:** Search 4398:15301 (158x32, padding 8 all, gap 8, magnifier 16x16 #A4A4FF), Search with label 4398:15305. Entities toolbar 208x32 (3648:7352, fill #242428 on the page), Blotter 205x32, Dropdown-like search-select "Select Client" in modals.

Status: **Figma-defined** (states marked EXTENDED below are not drawn in Figma).

```html
<!-- Search 158 -->
<div class="search"><i class="icon icon-search"></i><input class="input__control" placeholder="Search"></div>

<!-- With label 158x44 -->
<div class="field">
  <span class="field__label">Label</span>
  <div class="search"><i class="icon icon-search"></i><input class="input__control" value="Text"></div>
</div>

<!-- Toolbar 208x32 -->
<div class="search" style="--input-w:208px"><i class="icon icon-search"></i><input class="input__control" placeholder="Search"></div>

<!-- Focus — EXTENDED: focus = inset 1px #A4A4FF -->
<div class="search is-focus"><i class="icon icon-search"></i><input class="input__control" placeholder="Search"></div>
```

### Dropdown (select), Dates, Time, Password

**Figma:** Dropdown 4398:15322 (158x32, caret polygon #A4A4FF), Dropdown with label 4398:15310, Dates 4398:15316 (158x44; calendar 16x16), Time 4398:15438 (89x44; "10:25" + clock), Password set 4398:15443 (Hidden 4398:15444: 10 dots 6x6 #BABEC7 pitch 12 + eye 18x12; Visible 4398:15458: "password12" + eye-off; 216x44).

Status: **Figma-defined** (states marked EXTENDED below are not drawn in Figma).

```html
<!-- Dropdown -->
<button type="button" class="select"><span class="select__value">Text</span><i class="icon icon-caret-down-filled-11x6"></i></button>

<!-- Dropdown with label -->
<div class="field">
  <span class="field__label">Label</span>
  <button type="button" class="select"><span class="select__value">Text</span><i class="icon icon-caret-down-filled-11x6"></i></button>
</div>

<!-- Dates 158x44 -->
<div class="field">
  <span class="field__label">Dates</span>
  <button type="button" class="input-date"><span class="">11/08/2024</span><i class="icon icon-calendar-16"></i></button>
</div>

<!-- Dates (placeholder) -->
<div class="field">
  <span class="field__label">Date Start</span>
  <button type="button" class="input-date"><span class="placeholder">dd/mm/yyyy</span><i class="icon icon-calendar-16"></i></button>
</div>

<!-- Time 89x44 -->
<div class="field field--time">
  <span class="field__label">Time</span>
  <div class="input-time"><span>10:25</span><i class="icon icon-clock-16"></i></div>
</div>

<!-- Password — hidden -->
<div class="field field--password">
  <span class="field__label">Password</span>
  <div class="input-password"><span class="password-dots"></span><i class="icon icon-eye"></i></div>
</div>

<!-- Password — visible -->
<div class="field field--password">
  <span class="field__label">Password</span>
  <div class="input-password"><span>password12</span><i class="icon icon-eye-off"></i></div>
</div>

<!-- Locked -->
<button type="button" class="select is-locked" style="--input-w:78px"><span class="select__value">NY</span><i class="icon icon-caret-down-filled-11x6"></i></button>

<!-- Focus — EXTENDED: focus = inset 1px #A4A4FF -->
<button type="button" class="select is-focus"><span class="select__value">Text</span><i class="icon icon-caret-down-filled-11x6"></i></button>
```

### Chips field, small search, email entry

**Figma:** Chips 4398:15387 (186x44: field padding 4/8 gap 4), Chips with few rows 4398:15369 (186x84: padding 8 wrap, text entry "012345 |"), small filter search 6234:15090 (205x24 r2 icon 12x12), email entry 5536:14921 etc. (282x32, padding 8/4/8/8 + amber "+" flush right).

Status: **Figma-defined**.

```html
<!-- Chips 186x44 -->
<div class="field field--chips">
  <span class="field__label">Label</span>
  <div class="chips-field">
    <span class="chip">12345
    <button type="button" class="chip__close" aria-label="Remove"><i class="icon icon-close-16"></i></button>
    </span>
  </div>
</div>

<!-- Chips multi-row 186x84 -->
<div class="field field--chips" style="--field-w:186px">
  <span class="field__label">Label</span>
  <div class="chips-field chips-field--multi">
    <span class="chip">12345
    <button type="button" class="chip__close" aria-label="Remove"><i class="icon icon-close-16"></i></button>
    </span><span class="chip">67890
    <button type="button" class="chip__close" aria-label="Remove"><i class="icon icon-close-16"></i></button>
    </span><span class="chip">24680
    <button type="button" class="chip__close" aria-label="Remove"><i class="icon icon-close-16"></i></button>
    </span><input class="chips-field__entry" value="012345">
  </div>
</div>

<!-- Small search 205x24 -->
<div class="search input--sm"><i class="icon icon-search"></i><input class="input__control" placeholder="Search"></div>

<!-- Email entry 282x32 -->
<div class="input-email">
  <input class="input__control" placeholder="example@email.com">
  <button type="button" class="btn-add-icon" aria-label="Add"></button>
</div>
```

### Textarea / multi-select box, native select

**Figma:** Add Permissions currencies box 5580:14608 / 5580:14610 (592x72 / 592x34, fill #39393C r4 padding 12/8, Regular 14 white wrapping; not a real textarea in Figma). Native `select.select` and `<textarea>` are form mappings.

Status: **Figma-defined** (states marked EXTENDED below are not drawn in Figma).

```html
<!-- Textarea frame 592x72 — EXTENDED: <textarea> mapping: same box as the drawn frame -->
<textarea class="textarea" rows="3" readonly>CHF, INR, PEN, USD, NZD, DKK, SEK, NOK, PLN, CZK, HUF, TRY, ZAR, MXN, BRL, CLP, COP, SGD, HKD, JPY, AUD, CAD, GBP, EUR, CNH, THB, PHP, IDR, KRW, TWD</textarea>

<!-- Native select — EXTENDED: native select: caret asset as background, same box as .select -->
<select class="select"><option>Spot</option><option>Forwards</option><option>Vanilla Options</option></select>
```

### Dropdown list (open select)

**Figma:** Dropdown list 1971:2821 (158x118): fill #39393C r4 shadow (-2,2,4,0 @0.5); items Regular 14 pitch 26 (y12/38/63/89/115); selected "New York" #A4A4FF; hover/selected row Rectangle 22 158x26 fill #242428; scrollbar 4x102 #707079 track / thumb 4x15 #BABEC7.

Status: **Figma-defined**.

Open/close: toggle `hidden` on the list when the `.select` is clicked; close on outside click / Esc. Selected option gets `.is-selected` (purple text).

```html
<!-- Open list -->
<div class="dropdown-list" role="listbox">
  <button type="button" class="dropdown-list__item is-selected" role="option">New York</button>
  <button type="button" class="dropdown-list__item is-hover" role="option">London</button>
  <button type="button" class="dropdown-list__item" role="option">Tokyo</button>
  <button type="button" class="dropdown-list__item" role="option">Zurich</button>
</div>
```

---

## Selection

Checkbox / radio / switch exactly as drawn (switch knobs are inverted in Figma: ON = knob LEFT).

### Checkbox / deselect-all

**Figma:** set "Checkbox" 4398:15418: Unchecked 4398:15419 (#39393C {Menu bar}), Checked 4398:15421 (#A4A4FF + black tick 12x9 at 2,3); indeterminate "all" 4617:14314; 24x24 hit frames 4617:14314/17/20; deselect all 4398:15505 (38x16: indeterminate box + "(5)" Medium 12 #A4A4FF / outlined empty box). Unchecked fill is bound to 3 variables: Menu bar / Inputs on modal #39393C, Modal BG #242428 (on inner panels).

Status: **Figma-defined** (states marked EXTENDED below are not drawn in Figma).

Real `<input type="checkbox" class="checkbox">`; the tick is the exported asset as background. Indeterminate: set `input.indeterminate = true` or add `.is-indeterminate`.

```html
<!-- Unchecked -->
<input type="checkbox" class="checkbox">

<!-- Checked -->
<input type="checkbox" class="checkbox" checked>

<!-- Indeterminate -->
<input type="checkbox" class="checkbox is-indeterminate">

<!-- Fill: Modal BG (inner panels) -->
<span class="surface-inner" style="padding:8px"><input type="checkbox" class="checkbox"></span>

<!-- Outline (deselect-all empty) -->
<input type="checkbox" class="checkbox checkbox--outline">

<!-- 24x24 hit frame -->
<span class="checkbox-hit"><input type="checkbox" class="checkbox" checked></span>

<!-- Wide 17x16 (alt) -->
<input type="checkbox" class="checkbox checkbox--wide">

<!-- deselect all — trades selected -->
<span class="deselect-all"><input type="checkbox" class="checkbox is-indeterminate"><span>(5)</span></span>

<!-- deselect all — none -->
<span class="deselect-all"><input type="checkbox" class="checkbox checkbox--outline"></span>

<!-- Hover — EXTENDED: hover = white@0.2 layer -->
<input type="checkbox" class="checkbox is-hover">

<!-- Focus — EXTENDED: focus ring 1px #A4A4FF offset 2px -->
<input type="checkbox" class="checkbox is-focus">

<!-- Disabled — EXTENDED: disabled = #707079 stroke -->
<input type="checkbox" class="checkbox" disabled>
```

### Checkbox with label

**Figma:** Modal "Structured"/"PBA" Regular 14 #BABEC7 (checked #FFFFFF, trading.md 4.5); recipient rows Regular 14 #FFFFFF; filter / Widgets-menu labels Medium 12 #FFFFFF; label at box x+24 (gap 8).

Status: **Figma-defined** (states marked EXTENDED below are not drawn in Figma).

```html
<!-- Unchecked (label #BABEC7) -->
<label class="checkbox-field"><input type="checkbox" class="checkbox"><span>Structured</span></label>

<!-- Checked (label #FFFFFF) — EXTENDED: label colour follows the checked state via :has() (Figma draws both colours) -->
<label class="checkbox-field"><input type="checkbox" class="checkbox" checked><span>Structured</span></label>

<!-- White label (recipients) -->
<label class="checkbox-field checkbox-field--white"><input type="checkbox" class="checkbox"><span>mshepley@iclient.com</span></label>

<!-- Filter label (Medium 12) -->
<label class="checkbox-field checkbox-field--filter"><input type="checkbox" class="checkbox" checked><span>HSBC BH EM HSBC</span></label>
```

### Radio

**Figma:** set "Radio Button" 4398:15358 (page original 52:27): 16x16 ellipse, stroke 1 INSIDE #A4A4FF; True adds dot 8x8 #A4A4FF at (4,4). Label Medium 14 #FFFFFF, 8px gap; groups ~32 apart ("Client" / "Market Maker"). Hover/disabled not drawn.

Status: **Figma-defined** (states marked EXTENDED below are not drawn in Figma).

```html
<!-- False -->
<input type="radio" class="radio" name="r1">

<!-- True -->
<input type="radio" class="radio" name="r1" checked>

<!-- Group -->
<div class="radio-row" style="margin:0">
  <label class="radio-field"><input type="radio" class="radio" name="r2"><span>Client</span></label>
  <label class="radio-field"><input type="radio" class="radio" name="r2" checked><span>Market Maker</span></label>
</div>

<!-- Hover — EXTENDED: hover = Purple 2 #39394E tint (outlined-purple hover recipe) -->
<input type="radio" class="radio is-hover">

<!-- Focus — EXTENDED: focus ring -->
<input type="radio" class="radio is-focus">

<!-- Disabled — EXTENDED: disabled = #707079 -->
<input type="radio" class="radio" disabled checked>
```

### Switch / Switch with text

**Figma:** set "Switch" 4398:15402 + "Switch with text" 89:105 (screens instance 89:96): track 32x16 r12; knob 12x12 #FFFFFF. true: track #2BDF68, knob x2, shadow #005F20@0.5; false (named "falce"): track #BABEC7, knob x18 (Switch) / x17 (with text), shadow #515151@0.5. INVERTED as drawn: ON = knob LEFT. With text: 80x16, label at x40 Medium 14 ("Active" #FFFFFF / "Not Active" #BABEC7).

Status: **Figma-defined** (states marked EXTENDED below are not drawn in Figma).

Use `.switch` (+ `<input type=checkbox>`) exactly as drawn: ON = knob on the LEFT. The frame "Switch with text" is 80 fixed; the "Give Up" label overflows it.

```html
<!-- On (knob left, as drawn) -->
<input type="checkbox" class="switch" checked>

<!-- Off (knob right, as drawn) -->
<input type="checkbox" class="switch">

<!-- With text — on -->
<label class="switch-field"><input type="checkbox" class="switch" checked><span>Active</span></label>

<!-- With text — off -->
<label class="switch-field"><input type="checkbox" class="switch"><span>Not Active</span></label>

<!-- Conventional on (alt, NOT Figma) -->
<input type="checkbox" class="switch switch--conventional" checked>

<!-- Conventional off (alt, NOT Figma) -->
<input type="checkbox" class="switch switch--conventional">

<!-- Focus — EXTENDED: focus ring -->
<input type="checkbox" class="switch is-focus">

<!-- Disabled — EXTENDED: disabled = #707079 stroke -->
<input type="checkbox" class="switch" disabled>
```

---

## Chips & tags

Chips, pill chips, DEV tag, status dots.

### Chip, pill chip, DEV tag, status dot

**Figma:** Chip 4398:15389 (82x24 #242428 r12 gap 8 padding 4/8, text Regular 14, close 16x16 #BABEC7); pill chip 7047:14817 (188x32 #39393C r20 padding 4/8/4/16); DEV tag 6984:14477 (81x32 #FFB800@0.15 + stroke #FEE274, "DEV" SemiBold 16); status dots 12x12 (#707079 / #2BDF68), 8x8 blotter (50:35).

Status: **Figma-defined** (states marked EXTENDED below are not drawn in Figma).

```html
<!-- Chip (in a #39393C field) -->
<div class="chips-field" style="--input-w:auto">
  <span class="chip">12345
  <button type="button" class="chip__close" aria-label="Remove"><i class="icon icon-close-16"></i></button>
  </span>
</div>

<!-- Pill chip 188x32 -->
<span class="chip chip--pill">ABN AMRO Bank N.V.
<button type="button" class="chip__close" aria-label="Remove"><i class="icon icon-close-16"></i></button>
</span>

<!-- DEV tag -->
<span class="tag-dev">DEV</span>

<!-- Status dot inactive -->
<span class="status-dot"></span>

<!-- Status dot active -->
<span class="status-dot status-dot--active"></span>

<!-- Status dot 8x8 -->
<span class="status-dot status-dot--active status-dot--sm"></span>

<!-- Chip close hover — EXTENDED: close hover = primary text colour (none drawn) -->
<span class="chip">12345
<button type="button" class="chip__close is-hover" aria-label="Remove"><i class="icon icon-close-16"></i></button>
</span>
```

---

## Overlays

Tooltip, menus, filter popovers, scrollbar, pagination.

### Tooltip

**Figma:** 18 frames "tooltip" (3107:6489, 3107:6491, 4402:16433, 6038:14722): fill #39393C r4, gap 10, padding 11/16, height 32 hug (145/140/191), Regular 14; colour = severity: #FF9747 {Edit} ("Unallocated trade", "Bloomberg Disconnected"), #FFDC51 raw ("Ungrouped trade"). Shadow: effect style (-1,2,4,0 @0.4) default; blotter variant (-2,2,4,1 @0.5). No arrow.

Status: **Figma-defined**.

Show on hover/focus of the trigger; position it yourself (Figma draws no arrow and no placement).

```html
<!-- Default (primary text) -->
<span class="tooltip">Tooltip text</span>

<!-- Warning #FF9747 -->
<span class="tooltip tooltip--warning">Unallocated trade</span>

<!-- Warning "Bloomberg Disconnected" -->
<span class="tooltip tooltip--warning">Bloomberg Disconnected</span>

<!-- Caution #FFDC51 -->
<span class="tooltip tooltip--caution">Ungrouped trade</span>

<!-- Strong shadow (blotter recipe) -->
<span class="tooltip tooltip--warning tooltip--strong-shadow">Unallocated trade</span>
```

### Right-click menu, Widgets menu, user menu

**Figma:** Right-click menu 3107:6493 (183x120 #242428 r8, shadow -2,2,4,1 @0.5; rows 28 pitch, icon 12x12 #BABEC7 at x12 + label Medium 12 at x32; hover rect 3107:6497 #39393C). Widgets menu 6136:14349 (136x96) / 7069:14810 (77x68). User menu "Frame 23" 2277:1379 (134x40 #39393C r4, logout glyph #FF7272 + "Log Out").

Status: **Figma-defined** (states marked EXTENDED below are not drawn in Figma).

TODO (assets): the 12x12 glyphs for "Copy Lucera Link ID", "Copy Trade IDs" and "Status" are not exported (only the download tray exists); the demo keeps an empty 12px slot.

```html
<!-- Right-click menu 183x120 -->
<div class="popover menu">
  <button type="button" class="menu__item"><i class="icon icon-download-tray"></i><span>Download Trade Report</span></button>
  <button type="button" class="menu__item is-hover"><span style="width:12px;flex:none"></span><span>Copy Lucera Link ID</span></button>
  <button type="button" class="menu__item"><span style="width:12px;flex:none"></span><span>Copy Trade IDs</span></button>
  <button type="button" class="menu__item"><span style="width:12px;flex:none"></span><span>Status</span></button>
</div>

<!-- Widgets menu 136x96 -->
<div class="popover menu menu--sm" style="width:136px">
  <button type="button" class="menu__item"><input type="checkbox" class="checkbox" checked><span>Trade Blotter</span></button>
  <button type="button" class="menu__item"><input type="checkbox" class="checkbox" checked><span>Activity Blotter</span></button>
  <button type="button" class="menu__item"><input type="checkbox" class="checkbox" checked><span>Rates</span></button>
</div>

<!-- Widgets menu (older) 77x68 -->
<div class="popover menu menu--sm">
  <button type="button" class="menu__item"><span>Default</span></button>
  <button type="button" class="menu__item is-hover"><span>EFX</span></button>
</div>

<!-- User menu 134x40 -->
<div class="user-menu" role="menu"><i class="icon icon-logout-16"></i><span>Log Out</span></div>

<!-- User menu hover — EXTENDED: hover = white@0.2 layer (none drawn) -->
<div class="user-menu is-hover" role="menu"><i class="icon icon-logout-16"></i><span>Log Out</span></div>

<!-- Menu item focus — EXTENDED: focus ring inset 1px #A4A4FF -->
<div class="popover menu">
  <button type="button" class="menu__item is-focus"><span style="width:12px;flex:none"></span><span>Copy Trade IDs</span></button>
</div>
```

### Filter popovers (checkbox list, dates)

**Figma:** Checkbox-list popover 6544:14756 / 6234:14340 (237x256 #242428 r8, shadow -2,2,4,1 @0.5, padding 16; search 205x24 6234:15090; rows 16 high on a 32 pitch, label Medium 12; first row = deselect-all + "All"). Date variant 6236:14733 (237x136: two Dates 205x44, labels "From"/"To" at (16,16),(16,76), DD/MM/YYYY).

Status: **Figma-defined**.

```html
<!-- Checkbox list 237x256 -->
<div class="filter-panel filter-panel--list">
  <div class="search input--sm"><i class="icon icon-search"></i><input class="input__control" placeholder="Search"></div>
  <label class="filter-row"><span class="deselect-all"><input type="checkbox" class="checkbox checkbox--outline checkbox--fill-inputs-on-modal"></span><span>All</span></label>
  <label class="filter-row"><input type="checkbox" class="checkbox" checked><span>Blanks</span></label>
  <label class="filter-row"><input type="checkbox" class="checkbox"><span>HSBC BH ALPHA HSBC</span></label>
  <label class="filter-row"><input type="checkbox" class="checkbox" checked><span>HSBC BH EM HSBC</span></label>
  <label class="filter-row"><input type="checkbox" class="checkbox" checked><span>HSBC BH LB HSBC</span></label>
  <label class="filter-row"><input type="checkbox" class="checkbox" checked><span>HSBC BH ALPHA HSBC</span></label>
</div>

<!-- Dates 237x136 -->
<div class="filter-panel filter-panel--dates">
  <div class="field">
    <span class="field__label">From</span>
    <button type="button" class="input-date"><span class="">11/08/2024</span><i class="icon icon-calendar-16"></i></button>
  </div>
  <div class="field">
    <span class="field__label">To</span>
    <button type="button" class="input-date"><span class="">24/03/2025</span><i class="icon icon-calendar-16"></i></button>
  </div>
</div>
```

### Filters side panel (Trades Blotter)

**Figma:** Filters 1253:2360 (241x906 #242428 r8, shadow -4,0,6 @0.4): "Filter by" Medium 14 at (16,12); close 18x18 at (211,8); fields x16 w209 pitch 60 from y46: ID, Trade Date, Type, Symbol, Client, Counterparty, Label chips. Superseded in height by the 237x256 popover 6234:14340.

Status: **Figma-defined**.

```html
<!-- Filters 241x906 (clipped to 560 here) -->
<div class="filters-panel">
  <h3 class="filters-panel__title">Filter by</h3>
  <button type="button" class="filters-panel__close" aria-label="Close"><i class="icon icon-close-18"></i></button>
  <div class="field">
    <span class="field__label">ID</span>
    <div class="search"><i class="icon icon-search"></i><input class="input__control" value="Text"></div>
  </div>
  <div class="field">
    <span class="field__label">Trade Date</span>
    <button type="button" class="input-date"><span class="placeholder">dd/mm/yyyy - dd/mm/yyyy</span><i class="icon icon-calendar-16"></i></button>
  </div>
  <div class="field">
    <span class="field__label">Type</span>
    <button type="button" class="select"><span class="select__value">All Types</span><i class="icon icon-caret-down-filled-11x6"></i></button>
  </div>
  <div class="field">
    <span class="field__label">Symbol</span>
    <div class="search"><i class="icon icon-search"></i><input class="input__control" value="Text"></div>
  </div>
  <div class="field">
    <span class="field__label">Client</span>
    <div class="search"><i class="icon icon-search"></i><input class="input__control" value="Text"></div>
  </div>
  <div class="field">
    <span class="field__label">Counterparty</span>
    <div class="search"><i class="icon icon-search"></i><input class="input__control" value="Text"></div>
  </div>
  <div class="field field--chips">
    <span class="field__label">Label</span>
    <div class="chips-field">
      <span class="chip">12345
      <button type="button" class="chip__close" aria-label="Remove"><i class="icon icon-close-16"></i></button>
      </span>
    </div>
  </div>
</div>
```

### Scrollbar

**Figma:** Rectangle 20 (3631:4905, 4243:16268): 4px track r12 #39393C + shadow 0 4 4 @0.25, thumb #707079; 8px (standalone Rates 6234:14341 / 1368x8 blotter, no shadow); tall modal scroll 5580:14620 4x308 r35.61 shadow 0 11.87 11.87. Thumb height/position inline.

Status: **Figma-defined**.

Visual only: it is a drawn track/thumb. For real scrolling keep the native scrollbar and skin it, or drive `.scrollbar__thumb` top/height from the scroll position.

```html
<!-- 4px -->
<div class="scrollbar" style="height:120px">
  <div class="scrollbar__thumb" style="height:40px"></div>
</div>

<!-- 8px -->
<div class="scrollbar scrollbar--8" style="height:120px">
  <div class="scrollbar__thumb" style="height:40px"></div>
</div>

<!-- Tall (modal) -->
<div class="scrollbar scrollbar--tall" style="height:120px">
  <div class="scrollbar__thumb" style="height:60px"></div>
</div>

<!-- Horizontal 8px -->
<div class="scrollbar scrollbar--h" style="width:240px">
  <div class="scrollbar__thumb" style="width:83px"></div>
</div>
```

### Pagination

**Figma:** 3107:6943 / 3107:6946: first/last icon 24x12 (#707079 dimmed), "Page 1" Medium 14 ("Page" #707079, "1" #BABEC7), next chevron 8x12 #BABEC7 (active); centred ~x631..761 in the blotter. Gaps visual estimate. Only "Page 1" is drawn.

Status: **Figma-defined** (states marked EXTENDED below are not drawn in Figma).

```html
<!-- Page 1 (first/prev dimmed) -->
<div class="pagination">
  <button type="button" class="pagination__btn" disabled aria-label="First"><i class="icon icon-pagination-first-last"></i></button>
  <span class="pagination__page">Page <b>1</b></span>
  <button type="button" class="pagination__btn" aria-label="Next"><i class="icon icon-chevron-right-grey-7x12"></i></button>
</div>

<!-- Next hover — EXTENDED: hover = primary text colour (none drawn) -->
<div class="pagination">
  <button type="button" class="pagination__btn" disabled aria-label="First"><i class="icon icon-pagination-first-last"></i></button>
  <span class="pagination__page">Page <b>1</b></span>
  <button type="button" class="pagination__btn" style="color:var(--color-text-primary)" aria-label="Next"><i class="icon icon-chevron-right-grey-7x12"></i></button>
</div>
```

---

## Shell

App frame, sidebar, top bar, breadcrumb, footer, user menu, KPI pill, live pulse. Desktop only; frames are fixed-size.

### Live indicator (pulse)

**Figma:** component set "Animation" 4398:15284 (variants named 4,3,2,1) + instance 38:152 at the footer right; frames: v1 three 8x8 dots / v2 dot 10 + ring 16 @0.2 + dot 12 / v3 dot 10 + rings 30 @0.1, 20 @0.2 / v4 dot 8 + ring 30 @0.05 (+ invisible 40). Prototype loop 3631:3795..3631:3783 (cycle 1.071 s). "Using indicative rates" override fill #FF9747 (6038:13985).

Status: **Figma-defined** (states marked EXTENDED below are not drawn in Figma).

`.live-indicator--loop` follows the Figma prototype timings (hold/transition per frame, EASE_IN / EASE_IN_AND_OUT, final DISSOLVE) and respects `prefers-reduced-motion`.

```html
<!-- Static dot (default) -->
<span class="live-indicator"></span>

<!-- Indicative (orange) -->
<span class="live-indicator live-indicator--indicative"></span>

<!-- Frame v1 -->
<span class="live-indicator live-indicator--v1"></span>

<!-- Frame v2 -->
<span class="live-indicator live-indicator--v2"></span>

<!-- Frame v3 -->
<span class="live-indicator live-indicator--v3"></span>

<!-- Frame v4 -->
<span class="live-indicator live-indicator--v4"></span>

<!-- Loop (prototype timing 1.071 s) -->
<span class="live-indicator live-indicator--loop"></span>

<!-- Loop — indicative -->
<span class="live-indicator live-indicator--indicative live-indicator--loop"></span>

<!-- Pulse ring (1.6 s) — EXTENDED: keyframes 1.6s, ring 8 -> 30, alpha 0.2 -> 0.05 (Figma gives frames, no timing) -->
<span class="live-indicator is-pulse"></span>
```

### Sidebar nav items

**Figma:** Frame 1 "sidebar" 4:5 (56 wide, #39393C {Menu bar}); icons 24x24 at x16, first y72, pitch 56 (menu-tab-1 3107:8345, subtract 3107:8352, csv 3107:8357, deleted-trades 3107:8360, entities 4318:14940, Reports file 6882:15039 24x32 at y352); inactive #BABEC7 {Light grey text}, ACTIVE = glyph recoloured #A4A4FF {Primary purple}. No tile/bar/hover drawn. Settings gear 24x24 (16:133) 16px above the bottom.

Status: **Figma-defined** (states marked EXTENDED below are not drawn in Figma).

TODO (assets): the two Blotters status glyphs (24x24 at y936 #FFDC51 and y976 #707079, `.nav-item--status-yellow` / `--status-grey` colour classes are ready) are NOT exported; never draw them by hand.

```html
<!-- Inactive -->
<a class="nav-item" href="#" aria-label="Dashboard"><i class="icon icon-menu-tab-1"></i></a>

<!-- Active -->
<a class="nav-item is-active" href="#" aria-label="Entities" aria-current="page"><i class="icon icon-entities"></i></a>

<!-- Reports (24x32) -->
<a class="nav-item nav-item--tall is-active" href="#" aria-label="Reports"><i class="icon icon-report-file"></i></a>

<!-- All six, active = Trade Blotter -->
<div style="display:flex;gap:32px">
  <a class="nav-item" href="#" aria-label="menu-tab-1"><i class="icon icon-menu-tab-1"></i></a>
  <a class="nav-item is-active" href="#" aria-label="subtract"><i class="icon icon-subtract"></i></a>
  <a class="nav-item" href="#" aria-label="csv"><i class="icon icon-csv"></i></a>
  <a class="nav-item" href="#" aria-label="deleted-trades"><i class="icon icon-deleted-trades"></i></a>
  <a class="nav-item" href="#" aria-label="entities"><i class="icon icon-entities"></i></a>
  <a class="nav-item nav-item--tall" href="#" aria-label="Reports"><i class="icon icon-report-file"></i></a>
</div>

<!-- Settings -->
<a class="nav-item" href="#" aria-label="Settings"><i class="icon icon-settings"></i></a>

<!-- Hover — EXTENDED: hover -> primary text colour (none drawn) -->
<a class="nav-item is-hover" href="#" aria-label="Dashboard"><i class="icon icon-menu-tab-1"></i></a>

<!-- Focus — EXTENDED: focus ring 1px #A4A4FF offset 2px -->
<a class="nav-item is-focus" href="#" aria-label="Dashboard"><i class="icon icon-menu-tab-1"></i></a>
```

### Top bar

**Figma:** Frame 4 4:8: content width x 56, bottom stroke 1px #39393C INSIDE; title Medium 20 #FFFFFF at x24; user icon 32x32 at 16px from the right (y12) #BABEC7. Dashboard 6038:14703 / 4243:16272: 48 high, title Medium 16 at x20, avatar y8, Dropdown 203x32 at x1117 (gap 16), KPI pill "Group 129" 351x32 #39394E at x750, icon button 32x32 at x702. Blotters 2281:1414: pill x755, dropdown x1122, avatar gap 11 (alt). DEV tag 81x32 at (652,12) on the Trader screen only (6984:14477).

Status: **Figma-defined**.

Top bar is a flex row inside `.app__content`: title left, `.app__topbar-right` pushed right with `margin-left:auto`.

```html
<!-- Standard 56px -->
<div style="width:1384px">
  <header class="app__topbar">
    <h1 class="app__title">Entities</h1>
    <div class="app__topbar-right">
      <button type="button" class="app__user" aria-label="User menu"><i class="icon icon-user"></i></button>
    </div>
  </header>
</div>

<!-- Blotter (KPI pill + dropdown, avatar gap 11 alt) -->
<div style="width:1384px">
  <header class="app__topbar">
    <h1 class="app__title">Trade Blotter</h1>
    <div class="app__topbar-right app__topbar-right--alt-gap-11">
      <div class="kpi-pill"><span class="kpi-pill__label">Option Premium</span><span class="kpi-pill__value">0.00</span><span class="kpi-pill__label">Total P&amp;L</span><span class="kpi-pill__value">3,646.52</span></div>
      <button type="button" class="select topbar-dropdown"><span class="select__value">Makor Securities</span><i class="icon icon-caret-down-filled-11x6"></i></button>
      <button type="button" class="app__user" aria-label="User menu"><i class="icon icon-user"></i></button>
    </div>
  </header>
</div>

<!-- Dashboard 48px (Medium 16) -->
<div class="app--widgets" style="width:1384px">
  <header class="app__topbar">
    <h1 class="app__title">Dashboard</h1>
    <div class="app__topbar-right">
      <button type="button" class="btn-icon-chip" aria-label="Warnings"><i class="icon icon-warning"></i></button>
      <div class="kpi-pill"><span class="kpi-pill__label">Option Premium</span><span class="kpi-pill__value">0.00</span><span class="kpi-pill__label">Total P&amp;L</span><span class="kpi-pill__value">3,646.52</span></div>
      <button type="button" class="select topbar-dropdown"><span class="select__value">Makor Securities</span><i class="icon icon-caret-down-filled-11x6"></i></button>
      <button type="button" class="app__user" aria-label="User menu"><i class="icon icon-user"></i></button>
    </div>
  </header>
</div>

<!-- Trader screen DEV tag -->
<div style="width:1384px;position:relative">
  <header class="app__topbar">
    <h1 class="app__title">Trader</h1>
    <span class="tag-dev app__topbar-center">DEV</span>
    <div class="app__topbar-right">
      <button type="button" class="app__user" aria-label="User menu"><i class="icon icon-user"></i></button>
    </div>
  </header>
</div>
```

### Breadcrumb

**Figma:** items at y73 Medium 18; links #60A8FF {blue} UNDERLINE (1440 frames, 1920 TA), current #BABEC7 no underline; separator chevron 8x14 #BABEC7, gap 8 each side. CANONICAL 1280 Trading Account 4164:14303: links #A4A4FF {Primary purple} at x16 (.breadcrumb--purple). Trader screen: Entities > Bank of America > Traders > Max Shepley (3769:8602).

Status: **Figma-defined** (states marked EXTENDED below are not drawn in Figma).

```html
<!-- Blue links (1440 frames) -->
<nav class="breadcrumb" aria-label="Breadcrumb">
  <a href="#">Entities</a>
  <i class="icon icon-chevron-right-filled"></i>
  <span class="breadcrumb__current">Bank of America</span>
</nav>

<!-- Purple links (1280 canonical) -->
<nav class="breadcrumb breadcrumb--purple" aria-label="Breadcrumb">
  <a href="#">Entities</a>
  <i class="icon icon-chevron-right-filled"></i>
  <a href="#">Bank of America</a>
  <i class="icon icon-chevron-right-filled"></i>
  <span class="breadcrumb__current">RBS EDGE BOA</span>
</nav>

<!-- 4-level (Trader) -->
<nav class="breadcrumb" aria-label="Breadcrumb">
  <a href="#">Entities</a>
  <i class="icon icon-chevron-right-filled"></i>
  <a href="#">Bank of America</a>
  <i class="icon icon-chevron-right-filled"></i>
  <a href="#">Traders</a>
  <i class="icon icon-chevron-right-filled"></i>
  <span class="breadcrumb__current">Max Shepley</span>
</nav>

<!-- Link hover — EXTENDED: link hover = 2px underline, no new colour (none drawn) -->
<nav class="breadcrumb">
  <a href="#" style="text-decoration-thickness:2px">Entities</a>
  <i class="icon icon-chevron-right-filled"></i>
  <span class="breadcrumb__current">Bank of America</span>
</nav>
```

### Footer

**Figma:** Frame 8: 46 high, fill #171719, stroke 1px #39393C TOP INSIDE, AL H padding 8/12 SPACE_BETWEEN; left Makor M 24x19.6 #BABEC7 + "FX Engine Room | Operated by Makor Group" Medium 14 #BABEC7 (gap 11); right pulse 30x30 (right pad 12). Dashboard (6038:13985): fill none, + "Using indicative rates" Medium 14 #707079 and the pulse overridden to #FF9747.

Status: **Figma-defined**.

```html
<!-- Standard (live, loop) -->
<div style="width:1384px">
  <footer class="app__footer">
    <div class="app__footer-brand"><i class="icon icon-makor-m"></i><span>FX Engine Room | Operated by Makor Group</span></div>
    <div class="app__footer-right"><span class="live-indicator live-indicator--loop"></span></div>
  </footer>
</div>

<!-- Dashboard (indicative, no fill) -->
<div style="width:1384px">
  <footer class="app__footer app__footer--clear">
    <div class="app__footer-brand"><i class="icon icon-makor-m"></i><span>FX Engine Room | Operated by Makor Group</span></div>
    <div class="app__footer-right"><span>Using indicative rates</span><span class="live-indicator live-indicator--indicative live-indicator--loop"></span></div>
  </footer>
</div>
```

### Strip: toolbar / tabs (between top bar and body)

**Figma:** Strip y56..104: breadcrumb OR toolbar. Entities toolbar 3648:7348: Search 208x32 at (16,64) fill #242428, "Add New" 109x32 right margin 16. Statics: tabs 42 high at y62 (Client, Market makers, Fixing Sources, Cuts, Currency Pairs, Users; 1254:3638), search/Add New y64.

Status: **Figma-defined**.

```html
<!-- Entities toolbar -->
<div class="app__content" style="position:static;width:1384px;display:block;border-radius:0">
  <div class="app__strip app__strip--toolbar">
    <div class="search toolbar-search"><i class="icon icon-search"></i><input class="input__control" placeholder="Search"></div>
    <button type="button" class="btn btn-teal">Add New</button>
  </div>
</div>

<!-- Statics tabs strip -->
<div class="app__content" style="position:static;width:1384px;display:block;border-radius:0">
  <div class="app__strip app__strip--tabs">
    <div class="tabs">
      <button type="button" class="tab is-active">Client</button>
      <button type="button" class="tab">Market makers</button>
      <button type="button" class="tab">Fixing Sources</button>
      <button type="button" class="tab">Cuts</button>
      <button type="button" class="tab">Currency Pairs</button>
      <button type="button" class="tab">Users</button>
    </div>
    <div class="search toolbar-search"><i class="icon icon-search"></i><input class="input__control" placeholder="Search"></div>
  </div>
</div>
```

### KPI pill

**Figma:** "Group 129" 6038:14704: 351x32 fill #39394E r4; labels Medium 14 #7373BB {Purple 3} at x15 / x183; values Medium 14 #A4A4FF at x127 / x253 ("Option Premium 0.00", "Total P&L 3,646.52").

Status: **Figma-defined**.

```html
<!-- KPI pill -->
<div class="kpi-pill"><span class="kpi-pill__label">Option Premium</span><span class="kpi-pill__value">0.00</span><span class="kpi-pill__label">Total P&amp;L</span><span class="kpi-pill__value">3,646.52</span></div>

<!-- Top-bar dropdown 203x32 (surface-aware #242428) -->
<button type="button" class="select topbar-dropdown"><span class="select__value">Makor Securities</span><i class="icon icon-caret-down-filled-11x6"></i></button>
```

### User menu placement

**Figma:** User menu "Frame 23" 2277:1379 at (1234,48) of the 1384 content frame (right edge 16px from the edge, overlapping the top bar by 8). Component: see Overlays > user menu. Only one item ("Log Out"), no name/e-mail header.

Status: **Figma-defined**.

```html
<!-- Open under the avatar -->
<div class="app__content" style="position:relative;width:1384px;height:110px;display:block;border-radius:0">
  <header class="app__topbar">
    <h1 class="app__title">Static Clients</h1>
    <div class="app__topbar-right">
      <button type="button" class="app__user" aria-label="User menu"><i class="icon icon-user"></i></button>
    </div>
  </header>
  <div class="user-menu app__user-menu" role="menu"><i class="icon icon-logout-16"></i><span>Log Out</span></div>
</div>
```

### App frame (1440x1024)

**Figma:** Frame 1 sidebar 4:5, Frame 2 logo block 4031:18474 (72x56 #A4A4FF; sits UNDER the canvas so the purple shows through the rounded corner), Frame 3 content 4:7 (x56, radius 16/0/0/0, #000000), top bar 4:8, strip, body Frame 7 14:110 (#171719), footer Frame 8 546:320. Entities 3648:7322, Reports 6878:14782, Blotters 2281:1414, widgets 6038:13964.

Status: **Figma-defined**.

Sizes: `.app` default 1440x1024; `.app--1280` 1280x1040 (canonical Trading Account, add `.app--trading-account` for the 16px gutter); `.app--1920` 1920x1080; `.app--widgets` dashboard (48px top bar). Content is desktop-only and not responsive: the frame has a fixed size.

```html
<!-- Empty frame, active = Entities -->
<div class="app">
  <div class="app__sidebar"></div>
  <div class="app__logo"><i class="icon icon-logo-fxer-stacked-black-32x40"></i></div>
  <nav class="app__nav" aria-label="Main">
    <a class="nav-item" href="#" aria-label="Dashboard"><i class="icon icon-menu-tab-1"></i></a>
    <a class="nav-item" href="#" aria-label="Trade Blotter"><i class="icon icon-subtract"></i></a>
    <a class="nav-item" href="#" aria-label="Trade Reports"><i class="icon icon-csv"></i></a>
    <a class="nav-item" href="#" aria-label="Deleted Trades"><i class="icon icon-deleted-trades"></i></a>
    <a class="nav-item is-active" href="#" aria-label="Entities" aria-current="page"><i class="icon icon-entities"></i></a>
    <a class="nav-item nav-item--tall" href="#" aria-label="Reports"><i class="icon icon-report-file"></i></a>
  </nav>
  <div class="app__sidebar-bottom">
    <a class="nav-item" href="#" aria-label="Settings"><i class="icon icon-settings"></i></a>
  </div>
  <div class="app__content">
    <header class="app__topbar">
      <h1 class="app__title">Entities</h1>
      <div class="app__topbar-right">
        <button type="button" class="app__user" aria-label="User menu"><i class="icon icon-user"></i></button>
      </div>
    </header>
    <div class="app__strip">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="#">Entities</a>
        <i class="icon icon-chevron-right-filled"></i>
        <span class="breadcrumb__current">Bank of America</span>
      </nav>
    </div>
    <div class="app__body">
      <div class="app__main">
        <div class="empty-state" style="height:100%">Select a trading account</div>
      </div>
      <footer class="app__footer">
        <div class="app__footer-brand"><i class="icon icon-makor-m"></i><span>FX Engine Room | Operated by Makor Group</span></div>
        <div class="app__footer-right"><span class="live-indicator live-indicator--loop"></span></div>
      </footer>
    </div>
  </div>
</div>
```

---

## Auth

Six auth cards on #000000 (no sidebar/top bar/footer). Card fill #242428, radius 12, no stroke, no shadow.

### Log In / Log In Error

**Figma:** Log In 2211:1942 (card 312x388 {Modal BG} r12, no stroke/shadow, centred on #000000): logo group 52x61.26 at (130,38.51) #A4A4FF; Username field (48,152) 216x44; Password (48,220); "Forgot Password?" (167,272) Regular 12 #A4A4FF UNDERLINE (purple, NOT red); Log In (48,324) 216x32. Log In Error 2211:1835: password box stroke 1 INSIDE #FF7272 + "Incorrect Password" Regular 12 #FF7272 on the same row as the link.

Status: **Figma-defined**.

Not drawn: empty / focus / loading states, 2FA, success after save.

```html
<!-- Log In (312x388) -->
<div class="auth-card auth-card--login">
  <i class="icon icon-logo-purple-login auth-logo" role="img" aria-label="FX Engine Room"></i>
  <div class="auth-field-stack">
    <div class="field"><span class="field__label">Username</span><input class="input" value="mshepley"></div>
    <div class="field field--password">
      <span class="field__label">Password</span>
      <div class="input-password"><span class="password-dots"></span><i class="icon icon-eye"></i></div>
    </div>
  </div>
  <div class="auth-row">
    <span></span>
    <a class="auth-link" href="#">Forgot Password?</a>
  </div>
  <button type="button" class="btn btn-primary btn-block">Log In</button>
</div>

<!-- Log In Error -->
<div class="auth-card auth-card--login">
  <i class="icon icon-logo-purple-login auth-logo" role="img" aria-label="FX Engine Room"></i>
  <div class="auth-field-stack">
    <div class="field"><span class="field__label">Username</span><input class="input" value="mshepley"></div>
    <div class="field field--password field--error">
      <span class="field__label">Password</span>
      <div class="input-password"><span class="password-dots"></span><i class="icon icon-eye"></i></div>
    </div>
  </div>
  <div class="auth-row">
    <span class="auth-error">Incorrect Password</span>
    <a class="auth-link" href="#">Forgot Password?</a>
  </div>
  <button type="button" class="btn btn-primary btn-block">Log In</button>
</div>
```

### Change password / New password

**Figma:** Change Password 2211:1877 (card 2211:1878) and New Password 2201:1724 (card 2201:1725): 583x309; title Regular 18 (12.5px right of the card centre as drawn, reproduced centred); New Password hidden + Confirm Password visible ("password12?") at y85/y161; rules box 279x120 at (272,85) {BG Grey 1} r4 ("Must contain at least:" + 3 satisfied rules, green tick 12x9 at x251); Cancel x32, "Save Changes" 139 (Change) / "Save" 79 (New).

Status: **Figma-defined** (states marked EXTENDED below are not drawn in Figma).

```html
<!-- Change password (Save Changes) -->
<div class="auth-card auth-card--password">
  <h2 class="auth-card__title">Change password</h2>
  <div class="auth-card__fields">
    <div class="field field--password">
      <span class="field__label">New Password</span>
      <div class="input-password"><span class="password-dots"></span><i class="icon icon-eye"></i></div>
    </div>
    <div class="field field--password">
      <span class="field__label">Confirm Password</span>
      <div class="input-password"><span>password12?</span><i class="icon icon-eye-off"></i></div>
    </div>
  </div>
  <div class="rules-box">
    <p class="rules-box__title">Must contain at least:</p>
    <ul class="rules-box__list">
      <li class="rules-box__item">8 characters<i class="icon icon-check-green-12x9"></i></li>
      <li class="rules-box__item">1 number (1,2,3,4,5,6,7,8,9,0)<i class="icon icon-check-green-12x9"></i></li>
      <li class="rules-box__item">1 Non-alphanumeric ASCII characters (!@#$%^&amp; *.:;~'`&quot;*/\+?- _|=()[] {}&lt;&gt;)<i class="icon icon-check-green-12x9"></i></li>
    </ul>
  </div>
  <div class="auth-card__actions">
    <button type="button" class="btn btn-cancel">Cancel</button>
    <button type="button" class="btn btn-primary">Save Changes</button>
  </div>
</div>

<!-- New password (Save) -->
<div class="auth-card auth-card--password">
  <h2 class="auth-card__title">New password</h2>
  <div class="auth-card__fields">
    <div class="field field--password">
      <span class="field__label">New Password</span>
      <div class="input-password"><span class="password-dots"></span><i class="icon icon-eye"></i></div>
    </div>
    <div class="field field--password">
      <span class="field__label">Confirm Password</span>
      <div class="input-password"><span>password12?</span><i class="icon icon-eye-off"></i></div>
    </div>
  </div>
  <div class="rules-box">
    <p class="rules-box__title">Must contain at least:</p>
    <ul class="rules-box__list">
      <li class="rules-box__item">8 characters<i class="icon icon-check-green-12x9"></i></li>
      <li class="rules-box__item">1 number (1,2,3,4,5,6,7,8,9,0)<i class="icon icon-check-green-12x9"></i></li>
      <li class="rules-box__item">1 Non-alphanumeric ASCII characters (!@#$%^&amp; *.:;~'`&quot;*/\+?- _|=()[] {}&lt;&gt;)<i class="icon icon-check-green-12x9"></i></li>
    </ul>
  </div>
  <div class="auth-card__actions">
    <button type="button" class="btn btn-cancel">Cancel</button>
    <button type="button" class="btn btn-primary">Save</button>
  </div>
</div>

<!-- Rule not met — EXTENDED: unmet rule: no tick, grey bullet (only the satisfied state is drawn) -->
<div class="rules-box">
  <p class="rules-box__title">Must contain at least:</p>
  <ul class="rules-box__list">
    <li class="rules-box__item is-unmet">8 characters<i class="icon icon-check-green-12x9"></i></li>
  </ul>
</div>
```

### Reset password / Email Sent!

**Figma:** Reset Password step 1 2192:1761 (card 2192:1762, 296x289): title "Reset your password" Regular 18, body Regular 12 #BABEC7 (230x24), input 232x32 "email@example.com", Back x32 / Continue x156. Step 2 2259:1398 (card 2281:1391, 371x255): envelope 56x48 #30F0D6 at (157,40), "Email Sent!", body Regular 14 #BABEC7, Back + "Resend Link" 126x32 (orange {Edit}).

Status: **Figma-defined**.

```html
<!-- Reset step 1 (296x289) -->
<div class="auth-card auth-card--reset">
  <h2 class="auth-card__title">Reset your password</h2>
  <p class="auth-card__body">Please enter your email address to receive a link confirmation to reset your password.</p>
  <input class="input" placeholder="email@example.com">
  <div class="auth-card__actions">
    <button type="button" class="btn btn-cancel">Back</button>
    <button type="button" class="btn btn-primary">Continue</button>
  </div>
</div>

<!-- Email Sent! (371x255) -->
<div class="auth-card auth-card--sent">
  <i class="icon icon-email-sent" role="img" aria-label="Email sent"></i>
  <h2 class="auth-card__title">Email Sent!</h2>
  <p class="auth-card__body">Please check your email for the confirmation link.</p>
  <div class="auth-card__actions">
    <button type="button" class="btn btn-cancel">Back</button>
    <button type="button" class="btn btn-orange">Resend Link</button>
  </div>
</div>
```

---

## Entities

Entities list, group cards, Trading Account / Entity / Trader split panel (canonical 1280x1040).

### Entities list (toolbar + admin table)

**Figma:** Frame 3 3648:7348: Search 208x32 at (16,64) fill #242428; "Add New" 109x32 right margin 16; table Frame 7 (0,104): header Medium 14 #707079 (42 high), rows 42 pitch with 1px #39393C lines, cell Medium 14 #FFFFFF (Country Regular 14); columns Account ID x16 / Entity Name x256 / Country x598 / LEI x996 / Active x1289 (dot x1303, 12x12) / edit x1315 (32x32). Row 2: inactive dot #707079.

Status: **Figma-defined** (states marked EXTENDED below are not drawn in Figma).

```html
<!-- Entities list -->
<div class="app" style="height:400px">
  <div class="app__sidebar"></div>
  <div class="app__logo"><i class="icon icon-logo-fxer-stacked-black-32x40"></i></div>
  <nav class="app__nav" aria-label="Main">
    <a class="nav-item" href="#" aria-label="Dashboard"><i class="icon icon-menu-tab-1"></i></a>
    <a class="nav-item" href="#" aria-label="Trade Blotter"><i class="icon icon-subtract"></i></a>
    <a class="nav-item" href="#" aria-label="Trade Reports"><i class="icon icon-csv"></i></a>
    <a class="nav-item" href="#" aria-label="Deleted Trades"><i class="icon icon-deleted-trades"></i></a>
    <a class="nav-item is-active" href="#" aria-label="Entities" aria-current="page"><i class="icon icon-entities"></i></a>
    <a class="nav-item nav-item--tall" href="#" aria-label="Reports"><i class="icon icon-report-file"></i></a>
  </nav>
  <div class="app__content">
    <header class="app__topbar">
      <h1 class="app__title">Entities</h1>
      <div class="app__topbar-right">
        <button type="button" class="app__user" aria-label="User menu"><i class="icon icon-user"></i></button>
      </div>
    </header>
    <div class="app__strip app__strip--toolbar">
      <div class="search toolbar-search"><i class="icon icon-search"></i><input class="input__control" placeholder="Search"></div>
      <button type="button" class="btn btn-teal">Add New</button>
    </div>
    <div class="app__body">
      <div class="app__main">
        <div class="table table--entities">
          <div class="table__row table__row--head"><span class="table__cell">Account ID</span><span class="table__cell">Entity Name</span><span class="table__cell">Country</span><span class="table__cell">LEI</span><span class="table__cell">Active</span><span></span></div>
          <div class="table__row">
            <span class="table__cell">1</span><span class="table__cell">Bank of America Capital Corp</span><span class="table__cell table__cell--regular">US</span><span class="table__cell">549300YQ0J2COHVB4010</span><span class="table__cell table__cell--dot"><span class="status-dot status-dot--active"></span></span>
            <button type="button" class="btn-icon btn-edit table__edit" aria-label="Edit"><i class="icon icon-edit-pencil"></i></button>
          </div>
          <div class="table__row">
            <span class="table__cell">2</span><span class="table__cell">Brevan Howard Fund Ltd</span><span class="table__cell table__cell--regular">GB</span><span class="table__cell">549300YQ0J2COHVB4010</span><span class="table__cell table__cell--dot"><span class="status-dot"></span></span>
            <button type="button" class="btn-icon btn-edit table__edit" aria-label="Edit"><i class="icon icon-edit-pencil"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Row hover / selected (Statics highlight #39393C) — EXTENDED: row hover = the drawn selected-row fill #39393C (the Statics highlight) -->
<div style="width:1384px;background:var(--color-surface-panel)">
  <div class="table table--entities">
    <div class="table__row is-selected">
      <span class="table__cell">1</span><span class="table__cell">Bank of America Capital Corp</span><span class="table__cell table__cell--regular">US</span><span class="table__cell">549300YQ0J2COHVB4010</span><span class="table__cell table__cell--dot"><span class="status-dot status-dot--active"></span></span>
      <button type="button" class="btn-icon btn-edit table__edit" aria-label="Edit"><i class="icon icon-edit-pencil"></i></button>
    </div>
  </div>
</div>
```

### Group card, section label, empty state

**Figma:** Group 174 4164:14303 (16,172) 359x293: card #242428 r4; header strip 359x45 #39393C r 4/4/0/0, title SemiBold 18; rows 62 high (name Medium 16, type Medium 16 #707079, "|" Medium 12 #BABEC7, counterparty Medium 16 #BABEC7, pitch 19); selected row #39394E full width, name #A4A4FF; Traders card 359x122 (rows 61, names SemiBold 18). Section label Medium 18 #7373BB SENTENCE case + "Add New" Button transparent 109x32. 1440 frames: card 424x293, dividers from x+24 (.group-card--inset-divider). Empty state "Select a trading account" Medium 16 #BABEC7 (3648:7418).

Status: **Figma-defined** (states marked EXTENDED below are not drawn in Figma).

```html
<!-- Trading account card (359 wide) -->
<div style="width:359px">
  <div class="group-card">
    <div class="group-card__head">RBS</div>
    <div class="group-card__row" tabindex="0">
      <div class="group-card__name">O RBS BOA</div>
      <div class="group-card__meta"><span class="group-card__type">Client</span><span class="group-card__sep">|</span><span class="group-card__party">Oscar Gruss</span></div>
    </div>
    <div class="group-card__row is-selected" tabindex="0">
      <div class="group-card__name">RBS EDGE BOA</div>
      <div class="group-card__meta"><span class="group-card__type">Market Maker</span><span class="group-card__sep">|</span><span class="group-card__party">Makor Securities London</span></div>
    </div>
    <div class="group-card__row" tabindex="0">
      <div class="group-card__name">RBS-BOA</div>
      <div class="group-card__meta"><span class="group-card__type">Client</span><span class="group-card__sep">|</span><span class="group-card__party">Oscar Gruss</span></div>
    </div>
    <div class="group-card__row" tabindex="0">
      <div class="group-card__name">RBS BOA</div>
      <div class="group-card__meta"><span class="group-card__type">Market Maker</span><span class="group-card__sep">|</span><span class="group-card__party">Makor Securities London</span></div>
    </div>
  </div>
</div>

<!-- Traders card -->
<div style="width:359px">
  <div class="group-card group-card--traders">
    <div class="group-card__row" tabindex="0">
      <div class="group-card__name">Max Shepley</div>
    </div>
    <div class="group-card__row" tabindex="0">
      <div class="group-card__name">Dana Levy</div>
    </div>
  </div>
</div>

<!-- Section head -->
<div style="width:359px">
  <div class="section-head">
    <h3 class="section-label">Trading Accounts</h3>
    <button type="button" class="btn btn-transparent">Add New</button>
  </div>
</div>

<!-- Row hover — EXTENDED: row hover = #39393C (Statics highlight; none drawn on cards) -->
<div style="width:359px" class="group-card">
  <div class="group-card__row" style="background:var(--color-surface-row-highlight)">
    <div class="group-card__name">RBS-BOA</div>
    <div class="group-card__meta"><span class="group-card__type">Client</span><span class="group-card__sep">|</span><span class="group-card__party">Oscar Gruss</span></div>
  </div>
</div>

<!-- Empty state -->
<div class="empty-state" style="width:359px;height:80px">Select a trading account</div>

<!-- Inset dividers (1440 alt) -->
<div style="width:424px" class="group-card group-card--inset-divider">
  <div class="group-card__head">HSBC</div>
  <div class="group-card__row" tabindex="0">
    <div class="group-card__name">HRBS</div>
    <div class="group-card__meta"><span class="group-card__type">Client</span><span class="group-card__sep">|</span><span class="group-card__party">Makor Securities London</span></div>
  </div>
  <div class="group-card__row" tabindex="0">
    <div class="group-card__name">HRBS 2</div>
    <div class="group-card__meta"><span class="group-card__type">Client</span><span class="group-card__sep">|</span><span class="group-card__party">Makor Securities London</span></div>
  </div>
</div>
```

### Trading Account detail (canonical 1280x1040)

**Figma:** Trading Account 1280*1040 4164:14303 (CANONICAL; breadcrumb links #A4A4FF at x16): left panel x16..375 (359) / divider "Line 4" x399 / detail x415..1208 (793); header "RBS EDGE BOA" Medium 20 (415,24) + chip "RBS" + "Makor Securities London"; switches "Give Up" (997,32) / "Active" (1120,32) 80x16; radios y101; field stack pitch 64; Lucera Drop Value panel 221x244 at (673,101); Default Booking Recipients 298x244 at (910,101); Line 7 4164:14519 y373; Product Permissions card 793x389 at (415,412) (tabs Spot/Forwards/Vanilla Options/Exotic Options); Total Limit popover 146x95 at (1070,408); Close 84x32 / Save Changes 139x32 at y833. Alt 1440 version (3657:4471 / 3648:7418): panel 424, divider x488, detail x512 (.split--alt-1440); the OLDEST master-list permissions (3657:4471) is not built.

Status: **Figma-defined**.

```html
<!-- Trading Account 1280x1040 -->
<div class="app app--1280 app--trading-account">
  <div class="app__sidebar"></div>
  <div class="app__logo"><i class="icon icon-logo-fxer-stacked-black-32x40"></i></div>
  <nav class="app__nav" aria-label="Main">
    <a class="nav-item" href="#" aria-label="Dashboard"><i class="icon icon-menu-tab-1"></i></a>
    <a class="nav-item" href="#" aria-label="Trade Blotter"><i class="icon icon-subtract"></i></a>
    <a class="nav-item" href="#" aria-label="Trade Reports"><i class="icon icon-csv"></i></a>
    <a class="nav-item" href="#" aria-label="Deleted Trades"><i class="icon icon-deleted-trades"></i></a>
    <a class="nav-item is-active" href="#" aria-label="Entities" aria-current="page"><i class="icon icon-entities"></i></a>
    <a class="nav-item nav-item--tall" href="#" aria-label="Reports"><i class="icon icon-report-file"></i></a>
  </nav>
  <div class="app__sidebar-bottom">
    <a class="nav-item" href="#" aria-label="Settings"><i class="icon icon-settings"></i></a>
  </div>
  <div class="app__content">
    <header class="app__topbar">
      <h1 class="app__title">Entities</h1>
      <div class="app__topbar-right">
        <button type="button" class="app__user" aria-label="User menu"><i class="icon icon-user"></i></button>
      </div>
    </header>
    <div class="app__strip">
      <nav class="breadcrumb breadcrumb--purple" aria-label="Breadcrumb">
        <a href="#">Entities</a>
        <i class="icon icon-chevron-right-filled"></i>
        <a href="#">Bank of America</a>
        <i class="icon icon-chevron-right-filled"></i>
        <span class="breadcrumb__current">RBS EDGE BOA</span>
      </nav>
    </div>
    <div class="app__body">
      <div class="app__main">
        <div class="split">
          <div class="split__left panel-stack">
            <h2 class="entity-title">Bank of America</h2>
            <div class="entity-lei"><i class="flag flag-us"></i><span>B4TYDEB6GKMZO031MB27</span></div>
            <div class="checkbox-row">
              <label class="checkbox-field checkbox-field--white"><input type="checkbox" class="checkbox" checked><span>Swap Dealer</span></label>
              <label class="checkbox-field"><input type="checkbox" class="checkbox"><span>PBA</span></label>
            </div>
            <div class="section-head">
              <h3 class="section-label">Trading Accounts</h3>
              <button type="button" class="btn btn-transparent">Add New</button>
            </div>
            <div class="group-card">
              <div class="group-card__head">RBS</div>
              <div class="group-card__row" tabindex="0">
                <div class="group-card__name">O RBS BOA</div>
                <div class="group-card__meta"><span class="group-card__type">Client</span><span class="group-card__sep">|</span><span class="group-card__party">Oscar Gruss</span></div>
              </div>
              <div class="group-card__row is-selected" tabindex="0">
                <div class="group-card__name">RBS EDGE BOA</div>
                <div class="group-card__meta"><span class="group-card__type">Market Maker</span><span class="group-card__sep">|</span><span class="group-card__party">Makor Securities London</span></div>
              </div>
              <div class="group-card__row" tabindex="0">
                <div class="group-card__name">RBS-BOA</div>
                <div class="group-card__meta"><span class="group-card__type">Client</span><span class="group-card__sep">|</span><span class="group-card__party">Oscar Gruss</span></div>
              </div>
              <div class="group-card__row" tabindex="0">
                <div class="group-card__name">RBS BOA</div>
                <div class="group-card__meta"><span class="group-card__type">Market Maker</span><span class="group-card__sep">|</span><span class="group-card__party">Makor Securities London</span></div>
              </div>
            </div>
            <div class="group-card">
              <div class="group-card__head">HSBC</div>
              <div class="group-card__row" tabindex="0">
                <div class="group-card__name">HRBS</div>
                <div class="group-card__meta"><span class="group-card__type">Client</span><span class="group-card__sep">|</span><span class="group-card__party">Makor Securities London</span></div>
              </div>
            </div>
            <div class="section-head">
              <h3 class="section-label">Traders</h3>
              <button type="button" class="btn btn-transparent">Add New</button>
            </div>
            <div class="group-card group-card--traders">
              <div class="group-card__row" tabindex="0">
                <div class="group-card__name">Max Shepley</div>
              </div>
              <div class="group-card__row" tabindex="0">
                <div class="group-card__name">Dana Levy</div>
              </div>
            </div>
          </div>
          <div class="split__divider"></div>
          <div class="split__right">
            <h2 class="detail__title">RBS EDGE BOA</h2>
            <div class="detail__sub"><span class="group-badge">RBS</span><span>Makor Securities London</span></div>
            <div class="detail__switches">
              <label class="switch-field"><input type="checkbox" class="switch"><span>Give Up</span></label>
              <label class="switch-field"><input type="checkbox" class="switch" checked><span>Active</span></label>
            </div>
            <div class="form-cols">
              <div class="form-cols__col">
                <div class="radio-row" style="margin-top:16px">
                  <label class="radio-field"><input type="radio" class="radio" name="ta-type"><span>Client</span></label>
                  <label class="radio-field"><input type="radio" class="radio" name="ta-type" checked><span>Market Maker</span></label>
                </div>
                <div class="field field--page">
                  <span class="field__label">Prime Broker / Mapping Value</span>
                  <div class="field-row">
                    <button type="button" class="select" style="--input-w:72px"><span class="select__value">RBS</span><i class="icon icon-caret-down-filled-11x6"></i></button>
                    <input class="input" value="RBS-BOA-MAKOR" style="--input-w:162px">
                  </div>
                </div>
                <div class="field field--page">
                  <span class="field__label">Makor Entity</span>
                  <button type="button" class="select"><span class="select__value">Makor Securities London</span><i class="icon icon-caret-down-filled-11x6"></i></button>
                </div>
                <div class="field field--page">
                  <span class="field__label">PB Agreement</span>
                  <button type="button" class="select"><span class="select__value">4way</span><i class="icon icon-caret-down-filled-11x6"></i></button>
                </div>
                <div class="checkbox-pair">
                  <label class="checkbox-field"><input type="checkbox" class="checkbox"><span>Structured</span></label>
                  <label class="checkbox-field"><input type="checkbox" class="checkbox"><span>PBA</span></label>
                </div>
              </div>
              <div class="form-cols__col">
                <div>
                  <span class="panel-label">Lucera Drop Value</span>
                  <div class="mapping-panel">
                    <div class="mapping-row">
                      <button type="button" class="select" style="--input-w:61px"><span class="select__value">NY</span><i class="icon icon-caret-down-filled-11x6"></i></button>
                      <input class="input" value="EDGE_RBS" style="--input-w:110px">
                      <i class="icon icon-trash-14" role="button" aria-label="Remove"></i>
                    </div>
                    <button type="button" class="btn-add-icon" aria-label="Add"></button>
                  </div>
                </div>
              </div>
              <div class="form-cols__col">
                <div>
                  <span class="panel-label">Default Booking Recipients</span>
                  <div class="recipients">
                    <div class="recipients__row"><span>mshepley@iclient.com</span><input type="checkbox" class="checkbox" checked></div>
                    <div class="recipients__row"><span>desk@iclient.com</span><input type="checkbox" class="checkbox" checked></div>
                    <div class="recipients__row"><span>ops@iclient.com</span><input type="checkbox" class="checkbox"></div>
                    <div class="recipients__add">
                      <div class="input-email">
                        <input class="input__control" placeholder="example@email.com">
                        <button type="button" class="btn-add-icon" aria-label="Add"></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="detail__rule"></div>
            <div class="perm-head abs" style="--x:1px;--y:382px;width:792px"><span>Product Permissions</span><span class="perm-total"><span>Total limit </span><span class="perm-total__value">$100m</span><i class="icon icon-edit-pencil-purple-24x12"></i></span></div>
            <div class="perm-card abs" style="--x:0;--y:412px">
              <div class="perm-card__tabs">
                <button type="button" class="tab">Spot</button>
                <button type="button" class="tab is-active">Forwards</button>
                <button type="button" class="tab">Vanilla Options</button>
                <button type="button" class="tab">Exotic Options</button>
              </div>
              <div class="perm-card__body">
                <p class="perm-card__label">2 years</p>
                <div class="value-box">CHF, INR, PEN, USD, NZD, DKK, SEK, NOK, PLN, CZK, HUF, TRY, ZAR, MXN, BRL, CLP, COP, SGD, HKD, JPY, AUD, CAD, GBP, EUR, CNH, THB, PHP, IDR, KRW, TWD, ILS, RON, CHF, INR, PEN, USD, NZD, DKK, SEK, NOK, PLN, CZK, HUF, TRY, ZAR, MXN, BRL, CLP, CO</div>
                <p class="perm-card__label">1 year</p>
                <div class="value-box">CHF, INR, PEN, USD, NZD, DKK, SEK, NOK, </div>
              </div>
              <div class="scrollbar perm-card__scroll">
                <div class="scrollbar__thumb" style="height:202.3px"></div>
              </div>
              <div class="perm-card__foot">
                <button type="button" class="btn btn-outline-teal">Add Permissions</button>
              </div>
            </div>
            <div class="popover limit-popover abs" style="--x:655px;--y:408px">
              <div class="input input--sm"><span><span class="unit">$</span> 100</span><span class="unit">m</span></div>
              <button type="button" class="btn btn-sm btn-outline-purple">Save</button>
            </div>
            <div class="detail__actions">
              <button type="button" class="btn btn-cancel">Close</button>
              <button type="button" class="btn btn-primary">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
      <footer class="app__footer">
        <div class="app__footer-brand"><i class="icon icon-makor-m"></i><span>FX Engine Room | Operated by Makor Group</span></div>
        <div class="app__footer-right"><span class="live-indicator live-indicator--loop"></span></div>
      </footer>
    </div>
  </div>
</div>
```

### TA panels: permissions card, Total limit popover, mapping, recipients

**Figma:** Frame 173 793x389 (tab bar 42 + divider y42, labels Regular 14 #707079 at x24, value boxes 733 wide #39393C r4 padding 12/8, scrollbar 4x299.5 at x781, divider y333, "Add Permission" outlined teal 156x32 at (12,345)); Total Limit popover 146x95 {Modal BG} r8 (input 114x24 at (16,16), Save 114x24 at (16,55)); Lucera Drop Value 4138:14488 / 221x244; Default Booking Recipients Group 150 298x244 (+ add strip 298x48 shadow 0 -4 4 @0.25).

Status: **Figma-defined**.

```html
<!-- Permissions card 793x389 -->
<div class="perm-card">
  <div class="perm-card__tabs">
    <button type="button" class="tab">Spot</button>
    <button type="button" class="tab is-active">Forwards</button>
    <button type="button" class="tab">Vanilla Options</button>
    <button type="button" class="tab">Exotic Options</button>
  </div>
  <div class="perm-card__body">
    <p class="perm-card__label">2 years</p>
    <div class="value-box">CHF, INR, PEN, USD, NZD, DKK, SEK, NOK, PLN, CZK, HUF, TRY, ZAR, MXN, BRL, CLP, COP, SGD, HKD, JPY, AUD, CAD, GBP, EUR, CNH, THB, PHP, IDR, KRW, TWD, ILS, RON, CHF, INR, PEN, USD, NZD, DKK, SEK, NOK, PLN, CZK, HUF, TRY, ZAR, MXN, BRL, CLP, CO</div>
    <p class="perm-card__label">1 year</p>
    <div class="value-box">CHF, INR, PEN, USD, NZD, DKK, SEK, NOK, </div>
  </div>
  <div class="scrollbar perm-card__scroll">
    <div class="scrollbar__thumb" style="height:202.3px"></div>
  </div>
  <div class="perm-card__foot">
    <button type="button" class="btn btn-outline-teal">Add Permissions</button>
  </div>
</div>

<!-- Total limit popover -->
<div class="popover limit-popover">
  <div class="input input--sm"><span><span class="unit">$</span> 100</span><span class="unit">m</span></div>
  <button type="button" class="btn btn-sm btn-outline-purple">Save</button>
</div>

<!-- Lucera Drop Value panel -->
<div>
  <span class="panel-label">Lucera Drop Value</span>
  <div class="mapping-panel">
    <div class="mapping-row">
      <button type="button" class="select" style="--input-w:61px"><span class="select__value">NY</span><i class="icon icon-caret-down-filled-11x6"></i></button>
      <input class="input" value="EDGE_RBS" style="--input-w:110px">
      <i class="icon icon-trash-14" role="button" aria-label="Remove"></i>
    </div>
    <button type="button" class="btn-add-icon" aria-label="Add"></button>
  </div>
</div>

<!-- Lucera — empty -->
<div class="mapping-panel">
  <p class="mapping-panel__empty">No mapping values set</p>
  <button type="button" class="btn-add-icon" aria-label="Add"></button>
</div>

<!-- Booking recipients 298x244 -->
<div>
  <span class="panel-label">Default Booking Recipients</span>
  <div class="recipients">
    <div class="recipients__row"><span>mshepley@iclient.com</span><input type="checkbox" class="checkbox" checked></div>
    <div class="recipients__row"><span>desk@iclient.com</span><input type="checkbox" class="checkbox" checked></div>
    <div class="recipients__row"><span>ops@iclient.com</span><input type="checkbox" class="checkbox"></div>
    <div class="recipients__add">
      <div class="input-email">
        <input class="input__control" placeholder="example@email.com">
        <button type="button" class="btn-add-icon" aria-label="Add"></button>
      </div>
    </div>
  </div>
</div>
```

---

## Modals

Modal container + deal/trade tickets, entity/trader/account forms, Add Permissions, Allocate Block, ID Status, segmented control.

### New Deal / New Client Trade (432 wide)

**Figma:** Modal system trading.md 4.1: modal fill #242428 r12, clip, no stroke, NO shadow; header title Medium 18 centred (cap top y24), divider 1px #39393C at y61, content from y85, side padding 32, column 172 / gap 24, row pitch 68; footer buttons at last row bottom + 32, height 32, bottom padding 24. New Deal Spot 5842:17240 (initial, 432x557) / 5842:17480 (filled); New Client Trade Spot 5842:17677 (432x461, initial) / 5873:18923 (filled); NDF 5813:20986 (432x625). Initial: Create DISABLED #707079/#BABEC7; filled: teal #30F0D6 / #000000.

Status: **Figma-defined**.

Swap (432x693, 2 stages) and the other New Deal/Trade variants are compositions of the same field, segmented-control and footer classes (see trading.md 5.3 / 5.7); they are not rebuilt separately. Modal open/close: render `.modal-overlay` (scrim #000@0.5 + blur 10) as a child of the content frame, close on Cancel / scrim click / Esc.

```html
<!-- New Deal — Spot, initial (432x557) -->
<div class="modal modal--432">
  <div class="modal__header">
    <h2 class="modal__title">New Deal</h2>
  </div>
  <div class="modal__body">
    <div class="field">
      <span class="field__label">Deal Type</span>
      <button type="button" class="select"><span class="select__value">Spot</span><i class="icon icon-caret-down-filled-11x6"></i></button>
    </div>
    <div></div>
    <div class="field">
      <span class="field__label">Client</span>
      <div class="search"><i class="icon icon-search"></i><input class="input__control" placeholder="Select Client"></div>
    </div>
    <div class="field">
      <span class="field__label">Market Maker</span>
      <div class="search"><i class="icon icon-search"></i><input class="input__control" placeholder="Select Market Maker"></div>
    </div>
    <div class="field"><span class="field__label">Currency Pair</span><input class="input" placeholder="Enter currency pair"></div>
    <div class="field">
      <span class="field__label">Side</span>
      <div class="segmented">
        <button type="button" class="segmented__btn">BUY</button>
        <button type="button" class="segmented__btn">SELL</button>
      </div>
    </div>
    <div class="field"><span class="field__label">Quantity</span><input class="input" placeholder="0.00"></div>
    <div class="field">
      <span class="field__label">Trade Date</span>
      <button type="button" class="input-date is-locked"><span class="">24/06/2024</span><i class="icon icon-calendar-16"></i></button>
    </div>
    <div class="field">
      <span class="field__label">Client Value Date</span>
      <button type="button" class="input-date"><span class="placeholder">dd/mm/yyyy</span><i class="icon icon-calendar-16"></i></button>
    </div>
    <div class="field">
      <span class="field__label">Market Value Date</span>
      <button type="button" class="input-date"><span class="placeholder">dd/mm/yyyy</span><i class="icon icon-calendar-16"></i></button>
    </div>
    <div class="field"><span class="field__label">Client Price</span><input class="input" placeholder="0.0000"></div>
    <div class="field"><span class="field__label">Market Price</span><input class="input" placeholder="0.0000"></div>
  </div>
  <div class="modal__footer">
    <button type="button" class="btn btn-cancel">Cancel</button>
    <button type="button" class="btn btn-teal modal__footer-end" disabled>Create Deal</button>
  </div>
</div>

<!-- New Deal — Spot, filled -->
<div class="modal modal--432">
  <div class="modal__header">
    <h2 class="modal__title">New Deal</h2>
  </div>
  <div class="modal__body">
    <div class="field">
      <span class="field__label">Deal Type</span>
      <button type="button" class="select"><span class="select__value">Spot</span><i class="icon icon-caret-down-filled-11x6"></i></button>
    </div>
    <div></div>
    <div class="field">
      <span class="field__label">Client</span>
      <div class="search"><i class="icon icon-search"></i><input class="input__control" value="Goldman Sachs"></div>
    </div>
    <div class="field">
      <span class="field__label">Market Maker</span>
      <div class="search"><i class="icon icon-search"></i><input class="input__control" value="HSBC"></div>
    </div>
    <div class="field"><span class="field__label">Currency Pair</span><input class="input" value="NOKPHP"></div>
    <div class="field">
      <span class="field__label">Side</span>
      <div class="segmented">
        <button type="button" class="segmented__btn is-selected">BUY</button>
        <button type="button" class="segmented__btn">SELL</button>
      </div>
    </div>
    <div class="field"><span class="field__label">Quantity</span><input class="input" value="12000.00"></div>
    <div class="field">
      <span class="field__label">Trade Date</span>
      <button type="button" class="input-date is-locked"><span class="">24/06/2024</span><i class="icon icon-calendar-16"></i></button>
    </div>
    <div class="field">
      <span class="field__label">Client Value Date</span>
      <button type="button" class="input-date"><span class="">26/06/2024</span><i class="icon icon-calendar-16"></i></button>
    </div>
    <div class="field">
      <span class="field__label">Market Value Date</span>
      <button type="button" class="input-date"><span class="">26/06/2024</span><i class="icon icon-calendar-16"></i></button>
    </div>
    <div class="field"><span class="field__label">Client Price</span><input class="input" value="17.08783"></div>
    <div class="field"><span class="field__label">Market Price</span><input class="input" value="17.94316"></div>
  </div>
  <div class="modal__footer">
    <button type="button" class="btn btn-cancel">Cancel</button>
    <button type="button" class="btn btn-teal modal__footer-end">Create Deal</button>
  </div>
</div>

<!-- New Client Trade — Spot, initial (432x461) -->
<div class="modal modal--432">
  <div class="modal__header">
    <h2 class="modal__title">New Client Trade</h2>
  </div>
  <div class="modal__body">
    <div class="field">
      <span class="field__label">Trade Type</span>
      <button type="button" class="select"><span class="select__value">Spot</span><i class="icon icon-caret-down-filled-11x6"></i></button>
    </div>
    <div class="field">
      <span class="field__label">Counterparty</span>
      <div class="search"><i class="icon icon-search"></i><input class="input__control" placeholder="Select Client"></div>
    </div>
    <div class="field"><span class="field__label">Currency Pair</span><input class="input" placeholder="Enter currency pair"></div>
    <div class="field">
      <span class="field__label">Side</span>
      <div class="segmented">
        <button type="button" class="segmented__btn">BUY</button>
        <button type="button" class="segmented__btn">SELL</button>
      </div>
    </div>
    <div class="field"><span class="field__label">Quantity</span><input class="input" placeholder="0.00"></div>
    <div class="field">
      <span class="field__label">Trade Date</span>
      <button type="button" class="input-date is-locked"><span class="">24/06/2024</span><i class="icon icon-calendar-16"></i></button>
    </div>
    <div class="field">
      <span class="field__label">Value Date</span>
      <button type="button" class="input-date"><span class="placeholder">dd/mm/yyyy</span><i class="icon icon-calendar-16"></i></button>
    </div>
    <div class="field"><span class="field__label">Price</span><input class="input" placeholder="0.0000"></div>
    <div class="modal__span-all modal-checkbox-row">
      <label class="checkbox-field"><input type="checkbox" class="checkbox"><span>Conversion Trade</span></label>
    </div>
  </div>
  <div class="modal__footer">
    <button type="button" class="btn btn-cancel">Cancel</button>
    <button type="button" class="btn btn-teal modal__footer-end" disabled>Create Trade</button>
  </div>
</div>

<!-- New Client Trade — Spot, filled -->
<div class="modal modal--432">
  <div class="modal__header">
    <h2 class="modal__title">New Client Trade</h2>
  </div>
  <div class="modal__body">
    <div class="field">
      <span class="field__label">Trade Type</span>
      <button type="button" class="select"><span class="select__value">Spot</span><i class="icon icon-caret-down-filled-11x6"></i></button>
    </div>
    <div class="field">
      <span class="field__label">Counterparty</span>
      <div class="search"><i class="icon icon-search"></i><input class="input__control" value="Goldman Sachs"></div>
    </div>
    <div class="field"><span class="field__label">Currency Pair</span><input class="input" value="NOKPHP"></div>
    <div class="field">
      <span class="field__label">Side</span>
      <div class="segmented">
        <button type="button" class="segmented__btn is-selected">BUY</button>
        <button type="button" class="segmented__btn">SELL</button>
      </div>
    </div>
    <div class="field"><span class="field__label">Quantity</span><input class="input" value="12000.00"></div>
    <div class="field">
      <span class="field__label">Trade Date</span>
      <button type="button" class="input-date is-locked"><span class="">24/06/2024</span><i class="icon icon-calendar-16"></i></button>
    </div>
    <div class="field">
      <span class="field__label">Value Date</span>
      <button type="button" class="input-date"><span class="">26/06/2024</span><i class="icon icon-calendar-16"></i></button>
    </div>
    <div class="field"><span class="field__label">Price</span><input class="input" value="17.94316"></div>
    <div class="modal__span-all modal-checkbox-row">
      <label class="checkbox-field"><input type="checkbox" class="checkbox" checked><span>Conversion Trade</span></label>
    </div>
  </div>
  <div class="modal__footer">
    <button type="button" class="btn btn-cancel">Cancel</button>
    <button type="button" class="btn btn-teal modal__footer-end">Create Trade</button>
  </div>
</div>

<!-- New Deal — NDF (432x625) -->
<div class="modal modal--432">
  <div class="modal__header">
    <h2 class="modal__title">New Deal</h2>
  </div>
  <div class="modal__body">
    <div class="field">
      <span class="field__label">Deal Type</span>
      <button type="button" class="select"><span class="select__value">NDF</span><i class="icon icon-caret-down-filled-11x6"></i></button>
    </div>
    <div></div>
    <div class="field">
      <span class="field__label">Client</span>
      <div class="search"><i class="icon icon-search"></i><input class="input__control" placeholder="Select Client"></div>
    </div>
    <div class="field">
      <span class="field__label">Market Maker</span>
      <div class="search"><i class="icon icon-search"></i><input class="input__control" placeholder="Select Market Maker"></div>
    </div>
    <div class="field"><span class="field__label">Currency Pair</span><input class="input" placeholder="Enter currency pair"></div>
    <div class="field">
      <span class="field__label">Side</span>
      <div class="segmented">
        <button type="button" class="segmented__btn">BUY</button>
        <button type="button" class="segmented__btn">SELL</button>
      </div>
    </div>
    <div class="field"><span class="field__label">Quantity</span><input class="input" placeholder="0.00"></div>
    <div class="field">
      <span class="field__label">Trade Date</span>
      <button type="button" class="input-date is-locked"><span class="">24/06/2024</span><i class="icon icon-calendar-16"></i></button>
    </div>
    <div class="field">
      <span class="field__label">Client Value Date</span>
      <button type="button" class="input-date"><span class="placeholder">dd/mm/yyyy</span><i class="icon icon-calendar-16"></i></button>
    </div>
    <div class="field">
      <span class="field__label">Market Value Date</span>
      <button type="button" class="input-date"><span class="placeholder">dd/mm/yyyy</span><i class="icon icon-calendar-16"></i></button>
    </div>
    <div class="field"><span class="field__label">Client Price</span><input class="input" placeholder="0.0000"></div>
    <div class="field"><span class="field__label">Market Price</span><input class="input" placeholder="0.0000"></div>
    <div class="field">
      <span class="field__label">Fixing Date</span>
      <button type="button" class="input-date"><span class="placeholder">dd/mm/yyyy</span><i class="icon icon-calendar-16"></i></button>
    </div>
    <div class="field">
      <span class="field__label">Fixing Source</span>
      <button type="button" class="select"><span class="select__value placeholder">Select FS</span><i class="icon icon-caret-down-filled-11x6"></i></button>
    </div>
  </div>
  <div class="modal__footer">
    <button type="button" class="btn btn-cancel">Cancel</button>
    <button type="button" class="btn btn-teal modal__footer-end" disabled>Create Deal</button>
  </div>
</div>
```

### Vanilla Option / B2B ticket (628 wide, 3 columns)

**Figma:** B2B Spot Deal 5873:19191 (628x693 "New Client Trade", CTA "Create Trade" disabled 130x32); New Vanilla Option Deal step 1 3999:18228 (CTA "Market Side >" 134x32), step 2 5872:18672 (client-side fields locked/filled — fill removed + 1px #707079; Market Side segmented locked, SELL selected {Edit} w89, label #242428; Put/Call locked PUT selected #A4A4FF; CTA "Create Deal" disabled). Grid x32/228/424 (172 wide, gap 24), rows y85 + 68n.

Status: **Figma-defined**.

```html
<!-- B2B / New Client Trade (empty) -->
<div class="modal modal--628">
  <div class="modal__header">
    <h2 class="modal__title">New Client Trade</h2>
  </div>
  <div class="modal__body">
    <div class="field">
      <span class="field__label">Trade Type</span>
      <button type="button" class="select"><span class="select__value placeholder">Select Trade Type</span><i class="icon icon-caret-down-filled-11x6"></i></button>
    </div>
    <div></div>
    <div></div>
    <div class="field">
      <span class="field__label">Counterparty</span>
      <div class="search"><i class="icon icon-search"></i><input class="input__control" placeholder="Select Client"></div>
    </div>
    <div class="field">
      <span class="field__label">Trade Date</span>
      <button type="button" class="input-date is-locked"><span class="">24/06/2024</span><i class="icon icon-calendar-16"></i></button>
    </div>
    <div></div>
    <div class="field"><span class="field__label">Currency Pair</span><input class="input" placeholder="Enter currency pair"></div>
    <div class="field">
      <span class="field__label">Client Side</span>
      <div class="segmented">
        <button type="button" class="segmented__btn">BUY</button>
        <button type="button" class="segmented__btn">SELL</button>
      </div>
    </div>
    <div class="field">
      <span class="field__label">Put Call</span>
      <div class="segmented segmented--putcall">
        <button type="button" class="segmented__btn">PUT</button>
        <button type="button" class="segmented__btn">CALL</button>
      </div>
    </div>
    <div class="field"><span class="field__label">Quantity</span><input class="input" placeholder="0.00"></div>
    <div class="field"><span class="field__label">Strike Price</span><input class="input" placeholder="0.0000"></div>
    <div class="field">
      <span class="field__label">Expiry Date</span>
      <button type="button" class="input-date"><span class="placeholder">dd/mm/yyyy</span><i class="icon icon-calendar-16"></i></button>
    </div>
    <div class="field"><span class="field__label">Premium Amount</span><input class="input" placeholder="0.00"></div>
    <div class="field">
      <span class="field__label">Premium Currency</span>
      <div class="search"><i class="icon icon-search"></i><input class="input__control" placeholder="Select Currency"></div>
    </div>
    <div class="field">
      <span class="field__label">Premium Date</span>
      <button type="button" class="input-date"><span class="placeholder">dd/mm/yyyy</span><i class="icon icon-calendar-16"></i></button>
    </div>
    <div class="field">
      <span class="field__label">Exercise Style</span>
      <button type="button" class="select"><span class="select__value placeholder">Select ES</span><i class="icon icon-caret-down-filled-11x6"></i></button>
    </div>
    <div class="field">
      <span class="field__label">Payout Currency</span>
      <div class="search"><i class="icon icon-search"></i><input class="input__control" placeholder="Select Currency"></div>
    </div>
    <div class="field">
      <span class="field__label">Trader</span>
      <button type="button" class="select"><span class="select__value placeholder">Select Trader</span><i class="icon icon-caret-down-filled-11x6"></i></button>
    </div>
    <div class="field">
      <span class="field__label">Fixing Date</span>
      <button type="button" class="input-date"><span class="placeholder">dd/mm/yyyy</span><i class="icon icon-calendar-16"></i></button>
    </div>
    <div class="field">
      <span class="field__label">Cut</span>
      <button type="button" class="select"><span class="select__value placeholder">Select Cut</span><i class="icon icon-caret-down-filled-11x6"></i></button>
    </div>
    <div class="field">
      <span class="field__label">Settlement Date</span>
      <button type="button" class="input-date"><span class="placeholder">dd/mm/yyyy</span><i class="icon icon-calendar-16"></i></button>
    </div>
    <div class="field">
      <span class="field__label">Fixing Source</span>
      <button type="button" class="select"><span class="select__value placeholder">Select FS</span><i class="icon icon-caret-down-filled-11x6"></i></button>
    </div>
    <div></div>
    <div></div>
  </div>
  <div class="modal__footer">
    <button type="button" class="btn btn-cancel">Cancel</button>
    <button type="button" class="btn btn-teal modal__footer-end" disabled>Create Trade</button>
  </div>
</div>

<!-- Vanilla step 1 (Client side) -->
<div class="modal modal--628">
  <div class="modal__header">
    <h2 class="modal__title">New Deal</h2>
  </div>
  <div class="modal__body">
    <div class="field">
      <span class="field__label">Deal Type</span>
      <button type="button" class="select"><span class="select__value">Vanilla Option</span><i class="icon icon-caret-down-filled-11x6"></i></button>
    </div>
    <div class="field">
      <span class="field__label">Trade Type</span>
      <button type="button" class="select is-locked"><span class="select__value">Client Vanilla</span><i class="icon icon-caret-down-filled-11x6"></i></button>
    </div>
    <div></div>
    <div class="field">
      <span class="field__label">Counterparty</span>
      <div class="search"><i class="icon icon-search"></i><input class="input__control" placeholder="Select Client"></div>
    </div>
    <div class="field">
      <span class="field__label">Trade Date</span>
      <button type="button" class="input-date is-locked"><span class="">24/06/2024</span><i class="icon icon-calendar-16"></i></button>
    </div>
    <div></div>
    <div class="field"><span class="field__label">Currency Pair</span><input class="input" placeholder="Enter currency pair"></div>
    <div class="field">
      <span class="field__label">Client Side</span>
      <div class="segmented">
        <button type="button" class="segmented__btn">BUY</button>
        <button type="button" class="segmented__btn">SELL</button>
      </div>
    </div>
    <div class="field">
      <span class="field__label">Put Call</span>
      <div class="segmented segmented--putcall">
        <button type="button" class="segmented__btn">PUT</button>
        <button type="button" class="segmented__btn">CALL</button>
      </div>
    </div>
    <div class="field"><span class="field__label">Quantity</span><input class="input" placeholder="0.00"></div>
    <div class="field"><span class="field__label">Strike Price</span><input class="input" placeholder="0.0000"></div>
    <div class="field">
      <span class="field__label">Expiry Date</span>
      <button type="button" class="input-date"><span class="placeholder">dd/mm/yyyy</span><i class="icon icon-calendar-16"></i></button>
    </div>
    <div class="field"><span class="field__label">Premium Amount</span><input class="input" placeholder="0.00"></div>
    <div class="field">
      <span class="field__label">Premium Currency</span>
      <div class="search"><i class="icon icon-search"></i><input class="input__control" placeholder="Select Currency"></div>
    </div>
    <div class="field">
      <span class="field__label">Premium Date</span>
      <button type="button" class="input-date"><span class="placeholder">dd/mm/yyyy</span><i class="icon icon-calendar-16"></i></button>
    </div>
    <div class="field">
      <span class="field__label">Exercise Style</span>
      <button type="button" class="select"><span class="select__value placeholder">Select ES</span><i class="icon icon-caret-down-filled-11x6"></i></button>
    </div>
    <div class="field">
      <span class="field__label">Payout Currency</span>
      <div class="search"><i class="icon icon-search"></i><input class="input__control" placeholder="Select Currency"></div>
    </div>
    <div class="field">
      <span class="field__label">Trader</span>
      <button type="button" class="select"><span class="select__value placeholder">Select Trader</span><i class="icon icon-caret-down-filled-11x6"></i></button>
    </div>
    <div class="field">
      <span class="field__label">Fixing Date</span>
      <button type="button" class="input-date"><span class="placeholder">dd/mm/yyyy</span><i class="icon icon-calendar-16"></i></button>
    </div>
    <div class="field">
      <span class="field__label">Cut</span>
      <button type="button" class="select"><span class="select__value placeholder">Select Cut</span><i class="icon icon-caret-down-filled-11x6"></i></button>
    </div>
    <div class="field">
      <span class="field__label">Settlement Date</span>
      <button type="button" class="input-date"><span class="placeholder">dd/mm/yyyy</span><i class="icon icon-calendar-16"></i></button>
    </div>
    <div class="field">
      <span class="field__label">Fixing Source</span>
      <button type="button" class="select"><span class="select__value placeholder">Select FS</span><i class="icon icon-caret-down-filled-11x6"></i></button>
    </div>
    <div></div>
    <div></div>
  </div>
  <div class="modal__footer">
    <button type="button" class="btn btn-cancel">Cancel</button>
    <button type="button" class="btn-market-side modal__footer-end btn">Market Side<i class="icon icon-chevron-down"></i></button>
  </div>
</div>

<!-- Vanilla step 2 (Market side, locked) -->
<div class="modal modal--628">
  <div class="modal__header">
    <h2 class="modal__title">New Deal</h2>
  </div>
  <div class="modal__body">
    <div class="field">
      <span class="field__label">Deal Type</span>
      <button type="button" class="select is-locked"><span class="select__value">Vanilla Option</span><i class="icon icon-caret-down-filled-11x6"></i></button>
    </div>
    <div class="field">
      <span class="field__label">Trade Type</span>
      <button type="button" class="select is-locked"><span class="select__value">Client Vanilla</span><i class="icon icon-caret-down-filled-11x6"></i></button>
    </div>
    <div></div>
    <div class="field">
      <span class="field__label">Counterparty</span>
      <div class="search is-locked"><i class="icon icon-search"></i><input class="input__control" value="Goldman Sachs"></div>
    </div>
    <div class="field">
      <span class="field__label">Trade Date</span>
      <button type="button" class="input-date is-locked"><span class="">24/06/2024</span><i class="icon icon-calendar-16"></i></button>
    </div>
    <div></div>
    <div class="field"><span class="field__label">Currency Pair</span><input class="input is-locked" value="NOK-PHP"></div>
    <div class="field">
      <span class="field__label">Market Side</span>
      <div class="segmented segmented--locked">
        <button type="button" class="segmented__btn">BUY</button>
        <button type="button" class="segmented__btn is-selected">SELL</button>
      </div>
    </div>
    <div class="field">
      <span class="field__label">Put Call</span>
      <div class="segmented segmented--putcall segmented--locked">
        <button type="button" class="segmented__btn is-selected">PUT</button>
        <button type="button" class="segmented__btn">CALL</button>
      </div>
    </div>
    <div class="field"><span class="field__label">Quantity</span><input class="input is-locked" value="1.2000"></div>
    <div class="field"><span class="field__label">Strike Price</span><input class="input is-locked" value="12.000"></div>
    <div class="field">
      <span class="field__label">Expiry Date</span>
      <button type="button" class="input-date is-locked"><span class="">26/06/2024</span><i class="icon icon-calendar-16"></i></button>
    </div>
    <div class="field"><span class="field__label">Premium Amount</span><input class="input" placeholder="0.00"></div>
    <div class="field">
      <span class="field__label">Premium Currency</span>
      <div class="search"><i class="icon icon-search"></i><input class="input__control" placeholder="Select Currency"></div>
    </div>
    <div class="field">
      <span class="field__label">Premium Date</span>
      <button type="button" class="input-date"><span class="placeholder">dd/mm/yyyy</span><i class="icon icon-calendar-16"></i></button>
    </div>
    <div class="field">
      <span class="field__label">Exercise Style</span>
      <button type="button" class="select is-locked"><span class="select__value">Exercise Style</span><i class="icon icon-caret-down-filled-11x6"></i></button>
    </div>
    <div class="field">
      <span class="field__label">Payout Currency</span>
      <div class="search"><i class="icon icon-search"></i><input class="input__control" placeholder="Select Currency"></div>
    </div>
    <div class="field">
      <span class="field__label">Trader</span>
      <button type="button" class="select"><span class="select__value placeholder">Select Trader</span><i class="icon icon-caret-down-filled-11x6"></i></button>
    </div>
    <div class="field">
      <span class="field__label">Fixing Date</span>
      <button type="button" class="input-date"><span class="placeholder">dd/mm/yyyy</span><i class="icon icon-calendar-16"></i></button>
    </div>
    <div class="field">
      <span class="field__label">Cut</span>
      <button type="button" class="select"><span class="select__value placeholder">Select Cut</span><i class="icon icon-caret-down-filled-11x6"></i></button>
    </div>
    <div class="field">
      <span class="field__label">Settlement Date</span>
      <button type="button" class="input-date"><span class="placeholder">dd/mm/yyyy</span><i class="icon icon-calendar-16"></i></button>
    </div>
    <div class="field">
      <span class="field__label">Fixing Source</span>
      <button type="button" class="select"><span class="select__value placeholder">Select FS</span><i class="icon icon-caret-down-filled-11x6"></i></button>
    </div>
    <div></div>
    <div></div>
  </div>
  <div class="modal__footer">
    <button type="button" class="btn btn-cancel">Cancel</button>
    <button type="button" class="btn btn-teal modal__footer-end" disabled>Create Deal</button>
  </div>
</div>
```

### New Entity / New Trader / New Trading Account

**Figma:** New Entity 5535:14591 (572x405: cols x32 186 / x242 298; recipients panel 298x220 #39393C, dividers + entry field #242428 = .surface-inner; Create 91x32 disabled); New Trader 5539:15430 (602x474: Full Name 298x44; Assignment label Regular 13 (outlier) at (367,85), rows y110/142/174; footer Cancel / Active switch at x172 / Create); New Trading Account 5536:14961 (873x573: cols x32 242 / x298 221 / x543 298; Lucera panel 221x388, recipients 298x390; "Give-up" switch ON at x172).

Status: **Figma-defined**.

```html
<!-- New Entity (572x405) -->
<div class="modal modal--new-entity">
  <div class="modal__header">
    <h2 class="modal__title">New Entity</h2>
  </div>
  <div class="modal__body">
    <div class="field"><span class="field__label">Entity Name</span><input class="input" value="Bank of America"></div>
    <div style="grid-column:2;grid-row:1 / span 4">
      <span class="panel-label panel-label--modal">Default Booking Recipients</span>
      <div class="recipients recipients--short surface-inner">
        <div class="recipients__row"><span>mshepley@iclient.com</span><input type="checkbox" class="checkbox" checked></div>
        <div class="recipients__row"><span>desk@iclient.com</span><input type="checkbox" class="checkbox" checked></div>
        <div class="recipients__row"><span>ops@iclient.com</span><input type="checkbox" class="checkbox"></div>
        <div class="recipients__add">
          <div class="input-email">
            <input class="input__control" placeholder="example@email.com">
            <button type="button" class="btn-add-icon" aria-label="Add"></button>
          </div>
        </div>
      </div>
    </div>
    <div class="field">
      <span class="field__label">Country</span>
      <div class="search"><i class="icon icon-search"></i><input class="input__control" placeholder="Select Country"></div>
    </div>
    <div class="field"><span class="field__label">LEI</span><input class="input" placeholder="LEI"></div>
    <div class="modal-checkbox-row">
      <label class="checkbox-field"><input type="checkbox" class="checkbox" checked><span>Swap Dealer</span></label>
    </div>
  </div>
  <div class="modal__footer">
    <button type="button" class="btn btn-cancel">Cancel</button>
    <button type="button" class="btn btn-teal modal__footer-end" disabled>Create</button>
  </div>
</div>

<!-- New Trader (602x474) -->
<div class="modal modal--new-trader">
  <div class="modal__header">
    <h2 class="modal__title">New Trader</h2>
  </div>
  <div class="modal__body">
    <div class="col" style="gap:24px">
      <div class="field"><span class="field__label">Full Name</span><input class="input" placeholder="Full Name"></div>
      <div>
        <span class="panel-label panel-label--modal">Default Booking Recipients</span>
        <div class="recipients recipients--short surface-inner">
          <div class="recipients__row"><span>mshepley@iclient.com</span><input type="checkbox" class="checkbox" checked></div>
          <div class="recipients__row"><span>desk@iclient.com</span><input type="checkbox" class="checkbox" checked></div>
          <div class="recipients__row"><span>ops@iclient.com</span><input type="checkbox" class="checkbox"></div>
          <div class="recipients__add">
            <div class="input-email">
              <input class="input__control" placeholder="example@email.com">
              <button type="button" class="btn-add-icon" aria-label="Add"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col">
      <span class="assign-label">Assignment</span>
      <div class="assign-list">
        <label class="checkbox-field checkbox-field--assign"><input type="checkbox" class="checkbox" checked><span>O RBS BOA</span></label>
        <label class="checkbox-field checkbox-field--assign"><input type="checkbox" class="checkbox" checked><span>RBS EDGE BOA</span></label>
        <label class="checkbox-field checkbox-field--assign"><input type="checkbox" class="checkbox"><span>RBS-BOA</span></label>
      </div>
    </div>
  </div>
  <div class="modal__footer">
    <button type="button" class="btn btn-cancel">Cancel</button>
    <label class="switch-field modal__footer-switch"><input type="checkbox" class="switch" checked><span>Active</span></label>
    <button type="button" class="btn btn-teal modal__footer-end" disabled>Create</button>
  </div>
</div>

<!-- New Trading Account (873x573) -->
<div class="modal modal--new-account">
  <div class="modal__header">
    <h2 class="modal__title">New Trading Account</h2>
  </div>
  <div class="modal__body">
    <div class="form-cols__col" style="gap:24px">
      <div class="field"><span class="field__label">Trading Account Name</span><input class="input" placeholder="Trading Account Name"></div>
      <div class="radio-row" style="margin:0">
        <label class="radio-field"><input type="radio" class="radio" name="na-type" checked><span>Client</span></label>
        <label class="radio-field"><input type="radio" class="radio" name="na-type"><span>Market Maker</span></label>
      </div>
      <div class="field">
        <span class="field__label">Prime Broker / Mapping Value</span>
        <div class="field-row">
          <button type="button" class="select" style="--input-w:72px"><span class="select__value">RBS</span><i class="icon icon-caret-down-filled-11x6"></i></button>
          <input class="input" value="RBS-BOA-MAKOR" style="--input-w:162px">
        </div>
      </div>
      <div class="field">
        <span class="field__label">Makor Entity</span>
        <button type="button" class="select"><span class="select__value">Makor Securities London</span><i class="icon icon-caret-down-filled-11x6"></i></button>
      </div>
      <div class="field">
        <span class="field__label">PB Agreement</span>
        <button type="button" class="select"><span class="select__value">4way</span><i class="icon icon-caret-down-filled-11x6"></i></button>
      </div>
      <div class="field"><span class="field__label">Credit Limit</span><input class="input" placeholder="0.00"></div>
      <div class="checkbox-pair">
        <label class="checkbox-field"><input type="checkbox" class="checkbox"><span>Structured</span></label>
        <label class="checkbox-field"><input type="checkbox" class="checkbox"><span>PBA</span></label>
      </div>
    </div>
    <div class="form-cols__col">
      <div>
        <span class="panel-label panel-label--modal">Lucera Drop Value</span>
        <div class="mapping-panel surface-inner" style="height:388px">
          <div class="mapping-row">
            <button type="button" class="select" style="--input-w:61px"><span class="select__value">NY</span><i class="icon icon-caret-down-filled-11x6"></i></button>
            <input class="input" value="EDGE_RBS" style="--input-w:110px">
            <i class="icon icon-trash-14" role="button" aria-label="Remove"></i>
          </div>
          <button type="button" class="btn-add-icon" aria-label="Add"></button>
        </div>
      </div>
    </div>
    <div class="form-cols__col">
      <div>
        <span class="panel-label panel-label--modal">Default Booking Recipients</span>
        <div class="recipients surface-inner" style="height:390px">
          <div class="recipients__row"><span>mshepley@iclient.com</span><input type="checkbox" class="checkbox" checked></div>
          <div class="recipients__row"><span>desk@iclient.com</span><input type="checkbox" class="checkbox" checked></div>
          <div class="recipients__row"><span>ops@iclient.com</span><input type="checkbox" class="checkbox"></div>
          <div class="recipients__add">
            <div class="input-email">
              <input class="input__control" placeholder="example@email.com">
              <button type="button" class="btn-add-icon" aria-label="Add"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal__footer">
    <button type="button" class="btn btn-cancel">Cancel</button>
    <label class="switch-field modal__footer-switch"><input type="checkbox" class="switch" checked><span>Give-up</span></label>
    <button type="button" class="btn btn-teal modal__footer-end" disabled>Create</button>
  </div>
</div>
```

### Add Permissions (primary + alternate)

**Figma:** PRIMARY 5587:14673 ("B2B Spot Deal" frame name; 5587:14498) 420x406: labels Regular 14 #707079 (not 12); Product / Tenor dropdowns 158x32 at x32/x230; Currencies box 356x110; Cancel + "Add Permissions" 156x32 teal at y350. ALTERNATE 5580:14626 (5580:14451) 510x406: Product = 4 checkboxes (Spot, Forwards, Vanilla Options, Exotic Options; x32/110/218/363), Tenor stacked, Currencies box 446x91. Which is canonical is not determinable from Figma: owner decision = 5587 primary, 5580 alternate.

Status: **Figma-defined**.

```html
<!-- Add Permissions — primary (420x406) -->
<div class="modal modal--add-permissions">
  <div class="modal__header">
    <h2 class="modal__title">Add Permissions</h2>
  </div>
  <div class="modal__body">
    <div class="field field--label-14">
      <span class="field__label">Product</span>
      <button type="button" class="select"><span class="select__value">Spot</span><i class="icon icon-caret-down-filled-11x6"></i></button>
    </div>
    <div class="field field--label-14">
      <span class="field__label">Tenor</span>
      <button type="button" class="select"><span class="select__value">1 month</span><i class="icon icon-caret-down-filled-11x6"></i></button>
    </div>
    <div class="field field--label-14 modal__span-all">
      <span class="field__label">Currencies</span>
      <div class="value-box" style="width:100%">CHF, INR, PEN, USD, NZD, DKK, SEK, NOK, PLN, CZK, HUF, TRY, ZAR, MXN, BRL, CLP, COP, SGD, HKD, JPY, AUD, CAD, GBP, EUR, CNH, THB, PHP, IDR, KRW, TWD, ILS, RON, CHF, INR, PEN, USD, NZD, DKK, SEK, NOK, PLN, CZK, HUF, TRY, ZAR, MXN, BR</div>
    </div>
  </div>
  <div class="modal__footer">
    <button type="button" class="btn btn-cancel">Cancel</button>
    <button type="button" class="btn btn-teal modal__footer-end">Add Permissions</button>
  </div>
</div>

<!-- Add Permissions — alternate (510x406) -->
<div class="modal modal--add-permissions-alt">
  <div class="modal__header">
    <h2 class="modal__title">Add Permissions</h2>
  </div>
  <div class="modal__body">
    <div class="field field--label-14">
      <span class="field__label">Product</span>
      <div class="modal-checkboxes">
        <label class="checkbox-field"><input type="checkbox" class="checkbox" checked><span>Spot</span></label>
        <label class="checkbox-field"><input type="checkbox" class="checkbox"><span>Forwards</span></label>
        <label class="checkbox-field"><input type="checkbox" class="checkbox"><span>Vanilla Options</span></label>
        <label class="checkbox-field"><input type="checkbox" class="checkbox"><span>Exotic Options</span></label>
      </div>
    </div>
    <div class="field field--label-14" style="--field-w:158px">
      <span class="field__label">Tenor</span>
      <button type="button" class="select"><span class="select__value">1 month</span><i class="icon icon-caret-down-filled-11x6"></i></button>
    </div>
    <div class="field field--label-14 field--currencies">
      <span class="field__label">Currencies</span>
      <div class="value-box" style="width:100%">CHF, INR, PEN, USD, NZD, DKK, SEK, NOK, PLN, CZK, HUF, TRY, ZAR, MXN, BRL, CLP, COP, SGD, HKD, JPY, AUD, CAD, GBP, EUR, CNH, THB, PHP, IDR, KRW, TWD, ILS, RON, CHF, INR, PEN, USD, NZD, DKK, SEK, NOK, PLN, CZK, HUF, </div>
    </div>
  </div>
  <div class="modal__footer">
    <button type="button" class="btn btn-cancel">Cancel</button>
    <button type="button" class="btn btn-teal modal__footer-end">Add Permissions</button>
  </div>
</div>
```

### Allocate Block + ID Status popover

**Figma:** Allocate Block 2696:2682 (372x385): trade rows y85/y129 (pitch 44), heads "Quantity" x165 / "Trade Price" x252 Regular 12 #707079, values Medium 12; Search with label "Account" 308x44 at (32,185); Quantity/Price 146x44 (gap 16) at y253 (Quantity "active bordered"); Cancel / Allocate 102x32 {Add New}. ID Status 3396:7300 (301x440 #242428 r12): title "Deal 12345678" Medium 18; rules y61/y155/y366 full, y274 inset; headings Regular 16 #7373BB; status tick 16x12 / cross 12x12 at x217; action chip 24x24 at x253; prime-broker tag 32x12 r2 #E6E6E6 (failed #707079) Regular 8; meta Medium Italic 10; scrollbar 4px at x289 (thumb 128.07).

Status: **Figma-defined**.

ID Status: the positions of the prime-broker tags, meta lines and the second amendment trade (Trade 124) are visual estimates; the spec gives y only for headings, rules, status labels and the scrollbar. Nothing here is outside the drawn design (not Extended).

```html
<!-- Allocate Block (372x385) -->
<div class="modal modal--372 modal--allocate">
  <div class="modal__header">
    <h2 class="modal__title">Allocate Block</h2>
  </div>
  <div class="modal__body">
    <div class="alloc-trade"><span class="alloc-trade__id">Trade <b>1234567</b></span><span class="is-head">Quantity</span><span class="is-head">Trade Price</span><span>AlpFin</span><span>110.00</span><span>16.8</span></div>
    <div class="alloc-trade"><span class="alloc-trade__id">Trade <b>1234568</b></span><span class="is-head">Quantity</span><span class="is-head">Trade Price</span><span>Goldman</span><span>130.00</span><span>16.9</span></div>
    <div class="field">
      <span class="field__label">Account</span>
      <div class="search"><i class="icon icon-search"></i><input class="input__control" placeholder="Select Account"></div>
    </div>
    <div class="alloc-pair">
      <div class="field"><span class="field__label">Quantity</span><input class="input is-focus" value="240.00"></div>
      <div class="field"><span class="field__label">Trade Price</span><input class="input" value="17.5"></div>
    </div>
  </div>
  <div class="modal__footer">
    <button type="button" class="btn btn-cancel">Cancel</button>
    <button type="button" class="btn btn-teal modal__footer-end">Allocate</button>
  </div>
</div>

<!-- ID Status (301x440) -->
<div class="id-status">
  <h2 class="abs id-status__title" style="--x:24px;--y:24px">Deal <b>12345678</b></h2>
  <button type="button" class="id-status__close" aria-label="Close"><i class="icon icon-close-16"></i></button>
  <div class="id-status__rule" style="--y:61px"></div>
  <span class="abs id-status__heading" style="--x:24px;--y:77px">New Trades</span><span class="abs id-status__label" style="--x:32px;--y:106px">Give-up Status</span>
<span class="abs" style="--x:217px;--y:104px">
  <i class="icon icon-check status-tick"></i>
  </span><span class="abs" style="--x:253px;--y:102px">
  <i class="asset asset-action-download-chip"></i>
  </span><span class="abs pb-tag" style="--x:32px;--y:128px">RBS</span><span class="abs id-status__meta" style="--x:72px;--y:129px">10 Oct 2024 15:36</span><span class="abs id-status__meta" style="--x:249px;--y:129px">2.5KB</span>
  <div class="id-status__rule" style="--y:155px"></div>
  <span class="abs id-status__heading" style="--x:24px;--y:171px">Amendments</span><span class="abs id-status__trade" style="--x:24px;--y:198px">Trade <b>123</b></span><span class="abs id-status__label" style="--x:32px;--y:227px">Give-up Status</span><span class="abs" style="--x:217px;--y:227px">
  <i class="asset asset-close-red-12"></i>
  </span><span class="abs" style="--x:253px;--y:223px">
  <i class="asset asset-action-refresh-chip"></i>
  </span><span class="abs pb-tag pb-tag--failed" style="--x:32px;--y:249px">RBS</span><span class="abs id-status__meta" style="--x:78px;--y:250px">Please retry give-up</span><span class="abs id-status__meta" style="--x:249px;--y:250px">0 KB</span>
  <div class="id-status__rule id-status__rule--inset" style="--y:274px"></div>
  <span class="abs id-status__trade" style="--x:24px;--y:290px">Trade <b>124</b></span><span class="abs id-status__label" style="--x:32px;--y:319px">Give-up Status</span><span class="abs" style="--x:217px;--y:317px">
  <i class="icon icon-check status-tick"></i>
  </span><span class="abs pb-tag pb-tag--wide" style="--x:32px;--y:341px">HSBC</span><span class="abs id-status__meta" style="--x:78px;--y:342px">10 Oct 2024 15:36</span>
  <div class="id-status__rule" style="--y:366px"></div>
  <span class="abs id-status__heading" style="--x:24px;--y:382px">Deletions</span><span class="abs id-status__label" style="--x:32px;--y:405px">Not applicable</span>
  <div class="scrollbar id-status__scroll" style="width:4px">
    <div class="scrollbar__thumb" style="height:128.07px"></div>
  </div>
</div>
```

### Segmented control (BUY/SELL, PUT/CALL)

**Figma:** trading.md 4.3 (drawn from rectangles, not a component; 172x32): outline r4 stroke 1 INSIDE, left half 82.87x32 r 4/0/0/4; labels SemiBold 14 centred. BUY/SELL neutral outline+labels #FF9747 {Edit}; BUY selected left half filled {Edit}, BUY #000000; Put/Call neutral #A4A4FF; Put selected (Vanilla MM) left filled #A4A4FF, outline #707079, PUT #000000, CALL #707079; Market Side locked outline #707079, SELL half filled {Edit} (w89), selected label #242428, unselected #707079.

Status: **Figma-defined** (states marked EXTENDED below are not drawn in Figma).

Selected half: `.is-selected`. Not drawn: SELL-selected neutral variant in client frames (Swap MM shows SELL filled). There is NO big execution BUY/SELL button anywhere in the design.

```html
<!-- Side — neutral -->
<div class="segmented">
  <button type="button" class="segmented__btn">BUY</button>
  <button type="button" class="segmented__btn">SELL</button>
</div>

<!-- Side — BUY selected -->
<div class="segmented">
  <button type="button" class="segmented__btn is-selected">BUY</button>
  <button type="button" class="segmented__btn">SELL</button>
</div>

<!-- Put / Call — neutral -->
<div class="segmented segmented--putcall">
  <button type="button" class="segmented__btn">PUT</button>
  <button type="button" class="segmented__btn">CALL</button>
</div>

<!-- Put selected, locked -->
<div class="segmented segmented--putcall segmented--locked">
  <button type="button" class="segmented__btn is-selected">PUT</button>
  <button type="button" class="segmented__btn">CALL</button>
</div>

<!-- Market Side locked (SELL) -->
<div class="segmented segmented--locked">
  <button type="button" class="segmented__btn">BUY</button>
  <button type="button" class="segmented__btn is-selected">SELL</button>
</div>

<!-- Hover — EXTENDED: hover: unselected white@0.2, selected white@0.3 (none drawn) -->
<div class="segmented">
  <button type="button" class="segmented__btn is-hover">BUY</button>
  <button type="button" class="segmented__btn">SELL</button>
</div>

<!-- Focus — EXTENDED: focus ring 1px #A4A4FF offset 2px -->
<div class="segmented">
  <button type="button" class="segmented__btn is-focus">BUY</button>
  <button type="button" class="segmented__btn">SELL</button>
</div>
```

---

## Widgets

Dashboard widget cards: Activity Blotter, Trades, Rates (Prices).

### Widget card (title bar, grip, close, resize, scrollbar)

**Figma:** card FRAME fill #242428 {Modal BG} r8 clip (no stroke/shadow); title bar Rectangle 18 height 32 fill #39393C {Inputs on modal}; title Medium 14 at x16; drag handle "Union" 10x16 #BABEC7 (50 from the right edge; Activity 58, 10x14.94); close 16x16 #BABEC7 (12 from the right; Activity 16); resize grip Frame 28 24x24 at the bottom-right (L corner stroke 2 #BABEC7); scrollbar 4 wide (r12 #39393C + shadow, thumb #707079). Dashboard 6038:13964: Activity 1070x315, Trades 1070x587, Prices 290x911.

Status: **Figma-defined** (states marked EXTENDED below are not drawn in Figma).

Behaviour: grip = drag handle (`cursor: grab`), `.widget__close` removes the widget, `.widget__resize` is the bottom-right resize grip (`cursor: nwse-resize`). Figma draws none of the drag/resize/close states or animations.

```html
<!-- Widget (320x160) -->
<section class="widget" style="width:320px;height:160px">
  <div class="widget__bar">
    <h3 class="widget__title">Widget</h3>
    <button type="button" class="widget__grip" aria-label="Drag widget"><i class="icon icon-grip-dots-10x16"></i></button>
    <button type="button" class="widget__close" aria-label="Close widget"><i class="icon icon-close-16"></i></button>
  </div>
  <div class="widget__body"></div>
  <button type="button" class="widget__resize" aria-label="Resize widget"><i class="icon icon-corner-arrow-24"></i></button>
  <div class="scrollbar widget__scroll" style="--scroll-top:44px;--scroll-h:100px">
    <div class="scrollbar__thumb" style="height:40px"></div>
  </div>
</section>

<!-- Dragging (lift) — EXTENDED: drag lift = popover shadow (no drag state drawn) -->
<section class="widget is-dragging" style="width:320px;height:160px">
  <div class="widget__bar">
    <h3 class="widget__title">Widget</h3>
    <button type="button" class="widget__grip" aria-label="Drag widget"><i class="icon icon-grip-dots-10x16"></i></button>
    <button type="button" class="widget__close" aria-label="Close widget"><i class="icon icon-close-16"></i></button>
  </div>
  <div class="widget__body"></div>
  <button type="button" class="widget__resize" aria-label="Resize widget"><i class="icon icon-corner-arrow-24"></i></button>
</section>

<!-- Grip / close hover — EXTENDED: hover -> primary text colour (none drawn) -->
<section class="widget" style="width:320px;height:80px">
  <div class="widget__bar">
    <h3 class="widget__title">Widget</h3>
    <button type="button" class="widget__grip is-hover"><i class="icon icon-grip-dots-10x16"></i></button>
    <button type="button" class="widget__close is-hover"><i class="icon icon-close-16"></i></button>
  </div>
</section>
```

### Activity Blotter widget

**Figma:** Activity 6038:13704 (1070x315, newer; older 3631:4652 (1070x461 tab-heavy) and 6059:14318 are not built): tab row y32 h32 — two halves "Client" | "Market Maker" Medium 14 #A4A4FF centred (section titles, not toggles); hairline y64; headers Medium 12 #707079 centred y72; rows pitch 28 + 1px #39393C, cells Medium 12 #FFFFFF; left half: Account left x31, Trades right edge 242, Volume 391, P&L 516; ZERO P&L #707079; vertical divider at x581. Right half geometry measured 17px off the mirrored left (x820 vs 803): the left-half geometry is reused.

Status: **Figma-defined**.

```html
<!-- Activity 1070x315 -->
<section class="widget widget--activity" style="width:1070px;height:315px">
  <div class="widget__bar">
    <h3 class="widget__title">Activity Blotter</h3>
    <button type="button" class="widget__grip" aria-label="Drag widget"><i class="icon icon-grip-dots-10x15"></i></button>
    <button type="button" class="widget__close" aria-label="Close widget"><i class="icon icon-close-16"></i></button>
  </div>
  <div class="widget__body">
    <div class="activity">
      <div class="activity__half activity__half--left">
        <div class="activity__title">Client</div>
        <div class="activity__head"><span class="a-acc">Account</span><span class="a-trd">Trades</span><span class="a-vol">Volume</span><span class="a-pnl">P&amp;L (USD)</span></div>
        <div class="activity__row"><span class="a-acc">Makor Securities</span><span class="a-trd">639</span><span class="a-vol">2,890.32</span><span class="a-pnl">2,890.32</span></div>
        <div class="activity__row"><span class="a-acc">HSBC BH LB HSBC</span><span class="a-trd">639</span><span class="a-vol">48.52</span><span class="a-pnl is-zero">0.00</span></div>
      </div>
      <div class="activity__divider"></div>
      <div class="activity__half activity__half--right">
        <div class="activity__title">Market Maker</div>
        <div class="activity__head"><span class="a-acc">Account</span><span class="a-trd">Trades</span><span class="a-vol">Volume</span><span class="a-pnl">P&amp;L (USD)</span></div>
        <div class="activity__row"><span class="a-acc">Makor Securities</span><span class="a-trd">639</span><span class="a-vol">2,890.32</span><span class="a-pnl">2,890.32</span></div>
        <div class="activity__row"><span class="a-acc">HSBC BH LB HSBC</span><span class="a-trd">639</span><span class="a-vol">48.52</span><span class="a-pnl is-zero">0.00</span></div>
      </div>
    </div>
  </div>
  <button type="button" class="widget__resize" aria-label="Resize widget"><i class="icon icon-corner-arrow-24"></i></button>
  <div class="scrollbar widget__scroll" style="--scroll-top:96px;--scroll-h:195px">
    <div class="scrollbar__thumb" style="height:67.47px"></div>
  </div>
</section>
```

### Rates widget (Prices)

**Figma:** standalone Rates Widget 6234:14341 (290x794, no title bar; header labels Medium 14 at x54/x197, line y34, row pitch 28) and dashboard card "Prices" 6038:13992 (290x911; title bar + labels Medium 12 at x58/x201, line y56). Row: [flag 16x12 r2 + code Medium 12] "/" Medium 14 [flag + code]; price Medium 12 right aligned, up #2BDF68 / down #FD7557 + 12x12 circle-arrow (down = flipped). Only a single "Price" column (no bid/ask/spread).

Status: **Figma-defined** (states marked EXTENDED below are not drawn in Figma).

Prices tick colour is the only dynamic cue Figma draws (no flash on tick, no stale/loading state).

```html
<!-- Standalone (290x794, clipped to 520) -->
<div class="rates--standalone" style="height:520px">
  <div class="rates__head"><span class="r-sym">Symbol</span><span class="r-price">Price</span></div>
  <div class="rates">
    <div class="rates__row"><span class="rates__symbol"><span class="symbol"><i class="flag flag-au"></i>AUD<span class="symbol__slash">/</span><i class="flag flag-jp"></i>JPY</span></span><span class="rates__price">0.908518</span><i class="icon icon-arrow-circle rates__arrow"></i></div>
    <div class="rates__row is-down"><span class="rates__symbol"><span class="symbol"><i class="flag flag-no"></i>NOK<span class="symbol__slash">/</span><i class="flag flag-ph"></i>PHP</span></span><span class="rates__price">7.113453</span><i class="icon icon-arrow-circle icon-arrow-circle--down rates__arrow"></i></div>
    <div class="rates__row"><span class="rates__symbol"><span class="symbol"><i class="flag flag-au"></i>AUD<span class="symbol__slash">/</span><i class="flag flag-jp"></i>JPY</span></span><span class="rates__price">0.908518</span><i class="icon icon-arrow-circle rates__arrow"></i></div>
  </div>
</div>

<!-- Dashboard card "Prices" (clipped) -->
<section class="widget" style="width:290px;height:520px">
  <div class="widget__bar">
    <h3 class="widget__title">Rates</h3>
    <button type="button" class="widget__grip" aria-label="Drag widget"><i class="icon icon-grip-dots-10x16"></i></button>
    <button type="button" class="widget__close" aria-label="Close widget"><i class="icon icon-close-16"></i></button>
  </div>
  <div class="widget__body">
    <div class="rates">
      <div class="rates__head"><span class="r-sym">Symbol</span><span class="r-price">Price</span></div>
      <div class="rates__row"><span class="rates__symbol"><span class="symbol"><i class="flag flag-au"></i>AUD<span class="symbol__slash">/</span><i class="flag flag-jp"></i>JPY</span></span><span class="rates__price">0.908518</span><i class="icon icon-arrow-circle rates__arrow"></i></div>
      <div class="rates__row is-down"><span class="rates__symbol"><span class="symbol"><i class="flag flag-no"></i>NOK<span class="symbol__slash">/</span><i class="flag flag-ph"></i>PHP</span></span><span class="rates__price">7.113453</span><i class="icon icon-arrow-circle icon-arrow-circle--down rates__arrow"></i></div>
      <div class="rates__row"><span class="rates__symbol"><span class="symbol"><i class="flag flag-au"></i>AUD<span class="symbol__slash">/</span><i class="flag flag-jp"></i>JPY</span></span><span class="rates__price">0.908518</span><i class="icon icon-arrow-circle rates__arrow"></i></div>
    </div>
  </div>
  <button type="button" class="widget__resize" aria-label="Resize widget"><i class="icon icon-corner-arrow-24"></i></button>
  <div class="scrollbar widget__scroll" style="--scroll-top:60px;--scroll-h:400px">
    <div class="scrollbar__thumb" style="height:120px"></div>
  </div>
</section>

<!-- Row hover — EXTENDED: row hover = #39393C (the drawn highlighted-row fill) -->
<div class="rates" style="width:290px">
  <div class="rates__row" style="background:var(--color-surface-row-highlight)"><span class="rates__symbol"><span class="symbol"><i class="flag flag-au"></i>AUD<span class="symbol__slash">/</span><i class="flag flag-jp"></i>JPY</span></span><span class="rates__price">0.908518</span><i class="icon icon-arrow-circle rates__arrow"></i></div>
</div>
```

### Symbol cell (currency pair with flags)

**Figma:** Group 107x12: flag MasterFlag Rounded=yes 16x12 r2, gap 4, code Medium 12 #FFFFFF, "/" Medium 14 (w5) at +55 (8px gap to the next flag), second flag + code (6234:14462; blotter 3.6).

Status: **Figma-defined**.

```html
<!-- AUD / JPY -->
<span class="symbol">
<i class="flag flag-au"></i>
AUD<span class="symbol__slash">/</span>
<i class="flag flag-jp"></i>
JPY</span>

<!-- NOK / PHP -->
<span class="symbol">
<i class="flag flag-no"></i>
NOK<span class="symbol__slash">/</span>
<i class="flag flag-ph"></i>
PHP</span>

<!-- US flag 20x16 (Entities) -->
<span class="flag flag-us"></span>
```

### Trades widget (blotter toolbar + table)

**Figma:** Trades 6038:14417 (1070x587 at (8,379)): toolbar y40 h24, SemiBold 12 buttons: Group x8 / Amend x90 / Give-Up x178 / Delete x272 / Review x410 / status x518 / Clear Filters x622 / Search 205x24 x733 / New Trade x950; table cols as the Blotter (clipped at the card width, scrolls horizontally).

Status: **Figma-defined**.

```html
<!-- Trades 1070x587 -->
<section class="widget" style="width:1070px;height:587px">
  <div class="widget__bar">
    <h3 class="widget__title">Trades</h3>
    <button type="button" class="widget__grip" aria-label="Drag widget"><i class="icon icon-grip-dots-10x16"></i></button>
    <button type="button" class="widget__close" aria-label="Close widget"><i class="icon icon-close-16"></i></button>
  </div>
  <div class="widget__body">
    <div class="widget-toolbar">
      <button type="button" class="btn btn-sm btn-outline-yellow">Group</button>
      <button type="button" class="btn btn-sm btn-orange">Amend</button>
      <button type="button" class="btn btn-sm btn-outline-blue">Give-Up</button>
      <button type="button" class="btn btn-sm btn-delete">Delete</button>
      <button type="button" class="btn btn-sm btn-outline-red" style="margin-left:53px"><span>Review</span><span>(12)</span></button>
      <button type="button" class="btn btn-sm btn-status">Status<i class="icon icon-chevron-down-purple-10x6"></i></button>
      <button type="button" class="btn btn-sm btn-outline-purple">Clear Filters</button>
      <div class="search input--sm" style="margin-left:4px"><i class="icon icon-search"></i><input class="input__control" placeholder="Search"></div>
      <button type="button" class="btn btn-sm btn-with-dropdown" style="margin-left:4px">New Trade<i class="icon icon-chevron-down"></i></button>
    </div>
    <div class="blotter" style="margin-top:12px">
      <div class="blotter__head"><span class="c c-cb"><span class="deselect-all"><input type="checkbox" class="checkbox is-indeterminate"><span>(5)</span></span></span><span class="c c-id">ID</span><span class="c c-type">Type</span><span class="c c-client">Client</span><span class="c c-mm">Market Maker</span><span class="c c-side">Buy/Sell</span><span class="c c-qty">Quantity</span><span class="c c-sym">Symbol</span><span class="c c-cp">Client Price</span><span class="c c-mp">Market Maker Price</span><span class="c c-pnl">P&amp;L</span><span class="c c-td">Trade Date</span><span class="c c-vd">Value Date</span><span class="c c-pb">Prime Broker</span><span class="c c-dir">Direction</span></div>
      <div class="blotter__row blotter__row--new"><span class="c c-cb"><input type="checkbox" class="checkbox" checked></span><span class="c c-status">New</span><span class="c c-id">1234567</span><span class="c c-type">Client Spot</span><span class="c c-client">Goldman S...</span><span class="c c-mm">HSBC</span><span class="c c-side">SELL</span><span class="c c-qty">-12000</span><span class="c c-sym"><span class="symbol"><i class="flag flag-au"></i>AUD<span class="symbol__slash">/</span><i class="flag flag-jp"></i>JPY</span></span><span class="c c-cp">17.1213</span><span class="c c-mp">18.0878</span><span class="c c-pnl">5.0000</span><span class="c c-td">20/05/2024 13:32:35</span><span class="c c-vd">22/05/2024</span><span class="c c-pb">RBS</span><span class="c c-dir">Client</span></div>
      <div class="blotter__row blotter__row--new"><span class="c c-cb"><input type="checkbox" class="checkbox"></span><span class="c c-status">New</span><span class="c c-id">1234567</span><span class="c c-type">Market Spot</span><span class="c c-client">AlpFin</span><span class="c c-mm">HSBC</span><span class="c c-side">BUY</span><span class="c c-qty">12000</span><span class="c c-sym"><span class="symbol"><i class="flag flag-au"></i>AUD<span class="symbol__slash">/</span><i class="flag flag-jp"></i>JPY</span></span><span class="c c-cp">17.1213</span><span class="c c-mp">18.0878</span><span class="c c-pnl">3.0000</span><span class="c c-td">20/05/2024 13:32:35</span><span class="c c-vd">22/05/2024</span><span class="c c-pb">RBS</span><span class="c c-dir">Market Maker</span></div>
      <div class="blotter__row"><span class="c c-cb"><input type="checkbox" class="checkbox"></span><span class="c c-id c-link">1234566</span><span class="c c-type">B2B Spot</span><span class="c c-client">AlpFin</span><span class="c c-mm">HSBC</span><span class="c c-side">BUY</span><span class="c c-qty">200</span><span class="c c-sym"><span class="symbol"><i class="flag flag-no"></i>NOK<span class="symbol__slash">/</span><i class="flag flag-ph"></i>PHP</span></span><span class="c c-cp">48.4689</span><span class="c c-mp">48.5120</span><span class="c c-pnl">5.0000</span><span class="c c-td">20/05/2024 13:10:02</span><span class="c c-vd">22/05/2024</span><span class="c c-pb">RBS</span><span class="c c-dir">Client</span></div>
      <div class="blotter__row"><span class="c c-cb"><input type="checkbox" class="checkbox"></span><span class="c c-chev c-purple"><i class="icon icon-chevron-right-stroke"></i></span><span class="c c-id">1234565</span><span class="c c-type">Client Spot</span><span class="c c-client">AlpFin</span><span class="c c-mm">HSBC</span><span class="c c-side">SELL</span><span class="c c-qty">-200</span><span class="c c-sym"><span class="symbol"><i class="flag flag-no"></i>NOK<span class="symbol__slash">/</span><i class="flag flag-ph"></i>PHP</span></span><span class="c c-cp">48.1000</span><span class="c c-mp">48.1500</span><span class="c c-pnl">3.0000</span><span class="c c-td">20/05/2024 12:58:41</span><span class="c c-vd">22/05/2024</span><span class="c c-pb">RBS</span><span class="c c-dir">Client</span></div>
      <div class="blotter__row blotter__row--group-open"><span class="c c-cb"><input type="checkbox" class="checkbox"></span><span class="c c-chev c-purple"><i class="icon icon-chevron-right-stroke" style="transform:rotate(90deg)"></i></span><span class="c c-id">1234564</span><span class="c c-type">Client Spot</span><span class="c c-client">Goldman S...</span><span class="c c-mm">HSBC</span><span class="c c-side">SELL</span><span class="c c-qty">-12000</span><span class="c c-sym"><span class="symbol"><i class="flag flag-au"></i>AUD<span class="symbol__slash">/</span><i class="flag flag-jp"></i>JPY</span></span><span class="c c-cp">17.1213</span><span class="c c-mp">18.0878</span><span class="c c-pnl">5.0000</span><span class="c c-td">20/05/2024 12:30:12</span><span class="c c-vd">22/05/2024</span><span class="c c-pb">RBS</span><span class="c c-dir">Client</span></div>
      <div class="blotter__children">
        <div class="blotter__row"><span class="c c-cb"><input type="checkbox" class="checkbox"></span><span class="c c-id">1234564</span><span class="c c-type">Client Spot</span><span class="c c-client">Goldman S...</span><span class="c c-mm">HSBC</span><span class="c c-side">SELL</span><span class="c c-qty">-6000</span><span class="c c-sym"><span class="symbol"><i class="flag flag-au"></i>AUD<span class="symbol__slash">/</span><i class="flag flag-jp"></i>JPY</span></span><span class="c c-cp">17.1213</span><span class="c c-mp">18.0878</span><span class="c c-pnl">5.0000</span><span class="c c-td">20/05/2024 12:30:12</span><span class="c c-vd">22/05/2024</span><span class="c c-pb">RBS</span><span class="c c-dir">Client</span></div>
        <div class="blotter__row"><span class="c c-cb"><input type="checkbox" class="checkbox"></span><span class="c c-id">1234564</span><span class="c c-type">Client Spot</span><span class="c c-client">Goldman S...</span><span class="c c-mm">HSBC</span><span class="c c-side">SELL</span><span class="c c-qty">-6000</span><span class="c c-sym"><span class="symbol"><i class="flag flag-au"></i>AUD<span class="symbol__slash">/</span><i class="flag flag-jp"></i>JPY</span></span><span class="c c-cp">17.1213</span><span class="c c-mp">18.0878</span><span class="c c-pnl">5.0000</span><span class="c c-td">20/05/2024 12:30:12</span><span class="c c-vd">22/05/2024</span><span class="c c-pb">RBS</span><span class="c c-dir">Client</span></div>
      </div>
      <div class="blotter__row blotter__row--ungrouped"><span class="c c-cb"><input type="checkbox" class="checkbox"></span><span class="c c-ico"><i class="asset asset-link-broken-yellow-14"></i></span><span class="c c-id">1234563</span><span class="c c-type">Market Spot</span><span class="c c-client">AlpFin</span><span class="c c-mm">HSBC</span><span class="c c-side">BUY</span><span class="c c-qty">12000</span><span class="c c-sym"><span class="symbol"><i class="flag flag-au"></i>AUD<span class="symbol__slash">/</span><i class="flag flag-jp"></i>JPY</span></span><span class="c c-cp">17.1213</span><span class="c c-mp">18.0878</span><span class="c c-pnl">5.0000</span><span class="c c-td">20/05/2024 12:01:55</span><span class="c c-vd">22/05/2024</span><span class="c c-pb">RBS</span><span class="c c-dir">Client</span></div>
      <div class="blotter__row blotter__row--unallocated"><span class="c c-cb"><input type="checkbox" class="checkbox"></span><span class="c c-ico"><i class="icon icon-warning c-edit"></i></span><span class="c c-id">1234562</span><span class="c c-type">Client Spot</span><span class="c c-client">UNALLOC</span><span class="c c-mm"></span><span class="c c-side">SELL</span><span class="c c-qty">-200</span><span class="c c-sym"><span class="symbol"><i class="flag flag-no"></i>NOK<span class="symbol__slash">/</span><i class="flag flag-ph"></i>PHP</span></span><span class="c c-cp">17.1213</span><span class="c c-mp">18.0878</span><span class="c c-pnl">5.0000</span><span class="c c-td">20/05/2024 11:47:09</span><span class="c c-vd">22/05/2024</span><span class="c c-pb">RBS</span><span class="c c-dir">Client</span></div>
      <div class="blotter__row"><span class="c c-cb"><input type="checkbox" class="checkbox"></span><span class="c c-id">1234561</span><span class="c c-type">Client Spot</span><span class="c c-client">AlpFin</span><span class="c c-mm">HSBC</span><span class="c c-side">SELL</span><span class="c c-qty">-12000</span><span class="c c-sym"><span class="symbol"><i class="flag flag-au"></i>AUD<span class="symbol__slash">/</span><i class="flag flag-jp"></i>JPY</span></span><span class="c c-cp">17.1213</span><span class="c c-mp">18.0878</span><span class="c c-pnl">5.0000</span><span class="c c-td">20/05/2024 11:20:33</span><span class="c c-vd">22/05/2024</span><span class="c c-pb">RBS</span><span class="c c-dir">Client</span></div>
    </div>
  </div>
  <button type="button" class="widget__resize" aria-label="Resize widget"><i class="icon icon-corner-arrow-24"></i></button>
</section>
```

---

## Blotter

Trades Blotter, Deleted trades, CSV list, Reports, and the new-trade insertion animation.

### Blotter toolbar row

**Figma:** Blotters 2281:1414 y64, all h32: Group x8 (88, Outlined purple) | Amend x104 (95) | Allocate x207 (102, Button transparent) | Give-Up x318 (102, raw #00FEA9) | Delete x428 (91) ... New Trade x748 (132 HUG) | chips x904/944/984 (32 round) | Search x1040 (205) | Prices toggle x1277 (91; stroke 1 #A4A4FF r3; default no fill, active fill #39394E 2876:3113). Left group gap 8, right group gaps 24/8/8/24/32 ending 16 from the edge.

Status: **Figma-defined**.

TODO (assets): the 16x16 "Prices" glyph (rates toggle 3107:7158) is NOT exported; the icon slot is left empty. Never draw it by hand.

```html
<!-- Toolbar (1384) -->
<div style="width:1384px">
  <div class="app__strip" style="padding:0">
    <div class="toolbar" style="flex:1">
      <div class="toolbar__group">
        <button type="button" class="btn btn-outline-purple">Group</button>
        <button type="button" class="btn btn-orange">Amend</button>
        <button type="button" class="btn btn-transparent">Allocate</button>
        <button type="button" class="btn btn-outline-teal btn-outline-teal--giveup">Give-Up</button>
        <button type="button" class="btn btn-delete">Delete</button>
      </div>
      <div class="toolbar__group">
        <button type="button" class="btn btn-with-dropdown">New Trade<i class="icon icon-chevron-down"></i></button>
        <button type="button" class="btn-icon-chip btn-icon-chip--round ml-16" aria-label="Ungrouped"><i class="asset asset-link-broken-yellow-14"></i></button>
        <button type="button" class="btn-icon-chip btn-icon-chip--round" aria-label="Warnings"><i class="icon icon-warning"></i></button>
        <button type="button" class="btn-icon-chip btn-icon-chip--round" aria-label="Filters"><i class="asset asset-action-filter-circle"></i></button>
        <div class="search ml-16" style="--input-w:205px"><i class="icon icon-search"></i><input class="input__control" placeholder="Search"></div>
        <button type="button" class="btn btn-outline-purple btn-toggle ml-24" aria-pressed="false">Prices</button>
      </div>
    </div>
  </div>
</div>

<!-- Prices toggle — active -->
<button type="button" class="btn btn-outline-purple btn-toggle is-on" aria-pressed="true">Prices</button>
```

### Trade blotter table (rows and states)

**Figma:** Blotter 3107:6695 (1384x920 #171719): header 34 + 1px rule, labels Medium 14 #707079 centred; rows pitch 28 + 1px #39393C, cells Medium 12 #FFFFFF (free-positioned x as drawn); BUY/SELL plain white. States (trading.md 3.5): New = #30F0D6@0.15 + "New" #30F0D6 at x32; Ungrouped = #FFB800@0.15 + link-broken 14x14 #FFDC51 at x46; Unallocated = #242432 + warning 14x12 {Edit}; group parent expanded = #242428 + child block (#39393C@0.8, 1px #707079 OUTSIDE, rows 24, text #BABEC7); selected = checkbox only; clickable ID #60A8FF. Hover/focus/pressed row NOT drawn.

Status: **Figma-defined** (states marked EXTENDED below are not drawn in Figma).

Cells are absolutely positioned per column (`.c-id`, `.c-type`, …) because Figma draws the table that way; numerics are right aligned. Row click: toggle the checkbox; right-click opens the context menu (`.popover.menu`).

```html
<!-- Blotter (1384 wide) -->
<div class="blotter" style="width:1384px">
  <div class="blotter__head"><span class="c c-cb"><span class="deselect-all"><input type="checkbox" class="checkbox is-indeterminate"><span>(5)</span></span></span><span class="c c-id">ID</span><span class="c c-type">Type</span><span class="c c-client">Client</span><span class="c c-mm">Market Maker</span><span class="c c-side">Buy/Sell</span><span class="c c-qty">Quantity</span><span class="c c-sym">Symbol</span><span class="c c-cp">Client Price</span><span class="c c-mp">Market Maker Price</span><span class="c c-pnl">P&amp;L</span><span class="c c-td">Trade Date</span><span class="c c-vd">Value Date</span><span class="c c-pb">Prime Broker</span><span class="c c-dir">Direction</span></div>
  <div class="blotter__row blotter__row--new"><span class="c c-cb"><input type="checkbox" class="checkbox" checked></span><span class="c c-status">New</span><span class="c c-id">1234567</span><span class="c c-type">Client Spot</span><span class="c c-client">Goldman S...</span><span class="c c-mm">HSBC</span><span class="c c-side">SELL</span><span class="c c-qty">-12000</span><span class="c c-sym"><span class="symbol"><i class="flag flag-au"></i>AUD<span class="symbol__slash">/</span><i class="flag flag-jp"></i>JPY</span></span><span class="c c-cp">17.1213</span><span class="c c-mp">18.0878</span><span class="c c-pnl">5.0000</span><span class="c c-td">20/05/2024 13:32:35</span><span class="c c-vd">22/05/2024</span><span class="c c-pb">RBS</span><span class="c c-dir">Client</span></div>
  <div class="blotter__row blotter__row--new"><span class="c c-cb"><input type="checkbox" class="checkbox"></span><span class="c c-status">New</span><span class="c c-id">1234567</span><span class="c c-type">Market Spot</span><span class="c c-client">AlpFin</span><span class="c c-mm">HSBC</span><span class="c c-side">BUY</span><span class="c c-qty">12000</span><span class="c c-sym"><span class="symbol"><i class="flag flag-au"></i>AUD<span class="symbol__slash">/</span><i class="flag flag-jp"></i>JPY</span></span><span class="c c-cp">17.1213</span><span class="c c-mp">18.0878</span><span class="c c-pnl">3.0000</span><span class="c c-td">20/05/2024 13:32:35</span><span class="c c-vd">22/05/2024</span><span class="c c-pb">RBS</span><span class="c c-dir">Market Maker</span></div>
  <div class="blotter__row"><span class="c c-cb"><input type="checkbox" class="checkbox"></span><span class="c c-id c-link">1234566</span><span class="c c-type">B2B Spot</span><span class="c c-client">AlpFin</span><span class="c c-mm">HSBC</span><span class="c c-side">BUY</span><span class="c c-qty">200</span><span class="c c-sym"><span class="symbol"><i class="flag flag-no"></i>NOK<span class="symbol__slash">/</span><i class="flag flag-ph"></i>PHP</span></span><span class="c c-cp">48.4689</span><span class="c c-mp">48.5120</span><span class="c c-pnl">5.0000</span><span class="c c-td">20/05/2024 13:10:02</span><span class="c c-vd">22/05/2024</span><span class="c c-pb">RBS</span><span class="c c-dir">Client</span></div>
  <div class="blotter__row"><span class="c c-cb"><input type="checkbox" class="checkbox"></span><span class="c c-chev c-purple"><i class="icon icon-chevron-right-stroke"></i></span><span class="c c-id">1234565</span><span class="c c-type">Client Spot</span><span class="c c-client">AlpFin</span><span class="c c-mm">HSBC</span><span class="c c-side">SELL</span><span class="c c-qty">-200</span><span class="c c-sym"><span class="symbol"><i class="flag flag-no"></i>NOK<span class="symbol__slash">/</span><i class="flag flag-ph"></i>PHP</span></span><span class="c c-cp">48.1000</span><span class="c c-mp">48.1500</span><span class="c c-pnl">3.0000</span><span class="c c-td">20/05/2024 12:58:41</span><span class="c c-vd">22/05/2024</span><span class="c c-pb">RBS</span><span class="c c-dir">Client</span></div>
  <div class="blotter__row blotter__row--group-open"><span class="c c-cb"><input type="checkbox" class="checkbox"></span><span class="c c-chev c-purple"><i class="icon icon-chevron-right-stroke" style="transform:rotate(90deg)"></i></span><span class="c c-id">1234564</span><span class="c c-type">Client Spot</span><span class="c c-client">Goldman S...</span><span class="c c-mm">HSBC</span><span class="c c-side">SELL</span><span class="c c-qty">-12000</span><span class="c c-sym"><span class="symbol"><i class="flag flag-au"></i>AUD<span class="symbol__slash">/</span><i class="flag flag-jp"></i>JPY</span></span><span class="c c-cp">17.1213</span><span class="c c-mp">18.0878</span><span class="c c-pnl">5.0000</span><span class="c c-td">20/05/2024 12:30:12</span><span class="c c-vd">22/05/2024</span><span class="c c-pb">RBS</span><span class="c c-dir">Client</span></div>
  <div class="blotter__children">
    <div class="blotter__row"><span class="c c-cb"><input type="checkbox" class="checkbox"></span><span class="c c-id">1234564</span><span class="c c-type">Client Spot</span><span class="c c-client">Goldman S...</span><span class="c c-mm">HSBC</span><span class="c c-side">SELL</span><span class="c c-qty">-6000</span><span class="c c-sym"><span class="symbol"><i class="flag flag-au"></i>AUD<span class="symbol__slash">/</span><i class="flag flag-jp"></i>JPY</span></span><span class="c c-cp">17.1213</span><span class="c c-mp">18.0878</span><span class="c c-pnl">5.0000</span><span class="c c-td">20/05/2024 12:30:12</span><span class="c c-vd">22/05/2024</span><span class="c c-pb">RBS</span><span class="c c-dir">Client</span></div>
    <div class="blotter__row"><span class="c c-cb"><input type="checkbox" class="checkbox"></span><span class="c c-id">1234564</span><span class="c c-type">Client Spot</span><span class="c c-client">Goldman S...</span><span class="c c-mm">HSBC</span><span class="c c-side">SELL</span><span class="c c-qty">-6000</span><span class="c c-sym"><span class="symbol"><i class="flag flag-au"></i>AUD<span class="symbol__slash">/</span><i class="flag flag-jp"></i>JPY</span></span><span class="c c-cp">17.1213</span><span class="c c-mp">18.0878</span><span class="c c-pnl">5.0000</span><span class="c c-td">20/05/2024 12:30:12</span><span class="c c-vd">22/05/2024</span><span class="c c-pb">RBS</span><span class="c c-dir">Client</span></div>
  </div>
  <div class="blotter__row blotter__row--ungrouped"><span class="c c-cb"><input type="checkbox" class="checkbox"></span><span class="c c-ico"><i class="asset asset-link-broken-yellow-14"></i></span><span class="c c-id">1234563</span><span class="c c-type">Market Spot</span><span class="c c-client">AlpFin</span><span class="c c-mm">HSBC</span><span class="c c-side">BUY</span><span class="c c-qty">12000</span><span class="c c-sym"><span class="symbol"><i class="flag flag-au"></i>AUD<span class="symbol__slash">/</span><i class="flag flag-jp"></i>JPY</span></span><span class="c c-cp">17.1213</span><span class="c c-mp">18.0878</span><span class="c c-pnl">5.0000</span><span class="c c-td">20/05/2024 12:01:55</span><span class="c c-vd">22/05/2024</span><span class="c c-pb">RBS</span><span class="c c-dir">Client</span></div>
  <div class="blotter__row blotter__row--unallocated"><span class="c c-cb"><input type="checkbox" class="checkbox"></span><span class="c c-ico"><i class="icon icon-warning c-edit"></i></span><span class="c c-id">1234562</span><span class="c c-type">Client Spot</span><span class="c c-client">UNALLOC</span><span class="c c-mm"></span><span class="c c-side">SELL</span><span class="c c-qty">-200</span><span class="c c-sym"><span class="symbol"><i class="flag flag-no"></i>NOK<span class="symbol__slash">/</span><i class="flag flag-ph"></i>PHP</span></span><span class="c c-cp">17.1213</span><span class="c c-mp">18.0878</span><span class="c c-pnl">5.0000</span><span class="c c-td">20/05/2024 11:47:09</span><span class="c c-vd">22/05/2024</span><span class="c c-pb">RBS</span><span class="c c-dir">Client</span></div>
  <div class="blotter__row"><span class="c c-cb"><input type="checkbox" class="checkbox"></span><span class="c c-id">1234561</span><span class="c c-type">Client Spot</span><span class="c c-client">AlpFin</span><span class="c c-mm">HSBC</span><span class="c c-side">SELL</span><span class="c c-qty">-12000</span><span class="c c-sym"><span class="symbol"><i class="flag flag-au"></i>AUD<span class="symbol__slash">/</span><i class="flag flag-jp"></i>JPY</span></span><span class="c c-cp">17.1213</span><span class="c c-mp">18.0878</span><span class="c c-pnl">5.0000</span><span class="c c-td">20/05/2024 11:20:33</span><span class="c c-vd">22/05/2024</span><span class="c c-pb">RBS</span><span class="c c-dir">Client</span></div>
</div>

<!-- Row hover — EXTENDED: row hover = #39393C (the drawn highlighted-row fill, file list) -->
<div class="blotter" style="width:1384px">
  <div class="blotter__row" style="background:var(--color-surface-row-highlight)"><span class="c c-cb"><input type="checkbox" class="checkbox"></span><span class="c c-id">1234561</span><span class="c c-type">Client Spot</span><span class="c c-client">Goldman S...</span><span class="c c-mm">HSBC</span><span class="c c-side">SELL</span><span class="c c-qty">-12000</span><span class="c c-sym"><span class="symbol"><i class="flag flag-au"></i>AUD<span class="symbol__slash">/</span><i class="flag flag-jp"></i>JPY</span></span><span class="c c-cp">17.1213</span><span class="c c-mp">18.0878</span><span class="c c-pnl">5.0000</span><span class="c c-td">20/05/2024 13:32:35</span><span class="c c-vd">22/05/2024</span><span class="c c-pb">RBS</span><span class="c c-dir">Client</span></div>
</div>

<!-- Header with sort/filter affordance — EXTENDED: sort/filter glyphs: assets exist (6234:15097/15099) but no placement is drawn in the blotter -->
<div class="blotter" style="width:1384px">
  <div class="blotter__head"><span class="c c-id">ID<span class="th-sort"><i class="icon icon-sort-arrows-10x8"></i></span></span><span class="c c-type">Type<span class="th-sort"><i class="icon icon-filter-funnel-8"></i></span></span></div>
</div>

<!-- Empty state — EXTENDED: empty table = the drawn empty-state text style ("Select a trading account" Medium 16 #BABEC7) -->
<div class="blotter" style="width:600px">
  <div class="blotter__empty">No trades</div>
</div>

<!-- Skeleton — EXTENDED: loading placeholder (#39393C pulse); Figma draws no loading state -->
<div style="width:300px;display:grid;gap:8px"><span class="skeleton"></span><span class="skeleton" style="width:70%"></span></div>
```

### Deleted trades

**Figma:** Deleted trades 2936:3140: same shell, title "Deleted Trades"; toolbar: Search 205x32 at x16 + circle filter button 32x32 at (1336,64); table = same header labels/rows with NO checkbox/status columns and no tints; own x set (ID x28 ... Direction x1280; header labels ID 46 ... Direction 1284).

Status: **Figma-defined**.

```html
<!-- Deleted trades table -->
<div class="blotter blotter--deleted" style="width:1384px">
  <div class="blotter__head"><span class="c c-id">ID</span><span class="c c-type">Type</span><span class="c c-client">Client</span><span class="c c-mm">Market Maker</span><span class="c c-side">Buy/Sell</span><span class="c c-qty">Quantity</span><span class="c c-sym">Symbol</span><span class="c c-cp">Client Price</span><span class="c c-mp">Market Maker Price</span><span class="c c-pnl">P&amp;L</span><span class="c c-td">Trade Date</span><span class="c c-vd">Value Date</span><span class="c c-pb">Prime Broker</span><span class="c c-dir">Direction</span></div>
  <div class="blotter__row"><span class="c c-id">1234567</span><span class="c c-type">Client Spot</span><span class="c c-client">Goldman S...</span><span class="c c-mm">HSBC</span><span class="c c-side">SELL</span><span class="c c-qty">-12000</span><span class="c c-sym"><span class="symbol"><i class="flag flag-au"></i>AUD<span class="symbol__slash">/</span><i class="flag flag-jp"></i>JPY</span></span><span class="c c-cp">17.1213</span><span class="c c-mp">18.0878</span><span class="c c-pnl">5.0000</span><span class="c c-td">20/05/2024 13:32:35</span><span class="c c-vd">22/05/2024</span><span class="c c-pb">RBS</span><span class="c c-dir">Client</span></div>
  <div class="blotter__row"><span class="c c-id">1234566</span><span class="c c-type">B2B Spot</span><span class="c c-client">AlpFin</span><span class="c c-mm">HSBC</span><span class="c c-side">BUY</span><span class="c c-qty">200</span><span class="c c-sym"><span class="symbol"><i class="flag flag-no"></i>NOK<span class="symbol__slash">/</span><i class="flag flag-ph"></i>PHP</span></span><span class="c c-cp">17.1213</span><span class="c c-mp">18.0878</span><span class="c c-pnl">5.0000</span><span class="c c-td">20/05/2024 13:32:35</span><span class="c c-vd">22/05/2024</span><span class="c c-pb">RBS</span><span class="c c-dir">Market Maker</span></div>
  <div class="blotter__row"><span class="c c-id">1234565</span><span class="c c-type">Client Spot</span><span class="c c-client">AlpFin</span><span class="c c-mm">HSBC</span><span class="c c-side">SELL</span><span class="c c-qty">-200</span><span class="c c-sym"><span class="symbol"><i class="flag flag-no"></i>NOK<span class="symbol__slash">/</span><i class="flag flag-ph"></i>PHP</span></span><span class="c c-cp">17.1213</span><span class="c c-mp">18.0878</span><span class="c c-pnl">5.0000</span><span class="c c-td">20/05/2024 13:32:35</span><span class="c c-vd">22/05/2024</span><span class="c c-pb">RBS</span><span class="c c-dir">Client</span></div>
  <div class="blotter__row"><span class="c c-id">1234564</span><span class="c c-type">Market Spot</span><span class="c c-client">Goldman S...</span><span class="c c-mm">HSBC</span><span class="c c-side">BUY</span><span class="c c-qty">12000</span><span class="c c-sym"><span class="symbol"><i class="flag flag-au"></i>AUD<span class="symbol__slash">/</span><i class="flag flag-jp"></i>JPY</span></span><span class="c c-cp">17.1213</span><span class="c c-mp">18.0878</span><span class="c c-pnl">5.0000</span><span class="c c-td">20/05/2024 13:32:35</span><span class="c c-vd">22/05/2024</span><span class="c c-pb">RBS</span><span class="c c-dir">Market Maker</span></div>
</div>
```

### CSV file-download list (hidden duplicate)

**Figma:** CSV 2958:3082 (HIDDEN duplicate, kept as a pattern; 3107:2972 is the older table-based hidden layout): Blotter 1368x906 at (8,59) #171719 r8; Search 205x32 + circle 32x32; header Medium 14 #707079 (Download x16, File x300, PB x644, Upload Date x876, File Size x1113); rows pitch 28; row 1 highlighted #39393C; csv icon 14x14 at x42 (first #A4A4FF, others #707079); filenames Medium 12, dates/size Regular 12.

Status: **Figma-defined**.

```html
<!-- File list -->
<div class="file-list">
  <div class="file-list__toolbar">
    <div class="search" style="--input-w:205px"><i class="icon icon-search"></i><input class="input__control" placeholder="Search"></div>
    <button type="button" class="btn-icon-chip btn-icon-chip--round" aria-label="Filters"><i class="asset asset-action-filter-circle"></i></button>
  </div>
  <div class="blotter__head"><span class="fc fc-dl">Download</span><span class="fc fc-file">File</span><span class="fc fc-pb">PB</span><span class="fc fc-date">Upload Date</span><span class="fc fc-size">File Size</span></div>
  <div class="blotter__row is-highlighted"><span class="fc fc-dl"><i class="icon icon-csv-14"></i></span><span class="fc fc-file">makor_fx_20240823_1524.csv</span><span class="fc fc-pb">RBS Recon</span><span class="fc fc-date">Aug 23, 2024 15:24</span><span class="fc fc-size">2.31 KB</span></div>
  <div class="blotter__row"><span class="fc fc-dl"><i class="icon icon-csv-14"></i></span><span class="fc fc-file">makor_fx_20240822_1511.csv</span><span class="fc fc-pb">RBS Recon</span><span class="fc fc-date">Aug 22, 2024 15:11</span><span class="fc fc-size">1.87 KB</span></div>
  <div class="blotter__row"><span class="fc fc-dl"><i class="icon icon-csv-14"></i></span><span class="fc fc-file">makor_fx_20240821_1530.csv</span><span class="fc fc-pb">RBS Recon</span><span class="fc fc-date">Aug 21, 2024 15:30</span><span class="fc fc-size">2.02 KB</span></div>
</div>
```

### Reports / Generate CSV

**Figma:** Reports 6878:14782 (body y56, no strip): "Generate Report" Medium 16 at (24,24); form column x24 (225): Report Type y59, Date Start y127, Date End y195, Counterparty y263 (pitch 68); "Generate CSV" With-dropdown 154x32 #A4A4FF at (24,331) with download glyph 12x12; Trade Types column x318: label, quick buttons "All Cash"/"All Options" (Outlined purple 99x24 at x318/430), list 258x191 (rows pitch 32, checkbox x+15, label +24, scrollbar 4x169, thumb 114). The vertical order label / quick buttons / list is a visual estimate (node y's conflict).

Status: **Figma-defined**.

```html
<!-- Reports 1440x1024 -->
<div class="app">
  <div class="app__sidebar"></div>
  <div class="app__logo"><i class="icon icon-logo-fxer-stacked-black-32x40"></i></div>
  <nav class="app__nav" aria-label="Main">
    <a class="nav-item" href="#" aria-label="Dashboard"><i class="icon icon-menu-tab-1"></i></a>
    <a class="nav-item" href="#" aria-label="Trade Blotter"><i class="icon icon-subtract"></i></a>
    <a class="nav-item" href="#" aria-label="Trade Reports"><i class="icon icon-csv"></i></a>
    <a class="nav-item" href="#" aria-label="Deleted Trades"><i class="icon icon-deleted-trades"></i></a>
    <a class="nav-item" href="#" aria-label="Entities"><i class="icon icon-entities"></i></a>
    <a class="nav-item nav-item--tall is-active" href="#" aria-label="Reports" aria-current="page"><i class="icon icon-report-file"></i></a>
  </nav>
  <div class="app__sidebar-bottom">
    <a class="nav-item" href="#" aria-label="Settings"><i class="icon icon-settings"></i></a>
  </div>
  <div class="app__content">
    <header class="app__topbar">
      <h1 class="app__title">Reports</h1>
      <div class="app__topbar-right">
        <button type="button" class="app__user" aria-label="User menu"><i class="icon icon-user"></i></button>
      </div>
    </header>
    <div class="app__body">
      <div class="app__main">
        <h2 class="report__title">Generate Report</h2>
        <div class="report__form">
          <div class="field">
            <span class="field__label">Report Type</span>
            <button type="button" class="select"><span class="select__value placeholder">Choose Type</span><i class="icon icon-caret-down-filled-11x6"></i></button>
          </div>
          <div class="field">
            <span class="field__label">Date Start</span>
            <button type="button" class="input-date"><span class="placeholder">dd/mm/yyyy</span><i class="icon icon-calendar-16"></i></button>
          </div>
          <div class="field">
            <span class="field__label">Date End</span>
            <button type="button" class="input-date"><span class="placeholder">dd/mm/yyyy</span><i class="icon icon-calendar-16"></i></button>
          </div>
          <div class="field">
            <span class="field__label">Counterparty</span>
            <button type="button" class="select"><span class="select__value placeholder">Choose Counterparty</span><i class="icon icon-caret-down-filled-11x6"></i></button>
          </div>
          <button type="button" class="btn btn-with-dropdown btn-with-dropdown--purple">Generate CSV<i class="icon icon-download-tray"></i></button>
        </div>
        <div class="report__types">
          <span class="report__types-label">Trade Types</span>
          <div class="report__quick">
            <button type="button" class="btn btn-sm btn-outline-purple">All Cash</button>
            <button type="button" class="btn btn-sm btn-outline-purple">All Options</button>
          </div>
          <div class="check-list">
            <label class="check-list__row"><input type="checkbox" class="checkbox" checked><span>Spot</span></label>
            <label class="check-list__row"><input type="checkbox" class="checkbox" checked><span>Swap</span></label>
            <label class="check-list__row"><input type="checkbox" class="checkbox"><span>Forward</span></label>
            <label class="check-list__row"><input type="checkbox" class="checkbox"><span>NDF</span></label>
            <label class="check-list__row"><input type="checkbox" class="checkbox"><span>Vanilla Option</span></label>
            <div class="scrollbar check-list__scroll">
              <div class="scrollbar__thumb" style="height:114px"></div>
            </div>
          </div>
        </div>
      </div>
      <footer class="app__footer">
        <div class="app__footer-brand"><i class="icon icon-makor-m"></i><span>FX Engine Room | Operated by Makor Group</span></div>
        <div class="app__footer-right"><span class="live-indicator live-indicator--loop"></span></div>
      </footer>
    </div>
  </div>
</div>
```

### New-trade insertion animation (B2B pair)

**Figma:** Section "Animation New trade" 2391:2768, component set "Component 1" 2380:2415 (variants 1..8, 1368x906): every variant AFTER_TIMEOUT -> CHANGE_TO next, SMART_ANIMATE, EASE_IN_AND_OUT; hold/dur (s): 1: 0.6/0.2 | 2: 0.15/0.3 | 3: 0.3/0.2 | 4: 0.1/0.1 | 5: 0.25/0.2 | 6: 0.1/0.1 | 7: 1.0/0.1 | 8: 1.0/0.3 => 5.0 s loop. Existing rows shift DOWN 56px, the two new rows appear, highlight (0,82 1368x55 #30F0D6) alpha 0 -> 0.1 flashing 3x with the "New" labels, checkboxes appear, then removal + shift back. The animated tint is 10% (the static table tint is 15%).

Status: **Figma-defined**.

Replay: re-insert a clone of the element (`el.replaceWith(el.cloneNode(true))`) to restart all CSS animations. `prefers-reduced-motion` shows the end state.

```html
<!-- Loop 5.0 s (use Replay) -->
<div class="blotter blotter-anim" style="width:1368px;height:300px">
  <div style="height:48px;padding:8px">
    <div class="search" style="--input-w:205px"><i class="icon icon-search"></i><input class="input__control" placeholder="Search"></div>
  </div>
  <div class="blotter__head"><span class="c c-cb"><span class="deselect-all"><input type="checkbox" class="checkbox is-indeterminate"><span>(5)</span></span></span><span class="c c-id">ID</span><span class="c c-type">Type</span><span class="c c-client">Client</span><span class="c c-mm">Market Maker</span><span class="c c-side">Buy/Sell</span><span class="c c-qty">Quantity</span><span class="c c-sym">Symbol</span><span class="c c-cp">Client Price</span><span class="c c-mp">Market Maker Price</span><span class="c c-pnl">P&amp;L</span><span class="c c-td">Trade Date</span><span class="c c-vd">Value Date</span><span class="c c-pb">Prime Broker</span><span class="c c-dir">Direction</span></div>
  <div class="blotter-anim__rows">
    <div class="blotter__row"><span class="c c-cb"><input type="checkbox" class="checkbox"></span><span class="c c-id c-link">1234566</span><span class="c c-type">B2B Spot</span><span class="c c-client">AlpFin</span><span class="c c-mm">HSBC</span><span class="c c-side">BUY</span><span class="c c-qty">200</span><span class="c c-sym"><span class="symbol"><i class="flag flag-no"></i>NOK<span class="symbol__slash">/</span><i class="flag flag-ph"></i>PHP</span></span><span class="c c-cp">17.1213</span><span class="c c-mp">18.0878</span><span class="c c-pnl">5.0000</span><span class="c c-td">20/05/2024 13:32:35</span><span class="c c-vd">22/05/2024</span><span class="c c-pb">RBS</span><span class="c c-dir">Client</span></div>
    <div class="blotter__row"><span class="c c-cb"><input type="checkbox" class="checkbox"></span><span class="c c-id">1234565</span><span class="c c-type">Client Spot</span><span class="c c-client">AlpFin</span><span class="c c-mm">HSBC</span><span class="c c-side">SELL</span><span class="c c-qty">-200</span><span class="c c-sym"><span class="symbol"><i class="flag flag-au"></i>AUD<span class="symbol__slash">/</span><i class="flag flag-jp"></i>JPY</span></span><span class="c c-cp">17.1213</span><span class="c c-mp">18.0878</span><span class="c c-pnl">5.0000</span><span class="c c-td">20/05/2024 13:32:35</span><span class="c c-vd">22/05/2024</span><span class="c c-pb">RBS</span><span class="c c-dir">Client</span></div>
    <div class="blotter__row"><span class="c c-cb"><input type="checkbox" class="checkbox"></span><span class="c c-id">1234564</span><span class="c c-type">Market Spot</span><span class="c c-client">Goldman S...</span><span class="c c-mm">HSBC</span><span class="c c-side">BUY</span><span class="c c-qty">12000</span><span class="c c-sym"><span class="symbol"><i class="flag flag-au"></i>AUD<span class="symbol__slash">/</span><i class="flag flag-jp"></i>JPY</span></span><span class="c c-cp">17.1213</span><span class="c c-mp">18.0878</span><span class="c c-pnl">5.0000</span><span class="c c-td">20/05/2024 13:32:35</span><span class="c c-vd">22/05/2024</span><span class="c c-pb">RBS</span><span class="c c-dir">Client</span></div>
  </div>
  <div class="blotter-anim__new">
    <div class="blotter-anim__highlight"></div>
    <div class="blotter-anim__new-rows">
      <div class="blotter__row"><span class="c c-cb blotter-anim__check"><input type="checkbox" class="checkbox" checked></span><span class="c c-status blotter-anim__label">New</span><span class="c c-id">1234567</span><span class="c c-type">Client Spot</span><span class="c c-client">Goldman S...</span><span class="c c-mm">HSBC</span><span class="c c-side">SELL</span><span class="c c-qty">-12000</span><span class="c c-sym"><span class="symbol"><i class="flag flag-au"></i>AUD<span class="symbol__slash">/</span><i class="flag flag-jp"></i>JPY</span></span><span class="c c-cp">17.1213</span><span class="c c-mp">18.0878</span><span class="c c-td">20/05/2024 13:32:35</span><span class="c c-pb">RBS</span><span class="c c-dir">Client</span></div>
      <div class="blotter__row"><span class="c c-cb blotter-anim__check"><input type="checkbox" class="checkbox" checked></span><span class="c c-status blotter-anim__label">New</span><span class="c c-id">1234567</span><span class="c c-type">Market Spot</span><span class="c c-client">HSBC</span><span class="c c-side">BUY</span><span class="c c-qty">12000</span><span class="c c-sym"><span class="symbol"><i class="flag flag-au"></i>AUD<span class="symbol__slash">/</span><i class="flag flag-jp"></i>JPY</span></span><span class="c c-cp">17.1213</span><span class="c c-mp">18.0878</span><span class="c c-td">20/05/2024 13:32:35</span><span class="c c-pb">RBS</span><span class="c c-dir">Market Maker</span></div>
    </div>
  </div>
</div>
```

---

## Behaviour snippets (what Figma implies; the design draws no timings)

Figma's prototype reactions are instant `CHANGE_TO` swaps (Tabs not-active → hover on hover, Checkbox on click, Switch). Everything else below is the standard behaviour implied by the drawn states.

### Switches, checkboxes, radios
Native inputs — no JS. The label colour follows the state through `:has()` (`.switch-field`, `.checkbox-field`). The switch is drawn inverted (ON = knob left): keep `.switch`; `.switch--conventional` is an alternative that is NOT Figma.

### Tabs
```js
document.addEventListener('click', (e) => {
  const tab = e.target.closest('.tab'); if (!tab) return;
  tab.parentElement.querySelectorAll('.tab').forEach((t) => { t.classList.remove('is-active'); t.removeAttribute('aria-selected'); });
  tab.classList.add('is-active'); tab.setAttribute('aria-selected', 'true');
  // then show the matching panel (e.g. permissions: Spot / Forwards / Vanilla Options / Exotic Options)
});
```

### Segmented control (BUY/SELL, PUT/CALL)
```js
seg.addEventListener('click', (e) => {
  const b = e.target.closest('.segmented__btn'); if (!b || seg.classList.contains('segmented--locked')) return;
  seg.querySelectorAll('.segmented__btn').forEach((x) => x.classList.toggle('is-selected', x === b));
});
```

### Dropdown (select → dropdown list)
```js
trigger.addEventListener('click', () => list.hidden = !list.hidden);
list.addEventListener('click', (e) => { const o = e.target.closest('.dropdown-list__item'); if (!o) return;
  list.querySelectorAll('.is-selected').forEach((x) => x.classList.remove('is-selected')); o.classList.add('is-selected');
  trigger.querySelector('.select__value').textContent = o.textContent; list.hidden = true; });
document.addEventListener('click', (e) => { if (!e.target.closest('.select, .dropdown-list')) list.hidden = true; });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') list.hidden = true; });
```
Position the list directly under the trigger (same width); Figma draws no placement.

### Modals
Render `.modal-overlay` (scrim #000 @ 0.5 + 10px backdrop blur, covers the content frame but NOT the sidebar) as a child of `.app__content`, with the `.modal` centred inside it. Close on Cancel, scrim click or Esc; the primary button stays disabled (`disabled`, #707079 / #BABEC7) until the form is valid.
```js
const open = (m) => { content.appendChild(Object.assign(document.createElement('div'), { className: 'modal-overlay', innerHTML: m })); };
document.addEventListener('keydown', (e) => e.key === 'Escape' && document.querySelector('.modal-overlay')?.remove());
document.addEventListener('click', (e) => { if (e.target.classList.contains('modal-overlay')) e.target.remove(); });
```
Two-stage deals (Vanilla / Swap): step 1 CTA "Market Side >" (`.btn-market-side`, drawn disabled-grey; `.is-ready` = EXTENDED teal) → step 2 re-renders the client fields locked (`.is-locked`) and the segmented `--locked`.

### Filter popovers / panel
Toggle `.filter-panel` from the header filter icon; the first row is the select-all (`.deselect-all`: indeterminate box + "(n)" when some rows are selected, outlined empty box when none).
```js
all.addEventListener('change', () => rows.forEach((r) => r.checked = all.checked));
rows.forEach((r) => r.addEventListener('change', () => { const n = rows.filter((x) => x.checked).length; all.indeterminate = n > 0 && n < rows.length; }));
```

### Blotter row context menu
```js
blotter.addEventListener('contextmenu', (e) => { const row = e.target.closest('.blotter__row'); if (!row) return; e.preventDefault();
  menu.style.left = e.clientX + 'px'; menu.style.top = e.clientY + 'px'; menu.hidden = false; });
document.addEventListener('click', () => menu.hidden = true);
```
Items (Figma): Download Trade Report, Copy Lucera Link ID, Copy Trade IDs, Status. Row hover = the drawn highlighted-row fill #39393C (EXTENDED). Selecting a row is the checkbox only (no row highlight).

### Widgets (drag / close / resize)
`.widget__grip` = drag handle (`cursor: grab`, add `.is-dragging` while dragging — EXTENDED lift shadow), `.widget__close` removes the card (the Widgets menu re-adds it: Trade Blotter / Activity Blotter / Rates checkboxes), `.widget__resize` = bottom-right resize grip. Figma draws none of the states or animations.

### Live pulse
`.live-indicator` is a static green dot; add `.live-indicator--loop` for the prototype loop (1.071 s) or `.is-pulse` for the EXTENDED ring pulse. Switch to `.live-indicator--indicative` (orange #FF9747) when rates are indicative ("Using indicative rates"). All animations stop under `prefers-reduced-motion`.

### New-trade insertion animation
```js
replay.addEventListener('click', () => { const el = document.querySelector('.blotter-anim'); el.replaceWith(el.cloneNode(true)); });
```
Timeline (Figma prototype, 5.0 s loop, ease-in-out): rows shift down 56px → two new rows appear → teal highlight flashes 3× (0.1 alpha) with the "New" labels → checkboxes appear → rows shift back. The static table tint stays 15%.

### Group cards (selection) and copy of the showcase
```js
card.addEventListener('click', (e) => { const r = e.target.closest('.group-card__row'); if (!r) return;
  card.querySelectorAll('.group-card__row').forEach((x) => x.classList.toggle('is-selected', x === r)); });
```

---

## Extended table (not in Figma)

Derived only from existing tokens / drawn recipes; each is marked `/* EXTENDED — not in Figma: … */` in `components.css` and carries an "Extended" badge in the showcase.

| name | what | derivation |
|---|---|---|
| Focus ring (buttons, tabs, icon buttons, checkbox, radio, switch, menu item, nav icon, avatar, breadcrumb link, group-card row, segmented, widget tools, pagination, blotter row) | 1px solid #A4A4FF, offset 2px (tabs, menu items, rows: inset) | brand border colour `--color-border-focus` |
| Field focus (input, select, search, date, time, password, chips, textarea) | inset 1px #A4A4FF stroke; error stroke wins | outlined-purple stroke at the same radius |
| Button pressed | hover layers + black@0.2 shade | csv hover overlay value |
| Disabled field | drawn "locked" look (no fill, 1px #707079) + secondary text | Vanilla MM locked fields |
| Hover: orange, filled red, amber "+", chip icon buttons | white@0.3 / @0.2 overlays | existing hover recipes |
| Hover: user menu, checkbox, radio, chip close, menu-item focus | white@0.2; Purple 2 tint (radio); primary text (chip close) | existing hover recipes |
| Outlined teal #30F0D6 hover | fill #264342 | `Green dark` variable (red/blue/yellow dark pattern) |
| Disabled checkbox / radio / switch | #707079 stroke | disabled stroke token |
| Native `select.select`, `<textarea>`, `input.input` mappings | caret asset background; same box | drawn field specs |
| Live-indicator pulse animation (`.is-pulse`) | keyframes 1.6s, ring 8 → 30, alpha 0.2 → 0.05 | Animation variant frames 1–4 (no timing in Figma) |
| Body default font | `body { font: var(--type-input) }` (Regular 14) | input text tuple |
| `.checkbox-field` checked colour, `.switch-field` colour toggling via `:has()` | label colour follows state | Figma draws both label colours |
| Nav icon / avatar hover | primary text colour | text token |
| Breadcrumb link hover, auth link hover | underline thickness 2px | no new colour |
| Table row / group-card row / Activity / Rates / blotter row hover | fill #39393C | the drawn highlighted-row fill (Statics 1382x41, file list) |
| Segmented control hover | unselected white@0.2, selected white@0.3 | status / filled-button recipes |
| Widget grip / close / resize hover | primary text colour | text token |
| Widget drag lift (`.widget.is-dragging`) | popover shadow | `--shadow-tooltip-strong` |
| Filters close hover, pagination hover | primary text colour | text token |
| Password rule unmet (`.is-unmet`) | no tick, grey bullet | only the satisfied state is drawn |
| `.btn-market-side.is-ready` | teal enabled state | library "With dropdown" teal (Figma draws it grey only) |
| Blotter header sort/filter placement (`.th-sort`) | sort-arrows / filter-funnel glyphs in headers | assets exist in Figma (6234:15097/15099), placement not drawn |
| Blotter empty state | centred Medium 16 #BABEC7 | drawn empty-state text style ("Select a trading account") |
| Skeleton loading | #39393C pulse | row-highlight fill; no loading state in Figma |
| Modal / popover open-close behaviour, dropdown open state, tab/segment switching | JS snippets above | implied by the drawn states |

---

## Known Figma inconsistencies & decisions

| topic | what Figma shows | decision |
|---|---|---|
| Primary action colour | Library New/Add is teal #30F0D6; screens override the fill to purple #A4A4FF ("Save Changes" 139x32, "Log In" 216x32) with a black label. Modals use teal (Create Deal / Create Trade / Add Permissions / Allocate). | `.btn` = purple (dominant); `.btn-teal` = library default. |
| Outlined teal | Screens: stroke+text #30F0D6 (Add Currency, Add Permission). Library set 4398:15498 and toolbar "Give-Up" 3107:7139: raw #00FEA9, hover #1B5244. | `.btn-outline-teal` = #30F0D6 (+ hover #264342 Extended); `--library` / `--giveup` = #00FEA9. |
| Input fill | Library #39393C everywhere; screens use one step lighter than the surface: #242428 on #000/#171719, #39393C on #242428 modals, #242428 on #39393C inner panels. Filled/locked fields drawn two ways (keep fill vs. fill removed + 1px #707079). | Surface-aware `--input-fill` via `.surface-*`; `.is-locked` for the bordered look. |
| "Disabled" mis-named variants | Cancel set has two variants named "Disabled": #1 is really hover (#E6E6E6 + white@0.3), #2 the real disabled (#707079 / #BABEC7). | `.btn-cancel.is-hover` / `.is-disabled`. |
| With dropdown hover geometry | Hover variant 4398:15485 drawn r4 / gap 10 vs default r3 / gap 8. | Kept r3 / gap 8; `.is-hover--alt-geometry` = alt. |
| csv button | Only text in the system with font Inter (Regular 12 #2BDF68); hover frame is 30 high vs 24. | Reproduced (`--font-csv`); height kept 24 (`--alt-hover-height: 30px`). |
| Switch | Knob is inverted: ON = knob LEFT (x2), OFF = knob RIGHT (x18; x17 in "Switch with text"). Variant named "falce" (typo) / "Variant2". "Switch with text" frame is 80 fixed; "Give Up" overflows it. | Reproduced as drawn; `.switch--conventional` = alt (NOT Figma). |
| status button disabled | Label stays #A4A4FF, chevron grey #BABEC7, stroke #707079, no fill. | Reproduced. |
| Trading Account 1280 vs 1440 vs 1920 | 1280 (canonical): breadcrumb links #A4A4FF at x16, left panel 359 / divider x399 / detail x415, card gap 16, dividers full width. 1440 frames: links #60A8FF at x24, panel 424 / divider x488 / detail x512, card gap 24, dividers from card x+24. 1920 (4031:18455) and the CSV frames (3107:2972, 2958:3082) are HIDDEN in the file. | 1280 built (`.app--1280 .app--trading-account`, `.breadcrumb--purple`); 1440 = `.split--alt-1440`, `.group-card--inset-divider`; hidden frames not built (CSV kept as `.file-list`). Oldest master-list Trading Account 3657:4471 not built. |
| Add Permissions | Two near-identical frames: 5587:14498 (420x406, Product dropdown) and 5580:14451 (510x406, 4 product checkboxes). Figma gives no flag. | Owner decision: 5587 primary (`.modal--add-permissions`), 5580 alternate (`.modal--add-permissions-alt`). |
| Dashboard | 4243:15535 (older: Trades 1070x910 + Prices 290x910, 2 header icon buttons) vs 6038:13964 (newer: Activity + Trades 587 + Prices 911, 1 icon button). Logo cell 74x48 vs shell 72x56. | Newer built; `.app__logo--widgets` for the 74x48 cell; Prices 911 at y55 → grid gives 910 at y56. |
| Top bar | Avatar gap to the dropdown 16 (dashboard) vs 11 (Blotters); title Medium 20 at x24 (shell) vs Medium 16 at x20 (dashboard). | 16 canonical; `.app__topbar-right--alt-gap-11`; `.app--widgets` for Medium 16. |
| Activity right half | Trades header measured 17px off the mirrored left half (x820 vs 803); three Activity versions exist (3631:4652, 6059:14318, 6038:13704). | Left-half geometry reused for both halves; only 6038:13704 built. |
| Rates header | Header labels Medium 12 (dashboard card, x58/x201, line y56) vs Medium 14 (standalone, x54/x197, line y34); x offsets differ by 1. | `.rates` default = dashboard; `.rates--standalone`. |
| New-row tint | Static table tint #30F0D6@0.15; animation highlight #30F0D6@0.1. | Both kept (`.blotter__row--new` 15%, `.blotter-anim__highlight` 10%). |
| Modal footer gap | Footer = last row + 32 everywhere except Add Permissions 5587 (63). Header divider y61, first label cap y85. | `--modal-footer-gap` per modal. |
| Tooltip shadow | Two recipes: effect style (-1,2,4,0 @0.4) and (-2,2,4,1 @0.5) (blotter, popovers). | Default = style; `.tooltip--strong-shadow` alt; popovers use the strong one. |
| Checkbox | Unchecked fill bound to 3 variables (#39393C ×2, #242428); 17x16 stretched variant; indeterminate box only exists inside a 24x24 holder. | `--checkbox-fill` via `.surface-inner`; `.checkbox--wide` alt; holder cropped to 16x16. |
| Icons | Six chevron drawings, three X drawings, three tick drawings, 4 download glyphs; misleading layer names ("Filter" = X, "Path 1852" = Makor M, "lucide/upload" points down). Two sidebar status glyphs and the Prices-toggle glyph are not exported. | Each exported as its own file (MANIFEST.md); TODOs documented, nothing hand-drawn. |
| Loose text positions | Every text node uses leading-trim CAP_HEIGHT (text boxes are cap-height boxes). | `text-box: trim-both cap alphabetic` (Chrome 133+ / Safari 18.2+) on loose text; fallback ~5px low. |
| Auth cards | Cards are not centred in their frames as drawn; Change/New password title sits 12.5px right of centre; two Reset Password frames are steps 1 and 2. | Centred; title centred; steps = `.auth-card--reset` and `.auth-card--sent`. |
| Pixel drift | Blotter body y104 vs 105, Trading Account body y105, Add Permissions node y overlaps (e.g. Reports "Trade Types" label/buttons/list order). | Dominant value used; Reports order = visual estimate. |

## Not built / out of scope
Entity analytics (donuts, line chart, zoom chips — 5922:13690), the oldest master-list Trading Account permissions (3657:4471), Statics tables / Edit Client 807x605 / Edit User / prime-broker / currency-pair / cut modals (covered by the generic modal / table classes but their column templates are not built), the 1920x1080 Trading Account and the two CSV frames (hidden in Figma; the lighter CSV list is kept as `.file-list`), Swap deal modals (compose the same field/segmented/footer classes), the status filter panel 6765:14776 (content not drawn), older Activity versions.

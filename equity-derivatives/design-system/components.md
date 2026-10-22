# Equity Derivatives Auction - components (copy-paste HTML)

Source of truth: Figma file `vtP9aj7XLJ292TjETXmrum`, Section2 `1033:172` (page "final"); real components on page "drafts". Rebuilt from `figma-spec/*.md`. Generated alongside `showcase.html` - the markup below is exactly what the showcase renders.

**Files** (all in this folder): `tokens.css` (custom properties), `components.css` (every class below), `assets/` (icons + `MANIFEST.md`), `showcase.html` (live reference), `CLAUDE.md` (agent brief).

Each component is tagged **Figma-defined** (drawn in Figma) or **EXTENDED** (Figma is silent; derived only from existing tokens). Every EXTENDED rule is marked `/* EXTENDED - not in Figma: ... */` in components.css and listed in the table at the end.

## 0. Setup

```html
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components.css">
```

Rules that apply everywhere: **Lato Regular (400) only** - never bold; page background `#18181C`; primary action blue `#7590FF`; controls 32px high, grey dark `#373746`, no border, radius 4; cards / modals radius 8; no shadows except toasts, notification cards, the open Cancel menu and the toggle thumb.

State classes (forced, for demos and JS): `.is-hover .is-focus .is-active .is-disabled .is-error .is-selected .is-checked .is-filled .is-on`. Real pseudo-classes (`:hover :focus-visible :disabled`) work too.

Icons: see section "Icons" below.

## Icons

Monochrome icons are masks that take `currentColor`; each `icon-*` class sets the size and the Figma colour (override with a colour utility such as `c-white`):

```html
<span class="icon icon-search"></span>                         <!-- 16x16 blue (mask of assets/search.currentColor.svg) -->
<span class="icon icon-nav-auctions c-white"></span>           <!-- 24x24, colour overridden -->
<!-- any exported asset without a class: -->
<span class="icon" style="width:24px;height:24px;color:var(--color-grey-light);-webkit-mask-image:url(assets/edit-square-pen.currentColor.svg);mask-image:url(assets/edit-square-pen.currentColor.svg)"></span>
```

Multi-colour assets (checkbox, status-active-check, status-check-circle, minimize-button, download-button) and the logo files are used as images:

```html
<img src="assets/makor-logo-login.svg" width="70" height="56" alt="Makor">      <!-- raw Figma export (blue @0.6 baked in) -->
<span class="img-icon img-status-active-check"></span>                          <!-- 16x16 background-image version -->
```

Never redraw or hand-edit icon paths. Available classes: `icon-makor-logo`, `icon-makor-logo-login`, `icon-nav-auctions`, `icon-nav-statics`, `icon-nav-profile`, `icon-eye`, `icon-edit-square-pen`, `icon-rotate-ccw-key`, `icon-search`, `icon-calendar`, `icon-chevron-down`, `icon-dropdown-chevron`, `icon-time-spinner-arrows`, `icon-arrow-big-down`, `icon-status-x-circle`, `icon-status-plus-circle`, `icon-status-warning`, `icon-status-partial-fill`, `icon-file-up`, `icon-clock-drafts (drafts only)`; images: `img-checkbox-checked img-checkbox-unchecked img-status-active-check img-status-check-circle img-minimize-button img-download-button`; tiles: `icon-btn--minimize icon-btn--download`. The full gallery with file names is in `showcase.html` (Foundations > Icons) and `assets/MANIFEST.md`.

## Controls

### Text input - Figma-defined

**Figma:** drafts component 76:274 (235x32); instances 131:725 (Log In), 115:1912 (New Auction name), 184-wide modal fields (138:499, 282:2309), 400-wide email; password field 131:727 (plain frame, SPACE_BETWEEN)

32px high, radius 4, fill grey dark, no stroke, Lato 14, padding 10/12/10/12, gap 12. Placeholder grey medium, entered value white. Widths are always fixed in Figma (235 / 184 / 236 / 400).

```html
<!-- Placeholder (235) -->
<div class="input">
  <input class="input__field" type="text" placeholder="Text">
</div>

<!-- Filled (235) -->
<div class="input">
  <input class="input__field" type="text" value="mshepley" placeholder="Username">
</div>

<!-- Width 184 -->
<div class="input input--w184">
  <input class="input__field" type="text" placeholder="Username">
</div>

<!-- Width 400 -->
<div class="input input--w400">
  <input class="input__field" type="text" placeholder="exampple@email.com">
</div>

<!-- Password 236 (131:727) -->
<div class="input input--between input--w236">
  <span class="input__dots">
    <i class="input__dot"></i>
    <i class="input__dot"></i>
    <i class="input__dot"></i>
    <i class="input__dot"></i>
    <i class="input__dot"></i>
    <i class="input__dot"></i>
    <i class="input__dot"></i>
    <i class="input__dot"></i>
    <i class="input__dot"></i>
    <i class="input__dot"></i>
  </span>
  <span class="icon icon-eye"></span>
</div>
```

*Forced-state demos in the showcase (EXTENDED, no separate markup): Hover; Focus; Error; Disabled.*

- Use a real `<input class="input__field">` inside `.input`; `.input` supplies the box. Widths: default 235, `.input--w184`, `.input--w236`, `.input--w400`, `.input--full` (EXTENDED).
- States: `:hover`, `:focus-within`, forced `.is-hover .is-focus .is-error .is-disabled` (all EXTENDED - Figma draws no input states).

### Search - Figma-defined

**Figma:** drafts component 134:218 (235x32); instances I170:786, Client picker 184 wide (External Trader modal), "Client Name" 235 (New/Edit Client 170:810, 282:2620); muted icon I282:2527;134:215

Same box as the text input but gap 8 with a 16x16 search icon (stroke blue 1.5). The Client picker in the External Trader modal is this component (no option list is drawn).

```html
<!-- Placeholder (235) -->
<div class="search">
  <span class="icon icon-search"></span>
  <input class="search__field" type="text" placeholder="Search">
</div>

<!-- Filled -->
<div class="search">
  <span class="icon icon-search"></span>
  <input class="search__field" type="text" value="DEFGHI" placeholder="Search">
</div>

<!-- Width 184 "Client" -->
<div class="search search--w184">
  <span class="icon icon-search"></span>
  <input class="search__field" type="text" placeholder="Client">
</div>

<!-- Muted icon (New Client) -->
<div class="search search--icon-muted">
  <span class="icon icon-search"></span>
  <input class="search__field" type="text" placeholder="Client Name">
</div>
```

*Forced-state demos in the showcase (EXTENDED, no separate markup): Hover; Focus; Error; Disabled.*

- The search icon is a mask icon (`icon-search`, blue). `.search--icon-muted` turns it grey medium (New Client modal, drawn that way in Figma).

### Date - Figma-defined

**Figma:** drafts component 1001:744 (235x32); instances 1008:820 / 1008:823 at 155 (Audit Log From / To)

Search-style box with a 16x16 calendar icon (stroke blue 1.3) and "dd/mm/yyyy" placeholder. No date-picker popover is drawn.

```html
<!-- Placeholder (235) -->
<div class="date">
  <span class="icon icon-calendar"></span>
  <input class="date__field" type="text" placeholder="dd/mm/yyyy">
</div>

<!-- Width 155 (Audit Log) -->
<div class="date date--w155">
  <span class="icon icon-calendar"></span>
  <input class="date__field" type="text" placeholder="dd/mm/yyyy">
</div>

<!-- Filled -->
<div class="date">
  <span class="icon icon-calendar"></span>
  <input class="date__field" type="text" value="02/07/2026" placeholder="dd/mm/yyyy">
</div>
```

*Forced-state demos in the showcase (EXTENDED, no separate markup): Hover; Focus; Error; Disabled.*

- Free-text `<input>` only; Figma draws no calendar popover or mask. Validate `dd/mm/yyyy` yourself and set `.is-error` (EXTENDED).

### Dropdown + open menu - Figma-defined

**Figma:** drafts component 115:702 (hug x 32, gap 40); instance 189:1342 "Myself" (117x32); opened Cancel menu "Frame 13" 189:819 (112x115, shadow x-2 y4 blur 6)

The dropdown component has no option list. The only drawn open menu is the Cancel "All Bid / All Ask / All" panel: fill grey dark, radius 4, 16px padding, 33px item pitch, no separators, width = trigger width (112). Item hover/selected is EXTENDED.

```html
<!-- Placeholder "Name" -->
<button class="dropdown" type="button" aria-haspopup="menu" aria-expanded="false">
  <span class="dropdown__text">Name</span>
  <span class="icon icon-dropdown-chevron"></span>
</button>

<!-- Filled "Myself" -->
<button class="dropdown is-filled" type="button" aria-haspopup="menu" aria-expanded="false">
  <span class="dropdown__text">Myself</span>
  <span class="icon icon-dropdown-chevron"></span>
</button>

<!-- Open menu under Cancel (189:819) -->
<div style="position:relative;display:inline-block">
  <button class="btn-arrow btn-arrow--danger" type="button" aria-haspopup="menu" aria-expanded="true">
    Cancel
    <span class="icon icon-chevron-down"></span>
  </button>
  <div class="menu" role="menu" style="position:absolute;right:0;top:calc(100% + 1px)">
    <div class="menu__item" role="menuitem">All Bid</div>
    <div class="menu__item" role="menuitem">All Ask</div>
    <div class="menu__item" role="menuitem">All</div>
  </div>
</div>
```

*Forced-state demos in the showcase (EXTENDED, no separate markup): Hover; Focus; Disabled; Menu item hover.*

- Menu positioning is not a class (Figma: menu x = button x, y = button bottom + 1). Wrap the trigger in a `position:relative` element and absolutely position `.menu`.

Behaviour:

```js
// dropdown menu open / close (behaviour not drawn in Figma - EXTENDED)
// markup: <div style="position:relative"> <button aria-haspopup="menu" aria-expanded="false">..</button> <div class="menu" hidden>..</div> </div>
function setMenu(m, open) {
  m.hidden = !open; m.toggleAttribute('data-open', open);
  m.previousElementSibling?.setAttribute('aria-expanded', String(open));
}
document.addEventListener('click', e => {
  const trigger = e.target.closest('[aria-haspopup="menu"]');
  const menu = trigger?.nextElementSibling?.classList.contains('menu') ? trigger.nextElementSibling : null;
  document.querySelectorAll('.menu[data-open]').forEach(m => { if (m !== menu) setMenu(m, false); });   // outside click closes
  if (menu) setMenu(menu, menu.hidden);                                                                   // toggle
  const item = e.target.closest('.menu[data-open] .menu__item');
  if (item) setMenu(item.closest('.menu'), false);   // read item.textContent: "All Bid" / "All Ask" / "All"
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') document.querySelectorAll('.menu[data-open]').forEach(m => setMenu(m, false)); });
```

### Time (stepper) - Figma-defined

**Figma:** drafts component 85:94 (106x32 hug, pad T10 R8 B10 L12, gap 12); instances 115:1927 / 115:1928 at 105 ("05:00" white, "min" grey medium); arrows 85:87 / 85:91

Value group (value + "min") then a 10x24 stepper = two 10x12 arrow-big-down icons (top one flipped). The step size and limits are not defined; the transparent hit-target buttons over the arrows are EXTENDED.

```html
<!-- Default "00:00 min" -->
<div class="time">
  <span class="time__text">
    <span class="time__value">00:00</span>
    <span class="time__unit">min</span>
  </span>
  <span class="time__spinner">
    <span class="icon icon-time-spinner-arrows"></span>
    <button class="time__up" type="button" aria-label="Increase"></button>
    <button class="time__down" type="button" aria-label="Decrease"></button>
  </span>
</div>

<!-- Filled "05:00 min" -->
<div class="time is-filled">
  <span class="time__text">
    <span class="time__value">05:00</span>
    <span class="time__unit">min</span>
  </span>
  <span class="time__spinner">
    <span class="icon icon-time-spinner-arrows"></span>
    <button class="time__up" type="button" aria-label="Increase"></button>
    <button class="time__down" type="button" aria-label="Decrease"></button>
  </span>
</div>
```

*Forced-state demos in the showcase (EXTENDED, no separate markup): Hover; Focus; Disabled.*

- Add `.is-filled` once the user has set a value (value turns white; "min" stays grey medium).

Behaviour:

```js
// time stepper: step = 1 minute (EXTENDED assumption - Figma defines no step / limits)
document.addEventListener('click', e => {
  const b = e.target.closest('.time__up, .time__down'); if (!b) return;
  const t = b.closest('.time'), v = t.querySelector('.time__value');
  let [m, s] = v.textContent.split(':').map(Number);
  m = Math.max(0, Math.min(99, m + (b.classList.contains('time__up') ? 1 : -1)));
  v.textContent = String(m).padStart(2, '0') + ':' + String(s || 0).padStart(2, '0');
  t.classList.add('is-filled');
});
```

### Check - Figma-defined

**Figma:** drafts component set 85:128 (uchecked 85:127, checked 85:129; 16x16 r2); instances 282:2664 / 282:2677; Admin label row 282:2349

Unchecked = grey dark square (the tick is invisible), checked = blue fill with a grey dark 2px tick (asset checkbox-checked.svg). The "Admin" label sits 12px to the right: grey light unchecked, white checked.

```html
<!-- Unchecked -->
<input class="check" type="checkbox" aria-label="Unchecked">

<!-- Checked -->
<input class="check" type="checkbox" checked aria-label="Checked">

<!-- With label (unchecked) -->
<label class="check-field">
  <input class="check" type="checkbox">
  Admin
</label>

<!-- With label (checked) -->
<label class="check-field is-checked">
  <input class="check" type="checkbox" checked>
  Admin
</label>
```

*Forced-state demos in the showcase (EXTENDED, no separate markup): Hover; Focus; Disabled.*

- Native `<input type="checkbox" class="check">`; `appearance:none` is set by the class. The label colour change needs a class toggle (`.check-field.is-checked`).

Behaviour:

```js
// keep the label colour in sync with the box
document.addEventListener('change', e => {
  const c = e.target.closest('.check'); if (!c) return;
  c.closest('.check-field')?.classList.toggle('is-checked', c.checked);
});
```

### Button - Figma-defined

**Figma:** drafts set 134:904 (Default 4:156 no fill, Variant3 261:1922 identical/unused, disabled 134:905; 107x32 hug). Role instances: Log In 131:741, Save Changes 282:2727, Add New 170:785 / 138:394, Cancel 282:2536 / 115:1931, Confirm 273:1159, Start Now 115:1929, Cancel Auction 189:1257, Reject 273:1158, New Auction 189:1343, Start In 115:1930, Upload File (hidden) 115:1919

The component has NO fill: every role is a per-instance override (fill + label colour, outline = 1px INSIDE stroke). Label colour is bg (#18181C) on every filled role. Height 32 (40 only for the one-off outliers), radius 4, padding 6/32, gap 10, hug width.

```html
<!-- Primary - Log In -->
<button class="btn btn--primary" type="button">Log In</button>

<!-- Accent - Save Changes -->
<button class="btn btn--accent" type="button">Save Changes</button>

<!-- Neutral - Cancel -->
<button class="btn btn--neutral" type="button">Cancel</button>

<!-- Confirm - Start Now -->
<button class="btn btn--confirm" type="button">Start Now</button>

<!-- Danger - Cancel Auction -->
<button class="btn btn--danger" type="button">Cancel Auction</button>

<!-- Outline danger - Reject -->
<button class="btn btn--outline-danger" type="button">Reject</button>

<!-- Outline accent - New Auction -->
<button class="btn btn--outline-accent" type="button">New Auction</button>

<!-- Outline warning - Start In -->
<button class="btn btn--outline-warning" type="button">Start In</button>

<!-- Ghost - Upload File (hidden in Figma) -->
<button class="btn btn--ghost" type="button">
  <span class="icon icon-file-up"></span>
  Upload File
</button>

<!-- Disabled (134:905) -->
<button class="btn" type="button" disabled>Add New</button>

<!-- Height 40 (170:785) -->
<button class="btn btn--accent btn--h40" type="button">Add New</button>

<!-- Fixed width 235 (131:741) -->
<button class="btn btn--primary btn--w235" type="button">Log In</button>
```

*Forced-state demos in the showcase (EXTENDED, no separate markup): Hover; Pressed; Focus-visible; Hover (outline).*

- `.btn` alone is transparent (as the Figma component). Always add one role class. `disabled` attribute = Figma disabled variant (grey medium fill, grey light label) and overrides any role.
- Variant3 (261:1922) is identical to Default and is not implemented.

### Button with arrow - Figma-defined

**Figma:** drafts set 134:907 (Default 23:162 no fill, disabled 134:908; 99x32 hug, pad T6 R12 B6 L24, gap 8). Session Cancel 273:633 (98x32, red); table-header "Cancel v" 273:615 / 273:1207 (112x40 custom frame, red transparent); frozen 273:1451 / 273:1482 / 273:762

Label + 12x12 chevron (stroke 1 = label colour). The in-table "Cancel v" is NOT the component: square, 112x40, fill red transparent, its chevron sits 1px lower.

```html
<!-- Danger - session Cancel (273:633) -->
<button class="btn-arrow btn-arrow--danger" type="button">
  Cancel
  <span class="icon icon-chevron-down"></span>
</button>

<!-- Disabled (134:908) -->
<button class="btn-arrow" type="button" disabled>
  Cancel
  <span class="icon icon-chevron-down"></span>
</button>

<!-- Soft danger - table "Cancel v" (273:615) -->
<button class="btn-arrow btn-arrow--soft" type="button">
  Cancel
  <span class="icon icon-chevron-down"></span>
</button>

<!-- Soft disabled (273:1451) -->
<button class="btn-arrow btn-arrow--soft is-disabled" type="button" disabled>
  Cancel
  <span class="icon icon-chevron-down"></span>
</button>
```

*Forced-state demos in the showcase (EXTENDED, no separate markup): Hover; Focus-visible.*

- The chevron is the `icon-chevron-down` mask icon (colour = label colour).

### Icon buttons and row actions - Figma-defined

**Figma:** minimize tile 189:1254 (24x24, #383D58 r4, blue 1px glyph); download tile 1008:824 (32x32 + 1px blue border); row actions: square-pen 170:777 (orange, 24x24), rotate-ccw-key 166:342 (blue, 24x24)

The tile assets are complete (fill, border and glyph are in the SVG), so the class only supplies the size. Row actions are bare 24x24 stroke glyphs without fill.

```html
<!-- Minimize tile 24 -->
<button class="icon-btn icon-btn--minimize" type="button" aria-label="Minimize"></button>

<!-- Download tile 32 -->
<button class="icon-btn icon-btn--download" type="button" aria-label="Download"></button>

<!-- Edit (square-pen) -->
<button class="icon-action" type="button" aria-label="Edit">
  <span class="icon icon-edit-square-pen"></span>
</button>

<!-- Reset password (rotate-ccw-key) -->
<button class="icon-action" type="button" aria-label="Reset password">
  <span class="icon icon-rotate-ccw-key"></span>
</button>

<!-- Delete action (existing x-circle) [EXTENDED] -->
<button class="icon-action icon-action--delete" type="button" aria-label="Delete">
  <span class="icon icon-status-x-circle"></span>
</button>
```

*Forced-state demos in the showcase (EXTENDED, no separate markup): Tile hover; Tile focus; Row action hover.*

- No delete/trash icon exists in Figma; `icon-action--delete` reuses the red x-circle (EXTENDED).

### Tabs - Figma-defined

**Figma:** Clients 282:2059 / External Traders 282:2180 strip (282:2078, bg medium); selected 282:2154, unselected 282:2150 / 282:2152; legacy 48px 170:788 / 170:790

Height 40, padding 12/56 (width = text + 112; "Clients" is 160), top corners 6. Selected: fill blue transparent 15 + 1px blue INSIDE bottom stroke + blue text. Unselected: no fill, grey light text. Admin-auth says the selected tab has no radius: kept as ALT.

```html
<!-- Strip (Clients selected) -->
<div class="tabs" role="tablist">
  <button class="tab tab--w160 is-selected" type="button" role="tab" aria-selected="true">Clients</button>
  <button class="tab" type="button" role="tab" aria-selected="false">External Traders</button>
  <button class="tab" type="button" role="tab" aria-selected="false">Internal Users</button>
</div>

<!-- ALT selected square (admin-auth 3.1) [ALT] -->
<div class="tabs">
  <button class="tab tab--w160 tab--alt-selected-square is-selected" type="button">Clients</button>
  <button class="tab" type="button">External Traders</button>
</div>

<!-- ALT legacy 48px / 18px (80px shell) [ALT] -->
<div class="tabs">
  <button class="tab tab--alt-legacy-48" type="button">Clients</button>
  <button class="tab tab--alt-legacy-48 is-selected" type="button">Users</button>
</div>
```

*Forced-state demos in the showcase (EXTENDED, no separate markup): Hover (unselected); Focus.*

- Use `aria-selected="true"` or `.is-selected` for the active tab. Tab panel switching is application logic.

Behaviour:

```js
document.addEventListener('click', e => {
  const t = e.target.closest('.tab'); if (!t) return;
  t.parentElement.querySelectorAll('.tab').forEach(x => { x.classList.toggle('is-selected', x === t); x.setAttribute('aria-selected', x === t); });
});
```

### Segmented control (Cash Close | EFP) - Figma-defined

**Figma:** New Auction modal Group 3 115:1913 (336x32): selected 115:1916 (180 wide, #374A58 raw, text #71E7FF raw), unselected 115:1914 (160 wide, bg medium, radius 0/4/4/0)

Two 32px segments; the selected one overlaps the unselected by 4px. Fill and text of the selected segment are raw (unbound) colours in Figma. The mirrored left-segment radius and the EFP-selected state are EXTENDED.

```html
<!-- Cash Close selected -->
<div class="segmented">
  <button class="segment is-selected" type="button">Cash Close</button>
  <button class="segment" type="button">EFP</button>
</div>
```

*Forced-state demos in the showcase (EXTENDED, no separate markup): Hover (unselected); Focus.*

- Selecting the first (left) segment when it is unselected gets the mirrored radius `4px 0 0 4px` (EXTENDED).

Behaviour:

```js
document.addEventListener('click', e => {
  const s = e.target.closest('.segment'); if (!s) return;
  s.parentElement.querySelectorAll('.segment').forEach(x => x.classList.toggle('is-selected', x === s));
});
```

### Toggle (Active / Inactive) - Figma-defined

**Figma:** Inactive 138:513 (label 138:516), Active 282:2344 / 282:2733 (label 282:2327); track 32x16 r12; thumb 12x12 white + shadow #1D3C31@0.6

Visual only in Figma. Off: track grey light, thumb left, label grey light. On: track green, thumb right, label white. Thumb positions are a visual estimate (the Figma groups are rotated -180).

```html
<!-- Inactive -->
<button class="toggle" type="button" role="switch" aria-checked="false" data-on="Active" data-off="Inactive">
  <span class="toggle__track">
    <span class="toggle__thumb"></span>
  </span>
  <span class="toggle__label">Inactive</span>
</button>

<!-- Active -->
<button class="toggle is-on" type="button" role="switch" aria-checked="true" data-on="Active" data-off="Inactive">
  <span class="toggle__track">
    <span class="toggle__thumb"></span>
  </span>
  <span class="toggle__label">Active</span>
</button>
```

*Forced-state demos in the showcase (EXTENDED, no separate markup): Focus.*

- Real `<button role="switch" aria-checked>`; label text swaps between data-off / data-on.

Behaviour:

```js
document.addEventListener('click', e => {
  const t = e.target.closest('.toggle'); if (!t) return;
  const on = t.classList.toggle('is-on'); t.setAttribute('aria-checked', on);
  const l = t.querySelector('.toggle__label'); if (l) l.textContent = on ? (t.dataset.on || 'Active') : (t.dataset.off || 'Inactive');
});
```

## Feedback

### Time chip (Time Left / Starting in) - Figma-defined

**Figma:** Frame 9: running 273:628 / 273:1289, starting 273:803 / 273:1366, frozen 273:1553, ended 273:1672; 1920 version 1008:736 ("Time Left" no colon, 146x32)

32px high, radius 4, padding 16/24/16/12, gap 16, hug. Frozen as drawn: label red (#FF6565) on the red error transparent fill (#4E3234). Ended: no fill, 1px red INSIDE stroke.

```html
<!-- Time Left (running) -->
<div class="chip-time">
  <span class="chip-time__label">Time Left:</span>
  <span class="chip-time__value">03:32</span>
</div>

<!-- Starting in -->
<div class="chip-time chip-time--starting">
  <span class="chip-time__label">Starting in:</span>
  <span class="chip-time__value">04:59</span>
</div>

<!-- Frozen (last seconds) -->
<div class="chip-time chip-time--frozen">
  <span class="chip-time__label">Time Left:</span>
  <span class="chip-time__value">00:15</span>
</div>

<!-- Ended -->
<div class="chip-time chip-time--ended">
  <span class="chip-time__label">Time Left:</span>
  <span class="chip-time__value">00:00</span>
</div>

<!-- 1920 variant (no colon) -->
<div class="chip-time">
  <span class="chip-time__label">Time Left</span>
  <span class="chip-time__value">04:59</span>
</div>

<!-- Live countdown (frozen at 15 s, ended at 0) [EXTENDED] -->
<div class="chip-time">
  <span class="chip-time__label">Time Left:</span>
  <span class="chip-time__value" data-seconds="20">00:20</span>
</div>
```

- The colour/state mapping (thresholds) is not defined in Figma. The countdown snippet below is EXTENDED: frozen at <= 15 s, ended at 0.

Behaviour:

```js
// countdown (EXTENDED): <span class="chip-time__value" data-seconds="212">03:32</span>
setInterval(() => document.querySelectorAll('.chip-time__value[data-seconds]').forEach(v => {
  let s = Math.max(0, +v.dataset.seconds - 1); v.dataset.seconds = s;
  v.textContent = String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  const chip = v.closest('.chip-time');
  chip.classList.toggle('chip-time--frozen', s > 0 && s <= 15);
  chip.classList.toggle('chip-time--ended', s === 0);
}), 1000);
```

### Equilibrium Price chip - Figma-defined

**Figma:** Frame 3 273:1196 / 273:590 / 273:654 / 273:688 (18 uses, #B694FF@0.2, canonical); older fill #A494FF@0.3 189:1160 / 261:2108 / 261:2004 (6 uses, Trade Auction aggregate book)

197x40, padding 11/24, gap 4, no radius / stroke. Label purple, value white; unchanged in frozen / ended states.

```html
<!-- Default #B694FF @0.2 -->
<div class="chip-eq">
  <span class="chip-eq__label">Equilibrium Price:</span>
  <span class="chip-eq__value">18.50</span>
</div>

<!-- No price "-" -->
<div class="chip-eq">
  <span class="chip-eq__label">Equilibrium Price:</span>
  <span class="chip-eq__value">-</span>
</div>

<!-- ALT #A494FF @0.3 (Trade Auction) [ALT] -->
<div class="chip-eq chip-eq--alt-a494ff">
  <span class="chip-eq__label">Equilibrium Price:</span>
  <span class="chip-eq__value">18.50</span>
</div>
```

- `.chip-eq--alt-a494ff` = documented older fill; do not use for new work.

### Toast / tooltip chips - Figma-defined

**Figma:** Frame 11: success 273:1147 (265x30), error 273:1141 (197x30), partial 273:1283 (137x30); shadow x-2 y4 blur 8 #22222C

30px, radius 4, padding 8/12, gap 8, Lato 12, drop shadow in bg medium. Positioned absolutely over the first table row (y=48) in the instrument table. No pointer nub, close button, or timeout. Text "Bid should be lower that Ask" is Figma copy (sic).

```html
<!-- Success - In the mix -->
<div class="toast toast--success">
  <span class="img-icon img-status-check-circle"></span>
  In the mix for equilibrium price calculation
</div>

<!-- Error - validation -->
<div class="toast toast--error">
  <span class="icon icon-status-warning"></span>
  Bid should be lower that Ask
</div>

<!-- Partial fill -->
<div class="toast toast--partial">
  <span class="icon icon-status-partial-fill"></span>
  Partially in the fill
</div>
```

- `.tooltip--success/--error/--partial` are aliases of the same rules.

### Order cell states - Figma-defined

**Figma:** in the mix 273:1146 / 189:1163 (green), partial 273:1282 (yellow), error 273:1144 (red error), new-level row 273:1404, focused size well 937:158, inactive wells 937:160 / 937:162

Bare 32px rectangles drawn over table cells; strokes are 1px INSIDE, radius 0. Wells: fill bg; the focused one has a blue transparent 60 stroke and radius BL 8.

```html
<!-- In the mix -->
<div class="sc-cell cell--in-mix">200 &nbsp; 18.40</div>

<!-- Partially in the fill -->
<div class="sc-cell cell--partial">300 &nbsp; 18.60</div>

<!-- Error -->
<div class="sc-cell cell--error">300 &nbsp; 18.30</div>

<!-- New level highlight -->
<div class="sc-cell cell--highlight">200 &nbsp; 18.40</div>

<!-- Focused size well -->
<div class="sc-cell cell--focus-well">10|</div>

<!-- Inactive well -->
<div class="sc-cell cell--well">0</div>
```

- These classes carry only fill/stroke. Position them with `.itable__ov--*` / `.itable__well--*` inside an `.itable`.

### Notification cards - Figma-defined

**Figma:** New level notice 189:984 (322x41); Orders placed 273:1155 (328x114, buttons Reject 273:1158 + Confirm 273:1159); shadow x-2 y4 blur 8 #18181C

Radius 6, fill bg lighter. Placed at the right edge (x=1416), y=77. No icon, no close button, no timeout.

```html
<!-- New level notice (189:984) -->
<div class="notification">New level for FTSE 100 IDX FUT Sep25 added!</div>

<!-- Orders placed (273:1155) -->
<div class="notification notification--stack">
  <div class="notification__text">
    <div class="notification__line--muted">Orders placed:</div>
    <div>Your Buy EURO STOXX 50 Sep25 CC: 400 @ 41</div>
  </div>
  <div class="notification__actions">
    <button class="btn btn--outline-danger" type="button">Reject</button>
    <button class="btn btn--confirm" type="button">Confirm</button>
  </div>
</div>
```

- In a screen they go inside `.banner-slot` (absolute, right 24, top 77). Several banners stack with an 8px gap (EXTENDED).

### Row status icons - Figma-defined

**Figma:** remove-order x-circle 273:619 (12x12 red), add-level plus-circle 273:1214 (12x12 blue), Active-column check 170:771 (16x16)

Plain vector glyphs used inside table rows. The x sits after the Bid and Ask cells on live rows only; the + only on the last row of an 823-wide instrument table.

```html
<!-- Remove order -->
<span class="icon icon-status-x-circle"></span>

<!-- Add level -->
<span class="icon icon-status-plus-circle"></span>

<!-- Active (Clients table) -->
<span class="img-icon img-status-active-check"></span>
```

- Outside tables size them with `.icon` plus one of the icon classes; colour follows `currentColor`.

## Overlays and modals

### Scrim, modal, field - Figma-defined

**Figma:** scrim "Frame 17" 170:809 / 282:2619 / 138:498 / 282:2441 / 115:1870 (bg @0.5 + BACKGROUND_BLUR 12); modal surfaces 138:499 (448x409), 115:1871 (916x410), 170:810 (720x584); title rule "Line 7"

Modal: fill bg lighter, radius 8, NO shadow, NO stroke, no close button. Title 18 white centred (y16), 1px grey medium rule at y54, body inset 24. Field = label 12 grey light + 32px control, 8px apart, 78px row pitch. The scrim starts to the right of the 64px sidebar (sidebar stays sharp). Blur kept at the Figma value of 12px.

```html
<!-- Modal 448 with field + footer -->
<div class="modal modal--w448">
  <div class="modal__header">New External Trader</div>
  <div class="modal__body">
    <div class="field">
      <label class="field__label">Username</label>
      <div class="input input--w184">
        <input class="input__field" type="text" placeholder="Username">
      </div>
    </div>
    <div class="modal__footer">
      <button class="btn btn--neutral" type="button">Cancel</button>
      <button class="btn" type="button" disabled>Add New</button>
    </div>
  </div>
</div>

<!-- Scrim over content -->
<div class="sc-frame">
  <div class="sc-frame__bg">
    <p>Page content behind the scrim is dimmed (bg @0.5) and blurred (12px).</p>
    <p>Sidebar stays outside the scrim.</p>
  </div>
  <div class="modal-scrim modal-scrim--centered">
    <div class="modal modal--w448">
      <div class="modal__header">Modal title</div>
      <div class="modal__body">
        <div class="field">
          <label class="field__label">Label</label>
          <div class="input input--w184">
            <input class="input__field" type="text" placeholder="Value">
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

- The scrim is `position:absolute; inset:0` - the parent must be `position:relative` (the Figma frame). `.modal-scrim--beside-sidebar` insets 64px. Variants: `--admin`, `--alt-legacy-80`, `--alt-1373`, `--centered`, `--pair`.

### Scrollbar - Figma-defined (+ EXTENDED parts)

**Figma:** Edit Client Group 104 (282:2538): track 4x218 r12 grey dark, thumb 4x75 r12 grey medium, 8px inset from the panel edge

Drawn once (visual). The `.scroll-y` helper that reuses the same colours/width on a real scrolling container is EXTENDED.

```html
<!-- Drawn scrollbar -->
<div class="scrollbar">
  <div class="scrollbar__thumb"></div>
</div>

<!-- Functional .scroll-y [EXTENDED] -->
<div class="scroll-y sc-scroll">
  <p>Row 1</p>
  <p>Row 2</p>
  <p>Row 3</p>
  <p>Row 4</p>
  <p>Row 5</p>
  <p>Row 6</p>
  <p>Row 7</p>
  <p>Row 8</p>
</div>
```

- `.scroll-y` sets `overflow-y:auto` + thin scrollbar colours; give the container a fixed height.

## Patterns

### App shell (sidebar, header) - Figma-defined

**Figma:** sidebar Frame 1 189:1325 / 261:2356 / 273:432 / 1008:688; title (80,24) 20px blue; header rule Line 6 y=61; "Auctions" (80,82); "View as" 189:1324 / 189:1342; New Auction 189:1343; avatar 189:1333

Frame 1440x1024 (1920x1080 for the newer Client Auctions). Sidebar 64px, fill bg lighter, radius 0 24 0 0, logo (12,20), nav icons x20 at y92 / y148 (active = white, idle = grey light, no pill, no labels), avatar (16, H-64). Content: left 80, right 24, first row y=117. Legacy 80px shell kept as ALT.

```html
<!-- Auctions shell (View as + New Auction) -->
<div class="app">
  <aside class="sidebar">
    <span class="sidebar__logo icon icon-makor-logo"></span>
    <nav class="sidebar__nav">
      <a class="sidebar__item is-active" href="#" aria-label="Auctions">
        <span class="icon icon-nav-auctions"></span>
      </a>
      <a class="sidebar__item" href="#" aria-label="Statics">
        <span class="icon icon-nav-statics"></span>
      </a>
    </nav>
    <span class="sidebar__avatar icon icon-nav-profile"></span>
  </aside>
  <h1 class="app__title">Equity Derivatives Auction</h1>
  <div class="app__rule"></div>
  <h2 class="app__section-title">Auctions</h2>
  <div class="app__view-as">
    <span class="app__view-as-label">View as:</span>
    <button class="dropdown is-filled" type="button" aria-haspopup="menu" aria-expanded="false">
      <span class="dropdown__text">Myself</span>
      <span class="icon icon-dropdown-chevron"></span>
    </button>
  </div>
  <div class="app__actions">
    <button class="btn btn--outline-accent" type="button">New Auction</button>
  </div>
</div>

<!-- Wide shell 1920x1080 -->
<div class="app app--wide">
  <aside class="sidebar">
    <span class="sidebar__logo icon icon-makor-logo"></span>
    <nav class="sidebar__nav">
      <a class="sidebar__item is-active" href="#" aria-label="Auctions">
        <span class="icon icon-nav-auctions"></span>
      </a>
      <a class="sidebar__item" href="#" aria-label="Statics">
        <span class="icon icon-nav-statics"></span>
      </a>
    </nav>
    <span class="sidebar__avatar icon icon-nav-profile"></span>
  </aside>
  <h1 class="app__title">Equity Derivatives Auction</h1>
  <div class="app__rule"></div>
  <h2 class="app__section-title">Auctions</h2>
</div>

<!-- ALT legacy 80px shell (New/Edit Client background) [ALT] -->
<div class="app app--alt-legacy-80">
  <aside class="sidebar">
    <span class="sidebar__logo icon icon-makor-logo"></span>
    <nav class="sidebar__nav">
      <a class="sidebar__item" href="#" aria-label="Auctions">
        <span class="icon icon-nav-auctions"></span>
      </a>
      <a class="sidebar__item is-active" href="#" aria-label="Statics">
        <span class="icon icon-nav-statics"></span>
      </a>
    </nav>
    <span class="sidebar__avatar icon icon-nav-profile"></span>
  </aside>
  <h1 class="app__title">Equity Derivatives Auction</h1>
  <div class="app__rule"></div>
  <h2 class="app__section-title">Statics</h2>
</div>
```

*Forced-state demos in the showcase (EXTENDED, no separate markup): Sidebar item hover / focus.*

- All shell pieces are absolutely positioned inside `.app` (position:relative, overflow:hidden). Put page content in `.app__main` (flow) or position it with your own wrapper.

### Session card - Figma-defined

**Figma:** Frame 14 / 15 189:650, 273:704, 273:1180, 1008:705 / 741 / 777, Trade 189:1105; header 56 + rule y=56; minimize tile (16,16); title group (60,12); chip y=12; Cancel 273:633; cancel menu 189:819

Fill bg lighter, radius 8, header 56 with a 1px rule (grey medium on 1440 screens, grey dark on the 1920 screen), body padding 16 (instrument cards at y=72; y=68 on the EFP card and 1920 cards), gap 8. Widths 795 / 855 / 1336. The Client Auctions 1920 card is canonical; the 1440 look is kept as `--alt-1440`.

```html
<!-- Client Auctions 1440 (--alt-1440) with open Cancel menu -->
<section class="session-card session-card--alt-1440">
  <header class="session-card__header">
    <button class="icon-btn icon-btn--minimize session-card__tile" type="button" aria-label="Minimize"></button>
    <div class="session-card__title">
      <span class="session-card__name">European CC 26/6</span>
      <span class="session-card__type session-card__type--cash">Cash Close</span>
    </div>
    <div class="chip-time session-card__chip">
      <span class="chip-time__label">Time Left:</span>
      <span class="chip-time__value">03:32</span>
    </div>
    <button class="btn-arrow btn-arrow--danger session-card__action" type="button">
      Cancel
      <span class="icon icon-chevron-down"></span>
    </button>
  </header>
  <div class="session-card__body">
    <div class="itable">
      <div class="itable__title">
        <span class="itable__name">FTSE 100 IDX FUT Sep25</span>
        <span class="itable__minsize">min size: 200</span>
        <div class="itable__title-end">
          <div class="chip-eq">
            <span class="chip-eq__label">Equilibrium Price:</span>
            <span class="chip-eq__value">18.50</span>
          </div>
          <button class="btn-arrow btn-arrow--soft" type="button">
            Cancel
            <span class="icon icon-chevron-down"></span>
          </button>
        </div>
      </div>
      <div class="itable__head">
        <span class="itable__c itable__c--size1">Size</span>
        <span class="itable__c itable__c--bid">Bid</span>
        <span class="itable__c itable__c--size2">Size</span>
        <span class="itable__c itable__c--ask">Ask</span>
        <span class="itable__c itable__c--spread">Spread</span>
      </div>
      <div class="itable__row">
        <span class="itable__c itable__c--size1">200</span>
        <span class="itable__c itable__c--bid">18.40</span>
        <span class="itable__c itable__c--size2">300</span>
        <span class="itable__c itable__c--ask">18.60</span>
        <span class="itable__c itable__c--spread">0.20</span>
        <span class="icon icon-status-x-circle itable__icon itable__icon--x1"></span>
        <span class="icon icon-status-x-circle itable__icon itable__icon--x2"></span>
      </div>
      <div class="itable__row">
        <span class="itable__c itable__c--size1">400</span>
        <span class="itable__c itable__c--bid">18.30</span>
        <span class="itable__c itable__c--size2">500</span>
        <span class="itable__c itable__c--ask">18.70</span>
        <span class="itable__c itable__c--spread">0.40</span>
        <span class="icon icon-status-x-circle itable__icon itable__icon--x1"></span>
        <span class="icon icon-status-x-circle itable__icon itable__icon--x2"></span>
      </div>
      <i class="itable__vline itable__vline--273"></i>
      <i class="itable__vline itable__vline--557"></i>
      <div class="itable__ov itable__ov--size-bid cell--in-mix"></div>
      <div class="itable__tip itable__tip--in-mix toast toast--success">
        <span class="img-icon img-status-check-circle"></span>
        In the mix for equilibrium price calculation
      </div>
    </div>
    <div class="itable">
      <div class="itable__title">
        <span class="itable__name">CAC40 IDX FUT Sep25</span>
        <span class="itable__minsize">min size: 200</span>
        <div class="itable__title-end">
          <div class="chip-eq">
            <span class="chip-eq__label">Equilibrium Price:</span>
            <span class="chip-eq__value">-</span>
          </div>
          <button class="btn-arrow btn-arrow--soft" type="button">
            Cancel
            <span class="icon icon-chevron-down"></span>
          </button>
        </div>
      </div>
      <div class="itable__head">
        <span class="itable__c itable__c--size1">Size</span>
        <span class="itable__c itable__c--bid">Bid</span>
        <span class="itable__c itable__c--size2">Size</span>
        <span class="itable__c itable__c--ask">Ask</span>
        <span class="itable__c itable__c--spread">Spread</span>
      </div>
      <div class="itable__row">
        <span class="itable__c itable__c--size1 itable__c--ph">0</span>
        <span class="itable__c itable__c--bid itable__c--ph">0</span>
        <span class="itable__c itable__c--size2 itable__c--ph">0</span>
        <span class="itable__c itable__c--ask itable__c--ph">0</span>
        <span class="itable__c itable__c--spread itable__c--ph">0</span>
      </div>
      <i class="itable__vline itable__vline--273"></i>
      <i class="itable__vline itable__vline--557"></i>
    </div>
  </div>
  <div class="menu session-card__menu" role="menu">
    <div class="menu__item" role="menuitem">All Bid</div>
    <div class="menu__item" role="menuitem">All Ask</div>
    <div class="menu__item" role="menuitem">All</div>
  </div>
</section>

<!-- Client Auctions 1920 (canonical) -->
<section class="session-card session-card--client-1920">
  <header class="session-card__header">
    <button class="icon-btn icon-btn--minimize session-card__tile" type="button" aria-label="Minimize"></button>
    <div class="session-card__title">
      <span class="session-card__name">European EFP 26/6</span>
      <span class="session-card__type session-card__type--cash">Cash Close</span>
    </div>
    <div class="chip-time session-card__chip">
      <span class="chip-time__label">Time Left</span>
      <span class="chip-time__value">04:59</span>
    </div>
  </header>
  <div class="session-card__body">
    <div class="itable">
      <div class="itable__title">
        <span class="itable__name">E-mini S&P 500 Future Sep 2025</span>
        <div class="itable__title-end">
          <div class="chip-eq">
            <span class="chip-eq__label">Equilibrium Price:</span>
            <span class="chip-eq__value">-</span>
          </div>
          <button class="btn-arrow btn-arrow--soft is-disabled" type="button" disabled>
            Cancel
            <span class="icon icon-chevron-down"></span>
          </button>
        </div>
      </div>
      <div class="itable__head">
        <span class="itable__c itable__c--size1">Size</span>
        <span class="itable__c itable__c--bid">Bid</span>
        <span class="itable__c itable__c--size2">Size</span>
        <span class="itable__c itable__c--ask">Ask</span>
        <span class="itable__c itable__c--spread">Spread</span>
      </div>
      <div class="itable__row">
        <span class="itable__c itable__c--size1 itable__c--ph">0</span>
        <span class="itable__c itable__c--bid itable__c--ph">0</span>
        <span class="itable__c itable__c--size2 itable__c--ph">0</span>
        <span class="itable__c itable__c--ask itable__c--ph">0</span>
        <span class="itable__c itable__c--spread itable__c--ph">0</span>
      </div>
      <i class="itable__vline itable__vline--273"></i>
      <i class="itable__vline itable__vline--557"></i>
    </div>
  </div>
</section>

<!-- 855 wide (lever / freeze / summary) with add-level plus -->
<section class="session-card session-card--w855">
  <header class="session-card__header">
    <button class="icon-btn icon-btn--minimize session-card__tile" type="button" aria-label="Minimize"></button>
    <div class="session-card__title">
      <span class="session-card__name">European CC 26/6</span>
      <span class="session-card__type session-card__type--cash">Cash Close</span>
    </div>
    <div class="chip-time session-card__chip">
      <span class="chip-time__label">Time Left:</span>
      <span class="chip-time__value">03:32</span>
    </div>
    <button class="btn-arrow btn-arrow--danger session-card__action" type="button">
      Cancel
      <span class="icon icon-chevron-down"></span>
    </button>
  </header>
  <div class="session-card__body">
    <div class="itable itable--w823">
      <div class="itable__title">
        <span class="itable__name">FTSE 100 IDX FUT Sep25</span>
        <span class="itable__minsize">min size: 200</span>
        <div class="itable__title-end">
          <div class="chip-eq">
            <span class="chip-eq__label">Equilibrium Price:</span>
            <span class="chip-eq__value">18.50</span>
          </div>
          <button class="btn-arrow btn-arrow--soft" type="button">
            Cancel
            <span class="icon icon-chevron-down"></span>
          </button>
        </div>
      </div>
      <div class="itable__head">
        <span class="itable__c itable__c--size1">Size</span>
        <span class="itable__c itable__c--bid">Bid</span>
        <span class="itable__c itable__c--size2">Size</span>
        <span class="itable__c itable__c--ask">Ask</span>
        <span class="itable__c itable__c--spread">Spread</span>
      </div>
      <div class="itable__row">
        <span class="itable__c itable__c--size1">200</span>
        <span class="itable__c itable__c--bid">18.40</span>
        <span class="itable__c itable__c--size2">300</span>
        <span class="itable__c itable__c--ask">18.60</span>
        <span class="itable__c itable__c--spread">0.20</span>
        <span class="icon icon-status-x-circle itable__icon itable__icon--x1"></span>
        <span class="icon icon-status-x-circle itable__icon itable__icon--x2"></span>
      </div>
      <div class="itable__row">
        <span class="itable__c itable__c--size1">400</span>
        <span class="itable__c itable__c--bid">18.30</span>
        <span class="itable__c itable__c--size2">500</span>
        <span class="itable__c itable__c--ask">18.70</span>
        <span class="itable__c itable__c--spread">0.40</span>
        <span class="icon icon-status-x-circle itable__icon itable__icon--x1"></span>
        <span class="icon icon-status-x-circle itable__icon itable__icon--x2"></span>
        <span class="icon icon-status-plus-circle itable__icon itable__icon--add"></span>
      </div>
      <i class="itable__vline itable__vline--273"></i>
      <i class="itable__vline itable__vline--557"></i>
      <i class="itable__vline itable__vline--763"></i>
      <div class="itable__ov itable__ov--row2 cell--highlight"></div>
    </div>
  </div>
</section>

<!-- EFP card, starting (--alt-top-68) -->
<section class="session-card session-card--alt-top-68">
  <header class="session-card__header">
    <button class="icon-btn icon-btn--minimize session-card__tile" type="button" aria-label="Minimize"></button>
    <div class="session-card__title">
      <span class="session-card__name">European EFP 26/6</span>
      <span class="session-card__type session-card__type--efp">EFP</span>
    </div>
    <div class="chip-time session-card__chip chip-time--starting">
      <span class="chip-time__label">Starting in:</span>
      <span class="chip-time__value">04:59</span>
    </div>
    <button class="btn-arrow btn-arrow--danger session-card__action" type="button">
      Cancel
      <span class="icon icon-chevron-down"></span>
    </button>
  </header>
  <div class="session-card__body">
    <div class="itable">
      <div class="itable__well itable__well--size cell--focus-well"></div>
      <div class="itable__well itable__well--bid cell--well"></div>
      <div class="itable__well itable__well--icon cell--well"></div>
      <div class="itable__title">
        <span class="itable__name">FTSE 100 IDX FUT Sep25</span>
        <span class="itable__minsize">min size: 200</span>
        <div class="itable__title-end">
          <div class="chip-eq">
            <span class="chip-eq__label">Equilibrium Price:</span>
            <span class="chip-eq__value">-</span>
          </div>
          <button class="btn-arrow btn-arrow--soft is-disabled" type="button" disabled>
            Cancel
            <span class="icon icon-chevron-down"></span>
          </button>
        </div>
      </div>
      <div class="itable__head">
        <span class="itable__c itable__c--size1">Size</span>
        <span class="itable__c itable__c--bid">Bid</span>
        <span class="itable__c itable__c--size2">Size</span>
        <span class="itable__c itable__c--ask">Ask</span>
        <span class="itable__c itable__c--spread">Spread</span>
      </div>
      <div class="itable__row">
        <span class="itable__c itable__c--size1">10|</span>
        <span class="itable__c itable__c--bid itable__c--ph">0</span>
        <span class="itable__c itable__c--size2 itable__c--ph">0</span>
        <span class="itable__c itable__c--ask itable__c--ph">0</span>
        <span class="itable__c itable__c--spread itable__c--ph">0</span>
      </div>
      <i class="itable__vline itable__vline--273"></i>
      <i class="itable__vline itable__vline--557"></i>
    </div>
  </div>
</section>
```

- Header children are absolute (`__tile`, `__title`, `__chip`, `__action`). `.session-card__chip` centres the chip (1440) or right-aligns it on `.session-card--client-1920`. The open Cancel menu is a child of the card (`.session-card__menu`, right 16, top 260).

### Instrument table - Figma-defined

**Figma:** Frame 8 / 10 / 11 273:572, 273:640, 273:674 (763 / 823 wide); frozen 273:1405; summary 273:1559; pre-start 273:740; overlays 273:1146 / 273:1144 / 273:1282 / 273:1404

fill bg medium, radius 8, title row 40 (name 14 + "min size" 12 grey light, then the Equilibrium chip and the soft Cancel button flush right), header row 33 + data rows 33 (1px grey dark dividers, no zebra), vertical dividers at x=273 / 557 (+763). Numbers are centred on the header centres.

```html
<!-- 763 wide, 2 rows, live -->
<div class="itable">
  <div class="itable__title">
    <span class="itable__name">FTSE 100 IDX FUT Sep25</span>
    <span class="itable__minsize">min size: 200</span>
    <div class="itable__title-end">
      <div class="chip-eq">
        <span class="chip-eq__label">Equilibrium Price:</span>
        <span class="chip-eq__value">18.50</span>
      </div>
      <button class="btn-arrow btn-arrow--soft" type="button">
        Cancel
        <span class="icon icon-chevron-down"></span>
      </button>
    </div>
  </div>
  <div class="itable__head">
    <span class="itable__c itable__c--size1">Size</span>
    <span class="itable__c itable__c--bid">Bid</span>
    <span class="itable__c itable__c--size2">Size</span>
    <span class="itable__c itable__c--ask">Ask</span>
    <span class="itable__c itable__c--spread">Spread</span>
  </div>
  <div class="itable__row">
    <span class="itable__c itable__c--size1">200</span>
    <span class="itable__c itable__c--bid">18.40</span>
    <span class="itable__c itable__c--size2">300</span>
    <span class="itable__c itable__c--ask">18.60</span>
    <span class="itable__c itable__c--spread">0.20</span>
    <span class="icon icon-status-x-circle itable__icon itable__icon--x1"></span>
    <span class="icon icon-status-x-circle itable__icon itable__icon--x2"></span>
  </div>
  <div class="itable__row">
    <span class="itable__c itable__c--size1">400</span>
    <span class="itable__c itable__c--bid">18.30</span>
    <span class="itable__c itable__c--size2">500</span>
    <span class="itable__c itable__c--ask">18.70</span>
    <span class="itable__c itable__c--spread">0.40</span>
    <span class="icon icon-status-x-circle itable__icon itable__icon--x1"></span>
    <span class="icon icon-status-x-circle itable__icon itable__icon--x2"></span>
  </div>
  <i class="itable__vline itable__vline--273"></i>
  <i class="itable__vline itable__vline--557"></i>
</div>

<!-- 823 wide with add-level (+) -->
<div class="itable itable--w823">
  <div class="itable__title">
    <span class="itable__name">FTSE 100 IDX FUT Sep25</span>
    <span class="itable__minsize">min size: 200</span>
    <div class="itable__title-end">
      <div class="chip-eq">
        <span class="chip-eq__label">Equilibrium Price:</span>
        <span class="chip-eq__value">18.50</span>
      </div>
      <button class="btn-arrow btn-arrow--soft" type="button">
        Cancel
        <span class="icon icon-chevron-down"></span>
      </button>
    </div>
  </div>
  <div class="itable__head">
    <span class="itable__c itable__c--size1">Size</span>
    <span class="itable__c itable__c--bid">Bid</span>
    <span class="itable__c itable__c--size2">Size</span>
    <span class="itable__c itable__c--ask">Ask</span>
    <span class="itable__c itable__c--spread">Spread</span>
  </div>
  <div class="itable__row">
    <span class="itable__c itable__c--size1">200</span>
    <span class="itable__c itable__c--bid">18.40</span>
    <span class="itable__c itable__c--size2">300</span>
    <span class="itable__c itable__c--ask">18.60</span>
    <span class="itable__c itable__c--spread">0.20</span>
    <span class="icon icon-status-x-circle itable__icon itable__icon--x1"></span>
    <span class="icon icon-status-x-circle itable__icon itable__icon--x2"></span>
  </div>
  <div class="itable__row">
    <span class="itable__c itable__c--size1">400</span>
    <span class="itable__c itable__c--bid">18.30</span>
    <span class="itable__c itable__c--size2">500</span>
    <span class="itable__c itable__c--ask">18.70</span>
    <span class="itable__c itable__c--spread">0.40</span>
    <span class="icon icon-status-x-circle itable__icon itable__icon--x1"></span>
    <span class="icon icon-status-x-circle itable__icon itable__icon--x2"></span>
    <span class="icon icon-status-plus-circle itable__icon itable__icon--add"></span>
  </div>
  <i class="itable__vline itable__vline--273"></i>
  <i class="itable__vline itable__vline--557"></i>
  <i class="itable__vline itable__vline--763"></i>
</div>

<!-- Validation: in the mix + error -->
<div class="itable">
  <div class="itable__title">
    <span class="itable__name">EURO STOXX 50 Sep25 CC</span>
    <span class="itable__minsize">min size: 200</span>
    <div class="itable__title-end">
      <div class="chip-eq">
        <span class="chip-eq__label">Equilibrium Price:</span>
        <span class="chip-eq__value">42.8</span>
      </div>
      <button class="btn-arrow btn-arrow--soft" type="button">
        Cancel
        <span class="icon icon-chevron-down"></span>
      </button>
    </div>
  </div>
  <div class="itable__head">
    <span class="itable__c itable__c--size1">Size</span>
    <span class="itable__c itable__c--bid">Bid</span>
    <span class="itable__c itable__c--size2">Size</span>
    <span class="itable__c itable__c--ask">Ask</span>
    <span class="itable__c itable__c--spread">Spread</span>
  </div>
  <div class="itable__row">
    <span class="itable__c itable__c--size1">400</span>
    <span class="itable__c itable__c--bid">41.00</span>
    <span class="itable__c itable__c--size2">400</span>
    <span class="itable__c itable__c--ask">40.50</span>
    <span class="itable__c itable__c--spread">-0.50</span>
    <span class="icon icon-status-x-circle itable__icon itable__icon--x1"></span>
    <span class="icon icon-status-x-circle itable__icon itable__icon--x2"></span>
  </div>
  <i class="itable__vline itable__vline--273"></i>
  <i class="itable__vline itable__vline--557"></i>
  <div class="itable__ov itable__ov--size-bid cell--in-mix"></div>
  <div class="itable__ov itable__ov--size-ask cell--error"></div>
  <div class="itable__tip itable__tip--in-mix toast toast--success">
    <span class="img-icon img-status-check-circle"></span>
    In the mix for equilibrium price calculation
  </div>
  <div class="itable__tip itable__tip--error toast toast--error">
    <span class="icon icon-status-warning"></span>
    Bid should be lower that Ask
  </div>
</div>

<!-- Partially in the fill -->
<div class="itable">
  <div class="itable__title">
    <span class="itable__name">EURO STOXX 50 Sep25 CC</span>
    <span class="itable__minsize">min size: 200</span>
    <div class="itable__title-end">
      <div class="chip-eq">
        <span class="chip-eq__label">Equilibrium Price:</span>
        <span class="chip-eq__value">42.8</span>
      </div>
      <button class="btn-arrow btn-arrow--soft" type="button">
        Cancel
        <span class="icon icon-chevron-down"></span>
      </button>
    </div>
  </div>
  <div class="itable__head">
    <span class="itable__c itable__c--size1">Size</span>
    <span class="itable__c itable__c--bid">Bid</span>
    <span class="itable__c itable__c--size2">Size</span>
    <span class="itable__c itable__c--ask">Ask</span>
    <span class="itable__c itable__c--spread">Spread</span>
  </div>
  <div class="itable__row">
    <span class="itable__c itable__c--size1">400</span>
    <span class="itable__c itable__c--bid">41.00</span>
    <span class="itable__c itable__c--size2">400</span>
    <span class="itable__c itable__c--ask">41.50</span>
    <span class="itable__c itable__c--spread">0.50</span>
    <span class="icon icon-status-x-circle itable__icon itable__icon--x1"></span>
    <span class="icon icon-status-x-circle itable__icon itable__icon--x2"></span>
  </div>
  <i class="itable__vline itable__vline--273"></i>
  <i class="itable__vline itable__vline--557"></i>
  <div class="itable__ov itable__ov--size-ask cell--partial"></div>
  <div class="itable__tip itable__tip--partial toast toast--partial">
    <span class="icon icon-status-partial-fill"></span>
    Partially in the fill
  </div>
</div>

<!-- Frozen (grey values, no x, Cancel disabled) -->
<div class="itable itable--w823 itable--frozen">
  <div class="itable__title">
    <span class="itable__name">FTSE 100 IDX FUT Sep25</span>
    <span class="itable__minsize">min size: 200</span>
    <div class="itable__title-end">
      <div class="chip-eq">
        <span class="chip-eq__label">Equilibrium Price:</span>
        <span class="chip-eq__value">18.50</span>
      </div>
      <button class="btn-arrow btn-arrow--soft is-disabled" type="button" disabled>
        Cancel
        <span class="icon icon-chevron-down"></span>
      </button>
    </div>
  </div>
  <div class="itable__head">
    <span class="itable__c itable__c--size1">Size</span>
    <span class="itable__c itable__c--bid">Bid</span>
    <span class="itable__c itable__c--size2">Size</span>
    <span class="itable__c itable__c--ask">Ask</span>
    <span class="itable__c itable__c--spread">Spread</span>
  </div>
  <div class="itable__row">
    <span class="itable__c itable__c--size1">200</span>
    <span class="itable__c itable__c--bid">18.40</span>
    <span class="itable__c itable__c--size2">300</span>
    <span class="itable__c itable__c--ask">18.60</span>
    <span class="itable__c itable__c--spread">0.20</span>
  </div>
  <div class="itable__row">
    <span class="itable__c itable__c--size1">400</span>
    <span class="itable__c itable__c--bid">18.30</span>
    <span class="itable__c itable__c--size2">500</span>
    <span class="itable__c itable__c--ask">18.70</span>
    <span class="itable__c itable__c--spread">0.40</span>
    <span class="icon icon-status-plus-circle itable__icon itable__icon--add"></span>
  </div>
  <i class="itable__vline itable__vline--273"></i>
  <i class="itable__vline itable__vline--557"></i>
  <i class="itable__vline itable__vline--763"></i>
</div>

<!-- Pre-start inputs (focused size well, typing "10|") -->
<div class="itable">
  <div class="itable__well itable__well--size cell--focus-well"></div>
  <div class="itable__well itable__well--bid cell--well"></div>
  <div class="itable__well itable__well--icon cell--well"></div>
  <div class="itable__title">
    <span class="itable__name">FTSE 100 IDX FUT Sep25</span>
    <span class="itable__minsize">min size: 200</span>
    <div class="itable__title-end">
      <div class="chip-eq">
        <span class="chip-eq__label">Equilibrium Price:</span>
        <span class="chip-eq__value">-</span>
      </div>
      <button class="btn-arrow btn-arrow--soft is-disabled" type="button" disabled>
        Cancel
        <span class="icon icon-chevron-down"></span>
      </button>
    </div>
  </div>
  <div class="itable__head">
    <span class="itable__c itable__c--size1">Size</span>
    <span class="itable__c itable__c--bid">Bid</span>
    <span class="itable__c itable__c--size2">Size</span>
    <span class="itable__c itable__c--ask">Ask</span>
    <span class="itable__c itable__c--spread">Spread</span>
  </div>
  <div class="itable__row">
    <span class="itable__c itable__c--size1">10|</span>
    <span class="itable__c itable__c--bid itable__c--ph">0</span>
    <span class="itable__c itable__c--size2 itable__c--ph">0</span>
    <span class="itable__c itable__c--ask itable__c--ph">0</span>
    <span class="itable__c itable__c--spread itable__c--ph">0</span>
  </div>
  <i class="itable__vline itable__vline--273"></i>
  <i class="itable__vline itable__vline--557"></i>
</div>

<!-- Summary: Orders matched (full / partial / none) -->
<div class="itable itable--w823 itable--h139">
  <div class="itable__title">
    <span class="itable__name">FTSE 100 IDX FUT Sep25</span>
    <span class="itable__minsize">min size: 200</span>
    <div class="itable__title-end">
      <div class="chip-eq">
        <span class="chip-eq__label">Equilibrium Price:</span>
        <span class="chip-eq__value">18.50</span>
      </div>
      <button class="btn-arrow btn-arrow--soft is-disabled" type="button" disabled>
        Cancel
        <span class="icon icon-chevron-down"></span>
      </button>
    </div>
  </div>
  <div class="itable__matched">
    <div class="itable__matched-label">Orders matched:</div>
    <div class="itable__matched-line itable__matched-line--full">Your Buy FTSE 100 IDX FUT Sep25 CC: 200 @ 18.5</div>
  </div>
</div>
<div style="height:8px"></div>
<div class="itable itable--w823 itable--h106">
  <div class="itable__title">
    <span class="itable__name">CAC40 IDX FUT Sep25</span>
    <span class="itable__minsize">min size: 200</span>
    <div class="itable__title-end">
      <div class="chip-eq">
        <span class="chip-eq__label">Equilibrium Price:</span>
        <span class="chip-eq__value">-</span>
      </div>
      <button class="btn-arrow btn-arrow--soft is-disabled" type="button" disabled>
        Cancel
        <span class="icon icon-chevron-down"></span>
      </button>
    </div>
  </div>
  <div class="itable__matched">
    <div class="itable__matched-label">Orders matched:</div>
    <div class="itable__matched-line itable__matched-line--none">None</div>
  </div>
</div>
<div style="height:8px"></div>
<div class="itable itable--w823 itable--h106">
  <div class="itable__title">
    <span class="itable__name">EURO STOXX 50 Sep25 CC</span>
    <span class="itable__minsize">min size: 200</span>
    <div class="itable__title-end">
      <div class="chip-eq">
        <span class="chip-eq__label">Equilibrium Price:</span>
        <span class="chip-eq__value">42.8</span>
      </div>
      <button class="btn-arrow btn-arrow--soft is-disabled" type="button" disabled>
        Cancel
        <span class="icon icon-chevron-down"></span>
      </button>
    </div>
  </div>
  <div class="itable__matched">
    <div class="itable__matched-label">Orders matched:</div>
    <div class="itable__matched-line itable__matched-line--partial">Your Buy EURO STOXX 50 Sep25 CC: 200 @ 43 (partial fill)</div>
  </div>
</div>
```

*Forced-state demos in the showcase (EXTENDED, no separate markup): Row hover / selected.*

- A row is a 33px box whose top 1px is the divider (`box-shadow: inset 0 1px 0 0`). Cells are absolute and centred on `--cx`; vertical lines are `<i class="itable__vline itable__vline--N">`. Row icons use `.itable__icon--x1/--x2/--add`.
- Summary state replaces the table with `.itable__matched` (label 12 grey medium + one 14 line: full = green, partial = orange, none = grey light).

### Aggregate + Global order book (Trade Auction) - Figma-defined

**Figma:** Frame 14 189:1105 (1336x682); aggregate Frame 3 / 8 / 10 189:1110 (839 wide, bg medium, chip #A494FF@0.3); global Frame 5 / 9 / 11 189:1258 (457 wide, bg #18181C); own-order highlight 189:1163 / 189:1164

Section labels (14 grey light) at y=72; tables from y=97, 12px apart, 8px between the two columns. Aggregate columns: [Client|Trader] [Size|Bid] [Size|Ask] [Client|Trader|Spread] with dividers at 190 / 363 / 539; global: Size|Bid|Size|Ask|Spread with dividers at 173 / 353. Table data is illustrative (the spec lists positions, not every value).

```html
<!-- Trade Auction card (2 instruments shown) -->
<section class="session-card session-card--trade">
  <header class="session-card__header">
    <button class="icon-btn icon-btn--minimize session-card__tile" type="button" aria-label="Minimize"></button>
    <div class="session-card__title">
      <span class="session-card__name">European CC 26/6</span>
      <span class="session-card__type session-card__type--cash">Cash Close</span>
    </div>
    <div class="chip-time session-card__chip">
      <span class="chip-time__label">Time Left:</span>
      <span class="chip-time__value">03:32</span>
    </div>
    <button class="btn btn--danger session-card__action session-card__action--r12" type="button">Cancel Auction</button>
  </header>
  <div class="book-grid">
    <div class="book-grid__col">
      <div class="book-grid__label">Aggregate Book</div>
      <div class="itable itable--agg">
        <div class="itable__title">
          <span class="itable__name">FTSE 100 IDX FUT Sep25</span>
          <span class="itable__minsize">min size: 200</span>
          <div class="itable__title-end">
            <div class="chip-eq chip-eq--alt-a494ff">
              <span class="chip-eq__label">Equilibrium Price:</span>
              <span class="chip-eq__value">18.50</span>
            </div>
          </div>
        </div>
        <div class="itable__head">
          <span class="itable__c itable__c--client1">Client</span>
          <span class="itable__c itable__c--trader1">Trader</span>
          <span class="itable__c itable__c--size1">Size</span>
          <span class="itable__c itable__c--bid">Bid</span>
          <span class="itable__c itable__c--size2">Size</span>
          <span class="itable__c itable__c--ask">Ask</span>
          <span class="itable__c itable__c--client2">Client</span>
          <span class="itable__c itable__c--trader2">Trader</span>
          <span class="itable__c itable__c--spread">Spread</span>
        </div>
        <div class="itable__row">
          <span class="itable__c itable__c--client1 itable__c--l">ABC</span>
          <span class="itable__c itable__c--trader1 itable__c--l">mshepley</span>
          <span class="itable__c itable__c--size1">200</span>
          <span class="itable__c itable__c--bid">18.40</span>
          <span class="itable__c itable__c--size2">300</span>
          <span class="itable__c itable__c--ask">18.60</span>
          <span class="itable__c itable__c--client2 itable__c--l">DEF</span>
          <span class="itable__c itable__c--trader2 itable__c--l">jdoe</span>
          <span class="itable__c itable__c--spread">0.20</span>
        </div>
        <div class="itable__row">
          <span class="itable__c itable__c--client1 itable__c--l">GHI</span>
          <span class="itable__c itable__c--trader1 itable__c--l">mshepley</span>
          <span class="itable__c itable__c--size1">400</span>
          <span class="itable__c itable__c--bid">18.30</span>
          <span class="itable__c itable__c--size2">500</span>
          <span class="itable__c itable__c--ask">18.70</span>
          <span class="itable__c itable__c--client2 itable__c--l">JKL</span>
          <span class="itable__c itable__c--trader2 itable__c--l">jdoe</span>
          <span class="itable__c itable__c--spread">0.40</span>
        </div>
        <i class="itable__vline itable__vline--190"></i>
        <i class="itable__vline itable__vline--363"></i>
        <i class="itable__vline itable__vline--539"></i>
        <div class="itable__ov itable__ov--own-bid cell--in-mix"></div>
        <div class="itable__ov itable__ov--own-ask cell--in-mix"></div>
      </div>
    </div>
    <div class="book-grid__col">
      <div class="book-grid__label">Global Order Book</div>
      <div class="itable itable--glob">
        <div class="itable__title">
          <span class="itable__name">FTSE 100 IDX FUT Sep25</span>
          <span class="itable__minsize">min size: 200</span>
        </div>
        <div class="itable__head">
          <span class="itable__c itable__c--size1">Size</span>
          <span class="itable__c itable__c--bid">Bid</span>
          <span class="itable__c itable__c--size2">Size</span>
          <span class="itable__c itable__c--ask">Ask</span>
          <span class="itable__c itable__c--spread">Spread</span>
        </div>
        <div class="itable__row">
          <span class="itable__c itable__c--size1">200</span>
          <span class="itable__c itable__c--bid">18.40</span>
          <span class="itable__c itable__c--size2">300</span>
          <span class="itable__c itable__c--ask">18.60</span>
          <span class="itable__c itable__c--spread">0.20</span>
        </div>
        <div class="itable__row">
          <span class="itable__c itable__c--size1">400</span>
          <span class="itable__c itable__c--bid">18.30</span>
          <span class="itable__c itable__c--size2">500</span>
          <span class="itable__c itable__c--ask">18.70</span>
          <span class="itable__c itable__c--spread">0.40</span>
        </div>
        <i class="itable__vline itable__vline--173"></i>
        <i class="itable__vline itable__vline--353"></i>
      </div>
    </div>
  </div>
</section>
```

- `.book-grid` = grid 839 + 457 (gap 8, padding 16/16/12); `.itable--agg` / `.itable--glob` set the widths and column centres; client/trader data cells use `.itable__c--l` (left aligned). The Trade card places "Cancel Auction" with `.session-card__action--r12`.

### Audit Log (1920 Client Auctions) - Figma-defined

**Figma:** Frame 113 1008:813 (998x741), header Frame 112 1008:814, table 1008:826, header component 1001:283 / 1008:827, date instances 1008:820 / 1008:823, download 1008:824

Header 56 (fill bg lighter, "Audit Log" 16 grey light, From/To dates 155 wide + 32px download tile). Body fill bg medium: header 39 (38 + 1px grey dark bottom border), rows 38, text 12, zebra on even rows (bg lighter). Columns 182 / 241 / 241 / 98 / 60 / 95 / 81; Side column centred. ENTER blue, MODIFY orange, EXECUTION purple, BID green, ASK red. Data is illustrative.

```html
<!-- Audit Log panel (17 rows) -->
<section class="audit-panel">
  <header class="audit-panel__header">
    <span class="audit-panel__title">Audit Log</span>
    <div class="audit-panel__tools">
      <div class="audit-panel__dates">
        <div class="audit-panel__date">
          <span>From</span>
          <div class="date date--w155">
            <span class="icon icon-calendar"></span>
            <input class="date__field" type="text" placeholder="dd/mm/yyyy">
          </div>
        </div>
        <div class="audit-panel__date">
          <span>To</span>
          <div class="date date--w155">
            <span class="icon icon-calendar"></span>
            <input class="date__field" type="text" placeholder="dd/mm/yyyy">
          </div>
        </div>
      </div>
      <button class="icon-btn icon-btn--download" type="button" aria-label="Download"></button>
    </div>
  </header>
  <div class="audit">
    <div class="audit__head">
      <div class="audit__cell">Timestamp</div>
      <div class="audit__cell">Auction</div>
      <div class="audit__cell">Contract</div>
      <div class="audit__cell">Action</div>
      <div class="audit__cell audit__cell--center">Side</div>
      <div class="audit__cell">Price</div>
      <div class="audit__cell">Size</div>
    </div>
    <div class="audit__body">
      <div class="audit__row">
        <div class="audit__cell">02-Jul-2026 16:06:55</div>
        <div class="audit__cell">European EFP 26/6</div>
        <div class="audit__cell">E-mini S&amp;P 500 Future Sep 2025</div>
        <div class="audit__cell audit__enter">ENTER</div>
        <div class="audit__cell audit__cell--center audit__bid">BID</div>
        <div class="audit__cell">5421.25</div>
        <div class="audit__cell">10</div>
      </div>
      <div class="audit__row">
        <div class="audit__cell">02-Jul-2026 16:06:53</div>
        <div class="audit__cell">European EFP 26/6</div>
        <div class="audit__cell">E-mini S&amp;P 500 Future Sep 2025</div>
        <div class="audit__cell audit__enter">ENTER</div>
        <div class="audit__cell audit__cell--center audit__ask">ASK</div>
        <div class="audit__cell">5421.50</div>
        <div class="audit__cell">11</div>
      </div>
      <div class="audit__row">
        <div class="audit__cell">02-Jul-2026 16:06:51</div>
        <div class="audit__cell">European EFP 26/6</div>
        <div class="audit__cell">E-mini S&amp;P 500 Future Sep 2025</div>
        <div class="audit__cell audit__modify">MODIFY</div>
        <div class="audit__cell audit__cell--center audit__bid">BID</div>
        <div class="audit__cell">5421.75</div>
        <div class="audit__cell">12</div>
      </div>
    </div>
  </div>
</section>
```

*Forced-state demos in the showcase (EXTENDED, no separate markup): Row hover / selected.*

- Rows must live inside `.audit__body` (zebra = `:nth-child(even)`); the header is outside it.

### New Auction modal - Figma-defined

**Figma:** modal 115:1871 (916x410), overlay 115:1870 (1373x1024 at x64), instrument table 115:1872 (867x165), Group 3 115:1913, time 115:1927 / 115:1928, buttons 115:1929 / 115:1930 / 115:1931, hidden Upload File 115:1919

All content absolute (as in Figma). Name input (24,70), type segmented right edge 892, instrument table (25,118) with 6 columns and 16px checkboxes at x8, Auction Duration row y=299, action row y=355. The "Upload File" button exists but is hidden in Figma (kept as `.btn--ghost`, not shown).

```html
<!-- Modal -->
<div class="modal modal--w916 modal--auction">
  <div class="modal__header">New Auction</div>
  <div class="input na na--name">
    <input class="input__field" type="text" value="European EFP 26/6" placeholder="Text">
  </div>
  <div class="segmented na na--type">
    <button class="segment is-selected" type="button">Cash Close</button>
    <button class="segment" type="button">EFP</button>
  </div>
  <div class="mtable na na--table">
    <div class="mtable__head">
      <span class="mtable__cell"></span>
      <span class="mtable__cell">Underlying</span>
      <span class="mtable__cell">Generic Symbol</span>
      <span class="mtable__cell">Active Contract</span>
      <span class="mtable__cell">Description</span>
      <span class="mtable__cell">Min Size</span>
    </div>
    <div class="mtable__row">
      <span class="mtable__cell">
        <input class="check" type="checkbox" aria-label="Select SX5E Index">
      </span>
      <span class="mtable__cell">SX5E Index</span>
      <span class="mtable__cell">VGA Index</span>
      <span class="mtable__cell">VGU5 Index</span>
      <span class="mtable__cell">EURO STOXX 50 Sep25</span>
      <span class="mtable__cell">200</span>
    </div>
    <div class="mtable__row">
      <span class="mtable__cell">
        <input class="check" type="checkbox" checked aria-label="Select UKX Index">
      </span>
      <span class="mtable__cell">UKX Index</span>
      <span class="mtable__cell">Z A Index</span>
      <span class="mtable__cell">Z U5 Index</span>
      <span class="mtable__cell">FTSE 100 IDX FUT Sep25</span>
      <span class="mtable__cell">200</span>
    </div>
    <div class="mtable__row">
      <span class="mtable__cell">
        <input class="check" type="checkbox" aria-label="Select CAC Index">
      </span>
      <span class="mtable__cell">CAC Index</span>
      <span class="mtable__cell">CF1 Index</span>
      <span class="mtable__cell">CFU5 Index</span>
      <span class="mtable__cell">CAC40 IDX FUT Sep25</span>
      <span class="mtable__cell">200</span>
    </div>
    <div class="mtable__row">
      <span class="mtable__cell">
        <input class="check" type="checkbox" checked aria-label="Select SPX Index">
      </span>
      <span class="mtable__cell">SPX Index</span>
      <span class="mtable__cell">ES1 Index</span>
      <span class="mtable__cell">ESU5 Index</span>
      <span class="mtable__cell">E-mini S&P 500 Future Sep 2025</span>
      <span class="mtable__cell">100</span>
    </div>
    <i class="mtable__vline mtable__vline--32"></i>
    <i class="mtable__vline mtable__vline--183"></i>
    <i class="mtable__vline mtable__vline--346"></i>
    <i class="mtable__vline mtable__vline--532"></i>
    <i class="mtable__vline mtable__vline--777"></i>
  </div>
  <span class="na na--duration-label">Auction Duration</span>
  <div class="time is-filled na na--duration">
    <span class="time__text">
      <span class="time__value">05:00</span>
      <span class="time__unit">min</span>
    </span>
    <span class="time__spinner">
      <span class="icon icon-time-spinner-arrows"></span>
      <button class="time__up" type="button" aria-label="Increase"></button>
      <button class="time__down" type="button" aria-label="Decrease"></button>
    </span>
  </div>
  <button class="btn btn--neutral na na--cancel" type="button">Cancel</button>
  <button class="btn btn--outline-warning na na--start-in" type="button">Start In</button>
  <div class="time is-filled na na--start-in-time">
    <span class="time__text">
      <span class="time__value">05:00</span>
      <span class="time__unit">min</span>
    </span>
    <span class="time__spinner">
      <span class="icon icon-time-spinner-arrows"></span>
      <button class="time__up" type="button" aria-label="Increase"></button>
      <button class="time__down" type="button" aria-label="Decrease"></button>
    </span>
  </div>
  <button class="btn btn--confirm na na--start-now" type="button">Start Now</button>
</div>
```

- Absolute helpers: `.na--name/--type/--table/--duration-label/--duration/--cancel/--start-in/--start-in-time/--start-now/--upload`. Table sample rows are illustrative (only row 1 is quoted in the spec).

### Log In - Figma-defined

**Figma:** page 131:720; card Frame 22 131:721 (312x416 at 564,304, bg medium, r12); logo 131:722; username 131:725; password 131:727; Forgot Password? 131:740; button 131:741

No sidebar, no header. Card is centred in the 1440x1024 page, no stroke/shadow. Fields have no labels, content box 38..274. No error state exists in Figma (the inline error is EXTENDED).

```html
<!-- Log In page -->
<div class="login-page">
  <div class="auth-card auth-card--login">
    <span class="auth-card__logo icon icon-makor-logo-login"></span>
    <div class="input auth-card__field--user">
      <input class="input__field" type="text" value="mshepley" placeholder="Username" autocomplete="off">
    </div>
    <div class="input input--between input--w236 auth-card__field--pass">
      <span class="input__dots">
        <i class="input__dot"></i>
        <i class="input__dot"></i>
        <i class="input__dot"></i>
        <i class="input__dot"></i>
        <i class="input__dot"></i>
        <i class="input__dot"></i>
        <i class="input__dot"></i>
        <i class="input__dot"></i>
        <i class="input__dot"></i>
        <i class="input__dot"></i>
      </span>
      <span class="icon icon-eye"></span>
    </div>
    <a class="auth-card__forgot" href="#">Forgot Password?</a>
    <button class="btn btn--primary btn--w235 auth-card__submit" type="button">Log In</button>
  </div>
</div>
```

*Forced-state demos in the showcase (EXTENDED, no separate markup): Inline error (EXTENDED).*

- `.auth-card` (surface, radius 12) + `.auth-card--login` (312x416, absolute children `__logo __field--user __field--pass __forgot __submit`).

### Statics lists (Clients / External Traders) - Figma-defined

**Figma:** Clients 282:2059 (card 282:2078, table 282:2080), External Traders 282:1709 (card 138:339, table 138:341); tab strip 282:2154 / 282:2150

Card at (80,116) 1336x892: tab strip (40, divider y=39 1312 long) + content panel (bg lighter) with toolbar (search + Add New) and the table (1312x796, radius 8/8/0/0). Header 41, rows 41, vertical lines full height, no zebra, no checkbox column. There is NO Internal Users list in Figma (tab label only).

```html
<!-- Clients -->
<div class="app">
  <aside class="sidebar">
    <span class="sidebar__logo icon icon-makor-logo"></span>
    <nav class="sidebar__nav">
      <a class="sidebar__item" href="#" aria-label="Auctions">
        <span class="icon icon-nav-auctions"></span>
      </a>
      <a class="sidebar__item is-active" href="#" aria-label="Statics">
        <span class="icon icon-nav-statics"></span>
      </a>
    </nav>
    <span class="sidebar__avatar icon icon-nav-profile"></span>
  </aside>
  <h1 class="app__title">Equity Derivatives Auction</h1>
  <div class="app__rule"></div>
  <h2 class="app__section-title">Statics</h2>
  <div class="statics-card">
    <div class="statics-card__tabs tabs" role="tablist">
      <button class="tab tab--w160 is-selected" type="button" role="tab" aria-selected="true">Clients</button>
      <button class="tab" type="button" role="tab" aria-selected="false">External Traders</button>
      <button class="tab" type="button" role="tab" aria-selected="false">Internal Users</button>
    </div>
    <div class="statics-card__panel">
      <div class="statics-card__toolbar">
        <div class="search">
          <span class="icon icon-search"></span>
          <input class="search__field" type="text" placeholder="Search">
        </div>
        <button class="btn btn--accent" type="button">Add New</button>
      </div>
      <div class="stable stable--clients">
        <div class="stable__head">
          <span class="stable__c">Makor X ID</span>
          <span class="stable__c">Client Name</span>
          <span class="stable__c">Users</span>
          <span class="stable__c">Active</span>
          <span class="stable__c">Actions</span>
        </div>
        <div class="stable__row">
          <span class="stable__c">
            <a class="stable__link" href="#">001</a>
          </span>
          <span class="stable__c stable__c--name">ABC Holdings</span>
          <span class="stable__c">
            <a class="stable__link stable__link--users" href="#">4</a>
          </span>
          <span class="stable__c">
            <span class="img-icon img-status-active-check"></span>
          </span>
          <span class="stable__c stable__c--actions">
            <button class="icon-action" type="button" aria-label="Reset password">
              <span class="icon icon-rotate-ccw-key"></span>
            </button>
            <button class="icon-action" type="button" aria-label="Edit">
              <span class="icon icon-edit-square-pen"></span>
            </button>
          </span>
        </div>
        <div class="stable__row">
          <span class="stable__c">
            <a class="stable__link" href="#">002</a>
          </span>
          <span class="stable__c stable__c--name">XYZ Capital</span>
          <span class="stable__c">
            <a class="stable__link stable__link--users" href="#">20</a>
          </span>
          <span class="stable__c"></span>
          <span class="stable__c stable__c--actions">
            <button class="icon-action" type="button" aria-label="Reset password">
              <span class="icon icon-rotate-ccw-key"></span>
            </button>
            <button class="icon-action" type="button" aria-label="Edit">
              <span class="icon icon-edit-square-pen"></span>
            </button>
          </span>
        </div>
        <div class="stable__row">
          <span class="stable__c">
            <a class="stable__link" href="#">003</a>
          </span>
          <span class="stable__c stable__c--name">DEF Partners</span>
          <span class="stable__c">
            <a class="stable__link stable__link--users" href="#">13</a>
          </span>
          <span class="stable__c">
            <span class="img-icon img-status-active-check"></span>
          </span>
          <span class="stable__c stable__c--actions">
            <button class="icon-action" type="button" aria-label="Reset password">
              <span class="icon icon-rotate-ccw-key"></span>
            </button>
            <button class="icon-action" type="button" aria-label="Edit">
              <span class="icon icon-edit-square-pen"></span>
            </button>
          </span>
        </div>
        <div class="stable__row">
          <span class="stable__c">
            <a class="stable__link" href="#">004</a>
          </span>
          <span class="stable__c stable__c--name">GHI Trading</span>
          <span class="stable__c">
            <a class="stable__link stable__link--users" href="#">2</a>
          </span>
          <span class="stable__c"></span>
          <span class="stable__c stable__c--actions">
            <button class="icon-action" type="button" aria-label="Reset password">
              <span class="icon icon-rotate-ccw-key"></span>
            </button>
            <button class="icon-action" type="button" aria-label="Edit">
              <span class="icon icon-edit-square-pen"></span>
            </button>
          </span>
        </div>
        <i class="stable__vline stable__vline--188"></i>
        <i class="stable__vline stable__vline--869"></i>
        <i class="stable__vline stable__vline--1088"></i>
        <i class="stable__vline stable__vline--1176"></i>
      </div>
    </div>
  </div>
</div>

<!-- External Traders -->
<div class="app">
  <aside class="sidebar">
    <span class="sidebar__logo icon icon-makor-logo"></span>
    <nav class="sidebar__nav">
      <a class="sidebar__item" href="#" aria-label="Auctions">
        <span class="icon icon-nav-auctions"></span>
      </a>
      <a class="sidebar__item is-active" href="#" aria-label="Statics">
        <span class="icon icon-nav-statics"></span>
      </a>
    </nav>
    <span class="sidebar__avatar icon icon-nav-profile"></span>
  </aside>
  <h1 class="app__title">Equity Derivatives Auction</h1>
  <div class="app__rule"></div>
  <h2 class="app__section-title">Statics</h2>
  <div class="statics-card">
    <div class="statics-card__tabs tabs" role="tablist">
      <button class="tab tab--w160" type="button" role="tab" aria-selected="false">Clients</button>
      <button class="tab is-selected" type="button" role="tab" aria-selected="true">External Traders</button>
      <button class="tab" type="button" role="tab" aria-selected="false">Internal Users</button>
    </div>
    <div class="statics-card__panel">
      <div class="statics-card__toolbar">
        <div class="search">
          <span class="icon icon-search"></span>
          <input class="search__field" type="text" placeholder="Search">
        </div>
        <button class="btn btn--accent" type="button">Add New</button>
      </div>
      <div class="stable stable--traders">
        <div class="stable__head">
          <span class="stable__c">First Name</span>
          <span class="stable__c">Last Name</span>
          <span class="stable__c">Username</span>
          <span class="stable__c">Email Address</span>
          <span class="stable__c">Client</span>
          <span class="stable__c">Active</span>
          <span class="stable__c">Actions</span>
        </div>
        <div class="stable__row">
          <span class="stable__c">ABC</span>
          <span class="stable__c">XYZ</span>
          <span class="stable__c">abc_xyz</span>
          <span class="stable__c">abc_xyz@gmail.com</span>
          <span class="stable__c">DEFGHI</span>
          <span class="stable__c">
            <span class="img-icon img-status-active-check"></span>
          </span>
          <span class="stable__c stable__c--actions">
            <button class="icon-action" type="button" aria-label="Reset password">
              <span class="icon icon-rotate-ccw-key"></span>
            </button>
            <button class="icon-action" type="button" aria-label="Edit">
              <span class="icon icon-edit-square-pen"></span>
            </button>
          </span>
        </div>
        <div class="stable__row">
          <span class="stable__c">ABC</span>
          <span class="stable__c">XYZ</span>
          <span class="stable__c">abc_xyz</span>
          <span class="stable__c">abc_xyz@gmail.com</span>
          <span class="stable__c">DEFGHI</span>
          <span class="stable__c"></span>
          <span class="stable__c stable__c--actions">
            <button class="icon-action" type="button" aria-label="Reset password">
              <span class="icon icon-rotate-ccw-key"></span>
            </button>
            <button class="icon-action" type="button" aria-label="Edit">
              <span class="icon icon-edit-square-pen"></span>
            </button>
          </span>
        </div>
        <div class="stable__row">
          <span class="stable__c">ABC</span>
          <span class="stable__c">XYZ</span>
          <span class="stable__c">abc_xyz</span>
          <span class="stable__c">abc_xyz@gmail.com</span>
          <span class="stable__c">DEFGHI</span>
          <span class="stable__c">
            <span class="img-icon img-status-active-check"></span>
          </span>
          <span class="stable__c stable__c--actions">
            <button class="icon-action" type="button" aria-label="Reset password">
              <span class="icon icon-rotate-ccw-key"></span>
            </button>
            <button class="icon-action" type="button" aria-label="Edit">
              <span class="icon icon-edit-square-pen"></span>
            </button>
          </span>
        </div>
        <div class="stable__row">
          <span class="stable__c">ABC</span>
          <span class="stable__c">XYZ</span>
          <span class="stable__c">abc_xyz</span>
          <span class="stable__c">abc_xyz@gmail.com</span>
          <span class="stable__c">DEFGHI</span>
          <span class="stable__c"></span>
          <span class="stable__c stable__c--actions">
            <button class="icon-action" type="button" aria-label="Reset password">
              <span class="icon icon-rotate-ccw-key"></span>
            </button>
            <button class="icon-action" type="button" aria-label="Edit">
              <span class="icon icon-edit-square-pen"></span>
            </button>
          </span>
        </div>
        <i class="stable__vline stable__vline--188"></i>
        <i class="stable__vline stable__vline--391"></i>
        <i class="stable__vline stable__vline--591"></i>
        <i class="stable__vline stable__vline--869"></i>
        <i class="stable__vline stable__vline--1088"></i>
        <i class="stable__vline stable__vline--1176"></i>
      </div>
    </div>
  </div>
</div>

<!-- Empty state, skeleton row, pager [EXTENDED] -->
<div class="sc-stack">
  <div class="stable__empty sc-static-empty">No results</div>
  <div class="sc-row">
    <span class="skeleton" style="width:120px"></span>
    <span class="skeleton" style="width:260px"></span>
    <span class="skeleton" style="width:80px"></span>
  </div>
  <div class="pager">
    <button class="pager__item" type="button" disabled>&lt;</button>
    <button class="pager__item is-selected" type="button">1</button>
    <button class="pager__item" type="button">2</button>
    <button class="pager__item" type="button">3</button>
    <button class="pager__item" type="button">&gt;</button>
  </div>
</div>
```

- Column tracks are CSS variables (`--cols`); `.stable__c--name` pads the Clients name column by 52px (as measured). Empty state, `.skeleton` and `.pager` are EXTENDED.

### Admin modals (External Trader, Internal User, Client) - Figma-defined

**Figma:** External Trader 138:499 / 282:2309 (448x409); Internal User 282:2442 / 282:2467 (448x417); New / Edit Client 170:810 / 282:2620 (720x584); overlays 138:498, 282:2441, 170:809, 282:2619

Two 184px columns (x24 / x240), 400px full rows, label-to-input 8px, row pitch 78, toggle row, footer Cancel (neutral) left / primary right. New: primary is the DISABLED Add New while the form is empty; Edit: Save Changes (accent). Internal User: Admin check in row 1 right column; modal height 417 because Cancel is 40 tall and the primary 32 tall 8px lower (a Figma slip, reproduced). Client modal: Client Name search + Makor X ID + Client User List panel (670x319) with 5-column table, scrollbar on Edit.

```html
<!-- New External Trader -->
<div class="modal modal--w448">
  <div class="modal__header">New External Trader</div>
  <div class="modal__body">
    <div class="form-grid">
      <div class="field">
        <label class="field__label">Username</label>
        <div class="input input--w184">
          <input class="input__field" type="text" placeholder="Username">
        </div>
      </div>
      <div class="field">
        <label class="field__label">Client</label>
        <div class="search search--w184">
          <span class="icon icon-search"></span>
          <input class="search__field" type="text" placeholder="Client">
        </div>
      </div>
      <div class="field">
        <label class="field__label">First Name</label>
        <div class="input input--w184">
          <input class="input__field" type="text" placeholder="First Name">
        </div>
      </div>
      <div class="field">
        <label class="field__label">Last Name</label>
        <div class="input input--w184">
          <input class="input__field" type="text" placeholder="Last Name">
        </div>
      </div>
      <div class="field form-grid__full">
        <label class="field__label">Email Address</label>
        <div class="input input--w400">
          <input class="input__field" type="text" placeholder="exampple@email.com">
        </div>
      </div>
    </div>
    <div class="modal__toggle-row">
      <button class="toggle" type="button" role="switch" aria-checked="false" data-on="Active" data-off="Inactive">
        <span class="toggle__track">
          <span class="toggle__thumb"></span>
        </span>
        <span class="toggle__label">Inactive</span>
      </button>
    </div>
    <div class="modal__footer">
      <button class="btn btn--neutral" type="button">Cancel</button>
      <button class="btn" type="button" disabled>Add New</button>
    </div>
  </div>
</div>

<!-- Edit External Trader -->
<div class="modal modal--w448">
  <div class="modal__header">Edit External Trader</div>
  <div class="modal__body">
    <div class="form-grid">
      <div class="field">
        <label class="field__label">Username</label>
        <div class="input input--w184">
          <input class="input__field" type="text" value="abc_xyz" placeholder="Username">
        </div>
      </div>
      <div class="field">
        <label class="field__label">Client</label>
        <div class="search search--w184">
          <span class="icon icon-search"></span>
          <input class="search__field" type="text" value="DEFGHI" placeholder="Client">
        </div>
      </div>
      <div class="field">
        <label class="field__label">First Name</label>
        <div class="input input--w184">
          <input class="input__field" type="text" value="ABC" placeholder="First Name">
        </div>
      </div>
      <div class="field">
        <label class="field__label">Last Name</label>
        <div class="input input--w184">
          <input class="input__field" type="text" value="XYZ" placeholder="Last Name">
        </div>
      </div>
      <div class="field form-grid__full">
        <label class="field__label">Email Address</label>
        <div class="input input--w400">
          <input class="input__field" type="text" value="abc_xyz@gmail.com" placeholder="exampple@email.com">
        </div>
      </div>
    </div>
    <div class="modal__toggle-row">
      <button class="toggle is-on" type="button" role="switch" aria-checked="true" data-on="Active" data-off="Inactive">
        <span class="toggle__track">
          <span class="toggle__thumb"></span>
        </span>
        <span class="toggle__label">Active</span>
      </button>
    </div>
    <div class="modal__footer">
      <button class="btn btn--neutral" type="button">Cancel</button>
      <button class="btn btn--accent" type="button">Save Changes</button>
    </div>
  </div>
</div>

<!-- New Internal User -->
<div class="modal modal--w448 modal--internal">
  <div class="modal__header">New Internal User</div>
  <div class="modal__body">
    <div class="form-grid">
      <div class="field">
        <label class="field__label">Username</label>
        <div class="input input--w184">
          <input class="input__field" type="text" placeholder="Username">
        </div>
      </div>
      <div class="form-grid__check">
        <label class="check-field">
          <input class="check" type="checkbox">
          Admin
        </label>
      </div>
      <div class="field">
        <label class="field__label">First Name</label>
        <div class="input input--w184">
          <input class="input__field" type="text" placeholder="First Name">
        </div>
      </div>
      <div class="field">
        <label class="field__label">Last Name</label>
        <div class="input input--w184">
          <input class="input__field" type="text" placeholder="Last Name">
        </div>
      </div>
      <div class="field form-grid__full">
        <label class="field__label">Email Address</label>
        <div class="input input--w400">
          <input class="input__field" type="text" placeholder="exampple@email.com">
        </div>
      </div>
    </div>
    <div class="modal__toggle-row">
      <button class="toggle" type="button" role="switch" aria-checked="false" data-on="Active" data-off="Inactive">
        <span class="toggle__track">
          <span class="toggle__thumb"></span>
        </span>
        <span class="toggle__label">Inactive</span>
      </button>
    </div>
    <div class="modal__footer">
      <button class="btn btn--neutral btn--h40" type="button">Cancel</button>
      <button class="btn" type="button" disabled>Add New</button>
    </div>
  </div>
</div>

<!-- Edit Internal User -->
<div class="modal modal--w448 modal--internal">
  <div class="modal__header">Edit Internal User</div>
  <div class="modal__body">
    <div class="form-grid">
      <div class="field">
        <label class="field__label">Username</label>
        <div class="input input--w184">
          <input class="input__field" type="text" value="abc_xyz" placeholder="Username">
        </div>
      </div>
      <div class="form-grid__check">
        <label class="check-field is-checked">
          <input class="check" type="checkbox" checked>
          Admin
        </label>
      </div>
      <div class="field">
        <label class="field__label">First Name</label>
        <div class="input input--w184">
          <input class="input__field" type="text" value="ABC" placeholder="First Name">
        </div>
      </div>
      <div class="field">
        <label class="field__label">Last Name</label>
        <div class="input input--w184">
          <input class="input__field" type="text" value="XYZ" placeholder="Last Name">
        </div>
      </div>
      <div class="field form-grid__full">
        <label class="field__label">Email Address</label>
        <div class="input input--w400">
          <input class="input__field" type="text" value="abc_xyz@gmail.com" placeholder="exampple@email.com">
        </div>
      </div>
    </div>
    <div class="modal__toggle-row">
      <button class="toggle is-on" type="button" role="switch" aria-checked="true" data-on="Active" data-off="Inactive">
        <span class="toggle__track">
          <span class="toggle__thumb"></span>
        </span>
        <span class="toggle__label">Active</span>
      </button>
    </div>
    <div class="modal__footer">
      <button class="btn btn--neutral btn--h40" type="button">Cancel</button>
      <button class="btn btn--accent" type="button">Save Changes</button>
    </div>
  </div>
</div>

<!-- New Client -->
<div class="modal modal--w720">
  <div class="modal__header">New Client</div>
  <div class="modal__body">
    <div class="client-head">
      <div class="field">
        <label class="field__label">Client Name</label>
        <div class="search">
          <span class="icon icon-search"></span>
          <input class="search__field" type="text" placeholder="Client Name">
        </div>
      </div>
      <div>
        <div class="client-head__id-label">Makor X ID</div>
        <div class="client-head__id-value">-</div>
      </div>
    </div>
    <div class="client-panel">
      <span class="client-panel__title">Client User List</span>
      <div class="search client-panel__search search--icon-muted">
        <span class="icon icon-search"></span>
        <input class="search__field" type="text" placeholder="Search">
      </div>
      <div class="ctable">
        <div class="ctable__head">
          <span class="ctable__c"></span>
          <span class="ctable__c">Username</span>
          <span class="ctable__c">First Name</span>
          <span class="ctable__c">Last Name</span>
          <span class="ctable__c">Email Address</span>
        </div>
        <div class="ctable__row"></div>
        <i class="ctable__vline ctable__vline--40"></i>
        <i class="ctable__vline ctable__vline--154"></i>
        <i class="ctable__vline ctable__vline--277"></i>
        <i class="ctable__vline ctable__vline--420"></i>
      </div>
    </div>
    <div class="modal__toggle-row">
      <button class="toggle" type="button" role="switch" aria-checked="false" data-on="Active" data-off="Inactive">
        <span class="toggle__track">
          <span class="toggle__thumb"></span>
        </span>
        <span class="toggle__label">Inactive</span>
      </button>
    </div>
    <div class="modal__footer">
      <button class="btn btn--neutral" type="button">Cancel</button>
      <button class="btn" type="button" disabled>Add New</button>
    </div>
  </div>
</div>

<!-- Edit Client -->
<div class="modal modal--w720">
  <div class="modal__header">Edit Client</div>
  <div class="modal__body">
    <div class="client-head">
      <div class="field">
        <label class="field__label">Client Name</label>
        <div class="search">
          <span class="icon icon-search"></span>
          <input class="search__field" type="text" placeholder="Client Name">
        </div>
      </div>
      <div>
        <div class="client-head__id-label">Makor X ID</div>
        <div class="client-head__id-value">002</div>
      </div>
    </div>
    <div class="client-panel">
      <span class="client-panel__title">Client User List</span>
      <div class="search client-panel__search">
        <span class="icon icon-search"></span>
        <input class="search__field" type="text" placeholder="Search">
      </div>
      <div class="ctable ctable--alt-email-header-481">
        <div class="ctable__head">
          <span class="ctable__c"></span>
          <span class="ctable__c">Username</span>
          <span class="ctable__c">First Name</span>
          <span class="ctable__c">Last Name</span>
          <span class="ctable__c">Email Address</span>
        </div>
        <div class="ctable__row">
          <span class="ctable__c">
            <input class="check" type="checkbox" aria-label="Select user">
          </span>
          <span class="ctable__c">abc_xyz</span>
          <span class="ctable__c">ABC</span>
          <span class="ctable__c">XYZ</span>
          <span class="ctable__c">abc_xyz@gmail.com</span>
        </div>
        <div class="ctable__row">
          <span class="ctable__c">
            <input class="check" type="checkbox" checked aria-label="Select user">
          </span>
          <span class="ctable__c">mshepley</span>
          <span class="ctable__c">Mark</span>
          <span class="ctable__c">Shepley</span>
          <span class="ctable__c">mshepley@example.com</span>
        </div>
        <div class="ctable__row">
          <span class="ctable__c">
            <input class="check" type="checkbox" aria-label="Select user">
          </span>
          <span class="ctable__c"></span>
          <span class="ctable__c">DEF</span>
          <span class="ctable__c">GHI</span>
          <span class="ctable__c">def_ghi@example.com</span>
        </div>
        <div class="ctable__row">
          <span class="ctable__c">
            <input class="check" type="checkbox" checked aria-label="Select user">
          </span>
          <span class="ctable__c">jdoe</span>
          <span class="ctable__c">John</span>
          <span class="ctable__c">Doe</span>
          <span class="ctable__c">jdoe@example.com</span>
        </div>
        <div class="ctable__row">
          <span class="ctable__c">
            <input class="check" type="checkbox" aria-label="Select user">
          </span>
          <span class="ctable__c"></span>
          <span class="ctable__c">KLM</span>
          <span class="ctable__c">NOP</span>
          <span class="ctable__c">klm_nop@example.com</span>
        </div>
        <i class="ctable__vline ctable__vline--40"></i>
        <i class="ctable__vline ctable__vline--154"></i>
        <i class="ctable__vline ctable__vline--277"></i>
        <i class="ctable__vline ctable__vline--420"></i>
      </div>
      <div class="scrollbar">
        <div class="scrollbar__thumb"></div>
      </div>
    </div>
    <div class="modal__toggle-row">
      <button class="toggle is-on" type="button" role="switch" aria-checked="true" data-on="Active" data-off="Inactive">
        <span class="toggle__track">
          <span class="toggle__thumb"></span>
        </span>
        <span class="toggle__label">Active</span>
      </button>
    </div>
    <div class="modal__footer">
      <button class="btn btn--neutral" type="button">Cancel</button>
      <button class="btn btn--accent" type="button">Save Changes</button>
    </div>
  </div>
</div>

<!-- Field validation error text [EXTENDED] -->
<div class="field" style="position:relative;height:78px">
  <label class="field__label">Username</label>
  <div class="input input--w184 is-error">
    <input class="input__field" type="text" value="abc" placeholder="Text">
  </div>
  <span class="field__error">Username already exists</span>
</div>

<!-- Confirm-delete modal [EXTENDED] -->
<div class="modal modal--w448 modal--confirm-delete">
  <div class="modal__header">Delete user?</div>
  <div class="modal__body">
    <p class="modal__message">This action cannot be undone.</p>
    <div class="modal__footer">
      <button class="btn btn--neutral" type="button">Cancel</button>
      <button class="btn btn--danger" type="button">Delete</button>
    </div>
  </div>
</div>
```

- `.form-grid` (2 x 184, `__full` for 400px rows, `__check` for the Admin box); `.modal__toggle-row` (margin-top 24); `.modal--internal` reproduces the 417 height. `.field__error` and `.modal--confirm-delete` are EXTENDED.

## Behaviour (EXTENDED)

### Bid / Ask validation (spec behaviour) - EXTENDED

**Figma:** Figma draws only the static error state: error cell 273:1144 + toast 273:1141 "Bid should be lower that Ask" (sic). The live wiring below is EXTENDED.

Rule from the spec: when Bid >= Ask the Size|Ask cell gets the red error stroke and the error toast appears above it. Type values to try it.

```html
<!-- Interactive demo [EXTENDED] -->
<div class="sc-stack" data-order-demo>
  <div class="sc-row">
    <div class="field">
      <label class="field__label">Bid</label>
      <div class="input input--w184">
        <input class="input__field" type="text" value="18.40" placeholder="0">
      </div>
    </div>
    <div class="field">
      <label class="field__label">Ask</label>
      <div class="input input--w184">
        <input class="input__field" type="text" value="18.60" placeholder="0">
      </div>
    </div>
  </div>
  <div class="toast toast--error" hidden data-order-toast>
    <span class="icon icon-status-warning"></span>
    Bid should be lower that Ask
  </div>
</div>
```

- Copy the markup, wire the script below.

Behaviour:

```js
// Bid must be lower than Ask (spec text reproduced verbatim, incl. "that")
function validateBidAsk(root) {
  const [bid, ask] = root.querySelectorAll('.input__field');
  const bad = bid.value !== '' && ask.value !== '' && parseFloat(bid.value) >= parseFloat(ask.value);
  ask.closest('.input').classList.toggle('is-error', bad);
  root.querySelector('[data-order-toast]').hidden = !bad;
}
document.addEventListener('input', e => { const r = e.target.closest('[data-order-demo]'); if (r) validateBidAsk(r); });
```

## Screens (composition)

Screens are assembled from the patterns above at the Figma frame size; see `showcase.html` > Screens for the 14 reference compositions (Trade Auction, New Auction modal, Client Auctions 1440 / 1920, New lever, Freeze, Summary, Log In, Clients, External Traders, External Trader / Internal User modal pairs, New / Edit Client). Skeleton:

```html
<div class="app">                     <!-- 1440x1024 (app--wide = 1920x1080) -->
  <aside class="sidebar">...</aside>
  <h1 class="app__title">Equity Derivatives Auction</h1>
  <div class="app__rule"></div>
  <h2 class="app__section-title">Auctions</h2>
  <div class="app__view-as">...</div>   <div class="app__actions">...</div>
  <div class="banner-slot">...</div>    <!-- notification cards, right 24 / top 77 -->
  <main class="app__main">...session cards / .statics-card...</main>
  <div class="modal-scrim modal-scrim--beside-sidebar modal-scrim--centered">...modal...</div>   <!-- optional -->
</div>
```

Login is the exception: `<div class="login-page"><div class="auth-card auth-card--login">...</div></div>` (no sidebar, no header).

## Extended table (EXTENDED - not in Figma)

| Name | What | Derivation |
|---|---|---|
| Hover state (all controls) | `:hover` / `.is-hover` on .input .search .date .dropdown .time .btn .btn-arrow .tab .segment .icon-btn .icon-action .check .menu__item .itable__row .audit__row .mtable__row .stable__row .pager__item | White (#F8F7FF) @0.1 overlay (`--color-ext-hover`) layered over the existing fill; Figma draws no hover anywhere. |
| Pressed state | `:active` / `.is-active` on .btn .btn-arrow | White @0.2 (`--color-ext-pressed`). |
| Focus ring | `:focus-within` / `.is-focus` (controls, tabs, segments) and `:focus-visible` outline (buttons, check, toggle, icon buttons, sidebar items) | Variable `blue` (#7590FF): 1px INSIDE stroke on controls (mirrors Figma INSIDE strokes), 1px outline offset 2 on buttons. Figma only draws the blue@0.6 order-input well. |
| Error stroke on controls | `.is-error` on .input .search .date .dropdown .time | 1px INSIDE `red error` (#FF7553), derived from the drawn error cell stroke 273:1144. |
| Disabled controls | `.is-disabled` / `[aria-disabled]` on .input .search .date .dropdown .time; `.check:disabled` | Placeholder colour text, no hover. Figma only draws disabled buttons. |
| Time spinner hit targets | `.time__up` / `.time__down` | Transparent 10x12 buttons over the drawn arrows; hover = white @0.1. |
| Full-width input | `.input--full` | Fill-width helper (Figma widths are always fixed). |
| Left unselected segment radius | `.segment:first-child:not(.is-selected)` | Mirror of the drawn [0,4,4,0] radius. |
| Functional scrollbar | `.scroll-y` | Reuses the drawn scrollbar (4px, grey dark track, grey medium thumb, radius 12). |
| Menu item hit area / hover / selected | `.menu__item`, `:hover`, `.is-selected` | Full-width hit area (margin -16 / padding 16); hover = white @0.1. |
| Sidebar nav hover / focus | `.sidebar__item:hover`, `.is-focus` | Hover = the drawn ACTIVE colour (white); focus = blue outline. |
| Banner stacking gap | `.banner-slot` gap 8 | Only one banner is ever drawn; the gap between several is derived (`--space-8`). |
| Row hover / selected | `.itable__row .audit__row .mtable__row .stable__row` + `.is-selected` | Hover white @0.1; selected = `blue transparent 15` (the drawn selected-tab fill). |
| Empty state | `.stable__empty`, `.client-panel__empty` | Centred message in grey medium 14 (Figma shows blank rows). |
| Loading skeleton | `.skeleton` | Static grey dark bar, radius 4 (no animation token exists). |
| Pagination | `.pager`, `.pager__item` | Control fill grey dark, selected = tab-selected recipe, disabled = disabled-button recipe. |
| Delete row action | `.icon-action--delete` | Existing red x-circle icon in a 24x24 action frame (Figma has no delete icon). |
| Login error text | `.auth-card__error` | `red error` 12 in the 49.5px gap between the fields (Figma leaves the room, draws nothing). |
| Field validation text | `.field__error` | `red error` 12 under an input (absolute, row pitch unchanged). |
| Confirm-delete modal | `.modal--confirm-delete` | `.modal--w448` + 14 white message + neutral Cancel + danger button. |
| Fallback font stack | `--font-primary` | `Lato, system-ui, -apple-system, Segoe UI, sans-serif` (Figma names Lato only). |
| Dropdown menu open / close | JS snippet in "Dropdown" | Click toggles, outside click / Esc closes. Figma draws only the open Cancel menu. |
| Time stepper step | JS snippet in "Time" | Step = 1 minute (unit label is "min"); no min / max in Figma. |
| Countdown thresholds | JS snippet in "Time chip" | Frozen style at <= 15 s, ended style at 0 (the four chip states are drawn, the transitions are not). |
| Bid / Ask validation wiring | JS snippet in "Bid / Ask validation" | Error stroke + toast when Bid >= Ask (rule from the spec; wiring is ours). |
| Check label colour sync | JS snippet in "Check" | Label grey light -> white follows the drawn unchecked / checked labels. |

## Documented alternates (--alt-*)

| Class / token | Alternative kept | Canonical |
|---|---|---|
| `.chip-eq--alt-a494ff`, `--color-equilibrium-chip-bg-alt` | Equilibrium chip #A494FF @0.3 (6 uses, Trade Auction aggregate book) | #B694FF @0.2 |
| `.tab--alt-selected-square` | Selected tab without radius (admin-auth) | radius 6/6/0/0 on both states |
| `.tab--alt-legacy-48` | 48px tab, 18px label (legacy shell) | 40px, 14px |
| `.session-card--alt-top-68` | First instrument card at y=68 | y=72 |
| `.session-card--alt-1440` | Old Client Auctions 1440 look | 1920 look (`--client-1920`) |
| `.app--alt-legacy-80` | 80px legacy sidebar shell | 64px |
| `.modal-scrim--alt-1373`, `--alt-legacy-80` | New Auction overlay 1373 wide / New-Edit Client overlay offset | 1376 (`--admin`) |
| `.ctable--alt-email-header-481` | Edit Client email header x481 | x505 (New) |

Figma copy typos are reproduced verbatim: "Bid should be lower that Ask", "exampple@email.com", screen names "Acution Freeze time" / "Acution Summary".

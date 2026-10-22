# Enigma X: component reference

Copy-paste HTML for every component and pattern of the Enigma X **trading app** design system (separate from the Enigma X auth system, `--eauth-*`, DM Sans). Source of truth: Figma file `3PpdEgLKQZaybhyIILCfUF`, page **final** (`16:1909`). Every snippet below is the exact markup of the showcase demo (`showcase.html`, same files); node ids are in each "Source" line. Items marked **EXTENDED** are not drawn in Figma and are built only from existing tokens (list at the end).

## 0. Setup

```html
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components.css">   <!-- asset URLs (assets/…) are relative to the CSS file's page; keep assets/ next to it or override --icon-src / the .coin and .logo-enigma rules -->
```

- Components use ONLY semantic tokens (`--color-text-*`, `--color-surface-*`, `--color-border-*` …), never raw hex, so the dark theme (EXTENDED) flips everything: add `class="dark"` to `<body>` or `theme-dark` to any ancestor. `.theme-light` re-asserts the light values inside a dark scope.
- States: real pseudo-classes plus forced classes for display: `.is-hover .is-focus .is-active .is-disabled .is-error .is-open .is-selected .is-checked .is-indeterminate .is-filled .is-dim`.
- Strokes are INSIDE in Figma, so they are `inset box-shadow`; OUTSIDE strokes (Button black Variant2, table containers) are outer `box-shadow`.
- Type: 13 shorthand classes `.t-<family-weight-size>` and 31 role classes `.t-<role>` (e.g. `.t-panel-title`, `.t-tile-big`) in `components.css`; shorthands `var(--type-<key>)` for `font:`.
- Fixed widths shown as inline `style="width:392px"` (392 = panel inner width) are only needed outside a panel; inside a `.panel` the parent stretches the element.


---

## Actions

### Button

Source: Figma set 56:193 (Default 56:194, hover 56:196); Dashboard instance 16:2132.

```html
<!-- Default [56:194] -->
<button class="btn" type="button">Button</button>

<!-- Hover (`.is-hover` / `:hover`) [56:196] -->
<button class="btn is-hover" type="button">Button</button>

<!-- Dashboard primary (`.btn--lg .btn--block`, 392 x 40, label 14, typed uppercase) [16:2132] -->
<button class="btn btn--lg btn--block" style="width:392px" type="button">REQUEST FOR QUOTE</button>

<!-- Pressed (`.is-active`) (EXTENDED) -->
<button class="btn is-active" type="button">Button</button>

<!-- Disabled (`:disabled`) (EXTENDED) -->
<button class="btn" type="button" disabled>Button</button>

<!-- Focus (`.is-focus` / `:focus-visible`) (EXTENDED) -->
<button class="btn is-focus" type="button">Button</button>
```

HUG x FIXED(32) = 86 x 32, padding 7/24, gap 8, radius 4, no stroke; label `--type-blotter-cell` (Geist Medium 12) Black on Main color `#7AEFEF`. Hover = Main color hover `#B0F9F6` + 1px Main color stroke INSIDE (inset box-shadow). The pressed, disabled and focus variants are Extended.

### Button Outline

Source: Figma set 56:188 (Default 56:189, hover 56:191).

```html
<!-- Default [56:189] -->
<button class="btn-outline" type="button">Button</button>

<!-- Hover [56:191] -->
<button class="btn-outline is-hover" type="button">Button</button>

<!-- Stretched: label stays left (primary axis MIN) [56:189] -->
<button class="btn-outline btn--block" style="width:196px" type="button">Button</button>

<!-- Pressed (EXTENDED) -->
<button class="btn-outline is-active" type="button">Button</button>

<!-- Disabled (EXTENDED) -->
<button class="btn-outline" type="button" disabled>Button</button>

<!-- Focus (EXTENDED) -->
<button class="btn-outline is-focus" type="button">Button</button>
```

No fill, 1px Black stroke INSIDE, label Black. Hover fill = Main color transp (`#7AEFEF` at 0.20). Primary axis is MIN in Figma, so the label is left-aligned when the button is stretched.

### Button black

Source: Figma set 56:198 (Default 56:199, Variant2 56:201).

```html
<!-- Default [56:199] -->
<button class="btn-black" type="button">Button</button>

<!-- Variant2 (unnamed in Figma; presumed hover, `.is-hover`) [56:201] -->
<button class="btn-black is-hover" type="button">Button</button>

<!-- Pressed (EXTENDED) -->
<button class="btn-black is-active" type="button">Button</button>

<!-- Disabled (EXTENDED) -->
<button class="btn-black" type="button" disabled>Button</button>

<!-- Focus (EXTENDED) -->
<button class="btn-black is-focus" type="button">Button</button>
```

Fill Black, label Geist Medium 12 in Main color. Variant2 adds a 1px Main color stroke OUTSIDE (outer box-shadow). Figma does not name Variant2; it is treated as the hover state (see Known inconsistencies). Not used on the Dashboard.

### Icon button: refresh

Source: Figma set 56:225 (Default 56:226, hover 56:228); Dashboard 16:1957, 16:1987.

```html
<!-- Default [56:226] -->
<button class="icon-btn" type="button" aria-label="Refresh">
  <i class="icon icon-refresh"></i>
</button>

<!-- Hover [56:228] -->
<button class="icon-btn is-hover" type="button" aria-label="Refresh">
  <i class="icon icon-refresh"></i>
</button>

<!-- Pressed (EXTENDED) -->
<button class="icon-btn is-active" type="button" aria-label="Refresh">
  <i class="icon icon-refresh"></i>
</button>

<!-- Disabled (EXTENDED) -->
<button class="icon-btn" type="button" aria-label="Refresh" disabled>
  <i class="icon icon-refresh"></i>
</button>

<!-- Focus (EXTENDED) -->
<button class="icon-btn is-focus" type="button" aria-label="Refresh">
  <i class="icon icon-refresh"></i>
</button>
```

32 x 32 FIXED, radius 4, padding 7, glyph `assets/icon-refresh.currentColor.svg` at its export size 18 x 18 centred on the 16 x 16 node box. Hover fill Grey 1 `#DEE8ED`; the glyph colour does not change.

### Icon button: filter

Source: Figma set 56:230 (Default 56:231, Variant2 56:233); Dashboard 16:1988.

```html
<!-- Default [56:231] -->
<button class="icon-btn" type="button" aria-label="Filter">
  <i class="icon icon-filter"></i>
</button>

<!-- Variant2 (presumed hover) [56:233] -->
<button class="icon-btn is-hover" type="button" aria-label="Filter">
  <i class="icon icon-filter"></i>
</button>
```

Same geometry as refresh. The set has no auto layout (icon at absolute 8,8). Variant2 is unnamed in Figma; its Grey 1 fill matches the refresh hover.

### Icon button: hands

Source: Figma set 56:235 (Default 56:236, Variant2 56:238); Dashboard 16:1989.

```html
<!-- Default [56:236] -->
<button class="icon-btn" type="button" aria-label="Counterparties">
  <i class="icon icon-hands"></i>
</button>

<!-- Variant2 (presumed hover) [56:238] -->
<button class="icon-btn is-hover" type="button" aria-label="Counterparties">
  <i class="icon icon-hands"></i>
</button>
```

Glyph export 20 x 18 (node 18 x 16) centred in the 32 x 32 button.


---

## Forms & inputs

### Select

Source: Figma set 56:123 (label 56:124, no label 56:130); Dashboard 16:1931.

```html
<!-- Property 1 = label (148 x 52) [56:124] -->
<div class="field">
  <span class="field__label">Label</span>
  <div class="select">
    <span class="select__value">Please Select</span><i class="icon icon-chevron-down"></i>
  </div>
</div>

<!-- Property 1 = no label (148 x 32) [56:130] -->
<div class="select">
  <span class="select__value">Please Select</span><i class="icon icon-chevron-down"></i>
</div>

<!-- Dashboard: filled value (`.is-filled`, `.field--dashboard` 188 x 52) [16:1931] -->
<div class="field field--dashboard">
  <span class="field__label">Type</span>
  <div class="select is-filled">
    <span class="select__value">MKT</span><i class="icon icon-chevron-down"></i>
  </div>
</div>

<!-- Open (`.is-open`: chevron turned 180 deg) (EXTENDED) -->
<div class="field">
  <span class="field__label">Label</span>
  <div class="select is-open">
    <span class="select__value">Please Select</span><i class="icon icon-chevron-down"></i>
  </div>
</div>

<!-- Focus (`.is-focus` / `:focus-within`) (EXTENDED) -->
<div class="field">
  <span class="field__label">Label</span>
  <div class="select is-focus">
    <span class="select__value">Please Select</span><i class="icon icon-chevron-down"></i>
  </div>
</div>

<!-- Error (`.is-error`) (EXTENDED) -->
<div class="field">
  <span class="field__label">Label</span>
  <div class="select is-error">
    <span class="select__value">Please Select</span><i class="icon icon-chevron-down"></i>
  </div>
</div>

<!-- Disabled (`.is-disabled`) (EXTENDED) -->
<div class="field">
  <span class="field__label">Label</span>
  <div class="select is-disabled">
    <span class="select__value">Please Select</span><i class="icon icon-chevron-down"></i>
  </div>
</div>
```

Box padding T7 R8 B7 L12, gap 32, SPACE_BETWEEN, HUG x FIXED(32). Placeholder "Please Select" Grey 2 (`.select__value`); a chosen value is Black (`.is-filled`). Label Geist Regular 12 Grey 2, gap 4 above. Toggle `.is-open` in JS (see components.md).

### Input

Source: Figma set 56:145 (label 56:146, no label 56:150); value overrides 16:2131.

```html
<!-- Property 1 = label [56:146] -->
<div class="field">
  <span class="field__label">Label</span>
  <div class="input">
    <input class="input__field" type="text" placeholder="0">
  </div>
</div>

<!-- Property 1 = no label [56:150] -->
<div class="input">
  <input class="input__field" type="text" placeholder="0">
</div>

<!-- Entered value (Black) [16:2131] -->
<div class="input">
  <input class="input__field" type="text" value="0.0001">
</div>

<!-- Focus (`.is-focus` / `:focus-within`) (EXTENDED) -->
<div class="field">
  <span class="field__label">Label</span>
  <div class="input is-focus">
    <input class="input__field" type="text" placeholder="0">
  </div>
</div>

<!-- Error (`.is-error`) (EXTENDED) -->
<div class="field">
  <span class="field__label">Label</span>
  <div class="input is-error">
    <input class="input__field" type="text" placeholder="0">
  </div>
</div>

<!-- Disabled (`.is-disabled`) (EXTENDED) -->
<div class="field">
  <span class="field__label">Label</span>
  <div class="input is-disabled">
    <input class="input__field" type="text" placeholder="0" disabled>
  </div>
</div>
```

Padding T7 R12 B7 L12, gap 0, primary MIN. The Figma "0" is the placeholder look (Grey 2); entered values are Black (Dashboard override). A native `<input class="input__field">` sits inside the box, so `:focus-within` drives the focus ring.

### Input with 2 text

Source: Figma set 56:135 (label 56:136, no label 56:141); Dashboard 16:1916, 16:1930.

```html
<!-- Property 1 = label [56:136] -->
<div class="field">
  <span class="field__label">Label</span>
  <div class="input-2text">
    <input class="input__field" type="text" placeholder="0"><span class="input__unit">abc</span>
  </div>
</div>

<!-- Property 1 = no label [56:141] -->
<div class="input-2text">
  <input class="input__field" type="text" placeholder="0"><span class="input__unit">abc</span>
</div>

<!-- Dashboard: Quantity (value Black, unit Grey 3) [16:1916] -->
<div class="field field--dashboard">
  <span class="field__label">Quantity</span>
  <div class="input-2text">
    <input class="input__field" type="text" value="1"><span class="input__unit">BTC</span>
  </div>
</div>

<!-- Dashboard: Slippage (value dimmed Grey 2, `.is-dim`) [16:1930] -->
<div class="field field--dashboard">
  <span class="field__label">Slippage</span>
  <div class="input-2text">
    <input class="input__field is-dim" type="text" value="2"><span class="input__unit">bps</span>
  </div>
</div>

<!-- Focus (`.is-focus` / `:focus-within`) (EXTENDED) -->
<div class="field">
  <span class="field__label">Label</span>
  <div class="input-2text is-focus">
    <input class="input__field" type="text" placeholder="0"><span class="input__unit">abc</span>
  </div>
</div>

<!-- Error (`.is-error`) (EXTENDED) -->
<div class="field">
  <span class="field__label">Label</span>
  <div class="input-2text is-error">
    <input class="input__field" type="text" placeholder="0"><span class="input__unit">abc</span>
  </div>
</div>

<!-- Disabled (`.is-disabled`) (EXTENDED) -->
<div class="field">
  <span class="field__label">Label</span>
  <div class="input-2text is-disabled">
    <input class="input__field" type="text" placeholder="0" disabled><span class="input__unit">abc</span>
  </div>
</div>
```

Padding 7/12, gap 32, SPACE_BETWEEN. Value Geist Regular 12 (Grey 2 placeholder, Black when entered); unit `.input__unit` Grey 3. The meaning of the dimmed Slippage "2" (placeholder vs disabled) is an open question.

### Search

Source: Figma set 56:153 (label 56:154, no label 56:160); Dashboard 16:1915, 16:2130.

```html
<!-- Property 1 = label [56:154] -->
<div class="field">
  <span class="field__label">Label</span>
  <div class="search">
    <i class="icon icon-search"></i><input class="input__field" type="text" placeholder="Search">
  </div>
</div>

<!-- Property 1 = no label [56:160] -->
<div class="search">
  <i class="icon icon-search"></i><input class="input__field" type="text" placeholder="Search">
</div>

<!-- Dashboard: value Black (`.field--dashboard`) [16:1915] -->
<div class="field field--dashboard">
  <span class="field__label">Instrument</span>
  <div class="search">
    <i class="icon icon-search"></i><input class="input__field" type="text" value="BTC-USD">
  </div>
</div>

<!-- RFQ: `.field--rfq-instrument` 132 x 52 [16:2130] -->
<div class="field field--rfq-instrument">
  <span class="field__label">Instrument</span>
  <div class="search">
    <i class="icon icon-search"></i><input class="input__field" type="text" value="BTC-USD">
  </div>
</div>

<!-- Focus (`.is-focus` / `:focus-within`) (EXTENDED) -->
<div class="field">
  <span class="field__label">Label</span>
  <div class="search is-focus">
    <i class="icon icon-search"></i><input class="input__field" type="text" placeholder="Search">
  </div>
</div>

<!-- Error (`.is-error`) (EXTENDED) -->
<div class="field">
  <span class="field__label">Label</span>
  <div class="search is-error">
    <i class="icon icon-search"></i><input class="input__field" type="text" placeholder="Search">
  </div>
</div>

<!-- Disabled (`.is-disabled`) (EXTENDED) -->
<div class="field">
  <span class="field__label">Label</span>
  <div class="search is-disabled">
    <i class="icon icon-search"></i><input class="input__field" type="text" placeholder="Search" disabled>
  </div>
</div>
```

Padding 7/8, gap 8, icon `.icon-search` 16 x 16 (stroke Main color darker, weight 1), text "Search" Grey 2.

### Input with tabs

Source: Figma set 56:214 (1 label 56:215, 2 label 56:218, 2 no label 56:221, 1 no label 56:223); Dashboard 16:2131.

```html
<!-- Property 1 = 1 label (first tab selected) [56:215] -->
<div class="field field--input-tabs">
  <span class="field__label">Label</span>
  <div class="input-tabs">
    <div class="input">
      <input class="input__field" type="text" placeholder="0">
    </div>
    <div class="tabs tabs--sm">
      <button class="tab is-selected" type="button">Option</button>
      <button class="tab" type="button">Option</button>
    </div>
  </div>
</div>

<!-- Property 1 = 2 label (second tab selected) [56:218] -->
<div class="field field--input-tabs">
  <span class="field__label">Label</span>
  <div class="input-tabs">
    <div class="input">
      <input class="input__field" type="text" placeholder="0">
    </div>
    <div class="tabs tabs--sm">
      <button class="tab" type="button">Option</button>
      <button class="tab is-selected" type="button">Option</button>
    </div>
  </div>
</div>

<!-- Property 1 = 1 no label [56:223] -->
<div class="input-tabs">
  <div class="input">
    <input class="input__field" type="text" placeholder="0">
  </div>
  <div class="tabs tabs--sm">
    <button class="tab is-selected" type="button">Option</button>
    <button class="tab" type="button">Option</button>
  </div>
</div>

<!-- Property 1 = 2 no label [56:221] -->
<div class="input-tabs">
  <div class="input">
    <input class="input__field" type="text" placeholder="0">
  </div>
  <div class="tabs tabs--sm">
    <button class="tab" type="button">Option</button>
    <button class="tab is-selected" type="button">Option</button>
  </div>
</div>

<!-- Dashboard: selected BTC tab Orange (`.tab--warning`) [16:2131] -->
<div class="field field--input-tabs">
  <span class="field__label">Quantity</span>
  <div class="input-tabs">
    <div class="input">
      <input class="input__field" type="text" value="0.0001">
    </div>
    <div class="tabs tabs--sm">
      <button class="tab tab--warning is-selected" type="button">BTC</button>
      <button class="tab" type="button">USD</button>
    </div>
  </div>
</div>
```

Markup: `.input-tabs` > `.input` + `.tabs.tabs--sm` (tabs absolutely placed flush right). Tabs: padding 7/8, selected Geist Medium 12 Black on Main color (54 wide), unselected Geist Regular 12 Grey 3 (53 wide). The Orange selected fill appears only on the Dashboard BTC tab.


---

## Selection controls

### Checkbox

Source: Figma set 56:165 (selected 56:166, not selected 56:170, all 56:176, disabled 56:184, disabled 2 56:173, disabled all 56:180).

```html
<!-- selected [56:166] -->
<label class="checkbox">
  <input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Selected</span>
</label>

<!-- not selected [56:170] -->
<label class="checkbox">
  <input class="checkbox__input" type="checkbox"><span class="checkbox__box"></span><span class="checkbox__label">Not Selected</span>
</label>

<!-- all (indeterminate, `.is-indeterminate`) [56:176] -->
<label class="checkbox is-indeterminate">
  <input class="checkbox__input" type="checkbox"><span class="checkbox__box"></span><span class="checkbox__label">All</span>
</label>

<!-- disabled (checked) [56:184] -->
<label class="checkbox">
  <input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Selected</span>
</label>

<!-- disabled 2 (unchecked) [56:173] -->
<label class="checkbox">
  <input class="checkbox__input" type="checkbox" disabled><span class="checkbox__box"></span><span class="checkbox__label">Not Selected</span>
</label>

<!-- disabled all [56:180] -->
<label class="checkbox is-indeterminate is-disabled">
  <input class="checkbox__input" type="checkbox" disabled><span class="checkbox__box"></span><span class="checkbox__label">All</span>
</label>

<!-- Hover, unchecked (`.is-hover`) (EXTENDED) -->
<label class="checkbox is-hover">
  <input class="checkbox__input" type="checkbox"><span class="checkbox__box"></span><span class="checkbox__label">Not Selected</span>
</label>

<!-- Hover, checked (EXTENDED) -->
<label class="checkbox is-hover is-checked">
  <input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Selected</span>
</label>

<!-- Focus (`.is-focus` / `:focus-visible`) (EXTENDED) -->
<label class="checkbox is-focus">
  <input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Selected</span>
</label>
```

A real `<input type="checkbox">` is hidden inside the label; `:checked`, `:indeterminate` and `:disabled` drive the look, with forced classes `.is-checked / .is-indeterminate / .is-disabled` for display. Selected = fill Main color + Black 1.5 check (`assets/icon-check`); all = dash (`assets/icon-minus`); not selected = Grey 2 1px INSIDE stroke; disabled = Grey 3 box / label with a Grey 0 glyph. The "all" state needs `input.indeterminate = true` in script. The Checkbox is not used on the Dashboard.

### SELL / BUY tabs (tabs variant 2, Dashboard)

Source: Figma Dashboard instance 16:2127 (tabs set 56:203, Property 1 = 2).

```html
<!-- BUY selected (as drawn) [16:2127] -->
<div class="tabs tabs--track" style="width:392px">
  <button class="tab tab--sell" type="button">SELL</button>
  <button class="tab tab--buy is-selected" type="button">BUY</button>
</div>

<!-- SELL selected (EXTENDED) -->
<div class="tabs tabs--track" style="width:392px">
  <button class="tab tab--sell is-selected" type="button">SELL</button>
  <button class="tab tab--buy" type="button">BUY</button>
</div>
```

Container fill Grey 0 (added on the Dashboard; the component has none), tabs FILL / FILL (196 each), labels typed uppercase, selected BUY fill green `#8BEEC8` (not Main color), Geist Medium 14 Black; unselected Geist Regular 14 Grey 3. Width 392 = panel inner width (440 - 2 x 24); the inline width is only needed outside a panel.

### tabs

Source: Figma set 56:203 (Property 1 = 1: 56:204, = 2: 56:209).

```html
<!-- Property 1 = 1 (first selected) [56:204] -->
<div class="tabs">
  <button class="tab is-selected" type="button">Option</button>
  <button class="tab" type="button">Option</button>
</div>

<!-- Property 1 = 2 (second selected) [56:209] -->
<div class="tabs">
  <button class="tab" type="button">Option</button>
  <button class="tab is-selected" type="button">Option</button>
</div>

<!-- Selected, hover (EXTENDED) -->
<div class="tabs">
  <button class="tab is-selected is-hover" type="button">Option</button>
  <button class="tab" type="button">Option</button>
</div>

<!-- Unselected, hover (EXTENDED) -->
<div class="tabs">
  <button class="tab is-selected" type="button">Option</button>
  <button class="tab is-hover" type="button">Option</button>
</div>

<!-- Focus (EXTENDED) -->
<div class="tabs">
  <button class="tab is-selected is-focus" type="button">Option</button>
  <button class="tab" type="button">Option</button>
</div>

<!-- Disabled (EXTENDED) -->
<div class="tabs">
  <button class="tab is-selected" type="button" disabled>Option</button>
  <button class="tab" type="button" disabled>Option</button>
</div>
```

HUG x FIXED(40), gap 0, radius 4, no fill; each tab padding 7/24, selected = fill Main color + Geist Medium 14 Black (93 wide), unselected = no fill + Geist Regular 14 Grey 3 (91 wide). Selection is `.is-selected` or `aria-selected="true"`.

### tabs (small, inside input with tabs)

Source: Figma input with tabs 56:214 (tabs frame 107 x 32); Dashboard 16:2131.

```html
<!-- `.tabs--sm`, first selected (54 + 53 wide) [56:215] -->
<div class="tabs tabs--sm">
  <button class="tab is-selected" type="button">Option</button>
  <button class="tab" type="button">Option</button>
</div>

<!-- second selected [56:218] -->
<div class="tabs tabs--sm">
  <button class="tab" type="button">Option</button>
  <button class="tab is-selected" type="button">Option</button>
</div>

<!-- Dashboard: selected BTC Orange (`.tab--warning`) [16:2131] -->
<div class="tabs tabs--sm">
  <button class="tab tab--warning is-selected" type="button">BTC</button>
  <button class="tab" type="button">USD</button>
</div>
```

HUG x FIXED(32); tab padding 7/8, labels 12px. Orange `#FFB051` only on the selected BTC tab in the RFQ quantity field.


---

## Indicators

### Order-type chip

Source: Figma frames Limit 16:2010 (text 16:2011), Market 16:2025 (text 16:2026); cell wrapper 16:2009.

```html
<!-- Limit (76 x 24 in Figma) [16:2010] -->
<span class="chip chip--limit">Limit</span>

<!-- Market (88 x 24 in Figma) [16:2025] -->
<span class="chip chip--market">Market</span>

<!-- In the blotter cell wrapper (`.col--chip` 117 x 16; the chip overflows 4px top and bottom) [16:2009] -->
<span class="col col--chip"><span class="chip chip--limit">Limit</span></span>
```

Limit: fill `#E4CAFF`, text `#9236F2`. Market: fill `#CADCFF`, text `#3A77F2`. Padding 0/24, gap 10, label Geist Medium 12. Other order types are not drawn. Rendered widths 75.72 / 87.81 (Geist text hug 27.72 / 39.81 versus Figma's rounded 28 / 40).

### Status dot

Source: Figma Vector 16:2005 (success), 16:2020 (danger).

```html
<!-- Success (green for text) [16:2005] -->
<i class="status-dot status-dot--success"></i>

<!-- Danger (Red for text) [16:2020] -->
<i class="status-dot status-dot--danger"></i>
```

Mask of `assets/status-dot.currentColor.svg`, 6.67 x 6.67 (renders 6.65625 after browser layout snap). Odd blotter rows show green (Limit / SELL sample), even rows red (Market / BUY); the colour meaning is a visual estimate.

### Coin

Source: Figma XTVCBTC.svg frames: ETH 16:2173, BTC 16:2159, USDT 16:2195, SOL 16:2223, SHIB 16:2240, ADA 16:2260, AVAX 16:2274, XLM 16:2288.

```html
<!-- BTC [16:2159] -->
<img class="coin coin--btc" src="assets/coin-btc.svg" alt="BTC">

<!-- ETH [16:2173] -->
<img class="coin coin--eth" src="assets/coin-eth.svg" alt="ETH">

<!-- USDT [16:2195] -->
<img class="coin coin--usdt" src="assets/coin-usdt.svg" alt="USDT">

<!-- SOL [16:2223] -->
<img class="coin coin--sol" src="assets/coin-sol.svg" alt="SOL">

<!-- SHIB [16:2240] -->
<img class="coin coin--shib" src="assets/coin-shib.svg" alt="SHIB">

<!-- ADA [16:2260] -->
<img class="coin coin--ada" src="assets/coin-ada.svg" alt="ADA">

<!-- AVAX [16:2274] -->
<img class="coin coin--avax" src="assets/coin-avax.svg" alt="AVAX">

<!-- XLM [16:2288] -->
<img class="coin coin--xlm" src="assets/coin-xlm.svg" alt="XLM">
```

`<img class="coin coin--btc" src="assets/coin-btc.svg" alt="BTC">`; radius 16 (circle). All coin frames are named XTVCBTC.svg in Figma (import artefact); identify by ticker text. No MATIC / XRP / USDC art exists.

### BID / ASK price tile

Source: Figma Buttons BID 16:1920 (digits 16:1921, 16:1922), ASK 16:1923 (16:1924, 16:1925).

```html
<!-- BID / SELL: Red `#FB9697`, left aligned [16:1920] -->
<div class="price-tile price-tile--bid">
  <span class="price-tile__big">61,349</span><span class="price-tile__dec">.29000000</span>
</div>

<!-- ASK / BUY: green `#8BEEC8`, right aligned [16:1923] -->
<div class="price-tile price-tile--ask">
  <span class="price-tile__big">61,447</span><span class="price-tile__dec">.52000000</span>
</div>
```

Padding 12, gap 4, no stroke / shadow. Digits Geist Mono Regular 32 (42 box) + decimals Geist Mono Regular 14, UPPER via text-transform, Black. The pastel fills are for tiles; the saturated `... for text` pair is for text and dots.

### Environment pill, Exposure pill, avatar

Source: Figma UAT 16:2389, Exposure 16:2392, clock block 16:2396, avatar 16:2402.

```html
<!-- Environment pill (220 x 40, Main color transp; non-interactive) [16:2389] -->
<div class="pill-env">
  UAT
</div>

<!-- Exposure pill (255 x 40, green for text 20% + 1px stroke) [16:2392] -->
<div class="pill-exposure">
  <span class="pill-exposure__label">Exposure</span><span class="pill-exposure__value">$5,000,000</span>
</div>

<!-- Clock block (216 x 40, right divider) [16:2396] -->
<div class="clock">
  <span class="clock__date">Thu, 23 July 2026</span>
  <div class="clock__row">
    <span class="clock__time">13:30:29 (UTC +00:00)</span><span class="clock__version">v1.0.2</span>
  </div>
</div>

<!-- Avatar (40 x 40, radius 24, initials letter-spacing 2px) [16:2402] -->
<div class="avatar">
  YH
</div>
```

UAT label Geist Medium 16; Exposure label Geist Regular 14 Grey 3 + value Geist SemiBold 14 Black (Geist, not Mono). No user menu, chevron or avatar icon is drawn.


---

## Feedback

### Toast (EXTENDED)

Source: Not in Figma (EXTENDED). Built from panel 16:1911 + status dots 16:2005 / 16:2020. Toast is not in Figma: panel surface (White, r8) with a 1px Grey 1 inset hairline (no shadows), status dot, Geist Medium 12 message.

```html
<!-- Success -->
<div class="toast toast--success">
  <i class="status-dot"></i><span class="toast__message">Order filled: BUY 1.00 BTC-USD</span>
</div>

<!-- Danger -->
<div class="toast toast--danger">
  <i class="status-dot"></i><span class="toast__message">Order rejected</span>
</div>
```

Padding 12 / 16, gap 8, min-width 240. `.toast-stack` (position: fixed, bottom-right 24, z-index `--z-toast`) stacks toasts with gap 8; the stack is shown here without it. Message copy is illustrative. No timing or animation is defined.

### Skeleton rows (EXTENDED)

Source: Not in Figma (EXTENDED). Built from the order-book table 16:1932 + surface.hover. Loading state is not in Figma: bars of surface.hover (Grey 1), radius 4, 16 high (the text line box), optional 1.2s opacity pulse.

```html
<!-- Static bars -->
<div class="data-table data-table--book">
  <div class="data-table__head">
    <span class="data-table__th align-left">BID</span><span class="data-table__th align-center">Qty</span><span class="data-table__th align-right">ASK</span>
  </div>
  <div class="data-table__body">
    <div class="data-table__row">
      <span class="skeleton" style="width:76px"></span><span class="skeleton" style="width:24px"></span><span class="skeleton" style="width:76px"></span>
    </div>
    <div class="data-table__row">
      <span class="skeleton" style="width:76px"></span><span class="skeleton" style="width:24px"></span><span class="skeleton" style="width:76px"></span>
    </div>
    <div class="data-table__row">
      <span class="skeleton" style="width:76px"></span><span class="skeleton" style="width:24px"></span><span class="skeleton" style="width:76px"></span>
    </div>
    <div class="data-table__row">
      <span class="skeleton" style="width:76px"></span><span class="skeleton" style="width:24px"></span><span class="skeleton" style="width:76px"></span>
    </div>
  </div>
</div>

<!-- Pulsing bars (`.skeleton--pulse`) -->
<div class="data-table data-table--book">
  <div class="data-table__head">
    <span class="data-table__th align-left">Asset</span><span class="data-table__th align-right">Quantity</span>
  </div>
  <div class="data-table__body">
    <div class="data-table__row">
      <span class="skeleton skeleton--pulse" style="width:40px"></span><span class="skeleton skeleton--pulse" style="width:96px"></span>
    </div>
    <div class="data-table__row">
      <span class="skeleton skeleton--pulse" style="width:40px"></span><span class="skeleton skeleton--pulse" style="width:96px"></span>
    </div>
    <div class="data-table__row">
      <span class="skeleton skeleton--pulse" style="width:40px"></span><span class="skeleton skeleton--pulse" style="width:96px"></span>
    </div>
  </div>
</div>
```

`.skeleton` has no width of its own; set the width per bar. The pulse is local (1.2s ease-in-out, opacity 1 to 0.5) and is disabled for `prefers-reduced-motion`.

### Empty table (EXTENDED)

Source: Not in Figma (EXTENDED). Container sizes from tables 16:1932 (202 high) and 16:1990 (352 high). No empty state in Figma: the table container keeps its drawn size with a centred Geist Regular 14 Grey 2 message (also the "Balance movement" tab content).

```html
<!-- Order-book / balances size (392 x 202) -->
<div class="data-table data-table--book data-table--empty">
  <span class="table-empty">No data to display</span>
</div>

<!-- Blotter size (1360 x 352) -->
<div class="data-table data-table--blotter data-table--empty">
  <span class="table-empty">No data to display</span>
</div>
```

Add `.data-table--empty` to a table container and put a `.table-empty` message inside. Copy is illustrative.

### Tooltip (EXTENDED)

Source: Not in Figma (EXTENDED). Built from Button black 56:198. No tooltip in Figma: the Button black recipe (Black fill, Main color Geist Medium 12 label), radius 4, padding 4/8, no shadow.

```html
<!-- Tooltip -->
<span class="tooltip">Refresh</span>
```

Static box only: positioning and show / hide behaviour are left to the application.


---

## Overlays

### Open Select menu (EXTENDED)

Source: Not in Figma (EXTENDED). Built from Select 56:123 + panel 16:1911. Select open state / dropdown list is not in Figma: panel surface (White) with a 1px Grey 1 inset hairline, radius 4, padding 4, items 32 high (field metrics); hover = Grey 0, selected = Main color transp + Geist Medium 12.

```html
<!-- Absolute list under the box (`.select-wrap` + `.menu`) -->
<div class="select-wrap" style="min-height:184px">
  <div class="select is-open">
    <span class="select__value">MKT</span><i class="icon icon-chevron-down"></i>
  </div>
  <div class="menu" role="listbox">
    <div class="menu__item is-selected" role="option" aria-selected="true">
      MKT
    </div>
    <div class="menu__item is-hover" role="option">
      FOK
    </div>
    <div class="menu__item" role="option">
      GTC
    </div>
    <div class="menu__item is-disabled" role="option" aria-disabled="true">
      IOC
    </div>
  </div>
</div>

<!-- In-flow list (`.menu--static`) -->
<div class="menu menu--static" role="listbox">
  <div class="menu__item is-selected" role="option">
    MKT
  </div>
  <div class="menu__item" role="option">
    FOK
  </div>
</div>
```

Open / close in JS: toggle `.is-open` on the `.select` and the `hidden` attribute on the `.menu` (components.md). Option labels are illustrative (the Dashboard Select only shows "MKT"; Time In Force shows GTC / FOK).

### Modal (EXTENDED)

Source: Not in Figma (EXTENDED). Built from panel 16:1911, Button 56:193, Button Outline 56:188. No modal in Figma: the panel recipe (White, r8, padding 16/24/24/24, gap 16, 440 wide) on a Black 0.20 scrim, title = panel title (Geist Regular 20 UPPER), actions = Button Outline + Button.

```html
<!-- Dialog card -->
<div class="modal" role="dialog" aria-labelledby="m1">
  <h3 class="modal__title" id="m1">Cancel order</h3>
  <p class="modal__body">Cancel order UAT-ORD-000... on BTC-USD?</p>
  <div class="modal__actions">
    <button class="btn-outline" type="button">Keep</button>
    <button class="btn" type="button">Cancel order</button>
  </div>
</div>
```

Wrap the card in `<div class="modal-backdrop">` (position: fixed, inset 0, scrim Black at 0.20, z-index `--z-scrim`; the card uses `--z-modal`). The backdrop is not shown here because it covers the viewport. Copy is illustrative.

### Order confirmation (EXTENDED)

Source: Not in Figma (EXTENDED). Built from the data table 16:1932 + modal. No RFQ quote / confirmation screen in Figma: summary list in the data-table recipe (container Grey 0 + 1px outside hairline, r8, zebra rows 32 high) inside .modal.

```html
<!-- BUY summary (`.summary__value--buy`) -->
<div class="modal" role="dialog" aria-labelledby="m2">
  <h3 class="modal__title" id="m2">Confirm RFQ</h3>
  <div class="summary">
    <div class="summary__row">
      <span class="summary__label">Instrument</span><span class="summary__value">BTC-USD</span>
    </div>
    <div class="summary__row">
      <span class="summary__label">Side</span><span class="summary__value summary__value--buy">BUY</span>
    </div>
    <div class="summary__row">
      <span class="summary__label">Quantity</span><span class="summary__value">0.0001 BTC</span>
    </div>
    <div class="summary__row">
      <span class="summary__label">Price</span><span class="summary__value">61,447.52</span>
    </div>
  </div>
  <div class="modal__actions">
    <button class="btn-outline" type="button">Cancel</button>
    <button class="btn" type="button">Confirm</button>
  </div>
</div>

<!-- SELL summary (`.summary__value--sell`) -->
<div class="modal" role="dialog" aria-labelledby="m3">
  <h3 class="modal__title" id="m3">Confirm RFQ</h3>
  <div class="summary">
    <div class="summary__row">
      <span class="summary__label">Instrument</span><span class="summary__value">BTC-USD</span>
    </div>
    <div class="summary__row">
      <span class="summary__label">Side</span><span class="summary__value summary__value--sell">SELL</span>
    </div>
    <div class="summary__row">
      <span class="summary__label">Quantity</span><span class="summary__value">0.0001 BTC</span>
    </div>
  </div>
  <div class="modal__actions">
    <button class="btn-outline" type="button">Cancel</button>
    <button class="btn" type="button">Confirm</button>
  </div>
</div>
```

Compose: `.modal` > `.modal__title` + `.summary` (rows `.summary__row` with `__label` / `__value`) + `.modal__actions`. Figures are illustrative (price from the order book sample).


---

## Navigation

### Floating nav bar

Source: Figma 16:2386 (logo 16:2387 / 16:2388, UAT 16:2389, right cluster 16:2391, Exposure 16:2392, clock 16:2396, avatar 16:2402).

```html
<!-- Light (follows the page theme) [16:2386] -->
<header class="nav">
  <div class="nav__logo">
    <div class="logo-enigma" role="img" aria-label="Enigma X">
    </div>
  </div>
  <div class="pill-env">
    UAT
  </div>
  <div class="nav__right">
    <div class="pill-exposure">
      <span class="pill-exposure__label">Exposure</span><span class="pill-exposure__value">$5,000,000</span>
    </div>
    <div class="nav__user">
      <div class="clock">
        <span class="clock__date">Thu, 23 July 2026</span>
        <div class="clock__row">
          <span class="clock__time">13:30:29 (UTC +00:00)</span><span class="clock__version">v1.0.2</span>
        </div>
      </div>
      <div class="avatar">
        YH
      </div>
    </div>
  </div>
</header>
```

H SPACE_BETWEEN, padding 16/24 (the stored itemSpacing 271 is stale; the real free-space gap is 274: UAT pill at x 826, right cluster at x 1320). Logo frame 528 x 40 clips the 163 x 40 mark + wordmark, drawn as a themable mask (`.logo-enigma`). No nav items, tabs, notifications or logout are drawn. In the dark theme (Extended) the bar gets a bottom hairline (border.nav). The capture's full-bleed header (`.nav--alt-fullbleed`) is shown under Screens / Dashboard alternates.

### Blotter tabs

Source: Figma 16:1983 (active 19:126 214 x 38, inactive 19:127 255 x 38; titles 16:1984, 16:1985).

```html
<!-- As drawn: first active [19:126 / 19:127] -->
<div class="blotter-tabs" role="tablist">
  <button class="blotter-tab is-active" type="button" role="tab" aria-selected="true">trades blotter</button>
  <button class="blotter-tab" type="button" role="tab" aria-selected="false">BALANCE MOVEMENT</button>
</div>

<!-- Hover (inactive tab label turns Black) (EXTENDED) -->
<div class="blotter-tabs" role="tablist">
  <button class="blotter-tab is-active is-hover" type="button" role="tab">trades blotter</button>
  <button class="blotter-tab is-hover" type="button" role="tab">BALANCE MOVEMENT</button>
</div>

<!-- Focus (EXTENDED) -->
<div class="blotter-tabs" role="tablist">
  <button class="blotter-tab is-active" type="button" role="tab">trades blotter</button>
  <button class="blotter-tab is-focus" type="button" role="tab">BALANCE MOVEMENT</button>
</div>

<!-- Disabled (EXTENDED) -->
<div class="blotter-tabs" role="tablist">
  <button class="blotter-tab is-active" type="button" role="tab">trades blotter</button>
  <button class="blotter-tab" type="button" role="tab" disabled>BALANCE MOVEMENT</button>
</div>
```

Padding T0 R24 B12 L24, label Geist Regular 20 UPPER (text-transform on the stored mixed-case "trades blotter"); active = Black label + 1.5px Black bottom stroke INSIDE; inactive = Grey 3 label, no stroke. The "BALANCE MOVEMENT" tab content is not drawn (see the Extended empty table).


---

## Data display

### Order book table

Source: Figma 16:1932 (header 16:1933, rows 16:1938, 16:1942, 16:1946, 16:1950).

```html
<!-- As drawn [16:1932] -->
<div class="data-table data-table--book">
  <div class="data-table__head">
    <span class="data-table__th align-left">BID</span><span class="data-table__th align-center">Qty</span><span class="data-table__th align-right">ASK</span>
  </div>
  <div class="data-table__body">
    <div class="data-table__row">
      <span class="data-table__td book__bid">61,349.29</span><span class="data-table__td book__qty">1</span><span class="data-table__td book__ask">61,447.52</span>
    </div>
    <div class="data-table__row">
      <span class="data-table__td book__bid">61,319.82</span><span class="data-table__td book__qty">10</span><span class="data-table__td book__ask">61,477<span class="dim">.00</span></span>
    </div>
    <div class="data-table__row">
      <span class="data-table__td book__bid">61,290.34</span><span class="data-table__td book__qty">100</span><span class="data-table__td book__ask">61,506.47</span>
    </div>
    <div class="data-table__row">
      <span class="data-table__td book__bid">61,260.87</span><span class="data-table__td book__qty">1000</span><span class="data-table__td book__ask">61,535.94</span>
    </div>
  </div>
</div>
```

Header 34 high (padding 8/24, Geist Regular 14 Grey 2, ls 0px): BID left / Qty centre / ASK right, each FILL. Rows 42 high (padding 12/24, SPACE_BETWEEN), zebra: odd White, even = container Grey 0. Bid price Geist Mono Medium 14 Red for text (right aligned, 76 wide); qty Geist Mono Regular 14 Black centred; ask price Geist Mono Medium 14 green for text. Trailing zeros dimmed: `61,477<span class="dim">.00</span>`. No depth bars, flash or scrollbar.

**Alternate: Capture hairline rows instead of zebra (`.data-table--alt-hairlines`)** (live-app capture 1:3)

```html
<!-- Rows on the panel colour with a 1px row-bottom hairline -->
<div class="data-table data-table--book data-table--alt-hairlines">
  <div class="data-table__head">
    <span class="data-table__th align-left">BID</span><span class="data-table__th align-center">Qty</span><span class="data-table__th align-right">ASK</span>
  </div>
  <div class="data-table__body">
    <div class="data-table__row">
      <span class="data-table__td book__bid">61,349.29</span><span class="data-table__td book__qty">1</span><span class="data-table__td book__ask">61,447.52</span>
    </div>
    <div class="data-table__row">
      <span class="data-table__td book__bid">61,319.82</span><span class="data-table__td book__qty">10</span><span class="data-table__td book__ask">61,477<span class="dim">.00</span></span>
    </div>
    <div class="data-table__row">
      <span class="data-table__td book__bid">61,290.34</span><span class="data-table__td book__qty">100</span><span class="data-table__td book__ask">61,506.47</span>
    </div>
    <div class="data-table__row">
      <span class="data-table__td book__bid">61,260.87</span><span class="data-table__td book__qty">1000</span><span class="data-table__td book__ask">61,535.94</span>
    </div>
  </div>
</div>
```

### Balances table

Source: Figma 16:1958 (header 16:1959, rows 16:1963, 16:1966, 16:1969, 16:1972, 16:1975).

```html
<!-- As drawn (5 rows) [16:1958] -->
<div class="data-table data-table--book">
  <div class="data-table__head">
    <span class="data-table__th align-left">Asset</span><span class="data-table__th align-right">Quantity</span>
  </div>
  <div class="data-table__body">
    <div class="data-table__row">
      <span class="data-table__td balance__asset">USD</span><span class="data-table__td balance__qty balance__qty--positive">2,500,000.00</span>
    </div>
    <div class="data-table__row">
      <span class="data-table__td balance__asset">EUR</span><span class="data-table__td balance__qty balance__qty--positive">1,800,000.00</span>
    </div>
    <div class="data-table__row">
      <span class="data-table__td balance__asset">BTC</span><span class="data-table__td balance__qty balance__qty--negative">-12.50</span>
    </div>
    <div class="data-table__row">
      <span class="data-table__td balance__asset">ETH</span><span class="data-table__td balance__qty balance__qty--negative">-240.00</span>
    </div>
    <div class="data-table__row">
      <span class="data-table__td balance__asset">SOL</span><span class="data-table__td balance__qty balance__qty--positive">5,000.00</span>
    </div>
  </div>
</div>
```

Same container / row recipe as the order book. Asset Geist Medium 14 Black (left), quantity Geist Mono Medium 14 coloured by sign (right aligned); positives carry no + sign, negatives use an ASCII "-". Header: Asset left, Quantity right.

### Trades blotter table

Source: Figma 16:1990 (header 16:1991, rows 16:2004, 16:2019, 16:2034, 16:2049, 16:2064, 16:2079, 16:2094, 16:2109).

```html
<!-- As drawn (8 rows) [16:1990] -->
<div class="data-table data-table--blotter">
  <div class="data-table__head">
    <span class="col col--dot"></span><span class="col col--140">Id</span><span class="col col--140">Order Id</span><span class="col">Instrument</span><span class="col">Order Type</span><span class="col">Time In Force</span><span class="col">Side</span><span class="col">Quantity</span><span class="col">Executed Price</span><span class="col">User</span><span class="col">Channel</span><span class="col col--140">Executed At</span>
  </div>
  <div class="data-table__body">
    <div class="data-table__row">
      <span class="col col--dot"><i class="status-dot status-dot--success"></i></span><span class="col col--140">UAT-TRD-000...</span><span class="col col--140">UAT-ORD-000...</span><span class="col">BTC-USD</span><span class="col col--chip"><span class="chip chip--limit">Limit</span></span><span class="col">GTC</span><span class="col"><span class="t-side-sell">SELL</span></span><span class="col">1.<span class="t-blotter-dim">00</span></span><span class="col">60,943.75</span><span class="col">uat_trader_1</span><span class="col">UAT</span><span class="col col--140 blotter__executed"><span class="date-part">2026/07/22</span> <span class="time-part">13:44:30*</span></span>
    </div>
    <div class="data-table__row">
      <span class="col col--dot"><i class="status-dot status-dot--danger"></i></span><span class="col col--140">UAT-TRD-000...</span><span class="col col--140">UAT-ORD-000...</span><span class="col">BTC-USD</span><span class="col col--chip"><span class="chip chip--market">Market</span></span><span class="col">FOK</span><span class="col"><span class="t-side-buy">BUY</span></span><span class="col">2.<span class="t-blotter-dim">00</span></span><span class="col">60,943.75</span><span class="col">uat_trader_1</span><span class="col">UAT</span><span class="col col--140 blotter__executed"><span class="date-part">2026/07/22</span> <span class="time-part">13:44:31*</span></span>
    </div>
    <div class="data-table__row">
      <span class="col col--dot"><i class="status-dot status-dot--success"></i></span><span class="col col--140">UAT-TRD-000...</span><span class="col col--140">UAT-ORD-000...</span><span class="col">BTC-USD</span><span class="col col--chip"><span class="chip chip--limit">Limit</span></span><span class="col">GTC</span><span class="col"><span class="t-side-sell">SELL</span></span><span class="col">1.<span class="t-blotter-dim">00</span></span><span class="col">60,943.75</span><span class="col">uat_trader_1</span><span class="col">UAT</span><span class="col col--140 blotter__executed"><span class="date-part">2026/07/22</span> <span class="time-part">13:44:32*</span></span>
    </div>
    <div class="data-table__row">
      <span class="col col--dot"><i class="status-dot status-dot--danger"></i></span><span class="col col--140">UAT-TRD-000...</span><span class="col col--140">UAT-ORD-000...</span><span class="col">BTC-USD</span><span class="col col--chip"><span class="chip chip--market">Market</span></span><span class="col">FOK</span><span class="col"><span class="t-side-buy">BUY</span></span><span class="col">2.<span class="t-blotter-dim">00</span></span><span class="col">60,943.75</span><span class="col">uat_trader_1</span><span class="col">UAT</span><span class="col col--140 blotter__executed"><span class="date-part">2026/07/22</span> <span class="time-part">13:44:33*</span></span>
    </div>
    <div class="data-table__row">
      <span class="col col--dot"><i class="status-dot status-dot--success"></i></span><span class="col col--140">UAT-TRD-000...</span><span class="col col--140">UAT-ORD-000...</span><span class="col">BTC-USD</span><span class="col col--chip"><span class="chip chip--limit">Limit</span></span><span class="col">GTC</span><span class="col"><span class="t-side-sell">SELL</span></span><span class="col">1.<span class="t-blotter-dim">00</span></span><span class="col">60,943.75</span><span class="col">uat_trader_1</span><span class="col">UAT</span><span class="col col--140 blotter__executed"><span class="date-part">2026/07/22</span> <span class="time-part">13:44:34*</span></span>
    </div>
    <div class="data-table__row">
      <span class="col col--dot"><i class="status-dot status-dot--danger"></i></span><span class="col col--140">UAT-TRD-000...</span><span class="col col--140">UAT-ORD-000...</span><span class="col">BTC-USD</span><span class="col col--chip"><span class="chip chip--market">Market</span></span><span class="col">FOK</span><span class="col"><span class="t-side-buy">BUY</span></span><span class="col">2.<span class="t-blotter-dim">00</span></span><span class="col">60,943.75</span><span class="col">uat_trader_1</span><span class="col">UAT</span><span class="col col--140 blotter__executed"><span class="date-part">2026/07/22</span> <span class="time-part">13:44:35*</span></span>
    </div>
    <div class="data-table__row">
      <span class="col col--dot"><i class="status-dot status-dot--success"></i></span><span class="col col--140">UAT-TRD-000...</span><span class="col col--140">UAT-ORD-000...</span><span class="col">BTC-USD</span><span class="col col--chip"><span class="chip chip--limit">Limit</span></span><span class="col">GTC</span><span class="col"><span class="t-side-sell">SELL</span></span><span class="col">1.<span class="t-blotter-dim">00</span></span><span class="col">60,943.75</span><span class="col">uat_trader_1</span><span class="col">UAT</span><span class="col col--140 blotter__executed"><span class="date-part">2026/07/22</span> <span class="time-part">13:44:36*</span></span>
    </div>
    <div class="data-table__row">
      <span class="col col--dot"><i class="status-dot status-dot--danger"></i></span><span class="col col--140">UAT-TRD-000...</span><span class="col col--140">UAT-ORD-000...</span><span class="col">BTC-USD</span><span class="col col--chip"><span class="chip chip--market">Market</span></span><span class="col">FOK</span><span class="col"><span class="t-side-buy">BUY</span></span><span class="col">2.<span class="t-blotter-dim">00</span></span><span class="col">60,943.75</span><span class="col">uat_trader_1</span><span class="col">UAT</span><span class="col col--140 blotter__executed"><span class="date-part">2026/07/22</span> <span class="time-part">13:44:37*</span></span>
    </div>
  </div>
</div>
```

Header padding 8/12, Geist Regular 12 Grey 2, ls 0px, centred; the status-dot column keeps an empty 6.67 placeholder (hidden vector 16:1992) and has NO "Status" label. Row cells Geist Medium 12 Black, centred; zebra odd White / even Grey 0 (explicit fill). Columns: dot 6.67 | Id 140 | Order Id 140 | Instrument FILL | Order Type (117 x 16 chip wrapper; header cell FILL, about 0.5px drift as drawn) | Time In Force | Side | Quantity | Executed Price | User | Channel | Executed At 140. Side is coloured text only (no chip); quantity "1." + dimmed "00"; timestamp date Grey 3 + time Grey 2 (the `*` suffix is in the source text). Numerics are proportional Geist here (the order book uses Mono): kept as drawn. Only the first-row values were harvested; Id / Order Id are literally "UAT-TRD-000..." in the source, other row values repeat the sample.

### Table states (EXTENDED)

Source: Not in Figma (EXTENDED). Built on the order-book / balances table recipe. Figma draws no row hover, selected row, sortable header, or sort indicator: hover = surface.hover (Grey 1), selected = brand.transp, sorted header = text.secondary + exported chevron (ascending rotated 180 deg).

```html
<!-- Row hover (`.is-hover`, row 1) and selected row (`.is-selected`, row 3) -->
<div class="data-table data-table--book">
  <div class="data-table__head">
    <span class="data-table__th align-left">BID</span><span class="data-table__th align-center">Qty</span><span class="data-table__th align-right">ASK</span>
  </div>
  <div class="data-table__body">
    <div class="data-table__row is-hover">
      <span class="data-table__td book__bid">61,349.29</span><span class="data-table__td book__qty">1</span><span class="data-table__td book__ask">61,447.52</span>
    </div>
    <div class="data-table__row">
      <span class="data-table__td book__bid">61,319.82</span><span class="data-table__td book__qty">10</span><span class="data-table__td book__ask">61,477.00</span>
    </div>
    <div class="data-table__row is-selected">
      <span class="data-table__td book__bid">61,290.34</span><span class="data-table__td book__qty">100</span><span class="data-table__td book__ask">61,506.47</span>
    </div>
  </div>
</div>

<!-- Sortable headers (`.is-sortable`, `aria-sort` descending / ascending) -->
<div class="data-table data-table--book">
  <div class="data-table__head">
    <span class="data-table__th is-sortable align-left" aria-sort="descending">Asset</span><span class="data-table__th is-sortable align-right" aria-sort="ascending">Quantity</span>
  </div>
  <div class="data-table__body">
    <div class="data-table__row">
      <span class="data-table__td balance__asset">USD</span><span class="data-table__td balance__qty balance__qty--positive">2,500,000.00</span>
    </div>
  </div>
</div>
```

Header rows are never interactive; body rows hover via `:hover` or `.is-hover`. `aria-sort` on a `.data-table__th.is-sortable` drives the chevron (assets/icon-chevron-down).


---

## Platform patterns

### Ticker strip

Source: Figma 16:2133 (strip), 16:2134 (track x=-60, 2040 wide, 15 cells), 16:2135 (cell), 16:2136 (id row).

```html
<!-- As drawn: track at x -60, 15 cells (first one cut off) [16:2133] -->
<div class="ticker">
  <div class="ticker__track">
    <div class="ticker__cell">
      <div class="ticker__id">
        <img class="coin coin--eth" src="assets/coin-eth.svg" alt="ETH"><span class="ticker__symbol">ETH-USD</span>
      </div>
      <div class="ticker__quote">
        <div class="ticker__price">
          1,897.0
        </div>
        <div class="ticker__change ticker__change--negative">
          <span>−36.30</span><span>(−1.88%)</span>
        </div>
      </div>
    </div>
    <div class="ticker__cell">
      <div class="ticker__id">
        <img class="coin coin--btc" src="assets/coin-btc.svg" alt="BTC"><span class="ticker__symbol">BTC-USD</span>
      </div>
      <div class="ticker__quote">
        <div class="ticker__price">
          64,988
        </div>
        <div class="ticker__change ticker__change--negative">
          <span>−1,095.00</span><span>(−1.66%)</span>
        </div>
      </div>
    </div>
    <div class="ticker__cell">
      <div class="ticker__id">
        <img class="coin coin--eth" src="assets/coin-eth.svg" alt="ETH"><span class="ticker__symbol">ETH-EUR</span>
      </div>
      <div class="ticker__quote">
        <div class="ticker__price">
          1,740.2
        </div>
        <div class="ticker__change ticker__change--negative">
          <span>−31.10</span><span>(−1.75%)</span>
        </div>
      </div>
    </div>
    <div class="ticker__cell">
      <div class="ticker__id">
        <img class="coin coin--usdt" src="assets/coin-usdt.svg" alt="USDT"><span class="ticker__symbol">USDT-USD</span>
      </div>
      <div class="ticker__quote">
        <div class="ticker__price">
          0.9999
        </div>
        <div class="ticker__change ticker__change--negative">
          <span>−0.00</span><span>(−0.01%)</span>
        </div>
      </div>
    </div>
    <div class="ticker__cell">
      <div class="ticker__id">
        <img class="coin coin--usdt" src="assets/coin-usdt.svg" alt="USDT"><span class="ticker__symbol">USDT-EUR</span>
      </div>
      <div class="ticker__quote">
        <div class="ticker__price">
          0.9231
        </div>
        <div class="ticker__change ticker__change--positive">
          <span>+0.00</span><span>(+0.27%)</span>
        </div>
      </div>
    </div>
    <div class="ticker__cell">
      <div class="ticker__id">
        <img class="coin coin--sol" src="assets/coin-sol.svg" alt="SOL"><span class="ticker__symbol">SOL-USD</span>
      </div>
      <div class="ticker__quote">
        <div class="ticker__price ticker__price--negative">
          76.63
        </div>
        <div class="ticker__change ticker__change--negative">
          <span>−1.32</span><span>(−1.69%)</span>
        </div>
      </div>
    </div>
    <div class="ticker__cell">
      <div class="ticker__id">
        <img class="coin coin--shib" src="assets/coin-shib.svg" alt="SHIB"><span class="ticker__symbol">SHIB-USD</span>
      </div>
      <div class="ticker__quote">
        <div class="ticker__price">
          0.00000416
        </div>
        <div class="ticker__change ticker__change--negative">
          <span>−0.00</span><span>(−1.89%)</span>
        </div>
      </div>
    </div>
    <div class="ticker__cell">
      <div class="ticker__id">
        <img class="coin coin--ada" src="assets/coin-ada.svg" alt="ADA"><span class="ticker__symbol">ADA-USD</span>
      </div>
      <div class="ticker__quote">
        <div class="ticker__price">
          0.2418
        </div>
        <div class="ticker__change ticker__change--negative">
          <span>−0.00</span><span>(−1.59%)</span>
        </div>
      </div>
    </div>
    <div class="ticker__cell">
      <div class="ticker__id">
        <img class="coin coin--avax" src="assets/coin-avax.svg" alt="AVAX"><span class="ticker__symbol">AVAX-USD</span>
      </div>
      <div class="ticker__quote">
        <div class="ticker__price">
          8.94
        </div>
        <div class="ticker__change ticker__change--negative">
          <span>−0.12</span><span>(−1.32%)</span>
        </div>
      </div>
    </div>
    <div class="ticker__cell">
      <div class="ticker__id">
        <img class="coin coin--xlm" src="assets/coin-xlm.svg" alt="XLM"><span class="ticker__symbol">XLM-USD</span>
      </div>
      <div class="ticker__quote">
        <div class="ticker__price ticker__price--negative">
          0.181840
        </div>
        <div class="ticker__change ticker__change--negative">
          <span>−0.01</span><span>(−2.98%)</span>
        </div>
      </div>
    </div>
    <div class="ticker__cell">
      <div class="ticker__id">
        <img class="coin coin--eth" src="assets/coin-eth.svg" alt="ETH"><span class="ticker__symbol">ETH-USD</span>
      </div>
      <div class="ticker__quote">
        <div class="ticker__price">
          1,897.0
        </div>
        <div class="ticker__change ticker__change--negative">
          <span>−36.30</span><span>(−1.88%)</span>
        </div>
      </div>
    </div>
    <div class="ticker__cell">
      <div class="ticker__id">
        <img class="coin coin--btc" src="assets/coin-btc.svg" alt="BTC"><span class="ticker__symbol">BTC-USD</span>
      </div>
      <div class="ticker__quote">
        <div class="ticker__price">
          64,988
        </div>
        <div class="ticker__change ticker__change--negative">
          <span>−1,095.00</span><span>(−1.66%)</span>
        </div>
      </div>
    </div>
    <div class="ticker__cell">
      <div class="ticker__id">
        <img class="coin coin--eth" src="assets/coin-eth.svg" alt="ETH"><span class="ticker__symbol">ETH-EUR</span>
      </div>
      <div class="ticker__quote">
        <div class="ticker__price">
          1,740.2
        </div>
        <div class="ticker__change ticker__change--negative">
          <span>−31.10</span><span>(−1.75%)</span>
        </div>
      </div>
    </div>
    <div class="ticker__cell">
      <div class="ticker__id">
        <img class="coin coin--usdt" src="assets/coin-usdt.svg" alt="USDT"><span class="ticker__symbol">USDT-USD</span>
      </div>
      <div class="ticker__quote">
        <div class="ticker__price">
          0.9999
        </div>
        <div class="ticker__change ticker__change--negative">
          <span>−0.00</span><span>(−0.01%)</span>
        </div>
      </div>
    </div>
    <div class="ticker__cell">
      <div class="ticker__id">
        <img class="coin coin--usdt" src="assets/coin-usdt.svg" alt="USDT"><span class="ticker__symbol">USDT-EUR</span>
      </div>
      <div class="ticker__quote">
        <div class="ticker__price">
          0.9231
        </div>
        <div class="ticker__change ticker__change--positive">
          <span>+0.00</span><span>(+0.27%)</span>
        </div>
      </div>
    </div>
  </div>
</div>
```

Cell: V gap 4, padding 12/16, hug width (138 ETH, 159 BTC, 130 others; Geist Mono hugs 136.8 for ETH), 1px right divider Grey 0 (very low contrast). Row 1: coin 18 + symbol (Geist Regular 12). Row 2: price (Geist Mono SemiBold 14; red on SOL-USD and XLM-USD) + change (abs and "(pct)" Geist Mono Regular 12, red or green, true minus U+2212). Price values were only partly harvested: ETH-USD, BTC-USD, SOL-USD, XLM-USD, SHIB-USD and the USDT-EUR change are from Figma; the other numbers are illustrative. The "!" stale badge and MATIC cell of the capture are NOT built.

### Ticker marquee (EXTENDED)

Source: Not in Figma (EXTENDED). Strip layout of 16:2133 / 16:2134. Scrolling is implied but not drawn (no prototype / motion): two copies of the cell set, translateX 0 to -50%, linear, 60s (--ticker-duration), pauses on hover, off for prefers-reduced-motion.

```html
<!-- Marquee (`.ticker__track--marquee`, two identical cell sets) -->
<div class="ticker">
  <div class="ticker__track ticker__track--marquee">
    <div class="ticker__cell">
      <div class="ticker__id">
        <img class="coin coin--eth" src="assets/coin-eth.svg" alt="ETH"><span class="ticker__symbol">ETH-USD</span>
      </div>
      <div class="ticker__quote">
        <div class="ticker__price">
          1,897.0
        </div>
        <div class="ticker__change ticker__change--negative">
          <span>−36.30</span><span>(−1.88%)</span>
        </div>
      </div>
    </div>
    <div class="ticker__cell">
      <div class="ticker__id">
        <img class="coin coin--btc" src="assets/coin-btc.svg" alt="BTC"><span class="ticker__symbol">BTC-USD</span>
      </div>
      <div class="ticker__quote">
        <div class="ticker__price">
          64,988
        </div>
        <div class="ticker__change ticker__change--negative">
          <span>−1,095.00</span><span>(−1.66%)</span>
        </div>
      </div>
    </div>
    <div class="ticker__cell">
      <div class="ticker__id">
        <img class="coin coin--eth" src="assets/coin-eth.svg" alt="ETH"><span class="ticker__symbol">ETH-EUR</span>
      </div>
      <div class="ticker__quote">
        <div class="ticker__price">
          1,740.2
        </div>
        <div class="ticker__change ticker__change--negative">
          <span>−31.10</span><span>(−1.75%)</span>
        </div>
      </div>
    </div>
    <div class="ticker__cell">
      <div class="ticker__id">
        <img class="coin coin--usdt" src="assets/coin-usdt.svg" alt="USDT"><span class="ticker__symbol">USDT-USD</span>
      </div>
      <div class="ticker__quote">
        <div class="ticker__price">
          0.9999
        </div>
        <div class="ticker__change ticker__change--negative">
          <span>−0.00</span><span>(−0.01%)</span>
        </div>
      </div>
    </div>
    <div class="ticker__cell">
      <div class="ticker__id">
        <img class="coin coin--usdt" src="assets/coin-usdt.svg" alt="USDT"><span class="ticker__symbol">USDT-EUR</span>
      </div>
      <div class="ticker__quote">
        <div class="ticker__price">
          0.9231
        </div>
        <div class="ticker__change ticker__change--positive">
          <span>+0.00</span><span>(+0.27%)</span>
        </div>
      </div>
    </div>
    <div class="ticker__cell">
      <div class="ticker__id">
        <img class="coin coin--sol" src="assets/coin-sol.svg" alt="SOL"><span class="ticker__symbol">SOL-USD</span>
      </div>
      <div class="ticker__quote">
        <div class="ticker__price ticker__price--negative">
          76.63
        </div>
        <div class="ticker__change ticker__change--negative">
          <span>−1.32</span><span>(−1.69%)</span>
        </div>
      </div>
    </div>
    <div class="ticker__cell">
      <div class="ticker__id">
        <img class="coin coin--shib" src="assets/coin-shib.svg" alt="SHIB"><span class="ticker__symbol">SHIB-USD</span>
      </div>
      <div class="ticker__quote">
        <div class="ticker__price">
          0.00000416
        </div>
        <div class="ticker__change ticker__change--negative">
          <span>−0.00</span><span>(−1.89%)</span>
        </div>
      </div>
    </div>
    <div class="ticker__cell">
      <div class="ticker__id">
        <img class="coin coin--ada" src="assets/coin-ada.svg" alt="ADA"><span class="ticker__symbol">ADA-USD</span>
      </div>
      <div class="ticker__quote">
        <div class="ticker__price">
          0.2418
        </div>
        <div class="ticker__change ticker__change--negative">
          <span>−0.00</span><span>(−1.59%)</span>
        </div>
      </div>
    </div>
    <div class="ticker__cell">
      <div class="ticker__id">
        <img class="coin coin--avax" src="assets/coin-avax.svg" alt="AVAX"><span class="ticker__symbol">AVAX-USD</span>
      </div>
      <div class="ticker__quote">
        <div class="ticker__price">
          8.94
        </div>
        <div class="ticker__change ticker__change--negative">
          <span>−0.12</span><span>(−1.32%)</span>
        </div>
      </div>
    </div>
    <div class="ticker__cell">
      <div class="ticker__id">
        <img class="coin coin--xlm" src="assets/coin-xlm.svg" alt="XLM"><span class="ticker__symbol">XLM-USD</span>
      </div>
      <div class="ticker__quote">
        <div class="ticker__price ticker__price--negative">
          0.181840
        </div>
        <div class="ticker__change ticker__change--negative">
          <span>−0.01</span><span>(−2.98%)</span>
        </div>
      </div>
    </div>
    <!-- the same 10 cells again (aria-hidden): -50% translate = one full set -->
    <div class="ticker__cell" aria-hidden="true">
      <div class="ticker__id">
        <img class="coin coin--eth" src="assets/coin-eth.svg" alt="ETH"><span class="ticker__symbol">ETH-USD</span>
      </div>
      <div class="ticker__quote">
        <div class="ticker__price">
          1,897.0
        </div>
        <div class="ticker__change ticker__change--negative">
          <span>−36.30</span><span>(−1.88%)</span>
        </div>
      </div>
    </div>
    <div class="ticker__cell" aria-hidden="true">
      <div class="ticker__id">
        <img class="coin coin--btc" src="assets/coin-btc.svg" alt="BTC"><span class="ticker__symbol">BTC-USD</span>
      </div>
      <div class="ticker__quote">
        <div class="ticker__price">
          64,988
        </div>
        <div class="ticker__change ticker__change--negative">
          <span>−1,095.00</span><span>(−1.66%)</span>
        </div>
      </div>
    </div>
    <div class="ticker__cell" aria-hidden="true">
      <div class="ticker__id">
        <img class="coin coin--eth" src="assets/coin-eth.svg" alt="ETH"><span class="ticker__symbol">ETH-EUR</span>
      </div>
      <div class="ticker__quote">
        <div class="ticker__price">
          1,740.2
        </div>
        <div class="ticker__change ticker__change--negative">
          <span>−31.10</span><span>(−1.75%)</span>
        </div>
      </div>
    </div>
    <div class="ticker__cell" aria-hidden="true">
      <div class="ticker__id">
        <img class="coin coin--usdt" src="assets/coin-usdt.svg" alt="USDT"><span class="ticker__symbol">USDT-USD</span>
      </div>
      <div class="ticker__quote">
        <div class="ticker__price">
          0.9999
        </div>
        <div class="ticker__change ticker__change--negative">
          <span>−0.00</span><span>(−0.01%)</span>
        </div>
      </div>
    </div>
    <div class="ticker__cell" aria-hidden="true">
      <div class="ticker__id">
        <img class="coin coin--usdt" src="assets/coin-usdt.svg" alt="USDT"><span class="ticker__symbol">USDT-EUR</span>
      </div>
      <div class="ticker__quote">
        <div class="ticker__price">
          0.9231
        </div>
        <div class="ticker__change ticker__change--positive">
          <span>+0.00</span><span>(+0.27%)</span>
        </div>
      </div>
    </div>
    <div class="ticker__cell" aria-hidden="true">
      <div class="ticker__id">
        <img class="coin coin--sol" src="assets/coin-sol.svg" alt="SOL"><span class="ticker__symbol">SOL-USD</span>
      </div>
      <div class="ticker__quote">
        <div class="ticker__price ticker__price--negative">
          76.63
        </div>
        <div class="ticker__change ticker__change--negative">
          <span>−1.32</span><span>(−1.69%)</span>
        </div>
      </div>
    </div>
    <div class="ticker__cell" aria-hidden="true">
      <div class="ticker__id">
        <img class="coin coin--shib" src="assets/coin-shib.svg" alt="SHIB"><span class="ticker__symbol">SHIB-USD</span>
      </div>
      <div class="ticker__quote">
        <div class="ticker__price">
          0.00000416
        </div>
        <div class="ticker__change ticker__change--negative">
          <span>−0.00</span><span>(−1.89%)</span>
        </div>
      </div>
    </div>
    <div class="ticker__cell" aria-hidden="true">
      <div class="ticker__id">
        <img class="coin coin--ada" src="assets/coin-ada.svg" alt="ADA"><span class="ticker__symbol">ADA-USD</span>
      </div>
      <div class="ticker__quote">
        <div class="ticker__price">
          0.2418
        </div>
        <div class="ticker__change ticker__change--negative">
          <span>−0.00</span><span>(−1.59%)</span>
        </div>
      </div>
    </div>
    <div class="ticker__cell" aria-hidden="true">
      <div class="ticker__id">
        <img class="coin coin--avax" src="assets/coin-avax.svg" alt="AVAX"><span class="ticker__symbol">AVAX-USD</span>
      </div>
      <div class="ticker__quote">
        <div class="ticker__price">
          8.94
        </div>
        <div class="ticker__change ticker__change--negative">
          <span>−0.12</span><span>(−1.32%)</span>
        </div>
      </div>
    </div>
    <div class="ticker__cell" aria-hidden="true">
      <div class="ticker__id">
        <img class="coin coin--xlm" src="assets/coin-xlm.svg" alt="XLM"><span class="ticker__symbol">XLM-USD</span>
      </div>
      <div class="ticker__quote">
        <div class="ticker__price ticker__price--negative">
          0.181840
        </div>
        <div class="ticker__change ticker__change--negative">
          <span>−0.01</span><span>(−2.98%)</span>
        </div>
      </div>
    </div>
  </div>
</div>
```

No JavaScript: a CSS keyframe animation. Put the cell set twice in the track and add `.ticker__track--marquee`; override the speed with `--ticker-duration` on the strip.

### Tile stack (tiles + spread tab)

Source: Figma 16:1917 (group), 16:1918 (stack, itemSpacing -36), 16:1919 (tiles), 16:1926 / 16:1927 (spread frame / tab).

```html
<!-- Tile stack 392 x 100 (tab lands at x136, y68) [16:1918] -->
<div class="tile-stack" style="width:392px">
  <div class="tile-stack__tiles">
    <div class="price-tile price-tile--bid">
      <span class="price-tile__big">61,349</span><span class="price-tile__dec">.29000000</span>
    </div>
    <div class="price-tile price-tile--ask">
      <span class="price-tile__big">61,447</span><span class="price-tile__dec">.52000000</span>
    </div>
  </div>
  <div class="tile-stack__spread">
    <span class="spread-tab">98.23</span>
  </div>
</div>
```

Tiles container H gap 16 (188 + 188). The spread frame is pulled up by 36 (`--layout-tile-overlap`, `margin-top`) and is `flex: none`, so nothing shrinks. Spread tab 120 x 32, fill White (the same White as the panel behind), per-corner radius [8,8,0,0], padding 11/36; value Geist Mono Regular 16 Black (98.23); the 21px line box overflows its 10px content box centred, as in Figma. Frame 16:1926 is modelled as 392 x 40 holding the 32 tab (the spec lists 392 x 32 at y68; only the (136,68) placement is certain).

### Spot Trader panel

Source: Figma 16:1911 (title row 16:1912, instrument row 16:1914, tile group 16:1917, slippage / type row 16:1929, order book 16:1932).

```html
<!-- Panel 440 x 528 [16:1911] -->
<section class="panel panel--trader">
  <div class="panel__head">
    <h2 class="panel__title">Spot Trader</h2>
  </div>
  <div class="form-row">
    <div class="field field--dashboard">
      <span class="field__label">Instrument</span>
      <div class="search">
        <i class="icon icon-search"></i><input class="input__field" type="text" value="BTC-USD">
      </div>
    </div>
    <div class="field field--dashboard">
      <span class="field__label">Quantity</span>
      <div class="input-2text">
        <input class="input__field" type="text" value="1"><span class="input__unit">BTC</span>
      </div>
    </div>
  </div>
  <div class="tile-group">
    <div class="tile-stack">
      <div class="tile-stack__tiles">
        <div class="price-tile price-tile--bid">
          <span class="price-tile__big">61,349</span><span class="price-tile__dec">.29000000</span>
        </div>
        <div class="price-tile price-tile--ask">
          <span class="price-tile__big">61,447</span><span class="price-tile__dec">.52000000</span>
        </div>
      </div>
      <div class="tile-stack__spread">
        <span class="spread-tab">98.23</span>
      </div>
    </div>
    <div class="form-row">
      <div class="field field--dashboard">
        <span class="field__label">Slippage</span>
        <div class="input-2text">
          <input class="input__field is-dim" type="text" value="2"><span class="input__unit">bps</span>
        </div>
      </div>
      <div class="field field--dashboard">
        <span class="field__label">Type</span>
        <div class="select is-filled">
          <span class="select__value">MKT</span><i class="icon icon-chevron-down"></i>
        </div>
      </div>
    </div>
  </div>
  <div class="data-table data-table--book">
    <div class="data-table__head">
      <span class="data-table__th align-left">BID</span><span class="data-table__th align-center">Qty</span><span class="data-table__th align-right">ASK</span>
    </div>
    <div class="data-table__body">
      <div class="data-table__row">
        <span class="data-table__td book__bid">61,349.29</span><span class="data-table__td book__qty">1</span><span class="data-table__td book__ask">61,447.52</span>
      </div>
      <div class="data-table__row">
        <span class="data-table__td book__bid">61,319.82</span><span class="data-table__td book__qty">10</span><span class="data-table__td book__ask">61,477<span class="dim">.00</span></span>
      </div>
      <div class="data-table__row">
        <span class="data-table__td book__bid">61,290.34</span><span class="data-table__td book__qty">100</span><span class="data-table__td book__ask">61,506.47</span>
      </div>
      <div class="data-table__row">
        <span class="data-table__td book__bid">61,260.87</span><span class="data-table__td book__qty">1000</span><span class="data-table__td book__ask">61,535.94</span>
      </div>
    </div>
  </div>
</section>
```

Panel: White, r8, padding T16 R24 B24 L24, gap 16, no border, no shadow. Children are 392 wide (440 - 48). Sample values from the Dashboard: BTC-USD, quantity 1 BTC, tiles 61,349.29 / 61,447.52, spread 98.23, Slippage 2 bps (dimmed), Type MKT.

### RFQ panel

Source: Figma 16:2124 (title 16:2125, tabs 16:2127, form 16:2128, row 16:2129, search 16:2130, input with tabs 16:2131, button 16:2132).

```html
<!-- Panel 440 x 278 (BUY selected, BTC tab Orange) [16:2124] -->
<section class="panel panel--rfq">
  <div class="panel__head">
    <h2 class="panel__title">RFQ</h2>
  </div>
  <div class="tabs tabs--track">
    <button class="tab tab--sell" type="button">SELL</button>
    <button class="tab tab--buy is-selected" type="button">BUY</button>
  </div>
  <div class="form-stack">
    <div class="form-row form-row--top">
      <div class="field field--rfq-instrument">
        <span class="field__label">Instrument</span>
        <div class="search">
          <i class="icon icon-search"></i><input class="input__field" type="text" value="BTC-USD">
        </div>
      </div>
      <div class="field field--input-tabs">
        <span class="field__label">Quantity</span>
        <div class="input-tabs">
          <div class="input">
            <input class="input__field" type="text" value="0.0001">
          </div>
          <div class="tabs tabs--sm">
            <button class="tab tab--warning is-selected" type="button">BTC</button>
            <button class="tab" type="button">USD</button>
          </div>
        </div>
      </div>
    </div>
    <button class="btn btn--lg btn--block" type="button">REQUEST FOR QUOTE</button>
  </div>
</section>
```

Form V gap 48: row 52 (Instrument 132 + Quantity 244, gap 16) then the 392 x 40 primary button (Geist Medium 14, label typed uppercase). The quote / countdown result screen and the SELL-active state are not drawn.

### Spot balances panel

Source: Figma 16:1954 (header 16:1955, refresh 16:1957, table 16:1958).

```html
<!-- Panel 440 x 392 [16:1954] -->
<section class="panel panel--balances">
  <div class="panel__head panel__head--balances">
    <h2 class="panel__title">Spot balances</h2>
    <button class="icon-btn" type="button" aria-label="Refresh">
      <i class="icon icon-refresh"></i>
    </button>
  </div>
  <div class="data-table data-table--book">
    <div class="data-table__head">
      <span class="data-table__th align-left">Asset</span><span class="data-table__th align-right">Quantity</span>
    </div>
    <div class="data-table__body">
      <div class="data-table__row">
        <span class="data-table__td balance__asset">USD</span><span class="data-table__td balance__qty balance__qty--positive">2,500,000.00</span>
      </div>
      <div class="data-table__row">
        <span class="data-table__td balance__asset">EUR</span><span class="data-table__td balance__qty balance__qty--positive">1,800,000.00</span>
      </div>
      <div class="data-table__row">
        <span class="data-table__td balance__asset">BTC</span><span class="data-table__td balance__qty balance__qty--negative">-12.50</span>
      </div>
      <div class="data-table__row">
        <span class="data-table__td balance__asset">ETH</span><span class="data-table__td balance__qty balance__qty--negative">-240.00</span>
      </div>
      <div class="data-table__row">
        <span class="data-table__td balance__asset">SOL</span><span class="data-table__td balance__qty balance__qty--positive">5,000.00</span>
      </div>
    </div>
  </div>
</section>
```

Header 392 x 32: title left, refresh icon button right (`.panel__head--balances`). About 60px of empty space remains under the table, as drawn.

### Trades blotter panel

Source: Figma 16:1981 (top row 16:1982, tabs 16:1983, icon cluster 16:1986, table 16:1990).

```html
<!-- Panel 1408 x 438 (gap 8) [16:1981] -->
<section class="panel panel--blotter">
  <div class="panel__head panel__head--blotter">
    <div class="blotter-tabs" role="tablist">
      <button class="blotter-tab is-active" type="button" role="tab" aria-selected="true">trades blotter</button>
      <button class="blotter-tab" type="button" role="tab" aria-selected="false">BALANCE MOVEMENT</button>
    </div>
    <div class="panel__actions">
      <button class="icon-btn" type="button" aria-label="Refresh">
        <i class="icon icon-refresh"></i>
      </button>
      <button class="icon-btn" type="button" aria-label="Filter">
        <i class="icon icon-filter"></i>
      </button>
      <button class="icon-btn" type="button" aria-label="Counterparties">
        <i class="icon icon-hands"></i>
      </button>
    </div>
  </div>
  <div class="data-table data-table--blotter">
    <div class="data-table__head">
      <span class="col col--dot"></span><span class="col col--140">Id</span><span class="col col--140">Order Id</span><span class="col">Instrument</span><span class="col">Order Type</span><span class="col">Time In Force</span><span class="col">Side</span><span class="col">Quantity</span><span class="col">Executed Price</span><span class="col">User</span><span class="col">Channel</span><span class="col col--140">Executed At</span>
    </div>
    <div class="data-table__body">
      <div class="data-table__row">
        <span class="col col--dot"><i class="status-dot status-dot--success"></i></span><span class="col col--140">UAT-TRD-000...</span><span class="col col--140">UAT-ORD-000...</span><span class="col">BTC-USD</span><span class="col col--chip"><span class="chip chip--limit">Limit</span></span><span class="col">GTC</span><span class="col"><span class="t-side-sell">SELL</span></span><span class="col">1.<span class="t-blotter-dim">00</span></span><span class="col">60,943.75</span><span class="col">uat_trader_1</span><span class="col">UAT</span><span class="col col--140 blotter__executed"><span class="date-part">2026/07/22</span> <span class="time-part">13:44:30*</span></span>
      </div>
      <div class="data-table__row">
        <span class="col col--dot"><i class="status-dot status-dot--danger"></i></span><span class="col col--140">UAT-TRD-000...</span><span class="col col--140">UAT-ORD-000...</span><span class="col">BTC-USD</span><span class="col col--chip"><span class="chip chip--market">Market</span></span><span class="col">FOK</span><span class="col"><span class="t-side-buy">BUY</span></span><span class="col">2.<span class="t-blotter-dim">00</span></span><span class="col">60,943.75</span><span class="col">uat_trader_1</span><span class="col">UAT</span><span class="col col--140 blotter__executed"><span class="date-part">2026/07/22</span> <span class="time-part">13:44:31*</span></span>
      </div>
      <div class="data-table__row">
        <span class="col col--dot"><i class="status-dot status-dot--success"></i></span><span class="col col--140">UAT-TRD-000...</span><span class="col col--140">UAT-ORD-000...</span><span class="col">BTC-USD</span><span class="col col--chip"><span class="chip chip--limit">Limit</span></span><span class="col">GTC</span><span class="col"><span class="t-side-sell">SELL</span></span><span class="col">1.<span class="t-blotter-dim">00</span></span><span class="col">60,943.75</span><span class="col">uat_trader_1</span><span class="col">UAT</span><span class="col col--140 blotter__executed"><span class="date-part">2026/07/22</span> <span class="time-part">13:44:32*</span></span>
      </div>
      <div class="data-table__row">
        <span class="col col--dot"><i class="status-dot status-dot--danger"></i></span><span class="col col--140">UAT-TRD-000...</span><span class="col col--140">UAT-ORD-000...</span><span class="col">BTC-USD</span><span class="col col--chip"><span class="chip chip--market">Market</span></span><span class="col">FOK</span><span class="col"><span class="t-side-buy">BUY</span></span><span class="col">2.<span class="t-blotter-dim">00</span></span><span class="col">60,943.75</span><span class="col">uat_trader_1</span><span class="col">UAT</span><span class="col col--140 blotter__executed"><span class="date-part">2026/07/22</span> <span class="time-part">13:44:33*</span></span>
      </div>
      <div class="data-table__row">
        <span class="col col--dot"><i class="status-dot status-dot--success"></i></span><span class="col col--140">UAT-TRD-000...</span><span class="col col--140">UAT-ORD-000...</span><span class="col">BTC-USD</span><span class="col col--chip"><span class="chip chip--limit">Limit</span></span><span class="col">GTC</span><span class="col"><span class="t-side-sell">SELL</span></span><span class="col">1.<span class="t-blotter-dim">00</span></span><span class="col">60,943.75</span><span class="col">uat_trader_1</span><span class="col">UAT</span><span class="col col--140 blotter__executed"><span class="date-part">2026/07/22</span> <span class="time-part">13:44:34*</span></span>
      </div>
      <div class="data-table__row">
        <span class="col col--dot"><i class="status-dot status-dot--danger"></i></span><span class="col col--140">UAT-TRD-000...</span><span class="col col--140">UAT-ORD-000...</span><span class="col">BTC-USD</span><span class="col col--chip"><span class="chip chip--market">Market</span></span><span class="col">FOK</span><span class="col"><span class="t-side-buy">BUY</span></span><span class="col">2.<span class="t-blotter-dim">00</span></span><span class="col">60,943.75</span><span class="col">uat_trader_1</span><span class="col">UAT</span><span class="col col--140 blotter__executed"><span class="date-part">2026/07/22</span> <span class="time-part">13:44:35*</span></span>
      </div>
      <div class="data-table__row">
        <span class="col col--dot"><i class="status-dot status-dot--success"></i></span><span class="col col--140">UAT-TRD-000...</span><span class="col col--140">UAT-ORD-000...</span><span class="col">BTC-USD</span><span class="col col--chip"><span class="chip chip--limit">Limit</span></span><span class="col">GTC</span><span class="col"><span class="t-side-sell">SELL</span></span><span class="col">1.<span class="t-blotter-dim">00</span></span><span class="col">60,943.75</span><span class="col">uat_trader_1</span><span class="col">UAT</span><span class="col col--140 blotter__executed"><span class="date-part">2026/07/22</span> <span class="time-part">13:44:36*</span></span>
      </div>
      <div class="data-table__row">
        <span class="col col--dot"><i class="status-dot status-dot--danger"></i></span><span class="col col--140">UAT-TRD-000...</span><span class="col col--140">UAT-ORD-000...</span><span class="col">BTC-USD</span><span class="col col--chip"><span class="chip chip--market">Market</span></span><span class="col">FOK</span><span class="col"><span class="t-side-buy">BUY</span></span><span class="col">2.<span class="t-blotter-dim">00</span></span><span class="col">60,943.75</span><span class="col">uat_trader_1</span><span class="col">UAT</span><span class="col col--140 blotter__executed"><span class="date-part">2026/07/22</span> <span class="time-part">13:44:37*</span></span>
      </div>
    </div>
  </div>
</section>
```

Top row 1360 x 38 (`.panel__head--blotter`): tabs left, 96 x 32 icon cluster right (`.panel__actions`: refresh / filter / hands, gap 0). Filter and hands popovers are not drawn. The capture's 20-row blotter, "Status" column and price " *" suffix are not built.

### Chart panel

Source: Figma 16:1978 (title 16:1979 / 16:1980); toolbar and plot from the live-app capture 1:3 / drafts 12:1631.

```html
<!-- Title only, as drawn (`.chart-panel` 952 x 392) [16:1978] -->
<section class="chart-panel">
  <h2 class="chart-panel__title">Chart</h2>
</section>
```

The final Chart panel is an empty White card with only its title ("Chart", Geist Regular 20 UPPER). The toolbar and plot below are the owner-approved Extended addition derived from the capture; no TradingView assets are reproduced.

### Chart panel with toolbar and plot (EXTENDED)

Source: Not in Figma final (EXTENDED). Capture 1:3 / drafts 12:1631 (toolbar 1m 30m 1h, Indicators; legend "Bitcoin / U.S. Dollar"). Owner decision 2026-10-15: include the chart panel. Container = panel recipe; toolbar slot 32 high on surface.chart-toolbar (light Grey 0 derived, dark #0F0F0F sampled at (1450,166)); active button surface.chart-toolbar-active (light Grey 1, dark #3D3D3D sampled at (973,160)); plot = empty embed slot.

```html
<!-- Toolbar + plot slot -->
<section class="chart-panel">
  <h2 class="chart-panel__title">Chart</h2>
  <div class="chart-toolbar">
    <button class="chart-toolbar__btn is-active" type="button">1m</button>
    <button class="chart-toolbar__btn" type="button">30m</button>
    <button class="chart-toolbar__btn" type="button">1h</button>
    <span class="chart-toolbar__sep"></span>
    <button class="chart-toolbar__btn" type="button">Indicators</button>
    <span class="chart-toolbar__spacer"></span>
    <button class="chart-toolbar__btn" type="button">Reset</button>
  </div>
  <div class="chart-plot">
    <span class="chart-plot__legend">BTC-USD</span> <span class="chart-plot__placeholder">Chart area (embed slot)</span>
  </div>
</section>
```

Toolbar buttons are control-metric (32 high, padding 7/8, Geist Regular 12); the separator is a 1px divider. Strip height is 32 (the capture strip is about 38 including its edge: visual estimate). The plot area is an empty slot: embed the real chart widget there.


---

## Extended states

### Dark theme scope (`.theme-dark`) (EXTENDED)

Source: Not in Figma final (EXTENDED). Sampled from live-app capture 1:3 raster; values and coordinates in Foundations / Colours. The final Figma page is light only. The dark theme is sampled from the live-app capture 1:3 (visual estimate) or derived; it re-points every semantic token under .theme-dark / body.dark.

```html
<!-- Controls on a dark panel -->
<div class="theme-dark">
  <div class="panel">
    <div class="form-row">
      <div class="field field--dashboard">
        <span class="field__label">Instrument</span>
        <div class="search">
          <i class="icon icon-search"></i><input class="input__field" type="text" value="BTC-USD">
        </div>
      </div>
      <div class="field field--dashboard">
        <span class="field__label">Type</span>
        <div class="select is-filled">
          <span class="select__value">MKT</span><i class="icon icon-chevron-down"></i>
        </div>
      </div>
    </div>
    <div class="form-row">
      <button class="btn" type="button">Button</button>
      <button class="btn-outline" type="button">Button</button>
      <button class="btn-black" type="button">Button</button>
      <div class="tabs">
        <button class="tab is-selected" type="button">Option</button>
        <button class="tab" type="button">Option</button>
      </div>
    </div>
    <div class="form-row">
      <span class="chip chip--limit">Limit</span><span class="chip chip--market">Market</span><i class="status-dot status-dot--success"></i><i class="status-dot status-dot--danger"></i>
      <label class="checkbox">
        <input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Selected</span>
      </label>
    </div>
  </div>
</div>

<!-- Tiles, spread tab and order book (derived zebra) -->
<div class="theme-dark">
  <div class="panel">
    <div class="tile-stack" style="width:392px">
      <div class="tile-stack__tiles">
        <div class="price-tile price-tile--bid">
          <span class="price-tile__big">61,349</span><span class="price-tile__dec">.29000000</span>
        </div>
        <div class="price-tile price-tile--ask">
          <span class="price-tile__big">61,447</span><span class="price-tile__dec">.52000000</span>
        </div>
      </div>
      <div class="tile-stack__spread">
        <span class="spread-tab">98.23</span>
      </div>
    </div>
    <div class="data-table data-table--book">
      <div class="data-table__head">
        <span class="data-table__th align-left">BID</span><span class="data-table__th align-center">Qty</span><span class="data-table__th align-right">ASK</span>
      </div>
      <div class="data-table__body">
        <div class="data-table__row">
          <span class="data-table__td book__bid">61,349.29</span><span class="data-table__td book__qty">1</span><span class="data-table__td book__ask">61,447.52</span>
        </div>
        <div class="data-table__row">
          <span class="data-table__td book__bid">61,319.82</span><span class="data-table__td book__qty">10</span><span class="data-table__td book__ask">61,477<span class="dim">.00</span></span>
        </div>
        <div class="data-table__row">
          <span class="data-table__td book__bid">61,290.34</span><span class="data-table__td book__qty">100</span><span class="data-table__td book__ask">61,506.47</span>
        </div>
        <div class="data-table__row">
          <span class="data-table__td book__bid">61,260.87</span><span class="data-table__td book__qty">1000</span><span class="data-table__td book__ask">61,535.94</span>
        </div>
      </div>
    </div>
  </div>
</div>
```

Components flip because they use only semantic tokens. Sampled / derived values, coordinates and conflicts are in Foundations / Colours (light / dark pairs). The dark Dashboard is under Screens.

### Light re-assertion (`.theme-light`) (EXTENDED)

Source: Not in Figma (EXTENDED). Repeats the :root semantic definitions. A scope helper, no new values: .theme-light re-points the semantic tokens back to the light Figma values inside a dark scope.

```html
<!-- A light panel nested in a dark scope -->
<div class="theme-dark">
  <div class="panel">
    <button class="btn" type="button">Dark panel</button>
    <div class="theme-light">
      <div class="panel">
        <button class="btn" type="button">Light panel inside it</button>
      </div>
    </div>
  </div>
</div>
```

Used by the Screens section to show the light Dashboard while the page theme is dark.


---

## Behaviour (JavaScript)

Everything is plain DOM; no framework. These are the snippets the showcase runs.

**Tabs / SELL-BUY track / small tabs** (selection = `.is-selected` or `aria-selected="true"`):

```js
document.addEventListener('click', function (e) {
  var tab = e.target.closest('.tabs .tab');
  if (tab && !tab.disabled) [].forEach.call(tab.parentNode.children, function (x) {
    var on = x === tab; x.classList.toggle('is-selected', on); x.setAttribute('aria-selected', on);
  });
});
```
Colours follow the tab modifier: `.tab--buy` green, `.tab--sell` Red (EXTENDED), `.tab--warning` Orange (only drawn on the selected BTC tab). Remove `tab--warning` from a tab that should use the Main color fill.

**Blotter (underlined) tabs:**

```js
document.addEventListener('click', function (e) {
  var t = e.target.closest('.blotter-tab');
  if (t && !t.disabled) [].forEach.call(t.parentNode.children, function (x) {
    var on = x === t; x.classList.toggle('is-active', on); x.setAttribute('aria-selected', on);
  });
});
```

**Select open / close** (EXTENDED list; the Select box itself is Figma-defined). Wrap the box and the list in `.select-wrap`; the list uses `hidden` when closed:

```html
<div class="select-wrap">
  <div class="select" tabindex="0"><span class="select__value">Please Select</span><i class="icon icon-chevron-down"></i></div>
  <div class="menu" role="listbox" hidden>
    <div class="menu__item" role="option">MKT</div><div class="menu__item" role="option">FOK</div>
  </div>
</div>
```
```js
document.addEventListener('click', function (e) {
  var wrap = e.target.closest('.select-wrap'), item = e.target.closest('.menu__item');
  document.querySelectorAll('.select-wrap').forEach(function (w) {            // close all others / on outside click
    if (w === wrap) return; w.querySelector('.select').classList.remove('is-open'); w.querySelector('.menu').hidden = true;
  });
  if (!wrap) return;
  var sel = wrap.querySelector('.select'), menu = wrap.querySelector('.menu');
  if (item && !item.classList.contains('is-disabled')) {                        // pick
    wrap.querySelectorAll('.menu__item').forEach(function (x) { x.classList.toggle('is-selected', x === item); });
    wrap.querySelector('.select__value').textContent = item.textContent; sel.classList.add('is-filled');
    sel.classList.remove('is-open'); menu.hidden = true;
  } else if (e.target.closest('.select')) {                                     // toggle
    var open = !sel.classList.contains('is-open'); sel.classList.toggle('is-open', open); menu.hidden = !open;
  }
});
```

**Checkbox "all" (indeterminate) state.** CSS has no attribute for it; set the property, or add `.is-indeterminate` on the label:

```js
// parent = the "All" checkbox, children = the group
function syncAll(parent, children) {
  var n = children.filter(function (c) { return c.checked; }).length;
  parent.checked = n === children.length; parent.indeterminate = n > 0 && n < children.length;
}
```

**Sortable headers (EXTENDED).** Add `.is-sortable` to `.data-table__th`; the chevron is drawn from `aria-sort`:

```js
document.addEventListener('click', function (e) {
  var th = e.target.closest('.data-table__th.is-sortable'); if (!th) return;
  var cur = th.getAttribute('aria-sort');
  [].forEach.call(th.parentNode.children, function (x) { x.removeAttribute('aria-sort'); });
  th.setAttribute('aria-sort', cur === 'ascending' ? 'descending' : 'ascending');
});
```

**Ticker marquee (EXTENDED).** CSS only: duplicate the cell set inside `.ticker__track`, add `.ticker__track--marquee`; speed = `--ticker-duration` (default 60s) on the strip; pauses on hover; off for `prefers-reduced-motion`. Mark the duplicate set `aria-hidden="true"`.

**Dark theme toggle (EXTENDED).**

```js
function setDark(on) { document.body.classList.toggle('dark', on); localStorage.setItem('enigmax-theme', on ? 'dark' : 'light'); }
setDark(localStorage.getItem('enigmax-theme') === 'dark');
```

**Modal / toast.** `.modal-backdrop` (fixed, scrim Black at 0.20, z-index `--z-scrim`) wraps a `.modal`; `.toast-stack` (fixed bottom-right, `--z-toast`) holds `.toast` items. Show / hide, focus trap and timing are application code (Figma defines none).

---

## Icon recipe

Monochrome icons are masks of the `*.currentColor.svg` assets, so they take `color`:

```html
<i class="icon icon-search"></i>        <!-- 16x16, Main color darker -->
<i class="icon icon-chevron-down"></i>  <!-- 16x16 -->
<i class="icon icon-refresh"></i>       <!-- 18x18 export size, Grey 3 -->
<i class="icon icon-filter"></i>        <!-- 18x18 -->
<i class="icon icon-hands"></i>         <!-- 20x18 -->
<i class="icon icon-check"></i>  <i class="icon icon-minus"></i>   <!-- checkbox glyphs 10x8 / 10x2 (used by the checkbox CSS) -->
<i class="status-dot status-dot--success"></i>  <i class="status-dot status-dot--danger"></i>   <!-- 6.67 -->
```
Raw alternative: `<i class="icon" style="--icon-src:url(assets/icon-search.currentColor.svg)"></i>`. Never redraw or hand-write icon paths; sizes are the SVG export sizes (stroke bleed included).

Coloured art is an image, never recoloured:

```html
<img class="coin coin--btc" src="assets/coin-btc.svg" alt="BTC">   <!-- eth btc usdt sol shib ada avax xlm; 18x18, radius 16 -->
<div class="logo-enigma" role="img" aria-label="Enigma X"></div>   <!-- 163x40 mask, follows --color-icon-logo (themable) -->
<img src="assets/logo-enigma.svg" alt="Enigma X" height="40">       <!-- fixed #3DBFBF logo (light theme) -->
<div class="logo-enigma-mark" role="img" aria-label="Enigma X"></div>  <!-- 40x40 mark -->
```
No MATIC / XRP / USDC coin art, close / plus / arrow / calendar / user glyphs or spinner exist in Figma.

---

## Alternates (documented, never default)

| Modifier | What it changes | Source |
|---|---|---|
| `.dashboard--alt-aligned` | Panels flush with the header (chart 960, blotter 1416 wide, right edge 1896) and RFQ 302 high (bottom 1046) instead of the drawn 1888 / 1022 | Figma 16:1910 geometry |
| `.dashboard--alt-title-primary` | Dark panel / chart / modal / tab titles use text.primary instead of the capture grey #7A9091 | live-app capture 1:3 |
| `.nav--alt-fullbleed` | Header full width, square, at (0,0) on the page colour (capture height ~56 not applied) | live-app capture 1:3 |
| `.data-table--alt-hairlines` | Rows on the panel colour with 1px row-bottom hairlines instead of zebra | live-app capture 1:3 |

---

## Extended table (not in Figma)

Name | what | derivation. Each is marked `EXTENDED —` in `components.css` / `tokens.css` and carries the Extended badge in the showcase.

| Name | What | Derivation |
|---|---|---|
| Button pressed | c-actions-buttons-primary | Not drawn in Figma. Fill = Main color darker (brand.pressed), keeps the 1px Main color stroke. |
| Button disabled | c-actions-buttons-primary | Not drawn in Figma. Disabled-checkbox recipe: Grey 3 fill, Grey 0 label. |
| Button focus | c-actions-buttons-primary | Not drawn in Figma. 1.5px Main color outline, offset 2px. |
| Button Outline pressed | c-actions-buttons-outline | Not drawn in Figma. Same as hover (Main color transp fill). |
| Button Outline disabled | c-actions-buttons-outline | Not drawn in Figma. Grey 2 stroke + Grey 3 label (the "disabled 2" checkbox recipe). |
| Button Outline focus | c-actions-buttons-outline | Not drawn in Figma. 1.5px Main color outline, offset 2px. |
| Button black pressed | c-actions-buttons-black | Not drawn in Figma. Same as the Variant2 look. |
| Button black disabled | c-actions-buttons-black | Not drawn in Figma. Grey 3 fill, Grey 0 label. |
| Button black focus | c-actions-buttons-black | Not drawn in Figma. 1.5px Main color outline, offset 2px. |
| Icon button pressed | c-actions-icon-buttons-refresh | Not drawn in Figma. Same fill as hover. |
| Icon button disabled | c-actions-icon-buttons-refresh | Not drawn in Figma. Glyph Grey 2, no hover fill. |
| Icon button focus | c-actions-icon-buttons-refresh | Not drawn in Figma. 1.5px Main color outline, offset 2px. |
| Select open chevron | c-forms-select-field | Not drawn in Figma. Chevron rotated 180 degrees; the list is the Extended .menu. |
| Select focus | c-forms-select-field | Not drawn in Figma. 1px Main color inset stroke (the Button hover stroke language). |
| Select error | c-forms-select-field | Not drawn in Figma. 1px Red for text inset stroke. |
| Select disabled | c-forms-select-field | Not drawn in Figma. Grey 1 fill, Grey 2 text and icons, not-allowed cursor. |
| Input focus | c-forms-input-field | Not drawn in Figma. 1px Main color inset stroke (the Button hover stroke language). |
| Input error | c-forms-input-field | Not drawn in Figma. 1px Red for text inset stroke. |
| Input disabled | c-forms-input-field | Not drawn in Figma. Grey 1 fill, Grey 2 text and icons, not-allowed cursor. |
| Input with 2 text focus | c-forms-input-2text-field | Not drawn in Figma. 1px Main color inset stroke (the Button hover stroke language). |
| Input with 2 text error | c-forms-input-2text-field | Not drawn in Figma. 1px Red for text inset stroke. |
| Input with 2 text disabled | c-forms-input-2text-field | Not drawn in Figma. Grey 1 fill, Grey 2 text and icons, not-allowed cursor. |
| Search focus | c-forms-search-field | Not drawn in Figma. 1px Main color inset stroke (the Button hover stroke language). |
| Search error | c-forms-search-field | Not drawn in Figma. 1px Red for text inset stroke. |
| Search disabled | c-forms-search-field | Not drawn in Figma. Grey 1 fill, Grey 2 text and icons, not-allowed cursor. |
| Checkbox hover (unchecked) | c-selection-checkbox-set | Not drawn in Figma. Stroke Grey 3. |
| Checkbox hover (checked) | c-selection-checkbox-set | Not drawn in Figma. Fill Main color hover (the Button hover recipe). |
| Checkbox focus | c-selection-checkbox-set | Not drawn in Figma. 1.5px Main color outline, offset 2px. |
| SELL selected tab | c-selection-sell-buy-track | The SELL-active variant is not drawn on the Dashboard; fill = Red (mirror of BUY = green). |
| Tabs selected hover | c-selection-tabs-component | Not drawn in Figma. Selected hover = Main color hover. |
| Tabs unselected hover | c-selection-tabs-component | Not drawn in Figma. Label turns Black (text.primary). |
| Tabs focus | c-selection-tabs-component | Not drawn in Figma. 1.5px Main color outline pulled inside. |
| Tabs disabled | c-selection-tabs-component | Not drawn in Figma. Unselected label Grey 3; selected Grey 3 fill, Grey 0 label. |
| Toast | c-feedback-toast-set | Toast is not in Figma: panel surface (White, r8) with a 1px Grey 1 inset hairline (no shadows), status dot, Geist Medium 12 message. |
| Skeleton rows | c-feedback-skeleton-set | Loading state is not in Figma: bars of surface.hover (Grey 1), radius 4, 16 high (the text line box), optional 1.2s opacity pulse. |
| Empty table | c-feedback-empty-set | No empty state in Figma: the table container keeps its drawn size with a centred Geist Regular 14 Grey 2 message (also the "Balance movement" tab content). |
| Tooltip | c-feedback-tooltip-set | No tooltip in Figma: the Button black recipe (Black fill, Main color Geist Medium 12 label), radius 4, padding 4/8, no shadow. |
| Select menu | c-overlays-select-menu-open | Select open state / dropdown list is not in Figma: panel surface (White) with a 1px Grey 1 inset hairline, radius 4, padding 4, items 32 high (field metrics); hover = Grey 0, selected = Main color transp + Geist Medium 12. |
| Modal | c-overlays-modal-set | No modal in Figma: the panel recipe (White, r8, padding 16/24/24/24, gap 16, 440 wide) on a Black 0.20 scrim, title = panel title (Geist Regular 20 UPPER), actions = Button Outline + Button. |
| Order confirmation | c-overlays-confirmation-set | No RFQ quote / confirmation screen in Figma: summary list in the data-table recipe (container Grey 0 + 1px outside hairline, r8, zebra rows 32 high) inside .modal. |
| Blotter tab hover | c-navigation-blotter-tabs-set | Not drawn in Figma. Same recipe as .tab hover. |
| Blotter tab focus | c-navigation-blotter-tabs-set | Not drawn in Figma. 1.5px Main color outline pulled inside. |
| Blotter tab disabled | c-navigation-blotter-tabs-set | Not drawn in Figma. Label Grey 3. |
| Table states | c-data-table-states | Figma draws no row hover, selected row, sortable header, or sort indicator: hover = surface.hover (Grey 1), selected = brand.transp, sorted header = text.secondary + exported chevron (ascending rotated 180 deg). |
| Ticker marquee | c-patterns-ticker-marquee | Scrolling is implied but not drawn (no prototype / motion): two copies of the cell set, translateX 0 to -50%, linear, 60s (--ticker-duration), pauses on hover, off for prefers-reduced-motion. |
| Chart panel toolbar + plot | c-patterns-chart-panel-ext | Owner decision 2026-10-15: include the chart panel. Container = panel recipe; toolbar slot 32 high on surface.chart-toolbar (light Grey 0 derived, dark #0F0F0F sampled at (1450,166)); active button surface.chart-toolbar-active (light Grey 1, dark #3D3D3D sampled at (973,160)); plot = empty embed slot. |
| Dark theme scope | c-extended-dark-theme-scope | The final Figma page is light only. The dark theme is sampled from the live-app capture 1:3 (visual estimate) or derived; it re-points every semantic token under .theme-dark / body.dark. |
| Light re-assertion scope | c-extended-light-scope | A scope helper, no new values: .theme-light re-points the semantic tokens back to the light Figma values inside a dark scope. |
| Dark Dashboard | s-dashboard-dark | The same Dashboard under .theme-dark: dark values sampled from the live-app capture 1:3 or derived (Foundations / Colours). |
| Token --color-surface-tab-sell | f-colours | Selected SELL segment: mirror of BUY (green) with Red; the SELL-active variant is not drawn. |
| Token --color-surface-chart-toolbar | f-colours | Chart toolbar strip (capture has one, final does not): light derived Grey 0, dark sampled. |
| Token --color-surface-chart-toolbar-active | f-colours | Chart toolbar active/hover button: light derived Grey 1, dark sampled. |
| Token --color-surface-scrim | f-colours | Modal backdrop: Black at 0.20 (the one alpha Figma uses on a style). |
| Token --color-border-focus | f-colours | Focus ring colour = Main color. |
| Token --color-border-error | f-colours | Invalid-field ring = Red for text. |
| Token --color-brand-pressed | f-colours | Pressed Button fill = Main color darker. |
| Dark theme (65 tokens + .theme-dark / body.dark) | f-colours | The live-app capture 1:3 is a dark web import; the final Figma page has no dark theme. Every dark value is sampled from the capture raster at stated coordinates, or derived by a documented rule from an existing token. |
| Ticker marquee | c-patterns-ticker | The file implies a scrolling strip (15 cells, first one cut at x=-60) but has no prototype or motion data: continuous leftward scroll, linear, 60s per set, pauses on hover, off for prefers-reduced-motion. |
| Skeleton pulse | c-feedback-skeleton | Loading state is not drawn in Figma: opacity 1 to 0.5, 1.2s ease-in-out, local to .skeleton--pulse, off for prefers-reduced-motion. |
| z-index scale | f-sizes | Figma has no z-index; layering for the Extended menu / scrim / modal / toast. |

Also Extended (no badge of their own): global `:focus-visible` ring (1.5px Main color, offset 2), font fallback stacks after Geist / Geist Mono, `--z-*` scale, `.theme-light` scope helper, and the whole `dark` colour group (65 tokens).

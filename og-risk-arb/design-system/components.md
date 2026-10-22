# OG Risk Arb - components (copy-paste HTML)

Source of truth: Figma file `VlOfBG6fJt7ijm0iKasAMP`, canonical **Section 1** (node `2496:2003`, page "final") + page "components" (`924:3460`). Every snippet below is the markup used (and measured) on `showcase.html`; classes live in `components.css`, values in `tokens.css` / `tokens.json`.
**Extended** = not drawn in Figma, derived only from existing tokens (full list at the end). **Alternate** = a documented Figma inconsistency kept as an `--alt-*` / `*--alt-*` modifier.

## 0. Setup

```html
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Inter:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components.css">
```

- Body = Geist Regular **12px** / 16px line box / letter-spacing 0 / black on white. Inter is loaded ONLY for the calendar DAY cell (+ Admin disclaimer); Times New Roman (system) only for the rich-text toolbar B/I/U/S glyphs. No monospace anywhere.
- Class scheme: `.block`, `.block__element`, `.block--modifier`; forced states `.is-hover .is-focus .is-disabled .is-active .is-open .is-error .is-checked .is-indeterminate .is-on` mirror the real pseudo-classes.
- Sizes are fixed as in Figma (controls 32 / 40 high, hug widths); do not stretch buttons.

### Icons
Monochrome icons are CSS masks over `assets/<name>.currentColor.svg`, so the colour follows `color`:

```html
<span class="icon icon-chevron-down-16-select"></span>            <!-- default colour = the Figma colour of that icon -->
<span class="icon icon-search-16 icon-c-grey-1"></span>           <!-- override: icon-c-{inherit,black,grey-1,grey-2,brand,orange,blue,red,green,white,purple,sky} -->
<span class="icon icon-chevron-up-24-nav icon-flip-y"></span>     <!-- icon-flip-x / icon-flip-y -->
```

Coloured / gradient assets are plain images (never recoloured): `<img src="assets/og-wordmark.svg">`, `og-mark.svg`, `og-wordmark-login-132x72.svg`, `noun-ai-sparkle.svg`, `circle-x-16.svg`, `checkbox-*.svg`, `radio-dot-active-12.svg`, `zoom-logo.svg`, `logo-red-bars.svg`, `noun-pdf.svg`, `bell-notify-24.svg`, `bookmark-24-blue.svg`, `bookmark-32-active.svg`, `list-chevrons-toggle-64x32.svg`, `nav-item-book-active-40.svg`. `arrow-up-down-32-button` has its #F5F5F8 backing baked in (rendered as an image, not a mask). Never redraw an icon.

### Inside-aligned strokes
Every Figma stroke is INSIDE-aligned. Do not use `border`: draw it as an inset shadow so the box size and the Figma padding stay exact and fractional weights survive:

```css
box-shadow: inset 0 0 0 1px var(--color-border-default);      /* all sides */
box-shadow: inset 0 -1px 0 0 var(--color-border-subtle);      /* bottom only (row line) */
box-shadow: inset -1px 0 0 0 var(--color-border-default);     /* right only (cell line) */
box-shadow: inset 0 0 0 1.2px var(--color-black);             /* Button Outline */
box-shadow: inset 0 0 0 1.5px var(--color-dark-green-main);   /* primary button */
```
Where opaque children would cover the stroke (tables, cards) the stroke is painted on a `::after` overlay with the same numbers. Stroke + shadow go in ONE `box-shadow` list.

### Page skeleton (1920 x 1080)

```html
<div class="screen">
  <div class="screen__nav"><!-- nav --></div>
  <div class="screen__main">
    <!-- topbar --> <!-- tabbar -->
    <div class="content-frame"><!-- page content --></div>
  </div>
</div>
```
Nav 72 (collapsed) is absolute at 0,0; main starts at x72; top bar 1848x64; tab bar x88 y72 (1784x32); content frame x88 y103 1784x929 (padding 16, gap 8); right margin 48, bottom strip 48. Variants: `.content-frame--flush` (starts at y104), `--r12` (radius [0,12,12,12]), `--block` (no padding / auto height), `--auto`, `--fixed`; `.screen--search` for the search overlay.


---

## Buttons

### Button (primary)

*Figma:* set 766:3215

Fill #005268 + 1.5px inside stroke (same colour). Hover = #FFFFFF@0.2 overlay on top of the fill and NO stroke. Disabled = fill #A8B6CD, text #E5E7EC, no stroke. All buttons: HORIZONTAL, gap 8, padding 7/24, radius 4, height FIXED 32, width HUG, Geist Regular 12. **Pressed** is Extended (Figma draws none): it reuses the hover recipe.

```html
<!-- Default (Figma: 766:3214) -->
<button class="btn" type="button">Button</button>

<!-- hover (.is-hover / :hover) (Figma: 766:3216) -->
<button class="btn is-hover" type="button">Button</button>

<!-- disabled (Figma: 766:3218) -->
<button class="btn" type="button" disabled>Button</button>

<!-- pressed (.is-active / :active) [EXTENDED] -->
<button class="btn is-active" type="button">Button</button>
```

### Button Outline

*Figma:* set 836:2651

Stroke #000 1.2px inside; hover fill #E5E7EC; disabled stroke #A8B6CD 1.5px + text #A8B6CD (the Figma variant is literally named "disables").

```html
<!-- Default (Figma: 836:2650) -->
<button class="btn-outline" type="button">Button</button>

<!-- hover (.is-hover / :hover) (Figma: 836:2652) -->
<button class="btn-outline is-hover" type="button">Button</button>

<!-- disabled (Figma: 836:2654) -->
<button class="btn-outline" type="button" disabled>Button</button>

<!-- pressed (.is-active / :active) [EXTENDED] -->
<button class="btn-outline is-active" type="button">Button</button>
```

### Button Outline green

*Figma:* set 836:2656

Stroke #005268 1.2px; hover fill #005268@0.1; text #005268. Login screens override it to height 40 / Regular 14 (`.btn-lg`).

```html
<!-- Default (Figma: 836:2657) -->
<button class="btn-outline-green" type="button">Button</button>

<!-- hover (.is-hover / :hover) (Figma: 836:2661) -->
<button class="btn-outline-green is-hover" type="button">Button</button>

<!-- disabled (Figma: 836:2659) -->
<button class="btn-outline-green" type="button" disabled>Button</button>

<!-- pressed (.is-active / :active) [EXTENDED] -->
<button class="btn-outline-green is-active" type="button">Button</button>
```

### button yellow

*Figma:* set 2293:7996

Fill #ECA100@0.2, hover @0.35, text Geist **Medium** 12 #ECA100; disabled = grey fill, Regular 12. No stroke. Used for "Drafts" in the Laura alternate only.

```html
<!-- Default (Figma: 2293:7995) -->
<button class="btn-yellow" type="button">Button</button>

<!-- hover (.is-hover / :hover) (Figma: 2293:7997) -->
<button class="btn-yellow is-hover" type="button">Button</button>

<!-- disabled (Figma: 2293:7999) -->
<button class="btn-yellow" type="button" disabled>Button</button>

<!-- pressed (.is-active / :active) [EXTENDED] -->
<button class="btn-yellow is-active" type="button">Button</button>
```

### button orange outline

*Figma:* set 2293:8005

Stroke #FF8132 1.2px; hover fill #FF8132@0.2. Used for the Admin disclaimer "Edit" button.

```html
<!-- Default (Figma: 2293:5949) -->
<button class="btn-orange-outline" type="button">Button</button>

<!-- hover (.is-hover / :hover) (Figma: 2293:8006) -->
<button class="btn-orange-outline is-hover" type="button">Button</button>

<!-- disabled (Figma: 2293:8008) -->
<button class="btn-orange-outline" type="button" disabled>Button</button>

<!-- pressed (.is-active / :active) [EXTENDED] -->
<button class="btn-orange-outline is-active" type="button">Button</button>
```

### Screen-defined button variants

*Figma:* 1868:10443, 414:3013, 721:2574, 836:2656 (login), 414:2972

Buttons that exist only as screen overrides of the five families: grey Cancel (Button/Default with fill #7C8DAC), "Join the meeting" (two fills white + #3675D2@0.2), login 40px / Regular 14, "Events Calendar" 28px outline.

```html
<!-- .btn-grey (Cancel) (Figma: 1868:10443) -->
<button class="btn-grey" type="button">Cancel</button>

<!-- .btn-grey hover [EXTENDED] -->
<button class="btn-grey is-hover" type="button">Cancel</button>

<!-- .btn-join (132x32) (Figma: 414:3013) -->
<a class="btn-join" href="#"><img src="assets/zoom-logo.svg" alt="">Join the meeting</a>

<!-- .btn-join--sm (132x24, calendar) (Figma: 721:2574) -->
<a class="btn-join btn-join--sm" href="#"><img src="assets/zoom-logo.svg" alt="">Join the meeting</a>

<!-- .btn-outline-green.btn-lg (login 40 / 14) (Figma: 836:2656) -->
<button class="btn-outline-green btn-lg" type="button" style="width:240px">Sign In</button>

<!-- .btn-outline-sm (Events Calendar 122x28) (Figma: 414:2972) -->
<button class="btn-outline-sm" type="button">Events Calendar</button>

<!-- .btn-outline-sm hover [EXTENDED] -->
<button class="btn-outline-sm is-hover" type="button">Events Calendar</button>

<!-- + button (.btn-plus 20x20) (Figma: 1720:6360) [EXTENDED] -->
<button class="btn-plus" type="button" aria-label="Add row"></button>
```

### Keyboard focus ring (global)

*Figma:* none (derived from 1720:5473) - **EXTENDED** (not drawn in Figma)

Figma draws no focus ring. The ring is the brand border colour (#005268) at 1.5px (primary-button stroke weight), offset 2px, applied with `:where(...):focus-visible` (zero specificity). Press Tab inside the demo to see it.

```html
<!-- Tab to focus [EXTENDED] -->
<button class="btn" type="button">Primary</button>
<button class="btn-outline" type="button">Outline</button>
<a class="link" href="#">A link</a>
```


---

## Fields

### Input

*Figma:* set 830:4470

Field box: fill #FFFFFF, stroke #E5E7EC 1px INSIDE, radius 4, padding 7/12, height FIXED 32, width 148 (component default), gap 32; placeholder Geist Regular 12 #7C8DAC; label Regular 12 #A8B6CD with 4px gap. Works as a `<div>` or a native `<input class="input">`.

```html
<!-- w label (148x52) (Figma: 830:4469) -->
<div class="field">
  <div class="field__label">Label</div>
  <div class="input"><span class="input__text">Placeholder</span></div>
</div>

<!-- no label (148x32) (Figma: 830:4471) -->
<div class="input"><span class="input__text">Placeholder</span></div>

<!-- with value [EXTENDED] -->
<div class="field">
  <div class="field__label">Label</div>
  <div class="input"><span class="input__text has-value">Shutterstock</span></div>
</div>

<!-- hover [EXTENDED] -->
<div class="input is-hover"><span class="input__text">Placeholder</span></div>

<!-- focus [EXTENDED] -->
<div class="input is-focus"><span class="input__text">Placeholder</span></div>

<!-- error [EXTENDED] -->
<div class="field">
  <div class="field__label">Label</div>
  <div class="input is-error"><span class="input__text">Placeholder</span></div>
  <div class="form-error">This field is required</div>
</div>

<!-- disabled [EXTENDED] -->
<div class="input is-disabled"><span class="input__text">Placeholder</span></div>

<!-- native &lt;input&gt; [EXTENDED] -->
<input class="input" placeholder="Placeholder">
```

### Select

*Figma:* set 830:4456

Closed state only in Figma (no option list). Chevron = lucide/chevron-down 16, stroke #005268 1.2. The "no label" Figma variant has main-axis MIN (chevron right after the text); SPACE_BETWEEN is used for both (documented inconsistency).

```html
<!-- w label (148x52) (Figma: 830:4455) -->
<div class="field">
  <div class="field__label">Label</div>
  <div class="select"><span class="select__text">Please Select</span><span class="icon icon-chevron-down-16-select"></span></div>
</div>

<!-- no label (148x32) (Figma: 830:4457) -->
<div class="select"><span class="select__text">Please Select</span><span class="icon icon-chevron-down-16-select"></span></div>

<!-- open (chevron flipped) [EXTENDED] -->
<div class="select is-open"><span class="select__text">Please Select</span><span class="icon icon-chevron-down-16-select"></span></div>

<!-- hover [EXTENDED] -->
<div class="select is-hover"><span class="select__text">Please Select</span><span class="icon icon-chevron-down-16-select"></span></div>

<!-- error [EXTENDED] -->
<div class="select is-error"><span class="select__text">Please Select</span><span class="icon icon-chevron-down-16-select"></span></div>

<!-- disabled [EXTENDED] -->
<div class="select is-disabled"><span class="select__text">Please Select</span><span class="icon icon-chevron-down-16-select"></span></div>

<!-- native &lt;select&gt; [EXTENDED] -->
<select class="select"><option>Please Select</option><option>NYSE</option></select>
```

### calendar (date field)

*Figma:* set 831:2591

Icon = lucide/calendar 16, stroke #005268 1. Widths: one date 178 (177 with label - Figma inconsistency, both kept), from-to 210 with gap 16. There is no date-picker popover in Section 1 (the range picker exists only in the Laura alternate).

```html
<!-- label one date (177x52) (Figma: 831:2583) -->
<div class="field">
  <div class="field__label">Label</div>
  <div class="calendar-field"><span class="calendar-field__text">dd/mm/yyyy</span><span class="icon icon-calendar-16-component"></span></div>
</div>

<!-- one date (178x32) (Figma: 831:2592) -->
<div class="calendar-field"><span class="calendar-field__text">dd/mm/yyyy</span><span class="icon icon-calendar-16-component"></span></div>

<!-- w label from to (210x52) (Figma: 831:2604) -->
<div class="field">
  <div class="field__label">Label</div>
  <div class="calendar-field calendar-field--range"><span class="calendar-field__text">dd/mm/yyyy - dd/mm/yyyy</span><span class="icon icon-calendar-16-component"></span></div>
</div>

<!-- from to (210x32) (Figma: 831:2610) -->
<div class="calendar-field calendar-field--range"><span class="calendar-field__text">dd/mm/yyyy - dd/mm/yyyy</span><span class="icon icon-calendar-16-component"></span></div>

<!-- focus [EXTENDED] -->
<div class="calendar-field is-focus"><span class="calendar-field__text">dd/mm/yyyy</span><span class="icon icon-calendar-16-component"></span></div>

<!-- error [EXTENDED] -->
<div class="calendar-field is-error"><span class="calendar-field__text">dd/mm/yyyy</span><span class="icon icon-calendar-16-component"></span></div>

<!-- disabled [EXTENDED] -->
<div class="calendar-field is-disabled"><span class="calendar-field__text">dd/mm/yyyy</span><span class="icon icon-calendar-16-component"></span></div>
```

### search

*Figma:* set 836:2572, 1567:4505, 1615:4439

Component search = 200x32 (icon 12x12 black stroke 1, gap 8). "main search" = 200x40 / Regular 14. The top-bar instance (component "Search" 5:148) is 840x40, fill #F5F5F8, icon 16, Regular 16; **focused + typed** = stroke #005268 1px INSIDE, text #000 (the only focus state Figma draws).

```html
<!-- label (200x52) (Figma: 836:2571) -->
<div class="field">
  <div class="field__label">Label</div>
  <div class="search"><span class="icon icon-search-13-component"></span><span class="search__text">Search</span></div>
</div>

<!-- no label (200x32) (Figma: 836:2573) -->
<div class="search"><span class="icon icon-search-13-component"></span><span class="search__text">Search</span></div>

<!-- main search (200x40) (Figma: 836:2579) -->
<div class="search search--main"><span class="icon icon-search-13-component"></span><span class="search__text">Search</span></div>

<!-- hover [EXTENDED] -->
<div class="search is-hover"><span class="icon icon-search-13-component"></span><span class="search__text">Search</span></div>

<!-- disabled [EXTENDED] -->
<div class="search is-disabled"><span class="icon icon-search-13-component"></span><span class="search__text">Search</span></div>

<!-- native &lt;input&gt; [EXTENDED] -->
<div class="search"><span class="icon icon-search-13-component"></span><input class="search__input" placeholder="Search"></div>

<!-- top bar (840x40) default (Figma: 1567:4505) -->
<div class="search search--top"><span class="icon icon-search-16"></span><span class="search__text">Search</span></div>

<!-- top bar focused + typed (Figma: 1615:4439) -->
<div class="search search--top is-focus"><span class="icon icon-search-16"></span><span class="search__text has-value">Get|</span></div>
```

### Password

*Figma:* set 2159:12814, 1895:21136

240x40, Regular 14, trailing eye 24x24 #005268. Hidden = ten 4x4 dots #005268 (step 12); visible = text #000 + slashed eye; empty = placeholder #A8B6CD (vs #7C8DAC on other inputs - inconsistency). Admin instance: 260x32 / Regular 12; **error** = stroke #DA4D43 1px + eye #DA4D43 + helper "Incorrect password" Regular 10 #DA4D43 (the one error pattern in Figma).

```html
<!-- filled hidden (Figma: 2159:12813) -->
<div class="password"><span class="password__dots"></span><span class="icon icon-eye-24-hidden-state"></span></div>

<!-- filled visible (Figma: 2159:12829) -->
<div class="password"><span class="password__text">makoristhebest10</span><span class="icon icon-eye-off-24-visible-state"></span></div>

<!-- empty (Figma: 2159:12853) -->
<div class="password"><span class="password__text is-empty">password</span><span class="icon icon-eye-24-hidden-state"></span></div>

<!-- compact 260x32 + error (Figma: 1895:21136) -->
<div class="field">
  <div class="password password--compact is-error"><span class="password__dots"></span><span class="icon icon-eye-24"></span></div>
  <div class="field__error">Incorrect password</div>
</div>

<!-- hover [EXTENDED] -->
<div class="password is-hover"><span class="password__dots"></span><span class="icon icon-eye-24-hidden-state"></span></div>

<!-- disabled [EXTENDED] -->
<div class="password is-disabled"><span class="password__dots"></span><span class="icon icon-eye-24-hidden-state"></span></div>

<!-- show/hide (click the eye) [EXTENDED] -->
<div class="password" data-pwd><span class="password__dots"></span><span class="icon icon-eye-24-hidden-state" role="button" tabindex="0" aria-label="Show password"></span></div>
```


---

## Selection

### Checkbox

*Figma:* set 754:2943

Row HORIZONTAL gap 8 (16 high). Box 16x16 radius 2. Selected = fill #005268 + white check (1.5); not selected = stroke #A8B6CD 1px inside; all = dash. Disabled: fill #7C8DAC, check #E5E7EC (disabled-all dash is #FFFFFF - inconsistency kept), label #7C8DAC; the not-selected disabled box keeps its #A8B6CD border.

```html
<!-- selected (Figma: 754:2942) -->
<label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Selected</span></label>

<!-- not selected (Figma: 754:2944) -->
<label class="checkbox"><input class="checkbox__input" type="checkbox"><span class="checkbox__box"></span><span class="checkbox__label">Not Selected</span></label>

<!-- all (Figma: 770:3264) -->
<label class="checkbox is-indeterminate"><input class="checkbox__input" type="checkbox"><span class="checkbox__box"></span><span class="checkbox__label">All</span></label>

<!-- disabled (Figma: 1822:5399) -->
<label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Selected</span></label>

<!-- disabled 2 (Figma: 1822:5646) -->
<label class="checkbox is-disabled"><input class="checkbox__input" type="checkbox" disabled><span class="checkbox__box"></span><span class="checkbox__label">Not Selected</span></label>

<!-- disabled all (Figma: 1822:5772) -->
<label class="checkbox is-disabled is-indeterminate"><input class="checkbox__input" type="checkbox" disabled><span class="checkbox__box"></span><span class="checkbox__label">All</span></label>

<!-- keyboard focus [EXTENDED] -->
<label class="checkbox is-checked is-focus"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Focused</span></label>
```

### radio buttons

*Figma:* set 754:2937

Circle FIXED 12x12 radius 12 (row 16 high, circle at y=2), stroke 1px; active = #005268 + inner 8x8 dot. The Foundations text says 16x16 - the components page (and radio-dot-active-12.svg) say 12x12; 12 is used. No disabled / focus variant exists in Figma.

```html
<!-- active (Figma: 754:2936) -->
<label class="radio is-checked"><input class="radio__input" type="radio" name="rryes" checked><span class="radio__circle"></span><span class="radio__label">yes</span></label>

<!-- not active (Figma: 754:2938) -->
<label class="radio"><input class="radio__input" type="radio" name="rrno"><span class="radio__circle"></span><span class="radio__label">no</span></label>

<!-- disabled [EXTENDED] -->
<label class="radio is-disabled"><input class="radio__input" type="radio" name="rrnois-disabled" disabled><span class="radio__circle"></span><span class="radio__label">no</span></label>

<!-- disabled active [EXTENDED] -->
<label class="radio is-checked is-disabled"><input class="radio__input" type="radio" name="rryesis-disabled" checked disabled><span class="radio__circle"></span><span class="radio__label">yes</span></label>

<!-- focus [EXTENDED] -->
<label class="radio is-checked is-focus"><input class="radio__input" type="radio" name="rryesis-focus" checked><span class="radio__circle"></span><span class="radio__label">yes</span></label>
```

### Toggle

*Figma:* set 1375:4132

Track 32x16 radius 40; thumb 12x12 white at y=2; ON = #179484 (NOT the brand teal), label "ON" Geist Medium 12; OFF = #7C8DAC, label "OFF" Regular 12. Used for the "Deal Preview" switch in the New Deal footer.

```html
<!-- Default (ON) (Figma: 1375:4131) -->
<label class="toggle is-on"><input class="toggle__input" type="checkbox" checked><span class="toggle__track"></span><span class="toggle__label">ON</span></label>

<!-- Variant2 (OFF) (Figma: 1375:4133) -->
<label class="toggle"><input class="toggle__input" type="checkbox"><span class="toggle__track"></span><span class="toggle__label">OFF</span></label>

<!-- disabled [EXTENDED] -->
<label class="toggle is-disabled"><input class="toggle__input" type="checkbox" disabled><span class="toggle__track"></span><span class="toggle__label">OFF</span></label>

<!-- focus [EXTENDED] -->
<label class="toggle is-on is-focus"><input class="toggle__input" type="checkbox" checked><span class="toggle__track"></span><span class="toggle__label">ON</span></label>
```

### Scroll

*Figma:* component 838:2609

A 4px track (#E5E7EC, radius 16) with a #A8B6CD thumb; sized with CSS variables `--scroll-h` / `--scroll-thumb` / `--scroll-top`. Figma draws it as a static indicator next to the clipped content (no hover / drag).

```html
<!-- 559 / thumb 304 (Figma: 838:2609) -->
<div class="scroll" style="--scroll-h:559px;--scroll-thumb:304px">
  <div class="scroll__thumb"></div>
</div>

<!-- dashboard 800 / 435.06 (Figma: 1526:6293) -->
<div class="scroll" style="--scroll-h:300px;--scroll-thumb:163px">
  <div class="scroll__thumb"></div>
</div>

<!-- native scrollbar skin (.scrollable) [EXTENDED] -->
<div class="scrollable" style="width:220px;height:110px;overflow:auto;padding-right:8px">
  <div style="height:340px">Scroll me - 4px track Grey 3, thumb Grey 2, radius 16 (the Scroll component numbers).</div>
</div>
```


---

## Rich text

### rich text (toolbar)

*Figma:* component 1687:7037, 1868:10163

Toolbar ONLY (578x32; no editor surface in the component). Seven groups (gap 8, padding 0/12, right divider #E5E7EC 1px): undo + redo (mirrored rotate-ccw) | pilcrow | B I U S | align centre, justify, left, right | bullets, numbers | link, table | code, fullscreen. 20x20 cells, glyph #000. **B / I / U / S are TEXT in Times New Roman** (Bold 12 / Bold Italic 12 / Regular 12 underline / Regular 14 strikethrough), not Geist. Inside editors the toolbar is 740x28 with a #F5F5F8 fill.

```html
<!-- component (578x32) (Figma: 1687:7037) -->
<div class="rt-toolbar">
  <div class="rt-group"><button class="rt-btn" type="button" aria-label="Undo"><span class="icon icon-rotate-ccw-20"></span></button><button class="rt-btn rt-btn--redo" type="button" aria-label="Redo"><span class="icon icon-rotate-ccw-20"></span></button></div>
  <div class="rt-group rt-group--pilcrow"><button class="rt-btn" type="button" aria-label="Paragraph"><span class="icon icon-pilcrow-34x20"></span></button></div>
  <div class="rt-group"><button class="rt-btn rt-btn--bold" type="button" aria-label="Bold">B</button><button class="rt-btn rt-btn--italic" type="button" aria-label="Italic">I</button><button class="rt-btn rt-btn--underline" type="button" aria-label="Underline">U</button><button class="rt-btn rt-btn--strike" type="button" aria-label="Strikethrough">S</button></div>
  <div class="rt-group"><button class="rt-btn" type="button" aria-label="Align centre"><span class="icon icon-align-center-20"></span></button><button class="rt-btn" type="button" aria-label="Justify"><span class="icon icon-align-justify-20"></span></button><button class="rt-btn" type="button" aria-label="Align left"><span class="icon icon-align-left-20"></span></button><button class="rt-btn" type="button" aria-label="Align right"><span class="icon icon-align-right-20"></span></button></div>
  <div class="rt-group"><button class="rt-btn" type="button" aria-label="Bulleted list"><span class="icon icon-list-unordered-20"></span></button><button class="rt-btn" type="button" aria-label="Numbered list"><span class="icon icon-list-ordered-20"></span></button></div>
  <div class="rt-group"><button class="rt-btn" type="button" aria-label="Link"><span class="icon icon-link-20"></span></button><button class="rt-btn" type="button" aria-label="Table"><span class="icon icon-sheet-20"></span></button></div>
  <div class="rt-group"><button class="rt-btn" type="button" aria-label="Code"><span class="icon icon-code-xml-20"></span></button><button class="rt-btn" type="button" aria-label="Fullscreen"><span class="icon icon-expand-20"></span></button></div>
</div>

<!-- inside an editor (.rt-toolbar--editor, fill #F5F5F8, 28 high) (Figma: 1868:10163) -->
<div style="width:740px">
  <div class="rt-toolbar rt-toolbar--editor">
    <div class="rt-group"><button class="rt-btn" type="button" aria-label="Undo"><span class="icon icon-rotate-ccw-20"></span></button><button class="rt-btn rt-btn--redo" type="button" aria-label="Redo"><span class="icon icon-rotate-ccw-20"></span></button></div>
    <div class="rt-group rt-group--pilcrow"><button class="rt-btn" type="button" aria-label="Paragraph"><span class="icon icon-pilcrow-34x20"></span></button></div>
    <div class="rt-group"><button class="rt-btn rt-btn--bold" type="button" aria-label="Bold">B</button><button class="rt-btn rt-btn--italic" type="button" aria-label="Italic">I</button><button class="rt-btn rt-btn--underline" type="button" aria-label="Underline">U</button><button class="rt-btn rt-btn--strike" type="button" aria-label="Strikethrough">S</button></div>
    <div class="rt-group"><button class="rt-btn" type="button" aria-label="Align centre"><span class="icon icon-align-center-20"></span></button><button class="rt-btn" type="button" aria-label="Justify"><span class="icon icon-align-justify-20"></span></button><button class="rt-btn" type="button" aria-label="Align left"><span class="icon icon-align-left-20"></span></button><button class="rt-btn" type="button" aria-label="Align right"><span class="icon icon-align-right-20"></span></button></div>
    <div class="rt-group"><button class="rt-btn" type="button" aria-label="Bulleted list"><span class="icon icon-list-unordered-20"></span></button><button class="rt-btn" type="button" aria-label="Numbered list"><span class="icon icon-list-ordered-20"></span></button></div>
    <div class="rt-group"><button class="rt-btn" type="button" aria-label="Link"><span class="icon icon-link-20"></span></button><button class="rt-btn" type="button" aria-label="Table"><span class="icon icon-sheet-20"></span></button></div>
    <div class="rt-group"><button class="rt-btn" type="button" aria-label="Code"><span class="icon icon-code-xml-20"></span></button><button class="rt-btn" type="button" aria-label="Fullscreen"><span class="icon icon-expand-20"></span></button></div>
  </div>
</div>

<!-- button states (pressed B, hover, disabled) [EXTENDED] -->
<div class="rt-toolbar" style="height:auto;box-shadow:none">
  <div class="rt-group" style="box-shadow:none"><button class="rt-btn rt-btn--bold is-active" type="button">B</button><button class="rt-btn rt-btn--italic is-hover" type="button">I</button><button class="rt-btn rt-btn--underline" type="button" disabled>U</button></div>
</div>
```

### editor / text area

*Figma:* 1868:10164 (rich), 1868:10163 plain

Container: fill #FFFFFF, stroke #E5E7EC 1px (outside), radius 4, clip. Rich editor = toolbar + body (padding 12/8/12/12, Regular 12, placeholder #7C8DAC); plain text area = body only, 80 high. Focus / error are Extended (same recipe as the fields).

```html
<!-- rich editor (Figma: 1868:10164) -->
<div style="width:740px">
  <div class="field">
    <div class="field__label">Deal Terms</div>
    <div class="editor">
      <div class="rt-toolbar rt-toolbar--editor">
        <div class="rt-group"><button class="rt-btn" type="button" aria-label="Undo"><span class="icon icon-rotate-ccw-20"></span></button><button class="rt-btn rt-btn--redo" type="button" aria-label="Redo"><span class="icon icon-rotate-ccw-20"></span></button></div>
        <div class="rt-group rt-group--pilcrow"><button class="rt-btn" type="button" aria-label="Paragraph"><span class="icon icon-pilcrow-34x20"></span></button></div>
        <div class="rt-group"><button class="rt-btn rt-btn--bold" type="button" aria-label="Bold">B</button><button class="rt-btn rt-btn--italic" type="button" aria-label="Italic">I</button><button class="rt-btn rt-btn--underline" type="button" aria-label="Underline">U</button><button class="rt-btn rt-btn--strike" type="button" aria-label="Strikethrough">S</button></div>
        <div class="rt-group"><button class="rt-btn" type="button" aria-label="Align centre"><span class="icon icon-align-center-20"></span></button><button class="rt-btn" type="button" aria-label="Justify"><span class="icon icon-align-justify-20"></span></button><button class="rt-btn" type="button" aria-label="Align left"><span class="icon icon-align-left-20"></span></button><button class="rt-btn" type="button" aria-label="Align right"><span class="icon icon-align-right-20"></span></button></div>
        <div class="rt-group"><button class="rt-btn" type="button" aria-label="Bulleted list"><span class="icon icon-list-unordered-20"></span></button><button class="rt-btn" type="button" aria-label="Numbered list"><span class="icon icon-list-ordered-20"></span></button></div>
        <div class="rt-group"><button class="rt-btn" type="button" aria-label="Link"><span class="icon icon-link-20"></span></button><button class="rt-btn" type="button" aria-label="Table"><span class="icon icon-sheet-20"></span></button></div>
        <div class="rt-group"><button class="rt-btn" type="button" aria-label="Code"><span class="icon icon-code-xml-20"></span></button><button class="rt-btn" type="button" aria-label="Fullscreen"><span class="icon icon-expand-20"></span></button></div>
      </div>
      <div class="editor__body" style="--body-h:136px"><span class="is-placeholder">Enter Deal Terms</span></div>
    </div>
  </div>
</div>

<!-- plain text area (Figma: 1868:10164) -->
<div style="width:740px">
  <div class="field">
    <div class="field__label">Termination Fee</div>
    <div class="editor">
      <div class="editor__body" style="--body-h:80px"><span class="is-placeholder">e.g. Company - $32.7M / Parent - $40.0M</span></div>
    </div>
  </div>
</div>

<!-- focus [EXTENDED] -->
<div style="width:360px">
  <div class="field">
    <div class="editor" style="box-shadow:0 0 0 1px var(--color-border-brand)">
      <div class="editor__body" style="--body-h:60px">Typing…</div>
    </div>
  </div>
</div>

<!-- error [EXTENDED] -->
<div style="width:360px">
  <div class="editor is-error">
    <div class="editor__body" style="--body-h:60px"><span class="is-placeholder">Required</span></div>
  </div>
</div>
```


---

## DAY

### DAY (calendar cell)

*Figma:* set 553:547 (10 variants)

Cell VERTICAL gap 8, padding 8/12/12/12, stroke right + bottom 1px inside. Header 24 high: day number Geist Medium 14 + "View More" chip (Inter Medium 12 #3675D2 on #3675D2@0.1). Tags use **Inter** (Regular 12, padding 3/4, radius 4, 24 high, the "..." is literal text) - Figma-drawn font oddity. Expanded variants hug (1092 / 1048 / 564 in Figma): ticker Geist Medium 12 UNDERLINE, description Inter Regular 10. 211-wide weekdays, 167-wide weekends.

```html
<!-- regular day 211x216 (Figma: 553:546) -->
<div class="day">
  <div class="day__head"><span class="day__num">1</span><span class="day__more">View More</span></div>
  <div class="day__items">
    <div class="day__tag">AAUC CN / 2259 HK</div>
    <div class="day__tag">AL / Sumitomo Corporation ...</div>
    <!-- ... 4 more <div class="day__tag"> like these ... -->
  </div>
</div>

<!-- prev month (Figma: 553:548) -->
<div class="day day--prev">
  <div class="day__head"><span class="day__num">29</span><span class="day__more">View More</span></div>
  <div class="day__items">
    <div class="day__tag">AMWD / MBC</div>
    <div class="day__tag">KW/Management – Fairfax ...</div>
    <div class="day__tag">NWE/BKH</div>
  </div>
</div>

<!-- next month (Figma: 553:566) -->
<div class="day day--next">
  <div class="day__head"><span class="day__num">1</span><span class="day__more">View More</span></div>
  <div class="day__items">
    <div class="day__tag">NWE/BKH</div>
    <div class="day__tag">SEM/Management/Welsh, ...</div>
    <div class="day__tag">VRSN / VeriSign, Inc.</div>
  </div>
</div>

<!-- weekend 167x216 (Figma: 553:3081) -->
<div class="day day--weekend">
  <div class="day__head"><span class="day__num">4</span></div>
  <div class="day__items">
    <div class="day__tag">AL / Sumitomo Corporation ...</div>
    <div class="day__tag">AMWD / MBC</div>
    <!-- ... 2 more <div class="day__tag"> like these ... -->
  </div>
</div>

<!-- weekend next month (Figma: 553:3370) -->
<div class="day day--next day--weekend">
  <div class="day__head"><span class="day__num">2</span></div>
  <div class="day__items">
    <div class="day__tag">KW/Management – Fairfax ...</div>
    <div class="day__tag">NWE/BKH</div>
    <div class="day__tag">SEM/Management/Welsh, ...</div>
  </div>
</div>

<!-- selected tag (outline #005268) (Figma: 721:2296) -->
<div class="day">
  <div class="day__head"><span class="day__num">2</span><span class="day__more">View More</span></div>
  <div class="day__items">
    <div class="day__tag">AAUC CN / 2259 HK</div>
    <div class="day__tag">AL / Sumitomo Corporation ...</div>
    <!-- ... 2 more <div class="day__tag"> like these ... -->
  </div>
</div>

<!-- Variant10 expanded regular + View More (Figma: 595:4253) -->
<div class="day day--expanded">
  <div class="day__head"><span class="day__num">2</span><span class="day__more">View More</span></div>
  <div class="day__items">
    <div class="day__event">
      <div class="day__event-title">AAUC CN / 2259 HK</div>
      <div class="day__event-desc">MX COFECE Deadline for decision on the transaction</div>
    </div>
    <div class="day__event">
      <div class="day__event-title">AL / Sumitomo Corporation</div>
      <div class="day__event-desc">Shareholder meeting to approve the merger</div>
    </div>
    <div class="day__event">
      <div class="day__event-title">VRSN / VeriSign, Inc.</div>
      <div class="day__event-desc">HSR waiting period expires at 11:59 pm</div>
    </div>
  </div>
</div>

<!-- Variant8 expanded regular, no chip (Figma: 599:2500) -->
<div class="day day--expanded">
  <div class="day__head"><span class="day__num">3</span></div>
  <div class="day__items">
    <div class="day__event">
      <div class="day__event-title">AAUC CN / 2259 HK</div>
      <div class="day__event-desc">MX COFECE Deadline for decision on the transaction</div>
    </div>
    <div class="day__event">
      <div class="day__event-title">AL / Sumitomo Corporation</div>
      <div class="day__event-desc">Shareholder meeting to approve the merger</div>
    </div>
    <div class="day__event">
      <div class="day__event-title">VRSN / VeriSign, Inc.</div>
      <div class="day__event-desc">HSR waiting period expires at 11:59 pm</div>
    </div>
  </div>
</div>

<!-- Variant7 expanded prev-month look (Figma: 599:2200) -->
<div class="day day--expanded day--prev">
  <div class="day__head"><span class="day__num">29</span><span class="day__more">View More</span></div>
  <div class="day__items">
    <div class="day__event">
      <div class="day__event-title">AAUC CN / 2259 HK</div>
      <div class="day__event-desc">MX COFECE Deadline for decision on the transaction</div>
    </div>
    <div class="day__event">
      <div class="day__event-title">AL / Sumitomo Corporation</div>
      <div class="day__event-desc">Shareholder meeting to approve the merger</div>
    </div>
    <div class="day__event">
      <div class="day__event-title">VRSN / VeriSign, Inc.</div>
      <div class="day__event-desc">HSR waiting period expires at 11:59 pm</div>
    </div>
  </div>
</div>

<!-- 10 expanded prev-month, no chip (Figma: 609:2183) -->
<div class="day day--expanded day--prev">
  <div class="day__head"><span class="day__num">30</span></div>
  <div class="day__items">
    <div class="day__event">
      <div class="day__event-title">AAUC CN / 2259 HK</div>
      <div class="day__event-desc">MX COFECE Deadline for decision on the transaction</div>
    </div>
    <div class="day__event">
      <div class="day__event-title">AL / Sumitomo Corporation</div>
      <div class="day__event-desc">Shareholder meeting to approve the merger</div>
    </div>
    <div class="day__event">
      <div class="day__event-title">VRSN / VeriSign, Inc.</div>
      <div class="day__event-desc">HSR waiting period expires at 11:59 pm</div>
    </div>
  </div>
</div>

<!-- Variant9 expanded weekend 167 (Figma: 599:2716) -->
<div class="day day--expanded day--weekend">
  <div class="day__head"><span class="day__num">4</span></div>
  <div class="day__items">
    <div class="day__event">
      <div class="day__event-title">AAUC CN / 2259 HK</div>
      <div class="day__event-desc">MX COFECE Deadline for decision on the transaction</div>
    </div>
    <div class="day__event">
      <div class="day__event-title">AL / Sumitomo Corporation</div>
      <div class="day__event-desc">Shareholder meeting to approve the merger</div>
    </div>
    <div class="day__event">
      <div class="day__event-title">VRSN / VeriSign, Inc.</div>
      <div class="day__event-desc">HSR waiting period expires at 11:59 pm</div>
    </div>
  </div>
</div>

<!-- today (.is-today: #005268 stroke on all 4 sides) (Figma: 721:2425) -->
<div class="day day--expanded is-today">
  <div class="day__head"><span class="day__num">2</span><span class="day__more">View More</span></div>
  <div class="day__items">
    <div class="day__event">
      <div class="day__event-title">AAUC CN / 2259 HK</div>
      <div class="day__event-desc">MX COFECE Deadline for decision on the transaction</div>
    </div>
    <div class="day__event">
      <div class="day__event-title">AL / Sumitomo Corporation</div>
      <div class="day__event-desc">Shareholder meeting to approve the merger</div>
    </div>
    <div class="day__event">
      <div class="day__event-title">VRSN / VeriSign, Inc.</div>
      <div class="day__event-desc">HSR waiting period expires at 11:59 pm</div>
    </div>
  </div>
</div>
```

### DAY tag states

*Figma:* none - **EXTENDED** (not drawn in Figma)

Chip hover / focus are not drawn: hover = Grey 3 fill; text-overflow ellipsis replaces the typed "...".

```html
<!-- tag hover [EXTENDED] -->
<div style="width:200px">
  <div class="day__tag" style="background:var(--color-surface-muted)">AAUC CN / 2259 HK</div>
</div>

<!-- tag overflow ellipsis [EXTENDED] -->
<div style="width:120px">
  <div class="day__tag">AL / Sumitomo Corporation Holdings</div>
</div>
```


---

## Pills

### Status / deal-type / industry pills

*Figma:* 824:8247 ... 824:8502, 1720:6406-6416, 1868:10646

Radius 16, gap 10, padding 4/16, height 24, Geist Medium 12. Background = colour at 0.1 / 0.2 / 0.25 or opaque (Definitive, Cash Merger, Financials, Not Available); text opaque. Deal view: `.pill--lg` 32 high, padding 8/16. New Deal preview: `.pill--10` Medium 10. Colours: Foundations / Pill map.

```html
<!-- .pill--predeal -->
<span class="pill pill--predeal">Predeal</span>

<!-- .pill--proposal -->
<span class="pill pill--proposal">Proposal</span>

<!-- .pill--definitive -->
<span class="pill pill--definitive">Definitive</span>

<!-- .pill--terminated -->
<span class="pill pill--terminated">Terminated</span>

<!-- .pill--withdrawn -->
<span class="pill pill--withdrawn">Withdrawn</span>

<!-- .pill--spinoff-definitive -->
<span class="pill pill--spinoff-definitive">Spinoff - Definitive</span>

<!-- .pill--did-not-happen -->
<span class="pill pill--did-not-happen">Did Not Happen</span>

<!-- .pill--post-event -->
<span class="pill pill--post-event">Post-Event</span>

<!-- .pill--cash-merger -->
<span class="pill pill--cash-merger">Cash Merger</span>

<!-- .pill--cash-tender -->
<span class="pill pill--cash-tender">Cash Tender</span>

<!-- .pill--stock-merger -->
<span class="pill pill--stock-merger">Stock Merger</span>

<!-- .pill--dutch-auction -->
<span class="pill pill--dutch-auction">Dutch Auction</span>

<!-- .pill--investment -->
<span class="pill pill--investment">Investment</span>

<!-- .pill--exchange-offer -->
<span class="pill pill--exchange-offer">Exchange Offer</span>

<!-- .pill--not-available -->
<span class="pill pill--not-available">Not Available</span>

<!-- .pill--cash-stock-merger -->
<span class="pill pill--cash-stock-merger">Cash-Stock Merger</span>

<!-- industry-insurance (Figma: 1720:6411) -->
<span class="pill pill--industry-insurance">Insurance</span>

<!-- industry-financials (Figma: 1720:6406) -->
<span class="pill pill--industry-financials">Financials</span>

<!-- .pill--lg (Deal view, 32) (Figma: 1720:6147) -->
<span class="pill pill--definitive pill--lg">Definitive</span>

<!-- .pill--10 (New Deal preview) (Figma: 1868:10287) -->
<span class="pill pill--cash-merger pill--10">Cash Merger</span>

<!-- .pill--empty .pill--10 (Figma: 1868:10646) -->
<span class="pill pill--empty pill--10">Deal Status</span>

<!-- .pill--grey (Admin dividend, visual estimate) -->
<span class="pill pill--grey">Paying</span>
```

### Priority, event status & "new" text

*Figma:* 824:8245/8281/8317, 414:3009, 414:2811

Not pills: plain coloured text. Regulatory risk Geist Medium 12 (Low #ECA100, Medium #FF8132, High #DA4D43); event status Regular 12 (Actual #3675D2, Expected #7C8DAC); "New Event / New Comment" Regular 12 #179484.

```html
<!-- .priority--low (Figma: 824:8245) -->
<span class="priority priority--low">Low</span>

<!-- .priority--medium (Figma: 824:8281) -->
<span class="priority priority--medium">Medium</span>

<!-- .priority--high (Figma: 824:8317) -->
<span class="priority priority--high">High</span>

<!-- .event-status (Figma: 414:3009) -->
<span class="event-status">Actual</span>

<!-- .event-status--expected -->
<span class="event-status event-status--expected">Expected</span>

<!-- .text-new (Figma: 414:2811) -->
<span class="text-new">New Event</span>
```

### Filter chips + count badge

*Figma:* 1526:6279, 1526:6281, 1615:4378

Default chip 111x28: fill #F5F5F8, radius 16, padding 6/4/6/16, gap 8, Regular 12, trailing 20x20 count badge (#E5E7EC, radius 24, Medium 10 #7C8DAC). Active "All" 63x28: fill #005268@0.1 + stroke #005268 1px, padding 6/24, Medium 12 #005268. Foundations also shows a trailing "close icon" variant - both occupy the same trailing slot.

```html
<!-- default (Cash Deals 21) (Figma: 1526:6279) -->
<button class="chip" type="button">Cash Deals <span class="count-badge">21</span></button>

<!-- active (All) (Figma: 1526:6281) -->
<button class="chip is-active" type="button">All</button>

<!-- with close icon (Figma: 414:2898) -->
<button class="chip" type="button">Stock Deals <img class="circle-x" src="assets/circle-x-16.svg" alt="close"></button>

<!-- count badge (Figma: 1615:4378) -->
<span class="count-badge">21</span>

<!-- hover [EXTENDED] -->
<button class="chip is-hover" type="button">Cash Deals <span class="count-badge">21</span></button>

<!-- no trailing element (.chip--plain) [EXTENDED] -->
<button class="chip chip--plain" type="button">Spinoffs</button>
```

### Segmented toggles

*Figma:* 1526:6273, 1988:7527, 824:8673, 721:2260

Open / Closed Deals 267x32 (fill #F5F5F8, active #005268 / white Medium 12, inactive Regular 12 with a 1px white divider). "All Deals / Drafts (148)" 211x32 (active = white + #005268@0.1 fill, stroke #005268 1.5, text #005268). View-density toggle 64x32 (active: teal #005268@0.2 + stroke on the expanded screen, blue #3675D2@0.1 on collapsed / Drafts - both kept). Calendar Day | Week | Month 346x32.

```html
<!-- Open / Closed Deals (Figma: 1526:6273) -->
<div class="segmented"><button class="segmented__item is-active" type="button">Open Deals</button><button class="segmented__item" type="button">Closed Deals</button></div>

<!-- All Deals / Drafts (148) (Figma: 1988:7527) -->
<div class="segmented segmented--buttons"><button class="segmented__item is-active" type="button">All Deals</button><button class="segmented__item" type="button">Drafts (148)</button></div>

<!-- Drafts active (Figma: 1988:6482) -->
<div class="segmented segmented--buttons"><button class="segmented__item" type="button">All Deals</button><button class="segmented__item is-active" type="button">Drafts (148)</button></div>

<!-- segment hover [EXTENDED] -->
<div class="segmented"><button class="segmented__item is-active" type="button">Open Deals</button><button class="segmented__item is-hover" type="button">Closed Deals</button></div>

<!-- view toggle - teal (expanded) (Figma: 824:8673) -->
<div class="view-toggle"><button class="view-toggle__item" type="button"><span class="icon icon-list-chevrons-down-up-32"></span></button><button class="view-toggle__item is-active" type="button"><span class="icon icon-list-chevrons-up-down-32"></span></button></div>

<!-- view toggle - blue (collapsed / Drafts) (Figma: 1988:7520) [ALTERNATE] -->
<div class="view-toggle view-toggle--alt-blue"><button class="view-toggle__item is-active" type="button"><span class="icon icon-list-chevrons-down-up-32"></span></button><button class="view-toggle__item" type="button"><span class="icon icon-list-chevrons-up-down-32"></span></button></div>

<!-- sort button 32x32 (Figma: 824:8670) -->
<span class="icon icon-arrow-up-down-32-button" role="button" tabindex="0" aria-label="Sort direction"></span>

<!-- Day | Week | Month (Figma: 721:2260) -->
<div class="day-toggle"><button class="day-toggle__item" type="button">Day</button><button class="day-toggle__item" type="button">Week</button><button class="day-toggle__item is-active" type="button">Month</button></div>

<!-- Day toggle inactive hover [EXTENDED] -->
<div class="day-toggle"><button class="day-toggle__item" type="button">Day</button><button class="day-toggle__item is-hover" type="button" style="background:var(--color-surface-muted)">Week</button><button class="day-toggle__item is-active" type="button">Month</button></div>
```

### Links

*Figma:* 1463:6149, 1720:6333, 824:8583, 2159:13812

Figma draws no link hover - only the cursor is added.

```html
<!-- .link (deal title) (Figma: 1463:6149) -->
<a class="link" href="#">AES/GIP/EQT Consortium</a>

<!-- .link--external (Figma: 414:2860) -->
<a class="link link--external" href="#">AHL / 8630 JT</a>

<!-- .link--action (Figma: 824:8583) -->
<a class="link link--action" href="#">Reset All</a>

<!-- .link--action.is-disabled (Figma: 1988:5650) -->
<a class="link link--action is-disabled" href="#">Reset All</a>

<!-- .link--muted (Figma: 721:2318) -->
<a class="link link--muted" href="#">AMWD / MBC</a>

<!-- .link--url (Figma: 1720:6333) -->
<a class="link link--url" href="#">https://www.ftc.gov/legal-library</a>

<!-- .link--login (Figma: 2159:13812) -->
<a class="link link--login" href="#">Forgot Password?</a>

<!-- .link--title (Figma: 414:3120) -->
<a class="link link--title" href="#">All Deals</a>

<!-- .link-chip (Figma: 721:2499) -->
<a class="link-chip" href="#"><img src="assets/logo-red-bars.svg" alt="">Honeywell press release</a>
```


---

## Navigation

### Left navigation - 72 / 191 / 219

*Figma:* Nav min 924:3461, Nav open 414:2723, Nav max 414:2752

Canonical shell (Section 1): fill #FFF, stroke #F5F5F8 1px inside, radius [0,0,8,0], padding 16, height 1032. **Nav min 72** = OG monogram + four 40x40 icon items (selected = #005268@0.1). **Nav open 191** = wordmark 72x40 + "Risk Arbitrage" Medium 14 #7C8DAC + collapse icon; items 159x40 (icon 32 + label Medium 12, gap 12); the Open Deals chevron says "expanded" but no sub-list is drawn (half-state - kept). **Nav max 219** adds the eight sub-items (163x40; active = #F5F5F8 + 3px left #005268, radius [0,4,4,0]). Chevron asset points UP; collapsed sections flip it. Icon colour is #005268 in every state. Shown at 50%.

```html
<!-- Nav min 72x1032 (Figma: 924:3461) -->
<nav class="nav nav--min">
  <div class="nav__brand"><img src="assets/og-mark.svg" alt="OG"></div>
  <div class="nav__list"><a class="nav-item is-active" href="#"><span class="icon icon-noun-book"></span></a><a class="nav-item" href="#"><span class="icon icon-noun-complete-task"></span></a><a class="nav-item" href="#"><span class="icon icon-noun-history-2"></span></a><a class="nav-item" href="#"><span class="icon icon-noun-history-1"></span></a></div>
</nav>

<!-- Nav open 191x1032 (Figma: 414:2723) -->
<nav class="nav nav--open">
  <div class="nav__header">
    <img class="nav__wordmark" src="assets/og-wordmark.svg" alt="Oscar Gruss">
    <div class="nav__title-row"><span class="nav__title">Risk Arbitrage</span><span class="icon icon-panel-left-16"></span></div>
  </div>
  <div class="nav__list"><a class="nav-item is-active is-expanded" href="#"><span class="icon icon-noun-book"></span><span class="nav-item__label"><span>Open Deals</span><span class="icon icon-chevron-up-24-nav nav-item__chevron"></span></span></a><a class="nav-item" href="#"><span class="icon icon-noun-complete-task"></span><span class="nav-item__label"><span>Closed Deals</span><span class="icon icon-chevron-up-24-nav nav-item__chevron"></span></span></a><a class="nav-item" href="#"><span class="icon icon-noun-history-2"></span><span class="nav-item__label"><span>History</span></span></a><a class="nav-item" href="#"><span class="icon icon-noun-history-1"></span><span class="nav-item__label"><span>Reports</span></span></a></div>
</nav>

<!-- Nav max 219x1032 (click the chevrons) (Figma: 414:2752) -->
<nav class="nav nav--max">
  <div class="nav__header">
    <img class="nav__wordmark" src="assets/og-wordmark.svg" alt="Oscar Gruss">
    <div class="nav__title-row"><span class="nav__title">Risk Arbitrage</span><span class="icon icon-panel-left-16"></span></div>
  </div>
  <div class="nav__list">
    <a class="nav-item is-active is-expanded" href="#"><span class="icon icon-noun-book"></span><span class="nav-item__label"><span>Open Deals</span><span class="icon icon-chevron-up-24-nav nav-item__chevron"></span></span></a>
    <div class="nav-sub">
      <a class="nav-subitem is-active" href="#">All Deals</a><a class="nav-subitem" href="#">Stock Deals</a>
      <!-- ... 6 more <a class="nav-subitem"> like these ... -->
    </div>
    <a class="nav-item" href="#"><span class="icon icon-noun-complete-task"></span><span class="nav-item__label"><span>Closed Deals</span><span class="icon icon-chevron-up-24-nav nav-item__chevron"></span></span></a><a class="nav-item" href="#"><span class="icon icon-noun-history-2"></span><span class="nav-item__label"><span>History</span></span></a><a class="nav-item" href="#"><span class="icon icon-noun-history-1"></span><span class="nav-item__label"><span>Reports</span></span></a>
  </div>
</nav>
```

### Nav with pull-tab (alternate presentation)

*Figma:* Group 212 2139:8207, Group 215 2139:8228 - *documented alternate*

Nav + 12px edge handle: union shape stroke #E5E7EC (nav component: #F5F5F8), radius 12 (nav 8); inner "Nav min" gap 42 and the 26x40 mark; expanded shows "Risk Arb DB" (conflicts with "Risk Arbitrage"). Never placed on a screen in Figma - documented alternate. Shown at 50%.

```html
<!-- Group 212 collapsed 84x1033 (Figma: 2139:8207) [ALTERNATE] -->
<div class="nav-handle">
  <nav class="nav nav--min">
    <div class="nav__brand nav__brand--alt-28"><img src="assets/og-mark.svg" alt="OG"></div>
    <div class="nav__list"><a class="nav-item is-active" href="#"><span class="icon icon-noun-book"></span></a><a class="nav-item" href="#"><span class="icon icon-noun-complete-task"></span></a><a class="nav-item" href="#"><span class="icon icon-noun-history-2"></span></a><a class="nav-item" href="#"><span class="icon icon-noun-history-1"></span></a></div>
  </nav>
  <span class="icon icon-chevron-right-6x10 nav-handle__chevron"></span>
</div>

<!-- Group 215 expanded 231x1033 (Figma: 2139:8228) [ALTERNATE] -->
<div class="nav-handle nav-handle--open">
  <nav class="nav nav--max">
    <div class="nav__header">
      <img class="nav__wordmark" src="assets/og-wordmark.svg" alt="Oscar Gruss">
      <div class="nav__title-row"><span class="nav__title">Risk Arb DB</span></div>
    </div>
    <div class="nav__list">
      <a class="nav-item is-active is-expanded" href="#"><span class="icon icon-noun-book"></span><span class="nav-item__label"><span>Open Deals</span><span class="icon icon-chevron-up-24-nav nav-item__chevron"></span></span></a>
      <div class="nav-sub">
        <a class="nav-subitem is-active" href="#">All Deals</a><a class="nav-subitem" href="#">Stock Deals</a>
        <!-- ... 6 more <a class="nav-subitem"> like these ... -->
      </div>
      <a class="nav-item" href="#"><span class="icon icon-noun-complete-task"></span><span class="nav-item__label"><span>Closed Deals</span><span class="icon icon-chevron-up-24-nav nav-item__chevron"></span></span></a><a class="nav-item" href="#"><span class="icon icon-noun-history-2"></span><span class="nav-item__label"><span>History</span></span></a><a class="nav-item" href="#"><span class="icon icon-noun-history-1"></span><span class="nav-item__label"><span>Reports</span></span></a>
    </div>
  </nav>
  <span class="icon icon-chevron-right-6x10 nav-handle__chevron"></span>
</div>
```

### Nav hover & collapsed tooltip

*Figma:* none - **EXTENDED** (not drawn in Figma)

Hover is not drawn anywhere: inactive items / sub-items take the Grey 4 fill. Collapsed icon-only items use the Extended `.tooltip`.

```html
<!-- item hover (.is-hover) [EXTENDED] -->
<nav class="nav nav--open" style="height:auto;width:191px">
  <div class="nav__list"><a class="nav-item is-hover" href="#"><span class="icon icon-noun-complete-task"></span><span class="nav-item__label"><span>Closed Deals</span><span class="icon icon-chevron-up-24-nav nav-item__chevron"></span></span></a></div>
</nav>

<!-- sub-item hover [EXTENDED] -->
<div class="nav-subitem is-hover" style="width:163px">Stock Deals</div>

<!-- collapsed tooltip [EXTENDED] -->
<span class="tooltip">Closed Deals</span>
```


---

## Tabs

### Page tabs

*Figma:* Frame 80 414:2891; tabs 414:2892 / 414:2894 / 414:2896

Every tab: height FIXED 32, width HUG, radius [4,4,0,0], text 12. **Canonical (Dashboard screen)**: ACTIVE = fill #F5F5F8 + 3px #005268 bottom stroke + Geist Medium 12 #005268, padding 12/24; INACTIVE fixed = 1px #F5F5F8 outline, Medium 12 #000; INACTIVE closable = padding 12/12/12/16 gap 16, Regular 12 + circle-x 16 (fill #E5E7EC, x #000). The strip sits at y72 (8px under the top bar); the content frame overlaps its bottom by 1px.

```html
<!-- canonical strip (Dashboard 414:2798) (Figma: 414:2891) -->
<div style="width:760px">
  <div class="tabbar" role="tablist">
    <div class="tab is-active" role="tab" aria-selected="true">Dashboard</div>
    <div class="tab" role="tab">Events Calendar</div>
    <div class="tab tab--closable" role="tab">All Deals<img class="tab__close" src="assets/circle-x-16.svg" alt="close"></div>
    <div class="tab tab--closable" role="tab">AHL / 8630 JT<img class="tab__close" src="assets/circle-x-16.svg" alt="close"></div>
    <div class="tab tab--closable" role="tab">Cash Bankrupcy<img class="tab__close" src="assets/circle-x-16.svg" alt="close"></div>
  </div>
</div>

<!-- active closable (Figma: 1720:6828) -->
<div style="width:760px">
  <div class="tabbar" role="tablist">
    <div class="tab is-active" role="tab" aria-selected="true">Dashboard</div>
    <div class="tab is-active tab--closable" role="tab" aria-selected="true">SSTK / GETY<img class="tab__close" src="assets/circle-x-16.svg" alt="close"></div>
  </div>
</div>
```

### Tab alternates (Figma inconsistencies)

*Figma:* 721:2257, 721:2388, 824:8212, 1868:10765, 1720:6515 - *documented alternate*

Other screens differ from Dashboard: inactive padding 12/16 (widths 94 / 124), active stroke 2px (week / All events / New Deal), active text black Medium (Events month) or black Regular (All Deals, New Deal), and the Deal screens place the strip 1px lower (y73). Kept as `.tab--alt-pad16 .tab--alt-stroke2 .tab--alt-text-black .tab--alt-regular .tabbar--alt-y73`.

```html
<!-- .tab--alt-pad16 (inactive 12/16) (Figma: 721:2257) [ALTERNATE] -->
<div style="width:760px">
  <div class="tabbar" role="tablist">
    <div class="tab tab--alt-pad16" role="tab">Dashboard</div>
    <div class="tab is-active tab--alt-text-black" role="tab" aria-selected="true">Events Calendar</div>
  </div>
</div>

<!-- .tab--alt-stroke2 + text-black (Figma: 721:2388) [ALTERNATE] -->
<div style="width:760px">
  <div class="tabbar" role="tablist">
    <div class="tab tab--alt-pad16" role="tab">Dashboard</div>
    <div class="tab is-active tab--alt-stroke2 tab--alt-text-black" role="tab" aria-selected="true">Events Calendar</div>
  </div>
</div>

<!-- .tab--alt-regular (All Deals / New Deal) (Figma: 824:8212) [ALTERNATE] -->
<div style="width:760px">
  <div class="tabbar" role="tablist">
    <div class="tab tab--alt-pad16" role="tab">Dashboard</div>
    <div class="tab is-active tab--closable tab--alt-regular" role="tab" aria-selected="true">All Deals<img class="tab__close" src="assets/circle-x-16.svg" alt="close"></div>
  </div>
</div>
```

### Tab hover, close hover & overflow

*Figma:* none - **EXTENDED** (not drawn in Figma)

Not drawn: hover = Grey 4 fill on inactive tabs; close chip darkens slightly; an overflowing strip scrolls horizontally (`.tabbar--scroll` + `.scrollable` skin).

```html
<!-- hover (.is-hover) [EXTENDED] -->
<div style="width:760px">
  <div class="tabbar" role="tablist">
    <div class="tab is-active" role="tab" aria-selected="true">Dashboard</div>
    <div class="tab is-hover" role="tab">Events Calendar</div>
  </div>
</div>

<!-- overflow (.tabbar--scroll) [EXTENDED] -->
<div style="width:420px">
  <div class="tabbar tabbar--scroll scrollable" role="tablist">
    <div class="tab is-active" role="tab" aria-selected="true">Dashboard</div>
    <div class="tab" role="tab">Events Calendar</div>
    <div class="tab tab--closable" role="tab">All Deals<img class="tab__close" src="assets/circle-x-16.svg" alt="close"></div>
    <div class="tab tab--closable" role="tab">AHL / 8630 JT<img class="tab__close" src="assets/circle-x-16.svg" alt="close"></div>
    <div class="tab tab--closable" role="tab">Cash Bankrupcy<img class="tab__close" src="assets/circle-x-16.svg" alt="close"></div>
  </div>
</div>
```


---

## Top bar

### Top bar, search & avatar

*Figma:* Frame 15 1567:4503, avatar 1567:4506

Frame 15: 1848x64 at (72,0), fill #FFFFFF, padding 16/48/8/16, SPACE_BETWEEN. Search 840x40 (fill #F5F5F8, stroke #E5E7EC, icon 16, Regular 16). Avatar 40x40: ring 32 (stroke #000 1.5) + initials Regular 14 in a fixed 19x18 box. The user menu is NOT drawn in Section 1 (it exists in Admin External, see Admin). Shown at 50%.

```html
<!-- default 1848x64 (Figma: 1567:4503) -->
<div class="topbar">
  <div class="search search--top"><span class="icon icon-search-16"></span><span class="search__text">Search</span></div>
  <div class="avatar"><span class="icon icon-avatar-circle"></span><span class="avatar__initials">SG</span></div>
</div>

<!-- Search screen: bordered + focused + typed (Figma: 1615:4438) -->
<div class="topbar topbar--bordered">
  <div class="search search--top is-focus"><span class="icon icon-search-16"></span><span class="search__text has-value">Get|</span></div>
  <div class="avatar"><span class="icon icon-avatar-circle"></span><span class="avatar__initials">SG</span></div>
</div>

<!-- avatar 40x40 (Figma: 1567:4506) -->
<div class="avatar"><span class="icon icon-avatar-circle"></span><span class="avatar__initials">SG</span></div>

<!-- avatar hover / open [EXTENDED] -->
<div class="avatar is-hover"><span class="icon icon-avatar-circle"></span><span class="avatar__initials">SG</span></div>
```

### Search dropdown

*Figma:* Frame 359 461:3415 (844x420), scrim 461:3414

Panel 844x420: fill #FFF, radius 8, effect style "Shadow", padding 16/0/8/0 gap 16. Filter row = three equal selects (265.33x32: Page / Author / Date). Result rows 812x60: fill #FFF + stroke #F5F5F8, icon 32 (#7C8DAC), path line Regular 12 #7C8DAC + match line with the query in Bold 12 #005268 (`<mark>`). Selected row = fill #F5F5F8 + stroke #E5E7EC. Section headings Medium 12 #A8B6CD with a trailing space. The scrim (#E5E7EC@0.2 + blur 20) covers everything right of the nav and below the top bar.

```html
<!-- dropdown (Figma: 461:3415) -->
<div style="position:relative;width:844px;height:430px">
  <div class="search-dropdown" style="position:relative;left:0;top:0">
    <div class="search-dropdown__filters">
      <div class="select"><span class="select__text">Page</span><span class="icon icon-chevron-down-16"></span></div>
      <div class="select"><span class="select__text">Author</span><span class="icon icon-chevron-down-16"></span></div>
      <div class="select"><span class="select__text">Date</span><span class="icon icon-calendar-16-component"></span></div>
    </div>
    <div class="search-dropdown__results">
      <div class="search-group search-group--divided">
        <div class="search-group__heading">Open Deals </div>
        <div class="search-result">
          <span class="icon icon-nav-book-grey-32 search-result__icon"></span>
          <div class="search-result__text">
            <div class="search-result__path">SSTK/GETY / Dates Summary / 02/19/2026</div>
            <div class="search-result__title">Federal Reserve <mark>Get</mark>ty Images and Shutterstock …</div>
          </div>
        </div>
      </div>
      <div class="search-group">
        <div class="search-group__heading">Dashboard </div>
        <div class="search-result">
          <span class="icon icon-nav-book-grey-32 search-result__icon"></span>
          <div class="search-result__text">
            <div class="search-result__path">Top Picks/ SSTK/GETY / Acquirer / Name</div>
            <div class="search-result__title"><mark>Get</mark>ty Images Holdings, Inc.</div>
          </div>
        </div>
        <div class="search-result is-active">
          <span class="icon icon-nav-calendar-32-grey search-result__icon"></span>
          <div class="search-result__text">
            <div class="search-result__path">Upcoming Events / Today</div>
            <div class="search-result__title">… the merger of Shutterstock with <mark>GET</mark>Y subject to proration …</div>
          </div>
        </div>
        <div class="search-result">
          <span class="icon icon-nav-comment-32-grey search-result__icon"></span>
          <div class="search-result__text">
            <div class="search-result__path">Recent Updates/ Comment</div>
            <div class="search-result__title">… shares of <mark>GET</mark>Y and $9.50 cash …</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- empty / loading / no results [EXTENDED] -->
<div class="search-dropdown" style="position:relative;left:0;top:0;width:420px">
  <div class="search-dropdown__empty">No results for "xyz"</div>
</div>
```

### Account menu (popover)

*Figma:* 1895:21153 - *outside Section 1*

Drawn only in Admin External: 236x112, fill #FFF, radius 8, effect style Shadow; two 236x56 rows (padding 16/0/16/16, gap 16, Regular 16 #000), row 1 = Grey 4 (hover / active) with square-user-round #7C8DAC, row 2 = "Log out" with log-out #DA4D43. Absolute position (1661,64) as `.account-menu--float`. Generic `.menu` is Extended.

```html
<!-- account menu (Figma: 1895:21153) -->
<div class="account-menu">
  <div class="account-menu__item is-active"><span class="icon icon-square-user-round-24"></span><span>Account Settings</span></div>
  <div class="account-menu__item"><span class="icon icon-log-out-24"></span><span>Log out</span></div>
</div>

<!-- generic dropdown menu (.menu) [EXTENDED] -->
<div class="menu">
  <div class="menu__item is-active">Announced Date</div>
  <div class="menu__item">Expected Close Date</div>
  <div class="menu__item is-hover">Last Updated</div>
</div>
```


---

## Tables

### Table - dashboard deals

*Figma:* 1463:6125 (884x796), header 1463:6126

Shared table system: rows are H stacks of cells; row = cell height + 1px bottom stroke (#E5E7EC header, #E5E7EC dashboard rows / #F5F5F8 lists), cell = 1px right stroke. Column widths via `style="--w:312px"` (FIXED) or `.table__cell--fill`. Dashboard: columns 312 / 110 / 110 / 167 / 185, outer stroke #E5E7EC 1px OUTSIDE, radius [4,4,0,0], header fill #F5F5F8 Geist **Medium** 12 (list screens use SemiBold) with trailing sort / filter icons (#7C8DAC), rows 32 (HUG 25 / 41 when text wraps), Deal Title = Medium 12 UNDERLINE link, dates LEFT. All rows are #FFFFFF - Figma draws no zebra / hover / selected.

```html
<div style="width:884px;height:420px;overflow:hidden">
  <div class="table table--deals deals-panel__table">
    <div class="table__head">
      <div class="table__cell table__cell--sort" style="--w:312px"><span>Deal Title</span><span class="icon icon-sort-arrows-13x11"></span></div>
      <div class="table__cell table__cell--sort" style="--w:110px"><span>Start Date</span><span class="icon icon-sort-arrows-13x11"></span></div>
      <div class="table__cell table__cell--sort" style="--w:110px"><span>End Date</span><span class="icon icon-sort-arrows-13x11"></span></div>
      <div class="table__cell table__cell--sort" style="--w:167px"><span>Status</span><span class="icon icon-funnel-13x13"></span></div>
      <div class="table__cell table__cell--sort" style="--w:185px"><span>Deal Type</span><span class="icon icon-funnel-16"></span></div>
    </div>
    <div class="table__body">
      <div class="table__row">
        <div class="table__cell" style="--w:312px"><a class="link" href="#">AES/GIP/EQT Consortium</a></div>
        <div class="table__cell" style="--w:110px">02/02/2026</div>
        <div class="table__cell" style="--w:110px">05/05/2026</div>
        <div class="table__cell" style="--w:167px">Predeal</div>
        <div class="table__cell" style="--w:185px">Cash Merger</div>
      </div>
      <div class="table__row">
        <div class="table__cell" style="--w:312px"><a class="link" href="#">AIV/</a></div>
        <div class="table__cell" style="--w:110px">02/05/2026</div>
        <div class="table__cell" style="--w:110px">05/08/2026</div>
        <div class="table__cell" style="--w:167px">Terminated</div>
        <div class="table__cell" style="--w:185px">Cash Tender</div>
      </div>
      <!-- ... 9 more <div class="table__row"> like these ... -->
    </div>
  </div>
</div>
```

### Table - row hover, selected row, sorted header

*Figma:* none - **EXTENDED** (not drawn in Figma)

Opt-in only (`.table--hoverable`, `.is-selected`, `.is-sorted`): hover = Grey 4 fill, selected = brand tint 10%, sorted / filtered header icon turns #005268. Default tables stay exactly as drawn.

```html
<!-- hover / selected row + sorted header [EXTENDED] -->
<div style="width:520px">
  <div class="table table--deals table--hoverable">
    <div class="table__head">
      <div class="table__cell table__cell--sort is-sorted" style="--w:260px"><span>Deal Title</span><span class="icon icon-sort-arrows-13x11"></span></div>
      <div class="table__cell table__cell--sort is-filtered" style="--w:260px"><span>Status</span><span class="icon icon-funnel-13x13"></span></div>
    </div>
    <div class="table__body">
      <div class="table__row is-hover">
        <div class="table__cell" style="--w:260px"><a class="link" href="#">AES/GIP/EQT Consortium</a></div>
        <div class="table__cell" style="--w:260px">Predeal</div>
      </div>
      <div class="table__row is-selected">
        <div class="table__cell" style="--w:260px"><a class="link" href="#">AIV/</a></div>
        <div class="table__cell" style="--w:260px">Definitive</div>
      </div>
    </div>
  </div>
</div>
```

### Table - All Deals / Drafts list

*Figma:* 824:8213 (1343), 1988:6732 / 1988:5752 (1381), expanded row 824:8263

Header 30 high, SemiBold 12 #000, no icons; rows 41 (cell 40, pad 4/8), row stroke #F5F5F8 on the expanded screen vs #E5E7EC on collapsed / Drafts (`.table--alt-row-line-grey3`). Dates CENTRED (dashboard: LEFT). Deal Title cell: company (Regular 12 #000) over tickers (Medium 12 #7C8DAC; swapped rows reverse the roles). Status / type = pills at (8,8). Activity = calendar #7541A3 + comment #3090C0 counts. Expanded accordion row: fill #FBFBFC, AI sparkle 16 + Regular 12 text (first 7 characters are spaces: indent 22px, visual estimate). Collapsed adds an Actions column (bell / bookmark active = filled, inactive = outline; Drafts shows pencil + trash).

```html
<!-- expanded 1343 (824:8213) (Figma: 824:8213) -->
<div style="width:1343px">
  <div class="table table--list">
    <div class="table__head">
      <div class="table__cell" style="--w:336px">Deal Title</div>
      <div class="table__cell is-center" style="--w:110px">Last Updated</div>
      <div class="table__cell is-center" style="--w:110px">Start Date</div>
      <div class="table__cell is-center" style="--w:110px">End Date</div>
      <div class="table__cell is-center" style="--w:110px">Regulatory Risk</div>
      <div class="table__cell" style="--w:189px">Status</div>
      <div class="table__cell" style="--w:190px">Deal Type</div>
      <div class="table__cell" style="--w:80px">Deal Value</div>
      <div class="table__cell is-center" style="--w:108px">End Date</div>
    </div>
    <div class="table__body">
      <div class="table__row">
        <div class="table__cell" style="--w:336px">
          <div class="deal-title-cell"><span class="deal-title-cell__company">Shutterstock / Getty Images Holdings, Inc</span><span class="deal-title-cell__ticker">SSTK / GETTY</span></div>
        </div>
        <div class="table__cell is-center" style="--w:110px">01/01/2026</div>
        <div class="table__cell is-center" style="--w:110px">03/03/2026</div>
        <div class="table__cell is-center" style="--w:110px">06/06/2026</div>
        <div class="table__cell is-center" style="--w:110px"><span class="priority priority--low">Low</span></div>
        <div class="table__cell" style="--w:189px"><span class="pill pill--predeal">Predeal</span></div>
        <div class="table__cell" style="--w:190px"><span class="pill pill--cash-merger">Cash Merger</span></div>
        <div class="table__cell" style="--w:80px"><span class="table__value">$1.0B</span></div>
        <div class="table__cell is-center" style="--w:108px">
          <div class="activity"><span class="activity__item"><span class="icon icon-calendar-16 icon-c-purple"></span>2</span><span class="activity__item"><span class="icon icon-comment-16 icon-c-sky"></span>1</span></div>
        </div>
      </div>
      <div class="table__detail">
        <img class="table__detail-icon" src="assets/noun-ai-sparkle.svg" alt="">
        <div class="table__detail-text">Getty Images and Shutterstock announced an all-stock and cash merger valued at approximately $3.7 billion; the combined company is expected to retain both brands and serve creative, editorial and enterprise customers worldwide, subject to regulatory approvals.</div>
      </div>
      <div class="table__row">
        <div class="table__cell" style="--w:336px">
          <div class="deal-title-cell deal-title-cell--swapped"><span class="deal-title-cell__ticker">AMZN / BLOR</span><span class="deal-title-cell__company">Amazon.com Inc / Blue Origin</span></div>
        </div>
        <div class="table__cell is-center" style="--w:110px">02/06/2026</div>
        <div class="table__cell is-center" style="--w:110px">04/08/2026</div>
        <div class="table__cell is-center" style="--w:110px">07/11/2026</div>
        <div class="table__cell is-center" style="--w:110px"><span class="priority priority--medium">Medium</span></div>
        <div class="table__cell" style="--w:189px"><span class="pill pill--definitive">Definitive</span></div>
        <div class="table__cell" style="--w:190px"><span class="pill pill--dutch-auction">Dutch Auction</span></div>
        <div class="table__cell" style="--w:80px"><span class="table__value">$2.1B</span></div>
        <div class="table__cell is-center" style="--w:108px">
          <div class="activity"><span class="activity__item"><span class="icon icon-calendar-16 icon-c-purple"></span>3</span><span class="activity__item"><span class="icon icon-comment-16 icon-c-sky"></span>2</span></div>
        </div>
      </div>
      <div class="table__row">
        <div class="table__cell" style="--w:336px">
          <div class="deal-title-cell"><span class="deal-title-cell__company">Hess Corporation / Chevron</span><span class="deal-title-cell__ticker">HES / CVX</span></div>
        </div>
        <div class="table__cell is-center" style="--w:110px">03/11/2026</div>
        <div class="table__cell is-center" style="--w:110px">05/13/2026</div>
        <div class="table__cell is-center" style="--w:110px">08/16/2026</div>
        <div class="table__cell is-center" style="--w:110px"><span class="priority priority--high">High</span></div>
        <div class="table__cell" style="--w:189px"><span class="pill pill--post-event">Post-Event</span></div>
        <div class="table__cell" style="--w:190px"><span class="pill pill--not-available">Not Available</span></div>
        <div class="table__cell" style="--w:80px"><span class="table__value">$3.2B</span></div>
        <div class="table__cell is-center" style="--w:108px">
          <div class="activity"><span class="activity__item"><span class="icon icon-calendar-16 icon-c-purple"></span>4</span><span class="activity__item"><span class="icon icon-comment-16 icon-c-sky"></span>3</span></div>
        </div>
      </div>
      <!-- ... 2 more <div class="table__row"> like these ... -->
      <div class="table__detail">
        <img class="table__detail-icon" src="assets/noun-ai-sparkle.svg" alt="">
        <div class="table__detail-text">Getty Images and Shutterstock announced an all-stock and cash merger valued at approximately $3.7 billion; the combined company is expected to retain both brands and serve creative, editorial and enterprise customers worldwide, subject to regulatory approvals.</div>
      </div>
    </div>
  </div>
</div>

<!-- collapsed 1381 + Actions (1988:6732) (Figma: 1988:6732) [ALTERNATE] -->
<div style="width:1381px">
  <div class="table table--list table--alt-row-line-grey3">
    <div class="table__head">
      <div class="table__cell" style="--w:289px">Deal Title</div>
      <div class="table__cell is-center" style="--w:110px">Last Updated</div>
      <div class="table__cell is-center" style="--w:110px">Start Date</div>
      <div class="table__cell is-center" style="--w:110px">End Date</div>
      <div class="table__cell is-center" style="--w:110px">Regulatory Risk</div>
      <div class="table__cell" style="--w:189px">Status</div>
      <div class="table__cell" style="--w:190px">Deal Type</div>
      <div class="table__cell" style="--w:80px">Deal Value</div>
      <div class="table__cell is-center" style="--w:104px">Activity</div>
      <div class="table__cell is-center" style="--w:89px">Actions</div>
    </div>
    <div class="table__body">
      <div class="table__row">
        <div class="table__cell" style="--w:289px">
          <div class="deal-title-cell"><span class="deal-title-cell__company">Shutterstock / Getty Images Holdings, Inc</span><span class="deal-title-cell__ticker">SSTK / GETTY</span></div>
        </div>
        <div class="table__cell is-center" style="--w:110px">01/01/2026</div>
        <div class="table__cell is-center" style="--w:110px">03/03/2026</div>
        <div class="table__cell is-center" style="--w:110px">06/06/2026</div>
        <div class="table__cell is-center" style="--w:110px"><span class="priority priority--low">Low</span></div>
        <div class="table__cell" style="--w:189px"><span class="pill pill--predeal">Predeal</span></div>
        <div class="table__cell" style="--w:190px"><span class="pill pill--cash-merger">Cash Merger</span></div>
        <div class="table__cell" style="--w:80px"><span class="table__value">$1.0B</span></div>
        <div class="table__cell is-center" style="--w:104px">
          <div class="activity"><span class="activity__item"><span class="icon icon-calendar-16 icon-c-purple"></span>2</span><span class="activity__item"><span class="icon icon-comment-16 icon-c-sky"></span>1</span></div>
        </div>
        <div class="table__cell is-center" style="--w:89px">
          <div class="row-actions"><span class="row-action row-action--bell"><span class="icon icon-bell-filled-14"></span></span><span class="row-action row-action--bookmark"><span class="icon icon-bookmark-outline-12x15"></span></span></div>
        </div>
      </div>
      <div class="table__row">
        <div class="table__cell" style="--w:289px">
          <div class="deal-title-cell deal-title-cell--swapped"><span class="deal-title-cell__ticker">AMZN / BLOR</span><span class="deal-title-cell__company">Amazon.com Inc / Blue Origin</span></div>
        </div>
        <div class="table__cell is-center" style="--w:110px">02/06/2026</div>
        <div class="table__cell is-center" style="--w:110px">04/08/2026</div>
        <div class="table__cell is-center" style="--w:110px">07/11/2026</div>
        <div class="table__cell is-center" style="--w:110px"><span class="priority priority--medium">Medium</span></div>
        <div class="table__cell" style="--w:189px"><span class="pill pill--definitive">Definitive</span></div>
        <div class="table__cell" style="--w:190px"><span class="pill pill--dutch-auction">Dutch Auction</span></div>
        <div class="table__cell" style="--w:80px"><span class="table__value">$2.1B</span></div>
        <div class="table__cell is-center" style="--w:104px">
          <div class="activity"><span class="activity__item"><span class="icon icon-calendar-16 icon-c-purple"></span>3</span><span class="activity__item"><span class="icon icon-comment-16 icon-c-sky"></span>2</span></div>
        </div>
        <div class="table__cell is-center" style="--w:89px">
          <div class="row-actions"><span class="row-action row-action--bell"><span class="icon icon-bell-14x16-orange"></span></span><span class="row-action row-action--bookmark"><span class="icon icon-bookmark-12x15-blue"></span></span></div>
        </div>
      </div>
      <!-- ... 2 more <div class="table__row"> like these ... -->
    </div>
  </div>
</div>
```

### Table - Events (Day view)

*Figma:* 721:2499 (1752x1197)

Columns 498 / 554 / 99 / 300.5 / 300.5; header 25 high SemiBold 12 with bottom stroke #F5F5F8; cell padding 4/12, right stroke #E5E7EC; rows 25 (33 with a Join button). Related link chip = fill #F5F5F8, 24 high, Regular 12 UNDERLINE.

```html
<div style="width:1752px">
  <div class="table table--events">
    <div class="table__head">
      <div class="table__cell" style="--w:498px">Deal Title</div>
      <div class="table__cell" style="--w:554px">Agency/Event</div>
      <div class="table__cell" style="--w:99px">Status</div>
      <div class="table__cell" style="--w:300.5px">Comments</div>
      <div class="table__cell" style="--w:300.5px">Related Links</div>
    </div>
    <div class="table__body">
      <div class="table__row">
        <div class="table__cell" style="--w:498px"><a class="link" href="#">AAUC CN / 2259 HK</a></div>
        <div class="table__cell" style="--w:554px">MX COFECE Deadline for decision</div>
        <div class="table__cell" style="--w:99px"><span class="event-status">Actual</span></div>
        <div class="table__cell" style="--w:300.5px">Comment text for this event</div>
        <div class="table__cell" style="--w:300.5px"><a class="btn-join btn-join--sm" href="#"><img src="assets/zoom-logo.svg" alt="">Join the meeting</a></div>
      </div>
      <div class="table__row">
        <div class="table__cell" style="--w:498px"><a class="link" href="#">AL / Sumitomo Corporation</a></div>
        <div class="table__cell" style="--w:554px">Shareholder meeting</div>
        <div class="table__cell" style="--w:99px"><span class="event-status event-status--expected">Expected</span></div>
        <div class="table__cell" style="--w:300.5px">Comment text for this event</div>
        <div class="table__cell" style="--w:300.5px"><a class="link-chip" href="#"><img src="assets/logo-red-bars.svg" alt="">Honeywell press release</a></div>
      </div>
      <!-- ... 3 more <div class="table__row"> like these ... -->
    </div>
  </div>
</div>
```

### Table - Dates Summary (Deal view) + Edit / New Deal timeline

*Figma:* 1720:6665, 1720:6286, 1868:10182

**View** (1720:6665): fill #FFF, stroke #E5E7EC 1px INSIDE, radius **8**, header 32 #F5F5F8; columns 113 / 99 / 273 / 273 / 174; Date header Geist Medium 10, other headers SemiBold 12 (kept). **Edit / New Deal** (1720:6286): radius **4**, columns 113 / 80 / 234 / 234 / 234 / 32 (New Deal: 170s), padding 8/12 everywhere, header Medium 10, data Regular 10 (event name Medium 10, link Regular 10 UNDERLINE #3675D2), delete = trash 12 #DA4D43, add row 32 high with placeholders Regular 10 #7C8DAC and a 20x20 + button.

```html
<!-- view - .table--summary (radius 8) (Figma: 1720:6665) -->
<div style="width:932px">
  <div class="table table--summary">
    <div class="table__head">
      <div class="table__cell table__cell--date" style="--w:113px">Date</div>
      <div class="table__cell" style="--w:99px">Status</div>
      <div class="table__cell" style="--w:273px">Agency/Event</div>
      <div class="table__cell" style="--w:273px">Comments</div>
      <div class="table__cell" style="--w:174px">Related Links</div>
    </div>
    <div class="table__body">
      <div class="table__row">
        <div class="table__cell table__cell--date" style="--w:113px">02/19/2026</div>
        <div class="table__cell" style="--w:99px"><span class="event-status">Actual</span></div>
        <div class="table__cell" style="--w:273px">FTC</div>
        <div class="table__cell" style="--w:273px">Second request received from the FTC</div>
        <div class="table__cell table__cell--center-v" style="--w:174px"><a class="btn-join btn-join--sm" href="#"><img src="assets/zoom-logo.svg" alt="">Join the meeting</a></div>
      </div>
      <div class="table__row">
        <div class="table__cell table__cell--date" style="--w:113px">03/12/2026</div>
        <div class="table__cell" style="--w:99px"><span class="event-status event-status--expected">Expected</span></div>
        <div class="table__cell" style="--w:273px">Shareholder vote</div>
        <div class="table__cell" style="--w:273px">Special meeting to approve the merger</div>
        <div class="table__cell table__cell--center-v" style="--w:174px"><a class="btn-join btn-join--sm" href="#"><img src="assets/zoom-logo.svg" alt="">Join the meeting</a></div>
      </div>
      <div class="table__row">
        <div class="table__cell table__cell--date" style="--w:113px">04/30/2026</div>
        <div class="table__cell" style="--w:99px"><span class="event-status event-status--expected">Expected</span></div>
        <div class="table__cell" style="--w:273px">Outside date</div>
        <div class="table__cell" style="--w:273px">Original outside date under the merger agreement</div>
        <div class="table__cell table__cell--center-v" style="--w:174px"></div>
      </div>
    </div>
  </div>
</div>

<!-- edit - .table--timeline (radius 4) (Figma: 1720:6286) -->
<div style="width:932px">
  <div class="table table--timeline">
    <div class="table__head">
      <div class="table__cell" style="--w:113px">Date</div>
      <div class="table__cell" style="--w:80px">Actual</div>
      <div class="table__cell" style="--w:234px">Agency/Event</div>
      <div class="table__cell" style="--w:234px">Comments</div>
      <div class="table__cell" style="--w:234px">Link</div>
      <div class="table__cell" style="--w:32px"></div>
    </div>
    <div class="table__body">
      <div class="table__row">
        <div class="table__cell" style="--w:113px">02/19/2026</div>
        <div class="table__cell" style="--w:80px">Actual</div>
        <div class="table__cell" style="--w:234px"><span class="table__event-name">FTC</span></div>
        <div class="table__cell" style="--w:234px">Second request received</div>
        <div class="table__cell" style="--w:234px"><span class="link link--url">https://www.ftc.gov/legal-library/browse/cases-proceedings</span></div>
        <div class="table__cell table__cell--action" style="--w:32px"><button class="table__delete" type="button" aria-label="Delete row"><span class="icon icon-trash-12"></span></button></div>
      </div>
      <div class="table__row table__row--line-strong">
        <div class="table__cell" style="--w:113px">03/12/2026</div>
        <div class="table__cell" style="--w:80px">Expected</div>
        <div class="table__cell" style="--w:234px"><span class="table__event-name">Shareholder vote</span></div>
        <div class="table__cell" style="--w:234px">Special meeting</div>
        <div class="table__cell" style="--w:234px"><span class="link link--url">https://example.com/proxy</span></div>
        <div class="table__cell table__cell--action" style="--w:32px"><button class="table__delete" type="button" aria-label="Delete row"><span class="icon icon-trash-12"></span></button></div>
      </div>
      <div class="table__row table__row--add">
        <div class="table__cell" style="--w:113px"><span class="table__placeholder">dd/mm/yyyy</span><span class="icon icon-calendar-16-component"></span></div>
        <div class="table__cell" style="--w:80px"><span class="table__placeholder">Select</span><span class="icon icon-chevron-down-16-select"></span></div>
        <div class="table__cell" style="--w:234px"><span class="table__placeholder">Type here</span></div>
        <div class="table__cell" style="--w:234px"><span class="table__placeholder">Type here</span></div>
        <div class="table__cell" style="--w:234px"><span class="table__placeholder">Paste here</span></div>
        <div class="table__cell table__cell--action" style="--w:32px"><button class="btn-plus" type="button" aria-label="Add row"></button></div>
      </div>
    </div>
  </div>
</div>

<!-- new deal timeline, empty (add row only) (Figma: 1868:10182) -->
<div style="width:740px">
  <div class="table table--timeline">
    <div class="table__head">
      <div class="table__cell" style="--w:113px">Date</div>
      <div class="table__cell" style="--w:80px">Actual</div>
      <div class="table__cell" style="--w:170px">Agency/Event</div>
      <div class="table__cell" style="--w:170px">Comments</div>
      <div class="table__cell" style="--w:170px">Link</div>
      <div class="table__cell" style="--w:32px"></div>
    </div>
    <div class="table__body">
      <div class="table__row table__row--add">
        <div class="table__cell" style="--w:113px"><span class="table__placeholder">dd/mm/yyyy</span><span class="icon icon-calendar-16-component"></span></div>
        <div class="table__cell" style="--w:80px"><span class="table__placeholder">Select</span><span class="icon icon-chevron-down-16-select"></span></div>
        <div class="table__cell" style="--w:170px"><span class="table__placeholder">Type here</span></div>
        <div class="table__cell" style="--w:170px"><span class="table__placeholder">Type here</span></div>
        <div class="table__cell" style="--w:170px"><span class="table__placeholder">Paste here</span></div>
        <div class="table__cell table__cell--action" style="--w:32px"><button class="btn-plus" type="button" aria-label="Add row"></button></div>
      </div>
    </div>
  </div>
</div>

<!-- Dividend key / value (.kv-table) (Figma: 1720:6770) -->
<div style="width:932px">
  <div class="kv-table">
    <div class="kv-table__row kv-table__row--head">
      <div class="kv-table__cell kv-table__cell--label"></div>
      <div class="kv-table__cell">Target</div>
      <div class="kv-table__cell">Acquirer</div>
    </div>
    <div class="kv-table__row">
      <div class="kv-table__cell kv-table__cell--label">Company</div>
      <div class="kv-table__cell">Shutterstock, Inc.</div>
      <div class="kv-table__cell">Getty Images Holdings, Inc.</div>
    </div>
    <div class="kv-table__row">
      <div class="kv-table__cell kv-table__cell--label">Status</div>
      <div class="kv-table__cell">Paying</div>
      <div class="kv-table__cell">Not paying</div>
    </div>
    <div class="kv-table__row">
      <div class="kv-table__cell kv-table__cell--label">Frequency</div>
      <div class="kv-table__cell">Quarterly</div>
      <div class="kv-table__cell">-</div>
    </div>
    <div class="kv-table__row">
      <div class="kv-table__cell kv-table__cell--label">Amount</div>
      <div class="kv-table__cell">$0.33</div>
      <div class="kv-table__cell">-</div>
    </div>
    <div class="kv-table__row">
      <div class="kv-table__cell kv-table__cell--label">Next Ex Div Date</div>
      <div class="kv-table__cell">03/14/2026</div>
      <div class="kv-table__cell">-</div>
    </div>
    <div class="kv-table__row">
      <div class="kv-table__cell kv-table__cell--label">Expected Date</div>
      <div class="kv-table__cell">06/12/2026</div>
      <div class="kv-table__cell">-</div>
    </div>
  </div>
</div>
```

### Table - Admin Internal (analytics / mailing list)

*Figma:* 1895:18053, 1895:17760, 1895:20250 - *outside Section 1*

SECTION "Admin Internal" (1895:17439) lies OUTSIDE Section 1. Table 1728x864: stroke #E5E7EC 1px OUTSIDE, radius 4, header 32 with a leading 24x24 chevron slot, Medium 12 everywhere. Group row = #005268@0.1 + #005268 label; sub-header = #EAEBED@0.3 + #A8B6CD labels; expanded child row 25 high; percentage change #3B951A / #DA4D43. Mailing list: columns 540 / 540 / 200 / 200 / 200, checkbox cells centred.

```html
<!-- analytics (grouped) (Figma: 1895:18053) -->
<div style="width:1728px">
  <div class="table table--admin">
    <div class="table__head">
      <div class="table__cell" style="--w:24px">
        <div class="table__toggle"><span class="icon icon-chevron-up-12"></span></div>
      </div>
      <div class="table__cell" style="--w:904px">Company Name</div>
      <div class="table__cell is-center" style="--w:200px">Logins</div>
      <div class="table__cell is-center" style="--w:200px">Logged in for (hours)</div>
      <div class="table__cell is-center" style="--w:200px">Login Attempts</div>
      <div class="table__cell is-center" style="--w:200px">Reset Password Count</div>
    </div>
    <div class="table__body">
      <div class="table__row table__row--group">
        <div class="table__cell" style="--w:24px">
          <div class="table__toggle"><span class="icon icon-chevron-up-12"></span></div>
        </div>
        <div class="table__cell" style="--w:904px">Goldman Sachs</div>
        <div class="table__cell" style="--w:200px"></div>
        <div class="table__cell" style="--w:200px"></div>
        <div class="table__cell" style="--w:200px"></div>
        <div class="table__cell" style="--w:200px"></div>
      </div>
      <div class="table__row table__row--subhead">
        <div class="table__cell" style="--w:24px"></div>
        <div class="table__cell" style="--w:904px">Client Name</div>
        <div class="table__cell is-center" style="--w:200px">Logins</div>
        <div class="table__cell is-center" style="--w:200px">Logged in for (hours)</div>
        <div class="table__cell is-center" style="--w:200px">Login Attempts</div>
        <div class="table__cell is-center" style="--w:200px">Reset Password Count</div>
      </div>
      <!-- ... 4 more <div class="table__row"> like these ... -->
    </div>
  </div>
</div>

<!-- mailing list (Figma: 1895:20250) -->
<div style="width:1480px">
  <div class="table table--mailing">
    <div class="table__head">
      <div class="table__cell" style="--w:540px">Client Name</div>
      <div class="table__cell" style="--w:540px">Company Name</div>
      <div class="table__cell is-center" style="--w:200px">New deal is added</div>
      <div class="table__cell is-center" style="--w:200px">Event is happening</div>
      <div class="table__cell is-center" style="--w:200px">Update to the deal</div>
    </div>
    <div class="table__body">
      <div class="table__row">
        <div class="table__cell" style="--w:540px">Max Shepley</div>
        <div class="table__cell" style="--w:540px">Goldman Sachs</div>
        <div class="table__cell is-center" style="--w:200px"><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span></label></div>
        <div class="table__cell is-center" style="--w:200px"><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span></label></div>
        <div class="table__cell is-center" style="--w:200px"><label class="checkbox"><input class="checkbox__input" type="checkbox"><span class="checkbox__box"></span></label></div>
      </div>
      <div class="table__row">
        <div class="table__cell" style="--w:540px">Linda Varoli</div>
        <div class="table__cell" style="--w:540px">Oscar Gruss</div>
        <div class="table__cell is-center" style="--w:200px"><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span></label></div>
        <div class="table__cell is-center" style="--w:200px"><label class="checkbox"><input class="checkbox__input" type="checkbox"><span class="checkbox__box"></span></label></div>
        <div class="table__cell is-center" style="--w:200px"><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span></label></div>
      </div>
      <div class="table__row">
        <div class="table__cell" style="--w:540px">Jacob Kuit</div>
        <div class="table__cell" style="--w:540px">Makor Group</div>
        <div class="table__cell is-center" style="--w:200px"><label class="checkbox"><input class="checkbox__input" type="checkbox"><span class="checkbox__box"></span></label></div>
        <div class="table__cell is-center" style="--w:200px"><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span></label></div>
        <div class="table__cell is-center" style="--w:200px"><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span></label></div>
      </div>
    </div>
  </div>
</div>
```


---

## Dashboard

### All Deals panel

*Figma:* 414:3116 (952x897)

Panel: V gap 12, stroke #F5F5F8 1px inside, radius 8, clip. Title row 48 (pad 8/8/8/16): "All Deals" Medium 14 UNDERLINE #005268 + Open / Closed segmented 267x32. Body pad 0/8/0/16: filter chips row then A-Z rail (24x578, gap 6; "A" black, G / I = Medium 14 #3675D2@0.9, H = 24x24 circle #3675D2@0.1 Medium 16 #3675D2, rest Medium 12 #A8B6CD) + table + 4px scroll. Shown at 70%.

```html
<div style="display:flex;width:952px;height:897px">
  <section class="deals-panel">
    <div class="deals-panel__head">
      <div class="deals-panel__title"><a class="link link--title" href="#">All Deals</a></div>
      <div class="segmented"><button class="segmented__item is-active" type="button">Open Deals</button><button class="segmented__item" type="button">Closed Deals</button></div>
    </div>
    <div class="deals-panel__body">
      <div class="chip-row"><button class="chip is-active" type="button">All</button><button class="chip" type="button">Cash Deals <span class="count-badge">21</span></button><button class="chip" type="button">Cash-Stock Deals <span class="count-badge">16</span></button><button class="chip" type="button">Stock Deals <span class="count-badge">8</span></button><button class="chip" type="button">Exchange Deals <span class="count-badge">4</span></button><button class="chip" type="button">Spinoff Deals <span class="count-badge">2</span></button></div>
      <div class="deals-panel__main">
        <div class="az-rail">
          <button class="az-rail__letter is-current" type="button">A</button><button class="az-rail__letter" type="button">B</button>
          <!-- ... 24 more <button class="az-rail__letter"> like these ... -->
        </div>
        <div class="table table--deals deals-panel__table">
          <div class="table__head">
            <div class="table__cell table__cell--sort" style="--w:312px"><span>Deal Title</span><span class="icon icon-sort-arrows-13x11"></span></div>
            <div class="table__cell table__cell--sort" style="--w:110px"><span>Start Date</span><span class="icon icon-sort-arrows-13x11"></span></div>
            <div class="table__cell table__cell--sort" style="--w:110px"><span>End Date</span><span class="icon icon-sort-arrows-13x11"></span></div>
            <div class="table__cell table__cell--sort" style="--w:167px"><span>Status</span><span class="icon icon-funnel-13x13"></span></div>
            <div class="table__cell table__cell--sort" style="--w:185px"><span>Deal Type</span><span class="icon icon-funnel-16"></span></div>
          </div>
          <div class="table__body">
            <div class="table__row">
              <div class="table__cell" style="--w:312px"><a class="link" href="#">AES/GIP/EQT Consortium</a></div>
              <div class="table__cell" style="--w:110px">02/02/2026</div>
              <div class="table__cell" style="--w:110px">05/05/2026</div>
              <div class="table__cell" style="--w:167px">Predeal</div>
              <div class="table__cell" style="--w:185px">Cash Merger</div>
            </div>
            <div class="table__row">
              <div class="table__cell" style="--w:312px"><a class="link" href="#">AIV/</a></div>
              <div class="table__cell" style="--w:110px">02/05/2026</div>
              <div class="table__cell" style="--w:110px">05/08/2026</div>
              <div class="table__cell" style="--w:167px">Terminated</div>
              <div class="table__cell" style="--w:185px">Cash Tender</div>
            </div>
            <!-- ... 22 more <div class="table__row"> like these ... -->
          </div>
        </div>
        <div class="scroll" style="--scroll-h:800px;--scroll-thumb:435.06px">
          <div class="scroll__thumb"></div>
        </div>
      </div>
    </div>
  </section>
</div>
```

### Upcoming Events panel

*Figma:* 414:2969 (420x897)

Fill #3675D2@0.05, header 48 (stroke #3675D2@0.1), day strip (8 tiles 40.88x75 radius 5: past = #F5F5F8, selected = #3675D2@0.1 + stroke, default = white), event cards 388 wide (stroke #3675D2@0.05, selected @0.3; last card has only top / bottom #F5F5F8 outside strokes), "Join the meeting" button + time chip (#FF8132@0.1, radius 2, Regular 10, bell 32). Shown at 70%.

```html
<div style="display:flex;width:420px;height:897px">
  <aside class="events-panel">
    <div class="events-panel__head"><span class="events-panel__title">Upcoming Events</span><button class="btn-outline-sm" type="button">Events Calendar</button></div>
    <div class="day-strip"><button class="day-tile is-past" type="button"><span class="day-tile__weekday">Thu</span><span class="day-tile__date">05</span></button><button class="day-tile is-selected" type="button"><span class="day-tile__weekday">Fri</span><span class="day-tile__date">06</span></button><button class="day-tile" type="button"><span class="day-tile__weekday">Sat</span><span class="day-tile__date">07</span></button><button class="day-tile" type="button"><span class="day-tile__weekday">Sun</span><span class="day-tile__date">08</span></button><button class="day-tile" type="button"><span class="day-tile__weekday">Mon</span><span class="day-tile__date">09</span></button><button class="day-tile" type="button"><span class="day-tile__weekday">Tue</span><span class="day-tile__date">10</span></button><button class="day-tile" type="button"><span class="day-tile__weekday">Wed</span><span class="day-tile__date">11</span></button><button class="day-tile" type="button"><span class="day-tile__weekday">Thu</span><span class="day-tile__date">12</span></button></div>
    <div class="events-panel__list">
      <div class="events-panel__cards">
        <div class="event-card">
          <div class="event-card__block">
            <div class="event-card__top"><a class="link event-card__ticker" href="#">AHL / 8630 JT</a><span class="event-status">Actual</span></div>
            <div class="event-card__text">
              <div class="event-card__title">Federal Reserve Governors vote on the proposed acquisition of the target bank holding company</div>
            </div>
          </div>
          <div class="event-card__actions">
            <a class="btn-join" href="#"><img src="assets/zoom-logo.svg" alt="">Join the meeting</a>
            <div class="time-chip"><span class="time-chip__text">today
12:45</span><button class="time-chip__bell" type="button" aria-label="Alert"><span class="icon icon-bell"></span></button></div>
          </div>
        </div>
        <div class="event-card">
          <div class="event-card__block">
            <div class="event-card__top"><a class="link event-card__ticker" href="#">AAUC CN / 2259 HK</a><span class="event-status">Actual</span></div>
            <div class="event-card__text">
              <div class="event-card__title">MX COFECE Deadline for decision on the transaction</div>
            </div>
          </div>
        </div>
        <!-- ... 5 more <div class="event-card"> like these ... -->
      </div>
      <div class="scroll" style="--scroll-h:718px;--scroll-thumb:109.18px">
        <div class="scroll__thumb"></div>
      </div>
    </div>
  </aside>
</div>
```

### Recent Updates panel

*Figma:* 414:2801 (364x897)

Fill #E2E2E2@0.25, stroke #F7F7F7, radius 8; header 48; cards 324 wide, padding 12/16/12/20, gap 12 (type label #179484, timestamp #A8B6CD, bell / bookmark chips 24x24 radius 2, ticker Medium 12 UNDERLINE #3675D2, author Regular 12 **#005268** - the Deal page comments use #4162A3). Morning Note card has a #E5E7EC stroke. Shown at 70%.

```html
<div style="display:flex;width:364px;height:897px">
  <aside class="updates-panel">
    <div class="updates-panel__head"><span class="updates-panel__title">Recent Updates</span></div>
    <div class="updates-panel__body">
      <div class="updates-panel__cards">
        <div class="update-card">
          <div class="update-card__head">
            <div class="update-card__meta"><span class="icon icon-calendar-16"></span><span class="update-card__type">New Event</span><span class="update-card__time">just now</span></div>
            <div class="update-card__actions"><img class="chip-img" src="assets/bell-notify-24.svg" alt=""></div>
          </div>
          <div class="update-card__body">
            <div class="update-card__ticker-row"><a class="link link--external" href="#">AHL / 8630 JT</a><span class="update-card__author">Linda Varoli</span></div>
            <div class="update-card__copy">The FTC has issued a second request for additional information regarding the proposed transaction.</div>
          </div>
        </div>
        <div class="update-card">
          <div class="update-card__head">
            <div class="update-card__meta"><span class="icon icon-comment-16 icon-c-green"></span><span class="update-card__type">New Comment</span><span class="update-card__time">one min ago</span></div>
            <div class="update-card__actions"><img class="chip-img" src="assets/bookmark-24-blue.svg" alt=""></div>
          </div>
          <div class="update-card__body">
            <div class="update-card__ticker-row"><a class="link link--external" href="#">ND DOI</a><span class="update-card__author">Jacob Kuit</span></div>
            <div class="update-card__text">
              <div class="update-card__title">OG Email from ND DOI</div>
              <div class="update-card__copy">The North Dakota Insurance Department has confirmed receipt of the Form A filing and set a hearing date for the transaction.</div>
            </div>
          </div>
        </div>
        <!-- ... 3 more <div class="update-card"> like these ... -->
      </div>
      <div class="scroll" style="--scroll-h:817px;--scroll-thumb:124.23px">
        <div class="scroll__thumb"></div>
      </div>
    </div>
  </aside>
</div>
```

### Dashboard states not drawn

*Figma:* none - **EXTENDED** (not drawn in Figma)

Hover on day tiles, event cards, update cards, A-Z letters without deals (disabled).

```html
<!-- day tile hover [EXTENDED] -->
<div style="display:flex;gap:8px"><button class="day-tile" type="button" style="background:var(--color-blue-10)"><span class="day-tile__weekday">Sat</span><span class="day-tile__date">07</span></button><button class="day-tile" type="button"><span class="day-tile__weekday">Sun</span><span class="day-tile__date">08</span></button></div>

<!-- event card hover [EXTENDED] -->
<div style="width:300px">
  <div class="event-card" style="box-shadow:inset 0 0 0 1px var(--color-blue-30)">
    <div class="event-card__block">
      <div class="event-card__top"><a class="link event-card__ticker" href="#">AHL / 8630 JT</a><span class="event-status">Actual</span></div>
      <div class="event-card__text">
        <div class="event-card__title">Federal Reserve vote</div>
      </div>
    </div>
  </div>
</div>

<!-- update card hover [EXTENDED] -->
<div style="width:324px">
  <div class="update-card" style="background:var(--color-surface-subtle)">
    <div class="update-card__copy">Hover = Grey 4 fill</div>
  </div>
</div>

<!-- A-Z disabled letter [EXTENDED] -->
<div style="display:flex;gap:6px"><span class="az-rail__letter is-disabled" style="width:24px">B</span><span class="az-rail__letter" style="width:24px">C</span></div>
```


---

## All Deals

### List controls

*Figma:* 824:8666, 824:8670, 824:8673, 1988:7527, 824:8672

Row at y120: "Sort by: Newest" select 197x32 (collapsed / Drafts 202-203: `.select--alt-sort-202`), sort-direction button 32x32 (#F5F5F8, glyph #000), view-density toggle 64x32, All Deals / Drafts (148) toggle, primary "New Deal" button 102x32.

```html
<!-- select + sort + view toggle (Figma: 824:8666) -->
<div style="display:flex;gap:16px;align-items:center">
  <div class="select select--sort"><span class="select__text"><span class="c-secondary">Sort by: </span><span class="c-primary">Newest</span></span><span class="icon icon-chevron-down-16-select"></span></div>
  <span class="icon icon-arrow-up-down-32-button" role="button" tabindex="0" aria-label="Sort direction"></span>
  <div class="view-toggle"><button class="view-toggle__item" type="button"><span class="icon icon-list-chevrons-down-up-32"></span></button><button class="view-toggle__item is-active" type="button"><span class="icon icon-list-chevrons-up-down-32"></span></button></div>
</div>

<!-- right group (Figma: 1988:7527) -->
<div style="display:flex;gap:24px;align-items:center">
  <div class="segmented segmented--buttons"><button class="segmented__item is-active" type="button">All Deals</button><button class="segmented__item" type="button">Drafts (148)</button></div>
  <button class="btn" type="button">New Deal</button>
</div>
```

### Filter sidebar + slider

*Figma:* 824:8580 (409x896), 1988:7427 / 1988:5650 (375x896), slider 824:8641

Drawer: stroke #E5E7EC 1px inside, radius [0,8,8,0]; header 44 ("Filters" Medium 12 #005268, "Reset All" Medium 12 UNDERLINE #FF8132); sections gap 24 pad 8/16; labels #7C8DAC (Status is drawn #A8B6CD - kept as `.filter-section__label--grey-2`); checkbox pairs in two columns; "Time to close" slider 249x58 (track 249x4 #E5E7EC, fill #005268, thumb 12x12 white + #005268 1.5 stroke, tick labels Regular 10 #A8B6CD; the "0" label is white / invisible). **Drafts** = same sidebar under a blur rectangle (1988:5751) with the disabled checkbox variants and grey slider. Shown at 55%.

```html
<!-- expanded 409x896 (Figma: 824:8580) -->
<aside class="filter-sidebar">
  <div class="filter-sidebar__head"><span class="filter-sidebar__title">Filters</span><a class="link link--action" href="#">Reset All</a></div>
  <div class="filter-sidebar__sections">
    <div class="filter-section">
      <div class="filter-section__label filter-section__label--grey-2">Status</div>
      <label class="checkbox is-indeterminate"><input class="checkbox__input" type="checkbox"><span class="checkbox__box"></span><span class="checkbox__label">All</span></label>
      <div class="filter-section__grid"><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Terminated</span></label><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Withdrawn</span></label><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Closed</span></label><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Expired Unsuccessfully</span></label><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Abandoned</span></label><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Announced</span></label><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Definitive</span></label><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Spinoff - Definitive</span></label><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Proposal</span></label><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Spinoff - Announced</span></label><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Predeal</span></label><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Post-Event</span></label><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Did Not Happen</span></label></div>
    </div>
    <div class="filter-section">
      <div class="filter-section__label">Type</div>
      <label class="checkbox is-indeterminate"><input class="checkbox__input" type="checkbox"><span class="checkbox__box"></span><span class="checkbox__label">All</span></label>
      <div class="filter-section__grid"><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Cash Merger</span></label><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Cash-Stock Merger</span></label><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Stock Merger</span></label><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Cash Tender</span></label><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Dutch Auction</span></label><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Spinoff</span></label><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Exploring Alternatives</span></label><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Potential Sale</span></label><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Asset Acquisition</span></label><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Investment</span></label><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Cash-Stock Exchange Offer</span></label><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Leveraged Buyout</span></label><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Exchange Offer</span></label><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Spinoff-Merger</span></label><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Recapitalization</span></label><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Shareholder Activism</span></label><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Split-off</span></label><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Not Available</span></label><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Scheme of Arrangement - Exchange Offer</span></label><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Sale of Subsidiary</span></label></div>
    </div>
    <div class="slider">
      <div class="slider__head">Time to close <span>(months)</span></div>
      <div class="slider__track">
        <div class="slider__base"></div>
        <i class="slider__tick" style="left:62px"></i><i class="slider__tick" style="left:121px"></i><i class="slider__tick" style="left:181px"></i><i class="slider__tick" style="left:248px"></i>
        <div class="slider__fill" style=""></div>
        <div class="slider__thumb" style="--thumb:116px"></div>
      </div>
      <div class="slider__labels"><span class="is-hidden">0</span><span>3</span><span>6</span><span>12</span><span>18</span></div>
    </div>
    <div class="filter-section">
      <div class="filter-section__label">Regulatory Risk</div>
      <div class="filter-section__row"><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Low</span></label><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">Medium</span></label><label class="checkbox is-checked"><input class="checkbox__input" type="checkbox" checked><span class="checkbox__box"></span><span class="checkbox__label">High</span></label></div>
    </div>
  </div>
</aside>

<!-- Drafts (disabled, 375 wide) (Figma: 1988:5650) -->
<aside class="filter-sidebar filter-sidebar--narrow">
  <div class="filter-sidebar__overlay"></div>
  <div class="filter-sidebar__head"><span class="filter-sidebar__title">Filters</span><a class="link link--action is-disabled" href="#">Reset All</a></div>
  <div class="filter-sidebar__sections">
    <div class="filter-section">
      <div class="filter-section__label filter-section__label--grey-2">Status</div>
      <label class="checkbox is-disabled is-indeterminate"><input class="checkbox__input" type="checkbox" disabled><span class="checkbox__box"></span><span class="checkbox__label">All</span></label>
      <div class="filter-section__grid"><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Terminated</span></label><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Withdrawn</span></label><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Closed</span></label><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Expired Unsuccessfully</span></label><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Abandoned</span></label><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Announced</span></label><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Definitive</span></label><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Spinoff - Definitive</span></label><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Proposal</span></label><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Spinoff - Announced</span></label><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Predeal</span></label><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Post-Event</span></label><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Did Not Happen</span></label></div>
    </div>
    <div class="filter-section">
      <div class="filter-section__label">Type</div>
      <label class="checkbox is-disabled is-indeterminate"><input class="checkbox__input" type="checkbox" disabled><span class="checkbox__box"></span><span class="checkbox__label">All</span></label>
      <div class="filter-section__grid"><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Cash Merger</span></label><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Cash-Stock Merger</span></label><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Stock Merger</span></label><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Cash Tender</span></label><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Dutch Auction</span></label><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Spinoff</span></label><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Exploring Alternatives</span></label><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Potential Sale</span></label><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Asset Acquisition</span></label><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Investment</span></label><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Cash-Stock Exchange Offer</span></label><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Leveraged Buyout</span></label><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Exchange Offer</span></label><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Spinoff-Merger</span></label><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Recapitalization</span></label><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Shareholder Activism</span></label><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Split-off</span></label><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Not Available</span></label><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Scheme of Arrangement - Exchange Offer</span></label><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Sale of Subsidiary</span></label></div>
    </div>
    <div class="slider is-disabled">
      <div class="slider__head">Time to close <span>(months)</span></div>
      <div class="slider__track">
        <div class="slider__base"></div>
        <i class="slider__tick" style="left:72px"></i><i class="slider__tick" style="left:126px"></i><i class="slider__tick" style="left:180px"></i><i class="slider__tick" style="left:248px"></i>
        <div class="slider__fill" style="--fill:131px"></div>
        <div class="slider__thumb" style="--thumb:120px"></div>
      </div>
      <div class="slider__labels"><span>Now</span><span>3</span><span>6</span><span>12</span><span>18+</span></div>
    </div>
    <div class="filter-section">
      <div class="filter-section__label">Regulatory Risk</div>
      <div class="filter-section__row"><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Low</span></label><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">Medium</span></label><label class="checkbox is-disabled is-checked"><input class="checkbox__input" type="checkbox" checked disabled><span class="checkbox__box"></span><span class="checkbox__label">High</span></label></div>
    </div>
  </div>
</aside>

<!-- slider (249x58) (Figma: 824:8641) -->
<div class="slider">
  <div class="slider__head">Time to close <span>(months)</span></div>
  <div class="slider__track">
    <div class="slider__base"></div>
    <i class="slider__tick" style="left:62px"></i><i class="slider__tick" style="left:121px"></i><i class="slider__tick" style="left:181px"></i><i class="slider__tick" style="left:248px"></i>
    <div class="slider__fill" style=""></div>
    <div class="slider__thumb" style="--thumb:116px"></div>
  </div>
  <div class="slider__labels"><span class="is-hidden">0</span><span>3</span><span>6</span><span>12</span><span>18</span></div>
</div>

<!-- slider disabled (Figma: 1988:5650) -->
<div class="slider is-disabled">
  <div class="slider__head">Time to close <span>(months)</span></div>
  <div class="slider__track">
    <div class="slider__base"></div>
    <i class="slider__tick" style="left:72px"></i><i class="slider__tick" style="left:126px"></i><i class="slider__tick" style="left:180px"></i><i class="slider__tick" style="left:248px"></i>
    <div class="slider__fill" style="--fill:131px"></div>
    <div class="slider__thumb" style="--thumb:120px"></div>
  </div>
  <div class="slider__labels"><span>Now</span><span>3</span><span>6</span><span>12</span><span>18+</span></div>
</div>
```


---

## Deal page

### Deal header

*Figma:* 1720:6521 (1736x32)

H gap 24. Title = ONE text node with two runs (Medium 18 #000 + Regular 18 #7C8DAC company names); 32-high pills (`.pill--lg`); primary "Edit Deal" 98x32; bell 32x32 (stroke #FF8132 1px, radius 2) and bookmark 32x32 (fill #3675D2@0.1 + stroke #3675D2, filled glyph 12x15).

```html
<!-- inactive bookmark [EXTENDED] -->
<button class="icon-btn icon-btn--bookmark" type="button"><span class="icon icon-bookmark-outline-12x15"></span></button>

<!-- active bell [EXTENDED] -->
<button class="icon-btn icon-btn--bell is-active" type="button"><span class="icon icon-bell"></span></button>
```

### Key-terms card

*Figma:* 1720:6590 (1354x441)

No fill, stroke #A8B6CD 1px OUTSIDE, radius 4. Three rows 137 / 66 / 238 with #F5F5F8 dividers: parties (two 546-wide halves, GRID 100/100/100/130, column gap 12, row gap 13, cells = label #7C8DAC over value #000; row 1 = Ticker + Name span 2 + an empty 4th cell), totals (Total Deal Value is Bold 12), long text (label + wrapped value, newlines kept). Shown at 70%.

```html
<div class="terms-card">
  <div class="terms-card__parties">
    <div class="terms-card__party">
      <div class="terms-card__head">Target</div>
      <div class="terms-card__grid">
        <div class="kv">
          <div class="kv__label">Ticker</div>
          <div class="kv__value">SSTK</div>
        </div>
        <div class="kv kv--span2">
          <div class="kv__label">Name</div>
          <div class="kv__value">Shutterstock, Inc.</div>
        </div>
        <div></div>
        <div class="kv">
          <div class="kv__label">Exchange</div>
          <div class="kv__value">NYSE</div>
        </div>
        <div class="kv">
          <div class="kv__label">Predeal price</div>
          <div class="kv__value">$28.45</div>
        </div>
        <div class="kv">
          <div class="kv__label">Total Debt</div>
          <div class="kv__value">$0.2B</div>
        </div>
        <div class="kv">
          <div class="kv__label">Shares Outstanding (m)</div>
          <div class="kv__value">35.4</div>
        </div>
      </div>
    </div>
    <div class="terms-card__party">
      <div class="terms-card__head">Acquirer</div>
      <div class="terms-card__grid">
        <div class="kv">
          <div class="kv__label">Ticker</div>
          <div class="kv__value">GETY</div>
        </div>
        <div class="kv kv--span2">
          <div class="kv__label">Name</div>
          <div class="kv__value">Getty Images Holdings, Inc.</div>
        </div>
        <div></div>
        <div class="kv">
          <div class="kv__label">Exchange</div>
          <div class="kv__value">NYSE</div>
        </div>
        <div class="kv">
          <div class="kv__label">Predeal price</div>
          <div class="kv__value">$3.12</div>
        </div>
        <div class="kv">
          <div class="kv__label">Total Debt</div>
          <div class="kv__value">$1.3B</div>
        </div>
        <div class="kv">
          <div class="kv__label">Shares Outstanding (m)</div>
          <div class="kv__value">412.1</div>
        </div>
      </div>
    </div>
  </div>
  <div class="terms-card__totals">
    <div class="terms-card__totals-row">
      <div class="kv">
        <div class="kv__label">Total Deal Value</div>
        <div class="kv__value"><span class="t-bold-12">$1.1B</span></div>
      </div>
      <div class="kv">
        <div class="kv__label">Author</div>
        <div class="kv__value">Linda Varoli</div>
      </div>
      <div class="kv">
        <div class="kv__label">Start Date</div>
        <div class="kv__value">01/07/2025</div>
      </div>
      <div class="kv">
        <div class="kv__label">End Date</div>
        <div class="kv__value">06/30/2026</div>
      </div>
    </div>
  </div>
  <div class="terms-card__text">
    <div class="kv">
      <div class="kv__label">Deal Terms</div>
      <div class="kv__value kv__value--pre">Each Shutterstock share will be exchanged for $28.85 in cash plus 13.67 Getty Images shares.
Implied total consideration of approximately $1.1B.
Closing is expected in the second half of 2026.
The merger agreement includes a 45-day go-shop period.
No financing condition applies.</div>
    </div>
    <div class="kv">
      <div class="kv__label">Termination Fee</div>
      <div class="kv__value kv__value--pre">Company - $32.7M
Parent - $40.0M</div>
    </div>
    <div class="kv">
      <div class="kv__label">Walk Provision</div>
      <div class="kv__value kv__value--pre">Regulatory out, financing out</div>
    </div>
  </div>
</div>
```

### Anchor menu, comments & conditions

*Figma:* 1720:6537, 1720:6548, 1720:6516

Anchor menu 374x160 (items 358x32; active = #F5F5F8 + 2px left #000, Medium 12). Comments panel 374x518.96: header "Comments" Medium 12 #005268, cards 334 wide (stroke #E5E7EC, padding 12/24, author Medium 12 **#4162A3**, date Regular 12 #7C8DAC MM/DD/YYYY, title SemiBold 14, body Regular 12) and a PDF attachment chip (112x32, stroke #000 1.5). Conditions panel 406x878: stroke #F5F5F8, fixed clipped text box (no scrollbar).

```html
<!-- anchor menu (Figma: 1720:6537) -->
<nav class="anchor-menu"><a class="anchor-menu__item is-active" href="#">Deal Terms</a><a class="anchor-menu__item" href="#">Conditions</a><a class="anchor-menu__item" href="#">Dates Summary</a><a class="anchor-menu__item" href="#">Description of Deal</a><a class="anchor-menu__item" href="#">Disclaimer</a></nav>

<!-- hover on an inactive item [EXTENDED] -->
<div class="anchor-menu">
  <div class="anchor-menu__item" style="background:var(--color-surface-subtle);color:var(--color-text-primary)">Conditions</div>
</div>

<!-- comments panel (Figma: 1720:6548) -->
<div class="comments-panel">
  <div class="comments-panel__head">Comments</div>
  <div class="comments-panel__body">
    <div class="comments-panel__list">
      <div class="comment-card">
        <div class="comment-card__top"><span class="comment-card__author">Linda Varoli</span><span class="comment-card__date">12/29/2025</span></div>
        <div class="comment-card__content">
          <div class="comment-card__title">Merger Agreement Summary</div>
          <div class="comment-card__body">Summary of the principal terms of the merger agreement, including the exchange ratio, termination rights and the conditions to closing.</div>
        </div>
        <button class="attachment-chip" type="button"><img src="assets/noun-pdf.svg" alt="">Merger.pdf</button>
      </div>
      <div class="comment-card">
        <div class="comment-card__top"><span class="comment-card__author">Jacob Kuit</span><span class="comment-card__date">12/22/2025</span></div>
        <div class="comment-card__content">
          <div class="comment-card__title">OG Email from ND DOI</div>
          <div class="comment-card__body">Department confirmed receipt of the Form A filing.</div>
        </div>
      </div>
      <div class="comment-card">
        <div class="comment-card__top"><span class="comment-card__author">Linda Varoli</span><span class="comment-card__date">12/18/2025</span></div>
        <div class="comment-card__content">
          <div class="comment-card__title">Second request</div>
          <div class="comment-card__body">The FTC issued a second request to both parties.</div>
        </div>
      </div>
    </div>
    <div class="scroll" style="--scroll-h:478.96px;--scroll-thumb:260.47px">
      <div class="scroll__thumb"></div>
    </div>
  </div>
</div>

<!-- conditions panel (878 -> shown 60%) (Figma: 1720:6516) -->
<div class="conditions-panel">
  <div class="conditions-panel__title">Conditions</div>
  <div class="conditions-panel__body">
    <div class="conditions-panel__text">Completion of the merger is subject to customary conditions, including:

1. Approval of the merger agreement by the holders of a majority of the outstanding shares of each company.

2. Expiration or termination of the waiting period under the HSR Act and receipt of other required regulatory approvals.

3. No law or order prohibiting completion of the merger.

4. Effectiveness of the registration statement on Form S-4.</div>
  </div>
</div>
```

### Dates Summary, description, additional data, dividend, disclaimer

*Figma:* 1720:6661, 1720:6734

Dates Summary head (Medium 12 #005268) + "Edit Events" (Medium 12 UNDERLINE #FF8132); description = ONE rich-text node (Regular 12 with Bold 12 runs); Additional Data in two columns (labels #A8B6CD); industry chips #C1ECF0 / #008D9A, sector chip #CAD8F4 / #4162A3; Dividend key / value table; Disclaimer Regular 10. Shown at 80%.

```html
<div style="width:964px">
  <div class="dates-summary">
    <div class="section-head"><span>Dates Summary</span><a class="link link--action" href="#">Edit Events</a></div>
    <div class="table table--summary">
      <div class="table__head">
        <div class="table__cell table__cell--date" style="--w:113px">Date</div>
        <div class="table__cell" style="--w:99px">Status</div>
        <div class="table__cell" style="--w:273px">Agency/Event</div>
        <div class="table__cell" style="--w:273px">Comments</div>
        <div class="table__cell" style="--w:174px">Related Links</div>
      </div>
      <div class="table__body">
        <div class="table__row">
          <div class="table__cell table__cell--date" style="--w:113px">02/19/2026</div>
          <div class="table__cell" style="--w:99px"><span class="event-status">Actual</span></div>
          <div class="table__cell" style="--w:273px">FTC</div>
          <div class="table__cell" style="--w:273px">Second request received from the FTC</div>
          <div class="table__cell table__cell--center-v" style="--w:174px"><a class="btn-join btn-join--sm" href="#"><img src="assets/zoom-logo.svg" alt="">Join the meeting</a></div>
        </div>
        <div class="table__row">
          <div class="table__cell table__cell--date" style="--w:113px">03/12/2026</div>
          <div class="table__cell" style="--w:99px"><span class="event-status event-status--expected">Expected</span></div>
          <div class="table__cell" style="--w:273px">Shareholder vote</div>
          <div class="table__cell" style="--w:273px">Special meeting to approve the merger</div>
          <div class="table__cell table__cell--center-v" style="--w:174px"><a class="btn-join btn-join--sm" href="#"><img src="assets/zoom-logo.svg" alt="">Join the meeting</a></div>
        </div>
        <div class="table__row">
          <div class="table__cell table__cell--date" style="--w:113px">04/30/2026</div>
          <div class="table__cell" style="--w:99px"><span class="event-status event-status--expected">Expected</span></div>
          <div class="table__cell" style="--w:273px">Outside date</div>
          <div class="table__cell" style="--w:273px">Original outside date under the merger agreement</div>
          <div class="table__cell table__cell--center-v" style="--w:174px"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="deal-sections">
    <div class="deal-section">
      <div class="deal-section__head">Description of Deal</div>
      <div class="deal-section__body">
        <div class="richtext">Getty Images and Shutterstock today announced a definitive agreement under which the two companies will combine in a merger of equals.

<b>About Getty Images</b>
Getty Images is a preeminent global visual content creator and marketplace.

<b>About Shutterstock, Inc.</b>
Shutterstock is a leading global creative platform for transformative brands and media companies.</div>
      </div>
    </div>
    <div class="additional-data">
      <div class="section-head">Additional Data</div>
      <div class="additional-data__cols">
        <div class="additional-data__col">
          <div class="additional-data__col-head">Target</div>
          <div class="additional-data__pair">
            <div class="additional-data__label">Lawyers</div>
            <div class="additional-data__value">Wachtell, Lipton, Rosen & Katz</div>
          </div>
          <div class="additional-data__pair">
            <div class="additional-data__label">Investment Bankers</div>
            <div class="additional-data__value">Goldman Sachs</div>
          </div>
        </div>
        <div class="additional-data__col">
          <div class="additional-data__col-head">Acquirer</div>
          <div class="additional-data__pair">
            <div class="additional-data__label">Lawyers</div>
            <div class="additional-data__value">Skadden, Arps, Slate, Meagher & Flom</div>
          </div>
          <div class="additional-data__pair">
            <div class="additional-data__label">Investment Bankers</div>
            <div class="additional-data__value">Morgan Stanley</div>
          </div>
        </div>
      </div>
      <div class="chip-group">
        <div class="additional-data__label">Industry</div>
        <div class="chip-group__chips"><span class="pill pill--industry-insurance pill--lg">Insurance</span><span class="pill pill--industry-insurance pill--lg">P&amp;C Insurance</span><span class="pill pill--industry-insurance pill--lg">Reinsurance</span></div>
      </div>
      <div class="chip-group">
        <div class="additional-data__label">Sector</div>
        <div class="chip-group__chips" style="width:auto;justify-content:flex-start"><span class="pill pill--industry-financials pill--lg">Financials</span></div>
      </div>
    </div>
    <div class="deal-section deal-section--dividend">
      <div class="deal-section__head">Dividend</div>
      <div class="deal-section__body" style="padding:0">
        <div class="kv-table">
          <div class="kv-table__row kv-table__row--head">
            <div class="kv-table__cell kv-table__cell--label"></div>
            <div class="kv-table__cell">Target</div>
            <div class="kv-table__cell">Acquirer</div>
          </div>
          <div class="kv-table__row">
            <div class="kv-table__cell kv-table__cell--label">Company</div>
            <div class="kv-table__cell">Shutterstock, Inc.</div>
            <div class="kv-table__cell">Getty Images Holdings, Inc.</div>
          </div>
          <div class="kv-table__row">
            <div class="kv-table__cell kv-table__cell--label">Status</div>
            <div class="kv-table__cell">Paying</div>
            <div class="kv-table__cell">Not paying</div>
          </div>
          <div class="kv-table__row">
            <div class="kv-table__cell kv-table__cell--label">Frequency</div>
            <div class="kv-table__cell">Quarterly</div>
            <div class="kv-table__cell">-</div>
          </div>
          <div class="kv-table__row">
            <div class="kv-table__cell kv-table__cell--label">Amount</div>
            <div class="kv-table__cell">$0.33</div>
            <div class="kv-table__cell">-</div>
          </div>
          <div class="kv-table__row">
            <div class="kv-table__cell kv-table__cell--label">Next Ex Div Date</div>
            <div class="kv-table__cell">03/14/2026</div>
            <div class="kv-table__cell">-</div>
          </div>
          <div class="kv-table__row">
            <div class="kv-table__cell kv-table__cell--label">Expected Date</div>
            <div class="kv-table__cell">06/12/2026</div>
            <div class="kv-table__cell">-</div>
          </div>
        </div>
      </div>
    </div>
    <div class="deal-section deal-section--dividend">
      <div class="deal-section__head">Disclaimer</div>
      <div class="deal-section__body">
        <div class="richtext richtext--10">This material is for informational purposes only and does not constitute an offer to buy or sell any security. Oscar Gruss &amp; Son Incorporated and its affiliates may hold positions in the securities discussed.</div>
      </div>
    </div>
  </div>
</div>
```


---

## Forms

### New Deal field grid

*Figma:* 1868:10087 (740x392)

GRID 3 x FLEX 1, column gap 8, row gap 16 -> cells 241.33x52 (pitch 249.33 / 68). Field = V gap 4: label (Regular 12 #A8B6CD) + 32-high control: Input, Select, calendar, number + currency (outer 241.33x32, input segment + 98px currency select with a left stroke), number stepper (8x18 chevrons #005268 1.2).

```html
<!-- filled (Figma: 1868:10064) -->
<div style="width:740px">
  <div class="field-grid">
    <div class="field">
      <div class="field__label">Target</div>
      <div class="input"><span class="input__text has-value">Shutterstock, Inc.</span></div>
    </div>
    <div class="field">
      <div class="field__label">Company Name</div>
      <div class="input"><span class="input__text has-value">SSTK</span></div>
    </div>
    <!-- ... 16 more <div class="field"> like these ... -->
  </div>
</div>
```

### Currency / stepper field states

*Figma:* 1868:10097, 1868:10117

Hover / focus / error reuse the field recipe (Extended).

```html
<!-- currency (Figma: 1868:10097) -->
<div class="input-currency">
  <input class="input-currency__input" placeholder="0.00" value="28.45">
  <div class="input-currency__select"><span class="select__text has-value">USD</span><span class="icon icon-chevron-down-16-select"></span></div>
</div>

<!-- stepper (Figma: 1868:10117) -->
<div class="input input-stepper"><span class="input__text has-value">35.4</span><span class="icon icon-chevrons-updown-10x18-stepper"></span></div>

<!-- currency hover [EXTENDED] -->
<div class="input-currency" style="--sc:var(--color-border-strong)">
  <input class="input-currency__input" placeholder="0.00" value="28.45">
  <div class="input-currency__select"><span class="select__text has-value">USD</span><span class="icon icon-chevron-down-16-select"></span></div>
</div>

<!-- currency error [EXTENDED] -->
<div class="input-currency is-error">
  <input class="input-currency__input" placeholder="0.00">
  <div class="input-currency__select"><span class="select__text">Currency</span><span class="icon icon-chevron-down-16-select"></span></div>
</div>
```

### Deal Preview card

*Figma:* 1868:10282 (944 wide), empty 1868:10474

Fill #FFF, stroke #F5F5F8, radius 8; header 52 (title Medium 14 #000 + subtitle Medium 12 #7C8DAC + 24-high Medium 10 chips); parties 460-wide halves (labels #A8B6CD); totals band 50 with top + bottom strokes; text blocks; events table. **Empty**: every value "-", title "- / -", grey placeholder pills "Deal Status" / "Deal Type", no events table. Shown at 70%.

```html
<!-- filled (Figma: 1868:10282) -->
<div class="preview-card">
  <div class="preview-card__head">
    <div class="preview-card__title"><span>SSTK / GETY</span><span>Shutterstock / Getty Images Holdings, Inc.</span></div>
    <div class="preview-card__chips"><span class="pill pill--definitive pill--10">Definitive</span><span class="pill pill--cash-merger pill--10">Cash Merger</span></div>
  </div>
  <div class="preview-card__parties">
    <div class="preview-card__party">
      <div class="preview-card__party-head">Target</div>
      <div class="preview-card__rows">
        <div class="preview-card__row">
          <div class="kv" style="width:80px">
            <div class="kv__label">Ticker</div>
            <div class="kv__value">SSTK</div>
          </div>
          <div class="kv" style="width:200px">
            <div class="kv__label">Name</div>
            <div class="kv__value">Shutterstock, Inc.</div>
          </div>
          <div class="kv" style="width:140px">
            <div class="kv__label">Predeal price</div>
            <div class="kv__value">$28.45</div>
          </div>
        </div>
        <div class="preview-card__row">
          <div class="kv" style="width:80px">
            <div class="kv__label">Exchange</div>
            <div class="kv__value">NYSE</div>
          </div>
          <div class="kv" style="width:200px">
            <div class="kv__label">Shares Outstanding (m)</div>
            <div class="kv__value">35.4</div>
          </div>
          <div class="kv" style="width:140px">
            <div class="kv__label">Total Debt</div>
            <div class="kv__value">$0.2B</div>
          </div>
        </div>
      </div>
    </div>
    <div class="preview-card__party">
      <div class="preview-card__party-head">Acquirer</div>
      <div class="preview-card__rows">
        <div class="preview-card__row">
          <div class="kv" style="width:80px">
            <div class="kv__label">Ticker</div>
            <div class="kv__value">GETY</div>
          </div>
          <div class="kv" style="width:200px">
            <div class="kv__label">Name</div>
            <div class="kv__value">Getty Images Holdings, Inc.</div>
          </div>
          <div class="kv" style="width:140px">
            <div class="kv__label">Predeal price</div>
            <div class="kv__value">$3.12</div>
          </div>
        </div>
        <div class="preview-card__row">
          <div class="kv" style="width:80px">
            <div class="kv__label">Exchange</div>
            <div class="kv__value">NYSE</div>
          </div>
          <div class="kv" style="width:200px">
            <div class="kv__label">Shares Outstanding (m)</div>
            <div class="kv__value">412.1</div>
          </div>
          <div class="kv" style="width:140px">
            <div class="kv__label">Total Debt</div>
            <div class="kv__value">$1.3B</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="preview-card__totals">
    <div class="preview-card__totals-group">
      <div class="kv">
        <div class="kv__label">Total Deal Value</div>
        <div class="kv__value"><span class="t-bold-12">$1.1B</span></div>
      </div>
      <div class="kv">
        <div class="kv__label">Author</div>
        <div class="kv__value">Linda Varoli</div>
      </div>
    </div>
    <div class="preview-card__totals-group">
      <div class="kv">
        <div class="kv__label">Start Date</div>
        <div class="kv__value">01/07/2025</div>
      </div>
      <div class="kv">
        <div class="kv__label">End Date</div>
        <div class="kv__value">06/30/2026</div>
      </div>
    </div>
  </div>
  <div class="preview-card__texts">
    <div class="kv">
      <div class="kv__label">Deal Terms</div>
      <div class="kv__value">Cash and stock</div>
    </div>
    <div class="kv">
      <div class="kv__label">Termination Fee</div>
      <div class="kv__value">Company - $32.7M</div>
    </div>
    <div class="kv">
      <div class="kv__label">Walk Provision</div>
      <div class="kv__value">Regulatory out</div>
    </div>
    <div class="kv">
      <div class="kv__label">Conditions</div>
      <div class="kv__value">Shareholder approval; HSR</div>
    </div>
    <div class="kv">
      <div class="kv__label">Description of Deal</div>
      <div class="kv__value">Merger of equals</div>
    </div>
  </div>
  <div class="preview-card__events">
    <div class="additional-data__label">Events</div>
    <div class="table table--summary">
      <div class="table__head">
        <div class="table__cell table__cell--date" style="--w:113px">Date</div>
        <div class="table__cell" style="--w:99px">Status</div>
        <div class="table__cell" style="--w:270.5px">Agency/Event</div>
        <div class="table__cell" style="--w:270.5px">Comments</div>
        <div class="table__cell" style="--w:158px">Related Links</div>
      </div>
      <div class="table__body">
        <div class="table__row">
          <div class="table__cell table__cell--date" style="--w:113px">02/19/2026</div>
          <div class="table__cell" style="--w:99px"><span class="event-status">Actual</span></div>
          <div class="table__cell" style="--w:270.5px">FTC</div>
          <div class="table__cell" style="--w:270.5px">Second request received from the FTC</div>
          <div class="table__cell table__cell--center-v" style="--w:158px"><a class="btn-join btn-join--sm" href="#"><img src="assets/zoom-logo.svg" alt="">Join the meeting</a></div>
        </div>
        <div class="table__row">
          <div class="table__cell table__cell--date" style="--w:113px">03/12/2026</div>
          <div class="table__cell" style="--w:99px"><span class="event-status event-status--expected">Expected</span></div>
          <div class="table__cell" style="--w:270.5px">Shareholder vote</div>
          <div class="table__cell" style="--w:270.5px">Special meeting to approve the merger</div>
          <div class="table__cell table__cell--center-v" style="--w:158px"><a class="btn-join btn-join--sm" href="#"><img src="assets/zoom-logo.svg" alt="">Join the meeting</a></div>
        </div>
        <div class="table__row">
          <div class="table__cell table__cell--date" style="--w:113px">04/30/2026</div>
          <div class="table__cell" style="--w:99px"><span class="event-status event-status--expected">Expected</span></div>
          <div class="table__cell" style="--w:270.5px">Outside date</div>
          <div class="table__cell" style="--w:270.5px">Original outside date under the merger agreement</div>
          <div class="table__cell table__cell--center-v" style="--w:158px"></div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- empty (Figma: 1868:10474) -->
<div class="preview-card is-empty">
  <div class="preview-card__head">
    <div class="preview-card__title"><span>- / -</span><span>- / -</span></div>
    <div class="preview-card__chips"><span class="pill pill--empty pill--10">Deal Status</span><span class="pill pill--empty pill--10">Deal Type</span></div>
  </div>
  <div class="preview-card__parties">
    <div class="preview-card__party">
      <div class="preview-card__party-head">Target</div>
      <div class="preview-card__rows">
        <div class="preview-card__row">
          <div class="kv" style="width:80px">
            <div class="kv__label">Ticker</div>
            <div class="kv__value">-</div>
          </div>
          <div class="kv" style="width:200px">
            <div class="kv__label">Name</div>
            <div class="kv__value">-</div>
          </div>
          <div class="kv" style="width:140px">
            <div class="kv__label">Predeal price</div>
            <div class="kv__value">-</div>
          </div>
        </div>
        <div class="preview-card__row">
          <div class="kv" style="width:80px">
            <div class="kv__label">Exchange</div>
            <div class="kv__value">-</div>
          </div>
          <div class="kv" style="width:200px">
            <div class="kv__label">Shares Outstanding (m)</div>
            <div class="kv__value">-</div>
          </div>
          <div class="kv" style="width:140px">
            <div class="kv__label">Total Debt</div>
            <div class="kv__value">-</div>
          </div>
        </div>
      </div>
    </div>
    <div class="preview-card__party">
      <div class="preview-card__party-head">Acquirer</div>
      <div class="preview-card__rows">
        <div class="preview-card__row">
          <div class="kv" style="width:80px">
            <div class="kv__label">Ticker</div>
            <div class="kv__value">-</div>
          </div>
          <div class="kv" style="width:200px">
            <div class="kv__label">Name</div>
            <div class="kv__value">-</div>
          </div>
          <div class="kv" style="width:140px">
            <div class="kv__label">Predeal price</div>
            <div class="kv__value">-</div>
          </div>
        </div>
        <div class="preview-card__row">
          <div class="kv" style="width:80px">
            <div class="kv__label">Exchange</div>
            <div class="kv__value">-</div>
          </div>
          <div class="kv" style="width:200px">
            <div class="kv__label">Shares Outstanding (m)</div>
            <div class="kv__value">-</div>
          </div>
          <div class="kv" style="width:140px">
            <div class="kv__label">Total Debt</div>
            <div class="kv__value">-</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="preview-card__totals">
    <div class="preview-card__totals-group">
      <div class="kv">
        <div class="kv__label">Total Deal Value</div>
        <div class="kv__value">-</div>
      </div>
      <div class="kv">
        <div class="kv__label">Author</div>
        <div class="kv__value">-</div>
      </div>
    </div>
    <div class="preview-card__totals-group">
      <div class="kv">
        <div class="kv__label">Start Date</div>
        <div class="kv__value">-</div>
      </div>
      <div class="kv">
        <div class="kv__label">End Date</div>
        <div class="kv__value">-</div>
      </div>
    </div>
  </div>
  <div class="preview-card__texts">
    <div class="kv">
      <div class="kv__label">Deal Terms</div>
      <div class="kv__value">-</div>
    </div>
    <div class="kv">
      <div class="kv__label">Termination Fee</div>
      <div class="kv__value">-</div>
    </div>
    <div class="kv">
      <div class="kv__label">Walk Provision</div>
      <div class="kv__value">-</div>
    </div>
    <div class="kv">
      <div class="kv__label">Conditions</div>
      <div class="kv__value">-</div>
    </div>
    <div class="kv">
      <div class="kv__label">Description of Deal</div>
      <div class="kv__value">-</div>
    </div>
  </div>
  <div class="preview-card__events">
    <div class="additional-data__label">Events</div>
    <div class="kv__value">-</div>
  </div>
</div>
```

### Footer action bar

*Figma:* 1868:10443 (1784x64)

Fill #FFF, shadow UP (#26395E@0.04 0/-4/9 + @0.03 0/-16/16), H SPACE_BETWEEN gap 24, padding 16/24. Left: "Deal Preview" toggle (ON, label Medium 12). Right: Cancel (#7C8DAC fill), "Save as a Draft" (Button Outline), "Add New Deal" (primary). **Empty / invalid**: Save as a Draft + Add New Deal disabled (the only validation visual in Figma).

```html
<!-- valid (Figma: 1868:10443) -->
<div style="width:1784px;padding-top:24px">
  <div class="footer-bar">
    <label class="toggle is-on"><input class="toggle__input" type="checkbox" checked><span class="toggle__track"></span><span class="toggle__label">Deal Preview</span></label>
    <div class="footer-bar__actions"><button class="btn-grey" type="button">Cancel</button><button class="btn-outline" type="button">Save as a Draft</button><button class="btn" type="button">Add New Deal</button></div>
  </div>
</div>

<!-- empty (disabled) (Figma: 1868:10474) -->
<div style="width:1784px;padding-top:24px">
  <div class="footer-bar">
    <label class="toggle is-on"><input class="toggle__input" type="checkbox" checked><span class="toggle__track"></span><span class="toggle__label">Deal Preview</span></label>
    <div class="footer-bar__actions"><button class="btn-grey" type="button">Cancel</button><button class="btn-outline" type="button" disabled>Save as a Draft</button><button class="btn" type="button" disabled>Add New Deal</button></div>
  </div>
</div>
```

### Form action bar (Edit Events)

*Figma:* 1720:6282 (932x32)

SPACE_BETWEEN: Cancel (fill #7C8DAC, no stroke) left, "Save Changes" (primary 127x32) right.

```html
<div style="width:932px">
  <div class="form-actions"><button class="btn-grey" type="button">Cancel</button><button class="btn" type="button">Save Changes</button></div>
</div>
```


---

## Events

### Date label & Day | Week | Month toggle

*Figma:* 721:2328, 721:2260

Date label: H HUG x 32, padding 0/8/0/16, gap 16, stroke #E5E7EC, date parts Medium 12 #000 + year Regular 12 #7C8DAC + calendar icon #005268. Toggle 346x32: fill #F5F5F8, three FILL buttons, text Medium 12 with fixed line-height 20; inactive text #7C8DAC radius 8 / active #005268 radius 4 (source inconsistency kept). There are no prev / next arrows in Figma.

```html
<!-- date label (month) (Figma: 721:2329) -->
<div class="date-label"><span class="date-label__title"><b>April,</b><span class="c-secondary"> 2026</span></span><span class="icon icon-calendar-16-component"></span></div>

<!-- date label (week) (Figma: 721:2429) -->
<div class="date-label"><span class="date-label__title"><b>March 29,</b><span class="c-secondary"> 2026</span> - <b>April 3,</b><span class="c-secondary"> 2026</span></span><span class="icon icon-calendar-16-component"></span></div>

<!-- toggle (Month active) (Figma: 721:2260) -->
<div class="day-toggle"><button class="day-toggle__item" type="button">Day</button><button class="day-toggle__item" type="button">Week</button><button class="day-toggle__item is-active" type="button">Month</button></div>

<!-- toggle (Week active) (Figma: 721:2389) -->
<div class="day-toggle"><button class="day-toggle__item" type="button">Day</button><button class="day-toggle__item is-active" type="button">Week</button><button class="day-toggle__item" type="button">Month</button></div>
```

### Calendar - month

*Figma:* 721:2276 (1502x864)

Weekday header 32 (Medium 12 #A8B6CD, UPPERCASE as typed, "THUR"), 4 rows x 7 columns (GRID, rows 216, columns 1 / 1 / 1 / 1 / 1 / 0.75 / 0.75 -> 231.08 / 173.31), max 6 chips + View More. A selected chip has a #005268 1px OUTSIDE stroke and feeds the Selected Event panel. Shown at 55%.

```html
<div style="display:flex;gap:19px">
  <div class="calendar">
    <div class="calendar__weekdays">
      <div class="calendar__weekday">MON</div>
      <div class="calendar__weekday">TUE</div>
      <div class="calendar__weekday">WED</div>
      <div class="calendar__weekday">THUR</div>
      <div class="calendar__weekday">FRI</div>
      <div class="calendar__weekday">SAT</div>
      <div class="calendar__weekday">SUN</div>
    </div>
    <div class="calendar__grid">
      <div class="day day--prev">
        <div class="day__head"><span class="day__num">29</span></div>
        <div class="day__items">
          <div class="day__tag">AAUC CN / 2259 HK</div>
          <div class="day__tag">AL / Sumitomo Corporation ...</div>
          <div class="day__tag">AMWD / MBC</div>
        </div>
      </div>
      <div class="day day--prev">
        <div class="day__head"><span class="day__num">30</span></div>
        <div class="day__items">
          <div class="day__tag">AL / Sumitomo Corporation ...</div>
          <div class="day__tag">AMWD / MBC</div>
        </div>
      </div>
      <!-- ... 26 more <div class="day"> like these ... -->
    </div>
  </div>
  <aside class="selected-event">
    <div class="selected-event__head">Selected Event</div>
    <div class="selected-event__body">
      <div class="selected-event__block"><a class="link" href="#">JHG/Trian Fund Management ...</a><span class="event-status">Actual</span></div>
      <div class="selected-event__block">
        <div class="selected-event__label">Agency / Event</div>
        <div class="selected-event__value">FTC – second request response</div>
      </div>
      <div class="selected-event__block">
        <div class="selected-event__label">Description</div>
        <div class="selected-event__value">The parties certified substantial compliance with the second request. The waiting period will expire 30 days after the certification date, unless extended.</div>
      </div>
    </div>
  </aside>
</div>
```

### Calendar - week

*Figma:* 721:2405 (1489x864)

There is NO time grid in Figma: the week is seven tall day columns (226.2 / 179 wide) of stacked two-line cards (ticker Medium 12 UNDERLINE + Inter Regular 10 description, padding 8, gap 4). Today column = stroke #005268 1px on all four sides. Empty Selected Event panel: "No event selected" #A8B6CD. Shown at 55%.

```html
<div style="display:flex;gap:32px">
  <div class="calendar calendar--week">
    <div class="calendar__weekdays">
      <div class="calendar__weekday">MON</div>
      <div class="calendar__weekday">TUE</div>
      <div class="calendar__weekday">WED</div>
      <div class="calendar__weekday">THUR</div>
      <div class="calendar__weekday">FRI</div>
      <div class="calendar__weekday">SAT</div>
      <div class="calendar__weekday">SUN</div>
    </div>
    <div class="calendar__week">
      <div class="day day--expanded day--prev">
        <div class="day__head"><span class="day__num">29</span><span class="day__more">View More</span></div>
        <div class="day__items">
          <div class="day__event">
            <div class="day__event-title">AAUC CN / 2259 HK</div>
            <div class="day__event-desc">MX COFECE Deadline for decision on the transaction</div>
          </div>
          <div class="day__event">
            <div class="day__event-title">AL / Sumitomo Corporation</div>
            <div class="day__event-desc">Shareholder meeting to approve the merger</div>
          </div>
          <!-- ... 2 more <div class="day__event"> like these ... -->
        </div>
      </div>
      <div class="day day--expanded day--prev">
        <div class="day__head"><span class="day__num">30</span></div>
        <div class="day__items">
          <div class="day__event">
            <div class="day__event-title">AL / Sumitomo Corporation</div>
            <div class="day__event-desc">Shareholder meeting to approve the merger</div>
          </div>
          <div class="day__event">
            <div class="day__event-title">VRSN / VeriSign, Inc.</div>
            <div class="day__event-desc">HSR waiting period expires at 11:59 pm</div>
          </div>
          <div class="day__event">
            <div class="day__event-title">KW/Management – Fairfax</div>
            <div class="day__event-desc">Go-shop period ends</div>
          </div>
        </div>
      </div>
      <!-- ... 5 more <div class="day"> like these ... -->
    </div>
  </div>
  <aside class="selected-event">
    <div class="selected-event__head">Selected Event</div>
    <div class="selected-event__empty">No event selected</div>
  </aside>
</div>
```

### Selected Event panel

*Figma:* 721:2333 (231x848)

Stroke #E5E7EC, radius 8, padding 8/0, gap 10; header "Selected Event" Regular 12 #7C8DAC with a #F5F5F8 bottom stroke; link title Medium 12 UNDERLINE #005268, status, labelled values (#A8B6CD labels).

```html
<!-- with selection (Figma: 721:2333) -->
<div style="height:420px;display:flex">
  <aside class="selected-event">
    <div class="selected-event__head">Selected Event</div>
    <div class="selected-event__body">
      <div class="selected-event__block"><a class="link" href="#">JHG/Trian Fund Management ...</a><span class="event-status">Actual</span></div>
      <div class="selected-event__block">
        <div class="selected-event__label">Agency / Event</div>
        <div class="selected-event__value">FTC – second request response</div>
      </div>
      <div class="selected-event__block">
        <div class="selected-event__label">Description</div>
        <div class="selected-event__value">The parties certified substantial compliance with the second request. The waiting period will expire 30 days after the certification date, unless extended.</div>
      </div>
    </div>
  </aside>
</div>

<!-- empty (Figma: 721:2434) -->
<div style="height:200px;display:flex">
  <aside class="selected-event">
    <div class="selected-event__head">Selected Event</div>
    <div class="selected-event__empty">No event selected</div>
  </aside>
</div>
```


---

## Login

### Login / Forgot password / OTP cards

*Figma:* 2159:13749 (384), 2159:13805, 2159:13821 (425)

Card: fill #FFF, radius 12, NO stroke / shadow, padding 56/72, FIXED 384 (OTP 425), gap 48 (login) / 40 (forgot, OTP). Header = wordmark 132x72 + "  Risk Arb DB" (two leading spaces kept) Geist Medium 24 #7C8DAC; inputs 40 high / Regular 14; username placeholder #A8B6CD on "Log In 2" vs #7C8DAC on Forgot Password (both kept: `.input--ph-tertiary`); OTP slots 40x64 (instance radius 4) Regular 16, empty slots show "0" #7C8DAC; Verify / Sign In / Send = Button Outline green 40 high. Shown at 60%.

```html
<!-- Log In (filled) (Figma: 2159:13749) -->
<div style="display:flex">
  <div class="login-card">
    <div class="login-card__header">
      <div class="login-card__logo"><img src="assets/og-wordmark-login-132x72.svg" alt="Oscar Gruss"></div>
      <div class="login-card__title">  Risk Arb DB</div>
    </div>
    <div class="login-card__body">
      <div class="login-card__form">
        <div class="login-card__fields">
          <input class="input input--lg" placeholder="username" value="prozenblit">
          <div class="password"><span class="password__dots"></span><span class="icon icon-eye-24-hidden-state"></span></div>
        </div>
        <a class="link link--login" href="#">Forgot Password?</a>
      </div>
      <button class="btn-outline-green btn-lg btn-block" type="button">Sign In</button>
    </div>
  </div>
</div>

<!-- Log In 2 (empty, disabled) (Figma: 2159:13777) -->
<div style="display:flex">
  <div class="login-card">
    <div class="login-card__header">
      <div class="login-card__logo"><img src="assets/og-wordmark-login-132x72.svg" alt="Oscar Gruss"></div>
      <div class="login-card__title">  Risk Arb DB</div>
    </div>
    <div class="login-card__body">
      <div class="login-card__form">
        <div class="login-card__fields">
          <input class="input input--lg input--ph-tertiary" placeholder="username">
          <div class="password"><span class="password__text is-empty">password</span><span class="icon icon-eye-24-hidden-state"></span></div>
        </div>
        <a class="link link--login" href="#">Forgot Password?</a>
      </div>
      <button class="btn-outline-green btn-lg btn-block" type="button" disabled>Sign In</button>
    </div>
  </div>
</div>

<!-- password visible (Figma: 2159:13790) -->
<div style="display:flex">
  <div class="login-card">
    <div class="login-card__header">
      <div class="login-card__logo"><img src="assets/og-wordmark-login-132x72.svg" alt="Oscar Gruss"></div>
      <div class="login-card__title">  Risk Arb DB</div>
    </div>
    <div class="login-card__body">
      <div class="login-card__form">
        <div class="login-card__fields">
          <input class="input input--lg" placeholder="username" value="prozenblit">
          <div class="password"><span class="password__text">makoristhebest10</span><span class="icon icon-eye-off-24-visible-state"></span></div>
        </div>
        <a class="link link--login" href="#">Forgot Password?</a>
      </div>
      <button class="btn-outline-green btn-lg btn-block" type="button">Sign In</button>
    </div>
  </div>
</div>

<!-- Forgot Password (Figma: 2159:13805) -->
<div style="display:flex">
  <div class="login-card login-card--gap40">
    <div class="login-card__header">
      <div class="login-card__logo"><img src="assets/og-wordmark-login-132x72.svg" alt="Oscar Gruss"></div>
      <div class="login-card__title">  Risk Arb DB</div>
    </div>
    <div class="login-card__intro">
      <div class="login-card__intro-title">Forgot Password</div>
      <div class="login-card__intro-text">Enter your username and email address to receive a temporary password</div>
    </div>
    <div class="login-card__body">
      <div class="login-card__fields"><input class="input input--lg" placeholder="Username"><input class="input input--lg" placeholder="Email Address"></div>
      <button class="btn-outline-green btn-lg btn-block" type="button">Send</button>
    </div>
  </div>
</div>

<!-- OTP (filled) (Figma: 2159:13821) -->
<div style="display:flex">
  <div class="login-card login-card--otp">
    <div class="login-card__header">
      <div class="login-card__logo"><img src="assets/og-wordmark-login-132x72.svg" alt="Oscar Gruss"></div>
      <div class="login-card__title">  Risk Arb DB</div>
    </div>
    <div class="otp">
      <div class="otp__title">Enter Verification Code</div>
      <div class="otp__sub">Check you email at
pr***@makor-capital.com</div>
      <div class="otp__slots"><input class="input input--otp" value="1" maxlength="1" inputmode="numeric"><input class="input input--otp" value="2" maxlength="1" inputmode="numeric"><input class="input input--otp" value="3" maxlength="1" inputmode="numeric"><input class="input input--otp" value="4" maxlength="1" inputmode="numeric"><input class="input input--otp" value="5" maxlength="1" inputmode="numeric"><input class="input input--otp" value="6" maxlength="1" inputmode="numeric"></div>
    </div>
    <div class="otp-actions"><button class="btn-outline-green btn-lg btn-block" type="button">Verify Code</button><a class="resend" href="#"><span class="icon icon-rotate-ccw-18-login icon-c-inherit"></span><span class="link link--login">Resend Code</span></a></div>
  </div>
</div>

<!-- OTP (empty, disabled) (Figma: 2159:13845) -->
<div style="display:flex">
  <div class="login-card login-card--otp">
    <div class="login-card__header">
      <div class="login-card__logo"><img src="assets/og-wordmark-login-132x72.svg" alt="Oscar Gruss"></div>
      <div class="login-card__title">  Risk Arb DB</div>
    </div>
    <div class="otp">
      <div class="otp__title">Enter Verification Code</div>
      <div class="otp__sub">Check you email at
pr***@makor-capital.com</div>
      <div class="otp__slots"><input class="input input--otp" placeholder="0" maxlength="1" inputmode="numeric"><input class="input input--otp" placeholder="0" maxlength="1" inputmode="numeric"><input class="input input--otp" placeholder="0" maxlength="1" inputmode="numeric"><input class="input input--otp" placeholder="0" maxlength="1" inputmode="numeric"><input class="input input--otp" placeholder="0" maxlength="1" inputmode="numeric"><input class="input input--otp" placeholder="0" maxlength="1" inputmode="numeric"></div>
    </div>
    <div class="otp-actions"><button class="btn-outline-green btn-lg btn-block" type="button" disabled>Verify Code</button><a class="resend is-disabled" href="#"><span class="icon icon-rotate-ccw-18-login icon-c-inherit"></span><span class="link link--login is-disabled">Resend Code</span></a></div>
  </div>
</div>
```

### Login error / success / loading

*Figma:* none (reuses 1895:21136) - **EXTENDED** (not drawn in Figma)

Figma draws no error, success, loading or focus state on login. Error reuses the Admin External password error (#DA4D43 stroke + Regular 10 helper); loading = the disabled button look; success message = `.text-new`.

```html
<!-- input error [EXTENDED] -->
<div style="width:240px">
  <div class="input input--lg is-error"><span class="input__text">username</span></div>
  <div class="login-card__error" style="text-align:left;margin-top:2px">Invalid username or password</div>
</div>

<!-- password error [EXTENDED] -->
<div style="width:240px">
  <div class="password is-error"><span class="password__dots"></span><span class="icon icon-eye-24"></span></div>
  <div class="login-card__error" style="text-align:left;margin-top:2px">Incorrect password</div>
</div>

<!-- loading / sending [EXTENDED] -->
<button class="btn-outline-green btn-lg" type="button" disabled style="width:240px">Signing in…</button>

<!-- success [EXTENDED] -->
<span class="text-new">A temporary password has been sent</span>
```


---

## Admin

### Account Settings panel (Admin External)

*Figma:* 1895:21118 (1784x960) - *outside Section 1*

SECTION 1895:21099 "Admin External" - a separate section, not Section 1. Panel stroke #E5E7EC, radius [12,8,8,8]; header 61 ("Account Settings" Medium 16); left rail ("Profile Information" SemiBold 14 #005268, divider #E5E7EC); form column 544 (V gap 32): inputs 260x32, collapsible "Change Password" (Medium 12 #7C8DAC + chevron 12), password fields with the ERROR variant, password-rules box (fill #F5F5F8, Medium 10 / Regular 10 #7C8DAC), Cancel (Button Outline) + Save Changes. Shown at 60%.

```html
<div class="settings-panel">
  <div class="settings-panel__head">Account Settings</div>
  <div class="settings-panel__body">
    <nav class="settings-rail">
      <div class="settings-rail__item">Profile Information</div>
    </nav>
    <div class="settings-form">
      <div class="settings-form__group">
        <div class="field">
          <div class="field__label">Name</div>
          <div class="input input--w260"><span class="input__text has-value">Sourabh Gupta</span></div>
        </div>
        <div class="field">
          <div class="field__label">Email</div>
          <div class="input input--w260"><span class="input__text has-value">sgupta@makorsecurities.com</span></div>
        </div>
      </div>
      <div class="settings-form__password">
        <span class="collapse-heading is-open">Change Password<span class="icon icon-chevron-up-12"></span></span>
        <div class="settings-form__password-row">
          <div class="settings-form__password-fields">
            <div class="field">
              <div class="field__label">Current password</div>
              <div class="password password--compact is-error"><span class="password__dots"></span><span class="icon icon-eye-24"></span></div>
              <div class="field__error">Incorrect password</div>
            </div>
            <div class="field">
              <div class="field__label">New password</div>
              <div class="password password--compact"><span class="password__text">makoristhebest10</span><span class="icon icon-eye-off-24-visible-state"></span></div>
            </div>
            <div class="field">
              <div class="field__label">Confirm New password</div>
              <div class="password password--compact"><span class="password__text is-empty">Confirm New password</span><span class="icon icon-eye-24-hidden-state"></span></div>
            </div>
          </div>
          <div class="password-rules">
            <div class="password-rules__title">Must contain at least:</div>
            <ul class="password-rules__list"><li>8 characters</li><li>1 lowercase letter</li><li>1 uppercase letter</li><li>1 number (1,2,3,4,5,6,7,8,9,0)</li><li>1 Non-alphanumeric ASCII characters (!@#$%^&amp; *.:;~'`"*/\+?- _|=()[] {}&lt;&gt;)</li></ul>
          </div>
        </div>
      </div>
      <div class="settings-form__actions"><button class="btn-outline" type="button">Cancel</button><button class="btn" type="button">Save Changes</button></div>
    </div>
  </div>
</div>
```

### Settings cards, category pills & modal

*Figma:* 1895:19076, 1895:19315 - *outside Section 1*

Cards: stroke #F5F5F8 radius 8, header 48. Category pill = colour@0.2 fill + same solid colour text (colours reuse the status / type pill hues: tones); removable = + 1px stroke + circle-x 16; "+ Add" = dashed #E5E7EC pill (dash [2,2] reproduced with CSS dashed - visual estimate). Modal 386x158: fill #FFF, radius 8, Shadow, padding 25/24, gap 24; Cancel #7C8DAC + primary; no title or close X is drawn.

```html
<!-- modal on scrim (Figma: 1895:19315) -->
<div style="position:relative;width:800px;height:300px;overflow:hidden;background:var(--color-surface-default)">
  <div class="scrim scrim--center" style="left:0;top:0">
    <div class="modal">
      <div class="field">
        <div class="field__label">Deal Status</div>
        <div class="input"><span class="input__text">Type here</span></div>
      </div>
      <div class="modal__actions"><button class="btn-grey" type="button">Cancel</button><button class="btn" type="button">Add New Deal Status</button></div>
    </div>
  </div>
</div>

<!-- modal title slot [EXTENDED] -->
<div style="position:relative;width:800px;height:300px;overflow:hidden;background:var(--color-surface-default)">
  <div class="scrim scrim--center" style="left:0;top:0">
    <div class="modal">
      <div class="modal__title">Add New Deal Status</div>
      <div class="field">
        <div class="field__label">Deal Status</div>
        <div class="input"><span class="input__text">Type here</span></div>
      </div>
      <div class="modal__actions"><button class="btn-grey" type="button">Cancel</button><button class="btn" type="button">Add New Deal Status</button></div>
    </div>
  </div>
</div>
```

### Sectors list, A-Z index & disclaimer

*Figma:* 1895:20357, 1895:20029, 1895:20079 - *outside Section 1*

Group header: chevron + letter (SemiBold 12 #005268) | count pill 31x17 (SemiBold 10 #7C8DAC); item rows 24 high; hover row = #005268@0.1 with edit (#005268@0.2) / delete (#F0C4C1) 16x16 buttons (glyph size ~10 is a visual estimate). Index letters with sectors = Medium 14 #3675D2@0.9. Disclaimer read view = Inter Regular 12; edit mode = editor 816 + toolbar.

```html
<!-- sectors (E selected) (Figma: 1895:20357) -->
<div style="display:flex;gap:24px;align-items:flex-start">
  <div class="az-rail">
    <button class="az-rail__letter is-current" type="button">A</button><button class="az-rail__letter has-items" type="button">B</button>
    <!-- ... 24 more <button class="az-rail__letter"> like these ... -->
  </div>
  <div class="sector-list">
    <div class="sector-group">
      <div class="sector-group__head"><span class="sector-group__letter"><span class="icon icon-chevron-up-12 icon-c-brand"></span>A</span><span class="count-pill">12</span></div>
      <div class="sector-item"><span>Advertising</span><span class="sector-item__actions"><button class="icon-btn-sm icon-btn-sm--edit" type="button" aria-label="Edit"><span class="icon icon-noun-edit-24"></span></button><button class="icon-btn-sm icon-btn-sm--delete" type="button" aria-label="Delete"><span class="icon icon-trash-24"></span></button></span></div>
      <div class="sector-item is-hover"><span>Aerospace &amp; Defense</span><span class="sector-item__actions"><button class="icon-btn-sm icon-btn-sm--edit" type="button" aria-label="Edit"><span class="icon icon-noun-edit-24"></span></button><button class="icon-btn-sm icon-btn-sm--delete" type="button" aria-label="Delete"><span class="icon icon-trash-24"></span></button></span></div>
      <!-- ... 2 more <div class="sector-item"> like these ... -->
    </div>
    <div class="sector-group">
      <div class="sector-group__head"><span class="sector-group__letter"><span class="icon icon-chevron-up-12 icon-c-brand"></span>B</span><span class="count-pill">8</span></div>
      <div class="sector-item"><span>Banks</span><span class="sector-item__actions"><button class="icon-btn-sm icon-btn-sm--edit" type="button" aria-label="Edit"><span class="icon icon-noun-edit-24"></span></button><button class="icon-btn-sm icon-btn-sm--delete" type="button" aria-label="Delete"><span class="icon icon-trash-24"></span></button></span></div>
      <div class="sector-item"><span>Biotechnology</span><span class="sector-item__actions"><button class="icon-btn-sm icon-btn-sm--edit" type="button" aria-label="Edit"><span class="icon icon-noun-edit-24"></span></button><button class="icon-btn-sm icon-btn-sm--delete" type="button" aria-label="Delete"><span class="icon icon-trash-24"></span></button></span></div>
      <div class="sector-item"><span>Broadcasting</span><span class="sector-item__actions"><button class="icon-btn-sm icon-btn-sm--edit" type="button" aria-label="Edit"><span class="icon icon-noun-edit-24"></span></button><button class="icon-btn-sm icon-btn-sm--delete" type="button" aria-label="Delete"><span class="icon icon-trash-24"></span></button></span></div>
    </div>
    <div class="sector-group">
      <div class="sector-group__head"><span class="sector-group__letter"><span class="icon icon-chevron-up-12 icon-c-brand"></span>C</span><span class="count-pill">15</span></div>
      <div class="sector-item"><span>Capital Markets</span><span class="sector-item__actions"><button class="icon-btn-sm icon-btn-sm--edit" type="button" aria-label="Edit"><span class="icon icon-noun-edit-24"></span></button><button class="icon-btn-sm icon-btn-sm--delete" type="button" aria-label="Delete"><span class="icon icon-trash-24"></span></button></span></div>
      <div class="sector-item"><span>Chemicals</span><span class="sector-item__actions"><button class="icon-btn-sm icon-btn-sm--edit" type="button" aria-label="Edit"><span class="icon icon-noun-edit-24"></span></button><button class="icon-btn-sm icon-btn-sm--delete" type="button" aria-label="Delete"><span class="icon icon-trash-24"></span></button></span></div>
      <div class="sector-item"><span>Construction</span><span class="sector-item__actions"><button class="icon-btn-sm icon-btn-sm--edit" type="button" aria-label="Edit"><span class="icon icon-noun-edit-24"></span></button><button class="icon-btn-sm icon-btn-sm--delete" type="button" aria-label="Delete"><span class="icon icon-trash-24"></span></button></span></div>
    </div>
    <div class="sector-group">
      <div class="sector-group__head"><span class="sector-group__letter"><span class="icon icon-chevron-up-12 icon-c-brand"></span>E</span><span class="count-pill">6</span></div>
      <div class="sector-item"><span>Education</span><span class="sector-item__actions"><button class="icon-btn-sm icon-btn-sm--edit" type="button" aria-label="Edit"><span class="icon icon-noun-edit-24"></span></button><button class="icon-btn-sm icon-btn-sm--delete" type="button" aria-label="Delete"><span class="icon icon-trash-24"></span></button></span></div>
      <div class="sector-item"><span>Electric Utilities</span><span class="sector-item__actions"><button class="icon-btn-sm icon-btn-sm--edit" type="button" aria-label="Edit"><span class="icon icon-noun-edit-24"></span></button><button class="icon-btn-sm icon-btn-sm--delete" type="button" aria-label="Delete"><span class="icon icon-trash-24"></span></button></span></div>
      <div class="sector-item"><span>Energy</span><span class="sector-item__actions"><button class="icon-btn-sm icon-btn-sm--edit" type="button" aria-label="Edit"><span class="icon icon-noun-edit-24"></span></button><button class="icon-btn-sm icon-btn-sm--delete" type="button" aria-label="Delete"><span class="icon icon-trash-24"></span></button></span></div>
    </div>
  </div>
</div>

<!-- disclaimer read view (Figma: 1895:20029) -->
<div style="display:flex;gap:16px;align-items:flex-start">
  <div class="disclaimer-text" style="width:560px">This material is for informational purposes only and does not constitute an offer.</div>
  <button class="btn-orange-outline" type="button">Edit</button>
</div>

<!-- disclaimer edit mode (Figma: 1895:20079) -->
<div style="width:816px">
  <div class="editor editor--w816">
    <div class="rt-toolbar rt-toolbar--editor">
      <div class="rt-group"><button class="rt-btn" type="button" aria-label="Undo"><span class="icon icon-rotate-ccw-20"></span></button><button class="rt-btn rt-btn--redo" type="button" aria-label="Redo"><span class="icon icon-rotate-ccw-20"></span></button></div>
      <div class="rt-group rt-group--pilcrow"><button class="rt-btn" type="button" aria-label="Paragraph"><span class="icon icon-pilcrow-34x20"></span></button></div>
      <div class="rt-group"><button class="rt-btn rt-btn--bold" type="button" aria-label="Bold">B</button><button class="rt-btn rt-btn--italic" type="button" aria-label="Italic">I</button><button class="rt-btn rt-btn--underline" type="button" aria-label="Underline">U</button><button class="rt-btn rt-btn--strike" type="button" aria-label="Strikethrough">S</button></div>
      <div class="rt-group"><button class="rt-btn" type="button" aria-label="Align centre"><span class="icon icon-align-center-20"></span></button><button class="rt-btn" type="button" aria-label="Justify"><span class="icon icon-align-justify-20"></span></button><button class="rt-btn" type="button" aria-label="Align left"><span class="icon icon-align-left-20"></span></button><button class="rt-btn" type="button" aria-label="Align right"><span class="icon icon-align-right-20"></span></button></div>
      <div class="rt-group"><button class="rt-btn" type="button" aria-label="Bulleted list"><span class="icon icon-list-unordered-20"></span></button><button class="rt-btn" type="button" aria-label="Numbered list"><span class="icon icon-list-ordered-20"></span></button></div>
      <div class="rt-group"><button class="rt-btn" type="button" aria-label="Link"><span class="icon icon-link-20"></span></button><button class="rt-btn" type="button" aria-label="Table"><span class="icon icon-sheet-20"></span></button></div>
      <div class="rt-group"><button class="rt-btn" type="button" aria-label="Code"><span class="icon icon-code-xml-20"></span></button><button class="rt-btn" type="button" aria-label="Fullscreen"><span class="icon icon-expand-20"></span></button></div>
    </div>
    <div class="editor__body" style="--body-h:120px">This material is for informational purposes only…</div>
  </div>
  <div class="form-actions" style="margin-top:16px"><button class="btn-grey" type="button">Cancel</button><button class="btn" type="button">Save Changes</button></div>
</div>
```


---

## Extended

### Tooltip, toast, skeleton, empty state, accordion, form error

*Figma:* none (Figma defines none of these) - **EXTENDED** (not drawn in Figma)

Every value derived from existing tokens: tooltip = brand fill + white text (primary button) radius 4 + Shadow; toast = white card (popover recipe) + 3px left status bar (nav sub-item accent) in Green / Red / Blue / Orange; skeleton = static Grey 3 blocks (Figma has no durations / easings, so no shimmer); empty state = the drawn "No event selected" recipe; accordion = the drawn expanded-row colours + nav chevron; form error = field error recipe.

```html
<!-- tooltip [EXTENDED] -->
<span class="tooltip">Open Deals</span>

<!-- skeleton [EXTENDED] -->
<div style="display:flex;flex-direction:column;gap:8px;width:280px"><span class="skeleton"></span><span class="skeleton" style="width:60%"></span><span class="skeleton skeleton--sm" style="width:40%"></span><span class="skeleton skeleton--row"></span></div>

<!-- empty state [EXTENDED] -->
<div class="empty-state" style="width:280px">
  <div class="empty-state__title">No deals found</div>
  <div>Try changing the filters.</div>
</div>

<!-- accordion (click) [EXTENDED] -->
<div class="accordion is-open" style="width:320px">
  <button class="accordion__head" type="button">Additional Data<span class="icon icon-chevron-up-12"></span></button>
  <div class="accordion__body">Lawyers, investment bankers and industry.</div>
</div>
<div style="height:8px"></div>
<div class="accordion" style="width:320px">
  <button class="accordion__head" type="button">Additional Data<span class="icon icon-chevron-up-12"></span></button>
  <div class="accordion__body">Lawyers, investment bankers and industry.</div>
</div>

<!-- form error [EXTENDED] -->
<div class="field">
  <div class="field__label">Deal Title</div>
  <div class="input is-error"><span class="input__text">Placeholder</span></div>
  <div class="form-error">This field is required</div>
</div>

<!-- .toast (info) [EXTENDED] -->
<div class="toast">
  <div>
    <div class="toast__title">Info</div>
    <div>Your changes have been saved.</div>
  </div>
</div>

<!-- .toast--success [EXTENDED] -->
<div class="toast toast--success">
  <div>
    <div class="toast__title">Success</div>
    <div>Your changes have been saved.</div>
  </div>
</div>

<!-- .toast--warning [EXTENDED] -->
<div class="toast toast--warning">
  <div>
    <div class="toast__title">Warning</div>
    <div>Your changes have been saved.</div>
  </div>
</div>

<!-- .toast--error [EXTENDED] -->
<div class="toast toast--error">
  <div>
    <div class="toast__title">Error</div>
    <div>Your changes have been saved.</div>
  </div>
</div>
```

---

## Behaviour notes and JS snippets
Figma has no prototype interactions; this is the behaviour the markup is built for. All snippets are framework-free.

```js
// Exclusive-active groups: tabs, filter chips, segmented toggles, view toggle, Day|Week|Month, day tiles, A-Z rail, anchor menu, nav sub-items
function group(root, itemSel) {
  root.addEventListener('click', (e) => {
    const it = e.target.closest(itemSel); if (!it || e.target.closest('.tab__close')) return;
    root.querySelectorAll(itemSel).forEach((x) => { x.classList.remove('is-active'); x.removeAttribute('aria-selected'); x.removeAttribute('aria-pressed'); });
    it.classList.add('is-active');
    if (it.matches('.tab')) it.setAttribute('aria-selected', 'true'); else it.setAttribute('aria-pressed', 'true');
  });
}
document.querySelectorAll('.tabbar').forEach((r) => group(r, '.tab'));
document.querySelectorAll('.chip-row').forEach((r) => group(r, '.chip'));
document.querySelectorAll('.segmented').forEach((r) => group(r, '.segmented__item'));
document.querySelectorAll('.view-toggle').forEach((r) => group(r, '.view-toggle__item'));
document.querySelectorAll('.day-toggle').forEach((r) => group(r, '.day-toggle__item'));
document.querySelectorAll('.day-strip').forEach((r) => group(r, '.day-tile'));
document.querySelectorAll('.az-rail').forEach((r) => group(r, '.az-rail__letter'));
document.querySelectorAll('.anchor-menu').forEach((r) => group(r, '.anchor-menu__item'));

// Closable tabs (Dashboard / Events Calendar have no close chip)
document.addEventListener('click', (e) => { const c = e.target.closest('.tab__close'); if (c) c.closest('.tab').remove(); });

// Nav: expand / collapse a section (chevron points UP when expanded, DOWN when collapsed - the asset is flipped by CSS when .is-expanded is absent)
document.querySelectorAll('.nav-item').forEach((it) => it.addEventListener('click', (e) => {
  if (!it.querySelector('.nav-item__chevron')) return;
  e.preventDefault();
  const open = it.classList.toggle('is-expanded');
  const sub = it.nextElementSibling; if (sub && sub.classList.contains('nav-sub')) sub.hidden = !open;
}));
// Nav width: swap .nav--min / .nav--open / .nav--max (72 / 191 / 219). Content always starts at x88; the nav overlays it.

// Search: focusing the top search adds .screen--search to the .screen and inserts <div class="scrim"></div> + the .search-dropdown (absolute at 84,64) into it; the search gets .is-focus. Esc / outside click removes them.
const search = document.querySelector('.search--top'), screen = document.querySelector('.screen');
search.addEventListener('focusin', () => screen.classList.add('screen--search'));
// highlight the match: wrap the query in <mark> (Geist Bold 12 #005268), case-insensitive, keep the source casing

// Calendar: select an event chip (outline #005268) and show it in .selected-event; select a day tile
document.querySelectorAll('.calendar__grid').forEach((g) => g.addEventListener('click', (e) => {
  const t = e.target.closest('.day__tag'); if (!t) return;
  g.querySelectorAll('.day__tag.is-selected').forEach((x) => x.classList.remove('is-selected')); t.classList.add('is-selected');
}));

// Toggle (native checkbox): CSS reacts to :checked; the forced class .is-on mirrors it. Label text becomes "ON" (Medium) / "OFF" (Regular).

// Password show / hide: swap dots <-> text and the eye icon (icon-eye-24-hidden-state <-> icon-eye-off-24-visible-state)
function flip(p, value) {
  const shown = !p.classList.toggle('is-masked');
  p.querySelector('.password__dots, .password__text').outerHTML = shown ? '<span class="password__text">' + value + '</span>' : '<span class="password__dots"></span>';
  p.querySelector('.icon').className = 'icon ' + (shown ? 'icon-eye-off-24-visible-state' : 'icon-eye-24-hidden-state');
}

// Rich-text toolbar: B / I / U / S are toggle buttons -> set aria-pressed (CSS paints .is-active / [aria-pressed="true"] brand tint + brand glyph)
document.querySelectorAll('.rt-btn[aria-label]').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true')));

// A-Z rail: scroll the table to the first row starting with the letter; letters with no deals get .is-disabled (Extended)
// Accordion (Extended) and table description rows: toggle .is-open / insert a .table__detail row after the data row
document.querySelectorAll('.accordion__head').forEach((h) => h.addEventListener('click', () => h.parentNode.classList.toggle('is-open')));

// Login background: default is the 200 KB export; to use the 9.2 MB original
// .login-screen { --login-background-image: url(assets/login-background-1.jpg); }
```

---

## Extended (not in Figma) - name | what | derivation

| Name | What | Derivation |
|---|---|---|
| Keyboard focus ring | outline 1.5px solid #005268, offset 2px on `:focus-visible` (links, buttons, inputs, selects) | Brand border colour at the primary-button stroke weight; mirrors the one drawn focus (top search stroke #005268, 1720:5473). Zero specificity so components can replace it. |
| Link cursor | `cursor:pointer`, underline kept, no colour change | Figma draws no link hover |
| Button pressed (`:active`, `.is-active`) | same as hover (white overlay 20%) | Primary hover recipe (766:3216); outline families reuse their own hover fill |
| `.btn-grey` hover | white overlay 20% on #7C8DAC | Primary-button hover recipe |
| `.btn-outline-sm` hover | Grey 3 fill | Button Outline hover fill |
| `.btn-plus` | two 8.33x1.2 bars on a 20x20 #005268 radius-2 square | Spec numbers (lucide/plus 1720:6360); no asset exported |
| Native `<select class="select">` | chevron-down-16-select.svg as background | Existing asset; same box recipe |
| Field hover | Grey 2 stroke | Existing "stronger border" token (checkbox / disabled outline) |
| Field focus | brand stroke 1px inside | The single drawn focus (top search 1615:4439) applied to every field |
| Select open | brand stroke + chevron flipped | Focus stroke + `icon-flip-y` |
| Field error (Input / Select / calendar / search) | red stroke 1px inside | Password error 1895:21136 (the only drawn error) |
| Field disabled | fill Grey 4, text / icon Grey 2, stroke Grey 3 | Disabled button palette |
| Checkbox / radio / toggle focus ring | brand ring around the box / track | Focus recipe |
| Radio disabled | label #7C8DAC, border #A8B6CD, dot #7C8DAC | Checkbox disabled palette |
| Toggle disabled | track Grey 2, label Grey 1 | Disabled fill token + checkbox disabled label |
| `.scrollable` native scrollbar | 4px track Grey 3, thumb Grey 2, radius 16 | Scroll component numbers (838:2609) |
| Rich-text button hover / pressed / disabled | Grey 4 (Grey 3 in editor toolbar) / brand tint 10% + brand glyph / Grey 2 glyph | Neutral hover token, active-nav tint, disabled icon colour |
| DAY tag ellipsis + hover | `text-overflow:ellipsis`; hover = Grey 3 fill | Figma truncates by typing "..."; neutral hover token |
| `.chip--plain` | symmetric right padding 16 | Figma always draws the trailing 20x20 slot |
| Chip hover (+ count badge turns white) | Grey 3 fill | Button Outline hover fill |
| Segmented / day-toggle / view-toggle hover | Grey 3 fill on the inactive half | Neutral hover token |
| Nav item / sub-item hover | Grey 4 fill | Active sub-item fill token |
| Collapsed-nav tooltip | `.tooltip` with the item label | Tooltip pattern below |
| Avatar hover / open | brand tint 10% disc behind the ring | Existing tint; the menu itself IS drawn (Admin External `.account-menu`) |
| Tab hover / close-chip hover / overflow | Grey 4 fill; chip `brightness(.94)`; `.tabbar--scroll` scrolls horizontally | Neutral hover token; `.scrollable` skin |
| Search dropdown empty / loading / no results | centred Regular 12 #A8B6CD | The drawn "No event selected" recipe (721:2434) |
| `.menu` generic dropdown | account-menu recipe with 40-high rows; selected = brand tint + brand text | Account menu (1895:21153) + active nav parent |
| Sorted / filtered table header | trailing icon turns #005268 | Nav / select icon colour |
| `.table--hoverable` row hover, `.is-selected` row | Grey 4 / brand tint 10% | Header fill token / active nav row. Default tables stay as drawn (no zebra, hover, selection in Figma) |
| A-Z disabled letter | Grey 3 text, no pointer | Existing neutral |
| Day tile hover | blue tint 10% without stroke | Selected-tile fill |
| Event card hover | stroke #3675D2@0.3 | Selected-card stroke |
| Update card hover | Grey 4 fill | Subtle surface |
| Inactive bookmark / active bell icon-buttons | no tint + outline glyph / orange tint + filled glyph | Table-row inactive glyph; Recent Updates chip |
| Anchor menu hover | Grey 4 fill, text #000 | Active item fill |
| Attachment chip hover | Grey 3 fill | Button Outline hover |
| `.input-currency` hover / focus / error | field recipe | Fields |
| `.editor` focus / error | brand / red stroke | Fields |
| Login error / success / loading | red stroke + Regular 10 helper; `.text-new`; disabled button look | Admin External password error (1895:21136) |
| `.modal__title` | Medium 14 #005268 slot | Panel-title role |
| `.tooltip` | brand fill, white Regular 12, radius 4, padding 4/8, Shadow | Primary-button colours, control radius, effect style |
| `.toast` (+ `--success/--error/--warning`) | white card + Shadow + 3px left status bar | Popover recipe + nav sub-item accent stroke; Green / Red / Orange / Blue |
| `.skeleton` | static Grey 3 blocks, radius 4, heights 16 / 13 / 32 | Control radius; no shimmer because Figma defines no durations / easings |
| `.empty-state` | centred Regular 12 #A8B6CD (+ Medium 12 #7C8DAC title) | Drawn "No event selected" recipe |
| `.accordion` | header 32 Medium 12 #005268 + chevron, body #FBFBFC | Drawn expandable table row + nav chevron |
| `.form-error` | Regular 10 #DA4D43 | Field error helper (1895:21137) |
| `--z-*` tokens | 0 / 10 / 20 / 100 / 200 / 210 | Stacking order of the Search screen (tabs < panel < scrim < dropdown < nav) |
| Font fallback stack | `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` after Geist | Only so the page renders before the webfont loads |

# MakorX.AI HR — CONTROLS / COMPONENTS (harvested from the built app)

Source of truth: `makor-hr/employees.html` (5743 lines). `<style>` = lines 10–1720, scripts 3506–5557 + 5719–5741.
Notation: `L<n>` = source line. `computed` = measured with getComputedStyle in a real Chrome tab (light and dark), animations finished.
All colours below are exact. `rgba()` kept as written in source. Font everywhere = `'Geist',-apple-system,BlinkMacSystemFont,sans-serif` (L13/L487) via `input,select,textarea,button{font-family:inherit;font-size:inherit}` (L14); only `.nav-wordmark`/`.nav-sub` use `'Lexend Exa'`. Body base: 14px / line-height 1.5 (computed 21px) / color #1a1a1a.
Measurement note: the harness ran at DPR 1.5, so 1px borders computed as 0.6667px and 1.5px/2px as 1.333px — borders below use the **source** widths (verified identical in computed colour/side layout). All radii are `4px` unless stated. All transitions use the default `ease` timing function.

---------------------------------------------------------------------------
## 0. CASCADE / DUPLICATE RULES (what is effective)

* The stylesheet is one `<style>`; light rules L11–L1044, dark overrides L1049–L1719 (`body.dark …`, specificity (0,1,1)+ so they win over light single-class rules; later wins on ties).
* Section comments repeat (`/* BUTTONS */` L550 is an EMPTY header — real buttons are L55–64 and L1006–1010; `/* APP DROPDOWN */` L823 is empty — real rules L29–40; `/* MODAL */` L389 and L811 (L811 section only adds `.modal-row/.req-type-*`); `/* TOAST */` L825).
* `.btn-cancel` is defined twice (L61 and L1007): identical visual values (h38, p0 20, 1px #c4cdd8, #7c8dac, 600, bg transparent, `transition:background 0.12s`); L1007 wins and only adds nothing new. Effective = single definition below.
* `.modal` (L392 – `.modal-overlay` variant: w740, border 1px #e5e7ec, shadow 0 8px 40px .16, translateY(10px)→0 .18s) is **overridden** for `.modal-backdrop .modal` (L980): `border:none; shadow 0 24px 60px rgba(0,0,0,.2); width 560 (inline 460/620 on some); transform:none; transition:none; max-height:none; display:block; overflow:hidden`. Same for `.modal-backdrop .modal-header/.modal-title/.modal-close/.modal-footer` (L981-985): title 18/800 #005268 (dark #0cb8d0), close = 32px **circle** border 1.5px #e5e7ec, header padding 22 24 18.
  Two modal families therefore exist: **A. `.modal-overlay` > `.modal`** (empModal, reqModal, holderModal, memberModal, poolModal) and **B. `.modal-backdrop` > `.modal`** (fillModal, calcModal, tsModal). Plus standalone **C.** `.tt-fillall-overlay`, `.tt-confirm-overlay`, **D.** `.req-success-backdrop`, **E.** `.emp-qcard-backdrop`.
* Dead/unused/bug rules found:
  * `.dept-chip*` (L690-692, dark L1626-1628) — no DOM instance (dept-filters markup absent). `.btn-ghost` is referenced in the hidden Today panel (L2260) but has **no CSS**. `.modal-textarea` (used in REQ_FORMS JS strings L4983-4984) has **no CSS** → renders as a native unstyled `<textarea>`. `.req-select-to` (L936) and `.info-field-*` (toggleEdit, L4669) are not instantiated in visible UI.
  * **BUG (effective in light mode):** L1608 `body.dark .phone-flag,.phone-code-val{color:#e2e8f4}` — second selector is not scoped, so `.phone-code-val` is **#e2e8f4 in LIGHT mode too** (computed light = rgb(226,232,244), near-invisible on #fff). `.phone-flag` is correctly #1a1a1a in light.
  * Inline light-mode disabled style: `style="opacity:0.45;cursor:not-allowed"` + `disabled` attribute on `#wfhPrefsBtn`,`#resetWFHBtn`,`#saveWFHBtn` (L2627,2651,2652; JS toggles `style.opacity`/`style.cursor` in renderWFHPrefs L4825, checkWFHChanged L4902). Dark mode neutralises it with `opacity:1!important` (L1090,1093).
  * Dept badge colours come from JS inline styles (`DC`, L3508) and are force-overridden in dark by `!important` rules (L1139-1152). `[style*="color:#7c8dac"]` etc. → dark remaps (L1703-1711).

---------------------------------------------------------------------------
## 1. BUTTONS

Markup (app): `<button class="btn-primary"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> New Employee</button>` (L1789). Small variants use 13x13 / stroke-width 2.5 (L2798) or 12x12 / 2.5 (`.btn-add-member`).

| class | L | h | padding | font | light fill / text / border | dark | hover | transition |
|---|---|---|---|---|---|---|---|---|
| `.btn-primary` | 58 | 36 | 0 14 | 14/500 | bg #005268, #fff, none | bg #0cb8d0, text #111214 (L1089) | `opacity:.85` | `opacity 0.12s ease` |
| `.btn-outline` | 56 | 36 | 0 14 | 14/500 | bg #fff, #1a1a1a, 1px #e5e7ec | bg #26292e, #c8d4e8, 1px rgba(255,255,255,0.12) | border+text #005268 (dark #0cb8d0) | `border-color 0.12s, color 0.12s` |
| `.btn-cancel` | 61/1007 | 38 | 0 20 | 14/600 | transparent, #7c8dac, 1px #c4cdd8 | bg rgba(255,255,255,0.08), #8a97aa, **no border** (L1094) | bg #f5f5f8 (dark rgba(255,255,255,0.13)) | `background 0.12s` |
| `.btn-cta` | 63 | 38 | 0 24 | 14/500 | bg #005268, #fff, none | #0cb8d0 / #111214 | opacity .85 | opacity .12s |
| `.btn-req-cancel` | 959 | 38 | 0 20 | 14/600 | = btn-cancel (light) | border 1px rgba(255,255,255,0.10), #8a97aa, transparent | bg #f5f5f8 (dark rgba(255,255,255,0.04)) | background .12s |
| `.btn-req-send` | 961 | 40 | 0 24 | 14/500 | bg #fff, #005268, **1.5px** #005268, gap 8 | bg #202226, #0cb8d0, border #0cb8d0 | bg #005268 + text #fff (dark bg #0cb8d0 text #fff) | `background,color 0.15s` |
| `.req-success-btn-new` | 976 | 40 | flex:1 | 14/600 | same outline-primary as btn-req-send | same | same | .15s |
| `.req-success-btn-back` | 978 | 40 | flex:1 | 14/600 | bg #005268 #fff | bg #0cb8d0 #111214 | bg #003d50 (dark #0aacc3) | `background .15s` (no JS buttons use these: popup has none in DOM) |
| `.btn-close-calc` | 1022 | 40 | 0 26 | 14/500 | bg #fff #005268 1.5px #005268 | bg #202226 #0cb8d0 border #0cb8d0 | bg #005268 #fff (dark #0cb8d0 #fff) | .15s |
| `.calc-accrual-btn` | 1019 | 36 (p7 14) | | 14/600 | bg #fff #005268 1.5px #005268, gap 7, inline-flex | bg #202226 | bg #f5f5f8 (dark rgba(12,184,208,0.08)) | `background .15s` |
| `.btn-save` (ts modal) | 1009 | 40 | 0 24 | 14/500 | bg #fff, #a8b6cd, 1.5px #a8b6cd, `cursor:not-allowed` (disabled look) | bg #26292e, #505a6c, 1.5px rgba(255,255,255,0.10) | — | `background,color,border-color .15s` |
| `.btn-save.ready` | 1010 | | | | border+text #005268, cursor pointer; hover bg #005268 text #fff | border+text #0cb8d0; hover bg #0cb8d0 text #fff | | JS `updateTotal()` toggles `.ready` when all rows valid |
| `.ts-btn` | 839 | 38 | 0 20 | 14/600 | = btn-cancel | border rgba(255,255,255,0.10), #8a97aa; hover rgba(255,255,255,0.04) | | |
| `.ts-btn-primary` | 841 | 38 | 0 20 | 14/500 | = btn-cta | #0cb8d0/#111214 | .85 | |
| `.btn-add-member` | 440 | 30 | 0 10 | 12/500 gap 4 | bg #005268 #fff | #0cb8d0/#111214 | .85 | |
| `.btn-inline-add` | 460 | 40 | 0 14 | 13/500 | bg #005268 #fff | #0cb8d0/#111214 | .85 | |
| `.tt-btn-approve` | 356 | 38 | 0 28 | 14/600 | #005268/#fff | #0cb8d0/#111214 | .85 | |
| `.tt-btn-fill-all` | 358 | 38 | 0 20 | 14/600 | = btn-cancel | border rgba(255,255,255,0.10), #8a97aa | bg #f5f5f8 / dark rgba(255,255,255,0.04) | |
| `.tt-confirm-ok` / `-cancel` | 385/383 | 38 | 0 24 / 0 20 | 14/600 | primary / cancel | #0cb8d0 #111214 / border rgba(255,255,255,0.10) #8a97aa | | |
| `.tt-fill-save` / `-cancel` | 351/353 | 32 | 0 14 / 0 12 | 13/600 | primary / cancel | | | |
| `.rv-btn-approve` | 273 | 30 | 0 12 | 13/600 | transparent, #16a34a, 1px #16a34a | #34d399 text+border | hover bg #f0fdf4 (dark rgba(52,211,153,0.10)) | `background .12s` |
| `.rv-btn-deny` | 275 | 30 | 0 12 | 13/600 | transparent, #dc2626, 1px #dc2626 | #f87171 text+border | hover bg #fef2f2 (dark rgba(248,113,113,0.10)) | |
| `.btn-save-bar` (in save bar) | 641 | 34 | 0 18 | 14/600 | bg #fff, #005268 (unchanged in dark) | unchanged | opacity .85 | `opacity .15s` |
| `.btn-discard-bar` | 643 | 34 | 0 16 | 14/500 | transparent, rgba(255,255,255,0.75), **1.5px** rgba(255,255,255,0.4) | unchanged | color #fff, border rgba(255,255,255,0.7) | `color,border-color .15s` |

Inline overrides: Time-Off "New Request" = `.btn-primary` + `style="height:32px;font-size:13px;padding:0 14px"` (L2797; computed 128.3×32). `.btn-primary` in Time Off/pool right panel 13px icon.
Icon-only buttons: `.modal-close` (A) 32×32 r4 transparent, color #7c8dac, hover bg #f5f5f8 + color #1a1a1a (dark: color #8a97aa, hover rgba(255,255,255,0.06)+#e2e8f4), transition `background 0.12s, color 0.12s`; icon `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`. `.modal-close` (B) 32×32 circle, 1.5px #e5e7ec, bg #fff, color #7c8dac, hover border #7c8dac + color #005268 (`transition border-color .15s`); content is the text glyph `×` (16px) or `✕`. `.emp-qcard-close` 32×32 circle 1.5px #e5e7ec bg #fff #7c8dac glyph `✕`, hover bg #f5f5f8. `.tt-fillall-close` 32×32 circle 1px #e5e7ec (dark: transparent, rgba(255,255,255,0.12)), icon 14px stroke 2.5. `.wfh-nav-btn` 32×32 r4 1px #e5e7ec bg #fff #7c8dac, hover bg #f5f5f8 + #1a1a1a (dark bg #26292e, #8a97aa; hover rgba(255,255,255,0.05)+#e2e8f4); icons `<polyline points="15 18 9 12 15 6"/>` 14×14 stroke 2.5. `.dp-nav` 28×28 r4 1px #e5e7ec bg #fff #7c8dac, hover bg #f5f5f8 / #005268 / border #c1ecf0; icons `<path d="m15 18-6-6 6-6"/>` / `<path d="m9 18 6-6-6-6"/>` 14×14 stroke 2.5 round caps+joins; dark: bg #202226, border rgba(255,255,255,0.10), #8a97aa; hover rgba(255,255,255,0.06), #0cb8d0, border rgba(12,184,208,0.40). `.bal-action-btn` 28×28 circle 1.5px #e5e7ec bg #fff, hover border #7c8dac (`border-color .15s`), icons 14px stroke 2. `.eqa-btn` 32×32 r4 transparent #a8b6cd (dark #505a6c), svg 18×18, hover color #005268 bg #f0f4f8 (dark #0cb8d0 + rgba(12,184,208,0.10)); copy-success sets inline `color:#059669` + check svg 18px for 1800 ms (L4738). `.entry-remove` 28×28 circle 1.5px #fde8e6, bg #fff, #da4d43, hover bg #fde8e6 (dark border rgba(248,113,113,0.30), bg #26292e, #f87171, hover rgba(248,113,113,0.15)). `.inline-list-item-remove` 24×24 r4 #a8b6cd → hover bg #fde8e6 #da4d43 (dark hover rgba(248,113,113,0.15) #f87171).
Text-link actions: `.modal-add-entry` 14/600 #005268 (dark #0cb8d0) hover opacity .75; `.add-entry-link` 12/600 #005268, opacity 0 → 1 on `.day-row:hover` (.15s), hover .75; `.back-link` 14/500 #7c8dac (dark #8a97aa) hover #005268 (dark #0cb8d0) `color .15s`; `.fc-link`/`.drawer-meta-link`/`.dir-manager-link` #005268 600/500, hover underline.
Focus: no custom focus style on any button (browser default). No `:active` rule anywhere. Disabled: only inline (light) / `body.dark .btn-primary:disabled` (L1090: bg #26292e, color rgba(255,255,255,0.22), cursor not-allowed) / `body.dark .btn-outline:disabled` (L1093: bg #26292e, border rgba(255,255,255,0.06), color rgba(255,255,255,0.18)).

---------------------------------------------------------------------------
## 2. TEXT INPUTS / TEXTAREA / SEARCH

Common focus (all inputs): `border-color:#005268; box-shadow:0 0 0 3px rgba(0,82,104,0.12)` (dark: #0cb8d0 + rgba(12,184,208,0.12)); `outline:none`. Exceptions: `.dir-search:focus` shadow 3px rgba(0,82,104,0.10) (dark 0.10); `.tt-fill-input:focus`/`.tt-fillall-input:focus` shadow 2px rgba(0,82,104,0.1) (dark 2px rgba(12,184,208,0.12)); `.req-textarea-to:focus` border only; `.dir-select:focus`, `.ampm-select:focus` border only; `.hist-range-picker:focus-within` border only (#005268 / #0cb8d0). Placeholder color: #a8b6cd (`.search-input::placeholder` #7c8dac; `.time-input::placeholder` #7c8dac) ; dark #505a6c. Caret = text colour.

| class | L | h | pad | font | light bg/border | dark | transition |
|---|---|---|---|---|---|---|---|
| `.search-input` (+ `.search-icon` abs left 12) | 71 | 40 | 0 12 0 36 | 14/400 #1a1a1a | #fff, 1px #e5e7ec; width 100% of `.search-wrap` (flex:1,min 180,max 220; inline overrides 300/180) | bg transparent, border rgba(255,255,255,0.10), text #e2e8f4, icon #505a6c | none (no transition on search-input) |
| `.modal-input`, `.modal-select` | 409 | 40 | 0 12 | 14/400 | #fff, 1px #e5e7ec | transparent, rgba(255,255,255,0.10), #e2e8f4 | `border-color .12s, box-shadow .12s` |
| `.field-value` (My Info) | 632 | 40 | 0 12 | 14/400 | #fff, 1px #e5e7ec, `display:flex` | transparent, rgba(255,255,255,0.10) | `border-color .15s, box-shadow .15s` |
| `.field-value.readonly-field` | 633 | 40 | | #7c8dac | bg #f5f5f8, pointer-events none, cursor default, no hover/focus | bg rgba(255,255,255,0.04), #8a97aa | |
| `.dir-search` | 682 | 38 | 0 12 0 38 | 13/400 | #fff 1px #e5e7ec; icon #7c8dac 16px left 12 | | border-color/box-shadow .12s |
| `.req-date-input`, `.req-amount-input`, `.time-input`, `.fill-modal-input` | 932,939,995,846 | 40 | 0 12 | 14/400 (time-input center, w80) | #fff 1px #e5e7ec; amount w90, date w160 | transparent/rgba(255,255,255,0.10) | `border-color .15s` |
| `.tt-fill-input` | 349 | 32 | 0 8 | 13/400 | #fff 1px #e5e7ec; w108 | | none |
| `.tt-fillall-input` (type=time) | 372 | 44 | 0 12 | **16**/400 | #fff 1px #e5e7ec | | none |
| `.req-textarea-to` | 946 | min-h 90 | 10 12 | 14/400 | #fff 1px #e5e7ec; `resize:vertical` | bg #202226 (not transparent), border rgba(255,255,255,0.10) | border-color .15s |
| `.phone-number-input` | 608 | 38 | 0 12 | 14/400 | border none, transparent; inside `.phone-input-wrap` | #e2e8f4 | |
| `.bal-sidebar-date`, `.hist-range-input` (native date, picker icon hidden) | 950/905 | 32 / auto | 0 | 14/700 / 14 | borderless transparent | | |

Error / invalid: **no CSS class for error**. Only: `.tt-fill-input` gets inline `style.borderColor='#dc2626'` on invalid time (L4188; cleared on next valid save). Required marker `.req-star` color #da4d43 (12/600 `*`). Validation otherwise via `alert()` (L3763,3765,4489,4539,4558). `readonly` field + `.field-note` (12/400 #a8b6cd (dark #505a6c), margin-top 6) is the only "helper text".
Native date/time pickers: `.modal-input[type=date]::-webkit-calendar-picker-indicator` opacity .38 16×16 (hover .65; dark `filter:invert(1)` .30/.55); `.dt-empty` colour #a8b6cd (dark #505a6c); `.tt-fillall-input[type=time]` dark indicator `filter:invert(1) sepia(1) saturate(3) hue-rotate(155deg)` opacity .8.

Search icon SVG: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>` colour #005268 (dark #505a6c) in `.search-icon`; `.dir-search-icon` uses `<line x1="21" y1="21" x2="16.65" y2="16.65"/>` colour #7c8dac.

Labels: `.modal-label` 12/500 #7c8dac (dark #8a97aa); `.field-label` 10/700 uppercase ls 0.06em (0.6px) #a8b6cd margin-bottom 6 (dark #505a6c); `.req-label` 12/600 #1a1a1a margin-bottom 7; `.fill-modal-label`/`.time-label` 12/700 uppercase ls 0.72px #a8b6cd; `.tt-fillall-lbl` 11/700 ls 0.77px #a8b6cd.

---------------------------------------------------------------------------
## 3. NATIVE SELECTS (arrow = background SVG)

* `select.field-value` (L636): padding-right 32; bg-image `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23005268' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 8l9 9 9-9'/%3E%3C/svg%3E")` no-repeat `right 10px center`, bg-color #fff, cursor pointer. Dark: transparent bg + same SVG with stroke `%230cb8d0`.
* `.modal-select` (L416): `appearance:none`, 12×8 svg `<path d='M1 1L6 6L11 1' stroke='%23005268' stroke-width='1.5' stroke-linecap='round'/>`, `right 12px center`, padding-right 32. Dark stroke %230cb8d0.
* `.ts-select` (L836) 40h p0 28 0 12, same 16px chevron at `right 10px center`; `.ampm-select` (L998) 40h p0 28 0 12, 14/**500**, chevron `right 8px center`, transition border-color .15s.
* `.dir-select` (L686) 38h p0 28 0 12, 13px, `background:#fff url(svg 12×12 viewBox 24 stroke %23005268 stroke-width 2.5 polyline points='6 9 12 15 18 9') no-repeat right 8px center; background-size:12px`. 
Hover: `.field-value:not(.readonly-field):hover` border #a8b6cd (dark rgba(255,255,255,0.20)). Popup list is the browser native.

---------------------------------------------------------------------------
## 4. CUSTOM SELECT (`.cust-select`) — the main dropdown control

Markup (L1800-1811):
```html
<div class="cust-select cs-dept" id="cs-dept">
 <div class="cust-select__trigger" onclick="csToggle('cs-dept')"><span class="cust-select__value">Department</span>
  <svg class="cust-select__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l9 9 9-9"/></svg></div>
 <div class="cust-select__panel">
  <div class="cust-select__option selected" onclick="csPick('cs-dept','','Department',filterDept)">All Departments</div> …
```
Variant chevrons: Time-Off category select uses `width="14" height="14" stroke-width="2.5"` `<path d="m6 9 6 6 6-6"/>`; calc category 16×16 stroke-width 2 same path. `.has-value` is set on the trigger when a value is chosen (inline `has-value` in HTML for status/category defaults).

| part | L | computed (light) | dark |
|---|---|---|---|
| `.cust-select` | 74 | `position:relative; flex-shrink:0`; inside `.modal-field` → `display:block;width:100%` (L415) | |
| `.cust-select__trigger` | 75 | h40, `inline-flex`, ai center, jc space-between, gap 8, padding 0 12, bg #fff, 1px #e5e7ec, r4, 14/400, **placeholder-state colour #7c8dac**, nowrap, user-select none, cursor pointer, `transition:border-color 0.12s` | bg transparent, border rgba(255,255,255,0.10), colour #505a6c |
| `.has-value` | 76 | colour #1a1a1a | #e2e8f4 |
| hover | 77 | border #a8b6cd | rgba(255,255,255,0.20) |
| open (`.cust-select.open .trigger`) | 78 | border #005268 (no ring) | #0cb8d0 |
| `.cust-select__chevron` | 79 | 16×16, colour #005268, `transition:transform 0.15s`; open → `rotate(180deg)` (L80) | #0cb8d0 |
| fixed widths | 86-89 | `.cs-dept` 152, `.cs-office` 124, `.cs-status` 114, `.cs-group` 136 (trigger widths); pool: company 138, team 120, desk 112, group 136, but `poolPopulateDynamic` sets inline width = longest label width +48 | |
| `.cust-select__panel` | 81 | `display:none` → `.open` block; `position:absolute; top:calc(100% + 6px); left:0; min-width:100%; bg #fff; r4; **no border**; box-shadow:0 8px 32px rgba(0,0,0,0.12),0 2px 8px rgba(0,0,0,0.06); z-index 500; overflow hidden; padding 6px 0`; no max-height (12-item list = 504px) | bg #26292e; shadow 0 8px 32px rgba(0,0,0,0.50) (single) |
| `.cust-select__option` | 83 | padding 10 16, 14/400 #1a1a1a, nowrap, cursor pointer (no transition) | #c8d4e8 |
| option hover | 84 | bg #f5f5f8 | rgba(255,255,255,0.05) |
| option `.selected` | 85 | colour #005268, weight 500 | #0cb8d0 |

JS (L3652-3657, 5017-5023): `csToggle(id)` closes all other `.cust-select.open`, toggles `.open`; if inside `.modal-body` sets `overflowY:visible` so the panel is not clipped (restored on close). `csPick(id,val,label,cb)`: sets `data-val`, writes label into `.cust-select__value`, moves `.selected`, closes, toggles `.has-value` (empty value → placeholder colour), calls callback. Click outside (`document` click) and `Escape` close all. Pool selects use `poolCsToggle` (rebuilds options each open). No keyboard navigation (arrows/Enter), no typeahead, no ARIA.

---------------------------------------------------------------------------
## 5. COMBOBOX / AUTOCOMPLETE (pool employee search)

`<input class="modal-input" id="nh-name" autocomplete="off" oninput="poolFilterEmpDrop('nh')" onfocus="poolOpenEmpDrop('nh')" onblur="poolScheduleCloseDrop('nh')">` + a single portal `<div class="pool-emp-drop" id="pool-emp-drop-portal">` (L5707) positioned `position:fixed` at input `left`, `bottom+4px`, width = input width (JS L4446-4451). Panel: bg #fff, 1px #e5e7ec, r4, shadow `0 6px 20px rgba(0,0,0,0.12)`, z-index 9999, max-height 200 overflow-y auto (thin scrollbar rgba(0,0,0,0.10)); dark bg #26292e, border rgba(255,255,255,0.08), shadow 0 6px 20px rgba(0,0,0,0.50). Item `.pool-emp-drop-item` padding 10 14, 13px #1a1a1a (dark #c8d4e8), flex space-between, `transition:background 0.10s`, hover #f5f5f8 (dark rgba(255,255,255,0.05)); name 500; meta 12/400 #7c8dac (dark #8a97aa) = `role · #jobId`; empty row `.pool-emp-drop-empty` 13px #a8b6cd padding 10 14 "No match". Select on `mousedown` (so blur doesn't kill it); blur closes after 180ms. Filter = case-insensitive substring over name. Then "+ Add" (`.btn-inline-add`) pushes to temp list (see §15).

---------------------------------------------------------------------------
## 6. DATEPICKER (3 instances share CSS: `dp*` My Info DOB, `rdp*` time-off from/to, `nedp*` new-employee dob/hire)

Anatomy (L2430-2458): `.datepicker-wrap` (relative, w100%) › `.datepicker-input-wrap` (relative flex) › `input.datepicker-input[readonly]` + `span.datepicker-icon` ; then `.datepicker-cal` (popup) › `.dp-header` [`button.dp-nav` ‹ , `span.dp-month-label`, `button.dp-nav` ›] › `#…DayView` [`.dp-weekdays` (Su Mo Tu We Th Fr Sa) + `.dp-days`] or `#…YearView` `.dp-year-grid`.
Calendar icon (input): `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>` colour #005268 (dark #0cb8d0), `.datepicker-icon` absolute right 10, vertically centred, `pointer-events:none` (inline `cursor:pointer;pointer-events:auto` in rdp/nedp so icon also opens).

| part | L | values (light → dark) |
|---|---|---|
| `.datepicker-input` | 648 | h40, p0 36 0 12, 14/400 #1a1a1a, bg #fff, 1px #e5e7ec, r4, cursor pointer, `caret-color:transparent`, `transition:border-color .15s, box-shadow .15s`; hover border #a8b6cd; focus #005268 + 0 0 0 3px rgba(0,82,104,0.12); placeholder #a8b6cd. Dark: transparent bg, rgba(255,255,255,0.10), #e2e8f4; hover rgba(255,255,255,0.20); focus #0cb8d0. `.req-date-native` text #a8b6cd until `.has-date` → #1a1a1a (dark colour rule wins → #e2e8f4). |
| `.datepicker-cal` | 654 | `absolute; top:calc(100% + 6px); left:0; z-index:200; w280; padding 16; bg #fff; 1px #e5e7ec; r4; shadow 0 8px 32px rgba(0,0,0,0.12),0 2px 8px rgba(0,0,0,0.06); display none → .open block; user-select none`; computed 280×282.3. Dark: #26292e, border rgba(255,255,255,0.08), shadow 0 8px 32px rgba(0,0,0,0.50). No animation. |
| `.dp-header` | 656 | flex, space-between, ai center, margin-bottom 14 |
| `.dp-month-label` | 657 | 14/700 #1a1a1a, pointer; hover #005268 (dark #e2e8f4 → hover #0cb8d0); text `Mon YYYY` (MONTHS_SHORT) or `Select Year` in year mode; click toggles year view |
| `.dp-nav` | 659 | 28×28 (see §1) |
| `.dp-weekdays` | 661 | grid 7×1fr, margin-bottom 6; `.dp-wd` 10/700 #a8b6cd ls .04em (0.4px) padding 4 0 centred (dark #505a6c) |
| `.dp-days` | 663 | grid 7×1fr gap 2 |
| `.dp-day` default | 664 | h34, 13/500 #1a1a1a, r4, centred, pointer, `transition:background .1s,color .1s`; dark #e2e8f4 |
| `.dp-day:hover` | 665 | bg #f0f8fa, colour #005268 (dark bg rgba(12,184,208,0.10), #0cb8d0) |
| `.other-month` | 666 | colour #d0d7e3 (dark #2a3548); hover bg #f5f5f8 colour #a8b6cd (dark bg rgba(255,255,255,0.04) #505a6c); still clickable (selects adjacent month day) |
| `.selected` | 668 | bg #005268, #fff, 700; hover bg #004257 (dark bg #0cb8d0, #fff; hover #0aacc3) |
| `.today:not(.selected)` | 670 | colour #005268, 700, **border 1.5px #c1ecf0** (dark colour #0cb8d0, border rgba(12,184,208,0.40)) |
| disabled days / min-max | — | **none** (all days enabled) |
| `.dp-year-grid` | 671 | grid 4×1fr gap 4, max-height 200, overflow-y auto; 16 years (current−8 … +7); `‹ ›` jump ±16 years in year mode |
| `.dp-year-item` | 672 | h34 13/500 r4 pointer `transition:background .1s`; hover bg #f0f8fa #005268; `.selected` bg #005268 #fff 700 (dark #0cb8d0) |
Behaviour: week starts Sunday; day grid = leading prev-month days + month + trailing next-month filler only to complete the last row (35 or 42 cells); selecting writes value (`dp`: `Mar 14, 1986` = `MMM DD, YYYY`; `rdp`/`nedp`: `dd/mm/yyyy`), closes popup, `dp` calls `markDirty()`, `rdp` recomputes weekday count into the Amount field (`countReqWeekdays`, Sat/Sun excluded), clicks on arrows `stopPropagation`; opening one rdp closes the other; outside click closes (document listeners L5161, L5442); `nedp` sets `.modal-body` overflow visible while open. Initial views: dp → Mar 1986; nedp dob → Jan 1990; others → today. Popup opens below the input at +6px.
Native alternative: `input[type=date]` (modal-input / req-date-input / hist-range-input / bal-sidebar-date) with `::-webkit-calendar-picker-indicator` hidden (`display:none`) in req/hist/bal variants; `.hist-range-icon` calls `showPicker()`.

---------------------------------------------------------------------------
## 7. PHONE-CODE PICKER (`.phone-input-wrap`) (L2335-2357)

```html
<div class="phone-input-wrap"><div class="phone-code-wrap">
 <div class="phone-code-btn" onclick="togglePhoneDrop(this)"><span class="phone-flag">🇺🇸</span><span class="phone-code-val">+1</span>
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="phone-drop-arrow"><path d="m6 9 6 6 6-6"/></svg></div>
 <div class="phone-code-drop"> <div class="phone-code-opt selected" onclick="selectPhoneCode(this,'🇺🇸','+1')"><span class="opt-flag">🇺🇸</span><span class="opt-code">+1</span><span class="opt-name">United States</span></div> … 11 countries (+1 +44 +972 +971 +33 +49 +41 +65 +852 +81 +61) </div></div>
 <input type="tel" class="phone-number-input" …></div>
```
* `.phone-input-wrap` (L588): flex, h40, 1px #e5e7ec, r4, bg #fff, `overflow:visible`, `transition:border-color .15s, box-shadow .15s`; `:focus-within` border #005268 + 0 0 0 3px rgba(0,82,104,0.12). Dark: bg #26292e, border rgba(255,255,255,0.10); focus #0cb8d0 + rgba(12,184,208,0.12).
* `.phone-code-btn` (L592): h38, flex gap 4 center, padding 0 8 0 10, border-right 1px #e5e7ec only, r 4 0 0 4, bg #fff, pointer, `transition:background .12s`; hover #f5f5f8. Dark bg #26292e, border-right rgba(255,255,255,0.10), hover rgba(255,255,255,0.05). Computed 65.6×38.
* `.phone-flag` 14/500 #1a1a1a lh 1; `.phone-code-val` 14/500 lh 1 (**light colour bug #e2e8f4**, see §0); `.phone-drop-arrow` 12×12 #a8b6cd (dark #505a6c), `transition:transform .15s`, open → rotate(180deg).
* `.phone-code-drop` (L598): abs, `top:calc(100% + 6px); left:0; z-index:300; bg #fff; 1px #e5e7ec; r4; shadow 0 8px 24px rgba(0,0,0,0.10),0 2px 6px rgba(0,0,0,0.06); min-width:200; max-height:240; overflow-y auto; display none→block when `.phone-code-wrap.open`; thin scrollbar rgba(0,0,0,0.08)`. Dark bg #26292e, border rgba(255,255,255,0.08), shadow 0 8px 24px rgba(0,0,0,0.50).
* `.phone-code-opt` (L600): flex gap 10, padding 8 14, 13px #1a1a1a (dark #c8d4e8), pointer, `transition:background .1s`; hover #f5f5f8 (dark rgba(255,255,255,0.05)); `.selected` bg #f0f8fa colour #005268 (dark rgba(12,184,208,0.10) / #0cb8d0); first/last child r 4 4 0 0 / 0 0 4 4. `.opt-flag` 18px w22; `.opt-code` 600 min-w 40 (inherits colour); `.opt-name` 12px #7c8dac (dark #505a6c).
* JS (L5310-5329): `togglePhoneDrop` closes others, toggles `.open`; `selectPhoneCode` writes flag + code into the button, moves `.selected`, closes, `markDirty()`; outside click closes. No search, no keyboard.

---------------------------------------------------------------------------
## 8. CHECKBOX / RADIO / TOGGLE

* **Native checkbox/radio styled controls: none.** Only a custom checkbox: WFH day check `.wfh-day-check` (L757): `<label class="wfh-day-check [pending-day]"><input type="checkbox" (display:none)><div class="wfh-day-label">Mon</div><div class="wfh-day-box"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div></label>` ; label col flex gap 6 centred, pointer. `.wfh-day-label` 11/600 uppercase ls 0.06em (0.66px) #7c8dac (dark #8a97aa). `.wfh-day-box` 38×38 r4, **1.5px** border; unchecked bg #f5f5f8 border #e5e7ec, check icon opacity 0; checked bg #c1f0d5 border #c1f0d5 colour #179484 + icon opacity 1; pending (`.pending-day` = checked but not approved) bg #fef3c7 border #f59e0b colour #d97706; hover (label) box border #7c8dac; `transition:all .12s` (icon `opacity .12s`). Dark: unchecked bg rgba(255,255,255,0.04) border rgba(255,255,255,0.10); checked bg rgba(45,212,191,0.20) border rgba(45,212,191,0.50) #2dd4bf; pending bg rgba(251,191,36,0.16) border rgba(251,191,36,0.50) #fbbf24; hover border rgba(255,255,255,0.25).
* **Request-type tiles (radio-like cards)** `.req-type-btn` (L816): padding 16 12, **2px** border #e5e7ec, r4, bg #fff, column flex centred gap 6, `transition:all .12s`; hover border #7c8dac; `.selected` border #005268 bg #f0f8fa. Icon tile `.req-type-icon-lg` 36×36 r4 (inline bg #eff6ff / #f5f3ff + icon stroke #1d4ed8 / #7c3aed, 18×18 stroke 2); label 13/600; desc 11 #7c8dac. Dark: bg #202226 border rgba(255,255,255,0.10) (hover rgba(255,255,255,0.22)); selected border #0cb8d0 bg rgba(12,184,208,0.08); icon bg rgba(255,255,255,0.07) colour #8a97aa (svg stroke currentColor!important).
* **Filter pill tabs** `.req-tab` (L794): h32 p0 14, 12/500, 1px #e5e7ec bg #fff #7c8dac, r4, `transition:all .12s`; `.active` bg rgba(0,82,104,0.08) border+text #005268 (dark bg rgba(12,184,208,0.12) #0cb8d0; inactive dark bg #26292e, border rgba(255,255,255,0.10), #8a97aa). Container gap 4. Used instead of radios for All/Pending/Approved/Denied (JS `filterRequests`).
* **Toggle switch = dark-mode switch** `.dm-switch` (L1039): 32×18, r8, bg #e5e7ec, `transition:background .18s`; `.on` bg #005268 (dark #0cb8d0). Thumb `.dm-thumb` 14×14 circle #fff, abs top 2 left 2, shadow `0 1px 3px rgba(0,0,0,0.20)`, `transition:transform .18s`, on → translateX(14px). Lives in profile dropdown row `.profile-drop-item` (icon moon `<svg width="14" height="14" … stroke-width="1.8"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>` #7c8dac, label "Dark mode" 13/500). JS `toggleDarkMode()` (L5720): `document.body.classList.toggle('dark')`, toggles `.on`, `localStorage['makor-dm']='1'|'0'`, re-runs `calcStats()`; restored on load (L5735). Whole row is the click target.

---------------------------------------------------------------------------
## 9. TABS

* **Detail tabs** `.detail-tabs` (L155) flex, bg #fff, border-bottom 1px #e5e7ec, padding `0 0 0 4`. `.detail-tab` (L156): `<button>` padding 12 16, 14/500 #7c8dac, bg transparent, no border except `border-bottom:2px solid transparent; margin-bottom:-1px`, nowrap, `transition:color .12s, border-color .12s`; hover #1a1a1a; `.active` colour #005268, border-bottom #005268, 600. Computed 44px tall. Dark: bar bg #202226 + border rgba(255,255,255,0.12); text #8a97aa; hover #e2e8f4; active #0cb8d0 / border #0cb8d0.
* **Profile tabs** `.content-tabs` (L531) flex gap 0, padding 0 24, border-bottom 1px #e5e7ec; `.profile-tab` (L534): `<div>` padding 13 18, 14/600 #7c8dac, `border-bottom:2.5px solid transparent; margin-bottom:-1px`, `transition:color .15s`, user-select none; hover #1a1a1a; `.active` #005268, 700, border #005268. (computed border 2.5px→snapped.) Dark same colours as detail tabs. JS: click handlers set `.active` on tab + `#panel-<data-tab>`, scroll top, `history.replaceState('#myinfo:tab')`.
* **Top nav links** `.nav-link` 14/400 #000 (dark #c8d4e8) no underline; hover opacity .7; `.active` 600 + underline (`text-underline-offset:3px; text-decoration-thickness:2px`).
* Sort header: `.emp-table th` 12/700 uppercase ls .06em #a8b6cd bg #f5f5f8 pointer; hover & `.sorted` colour #005268 (dark #0cb8d0); sort icon 12×12 inline svgs: unsorted `<path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/>` opacity .4, asc `<path d="m18 15-6-6-6 6"/>`, desc `<path d="m6 9 6 6 6-6"/>`, stroke-width 2 round, `.sorted .sort-icon` opacity 1.

---------------------------------------------------------------------------
## 10. BADGES / PILLS / TAGS — complete colour map

Base shapes: r4 everywhere (no pill-radius). Text weights as listed. All are inline `<span>`.

### 10a. Status pills (light → dark)
| class | L | size | light bg / text | dark bg / text |
|---|---|---|---|---|
| `.status-pill` base | 123 | 12/600 p3 10, inline-flex center | | |
| `.status-active`, `.active-badge`, `.inline-badge.active`, `.wfh-prefs-badge.approved`, `.req-status.approved`, `.wfh-status-pill.wfh` | 124,451,471,753,807,783 | | **#c1f0d5 / #179484** | status/active-badge/inline-badge/wfh-prefs approved: **rgba(45,212,191,0.16) / #2dd4bf**; `.req-status.approved` rgba(52,211,153,0.15) / #34d399; `.wfh-status-pill.wfh` rgba(45,212,191,0.18) / #2dd4bf |
| `.status-inactive`, `.inactive-badge`, `.inline-badge.inactive`, `.req-status.denied` | 125,452,472,808 | | **#fde8e6 / #da4d43** | rgba(248,113,113,0.15) / #f87171 |
| `.wfh-status-pill.office` | 784 | 10/700 uppercase ls .04em p3 7 | #dbeafe / #1d4ed8 | rgba(96,165,250,0.18) / #60a5fa |
| `.wfh-status-pill.away` | 785 | | #fde8e6 / #da4d43 | rgba(248,113,113,0.18) / #f87171 |
| `.wfh-prefs-badge` base | 752 | 11/700 p3 10 | | |
| `.wfh-prefs-badge.pending`, `.req-status.pending` | 754,806 | req-status 11/700 p3 10 | #fef3c7 / #d97706 | rgba(251,191,36,0.15) / #fbbf24 |
| `.req-status` base | 805 | 11/700 p3 10 inline-block | | |
| `.rv-status` base | 261 | 12/600 p4 10 inline-flex gap 4 (height 26) | | |
| `.rv-status.new` (text "● New") | 262 | | #d4eee9 / #005268 | rgba(12,184,208,0.15) / #0cb8d0 |
| `.rv-status.pending` | 263 | | #fff8ec / #d97706 | rgba(251,191,36,0.15) / #fbbf24 |
| `.rv-status.approved` | 264 | | #f0fdf4 / #16a34a | rgba(52,211,153,0.15) / #34d399 |
| `.rv-status.denied` | 265 | | #f5f5f8 / #a8b6cd | rgba(255,255,255,0.06) / #505a6c |
| `.tt-badge-pending` | 307 | 12/600 p3 10 inline-flex | #fef3c7 / #92400e | rgba(251,191,36,0.16) / #fbbf24 |
| `.tt-badge-approved` | 308 | | #d1fae5 / #065f46 | rgba(52,211,153,0.15) / #34d399 |
| `.tt-badge-none` | 309 | | #f5f5f8 / #a8b6cd | rgba(255,255,255,0.06) / #505a6c |
| `.record-badge` | 140 | 12/600 ls .02em p3 8 | #e5e7ec / #7c8dac | rgba(255,255,255,0.07) / #8a97aa |
| `.app-drop-item-badge` "Current" | 39 | 10/700 ls .04em p2 6 | #e8f4f8 / #005268 | rgba(12,184,208,0.15) / #0cb8d0 |
| `.dir-you` | 702 | 10/700 p2 6 | #f0f8fa / #005268 | rgba(12,184,208,0.12) / #0cb8d0 |
| `.ev-badge.birthday` | 571 | 11/600 p3 10 (hidden Today panel) | #fff7ed / #ea7a1e | rgba(234,122,30,0.16) / #fb923c |
| `.ev-badge.anniversary` | 572 | | #ede9fe / #7c3aed | rgba(167,139,250,0.16) / #a78bfa |
| `.inline-badge` base | 470 | 11/600 p2 8 inline-flex | | |

### 10b. Department badges — generated by JS (L3508 `DC`; applied as inline `style="background:…;color:…"` on `.dept-badge` L3618 and `#dDept` `.drawer-dept-badge` L3681-3682)
`.dept-badge`: 12/500 p3 10; `.drawer-dept-badge`: 12/600 p3 10; both `data-dept` attr.
| dept | light inline bg / text | dark (!important, L1139-1152, computed) |
|---|---|---|
| Equities | #cad8f4 / #2456a0 | rgba(99,152,255,0.16) / #7aabff |
| Fixed Income | #c1ecf0 / #0d6e7a | rgba(45,212,191,0.14) / #2dd4bf |
| Technology | #c8f0e0 / #0d7a5f | rgba(52,211,153,0.14) / #4ade80 |
| Operations | #fce8d0 / #a35c18 | rgba(251,146,60,0.16) / #fb923c |
| Compliance | #f0eafc / #6e42a0 | rgba(167,139,250,0.16) / #a78bfa |
| Finance | #d8eef8 / #1a5a7a | rgba(96,186,240,0.16) / #60baf0 |
| inactive employee (any dept) | #e5e7ec / #a8b6cd | generic dark rule rgba(255,255,255,0.06) / #505a6c — **but** `[data-dept=…]` rules still match (`data-inactive` is not excluded) so inactive rows in dark show their dept colour |
| unknown dept fallback | #f5f5f8 / #7c8dac | rgba(255,255,255,0.06) / #505a6c |

### 10c. Pool badges (L433): `.pool-badge` 14/500 p6 14 gap 8 flex (counts; text span inline `color:#000`) — `.holders` bg #cad8f4 / #2456a0, dark rgba(99,152,255,0.16) / #7aabff; `.members` bg #c1ecf0 / #0d6e7a, dark rgba(34,211,238,0.16) / #22d3ee (`body.dark .pool-badge span{color:inherit!important}`); `.grey` opacity .45 (when count 0). Icons: holders `<svg width="20" height="20" …stroke-width="2"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/></svg>`; members `<svg width="22" height="20" …><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`.

### 10d. Request-type icon tiles (JS `REQ_TYPE_META` L3814, inline `background/color`; dark via `[data-reqtype]` !important L1364-1368)
| type | light bg / icon | dark bg / icon |
|---|---|---|
| annual `.rv-type-icon` (30×30 r4) | #eff6ff / #2563eb | rgba(37,99,235,0.16) / #60a5fa |
| sick | #fef2f2 / #dc2626 | rgba(220,38,38,0.16) / #f87171 |
| wfh | #ecfdf5 / #059669 | rgba(5,150,105,0.16) / #4ade80 |
| location (Remote Office) | #f0f4ff / #3b5fc0 | rgba(124,58,237,0.16) / #c4b5fd |
| any other (dark) | — | rgba(255,255,255,0.06) / #8a97aa |
| `.req-icon-sm` (28×28, My-Profile list; JS `REQ_BG` L4933): timeoff | #eff6ff / #1d4ed8 | rgba(37,99,235,0.16) / #60a5fa |
| sick | #fef2f2 / #da4d43 | rgba(220,38,38,0.16) / #f87171 |
| location | #f5f3ff / #7c3aed | rgba(124,58,237,0.16) / #c4b5fd |
Icons (16×16 / 18×18, stroke currentColor 2, round caps): annual/timeoff calendar `<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>`; sick `<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>`; wfh `<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`; location `<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>`.
Other colour chips: `.wfh-stat-icon-wfh` bg #c1f0d5 (icon stroke #179484; dark rgba(23,148,132,0.22)!important / #2dd4bf), `-office` bg #dbeafe (#1d4ed8; dark rgba(37,99,235,0.18) / #60a5fa); `.wfh-legend-dot` 10×10 r2 (#c1f0d5 / #dbeafe / #fde8e6; dark rgba(45,212,191,0.50)/rgba(96,165,250,0.50)/rgba(248,113,113,0.50)); `.reminder-icon` (inline #fef3ec / #eef2ff → dark rgba(251,146,60,0.14)/rgba(99,102,241,0.14)); `--wfh-icon-bg:#c1f0d5; --off-icon-bg:#dbeafe` (dark rgba(23,148,132,0.22)/rgba(37,99,235,0.18)) are the only CSS variables.
Tags/chips: none implemented (`.dept-chip` CSS only, dead). No removable tags.

---------------------------------------------------------------------------
## 11. DROPDOWN MENUS (app launcher, profile)

* **App launcher** (`.nav-apps-icon` 24×24 grid-of-9-circles svg, opacity .7 → hover 1, stroke #1a1a1a 1.2 r2 circles; dark `circle{fill:rgba(255,255,255,0.55);stroke:none}`) toggles `#appDrop` (`.app-drop`, L30): `position:fixed; top:82px; left:40px; width:226; bg #fff; 1px #e5e7ec; r4; shadow 0 8px 32px rgba(0,0,0,0.12),0 2px 8px rgba(0,0,0,0.06); z-index 9000; padding 6 0; display none → .open block`. No animation. Dark: bg #26292e, border rgba(255,255,255,0.08), shadow 0 8px 32px rgba(0,0,0,0.50).
  `.app-drop-section` 10/700 uppercase ls 0.10em #a8b6cd padding 8 14 4 (dark rgba(255,255,255,0.28)). `.app-drop-item` flex gap 10 padding 9 14 pointer, `transition:background .10s`, `<a>` has `text-decoration:none`; name 13/500 #1a1a1a (dark #c8d4e8); hover bg #f5f5f8 (dark rgba(255,255,255,0.05)) excluding current/no-access; `-current` bg #f0f8fa cursor default, name #005268/600 (dark bg rgba(12,184,208,0.10), #0cb8d0) + "Current" badge; `-noaccess` opacity .42 cursor not-allowed. `.app-drop-divider` 1px #e5e7ec margin 4 0 (dark rgba(255,255,255,0.07)). Items: Platform Apps = HR, My Profile, Compliance, Derivatives, Cash Equity, Ticketing, IT; No Access = P&L, Accounting, Research, Structured Products, BI, System.
* **Profile menu** `.profile-drop` (L1029): `fixed; top:82; right:40; w220;` same surface as app-drop; header `.profile-drop-header` padding 12 16 10 border-bottom 1px #e5e7ec (name 13/700 #1a1a1a, email 11 #7c8dac; dark #e2e8f4 / #8a97aa, border rgba(255,255,255,0.12)); item padding 9 16, hover #f5f5f8, icon #7c8dac 14px, label 13/500. Trigger `.nav-avatar` 42×42 circle 1px #e5e7ec bg #f5f5f8 14/500 initials (dark transparent border rgba(255,255,255,0.28) #e2e8f4).
* JS: `toggleAppDrop()`/`toggleProfileDrop()` toggle `.open`; outside click closes each (L3794, L5730); Escape closes app drop (L3792) but not profile drop.

---------------------------------------------------------------------------
## 12. MODALS, BACKDROPS, ANIMATION

| family | backdrop | panel | open animation | close |
|---|---|---|---|---|
| A `.modal-overlay` (L390) | fixed inset 0, rgba(0,0,0,0.28) (dark 0.55), z 900, flex centre; `opacity:0; pointer-events:none; transition:opacity .18s` → `.open` opacity 1 | `.modal` w740 (inline 440 / 620 / 680), max-height 82vh, flex column, bg #fff, 1px #e5e7ec, r4, shadow `0 8px 40px rgba(0,0,0,0.16)`; `transform:translateY(10px)`; `transition:transform .18s` → open translateY(0) | fade .18s + slide-up 10px, ease | Esc, backdrop click, ✕, Cancel. `document.body.style.overflow='hidden'` while open; first field focused (empModal immediately, pool modals after 50 ms) |
| B `.modal-backdrop` (L967) | fixed inset 0, rgba(0,0,0,0.45) (dark 0.60), z 800, `display:none` → `.open{display:flex}` | `.modal` w560 (fill 460, calc 620), `border:none; r4; shadow 0 24px 60px rgba(0,0,0,0.2)` (dark 0.60), overflow hidden, **no animation** | none | backdrop click / Esc / button |
| C `.tt-fillall-overlay`,`.tt-confirm-overlay` (L360,375) | rgba(0,0,0,0.28) z 1000, opacity .15s fade | `.tt-fillall-box` w420 / `.tt-confirm-box` w340, bg #fff, 1px #e5e7ec, r4, shadow 0 8px 40px (confirm 0 8px 32px) rgba(0,0,0,0.14), translateY(8px)→0 `.15s` | fade+slide-up 8px .15s | backdrop click |
| D `.req-success-backdrop` (L969) | rgba(20,30,48,0.35) + `backdrop-filter:blur(6px)`, z 900, opacity .25s (dark rgba(0,5,20,0.65)) | `.req-success-card` w360 max 92vw, padding 40 36 32, bg #fff, r4, shadow 0 24px 64px rgba(0,0,0,0.30), centred col gap 16 (dark bg #26292e, shadow .60); icon 64×64 circle bg #e8f5f3 colour #179484 (dark rgba(23,148,132,0.18) / #2dd4bf), check svg 28×28 stroke 2.5 `<polyline points="20 6 9 17 4 12"/>`; title 20/800 #005268 (dark #0cb8d0); sub 14 #7c8dac lh1.5 | fade only | **auto-closes after 2800 ms** (`showSuccessPopup`, L5048-5053) |
| E `.emp-qcard-backdrop` (L711) | fixed inset 0, rgba(0,0,0,0.45) (dark 0.60), z 300, `display:none`→flex (inline) | `.emp-qcard` w520 padding 28, bg #fff, 1px #e5e7ec, r4, shadow 0 24px 60px rgba(0,0,0,0.2) (dark 0.60) | none | backdrop click, ✕, Esc |

Modal A internals: `.modal-header` flex space-between padding 20 24 border-bottom 1px #e5e7ec; `.modal-title` 16/700 #1a1a1a; `.modal-body` padding 24 overflow-y auto flex 1 thin scrollbar rgba(0,0,0,0.10); `.modal-footer` flex space-between gap 8 padding 16 24 border-top 1px #e5e7ec; `.modal-section` margin-bottom 24; `.modal-section-title` 12/700 uppercase ls .06em #7c8dac margin-bottom 14; `.modal-grid` 3×1fr gap 14 16 (inline 2 cols/1 col); `.modal-field` column gap 6; `.modal-divider` 1px #e5e7ec margin 4 0 24 (dark rgba(255,255,255,0.07)); `.modal-row` grid 2×1fr gap 12. Dark: panel bg #26292e border rgba(255,255,255,0.08) (shadow unchanged 0.16); header/footer borders rgba(255,255,255,0.12); title #e2e8f4.
Modal B internals: `.modal-day` padding 18 24 border-bottom, icon tile 42×42 r4 bg #f5f5f8 (dark rgba(255,255,255,0.06)), label 18/700; `.modal-entries` padding 20 24; `.entry-row` flex ai flex-end gap 10 margin-bottom 14; `.time-input` 80w centre; footer padding 16 24 bg #fff (dark #26292e); `.calc-*` blocks padding 18/20/16 24 with border-bottom 1px #e5e7ec, `.calc-result-box` 1px #e5e7ec r4 padding 18 20, `.calc-result-number` 28/800 #005268 (dark #0cb8d0), `.calc-user-avatar` 44×44 **r4** #e5e7ec #7c8dac 16/700 (dark #26292e), `.calc-footer` padding 14 24 flex end bg #fff (dark #202226).
Confirm box (`.tt-confirm-*`): padding 24 24 20; title 15/700; body 13 #7c8dac lh 1.5 margin-bottom 20; actions flex space-between gap 8. FillAll: header padding 22 24 0, title 17/700 #005268 (dark #0cb8d0), body padding 14 24 0, desc 13/lh1.6 #7c8dac, fields grid 2 gap 12, footer padding 20 24 border-top margin-top 20 space-between.
Z-index ladder: toast 9999, pool drop 9999, app/profile drop 9000, tt overlays 1000, modal-overlay & success 900, modal-backdrop 800, cust-select panel 500, phone drop 300, quick card 300, datepicker 200, save-bar 10.
Escape (L3792, L4569): closes app drop, reqModal, tsModal, calcModal, quick card, fillModal, empModal, and pool member/holder/pool modals (in that priority); does NOT close tt-fillall/confirm overlays or success popup.

---------------------------------------------------------------------------
## 13. TOAST

`<div class="toast" id="toast"></div>` (L3225). CSS L826: `position:fixed; bottom:32px; left:50%; transform:translateX(-50%) translateY(16px); bg #1a1a1a; colour #fff; 14/500; padding 12 20; r4; opacity 0; pointer-events none; transition:opacity .2s, transform .2s; z-index 9999; white-space nowrap; no shadow, no icon`. `.show` → opacity 1, translateY(0). Dark (L1677): bg #26292e, colour #e2e8f4, `border:1px solid rgba(255,255,255,0.10)`. JS `showToast(msg)` (L5010): sets text, adds `.show`, removes after **2800 ms**; one toast only (a second call re-uses the element, the earlier timer still fires). Used: "Changes saved", "WFH schedule saved", "Personal details saved". Success popup (D above) = larger confirmation with identical 2800 ms timer.

---------------------------------------------------------------------------
## 14. SAVE BAR / DIRTY TRACKING (My Info)

`.save-bar` (L638): `display:none` → `.visible{display:flex}`; `position:sticky; top:0; z-index:10; bg #005268; colour #fff; padding 10 24; ai center; space-between; 14/500; margin:-24px -24px 24px` (full-bleed strip above cards; computed 970.7×54). Text "You have unsaved changes"; actions flex gap 8: `Discard` (`.btn-discard-bar`), `Save changes` (`.btn-save-bar`). Dark: bg #0cb8d0, colour #111214 (buttons unchanged). JS: every `oninput/onchange` calls `markDirty()` (adds `.visible` once); Save → hides + toast "Changes saved"; Discard → hides then **`location.reload()`** (resets everything). No page-leave guard.

---------------------------------------------------------------------------
## 15. LISTS / CARDS / MISC CONTROLS

* **Employee quick card** (§12-E): head flex gap 16 padding-right 40 margin-bottom 20; avatar 64×64 circle `border:1px solid rgba(0,0,0,0.30)` transparent, 21/500 #000 (dark border rgba(255,255,255,0.28), #e2e8f4); name 18/700 lh 1.2; sub 13 #7c8dac "Role | Company"; rows container border-top 1px #e5e7ec margin-top 2; `.emp-qcard-row`/`-email-row` flex ai center gap 12 padding 11 0 border-bottom 1px #e5e7ec 14px (dark border rgba(255,255,255,0.06)); icon 16×16 #a8b6cd (dark #505a6c) — pin `<path d="M20 10c0 6-8 13-8 13S4 16 4 10a8 8 0 0116 0z"/><circle cx="12" cy="10" r="3"/>`, mail `<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/>`, phone `<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>`; actions copy `<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>` and mailto `<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>` (18×18 stroke 2, `title` attr tooltips). Opened by clicking a directory row. Local time via `Intl.DateTimeFormat` (TZ_MAP).
* **Inline list (pool modal)** `.inline-list` col gap 6 min-h 32; `.inline-list-item` flex space-between padding 8 12 bg #f5f5f8 (dark rgba(255,255,255,0.05)) r4 13px; name 13/600; meta 12 #7c8dac; empty text 13 #a8b6cd padding 6 0 ("No holders added yet"); `.inline-add-row` flex gap 8 ai flex-end margin-bottom 10 (button `margin-top:22px` inline).
* **Row hover/selection**: `.emp-table tr:hover td` bg #f5f5f8 (dark rgba(255,255,255,0.03)) pointer; `.active-row td` bg #f5f5f8 (dark rgba(255,255,255,0.04)) + `td:first-child{box-shadow:inset 3px 0 0 #005268}` (dark #0cb8d0); clicking the active row deselects. `.pool-row` hover #f5f5f8; `.active` bg #f5f5f8 + `border-left:3px solid #005268` (dark #0cb8d0), name turns #005268 (dark #0cb8d0). `.dir-row:hover` bg #f5f7fa (dark rgba(255,255,255,0.03)) + name #003d50 (dark #0cb8d0); `.dir-row-highlight` = `@keyframes dir-flash{0%{#e8f4f7}60%{#e8f4f7}100%{transparent}}` `1.4s ease-out` (jump-to-manager). `.tt-cal-cell.cc-missing` pointer, hover bg #ffe8e8 (dark rgba(248,113,113,0.16)). `.wfh-cell` pointer `transition:background .10s`; `.weekend` bg #fafafa (dark rgba(255,255,255,0.01)) no click; `.faded` opacity .3 no pointer events; `.today` bg #f0f8fa (dark rgba(12,184,208,0.07)) with number disc 22×22 #005268/#fff 11/600 (dark rgba(12,184,208,0.12)/#0cb8d0); click cycles `override wfh → office → none`.
* **TT inline fill bar** `.tt-fill-bar` hidden → `.open{display:flex}` flex-wrap gap 10 margin-top 14 padding 12 14 1px #e5e7ec r4 bg #fff (dark #202226 / rgba(255,255,255,0.07)); label 13/600 min-w 100; hint 13 #7c8dac. Save validates `^\d{1,2}:\d{2}$` and `to>from`, else inline red border #dc2626.
* **Scrollbars**: `scrollbar-width:thin; scrollbar-color:rgba(0,0,0,0.10) transparent` + webkit 6px thumb rgba(0,0,0,0.10) r2 (modal-body, tab-body; tables 0.12; rv/tt lists 0.08); dark thumb rgba(255,255,255,0.09), hover rgba(255,255,255,0.28).
* **Tooltips**: native `title` only (`.bal-action-btn`, `.eqa-btn`), no custom component.
* **Hover (remaining, light → dark)**: `.field-value` border #a8b6cd → rgba(255,255,255,0.20); `.datepicker-input` same; `.cust-select__trigger` as §4; `.profile-drop-item`/`.app-drop-item` bg #f5f5f8 → rgba(255,255,255,0.05); `.hist-range-icon` opacity .7→1; `.nav-link` opacity .7; `.req-type-btn` border #7c8dac → rgba(255,255,255,0.22); `.bal-action-btn` border #7c8dac → rgba(255,255,255,0.20); `.wfh-day-check` box border #7c8dac → rgba(255,255,255,0.25); `.inline-list-item-remove`, `.eqa-btn`, `.modal-close`, `.dp-*` as above.

---------------------------------------------------------------------------
## 16. EFFECTIVE LIGHT/DARK SURFACE TOKENS SEEN IN CONTROLS (for reference)
Light: page #fff; neutral border #e5e7ec; control border-strong (cancel) #c4cdd8; hover surface #f5f5f8; selected surface #f0f8fa; muted text #7c8dac; subtle text #a8b6cd; text #1a1a1a; brand #005268 (hover darker #003d50/#004257); focus ring rgba(0,82,104,0.12); focus-in-bar rgba(0,82,104,0.08) fill.
Dark: page #111214; nav #18181c; panel #202226; popover/modal #26292e; text #e2e8f4 / #c8d4e8 / #8a97aa / #505a6c; accent #0cb8d0 (hover darker #0aacc3); border rgba(255,255,255,0.07/0.08/0.10/0.12); hover rgba(255,255,255,0.03/0.05); on-accent text #111214.
Elevations: dropdown `0 8px 32px rgba(0,0,0,0.12),0 2px 8px rgba(0,0,0,0.06)`; phone drop `0 8px 24px rgba(0,0,0,0.10),0 2px 6px rgba(0,0,0,0.06)`; combobox `0 6px 20px rgba(0,0,0,0.12)`; modal A `0 8px 40px rgba(0,0,0,0.16)`; modal B/qcard `0 24px 60px rgba(0,0,0,0.2)`; success card `0 24px 64px rgba(0,0,0,0.30)`; panels `0 2px 8px rgba(0,0,0,0.05/0.06)`; dark dropdown `0 8px 32px rgba(0,0,0,0.50)`.

---------------------------------------------------------------------------
## GAPS (searched for, not present in the app)
* `:active`/pressed styles — none on any control (grep `:active` = 0 hits). `:focus-visible` — none (buttons/tabs/divs keep browser default or none; custom `div` controls are not focusable at all: tabs `.profile-tab`, `.cust-select__trigger`, `.phone-code-btn`, `.dp-day`, `.req-type-btn` are `<div>`s without tabindex/role).
* Error/invalid styling — no class; only one inline red border (`#dc2626`, tt-fill-input) and `alert()`; no error text, no `:invalid`, no success state.
* Disabled states — buttons only (WFH trio + dark-only `:disabled` rules); no disabled inputs/selects/options (only `readonly-field`).
* Custom native checkbox/radio, switch other than dark-mode switch, slider, stepper, segmented control — none. File upload — none. Tags/chips/removable tokens — none (dead `.dept-chip`). Spinner/loader/skeleton/progress — none (grep spinner/skeleton = 0). Tooltip component — none (title attrs). Pagination — none. Accordion — none. Date-range picker — only two native date inputs. Multi-select — none. Keyboard navigation in custom select/combobox/datepicker/phone picker — none. ARIA attributes — none (grep `aria-` = 0).
* Toast variants (error/warning), toast stacking/dismiss button — none. Disabled/min-max days in datepicker — none.
* `.modal-textarea` and `.btn-ghost` referenced but unstyled.

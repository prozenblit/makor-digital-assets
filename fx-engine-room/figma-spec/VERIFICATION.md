# FX Engine Room - design-system VERIFICATION (stage 3, final run)

Date: 2026-10-14. Page: `http://localhost:3456/fx-engine-room/design-system/showcase.html` (own Chrome tab, **Chrome 155, DPR 1.5, `CSS.supports("text-box","trim-both")` = true**). Method: every row below is a live `getComputedStyle` / `getBoundingClientRect` read of the rendered showcase compared with the number quoted in `figma-spec/*.md` (frames were at scale 1.000, so rects are Figma pixels). Positions are relative to the component / frame the spec measures from (card, modal, Frame 3 content, Frame 7 body, blotter). Tolerance: 0.6px by default; where a wider tolerance was needed it is printed as (±n) in the spec column (hug widths depend on font metrics; Figma text boxes are cap-height boxes).

**Result of the final run: 1245 checks, 1245 pass, 0 fail.** Zero console errors, network log: the last 200 of 232 requests inspected, all 200 OK; fetch of all 70 `<img>` / 38 mask twins / 71 css `url()` assets succeeded, 0 sections/demos of zero height, 72 demos (65 components/patterns + 7 screens) all rendered. Hub: `hub/ds-viewer.html#fx-engine-room` renders the new tokens.json (colours incl. the 39 Figma + 27 raw + 107 semantic entries, font sizes, 13 spacing rows, 14 radius rows, links to this showcase and CLAUDE.md) and the FX card in `hub/` has a working "Design System" chip (`ds-viewer.html#fx-engine-room`).

## What was fixed during verification (first runs, before the final run)
Real CSS bugs fixed in `components.css` (the only edits to stage 1/2 CSS):
1. `.btn-sm.btn-outline-purple` had padding 11/20 from `.btn-sm` -> "Clear Filters" measured 107px; Figma "Outlined purple 99x24" is padding 11/16/11/16 (foundations.md tuple #25, 7022:14510). Added `padding: var(--space-11) var(--space-16)`.
2. `.mapping-panel.surface-inner` was missing: `.mapping-panel` (later in the file) overrode `.surface-inner`, so the New Trading Account Lucera panel (221x388) rendered #242428 instead of #39393C with #242428 fields (5536:14961). Added the 2-line rule (mirror of the existing `.recipients.surface-inner`).
Showcase/markup corrections found by the same measurements (not CSS bugs): outlined-teal label is "Add Permissions" (156x32), not "Add Permission"; toolbar spacer before "Review (12)" is 53px (Figma x410), not 45; ISO currency sample text lengthened to produce the 3 / 5 / 4 wrapped lines of the Figma boxes (72 / 110 / 91 high); wrong expectations in my own test (grip distance is measured to the LEFT edge; the Total Limit popover x 1070 is in Frame 7 coordinates; the trash glyph sits 5.4px inside its cropped box).

## Remaining deviations (honest list)
- **Hug-width differences from font metrics** (all within the printed tolerance): deselect-all 35 vs 38 ("(5)" text box), With dropdown 24px 115.4 vs 112 (exported chevron asset is 12x7, the Figma node 8x4), tab / button hug widths within 0.5-3px; Add Permissions CTA / Create Deal within 3px. Documented since stage 1 (Nunito rendered here vs Figma text metrics).
- **Modal heights within 2px:** New Trading Account 575 vs 573, Add Permissions 420x406 / 510x406 within 2.2px (value-box line counts depend on text wrapping), New Trader 473 vs 474 (recipients group 232 vs panel 220, stage-2 note).
- **Visual estimates (not in Figma numbers):** ID Status prime-broker tags / meta lines / second amendment trade positions; "Total limit $100m" text starts ~13px right of Figma; Reports "Trade Types" label / quick buttons / list vertical order; Activity right-half geometry (left half reused, Figma measures it 17px off); Trades-widget spacer values; dashboard Prices 910 vs 911 high / y56 vs y55.
- **Sample copy** that Figma does not give: third/fourth account names, trader "Dana Levy", recipient e-mails, CSV file names, 2nd allocation trade "Goldman", blotter sample rows (values follow the formats quoted in trading.md).
- **Missing assets / TODO (not drawn, intentionally):** Blotters sidebar status glyph (2), Prices-toggle glyph, context-menu glyphs for 3 of 4 items, separate plus-sign and small-search files.
- **Not built:** entity analytics (donuts, line chart), oldest master-list Trading Account 3657:4471, Statics tables and Edit Client / Edit User / prime-broker / currency-pair / cut modals (generic modal/table classes apply, no column templates), Swap deal modals, status filter panel 6765:14776, older Activity versions, hidden 1920 / CSV frames.
- Default hover/focus/pressed/disabled states that Figma does not draw are EXTENDED: they were checked to render (the class exists and the declared colours resolve) but have no Figma number to compare with.

## What could not be verified
- No pixel diff against Figma in stage 3 (Figma screenshots of Log In 2211:1943 and Trading Account 4164:14303 were compared visually in stage 2 only). Numeric comparisons here are to the harvested spec, not to the live Figma file.
- Only Chrome 155 / DPR 1.5 was tested; Safari 18.2+ and Firefox (no `text-box` support) were not. The no-support fallback was simulated: with `CSS.supports` forced to false the showcase shows the warning banner (verified in an iframe); the ~5px text offset itself was not measured in a non-supporting engine.
- Border widths of 1px read as 0.667px at DPR 1.5 in raw `borderBottomWidth`; the final run compares colours for those, and rect positions are unaffected.
- Animations: only the new-trade insertion loop was sampled (8 timestamps: highlight 0 / 0.1 alpha and the 56px row shift match the prototype timings); the live-pulse loop and prefers-reduced-motion branches were inspected, not sampled.
- Interactivity of showcase demos (tab / segmented / group-card clicks, Replay, Copy HTML) was exercised for Copy HTML ("Copied" feedback; clipboard read is blocked by the browser) and Replay (animation element re-created); the rest is simple class toggling.

## Final run: property | spec value | measured | result

### Foundations: Figma variable + raw swatches (hex of every swatch) — 66/66 pass

| CSS variable | spec (tokens.json / Figma hex) | measured (computed background of the swatch) | result |
|---|---|---|---|
| `--color-black` | #000000 | #000000 | PASS |
| `--color-purple-1` | #A4A4FF | #A4A4FF | PASS |
| `--color-grey-1` | #39393C | #39393C | PASS |
| `--color-grey-2` | #171719 | #171719 | PASS |
| `--color-grey-3` | #707079 | #707079 | PASS |
| `--color-grey-4` | #BABEC7 | #BABEC7 | PASS |
| `--color-grey-5` | #E6E6E6 | #E6E6E6 | PASS |
| `--color-grey-6` | #242428 | #242428 | PASS |
| `--color-orange` | #FF9747 | #FF9747 | PASS |
| `--color-red` | #FF7272 | #FF7272 | PASS |
| `--color-red-2` | #FD7557 | #FD7557 | PASS |
| `--color-white` | #FFFFFF | #FFFFFF | PASS |
| `--color-green` | #30F0D6 | #30F0D6 | PASS |
| `--color-green-2` | #2BDF68 | #2BDF68 | PASS |
| `--color-red-3` | #B85944 | #B85944 | PASS |
| `--color-purple-2` | #39394E | #39394E | PASS |
| `--color-purple-3` | #7373BB | #7373BB | PASS |
| `--color-blue` | #60A8FF | #60A8FF | PASS |
| `--color-yellow` | #FEE274 | #FEE274 | PASS |
| `--color-red-dark` | #392C2D | #392C2D | PASS |
| `--color-blue-dark` | #2A313D | #2A313D | PASS |
| `--color-yellow-dark` | #3A3730 | #3A3730 | PASS |
| `--color-green-dark` | #264342 | #264342 | PASS |
| `--color-primary-purple` | #A4A4FF | #A4A4FF | PASS |
| `--color-primary-text` | #FFFFFF | #FFFFFF | PASS |
| `--color-separators` | #39393C | #39393C | PASS |
| `--color-secondary-text` | #707079 | #707079 | PASS |
| `--color-light-grey-text` | #BABEC7 | #BABEC7 | PASS |
| `--color-bg` | #000000 | #000000 | PASS |
| `--color-bg-grey-1` | #171719 | #171719 | PASS |
| `--color-menu-bar` | #39393C | #39393C | PASS |
| `--color-modal-bg` | #242428 | #242428 | PASS |
| `--color-inputs-on-modal` | #39393C | #39393C | PASS |
| `--color-black` | #000000 | #000000 | PASS |
| `--color-cancel-button` | #E6E6E6 | #E6E6E6 | PASS |
| `--color-edit` | #FF9747 | #FF9747 | PASS |
| `--color-active` | #2BDF68 | #2BDF68 | PASS |
| `--color-add-new` | #30F0D6 | #30F0D6 | PASS |
| `--color-delete` | #FF7272 | #FF7272 | PASS |
| `--color-raw-ungrouped-yellow` | #FFDC51 | #FFDC51 | PASS |
| `--color-raw-outlined-green` | #00FEA9 | #00FEA9 | PASS |
| `--color-raw-outlined-green-hover` | #1B5244 | #1B5244 | PASS |
| `--color-raw-row-tint-amber` | rgba(255,184,0,0.15) | rgba(255,184,0,0.15) | PASS |
| `--color-raw-row-tint-teal` | rgba(48,240,214,0.15) | rgba(48,240,214,0.15) | PASS |
| `--color-raw-row-unallocated` | #242432 | #242432 | PASS |
| `--color-raw-scrim` | rgba(0,0,0,0.5) | rgba(0,0,0,0.5) | PASS |
| `--color-raw-panel-outline-80` | rgba(57,57,60,0.8) | rgba(57,57,60,0.8) | PASS |
| `--color-raw-edit-hover` | #FFBF8E | #FFBF8E | PASS |
| `--color-raw-outlined-red-active` | #5A3834 | #5A3834 | PASS |
| `--color-raw-csv-fill` | #264A35 | #264A35 | PASS |
| `--color-raw-overlay-hover-20` | rgba(255,255,255,0.2) | rgba(255,255,255,0.2) | PASS |
| `--color-raw-overlay-hover-30` | rgba(255,255,255,0.3) | rgba(255,255,255,0.3) | PASS |
| `--color-raw-overlay-hover-40` | rgba(255,255,255,0.4) | rgba(255,255,255,0.4) | PASS |
| `--color-raw-overlay-shade-20` | rgba(0,0,0,0.2) | rgba(0,0,0,0.2) | PASS |
| `--color-raw-switch-shadow-on` | rgba(0,95,32,0.5) | rgba(0,95,32,0.5) | PASS |
| `--color-raw-switch-shadow-off` | rgba(81,81,81,0.5) | rgba(81,81,81,0.5) | PASS |
| `--color-raw-pulse-ring-20` | rgba(43,223,104,0.2) | rgba(43,223,104,0.2) | PASS |
| `--color-raw-pulse-ring-10` | rgba(43,223,104,0.1) | rgba(43,223,104,0.1) | PASS |
| `--color-raw-pulse-ring-05` | rgba(43,223,104,0.05) | rgba(43,223,104,0.05) | PASS |
| `--color-raw-pie-teal` | rgba(48,240,214,0.4) | rgba(48,240,214,0.4) | PASS |
| `--color-raw-pie-purple` | rgba(164,164,255,0.4) | rgba(164,164,255,0.4) | PASS |
| `--color-raw-chart-series-1` | #3CC3DF | #3CC3DF | PASS |
| `--color-raw-chart-series-2` | #8979FF | #8979FF | PASS |
| `--color-raw-chart-series-3` | #FF928A | #FF928A | PASS |
| `--color-raw-logo-dark` | #3B3B5C | #3B3B5C | PASS |
| `--color-raw-link-gold` | #FFCF00 | #FFCF00 | PASS |

### Foundations: semantic alias swatches — 107/107 pass

| CSS variable | spec (tokens.json / Figma hex) | measured (computed background of the swatch) | result |
|---|---|---|---|
| `--color-surface-page` | #000000 | #000000 | PASS |
| `--color-surface-panel` | #171719 | #171719 | PASS |
| `--color-surface-modal` | #242428 | #242428 | PASS |
| `--color-surface-card` | #242428 | #242428 | PASS |
| `--color-surface-inner-panel` | #39393C | #39393C | PASS |
| `--color-surface-sidebar` | #39393C | #39393C | PASS |
| `--color-surface-table-header` | #39393C | #39393C | PASS |
| `--color-surface-popover` | #242428 | #242428 | PASS |
| `--color-surface-tooltip` | #39393C | #39393C | PASS |
| `--color-surface-dropdown-list` | #39393C | #39393C | PASS |
| `--color-surface-user-menu` | #39393C | #39393C | PASS |
| `--color-surface-row-highlight` | #39393C | #39393C | PASS |
| `--color-surface-row-highlight-card` | #39394E | #39394E | PASS |
| `--color-surface-row-highlight-green` | #264342 | #264342 | PASS |
| `--color-surface-row-tint-amber` | rgba(255,184,0,0.15) | rgba(255,184,0,0.15) | PASS |
| `--color-surface-row-tint-teal` | rgba(48,240,214,0.15) | rgba(48,240,214,0.15) | PASS |
| `--color-surface-row-unallocated` | #242432 | #242432 | PASS |
| `--color-surface-rules-box` | #171719 | #171719 | PASS |
| `--color-surface-tab-hover` | #171719 | #171719 | PASS |
| `--color-surface-logo-tile` | #A4A4FF | #A4A4FF | PASS |
| `--color-surface-scrim` | rgba(0,0,0,0.5) | rgba(0,0,0,0.5) | PASS |
| `--color-surface-circle-button` | #39393C | #39393C | PASS |
| `--color-surface-scrollbar-track` | #39393C | #39393C | PASS |
| `--color-surface-scrollbar-thumb` | #707079 | #707079 | PASS |
| `--color-input-fill` | #39393C | #39393C | PASS |
| `--color-input-fill-on-page` | #242428 | #242428 | PASS |
| `--color-input-fill-on-modal` | #39393C | #39393C | PASS |
| `--color-input-fill-on-inner-panel` | #242428 | #242428 | PASS |
| `--color-input-stroke-error` | #FF7272 | #FF7272 | PASS |
| `--color-input-stroke-locked` | #707079 | #707079 | PASS |
| `--color-input-text` | #FFFFFF | #FFFFFF | PASS |
| `--color-input-placeholder` | #707079 | #707079 | PASS |
| `--color-input-icon` | #A4A4FF | #A4A4FF | PASS |
| `--color-input-error-text` | #FF7272 | #FF7272 | PASS |
| `--color-input-checkbox-fill` | #39393C | #39393C | PASS |
| `--color-input-checkbox-fill-inner` | #242428 | #242428 | PASS |
| `--color-input-chip-fill` | #242428 | #242428 | PASS |
| `--color-input-chip-pill-fill` | #39393C | #39393C | PASS |
| `--color-input-chip-close` | #BABEC7 | #BABEC7 | PASS |
| `--color-border-default` | #39393C | #39393C | PASS |
| `--color-border-modal-divider` | #242428 | #242428 | PASS |
| `--color-border-disabled` | #707079 | #707079 | PASS |
| `--color-border-active` | #A4A4FF | #A4A4FF | PASS |
| `--color-border-focus` | #A4A4FF | #A4A4FF | PASS |
| `--color-border-error` | #FF7272 | #FF7272 | PASS |
| `--color-text-primary` | #FFFFFF | #FFFFFF | PASS |
| `--color-text-secondary` | #707079 | #707079 | PASS |
| `--color-text-light` | #BABEC7 | #BABEC7 | PASS |
| `--color-text-on-action` | #000000 | #000000 | PASS |
| `--color-text-disabled-action` | #BABEC7 | #BABEC7 | PASS |
| `--color-text-link` | #60A8FF | #60A8FF | PASS |
| `--color-text-link-inline` | #A4A4FF | #A4A4FF | PASS |
| `--color-text-section-label` | #7373BB | #7373BB | PASS |
| `--color-text-kpi-value` | #A4A4FF | #A4A4FF | PASS |
| `--color-text-positive` | #2BDF68 | #2BDF68 | PASS |
| `--color-text-negative` | #FD7557 | #FD7557 | PASS |
| `--color-text-warning` | #FF9747 | #FF9747 | PASS |
| `--color-text-caution` | #FFDC51 | #FFDC51 | PASS |
| `--color-text-error` | #FF7272 | #FF7272 | PASS |
| `--color-action-primary` | #A4A4FF | #A4A4FF | PASS |
| `--color-action-primary-text` | #000000 | #000000 | PASS |
| `--color-action-teal` | #30F0D6 | #30F0D6 | PASS |
| `--color-action-cancel` | #E6E6E6 | #E6E6E6 | PASS |
| `--color-action-edit` | #FF9747 | #FF9747 | PASS |
| `--color-action-delete` | #FF7272 | #FF7272 | PASS |
| `--color-action-disabled-fill` | #707079 | #707079 | PASS |
| `--color-action-disabled-text` | #BABEC7 | #BABEC7 | PASS |
| `--color-action-transparent-fill` | #39394E | #39394E | PASS |
| `--color-action-outlined-teal-library` | #00FEA9 | #00FEA9 | PASS |
| `--color-action-outlined-teal-library-hover` | #1B5244 | #1B5244 | PASS |
| `--color-action-outlined-teal-hover` | #264342 | #264342 | PASS |
| `--color-action-red` | #FD7557 | #FD7557 | PASS |
| `--color-action-red-hover` | #392C2D | #392C2D | PASS |
| `--color-action-red-active` | #5A3834 | #5A3834 | PASS |
| `--color-action-blue` | #60A8FF | #60A8FF | PASS |
| `--color-action-blue-hover` | #2A313D | #2A313D | PASS |
| `--color-action-yellow` | #FEE274 | #FEE274 | PASS |
| `--color-action-yellow-hover` | #3A3730 | #3A3730 | PASS |
| `--color-action-edit-hover` | #FFBF8E | #FFBF8E | PASS |
| `--color-action-csv-fill` | #264A35 | #264A35 | PASS |
| `--color-action-hover-overlay-20` | rgba(255,255,255,0.2) | rgba(255,255,255,0.2) | PASS |
| `--color-action-hover-overlay-30` | rgba(255,255,255,0.3) | rgba(255,255,255,0.3) | PASS |
| `--color-action-hover-overlay-40` | rgba(255,255,255,0.4) | rgba(255,255,255,0.4) | PASS |
| `--color-action-shade-overlay-20` | rgba(0,0,0,0.2) | rgba(0,0,0,0.2) | PASS |
| `--color-brand-primary` | #A4A4FF | #A4A4FF | PASS |
| `--color-brand-tint` | #39394E | #39394E | PASS |
| `--color-brand-section` | #7373BB | #7373BB | PASS |
| `--color-brand-add-new` | #30F0D6 | #30F0D6 | PASS |
| `--color-brand-logo-dark` | #3B3B5C | #3B3B5C | PASS |
| `--color-status-success` | #2BDF68 | #2BDF68 | PASS |
| `--color-status-live` | #2BDF68 | #2BDF68 | PASS |
| `--color-status-danger` | #FF7272 | #FF7272 | PASS |
| `--color-status-warning` | #FF9747 | #FF9747 | PASS |
| `--color-status-warning-yellow` | #FEE274 | #FEE274 | PASS |
| `--color-status-caution` | #FFDC51 | #FFDC51 | PASS |
| `--color-status-info` | #60A8FF | #60A8FF | PASS |
| `--color-status-up` | #2BDF68 | #2BDF68 | PASS |
| `--color-status-down` | #FD7557 | #FD7557 | PASS |
| `--color-status-inactive` | #707079 | #707079 | PASS |
| `--color-chart-series-1` | #3CC3DF | #3CC3DF | PASS |
| `--color-chart-series-2` | #8979FF | #8979FF | PASS |
| `--color-chart-series-3` | #FF928A | #FF928A | PASS |
| `--color-chart-pie-teal` | rgba(48,240,214,0.4) | rgba(48,240,214,0.4) | PASS |
| `--color-chart-pie-purple` | rgba(164,164,255,0.4) | rgba(164,164,255,0.4) | PASS |
| `--color-chart-pulse-ring-20` | rgba(43,223,104,0.2) | rgba(43,223,104,0.2) | PASS |
| `--color-chart-pulse-ring-10` | rgba(43,223,104,0.1) | rgba(43,223,104,0.1) | PASS |
| `--color-chart-pulse-ring-05` | rgba(43,223,104,0.05) | rgba(43,223,104,0.05) | PASS |

### Foundations: type specimens (22 tuples) — 110/110 pass

| tuple | font-size / weight / family / style / underline measured on the live `.t-<role>` specimen vs tokens.json typeScale | result |
|---|---|---|
| `.t-table-cell` | font-size 12; font-weight 500; font-family Nunito; font-style normal; underline false | PASS |
| `.t-cell` | font-size 14; font-weight 500; font-family Nunito; font-style normal; underline false | PASS |
| `.t-input` | font-size 14; font-weight 400; font-family Nunito; font-style normal; underline false | PASS |
| `.t-label` | font-size 12; font-weight 400; font-family Nunito; font-style normal; underline false | PASS |
| `.t-button` | font-size 14; font-weight 600; font-family Nunito; font-style normal; underline false | PASS |
| `.t-detail` | font-size 16; font-weight 500; font-family Nunito; font-style normal; underline false | PASS |
| `.t-body-16` | font-size 16; font-weight 400; font-family Nunito; font-style normal; underline false | PASS |
| `.t-title-modal` | font-size 18; font-weight 500; font-family Nunito; font-style normal; underline false | PASS |
| `.t-button-sm` | font-size 12; font-weight 600; font-family Nunito; font-style normal; underline false | PASS |
| `.t-card-title` | font-size 18; font-weight 600; font-family Nunito; font-style normal; underline false | PASS |
| `.t-page-title` | font-size 20; font-weight 500; font-family Nunito; font-style normal; underline false | PASS |
| `.t-breadcrumb-link` | font-size 18; font-weight 500; font-family Nunito; font-style normal; underline true | PASS |
| `.t-heading-entity` | font-size 24; font-weight 500; font-family Nunito; font-style normal; underline false | PASS |
| `.t-note-italic` | font-size 10; font-weight 500; font-family Nunito; font-style italic; underline false | PASS |
| `.t-range-link` | font-size 14; font-weight 500; font-family Nunito; font-style normal; underline true | PASS |
| `.t-auth-heading` | font-size 18; font-weight 400; font-family Nunito; font-style normal; underline false | PASS |
| `.t-micro` | font-size 8; font-weight 400; font-family Nunito; font-style normal; underline false | PASS |
| `.t-link` | font-size 12; font-weight 400; font-family Nunito; font-style normal; underline true | PASS |
| `.t-outlier-13` | font-size 13; font-weight 400; font-family Nunito; font-style normal; underline false | PASS |
| `.t-outlier-20` | font-size 20; font-weight 400; font-family Nunito; font-style normal; underline false | PASS |
| `.t-dev-tag` | font-size 16; font-weight 600; font-family Nunito; font-style normal; underline false | PASS |
| `.t-csv` | font-size 12; font-weight 400; font-family Inter; font-style normal; underline false | PASS |

### Buttons — 160/160 pass

| property | spec value | measured | result |
|---|---|---|---|
| primary default height | 32 | 32 | PASS |
| primary default width | 139 (±2) | 138.26 | PASS |
| primary default background | #A4A4FF | #A4A4FF | PASS |
| primary default color | #000000 | #000000 | PASS |
| primary default radius | 4 | 4 | PASS |
| primary default font (weight size) | 600 14px | 600 14px | PASS |
| primary default padding T R B L | 11px 24px 11px 24px | 11px 24px 11px 24px | PASS |
| primary hover background | #A4A4FF | #A4A4FF | PASS |
| primary hover overlay layer | true | true | PASS |
| primary disabled height | 32 | 32 | PASS |
| primary disabled background | #707079 | #707079 | PASS |
| primary disabled color | #BABEC7 | #BABEC7 | PASS |
| teal default height | 32 | 32 | PASS |
| teal default width | 109 (±2) | 108.15 | PASS |
| teal default background | #30F0D6 | #30F0D6 | PASS |
| teal default color | #000000 | #000000 | PASS |
| teal default radius | 4 | 4 | PASS |
| teal default font (weight size) | 600 14px | 600 14px | PASS |
| teal hover background | #30F0D6 | #30F0D6 | PASS |
| teal hover overlay layer | true | true | PASS |
| teal disabled background | #707079 | #707079 | PASS |
| teal disabled color | #BABEC7 | #BABEC7 | PASS |
| cancel default height | 32 | 32 | PASS |
| cancel default width | 92 (±2) | 91.01 | PASS |
| cancel default background | #E6E6E6 | #E6E6E6 | PASS |
| cancel default color | #000000 | #000000 | PASS |
| cancel default radius | 4 | 4 | PASS |
| cancel default font (weight size) | 600 14px | 600 14px | PASS |
| cancel hover background | #E6E6E6 | #E6E6E6 | PASS |
| cancel hover overlay layer | true | true | PASS |
| cancel disabled background | #707079 | #707079 | PASS |
| cancel disabled color | #BABEC7 | #BABEC7 | PASS |
| close width | 84 (±2) | 83.89 | PASS |
| inline cancel 48x20 height | 20 | 20 | PASS |
| inline cancel 48x20 width | 48 (±2) | 47.78 | PASS |
| inline cancel 48x20 background | #E6E6E6 | #E6E6E6 | PASS |
| inline cancel 48x20 radius | 2 | 2 | PASS |
| inline cancel 48x20 font (weight size) | 600 12px | 600 12px | PASS |
| outlined purple height | 32 | 32 | PASS |
| outlined purple width | 88 (±2) | 87.51 | PASS |
| outlined purple background | rgba(0, 0, 0, 0) | rgba(0,0,0,0) | PASS |
| outlined purple color | #A4A4FF | #A4A4FF | PASS |
| outlined purple radius | 3 | 3 | PASS |
| outlined purple font (weight size) | 600 14px | 600 14px | PASS |
| outlined purple inset stroke colour | true | true | PASS |
| outlined purple hover background | #39394E | #39394E | PASS |
| outlined purple disabled color | #BABEC7 | #BABEC7 | PASS |
| outlined purple disabled inset stroke colour | true | true | PASS |
| outlined purple 24px (Clear Filters) height | 24 | 24 | PASS |
| outlined purple 24px (Clear Filters) width | 99 (±1.5) | 98.7 | PASS |
| outlined purple 24px (Clear Filters) radius | 3 | 3 | PASS |
| outlined purple 24px (Clear Filters) font (weight size) | 600 12px | 600 12px | PASS |
| transparent height | 32 | 32 | PASS |
| transparent width | 102 (±2) | 101.28 | PASS |
| transparent background | #39394E | #39394E | PASS |
| transparent color | #A4A4FF | #A4A4FF | PASS |
| transparent radius | 3 | 3 | PASS |
| transparent font (weight size) | 600 14px | 600 14px | PASS |
| transparent hover inset stroke colour | true | true | PASS |
| transparent hover overlay layer | true | true | PASS |
| transparent disabled background | #707079 | #707079 | PASS |
| transparent disabled color | #BABEC7 | #BABEC7 | PASS |
| transparent 24px height | 24 | 24 | PASS |
| transparent 24px width | 86 (±2) | 85.67 | PASS |
| outlined teal height | 32 | 32 | PASS |
| outlined teal width | 156 (±2) | 155.11 | PASS |
| outlined teal color | #30F0D6 | #30F0D6 | PASS |
| outlined teal radius | 3 | 3 | PASS |
| outlined teal font (weight size) | 600 14px | 600 14px | PASS |
| outlined teal inset stroke colour | true | true | PASS |
| outlined teal hover (EXTENDED) background | #264342 | #264342 | PASS |
| outlined teal library color | #00FEA9 | #00FEA9 | PASS |
| outlined teal library inset stroke colour | true | true | PASS |
| outlined teal library hover background | #1B5244 | #1B5244 | PASS |
| Give-Up width | 102 (±2) | 101.03 | PASS |
| Give-Up color | #00FEA9 | #00FEA9 | PASS |
| with dropdown height | 32 | 32 | PASS |
| with dropdown width | 132 (±2) | 133.3 | PASS |
| with dropdown background | #30F0D6 | #30F0D6 | PASS |
| with dropdown radius | 3 | 3 | PASS |
| with dropdown font (weight size) | 600 14px | 600 14px | PASS |
| with dropdown padding T R B L | 11px 20px 11px 24px | 11px 20px 11px 24px | PASS |
| with dropdown hover overlay layer | true | true | PASS |
| with dropdown hover (alt geometry) radius | 4 | 4 | PASS |
| with dropdown disabled background | #707079 | #707079 | PASS |
| with dropdown disabled color | #BABEC7 | #BABEC7 | PASS |
| with dropdown 24px height | 24 | 24 | PASS |
| with dropdown 24px width | 112 (±4) | 115.41 | PASS |
| Generate CSV height | 32 | 32 | PASS |
| Generate CSV width | 154 (±2) | 153.88 | PASS |
| Generate CSV background | #A4A4FF | #A4A4FF | PASS |
| Market Side > width | 134 (±2) | 134 | PASS |
| Market Side > background | #707079 | #707079 | PASS |
| Market Side > color | #BABEC7 | #BABEC7 | PASS |
| Market Side > radius | 3 | 3 | PASS |
| orange 32 width | 95 (±2) | 94.29 | PASS |
| orange 32 background | #FF9747 | #FF9747 | PASS |
| orange 32 color | #000000 | #000000 | PASS |
| delete 32 width | 91 (±2) | 90.31 | PASS |
| delete 32 background | #FF7272 | #FF7272 | PASS |
| orange 24 height | 24 | 24 | PASS |
| orange 24 width | 80 (±2) | 79.68 | PASS |
| orange 24 background | #FF9747 | #FF9747 | PASS |
| orange 24 radius | 2 | 2 | PASS |
| orange 24 font (weight size) | 600 12px | 600 12px | PASS |
| delete 24 height | 24 | 24 | PASS |
| delete 24 width | 77 (±2) | 76.27 | PASS |
| delete 24 background | #FF7272 | #FF7272 | PASS |
| new/add 24 height | 24 | 24 | PASS |
| outlined red height | 24 | 24 | PASS |
| outlined red width | 100 (±2) | 98.48 | PASS |
| outlined red color | #FD7557 | #FD7557 | PASS |
| outlined red radius | 2 | 2 | PASS |
| outlined red font (weight size) | 600 12px | 600 12px | PASS |
| outlined red padding T R B L | 11px 16px 11px 16px | 11px 16px 11px 16px | PASS |
| outlined red inset stroke colour | true | true | PASS |
| outlined red hover background | #392C2D | #392C2D | PASS |
| outlined red active background | #5A3834 | #5A3834 | PASS |
| outlined red disabled color | #BABEC7 | #BABEC7 | PASS |
| outlined red disabled inset stroke colour | true | true | PASS |
| outlined blue height | 24 | 24 | PASS |
| outlined blue width | 86 (±2) | 85.46 | PASS |
| outlined blue color | #60A8FF | #60A8FF | PASS |
| outlined blue radius | 2 | 2 | PASS |
| outlined blue inset stroke colour | true | true | PASS |
| outlined blue hover background | #2A313D | #2A313D | PASS |
| outlined yellow height | 24 | 24 | PASS |
| outlined yellow width | 74 (±2) | 73.86 | PASS |
| outlined yellow color | #FEE274 | #FEE274 | PASS |
| outlined yellow inset stroke colour | true | true | PASS |
| outlined yellow hover background | #3A3730 | #3A3730 | PASS |
| status height | 24 | 24 | PASS |
| status width | 96 (±2) | 97.27 | PASS |
| status background | #39394E | #39394E | PASS |
| status color | #A4A4FF | #A4A4FF | PASS |
| status radius | 3 | 3 | PASS |
| status font (weight size) | 600 12px | 600 12px | PASS |
| status disabled color | #A4A4FF | #A4A4FF | PASS |
| status disabled inset stroke colour | true | true | PASS |
| csv height | 24 | 24 | PASS |
| csv width | 61 (±2) | 60.75 | PASS |
| csv background | #264A35 | #264A35 | PASS |
| csv color | #2BDF68 | #2BDF68 | PASS |
| csv radius | 2 | 2 | PASS |
| csv font-family | Inter | Inter | PASS |
| edit pencil width | 32 | 32 | PASS |
| edit pencil height | 32 | 32 | PASS |
| trash width | 32 | 32 | PASS |
| trash height | 32 | 32 | PASS |
| amber + width | 32 | 32 | PASS |
| amber + height | 24 | 24 | PASS |
| chip square width | 32 | 32 | PASS |
| chip square height | 32 | 32 | PASS |
| chip 24 width | 24 | 24 | PASS |
| chip 24 height | 24 | 24 | PASS |
| edit colour | #FF9747 | #FF9747 | PASS |
| edit hover colour | #FFBF8E | #FFBF8E | PASS |
| trash colour | #FF7272 | #FF7272 | PASS |
| chip fill | #39393C | #39393C | PASS |
| chip round radius | 16 | 16 | PASS |

### Tabs — 9/9 pass

| property | spec value | measured | result |
|---|---|---|---|
| tab height | 42 | 42 | PASS |
| tab padding T L | 16px 32px | 16px 32px | PASS |
| tab label colour (not active) | #BABEC7 | #BABEC7 | PASS |
| tab font | 500 14px | 500 14px | PASS |
| tab active colour | #FFFFFF | #FFFFFF | PASS |
| tab active 2px underline #A4A4FF | true | true | PASS |
| tab hover fill | #171719 | #171719 | PASS |
| tab 32 height | 32 | 32 | PASS |
| tab 32 padding T L | 12px 24px | 12px 24px | PASS |

### Fields — 57/57 pass

| property | spec value | measured | result |
|---|---|---|---|
| input width | 158 (±1.2) | 158 | PASS |
| input height | 32 (±1.2) | 32 | PASS |
| input fill (on page surface) | #242428 | #242428 | PASS |
| input radius | 4 | 4 | PASS |
| input padding T R B L | 8px 12px 8px 8px | 8px 12px 8px 8px | PASS |
| input font | 400 14px | 400 14px | PASS |
| input colour | #FFFFFF | #FFFFFF | PASS |
| input with label width | 158 (±1.2) | 158 | PASS |
| input with label height | 44 (±1.2) | 44 | PASS |
| input error width | 158 (±1.2) | 158 | PASS |
| input error height | 56 (±1.2) | 56 | PASS |
| error stroke #FF7272 | true | true | PASS |
| error message colour | #FF7272 | #FF7272 | PASS |
| label colour | #707079 | #707079 | PASS |
| label font (size+weight) | 12px 400 | 12px 400 | PASS |
| locked stroke #707079 | true | true | PASS |
| locked fill removed | rgba(0,0,0,0) | rgba(0,0,0,0) | PASS |
| search width | 158 (±1.2) | 158 | PASS |
| search height | 32 (±1.2) | 32 | PASS |
| search padding | 8px | 8px | PASS |
| search icon width | 16 (±1.2) | 16 | PASS |
| search icon height | 16 (±1.2) | 16 | PASS |
| search icon colour | #A4A4FF | #A4A4FF | PASS |
| search toolbar width | 208 (±1.2) | 208 | PASS |
| search toolbar height | 32 (±1.2) | 32 | PASS |
| dropdown width | 158 (±1.2) | 158 | PASS |
| dropdown height | 32 (±1.2) | 32 | PASS |
| dropdown caret width | 11 (±1.2) | 11 | PASS |
| dropdown caret height | 6 (±1.2) | 6 | PASS |
| caret colour | #A4A4FF | #A4A4FF | PASS |
| dates width | 158 (±1.2) | 158 | PASS |
| dates height | 44 (±1.2) | 44 | PASS |
| time width | 89 (±1.2) | 89 | PASS |
| time height | 44 (±1.2) | 44 | PASS |
| password hidden width | 216 (±1.2) | 216 | PASS |
| password hidden height | 44 (±1.2) | 44 | PASS |
| password visible width | 216 (±1.2) | 216 | PASS |
| password visible height | 44 (±1.2) | 44 | PASS |
| password dots group width | 114 (±1.2) | 114 | PASS |
| password dots group height | 6 (±1.2) | 6 | PASS |
| eye icon width | 18 (±1.2) | 18 | PASS |
| chips width | 186 (±1.2) | 186 | PASS |
| chips height | 44 (±1.2) | 44 | PASS |
| chips multi-row width | 186 (±1.2) | 186 | PASS |
| chips multi-row height | 84 (±1.2) | 84 | PASS |
| small search width | 205 (±1.2) | 205 | PASS |
| small search height | 24 (±1.2) | 24 | PASS |
| small search radius | 2 | 2 | PASS |
| email entry width | 282 (±1.2) | 282 | PASS |
| email entry height | 32 (±1.2) | 32 | PASS |
| chips field fill (modal) | #39393C | #39393C | PASS |
| chip width | 82 (±1.2) | 82 | PASS |
| chip height | 24 (±1.2) | 24 | PASS |
| chip fill | #242428 | #242428 | PASS |
| chip radius | 12 | 12 | PASS |
| textarea width | 592 (±1.2) | 592 | PASS |
| textarea fill | #39393C | #39393C | PASS |

### Dropdown list — 4/4 pass

| property | spec value | measured | result |
|---|---|---|---|
| dropdown list width | 158 (±1.2) | 158 | PASS |
| list fill | #39393C | #39393C | PASS |
| selected colour | #A4A4FF | #A4A4FF | PASS |
| item height | 26 | 26 | PASS |

### Selection controls — 30/30 pass

| property | spec value | measured | result |
|---|---|---|---|
| checkbox width | 16 (±1.2) | 16 | PASS |
| checkbox height | 16 (±1.2) | 16 | PASS |
| checkbox fill (panel) | #39393C | #39393C | PASS |
| checkbox radius | 2 | 2 | PASS |
| checked uses checkbox-checked.svg | true | true | PASS |
| inner-panel checkbox fill | #242428 | #242428 | PASS |
| 24 hit frame width | 24 (±1.2) | 24 | PASS |
| 24 hit frame height | 24 (±1.2) | 24 | PASS |
| deselect-all width | 38 (±3.5) | 35.03 | PASS |
| deselect-all height | 16 (±3.5) | 16 | PASS |
| label colour unchecked | #BABEC7 | #BABEC7 | PASS |
| label offset from box | 24 | 24 | PASS |
| label colour checked | #FFFFFF | #FFFFFF | PASS |
| radio width | 16 (±1.2) | 16 | PASS |
| radio height | 16 (±1.2) | 16 | PASS |
| radio stroke #A4A4FF | true | true | PASS |
| radio dot size | 8px | 8px | PASS |
| radio dot colour | #A4A4FF | #A4A4FF | PASS |
| switch on width | 32 (±1.2) | 32 | PASS |
| switch on height | 16 (±1.2) | 16 | PASS |
| switch on track | #2BDF68 | #2BDF68 | PASS |
| switch on knob left | 2px | 2px | PASS |
| switch knob size | 12px | 12px | PASS |
| switch off track | #BABEC7 | #BABEC7 | PASS |
| switch off knob left | 18px | 18px | PASS |
| switch radius | 12 | 12 | PASS |
| switch with text height | 16 (±1.2) | 16 | PASS |
| switch label on | #FFFFFF | #FFFFFF | PASS |
| switch label off | #BABEC7 | #BABEC7 | PASS |
| with-text off knob left | 17px | 17px | PASS |

### Chips, tags, status — 12/12 pass

| property | spec value | measured | result |
|---|---|---|---|
| pill chip width | 188 (±1.2) | 187.84 | PASS |
| pill chip height | 32 (±1.2) | 32 | PASS |
| pill radius | 20 | 20 | PASS |
| pill fill | #39393C | #39393C | PASS |
| DEV tag width | 81 (±1.2) | 80.56 | PASS |
| DEV tag height | 32 (±1.2) | 32 | PASS |
| DEV fill | rgba(255,184,0,0.15) | rgba(255,184,0,0.15) | PASS |
| DEV colour | #FEE274 | #FEE274 | PASS |
| DEV font | 600 16px | 600 16px | PASS |
| status dot width | 12 (±1.2) | 12 | PASS |
| status dot height | 12 (±1.2) | 12 | PASS |
| status dot active | #2BDF68 | #2BDF68 | PASS |

### Overlays — 38/38 pass

| property | spec value | measured | result |
|---|---|---|---|
| tooltip height | 32 | 32 | PASS |
| tooltip fill | #39393C | #39393C | PASS |
| tooltip radius | 4 | 4 | PASS |
| tooltip padding T L | 11px 16px | 11px 16px | PASS |
| tooltip shadow | rgba(0, 0, 0, 0.4) -1px 2px 4px 0px | rgba(0, 0, 0, 0.4) -1px 2px 4px 0px | PASS |
| tooltip warning colour | #FF9747 | #FF9747 | PASS |
| tooltip caution colour | #FFDC51 | #FFDC51 | PASS |
| "Unallocated trade" tooltip width | 145 (±2) | 144.34 | PASS |
| "Unallocated trade" tooltip height | 32 (±2) | 32 | PASS |
| right-click menu width | 183 (±1.2) | 183 | PASS |
| right-click menu height | 120 (±1.2) | 120 | PASS |
| menu fill | #242428 | #242428 | PASS |
| menu radius | 8 | 8 | PASS |
| menu item height | 28 | 28 | PASS |
| menu hover row | #39393C | #39393C | PASS |
| widgets menu width | 136 (±1.2) | 136 | PASS |
| user menu width | 134 (±1.2) | 134 | PASS |
| user menu height | 40 (±1.2) | 40 | PASS |
| user menu fill | #39393C | #39393C | PASS |
| logout glyph colour | #FF7272 | #FF7272 | PASS |
| filter list popover width | 237 (±1.2) | 237 | PASS |
| filter list popover height | 256 (±1.2) | 256 | PASS |
| filter fill | #242428 | #242428 | PASS |
| filter radius | 8 | 8 | PASS |
| filter search fill | #39393C | #39393C | PASS |
| filter row pitch | 32 | 32 | PASS |
| filter first row y | 56 | 56 | PASS |
| filter dates popover width | 237 (±1.2) | 237 | PASS |
| filter dates popover height | 136 (±1.2) | 136 | PASS |
| scrollbar 4px width | 4 (±1.2) | 4 | PASS |
| scrollbar 4px height | 120 (±1.2) | 120 | PASS |
| scroll track | #39393C | #39393C | PASS |
| scroll thumb | #707079 | #707079 | PASS |
| scrollbar 8px width | 8 (±1.2) | 8 | PASS |
| scrollbar 8px height | 120 (±1.2) | 120 | PASS |
| live indicator width | 30 (±1.2) | 30 | PASS |
| live indicator height | 30 (±1.2) | 30 | PASS |
| pagination arrows colour | #707079 | #707079 | PASS |

### Shell — 69/69 pass

| property | spec value | measured | result |
|---|---|---|---|
| app frame width | 1440 | 1440 | PASS |
| app frame height | 1024 | 1024 | PASS |
| sidebar width | 56 (±1.2) | 56 | PASS |
| sidebar height | 1024 (±1.2) | 1024 | PASS |
| sidebar fill | #39393C | #39393C | PASS |
| logo block width | 72 (±1.2) | 72 | PASS |
| logo block height | 56 (±1.2) | 56 | PASS |
| logo block fill | #A4A4FF | #A4A4FF | PASS |
| logo icon x | 12 | 12 | PASS |
| logo icon y | 8 | 8 | PASS |
| logo icon width | 32 (±1.2) | 32 | PASS |
| logo icon height | 40 (±1.2) | 40 | PASS |
| content x | 56 | 56 | PASS |
| content radius | 16px | 16px | PASS |
| content fill | #000000 | #000000 | PASS |
| nav icon 0 y | 72 | 72 | PASS |
| nav icon 0 x | 16 | 16 | PASS |
| nav icon 1 y | 128 | 128 | PASS |
| nav icon 1 x | 16 | 16 | PASS |
| nav icon 2 y | 184 | 184 | PASS |
| nav icon 2 x | 16 | 16 | PASS |
| nav icon 3 y | 240 | 240 | PASS |
| nav icon 3 x | 16 | 16 | PASS |
| nav icon 4 y | 296 | 296 | PASS |
| nav icon 4 x | 16 | 16 | PASS |
| nav icon 5 y | 352 | 352 | PASS |
| nav icon 5 x | 16 | 16 | PASS |
| nav inactive colour | #BABEC7 | #BABEC7 | PASS |
| nav active colour | #A4A4FF | #A4A4FF | PASS |
| top bar width | 1384 (±1.2) | 1384 | PASS |
| top bar height | 56 (±1.2) | 56 | PASS |
| top bar border colour | #39393C | #39393C | PASS |
| page title font | 500 20px | 500 20px | PASS |
| page title x | 24 | 24 | PASS |
| user icon x | 1336 | 1336 | PASS |
| user icon y | 12 | 12.17 | PASS |
| user icon width | 32 (±1.2) | 32 | PASS |
| user icon height | 32 (±1.2) | 32 | PASS |
| footer width | 1384 (±1.2) | 1384 | PASS |
| footer height | 46 (±1.2) | 46 | PASS |
| footer top y | 978 | 978 | PASS |
| footer fill | #171719 | #171719 | PASS |
| footer padding T L | 8px 12px | 8px 12px | PASS |
| body top y | 104 | 104 | PASS |
| body fill | #171719 | #171719 | PASS |
| breadcrumb font | 500 18px | 500 18px | PASS |
| breadcrumb link colour (1440) | #60A8FF | #60A8FF | PASS |
| breadcrumb current colour | #BABEC7 | #BABEC7 | PASS |
| breadcrumb x | 24 | 24 | PASS |
| breadcrumb chevron width | 8 (±1.2) | 8 | PASS |
| breadcrumb chevron height | 14 (±1.2) | 14 | PASS |
| KPI pill width | 351 (±1.2) | 351 | PASS |
| KPI pill height | 32 (±1.2) | 32 | PASS |
| KPI fill | #39394E | #39394E | PASS |
| KPI label colour | #7373BB | #7373BB | PASS |
| KPI value colour | #A4A4FF | #A4A4FF | PASS |
| KPI label 1 x | 15 (±1) | 15 | PASS |
| KPI value 1 x | 127 (±1) | 127 | PASS |
| KPI label 2 x | 183 (±1) | 183 | PASS |
| KPI value 2 x | 253 (±1) | 253 | PASS |
| top-bar dropdown width | 203 (±1.2) | 203 | PASS |
| top-bar dropdown height | 32 (±1.2) | 32 | PASS |
| top-bar dropdown fill | #242428 | #242428 | PASS |
| dashboard top bar width | 1384 (±1.2) | 1384 | PASS |
| dashboard top bar height | 48 (±1.2) | 48 | PASS |
| dashboard title font | 500 16px | 500 16px | PASS |
| dashboard title x | 20 | 20 | PASS |
| DEV tag in top bar width | 81 (±1.2) | 80.56 | PASS |
| DEV tag in top bar height | 32 (±1.2) | 32 | PASS |

### Auth cards — 53/53 pass

| property | spec value | measured | result |
|---|---|---|---|
| login card width | 312 (±1.2) | 312 | PASS |
| login card height | 388 (±1.2) | 388 | PASS |
| card fill | #242428 | #242428 | PASS |
| card radius | 12px | 12px | PASS |
| card shadow | none | none | PASS |
| logo x | 130 (±0.8) | 130 | PASS |
| logo y | 38.51 (±0.8) | 38.5 | PASS |
| logo width | 52 (±1.2) | 52 | PASS |
| logo height | 61.26 (±1.2) | 61.25 | PASS |
| logo colour | #A4A4FF | #A4A4FF | PASS |
| username x | 48 | 48 | PASS |
| username y | 152 (±0.8) | 151.98 | PASS |
| username field width | 216 (±1.2) | 216 | PASS |
| username field height | 44 (±1.2) | 44 | PASS |
| password y | 220 (±0.8) | 219.98 | PASS |
| password field width | 216 (±1.2) | 216 | PASS |
| password field height | 44 (±1.2) | 44 | PASS |
| forgot link x | 167 (±1) | 167.52 | PASS |
| forgot link y | 272 (±1.5) | 271.98 | PASS |
| forgot link colour (purple) | #A4A4FF | #A4A4FF | PASS |
| forgot link underline | underline | underline | PASS |
| Log In x | 48 | 48 | PASS |
| Log In y | 324 (±0.8) | 323.98 | PASS |
| Log In button width | 216 (±1.2) | 216 | PASS |
| Log In button height | 32 (±1.2) | 32 | PASS |
| error stroke | true | true | PASS |
| error message colour | #FF7272 | #FF7272 | PASS |
| error message x | 48 (±1) | 48 | PASS |
| change password card width | 583 (±1.2) | 583 | PASS |
| change password card height | 309 (±1.2) | 309 | PASS |
| rules box x | 272 (±1) | 272 | PASS |
| rules box y | 85 (±1) | 84.98 | PASS |
| rules box width | 279 (±1.2) | 279 | PASS |
| rules box height | 120 (±1.2) | 120 | PASS |
| rules box fill | #171719 | #171719 | PASS |
| new password y | 85 (±1) | 84.98 | PASS |
| confirm password y | 161 (±1.5) | 160.98 | PASS |
| cancel y | 245 (±1.5) | 244.98 | PASS |
| Save Changes width | 139 (±2) | 138.26 | PASS |
| Save Changes right edge | 551 (±2) | 551 | PASS |
| reset card width | 296 (±1.2) | 296 | PASS |
| reset card height | 289 (±1.2) | 289 | PASS |
| reset input y | 145 (±1.5) | 145.23 | PASS |
| reset input width | 232 (±1.2) | 232 | PASS |
| reset input height | 32 (±1.2) | 32 | PASS |
| reset buttons y | 225 (±1.5) | 225.23 | PASS |
| email sent card width | 371 (±1.2) | 371 | PASS |
| email sent card height | 255 (±1.2) | 255 | PASS |
| envelope x | 157 (±1) | 157.5 | PASS |
| envelope y | 40 (±1) | 40 | PASS |
| sent buttons y | 191 (±1.5) | 190.95 | PASS |
| Resend Link fill | #FF9747 | #FF9747 | PASS |
| Resend Link width | 126 (±2.5) | 125.57 | PASS |

### Entities list — 25/25 pass

| property | spec value | measured | result |
|---|---|---|---|
| search x | 16 | 16 | PASS |
| search y | 64 (±1) | 64 | PASS |
| search width | 208 (±1.2) | 208 | PASS |
| search height | 32 (±1.2) | 32 | PASS |
| search fill | #242428 | #242428 | PASS |
| Add New width | 109 (±2) | 108.15 | PASS |
| Add New height | 32 (±2) | 32 | PASS |
| Add New right margin | 16 (±2) | 16 | PASS |
| table header height | 42 (±1.2) | 42 | PASS |
| header colour | #707079 | #707079 | PASS |
| header y | 104 (±1) | 104 | PASS |
| Account ID column x | 16 (±1) | 16 | PASS |
| Entity Name column x | 256 (±1) | 256 | PASS |
| Country column x | 598 (±1) | 598 | PASS |
| LEI column x | 996 (±1) | 996 | PASS |
| Active column x | 1289 (±1) | 1289 | PASS |
| row pitch | 42 (±1) | 42 | PASS |
| row text font | 500 14px | 500 14px | PASS |
| row divider colour | #39393C | #39393C | PASS |
| status dot x | 1303 (±1) | 1303 | PASS |
| status dot width | 12 (±1.2) | 12 | PASS |
| status dot height | 12 (±1.2) | 12 | PASS |
| edit x | 1315 (±1) | 1315 | PASS |
| edit width | 32 (±1.2) | 32 | PASS |
| edit height | 32 (±1.2) | 32 | PASS |

### Trading Account 1280x1040 (canonical) — 104/104 pass

| property | spec value | measured | result |
|---|---|---|---|
| frame width | 1280 | 1280 | PASS |
| frame height | 1040 | 1040 | PASS |
| body y | 104 (±1) | 104 | PASS |
| breadcrumb link colour (purple) | #A4A4FF | #A4A4FF | PASS |
| breadcrumb x | 16 (±1) | 16 | PASS |
| left panel width | 359 (±1.2) | 359 | PASS |
| left panel x | 16 | 16 | PASS |
| divider x | 399 | 399 | PASS |
| divider width | 1 (±1.2) | 1 | PASS |
| detail x | 415 | 415 | PASS |
| detail width | 793 (±1) | 793 | PASS |
| entity title y | 24 (±1.5) | 24 | PASS |
| entity title font | 500 24px | 500 24px | PASS |
| RBS card width | 359 (±1.2) | 359 | PASS |
| RBS card height | 293 (±1.2) | 293 | PASS |
| RBS card y | 172 (±1.5) | 172.01 | PASS |
| HSBC card width | 359 (±1.2) | 359 | PASS |
| HSBC card height | 107 (±1.2) | 107 | PASS |
| HSBC card y | 481 (±1.5) | 481.01 | PASS |
| Traders card width | 359 (±1.2) | 359 | PASS |
| Traders card height | 122 (±1.2) | 122 | PASS |
| Traders card y | 652 (±1.5) | 652.01 | PASS |
| card fill | #242428 | #242428 | PASS |
| card header width | 359 (±1.2) | 359 | PASS |
| card header height | 45 (±1.2) | 45 | PASS |
| card header fill | #39393C | #39393C | PASS |
| card header font | 600 18px | 600 18px | PASS |
| selected row width | 359 (±1.2) | 359 | PASS |
| selected row height | 62 (±1.2) | 62 | PASS |
| selected row fill | #39394E | #39394E | PASS |
| selected name colour | #A4A4FF | #A4A4FF | PASS |
| section label font | 500 18px | 500 18px | PASS |
| section label colour | #7373BB | #7373BB | PASS |
| section label text-transform | none | none | PASS |
| detail title x | 415 | 415 | PASS |
| detail title y | 24 (±1.5) | 24 | PASS |
| Give Up switch x | 997 (±3) | 997 | PASS |
| Active switch x | 1120 (±3) | 1120 | PASS |
| switch frame width | 80 (±1.2) | 80 | PASS |
| switch frame height | 16 (±1.2) | 16 | PASS |
| radio y | 101 (±1.5) | 101 | PASS |
| Client radio x | 415 (±1) | 415 | PASS |
| Market Maker radio x | 509 (±3) | 508.48 | PASS |
| PB/Mapping label y | 133 (±3) | 133 | PASS |
| PB/Mapping control y | 149 (±1.5) | 149 | PASS |
| Makor Entity control y | 213 (±1.5) | 213 | PASS |
| PB Agreement control y | 277 (±1.5) | 277 | PASS |
| Makor Entity select width | 242 (±1.2) | 242 | PASS |
| Makor Entity select height | 32 (±1.2) | 32 | PASS |
| Lucera panel x | 673 (±1) | 673 | PASS |
| Lucera panel y | 101 (±1.5) | 101 | PASS |
| Lucera panel width | 221 (±1.2) | 221 | PASS |
| Lucera panel height | 244 (±1.2) | 244 | PASS |
| Lucera panel fill | #242428 | #242428 | PASS |
| Lucera select x | 685 (±1) | 685 | PASS |
| Lucera select fill | #39393C | #39393C | PASS |
| Lucera input x | 754 (±1) | 754 | PASS |
| Recipients x | 910 (±1) | 910 | PASS |
| Recipients y | 101 (±1.5) | 101 | PASS |
| Recipients width | 298 (±1.2) | 298 | PASS |
| Recipients height | 244 (±1.2) | 244 | PASS |
| recipient row pitch | 32 | 32 | PASS |
| add strip width | 298 (±1.2) | 298 | PASS |
| add strip height | 48 (±1.2) | 48 | PASS |
| add strip y | 196 | 196 | PASS |
| email entry width | 282 (±1.2) | 282 | PASS |
| email entry height | 32 (±1.2) | 32 | PASS |
| Line 7 y | 373 (±1) | 373 | PASS |
| Line 7 x | 415 | 415 | PASS |
| permissions card x | 415 (±1) | 415 | PASS |
| permissions card y | 412 (±1) | 412 | PASS |
| permissions card width | 793 (±1.2) | 793 | PASS |
| permissions card height | 389 (±1.2) | 389 | PASS |
| permissions card fill | #242428 | #242428 | PASS |
| Spot tab width | 94 (±2) | 93.66 | PASS |
| Forwards tab width | 124 (±2.5) | 123.96 | PASS |
| Vanilla Options tab width | 162 (±3) | 161.23 | PASS |
| Exotic Options tab width | 156 (±3) | 155.82 | PASS |
| value box x | 24 | 24 | PASS |
| value box 1 y | 76 (±1.5) | 75.88 | PASS |
| value box width | 733 (±1) | 733 | PASS |
| value box fill | #39393C | #39393C | PASS |
| value box 1 width | 733 (±1) | 733 | PASS |
| value box 1 height | 72 (±1) | 71.21 | PASS |
| value box 2 y | 182 (±1.5) | 180.96 | PASS |
| value box 2 width | 733 (±1) | 733 | PASS |
| value box 2 height | 34 (±1) | 33.88 | PASS |
| Add Permissions x | 12 | 12 | PASS |
| Add Permissions y | 345 (±1.5) | 344.66 | PASS |
| Add Permissions width | 156 (±2) | 155.11 | PASS |
| Add Permissions height | 32 (±2) | 32 | PASS |
| Total Limit popover x (frame 7 coords) | 1070 (±1) | 1070 | PASS |
| Total Limit popover y | 408 (±1) | 408 | PASS |
| Total Limit popover width | 146 (±1.2) | 146 | PASS |
| Total Limit popover height | 95 (±1.2) | 95 | PASS |
| popover fill | #242428 | #242428 | PASS |
| popover radius | 8px | 8px | PASS |
| popover input width | 114 (±1.2) | 114 | PASS |
| popover input height | 24 (±1.2) | 24 | PASS |
| popover input x | 16 | 16 | PASS |
| popover input y | 16 | 16 | PASS |
| popover Save width | 114 (±1.2) | 114 | PASS |
| popover Save height | 24 (±1.2) | 24 | PASS |
| popover Save y | 55 (±1) | 55 | PASS |

### Modals — 235/235 pass

| property | spec value | measured | result |
|---|---|---|---|
| New Deal Spot initial width | 432 (±1.2) | 432 | PASS |
| New Deal Spot initial height | 557 (±1.2) | 557 | PASS |
| New Deal Spot initial fill | #242428 | #242428 | PASS |
| New Deal Spot initial radius | 12px | 12px | PASS |
| New Deal Spot initial header divider y | 61 (±0.8) | 61 | PASS |
| New Deal Spot initial title font | 500 18px | 500 18px | PASS |
| New Deal Spot initial title cap y | 24 (±1) | 24 | PASS |
| New Deal Spot initial footer button y | 501 (±1.5) | 501 | PASS |
| New Deal Spot initial footer button x | 32 (±0.8) | 32 | PASS |
| New Deal Spot filled width | 432 (±1.2) | 432 | PASS |
| New Deal Spot filled height | 557 (±1.2) | 557 | PASS |
| New Deal Spot filled fill | #242428 | #242428 | PASS |
| New Deal Spot filled radius | 12px | 12px | PASS |
| New Deal Spot filled header divider y | 61 (±0.8) | 61 | PASS |
| New Deal Spot filled title font | 500 18px | 500 18px | PASS |
| New Deal Spot filled title cap y | 24 (±1) | 24 | PASS |
| New Deal Spot filled footer button y | 501 (±1.5) | 501 | PASS |
| New Deal Spot filled footer button x | 32 (±0.8) | 32 | PASS |
| New Client Trade initial width | 432 (±1.2) | 432 | PASS |
| New Client Trade initial height | 461 (±1.2) | 461 | PASS |
| New Client Trade initial fill | #242428 | #242428 | PASS |
| New Client Trade initial radius | 12px | 12px | PASS |
| New Client Trade initial header divider y | 61 (±0.8) | 61 | PASS |
| New Client Trade initial title font | 500 18px | 500 18px | PASS |
| New Client Trade initial title cap y | 24 (±1) | 24 | PASS |
| New Client Trade initial footer button y | 405 (±1.5) | 405 | PASS |
| New Client Trade initial footer button x | 32 (±0.8) | 32 | PASS |
| New Client Trade filled width | 432 (±1.2) | 432 | PASS |
| New Client Trade filled height | 461 (±1.2) | 461 | PASS |
| New Client Trade filled fill | #242428 | #242428 | PASS |
| New Client Trade filled radius | 12px | 12px | PASS |
| New Client Trade filled header divider y | 61 (±0.8) | 61 | PASS |
| New Client Trade filled title font | 500 18px | 500 18px | PASS |
| New Client Trade filled title cap y | 24 (±1) | 24 | PASS |
| New Client Trade filled footer button y | 405 (±1.5) | 405 | PASS |
| New Client Trade filled footer button x | 32 (±0.8) | 32 | PASS |
| New Deal NDF width | 432 (±1.2) | 432 | PASS |
| New Deal NDF height | 625 (±1.2) | 625 | PASS |
| New Deal NDF fill | #242428 | #242428 | PASS |
| New Deal NDF radius | 12px | 12px | PASS |
| New Deal NDF header divider y | 61 (±0.8) | 61 | PASS |
| New Deal NDF title font | 500 18px | 500 18px | PASS |
| New Deal NDF title cap y | 24 (±1) | 24 | PASS |
| New Deal NDF footer button y | 569 (±1.5) | 569 | PASS |
| New Deal NDF footer button x | 32 (±0.8) | 32 | PASS |
| New Deal Deal Type x | 32 (±1) | 32 | PASS |
| New Deal Deal Type y | 85 (±1.5) | 85 | PASS |
| New Deal Deal Type width | 172 (±1.2) | 172 | PASS |
| New Deal Deal Type height | 44 (±1.2) | 44 | PASS |
| New Deal Client x | 32 (±1) | 32 | PASS |
| New Deal Client y | 153 (±1.5) | 153 | PASS |
| New Deal Client width | 172 (±1.2) | 172 | PASS |
| New Deal Client height | 44 (±1.2) | 44 | PASS |
| New Deal Market Maker x | 228 (±1) | 228 | PASS |
| New Deal Market Maker y | 153 (±1.5) | 153 | PASS |
| New Deal Market Maker width | 172 (±1.2) | 172 | PASS |
| New Deal Market Maker height | 44 (±1.2) | 44 | PASS |
| New Deal Currency Pair x | 32 (±1) | 32 | PASS |
| New Deal Currency Pair y | 221 (±1.5) | 221 | PASS |
| New Deal Currency Pair width | 172 (±1.2) | 172 | PASS |
| New Deal Currency Pair height | 44 (±1.2) | 44 | PASS |
| New Deal Side x | 228 (±1) | 228 | PASS |
| New Deal Side y | 221 (±1.5) | 221 | PASS |
| New Deal Side width | 172 (±1.2) | 172 | PASS |
| New Deal Side height | 44 (±1.2) | 44 | PASS |
| New Deal Quantity x | 32 (±1) | 32 | PASS |
| New Deal Quantity y | 289 (±1.5) | 289 | PASS |
| New Deal Quantity width | 172 (±1.2) | 172 | PASS |
| New Deal Quantity height | 44 (±1.2) | 44 | PASS |
| New Deal Trade Date x | 228 (±1) | 228 | PASS |
| New Deal Trade Date y | 289 (±1.5) | 289 | PASS |
| New Deal Trade Date width | 172 (±1.2) | 172 | PASS |
| New Deal Trade Date height | 44 (±1.2) | 44 | PASS |
| New Deal Client Price x | 32 (±1) | 32 | PASS |
| New Deal Client Price y | 425 (±1.5) | 425 | PASS |
| New Deal Client Price width | 172 (±1.2) | 172 | PASS |
| New Deal Client Price height | 44 (±1.2) | 44 | PASS |
| Create Deal disabled fill | #707079 | #707079 | PASS |
| Create Deal disabled label | #BABEC7 | #BABEC7 | PASS |
| Create Deal width | 124 (±3) | 123.72 | PASS |
| Create Deal right edge | 400 (±2) | 400 | PASS |
| Create Deal enabled fill | #30F0D6 | #30F0D6 | PASS |
| Create Deal enabled label | #000000 | #000000 | PASS |
| segmented width | 172 (±1.2) | 172 | PASS |
| segmented height | 32 (±1.2) | 32 | PASS |
| segmented left half width | 82.87 | 82.86 | PASS |
| segmented selected fill | #FF9747 | #FF9747 | PASS |
| segmented selected label | #000000 | #000000 | PASS |
| segmented unselected label | #FF9747 | #FF9747 | PASS |
| segmented font | 600 14px | 600 14px | PASS |
| modal shadow | none | none | PASS |
| Vanilla/B2B empty width | 628 (±1.2) | 628 | PASS |
| Vanilla/B2B empty height | 693 (±1.2) | 693 | PASS |
| Vanilla/B2B empty fill | #242428 | #242428 | PASS |
| Vanilla/B2B empty radius | 12px | 12px | PASS |
| Vanilla/B2B empty header divider y | 61 (±0.8) | 61 | PASS |
| Vanilla/B2B empty title font | 500 18px | 500 18px | PASS |
| Vanilla/B2B empty title cap y | 24 (±1) | 24 | PASS |
| Vanilla/B2B empty footer button y | 637 (±1.5) | 637 | PASS |
| Vanilla/B2B empty footer button x | 32 (±0.8) | 32 | PASS |
| Vanilla step 1 width | 628 (±1.2) | 628 | PASS |
| Vanilla step 1 height | 693 (±1.2) | 693 | PASS |
| Vanilla step 1 fill | #242428 | #242428 | PASS |
| Vanilla step 1 radius | 12px | 12px | PASS |
| Vanilla step 1 header divider y | 61 (±0.8) | 61 | PASS |
| Vanilla step 1 title font | 500 18px | 500 18px | PASS |
| Vanilla step 1 title cap y | 24 (±1) | 24 | PASS |
| Vanilla step 1 footer button y | 637 (±1.5) | 637 | PASS |
| Vanilla step 1 footer button x | 32 (±0.8) | 32 | PASS |
| Vanilla step 2 width | 628 (±1.2) | 628 | PASS |
| Vanilla step 2 height | 693 (±1.2) | 693 | PASS |
| Vanilla step 2 fill | #242428 | #242428 | PASS |
| Vanilla step 2 radius | 12px | 12px | PASS |
| Vanilla step 2 header divider y | 61 (±0.8) | 61 | PASS |
| Vanilla step 2 title font | 500 18px | 500 18px | PASS |
| Vanilla step 2 title cap y | 24 (±1) | 24 | PASS |
| Vanilla step 2 footer button y | 637 (±1.5) | 637 | PASS |
| Vanilla step 2 footer button x | 32 (±0.8) | 32 | PASS |
| Trade Type y | 85 (±1) | 85 | PASS |
| Counterparty x | 32 (±1) | 32 | PASS |
| Counterparty y | 153 (±1.5) | 153 | PASS |
| Trade Date x | 228 (±1) | 228 | PASS |
| Currency Pair y | 221 (±1.5) | 221 | PASS |
| Put Call x | 424 (±1) | 424 | PASS |
| Fixing Source y | 561 (±1.5) | 561 | PASS |
| Market Side > width | 134 (±2.5) | 134 | PASS |
| locked segmented stroke #707079 | true | true | PASS |
| New Entity width | 572 (±1.2) | 572 | PASS |
| New Entity height | 405 (±1.2) | 405 | PASS |
| New Entity fill | #242428 | #242428 | PASS |
| New Entity radius | 12px | 12px | PASS |
| New Entity header divider y | 61 (±0.8) | 61 | PASS |
| New Entity title font | 500 18px | 500 18px | PASS |
| New Entity title cap y | 24 (±1) | 24 | PASS |
| New Entity footer button x | 32 (±0.8) | 32 | PASS |
| New Entity footer button y | 349 (±2) | 349 | PASS |
| New Trader width | 602 (±1.2) | 602 | PASS |
| New Trader height | 474 (±1.2) | 473 | PASS |
| New Trader fill | #242428 | #242428 | PASS |
| New Trader radius | 12px | 12px | PASS |
| New Trader header divider y | 61 (±0.8) | 61 | PASS |
| New Trader title font | 500 18px | 500 18px | PASS |
| New Trader title cap y | 24 (±1) | 24 | PASS |
| New Trader footer button x | 32 (±0.8) | 32 | PASS |
| New Trading Account width | 873 (±2.2) | 873 | PASS |
| New Trading Account height | 573 (±2.2) | 575 | PASS |
| New Trading Account fill | #242428 | #242428 | PASS |
| New Trading Account radius | 12px | 12px | PASS |
| New Trading Account header divider y | 61 (±0.8) | 61 | PASS |
| New Trading Account title font | 500 18px | 500 18px | PASS |
| New Trading Account title cap y | 24 (±1) | 24 | PASS |
| New Trading Account footer button x | 32 (±0.8) | 32 | PASS |
| New Entity recipients width | 298 (±1.2) | 298 | PASS |
| New Entity recipients height | 220 (±1.2) | 220 | PASS |
| recipients x | 242 (±1) | 242 | PASS |
| recipients y | 97 (±1.5) | 97 | PASS |
| recipients fill | #39393C | #39393C | PASS |
| recipients divider #242428 | true | true | PASS |
| Assignment label x | 367 (±1) | 367 | PASS |
| Assignment label size | 13px | 13px | PASS |
| Assignment row 1 y | 110 (±2) | 109.79 | PASS |
| Assignment row pitch | 32 (±1) | 32 | PASS |
| column 1 x | 32 | 32 | PASS |
| column 2 x | 298 (±1) | 298 | PASS |
| column 3 x | 543 (±1) | 543 | PASS |
| Lucera panel (modal) width | 221 (±1.2) | 221 | PASS |
| Lucera panel (modal) height | 388 (±1.2) | 388 | PASS |
| Lucera panel fill (modal) | #39393C | #39393C | PASS |
| Lucera select fill (inner) | #242428 | #242428 | PASS |
| recipients panel (modal) width | 298 (±1.2) | 298 | PASS |
| recipients panel (modal) height | 390 (±1.2) | 390 | PASS |
| Add Permissions primary width | 420 (±2.2) | 420 | PASS |
| Add Permissions primary height | 406 (±2.2) | 404.54 | PASS |
| Add Permissions primary fill | #242428 | #242428 | PASS |
| Add Permissions primary radius | 12px | 12px | PASS |
| Add Permissions primary header divider y | 61 (±0.8) | 61 | PASS |
| Add Permissions primary title font | 500 18px | 500 18px | PASS |
| Add Permissions primary title cap y | 24 (±1) | 24 | PASS |
| Add Permissions primary footer button y | 350 (±2.2) | 348.54 | PASS |
| Add Permissions primary footer button x | 32 (±0.8) | 32 | PASS |
| Add Permissions alternate width | 510 (±2.2) | 510 | PASS |
| Add Permissions alternate height | 406 (±2.2) | 404.88 | PASS |
| Add Permissions alternate fill | #242428 | #242428 | PASS |
| Add Permissions alternate radius | 12px | 12px | PASS |
| Add Permissions alternate header divider y | 61 (±0.8) | 61 | PASS |
| Add Permissions alternate title font | 500 18px | 500 18px | PASS |
| Add Permissions alternate title cap y | 24 (±1) | 24 | PASS |
| Add Permissions alternate footer button y | 350 (±2.2) | 348.88 | PASS |
| Add Permissions alternate footer button x | 32 (±0.8) | 32 | PASS |
| Product label y | 85 (±1.5) | 85 | PASS |
| Product control y | 103 (±1.5) | 103 | PASS |
| Tenor x | 230 (±1) | 230 | PASS |
| label font size (14, not 12) | 14px | 14px | PASS |
| Currencies label y | 159 (±1.5) | 159 | PASS |
| Currencies box y | 177 (±1.5) | 177 | PASS |
| Currencies box width | 356 (±1.5) | 356 | PASS |
| Currencies box height | 110 (±1.5) | 108.54 | PASS |
| Add Permissions CTA width | 156 (±2) | 155.11 | PASS |
| Add Permissions CTA height | 32 (±2) | 32 | PASS |
| Add Permissions CTA x | 232 (±2.5) | 232.89 | PASS |
| Spot checkbox x | 32 (±2.5) | 32 | PASS |
| Forwards checkbox x | 110 (±2.5) | 110 | PASS |
| Vanilla Options checkbox x | 218 (±2.5) | 218 | PASS |
| Exotic Options checkbox x | 363 (±2.5) | 363 | PASS |
| product checkbox y | 103 (±1.5) | 104.33 | PASS |
| Tenor label y | 143 (±1.5) | 143 | PASS |
| Currencies box y (alt) | 227 (±1.5) | 227 | PASS |
| Currencies box (alt) width | 446 (±1.5) | 446 | PASS |
| Currencies box (alt) height | 91 (±1.5) | 89.88 | PASS |
| Allocate Block width | 372 (±1.2) | 372 | PASS |
| Allocate Block height | 385 (±1.2) | 384.9 | PASS |
| Allocate Block fill | #242428 | #242428 | PASS |
| Allocate Block radius | 12px | 12px | PASS |
| Allocate Block header divider y | 61 (±0.8) | 61 | PASS |
| Allocate Block title font | 500 18px | 500 18px | PASS |
| Allocate Block title cap y | 24 (±1) | 24 | PASS |
| Allocate Block footer button y | 329 (±1.5) | 328.89 | PASS |
| Allocate Block footer button x | 32 (±0.8) | 32 | PASS |
| Account search y | 185 (±2) | 184.89 | PASS |
| Account search width | 308 (±1.2) | 308 | PASS |
| Account search height | 44 (±1.2) | 44 | PASS |
| Quantity y | 253 (±2) | 252.89 | PASS |
| Quantity width | 146 (±1.2) | 146 | PASS |
| Quantity height | 44 (±1.2) | 44 | PASS |
| Trade Price x | 194 (±1) | 194 | PASS |
| Allocate button width | 102 (±2) | 101.28 | PASS |
| Allocate button height | 32 (±2) | 32 | PASS |
| ID Status width | 301 (±1.2) | 301 | PASS |
| ID Status height | 440 (±1.2) | 440 | PASS |
| ID Status fill | #242428 | #242428 | PASS |
| ID Status radius | 12px | 12px | PASS |
| rule y61 | 61 | 61 | PASS |
| rule y155 | 155 | 155 | PASS |
| rule y274 (inset) | 274 | 274 | PASS |
| rule y366 | 366 | 366 | PASS |

### Widgets — 63/63 pass

| property | spec value | measured | result |
|---|---|---|---|
| widget fill | #242428 | #242428 | PASS |
| widget radius | 8px | 8px | PASS |
| title bar width | 320 (±1.2) | 320 | PASS |
| title bar height | 32 (±1.2) | 32 | PASS |
| title bar fill | #39393C | #39393C | PASS |
| title font | 500 14px | 500 14px | PASS |
| title x | 16 | 16 | PASS |
| grip left edge from right | 50 (±1) | 50 | PASS |
| close right edge from right | 12 (±1) | 12 | PASS |
| resize grip width | 24 (±1.2) | 24 | PASS |
| resize grip height | 24 (±1.2) | 24 | PASS |
| grip colour | #BABEC7 | #BABEC7 | PASS |
| Activity width | 1070 (±1.2) | 1070 | PASS |
| Activity height | 315 (±1.2) | 315 | PASS |
| Activity grip x | 1012 (±1) | 1012 | PASS |
| Activity close x | 1038 (±1) | 1038 | PASS |
| tab row y | 32 (±1) | 32 | PASS |
| tab row height | 32 (±1.2) | 32 | PASS |
| tab label colour | #A4A4FF | #A4A4FF | PASS |
| header row y | 64 (±1) | 64 | PASS |
| header colour | #707079 | #707079 | PASS |
| header font | 500 12px | 500 12px | PASS |
| row pitch | 28 (±0.8) | 28 | PASS |
| row 1 y | 88 (±1.5) | 88 | PASS |
| Account x | 31 (±1) | 31 | PASS |
| Trades right edge | 242 (±1) | 242 | PASS |
| Volume right edge | 391 (±1) | 391 | PASS |
| P&L right edge | 516 (±1) | 516 | PASS |
| zero P&L colour | #707079 | #707079 | PASS |
| P&L colour | #FFFFFF | #FFFFFF | PASS |
| cell font | 500 12px | 500 12px | PASS |
| vertical divider x | 581 (±1) | 581 | PASS |
| header Account centre | 89.5 (±2) | 89.5 | PASS |
| header Trades centre | 231.5 (±2) | 231.5 | PASS |
| header Volume centre | 365 (±2) | 365 | PASS |
| header P&L centre | 491.5 (±2) | 491.5 | PASS |
| Rates standalone width | 290 (±1.2) | 290 | PASS |
| Rates standalone height | 520 (±1.2) | 520 | PASS |
| Rates fill | #242428 | #242428 | PASS |
| Rates header height | 34 (±1.5) | 34 | PASS |
| Symbol label centre x | 78.5 (±2) | 78.5 | PASS |
| Rates row pitch | 28 (±0.8) | 28 | PASS |
| up price colour | #2BDF68 | #2BDF68 | PASS |
| down price colour | #FD7557 | #FD7557 | PASS |
| symbol x | 16 (±1) | 16 | PASS |
| arrow width | 12 (±1.2) | 12 | PASS |
| arrow height | 12 (±1.2) | 12 | PASS |
| arrow x | 236 (±1) | 236 | PASS |
| price right edge | 232 (±1) | 232 | PASS |
| card header line y | 32 (±1) | 32 | PASS |
| card header label size (12) | 12px | 12px | PASS |
| Trades widget width | 1070 (±1.2) | 1070 | PASS |
| Trades widget height | 587 (±1.2) | 587 | PASS |
| toolbar Group x | 8 (±4) | 8 | PASS |
| toolbar Amend x | 90 (±4) | 89.86 | PASS |
| toolbar Give-Up x | 178 (±4) | 177.54 | PASS |
| toolbar Delete x | 272 (±4) | 271 | PASS |
| toolbar Review x | 410 (±4) | 408.27 | PASS |
| toolbar status x | 518 (±4) | 514.75 | PASS |
| toolbar Clear Filters x | 622 (±4) | 620.02 | PASS |
| toolbar Search x | 733 (±4) | 730.72 | PASS |
| toolbar New Trade x | 950 (±4) | 947.72 | PASS |
| toolbar y | 40 (±1.5) | 40 | PASS |

### Trades Blotter table — 40/40 pass

| property | spec value | measured | result |
|---|---|---|---|
| header width | 1384 (±1.2) | 1384 | PASS |
| header height | 34 (±1.2) | 34 | PASS |
| header colour | #707079 | #707079 | PASS |
| header font | 500 14px | 500 14px | PASS |
| row height | 28 | 28 | PASS |
| row 1 y | 34 (±0.8) | 34 | PASS |
| row 2 y | 62 (±0.8) | 62 | PASS |
| cell font | 500 12px | 500 12px | PASS |
| column x: checkbox | 8 (±1) | 8 | PASS |
| column x: status "New" | 32 (±1) | 32 | PASS |
| column x: ID right edge | 127 (±1) | 127 | PASS |
| column x: Type | 160 (±1) | 160 | PASS |
| column x: Client | 238 (±1) | 238 | PASS |
| column x: Market Maker | 339 (±1) | 339 | PASS |
| column x: Buy/Sell | 427 (±1) | 427 | PASS |
| column x: Quantity right edge | 544 (±1) | 544 | PASS |
| column x: Symbol | 583 (±1) | 583 | PASS |
| column x: Client Price right edge | 769 (±1) | 769 | PASS |
| column x: MM Price right edge | 877 (±1) | 877 | PASS |
| column x: P&L right edge | 982 (±1) | 982 | PASS |
| column x: Trade Date right edge | 1116 (±1) | 1116 | PASS |
| column x: Value Date right edge | 1199 (±1) | 1199 | PASS |
| column x: Prime Broker right edge | 1270 (±1) | 1270 | PASS |
| column x: Direction | 1318 (±1) | 1318 | PASS |
| header label x: ID | 94 (±1) | 94 | PASS |
| header label x: Type | 172 (±1) | 172 | PASS |
| header label x: Market Maker | 314 (±1) | 314 | PASS |
| header label x: Direction | 1322 (±1) | 1322 | PASS |
| New row tint | rgba(48,240,214,0.15) | rgba(48,240,214,0.15) | PASS |
| "New" label colour | #30F0D6 | #30F0D6 | PASS |
| clickable ID colour | #60A8FF | #60A8FF | PASS |
| Ungrouped tint | rgba(255,184,0,0.15) | rgba(255,184,0,0.15) | PASS |
| Ungrouped icon x | 46 (±1) | 46 | PASS |
| Unallocated fill | #242432 | #242432 | PASS |
| Group open fill | #242428 | #242428 | PASS |
| Child block fill | rgba(57,57,60,0.8) | rgba(57,57,60,0.8) | PASS |
| Child row height | 24 | 24 | PASS |
| Child text colour | #BABEC7 | #BABEC7 | PASS |
| Child side stays white | #FFFFFF | #FFFFFF | PASS |
| BUY/SELL not colour-coded | #FFFFFF | #FFFFFF | PASS |

### Deleted trades / file list — 9/9 pass

| property | spec value | measured | result |
|---|---|---|---|
| ID right edge | 79 (±1) | 79 | PASS |
| Type x | 122 (±1) | 122 | PASS |
| Direction x | 1280 (±1) | 1280 | PASS |
| header ID x | 46 (±1) | 46 | PASS |
| header Direction x | 1284 (±1) | 1284 | PASS |
| highlighted row fill | #39393C | #39393C | PASS |
| Download x | 42 (±1) | 42 | PASS |
| File x | 300 (±1) | 300 | PASS |
| first csv icon colour | #A4A4FF | #A4A4FF | PASS |

### Reports — 19/19 pass

| property | spec value | measured | result |
|---|---|---|---|
| body y (no strip) | 56 (±1) | 56 | PASS |
| Report Type y | 59 (±1.5) | 59 | PASS |
| Date Start y | 127 (±1.5) | 127 | PASS |
| Date End y | 195 (±1.5) | 195 | PASS |
| Counterparty y | 263 (±1.5) | 263 | PASS |
| field width | 225 (±1.2) | 225 | PASS |
| field height | 44 (±1.2) | 44 | PASS |
| Generate CSV y | 331 (±1.5) | 331 | PASS |
| Generate CSV x | 24 (±1) | 24 | PASS |
| All Cash width | 99 (±1.2) | 99 | PASS |
| All Cash height | 24 (±1.2) | 24 | PASS |
| All Cash x | 318 (±1) | 318 | PASS |
| All Options x | 430 (±1) | 430 | PASS |
| Trade Types list width | 258 (±1.2) | 258 | PASS |
| Trade Types list height | 191 (±1.2) | 191 | PASS |
| list row pitch | 32 | 32 | PASS |
| list checkbox x | 15 (±1) | 15 | PASS |
| list label x | 39 (±1) | 39 | PASS |
| title y | 24 (±1.5) | 24 | PASS |

### Screens (fit-scaled; read at scale 1) — 16/16 pass

| property | spec value | measured | result |
|---|---|---|---|
| screen login renders at scale | 1 | 1 | PASS |
| screen entities renders at scale | 1 | 1 | PASS |
| screen ta renders at scale | 1 | 1 | PASS |
| screen dashboard renders at scale | 1 | 1 | PASS |
| screen blotter renders at scale | 1 | 1 | PASS |
| screen deal renders at scale | 1 | 1 | PASS |
| screen reports renders at scale | 1 | 1 | PASS |
| dashboard frame width | 1440 | 1440 | PASS |
| dashboard frame height | 1024 | 1024 | PASS |
| Activity x | 64 (±1) | 64 | PASS |
| Activity y | 56 (±1) | 56 | PASS |
| Trades y | 379 (±1) | 379 | PASS |
| Trades size | 587 (±1) | 587 | PASS |
| Prices x | 1142 (±1) | 1142 | PASS |
| Prices width | 290 (±1) | 290 | PASS |
| footer y | 978 (±1) | 978 | PASS |

### New-trade insertion animation — 16/16 pass

| property | spec value | measured | result |
|---|---|---|---|
| t=0.3s highlight opacity | 0 | 0 | PASS |
| t=0.3s rows shift (px) | 0 | 0 | PASS |
| t=0.9s highlight opacity | 0 | 0 | PASS |
| t=0.9s rows shift (px) | 56 | 56 | PASS |
| t=1.5s highlight opacity | 0.1 | 0.1 | PASS |
| t=1.5s rows shift (px) | 56 | 56 | PASS |
| t=1.8s highlight opacity | 0 | 0 | PASS |
| t=1.8s rows shift (px) | 56 | 56 | PASS |
| t=2s highlight opacity | 0.1 | 0.1 | PASS |
| t=2s rows shift (px) | 56 | 56 | PASS |
| t=2.45s highlight opacity | 0 | 0 | PASS |
| t=2.45s rows shift (px) | 56 | 56 | PASS |
| t=2.8s highlight opacity | 0.1 | 0.1 | PASS |
| t=2.8s rows shift (px) | 56 | 56 | PASS |
| t=3.9s highlight opacity | 0.1 | 0.1 | PASS |
| t=3.9s rows shift (px) | 56 | 56 | PASS |

### Page health — 3/3 pass

| property | spec value | measured | result |
|---|---|---|---|
| images failing to load (70 imgs) | 0 | 0 | PASS |
| sections/demos with zero height | 0 | 0 | PASS |
| demos | 72 | 72 | PASS |

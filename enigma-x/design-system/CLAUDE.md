# Enigma X (trading app): design system brief

For agents that build or modify the Enigma X **main trading app** UI. Load this first, then `components.md` (copy-paste HTML for every component), `tokens.css` / `tokens.json`, `components.css`, and open `showcase.html` (the live reference, with node ids on every card). Every value here comes from the Figma harvest (`../figma-spec/{foundations,components,dashboard}.md`) or is marked EXTENDED. Do not invent, round or "improve" values.

This system is separate from the Enigma X **auth** system (`../auth-design-system/`, `--eauth-*`, DM Sans / DM Mono, OTP, mobile shell). Never mix them.

## What the platform is

Real-time spot trading platform for institutional / crypto traders. Desktop only: one Dashboard (1920 x 1080) with a floating header bar, a ticker strip, and five panels (Spot Trader, RFQ, Spot balances, Chart, Trades blotter). The Figma UI is **light**. No mobile or responsive layout exists in the source.

## Source of truth and owner decisions

- Figma file `3PpdEgLKQZaybhyIILCfUF`, canonical page **final** `16:1909` = Dashboard `16:1910` + 12 component sets (Select 56:123, Input with 2 text 56:135, Input 56:145, Search 56:153, Checkbox 56:165, Button Outline 56:188, Button 56:193, Button black 56:198, tabs 56:203, input with tabs 56:214, refresh 56:225, filter 56:230, hands 56:235) + mark `58:84`. Page `drafts` (0:1) holds duplicates (Dashboard 19:692 identical) and the live-app capture `1:1949` / frame `1:3` (a **dark** web import in fallback fonts): supporting evidence only.
- Figma defines **no** variables, text styles or effect styles; only 15 paint styles. Everything below is read from nodes.
- Owner decisions (2026-10-15): the **dark theme** (sampled from the capture raster, every value "sampled / derived") and the **chart panel** (toolbar + plot slot) are included as EXTENDED. NOT built: the capture's "Status" column header and the stale-ticker "!" badge.
- Rule: values in the source are reproduced exactly; where the source is silent the system is EXTENDED from existing tokens only (no new hues, fonts or radii) and marked `EXTENDED` (CSS comment, showcase badge, `components.md` table).

## Non-negotiables (each proven by the spec)

1. **Fonts: Geist (labels, titles, buttons, inputs, all blotter cells) and Geist Mono (ticker price/change, BID/ASK tile digits, spread chip, order-book prices + quantities, balance quantities).** Only weights 400 / 500 / 600. No DM Sans in this system. Line-height is AUTO everywhere (pinned as 16 / 18 / 21 / 26 / 42px for 12 / 14 / 16 / 20 / 32px text).
2. **Controls are 32px high, radius 4, no stroke** (Select, Input, Input with 2 text, Search, Button, icon buttons, small tabs). Larger: Dashboard SELL/BUY tabs and the primary button 40px; header pills and avatar 40px.
3. **Radius is not one value:** 2 checkbox, 4 controls / tabs / pills, 8 panels / tiles / tables / header, 16 order-type chips and coin discs, 24 avatar, spread tab 8 8 0 0.
4. **Main color is `#7AEFEF`** (Figma "Main color"): primary button, selected checkbox / tab. Hover `#B0F9F6`, tint `#7AEFEF` at 0.20, darker `#3DBFBF` (logo, search / chevron glyphs). Primary text is **Black `#000000`**; Grey 3 `#7C9CAC` is secondary; Grey 2 `#A8BECD` is tertiary (labels, headers).
5. **No shadows, no effects, no gradients (except SOL coin art), no opacity.** Elevation = White card on the Grey 0 page. Strokes are INSIDE (inset `box-shadow`); table containers and Button black Variant2 are OUTSIDE (outer `box-shadow`).
6. **Tiles:** BID / SELL `#FB9697` ("Red"), ASK / BUY `#8BEEC8` ("green"), black Geist Mono Regular 32 digits + 14 decimals, no BID / ASK word on them. Text and dots use the saturated pair: `#E5686A` ("Red for text") / `#4DCC9B` ("green for text"). Never swap the pairs.
7. **Zebra tables:** container Grey 0 with a 1px OUTSIDE Grey 0 stroke, radius 8; odd rows White, even rows Grey 0. Order-type chips Limit `#E4CAFF` / `#9236F2`, Market `#CADCFF` / `#3A77F2` (raw, unbound).
8. **Panel titles are Geist Regular 20 uppercase via `text-transform: uppercase`** on mixed-case text ("Spot Trader", "Spot balances", "Chart", "RFQ", "trades blotter"). SELL / BUY / REQUEST FOR QUOTE are typed uppercase (no transform).
9. **Dimmed decimals:** integer part keeps the value colour, trailing zeros / time part = Grey 2 (`<span class="dim">.00</span>`).
10. **Margins as drawn:** left 24, gutter 16, panels padding 16/24/24/24 gap 16 (blotter 8). The 8px right-edge mismatch (panels end 1888, header 1896) is kept; use the alternate class if alignment is wanted.
11. Components use only semantic tokens (`var(--color-text-*` …) so the dark theme flips them; no raw hex in component CSS.

## Tokens

Light = Figma. Names mirror 1:1 in `tokens.css` (`--color-<kebab>`) and `tokens.json` (hub-viewer schema; group `color.figma` keeps the exact Figma names).

### The 15 Figma paint styles
| Figma name | Token | Hex | Role |
|---|---|---|---|
| White | `--color-white` | `#FFFFFF` | panels, header bar, ticker, odd rows, spread tab |
| Grey 0 | `--color-grey-0` | `#F7F8F8` | page, fields, table container, tabs track |
| Grey 1 | `--color-grey-1` | `#DEE8ED` | icon-button hover, avatar, clock divider |
| Grey 2 | `--color-grey-2` | `#A8BECD` | tertiary text, checkbox border, dimmed decimals |
| Grey 3 | `--color-grey-3` | `#7C9CAC` | secondary text, inactive tabs, refresh/filter/hands glyphs, disabled |
| Main color | `--color-main-color` | `#7AEFEF` | CTA fill, selected checkbox / tab |
| Main color hover | `--color-main-color-hover` | `#B0F9F6` | Button hover fill |
| Main color transp | `--color-main-color-transp` | `rgba(122,239,239,0.2)` | UAT pill, Button Outline hover |
| Main color darker | `--color-main-color-darker` | `#3DBFBF` | logo, search / chevron glyphs |
| Red | `--color-red` | `#FB9697` | BID tile |
| Red for text | `--color-red-for-text` | `#E5686A` | negative / bid / sell text, danger dot |
| green | `--color-green` | `#8BEEC8` | ASK tile, BUY segment |
| green for text | `--color-green-for-text` | `#4DCC9B` | positive / ask / buy text, success dot, Exposure border |
| Black | `--color-black` | `#000000` | primary text, outline stroke, Button black fill |
| Orange | `--color-orange` | `#FFB051` | selected BTC currency tab only |

Raw (unbound): `--color-limit-text/-bg`, `--color-market-text/-bg`, `--color-exposure-tint` (`#4DCC9B` at 0.2), `--color-coin-*` (ETH `#3D5092`, BTC `#F7931A`, USDT `#009393`, SOL / XLM `#000000`, SHIB `#FC1E1F`, ADA `#246DD3`, AVAX `#E84142`) and art tints.

### Semantic roles (use these in code; light value / dark value)
| Group | Tokens |
|---|---|
| text | `primary` Black / `#E4E7EB` · `secondary` Grey 3 / `#7A9091` · `tertiary` Grey 2 / `#7A9091` · `dim` Grey 2 / `#808080` · `on-brand` Black / `#2B2B2B` · `on-tile` Black / `#2B2B2B` · `on-warning` Black / `#000000` · `positive` `#4DCC9B` / `#0FC286` · `negative` `#E5686A` / `#DE5D67` · `title` Black / `#7A9091` · `tab-active` Black / `#39E2C9` · `tab-inactive` Grey 3 / `#7A9091` · `disabled`, `on-disabled`, `on-black` (Main color / `#39E2C9`), `limit`, `market` |
| surface | `page` `#F7F8F8` / `#181818` · `panel` White / `#2B2B2B` · `nav` White / `#181818` · `ticker` White / `#2B2B2B` · `field` Grey 0 / `#3F3F3F` · `table` Grey 0 / `#383838` · `row-odd` White / `#2B2B2B` · `row-even` Grey 0 / `#383838` · `spread` · `tabs-track` Grey 0 / `#3F3F3F` · `hover` Grey 1 / `#3D3D3D` · `avatar` · `env` · `exposure` · `tile-bid` `#FB9697` / `#DE5D67` · `tile-ask` `#8BEEC8` / `#0FC286` · `tab-buy` · `warning` Orange / `#FF8D1C` · `button-black` Black / `#181818` · `chip-limit` · `chip-market` · `disabled` Grey 3 |
| border | `nav` (light transparent) · `table` · `ticker` · `divider` Grey 1 · `checkbox` Grey 2 · `outline` Black · `brand` Main color · `exposure` · `tab-active` Black |
| icon | `default` Grey 3 · `field` Main color darker · `logo` Main color darker |
| brand | `--color-brand` Main color / `#39E2C9` · `-hover` · `-transp` · `-darker` |
| status | `success` `#4DCC9B` · `danger` `#E5686A` · `warning` Orange |

EXTENDED semantic tokens (not in Figma): `surface-tab-sell` (Red), `surface-chart-toolbar(-active)`, `surface-scrim` (Black 0.2), `border-focus` (Main color), `border-error` (Red for text), `brand-pressed` (Main color darker).

### Dark theme (EXTENDED; every dark value is "sampled / derived")
Apply `<body class="dark">` or `.theme-dark` on any ancestor (re-points every semantic token, `color-scheme: dark`); `.theme-light` re-asserts light inside a dark scope. Dark values are read from the live-app capture raster (Figma `get_screenshot` of frame `1:3`, 1920x905) at stated coordinates (visual estimate, thin text can read slightly dim) or derived by rule (hover = mix(brand, #FFF, 49%), transp = brand at 0.2, pressed = mix(brand, #000, 20%), Black fill -> darkest surface, role maps). All coordinates are in the comments of `tokens.json` `color.dark` and in the showcase Colours section. Known conflicts between the capture and the light roles are modifiers, never defaults: `.dashboard--alt-title-primary`, `.nav--alt-fullbleed`, `.data-table--alt-hairlines`.

## Typography

Font tokens: `--font-primary` Geist, `--font-mono` Geist Mono (fallback stacks after the family names are EXTENDED). Load `family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500;600` from Google Fonts. Use `font: var(--type-<family-weight-size>)` or the classes.

13 shorthands: `regular-12`, `medium-12`, `regular-14`, `medium-14`, `semibold-14`, `medium-16`, `regular-20`, `mono-regular-12`, `mono-regular-14`, `mono-medium-14`, `mono-semibold-14`, `mono-regular-16`, `mono-regular-32`. Classes `.t-<same>`.

31 observed role tuples (`.t-<role>`, tokens `--type-<role>`; all letter-spacing 0 except avatar initials 2px):
- Geist Medium 12: `blotter-cell` Black (n=73, also button labels), `blotter-dim` Grey 2, `badge-limit`, `badge-market`, `side-sell`, `side-buy`, `button-black-label` (Main color).
- Geist Regular 12: `field-label` Grey 2, `field-value` Black, `field-unit` Grey 3, `blotter-header` Grey 2 (ls 0px), `clock` (ls 0px).
- Geist Mono 12: `ticker-change-negative` / `-positive`. Geist Mono SemiBold 14: `ticker-price`, `ticker-price-negative`. Geist Mono Medium 14: `book-ask`, `book-bid`, `book-ask-dim`. Geist Mono Regular 14: `book-qty`, `tile-decimals` (UPPER). Geist Mono Regular 16: `spread-value`. Geist Mono Regular 32 UPPER: `tile-big`.
- Geist Medium 14: `balance-asset` (also RFQ button, selected tab). Geist Regular 14: `book-header` Grey 2 (ls 0px), `tab-inactive` Grey 3, `avatar-initials` (ls 2px). Geist SemiBold 14: `exposure-value`. Geist Medium 16: `env-pill`.
- Geist Regular 20 UPPER: `panel-title` (Black), `tab-title-inactive` (Grey 3).

## Spacing and control geometry

Figma defines no spacing tokens. Observed values: `--space-0/4/7/8/10/11/12/16/24/30/32/36/48` (the real scale is 4, 8, 10, 12, 16, 24; plus 7 control padding, 11/36 spread tab, 30 chip wrapper, 32 two-item gap, 48 RFQ form gap).

| Control | Size | Padding / gap | Source |
|---|---|---|---|
| Select / Input / Input 2 text / Search | 148 x 32 (Dashboard 188; label adds 16 + gap 4 = 52) | Select 7/8/7/12 gap 32; Input 7/12 gap 0; Input 2 text 7/12 gap 32; Search 7/8 gap 8 | 56:123-56:160 |
| Button / Outline / black | 86 x 32 hug, Dashboard primary 392 x 40 (label 14) | 7/24 gap 8 | 56:188-56:198, 16:2132 |
| tabs | 184 x 40; each tab padding 7/24; small tabs (input with tabs) 32 high, padding 7/8 | | 56:203, 56:214 |
| Icon buttons | 32 x 32, padding 7, glyph 18 x 18 (hands 20 x 18) | | 56:225-56:235 |
| Checkbox | row 120 x 16, box 16 x 16 r2, gap 8 | | 56:165 |
| Chips | 24 high, padding 0/24, r16 (Limit 76, Market 88) | | 16:2010, 16:2025 |
| Tiles | 188 x 100, padding 12, gap 4, r8 | | 16:1920, 16:1923 |
| Spread tab | 120 x 32, padding 11/36, r 8 8 0 0 | | 16:1927 |
| Tables | book / balances 392 wide: header 34 (padding 8/24), rows 42 (padding 12/24); blotter 1360: header 32 (8/12), rows 40 (12) | | 16:1932, 16:1958, 16:1990 |

## Components (Figma-defined unless marked EXTENDED)

Class scheme (details and copy-paste markup in `components.md`):
- Fields: `.field` (+ `__label`; `--dashboard` 188, `--fill`, `--rfq-instrument` 132, `--input-tabs` 244) around `.select` (`__value`, `.is-filled`), `.input` (`__field`, `.is-dim`, `__unit`), `.input-2text`, `.search`, `.input-tabs` (+ `.tabs--sm`). States `.is-focus .is-error .is-disabled` are EXTENDED.
- Buttons: `.btn`, `.btn-outline`, `.btn-black`, `.btn--lg`, `.btn--block`; hover Figma, pressed / disabled / focus EXTENDED. `.icon-btn` + `.icon-refresh/-filter/-hands`.
- `.checkbox` (`__input __box __label`; six Figma states; hover / focus EXTENDED).
- `.tabs` + `.tab` (`.is-selected`), `.tabs--track` (SELL/BUY on Grey 0, `.tab--buy` green; `.tab--sell` selected = EXTENDED), `.tabs--sm`, `.tab--warning` (Orange).
- `.chip--limit/--market`, `.status-dot--success/--danger`, `<img class="coin coin--btc">` (8 coins), `.price-tile--bid/--ask`, `.spread-tab`, `.pill-env`, `.pill-exposure`, `.clock`, `.avatar`.
- Shell/patterns: `.dashboard` (1920 x 1080, absolute placement of `.nav .ticker .panel--trader .panel--rfq .panel--balances .chart-panel .panel--blotter`), `.panel` (+ `__head`, `__title`, `__actions`), `.form-row`, `.form-stack`, `.nav` (+ `__logo __right __user`), `.ticker` (+ `__track __cell __id __symbol __quote __price __change`), `.tile-group > .tile-stack`, `.data-table` (`--book`, `--blotter`; `__head __th __body __row __td`; `.col`, `.col--140/--dot/--chip`), `.blotter-tabs > .blotter-tab`.
- EXTENDED (marked in CSS and showcase): focus ring (1.5px Main color, offset 2), field / checkbox / button / tab / icon-button hover-pressed-disabled-focus-error states, `.menu` (open Select list), `.toast`, `.modal` + `.modal-backdrop`, `.summary` (order confirmation), `.tooltip`, `.skeleton`, empty table (`.data-table--empty`), row hover / selected / sort indicators, ticker marquee, `.chart-toolbar`, `.chart-plot`, dark theme, `--z-*`.
- Alternates (never default): `.dashboard--alt-aligned` (panels end 1896, RFQ 302 high), `.dashboard--alt-title-primary`, `.nav--alt-fullbleed`, `.data-table--alt-hairlines`.

Key behaviours drawn in Figma: hover exists only for Button (fill `#B0F9F6` + 1px Main color stroke inside), Button Outline (fill Main color transp), Button black "Variant2" (1px Main color stroke outside; treated as hover), icon buttons (Grey 1 fill). Tabs: selected = Main color fill + Geist Medium, unselected = Geist Regular Grey 3. Selected BUY = `#8BEEC8`; selected BTC currency tab = Orange `#FFB051`. Checkbox: selected / all = Main color box + Black 1.5 glyph; not selected = Grey 2 1px inset stroke; disabled = Grey 3 box and label with a Grey 0 glyph.

## Layout / shell geometry (Dashboard 16:1910, 1920 x 1080, Grey 0)

| Item | x, y | w x h | Id |
|---|---|---|---|
| Header bar (White r8) | 24, 16 | 1872 x 72 | 16:2386 |
| Ticker strip (White, full bleed) | 0, 104 | 1920 x 80 | 16:2133 |
| Spot Trader | 24, 200 | 440 x 528 | 16:1911 |
| RFQ | 24, 744 | 440 x 278 | 16:2124 |
| Spot balances | 480, 200 | 440 x 392 | 16:1954 |
| Chart | 936, 200 | 952 x 392 | 16:1978 |
| Trades blotter | 480, 608 | 1408 x 438 | 16:1981 |

Header: padding 16/24, logo frame 528 x 40, UAT pill 220 x 40 at nav x 826, right cluster at x 1320 (Exposure 255 x 40, clock 216 x 40, avatar 40 x 40). Spot Trader stack: title 26, instrument row 52, tile group 160 (tiles 188 + 188 gap 16; spread tab centred at y 68 of the 100 stack via margin-top -36), Slippage / Type row 52, order book 202. RFQ: title, tabs 392 x 40, form (row 52 + gap 48 + button 392 x 40). Balances: header 32 with refresh, table 244 (header 34 + 5 x 42). Blotter: top row 38 (tabs 214 + 255, icon cluster 96 x 32), table 352 (header 32 + 8 x 40), columns dot 6.67 | Id 140 | Order Id 140 | Instrument | Order Type (117 x 16 wrapper) | Time In Force | Side | Quantity | Executed Price | User | Channel | Executed At 140. Ticker cells: padding 12/16, hug width 138 / 159 / 130, 15 cells at track x -60.

## Icons

27 SVGs in `assets/` (19 Figma exports + 8 `.currentColor` twins); see `assets/MANIFEST.md`. Monochrome: `<i class="icon icon-search">` (mask + `currentColor`): search, chevron-down (16 x 16), refresh, filter (18 x 18), hands (20 x 18), check (10 x 8), minus (10 x 2). Coloured art as `<img>`: logo (163 x 40), mark (40 x 40), 8 coins (18 x 18), status dots (use `.status-dot`). Never redraw or hand-write icon paths. Stroke weights differ by design: search 1, chevron 1.2, others 1.5. Not in Figma: MATIC / XRP / USDC / BNB / DOGE coins, close / plus / arrow / calendar / user glyphs, spinner, favicon.

## Known Figma inconsistencies (kept as drawn; full table in `showcase.html` Reference)

- Panels end x 1888 vs header 1896; RFQ bottom 1022 vs Trades 1046.
- Blotter numerics are proportional Geist; order book / balances are Geist Mono.
- Orange only on the selected BTC tab; stroke weights 1 / 1.2 / 1.5; table header 14px (book) vs 12px (blotter); letter-spacing stored 0px vs 0% (equivalent).
- Dashboard instances point at drafts components (identical to final); Checkbox drafts use an old dark-green style (final = Main color).
- "Variant2" (Button black, filter, hands) is unnamed, treated as hover. Header itemSpacing 271 is stale (real 274). Blotter header cell drifts about 0.5px against the 117 wrapper.
- Rendering tolerances: chips 75.72 / 87.81 wide, status dot 6.65625, ticker ETH cell 136.8 (Geist hug vs Figma rounding).
- Sample data only partly harvested (ticker numbers, first blotter row; Id / Order Id are literally "UAT-TRD-000...").

## Open decisions for the owner

1. Is "Variant2" a hover or a focus state? 2. Slippage "2" Grey 2: placeholder or disabled? 3. SELL-selected RFQ colour (Red derived) and the missing RFQ quote / confirmation / filter / hands popovers. 4. Dark theme: supply a dark Figma page or confirm the sampled values and the three dark alternates. 5. Align panels to 1896 / 1046? 6. Blotter numerics proportional vs Mono? 7. Orange tab: brand exception, and what is selected USD? 8. Meaning of the blotter status-dot colours. 9. Final chart design. 10. Real ticker / blotter sample values. 11. Relink Dashboard instances to final components. 12. Real motion values. 13. Confirm the Status column and "!" badge stay out.

## What NOT to do

- Do not use DM Sans / DM Mono for the trading app (that is the auth system). Do not use Inter / Trebuchet MS (capture fallbacks).
- Do not use `#1A1F36` as text (primary text is Black `#000000`), `#5ADADA` as hover (Figma hover is `#B0F9F6`), `#F59E0B` for pending (Orange is `#FFB051`, BTC tab only), `status-pending`, `brand-ghost-border`, `--color-bg / surface-2` style names.
- Do not make controls 48 / 50 / 52 / 36 / 56px (controls are 32; Dashboard tabs / primary button / pills 40; header 72).
- Do not say "border radius is always 4" (see radii above). Do not add shadows, blur, transitions or press-scale animations (Figma has none; only the EXTENDED marquee and skeleton pulse animate).
- Do not colour BID prices red and ASK prices teal `#7AEFEF`: bid text `#E5686A`, ask text `#4DCC9B`, tiles `#FB9697` / `#8BEEC8`.
- Do not claim "light mode only": the dark theme exists as EXTENDED; never present dark values as Figma-defined.
- Do not add a mobile shell, OTP input, authenticator, Dark / Danger / Small / Link buttons, option-toggle pills, password inputs, status / environment badges, eyebrow section labels, divider-with-label, balance rows or instrument selectors: they are not in the trading Figma (auth belongs to `--eauth-*`).
- Do not use a Status column header, the "!" stale badge, a 20-row blotter, a " *" price suffix, the "Position ... CLOSE" row, or TradingView assets (not built; owner decision / obsolete).
- Do not hardcode hex in component CSS; do not create new radii, hues or fonts; do not merge near-equal values; do not draw icons by hand; do not synthesise font weights beyond 400 / 500 / 600.
- Do not edit the old auth files, the shared showcase kit or the hub.

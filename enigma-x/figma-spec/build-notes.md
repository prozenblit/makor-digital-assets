> Moved here in stage 3 from `enigma-x/design-system/_build-notes.md` (stage 1 + stage 2 content unchanged; the old file was deleted; a stage 3 section is appended at the end). Statements below that the old components.md / CLAUDE.md / showcase.html are still wrong are historical: stage 3 overwrote all three.

# ENIGMA X (trading app) design system — stage 1 handoff (tokens + control-level CSS)

Written 2026-10-15. Source: Figma file `3PpdEgLKQZaybhyIILCfUF`, page `final` 16:1909 (Dashboard 16:1910 + 12 component sets). Specs: `enigma-x/figma-spec/{foundations,components,dashboard}.md`. Rules: `audit/BUILD_RULES.md`.
Files written (overwritten): `tokens.json`, `tokens.css`, `components.css` (PART 1 only). NOT touched: `components.md`, `CLAUDE.md`, `showcase.html` (still the OLD wrong versions — stage 3 replaces them), `enigma-x/auth-design-system/` (`--eauth-*`, DM Sans — separate system).
`tokens.css`/`tokens.json` are GENERATED from one data file (kept in the session scratchpad, not in the repo): edit both files by hand consistently if you change a value.

## 1. Tokens (unprefixed names, mirror each other 1:1)

| group (tokens.json `color.*`) | CSS names | notes |
|---|---|---|
| `figma` (15, exact Figma names as keys: `White`, `Grey 0`…`green`, `Black`, `Orange`) | `--color-white`, `--color-grey-0..3`, `--color-main-color`, `-hover`, `-transp` (rgba .2), `-darker`, `--color-red`, `--color-red-for-text`, `--color-green`, `--color-green-for-text`, `--color-black`, `--color-orange` | exact values |
| `raw` (24) | `--color-limit-text/-bg`, `--color-market-text/-bg`, `--color-exposure-tint`, `--color-coin-<eth,btc,usdt,sol,shib,ada,avax,xlm>`, ETH/SHIB art tints, `--color-coin-glyph-white` | unbound in Figma |
| top-level `gradient` (3) | `--gradient-coin-sol-1..3` (stops only; handles live in `assets/coin-sol.svg`) | |
| semantic `text` (17) `surface` (26) `border` (11) `icon` (3) `brand` (5) `status` (3) | `--color-text-primary/secondary/tertiary/dim/on-brand/on-tile/on-warning/positive/negative/title/tab-active/tab-inactive/disabled/on-disabled/on-black/limit/market`, `--color-surface-page/panel/nav/ticker/field/table/row-odd/row-even/spread/tabs-track/hover/avatar/env/exposure/tile-bid/tile-ask/tab-buy/tab-sell*/warning/button-black/chip-limit/chip-market/disabled/chart-toolbar*/chart-toolbar-active*/scrim*`, `--color-border-nav/table/ticker/divider/checkbox/outline/brand/focus*/error*/exposure/tab-active`, `--color-icon-default/field/logo`, `--color-brand` (+`-hover/-transp/-darker/-pressed*`), `--color-status-success/danger/warning` | `*` = EXTENDED. **Components use ONLY these semantic tokens** (so the dark theme flips everything). Stage 2/3: do the same. |
| `dark` (65) | `--color-dark-<group>-<key>` (e.g. `--color-dark-text-primary`) | one dark value per semantic token, comment = sample coordinates or derivation rule |

Other groups: `font` (`--font-primary` Geist, `--font-mono` Geist Mono; fallback stacks EXTENDED), `fontSize` (13 shorthands `--type-<regular-12 … mono-regular-32>` = `font:` shorthand with measured auto line-height 16/18/21/26/42), `typeRole` (the 31 tuples: `--type-<role>`, e.g. `--type-panel-title`, `--type-tile-big`), `fontWeight` (400/500/600), `lineHeight` (`--lh-auto-12/14/16/20/32`; 16 = 21px VISUAL ESTIMATE), `letterSpacing` (`--ls-0`, `--ls-avatar` 2px), `spacing` (`--space-0,4,7,8,10,11,12,16,24,30,32,36,48` observed), `borderRadius` (`--radius-2,4,5,8,16,24,spread-tab` + aliases `-checkbox -control -panel -pill`; 5 = editor chrome only, unused), `controlHeight` (`--h-*`), `controlWidth` (`--w-*`), `iconSize` (`--icon-16,18,hands,check,status-dot,coin`), `border` (strokes `--stroke-hairline 1px, -icon 1.5px, -search 1px, -chevron 1.2px, -tab-underline 1.5px`), `shadow` (`none` — Figma has no effects), `layout` (`--layout-*`: nav 24/16/1872x72, ticker y104 h80, panels y200, col x 24/480/936, widths 440/440/952/1408, heights 528/392/392/438/278, gutter 16, panel padding 16/24/24/24, panels end 1888, header ends 1896, tile overlap -36 …), `zIndex` (menu/scrim/modal/toast, EXTENDED). No `duration`/`easing`: Figma has no motion (the showcase Motion section should say "Not defined in the source").
Dark theme scope: `body.dark` or any ancestor `.theme-dark` (re-points every semantic token to its `--color-dark-*` pair; `color-scheme: dark`).

## 2. components.css (PART 1) class scheme — stage 2 appends under the PART 2 marker
Base/reset (Geist 12 Regular black on page colour); type utilities: 13 `.t-<family-weight-size>` + 31 role classes `.t-<role>` (font+colour+case+ls, e.g. `.t-panel-title` UPPER, `.t-tile-big`, `.t-blotter-header` ls 0px, `.t-avatar-initials` ls 2px); icons `.icon` (+ `.icon-search/-chevron-down/-refresh/-filter/-hands/-check/-minus`, export sizes), `.status-dot(--success|--danger)`, `.logo-enigma`, `.logo-enigma-mark` (mask, themable), `<img class="coin coin--btc">` (8 coins; `content:url()` so an `<img>` needs an `alt`; a real `src` also works).
Controls (figma node ids are in every rule comment):
- `.field` (`--dashboard` 188, `--fill`, `--rfq-instrument` 132, `--input-tabs` 244) + `.field__label`; boxes `.select` (+`__value`, `.is-filled`), `.input` (+`__field`, `.is-dim`, `__unit`), `.input-2text`, `.search`; states `.is-focus/.is-error/.is-disabled/.is-open`; `.select-wrap` + `.menu` (+`__item`).
- `.checkbox` (+`__input __box __label`; `.is-checked/.is-indeterminate/.is-disabled/.is-hover/.is-focus` or real input `:checked/:indeterminate/:disabled`).
- `.btn`, `.btn-outline`, `.btn-black` (`.is-hover/.is-active/.is-disabled/.is-focus`), size `.btn--lg` (40/14px), `.btn--block` (FILL).
- `.tabs` + `.tab` (`.is-selected` or `aria-selected`), `.tabs--track` (Dashboard SELL/BUY 392x40; `.tab--buy` green, `.tab--sell` red EXTENDED), `.tabs--sm` (32/7·8/12px, in input-with-tabs), `.tab--warning` (Orange BTC). `.input-tabs` (244x32; tabs absolutely flush right) with `.input` + `.tabs.tabs--sm`.
- `.icon-btn` (32x32 r4, `.is-hover`), `.chip--limit/--market`, `.price-tile--bid/--ask` (+`__big __dec`), `.spread-tab`.
- EXTENDED: `.chart-panel` (+`__title`), `.chart-toolbar` (+`__btn` `.is-active`, `__sep`, `__spacer`), `.chart-plot` (+`__legend`, `__placeholder`), `.toast-stack/.toast(--success|--danger)`, `.modal-backdrop/.modal` (+`__title __body __actions`), `.tooltip`.
Notes for stage 2/3: label text in SELL/BUY/REQUEST FOR QUOTE is typed uppercase in the source (no text-transform); `.btn-outline` is left-aligned when stretched (Figma primary axis MIN); strokes INSIDE = `inset box-shadow`, Button black Variant2 stroke OUTSIDE = outer shadow; `.spread-tab` content box is 10px high (padding 11/11 in 32) — the 21px line box overflows centred, as in Figma; header items without component (UAT pill, Exposure pill, avatar, ticker cell, panel, table, tab-underline blotter tabs, panel title row, order-type wrapper 117x16) are STAGE 2 patterns — tokens and `.t-*` classes for them exist.

## 3. Built vs spec (all Figma-drawn states)
Select (label/no label), Input, Input with 2 text, Search (label/no label each), Checkbox ×6 (final colours; drafts' old dark-green style ignored), Button Default/hover, Button Outline Default/hover, Button black Default/Variant2, tabs 1/2, input with tabs ×4, refresh/filter/hands Default/hover (Variant2), plus Dashboard controls (SELL/BUY track, BTC orange tab, 392x40 primary, Black values / Grey 2 Slippage value, Limit/Market chips, status dots, BID/ASK tiles 188x100, spread tab 120x32 8/8/0/0).

## 4. EXTENDED (not in Figma) — all derived from existing tokens
1. global `:focus-visible` ring (1.5px Main color, offset 2) 2. field focus (inset 1px Main color) 3. field error (inset 1px Red for text) 4. field disabled (Grey 1 fill + Grey 2 text) 5. Select open chevron rotate 6. `.menu` open list 7. checkbox hover 8. checkbox focus 9. Button pressed (Main color darker) 10. Button disabled (disabled-checkbox recipe) 11. Button focus 12. tab hover/focus/disabled 13. `.tab--sell` selected (Red) 14. icon-button pressed/disabled/focus 15. chart panel container + toolbar slot + plot area 16. toast 17. modal 18. tooltip 19. z-index scale 20. font fallback stacks 21. **dark theme (whole `dark` colour group, 65 tokens + `.theme-dark` block)** 22. extended tokens: `surface-tab-sell`, `surface-chart-toolbar(-active)`, `surface-scrim`, `border-focus`, `border-error`, `brand-pressed`. Each is marked `EXTENDED —` in the CSS and in the token comment.

## 5. Dark theme — method and sampled colours
Raster: Figma `get_screenshot` of frame `1:3` (the live-app capture inside drafts section 1:1949), 1920x905 PNG, decoded with a small node script; values read at the pixel coordinates below ("sampled from live-app capture raster (visual estimate)"; text colours = lightest/dominant non-background pixel of the glyph box, so thin text can be slightly dimmer than the app's real CSS). Mapping = SAME role as the light token.

| role (light token → dark) | sampled hex | coordinates (x,y) in capture |
|---|---|---|
| surface.page (Grey 0) | #181818 | (4,300), (483,300), (700,142) |
| surface.panel / ticker / spread / avatar (White/Grey 1) | #2B2B2B | (300,600), (700,100), spread (240,220..239), avatar (1870,27) |
| surface.nav (White) + border.nav | #181818 + #393939 | (600,20); hairline (600,55) |
| surface.field / tabs-track (Grey 0) | #3F3F3F | (200,315), (400,315), (350,370), SELL tab (60,690) |
| surface.table + border.table | #383838 | order-book container (200,447) |
| surface.row-odd (White) | #2B2B2B | balances/blotter rows (700,225), (700,646) |
| border.ticker | #323232 | ticker divider (142,76..127) |
| text.primary (Black) | #E4E7EB | input text (74..130,296..312), blotter cell (528..612,640..653), spread, clock |
| text.secondary / tab-inactive / title | #7A9091 | unit BTC (414..442,296..312), BALANCE MOVEMENT (739..902,571..587), SPOT BALANCES (498..622,154..170) |
| text.tertiary (Grey 2) | #7A9091 | BID header (94..116,408..422); labels lightest #758A8B (antialiased) |
| text.dim (decimals) | #808080 | (395..411,471..485), (1324..1338,640..653) |
| text.on-brand / on-tile | #2B2B2B | RFQ label (160..326,853..870), tile digits (48..160,184..216) |
| text.on-warning | #000000 | BTC tab label (366..398,741..757) |
| brand / icon.field / border.brand / tab-active / market text | #39E2C9 | RFQ button (100,862), search icon (44..62,295..312), underline (520,594..595) |
| tile-ask / tab-buy / text.positive / status.success (green) | #0FC286 | (300,170), (300,690), ask price (358..412,440..454), dot (850,646) |
| tile-bid / text.negative (Red) | #DE5D67 | (40,170), bid price (76..132,440..454) |
| surface.warning (Orange) | #FF8D1C | BTC tab (365,740) |
| surface.env (UAT) | #02B175 | (820,27) |
| surface.exposure + border.exposure | #244443 + #39E2C9 | (1336,28), (1326,28) |
| Limit chip bg/text | #3B225C / #A790FF | (1018,646) area / (1015..1050,640..654) |
| Market chip bg/text | #244443 / #39E2C9 | (1010..1055,677..691) |
| surface.hover, chart-toolbar-active | #3D3D3D | chart toolbar active button (973,160) |
| surface.chart-toolbar | #0F0F0F | (1450,166) |

Derived (no sample): brand hover #9AF0E3 = mix(brand,#FFF,49%) [49% = mean white-mix of the light pair]; brand transp rgba(57,226,201,.2) [same alpha as light]; pressed #2EB5A1 = mix(brand,#000,20%); Button black fill #181818 (Black → darkest sampled surface); tab-sell #DE5D67 (mirror of tile-bid); disabled box = text.secondary, disabled glyph = surface.field; border.divider #393939 (nearest hairline); border.checkbox/outline/focus/error, status.danger, icon.default/logo by role map; scrim rgba(0,0,0,.2) both themes. Row-even = container colour.

## 6. Decisions / conflicts recorded (nothing silently picked)
- Figma inconsistencies kept as drawn: panels end x=1888 but header ends 1896; blotter numerics proportional Geist vs order-book Mono; Orange only on selected BTC tab; stroke weights 1 / 1.2 / 1.5; 12 of 13 component sets identical final vs drafts, Checkbox final wins; Dashboard instances point at the drafts components; Button black / filter / hands "Variant2" treated as hover (unnamed); letter-spacing 0 vs 0px equivalent.
- Dark capture vs light roles: panel titles grey (light black); capture header full-bleed on page colour with a bottom hairline (light: floating white r8 card); text.tertiary == text.secondary in dark; UAT pill solid green (light = Main color transp tint); Exposure border teal (light = green for text); capture refresh/filter icons orange (#FF8D1C, light Grey 3 — dark uses the light role); table zebra not drawn in the capture (hairlines #383838 on rows) so dark zebra is derived from the light structure; Slippage field in the capture is an outlined ghost (not mapped); ticker change colours in the capture are TradingView #089981/#F23645 (not used; dark text.positive/negative = #0FC286/#DE5D67); the capture's logo art differs (not reproducible).
- Rendering tolerances: Limit/Market chips render 75.72/87.81 wide (Geist text hug 27.72/39.81 vs Figma's rounded 28/40); status dot 6.65625px (browser LayoutUnit snap of 6.67).

## 7. NOT built (owner decision)
Capture's Status column header and the stale-ticker "!" badge / MATIC coin-less fallback; TradingView assets/icons/candles; 20-row blotter, ` *` price suffix, "Position … CLOSE" row (older design 3:3).

## 8. Verification (headless Chrome over CDP, http://localhost:3456/enigma-x/design-system/_stage1-test.html, 1700x1200)
284 checks (bounding boxes + computed styles; 17 dark-theme, ~35 on EXTENDED states) against the spec numbers: 278 exact, 6 flagged and all explained (not defects): input gap reports 0px (test expected "normal"), Limit/Market chips 75.72/87.81 wide (Geist text hug vs Figma rounded 28/40), status dot 6.65625 (layout snap of 6.67), coin <img> has naturalWidth 0 because it uses content:url() (renders), letter-spacing 0px computes to normal. One real bug found and fixed (disabled icon-button glyph colour) and re-verified. Test page deleted.

## 9. Unresolved / for stage 2-3
- Showcase kit needs `--sk-*` mapping onto: `--color-surface-page/panel/field`, `--color-border-divider`, `--color-text-primary/secondary`, `--color-brand`, `--color-text-on-brand`, `--font-primary`; theme toggle must add `dark` to `<body>`.
- Unnamed Figma variants (`Variant2`) and "Slippage greyed value" meaning (placeholder vs disabled) need an owner answer; SELL-active RFQ tab colour is EXTENDED (Red).
- Stage 2: header (nav 1872x72, UAT pill, Exposure pill, clock, avatar), ticker strip/cells (80 high, coins), panels, order-book/balances/blotter tables (header 34/32, rows 42/40, zebra, 1px OUTSIDE container stroke), underlined blotter tabs (214x38 / 255x38, 1.5 bottom), order-type cell wrapper (117x16), tile+spread overlap stack (gap -36), RFQ form, Dashboard screen 1920x1080.

---
# STAGE 2 handoff (layout patterns) — written 2026-10-15
`components.css` PART 2 appended (lines ~520–763). Every block carries `figma:` node ids. Only semantic tokens; no raw hex in rules. Sizes with no token (observed frame sizes: 528 logo frame, 220 UAT, 255 Exposure, 216 clock, 140/117 columns…) are literal px with their node id.
**PART 1 bug fix (proven, dark only):** `.tabs--sm .tab.is-selected` (0,3,0) out-ranked `.tab--warning.is-selected`, so the dark BTC tab label was #2B2B2B instead of text.on-warning #000. Added the `.tabs--sm .tab.tab--warning…` selector pair (light unchanged; commented in place).

## Pattern -> classes (node ids)
- Canvas `.dashboard` 16:1910 (1920x1080, children placed by `.dashboard > .<pattern>` rules: nav 24,16 · ticker 0,104 · trader 24,200 · rfq 24,744 · balances 480,200 · chart 936,200 · blotter 480,608). Outside `.dashboard` all patterns are static boxes.
- Panel `.panel` + `--trader` 440x528 (16:1911) `--rfq` 440x278 (16:2124) `--balances` 440x392 (16:1954) `--blotter` 1408x438 gap 8 (16:1981); chart = `.chart-panel` (PART 1, 16:1978). Title row `.panel__head` (+`--balances` 32, `--blotter` 38), `.panel__title` (UPPER via text-transform on stored mixed-case text: "Spot Trader", "Spot balances", "Chart", "RFQ", "trades blotter"), `.panel__actions` (96x32 icon cluster 16:1986), `.form-row`, `.form-stack` (gap 48, 16:2128).
- Nav 16:2386: `.nav` (+`__logo` 528x40 16:2387, `__right` 16:2391, `__user` 16:2395), `.pill-env` 220x40 16:2389, `.pill-exposure` (+`__label __value`) 255x40 16:2392, `.clock` (+`__date __row __time __version`) 216x40 16:2396, `.avatar` 16:2402, logo = `.logo-enigma` (mask). Stored itemSpacing 271 is stale; real space-between gap = 274 (UAT x826, right cluster x1320 verified).
- Ticker 16:2133/2134: `.ticker`, `.ticker__track` (x-60, 2040), `.ticker__cell`, `__id`, `__symbol`, `__quote`, `__price(--negative)`, `__change(--negative|--positive)`; coin = `<img class="coin coin--btc" alt>`.
- Trader: `.tile-group` 16:1917, `.tile-stack` 16:1918 (`__tiles` 16:1919, `__spread` 16:1926 holds `.spread-tab`; margin-top -36 via `--layout-tile-overlap`, flex:none so nothing shrinks; tab lands at (136,68)). Fields/tiles/tabs/button from PART 1. Order book = `.data-table.data-table--book` (16:1932) with `__head/__th`, `__body`, `__row`, cells `.book__bid/.book__qty/.book__ask`, `.dim` (greyed decimals).
- RFQ 16:2124: `.tabs.tabs--track` (SELL `.tab--sell`, BUY `.tab--buy.is-selected`), `.form-stack` > `.form-row` (`.field--rfq-instrument` 132 + `.field--input-tabs` 244 with `.tab--warning` BTC) + `.btn.btn--lg.btn--block`.
- Balances 16:1954: `.panel__head--balances` + `.icon-btn`; table 16:1958 `.data-table--book` + `.balance__asset`, `.balance__qty--positive|--negative`.
- Blotter 16:1981: `.blotter-tabs`/`.blotter-tab(.is-active)` 19:126/19:127; `.data-table--blotter` 16:1990 (header 16:1991 32, rows 40); columns `.col` (FILL), `.col--140`, `.col--dot` (6.67; header keeps an EMPTY placeholder, as the hidden 16:1992 occupies space in Figma), `.col--chip` (117x16 wrapper 16:2009, chip 24 overflows 4/4); side `.t-side-sell|buy`; qty `.t-blotter-dim`; executed-at `.blotter__executed` > `.date-part` + `.time-part`; dots `.status-dot--success|danger`; chips `.chip--limit|market`.
- Chart: placement only (`.dashboard > .chart-panel`), final Dashboard = title only; EXTENDED toolbar/plot in PART 1.

## EXTENDED added in PART 2 (10) — each labelled `EXTENDED —` in CSS
1 ticker marquee (`.ticker__track--marquee`, two copies of the cell set, -50% translate, 60s via local `--ticker-duration`, pause on hover, reduced-motion off) 2 table row hover (surface.hover) 3 row selected (brand.transp) 4 sort indicators (`.is-sortable`, `aria-sort`, exported chevron, asc = rotate 180) 5 skeleton rows 6 skeleton pulse (1.2s, local) 7 empty table state (`.data-table--empty`, `.table-empty`; also "Balance movement" tab content) 8 blotter-tab hover/focus/disabled 9 order confirmation (`.summary`, `.summary__row/label/value(--buy|--sell)` inside PART 1 `.modal`) 10 dark-theme nav bottom hairline (border.nav token; light transparent). Plus every pattern flips for `body.dark`/`.theme-dark` through tokens (no new colours; dark zebra = derived row-odd/row-even).

## Conflicts / alternates (modifier classes, never default)
- `.dashboard--alt-aligned`: panels end 1896 (chart 960, blotter 1416) and RFQ 302 high (bottom 1046) instead of the drawn 1888 / 1022.
- `.dashboard--alt-title-primary`: dark panel titles text.primary instead of the capture grey #7A9091.
- `.nav--alt-fullbleed`: capture header x0 full width r0 (capture height ~56 not applied).
- `.data-table--alt-hairlines`: capture hairline rows instead of zebra.
- Not alternates but recorded: blotter header drift ~0.5px (FILL 113.67 header cell vs 117 fixed chip wrapper) reproduced; blotter numerics proportional vs book Mono; text.dim used for the timestamp time part (dark #808080).

## Visual estimates / tolerances
Ticker cell widths hug content: Geist Mono gives 136.8 for ETH (Figma 138), others within 0.6; chips 75.72/87.81 (stage 1 note); spread frame 16:1926 modelled as 392x40 holding the 32 tab (spec lists 392x32 at y68 with itemSpacing -36; only the (136,68) placement is certain); empty/skeleton sizes, marquee duration, row hover colours EXTENDED; header "Status" column and "!" stale badge not built (owner).

## Verification (stage 2)
Headless Chrome CDP, 1920x1080, `_stage2-test.html` (deleted): 509 bounding-box/computed-style checks per theme, light 509/509, dark 509/509 after fixes (1 real bug: spread tab shrink in the -36 stack, fixed with flex:none; 1 PART 1 dark bug above). Light screenshot compared with Figma export of 16:1910 (use_figma screenshot): layout, fills, type and icon placement match; only sample data differs. Note: `serve` redirects `*.html` to the clean URL and drops the query string, so dark is toggled by adding `dark` to body.

## Unresolved for stage 3 / owner
Showcase must show: dashboard (light+dark, scaled), each pattern with node ids, alt modifiers, EXTENDED badges; copy-HTML for the markup above (ticker via JS or static; blotter header needs the empty `.col--dot`). RFQ quote/countdown screen, user menu, filter/hands popovers, SELL-active RFQ screen still not drawn. `.t-*` role classes remain usable inside cells. Dark capture refresh/filter icons are orange (#FF8D1C) — not mapped (dark uses icon.default).

---
# STAGE 3 handoff (showcase + docs + verification) — written 2026-10-15
Files written in `enigma-x/design-system/`: `showcase.html` (single static file on the shared kit), `components.md`, `CLAUDE.md` (all three overwritten). This file was moved here from `design-system/_build-notes.md`. Also written: `figma-spec/VERIFICATION.md`.
**Only change to the tokens:** `.theme-light` (EXTENDED scope helper that repeats the 65 light semantic values) appended at the end of `tokens.css`, and the header comment there re-pointed at this file. It lets the Screens section show a light and a dark Dashboard at the same time while the page theme is dark. No token value changed; `tokens.json` unchanged. `components.css` unchanged (no bug found in stage 3).
**Showcase:** built directly on the kit (STRUCTURE.md). `.sk-app` token mapping from the platform tokens (accent = Main color darker; `--sk-stage-bg` = panel so Grey 0 fields stay visible; `--sk-shadow: none`); the theme toggle flips `body.dark`; no custom scripts for copy / fit / lazy. A small inline demo script (tabs, Select list, blotter tabs, sortable headers, indeterminate checkbox) mirrors the snippets in components.md. Showcase-support CSS (chrome only, none applied to demo markup): `.sk-stage.ds-on-page` (Grey 0 stage for nav / ticker / panels), `.ds-chip`, `.ds-bar`, link underline and list-style rules inside `.sk-prose` / tables (the platform base resets `a` and `ul/ol`). Inline `style="width:392px"` on four demos (SELL/BUY track x2, Dashboard button, tile stack) and `width:196px` on the stretched outline button, because `width:100%` components shrink-wrap inside a kit variant; `min-height` on the open-Select demo; skeleton bar widths.
**Generated, not hand-written:** the page, components.md (same demo markup) and the Extended index come from one generator kept outside the repo; the numbers below are from the final run.
**Counts:** 50 sections in the DOM (Overview + 8 Foundations + 35 component sections + 2 Screens + 4 Reference; the kit chip reads 49 without Overview), 44 component cards, 132 variants, 6 screens (Dashboard light and dark + 4 alternates), 60 Extended badges (+1 in the legend; the Extended index has 60 rows), 6 Alt, 8 Outside canonical, 27 assets.
**Verification:** 1046 bounding-box / computed-style checks (523 light, 523 dark) all pass; functional checks (nav, deep links, `?all`, frames, toggle, search, Copy HTML, assets, console) all pass; details and tolerances in `VERIFICATION.md`. Hub viewer `/hub/ds-viewer.html#enigma-x` renders from tokens.json.
**Sample data:** the ticker values that were not harvested (ETH-EUR, USDT-USD, USDT-EUR price, ADA, AVAX) and blotter rows 2-8 are illustrative; change texts were chosen so the Geist Mono hug widths match Figma's 130 / 138 / 159 cells.
**Missing kit capabilities (listed, not worked around):** (1) no Fit / 100% toggle for a frame inside a component card, so patterns wider than the stage (nav 1872, ticker 1920, blotter 1408) scroll horizontally; the scaled views are the Screens frames; (2) no Copy HTML on `.sk-screen` frames (the markup is in the pattern cards and components.md); (3) no per-stage background modifier (a `ds-on-page` support class was needed for demos that sit on the page colour); (4) the kit does not restore list bullets / link underlines when the platform base removes them; (5) `width:100%` components need an explicit width inside `.sk-variant` (shrink-wrap); a fill-width helper would avoid inline styles.

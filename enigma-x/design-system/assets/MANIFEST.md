# ENIGMA X — exported assets (from Figma `3PpdEgLKQZaybhyIILCfUF`, page `final` 16:1909)

Exported with `node.exportAsync({format:'SVG_STRING'})`, written **verbatim** (all 19 files verified byte-identical to a fresh Figma export by length + rolling checksum). Originals are untouched; `*.currentColor.svg` twins differ only by replacing the single hard-coded colour with `currentColor`. Nothing redrawn.

| file | Figma name | node id | export size | colours (style) | used where | recommended CSS |
|---|---|---|---|---|---|---|
| logo-enigma.svg | Union 86 (in `SVG` frame 16:2387) | 16:2388 | 163 x 40 | fill #3DBFBF (Main color darker) | Header bar logo (wordmark "ENIGMA" in high-contrast serif + hexagon maze mark, outlined paths) | `height:40px;width:163px` (keep ratio); never recolour except to Main color darker |
| logo-enigma-mark.svg | Union 86 | 58:84 | 40 x 40 | fill #3DBFBF (Main color darker) | Standalone mark (top-level on `final`), favicon / compact logo | `40x40` |
| coin-eth.svg | XTVCBTC.svg (ETH) | 16:2173 (same art in 16:2302, 16:2338; first instance 16:2137 not exportable) | 18 x 18 | disc #3D5092 (unstyled); glyph tints #E7F0FF #A5B9EE #A5B8F0 #687FCB #A8B9EF #E8F1FF + white | Ticker `ETH-USD`, `ETH-EUR` | `18x18`, disc is `rx=9` circle; do not recolour |
| coin-btc.svg | XTVCBTC.svg (BTC) | 16:2159 (16:2324) | 18 x 18 | disc #F7931A; glyph white | Ticker `BTC-USD` | `18x18` |
| coin-usdt.svg | XTVCBTC.svg (USDT) | 16:2195 (16:2209, 16:2360, 16:2374) | 18 x 18 | disc #009393; glyph white | Ticker `USDT-USD`, `USDT-EUR` | `18x18` |
| coin-sol.svg | XTVCBTC.svg (SOL) | 16:2223 | 18 x 18 | disc black (#000000 unstyled); 3 linear gradients `#6E73E3 > #41B8C8 > #27E2B7 > #16FC99`, `#9E48FF > #8D4DF9 > #6B7AE1 > #45B3CE`, `#8654F3 > #549AD6 > #26D9B2` | Ticker `SOL-USD` | `18x18`. Gradient ids `paint0/1/2_linear_16_2223` — if inlining several copies on one page keep ids unique |
| coin-shib.svg | XTVCBTC.svg (SHIB) | 16:2240 | 18 x 18 | disc #FC1E1F; art #EB9A2E, #FEFFF7, #EAEAE8, black | Ticker `SHIB-USD` | `18x18` |
| coin-ada.svg | XTVCBTC.svg (ADA) | 16:2260 | 18 x 18 | disc #246DD3; glyph white | Ticker `ADA-USD` | `18x18` |
| coin-avax.svg | XTVCBTC.svg (AVAX) | 16:2274 | 18 x 18 | disc #E84142; glyph white | Ticker `AVAX-USD` | `18x18` |
| coin-xlm.svg | XTVCBTC.svg (XLM) | 16:2288 | 18 x 18 | disc black; glyph white | Ticker `XLM-USD` | `18x18` |
| icon-search.svg (+ .currentColor) | lucide/search | 56:157 (also I16:1915;10:44) | 16 x 16 | stroke #3DBFBF (Main color darker), width 1 (stored 1), round caps/joins | Search field leading icon (`Search` component, Instrument field) | `16x16`, `color:#3DBFBF` (var Main color darker) |
| icon-chevron-down.svg (+ .currentColor) | lucide/chevron-down | 56:128 (I16:1931;9:198) | 16 x 16 | stroke #3DBFBF (Main color darker), width 1.2 | Select trailing chevron | `16x16`, `color:#3DBFBF` |
| icon-refresh.svg (+ .currentColor) | refresh / Vector | 56:227 (Dashboard instances 16:1957, 16:1987; hover 56:229 identical) | 18 x 18 (node 16 x 16 + 1.5 stroke bleed) | stroke #7C9CAC (Grey 3), width 1.5, round | Refresh icon button (Spot Balances header, Blotter header); lucide "rotate-ccw"-like (visual estimate) | place in `32x32` button r4 pad 7, svg `18x18` centred, `color:#7C9CAC`; hover bg #DEE8ED (Grey 1) |
| icon-filter.svg (+ .currentColor) | filter / Vector | 56:232 (16:1988; Variant2 56:234 identical) | 18 x 18 | stroke #7C9CAC, width 1.5 | Blotter filter button (funnel) | same as refresh |
| icon-hands.svg (+ .currentColor) | hands / Vector | 56:237 (16:1989; Variant2 56:239 identical) | 20 x 18 | stroke #7C9CAC, width 1.5 | Blotter "deals/handshake" button | `20x18` in `32x32` button, `color:#7C9CAC` |
| status-dot-success.svg | Vector | 16:2005 | 7 x 7 (geometry 6.67) | fill #4DCC9B (green for text) | Blotter status column, filled/ok | `width/height: 6.67px` |
| status-dot-danger.svg | Vector | 16:2020 | 7 x 7 (6.67) | fill #E5686A (Red for text) | Blotter status column, rejected/failed (visual estimate of meaning) | `6.67px` |
| status-dot.currentColor.svg | (twin of the two dots) | 16:2005 / 16:2020 | 7 x 7 | currentColor | use with `color: var(--success)` / `var(--danger)` | `6.67px` |
| icon-check.svg (+ .currentColor) | Vector 1 (in Checkbox/selected) | 56:168 | 10 x 8 | stroke #000000 (Black), width 1.5, round cap | Checked checkbox glyph (box 16x16 r2 fill #7AEFEF) | inside 16x16 box at x4,y5 |
| icon-minus.svg (+ .currentColor) | Vector 1 (in Checkbox/all) | 56:178 | 10 x 2 | stroke #000000, width 1.5, round cap | "All"/indeterminate checkbox glyph | inside 16x16 box |

Disabled checkbox glyphs use #F7F8F8 (Grey 0) strokes on a #7C9CAC box — use the `.currentColor` twins with `color:#F7F8F8`.

## Not exported / notes
- **Coin 16:2137 (first ETH instance) fails to export** ("no visible layers") although it is visually present; identical-art twins (16:2173, 16:2302, 16:2338) export fine and were used. The 8 inner vectors of 16:2137 also fail individually — a Figma export quirk of that one instance.
- Hover/Variant2 copies of refresh/filter/hands glyphs are geometrically identical (de-duped). The 32x32 button backgrounds are CSS (r4, Grey 1 hover), not SVG.
- Checkbox box, badges (Limit/Market), avatar disc, spread chip: pure CSS shapes, no SVG needed.
- Live-app capture (`drafts` > 1:3) contains ~61 small vector groups (TradingView toolbar icons, `Button - filled` status dots, ticker coins incl. MATIC/XRP/USDC, TradingView logo); they are web-import artefacts in Inter/Trebuchet/dark theme, **not exported** (not canonical).
- Drafts duplicates (components, Dashboard 19:692) share the same icons; nothing extra.
- Not present in Figma: MATIC, XRP, USDC, BNB, DOGE coin art; favicon; empty-state/illustration; loading spinner; close/x, plus, arrow, calendar, user/avatar glyph, warning icons.

## Inconsistencies
- All coin frames are named `XTVCBTC.svg` (import artefact) regardless of coin — identify by ticker text.
- Coin frames use `cornerRadius 16` on 18x18 (circle by clamping; SVG export normalises to `rx=9`).
- Disc fills for SOL/XLM are black but unstyled (#000000 raw, not the `Black` paint style).
- Search icon stroke 1, chevron stroke 1.2, custom icons 1.5 — three different stroke weights; search/chevron use Main color darker, action icons use Grey 3.
- Export bbox of stroked icons includes stroke bleed (18 vs 16 node box; hands 20x18 vs 18x16) — size the SVG at its export size, not the node size.

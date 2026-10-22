# ENIGMA X (trading app) — Foundations harvest (Figma file `3PpdEgLKQZaybhyIILCfUF`)

Read-only extraction. Canonical page = **final** (`16:1909`). Values are quoted exactly as stored in Figma (hex is the 0-255 rounding of the stored 0-1 floats; alpha is exact). "(visual estimate)" = read from a screenshot only. Counts are over the whole `final` page (Dashboard `16:1910` + all 12 component sets + `Union 86`), walking into instances (so one component used 4x counts 4x). The OLD `enigma-x\design-system\` is wrong and ignored; the AUTH system is untouched.

---
## 1. PAGE INVENTORY

File has exactly 2 pages: `16:1909 final`, `0:1 drafts`. No local variables, no text styles, no effect styles (0/0/0). 15 local paint styles (section 2).

### 1.1 Page `final` (16:1909) — CURRENT / canonical
| id | name | type | x,y (canvas) | w x h | children | what / judgement |
|---|---|---|---|---|---|---|
| 16:1910 | Dashboard | FRAME | -574,54 | 1920 x 1080 | 7 | The one canonical screen (light theme). Fill `Grey 0` #F7F8F8. See 5.3. CURRENT |
| 58:84 | Union 86 | VECTOR | -835,733 | 40 x 40 | 0 | ENIGMA hexagon-maze **mark only**, fill `Main color darker` #3DBFBF. (The full wordmark logo is the 163x40 vector `16:2388` inside the header.) CURRENT |
| 56:123 | Select | COMPONENT_SET | -1848,269 | 188 x 164 | 2 | variants `label`(148x52) / `no label`(148x32). CURRENT |
| 56:135 | Input with 2 text | COMPONENT_SET | -1440,269 | 188 x 164 | 2 | label / no label. CURRENT |
| 56:145 | Input | COMPONENT_SET | -1236,269 | 188 x 164 | 2 | label / no label. CURRENT |
| 56:153 | Search | COMPONENT_SET | -1644,269 | 188 x 164 | 2 | label / no label. CURRENT |
| 56:165 | Checkbox | COMPONENT_SET | -2030,269 | 160 x 236 | 6 | selected / not selected / disabled 2 (= not-selected disabled) / all / disabled all / disabled. CURRENT |
| 56:188 | Button Outline | COMPONENT_SET | -1707,712 | 125 x 124 | 2 | Default / hover. CURRENT |
| 56:193 | Button | COMPONENT_SET | -1848,712 | 125 x 124 | 2 | Default / hover. CURRENT |
| 56:198 | Button black | COMPONENT_SET | -1566,711 | 125 x 124 | 2 | Default / Variant2. CURRENT |
| 56:203 | tabs | COMPONENT_SET | -1425,711 | 231 x 124 | 2 | variants `1` / `2` (which side is selected). CURRENT |
| 56:214 | input with tabs | COMPONENT_SET | -1026,266 | 284 x 288 | 4 | 1 label / 2 label / 1 no label / 2 no label. CURRENT |
| 56:225 | refresh | COMPONENT_SET | -1150,704 | 70 x 120 | 2 | icon button Default / hover. CURRENT |
| 56:230 | filter | COMPONENT_SET | -1062,701 | 72 x 124 | 2 | icon button Default / Variant2 (= hover bg). CURRENT |
| 56:235 | hands | COMPONENT_SET | -971,701 | 72 x 124 | 2 | icon button Default / Variant2 (= hover bg). CURRENT |

All 12 component sets carry a Figma-editor dashed border (#9747FF, #8A38F5 on Checkbox; radius 5; 1px INSIDE dash 10,5) — that is editor chrome, **not** design; ignore.

### 1.2 Page `drafts` (0:1) — OBSOLETE / evidence
| id | name | type | w x h | children | judgement |
|---|---|---|---|---|---|
| 1:1949 | `https://uat.primeassets.app/ - ... 23/07/2026, 16:36:24 GMT+3` | SECTION | 2120 x 1104.01 | 1 (`1:3` "1920w default" FRAME 1920x904.01 at 100,100) | Web-to-Figma **capture of the live UAT app** (dark theme). Supporting evidence only (1.3). |
| 19:692 | Dashboard | FRAME | 1920 x 1080 | 7 | **Exact duplicate** of final Dashboard (structural+visual signature hash identical: names, sizes, fills, strokes, radii, text, font sizes). OBSOLETE copy. |
| 12:1631 | Background | FRAME | 945.33 x 406 | 1 (Container 945.33x400) | Crop of the TradingView chart from the live app (candles + toolbar `1m 30m 1h`, `Indicators`; Bitstamp BTC/USD). Reference only. |
| 6:6 | "26,216" | TEXT | 116 x 51 | – | Loose text: Geist Mono Medium 32, fill #2B2B2B (not a style). Leftover of an older Spot Trader (BID 26,216 / ASK 26,231). OBSOLETE. |
| 3:3 | image 1 | RECTANGLE | 726 x 954 | – | IMAGE-fill reference of an **older light Spot Trader panel**: title `Spot Trader`, `BTC-USD` select + `Qty 1.0000 BTC`, red/green tiles `26,216 .289` / `26,231 .709`, spread chip `44.812`, `Slippage 10 bps` + `Type FOK`, `Position 26,216.289 BTC` + gradient-teal `CLOSE` button, table `Qty/Bid/Offer` (0.001, 1). Features not in the final Dashboard: a "Position ... CLOSE" row, FOK type, Qty/Bid/Offer 3-col with qty-first. (visual estimate) OBSOLETE visual. |
| 9:2 | Frame 1 | FRAME | 230 x 120 | 0 | Empty white frame. Junk. |
| 9:430 | Select | INSTANCE | 148 x 52 | 2 | Stray instance of Select. Junk. |
| 9:391, 9:415, 10:23, 10:49, 11:18, 11:105, 11:108, 11:120, 11:248, 11:428, 12:198, 12:285, 12:326 | Select, Input with 2 text, Input, Search, Checkbox, Button Outline, Button, Button black, tabs, input with tabs, refresh, filter, hands | COMPONENT_SET | same sizes as final | same | Older duplicates of the 13 final sets (final ids 56:xxx). **12 of 13 have identical visual signatures** to final; **Checkbox differs** — drafts checked box bg `#005268`, check `#FFFFFF`, border `#A8B6CD`, disabled `#7C8DAC` / check `#E5E7EC` (old palette) vs final `Main color` #7AEFEF + black check, border `Grey 2`. Use final. |

### 1.3 Live-app capture `1:1949` / `1:3` — supporting evidence only (NOT canonical)
Screenshot description (visual estimate): a **dark theme** app (page bg ~#2B2B2B family) at 1920 wide. Top bar 56px (`Container` 1920x56.01): ENIGMA logo left, green `UAT` pill (centre), teal-bordered `Exposure $5,000,000` field, `Thu, 23 July 2026 / 13:30:29 (UTC +00:00) v1.0.2` and a grey avatar. Ticker strip with ~18 cells (BTC-USD, ETH-USD, BTC-EUR, ETH-EUR, USDT-USD, USDT-EUR, SOL-USD, SHIB-USD, **MATIC-USD with a red circular "!" alert badge and a missing/dark coin**, ADA-USD, AVAX-USD, XLM-USD, then repeats). Left column: red BID tile `61,349 .29000000`, green ASK tile `61,447 .52000000`, spread chip `98.23`, Instrument/Quantity row with floating labels, Slippage/Type row (`MKT` select), BID/Qty/ASK table, then RFQ panel (SELL | BUY segmented, instrument + `0.0001` qty with orange `BTC` / grey `USD` currency tabs, teal `Request For Quote`). Centre: `SPOT BALANCES` (grey title, orange refresh icon, Asset/Quantity, 5 rows, all green) and a **TradingView candlestick chart panel** (toolbar `1m 30m 1h`, bars/candles/area, `+`, `Indicators`, camera; OHLC `Bitcoin / U.S. Dollar - 1 - Bitstamp`, volume, price axis 64,900-65,700, time axis 11:15-13:30). Bottom: `TRADES BLOTTER` (teal underline active) / `BALANCE MOVEMENT`, orange refresh, filter, handshake icons; columns Id, Order Id, **Status**, Instrument, Order Type, Time In Force, Side, Quantity, Executed Price, User, Channel, Executed At; ~20 data rows (row pitch 37.17px from the `Button - filled` 24x24 nodes at y 833.83, 871, 908.17...), Limit badge = dark purple bg, Market badge = dark teal bg, some prices suffixed ` *` (e.g. `138.00 *`, `0.91 *`), timestamps suffixed `*`.

Node stats of `1:3`: 1137 FRAME, 375 TEXT, 125 VECTOR, 65 RECTANGLE, 5 GROUP; 4 IMAGE fills (890x332, 54x332, 890x28, 54x28 = chart canvas bitmaps). Fonts in the capture are browser fallbacks, not the design fonts: `Inter` Semi Bold 11 (113), Inter Regular 11 (92), `Trebuchet MS` 12-16 (TradingView), Inter Semi Bold 13 (21) — so **Geist is not what the live UAT app currently renders**; the owner's rule makes Figma `final` canonical. Capture solid fills (top): #2B2B2B x41, #DBDBDB x23, #0FC286 x22 (live green), #FFFFFF x19, #244443 x16, #0F0F0F x10, #3F3F3F x7, #3B225C x5 (dark Limit badge), #2E2E2E x5, #2B2B2B@0.5 x5, #F7931A x5 (BTC), #39E2C9 x4 (RFQ button teal), #3D3D3D x4, #4A4A4A x3, #F23645 x2 + #22AB94@0.2 (TradingView), #FF8D1C x3 (orange refresh/BTC tab). Dark-theme and chart colours are NOT in the Figma styles.

**UI patterns in the capture that the final Dashboard lacks:** (1) the actual chart widget (final `Chart` panel `16:1978` is an empty white 952x392 card with only the title); (2) a dark theme; (3) the `Status` column header text (final has the status-dot column but no header label); (4) ticker error badge (MATIC-USD "!") and a coin-less fallback; (5) 20-row scrolling blotter vs 8 rows; (6) ` *` suffix on stale/indicative prices; (7) orange used for refresh icons and the selected currency tab (final uses `Grey 3` for refresh icons and `Orange` only for the selected `BTC` tab); (8) `Position ... CLOSE` row (older design `3:3`).

---
## 2. COLOUR

### 2.1 The 15 local paint styles (exact)
All are SOLID, no variables bound. Usage = nodes on `final` (fill/stroke/text-fill) incl. instance internals.

| Style name | style id | stored float RGB | hex | alpha | usage (all) | role |
|---|---|---|---|---|---|---|
| White | `S:c1e7f7a6e991b255091b8a80fab6115049bb3400,` | 1, 1, 1 | #FFFFFF | 1 | fill 17 (all Dashboard) | Panel/card surfaces (`Frame 1000000920 16:1911`, `16:1954`, `16:1978`, `16:1981`, `16:2124`), header bar (`16:2386`), ticker bar (`16:2133`), odd table rows (`16:1938`, `16:1946`, `16:2004`), spread chip `Background 16:1927`, input fill in components (unstyled #FFFFFF on 4 sets) |
| Grey 0 | `S:1f63525eadf949479234a525eea6848a33acbf02,` | 0.96808, 0.97081, 0.97276 | #F7F8F8 | 1 | fill 27, stroke 20 | Page bg (`Dashboard 16:1910`), table container bg (`16:1932`, `16:1958`, `16:1990`; even rows show through = zebra), input/select field bg (`Select I16:1915;10:36`), tabs track (`tabs 16:2127`); **strokes**: table container 1px OUTSIDE (`16:1932`), ticker cell divider (`16:2135`, 1px right only INSIDE, x16), checkbox border-state |
| Grey 1 | `S:9f733ffd91bf0285075d3e3a0e580ecf68563aba,` | 0.87143, 0.90910, 0.92793 | #DEE8ED | 1 | fill 4, stroke 1 | Icon-button hover bg (`refresh/Property 1=hover 56:228`, `filter/Variant2 56:233`, `hands/Variant2 56:238`), avatar disc (`Frame 1000000948 16:2402`), header date/clock divider (right 1px, `Frame 1000000946 16:2396`) |
| Grey 2 | `S:69030562164f83e0976a7f35be61358d0b2a5b35,` | 0.65882, 0.74346, 0.80392 | #A8BECD | 1 | text 60, stroke 2 | Tertiary text: field labels (`Instrument 16:... I16:1915;10:35`), table column headers (`BID 16:1934`, `Id 16:1993`), date `Thu, 23 July 2026 16:2398`, `v1.0.2 16:2401`, trailing `.00`/`00` decimals (`16:1945`, `16:2014`), time part of timestamps; checkbox unchecked border (`Frame 1000000909 56:171`) |
| Grey 3 | `S:2881711a5448f331f79787c9c063f1c11d244737,` | 0.48627, 0.61176, 0.67451 | #7C9CAC | 1 | text 25, stroke 10, fill 2 | Secondary text/icons: units (`BTC`, `bps`), inactive tab labels (`BALANCE MOVEMENT 16:1985`, `SELL I16:2127;11:251`, `Exposure 16:2393`), date part of timestamps (`16:2018`), disabled checkbox text; icon strokes 1.5 (`refresh`, `filter`, `hands` vectors); disabled checkbox fill (`56:181`) |
| Main color | `S:adc47a5580f36d6003c2e855c87b90b2142f4102,` | 0.47708, 0.93910, 0.93910 | #7AEFEF | 1 | fill 10, stroke 2, text 2 | Primary CTA fill (`Button 16:2132` REQUEST FOR QUOTE, `Button/Default 56:194`), selected checkbox fill (`56:167`), active tab fill (`tabs 56:205`, `input with tabs` selected), Button black border + label (`56:201`, `56:200`) |
| Main color hover | `S:bbf4527b9cd426364e6992f4eb84b2c00e51afc7,` | 0.69087, 0.97756, 0.96323 | #B0F9F6 | 1 | fill 1 | `Button/hover 56:196` fill only |
| Main color transp | `S:743f2536178cc997b85ad7558686d4dd3fa3ee8b,` | 0.47843, 0.93725, 0.93725 | #7AEFEF | **0.20000000298** | fill 2 | Environment pill `UAT` (`Button 16:2389`), `Button Outline/hover 56:191` |
| Main color darker | `S:f0f99670c2f28b4c45b9b5648a702cba02cf4b5c,` | 0.23867, 0.74840, 0.74840 | #3DBFBF | 1 | stroke 7, fill 2 | Logo (`Union 86 16:2388`, `58:84`), lucide search/chevron strokes in Select/Search (`I16:1915;10:45`, `56:129`, `56:158`) |
| Red | `S:feeee471b6aea579469f91e691f0125b475fe7cf,` | 0.98237, 0.58722, 0.59380 | #FB9697 | 1 | fill 1 | **BID tile** (`Button 16:1920`, 188x100, r8) |
| Red for text | `S:f54eb719a0e8c4c38039bc7a3e38f91d26ccb31c,` | 0.89904, 0.40774, 0.41592 | #E5686A | 1 | text 38, fill 4 | Negative/bid/sell: order-book bid prices (`16:1939`), negative balances, ticker negative change (`16:2154`), `SELL` text (`16:2013`), danger status dot (`Vector 16:2020`) |
| green | `S:45d5d5549f90b9bfdcbaedb18335121f819c5d55,` | 0.54557, 0.93269, 0.78429 | #8BEEC8 | 1 | fill 2 | **ASK tile** (`Button 16:1923`) and selected **BUY** segment (`Button I16:2127;11:252`) |
| green for text | `S:817cc9bb6d2e80f516045f76109e745aef3707cb,` | 0.30116, 0.79968, 0.60858 | #4DCC9B | 1 | text 15, fill 4, stroke 1 | Positive/ask/buy: ask prices (`16:1941`), positive balances, ticker positive change, `BUY` text, success dot (`Vector 16:2005`), Exposure pill border (`Button 16:2392`) |
| Black | `S:c1c6dbd354c766e3dffd494088d1e01a0ab93417,` | 0, 0, 0 | #000000 | 1 | text 136, stroke 5, fill 2 | Primary text (all values, titles), checkbox check stroke (`56:168`), active-tab underline (`Frame 1000000953 19:126`, bottom 1.5 INSIDE), Button Outline border, Button black fill (`56:199`) |
| Orange | `S:cd61336bf190df953b65d5a1e39de2f7f4607ba8,` | 1, 0.69207, 0.31570 | #FFB051 | 1 | fill 1 | Selected `BTC` currency tab in `input with tabs` (`Button I16:2131;11:418;11:367`, 39x32) |

Note: the OLD `enigma-x\design-system` mis-mapped these (called Grey 2 "text secondary" and Grey 3 "text primary"). Correct: Grey 2 #A8BECD = tertiary/labels/headers; Grey 3 #7C9CAC = secondary/inactive/icons; primary text = Black #000000.

### 2.2 Semantic roles seen in the layout
- Text: primary Black; secondary Grey 3; tertiary Grey 2; positive green for text; negative Red for text; on-black Main color.
- Surfaces: page Grey 0; cards White; fields Grey 0; table zebra = White rows over Grey 0 container; hover icon button Grey 1; avatar Grey 1.
- Brand: Main color (CTA), Main color darker (logo, field icons), Main color transp (env pill), Main color hover (CTA hover).
- Trading tiles: BID tile `Red` #FB9697, ASK tile `green` #8BEEC8 (pastel fills; the saturated `... for text` pair is for text/dots).
- Warning/other: Orange only on the selected BTC currency tab.

### 2.3 Raw colours NOT bound to a style (on `final`)
| value | count | where | role |
|---|---|---|---|
| #9236F2 (text) | 4 | `Limit 16:2011` | **Limit** order-type badge text |
| #E4CAFF (fill) | 4 | `Frame 1000000926 16:2010` (76x24, r16) | Limit badge bg |
| #3A77F2 (text) | 4 | `Market 16:2026` | **Market** badge text |
| #CADCFF (fill) | 4 | `Frame 1000000926 16:2025` (88x24, r16) | Market badge bg |
| #4DCC9B @0.2 fill | 1 | `Button 16:2392` | Exposure pill tint = `green for text` at 20% (not a style; border is the style) |
| #FFFFFF vector fill | 17 | coin glyph vectors (e.g. `16:2143`) | glyph white on coin discs |
| #3D5092 | 4 | ETH disc (`16:2137`, `16:2173`, `16:2302`, `16:2338`) | coin colour |
| #F7931A | 2 | BTC disc `16:2159` | coin colour |
| #009393 | 4 | USDT disc `16:2195` | coin colour |
| #000000 (unstyled, box) | 2 | SOL disc `16:2223`, XLM disc `16:2288` | coin colour |
| #FC1E1F | 1 | SHIB disc `16:2240` | coin colour |
| #246DD3 | 1 | ADA disc `16:2260` | coin colour |
| #E84142 | 1 | AVAX disc `16:2274` | coin colour |
| ETH glyph tints #E7F0FF, #A5B9EE, #A5B8F0, #687FCB, #A8B9EF, #E8F1FF (x4 each); SHIB #EB9A2E, #FEFFF7, #EAEAE8, #000000 | – | coin vectors | coin art |
| SOL gradients (3 linear): `#6E73E3 0, #41B8C8 .32, #27E2B7 .58, #16FC99 1`; `#9E48FF 0, #8D4DF9 .34, #6B7AE1 .57, #45B3CE .95`; `#8654F3 0, #549AD6 .47, #26D9B2 .93` | 1 each | `16:2225-2227` | only gradients in the file |
| #9747FF / #8A38F5 strokes | 12 / 1 | component-set frames | Figma editor chrome — ignore |
| #FFFFFF (box, unstyled) | 4 | component sets Select/Input with 2 text/Input/Search backing frames | editor chrome canvas of sets |

No opacity < 1 on any node (only paint-level alpha on the 3 items above). No blend modes. No effects.

---
## 3. TYPE SCALE

Fonts: **Geist** (Regular, Medium, SemiBold) and **Geist Mono** (Regular, Medium, SemiBold). No DM Sans anywhere. **Line height is `AUTO` on every text node** (no px/% anywhere). Resulting hug heights observed: 12px -> 16, 14px -> 18, 20px -> 26, 32px -> 42 (so ~1.3x; 16px nodes report stale heights 10-11, treat 16 -> ~21 (visual estimate)). Letter spacing 0 everywhere (stored `0%` or `0px`, equivalent) except avatar initials `YH` = **2px**. textCase `UPPER` only on panel titles/tab titles and BID/ASK tile digits (source strings are mixed-case, e.g. `Spot balances`, `trades blotter`). textDecoration: NONE everywhere.

Every distinct (family+style | size | line-height | letter-spacing | case | decoration | colour) tuple (n = text segments):

| # | family style | size | lh | ls | case | colour (style) | n | role / samples (id) |
|---|---|---|---|---|---|---|---|---|
| 1 | Geist Medium | 12 | auto | 0% | – | #000000 (Black) | 73 | Blotter body cells (`UAT-TRD-000... 16:2006`, `BTC-USD 16:2008`, `GTC 16:2012`, price `60,943.75 16:2015`, user, channel), button labels in Button/Button Outline/input-with-tabs |
| 2 | Geist Regular | 12 | auto | 0% | – | #A8BECD (Grey 2) | 33 | Field labels (`Instrument`, `Quantity`, `Slippage`, `Type`, `Label`), date line `Thu, 23 July 2026`, `v1.0.2` |
| 3 | Geist Mono Regular | 12 | auto | 0% | – | #E5686A (Red for text) | 26 | Ticker negative change (`−36.30 16:2154`, `(−1.88%) 16:2156`) |
| 4 | Geist Regular | 12 | auto | 0% | – | #000000 (Black) | 23 | Input/select values (`BTC-USD I16:1915;10:37`, `1`, `MKT`), checkbox labels |
| 5 | Geist Regular | 12 | auto | 0% | – | #7C9CAC (Grey 3) | 20 | Unit suffix (`BTC`, `bps`), timestamp date part `2026/07/22 16:2018`, disabled checkbox label, `abc` |
| 6 | Geist Regular | 12 | auto | **0px** | – | #A8BECD (Grey 2) | 13 | Blotter column headers (`Id 16:1993`, `Order Id`, `Executed At`...) |
| 7 | Geist Mono SemiBold | 14 | auto | 0% | – | #000000 | 13 | Ticker price (`1,897.0 16:2151`, `64,988`) |
| 8 | Geist Medium | 14 | auto | 0% | – | #000000 | 9 | Spot-balances asset names (`USD 16:1964`, right-aligned), tabs text |
| 9 | Geist Medium | 12 | auto | 0% | – | #A8BECD | 8 | Dimmed `00` decimals in blotter Quantity (`1.` black + `00` grey; `16:2014`) |
| 10 | Geist Mono Medium | 14 | auto | 0% | – | #4DCC9B (green for text) | 7 | ASK prices (`61,447.52 16:1941`) and positive balances |
| 11 | Geist Mono Medium | 14 | auto | 0% | – | #E5686A | 6 | BID prices (`61,349.29 16:1939`), negative balances |
| 12 | Geist Regular | **20** | auto | 0% | UPPER | #000000 | 5 | Panel/tab titles: `Spot Trader 16:1913`, `Spot balances 16:1956`, `Chart 16:1980`, `RFQ`, `trades blotter 16:1984` |
| 13 | Geist Regular | 14 | auto | **0px** | – | #A8BECD | 5 | Order-book / balances table headers (`BID 16:1934`, `Qty`, `ASK`, `Asset`, `Quantity`) |
| 14 | Geist Mono Regular | 14 | auto | 0% | – | #000000 | 4 | Order-book quantity column (`1`, `10`, `100`, `1000`; centred) |
| 15 | Geist Medium | 12 | auto | 0% | – | #9236F2 (raw) | 4 | `Limit` badge |
| 16 | Geist Medium | 12 | auto | 0% | – | #E5686A | 4 | `SELL` cell (`16:2013`) |
| 17 | Geist Medium | 12 | auto | 0% | – | #3A77F2 (raw) | 4 | `Market` badge |
| 18 | Geist Medium | 12 | auto | 0% | – | #4DCC9B | 4 | `BUY` cell (`16:2028`) |
| 19 | Geist Regular | 14 | auto | 0% | – | #7C9CAC | 4 | Tab/segment inactive labels (`SELL I16:2127;11:251`, `Option 56:208`), `Exposure 16:2393` |
| 20 | Geist Mono Regular | 12 | auto | 0% | – | #4DCC9B | 4 | Ticker positive change (`+0.00 16:2218`, `(+0.27%) 16:2220`) |
| 21 | Geist Mono Regular | **32** | auto | 0% | UPPER | #000000 | 2 | BID/ASK tile big digits (`61,349 16:1921`, `61,447 16:1924`) |
| 22 | Geist Mono Regular | 14 | auto | 0% | UPPER | #000000 | 2 | Tile decimals (`.29000000 16:1922`, `.52000000 16:1925`) |
| 23 | Geist Mono SemiBold | 14 | auto | 0% | – | #E5686A | 2 | Ticker price when red (`76.63 16:2232`, `0.181840 16:2294`) |
| 24 | Geist Medium | 12 | auto | 0% | – | #7AEFEF (Main color) | 2 | Button black label (`56:200`) |
| 25 | Geist Mono Regular | 16 | auto | 0% | – | #000000 | 1 | Spread chip `98.23 16:1928` |
| 26 | Geist Mono Medium | 14 | auto | 0% | – | #A8BECD | 1 | Dimmed `.00` of ASK price (`16:1945`) |
| 27 | Geist Regular | 20 | auto | 0% | UPPER | #7C9CAC | 1 | Inactive tab title `BALANCE MOVEMENT 16:1985` |
| 28 | Geist Medium | 16 | auto | 0% | – | #000000 | 1 | Env pill `UAT 16:2390` |
| 29 | Geist SemiBold | 14 | auto | 0% | – | #000000 | 1 | Exposure value `$5,000,000 16:2394` |
| 30 | Geist Regular | 12 | auto | 0px | – | #000000 | 1 | Clock `13:30:29 (UTC +00:00) 16:2400` |
| 31 | Geist Regular | 14 | auto | **2px** | – | #000000 | 1 | Avatar initials `YH 16:2403` |
| (drafts) | Geist Mono Medium | 32 | auto | – | – | #2B2B2B | 1 | stray `26,216 6:6` (obsolete) |

Mixed-colour text: blotter Quantity `1.`+`00` (Black/Grey 2, both Geist Medium 12); ASK price `61,477`+`.00` (green for text / Grey 2, Geist Mono Medium 14); timestamp `2026/07/22` (Grey 3) + ` 13:44:30*` (Grey 2), Geist Regular 12. **Rule: trailing zeros/time part are dimmed to Grey 2.**

**Geist vs Geist Mono rules (observed):** Geist Mono = ticker price/change, BID/ASK tile digits, spread chip, order-book prices (Medium 14, coloured by side) and quantities (Regular 14), spot-balance quantities (Medium 14, coloured by sign). Geist (proportional) = all labels, titles, buttons, input values, **and all blotter cells including numeric price/quantity/timestamp** (so blotter numerics are NOT mono in Figma — an inconsistency vs the order book). Weights: Regular for labels/values, Medium for table body/buttons/badges, SemiBold for ticker price & Exposure value.

---
## 4. RADII / STROKES / SHADOWS / EFFECTS / OPACITY

**Radii** (corner radius, count): `4` x61 — every control: Select/Input/Search/Buttons/tabs track/icon buttons (`Select I16:1915;10:36`, `refresh 16:1957`, `filter 16:1988`, Button `16:2389`, `16:2392`); `8` x11 — panels/cards, header bar, BID/ASK tiles, table containers (`Frame 1000000920 16:1911`, `Button 16:1920`, `16:1932`, `16:2386`); `16` x23 — order-type badge pills 24px tall (`16:2010`) and coin discs 18x18 (`16:2137`; effectively circular since 16 > 9); `24` x1 — avatar 40x40 disc (`16:2402`, effectively circle); `2` x6 — checkbox box 16x16 (`56:167`); `5` x13 — editor chrome on component sets (ignore); `[8,8,0,0]` x1 — spread chip `Background 16:1927` (top corners only, sits on the tile seam). No corner smoothing used.

**Strokes** (weight / align / colour): `1.5 CENTER` x14 icon glyphs (refresh/filter/hands, checkbox check; round cap+join; Grey 3 / Black); `1 CENTER` x4 lucide search glyph (Main color darker); `1.2 CENTER` x3 lucide chevron-down (Main color darker); `1 INSIDE` x6 boxes (Exposure pill `16:2392` green for text; Button Outline default/hover black `56:189`, `56:191`; checkbox box Grey 2 `56:171`); `1 OUTSIDE` x4 table containers (Grey 0) and Button black (Main color); `top0 right1 bottom0 left0 INSIDE` x16 ticker cell right divider (Grey 0, `16:2135`); same right-only 1px Grey 1 on header clock block (`16:2396`); `bottom 1.5 INSIDE` Black active tab underline (`19:126`); `1 INSIDE dash 10,5` x13 editor chrome (ignore).

**Shadows / effects:** none. 0 effect styles, 0 nodes with DROP_SHADOW/INNER_SHADOW/BLUR on `final`. Elevation is expressed only by white cards on Grey 0 page. **Opacity:** no node opacity < 1. **Gradients:** only SOL coin art.
**Clip content:** 66 frames clip (Dashboard, selects, lucide icon frames, tabs, ticker).

---
## 5. SPACING & GRID

### 5.1 Auto-layout tuples (top ~40; dir = H/V, gap, padding [T,R,B,L], main/cross align; n; where)
| tuple | n | where |
|---|---|---|
| V gap0 pad[0,0,0,0] | 65 | table bodies, ticker text columns |
| V gap4 pad0 | 23 | label+control stacks in Select/Input/Search (label 16 + gap 4 + 32 = 52) |
| H gap8 pad0 MIN/CENTER | 21 | ticker coin+symbol (`16:2136`), checkbox rows |
| V gap4 pad[12,16,12,16] | 15 | ticker cell (`16:2135`, 80 high) |
| H gap0 pad0 CENTER/CENTER | 15 | coin disc (18x18) |
| V gap0 CENTER/MIN | 15 | ticker symbol container |
| H gap4 pad0 | 15 | ticker change pair |
| H gap8 pad[7,24,7,24] CENTER/CENTER | 12 | Buttons (86x32 / 196x40 / 392x40) |
| H gap0 pad0 MIN/CENTER | 11 | tab rows |
| H gap8 pad[7,8,7,8] CENTER/CENTER | 10 | input-with-tabs tab buttons |
| H gap98 pad[12,12,12,12] SPACE_BETWEEN | 8 | blotter row (1360x40) |
| V gap10 pad[0,30,0,30] CENTER | 8 | badge cell wrapper (117x16) |
| H gap10 pad[0,24,0,24] CENTER | 8 | badge pill (76x24 / 88x24) |
| H gap0 pad[7,12,7,12] MIN/CENTER | 7 | Input fields |
| H gap16 pad0 | 5 | form rows (`16:1914`, tiles container) |
| H gap-106 pad0 | 5 | input-with-tabs overlap (value field under tabs) |
| V gap16 pad[16,24,24,24] | 4 | panels (`16:1911`, `16:1954`, `16:1978`, `16:2124`) |
| H gap8 pad[7,8,7,8] MIN/CENTER | 4 | search select |
| H gap32 pad[7,12,7,12] SPACE_BETWEEN | 4 | Input with 2 text |
| H gap10 pad[7,7,7,7] CENTER | 4 | icon buttons 32x32 |
| H gap10 pad0 MIN/CENTER | 3 | panel title row |
| H gap32 pad[7,8,7,12] SPACE_BETWEEN | 3 | Select (chevron) |
| H gap85-119 pad[12,24,12,24] / [8,24,8,24] SPACE_BETWEEN | 3+3+2+2+2 | order-book/balance rows (42) and header (34) — gap numbers are computed leftovers of SPACE_BETWEEN, **not tokens** |
| H gap10 pad[0,24,12,24] CENTER | 2 | tab cell (`19:126`, 214x38) |
| V gap-36 pad0 | 1 | BID/ASK tiles + spread chip overlap (`16:1918`) |
| V gap4 pad[12,12,12,12] | 1+1 | BID/ASK tile (188x100) |
| V gap8 pad[16,24,24,24] | 1 | blotter panel (`16:1981`) |
| V gap48 pad0 | 1 | RFQ form (`16:2128`) |
| H gap119 pad[8,12,8,12] | 1 | blotter header row (1360x32) |
| H gap0 pad[11,36,11,36] | 1 | spread chip (120x32) |
| H gap271 pad[16,24,16,24] SPACE_BETWEEN | 1 | header bar (1872x72) |
| V gap8 pad0 | 1 | `Frame 1000000921 16:1917` |

Real spacing scale in use: **4, 8, 10, 12, 16, 24** (+ control vertical padding 7, spread chip 11/36, badge wrapper 30, 48 form gap, 32 two-item gap). Control padding: 7 (V) x 8/12/24 (H).

### 5.2 Fixed control sizes (final)
Select/Input/Search/Input-2-text: component `148x32` (no label) / `148x52` (label 16 + gap 4 + 32); on Dashboard `188x32` / `188x52`. Buttons: component `86x32`; Dashboard `392x40` (RFQ), `196x40` (BUY/SELL segment), `220x40` (UAT pill), `255x40` (Exposure). tabs: component `184x40`, Dashboard `392x40` (each half 196x40). input with tabs: `244x32` / `244x52`; tab buttons 54x32, 53x32, 39x32 (BTC), 107x32 track. Icon buttons `32x32` r4 pad 7 (glyph 16x16, hands 18x16). Checkbox `16x16` r2, row `120x16` gap 8. Badge pills `76x24` (Limit) / `88x24` (Market) r16. Avatar `40x40` r24. Coin disc `18x18`. Status dot `6.67x6.67`. Lucide icons `16x16`. BID/ASK tile `188x100` r8 pad 12 gap 4, spread chip `120x32`. Table header row 34 (order book/balances, pad 8/24) and 32 (blotter, pad 8/12); body rows 42 (order book/balances, pad 12/24) and 40 (blotter, pad 12/12). Ticker cell height 80 (pad 12/16), widths hug: 130 / 138 / 159. Logo `163x40` (mark `40x40`).

### 5.3 Dashboard geometry — `16:1910` (1920x1080, fill Grey 0; coordinates relative to Dashboard)
| id | name | x | y | w | h | fill | layout | notes |
|---|---|---|---|---|---|---|---|---|
| 16:2386 | Frame 1000000951 (header/nav) | 24 | 16 | 1872 | 72 | White, r8 | H gap271 pad[16,24,16,24] SPACE_BETWEEN | 3 children: logo `16:2387` (SVG frame 528x40, vector 163x40), UAT pill `16:2389` (220x40 at x826), right group `16:2391` (528x40 at x1320: Exposure 255x40, date/clock 216x40, avatar 40x40) |
| 16:2133 | Frame 1000000944 (ticker bar) | 0 | 104 | 1920 | 80 | White | clip | inner `16:2134` x-60, w2040, 15 cells (ETH-USD 138, BTC-USD 159, ETH-EUR 138, USDT-USD 130, USDT-EUR 130, SOL-USD 130, SHIB-USD 130, ADA-USD 130, AVAX-USD 130, XLM-USD 130, then ETH-USD, BTC-USD, ETH-EUR, USDT-USD, USDT-EUR repeat) — marquee, overflows both sides |
| 16:1911 | Frame 1000000920 (**Spot Trader**) | 24 | 200 | 440 | 528 | White, r8 | V gap16 pad[16,24,24,24] | children: title row 392x26 (y16), instrument/qty row 392x52 (y58), tiles block 392x160 `16:1917` (y126, V gap8: tiles+spread chip 392x100 `16:1918` [tiles overlap-stacked gap-36, chip 392x32 at y68] + Slippage/Type row 392x52 at y108), order-book table 392x202 (y302, Grey 0, r8) |
| 16:1954 | Frame 1000000922 (**Spot Balances**) | 480 | 200 | 440 | 392 | White, r8 | V gap16 pad[16,24,24,24] | title row 392x32 (y16, with refresh 32x32 at right), table 392x244 (y64, Grey 0, r8: header 34 + 5 rows x 42) |
| 16:1978 | Frame 1000000952 (**Chart**) | 936 | 200 | 952 | 392 | White, r8 | V gap16 pad[16,24,24,24] | title row 904x26 only; **empty body** |
| 16:1981 | Frame 1000000923 (**Trades Blotter**) | 480 | 608 | 1408 | 438 | White, r8 | V gap8 pad[16,24,24,24] | tab/title row 1360x38 (y16; tabs 214+255 wide, icon group 96x32 at x1264), table 1360x352 (y62, `16:1990`, Grey 0, r8, 1px OUTSIDE Grey 0 stroke; header 32 + 8 rows x 40, odd rows White) |
| 16:2124 | Frame 1000000921 (**RFQ**) | 24 | 744 | 440 | 278 | White, r8 | V gap16 pad[16,24,24,24] | title row 392x26 (y16), `tabs` instance 392x40 (y58, SELL | BUY), form 392x140 (y114, V gap48: instrument + qty/currency row, REQUEST FOR QUOTE 392x40) |

Grid facts: left margin 24; column gutter 16 (464->480, 920->936); right edge of panels 1888 (right margin 32) but header ends at 1896 (margin 24) — inconsistent by 8px in Figma; vertical: header 16-88, gap 16, ticker 104-184, gap 16, panels from 200; Spot Trader 200-728, RFQ 744-1022 (bottom margin 58), blotter 608-1046 (bottom margin 34). Columns: 440 / 440 / 952 (top row), blotter spans 1408 (=440+16+952). All panels share r8, White, pad 16/24/24/24, internal gap 16 (8 on blotter), title = Geist Regular 20 UPPER.

---
## 6. GAPS (searched for, not present in Figma `final`/`drafts`)
Searched node names (regex modal|toast|dialog|popup|tooltip|error|focus|disabled|hover|active|pressed|loading|skeleton|empty|otp|mobile|dark|menu|dropdown|badge|chip|scroll|notification|alert|sheet|drawer|pagination|spinner) on both pages: only `hover` (3), `disabled`/`disabled 2`/`disabled all` (checkbox) found.
- **Not drawn:** focus states (Select/Input/Search/input-with-tabs), error/invalid, filled vs empty distinction beyond default, disabled input/select/button, pressed/active; Select open state (dropdown list); row hover/selected in tables; sortable header indicators; scrollbar; pagination; empty/loading/skeleton; toast/snackbar; modal/dialog/confirm; tooltip; RFQ quote/countdown result state; error/offline ticker state (only in live capture: MATIC "!"); order-type badges other than Limit/Market; status dots other than success/danger; badge/chip component (badge exists only as raw frames `16:2010`, not a component).
- **Hover only for:** Button, Button Outline, icon buttons (`refresh` hover; `filter`/`hands` `Variant2` presumed hover = Grey 1 bg), Button black (`Variant2` presumed hover). Tabs have `1`/`2` (selected side) only.
- **Whole-system:** dark theme (exists in live app capture, not in Figma styles), mobile/responsive, OTP/auth screens (separate AUTH system), motion/transition specs, elevation/shadows, z-index, text styles, variables/tokens, typography ramp names, icon set beyond the 5 UI glyphs, the chart itself, coin set beyond 8 coins.
- **Inconsistencies noted:** blotter numerics proportional Geist vs order book mono; panel right margin 32 vs header 24; selected currency tab Orange vs Main color elsewhere; lucide icons at stroke 1 / 1.2 vs custom icons 1.5; Spot Balances/Order book header text 14px vs blotter header 12px; letter-spacing stored as `0px` on some headers vs `0%` elsewhere (equivalent); Frame names are auto (`Frame 1000000xxx`), coin frames all named `XTVCBTC.svg`.

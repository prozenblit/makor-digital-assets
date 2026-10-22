# ENIGMA X — Dashboard screen spec (Figma file 3PpdEgLKQZaybhyIILCfUF)

Source of truth: page "final" 16:1909, frame "Dashboard" 16:1910 (1920x1080, fill Grey 0 #F7F8F8, clipsContent, no layout grid, no layout mode: top-level children are absolutely placed). Extracted read-only with the Plugin API; every value below is a literal API read unless marked "(visual estimate)".
Conventions: `Style` = paint style name; "auto LH" = lineHeight AUTO (every text node on the Dashboard is AUTO line-height); letter-spacing 0 unless stated. NO text styles exist on the Dashboard (textStyleId empty on all nodes) — type is applied raw (family/style/size). Fonts used: Geist Regular / Medium / SemiBold, Geist Mono Regular / Medium / SemiBold. No effects (shadows) anywhere on the Dashboard; no gradients; no image fills. Cards have NO border and NO shadow.
U+2212 (true minus "−") is used in negative ticker numbers and percentages (not ASCII hyphen) — "−1,095.00 (−1.66%)". Balances table uses ASCII "-" ("-12.50").

## 1. Screen geometry (1920x1080, x/y absolute in Dashboard)

| Pattern | id | x | y | w | h | fill / radius |
|---|---|---|---|---|---|---|
| Canvas | 16:1910 | | | 1920 | 1080 | Grey 0 #F7F8F8 |
| Top nav (floating) | 16:2386 | 24 | 16 | 1872 | 72 | White, r8 |
| Ticker strip | 16:2133 | 0 | 104 | 1920 | 80 | White, r0, clip (full-bleed) |
| Spot Trader panel | 16:1911 | 24 | 200 | 440 | 528 | White, r8 |
| RFQ panel | 16:2124 | 24 | 744 | 440 | 278 | White, r8 |
| Spot balances panel | 16:1954 | 480 | 200 | 440 | 392 | White, r8 |
| Chart panel | 16:1978 | 936 | 200 | 952 | 392 | White, r8 |
| Trades blotter panel | 16:1981 | 480 | 608 | 1408 | 438 | White, r8 |

Gutters/margins: left margin 24; nav right margin 24 (24+1872=1896); nav->ticker gap 16 (88->104); ticker->panels gap 16 (184->200); column gutters 16 (464->480, 920->936); row gap 16 (592->608, 728->744); panel columns end at x=1888 (right margin 32, i.e. 8px narrower than nav's 1896); bottom: RFQ ends y=1022 (58 to canvas bottom), Trades ends y=1046 (34 to bottom) -> left and right column bottoms are NOT aligned (RFQ 24px shorter). Column widths: 440 / 440 / 952 over top row; trades spans 480..1888 (=440+16+952).
Panels have NO clipping (clip false) and auto-layout: vertical, padding T16 R24 B24 L24, itemSpacing 16 (Trades: 8), align MIN/MIN. Panel title row = H frame (gap 10, CENTER cross), height 26 (Trades 38; Balances 32 because of the refresh button).

## 2. Typography observed (raw, no styles)

| Role | Font | Size | Colour (Style) | Notes |
|---|---|---|---|---|
| Panel title | Geist Regular | 20 | #000000 (Black) | textCase UPPER (stored text "Spot Trader", "Spot balances", "Chart", "RFQ", "trades blotter", "BALANCE MOVEMENT"); renders uppercase; auto LH -> 26px box |
| Field label | Geist Regular | 12 | #A8BECD (Grey 2) | 16px box, fills width |
| Field value | Geist Regular | 12 | #000000 | greyed value = Grey 2 (Slippage "2") |
| Field suffix/unit ("BTC","bps") | Geist Regular | 12 | #7C9CAC (Grey 3) | |
| Big price (tile) | Geist Mono Regular | 32 | #000000 | textCase UPPER; 42px box |
| Tile decimals | Geist Mono Regular | 14 | #000000 | textCase UPPER; 18px box |
| Spread value | Geist Mono Regular | 16 | #000000 | centred |
| Book/table header (Book, Balances) | Geist Regular | 14 | #A8BECD (Grey 2) | NOT uppercase (textCase ORIGINAL), letterSpacing 0px, 18px box |
| Trades table header | Geist Regular | 12 | #A8BECD (Grey 2) | NOT uppercase, ls 0px, 16px box, centre aligned |
| Book price (bid/ask) | Geist Mono Medium | 14 | bid #E5686A (Red for text) / ask #4DCC9B (green for text) | right aligned fixed-width 76 |
| Book qty | Geist Mono Regular | 14 | #000000 | centred |
| Balance asset | Geist Medium | 14 | #000000 | |
| Balance qty | Geist Mono Medium | 14 | +#4DCC9B / negative #E5686A | right |
| Trades cell | Geist Medium | 12 | #000000 | centre; Side coloured |
| Trades timestamp | Geist Regular | 12 | date #7C9CAC (Grey 3), " HH:MM:SS*" #A8BECD (Grey 2) | two text segments |
| Ticker symbol | Geist Regular | 12 | #000000 | |
| Ticker price | Geist Mono SemiBold | 14 | #000000 (or #E5686A on SOL-USD and XLM-USD) | |
| Ticker change | Geist Mono Regular | 12 | #E5686A negative / #4DCC9B positive | abs and (pct) separate text nodes, gap 4 |
| Tab labels (trades) | Geist Regular | 20 | active #000000 / inactive #7C9CAC | UPPER |
| Button label (RFQ) | Geist Medium | 14 | #000000 | UPPERCASE typed in text ("REQUEST FOR QUOTE") |
| Nav env/UAT | Geist Medium | 16 | #000000 | |
| Nav exposure label / value | Regular 14 Grey 3 / SemiBold 14 Black | | | |
| Nav date | Geist Regular | 12 | #A8BECD (date, version) / #000000 (time) | right aligned |
| Avatar initials | Geist Regular | 14 | #000000 | letterSpacing 2px |

## 3. Top nav (16:2386)
- Frame 1872x72 at (24,16), fill White (Style White), radius 8, NO stroke/shadow. Auto-layout H, itemSpacing 271, padding T16 R24 B16 L24, primary SPACE_BETWEEN, cross CENTER. Three children:
  1. Logo frame "SVG" 16:2387: 528x40 FIXED, clip; contains VECTOR "Union 86" 16:2388 163x40 at (0,0), fill #3DBFBF (Style "Main color darker"), 2 vector paths (maze mark + "ENIGMA" wordmark in one compound vector). A standalone copy 58:84 (40x40, mark only, fill #3DBFBF, 2 paths) sits on the page canvas next to the component sets.
  2. Environment button 16:2389 "Button" 220x40 at x826 (frame centre = canvas 960), fill #7AEFEF@0.2 (Style "Main color transp"), radius 4, no stroke, H gap 8 padding 7/24/7/24 CENTER/CENTER, clip. Text "UAT" Geist Medium 16 #000000. (Non-interactive status chip; no hover drawn.)
  3. Right cluster 16:2391: H gap 1, hug (528x40):
     - Exposure button 16:2392: 255x40, fill #4DCC9B@0.2, stroke #4DCC9B (Style "green for text") 1px INSIDE, radius 4, H gap 8 padding 7/24/7/24 SPACE_BETWEEN CENTER, clip. Text "Exposure" Regular 14 #7C9CAC (Grey 3); text "$5,000,000" SemiBold 14 #000000 (Geist, not Mono).
     - Date/user group 16:2395: H gap 16, hug (272x40):
       - Date block 16:2396: 216x40, no fill, stroke #DEE8ED (Style Grey 1) weights top0/right1/bottom0/left0 INSIDE (i.e. 1px right divider), V gap 4 padding 0/16/0/16, primary CENTER, cross MAX (right aligned). Row 1: "Thu, 23 July 2026" Regular 12 #A8BECD right aligned (frame 184x16, H gap 10). Row 2 (H gap 4): "13:30:29 (UTC +00:00)" Regular 12 #000000 + "v1.0.2" Regular 12 #A8BECD.
       - Avatar 16:2402: 40x40, fill #DEE8ED (Style Grey 1), radius 24 (circle, since 24>20), V CENTER/CENTER, clip. Text "YH" Regular 14 #000000, letterSpacing 2px. No icon, no menu chevron, no dropdown drawn.
- No nav menu items, no tabs, no notifications, no logout drawn.

## 4. Ticker strip (16:2133 / inner 16:2134)
- Strip 1920x80 White, clip. Inner "Frame 1000000943" 16:2134: x=-60, width 2040, H auto-layout gap 0, MIN/CENTER, clip, 15 cells (marquee: cells repeat — ETH-USD, BTC-USD, ETH-EUR, USDT-USD, USDT-EUR, SOL-USD, SHIB-USD, ADA-USD, AVAX-USD, XLM-USD, then ETH-USD, BTC-USD, ETH-EUR, USDT-USD, USDT-EUR); the first cell is cut off by the -60 offset (animated scroll implied; no animation prototype read).
- Cell (e.g. 16:2135): V auto-layout, itemSpacing 4, padding T12 R16 B12 L16, MIN/MIN, hug width, h80. Fill none; stroke #F7F8F8 (Style "Grey 0") weights T0 R1 B0 L0 INSIDE (1px right divider; very low contrast). Widths are content-hugging: 138 (ETH-USD/ETH-EUR), 159 (BTC-USD), 130 (USDT-*, SOL, SHIB, ADA, AVAX, XLM). x offsets: 0,138,297,435,565,695,825,955,1085,1215,1345,1483,1642,1780,1910.
  - Row 1 "Container": H gap 8, CENTER, h18: coin icon 18x18 circle (radius 16 -> circle), then label V container with symbol text.
  - Row 2 (34 high, V gap 0): price container (18 high) with Geist Mono SemiBold 14; change row H gap 4, h16: two text containers (abs change, "(pct)") Geist Mono Regular 12, both same colour.
  - So vertical = 12 + 18 + 4 + 34 + 12 = 80.
- Coin icons (18x18 frame, radius 16, clip, fill = coin brand colour, white glyph vectors; file names "XTVCBTC.svg" — TradingView-style asset): ETH #3D5092 (8 stacked vectors #E7F0FF/#A5B9EE/#A5B8F0/#687FCB/#FFFFFF/#A8B9EF/#E8F1FF/#FFFFFF), BTC #F7931A (white glyph), USDT #009393, SOL #000000, SHIB #FC1E1F, ADA #246DD3, AVAX #E84142, XLM #000000. These are raster-free vector icons, not style-bound.
- Data variants: negative = abs and pct both #E5686A; positive (USDT-EUR) = "+0.00" "(+0.27%)" #4DCC9B; price colour is Black by default but #E5686A on SOL-USD (76.63) and XLM-USD (0.181840) (price tinted red, values -1.32/-1.69% and -0.01/-2.98%). "0.00000416" SHIB shown unabbreviated. All negatives in the sample are red; USDT-USD "−0.00 (−0.01%)" red.
- No hover/selected state, no separators other than the right 1px Grey 0 stroke.

## 5. Spot Trader panel (16:1911, 440x528)
Auto-layout V gap 16, padding T16 R24 B24 L24. Children (y within panel): title row 16:1912 (y16 392x26, "Spot Trader" 20 UPPER); instrument/qty row 16:1914 (y58 392x52, H gap 16: two 188x52 INSTANCES); tile group 16:1917 (y126 392x160); slippage/type row 16:1929 inside group; order book 16:1932 (y302 392x202).
- Row 16:1914: instance "Search" 16:1915 (component set Search, variant `Property 1=label`, 188x52: V gap 4: label 16h + Select frame 32h; label "Instrument" Regular 12 Grey 2; field fill #F7F8F8 (Grey 0) radius 4 H gap 8 padding 7/8/7/8; lucide/search icon 16x16 (vector 10x10 at 3,3, stroke #3DBFBF Style "Main color darker", 1px); value "BTC-USD" Regular 12 Black). Instance "Input with 2 text" 16:1916 (variant label; label "Quantity"; field fill Grey 0 r4 H gap 32 padding 7/12/7/12 SPACE_BETWEEN: value "1" Black 12, unit "BTC" Grey 3 12).
- Tile group 16:1917: V gap 8, 392x160. Child 16:1918 "Frame 1000000918": V auto-layout itemSpacing **-36**, 392x100: Container 16:1919 H gap 16 (tiles) + spread tab frame 16:1926 (392x32 at y68, V CENTER/CENTER) -> spread tab overlaps the bottom of the tiles, centred horizontally.
  - BID tile 16:1920 "Button": 188x100, fill #FB9697 (Style "Red"), radius 8, V gap 4 padding 12/12/12/12, MIN/MIN (left aligned). Texts: "61,349" Geist Mono Regular 32 #000000 UPPER (164x42, FILL width, left); ".29000000" Mono Regular 14 #000000 UPPER (decimals, left).
  - BUY/ASK tile 16:1923: 188x100, fill #8BEEC8 (Style "green"), radius 8, same padding, cross-axis MAX: "61,447" Mono 32 right aligned; ".52000000" Mono 14 right aligned (hug 76x18, x100). Tiles have NO stroke, NO shadow, solid fills. Label word BID/SELL/ASK is NOT drawn on the tiles (price only).
  - Spread tab "Background" 16:1927: 120x32, fill #FFFFFF (Style White), per-corner radius 8/8/0/0 (top corners only), H padding T11 R36 B11 L36, CENTER/CENTER; text "98.23" Mono Regular 16 #000000 centred. Sits at x136 within 392 (centre). The white tab visually "cuts" into the tiles from the bottom (it is the same white as the panel behind).
- Slippage/Type row 16:1929: H gap 16, MIN/CENTER, 392x52, y108. Instance "Input with 2 text" 16:1930: label "Slippage", value "2" in **Grey 2 #A8BECD** (greyed/placeholder-like value), unit "bps" Grey 3. Instance "Select" 16:1931 (variant label): label "Type", value "MKT" Black 12, chevron-down 16x16 (vector 8x4, stroke #3DBFBF 1.2) at right, field padding 7/8/7/12 gap 32 SPACE_BETWEEN.
- Order book 16:1932: 392x202, fill #F7F8F8 (Grey 0), stroke #F7F8F8 (Grey 0) 1px OUTSIDE, radius 8, V gap 0, FIXED-width/HUG-height, **no clip**. Header 16:1933: 392x34, H padding T8 R24 B8 L24, SPACE_BETWEEN, texts BID (left) / Qty (centre) / ASK (right) each 114.67x18 FILL, Regular 14 Grey 2, ls 0px. Rows (16:1938, 1942, 1946, 1950): 392x42 each, H padding 12/24/12/24 SPACE_BETWEEN CENTER; row fills alternate: row1 White (Style White), row2 none (shows Grey 0), row3 White, row4 none -> zebra = Grey 0 container + white on odd rows. Cells: bid price Mono Medium 14 #E5686A (Style "Red for text") right aligned w76; qty Mono Regular 14 #000000 centred (w auto); ask price Mono Medium 14 #4DCC9B (Style "green for text") right aligned w76. Greyed decimals example: row2 ask "61,477.00" has 2 segments "61,477" #4DCC9B + ".00" #A8BECD (Grey 2). Data: 61,349.29 / 1 / 61,447.52; 61,319.82 / 10 / 61,477.00; 61,290.34 / 100 / 61,506.47; 61,260.87 / 1000 / 61,535.94. Row height 42 (note: 40 in trades table, 42 in book and balances).
- No order-depth bars, no live-price flash, no scrollbar drawn.

## 6. RFQ panel (16:2124, 440x278)
V gap 16, padding 16/24/24/24. Title 16:2125 "RFQ" 20 UPPER (y16, 392x26). Tabs instance 16:2127 "tabs" variant `Property 1=2` (component set tabs 11:249): 392x40 at y58, fill #F7F8F8 (Grey 0), radius 4, H gap 0; two Buttons 196x40 each radius 4, padding 7/24/7/24, text Regular 14: left "SELL" inactive: no fill, text #7C9CAC (Grey 3); right "BUY" active: fill #8BEEC8 (Style "green"), text Geist Medium 14 #000000. (Active SELL variant colour not drawn on the Dashboard; set contains variants "Button | Button" with property 1=2 only here.)
Form 16:2128: V gap 48, 392x140 at y114: row 16:2129 H gap 16, 392x52: Search instance 16:2130 (132x52, label "Instrument", value "BTC-USD"); "input with tabs" instance 16:2131 (244x52, variant `1 label`, label "Quantity"): field 244x32 fill Grey 0 r4 padding 7/12/7/12, value "0.0001" Regular 12 Black; overlay tabs frame 80x32 at right (x164) H gap 0 radius 4: Button "BTC" 39x32 active fill #FFB051 (Style Orange) radius 4 padding 7/8 text Geist Medium 12 #000000; Button "USD" 41x32 inactive no fill text Regular 12 #7C9CAC. Container gap -106 (tabs overlap the input). Then primary Button 16:2132 (variant Default, 392x40, fill #7AEFEF Style "Main color", radius 4, padding 7/24, text "REQUEST FOR QUOTE" Medium 14 Black centred; no stroke). Space between the row (52) and the button = 48.

## 7. Spot balances panel (16:1954, 440x392)
V gap 16 padding 16/24/24/24. Header 16:1955 (392x32, H SPACE_BETWEEN CENTER, gap 10): title "Spot balances" 20 UPPER (y3); refresh instance 16:1957 (component set refresh, `Property 1=Default`): 32x32 radius 4, padding 7, icon vector 16x16 stroke #7C9CAC (Grey 3) 1.5, no fill (hover variant exists in the set).
Table 16:1958: y64, 392x244, fill Grey 0, stroke Grey 0 1px OUTSIDE, radius 8, V gap 0. Header 16:1959: 392x34, padding 8/24/8/24 SPACE_BETWEEN; "Asset" (left) / "Quantity" (right) Regular 14 #A8BECD, each 172x18 FILL. Rows 42 each (padding 12/24), zebra: rows 1,3,5 fill White, rows 2,4 none: USD 2,500,000.00 (green #4DCC9B), EUR 1,800,000.00 (green), BTC -12.50 (red #E5686A), ETH -240.00 (red), SOL 5,000.00 (green). Asset code Geist Medium 14 Black (hugs, effectively left); quantity Geist Mono Medium 14. Positive = green, negative = red; no +/- sign on positives. Panel bottom has ~60px empty space (table ends y=308+... panel 392).

## 8. Chart panel (16:1978, 952x392)
V gap 16 padding 16/24/24/24, only the title "Chart" (20 UPPER, 66x26). **No chart is drawn** (empty white card, no toolbar, no axes, no legend). The Drafts page keeps a raster capture of the live TradingView-style chart (12:1631 "Background" 945x406, dark theme: toolbar "1m 30m 1h | bar style | indicators | camera", "Bitcoin / U.S. Dollar · 1 · Bitstamp" OHLC legend, candles red/green, volume bars, price axis, time axis 11:15..13:30, TradingView logo, green last-price tag "65,029", "Vol BTC 3" legend). Named sub-frames: "Button menu - Chart interval", "Button menu - Bar's style", "Button dialog - Compare symbols", "Button menu - Take a snapshot" (1:1063/1:1091/1:1099/1:1118 and 12:1656/1681/1689/1707).

## 9. Trades blotter panel (16:1981, 1408x438)
V gap **8** padding 16/24/24/24. 
- Top row 16:1982: 1360x38, H gap 10 SPACE_BETWEEN CENTER. Left tabs group 16:1983 (1264x38, H gap 0): tab 1 19:126 "Frame 1000000953" 214x38 H padding T0 R24 B12 L24 CENTER/CENTER gap 10, **active underline**: stroke #000000 (Style Black) only bottom 1.5px INSIDE (weights 0/0/1.5/0), text "trades blotter" Regular 20 #000000 UPPER; tab 2 19:127 "Frame 1000000954" 255x38 no stroke, text "BALANCE MOVEMENT" Regular 20 #7C9CAC (Grey 3) UPPER. Tabs are plain frames (not the "tabs" component). Right action cluster 16:1986: 96x32 at x1264 y3, H gap 0: refresh 16:1987 / filter 16:1988 / hands 16:1989 instances, each 32x32 radius 4 (hands icon vector 18x16, refresh/filter 16x16), stroke #7C9CAC 1.5.
- Table 16:1990: y62, 1360x352, fill Grey 0, stroke Grey 0 1px OUTSIDE, radius 8, V gap 0, no clip. Header 16:1991: 1360x32, H padding T8 R12 B8 L12, SPACE_BETWEEN CENTER (gap shown 119 is irrelevant); header text Regular **12** #A8BECD, NOT uppercase, ls 0px, centre aligned, 16h. 8 body rows at 40h.
- Columns (same in header and rows; x within 1360-wide row): [status dot 6.67x6.67 at x12, y vertical centre (rows y16.67)]; Id 140 FIXED (x18.67); Order Id 140 FIXED (x158.67); Instrument FILL ~113.2 (x298.67); Order Type chip wrapper 117 FIXED (x411.86; header label cell is a FILL 113.67 -> ~0.5px column drift between header and row); Time In Force FILL (x528.86); Side FILL (x642.05); Quantity FILL (x755.24); Executed Price FILL (x868.43); User FILL (x981.62); Channel FILL (x1094.81); Executed At 140 FIXED (x1208, right ends at 1348 = 1360-12). All body cells centre-aligned. Header: Id, Order Id, Instrument, Order Type, Time In Force, Side, Quantity, Executed Price, User, Channel, Executed At (11 labels + hidden dot placeholder).
- Header status dot placeholder: VECTOR 6.67x6.67 with fill #0FC286 **visible:false** (not rendered; header has no "Status" label on the Dashboard — the live capture does have a "Status" column header).
- Rows 40h, H padding 12/12/12/12, SPACE_BETWEEN CENTER. Zebra: odd rows fill #FFFFFF (Style White), even rows explicit fill #F7F8F8 (Style Grey 0) (rows 16:2004/2034/2064/2094 white; 16:2019/2049/2079/2109 grey). 
- Status dot: VECTOR (circle) 6.6667x6.6667; green #4DCC9B (Style "green for text") on Limit/SELL rows (odd), red #E5686A (Style "Red for text") on Market/BUY rows (even). Meaning of colours is not labelled.
- Cell text: Geist Medium 12 Black: Id "UAT-TRD-000..." and Order Id "UAT-ORD-000..." (truncated with a literal "..."; node names are the full "UAT-TRD-000001 ... "), Instrument "BTC-USD", TIF GTC/FOK, User "uat_trader_1", Channel "UAT", Price "60,943.75". Side: "SELL" #E5686A / "BUY" #4DCC9B (Medium 12, text only, no chip). Quantity: "1.00" / "2.00" as two segments: "1." #000000 + "00" #A8BECD (Grey 2) = greyed decimals. Executed At: Geist Regular 12, "2026/07/22" #7C9CAC (Grey 3) + " 13:44:30*" #A8BECD (Grey 2) (asterisk suffix in the text).
- Order-type chips (inside wrapper frame 117x16, V CENTER/CENTER padding 0/30/0/30; chip overflows the 16h wrapper by 4px each side): chip H auto-layout hug, h24, padding 0/24/0/24, CENTER/CENTER gap 10, **radius 16**, no stroke. Limit chip: 76x24 fill #E4CAFF, text "Limit" Geist Medium 12 #9236F2 (28px text). Market chip: 88x24 fill #CADCFF, text "Market" Geist Medium 12 #3A77F2. These four colours are NOT bound to any paint style (not among the 15 styles). Order type Limit rows have TIF GTC + SELL; Market rows have FOK + BUY (sample data pairing).
- Sort affordance: none drawn (no arrows). Filter/refresh/hands icons in the header cluster only. No row hover/selected state, no pagination, no scrollbar, no empty/loading state.

## 10. Repeated sub-patterns
1. Card = White fill, radius 8, padding 16/24/24/24, gap 16, no border/shadow.
2. Panel title = Geist Regular 20 UPPER Black.
3. Data table (3 instances: book, balances, trades): container Grey 0 fill + 1px OUTSIDE Grey 0 stroke + radius 8; header row no fill, text Grey 2, sentence case; body zebra with White on odd rows and Grey 0 (explicit or transparent) on even rows; row padding 12 (V) and 24 (H) (book/balances) / 12 (trades); value font Mono for numbers.
4. Label+field 52x: label Grey 2 12px, gap 4, field 32h Grey 0 r4 (component instances).
5. Green/red semantics: text #4DCC9B/#E5686A; solid tiles #8BEEC8/#FB9697; dot #4DCC9B/#E5686A; active tab fill #8BEEC8; zebra Grey 0.
6. 32x32 icon buttons radius 4, Grey 3 stroke 1.5.
7. Greyed decimal convention: integer part in value colour, ".00"/trailing in Grey 2.

## 11. Final vs drafts Dashboard
Drafts Dashboard 19:692 (page 0:1, x -885 y 1490) vs final 16:1910: full-tree compare of 538 nodes (type, x, y, w, h, visibility, fills, strokes, radius, text characters/font/size, layout mode/gap/padding) -> **identical**; the only difference is canvas position. Final is canonical. The drafts page additionally holds: the component sets (duplicates of final's, different ids 9:391 Select, 9:415 Input with 2 text, 10:23 Input, 10:49 Search, 11:18 Checkbox, 11:105/11:108/11:120 buttons, 11:248 tabs, 11:428 input with tabs, 12:198 refresh, 12:285 filter, 12:326 hands), 12:1631 chart raster capture (dark), 3:3 "image 1" 726x954 (older raster of a Spot Trader design: title "Spot Trader" sentence case, BTC-USD select + "Qty" inline field, bid tile #F4A9AE-ish / offer tile teal #6FDDC4-ish, spread tab "44.812", Slippage/Type row, "Position 26,216.289 BTC" + gradient "CLOSE" button, Qty/Bid/Offer table with 0.001/1 rows, bid red/offer teal text — an earlier iteration, visual estimate), 6:6 text "26,216" 116x51, 9:2 "Frame 1" 230x120 (tiny raster), 9:430 stray Select instance.

## 12. Live-app capture evidence (drafts page SECTION 1:1949 "https://uat.primeassets.app/ ... 23/07/2026 16:36:24 GMT+3", 2120x1104; contains FRAME "1920w default" 1:3 (1920x904) at (100,100)) — visual only, DARK theme
The capture is the same screen in a DARK theme (near-black #1e1e1e-like surfaces, white/grey text, teal accents), at 1920x904. Patterns present in the live app that the final Dashboard lacks or shows differently (candidates for EXTENDED components / dark theme tokens):
- A dark theme (background ~#1e1e1e, cards ~#2a2a2a (visual estimate), green #0FC286-like environment and BUY tile, red BID tile).
- Live TradingView chart in the Chart card: toolbar (interval 1m/30m/1h with dropdown, bar-style buttons, chart-type dropdown, compare "+" , "Indicators", snapshot camera), symbol legend with OHLC, volume pane, price/time axes, last-price tag, scale-reset icon.
- Trades blotter has a "Status" column (header label "Status", dot beside it) and many more rows/pairs (BTC-USD, ETH-USD, SOL-EUR, USDC-EUR, BTC-EUR, XRP-USD...), executed-price "*" asterisk after prices ("138.00 *", "0.91 *", "0.58 *"); Limit/Market chips are green-tinted in dark theme (purple "Limit", green "Market"); the active tab uses a teal text + teal underline.
- Ticker shows a stale/error instrument: "MATIC-USD" with a red "!" badge and no price; includes a TradingView-style logo at the strip's right edge; coin icon set includes SOL, SHIB, ADA, AVAX, XLM; also BTC-EUR (57,125.32 / -794.81 -1.37%).
- Balances table in the live app shows "12.50 / 240.00" (no minus sign, all green) vs Figma's negative red values.
- Avatar: generic person silhouette icon in a circle (Figma uses initials "YH").
- Trader panel: Instrument/Qty field labels sit tiny (10px-ish) above fields; no extra position/close row visible.
- Nav: "UAT" environment is a solid green button (Figma: light teal tint), Exposure button teal outline.

## 13. GAPS (searched; not drawn on the final page)
Searched node names on both pages for hover/focus/error/empty/loading/toast/modal/otp/mobile/disabled/pressed/dialog/popup/tooltip/scroll/skeleton/confirm/login/dropdown/menu. Found only: component-set variants hover/disabled (Checkbox, Buttons, refresh) and drafts frames "Button menu/dialog - Chart interval / Bar's style / Compare symbols / Take a snapshot" (chart toolbar rasters). NOT drawn: hover/focus/error/empty/loading states for the Dashboard panels, toast, modal, order confirmation, RFQ quote/countdown screen, position/close row, login, OTP, mobile/tablet layouts, scrollbars, sortable-column arrows, pagination, dropdown menus (Select open state), tooltip, chart itself (final page), user menu, status-dot legend, the "Balance movement" tab content, filter popover, hands (counterparty) popover, SELL-active RFQ variant on the dashboard, negative/positive flash on prices, dark theme tokens.

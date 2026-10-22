# Equity Derivatives Auction — Auction screens + App shell (Figma harvest)

Source: Figma file `vtP9aj7XLJ292TjETXmrum`, page "final" `48:1021`, SECTION "Section2" `1033:172`.
All values read via the Plugin API (read-only). `{name}` = bound Figma variable. "(visual estimate)" = read from screenshot only.
Font everywhere: **Lato Regular** (only weight used), line-height AUTO, letter-spacing 0. No Figma text styles / effect styles / paint styles are used (textStyleId and fillStyleId are empty); everything is raw font props + variable-bound fills.

## 0. Screens covered

| Screen | Node | Size |
|---|---|---|
| New Auction (Trade Auction + modal over blurred overlay) | `261:2135` | 1440x1024 |
| Trade Auction (live auction, aggregate + global order book) | `189:1104` | 1440x1024 |
| Client Auctions (old) | `273:211` | 1440x1024 |
| Client Auctions (newer, with Audit Log) | `1008:687` | 1920x1080 |
| New lever added + partial fill | `273:1162` | 1440x1024 |
| Acution Freeze time | `273:1405` | 1440x1024 |
| Acution Summary | `273:1559` | 1440x1024 |

The other Section2 frames (Log In `131:720`, New Client `170:729`, Edit Client `282:2538`, External Traders `282:1709`/`282:2180`, Internal User `282:2349`, Clients `282:2059`) belong to another harvester.
Reusable components (button, button with arrow, dropdown, text input, time, check, date, Table Header) live on page **"drafts"** (see section 12).

## 1. Colour tokens as bound in these screens (variable → value)

| Variable | Hex | Used for |
|---|---|---|
| bg | #18181C | page; global-order-book card; text on red/green buttons; input wells (EFP inputs); shadow colour on menu/banners |
| bg medium | #22222C | instrument cards, table wells (Audit Log body), modal instrument table, tooltip shadow colour, EFP toggle half |
| bg lighter | #2D2E3B | sidebar, session cards, modal, banners, Audit Log header, zebra rows |
| grey dark | #373746 | controls (dropdown, text input, time, date), table dividers, disabled instrument-Cancel fill, cancel-menu fill, unchecked checkbox |
| grey medium | #5B5D72 | table header text, placeholders "0", disabled text, session-card header rule (1440 version), disabled session Cancel fill, modal header rule |
| grey light | #9597AD | secondary text ("View as:", "min size: N", Aggregate Book label), icons (nav doc, avatar, chevrons), frozen values, disabled session-Cancel text |
| white | #F8F7FF | primary text, active nav icon, white "Cancel" button |
| blue | #7590FF | page title, "Time Left" label, minimize icon stroke, checked checkbox, ENTER action, plus icon, calendar/download icons |
| blue transparent 15 | #383D58 (opaque) | minimize-icon tile, Time Left chip, download button fill |
| blue transparent 60 | #7590FF @ 0.6 | sidebar logo fill; focused-input stroke |
| green | #3FF3C0 | Start Now / Confirm buttons, "in the mix" check, own-order highlight stroke, matched-order text, BID |
| green dark | #264142 (opaque) | "in the mix" tooltip fill |
| red | #FF6565 | Cancel Auction / session Cancel button fill, instrument Cancel text, row-cancel X icons, Reject, ASK, 00:00 chip stroke |
| red transparent | #432C35 (opaque) | instrument-level Cancel dropdown fill |
| red error | #FF7553 | validation stroke, validation tooltip text + warn icon |
| red error transparent | #4E3234 (opaque) | validation tooltip fill; frozen "Time Left 00:15" chip fill |
| orange | #FF982A | "Starting in" label, Start In button, MODIFY, partial-fill matched text |
| orange transparent | #4C3E3D (opaque) | "Starting in" chip fill, Start In button fill |
| yellow | #FFCE53 | partial-fill cell stroke, tooltip text, icon |
| yellow transparent | #4E4134 (opaque) | "Partially in the fill" tooltip fill |
| blue-green | #71E7FF | "New Auction" button outline/text, "Cash Close" type label, "New level…" notice text |
| blue-green transparent | #374A58 (opaque, NOT variable-bound in some uses) | new-level row highlight, Cash Close toggle selected fill |
| purple | #B694FF | "Equilibrium Price:" label, EFP type label, EXECUTION |

Unbound literals found: equilibrium chip fill `#B694FF @0.2` (Client/lever/freeze/summary screens) and `#A494FF @0.3` (Trade Auction aggregate book); Cash Close toggle `#374A58` and its text `#71E7FF` in modal (no var shown); all lines use stroke grey dark unless stated.

## 2. Global metrics

- Radius: controls/buttons/inputs/chips/tooltips **4**; table wells/instrument cards/session cards/modal/Audit Log **8**; notification banners **6**; checkbox **2**; sidebar top-right **24** (only TR corner).
- Type scale used: 20 (page title), 18 (modal title), 16 ("Auctions" page heading, "Audit Log", Upload File), 14 (body, table cells, buttons, chips), 12 (type subtitle, "min size", tooltips, "Orders matched:" label, Audit table).
- Control height 32 everywhere (buttons, inputs, chips, dropdown). Table title bar 40; table cell row 32 + 1px divider.
- Shadows (all DROP_SHADOW, spread 0, colour alpha 1, colour is a bound variable): cancel menu `x-2 y4 blur6 #18181C {bg}`; banners `x-2 y4 blur8 #18181C {bg}`; tooltips `x-2 y4 blur8 #22222C {bg medium}`. Overlay: BACKGROUND_BLUR radius 12.

## 3. App shell (identical on every screen)

### 3.1 Sidebar — Frame 1 (`189:1325`, `261:2356`, `273:432`, `1008:688` …)
- 64 x full height (1024 or 1080), x=0,y=0; fill {bg lighter} #2D2E3B; radii TL0 TR24 BR0 BL0; clips content.
- Logo `Path 1852` VECTOR 40x32 at (12,20), fill {blue transparent 60} #7590FF@0.6. SVG in Appendix A.
- Nav icon 1 "Union" (bank/institution) 24x24 at (20,92), fill {white} #F8F7FF — the active item on Auctions screens.
- Nav icon 2 "Union" (document list) 24x24 at (20,148), fill {grey light} #9597AD. Pitch between icons 56. (Inactive = grey light; active = white. No active background pill, no labels, icon-only.)
- Avatar `Group` 32x32 at (16, H-64) (960 on 1024, 1016 on 1080) i.e. 32px above bottom; fill {grey light}. Circle outline + head/shoulders, SVG in Appendix A.
- No border/divider on sidebar's right edge; separation is by the fill only.

### 3.2 Title bar / header
- Page title text "Equity Derivatives Auction": 235x24 at (80,24), Lato 20, fill {blue} #7590FF.
- Header rule `Line 6`: y=61, from x=80 to x=W-24 (1336 long on 1440, 1816 on 1920), stroke 1px {grey dark} #373746 centred on the line.
- Section heading "Auctions": 64x19 at (80,82), Lato 16, {white}.
- Content grid: left margin 80 (= 64 sidebar + 16), right margin 24, first content row y=117 (cards) / y=73 (right-side action row).
- "View as:" label (`189:1324`) 51x17 at (1232,20), 14, {grey light}; dropdown `189:1342` 117x32 at (1299,13): instance of `dropdown`, fill {grey dark}, r4, pad T10 R12 B10 L12, gap 40, text "Myself" {white} 14, chevron 11x6 {grey light} (SVG Appendix A). Group right edge = 1416.
- "New Auction" button (`189:1343`) 144x32 at (1272,73), right edge 1416: outline button — NO fill, stroke 1 {blue-green} #71E7FF INSIDE, r4, pad 6/32/6/32, gap 10, label "New Auction" 14 {blue-green}.
- There are no tabs and no breadcrumb in these screens (confirmed: no TAB/breadcrumb nodes in any of the 7 screens).

### 3.3 Header overlay-able slots
- Right slot at y=77 below the header rule: notification banners (section 8) right-aligned to x=1416.

## 4. Buttons (all instances of component set `button` `134:904` / `button with arrow` `134:907`)

Base: height 32, r4, auto-layout horizontal, pad T6 R32 B6 L32, gap 10, centre/centre, text Lato 14, width hugs. Component default variant has no fill (instances set fill).

| Use | Fill | Stroke | Text |
|---|---|---|---|
| Cancel Auction (`189:1257`) 157x32 | {red} #FF6565 | – | {bg} #18181C |
| Start Now / Confirm | {green} #3FF3C0 | – | {bg} |
| Cancel (modal) | {white} #F8F7FF | – | {bg} |
| Reject | none | 1 {red} INSIDE | {red} |
| Start In | {orange transparent} #4C3E3D | 1 {orange} INSIDE | {orange} |
| New Auction | none | 1 {blue-green} INSIDE | {blue-green} |
| disabled (component variant `Property 1=disabled`) | {grey medium} #5B5D72 | – | {grey light} |
| `Property 1=Variant3` (261:1922) | empty variant, same geometry (unused) | | |

"button with arrow": pad T6 R12 B6 L24, gap 8, 98x32 (hug), text "Cancel" + 12x12 frame containing chevron-down vector 8x4 stroke 1 (colour = text colour), positioned x=74,y=10 (default) → used for the session-card Cancel dropdown (red {red} fill/{bg} text; disabled variant `134:908` grey medium fill, grey light text/chevron).
Instrument-level Cancel dropdown is NOT the component; it's a custom frame (see 6.3).

## 5. Session card (auction)

### 5.1 Container — "Frame 14"/"Frame 15" (`189:650`, `273:704`, `273:1180`, `1008:705`…)
- Fill {bg lighter}, r8, clip, x=80. Width 795 (Client Auctions 1440), 855 (lever/freeze/summary — wider because of the 4th column), 1336 (Trade Auction), 795 (1920).
- Header height 56; header rule at y=56 (`Line 7`): 1440 Client Auctions → stroke {grey medium} #5B5D72; 1920 Client Auctions → {grey dark} #373746. Lever/freeze/summary/trade: {grey medium} (Trade `189:1256` is {grey medium}).
- Content padding: side 16, bottom 16; instrument cards start at y=68 (EFP card, 1920 cards) or y=72 (first card in `273:650` & lever/freeze/summary first card); gap between instrument cards 8 (Client/lever/freeze/summary). Trade Auction: tables start y=97 (after section labels at y=72), gap between tables 12, bottom pad 12.
- Vertical gap between session cards: 16 (1440: 117→588 for 455-high card = 16; 1920: 117, 323, 530 for 190-high = 16/17).

### 5.2 Header row (y=12, items 32 high, row 56)
- Collapse/minimize tile `lucide/minimize` 24x24 at (16,16): fill {blue transparent 15} #383D58, r4, icon = 4 corner brackets 10x10 stroke 1 {blue} (SVG Appendix A, 24x24 incl. tile).
- Title group `Group 106` at x=60 (114x31): name "European CC 26/6" 14 {white} at y=12 (h17); type subtitle at y=29: 12 {blue-green} "Cash Close" (58x14) | 12 {purple} "EFP" (21x14). In the 1920 version: name "European EFP 26/6", subtitle "Cash Close" at **14** (68x17), group 121x34.
- Timer chip (see 5.3), centred horizontally in the header on all 1440 screens ((cardW - chipW)/2: 322 @795, 353 @855, 350 @855 for 155 wide, 593 @1336). In 1920 version the chip is RIGHT-aligned (x=633, card right − 16 − 146).
- Session Cancel button "button with arrow" 98x32 at x = cardW − 16 − 98 (681 @795, 741 @855) — absent in the 1920 version. Trade Auction uses "Cancel Auction" 157x32 at x=1167 instead (right edge 1324, i.e. 12 from the card's right edge — not 16 like the 98px Cancel).

### 5.3 Timer chip states (`Frame 9`/`Frame 4`, height 32, hug width, r4, pad T16 R24 B16 L12, gap 16, text 14)
| State | Fill | Label | Value | Size seen |
|---|---|---|---|---|
| Time Left (running) `273:628` | {blue transparent 15} #383D58 | "Time Left:" {blue} | "03:32" {white} | 151x32 |
| Starting in `273:803` | {orange transparent} #4C3E3D | "Starting in:" {orange} | "04:59" {white} | 155x32 |
| Frozen / last seconds `273:1553` | {red error transparent} #4E3234 | "Time Left:" {red} #FF6565 | "00:15" {white} | 150x32 |
| Ended `273:1672` | none, stroke 1 {red} INSIDE | "Time Left:" {red} | "00:00" {white} | 150x32 |
| 1920 `1008:736` | {blue transparent 15} | "Time Left" (NO colon) {blue} | "04:59" | 146x32 |

### 5.4 Cancel (session) dropdown opened menu — `189:819` "Frame 13"
- 112x115 at (667,260) in card coords (directly below the instrument Cancel button, x aligned to it, y = 219 (card) + 40 + 1).
- Fill {grey dark} #373746, r4, shadow x-2 y4 blur6 #18181C {bg}. No dividers, no hover state drawn.
- 3 items as plain text 14 {white}, left x=16, y=16/49/82 (pitch 33): "All Bid", "All Ask", "All". Menu width equals the Cancel button width (112).

## 6. Instrument table card ("Frame 8/10/11", `273:572`, `273:640`, `273:674`…)

### 6.1 Frame
- W = cardW − 32 (763 in 795 cards, 823 in 855 cards); fill {bg medium} #22222C; r8; clip. Heights: 139 with two data rows (`273:572`), 106 with one data row.
- Rows: title bar 0–40 (height 40), divider `Line 8` at y=40; column header row y=41–73 (32), divider at y=73; data row 1 at y=74–106 (32), divider y=106; data row 2 y=107–139, divider y=139 (drawn at card edge). All dividers 1px {grey dark} #373746 centred on line, full width (823 long, clipped). No zebra, no row fill (except highlights below).
- Vertical dividers (from y=41 to bottom, rotated −90° lines): x=273 and x=557; and x=763 in 823-wide cards (4th "add level" column 763–823 = 60 wide). They stop at the card bottom (164 long when 2 rows, 65 when 1 row).
- Title bar contents: instrument name 14 {white} at (16,12); "min size: N" 12 {grey light} at (name right + 8, 14) (e.g. 183, 196, 173); right side: Equilibrium chip then Cancel dropdown, flush to the card's right edge (clip gives the top-right r8).

### 6.2 Equilibrium Price chip (`Frame 3`)
- 197x40, y=0, x = W − 112 − 197 (454 @763, 514 @823). Fill `#B694FF @ 0.2` (no variable). pad T11 R24 B11 L24, gap 4. "Equilibrium Price:" 14 {purple} + value 14 {white} ("18.50", "42.8", or "-" when none).
- Trade Auction aggregate version: 197x40 at x=642 (W−197, flush right), fill `#A494FF @ 0.3`.

### 6.3 Instrument-level Cancel dropdown (`button with arrow` frame, 112x40)
- x = W − 112 (651 @763, 711 @823), y=0, no radius, clip. Fill {red transparent} #432C35; label "Cancel" 14 {red}; chevron frame 12x12 at (81,14) with vector 8x4 stroke 1 {red}; pad T11 R12 B11 L24, gap 8, centred.
- Disabled (EFP session before start; freeze; summary): fill {grey dark} #373746, label {grey medium}, chevron stroke {grey medium}.

### 6.4 Column headers & cell geometry (text 14 {grey medium}, boxes are hug-width, positioned so text is centred in its cell)
763-wide card: "Size" x=45 (w25), "Bid" x=162 (w21), "Size" x=318, "Ask" x=444 (w23), "Spread" x=638 (w43) at y=48.
823-wide card: "Size" x=66, "Bid" x=164, "Size" x=343, "Ask" x=442, "Spread" x=634 (w51) at y=48.
Data (14 {white}; frozen/summary {grey light}) are right-aligned in a box exactly as wide as the text and positioned at the header centre: row 1 text y=81, row 2 y=114.
Cell centres (763 layout): Size 57.5, Bid 172.5, Size2 330.5, Ask 455.5, Spread 659.5. (823 layout, freeze/lever): Size 78.5, Bid 174.5, Size2 355.5, Ask 453.5, Spread 659.5, add-column 793.
Row-cancel X icons (12x12 circle with x, fill {red}, SVG Appendix A) at (245,84/117) [after Bid] and (529,84) [after Ask] — only on live rows; add-level plus icons (12x12 circle with +, fill {blue}) at (787,84/117) in the 823 layout, shown on the LAST row of each instrument (see lever screenshot).

### 6.5 Input states (EFP session, before start; node `273:740`)
- Empty input cells show placeholder "0" 14 {grey medium}, centred in cell (x=53 for Size, 167-168 Bid, 326 Size2, 451 Ask, 655 Spread; y=81).
- Input well rectangles (bg): `Rectangle 9` 114x33 at (0,73) fill {bg} #18181C, r=[0,0,0,8], stroke 1 {blue transparent 60} INSIDE (= FOCUSED Size input); `Rectangle 10` 114x32 at (114,74) fill {bg} (= Bid input); `Rectangle 11` 43x32 at (230,74) fill {bg} (= X-icon slot).
- Typing state: "10|" 14 {white}, with literal caret "|" char, at (48,81) left-aligned (centre ≈58).
- Other empty cells in cards `273:816`, `273:838`: no well rectangles drawn (only "0" placeholder text) — i.e. only the focused row has visible bg wells.

### 6.6 Highlights & validation tooltips (absolute overlays inside the instrument card)
| State | Cell outline | Tooltip | Tooltip text/icon |
|---|---|---|---|
| In the mix for equilibrium price calculation (`273:1146`,`273:1147`) | `Rectangle 9` 273x32 @ (0,74), stroke 1 {green} INSIDE, no fill (over Size|Bid cell) | `Frame 11` 265x30 @(158,48), fill {green dark} #264142, r4, shadow, pad T8 R12 B8 L12, gap 8 | check icon 12x12 (circle fill {green}, check stroke {bg}) + "In the mix for equilibrium price calculation" 12 {green} |
| Validation error (`273:1144`,`273:1141`) | 283x32 @ (274,74), stroke 1 {red error} INSIDE, no fill (Size|Ask cell) | 197x30 @(431,48), fill {red error transparent} #4E3234, r4, shadow | warn triangle 14x12 {red error} + "Bid should be lower that Ask" (sic, typo is in Figma) 12 {red error} |
| Partially in the fill (`273:1282`,`273:1283`) | 283x32 @ (274,74), stroke 1 {yellow} INSIDE | 137x30 @(436,48), fill {yellow transparent} #4E4134, r4, shadow | half-filled circle icon 14x12 {yellow} + "Partially in the fill" 12 {yellow} |
| New level row (`273:1404`, lever screen) | `Rectangle 9` 823x32 @(0,107), fill #374A58 ({blue-green transparent}), no stroke | – | – |
Tooltip y=48 (overlaps header row), no pointer/arrow nub drawn.

### 6.7 Frozen state (`273:1405`)
Same geometry as live but: session Cancel = disabled variant (grey medium fill, grey light text); timer chip = red-error-transparent "Time Left: 00:15"; all instrument Cancel dropdowns disabled grey; all numeric data {grey light}; row-cancel X icons removed; plus icons stay (blue). Second session (EFP "Starting in 04:59") unchanged/active red Cancel.

### 6.8 Summary state (`273:1559`)
Table replaced by an "Orders matched" block in each instrument card (card heights 139/106/106 as freeze): text box at (16,52), 2 lines: line 1 "Orders matched:" 12 {grey medium}; line 2 14 coloured by result:
- full fill: "Your Buy FTSE 100 IDX FUT Sep25 CC: 200 @ 18.5" {green}
- none: "None" {grey light}
- partial: "Your Buy EURO STOXX 50 Sep25 CC: 200 @ 43 (partial fill)" {orange}
Eq chip kept (values 18.50 / - / 42.8); Cancel dropdowns disabled; session timer chip = outlined red "Time Left: 00:00" (5.3); session Cancel disabled.

## 7. Trade Auction books (`189:1104`, same in `261:2135` under the overlay)

Frame 14 `189:1105`: 1336x682 at (80,117), fill {bg lighter}, r8. Header like 5.2 (title group + timer chip 151x32 @593 + minimize tile + Cancel Auction button 157x32 @1167) and rule at y=56.
- Section labels 14 {grey light}: "Aggregate Book" (99x17 @16,72) and "Global Order Book" (116x17 @863,72).
- Aggregate tables (`Frame 3/8/10`): x=16, width 839, y=97 / 314 / 465, heights 205 (4 rows) / 139 (2 rows) / 205, fill {bg medium}, r8. Title bar 40 with eq chip 197x40 at x=642 fill #A494FF@0.3.
- Global tables (`Frame 5/9/11`): x=863, width 457, same y/heights, fill **{bg} #18181C** (darker than aggregate), r8, no chip (title bar only).
- Aggregate columns (14 {grey medium} header texts at y=48): Client x=23, Trader x=105, Size x=230, Bid x=299, Size x=397, Ask x=469, Client x=579, Trader x=661, Spread x=763. Vertical dividers x=190, 363, 539. Order: [Client|Trader] [Size|Bid] [Size|Ask] [Client|Trader|Spread].
  Data: client/trader left-aligned text at x=29/98 (right group 585/654); numbers right-aligned boxes (Size x=232, Bid x=295 w36, Ask x=467 w36, Size2 x=400, Spread x=775). Row y=81/114/147/180, dividers y=40,73,106,139,172.
- Global columns: Size x=40, Bid x=109, Size x=212, Ask x=284, Spread x=383; dividers x=173, 353; no client/trader. Numbers right-aligned (Size x=42, Bid x=101, Size x=215, Ask x=282).
- Own-order highlight (replaces "in the mix" outline here): `Rectangle` 190x32 @(0,74) and @(540,74) stroke 1 {green} INSIDE, no fill (the Client|Trader cells of the user's own bid and ask).
- Hover/selection states: none drawn.

## 8. Notifications / banners (top-right, x right edge 1416, y=77)

### 8.1 Orders placed — confirm banner (`273:1155`, 328x114 @1088,77)
- Fill {bg lighter}, r6, shadow x-2 y4 blur8 {bg}, auto-layout vertical, pad 16, gap 16, centred.
- Text (14, 296x34, 2 lines): line 1 "Orders placed:" {grey light}; line 2 "Your Buy EURO STOXX 50 Sep25 CC: 400 @ 41" {white}.
- Button row `Frame 105` 296x32, horizontal, space-between, gap 12: **Reject** (103x32, outline {red}, text {red}) left; **Confirm** (114x32, fill {green}, text {bg}) right.

### 8.2 New-level notice (`189:984`, 322x41 @1094,77)
- Fill {bg lighter}, r6, same shadow; horizontal pad T12 R16 B12 L16, gap 8; one line "New level for FTSE 100 IDX FUT Sep25 added!" 14 {blue-green} #71E7FF. No icon, no close button, no timeout drawn.

## 9. New Auction modal (`261:2135` → overlay `115:1870`, modal `115:1871`)

- Overlay "Frame 17": 1373x1024 at (64,0) (covers everything right of the 64px sidebar; sidebar not dimmed), fill {bg} #18181C @ 0.5, BACKGROUND_BLUR radius 12. (Behind it the Trade Auction screen shows blurred.)
- Modal: 916x410 centred in overlay at (229,307) [(1373−916)/2=228.5, (1024−410)/2=307], fill {bg lighter}, r8, no stroke, no drop shadow.
- Title "New Auction" Lato 18 {white}, 103x22 at (401,16). Header rule `Line 7` at y=54, {grey medium}, full width.
- Row 1 (y=70): name text input `115:1912` 235x32 at (24,70): instance of `text input`, fill {grey dark}, r4, pad 10/12/10/12, gap 12, value "European EFP 26/6" 14 {white} (placeholder style = {grey medium} "Text"). Type toggle `Group 3` 336x32 at (556,70): two segments —
  - "Cash Close" selected: 180x32 @556, fill #374A58 (blue-green transparent), r4, text #71E7FF 14, pad 12/56.
  - "EFP" unselected: 160x32 @732, fill {bg medium}, radius TL0 TR4 BR4 BL0, text {grey light}, pad 12/56 (overlaps selected segment by 4px).
  - Right edge of toggle = 892 = 916 − 24.
- Instrument table `Frame 3` 867x165 at (25,118): fill {bg medium}, r4; header row + 4 data rows each 33 incl. 1px {grey dark} divider (y=33,66,99,132); vertical dividers at x=32, 183, 346, 532, 777 (165 tall). Columns: [checkbox 0–32] Underlying 32–183 | Generic Symbol 183–346 | Active Contract 346–532 | Description 532–777 | Min Size 777–867.
  - Header text 14 {grey medium} at y=8: x=75, 216, 398, 618, 795 (centred in column).
  - Row text 14 {white}: x=71, 231, 403, 565, 811; y=41/74/107/140. Sample: "SX5E Index", "VGA Index", "VGU5 Index", "EURO STOXX 50 Sep25", "200".
  - Checkbox instances `check` 16x16 at (8, rowY): unchecked = fill {grey dark}, r2, with white-less check glyph; checked = fill {blue} #7590FF, r2, check stroke 2 {grey dark} 8x6. Rows 2 and 4 checked in the artwork.
- Auction Duration row (y=299): label "Auction Duration" 14 {white} at (25,306); `time` instance 105x32 at (144,299): fill {grey dark}, r4, pad T10 R8 B10 L12, gap 12; "05:00" 14 {white} + "min" 14 {grey medium}; spinner = two 10x12 arrow-big-down icons stacked (one flipped), {grey light}.
- Action row (y=355): Cancel (white, 106x32 @25) · Start In (orange outline, 109x32 @480) · `time` stepper 105x32 @611 (05:00 min) · Start Now (green, 127x32 @765; right edge 892).
- Hidden layer: `Frame 6` "Upload File" button 152x40 @858,88 (visibility off): fill {blue transparent 15}, r4, pad T10 R24 B10 L24, gap 8, text "Upload File" 16 {blue} + lucide file-up icon 16x20 {blue}. Not shown in the artwork.
- Modal side padding 24/25; bottom padding 23.

## 10. Client Auctions — old `273:211` vs new `1008:687` (precise diff)

| Aspect | 273:211 (1440x1024) | 1008:687 (1920x1080) |
|---|---|---|
| Canvas / sidebar | 1440x1024, sidebar 64x1024, avatar y=960 | 1920x1080, sidebar 64x1080, avatar y=1016; same sidebar radii and icons |
| Header rule | 1336 long (x 80–1416) | 1816 long (x 80–1896); same y=61, same colour |
| Left column | 2 session cards: `273:650` 795x455 (Cash Close, 3 instruments) + `273:704` 795x418 (EFP, 3 instruments, "Starting in") | 3 session cards `1008:705`, `1008:741`, `1008:777`, each 795x190 at y=117/323/530, identical content (see below) |
| Instrument rows | FTSE/CAC40/EURO STOXX with data, bid/ask X icons, validation tooltips, cancel menu open | one row "E-mini S&P 500 Future Sep 2025", all values empty "0" placeholders, Equilibrium "-" |
| Instrument card | 763 x 139/106 | 763 x 106 at y=68 |
| Card header rule colour | {grey medium} #5B5D72 | {grey dark} #373746 |
| Card title | "European CC 26/6" + 12px subtitle ("Cash Close" / "EFP") | "European EFP 26/6" + subtitle "Cash Close" at 14px (group 121x34 vs 114x31) |
| Timer chip | "Time Left:" 151x32 centred (x=322) | "Time Left" (no colon) 146x32 right-aligned (x=633) |
| Session Cancel button | present (98x32 @681) | removed |
| Right column | none; top-right confirm banner `273:1155` (Orders placed / Reject / Confirm) at (1088,77) | Audit Log panel `1008:813` 998x741 at (898,117) (see 11); no banner |
| Cancel menu / tooltips | present | absent |

Audit-log / 1920 additions are the only new components; everything else is the same visual language.

## 11. Audit Log panel (1920 screen) — `1008:813` "Frame 113"
- 998x741 at (898,117), r8, vertical auto-layout, no gap/padding, no own fill.
- Header `Frame 112` 998x56: fill {bg lighter}; horizontal pad T12 R16 B12 L16, space-between, centred. "Audit Log" 16 {grey light} (left). Right group (gap 40): [ "From" 14 {grey medium} + date input 155x32 ] gap 12; [ "To" 14 {grey medium} + date input 155x32 ] gap 12; groups gap 16; then download button `lucide/download` 32x32, fill {blue transparent 15}, stroke 1 {blue} INSIDE, r4, icon 16x16 stroke 1 {blue}.
- Date input (`date` component `1001:744`): 235x32 base (instances 155x32), fill {grey dark}, r4, pad 10/12/10/12, gap 8, calendar icon 16x16 stroke 1.3 {blue}, placeholder "dd/mm/yyyy" 14 {grey medium}.
- Body `Table - Sheet1` 998x685 at y=56: fill {bg medium}; vertical, 18 children = 1 header + 17 rows.
- Header row (component `Table Header (Component)` `1001:283`): 998x39 = 38 + bottom border 1 {grey dark} (stroke weights 0/0/1/0 INSIDE); header text **12** {grey medium}.
- Data rows: 998x38, text **12** {white}; **zebra**: odd rows no fill (shows {bg medium}), even rows fill {bg lighter} #2D2E3B (row1 none, row2 lighter, …).
- Column widths (sum 998): Timestamp 182 · Auction 241 · Contract 241 · Action 98 · Side 60 · Price 95 · Size 81. Cell padding T12 R8 B12 L8 (first column L16); Side column is centre-aligned, all others left-aligned; text uses fill width.
- Colour coding: Action ENTER {blue}, MODIFY {orange}, EXECUTION {purple} #B694FF; Side BID {green}, ASK {red}. Timestamp format "02-Jul-2026 16:06:55"; price/size plain numbers left-aligned.

## 12. Component inventory seen from these screens (all on page "drafts")
- `button` set `134:904`: variants Default (`4:156`), disabled (`134:905`), Variant3 (`261:1922`).
- `button with arrow` set `134:907`: Default (`23:162`), disabled (`134:908`).
- `dropdown` `115:702` 112x32: fill {grey dark}, r4, pad 10/12/10/12, gap 40; "Name" {grey medium}; chevron 11x6 {grey light}.
- `text input` `76:274` 235x32; `time` `85:94` 106x32; `date` `1001:744` 235x32; `check` set `85:128` (checked `85:129`, uchecked `85:127`, 16x16, r2); `Table Header (Component)` `1001:283`.
Not components (custom frames re-drawn per screen): session card, instrument table, equilibrium chip, instrument Cancel dropdown, timer chips, tooltips, banners, menu.

## 13. GAPS — searched for, NOT drawn in these 7 screens
Searched all names on page `48:1021` for hover/focus/disabled/empty/loading/error/active/selected/pressed/skeleton/toast/tooltip: only "Active/Inactive" status texts (admin screens) and "Active Contract" (modal column) exist.
- No hover, pressed, or keyboard-focus states for buttons, rows, nav icons, menu items, dropdown or table rows. Only one input "focused" look exists (blue 60% stroke on bg well, EFP card) and one typing look ("10|").
- No selected/active background for sidebar items (active = white icon only); no tooltips on nav icons; no collapsed/expanded sidebar.
- No empty-state or loading/skeleton screens (the 1920 screen's "0" placeholders are the only empty values); no error/offline banner; no toast with auto-dismiss/close; no success confirmation after Confirm.
- Cancel dropdown opened state exists once (All Bid / All Ask / All); no hover on its items, no state for the session-level Cancel menu; "button with arrow" opened menu for session Cancel not drawn.
- Disabled inputs: none drawn (only disabled Cancel buttons).
- Modal: no validation/error state, no focus ring on fields, no disabled Start button, the Upload File button is hidden.
- Audit Log: no sort/filter state, no empty/loading, no pagination or scrollbar, date inputs only in placeholder state.
- No tab bars or breadcrumbs exist anywhere.
- Spinner arrows (time stepper), checkbox hover, date-picker popover not drawn.
- Typo in Figma copy retained: "Bid should be lower that Ask"; screen names "Acution Freeze time" / "Acution Summary".

## Appendix A — SVG sources (exported from Figma, use verbatim)

logo (`189:1326`, 40x32, fill #7590FF opacity .6):
```svg
<svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.5267 24.7502L19.2967 32H19.6417L33.1 0L15.5267 24.7502ZM24.4717 0.663111L14.8333 22.9671H14.5883L11.9733 18.2684L24.4717 0.663111ZM16.7283 2.28622L11.02 15.4418H10.88L9.31 12.7396L16.7283 2.28622ZM7.59833 10.704C7.59833 10.704 5.63 29.5858 6.05833 30.1209C6.30887 30.5105 6.65258 30.8214 7.05379 31.0215C7.45501 31.2215 7.8991 31.3034 8.34 31.2587H9.48333V32H0V31.2569H0.703332C1.26891 31.315 1.83917 31.2223 2.36283 30.9871C2.88649 30.7519 3.34713 30.3815 3.70333 29.9093C4.05333 29.3564 6.345 7.86489 6.345 7.86489L7.59833 10.704ZM32.6283 7.12889C32.6283 7.12889 35.4067 29.6071 35.8483 30.1458C36.2596 30.5344 36.7399 30.831 37.2607 31.0179C37.7815 31.2047 38.3321 31.2782 38.88 31.2338H40V32H26.25V31.2338H27.3933C28.0129 31.2657 28.6311 31.1456 29.2003 30.8827C29.7695 30.6198 30.2746 30.2211 30.6767 29.7173C31.0267 29.1644 29.105 15.1751 29.105 15.1751L32.6283 7.12889Z" fill="#7590FF" fill-opacity="0.6"/></svg>
```
bank nav icon (`189:1327`, 24x24, fill #F8F7FF active / #9597AD inactive):
```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.8662 21.0508C23.4928 21.0509 23.9999 21.5247 24 22.1074V22.9434C23.9999 23.5272 23.4928 23.9999 22.8662 24H1.13379C0.507094 24 7.68259e-05 23.5273 0 22.9434V22.1074C0.00014286 21.5246 0.507135 21.0508 1.13379 21.0508H22.8662ZM5.93066 19.9736H2.3916V9.66309H5.93066V19.9736ZM13.7695 19.9736H10.2295V9.66309H13.7695V19.9736ZM21.6084 19.9736H18.0693V9.66309H21.6084V19.9736ZM23.6094 6.49023V8.58594H0.389648V6.49023L12 0L23.6094 6.49023ZM12 3.01855C11.016 3.01855 10.2179 3.76243 10.2178 4.67871C10.2178 5.59562 11.0159 6.33887 12 6.33887C12.984 6.33879 13.7822 5.59557 13.7822 4.67871C13.7821 3.76248 12.9839 3.01863 12 3.01855Z" fill="#F8F7FF"/></svg>
```
document nav icon (`189:1336`, fill #9597AD):
```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.8262 1.75293C23.4743 1.75293 23.9999 2.20524 24 2.76367V22.9883C24 23.5468 23.4744 24 22.8262 24H4.04785C3.39968 24 2.87402 23.5468 2.87402 22.9883V21.9775H21.6523V1.75293H22.8262ZM18.5371 0C19.1378 0.000203408 19.625 0.447903 19.625 1L19.583 18.3311C19.583 18.8832 19.0959 19.3309 18.4951 19.3311H1.08789C0.487117 19.331 0 18.8833 0 18.3311L0.0419922 1C0.0419922 0.447778 0.529043 0 1.12988 0H18.5371ZM5.48145 12.7979C4.8808 12.7979 4.39377 13.2458 4.39355 13.7979C4.39355 14.3501 4.88067 14.7978 5.48145 14.7979H9.83301C10.4339 14.7979 10.9209 14.3501 10.9209 13.7979C10.9207 13.2458 10.4337 12.7979 9.83301 12.7979H5.48145ZM5.48145 8.79883C4.88067 8.7989 4.39355 9.24663 4.39355 9.79883C4.39367 10.3509 4.88074 10.7988 5.48145 10.7988H14.1846C14.7854 10.7988 15.2723 10.351 15.2725 9.79883C15.2725 9.24659 14.7854 8.79883 14.1846 8.79883H5.48145ZM5.48145 4.79883C4.88075 4.7989 4.39368 5.24675 4.39355 5.79883C4.39355 6.35101 4.88067 6.79876 5.48145 6.79883H14.1846C14.7854 6.79883 15.2725 6.35105 15.2725 5.79883C15.2723 5.24671 14.7854 4.79883 14.1846 4.79883H5.48145Z" fill="#9597AD"/></svg>
```
avatar (`189:1333`, 32x32, fill #9597AD):
```svg
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 21.5314C19.6176 21.5314 22.5606 18.588 22.5606 14.9703C22.5606 11.3526 19.6176 8.40955 16 8.40955C12.3824 8.40955 9.4394 11.3526 9.4394 14.9703C9.4394 18.588 12.3824 21.5314 16 21.5314Z" fill="#9597AD"/><path d="M4.69268 27.3567L5.41899 27.9969C5.42012 27.9976 5.42088 27.9992 5.42239 28.0003C8.34653 30.5798 12.1032 32 16 32C19.8968 32 23.6535 30.5795 26.5776 28.0003C26.5791 27.9992 26.5799 27.998 26.581 27.9969L27.3073 27.3567L27.2831 27.3356C30.2904 24.3403 32 20.2627 32 16C32 7.1775 24.8223 0 16 0C7.1777 0 0 7.1775 0 16C0 20.2627 1.70921 24.3403 4.71686 27.3356L4.69268 27.3567ZM1.71639 16C1.71639 8.12376 8.12395 1.71605 16 1.71605C23.8761 1.71605 30.2836 8.12376 30.2836 16C30.2836 19.8493 28.7237 23.5301 25.9798 26.2121C23.1501 23.9507 19.6365 22.7127 16 22.7127C12.3635 22.7127 8.84988 23.9507 6.02022 26.2121C3.27633 23.5301 1.71639 19.8493 1.71639 16Z" fill="#9597AD"/></svg>
```
minimize tile (`273:631`, 24x24):
```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#383D58"/><path d="M9.77778 7V8.66667C9.77778 8.96135 9.66071 9.24397 9.45234 9.45234C9.24397 9.66071 8.96135 9.77778 8.66667 9.77778H7M17 9.77778H15.3333C15.0386 9.77778 14.756 9.66071 14.5477 9.45234C14.3393 9.24397 14.2222 8.96135 14.2222 8.66667V7M7 14.2222H8.66667C8.96135 14.2222 9.24397 14.3393 9.45234 14.5477C9.66071 14.756 9.77778 15.0386 9.77778 15.3333V17M14.2222 17V15.3333C14.2222 15.0386 14.3393 14.756 14.5477 14.5477C14.756 14.3393 15.0386 14.2222 15.3333 14.2222H17" stroke="#7590FF" stroke-linecap="round" stroke-linejoin="round"/></svg>
```
chevron in button with arrow (9x6, stroke = text colour; shown red):
```svg
<svg width="9" height="6" viewBox="0 0 9 6" fill="none"><path d="M0.5 0.5L4.5 4.5L8.5 0.5" stroke="#FF6565" stroke-linecap="round"/></svg>
```
dropdown chevron (11x6, fill #9597AD):
```svg
<svg width="11" height="6" viewBox="0 0 11 6" fill="none"><path d="M5.47629 5.99944C5.2885 5.9951 5.10901 5.922 4.97258 5.7943L0.231638 1.29294C0.0869576 1.15444 0.00370226 0.964852 0.000120511 0.765738C-0.00346124 0.566625 0.0729228 0.374234 0.21253 0.230727C0.352138 0.0872207 0.543579 0.00430155 0.744891 0.000162601C0.946203 -0.00397587 1.14096 0.0710001 1.28648 0.208645L5.5 4.2118L9.71352 0.208645C9.85904 0.0710001 10.0538 -0.00397587 10.2551 0.000162601C10.4564 0.00430155 10.6479 0.0872207 10.7875 0.230727C10.9271 0.374234 11.0035 0.566625 10.9999 0.765738C10.9963 0.964852 10.913 1.15444 10.7684 1.29294L6.02742 5.7943C5.95402 5.8631 5.86745 5.91669 5.7728 5.95192C5.67816 5.98715 5.57735 6.0033 5.47629 5.99944Z" fill="#9597AD"/></svg>
```
row cancel X (12x12, fill #FF6565):
```svg
<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 0C2.69143 0 0 2.69143 0 6C0 9.30857 2.69143 12 6 12C9.30857 12 12 9.30857 12 6C12 2.69143 9.30857 0 6 0ZM8.44718 7.83854C8.61433 8.00569 8.61433 8.27997 8.44718 8.44711C8.36146 8.52854 8.25433 8.57139 8.14288 8.57139C8.03144 8.57139 7.92431 8.52854 7.83859 8.44711L6.00005 6.60418L4.16152 8.44711C4.0758 8.52854 3.96867 8.57139 3.85722 8.57139C3.74578 8.57139 3.63865 8.52854 3.55293 8.44711C3.38578 8.27996 3.38578 8.00567 3.55293 7.83854L5.39586 6L3.55293 4.16146C3.38578 3.99431 3.38578 3.72003 3.55293 3.55289C3.72008 3.38576 3.99437 3.38574 4.1615 3.55289L6.00004 5.39582L7.83858 3.55289C8.00573 3.38574 8.28001 3.38574 8.44715 3.55289C8.61429 3.72004 8.6143 3.99433 8.44715 4.16146L6.60422 6L8.44718 7.83854Z" fill="#FF6565"/></svg>
```
add-level plus (12x12, fill #7590FF):
```svg
<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 12C9.30216 12 12 9.30219 12 6.00006C12 2.69794 9.30216 0.0001286 6 0.0001286C2.69784 -0.0214539 0 2.67636 0 5.97848C0 9.30219 2.69784 12 6 12ZM3.41007 5.59H5.61151V3.38858C5.61151 3.17276 5.78417 2.97851 6.02158 2.97851C6.25899 2.97851 6.43165 3.15117 6.43165 3.38858V5.59H8.63309C8.84892 5.59 9.04317 5.76266 9.04317 6.00006C9.04317 6.23747 8.8705 6.41013 8.63309 6.41013H6.41007V8.61155C6.41007 8.82737 6.23741 9.02162 6 9.02162C5.76259 9.02162 5.58993 8.84895 5.58993 8.61155V6.38855H3.41007C3.19424 6.38855 3 6.21589 3 5.97848C3 5.74107 3.17266 5.59 3.41007 5.59Z" fill="#7590FF"/></svg>
```
validation warn (14x12, fill #FF7553):
```svg
<svg width="14" height="12" viewBox="0 0 14 12" fill="none"><path d="M2.15297 12H11.8469C13.5218 12 14.5537 10.2135 13.6854 8.81587L8.83856 1.01093C8.00108 -0.336978 5.99748 -0.336978 5.16143 1.01093L0.314557 8.81587C-0.553672 10.2143 0.478033 12 2.15297 12ZM6.23141 4.33939C6.23141 3.92499 6.57511 3.58965 6.99984 3.58965C7.42457 3.58965 7.76827 3.92499 7.76827 4.33939V6.91079C7.76827 7.32519 7.42457 7.66053 6.99984 7.66053C6.57511 7.66053 6.23141 7.32519 6.23141 6.91079V4.33939ZM6.99984 8.31655C7.53038 8.31655 7.96037 8.73608 7.96037 9.25372C7.96037 9.77135 7.53038 10.1909 6.99984 10.1909C6.46929 10.1909 6.0393 9.77135 6.0393 9.25372C6.0393 8.73608 6.46929 8.31655 6.99984 8.31655Z" fill="#FF7553"/></svg>
```
in-the-mix check (12x12: circle #3FF3C0, check stroke #18181C):
```svg
<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect width="12" height="12" rx="6" fill="#3FF3C0"/><path d="M9 4L4.875 8L3 6.18182" stroke="#18181C" stroke-linecap="round" stroke-linejoin="round"/></svg>
```
partial-fill icon (14x12, #FFCE53; left half = 1px stroke ring, right half = filled half-disc):
```svg
<svg width="14" height="12" viewBox="0 0 14 12" fill="none"><mask id="m1" fill="white"><path d="M8 11.5C8 11.7761 8.22428 12.0022 8.49947 11.9792C9.90784 11.8616 11.2357 11.2495 12.2426 10.2426C13.3679 9.11742 14 7.5913 14 6C14 4.4087 13.3679 2.88258 12.2426 1.75736C11.2358 0.750469 9.90784 0.138404 8.49947 0.02081C8.22428 -0.00216703 8 0.223858 8 0.5L8 6L8 11.5Z"/></mask><path d="M8 11.5C8 11.7761 8.22428 12.0022 8.49947 11.9792C9.90784 11.8616 11.2357 11.2495 12.2426 10.2426C13.3679 9.11742 14 7.5913 14 6C14 4.4087 13.3679 2.88258 12.2426 1.75736C11.2358 0.750469 9.90784 0.138404 8.49947 0.02081C8.22428 -0.00216703 8 0.223858 8 0.5L8 6L8 11.5Z" fill="#FFCE53" stroke="#FFCE53" stroke-width="2" mask="url(#m1)"/><mask id="m2" fill="white"><path d="M6 0.5C6 0.223858 5.77572 -0.00216708 5.50053 0.0208099C4.09216 0.138404 2.76425 0.750468 1.75736 1.75736C0.632141 2.88258 1.39116e-07 4.4087 0 6C-1.39116e-07 7.5913 0.632141 9.11742 1.75736 10.2426C2.76425 11.2495 4.09216 11.8616 5.50053 11.9792C5.77572 12.0022 6 11.7761 6 11.5L6 6V0.5Z"/></mask><path d="M6 0.5C6 0.223858 5.77572 -0.00216708 5.50053 0.0208099C4.09216 0.138404 2.76425 0.750468 1.75736 1.75736C0.632141 2.88258 1.39116e-07 4.4087 0 6C-1.39116e-07 7.5913 0.632141 9.11742 1.75736 10.2426C2.76425 11.2495 4.09216 11.8616 5.50053 11.9792C5.77572 12.0022 6 11.7761 6 11.5L6 6V0.5Z" stroke="#FFCE53" stroke-width="2" mask="url(#m2)"/></svg>
```
calendar (16x16, stroke #7590FF 1.3):
```svg
<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M5.33333 2V4.4M10.6667 2V4.4M2 6.8H14M3.33333 3.2H12.6667C13.403 3.2 14 3.73726 14 4.4V12.8C14 13.4627 13.403 14 12.6667 14H3.33333C2.59695 14 2 13.4627 2 12.8V4.4C2 3.73726 2.59695 3.2 3.33333 3.2Z" stroke="#7590FF" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
```
download button (32x32):
```svg
<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="0.5" y="0.5" width="31" height="31" rx="3.5" fill="#383D58"/><rect x="0.5" y="0.5" width="31" height="31" rx="3.5" stroke="#7590FF"/><path d="M16 18.6667V8M20.4444 14.2222L16 18.6667L11.5556 14.2222M24 18.6667V22.2222C24 22.6937 23.8127 23.1459 23.4793 23.4793C23.1459 23.8127 22.6937 24 22.2222 24H9.77778C9.30628 24 8.8541 23.8127 8.5207 23.4793C8.1873 23.1459 8 22.6937 8 22.2222V18.6667" stroke="#7590FF" stroke-linecap="round" stroke-linejoin="round"/></svg>
```
time stepper arrow (10x12, fill #9597AD; second copy is the flipped one):
```svg
<svg width="10" height="12" viewBox="0 0 10 12" fill="none"><path d="M6.41429 10C6.57997 10 6.71429 9.86569 6.71429 9.7V6.60769C6.71429 6.44201 6.8486 6.30769 7.01429 6.30769H8.31204C8.57399 6.30769 8.71012 5.99551 8.53187 5.80356L5.21984 2.23675C5.10115 2.10893 4.89885 2.10893 4.78016 2.23675L1.46813 5.80356C1.28988 5.99551 1.42601 6.30769 1.68796 6.30769H2.98571C3.1514 6.30769 3.28571 6.44201 3.28571 6.60769V9.7C3.28571 9.86569 3.42003 10 3.58571 10H6.41429Z" fill="#9597AD"/></svg>
```

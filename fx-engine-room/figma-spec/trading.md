# FX Engine Room - Trading harvest (Trades Blotter, New Deal / New Trade flows, B2B Spot Deal ticket)

Source: Figma file yuJA7DtjFKnqTZQcu2vKYN, page "Page 1" (0:1). Harvested read-only via Plugin API.
Notation: `{Name}` = bound Figma variable (resolved name). `x,y` are parent-relative unless stated. "T" = text. Text is **Nunito**; every text node has lineHeight `auto`, letterSpacing `0%`.
Hex values below are exact from Figma (colours stored 0-1, converted). "(visual)" = read from screenshot, not from properties.
Text-box heights Figma reports are cap-height-ish (12px text -> h8, 14px -> h10, 18px -> h13, 20px -> h14, 16px -> h11), so text y values refer to a trimmed box. Treat as "vertically centred in the row/field" (visual).
The dashed "tooltip shadow" effect style = DROP_SHADOW #000000@0.5, offset (-2, 2), blur 4, spread 1.

---------------------------------------------------------------------------------------------------

## 0. Tokens actually used in these screens

| Role | Value | Variable |
|---|---|---|
| App/page BG | #000000 | BG |
| Table / panel surface | #171719 | BG Grey 1 |
| Modal / popover / widget surface | #242428 | Modal BG |
| Sidebar, separators, input fill on modal, circle icon buttons, tooltip fill | #39393C | Menu bar / Separators / Inputs on modal (same hex, three names) |
| Primary text | #FFFFFF | Primary text (also `White`) |
| Secondary text / labels / placeholders / disabled button fill | #707079 | Secondary text (stroke on expanded group = `Grey 3`, same hex) |
| Light grey text / icons | #BABEC7 | Light grey text |
| Primary purple | #A4A4FF | Primary purple (also `Purple 1` on KPI value and dropdown caret) |
| Purple 2 (pill / active toggle / Allocate btn) | #39394E | Purple 2 |
| Purple 3 (KPI labels, ID-status section headings) | #7373BB | Purple 3 |
| Cancel button fill | #E6E6E6 | Cancel Button |
| Edit / Amend / Buy-Sell selected / unallocated icon | #FF9747 | Edit |
| Add New (primary CTA, "New" status text, teal row tint) | #30F0D6 | Add New |
| Active / success tick / price-up / live dot | #2BDF68 | Active (price text variable name is `Green 2`, same hex) |
| Delete button / failure cross | #FF7272 | delete |
| Price-down | #FD7557 | Red 2 |
| Blue (ID link) | #60A8FF | blue |
| Ungrouped icon + tooltip text | #FFDC51 | NOT bound (raw hex) |
| Give-Up button outline+text | #00FEA9 | NOT bound (raw hex) |
| Row tint amber | #FFB800 @ 0.15 | NOT bound |
| Unallocated row fill | #242432 | NOT bound (differs by 2 from Modal BG #242428) |
| Black text on coloured buttons | #000000 | Black (a few text nodes use `BG` or raw) |

---------------------------------------------------------------------------------------------------

## 1. Screen / state inventory

SECTION frames all have stroke #000000@0.1, 1px INSIDE, radius 2, no fill. All screens are 1440x1024 frames: `Frame 1` sidebar 56x1024, `Frame 2` logo tab 72x56, `Frame 3` content 1384x1024 at x56 (fill BG, top-left radius 16, clip).

### SECTION "Trades Blotter" 2696:2763 (2437x1224 @12743,2209), 6 children
| id | name | size | shows |
|---|---|---|---|
| 2281:1414 | Blotters | 1440x1024 | MAIN SCREEN "Trade Blotter": toolbar, table with all row variants, right-click menu, 2 tooltips, Prices (rates) widget open |
| 2696:2682 | Allocate Block | 372x385 | modal, allocate two trades (AlpFin 110.00 @16.8, Goldman 130.00 @16.9) to an Account; total 240.00 @17.5 |
| 1253:2360 | Filters | 241x906 | side panel "Filter by" (ID, Trade Date, Type, Symbol, Client, Counterparty, Label chips) |
| 2876:3110 | rates | 91x32 | "Prices" toggle button, default |
| 2876:3113 | rates clicked on | 91x32 | "Prices" toggle button, active |
| 3396:7300 | ID Status | 301x440 | popover "Deal 12345678" - give-up status list (New Trades / Amendments / Deletions) |

### Frame "Deleted trades" 2936:3140 (1440x1024 @12818,3974)
Same shell; title "Deleted Trades"; read-only table (Blotter 2936:3175, 156 children), only Search + filter button.

### Frame "B2B Spot Deal" 5873:19191 (628x693 @12818,5834)
A **Vanilla Option ticket** modal (title "New Client Trade", 3 columns). The name is a stale copy name - the same node name `B2B Spot Deal` is the internal name of the modal in the Vanilla Option deal frames (3999:18228, 5872:18672). See section 6.

### SECTION "New Deal Flow" 3978:11481 (10118x2758 @15466,2209), 5 children (modal titled "New Deal", CTA "Create Deal")
Every screen is the dashboard (title "Dashboard"; behind it Trades 1368x437 @8,64, Activity 1070x461 @8,509, Prices 290x461 @1086,509 panels - belong to dashboard harvester) dimmed by overlay `Rectangle 29` + the modal centred on Frame 3.
| id | name | modal |
|---|---|---|
| 3994:28479 (SECTION 3397x1224) | New Spot Deal | holds 3992:8992 + 3642:5589 |
| 3992:8992 | New Deal - Spot Initial State | modal 5842:17240 "B2B Spot Deal Empty" 432x557; Deal Type already "Spot"; every other field empty; Create Deal DISABLED |
| 3642:5589 | New Deal - Spot - Filled State | modal 5842:17480 432x557; filled (Goldman Sachs / HSBC / NOKPHP / BUY / 12000.00 ...); Create Deal ENABLED |
| 3992:14502 | New Deal Modal Initial State | modal 5873:19436 432x558; Deal Type placeholder "Select Deal Type" (the true "empty" state) |
| 5813:19974 | New Deal - NDF | modal 5813:20986 432x625; NDF form (Fixing Date, Fixing Source added), empty |
| 3994:28480 (SECTION 3525x1224) | New Vanilla Option Deal | holds 3992:12692 + 3992:10723 |
| 3992:12692 | New Deal - Vanilla Option Client | modal 3999:18228 628x693; step 1 (Client side editable) CTA "Market Side >" |
| 3992:10723 | New Deal - Vanilla Option Market Maker | modal 5872:18672 628x693; step 2 (Market side), client-side fields locked/filled, CTA "Create Deal" disabled |
| 5873:18862 (SECTION 3149x1224) | New deal Swap | holds 5846:22497 + 5847:24563 (+ 2 stray instances Dates 5847:26293, Dropdown with label 5847:26294 at 1829,1146 / 2025,1146 - orphan, 172x44) |
| 5846:22497 | New Client Deal Swap | modal 5846:23509 432x693; step 1, CTA "Market Side >" |
| 5847:24563 | New Market Maker Deal Swap | modal 5871:18552 432x693; step 2, "Create Deal" disabled |

### SECTION "New Trade Flow" 3978:11482 (8538x2635 @15569,5563), 5 children (modal titled "New Client Trade", CTA "Create Trade")
| id | name | modal |
|---|---|---|
| 3994:23333 (SECTION 3266x1224) | Spot - New Trade | holds the 2 below |
| 3994:19822 | New Client Spot - Initial State | modal 5842:17677 432x461, empty, Create Trade DISABLED, Conversion Trade unchecked |
| 3994:21618 | New Client Spot - Filled State | modal 5873:18923 432x461, filled, Create Trade ENABLED, Conversion Trade checked |
| 3994:16227 | New Client Vanilla Option | 628-wide 3-col vanilla ticket (same as section 6, title "New Client Trade", CTA "Create Trade") - dashboard behind |
| 3994:26764 | New Trade Modal - Initial State | TWO modals side by side: 5873:19138 (432x421 @209,302, no conversion row) and 5873:19754 (432x489 @726,268, Trade Type placeholder "Select Trade Type", Counterparty on its own row) - layout exploration; both Create Trade DISABLED |
| 5813:23402 | New Client Trade Swap | modal 5813:24414 432x693 (Create Trade disabled, single step) |
| 5813:26902 | New Client Trade NDF | modal 5873:19511 432x489 (Fixing Date / Fixing Source) |

Searched all five roots for text/names matching success|fail|error|confirm|invalid|required|empty|loading|hover|disabled|no trades|no data|are you sure|submitted|rejected|pending|toast|snackbar|warning: **no hits** other than frame names "B2B Spot Deal Empty". There is NO confirm modal, success toast, failure state, or stepper drawn. "Current vs obsolete" cannot be established from Figma names (no "old/obsolete" markers found); the file has a single canonical Section 3 per the brief.

---------------------------------------------------------------------------------------------------

## 2. App shell (identical on all screens; other harvesters own the component detail)

- **Sidebar `Frame 1`** 56x1024, fill `{Menu bar}` #39393C, clip. Icons 24x24 at x16: y72 `Menu tab 1` (dashboard list icon), y128 `Subtract` (blotter/swap icon), y184 `csv` (download arrows), y240 `deleted trades` (bin). Bottom: y936 yellow #FFDC51 icon (notification; only on Blotters frame), y976/984 `Settings` (#707079 on Blotters frame). Inactive icon fill `{Light grey text}` #BABEC7; **active icon fill `{Primary purple}` #A4A4FF** (Blotters: y128; Deleted trades: y240; New Deal/Trade frames: y128).
- **Logo tab `Frame 2`** 72x56 at (0,0), fill `{Primary purple}`, containing `Frame 5` 56x56 with logo group 32x40 at (12,8) (black paths, "FX Engine Room").
- **Top bar `Frame 4`** 1384x56 in Frame 3, no fill, border-bottom 1px `{Separators}` INSIDE (stroke weights 0,0,1,0).
  - Title: 20 Medium `{Primary text}` at x24 ("Trade Blotter" / "Deleted Trades" / "Dashboard").
  - KPI pill `Rectangle 11` 351x32 at (755,12), fill `{Purple 2}`, radius 4. Texts 14 Medium centred: "Option Premium" x770 `{Purple 3}`; "0.00" x882 `{Purple 1}`; "Total P&L" x938 `{Purple 3}`; "3,646.52" x1008 `{Primary purple}`.
  - Entity dropdown `Dropdown` 203x32 at (1122,12), fill `{Modal BG}`, radius 4, auto-layout H, pad T8 R12 B8 L8, SPACE_BETWEEN, text "Makor Securities" 14 Regular `{Primary text}`, caret polygon 12x8 `{Purple 1}`.
  - User avatar vector 32x32 at (1336,12) fill `{Light grey text}`.
- **Footer `Frame 8`** 1384x46, fill `{BG Grey 1}` (Blotter) / none (flow frames), border-top 1px `{Separators}` INSIDE, auto-layout H, SPACE_BETWEEN, pad T8 R12 B8 L12, gap 1016. Left group: logo vector 24x19.6 `{Light grey text}` + text "FX Engine Room | Operated by Makor Group" 14 Medium `{Light grey text}`. Right: `Animation` instance 30x30, three ellipses 8x8 `{Active}` #2BDF68 (a, b, c = pulse animation layers) = live-connection dot.

---------------------------------------------------------------------------------------------------

## 3. TRADES BLOTTER (frame 2281:1414 "Blotters")

### 3.1 Layout
- `Frame 3` content: top bar y0-56; toolbar row y64 (h32); table surface `Blotter` 3107:6695 at (0,104) 1384x920 fill `{BG Grey 1}` clip; footer at Blotter y873 (46 high).
- Table is NOT auto-layout: all cells are free-positioned text nodes + 1px line nodes (see drawn coordinates). Drawn row pitch, header and positions below are exact as drawn.

### 3.2 Toolbar (y=64 in Frame 3; all h32; auto-layout H, label 14 SemiBold, pad T11 B11)
| Button | id (3107:) | x | w | fill | stroke | radius | text colour | pad L/R | gap |
|---|---|---|---|---|---|---|---|---|---|
| Group (Outlined purple) | 7134 | 8 | 88 | none | 1px `{Primary purple}` INSIDE | 3 | `{Primary purple}` | 24/24 | 8 |
| Amend (New/Add, States=Default) | 7135 | 104 | 95 | `{Edit}` #FF9747 | - | 4 | #000000 | 24/24 | 10 |
| Allocate (Button transparent) | 7138 | 207 | 102 | `{Purple 2}` #39394E | - | 3 | `{Primary purple}` | 24/24 | 8 |
| Give-Up (Button transparent green) | 7139 | 318 | 102 | none | 1px #00FEA9 INSIDE (unbound) | 3 | #00FEA9 | 24/24 | 8 |
| Delete (New/Add) | 7136 | 428 | 91 | `{delete}` #FF7272 | - | 4 | #000000 | 24/24 | 10 |
| New Trade (With dropdown) | 7133 | 748 | 132 (HUG) | `{Add New}` #30F0D6 | - | 3 | #000000 | L24 R20 | 8; chevron-down vector 10x5 stroke `{Black}` 1.3 |
| Circle chip "ungrouped" | 7144 | 904 | 32 | `{Separators}` | - | 16 | icon 14x14 #FFDC51 | - | - |
| Circle chip "amend/warn" | 7140 | 944 | 32 | `{Separators}` | - | 16 | icon 14x14 `{Edit}` | - | - |
| Circle chip "filter" | 7142 | 984 | 32 | `{Separators}` | - | 16 | icon 16x16 `{Primary purple}` | - | - |
| Search | 7137 | 1040 | 205 | `{Inputs on modal}` | - | 4 | placeholder "Search" 14 Regular `{Secondary text}`; magnifier 16x16 stroke `{Primary purple}` (4.17 INSIDE) | pad 8 all, gap 8 | |
| Prices toggle (`rates`) | 3107:7158 | 1277 | 91 | `{Purple 2}` (active as drawn) | 1px `{Primary purple}` INSIDE | 3 | icon 16x16 + "Prices" 14 SemiBold `{Primary purple}` | L12 R16 pad T11 B11 | 8 |
Prices toggle states (2876:3110 / 2876:3113): default = no fill + 1px `{Primary purple}`; active ("rates clicked on") = fill `{Purple 2}` + same stroke.
Disabled/hover variants of toolbar buttons: not drawn (the component `New/Add` has `States=Default|Disabled`, see 7.2).

### 3.3 Header row
- Height 34 (Blotter y0-34), bottom rule `Line 1` 1px `{Separators}` at y34. No fill. Labels 14 Medium `{Secondary text}` #707079, nodes centre-aligned in their own boxes (box x / w):
  ID 94/15 · Type 172/31 · Client 237/38 · Market Maker 314/87 · Buy/Sell 419/53 · Quantity 490/65 · Symbol 613/49 · Client Price 710/73 · Market Maker Price 802/122 · P&L 949/27 · Trade Date 1023/70 · Value Date 1132/70 · Prime Broker 1216/83 · Direction 1322/58. All at y12 (centre y17).
- Select-all control at (8,9): instance `deselect all` 38x16 variant `Property 1=trades selected`: indeterminate checkbox 16x16 fill `{Primary purple}` radius 2 with black dash (Line 62 stroke #000000 1.5, 10 wide at (3,9)) + count text "(5)" 12 Medium `{Primary purple}` at x20 (selected-count label).
- No sort arrows, no per-column filter icons drawn. Sort/filter affordance = the circle filter chip (opens Filters panel 3.9). (searched: none)

### 3.4 Body rows
- Row pitch 28 (rules at y 34, 62, 90, 117, 145, 205, 233, 261, 289, 317, 345, 373, 401; rules `Line n` 1px `{Separators}` full width 1384, stroke CENTER). Cell text vertically centred in row (row text y = rule+10 for 8px box).
- Cell text: 12 Medium `{Primary text}` #FFFFFF (qty uses variable `White`, identical hex). No zebra striping. Row base = transparent over `{BG Grey 1}`.
- Column x of cell text boxes (box x / w, alignment):
  | col | x | w | align |
  |---|---|---|---|
  | checkbox | 8 | 16x16 | - |
  | status ("New") | 32 | 26 | L |
  | ID | 76 | 51 | **R** (right edge 127) |
  | Type | 160 | text width | L |
  | Client | 238 | text | L |
  | Market Maker | 339 | text | L |
  | Buy/Sell | 427 | text | L |
  | Quantity | 480 | 64 | **R** (right edge 544); also 500/44 for 3-char |
  | Symbol group | 583 | 107 | see 3.6 |
  | Client Price | 723 | 46 | R (edge 769) |
  | Market Maker Price | 831 | 46 | R (edge 877) |
  | P&L | 943 | 39 | R (edge 982) |
  | Trade Date | 999 | 117 | R (edge 1116) |
  | Value Date | 1134 | 65 | R (edge 1199) |
  | Prime Broker | 1246 | 24 | R (edge 1270) |
  | Direction | 1318 ("Client" w33) / 1317 ("Market Maker" w75) | | R (edge 1351/1392; overflow clipped, scrolls horizontally) |
- Amounts formatting: quantity integer, no thousands separator, sign shown for sell (`-12000`, `-200`), buy positive (`12000`); prices 4 dp (`17.1213`, `18.0878`, `48.4689`); P&L 4 dp (`5.0000`, `3.0000`); dates `DD/MM/YYYY HH:mm:ss` and `DD/MM/YYYY`; client name truncated with ellipsis (`Goldman S...`).
- Side colouring: **BUY / SELL are plain white 12 Medium (no green/red colouring drawn).**
- Sample cell values (copy): Type = Client Spot | Market Spot | B2B Spot; Client = Goldman S... | AlpFin | UNALLOC(ATED?) shown "UNALLOC"; Market Maker = HSBC; Prime Broker = RBS; Direction = Client | Market Maker.

### 3.5 Row states (exact)
| State | Visual |
|---|---|
| New trade (rows 1-2, y33-90) | tint rect `Rectangle 12` 1384x57 `#30F0D6@0.15`; status text "New" 12 Medium `{Add New}` at x32; checkbox (row1 checked) |
| Selected | checkbox checked: instance `Property 1=Checked` 16x16 fill `{Primary purple}` radius 2, tick vector 12x9 fill `{Black}` at (2,3). Unchecked: fill `{Menu bar}` #39393C (some rows `{Modal BG}`) radius 2. No row-level highlight for plain selection. |
| ID link (row 3) | ID text colour `{blue}` #60A8FF (clickable ID) |
| Group parent collapsed | chevron-right vector at x40, 8x4 stroke `{Primary purple}` 1.5 (rotated) |
| Group parent expanded (row y118-145) | row fill `{Modal BG}` (`Rectangle 18` 1384x27); chevron-down; child block y145-205: rect `Rectangle 11` 1384x87 from y118 fill `#39393C@0.8` + stroke 1px `{Grey 3}` #707079 OUTSIDE; child rows pitch 24 (text y159, 183), child text colour `{Light grey text}` #BABEC7 (child ID/Type/Client/MM/dates) except buy/sell and qty which stay white; child checkboxes fill `{Modal BG}` |
| Ungrouped trade | amber tint `#FFB800@0.15` rect (rows y232-261 and y288-317, h29) + link-broken icon #FFDC51 14x14 at x46; tooltip "Ungrouped trade" |
| Unallocated trade | solid fill `#242432` (rects y345-372 and y373-400, h27) + icon `{Edit}` 14x12 at x46 (and warning triangle in last row); tooltip "Unallocated trade" |
| Hover / focus / pressed row | NOT DRAWN |
All state tints are full-width rectangles behind the text (not row components).

### 3.6 Symbol cell (currency pair with flags)
Group 107x12 at x583: flag instance `MasterFlag` (variant Circle=no, Square=no, Rectangle=no, **Rounded=yes**) 16x12 radius 2 clip, inner country flag asset (e.g. "au Australia" 16.55x12.27) + ISO text 12 Medium `{Primary text}` at x+20 ("AUD"); separator "/" 14 Medium white at x638 (w5); second flag x651 + "JPY" x671. Gap flag->text 4; pairs separated with " / ".

### 3.7 Right-click menu `Right Click menu` 3107:6493
183x120 at (420,268); fill `{Modal BG}`; radius 8; effect "tooltip shadow"; clip. Items (12x12 icon `{Light grey text}` at x12 + label 12 Medium `{Primary text}` at x32): y12 "Download Trade Report", y40 "Copy Lucera Link ID", y68 "Copy Trade IDs", y96 "Status". Pitch 28. Hovered/highlighted item = `Rectangle 27` 183x28 at y32 fill `{Separators}` (drawn on "Copy Lucera Link ID"). No dividers.

### 3.8 Tooltips (row icon tooltips)
Frame 145x32 (HUG x FIXED), fill `{Inputs on modal}`, radius 4, auto-layout H pad T11 R16 B11 L16 centred, clip, shadow "tooltip shadow". Text 14 **Regular** (only place Regular body is used for tooltips). "Unallocated trade" #FF9747 (`{Edit}`) at (36,344); "Ungrouped trade" #FFDC51 w140 at (36,260) with shadow #000000@0.4 offset (-1,2) blur 4 spread 0 (slightly different shadow from the other).

### 3.9 Pagination + scrollbars
- Pagination group centred ~x631-761, y845 in Blotter: first-page icon (two vectors 8x12 + 7x12, `{Secondary text}`), text "Page 1" 14 Medium (range fill: "Page" `{Secondary text}`, "1" `{Light grey text}`), next chevron 7x12 `{Light grey text}`. Previous/first are dimmed (`{Secondary text}`), next active (`{Light grey text}`).
- Horizontal scrollbar (drawn as group 8x1368 rotated): track `{Inputs on modal}` radius 12; thumb `{Secondary text}` radius 12 length 473.34 (34.6%). Thickness 8. (Blotters frame; the Deleted-trades frame has the same.)
- Vertical scrollbar inside Prices widget (screenshot, visual): 6px track at right.

### 3.10 Prices (rates) widget `Rates Widget` 3107:7161
290x794 at (1086,104), fill `{Modal BG}`, radius 8, shadow "tooltip shadow", clip, 92 children. Header: line y34 (full 291) `{Separators}`; "Symbol" 14 Medium `{Secondary text}` at x54 w49, "Price" at x197 w32. Rows pitch 28 from y34 (text y42, 70, 98 ...). Row: flag pair (same symbol cell, left) + price right-aligned 12 Medium text box x178 w54 (right edge 232) + arrow icon 12x12 at x236: up arrow & text `{Green 2}` #2BDF68 (e.g. 0.908518), down arrow & text `{Red 2}` #FD7557 (e.g. 7.113453). 6-dp prices. Divider lines drawn every 56px (y 62,118,174...), i.e. only alternate rows (visual: not visible).

### 3.11 Filters panel `Filters` 1253:2360
241x906, fill `{Modal BG}`, radius 8, DROP_SHADOW #000000@0.4 offset (-4,0) blur 6. Title "Filter by" 14 Medium `{Primary text}` at (16,12); close "X" icon frame 18x18 at (211,8) glyph `{Light grey text}`. Fields x16 w209, pitch 60: y46 `Search with label` "ID"; y106 `Dates` "Trade Date" (placeholder dd/mm/yyyy-dd/mm/yyyy, calendar icon); y166 `Dropdown with label` "Type" value "All Types"; y226 Search "Symbol"; y286 Search "Client"; y346 Search "Counterparty"; y406 `Chips` "Label" (Frame 9 209x32 fill `{Inputs on modal}` radius 4, H gap 4 pad T4 R8 B4 L8; chip 82x24 fill `{Modal BG}` radius **12**, H gap 8 pad 4/8, text "12345" 14 Regular white + close 16x16 `{Light grey text}`). Field label 12 Regular `{Secondary text}` above 32px control (label at y0, control y12, total 44).

### 3.12 Allocate Block modal 2696:2682
372x385, fill `{Modal BG}`, radius 12, clip. Title "Allocate Block" 18 Medium white centred at y24; rule at y61 (`Line 4` `{Separators}` 1px, spans -0.69..372). Content left x32: trade rows (y85 and y129; pitch 44): "Trade 1234567" 12 Medium (word "Trade" `{Primary text}`, number `{Primary purple}`); counterparty line y101 12 Medium white (AlpFin / Goldman); column heads "Quantity" x165 and "Trade Price" x252 12 Regular `{Secondary text}` (y85); values y101 "110.00","16.8" 12 Medium white. `Search with label` "Account" 308x44 at (32,185). Two `Input with label` 146x44 at (32,253) and (194,253) (gap 16): Quantity "240.00" (active bordered), Trade Price "17.5". Buttons y329: Cancel (32, 92x32 `{Cancel Button}`), Allocate (238, 102x32 `{Add New}`) right edge 340 = W-32.

### 3.13 ID Status popover 3396:7300
301x440, fill `{Modal BG}`, radius 12. Title "Deal 12345678" 18 Medium (word "Deal" white, number `{Primary purple}`) at (24,24); close X 16x16 `{Light grey text}` at (261,24). Rules: y61 full, y155 full, y366 full, y274 inset (x24-301). Section headings 16 Regular `{Purple 3}`: "New Trades" y77, "Amendments" y171, "Deletions" y382. Items: "Give-up Status" 16 Regular `{Light grey text}` at x32 (y106/227/319); trade name "Trade 123" 16 Regular `{Primary text}` y198 (sub-heading); status glyph at x217: tick 16x12 `{Active}` / cross 12x12 `{delete}`; action button 24x24 at x253, fill `{Separators}`, radius 4, icon 12x12 `{Primary purple}` (download / retry); prime-broker tag 32x12 (38x12 for HSBC) radius 2 fill `{Cancel Button}` #E6E6E6 (failed: `{Secondary text}`), text 8 Regular `{BG}` black; meta line 10 **Medium Italic** `{Secondary text}` ("10 Oct 2024 15:36" at x72/78, "Please retry give-up" error msg, size "2.5KB"/"0 KB" at x249). "Not applicable" 16 Regular `{Light grey text}` y405. Scrollbar 4px wide at x289: track `{Inputs on modal}` radius 35.61, thumb `{Secondary text}` h128.07.

### 3.14 DELETED TRADES screen 2936:3140
Same shell; sidebar active icon = bin (y240) `{Primary purple}`. Top bar title "Deleted Trades" 20 Medium. Toolbar row y64: `Search` 205x32 at x16 (same as 3.2), circle filter button `Frame 27` 32x32 at (1336,64) fill `{Separators}` radius 16, icon 16x16 `{Primary purple}`. Table `Blotter` at (0,104) 1384x920: **same header labels and row data, with no checkbox / status columns and no tints/chevrons/icons** (all rows plain). Column x offsets shifted vs live blotter: ID box x28 (edge 79); Type 122; Client 200; Market Maker 301; Buy/Sell 389; Quantity 442 (edge 506); Symbol 543/545; Client Price 685; MM Price 793; P&L 905; Trade Date 961; Value Date 1096; Prime Broker 1208; Direction 1280. Header label x: ID 46, Type 134, Client 199, MM 276, Buy/Sell 381, Quantity 452, Symbol 575, Client Price 672, MM Price 764, P&L 911, Trade Date 985, Value Date 1094, Prime Broker 1178, Direction 1284. Same row rules (28 pitch), pagination, footer.

---------------------------------------------------------------------------------------------------

## 4. MODAL SYSTEM (all New Deal / New Trade / Allocate)

### 4.1 Container
- Modal frame: fill `{Modal BG}` #242428, radius **12**, clip, no stroke, no shadow (sits on dimmed backdrop). Centred in Frame 3 (x = (1384-W)/2, y = (1022-H)/2).
- Widths: 432 (2 columns) or 628 (3 columns). Allocate 372.
- Header: title 18 Medium `{Primary text}`, centred, text box top y24; header divider `Line 4` 1px `{Separators}` at y61 spanning the full width (drawn -0.8 .. W+0.8). Content starts y85.
- Grid: side padding 32; column width 172; column gap 24 (cols at x32, x228, x424). Row pitch 68 (field 44 + gap 24) starting y85. (Some nodes sit at x33 / w171 / y+1: drawing noise, intended x32/w172.)
- Footer: buttons at y = lastRowBottom + 32; height 32; bottom padding 24 -> modal H = buttonY + 56. Cancel left x32; primary right-aligned (right edge W-32).
  H examples: 557 (6 rows, btn y501), 625 (7 rows, y569), 693 (8 rows, y637), 461 (4 rows + checkbox row, y405), 489 (y433).
- Backdrop (flow frames): `Rectangle 29` 1384x1022 at (0,0) in Frame 3, fill #000000@0.5 + BACKGROUND_BLUR radius 10 (no variable). (Rectangle height 1022 not 1024.)

### 4.2 Field = 44px stack: label (12 Regular `{Secondary text}` at y0) + control 32px at y12 (gap = 4 between 8-high label box and control top; read visually)
All controls: 172x32, radius 4, clip.
| Control (component) | fill | stroke | auto-layout | text |
|---|---|---|---|---|
| Input with label (`Input with label` 89:51) | `{Inputs on modal}` #39393C | none | H, gap 8, pad T8 R12 B8 L8, align MIN/CENTER | value 14 Regular `{Primary text}`; placeholder 14 Regular `{Secondary text}` (e.g. "0.00", "0.0000", "Enter currency pair") |
| Dropdown with label (`Dropdown with label` 89:32) | `{Inputs on modal}` | none | H, gap 8, pad 8/12/8/8, SPACE_BETWEEN | value `{Primary text}` / placeholder `{Secondary text}` 14 Regular; caret polygon 12x8 `{Purple 1}` #A4A4FF (locked state: `{Secondary text}`) |
| Dates (`Dates` 1254:2381) | `{Inputs on modal}` (empty) | **active/default-today: no fill, 1px `{Secondary text}` INSIDE** | H, SPACE_BETWEEN, pad 8/12/8/8 | text "dd/mm/yyyy" `{Secondary text}` (empty) or "24/06/2024" `{Primary text}`; calendar icon 16x16 at right: `{Primary purple}` when empty/filled value dates, `{Secondary text}` when bordered/locked |
| Search with label (`Search with label` 89:26) | `{Inputs on modal}` | none | H, gap 8, pad 8 all, MIN/CENTER | magnifier 16x16 stroke `{Primary purple}` 4.17 INSIDE at x8; text at x32 14 Regular (placeholder `{Secondary text}` "Select Client" / "Select Market Maker" / "Select Counterparty"; value `{Primary text}`) |
| Search-select ("Select Currency", groups 165/166/167 in vanilla) | same as Search | | | placeholder "Select Currency"/"Select Counterparty" 14 **Medium** `{Secondary text}` over the field |
Label texts: 12 Regular `{Secondary text}` (one label has a leading space " Value Date" in New Trade frames - ignore).
Filled-value styling is inconsistent across frames (record both): Spot Deal filled (5842:17480) -> fills stay `{Inputs on modal}`, text white; Vanilla MM / Swap MM / locked fields -> **fill removed + 1px `{Secondary text}` INSIDE border**, text `{Primary text}`, caret/calendar `{Secondary text}`.

### 4.3 Segmented control (Side / Client Side / Market Side / Put Call) - drawn from rectangles (not a component)
Total 172x32. `Rectangle 25` outline 172x32 radius 4 stroke 1 INSIDE; `Rectangle 26` left half 82.87x32 (radius [4,0,0,4]) stroke 1 INSIDE (its right edge = the divider); labels 14 SemiBold, centred in each half (BUY text box x+18.76 w45.35; SELL x+101.64 w51.6).
| Variant | outline/fill | label colours |
|---|---|---|
| Side (BUY/SELL) neutral | outline `{Edit}` #FF9747 | both `{Edit}` |
| Side BUY selected | left half **filled** `{Edit}` | BUY #000000 (`{Black}`), SELL `{Edit}` |
| Put/Call neutral | outline `{Primary purple}` | both `{Primary purple}` |
| Put selected (Vanilla MM) | left half filled `{Primary purple}` (82.9 w), outline `{Secondary text}` | PUT #000000, CALL `{Secondary text}` |
| Market Side locked (Vanilla MM, Swap MM) | outline `{Secondary text}` 1; selected half (SELL) filled `{Edit}` w89 | unselected BUY `{Secondary text}`, selected SELL `{Modal BG}` #242428 |
SELL-selected neutral variant in client frames is not drawn (Swap MM shows SELL filled).

### 4.4 Buttons
| Button | component | size | fill | text |
|---|---|---|---|---|
| Cancel | `Property 1=Default` Cancel 29:109 | 92x32 HUG | `{Cancel Button}` #E6E6E6 | "Cancel" 14 SemiBold `{Black}`, pad T11 R24 B11 L24 gap 10, radius 4 |
| Primary (Create Deal / Create Trade / Allocate) | `New/Add` `States=Default` 28:7 | HUG x32 (Create Deal 124, Create Trade 130, Allocate 102) | `{Add New}` #30F0D6, radius 4 | 14 SemiBold #000000 |
| Primary disabled | `States=Disabled` 28:26 | same | `{Secondary text}` #707079 | 14 SemiBold `{Light grey text}` #BABEC7 |
| "Market Side >" (step-1 CTA, `With dropdown` frame) | frame | 134x32 | `{Secondary text}` #707079 radius 3 | 14 SemiBold `{Light grey text}`; chevron-right vector 10x5 stroke `{Light grey text}` 1.3 at x114; H gap 8 pad T11 R24... (L24 R20) |
(The "Market Side >" button never has an enabled coloured state drawn.)

### 4.5 Checkbox row (Conversion Trade, New Spot Trade only)
Group 133x16 at (33,357): checkbox instance 16x16 radius 2 (unchecked fill `{Menu bar}` #39393C; checked fill `{Primary purple}` + black tick 12x9 `{Black}` at (2,3)) + label at x+24 14 Regular: unchecked `{Light grey text}`, checked `{Primary text}`.

---------------------------------------------------------------------------------------------------

## 5. FLOWS, step by step (field maps; (col,row) with cols x32|x228|x424, rows y85+68n)

There is no stepper, progress bar, confirm dialog or result state. "Steps" are: (a) Initial/empty -> (b) filled (CTA enabled) -> CTA click (not drawn). Vanilla and Swap deals add a two-stage "Client side" -> "Market side" flow.

### 5.1 NEW DEAL - Spot (432 wide) title "New Deal"
Initial 3992:8992 / Filled 3642:5589 (identical geometry). Rows:
1. y85: Deal Type [Dropdown] ("Spot")   [right cell empty]
2. y153: Client [Search] | Market Maker [Search]
3. y221: Currency Pair [Input "Enter currency pair"] | Side [BUY/SELL neutral]
4. y289: Quantity [Input "0.00"] | Trade Date [Dates "24/06/2024", bordered]
5. y357: Client Value Date [Dates] | Market Value Date [Dates]
6. y425: Client Price [Input "0.0000"] | Market Price [Input "0.0000"]
Buttons y501: Cancel | Create Deal (disabled #707079/#BABEC7 in initial; enabled #30F0D6/#000 in filled).
Filled values: Goldman Sachs, HSBC, NOKPHP, BUY selected (left half filled), 12000.00, 24/06/2024, 26/06/2024, 26/06/2024, 17.08783, 17.94316.
Empty variant 3992:14502 differs: Deal Type shows placeholder "Select Deal Type" (`{Secondary text}`); modal H558, rows +1px (y86 for row 1, buttons y502).

### 5.2 NEW DEAL - NDF (432x625) 5813:19974
Same as Spot plus row 7 (y493): Fixing Date [Dates] | Fixing Source [Dropdown "Select FS"]. Deal Type "NDF". CTA disabled.

### 5.3 NEW DEAL - Swap (432x693) two stages
Stage 1 5846:22497 "Client": Row1 Deal Type "Swap" | Trade Type "Client" [Dropdown, bordered `{Secondary text}` 1px]; Row2 Counterparty [Search "Select Client"] | Trade Date [Dates 24/06/2024]; Row3 Currency Pair | Side (BUY/SELL neutral); Row4 Quantity | Far Leg Notional; Row5 Value Date | Far Value Date; Row6 Price | Far Price; Row7 Fixing Date | Far Fixing Date; Row8 (y561) Fixing Source. Footer: Cancel | "Market Side >" (right, x266 w134).
Stage 2 5847:24563 "Market Maker": Deal Type/Trade Type/Currency Pair "NOK-PHP" become bordered locked (white text); "Side" label now "Side" with locked **Market Side segmented** (BUY unselected grey, SELL selected `{Edit}`); CTA "Create Deal" DISABLED (x276 w124).

### 5.4 NEW DEAL - Vanilla Option (628x693, 3 columns) two stages
Stage 1 3992:12692: Row1 Deal Type "Vanilla Option" | Trade Type "Client Vanilla" (bordered); Row2 Counterparty [Search-select] | Trade Date [Dates]; Row3 Currency Pair | **Client Side** [BUY/SELL neutral, `{Edit}`] | **Put Call** [PUT/CALL neutral, `{Primary purple}`]; Row4 Quantity | Strike Price ("0.0000") | Expiry Date; Row5 Premium Amount | Premium Currency [Search-select "Select Currency"] | Premium Date; Row6 Exercise Style [Dropdown "Select ES"] | Payout Currency [Search-select] | Trader [Dropdown "Select Trader"]; Row7 Fixing Date | Cut [Dropdown "Select Cut"] | Settlement Date; Row8 (y561) Fixing Source [Dropdown "Select FS"]. Footer: Cancel (32,637) | "Market Side >" (462,638, 134x32).
Stage 2 3992:10723: Client-side label becomes "Market Side" (65w) with locked segmented (SELL selected); Put/Call locked with PUT selected (filled `{Primary purple}`, text black); filled values: Currency Pair "NOK-PHP", Quantity "1.2000", Strike "12.000", Expiry "26/06/2024", Exercise Style "Exercise Style" (bordered/locked); CTA "Create Deal" DISABLED (472,637 w124 -> right edge 596).

### 5.5 NEW TRADE - Spot (432x461) title "New Client Trade"
Initial 3994:19822: Row1 Trade Type [Dropdown "Spot"] | Counterparty [Search "Select Client"]; Row2 (y153) Currency Pair | Side; Row3 (y221) Quantity | Trade Date; Row4 (y289) Value Date | Price; checkbox "Conversion Trade" at y357 (unchecked); buttons y405: Cancel | "Create Trade" (disabled, x270 w130).
Filled 3994:21618: Goldman Sachs, NOKPHP, BUY selected, 12000.00, 24/06/2024, 26/06/2024 (calendar icon purple), 17.94316, Conversion Trade checked; Create Trade ENABLED.
New Trade Modal Initial (3994:26764): variant A 432x421 (no conversion row) and variant B 432x489 (Trade Type | Counterparty stacked left column, rows shifted +68).
### 5.6 NEW TRADE - NDF 5813:26902 (432x489): Trade Type "NDF"; Row4 Value Date | Price; Row5 Fixing Date | Fixing Source; CTA "Create Trade" disabled.
### 5.7 NEW TRADE - Swap 5813:23402 (432x693): Trade Type "Swap"; Row1 Trade Type | (empty); Row2 Counterparty | Trade Date; Row3 Currency Pair | Side; Row4 Quantity | Far Leg Notional; Row5 Value Date | Far Value Date; Row6 Price | Far Price; Row7 Fixing Date | Far Fixing Date; Row8 Fixing Source; single CTA "Create Trade" (disabled).
### 5.8 NEW TRADE - Vanilla 3994:16227: identical to 5.4 stage 1 grid with title "New Client Trade", Trade Type "Client Vanilla", Counterparty search, CTA "Create Trade" (disabled).

### Quote tiles / big buy-sell buttons / price-streaming tiles
NONE exist in these flows. "Quote"/prices appear only as (a) Client Price / Market Price inputs in deal modals, (b) Prices (rates) widget in the Blotter with up/down arrows. No big BUY/SELL execution buttons - Buy/Sell is the segmented control above (orange).

---------------------------------------------------------------------------------------------------

## 6. B2B Spot Deal ticket 5873:19191 (628x693) - anatomy
Frame in canvas at (12818,5834); modal fill `{Modal BG}`. Title "New Client Trade" 18 Medium centred (x243,y24, w142); rule y61. Grid 3 columns x32/228/424 (instances sit at 32/33 and 228/229, 424):
| y | col 1 (x32) | col 2 (x228) | col 3 (x424) |
|---|---|---|---|
| 85 | Dropdown with label (Trade Type) | - | - |
| 153 | Search-select group "Select Counterparty" | Dates (Trade Date) | - |
| 221 | Input (Currency Pair) | Client Side segmented (Group 163) | Put Call segmented (Group 164) |
| 289 | Input (Quantity) | Input (Strike Price) | Dates (Expiry Date) |
| 357 | Input (Premium Amount) | Search-select group "Select Currency" (Premium Currency) | Dates (Premium Date) |
| 425 | Dropdown (Exercise Style) | Search-select group "Select Currency" (Payout Currency) | Dropdown (Trader) |
| 493 | Dates (Fixing Date) | Dropdown (Cut) | Dates (Settlement Date) |
| 561 | Dropdown (Fixing Source) | - | - |
Footer y637: Cancel instance 92x32 at x32; "Create Trade" `New/Add` `States=Disabled` 130x32 at x466 (fill `{Secondary text}`, text `{Light grey text}`). All fields empty (placeholder state). 23 direct children; labels/placeholders as in 5.4. Styling = section 4.

---------------------------------------------------------------------------------------------------

## 7. Component references (owned by other harvesters; ids for cross-ref)
- 7.1 Controls: Input with label 89:51 | Search with label 89:26 | Dropdown with label 89:32 | Dates 1254:2381 | Chips 100:250 | Dropdown (top bar) 1252:2343 | Search 52:44 | Checkbox Checked 89:160 / Unchecked 89:161 | deselect all (trades selected) 2936:4529 | MasterFlag 584:265 (flags e.g. au Australia 584:498, jp Japan 584:506).
- 7.2 Buttons: New/Add 28:7 (Default) / 28:26 (Disabled) | Cancel 29:109 | Outlined purple 2353:1976 | Button transparent 2657:2687 | Button transparent green 2809:2713 | With dropdown 2353:1994 | Animation 38:152 | Menu tab 1 16:131 | Settings 16:133.

---------------------------------------------------------------------------------------------------

## 8. GAPS (searched, NOT drawn)
- Hover, focus, pressed states for: toolbar buttons, table rows, header cells, menu items (only one "highlighted" menu item, `Rectangle 27`), inputs, dropdowns, segmented control, checkbox.
- Disabled toolbar buttons (Amend/Allocate/Give-Up/Delete when nothing selected) - only the modal CTA has a Disabled variant.
- Input validation / error / helper text / required markers: none. No red/error input border.
- Dropdown open list, date picker popover, search results list: none.
- Empty table / loading skeleton / no-results state: none (Deleted Trades also shows only populated).
- Confirm dialog, success toast, failure/rejected state, post-submit blotter highlight for the new trade: none (text search for success/fail/error/confirm/toast found nothing).
- Stepper / progress indicator for two-stage Client -> Market side flow: none; "Market Side >" button is the only affordance, no "Back".
- Sort indicators, column resize, column picker, per-column filter icons, sticky column header behaviour: none.
- BUY/SELL colour coding in table (all white), P&L positive/negative colouring in table (P&L plain white); negative-amount style only via "-" sign.
- Pagination beyond "Page 1" (no page-size control, no page numbers).
- Light theme: not present.

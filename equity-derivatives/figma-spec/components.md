# Equity Derivatives Auction — Components & control specs (Figma file vtP9aj7XLJ292TjETXmrum)

Harvester 2 of 5 (real components + controls as used in Section2). Read-only extraction via Plugin API.
Notation: `fill = grey dark (#373746)` means the paint is BOUND to the Collection 1 variable "grey dark". `(visual estimate)` = read from screenshot only, not from node data.
Font everywhere: **Lato Regular** (only style found in any component/control). Line-height `auto` and letter-spacing `0%` on EVERY text node surveyed (no explicit px line heights anywhere).
Heights/Widths are in px. "HUG/FIXED" = width hugs content, height fixed.

---------------------------------------------------------------------------------------------------

## 0. Inventory — what is on "drafts" (0:1) and "page for Isaak" (738:152)

### drafts 0:1 — 32 top-level nodes

REAL component definitions (current, used by Section2 as local instances):

| id | name | type | size |
|---|---|---|---|
| 76:274 | text input | COMPONENT | 235x32 |
| 134:218 | search | COMPONENT | 235x32 |
| 1001:744 | date | COMPONENT | 235x32 |
| 115:702 | dropdown | COMPONENT | 112x32 (HUG x FIXED) |
| 85:94 | time | COMPONENT | 106x32 (HUG x FIXED) |
| 85:128 | check | COMPONENT_SET (variants `Property 1=uchecked` 85:127, `=checked` 85:129) | 16x16 each; set 108x60 |
| 134:904 | button | COMPONENT_SET (variants `Default` 4:156, `Variant3` 261:1922, `disabled` 134:905) | 107x32 each; set 153x192 |
| 134:907 | button with arrow | COMPONENT_SET (`Default` 23:162, `disabled` 134:908) | 99x32 each; set 152x140 |
| 1001:283 | Table Header (Component) | COMPONENT, lives inside frame 1001:282 | 976x39 |
| 1001:745 | Table - Sheet1 | FRAME (a demo table made of instances of the header component) | 976x685 |

Old / duplicate SCREEN frames (all 1440x1024 unless noted) — obsolete drafts of screens whose canonical versions live in "final > Section2":
`1` 4:13, `2` 16:375, `3` 16:244, `4` 11:81, `6` 45:299, `Client Auction` 41:21 / 189:1406 / 189:1596, `Auction Summary` 189:2410, `Statics / Users` 134:219 / 166:351, `User (New & Edit)` 134:680, `New Client` 134:913, `Edit Client` 170:543, `Statics / Clients` 134:585, `New lever added` 48:759, `Trade Auction` 113:173 / 189:1729, `New auction` 61:81, `Log In` 131:192, `Acution Freeze time` 189:2009, `Client Auctions` 1000:429 (1920x1080).
Also: `Frame 15` 45:414 (855x364: early auction-card sketch — outlined orange-filled "Cancel v" header button + outlined "Cancel" buttons; OBSOLETE styling, superseded by red filled / red-transparent Cancel), `image 1` 41:19 and `image 2` 1000:663 (reference raster images).
None of the screen frames on drafts contain components that Section2 lacks, except the Table Header component (1001:283) and the `date` component (also instanced in Section2 1008:687).

### page for Isaak 738:152 — 4 top-level nodes, ALL screens, 0 component definitions
| id | name | size | verdict |
|---|---|---|---|
| 742:153 | Trade Auction | 1440x1024 | Visually identical to Section2 189:1104 (same "View as: Myself" dropdown, New Auction outlined button, Cancel Auction red button, Time Left chip, Aggregate/Global books). Duplicate/hand-off copy; uses local instances button 742:308/742:394 and dropdown 742:393. |
| 766:401 | Client Auctions | 1440x1024 | Earlier version of Section2 273:211 (has "LOGGED IN AS: BANK OF OG" text at top-right, no "Orders placed" Reject/Confirm panel, no dropdown menu; auction card 855 wide with 'Cancel v' button instances 766:533/766:614). OBSOLETE vs Section2 273:211. |
| 767:631 | Client Auctions | 1440x1024 | Variant of same (instances 767:763, 767:844). OBSOLETE vs Section2. |
| 956:169 | Acution Summary | 1440x1024 | Variant of Section2 273:1559 (instance 956:233). OBSOLETE vs Section2. |
Isaak instances found: button x2, button with arrow x5, dropdown x1 — all of the same drafts components. No additional control types on Isaak.

---------------------------------------------------------------------------------------------------

## 1. Shared control geometry (identical across ALL component definitions)

- Height **32**, `cornerRadius 4`, `clipsContent true`, no stroke, no effects (shadows) on any form control.
- Auto layout HORIZONTAL, main axis MIN (left), cross axis CENTER.
- Control fill = **grey dark (#373746)** for every input-like control (text input, search, date, dropdown, time, unchecked check).
- Text 14px Lato Regular, lh auto (hug height 17), ls 0%.
- Placeholder / empty text colour = **grey medium (#5B5D72)**. Entered value colour = **white (#F8F7FF)** (set per-instance as an override, see usage tables).
- Icon colour inside controls: leading icons (search, calendar) stroke = **blue (#7590FF)**; trailing glyphs (dropdown chevron, time arrows) fill = **grey light (#9597AD)**.

---------------------------------------------------------------------------------------------------

## 2. text input — 76:274

| prop | value |
|---|---|
| size | 235 x 32, sizing FIXED/FIXED |
| layout | HORIZONTAL, gap **12**, padding T10 R12 B10 L12, main MIN, cross CENTER |
| fill | grey dark (#373746) |
| stroke / effects | none / none |
| radius | 4 |
| child | TEXT 76:273 "Text", Lato Regular 14, lh auto, ls 0%, fill = grey medium (#5B5D72), HUG/HUG (26x17 for "Text") |

Usage (Section2): placeholder state = text grey medium; filled state = text overridden to white (#F8F7FF). Widths used: 235 (Log In, New Auction name), **184** (External Trader / Internal User first-name, last-name, username, client fields — 2-col modal), **400** (email, full-width modal field). Instance width is always FIXED (resized), height 32.

## 3. search — 134:218

Same as text input except:
- gap **8** (not 12)
- child 1: `lucide/search` frame 134:215 16x16 FIXED, clip; vector 134:216 12x12 at (2,2), **stroke blue (#7590FF) weight 1.5, align CENTER, no fill**
- child 2: TEXT 134:214 "Search" Lato Regular 14, fill grey medium (#5B5D72), HUG
Usage: same states; also used as a "Client" combobox-like field (External Trader modal: placeholder "Client" grey medium; filled "DEFGHI" white) and as "Client Name" field (New/Edit Client modal, 235 wide).

## 4. date — 1001:744

Same as search except icon = `lucide/calendar` (frame 1001:741, vector 1001:742 12x12 at (2,2), stroke blue (#7590FF), weight **1.3**, CENTER), text "dd/mm/yyyy" 14 Lato grey medium. Gap 8, pad 10/12/10/12. Definition width 235; used at **155** width (Client Auctions 1920x1080 audit-log "From"/"To": instances 1008:820 / 1008:823, parents Frame 109 / Frame 110).

## 5. dropdown — 115:702

| prop | value |
|---|---|
| size | 112 x 32, sizing **HUG** x FIXED |
| layout | HORIZONTAL, gap **40**, padding T10 R12 B10 L12 |
| fill | grey dark (#373746), radius 4, clip |
| child 1 | TEXT 115:698 "Name" Lato 14, grey medium (#5B5D72) |
| child 2 | GROUP 115:699 (11x6) containing VECTOR 115:700 11x6, **fill grey light (#9597AD)** (a filled chevron-down shape, not a stroke) |
Usage: "View as: Myself" (Trade Auction 189:1342, New Auction 261:2375): width hugs to **117**, text white (#F8F7FF) override. Parent Group 107.
**The dropdown OPEN menu is not a component** (see §14 menu).

## 6. time — 85:94

| prop | value |
|---|---|
| size | 106 x 32, HUG x FIXED |
| layout | HORIZONTAL, gap **12**, padding T10 **R8** B10 L12 |
| fill | grey dark (#373746), radius 4 |
| child 1 | GROUP 241:523 (64x17) with TEXT "00:00" 85:86 (37x17) and TEXT "min" 241:493 (23x17), both Lato 14 grey medium (#5B5D72) |
| child 2 | Frame 16 85:93 (10x24) VERTICAL, gap 0, main CENTER, containing two `lucide/arrow-big-down` frames (10x12 each, clip) with 8x8 vectors at (1,2), **fill grey light (#9597AD)**, vector corner radius 0.3. Top frame 85:87 has relativeTransform [[1,0,0],[0,-1,12]] (flipped vertically = UP arrow), bottom frame 85:91 normal (DOWN arrow). Stepper = up arrow above down arrow, whole stack 10x24 at x=88 inside the control. |
Usage (New Auction): instances 115:1927 and 115:1928, width 105, "05:00" overridden to white (#F8F7FF), "min" stays grey medium. This is the only stepper control in the file. Steps are not defined (no hover/pressed states).

## 7. check — 85:128 (COMPONENT_SET, property `Property 1`: uchecked | checked)

| variant | id | fill | radius | child |
|---|---|---|---|---|
| uchecked | 85:127 | grey dark (#373746) | 2 | `lucide/check` 16x16 with vector 10x7 at (3,4) — no stroke/fill (invisible) |
| checked | 85:129 | **blue (#7590FF)** | 2 | `lucide/check` 16x16 with vector 8x6 at (4,5), **stroke grey dark (#373746) weight 2, CENTER** |
Size 16x16, FIXED, clip, no border, no shadow. Layout HORIZONTAL gap 12 pad 0. State diff: fill grey dark -> blue; checkmark stroke grey dark (the "tick" is drawn in the unchecked colour). Used in modal tables first column (New Auction, Edit Client, Internal User).

---------------------------------------------------------------------------------------------------

## 8. button — 134:904 (COMPONENT_SET, property `Property 1`: Default | disabled | Variant3)

All variants 107x32, **HUG x FIXED**, radius 4, clip, HORIZONTAL, gap **10**, padding T6 **R32** B6 **L32**, main CENTER, cross CENTER. Text child "Button" Lato Regular 14 (43x17).

| variant | id | component fill | text fill |
|---|---|---|---|
| Default | 4:156 | **none (empty fill array)** — every instance sets its own fill | bg (#18181C) |
| Variant3 | 261:1922 | none — identical to Default in every measured property | bg (#18181C) |
| disabled | 134:905 | **grey medium (#5B5D72)** | **grey light (#9597AD)** |

No stroke, no effects in any variant. NO hover / pressed / focus variants exist.

### Button variants as USED in Section2 (instance overrides; all share pad 6/32/6/32, gap 10, radius 4, text 14 Lato)

| role (text) | fill | stroke | text colour | width x h | example ids |
|---|---|---|---|---|---|
| Primary / confirm-save: "Save Changes", "Add New" (statics pages) | **blue-green (#71E7FF)** | – | bg (#18181C) | 149x32 / 122x32 | 282:2727, 282:2312, 138:394 |
| "Add New" on list toolbar (New Client / Edit Client screens' underlay) | blue-green (#71E7FF) | – | bg | 122x**40** (height overridden to 40) | 170:785, 282:2595 |
| Log In | **blue (#7590FF)** | – | bg | **235**x32 FIXED/FIXED | 131:741 |
| Cancel / secondary in modals | **white (#F8F7FF)** | – | bg (#18181C) | 106x32 (106x40 in Internal User modal: 282:2446/2471) | 282:2536, 115:1931 |
| Confirm (Orders placed panel) / Start Now | **green (#3FF3C0)** | – | bg | 114x32 / 127x32 | 273:1159, 115:1929 |
| Cancel Auction (destructive) | **red (#FF6565)** | – | bg | 157x32 | 189:1257, 261:2290 |
| Reject (outlined destructive) | none | **red (#FF6565) 1px INSIDE** | red (#FF6565) | 103x32 | 273:1158 |
| New Auction (outlined primary) | none | **blue-green (#71E7FF) 1px INSIDE** | blue-green (#71E7FF) | 144x32 | 189:1343, 261:2376 |
| Start In (outlined warning) | **orange transparent (#4C3E3D)** | **orange (#FF982A) 1px INSIDE** | orange (#FF982A) | 109x32 | 115:1930 |
| Disabled "Add New" | (variant `disabled`) grey medium (#5B5D72) | – | grey light (#9597AD) | 122x32 | 170:813, 138:502, 282:2445 |
Border treatment: outlined buttons are the same component with fill removed and a 1px INSIDE stroke added; no effects.

## 9. button with arrow — 134:907 (COMPONENT_SET: Default | disabled)

**99x32**, HUG x FIXED, radius 4, clip, HORIZONTAL, gap **8**, padding T6 **R12** B6 **L24**, main/cross CENTER.
Children: TEXT "Button" (43x17, 14 Lato), then Frame 108 (261:1702) 12x12 FIXED containing VECTOR 8x4 at (2,4), no fill, **stroke 1px CENTER** = chevron-down.
| variant | id | fill | text | chevron stroke |
|---|---|---|---|---|
| Default | 23:162 | none (instance sets) | bg (#18181C) | bg (#18181C) |
| disabled | 134:908 | grey medium (#5B5D72) | grey light (#9597AD) | grey light (#9597AD) |
Usage: auction-card header "Cancel v": instances 273:633 etc., 98x32 (text "Cancel"), **fill red (#FF6565)** active; disabled = component variant (grey medium + grey light) at frozen/summary stage (273:808, 273:1534, 273:1671).
The Cancel-with-arrow button inside each instrument table header (right end of the title strip) is NOT an instance: see §12 (`red transparent` fill, red text/chevron, 112x40 / 98x?).

---------------------------------------------------------------------------------------------------

## 10. Table Header (Component) — 1001:283 + sheet 1001:745 (drafts)

Table frame 1001:745: 976 wide (FIXED) x HUG, VERTICAL, gap 0, pad 0, **fill bg (#18181C)**. Children: 1 header instance + 17 row instances, all FILL x HUG.
- **Header** 1001:746 (instance of the component): HORIZONTAL, gap 0, cross CENTER, height 39 = 38 cells + **bottom border 1px grey dark (#373746), INSIDE** (stroke weights T0 R0 B1 L0).
- **Row** (instances of the SAME header component with overrides, named "Table Row (Instance)"): height **38**, no stroke. **Zebra**: odd rows no fill (shows table bg #18181C), even rows **fill bg medium (#22222C)** (first body row none, second filled...).
- Cell: VERTICAL frame, height 38 (FILL), padding T12 R8 B12 **L8** (first column **L16**), main CENTER; cross MIN except `Side` column = CENTER. Child TEXT FILL/HUG (HUG for Side), **Lato Regular 12, lh auto, ls 0%**, left aligned. Column widths: Timestamp 182 FIXED (pad L16), Auction 230 FILL, Contract 230 FILL, Action 98 FIXED, Side 60 FIXED, Price 95 FIXED, Size 81 FIXED (976 total).
- Text colours: header = grey medium (#5B5D72); body default = grey medium (#5B5D72) (so body reads dimmer than the Section2 version which uses white — see §13); semantic colours in body: Action ENTER = blue (#7590FF), MODIFY = orange (#FF982A), EXECUTION = purple (#B694FF); Side BID = green (#3FF3C0), ASK = red (#FF6565).
- No hover/selected/sort states drawn. Section2 uses the same component only once: 1008:827 (audit log in 1008:687).

---------------------------------------------------------------------------------------------------

## 11. Auction card controls (NOT components — plain frames in Section2: 273:211, 273:1162, 273:1405, 273:1559, Trade Auction 189:1104)

Screens are built with absolute positioning (layoutMode NONE) except the chips/buttons below which are auto-layout frames. Positions given (x,y) relative to parent where useful.

### 11.1 Auction card shell — Frame 14 (e.g. 273:1180 / 189:650)
fill **bg lighter (#2D2E3B)**, radius **8**, clip. Width 795 (Client Auctions 273:211) / 855 (273:1162, Freeze, Summary) / full-width book layout in Trade Auction. Header strip 56 high with a 1px divider line at y=56: stroke **grey medium (#5B5D72)** 1px CENTER (273:1181). Inner padding to instrument tables = 16 (tables at x=16, first at y=72, then +147 / +114 stack: gap 8 between instrument tables, card bottom padding 16).
Header contents: `lucide/minimize` icon 24x24 at (16,16): **fill blue transparent 15 (#383D58)**, radius 4, clip; vector 10x10 at (7,7) stroke **blue (#7590FF) 1px CENTER**. Title group (60,12): "European CC 26/6" Lato 14 white (#F8F7FF) (114x17) over subtitle 12px (58x14) "Cash Close" = **blue-green (#71E7FF)** / "EFP" = **purple (#B694FF)** (visual estimate for EFP colour).
Header Cancel button = instance of `button with arrow` (98x32) at (card_w-114, 12) — see §9.

### 11.2 Status chip (Time Left / Starting in) — Frame 9 (273:1289, 273:1366, Freeze 273:1553, Summary 273:1672)
Auto-layout HORIZONTAL, gap **16**, padding T16 R24 B16 L12 (fixed height **32**, so vertical padding is irrelevant), main MIN, cross CENTER, radius **4**, clip. Width hugs: 151 ("Time Left:" + "03:32"), 155 ("Starting in:" + "04:59"), 150 ("00:15"/"00:00").
Label text Lato 14 (colour per state), value text Lato 14 **white (#F8F7FF)**.

| state | chip fill | stroke | label colour | value |
|---|---|---|---|---|
| Time Left (running) 273:1289 | **blue transparent 15 (#383D58)** | – | blue (#7590FF) | white |
| Starting in 273:1366 | **orange transparent (#4C3E3D)** | – | orange (#FF982A) | white |
| Time Left, last seconds (Freeze 273:1553, "00:15") | **red error transparent (#4E3234)** | – | red (#FF6565) | white |
| Time Left, ended (Summary 273:1672, "00:00") | none | **red (#FF6565) 1px INSIDE** | red (#FF6565) | white |
(Note: label red here is `red` #FF6565 but the fill token is the `red error transparent` tint #4E3234 — as drawn.)

### 11.3 Equilibrium Price chip — Frame 3 (273:1196 etc.), 197x40, flush to the right of the title row (x=514 in 855-card, 454 in 795-card), height 40 = table title row
Auto-layout HORIZONTAL, gap **4**, padding T11 R24 B11 L24, cross CENTER, **fill purple #B694FF at 20% paint opacity (raw paint @0.2, NOT bound to a variable)**. No radius, no stroke. Label "Equilibrium Price:" Lato 14 **purple (#B694FF)** (107x17), value ("18.50", "-", "42.8") Lato 14 **white (#F8F7FF)**. Same in every state (also frozen/ended); it is not greyed when auction freezes.

### 11.4 Table-header action button "Cancel v" (frame, 112x40, NOT the component) — 273:1207 (and per instrument)
Auto-layout HORIZONTAL gap **8**, padding T11 R12 B11 L24, main/cross CENTER, clip, no radius (square, sits flush right in the 40px title row). Children: TEXT "Cancel" Lato 14 (42x17), chevron Frame 108 12x12 with vector 8x4 at (2,5) stroke 1px CENTER no fill.
| state | fill | text | chevron |
|---|---|---|---|
| active | **red transparent (#432C35)** | red (#FF6565) | red (#FF6565) |
| frozen/disabled (273:1451, 273:1482) | **grey dark (#373746)** | **grey medium (#5B5D72)** | grey medium (#5B5D72) |
| before start (273:762) | grey dark (#373746) | (same disabled look) | |
Width 112 in all screens (at x = table_w − 112).

### 11.5 Instrument table (e.g. Frame 8 273:572 / 273:1182)
Container: **fill bg medium (#22222C)**, radius **8**, clip, width 763 (795-card) / 823 (855-card), height 139 for 2 rows (title row 40 + header row 33 + 33 per body row; 106 for 1 row).
Geometry (relative to table): title row 0–40: instrument name Lato 14 white at (16,12); "min size: N" Lato **12** **grey light (#9597AD)** (70x14) at x = name_right+8 (y=14). Row separators (LINE, stroke 1px CENTER **grey dark (#373746)**): y=40 (under title), y=73 (under column-header row), y=106, y=139 (under each body row). Vertical separators (LINE, grey dark 1px) start y=41 under the header row, at x=273/557/763 (columns 1|2|3|4).
Column header text (Size, Bid, Ask, Size, Spread) Lato 14 **grey medium (#5B5D72)**, y=48; body text Lato 14 **white (#F8F7FF)**, y=81 / 114, **right-aligned in fixed-width text boxes (25x17 for 3-digit sizes, 28/36 for prices)** — values are centred in their column visually (box x chosen by hand: Size cell x=45..70 etc.). Body row height 33 (row line to line), header row height 33.
Row icons (plain VECTOR 12x12, solid fill): remove-order x at (x≈245 bid side, 529 ask side) **fill red (#FF6565)** (circle with x, the glyph shows in screenshots as a red filled circle with white x — visual); add-order "+" at (787, y) **fill blue (#7590FF)**.
Column grid in the 855-card table (823 wide): bid pair cell 0–273 (Size text box x=66 w25, Bid text box x=161..164; remove-x icon x=245), ask pair cell 273–557 (Size text x=343, Ask text x=436, remove-x icon x=529), Spread cell 557–763 (value x=645 w28), action column 763–823 (add "+" icon x=787). In the 795-card table (763 wide) the same cells shrink: bid pair 0–273, ask pair 274–557, spread 557–763 (spread text x=638..645), action column absent (Cancel-with-arrow button right-aligned x=651..763). Vertical separator lines (grey dark 1px) start under the column-header row at y=41 at x=273 / 557 / 763. Positions are absolute (no auto layout). In the 855-card (lever/freeze/summary) screens: body row text y=81 (row 1) / y=114 (row 2), 33px pitch.

### 11.6 Inline order inputs (bid/ask cell) — drawn as bare rectangles over the table (NOT a component)
Cell rectangle (RECTANGLE) 273x32 (Size+Bid pair) or 283x32 (Ask pair incl. icon), placed at y=74 over the first body row (row line 73). Styles as drawn:
| state | node | fill | stroke | notes |
|---|---|---|---|---|
| default | (no rectangle; plain text) | – | – | text white #F8F7FF |
| focus / valid ("In the mix") | 273:1146 273x32 at (0,74) | none | **green (#3FF3C0) 1px INSIDE** | radius 0 |
| partially in the fill | 273:1282 (lever screen) 283x32 | none | **yellow (#FFCE53) 1px INSIDE** | |
| error (bid>=ask) | 273:1144 283x32 at (274,74) | none | **red error (#FF7553) 1px INSIDE** | |
| new row highlight | 273:1404 (lever screen, 823x32 at y=107) | **blue-green transparent (#374A58)** | – | row background tint for newly added level |
| empty entry (before start) | 937:158 114x33 at (0,73) | **bg (#18181C)** | **blue transparent 60 (#7590FF @0.6) 1px INSIDE**, radius BL 8 | focused size input, typed value "10|" white; |
| empty entry inactive | 937:160 114x32, 937:162 43x32 | bg (#18181C) | – | pre-start placeholders "0" grey medium (#5B5D72) |
Typed-value text: white (#F8F7FF) 14 Lato (with "|" caret char in the text string, e.g. "10|"); placeholder "0" grey medium.

### 11.7 Feedback chips (floating "tooltips" above a cell) — Frame 11 (273:1147, 273:1141, 273:1283), height 30
Auto-layout HORIZONTAL, gap **8**, padding T8 R12 B8 L12, main/cross CENTER, radius **4**, clip, **effect DROP_SHADOW #22222C (alpha 1) x -2 y 4 blur 8 spread 0**. Text Lato **12** (14 high), no icon baseline alignment.
| chip | id | fill | text | icon | width |
|---|---|---|---|---|---|
| In the mix for equilibrium price calculation | 273:1147 | **green dark (#264142)** | green (#3FF3C0) | `check` 12x12 circle: frame fill **green (#3FF3C0)** radius 24 (full circle) with `lucide/check` vector 6x4 at (3,4) **stroke bg (#18181C) 1px** | 265 |
| Bid should be lower that Ask (sic) | 273:1141 | **red error transparent (#4E3234)** | **red error (#FF7553)** | warning-triangle vector 14x12 fill red error (#FF7553) | 197 |
| Partially in the fill | 273:1283 | **yellow transparent (#4E4134)** | **yellow (#FFCE53)** | 2 ellipses 12x12 (half-filled circle: Ellipse 16 fill yellow #FFCE53 stroke yellow 1px INSIDE, Ellipse 17 stroke yellow 1px INSIDE) group 14x12 | 137 |
Position: chips sit just above the first body row, overlapping the column header row (y=48 within the table).

### 11.8 Toast / notification panels
| panel | id | fill | radius | shadow | layout | text |
|---|---|---|---|---|---|---|
| New level toast (Lever screen) | 189:984 322x41 | **bg lighter (#2D2E3B)** | **6** | DROP_SHADOW #18181C x-2 y4 blur 8 | HORIZONTAL gap 8 pad 12/16/12/16 center, clip | "New level for FTSE 100 IDX FUT Sep25 added!" Lato 14 **blue-green (#71E7FF)**; panel placed at (1094,77) top-right, right edge at 1416 |
| Orders placed panel (273:1155) 328x114 | | bg lighter (#2D2E3B) | 6 | DROP_SHADOW #18181C x-2 y4 blur 8 | VERTICAL gap 16 pad 16 all, center | one TEXT node 296x34 (2 lines, 14px both): line 1 "Orders placed:" **grey light (#9597AD)**, line 2 "Your Buy EURO STOXX 50 Sep25 CC: 400 @ 41" **white (#F8F7FF)**; child Frame 105 296x32 HORIZONTAL SPACE_BETWEEN gap 12 holding Reject (outlined red, 103x32) and Confirm (green fill, 114x32) button instances |

### 11.9 Dropdown menu (opened "Cancel v" menu) — Frame 13 (189:819), 112x115 at (667,260)
**fill grey dark (#373746)**, radius **4**, **DROP_SHADOW #18181C x-2 y4 blur 6**; items = bare TEXT "All Bid", "All Ask", "All" (Lato 14, **white #F8F7FF**), left x=16, y = 16 / 49 / 82 (**33px item pitch, 16 top padding**); no separators; no hover/selected fill drawn. Opens directly below the table-header Cancel (menu x = button x).

---------------------------------------------------------------------------------------------------

## 12. Other controls drawn directly in Section2 (not components)

### 12.1 Tabs (Clients / External Traders / Internal Users) — Clients 282:2059, External Traders 282:2180
Tab strip sits at the top of Frame 14 (282:2078: 1336x892, fill **bg medium (#22222C)**, radius 8, clip). Tab height **40**, auto layout HORIZONTAL gap 10, **padding T12 R56 B12 L56**, center/center, clip, **top corners radius 6** ([6,6,0,0]). Tabs sit side by side, width = text + 112: Clients 160, External Traders 211, Internal Users 198 (x = 0 / 160 / 371). Content panel below (Frame 23 282:2079, 1336x852 at y=40): fill **bg lighter (#2D2E3B)**.
| state | node | fill | stroke | text |
|---|---|---|---|---|
| selected | Frame 5 282:2154 | **blue transparent 15 (#383D58)** | **blue (#7590FF) 1px, bottom only (T0 R0 B1 L0), INSIDE** | Lato 14 **blue (#7590FF)** |
| unselected | Frame 4 282:2150 / Frame 24 282:2152 | none (shows bg medium behind) | none | Lato 14 **grey light (#9597AD)** |
Hover/pressed/focus tab states: not drawn.

### 12.2 Segmented control (Cash Close | EFP) — New Auction modal, Group 3 115:1913, 336x32
Two segments, each 32 high, padding T12 R56 B12 L56, gap 10, center/center, clip.
| segment | node | width | fill | radius | text |
|---|---|---|---|---|---|
| selected "Cash Close" | 115:1916 | 180 | **#374A58** (same RGB as variable "blue-green transparent"; in the node dump the paint is NOT variable-bound) | 4 (all corners) | Lato 14 **#71E7FF (blue-green; unbound)** |
| unselected "EFP" | 115:1914 | 160 | **bg medium (#22222C)** | **[0,4,4,0]** (right corners only) | Lato 14 **grey light (#9597AD)** |
Selected segment (x=556) overlaps the unselected one (x=732) by 4px. No stroke, no shadow.

### 12.3 Toggle switch (Active / Inactive) — External Traders 282:2180 modals; Edit Client 282:2538
Group 32x16: track RECTANGLE 32x16 radius **12**; thumb ELLIPSE 12x12 **fill white (#F8F7FF)** with **DROP_SHADOW #1D3C31 @0.6, x -1, y 1, blur 3, spread 0**. Groups are rotated -180 in the file, so raw x offsets read mirrored; positions below are from the screenshots (visual estimate).
| state | node | track fill | thumb | label |
|---|---|---|---|---|
| Inactive | 138:513 | **grey light (#9597AD)** | left end (visual estimate) | "Inactive" Lato 14 **grey light (#9597AD)** (138:516) |
| Active | 282:2344 (also 282:2733 in Edit Client) | **green (#3FF3C0)** | right end (visual estimate) | "Active" Lato 14 **white (#F8F7FF)** (282:2327) |
Track x=56..88 in the group, label text at x=68 (rotated-coordinate values; visually the label is right of the track, ~12px gap (visual estimate)). Row y=312 in a 409-high modal. No focus/hover/disabled state.

### 12.4 Modal / dialog — "new external trader" 138:499 (448x409), New Auction 115:1871 (916x410), Edit Client 282:2538 (~720 wide)
fill **bg lighter (#2D2E3B)**, radius **8**, clip, no stroke, no shadow. Title: Lato **18** (22 high) **white (#F8F7FF)**, centred, y=16. Title divider: LINE full modal width at y=54, stroke **grey medium (#5B5D72) 1px CENTER**. Content inset left/right **24** (modals 448 / 720) or **25** (New Auction: table x=25 w=867). Field label: Lato **12** (14 high) **grey light (#9597AD)** at y=78 / 156 / 234, input directly below at y=100 / 178 / 256 (22 below label; row pitch 78); 2-column layout x=24 and x=240, inputs 184 wide (email 400 wide). Footer buttons y=353: left Cancel (white fill, x=24), right primary (Save Changes 149 / Add New 122), right edge at modal_w-24; bottom margin 24 (353+32+24=409).
Backdrop: full-screen overlay Frame 17 (115:1870, 1373x1024 at x=64): **fill bg (#18181C) at 0.5 paint opacity + BACKGROUND_BLUR radius 12**, clip (sidebar 64px stays outside the overlay).
Edit Client modal text: "Client Name" label Lato 12 grey light (282:2625); "Makor X ID" Lato 14 grey light (282:2626) over value "002" Lato 14 white (282:2627); "Client User List" Lato 14 grey light (282:2645); toggle row "Active" at the bottom. A vertical scrollbar is visible at the right edge of the inner user table (visual estimate: thin ~4px bar; not located as a named node).
Modal inner table (New Auction Frame 3 115:1872, 867x165 at (25,118)): fill **bg medium (#22222C)**, radius **4**, clip; header row 33 high, header text **grey medium (#5B5D72)** Lato 14; body row pitch 33; 1px lines **grey dark (#373746)** at y=33/66/99/132; check instance at x=8 (y=41/74/107/140), body text Lato 14 **white (#F8F7FF)**; column text x = 75 / 216 / 398 / 618 / 795 (Underlying / Generic Symbol / Active Contract / Description / Min Size).
"Upload File" button (115:1919, 152x40): HORIZONTAL gap 8, padding T10 R24 B10 L24, fill **blue transparent 15 (#383D58)**, radius 4, text Lato **16** (19 high) **blue (#7590FF)**, icon `lucide/file-up` 16x20 fill blue (#7590FF). Only ghost-style 40px button in the file.
"Auction Duration" label (115:1926) Lato 14 white; `time` instance 105x32 next to it.

### 12.5 Row action / status icons (Clients table)
24x24 frames (clip) with a stroke vector: `lucide/square-pen` (edit) vector 16x16 at (4,4) stroke **orange (#FF982A) 1.5 CENTER**; `lucide/rotate-ccw-key` (reset password) vector 18x18 at (3,3) stroke **blue (#7590FF) 1.5 CENTER**; Active indicator `check`: 16x16 **fill green (#3FF3C0), radius 16** (circle), `lucide/check` vector 8x5.5 at (4,5.25) stroke **grey dark (#373746) 1.5**; blank when inactive. Makor X ID values: Lato 14 white (#F8F7FF) with UNDERLINE; Users count: Lato 14 **blue (#7590FF)** with UNDERLINE. Icon x in a 1312-wide table: key 1208, pen 1256.

### 12.6 Login (131:720)
Card Frame 22 (131:721): 312x416 at (564,304), **fill bg medium (#22222C)**, radius **12**, VERTICAL gap 56, padding T40 R48 B40 L48. Fields: `text input` instance 235x32 (131:725, value "mshepley" white #F8F7FF); password field 131:727 is a plain frame 236x32 (fill grey dark #373746, radius 4, gap 12, pad 10/12/10/12, SPACE_BETWEEN) with "Forgot Password?" link Lato 14 **blue (#7590FF)** below it (131:740, at (165,285)). Button: `button` instance 235x32 FIXED/FIXED **fill blue (#7590FF)**, "Log In" text bg (#18181C). No error state exists among the Section2 Log In children.

---------------------------------------------------------------------------------------------------

## 13. Section2 tables vs the drafts component table

### 13.1 Order-book tables (Trade Auction 189:1104: Aggregate Book / Global Order Book)
Card Frame 14 189:1105: 1336x682, fill bg lighter (#2D2E3B), radius 8. Aggregate (left) tables Frame 3 189:1110 (839x205 at x=16): **fill bg medium (#22222C)**, radius 8, clip. Global Order Book tables Frame 5 189:1258 (457x205 at x=863): **fill bg (#18181C)**, radius 8, clip. Equilibrium chip at x=642 (197x40) in the aggregate tables. Highlight rectangles 189:1163 / 189:1164 (190x32 at (0,74) / (540,74)): **stroke green (#3FF3C0) 1px INSIDE, no fill** (cells of the user's own order). Sizes follow the same title 40 / header 33 / body 33 grid as §11.5. Section captions "Aggregate Book" / "Global Order Book" (Lato 14 grey light — visual estimate). "View as:" label Lato 14 **grey light (#9597AD)** + dropdown (Group 107 261:1953 184x32).

### 13.2 Audit-log table (Section2 1008:687) — instance of Table Header (Component) 1008:827
Card Frame 113 (1008:813; 998x741, radius 8) = title bar Frame 112 (998x56, fill bg lighter #2D2E3B) + table 1008:826 (998x685, **fill bg medium (#22222C)**). Header = component instance (39 high; bottom border 1px grey dark #373746; text 12px grey medium #5B5D72). Body rows are **detached plain frames named "Table Row (Instance)"**, 38 high; **zebra: 2nd/4th... rows fill bg lighter (#2D2E3B)**, others none (shows #22222C). Cell padding T12 R8 B12 L8 (first col L16). Body text **12px white (#F8F7FF)**; Action: ENTER blue (#7590FF), MODIFY orange (#FF982A), EXECUTION purple (#B694FF); Side: BID green (#3FF3C0), ASK red (#FF6565). Title bar: "Audit Log" + "From" date + "To" date (155x32 `date` instances) + download icon button (visual estimate: ~32x32 outlined blue square with arrow icon; not measured).
Diff drafts sheet 1001:745 -> Section2 1008:826: table bg #18181C -> #22222C; zebra fill #22222C -> #2D2E3B; body text grey medium (#5B5D72) -> white (#F8F7FF); width 976 -> 998.

### 13.3 Statics tables (Clients 282:2080 etc.)
Frame 3 282:2080: 1312x796 at (12,56) inside the content panel; **fill bg medium (#22222C)**, radius **[8,8,0,0]**, clip. Header row text Lato 14 **grey medium (#5B5D72)** at y=12; row lines (1px **grey dark #373746**, full width 1312) at y=41 / 82 / 123 / 164 / 205 -> header 41 high, body row pitch **41**. Body text Lato 14 **white (#F8F7FF)**. Vertical column separators exist (visual) but were not individually measured. Rows are plain text nodes, not instances. Toolbar above the table: `search` instance 235x32 at (16,12) and `button` Add New 122x32 (fill #71E7FF) at x=1202.

---------------------------------------------------------------------------------------------------

## 14. Icons used in controls

| icon | where | frame | glyph | colour |
|---|---|---|---|---|
| lucide/search | search control | 16 | 12 at (2,2) | stroke blue (#7590FF) 1.5 |
| lucide/calendar | date control | 16 | 12 at (2,2) | stroke blue (#7590FF) 1.3 |
| chevron-down (filled shape) | dropdown control | 11x6 group | 11x6 | fill grey light (#9597AD) |
| chevron-down (stroke, "Frame 108") | button with arrow / table Cancel | 12 | 8x4 at (2,4 in component / 2,5 in table button) | stroke 1px: bg (#18181C) default instance; red (#FF6565) table button; grey medium (#5B5D72) frozen table button; grey light (#9597AD) disabled variant |
| lucide/arrow-big-down x2 (top one flipped) | time stepper | 10x12 each | 8x8 at (1,2) | fill grey light (#9597AD) |
| lucide/check | check control | 16 | 8x6 at (4,5) | stroke grey dark (#373746) 2 (checked only) |
| check circle | In-the-mix chip (12) / Active column (16) | 12 / 16 | 6x4 / 8x5.5 | disc green (#3FF3C0); tick stroke bg (#18181C) 1 / grey dark (#373746) 1.5 |
| lucide/minimize | auction card collapse | 24 tile (fill #383D58, r4) | 10x10 at (7,7) | stroke blue (#7590FF) 1 |
| lucide/square-pen | edit action | 24 | 16 at (4,4) | stroke orange (#FF982A) 1.5 |
| lucide/rotate-ccw-key | reset action | 24 | 18 at (3,3) | stroke blue (#7590FF) 1.5 |
| lucide/file-up | Upload File | 16x20 | boolean | fill blue (#7590FF) |
| remove-order | order rows | 12x12 vector | – | fill red (#FF6565) |
| add-level | order rows | 12x12 vector | – | fill blue (#7590FF) |
| warning triangle | error chip | 14x12 vector | – | fill red error (#FF7553) |
| half-filled circle | partial-fill chip | 14x12 group | – | yellow (#FFCE53) fill + 1px stroke |

---------------------------------------------------------------------------------------------------

## 15. Obsolete vs current (summary)

Current: the 8 control components + Table Header component on drafts (all instanced in Section2) and Section2's hand-built chips / tabs / toggles / segmented / modals / validation chips / toasts above.
Obsolete: all screen frames on drafts (older iterations); button `Variant3` (identical to Default, unused in Section2); `Frame 15` 45:414 (orange-filled / orange-outlined Cancel, superseded by red fill / red-transparent Cancel); the entire "page for Isaak" (4 older/duplicate screens, no new components); drafts sample table 1001:745 colours (superseded by Section2 1008:826).

---------------------------------------------------------------------------------------------------

## GAPS (only what I searched for; not found in the file)

Searched: COMPONENT/COMPONENT_SET definitions on drafts 0:1; INSTANCE nodes on Isaak 738:152; every INSTANCE (by main component) in Section2 1033:172; screen outlines for Trade Auction, New Auction, Client Auctions (2), lever, freeze, summary, Clients, External Traders, Log In.
- **Buttons**: no hover, pressed, focus, loading or error variants (only Default / Variant3 (identical) / disabled). The role colours (blue-green, blue, white, green, red, outlined red / blue-green / orange) exist ONLY as per-instance fill/stroke overrides; no secondary/ghost/danger variants are defined. No icon-only button component. Height 40 appears only as one-off overrides (170:785, 282:2595, 282:2446, 282:2471).
- **Text input / search / date / dropdown / time**: no hover, focus, active, error, disabled or filled variants (filled = white text override on the same component). No helper/error text, no required marker, no label component (labels are loose 12px text). No date-picker or time-picker popover. No option list for the dropdown component (only the "All Bid / All Ask / All" Cancel menu as a bare frame; no hover/selected option row).
- **Stepper (time)**: no hover/disabled per arrow; no min/max.
- **Check**: no indeterminate, disabled, hover or focus; no radio component; no header select-all check.
- **Toggle / Tabs / Segmented**: not components; no hover, focus, disabled.
- **Chips**: not components; Time Left has 4 colour states; no generic badge/pill; client "Active" = green check icon only.
- **Tooltip**: only the 3 validation chips; no generic tooltip, pointer arrow, placement rules, or icon hover tooltips.
- **Table**: no row hover, selected row, sort indicator, pagination, sticky header, resize, empty-state, skeleton. Selection only via 1px coloured cell outlines / #374A58 row tint.
- **Inline order-entry cell**: no component; states are separate rectangles (focus green, error red-orange, partial yellow, typing blue 60%); no disabled beyond grey text on frozen cards.
- **Toasts**: two loose frames only; no variants (success/error/info), no close button, no timing.
- **Modal**: not a component; no close (x), no overflow/scroll rule.
- **Focus rings**: none in the file (focus = 1px INSIDE coloured border on order cells only).
- **Disabled states**: only buttons and greyed card/table text in frozen stages; none for form controls.
- **Other modes / light theme**: none seen.
- Not measured: sidebar (other harvester), scrollbar thumb, vertical column lines in statics tables, audit-log download icon button, "Aggregate Book"/"Global Order Book" caption styles (visual only).


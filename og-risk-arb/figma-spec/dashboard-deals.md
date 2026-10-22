# OG Risk Arb - Dashboard and Deal Lists (Figma harvest)

File VlOfBG6fJt7ijm0iKasAMP, page "final" 48:850. Read-only harvest via Plugin API (exact values). All text is Geist, line-height AUTO, letter-spacing 0 unless noted. Colours are hex; `@n` = paint opacity n. Fill/stroke alignment as stated. "(visual)" = read from screenshot only.

Notation: `pad T/R/B/L`, `gap`, `main/cross` = Figma primary/counter axis align (MIN=start, CENTER, MAX=end, SB=space-between). Sizing H/V: FIXED, HUG, FILL.

---
## 0. Palette actually used in these screens

| Token role | Hex |
|---|---|
| Brand teal (links in tables/panel titles, active toggle, checkbox fill, buttons) | #005268 |
| Blue (Actual, links in Recent Updates, selected day, Join meeting, A-Z hover, bookmark) | #3675D2 |
| Slate blue (only as Cash Merger pill text; comment authors in Recent Updates are #005268 in the file, not #4162A3) | #4162A3 |
| Grey surface | #F5F5F8 |
| Grey border | #E5E7EC |
| Grey mid text | #7C8DAC |
| Grey light text | #A8B6CD |
| Faint surface (expanded description row) | #FBFBFC |
| Orange (bell, today chip, reset-all, edit icon) | #FF8132 |
| Yellow (risk Low) | #ECA100 |
| Red risk High | #DA4D43 (text) ; trash icon #DA4D43 |
| Teal-green (Recent Updates type label + icon) | #179484 |
| Text | #000000 (pure black everywhere) |
| White | #FFFFFF |

Fonts used: Geist Regular, Geist Medium, Geist SemiBold (SemiBold = event/update titles, table header on All Deals screens, Deal Value). Sizes seen: 10, 12 (base), 14, 16.

---
## 1. Dashboard screen 414:2798 (1920x1080) - geometry

Outer chrome (other harvester; position only): Nav min 2044:6454 at (0,0) 72x1032; Search/top bar "Frame 15" 1567:4503 at (72,0) 1848x64; tab strip "Frame 80" 414:2891 at (88,72) 1784x32 (tab 32h; Dashboard 110w, Events Calendar 140w, All Deals 109w with close icon, AHL / 8630 JT 142w, Cash Bankrupcy 151w).

Main card "Frame 1000001046" 1612:4365: abs (88,103) 1784x929. Fill none, stroke #E5E7EC 1px INSIDE, radius [0,8,8,8] (TL 0, TR 8, BR 8, BL 8). Auto-layout HORIZONTAL, pad 16, gap 8, main MIN, cross CENTER. Clips: no.

Three panels (absolute coordinates on the 1920x1080 frame; panel y = 119, h = 897):

| Panel | Node | Abs x | Abs y | W | H | Sizing | Fill | Stroke | Radius | Clip |
|---|---|---|---|---|---|---|---|---|---|---|
| All Deals | 414:3116 | 104 | 119 | 952 | 897 | FILL x FILL | none | #F5F5F8 1 INSIDE | 8 | yes |
| Upcoming Events | 414:2969 | 1064 | 119 | 420 | 897 | FIXED x FILL | #3675D2@0.05 | none | 0 | yes |
| Recent Updates | 414:2801 | 1492 | 119 | 364 | 897 | FIXED x FILL | #E2E2E2@0.25 | #F7F7F7 1 INSIDE | 8 | yes |

(Panels are siblings with gap 8: 104+952=1056, 1064+420=1484, 1492+364=1856, right pad 16 to 1872.) Each panel is a VERTICAL auto-layout gap 0 (All Deals: gap 12, pad 0).

---
## 2. All Deals panel (dashboard) 414:3116

Skeleton: VERTICAL, gap 12, pad 0, 952x897.

### 2.1 Title row "Frame 331" 414:3117
952x48, FILL x HUG, HORIZONTAL, pad 8/8/8/16, gap 12, main SB, cross CENTER. Stroke #E5E7EC 1px bottom only, INSIDE. No fill.
- Title wrapper 1526:6305: 661x18, FILL x HUG, HORIZONTAL gap 4, cross CENTER. Text "All Deals" 414:3120: Geist Medium 14, colour #005268, UNDERLINE, hug 58x18.
- Segmented toggle "Frame 1000001014" 1526:6273: at (677,8) 267x32, HUG x HUG, fill #F5F5F8, radius 4, HORIZONTAL gap 1, cross CENTER.
  - ACTIVE segment "Open Deals" 1526:6274: 129x32 (HUG x FIXED 32), fill #005268, radius 4, pad 12/32/12/32, gap 16, main/cross CENTER. Text Geist Medium 12 #FFFFFF.
  - INACTIVE segment "Closed Deals" 1526:6276: 137x32, no fill, radius 0, pad 12/32/12/32, stroke #FFFFFF 1px LEFT only (CENTER align) acts as divider. Text Geist Regular 12 #000000.
  - (Inactive is simply the same frame with no fill, Regular weight, black text. Hover/pressed not defined.)

### 2.2 Body "Frame 1000001048" 1615:4399
Abs inside panel (0,60) 952x841, VERTICAL, gap 12, pad 0/8/0/16 (T/R/B/L), FILL x HUG.

#### 2.2.1 Filter pill row "Frame 1000001015" 1526:6283
At (16,0) 735x28, HORIZONTAL gap 8, HUG x HUG.
- Pill ACTIVE ("All") 1526:6281: 63x28, fill #005268@0.1, stroke #005268 1px INSIDE, radius 16, pad 6/24/6/24, gap 10, centred. Text Geist Medium 12 #005268.
- Pill DEFAULT 1526:6279 ("Cash Deals 21"): 111x28 (HUG x FIXED 28), fill #F5F5F8, no stroke, radius 16, pad 6/4/6/16 (T/R/B/L), gap 8, centred. Label Geist Regular 12 #000000.
  - Count bubble "Frame 1000001047" 20x20 FIXED, fill #E5E7EC, radius 24, VERTICAL pad 0/2/0/2 gap 10, centred. Number Geist Medium 10 #7C8DAC, centre-aligned, FILL x HUG, 16x13.
- Pills (id, w): All 1526:6281 (63); Cash Deals 1526:6279 (111, count 21); Cash-Stock Deals 1615:4379 (148, 16); Stock Deals 1615:4384 (115, 8); Exchange Deals 1615:4389 (136, 4); Spinoff Deals 1615:4394 (122, 2). x offsets within row: 0, 71, 190, 346, 469, 613.
- Hover/pressed: not defined.

#### 2.2.2 Rail + table row "Frame 1000001017" 1526:6296
At (16,40) 928x801, HORIZONTAL gap 8, pad 0, FILL x FIXED 801.
- A-Z rail "Frame 1000001022" 1541:3215: x0, 24x578, VERTICAL gap 6, pad 0, HUG x HUG, 26 letter cells (each FILL x HUG, VERTICAL pad 0/4/0/4 gap 10, centred, text centre-aligned FILL width 16).
  Letter states as drawn (fisheye magnifier, H is the hovered/active letter):
  | Letter | Size/Weight | Colour | Cell |
  |---|---|---|---|
  | A | 12 Medium | #000000 | 24x16 (first letter, black - "current/default"; interpretation) |
  | B-F, J-Z | 12 Medium | #A8B6CD | 24x16 |
  | G and I (neighbours) | 14 Medium | #3675D2@0.9 | 24x18 |
  | H (active) | 16 Medium | #3675D2 | 24x24 FIXED, fill #3675D2@0.1, radius 24 (circle) |
  All cells are Geist Medium, line-height auto. Sums: 24 wide throughout; gap 6.
- Table frame "Frame 1000000931" 1463:6125: x32, 884x796 (FILL x FIXED 796), VERTICAL gap 0, clip, stroke #E5E7EC 1px OUTSIDE, radius [4,4,0,0]. No fill.
- Scroll instance "Scroll" 1526:6293: at (924,0) 4x800 FIXED. Track Rectangle 6: 4x800 fill #E5E7EC radius 16. Thumb Rectangle 7: 4x435.06 fill #A8B6CD radius 16 (thumb length is design-time; proportional, top-aligned). No hover state.

### 2.3 Deals table (dashboard)
Column widths (sum 884): Deal Title 312, Start Date 110, End Date 110, Status 167, Deal Type 185.

HEADER row "Table Header (Component)" 1463:6126: 884x32 (FILL x FIXED 32), fill #F5F5F8, stroke #E5E7EC bottom 1px INSIDE, HORIZONTAL gap 0 pad 0, cross CENTER.
- Cell (each h31): stroke #E5E7EC RIGHT 1px INSIDE (last cell Deal Type has no stroke), HORIZONTAL pad 4/12/4/8 (T/R/B/L), main SB, cross CENTER, clip. Title Geist Medium 12 #000000. Alignment: Deal Title / Status / Deal Type text LEFT; Start/End Date text CENTER (frame text align; in SB layout they sit left at x=8 as hug text).
- Sort icon (Deal Title, Start Date, End Date): VECTOR 12x10, stroke #7C8DAC 1px CENTER, no fill, positioned at right (cell x 288 in 312 cell, 86 in 110 cells). (Arrow-up-down glyph visual.) Names "Vector" - no icon component name.
- Status filter icon: VECTOR 12x12 stroke #7C8DAC 1px at x143.
- Deal Type filter icon: component `lucide/funnel` 16x16 clip, inner vector 12x12 at (2,2) stroke #7C8DAC 1px.
- Sort-active / filter-active states: not defined.

BODY: container "Frame 1000000930" 1463:6145, VERTICAL gap 0, no fill. 24 rows (wrapper per row = "Table Row (Instance)" is the row itself here).
ROW: FILL width 884, fill #FFFFFF, stroke #E5E7EC bottom 1px INSIDE, HORIZONTAL gap 0 pad 0, cross CENTER.
- Fixed-height rows: h32 (FIXED) -> cell h31 + 1px row border. HUG-height rows: single line = 25 (text 16 + cell pad 4+4 = 24 cell + 1 border) e.g. GDI row 1482:3988; two-line wrapped = 41 (text 32 + 8 pad + 1) e.g. JHG row 1482:4040 (title text 296 wide wraps in 312 cell). Rows 8, 11 are 25; row 12 and 19 are 41; all other rows 32.
- Cell: stroke #F5F5F8 RIGHT 1px INSIDE (last cell none), VERTICAL pad 4/8/4/8, gap 0, main CENTER, cross MIN, clip, text FILL x HUG left-aligned.
- Deal Title text: Geist Medium 12 #005268 UNDERLINE (teal link). Date/Status/Type text: Geist Regular 12 #000000, left aligned. (Dates are LEFT here; on the All Deals screens dates are CENTER.)
- ALL ROWS ARE WHITE (#FFFFFF). There is NO zebra, NO hover and NO selected row state anywhere in the file (all 24 rows have identical fill/stroke). Status and Deal Type are plain text on the dashboard (no pills).
- Data in file: 24 rows, titles A..S ordering, last row repeats row 0.

### 2.4 Row text content of dashboard (for reference)
Status values shown: Predeal, Terminated, Proposal, Definitive, Withdrawn, Spinoff - Definitive, Did Not Happen, Post-Event, Closed, Agreement In Principle, Not Announced, Abandoned Unsolicited, Spinoff - Announced, Abandoned, Chapter 11, Unsolicited, Investment, Expired Unsuccessfully. Deal Type values: Cash Merger, Cash Tender, Stock Merger, Dutch Auction, Investment, Exchange Offer, Not Available, Cash-Stock Merger, Statutory Merger, Distressed, Liquidating Trust, Cash-Stock Exchange Offer, Proxy Contest, Post-bankruptcy Equity, Exploring Alternatives, Paired Trade, Leveraged Buyout, Recapitalization, Spinoff, Scheme of Arrangement - Exchange Offer, Bankruptcy Analysis, Conversion To REIT, Post-Spinoff.

---
## 3. Upcoming Events panel 414:2969

420x897, fill #3675D2@0.05, VERTICAL gap 0, clip.

### 3.1 Header "Frame 259" 414:2970
420x48 (FILL x FIXED 48), HORIZONTAL pad 16/8/16/16 (T/R/B/L), gap 10, main CENTER, cross CENTER. Stroke #3675D2@0.1 1px bottom INSIDE. No fill.
- Title "Upcoming Events" 414:2971: Geist Medium 12 #005268, FILL x HUG.
- "Events Calendar" outlined button "Frame 193" 414:2972: 122x28 (HUG x FIXED 28), stroke #000000 1px INSIDE, radius 4, no fill, pad 0/16/0/16, gap 4, centred. Text Geist Regular 12 #000000. (Hover not defined.)

### 3.2 Day strip "Frame 322" 414:2974
420x107 (FILL x HUG), HORIZONTAL pad 16, gap 8, main SB, cross CENTER. Stroke #3675D2@0.1 1px bottom INSIDE.
Eight day tiles. Each tile: 40.88x75 (FIXED x HUG), VERTICAL pad 16/8/16/8, gap 6, main MIN, cross CENTER, radius 5. Tile x: 16, 65.59, 115.18, 164.77, 214.36, 263.95, 313.54, 363.13 (pitch 49.59).
| State | Fill | Stroke | Weekday (12) | Date (16) |
|---|---|---|---|---|
| Past/disabled (Thu 05) 414:2975 | #F5F5F8 | none | Regular #A8B6CD | Regular #7C8DAC |
| Selected (Fri 06) 414:2978 | #3675D2@0.1 | #3675D2 1px INSIDE | Medium #7C8DAC | Medium #3675D2 |
| Default (Sat 07 ... Thu 12) | #FFFFFF | none | Regular #7C8DAC | Regular #000000 |
Date text centre-aligned. Today marker: none distinct from selected (Fri 06 is selected; screen is 'today' per the chip). Hover: not defined.

### 3.3 Event list container "Frame 243" 414:2999
420x742, VERTICAL gap 8, pad 8/12/16/8 (T/R/B/L), FILL x FILL. Inner "Frame 260" 414:3000 (HORIZONTAL gap 8, 400x718): list "Frame 235" 414:3001 388x718 VERTICAL gap 8, radius [4,4,0,0], clip, + scrollbar Group 121 414:3113 (4x718): track #E5E7EC radius 16, thumb 4x109.18 #A8B6CD radius 16. Scrollbar sits 8px right of cards (x=396 in 400).
7 cards in file.

### 3.4 Event card (414:3002, 388w, FILL x HUG)
Fill #FFFFFF, stroke 1px INSIDE, radius 4, VERTICAL pad 16, gap 8.
Card variants:
| Card | Node | h | Stroke | Contents |
|---|---|---|---|---|
| Actual + Join + time | 414:3002 | 132 | #3675D2@0.05 | ticker, Actual, title (2 lines), join button, time chip |
| Actual, no button | 414:3023 | 97 | #3675D2@0.05 | title + subtitle |
| Expected, SELECTED/expanded | 414:3035 | 161 | #3675D2@0.3 | title (2 lines) + 4-line body |
| Actual, no button | 414:3047 | 97 | #3675D2@0.05 | |
| Actual + Join + time | 414:3059 | 132 | #3675D2@0.05 | |
| Expected, long body | 414:3080 | 161 | #3675D2@0.05 | |
| Last (Actual + Join + time) 414:3092 | 132 | #F5F5F8, top+bottom 1px OUTSIDE only (left/right 0) | same as first card but ticker followed by `lucide/square-arrow-out-up-right` 16px icon (ticker frame 64x16, gap 4) |
Selected = stroke #3675D2@0.3 instead of @0.05 (only difference; fill stays white). Hover: not defined.

Inner layout: block "Frame 182" (FILL x HUG, VERTICAL gap 12) containing
1. Top row "Frame 228": FILL x HUG, HORIZONTAL gap 8, main SB, cross CENTER. Left: ticker link wrapper (HUG, radius 4, gap 4): Geist Medium 12 #005268 UNDERLINE. Right: status text Geist Regular 12 right-aligned: "Actual" #3675D2, "Expected" #7C8DAC.
2. Title block (VERTICAL gap 2 or gap 5 when body follows): title Geist SemiBold 12 #000000, FILL x HUG; optional body Geist Regular 12 #000000 (gap 5 between title and body, container "Frame 274").
Then (cards with button) "Frame 255": FILL x HUG, 32h, HORIZONTAL gap 8, main SB, cross CENTER:
- "Join the meeting" Button 414:3013: 132x32 (HUG x FIXED), fills [#FFFFFF, #3675D2@0.2] (two stacked fills), radius 4, pad 7/8/7/8, gap 4, clip, cross CENTER. Icon "zoom logo" 16x16 (video-camera glyph, boolean union 14x8 fill #3675D2, inner vectors #FEFEFE); label Geist Medium 12 #3675D2. Hover not defined.
- Time chip "Frame 256" 414:3019: 74x32 (HUG x HUG), fill #FF8132@0.1, radius 2, pad 0/0/0/8, gap 8, cross CENTER. Text "today\n12:45" Geist Regular 10 #FF8132 (two lines, 26x26). Bell button `lucide/bell` 32x32 clip, stroke #FFFFFF 1px LEFT only (INSIDE) = divider; vector 12x13 at (10,10) stroke #FF8132 1px, no fill (outline bell).

---
## 4. Recent Updates panel 414:2801

364x897, fill #E2E2E2@0.25, stroke #F7F7F7 1px INSIDE, radius 8, VERTICAL gap 0, clip.

### 4.1 Header "Frame 277" 414:2802
364x48, FILL x FIXED, HORIZONTAL pad 16/16/12/16, gap 10, main CENTER, cross CENTER. Stroke #E5E7EC bottom 1px INSIDE. radius [4,0,0,0]. Title "Recent Updates" Geist Medium 12 #005268 (FILL x HUG). Note: Upcoming Events header title y=16 vs this 18 (pad bottom 12).

### 4.2 Body "Frame 226" 414:2804
364x849, HORIZONTAL gap 12, pad 16/8/16/16 (T/R/B/L), FILL x FILL. Card column "Frame 276" 414:2805: 324 wide (FILL x HUG), VERTICAL gap 9. Scrollbar Group 121 414:2888 at x=352 4x817: track #E5E7EC r16, thumb 4x124.23 #A8B6CD r16.

### 4.3 Card shell
All cards: fill #FFFFFF, radius 4, VERTICAL pad 12/16/12/20 (T/R/B/L), gap 12, FILL x HUG, width 324.
Stroke: cards 1 (414:2806), 2 (414:2823), 4 (414:2864), 5 (1604:4019) none. Card 3 "New Morning Note" 1608:4040: stroke #E5E7EC 1px INSIDE (= highlighted/unread note variant, visual: white card with light border).

### 4.4 Header line of each card
- Types with label (New Event 414:2807, New Comment 414:2824): "Frame 144" 288x24 FILL x HUG, HORIZONTAL gap 4, main SB, cross CENTER. Left group "Frame 281" (158x16 FIXED, gap 4): icon 16x16 + label Geist Regular 12 #179484 + timestamp Geist Regular 12 #A8B6CD ("just now"). Icon vector stroke #179484 1px, no fill (12x10 at (2,3)). Component named `lucide/calendar` on all cards; glyph drawn visually: calendar (New Event), speech-bubble/message-square (New Comment), file/note (Morning Note) (visual).
- New Morning Note 1608:4041: 288x16, HORIZONTAL gap 4, main MIN; icon (10x10 vector at (3,3), stroke #179484) + "New Morning Note" #179484 + "one min ago" #A8B6CD.
- Plain updates (no label; card 4 414:2864 header 288x24 SB, card 5 1604:4021 288x16): icon vector stroke #7C8DAC (grey) + timestamp only "10 min ago"/"1 hour ago" Geist Regular 12 #A8B6CD.
- Action chips (right side), each 24x24, radius 2, clip:
  - Bell chip (`lucide/bell`): fill #FF8132@0.1, vector 12x12 at (6,6) fill #FF8132 stroke #FF8132 1px (filled bell = active).
  - Bookmark chip (`lucide/bookmark`): fill #3675D2@0.1, vector 10x12 at (7,6) fill #3675D2 (filled).
  - Card 4: both chips in "Frame 282" (52x24, gap 4, main MAX): bookmark first, then bell. Card 1: bell only. Card 2: bookmark only. Cards 3, 5: none.

### 4.5 Body of each card ("Frame 182", FILL x HUG, VERTICAL gap 8)
- Ticker row "Frame 334" (FILL x HUG, 16h, HORIZONTAL gap 8 main SB cross MIN): ticker link Geist Medium 12 #3675D2 UNDERLINE (blue in this panel). Right: author name Geist Regular 12 #005268 right-aligned ("Linda Varoli", "Jacob Kuit") - NOTE: author is #005268 in the file, not #4162A3.
- Card 1 (event): ticker "AHL / 8630 JT" then body Geist Regular 12 #000000 (2 lines) in "Frame 144" gap 8.
- Comment cards: title Geist SemiBold 12 #000000 ("OG Email from ND DOI"), then body Geist Regular 12 #000000, container "Frame 335" gap 4 (title y0, body y20). Body wraps at 288 width.
- Note cards: row 1 = "View Full Note" Geist Medium 12 #3675D2 UNDERLINE (81x16), then title Geist SemiBold 12 #000000 UPPERCASE as typed ("EVENT DRIVEN MORNING UPDATE"), then body Geist Regular 12 #000000 (card 3 ends with "..." ellipsis in the text itself).
- Card heights in file: 116, 136, 144, 328, 160 (HUG).

---
## 5. All Deals / Drafts screens (shared chrome)

Screens (1920x1080): All Deals expanded 824:8212; All Deals collapsed 1988:6731; Drafts 1988:5649. Common: Main card Rectangle 9 (88,103) 1784x929, stroke #E5E7EC 1px INSIDE, radius [0,12,12,12], no fill (collapsed/Drafts; expanded has 824:8721 same box). Controls row at y=120 (card y + 17).

### 5.1 Filter sidebar "Frame 258"
Expanded 824:8580 abs (88,120) 409x896; collapsed 1988:7427 and Drafts 1988:5650 375x896. VERTICAL gap 0. Stroke #E5E7EC 1px INSIDE, radius [0,8,8,0], no fill.
- Header "Frame 259": FILL x FIXED 44 (409x44 / 375x44), HORIZONTAL pad 16, gap 10, main CENTER cross CENTER, stroke #E5E7EC bottom 1px INSIDE. "Filters" Geist Medium 12 #005268. "Reset All" Geist Medium 12 UNDERLINE right-aligned: #FF8132 (active), #7C8DAC (Drafts/disabled).
- Sections container "Frame 243": FILL x FIXED 852 (w409), VERTICAL gap 24, pad 8/16/8/16, stroke #F5F5F8 TOP 1px OUTSIDE.
  - Status section (Frame 211): 377x208 (collapsed 343 wide), VERTICAL gap 8: label "Status" Geist Regular 12 #A8B6CD (note: Status label is #A8B6CD while Type and Regulatory Risk labels are #7C8DAC); then "All" checkbox (full width), then rows of two checkboxes (HORIZONTAL gap 8, 16h): col 1 / col 2: Terminated|Withdrawn, Closed|Expired Unsuccessfully, Abandoned|Announced, Definitive|Spinoff - Definitive, Proposal|Spinoff - Announced, Predeal|Post-Event, Did Not Happen.
  - Type section 824:8608 (296h expanded, 312h collapsed): label "Type" #7C8DAC; "All"; pairs: Cash Merger|Cash-Stock Merger, Stock Merger|Cash Tender, Dutch Auction|Spinoff, Exploring Alternatives|Potential Sale, Asset Acquisition|Investment, Cash-Stock Exchange Offer|Leveraged Buyout, Exchange Offer|Spinoff-Merger, Recapitalization|Shareholder Activism, Split-off|Not Available, Scheme of Arrangement - Exchange Offer|Sale of Subsidiary. (Collapsed width wraps two-line labels.)
  - Time to close slider 824:8641 249x58, VERTICAL gap 8: header row (main SB) "Time to close" Geist Regular 12 #7C8DAC + "(months)" #A8B6CD; track group 249x17: base rect 249x4 y6 fill #E5E7EC radius [4,0,0,4]; tick marks 1x16 fill #E5E7EC radius 4 at x 62, 121, 181, 248 (Drafts: 72,126,180,248); filled portion 128x4 fill #005268 radius 4 (Drafts 131 wide, fill #7C8DAC); thumb ellipse 12x12 at x116,y2 fill #FFFFFF stroke #005268 1.5 INSIDE (Drafts: stroke #7C8DAC at x120). Tick labels row (HORIZONTAL SB, 13h) Geist Regular 10 #A8B6CD: "0 3 6 12 18" (the "0" text is #FFFFFF = invisible) ; Drafts labels "Now 3 6 12 18+".
  - Regulatory Risk section 824:8660: label #7C8DAC; HORIZONTAL row of three checkboxes each 100 wide: Low, Medium, High (all selected).
- Checkbox component set "Checkbox" 754:2943 (16h row, gap 8, label Geist Regular 12): variants
  | Variant | Box (16x16, radius 2) | Mark | Label |
  |---|---|---|---|
  | selected | fill #005268 | check vector 8x6 stroke #FFFFFF 1.5 | #000000 |
  | not selected | no fill, stroke #A8B6CD 1px INSIDE | - | #000000 |
  | all (indeterminate) | fill #005268 | dash 8x0 stroke #FFFFFF 1.5 | #000000 |
  | disabled | fill #7C8DAC | check stroke #E5E7EC 1.5 | #7C8DAC |
  | disabled 2 (unchecked) | no fill, stroke #A8B6CD | - | #7C8DAC |
  | disabled all | fill #7C8DAC | dash #FFFFFF | #7C8DAC |
- Drafts screen: sidebar sits under "Rectangle 36" 1988:5751 (89,121 407x894, radius [0,8,8,0], effect BACKGROUND_BLUR radius 20, no fill) and uses the disabled checkbox variants + #7C8DAC reset/slider (read-only/disabled filters).

### 5.2 Controls row (y=120)
- Select "Sort by: Newest" Select 824:8666: abs (513,120) 197x32 (collapsed/Drafts: (475,120) 202/203x32), fill #FFFFFF, stroke #E5E7EC 1px INSIDE, radius 4, HORIZONTAL pad 7/12/7/12, gap 8, main SB cross CENTER. Text mixed: "Sort by: " #7C8DAC + "Newest" #000000, Geist Regular 12. Chevron `lucide/chevron-down` 16x16, vector 12x6 stroke #005268 1.2.
- Sort direction button `lucide/arrow-up-down` 824:8670: 32x32 at x+16 after select, fill #F5F5F8 radius 4, icon vector 16x12 at (8,10) stroke #000000 1px.
- View-density toggle "Frame 1000000953" 824:8673: 64x32, fill #F5F5F8 radius 2, HORIZONTAL gap 0. Two 32x32 radius-2 segments with 24x24 icons (`list-chevrons-down-up` / `list-chevrons-up-down`), vector 16x12 stroke width 1.2.
  - Expanded screen 824:8212: ACTIVE = second segment: fill #005268@0.2, stroke #005268 1px INSIDE, pad 4/5/4/5 gap 4, icon #005268; INACTIVE = first segment, no fill/stroke, icon #7C8DAC, pad 4 gap 6.
  - Collapsed (1988:7520) and Drafts (1988:5740): ACTIVE = first segment, fill #3675D2@0.1, stroke #3675D2 1px, icon #3675D2; inactive second icon #7C8DAC. (Blue active instead of brand teal - inconsistent with expanded; keep both as-is.)
- "All Deals / Drafts (148)" toggle "Frame 1000001094" 1988:7527 (collapsed) / 1988:6482 (Drafts): abs (1519,120) 211x32, fill #F5F5F8 radius 4, HORIZONTAL gap 0. Two Button segments (HUG x FIXED 32, radius 4, pad 7/24/7/24, gap 8, text Geist Medium 12). ACTIVE: fills [#FFFFFF, #005268@0.1], stroke #005268 1.5 INSIDE, text #005268. INACTIVE: no fill/stroke, text #000000. Widths: All Deals 98, Drafts (148) 113. Collapsed screen: All Deals active; Drafts screen: Drafts active. (Not present on expanded screen.)
- "New Deal" primary Button 824:8672: abs (1754,120) 102x32, fill #005268, stroke #005268 1.5 INSIDE, radius 4, pad 7/24/7/24, gap 8, text Geist Regular 12 #FFFFFF.

### 5.3 Deals table (All Deals / Drafts)
Table frame "Frame 1000000931": expanded 824:8213 abs (513,168) 1343x863; collapsed 1988:6732 / Drafts 1988:5752 abs (475,168) 1381x863. VERTICAL, clip, (no outer stroke dump taken; header 30h).
Header (824:8214 / 1988:6733): 30h (cells 29h), fill #F5F5F8, stroke #E5E7EC bottom 1px INSIDE. Cell: stroke #E5E7EC RIGHT 1px (last cell none), VERTICAL pad 4/8/4/8, main CENTER cross MIN. Text Geist SemiBold 12 #000000 (NOT Medium as on dashboard). Alignment: Deal Title, Status, Deal Type, Deal Value LEFT; Last Updated, Start Date, End Date, Regulatory Risk, Activity, Actions, (expanded "End Date" last col) CENTER. No sort/filter icons in the header on these screens (sorting is via the control row).

Column widths:
| Column | Expanded (1343) | Collapsed/Drafts (1381) |
|---|---|---|
| Deal Title | 336 | 289 |
| Last Updated | 110 | 110 |
| Start Date | 110 | 110 |
| End Date | 110 | 110 |
| Regulatory Risk | 110 | 110 |
| Status | 189 | 189 |
| Deal Type | 190 | 190 |
| Deal Value | 80 | 80 |
| Activity (expanded labelled "End Date" cell holds icons) | 108 (last) | 104 |
| Actions | - | 89 |
(Expanded sums 336+110*4+189+190+80+108 = 1343; collapsed 289+440+189+190+80+104+89 = 1381.)

Row (all screens): fill #FFFFFF, stroke bottom 1px INSIDE: #F5F5F8 on expanded screen row 824:8234, #E5E7EC on collapsed/Drafts rows; HORIZONTAL gap 0, cross CENTER, FILL x HUG; h41 (cell 40 + 1). Cells: stroke #F5F5F8 RIGHT 1px INSIDE, VERTICAL pad 4/8/4/8 main CENTER cross MIN, FILL x FILL.
- Deal Title cell: two lines: line 1 Geist Regular 12 #000000 (company names, e.g. "Shutterstock / Getty Images Holdings, Inc"); line 2 Geist Medium 12 #7C8DAC tickers "SSTK / GETTY" (Medium for ticker lines; for swapped rows "AMZN / BLOR" #000000 Regular line 1 + "Amazon.com Inc / Blue Origin" #7C8DAC Regular line 2). No underline, no link colour on these screens.
- Dates: Geist Regular 12 #000000 CENTER. Drafts empty = "-" (same style).
- Regulatory Risk: Geist Medium 12 CENTER; Low #ECA100, Medium #FF8132, High #DA4D43. (Drafts blank cell for Medium in some rows.)
- Status pill / Deal Type pill: see section 6.
- Deal Value: Geist SemiBold 12 #000000 LEFT ("$1.1B"). Drafts empty "-" (SemiBold, LEFT).
- Activity cell (HORIZONTAL gap 8, pad 4/8/4/8, centre): two groups (40x16, gap 4): [calendar icon 16x16 vector 14x12 stroke #7541A3 1px + count Geist Regular 12 #000000] and [message icon (named lucide/calendar) vector 14x12 stroke #3090C0 1px + count].
- Actions cell (collapsed; no right border on Actions in Drafts), HORIZONTAL gap 16, pad 4/8/4/8, centre:
  - Bell vector 14x15.56: ACTIVE = fill #FF8132 + stroke #FF8132 1px; INACTIVE = stroke #FF8132 1px, no fill.
  - Bookmark vector 12x15: ACTIVE = fill #3675D2 (stroke none); INACTIVE = fill #3675D2@0 + stroke #3675D2 1px.
  - Drafts: pencil `noun-edit-8205831 1` 24x24 (vector 14x14 fill #FF8132) + trash frame 24x24 radius 2 (vector 14x14 fill #DA4D43), gap 16.
- Expanded row (accordion) 824:8263: after each data row on expanded screen a "description" row: FILL x HUG, fill #FBFBFC, stroke #E5E7EC bottom 1px INSIDE, VERTICAL pad 8/8/12/8 gap 10. Contains Group 204 (1327 wide): AI sparkle icon `noun-ai-6895113 1` 16.2x16 (GRADIENT_LINEAR fills) at (10,8) and body text Geist Regular 12 #000000 (starts with 7 spaces to clear the icon; wraps to 2-4 lines). Heights seen: 70, 54. (Rows 824:8522 and 824:8551 have no description row.)
- Row hover/selected: none defined (all rows identical fill).
- Scrollbar: collapsed/Drafts table has no explicit scroll instance in dumped children (not captured; expanded screen not present either).

---
## 6. Status and Deal-Type pill colour map (COMPLETE as drawn in Figma)

Pill anatomy (identical for status and type): frame "Frame 1000000929" (status) / "Frame 1000000928" (type), 24h (HUG x HUG), radius 16, HORIZONTAL pad 4/16/4/16, gap 10, centred, no stroke. Text Geist Medium 12, line-height auto. Inside a table cell at (8,8) (cell h40). The cell text colour = pill text colour listed. bg opacity is the paint opacity on the frame fill (text paint is opaque).

### STATUS (8 coloured values)
| Status | BG hex | BG opacity | Text hex |
|---|---|---|---|
| Predeal | #3090C0 | 0.25 | #3090C0 |
| Proposal | #30B2C0 | 0.2 | #30B2C0 |
| Definitive | #C1F0D5 | 1 (opaque) | #179484 |
| Terminated | #DC432B | 0.2 | #DC432B |
| Withdrawn | #6074A0 | 0.2 | #6074A0 |
| Spinoff - Definitive | #A752A9 | 0.2 | #A752A9 |
| Did Not Happen | #4C7794 | 0.25 | #4C7794 |
| Post-Event | #ECA100 | 0.2 | #ECA100 |

### DEAL TYPE (8 coloured values)
| Deal Type | BG hex | BG opacity | Text hex |
|---|---|---|---|
| Cash Merger | #CAD8F4 | 1 (opaque) | #4162A3 |
| Cash Tender | #C6226C | 0.1 | #C6226C |
| Stock Merger | #7541A3 | 0.2 | #7541A3 |
| Dutch Auction | #DC5E2B | 0.2 | #DC5E2B |
| Investment | #179475 | 0.2 | #179464 (bg/text differ in the file: 75 vs 64; reproduced as drawn) |
| Exchange Offer | #36A30F | 0.2 | #36A30F |
| Not Available | #F5F5F8 | 1 (opaque) | #7C8DAC |
| Cash-Stock Merger | #4199A3 | 0.2 | #4199A3 |

The same 16 pills appear identically (same hex/opacity) on 824:8212, 1988:6731 and 1988:5649 (Drafts uses the subset Predeal, Definitive, Post-Event, Withdrawn, Proposal, Terminated, Spinoff - Definitive / Cash Merger, Dutch Auction, Not Available, Exchange Offer, Cash Tender, Stock Merger, Cash-Stock Merger). Drafts: rows with missing status/type show "-" CENTER Regular #000000 in an otherwise empty cell, and a few cells are completely empty (no text).

### Regulatory risk text colours
Low #ECA100, Medium #FF8132, High #DA4D43 (Geist Medium 12 centred). In the sidebar the same words are checkbox labels (#000000 Regular).

---
## 7. Icons (name, size, colour)

| Icon | Name in Figma | Size | Colour / style |
|---|---|---|---|
| Table-sort (dashboard header) | Vector (unnamed arrows) | 12x10 | stroke #7C8DAC 1px |
| Filter funnel | lucide/funnel | 16 (glyph 12) | stroke #7C8DAC 1px |
| Calendar (Activity) | lucide/calendar | 16 (14x12) | stroke #7541A3 1px |
| Comments (Activity) | lucide/calendar (glyph speech bubble) | 16 (14x12) | stroke #3090C0 1px |
| Bell (list action) | vector | 14x15.56 | #FF8132 stroke 1px; filled when active |
| Bookmark (list action) | vector | 12x15 | #3675D2 filled/outline |
| Edit pencil | noun-edit-8205831 1 | 24 (14 glyph) | fill #FF8132 |
| Trash | Frame 1000001086 | 24, r2 (14 glyph) | fill #DA4D43 |
| Bell chip (updates) | lucide/bell | 24, r2, glyph 12 | bg #FF8132@0.1, glyph #FF8132 |
| Bookmark chip (updates) | lucide/bookmark | 24, r2, glyph 10x12 | bg #3675D2@0.1, glyph #3675D2 |
| Update-type glyphs | lucide/calendar | 16 | #179484 (typed) / #7C8DAC (plain) |
| Bell (event time chip) | lucide/bell | 32 box, glyph 12x13 | stroke #FF8132 |
| Join meeting | zoom logo | 16 | #3675D2 body |
| Link-out | lucide/square-arrow-out-up-right | 16 | (event card 414:3092, colour not dumped) |
| Chevron | lucide/chevron-down | 16 (12x6) | stroke #005268 1.2 |
| Sort direction | lucide/arrow-up-down | 32 box (16x12) | stroke #000000 1px |
| View density | lucide/list-chevrons-down-up/up-down | 24 (16x12) | 1.2 stroke; #7C8DAC / #005268 or #3675D2 |
| AI sparkle | noun-ai-6895113 1 | 16.2x16 | linear gradient fills |

---
## 8. GAPS (searched, not defined in Figma)
- Row hover / selected / focus / zebra: all 24 dashboard rows and all 20+ list rows identical (#FFFFFF); none defined.
- Pill hover/pressed/focus for filter pills, segmented toggles, A-Z letters beyond the single drawn magnifier state, day tiles hover/focus, buttons hover/pressed/focus/disabled (Events Calendar, Join, New Deal).
- Sort-active and filter-active header states; filter dropdown menu content (Status/Deal Type funnel icon opens something - no menu frame found in the file for these nodes).
- Pagination / load-more / infinite loader: none (tables scroll within clipped frame; scrollbar thumb length given only).
- Empty states, loading skeletons, error: none for any panel/table. Only Drafts shows "-" placeholders.
- Colours for statuses and types NOT in the 16-pill map (e.g. Closed, Abandoned, Announced, Expired Unsuccessfully, Spinoff - Announced, Agreement In Principle, Not Announced, Chapter 11, Unsolicited ... and types Spinoff, Potential Sale, Exploring Alternatives, Asset Acquisition, Leveraged Buyout, Recapitalization, Split-off, Statutory Merger etc.): not defined.
- Dashboard table does not use pills (plain text); on All Deals screens status/type use pills. Dashboard Status/Type text colour = #000000.
- Scrollbar hover/drag; scrollbar for All Deals/Drafts tables.
- Recent Updates "read/unread" semantics: only visual stroke difference on the Morning Note card; no explicit variant. Bell/bookmark inactive chips (chip appears only when active).
- Today marker for day strip (separate from selected); multi-select; event-day dot indicators.
- Tooltips, toasts, drag handle, truncation (text-overflow ellipsis rules): not defined.
- Responsive/other breakpoints: only the 1920x1080 frame exists for these screens.
- A-Z rail: meaning of black "A" and which letters are disabled (no deals) vs enabled: inferred only.
- Figma inconsistencies preserved as drawn: Investment pill bg #179475 vs text #179464; view-toggle active colour teal on expanded vs blue on collapsed/Drafts; Status sidebar label #A8B6CD vs Type/Risk labels #7C8DAC; dashboard header Medium vs list header SemiBold; dates LEFT on dashboard vs CENTER on lists; row border #F5F5F8 (expanded) vs #E5E7EC (collapsed/Drafts).

# OG Risk Arb - Deal Detail / Deal Edit / New Deal (Figma harvest)

File VlOfBG6fJt7ijm0iKasAMP, page "final" 48:850. All values read via the Plugin API unless marked "(visual estimate)".
Shorthand: pad = top/right/bottom/left. Strokes: "inside/outside" = strokeAlign. Weight arrays = top/right/bottom/left. Font is Geist throughout (except 4 toolbar glyphs). All text line-height AUTO, letter-spacing 0%, case ORIGINAL, left aligned unless said.

Text-style tokens used on these screens (family Geist):
- T-title18-M: Medium 18 (deal title, ticker part) / T-title18-R: Regular 18 (company part)
- T-14-SB: SemiBold 14 (comment titles) / T-14-M: Medium 14 (preview title, "Deal Preview" heading)
- T-12-R, T-12-M (Medium), T-12-SB (SemiBold, table headers on Deal view), T-12-B (Bold: total deal value, rich-text bold)
- T-10-R, T-10-M (Medium 10: Edit/New table headers, event name), T-10 disclaimer Regular 10

Colour tokens: brand #005268; section label teal #005268; label grey-blue #7C8DAC (Deal page labels) / #A8B6CD (form labels, preview labels, Additional-data sub-labels); borders #E5E7EC / #F5F5F8; blue #3675D2; comment author #4162A3; orange #FF8132; red #DA4D43 (delete icon); green #179484; white #FFFFFF; black #000000.

---------------------------------------------------------------------
## 0. Screens and frame geometry (all frames 1920 wide)

| Screen | id | size | page position |
|---|---|---|---|
| Deal | 1720:6515 | 1920x2638 | 3383,908 |
| Deal Edit Events (Internal) | 1720:6136 | 1920x2712 | 5367,908 |
| New Deal | 1868:10765 | 1920x1080 | 3383,4372 |
| New Deal Expanded | 1868:10064 | 1920x3223 | 5367,4372 |
| New Deal Empty | 1868:10474 | 1920x1544 | 1399,4372 |

Shell (owned by another harvester, positions only), identical on all 5 screens:
- Nav min instance 2044:6472 (72x1032 @0,0).
- Top bar "Frame 15" 1848x64 @72,0: Search instance 840x40 @16,16; avatar frame "user-circle-02" 40x40 @1760,16.
- Tab strip "Frame 80" @88,73 (Deal/Edit, 1769x32) or @88,72 (New Deal screens, 1784x32), tabs 32px high, gap 0. Active tab: fill #F5F5F8, bottom 3px #005268, text #005268 Medium 12; others stroke #F5F5F8 1 inside, radius [4,4,0,0], pad 12/24/12/24 (static tabs, Medium 12 black) or 12/12/12/16 gap 16 with 16x16 circle-x (fill #E5E7EC radius 16, 4x4 x-vector stroke #000 1) for closable tabs (Regular 12 black). On New Deal screens tab widths are 94/124/142/151/114 (Deal screens 110/140/109/132/151) (note: widths differ between screens).
- Page card: Deal / Edit use RECTANGLE "Rectangle 9" @88,104, 1784 x (2461 Deal | 2535 Edit), stroke #E5E7EC 1 INSIDE, radius [0,12,12,12] (TL,TR,BR,BL), no fill, no effect. New Deal screens use frame "Frame 1000001070" @88,104, 1784 x (928 | 3047 | 1408), stroke #E5E7EC 1 OUTSIDE, radius [0,8,8,8], clip, vertical autolayout gap 0. (Deviation: card radius 12 on Deal/Edit vs 8 on New Deal.)

---------------------------------------------------------------------
## 1. DEAL DETAIL (1720:6515)

### 1.1 Layout skeleton (absolute positions inside 1920 frame)
- Header row "Frame 1000001069" 1736x32 @120,121 (see 1.2).
- Key-terms card "Frame 1000001065" 1354x441 @104,177 (1.3).
- Right column "Frame 1000001067" 398x726.96 @1474,177 (anchor menu 1.4 + comments 1.9).
- Conditions panel "Frame 288" 406x878 @104,634 (1.5).
- Main content "Frame 1000001078" 964x1928 @510,637 = Dates Summary (964x332) then "Frame 340" (964x1596) (1.6-1.8).
Gutters: card 104 -> 1458 (1354 wide); right column starts 1474 (gap 16 after card). Conditions 104-510, content 510-1474.

### 1.2 Page header (1720:6521, H gap 24, 1736x32, align center)
- Left group "Frame 1000001068" 1640x32, H, SPACE_BETWEEN, gap 435, fill width.
  - Title group "Frame 1000000901" 688x32 H gap 24 center: title text (1720:6524, 458x23) is ONE text node with 2 runs: "SSTK / GETY " Geist Medium 18 #000000 + "Shutterstock / Getty Images Holdings, Inc." Geist Regular 18 #7C8DAC.
  - Badges "Frame 183" H gap 16 center, hug: each chip = frame 32 high, radius 16, pad 8/16/8/16, gap 10, centered; label Geist Medium 12.
    - Status chip "Definitive" 86x32: fill #C1F0D5, text #179484.
    - Type chip "Cash Merger" 104x32: fill #CAD8F4, text #4162A3.
  - Button "Edit Deal" instance (Button/Default) 98x32: fill #005268, stroke #005268 1.5 inside, radius 4, pad 7/24/7/24, gap 8, text Regular 12 #FFFFFF, clip.
- Icon group "Frame 185" 72x32, H gap 8 at x=1664 (rest of row):
  - Bell "lucide/bell" 32x32: no fill, stroke #FF8132 1 inside, radius 2; glyph vector 14x15.56 stroke #FF8132 1.
  - Bookmark "lucide/bookmark" 32x32: fill #3675D2 @ 10%, stroke #3675D2 1 inside, radius 2; glyph 12x15 fill #3675D2 (filled).
(Edit screen header 1720:6142 identical.)

### 1.3 Key-terms card (1720:6590) 1354x441
- Frame: no fill; stroke #A8B6CD 1 OUTSIDE; radius 4; V autolayout gap 0, pad 0, cross MAX; no effect. Children stacked, each fill-width:
  1. Parties row "Frame 1000001060" (1720:6591) 1354x137, H gap 0, bottom stroke 1 #F5F5F8 inside. Two halves 546x137 each ("hug", side-by-side; total 1092 of the 1354, remainder empty): Target (6592) with RIGHT stroke 1 #F5F5F8 inside (divider), Acquirer (6614) none. Each half: V gap 8, pad 16/0/16/0.
     - Section head row 546x16, H, pad 0/24/0/24: "Target"/"Acquirer" Geist Medium 12 #005268.
     - Data block (Frame 201) 546x81: GRID layout, 2 rows x 4 cols, column sizes FIXED 100/100/100/130, column gap 12, row gap 13, pad 0/56/0/24, so cells start x=24,136,248,360; rows y=0 and y=47. Cells (V gap 2, 34 high): label Regular 12 #7C8DAC over value Regular 12 #000000 (both 16 high text).
       Row 1: Ticker (col1), Name (cols 2-3 span, 212 wide). Row 2: Exchange, Predeal price, Total Debt, Shares Outstanding (m) (col4, 129 wide).
  2. Totals row "Frame 1000001060" (6636) 1354x66, H, pad 16/0/16/0, bottom stroke 1 #F5F5F8. Inner grid-less H row 572.96 wide, gap 16, pad 0/56/0/24, 4 cells (111.32/111.32/111/111.32 x 34, V gap 2): Total Deal Value ($1.1B value is Geist BOLD 12), Author, Start Date, End Date. Labels #7C8DAC Regular 12, values #000 Regular 12.
  3. Long-text block "Frame 1000001064" (6650) 1354x238, V gap 12, pad 16/0/16/0, three stacked items each V gap 2, pad 0/24/0/24, text fill width (1306): Deal Terms (label 16 + text 80 high), Termination Fee (16 + 32), Walk Provision (16 + 16). Label: Regular 12 #7C8DAC; text Regular 12 #000000, autoresize HEIGHT (wrapping), line breaks preserved (newline chars).
Dividers are only 1px #F5F5F8 bottom strokes (inside) on rows; card outline is the darker #A8B6CD.

### 1.4 Anchor / section menu (1720:6537 "Frame 210") 374x160
- Right column frame 6536: V gap 48, pad 0/0/0/24, stroke LEFT 1 #F5F5F8 inside. Menu frame: V gap 0, pad 0/0/0/16, stroke left 1 #F5F5F8 outside. 5 items, each fill-width 358x32, H, pad 8/16/8/16, gap 10, center vertical:
  - Active ("Deal Terms" 6538): fill #F5F5F8, LEFT stroke 2px #000000 inside, text Geist Medium 12 #000000.
  - Inactive (Conditions, Dates Summary, Description of Deal, Disclaimer): no fill, text Regular 12 #7C8DAC.
- Hover / pressed: not defined.

### 1.5 Conditions panel (1720:6516) 406x878 @104,634
- Stroke #F5F5F8 1 inside, radius 4, no fill. V gap 8, pad 16/16/0/24. Title row 366x16: "Conditions" Medium 12 #005268. Body "Frame 337" 366x838, H gap 16, pad 0/0/16/0, clip: ONE text 366x822 Regular 12 #000, autoresize NONE (fixed box, text overflows and is clipped, no scrollbar drawn). Newlines preserved, blank lines between paragraphs.

### 1.6 Dates Summary (1720:6661) 964x332
- Frame: V gap 10, pad 16/16/0/16. Header row 932x16 H SPACE_BETWEEN center: "Dates Summary" Medium 12 #005268 ; right "Edit Events" Medium 12 #FF8132 UNDERLINE (link-style).
- Table "Table - Events" 932x290: fill #FFFFFF, stroke #E5E7EC 1 inside, radius 8, clip, V gap 0.
  - Header row 932x32: fill #F5F5F8, bottom stroke 1 #E5E7EC inside; cells 31 high with RIGHT stroke 1 #E5E7EC inside.
    Column widths: Date 113 / Status 99 / Agency/Event 273 / Comments 273 / Related Links 174 (=932). Cell pad: Date 8/12/8/12; others 4/12/4/12; V centered.
    Header text: "Date" Geist Medium 10 #000; "Status","Agency/Event","Comments","Related Links" Geist SemiBold 12 #000 (inconsistent between columns in Figma; reproduce as is).
  - Body rows: fill #FFFFFF, bottom stroke 1 #F5F5F8 inside, H gap 0, height = content (30/73/57/41/57 in the sample), cells top-aligned (MIN), right stroke 1 #E5E7EC inside, same pads (Date cell 8/12/8/12 with Regular 10 #000; others 4/12/4/12 with text Regular 12).
    - Status text: "Actual" Regular 12 #3675D2 ; "Expected" Regular 12 #7C8DAC. (No chip; coloured text.)
    - Agency/Event, Comments: Regular 12 #000, wrapping, text width 249 (273 - 24).
    - Related Links cell (174): when a link exists, a "Join the meeting" button, vertically centred in cell: 132x24, fill [#FFFFFF, #3675D2 @ 20%] (white base + blue tint), radius 4, no stroke, H gap 4, pad 7/8/7/8, 16x16 zoom camera glyph (fill #3675D2, vector 14x8) + label Geist Medium 12 #3675D2.
- Row/cell hover, row selection, sort affordances: not defined.

### 1.7 Description of Deal / rich text (1720:6734 "Frame 340" 964x1596)
- V gap 16, pad 24/0/24/8 (so content x offset 8 + inner 12 = 20 px from content frame left; content width 932).
- Section "Description of Deal": head frame 956x16 pad 0/12/0/12: "Description of Deal" Medium 12 #005268; body frame V gap 10 pad 0/12/0/12 with ONE rich text node 932 wide: Regular 12 #000 with Bold 12 #000 runs for sub-headings ("About Getty Images", "About Shutterstock, Inc."), 5 style runs, paragraphSpacing 0, line height auto, newlines for paragraph breaks (blank-line paragraphs). Quotes as straight text.
- Group "Additional Data" (frame 956x660? "Frame 199" 1720:6740, V gap 16, pad 0/12/0/12): heading "Additional Data" Medium 12 #005268 (y=0);
  - Two columns: Target (x 12), Acquirer (x 544.8, i.e. 532.8 pitch). Column header "Target"/"Acquirer" Geist Medium 12 #7C8DAC. Under each: pairs (label Regular 12 #A8B6CD "Lawyers"/"Investment Bankers" at +0, value Regular 12 #000 at +20, each pair 36 high, pair pitch 44). Absolute (group) layout, not autolayout.
  - Industry: label "Industry" Regular 12 #A8B6CD, chips 4px below label: 32 high, radius 16, pad 8/16, fill #C1ECF0, text Medium 12 #008D9A ("Insurance" 88w, "P&C Insurance" 115w, "Reinsurance" 102w); horizontal spacing between chips about 30.2 px (distributed across 370.24 group width, no autolayout gap).
  - Sector: label "Sector" (#A8B6CD), chip "Financials" 89x32 fill #CAD8F4 text Medium 12 #4162A3 (same tokens as the Cash Merger chip).
  - Industry chips use a teal tint pair (#C1ECF0/#008D9A), sector uses blue tint pair (#CAD8F4/#4162A3), status uses green tint pair (#C1F0D5/#179484).
- Dividend table (1720:6770 "Frame 338" V gap 8): title "Dividend" Medium 12 #005268 (16 high), table "Frame 145" 932x224: fill #FFFFFF, stroke #E5E7EC 1 inside, radius 4, V gap 0.
  - Header 932x32: fill #F5F5F8, stroke #E5E7EC 1 inside, radius [4,4,0,0]; cells: first col 176 wide (empty, text fill 0% opacity), then "Target" 378 and "Acquirer" 378 with LEFT stroke 1 #E5E7EC; cell pad 8/16/8/16 gap 10, text Medium 12 #000.
  - 6 data rows 932x32 each (no row dividers): first cell (176) label Medium 12 #7C8DAC ("Company","Status","Frequency","Amount","Next Ex Div Date","Expected Date"); value cells (378, left stroke 1 #E5E7EC) Regular 12 #000. Empty cells hold invisible text (fill #000 @ 0%).
- Disclaimer (1720:6823 V gap 8): head "Disclaimer" Medium 12 #005268; body 932x104 Regular 10 #000, wraps, justified left.

### 1.8 Scroll indicator (instance "Scroll", 4 wide)
Track rectangle 4 x H fill #E5E7EC radius 16; thumb rectangle 4 x (H*0.54) fill #A8B6CD radius 16 at y=0.

### 1.9 Comments / updates thread (1720:6548 "Frame 216" 374x518.96)
- Container: stroke #F5F5F8 weights [1,0,1,1] (top,right,bottom,left) inside, radius [4,0,0,4], clip, V gap 0.
- Header "Frame 202" 355x32: pad 8/16/8/16 gap 10: "Comments" Medium 12 #005268.
- List area "Frame 1000001067" 374x486.96: H gap 8, pad 0/12/8/16; list "Frame 203" 334 wide, V gap 8; scroll instance (4 wide) at right, thumb 260.47 of 478.96.
- Comment card (Frame 147/146/145/148): 334 wide, fill none, stroke #E5E7EC 1 inside, radius 4, V gap 8, pad 12/24/12/24, height hug (124, 468 [long], 100, 100).
  - Top row 286x16, H SPACE_BETWEEN: author Geist Medium 12 #4162A3 (alignment right flag on text but hug width); date Geist Regular 12 #7C8DAC, format MM/DD/YYYY ("12/29/2025").
  - Content block V gap 2: title Geist SemiBold 14 #000 (18 high); body Geist Regular 12 #000 wrapping (286 wide). Long body is clipped by the scroll area.
  - Attachment: PDF chip "Button" 112x32: stroke #000 1.5 inside, no fill, radius 4, H gap 8, pad 7/16/7/12, clip: 16x16 PDF icon (boolean "Union" fill #CC1515, frame "noun-pdf-5435919 1") + filename "Merger.pdf" Regular 12 #000.
  - Card variant without attachment: title + body only. Actions (reply/edit/delete): none drawn.

---------------------------------------------------------------------
## 2. DEAL EDIT EVENTS (INTERNAL) (1720:6136)

Identical to Deal in header (1720:6142), key-terms card (6211, same 1354x441 @104,177), right column (6157 @1474,177), Conditions panel (6137 @104,634), Description/Additional Data/Dividend/Disclaimer (6381 "Frame 340" 964x1596, now at y=406 within the content frame). Page card 1784x2535. Content frame "Frame 1000001077" 964x2002 @510,637 (Dates part is 406 high instead of 332). Only the Dates section changes (edit mode):

### 2.1 Dates Summary edit block (1720:6282, V gap 8, pad 16/16/0/16)
- Head 932x16: "Dates Summary" Medium 12 #005268 only (no "Edit Events" link).
- Container "Frame 1000001076" 932x366 V gap 16: table (6286) then action bar.
- Table "Table - Merger Timeline" 932x318: fill #FFFFFF, stroke #E5E7EC 1 inside, radius 4 (view table uses 8), clip. Row structure identical (rows bottom stroke 1 #F5F5F8 inside; the LAST data row uses #E5E7EC bottom; header row fill #F5F5F8 bottom #E5E7EC; cell right stroke 1 #E5E7EC, strokeAlign OUTSIDE).
  - 6 columns: Date 113 / Actual 80 / Agency/Event 234 / Comments 234 (235 in some rows) / Link 234 / action 32 (=932). Cell pad 8/12/8/12 in ALL columns; V layout, top aligned in data rows.
  - Header text: Geist Medium 10 #000 for "Date","Actual","Agency/Event","Comments","Link" (13 high). Action column header empty.
  - Data text: Date, Actual/Expected (status is plain black text here, no blue/grey colour), Comments: Geist Regular 10 #000; Agency/Event: Geist Medium 10 #000; Link: Geist Regular 10 #3675D2 with UNDERLINE (raw URL, wraps).
  - Delete cell (32 wide, pad 8/12, cross centred): trash vector 12x12 fill #DA4D43 (no button chrome, no hover, no confirm).
  - Row heights (sample): 30, 69, 56, 43, 56 (last) - content driven.
  - Add row (6360) 32 high: fill none, bottom stroke #F5F5F8 inside. Cells are the input affordances (placeholder style, no per-cell border; only vertical dividers):
    - Date: H SPACE_BETWEEN center pad 8/12: "dd/mm/yyyy" Regular 10 #7C8DAC + calendar icon 16x16 (lucide/calendar, vector 12x10 stroke #005268 1).
    - Actual: 80 wide, H SPACE_BETWEEN: "Select" Regular 10 #7C8DAC + chevron-down 16x16 (vector 8x4 stroke #005268 1.2).
    - Agency/Event / Comments: "Type here" Regular 10 #7C8DAC. Link: "Paste here" Regular 10 #7C8DAC.
    - Add button cell 32 wide pad 0/8/0/8 centred: "lucide/plus" 20x20, fill #005268, radius 2, white plus vector 8.33x8.33 stroke #FFFFFF 1.2.
- Action bar "Frame 1000001075" 932x32, H SPACE_BETWEEN center (gap 718 value is just the free space):
  - Left: "Cancel" instance "Button Outline"(name) 87x32 but filled: fill #7C8DAC, no stroke, radius 4, pad 7/24/7/24 gap 8, text Regular 12 #FFFFFF.
  - Right: "Save Changes" Button/Default 127x32: fill #005268, stroke #005268 1.5 inside, radius 4, text Regular 12 #FFFFFF.

---------------------------------------------------------------------
## 3. NEW DEAL SCREENS (shared structure)

### 3.1 Page structure (New Deal Expanded 1868:10064; same in New Deal 10765 and Empty 10474 except heights)
- Card "Frame 1000001070" 1784 x H (see 0), V gap 0: body "Frame 1000000972" (H gap 0, 1784 x (H-64)) then footer bar "Frame 1000000958" 1784x64.
- Body = 2 columns:
  - Form column "Frame 1000000968" 780 wide: H gap 12, pad 0/8/24/16, stroke RIGHT 1 #F5F5F8 inside. Contains form stack "Frame 1000000967" 740 wide (V gap 0) and a scrollbar slot "Frame 1000000961" 4 wide (H gap 10, pad 40(top)/0/8/0) with Scroll instance 4x812 (track #E5E7EC r16, thumb #A8B6CD r16, thumb 441.59 of 812 in Expanded). Form column is a scroll region (card height is the window; New Deal 1920x1080 clips at 864 body).
  - Preview column "Frame 1000000971" 1004 wide: V gap 0, pad 0/24/0/16. Heading row 964x42 (H pad 12/0/12/0, center): "Deal Preview" Geist Medium 14 #005268 (86x18). Under it "Frame 1000000970" 964 wide H gap 16, clip: preview card 944 wide + scroll slot 4 wide (pad 40/0/8/0, thumb 441.59/812 style).
- Form stack order: field grid (V gap 16, pad 16/0/16/0, 740x424) -> editors group (V gap 16, pad 8/0/16/0, bottom stroke 1 #E5E7EC inside as divider above Events) -> Events block (V gap 8, pad 8/0/0/0).

### 3.2 Field grid (1868:10087, 740x392)
- GRID layout: 3 columns FLEX 1 each, 6 rows FLEX 1 each, column gap 8, row gap 16, no padding; each cell 241.33 x 52 (row pitch 68, column pitch 249.33).
- Visual order (rows): 1 Target / Company Name / Exchange; 2 Pre-Deal Price / Shares Out. (m) / Total Debt; 3 Acquirer / Company Name / Exchange; 4 Pre-Deal Price / Shares Out. (m) / Total Debt; 5 Deal Title / Deal Type / Deal Status; 6 Deal Value / Start Date / End Date. (Deal Type value "Definitive", Deal Status "Stock Merger" in Expanded/New Deal.)
- Field cell = V autolayout gap 4: label 16 high + control 32 high = 52.
  - Label: Geist Regular 12 #A8B6CD, fill width, no required marker, no asterisk, no helper/error text anywhere.
  - Text input (Input component "w label"): 241.33x32, fill #FFFFFF, stroke #E5E7EC 1 inside, radius 4, H gap 32, pad 7/12/7/12, center vertical; value Regular 12 #000; placeholder Regular 12 #7C8DAC.
  - Select ("Select" component "w label"): same box; H SPACE_BETWEEN; value Regular 12 #000 / placeholder "Select" #7C8DAC + chevron-down 16x16 (vector 12x6 stroke #005268 1.2 at 2,6).
  - Date field ("calendar" component): same box, value/placeholder "dd/mm/yyyy" Regular 12 #7C8DAC; right icon lucide/calendar 16x16 (vector 14x12 stroke #005268 1 at 1,1). (Calendar popover not drawn.)
  - Number with currency (Pre-Deal Price, Total Debt, Deal Value): outer box 241.33x32 (fill #FFFFFF, stroke #E5E7EC 1 inside, radius 4, H SPACE_BETWEEN, gap 32, pad 0): Input segment 143.33x32 (pad 7/12/7/12, text Regular 12 #000 / placeholder "0.00" #7C8DAC) + Currency select segment 98x32 (LEFT stroke 1 #E5E7EC inside, H SPACE_BETWEEN gap 8 pad 7/12/7/12: "USD"/"JPY" Regular 12 #000 or placeholder "Currency" #7C8DAC + chevron-down 16x16).
  - Number spinner (Shares Out. (m)): single input, value left, spinner "Frame 1000001121" 8x18 (V gap 2) at right, two chevron icons 8x8 (vector 8x4 stroke #005268 1.2; the top one flipped as up).
- Deviations from the standalone components: none measured in size (32px control, 12px text, 4px radius); the fields are fixed 241.33 wide via the grid (fill container), not the 40px search; labels sit ABOVE the field (gap 4) in #A8B6CD (the Deal view uses #7C8DAC labels).

### 3.3 Rich-text editors and text areas (frame 1868:10163 "Frame 1000000959" 740x2120 in Expanded)
Each block = V gap 4: label (Regular 12 #A8B6CD, 16 high; labels: Deal Terms, Termination Fee, Walk Provision, Conditions, Description) + control.
- Rich-text editor ("Frame 1000001071", 740 wide): fill #FFFFFF, stroke #E5E7EC 1 OUTSIDE, radius 4, clip, V gap 0. Toolbar instance "rich text" 740x28: fill #F5F5F8, bottom stroke 1 #E5E7EC inside, H gap 0, pad 4/0/4/0, groups 20 high:
  - group widths and contents (each group pad 0/12/0/12, gap 8, 20x20 icons, right divider 1 #E5E7EC inside except the last): [undo, redo] 72 | [pilcrow] 34 (pad 5/12) | [B, I, U, S] 128 | [align centre, justify, left, right] 128 | [unordered list, ordered list] 72 | [link, table(sheet)] 72 | [code </>, expand] 72 (no divider).
  - icon glyphs: lucide strokes #000 1 (10x10 vectors), align/list icons filled #000 (12x8), B/I/U/S are TEXT glyphs in Times New Roman (B = Bold 12, I = Bold Italic 12, U = Regular 12 underline, S = Regular 14 strikethrough), fill #000.
  - Body "Input" fill #FFFFFF, H gap 12, pad 12/8/12/12 (right 8), clip, text 720 wide Regular 12 #000 (placeholder #7C8DAC "Enter Deal Terms"/"Enter Conditions"/"Description"). Body heights: Deal Terms 136 (editor 164), Conditions 588 (editor 616) in Expanded; content-driven; Empty: 120-ish bodies (Deal Terms block 184 incl. label) (visual estimate).
- Plain text area (Termination Fee, Walk Provision): same container (stroke #E5E7EC 1 outside, radius 4, fill #FFFFFF, clip) WITHOUT toolbar; inner "Input" 740x80, H gap 12 pad 12/8/12/12; text Regular 12 #000; placeholder #7C8DAC ("e.g. Company - $32.7M / Parent - $40.0M", "e.g. regulatory out, financing out"). Block height 100 (16 + 4 + 80). Resize handle: none drawn.
- Events block (1868:10182 "events", V gap 8, pad 8/0/0/0, 740x415): label "Events" Regular 12 #A8B6CD, table "Table - Merger Timeline" 740 wide: fill #FFFFFF, stroke #E5E7EC 1 inside, radius 4, clip. Same structure as Deal Edit table: header 32 (#F5F5F8), data rows, add row 32. Column widths 113 / 80 / 170 / 170 (171) / 170 / 32 (=735-740). Header Medium 10 #000: Date, Actual, Agency/Event, Comments, Link. Row typography as Edit (Regular 10; event name Medium 10; delete icon #DA4D43 12x12; add row placeholders Regular 10 #7C8DAC; plus button #005268 20x20 radius 2).

### 3.4 Deal Preview card (right column; 1868:10282 "Frame 317" 944 wide)
- Frame: fill #FFFFFF, stroke #F5F5F8 1 inside, radius 8, clip, V gap 0. Sections:
  1. Header "Frame 185" 944x52: stroke BOTTOM 1 #F5F5F8, H SPACE_BETWEEN center, pad 8/16/8/16. Left V gap 2 (36 high): title "SSTK / GETY" Geist Medium 14 #000 (18 high); subtitle "Shutterstock / Getty Images Holdings, Inc." Geist Medium 12 #7C8DAC. Right chips "Frame 183" H gap 8: 24 high, radius 16, pad 8/16/8/16, gap 10, label Geist Medium 10 (13 high): "Definitive" 77x24 fill #C1F0D5 text #179484; "Cash Merger" 92x24 fill #CAD8F4 text #4162A3. (Deal page chips are 32 high / Medium 12.)
  2. Parties "Frame 314" 944x166: top row 116 high H gap 0: Target (460 wide, V gap 4, pad 8/0/8/16) and Acquirer (460 wide, same pad, LEFT stroke 1 #F5F5F8); section head Medium 12 #7C8DAC; below it two rows V gap 12 each H gap 12 of cells (V gap 2): widths 80 / 200 / 140 - row 1 Ticker, Name, Predeal price; row 2 Exchange, Shares Outstanding (m), Total Debt; label Regular 12 #A8B6CD, value Regular 12 #000. Then totals band 944x50: top+bottom strokes 1 #F5F5F8, pad 0/16/0/16, two groups of 2 cells (120x34, V gap 2, group pad 8/0/8/0): Total Deal Value (value Bold 12), Author, Start Date, End Date.
  3. Text blocks "Frame 1000000966" 944 wide, V gap 8, pad 8/16/8/16, each item V gap 2: label Regular 12 #A8B6CD + value Regular 12 #000 (912 wide): Deal Terms, Termination Fee, Walk Provision, Conditions, Description of Deal.
  4. Events "month" 944x330 (V gap 8, pad 0/16/16/16, radius [4,4,0,0]): label "Events" Regular 12 #A8B6CD; table 912 wide (fill #FFF, stroke #E5E7EC, radius 8) identical to Deal view table: columns 113 / 99 / 270.5 / 270.5 / 158; header Date Medium 10, others SemiBold 12 #000; Status Actual #3675D2, Expected #7C8DAC; "Join the meeting" chip as 1.6.
- Preview scroll: internal 4px scroll instance at right of the preview card.
- Empty state (New Deal Empty): all preview values are a single "-" (Regular 12 #000), title "- / -" Medium 14 #000 and subtitle "- / -" (#7C8DAC), chips replaced by grey pills 24 high fill #E5E7EC with Medium 10 #7C8DAC text "Deal Status" (87 wide) and "Deal Type" (79 wide); labels stay #A8B6CD; no events table (just "Events" label + "-"); Parties block keeps its structure. Preview card shrinks to its content (492 high) leaving blank white area.

### 3.5 Footer / action bar (1868:10443 "Frame 1000000958" 1784x64)
- Fill #FFFFFF; TWO drop shadows (upward): #26395E @ 4%, x0 y-4 blur 9 spread 0; #26395E @ 3%, x0 y-16 blur 16 spread 0. H SPACE_BETWEEN, center, gap 24, pad 16/24/16/24. Sits at bottom of the card (y = body height).
- Left: preview toggle "Group 106" 114x16: track 32x16 radius 40, fill #179484 (ON), knob 12x12 white radius 40 at x+18 (2px inset, right side when ON); label "Deal Preview" Geist Medium 12 #000 at x+40 (gap 8). OFF state not drawn.
- Right "Frame 1000000973" 394x32, H gap 24, aligned right: 
  - Cancel: Button/Default fill #7C8DAC, no stroke, radius 4, pad 7/24/7/24, text #FFFFFF Regular 12 (87x32).
  - "Save as a Draft": Button Outline: no fill, stroke #000 1.2 inside, radius 4, text Regular 12 #000 (132x32).
  - "Add New Deal": Button/Default fill #005268, no stroke here, text white (127x32).
- Empty (disabled/invalid) variant: Cancel unchanged (#7C8DAC/white); "Save as a Draft" disabled: stroke #A8B6CD, text #A8B6CD; "Add New Deal" disabled: fill #A8B6CD, text #E5E7EC. (This is the only validation/disabled visual.)

### 3.6 Heights per variant
- New Deal (1080): body 864 high (form column + preview clipped; scrollbars shown); form shows grid + Deal Terms + Termination Fee + Walk Provision, remaining editors below the fold. Footer at y=864.
- New Deal Expanded (3223): all five editors + Events visible, body 2983.
- New Deal Empty (1544): same layout with placeholders, body 1344; form stack 1320 (grid 424, editors 800, events 96: header + add row only, table 740 with Link col 170).

---------------------------------------------------------------------
## 4. GAPS (searched in these 5 frames, NOT defined in Figma)
- Required-field markers, inline validation/error text, red/invalid input borders: none (only disabled Save/Add buttons in Empty).
- Focus rings, hover, pressed, active states for inputs, selects, date fields, table rows, delete icon, add button, anchor menu items, comment cards, PDF chip, bell/bookmark: none drawn.
- Select dropdown menu, calendar popover, currency list, link dialog, table dialog: not drawn.
- Textarea resize handle/grip, max length counters: none.
- Loading / skeleton states, toast/save confirmation, delete-row confirm dialog, discard-changes dialog: none.
- Toggle OFF state for "Deal Preview": not drawn.
- Comment composer/new-comment input, reply/edit/delete actions, attachment upload UI, other attachment types (only Merger.pdf chip): not drawn.
- Anchor menu active-state scroll behaviour, sticky behaviour: not specified.
- Responsive behaviour below 1920: not specified (frames are fixed 1920).
- Conditions panel overflow (clipped fixed text box, no scrollbar) and the right-column comment list overflow (scroll instance only) are visual only.
- Known inconsistencies to decide on rebuild: card radius 12 (Deal/Edit) vs 8 (New Deal); view-table radius 8 vs edit/new-table radius 4; header typographies Medium 10 (edit/new) vs SemiBold 12 + Medium 10 date (view); "Cancel" uses Button Outline component with grey fill; Status colouring only in view mode.

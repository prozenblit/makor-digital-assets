# FX Engine Room - Dashboard widgets, Activity, Rates (Figma harvest)

File key `yuJA7DtjFKnqTZQcu2vKYN`, page "Page 1" `0:1`, SECTION "Section 3" `7114:14467`.
All values read via Plugin API (exact). `{Name}` = bound Figma variable. Items marked "(visual estimate)" came from screenshots only.
Coordinates are parent-relative unless stated. Children of GROUP nodes report x/y relative to the group's parent FRAME (Figma API behaviour).
Font is always **Nunito** (Medium unless stated). Line-height AUTO, letter-spacing 0% everywhere in this area.

## 0. Tokens seen in this area (name -> hex)

| Variable | Hex | Used for |
|---|---|---|
| BG | #000000 | dashboard content canvas |
| Modal BG | #242428 | widget card body, dropdown/menus, filter panels |
| Inputs on modal | #39393C | widget title bar, search inputs, date inputs, scroll track, status filter panel header |
| Separators | #39393C | all hairlines (1px), header-bar bottom stroke, footer top stroke |
| Menu bar | #39393C | left rail fill, unchecked checkbox fill |
| BG Grey 1 | #171719 | (old Activity) tab-strip band; Tabs hover fill is bound to variable named "Grey 2" #171719 |
| Primary text | #FFFFFF | all primary text |
| Light grey text | #BABEC7 | icons, footer brand text, inactive tab text |
| Secondary text | #707079 | column headers, zero P&L, scroll thumb, labels |
| Primary purple (a.k.a. Purple 1) | #A4A4FF | active tab underline, checked checkbox, dropdown caret, selected-count text |
| Purple 2 | #39394E | P&L pill bg, transparent-button bg |
| Purple 3 | #7373BB | P&L pill label text |
| Green 2 / Active | #2BDF68 | rate up price + arrow; live pulse |
| Red 2 | #FD7557 | rate down price + arrow; "Outlined red" button |
| Edit / Orange | #FF9747 | tooltip text, header icon, footer pulse override |
| Add New | #30F0D6 | "New Trade" button bg, "New" row label, new-row highlight |
| delete | #FF7272 | Delete button |
| yellow #FEE274, blue #60A8FF | outlined yellow / blue button strokes |
| red dark #392C2D | Outlined red hover fill. (Outlined red "active" fill #5A3834 is raw, unbound) |
| Effect style "tooltip shadow" | DROP_SHADOW #000000@0.4, x-1 y2 blur4 spread0 | menus, tooltip, Widgets dropdown. Filter panels use same style name but override alpha to 0.5, x-2 y2 blur4 |

## 1. Dashboard canvas - two frames compared

Both 1440x1024 frames named "WIdgets Dashboard New Sizes" inside Section 3.

| | `4243:15535` (x3455 y9657) | `6038:13964` (x4959 y9657) |
|---|---|---|
| Newer? | older (lower node IDs, no Activity widget) | **NEWER** (has Activity Blotter widget, widget-picker with checkboxes, `Trades` shortened to 587 high) |
| Widgets | Trades `4250:17344` (8,56 1070x910) + Prices `4243:15845` (1086,56 290x910) | Activity `6038:13704` (8,56 1070x315), Trades `6038:14417` (8,379 1070x587), Prices `6038:13992` (1086,55 290x911) |
| Header icon buttons | two 32x32 buttons: Frame 26 `7069:14470` at x654 (icon fill {Orange} #FF9747) and Frame 25 `4243...:4255:16177` at x702 (icon {Edit} #FF9747) | only Frame 25 `6038:14713` at x702 |
| Header dropdown menu | "Widgets" `7069:14810` 77x68 at (697,44): items "Default" y16 / "EFX" y44, Nunito Medium 12 white; highlight rect 77x24 at y36 fill {Inputs on modal} behind EFX | "Widgets" `6136:14349` 136x96 at (651,44): 3 rows (Trade Blotter / Activity Blotter / Rates), each with Checkbox instance (Checked) at x8, y 12/40/68; labels Nunito Medium 12 at x32, y 16/44/72 |
| Menu shape | fill {Modal BG}, radius 4, effect style "tooltip shadow", clip | same |
| Tooltip | `4402:16433` x0 y954 191x32 | `6038:14722` x1242 y954 191x32 |

Common structure of the dashboard frame (both):
- Frame 1 (left rail) 56x1024 at 0,0, fill {Menu bar} #39393C, clip. Icons 24x24 at x16: Menu tab 1 (instance `3631:3768`) y64; purple active-tab glyph "Subtract" fill {Primary purple} y120; "csv" (download glyph, BOOLEAN_OPERATION, fill {Light grey text}) y176; "deleted trades" (trash VECTOR, fill {Light grey text}) y232; Settings instance (`3631:3776`) y984.
- Frame 2 (logo cell) 74x48 at 0,0, fill {Primary purple} (as read; logo glyph rendered in the 56x48 Frame 5; the visible logo box is dark with purple/white "FX Engine Room" mark (visual estimate)).
- Frame 3 (content canvas) 56,0 1384x1024 fill {BG} #000000, **top-left radius 16** (others 0), clip. Contains footer + widget cards.
- Frame 4 (top bar) at (55 or 56),0 1384x48, **bottom stroke 1px {Separators} INSIDE**, clip. Sits over the top 48px of the content canvas.
- Content margins: widgets start x8 / y56 (8px under the top bar); gap between Trades and Prices = 8 (1078 -> 1086); right margin 8 (1376 -> 1384); Newer layout vertical gap Activity->Trades = 8 (371 -> 379); Trades ends 966, 12px above footer (978).

### 1.1 Top bar (Frame 4, `4243:16272` / `6038:14703`)
- "Dashboard" TEXT at (20,18) 80x11, **Nunito Medium 16**, fill {Primary text}.
- User avatar VECTOR 32x32 at (1336,8), fill {Light grey text}.
- Dropdown instance (`Dropdown` `3631:3888`) at (1117,8) 203x32, fill {Modal BG}, radius 4, auto-layout H, gap 8, padding T8 R12 B8 L8, space-between / centre, clip. Text "Makor Securities" **Nunito Regular 14** {Primary text}; caret POLYGON 12x8 rotated -180, fill {Purple 1} #A4A4FF.
- P&L pill "Group 129" at (750,8) 351x32: Rectangle fill {Purple 2} #39394E radius 4; texts Nunito Medium 14 centred: labels "Option Premium" (x765, 104w) and "Total P&L" (x933, 62w) fill {Purple 3} #7373BB; values "0.00" (x877) fill {Purple 1}, "3,646.52" (x1003) fill {Primary purple}. All y19 h10.
- Icon buttons: 32x32 at y8, fill {Separators}, radius 4, clip; inner 16x16 vector at (8,8) fill {Edit}/{Orange} #FF9747. Gap between 654 and 702 buttons = 16.

### 1.2 Footer (Frame 8, `4243:15556` / `6038:13985`)
- 1384x46 at (0,978), auto-layout H, gap 1016, padding T8 R12 B8 L12, main SPACE_BETWEEN, cross CENTER, width FILL height HUG, **top stroke 1px {Separators} INSIDE**, clip.
- Left: Makor mark (Path 1852, 24x19.6, fill {Light grey text}) at x12, then text "FX Engine Room | Operated by Makor Group" Nunito Medium 14 {Light grey text} (280x10) 11px right of the mark (text x59 in frame).
- Right: "Using indicative rates" Nunito Medium 14 {Secondary text} (136x10) then 30x30 pulse instance (see s7.2) rotated -180; instance fills overridden to {Edit} #FF9747 (orange = indicative/not live; the component default is {Active} green).
- Tooltip "Bloomberg Disconnected": 191x32 (width HUG, height FIXED 32), fill {Inputs on modal} #39393C, radius 4, effect "tooltip shadow", auto-layout H gap10, padding T11 R16 B11 L16, centred; text **Nunito Regular 14** fill {Edit} #FF9747. Placed bottom-left (x0,y954) in dashboard 1, bottom-right (x1242) in dashboard 2.

## 2. Widget card pattern (all widgets: Activity, Trades, Rates/Prices)

- Card: FRAME fill {Modal BG} #242428, **radius 8**, clip, no stroke, no shadow. Sizes: Activity 1070x315, Trades 1070x910 (dash 1) or 1070x587 (dash 2), Prices 290x910/911.
- Title bar: RECTANGLE "Rectangle 18" at (0,0) width card+1 (1071 or 291; 1px overflow is clipped), **height 32**, fill {Inputs on modal} #39393C. (Old larger Activity `3631:4652` uses h40.)
- Title text: Nunito Medium **14** {Primary text}, x16, y10 (Trades/Rates) or y11 (Activity) -> vertically centred in 32. (Old Activity: Medium 16 at y15 in 40px bar.)
- Drag handle "Union" (BOOLEAN_OPERATION of 6 vectors, a 2x3 dot grid, dots 3x3 each at col x 0 and 7, row y 0 / 6.48 / 13), 10x~15-16, fill {Light grey text}. Position: Activity x1012 y8 (h14.94; old y11.21); Trades x1020 y8 (h16); Rates x240 y8 (h16). I.e. 50px from right edge (58 for Activity).
- Close "X": FRAME "Close" 16x16 clip; inner Union 11.6x11.6 at (2.2,2.2) of two 45deg-rotated bars (1.3333 x 15.0667 rectangles, union) fill {Light grey text}. Position: Activity x1038 y8.79 (16 from right edge); Trades x1042 y8 (12 from right); Rates x262 y8 (12 from right). Older Activity: y12 in 40 bar.
- Resize grip "Frame 28": 24x24 clip at bottom-right (Activity (1046,291) in 1070x315; Rates (266,886) in 290x910). Inner VECTOR 10x10 at (7,7): path `M 10 0 L 10 10 L 0 10` (an L corner), stroke 2px {Light grey text}, round cap, miter join, no fill.
- Scrollbar "scroll" group: track RECTANGLE width 4 (Activity/Rates dash) or 8 (standalone Rates Widget), radius 12, fill {Inputs on modal}, effect DROP_SHADOW #000@0.25 x0 y4 blur4 (not on the 8px standalone variant); thumb RECTANGLE same width, radius 12, fill {Secondary text}. Positions: Activity (dash2) x1058 y96 4x195, thumb h67.47; Activity (6059) x1058 y76.89 4x196.78, thumb h68.09; Rates (dash) x278 y60 4x808, thumb h279.58; standalone Rates Widget x274 y11 8x770, thumb h266.43. A second scroll group `6065:14492` at x569 y96 serves the left half in the split Activity.
- No drag/hover/active states drawn on the handle/close.

## 3. Activity feed / "Activity Blotter" widget

There are 3 versions.

### 3.1 `6038:13704` (inside newer dashboard) - split Client | Market Maker, 1070x315
- Title bar as s2 (title "Activity Blotter" Medium 14 at x16,y11).
- Tab row at y32, 32 high: two non-instance frames "Tabs" `6059:14429` (x0, 534w) and `6059:14433` (x535, 534w), auto-layout H gap8 padding T12 R24 B12 L24, centre/centre. Their text ("Client" / "Market Maker", Nunito Medium 14) is **fill {Primary purple} (#A4A4FF)** in both halves, centred (so both halves read as section titles, not toggles).
- Hairline under tabs: LINE `6038:13726` at y64, 1071 wide, stroke 1 {Separators}. Vertical divider LINE `6059:14491` (in dashboard frame 3) rotated -90deg, length 283, at x589 y88 (frame 3 coords), stroke 1 {Separators}.
- Column header row: texts Nunito Medium **12** {Secondary text}, centred, y72 (h8); hairline LINE `6038:13744` at y88. Left half headers: Account x67 (w45), Trades x213 (w37), Volume x344 (w42), "P&L (USD)" x462 (w59). Right half: Account x657, Trades x820, Volume x933.
- Rows: pitch 28px; 1px {Separators} lines every 28 (y116, 144, ...) 291-wide per half (24 lines); no row fills; row text first baseline y98.
- Cell styling: Nunito Medium 12 {Primary text}. Left half columns: Account LEFT-aligned at x31 (e.g. "Makor Securities" 90w, "HSBC BH LB HSBC" 108w); numerics RIGHT-aligned: Trades right edge 242 (x220 w22 "639"); Volume right edge 391 ("2,890.32" x342 w49; "48.52" x359 w32); P&L right edge 516 ("0.00" x491 w25). **Zero P&L is {Secondary text} #707079; non-zero P&L {Primary text}.** Sample rows alternate "Makor Securities / 639 / 2,890.32 / 2,890.32" and "HSBC BH LB HSBC / 639 / 48.52 / 0.00".
- An off-frame "Group 114" dropdown also exists in the 6059 version (see s3.2).
- Right half columns start x621 (Account), 828/22 (Trades), 929/49 (Volume).

### 3.2 `6059:14318` (standalone, 1070x315)
Same as 3.1 but single-grid with true Tabs instances: "Tabs" `6059:14340` (States=Active, x0 y32 81x32; stroke bottom 2px {Primary purple} INSIDE; text "Client" Medium 12 {Primary text}) and `6059:14341` (States=Not Active, x86 123w; text "Market Maker" Medium 12 {Light grey text}; ON_HOVER reaction -> variant `States=Hover` `3631:3884`, no transition animation). Tab padding T12 R24 B12 L24, gap 8, width HUG, height FIXED 32. Hairlines at y64 and y88. Headers Account(x58,w45) Trades(x188,w37) Volume(x293,w42) "P&L (USD)"(x404,w59). Rows: Account LEFT x27; Trades right edge 218; Volume right edge 338; P&L right edge 458 (colour rule as above). Row pitch 28, lines at y116,144,... Group 131 `6059:14347` has 64 children (lines + cells).
- Group 114 `6059:14319` -> Frame 23 `6059:14320` placed OFF-frame at (1188,42) 132x80: a dropdown for choosing the blotter type: fill {Inputs on modal} #39393C, radius 4, shadow #000@0.4 (-1,2) blur4, three options Nunito **Regular** 12 fill #FFFFFF (unbound): "B2B Spot" (8,12), "Client Spot" (8,36), "Market Maker Spot" (8,60) - 24px pitch.

### 3.3 `3631:4652` (older, 1070x461, tab-heavy)
- Title bar h40 (Rectangle 18 {Inputs on modal}), title "Activity Blotter" Medium 16 at (16,15), grip x1012 y11.21, close x1038 y12, resize grip (1046,437).
- Band "Rectangle 28" at y40 1070x32 fill {BG Grey 1} #171719 holding the **primary nav tabs** (frames radius [8,8,0,0], auto-layout H gap10 padding T12 R24 B12 L24, text Medium 14 {Primary text}): Activity `3631:4675` (x0 w97, **selected: fill {Modal BG}**), Ladder (x98 w93), Credit (x192 w87), Deals Editor (x280 w126), Expirations (x407 w119), Reports (x527 w99) - no fill.
- Sub-tabs at y72 (Tabs instances, 32 high; active = bottom 2px {Primary purple}, text {Primary text}; inactive text {Light grey text}): Account x0 w100 (Active), Counterparty x100 w132, Platform x232 w104, Prime Broker x336 w131, Contract x467 w102. Line `3631:4674` at y104.
- Column headers y112, Nunito Medium **14** {Secondary text}, centred: Account(x36 w52) Open(146,35) Today's(198,48) Volume (mm)(263,86) Avg Daily Vo(359,82) Volume(458, w63 with sort triangle POLYGON 12x12 at x458 stroke 1 {Secondary text}) PL (USD)(540,59) Avg Daily PL(613,82) P&L(708 w41 with same sort triangle) Avg Size (mm)(760,92) mm PL(857,45) # days(917,42) MTD PL(986,52). Hairline `3631:4692` at y133. Group 131 `3631:4704` (193 children) rows start y143.
- Same scroll group at x1058 y144.52 4x287.99.

## 4. Rates widget

### 4.1 Standalone `6234:14341` "Rates Widget" 290x794 (92 children)
- Fill {Modal BG} (0.1426,0.1426,0.1556 = #242428), radius 8, clip. **No title bar in this frame.**
- Header labels: "Symbol" `6234:14373` x54 y12 (49x10), "Price" `6234:14374` x197 y12 (32x10): Nunito Medium **14** {Secondary text}, centred. Header hairline LINE "Line 1" at y34 (x-1, 291 long), stroke 1 {Separators} CENTER.
- Row grid: pitch **28px**; row i occupies y34+28i .. y62+28i; each row bottom has a 1px LINE (y62, 90, 118 ... 818, 846; width 291, x-1). Row content vertically centred: contents y42 (row1), 70 (row2), 98 ... 12px-high.
- Symbol cell group (e.g. `6234:14462`, 107x12 at x16): [flag 1 (Group 26: MasterFlag instance 16x12 radius 2 clip, then currency code TEXT Nunito Medium 12 {Primary text} at x36 (flag x+20), y+2)] ["/" TEXT Nunito Medium **14** {Primary text} x71 w5 centred] [flag 2 (Group 25) at x84, code at x104]. Group widths 107 (AUD/JPY) or 113 (NOK/PHP) depend on code width only. Gap flag->code 4px; code->"/"->flag spacing: code ends at x63, slash at 71-76, next flag x84.
- Flag component: `MasterFlag` instance of set (Circle=no, Square=no, Rectangle=no, **Rounded=yes**) `584:265` -> 16x12, radius 2, clip; nested country instance (e.g. "au Australia" `584:498`, "jp Japan" `584:506`, "no Norway" `594:3919`, "ph Philippines" `594:4211`) 16.55x12.27 at offset (-0.28,-0.14). Flag colours are hardcoded (#012169, #C8102E, #ED2939, #002664, #0038A8, #CE1126, #FCD116 etc.).
- Price cell group (e.g. `6234:14375`, 70x12 at x178): price TEXT Nunito Medium **12**, RIGHT aligned, box x178 w54 y+3 h8; direction icon VECTOR 12x12 at x236 (gap 4 after text box). Colours: **up = {Green 2} #2BDF68** (arrow icon pointing up inside a filled circle), **down = {Red 2} #FD7557** (same icon flipped vertically: relativeTransform [[1,0,236],[0,-1,y+12]]). Text and icon share the fill. Sample prices "0.908518" (up, 15 rows) and "7.113453" (down, 14 rows), alternating AUD/JPY (up) and NOK/PHP (down).
- Icon path (12x12, NONZERO): circle `M 6 0 C 2.6865 0 0 2.6865 0 6 C 0 9.3135 2.6865 12 6 12 C 9.3135 12 12 9.3135 12 6 C 12 2.6865 9.3135 0 6 0 Z` minus an up-arrow `M 8.3535 5.3535 C 8.2555 5.4515 8.1275 5.5 7.9995 5.5 L 6.5 5.5 L 6.5 9 C 6.5 9.276 6.2765 9.5 6 9.5 C 5.7235 9.5 5.5 9.276 5.5 9 L 5.5 5.5 L 4.0005 5.5 C 3.8725 5.5 3.7445 5.4515 3.6465 5.3535 C 3.451 5.158 3.451 4.842 3.6465 4.6465 L 5.6465 2.6465 C 5.744 2.549 5.872 2.5 6 2.5 C 6.128 2.5 6.256 2.549 6.3535 2.6465 L 8.3535 4.6465 C 8.549 4.842 8.549 5.158 8.3535 5.3535 Z`.
- Scrollbar: x274 y11, 8x770 track {Inputs on modal} r12; thumb h266.43 {Secondary text}.

### 4.2 In-dashboard Rates card "Prices" `4243:15845` (290x910) / `6038:13992` (290x911)
- Card chrome per s2 (title "Rates" Medium 14 at x16,y10). Column labels "Symbol" (x58,y40,w42) and "Price" (x201,y40,w27): Nunito Medium **12** {Secondary text} (12 here vs 14 in standalone). Header hairline at y56 (291 long).
- Rows: pitch 28, first row content y64 (symbol x17, price text x179, arrow x237), lines at y84,112,140,... through 952 (Group 132 `4243:15869` holds 34 lines + 48 cells; partial last row clipped by card bottom, matching screenshot).
- Same colour rule: up {Green 2}, down {Red 2}; same alternating AUD/JPY (0.908518 up) and NOK/PHP (7.113453 down); **no spread / bid / ask columns are drawn - only a single "Price"**.

## 5. Filter panels

### 5.1 Checkbox-list filter `6234:14340` (237x256) and Status filter `6765:14776` (158x144, in blotter)
- Panel: FRAME fill {Modal BG}, radius 8, effect "tooltip shadow" (#000@0.5, x-2, y2, blur4), clip, 16px inner padding (absolute positioning, children at x16).
- Search `6234:15090` at (16,16) 205x24: inner "Frame 8" fill {Inputs on modal} radius **2**, auto-layout H gap 8 pad 8, cross CENTER; magnifier VECTOR 12x12 stroke {Primary purple} weight 4.17 INSIDE; placeholder "Search" Nunito **Regular** 12 fill {Secondary text}.
- Rows: 32px pitch (y56, 88, 120, 152, 184, 216, 248), each a group = Checkbox 16x16 at x16 + label at x40 (24px from box left), label Nunito Medium 12 {Primary text}, y +4.
- First row = **"All / deselect all"** control: `deselect all` component set `4398:15505`, variants: `no trades selected` (38x16: Checkbox frame 16x16 radius 2, stroke 1 {Separators}, empty) and `trades selected` (38x16: text "(5)" Nunito Medium 12 {Primary purple} at x20 y4 + Checkbox frame 16x16 fill {Primary purple} radius 2 containing a **minus**: LINE 10 wide at x3 y9 stroke #000000 1.5px = indeterminate state). In filter 6234:14340 the instance shows fill {Separators} on its Checkbox. Standalone frame `4617:14314` "all" (24x24 holder, checkbox 16x16 at 4,4) shows the same indeterminate box. Then "All" label.
- Row items: "Blanks" (Checked), "HSBC BH ALPHA HSBC" (Unchecked), "HSBC BH EM HSBC" (Checked), "HSBC BH LB HSBC" (Checked), "HSBC BH ALPHA HSBC" (Checked), "HSBC BH EM HSBC" (Checked).
- Checkbox component set `4398:15418` (and a twin `3631:3819`): 16x16 radius 2. **Unchecked** `4398:15419`: fill {Menu bar} #39393C, empty 12x9 vector. **Checked** `4398:15421`: fill {Primary purple} #A4A4FF, tick VECTOR 12x9 at (2,3) fill {Black} #000. ON_CLICK -> CHANGE_TO other variant (no transition). `4617:14317` "Checked" and `4617:14320` "Unchecked" are 24x24 holders (checkbox at 4,4).

### 5.2 Date filter `6236:14733` (237x136)
- Same panel chrome. Two `Dates` instances (set `4398:15316`, 205x44 at (16,16) and (16,76)): Label Nunito **Regular** 12 {Secondary text} ("From" / "To") at y0; input "Frame 9" at y12, 205x32, fill {Inputs on modal} radius **4**, H auto-layout gap 8 padding T8 R12 B8 L8, SPACE_BETWEEN/centre; value text Nunito Regular 14 {Primary text} ("11/08/2024", "24/03/2025", date format DD/MM/YYYY); calendar icon VECTOR 16x16 at x177 fill {Primary purple}.

### 5.3 Blotter toolbar controls (for cross-reference; Trades widget `6038:14417`, y40 row, 24 high, text Nunito **SemiBold 12**)
- "Outlined yellow" x8 74w (stroke 1 {yellow} #FEE274, radius 2, pad 11/20); "Amend" x90 80w fill {Edit} #FF9747 text #000; "Outlined blue" x178 86w (stroke {blue} #60A8FF); "Delete" x272 77w fill {delete} #FF7272 text #000; "Review (12)" x410 100w Outlined red; "status" x518 96w fill {Purple 2} radius 3 text {Primary purple} + caret 8x4 stroke 1.3 {Primary purple}; "Clear Filters" x622 99w Outlined purple stroke 1 {Primary purple} radius 3 text {Primary purple}; Search x733 205x24 ({Inputs on modal}, radius 2); "New Trade" `With dropdown` x950 112w fill {Add New} #30F0D6 radius 2, text #000 SemiBold 12 + caret 8x4 stroke 1.3 {Black}; "deselect all" selector at (8,76); status filter panel `6765:14776` at (487,69) 158x144.

### 5.4 Button variants seen
- **Outlined red** set `6113:14388` (100x24, radius 2, H gap 4 pad T11 R16 B11 L16, text "Review" + "(12)" Nunito SemiBold 12): Default stroke 1 {Red 2}, text {Red 2}, no fill; **hover** `6113:14389` fill {red dark} #392C2D (+ same stroke/text) (instance `6113:14392` is the hover); **active** `6136:14340` fill #5A3834 (raw); **disabled** `6403:14741` stroke {Secondary text}, text {Light grey text}.
- **Button transparent** set `4398:15491`: Default fill {Purple 2} radius 3 H gap 8 pad T11 R24 B11 L24 text SemiBold 14 {Primary purple}; Hover adds second fill #FFFFFF@0.2 + stroke 1 {Primary purple}; disabled fill {Secondary text} text {Light grey text}. In widgets it is used as "Allocate" (`4250:17595`, 86x24, pad 11/20, SemiBold 12, radius 2, fill {Purple 2}, text {Primary purple}).
- **Tabs** set `3631:3881`: Active (bottom stroke 2 {Primary purple}, text {Primary text}), Hover (fill #171719 bound to "Grey 2" + bottom stroke 2 {Primary purple}, text {Primary text}), Not Active (no fill, text {Light grey text}; ON_HOVER -> Hover, no transition). Component size 102x42 padding 16/32/16/32 gap 8 Medium 14; instances in widgets override to padding 12/24 (see s3).

## 6. Misc frames

- `Love` `6038:15341` 24x24, clip, **empty (0 children)** - presumably an empty placeholder icon slot.
- `Received` `2281:1389` 50x50, clip, **empty** (located at x7717 y4306, with other off-grid frames).
- `Frame 182` `6807:14782` 310x3, solid #FFFFFF, clip, no children (a loose white 3px bar/placeholder, no meaning inferable).
- CSV/export: only the left-rail "csv" glyph (24x24, BOOLEAN_OPERATION at x16 y176 in the rail, fill {Light grey text}; shape = download arrow-to-tray (visual estimate)). No csv dialog / format controls drawn in my nodes. "deleted trades" trash glyph at y232 and the "(5)" selected-count control are the other export/bulk affordances.

## 7. Animations

### 7.1 SECTION "Animation New trade" `2391:2768` (page-level, x-8983 y-3301, 4873x4311)
Contains: (a) static frame "Blotters" `2364:5792` 1440x1024 at (100,100) (left rail Frame 1 56 wide, Frame 2 72x56, Frame 3 canvas 1384x1024) = the dashboard shell used as the poster; (b) COMPONENT_SET "Component 1" `2380:2415` 2866x4111 at (1849,100) with variant property `Property 1` = 1..8, each variant a 1368x906 Trades blotter (126-128 children). It animates **a new B2B trade arriving at the top of the Trade Blotter**: two new grouped rows ("Client Spot" SELL -12000 AUD/JPY Goldman S... 17.1213 and "Market Spot" BUY 12000 HSBC 18.0878, ID 1234567, 20/05/2024 13:32:35, prime broker RBS, direction Client / Market Maker) are inserted above the existing rows, and flash with a teal highlight.

Variant sequence (Prototype reactions, every variant AFTER_TIMEOUT -> CHANGE_TO next variant with SMART_ANIMATE, easing EASE_IN_AND_OUT; "hold" = timeout, "dur" = transition):

| From | Hold (s) | Dur (s) | To | State change |
|---|---|---|---|---|
| 1 | 0.6 | 0.2 | 2 | Baseline list (126 children, no new rows). On leaving: every existing row/line/cell shifts down **56px** (2 rows x 28) to open a gap at y82-137 |
| 2 | 0.15 | 0.3 | 3 | The 2 new rows are added (126 -> 128 children): highlight "Rectangle 12" (0,82 1368x55) fill {Add New} #30F0D6 alpha 0 -> **0.1**; "New" labels (x32, y92 and y120, Nunito Medium 12, fill {Add New}) visible; new rows' Checkbox instances (x8,y88 / y116, Checked purple 16x16) hidden |
| 3 | 0.3 | 0.2 | 4 | highlight -> 0, labels hidden |
| 4 | 0.1 | 0.1 | 5 | highlight -> 0.1, labels visible |
| 5 | 0.25 | 0.2 | 6 | highlight -> 0, labels hidden |
| 6 | 0.1 | 0.1 | 7 | highlight -> 0.1, labels visible |
| 7 | 1.0 | 0.1 | 8 | new rows' group nudges y90->88, h40->44; checkboxes become visible (rows now "selectable"), highlight stays 0.1 |
| 8 | 1.0 | 0.3 | 1 | rows removed (128->126 children), others shift back up 56px; loop |

So: a 3-flash blink (3 on / off / on / off / on) of the "New" highlight and label, then settle.

Row visuals in the animation (also the dashboard blotter): row height 28, line {Separators} 1px (0..1368); text Nunito Medium 12 {Primary text}; "Goldman S..." is Nunito Regular 14 (inconsistent); SELL/BUY/quantity use fill {White} (a "White" primitive, same #FFFFFF); flag cells as s4; new-row tint = #30F0D6 at 10% opacity.

### 7.2 Live-status pulse "Animation" `3631:3782` (component set, 4 variants, 30x30, rotated -180)
Used in the footer next to "Using indicative rates" (instance `4243:15562`, fills overridden to {Edit} orange). Looping prototype:
- `1` `3631:3795`: ellipses a,b,c all 8x8 at (11,11): a {Active} #2BDF68; b,c {Active}. Hold 0.1s -> `2`, SMART_ANIMATE **EASE_IN 0.05s**.
- `2` `3631:3791`: a 10x10 @ (10,10) {Active}; b 16x16 @ (7,7) {Active}@0.2; c 12x12 @ (9,9) {Active}. Hold 0.01s -> `3`, SMART_ANIMATE EASE_IN_AND_OUT 0.3s.
- `3` `3631:3787`: a 10x10 @ (10,10); b 30x30 @ (0,0) {Active}@0.1; c 20x20 @ (5,5) {Active}@0.2. Hold 0.01s -> `4`, SMART_ANIMATE EASE_IN_AND_OUT 0.3s.
- `4` `3631:3783`: a 8x8 @ (11,11); b 40x40 @ (-5,-5) {Active}@0.1; c 30x30 @ (0,0) {Active}@0.05. Hold 0.001s -> `1`, **DISSOLVE EASE_IN_AND_OUT 0.3s**.
Reads as a radar/sonar ripple: dot grows 8->10 with two halos expanding to 30/40px and fading.

Other prototype interactions found: Tabs Not Active ON_HOVER -> Hover (instant, no transition); Checkbox ON_CLICK toggles Checked/Unchecked (instant). No drag/resize/open-close animations drawn.

## 8. GAPS (searched for, NOT drawn in my nodes)

- Rates: no bid / ask / spread columns, no title-bar in the standalone frame, no flash-on-tick, no hover, no empty / loading / error / stale state, no sort. Only up/down colour pair.
- Activity: no loading / empty / error state; no hover/selected row styling; no filter chips; Activity row hover/focus not drawn; Received / Sent type labels or status colours do **not** exist in "Received" `2281:1389` (empty 50x50 frame); "Love" empty. No timestamps/amount-status feed exists - Activity Blotter is an account P&L table (Account / Trades / Volume / P&L).
- Widget cards: no drag-in-progress, resize-hover, collapsed, maximised, focus or loading states; no widget "add" empty-slot state.
- Filter panels: no apply / clear buttons inside the panel (the toolbar has a separate "Clear Filters" outlined-purple button); no hover/focus/pressed row states; no empty search result; Date picker calendar popover not drawn.
- CSV/export: only the rail glyph; no dialog, progress or error.
- Dashboard: no responsive variants; no scrolled/overflow state of the header.

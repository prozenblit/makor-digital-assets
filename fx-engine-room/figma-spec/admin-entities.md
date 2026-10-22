# FX Engine Room - Admin: Entities / Trading Accounts / Statics / Reports (Figma yuJA7DtjFKnqTZQcu2vKYN, page 0:1)

Harvested read-only via use_figma. Notation: `{Var}` = bound Figma variable name. `(visual estimate)` = read from screenshot only. All text is **Nunito** (Regular/Medium/SemiBold). line-height auto, letter-spacing 0 everywhere. Coordinates "x,y WxH" are relative to the stated parent. Most admin screens are NOT auto-layout (absolute groups); only buttons, dropdown/input instances, footer bar, tabs and chart legends use auto-layout - spacing for the rest is measured from positions.

## 0. Variable palette actually used here
| Variable | Hex | Used for |
|---|---|---|
| Primary purple / Purple 1 | #A4A4FF | links, active tab underline, checked checkbox, selected row name, Save/primary button, dropdown caret, radio, edit pencil |
| Purple 2 | #39394E | selected list row, "Add New" (secondary) button fill, Trade-Reports chip |
| Purple 3 | #7373BB | section labels ("Trading Accounts", "Traders"), old permission list names |
| Primary text | #FFFFFF | titles, values |
| Light grey text | #BABEC7 | secondary values, inactive tabs, current breadcrumb, footer text |
| Secondary text | #707079 | field labels, table headers, type line, disabled button fill |
| Separators = Menu bar = Inputs on modal | #39393C | dividers, sidebar, input/field fill on modal, group header strip |
| BG Grey 1 | #171719 | page body + footer |
| BG | #000000 | content frame, top bar |
| Modal BG (= Grey 6) | #242428 | modal, group cards, nested inputs |
| Cancel Button | #E6E6E6 | Cancel/Close button fill (text #000000) |
| Edit | #FF9747 | orange "+" add buttons (32x24, R4, glyph #000000 12x12) |
| Active | #2BDF68 | Active switch track, status dot, footer pulse |
| Add New / Green | #30F0D6 | primary "Add New"/"Add Permissions" button fill; "Add Permissions" outline |
| delete / Red | #FF7272 | trash icon, error stroke + message, Log Out icon |
| blue | #60A8FF | breadcrumb links in all 1440 frames (NOT in 1280 TA) |
| yellow | #FEE274 | DEV chip |
| Black | #000000 | glyphs on orange/checked fills |

## 1. Inventory (every screen / state)
### SECTION Entities 3999:18361 (6 frames, each 1440x1024 except Frame 3)
| id | name | what it shows |
|---|---|---|
| 3648:7322 | Static Users | ONLY sidebar (Frame 1 56 wide) + logo tile. Misnamed; it is the left half of the Entities list screen |
| 3648:7348 | Frame 3 (1384x1024 @156,100) | Entities list content: top bar "Entities", Search 208x32, "Add New", table (Account ID, Entity Name, Country, LEI, Active, edit) 2 rows |
| 3648:7418 | Entity | Entity detail, left panel only + empty-state "Select a trading account" |
| 5922:13690 | Entity | Entity detail + analytics (3 donut charts + multi-line chart, zoom 1D/1W/1M/3M/6M/ALL) |
| 3657:4471 | Trading Account | Trading-account detail, OLDER version (left master list of products, right detail) |
| 3769:8602 | Trader | Trader detail (Max Shepley): 4-level breadcrumb, DEV chip, recipients, Assignment checkboxes |
### SECTION Statics 1254:3638
Static Clients 1:2 (table + Log Out menu open), Static Users 160:97, Static Currency pairs 1254:3640; modals: Edit Client 2514:2818 (807x605), Edit User 1945:2735 (562x341), New/Edit prime broker 267:157 (472x217, titled "New Prime Broker"), New Currency Pair 476:175 (392x217), Edit Cut 276:271 (303x217); Search with label 1971:2831 + dropdown list 1971:2821 (open City picker).
### Section 3 (canonical, 7114:14467) - my nodes
Trading Account 1280*1040 4164:14303 (CANONICAL, visible), Trading Account 1920*1080 4031:18455 (HIDDEN), New Entity 5535:14276, New Trading Account 5536:14786, New Trader 5539:15255, Add Permissions 5587:14498 and 5580:14451, Reports 6878:14782, CSV 3107:2972 and 2958:3082 (both HIDDEN), Group 163 4138:14488 (empty-state panel).

## 2. Shared screen chrome (note only - owned by app-shell harvester)
1440x1024 frame fill #FFFFFF (covered). Sidebar Frame 1 56 wide #39393C {Menu bar}; logo tile Frame 2 72x56 #A4A4FF; content Frame 3 at x=56 (57 in modal frames) 1384x1024 fill #000000 {BG}, radius 16/0/0/0. Top bar Frame 4 1384x56 bottom border 1px #39393C INSIDE; title Nunito Medium 20 #FFFFFF at (24,21); user icon vector 32x32 #BABEC7 at (1336,12). Body Frame 7 starts at y=104/105, fill #171719, footer Frame 8 1384x46 at y=873 (top border 1px #39393C, AL H pad 8/12/8/12 SPACE_BETWEEN) with Animation pulse (3 ellipses 8x8 #2BDF68). Sidebar icons 24x24 at x=16: y72 Menu tab, y128 Subtract, y184 csv, y240 deleted trades, y296 entities (active #A4A4FF; inactive #BABEC7), y352 Reports file icon (24x32 #A4A4FF when active, only in Reports frame), settings y984 (1024 high) / y1000 (1040) / y1040 (1080).
Active nav icon = #A4A4FF, inactive #BABEC7 (no background pill).

## 3. Entities list screen (3648:7348, content frame coords)
- Search instance 208x32 at (16,64): fill #242428 {Modal BG} R4, AL H gap8 pad 8, search icon 16x16 stroke #A4A4FF w4.17 (as drawn), placeholder "Search" Regular 14 #707079.
- "Add New" (New/Add instance) 109x32 at (1259,64) => right margin 16: fill #30F0D6 {Add New} R4, AL H gap10 pad 11/24/11/24, label SemiBold 14 #000000.
- Table Frame 7 (0,104 1384x919 #171719). Header text y=16 Medium 14 #707079: Account ID x16 (box 70), Entity Name x256, Country x598, LEI x996, Active x1289, (edit col). Row 1 text y58, row 2 y98, i.e. **row pitch 40-42**; row dividers "Line" 1px #39393C at y=42, 84, 126 (header 42 tall, rows 42). Row text Medium 14 #FFFFFF; Country Regular 14. Cells: 1 / "Bank of America Capital Corp" / US / 549300YQ0J2COHVB4010; 2 / "Brevan Howard Fund Ltd" / GB / same LEI.
- Active status dot 12x12 ellipse at x1303: #2BDF68 {Active} active, #707079 {Secondary text} inactive. Edit icon: instance "Edit" 32x32 (State=Default/Edit) containing edit/Default 20x20 at (6,6) [orange per screenshot, #FF9747 (visual estimate)] at x1315.
- Footer as chrome. No hover/selected row drawn here (see Statics for selected row).

## 4. Entity detail - left panel (1440 frames: 3648:7418, 5922:13690, 3657:4471, 3769:8602)
Left panel x24..448 (424 wide); vertical divider "Line 4" #39393C 1px at x=488, full height (873/889); detail panel starts x=512. (In canonical 1280 TA the panel is 359 wide at x16..375, divider x399, detail x415 - see 6.)
- Entity name "Bank of America": Medium 24 #FFFFFF at (24,24).
- Flag: MasterFlag instance (Rounded=yes) 20x16 R2 at (26,63); LEI "B4TYDEB6GKMZO031MB27" Medium 16 #BABEC7 at (54,65) (gap 8 after flag).
- Checkbox row at y=100 (TA) / y=127 (Entity frames): "Swap Dealer" checkbox 16x16 checked + label Regular 14 #FFFFFF (label x = box x+24); "PBA" checkbox unchecked (fill #39393C {Menu bar}, R2) label Regular 14 #BABEC7 at x153 (gap 24 between groups; Group 5 106 wide, Group 6 53 wide). Checked checkbox: fill #A4A4FF {Primary purple} R2, tick vector 12x9 #000000 at (2,3).
- Section label "Trading Accounts": Medium 18 #7373BB {Purple 3}, sentence case, at (24,140) (TA) / (24,175) (Entity). Right-aligned "Add New" secondary button 109x32 (x=right edge of panel-109): fill #39394E {Purple 2}, R3, AL H gap8 pad 11/24/11/24, label SemiBold 14 #A4A4FF (instance "Button transparent").
- **Group card** (e.g. "RBS"): background rect 424x293 fill #242428 R4; header strip 424x45 fill #39393C {Inputs on modal} radius 4/4/0/0; group title SemiBold 18 #FFFFFF at card x+24, y+16 (RBS at (48,185) when card at (24,169)). Card height = 45 + 62 x rows (2 rows+...: 293 = 45 + 4x62), second card (HSBC/HRBS) 107 = 45 + 62. Card gap 24 (169+293=462 -> next at 486).
- **Account row** = 62px tall; text at card x+24. Line 1 account name Medium 16 #FFFFFF (y = row top +16); line 2 (+19px): type "Client"/"Market Maker" Medium 16 #707079 {Secondary text}, separator glyph "|" Medium 12 #BABEC7 (x = after type +8, y+1), counterparty Medium 16 #BABEC7 ("Oscar Gruss", "Makor Securities London"). Row dividers: 1px #39393C {Separators} spanning card width from card x+24 (Line 6/7/8 at 311/373/435 = every 62px). Header-to-row: first row top = card top+45.
- **Selected row** (3657:4471 / 4031 / 4164): Rectangle 19 fill #39394E {Purple 2} full card width x 62 (at (24,338) 424x62), account name colour #A4A4FF {Primary purple}; line 2 unchanged. No radius. No left accent bar. (Hover not drawn.)
- "Traders" label Medium 18 #7373BB; traders card 424x122 #242428 R4 (Group 162 / Rectangle 20), names SemiBold 18 #FFFFFF at x+19 (43 from page = card 24 + 19), rows 61px apart, divider Line 7 1px #39393C at card y+61. **Selected trader** (Trader frame 3769:8602): Rectangle 21 424x61 fill #39394E radius 4/4/0/0, name #A4A4FF SemiBold 18.
- Group 162 sits at (24,660)/(24,625) in 1440 frames.
- Empty state (3648:7418): text "Select a trading account" Medium 16 #BABEC7, centred in detail panel (box x488..1384, y431 => 896 wide, centre aligned).

## 5. Entity analytics (5922:13690, detail panel)
Donut-style "pie" groups (202x202): outer ellipse fill #30F0D6@0.4 stroke 1 #30F0D6 INSIDE, inner ellipse (169.05) fill #A4A4FF@0.4 stroke 1 #A4A4FF INSIDE; positions Group 143 (553,46), Group 144 (837,248), Group 145 (1323,46). Captions Medium 16 #FFFFFF: "Monthly Volume / Trading Account" (534,272), "Avg Daily P&L / Trading Account" (820,272), "Avg Size / Trading Account" (1122,272); chart title "Average Daily Volume / Trading Account" (782,822). MainChart frame 808x368 at (534,408); xAxis frame 769x24 (6 xLabelBoxes 123.33 wide, pad bottom 8 left 29); Zoom row y386: "Zoom:" Medium 14 #FFFFFF at x543, then 1D/1W/1M/3M/6M/ALL Medium 14 UNDERLINE, inactive #707079, active (6M) #A4A4FF. LineLegends frame 322x24 at (991,380) AL H gap8 pad 0/8/0/8: each Legend AL H gap4 pad 4, LegendNode 16x16 + label Regular 12 #FFFFFF ("O RBS BOA","RBS BOA","RBS EDGE BOA"). Series colours (visual estimate) teal/orange/blue-purple lines on #171719 with grid; y axis 0-100.

## 6. TRADING ACCOUNT - canonical 1280*1040 (4164:14303)
Frame 1280x1040. Sidebar 56x1040; content Frame 3 1224x1040 at x=56; top bar Frame 4 1224x56 (title "Entities" Medium 20 #FFFFFF (24,21), user icon (1176,12)); breadcrumb at y=73 (content coords); Frame 7 body 1224x935 at (0,104) fill #171719 {BG Grey 1}, clip; footer Frame 8 1224x46 at body y=889.
### 6.1 Breadcrumb strip (content coords y=73, text Medium 18)
"Entities" x16 #A4A4FF UNDERLINE; chevron vector 8x14 #BABEC7 at x85; "Bank of America" x101 #A4A4FF UNDERLINE; chevron at x243; "RBS EDGE BOA" x259 #BABEC7 (current, no underline). Chevron-to-text gap 8px each side. NB: 1440 frames use #60A8FF {blue} underlined links at x24 / chevron x93 / x109 and the 4-level Trader trail: Entities(24) > Bank of America(109) > Traders(267) > Max Shepley(352), chevrons at 93/251/336.
### 6.2 Body skeleton (Frame 7 coords)
Left panel x16..375 (359w). Vertical divider "Line 4" #39393C {Separators} 1px at x=399, y0..889. Right panel x415..1208 (793w; right pad 16 to 1224). Footer actions row y=833: Close 84x32 at x423, Save Changes 139x32 at x1072 (right edge 1211).
### 6.3 Left panel (Frame 7 coords)
- Title "Bank of America" Medium 24 #FFFFFF (16,24). Flag 20x16 (18,63); LEI Medium 16 #BABEC7 (46,65). "Swap Dealer" checkbox row at y100 (box x16, label x40).
- "Trading Accounts" Medium 18 #7373BB (16,143); "Add New" secondary button 109x32 at (266,132).
- Card RBS: Group 174 at (16,172) 359x293: Rectangle 15 fill #242428 R4; Rectangle 16 359x45 #39393C radius 4/4/0/0; title SemiBold 18 #FFFFFF at (32,188). Rows (62px): 217/279/341/403; text x32 (name top y+16, line2 +19). Divider Line 6 only drawn at y279 (359w x1 #39393C). Selected row rect Rectangle 19 359x62 #39394E at (16,338) (3px above the nominal 341 row top - as drawn); name "RBS EDGE BOA" #A4A4FF.
- HSBC card Group 175 at (16,481) 359x107, header 359x45, one row. 
- "Traders" (16,628) + Add New (266,612); traders card Group 173 at (16,652) 359x122 #242428 R4, names SemiBold 18 #FFFFFF at x32 (676 / 737), divider Line 7 at y713.
### 6.4 Right panel header
- Title "RBS EDGE BOA" Medium 20 #FFFFFF at (415,24). Chip: "RBS" label (text 12?) in light chip + "Makor Securities London" Medium 16 #BABEC7 at (475,58). (In the 1440 version the title carries "(RBS EDGE BOA)" Regular 20 #707079 suffix at x667.)
- Switch "Give Up" (Switch with text, Property1=false) 80x16 at (997,32): track 32x16 R12 fill #BABEC7 {Light grey text}; knob 12x12 ellipse #FFFFFF {Primary text} at x=17,y=2 (as drawn: knob on RIGHT while OFF), shadow DROP_SHADOW #515151@0.5 (-1,1) blur 3; label Medium 14 #BABEC7 at x40 ("Give Up"; label text node is named "Not Active").
- Switch "Active" (Property1=true) 80x16 at (1120,32): track #2BDF68 {Active} R12; knob #FFFFFF at x=2 (as drawn: knob on LEFT while ON), shadow #005F20@0.5 (-1,1) blur 3; label Medium 14 #FFFFFF. (Knob placement is inverted vs convention; keep OR flag to product - the user's rule says reproduce.) Stray hidden-ish text "Staging Status" Regular 12 (no fill) at (998,28).
- Account type radios (y101): "Client" radio (State=False) at x415, "Market Maker" radio (State=True) at x509 (gap 32 after Client label); radio 16x16: outer ellipse stroke 1 #A4A4FF INSIDE, selected adds inner ellipse 8x8 #A4A4FF at (4,4); label Medium 14 #FFFFFF at radio x+24.
### 6.5 Field stacks (col x415, 242 wide, label Regular 12 #707079, field top = label top + 16, field 32h, stack pitch 64)
- Prime Broker / Mapping Value: label y133; Dropdown 72x32 at (415,149) fill #242428 {Modal BG} R4 AL H gap8 pad 8/12/8/8 SPACE_BETWEEN/CENTER, value Regular 14 #FFFFFF "RBS", caret polygon 12x8 #A4A4FF {Purple 1} right; Input 162x32 at (495,149) same fill, text "RBS-BOA-MAKOR" Regular 14 #707079 (gap 8).
- Makor Entity: label y197, Dropdown 242x32 at (415,213) "Makor Securities London".
- PB Agreement: label y261, Dropdown 242x32 at (415,277) "4way".
- Checkboxes at y325: "Structured" (box x415, label x439 Regular 14 #BABEC7), "PBA" (box x546, label x570); unchecked box fill #39393C {Menu bar} R2 16x16.
- On this page the fields are #242428 on a #171719 page (on modals the inverse: #39393C fields).
### 6.6 Lucera Drop Value (col x673)
Label Regular 12 #707079 (673,85). Panel 221x244 at (673,101) fill #242428 R4. Row: Dropdown 61x32 at (685,113) fill #39393C {Inputs on modal} R4 text "NY"; Input 110x32 at (754,113) fill #39393C text "EDGE_RBS" Regular 14 #FFFFFF; trash vector 14x14 #FF7272 {Red} at (872,122). Orange add button "Add " frame 32x24 R4 fill #FF9747 {Edit} at (850,309) (panel bottom-right: panel right 894-12, bottom 345-12), glyph "+" 12x12 #000000 at (10,6). Empty state: Group 163 (4138:14488) panel 221x244 #242428 R4, text "No mapping values set" Regular 12 #707079 at panel +16,+16, add button at (panel x+177, y+224).
### 6.7 Default Booking Recipients (col x910)
Label Regular 12 #707079 at (912,85). Panel Group 150 298x244 at (910,101) fill #242428 R4. Rows 16px high at y109/141/173 (pitch 32; row pad 8): email Regular 14 #FFFFFF x922; checkbox 16.9x16 at x1179 (right inset 12): checked fill #A4A4FF R2 tick #000000, unchecked fill #242428 {Modal BG} R2 (invisible on the panel - shows only as outline-less dark box? drawn as #242428 on #242428 (visual estimate: slightly darker square in screenshot)). Dividers Line 5/6/7 298x1 #39393C at y133/165/197. Bottom add strip Frame 20 298x48 (y+196), fill #242428 radius 0/0/4/4, shadow DROP_SHADOW #000000@0.25 (0,-4) blur 4, inner Frame 9 282x32 at (8,8) fill #39393C {Inputs on modal} R4 AL H gap8 pad 8/4/8/8 SPACE_BETWEEN: placeholder "example@email.com" Regular 14 #707079 + orange "+" button 32x24 R4 #FF9747.
### 6.8 Product Permissions card
- Label "Product Permissions" Regular 16 #707079 at (416,389). Right: "Total limit  $100m" Regular 16 at (1031,389): "Total limit" #FFFFFF, "$100m" #A4A4FF {Primary purple} (range-bound variable); edit pencil icon edit/Default 12x12 #A4A4FF in 24x12 frame at (1184,388).
- Card Frame 173 793x389 at (415,412) fill #242428 R4 clip. Tab bar 42 high, divider Line 8 793x1 #39393C at y42. Tabs (instances, auto-layout H gap8 pad 16/32/16/32 CENTER): Spot 94w, Forwards 124w (active), Vanilla Options 162w, Exotic Options 156w, adjacent (x 0/94/217/379). Label Medium 14: inactive #BABEC7, active #FFFFFF + bottom border 2px #A4A4FF {Primary purple} INSIDE (stroke 0/0/2/0). No fill change on active.
- Content: tenor group label ("2 years", "1 year") Regular 14 #707079 at x24 (y58, y164). Value box (Frame 180 733x72 at (24,76); Frame 181 733x34 at (24,182)): fill #39393C {Inputs on modal} R4 AL H gap10 pad 12/8/12/8; text Regular 14 #FFFFFF, comma-separated ISO list ("CHF, INR , PEN, USD, NZD, DKK, ..." wraps, 3 lines = 72h => line pitch ~16 (visual)); label-to-box gap 18 (58->76); box to next label 16. NO flags in this screen (currency codes only; flags exist only for MasterFlag next to entity LEI and in Statics Currency Pairs).
- Scrollbar group: track 4x299.5 #39393C R35.61 + shadow (0,11.87) blur 11.87 @0.25, thumb 4x202.3 #707079 R35.61, at x781 (right inset 8), y23.
- Bottom divider Line 10 793x1 #39393C at y333; "Add Permissions" button (Button transparent green) 156x32 at (12,345): no fill, stroke 1px #30F0D6 {Add New} INSIDE, R3, AL H gap8 pad 11/24/11/24, label SemiBold 14 #30F0D6.
- Total-limit popover "Total Limit" 146x95 at (1070,408): fill #242428 R8, DROP_SHADOW #000000@0.5 (-2,2) blur 4 spread 1; Input 114x24 at (16,16) fill #39393C R2 AL H pad 8/12 text "$ 100" Regular 12 #FFFFFF (the "$" #707079 visual) + suffix "m" Regular 12 #707079 at x111; Save button "Outlined purple" 114x24 at (16,55) stroke 1px #A4A4FF INSIDE R3 label SemiBold 12 #A4A4FF.
### 6.9 Footer actions (y833)
Close (Cancel instance): 84x32 fill #E6E6E6 {Cancel Button} R4 AL H gap10 pad 11/24/11/24 label SemiBold 14 #000000. Save Changes (New/Add Default): 139x32 fill #A4A4FF R4 same pad, label SemiBold 14 #000000.

## 7. Trading Account 1920*1080 (4031:18455) vs 1280*1040 - exact diffs
| aspect | 1920 (4031:18455) | 1280 (4164:14303) |
|---|---|---|
| visibility | **HIDDEN** (visible=false) | visible - canonical/newer |
| content frame | 1864x1080 @56 | 1224x1040 @56 |
| left panel | x32..456 (424w); divider x512; detail x552 | x16..375 (359w); divider x399; detail x415 |
| breadcrumb | 2 levels: "Entities" #60A8FF {blue} UNDERLINE x24, "Bank of America" #BABEC7 | 3 levels: both links #A4A4FF UNDERLINE, current "RBS EDGE BOA" #BABEC7, x16 |
| detail header title | "RBS EDGE BOA" (552,24) + Makor Securities London | same + sub chip |
| permissions | Frame 173 993x400 (26 kids, left master list variant) | horizontal tabs variant (Spot/Forwards/Vanilla/Exotic) 793x389 + Total limit popover |
| extra fields | Group 194/193/192 (PB, Makor Entity, PB Agreement) | same fields, PB Agreement included |
| footer y | 929 (body h975) | 889 (body h935) |
| Cancel/New row | y836 | y833 |
Older 1440 TA 3657:4471 (Entities section) is the oldest: 424 left panel, divider 488, left-list permissions (see 8).

## 8. Older Trading Account (3657:4471) permission master/detail card
Frame 173 836x400 at (512,388) fill #242428 R4. Left list column 188 wide: items "Spot" (y24), "Forwards" (y110), "Vanilla Options" (y196), "Exotic Options" (y282) Regular 16 #7373BB {Purple 3} (selected "Forwards" #A4A4FF) at x16; under each "$100m limit" Regular 16 #FFFFFF; each item 86 high with 1px dividers (#39393C) at y86/172/258/344 (width 188; Line 10 at y344 spans 836); selected rect Rectangle 18 188x88 fill #39394E at y85. Right pane x212: tenor labels ("2 years" y24, "1 year" y138, "6 months" y214, "3 months" y266, "Spot" y318) Regular 14 #707079; value boxes Frame 180 592x72 at (212,42) and 181 592x34 at (212,156) fill #39393C R4 pad 12/8; empty tenors show "-" Regular 14 #FFFFFF; scrollbar 4x308 at x824 (thumb 208 #707079); "Add Permissions" outlined button 156x32 at (12,356). Detail header differs: Give-up switch ("Give-up" label, ON) at (511,321) below Makor Entity; Active switch top-right (1256,32).

## 9. MODALS (all in 1440x1024 frames, over the Entities screen)
### 9.0 Common
Overlay "Rectangle 29": 1384x1022 at (0,0) of content frame, fill #000000 opacity 0.5 + BACKGROUND_BLUR radius 10 (sidebar not covered). Modal: fill #242428 {Modal BG}, radius **12**, clip, no stroke, no drop shadow (visual estimate: none). Centered in content frame. Header: title Medium 18 #FFFFFF, centred, text top y=24; divider "Line 4" 1px #39393C {Separators} at y=61 spanning full width (x -1..width). Content left/right padding 32, first label top y=85 (24 below divider), bottom padding 24 (buttons y = H-56 => 32h button + 24). Labels Regular 12 #707079 (height 8), field = Input-with-label instance: label y0, Frame 9 field y12, 32 high, fill #39393C {Inputs on modal} R4 AL H gap8 pad 8/12/8/8 (search variant pad 8/8). Stack pitch 68 (44 + 24). Buttons: Cancel 92x32 #E6E6E6 R4, label "Cancel" SemiBold 14 #000000 (gap row y); primary right-aligned to x=W-32. Primary states: Disabled (States=Disabled/New/Add) fill #707079 {Secondary text}, label #BABEC7 {Light grey text}; Default "Create" would be the purple/green variants.
Panel-on-modal rule: list panels and Lucera panel use #39393C {Inputs on modal} with nested dropdown/input fill #242428 {Modal BG}, separators #242428 (inverse of the page version).
### 9.1 New Entity 5535:14591 - 572x405 at (406,310)
Title "New Entity" (241,24). Left col x32 (186w): Entity Name field (y85; value "Bank of America" Regular 14 #FFFFFF), Country (Search with label, y153, search icon #A4A4FF, placeholder "Select Country" Medium 14 #707079 at x64 - 32 inset), LEI (y221), "Swap Dealer" checkbox row y289 (checked #A4A4FF). Right col x242 (298w): label "Default Booking Recipients" y85; panel 298x220 at (242,97) fill #39393C R4; rows y105/137/169 (16h, pitch 32), dividers 1px #242428 at y129/161/193; add strip 298x48 at panel y+172 with DROP_SHADOW #000000@0.25 (0,-4) blur 4, inner field 282x32 fill #242428 R4 + orange 32x24 "+". Buttons y349: Cancel (32), "Create" 91x32 at x449 (disabled, right edge 540).
### 9.2 New Trader 5539:15430 - 602x474 at (391,275)
Title (253,24). Full Name input 298x44 at (32,85). Default Booking Recipients group (298x232) at (32,153): label y153, panel 298x220 at y165 (rows y173/205/237, dividers y197/229/261, strip at y337). Assignment label **Regular 13** #707079 at (367,85); checkbox rows y110/142/174 (16h, pitch 32): checkbox at x367, label x391 Medium 14 #FFFFFF ("O RBS BOA" checked, "RBS EDGE BOA" checked, "RBS-BOA" unchecked fill #39393C {Menu bar}). Footer y418: Cancel (32), Active switch (Property1=true, 80x16) at (172,426) vertically centred with buttons, Create (disabled, 91x32) at x479.
### 9.3 New Trading Account 5536:14961 - 873x573 at (256,226)
Title "New Trading Account" (349,24). 3 columns x32 (242w), x298 (221w), x543 (298w), gap 24. Col 1: Trading Account Name input y85 (242x44); radios Client / Market Maker y153 (same radio spec as 6.4); Prime Broker / Mapping Value label y193, Dropdown 72x32 (32,205) "RBS" + Input 162x32 (112,205) "RBS-BOA-MAKOR" #707079 (both fill #39393C); Makor Entity label y261, Dropdown 242x32 (32,273); PB Agreement label y329, Dropdown (32,345) "4way"; Credit Limit input y401; checkboxes y469: "Structured" (32), "PBA" (171) Regular 14 #BABEC7. Col 2: "Lucera Drop Value" label y85, panel 221x388 at (298,97) #39393C R4, Dropdown 61x32 (310,109) "NY" + Input 110x32 (379,109) "EDGE_RBS" both #242428 R4, trash 14x14 #FF7272 at (497,118), orange add 32x24 at (475,451). Col 3: "Default Booking Recipients" label (545,85), panel 298x390 at (543,97). Footer y517: Cancel (32), "Give-up" switch ON at (172,525), Create disabled 91x32 at x750.
### 9.4 Add Permissions 5587:14673 ("B2B Spot Deal" frame name) - 420x406 at (510,309)  [primary - placed in the main modal row y=10492]
Title "Add Permissions" (142,24). Labels here are Regular **14** #707079 (not 12): "Product" (32,85), "Tenor" (230,85), "Currencies" (32,159). Dropdowns 158x32 fill #39393C R4: Product (32,103) "Spot", Tenor (230,103) "1 month" (caret #A4A4FF 12x8). Currencies box Frame 180 356x110 at (32,177) fill #39393C R4 pad 12/8/12/8, text Regular 14 #FFFFFF wrapped width 340 (ISO list). Buttons y350: Cancel 92x32 (32); "Add Permissions" 156x32 at x232 fill #30F0D6 {Add New} R4, label SemiBold 14 #000000.
### 9.5 Add Permissions 5580:14626 - 510x406 at (465,309)  [variant, placed below at y=11734]
Differences vs 9.4: width 510 (button at x322, title at 187); Product is a row of 4 checkboxes (not a dropdown): Spot (checkbox x32 checked #A4A4FF, label #FFFFFF), Forwards (x110), Vanilla Options (x218), Exotic Options (x363), y103, checkbox 16, label x+24 Regular 14 #BABEC7 when unchecked (unchecked fill #39393C); Tenor stacked below: label (32,143), dropdown 158x32 at (32,161); Currencies label (32,209), box 446x91 at (32,227) text width 430. Everything else identical (header, buttons y350, colors). Which is canonical is not determinable from Figma (no flag); 5587 sits in the main modal row, 5580 is multi-select product variant - treat 5580 as the more capable/alternate.

## 10. Reports (6878:14782)
Sidebar adds Reports icon (file-02-solid-rounded 24x32 #A4A4FF active at (16,352)); entities icon now #BABEC7. Top bar title "Reports" Medium 20 #FFFFFF. Body Frame 7 at y=56 (no breadcrumb) 1384x968 #171719; footer y922. Section title "Generate Report" Medium 16 #FFFFFF at (24,24). Form column x24 (225w): Dropdown with label "Report Type" y59 (placeholder "Choose Type" Regular 14 #707079, caret), Date Start y127 (placeholder "dd/mm/yyyy", calendar icon #A4A4FF right), Date End y195, Counterparty dropdown y263 ("Choose Counterparty"); pitch 68; field Frame 9 225x32 fill #39393C R4 pad 8/12/8/8 SPACE_BETWEEN. "Generate CSV" button With dropdown 154x32 at (24,331): fill #A4A4FF {Purple 1} R3, AL H gap8 pad 11/20/11/24, label SemiBold 14 #000000 + download glyph 12x12 #000000 at x122. Trade Types column x318: label "Trade Types" Regular 14 #707079 (318,111); quick buttons "All Cash" and "All Options" Outlined purple 99x24 at (318,79)/(430,79) (stroke 1px #A4A4FF INSIDE R3, SemiBold 12 #A4A4FF, pad 11/16) - NB y79 above label y111 in node coords but visually above list (visual: buttons at y~147 in screenshot, label y~117). List panel Frame 9 258x191 fill #242428 {Grey 6} R4 at (318,116): checkbox rows (Spot checked, Swap checked, Forward, NDF, Vanilla Option unchecked) pitch 32, checkbox 16 at panel x+15, label Medium 14 #FFFFFF at +24; scrollbar 4x169 #39393C R35.61 + thumb 4x114 #707079 at panel right-8.

## 11. CSV / Trade Reports (both HIDDEN)
- 3107:2972 (x5120) and 2958:3082 (x7077): sidebar csv icon active (#A4A4FF at y184), others #BABEC7. Top bar title "Trade Reports" Medium 20; stat chip Rectangle 351x32 at (755,12) fill #39394E {Purple 2} R4 containing "Option Premium" (770,23) Medium 14 #7373BB, "0.00" #A4A4FF, "Total P&L" (938,23) #7373BB, "3,646.52" #A4A4FF {Primary purple}; Dropdown 203x32 at (1122,12) fill #242428 R4.
- **3107:2972 = trade blotter table**: Blotter frame 1384x920 at (0,104) #171719; Search 205x32 at (16,64); circular icon button 32x32 R16 fill #39393C at (1336,64); header row text Medium 14 #707079 at y12: ID, Type, Client, Market Maker, Buy/Sell, Quantity, ..., Trade Date, Value Date, Prime Broker; row pitch 28 (dividers at y34,62,90,117,...,341), row text Medium 12 #FFFFFF, numeric right-aligned; 156 children.
- **2958:3082 = file-download list**: Blotter 1368x906 at (8,59) fill #171719 R8; Search 205x32 at (12,8), circular 32x32 at (1326,8); header y60 Medium 14 #707079: Download (16), File (300), PB (644), Upload Date (876), File Size (1113); rows pitch 28 (lines y110/138/166...), row 1 highlighted by Rectangle 1368x27 #39393C at y82 (selected/hover row); row text Medium 12 #FFFFFF (filenames "makor_fx_..."), "RBS Recon", "Aug 23, 2024 15:24" Regular 12, "2.31 KB"; csv icon 14x14 per row at x42: first #A4A4FF, others #707079; footer Frame 8 at y978; scrollbar 8 wide.
- Diff: 3107 = trade data table; 2958 = downloadable files list with row highlight and inset rounded table. Neither is visible (hidden duplicates); Reports 6878:14782 is the live generate screen.

## 12. STATICS (frames 1440x1024, content frame as 2)
### 12.1 Tab bar + toolbar (content coords)
Tabs (instances) at y=62, 42h, AL H gap8 pad 16/32/16/32 CENTER: Client(w102 @-1), Market makers(157 @101), Fixing Sources(156 @258), Cuts(93 @414), Currency Pairs(155 @507), Users(101 @662). Active: label #FFFFFF + 2px bottom stroke #A4A4FF INSIDE (stroke 0/0/2/0), no fill; inactive label #BABEC7. Label weight Medium 14 for "Client" tab, Regular 14 for others as drawn (inconsistent in source). Search 208x32 at (1035,64) (#242428 R4); "Add New" 109x32 at (1259,64) fill #30F0D6 R4 SemiBold 14 #000000. Static Clients has no Add New visible (hidden behind Log Out menu): "Log Out" menu Frame 23 134x40 at (1234,48) fill #39393C R4 DROP_SHADOW #000000@0.4 (-1,2) blur 4, icon 16x16 #FF7272 {delete}, label "Log Out" Regular 14 #FFFFFF.
### 12.2 Tables (Frame 7 at y=104, #171719): header text y16 Medium 14 #707079; rows text y58/y100 (row pitch 42), dividers 1px #39393C at y42/84/126 (+ one at 877); cell text Medium 14 #FFFFFF; status dot 12x12 (#707079 inactive / #2BDF68 active); edit instance 32x32 at x1315; selected/hover row: "Rectangle 11" 1382x41 fill #39393C {Separators} at (1,84) (row 2 in Static Clients). Checkmarks vectors 16x12 #A4A4FF for Swap/Booking C/PB columns. Scrollbar group 8x815 at (1368,50): track #39393C R12, thumb 8x282 #707079 R12.
- Static Clients columns (x): Client 11, Name 89, Client P 175, Client Count 249, LEI 379, Lucera Drop V 449, Products 571, Swap 656, Booking C 705, PB 790, Client Contact Distrib List 840, PB 1048, Makor Comp 1130, Active 1249, Edit 1318. Row 1 "ABC Holding, HCBC, GB, 1234567, ABCD, Spot Fwd, ..., mshepley@iclient.com, ABCD, Makor Securities".
- Static Users columns: User ID 21, First Name 103, Last Name 207, Username 344, Email Address 577, Entitlements 966, Active 1208, Edit 1318. Email cell Regular 14.
- Static Currency pairs: Currency Pair 64, NDF 274 (check vector at x281), Edit 1318; pair cells = flag + code + "/" + flag + code ("AUD / JPY", "NOK / PHP"; flags are 16-ish circles/rounded - visual estimate, from Group 90 vector groups 134x16 @ (40,54) and 141x16 @ (40,97)).
### 12.3 Edit Client 2514:2818 - 807x605
Title "Edit Client" (361,24). Col1 x32 (186w): Client Name y85; LEI "Input Error" y153 (186x56: field fill #39393C {Menu bar} stroke 1px #FF7272 {delete} INSIDE, error text "Error message" Regular 12 #FF7272 {Red} at y48); Client Country (search) y233; Makor PB (dropdown) y301; Makor Company y369; Products group (label y437, box 186x68 at y449 fill #39393C R4, checkboxes Spot/Swap at x44 (y461/489) and Forward/Option at x127); Client Status switch label y549, switch y565. Col2 x242 (210w): Swap Dealer / PBA checkboxes y101; "Client PB" label y141, panel 210x96 at y153 fill #39393C R4 with dropdown 186x32 (254,165) + input 185x32 (255,205) both #242428; "Lucera Drop Value" label y273, panel 210x232 at (242,285), add 32x24 at (254,337). Col3 x492 (283w): "Do we need to send a booking confirmation?" Regular 12 #707079 at y93 + radios Yes (x492) / No (x562) at y113 (Group 14 46w, Group 13 43w); "Client Contact Distribution List" search 283x44 at y153; recipients panel 283x312 at (492,205) fill #39393C R4, 6 rows (y213..373 pitch 32, dividers #242428 at y237..397 step 32), strip 283x54 at y463 (shadow 0,-4 b4 @0.25; fill #39393C, inner field 267x32 #242428). Buttons y549: Cancel 92x32 (536), Save Changes 139x32 (636) DISABLED (#707079 fill, #BABEC7 label).
### 12.4 Edit User 1945:2735 - 562x341
Title (244,24). Fields 237x44: First Name (32,85), Last Name (293,85), Username (32,153), Email Address (293,153); "Entitlements" label y221, checkboxes y237: Booking (32 checked), P&L Attribution (132 unchecked), Static (278 checked), Admin (362 checked). Client Status switch (label y285). Buttons y285: Cancel 92x32 (291), Save Changes 139x32 (391) fill #A4A4FF.
### 12.5 New Prime Broker 267:157 - 472x217
Title "New Prime Broker" (162,24); inputs: Prime Broker Name 138x44 (32,85), Group Email Address 246x44 (194,85); buttons y161: Cancel (231), Add New 109x32 fill #30F0D6 (331).
### 12.6 New Currency Pair 476:175 - 392x217
Title (120,24); Currency 1 / Currency 2 inputs 152x44 at (32,85)/(208,85); "Is NDF?" checkbox (32,169, checked); buttons y161: Cancel (151), Add New 109x32 #30F0D6 (251).
### 12.7 Edit Cut 276:271 - 303x217
Title "Edit Cut" (119,24), divider spans 0..303; City search 134x44 (32,85) value "New York"; Time 81x44 (190,85) "10:25" with clock icon #A4A4FF (visual); buttons y161: Cancel (32), Save Changes 139x32 #A4A4FF (132). Open City dropdown 1971:2821 158x118: fill #39393C R4 DROP_SHADOW #000000@0.5 (-2,2) blur 4; items Regular 14 y12/38/63/89/115 (pitch 26); selected "New York" #A4A4FF, others #FFFFFF; hover/selected row Rectangle 22 158x26 fill #242428 at y30 ("London" highlighted); scrollbar 4x102 track #707079 R16, thumb 4x15 #BABEC7.

## 13. Trader detail (3769:8602) deltas
DEV chip 81x32 at (652,12) top bar: fill #FFB800 @0.15, stroke 1px #FEE274 {yellow} INSIDE, R4, AL H pad 11/24, label "DEV" SemiBold 16 #FEE274. Detail header "Max Shepley" Medium 24 #FFFFFF (512,24); Active switch (1256,32); Default Booking Recipients label Regular 14 #707079 (514,71), panel Group 150 294x244 at (512,89); Assignment label Regular 14 (846,71), checkbox rows at x846 y97/129/161 (235.4w): O RBS BOA checked, RBS EDGE BOA checked, RBS-BOA unchecked, labels Medium 14 #FFFFFF; Close 84x32 (514,381), Save Changes 139x32 (1197,381). Left panel selected trader row #39394E with #A4A4FF name.

## GAPS (searched, not drawn)
- Hover / pressed / focus states for list rows, group cards, tabs, buttons, inputs: only a "selected" row (#39394E) and Statics table highlighted row (#39393C) exist. No focus ring anywhere.
- Error: only "Input Error" (LEI) on Edit Client. No inline errors elsewhere, no toast.
- Disabled: only the primary modal button (#707079/#BABEC7). No disabled inputs/dropdowns.
- Empty: "Select a trading account", "No mapping values set". No empty tables, no empty permissions card.
- Loading: none (only footer pulse animation).
- Delete/confirm dialogs, trader/entity edit modals, Add Trader mapping flows: not drawn. Entity-level modal for Edit Entity not drawn (New Entity only).
- Flags in currency lists: only Statics Currency Pairs; permission lists are codes only.
- Table sorting/pagination: none. Menu/overflow: only Log Out menu.

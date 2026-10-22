# Equity Derivatives Auction - FOUNDATIONS (Figma ground truth)

Source: Figma file `vtP9aj7XLJ292TjETXmrum`, read-only via Plugin API. Tallies cover every visible node in SECTION "Section2" 1033:172 (page "final" 48:1021): 2411 nodes walked, 1 hidden node skipped (115:1919 "Frame 6"). Node ids are the real ids. "(visual estimate)" marks screenshot reads. Nothing here comes from the earlier wrong design system.

File facts: one variable collection "Collection 1" (id VariableCollectionId:2:2), single mode "Mode 1", 23 COLOR variables, all scopes `ALL_SCOPES`, no aliases. Local paint styles 0, text styles 0, effect styles 0, grid styles 0. No layout grids anywhere in Section2.

---------------------------------------------------------------------------------------------------

## 1. COLOUR PALETTE

### 1.1 Variables (exact)

| Variable | Hex | Variable id |
|---|---|---|
| bg | #18181C | 2:3 |
| bg medium | #22222C | 4:169 |
| bg lighter | #2D2E3B | 2:4 |
| grey dark | #373746 | 2:5 |
| grey medium | #5B5D72 | 2:6 |
| grey light | #9597AD | 2:7 |
| white | #F8F7FF | 2:11 |
| blue | #7590FF | 2:8 |
| blue transparent 15 | #383D58 (opaque colour, NOT alpha) | 4:33 |
| blue transparent 60 | #7590FF @ 0.6 alpha | 4:75 |
| green | #3FF3C0 | 2:9 |
| green dark | #264142 | 45:65 |
| red | #FF6565 | 2:10 |
| red transparent | #432C35 (opaque) | 16:363 |
| red error | #FF7553 | 48:586 |
| red error transparent | #4E3234 (opaque) | 48:587 |
| orange | #FF982A | 4:159 |
| orange transparent | #4C3E3D (opaque) | 95:174 |
| yellow | #FFCE53 | 188:448 |
| yellow transparent | #4E4134 (opaque) | 188:449 |
| blue-green | #71E7FF | 44:83 |
| blue-green transparent | #374A58 (opaque) | 190:2749 |
| purple | #B694FF | 44:84 |

Note: every "transparent" variable except `blue transparent 60` is a flat opaque hex, not an alpha colour.

### 1.2 Usage counts and roles (Section2, visible nodes; "n x" = paint count; ids are examples)

FILLS

- **white #F8F7FF** 617x: TEXT 591 = primary text (table cell values, usernames, section title "Auctions" 189:1340, modal titles); BOOLEAN_OPERATION 13 = active sidebar icon (189:1327); INSTANCE 7 = the white neutral "Cancel" button fill (282:2536, 282:2647, 282:2531); ELLIPSE 6.
- **grey dark #373746** 54x: control fill for text input / search / dropdown / date / time (131:725, 170:786, 189:1342, 115:1927, 1008:820), unchecked checkbox (282:2664, r2), tab frames 273:762 / 273:855.
- **grey medium #5B5D72** 289x: TEXT 282 = placeholder + column header + secondary text (170:738, 170:831 "Username", table header cells 1008:827 children); INSTANCE 6 = DISABLED button fill (170:813, 273:808, 138:502).
- **grey light #9597AD** 143x: TEXT 85 = tertiary label (170:816 "Client Name", 248:758 "Makor X ID", "Aggregate Book" 189:1107) and DISABLED button text; VECTORS/BOOLEAN_OPERATION 45 = inactive icons (189:1336 sidebar icon 2); ELLIPSE 10 (131:729..).
- **bg #18181C** 49x: page background of every 1440x1024 and 1920x1080 frame (131:720, 170:729, 282:2538, 189:1104, 1008:687); inner order-book blocks 189:1258, 261:2113, 261:2009 (fill bg + 1px inside stroke grey medium, r8); TEXT 26 = label on filled buttons (e.g. I131:741;4:153 "Log In").
- **bg medium #22222C** 42x: inner blocks/tables (Frame 3/8/10 in 189:1105 e.g. 189:1110, r8), modal card (131:721 "Frame 22", r12), 1008:707 inner block 763x106 (r8), table body 1008:826.
- **bg lighter #2D2E3B** 50x: panel/card (189:1105 "Frame 14" r8; 1008:705 r8; 1008:741), sidebar 64-wide (189:1325, radius TR24), toasts 273:1155 (r6, with shadow) and 189:984 (r6), table header bar 1008:814 (h56), huge modal bg 170:731.
- **blue #7590FF** 54x: PRIMARY ACTION fill (Log In button 131:741); product title 20/24px (189:1339, 170:806); links (131:740 "Forgot Password?" underlined); active tab text (170:791 "Users" 18px); checked checkbox fill (85:129); "ENTER" action text 12px (1008:836); icon strokes (search icon I170:786;134:216).
- **green #3FF3C0** 22x: CONFIRM / success: filled "Confirm" button (273:1159), "Start Now" (115:1929); success toast text (273:1149) and check dot (273:1151, 12x12 r24); BID text 12px (1008:838); `check` 16x16 r16 (170:771); selected cell stroke 1px (189:1163).
- **red #FF6565** 47x: DANGER / cancel: filled "Cancel Auction" (189:1257), "Cancel" arrow-button (273:633), ASK text 12px (1008:883), outlined "Reject" (273:1158, stroke 1 INSIDE), x-icon strokes.
- **purple #B694FF** 34x TEXT: "Equilibrium Price:" label 14px (189:1161, 261:2109), EFP tag 12px (273:802).
- **blue transparent 15 #383D58** 27x: active tab bg (170:790, 282:2600 + blue 1px bottom border), Time Left chip (273:628, r4), minimize icon button 24x24 r4 (189:1254, blue 1px inside stroke).
- **blue-green #71E7FF** 21x: secondary accent - "Add New" filled button (170:785, h40), "New Auction" OUTLINE button (189:1343, stroke 1 INSIDE, text blue-green), "Cash Close" session sub-label 12px (189:1109), "New level ... added!" toast text (189:985).
- **blue transparent 60 #7590FF@0.6** 14x: logo vector "Path 1852" (131:722, 170:793, 189:1326), 40x32 at x12,y20.
- **red transparent #432C35** 9x: soft-danger chip/button bg (273:615, 273:665, 273:696; 112x40).
- **orange #FF982A** 6x TEXT + 24x icon stroke: "Starting in:" 14px (273:804), "MODIFY" 12px (1008:851), "Start In" button text/stroke (115:1930).
- **orange transparent #4C3E3D** 5x: "Starting in" chip bg (273:803, 155x32 r4), "Start In" button bg (115:1930).
- **yellow #FFCE53 / yellow transparent #4E4134**: "Partially in the fill" toast 273:1283 (137x30 r4, text 273:1285, ring icon 273:1385/1386).
- **red error #FF7553 / red error transparent #4E3234**: validation toast 273:1141 (197x30 r4, text "Bid should be lower that Ask" 12px) and error cell stroke 273:1144; also 273:1553.
- **green dark #264142** 1x: success toast bg 273:1147 (265x30 r4).
- **blue-green transparent #374A58** 1x: row highlight rect 273:1404 (823x32, no radius).

STROKES (colour x count): grey dark 329 (311 LINE 1px = header rules / row separators e.g. 170:733, 189:1341; 17 VECTOR icon strokes; 1 INSTANCE 1008:827 bottom border); blue 50 (icons 1.5/1, tab underline FRAME 1px bottom 170:790); orange 25 (24 icon strokes 1.5, e.g. 170:778); grey medium 24 (14 LINE 1px panel rules e.g. 189:1256, 10 icon strokes); red 11; bg 6 (chevron on filled red button, 273:1153); green 5 (selected-cell stroke RECTANGLE 1px INSIDE 189:1163, 189:1164, 273:1146); grey light 3; yellow 3; blue-green 2 (outline button 189:1343, 261:2376); red error 1 (273:1144); blue transparent 60 1 (937:158).

### 1.3 Raw (unbound) colours in Section2 - NOT variables

| Raw | Count | Where | Class |
|---|---|---|---|
| #000000 | 91 VECTOR | operands of boolean-op icons in the sidebar (7 per screen x 13, e.g. 170:795; parent Union 170:794 24x24 supplies visible fill) | not a rendered UI colour |
| #B694FF @0.2 | 18 FRAME | "Equilibrium Price" chip bg, 197x40 (273:590, 273:654, 273:688) | UI colour (purple @0.2 over bg) - should be tokenised |
| #A494FF @0.3 | 6 FRAME | same chip, older value (189:1160, 261:2108, 261:2004; 197x40) | UI colour; INCONSISTENT with the 18 above (different hue #A494FF and alpha 0.3). Newer = #B694FF@0.2 (variable `purple` + 0.2) |
| #18181C @0.5 | 5 FRAME | modal scrim "Frame 17" with BACKGROUND_BLUR 12 (170:809, 282:2619, 138:498) | UI colour (bg @0.5) |
| #374A58 | 1 FRAME | 115:1916 (= blue-green transparent, unbound) | UI colour |
| #71E7FF | 1 TEXT | 115:1917 "Cash Close" (= blue-green, unbound) | UI colour |

No gradient or image paints in Section2. No flag/logo/illustration colours: the only non-system artwork is the logo vector (variable `blue transparent 60`). Image rectangles exist only on page "drafts" (reference screenshots 41:19, 1000:663 - raw IMAGE).

### 1.4 Role summary (derived)

- Page bg `bg`; panel `bg lighter`; inner block/table body `bg medium`; nested "book" blocks `bg` + 1px `grey medium` inside stroke; sidebar `bg lighter`.
- Control fill `grey dark`; control text value `white`, placeholder `grey medium`; control icon `blue` (search/calendar) or `grey light` (dropdown chevron, time arrows).
- Rules: header rule `grey dark` 1px; panel-header rule `grey dark` (1008 frames) / `grey medium` (189:1256).
- Text: primary `white`, secondary `grey medium` (headers, placeholders), tertiary `grey light` (labels), title/links/active `blue`.
- PRIMARY ACTION colour = `blue` #7590FF fill, `bg` text (Log In 131:741). Secondary accent = `blue-green` (Add New fill, New Auction outline).
- CONFIRM / save = `green` fill + `bg` text (273:1159 "Confirm", 115:1929 "Start Now"). CANCEL / DANGER = `red` fill + `bg` text (189:1257 "Cancel Auction", 273:633 "Cancel"), outlined red "Reject" (273:1158), soft `red transparent` + `red` text (273:615). Neutral dismiss in modals = `white` fill + `bg` text (282:2536 "Cancel"). Disabled = `grey medium` fill + `grey light` text.
- Status/chips: Time Left = `blue transparent 15` + `blue` label + `white` value; Starting in = `orange transparent` + `orange` label; Equilibrium = purple@0.2 + `purple` label; BID text `green`; ASK text `red`; session sub-label `blue-green`; EFP tag `purple`; MODIFY `orange`; ENTER `blue`.
- Toasts (30px tall, r4, 8/12 padding, gap 8, 12px text): error = `red error transparent` + `red error`; success = `green dark` + `green`; partial = `yellow transparent` + `yellow`. Notification cards (r6, `bg lighter`, shadow): 273:1155 (V p16 gap16 328x114), 189:984 ("New level ..." blue-green text, H p12/16 gap8 322x41).
- Table-cell state strokes (1px INSIDE): selected `green`; error `red error`; partial `yellow`; highlight row `blue-green transparent`.

---------------------------------------------------------------------------------------------------

## 2. TYPE SCALE

Family/style: **Lato Regular only.** 1111 of 1114 TEXT nodes are `Lato Regular`; the other 3 (273:1695, 273:1696, 273:1698) are mixed-size segments but all segments are still Regular. NO Bold, Medium, SemiBold or any other family, on any page (final, Isaak, drafts). Line height is **AUTO on every text node**; letter spacing 0% on every node; textCase ORIGINAL everywhere; UNDERLINE only on 8 nodes (links/clickable numbers). Observed auto-line-height heights (node height): 12px->14, 14px->17, 16px->19, 18px->22, 20px->24 (visual of Lato ~1.2x).

Size totals: 12px 174 | 14px 845 | 16px 66 | 18px 11 | 20px 13 | 24px 2 (sum 1111).

| Size | Colour variable | Align | Count | Role / sample (id) | Parents |
|---|---|---|---|---|---|
| 14 | white | RIGHT | 255 | numeric table values "2.35" (189:1124), username "mshepley" (I131:725;76:273) | Frame 3/8/10 table columns |
| 14 | grey medium | LEFT | 229 | labels/placeholders "Username" (170:831), "First Name" | Frame 11/3/10 form + list |
| 14 | white | LEFT | 187 | cell text "abc_xyz" (282:2660), "002" | list/table frames |
| 12 | white | LEFT | 85 | 1920 table body: "02-Jul-2026 16:06:55" (1008:830), "European EFP 26/6" | Table Cell (Timestamp/Auction/Contract) |
| 16 | white | RIGHT | 40 | "ABC" (170:745) | Frame 3 |
| 12 | grey light | LEFT | 35 | "Client Name" (170:816), "min size: 200" (273:624) | Frame 10/11/8 |
| 14 | grey medium | RIGHT | 32 | "Search" placeholder (I170:786;134:214) | search/text input/button with arrow |
| 14 | bg | RIGHT | 26 | button label "Log In" (I131:741;4:153), "Add New", "Cancel" | button (21) / button with arrow (5) |
| 14 | grey light | RIGHT | 24 | disabled button label (I170:813;134:906) | disabled buttons |
| 14 | purple | LEFT | 24 | "Equilibrium Price:" (189:1161) | chip Frame 3 |
| 14 | grey light | LEFT | 23 | "Makor X ID" (248:758), "Client User List" (170:873), "Inactive" | Frame 4/14/24 |
| 16 | grey medium | LEFT | 14 | form labels "First Name" (170:738) | Frame 3 |
| 12 | red | LEFT | 14 | "ASK" (1008:883) | Table Cell (Side) |
| 14 | blue | LEFT | 11 | "Time Left:" (189:1252), "External Traders" (138:400) | Frame 9/5/4 |
| 20 | blue | LEFT | 11 | product title "Equity Derivatives Auction" (189:1339) | header |
| 16 | white | LEFT | 11 | section title "Auctions" (189:1340), "Statics" (282:1725) | header |
| 14 | red | RIGHT | 10 | "Cancel" (273:616) | button with arrow |
| 12 | purple | LEFT | 10 | "EFP" (273:802) | Table Cell (Action) |
| 12 | blue | LEFT | 10 | "ENTER" (1008:836) | Table Cell (Action) |
| 12 | grey medium | LEFT | 7 | table column headers "Timestamp" (I1008:827;1001:285) | Table Header Cell |
| 18 | white | CENTER | 6 | MODAL TITLE "New Client" (170:812), "Edit Client", "New External Trader", "New Auction" (115:1918) | new auction/external trader modal |
| 12 | blue-green | LEFT | 6 | "Cash Close" (189:1109) | Group 106 |
| 14 | orange | LEFT | 4 | "Starting in:" (273:804) | Frame 9 |
| 14 | white, UNDERLINE | RIGHT | 4 | linked IDs "001" (282:2093) | Frame 3 |
| 14 | blue, UNDERLINE | CENTER | 4 | linked counts "4", "20" (282:2109) | Frame 3 |
| 14 | blue-green | RIGHT | 3 | "New Auction" button label (I189:1343;4:153), toast text 189:985 | button, Frame 11 |
| 14 | blue-green | LEFT | 3 | "Cash Close" in 1920 (1008:735) | Group 106 |
| 12 | green | LEFT | 3 | "BID" (1008:838) | Table Cell (Side) |
| 18 | grey light | LEFT | 2 | inactive tab "Clients" (170:789) | Frame 4 |
| 18 | blue | LEFT | 2 | active tab "Users" (170:791) | Frame 5 |
| 24 | blue | LEFT | 2 | modal-screen title "Equity Derivatives Auction" (170:806) | Group 109 |
| 20 | white | LEFT | 2 | "Statics" (170:807) | Group 109 |
| 14 | red | LEFT | 2 | "Time Left:" on ending session (273:1554) | Frame 4 |
| 14 | blue, UNDERLINE | LEFT | 1 | "Forgot Password?" (131:740) | Group 97 |
| 12 | green | RIGHT | 1 | success toast text (273:1149) | Frame 11 |
| 12 | red error | RIGHT | 1 | error toast text (273:1143) | Frame 11 |
| 12 | yellow | RIGHT | 1 | partial toast text (273:1285) | Frame 11 |
| 14 | (mixed 12+14) | LEFT | 3 | "Orders matched:" 12 line + body 14 line (273:1695/1696/1698); node 273:1156 "Orders placed:" 14 | notification card Frame 16 |
| 14 | RAW #71E7FF | LEFT | 1 | 115:1917 "Cash Close" (unbound) | Frame 5 |
| 18 | white | LEFT | 1 | 115:1918 "New Auction" | new auction modal |
| 14 | orange | RIGHT | 1 | "Start In" (I115:1930;4:153) | button |
| 16 | grey light | LEFT | 1 | "Audit Log" (1008:815) | Frame 112 |
| 12 | orange | LEFT | 1 | "MODIFY" (1008:851) | Table Cell (Action) |

(20px total = 13: blue 11 + white 2.)

Observations: the 1920x1080 frame (1008:687) uses 12px for the table (126 of its text nodes are 12px in the draft 1000:429) while 1440 screens use 14px; 1440 screens use 16px for form labels / table side texts in the older drafts but 14px in Section2.

---------------------------------------------------------------------------------------------------

## 3. RADII, STROKES, SHADOWS/EFFECTS, OPACITY

### Radii (Section2)
| Radius | Count | Used on |
|---|---|---|
| 4 | 106 | buttons, text input, search, dropdown, date, time, chips, toasts (131:725, 131:741, 273:628) - dominant control radius |
| 8 | 61 | panels, inner blocks, order-book blocks, modals (170:730, 189:1105, 189:1110, 170:810) |
| TL0/TR24/BR0/BL0 | 13 | sidebar frame (64 wide) 189:1325, 170:792 |
| 16 | 12 | `check` dot 16x16 (170:771) = full circle |
| TL6/TR6/BR0/BL0 | 10 | tab frames (170:788, 170:790 "Frame 4/5") |
| 2 | 11 | unchecked checkbox 16x16 (282:2664) |
| 12 | 9 | modal card 131:721 (Frame 22), 170:819 Rectangle 12, 282:2666 |
| TL8/TR8/BR0/BL0 | 4 | modal body top 138:341, 282:2201 |
| 6 | 2 | notification cards 273:1155, 189:984 |
| 24 | 1 | 273:1151 12x12 success dot (full circle) |
| TL0/TR0/BR0/BL8 | 1 | 937:158 |
| TL0/TR4/BR4/BL0 | 1 | 115:1914 |
Corner order in the TL/TR/BR/BL strings above is top-left/top-right/bottom-right/bottom-left. No corner smoothing.

### Strokes (type | colour | weight | align | count)
- LINE | grey dark | 1 | CENTER | 311 (header rule 189:1341; row/column separators 170:733)
- LINE | grey medium | 1 | CENTER | 14 (panel rule 189:1256)
- VECTOR icon strokes (cap ROUND): blue 1.5 x27 (search icon), orange 1.5 x24 (170:778), blue 1 x14, grey dark 1.5 x12 (check mark on `check`), red 1 x9, grey medium 1 x9, bg 1 x6, grey dark 2 x5, grey light 1 x3, blue 1.3 x2 (calendar), grey medium 1.5 x1.
- FRAME blue, bottom-only 1 (T0 R0 B1 L0) INSIDE x6: active tab underline (170:790, 282:2600, 138:399).
- INSIDE 1px boxes: green x5 RECTANGLE (selected cell 189:1163), blue-green x2 INSTANCE (outline button 189:1343), yellow x2 ELLIPSE + 1 RECTANGLE (273:1282), red x1 INSTANCE (273:1158) + 1 FRAME (273:1672), red error x1 RECTANGLE (273:1144), orange x1 INSTANCE (115:1930), blue x1 FRAME (1008:824), blue transparent 60 x1 (937:158), grey dark bottom-only x1 INSTANCE (1008:827 table header border).
- Panels: `bg` fill blocks carry 1px INSIDE `grey medium` (189:1258, 261:2113, 261:2009).
- No dashed strokes.

### Effects (every distinct one)
1. DROP_SHADOW #1D3C31 @0.6, offset (-1, 1), blur 3, spread 0 x6 - 12x12 ellipses (170:820, 282:2734, 138:515, 282:2346, 282:2459). Subtle dark-green glow under status dots.
2. BACKGROUND_BLUR radius 12 x5 - modal scrim frames "Frame 17" 1360x1022 (170:809, 282:2619), 1376x1022 (138:498, 282:2441), 1373x1024 (115:1870). Their fill is raw #18181C @0.5. Everything behind the modal is blurred 12 and dimmed.
3. DROP_SHADOW #22222C @1, offset (-2, 4), blur 8, spread 0 x3 - 30px toasts 273:1147 (success), 273:1141 (error), 273:1283 (partial).
4. DROP_SHADOW #18181C @1, offset (-2, 4), blur 8, spread 0 x2 - notification cards 273:1155 (328x114), 189:984 (322x41).
5. DROP_SHADOW #18181C @1, offset (-2, 4), blur 6, spread 0 x1 - 189:819 "Frame 13" (112x115, dropdown-style menu panel; visual not inspected).
No inner shadows, no layer blur, no gradients, no blend modes other than PASS_THROUGH/NORMAL.

### Opacity
- Node-level opacity < 1: none found in Section2 (the earlier "0.3"/"0.5" hits are corner radii: 0.3 on the `time` arrow vectors I115:1927;85:90, 0.5 on yellow ellipses 273:1385/1386). Dimming is done only through paint alpha / the `*transparent*` variables.
- Paint-level alpha: 0.2 x18 (purple chip), 0.6 x14 (logo), 0.3 x6 (old chip), 0.5 x5 (scrim).

---------------------------------------------------------------------------------------------------

## 4. SPACING & GRID

### 4.1 Auto-layout tuples (330 auto-layout nodes in Section2; 228 plain frames use absolute positions)
(direction | gap | padding T/R/B/L | primary align | counter align) - count - example

1. V | 0 | 12/8/12/8 | CENTER/MIN | 90 - Table Header Cell (Auction/Contract/Action) I1008:827;1001:286
2. H | 10 | 6/32/6/32 | CENTER/CENTER | 28 - `button` (131:741, 170:785, 170:813)
3. H | 12 | 0/0/0/0 | MIN/CENTER | 26 - `check` (170:771)
4. H | 4 | 11/24/11/24 | MIN/CENTER | 24 - purple chip "Equilibrium Price" (189:1160, 273:590)
5. H | 12 | 10/12/10/12 | MIN/CENTER | 18 - `text input` (131:725, 138:504)
6. H | 10 | 12/56/12/56 | CENTER/CENTER | 18 - tabs (170:788 "Clients", 170:790 "Users"), 167x48 / 160x48
7. H | 8 | 11/12/11/24 | CENTER/CENTER | 18 - `button with arrow` soft (273:615, 112x40)
8. H | 0 | 0 | MIN/CENTER | 18 - Table Header / Row (1008:827, 1008:828)
9. V | 0 | 12/8/12/16 | CENTER/MIN | 18 - Table Cell (Timestamp) 1008:829
10. V | 0 | 12/8/12/8 | CENTER/CENTER | 18 - Table Cell (Side) 1008:837
11. H | 8 | 10/12/10/12 | MIN/CENTER | 14 - `search` (170:786)
12. H | 16 | 16/24/16/12 | MIN/CENTER | 13 - chip Frame 9 (Time Left 273:628 151x32; Starting in 273:803 155x32)
13. H | 8 | 6/12/6/24 | CENTER/CENTER | 8 - `button with arrow` 98x32 (273:633, 273:808)
14. H | 8 | 8/12/8/12 | CENTER/CENTER | 3 - toasts 273:1147, 273:1141, 273:1283
15. H | 40 | 10/12/10/12 | MIN/CENTER | 2 - `dropdown` 117x32 (189:1342)
16. H | 12 | 10/8/10/12 | MIN/CENTER | 2 - `time` 105x32 (115:1927)
17. V | 0 | 0 | CENTER/MIN | 2 - time spinner arrows 10x24
18. V | 0 | 0 | MIN/MIN | 2 - 1008:813 table frame, 1008:826 table sheet
19. V | 56 | 40/48/40/48 | MIN/CENTER | 1 - Log In card 131:721 (modal card r12)
20. H | 12 | 10/12/10/12 | SPACE_BETWEEN/CENTER | 1 - 131:727 password text input
21. V | 16 | 16/16/16/16 | CENTER/CENTER | 1 - notification card 273:1155
22. H | 12 | 0 | SPACE_BETWEEN/CENTER | 1 - 273:1157 (toast action row)
23. H | 8 | 12/16/12/16 | CENTER/CENTER | 1 - notification 189:984
24. H | 139 | 12/16/12/16 | SPACE_BETWEEN/CENTER | 1 - table header bar 1008:814 (998x56)
25. H | 40 | 0 | MIN/CENTER | 1 - 1008:816;  H | 16 | 0 | MIN/CENTER | 1 - 1008:817

(Only 25 distinct tuples exist; top-40 list not reachable.)

### 4.2 Fixed control sizes (instances)
- Controls are 32px high: text input 184x32 (x12), 235x32 (x2, 131:725), 400x32 (x4); search 235x32 (x10), 184x32 (x2); button 122/106/149/157/144/103/114/127/109/235 x32; button with arrow 98x32; dropdown 117x32; time 105x32; date 155x32; check 16x16. 40px outliers: `button` 122x40 (170:785 "Add New", 282:2595), 106x40 (282:2446, 282:2471); soft Cancel arrow-button 112x40; chip 197x40; tabs 48 high.
- Component widths in drafts: text input 235, search 235, date 235, dropdown 112, time 106, button 107 (hug), button with arrow 99 (hug).

### 4.3 Shell geometry (both are same system; coordinates local to the frame)

**1440x1024 (Trade Auction 189:1104; Client Auctions 273:211 same):**
- Frame fill `bg`.
- Sidebar "Frame 1" 189:1325: x0 y0 64x1024, fill `bg lighter`, radius TR24. Logo vector 12,20 40x32 (blue@0.6). Icon unions 24x24 at x20: y92 (active white), y148 (grey light). Avatar group 189:1333 at 16,960 32x32 (32 px above bottom).
- Product title "Equity Derivatives Auction" 20px blue at x80 y24 (235x24).
- Section title "Auctions" 16px white at x80 y82 (64x19).
- Header rule: LINE 189:1341 at x1416 y61 w1336 (runs x=80..1416 visually; 1px grey dark). Left margin 80 from frame edge (64 sidebar + 16), right margin 24.
- "View as:" group 261:1953 at 1232,13 184x32 (dropdown 189:1342 at 1299,13 117x32).
- "New Auction" button 189:1343 at 1272,73 144x32 (right edge 1416).
- Main panel "Frame 14" 189:1105 at 80,117 1336x682 (273:211: 795x455 and 795x418 cards at y117/y588 plus toast 273:1155 at 1088,77 328x114). Panel radius 8, fill `bg lighter`, padding 16. Panel header band 56 high with 1px rule at y56 (189:1256 grey medium); header contents at y12 (32 high): minimize icon 24x24 at 16,16; group "Cash Close" at 60,12; Time Left chip 593,12 151x32; red "Cancel Auction" button 1167,12 157x32 (right edge 1324 = panel width 1336 - 12).
- Inner blocks: left tables x16 w839 (y97 h205; y314 h139; y465 h205), right blocks x863 w457 (same y). Column gap 863-855 = 8; row gap 12 (302->314, 453->465). Right padding 16 (863+457=1320 of 1336).
- Other 1440 variants (273:1559, Isaak 766:401): content cards are 855 wide at 80,117; the 273:211 cards are 795 wide.

**1920x1080 (Client Auctions 1008:687, newer):**
- Sidebar 1008:688 x0 y0 64x1080 (same style; avatar group at 16,1016 -> 32 px above bottom).
- Title 80,24; "Auctions" 80,82; header rule 1008:704 at x1896 y61 w1816 (80..1896, right margin 24).
- Left column of three session cards 795x190 at x80: y117, y323, y530 (vertical gap 16/17). Each: fill `bg lighter` r8, inner rule at y56 (grey dark), inner block 763x106 at 16,68 (`bg medium` r8), header group at 60,12 (121x34), Time chip 146x32 at 633,12.
- Right: table "Frame 113" 1008:813 at 898,117 998x741 r8, V auto-layout: header bar Frame 112 998x56 (fill `bg lighter`, p12/16/12/16, "Audit Log" 16px grey light) + Table - Sheet1 998x685 (`bg medium`). Gap between left column (right edge 875) and table = 23. Table right edge 1896 (margin 24). Table header row 998x39, header cell padding 12/8/12/16 or 12/8/12/8, 12px text.

Section2 canvas layout (frame positions): 1440x1024 frames at x2355/3887/5491/7095, y181 (row1), 1376 (row2), 2571 (row3), 3710 (row4); Log In 131:720 at 756,181; 1920x1080 frame 1008:687 at 339,1376.

---------------------------------------------------------------------------------------------------

## 5. OVERVIEW OF OTHER PAGES

### "page for Isaak" 738:152 (4 top-level frames, Lato Regular only, no unique tokens)
- 742:153 "Trade Auction" 1440x1024 at 0,0 - 247 nodes. Same shell + order-book as Section2 189:1104 (panel 80,117 1336x682). Uses raw chip #A494FF@0.3 (3) -> the older purple.
- 766:401 "Client Auctions" 1440x1024 at 9,1150 - 221 nodes. Cards 855x455 (80,117) and 855x418 (80,588). NEW element not in Section2: text "LOGGED IN AS: BANK OF OG" at 1120,19 329x29 (767:630; Lato Regular 14, line-height AUTO, fill raw #FFFFFF (unbound, pure white not #F8F7FF), left-aligned, 329x29). Row-level controls: red circle "x" delete icons, blue "+" add icons, error toast, "Cancel" arrow-buttons in red (live) and grey disabled (EFP session "Starting in:" 04:59), green selection stroke on cells. Uses raw chip #B694FF@0.2 (6), red error toast.
- 767:631 "Client Auctions" 1440x1024 at 1489,1150 - 223 nodes; same as above but different values (Spread 2.50 vs 0.40) and "LOGGED IN AS: BANK OF MAKOR" (767:845). Per-client views.
- 956:169 "Acution Summary" 1440x1024 at 1941,-45 - 92 nodes. Panel 855x522 at 80,117; "Frame 10" 823x106 at 156,771 (notification card, "Orders matched:").
These are client-specific variants/iterations of the canonical Section2 screens (Section2 equivalents 273:211, 273:1559, 189:1104). They add the "LOGGED IN AS:" header label (not in Section2 273:211), which is a candidate supersession/addition - confirm with designer. Page has no components and no variables beyond the 23.

### "drafts" 0:1 (32 top-level nodes) - the real components + old iterations
Components (all on 1 component each unless noted; all fill-less main components - fills are overridden per instance):
- 76:274 `text input` 235x32 (fill grey dark, r4, p10/12/10/12, text grey medium "Text" 14).
- 134:218 `search` 235x32 (+ lucide/search 16x16, vector blue 1.5).
- 1001:744 `date` 235x32 (+ lucide/calendar 16x16, vector blue 1.3, "dd/mm/yyyy").
- 115:702 `dropdown` 112x32 (gap 40, text grey medium "Name", chevron 11x6 grey light).
- 85:94 `time` 106x32 ("00:00" + "min", two arrow-big-down icons 10x12 grey light @0.3 radius).
- COMPONENT_SET 85:128 `check`: uchecked 85:127 (16x16 grey dark r2) / checked 85:129 (blue r2, check vector stroke grey dark 2).
- COMPONENT_SET 134:904 `button`: Default 4:156 (107x32, no fill, text bg 14, r4, p6/32/6/32 gap10), Variant3 261:1922 (identical, appears unfinished), disabled 134:905 (fill grey medium, text grey light).
- COMPONENT_SET 134:907 `button with arrow`: Default 23:162 (99x32, p6/12/6/24 gap8, 12x12 chevron frame with 8x4 vector stroke bg 1), disabled 134:908.
Screens (old iterations, all 1440x1024): 4:13 "1", 16:375 "2", 16:244 "3", 11:81 "4" (Order Book / Price Book - first concept, 16px type), 41:21 / 189:1406 / 189:1596 "Client Auction", 48:759 "New lever added", 189:2009 "Acution Freeze time", 189:2410 / 189:1729 / 113:173 "Auction/Trade", 61:81 "New auction", 131:192 "Log In", 134:219 / 166:351 "Statics / Users", 134:585 "Statics / Clients", 134:680 "User (New & Edit)", 134:913 "New Client", 170:543 "Edit Client", 45:299 "6", 45:414 "Frame 15", and 1920x1080 draft 1000:429 "Client Auctions" (416 nodes, table 1001:745 "Table - Sheet1" 976x685, 12px text 126 nodes) + reference images 41:19 (2054x1064) and 1000:663 (1911x962).
Stale raw colours in drafts only (not in Section2): #FFA041@0.2, #FFE675@0.15, #FFDF75, #412B34, #18181C@0.7, #71E7FF@0.2, #2D2E3B raw. Section2 supersedes drafts for screens; drafts are authoritative ONLY for the component definitions (text input/search/date/dropdown/time/check/button/button with arrow). Old drafts use 16px body and 17/23px stray sizes.

---------------------------------------------------------------------------------------------------

## 6. GAPS / UNSPECIFIED IN FIGMA (searched, not found)

Searched by name regex (hover, focus, press, disabled, error, tooltip, toast, skeleton, loading, spinner, empty, select, toggle, radio, badge, chip, status, modal, overlay, scroll, menu, popover, alert, banner, notification, checked, active) over all 3 pages, plus variant lists of every component set.

Present: disabled for `button` and `button with arrow` (grey medium fill / grey light text); checked/unchecked `check`; error cell + error toast (static frames 273:1141/273:1144); success toast 273:1147; partial-fill toast 273:1283; notification cards (273:1155, 189:984); modal scrim with blur 12; selected/focus-like cell stroke green 1px (189:1163); active/inactive tab (blue vs grey light, 170:790 vs 170:788); "Active"/"Inactive" status text.

NOT in Figma (must be extended): hover states for every control, row, tab, icon and link; focus ring/focus-visible; pressed/active states; disabled for text input/search/date/dropdown/time/check; filled/valid and error variants of `text input`/`date`/`time`/`dropdown` (error exists only as a one-off stroke on a table cell); open dropdown menu / date picker / time picker popovers (189:819 is an unlabelled 112x115 shadowed frame - inspect); tooltips; toast stacking, enter/exit, timers, dismiss affordance; skeleton/loading/spinner/progress; empty states (only 'XYZ'-empty table rows in Isaak frames); radio, toggle/switch (an "Active" `check` 16x16 dot exists); scrollbars; pagination; keyboard behaviour; a variable-bound type/spacing/radius/shadow scale (none exist - all are literal); light theme; mobile/tablet breakpoints (only 1440x1024 and 1920x1080 exist); text styles in Figma (none - sizes are literal per node); bold/medium weights; line-height and letter-spacing tokens (AUTO / 0).

Not read: table body row height on the 1920 frame (header row = 998x39 only), visual/contents of 189:819, per-state look of controls beyond what exists above.

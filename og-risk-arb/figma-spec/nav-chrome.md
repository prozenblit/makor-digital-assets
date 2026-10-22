# OG Risk Arb - Navigation and App Chrome (Figma harvest)

File VlOfBG6fJt7ijm0iKasAMP, page "final" 48:850, SECTION "Section 1" 2496:2003.
All numbers read from the Plugin API (px, 1x). "(derived)" = computed from other read values. "(visual)" = screenshot read only. Colours are exact hex; `@n` = paint opacity.
Font family everywhere: **Geist** (Regular / Medium / Bold). Line height is AUTO everywhere (12px text -> 16px box, 14px -> 18px, 16px -> 21px), letter-spacing 0.

## 0. Token summary used by this area

| Token (inferred name) | Value |
|---|---|
| brand teal (active) | #005268 |
| selected-parent bg | #005268 @ 0.1 (i.e. rgba(0,82,104,0.1)) |
| surface | #FFFFFF |
| surface-subtle (active tab, search field, active sub-item, hover row) | #F5F5F8 |
| border-subtle (nav border, tab border, result-row border, section divider, top-bar bottom border) | #F5F5F8 |
| border (panel, search field, filter selects, close-chip bg, notch stroke) | #E5E7EC |
| muted text / placeholder / section-icon | #7C8DAC |
| lighter muted (section headings in search dropdown, toggle chevron) | #A8B6CD |
| text | #000000 |
| scrim | #E5E7EC @ 0.2 + BACKGROUND_BLUR 20 |
| Effect style "Shadow" (only effect style in file) | 5 drop shadows, colour #5B6380: (x2,y1,blur5,spread0,a0.17); (x7,y6,blur9,a0.15); (x3,y4,blur12,a0.09); (x-3,y24,blur14,a0.03); (x42,y37,blur16,a0.00). CSS: `box-shadow: 2px 1px 5px rgba(91,99,128,.17), 7px 6px 9px rgba(91,99,128,.15), 3px 4px 12px rgba(91,99,128,.09), -3px 24px 14px rgba(91,99,128,.03), 42px 37px 16px rgba(91,99,128,0)` |
| Logo gradient (linear, stops) | #005268 0 / #1B9D83 0.36 / #3675D2 0.72 / #00C7CE 1 (gradient handle/direction NOT extracted; visual: dark teal at top -> cyan at bottom) |

Text styles used (no Figma text styles referenced; raw values):
- Nav item / tab / filter / result text: Geist Regular 12 or Medium 12 (box h16).
- Nav section label ("Risk Arbitrage"/"Risk Arb DB"): Geist Medium 14, #7C8DAC (box h18).
- Search field text: Geist Regular 16 (box h21). Placeholder #7C8DAC, typed #000000.
- Avatar initials "SG": Geist Regular 14, #000, align CENTER, fixed box 19x18.
- Result highlight: Geist Bold 12 #005268 (rest Regular 12 #000).

## 1. Full screen frame skeleton (1920x1080, fill #FFFFFF, no stroke/radius/effect, clip off, no auto-layout; all children absolutely placed)

Dashboard 414:2798 / Search 1720:5473 / Events Calendar month 721:2257 / New Deal 1868:10765:

| Element | id (Dashboard) | x,y | w x h | Notes |
|---|---|---|---|---|
| Nav (instance of Nav min 924:3461) | 2044:6454 | 0,0 | 72 x 1032 | fill #FFF, stroke 1 #F5F5F8 INSIDE, radius TL0 TR0 BR8 BL0. Leaves 48px white strip below (1032..1080). |
| Top bar "Frame 15" | 1567:4503 | 72,0 | 1848 x 64 | fill #FFF; H auto-layout, pad T16 R48 B8 L16, gap 0, main SPACE_BETWEEN, cross CENTER, clip; sizing FIXED x HUG. No stroke on normal screens (Search screen only: bottom 1px #F5F5F8 INSIDE). |
| - Search field | 1567:4505 | abs 88,16 (rel 16,16) | 840 x 40 | component "Search" 5:148 (component default size 197x40) |
| - Avatar | 1567:4506 | abs 1832,16 (rel 1760,16) | 40 x 40 | right edge 1872 = 1920-48 |
| Tab bar "Frame 80" | 414:2891 | 88,72 | 1784 x 32 | H auto-layout gap 0, pad 0, cross CENTER, FIXED x HUG. (Deal / Deal Edit screens: y=73, w=1769.) |
| Main panel "Frame 1000001046" | 1612:4365 | 88,103 | 1784 x 929 | bottom edge y=1032, right edge x=1872 |

- Gutters (derived): nav->content 16 (72->88); right 48 (1872->1920); bottom 48 (1032->1080); top bar height 64; tab bar top 72 (8px below top bar bottom 64); tab bar bottom 104 overlaps panel top (panel y=103) by 1px so the active tab's bottom stroke covers the panel top border (Dashboard). Events Calendar / New Deal panel (Rectangle 9 / Frame 1000001070) starts y=104, h=928 -> bottom 1032 (tab bottom abuts exactly).
- Main panel container: no fill, stroke 1 #E5E7EC INSIDE, radius TL0 TR8 BR8 BL8 (top-left is square so the first tab joins it), H auto-layout pad 16 all sides, gap 8, main MIN, cross CENTER, FIXED x FIXED. Dashboard inner columns: Frame 332 (FILL, 952, stroke 1 #F5F5F8, r8, clip), Frame 258 (420 fixed, fill #3675D2@0.05), Frame 243 (364 fixed, fill #E2E2E2@0.25, stroke 1 #F7F7F7, r8) - those belong to other harvesters.
- Deal screens (1720:6515, height 2638) keep the same nav/top bar/tab positions; the nav stays 72x1032 at 0,0 (does not stretch with the long page).
- Search screen z-order (child order, bottom->top): Frame 80 tabs, Frame 1000001046 panel, Group 214 (scrim 1941:6000 + dropdown 461:3415 + top bar 1615:4438), Nav min instance 2044:6508.

## 2. Left navigation - four sizes

Common to Nav min / open / max: fill #FFFFFF; stroke 1 #F5F5F8 INSIDE; radius [TL0,TR0,BR8,BL0]; V auto-layout; pad 16 all; main MIN, cross MIN; sizing HUG x FIXED(1032). No effects.

### 2.1 Nav min - COMPONENT 924:3461 (72 x 1032), the only nav actually instanced on all 14 canonical screens
- itemSpacing (gap) 26. Children: Frame 27 (logo block) y=16, Frame 150 (item list) y=106.
- Frame 27 414:3306: 40 x 64, H layout gap 80 (irrelevant), cross CENTER. Child "logo" 414:3307: 40 x 48, FILL x FIXED, at y=8; vector "Path 1814" 414:3308 31 x 48 at x=4 (OG monogram), gradient fill (see tokens). Logo vertical placement: mark occupies abs y 24..72.
- Frame 150 414:3309: 40 x 184, V layout gap 8, pad 0, HUG x HUG. Four item frames, each 40 x 40, H layout gap 12, pad 4/4/4/4, main MIN, cross CENTER, sizing FILL x HUG, radius 4:
  | item | node | fill | icon node (32x32 frame) | vector (x,y,w,h) | vector paint |
  |---|---|---|---|---|---|
  | Open Deals (book) - SELECTED in every screen | Frame 174 414:3310 | #005268 @0.1 | "noun-book-7649981 1" 414:3311 clip | 414:3312 (7,7,18x18) | fill #005268, no stroke |
  | Closed Deals (complete-task) | Frame 175 414:3313 | #FFFFFF | "noun-complete-task-1854454 1" 414:3314 (no clip) | 414:3315 (7,6.98,18x18.02) | fill #005268 + stroke #005268 0.5 CENTER |
  | History (clock-rewind) | Frame 178 414:3316 | #FFFFFF | "noun-history-7815843 1" 414:3317 clip | 414:3318 (6,7,20x19) | fill #005268 + stroke #005268 0.2 |
  | Reports (document) | Frame 179 414:3319 | #FFFFFF | "noun-history-7815843 1" (mis-named) 414:3320 clip | 414:3321 (7,6,18x20) | fill #005268 + stroke #005268 0.4 |
- Item default = #FFFFFF fill (an explicit white fill, not transparent), radius 4. Selected = #005268@0.1 fill. Icon colour is #005268 in ALL states (selected and not) - icons do not change colour with selection.
- No labels in this state (labels exist only in open/max).
- Identical on every screen: Figma never changes which icon is selected per page (Events Calendar, Deal, New Deal, All Deals all show the Open Deals book selected).

### 2.2 Nav open - FRAME 414:2723 (191 x 1032)
- gap 16. Children: header Frame 1000001050 (1615:4425) 159 x 74 at (16,16); Frame 150 (414:2727) 159 x 184 at (16,106). Content width = 191-32 = 159.
- Header (V layout gap 16, FILL x HUG): (a) Frame 27 414:2724 72 x 40 holding "logo" 414:2725 72 x 40 -> Path 1814 414:2726 72 x 39.53 = full **Oscar Gruss wordmark** (SVG 11.9 kB; export node 414:2726 via exportAsync); (b) row Frame 1000001126 2044:6396 159 x 18, H layout gap 16, main SPACE_BETWEEN, cross CENTER, containing text "Risk Arbitrage" (1615:4421, Geist Medium 14, #7C8DAC, 94x18, align LEFT) and the 16x16 collapse-sidebar icon (2044:6395, boolean Union 14x14 at 1,1; fill #7C8DAC; built from rounded rect r2 stroke 1.3 + a vertical line, see SVG appendix).
- Item rows (Frame 150: V gap 8, 159 x 184): each 159 x 40, H layout gap 12, pad T8 R4 B8 L4, cross CENTER, sizing FILL x FIXED(40), radius 4:
  - Open Deals 414:2728 (fill #005268@0.1): book icon 32x32 at (4,4); label group "Frame 180" 414:2731 97 x 24 at x=48 (H gap 8, cross CENTER) = text "Open Deals" Geist Medium 12 #005268 (65x16) + chevron frame "lucide/chevron-down" 24x24 (stroke 1.5 #005268 vector 8x4) **flipped vertically (relativeTransform [[1,0,73],[0,-1,24]]) => caret points UP**.
  - Closed Deals 414:2735 (fill #FFFFFF): complete-task icon; label group 107 x 24 = "Closed Deals" Geist Medium 12 **#000000** (75x16) + chevron 24x24 stroke 1.5 #000, caret DOWN (frame flipped + vector flipped).
  - History 414:2742 (fill #FFF): history icon; label group Frame 180 41x16 (label box h16, y=12) = "History" Medium 12 #000.
  - Reports 414:2747 (fill #FFF): label "Reports" Medium 12 #000 (45x16).
- Note: Nav open shows the Open Deals row with the UP caret but NO sub-items list (height stays 184). It is the "chevron says expanded, list not drawn" variant - flag as Figma inconsistency; Nav max is the definitive expanded layout.

### 2.3 Nav max - FRAME 414:2752 (219 x 1032), expanded with sub-items
- Same as Nav open but content width 187 (219-32); header 2044:6397 187 x 74; row 2044:6401 187 x 18 (label "Risk Arbitrage" + 16x16 collapse icon right-aligned at x=171). Frame 150 414:2756 187 x 512, V gap 8:
  - y0   Frame 182 414:2757 Open Deals (selected parent) 187x40, fill #005268@0.1, radius 4, pad T8 R4 B8 L4, gap 12; text #005268 Medium 12; chevron UP stroke #005268.
  - y48  Frame 149 414:2764 sub-list: 187 x 320, V layout gap 0, **pad L24 only** (T0 R0 B0), FILL x HUG. Eight sub-items, each 163 x 40 (x=24), H layout pad T12 R16 B12 L16, gap 0, cross CENTER, sizing FIXED x HUG:
    - Active "All Deals" 414:2765: fill #F5F5F8; stroke #005268 **left only 3px**, INSIDE (T0 R0 B0 L3); radius [TL0,TR4,BR4,BL0]; text Geist **Medium** 12 #005268.
    - Inactive (Stock Deals, Cash Deals, Cash-Stock Deals, Spinoffs, Liquidating Trusts, Cash Bankruptcy, Activist Situations): fill #FFFFFF, no stroke, radius 2 (all corners), text Geist **Regular** 12 #000.
    - Order: All Deals, Stock Deals, Cash Deals, Cash-Stock Deals, Spinoffs, Liquidating Trusts, Cash Bankruptcy, Activist Situations. (Dashboard filter chips are different: Cash/Cash-Stock/Stock/Exchange/Spinoff.)
  - y376 Frame 183 Closed Deals (187x40, white, r4; label Medium 12 #000 + chevron DOWN stroke #000)
  - y424 Frame 184 History, y472 Frame 185 Reports (text frame y=12).
- Sub-item left indent: text starts 24 (list pad) + 16 (item pad) = 40px from content edge, which equals icon column 4+32+... label x=48 in parent rows (8px more than sub-item text x=40; derived).

### 2.4 Section expanded/collapsed (chevron)
- Collapsed = chevron DOWN (Closed Deals, #000). Expanded = chevron UP (Open Deals, #005268; colour follows the label colour: teal when it is the selected/active section, black otherwise).
- Chevron geometry (24x24 frame, vector 8x4, stroke 1.5, round cap/join): down path M0.75 10 L4.75 14 L8.75 10; up path M0.75 14 L4.75 10 L8.75 14 (in a 25x24 export box; the chevron sits at the LEFT of its 24px box, i.e. glyph spans x 0.75..8.75, y 10..14).
- Sub-item hover / pressed / focus: NOT drawn anywhere.

### 2.5 "Group 212" 2139:8207 (84 x 1033) and "Group 215" 2139:8228 (231 x 1033) = nav + edge pull-tab (expand / collapse handle)
These are alternative presentations of the nav with a toggle notch on the right edge (not hover/selected variants):
- **Group 212 = collapsed nav (72 wide) + expand handle.** Parts: Union 2139:8208 84 x 1032 (boolean: Rectangle 38 72x1032 radius [TL0,TR12,BR12,BL0] + Ellipse 40x40 at rel (44,53) => bulge x 72..84, centred y=73), fill #FFFFFF, stroke 1 #E5E7EC INSIDE (note: #E5E7EC, nav component uses #F5F5F8; radius 12 vs nav 8). Union path exported: `M60 0C66.6274 .. ` (see appendix). Chevron 2139:8211: stroke #A8B6CD 1.5, rotated so it reads ">" (box 6x10 incl. stroke; glyph centre at rel (71,73) of the group origin). Inner "Nav min" 2139:8212 72x1032 at (0,1): V gap **42** (vs 26 in the component), pad 16; logo block "Frame 28" 40x40 (mark Path 26x40 at x=7, centred) so item list starts at y=98 (component: 106) and the logo mark is 26x40 (component: 31x48). Item frames identical to 2.1 (ids 2139:8216/8219/8222/8225).
- **Group 215 = expanded nav (219 wide) + collapse handle.** Union 2139:8229 231 x 1032 (Rectangle 38 219x1032 r[0,12,12,0] + Ellipse 40 at rel (191,53)), same fill/stroke. Chevron 2139:8232 stroke #A8B6CD 1.5 reads "<" (glyph centre rel (217,73)). Inner "Nav min" 2139:8233 219x1032 at (0,1), gap 16, pad 16: header Frame 1000001127 187 x 66 (V gap 8): wordmark logo 72x40 + text **"Risk Arb DB"** Geist Medium 14 #7C8DAC (79x18) (NO collapse icon in this header - the handle replaces it); then Frame 150 (187x512) identical to Nav max (ids 2139:8240 ... 2139:8280): selected Open Deals w/ UP chevron + all 8 sub-items + Closed Deals/History/Reports.
- Label conflict: "Risk Arbitrage" (Nav open / Nav max) vs "Risk Arb DB" (Group 215). Pick one deliberately; canonical product name per screens/nav is not stated elsewhere.
- Handle position: vertically 53..93 from the nav top (centre 73 below nav top; 8px below the logo block's 40px + 16 pad... derived).

### 2.6 State matrix (nav)
| State | Collapsed (72) | Open (191) | Max (219) |
|---|---|---|---|
| width | 72 | 191 | 219 |
| header | OG mark only (31x48) | wordmark 72x40 + "Risk Arbitrage" 14 + collapse icon | same, wider |
| item content | icon only 40x40 | icon + label | icon + label (+ sub-list when Open Deals expanded) |
| selected item | #005268@0.1 bg r4, icon teal | same, label #005268 | same + sub-item active (#F5F5F8 + 3px left bar) |
| hover | not defined | not defined | not defined |

## 3. Top bar (Frame 15) - search field and avatar

Frame 15: 1848 x 64 at (72,0), fill #FFFFFF, no stroke (normal screens), H layout pad T16 R48 B8 L16, gap 0, SPACE_BETWEEN, clip.

### 3.1 Search field (component "Search" 5:148; standalone COMPONENT, no variants; instance 840 x 40)
- Default/empty (Dashboard etc.): fill #F5F5F8; stroke 1 #E5E7EC INSIDE; radius 4; H layout pad T7 R12 B7 L12, gap 8, main MIN, cross CENTER; clip. Children: lucide/search 16x16 (vector 12.44x12.44 at 1.78,1.78; stroke 1 #000 round; `M14.2222 14.2222L11.2217 11.2217` + circle r~5.53 at 7.31,7.31) then text "Search" Geist Regular 16 #7C8DAC (52x21; text y 9.5, x 36).
- Focused + typed (Search screen, instance 1615:4439): identical box but **stroke #005268** 1px INSIDE; fill remains #F5F5F8; text colour becomes #000000, content "Get|" (the caret is a literal "|" character in the string, 31x21). So: focus = teal border; typed text black; placeholder #7C8DAC.
- No clear (x) button, no shortcut hint, no loading state, no hover state.

### 3.2 Avatar "user-circle-02-duotone-rounded 1" 1567:4506
- 40x40 frame, clip, no fill. Vector 1567:4507 at (4,4) 32x32: circle stroke 1.5 #000 CENTER (path = full circle r16 centred 20,20), no fill. Text "SG" 1567:4508 at (10.48,11.43) fixed 19x18, Geist Regular 14, #000, CENTER (initials of user; will vary).
- Only one state exists. **No user menu / dropdown is drawn anywhere** (no sign-out, profile, etc.). Names matched for "menu/dropdown/avatar/user/popover/tooltip/logout/profile" return only this avatar, "User Behaviour/Interactions" admin report items and the "Profile Information" admin screen 1895:21100 (separate).
- The "Shadow" effect style is used by exactly two nodes: the search dropdown 461:3415 (below) and 2241:8396 "Frame 1000001143" 477x364 (a date-range picker popover: chips "All Time / This Month / This Quarter / Last Quarter", two date inputs "Jan 20, 2026 - Feb 09, 2026", two month grids; located in SECTION "changes for Laura" 2159:13682 > Dashboard 2241:7787, NOT in Section 1). Likely the Date filter's popover - belongs to another harvester.

## 4. Tab bar (Frame 80 414:2891; 1784 x 32; H layout gap 0, pad 0, cross CENTER)

Every tab: H layout, cross CENTER, main CENTER, height 32 FIXED, width HUG, radius [TL4,TR4,BR0,BL0], text 12px.
| Tab kind | fill | stroke | padding / gap | text |
|---|---|---|---|---|
| **Active** (Dashboard screen: "Dashboard" 414:2892, 110x32) | #F5F5F8 | bottom 3px #005268 INSIDE (T0 R0 B3 L0) | T12 R24 B12 L24, gap 16 | Geist Medium 12 **#005268** |
| Inactive, fixed (non-closable) e.g. "Events Calendar" 414:2894 (140x32) | none | 1px #F5F5F8 INSIDE all sides | T12 R24 B12 L24 (Dashboard/Search/Deal screens, widths 110/140) **or** T12 R16 B12 L16 (all other screens, widths 94/124) | Geist Medium 12 #000 |
| Inactive, closable e.g. "All Deals" 414:2896 (109), "AHL / 8630 JT" 414:2900 (142), "Cash Bankrupcy" 414:2904 (151) | none | 1px #F5F5F8 INSIDE | T12 R12 B12 L16, gap 16 | Geist Regular 12 #000 (label) + close chip |
- Close chip "lucide/circle-x" 16x16: fill #E5E7EC, radius 16, clip; X = 4x4 vector at (6,6), stroke 1 #000 round (`M10 6L6 10M6 6L10 10`). Chip x = label end + 16 gap; right pad 12.
- The label "Cash Bankrupcy" is misspelled in Figma (nav says "Cash Bankruptcy").
- Hover / pressed / focus / drag / overflow: not drawn. Adjacent tab borders sit edge to edge, so two 1px #F5F5F8 lines (2px visual) separate tabs (derived).

### 4.1 How the active tab differs per screen (all read from the tab bars)
| Screen | id | Active tab | Active text | Active bottom stroke | Notes |
|---|---|---|---|---|---|
| Dashboard | 414:2798 | Dashboard (110) | Medium #005268 | 3px #005268 | canonical |
| Search | 1720:5473 | Dashboard (110) | Medium #005268 | 3px | tab bar sits under scrim (blurred) |
| Events Calendar month | 721:2257 | Events Calendar (140, pad24) | Medium **#000** | 3px | Dashboard tab inactive 94 (pad16) |
| Events Calendar week / All events | 721:2388 / 721:2481 | Events Calendar (140) | Medium #000 | **2px** | |
| All Deals expanded | 824:8212 | All Deals (109) | **Regular #000** | 3px | Events Calendar 124 |
| All Deals collapsed / Drafts | 1988:6731 / 1988:5649 | All Deals (109) | Regular #000 | 3px | |
| Deal / Deal Edit Events | 1720:6515 / 1720:6136 | "SSTK / GETY" (132) in slot of "AHL/8630 JT" | Medium #005268 | 3px | tab bar at y=73, w=1769 |
| New Deal / New Deal Empty / Expanded | 1868:10765 / 1868:10474 / 1868:10064 | "New Deal" (114) appended last | Regular #000 | **2px** | 5 tabs: Dashboard, Events Calendar, AHL / 8630 JT, Cash Bankrupcy, New Deal |
=> Figma is inconsistent: active text is teal Medium in Dashboard/Deal, black in the others; stroke is 3px except 2px in Calendar week/All events/New Deal. Canonical (first-designed, Dashboard) = fill #F5F5F8 + 3px #005268 bottom + teal Medium text.
- Tab order when a deal opens: appended / replaces slot after the pinned Dashboard + Events Calendar.

## 5. Search screen 1720:5473 (1920x1080) - complete structure

Layers: normal Dashboard page beneath (tab bar + panel, unchanged), plus Group 214 1941:5999 (72,0, 1848x1080) containing three pieces:
1. **Scrim** "Frame 1000001124" 1941:6000 at (72,64) 1848 x 1016 -> "Rectangle 11" 461:3414: fill #E5E7EC @0.2, effect BACKGROUND_BLUR radius 20 (CSS equivalent per Figma export convention: `backdrop-filter: blur(10px)` (derived; Figma radius = 2x sigma)). Covers everything right of the nav and below the top bar (nav and top bar stay sharp).
2. **Top bar** "Frame 15" 1615:4438: as section 1 but with bottom border 1px #F5F5F8 INSIDE; search field in focused/typed state (3.1).
3. **Dropdown panel** "Frame 359" 461:3415 at (84,64), 844 x 420 (HUG height): fill #FFFFFF; radius 8; effect style "Shadow" (tokens table); V layout pad T16 R0 B8 L0, gap 16, FIXED x HUG. (Right edge x=928 = search field right edge; left edge starts 4px left of the field's left (88). Top touches the top bar bottom (y=64); 8px below the field's bottom (y=56) (derived).)
   - **Filter row** "Frame 355" 461:3416: 844x32 at y=16, H layout pad L16 R16, gap 8, cross CENTER. Three equal selects, each FILL x FIXED(32) = 265.33 x 32 (x=16, 289.33, 562.67): fill #FFFFFF, stroke 1 #E5E7EC, radius 4, pad T7 R12 B7 L12, main SPACE_BETWEEN, clip. Text Geist Regular 12 #7C8DAC: **"Page"**, **"Author"**, **"Date"**. Right icon 16x16: "lucide/chevron-down" for Page and Author (glyph `M3 6L8 11L13 6`, stroke 1 #000, round) and a calendar icon for Date (glyph `M5.33 3V5 ... `, stroke 1 #000; node still named lucide/chevron-down). Selects are drawn closed/empty only (no selected value, open, hover or focus state).
   - **Results** "Frame 358" 461:3429 at y=64, 844x348, V layout gap 12, FILL x HUG, contains section groups:
     - Section group: V layout gap 8, pad T0 R16 B16 L16, FILL x HUG. **Section 1 "Open Deals"** Frame 351 461:3430 (844x100) has a bottom border 1px #F5F5F8 (T0 R0 B1 L0). **Section 2 "Dashboard"** Frame 354 461:3438 (844x236) has no border. Section heading text: Geist **Medium** 12 **#A8B6CD**, FILL x FIXED(16); string has a trailing space ("Open Deals ", "Dashboard ").
     - Result row (Frame 349 / 348 / 347 / 346): 812 x 60 (FILL x HUG), fill #FFFFFF, stroke 1 #F5F5F8, radius 4, H layout pad T12 R8 B12 L8, gap 8, cross CENTER. Rows are 8px apart (heading->row 8, row->row 8).
       - Leading icon 32x32 frame (clip) at x=8: vector fill/stroke #7C8DAC. Icons by result type: **book** (Open Deals / Dashboard deal results; fill #7C8DAC, 18x18 at 7,7), **calendar** (Upcoming Events; stroke 1.2 #7C8DAC), **comment/chat bubble** (Recent Updates / Comment; stroke 1.2 #7C8DAC). (visual+path: calendar `M12 8V11M20 8V11M7 14H25...`, chat bubble path in appendix.)
       - Text block "Frame 342-345": V layout gap 4, FILL x HUG, 756 wide at x=48, 2 lines of 16 = 36 high: line 1 = breadcrumb/path (Geist Regular 12 #7C8DAC, e.g. "SSTK/GETY / Dates Summary / 02/19/2026", "Top Picks/ SSTK/GETY / Acquirer / Name", "Upcoming Events / Today", "Recent Updates/ Comment"); line 2 = matched title (Geist Regular 12 #000) with the matched query substring in **Geist Bold 12 #005268**. Matching is case-insensitive and preserves the source casing: query "Get" highlights "GET" in "GETY", "Get" in "Getty", and both "GET" occurrences in "... shares of GETY subject to proration ... of GETY and $9.50 cash..." (snippets use leading/trailing "..." and mid "..." ellipses, truncated to one line, no wrap). The rows are one line per field (no 2-line wrap rules visible).
       - **Selected / hover row** (Frame 347 "Upcoming Events / Today"): fill **#F5F5F8**, stroke 1 **#E5E7EC** (default row: white fill, #F5F5F8 stroke). Only one such row; it is probably keyboard/hover highlight (not labelled).
     - Content of the mock: Open Deals -> 1 row; Dashboard -> 3 rows (book "Top Picks", calendar "Upcoming Events / Today" (highlighted), comment "Recent Updates/ Comment").
   - Height math (derived): 16 + 32 + 16 + 348 (100 + 12 + 236) + 8 = 420.
- NOT drawn: empty state / "no results", loading, result count, "view all", keyboard hints, scroll behaviour for >N rows (panel is HUG), selects open, recent searches, clear button.

## 6. SVG appendix (exact, from exportAsync on the named nodes)

Nav icons are 32x32 viewBox "0 0 32 32". Paint shown is the nav (teal) variant; result-list variants are the same path in #7C8DAC.

book (414:3311) - fill #005268:
`M23.5 7H19.6C18.4 7 17.2515 7.57942 16.45 8.58983L16 9.16014L15.55 8.58983C14.7484 7.57942 13.6 7 12.4 7H8.5C7.67147 7 7 7.74608 7 8.66667V20.6667C7 21.5873 7.67147 22.3333 8.5 22.3333H12.4C13.6152 22.3333 14.7039 23.1406 15.1715 24.3906C15.3098 24.7604 15.6367 25 16 25C16.3633 25 16.6902 24.7604 16.8285 24.3906C17.2961 23.1406 18.3824 22.3333 19.6 22.3333H23.5C24.3285 22.3333 25 21.5873 25 20.6667V8.66667C25 7.74608 24.3285 7 23.5 7ZM15.4 22.2069L14.5 21.6275C13.8637 21.2174 13.1383 21.0012 12.4 21.0012H8.2V8.33317H12.4C14.0535 8.33317 15.4 9.82925 15.4 11.6665V22.2069ZM23.8 20.9999H19.6C18.8617 20.9999 18.1363 21.2161 17.5 21.6262L16.6 22.2056V11.6654C16.6 9.82811 17.9464 8.33203 19.6 8.33203H23.8V20.9999Z`

complete-task (414:3314) - fill-rule evenodd, fill #005268, stroke #005268 0.5:
`M9.83942 15.3098L14.0365 19.6108C14.2036 19.7821 14.4763 19.7821 14.6435 19.6108L24.8736 9.12737C25.0421 8.95466 25.0421 8.67663 24.8736 8.50532C24.7064 8.33401 24.4338 8.33401 24.2666 8.50532L14.3393 18.6769L10.4463 14.6875C10.2791 14.5162 10.0064 14.5162 9.83925 14.6875C9.67071 14.8588 9.67088 15.1385 9.83942 15.3098ZM23.6722 15.5L23.7045 21.453C23.7045 22.9176 22.5329 24.1181 21.1024 24.1181L10.4613 24.1195C9.03214 24.1195 7.8606 22.919 7.8606 21.4544V10.5483C7.8606 9.08378 9.03214 7.88183 10.4613 7.88183L20.1135 7.86271C20.3505 7.86271 20.5437 7.66473 20.5437 7.4218C20.5437 7.17888 20.3519 6.98089 20.1135 6.98089L10.4613 7.00141C8.55669 7.00141 7 8.59652 7 10.5484V21.453C7 23.4048 8.55657 25 10.4613 25H21.1024C23.007 25 24.5637 23.4049 24.5637 21.453L24.5314 15.5C24.5314 15.2571 24.3396 15.0591 24.1012 15.0591C23.8641 15.0591 23.6722 15.2571 23.6722 15.5Z`

history (414:3317) - fill #005268, stroke #005268 0.2:
`M16.6489 7.00038C16.3583 7.00203 16.0645 7.0186 15.769 7.05173C11.6873 7.48412 8.44327 10.5955 7.64105 14.5748L7.17119 13.3952C7.10984 13.2411 6.99359 13.1185 6.84343 13.0556C6.69489 12.991 6.52697 12.991 6.37843 13.0539C6.22827 13.1169 6.10879 13.2378 6.04743 13.3902C5.98446 13.5426 5.98446 13.7149 6.04582 13.869L7.32943 17.078C7.41017 17.2818 7.58939 17.4276 7.80092 17.4607C8.01243 17.4922 8.22555 17.4094 8.36119 17.2387L10.5054 14.5549C10.6087 14.4273 10.6572 14.2633 10.641 14.0976C10.6249 13.9319 10.5457 13.7812 10.4198 13.6768C10.2955 13.5708 10.1356 13.5211 9.97416 13.5377C9.81432 13.5542 9.66577 13.6354 9.56406 13.763L8.87461 14.6261C9.63509 11.2614 12.4073 8.66062 15.8948 8.29059C20.0072 7.85488 23.7661 10.6646 24.6138 14.8078C25.4598 18.9527 23.1171 23.0712 19.1805 24.3616C15.2424 25.6522 11.0026 23.6873 9.34444 19.8091L9.34283 19.8074C9.2072 19.4943 8.85199 19.3535 8.54522 19.4894C8.23845 19.6269 8.09799 19.993 8.23038 20.3094C10.134 24.7644 15.026 27.0291 19.5472 25.5479C24.0684 24.0668 26.7758 19.3106 25.8024 14.5489C24.8901 10.0873 21.02 6.96044 16.6489 7.00038ZM15.9983 11.8437C15.8385 11.8437 15.6819 11.91 15.5689 12.0276C15.4542 12.1452 15.3912 12.3043 15.3912 12.47V17.8459C15.3912 18.063 15.4994 18.2651 15.6786 18.3794L18.7125 20.3094C18.9983 20.4883 19.3712 20.3989 19.5472 20.1073C19.7232 19.8157 19.636 19.433 19.3535 19.2508L16.607 17.5013V12.47C16.6087 12.3026 16.5441 12.1436 16.4294 12.026C16.3148 11.9084 16.1614 11.8421 15.9983 11.8437Z`

reports (414:3320): five outlined sub-paths (document outline + 4 text lines) - fill #005268 and stroke #005268 0.4; paths:
`M8.89588 6C7.85405 6 7 6.70787 7 7.57318L7.00016 24.426C7.00016 25.2912 7.85422 26 8.89605 26H11.3441L12.3237 25.9999H23.1041C24.1459 25.9999 25 25.2912 25 24.4259L24.9999 10.4112L24.9997 9.59774V7.57332C24.9997 6.70814 24.1456 6.00014 23.1038 6.00014L8.89588 6ZM23.104 6.81363H8.89588C8.37702 6.81363 7.97479 7.14643 7.97479 7.57304V24.4259C7.97479 24.8523 8.37681 25.1854 8.89584 25.1854H11.8351L23.104 25.1855C23.6231 25.1855 24.0214 24.8526 24.0214 24.426V7.57318C24.0214 7.14671 23.6231 6.81363 23.104 6.81363Z` (evenodd)
`M17.7404 21.4205C17.6106 21.4209 17.4865 21.4641 17.395 21.5407C17.3036 21.6172 17.2526 21.7208 17.2531 21.8288C17.2541 22.0522 17.4718 22.233 17.7404 22.234H20.9588C21.2274 22.2331 21.445 22.0522 21.4461 21.8288C21.4466 21.7208 21.3955 21.6172 21.3042 21.5407C21.2127 21.4641 21.0884 21.4207 20.9588 21.4203L17.7404 21.4205Z`
`M11.0412 17.5344C10.9114 17.5348 10.7872 17.578 10.6958 17.6546C10.6043 17.7313 10.5533 17.8349 10.5538 17.9427C10.5548 18.1662 10.7725 18.3471 11.0412 18.3479H20.9589C21.2276 18.3471 21.4451 18.1661 21.4463 17.9427C21.4468 17.8348 21.3956 17.7311 21.3043 17.6546C21.2129 17.578 21.0886 17.5348 20.959 17.5343L11.0412 17.5344Z`
`M11.0412 13.6514C10.7725 13.6522 10.5548 13.8332 10.5538 14.0566C10.5533 14.1644 10.6043 14.2682 10.6958 14.3447C10.7872 14.4213 10.9113 14.4645 11.0411 14.4649H20.9589C21.0886 14.4645 21.2129 14.4213 21.3043 14.3447C21.3957 14.268 21.4467 14.1644 21.4462 14.0565C21.4451 13.8331 21.2276 13.6522 20.9589 13.6513L11.0412 13.6514Z`
`M11.0412 9.76606C10.9114 9.76647 10.7872 9.8098 10.6958 9.88637C10.6043 9.96295 10.5533 10.0666 10.5538 10.1745C10.5548 10.3979 10.7725 10.5787 11.0412 10.5797H14.2595C14.5282 10.5788 14.7457 10.3979 14.7468 10.1745C14.7473 10.0666 14.6962 9.96295 14.6049 9.88637C14.5135 9.8098 14.3892 9.76647 14.2595 9.76606H11.0412Z`

lucide/search (16x16, stroke #000 1, round): `M14.2222 14.2222L11.2217 11.2217M12.8395 7.30864C12.8395 10.3632 10.3632 12.8395 7.30864 12.8395C4.25402 12.8395 1.77777 10.3632 1.77777 7.30864C1.77777 4.25402 4.25402 1.77777 7.30864 1.77777C10.3632 1.77777 12.8395 4.25402 12.8395 7.30864Z`

circle-x chip (16x16): `<rect width="16" height="16" rx="8" fill="#E5E7EC"/>` + stroke #000 1 round `M10 6L6 10M6 6L10 10`.

chevron (nav, stroke 1.5 round): down `M0.75 10L4.75 14L8.75 10`, up `M0.75 14L4.75 10L8.75 14`. Filter chevron 16x16 stroke 1: `M3 6L8 11L13 6`. Pull-tab chevron (6x10, stroke #A8B6CD 1.5): right `M0.75 0.75L4.75 4.75L0.75 8.75` (mirror for left).

Date icon in filter (16x16 stroke #000 1 round): `M5.33333 3V5M10.6667 3V5M2 7H14M3.33333 4H12.6667C13.403 4 14 4.44772 14 5V12C14 12.5523 13.403 13 12.6667 13H3.33333C2.59695 13 2 12.5523 2 12V5C2 4.44772 2.59695 4 3.33333 4Z`

Collapse-sidebar icon (16x16, fill #7C8DAC): `M13 1C14.1046 1 15 1.89543 15 3V13C15 14.0357 14.2128 14.887 13.2041 14.9893L13 15H3L2.7959 14.9893C1.85435 14.8938 1.1062 14.1457 1.01074 13.2041L1 13V3C1 1.89543 1.89543 1 3 1H13ZM3 2.2998C2.6134 2.2998 2.2998 2.6134 2.2998 3V13C2.2998 13.3866 2.6134 13.7002 3 13.7002H13C13.3866 13.7002 13.7002 13.3866 13.7002 13V3C13.7002 2.6134 13.3866 2.2998 13 2.2998H3ZM4.65039 4C5.0092 4.00021 5.2998 4.29154 5.2998 4.65039V11.3496C5.2998 11.7085 5.0092 11.9998 4.65039 12C4.29141 12 4 11.7086 4 11.3496V4.65039C4 4.29141 4.29141 4 4.65039 4Z`

Result-row calendar (32x32, stroke #7C8DAC 1.2 round): `M12 8V11M20 8V11M7 14H25M9 9.5H23C24.1046 9.5 25 10.1716 25 11V21.5C25 22.3284 24.1046 23 23 23H9C7.89543 23 7 22.3284 7 21.5V11C7 10.1716 7.89543 9.5 9 9.5Z`
Result-row comment (32x32, stroke #7C8DAC 1.2 round): `M25 20.055C25 20.4739 24.8104 20.8756 24.4728 21.1717C24.1352 21.4679 23.6774 21.6343 23.2 21.6343H11.3452C10.8678 21.6344 10.4101 21.8008 10.0726 22.097L8.0908 23.8358C8.00143 23.9142 7.88758 23.9676 7.76364 23.9892C7.6397 24.0109 7.51123 23.9998 7.39448 23.9573C7.27772 23.9149 7.17793 23.8431 7.10772 23.7509C7.0375 23.6587 7.00002 23.5503 7 23.4394V10.5793C7 10.1604 7.18964 9.75874 7.52721 9.46256C7.86477 9.16639 8.32261 9 8.8 9H23.2C23.6774 9 24.1352 9.16639 24.4728 9.46256C24.8104 9.75874 25 10.1604 25 10.5793V20.055Z`

Pull-tab outline (collapsed, 84x1032, fill #FFF, stroke #E5E7EC 1 inside):
`M60 0C66.6274 7.73109e-07 72 5.37258 72 12V46.8128C72 51.5824 75.093 55.6898 78.4028 59.1241C81.8685 62.7203 84 67.6111 84 73C84 78.3888 81.8685 83.2792 78.4027 86.8751C75.0928 90.3092 72 94.4165 72 99.186V1020C72 1026.63 66.6274 1032 60 1032H12C5.37258 1032 0 1026.63 0 1020V12C0 5.37259 5.37258 0 12 0H60Z` (expanded 231-wide variant is the same shape with body width 219: shift the bulge/right edge by +147).

Avatar ring: circle r16 centred (20,20) in the 40x40 frame, stroke #000 1.5, no fill (SVG `M36 20C36 28.8365 28.8365 36 20 36 ...Z`). "SG" is a live text node (Geist Regular 14).

Logo assets: OG mark = node 414:3308 (31x48, SVG ~3.4 kB), Oscar Gruss wordmark = node 414:2726 (72x39.53, SVG ~11.9 kB); export with `node.exportAsync({format:'SVG_STRING'})` (not inlined here).

## GAPS (not defined in Figma for this area - to be extended)

- Nav: hover, pressed, keyboard-focus ring, disabled; tooltips on collapsed (icon-only) items; collapse/expand animation and which of 72/191/219 is the default; whether "Nav open" (191, no sub-list) is a real state; behaviour when selecting a sub-item (Figma keeps Open Deals selected and "All Deals" active on every page regardless of route); which sub-item is active for non-deal pages; section expand/collapse animation; scroll when nav content > 1032; nav bottom area/footer (everything below y~520 is empty); Closed Deals/History/Reports sub-menus; label text conflict "Risk Arbitrage" vs "Risk Arb DB".
- Pull-tab (Group 212/215): hover/focus; tooltip; position relative to nav on screens (only shown as standalone groups, not placed on screens).
- Top bar / search: hover, clear button, loading, minimum characters, debounce, no-results state, keyboard navigation (arrows/enter/esc), highlighting of the active result is a single mock row, focus ring other than the 1px teal border, dismiss on outside click, how dropdown aligns when viewport < 1920; placeholder at narrower widths (field is fixed 840).
- Search results: empty/zero results, loading skeleton, more than 3 rows per section (scroll vs. cap), pagination/"view all", filter selects open/selected/applied states (Page/Author/Date popovers - only the Date range picker exists, outside Section 1 at 2241:8396), result click target, mouse hover vs keyboard highlight distinction, section ordering rules, icon for other result types.
- Avatar: no menu (profile / sign-out / settings), no hover, no focus, no image variant, initials rule (SG), notifications badge.
- Tabs: hover, pressed, focus ring, close-button hover, tab overflow (more than fits in 1784px: no scroll/chevrons/menu drawn), drag-reorder, max tabs, truncation/ellipsis of long deal names, tooltip, unsaved dot, "+ new tab" affordance, active-tab text colour/stroke thickness inconsistencies (teal Medium 3px vs black 2px, padding 24 vs 16), whether Dashboard/Events Calendar can be closed (no: no chip), new tab insertion position.
- Layout: responsive behaviour (<1920), nav width effect on content width (content always starts at x=88 for all three nav sizes in Figma; expanded nav overlap/push not shown), scrim click-through, z-index, the 48px right/bottom gutters when scrolling long pages (Deal frame is 2638 tall but nav stays 1032).
- Motion: no prototype/animation data was read.

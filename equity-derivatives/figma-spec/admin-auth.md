# Admin + Auth screens - Figma harvest (Equity Derivatives Auction)

File vtP9aj7XLJ292TjETXmrum, page "final" 48:1021, SECTION 1033:172. All frames 1440x1024. Read-only extraction via Plugin API (exact numbers). Variable names are the bound Figma variables (Collection 1). "(visual estimate)" = read from a screenshot only. All coordinates are relative to the parent frame unless stated. Auto-layout containers in these frames are mostly NOT used for content positioning (children are absolute inside Groups), so "padding" below is derived from geometry where stated.

Font everywhere: **Lato Regular**, line height AUTO, letter spacing 0. Sizes used: 12 (form labels), 14 (everything else), 16, 18 (modal titles), 20 (page title/"Statics" in new shell).

## 0. Frame / node index

| Screen | Frame id | Notes |
|---|---|---|
| Log In | 131:720 | card 131:721 |
| Clients (list) | 282:2059 | shell + Frame 14 282:2078 |
| External Traders (LIST) | 282:1709 | table Frame 14 138:339 |
| External Traders (MODALS) | 282:2180 | NOT a second list: it is the New External Trader + Edit External Trader modal pair over a blurred copy of the list. Overlay 138:498, modals 138:499 / 282:2309 |
| Internal User (MODALS) | 282:2349 | New Internal User + Edit Internal User modal pair; overlay 282:2441, modals 282:2442 / 282:2467 |
| New Client | 170:729 | overlay 170:809, modal 170:810 |
| Edit Client | 282:2538 | overlay 282:2619, modal 282:2620 |

IMPORTANT structural finding: there is **no Internal Users list frame, no Edit Internal User list, no Users list** on page "final". The "Internal Users" tab exists only as a tab label. (Page "drafts" has older "Statics / Users" and "User (New & Edit)" frames at the old 80px-sidebar scale - not final, not harvested.)

Components (live on page "drafts", used as instances): `button` set 134:904 (variants "Property 1=Default" 4:156, "Variant3" 261:1922, "disabled" 134:905), `text input` 76:274, `search` 134:218, `check` set 85:128 (unchecked 85:127 / checked 85:129).

## 1. Shared primitives (exact)

### 1.1 Button (instance of `button`)
- Height 32, auto-layout H, gap 10, padding T/R/B/L = 6/32/6/32, main+cross CENTER, radius 4, no stroke, no effect. Width HUG = text + 64 (Add New 122, Cancel 106, Save Changes 149, Log In 235 stretched).
- Label Lato 14, colour `bg` #18181C on every enabled button.
- Main component "Default" has NO fill: fill is set per instance:
  - Primary action "Add New" (toolbar), "Save Changes": `blue-green` #71E7FF
  - "Cancel" in modals: `white` #F8F7FF
  - "Log In": `blue` #7590FF
- Disabled variant (134:905): fill `grey medium` #5B5D72, label `grey light` #9597AD (used for modal "Add New" while form empty).
- Variant3 (261:1922) = same geometry, no fill (unused in my screens).
- Anomaly: in Internal User modals the Cancel button is 40 tall (padding 6 but height 40, label y 11.5) and Add New / Save Changes are 32 tall, offset to y361 (Cancel y353) - see sec. 6.

### 1.2 Text input (instance of `text input`, 76:274)
235x32 default, fill `grey dark` #373746, no stroke, radius 4, auto-layout H gap 12, padding 10/12/10/12, cross CENTER. Text Lato 14: placeholder `grey medium` #5B5D72; filled value `white` #F8F7FF. No border in any state drawn (no focus/error).

### 1.3 Search field (instance of `search`, 134:218)
235x32 (modals: 184 or 235), fill `grey dark`, radius 4, auto-layout H gap 8, padding 10/12/10/12. Icon `lucide/search` 16x16 frame, vector 12x12 at (2,2), stroke 1.5 `blue` #7590FF (in the New Client inner-panel search the icon stroke is `grey medium` #5B5D72 = "disabled look"; in Edit Client it is `blue`). Placeholder "Search" Lato 14 `grey medium`; typed/selected value (e.g. "DEFGHI") `white`. The same component is used as the Client picker ("Client", "Client Name") with the search icon.

### 1.4 Checkbox (`check`)
16x16, radius 2, auto-layout (padding 0). Unchecked: fill `grey dark` #373746, glyph hidden/none (lucide/check frame contains a 10x6.88 vector, not visible in the render). Checked: fill `blue` #7590FF, check vector 8x6 at (4,5), stroke `grey dark` #373746 weight 2.

### 1.5 Toggle switch (drawn manually, Group 103/101)
Track 32x16, radius 12 (clamps to full pill), knob ellipse 12x12 fill `white` #F8F7FF with DROP_SHADOW #1D3C31 @60%, offset (-1,1), blur 3, spread 0; knob inset 2px from track edge. Group is rotated -180 (mirror), so reading in screen space: off = knob at LEFT, on = knob at RIGHT.
- Off ("Inactive"): track `grey light` #9597AD; label "Inactive" Lato 14 `grey light`.
- On ("Active"): track `green` #3FF3C0; label "Active" Lato 14 `white`.
Label is 12 px right of the track (track x24..56, label x68). Whole row 17 tall.

### 1.6 Status "check" badge (table Active column)
16x16 circle (frame radius 16), fill `green` #3FF3C0, centred `lucide/check` 16x16 (vector 8x5.5 at (4,5.25), stroke `grey dark` #373746 weight 1.5 - taken from the legacy New Client background, same component). Inactive row = empty cell (nothing drawn).

### 1.7 Row action icons (24x24 frames, stroke-only vectors, weight 1.5)
- `lucide/rotate-ccw-key` (reset password / key): vector 18x18 at (3,3), stroke `blue` #7590FF.
- `lucide/square-pen` (edit): vector 16x16 at (4,4), stroke `orange` #FF982A.
- Gap between the two frames = 24 (key x1208, pen x1256). No delete icon exists.

## 2. LOG IN (131:720)

- Page: 1440x1024 fill `bg` #18181C, clip. No sidebar/header.
- Card 131:721 "Frame 22": 312x416 at (564,304) = exactly centred (1440-312)/2 = 564, (1024-416)/2 = 304. Fill `bg medium` #22222C, radius **12**, no stroke, no effect, clip. Auto-layout V, gap 56, padding T/R/B/L 40/48/40/48, main MIN, cross CENTER (but the form block is absolutely positioned, see below).
- Logo: Path 1852 vector 70x56 at (121,40) (centred: 121+35 = 156 = 312/2), fill `blue transparent 60` = #7590FF @ 60% opacity. Top 40 from card top.
- Form (card coords): 
  - Username field "text input" instance 131:725: x38.5 y152, 235x32, fill `grey dark`, radius 4, text "mshepley" `white` Lato 14 at x12.
  - Password field 131:727 (frame, auto-layout H, space-between, padding 10/12/10/12, radius 4, fill `grey dark`): x38 y233.5, 236x32. Contents: 10 dots (ellipse 6x6, fill `grey light` #9597AD, pitch 12 = gap 6, first at x12) and eye icon vector 18x12.43 at x206 (right edge 224 = 12 from field right), fill `blue` #7590FF.
  - Gap between username bottom (184) and password top (233.5) = 49.5 (room for error text, not drawn).
  - "Forgot Password?" text Lato 14, `blue` #7590FF, UNDERLINE, right-aligned to the field right edge (x165..274), y285 (20 below the password field bottom 265.5).
  - Button "Log In": instance of `button` Default, x39 y344, 235x32, fill `blue` #7590FF, label "Log In" `bg` #18181C Lato 14 centred. 
  - Distances: logo bottom 96 -> username 152 (56); button bottom 376 -> card bottom 416 (40).
- Horizontal content box visually 38..274 (236 wide; i.e. card side inset 38 px, not the declared 48 padding). Fields are 236 (password) / 235 (username, button) wide.
- No field labels, no error variant, no "remember me", no sign-up. Placeholder state for empty login not drawn.

## 3. LIST SCREENS - shell (note for the shell harvester: consistency)

Clients 282:2059, External Traders 282:1709 and the background copy inside the modal frames share the **same shell (64px sidebar)**:
- Sidebar "Frame 1" 64x1024 at (0,0), fill `bg lighter` #2D2E3B, radius TL0/TR24/BR0/BL0, clip. Logo Path 1852 40x32 at (12,20), `blue transparent 60`. Bank icon (BOOLEAN Union) 24x24 at (20,92) fill `grey light`; documents icon 24x24 at (20,148) fill `white` (active); user avatar group 32x32 at (16,960) fill `grey light`.
- Title "Equity Derivatives Auction": Lato 20, `blue` #7590FF at (80,24), 235x24.
- Divider Line 6: 1336 wide at x80..1416, y61, stroke `grey dark` #373746 1px.
- Section title "Statics": Lato 16, `white` at (80,82), 64x19.
- Main card Frame 14: (80,116) 1336x892, fill `bg medium` #22222C, radius 8, clip.
  - Tab strip: top 40px (y0..40), divider Line 7 at y39, x0..1312 stroke `grey dark` 1px.
  - Frame 23 content area at y40, 1336x852, fill `bg lighter` #2D2E3B.
  - Table container "Frame 3" at (12,56) in Frame 23, 1312x796, fill `bg medium`, radius TL8/TR8/BR0/BL0, clip.
  - Toolbar in Frame 23: search instance at (16,12) 235x32; "Add New" button at (1202,12) 122x32 (right edge 1324 = 12 from right). Toolbar-to-table gap 12.

**Shell consistency: NOT identical across my frames.**
- List screens + the External Trader / Internal User modal frames: 64px sidebar, title 20px, tabs 40px tall, 14px table type.
- New Client (170:729) and Edit Client (282:2538) backgrounds use a LEGACY larger shell: sidebar 80x1024 at y-8 (logo 40x32 at (20,20), icons at x28), title Lato **24** at (104,16), "Statics" Lato **20** at (104,81), divider y57, Frame 14 at (104,117) 1312x875, tab strip 48px with tab labels Lato **18** ("Clients" tab 167 wide unselected, "Users" tab 160 wide selected), table header text 16 / row text 16, "Add New" 122x**40**. This is a stale background only; the modal on top is the spec.

### 3.1 Tabs (Frame 14 children)
Each tab 40 tall, auto-layout H, padding 12/56/12/56, gap 10, cross+main CENTER, text Lato 14.
- Order & widths (in the 64px shell): Clients 160 (x0), External Traders 211 (x160), Internal Users 198 (x371). Widths = text + 112 (Clients is 160 = fixed/min; 43+112 would be 155).
- Selected: fill `blue transparent 15` #383D58, INSIDE bottom stroke 1px `blue` #7590FF (sides 0), text `blue`, no radius.
- Unselected: no fill, radius TL6/TR6, text `grey light` #9597AD.
- In 282:1709 the "Internal Users" tab frame sits at y-1 (1px higher than the others) - Figma inconsistency visible in the screenshot.

### 3.2 Table skeleton (both lists)
- Header row 0..41: titles Lato 14 `grey medium` #5B5D72, text y12 (h17, vertically centred), bottom border at y41. Row pitch 41 (40 + 1px border). Row separators at y82/123/164/205 (and 41), Lines 1px stroke `grey dark` #373746, full width 1312. Vertical column dividers: 1px `grey dark`, full height of the table (796), no outer border.
- Body text Lato 14 `white` #F8F7FF, text y = row top +11 (53, 94, 135, 176) - row has no padding set (absolute).
- Only 4 data rows drawn; remaining height is blank with column lines still running to the bottom (that is the "empty rows" look). No header sort arrows, no checkbox column, no pagination, no filter, no hover/selected rows, no zebra.
- Whole table rows are text-only; links are underlined text.

### 3.3 Clients table (282:2059 -> 282:2079 -> 282:2080)
Column dividers (x in table): 188, 869, 1088, 1176 -> widths **188 / 681 / 219 / 88 / 136** (sum 1312).
| Column | header text x (w) | body |
|---|---|---|
| Makor X ID | 51 (71) | "001".."004" white, UNDERLINE, x74 (w25) - centre 86.5 |
| Client Name | 490 (77) | "ABC Holdings" white, x240 (w86), left-ish: 52px right of the column's left edge (header is centred at 528.5, body is not) |
| Users | 957 (35) | counts 4 / 20 / 13 / 2, `blue` #7590FF, UNDERLINE, centred x974.5 |
| Active | 1112 (40) | green check badge 16x16 at x1124 (centre 1132 = col centre) rows 1 and 3; rows 2, 4 empty |
| Actions | 1220 (47) | key at x1208, pen at x1256 (centre 1244 = col centre) |
Header text centres: ID 86.5, Name 528.5, Users 974.5, Active 1132, Actions 1243.5 (centred in column except the first two columns' ~7.5 offset in col 1 and col 3 ~4px left of the divider midpoint).

### 3.4 External Traders table (282:1709 -> 138:339 -> 138:341)
Dividers: 188, 391, 591, 869, 1088, 1176 -> widths **188 / 203 / 200 / 278 / 219 / 88 / 136**.
Headers (x): First Name 51, Last Name 257, Username 460, Email Address 687, Client 957, Active 1112, Actions 1220. All body cells white, no underline, centred in their column: ABC (x71), XYZ (x276), abc_xyz (x467), abc_xyz@gmail.com (x669), DEFGHI (x949). Active badge x1124 rows 1/3, actions x1208/x1256. Same row geometry/toolbar/"Add New" as Clients. Tab: External Traders selected.

## 4. MODAL ANATOMY (all four admin modals share it)
- Overlay (per frame): rectangle-frame fill `bg` #18181C @ **50%** opacity + BACKGROUND_BLUR radius 12 (Figma value; CSS equivalent about blur(6px) - inference). Positions: list-modal frames overlay x64,y1, 1376x1022 (the sidebar stays un-blurred; header and table behind are blurred); New/Edit Client overlay x80,y2, 1360x1022.
- Modal surface: fill `bg lighter` #2D2E3B, radius **8**, clip, no stroke, **no drop shadow**.
- Header: title Lato **18** `white` #F8F7FF, centred horizontally (text box centred in modal width), y16 (h22). Divider "Line 7": full modal width, y54, stroke `grey medium` #5B5D72 1px (NOT grey dark). Header height 54 (+1 line).
- Body padding 24 left/right/bottom. First label row at y78 (24 below the divider).
- Field blocks: label Lato **12** `grey light` #9597AD (h14) at block top, input 32 tall at +22 (label->input gap 8). Block height 54; rows pitch 78 (24 gap between blocks).
- Footer: buttons at left edge x24 (Cancel) and right-aligned to x = width-24 (primary), top = last content bottom + 24, 32 tall; modal bottom = button bottom + 24.
- Modal shows no close X, no Esc hint, no helper/validation text.

## 5. EXTERNAL TRADER modals (282:2180 -> overlay 138:498)
Two modals side by side in one frame (the user's "two frames with same name" = 282:1709 list vs 282:2180 modals).
Modal size **448 x 409**. Left modal at overlay (208,302) -> page x272, y303; right modal at (720,302) -> page x784.
Layout (modal coords): two columns 184 wide, x24 and x240 (column gap 32); full-width rows 400.
| Row | y label / y input | left | right |
|---|---|---|---|
| 1 | 78 / 100 | Username | Client (search-style picker with icon) |
| 2 | 156 / 178 | First Name | Last Name |
| 3 | 234 / 256 | Email Address (400 wide) | - |
| 4 | toggle y312 (17 tall) | switch | - |
| 5 | buttons y353 (32 tall) | Cancel x24 (106w) | primary right edge 424 |
Bottom = 353+32+24 = 409.

**New External Trader** (138:499): title "New External Trader" (161x22 at x143); all inputs in placeholder state (`grey medium`): "Username", "Client" (search icon), "First Name", "Last Name", "exampple@email.com" (sic - typo "exampple" in Figma, placeholder text); toggle off "Inactive"; primary = **disabled** "Add New" (122w at x302, fill `grey medium`, label `grey light`); Cancel white.
**Edit External Trader** (282:2309): title "Edit External Trader" (155x22 at x146); values filled `white`: abc_xyz, DEFGHI (in the search-style Client field), ABC, XYZ, abc_xyz@gmail.com; toggle on "Active"; primary "Save Changes" (149w at x275, fill `blue-green`); Cancel white. Only differences New vs Edit: title, input values (placeholder vs filled), toggle state/colours/label, primary button variant/label/width.

## 6. INTERNAL USER modals (282:2349 -> overlay 282:2441)
Same as sec. 5 except:
- Row 1 right column holds the **Admin** checkbox (not a Client field): `check` instance 16x16 at (240,108) (vertically centred on the 32px input 100..132), label "Admin" Lato 14 at x268 (checkbox + 12): `grey light` when unchecked (New), `white` when checked (Edit; checkbox checked fill `blue`).
- Titles: "New Internal User" (144x22 at x151), "Edit Internal User" (138x22 at x154).
- Modal height **417** (not 409): Cancel is 40 tall at y353; primary (Add New 122w x302 / Save Changes 149w x275) is 32 tall at y361 (8 lower) - looks like a Figma slip (button heights misaligned); bottom = 353+40+24.
- Fields: Username, First Name, Last Name, Email Address; no Client field.
- Background copy behind the modals is the External Traders list (tab "External Traders" highlighted), not an Internal Users list.

## 7. CLIENT modals (New 170:729 / Edit 282:2538)
Modal "new auction modal" **720 x 584**, at overlay (320,219) (page x400,y221). Header 54 + divider as sec. 4; title "New Client" (88x22 at x315) / "Edit Client" (82x22 at x318).
Layout (modal coords):
- "Client Name" label 12px `grey light` at (24,78); search-style input (235x32, with search icon, placeholder "Client Name") at (24,100) - **is not an editable value in Edit Client either (shows placeholder "Client Name")**.
- "Makor X ID" label Lato **14** `grey light` at (291,78); value Lato 14 `white` at (291,105): "-" in New, "002" in Edit.
- Inner panel "Frame 3": (26,144) 670x319, fill `bg medium` #22222C, radius 8, clip. Panel header: "Client User List" Lato 14 `grey light` at (16,16); search 235x32 at (427,8). 
  - Table: top border y48; header row 48..81 (33 tall), header text Lato 14 `grey medium` at y56; header bottom border y81; row pitch **33** (rows separators at y114, 147, 180, 213, 246); all borders 1px `grey dark`.
  - Columns: dividers at x40, 154.83, 277.83, 420.83 -> checkbox col 40 (header blank) / Username 114.83 / First Name 123 / Last Name 143 / Email 249.17 (to 670). Column lines run y48..319.
  - Header text x: Username 61.66, First Name 183, Last Name 316, Email Address 505 (New) vs **481 (Edit)** (24px difference between the two frames).
  - Edit rows (5): checkbox at x12 (16x16, y = row top+8), cells Lato 14 `white` at row top +8: username x70.34, first name x199, last name x334, email x463. Rows 1, 3, 5... check state: rows 1,3,5 unchecked, rows 2,4 checked (see screenshot: row1 unchecked, 2 checked, 3 unchecked, 4 checked, 5 unchecked); rows 3 and 5 have EMPTY username cell.
  - Scrollbar (Edit only): Group 104 at (658,89) 4x218: track radius 12 fill `grey dark` #373746; thumb 4x75 at the top, fill `grey medium` #5B5D72, radius 12 (8px inset from panel right edge, shown from row-1 top).
- Toggle row at (24,487), switch+label as 1.5. Buttons y528 (Cancel 106w at x24; primary right edge x696): Bottom = 528+32+24 = 584.

**New vs Edit Client differences (exact):** title; Makor X ID "-" vs "002"; panel search icon stroke `grey medium` vs `blue`; panel has no rows (empty table body, 5 header lines only) vs 5 rows with checkboxes + scrollbar + extra row lines; "Email Address" header x505 vs x481; toggle Inactive/off (track `grey light`, label `grey light`) vs Active/on (track `green`, label `white`); primary "Add New" **disabled** (122w, x574, `grey medium`/`grey light`) vs "Save Changes" (149w, x547, `blue-green`). Everything else identical (sizes, positions, panel).

## 8. Differences between the two "External Traders" frames
- 282:1709 = list (tab External Traders selected, table + toolbar, no overlay).
- 282:2180 = the same list greyed under overlay (Group 115 984 tall copy: title/Statics/divider/Frame14 in the "Group 115") plus the New/Edit External Trader modals. Not two list variants.

## 9. Text style roll-up (all Lato Regular, LH auto, LS 0)
- 12 / `grey light`: form field labels in modals (Username, Client, First Name, Last Name, Email Address, Client Name).
- 14 / `grey medium`: table header cells, placeholders, search placeholder.
- 14 / `white`: table body, input values, toggle label (Active), Makor X ID values.
- 14 / `grey light`: toggle label (Inactive), checkbox label (unchecked), Makor X ID label, "Client User List", tab (unselected).
- 14 / `blue` (+ UNDERLINE): user-count links, Forgot Password?; selected tab.
- 14 / `bg` #18181C: button labels (all enabled), 14 / `grey light`: disabled button label.
- 16 white: "Statics"; 18 white centred: modal titles; 20 `blue`: "Equity Derivatives Auction" (64px shell).

## GAPS (searched for, not drawn in "final")
- Log In: error state (wrong password / inline error text under field), focus state, loading, empty-field state, "Forgot Password" flow screens, password-visible state (eye toggled). Searched all text on page for error/invalid/incorrect/required: none.
- Lists: Internal Users list, hover rows, selected rows, row focus, sort indicators, pagination, filters beyond search, bulk-select checkbox column in list tables, delete icon/confirmation modal, "reset password" confirmation/modal, empty table state ("no results"), loading/skeleton, search-with-results state. Searched for delete/remove/are you sure/confirm/page/filter/reset/key: only "Confirm" belongs to an auction frame.
- Forms: focus ring, hover, error/validation, helper text, required markers, disabled input (only disabled button exists), Client dropdown open list (the Client field is a search-styled input; dropdown options not drawn), close "X", Esc. Admin checkbox hover. Client-modal: no new-user row add/remove, no empty-list message ("No users" is a blank body).
- Toggle disabled, checkbox disabled/indeterminate.
- Button: hover/pressed/focus; Variant3 purpose unknown (no fill).
- Elevation: no drop shadows on cards/modals (only toggle knob has one); no stroke on modals/inputs/cards except 1px dividers.

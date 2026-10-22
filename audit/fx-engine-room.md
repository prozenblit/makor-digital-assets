# FX Engine Room design system - audit vs Figma

Figma file: yuJA7DtjFKnqTZQcu2vKYN (Page 1). Ours: `fx-engine-room/design-system/`.
Method: Figma truth read with read-only `use_figma` dumps of the file's own **"Assets" section (node 4398:15026), which is a real component library** (Search, Input, Dropdown, Date, Time, Password, Chips, Radio, Checkbox, Switch, Tabs, Edit, Trash, 7 button families, status), plus the real screens (Trading Account 3657:4471, Log In Error 2211:1835, New Trading Account modal 5536:14786, Add Permissions modal 5580:14451, Entities 3648:7418, Trade Blotter 2281:1414). Ours measured with computed styles in the live showcase (tab "tab-3", viewport 1024x768, DPR 1.5, so "1px" borders report as 0.667px; this is a DPR artefact, not a bug).

## Summary

| Metric | Value |
|---|---|
| Showcase sections reviewed | 19 (3 foundation + 16 component/pattern) |
| MATCH | 0 |
| WRONG | 17 |
| INVENTED (not in Figma) | 2 (Cards, Toast) |
| MISSING in ours (Figma patterns/components with no counterpart) | 25+ (list below) |
| **Score** | **6 / 100** |

Why 6 and not 0: the concepts line up (dark mode, a white "Cancel" button, outlined + filled primary buttons, master/detail layout, a left icon rail, section grouping, 14px body text) and several semantic roles are right (labels above inputs, "Forgot Password?" on login, grey Cancel/purple Save pairing). But zero components match in font, colour, size or radius. An AI agent following our system would produce something that is visibly a different product.

**Root cause: the foundation was invented, not extracted.** Figma is a neutral-grey + periwinkle system (#000 / #171719 / #242428 / #39393C greys, primary #A4A4FF, Nunito). Ours is a navy/indigo system (#0F0F1E / #1A1B2E / #252740, brand #8080CC, Inter). Every derived value is therefore wrong.

---

## Foundation mismatches (proved)

| Thing | Figma (read) | Ours (CLAUDE.md / measured) |
|---|---|---|
| Font family | **Nunito** everywhere (Regular 12/14/16/20, Medium 12/14/16/18/20/24, SemiBold 12/14/18). Inter only for 10px bits. | **Inter** (+ JetBrains Mono for codes). Showcase body measured `Inter`. Nunito is never loaded. JetBrains Mono does not appear in any Figma text I read (currency codes are Nunito Regular 14). |
| Primary | **#A4A4FF** (Primary purple), button text **#000000** | #8080CC, button text #FFFFFF |
| Purple secondary | #7373BB (section labels, inactive product names, sub-heads), #39394E (hover/selected fill) | none (#6B6BB8 hover invented) |
| Teal | **#30F0D6** (New/Add button, Add Permissions, active chips), #00FEA9 (outlined green button), #264342/#1B5244 tints | #7AEFEF |
| Orange | **#FF9747** ("Edit", "+" add button, tooltips text); #FD7557 (Review chip); #FEE274 yellow (Group chip) | amber #F59E0B for "+" and Group badge |
| Red | **#FF7272** (delete icon, error border, error text); #FD7557 | #EF4444 |
| Green | **#2BDF68** (Active switch, live dot) | #4DCC9B (dot), teal for toggles |
| Blue | **#60A8FF** (breadcrumb link, Give-Up chip), tint #2A313D | none |
| Page / shell bg | **#000000** (top bar, login page, content wrapper) | #0F0F1E |
| Content panel bg | **#171719** (BG Grey 1), footer #171719 | #1A1B2E |
| Raised / modal / card bg | **#242428** (Modal BG) | #1E2035 |
| Input / group header / sidebar bg | **#39393C** (inputs on dark panel use #39393C; on #242428 cards inputs use #242428 or #39393C) | #252740 (input), #101020 (sidebar) |
| Selected item | **#39394E** | #252740 |
| Border / divider | **#39393C**, 1px | #2A2A42 / #1E1E32 |
| Text | primary #FFFFFF, light grey #BABEC7, label/secondary #707079 | #EEEEF8 / #8A8AAA / #5A5A78 |
| Disabled | fill #707079, text #BABEC7 | opacity 0.45 or #disabled tokens |
| Control height | **32px** (buttons, inputs, dropdowns), 24px (chips/badges), 56px top bar, 46px footer, 62px list row, 45px group header | 36px controls, 42px login btn, 44px list row, 36px footer, 48px sidebar |
| Radius | **2** (dominant: badges, checkbox, filter chips), **3** (outlined/dropdown buttons), **4** (buttons, inputs, cards), **8** (filter popup), **12** (modals, login card, chips pill, switch track), 16 (shell top-left corner) | 6 (buttons/inputs), 8 (cards), 12, 4 (badges) |
| Button padding | 11px 24px, gap 10 (outlined/chip: 11/20 or 11/16, gap 8/4) | 0 16px |
| Focus ring / glow | **Not present in Figma** (not verifiable either way) | 3px brand glow, red error glow (invented) |
| Shadows | popups only: drop shadow #000 @50% (-2,2) blur 4 spread 1 (filter popup), (-2,2) b4 (tooltip), (0,-4) b4 @25% (list footer). **No card/login/modal shadow found.** | 4 shadow tiers incl. login 0 8 48 .6 |
| Gradients | none | none (ok) |
| Interaction states | hover = white overlay on fill (teal +40% white, purple +30%, dark chip +20%), outlined hover = tinted fill (#39394E / #392C2D / #3A3730 / #2A313D / #1B5244); disabled = grey #707079 fill | hover = opacity .88 / darker brand; disabled = opacity .45; `:active scale(.98)` (not in Figma) |

Figma variable palette cross-check: all Figma usage fingerprints (radius 2 dominant, Nunito Medium 12 dominant) agree with the above. Our tokens contain **none** of the Figma hex values.

---

## Component-by-component

Legend: W = WRONG, INV = invented (NOT IN FIGMA), M = match.

| # | Component (showcase section) | Figma spec (read) | Ours (measured) | Verdict | Fixes needed |
|---|---|---|---|---|---|
| 1 | **Colors** | See foundation table. Variables: Primary purple #A4A4FF, Primary text #FFF, Separators/menu/inputs-on-modal #39393C, Secondary text #707079, Light grey text #BABEC7, BG #000, BG Grey 1 #171719, Modal BG #242428, Cancel #E6E6E6, Edit #FF9747, Active #2BDF68, Add New #30F0D6, delete #FF7272 | Brand #8080CC, teal #7AEFEF, amber #F59E0B, navy surfaces, #2A2A42 border, #EEEEF8 text, swatches for brand-ghost/dim/border, teal-ghost, amber-ghost | **W** (no hex matches) | Replace all tokens with the Figma Primitives/Variables set (13 semantic + dark tints). Drop ghost/dim/border alpha tints; add #39394E, #392C2D, #2A313D, #3A3730, #264342, #5A3834, #1B5244, #E6E6E6, #60A8FF, #FEE274, #FD7557, #00FEA9. |
| 2 | **Typography** | Nunito. Scale actually used: 12 (labels, chips, small text), 14 (body, buttons, inputs, tabs), 16 (list rows, product/limit), 18 (section heads, breadcrumb, modal titles, group headers), 20 (screen/top-bar title, detail title), 24 (entity title). Weights: Regular 400 (inputs, labels, product), Medium 500 (list, nav, breadcrumb, switch text), SemiBold 600 (buttons, chips, group headers, trader names) | Inter 14/1.5 body, scale 10/12/14/15/16/18/22/28/40; weights 400-700; JetBrains Mono for codes; uppercase 12px/600 labels | **W** | Switch family to Nunito (load 400/500/600 from Google Fonts). Replace scale with 12/14/16/18/20/24. Remove mono and uppercase+letter-spacing rules (Figma has none: letterSpacing 0 on all text read). |
| 3 | **Spacing & Sizing** | Control 32, chip 24, top bar 56 (+49 breadcrumb strip), sidebar 56, footer 46, list row 62, group header 45, modal header 61, modal padding 32, panel padding 24, field pair gap (label 12 above field), gaps 8/10/12/16/24/32. Radii 2/3/4/8/12/16 | 4-point scale up to 40, controls 36/42/44/36/48 | **W** | Rebuild spacing/height tokens from Figma values above; radius tokens 2/3/4/8/12/16. |
| 4 | **Buttons** | Component families (all 92x32 unless noted, Nunito SemiBold 14, padding 11/24, gap 10): **New/Add** fill #30F0D6, text #000, r4; hover +white 40%; disabled #707079/#BABEC7. **Cancel** fill #E6E6E6, text #000, r4 (disabled = +white 30%). **Purple (primary)** fill #A4A4FF, text #000, r4; hover +white 30%. **Outlined purple** 1px inside #A4A4FF, text #A4A4FF, r3; hover fill #39394E. **With dropdown ("New Trade")** teal, 132x32, text + 10x5 chevron stroke 1.3, r3-4. **Button transparent** fill #39394E, text #A4A4FF, r3, hover +20% white + 1px #A4A4FF stroke. **Button transparent 2 / outlined green** 1px #00FEA9, text #00FEA9, r3; hover fill #1B5244. Disabled outline = 1px #707079 / #BABEC7 text. Icon buttons: **Edit** 32x32 pencil 20px #FF9747 (hover #FFBF8E), **Trash** 32x32 icon #FF7272 (hover +30% white). **"+" add** 32x24 fill #FF9747 r4 with black 12px plus vector. Toolbar buttons on blotter (screenshot): Group (outlined purple), Amend (orange fill), Allocate (#39394E), Give-Up (green outline), Delete (red fill). | `.btn` 36h, pad 0 16, r6, Inter 14/600. brand fill #8080CC text #fff; teal #7AEFEF text #000; teal-outline 1.33px; white Close text #0F0F1E; save outline rgba(255,255,255,.6); dark #1E2035+border; danger outline #EF4444; add 28x28 #F59E0B Arial "+"; sm 28h/13px; lg 42h/15px (full width); btn-link 14/500 lavender; btn-icon 32x32 grey; loading spinner; hover opacity/darken; disabled opacity .45 | **W** | Height 36 -> 32, radius 6 -> 4 (3 for outlined/dropdown), padding 11/24, font Nunito; recolor every variant to Figma hexes; **primary button text is black not white**; hover = white overlay per Figma; disabled = #707079 fill/#BABEC7 text; add "Purple", "transparent dark", "outlined green", "with dropdown" variants; rebuild "+" as 32x24 #FF9747; add Edit/Trash icon buttons (#FF9747/#FF7272). Remove: btn-lg 42px (Figma Log In is 216x32 standard), btn-sm 28px, loading spinner, danger-outline (not in Figma), `:active scale`, btn-link as designed. |
| 5 | **Inputs & Select** | Field 32h, fill #39393C (on #242428 containers #242428), **no border**, r4, padding 8/12/8/8, gap 8, Nunito Regular 14, value #FFF, placeholder #707079. Label **above**, Nunito Regular 12 #707079, 12px stacked offset (label y0, field y12; total 44). Error: 1px inside #FF7272 + 12px #FF7272 message beneath (total 56). Dropdown: solid triangle polygon 12x8 #A4A4FF right (pad-right 12). Search: 16px magnifier #A4A4FF left, placeholder #707079. Date: 16px calendar #A4A4FF right. Time: clock icon #A4A4FF. Password: 10 dots 6px #BABEC7 + eye icon 18x12 #A4A4FF (eye-off 18x18 when visible). Text area (currencies): #39393C r4 pad 12/8 Nunito 14 | `.field-input` 36h, bg #252740, 1px #2A2A42 border, r6, pad 0 12, Inter 14; label 12/600 #8A8AAA letter-spacing .36 (stacked 18h); error border #EF4444 + 3px glow + message #EF4444; native select with chevron; prefix icon 14px #5A5A78; `.field-toggle` eye | **W** | Height 32, no border, bg #39393C (or #242428 in cards), r4, label 12/400 #707079 directly above (12px offset), error colour #FF7272 w/o glow, triangle caret #A4A4FF 12x8, icons #A4A4FF 16px. Add Date, Time, Search (with/without label), Password (dots, show/hide), Dropdown-with-label, textarea variants. Focus state: not in Figma, unverifiable - drop or flag as proposal. |
| 6 | **Toggles & Radios** | **Switch**: 32x16 track r12, ON #2BDF68, OFF #BABEC7, thumb 12px white ellipse at 2px inset with drop shadow (-1,1,b3, #005F20@50% on / #515151@50% off), no border; **Switch with text**: label right, gap 8, Nunito Medium 14, "Active" white / "Not Active" #BABEC7. **Radio**: 16px circle 1px inside-stroke #A4A4FF (both states), selected adds 8px dot #A4A4FF centred; label Nunito Medium 14 white. | Toggle 36x20 r999, off #1E2035+border #2A2A42, on #7AEFEF, thumb 14px (off #5A5A78, on black); label 14/400 (off #8A8AAA); radio 16px 1.33px border teal #7AEFEF, dot 8px teal; label 14/400 | **W** | Toggle 36x20 -> 32x16, green #2BDF68 on / #BABEC7 off, thumb 12 white + shadow; labels Medium 500; radio colour teal -> #A4A4FF; radio label weight 500; label colours #FFF/#BABEC7. |
| 7 | **Checkboxes** | 16x16 r2; unchecked fill #39393C (no border); checked fill #A4A4FF with black 12x9 tick; label Nunito Regular 14, white (checked) / #BABEC7 (unchecked), gap 8. Also an **indeterminate "select all"** (minus line 10px black on #A4A4FF) with "(5)" count Medium 12 #A4A4FF, and a filter-list use at 12px Medium | `.cb-box` 16x16 r4 transparent, 1px #2A2A42; checked #7AEFEF fill/border; label 14/400 (#8A8AAA unchecked) | **W** | r4 -> r2; unchecked fill #39393C no border; checked #A4A4FF + black tick; label colours; add indeterminate. |
| 8 | **Tag Input (chips)** | Container 32h min, fill #39393C r4, pad 4/8, gap 4 (multi-row variant grows, pad 8/8); chip 24h fill #242428 **pill r12**, pad 4/8, gap 8, text Nunito Regular 14 white, close "X" 16px frame (11.6px glyph) #BABEC7; trailing typed text "012345 |" Regular 14 white; label above 12px #707079 | `.tag-input-wrap` 36h #252740 r6 border; chip 22h #1E2035 r4 border, 12px text, "x" glyph Arial #5A5A78 | **W** | Bg #39393C, no border, r4; chip #242428 r12 24h, 14px text, X icon #BABEC7; multi-row variant. |
| 9 | **Badges** | There are **no passive status badges** in Figma. The 24h pill-like controls are interactive chips (Nunito SemiBold 12): **Group** outlined #FEE274 r2 (74x24, pad 11/20; hover fill #3A3730); **Review (12)** outlined #FD7557 r2 (100x24, pad 11/16, gap 4; hover #392C2D; active #5A3834; disabled #707079/#BABEC7); **Give-Up** outlined #60A8FF r2 (86x24; hover #2A313D); **Status** fill #39394E r3 text #A4A4FF + chevron (96x24; hover +20% white; disabled outline #707079). Entity type tag ("RBS") = fill #E6E6E6, text #000, r2, 20h, Nunito SemiBold 12. Live dot: 8px #2BDF68 with 3-ring pulse animation (Animation/1-4) | Group badge amber fill #F59E0B r4 22h; review filled/teal/dark/outlined; active/success/danger/pending tinted pills (rgba(77,204,155,.12) etc.); type badge dark w/ border | **W** (+ tinted status pills **INV**) | Rebuild as the four Figma chip families with their hexes; r2/r3 not 4; 24h; type tag = #E6E6E6/black. Delete tinted success/danger/pending/active pills (no Figma source). |
| 10 | **Section Labels** | Section heads ("Trading Accounts", "Traders") Nunito Medium 18 **#7373BB**, sentence case, no tracking. Field labels Regular 12 #707079; sub-labels ("Product Permissions", "Lucera Drop Value", "Default Booking Recipients") Regular 14 (screen) or 12 (modal) #707079. | 12/600 uppercase, ls .72px, #8080CC | **W** | Two roles: section head 18/500 #7373BB sentence case; field label 12/400 #707079. Remove uppercase/letter-spacing. |
| 11 | **Breadcrumb** | In a 49px strip below the 56px top bar on #000: link "Entities" Nunito Medium **18** #60A8FF **underlined**; separator = chevron vector ~8x14 #BABEC7; current "Bank of America" Medium 18 #BABEC7 | 12px (`.breadcrumb` font-size sm), link #8080CC/500 no underline, separator "›" #5A5A78, current #EEEEF8/500. **Showcase bug**: `<button class="breadcrumb-link">` renders with browser defaults (grey #F0F0F0 bg, 2px outset border, Arial 13.3px) because `.breadcrumb-link` has no reset (measured). | **W** | 18px, link #60A8FF underline, sep chevron icon, current #BABEC7; fix button reset. |
| 12 | **List Panel** | Panel list sits on #171719 in a 424px column. **Group card** #242428 r4; header 45h #39393C (top corners r4) with name Nunito **SemiBold 18** white, pad-left 24; rows 62h pitch: name **Medium 16** white, sub-line Medium 16 ("Client" #707079, separator "|" #BABEC7 12px, owner #BABEC7); 1px #39393C dividers inset 24; **selected row fill #39394E, name #A4A4FF**; plain list (Traders) rows 61h Nunito SemiBold 18 white pad-left 19, divider #39393C; section head Medium 18 #7373BB above each card. No per-group "+" button. | `.list-group-header` 45h bg #1A1B2E 14/600; rows 44h bg #1E2035 pad 8/14, name 14/400 (active 14/500 #8080CC), sub 12px #5A5A78; border-bottom #1E1E32; selected #252740; amber 28px "+" in each group header. **Showcase bug**: row text is clipped/overlapping (14px + 12px lines in 44h, measured name 14h + sub 12h inside 44h with 8px pad). | **W** | Group card #242428 r4, header #39393C 45h 18/600; row 62h 16/500 + 16 sub; separators; selected #39394E/#A4A4FF; remove amber "+" per group (Figma "+" lives in the detail panel boxes); fix clipping. |
| 13 | **Detail Panel** | Two columns separated by 1px #39393C vertical line at x=488 (rel.). Header: title Medium **20** white + "(alias)" Regular 20 #707079, subtitle Medium 16 #BABEC7 with #E6E6E6 type tag, **Active** Switch-with-text top right. Tabs-like radios row "Client / Market Maker" (Radio, Medium 14). **Labels stacked above fields** (12px #707079), field pairs in columns (dropdown 78w + input 161w; Makor Entity dropdown 256w). Checkboxes row. "Give-up" = **Switch with text** (not a button). Right cards: **Lucera Drop Value** box #242428 r4 (255x244) with dropdown+input rows and bottom-right "+" 32x24 #FF9747; **Default Booking Recipients** list box #242428 r4 (294x244): 32h rows, email text, checkbox right, #39393C dividers, bottom bar with "example@email.com" input + "+" and shadow (0,-4,b4,25%). Footer actions: Cancel/Close 84x32 #E6E6E6 left, "Save Changes" purple right (139x32) | Breadcrumb + title 16/700 + subtitle; Active toggle teal; "field-pair" rows = label **left** 13px (160w) + input right; "Give-Up" as teal-outline button; booking recipients as plain checkbox list under uppercase lavender section head with "+" amber; "Product Permissions" head + "Add Permissions" outline button | **W** (different layout, labels, controls) | Rebuild per Figma: stacked labels, 2-column card layout, Give-up as switch, #242428 boxes r4 for Lucera / recipients, row dividers, bottom add-bar. Titles 20/24 Medium. |
| 14 | **Sidebar** | **56px wide, #39393C**, no border; icons **24px** at x=16, pitch 56 (y 72,128,184,240,296...), idle #BABEC7, **active #A4A4FF**; no hover/active tile background; settings icon bottom (y=984); logo block 56x56 #A4A4FF top-left containing black "FX Engine Room" mark (32x40). Top bar to the right: 56h black, bottom border 1px #39393C, title Nunito Medium 20 white at x=24, user avatar icon 32px #BABEC7 right; content wrapper r 16/0/0/0 | `.app-sidebar` 48px, #101020, border-right #1E1E32; `.sidebar-icon` 36x36 r6 with lavender tint tile (rgba(128,128,204,.08)) on active, svg 18-20px stroked icons | **W** | 48 -> 56, #39393C, icon 24px solid glyphs, active colour only (#A4A4FF), logo block #A4A4FF, add top bar 56h (title 20/500, avatar). |
| 15 | **Footer Bar** | 46h, fill #171719, **top** border 1px #39393C, pad 8/12; left: footer logo glyph 24x20 #BABEC7 (the Makor "M" mark, not a box) + "FX Engine Room \| Operated by Makor Group" Nunito Medium 14 #BABEC7 (gap ~11); right: live dot 8px #2BDF68 inside 30x30 "Animation" with pulsing rings (variants 1-4 at 30/40px) | 36h #101020, border-top #1E1E32, "M" box 22x22 #8080CC r4 white 700, text 12/400 #8A8AAA, 8px dot #4DCC9B | **W** | 36 -> 46, #171719, text 14/500 #BABEC7, replace box logo with 24x20 mark glyph, dot #2BDF68 + pulse animation. |
| 16 | **Permissions Grid** | Not a table. A **master/detail card** 836x400 #242428 r4 under label "Product Permissions": left column 188w with 4 product rows 86h each (name Regular 16 #7373BB, "$100m limit" Regular 16 white, dividers #39393C, **selected row #39394E with name #A4A4FF**); right pane: tenor labels (2 years / 1 year / 6 months ...) Regular 14 #707079, currency textareas fill #39393C r4 pad 12/8 Regular 14 white, "-" for empty, thin 4px scrollbar at far right; bottom bar with outlined-green "Add Permissions" button 156x32 (#30F0D6 1px, r3). Add Permissions modal: Product (checkbox row), Tenor dropdown, Currencies textarea | `table.permissions-grid` columns Product / Limit / Currency-Tenor, product name 14/500 #8080CC, limit = input, codes in JetBrains Mono 13px #8A8AAA, row hover surface-raised | **W** (wrong pattern) | Replace with master/detail card; drop mono; selected state; scroll; add-permission button. |
| 17 | **Login Card** | Page #000. Card **312x388** #242428, r12, **no shadow**, content width 216 at x=48 (pad 48); logo = purple #A4A4FF "FX Engine Room" SVG mark 52x61 at y=39; Username (label 12 #707079 + 44h field) at y=152; Password at y=220 (dots #BABEC7 + eye #A4A4FF); error state: field 1px #FF7272, "Incorrect Password" 12px #FF7272 left, **"Forgot Password?" 12px #A4A4FF underlined** right; **Log In = Purple button 216x32**, black text, y=324 | Card 360x409 #1A1B2E r12 pad 40/36 shadow 0 8 48 .6; text logo "FX" 36px Inter 700 + "Engine Room" 16/500 #8080CC; inputs 36h; "Forgot Password?" **red #EF4444**; Log In 288x42 #8080CC white text 15/600 | **W** | Card 312 wide #242428, no shadow, pad 48, SVG logo (asset exists in Figma), purple Forgot link underlined, button 32h black text, inputs per #5. |
| 18 | **Cards** | No card component. Nearest: content boxes #242428 r4 on #171719 (no border, no shadow, no header); modal #242428 r12; filter popup #242428 r8 with shadow. | `.card` #1A1B2E, 1px border #2A2A42, r8, shadow, header with divider + title 14/600 | **INV** | Remove, or redefine as "panel box #242428 r4". Add a real Modal component instead (see missing). |
| 19 | **Toast** | Not found. Searched all layer names for toast/snack/notif/alert/banner/popup/message: only "tooltip" frames exist. (Absence of a layer is not proof that no toast exists in the product.) | Dark toast component | **INV / not verifiable** | Delete unless a design is supplied. Replace with **Tooltip**: fill #39393C, r4, pad 11/16, drop shadow (-2,2,b4,50%), Nunito Regular 14, coloured text (e.g. #FF9747, yellow for "Ungrouped trade"). |

---

## Missing from ours (exists in Figma, absent in our system/showcase)

1. **Modal** (873 and 510 wide, #242428, r12, 61px header with centred title Medium 18 and 1px #39393C divider, 32px content padding, Cancel left / primary right at y bottom) - blurred dark scrim over screen.
2. **Top bar** (56h black, bottom border #39393C, Medium 20 title, avatar icon) and **breadcrumb strip**.
3. **Tabs** (Client / Market Maker): pad 16/32, Medium 14, active white text + 2px bottom border #A4A4FF, inactive #BABEC7, hover fill #171719.
4. **Switch with text** (Active / Not Active).
5. **Edit** and **Trash** icon buttons.
6. **Search input** (with/without label), **Date**, **Time**, **Password** (dots + eye / eye-off) fields.
7. **Dropdown with label** (triangle caret).
8. **Multi-row chips**.
9. **Indeterminate checkbox** with count ("select all (5)").
10. **Filter popup** (237w, #242428 r8, shadow, 24h search, "All" + checkbox list with 12px Medium text).
11. **Chip-buttons**: Group (yellow), Review (12) (orange-red, 4 states), Give-Up (blue), Status (purple with chevron).
12. **New Trade with dropdown** teal button; **outlined green**; **transparent dark** button.
13. **Live-dot animation** component (Animation/1-4).
14. **Tooltip** (#39393C, shadow).
15. **Context menu** (blotter; icon + 14px label rows; selected row lighter) - seen in screenshot, spec not read.
16. **Data table / Trade Blotter**: header 12px #BABEC7 row, row states (green-tinted new, yellow-tinted ungrouped, grey expanded child), expand chevrons, row checkbox, flags, sticky scroll bar, pagination ("Page 1"), toolbar.
17. **Flags** (MasterFlag component set, ~250 country flags).
18. **Header summary strip** (Option Premium / Total P&L pill + entity dropdown).
19. **Dashboard widgets / Rates widget / Activity** panels, CSV, Reports, Deleted trades screens.
20. **New Trade flow modals** (Spot, Vanilla Option, Swap, NDF, B2B), Allocate Block panel, ID Status panel.
21. **Logo assets** (FXER mark, "FX Engine Room" SVG, Makor M mark).
22. **Scrollbar** style (4px track/thumb in permissions card).
23. **Lucera Drop Value** box and **Default Booking Recipients** list with add-bar.
24. **Master/detail permission card**.
25. **Shell**: 16px top-left rounded content corner, 1px vertical divider between list and detail.

(Items 15-22 were identified from screenshots/layer names only; I did not read their pixel specs.)

## Invented by us (no Figma source)

- Brand-hover #6B6BB8, brand-ghost/dim/border alpha tints, teal-ghost/border, amber-ghost.
- Focus rings (3px glow) and red error glow.
- `.btn-lg` 42px, `.btn-sm` 28px, loading spinner, `:active scale(.98)`, danger-outline button, `btn-link`.
- Tinted status pills (active/success/danger/pending).
- Cards with header/shadow; Toast.
- JetBrains Mono for codes; uppercase tracked labels.
- Shadows on login/dialog/cards.
- Sidebar tinted active tile; sidebar border-right.
- 36px / 42px / 44px control scale.

## Prioritised fix list

1. **Rebuild tokens from Figma**: palette (#000/#171719/#242428/#39393C/#39394E; #A4A4FF/#7373BB; #30F0D6; #FF9747; #FF7272; #2BDF68; #60A8FF; text #FFF/#BABEC7/#707079), Nunito font, scale 12/14/16/18/20/24, radii 2/3/4/8/12/16, control heights 32/24/56/46/62. Everything else derives from this.
2. **Buttons**: 32h, r4, pad 11/24, black text on purple/teal, hover white-overlay, disabled #707079; add Purple/transparent/outlined-green/dropdown/Edit/Trash/"+" 32x24.
3. **Inputs/dropdown/search/date/time/password/chips**: 32h, #39393C, no border, r4, label 12 #707079 above, triangle caret, #A4A4FF icons.
4. **Checkbox/Radio/Switch**: purple #A4A4FF checks/radios, green #2BDF68 switch 32x16, r2 checkbox.
5. **Shell**: sidebar 56 #39393C with 24px icons, top bar 56, breadcrumb strip (18px, #60A8FF underlined), footer 46 #171719.
6. **List panel and detail panel layout** (62h rows, #39394E selected, group header #39393C 18/600; stacked labels; Lucera and recipients boxes; Give-up switch).
7. **Permissions** master/detail card; **Modal** and **Login card** (312w, #242428, SVG logo, 216w content, no shadow).
8. **Chip-buttons** (Group/Review/Give-Up/Status) and tooltip; delete tinted badges, Cards, Toast.
9. Add blotter patterns (table, context menu, pagination, filter popup) if agents will rebuild those screens.
10. Fix showcase bugs: breadcrumb `<button>` reset, clipped list rows.

## Not verifiable / caveats

- Figma focus states, toast, mobile: nothing found, not claimed either way.
- Figma line-height is "auto" on all Nunito text (reported text heights 8-10px are plugin metrics, not CSS values); I did not derive a CSS line-height.
- Hover/active states of OUR components were read from components.css, not from live hover.
- Blotter, context menu, pagination, dashboard widgets: only seen via screenshots (Trade Blotter) or layer names; no exact specs read.
- Figma "Cancel" (#E6E6E6) in Figma vs ours "white #FFFFFF" - CLAUDE.md says Cancel white; the Figma component is #E6E6E6.
- Browser measurements are at DPR 1.5 so 1px borders read 0.667px.

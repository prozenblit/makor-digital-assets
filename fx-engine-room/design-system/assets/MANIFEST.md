# FX Engine Room - Asset Manifest

Source: Figma file `yuJA7DtjFKnqTZQcu2vKYN`, page "Page 1", canonical section "Section 3" (7114:14467).
Every SVG here is the verbatim output of Figma `exportAsync({format:'SVG_STRING'})` (or the Figma MCP `download_assets` svgAssets output for the large logos). Path data was never redrawn. Only differences from Figma: (a) whitespace/newlines minified, (b) for the 4 logo files the MCP-only root attributes `preserveAspectRatio="none" overflow="visible" style="display:block"` were removed from the `<svg>` tag, (c) `*.currentColor.svg` = same file with the single paint colour replaced by `currentColor`.

All icon colours are Figma variables (names given). Hex is the resolved value in the (only) dark theme.

| Colour | Variable name(s) in Figma |
|---|---|
| #BABEC7 | Light grey text (also "Grey 4" on sort/filter glyphs) |
| #A4A4FF | Primary purple / Purple 1 |
| #707079 | Secondary text |
| #39393C | Menu bar / Separators / Inputs on modal (same hex, 3 variable names) |
| #242428 | Modal BG |
| #FF9747 | Edit |
| #FF7272 | delete / Red |
| #2BDF68 | Active / Green 2 |
| #60A8FF | blue |
| #30F0D6 | Add New |
| #FFDC51, #FFCF00 | (unbound hex) |
| #000000 | Black |

## Icons (counts = instances of the drawing across Section 3, rounded; "scr" = distinct screens)

Sizes below are the Figma node size = intended CSS size (1 Figma px = 1 CSS px, desktop 1440x1024 frames).

### Sidebar / navigation (24x24, rail icons; inactive #BABEC7 Light grey text, active #A4A4FF Primary purple)
| file | Figma name | node id | size | colour (variable) | used where | CSS |
|---|---|---|---|---|---|---|
| menu-tab-1(.currentColor).svg | Menu tab 1 (4-tile grid; BOOLEAN_OP) | 3107:8345 (main comp instance 16:131) | 24x24 | #A4A4FF active here; #BABEC7 inactive elsewhere | sidebar item 1 on ~23 screens | width/height 24px; inactive `color:#BABEC7`, active `#A4A4FF` |
| subtract(.currentColor).svg | Subtract (arrows exchange) | 3107:8352 | 24x24 | #BABEC7 (inner #39393C Menu bar variable is a cut-out, not painted) | sidebar "trades" item, ~23 | same |
| csv(.currentColor).svg | csv (arrow down into tray) | 3107:8357 | 24x24 | #BABEC7 | sidebar CSV item, ~23 | same |
| deleted-trades(.currentColor).svg | deleted trades (trash) | 3107:8360 | 24x24 | #BABEC7 | sidebar item, ~23 | same |
| entities(.currentColor).svg | entities (building) | 4318:14940 | 24x24 | #A4A4FF (active state) | sidebar on Entities/Trading Account screens, ~12 | same |
| settings(.currentColor).svg | Settings (gear) - component 16:133 | 16:133 | 24x24 | #BABEC7 | sidebar bottom/utility, ~24 | same |
| user(.currentColor).svg | User (circle avatar glyph) | 6:12 | 32x32 | #BABEC7 | sidebar/header user, ~17 | 32px |
| makor-m(.currentColor).svg | Path 1852 = Makor "M" mark | 546:323 | 24x20 | #BABEC7 | footer bar left ("FX Engine Room" sibling text), ~25 screens | 24x20px, `color:#BABEC7` |

### Logos
| file | Figma name | node id | size | colour | used where | CSS |
|---|---|---|---|---|---|---|
| logo-fxer-stacked-purple(.currentColor).svg | logo (FX mark + "Engine" + "Room" stacked, 3 vector paths) | 4407:16446 | 457x571.76 | #A4A4FF (Purple 1) | brand sheet; login card uses the same drawing at 52x61 (2211:1839, var Primary purple) | login card logo 52x61 |
| logo-fxer-stacked-dark.svg | logo (dark variant) | 7067:14470 | 457x571.76 | #3B3B5C (unbound) | brand sheet | - |
| logo-fxer-horizontal-black.svg | logo (horizontal FX + wordmark) | 2259:1419 | 272.16x73 | #000000 (Black) | brand sheet | - |
| logo-fxer-stacked-black-32x40(.currentColor).svg | logo inside "Frame 5" | 6:14 (in Frame 5 6:19, 56x56) | 32x40 | #000000 (Black) | app header logo tile: Frame 2 72x56 filled #A4A4FF (4:6) holds the black logo at x12,y8; ~23 screens. 56x48 variant (28x32 logo at 14,8) in Widgets Dashboard 4243:15549 | tile 72x56 (56x48 on dashboards), bg #A4A4FF |
| logo-fx-mark-50(.currentColor).svg | logo FXER (FX mark only) | 7017:14457 | 50x50 (glyph 50x32 at y9) | #A4A4FF; Figma also lists a stroke #4B4B76 on the vector but it renders nothing in export | favicon/mark, 1 | 50px |
| logo-fx-mark-512.svg | Frame 24 (FX mark 512 canvas) | 2586:2776 | 512x512 | #A4A4FF | app-icon master | 512px |

### Controls, status, actions
| file | Figma name | node id | size | colour (variable) | used where | CSS |
|---|---|---|---|---|---|---|
| search(.currentColor).svg | Vector (magnifier; drawn as inside-stroke mask, see issues) | I3648:7352;52:42 (main 52:42) | 16x16 | #A4A4FF stroke->fill (Primary purple) | Search input left icon, ~40 across Statics/Entities/CSV | 16px, at x8 in a 158x32 field |
| edit-pencil(.currentColor).svg | Edit / State=Default (instance edit/Default) | 67:29, set 62:207 / 4398:15364 | 32x32 (pencil in 20x20 at 6,6) | #FF9747 (Edit) | row action, Statics/Blotter/etc, ~25 | 32x32 hit-target |
| edit-pencil-hover.svg | Edit / State=Hover | 4398:15367 | 32x32 | #FFBF8E (unbound) | hover state | swap colour on hover |
| edit-pencil-purple-24x12(.currentColor).svg | Edit (Trading Account) | 6435:14746 | 24x12 | #A4A4FF | Trading Account screens (1) | 24x12 |
| trash-red-32(.currentColor).svg | Trash / state=Default | 4398:15424 | 32x32 (glyph 18x18 at 7,7) | #FF7272 (delete/Red) | delete action (component set 4398:15423) | 32x32; hover = same path + white fill @30% overlay (see 4398:15426, not saved separately) |
| add-button-orange.svg | Add | 2514:2892 | 32x24 | rect #FF9747 (Edit) rx4, plus #000000 | "Add" button in Edit Client modal, ~24 | 32x24 |
| warning(.currentColor).svg | Vector (warning triangle) | 3107:6485 | 14x12 | #FF9747 (Edit) | Blotter status warning | 14x12 |
| action-warning-circle.svg | Frame 25 | 3107:7140 | 32x32 | circle #39393C (Separators) + #FF9747 glyph | Blotter bulk-action chip (also 24x24 variants on dashboards) | 32 round |
| action-filter-circle.svg | Frame 27 (funnel) | 3107:7142 | 32x32 | #39393C + #A4A4FF | Blotter filter chip | 32 round |
| action-unlink-circle.svg | Frame 26 (broken link) | 3107:7144 | 32x32 | #39393C + #FFDC51 | Blotter action chip | 32 round |
| link-broken-yellow-14.svg | Vector (broken link) | 3107:6487 | 14x14 | #FFDC51 (unbound) | Blotter row | 14px |
| link-broken-yellow-14x13.svg | Vector (broken link, stroked) | 2592:2931 | 14x13 | #FFCF00 fill+0.5 stroke | loose "New" scratch area | - |
| link-yellow-16x12.svg | Group (link) | 2592:2927 | 16x12 | #FFCF00 | loose "New" scratch area | - |
| action-bolt-circle-yellow.svg | Frame 26 (bolt) | 5465:14281 | 32x32 | #FFDC51 + #39393C | loose icon frames | 32 round |
| action-bolt-circle-grey.svg | Frame 27 (bolt) | 5465:14290 | 32x32 | #707079 (Secondary text) + #39393C | loose icon frames | 32 round |
| action-download-chip.svg | Frame 26/32/33 (download) | 3396:7310 (3562:3788 identical) | 24x24 | rect #39393C rx4 + #A4A4FF | Blotter "ID Status" cell | 24x24 |
| action-refresh-chip.svg | Frame 32 (refresh) | 3396:7316 | 24x24 | rect #39393C rx4 + #A4A4FF | Blotter "ID Status" cell | 24x24 |
| download-tray(.currentColor).svg | Vector (download into tray) | 3107:6496 | 12x12 | #BABEC7 | Right-click menu "Download Trade" | 12px |
| lucide-upload-download-green-16.svg | lucide/upload (csv set) | 6802:14827 | 16x16 | #2BDF68 (Active) | csv component set 6804:14833 (61x24, 61x30 hover) | 16px |
| close-18(.currentColor).svg | Filter (X glyph, 18x18) | 1254:3130 | 18x18 | #BABEC7 | Filters panel close | 18px |
| close-16(.currentColor).svg | Close (in Chip) | I2767:2722;100:244 | 16x16 | #BABEC7 | chips, ~30 | 16px |
| close-red-12.svg | Union (red X) | 3396:7331 | 12x12 | #FF7272 | Blotter "ID Status" cell | 12px |
| check.svg / check.currentColor.svg | Vector (tick) | 47:9 | 16x12 | #A4A4FF | Statics list | 16x12 |
| check-green.svg | Vector (tick) | 3396:7325 | 16x12 | #2BDF68 (Active) | Blotter status | 16x12 |
| check-green-12x9.svg | Vector (tick) | 2211:1821 | 12x9 | #2BDF68 | Login password-rule checklist | 12x9 |
| checkbox-checked.svg | Checkbox / Property 1=Checked | 89:160 | 16x16 | rect #A4A4FF rx2 + tick #000000 | ~100+ list/table rows | 16px, radius 2 |
| checkbox-unchecked.svg | Checkbox / Property 1=Unchecked | 89:161 | 16x16 | rect #39393C rx2 | rows; instances override to #242428 Modal BG in modals | 16px |
| checkbox-24-checked / -unchecked / -indeterminate.svg | Checked / Unchecked / all | 4617:14317 / 4617:14320 / 4617:14314 | 24x24 (16x16 box at 4,4) | #A4A4FF+#000, #39393C, minus 1.5 stroke #000 | header checkbox frames | 24 box |
| chevron-right-filled(.currentColor).svg | Vector | 3648:7513 | 8x14 | #BABEC7 | Entities tree expander (~9 screens) | 8x14 |
| chevron-right-grey-7x12 / pagination-first-last.svg | Group 124 / Group 123 | 3107:6946 / 3107:6943 | 8x12 / 24x12 | #BABEC7 / #707079 (Secondary text) | Pagination | - |
| chevron-right-stroke(.currentColor).svg | Vector 5/6/8/9/10/12 (8x4 rotated) | 3107:6398 | 6x10 | stroke #A4A4FF w1.5 round | Blotter expand/collapse (and 9 more in Animation section) | 6x10 |
| chevron-down(.currentColor).svg | Vector 4 | I3107:7133;2353:1561 | 12x7 | stroke #000000 w1.3 | "New Trade" dropdown button (black on purple) | 12x7 |
| chevron-down-purple-10x6.svg | Vector 4 | 6765:14814 | 10x6 | stroke #A4A4FF w1.3 | "status" dropdown button | 10x6 |
| caret-down-filled-11x6.svg | Polygon 1 | 4398:15324 | 11x6 | #A4A4FF | Dropdown component (Assets) | 12x8 node |
| calendar-16(.currentColor).svg | Vector (calendar) - stage 2 re-export | 4398:15320 (in Dates set 4398:15316; also filters/date panel) | 16x16 (x130,y8 in the 158x32 field) | #A4A4FF (Primary purple, var 2657:20); #707079 when the field is bordered/locked | Dates field, filter date panel, Reports Date Start/End | 16px |
| logout-16(.currentColor).svg | Vector (logout door+arrow) - stage 2 re-export | 2277:1382 (user menu Frame 23 2277:1379) | 16x16 at (12,12) | #FF7272 (delete / Red, var 53:181) | User menu "Log Out" | 16px |
| clock-16.svg | Vector (clock) | 4398:15441 | 16x16 | #A4A4FF | Time input | 16px |
| eye.svg / eye-off.svg (+cc) | Vector | I2211:1844;2048:1888 / I2201:1769;2048:1861 | 18x13 / 18x18 | #A4A4FF | Password field, 4+2 screens | 18px at right 12 |
| email-sent-56x48.svg | Vector | 2281:1394 | 56x48 | #30F0D6 (Add New) | Reset password "Email Sent!" | 56x48 |
| report-file.svg | file-02-solid-rounded 1 | 6882:15039 | 24x32 | #A4A4FF (Primary purple) | Reports | 24x32 |
| grip-dots-10x15 / 10x16 (+cc) | Union | 3631:4664 / 4243:15857 | 10x15 / 10x16 | #BABEC7 | Activity / Widget drag handle | - |
| corner-arrow-24(.currentColor).svg | Frame 28 | 3631:4671 | 24x24 | stroke #BABEC7 w2 | Activity row | 24 |
| arrow-up-circle-green.svg | Vector | 6234:14377 | 12x12 | #2BDF68 (Green 2) | Rates widget, ~200 rows | 12px |
| hourglass-blue.svg | Vector | 6113:14375 | 12x14 | #60A8FF (blue) | Widgets "Trades" | 12x14 |
| sort-arrows-10x8(.currentColor).svg | arrows | 6234:15097 | 10x8 | #BABEC7 (Grey 4) | table header sort | 10x8 |
| filter-funnel-8(.currentColor).svg | Vector | 6234:15099 | 8x8 | #BABEC7 (Grey 4) | table header filter | 8x8 |

### Flags (assets/flags)
Flags frame 594:630 and MasterFlag component set 594:5758 are both HIDDEN in the file (visible=false), so Figma refuses to export them; read-only constraint = I did not toggle visibility. Flags used in the screens were exported from their visible instances (nested flag drawing, inner clip rect kept). MasterFlag instances on screens are `Rounded=yes`, radius 2, clips content: 16x12 (blotters/lists, ~1,500), 20x16 (Entities, us only), 22x16 (Statics).

| file | Figma name | node id (instance) | size | used |
|---|---|---|---|---|
| flags/au-australia.svg | au Australia | I3107:6345;2714:400 | 16x12 (frame 17x12, 1px crop) | ~413 |
| flags/jp-japan.svg | jp Japan | I3107:6348;2714:400 | 16x12 | ~413 |
| flags/no-norway.svg | no Norway | I3107:6321;2714:400 | 16x12 | ~362 |
| flags/ph-philippines.svg | ph Philippines | I3107:6324;2714:400 | 16x12 | ~362 |
| flags/us-united-states.svg | us United States of America usa | I3648:7534;594:5769 | 20x16 (frame 21x16) | 10 (Entities) |

MasterFlag variants (not exportable - hidden): Circle=yes 44x44 r=1e6; Square=yes 44x44 r0; Rectangle=yes 58x44 r0; Rounded=yes 58x44 r10. Each holds "hk Hong Kong" 60x45 + hidden "MasterFlag/Greyscale" overlay. Two on-screen MasterFlag instances have no nested flag (4031:18539 20x16, 3107:3221 16x12): empty placeholders.

Flags frame = 266 components, 60x45 each. Names (code + name): ac Ascension Island, ad Andorra, ae United Arab Emirates, af Afghanistan, ag Antigua and Barbuda, ai Anguilla, al Albania, am Armenia, ao Angola, aq Antarctica (unofficial), ar Argentina, as American Samoa, at Austria, au Australia, aw Aruba, ax Aland Islands, az Azerbaijan, ba Bosnia and Herzegovina, bb Barbados, bd Bangladesh, be Belgium, bf Burkina Faso, bg Bulgaria, bh Bahrain, bi Burundi, bj Benin, bl Saint Barthelemy, bm Bermuda, bn Brunei Darussalam, bo Bolivia, bq Bonaire Sint Eustatius and Saba, br Brazil, bs Bahamas, bt Bhutan, bv Bouvet Island, bw Botswana, by Belarus, bz Belize, ca Canada, cc Cocos (Keeling) Islands, cd Democratic Republic of the Congo, cefta Central European Free Trade Agreement, cf Central African Republic, cg Republic of the Congo, ch Switzerland, ci Cote d'Ivoire, ck Cook Islands, cl Chile, cm Cameroon, cn China, co Colombia, cp Clipperton Island, cr Costa Rica, cu Cuba, cv Cabo Verde, cw Curacao, cx Christmas Island, cy Cyprus, cz Czech Republic, de Germany, dg Diego Garcia, dj Djibouti, dk Denmark, dm Dominica, do Dominican Republic, dz Algeria, ea Ceuta & Melilla, ec Ecuador, ee Estonia, eg Egypt, eh Western Sahara, er Eritrea, es-ct Catalonia, es-ga Galicia, es Spain, et Ethiopia, eu Europe, fi Finland, fj Fiji, fk Falkland Islands, fm Federated States of Micronesia, fo Faroe Islands, fr France, ga Gabon, gb-eng England, gb-nir Northern Ireland, gb-sct Scotland, gb-wls Wales, gb United Kingdom uk, gd Grenada, ge Georgia, gf French Guiana, gg Guernsey, gh Ghana, gi Gibraltar, gl Greenland, gm Gambia, gn Guinea, gp Guadeloupe, gq Equatorial Guinea, gr Greece, gs South Georgia and the South Sandwich Islands, gt Guatemala, gu Guam, gw Guinea-Bissau, gy Guyana, hk Hong Kong, hm Heard Island and McDonald Islands, hn Honduras, hr Croatia, ht Haiti, hu Hungary, ic Canary Islands, id Indonesia, ie Ireland, il Israel, im Isle of Man, in India, io British Indian Ocean Territory, iq Iraq, ir Iran, is Iceland, it Italy, je Jersey, jm Jamaica, jo Jordan, jp Japan, ke Kenya, kg Kyrgyzstan, kh Cambodia, ki Kiribati, km Comoros, kn Saint Kitts and Nevis, kp North Korea, kr South Korea, kw Kuwait, ky Cayman Islands, kz Kazakhstan, la Laos, lb Lebanon, lc Saint Lucia, li Liechtenstein, lk Sri Lanka, lr Liberia, ls Lesotho, lt Lithuania, lu Luxembourg, lv Latvia, ly Libya, ma Morocco, mc Monaco, md Moldova, me Montenegro, mf Saint Martin, mg Madagascar, mh Marshall Islands, mk North Macedonia, ml Mali, mm Myanmar, mn Mongolia, mo Macau, mp Northern Mariana Islands, mq Martinique, mr Mauritania, ms Montserrat, mt Malta, mu Mauritius, mv Maldives, mw Malawi, mx Mexico, my Malaysia, mz Mozambique, na Namibia, nc New Caledonia, ne Niger, nf Norfolk Island, ng Nigeria, ni Nicaragua, nl Netherlands, no Norway, np Nepal, nr Nauru, nu Niue, nz New Zealand, om Oman, pa Panama, pe Peru, pf French Polynesia, pg Papua New Guinea, ph Philippines, pk Pakistan, pl Poland, pm Saint Pierre and Miquelon, pn Pitcairn, pr Puerto Rico, ps State of Palestine, pt Portugal, pw Palau, py Paraguay, qa Qatar, re Reunion, ro Romania, rs Serbia, ru Russia, rw Rwanda, sa Saudi Arabia, sb Solomon Islands, sc Seychelles, sd Sudan, se Sweden, sg Singapore, sh Saint Helena Ascension and Tristan da Cunha, si Slovenia, sj Svalbard and Jan Mayen, sk Slovakia, sl Sierra Leone, sm San Marino, sn Senegal, so Somalia, sr Suriname, ss South Sudan, st Sao Tome and Principe, sv El Salvador, sx Sint Maarten, sy Syria, sz Eswatini, ta Tristan da Cunha, tc Turks and Caicos Islands, td Chad, tf French Southern Territories, tg Togo, th Thailand, tj Tajikistan, tk Tokelau, tl Timor-Leste, tm Turkmenistan, tn Tunisia, to Tonga, tr Turkey, tt Trinidad and Tobago, tv Tuvalu, tw Taiwan, tz Tanzania, ua Ukraine, ug Uganda, um United States Minor Outlying Islands, un United Nations, us United States of America usa, uy Uruguay, uz Uzbekistan, va Holy See, vc Saint Vincent and the Grenadines, ve Venezuela, vg Virgin Islands (British), vi Virgin Islands (U.S.), vn Vietnam, vu Vanuatu, wf Wallis and Futuna, ws Samoa, xk Kosovo, xx Unknown, ye Yemen, yt Mayotte, za South Africa, zm Zambia, zw Zimbabwe. (Accented characters in a few Figma names were ASCII-folded by the tool channel: Saint Barthelemy, Cote d'Ivoire, Curacao, Reunion.)

## Not exported

| item | node id | reason |
|---|---|---|
| Received | 2281:1389 (50x50) | frame has no visible layers (empty placeholder) |
| Love | 6038:15341 (24x24) | empty frame |
| Path 1852 1 | 50:41 (24x18) | empty frame ("Path 1852 1" is not the Makor M; the M is the vector 546:323) |
| Mask group | 5465:14313 (24x24) | yellow bolt cut-out + embedded IMAGE fill rectangle 34x34; export is 147 KB (raster-in-SVG); the clean vector bolt circles were exported instead (action-bolt-circle-*) |
| Group 163 (Lucera Drop Value), Group 93 (chips scroll) | 4138:14488, 1945:2555 | UI fragments (text + rects), not icons (export 41 KB / 39 KB) |
| Animation/1-4 | 4398:15513... | concentric ellipse rings (pulse animation), CSS-drawable circles: 8/10/16/30/40 px dots |
| Switch / Switch with text, Radio Button | 4398:15402, 4398:15409, 4398:15358 | plain shapes (switch 32x16 pill + 12x12 knob; radio 16x16 ellipse + 8x8 dot), implement in CSS |
| Frame 2 header logo tile (72x56, #A4A4FF) | 4:6 | tile is a rect + logo; logo exported as logo-fxer-stacked-black-32x40 (export of the tile = 9.6 KB, redundant) |
| MasterFlag set variants, Flags frame | 594:5758, 594:630 | hidden in the file, Figma refuses export |
| Menu tab 1 grey variant, trade icon | 16:131 / 3648:7428 | `trade` is path-identical to `subtract` (use subtract.svg); grey menu tab = menu-tab-1.currentColor |
| Trash hover | 4398:15426 | = trash-red-32 path + duplicate white overlay at 30% |
| Edit/Trash/Checkbox/csv/Switch component-set variants | - | variants covered above (Default+Hover); state colours only |
| Icons below 64px beyond those listed (e.g. Animation section duplicates: Path 8-13 (menu tab pieces), Vector 20x8, Polygon 1) | 2391:2768 | duplicates of exported sidebar icons split into parts |

## Inconsistent icon drawings (flag for the design-system rebuild)

1. Chevrons: six different drawings: filled right 8x14 (#BABEC7), filled right 7x12 (#BABEC7, pagination), stroke right 6x10 1.5 purple (blotter), stroke down 12x7 1.3 black (New Trade), stroke down 10x6 1.3 purple (status), filled triangle 11x6 purple (dropdown). The 8x4 "Vector 5..12" nodes are rotated 90 deg and export as 6x10.
2. Close/X: three drawings (18x18 node mis-named "Filter", 16x16 "Close", 12x12 red "Union") with different stroke weights/radii; X glyphs are filled outlines, not strokes.
3. Ticks: purple 16x12, green 16x12 (#2BDF68 var "Active"), green 12x9 (#2BDF68 var "Green 2"). Checkbox tick is a 4th drawing at 12x9 inside the 16x16 box.
4. Checkbox unchecked fill is #39393C (var Menu bar) in lists, #39393C (var Inputs on modal) in some, #242428 (Modal BG) in modals; Checked is always #A4A4FF with black tick. 16px box (screens) vs 24px frame with 16px box inset 4 (checkbox-24-*).
5. Two grip-dots (10x15 r=1.49 vs 10x16 r=1.5).
6. Download glyph exists 4 ways: sidebar csv (24, arrow+line), download-tray 12x12, action-download-chip 24 (#A4A4FF on #39393C chip), and "lucide/upload" 16x16 (named upload but arrow points down, green).
7. Link icon drawn 3 ways with two unbound yellows (#FFDC51 14x14 filled; #FFCF00 14x13 with 0.5 stroke; #FFCF00 16x12).
8. Edit pencil: orange 32x32 (glyph at 6,6 within), purple 24x12 (glyph offset right), hover colour #FFBF8E not bound to a variable.
9. Search magnifier is built with an inside-stroke mask (`mask id="path-1-inside-1_..."` + 5.6 radius outline path); it renders correctly but is not a clean fill/stroke icon. Re-drawing as `stroke` in code would be a visual change, so the exact SVG is kept.
10. Names are misleading: "Filter" (X), "Path 1852" (Makor M), "Frame 25/26/27/28/32/33" (action chips), "Union" (X or grip), "lucide/upload" (download).
11. `trade` and `subtract` are the identical path under two names.
12. Chip action backgrounds mix #39393C (Separators / Menu bar variable) at radius 16 (32 circle) and radius 4 (24 square).
13. Hex vs variables: yellows, #FFBF8E, #3B3B5C, #4B4B76 are not bound to any variable.
14. Scan method: walked every top-level child of Section 3 (and the "Animation New trade" section), treating any node <=64px per side with vector content and no text as an icon, de-duplicated by main component id or name+size+vector count. "Used where" screen names are taken from the ancestor frame names; per-use counts are approximate (sum of the per-section counts). Usage labels such as "sidebar", "footer", "row action" are inferred from ancestor/sibling names and were not visually verified screen-by-screen.

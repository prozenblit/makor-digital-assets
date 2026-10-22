# FX Engine Room - Figma FOUNDATIONS harvest

Source: Figma file `yuJA7DtjFKnqTZQcu2vKYN`, page "Page 1" (0:1), canonical "Section 3" 7114:14467.
Method: read-only `use_figma` walks (visible nodes only; MasterFlag instances and every node whose id path contains `2714:400` (flag internals) skipped; MasterFlag component set 594:5758 skipped). 32,193 nodes visited, 10,280 visible TEXT nodes. Values are quoted as read. "(visual estimate)" = judged from a screenshot only.

Important mechanics found:
- Colours are bound to variables on almost every fill/stroke. Two parallel sets exist: the 2 LOCAL collections (Primitives 23, Variables 16, single "Mode 1", scopes ALL_SCOPES, no aliases other than Variables->Primitives) AND REMOTE copies of the same variables (library "VariableID:<hash>/<id>" ids, collections "Variables"/"Primitives", used inside component instances). Same names, same hex. In counts below L+R are merged.
- No local text styles (0), no paint styles (0), no grid styles (0), exactly 1 local effect style. No layout grids on any node (0 of 32k). No node-level opacity < 1 anywhere (0). Only paint-level opacity is used.
- ALL text has `leadingTrim = CAP_HEIGHT` (except 15 nodes with NONE), line-height AUTO, letter-spacing 0%, paragraphSpacing 0, truncation DISABLED. Hence measured text box heights are cap-height boxes (12px->8, 14px->10, 16px->11, 18px->13, 20px->14, 24px->17). Nunito natural auto line pitch is about 1.364 x size (derived: a 14px 3-line text is 48 tall = 9.85 + 2 x 19.09).

---------------------------------------------------------------------------------------------------
## 1. INVENTORY of Section 3 (7114:14467, 28575x15057, 55 direct children)

Coordinates are relative to Section 3. Size WxH. k = child count. "Current" judgement is by node-id recency, structural completeness and the overview screenshot (visual estimate); nothing is marked deleted in the file.

### Component / foundation library
| id | name | type | x,y | size | k | what it is |
|---|---|---|---|---|---|---|
| 4398:15026 | Assets | SECTION | 724,5311 | 1489x923 | 34 | THE component library. Component sets: Animation 4398:15284 (+ "Animation flow" SE 4398:15512), Search 15301, Search with label 15305, Dropdown with label 15310, Dates 15316, Dropdown 15322, Input with label 15325, Input 15330, Input Error 15332, New/Add 15337 (Default/Hover/Disabled), Cancel 15344, Tabs 15351 (Active/Hover/Not Active), Radio Button 15358, Edit 15364, Chips with few rows 15369, Chips 15387, Switch 15402, Switch with text 15409, Checkbox 15418, Trash 15423, Purple 15428 (primary button), Time 15438, Password 15443, Outlined purple 15474, With dropdown 15481, Button transparent 15491 (purple) and 15498 (green #00FEA9), deselect all 15505, Outlined red 6113:14388, Outlined blue 6113:14402, Outlined yellow 6113:14409, status 6765:14816, filters FR 6544:14756. CURRENT. |
| 62:207 | Edit | COMPONENT_SET | 1181,7763 | 91x56 | 2 | Loose copy of Edit icon-button set (duplicate of Assets 4398:15364). Superseded/duplicate. |
| 89:105 | Switch with text | COMPONENT_SET | 1072,7914 | 164x92 | 2 | Loose copy (original source of Assets 4398:15409). Duplicate. |
| 6804:14833 | csv | COMPONENT_SET | 5593,10735 | 101x114 | 2 | "CSV" export button set (Default/hover); only place using Inter Regular 12 and fills #264A35 / #2BDF68 / #000000@0.2. Current but off-system. |
| 594:5758 | MasterFlag | COMPONENT_SET | 2145,5412 | 91x276 | 4 | Country flag master (ignore). |
| 4617:14314 / 14317 / 14320 | all / Checked / Unchecked | FRAME | 3367,9771 / 9809 / 9847 | 24x24 | 1-2 | Loose checkbox glyphs (Trades table select-all states). Scratch reference. |
| 6234:14340 | filters | FRAME | 5337,10735 | 237x256 | 8 | Filters panel (current, newer than Blotter "Filters" 1253:2360 241x906). |
| 6236:14733 | filters | FRAME | 5086,10735 | 237x136 | 2 | Collapsed/shorter filters variant. Duplicate-ish (pair with above). |
| 6113:14392 | Outlined red | INSTANCE | 3322,10275 | 100x24 | 2 | Loose instance used as reference. Scratch. |
| 4250:17595 | Button transparent | INSTANCE | 4298,9583 | 86x24 | 1 | Loose instance. Scratch. |
| 6038:15341 | Love | FRAME | 6626,10606 | 24x24 | 0 | Empty 24x24 frame. Scratch. |
| 6807:14782 | Frame 182 | FRAME | 3908,11134 | 310x3 | 0 | White 310x3 bar (#FFFFFF). Scratch. |
| 2281:1389 | Received | FRAME | 7717,4306 | 50x50 | 0 | Empty frame. Scratch. |
| 2364:5481, 2364:5482 | New | TEXT | 827,12599 / 12627 | 26x8 | 0 | Two stray "New" texts (Add New colour #30F0D6). Scratch. |
| 2592:2931 / 2592:2927 / 50:41 | Vector / Group / Path 1852 1 | misc | - | 13x12, 16x12, 24x18 | - | Stray vectors (fill #FFCF00, stroke #FFCF00 0.5). Scratch. |
| 5465:14313 / 14281 / 14290 | Mask group / Frame 26 / Frame 27 | GROUP/FRAME | 12644,3245 / 3149 / 3193 | 24 / 32 / 32 | 2/1/1 | Round icon buttons (fill #FFDC51 / Separators) used in Blotter toolbar. Scratch references. |
| 4138:14488 | Group 163 | GROUP | 7870,10812 | 221x260 | 4 | Loose widget fragment. Scratch. |
| 1945:2555 | Group 93 | GROUP | 5543,5162 | 186x84 | 2 | Loose chips fragment (copy of "Chips with few rows"). Scratch. |

### Branding / logos
| id | name | type | x,y | size | note |
|---|---|---|---|---|---|
| 4407:16446 | logo | GROUP | 715,7145 | 457x572 | Large FX Engine Room logo (purple "FX Engine Room", Primary purple #A4A4FF) |
| 7067:14470 | logo | GROUP | 1436,7145 | 457x572 | Same logo, dark navy variant (raw #3B3B5C on 7067:14472) |
| 2259:1415 + 2259:1419 | Rectangle 23 (1425x137) + logo (272x73) | RECT/GROUP | 724,6345 | - | Purple banner (#A4A4FF) with horizontal lock-up |
| 2586:2776 | Frame 24 | FRAME | 724,6593 | 512x512 | Logo mark large |
| 7017:14457 | logo FXER | FRAME | 1778,6593 | 50x50 | Small FXER mark |

### Screens / flows (1440x1024 unless stated)
| id | name | type | x,y | size | k | what it is |
|---|---|---|---|---|---|---|
| 1254:3638 | Statics | SECTION | 3366,5277 | 2914x3485 | 10 | Admin "Statics": Static Clients 1:2, Static Users 160:97, Static Currency pairs 1254:3640 (each 1440x1024), plus modals: Edit Cut 276:271 (303x217), New / Edit prime broker 267:157 (472x217), New Currency Pair 476:175 (392x217), Edit User 1945:2735 (562x341), Edit Client 2514:2818 (807x605), dropdown 1971:2821 (158x118), Search with label 1971:2831. Oldest generation (ids 1:2/4:x) but reference for the shell. CURRENT as shell reference. |
| 3999:18361 | Entities | SECTION | 6544,5346 | 4614x3450 | 6 | Entities hub: Static Users 3648:7322 (1440x1024 shell) + Frame 3 3648:7348, Entity 3648:7418 and Entity 5922:13690 (chart/pie variant), Trading Account 3657:4471, Trader 3769:8602. CURRENT. |
| 2696:2763 | Trades Blotter | SECTION | 12743,2209 | 2437x1224 | 6 | Blotters 2281:1414 (main blotter screen), Allocate Block 2696:2682 (372x385 modal), Filters 1253:2360 (241x906), "rates" / "rates clicked on" 2876:3110/3113 (91x32 buttons), ID Status 3396:7300 (301x440). CURRENT (filters superseded by 6234:14340). |
| 2211:1976 | New User Log In Flow | SECTION | 3389,2307 | 3207x1224 | 2 | Log In 2211:1942 (login card 312x388 on #000000), Change Password 2211:1877. CURRENT. |
| 2211:1977 | Log In Forgot Password Flow | SECTION | 3389,3874 | 7345x1224 | 4 | Log In Error 2211:1835, Reset Password 2192:1761 and 2259:1398 (two near-identical frames), New Password 2201:1724. CURRENT; 2 Reset Password frames are duplicates/steps. |
| 3978:11481 | New Deal Flow | SECTION | 15466,2209 | 10118x2758 | 5 | New Spot Deal SEC 3994:28479, New Vanilla Option Deal SEC 3994:28480, New Deal Modal Initial 3992:14502, New Deal - NDF 5813:19974, New deal Swap SEC 5873:18862. 13,155 nodes (largest block). CURRENT. |
| 3978:11482 | New Trade Flow | SECTION | 15569,5563 | 8538x2635 | 5 | Spot - New Trade SEC 3994:23333, New Client Vanilla Option 3994:16227, New Trade Modal Initial 3994:26764, New Client Trade Swap 5813:23402, New Client Trade NDF 5813:26902. 9,801 nodes. CURRENT. |
| 5873:19191 | B2B Spot Deal | FRAME | 12818,5834 | 628x693 | 23 | Back-to-back spot deal modal (uses Dropdown 158x32 instances). CURRENT. |
| 4243:15535 | WIdgets Dashboard New Sizes | FRAME | 3455,9657 | 1440x1024 | 6 | Widget dashboard v1: Trades 1070x910 + Prices 290x910 panels. OBSOLETE (pair, older id). |
| 6038:13964 | WIdgets Dashboard New Sizes | FRAME | 4959,9657 | 1440x1024 | 5 | Widget dashboard v2 (newer ids, 1,513 nodes). CURRENT. |
| 6234:14341 | Rates Widget | FRAME | 6851,10863 | 290x794 | 92 | Rates widget panel (689 nodes). CURRENT. |
| 3631:4652 | Activity | FRAME | 1728,10079 | 1070x461 | 35 | Activity panel v1. OBSOLETE (pair). |
| 6059:14318 | Activity | FRAME | 6524,9657 | 1070x315 | 16 | Activity panel v2, shorter, newer id. CURRENT. |
| 6878:14782 | Reports | FRAME | 3455,12635 | 1440x1024 | 3 | Reports screen shell (Frame 7 @0,56 1384x968; Trade Types selector). Newest id range. CURRENT. |
| 5535:14276 | New Entity | FRAME | 11057,10492 | 1440x1024 | 3 | Add-entity modal over blurred Entities. CURRENT. |
| 5539:15255 | New Trader | FRAME | 14331,10492 | 1440x1024 | 3 | Add-trader modal. CURRENT. |
| 5536:14786 | New Trading Account | FRAME | 12694,10492 | 1440x1024 | 3 | Add-trading-account modal. CURRENT. |
| 5580:14451 / 5587:14498 | Add Permissions | FRAME | 9496,11734 / 9496,10492 | 1440x1024 | 4 | TWO frames, same size and name, same structure (243 vs 230 nodes): permission-assignment modal states (visual estimate: second step / alternative). DUPLICATE pair - keep both as states. |
| 4031:18455 | Trading Account 1920*1080 | FRAME | 8131,9145 | 1920x1080 | 3 | Trading Account detail at large viewport (181 nodes). |
| 4164:14303 | Trading Account 1280*1040 | FRAME | 8131,10484 | 1280x1040 | 3 | Same screen at small viewport (230 nodes, newer id, contains breadcrumb with two chevrons). DUPLICATE across sizes (responsive pair). |
| 2958:3082 / 3107:2972 | CSV | FRAME | 7077,10621 / 5120,10621 | 1440x1024 | 3 | TWO CSV-export screens. 3107:2972 (290 nodes, 170 text) is the table-based older layout; 2958:3082 (109 nodes) is the lighter one. DUPLICATE pair (visual estimate: 2958 newer by being simpler). |
| 2936:3140 | Deleted trades | FRAME | 12818,3974 | 1440x1024 | 3 | Deleted-trades list. CURRENT. |

Animation section "Animation New trade" 2391:2768 is outside Section 3.

---------------------------------------------------------------------------------------------------
## 2. COLOUR PALETTE

### 2a. Variables (local, exact)
Collection "Primitives" (single mode "Mode 1"):
| var id | name | hex |
|---|---|---|
| 29:66 | Black | #000000 |
| 29:65 | Purple 1 | #A4A4FF |
| 29:67 | Grey 1 | #39393C |
| 29:68 | Grey 2 | #171719 |
| 29:70 | Grey 3 | #707079 |
| 29:76 | Grey 4 | #BABEC7 |
| 29:115 | Grey 5 | #E6E6E6 |
| 100:172 | Grey 6 | #242428 |
| 29:73 | Orange | #FF9747 |
| 29:74 | Red | #FF7272 |
| 594:5847 | Red 2 | #FD7557 |
| 29:77 | White | #FFFFFF |
| 29:71 | Green | #30F0D6 |
| 50:37 | Green 2 | #2BDF68 |
| 1246:1339 | red 3 | #B85944 (not used on any visible node in Section 3) |
| 1360:2601 | Purple 2 | #39394E |
| 1794:1992 | Purple 3 | #7373BB |
| 2880:3123 | blue | #60A8FF |
| 6113:14372 | yellow | #FEE274 |
| 6113:14395 | red dark | #392C2D |
| 6113:14408 | blue dark | #2A313D |
| 6113:14415 | yellow dark | #3A3730 |
| 6113:14434 | Green dark | #264342 |

Collection "Variables" (aliases to Primitives, Mode 1):
| var id | name | -> primitive | hex |
|---|---|---|---|
| 29:79 | Primary purple | Purple 1 | #A4A4FF |
| 29:80 | Primary text | White | #FFFFFF |
| 29:81 | Separators | Grey 1 | #39393C |
| 29:83 | Secondary text | Grey 3 | #707079 |
| 29:84 | Light grey text | Grey 4 | #BABEC7 |
| 29:85 | BG | Black | #000000 |
| 29:86 | BG Grey 1 | Grey 2 | #171719 |
| 29:87 | Menu bar | Grey 1 | #39393C |
| 100:173 | Modal BG | Grey 6 | #242428 |
| 100:195 | Inputs on modal | Grey 1 | #39393C |
| 29:88 | Black | Black | #000000 |
| 29:108 | Cancel Button | Grey 5 | #E6E6E6 |
| 49:19 | Edit | Orange | #FF9747 |
| 50:38 | Active | Green 2 | #2BDF68 |
| 55:24 | Add New | Green | #30F0D6 |
| 53:181 | delete | Red | #FF7272 |

### 2b. Usage and ROLE (fill unless noted; counts = visible nodes, L+R merged, from rows with count >= 2; single-use tail not itemised; TEXT/ICON = vector glyph fills)
Class buckets: huge = width>=1000; large = >=250x100; small; line = a side <=4.

| colour (var) | hex | uses by class | ROLE | example node ids |
|---|---|---|---|---|
| BG | #000000 | FRAME huge ~39 | PAGE / canvas background (content canvas "Frame 3" 1384x1024, radius 16/0/0/0); login page bg; modal-screen scrim base | 4:7, 4243:15555, 2211:1942 (Log In frame fill BG) |
| BG Grey 1 (Grey 2) | #171719 | FRAME huge ~34, RECT huge 15, ELLIPSE 21 | PANEL / content area (Frame 7 1384x919), footer strip (Frame 8 1384x46), Activity header band (1070x32); also "Tabs Hover" fill (Grey 2) | 14:110, 546:320, 3631:4673, 4398:15354 |
| Menu bar | #39393C | FRAME small ~34 (sidebar 56x1024), INSTANCE small ~131 (unchecked checkbox 16x16 fill), ICON ~66 | SIDEBAR bar + unchecked checkbox fill | 4:5, 4243:15536, 4250:17547 |
| Separators | #39393C | FRAME small ~72 (circle icon buttons 24/32 r16/r4), strokes 1px | BORDER / divider lines (stroke), circular toolbar icon-button fill, deselect-all checkbox border | 3107:7140, 4250:17597, 17:128 (Line 1384x0) |
| Inputs on modal | #39393C | FRAME small ~280 (input boxes 134x40..225x32), RECT small 33+, RECT line (scroll track) ~100, RECT huge 33+ (1070x40/32 rows) | INPUT fill (Dropdown, Input, Search, Time, Chips container), user-menu box 134x40, table header band, scrollbar track | 2277:1379, I6882:14996;4398:15318, 3631:4658, 3631:4905 |
| Modal BG (Grey 6) | #242428 | FRAME large ~59, RECT large 44, FRAME huge 33, INSTANCE small ~64 (checkbox container), FRAME small ~54 | MODAL / card / widget-panel fill: Edit Cut 303x217 (r12), Login card (r12), Activity 1070x461 (r8), Prices 290x910 (r8), Trades 1070x910 (r8), Entities cards 424x293 (r4); also the Search input in top bar (208x32) and chips (r12) | 276:271, 2211:1943, 3631:4652, 4243:15845, 3648:7594, I89:52;52:41 |
| Primary text (White) | #FFFFFF | TEXT ~6,480 (+ P:White TEXT ~225), ELLIPSE ~25 (switch thumb), FRAME huge ~33 (white artboard backdrop behind each 1440x1024 screen) | TEXT primary (table cells, titles, input values, active tab); switch thumb | 22:4, 4:9, I1945:2753;89:124, 1:2 |
| Secondary text (Grey 3) | #707079 | TEXT ~1,907, ICON ~62, RECT line ~77 (scroll thumb), INSTANCE small ~34 (disabled button fill) | TEXT secondary (field labels, table headers, placeholders); disabled button fill; scrollbar thumb; disabled/outlined stroke | 17:111, I89:52;52:43, 3631:4906, 4398:15342 |
| Light grey text (Grey 4) | #BABEC7 | TEXT ~334, ICON ~423 (sidebar icons, dropdown icons), ELLIPSE ~50 (password dots 6x6), RECT small ~37 | TEXT tertiary / inactive tab label / breadcrumb current segment; sidebar inactive icons; disabled button text; switch-off track | 546:322, I50:193;50:170, 50:57, 4398:15406 |
| Primary purple (Purple 1) | #A4A4FF | TEXT ~160, ICON ~223 (+polygon chevrons), INSTANCE small ~190, FRAME small ~59 (logo tile 72x56), ELLIPSE ~15 | PRIMARY action: filled button (New/Add Purple, 139x32 r4), selected/checked checkbox fill, radio, active-tab underline stroke (2px), link text ("Forgot Password?" underlined), outlined-button stroke+text, logo tile | 276:292, 4250:17546, 4:6, 2211:1952 |
| Black | #000000 | ICON ~130 (checkbox tick), TEXT ~140 (button label on filled buttons; also raw #000000 TEXT 60 + P:Black ICON ~100) | Label colour ON filled buttons (Add New, Primary purple, Cancel #E6E6E6) | I276:280;29:106, I476:197;89:164 |
| Cancel Button (Grey 5) | #E6E6E6 | INSTANCE small ~48 | SECONDARY/cancel button fill (92x32 r4, black label) | 276:280, 267:166 |
| Add New (Green) | #30F0D6 | TEXT ~41, INSTANCE small ~26, strokes | ADD-NEW / positive CTA fill (New Trade 132x32 r3) and text on dark; sidebar new text | 29:47, 3642:5864, 4250:17434 |
| Edit (Orange) | #FF9747 | ELLIPSE ~48, ICON ~58, TEXT ~43 (tooltips), FRAME small 23, INSTANCE small 16 | EDIT action (pencil icon, orange button 95x32 r4) and WARNING (tooltip text "Bloomberg Disconnected", animation dot) | 3107:7135, 4402:16434, 62:204;62:189 |
| delete (Red) | #FF7272 | INSTANCE small ~16, ICON, FRAME; stroke 1px | DANGER / delete button (91x32 r4), trash icon, error input border (stroke) | 3107:7136, 4398:15423, I5535:14753;848:734 |
| Red (Primitive) | #FF7272 | TEXT 1, ICON 2 | Error message text "Error message" 4398:15336 | 4398:15336 |
| Active (Green 2) | #2BDF68 | ELLIPSE ~67 (status dot 12/8), RECT small 19 (switch-on track 32x16 r12), ICON 9 | SUCCESS / active status, switch on | 50:35, I1945:2753;89:123, 3396:7325 |
| Green 2 (direct primitive) | #2BDF68 | TEXT ~302, ICON ~302 | Positive PnL / up-values (blotter, widgets) | 4243:15905, 3107:7196 |
| Red 2 | #FD7557 | TEXT ~504, ICON ~284; stroke 1px on Outlined red | Negative PnL / down-values; Outlined red "Review (n)" button | 3631:4872, 3107:7241, 6113:14392 |
| Purple 2 | #39394E | INSTANCE small ~17, RECT small ~32, COMPONENT small | Transparent-purple button fill (rates button, Button transparent 92x32), selected row highlight (424x62), hover fill of Outlined purple | 3107:7138, 3657:4719, 4255:16172, 4398:15477 |
| Purple 3 | #7373BB | TEXT ~77 | Panel section headings ("Trading Accounts" Medium 18, "Option Premium") | 3648:7585, 3788:4593, 4255:16173 |
| blue | #60A8FF | TEXT 15; stroke 1px on Outlined blue | Breadcrumb root link (underlined Medium 18 "Entities"), Outlined blue "Give-Up" button | 3648:7448, 6113:14385 |
| yellow | #FEE274 | TEXT 4; stroke | "DEV" env tag, Outlined yellow button | 6984:14478, 6113:14387 |
| red dark #392C2D / blue dark #2A313D / yellow dark #3A3730 | | COMPONENT/RECT | Hover fills of Outlined red/blue/yellow; red dark also a row highlight (6038:14434 is Green dark) | 6113:14389, 6113:14403, 6113:14410, 6113:14392 |
| Green dark | #264342 | RECT huge 2 (1368x27) | Row highlight (Trades widget) | 6038:14432 |
| Grey 4 direct | #BABEC7 | ICON 3 | arrows | 6234:15097 |

Selected / hover roles: row highlight = Purple 2 #39394E (424x62 card row) or Separators (1382x41 table row 3 on Static Clients 62:74); selected tab = 2px Primary purple bottom stroke (+ fill Grey 2 #171719 when "Hover").

### 2c. Raw (UNBOUND) colours (fills "f:", strokes "s:"), counts
- f #000000 vector 421 (flag/union glyph in Group 93, I1945:2556;100:316) + TEXT 60 (I5580:14630;19:8, button labels not bound) + COMP 1
- f #FFFFFF vector 223 (menu-tab glyph 3107:8346), TEXT 1 (2277:1380 "Log Out"), FRAME 1 (6807:14782)
- f #FFDC51 vector 48 (3107:6487), BOOL 2, TEXT 1 (3107:6492 "Ungrouped trade"), FRAME 1 (5465:14281) -> yellow warning icon colour
- f #FFB800@0.15 RECT huge 32 (blotter row tint 1384x29, 3107:6202), FRAME 1 (DEV tag 6984:14477)
- f #30F0D6@0.15 RECT huge 16 (blotter row tint 1384x57, 3107:6201)
- f #242432 RECT huge 17 (3107:6203, 1384x27 row)
- f #000000@0.5 RECT 19 (Rectangle 29 1384x1022, modal scrim 5580:14625, 5587:14672, 5535:14450, 5539:15429)
- f #39393C@0.8 RECT 1 (3107:6415, stroke Grey 3 1px OUTSIDE)
- f #00FEA9 TEXT 18 + s #00FEA9 w1 INSTANCE 16 (green outlined button "Button transparent" 3107:7139) ; hover f #1B5244 (4398:15501); disabled s Secondary text
- f #FFFFFF@0.2 (hover overlay on Button transparent/status, 4398:15494), @0.3 (Cancel disabled 4398:15347, Purple hover 4398:15433, Trash hover 4398:15427), @0.4 (New/Add hover 4398:15340, With dropdown hover) -> white overlay as 2nd fill layer
- f #FFBF8E (Edit hover pencil, I4398:15368;62:189)
- f #5A3834 (Outlined red "active" 6136:14340)
- f #392C2D (6113:14392 instance; equals red dark value)
- f #264A35 (csv component 6804:14832), f #2BDF68 TEXT 1 / BOOL 1 (csv), f #000000@0.2 (6804:14834)
- f #2BDF68@0.2 / @0.1 / @0.05 ELLIPSE (Animation rings "c","b", 4398:15292/15291/15288)
- f #30F0D6@0.4 pie2 202x202 and f #A4A4FF@0.4 pie1 169x169 (donut charts 5922:13776/13775)
- chart line colours: #3CC3DF, #8979FF, #FF928A (strokes w1 on EllipseLine 8x8 5922:13812/13866/13839 and lines 5922:13809/13863/13836; fills on legend lines 16x2 5922:13906/13912/13918)
- s #9747FF w1 INSIDE dash 10-5 (component-set outline default, 24 uses, Figma artefact; ignore)
- s #000000 w1.5 OUTSIDE (deselect-all tick line 62, I3107:6501;2936:4526), s #000000 w1 (6802:14829)
- logo: f #3B3B5C (7067:14472); f #FFCF00 / s #FFCF00 w0.5 (2592:2931 scratch)
- Flag colours (#012169, #C8102E, #002664, #BC002D, #CE1126, #ED2939, #FCD116, #0038A8, #BD3D44, #192F5D ...) are flags: ignore.

---------------------------------------------------------------------------------------------------
## 3. TYPE SCALE

Families found: Nunito only (Regular, Medium, SemiBold, Medium Italic) in the system; ONE stray `Inter Regular 12` (6802:14831, "CSV" in csv component, off-system). No other families. No Bold/Light/Black weights exist. ALL tuples: line-height AUTO (Nunito ~1.364 x size), letter-spacing 0%, no textCase change (ORIGINAL), leading-trim CAP_HEIGHT, alignment LEFT / CENTER / RIGHT (right-aligned numerics: 4,231 + 185 nodes; centered 1,850+77+18+6; left 3,824+64+16).
Tuple key: family style | size | decoration. Cap-box height shown (h=).

| # | tuple | count | colours (count) | typical parents / role | samples (ids) |
|---|---|---|---|---|---|
| 1 | Nunito Medium 12 (h8) | 6,855 | Primary text 4,949; Secondary 769; Red 2 494 | TABLE CELLS in Trades Blotter / widgets (Group parents 4,878; "Trades" 1,643; "Blotter" 242), PnL numbers (Red 2 / Green 2) | 3648:7591, 4250:17424 |
| 2 | Nunito Medium 14 (h10) | 1,692 | Primary 981; Secondary 517; Light grey 102 | Admin table cells (Primary: 17:111.. headers in Secondary "Client","Name"), active tab label ("Client" Primary), table header | 22:4, 17:111, 14:96 |
| 3 | Nunito Regular 14 (h10) | 559 | Primary 254; Secondary 223; Light grey 41 | INPUT value (Primary "Text"), PLACEHOLDER ("Search" Secondary), inactive TAB label (Light grey "Market makers"), dropdown option | I89:52;52:43, I50:193;50:170 |
| 4 | Nunito Regular 12 (h8) | 416 | Secondary 326; Primary 58; Light grey 21 | FIELD LABEL above inputs ("Label","City","Time"), ERROR message (colour Red #FF7272) | I1530:1768;88:22, 4398:15336 |
| 5 | Nunito SemiBold 14 (h10) | 248 | Black 123 (var+raw); Primary purple 45; Add New | BUTTON label (Add New / Cancel / Save Changes / Button): black on filled buttons, purple on outlined | I29:47;19:8, 4398:15513.. |
| 6 | Nunito Medium 16 (h11) | 218 | Primary 93; Light grey 68; Secondary 50 | Detail values (ID "B4TYDEB6GKMZO031MB27" Light grey), Activity rows | 3648:7514 |
| 7 | Nunito Regular 16 (h11) | 64 | Primary 26; Purple 3 21; Primary purple 6 | Product-type rows ("Spot","Forwards"), "Product Permissions"/"Total limit" captions (Secondary) | 3661:4869, 4031:18561 |
| 8 | Nunito Medium 18 (h13) | 58 (+13 underlined, see 11) | Primary 27; Purple 3 20; Light grey 10 | MODAL TITLE ("Edit Cut", "New Prime Broker"), panel section heading (Purple 3 "Trading Accounts"), breadcrumb current segment (Light grey "Bank of America") | 276:273, 3648:7585, 3648:7501 |
| 9 | Nunito SemiBold 12 (h8) | 42 | Primary purple 10; Red 2 10; BG 7 | SMALL (24px) BUTTONS: Outlined red "Review (12)", Outlined blue "Give-Up", status, tiny Cancel 48x20 | I3661:4811;29:106, 6113:14386 |
| 10 | Nunito SemiBold 18 (h13) | 40 | Primary 39 | LIST ITEM TITLES in cards ("RBS", "HSBC") | 3648:7586 |
| 11 | Nunito Medium 20 (h14) | 38 | Primary 38 | PAGE TITLE in top bar, at x24,y21 ("Statics","Entities","Dashboard" is 16, see below) | 4:9, 4031:18483 |
| 12 | Nunito Medium 18 UNDERLINE | 13 | blue 11; Primary purple 2 | BREADCRUMB root LINK ("Entities") | 3648:7448 |
| 13 | Nunito Medium 24 (h17) | 11 | Primary 11 | ENTITY / person HEADING ("Bank of America", "Max Shepley") | 3648:7453 |
| 14 | Nunito Medium Italic 10 (h7) | 6 | Secondary 6 | ID Status timestamp / retry note ("10 Oct 2024 15:36") | 3396:7318 |
| 15 | Nunito Medium 14 UNDERLINE | 6 | Secondary 5; Primary purple 1 | Chart time-range chips "1D","1M" (selected = Primary purple) | 5922:13927 |
| 16 | Nunito Regular 18 | 4 | Primary | Login headings ("Reset your password", "Email Sent!") | 2192:1795 |
| 17 | Nunito Regular 8 (h6) | 3 | BG | micro Cancel 32x12 label | I3556:3765;29:106 |
| 18 | Inter Regular 12 | 2 | Active / #2BDF68 | csv component only (stray) | 6802:14831 |
| 19 | Nunito Regular 12 UNDERLINE | 2 | Primary purple | "Forgot Password?" link (login) | 2211:1846, 2211:1952 |
| 20 | Nunito Regular 13 | 1 | Secondary | "Assignment" (outlier) | 6984:14488 |
| 21 | Nunito Regular 20 | 1 | Secondary | "(RBS EDGE BOA)" (outlier) | 6933:14801 |
| 22 | Nunito SemiBold 16 | 1 | yellow | "DEV" tag | 6984:14478 |

Also seen in geometry dumps: Dashboard widget header title is Nunito Medium 16 Primary text ("Dashboard" 4243:16273, @20,18). Multi-line texts exist (Regular 14 boxes 48/67/86 tall, Regular 12 24 tall).

---------------------------------------------------------------------------------------------------
## 4. RADII, STROKES, SHADOWS, OPACITY

### Radii (distinct; counts exclude flags; "MasterFlag 22x16 r2" 1,909 uses are FLAGS - ignore)
| value | uses | element |
|---|---|---|
| 4 | ~600 | Search/Dropdown/Input boxes 32px high (372 + ...), New/Add + Cancel buttons (174), Rectangle 13/14 cards (424x293 r4, 186x68 r4), tooltips (r4 140x32), top-bar Frame 25/26 buttons 32x32 on Widgets (r4), Frame 173 836x400 (r4) |
| 3 | ~100 | Outlined purple / Button transparent / With dropdown / status buttons (74-156 x 24/32), Rates buttons 91x32 |
| 2 | ~60 | Checkbox 16x16, Outlined red/blue/yellow 24px buttons, small Cancel 48x20, Rectangle 24 24x24 sidebar tile |
| 12 | ~190 | Modal frames (Edit Cut 303x217, Login card 312x388), chips 82x24, switch track 32x16 (r12), scrollbar thumbs 8/4 wide |
| 16 | ~50 | Circle icon buttons 32x32 on blotter (Frame 25 3107:7140), scrollbar thumb 4x102 |
| 8 | ~130 | Widget panels (Activity 1070x461, Trades/Prices 910 high), Rates Widget 290x794, Total Limit 146x95 |
| 8/8/0/0 | 90 | Activity tab header 97x32 (3631:4675) |
| 16/0/0/0 | 33 | Content canvas "Frame 3" 1384x1024 (4:7) - top-left only |
| 4/4/0/0 and 0/0/4/4 | 21 / 12 | card header (424x45) / footer (283x48) |
| 4/0/0/4 | 15 | segmented buttons 83x32 (5842:17252) |
| 20 | 1 | Chip 188x32 (7047:14817) |
| 32 | 2 | Frame 26 32x32 (5465:14281) circular |
| 5 | 24 | Animation component set wrapper (ignore) |
| 35.61 | 18 | scrollbar thumb artefact (3769:6512) |

### Strokes (colour | weight | align | class : count -> role)
- Separators #39393C | 1 | CENTER | line (ICON) : 1,421 -> table row/section divider lines (e.g. 17:128 1384x0)
- Separators | bottom only 1 | INSIDE | FRAME huge 33 -> top bar bottom border (4:8 Frame 4 1384x56, `w t0 r0 b1 l0`)
- Separators | top only 1 | INSIDE | FRAME huge 33 -> footer strip top border (546:320 Frame 8 1384x46)
- Primary purple | bottom only 2 | INSIDE | Tabs (active/hover): 102x42 -> tab underline
- Primary purple | 1 | INSIDE | Outlined purple buttons (r3), rates 91x32, radio 16x16 ellipse, Rectangle 25 172x32
- Primary purple | 1.5 | CENTER | chevron/arrow vectors (8x4); 4.17 INSIDE on search-icon vector 16x16 (I89:52;52:42); 1.3 CENTER chevrons on status/dropdown
- Light grey text | 2 | CENTER | close/“X” vector 10x10; 1.3 CENTER dropdown chevron
- Secondary text | 1 | INSIDE | search-with-label input border (I2696:2698;89:47), disabled outlined buttons, Rectangle 25 172x32
- Edit #FF9747 | 1 | INSIDE | orange outlined rectangle 172x32 (5842:17592)
- Add New #30F0D6 | 1 | INSIDE | Button transparent 156x32 (3769:6515); Green stroke ellipse pie2
- delete #FF7272 | 1 | INSIDE | ERROR input border (Input Error, I5535:14753;848:734)
- Red 2 #FD7557 | 1 | INSIDE | Outlined red buttons
- blue #60A8FF / yellow #FEE274 | 1 | INSIDE | Outlined blue / yellow buttons
- #00FEA9 | 1 | INSIDE | green outlined buttons (raw)
- Modal BG | 1 | CENTER | divider lines in Edit Client (2514:2882 283x0)
- Separators | 1 | CENTER | dash 2 | xLines chart grid (5922:13793 776x0)
- Separators | 1 | INSIDE | unchecked checkbox border (deselect all, 4398:15511)
- Grey 3 #707079 | 1 | OUTSIDE | Rectangle 11 1384x87 (3107:6415)
- Black #000000 | 1.3 CENTER (With dropdown chevron); raw #000000 1.5 OUTSIDE tick line
- #9747FF dashed 10-5 | 1 | INSIDE | component-set outlines (ignore)
- Chart series strokes #3CC3DF / #8979FF / #FF928A w1.

### Shadows / effects (all 10 distinct effects; Figma has 1 local effect style)
| effect | uses | sample node ids | role |
|---|---|---|---|
| DROP_SHADOW #000000@0.25 x0 y4 blur4 spread0 | 50 | 3631:4905, 4243:16268, 4250:17624, 6038:14413 | scrollbar thumb (Rectangle 20, 4px wide) |
| DROP_SHADOW #000000@0.4 x-1 y2 blur4 spread0 | 34 | 2277:1379, 3107:6491, 4402:16433, 7069:14810 | tooltip, user menu, widget dropdown popovers |
| DROP_SHADOW #005F20@0.5 x-1 y1 blur3 spread0 | 21 | I1945:2753;89:124, I2514:2873;89:124 | switch thumb (ON) |
| BACKGROUND_BLUR radius 10 (no colour) | 19 | 5580:14625, 5587:14672, 5535:14450, 5539:15429 | modal SCRIM (with #000000@0.5 fill, 1384x1022) |
| DROP_SHADOW #000000@0.25 x0 y-4 blur4 spread0 | 15 | 2514:2888, 3661:4968, 3769:8734, 5580:14584 | modal footer (Frame 20 294x48 / 283x54), upward shadow |
| DROP_SHADOW #000000@0.25 x0 y11.870683670043945 blur11.870683670043945 spread0 | 9 | 3769:6512, 7022:14503, 5580:14621, 5587:14668 | scroll thumb (tall variant, 308) |
| DROP_SHADOW #000000@0.5 x-2 y2 blur4 spread1 | 9 | 6457:14743, 3107:6489, 3107:6493, 3107:7161 | Total Limit popover 146x95, tooltip, Right Click menu 183x120, Rates Widget |
| DROP_SHADOW #515151@0.5 x-1 y1 blur3 spread0 | 4 | I4164:14405;89:151, 4398:15408, 4398:15417 | switch thumb (OFF) |
| DROP_SHADOW #000000@0.4 x-4 y0 blur6 spread0 | 1 | 1253:2360 | Filters side panel (Trades Blotter) |
| DROP_SHADOW #000000@0.5 x-2 y2 blur4 spread0 | 1 | 1971:2821 | dropdown list 158x118 (Statics) |

### Opacity
- Node-level opacity < 1: NONE in Section 3.
- Paint-level opacity: @0.15 (#FFB800, #30F0D6 row tints), @0.5 (#000000 scrim), @0.8 (#39393C), @0.2/0.3/0.4 (white hover overlays), @0.4 (pie fills), @0.2/0.1/0.05 (#2BDF68 rings), @0.2 (#000000 csv).

---------------------------------------------------------------------------------------------------
## 5. SPACING & GRID

Layout grids: none (0 nodes carry layoutGrids; 0 grid styles). Auto layout is used on 909 of 4,090 frames/components/instances; screens and panels are absolutely positioned.

### Top auto-layout tuples (dir gap, pad T/R/B/L, main/cross alignment; count; sample)
1. H gap8 pad 8/12/8/8 SPACE_BETWEEN/CENTER x167 - Frame 9 81x32 (I1539:1789;1539:1784) (Time input)
2. H gap10 pad 11/24/11/24 CENTER/CENTER x122 - New/Add 109x32 (29:47) (primary button 32px)
3. H gap8 pad 8/12/8/8 MIN/CENTER x110 - Frame 9 138x32 (I267:160;89:47) (dropdown)
4. H gap10 pad 12/24/12/24 CENTER x90 - Frame 16 97x32 (3631:4675) (Activity tab)
5. H gap8 (counterAxisSpacing 8) pad 12/24/12/24 x79 - Tabs 100x32 (3631:4687)
6. H gap8 pad 11/24/11/24 x64 - Button transparent 156x32 (3769:6515)
7. H gap8 pad 8/8/8/8 MIN/CENTER x64 - Search Frame 8 208x32 (I89:52;52:41)
8. H gap1016 pad 8/12/8/12 SPACE_BETWEEN x33 - footer Frame 8 1384x46 (546:320)
9. H gap8 pad 11/20/11/24 x24 - With dropdown 154x32 (6882:15034)
10. H gap10 pad 11/16/11/16 x18 - tooltip 145x32 (3107:6489)
11. H gap8/8 pad 16/32/16/32 x18 - Tabs 102x42 (50:189) (admin tab, 42px)
12. H gap10/10 pad 12/8/12/8 MIN x16 - Frame 180 592x72 (3769:6487)
13. H gap0 pad 0 x15 - Purple (button wrapper) 216x32 (2211:1838)
14. H gap8 pad 8/4/8/8 SPACE_BETWEEN x12 - Frame 9 267x32 (2514:2890)
15. H gap8 pad 11/20/11/20 x9 - Outlined purple 74x24 (4250:17592)
16. H gap10 pad 11/12/11/12 x7 - Cancel 48x20 (3661:4811)
17. H gap8/8 pad 16/32/16/32 MIN/CENTER x7 - Tabs 94x42 (4164:14520)
18. H gap4 pad 11/16/11/16 x6 - Outlined red 100x24 (6113:14392)
19. H gap8 pad 4/8/4/8 MIN/CENTER x6 - Chip 82x24 (I1945:2556;100:312)
20. V gap0 pad 0 MIN/MAX x6 - xLabelBox 123.33x16 (5922:13891)
21. H gap10 pad 11/20/11/20 x4 - New/Add 80x24 (4250:17593)
22. H gap10 pad 11/8/11/8 x3 - Cancel 32x12 (3556:3765)
23. H gap4 pad 4/4/4/4 x3 - Legend 93x24 (5922:13904)
24. H gap8 pad 11/16/11/12 x3 - rates 91x32 (3107:7158)
25. H gap8 pad 11/16/11/16 x3 - Outlined purple 99x24 (7022:14510)
26. H gap4 pad 4/8/4/8 MIN/MIN x2 - Frame 9 209x32 (I2767:2722;100:229)
27. H gap4 pad 7/8/7/8 x2 - Property 1=Default 61x24 (6804:14832)
28. H gap8 pad 11/16/11/20 x2 - With dropdown 112x24 (4255:16182)
29. H gap8 pad 8/12/8/12 MIN/CENTER x2 - Frame 9 216x32 (I2211:1837;89:47)
30. H gap8/8 pad 4/8/4/8 x2 - Chip 82x24 (I1945:2556;100:349)
31-40 (single): MainChart 808x368 gap0; xAxis 769x24 pad 0/0/8/29; yLines 778x368 pad 6/1/6/1 SPACE_BETWEEN; Property 1=hover 134x32 pad 11/20/11/24; Frame 9 186x72 gap 2/12 pad 8 (chips); LineLegends 322x24 gap8 pad 0/8/0/8; Chip 188x32 pad 4/8/4/16; yAxisLeft 30x368 pad 0/4/0/4; xLines 778x368 pad 6/1/6/1.
Pattern: control padding = 11px vertical (32px) / 11px (24px) with 24 (32px buttons) or 16/20 (24px) horizontal; input padding 8/12/8/8 (dropdown with chevron) or 8/8/8/8 (search/icon); gap 8 inside inputs, 10 inside filled buttons, 8 inside outlined buttons.

### Fixed control sizes (instances; count; id)
- Button 32px high: New/Add 91 / 95 / 109 / 139 x32 (131 total), Cancel 92x32 / 84x32 / 48x20(20px), Outlined purple 88x32, With dropdown 132x32, Button transparent 102x32, rates 91x32, Edit icon button 32x32 (r4), Tabs 100-132x32 (Activity) or 42 high (admin)
- Button 24px high: Outlined purple 74/99x24, New/Add 80x24, 77x24, Outlined red 100x24, Outlined blue 86x24, Outlined yellow 74x24, status 96x24, Chip 82x24
- Input 32px high / with label 44px: Search 205/208x32; Dropdown 158/203/242/256/78/67x32; Input 144/161x32; Input with label / Dates / Dropdown with label / Search with label 172x44 (also 158/186/209/216/237x44); Input Error 158x56; Time 89x44; Password 216x44; Chips 186x44 (Chips with few rows 186x84)
- Checkbox 16x16 (also 16.68-16.93 artefacts), Radio 16x16 (inner dot 8x8), Switch 32x16 (thumb 12x12), Switch with text 80x16, deselect all 38x16, icons 24x24 (Settings, Menu tab), edit icon 20x20, trash vector 18x18, search icon 16x16, status dot 8x8 / 12x12, password dot 6x6
- Scrollbar: 4px wide thumb (r12/16) or 8px; track 4px/8px

### Shell geometry (read directly)
**1440x1024 screen** (Static Clients 1:2; same in Entity 3648:7418, Reports 6878:14782, Blotters 2281:1414, Widgets 4243:15535)
- Sidebar "Frame 1" @0,0 56x1024, fill Menu bar #39393C. Icons 24x24 at x16; y = 72 (Menu tab), 128 (Subtract/tab), 184 (csv), 240 (deleted trades), 296 (entities) => pitch 56, first at 72; Settings at y984 (= H-40, 16 from bottom).
- Logo tile "Frame 2" @0,0 72x56 fill Primary purple (extends 16px under the canvas corner); inner Frame 5 56x56, logo group @12,8 32x40. (Widgets frame variant: Frame 2 74x48 / Frame 5 56x48.)
- Content canvas "Frame 3" @56,0 1384x1024 fill BG #000000, corner radius 16/0/0/0 (top-left).
- Top bar "Frame 4" @0,0 1384x56, bottom stroke 1 Separators (inside); page title Nunito Medium 20 Primary text @24,21 (box 14 tall); user icon 32x32 @1336,12 (right margin 16). Widgets dashboard variant: header 1384x48, title Medium 16 @20,18.
- Toolbar row (Static Clients): tabs 42 high @y62, buttons/search 32 high @y64: Search 208x32 @1035,64; New/Add 109x32 @1259,64 (right margin 16 = 1384-1368); user menu Frame 23 134x40 @1234,48 (shadow).
- Breadcrumb row (Entities screens): Medium 18 @24,73 (blue underlined root, Light grey/Purple segments, chevron vectors 8x14 between at x85/x93 etc.). Chevron is 8x14.
- Content panel "Frame 7" @0,104 1384x919 fill BG Grey 1 #171719 (Statics) | Blotters 3107:6695 @0,104 1384x920 | Reports Frame 7 @0,56 1384x968.
- Table: header text Medium 14 Secondary at y16 within Frame 7; row separators 1px at y42, 84, 126 (pitch 42); row text y58/100; first-column text x30 (index) / x61; highlighted row rect @1,84 1382x41 Separators; scrollbar thumb 8x815 @1368,50 (r12).
- Footer strip "Frame 8" @0,873 1384x46 (bottom of panel) fill BG Grey 1, top stroke 1 Separators, AL H gap1016 pad 8/12/8/12.
- Entities screens (1440): cards x24 w424: Rectangle 15 @24,204 424x293 Modal BG r4; header Rectangle 16 @24,204 424x45 Inputs on modal; Rectangle 17 @24,521 424x107; heading "Bank of America" Medium 24 @24,24; section heading Purple 3 Medium 18 @24,175; item title SemiBold 18 @48,220; ID Medium 16 @54,65.
- Modal screens (Add Permissions, New Entity, etc.): scrim Rectangle 29 1384x1022 #000000@0.5 + BACKGROUND_BLUR 10 over the blurred screen.
- Modal frame metrics: Edit Cut 303x217 r12 Modal BG, title Medium 18 @119,24, inputs 134x44 @32,85, buttons Cancel 92x32 @32,161 + New/Add 139x32 @132,161 (8 gap, 32 left inset); New / Edit prime broker 472x217; Login card 312x388 r12 @532,304 with 48px inner inset, inputs 216x44 @48,152 / @48,220, primary button 216x32 @48,324, "Forgot Password?" Regular 12 underline @167,272, logo @130,38.5 (52x61.3).
- Widgets: Trades 1070x910 @8,56 r8 Modal BG; Prices 290x910 @1086,56 r8 (gutter 8 between, margins 8); tooltip 191x32 @0,954; dashboard Dropdown 203x32 @1117,8.

**1280x1040** (4164:14303): sidebar 56x1040 (Settings @16,1000); canvas Frame 3 @56,0 1224x1040 (BG, r16 TL); top bar 1224x56; breadcrumb Medium 18 @16,73 ("Entities" Primary purple 61x13; chevrons 8x14 at x85, x243; "Bank of America" @101 Primary purple; "RBS EDGE BOA" @259 Light grey); panel Frame 7 @0,104 1224x935. (Left margin 16 here vs 24 on 1440/1920.)

**1920x1080** (4031:18455): sidebar 56x1080 (Settings @16,1040); canvas Frame 3 @56,0 1864x1080; top bar 1864x56, title Medium 20 @24,21, user icon @1816,12; breadcrumb @24,73 (root "Entities" blue Medium 18; "Bank of America" Light grey @109; chevron vector 8x14 @93,73); panel Frame 7 @0,105 1864x975 (note: 105, not 104); footer Frame 8 @0,929 1864x46. Content (inside Frame 7): heading "Bank of America" Medium 24 @32,24; "RBS EDGE BOA" Medium 20 @552,24; section heading Purple 3 18 @32,140; cards x32 w424 (Rectangle 15 @32,169 424x293; Rectangle 16 header @32,169 424x45; Rectangle 19 selected row @32,338 424x62 Purple 2; Rectangle 17 @32,486 424x107; Rectangle 18 @32,486 424x45); vertical divider Line 4 @512 (929 long, 1 Separators); right column x552: Cancel 48x20 @552,53; Group 194/193/192 273x48 @552,133/205/281; Frame 173 993x400 @552,388 Modal BG r4; "Product Permissions" Regular 16 Secondary @552,369; Group 121 262x260 @864,85; Group 150 379x244 @1166,101; buttons Cancel 84x32 @552,836 (fill Cancel Button r4) and New/Add 139x32 @1406,836 (Primary purple r4); Switch with text 80x16 @1337,32, Group 152 @1465,32; Staging Status Regular 12 @699,283; "Default Booking Recipient" Regular 12 Secondary @1168,85; "Total limit $100m" Regular 16 @1368,367 with Edit 24x12 @1521,366. Left column w424 + gap 96 (456->552) is a literal read; right column ends at x1545 of 1864 (not stretched).

Margins summary: sidebar 56; top bar 56 (48 on widget dashboard); toolbar/content margin left 24 (16 on 1280 breadcrumb), right 16; Frame 7 begins y104 (105 on 1920); footer strip 46; modal inset 32 (login 48); panel gutter on widget dashboard 8; table row pitch 42.

---------------------------------------------------------------------------------------------------
## 6. GAPS / UNSPECIFIED IN FIGMA (only what was actually searched)

Searched: node names (regex hover|focus|press|disabled|error|tooltip|toast|snack|skeleton|loading|empty|selected|warning|success|spinner|progress|pagination|badge|overlay|backdrop|scrim|state|hint|helper|placeholder|validation|invalid|notification|alert) over all non-instance nodes of Section 3 (excluding numbered Group/Frame/Rectangle names), all Assets component/variant names, fill/stroke/effect tallies, layout grids and styles.

PRESENT:
- hover: New/Add (fill Add New + white@0.4), Purple primary (white@0.3), Tabs (fill Grey 2 + purple underline), Edit (#FFBF8E icon), Trash (white@0.3), Outlined purple (Purple 2 fill), Button transparent (Purple 2 + white@0.2 + purple stroke), green transparent (#1B5244 fill), With dropdown (white@0.4), status (white@0.2), Outlined red/blue/yellow (red dark / blue dark / yellow dark fills).
- disabled: New/Add, Cancel (two variants), Purple, Outlined purple, With dropdown, Button transparent (both), Outlined red, status: disabled = fill Secondary text #707079 (or stroke Secondary text for outlined) with Light grey text #BABEC7 label.
- active/pressed-like: Outlined red "active" fill #5A3834; Tabs Active; Radio true; Checkbox checked; Switch true.
- error: Input Error 158x56 (border delete #FF7272 1px, "Error message" Regular 12 Red #FF7272), Log In Error screen 2211:1835.
- tooltip: "tooltip" frames (18x): fill Inputs on modal, r4, padding 11/16, height 32, shadow 0.4; text Regular 14 Edit (warning) or Primary.
- modal scrim: #000000@0.5 + 10px background blur.
- popovers: dropdown list 158x118, Right Click menu 183x120, Total Limit 146x95.
- empty-state text: "Select a trading account" (Medium 16 Light grey, 3694:4517).

NOT FOUND (no node, no variant name, no style): keyboard FOCUS ring for any control (no focus variants, no focus stroke colour); PRESSED/active for filled buttons (only Outlined red has "active"); hover/selected for table rows (only a static highlighted row: Separators 1382x41 / Purple 2 424x62); hover for inputs/dropdown/search/checkbox/radio/switch (only Edit/Trash/buttons/tabs/Trash have hover); input focus/filled/invalid-on-Dropdown/Search; disabled inputs; toast / snackbar / notification; skeleton / loading / spinner / progress; pagination; badge/count pill (other than "(12)" inside Outlined red); alert/banner; dropdown OPEN state inside Dropdown component (only the standalone list 1971:2821); date-picker popover (Dates component is closed only); tooltips with arrow; scrollbar hover; light theme; mode variants (single "Mode 1"); text styles/effect style library; spacing/radius/size tokens (no number variables at all; only 39 COLOR variables); responsive tokens/breakpoints (only the 1280x1040/1440x1024/1920x1080 frames). Everything above must be extended later.

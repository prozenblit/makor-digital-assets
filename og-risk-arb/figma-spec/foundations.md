# OG Risk Arb — FOUNDATIONS (harvested from Figma file VlOfBG6fJt7ijm0iKasAMP)

Scope: page "final" (48:850) > SECTION "Section 1" (2496:2003) — 8,100 visible nodes, 20 hidden nodes skipped — plus page "components" (924:3460, 535 visible nodes).
All values are read via the Plugin API (colours converted 0-1 -> hex, no rounding of hex). Counts are for VISIBLE nodes only and INCLUDE nodes inside instances (so one component used 20 times counts 20x). Anything marked "(visual estimate)" is not API-read. Fractions like `1.2000000476837158` are float32 storage of `1.2`; quoted once as "1.2".

Legend for ids: `414:2723` = node id (open in Figma by id). Example format `id|name|WxH|parent`.

---------------------------------------------------------------------------------------------------

## 0. FILE-LEVEL FACTS (ground truth)

| Item | Value |
|---|---|
| Figma variables | NONE (0 local collections). Nothing is bound (`boundVariables` empty on every node; 0 nodes). |
| Local paint styles | NONE locally. BUT 14 REMOTE (library) paint styles are applied in Section 1 (see 1.1). Names resolved via `getStyleByIdAsync`. |
| Local text styles | 2: `Geist: Medium` (Geist 500, 12px, line-height AUTO, letter-spacing 0%, case ORIGINAL, deco NONE) and `Geist: Regular` (Geist 400, 12px, AUTO, 0%, ORIGINAL, NONE). **Applied to 0 of 2,756 text nodes in Section 1 (`textStyleId` empty on all)** — text is styled by raw properties. |
| Local effect style | 1: `Shadow` (id `S:b5f77b6be61583e40ab3180315a7366278b8fb56,`) — see 3.4. Applied to exactly 1 node in Section 1 (461:3415). |
| Grid styles | none |
| Pages | `final` 48:850 (3 sections: Section 1 2496:2003, Admin Internal 1895:17439, changes for Laura 2159:13682), `drafts` 0:1 (43 children), `components` 924:3460, **`final fonts 2px up` 2079:13698**, `test  ` 1676:3731 |
| IMPORTANT alt page | `final fonts 2px up` (2079:13698) is a duplicate set of screens (same names, Dashboard 2080:14202, Deal 2080:17137 …) where the type scale is +2px: dominant sizes there are Geist Regular 14 (1,892 nodes), Geist Medium 14 (1,405), Regular 12 (159), SemiBold 14 (158), SemiBold 12 (36), Medium 16 (73), Regular 18 (46), SemiBold 16 (11). Nav open there is 203 wide (vs 191 in Section 1). Section 1 (canonical per brief) uses 12 as the body size. DECISION NEEDED from owner: whether the 14px-body page supersedes Section 1. Only Section 1 + components were harvested in detail. |
| Colour #3B951A | NOT present in Section 1 or components. It occurs only in Admin Internal section (1895:17439), e.g. nodes `1895:18604|Agency/Event`, `1895:18616`, `1895:18627`, `1895:18703` (fill on "Agency/Event" cell elements — Admin Internal, not canonical Section 1). |
| Font families | Geist (Regular 400 / Medium 500 / SemiBold 600 / Bold 700) everywhere in UI chrome; Inter (Regular, Medium) only in the DAY calendar cell "Tags" (see 2.3); Times New Roman only inside the rich-text toolbar icons B/I/U/S (see 2.3). No monospace font anywhere. |

---------------------------------------------------------------------------------------------------

## 1. COLOUR PALETTE

### 1.1 Named palette (library paint styles actually applied in Section 1)
Resolved with `figma.getStyleByIdAsync` (all `remote: true`, i.e. from a team library — keys given so they can be matched).

| Style name | Hex | Used on (example node) | Role |
|---|---|---|---|
| White | `#FFFFFF` | 414:2723 Nav open | surface (screens, panels, nav, inputs, table body) |
| white (lowercase, 2nd style) | `#FFFFFF` | 721:2274 (Button Master "Month" text) | text on dark / duplicate of White |
| Grey 4 | `#F5F5F8` | 414:2723, 414:2765 | lightest neutral: subtle fill (table header, chips, search field), 1px divider colour |
| Grey 3 | `#E5E7EC` | 414:2898 (circle-x), 1612:4365 | neutral: panel/field borders, scrollbar track, hover fill (outline button), disabled text on dark |
| Grey 2 | `#A8B6CD` | 1541:3211, 838:2607 (scroll thumb) | tertiary: labels, placeholder-on-label, disabled stroke/fill, checkbox stroke, scroll thumb |
| Grey 1 | `#7C8DAC` | 1615:4421, 2044:6394 | secondary text and icons |
| Black | `#000000` | 414:2739 | primary text, outline icons (two separate Black styles exist: key `bf69f2c8…` and key `3ee38a90…` — both `#000000`) |
| dark green main | `#005268` | 414:2730 | brand: links, active nav, primary button, headings accent |
| Orange | `#FF8132` | 414:3020 | warning/alert accent: bell icon, "today" time, "Medium" priority, "Reset All"/"Edit Events" links |
| Green | `#179484` | 414:2810 | success/"new" accent: "New Event/Comment" labels, calendar icon, toggle ON |
| Red | `#DA4D43` | 824:8317 | error/"High" priority, password error, log-out icon |
| Green light | `#C1F0D5` | 824:8355 | "Definitive" status pill background |
| Icons gradient | GRADIENT_LINEAR stops: `#005268`@1 pos 0, `#1B9D83`@1 pos 0.361, `#3675D2`@1 pos 0.716, `#00C7CE`@1 pos 1 | 824:8268, logo 414:2726, noun-ai icons | brand logo + "AI" icon only (51 fills). gradientTransform = [[-0.476565420627594, 0.5128738880157471, 0.35574474930763245],[-0.4780420660972595, -0.43244510889053345, 1.0065633058547974]] (read on 414:2726 and 2044:6400) |

NOT named in Figma (raw un-styled colours, no style id): everything in 1.3-1.6 other than the rows above — notably the blue `#3675D2` family, yellow `#ECA100`, all deal-type/status pill colours, `#CAD8F4`, `#C1ECF0`, `#FBFBFC`, `#E2E2E2`, `#F7F7F7`.
Observation: one named style is applied but its paint opacity is changed on the node (e.g. dark green main @0.1) — opacity lives on the paint, never as layer opacity (see 3.5).

### 1.2 Neutrals + brand (fills) — every distinct SOLID fill in Section 1 (41 distinct fill keys; top rows)

| Hex@alpha | Count | Types | Role (derived from node names/sizes/parents) | Example nodes |
|---|---|---|---|---|
| `#FFFFFF` | 541 | FRAME 461, INSTANCE 69 … | Screen background (all 1920-wide screen frames are `#FFFFFF`); nav panel; table body/rows; Select/Input background; inactive tab; modal/popover card; top search bar | 414:2723 Nav open 191x1032; 414:2735 nav item 159x40; 414:2742 |
| `#F5F5F8` (Grey 4) | 246 | FRAME 219, INSTANCE 27 | Table header row (1720:6666 932x32); tab chips (414:2892 110x32 active tab); ticker tags "Tags" r4 h24; filter chips r16 h28 (1526:6279); search field bg (1567:4505 840x40); selected row (1720:6538) | 414:2765 Frame 154 163x40; 414:2892 Frame 120 110x32; 1526:6273 267x32 |
| `#005268` (dark green main) | 158 | VECTOR 76, FRAME 51, INSTANCE 9, ELLIPSE 20, RECT 2 | Icon fill (nav noun-icons, chevrons); primary button / pressed segment (1526:6274 129x32; Button instance 1720:6530 98x32 fill `#005268` + stroke `#005268`); checkbox/radio selected (754:2929 etc.) | 414:2730 noun-book 18x18; 414:2737; 414:2744 |
| `#E5E7EC` (Grey 3) | 117 | FRAME 88, RECT 29 | circle-x close icon backing 16x16 r16 (414:2898); scroll track (Scroll "Rectangle 6"); outline-button hover fill | 414:2898; 414:2902; 414:2906 |
| `#000000` | 64 | VECTOR 54, ELLIPSE 10 | icon glyphs (rich-text toolbar 1693:7123 …) | I1868:10167;1693:7123 |
| `#FF8132` (Orange) | 37 | VECTOR 37 | bell icons | 414:2815; 414:2876; 1720:6029 |
| `#DA4D43` (Red) | 36 | VECTOR 36 | flag/priority icons in Table Cell (Agency/Event) | 1720:6310; 1720:6322; 1720:6335 |
| `#3675D2`@0.1 | 35 | FRAME 35 | bookmark button bg 24x24 (1541:3226) & 32x32 (414:2831); date-badge frames 40.875x75 (414:2978 r5); "H"/"G" circle badges 24x24 r24 | 1541:3226; 414:2978; 414:2831 |
| `#FEFEFE` | 34 | VECTOR 34 | Zoom logo glyph (non-system) | 414:3016; 414:3017 |
| `#3675D2` | 32 | BOOLEAN_OP 17, VECTOR 15 | Zoom logo (non-system) | 414:3015 "zoom logo" |
| `#7C8DAC` (Grey 1) | 31 | FRAME 22, INSTANCE 4 … | icon fills (chevrons, noun-book on collapsed state); checkbox disabled bg | 2044:6394 Union 14x14; 461:3434 |
| `#005268`@0.1 | 22 | FRAME 22 | ACTIVE nav item bg (414:2728 159x40 r4); active "All" filter chip (1526:6281 63x28 r16 + stroke `#005268` 1); active tab "All Deals" (1988:7529 `#FFFFFF`+`#005268`@0.1 layered, stroke `#005268` 1.5) | 414:2728; 414:2757 187x40; 1526:6281 |
| `#3675D2`@0.2 | 17 | FRAME 17 | "Join the meeting" button bg (layered over white), 132x32 (414:3013) | 414:3013; 414:3070; 414:3103 |
| `#A8B6CD` (Grey 2) | 15 | RECT 14, INSTANCE 1 | scrollbar thumb 4px wide r16 (I1526:6293;838:2607 4x435) | 414:3115 4x109; 414:2890 4x124 |
| `#CAD8F4` | 12 | FRAME 12 | Deal-type pill bg "Cash Merger"/"Financials" (824:8250 104x24) | 824:8250; 824:8538; 1720:6149 |
| `#3675D2`@0 | 12 | VECTOR 12 | fully transparent paint (hidden fill on bookmark/clip icon vectors, Table Cell (Description)) | 1988:6818 |
| `#FF8132`@0.1 | 10 | FRAME 10 | "today 12:45" time block bg (414:3019 74x32 r2) | 414:3019; 414:3076; 414:3109 |
| `#CC1515` | 10 | VECTOR 8, BOOL 2 | PDF file icon noun-pdf (non-system) | 1720:6183 |
| `#C1F0D5` (Green light) | 9 | FRAME 9 | "Definitive" pill bg; 86x24/32 | 824:8355; 1720:6147; 1720:6526 |
| `#FBFBFC` | 8 | FRAME 8 | expanded-row detail panel 1343x70 / 1343x54 (All Deals expanded) | 824:8263; 824:8299; 824:8335 |
| `#D9D9D9` | 5 | RECT 3, ELLIPSE 2 | calendar-icon fragments (Union) (non-system, default Figma grey) | 721:2657 |
| `#C1ECF0` | 6 | FRAME 6 | industry pill bg (Insurance / P&C Insurance / Reinsurance, 1720:6411 88x32) | 1720:6411; 1720:6413; 1720:6415 |
| `#179484` (Green) | 3 | RECT 3 | toggle track ON 32x16 r40 (1868:10445) | 1868:10445; 1868:10736 |
| `#3675D2`@0.05 | 2 | FRAME 2 | Events right-panel bg 420x897 (414:2969, 1720:5880) | 414:2969 |
| `#E2E2E2`@0.25 | 2 | FRAME 2 | comments side-panel bg 364x897 (414:2801, 1720:6015) | 414:2801 |
| `#E5E7EC`@0.2 | 1 | RECT 1 | MODAL BACKDROP 1848x1016 (461:3414) with BACKGROUND_BLUR 20 | 461:3414 |
| `#E5E7EC`@0.2 (+blur 20) | (same colour) | RECT | DRAWER BACKDROP 407x894 (1988:5751 Rectangle 36) | 1988:5751 |
| `#EE3329` | 1 | BOOL 1 | OG logo mark red (non-system) | 721:2656 |
| `#005268`@0.2 | 1 | FRAME 1 | 32x32 avatar/btn tint (824:8677) | 824:8677 |
| IMAGE fills | 5 | RECT | login-screen photo "59271 1" 1436x1436 / 1440x1440 scaleMode FILL (2159:13748, 2159:13763, 2159:13804, 2159:13820, 2159:13844) — illustration/photo, non-system | |
| GRADIENT_LINEAR | 51 | VECTOR/BOOL | logo + AI icon ("Icons gradient" style; see 1.1) | 414:2726 |

### 1.3 Status / deal-type / priority colour map (text colour = border-less pill, bg = text colour at the opacity shown)
Pill geometry (all): FRAME, auto-layout HORIZONTAL, padding T/R/B/L as listed, gap 10, radius 16, text Geist Medium 12 (auto line-height). Standard pill: height 24, padding 4/16/4/16. In Deal view / "Frame 169-171" variants: height 32, padding 8/16/8/16, text Geist Medium 12. New Deal form preview variants: height 24, padding 8/16/8/16, text Geist Medium **10**. Priority (Low/Medium/High) has NO bg — plain Geist Medium 12 text.

| Label | Pill bg fill | Text colour | Count | Example (pill frame / text) |
|---|---|---|---|---|
| Predeal | `#3090C0`@0.25 | `#3090C0` | 7 | 824:8247 / 824:8248 |
| Definitive | `#C1F0D5` (Green light, @1) | `#179484` | 5(+2 at h32, +2 at 10px) | 824:8355 / 824:8356; 1720:6147; 1868:10287 |
| Terminated | `#DC432B`@0.2 | `#DC432B` | 6 | 824:8283 / 824:8284 |
| Cash Tender | `#C6226C`@0.1 | `#C6226C` | 6 | 824:8286 / 824:8287 |
| Spinoff - Definitive | `#A752A9`@0.2 | `#A752A9` | 6 | 824:8427 / 824:8428 |
| Exchange Offer | `#36A30F`@0.2 | `#36A30F` | 6 | 824:8430 / 824:8431 |
| Proposal | `#30B2C0`@0.2 | `#30B2C0` | 5 | 824:8319 / 824:8320 |
| Stock Merger | `#7541A3`@0.2 | `#7541A3` | 5 | 824:8322 / 824:8323 |
| Dutch Auction | `#DC5E2B`@0.2 | `#DC5E2B` | 5 | 824:8358 / 824:8359 |
| Withdrawn | `#6074A0`@0.2 | `#6074A0` | 4 | 824:8391 / 824:8392 |
| Post-Event | `#ECA100`@0.2 | `#ECA100` | 4 | 824:8499 / 824:8500 |
| Cash-Stock Merger | `#4199A3`@0.2 | `#4199A3` | 4 | 824:8502 / 824:8503 |
| Investment | `#179475`@0.2 | `#179464` | 3 | 824:8394 / 824:8395 (note bg is `#179475`, text `#179464` — exactly as read; differs from `#179484` Green) |
| Did Not Happen | `#4C7794`@0.25 | `#4C7794` | 3 | 824:8463 / 824:8464 |
| Cash Merger | `#CAD8F4` (@1) | `#4162A3` | 6(+2 h32, +2 10px) | 824:8250 / 824:8251; 1720:6149; 1868:10289 |
| Financials (industry) | `#CAD8F4` | `#4162A3` | 2 | 1720:6406 / 1720:6407 |
| Insurance / P&C Insurance / Reinsurance (industry) | `#C1ECF0` | `#008D9A` | 2 each | 1720:6411-6416 |
| Not Available | `#F5F5F8` | `#7C8DAC` | 4 | 824:8466 / 824:8467 |
| Deal Status / Deal Type (empty-state placeholder pills, New Deal) | `#E5E7EC` | `#7C8DAC` Medium 10 | 1 each | 1868:10646-10649 (h24 pad 8/16/8/16 r16) |
| Priority High | none | `#DA4D43` Medium 12 | 14 | 824:8317 (Table Cell Agency/Event) |
| Priority Medium | none | `#FF8132` Medium 12 | 11 | 824:8281 |
| Priority Low | none | `#ECA100` Medium 12 | 16-20 | 824:8245 |
| Event status "Actual" / date text | none | `#3675D2` Regular 12 (and 10 in Deal table) | 60 | 414:3009; 1720:6681 |

Other pill-like elements (non-status):
- Active "All" filter chip: bg `#005268`@0.1, text `#005268` Medium 12, r16, h28, padding 6/24/6/24, stroke `#005268` 1 (1526:6281).
- Inactive filter chip ("Cash Deals", "Stock Deals", "Cash-Stock Deals", "Exchange Deals", "Spinoff Deals"): bg `#F5F5F8`, text `#000000` Regular 12, r16, h28, padding 6/4/6/16, gap 8 (close icon at right) (1526:6279, 1615:4379).
- Ticker/news "Tags" (inside calendar DAY): bg `#F5F5F8`, text Inter Regular 12 `#000000`, r4, h24, padding 3/4/3/4 (721:2298…).
- "View More" button inside DAY cell: bg `#3675D2`@0.1, text Inter Medium 12 `#3675D2`, r4, h24, padding 3/24/3/24 (721:2293;553:551).
- "Join the meeting": bg `#FFFFFF` + `#3675D2`@0.2 (two fills), text `#3675D2` Medium 12, r4, h32 (414:3013, padding 7/8/7/8 gap 4) or h24 in calendar (721:2574).
- Count badge: bg `#E5E7EC`, text `#7C8DAC` Geist Medium 10, 20x20, r24, padding 0/2/0/2 (1615:4378 etc.; counts "21","16","2","4","8").
- Circle avatar badges "G/H/I": 24x24 r24 bg `#3675D2`@0.1, text `#3675D2` Medium 14/16 (1541:3226/3227).
- Time block "today 12:45": bg `#FF8132`@0.1, text `#FF8132` Regular 10, r2, h32, padding 0/0/0/8 (414:3019/3020).
- New Event / New Comment / New Morning Note labels: text `#179484` Regular 12 (414:2811, 414:2828, 1608:4044).

### 1.4 TEXT colours (27 distinct keys) — role

| Hex@alpha | Count | Role | Examples |
|---|---|---|---|
| `#000000` | 1,600 | primary text (table cells, nav labels, headings) | 414:2739 "Closed Deals"; 414:2746; 414:2751 |
| `#7C8DAC` | 385 | secondary text (weekdays, counts, labels, placeholders in Search "Search" 1567:4505, "Risk Arbitrage" nav section label) | 1615:4421; 1615:4376; 1567:4505 |
| `#A8B6CD` | 256 | tertiary: input labels ("Label"), timestamps ("just now"), calendar day-letters, unselected letters, login placeholders | 1541:3211; 414:2976; 414:2812 |
| `#005268` | 199 | links (Medium 12 + UNDERLINE deal names), active nav label, section titles ("Conditions", "Deal Preview"), secondary button label | 414:2732; 1463:6149; 414:2766 |
| `#3675D2` | 117 | event "Actual" status, date digits in calendar, "Join the meeting", View More, URLs (Regular 10 UNDERLINE) | 1541:3227; 414:3009; 1720:6333 |
| `#FFFFFF` | 20 | text on dark green (primary button "New Deal", "Open Deals" active segment) | 1526:6275; 721:2274 |
| `#FF8132` | 20 | "Medium" priority, "today 12:45", "Reset All"/"Edit Events" (Medium 12 UNDERLINE) | 414:3020; 824:8583; 1720:6664 |
| `#ECA100` | 20 | "Low" priority | 824:8245 |
| `#4162A3` | 20 | "Cash Merger"/"Financials" pill text | 824:8251 |
| `#179484` | 15 | "New Event/Comment" | 414:2811 |
| `#DA4D43` | 15 | "High" priority; "Incorrect password" (Regular 10) | 824:8317; 1895:21137 |
| `#3675D2`@0.9 | 4 | avatar-badge letters "G","I" Medium 14 | 1541:3225 |
| `#000000`@0 | 6 | INVISIBLE placeholder text (alpha 0): "Target","Dividends" (1720:6423, 1720:6462, 1720:6469) |
| `#E5E7EC` | 1 | text on disabled/dark button: "Add New Deal" (I1868:10742;766:3219) |
| status text colours | — | as in 1.3 | |

### 1.5 STROKE colours (18 distinct keys in Section 1; stroke class + weight + align)

| Hex@alpha | Count | Weight / align (count) | Role / classes | Examples |
|---|---|---|---|---|
| `#F5F5F8` | 916 | right-only 1px INSIDE (673: cell separators); bottom-only 1px INSIDE (102: row separators); all-sides 1 INSIDE (52); right+bottom 1 INSIDE (42); 1 CENTER (27); other mixes | inner dividers: table row/cell borders (Table Row 1720:6677: bottom 1 `#F5F5F8`), nav outline (414:2723 stroke 1 `#F5F5F8`), inactive tab outline | 414:2723; 414:2752; 414:2894 |
| `#E5E7EC` | 885 | right-only 1 INSIDE (408 — table header cell separators, "0/1/0/0"); bottom-only 1 INSIDE (133 — header bottom border "0/0/1/0"); all-sides 1 INSIDE (151: panels, inputs, Select/Input); 1 OUTSIDE (20); right 1 OUTSIDE (105); left 1 INSIDE (43); 1.5 CENTER (20: circle-x glyph strokes) | panel and control borders, table container border (1720:6665 `#E5E7EC` 1 INSIDE r8) | 1612:4365 1784x929; 414:3117 952x48; 1463:6125 |
| `#005268` | 160 | icon strokes 0.2/0.4/0.5/1.2/1.5 CENTER (vectors); bottom 2-3 INSIDE (active tab underline "0/0/3/0" x8, "0/0/2/0" x5); all-sides 1 or 1.5 INSIDE (active tab chip / secondary button) | active tab outline (1988:7529 stroke `#005268` 1.5), outline-green button (1.2) | 414:2734; 414:2737 |
| `#000000` | 154 | 1 CENTER (124 vector icons); 1.5 CENTER (17); 1.2999999523162842 (1.3) (4); 1.2 INSIDE (3) | icon strokes; outline button stroke (1.2 INSIDE); selected row stroke (1720:6538 `#000000`) | 2044:6392; 414:2741 |
| `#FFFFFF` | 58 | 1.5 CENTER (44 icons), left 1 INSIDE (8: divider between active segmented-button halves 1526:6276), 4 INSIDE dash 10,10 (x2 on 2 SECTION nodes) | | 1526:6276; 414:3021 |
| `#A8B6CD` | 58 | all-sides 1 INSIDE (50 — checkbox 16x16 r2 / radio outline), 1 OUTSIDE (2), 1.5 INSIDE (3 — disabled button outline), 1.5/1 CENTER | checkbox unchecked border (754:2945 Frame 1000000909 16x16) | I824:8592;754:2945 |
| `#7541A3` | 52 | 1 CENTER | calendar icon in "Stock Merger" rows (non-system, type-coloured icon) | 824:8257 |
| `#3090C0` | 52 | 1 CENTER | calendar icon in "Predeal" rows | 824:8261 |
| `#FF8132` | 35 | 1 CENTER (33), 1 INSIDE (2) | bell icon strokes | 414:3022 |
| `#7C8DAC` | 22 | 1/1.2/1.5 CENTER | sort/chevron icons in Table Header Cell | 1615:4418 |
| `#3675D2` | 20 | 1 INSIDE (6 frames: bookmark button 414:2978 etc.), 1 CENTER (12) | | 1720:6155 |
| `#3675D2`@0.05 | 10 | 1 INSIDE | Events cards 388x132 (414:3002) | 414:3002; 414:3023; 414:3047 |
| `#179484` | 6 | 1 CENTER | calendar icon | 414:2810 |
| `#3675D2`@0.1 | 4 | bottom 1 INSIDE | right-panel header 420x48 (414:2970) | 414:2970 |
| `#DA4D43` | 3 | 1 INSIDE (Password input in error 1895:21136, 260x32), 1/1.2 CENTER icons | error input border | 1895:21136 |
| `#3675D2`@0.3 | 2 | 1 INSIDE | highlighted card 388x161 (414:3035) | 414:3035 |
| `#F7F7F7` | 2 | 1 INSIDE | comments panel 364x897 (414:2801) | 414:2801 |
| `#000000`@0.1 | 1 | 1 INSIDE | Section container itself (not UI) | 2496:2003 |

Components-page-only strokes: `#9747FF` (10, 1 INSIDE — Select/Input component-set frames: Figma's default component-set dashed boundary colour) and `#8A38F5` (4 — radio/checkbox set boundary): both are Figma editor chrome, NOT part of the design system.

### 1.6 Components page (924:3460) — complete distinct colours
Fills: `#F5F5F8` x59, `#E5E7EC` x40, `#FFFFFF` x33, `#005268` x15, `#000000` x6, `#3675D2`@0.1 x5, `#A8B6CD` x3, `#7C8DAC` x3, `#FFFFFF`@0.2 x1 (primary button HOVER overlay 766:3216), `#005268`@0.1 x1 (outline-green hover 836:2661), `#179484` x1 (toggle ON 1375:4128), `#ECA100`@0.2 x1 (yellow button default 2293:7995), `#ECA100`@0.35 x1 (yellow button hover 2293:7997), `#FF8132`@0.2 x1 (orange-outline hover 2293:8006).
Text: `#000000` 89, `#7C8DAC` 85, `#005268` 44, `#A8B6CD` 9, `#3675D2` 5, `#FFFFFF` 2, `#E5E7EC` 2, `#ECA100` 2, `#FF8132` 2.
No gradients, no effects, no images on the components page.

### 1.7 Non-system colours (flags / logos / illustrations / third-party) — do NOT put in the token set
`#FEFEFE` + `#3675D2` (Zoom logo, nodes named "zoom logo"), `#CC1515` (PDF icon noun-pdf-5435919), `#EE3329` (OG logo red mark 721:2656), `#D9D9D9` (default-grey icon fragments), gradient `Icons gradient` (brand logo / AI icon — brand asset, can be kept as an asset not a token), IMAGE fills (login photo "59271 1"), type-coloured calendar icon strokes (`#7541A3`, `#3090C0` = same hex as the status text colours of Stock Merger / Predeal), `#9747FF`/`#8A38F5` (Figma chrome).

### 1.8 Palette summary (for token naming, exact hex)
- Brand: `#005268` (dark green main); tints are the SAME hex at alpha 0.1 / 0.2 (never a separate solid hex).
- Neutrals: `#FFFFFF`, `#FBFBFC` (expanded-row bg, unstyled), `#F5F5F8`, `#E5E7EC`, `#A8B6CD`, `#7C8DAC`, `#000000`. (Also unstyled `#F7F7F7`, `#E2E2E2`@0.25 on the comments panel.)
- Blue (info/links/events): `#3675D2` (+@0.05/0.1/0.2/0.3/0.9). `#CAD8F4` bg + `#4162A3` text (Cash Merger/Financials).
- Orange `#FF8132`, Yellow `#ECA100`, Red `#DA4D43`, Green `#179484`, Green light `#C1F0D5`.
- Status/type families are listed in 1.3 (14 distinct hues).

---------------------------------------------------------------------------------------------------

## 2. TYPE SCALE (Section 1: 2,756 TEXT nodes, 90 distinct (font,size,lh,ls,case,deco,colour) tuples; 23 mixed-style nodes broken into segments)

### 2.1 Global facts
- Letter-spacing: **0% on every text node** (no exceptions).
- Line-height: **AUTO on every text node** except the calendar "Button Master" (Month/Week/Day) = **20px** (721:2264/2269/2274, Geist Medium 12). Measured auto line-box heights: Geist 10 -> 13, 12 -> 16, 14 -> 18, 16 -> 21, 18 -> 23, 24 -> 31 (ratio ≈ 1.3); Inter 10 -> 12, Inter 12 -> 15; Times New Roman 12 -> 14, 14 -> 16. (Fixed-height text boxes of 24/32/48 etc. also exist for wrapped paragraphs.)
- textCase ORIGINAL everywhere (no uppercase transform). Decoration: UNDERLINE (links), STRIKETHROUGH (rich-text "S" icon only), else NONE.
- Alignment: LEFT in tables, CENTER in nav labels/buttons.
- Text styles: none applied (see section 0).

### 2.2 Aggregate by (family style | size | decoration) — counts over all text colours
| Family style | Size | Deco | Count | Typical use |
|---|---|---|---|---|
| Geist Regular | 12 | NONE | 1,482 | table cells, inputs, body |
| Geist Medium | 12 | NONE | 409 | nav labels, tabs, status pills, priority, buttons |
| Geist Medium | 12 | UNDERLINE | 178 | links (deal names/ticker links) |
| Inter Regular | 12 | NONE | 129 | DAY calendar tag text |
| Geist SemiBold | 12 | NONE | 120 | table header labels ("Status","Agency/Event"), event titles in cards |
| Geist Regular | 10 | NONE | 93 | table cell date/comments in Deal table |
| Inter Regular | 10 | NONE | 63 | DAY calendar event text |
| Geist Medium | 10 | NONE | 54 | table header 10px variant ("Date","Actual"), count badges |
| Geist Regular | 16 | NONE | 54 | inputs with big text (day digits "07"), search text |
| Geist Medium | 14 | NONE | 48 | calendar day numbers, section sub-headings |
| Geist Regular | 14 | NONE | 30 | login inputs, avatar initials "SG" |
| Inter Medium | 12 | NONE | 23 | "View More" |
| Geist Bold | 12 | NONE | 13 | "$1.1B" emphasised values, bold segments in notes |
| Geist Medium | 12 (lh 20px) | NONE | 9 | calendar Month/Week/Day toggle |
| Geist SemiBold | 14 | NONE | 9 | document titles ("Merger Agreement Summary", 1720:6179), "Profile Information" |
| Geist Medium | 24 | NONE | 8 | login page "Risk Arb DB" |
| Geist Regular | 14 | UNDERLINE | 7 | "Forgot Password?" |
| Geist Medium | 16 | NONE | 5 | "Account Settings", date digits "06" |
| Geist Regular | 18 | NONE | 3 | "Forgot Password" heading |
| Geist Regular | 10 | UNDERLINE | 3 | URLs |
| Geist Medium | 14 | UNDERLINE | 2 | "All Deals" tab title |
| Geist Medium | 18 | NONE | 2 | deal header "SSTK / GETY" (segmented) |
| Geist Regular | 12 | UNDERLINE | 1 | |
| Times New Roman (Bold/Bold Italic/Regular U/Regular 14 S) | 12/12/12/14 | | 9 each | rich-text toolbar icon glyphs B / I / U / S only (non-system) |

### 2.3 Full tuple table (top 60 of 90; family style | size | line-height | letter-spacing | case | deco | colour -> count; sample strings; typical parent)
Format: tuple — count — sample strings — where.

1. Geist Regular 12 auto 0% ORIGINAL NONE `#000000` — 1,026 — "Stock Deals", "Cash Deals" — Table Cell (Agency/Event) 407, Table Cell (Description) 87, Checkbox labels 76
2. Geist Regular 12 `#A8B6CD` — 175 — "Thu", "just now" — Input labels (Input 44), Conditions (15)
3. Geist Regular 12 `#7C8DAC` — 171 — "Sat","Sun","Mon" — Checkbox disabled labels 38, Input 12, Table Cell (Status) 8
4. Geist Medium 12 UNDERLINE `#005268` — 144 — "AES/GIP/EQT Consortium", "AIV/", "ASCU CN/HBM CN" — Table Cell (Deal Title) 92
5. Geist SemiBold 12 `#000000` — 120 — "Federal Reserve Governors…" — Table Cell (Description) 52, Table Header Cell 21
6. Inter Regular 12 `#000000` — 117 — "AAUC CN / 2259 HK" — DAY/Tags
7. Geist Medium 12 `#7C8DAC` — 82 — "Fri","SSTK / GETTY" — Table Cell (Deal Title) 50
8. Geist Medium 12 `#000000` — 67 — "Closed Deals","History","Reports" — nav items, tabs
9. Geist Medium 12 `#A8B6CD` — 60 — "B","C","D" (letter badges 16x16) 
10. Geist Regular 12 `#3675D2` — 60 — "Actual" — Table Cell (Status) 51
11. Geist Regular 10 `#000000` — 47 — "04/19/2026","Actual" — Table Cell (Date) 25
12. Inter Regular 10 `#000000` — 43 — "MX COFECE Deadline for …" — DAY/Tags
13. Geist Medium 12 `#005268` — 39 — "Open Deals","All Deals" — active nav/tab
14. Geist Medium 10 `#000000` — 37 — "Date","Actual","Agency/Event" — Table Cell header 10px
15. Geist Medium 14 `#000000` — 36 — "1","2","3" (calendar day number) — DAY
16. Geist Regular 16 `#000000` — 30 — "07","08","09" — date digits / Input
17. Geist Regular 10 `#7C8DAC` — 24 — "dd/mm/yyyy","Select","Type here" — Table Cell form placeholders
18. Inter Medium 12 `#3675D2` — 23 — "View More"
19. Geist Regular 16 `#7C8DAC` — 21 — "05","Search" — Search field text
20. Geist Medium 12 UNDERLINE `#7C8DAC` — 21 — "AMWD / MBC…" — DAY/Tags
21. Inter Regular 10 `#7C8DAC` — 20 ; 22. Geist Medium 12 `#ECA100` — 20 "Low"; 23. Geist Regular 14 `#000000` — 18 "SG"; 24. Geist Medium 12 `#4162A3` — 18 "Cash Merger"; 25. Geist Medium 12 `#3675D2` — 17 "Join the meeting" (Button); 26. mixed segments Geist Regular 12 `#000000` — 15; 27. Geist Medium 12 `#DA4D43` — 14 "High"; 28. Geist Medium 10 `#7C8DAC` — 13 count digits; 29. Geist Regular 10 `#A8B6CD` — 13; 30. Geist Regular 12 `#FFFFFF` — 13 "New Deal","Edit Deal","Cancel" (Button instances); 31. Inter Regular 12 `#7C8DAC` — 12 "VRSN / VeriSign, Inc."; 32. Geist Medium 12 `#FF8132` — 11 "Medium"; 33. Geist Medium 12 UNDERLINE `#3675D2` — 10 "AHL / 8630 JT", "View Full Note"; 34. Geist SemiBold 14 `#000000` — 8 "Merger Agreement Summary"; 35. Geist Medium 24 `#7C8DAC` — 8 "  Risk Arb DB" (login 2159:13754); 36. Geist Regular 12 `#7C8DAC` seg — 7; 37. Geist Medium 12 `#3090C0` — 7 "Predeal"; 38. Geist Medium 12 `#179484` — 7 "Definitive"; 39. Geist Regular 10 `#FF8132` — 6 "today\n12:45"; 40. Geist Regular 12 `#179484` — 6 "New Event"; 41. Geist Medium 12 lh 20px `#7C8DAC` seg — 6 ("Day","Week" inactive); 42-48. Geist Medium 12 for each status text colour (see 1.3) 3-6 each; 49. Geist Regular 14 UNDERLINE `#000000` — 6 "Forgot Password?"; 50. Geist Regular 14 `#005268` — 6 "Sign In" (Button Outline green 14px); 51. Geist Medium 14 `#7C8DAC` — 5 "Risk Arbitrage"(nav section label 1615:4421), "29"; 52. Geist Bold 12 `#005268` seg — 5 "GET"; 53. Geist Medium 14 `#3675D2`@0.9 — 4; 54. Geist Medium 16 `#3675D2` — 4 "06","H"; 55. Geist Regular 12 `#005268` — 4 "Linda Varoli" (author name); 56. Geist Medium 12 `#000000` seg — 4 "April, " (calendar title "Title" 721:2329); 57. Geist Bold 12 `#000000` — 4 "$1.1B"; 58. Geist Regular 14 `#A8B6CD` — 4 login placeholders "username","password"; 59. Geist Medium 12 lh 20px `#FFFFFF` — 3 "Month","Week" (active toggle); 60. Geist Regular 10 UNDERLINE `#3675D2` — 3 URLs.
Rest (tail, each ≤ 3): Geist Medium 12 UNDERLINE `#FF8132` "Reset All"/"Edit Events"; Geist Medium 14 `#005268` "Deal Preview" (1868:10280); Geist Regular 16 `#A8B6CD` "Check you email at…"; Geist Medium 14 UNDERLINE `#005268` "All Deals" (414:3120); Geist Medium 12 `#FFFFFF` "Open Deals" active segment; Geist Medium 18 `#000000` seg "SSTK / GETY " (1720:6145); Geist Regular 18 `#7C8DAC` seg "Shutterstock / Getty…"; Geist Medium 10 `#179484` "Definitive" (new-deal pill); Geist Medium 10 `#4162A3` "Cash Merger"; Geist Regular 14 `#7C8DAC` "Username","Email Address" (login labels); Geist Regular 12 UNDERLINE `#000000` (721:2660); Geist Regular 12 `#E5E7EC` "Add New Deal" (disabled button label); Geist Medium 16 `#000000` "Account Settings" (1895:21120); Geist SemiBold 14 `#005268` "Profile Information" (1895:21121); Geist Regular 10 `#DA4D43` "Incorrect password" (1895:21137); Geist Regular 18 `#000000` "Forgot Password" (2159:13812); Geist Regular 14 UNDERLINE `#A8B6CD` "Resend Code" (2159:13864); Geist Regular 12/10 `#000000`@0 hidden placeholders.

### 2.4 Role summary (derived)
| Role | Tuple |
|---|---|
| Body / table cell | Geist Regular 12, `#000000` |
| Table header cell (list tables) | Geist SemiBold 12, `#000000` (Table Header Cell (Status/Agency/Event/Description), 1720:6669-6676) |
| Table header (Events-in-Deal 10px variant) | Geist Medium 10 `#000000` (1720:6668 "Date") ; cells Geist Regular 10 |
| Link | Geist Medium 12 UNDERLINE `#005268` (internal), `#3675D2` (external/ticker), `#FF8132` (action "Reset All","Edit Events") |
| Secondary label | Geist Regular 12 `#7C8DAC`; tertiary `#A8B6CD` |
| Nav label | Geist Medium 12 `#000000` (active `#005268`) |
| Nav section label | Geist Medium 14 `#7C8DAC` ("Risk Arbitrage") |
| Tab label | Geist Medium 12 (active `#005268`, inactive `#000000`) |
| Page / panel title | Geist Medium 14 `#005268` ("All Deals" 414:3120, UNDERLINE variant), "Deal Preview" 14 |
| Deal title | Geist Medium 18 `#000000` + Geist Regular 18 `#7C8DAC` for company names (1720:6145) |
| Login title | Geist Medium 24 `#7C8DAC` |
| Calendar day number | Geist Medium 14 |
| Pills | Geist Medium 12 (10 in New-Deal preview) |
| Button | Geist Regular 12 `#FFFFFF` (primary) / Regular 12 `#000000`/`#005268`/`#FF8132` (outline); Medium 12 (yellow, Join) ; login "Sign In" Regular 14 |
| Input value / placeholder | Regular 12 `#000000` / `#7C8DAC`; label `#A8B6CD`; main Search + login inputs Regular 14/16 |
| Inter text | ONLY in calendar DAY > Tags (event tag lines 12/10, "View More" Medium 12) — appears to be an unintended font fallback; flag for owner (Geist could replace) |
| Monospace | none |

---------------------------------------------------------------------------------------------------

## 3. RADII, STROKES, SHADOWS/EFFECTS, OPACITY

### 3.1 Radii (Section 1, counts of nodes) by element class
| Radius | Count | Element classes | Examples |
|---|---|---|---|
| 4 | 574 | buttons (Button 102x32…), inputs/Select/Search (Input 840x40 1567:4505), nav items (414:2728 159x40), ticker Tags h24, "View More", "Join the meeting", row hover chips, Button Master (smooth 1: also r4 smooth1 x3) | 414:2728; 1567:4505; 824:8672 |
| 2 | 182 | checkbox (16x16, Frame 1000000909 114x), small blocks (time block 414:3019 r2), bell/bookmark 32x32 (1720:6532 r2) | I824:8592;754:2945 |
| 16 | 176 | status/type pills (24-32 high), filter chips (h28), circle-x 16x16, scroll thumb/track (4px) | 414:2898; 824:8250; 1526:6279 |
| [4,4,0,0] | 80 | page tabs (Frame 120/121/122/117/119, 32 high: top corners 4) | 414:2892; 414:2894; 414:2896 |
| [0,0,8,0] | 17 | nav panels (bottom-right 8): Nav min 72x1032, open, max | 414:2723; 414:2752; 2044:6454 |
| 5 | 16 | date-selector tiles (Frame 321 40.875x75) | 414:2975 |
| 8 | 14 | panels/cards (Frame 332 952x897 1st-column; comments panel 364x897; table container "Table - Events" 932x290) | 414:3116; 414:2801; 1720:6665 |
| 24 | 12 | count badges 20x20, avatar badges 24x24 | 1615:4378; 1541:3226 |
| 12 | 10 | login cards (Frame 32 384x501), nav-shaped union | 2159:13749 |
| [0,12,12,12] | 8 | calendar main surface "Rectangle 9" 1784x928 (tab-attached corner top-left 0) | 721:2387 |
| 8 smooth 1 (cornerSmoothing 1) | 6 | calendar Day/Week/Month "Button Master" 115.33x32 | 721:2262 |
| 40 | 6 | toggle track 32x16 + thumb 12x12 | 1868:10445/10446 |
| [0,8,8,8] | 5 | content frame under tabs 1784x929 (Frame 1000001046) | 1612:4365 |
| [4,0,0,4] | 5 | left accent bars 249x4? / Frame 216 374x518.96 | 824:8647; 1720:6169 |
| [0,8,8,0] | 4 | side drawer 409x896 / 375x896 | 824:8580; 1988:5650 |
| [0,4,4,0] | 2 | segmented button right half (163x40) | 414:2765 |
| [4,0,0,0] | 2 | comments panel header 364x48 | 414:2802 |
| [8,8,0,0] | 2 | calendar "month" 1502x864 | 721:2276 |
| [0,12,12,0] | 2 | nav union rectangle 72x/219x1032 | 2139:8209 |
| [12,8,8,8] | 1 | Admin External card 1784x960 | 1895:21118 |
| 4 smooth 1 | 3 | Button Master | 721:2272 |
Components page: r4 x138 (inputs/buttons/tags), r5 x14 (component-set frames), r2 x6 (checkbox), r40 x4 (toggle), r16 x2 (scroll), r12 x2 (radio 754:2925/2939 frame — 16x16 circular via r12? radius as read).
Radius values in Figma: **2, 4, 5, 8, 12, 16, 24, 40** (+ mixed-corner combos above). No 6/10/20/999.

### 3.2 Strokes by element class (weight / align / colour)
| Class | Stroke |
|---|---|
| Page panel/card (content frame, comments panel, table container) | `#E5E7EC` 1 INSIDE (all sides) |
| Input / Select / Search / Password | `#E5E7EC` 1 INSIDE all sides; fill `#FFFFFF` (Input/Select/Password) or `#F5F5F8` (header Search 1567:4505); error: `#DA4D43` 1 INSIDE (1895:21136) |
| Table header cell separator | `#E5E7EC` right-only 1 INSIDE (0/1/0/0); header bottom `#E5E7EC` bottom 1 INSIDE |
| Table row / cell | row bottom `#F5F5F8` 1 INSIDE (0/0/1/0); cells in rows `#E5E7EC` right 1 INSIDE |
| Nav panel | `#F5F5F8` 1 INSIDE (all sides, with corner [0,0,8,0]); Nav active item has no stroke (fill `#005268`@0.1) |
| Tab (inactive) | `#F5F5F8` outline (1 INSIDE) ; active tab: fill `#F5F5F8` + stroke `#005268` (414:2892 "Dashboard" active) ; deal tabs 2-3 px bottom `#005268` INSIDE (mix 0/0/3/0 x8) |
| Primary button | Default: fill `#005268` + stroke `#005268` 1.5 INSIDE; hover: `#005268` + `#FFFFFF`@0.2 overlay (no stroke); disabled: fill `#A8B6CD`, no stroke, text `#E5E7EC` |
| Outline button (black) | `#000000` 1.2 INSIDE; hover fill `#E5E7EC`; disabled `#A8B6CD` 1.5 INSIDE text `#A8B6CD` |
| Outline green | `#005268` 1.2 INSIDE; hover fill `#005268`@0.1; disabled as above |
| Orange outline | `#FF8132` 1.2 INSIDE; hover fill `#FF8132`@0.2; disabled `#A8B6CD` 1.5 |
| Yellow | fill `#ECA100`@0.2, hover @0.35, disabled fill `#A8B6CD` text `#E5E7EC`; no stroke |
| Checkbox / radio unchecked | `#A8B6CD` 1 INSIDE 16x16, r2 (checkbox) / circle (radio); checked fill `#005268` + white check stroke 1.5 CENTER (`#FFFFFF`) |
| Icons (lucide / noun) | 1 or 1.5 (also 1.2, 0.2, 0.4, 0.5) CENTER, `#000000`/`#005268`/`#7C8DAC`/`#FF8132`/`#3675D2` |
| Event cards (right panel) | `#3675D2`@0.05 1 INSIDE (388x132), highlighted `#3675D2`@0.3 |
| Right panel header | bottom `#3675D2`@0.1 1 INSIDE |
| Deal info box | `#A8B6CD` r4 outer (1720:6590 1354x441) with inner `#F5F5F8` dividers |
Dash patterns: only on 2 SECTION nodes (4 INSIDE dash 10,10, `#FFFFFF`) — non-UI.

### 3.3 Fixed measurements for key borders: default divider weight = **1**, icon stroke = **1 / 1.5**, button outline = **1.2** (float32 1.2000000476837158), primary button border = **1.5**.

### 3.4 Shadows / effects
Local effect style `Shadow` (id `S:b5f77b6be61583e40ab3180315a7366278b8fb56,`) — 5 stacked DROP_SHADOWs, blendMode NORMAL, spread 0 on all, showShadowBehindNode true:
1. `#5B6380` @0.17 offset (2, 1) blur 5
2. `#5B6380` @0.15 offset (7, 6) blur 9
3. `#5B6380` @0.09 offset (3, 4) blur 12
4. `#5B6380` @0.03 offset (-3, 24) blur 14
5. `#5B6380` @0 offset (42, 37) blur 16
(alpha values exactly: 0.17000000178813934, 0.15000000596046448, 0.09000000357627869, 0.029999999329447746, 0)

All effects used in Section 1 (4 distinct):
| Effect | Node(s) | Role |
|---|---|---|
| `Shadow` style applied | 461:3415 "Frame 359" 844x420 | MODAL card (sits on the backdrop 461:3414) |
| Same 5 drop shadows, applied raw (not the style) | 1895:21153 "Frame 1000000998" 236x112 (Admin External) | popover / account menu card |
| DROP_SHADOW `#26395E`@0.04 (0,-4) blur 9 spread 0 + DROP_SHADOW `#26395E`@0.03 (0,-16) blur 16 spread 0 | 1868:10443, 1868:10734, 1868:11127 "Frame 1000000958" 1784x64 | sticky bottom action bar of New Deal screens (shadow goes upward) |
| BACKGROUND_BLUR radius 20 on fill `#E5E7EC`@0.2 | 461:3414 "Rectangle 11" 1848x1016; 1988:5751 "Rectangle 36" 407x894 | modal backdrop; drawer backdrop |
No inner shadows, no layer blur anywhere. Components page: no effects.

### 3.5 Opacity
- Layer opacity < 1: **none** in Section 1 (0 nodes). Hidden nodes: 20 (visible=false).
- All transparency is on paints (see colour tables). Alphas used: 0.05, 0.1, 0.2, 0.25, 0.3, 0.35 (yellow hover, components), 0.9 (text `#3675D2`@0.9), 0 (invisible fills/text). Brand tint conventions: `#005268`@0.1 (active/hover), @0.2; `#3675D2`@0.05/0.1/0.2/0.3; `#FF8132`@0.1/0.2; `#ECA100`@0.2/0.35; pills @0.1/0.2/0.25 (per colour, as in 1.3); `#FFFFFF`@0.2 (primary-button hover overlay).

---------------------------------------------------------------------------------------------------

## 4. SPACING, SIZES, PAGE GRID

### 4.1 Auto-layout padding+gap tuples (Section 1: 3,649 auto-layout frames; 750 frames without auto layout). Format: dir (H/V) pad T/R/B/L gap — count — where
| # | Tuple | Count | Where |
|---|---|---|---|
| 1 | V 4/8/4/8 gap 0 | 685 | Table Cell (656), Table Header Cell (29) — 1463:6147 312x31 |
| 2 | V 4/12/4/12 gap 0 | 297 | Table Cell (280), Header cell (17) — 721:2501 |
| 3 | H 0/0/0/0 gap 0 | 265 | Table Row 182, tab rows (Frame 80 1784x32: 414:2891) |
| 4 | H 0 gap 8 | 231 | Checkbox rows (114), nav label+chevron rows |
| 5 | H 0 gap 4 | 173 | small icon+text rows (1526:6305) |
| 6 | V 8/12/8/12 gap 0 | 138 | Table Cell (Date) 113x31 (1720:6288) |
| 7 | V 3/4/3/4 gap 10 | 129 | DAY/Tags (721:2293…) |
| 8 | V 0 gap 2 | 127 | stacked text blocks (414:3010 356x32) |
| 9 | V 0 gap 4 | 119 | label+input stacks (Input 48, Items 28; 414:2840 288x52) |
| 10 | V 0 gap 0 | 87 | tables / lists (1463:6125 884x796) |
| 11 | H 4/16/4/16 gap 10 | 79 | status pill h24 (824:8247) |
| 12 | H 8/16/8/16 gap 10 | 72 | pill h32 (1720:6147), side-panel blocks |
| 13 | H 4/4/4/4 gap 12 | 64 | Nav min item 40x40 (I2044:6454;414:3310) |
| 14 | H 7/12/7/12 gap 32 | 62 | Select 241.33x32 (I1868:10088;830:4449) |
| 15 | V 0 gap 8 | 58 | nav item group Frame 150 (159x184), lists |
| 16 | V 8/8/8/8 gap 4 | 57 | DAY/Tags groups (202.2x48) |
| 17 | H 0/12/0/12 gap 8 | 54 | rich-text toolbar groups (72x20) |
| 18 | V 0/4/0/4 gap 10 | 52 | 24x16 letter chips (1541:3213) |
| 19 | H 7/12/7/12 gap 8 | 42 | Search / Input 840x40, 1567:4505 |
| 20 | H 4/8/4/8 gap 8 | 42 | Table Cell (Agency/Event) 104x40 |
| 21 | H 4/8/4/8 gap 16 | 42 | Table Cell (Description) 89x40 |
| 22 | V 0 gap 12 | 40 | content column 952x897 (414:3116) |
| 23 | H 12/12/12/16 gap 16 | 39 | closable tab (Frame 122 109x32, 414:2896) |
| 24 | V 8/12/12/12 gap 8 | 35 | DAY calendar cell 231.08x216 (721:2293) |
| 25 | H 7/24/7/24 gap 8 | 30 | Button 102x32 (824:8672) |
| 26 | V 3/24/3/24 gap 10 | 23 | "View More" |
| 27 | H 0 gap 12 | 23 | calendar title rows |
| 28 | H 0 gap 80 | 19 | nav logo row 72x40 |
| 29 | H 7/8/7/8 gap 4 | 18 | "Join the meeting" Button 132x32 |
| 30 | H 7/12/7/12 gap 0 | 18 | Input 40x64 (login code boxes) |
| 31 | H 12/16/12/16 gap 0 | 16 | segmented-button halves 163x40 |
| 32 | V 16/8/16/8 gap 6 | 16 | date tiles 40.88x75 |
| 33 | H 12/16/12/16 gap 16 | 15 | tabs 94x32 (calendar) |
| 34 | H 0 gap 32 | 15 | form row 241.33x32 |
| 35 | H 12/8/12/12 gap 12 | 15 | rich-text Input 740x136 |
| 36 | V 16/16/16/16 gap 8 | 14 | event cards 388x132 |
| 37 | H 16/48/8/16 gap 0 | 14 | top bar 1848x64 (1567:4503) |
| 38 | V 16/16/16/16 gap 26 | 14 | Nav min 72x1032 |
| 39 | V 8/12/8/12 gap 10 | 14 | calendar header cells 231.08x32 |
| 40 | H 8/4/8/4 gap 12 | 12 | Nav open item 159x40 (414:2728) |
(other notable: V 16/16/16/16 Nav open 191x1032; H 6/4/6/16 gap 8 filter chip; V 12/16/12/20 gap 12 side panel; H 4/12/4/8 table header cell)

Top gaps (frames with >1 child): H8 395, H0 292, V4 173, H4 165, V8 128, V2 119, V0 116, H16 95, V12 46, H12 39, H32 33, V16 20, V6 18, V26 14. => gap vocabulary: **0, 2, 4, 6, 8, 10, 12, 16, 24, 26, 32, 80** (24 seen on 1720:6521; 435 on header row 1720:6522; 48 on Frame 1000001067).
Padding vocabulary: **0, 3, 4, 6, 7, 8, 12, 16, 20, 24, 32, 48** (3 and 7 occur on 24px/32px-high controls; buttons are exactly 7/24/7/24 — values as read, no explanation available in Figma).

### 4.2 Fixed control sizes (from instances in Section 1 + components page)
| Control | Size |
|---|---|
| Button / Button Outline (primary/secondary) | h 32; w hugs: padding 7/24/7/24 gap 8; widths seen 87, 98, 102, 127, 132 (Button 102x32, 98x32, 127x32, 87x32) |
| Button Outline green / Password / Input (login) | h 40, 240 or 281 wide; Password 260x32 (Admin) and 240x40 |
| Input (form) | h 32 (no label) or 52 (with 20px label: label 16 + gap 4 + 32), widths 241.3 / 260 / 148 (component default) / 740x136 (textarea rich text) / 740x28 toolbar |
| Select | 241.3x52 (w label), 188 default component, 148x32 |
| Search (small) | 200x32 default; "main search" 840x40 (14px text) |
| Calendar field | 241.3x52 / 178x32 |
| Checkbox | row h 16 (box 16x16, gap 8); widths 100-377 |
| Radio | 80x16, circle 16 |
| Toggle | track 32x16 r40, thumb 12x12 |
| Scroll | 4px wide track/thumb r16 |
| Tab | h 32 (padding 12/24/12/24 gap 16/24; closable 12/12/12/16) |
| Nav item | 40 high; Nav min 72 wide (items 40x40), Nav open 191 (items 159x40), Nav max 219 (items 187x40) |
| Pills | h 24 / 28 / 32 (see 1.3) |
| Icon boxes | 16 (circle-x, chevron), 24, 32 (bell/bookmark/noun icons) |
| Table row | min h 30 (padding 4 + 16 text + 4 + 1 border => 29+1), header 32/31 (+1 border), 24 (nested header 498x24), 40 (Agency/Event rows 40) |
| Top bar | 1848x64 (x72, y0) |
| Avatar | 40x40 (user-circle-02-duotone, "SG" initials, 1567:4506) |

### 4.3 Page grid (Section 1 screens)
All main screens: FRAME **1920 wide**, 1080 tall (scrolling screens taller: Deal 2638, Deal Edit Events 2712, New Deal Expanded 3223, New Deal Empty 1544). Fill `#FFFFFF`. Admin External = SECTION 2324x1280; log in = SECTION 4663x2426.

Dashboard 414:2798 (1920x1080) top-level children (x,y,w,h):
- Nav min instance 2044:6454: x0 y0 72x1032 (V pad 16 gap 26; logo 40x48 at x16,y16; nav items 40x40 at x16, y106, gap 8)
- Top bar Frame 15 1567:4503: x72 y0 1848x64 (H pad 16/48/8/16) — Search input 840x40 at x16,y16 (`#F5F5F8`, stroke `#E5E7EC`, r4); avatar 40x40 at x1760,y16
- Tab row Frame 80 414:2891: **x88 y72** 1784x32 — tabs: 110x32, 140x32, 109x32, 142x32, 151x32 (flush, gap 0)
- Content frame Frame 1000001046 1612:4365: **x88 y103** 1784x929 (H pad 16/16/16/16 gap 8, fill none, stroke `#E5E7EC` 1, radius [0,8,8,8]); inside: column 1 952x897 (x16,y16, stroke `#F5F5F8`, r8), column 2 420x897 at x976 (fill `#3675D2`@0.05), column 3 364x897 at x1404 (fill `#E2E2E2`@0.25, stroke `#F7F7F7`, r8) — inner column gutters 8 (itemSpacing 8), inner padding 16.
=> content margins: left 88 (= 72 nav + 16), right 1920-88-1784 = 48; tabs sit 8px under the top bar (64 -> 72), content frame overlaps tab bottom by 1 (y103 vs tab bottom 104).

Deal 1720:6515 (1920x2638) top-level children:
- Tab row Frame 80 1720:6828: x88 y73 1769x32 (tabs 110, 140, 109, 132 [active "SSTK / GETY" fill `#F5F5F8` stroke `#005268`], 151)
- Big surface Rectangle 9 1720:6845: x88 y104 1784x2461 (stroke `#E5E7EC`, r[0,12,12,12])
- Header row Frame 1000001069 1720:6521: x120 y121 1736x32 (inner: title block 688x32, Button 98x32 at x1542, bell/bookmark 72x32 at x1664, gap 8; row gap 24)
- Left conditions box Frame 288 1720:6516: x104 y634 406x878 (V pad 16/16/0/24 gap 8, stroke `#F5F5F8`, r4)
- Deal info box Frame 1000001065 1720:6590: x104 y177 1354x441 (stroke `#A8B6CD`, r4) — three rows 137 / 66 / 238 high with `#F5F5F8` dividers
- Events column Frame 1000001078 1720:6660: x510 y637 964x1928 (V gap 0; contains Table - Events 932x290 at x16,y42 stroke `#E5E7EC` r8, notes column 964x1596 pad 24/0/24/8 gap 16)
- Right panel Frame 1000001067 1720:6536: x1474 y177 398x726.96 (V pad 0/0/0/24 gap 48, stroke `#F5F5F8`): sub-blocks 374x160 and 374x518.96
- Top bar Frame 15 1720:6863 x72 y0 1848x64; Nav min 2044:6472 x0 y0 72x1032.
=> Side margins inside big surface: left 16 (x104 = 88+16), right edge 1872 (1920-48); column gutters: 104->510 (406 wide + 0 gap: boxes abut) ; gap 16 between conditions box and events column? (510-(104+406)=0). Events column ends x1474 = right panel start (964: 510+964=1474) — no gap; right panel 398 wide to 1872.

Screen frame sizes recap: Nav min 72x1032; Nav open 191x1032; Nav max 219x1032 (alt page: open 203).

---------------------------------------------------------------------------------------------------

## 5. GAPS / UNSPECIFIED IN FIGMA (searched; not found as designed states)
Searched = scanned all visible nodes in Section 1 and components page by name/structure/effects/colour.

| Area | Finding |
|---|---|
| Focus ring / focus state | Not found: no focus variant on Input/Select/Search/Password/Checkbox/Button (no stroke colour change set, no outline/box-shadow effect with a focus colour; no `#9747FF`-style focus; the only purple is Figma chrome). |
| Hover states | Present ONLY for buttons (Button, Button Outline, Button Outline green, button yellow, button orange outline: Default/hover/disabled variants). NOT present for table rows, tabs, nav items, links, chips, calendar cells, inputs. |
| Active/pressed states | none (no "pressed" variants anywhere) |
| Disabled variants | present for buttons (all 5 families) and Checkbox ("disabled", "disabled 2", "disabled all": text `#7C8DAC`); NOT for Input, Select, Search, Calendar, Password, Radio, Toggle, tabs, chips |
| Error / validation | Only ONE instance: Password field in error (1895:21136: stroke `#DA4D43` 1, helper text "Incorrect password" Geist Regular 10 `#DA4D43`). No error variant of Input/Select/Calendar; no success state; no warning field state |
| Loading | none (no spinner, no skeleton; searched names "skeleton","loading","spinner","shimmer") |
| Toast / snackbar / alert banner | none found |
| Tooltip | none found |
| Dropdown menu / select options list | none designed (Select only shows closed state; no option list, no hover/selected option). A popover card with 5-layer shadow exists on Admin External (1895:21153 236x112) |
| Modal | One modal pattern exists: backdrop 461:3414 (1848x1016, `#E5E7EC`@0.2 + BACKGROUND_BLUR 20) + card 461:3415 (844x420, `Shadow` style); and a drawer pattern with backdrop 1988:5751 (407x894, same blur) + panel 1988:... (409x896 / 375x896, r[0,8,8,0]). No variants (confirm/destructive/close hover) |
| Date picker popover | not designed (calendar field is a closed input only) |
| Pagination / empty state / badges | pagination none; empty state: "New Deal Empty" screen exists with placeholder pills ("Deal Status","Deal Type") — no generic empty-state component |
| Typography | no heading scale named; no letter-spacing, no uppercase, no line-height values (all auto); no monospace; text styles defined but unused |
| Colour tokens | no variables, no semantic names beyond 14 library paint styles; no dark theme; no elevation scale beyond `Shadow` (+ footer bar shadow); no named status colours (14 status/type hues are raw hex) |
| Spacing tokens | no spacing variables; no 4/8 grid enforcement (values 3, 6, 7 appear) |
| Breakpoints / responsive | none (all screens 1920 wide; no mobile/tablet frames; Nav has 3 widths 72/191/219 only) |
| Motion / transitions | not in Figma (no prototype flows read) |
| Icon set | lucide icons (names `lucide/...`), `noun-*` project icons, `Icons / Formatting / …` — sizes 12/14/16/18/20/24/32; no icon token scale |
| Rate-limit note | `get_design_context` returns only a metadata tree for large nodes (Dashboard exceeded size) and the Figma MCP call limit was hit mid-harvest, so named-style listing was taken from the Plugin API (`getStyleByIdAsync`) instead; the get_design_context line "These styles are contained in the design: Grey 1: #7C8DAC, dark green main: #005268, Black: #000000, White: #FFFFFF, Grey 4: #F5F5F8." was captured on Nav open 414:2723 and matches the API result. |
| Not harvested | pages `drafts` (0:1), `test  ` (1676:3731), Admin Internal section, `changes for Laura` section; `final fonts 2px up` only summarised (see section 0) |

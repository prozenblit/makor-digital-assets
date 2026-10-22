# OG Risk Arb — Components page (924:3460) — ground truth

File key VlOfBG6fJt7ijm0iKasAMP. Harvested read-only via use_figma (exact API values) + screenshots.
Conventions: `#HEX@a` = solid fill with paint opacity a (layers listed bottom to top). "FILL/HUG/FIXED" are Figma layoutSizing values. All strokes INSIDE unless stated. Font = Geist unless stated. Line-height is `auto` and letter-spacing `0%` on EVERY text node on this page (so line box = font's natural auto height: 12px -> 16px box, 14px -> 18px box, Inter 12 -> 15px box, Inter 10 -> 12px box).

Page-wide facts
- No component has a description (`description` empty on every set/variant), no prototype reactions on any node (no hover/click interactions), no component properties other than a single VARIANT property per set (named "Property 1" / "Property 2"). No instance swaps (no nested instances at all on this page; icons are plain frames named `lucide/...` containing a Vector, not instances).
- Component-set wrapper frames carry Figma's purple dashed 1px border (#9747FF / #8A38F5, dash 10,5, radius 5) - that is Figma chrome, NOT design. Ignore.
- The page canvas behind the components renders light grey (~#E5E7EC, visual estimate); the white inputs sit on it.
- Colour tokens that recur: teal #005268 (primary), #179484 (toggle on only), #A8B6CD (label / disabled bg / not-selected border), #7C8DAC (placeholder / disabled text / muted), #E5E7EC (borders / disabled text on dark / muted bg), #F5F5F8 (tag bg / light border), #3675D2 (View More blue), #ECA100 (yellow), #FF8132 (orange), #000000 text.

---------------------------------------------------------------------------
## 1. Buttons (all: HORIZONTAL auto-layout, gap 8, padding T7 R24 B7 L24, radius 4, height FIXED 32, width HUG (85 with the text "Button"), main/cross alignment CENTER/CENTER unless noted, label = one TEXT "Button", Geist Regular 12px, auto/0%)

### 1.1 Button (primary) - set 766:3215, prop "Property 1" = Default | hover | disabled
| | Default 766:3214 | hover 766:3216 | disabled 766:3218 |
|---|---|---|---|
| size | 85x32 | 85x32 | 85x32 |
| fills | #005268 | #005268, then #FFFFFF@0.2 on top (2 layers) | #A8B6CD |
| stroke | #005268 1.5px INSIDE | **none** | **none** |
| text colour | #FFFFFF | #FFFFFF | #E5E7EC |
| clip | yes | yes | yes |
Notes: hover has no stroke (default has a 1.5 inner border; since default border colour = fill, the visible box is the same size). Hover = white overlay 20% (blend NORMAL). Disabled has no border.

### 1.2 Button Outline (black) - set 836:2651, prop = Default | hover | **disables** (sic, variant name is literally "disables")
| | Default 836:2650 | hover 836:2652 | disables 836:2654 |
|---|---|---|---|
| fills | none | #E5E7EC | none |
| stroke | #000000 1.2px | #000000 1.2px | #A8B6CD 1.5px |
| text colour | #000000 | #000000 | #A8B6CD |
Default has main-axis MIN (irrelevant, hugs). Same padding/gap/radius/height/font as 1.1.

### 1.3 Button Outline green - set 836:2656, prop = Default | hover | disabled
| | Default 836:2657 | hover 836:2661 | disabled 836:2659 |
|---|---|---|---|
| fills | none | #005268@0.1 | none |
| stroke | #005268 1.2px | #005268 1.2px | #A8B6CD 1.5px |
| text colour | #005268 | #005268 | #A8B6CD |

### 1.4 button yellow - set 2293:7996, prop = Default | hover | disabled
| | Default 2293:7995 (86x32) | hover 2293:7997 (86x32) | disabled 2293:7999 (85x32) |
|---|---|---|---|
| fills | #ECA100@0.2 | #ECA100@0.35 | #A8B6CD |
| stroke | none | none | none |
| text | Geist **Medium** 12, #ECA100 | Geist **Medium** 12, #ECA100 | Geist **Regular** 12, #E5E7EC |
| clip | no | no | no |
Default/hover main-axis MIN, disabled CENTER (hug, no visible effect). Width 86 vs 85 because Medium text is 38 wide vs 37.

### 1.5 button orange outline - set 2293:8005, prop = Default | hover | disabled
| | Default 2293:5949 | hover 2293:8006 | disabled 2293:8008 |
|---|---|---|---|
| fills | none | #FF8132@0.2 | none |
| stroke | #FF8132 1.2px | #FF8132 1.2px | #A8B6CD 1.5px |
| text colour | #FF8132 | #FF8132 | #A8B6CD |

Cross-button observation: stroke weight is 1.2 for every enabled outline, 1.5 for primary default and for every outline disabled state. No "active/pressed", "focus", or icon-bearing button exists.

---------------------------------------------------------------------------
## 2. Form fields

Shared field box (the inner frame in Select/Input/calendar/search/Password): fills #FFFFFF, stroke #E5E7EC 1px INSIDE, radius 4, clip yes, HORIZONTAL auto-layout, cross CENTER, padding T7 R12 B7 L12, height FIXED 32 (40 for Password and "main search"). Placeholder text Geist Regular 12px #7C8DAC. Label text: "Label", Geist Regular 12px, #A8B6CD, FILL width, 16px high. Label-to-field gap 4 (vertical wrapper, padding 0). No shadow/effects anywhere.

### 2.1 Select - set 830:4456, prop "Property 2" = "w label" | "no label"
- **w label 830:4455**: 148x52. Wrapper VERTICAL, gap 4, pad 0, sizing HUG/HUG. Children: Label 830:4453 (FILL x HUG, 148x16) and field frame "Select" 830:4449 (FIXED 148x32, main-axis SPACE_BETWEEN, gap 32). Field children: text "Please Select" 830:4450 (Geist Regular 12, #7C8DAC, 76x16) + icon `lucide/chevron-down` 830:4451 (frame 16x16 FIXED; contains Vector 12x6, stroke #005268, strokeWeight reported 1.2, CENTER align, no fill).
- **no label 830:4457**: 148x32. Wrapper VERTICAL, gap 4, main SPACE_BETWEEN, sizing HUG x FIXED. Only the field: 830:4459 sizing FILL x FIXED, main MIN (!) rather than SPACE_BETWEEN (so in the raw component the chevron sits right after the text with gap 32, not pushed to the edge - a Figma inconsistency; the w-label variant is SPACE_BETWEEN). Same content/colours.
- Width is not responsive in Figma: 148 px (text 76 + gap 32 + icon 16 + 24 padding = 148, i.e. hug of content in no-label; w-label field is FIXED 148).

### 2.2 Input - set 830:4470, prop "Property 1" = "w label" | "no label"
- **w label 830:4469**: 148x52, wrapper VERTICAL gap 4, sizing FIXED x HUG. Label 830:4467 (FILL), field "Input" 830:4465: FILL x FIXED 32, main MIN, gap 32, white, #E5E7EC 1px, radius 4. Text "Placeholder" 830:4466 Geist Regular 12 #7C8DAC (66x16).
- **no label 830:4471**: 148x32, same field alone (830:4473, FILL x FIXED 32).
- Width: wrapper FIXED 148 in the component, field fills wrapper (design intent: fill container).

### 2.3 calendar (date field) - set 831:2591, prop "Property 1" = label one date | one date | w label from to | from to
Content: text "dd/mm/yyyy" (single) or "dd/mm/yyyy - dd/mm/yyyy" (range), Geist Regular 12 #7C8DAC; icon `lucide/calendar` frame 16x16 (clip) with Vector 14x12, stroke #005268, strokeWeight reported 1, no fill. Field frame name is "Select" (same recipe as 2.1).
| variant | id | size | wrapper | field | field gap | field main |
|---|---|---|---|---|---|---|
| label one date | 831:2583 | 177x52 | VERT gap 4, HUG/HUG | FIXED 177x32 | 32 | SPACE_BETWEEN |
| w label from to | 831:2604 | 210x52 | VERT gap 4, HUG/HUG | FIXED 210x32 | **16** | SPACE_BETWEEN |
| one date | 831:2592 | 178x32 | VERT gap **2**, SPACE_BETWEEN, FIXED x FIXED | FILL x FIXED 178x32 (note 178 vs 177) | 32 | SPACE_BETWEEN |
| from to | 831:2610 | 210x32 | VERT gap 2, SPACE_BETWEEN, HUG x FIXED | HUG x FIXED 210x32 | 16 | **MIN** |
Text widths: single 72, range 154. 154+16+16+24 = 210. Labelled variants have Label (FILL, #A8B6CD 12px) above the field with gap 4.

### 2.4 search - set 836:2572, prop = label | no label | main search
Field frame is named "Search/40", FILL x FIXED, gap **8**, padding T7 R12 B7 L12, main MIN, white, #E5E7EC 1px, radius 4. Content: `lucide/search` frame 12x12 with Vector 12x12, stroke **#000000**, weight 1, no fill; then text "Search" #7C8DAC.
- **label 836:2571**: 200x52, wrapper VERT gap 4 FIXED x HUG; Label FILL; field 200x32; text Geist Regular **12**, 39x16.
- **no label 836:2573**: 200x32; field only, 12px text.
- **main search 836:2579**: 200x40; field height **40**; text Geist Regular **14** (46x18), same #7C8DAC; icon still 12x12 black. Wrapper VERT gap 4, FIXED x HUG.

### 2.5 Password - set 2159:12814, prop = filled hidden | filled visible | empty
All: 240x40 (FIXED x FIXED), white, #E5E7EC 1px, radius 4, clip, HORIZONTAL, gap 8, pad T7 R12 B7 L12, main SPACE_BETWEEN, cross CENTER. No label variant exists. Trailing icon `lucide/eye` = frame **24x24** (clip) with a Vector stroke #005268, weight 1, no fill.
| | filled hidden 2159:12813 | filled visible 2159:12829 | empty 2159:12853 |
|---|---|---|---|
| content | GROUP "Group 12" 112x4 of 10 ellipses, each 4x4 fill #005268 (step 12px: 4px dot + 8px gap), dot size 4 | text "makoristhebest10" Geist Regular **14**, #000000 (115x18) | text "password" Geist Regular **14**, **#A8B6CD** (63x18) |
| eye vector | 16x12 (eye) | 16x16 (eye-off, slashed - visual) | 16x12 (eye) |
Note: empty placeholder colour is #A8B6CD (lighter) here, whereas Input/Select/Search placeholders are #7C8DAC. Font is 14px here vs 12px for other inputs.

---------------------------------------------------------------------------
## 3. Selection controls

### 3.1 radio buttons - set 754:2937, prop = active | not active
Wrapper: HORIZONTAL, gap 8, pad 0, cross CENTER, FIXED x HUG, 80x16. Circle frame "Frame 1000000909": FIXED 12x12 at y=2, **radius 12** (circle), clip, stroke 1px INSIDE. Label "#Description" Geist Regular 12, #000000, 16 high ("yes" 20w / "no" 14w).
| | active 754:2936 | not active 754:2938 |
|---|---|---|
| circle fill | none | none |
| circle stroke | #005268 1px | #A8B6CD 1px |
| inner | Ellipse 10: 8x8 at (2,2), fill #005268 | empty |
| label | "yes" #000000 | "no" #000000 |

### 3.2 Checkbox - set 754:2943, prop = selected | not selected | all | disabled | disabled 2 | disabled all
Wrapper: HORIZONTAL, gap 8, pad 0, cross CENTER, FIXED x HUG 120x16. Box "Frame 1000000909": FIXED 16x16, **radius 2**, clip. Label "#Description" Geist Regular 12 16-high.
| variant | id | box fill | box stroke | glyph | label |
|---|---|---|---|---|---|
| selected | 754:2942 | #005268 | none | Vector 1 (check) 8x6 at (4,5), stroke #FFFFFF 1.5 | "Selected" #000000 |
| not selected | 754:2944 | none | #A8B6CD 1px INSIDE | none | "Not Selected" #000000 |
| all (indeterminate) | 770:3264 | #005268 | none | Vector 1 dash 8x0 at (4,8), stroke #FFFFFF 1.5 | "All" #000000 |
| disabled (= selected, disabled) | 1822:5399 | #7C8DAC | none | check 8x6, stroke **#E5E7EC** 1.5 | "Selected" #7C8DAC |
| disabled 2 (= not selected, disabled) | 1822:5646 | none | #A8B6CD 1px | none | "Not Selected" **#7C8DAC** |
| disabled all | 1822:5772 | #7C8DAC | none | dash 8x0, stroke **#FFFFFF** 1.5 | "All" #7C8DAC |
Note inconsistency: disabled check glyph is #E5E7EC but disabled-all dash is #FFFFFF. Disabled not-selected keeps #A8B6CD border (same as enabled); only label colour changes. No radio disabled variant exists.

### 3.3 Toggle - set 1375:4132, prop = Default | Variant2 (Default = ON, Variant2 = OFF)
Variants are 58x16, FIXED x FIXED, **no auto-layout** (absolute children). Track: Rectangle 2 32x16 at (0,0), radius 40. Thumb: Rectangle 3 12x12, radius 40, fill #FFFFFF, at y=2. Label "#Description" at x=40, FIXED text box, Geist, 12px, #000000, 16 high.
| | Default (ON) 1375:4131 | Variant2 (OFF) 1375:4133 |
|---|---|---|
| track fill | **#179484** | #7C8DAC |
| thumb x | 18 (2px from right) | 2 |
| label | "ON", Geist **Medium** 12 (18x16 box) | "OFF", Geist **Regular** 12 (23x16 box) |
No stroke/shadow. Note the ON colour #179484 is NOT the brand teal #005268.

---------------------------------------------------------------------------
## 4. Scroll - component 838:2609 (single COMPONENT, not a set), 4x559 FIXED
- Track: Rectangle 6 838:2606, 4x559, fill #E5E7EC, radius 16.
- Thumb: Rectangle 7 838:2607, 4x304 at (0,0), fill #A8B6CD, radius 16.
Thumb/track ratio 304/559 = 54.4%. No hover/active state. No stroke.

---------------------------------------------------------------------------
## 5. rich text (toolbar) - component 1687:7037 (single COMPONENT)
Toolbar only: **there is no editor/content area in this component** (578x32 strip). Root: HORIZONTAL auto-layout, gap 0, pad 0, cross CENTER, sizing HUG x FIXED (578x32), no fill, stroke #E5E7EC bottom only 1px (T0 R0 B1 L0). Seven groups (frames), each: HORIZONTAL, gap 8 (10 for pilcrow), padding T0 R12 B0 L12 (pilcrow: T5 R12 B5 L12), cross CENTER, sizing HUG x FILL (32 tall), **right border only #E5E7EC 1px** (last group has no border). Every button is a **20x20 frame (clip)** holding a ~10-13px glyph, centred; spacing between 20px icon cells = 8 (positions x=12, 40, 68, 96 in 28px steps). No button fills, hover or active states exist. All glyph colour #000000.
| # | group id | width | icons (left to right) |
|---|---|---|---|
| 1 | 1687:6977 | 72 | `lucide/rotate-ccw` 1687:6961 (undo, vector 10x10 stroke #000 w1); `lucide/rotate-ccw` 1687:6974 **mirrored horizontally** (relativeTransform scale-x -1, rotation reported -180) = redo, same vector |
| 2 | 1687:6966 | 34 | `lucide/pilcrow` (frame itself is the group; vector 10x10 stroke #000 w1; clip) |
| 3 | 1687:6987 | 128 | "Icons / Formatting / bold" = TEXT "B" **Times New Roman Bold** 12 #000; italic = "I" **Times New Roman Bold Italic** 12; underline = "U" **Times New Roman Regular** 12 with UNDERLINE decoration; strikeThrough = "S" **Times New Roman Regular 14** with STRIKETHROUGH. (Glyphs are text, not vectors - Times New Roman, not Geist.) |
| 4 | 1687:6470 | 128 | "Icons / Paragraph / alignCenter", alignJustify, alignLeft, alignRight - vector 12x8 at (4,6), **filled** #000000 (fill, no stroke) |
| 5 | 1687:6973 | 72 | unorderedList (vector 12x8), orderedList (vector 11x8), filled #000000 |
| 6 | 1687:7013 | 72 | `lucide/link` (10x10 stroke #000 w1), `lucide/sheet` (table icon, 10x10 stroke #000 w1) |
| 7 | 1687:7025 | 72 | `lucide/code-xml` (13x10 stroke #000 w1), `lucide/expand` (10x10 stroke #000 w1) |
Order in screenshot: undo, redo | pilcrow | B I U S | align center, justify, left, right | bullet list, numbered list | link, table | code, fullscreen.
Visual estimate: the glyphs render ~12-14px visual size inside 20px cells.

---------------------------------------------------------------------------
## 6. DAY (calendar cell) - set 553:547, prop "Property 1" with 10 variants
No "today", "selected", or "event dot" variant exists. No grid/month frame exists on this page - only the cell. (Inferred grid: 7 columns, weekdays 211 wide + weekends 167 wide = 5x211+2x167 = 1389 px, cells 216 tall collapsed; visual/inference only.)

### Common cell anatomy (all variants)
- Cell: VERTICAL auto-layout, gap 8, padding **T8 R12 B12 L12**, FIXED x FIXED, main/cross MIN. Stroke only on **right and bottom** (T0 R1 B1 L0) 1px INSIDE. No radius, no effects, not clipped.
- Header row "Frame 1000000899": HORIZONTAL, FILL x HUG (24 high), contains day-number TEXT (Geist **Medium 14**, "1", 6x18, auto lh) and, in "View More" variants, a button; gap 4, main SPACE_BETWEEN.
- "View More" chip: frame named "Tags", HUG x FIXED 109x24, fill **#3675D2@0.1**, radius 4, VERTICAL, gap 10, padding T3 R24 B3 L24, main/cross CENTER; text "View More" **Inter Medium 12**, #3675D2, 61x15, center aligned, FILL x HUG.
- Items container "Items": VERTICAL, FILL x FILL, gap 4 (collapsed) or 8 (expanded), pad 0.
- Collapsed item "Tags": FILL x FIXED 24, radius 4, VERTICAL, gap 10, padding T3 R4 B3 L4, text **Inter Regular 12** (15 high) #000 left, single line, truncated with literal "..." in the content (e.g. "AAUC CN / 2259 HK", "AL / Sumitomo Corporation ...", "AMWD / MBC", "KW/Management – Fairfax ...", "NWE/BKH", "SEM/Management/Welsh, ..."). Six items per cell: 6x24 + 5x4 = 164 = Items height.
- FONT ODDITY: day number and expanded tickers use Geist; all tag text and "View More" use **Inter** (Inter Regular 12 / Inter Medium 12 / Inter Regular 10). This is genuine in Figma, not an artifact.

### Collapsed variants
| variant | id | size | cell fill | cell border (R,B 1px) | day-num colour | View More | item fill | item text |
|---|---|---|---|---|---|---|---|---|
| regular day | 553:546 | 211x216 | #FFFFFF | #F5F5F8 | #000000 | yes | #F5F5F8 | #000000 |
| prev month | 553:548 | 211x216 | #F5F5F8 | #E5E7EC | **#7C8DAC** | yes (same blue chip) | **#E5E7EC** | **#7C8DAC** |
| next month | 553:566 | 211x216 | #F5F5F8 | #E5E7EC | #000000 | yes | **#FFFFFF** | #000000 |
| weekend | 553:3081 | **167**x216 | #FFFFFF | #F5F5F8 | #000000 | **no** (header is HORIZONTAL, gap 0, MIN, FILL x FIXED 24) | #F5F5F8 | #000000 (texts shortened with "...") |
| weekend next month | 553:3370 | 167x216 | #F5F5F8 | #E5E7EC | #000000 | no | #FFFFFF | #000000 |
Weekend cells' tag text has different truncation ("AL / Sumitomo  ...", "KW/Management –  ...", "SEM/Management/...", next-month: "AL / Sumitomo Corp...").

### Expanded variants (all show every event; tall)
Cell: same padding/gap 8; Items gap 8; each event "Tags" = FILL x HUG, radius 4, VERTICAL **gap 4, padding 8 all sides**, with two text children: ticker line **Geist Medium 12 with UNDERLINE** (HUG, auto lh -> 16 high) coloured #005268 (enabled) / #7C8DAC (prev month), then description **Inter Regular 10** (auto lh -> 12 high single line, 24 two lines), #000000 / #7C8DAC (prev month), FILL width, wraps. Event heights: 48 (one-line desc) or 60 (two-line). Number of events: 16 in 211-wide, 8 in 167-wide.
| variant | id | size | cell fill / border | item fill | View More | meaning (inferred) |
|---|---|---|---|---|---|---|
| Variant10 | 595:4253 | 211x1092 | #FFFFFF / #F5F5F8 | #F5F5F8 | yes (header gap 4 SPACE_BETWEEN) | expanded regular day |
| Variant7 | 599:2200 | 211x1048 | #F5F5F8 / #E5E7EC | #E5E7EC | yes | expanded prev month |
| 10 | 609:2183 | 211x1048 | #F5F5F8 / #E5E7EC | #E5E7EC | **no** (header gap 0) | expanded prev month, no chip |
| Variant8 | 599:2500 | 211x1092 | #FFFFFF / #F5F5F8 | #F5F5F8 | no (header gap 0) | expanded regular day, no chip |
| Variant9 | 599:2716 | **167**x564 | #FFFFFF / #F5F5F8 | #F5F5F8 | no (header gap 4, only day num) | expanded weekend |
(Chip text is "View More" even in expanded variants - there is no "View Less".) Naming: variant names "Variant7-10" and "10" are Figma auto-names; semantic names above are inferred from visuals.

---------------------------------------------------------------------------
## 7. GAPS (states/variants absent in Figma - extend consistently)
- Buttons: no focus, active/pressed, loading, icon-only, icon+label, size variants (only 32px high). Hover for primary has no border while default has 1.5px (border same colour as fill so invisible). Yellow has no outline-stroke variant; orange has no filled variant. Disabled outline variant is named "disables" (typo) in Button Outline. No danger/destructive style.
- Input / Select / calendar / search / Password: no hover, focus, filled (value typed - except Password "filled visible"), error, success, disabled, read-only states. No helper/error-text slot, no required marker, no multi-line (textarea), no prefix/suffix other than the icons shown. Select has no open-dropdown/menu/option/hover-option/selected-option design; calendar has no popover (month header, weekday header row, today/selected/range/hover cell) - the DAY set is a big event-calendar cell, not a date-picker cell. Filled values for Select/Input/calendar (text colour when a value is present - Password uses #000000 at 14px) are not defined. Search has no clear button, focus, or results.
- Password: no label variant, no error/strength state.
- Checkbox: no hover/focus; disabled uses non-obvious colours; no error. Radio: no disabled, hover or focus. Toggle: no disabled/hover/focus; ON colour #179484 differs from brand teal.
- Scroll: single static default; no hover/active/dragging thumb, no horizontal variant; track/thumb height arbitrary (559/304).
- rich text: toolbar only; no editor area, no placeholder text, no focus ring, no button hover/active (pressed B/I/U) state, no disabled, no dropdowns (heading/font/colour), no separators other than group right-borders; undo/redo reuse rotate-ccw.
- DAY: no today, selected, hovered, focus, event-dot, "no events", overflow ("+N") variants; no weekday header row; no month grid frame; no disabled-day style beyond prev/next-month. Collapsed event tag has no hover/click; no per-event category colours (single #F5F5F8 / #E5E7EC / #FFFFFF scheme).
- Global: no elevation/shadow tokens used on this page; no focus-ring spec; no motion/transition specs; no prototype interactions anywhere on the page.

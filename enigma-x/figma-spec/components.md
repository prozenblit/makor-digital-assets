# ENIGMA X - Component sets (Figma file 3PpdEgLKQZaybhyIILCfUF, page "final" 16:1909)

Harvested read-only via Plugin API. All values exact as read. "(visual estimate)" = not read from the API.
Colours are listed as hex + the Figma paint-style name. Every fill/stroke in these sets is bound to one of the 15 paint styles. No text styles exist in the file (all text is raw Geist Regular / Geist Medium, line-height AUTO, letter-spacing 0%), no effect styles, no variable collections, no variable bindings, **no prototype reactions and no component descriptions on any set or variant (checked all 13 sets, 149 nodes)**. No drop shadows / effects anywhere in the sets.

## 0. Global facts

* Each set has a Figma-canvas wrapper (dashed purple #9747FF / #8A38F5 1px border, radius 5, white fill, 20px padding) - **documentation chrome, not part of the component**.
* Fonts: only `Geist Regular` and `Geist Medium` (control labels). Line-height "AUTO" (Figma). Observed auto text-box heights: 12px -> 16, 14px -> 18 (Dashboard button text). (Anomaly: the 14px "Option" text in `tabs` has a stored box height of 10 - stale; render as normal 14px text centred.)
* Control height system: all form controls and small buttons are **32px high**; the tab strips on the Dashboard (SELL/BUY) and the Dashboard primary button are **40px high** (instances stretched, see section 15).
* Radius: controls 4, checkbox box 2.
* Colours used: White #FFFFFF, Grey 0 #F7F8F8, Grey 1 #DEE8ED, Grey 2 #A8BECD, Grey 3 #7C9CAC, Main color #7AEFEF, Main color hover #B0F9F6, Main color transp #7AEFEF@0.20, Main color darker #3DBFBF, Black #000000, green #8BEEC8, Orange #FFB051.
* Icons are drawn as 16x16 frames named `lucide/<name>` containing one stroked VECTOR (no fills, round caps/joins).
* **Important:** on the Dashboard all 13 component instances point to the components on the **drafts** page (0:1), not to the "final" page. The final-page sets are identical copies (except Checkbox - section 14). Nested instance inside "input with tabs" points to main component 11:266 `input with tabs/1`, which is an orphan (no parent, not on any page).

## 1. Select  (set 56:123, 188x164 canvas wrapper; property `Property 1` = label | no label)

| Variant | id | size |
|---|---|---|
| Property 1=label | 56:124 | 148x52 (HUG/HUG) |
| Property 1=no label | 56:130 | 148x32 (HUG/HUG) |

Component layout: VERTICAL, gap 4, padding 0, align MIN/MIN.
Children (label variant):
1. `Label` TEXT 56:125 - 148x16, sizing FILL/HUG (textAutoResize HEIGHT), Geist Regular 12, lh auto, ls 0%, fill Grey 2 #A8BECD, text "Label".
2. `Select` FRAME 56:126 - 148x32, sizing FIXED/FIXED, fill Grey 0 #F7F8F8, **no stroke**, radius 4, clip, layout HORIZONTAL, gap 32, padding T7 R8 B7 L12, primary SPACE_BETWEEN, counter CENTER.
   * `Please Select` TEXT 56:127 - hug 76x16, Geist Regular 12, fill Grey 2 #A8BECD.
   * `lucide/chevron-down` FRAME 56:128 - 16x16 FIXED, no fill; child VECTOR 56:129 8x4 at (4,6): path `M 0 0 L 4 4 L 8 0`, stroke Main color darker #3DBFBF, weight 1.2, align CENTER, cap ROUND, join ROUND.
No-label variant: identical `Select` frame (56:131, text 56:132, icon 56:133/56:134), no Label.
States drawn: none beyond the two label variants (no hover/open/disabled).

## 2. Input with 2 text  (set 56:135, property label | no label)

| Variant | id | size |
|---|---|---|
| label | 56:136 | 148x52 |
| no label | 56:141 | 148x32 |

Same container as Select. Inner `Select` frame 56:138 (56:142 no-label): 148x32, fill Grey 0, radius 4, clip, HORIZONTAL gap 32, **padding T7 R12 B7 L12**, SPACE_BETWEEN / CENTER.
* Text `0` 56:139 - hug 8x16, Geist Regular 12, Grey 2 #A8BECD (placeholder-style value).
* Text `abc` 56:140 - hug 21x16, Geist Regular 12, **Grey 3 #7C9CAC** (unit / suffix, right-aligned by SPACE_BETWEEN).
Label: same as Select (56:137).

## 3. Input  (set 56:145, label | no label)

| Variant | id | size |
|---|---|---|
| label | 56:146 | 148x52 |
| no label | 56:150 | 148x32 |

Inner frame 56:148 (56:151): 148x32, fill Grey 0, radius 4, clip, HORIZONTAL, **gap 0, padding T7 R12 B7 L12, primary MIN**, counter CENTER. One text `0` 56:149 (hug 8x16, Geist Regular 12, Grey 2 #A8BECD). Label 56:147 as above.

## 4. Search  (set 56:153, label | no label)

| Variant | id | size |
|---|---|---|
| label | 56:154 | 148x52 |
| no label | 56:160 | 148x32 |

Inner frame 56:156 (56:161): 148x32, fill Grey 0, radius 4, clip, HORIZONTAL, **gap 8, padding T7 R8 B7 L8**, MIN / CENTER.
* `lucide/search` FRAME 56:157, 16x16, clip; VECTOR 56:158 10x10 at (3,3): two sub-paths (handle `M10 10 L7.5889 7.5889`, circle r=4.444 at (4.444,4.444)); stroke Main color darker #3DBFBF, weight **1**, CENTER, round cap/join, no fill.
* Text `Search` 56:159 - hug 39x16 at x=32, Geist Regular 12, Grey 2 #A8BECD.

## 5. Checkbox  (set 56:165, 160x236 wrapper; property `Property 1` = selected | not selected | all | disabled | disabled 2 | disabled all)

All variants: 120x16, layout HORIZONTAL, gap 8, padding 0, primary MIN, counter CENTER, sizing FIXED/HUG. Children: box FRAME (name `Frame 1000000909`) 16x16 radius 2 clip, FIXED; text `#Description` hug x=24, Geist Regular 12, lh auto.

| Variant (id) | box fill | box stroke | check/dash VECTOR | label text colour | label |
|---|---|---|---|---|---|
| selected 56:166 | Main color #7AEFEF | none | `Vector 1` 8x6 at (4,5), path `M 0 2.5714 L 2.9091 6 L 8 0`, stroke Black #000 w1.5 CENTER cap ROUND | Black #000 | "Selected" (49x16) |
| not selected 56:170 | none (transparent) | Grey 2 #A8BECD, 1px INSIDE | - | Black #000 | "Not Selected" (72x16) |
| all 56:176 (indeterminate) | Main color #7AEFEF | none | `Vector 1` 8x0 at (4,8), path `M 0 0 L 8 0`, stroke Black w1.5 round cap | Black #000 | "All" (15x16) |
| disabled 56:184 (checked) | Grey 3 #7C9CAC | none | 8x6 check, stroke Grey 0 #F7F8F8 w1.5 round cap | Grey 3 #7C9CAC | "Selected" |
| disabled 2 56:173 (unchecked) | none | Grey 2 #A8BECD 1px INSIDE | - | Grey 3 #7C9CAC | "Not Selected" |
| disabled all 56:180 (indeterminate) | Grey 3 #7C9CAC | none | dash 8x0, stroke Grey 0 #F7F8F8 w1.5 | Grey 3 #7C9CAC | "All" |

No hover/focus/error drawn. Checkbox is NOT used as an instance on the Dashboard.

## 6. Button Outline  (set 56:188, 125x124 wrapper; `Property 1` = Default | hover)

Both variants: 86x32, sizing **HUG x FIXED(32)**, layout HORIZONTAL, gap 8, padding T7 R24 B7 L24, primary **MIN** (!), counter CENTER, radius 4, clip. Label `Button` TEXT hug 38x16, **Geist Medium 12**, lh auto, fill Black #000.

| | Default 56:189 | hover 56:191 |
|---|---|---|
| fill | none | Main color transp #7AEFEF @ 0.20 (paint style "Main color transp") |
| stroke | Black #000, 1px INSIDE | Black #000, 1px INSIDE |
| text | Black | Black |

## 7. Button  (set 56:193; Default | hover)

86x32 HUG x FIXED(32), HORIZONTAL, gap 8, padding T7 R24 B7 L24, primary **CENTER**, counter CENTER, radius 4, clip. Label Geist Medium 12, Black #000, hug 38x16.

| | Default 56:194 | hover 56:196 |
|---|---|---|
| fill | Main color #7AEFEF | Main color hover #B0F9F6 |
| stroke | none | Main color #7AEFEF, 1px INSIDE |
| text | Black | Black |

## 8. Button black  (set 56:198; Default | Variant2)

86x32, same geometry as Button (primary CENTER), radius 4. Label Geist Medium 12 fill Main color #7AEFEF (both).

| | Default 56:199 | Variant2 56:201 (probably hover/focus - unnamed in Figma) |
|---|---|---|
| fill | Black #000 | Black #000 |
| stroke | none | Main color #7AEFEF, 1px **OUTSIDE** |

## 9. tabs  (set 56:203, 231x124 wrapper; `Property 1` = 1 | 2)

Component: HUG x FIXED(40) = 184x40, HORIZONTAL, gap 0, padding 0, MIN/CENTER, radius 4, **no fill**. Two child `Button` FRAMEs, each sizing HUG x FILL (40 tall), HORIZONTAL gap 8, padding T7 R24 B7 L24, CENTER/CENTER, radius 4, clip; child TEXT `Option` 14px.

| | Selected tab | Unselected tab |
|---|---|---|
| fill | Main color #7AEFEF | none |
| text | **Geist Medium 14**, Black #000 ("Option" hug 45 wide) | **Geist Regular 14**, Grey 3 #7C9CAC ("Option" hug 43 wide) |
| widths | 93x40 | 91x40 |

* Property 1=1 (56:204): first tab (56:205) selected, second (56:207) unselected.
* Property 1=2 (56:209): first (56:210) unselected, second (56:212) selected.
No stroke, no hover state.

## 10. input with tabs  (set 56:214, 284x288 wrapper; `Property 1` = 1 label | 1 no label | 2 label | 2 no label)

| Variant | id | size |
|---|---|---|
| 1 label | 56:215 | 244x52 |
| 2 label | 56:218 | 244x52 |
| 2 no label | 56:221 | 244x32 |
| 1 no label | 56:223 | 244x32 |

Wrapper: VERTICAL, gap 4, HUG/HUG. Label (56:216) FILL width 244. Control = instance `input with tabs/1` (e.g. 56:217): 244x32, FIXED x HUG, HORIZONTAL, **itemSpacing -106**, MIN/CENTER, containing:
* `Input` FRAME 243x32 (FILL/HUG) -> `Select` frame: fill Grey 0, radius 4, clip, gap 0, padding T7 R12 B7 L12, text `0` Geist Regular 12 Grey 2.
* `tabs` FRAME 107x32 at x=137 (overlaps the input, flush right edge), HUG x FIXED(32), radius 4, no fill, gap 0. Two `Button` frames HUG x FILL, radius 4, HORIZONTAL gap 8, **padding T7 R8 B7 L8**, CENTER/CENTER, clip; text `Option` 12px: selected = fill Main color #7AEFEF, **Geist Medium 12** Black (38 wide); unselected = no fill, **Geist Regular 12** Grey 3 #7C9CAC (37 wide). Widths: selected 54 / unselected 53 (when first selected: 54+53; when second selected: 53+54).
* Variant "1" = first tab selected; "2" = second selected.
(Variants 1/2 are produced as overrides of the same nested instance; the inner instance's main component 11:266 is orphaned.)

## 11. refresh  (set 56:225, 70x120; Default | hover)

32x32 FIXED/FIXED, radius 4, clip, HORIZONTAL, gap 10, padding 7 all, CENTER/CENTER. Icon VECTOR 16x16 at (8,8), stroke Grey 3 #7C9CAC, weight 1.5, CENTER, round cap/join, no fill (lucide rotate-ccw: arc + `M0 4.4444 L0 0` + `M0 4.4444 L4.4444 4.4444`).
| | Default 56:226 | hover 56:228 |
| fill | none | Grey 1 #DEE8ED |
| icon stroke | Grey 3 | Grey 3 (unchanged) |

## 12. filter  (set 56:230, 72x124; Default | Variant2)

32x32 FIXED, radius 4, clip, **no auto layout** (icon at absolute (8,8)). VECTOR 16x16 (lucide funnel, closed path), stroke Grey 3 #7C9CAC w1.5 round, no fill.
Default 56:231: no fill. Variant2 56:233 (hover): fill Grey 1 #DEE8ED.

## 13. hands  (set 56:235, 72x124; Default | Variant2)

32x32 FIXED, radius 4, clip, no auto layout. VECTOR **18x16** at (7,8) (lucide handshake), stroke Grey 3 #7C9CAC w1.5 round, no fill. Default 56:236 no fill; Variant2 56:238 (hover) fill Grey 1 #DEE8ED. (Icon is 18 wide, so it is centred at x=7..25.)

## State-diff summary

| Family | Default | Hover / second variant | Selected | Disabled |
|---|---|---|---|---|
| Select / Input / Input 2 text / Search | fill Grey 0, text Grey 2 | not drawn | not drawn | not drawn |
| Button | fill Main color, no stroke | fill Main color hover, stroke Main color 1 INSIDE | - | not drawn |
| Button Outline | stroke Black 1, no fill | fill Main color transp (0.20) | - | not drawn |
| Button black | fill Black, text Main color | + stroke Main color 1 OUTSIDE ("Variant2") | - | not drawn |
| tabs / input-with-tabs | unselected: no fill, Grey 3 Regular | not drawn | fill Main color, Black Medium | not drawn |
| Icon buttons | no fill | fill Grey 1 | - | not drawn |
| Checkbox | see table sec. 5 | not drawn | Main color box + Black check | Grey 3 box/label, Grey 0 check |

## 14. Final vs drafts (0:1) differences

Compared programmatically (name, size, fills + style names, strokes, radius, layout, text, font, sizing, positions, child counts). Drafts nodes: Select 9:391, Input with 2 text 9:415, Input 10:23, Search 10:49, Checkbox 11:18, Button Outline 11:105, Button 11:108, Button black 11:120, tabs 11:248, input with tabs 11:428, refresh 12:198, filter 12:285, hands 12:326.

* **Identical:** Select, Input with 2 text, Input, Search, Button Outline, Button, Button black, tabs, input with tabs, refresh, filter, hands (every property incl. style names).
* **Checkbox differs** (final = canonical):
  * selected + all, box fill: final Main color #7AEFEF; draft "dark green main" #005268. Check/dash stroke: final Black #000; draft White #FFF.
  * not selected / disabled 2 box stroke: final Grey 2 #A8BECD; draft #A8B6CD.
  * disabled / disabled all / disabled 2: box fill + label colour final Grey 3 #7C9CAC; draft #7C8DAC (draft style named "Grey 1"). Check stroke in disabled/disabled all: final Grey 0 #F7F8F8; draft #E5E7EC (style "Grey 3") / #FFFFFF "White" (disabled all).
* Drafts page also holds: a Dashboard copy 19:692, a reference screenshot section 1:1949, a stray `Select` instance 9:430, a Background frame. The final page has an extra stray VECTOR `Union 86` 58:84 (40x40) next to the sets (logo piece).

## 15. How controls are used on the Dashboard 16:1910 (1920x1080)

Instances (all 13) and deviations from the standalone component:

| Instance (id) | Variant | Size in context | Layout in context | Overrides / deviations |
|---|---|---|---|---|
| Search 16:1915 (Spot Trader "Instrument") | label | **188x52**, FILL/HUG | row 16:1914 392x52 HORIZONTAL gap 16 | label "Instrument"; value text "BTC-USD" colour **Black #000** (not Grey 2); inner width 188 |
| Input with 2 text 16:1916 ("Quantity") | label | 188x52 FILL/HUG | same row | value "1" Black, unit "BTC" Grey 3 |
| Input with 2 text 16:1930 ("Slippage") | label | 188x52 | row 16:1929 | value "2" **Grey 2** (dimmed), unit "bps" Grey 3 |
| Select 16:1931 ("Type") | label | 188x52 | row 16:1929 | text "MKT" Black; padding T7 R8 B7 L12 as component |
| tabs 16:2127 (RFQ SELL/BUY) | 2 | **392x40** FILL/FIXED at x24 y58 in RFQ card | card 440 wide, padding 16/24/24/24 | **container fill Grey 0 #F7F8F8 added** (component has none); tab buttons FILL/FILL (196 each, not hug); labels uppercase "SELL"/"BUY"; selected (BUY) fill **green #8BEEC8** (not Main color); text 14 (Medium Black selected, Regular Grey 3 unselected) |
| Search 16:2130 (RFQ "Instrument") | label | **132x52** FILL | row 16:2129 gap 16 | text "BTC-USD" Black |
| input with tabs 16:2131 (RFQ "Quantity") | 1 label | 244x52 HUG/HUG | same row | value "0.0001" Black; tabs frame is 80x32 (BTC 39 / USD 41) flush right at x=164; **selected tab fill Orange #FFB051** (not Main color); text 12 Medium / Regular |
| Button 16:2132 ("REQUEST FOR QUOTE") | Default | **392x40** FILL x FIXED(40) | column 16:2128 gap 48 | height 40 (component 32); text **Geist Medium 14**, uppercase, Black (component 12); fill Main color |
| refresh 16:1957 (Spot balances header) | Default | 32x32 | row 16:1955 392x32 SPACE_BETWEEN with title | none |
| refresh 16:1987 / filter 16:1988 / hands 16:1989 (blotter toolbar) | Default | 32x32 each | frame 16:1986 96x32 HORIZONTAL gap 0 | none; adjacent (no gap), hug 96x32, right side of toolbar 16:1982 (1360x38 SPACE_BETWEEN) |

Cards: Spot Trader 16:1911 (440x528), Spot balances 16:1954 (440x392), Chart 16:1978 (952x392), Blotter 16:1981 (1408x438), RFQ 16:2124 (440x278): all padding T16 R24 B24 L24.

### Controls on the Dashboard with NO component (list only - for the Dashboard harvester)

* Header: "UAT" button/chip 16:2389 (220x40, text 16:2390); Exposure box 16:2392 (255x40; texts 16:2393/16:2394); date/time/version block 16:2395; avatar circle "YH" 16:2402; logo group 16:2387.
* Ticker strip 16:2133 (1920x80, scrolling row 16:2134 2040x80): tiles 16:2135, 16:2157, 16:2171, 16:2193, 16:2207, 16:2221, 16:2238, 16:2258, 16:2272, 16:2286, 16:2300, 16:2322, 16:2336, 16:2358, 16:2372 (asset icon + pair + price + change %).
* Price tiles BID/ASK (red/green, 188x100) 16:1920 and 16:1923 in container 16:1919; spread chip 16:1926/16:1927 ("98.23" in Background 120x32).
* Order book table 16:1932: header 16:1933 (BID/Qty/ASK), rows 16:1938, 16:1942, 16:1946, 16:1950.
* Spot balances table 16:1958: header 16:1959, rows 16:1963, 16:1966, 16:1969, 16:1972, 16:1975.
* Underlined tabs "TRADES BLOTTER" / "BALANCE MOVEMENT": 16:1983 with items 19:126 (214x38) and 19:127 (255x38), titles 16:1984/16:1985.
* Blotter table 16:1990: header 16:1991 (32 tall; sort-arrow vector 16:1992), rows 16:2004, 16:2019, 16:2034, 16:2049, 16:2064, 16:2079, 16:2094, 16:2109 (40 tall each; status dot vector e.g. 16:2005; Order-type pill 16:2009/16:2010 (76x24); SELL/BUY coloured side text 16:2013).
* Section titles (Spot Trader 16:1913, Spot balances 16:1956, Chart 16:1980, RFQ 16:2126), BTC/USD hidden-vs-visible unit tabs are inside the `input with tabs` instance (component).

## 16. GAPS (searched for, not drawn in the Figma component sets)

* Inputs / Select / Search / Input-2-text: no hover, focus, error, disabled, filled (value) state (Dashboard uses Black text override for entered value and Grey 2 for dimmed "Slippage" value), no open dropdown/menu list for Select, no clear/validation message.
* Buttons: no pressed/active, focus or disabled for Button, Button Outline, Button black ("Variant2" in Button black and in filter/hands is unnamed; assumed hover/focus - not confirmed). No sizes other than 32 high (Dashboard stretches to 40).
* tabs / input-with-tabs: no hover/focus/disabled; tab selected-colour variants (green, Orange) exist only as Dashboard overrides, not as component variants.
* Checkbox: no hover, focus, error; no checkbox instances used on the Dashboard.
* Icon buttons: no pressed/active/selected/disabled; no tooltip.
* Interaction/prototype: no reactions anywhere in the sets (so no transition/duration/easing data). Text styles, effect styles, variables: none exist.

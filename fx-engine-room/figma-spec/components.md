# FX Engine Room - Component Library Spec (harvested from Figma)

File key `yuJA7DtjFKnqTZQcu2vKYN`, page `0:1`. Read-only harvest via Plugin API (`use_figma`) on 2026-10-14.
Sources: section "Assets" `4398:15026` (1489x923, white background, 34 children), Section 3 `7114:14467`, screens New Trading Account `5536:14786`, Add Permissions `5580:14451`, Entities `3999:18361`, Trading Account `4031:18455`.
Notation: `{Var}` = bound Figma variable name. `fill A + B` = layered fills, bottom first. "AL" = auto-layout. Colours are exact hex. "(visual estimate)" = read from a screenshot only.

## 0. Global facts (apply to every component)

- Font family: **Nunito** everywhere except the CSV button text (Inter Regular 12, see 3.12). Line height is `AUTO`, letter-spacing 0% on every text node in the library (no text styles bound; `textStyleId` empty everywhere).
- Text boxes report height = 0.714 x font size (14px -> 10, 12px -> 8). That is an artefact of the plugin text-metrics, not a design value: component heights are fixed (32 or 24) and text is centred, so line-height is not a design input. Use auto/normal.
- Weights used: Button text SemiBold; tab labels / radio labels / switch labels / right-click-menu items Medium; inputs, dropdown, chips, field labels, tooltips Regular; modal title Medium 18.
- Variable names for the palette (resolved): `Primary purple` #A4A4FF; `Purple 1` #A4A4FF (caret); `Purple 2` #39394E; `Primary text` #FFFFFF; `Black` #000000 (also `BG`); `Secondary text` #707079; `Light grey text` #BABEC7; `Inputs on modal` = `Menu bar` = `Separators` #39393C; `Modal BG` #242428; `Grey 2` #171719 (this is the "BG Grey 1" colour; the variable name on tab-hover fills reads "Grey 2"); `Cancel Button` #E6E6E6; `Edit` #FF9747; `Active` #2BDF68; `Add New` #30F0D6; `delete` and `Red` #FF7272; `Red 2` #FD7557; `blue` #60A8FF; `yellow` #FEE274.
- Unbound (raw hex, no variable) colours seen: #00FEA9 (green-outline button), #1B5244 (its hover fill), #264A35 (csv bg), #FFBF8E (edit hover), #392C2D `red dark`, #5A3834 (red active), #2A313D `blue dark`, #3A3730 `yellow dark`, #FFDC51 (tooltip yellow), #FFB800@0.15 (DEV tag), #005F20 / #515151 (switch knob shadows). `red dark`, `blue dark`, `yellow dark` do have variable names (shown in `{}` below).
- Radii in the library: 4 (main controls), 3 (outlined/transparent/dropdown buttons, status), 2 (small 24px chips-buttons, checkbox, csv), 12 (chips), 12 (switch track), 8 (popovers, menus), 12 (modal).
- Component sets are laid out with a dashed `#9747FF` 1px INSIDE stroke, radius 5 (Figma default component-set chrome; not a design value).
- Every button/input is height 32 FIXED (HUG width) except the 24px "chip-button" family (Outlined red/blue/yellow, status, csv). Padding is symmetrical 11/24 on text buttons.
- Interactive state model drawn in Figma: Default / Hover / Disabled for buttons; Default / Hover / Active / Disabled only for Outlined red; Active / Hover / Not Active for Tabs; True/False for radio, checkbox, switch. **No focus state, no pressed state, no error state except `Input Error`, no selected state for inputs are drawn anywhere.** Hover is always implemented as a white (or black for csv) overlay layer on the fill, or a tinted solid fill.

## 1. Inventory (every COMPONENT / COMPONENT_SET under Section 3, plus the page-level originals the screens actually use)

106 component nodes live under Section 3 (this includes variants). Sets/standalones, by id:

### 1.1 Assets section `4398:15026`
| Name | id | Size | Variants / property values |
|---|---|---|---|
| Search | 4398:15301 | 158x32 | single |
| Search with label | 4398:15305 | 158x44 | single |
| Dropdown | 4398:15322 | 158x32 | single |
| Dropdown with label | 4398:15310 | 158x44 | single |
| Dates | 4398:15316 | 158x44 | single |
| Input | 4398:15330 | 158x32 | single |
| Input with label | 4398:15325 | 158x44 | single |
| Input Error | 4398:15332 | 158x56 | single |
| Time | 4398:15438 | 89x44 | single |
| Chips | 4398:15387 | 186x44 | single |
| Chips with few rows | 4398:15369 | 186x84 | single |
| Password (set) | 4398:15443 | 501x86 | State = Hidden, Visible |
| New/Add (set) | 4398:15337 | 132x176 | States = Default, Hover, Disabled |
| Cancel (set) | 4398:15344 | 124x176 | Property 1 = Default, Disabled, Disabled (two variants both named "Disabled"; the first is really hover) |
| Purple (set) | 4398:15428 | 132x176 | state = Default, hover, disabled |
| Outlined purple (set) | 4398:15474 | 132x176 | state = Default, hover, disabled |
| With dropdown (set) | 4398:15481 | 172x176 | Property 1 = Default, hover, disabled |
| Button transparent (set) | 4398:15491 | 142x176 | Property 1 = Default, Hover, disabled |
| Button transparent 2 (set, green outline) | 4398:15498 | 132x176 | Property 1 = Default, Hover, Disabled |
| Outlined red (set) | 6113:14388 | 140x196 | Property 1 = Default, hover, active, disabled |
| Outlined blue (set) | 6113:14402 | 126x108 | Property 1 = Default, hover |
| Outlined yellow (set) | 6113:14409 | 114x108 | Property 1 = Default, Variant2 (=hover) |
| status (set) | 6765:14816 | 136x146 | Property 1 = Default, hover, disabled |
| deselect all (set) | 4398:15505 | 78x92 | Property 1 = trades selected, no trades selected |
| Tabs (set) | 4398:15351 | 132x206 | States = Active, Hover, Not  Active (two spaces) |
| Radio Button (set) | 4398:15358 | 88x56 | State = True, False |
| Checkbox (set) | 4398:15418 | 89x56 | Property 1 = Checked, Unchecked |
| Switch (set) | 4398:15402 | 105x36 | Property 1 = true, falce (sic) |
| Switch with text (set) | 4398:15409 | 164x92 | Property 1 = true, Variant2 |
| Edit (set) | 4398:15364 | 91x56 | State = Default, Hover |
| Trash (set) | 4398:15423 | 118x56 | state = Default, Hover |
| Animation (set) | 4398:15284 | 208x70 | variants named 4, 3, 2, 1 (pulse frames); standalone copies Animation/1..4 `4398:15525/15521/15517/15513` 40x40 in SECTION "Animation flow" `4398:15512` |
| filters (frame, not a component) | 6544:14756 | 237x256 | filter popover (see 8.2) |

### 1.2 Section 3 outside Assets
| Name | id | Size | Variants |
|---|---|---|---|
| MasterFlag (set, hidden) | 594:5758 | 91x276 | Circle / Square / Rectangle / Rounded = yes/no (4 variants, one "yes" each); props `Flag` INSTANCE_SWAP default `584:234` (hk Hong Kong), `Greyscale` BOOLEAN false |
| Edit (set) | 62:207 | 91x56 | State = Default, Hover (duplicate of 4398:15364) |
| Switch with text (set) | 89:105 | 164x92 | Property 1 = true, false (the correctly named duplicate; **screens instance `89:96`, this one**) |
| csv (set) | 6804:14833 | 101x114 | Property 1 = Default, hover |
| Settings (component) | 16:133 | 24x24 | single; vector `Settings` fill #BABEC7{Light grey text} |
| Frames all / Checked / Unchecked | 4617:14314 / 4617:14317 / 4617:14320 | 24x24 each | 24x24 hit-area frames: `all` = 16x16 checkbox at (4,4) fill #A4A4FF r2 with 10x0 black line (stroke 1.5 OUTSIDE) at (3,9) (indeterminate "minus"); Checked = instance of Checkbox/Checked at (4,4); Unchecked = instance of Checkbox/Unchecked at (4,4) |
| Love (frame) | 6038:15341 | 24x24 | empty (no visible children), clip |
| filters frames | 6234:14340 (237x256), 6236:14733 (237x136, date-range variant), 6544:14756 | | see 8.2 |
| Outlined red instance | 6113:14392 | - | instance of 6113:14386 (Default) |
| Button transparent instance | 4250:17595 | - | instance of the transparent button family |

### 1.3 Page-level originals (NOT in Section 3; detached from any page - `parent` null; these are the MAIN components screens actually instantiate)
| Name | id | Used in screens as |
|---|---|---|
| New/Add (set) | 28:23 (variants 28:7 Default, 28:24 Hover, 28:26 Disabled) | all primary/teal action buttons (8 instances in the 4 screens) |
| Cancel (set) | 29:110 (29:109, 29:111, 29:113) | all grey buttons (11 instances) |
| Dropdown | 1252:2343 | all selects (17 instances) |
| Input | 1252:2354 | all text fields (10 instances) |
| Input with label | 89:51 | labelled field in modals (2) |
| Search | 52:44 | search field (1) |
| Button transparent green (set) | 2809:2937 (2809:2713 / 2809:2938 / 2809:2940) | outlined teal button (4) |
| Radio Button (set) | 52:27 (52:28 False, 52:30 True) | radios (10) |
| edit/Default | 62:191 | pencil icon (3) |
| Checkbox | 89:160 / 89:161 (Checked / Unchecked) | checkboxes |
| Switch with text | 89:105 in Section 3 | switches (10) |

Values in 1.3 are identical to the Assets copies except where noted per component below.

---

## 2. Text styles used by controls (no styles bound; values read per node)

| Role | Family / style | Size | Colour |
|---|---|---|---|
| Button label (32px) | Nunito SemiBold | 14 | #000000 on filled; fill colour on outlined; #BABEC7 disabled |
| Button label (24px chip-button, inline Cancel 48x20) | Nunito SemiBold | 12 | same rules |
| Input / dropdown value | Nunito Regular | 14 | #FFFFFF{Primary text}; placeholder #707079{Secondary text} |
| Field label | Nunito Regular | 12 | #707079{Secondary text} |
| Error message | Nunito Regular | 12 | #FF7272{Red} |
| Tab label | Nunito Medium | 14 (12 in one Activity tab set `6059:14340`) | Active/Hover #FFFFFF{Primary text}; Not active #BABEC7{Light grey text} |
| Radio label / switch label | Nunito Medium | 14 | #FFFFFF (active) / #BABEC7 (switch off) |
| Checkbox label (modal) | Nunito Regular | 14 | #BABEC7{Light grey text} (Structured / PBA) ; in modal recipient list Regular 14 #FFFFFF |
| Filter checkbox label | Nunito Medium | 12 | #FFFFFF |
| Chip text | Nunito Regular | 14 | #FFFFFF |
| Tooltip | Nunito Regular | 14 | #FF9747{Edit} / #FFDC51 (colour = severity) |
| Right-click menu item | Nunito Medium | 12 | #FFFFFF |
| Modal title | Nunito Medium | 18 | #FFFFFF, centred |
| deselect-all count "(5)" | Nunito Medium | 12 | #A4A4FF |
| DEV tag | Nunito SemiBold | 16 | #FEE274{yellow} |

---

## 3. Buttons

All text buttons: AL HORIZONTAL, gap 10 (8 for outlined/transparent), padding T11 R24 B11 L24, main/counter CENTER/CENTER, width HUG, height FIXED 32, clip content. Text box is `WIDTH_AND_HEIGHT`, centre aligned. The component-set variant frame (the COMPONENT) is HUG/HUG with no fill; the inner frame "Primary button" carries styling in Purple only; in other sets the COMPONENT itself is the styled frame.

### 3.1 Primary purple - set "Purple" `4398:15428` (original look used by screens: New/Add instance with fill overridden to #A4A4FF)
| State | id | Size | Fill | Stroke | Radius | Text |
|---|---|---|---|---|---|---|
| Default | 4398:15429 (inner 4398:15430) | 92x32 ("Button") | #A4A4FF{Primary purple} | none | 4 | Nunito SemiBold 14 #000000{Black} |
| hover | 4398:15432 (inner 4398:15433) | 92x32 | #A4A4FF{Primary purple} + #FFFFFF@0.3 | none | 4 | #000000 |
| disabled | 4398:15435 (fill on outer component; inner 4398:15436 transparent) | 92x32 | #707079{Secondary text} | none | 4 | #BABEC7{Light grey text} |
Diff: hover = white overlay 30%; disabled = solid #707079, text #BABEC7. No border in any state.

### 3.2 Teal "New/Add" - set `4398:15337` (page original 28:23)
| State | id | Fill | Text |
|---|---|---|---|
| Default | 4398:15338 | #30F0D6{Add New} | #000000 SemiBold 14 |
| Hover | 4398:15340 | #30F0D6{Add New} + #FFFFFF@0.4 | #000000 |
| Disabled | 4398:15342 | #707079{Secondary text} | #BABEC7{Light grey text} |
92x32 ("Button"), r4, no stroke. Screens: "Add New" 109x32, "Add Permission" 156x32 native teal; "Save Changes" 139x32 = same instance with fill override #A4A4FF{Primary purple} (text stays #000000); "Create" 91x32 uses the Disabled variant `28:26` (#707079 / #BABEC7).

### 3.3 Cancel / grey-white - set `4398:15344` (page original 29:110)
| State | id | Fill | Text |
|---|---|---|---|
| Default | 4398:15345 | #E6E6E6{Cancel Button} | #000000{Black} SemiBold 14 |
| "Disabled" #1 (is hover) | 4398:15347 | #E6E6E6{Cancel Button} + #FFFFFF@0.3 | #000000 |
| "Disabled" #2 (real disabled) | 4398:15349 | #707079{Secondary text} | #BABEC7 |
92x32 r4. Naming bug: two variants share name `Property 1=Disabled`. Screens: "Cancel" 92x32, "Close" 84x32 (hugged), inline "RBS" 48x20: r2, padding 11/12/11/12, text SemiBold 12 #000000{BG}.

### 3.4 Outlined purple - set `4398:15474`
Stroke 1 INSIDE, radius 3, gap 8, padding 11/24, 92x32.
| State | id | Fill | Stroke | Text |
|---|---|---|---|---|
| Default | 4398:15475 | none | #A4A4FF{Primary purple} | #A4A4FF SemiBold 14 |
| hover | 4398:15477 | #39394E{Purple 2} | #A4A4FF | #A4A4FF |
| disabled | 4398:15479 | none | #707079{Secondary text} | #BABEC7 |

### 3.5 "Button transparent" (tinted purple) - set `4398:15491`
| State | id | Fill | Stroke | Text |
|---|---|---|---|---|
| Default | 4398:15492 | #39394E{Purple 2} | none | #A4A4FF SemiBold 14 |
| Hover | 4398:15494 | #39394E{Purple 2} + #FFFFFF@0.2 | #A4A4FF 1 INSIDE | #A4A4FF |
| disabled | 4398:15496 | #707079{Secondary text} | none | #BABEC7 |
92x32 r3 gap 8 padding 11/24.

### 3.6 Outlined teal/green - "Button transparent 2" `4398:15498` (page original "Button transparent green" 2809:2937)
| State | id | Fill | Stroke | Text |
|---|---|---|---|---|
| Default | 4398:15499 | none | #00FEA9 (unbound) 1 INSIDE | #00FEA9 SemiBold 14 |
| Hover | 4398:15501 | #1B5244 | #00FEA9 | #00FEA9 |
| Disabled | 4398:15503 | none | #707079{Secondary text} | #BABEC7 |
92x32 r3 gap 8. **Screens override this to Add New teal**: stroke #30F0D6{Add New} 1, text #30F0D6, r3 (instances "Add Currency" 136x32, "Add Permission" 156x32). So the real in-use outlined teal is #30F0D6, not #00FEA9.

### 3.7 Split button "With dropdown" (teal + chevron) - set `4398:15481`
| State | id | Size | Fill | Radius | Gap | Text/Icon |
|---|---|---|---|---|---|---|
| Default | 4398:15482 | 132x32 | #30F0D6{Add New} | 3 | 8 | "New Trade" SemiBold 14 #000000; chevron Vector 10x5 stroke #000000{Black} 1.3 |
| hover | 4398:15485 | 134x32 | #30F0D6 + #FFFFFF@0.4 | 4 (differs) | 10 (differs) | same |
| disabled | 4398:15488 | 132x32 | #707079{Secondary text} | 3 | 8 | text #BABEC7; chevron fill+stroke #BABEC7 |
Padding 11/20/11/24 (right is 20 for the chevron). Inconsistency: hover r4/gap10 vs 3/8 (flag; keep r3 gap 8 as the dominant).

### 3.8 Outlined red "Review (12)" - set `6113:14388` (24px chip-button)
Size 100x24, AL gap 4, padding 11/16/11/16, radius 2, stroke 1 INSIDE, two text nodes "Review" + "(12)" Nunito SemiBold 12.
| State | id | Fill | Stroke | Text |
|---|---|---|---|---|
| Default | 6113:14386 | none | #FD7557{Red 2} | #FD7557{Red 2} |
| hover | 6113:14389 | #392C2D{red dark} | #FD7557 | #FD7557 |
| active | 6136:14340 | #5A3834 | #FD7557 | #FD7557 |
| disabled | 6403:14741 | none | #707079{Secondary text} | #BABEC7 |

### 3.9 Outlined blue "Give-Up" - set `6113:14402`
Wrapper component 86x24 (HUG, no padding) hosts an instance of `Button transparent 2` Default with overrides: stroke #60A8FF{blue} 1 INSIDE, r2, gap 8, padding 11/20/11/20, text "Give-Up" SemiBold 12 #60A8FF. Hover (`6113:14403`): wrapper fill #2A313D{blue dark}; inner unchanged.

### 3.10 Outlined yellow "Group" - set `6113:14409`
Wrapper 74x24 hosts instance of `Outlined purple` Default with stroke #FEE274{yellow}, text "Group" SemiBold 12 #FEE274, r2, padding 11/20/11/20. Variant2 (`6113:14410`, hover): wrapper fill #3A3730{yellow dark}.

### 3.11 "status" dropdown chip-button - set `6765:14816`
96x24, fill #39394E{Purple 2}, r3, padding 11/20/11/24, gap 8, text "Status" SemiBold 12 #A4A4FF; chevron Vector 8x4 fill+stroke #A4A4FF 1.3.
| State | id | Fill | Stroke |
|---|---|---|---|
| Default | 6765:14815 | #39394E | none |
| hover | 6765:14820 | #39394E + #FFFFFF@0.2 | none |
| disabled | 6765:14823 | none | #707079{Secondary text} 1 INSIDE; text stays #A4A4FF (not greyed), chevron #BABEC7 (inconsistent) |

### 3.12 csv - set `6804:14833`
| State | id | Size | Fill | Notes |
|---|---|---|---|---|
| Default | 6804:14832 | 61x24 (HUG/FIXED) | #264A35 | r2, AL gap 4, padding 7/8/7/8, icon `lucide/upload` 16x16 (Union 13x13 fill #2BDF68, two inner vectors stroke #000000 1), text "CSV" **Inter Regular 12** #2BDF68{Active} (the only Inter text in the library) |
| hover | 6804:14834 | 61x30 (HUG/HUG - height differs) | #264A35 + #000000@0.2 | same |

### 3.13 Icon-only buttons
| Name | id | Size | Icon | Colour default | Hover |
|---|---|---|---|---|---|
| Edit (pencil) set `4398:15364` / `62:207` | 4398:15365 / 62:205 | 32x32, no fill | instance `edit/Default` 20x20 at (6,6) (page original 62:191) | #FF9747{Edit} | `4398:15367` / `62:208`: icon fill #FFBF8E |
| Trash set `4398:15423` | 4398:15424 | 32x32 | vector 18x18 at (7,7) | #FF7272{delete} | `4398:15426`: #FF7272 + #FFFFFF@0.3 |
| Amber add "+" (not a component; frame `Add ` 5539:15220, 5536:14901, 5536:14987) | - | 32x24, fill #FF9747{Edit}, r4, plus icon 12x12 #000000{Black} at (10,6) | - | - |
| Inline trash in modal `5539:15224` | - | vector 14x14 fill #FF7272{Red} | - | - |
| Settings | 16:133 | 24x24 | #BABEC7{Light grey text} | - | - |
Edit icon in Trading Account usage is also shrunk to 12x12 (`6530:14769`).

### 3.14 Tabs (button-like) - set `4398:15351` (set bg #000000)
AL HORIZONTAL gap 8, padding T16 R32 B16 L32, main MIN / counter CENTER, size 102x42 (HUG/FIXED), text Nunito Medium 14.
| State | id | Fill | Stroke | Text |
|---|---|---|---|---|
| Active | 4398:15352 | none | bottom only 2px INSIDE #A4A4FF{Primary purple} (weights 0/0/2/0) | #FFFFFF{Primary text} |
| Hover | 4398:15354 | #171719{Grey 2} | same bottom 2px purple | #FFFFFF |
| Not  Active | 4398:15356 | none | none | #BABEC7{Light grey text} |
Screens override: 77 instances at height 32 with padding 12/24/12/24 (gap 8) in Activity tab bars (e.g. widths 100 "Account", 132 "Counterparty", 104 "Platform", 131 "Prime Broker", 102 "Contract"); one set at text size 12 (`6059:14340`, "Client"). Frame variants `Tabs` 6059:14429/14433: 534x32, padding 12/24, text purple, used as segmented tabs.

---

## 4. Inputs

### 4.1 Common field geometry
Field = 32px tall frame, fill `Inputs on modal` #39393C, radius 4, no stroke, AL HORIZONTAL gap 8, padding T8 R12 B8 L8 (text fields, selects, date, time) or 8/8/8/8 (search). Text Regular 14 #FFFFFF; placeholder/"Search" #707079. Label (when present) is a separate text above the field: Regular 12 #707079{Secondary text}, label at y=0, field at y=12, so label+field = 44. Widths are FIXED (default 158; real screens 61-273).

| Component | id | Size | Details |
|---|---|---|---|
| Input | 4398:15330 | 158x32 | MIN/CENTER; text "Text" Regular 14 white |
| Input with label | 4398:15325 | 158x44 | frame `Search with label` 158x44 > field `Frame 9` 158x32 at y12 + Label "Label" at (0,0) |
| Input Error | 4398:15332 | 158x56 | field stroke #FF7272{delete} 1 INSIDE (fill unchanged #39393C); error message "Error message" Regular 12 #FF7272{Red} at y=48 (4px under field) |
| Search | 4398:15301 | 158x32 (HUG height) | padding 8 all, gap 8; magnifier Vector 16x16 stroke #A4A4FF{Primary purple} (weight 4.17 on scaled vector, appears thin; visual estimate), placeholder "Search" #707079 |
| Search with label | 4398:15305 | 158x44 | same field with white "Text" |
| Dropdown | 4398:15322 | 158x32 | main SPACE_BETWEEN; caret = Polygon 12x8 fill #A4A4FF{Purple 1}, solid downward triangle (visual: solid triangle) |
| Dropdown with label | 4398:15310 | 158x44 | as above with label |
| Dates | 4398:15316 | 158x44 | SPACE_BETWEEN; calendar Vector 16x16 fill #A4A4FF; text e.g. "11/08/2024" (dd/mm/yyyy) |
| Time | 4398:15438 | 89x44 | field 89x32, "10:25" + clock Vector 16x16 fill #A4A4FF; label "Time" |
| Password | set 4398:15443 | 216x44 each (set 501x86) | Hidden `4398:15444`: label "Password" Regular 12 #707079, mask = Group of 10 ellipses 6x6 fill #BABEC7 (group 114x6), eye icon Vector 18x12.43 fill #A4A4FF at x186,y22. Visible `4398:15458`: text "password12" Regular 14 white at (12,22), eye-off Vector 18x18 fill #A4A4FF at (186,19) (the mask group is hidden). |
| Chips field | 4398:15387 | 186x44 | field 186x32 padding 4/8/4/8 gap 4, MIN/MIN; label above |
| Chips (multi-row) | 4398:15369 | 186x84 | field 186x72 padding 8 all, gap 4, `wrap`; trailing text-entry "012345 |" Regular 14 white (caret as a pipe char in a Group 58x10) |
| Textarea-like multi-select box (Add Permissions) | 5580:14608 / 5580:14610 | 592x72 / 592x34 | fill #39393C{Inputs on modal}, r4, AL gap 10, padding 12/8/12/8, text Regular 14 white wrapping (576 wide), no caret |
| Scroll track (modal) | 5580:14620 | 4x308 | track #39393C r35.61 (shadow 0/11.87 blur 11.87 #000@0.25), thumb #707079{Secondary text} 4x208 r35.61 |

**Missing in Figma for inputs: hover, focus, disabled, filled-vs-placeholder variants (placeholder drawn only via colour in separate usages), read-only.** The library field shows only the resting state plus the error stroke.

### 4.2 Fill rule observed in screens (important deviation from library)
Library field fill is always #39393C, but screens re-fill the same `Dropdown`/`Input`/`Search` instances one step lighter than whatever surface they sit on:
| Surface behind field | Field fill used | Examples |
|---|---|---|
| Modal BG #242428 (modal body) | #39393C{Inputs on modal} | New Trading Account `5539:15235` Dropdown 72x32, `5539:15236` Input 162x32, `5539:15239` Dropdown 242x32; Input with label `5536:14964` |
| Page panel #171719 / BG Grey 1 (page, no card) | #242428{Modal BG} | `5536:14887` Dropdown 78x32, `5536:14891` Dropdown 256x32, `5536:14888` Input 161x32, Search `3648:7352` 208x32 |
| Inner list panel #39393C inside modal (Lucera / recipients) | #242428{Modal BG} | `5539:15222` Dropdown 61x32, `5539:15223` Input 110x32 on panel `5539:15219` #39393C; email-entry bar `5536:14985` (282x32, #242428) |
So input fill alternates: #171719 -> #242428 -> #39393C -> #242428. Use a "surface-aware" input fill, not a fixed one.
Other deviations: email input frame (`5536:14921`, `5536:14985`, `5580:14586`, `3661:4970`): 278-282x32, padding 8/4/8/8 (right padding 4 to house the 32x24 amber "+" button flush right), main SPACE_BETWEEN, placeholder #707079 "example@email.com". Dropdown/Input widths are always set per layout (FIXED) - never the default 158. Narrow selects 61/67/72/78 wide hold 2-3 letter codes (RBS, NY); wide 242/256/273 hold names.

---

## 5. Selection controls

### 5.1 Checkbox - set `4398:15418`
16x16, radius 2, no stroke, clip. Unchecked `4398:15419`: fill #39393C{Menu bar}. Checked `4398:15421`: fill #A4A4FF{Primary purple} + check Vector 12x9 fill #000000{Black} at (2,3). Hover/disabled/focus not drawn. Frame `all` (indeterminate) `4617:14314`: fill #A4A4FF r2, black horizontal line 10x0 stroke 1.5 OUTSIDE at (3,9).
deselect-all control (set `4398:15505`, 38x16): `trades selected` = indeterminate box (fill #A4A4FF r2 with black 10px line stroke 1.5) + "(5)" Medium 12 #A4A4FF at (20,4); `no trades selected` = box only, fill none, stroke #39393C{Separators} 1 INSIDE, r2 (in the filter popover it appears with fill #39393C, `6544:14762`).
In screens: instance widths 16x16, and 17x16 (a stretched 16.93x16 variant in recipient rows, check vector 12.69x9 at (2.12,3)). Labels: modal "Structured"/"PBA" Regular 14 #BABEC7, gap 8 (text at x+24); recipient rows email Regular 14 #FFFFFF, checkbox right-aligned at x=812 of a 274-wide row.

### 5.2 Radio - set `4398:15358`
16x16 ellipse, stroke #A4A4FF{Primary purple} 1 INSIDE, no fill. True adds dot 8x8 fill #A4A4FF at (4,4). Hover/disabled not drawn. Labels in screens: Medium 14 #FFFFFF, 8px gap (text at x+24); radio groups laid with ~32px between options (visual: 'Client', 'Market Maker').

### 5.3 Switch - set `4398:15402` and `Switch with text` `89:105`
Track 32x16 radius 12; knob ellipse 12x12 fill #FFFFFF{Primary text}.
| State | Track fill | Knob x | Knob shadow |
|---|---|---|---|
| true | #2BDF68{Active} | 2 (y2) | DROP_SHADOW #005F20@0.5 offset (-1,1) blur 3 spread 0 |
| false (named "falce") | #BABEC7{Light grey text} | 18 in Switch, 17 in Switch with text (1px inconsistency) | DROP_SHADOW #515151@0.5 (-1,1) 3 0 |
With text: component 80x16; label at x=40, y 2-3 (gap 8 after 32px track), Nunito Medium 14: "Active" #FFFFFF when on, "Not Active" #BABEC7 when off. Screens relabel ("Give-up", "Staging Status") but always use the `true` variant `89:96`.

### 5.4 Chips / tags (inside inputs)
Chip `4398:15389`: 82x24 (HUG), fill #242428{Modal BG}, radius 12, AL gap 8, padding 4/8/4/8, text Regular 14 white (e.g. "12345"), close icon frame 16x16 (Union 11.6x11.6 fill #BABEC7). Inside a field of fill #39393C. Wrap variant: chip width FIXED, text FILL.
Pill chip in some modals `7047:14817` ("ABN AMRO Bank N.V."): 188x32, fill #39393C{Inputs on modal}, **radius 20**, gap 8, padding T4 R8 B4 L16, text Regular 14 white, close icon 16x16 #BABEC7 (on #242428 modal).
DEV environment tag `6984:14477`: 81x32, fill #FFB800@0.15, stroke #FEE274{yellow} 1, r4, padding 11/24, text "DEV" SemiBold 16 #FEE274.

---

## 6. Overlays

### 6.1 Tooltip (18 instances in Section 3; frames named `tooltip`)
FRAME, fill #39393C{Inputs on modal}, r4, AL HORIZONTAL CENTER/CENTER gap 10, padding 11/16/11/16, height 32, hug width (145 / 140 / 191 observed).
Shadow: `3107:6489` DROP_SHADOW #000000@0.5 (-2,2) blur 4 spread 1; `3107:6491` and `4402:16433` DROP_SHADOW #000000@0.4 (-1,2) blur 4 spread 0 (two shadow recipes exist).
Text Regular 14; colour carries meaning: #FF9747{Edit} ("Unallocated trade", "Bloomberg Disconnected"), #FFDC51 ("Ungrouped trade"). No arrow/caret drawn.

### 6.2 Right-click menu `3107:6493`
183x120, fill #242428{Modal BG}, r8, shadow #000000@0.5 (-2,2) 4 1. Rows are Groups 12px tall: icon 12x12 fill #BABEC7 + label Medium 12 #FFFFFF; hover row = rectangle 183x28 fill #39393C{Separators} (`3107:6497`, behind the hovered row).

### 6.3 Filter popover (`6544:14756`, `6234:14340`; date variant `6236:14733` 237x136)
237 wide, fill #242428{Modal BG}, r8, shadow #000000@0.5 (-2,2) 4 1, clip, inner padding 16. Search field 205x24 r2 fill #39393C: icon 12x12 stroke #A4A4FF, text "Search" Regular 12 #707079 (small search variant). Rows 16px tall: checkbox + label Medium 12 white ("All", "Blanks", "HSBC BH ALPHA HSBC"...). "All" row uses deselect-all `no trades selected` instance. Date variant: two `Dates` instances 205x44 with labels "From"/"To" at (16,16) and (16,76).

### 6.4 Modal "Edit Client" `5536:14961` (873x573)
fill #242428{Modal BG}, radius 12; title Medium 18 white centred at y=24; header separator `Line 4` stroke #39393C{Separators} 1 at y=61 (874.07 wide); body column x=32, labelled fields 242 wide; footer buttons at y=517 (Cancel 92x32 at x32, primary 91x32 right-aligned to x=841 = 32 px margin). Overlay behind = page dimmed (visual). Panels inside modal: fill #39393C r4 (Lucera 221x388, recipients 298x388) with 1px row separators #242428{Modal BG}; sticky footer `Frame 20` 298x48 fill #39393C r(0/0/4/4) with shadow #000000@0.25 (0,-4) blur 4; entry field inside 282x32 at (8,8).

---

## 7. Other library components
- MasterFlag set `594:5758` (hidden on canvas): Circle 44x44 r1000000; Square 44x44 r0; Rectangle 58x44; Rounded 58x44 r10; inner flag instance 60x45 offset (-8/-1, -0.5); `MasterFlag/Greyscale` layer (blend COLOR, fill #FFFFFF) hidden by default. In screens used at 20x16 (variant Rounded) next to bank names.
- Animation set `4398:15284` (live-status pulse, green): 30x30 frames; `1`: three 8x8 dots #2BDF68; `2`: dot 10 #2BDF68, ring 16 #2BDF68@0.2, dot 12; `3`: dot 10, rings 30 @0.1 and 20 @0.2; `4`: dot 8, ring 30 #2BDF68@0.05, an invisible 40x40 ring. Used as 30x30 "Animation/1" status indicator at footer right of every screen. (Note: variants are named "4,3,2,1" and the 3 sub-layers a/b/c.)

---

## 8. Usage measurements in real screens (deviations from library)

Instance counts across the four screens (top-level instances): Cancel 11, Dropdown 17, Input 10, New/Add 8, Button transparent green 4, Switch with text 10, Radio 10, Checkbox 51, Input with label 2, Search 1, Edit icons 3-4.

| Control | New Trading Account `5536:14786` | Add Permissions `5580:14451` | Entities `3999:18361` (sub-screens Static Users, Entity, Trading Account, Trader) | Trading Account `4031:18455` (frame is hidden, visible=false, renders blank) |
|---|---|---|---|---|
| Cancel | 92x32 "Cancel"; 84x32 "Close"; 48x20 inline r2 pad 11/12 text 12 | same | 84x32 "Close" x2; 48x20 | 48x20; 84x32 |
| Primary (purple) | "Save Changes" 139x32 (New/Add + fill #A4A4FF) | same | 139x32 x2 | 139x32 |
| Primary teal | none (Disabled "Create" 91x32 #707079) | "Add Permission" 156x32 teal | "Add New" 109x32 | - |
| Outlined teal | "Add Currency" 136x32, stroke #30F0D6 r3 | same 136x32 | 156x32 "Add Permission" | 156x32 |
| Dropdown | 78/256/67/61/72/242 wide; fills per 4.2 | 78/256/67/158 | 78/256/67 | 78/273/67 |
| Input | 161/144/110/162 wide | 161/144 | 161/144 | 178/155 |
| Switch | 80x16 (true) with relabelled text | 80x16 | 80x16 | 80x16 |
| Radio | 16x16 | 16x16 | 16x16 | 16x16 |
| Checkbox | 16x16 and 17x16 (recipient rows), 11 total | 10 total | 18 total | 6 total |
| Search | - | - | 208x32 fill #242428 | - |
Key deviations: (1) input fill varies by surface (4.2); (2) the library "New/Add" is teal but the dominant primary action is purple via instance override; (3) outlined teal uses #30F0D6 not the library's #00FEA9; (4) the 20px-tall inline Cancel "RBS" with radius 2/size 12; (5) field text for labelled dropdown groups uses Regular 14 but radio/switch labels Medium 14; (6) tab bars at height 32 not 42; (7) DEV tag 16px.

---

## 9. GAPS (searched for, not found in Figma)
- Focus state / focus ring for any control (inputs, buttons, tabs, checkbox, radio, switch): none drawn.
- Pressed/active state for any button except Outlined red `active`.
- Hover state for: Input, Dropdown, Search, Checkbox, Radio, Switch, Chip close (x), tooltip.
- Disabled state for: Input, Dropdown, Checkbox, Radio, Switch, Tabs, Edit/Trash icon buttons, Chips.
- Error state for Dropdown, Search, Dates, Time, Password, Textarea (only plain `Input Error` exists).
- Dropdown open state / option-list menu: no select popover component (only the right-click menu and the filter popover). Date picker / time picker popovers: none.
- Textarea component (only wrapped text frames 5580:14608/14610).
- Dedicated badge / status-tag component: none; "badges" are the outlined 24px chip-buttons (3.8-3.11) and the DEV tag.
- Toast / snackbar / alert banner: none found (name search for toast, snack, alert, notification returned nothing).
- Pagination, table header/row components, accordion, segmented control, avatar: none as components (tables are drawn from raw rectangles/lines).
- Tooltip arrow/pointer: none.
- Radio/checkbox label as an integrated component (label is a loose text beside the instance).
- Text styles / effect styles: none defined (all raw values); only color variables exist.
- Loading/spinner: only the green pulse `Animation`.
- Light-mode variants: none (dark only).

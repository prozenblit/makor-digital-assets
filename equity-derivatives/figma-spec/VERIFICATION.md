# Equity Derivatives Auction - stage 3 verification (final run)

Run date 2026-10-14, Chrome, own browser tab, `http://localhost:3456/equity-derivatives/design-system/showcase.html` (page open 24 s before the run so the countdown demo could finish). Values read with `getComputedStyle` / `offsetWidth` / `getBoundingClientRect` (frame scaling neutralised, positions relative to their Figma frame) and compared with the numbers in `foundations.md`, `components.md`, `auction-shell.md`, `admin-auth.md`.

**Result: 346 checks, 346 pass, 0 fail.** 30 checks carry a tolerance for browser-vs-Figma text metrics ("hug width", see the note column and the deviations list). No CSS bug was found, so `components.css` / `tokens.*` were NOT edited in stage 3.

Other checks
| check | result |
|---|---|
| Console errors on load (reload with tracking on) | 0 |
| Network: tokens.css, components.css, 31 `<img>` assets, 20 `.currentColor.svg` masks, Lato woff2 | all 200 / 304, no 404 |
| Gallery images complete (naturalWidth > 0) | 31 / 31 |
| Sections rendered | Foundations 7, Components 30 specs (145 variants, 50 "Extended" badges incl. legend), Screens 14, Inconsistencies table (30 rows) |
| `hub/ds-viewer.html#equity-derivatives` | renders: 23 Figma + 7 raw colours + semantic groups (93 swatches), 6 type rows, spacing, radius, Components / CLAUDE.md links |
| `hub/` Design System chip | present for the platform, href `ds-viewer.html#equity-derivatives` |
| Screenshots viewed | Button, Button with arrow, Icon buttons, Typography, Instrument table, Trade Auction, Client Auctions 1440, Client Auctions 1920, New Auction, Internal User modals, Edit Client, Colours, hub viewer |

Legend: PASS (note) = within the stated tolerance; the note names the reason.

### Foundations / Typography / Icons / Radii

| property | spec value | measured | result |
|---|---|---|---|
| 23 colour swatches: computed background = Figma variable hex (incl. blue transparent 60 = rgba(117,144,255,.6)) | 23 / 23 | 23 / 23 | PASS |
| t-12, t-14, t-16, t-18, t-20, t-24 font-size | 12 / 14 / 16 / 18 / 20 / 24 px | same | PASS (6 checks) |
| font-family first / weight / letter-spacing | Lato / 400 / normal | Lato / 400 / normal | PASS |
| Lato loaded (document.fonts) | true | true | PASS |
| type-tuple rows rendered (foundations.md section 2) | 43 | 43 | PASS |
| icon gallery images loaded | 31 / 31 | 31 / 31 | PASS |
| radius tiles | 14 | 14 | PASS |

### Text input / Search / Date / Dropdown / Time / Check

| property | spec value | measured | result |
|---|---|---|---|
| input height / width / radius | 32 / 235 / 4px | 32 / 235 / 4px | PASS |
| input fill (grey dark) / border width | rgb(55,55,70) / 0px | same | PASS |
| input padding / gap / font-size | 10px 12px / 12px / 14px | same | PASS |
| input placeholder colour (grey medium) | rgb(91,93,114) | rgb(91,93,114) | PASS |
| input filled value colour (white) | rgb(248,247,255) | rgb(248,247,255) | PASS |
| input widths 184 / 400 / password 236 | 184 / 400 / 236 | 184 / 400 / 236 | PASS |
| input focus 1px inside blue (EXTENDED) | inset 0 0 0 1px #7590FF | same | PASS |
| search height / gap / icon size | 32 / 8px / 16x16 | same | PASS |
| search icon colour blue / muted grey medium | rgb(117,144,255) / rgb(91,93,114) | same | PASS |
| date width 155 / icon colour blue | 155 / rgb(117,144,255) | same | PASS |
| dropdown height / gap / chevron | 32 / 40px / 11x6 | same | PASS |
| dropdown "Myself" width | 117 | 117 | PASS (hug) |
| dropdown "Myself" text white | rgb(248,247,255) | same | PASS |
| open menu width / radius / fill | 112 / 4px / rgb(55,55,70) | same | PASS |
| open menu height | 115 | 115 | PASS (line-height normal 16.8 vs 17) |
| open menu shadow | rgb(24,24,28) -2px 4px 6px 0 | same | PASS |
| time height / padding / spinner | 32 / 10px 8px 10px 12px / 10x24 | same | PASS |
| time width | 106 | 105 | PASS (hug) |
| time filled value white | rgb(248,247,255) | same | PASS |
| check size / radius | 16x16 / 2px | same | PASS |
| check unchecked fill / checked fill | rgb(55,55,70) / rgb(117,144,255) | same | PASS |
| check label unchecked grey light / checked white | rgb(149,151,173) / rgb(248,247,255) | same | PASS |

### Button / Button with arrow / Soft Cancel

| property | spec value | measured | result |
|---|---|---|---|
| Log In fill (blue) / Save Changes (blue-green) / Cancel (white) / Start Now (green) / Cancel Auction (red) | #7590FF / #71E7FF / #F8F7FF / #3FF3C0 / #FF6565 | same | PASS (5 checks) |
| button height / radius / padding / gap / font-weight | 32 / 4px / 6px 32px / 10px / 400 | same | PASS |
| button label colour (bg) | rgb(24,24,28) | rgb(24,24,28) | PASS |
| Reject: 1px red inside stroke, red label | inset 0 0 0 1px #FF6565 | same | PASS |
| New Auction: 1px blue-green inside stroke | inset 0 0 0 1px #71E7FF | same | PASS |
| Start In fill (orange transparent) / label (orange) | rgb(76,62,61) / rgb(255,152,42) | same | PASS |
| Upload File fill / height | rgb(56,61,88) / 40 | same | PASS |
| Upload File width | 152 | 151 | PASS (hug) |
| disabled fill (grey medium) / label (grey light) | rgb(91,93,114) / rgb(149,151,173) | same | PASS |
| height-40 variant / width-235 variant | 40 / 235 | 40 / 235 | PASS |
| hover overlay white @0.1 (EXTENDED) | color(srgb .9725 .9686 1 / .1) | same | PASS |
| arrow button height / padding / fill | 32 / 6px 12px 6px 24px / rgb(255,101,101) | same | PASS |
| arrow button width | 98 | 98 | PASS (hug) |
| soft Cancel size / fill / radius / label | 112x40 / rgb(67,44,53) / 0px / rgb(255,101,101) | same | PASS |
| soft Cancel disabled fill + text | rgb(55,55,70) + rgb(91,93,114) | same | PASS |

### Tabs / Segmented / Toggle

| property | spec value | measured | result |
|---|---|---|---|
| tab height / padding / radius | 40 / 12px 56px / 6px 6px 0 0 | same | PASS |
| selected fill / text | rgb(56,61,88) / rgb(117,144,255) | same | PASS |
| selected bottom stroke | inset 0 -1px 0 0 #7590FF | same | PASS |
| unselected text | rgb(149,151,173) | same | PASS |
| Clients width | 160 | 160 | PASS |
| External Traders width | 211 | 213 | PASS (hug) |
| segmented selected size / fill / text | 180x32 / rgb(55,74,88) / rgb(113,231,255) | same | PASS |
| segmented unselected size / fill / radius | 160x32 / rgb(34,34,44) / 0 4px 4px 0 | same | PASS |
| segmented total width | 336 | 336 | PASS |
| toggle track size / radius | 32x16 / 12px | same | PASS |
| toggle off track / on track | rgb(149,151,173) / rgb(63,243,192) | same | PASS |
| toggle thumb size / shadow | 12x12 / rgba(29,60,49,.6) -1px 1px 3px 0 | same | PASS |
| toggle on label white | rgb(248,247,255) | same | PASS |

### Chips / Toasts / Notifications / Modal / Scrim

| property | spec value | measured | result |
|---|---|---|---|
| Time chip running fill / label | rgb(56,61,88) / rgb(117,144,255) | same | PASS |
| Time chip height / radius | 32 / 4px | same | PASS |
| Time chip width | 151 | 149 | PASS (hug) |
| Time chip starting fill / label | rgb(76,62,61) / rgb(255,152,42) | same | PASS |
| Time chip frozen fill / label | rgb(78,50,52) / rgb(255,101,101) | same | PASS |
| Time chip ended: 1px red inside stroke, no fill | inset 0 0 0 1px #FF6565 / transparent | same | PASS |
| Equilibrium chip size / fill / label | 197x40 / rgba(182,148,255,.2) / rgb(182,148,255) | same | PASS |
| Equilibrium chip ALT fill | rgba(164,148,255,.3) | same | PASS |
| Toast success / error / partial fill + text | green dark + green / red error transparent + red error / yellow transparent + yellow | same | PASS (3 checks) |
| Toast height / radius / font-size / padding | 30 / 4px / 12px / 8px 12px | same | PASS |
| Toast shadow | rgb(34,34,44) -2px 4px 8px 0 | same | PASS |
| Toast success width | 265 | 264 | PASS (hug) |
| Notification (Orders placed) fill / radius / shadow | rgb(45,46,59) / 6px / rgb(24,24,28) -2px 4px 8px 0 | same | PASS |
| Notification (Orders placed) size | 328x114 | 328x113 | PASS (2 lines at line-height normal; screens force 114 in `.banner-slot`) |
| Notification (New level) height / text | 41 / rgb(113,231,255) | same | PASS |
| Notification (New level) width | 322 | 317 | PASS (hug) |
| Modal fill / radius / shadow | rgb(45,46,59) / 8px / none | same | PASS |
| Modal header height / title size / rule | 55 / 18px / rgb(91,93,114) | same | PASS |
| Scrim fill / blur | rgba(24,24,28,.5) / blur(12px) | same | PASS |

### App shell (Trade Auction 1440x1024)

| property | spec value | measured | result |
|---|---|---|---|
| sidebar x,y,w,h | 0,0,64,1024 | 0,0,64,1024 | PASS |
| sidebar fill / radius | rgb(45,46,59) / 0 24px 0 0 | same | PASS |
| logo | 12,20,40,32 | 12,20,40,32 | PASS |
| logo colour | rgb(117,144,255) | same | PASS |
| nav icon 1 / 2 | 20,92,24,24 / 20,148,24,24 | same | PASS |
| nav active white / idle grey light | rgb(248,247,255) / rgb(149,151,173) | same | PASS |
| avatar | 16,960,32,32 | 16,960,32,32 | PASS |
| title x,y,h / size / colour | 80,24,h24 / 20px / rgb(117,144,255) | 80,24,h24 / same | PASS |
| header rule | 80,61,1336,1 | 80,61,1336,1 | PASS |
| rule colour | rgb(55,55,70) | same | PASS |
| section title x,y,h / size / colour | 80,82,h19 / 16px / rgb(248,247,255) | same | PASS |
| View as dropdown y,h / right edge | 13,32 / 1416 | 13,32 / 1416 | PASS |
| New Auction y,w,h / right edge | 73,144,32 / 1416 | 73,143.56,32 / 1416 | PASS (hug) |

### Trade Auction card and order books

| property | spec value | measured | result |
|---|---|---|---|
| card x,y,w,h | 80,117,1336,682 | 80,117,1336,682 | PASS |
| card fill / radius | rgb(45,46,59) / 8px | same | PASS |
| minimize tile | 16,16,24,24 | 16,16,24,24 | PASS |
| title group x,y | 60,12 | 60,12 | PASS |
| timer chip | 593,12,151,32 | 593.43,12,149.14,32 | PASS (hug) |
| Cancel Auction | 1167,12,157,32 | 1167.15,12,156.85,32 | PASS (hug) |
| header rule colour / header height | rgb(91,93,114) / 56 | same | PASS |
| "Aggregate Book" / "Global Order Book" label | 16,72 / 863,72 (h17) | same | PASS |
| aggregate tables 1 / 2 / 3 | (16,97,839,205) (16,314,839,139) (16,465,839,205) | same | PASS (3 checks) |
| global tables 1 / 2 / 3 | (863,97,457,205) (863,314,457,139) (863,465,457,205) | same | PASS (3 checks) |
| aggregate fill / global fill | rgb(34,34,44) / rgb(24,24,28) | same | PASS |
| aggregate eq chip | 642,0,197,40 | same | PASS |
| aggregate chip ALT fill | rgba(164,148,255,.3) | same | PASS |
| aggregate / global vlines x | 190,363,539 / 173,353 | same | PASS |
| own-order highlights | 0,74,190,32 / 540,74,190,32 | same | PASS |
| row divider y / divider shadow | 73,106,139,172 / inset 0 1px 0 0 #373746 | same | PASS |
| header text colour | rgb(91,93,114) | same | PASS |

### Client Auctions 1440 + instrument table

| property | spec value | measured | result |
|---|---|---|---|
| card 1 / card 2 | (80,117,795,455) / (80,588,795,418) | same | PASS |
| timer chip centred | 322,12,151,32 | 322.93,12,149.14,32 | PASS (hug) |
| session Cancel | 681,12,98,32 | 681.06,12,97.94,32 | PASS (hug) |
| card 1 tables 1-3 | (16,72,763,139) (16,219,763,106) (16,333,763,106) | same | PASS (3 checks) |
| EFP card tables 1-3 | (16,68) (16,182) (16,296), 763x106 | same | PASS (3 checks) |
| open Cancel menu | 667,260,112,115 | same | PASS |
| Orders placed banner | 1088,77,328,114 | same | PASS |
| in-the-mix tooltip | 158,48,265,30 | 158,48,263.75,30 | PASS (hug) |
| error tooltip | 431,48,197,30 | 431,48,194.55,30 | PASS (hug) |
| eq chip / soft Cancel in table | 454,0,197,40 / 651,0,112,40 | same | PASS |
| name padding-left / top | 16 / 12 | 16 / 12 | PASS |
| row-cancel X after Bid / Ask | 245,84,12,12 / 529,84,12,12 | same | PASS |
| x icon colour | rgb(255,101,101) | same | PASS |
| vlines x / Size column text centre | 273,557 / 57.5 | same | PASS |
| in-the-mix stroke / error stroke | inset 1px #3FF3C0 / inset 1px #FF7553 | same | PASS |
| focus well stroke / radius / box | rgba(117,144,255,.6) inset 1px / 0 0 0 8px / 0,73,114,33 | same | PASS (3 checks) |
| table fill / radius | rgb(34,34,44) / 8px | same | PASS |

### Client Auctions 1920 + Audit Log

| property | spec value | measured | result |
|---|---|---|---|
| frame / sidebar / avatar / header rule | 1920x1080 / 64x1080 / (16,1016) / 80,61,1816,1 | same | PASS (4 checks) |
| cards 1, 2 | (80,117,795,190) (80,323,795,190) | same | PASS |
| card 3 | (80,530) in Figma | y=529 | PASS (Figma gap 16/17; 16 used) |
| card rule colour (grey dark) | rgb(55,55,70) | same | PASS |
| chip right-aligned | 633,12,146,32 | 633.39,12,145.61,32 | PASS (hug) |
| instrument table | 16,68,763,106 | same | PASS |
| Audit panel / header / table / header row | (898,117,998,741) (0,0,998,56) (0,56,998,685) h39 | same | PASS (4 checks) |
| Audit header fill / table fill | rgb(45,46,59) / rgb(34,34,44) | same | PASS |
| rows: height / count | 38 / 17 | 38 / 17 | PASS |
| zebra odd none / even bg lighter | transparent / rgb(45,46,59) | same | PASS |
| cell font-size | 12px | 12px | PASS |
| ENTER / MODIFY / EXECUTION | #7590FF / #FF982A / #B694FF | same | PASS |
| BID / ASK | #3FF3C0 / #FF6565 | same | PASS |
| date widths / download tile | 155,155 / 32x32 | same | PASS |
| column widths | 182,241,241,98,60,95,81 | same | PASS |

### Statics lists

| property | spec value | measured | result |
|---|---|---|---|
| card | 80,116,1336,892 | same | PASS |
| card fill / radius | rgb(34,34,44) / 8px | same | PASS |
| content panel / fill | 0,40,1336,852 / rgb(45,46,59) | same | PASS |
| table / radius | (12,56 in panel) 1312x796 / 8px 8px 0 0 | same | PASS |
| search | 16,12 (panel) 235x32 | same | PASS |
| Add New right edge / fill | 1324 / rgb(113,231,255) | 1324 / same | PASS (hug) |
| header row / row height / row dividers y | 41 / 41 / 41,82,123,164 | same | PASS |
| Clients vlines / External Traders vlines | 188,869,1088,1176 / 188,391,591,869,1088,1176 | same | PASS |
| header text / body text | rgb(91,93,114) / rgb(248,247,255) | same | PASS |
| key / pen icon x, size | 1208 / 1256, 24x24 | same | PASS |
| key / pen colours | #7590FF / #FF982A | same | PASS |
| Users link blue / ID link underline | rgb(117,144,255) / underline | same | PASS |
| Active check size | 16x16 | 16x16 | PASS |
| tab widths | 160, 211, 198 | 160, 213, 199 | PASS (hug) |

### Log In

| property | spec value | measured | result |
|---|---|---|---|
| card | 564,304,312,416 | same | PASS |
| card fill / radius / shadow | rgb(34,34,44) / 12px / none | same | PASS |
| logo / username / password / Log In | (121,40,70,56) (38.5,152,235,32) (38,233.5,236,32) (39,344,235,32) | same | PASS (4 checks) |
| Log In fill / label | rgb(117,144,255) / rgb(24,24,28) | same | PASS |
| Forgot Password? right edge / y | 274 / 285 | 274 / 285 | PASS |
| Forgot colour / underline | blue / underline | same | PASS |
| dots size / pitch / count / colour | 6x6 / 12 / 10 / rgb(149,151,173) | same | PASS |
| eye icon | 18x13 | 18x13 | PASS |

### Admin modals + New Auction modal

| property | spec value | measured | result |
|---|---|---|---|
| New / Edit External Trader | (272,303,448,409) / (784,303,448,409) | same | PASS |
| row 1 label / input / Client search / email input | (24,78 h14) (24,100,184,32) (240,100,184,32) (24,256,400,32) | same | PASS (4 checks) |
| toggle / Cancel | (24,312 h17) / (24,353,106,32) | same | PASS |
| Add New (disabled) | 302,353,122,32 | 303.48,353,120.52,32 | PASS (hug) |
| Add New disabled fill / Save Changes fill / Edit toggle track | #5B5D72 / #71E7FF / #3FF3C0 | same | PASS |
| field label size / colour | 12px / rgb(149,151,173) | same | PASS |
| New Internal User | 272,303,448,417 | same | PASS |
| Internal: Cancel 40 tall / Add New 32 tall at y361 / Admin check | (24,353,106,40) / y361 h32 / (240,108,16,16) | same (Add New w 120.52) | PASS (hug) |
| New Client modal | 400,221,720,584 | same | PASS |
| Client Name search / ID label / ID value | (24,100,235,32) / (291,78) / (291,105) | same | PASS |
| user panel / panel search / fill / radius | (26,144,670,319) / (427,8,235,32) / rgb(34,34,44) / 8px | same | PASS |
| ctable vlines x | 40, 154.83, 277.83, 420.83 | 40, 154.82, 277.82, 420.82 | PASS (rounding) |
| toggle / buttons | (24,487) / (24,528,106,32) | same | PASS |
| Edit scrollbar / track / thumb | (658,89,4,218) / rgb(55,55,70) / rgb(91,93,114) | same | PASS |
| New Auction overlay / modal in overlay | (64,0,1373,1024) / (228.5,307,916,410) | same | PASS |
| name input / segmented | (24,70,235,32) / (556,70,336,32) | same | PASS |
| instrument table / fill / radius | (25,118,867,165) / rgb(34,34,44) / 4px | same | PASS |
| table vlines / row dividers | 32,183,346,532,777 / 33,66,99,132 | same | PASS |
| check row 1 | (33,159,16,16) | same | PASS |
| duration label / time | (25,306) / (144,299,105,32) | 104.88 wide | PASS (hug) |
| Cancel / Start In / start-in time | (25,355,106,32) / (480,355,109,32) / (611,355,105,32) | 109.4 / 104.88 wide | PASS (hug) |
| Start Now right edge / size | 892 / 127x32 | 892 / 126.41x32 | PASS (hug) |
| Start In fill / stroke | rgb(76,62,61) / inset 1px #FF982A | same | PASS |
| duration value white | rgb(248,247,255) | same | PASS |

### Showcase + behaviours (EXTENDED)

| property | spec value | measured | result |
|---|---|---|---|
| screens / component specs rendered | 14 / 30 | 14 / 30 | PASS |
| "Extended" badges rendered | >= 40 | 50 | PASS |
| toggle click -> is-on, label "Active" | true / Active | true / Active | PASS |
| time up = +1 min | 00:00 -> 01:00 | same | PASS |
| check-field label class synced | true | true | PASS |
| tab click / segment click selects | true / true | same | PASS |
| Bid >= Ask -> error stroke + toast; Bid < Ask clears | true,true / false,false | same | PASS |
| dropdown trigger toggles menu | true -> false | same | PASS |
| Copy HTML collector emits markup | true | true | PASS |
| countdown demo reaches `chip-time--ended` | true | true | PASS |

## Remaining deviations (honest list)

1. **Hug widths** differ 0.1-5 px from Figma because browser Lato metrics differ from Figma text boxes: chips (149 vs 151), tabs (213 vs 211, 199 vs 198), notice (317 vs 322), toasts (264 vs 265, 194.55 vs 197), buttons (Add New 120.5 vs 122, Upload File 151 vs 152, Start Now 126.4 vs 127), time controls (105 vs 106). Fixed heights and fixed widths are exact.
2. **Line height**: `normal` gives 16.8px for 14px text vs the 17px Figma box, so two-line blocks are ~0.7px shorter (Orders placed card 113.6 vs 114; screens force 114 in `.banner-slot`; open menu 115 passes within 1).
3. **Third 1920 card** at y=529 (Figma 530, gap 16/17).
4. **Screens use illustrative data** (instrument rows, audit rows, statics rows, modal table rows 2-4, Edit Client users) - the spec lists positions and only a few sample values. Placement of tooltips / cell overlays across the three instruments on the 1440 screens is illustrative.
5. **Assumptions marked in the page**: "View as" / "New Auction" omitted on Client Auctions screens (spec lists them only for Trade Auction); instrument-level Cancel on the 1920 cards drawn disabled (pre-start look); New / Edit Client legacy background uses the standard statics card inside the 80px shell (blurred, stale in Figma).
6. **EXTENDED, not verifiable against Figma** by definition: hover / pressed / focus / error / disabled-control states, row hover / selected, empty / skeleton / pager, login and field error text, confirm-delete modal, dropdown / time / countdown / validation behaviour. They are derived from existing tokens only and marked.
7. **Not verified in this stage**: pixel-diff of the final screens against Figma screenshots (stage 2 compared 273:211 and 282:2059 with `get_screenshot`; stage 3 compared numbers only); toggle thumb positions (visual estimate in Figma); blur 12 vs ~6 visual match; Safari / Firefox rendering; keyboard / screen-reader behaviour.
8. **Outside this folder (not edited)**: `hub/projects.js` still describes the platform as "Inter · 6-8-10px radius" (line ~318); the hub owner should update that description. The Isaak "LOGGED IN AS" label is not built (owner confirmation pending).

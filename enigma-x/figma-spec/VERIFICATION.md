# Enigma X design system: verification of the final run (stage 3)

Run: 2026-10-15, headless Chrome (CDP) against `http://localhost:3456/enigma-x/design-system/showcase` (`?all`), viewport 1700 x 1000, fonts Geist / Geist Mono loaded from Google Fonts. Spec = `figma-spec/{foundations,components,dashboard}.md` numbers (node ids in `showcase.html`); dark spec values = the sampled / derived dark tokens in `tokens.json` (**the dark theme has no Figma source, so "pass" there means the page renders the documented token, not that it matches Figma**).

Method: the Dashboard frames of the showcase (re-assembled from the documented classes, switched to 100% so no transform scale applies; light frame in `.theme-light`, dark frame in `.theme-dark`) and the component cards were measured with `getBoundingClientRect` (positions relative to the frame / panel / nav) and `getComputedStyle`. The component cards were measured under the page theme (light, then `body.dark` via the top-bar toggle).

## Summary

| Result | Count |
|---|---|
| Checks run | **1046** (light 523, dark 523) |
| Pass | **1046** |
| Fail | **0** |
| Of the passes, with a documented tolerance > 0.6 px (Geist text hug widths vs Figma's rounded widths) | 64 |

Page checks (functional):

| Check | Result |
|---|---|
| Console errors / warnings on load (`?all`) | none |
| Failed network requests | none |
| `SK.problems` (kit lint) | [] |
| Assets: 27 SVG files fetched / images on page 63, broken | 0 fetch failures, 0 broken images |
| `tokens.css` / `components.css` | HTTP 200 / 200 |
| Nav items opened (each shows only its section, non-empty, `aria-current` set) | 50 of 50, 0 empty |
| Deep links (`#f-colours`, `#c-actions-buttons`, card `#c-actions-buttons-primary`, screen `#s-dashboard-dark`, `#r-extended-index`) | all open the right section (card and screen ids scroll into view) |
| `?all` (clean URL; `serve` drops the query on `.html`) | 50 of 50 sections visible |
| Frames (6): scaled height = h x scale | all within 1.5 px; Fit / 100% toggle: 100% = 1920px, Fit = 1156px (scale 0.602); lazy: frames below the fold are empty until scrolled ([true,true,false,false] -> [true,true,true,true]) |
| Theme toggle (top bar): light -> dark -> reload (persisted) -> light | rgb(247, 248, 248) -> rgb(24, 24, 24) (button rgb(57, 226, 201)) -> dark after reload: true -> rgb(247, 248, 248) |
| Search "checkbox" | ["Checkbox"] |
| Demo behaviour | tab click selects (true); Select list toggles and picks (value "GTC"); indeterminate checkbox = true; sort header cycles (ascending) |
| Copy HTML (clipboard read back) | c-actions-buttons-primary: ok, content equal; c-patterns-trader-panel-card: ok, content equal; c-forms-select-field: ok, content equal; c-data-order-book-table: ok, content equal; c-overlays-modal-set: ok, content equal; c-navigation-floating-nav-bar: ok, content equal; alt: ok, content equal |
| Counts | sections 50, cards (components) 44, variants 132, screens 6, Extended badges 61 (60 + 1 in the legend), Alt 6, Outside canonical 8, assets 27 |
| Page size | 395876 bytes (`showcase.html`); full `?all` document height 57992 px; tallest section `f-colours` 9271 px (next: f-typography 4822, f-sizes 3443, s-dashboard-alternates 3071) |
| Hub viewer `/hub/ds-viewer.html#enigma-x` | renders from the new tokens.json: colour groups with the Figma names (3493 chars), typography (2026), spacing (207), border radius (76), Geist fonts; Components and CLAUDE.md links point at the new files; console errors other than the hub own missing favicon: 0 |

## Measured comparisons (property | spec -> measured; light | dark)

Spec numbers are Figma values (px, hex). "n/a" = not applicable in that theme. Tolerance 0.6 px for positions / sizes unless noted in the last column; colours and text properties are exact string / hex matches. The pass / fail column is the result for both themes (all pass in this run).

### Dashboard: canvas + panel placement

| Property | Spec -> measured (light) | Spec -> measured (dark) | Note | Result |
|---|---|---|---|---|
| canvas w | 1920 -> **1920** | 1920 -> **1920** |  | pass |
| canvas h | 1080 -> **1080** | 1080 -> **1080** |  | pass |
| nav x | 24 -> **24** | 24 -> **24** |  | pass |
| nav y | 16 -> **16** | 16 -> **16** |  | pass |
| nav w | 1872 -> **1872** | 1872 -> **1872** |  | pass |
| nav h | 72 -> **72** | 72 -> **72** |  | pass |
| ticker x | 0 -> **0** | 0 -> **0** |  | pass |
| ticker y | 104 -> **104** | 104 -> **104** |  | pass |
| ticker w | 1920 -> **1920** | 1920 -> **1920** |  | pass |
| ticker h | 80 -> **80** | 80 -> **80** |  | pass |
| ticker track x | -60 -> **-60** | -60 -> **-60** |  | pass |
| ticker track y | 104 -> **104** | 104 -> **104** |  | pass |
| ticker track w | 2040 -> **2040** | 2040 -> **2040** |  | pass |
| ticker track h | 80 -> **80** | 80 -> **80** |  | pass |
| Spot Trader x | 24 -> **24** | 24 -> **24** |  | pass |
| Spot Trader y | 200 -> **200** | 200 -> **200** |  | pass |
| Spot Trader w | 440 -> **440** | 440 -> **440** |  | pass |
| Spot Trader h | 528 -> **528** | 528 -> **528** |  | pass |
| RFQ x | 24 -> **24** | 24 -> **24** |  | pass |
| RFQ y | 744 -> **744** | 744 -> **744** |  | pass |
| RFQ w | 440 -> **440** | 440 -> **440** |  | pass |
| RFQ h | 278 -> **278** | 278 -> **278** |  | pass |
| Spot balances x | 480 -> **480** | 480 -> **480** |  | pass |
| Spot balances y | 200 -> **200** | 200 -> **200** |  | pass |
| Spot balances w | 440 -> **440** | 440 -> **440** |  | pass |
| Spot balances h | 392 -> **392** | 392 -> **392** |  | pass |
| Chart x | 936 -> **936** | 936 -> **936** |  | pass |
| Chart y | 200 -> **200** | 200 -> **200** |  | pass |
| Chart w | 952 -> **952** | 952 -> **952** |  | pass |
| Chart h | 392 -> **392** | 392 -> **392** |  | pass |
| Trades blotter x | 480 -> **480** | 480 -> **480** |  | pass |
| Trades blotter y | 608 -> **608** | 608 -> **608** |  | pass |
| Trades blotter w | 1408 -> **1408** | 1408 -> **1408** |  | pass |
| Trades blotter h | 438 -> **438** | 438 -> **438** |  | pass |

### Header bar (nav)

| Property | Spec -> measured (light) | Spec -> measured (dark) | Note | Result |
|---|---|---|---|---|
| nav logo frame x | 24 -> **24** | 24 -> **24** |  | pass |
| nav logo frame y | 16 -> **16** | 16 -> **16** |  | pass |
| nav logo frame w | 528 -> **528** | 528 -> **528** |  | pass |
| nav logo frame h | 40 -> **40** | 40 -> **40** |  | pass |
| nav logo mark x | 24 -> **24** | 24 -> **24** |  | pass |
| nav logo mark y | 16 -> **16** | 16 -> **16** |  | pass |
| nav logo mark w | 163 -> **163** | 163 -> **163** |  | pass |
| nav logo mark h | 40 -> **40** | 40 -> **40** |  | pass |
| UAT pill x | 826 -> **826** | 826 -> **826** |  | pass |
| UAT pill y | 16 -> **16** | 16 -> **16** |  | pass |
| UAT pill w | 220 -> **220** | 220 -> **220** |  | pass |
| UAT pill h | 40 -> **40** | 40 -> **40** |  | pass |
| right cluster x | 1320 -> **1320** | 1320 -> **1320** |  | pass |
| right cluster y | 16 -> **16** | 16 -> **16** |  | pass |
| right cluster w | 528 -> **528** | 528 -> **528** |  | pass |
| right cluster h | 40 -> **40** | 40 -> **40** |  | pass |
| Exposure pill x | 1320 -> **1320** | 1320 -> **1320** |  | pass |
| Exposure pill y | 16 -> **16** | 16 -> **16** |  | pass |
| Exposure pill w | 255 -> **255** | 255 -> **255** |  | pass |
| Exposure pill h | 40 -> **40** | 40 -> **40** |  | pass |
| clock block x | 1576 -> **1576** | 1576 -> **1576** |  | pass |
| clock block y | 16 -> **16** | 16 -> **16** |  | pass |
| clock block w | 216 -> **216** | 216 -> **216** |  | pass |
| clock block h | 40 -> **40** | 40 -> **40** |  | pass |
| avatar x | 1808 -> **1808** | 1808 -> **1808** |  | pass |
| avatar y | 16 -> **16** | 16 -> **16** |  | pass |
| avatar w | 40 -> **40** | 40 -> **40** |  | pass |
| avatar h | 40 -> **40** | 40 -> **40** |  | pass |
| nav radius | 8px -> **8px** | 8px -> **8px** |  | pass |
| avatar radius | 24px -> **24px** | 24px -> **24px** |  | pass |
| UAT pill radius | 4px -> **4px** | 4px -> **4px** |  | pass |
| nav padding | 16px 24px 16px 24px -> **16px 24px** | 16px 24px 16px 24px -> **16px 24px** |  | pass |

### Ticker strip

| Property | Spec -> measured (light) | Spec -> measured (dark) | Note | Result |
|---|---|---|---|---|
| ticker cell count | 15 -> **15** | 15 -> **15** |  | pass |
| ticker cell 1 w | 138 -> **136.81** | 138 -> **136.81** | hug width: Geist Mono text vs Figma rounded | pass |
| ticker cell 1 h | 80 -> **80** | 80 -> **80** |  | pass |
| ticker cell 2 w | 159 -> **158.42** | 159 -> **158.42** | hug width: Geist Mono text vs Figma rounded | pass |
| ticker cell 2 h | 80 -> **80** | 80 -> **80** |  | pass |
| ticker cell 3 w | 138 -> **136.81** | 138 -> **136.81** | hug width: Geist Mono text vs Figma rounded | pass |
| ticker cell 3 h | 80 -> **80** | 80 -> **80** |  | pass |
| ticker cell 4 w | 130 -> **129.61** | 130 -> **129.61** | hug width: Geist Mono text vs Figma rounded | pass |
| ticker cell 4 h | 80 -> **80** | 80 -> **80** |  | pass |
| ticker cell 5 w | 130 -> **129.61** | 130 -> **129.61** | hug width: Geist Mono text vs Figma rounded | pass |
| ticker cell 5 h | 80 -> **80** | 80 -> **80** |  | pass |
| ticker cell 6 w | 130 -> **129.61** | 130 -> **129.61** | hug width: Geist Mono text vs Figma rounded | pass |
| ticker cell 6 h | 80 -> **80** | 80 -> **80** |  | pass |
| ticker cell 7 w | 130 -> **129.61** | 130 -> **129.61** | hug width: Geist Mono text vs Figma rounded | pass |
| ticker cell 7 h | 80 -> **80** | 80 -> **80** |  | pass |
| ticker cell 8 w | 130 -> **129.61** | 130 -> **129.61** | hug width: Geist Mono text vs Figma rounded | pass |
| ticker cell 8 h | 80 -> **80** | 80 -> **80** |  | pass |
| ticker cell 9 w | 130 -> **129.61** | 130 -> **129.61** | hug width: Geist Mono text vs Figma rounded | pass |
| ticker cell 9 h | 80 -> **80** | 80 -> **80** |  | pass |
| ticker cell 10 w | 130 -> **129.61** | 130 -> **129.61** | hug width: Geist Mono text vs Figma rounded | pass |
| ticker cell 10 h | 80 -> **80** | 80 -> **80** |  | pass |
| ticker cell 11 w | 138 -> **136.81** | 138 -> **136.81** | hug width: Geist Mono text vs Figma rounded | pass |
| ticker cell 11 h | 80 -> **80** | 80 -> **80** |  | pass |
| ticker cell 12 w | 159 -> **158.42** | 159 -> **158.42** | hug width: Geist Mono text vs Figma rounded | pass |
| ticker cell 12 h | 80 -> **80** | 80 -> **80** |  | pass |
| ticker cell 13 w | 138 -> **136.81** | 138 -> **136.81** | hug width: Geist Mono text vs Figma rounded | pass |
| ticker cell 13 h | 80 -> **80** | 80 -> **80** |  | pass |
| ticker cell 14 w | 130 -> **129.61** | 130 -> **129.61** | hug width: Geist Mono text vs Figma rounded | pass |
| ticker cell 14 h | 80 -> **80** | 80 -> **80** |  | pass |
| ticker cell 15 w | 130 -> **129.61** | 130 -> **129.61** | hug width: Geist Mono text vs Figma rounded | pass |
| ticker cell 15 h | 80 -> **80** | 80 -> **80** |  | pass |
| ticker cell 11 x (last of set 1 start) | 1345 -> **1339.31** | 1345 -> **1339.31** | cumulative hug-width drift | pass |
| ticker cell padding | 12px 16px 12px 16px -> **12px 16px** | 12px 16px 12px 16px -> **12px 16px** |  | pass |
| ticker coin size | 18 -> **18** | 18 -> **18** |  | pass |
| ticker price font | Geist Mono -> **Geist Mono** | Geist Mono -> **Geist Mono** |  | pass |
| ticker price weight | 600 -> **600** | 600 -> **600** |  | pass |
| ticker price size | 14px -> **14px** | 14px -> **14px** |  | pass |
| ticker change size | 12px -> **12px** | 12px -> **12px** |  | pass |
| ticker change colour (negative) | #E5686A -> **#E5686A** | #DE5D67 -> **#DE5D67** |  | pass |

### Spot Trader panel

| Property | Spec -> measured (light) | Spec -> measured (dark) | Note | Result |
|---|---|---|---|---|
| trader title row x | 24 -> **24** | 24 -> **24** |  | pass |
| trader title row y | 16 -> **16** | 16 -> **16** |  | pass |
| trader title row w | 392 -> **392** | 392 -> **392** |  | pass |
| trader title row h | 26 -> **26** | 26 -> **26** |  | pass |
| trader instrument row x | 24 -> **24** | 24 -> **24** |  | pass |
| trader instrument row y | 58 -> **58** | 58 -> **58** |  | pass |
| trader instrument row w | 392 -> **392** | 392 -> **392** |  | pass |
| trader instrument row h | 52 -> **52** | 52 -> **52** |  | pass |
| trader field 1 x | 24 -> **24** | 24 -> **24** |  | pass |
| trader field 1 w | 188 -> **188** | 188 -> **188** |  | pass |
| trader field 1 h | 52 -> **52** | 52 -> **52** |  | pass |
| trader field 2 x | 228 -> **228** | 228 -> **228** |  | pass |
| trader field 2 w | 188 -> **188** | 188 -> **188** |  | pass |
| trader field 2 h | 52 -> **52** | 52 -> **52** |  | pass |
| tile group x | 24 -> **24** | 24 -> **24** |  | pass |
| tile group y | 126 -> **126** | 126 -> **126** |  | pass |
| tile group w | 392 -> **392** | 392 -> **392** |  | pass |
| tile group h | 160 -> **160** | 160 -> **160** |  | pass |
| BID tile x | 24 -> **24** | 24 -> **24** |  | pass |
| BID tile y | 126 -> **126** | 126 -> **126** |  | pass |
| BID tile w | 188 -> **188** | 188 -> **188** |  | pass |
| BID tile h | 100 -> **100** | 100 -> **100** |  | pass |
| ASK tile x | 228 -> **228** | 228 -> **228** |  | pass |
| ASK tile y | 126 -> **126** | 126 -> **126** |  | pass |
| ASK tile w | 188 -> **188** | 188 -> **188** |  | pass |
| ASK tile h | 100 -> **100** | 100 -> **100** |  | pass |
| spread tab x | 160 -> **160** | 160 -> **160** |  | pass |
| spread tab y | 194 -> **194** | 194 -> **194** |  | pass |
| spread tab w | 120 -> **120** | 120 -> **120** |  | pass |
| spread tab h | 32 -> **32** | 32 -> **32** |  | pass |
| slippage/type row x | 24 -> **24** | 24 -> **24** |  | pass |
| slippage/type row y | 234 -> **234** | 234 -> **234** |  | pass |
| slippage/type row w | 392 -> **392** | 392 -> **392** |  | pass |
| slippage/type row h | 52 -> **52** | 52 -> **52** |  | pass |
| order book x | 24 -> **24** | 24 -> **24** |  | pass |
| order book y | 302 -> **302** | 302 -> **302** |  | pass |
| order book w | 392 -> **392** | 392 -> **392** |  | pass |
| order book h | 202 -> **202** | 202 -> **202** |  | pass |
| book header h | 34 -> **34** | 34 -> **34** |  | pass |
| book row 1 h | 42 -> **42** | 42 -> **42** |  | pass |
| book row 2 h | 42 -> **42** | 42 -> **42** |  | pass |
| book row 3 h | 42 -> **42** | 42 -> **42** |  | pass |
| book row 4 h | 42 -> **42** | 42 -> **42** |  | pass |
| book radius | 8px -> **8px** | 8px -> **8px** |  | pass |
| trader panel padding | 16px 24px 24px 24px -> **16px 24px 24px** | 16px 24px 24px 24px -> **16px 24px 24px** |  | pass |
| trader panel radius | 8px -> **8px** | 8px -> **8px** |  | pass |
| trader panel gap | 16px -> **16px** | 16px -> **16px** |  | pass |

### RFQ panel

| Property | Spec -> measured (light) | Spec -> measured (dark) | Note | Result |
|---|---|---|---|---|
| rfq title row x | 24 -> **24** | 24 -> **24** |  | pass |
| rfq title row y | 16 -> **16** | 16 -> **16** |  | pass |
| rfq title row w | 392 -> **392** | 392 -> **392** |  | pass |
| rfq title row h | 26 -> **26** | 26 -> **26** |  | pass |
| rfq tabs track x | 24 -> **24** | 24 -> **24** |  | pass |
| rfq tabs track y | 58 -> **58** | 58 -> **58** |  | pass |
| rfq tabs track w | 392 -> **392** | 392 -> **392** |  | pass |
| rfq tabs track h | 40 -> **40** | 40 -> **40** |  | pass |
| rfq tab 1 w | 196 -> **196** | 196 -> **196** |  | pass |
| rfq tab 2 w | 196 -> **196** | 196 -> **196** |  | pass |
| rfq form x | 24 -> **24** | 24 -> **24** |  | pass |
| rfq form y | 114 -> **114** | 114 -> **114** |  | pass |
| rfq form w | 392 -> **392** | 392 -> **392** |  | pass |
| rfq form h | 140 -> **140** | 140 -> **140** |  | pass |
| rfq instrument field x | 24 -> **24** | 24 -> **24** |  | pass |
| rfq instrument field y | 114 -> **114** | 114 -> **114** |  | pass |
| rfq instrument field w | 132 -> **132** | 132 -> **132** |  | pass |
| rfq instrument field h | 52 -> **52** | 52 -> **52** |  | pass |
| rfq quantity field x | 172 -> **172** | 172 -> **172** |  | pass |
| rfq quantity field y | 114 -> **114** | 114 -> **114** |  | pass |
| rfq quantity field w | 244 -> **244** | 244 -> **244** |  | pass |
| rfq quantity field h | 52 -> **52** | 52 -> **52** |  | pass |
| input-tabs w | 244 -> **244** | 244 -> **244** |  | pass |
| input-tabs h | 32 -> **32** | 32 -> **32** |  | pass |
| rfq tabs-sm y | 0 -> **0** | 0 -> **0** |  | pass |
| rfq tabs-sm w | 80 -> **79.13** | 80 -> **79.13** |  | pass |
| rfq tabs-sm h | 32 -> **32** | 32 -> **32** |  | pass |
| rfq tabs-sm x (flush right) | 164 -> **164.88** | 164 -> **164.88** | right-flush: 244 minus hug width | pass |
| BTC tab w | 39 -> **38.7** | 39 -> **38.7** | Geist text hug | pass |
| USD tab w | 41 -> **40.42** | 41 -> **40.42** | Geist text hug | pass |
| rfq primary button x | 24 -> **24** | 24 -> **24** |  | pass |
| rfq primary button y | 214 -> **214** | 214 -> **214** |  | pass |
| rfq primary button w | 392 -> **392** | 392 -> **392** |  | pass |
| rfq primary button h | 40 -> **40** | 40 -> **40** |  | pass |
| BTC tab fill | #FFB051 -> **#FFB051** | #FF8D1C -> **#FF8D1C** |  | pass |
| BUY tab fill | #8BEEC8 -> **#8BEEC8** | #0FC286 -> **#0FC286** |  | pass |

### Spot balances panel

| Property | Spec -> measured (light) | Spec -> measured (dark) | Note | Result |
|---|---|---|---|---|
| balances title row x | 24 -> **24** | 24 -> **24** |  | pass |
| balances title row y | 16 -> **16** | 16 -> **16** |  | pass |
| balances title row w | 392 -> **392** | 392 -> **392** |  | pass |
| balances title row h | 32 -> **32** | 32 -> **32** |  | pass |
| balances table x | 24 -> **24** | 24 -> **24** |  | pass |
| balances table y | 64 -> **64** | 64 -> **64** |  | pass |
| balances table w | 392 -> **392** | 392 -> **392** |  | pass |
| balances table h | 244 -> **244** | 244 -> **244** |  | pass |
| refresh button x | 384 -> **384** | 384 -> **384** |  | pass |
| refresh button y | 16 -> **16** | 16 -> **16** |  | pass |
| refresh button w | 32 -> **32** | 32 -> **32** |  | pass |
| refresh button h | 32 -> **32** | 32 -> **32** |  | pass |
| balances header h | 34 -> **34** | 34 -> **34** |  | pass |
| balances row 1 h | 42 -> **42** | 42 -> **42** |  | pass |
| balances row 2 h | 42 -> **42** | 42 -> **42** |  | pass |
| balances row 3 h | 42 -> **42** | 42 -> **42** |  | pass |
| balances row 4 h | 42 -> **42** | 42 -> **42** |  | pass |
| balances row 5 h | 42 -> **42** | 42 -> **42** |  | pass |

### Chart panel

| Property | Spec -> measured (light) | Spec -> measured (dark) | Note | Result |
|---|---|---|---|---|
| chart panel padding | 16px 24px 24px 24px -> **16px 24px 24px** | 16px 24px 24px 24px -> **16px 24px 24px** |  | pass |
| chart title h | 26 -> **26** | 26 -> **26** |  | pass |

### Trades blotter panel

| Property | Spec -> measured (light) | Spec -> measured (dark) | Note | Result |
|---|---|---|---|---|
| blotter top row x | 24 -> **24** | 24 -> **24** |  | pass |
| blotter top row y | 16 -> **16** | 16 -> **16** |  | pass |
| blotter top row w | 1360 -> **1360** | 1360 -> **1360** |  | pass |
| blotter top row h | 38 -> **38** | 38 -> **38** |  | pass |
| blotter tab 1 x | 24 -> **24** | 24 -> **24** |  | pass |
| blotter tab 1 y | 16 -> **16** | 16 -> **16** |  | pass |
| blotter tab 1 w | 214 -> **213.78** | 214 -> **213.78** |  | pass |
| blotter tab 1 h | 38 -> **38** | 38 -> **38** |  | pass |
| blotter tab 2 w | 255 -> **254.5** | 255 -> **254.5** | Geist text hug | pass |
| blotter tab 2 h | 38 -> **38** | 38 -> **38** |  | pass |
| blotter action cluster x | 1288 -> **1288** | 1288 -> **1288** |  | pass |
| blotter action cluster y | 19 -> **19** | 19 -> **19** |  | pass |
| blotter action cluster w | 96 -> **96** | 96 -> **96** |  | pass |
| blotter action cluster h | 32 -> **32** | 32 -> **32** |  | pass |
| blotter table x | 24 -> **24** | 24 -> **24** |  | pass |
| blotter table y | 62 -> **62** | 62 -> **62** |  | pass |
| blotter table w | 1360 -> **1360** | 1360 -> **1360** |  | pass |
| blotter table h | 352 -> **352** | 352 -> **352** |  | pass |
| blotter header h | 32 -> **32** | 32 -> **32** |  | pass |
| blotter row count | 8 -> **8** | 8 -> **8** |  | pass |
| blotter row 1 h | 40 -> **40** | 40 -> **40** |  | pass |
| blotter row 2 h | 40 -> **40** | 40 -> **40** |  | pass |
| blotter row 3 h | 40 -> **40** | 40 -> **40** |  | pass |
| blotter row 4 h | 40 -> **40** | 40 -> **40** |  | pass |
| blotter row 5 h | 40 -> **40** | 40 -> **40** |  | pass |
| blotter row 6 h | 40 -> **40** | 40 -> **40** |  | pass |
| blotter row 7 h | 40 -> **40** | 40 -> **40** |  | pass |
| blotter row 8 h | 40 -> **40** | 40 -> **40** |  | pass |
| status dot w | 6.67 -> **6.66** | 6.67 -> **6.66** | layout snap 6.65625 | pass |
| blotter col 1 x | 12 -> **12** | 12 -> **12** |  | pass |
| blotter col 2 x | 18.67 -> **18.66** | 18.67 -> **18.66** |  | pass |
| blotter col 3 x | 158.67 -> **158.66** | 158.67 -> **158.66** |  | pass |
| blotter col 4 x | 298.67 -> **298.66** | 298.67 -> **298.66** | FILL width / wrapper drift | pass |
| blotter col 5 x | 411.86 -> **411.84** | 411.86 -> **411.84** | FILL width / wrapper drift | pass |
| blotter col 6 x | 528.86 -> **528.84** | 528.86 -> **528.84** |  | pass |
| blotter col 7 x | 642.05 -> **642.05** | 642.05 -> **642.05** |  | pass |
| blotter col 8 x | 755.24 -> **755.23** | 755.24 -> **755.23** |  | pass |
| blotter col 9 x | 868.43 -> **868.44** | 868.43 -> **868.44** |  | pass |
| blotter col 10 x | 981.62 -> **981.63** | 981.62 -> **981.63** |  | pass |
| blotter col 11 x | 1094.81 -> **1094.81** | 1094.81 -> **1094.81** |  | pass |
| blotter col 12 x | 1208 -> **1208** | 1208 -> **1208** |  | pass |
| order-type wrapper w | 117 -> **117** | 117 -> **117** |  | pass |
| order-type wrapper h | 16 -> **16** | 16 -> **16** |  | pass |
| Limit chip w | 76 -> **75.72** | 76 -> **75.72** | Geist text hug 27.72 vs 28 | pass |
| Limit chip h | 24 -> **24** | 24 -> **24** |  | pass |
| Market chip w | 88 -> **87.81** | 88 -> **87.81** | Geist text hug 39.81 vs 40 | pass |
| Market chip h | 24 -> **24** | 24 -> **24** |  | pass |
| chip radius | 16px -> **16px** | 16px -> **16px** |  | pass |
| blotter row 1 fill | #FFFFFF -> **#FFFFFF** | #2B2B2B -> **#2B2B2B** |  | pass |
| blotter row 2 fill | #F7F8F8 -> **#F7F8F8** | #383838 -> **#383838** |  | pass |

### Dashboard colours (theme)

| Property | Spec -> measured (light) | Spec -> measured (dark) | Note | Result |
|---|---|---|---|---|
| canvas fill | #F7F8F8 -> **#F7F8F8** | #181818 -> **#181818** |  | pass |
| nav fill | #FFFFFF -> **#FFFFFF** | #181818 -> **#181818** |  | pass |
| ticker fill | #FFFFFF -> **#FFFFFF** | #2B2B2B -> **#2B2B2B** |  | pass |
| trader panel fill | #FFFFFF -> **#FFFFFF** | #2B2B2B -> **#2B2B2B** |  | pass |
| rfq panel fill | #FFFFFF -> **#FFFFFF** | #2B2B2B -> **#2B2B2B** |  | pass |
| balances panel fill | #FFFFFF -> **#FFFFFF** | #2B2B2B -> **#2B2B2B** |  | pass |
| chart panel fill | #FFFFFF -> **#FFFFFF** | #2B2B2B -> **#2B2B2B** |  | pass |
| blotter panel fill | #FFFFFF -> **#FFFFFF** | #2B2B2B -> **#2B2B2B** |  | pass |
| BID tile fill | #FB9697 -> **#FB9697** | #DE5D67 -> **#DE5D67** |  | pass |
| ASK tile fill | #8BEEC8 -> **#8BEEC8** | #0FC286 -> **#0FC286** |  | pass |
| field fill | #F7F8F8 -> **#F7F8F8** | #3F3F3F -> **#3F3F3F** |  | pass |
| order-book container fill | #F7F8F8 -> **#F7F8F8** | #383838 -> **#383838** |  | pass |
| primary button fill | #7AEFEF -> **#7AEFEF** | #39E2C9 -> **#39E2C9** |  | pass |
| spread tab fill | #FFFFFF -> **#FFFFFF** | #2B2B2B -> **#2B2B2B** |  | pass |
| tile digits colour | #000000 -> **#000000** | #2B2B2B -> **#2B2B2B** |  | pass |
| bid price colour | #E5686A -> **#E5686A** | #DE5D67 -> **#DE5D67** |  | pass |
| ask price colour | #4DCC9B -> **#4DCC9B** | #0FC286 -> **#0FC286** |  | pass |
| field label colour | #A8BECD -> **#A8BECD** | #7A9091 -> **#7A9091** |  | pass |
| unit colour | #7C9CAC -> **#7C9CAC** | #7A9091 -> **#7A9091** |  | pass |
| panel title colour | #000000 -> **#000000** | #7A9091 -> **#7A9091** |  | pass |
| UAT pill fill | #7AEFEF@0.2 -> **#7AEFEF@0.2** | #02B175 -> **#02B175** |  | pass |
| Limit chip fill | #E4CAFF -> **#E4CAFF** | #3B225C -> **#3B225C** |  | pass |
| Limit chip text | #9236F2 -> **#9236F2** | #A790FF -> **#A790FF** |  | pass |
| Market chip fill | #CADCFF -> **#CADCFF** | #244443 -> **#244443** |  | pass |
| Market chip text | #3A77F2 -> **#3A77F2** | #39E2C9 -> **#39E2C9** |  | pass |
| blotter active tab underline | #000000 -> **#000000** | #39E2C9 -> **#39E2C9** |  | pass |
| avatar fill | #DEE8ED -> **#DEE8ED** | #2B2B2B -> **#2B2B2B** |  | pass |
| status dot success | #4DCC9B -> **#4DCC9B** | #0FC286 -> **#0FC286** |  | pass |
| status dot danger | #E5686A -> **#E5686A** | #DE5D67 -> **#DE5D67** |  | pass |
| body text colour | #000000 -> **#000000** | #E4E7EB -> **#E4E7EB** |  | pass |
| color-scheme | light -> **light** | dark -> **dark** |  | pass |

### Dashboard typography

| Property | Spec -> measured (light) | Spec -> measured (dark) | Note | Result |
|---|---|---|---|---|
| panel title family | Geist -> **Geist** | Geist -> **Geist** |  | pass |
| panel title size | 20px -> **20px** | 20px -> **20px** |  | pass |
| panel title weight | 400 -> **400** | 400 -> **400** |  | pass |
| panel title ls | 0px -> **0px** | 0px -> **0px** |  | pass |
| panel title case | uppercase -> **uppercase** | uppercase -> **uppercase** |  | pass |
| panel title line-height | 26px -> **26px** | 26px -> **26px** |  | pass |
| tile big digits family | Geist Mono -> **Geist Mono** | Geist Mono -> **Geist Mono** |  | pass |
| tile big digits size | 32px -> **32px** | 32px -> **32px** |  | pass |
| tile big digits weight | 400 -> **400** | 400 -> **400** |  | pass |
| tile big digits ls | 0px -> **0px** | 0px -> **0px** |  | pass |
| tile big digits case | uppercase -> **uppercase** | uppercase -> **uppercase** |  | pass |
| tile big digits line-height | 42px -> **42px** | 42px -> **42px** |  | pass |
| tile decimals family | Geist Mono -> **Geist Mono** | Geist Mono -> **Geist Mono** |  | pass |
| tile decimals size | 14px -> **14px** | 14px -> **14px** |  | pass |
| tile decimals weight | 400 -> **400** | 400 -> **400** |  | pass |
| tile decimals ls | 0px -> **0px** | 0px -> **0px** |  | pass |
| tile decimals case | uppercase -> **uppercase** | uppercase -> **uppercase** |  | pass |
| tile decimals line-height | 18px -> **18px** | 18px -> **18px** |  | pass |
| spread value family | Geist Mono -> **Geist Mono** | Geist Mono -> **Geist Mono** |  | pass |
| spread value size | 16px -> **16px** | 16px -> **16px** |  | pass |
| spread value weight | 400 -> **400** | 400 -> **400** |  | pass |
| spread value ls | 0px -> **0px** | 0px -> **0px** |  | pass |
| spread value line-height | 21px -> **21px** | 21px -> **21px** |  | pass |
| book header family | Geist -> **Geist** | Geist -> **Geist** |  | pass |
| book header size | 14px -> **14px** | 14px -> **14px** |  | pass |
| book header weight | 400 -> **400** | 400 -> **400** |  | pass |
| book header ls | 0px -> **0px** | 0px -> **0px** |  | pass |
| book header line-height | 18px -> **18px** | 18px -> **18px** |  | pass |
| book bid family | Geist Mono -> **Geist Mono** | Geist Mono -> **Geist Mono** |  | pass |
| book bid size | 14px -> **14px** | 14px -> **14px** |  | pass |
| book bid weight | 500 -> **500** | 500 -> **500** |  | pass |
| book bid ls | 0px -> **0px** | 0px -> **0px** |  | pass |
| book qty family | Geist Mono -> **Geist Mono** | Geist Mono -> **Geist Mono** |  | pass |
| book qty size | 14px -> **14px** | 14px -> **14px** |  | pass |
| book qty weight | 400 -> **400** | 400 -> **400** |  | pass |
| book qty ls | 0px -> **0px** | 0px -> **0px** |  | pass |
| balance asset family | Geist -> **Geist** | Geist -> **Geist** |  | pass |
| balance asset size | 14px -> **14px** | 14px -> **14px** |  | pass |
| balance asset weight | 500 -> **500** | 500 -> **500** |  | pass |
| balance asset ls | 0px -> **0px** | 0px -> **0px** |  | pass |
| blotter header family | Geist -> **Geist** | Geist -> **Geist** |  | pass |
| blotter header size | 12px -> **12px** | 12px -> **12px** |  | pass |
| blotter header weight | 400 -> **400** | 400 -> **400** |  | pass |
| blotter header ls | 0px -> **0px** | 0px -> **0px** |  | pass |
| blotter header line-height | 16px -> **16px** | 16px -> **16px** |  | pass |
| blotter cell family | Geist -> **Geist** | Geist -> **Geist** |  | pass |
| blotter cell size | 12px -> **12px** | 12px -> **12px** |  | pass |
| blotter cell weight | 500 -> **500** | 500 -> **500** |  | pass |
| blotter cell ls | 0px -> **0px** | 0px -> **0px** |  | pass |
| blotter side family | Geist -> **Geist** | Geist -> **Geist** |  | pass |
| blotter side size | 12px -> **12px** | 12px -> **12px** |  | pass |
| blotter side weight | 500 -> **500** | 500 -> **500** |  | pass |
| blotter side ls | 0px -> **0px** | 0px -> **0px** |  | pass |
| blotter executed family | Geist -> **Geist** | Geist -> **Geist** |  | pass |
| blotter executed size | 12px -> **12px** | 12px -> **12px** |  | pass |
| blotter executed weight | 400 -> **400** | 400 -> **400** |  | pass |
| blotter executed ls | 0px -> **0px** | 0px -> **0px** |  | pass |
| field label family | Geist -> **Geist** | Geist -> **Geist** |  | pass |
| field label size | 12px -> **12px** | 12px -> **12px** |  | pass |
| field label weight | 400 -> **400** | 400 -> **400** |  | pass |
| field label ls | 0px -> **0px** | 0px -> **0px** |  | pass |
| field label line-height | 16px -> **16px** | 16px -> **16px** |  | pass |
| field value family | Geist -> **Geist** | Geist -> **Geist** |  | pass |
| field value size | 12px -> **12px** | 12px -> **12px** |  | pass |
| field value weight | 400 -> **400** | 400 -> **400** |  | pass |
| field value ls | 0px -> **0px** | 0px -> **0px** |  | pass |
| ticker symbol family | Geist -> **Geist** | Geist -> **Geist** |  | pass |
| ticker symbol size | 12px -> **12px** | 12px -> **12px** |  | pass |
| ticker symbol weight | 400 -> **400** | 400 -> **400** |  | pass |
| ticker symbol ls | 0px -> **0px** | 0px -> **0px** |  | pass |
| env pill family | Geist -> **Geist** | Geist -> **Geist** |  | pass |
| env pill size | 16px -> **16px** | 16px -> **16px** |  | pass |
| env pill weight | 500 -> **500** | 500 -> **500** |  | pass |
| env pill ls | 0px -> **0px** | 0px -> **0px** |  | pass |
| exposure value family | Geist -> **Geist** | Geist -> **Geist** |  | pass |
| exposure value size | 14px -> **14px** | 14px -> **14px** |  | pass |
| exposure value weight | 600 -> **600** | 600 -> **600** |  | pass |
| exposure value ls | 0px -> **0px** | 0px -> **0px** |  | pass |
| exposure label family | Geist -> **Geist** | Geist -> **Geist** |  | pass |
| exposure label size | 14px -> **14px** | 14px -> **14px** |  | pass |
| exposure label weight | 400 -> **400** | 400 -> **400** |  | pass |
| exposure label ls | 0px -> **0px** | 0px -> **0px** |  | pass |
| avatar initials family | Geist -> **Geist** | Geist -> **Geist** |  | pass |
| avatar initials size | 14px -> **14px** | 14px -> **14px** |  | pass |
| avatar initials weight | 400 -> **400** | 400 -> **400** |  | pass |
| avatar initials ls | 2px -> **2px** | 2px -> **2px** |  | pass |
| clock time family | Geist -> **Geist** | Geist -> **Geist** |  | pass |
| clock time size | 12px -> **12px** | 12px -> **12px** |  | pass |
| clock time weight | 400 -> **400** | 400 -> **400** |  | pass |
| clock time ls | 0px -> **0px** | 0px -> **0px** |  | pass |
| RFQ button family | Geist -> **Geist** | Geist -> **Geist** |  | pass |
| RFQ button size | 14px -> **14px** | 14px -> **14px** |  | pass |
| RFQ button weight | 500 -> **500** | 500 -> **500** |  | pass |
| RFQ button ls | 0px -> **0px** | 0px -> **0px** |  | pass |
| tab selected family | Geist -> **Geist** | Geist -> **Geist** |  | pass |
| tab selected size | 14px -> **14px** | 14px -> **14px** |  | pass |
| tab selected weight | 500 -> **500** | 500 -> **500** |  | pass |
| tab selected ls | 0px -> **0px** | 0px -> **0px** |  | pass |
| tab unselected family | Geist -> **Geist** | Geist -> **Geist** |  | pass |
| tab unselected size | 14px -> **14px** | 14px -> **14px** |  | pass |
| tab unselected weight | 400 -> **400** | 400 -> **400** |  | pass |
| tab unselected ls | 0px -> **0px** | 0px -> **0px** |  | pass |
| blotter tab family | Geist -> **Geist** | Geist -> **Geist** |  | pass |
| blotter tab size | 20px -> **20px** | 20px -> **20px** |  | pass |
| blotter tab weight | 400 -> **400** | 400 -> **400** |  | pass |
| blotter tab ls | 0px -> **0px** | 0px -> **0px** |  | pass |
| blotter tab case | uppercase -> **uppercase** | uppercase -> **uppercase** |  | pass |

### Buttons and icon buttons

| Property | Spec -> measured (light) | Spec -> measured (dark) | Note | Result |
|---|---|---|---|---|
| Button w | 86 -> **85.48** | 86 -> **85.48** | hug: Geist label | pass |
| Button h | 32 -> **32** | 32 -> **32** |  | pass |
| Button borderRadius | 4px -> **4px** | 4px -> **4px** |  | pass |
| Button padding | 7px 24px 7px 24px -> **7px 24px** | 7px 24px 7px 24px -> **7px 24px** |  | pass |
| Button backgroundColor | #7AEFEF -> **#7AEFEF** | #39E2C9 -> **#39E2C9** |  | pass |
| Button color | #000000 -> **#000000** | #2B2B2B -> **#2B2B2B** |  | pass |
| Button label family | Geist -> **Geist** | Geist -> **Geist** |  | pass |
| Button label size | 12px -> **12px** | 12px -> **12px** |  | pass |
| Button label weight | 500 -> **500** | 500 -> **500** |  | pass |
| Button label ls | 0px -> **0px** | 0px -> **0px** |  | pass |
| Button hover fill | #B0F9F6 -> **#B0F9F6** | #9AF0E3 -> **#9AF0E3** |  | pass |
| Button hover stroke | #7AEFEF -> **#7AEFEF** | #39E2C9 -> **#39E2C9** |  | pass |
| Button gap | 8px -> **8px** | 8px -> **8px** |  | pass |
| Dashboard button h | 40 -> **40** | 40 -> **40** |  | pass |
| Dashboard button w | 392 -> **392** | 392 -> **392** |  | pass |
| Outline h | 32 -> **32** | 32 -> **32** |  | pass |
| Outline fill | rgba(0, 0, 0, 0) -> **rgba(0, 0, 0, 0)** | rgba(0, 0, 0, 0) -> **rgba(0, 0, 0, 0)** |  | pass |
| Outline label colour | #000000 -> **#000000** | #E4E7EB -> **#E4E7EB** |  | pass |
| Outline stroke | #000000 -> **#000000** | #E4E7EB -> **#E4E7EB** |  | pass |
| Outline hover fill | #7AEFEF@0.2 -> **#7AEFEF@0.2** | #39E2C9@0.2 -> **#39E2C9@0.2** |  | pass |
| Outline stretched justify | flex-start -> **flex-start** | flex-start -> **flex-start** |  | pass |
| Black fill | #000000 -> **#000000** | #181818 -> **#181818** |  | pass |
| Black label | #7AEFEF -> **#7AEFEF** | #39E2C9 -> **#39E2C9** |  | pass |
| Black Variant2 stroke (outer) | #7AEFEF 0px 0px 0px 1px -> **#7AEFEF 0px 0px 0px 1px** | #39E2C9 0px 0px 0px 1px -> **#39E2C9 0px 0px 0px 1px** |  | pass |
| Icon button w | 32 -> **32** | 32 -> **32** |  | pass |
| Icon button h | 32 -> **32** | 32 -> **32** |  | pass |
| Icon button borderRadius | 4px -> **4px** | 4px -> **4px** |  | pass |
| Icon button hover fill | #DEE8ED -> **#DEE8ED** | #3D3D3D -> **#3D3D3D** |  | pass |
| Refresh glyph colour | #7C9CAC -> **#7C9CAC** | #7A9091 -> **#7A9091** |  | pass |
| Refresh glyph w | 18 -> **18** | 18 -> **18** |  | pass |
| Hands glyph w | 20 -> **20** | 20 -> **20** |  | pass |

### Fields: Select, Input, Input with 2 text, Search, input with tabs

| Property | Spec -> measured (light) | Spec -> measured (dark) | Note | Result |
|---|---|---|---|---|
| Select field h (label) | 52 -> **52** | 52 -> **52** |  | pass |
| Select w | 148 -> **148** | 148 -> **148** |  | pass |
| Select h | 32 -> **32** | 32 -> **32** |  | pass |
| Select fill | #F7F8F8 -> **#F7F8F8** | #3F3F3F -> **#3F3F3F** |  | pass |
| Select radius | 4px -> **4px** | 4px -> **4px** |  | pass |
| Select padding | 7px 8px 7px 12px -> **7px 8px 7px 12px** | 7px 8px 7px 12px -> **7px 8px 7px 12px** |  | pass |
| Select gap | 32px -> **32px** | 32px -> **32px** |  | pass |
| Select value colour | #A8BECD -> **#A8BECD** | #7A9091 -> **#7A9091** |  | pass |
| Select label h | 16 -> **16** | 16 -> **16** |  | pass |
| Select label gap | 4px -> **4px** | 4px -> **4px** |  | pass |
| Select chevron w | 16 -> **16** | 16 -> **16** |  | pass |
| Select border | 0px -> **0px** | 0px -> **0px** |  | pass |
| Select shadow (none) | none -> **none** | none -> **none** |  | pass |
| Input w | 148 -> **148** | 148 -> **148** |  | pass |
| Input h | 32 -> **32** | 32 -> **32** |  | pass |
| Input padding | 7px 12px 7px 12px -> **7px 12px** | 7px 12px 7px 12px -> **7px 12px** |  | pass |
| Input gap | 0px -> **0px** | 0px -> **0px** |  | pass |
| Input2 padding | 7px 12px 7px 12px -> **7px 12px** | 7px 12px 7px 12px -> **7px 12px** |  | pass |
| Input2 gap | 32px -> **32px** | 32px -> **32px** |  | pass |
| Input2 unit colour | #7C9CAC -> **#7C9CAC** | #7A9091 -> **#7A9091** |  | pass |
| Search padding | 7px 8px 7px 8px -> **7px 8px** | 7px 8px 7px 8px -> **7px 8px** |  | pass |
| Search gap | 8px -> **8px** | 8px -> **8px** |  | pass |
| Search icon colour | #3DBFBF -> **#3DBFBF** | #39E2C9 -> **#39E2C9** |  | pass |
| Search icon w | 16 -> **16** | 16 -> **16** |  | pass |
| Input with tabs w | 244 -> **244** | 244 -> **244** |  | pass |
| Input with tabs h | 32 -> **32** | 32 -> **32** |  | pass |
| sm tab selected w | 54 -> **53.7** | 54 -> **53.7** | Geist hug | pass |
| sm tab unselected w | 53 -> **52.7** | 53 -> **52.7** | Geist hug | pass |
| sm tab selected weight | 500 -> **500** | 500 -> **500** |  | pass |
| sm tab unselected weight | 400 -> **400** | 400 -> **400** |  | pass |
| sm tab selected fill | #7AEFEF -> **#7AEFEF** | #39E2C9 -> **#39E2C9** |  | pass |
| sm tab padding | 7px 8px 7px 8px -> **7px 8px** | 7px 8px 7px 8px -> **7px 8px** |  | pass |

### Checkbox

| Property | Spec -> measured (light) | Spec -> measured (dark) | Note | Result |
|---|---|---|---|---|
| Checkbox row w | 120 -> **120** | 120 -> **120** |  | pass |
| Checkbox row h | 16 -> **16** | 16 -> **16** |  | pass |
| Checkbox box w | 16 -> **16** | 16 -> **16** |  | pass |
| Checkbox radius | 2px -> **2px** | 2px -> **2px** |  | pass |
| Checkbox selected fill | #7AEFEF -> **#7AEFEF** | #39E2C9 -> **#39E2C9** |  | pass |
| Checkbox check colour | #000000 -> **#000000** | #2B2B2B -> **#2B2B2B** |  | pass |
| Checkbox not-selected stroke | #A8BECD -> **#A8BECD** | #7A9091 -> **#7A9091** |  | pass |
| Checkbox disabled fill | #7C9CAC -> **#7C9CAC** | #7A9091 -> **#7A9091** |  | pass |
| Checkbox disabled label | #7C9CAC -> **#7C9CAC** | #7A9091 -> **#7A9091** |  | pass |
| Checkbox label size | 12px -> **12px** | 12px -> **12px** |  | pass |
| Checkbox gap | 8px -> **8px** | 8px -> **8px** |  | pass |
| Checkbox check glyph w | 10 -> **10** | 10 -> **10** |  | pass |
| Checkbox dash h | 2 -> **2** | 2 -> **2** |  | pass |

### Tabs

| Property | Spec -> measured (light) | Spec -> measured (dark) | Note | Result |
|---|---|---|---|---|
| tabs h | 40 -> **40** | 40 -> **40** |  | pass |
| tabs w | 184 -> **182.8** | 184 -> **182.8** | hug Geist 93 + 91 | pass |
| tab selected w | 93 -> **91.98** | 93 -> **91.98** | Geist Medium 14 hug 43.98 vs Figma 45 | pass |
| tab unselected w | 91 -> **90.81** | 91 -> **90.81** | hug Geist | pass |
| tab selected fill | #7AEFEF -> **#7AEFEF** | #39E2C9 -> **#39E2C9** |  | pass |
| tab unselected colour | #7C9CAC -> **#7C9CAC** | #7A9091 -> **#7A9091** |  | pass |
| tab padding | 7px 24px 7px 24px -> **7px 24px** | 7px 24px 7px 24px -> **7px 24px** |  | pass |

### Tiles, chips, coins, header pills, spread tab

| Property | Spec -> measured (light) | Spec -> measured (dark) | Note | Result |
|---|---|---|---|---|
| BID tile w | 188 -> **188** | 188 -> **188** |  | pass |
| BID tile h | 100 -> **100** | 100 -> **100** |  | pass |
| tile radius | 8px -> **8px** | 8px -> **8px** |  | pass |
| tile padding | 12px -> **12px** | 12px -> **12px** |  | pass |
| tile gap | 4px -> **4px** | 4px -> **4px** |  | pass |
| ASK tile align | right -> **right** | right -> **right** |  | pass |
| coin count | 8 -> **8** | 8 -> **8** |  | pass |
| coin size | 18 -> **18** | 18 -> **18** |  | pass |
| coin radius | 16px -> **16px** | 16px -> **16px** |  | pass |
| UAT pill | 220 -> **220** | 220 -> **220** |  | pass |
| Exposure pill | 255 -> **255** | 255 -> **255** |  | pass |
| avatar | 40 -> **40** | 40 -> **40** |  | pass |
| clock | 216 -> **216** | 216 -> **216** |  | pass |
| Exposure stroke | #4DCC9B -> **#4DCC9B** | #39E2C9 -> **#39E2C9** |  | pass |
| Exposure fill | #4DCC9B@0.2 -> **#4DCC9B@0.2** | #244443 -> **#244443** |  | pass |
| spread tab radius | 8px 8px 0px 0px -> **8px 8px 0px 0px** | 8px 8px 0px 0px -> **8px 8px 0px 0px** |  | pass |
| spread tab padding | 11px 36px 11px 36px -> **11px 36px** | 11px 36px 11px 36px -> **11px 36px** |  | pass |

### Data tables

| Property | Spec -> measured (light) | Spec -> measured (dark) | Note | Result |
|---|---|---|---|---|
| order book container shadow (outside 1px) | #F7F8F8 0px 0px 0px 1px -> **#F7F8F8 0px 0px 0px 1px** | #383838 0px 0px 0px 1px -> **#383838 0px 0px 0px 1px** |  | pass |
| order book odd row | #FFFFFF -> **#FFFFFF** | #2B2B2B -> **#2B2B2B** |  | pass |
| order book even row | #F7F8F8 -> **#F7F8F8** | #383838 -> **#383838** |  | pass |
| order book dim decimals | #A8BECD -> **#A8BECD** | #808080 -> **#808080** |  | pass |
| order book header colour | #A8BECD -> **#A8BECD** | #7A9091 -> **#7A9091** |  | pass |
| alt hairline row fill | #FFFFFF -> **#FFFFFF** | #2B2B2B -> **#2B2B2B** |  | pass |

### EXTENDED states and patterns

| Property | Spec -> measured (light) | Spec -> measured (dark) | Note | Result |
|---|---|---|---|---|
| row hover fill (EXT) | #DEE8ED -> **#DEE8ED** | #3D3D3D -> **#3D3D3D** |  | pass |
| row selected fill (EXT) | #7AEFEF@0.2 -> **#7AEFEF@0.2** | #39E2C9@0.2 -> **#39E2C9@0.2** |  | pass |
| Select focus stroke (EXT) | #7AEFEF -> **#7AEFEF** | #39E2C9 -> **#39E2C9** |  | pass |
| Select error stroke (EXT) | #E5686A -> **#E5686A** | #DE5D67 -> **#DE5D67** |  | pass |
| Select disabled fill (EXT) | #DEE8ED -> **#DEE8ED** | #3D3D3D -> **#3D3D3D** |  | pass |
| toast radius (EXT) | 8px -> **8px** | 8px -> **8px** |  | pass |
| toast fill (EXT) | #FFFFFF -> **#FFFFFF** | #2B2B2B -> **#2B2B2B** |  | pass |
| toast padding (EXT) | 12px 16px 12px 16px -> **12px 16px** | 12px 16px 12px 16px -> **12px 16px** |  | pass |
| modal w (EXT) | 440 -> **440** | 440 -> **440** |  | pass |
| modal padding (EXT) | 16px 24px 24px 24px -> **16px 24px 24px** | 16px 24px 24px 24px -> **16px 24px 24px** |  | pass |
| menu item h (EXT) | 32 -> **32** | 32 -> **32** |  | pass |
| menu radius (EXT) | 4px -> **4px** | 4px -> **4px** |  | pass |
| menu z-index (EXT) | 100 -> **100** | 100 -> **100** |  | pass |
| tooltip padding (EXT) | 4px 8px 4px 8px -> **4px 8px** | 4px 8px 4px 8px -> **4px 8px** |  | pass |
| tooltip fill (EXT) | #000000 -> **#000000** | #181818 -> **#181818** |  | pass |
| skeleton h (EXT) | 16 -> **16** | 16 -> **16** |  | pass |
| skeleton fill (EXT) | #DEE8ED -> **#DEE8ED** | #3D3D3D -> **#3D3D3D** |  | pass |
| chart toolbar h (EXT) | 32 -> **32** | 32 -> **32** |  | pass |
| chart toolbar fill (EXT) | #F7F8F8 -> **#F7F8F8** | #0F0F0F -> **#0F0F0F** |  | pass |
| chart toolbar active (EXT) | #DEE8ED -> **#DEE8ED** | #3D3D3D -> **#3D3D3D** |  | pass |
| chart panel w | 952 -> **952** | 952 -> **952** |  | pass |

## Remaining deviations and what could not be verified

Rendering tolerances (all within the tolerance written in the Note column; not defects):
- Text-hug widths differ from Figma's rounded widths by up to about 1.2 px: ticker cells ETH 136.81 vs 138, BTC 158.42 vs 159, others 129.61 vs 130 (Geist Mono); tabs 183 vs 184 (Geist Medium 14 "Option" 43.98 vs 45); small tabs 53.7 / 52.7 vs 54 / 53; BTC / USD tabs 38.7 / 40.42 vs 39 / 41; Button 85.48 vs 86; Limit / Market chips 75.72 / 87.81 vs 76 / 88; blotter tabs 213.78 / 254.5 vs 214 / 255. The ticker strip accumulates this: cell 11 starts 5.7 px earlier than Figma's x 1345.
- Status dot 6.65625 px (browser layout snap of 6.6667); blotter column x positions within 0.02 px of the spec (FILL widths).
- Line-height: Figma is AUTO; the pinned px boxes (16 / 18 / 21 / 26 / 42) were measured in Figma, except 16px = 21px (visual estimate: stored 16px nodes report stale 10-11).

Not verifiable or not verified in this run:
- **Dark theme against Figma:** no dark Figma nodes exist; the dark values are sampled from the live-app capture raster (visual estimate) or derived, so the checks only prove that the page renders the documented tokens. Sampling coordinates are in `tokens.json` / the showcase Colours section.
- **EXTENDED states** (focus, pressed, disabled, error, hover on non-hover components, toast, modal, menu, skeleton, empty, table states, marquee, chart toolbar): there is no Figma value to compare; the checks verify the documented derivation (e.g. Main color stroke, Grey 1 fill, sizes from existing tokens).
- **Pixel diff against a Figma export** of the Dashboard was done in stage 2 (light) and not repeated here; this run compares numbers, not pixels.
- **Sample data:** only part of the ticker numbers and the first blotter row were harvested; other values are illustrative (see Reference / decisions). Ids are literally "UAT-TRD-000..." in the source.
- Fonts load from Google Fonts: offline, the fallback stacks (Extended) are used and hug widths will differ.
- Clipboard read-back in headless Chrome returns CRLF line breaks on Windows, so a byte-for-byte comparison needs a CRLF normalisation (content is otherwise identical); Copy HTML is the kit's.
- Interaction timing (hover transitions, marquee speed) is not defined by Figma; the marquee / skeleton animations were not measured over time.

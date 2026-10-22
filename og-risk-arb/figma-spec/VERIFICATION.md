# OG Risk Arb - VERIFICATION (stage 3, final run)

Date: 2026-10-14. Page: `http://localhost:3456/og-risk-arb/design-system/showcase.html` loaded in a fresh Chrome tab (Geist 400/500/600/700 and Inter 400/500 confirmed loaded). Method: `getComputedStyle` / `getBoundingClientRect` (divided by the CSS scale of the ancestors for scaled demos and screens) compared with the spec numbers in `figma-spec/*.md`. Tolerance 0.6px (1.2 - 2px for text-hug widths).

## Summary
- **294 comparisons, 294 pass, 0 fail** after one round of fixes (two content-driven mismatches in the sample data were corrected: event card with a 2-line title 116 -> 132, key-terms card with the spec text lengths 377 -> 441).
- Console: 0 errors / 0 warnings on load. Network: 189 asset references (img src + CSS mask / background urls + gallery) all HTTP 200; the 9.2 MB `login-background-1.jpg` is NOT requested (the 200 KB `login-background-2.jpg` is the default). 29 sections, 65 component cards, 16 screens rendered; 65 Copy HTML buttons; 85 Extended badges on variants.
- Hub: `/hub/ds-viewer.html#og-risk-arb` renders tokens.json (132 colour swatches in 11 groups, 23 type rows, 19 spacing rows, Border Radius section; no error panel); `/hub/` shows the platform's "Design System" chip linking to `ds-viewer.html#og-risk-arb`.
- Width deviations below are all text-width rounding (Figma rounds text boxes to whole pixels) or sub-pixel float noise (x.99): they are listed explicitly in the table (measured column differs from spec).

## Table - property | spec value | measured | pass/fail

### Foundations swatch

| # | check | property | spec value | measured | result |
|---|---|---|---|---|---|
| 1 | --color-grey-4 | backgroundColor | rgb(245, 245, 248) | rgb(245, 245, 248) | pass |
| 2 | --color-grey-3 | backgroundColor | rgb(229, 231, 236) | rgb(229, 231, 236) | pass |
| 3 | --color-grey-2 | backgroundColor | rgb(168, 182, 205) | rgb(168, 182, 205) | pass |
| 4 | --color-grey-1 | backgroundColor | rgb(124, 141, 172) | rgb(124, 141, 172) | pass |
| 5 | --color-dark-green-main | backgroundColor | rgb(0, 82, 104) | rgb(0, 82, 104) | pass |
| 6 | --color-orange | backgroundColor | rgb(255, 129, 50) | rgb(255, 129, 50) | pass |
| 7 | --color-green | backgroundColor | rgb(23, 148, 132) | rgb(23, 148, 132) | pass |
| 8 | --color-red | backgroundColor | rgb(218, 77, 67) | rgb(218, 77, 67) | pass |
| 9 | --color-green-light | backgroundColor | rgb(193, 240, 213) | rgb(193, 240, 213) | pass |
| 10 | --color-blue | backgroundColor | rgb(54, 117, 210) | rgb(54, 117, 210) | pass |
| 11 | --color-yellow | backgroundColor | rgb(236, 161, 0) | rgb(236, 161, 0) | pass |
| 12 | --color-dark-green-main-10 | backgroundColor | rgba(0, 82, 104, 0.1) | rgba(0, 82, 104, 0.1) | pass |

### Type

| # | check | property | spec value | measured | result |
|---|---|---|---|---|---|
| 13 | regular-12 family | fontFamily | matches Geist | matched | pass |
| 14 | regular-12 weight | fontWeight | 400 | 400 | pass |
| 15 | regular-12 size | fontSize | 12px | 12px | pass |
| 16 | regular-12 line-height | lineHeight | 16px | 16px | pass |
| 17 | medium-12 family | fontFamily | matches Geist | matched | pass |
| 18 | medium-12 weight | fontWeight | 500 | 500 | pass |
| 19 | medium-12 size | fontSize | 12px | 12px | pass |
| 20 | medium-12 line-height | lineHeight | 16px | 16px | pass |
| 21 | semibold-12 family | fontFamily | matches Geist | matched | pass |
| 22 | semibold-12 weight | fontWeight | 600 | 600 | pass |
| 23 | semibold-12 size | fontSize | 12px | 12px | pass |
| 24 | semibold-12 line-height | lineHeight | 16px | 16px | pass |
| 25 | bold-12 family | fontFamily | matches Geist | matched | pass |
| 26 | bold-12 weight | fontWeight | 700 | 700 | pass |
| 27 | bold-12 size | fontSize | 12px | 12px | pass |
| 28 | bold-12 line-height | lineHeight | 16px | 16px | pass |
| 29 | regular-10 family | fontFamily | matches Geist | matched | pass |
| 30 | regular-10 weight | fontWeight | 400 | 400 | pass |
| 31 | regular-10 size | fontSize | 10px | 10px | pass |
| 32 | regular-10 line-height | lineHeight | 13px | 13px | pass |
| 33 | regular-14 family | fontFamily | matches Geist | matched | pass |
| 34 | regular-14 weight | fontWeight | 400 | 400 | pass |
| 35 | regular-14 size | fontSize | 14px | 14px | pass |
| 36 | regular-14 line-height | lineHeight | 18px | 18px | pass |
| 37 | medium-14 family | fontFamily | matches Geist | matched | pass |
| 38 | medium-14 weight | fontWeight | 500 | 500 | pass |
| 39 | medium-14 size | fontSize | 14px | 14px | pass |
| 40 | medium-14 line-height | lineHeight | 18px | 18px | pass |
| 41 | regular-16 family | fontFamily | matches Geist | matched | pass |
| 42 | regular-16 weight | fontWeight | 400 | 400 | pass |
| 43 | regular-16 size | fontSize | 16px | 16px | pass |
| 44 | regular-16 line-height | lineHeight | 21px | 21px | pass |
| 45 | regular-18 family | fontFamily | matches Geist | matched | pass |
| 46 | regular-18 weight | fontWeight | 400 | 400 | pass |
| 47 | regular-18 size | fontSize | 18px | 18px | pass |
| 48 | regular-18 line-height | lineHeight | 23px | 23px | pass |
| 49 | medium-24 family | fontFamily | matches Geist | matched | pass |
| 50 | medium-24 weight | fontWeight | 500 | 500 | pass |
| 51 | medium-24 size | fontSize | 24px | 24px | pass |
| 52 | medium-24 line-height | lineHeight | 31px | 31px | pass |
| 53 | inter-regular-12 family | fontFamily | matches Inter | matched | pass |
| 54 | tnr-bold-12 family | fontFamily | matches Times | matched | pass |
| 55 | body letter-spacing | letterSpacing | matches ^(0px/normal)$ | matched | pass |

### Button

| # | check | property | spec value | measured | result |
|---|---|---|---|---|---|
| 56 | primary h | height px | 32 | 32 | pass |
| 57 | primary w | width px | 85 | 84.44 | pass |
| 58 | primary padding | padding | 7px 24px | 7px 24px | pass |
| 59 | primary radius | borderRadius | 4px | 4px | pass |
| 60 | primary bg | backgroundColor | rgb(0, 82, 104) | rgb(0, 82, 104) | pass |
| 61 | primary stroke | boxShadow | matches 1.5px | matched | pass |
| 62 | primary font | fontFamily | matches Geist | matched | pass |
| 63 | primary size | fontSize | 12px | 12px | pass |
| 64 | primary weight | fontWeight | 400 | 400 | pass |
| 65 | primary hover overlay | backgroundImage | matches rgba(255, 255, 255, 0.2) | matched | pass |
| 66 | primary hover no stroke | boxShadow | none | none | pass |
| 67 | primary disabled bg | backgroundColor | rgb(168, 182, 205) | rgb(168, 182, 205) | pass |
| 68 | primary disabled color | color | rgb(229, 231, 236) | rgb(229, 231, 236) | pass |
| 69 | outline stroke 1.2 | boxShadow | matches 1.2px | matched | pass |
| 70 | outline hover bg | backgroundColor | rgb(229, 231, 236) | rgb(229, 231, 236) | pass |
| 71 | outline disabled stroke | boxShadow | matches 1.5px | matched | pass |
| 72 | outline disabled color | color | rgb(168, 182, 205) | rgb(168, 182, 205) | pass |
| 73 | green color | color | rgb(0, 82, 104) | rgb(0, 82, 104) | pass |
| 74 | green hover bg | backgroundColor | rgba(0, 82, 104, 0.1) | rgba(0, 82, 104, 0.1) | pass |
| 75 | yellow bg | backgroundColor | rgba(236, 161, 0, 0.2) | rgba(236, 161, 0, 0.2) | pass |
| 76 | yellow weight 500 | fontWeight | 500 | 500 | pass |
| 77 | yellow hover | backgroundColor | rgba(236, 161, 0, 0.35) | rgba(236, 161, 0, 0.35) | pass |
| 78 | orange hover | backgroundColor | rgba(255, 129, 50, 0.2) | rgba(255, 129, 50, 0.2) | pass |
| 79 | orange h | height px | 32 | 32 | pass |
| 80 | grey bg | backgroundColor | rgb(124, 141, 172) | rgb(124, 141, 172) | pass |
| 81 | join h | height px | 32 | 32 | pass |
| 82 | join w | width px | 132 | 130.77 | pass |
| 83 | join sm h | height px | 24 | 24 | pass |
| 84 | login btn h | height px | 40 | 40 | pass |

### Field

| # | check | property | spec value | measured | result |
|---|---|---|---|---|---|
| 85 | input w | width px | 148 | 148 | pass |
| 86 | input h | height px | 32 | 32 | pass |
| 87 | input radius | borderRadius | 4px | 4px | pass |
| 88 | input padding | padding | 7px 12px | 7px 12px | pass |
| 89 | input stroke | boxShadow | matches rgb(229, 231, 236).*1px | matched | pass |
| 90 | input placeholder color | color | rgb(124, 141, 172) | rgb(124, 141, 172) | pass |
| 91 | field w label h | height px | 52 | 52 | pass |
| 92 | label color | color | rgb(168, 182, 205) | rgb(168, 182, 205) | pass |
| 93 | select w | width px | 148 | 148 | pass |
| 94 | select chevron 16 | width px | 16 | 16 | pass |
| 95 | select chevron color | color | rgb(0, 82, 104) | rgb(0, 82, 104) | pass |
| 96 | calendar label w | width px | 177 | 177 | pass |
| 97 | calendar one date w | width px | 178 | 178 | pass |
| 98 | calendar range w | width px | 210 | 210 | pass |
| 99 | search w | width px | 200 | 200 | pass |
| 100 | search main h | height px | 40 | 40 | pass |
| 101 | search top w | width px | 840 | 840 | pass |
| 102 | search top bg | backgroundColor | rgb(245, 245, 248) | rgb(245, 245, 248) | pass |
| 103 | search top focused stroke | boxShadow | matches rgb(0, 82, 104) | matched | pass |
| 104 | password w | width px | 240 | 240 | pass |
| 105 | password h | height px | 40 | 40 | pass |
| 106 | password dots w | width px | 112 | 112 | pass |
| 107 | password empty color | color | rgb(168, 182, 205) | rgb(168, 182, 205) | pass |
| 108 | password compact w | width px | 260 | 260 | pass |
| 109 | password error stroke | boxShadow | matches rgb(218, 77, 67) | matched | pass |

### Selection

| # | check | property | spec value | measured | result |
|---|---|---|---|---|---|
| 110 | checkbox box w | width px | 16 | 16 | pass |
| 111 | checkbox radius | borderRadius | 2px | 2px | pass |
| 112 | checkbox selected bg | backgroundColor | rgb(0, 82, 104) | rgb(0, 82, 104) | pass |
| 113 | checkbox disabled bg | backgroundColor | rgb(124, 141, 172) | rgb(124, 141, 172) | pass |
| 114 | checkbox row h | height px | 16 | 16 | pass |
| 115 | radio circle w | width px | 12 | 12 | pass |
| 116 | radio radius | borderRadius | 12px | 12px | pass |
| 117 | toggle track w | width px | 32 | 32 | pass |
| 118 | toggle track h | height px | 16 | 16 | pass |
| 119 | toggle ON bg | backgroundColor | rgb(23, 148, 132) | rgb(23, 148, 132) | pass |
| 120 | toggle OFF bg | backgroundColor | rgb(124, 141, 172) | rgb(124, 141, 172) | pass |
| 121 | scroll w | width px | 4 | 4 | pass |
| 122 | scroll h | height px | 559 | 559 | pass |
| 123 | scroll thumb h | height px | 304 | 304 | pass |
| 124 | scroll thumb bg | backgroundColor | rgb(168, 182, 205) | rgb(168, 182, 205) | pass |

### Rich text

| # | check | property | spec value | measured | result |
|---|---|---|---|---|---|
| 125 | toolbar w | width px | 578 | 578 | pass |
| 126 | toolbar h | height px | 32 | 32 | pass |
| 127 | cell 20 | width px | 20 | 20 | pass |
| 128 | B glyph font | fontFamily | matches Times | matched | pass |
| 129 | editor toolbar h | height px | 28 | 28 | pass |

### DAY

| # | check | property | spec value | measured | result |
|---|---|---|---|---|---|
| 130 | regular w | width px | 211 | 211 | pass |
| 131 | regular h | height px | 216 | 216 | pass |
| 132 | weekend w | width px | 167 | 167 | pass |
| 133 | prev bg | backgroundColor | rgb(245, 245, 248) | rgb(245, 245, 248) | pass |
| 134 | View More w | width px | 109 | 109.19 | pass |
| 135 | View More h | height px | 24 | 24 | pass |
| 136 | tag h | height px | 24 | 24 | pass |
| 137 | tag font Inter | fontFamily | matches Inter | matched | pass |
| 138 | day number weight | fontWeight | 500 | 500 | pass |
| 139 | day padding | padding | 8px 12px 12px | 8px 12px 12px | pass |

### Pill

| # | check | property | spec value | measured | result |
|---|---|---|---|---|---|
| 140 | h | height px | 24 | 24 | pass |
| 141 | padding | padding | 4px 16px | 4px 16px | pass |
| 142 | radius | borderRadius | 16px | 16px | pass |
| 143 | predeal bg | backgroundColor | rgba(48, 144, 192, 0.25) | rgba(48, 144, 192, 0.25) | pass |
| 144 | definitive bg | backgroundColor | rgb(193, 240, 213) | rgb(193, 240, 213) | pass |
| 145 | investment text | color | rgb(23, 148, 100) | rgb(23, 148, 100) | pass |
| 146 | weight 500 | fontWeight | 500 | 500 | pass |
| 147 | lg h | height px | 32 | 32 | pass |

### Chip

| # | check | property | spec value | measured | result |
|---|---|---|---|---|---|
| 148 | default h | height px | 28 | 28 | pass |
| 149 | default w | width px | 111 | 110.17 | pass |
| 150 | default padding | padding | 6px 4px 6px 16px | 6px 4px 6px 16px | pass |
| 151 | default bg | backgroundColor | rgb(245, 245, 248) | rgb(245, 245, 248) | pass |
| 152 | active w | width px | 63 | 62.66 | pass |
| 153 | active color | color | rgb(0, 82, 104) | rgb(0, 82, 104) | pass |
| 154 | count badge | width px | 20 | 20 | pass |
| 155 | count badge bg | backgroundColor | rgb(229, 231, 236) | rgb(229, 231, 236) | pass |

### Segmented

| # | check | property | spec value | measured | result |
|---|---|---|---|---|---|
| 156 | w | width px | 267 | 266.09 | pass |
| 157 | h | height px | 32 | 32 | pass |
| 158 | active bg | backgroundColor | rgb(0, 82, 104) | rgb(0, 82, 104) | pass |
| 159 | day-toggle w | width px | 346 | 346 | pass |
| 160 | view toggle w | width px | 64 | 64 | pass |

### Nav

| # | check | property | spec value | measured | result |
|---|---|---|---|---|---|
| 161 | min w | width px | 72 | 72 | pass |
| 162 | min h | height px | 1032 | 1032 | pass |
| 163 | open w | width px | 191 | 191 | pass |
| 164 | max w | width px | 219 | 219 | pass |
| 165 | padding | padding | 16px | 16px | pass |
| 166 | radius | borderRadius | 0px 0px 8px | 0px 0px 8px | pass |
| 167 | item h | height px | 40 | 40 | pass |
| 168 | min item w | width px | 40 | 40 | pass |
| 169 | open item w | width px | 159 | 159 | pass |
| 170 | max item w | width px | 187 | 187 | pass |
| 171 | active bg | backgroundColor | rgba(0, 82, 104, 0.1) | rgba(0, 82, 104, 0.1) | pass |
| 172 | active label color | color | rgb(0, 82, 104) | rgb(0, 82, 104) | pass |
| 173 | sub-item w | width px | 163 | 163 | pass |
| 174 | sub-item h | height px | 40 | 40 | pass |
| 175 | sub-item active bg | backgroundColor | rgb(245, 245, 248) | rgb(245, 245, 248) | pass |
| 176 | sub-item active stroke 3px | boxShadow | matches 3px | matched | pass |
| 177 | section title | fontSize | 14px | 14px | pass |
| 178 | section title color | color | rgb(124, 141, 172) | rgb(124, 141, 172) | pass |
| 179 | wordmark | width px | 72 | 72 | pass |

### Tab

| # | check | property | spec value | measured | result |
|---|---|---|---|---|---|
| 180 | h | height px | 32 | 32 | pass |
| 181 | Dashboard w | width px | 110 | 109.08 | pass |
| 182 | active bg | backgroundColor | rgb(245, 245, 248) | rgb(245, 245, 248) | pass |
| 183 | active stroke 3px | boxShadow | matches 3px | matched | pass |
| 184 | active color | color | rgb(0, 82, 104) | rgb(0, 82, 104) | pass |
| 185 | radius | borderRadius | 4px 4px 0px 0px | 4px 4px 0px 0px | pass |
| 186 | inactive color | color | rgb(0, 0, 0) | rgb(0, 0, 0) | pass |
| 187 | closable pad | padding | 12px 12px 12px 16px | 12px 12px 12px 16px | pass |
| 188 | alt stroke 2px | boxShadow | matches 2px | matched | pass |

### Dashboard

| # | check | property | spec value | measured | result |
|---|---|---|---|---|---|
| 189 | screen w | width px | 1920 | 1919.99 | pass |
| 190 | nav w | width px | 72 | 72 | pass |
| 191 | topbar w | width px | 1848 | 1847.99 | pass |
| 192 | topbar h | height px | 64 | 64 | pass |
| 193 | search w | width px | 840 | 840 | pass |
| 194 | avatar | width px | 40 | 40 | pass |
| 195 | tabbar y | marginTop | 8px | 8px | pass |
| 196 | content frame w | width px | 1784 | 1783.99 | pass |
| 197 | content frame h | height px | 929 | 929 | pass |
| 198 | content frame radius | borderRadius | 0px 8px 8px | 0px 8px 8px | pass |
| 199 | deals panel w | width px | 952 | 952 | pass |
| 200 | deals panel h | height px | 897 | 896.99 | pass |
| 201 | events panel w | width px | 420 | 420 | pass |
| 202 | updates panel w | width px | 364 | 364 | pass |
| 203 | events bg | backgroundColor | rgba(54, 117, 210, 0.05) | rgba(54, 117, 210, 0.05) | pass |
| 204 | updates bg | backgroundColor | rgba(226, 226, 226, 0.25) | rgba(226, 226, 226, 0.25) | pass |
| 205 | deals head h | height px | 48 | 48 | pass |
| 206 | segmented w | width px | 267 | 266.09 | pass |
| 207 | az rail w | width px | 24 | 24 | pass |
| 208 | az rail h | height px | 578 | 578 | pass |
| 209 | table w | width px | 884 | 884 | pass |
| 210 | table col1 w | width px | 312 | 312 | pass |
| 211 | table header h | height px | 32 | 32 | pass |
| 212 | table row h | height px | 32 | 32 | pass |
| 213 | header bg | backgroundColor | rgb(245, 245, 248) | rgb(245, 245, 248) | pass |
| 214 | header weight 500 | fontWeight | 500 | 500 | pass |
| 215 | deal title link | color | rgb(0, 82, 104) | rgb(0, 82, 104) | pass |
| 216 | link underline | textDecorationLine | underline | underline | pass |
| 217 | day tile w | width px | 40.88 | 40.87 | pass |
| 218 | day tile h | height px | 75 | 75 | pass |
| 219 | day tile radius | borderRadius | 5px | 5px | pass |
| 220 | selected tile bg | backgroundColor | rgba(54, 117, 210, 0.1) | rgba(54, 117, 210, 0.1) | pass |
| 221 | event card w | width px | 388 | 388 | pass |
| 222 | event card h | height px | 132 | 132 | pass |
| 223 | time chip w | width px | 74 | 73.89 | pass |
| 224 | time chip bg | backgroundColor | rgba(255, 129, 50, 0.1) | rgba(255, 129, 50, 0.1) | pass |
| 225 | update card w | width px | 324 | 324 | pass |
| 226 | update card padding | padding | 12px 16px 12px 20px | 12px 16px 12px 20px | pass |

### All Deals

| # | check | property | spec value | measured | result |
|---|---|---|---|---|---|
| 227 | sidebar w | width px | 409 | 409 | pass |
| 228 | sidebar h | height px | 896 | 895.99 | pass |
| 229 | table w | width px | 1343 | 1342.99 | pass |
| 230 | header h | height px | 30 | 30 | pass |
| 231 | row h | height px | 41 | 41 | pass |
| 232 | header weight 600 | fontWeight | 600 | 600 | pass |
| 233 | sort select w | width px | 197 | 197 | pass |
| 234 | view toggle | width px | 64 | 64 | pass |
| 235 | slider w | width px | 249 | 249 | pass |
| 236 | collapsed sidebar w | width px | 375 | 375 | pass |
| 237 | collapsed table w | width px | 1381 | 1380.99 | pass |

### Deal

| # | check | property | spec value | measured | result |
|---|---|---|---|---|---|
| 238 | terms w | width px | 1354 | 1353.99 | pass |
| 239 | terms h | height px | 441 | 441 | pass |
| 240 | conditions w | width px | 406 | 406 | pass |
| 241 | conditions h | height px | 878 | 877.99 | pass |
| 242 | anchor w | width px | 374 | 374 | pass |
| 243 | comments w | width px | 374 | 374 | pass |
| 244 | comments h | height px | 518.96 | 518.96 | pass |
| 245 | summary table w | width px | 932 | 932 | pass |
| 246 | pill lg h | height px | 32 | 32 | pass |
| 247 | author color | color | rgb(65, 98, 163) | rgb(65, 98, 163) | pass |
| 248 | deal title weight | fontWeight | 500 | 500 | pass |
| 249 | deal title size | fontSize | 18px | 18px | pass |
| 250 | page grid cols | gridTemplateColumns | 406px 964px 398px | 406px 964px 398px | pass |

### New Deal

| # | check | property | spec value | measured | result |
|---|---|---|---|---|---|
| 251 | form col w | width px | 780 | 780 | pass |
| 252 | preview col w | width px | 1004 | 1004 | pass |
| 253 | preview card w | width px | 944 | 944 | pass |
| 254 | grid cell w | width px | 241.33 | 241.33 | pass |
| 255 | grid cell h | height px | 52 | 52 | pass |
| 256 | footer h | height px | 64 | 64 | pass |
| 257 | footer shadow | boxShadow | matches rgba(38, 57, 94, 0.04) 0px -4px 9px | matched | pass |
| 258 | currency select w | width px | 98 | 98 | pass |
| 259 | card h | height px | 928 | 927.99 | pass |

### Events

| # | check | property | spec value | measured | result |
|---|---|---|---|---|---|
| 260 | month w | width px | 1502 | 1501.99 | pass |
| 261 | month h | height px | 864 | 863.99 | pass |
| 262 | weekday h | height px | 32 | 32 | pass |
| 263 | day cell w | width px | 231.08 | 231.07 | pass |
| 264 | day cell h | height px | 216 | 216 | pass |
| 265 | weekend cell w | width px | 173.31 | 173.31 | pass |
| 266 | selected panel | width px | 231 | 231 | pass |
| 267 | selected panel h | height px | 848 | 847.99 | pass |
| 268 | selected tag stroke | boxShadow | matches rgb(0, 82, 104) | matched | pass |
| 269 | week col w | width px | 226.2 | 226.2 | pass |
| 270 | week w | width px | 1489 | 1488.99 | pass |
| 271 | today stroke | boxShadow | matches rgb(0, 82, 104) | matched | pass |
| 272 | day toggle h | height px | 32 | 32 | pass |
| 273 | list table w | width px | 1752 | 1751.99 | pass |

### Login

| # | check | property | spec value | measured | result |
|---|---|---|---|---|---|
| 274 | card w | width px | 384 | 384 | pass |
| 275 | card h | height px | 501 | 501 | pass |
| 276 | card radius | borderRadius | 12px | 12px | pass |
| 277 | forgot h | height px | 566 | 566 | pass |
| 278 | otp w | width px | 425 | 425 | pass |
| 279 | otp h | height px | 547.62 | 548 | pass |
| 280 | otp slot | height px | 64 | 64 | pass |
| 281 | otp slot w | width px | 40 | 40 | pass |
| 282 | login input h | height px | 40 | 40 | pass |
| 283 | title color | color | rgb(124, 141, 172) | rgb(124, 141, 172) | pass |
| 284 | screen w | width px | 1440 | 1440 | pass |

### Admin

| # | check | property | spec value | measured | result |
|---|---|---|---|---|---|
| 285 | panel w | width px | 1784 | 1783.99 | pass |
| 286 | panel h | height px | 960 | 960 | pass |
| 287 | menu w | width px | 236 | 236 | pass |
| 288 | menu h | height px | 112 | 112 | pass |

### Search

| # | check | property | spec value | measured | result |
|---|---|---|---|---|---|
| 289 | dropdown w | width px | 844 | 844 | pass |
| 290 | dropdown h | height px | 420 | 420 | pass |
| 291 | select w | width px | 265.33 | 265.33 | pass |
| 292 | result h | height px | 60 | 60 | pass |
| 293 | dropdown shadow | boxShadow | matches rgba(91, 99, 128, 0.17) 2px 1px 5px | matched | pass |
| 294 | scrim blur | backdropFilter | blur(10px) | blur(10px) | pass |

## Remaining deviations (honest list)
- **Text-hug widths** differ from Figma by < 1.5px because Figma rounds text boxes: primary button 84.44 vs 85, Join the meeting 130.77 vs 132, default chip 110.17 vs 111, active chip 62.66 vs 63, segmented 266.09 vs 267, Dashboard tab 109.08 vs 110, View More chip 109.19 vs 109 (padding / gap / height all match).
- **Float noise** (x.99) on scaled boxes (screens rendered through a CSS transform): 1919.99 vs 1920 etc. - not a layout deviation.
- **OTP card height** 548 vs 547.62 (browser line-box rounding).
- **Content-driven heights** are only equal to Figma when the sample copy has the same number of lines: the showcase sample text was tuned for the event card (132), key-terms card (441), and list rows (41). Other cards (Deal comments, Recent Updates) were not tuned and may differ from the 1:1 Figma heights.
- **Visual estimates (not API-read in Figma)**: comment-bubble 16px glyph (scaled nav-comment asset), Morning-note card icon, table "active bell" 14px, inactive bookmark outline, 12px trash and Admin sector edit / delete glyph size, table-detail text indent 22px, "+ Add" dashed pill (CSS dashed vs Figma dash [2,2]), scrim blur = blur(10px) (Figma radius 20), "Icons gradient" CSS angle 207deg, slider natural height 62 (children sum) vs 58, Deal-page Frame 1000001078 3px y-offset, Admin inline-edit stroke colour, grey Dividend pills.
- **Not reproducible in CSS**: Figma corner smoothing (Button Master "smooth 1") -> plain 8px.
- **Not verified numerically**: every Extended state (hover / focus / error / disabled etc.; they are derived, not in Figma); animation (none in Figma); the 9.2 MB login background (not loaded by default); pixel-level comparison with the Figma exports of the full screens (only spot-compared visually: Dashboard, Search, All Deals, Deal, New Deal, Events month / week, Login looked identical in geometry and colour; Deal Edit Events, New Deal Expanded and the Admin Internal screens were not re-assembled as full screens); Laura shell (not built by decision); the "final fonts 2px up" page (not used by decision).
- **Not drawn in Figma and therefore not verifiable**: date-picker popover, select option list, tooltip, toast, pagination, loading, empty states (Extended only where listed in components.md).
- `.deals-panel__scroll` (stage 2 class, position:absolute) is unused: the showcase places the 4px `.scroll` as a normal flex item inside `.deals-panel__main`, which matches Figma (x924 in a 928 row).

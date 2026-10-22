# Enigma X design system audit (ours vs Figma)

Figma file 3PpdEgLKQZaybhyIILCfUF. Ours: `enigma-x/design-system/` showcase at http://localhost:3456/enigma-x/design-system/showcase.html (measured with computed styles, DPR 1.5; borders of 1.5px report as 1.333px, 1px as 0.667px -- CSS values, not errors).

## What Figma actually contains (verified by read-only use_figma)
- Page "final": ONE screen (Dashboard 1920x1080, node 16:1910) plus 12 component sets: Select, Input with 2 text, Input, Search, Checkbox (6 variants), Button, Button Outline, Button black, tabs, input with tabs, refresh, filter, hands (icon buttons).
- Page "drafts": a captured copy of the live app (uat.primeassets.app) and older duplicates of the same sets. Searched both pages for otp/authent/toast/sheet/mobile/modal/dialog/verify: **no toast, no OTP, no mobile authenticator, no bottom sheet, no dropdown list, no modal exist in Figma.** The "mobile authenticator" mentioned in the brief is not in this file.
- Fonts used: **Geist** (Regular / Medium / SemiBold) and **Geist Mono** (Regular / Medium / SemiBold). DM Sans / DM Mono: zero uses.
- No variables, no text styles, no effect styles; no drop shadows anywhere that I dumped (cards, nav, buttons, tiles).
- Page background #F7F8F8; cards white, radius 8, padding 16/24/24/24, gap 16, no border, no shadow.

## Summary
- Component sections reviewed in showcase: 15 (Buttons, Option Toggles, Inputs, Select, Checkbox, Badges, Section Labels, Tabs, Tables, Price Panel, Ticker, Navigation, Cards, Toast, OTP) + 3 foundation sections (Colors, Typography, Spacing).
- MATCH: 0. WRONG: 13 (Checkbox is the closest, only minor deviations). NOT IN FIGMA (invented): 2 (Toast, OTP). Plus ~12 invented sub-parts inside otherwise real components (listed below).
- MISSING IN OURS: 14 Figma patterns (listed below).
- Palette: 15 Figma paint styles; 9 present with correct values, 3 absent (Red #FB9697, green #8BEEC8, Orange #FFB051 as tokens; Main color hover #B0F9F6 absent -> we have wrong #5ADADA), brand-ghost alpha wrong (0.094 vs 0.20), plus 1 invented text colour (#1A1F36) and mapping table errors.
- **Score: 18 / 100.** Palette is roughly right; font, every control height, every component skin except checkbox, price tiles and tables are wrong. An agent following our CLAUDE.md would produce a visibly different product.

## Foundation mismatches
| Item | Figma | Ours | Verdict |
|---|---|---|---|
| Primary font | Geist (UI), Geist Mono (numbers) | DM Sans / DM Mono (body computed: DM Sans) | WRONG |
| Base UI text size | 12px (labels, inputs, table cells, buttons small); 14px (large buttons, order book, balances, ticker price); 20px section titles; 32px price tile | 14px base; 13px table cells; 16px inputs/buttons | WRONG |
| Default text colour | #000000 (nearly all text) | #1A1F36 (does not exist in Figma) | WRONG |
| Secondary / tertiary text | #7C9CAC / #A8BECD | #7C9CAC / #A8BECD | MATCH |
| Grey mapping in CLAUDE.md | Grey 2 = #A8BECD, Grey 3 = #7C9CAC | table says Grey 2 -> #7C9CAC, Grey 3 -> #1A1F36 | WRONG |
| Main color hover | #B0F9F6 (button hover fill, plus 1px #7AEFEF border) | #5ADADA | WRONG |
| Main color transp | #7AEFEF at 20% | rgba(122,239,239,0.094) | WRONG |
| Orange | #FFB051 | #F59E0B ("pending"); #FFB051 absent | WRONG |
| Red (fills) | #FB9697 used as SELL price tile fill | absent from tokens | MISSING |
| green (fills) | #8BEEC8 used as BUY price tile / BUY toggle fill | absent from tokens | MISSING |
| Red/green for text | #E5686A / #4DCC9B | #E5686A / #4DCC9B | MATCH |
| Brand #7AEFEF, darker #3DBFBF, White, Grey 0/1, Black | same | same | MATCH |
| Purple/blue badge colours | #9236F2/#E4CAFF (Limit), #3A77F2/#CADCFF (Market) | absent | MISSING |
| Disabled colours | checkbox only: #7C9CAC fill, #F7F8F8 mark | #D1D5DB bg / #7C9CAC text for buttons | invented for buttons |
| Radius | 4 (controls), 8 (cards, nav, price tiles, order book container), 16 (badge pills), 2 (checkbox), 24/circle (avatar), 5 (component-set frames only) | "always 4px" except shell/OTP | WRONG ("always 4" is false) |
| Shadows | none found | card 0 2px 10px, dialog, sheet, focus ring etc. | invented |
| Borders | almost none: inputs borderless, cards borderless, black 1px on outline buttons, 1.5px black under active tab | 1.5px #DEE8ED on inputs, 1px borders on cards | WRONG |
| Control heights | input/select 32; button 32 (small) / 40 (large: RFQ, header); tab toggle 32 or 40; icon button 32; badge pill 24; table header 32 (blotter) / 34 (order book); table row 40 (blotter) / 42 (order book, balances); ticker cell 80; nav 72; price tile 100 | input 48, button 50, btn-sm 36, danger 48, mobile 52, chip 32, nav 56 | WRONG (only icon button 32 matches) |
| Spacing | 4 (label gap), 8, 12, 16, 24 (card/nav padding) | scale 4/6/8/10/12/... | partly consistent; no contradictions found on 4/8/12/16/24 |
| Light mode only | yes (single light theme) | yes | MATCH (not verifiable that dark never exists) |

## Component-by-component
Figma node IDs in brackets. All Figma values read via use_figma; ours via computed style in the browser.

| Component | Figma spec | Ours | Verdict | Fixes needed |
|---|---|---|---|---|
| Button (primary) [56:193] | 32h (or 40h in RFQ/header), pad 7/24, radius 4, fill #7AEFEF, text #000 Geist Medium 12 (14 on 40h; "REQUEST FOR QUOTE" is upper-case 14). Hover: fill #B0F9F6 + 1px #7AEFEF border. No shadow | 50h, pad 0/20, DM Sans 16/600, radius 4, fill #7AEFEF, text #000; hover #5ADADA | WRONG (fill, text colour, radius match) | height 32/40; pad 24; Geist Medium 12/14; hover #B0F9F6 + 1px #7AEFEF border; weight 500 not 600 |
| Button Outline [56:188] | 32h, 1px #000 border, no fill, text #000 Medium 12. Hover: fill #7AEFEF @20% (border stays #000) | 50h, 1.5px #DEE8ED border, white fill, text #1A1F36 16/600; hover teal border+text | WRONG | border 1px #000, text #000, hover = brand-transp fill, height 32/40 |
| Button black [56:198] | 32h, fill #000, text #7AEFEF Medium 12. Variant2 (hover): + 1px #7AEFEF border | 50h, fill #1A1F36, text #fff, hover opacity .85 | WRONG | fill #000, text #7AEFEF, hover 1px brand border |
| Icon buttons refresh/filter/hands [56:225, 56:230, 56:235] | 32x32, radius 4, transparent, 16px icon stroke 1.5 #7C9CAC; hover fill #DEE8ED | 32x32, radius 4, transparent, icon colour #7C9CAC; hover brand-ghost bg + #3DBFBF icon | WRONG (size/colour OK; hover wrong; the 3 specific icons absent) | hover bg #DEE8ED, keep icon #7C9CAC; add refresh, filter, handshake icons |
| Danger button, btn-sm 36, btn-link, loading spinner, disabled button | none in Figma | present | NOT IN FIGMA (invented) | remove or mark "unverified extension" |
| Option toggles / segmented [56:203 tabs, 56:214 input with tabs] | Group radius 4, no outer border; each option 40h (14px) or 32h (12px), pad 7/24 (or 7/8), no border. Active: fill #7AEFEF, text #000 Geist Medium. Inactive: transparent, text #7C9CAC Geist Regular. In RFQ the group has fill #F7F8F8; BUY/SELL toggle active fill is #8BEEC8 (green); BTC/USD currency toggle active fill is #FFB051 | 36h, each option individually 1px #DEE8ED border, white fill, text #1A1F36 500, radius only on outer corners (4px), active #7AEFEF/600; `option-chip` separate 36h bordered pill | WRONG | no borders; inactive text #7C9CAC regular on transparent; heights 32/40; add BUY/SELL (#8BEEC8) and currency (#FFB051) variants; drop option-chip |
| Input [56:145] | 32h, fill #F7F8F8, NO border, radius 4, pad 7/12, Geist Regular 12, value #000 (placeholder #A8BECD). Label above: Geist Regular 12 #A8BECD, gap 4 (component 52h total) | 48h, 1.5px #DEE8ED border, fill #F7F8F8, radius 4, pad 0/16, DM Sans 16 #1A1F36. Label DM Sans 12/600 #7C9CAC ls .48. Quantity: DM Mono 14 | WRONG (fill and radius match) | height 32, border none, pad 7/12, Geist 12; label #A8BECD Regular, gap 4; quantity is Geist 12 not mono |
| Input with 2 text [56:135] | as Input plus trailing unit text ("bps", "BTC") 12px #7C9CAC, space-between | absent | MISSING | add input with suffix text |
| Search [56:153] | as Input; leading 16px lucide/search icon stroke #3DBFBF, gap 8, pad 7/8 | search field has icon #A8BECD, pad-left 36, 48h | WRONG | icon #3DBFBF, 32h, gap 8 |
| input with tabs [56:214] | 244x32 input flush with 80-107px segmented toggle (BTC/USD) | absent | MISSING | add composite |
| Input states (focus, error message, password toggle) | not in Figma (no focus/error variants exist) | focus ring, 4px glow, red border, error text, eye toggle | NOT IN FIGMA / not verifiable | mark as unverified |
| Select [56:123] | 32h, fill #F7F8F8, no border, radius 4, pad 7/8/7/12, text Geist 12 (#A8BECD placeholder, #000 selected), chevron-down 16px, stroke #3DBFBF 1.2 | native select 48h, 1.5px border, pad 0/36/0/16, DM Sans 14, chevron #A8BECD | WRONG | height 32, no border, chevron #3DBFBF, 12px Geist |
| Select dropdown list (options panel) | not in Figma | white panel, border, shadow, hover #F7F8F8, selected #7AEFEF | NOT IN FIGMA (invented; also #7AEFEF text on white is low contrast) | mark unverified |
| Checkbox [56:165] | 16x16, radius 2, selected fill #7AEFEF with #000 1.5 check; unselected 1px #A8BECD, no fill; "All": solid #7AEFEF with black horizontal dash; disabled: fill #7C9CAC, check/dash #F7F8F8, label #7C9CAC; gap 8; label Geist Regular 12 #000 | 16x16, radius 2, selected #7AEFEF + #000 check (matches), unselected 1px #A8BECD white fill (fill differs: Figma none/transparent), gap 8; label DM Sans 14 #1A1F36; indeterminate = ghost fill + #3DBFBF dash; disabled = 50% opacity | WRONG (minor: box matches) | label Geist 12 #000; "All" = solid brand + black dash; disabled variant per Figma colours; CLAUDE.md says "white checkmark" but CSS (and Figma) are black -> fix doc |
| Badge: order type [Limit/Market in blotter 16:2004+] | pill, 24h, radius 16, pad 0/24 (76-88w), Geist Medium 12. Limit: fill #E4CAFF, text #9236F2. Market: fill #CADCFF, text #3A77F2 | 22h, radius 4, pad 0/8, DM Sans 12/600. Market: rgba(122,239,239,.15)/#3DBFBF. Limit: rgba(150,130,220,.15)/#7B5EA7 | WRONG | pills r16, 24h, pad 24, exact colours above |
| Status badges (success/danger/pending/active), buy/sell badges | not in Figma. Side (BUY/SELL) is plain Geist Medium 12 text, BUY #4DCC9B, SELL #E5686A | present as tinted badges | NOT IN FIGMA (invented) | remove or label as extension |
| Currency chip | BTC/USD toggle, 32h, active fill #FFB051, text #000; inactive text #7C9CAC | DM Mono 12/600 #F59E0B on 15% tint, 24h | WRONG | solid #FFB051 active segment, part of input-with-tabs |
| Env badge (UAT) | 220x40, fill #7AEFEF @20%, no border, radius 4, text #000 Geist Medium 16, centred in nav | 32h, white, 1px border, DM Sans 12/600 ls .48 | WRONG | see Navigation |
| Section labels | Card/section titles: Geist Regular 20, UPPERCASE, #000, no letter-spacing. Field labels: Geist Regular 12 #A8BECD sentence case | `.section-label` 12/700 uppercase ls .72 #A8BECD; `.eyebrow` 12/700 uppercase ls .96 #3DBFBF | WRONG; eyebrow NOT IN FIGMA | add 20px uppercase title style; drop eyebrow teal style |
| Tabs (page tabs, "TRADES BLOTTER / BALANCE MOVEMENT") | Geist Regular 20 UPPERCASE; active #000 with 1.5px #000 bottom border; inactive #7C9CAC, no border; pad 0/24/12/24; no weight change; tab row 38h; tab strip has icon buttons right-aligned | 14px, active #1A1F36/600 with 2px #7AEFEF underline, inactive #A8BECD/500, pad 10/16 | WRONG | 20px upper, black 1.5px underline, inactive #7C9CAC |
| Table: order book (Spot Trader) [16:1932] | Container fill #F7F8F8, radius 8; header 34h pad 8/24, Geist Regular 14 #A8BECD (all three headers same colour, not uppercase, no tracking); rows 42h pad 12/24, alternate white / transparent (zebra), no row borders; BID price Geist Mono Medium 14 #E5686A; qty Mono Regular 14 #000; ASK price Mono Medium 14 **#4DCC9B** | headers 12/600 uppercase ls .72, BID header red, ASK header #7AEFEF; rows ~35h with bottom borders, DM Mono 12; ASK prices **#7AEFEF** (also white-on-white weak contrast); BID #E5686A OK | WRONG | ASK = #4DCC9B everywhere (CLAUDE.md "ASK is teal" is wrong vs Figma); header neutral; 14px Mono Medium; 42h zebra rows; container r8 #F7F8F8 |
| Table: balances [16:1958] | same shell; asset Geist Medium 14 #000; qty Geist Mono Medium 14, positive #4DCC9B, negative #E5686A; header "Asset / Quantity" 14 #A8BECD | 13px/12px, DM Sans/DM Mono, borders; positive #4DCC9B OK | WRONG | as above |
| Table: trades blotter [16:1990] | header 32h pad 8/12, Geist Regular 12 #A8BECD (not uppercase); rows 40h pad 12, zebra white/#F7F8F8; first col status dot 6.7px (#4DCC9B / #E5686A); cells Geist Medium 12 #000 (IDs, instrument, price are Geist, NOT mono); order type pill; SIDE text BUY #4DCC9B / SELL #E5686A; quantity decimals ("00") coloured #A8BECD; timestamp Geist Regular 12 grey; ellipsis ("UAT-TRD-000...") | header 12/600 uppercase ls .72; rows 38.7h with borders; IDs/qty/price DM Mono 12, ID #7C9CAC, TIF/User grey, SIDE plain #1A1F36 (not coloured), no status dot, no zebra | WRONG | follow Figma list; zebra rows; status dot column; coloured side; greyed decimals |
| Price panel (BID/ASK tiles) [16:1918] | Two solid tiles 188x100, radius 8, pad 12. SELL/bid tile fill **#FB9697**, BUY/ask tile fill **#8BEEC8**; text #000 Geist Mono Regular: 32px big figure + 14px decimals (upper-case); no label, no border. Centered white "spread" tab (98.23, Mono 16, r 8/8/0/0, 120x32, overlaps tiles by 36px) | tinted 12% panels with 25% border, radius 4, pad 12/16, "BID"/"ASK" label 12/600, value DM Mono 32/600 coloured (#E5686A / #7AEFEF), sub 12 #7C9CAC | WRONG | solid #FB9697 / #8BEEC8 fills, black text, radius 8, regular weight, add spread tab, remove labels/border |
| Ticker bar [16:2133] | 80h strip, fill #FFFFFF, cells have 1px right border #F7F8F8, pad 12/16, gap 4; 18px circular coin icon + symbol Geist Regular 12 #000; price Geist Mono SemiBold 14 #000; abs change + (pct) Geist Mono Regular 12 coloured #E5686A / #4DCC9B; scrolling marquee | bar 63h white with bottom border #DEE8ED; items 62h pad 6/12; pair DM Sans 10/600 uppercase #7C9CAC; price DM Mono 12/600; delta pct only DM Mono 10; no icon | WRONG | 80h, add coin icon + abs/pct delta, sizes 12/14/12, symbol #000 |
| Navigation [16:2386] | Floating bar 1872x72 (24px page margin), fill #FFF, radius 8, pad 16/24, no border/shadow, space-between. Left: teal (#3DBFBF) vector logo 163x40 (labyrinth icon + ENIGMA serif wordmark). Centre: env button 220x40 #7AEFEF@20%. Right: Exposure pill 255x40, fill #4DCC9B@20% + 1px #4DCC9B, label Geist Regular 14 #7C9CAC, value Geist SemiBold 14 #000; date/time block 216x40 (date 12 #A8BECD, time 12 #000, "v1.0.2" #A8BECD, right-aligned, 1px #DEE8ED left separator); avatar 40 circle fill #DEE8ED, initials Geist Regular 14 #000 ls 2 | full-width bar 56h, bottom border, no radius, pad 0/20; logo = invented dark rounded square "X" + text "ENIGMA" 15/700; env badge white bordered 32h; Exposure pill #7AEFEF solid 32h with DM Mono bold value; no date/time; avatar 32 dark navy #1A1F36 + white text | WRONG | 72h, r8, floating; real logo asset; env centred 40h; exposure green-tint pill; add date/time block; avatar #DEE8ED + black text |
| Cards [16:1911 etc.] | white, radius 8, padding 16/24/24/24, gap 16, no border, no shadow; title Geist Regular 20 UPPERCASE #000, no divider | radius 4, 1px #DEE8ED border, shadow 0 2px 10px, header with bottom divider, title 14/600 | WRONG | radius 8; remove border/shadow/divider; 20px upper title |
| Toast | not in Figma | black pill, white text, #E5686A danger variant, slide-up | NOT IN FIGMA (invented) | keep only if designer confirms |
| OTP input / mobile shell / bottom sheet | not in Figma (searched both pages) | 8px-radius 44x56 DM Mono 24 slots, mobile shell, sheet tokens | NOT IN FIGMA (invented) | remove or move to separate "unverified" doc |

## Missing from ours (Figma patterns we lack)
1. Solid BUY (#8BEEC8) / SELL (#FB9697) price tiles with spread tab.
2. Input with 2 texts (unit suffix) and input with tabs (field + BTC/USD segmented toggle, #FFB051 active).
3. BUY/SELL segmented toggle with green #8BEEC8 active fill (we only have brand-teal active).
4. Search field spec (icon #3DBFBF, 32h).
5. Pill order-type badges with exact lavender/blue colours.
6. Zebra row tables with status-dot column, coloured side text, greyed decimal digits.
7. 20px UPPERCASE Geist title style (cards and tabs).
8. Ticker items with coin icon and absolute+percent change.
9. Nav: real logo vector, centred env button, Exposure green pill, date/time/version block, 40px #DEE8ED avatar.
10. Refresh / filter / handshake icon buttons (hover #DEE8ED).
11. Geist / Geist Mono font stack.
12. Tokens: #FB9697, #8BEEC8, #FFB051, #B0F9F6, #9236F2, #E4CAFF, #3A77F2, #CADCFF, #3D5092 (coin badge), brand-transp at 0.20.
13. Radius 8 and 16 tokens in use (cards, tiles, pills).
14. Outline button with black 1px border and brand-20% hover; black button with brand text.

## Invented by us (not found in Figma)
Danger button, btn-sm 36, btn-link, loading spinner, button disabled grey (#D1D5DB); option-chip; input focus ring/error/password toggle; select dropdown list; status badges (success/danger/pending/active) and BUY/SELL badges; eyebrow label; table row hover; card header/divider/shadow; toast; OTP slots; mobile shell/bottom sheet/dialog/banner tokens and shadows; dark-square "X" logo; dark navy avatar; all shadows.
(Hover/focus/error on inputs and any interactive states beyond the Default/hover variants listed under Figma cannot be verified -- the file has no such variants.)

## Prioritized fix list
1. Swap fonts to Geist / Geist Mono everywhere (tokens, CLAUDE.md, showcase). Base UI 12px.
2. Fix control heights/skins: input & select 32 borderless; buttons 32 (40 for RFQ/header); toggles 32/40; badge pill 24/r16.
3. ASK = #4DCC9B (not #7AEFEF); price tiles solid #FB9697 / #8BEEC8; add spread tab. Correct BID/ASK rule in CLAUDE.md.
4. Rebuild tables: neutral #A8BECD headers (not uppercase), zebra rows (40/42h), Geist Medium cells, side colours, status dot, greyed decimals.
5. Rebuild nav (72h floating r8, logo, env, exposure, datetime, avatar) and ticker (80h, icons, abs+pct).
6. Fix cards (r8, no border/shadow, 20px uppercase title) and tab style (20px uppercase, black 1.5px underline).
7. Fix tokens: text #000 (drop #1A1F36), hover #B0F9F6, transp 0.20, orange #FFB051, add #FB9697/#8BEEC8/badge colours; correct Grey 2/Grey 3 mapping table.
8. Fix outline/black buttons and icon-button hover; checkbox label + "All"/disabled variants.
9. Add missing composites (input with suffix, input with tabs, search, BUY/SELL toggle, currency toggle).
10. Quarantine invented items (toast, OTP, mobile shell, danger/link/disabled buttons, dropdown list, shadows) in a clearly labelled "unverified" appendix, or delete.

## Method notes / limits
- Figma values are from direct node reads (fills, strokes, radius, auto-layout padding, font family/style/size) on the component sets and on the Dashboard frame; screenshot of node 16:1910 used for visual confirmation.
- Ours: computed styles from the live showcase in my own browser tab; CSS excerpts read from components.css/tokens.css.
- Not verifiable: hover/active states other than the explicit Figma variants; keyboard/focus; the "Exposure" and "UAT" elements' interactive behaviour; whether the ticker bar scrolls (implied by the clipped frame 2040px wide in a 1920 frame); line-height (Figma uses AUTO).
- No Figma writes and no project file edits other than this report.

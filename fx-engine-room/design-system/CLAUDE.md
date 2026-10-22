# FX Engine Room — design system (agent brief)

Load this file first when building or changing any FX Engine Room UI. Every value below is quoted from the Figma harvest (`../figma-spec/*.md`); nothing here is invented. Where Figma is silent the system is EXTENDED and marked so. Companion files in this folder: `tokens.css` / `tokens.json` (variables), `components.css` (all components + patterns, every rule block carries its `figma:` node ids), `components.md` (copy-paste HTML + behaviour + Extended table), `showcase.html` (every state, screens, inconsistencies), `assets/` (+ `MANIFEST.md`). **Check `components.md` before writing any markup; reuse the classes, never re-derive values.**

## 1. What the platform is
FX Engine Room is a dark-mode, **desktop-only** FX operations platform by Makor Group (footer: "FX Engine Room | Operated by Makor Group"). Screens drawn in Figma: Log In / Change & Reset password flow; Entities list; Entity / Trading Account / Trader detail (split panel with product permissions); Statics admin; widget Dashboard (Activity Blotter, Trades, Rates "Prices"); Trades Blotter (+ Allocate Block, ID Status, filters, context menu, Prices widget); Deleted Trades; Reports / Generate CSV; New Deal / New Trade tickets (Spot, NDF, Swap, Vanilla Option / B2B). Layout: 56px icon sidebar + purple logo block + rounded black content canvas (top bar, breadcrumb/toolbar strip, #171719 body, 46px footer).

## 2. Source of truth and decisions
- Figma file `yuJA7DtjFKnqTZQcu2vKYN`, page "Page 1", canonical **Section 3 `7114:14467`** (component library = section "Assets" `4398:15026`).
- Owner decisions: **Trading Account 1280x1040 (`4164:14303`) is canonical** (the 1920x1080 frame `4031:18455` is hidden in the file); the **dashboard `6038:13964` is the newer one** (not `4243:15535`); **Add Permissions `5587:14498` primary, `5580:14451` alternate**; the oldest master-list Trading Account `3657:4471` is not canonical (not built).
- Hidden in Figma (not built as screens): Trading Account 1920, CSV frames `3107:2972` / `2958:3082` (the lighter one is kept as `.file-list`), MasterFlag set and Flags frame.
- Figma defines ONLY 39 colour variables (no text/effect/paint styles, no spacing/radius tokens, no grids, a single mode). Spacing = observed paddings/gaps. Typography = 22 observed tuples.

## 3. Non-negotiables (each proven by the spec)
1. **Font Nunito** only (Regular 400, Medium 500, SemiBold 600, Medium Italic 500). The one stray `Inter Regular 12` (csv button label) is reproduced but not endorsed. No Bold/Light/Black weights exist. Line-height AUTO (`normal`), letter-spacing 0, no text-transform anywhere.
2. **Dark mode only.** Page `#000000`; panels/body `#171719`; widgets, modals, cards, popovers `#242428`; sidebar, dividers, input fill on modals `#39393C`.
3. **Primary action = purple `#A4A4FF` with a BLACK SemiBold 14 label** (Save Changes, Log In, Generate CSV). Teal `#30F0D6` ("Add New" token) = New/Add and modal CTAs (Create Deal / Create Trade / Add Permissions / Allocate). Both exist; do not swap them.
4. **Radii:** controls 4 (outlined / transparent / with-dropdown / status buttons 3; 24px chip-buttons, checkbox, inline Cancel, csv 2), chips 12, pill chip 20, switch track 12, popovers/menus/widgets 8, modals + login card 12, content canvas `16/0/0/0` (top-left only), circle icon buttons 16 (32px round). **Never 6px.**
5. **Sizes are fixed:** text buttons 32px high (24 / 20 for the small families), fields 32 (44 with label, 56 with error), tabs 42 (32 in screens), checkbox/radio 16, switch 32x16, top bar 56 (48 on the dashboard), footer 46, sidebar 56 wide, logo block 72x56. Widths: buttons HUG, fields FIXED per layout (default 158).
6. **Input fill is surface-aware** (§4.3) — never a single colour.
7. **Switch knobs are inverted as drawn:** ON = knob LEFT (x2), OFF = knob RIGHT (x18; x17 in "Switch with text"). Reproduce it (`.switch`); `.switch--conventional` is an alternative that is NOT Figma.
8. **Section labels are sentence case Medium 18 `#7373BB`** ("Trading Accounts", "Traders"), not uppercase small caps.
9. **"Forgot Password?" is a purple `#A4A4FF` underlined Regular 12 link**, right-aligned on the same row as "Incorrect Password" (`#FF7272`).
10. **Passive status is not a tinted badge.** There is no badge component: "badges" are the outlined 24px chip-buttons (red / blue / yellow / status), the amber DEV tag and plain status dots.
11. **Permissions are not a table:** Trading Account permissions = a card with 4 tabs (Spot / Forwards / Vanilla Options / Exotic Options), tenor labels and comma-separated currency boxes; Add Permissions is a modal with dropdowns/checkboxes.
12. **BUY/SELL and PUT/CALL are a 172x32 segmented control** (orange `#FF9747` / purple); there are no big execution buttons, no quote tiles. In the drawn Trades Blotter, BUY/SELL and P&L are plain white (no green/red); green #2BDF68 / red #FD7557 are drawn on Rates prices + arrows (and Activity zero P&L is #707079).
13. Strokes drawn "INSIDE" are inset box-shadows (no layout effect). Modals have no stroke and **no drop shadow**; the scrim is `#000000 @ 0.5` + 10px backdrop blur and does not cover the sidebar.
14. **`text-box: trim-both cap alphabetic` (Chrome 133+ / Safari 18.2+) is REQUIRED for loose-text positions.** Figma text boxes are cap-height boxes (leading-trim CAP_HEIGHT): 12px text → 8 high, 14 → 10, 18 → 13, 24 → 17. The pattern classes already apply it (titles, labels, value boxes, widget titles, rules box…; utility `.text-trim`). Without support those texts render ~5px low (fixed-height controls are unaffected). Detect with `CSS.supports('text-box','trim-both')`; the showcase shows a warning banner when it is false.
15. No gradients, no CSS framework, no raw hex inside component rules (always `var(--…)`). Only paint-level opacity is used in Figma (never node opacity).

## 4. Tokens (`tokens.css` / `tokens.json`; CSS var = `--color-<figma-name-kebab>`)
### 4.1 Figma variables (39; "Black" exists in both collections)
Primitives (23): Black #000000 · Purple 1 #A4A4FF · Grey 1 #39393C · Grey 2 #171719 · Grey 3 #707079 · Grey 4 #BABEC7 · Grey 5 #E6E6E6 · Grey 6 #242428 · Orange #FF9747 · Red #FF7272 · Red 2 #FD7557 · White #FFFFFF · Green #30F0D6 · Green 2 #2BDF68 · red 3 #B85944 (unused) · Purple 2 #39394E · Purple 3 #7373BB · blue #60A8FF · yellow #FEE274 · red dark #392C2D · blue dark #2A313D · yellow dark #3A3730 · Green dark #264342.
Variables (16): Primary purple #A4A4FF · Primary text #FFFFFF · Separators #39393C · Secondary text #707079 · Light grey text #BABEC7 · BG #000000 · BG Grey 1 #171719 · Menu bar #39393C · Modal BG #242428 · Inputs on modal #39393C · Black #000000 · Cancel Button #E6E6E6 · Edit #FF9747 · Active #2BDF68 · Add New #30F0D6 · delete #FF7272.
Raw (unbound) colours kept as `--color-raw-*`: ungrouped yellow #FFDC51 (warning icon, "Ungrouped trade"), outlined-green #00FEA9 (+ hover #1B5244), row tints amber #FFB800@0.15 / teal #30F0D6@0.15, unallocated row #242432, scrim #000@0.5, edit hover #FFBF8E, red active #5A3834, csv fill #264A35, white overlays @0.2/0.3/0.4, black @0.2, switch shadows #005F20@0.5 / #515151@0.5, pulse rings #2BDF68@0.2/0.1/0.05, chart #3CC3DF #8979FF #FF928A, logo dark #3B3B5C, link gold #FFCF00.

### 4.2 Semantic roles (pick by role; all are `var()` aliases)
| role | token → value |
|---|---|
| page / panel / card, modal, popover / inner panel | `--color-surface-page` #000000 · `-panel` #171719 · `-card`/`-modal`/`-popover` #242428 · `-inner-panel` #39393C |
| sidebar, table-header, tooltip, dropdown-list, user-menu | `--color-surface-sidebar` / `-table-header` / `-tooltip` / `-dropdown-list` / `-user-menu` #39393C |
| row highlight / selected card row | `--color-surface-row-highlight` #39393C · `-row-highlight-card` #39394E · `-row-highlight-green` #264342 |
| row tints | `-row-tint-amber` #FFB800@0.15 · `-row-tint-teal` #30F0D6@0.15 · `-row-unallocated` #242432 |
| text | `--color-text-primary` #FFFFFF · `-secondary` #707079 · `-light` #BABEC7 · `-on-action` #000000 · `-disabled-action` #BABEC7 · `-link` #60A8FF (breadcrumb) · `-link-inline` #A4A4FF · `-section-label` #7373BB · `-kpi-value` #A4A4FF · `-positive` #2BDF68 · `-negative` #FD7557 · `-warning` #FF9747 · `-caution` #FFDC51 · `-error` #FF7272 |
| actions | `--color-action-primary` #A4A4FF · `-teal` #30F0D6 · `-cancel` #E6E6E6 · `-edit` #FF9747 · `-delete` #FF7272 · `-disabled-fill` #707079 · `-transparent-fill` #39394E · `-red` #FD7557 (+hover #392C2D, active #5A3834) · `-blue` #60A8FF (+hover #2A313D) · `-yellow` #FEE274 (+hover #3A3730) |
| borders | `--color-border-default` #39393C · `-disabled` #707079 · `-active` #A4A4FF · `-error` #FF7272 · `-focus` #A4A4FF (EXTENDED) |
| status | `--color-status-success`/`-live`/`-up` #2BDF68 · `-down` #FD7557 · `-danger` #FF7272 · `-warning` #FF9747 · `-warning-yellow` #FEE274 · `-info` #60A8FF · `-inactive` #707079 |
### 4.3 Surface-aware input fill (library fill is always #39393C; screens differ)
| surface behind the field | field fill | unchecked checkbox | container class |
|---|---|---|---|
| #000000 page / #171719 panel | #242428 | #39393C | `.surface-page` / `.surface-panel` |
| #242428 modal / popover / widget | #39393C | #39393C | `.surface-modal` / `.surface-popover` |
| #39393C inner list panel inside a modal | #242428 | #242428 | `.surface-inner` |
Fields read `var(--input-fill)`; shell, modal, widget, filters, auth containers already set it. Filled/locked fields are drawn two ways (keep fill vs. fill removed + 1px `#707079`): `.is-locked` = the bordered look.

## 5. Typography (22 tuples; `font: var(--type-<role>)` or class `.t-<role>`)
| role | tuple | use |
|---|---|---|
| `table-cell` | Medium 12 (6,855 nodes — dominant) | blotter / widget table cells, P&L, menu items, filter labels |
| `cell` | Medium 14 | admin cells and headers, tabs, widget title, KPI, footer text, radio/switch labels |
| `input` | Regular 14 | input value, placeholder, tooltip, chip, modal checkbox labels |
| `label` | Regular 12 | field label (#707079), error message (#FF7272), body text on auth cards |
| `button` | SemiBold 14 | button label (black on filled, coloured on outlined, #BABEC7 disabled) |
| `button-sm` | SemiBold 12 | 24px buttons, inline Cancel 48x20 |
| `detail` / `body-16` | Medium 16 / Regular 16 | detail values, Activity title, dashboard title / "Product Permissions", "Total limit" |
| `title-modal` | Medium 18 | modal title, section label (#7373BB), breadcrumb current |
| `card-title` | SemiBold 18 | group-card header, trader names |
| `page-title` | Medium 20 | top-bar title (x24); entity detail title |
| `heading-entity` | Medium 24 | "Bank of America" |
| `breadcrumb-link` / `range-link` / `link` | Medium 18 / Medium 14 / Regular 12, underlined | breadcrumb root link, chart range chips, "Forgot Password?" |
| `auth-heading` | Regular 18 | auth card titles |
| `note-italic` / `micro` / `dev-tag` | Medium Italic 10 / Regular 8 / SemiBold 16 | ID Status meta / prime-broker tag / DEV tag |
| `outlier-13`, `outlier-20`, `csv` | Regular 13, Regular 20, Inter Regular 12 | one-off outliers ("Assignment", "(RBS EDGE BOA)", csv) — keep as drawn |
Text colour roles: primary #FFFFFF, secondary #707079 (labels, headers, placeholders), light #BABEC7 (inactive, current breadcrumb, footer), purple #A4A4FF, section #7373BB, blue #60A8FF (breadcrumb link).

## 6. Controls, spacing and shell geometry
- **Buttons** (`.btn`): gap 10 (8 for outlined/transparent), padding 11/24 (20 on 24px ones; Outlined purple 24px = 11/16; Outlined red = 11/16 gap 4; With dropdown L24 R20), radius 4 (see §3.4), hover = white overlay layer (0.3 purple/cancel/orange, 0.4 teal, 0.2 status/transparent) or tinted solid (outlined purple #39394E, red #392C2D, blue #2A313D, yellow #3A3730, library green #1B5244), disabled = fill #707079 + label #BABEC7 (outlined: stroke #707079, no fill).
- **Fields:** 32 high, r4, padding 8/12/8/8, gap 8 (search/small search padding 8), Regular 14 #FFFFFF, placeholder #707079, icons #A4A4FF; label Regular 12 #707079 above (label slot 12 → field y12); error = inset 1px #FF7272 + message Regular 12 #FF7272 at y48.
- **Spacing (observed):** 2, 4, 6, 7, 8, 10, 11, 12, 16, 20, 24, 32, 48 (`--space-N`). Modal side inset 32 (login 48), field column 172 / gap 24 / row pitch 68, panel gutter on the dashboard 8, margins 24 left / 16 right.
- **Shell (1440x1024):** sidebar 56 (#39393C); icons 24x24 at x16, first y72, pitch 56 (menu-tab-1, subtract, csv, deleted-trades, entities, Reports file 24x32), inactive #BABEC7, active #A4A4FF, no tile/bar; Settings 24x24 16px above the bottom. Logo block 72x56 #A4A4FF (sits UNDER the canvas; black 32x40 logo at 12,8; dashboard variant 74x48). Content canvas x56, radius 16/0/0/0, #000000. Top bar 56 (bottom stroke 1px #39393C inside; title Medium 20 at x24; user icon 32x32 at 16px from the right). Strip y56–104 (breadcrumb Medium 18 at y73 OR toolbar at y64 h32). Body y104 (#171719; y56 on Reports). Footer 46, top stroke 1px #39393C, padding 8/12, Makor M 24x19.6 + text Medium 14 #BABEC7, 30x30 live pulse at the right.
- **Frames:** default 1440x1024, Trading Account canonical 1280x1040 (margin 16), 1920x1080 hidden.
- **Dashboard (6038:13964):** top bar 48 (title Medium 16 at x20), widgets at x8/y56, gutter 8, Activity 1070x315, Trades 1070x587, Prices 290x911; widget card #242428 r8, title bar 32 #39393C, title Medium 14, grip 10x16 / close 16x16 #BABEC7, resize grip 24x24.

## 7. Components (key rules; **Figma-defined** unless marked EXTENDED)
- **Buttons — Figma-defined:** purple primary, teal New/Add, Cancel #E6E6E6 (hover = #E6E6E6+white@0.3 — the Figma variant mis-named "Disabled"), Outlined purple, Button transparent #39394E, Outlined teal (screens #30F0D6; library & Give-Up #00FEA9), With dropdown (split, chevron 12x7), Outlined red/blue/yellow (24px), status, csv (Inter), orange (Amend / Resend Link), Delete #FF7272, Edit pencil (#FF9747 → #FFBF8E), Trash (#FF7272 + white@0.3), amber "+" 32x24, chip icon buttons 32/24 (#39393C, r4 or round r16), Tabs (Active white + 2px #A4A4FF underline; Hover fill #171719; Not active #BABEC7). **EXTENDED:** pressed (hover + black@0.2), focus ring (1px #A4A4FF, offset 2px), hover of orange/delete/amber/chips, outlined-teal hover (#264342).
- **Fields — Figma-defined:** Input, Search, Dropdown (solid caret 11x6), Dates (calendar), Time, Password (10 dots + eye / eye-off), Chips (+ multi-row), small filter search 205x24 r2, email entry 282x32 + amber "+", textarea-like box, dropdown list 158x118, Input Error. **EXTENDED:** focus (inset 1px #A4A4FF), disabled (= locked look), native `select`/`textarea` mappings.
- **Selection — Figma-defined:** checkbox (checked #A4A4FF + black tick; indeterminate; deselect-all "(n)"), radio, switch (+ with text 80x16). **EXTENDED:** hover/focus/disabled states.
- **Chips / tags — Figma-defined:** chip 82x24 #242428 r12, pill chip 188x32 #39393C r20, DEV tag (#FFB800@0.15 + 1px #FEE274), status dots 12/8.
- **Overlays — Figma-defined:** tooltip (#39393C r4, 32 high, text colour = severity #FF9747 / #FFDC51, no arrow), right-click menu 183x120, Widgets menu, user menu 134x40 (single "Log Out"), dropdown list, filter popovers 237x256 / 237x136, Filters side panel 241x906, scrollbar (4 / 8 px), pagination ("Page 1"), live pulse. **EXTENDED:** pulse timing `.is-pulse`, menu/item focus, hovers.
- **Shell — Figma-defined:** sidebar, logo block, top bar, breadcrumb (blue links in 1440 frames, purple in the canonical 1280), strip/toolbar, footer, KPI pill (351x32 #39394E), top-bar dropdown 203x32. **EXTENDED:** nav / avatar / breadcrumb / auth-link hovers and focus rings.
- **Auth — Figma-defined:** six cards (Log In 312x388, Log In Error, Change/New password 583x309 with rules box, Reset 296x289, Email Sent! 371x255) — fill #242428, r12, no stroke/shadow, on #000000, no shell. **EXTENDED:** unmet password rule.
- **Entities — Figma-defined:** admin table (rows 42, header #707079), group card (header 45 #39393C, rows 62, selected #39394E + name #A4A4FF), Trading Account split panel (left 359 / divider x399 / detail x415), switches "Give Up"/"Active", radios, field stacks (pitch 64), Lucera Drop Value panel, Default Booking Recipients, Product Permissions card, Total-limit popover. **EXTENDED:** row/card hovers.
- **Modals — Figma-defined:** container (#242428 r12, header title Medium 18 centred, divider y61, content from y85, footer = last row + 32, bottom 24), New Deal/Trade (432), Vanilla/B2B ticket (628, 3 columns), New Entity 572x405, New Trader 602x474, New Trading Account 873x573, Add Permissions 420x406 (+ alternate 510x406), Allocate Block 372x385, ID Status 301x440, segmented control. Initial CTA is disabled (#707079/#BABEC7), enabled teal. **EXTENDED:** `.btn-market-side.is-ready`, segmented hover/focus.
- **Widgets — Figma-defined:** widget card, Activity Blotter (Client | Market Maker halves, zero P&L #707079), Rates rows (flag pair, price right-aligned, 12x12 circle-arrow up #2BDF68 / down #FD7557 flipped), Trades toolbar. **EXTENDED:** drag lift, hovers.
- **Blotter — Figma-defined:** table (header 34, rows 28, cells Medium 12 at drawn x), row states (New teal 15%, Ungrouped amber 15%, Unallocated #242432, group parent open #242428 + child block), toolbar row, Deleted trades, file list, Reports, new-trade insertion animation (5.0 s loop, 10% highlight). **EXTENDED:** row hover, header sort/filter glyph placement, empty state, skeleton.

## 8. Icons (`assets/`, node ids and colours in `MANIFEST.md`)
Never redraw. `<i class="icon icon-<file>">` = monochrome mask (colour = `color`), `<i class="asset asset-<file>">` = fixed colour, `<img src="assets/…">` for logos, `<i class="flag flag-au|jp|no|ph|us">` (5 flags exported; MasterFlag set is hidden in Figma). Logos: `logo-fxer-stacked-purple` (login 52x61.26 — non-uniform crop as drawn), `logo-fxer-stacked-black-32x40` (shell tile), horizontal / dark / mark variants.
**TODO (not exported, leave as marked TODOs, never hand-draw):** Blotters sidebar status glyph (2 icons, y936 #FFDC51 / y976 #707079), Prices-toggle 16x16 glyph, right-click menu glyphs (Copy Lucera Link ID / Copy Trade IDs / Status), separate plus-sign and small-search files.
Figma icon inconsistencies are catalogued in `assets/MANIFEST.md` (six chevron drawings, three X, three ticks, four download glyphs, misleading layer names).

## 9. Known Figma inconsistencies (decision in parentheses; full table in the showcase)
1. Library New/Add teal vs screens purple (purple = `.btn`; `.btn-teal` = library).
2. Outlined teal #30F0D6 (screens) vs #00FEA9 (library, Give-Up) (`--library`, `--giveup`).
3. Library input fill #39393C vs surface-aware screens (surface classes).
4. Cancel set: two variants named "Disabled"; #1 is hover.
5. With dropdown hover r4/gap 10 vs default r3/gap 8 (r3/8 kept, `--alt-geometry`); csv hover 30 high vs 24 (24 kept).
6. Switch: inverted knobs, "falce" typo, "Variant2", knob x17 vs x18, frame 80 fixed.
7. Trading Account 1280 vs 1440 vs 1920: breadcrumb links #A4A4FF@x16 vs #60A8FF@x24; panel 359 vs 424; divider x399 vs x488; detail x415 vs x512; card gap 16 vs 24; row dividers full width vs from x+24 (1280 built; `.split--alt-1440`, `.group-card--inset-divider`).
8. Two Add Permissions frames (5587 primary / 5580 alternate).
9. Dashboard older vs newer; logo cell 74x48 vs 72x56; Prices 911 high at y55 vs 8px grid (910 at y56).
10. Top bar avatar gap 16 vs 11 (Blotters); title Medium 20 @x24 vs Medium 16 @x20.
11. Activity right half measured 17px off the mirrored left half (left geometry reused); three Activity versions.
12. Rates header Medium 12 (dashboard) vs 14 (standalone).
13. New-row tint 15% (table) vs 10% (animation).
14. Tooltip shadow has two recipes (-1,2,4,0 @0.4 default; -2,2,4,1 @0.5 alt/popovers).
15. csv button uses Inter; Statics tabs mix Medium 14 and Regular 14; Assignment label Regular 13 and "(RBS EDGE BOA)" Regular 20 are outliers.
16. Drawn pixel drift (body y104 vs 105, auth cards not centred, change-password title 12.5px off-centre, Reports "Trade Types" order = visual estimate).

## 10. What NOT to do (the old system was wrong)
- **No Inter** (except the csv stray), no JetBrains Mono, no monospace for UI copy.
- **No lavender `#8080CC` primary.** The brand/primary is `#A4A4FF`, and button labels on it are **black**, never white.
- **No teal `#7AEFEF` as secondary.** Teal is `#30F0D6` (New/Add) and outlined teal `#30F0D6` / `#00FEA9`; neither is "the secondary brand colour".
- **No navy backgrounds** (`#0F0F1E`, `#101020`, `#1A1B2E`, `#1E2035`, `#252740`). The surfaces are #000000 / #171719 / #242428 / #39393C.
- **No 6px radius**, no 8px "cards" for fields/buttons (8 is widgets/popovers only), no shadows on modals or the login card.
- **No red "Forgot Password?" link** (purple underlined) and no red-tinted error styling beyond the 1px `#FF7272` stroke + message.
- **No uppercase 12px section labels** (sentence-case Medium 18 `#7373BB`).
- **No tinted passive badges** (tinted rgba fills for Group/Review badges); no amber `#F59E0B` / "Group badge".
- **No permissions table**; no footer 36px / sidebar 56-with-labels / nav 48px sizes of the old system (footer is 46, top bar 56, sidebar 56 icons only).
- No brand-glow focus rings (`0 0 0 3px rgba(...)`), no 0.15s animations on inputs: the only motion in Figma is the live pulse (1.071 s loop) and the new-trade insertion (5 s), both prototype-timed; focus is the EXTENDED 1px `#A4A4FF` ring.
- No light mode, no mobile breakpoints, no gradients, no hard-coded hex in component CSS, no invented icons.

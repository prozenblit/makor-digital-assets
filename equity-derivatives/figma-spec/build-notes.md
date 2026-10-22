# Equity Derivatives Auction - stage 1 build notes (handoff to stages 2 / 3)

Stage 1 wrote `tokens.json`, `tokens.css`, `components.css` (PART 1 only). `CLAUDE.md`, `components.md`, `showcase.html` are still the OLD wrong files - stage 3 replaces them. components.css ends with the PART 2 marker line; stage 2 appends below it.

## Token names
- Figma variables (23, group `figma` in tokens.json): `--color-<kebab figma name>` = `--color-bg`, `-bg-medium`, `-bg-lighter`, `-grey-dark`, `-grey-medium`, `-grey-light`, `-white`, `-blue`, `-blue-transparent-15`, `-blue-transparent-60` (the only alpha one, rgba .6), `-green`, `-green-dark`, `-red`, `-red-transparent`, `-red-error`, `-red-error-transparent`, `-orange`, `-orange-transparent`, `-yellow`, `-yellow-transparent`, `-blue-green`, `-blue-green-transparent`, `-purple`. Every "transparent" except `blue transparent 60` is an OPAQUE hex.
- Raw/unbound (group `raw`): `--color-equilibrium-chip-bg` (#B694FF@0.2, current), `--color-equilibrium-chip-bg-alt` (#A494FF@0.3, older), `--color-modal-scrim` (#18181C@0.5), `--color-segment-selected-bg` (#374A58), `--color-segment-selected-text` (#71E7FF), `--color-toggle-thumb-shadow` (#1D3C31@0.6), `--color-pure-white` (#FFFFFF, only on non-canonical Isaak page "LOGGED IN AS" - do not use).
- Semantic (CSS vars `--color-<group>-<token>`): surface (page, panel, inner, control, book, sidebar, modal, auth-card, zebra, tab-selected, scrim), border (rule=grey-dark, panel-rule=grey-medium, book-stroke, cell-selected/-error/-partial/-focus-well, tab-selected), text (primary, secondary, tertiary, placeholder, on-fill, link, title, accent, bid, ask, equilibrium, enter, modify, execution), action (primary=blue, accent=blue-green, confirm, danger, danger-soft, warning, warning-soft, neutral=white, ghost), disabled (fill, text), status (success[-bg], error[-bg], partial[-bg], info[-bg], time-left[-bg], starting[-bg], frozen[-bg], equilibrium-bg). Total 59 aliases (tokens.json holds resolved hex; tokens.css holds `var()` refs).
- EXTENDED: `--color-ext-hover` (white@0.1), `--color-ext-pressed` (white@0.2), `--color-ext-focus` (blue), `--color-ext-error` (red error).
- Type: `--font-primary` (Lato), `--font-size-12/14/16/18/20/24`, `--font-weight-regular:400`, `--line-height-auto:normal`, `--letter-spacing-none:0`.
- Spacing (observed): `--space-2/4/6/8/10/11/12/16/24/32/40/48/56`.
- Radii: `--radius-control 4`, `-card 8`, `-modal 12`, `-banner 6`, `-checkbox 2`, `-circle 16`, `-dot 24`, `-toggle-track 12`, `-scrollbar 12`, `-sidebar 0 24px 0 0`, `-tab 6px 6px 0 0`, `-modal-body-top`, `-segment-right 0 4px 4px 0`, `-input-well-bottom-left 0 0 0 8px`.
- Heights `--h-*`: control 32, control-tall 40, tab 40, tab-legacy 48, toast 30, icon-tile 24, icon-button 32, check 16, panel-header 56, table-title-row 40, table-row 33, table-row-statics 41, table-row-audit 38.
- Effects: `--shadow-toast` (-2 4 8 bg-medium), `--shadow-notification` (-2 4 8 bg), `--shadow-menu` (-2 4 6 bg), `--shadow-toggle-thumb` = `--shadow-status-dot`, `--blur-scrim: 12px`.
- Shell geometry `--layout-*`: sidebar-width 64, sidebar-width-legacy 80, header-rule-y 61, content-left 80, content-right 24, content-top 117, title-y 24, section-title-y 82, logo-x/y 12/20, nav-icon-x 20, avatar-x 16, frame 1440x1024, frame-wide 1920x1080.

## Class naming scheme (components.css PART 1)
BEM-ish, Figma component names. Forced states: `.is-hover .is-focus .is-active .is-disabled .is-error .is-selected .is-checked .is-filled .is-on`.
- Type: `.t-12 .. .t-24`, `.c-<figma colour>`, `.ta-l/r/c`, `.u`, role styles `.t-product-title .t-section-title .t-modal-title .t-body .t-secondary .t-tertiary .t-label .t-link .t-eq-label .t-bid .t-ask ...`.
- Icons: `.icon` + `.icon-<asset name>` (mask, currentColor; each class sets Figma colour/size); multi-colour assets as `.img-icon .img-<name>`; icon tiles `.icon-btn--minimize/--download`; row icons `.row-icon--remove/--add`; `.icon-action`.
- Controls: `.input` (+`__text` `__field` `__dots`; `--w184 --w236 --w400 --full --between`), `.search` (`__text __field`, `--w184`, `--icon-muted`), `.date` (`--w155`), `.dropdown` (`__text`), `.menu` / `.menu__item`, `.time` (`__text __value __unit __spinner __up __down`), `.check` (input or span; `.check-field`).
- Buttons: `.btn` + `--primary --accent --neutral --confirm --danger --outline-danger --outline-accent --outline-warning --ghost --h40 --w235`; `.btn-arrow` + `--danger --soft`; disabled via `:disabled`/`.is-disabled`.
- `.tabs/.tab` (`--w160`, `--alt-selected-square`, `--alt-legacy-48`), `.segmented/.segment`, `.toggle` (`__track __thumb __label`, `.is-on`), `.chip-time` (`--starting --frozen --ended`), `.chip-eq` (`--alt-a494ff`), `.toast`/`.tooltip` (`--success --error --partial`), `.cell--in-mix --partial --error --highlight --focus-well --well`, `.notification` (`--stack`, `__text __line--muted __actions`), `.modal-scrim` (`--beside-sidebar`), `.modal` (`--w448 --w720 --w916`, `__header __body __footer`), `.field/.field__label`, `.auth-card`, `.scrollbar`, `.scroll-y`.

## Figma-defined vs EXTENDED
Figma-defined: all geometry/fills/strokes listed above; check checked/unchecked; button default + disabled + all 10 role usages (plus soft-danger and ghost Upload File); button-with-arrow default/disabled/soft/soft-disabled; 4 chip states; both equilibrium fills; 3 toasts; both notification cards; scrim; modal surface/title/rule; scrollbar (drawn once); open Cancel menu; tabs selected/unselected; segmented; toggle on/off.
EXTENDED (marked in CSS): hover (white@0.1 overlay) and pressed (@0.2) on buttons/controls/tabs/segments/menu items/icon buttons; focus (1px INSIDE blue on controls, 1px blue outline offset 2 on buttons/check/toggle/icon buttons); error stroke on controls; disabled look for non-button controls; time spinner hit targets; `.input--full`; `.segment:first-child` unselected mirrored radius; `.scroll-y` functional scrollbar; `.menu__item` hit area; fallback font stack.

## Conflicts and decisions
- Equilibrium chip: #B694FF@0.2 (18 uses, canonical) default; #A494FF@0.3 (6, Trade Auction aggregate book) kept as `.chip-eq--alt-a494ff`.
- Tabs: radius 6/6/0/0 on both states (components.md, foundations); admin-auth says selected tab has no radius -> `.tab--alt-selected-square`. Height 40 canonical; 48 / 18px label in legacy 80px shell -> `.tab--alt-legacy-48`. "Clients" tab is 160 (min) -> `.tab--w160`.
- Sidebar 64 canonical; 80 legacy (tokens only; layout is stage 2).
- Frozen chip as drawn: label `red` (#FF6565) on `red error transparent` fill (#4E3234).
- Chevron: component uses currentColor chevron (path y4); table soft button is 1px lower in Figma -> `translateY(1px)` on `.btn-arrow--soft`. Danger/disabled chevron files with y5 path are not used (same icon, 1px offset).
- Blur: Figma 12 used as `blur(12px)`; admin-auth notes ~6px may look closer in CSS (inference) - stage 2/3 may revisit.
- Foundations calls the #1D3C31 glow "status dot"; components.md shows these are the toggle thumbs. Token `--shadow-toggle-thumb` with alias `--shadow-status-dot`.
- Variant3 button = identical to Default, not implemented. Hidden "Upload File" button (115:1919) implemented as `.btn--ghost` since components.md measured it.
- Figma copy typos to keep verbatim in showcase: "Bid should be lower that Ask", "exampple@email.com", screen names "Acution Freeze time"/"Acution Summary".
- Outline/inside strokes use `box-shadow: inset 0 0 0 1px` (computed `border` is 0). Fixed-size Figma frames (chips 197x40, toasts) are hug or fixed as noted in each rule; text hug widths differ from Figma by 1-5px (browser Lato metrics vs Figma), e.g. "New level..." notification renders 317 vs 322.
- Line-height: `normal` (browser 16.8 for 14px vs Figma box 17), so 2-line blocks are ~0.7px shorter than Figma (nt2 113.3 vs 114).

## Verification (stage 1)
Temporary test page in own browser tab (deleted). 158 computed-property checks, all exact where Figma gives a fixed number (heights 32/40/30, radii, fills, paddings, gaps, strokes, shadows, blur 12, mask icons, Lato 400 loaded); only hug widths deviate by 0.1-5px as above.

## Unresolved / for stage 2-3
- Layout patterns (sidebar, header, session card, instrument table, order book, audit log table, login composition, statics tables, modal forms) not built - stage 2.
- Toggle thumb positions are a visual estimate (Figma groups rotated -180).
- No Figma text styles; no hover/focus drawn anywhere; no tooltip pointer, dismiss, stacking rules for toasts.
- Audit-log download button measured only visually; `Aggregate Book` captions visual-only.

---

# STAGE 2 - layout patterns (components.css PART 2, lines ~582-982) - handoff to stage 3

PART 1 was NOT edited. Everything below is appended under the PART 2 marker. Source node ids are in a `/* figma: ... */` comment on every block (AS = auction-shell.md, AA = admin-auth.md, CM = components.md).

## Table-row convention (applies to .itable .mtable .stable .ctable)
A "row" is a fixed-height box whose TOP 1px is the grey-dark divider (`box-shadow: inset 0 1px 0 0`). This reproduces Figma's centred 1px strokes (y=40/73/106...) and puts the text centre at row-top+16.5 exactly. Vertical lines are absolutely positioned `<i class="*__vline *__vline--N">`. Cell text is centred on measured centres via `--cx` (itable) or grid tracks.

## Classes per pattern (HTML skeletons live in the stage-2 test page that was deleted; rebuild from this list)
- **App shell** `.app` (`--wide` 1920x1080, `--alt-legacy-80`), `.sidebar` (`__logo` + `.icon-makor-logo`, `__nav > __item(.is-active) > .icon-nav-*`, `__avatar` + `.icon-nav-profile`), `.app__title .app__rule .app__section-title .app__view-as(+__view-as-label) .app__actions .app__main(--split) .app__col .banner-slot`. AS 3, 189:1325, 189:1342, 189:1343.
- **Session card** `.session-card` (`--w795 --w855 --trade --client-1920 --alt-1440 --alt-top-68`), `__header __tile __title __name __type(--cash/--efp) __chip __action(--r12) __body __menu`. Chip = PART 1 `.chip-time`; Cancel = `.btn-arrow--danger`; menu = PART 1 `.menu`. AS 5, 189:650 / 273:704 / 1008:705 / 189:1105.
- **Instrument table / order books** `.itable` (`--w823 --agg --glob --frozen --h139 --h106`), `__title __name __minsize __title-end __head __row __c(--size1 --bid --size2 --ask --spread --add --client1 --trader1 --client2 --trader2, --l left-aligned, --ph placeholder) __vline(--273 --557 --763 --190 --363 --539 --173 --353) __icon(--x1 --x2 --add) __ov(--size-bid --size-ask --own-bid --own-ask --row2) __well(--size --bid --icon) __tip(--in-mix --error --partial) __matched(-label, -line --full/--partial/--none)`. State classes from PART 1 go on overlays: `.cell--in-mix/--error/--partial/--highlight/--focus-well/--well`. `.book-grid(__col __label)` for Trade Auction. AS 6/7, 273:572, 189:1110, 189:1258.
- **Orders confirmation banner / new-level notice** PART 1 `.notification(--stack)` placed in `.banner-slot`. 273:1155, 189:984.
- **Audit log** `.audit-panel(__header __title __tools __dates __date)`, `.audit(__head __body __row __cell(--center) __enter/__modify/__execution/__bid/__ask)`. Rows must sit in `.audit__body` (zebra = even children). 1008:813/826.
- **New Auction modal** `.modal.modal--w916.modal--auction` + absolute children `.na.na--name/--type/--table/--duration-label/--duration/--cancel/--start-in/--start-in-time/--start-now/--upload`; table `.mtable(__head __row __cell __vline--32/183/346/532/777)`. 115:1871/1872.
- **Login** `.login-page > .auth-card.auth-card--login` with `__logo __field--user __field--pass __forgot __submit`. 131:720/721.
- **Statics** `.statics-card(__tabs __panel __toolbar)` + `.stable(--clients --traders)(__head __row __c(--name --actions) __link(--users) __vline--188/391/591/869/1088/1176)`. 282:2059/1709.
- **Admin modals** `.modal-scrim(--admin --alt-legacy-80 --alt-1373 --centered --pair)`, `.form-grid(__full __check)`, `.modal--internal`, `.client-head`, `.client-panel(__title __search __empty)`, `.ctable(__head __row __c __vline--40/154/277/420)`, `.modal__toggle-row`. 138:499, 282:2309, 282:2442/2467, 170:810, 282:2620.

## EXTENDED in PART 2 (15 marked blocks)
sidebar nav hover/focus; banner stacking gap; row hover/selected (itable, audit, mtable, stable); `.stable__empty` empty state; `.skeleton` loading bar (static, no animation token); `.pager` pagination; `.icon-action--delete` (existing x-circle); `.auth-card__error` login error; `.field__error` field validation text; `.modal--confirm-delete` message. Everything derived from white@0.1 hover, blue-transparent-15 selected, existing greys/reds.

## Conflicts and decisions (all recorded; alternates are `--alt-*`)
1. **Instrument cards start y=72 (default) vs y=68** (EFP card, 1920 cards): `.session-card--alt-top-68`; 1920 variant bakes 68 in.
2. **Client Auctions 1920 canonical**, old 1440 kept as `.session-card--alt-1440` (rule grey medium vs grey dark, chip centred vs right, "Time Left:" colon, Cancel button, subtitle 12 vs 14).
3. **Legacy 80px shell** `.app--alt-legacy-80` (sidebar y-8, title 24, "Statics" 20, rule y57, card at (104,117) 1312x875, 16px table text; 48px tabs = PART 1 `.tab--alt-legacy-48`).
4. Statics card at **y=116** vs auction content y=117 (as measured). Tab-strip divider is 1312 long (24 short of card edge).
5. New Auction overlay is 1373 wide vs admin overlays 1376: `.modal-scrim--alt-1373`. Overlay offsets (1px/2px) reproduced in `--admin` / `--alt-legacy-80`.
6. Internal User modal height 417 reproduced (Cancel 40 at y353, primary 32 at y361).
7. Edit Client "Email Address" header at x481 vs New x505: `.ctable--alt-email-header-481`.
8. Equilibrium chip A494FF alt retained on aggregate books (`.chip-eq--alt-a494ff`).
9. Third 1920 card at y=530 vs 529 (gap 16/17): 16 used. Audit-log header: "gap 40" read as gap between the date pair and the download tile (ambiguous).
10. Statics columns: col1 text centre 86.5 and 869-1088 col 974.5 sit 7.5/4 px left of the column centre as measured (`--shift`). Modal table "Description" rows left-aligned at x565 (header centred 618).
11. Aggregate-book data cells are centred on the header centres (Figma uses hand-placed right-aligned boxes; up to 5px off: Size 232/Size2 400/Ask 467 in Figma vs 230/397/472); client/trader data left-aligned at the measured x.
12. Aggregate book column centres use Lato 14 text widths with the measured header left edges (box widths not in the spec).
13. Overlay blur kept at 12px (spec value).

## Verification (stage 2)
Temp page rendered 12 screens at spec size (Client Auctions 1440 with open menu/banner/tooltips/wells, Trade Auction, Client Auctions 1920 + audit log, freeze/summary 855 cards, New Auction modal, Login, Clients, External Traders, External Trader / Internal User modal pairs, New + Edit Client). 165 computed-property / bounding-box assertions vs spec numbers: all within 0.6px except hug widths (chip 149 vs 151, tabs 213 vs 211, buttons 120.5 vs 122, notice 316.6 vs 322 - Lato metrics, same as stage 1). Compared against Figma screenshots of 273:211 and 282:2059 (get_screenshot): layout, dividers, chips, tables, banner, menu and tab strip coincide. Page deleted.

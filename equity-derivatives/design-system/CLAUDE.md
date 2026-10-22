# Equity Derivatives Auction - Design System (agent brief)

Rebuilt from the Figma harvest. Every value below is backed by `../figma-spec/*.md` (foundations.md, components.md, auction-shell.md, admin-auth.md) or `assets/MANIFEST.md`. Where Figma is silent the rule is tagged **EXTENDED** (derived only from existing tokens). Do not invent, round, or "improve" values. If something is not here, check the spec files, then ask - do not guess.

Companion files (load them): `tokens.css` / `tokens.json` (colours, type, spacing, radii, heights, shadows, layout), `components.css` (all classes, every rule block cites its Figma node ids), `components.md` (copy-paste HTML + behaviour JS + Extended table), `showcase.html` (live reference: foundations, every component with states, 14 re-assembled screens), `assets/` (icons + `MANIFEST.md`). Verification record: `../figma-spec/VERIFICATION.md`; build history: `../figma-spec/build-notes.md`.

## 1. What the platform is

A dark-mode, desktop institutional web platform for **timed equity-derivatives auctions** (session types **Cash Close** and **EFP**). Traders enter size / bid / ask per instrument (e.g. FTSE 100 IDX FUT Sep25, CAC40, EURO STOXX 50 Sep25 CC) and see an **Equilibrium Price**, countdown chips, an order book and an audit log. An admin area (**Statics**) manages Clients, External Traders and (tab only) Internal Users.

Screens in Figma (all frames are 1440x1024, except one 1920x1080): Log In; Trade Auction (aggregate + global order book); New Auction modal; Client Auctions (older 1440 and newer 1920 with Audit Log); New level added + partial fill; Freeze time; Summary; Clients list; External Traders list; New / Edit External Trader modals; New / Edit Internal User modals; New / Edit Client modals. Only 1440x1024 and 1920x1080 exist: **no responsive or mobile design, no light theme** (foundations 6).

## 2. Source of truth and owner decisions

- Figma file **`vtP9aj7XLJ292TjETXmrum`**. **Canonical: page "final" (`48:1021`), SECTION "Section2" (`1033:172`)** (2411 nodes). Real components live on page **"drafts"** (`0:1`): text input 76:274, search 134:218, date 1001:744, dropdown 115:702, time 85:94, check set 85:128, button set 134:904, button with arrow set 134:907, Table Header 1001:283. Drafts screens are obsolete iterations; Section2 supersedes them for screens.
- Page **"page for Isaak"** (`738:152`) = four client-specific screen copies that add a **"LOGGED IN AS: BANK OF OG"** (and "BANK OF MAKOR") label in raw pure white `#FFFFFF`. It is NOT part of Section2 and is NOT built. **Owner decision (2026-10-14): leave it out of the design system.**
- Figma has 23 colour variables only (collection "Collection 1", one mode). No text styles, effect styles, paint styles, spacing or radius variables; those are literals, tokenised here.
- Rules of this rebuild (owner, audit/BUILD_RULES.md): values that exist in Figma are reproduced exactly (no rounding / merging of near-equal values); where Figma is silent we EXTEND and mark it; where Figma conflicts with itself the canonical version is used and the alternative is kept as an `--alt-*` class/token and listed in section 11.

## 3. Non-negotiables (each proven by the spec)

1. **Font: Lato Regular (400) ONLY.** 1111 of 1114 text nodes are Lato Regular, the other 3 are mixed-size segments that are still Regular. No Bold / Medium / SemiBold anywhere. Do not synthesise bold. (`h1..h6, b, strong, th` are reset to 400 in components.css.)
2. **Page background `#18181C`** (variable `bg`) on every frame. Panels `#2D2E3B` (bg lighter), inner blocks / tables `#22222C` (bg medium). Dark only.
3. **Primary action blue `#7590FF`** (variable `blue`): Log In fill, product title, links, active tab, checked check, ENTER. Secondary accent **blue-green `#71E7FF`** (Add New / Save Changes fill, New Auction outline). There is **no teal `#7AEFEF`**.
4. **Confirm / success = green `#3FF3C0`**; **danger / cancel = red `#FF6565`**; validation = **red error `#FF7553`**; warning / starting = orange `#FF982A`; partial = yellow `#FFCE53`; equilibrium / EFP / EXECUTION = purple `#B694FF`.
5. **Controls are 32px high, fill grey dark `#373746`, NO border, radius 4**, Lato 14, padding 10/12. Outliers at 40px exist only as one-off overrides (Add New 122x40, Cancel 106x40, soft table Cancel 112x40, Equilibrium chip 197x40, Upload File 152x40) and tabs are 40.
6. **Radii: 4 controls / 8 cards, tables, modals / 12 Log In card / 6 notification cards and tab tops / 2 checkbox / 24 sidebar top-right.** No other radii.
7. **No shadows except**: toasts (`-2 4 8` bg medium), notification cards (`-2 4 8` bg), the open Cancel menu (`-2 4 6` bg), toggle thumb. **Cards, panels, modals and inputs have no shadow and no stroke.** No gradients, no opacity on nodes (dimming is done with the `*transparent*` colour variables).
8. **1px strokes are drawn INSIDE** (outline buttons, cell states, chips, tab underline): use `box-shadow: inset 0 0 0 1px <colour>`, never a layout-shifting border.
9. **Line height AUTO (`normal`), letter spacing 0, no text-transform.** Underline only on links / linked IDs / linked counts.
10. **Icon-only sidebar** (no labels, no active pill); no breadcrumbs, no tabs on the auction screens; modals have **no close X and no shadow**.
11. **Table rows: 1px grey dark dividers, no zebra** on order/instrument tables. Zebra exists only on the Audit Log (even rows `#2D2E3B`).

## 4. Tokens

Use CSS custom properties from `tokens.css`; never write raw hex in rules. Names follow Figma (`--color-<figma-name-kebab>`); semantic aliases (`--color-text-primary`, `--color-action-confirm`, ...) are for picking by role.

### 4.1 Figma variables (23, exact)

| Figma name | CSS var | Hex | Role |
|---|---|---|---|
| bg | `--color-bg` | `#18181C` | page; global order book; label ON filled buttons |
| bg medium | `--color-bg-medium` | `#22222C` | inner blocks, tables, login card, statics panel, audit body |
| bg lighter | `--color-bg-lighter` | `#2D2E3B` | panels / session cards, sidebar, modals, notification cards, audit header, zebra |
| grey dark | `--color-grey-dark` | `#373746` | control fill, 1px rules / dividers, cancel-menu fill, unchecked check |
| grey medium | `--color-grey-medium` | `#5B5D72` | placeholder, column headers, secondary text, DISABLED button fill, modal title rule, panel-header rule |
| grey light | `--color-grey-light` | `#9597AD` | tertiary labels, inactive icons / nav, DISABLED button text, dropdown chevron, unselected tab |
| white | `--color-white` | `#F8F7FF` | primary text, active nav icon, neutral "Cancel" button fill, toggle thumb |
| blue | `--color-blue` | `#7590FF` | primary action, titles, links, active tab, ENTER, icon strokes |
| blue transparent 15 | `--color-blue-transparent-15` | `#383D58` | OPAQUE. selected tab, Time Left chip, minimize / download tile, Upload File |
| blue transparent 60 | `--color-blue-transparent-60` | `rgba(117,144,255,.6)` | the only real alpha variable: logo, focused order-input stroke |
| green | `--color-green` | `#3FF3C0` | confirm / success, BID, selected-cell stroke, active toggle |
| green dark | `--color-green-dark` | `#264142` | OPAQUE. "In the mix" toast bg |
| red | `--color-red` | `#FF6565` | danger / cancel, ASK, row remove icon, Reject outline |
| red transparent | `--color-red-transparent` | `#432C35` | OPAQUE. soft "Cancel v" table button |
| red error | `--color-red-error` | `#FF7553` | validation stroke, toast text + icon |
| red error transparent | `--color-red-error-transparent` | `#4E3234` | OPAQUE. validation toast bg; frozen Time Left chip |
| orange | `--color-orange` | `#FF982A` | Starting in, MODIFY, Start In, edit icon |
| orange transparent | `--color-orange-transparent` | `#4C3E3D` | OPAQUE. Starting-in chip, Start In button |
| yellow | `--color-yellow` | `#FFCE53` | partial-fill stroke / text / icon |
| yellow transparent | `--color-yellow-transparent` | `#4E4134` | OPAQUE. partial toast bg |
| blue-green | `--color-blue-green` | `#71E7FF` | Add New / Save Changes, New Auction outline, "Cash Close", notice text |
| blue-green transparent | `--color-blue-green-transparent` | `#374A58` | OPAQUE. new-level row highlight |
| purple | `--color-purple` | `#B694FF` | Equilibrium label, EFP tag, EXECUTION |

Raw (unbound) colours in Figma, tokenised by role: `--color-equilibrium-chip-bg` `#B694FF@0.2` (18 uses, canonical), `--color-equilibrium-chip-bg-alt` `#A494FF@0.3` (6 uses, ALT), `--color-modal-scrim` `#18181C@0.5`, `--color-segment-selected-bg` `#374A58`, `--color-segment-selected-text` `#71E7FF`, `--color-toggle-thumb-shadow` `#1D3C31@0.6`, `--color-pure-white` `#FFFFFF` (Isaak label only - never use).

### 4.2 Semantic aliases (59, all in tokens.css)

| Group | Aliases -> variable |
|---|---|
| surface | `page`=bg, `panel`=bg lighter, `inner`=bg medium, `control`=grey dark, `book`=bg, `sidebar`=bg lighter, `modal`=bg lighter, `auth-card`=bg medium, `zebra`=bg lighter, `tab-selected`=blue transparent 15, `scrim`=modal-scrim |
| border | `rule`=grey dark (1px dividers), `panel-rule`=grey medium, `book-stroke`=grey medium, `cell-selected`=green, `cell-error`=red error, `cell-partial`=yellow, `cell-focus-well`=blue transparent 60, `tab-selected`=blue |
| text | `primary`=white, `secondary`=grey medium, `tertiary`=grey light, `placeholder`=grey medium, `on-fill`=bg, `link`=blue, `title`=blue, `accent`=blue-green, `bid`=green, `ask`=red, `equilibrium`=purple, `enter`=blue, `modify`=orange, `execution`=purple |
| action | `primary`=blue, `accent`=blue-green, `confirm`=green, `danger`=red, `danger-soft`=red transparent, `warning`=orange, `warning-soft`=orange transparent, `neutral`=white, `ghost`=blue transparent 15 |
| disabled | `fill`=grey medium, `text`=grey light |
| status | `success`/`-bg`=green / green dark, `error`/`-bg`=red error / red error transparent, `partial`/`-bg`=yellow / yellow transparent, `info`/`-bg`=blue-green / blue-green transparent, `time-left`/`-bg`=blue / blue transparent 15, `starting`/`-bg`=orange / orange transparent, `frozen`/`-bg`=red / red error transparent, `equilibrium-bg`=raw chip |

**EXTENDED colours** (not in Figma): `--color-ext-hover` (white @0.1), `--color-ext-pressed` (white @0.2), `--color-ext-focus` (blue), `--color-ext-error` (red error).

Other token groups: `--space-*` (observed), `--radius-*`, `--h-*` (heights), `--shadow-*`, `--blur-scrim`, `--layout-*`.

## 5. Typography

Lato Regular, `--font-primary` (`'Lato', system-ui, ...` - the fallback stack is EXTENDED). Load: `https://fonts.googleapis.com/css2?family=Lato:wght@400&display=swap`.

| Size | Token | Use (counts in Section2) |
|---|---|---|
| 12 | `--font-size-12` | audit-log table, modal field labels, "min size: N", type sub-label, toasts, BID/ASK/ENTER/MODIFY (174) |
| **14** | `--font-size-14` | **base**: body, cells, buttons, controls, chips, tabs, notices (845) |
| 16 | `--font-size-16` | section title "Auctions" / "Statics", "Audit Log", Upload File (66) |
| 18 | `--font-size-18` | modal titles; legacy-shell tabs (11) |
| 20 | `--font-size-20` | product title (blue) (13) |
| 24 | `--font-size-24` | modal-screen title in the legacy 80px shell (2) |

Colour roles: primary text white; secondary (headers, placeholders) grey medium; tertiary (labels) grey light; titles / links / active blue. Placeholder = grey medium, entered value = white. Utilities in components.css: `.t-12 ... .t-24`, `.c-<figma colour>`, role styles (`.t-product-title`, `.t-section-title`, `.t-label`, `.t-bid`, ...). 1920 tables use 12px, 1440 tables 14px; older drafts and the legacy shell use 16px.

## 6. Controls and sizing (Figma-defined unless tagged)

- **Shared control box**: height 32, radius 4, fill grey dark, no stroke/shadow, padding T10 R12 B10 L12, H auto-layout, text 14. Widths are always FIXED in Figma: text input 235 / 184 / 236 (password) / 400; search 235 / 184; date 235 (155 in the Audit Log); dropdown hugs (112 default, 117 "Myself", gap 40); time hugs (106; padding R8, gap 12).
- **Button**: 32px, radius 4, padding 6/32, gap 10, hug width, label **bg `#18181C`** on every filled role. The component has NO fill: role = per-instance override.
  - primary (blue) Log In (235 wide); accent (blue-green) Save Changes / Add New; neutral (white) modal Cancel; confirm (green) Confirm / Start Now; danger (red) Cancel Auction; outline-danger Reject; outline-accent New Auction; outline-warning (orange on orange transparent) Start In; ghost (blue transparent 15, 16px, 40 high) Upload File (hidden in Figma).
  - disabled = grey medium fill + grey light label (overrides the role).
  - Variant3 (261:1922) is identical to Default and is NOT implemented.
- **Button with arrow**: 32px, padding 6/12/6/24, gap 8, 12x12 chevron (stroke 1 = label colour). Session Cancel = red. In-table "Cancel v" is a separate 112x40 custom frame, radius 0, fill red transparent, text + chevron red (`.btn-arrow--soft`); disabled = grey dark fill + grey medium text.
- **Check** 16x16 radius 2: unchecked grey dark, checked blue + grey dark 2px tick. "Admin" label 12px right: grey light / white.
- **Tabs** 40 high, padding 12/56, top radius 6; selected = blue transparent 15 + 1px blue INSIDE bottom stroke + blue text; unselected = no fill + grey light text. **Segmented** Cash Close | EFP 336x32.
- **Toggle** 32x16, radius 12; off = grey light track + grey light label; on = green track + white label; thumb 12x12 white with `#1D3C31@0.6` shadow (positions are a visual estimate).
- **Chips**: Time chip 32px, radius 4, states running (blue on blue transparent 15) / starting (orange on orange transparent) / frozen (label red on red error transparent) / ended (no fill, 1px red inside stroke); value white. Equilibrium chip 197x40, no radius, label purple, value white, fill `#B694FF@0.2`.
- **Toast / tooltip chips** 30px, radius 4, padding 8/12, gap 8, Lato 12, shadow: success (green on green dark), validation (red error on red error transparent), partial (yellow on yellow transparent). No pointer nub, no close.
- **Cell states** (1px INSIDE, radius 0): in the mix = green; partial = yellow; error = red error; new-level row = blue-green transparent fill; focused size well = bg fill + blue @0.6 stroke + radius BL 8.
- **Notification cards** radius 6, fill bg lighter, shadow: "New level ..." 322x41 blue-green text; "Orders placed" 328x114 with Reject (outline red) + Confirm (green).
- **Modal** fill bg lighter, radius 8, no shadow / stroke, title 18 white centred (y16), 1px grey medium rule at y54, body inset 24, label 12 grey light + control (8px gap, 78px row pitch), footer Cancel (white) left / primary right. **Scrim** = `#18181C@0.5` + blur 12, starts right of the 64px sidebar.
- **Scrollbar** 4px, track grey dark, thumb grey medium, radius 12 (drawn once).
- **Row heights**: instrument table title 40, header + body rows 33 (1px divider); statics rows 41; audit rows 38 (header 39); modal tables 33.

## 7. Components (class names follow Figma names)

| Component | Classes | Status |
|---|---|---|
| text input, search, date, dropdown, time | `.input .search .date .dropdown .time` (+ `__field __text`, `--w184 --w236 --w400`, `.search--icon-muted`) | Figma-defined; states hover / focus / error / disabled **EXTENDED** |
| open Cancel menu | `.menu .menu__item` | Figma-defined (189:819); item hover / selected **EXTENDED**; open / close JS **EXTENDED** |
| check, check-field | `.check .check-field` | Figma-defined; hover / focus / disabled **EXTENDED** |
| buttons | `.btn` + `--primary --accent --neutral --confirm --danger --outline-danger --outline-accent --outline-warning --ghost --h40 --w235` | Figma-defined; hover / pressed / focus **EXTENDED** |
| button with arrow | `.btn-arrow` + `--danger --soft` | Figma-defined |
| icon buttons / row actions | `.icon-btn--minimize --download`, `.icon-action` | Figma-defined; `.icon-action--delete` **EXTENDED** |
| tabs, segmented, toggle | `.tabs .tab`, `.segmented .segment`, `.toggle` | Figma-defined (drawn as frames); alternates `--alt-*` |
| chips | `.chip-time (--starting --frozen --ended)`, `.chip-eq (--alt-a494ff)` | Figma-defined; countdown thresholds **EXTENDED** |
| toast / tooltip | `.toast .tooltip` + `--success --error --partial` | Figma-defined |
| cell states | `.cell--in-mix --partial --error --highlight --focus-well --well` | Figma-defined |
| notification cards | `.notification (--stack)`, `.banner-slot` | Figma-defined; banner stacking gap **EXTENDED** |
| modal, scrim, field | `.modal (--w448 --w720 --w916)`, `.modal-scrim`, `.field .field__label` | Figma-defined; `.field__error`, `.modal--confirm-delete` **EXTENDED** |
| app shell | `.app (--wide --alt-legacy-80)`, `.sidebar`, `.app__title .app__rule .app__section-title .app__view-as .app__actions .app__main` | Figma-defined; nav hover / focus **EXTENDED** |
| session card | `.session-card` (`--trade --client-1920 --alt-1440 --alt-top-68 --w855`) | Figma-defined |
| instrument table / order books | `.itable` (`--w823 --agg --glob --frozen`), `.book-grid` | Figma-defined; row hover / selected **EXTENDED** |
| audit log | `.audit-panel .audit` | Figma-defined; row hover / selected **EXTENDED** |
| New Auction modal | `.modal--auction .na--* .mtable` | Figma-defined |
| login | `.login-page .auth-card--login` | Figma-defined; `.auth-card__error` **EXTENDED** |
| statics lists | `.statics-card .stable .tabs` | Figma-defined; `.stable__empty`, `.skeleton`, `.pager`, `.client-panel__empty` **EXTENDED** |
| admin modals | `.form-grid .modal--internal .client-head .client-panel .ctable`, `.modal-scrim--admin --pair --centered` | Figma-defined |
| scrollbar | `.scrollbar` | Figma-defined; `.scroll-y` **EXTENDED** |

Forced states for demos: `.is-hover .is-focus .is-active .is-disabled .is-error .is-selected .is-checked .is-filled .is-on`. **EXTENDED recipes** (all derived, never new hues): hover = white `#F8F7FF` @0.1 overlay on the existing fill, pressed = @0.2, focus = 1px INSIDE blue (controls) or 1px blue outline offset 2 (buttons), error = 1px INSIDE red error, disabled controls = placeholder-colour text, row selected = blue transparent 15. Full list in `components.md` ("Extended table").

Behaviour (from the spec, wiring is ours): Bid must be lower than Ask - otherwise the Size|Ask cell gets the red error stroke and the error toast appears (text "Bid should be lower that Ask", verbatim). "In the mix" = green stroke + success toast; partial fill = yellow stroke + toast. Cancel dropdown offers "All Bid / All Ask / All". Time stepper step and countdown thresholds are not defined in Figma (`components.md` snippets are EXTENDED).

## 8. Layout / shell geometry

- Frames **1440x1024** (Trade Auction, Client Auctions old, lever / freeze / summary, Log In, Statics, modals) and **1920x1080** (Client Auctions newer).
- **Sidebar** 64 x full height, fill bg lighter, radius `0 24 0 0`, no right border; logo 40x32 at (12,20) in blue @0.6; nav icons 24x24 at x=20, y=92 (Auctions) and y=148 (Statics), pitch 56, active = white, idle = grey light; avatar 32x32 at (16, H-64). (Legacy shell on the New / Edit Client backgrounds: 80px, `.app--alt-legacy-80`.)
- **Header**: title "Equity Derivatives Auction" 20 blue at (80,24); rule 1px grey dark at y=61 from x=80 to W-24; section title 16 white at (80,82) ("Auctions" / "Statics"). Left margin 80 (64 + 16), right margin 24, first content row y=117 (statics card y=116). "View as:" label + dropdown right-aligned (right edge 1416, y=13); "New Auction" outline button right edge 1416, y=73; banners at y=77, right edge 1416.
- **Session card**: fill bg lighter, radius 8, header 56 + 1px rule (grey medium on 1440, grey dark on 1920), minimize tile (16,16), title group (60,12) = name 14 white over type 12 (Cash Close blue-green / EFP purple), Time chip y=12 (centred on 1440, right on 1920), Cancel 98x32 at right 16 (Trade: Cancel Auction 157x32 at right 12). Body padding 16: instrument tables at y=72 (68 on EFP / 1920 cards), gap 8. Widths 795 / 855 / 1336.
- **Instrument table**: bg medium, radius 8, W = card - 32 (763 / 823); title row 40 (name + "min size" + Equilibrium chip + soft Cancel flush right), header row 33, data rows 33, vertical dividers at x=273 / 557 (+763); row-cancel x-circle after Bid / Ask, add-level plus on the last row of 823-wide tables.
- **Trade Auction**: card 1336x682; aggregate tables (839 wide, bg medium, chip `#A494FF@0.3`) at x=16, global tables (457 wide, bg `#18181C`) at x=863; y=97 / 314 / 465 (heights 205 / 139 / 205), 8px column gap, 12px row gap.
- **Audit Log** (1920): panel 998x741 at (898,117): header 56 (From / To date 155 + 32px download tile), table header 39, rows 38, text 12, zebra on even rows.
- **Log In**: no sidebar / header; card 312x416 centred, bg medium, radius 12; logo 70x56, username 235x32, password 236x32 (10 dots + eye), "Forgot Password?" blue underlined, Log In 235x32.
- **Statics**: card (80,116) 1336x892: tab strip 40 (Clients 160 / External Traders 211 / Internal Users 198), content panel bg lighter with search + Add New, table 1312x796 (header 41, rows 41, vertical lines). **Modals**: External Trader / Internal User 448 wide (409 / 417 high), Client 720x584, New Auction 916x410.

## 9. Icons

All icons are raw Figma SVG exports in `assets/` (see `assets/MANIFEST.md`); **never redraw or hand-write paths**. Monochrome icons use the mask recipe (`.icon` + `.icon-<name>`, colour = `currentColor`, size and Figma colour set by the class); multi-colour assets and logos are used as `<img>` or `.img-*` background images.

Exported: makor-logo (40x32), makor-logo-login (70x56), nav-auctions / nav-statics (24, + `.active` variants), nav-profile (32), eye, checkbox-checked / -unchecked, status-active-check (16), edit-square-pen (24, orange), rotate-ccw-key (24, blue), search (16, blue, stroke 1.5), calendar (16, blue, stroke 1.3), minimize-button (24 tile), download-button (32 tile), chevron-down (12), dropdown-chevron (11x6), time-spinner-arrows (10x24), arrow-big-down, status-x-circle / plus-circle / check-circle / warning / partial-fill, file-up, clock.drafts (drafts only). **Not present**: bell, trash / delete, standalone key, canonical clock, flags, instrument icons, illustrations. Stroke weights differ per icon (1 / 1.3 / 1.5): do not normalise.

## 10. Writing HTML / CSS here

1. Link `tokens.css` then `components.css`; load Lato 400.
2. Use only classes from `components.css`; check `components.md` first. New CSS only for genuinely new layout, using `var(--...)` tokens (no raw hex).
3. Keep Figma sizing semantics: fixed vs hug widths as listed above; heights exact.
4. When you must add a state or component Figma does not draw: derive from existing tokens, mark it `/* EXTENDED - not in Figma: <derivation> */`, add it to the Extended table in `components.md`.

## 11. Known Figma inconsistencies (full table in `showcase.html`)

Alternates are kept, not dropped: Equilibrium chip `#A494FF@0.3` vs `#B694FF@0.2` (`.chip-eq--alt-a494ff`); selected tab with / without radius (`.tab--alt-selected-square`); tab height 40 vs 48 (`.tab--alt-legacy-48`); sidebar 64 vs 80 (`.app--alt-legacy-80`); instrument cards y=72 vs 68 (`.session-card--alt-top-68`); Client Auctions 1440 vs 1920 (`.session-card--alt-1440`); New Auction overlay 1373 vs 1376 (`.modal-scrim--alt-1373`); Edit Client email header x481 vs x505 (`.ctable--alt-email-header-481`). Other: frozen chip label red on red-error-transparent fill; chevron y4 vs y5 files; scrim blur 12 (Figma) vs ~6 (inference, not used); "status dot" glow = toggle thumb; Internal User modal height 417 (Cancel 40 tall, primary 8px lower); Statics card y=116 vs 117; aggregate-book numbers hand-placed (we centre on headers); no Internal Users list (tab only); frame 282:2180 is a modal pair, not a second list; third 1920 card y=530 (gap 16/17).

**Figma copy typos reproduced verbatim**: "Bid should be lower that Ask", "exampple@email.com", screen names "Acution Freeze time" / "Acution Summary". Do not silently fix them in shipped copy without owner approval.

## 12. What NOT to do (the previous system was wrong)

- Do NOT use **Inter** (or any font but Lato Regular), or any **bold / 500 / 600 / 700** weight.
- Do NOT use **teal `#7AEFEF`**, "brand-ghost" tints, or any teal as the brand colour: the primary is blue `#7590FF`, the secondary accent blue-green `#71E7FF`.
- Do NOT use **navy `#151729` / `#1E2035` / `#252740` / `#0F1123`** or the old greys: the surfaces are `#18181C`, `#22222C`, `#2D2E3B`, controls `#373746`.
- Do NOT use **coral `#E57373`** for Cancel / Reject (it is red `#FF6565`), amber `#F59E0B`, green `#4DCC9B`, or `#EF4444`.
- Do NOT use **6px / 10px radii** (it is 4 / 8 / 12 / 6 / 2) or 1px borders on inputs, cards and modals (controls are borderless, cards have no stroke).
- Do NOT add **shadows** to cards / panels / modals / dropdown buttons, **gradients**, glows on focus, `uppercase` column headers, tracked letter-spacing, `tabular-nums` bold, or transitions that Figma does not imply.
- Do NOT make inputs 36 / 40px or buttons 36px (controls are 32), a 56px sidebar with 40px icon buttons (sidebar 64, icons 24 bare), a 52px top header bar with breadcrumbs (there is none), or a 40x22 toggle (32x16).
- Do NOT use `#FFFFFF` for text (primary text is `#F8F7FF`), and do NOT add the "LOGGED IN AS" label (owner decided 2026-10-14 to leave it out).
- Do NOT add responsive breakpoints, light mode, Tailwind / frameworks, or new colours / radii / fonts. Do NOT redraw icons.
- Do NOT edit `tokens.*` / `components.css` casually: every value traces to a Figma node id; change them only with a spec reference.

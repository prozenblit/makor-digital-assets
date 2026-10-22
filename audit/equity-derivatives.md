# Equity Derivatives Auction — Design System vs Figma audit

Figma file: `vtP9aj7XLJ292TjETXmrum`. Screens read: "final" page 48:1021 (Log In, New Client, Edit Client, Trade Auction, Client Auctions, External Traders x2, Internal User, Clients, New lever added + partial fill, Auction Freeze time, Auction Summary, New Auction) plus the component definitions on the **"drafts" page (0:1)**.
Ours: `equity-derivatives/design-system/` showcase measured in the browser with `getComputedStyle` (own tab).

Method notes
- The "final" page has 0 component definitions, but its instances point at components that live on the **drafts** page: `text input`, `search`, `date`, `dropdown`, `time`, `check` (checked/unchecked), `button` (Default / Variant3 / disabled), `button with arrow` (Default / disabled), `Table Header (Component)`. All specs below for these were read from those definitions or their instances.
- Everything else (session card, chips, modals, tables, sidebar) is not componentised in Figma. Specs are read from node properties on the final screens.
- Our modal and order-notification are `display:none` in the showcase until triggered, so their sizes read 0. For those I use the computed colour/radius/padding/shadow values, which are valid, and the CSS.
- Our showcase font reads "Inter" but the Google Fonts file was `unloaded` in my sandbox. The declared font-family is what is measured, not the rendered glyphs.
- Browser DPR was 1.5, so 1px borders read 0.667px. They are 1px in CSS.

---

## 1. Summary

| | |
|---|---|
| Showcase sections reviewed | 18 (all sidebar entries: 3 foundation + 15 component sections) |
| MATCH | **0** |
| WRONG | **16** (3 foundation + 13 components) |
| MISSING IN OURS (Figma patterns with no counterpart) | **15** distinct patterns (section 3) |
| NOT IN FIGMA (invented) | **2 whole sections** (Cards, Pagination) + 6 invented sub-elements |
| **Score** | **10 / 100** |

Why 10 and not 0: the component inventory is conceptually right. A session card with instrument blocks, a cancel dropdown with All Bid / All Ask / All, an order notification with Reject and Confirm, modals, toggles, checkboxes and an admin table all exist in Figma. But every colour, font, radius and height is wrong, so an agent following this system would build a visibly different product. Zero of 23 Figma colour variables appear in our tokens.

The most damaging finding: **our brand colour is wrong.** Figma's brand/primary is blue `#7590FF` (header title, links, logo, checkbox, selected tab, "Time Left" label, Log In button). The teal `#7AEFEF` we call "brand" does not exist in Figma. The nearest colour is `#71E7FF` (blue-green), used only for a few secondary actions (Add New, Save Changes, New Auction outline, Cash Close text, "new level" toast text). The confirm/positive colour in Figma is green `#3FF3C0`, not teal.

---

## 2. Foundation mismatches

| Property | Figma | Ours | Verdict |
|---|---|---|---|
| Font family | **Lato** Regular everywhere (all text nodes read were Lato Regular) | Inter, weights 400/500/600/700 | WRONG |
| Font weights | Only Regular (400). No bold/semibold in any node read, including titles, buttons and badges | Buttons 600, instrument names 700, session name 700, modal title 700, badges 600 | WRONG |
| Base size | 14 (tables, buttons, inputs, tab text, menu items) | 14 | MATCH |
| Other sizes | 12 (labels, min size, type label, chips, tooltips), 16 (page title "Auctions"/"Statics", Upload File), 18 (modal title), 20 (app title) | 10, 12, 13, 14, 16, 18, 22, 24, 32. Uses 13 (not in Figma) and 20/24 modal titles | PARTIAL |
| Page bg | `#18181C` (bg) | `#151729` | WRONG |
| Surface 1 (cards, sidebar, modals, panels) | `#2D2E3B` (bg lighter) | `#1E2035` card, `#252740` modal, `#0F1123` sidebar (3 surfaces, none match) | WRONG |
| Surface 2 (instrument blocks, table body) | `#22222C` (bg medium) | none | MISSING |
| Control fill (inputs, dropdown, search) | `#373746` (grey dark), no border | `#1A1B2E` + 1px `#2D2F4A` border | WRONG |
| Borders/dividers | `#373746` 1px (header rule, table lines); `#5B5D72` modal title rule | `#2D2F4A` | WRONG |
| Text primary | `#F8F7FF` | `#F0F0F8` | WRONG (close) |
| Text secondary | `#9597AD` (labels, min size, "View as", Admin label) | `#8B8EA8` | WRONG (close) |
| Text tertiary | `#5B5D72` (table headers, placeholders) | `#5A5C70` | WRONG (close) |
| Primary / brand | **blue `#7590FF`** (title, links, logo @60%, checkbox, Log In) with tint `#383D58` (selected tab, Time Left chip, collapse icon) | teal `#7AEFEF` | WRONG |
| Positive / confirm | **green `#3FF3C0`** (Confirm, Start Now, in-the-mix, active check, toggle on) with tint `#264142` | `#4DCC9B` badge only; Confirm is teal | WRONG |
| Secondary action | blue-green `#71E7FF` (Add New, Save Changes, Cash Close, New Auction outline) with tint `#374A58` | not present (teal is used for primary) | MISSING |
| Danger / cancel | red `#FF6565`, tint `#432C35` | coral `#E57373`, hover `#EF5350` | WRONG |
| Error / validation | `#FF7553` (red-orange), tint `#4E3234` | `#EF4444` | WRONG |
| Warning / timer | orange `#FF982A`, tint `#4C3E3D` (Starting in, Start In, partial-fill text) | amber `#F59E0B`; used for Time Left, which in Figma is blue | WRONG |
| Partial fill | yellow `#FFCE53`, tint `#4E4134` | none | MISSING |
| Equilibrium price | purple `#B694FF` over `#B694FF`@20% (also `#A494FF`@30% on Trade Auction) | teal text | WRONG |
| Corner radius | **4** controls/buttons/chips/tabs; **8** cards, panels, modals; 6 notification toasts; 12 login card; 2 checkbox; 12 toggle track; sidebar top-right 24 | 6 buttons/inputs, 8 cards, 10 modals/notifications, 4 badges/checkbox, 999 pills | WRONG |
| Control height | **32** (buttons, inputs, search, dropdown, Time Left chip); 40 for instrument header chips / row cancel button / tabs | 36 buttons + inline inputs, 40 modal inputs, 28 badges, 24 chips | WRONG |
| Button padding | 6px 32px (button), 6/12/6/24 (button with arrow) | 0 16px | WRONG |
| Shadows | Drop shadow 6-8 blur, colour `#18181C`, on dropdown/notification/chips | rgba black 0.3-0.5 with 12-40 blur, plus a 3px focus ring | WRONG |
| Modal overlay | `#18181C`@50% + BACKGROUND_BLUR 12 | `rgba(0,0,0,.55)`, no `backdrop-filter` found in CSS | WRONG |
| Gradients | none | none | MATCH |
| Icons | lucide (search, calendar, minimize, square-pen, rotate-ccw-key, check, file-up, arrow-big-down) at 12/16/24 | hand-drawn inline SVGs | not verified in detail |
| App shell | sidebar 64 wide, header rule at y=61, content starts x=80 | sidebar 56, header 52 | WRONG |

---

## 3. Component-by-component

Figma values are shown as `px / colours`. "Fix" is what must change in our CSS/tokens.

| Component | Figma spec | Ours (measured) | Verdict | Fixes needed |
|---|---|---|---|---|
| **Colors** (section) | 23 variables listed in section 2 | Teal-brand, navy palette; no hex matches | WRONG | Replace token set with Figma's 23 variables. Remove teal, coral, amber and `#EF4444`. |
| **Typography** | Lato Regular; sizes 12/14/16/18/20; headers are 14 `#5B5D72` sentence-case, not uppercase, not letter-spaced | Inter; 10-32 scale; 12px/600 uppercase `letter-spacing 0.96px` table headers; 13px metadata | WRONG | Switch to Lato 400 only. Drop uppercase and letter-spacing. Drop 13px and 22/24/32. |
| **Spacing & Sizing** | Control h 32; tabs/chip rows 40; auction row pitch 33; admin row pitch 41; sidebar 64; page gutter 80/16 | Control h 36/40; radius scale 6/8/10 | WRONG | Heights 32 (buttons, inputs, chips), radius 4 (controls) and 8 (cards/modals). |
| **Buttons: Primary** | Component `button` (Default/Variant3/disabled): h32, r4, pad 6/32, gap 10, 14 Lato Regular, text `#18181C`. Fill set per instance: blue `#7590FF` (Log In), blue-green `#71E7FF` (Add New, Save Changes), green `#3FF3C0` (Confirm, Start Now) | h36, r6, pad 0/16, 14/600, teal `#7AEFEF`, text `#000`, hover `#5ADADA` | WRONG | h32, r4, pad 6/32, weight 400, text `#18181C`; add 3 fill variants; remove teal. Note: the Default component in Figma has an empty fill (colour is applied per instance). |
| **Buttons: Cancel Auction (danger)** | Fill `#FF6565`, text `#18181C`, h32, r4; with-arrow variant pad 6/12/6/24 gap 8, chevron 8x4 stroke 1 | `#E57373` fill, white text, 13px/600, h36, r6, pad 0/12 | WRONG | Fill `#FF6565`, text `#18181C` (not white), 14/400, h32, r4. |
| **Buttons: Reject (outlined)** | 1px stroke `#FF6565`, transparent, text `#FF6565`, h32, r4 | 1.5px `#E57373`, r6, h36 | WRONG | 1px `#FF6565`, r4, h32. |
| **Buttons: Modal Cancel (white)** | Fill `#F8F7FF`, text `#18181C`, h32 (h40 on Internal User modal, inconsistency in Figma), r4 | `#FFF`, text `#1A1B2E`, h36, r6 | WRONG | `#F8F7FF` / `#18181C`, h32, r4. |
| **Buttons: disabled** | Fill `#5B5D72`, text `#9597AD` | Our "disabled" sample renders as normal teal (`opacity` only; computed bg teal) | WRONG | Fill `#5B5D72`, text `#9597AD`. |
| **Buttons: other Figma variants** | New Auction outlined `#71E7FF` 1px; Start In = `#4C3E3D` fill + 1px `#FF982A` + orange text; Upload File = `#383D58` fill, `#7590FF` 16px text + file-up icon, h40 | none | MISSING | Add the three variants. |
| **Buttons: Ghost / Small / Icon** | No ghost, small or icon-button chrome in Figma (row actions are bare 24px lucide icons) | ghost (border `#2D2F4A`), `.btn-sm` 13px/h32, `.btn-icon` 32 box | NOT IN FIGMA | Remove ghost, sm and icon-button; use bare icons. |
| **Inputs: text** | Component `text input`: 235x32, fill `#373746`, **no border**, r4, pad 10/12, 14 Lato, placeholder `#5B5D72`, value `#F8F7FF` | `.field-input`: h40, `#1A1B2E`, 1px `#2D2F4A`, r6, pad 0/16, 14 Inter | WRONG | h32, fill `#373746`, no border, r4, pad 10/12. |
| **Inputs: label** | 12 `#9597AD` Regular above input, 8px gap | 12/600 `#8B8EA8`, `letter-spacing 0.48px` | WRONG | Weight 400, no letter-spacing, `#9597AD`. |
| **Inputs: error / focus** | No ring, no error text block drawn. Error is a cell stroke `#FF7553` 1px plus a tooltip chip; focus/edit is stroke `#7590FF`@60% 1px | Teal border + 3px teal ring on focus; `#EF4444` + 3px ring on error; `.field-error` 12px text under field | WRONG / invented | Replace rings with 1px strokes: focus `#7590FF`@60%, error `#FF7553`. Remove `.field-error` block. |
| **Inputs: inline bid/ask cell** | Not an input chrome. Cell is a 32-high rectangle with `#18181C` fill when editing; "in the mix" cell has 1px `#3FF3C0` stroke; error cell 1px `#FF7553`; idle zero values `#5B5D72` | `.input-inline`: 110x36, `#1A1B2E`, 1px border, r6, 3px ring | WRONG | h32; states by 1px stroke colour only. |
| **Inputs: search** | Component `search`: 235x32, `#373746`, r4, gap 8, lucide search 16 (stroke `#7590FF`), placeholder `#5B5D72` | `.field-prefix-icon` `#5A5C70`, 40h, 16px side padding | WRONG | Icon colour `#7590FF`, h32. |
| **Inputs: date / time stepper / dropdown** | `date` (calendar icon `#7590FF`), `time` (106x32, "05:00" + "min" `#5B5D72` + up/down arrow-big stepper `#9597AD`), `dropdown` (112x32, chevron 11x6 `#9597AD`, e.g. "View as: Myself") | none | MISSING | Add all three. |
| **Toggle** | 32x16 track r12; off `#9597AD`, on `#3FF3C0`; thumb 12 circle `#F8F7FF` with 3px drop shadow `#1D3C31`; label 14 `#9597AD`, gap 12 | 40x22 track, on `#7AEFEF`, off `#4A4B60`, 16 thumb white with 1px/4px black shadow; label `#F0F0F8` | WRONG | Resize to 32x16, thumb 12, colours per Figma. |
| **Checkbox** | Component `check`: 16x16 **r2**; unchecked fill `#373746` no border; checked fill `#7590FF` with 8x6 check stroke 2 `#373746`; label 14 `#9597AD` | 16x16 **r4**; unchecked `#1A1B2E` + 1px `#4A4B60`; checked teal fill; label `#F0F0F8`; has indeterminate state | WRONG | r2, fills per Figma; delete indeterminate (not in Figma). |
| **Badges: Cash Close / EFP label** | Plain text, no pill: 12 Lato, Cash Close `#71E7FF`, EFP `#B694FF`, under session name | 28h pill, teal ghost bg + border, 12/600, r6 | WRONG | Make it plain text; EFP colour is purple. |
| **Badges: Time Left / Starting in** | Chip h32, r4, pad 16/24/16/12, gap 16; label 14 + value 14 `#F8F7FF`. States: normal = `#383D58` fill, label `#7590FF`; low (00:15) = `#4E3234` fill, label `#FF6565`; expired (00:00) = transparent with 1px `#FF6565`; Starting in = `#4C3E3D` fill, label `#FF982A` | `.badge-timer`: h28, r6, 12/600 amber text on amber tint with amber border; same for both Time Left and Starting In | WRONG | Four state variants as listed. Time Left is blue, not amber. |
| **Badges: In the mix** | Chip h30, r4, pad 8/12, fill `#264142`, drop shadow 8 `#22222C`, 12px check-circle `#3FF3C0` + text 12 `#3FF3C0` "In the mix for equilibrium price calculation", positioned over the table header | `.badge-in-the-mix`: h24, r4, `#4DCC9B` on 15% green, 12/600, text "In the mix", no icon in measurement | WRONG | Colours `#3FF3C0` / `#264142`, h30, shadow, icon, full text. |
| **Badges: Validation tooltip** | Chip h30, r4, fill `#4E3234`, drop shadow, warning triangle 14x12 + text 12 `#FF7553` "Bid should be lower that Ask" (typo in Figma) | `.warning-inline`: amber text `#F59E0B` on amber tint with amber border, 12px | WRONG | Red-orange `#FF7553` / `#4E3234`, no border. |
| **Badges: Partially in the fill** | Chip h30, r4, fill `#4E4134`, text 12 `#FFCE53`, half-circle icon | none | MISSING | Add. |
| **Badges: Active/Pending/Error/Live, Review (12)** | No such badges. "Active" is a 16px check-circle `#3FF3C0` icon in a table cell | `.badge-success/warning/danger/brand`, `.badge-review` | NOT IN FIGMA | Remove; replace with Figma's check icon. |
| **Tables: auction book** | Instrument block `#22222C` r8 on card `#2D2E3B`; block header 40h with name 14 + "min size: N" 12 `#9597AD`; column header row 14 `#5B5D72` Regular, centred, sentence case; rows pitch 33, 14 `#F8F7FF` centred; 1px `#373746` horizontal and vertical rules; columns Client, Trader, Size, Bid, Size, Ask, Spread; dual layout "Aggregate Book" / "Global Order Book" (`#9597AD` 14); Global block fill `#18181C` | `.auction-table`: th 12/600 uppercase tracked `#8B8EA8`, right-aligned; td ~48.7 high (inputs inside); Size column 12px secondary; no client/trader; only Size/Bid/Ask/Spread | WRONG | Rebuild: colours, header style, row 33, centred, vertical rules, add Client/Trader columns and the dual book. |
| **Tables: row actions** | Red "x" circle 12 `#FF6565` beside bid/ask values; blue "+" circle 12 `#7590FF` for adding level; selected/partial row fill `#374A58` | `.row-delete-btn`: 22px coral-tint circle | WRONG / MISSING | Use 12px icons; add "+" and row highlight. |
| **Nav: sidebar** | 64 wide, `#2D2E3B`, top-right radius 24, M logo vector 40x32 `#7590FF`@60% at y=20, icons 24 (building active `#F8F7FF`, news `#9597AD`) at y=92/148, user icon 32 `#9597AD` bottom y=960. No active background | 56 wide, `#0F1123`, text "M" in teal, 40x40 r8 buttons with teal-ghost active bg, 18px icons | WRONG | Rebuild with Figma specs. Real logo vector, not a text "M". |
| **Nav: header** | App title "Equity Derivatives Auction" 20 `#7590FF` at (80,24); full-width 1px `#373746` rule at y=61; page title 16 `#F8F7FF` ("Auctions"/"Statics") at y=82; top-right "View as:" `#9597AD` + dropdown | 52h bar, `#1E2035`, border-bottom, 16/600 title, breadcrumb `›`, avatar | WRONG | Match Figma. Remove breadcrumb (invented) and initials avatar. |
| **Nav: tabs** | 40h tabs, pad 12/56; active = `#383D58` fill + `#7590FF` text with 1px `#7590FF` stroke; inactive text `#9597AD`; strip over `#2D2E3B` | none | MISSING | Add tabs (Clients / External Traders / Internal Users). |
| **Session card** | Card `#2D2E3B` r8 (no border, no shadow); header: collapse icon button 24x24 `#383D58` r4 (lucide minimize `#7590FF`), name 14 `#F8F7FF`, type label 12 below, Time Left chip, Cancel Auction button right; instrument block `#22222C` r8 with equilibrium chip 197x40 and cancel dropdown 112x40 (`#432C35` fill, `#FF6565` text, disabled `#373746`/`#5B5D72`) | `.session-card` `#1E2035`, 1px `#2D2F4A`, r8, shadow; name 16/700; teal type badge; amber timer; instrument name 14/700; "Eq:" label + teal value 13/600 | WRONG | Re-skin completely; add collapse button, per-instrument cancel, equilibrium chip. |
| **Equilibrium price chip** | 197x40 chip, pad 11/24, gap 4; fill `#B694FF`@20% (Trade Auction screen uses `#A494FF`@30%); "Equilibrium Price:" `#B694FF` 14 + value `#F8F7FF` 14 | Plain "Eq:" 12 label + teal value 13/600, no background | WRONG | Chip as specified. |
| **Order notification** | Panel 328 wide, `#2D2E3B`, r6, pad 16, gap 16, drop shadow 8 `#18181C`, no border; text 14 with first line "Orders placed:" in grey; buttons Reject (outlined `#FF6565`) + Confirm (`#3FF3C0`), both h32 | `#252740`, 1px border, r10, pad 16, shadow 8/32 black 0.45; label 12/600; Reject coral 1.5px, Confirm teal, h36 | WRONG (structure right) | Colours, r6, no border, h32, shadow. |
| **Cancel dropdown menu** | Menu 112 wide, `#373746`, r4, drop shadow 6 `#18181C`; items All Bid / All Ask / All, 14 `#F8F7FF`, pitch 33, pad 16; no red item | 120 wide, `#252740`, 1px border, r8, shadow 4/20; items pad 10/16, 36.7 high; "All" is coral | WRONG | Colours, r4, remove coral "All". |
| **Modals** | Panel `#2D2E3B` r8, widths 448 (user), 720 (client), 916 (new auction); title 18 Regular centred `#F8F7FF`; 1px `#5B5D72` rule under the title; padding 24; labels 12 `#9597AD`; inputs h32; footer = white Cancel (left) + primary (right), h32; overlay `#18181C`@50% + 12px background blur | `.modal` `#252740`, 1px border, r10, pad 24, min-w 440, title 20/700 left, footer top border 1px, overlay black 55% no blur | WRONG | Rebuild: title 18/400 centred with rule; r8; no border; blur overlay. |
| **Modal content (Figma-only)** | New Auction: segmented toggle Cash Close (`#374A58` + `#71E7FF`) / EFP (`#22222C` + `#9597AD`); instrument table with check column; "Auction Duration" + `time` input; Start In + Start Now; Upload File. Client modals: label+input groups, Client User List with search | none | MISSING | Add as patterns. |
| **Admin table** | Panel `#22222C`/`#2D2E3B`; header 14 `#5B5D72`, centred; rows pitch 41, 14 `#F8F7FF`; ID values underlined; user count underlined `#7590FF`; Active = check-circle 16 `#3FF3C0`; actions = lucide rotate-ccw-key (blue) and square-pen (orange per screenshot) 24px; vertical 1px dividers | `.admin-table`: header bg `#1E2035`, 12/600 uppercase tracked; td pad 10/16 (row 41.7, matches pitch by coincidence); first col checkbox | WRONG | Header style and colours; add underlined links, check icon, action icons. Drop leading checkbox column on the Clients list (modal list uses one). |
| **Cards** (generic card-header/title/body) | No generic card. Panels are plain `#2D2E3B` or `#22222C` r8 frames | `.card-header` 12/16 pad, `.card-title` 14/600 | NOT IN FIGMA | Remove or map to Figma panel. |
| **Toast** | The only toast is "New level for FTSE 100 IDX FUT Sep25 added!": 322x41, `#2D2E3B`, r6, text 14 `#71E7FF`, drop shadow, top-right | `.toast` `#252740`, 1px border, r6, 14/500, success/danger border variants | WRONG | Colours, text `#71E7FF`, weight 400, no border; drop the success/danger variants (not in Figma). |
| **Pagination** | none in any screen | `.page-btn` 32x32, active teal | NOT IN FIGMA | Remove. |

### Figma patterns with no counterpart in ours (MISSING)
1. Login screen: card 312x416, `#22222C`, r12, pad 40/48, gap 56; M logo vector 70x56 `#7590FF`@60%; username/password inputs `#373746`; eye icon `#7590FF`; "Forgot Password?" link underlined `#7590FF` 12-14px; full-width Log In button `#7590FF` h32.
2. Tabs bar (Clients / External Traders / Internal Users).
3. Search input component.
4. Date input component.
5. Time/min stepper component.
6. Dropdown/select component (View as: Myself).
7. Segmented toggle (Cash Close / EFP).
8. Time Left chip with 4 states; Starting in chip.
9. Equilibrium Price chip.
10. Collapse/minimize icon button (24px, `#383D58`).
11. "Partially in the fill" chip and partial-fill row highlight `#374A58`.
12. Dual order book (Aggregate vs Global) with Client/Trader columns and selected-row green outline.
13. "Orders matched" summary lines: label 12 `#5B5D72`; line colours `#3FF3C0` full fill, `#FF982A` partial fill, `#9597AD` "None".
14. Table row icons: red x, blue +, key-reset, edit, active check-circle.
15. Modal patterns: New Auction, client user list, Upload File, plus blurred overlay.

### Invented by us (NOT IN FIGMA)
- Whole sections: Cards, Pagination.
- Ghost button, small button, icon-button chrome; indeterminate checkbox; status badges (Active/Pending/Error/Live) and Review badge; `.field-error` text under inputs; 3px focus rings; breadcrumb and initials avatar; success/danger toast variants; 13px type size; uppercase-tracked table headers; sidebar active-state background.

---

## 4. Prioritised fix list

1. **Replace the token foundation** (tokens.json, tokens.css, CLAUDE.md): Lato 400 only; 23 Figma colour variables; drop teal/coral/amber/`#EF4444` and the 3 navy surfaces; add `#22222C`, `#2D2E3B`, `#373746`, tints. Everything downstream depends on this.
2. **Re-map semantic roles**: primary = blue `#7590FF`; confirm = green `#3FF3C0`; secondary action = blue-green `#71E7FF`; danger = `#FF6565`; error = `#FF7553`; warning/starting = `#FF982A`; Time Left = blue; equilibrium = purple.
3. **Fix control geometry**: height 32 for buttons, inputs, search, dropdown, chips; radius 4 (2 checkbox, 8 cards/modals, 6 toast, 12 login); button padding 6/32; button text `#18181C`.
4. **Rebuild the app shell**: 64 sidebar with real logo and Figma icons, header rule at y=61, title 20 blue plus 16 page title, tabs.
5. **Rebuild auction table and session card**: dual book, Client/Trader columns, 33px rows, centred sentence-case `#5B5D72` headers, vertical rules, equilibrium chip, Time Left variants, instrument cancel, per-state cell strokes.
6. **Fix chips/tooltips**: in-the-mix, validation (`#FF7553`), partial fill (`#FFCE53`), orders-matched colours.
7. **Rebuild modals**: centred 18px title with rule, r8, blur overlay, new content patterns.
8. **Add missing components** (section 3 list) and **delete invented ones**.
9. **Rewrite showcase, components.md, components.css and CLAUDE.md** to match (all contain the wrong hex values and rules such as "Border radius is 6px", "Font is Inter", "Brand colour is #7AEFEF").
10. Add `Variant3` of `button` to a decision list: it is identical to Default in Figma (empty fill, `#18181C` text), so it needs the designer's confirmation before documenting.

## 5. Caveats and what was not verified
- Hover, pressed and focus states cannot be seen in Figma: not verifiable. Our hover colours (`#5ADADA` etc.) have no Figma counterpart.
- Edit icon colour (orange) and key icon colour (blue) were read from the screenshot, not from node fills.
- Time Left variant colours were read from nodes; the "00:15" low-time variant fill (`#4E3234`) is from the parent frame fill.
- External Traders screens (282:1709, 282:2180) and the 1920x1080 Client Auctions (1008:687) were only viewed or skipped. No new component types were expected there, but they were not dumped.
- Two older screens (New Client / Edit Client) use an 80px sidebar, unlike the 64px on all other screens. The 64px value is used here as the majority.
- Figma has internal inconsistencies (modal Cancel h32 vs h40; equilibrium fill `#B694FF`@20% vs `#A494FF`@30%; "lower that Ask" typo). They are flagged so the designer can rule on them.
- Inter font file was not loaded in the sandbox; declared font-family used.

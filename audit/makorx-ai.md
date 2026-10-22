# MakorX.AI (HR) design system vs Figma — component audit

Figma file `qLvCCFgKO85vqiKxVTcqJE` (pages: final 28:287, drafts 29:608, mobile 238:146, color style 0:1). Ours: `makorx-ai/design-system/` (showcase.html at http://localhost:3456/makorx-ai/design-system/showcase.html, light mode measured; the 43 components are those listed in components.md).

Method: Figma read-only via `use_figma` (node properties) + `get_screenshot` of screens; ours via computed styles in the browser pane (own tab). Note: the browser pane runs at devicePixelRatio 1.5, so a CSS `1px` border reads as 0.667px and `2px` as 1.333px; all border widths below are the CSS-declared values (1px/2px). Anything not seen in Figma is reported as "not verifiable" or "NOT IN FIGMA".

## 1. Summary

| | Count |
|---|---|
| Components reviewed | 43 (all components.md entries) |
| MATCH | 1 |
| PARTIAL (right geometry, wrong details) | 5 |
| WRONG (Figma counterpart exists, ours differs materially) | 12 |
| NOT IN FIGMA (invented) | 25 |
| MISSING IN OURS (real Figma patterns we lack) | 22 patterns (section 4) |

**Score: 27/100.** Foundations are right (Geist, brand #005268, #7c8dac / #a8b6cd / #e5e7ec, 14px body, 74px top nav, 40px controls, 4px card radius). But only 18 of our 43 components have any Figma counterpart, of those 1 matches and 5 are partial; the rest are wrong, and 25 (58%) are invented. The most visible lie: every button, status pill, modal, table header, card title and data label is styled differently from Figma, and the sidebar and dark mode do not exist in Figma.

Where the Figma file actually has reusable components: NONE on page "final" (0 COMPONENT/COMPONENT_SET). Page "drafts" holds 7: `Button` (Default / hover / disabled), `edit` (icon button; Default / hover), `Input`, `Search`, `Select`, `date`, `Password` (Default / filled / filled-opened). Page "mobile" holds 1: `mobile menu`. No variables, no text styles. So Figma only defines Button, Input, Search, Select, date, Password, edit, mobile menu. Everything else (badges, cards, tables, modals, nav, KPI...) exists only as hand-built frames on screens, which I measured from the screens (HR/Employees, HR/Pool, Acc Settings, API Keys, 2fa, Log In, Auth, P&L/Daily, mobile).

## 2. Answers to the three questions

**(a) What is the real sidebar/nav in Figma?** There is no sidebar anywhere (desktop screens or mobile page). Desktop navigation is a white top bar `Frame 15`: 1440x74, fill none/white, 1px bottom border #e5e7ec, padding 16/40, containing: app-launcher dot-grid icon + logo (32px mark + "MAKOR X.AI" 18px + module label in Lexend Exa 14px #7c8dac) gap 24, then links Geist 14px black, gap 32, active link SemiBold + underline; right side a 42px outlined avatar circle (initials 14px black, stroke 1.5 #000). The app launcher is a popover (416px wide, white, r4, layered cool-grey #52616b drop shadows, groups "General"/"Finance", 100x120 icon tiles, selected tile bg #f5f5f8, "Coming Soon" pills). The user menu is a 257px white r4 popover with 56px rows, 16px padding, 12px icon gap, "Log Out" in #da4d43. Mobile: gradient teal header (frame 393x100, fill #005268 base with a gradient overlay image), bottom tab bar `mobile menu` (white, top radius 8, shadow, Apps + Account icons with 14px labels). Our showcase "Sidebar" (hard-coded dark #111214, 220px, logo mark #0cb8d0, nav items 13px) is INVENTED and also contradicts our own CLAUDE.md ("raised #f5f5f8" sidebar). The 74px top nav, which IS the real Figma nav, is not a component in our showcase at all.

**(b) Is there a dark-mode design in Figma?** No. I scanned all three pages: the only dark-coloured large fills are `#000000` @ 50% modal scrims (7 of them); layers named "... / Dark" are iOS status-bar glyph variants. The only related thing is a "Light mode" toggle row (on = #179484) in the Account Settings modal, a feature stub with no dark frame. Our entire dark mode (`body.dark`, #0cb8d0, #111214/#18181c/#202226/#26292e, dark status colours) is NOT IN FIGMA (invented).

**(c) Which of the 43 components exist in Figma?** Exist as real components or consistent screen patterns: buttons (only one real style, see below), text input, password input, search, select trigger, date input, status pill, avatar (as outlined-circle initials), card, table, KPI card, data label pair, toggle, modal, empty state (text only), edit/icon button. 25 do not exist (list in section 5).

## 3. Component-by-component table

Figma truth values in the "Figma spec" column come from node reads (hex/px/weights exact).

| # | Component | Figma spec | Ours (measured) | Verdict | Fixes needed |
|---|---|---|---|---|---|
| 1 | Button primary (`.btn-primary`) | Only one button style: white bg, 1.5px #005268 border, text #005268 Geist Regular 14, h40, px24, r4. Hover = fill #005268 + white text. Disabled = border+text #a8b6cd (no fill) | Filled #005268, white text, h36, px14, weight 500, hover opacity .85 | WRONG | Figma has no filled-at-rest primary. Re-skin to outline style; h40; px24; weight 400; hover = fill |
| 2 | Button outline (`.btn-outline`) | (same single style as above) | White, 1px #e5e7ec border, text #1a1a1a, h36, px14, w500; hover border+text brand | WRONG | Border 1.5px #005268, text #005268, h40, px24, w400 |
| 3 | Button cancel (`.btn-cancel`) | Secondary = fill #e5e7ec, no border, black text 14 Regular, h40, px24, r4 (Account Settings / 2FA Cancel/Back) | White, 1px #c4cdd8 border, text #7c8dac, h38, px20, w600; hover #f5f5f8 | WRONG | Fill #e5e7ec, no border, text #000, h40, px24, w400 |
| 4 | Button CTA (`.btn-cta`) | Modal primary action = same outline button (Update Password, Verify Code, Next) | Filled #005268, h38, px24, w500, hover opacity | WRONG | Make it the outline button; delete filled variant |
| 5 | Button ghost (`.btn-ghost`) | = Figma's real button (see #1) | White, 2px #005268 border, #005268 text, h40, px24, w500; hover fills brand | PARTIAL (closest) | Border 2px to 1.5px, weight 500 to 400. Promote this to THE button |
| 6 | Save bar | Not found on any screen/page | Brand-filled sticky bar 54h, discard/save buttons | NOT IN FIGMA | Remove or mark "not designed" |
| 7 | Text input | h40, white, 1px #e5e7ec inside, r4, px12 (pad 7/12), 14 Regular; placeholder #7c8dac; typed value #000; label above = 14 Regular #7c8dac (e.g. "Target Date") | h40, 1px #e5e7ec, r4, px12, 14 Regular OK; text #1a1a1a (F #000); placeholder #a8b6cd (F #7c8dac); label 12px/500 #7c8dac (F 14/400); readonly #f5f5f8 / focus ring 3px / hover border: not verifiable (no such states in Figma) | PARTIAL | Placeholder #7c8dac; text #000; label 14/400; drop focus ring or flag as unspecified |
| 8 | Search input | h40, r4 (component and Pool screen; Employees instance overrides to r12), 16px lucide search icon stroke #005268 at left, 8px gap, placeholder #7c8dac 14 | h40, r4, icon 14px #a8b6cd, padding-left 36 | PARTIAL | Icon 16px #005268 (stroke 1), gap 8, placeholder #7c8dac. Note Figma itself is inconsistent (r4 vs r12) |
| 9 | Textarea | Not in Figma | h80, 1px border, r4 | NOT IN FIGMA | Flag as unspecified |
| 10 | Checkbox | Not in Figma (password-rule list uses 4px bullets and #179484 check glyphs) | 16px box r4, 2px #c4cdd8, brand when checked | NOT IN FIGMA | Flag |
| 11 | Radio | Not in Figma | 16px circle | NOT IN FIGMA | Flag |
| 12 | Custom select (trigger) | `Select`: h40, 1px #e5e7ec, r4, px12, placeholder #7c8dac 14, chevron-down 16px stroke 1.5 #005268 right | h40, 1px #e5e7ec, r4, px12, #7c8dac 14, chevron #005268 (14px) | MATCH (chevron 14 vs 16 trivial) | Chevron 16px. Dropdown panel (shadow .12/.06, r4): not verifiable in Figma |
| 13 | Combobox | Not in Figma | h40 input + panel | NOT IN FIGMA | Flag |
| 14 | Filter chips | Not in Figma (nearest: Net/Gross segmented control and Pool count chips, neither is a chip row) | 28h, r4, 12/500, brand tint 8% | NOT IN FIGMA | Flag |
| 15 | Time picker | Not in Figma | h40 w/ steppers | NOT IN FIGMA | Flag |
| 16 | File upload zone | Not in Figma | 2px dashed #c4cdd8, pad 28/20 | NOT IN FIGMA | Flag |
| 17 | Date picker / range | `date`: 197x40, 1px #e5e7ec, r4, placeholder "dd/mm/yyyy" #7c8dac, value #000, calendar icon 16px stroke #005268 right. Calendar popup / ranges: not in Figma | Input h40 r4 border OK; icon 14px #005268 right; calendar popup 280w, r4, shadow | PARTIAL | Icon 16px; typed value #000; popup + range mode are not designed in Figma |
| 18 | Status pill | Pill: r16, h20, px12, Geist Medium 12. Active bg #c1f0d5 text #179484; Inactive bg #f0c4c1 text #da4d43; "Active Position" same as Active. No pending/approved/denied/new variants in Figma | r4, h24, pad 3/10, SemiBold 600. Active #c1f0d5/#179484 OK; Inactive #fde8e6/#da4d43; Pending #fef3c7/#d97706; Approved #f0fdf4/#16a34a; Denied #f5f5f8/#a8b6cd; New #d4eee9/#005268 | WRONG | r16, h20, px12, weight 500; Inactive bg #f0c4c1; remove pending/approved/denied/new or mark invented |
| 19 | Department badge | No dept text badges. Pool shows count chips: h26, r4, pad 4/12, gap 8, icon + number 14 Regular black, fills #cad8f4 and #c1ecf0 | r4, h24, w500 12px, 7 dept colours (only Equities #cad8f4 and Fixed Income #c1ecf0 coincide with the two chip fills; text colours #2456a0 etc. unverified) | NOT IN FIGMA | Replace with the count-chip pattern |
| 20 | Avatar | Outlined circle, no fill: 1.5px #000 stroke, initials 14 Regular black (list 32px, 16px text in 40px pool rows, nav 42px). Inactive rows: stroke and text #7c8dac | Sizes 36/44/48/64; 1px rgba(0,0,0,.30) border; initials weight 500 (13/15/18/21px); inactive #a8b6cd | WRONG | Sizes 32/40/42; stroke 1.5px solid #000; weight 400, 14/16px; inactive #7c8dac |
| 21 | Alert / banner | Not in Figma | Blue/green/amber/red tints (#edf5fd, #f0fdf4, #fffbeb, #fef2f2; text #1a5a7a etc.), all off-palette | NOT IN FIGMA | Flag; also colours are outside the Figma palette |
| 22 | Tooltip | Not in Figma | #1a1a1a bg, 12/500, white | NOT IN FIGMA | Flag |
| 23 | Toast | Not in Figma | #1a1a1a bg, 14/500, r4 | NOT IN FIGMA | Flag |
| 24 | Progress bar | Not in Figma | 6px track #e5e7ec, brand fill | NOT IN FIGMA | Flag |
| 25 | Spinner | Not in Figma | 16px, 2px brand ring | NOT IN FIGMA | Flag |
| 26 | Skeleton | Not in Figma | 14px r4 lines | NOT IN FIGMA | Flag |
| 27 | Confirmation dialog | Not in Figma. Real dialogs = Figma modal pattern (#35) | 440w, r4, shadow .18, pad 28, scrim .36 | NOT IN FIGMA | Reuse the Figma modal shell |
| 28 | Sidebar nav | Does not exist; real nav = 74px white top bar (see 2a) | Fixed dark #111214, 220px, nav-item 13px/500 36h, active #0cb8d0 tint | NOT IN FIGMA | Delete; replace with Top Nav component |
| 29 | Page header | No page title band on any screen. Pages go straight into cards with card titles | 18px/700 title, 13px subtitle, bottom border | NOT IN FIGMA | Flag |
| 30 | Breadcrumb | Not in Figma | 13px | NOT IN FIGMA | Flag |
| 31 | Tab bar | Not in Figma. Nearest: top-nav active link (SemiBold + underline) and Net/Gross segmented control (240x40, two 120x40 cells, selected = fill #f5f5f8 + 1px #005268 border + brand Medium text, unselected #7c8dac) | 2px brand underline tabs, 14/600, h44 | NOT IN FIGMA | Replace/add segmented control |
| 32 | Stepper | Not in Figma | 28px dots, 2px connectors | NOT IN FIGMA | Flag |
| 33 | Pagination | Not in Figma (mobile has carousel dots only) | 32px square buttons, active brand fill | NOT IN FIGMA | Flag |
| 34 | Empty state | Plain centred text in the panel, 14px #7c8dac ("Select an employee from the list to view their details"); no icon/title/button | 48px icon, 15/700 title, body 14 #7c8dac, action button, pad 40/20 | WRONG | Strip to the text-only pattern |
| 35 | Modal | Width 616 (Account/API) or 376 (2FA), r12, no border, no shadow, 50% black scrim. Header h69, 1px bottom border #e5e7ec, title 16 Regular #005268, centred, no close button. Body inner width 536 (40px side padding), 24 vertical, gap 32. Section labels 14 Regular #a8b6cd. Footer buttons live in body: Cancel left (grey fill), action right (outline), h40 | 740w, r4, 1px border, shadow 0 8 40 .16, scrim .28; header h72, 16/700 #1a1a1a left-aligned with x button; footer 70h with top border | WRONG | r12, no shadow/border, scrim #000@50%, centred brand 16/400 title, drop x, 616/376 widths, footer inside body |
| 36 | Detail drawer | Not in Figma (details are an inline right card) | 480w slide-over, shadow | NOT IN FIGMA | Flag |
| 37 | Card | White, 1px #e5e7ec, r4, no shadow. Header row h64, 1px bottom border, padding 24 left/12 right, title 16px #005268 Regular (Medium on P&L), counts in parens e.g. "Employees (599)", header action = outline button | White, 1px #e5e7ec, r4 OK; header ~61h pad 16/20; title 12px/700 uppercase #7c8dac; body pad 20 | PARTIAL | Title 16/400 (or 500) #005268 sentence case; header h64 pad 24; body pad 24 |
| 38 | Table | Header row h42, NO fill, text 14 Regular #a8b6cd, not uppercase, 1px bottom border. Body rows ~62h, 1px #e5e7ec bottom, text 14 #000 with 12px sub-values; deltas 12px: +ve #3b951a, -ve #da4d43. List rows h76 pad 16 gap 14; selected row bg #f5f5f8 + 4px solid left bar #005268 | th: #f5f5f8 fill, 12/700 uppercase, 0.06em tracking, #a8b6cd; td pad 12/16; wrapper shadow 0 2 8 .05; active row inset 3px brand shadow; group-row styling | WRONG | th: no fill, 14/400, no uppercase/tracking; remove wrapper shadow; selected bar 4px; positive colour #3b951a |
| 39 | KPI card | 259x142, 1px #e5e7ec, r4, pad 16, gap 24. Label 18 Regular #a8b6cd; value 24 Medium #000; compare line 16 Medium; trend chip r4 h26 pad 4/8, 14 Medium, up #c1f0d5/#3b951a, down #f0c4c1/#da4d43 | pad 20, label 12/700 uppercase #a8b6cd, value 28/800, trend 12/600 h22 r4, up text #179484, down bg #fde8e6 | WRONG | Label 18/400; value 24/500; trend 14/500 h26 pad 4/8; colours #3b951a/#f0c4c1 |
| 40 | Data label pair | Label 12 Regular #a8b6cd (sentence case), value 12 Medium #000, stacked gap 2; 3-column grid (132px cols) | Label 12/500 UPPERCASE .04em; value 14/500 #1a1a1a; grid gap 16/24 | WRONG | Label no uppercase, w400; value 12/500 #000 (14/500 not seen) |
| 41 | Toggle | Track 32x16, r40 (full pill), off #7c8dac, on #179484 (green), thumb 12px white | Track 32x18, r8, off #e5e7ec, on #005268, thumb 14 | WRONG | 32x16 pill, off #7c8dac, on #179484, thumb 12 |
| 42 | Timeline | Not in Figma | 12px dots, green/red/amber | NOT IN FIGMA | Flag |
| 43 | Tag input | Not in Figma | h40 wrap, 24px tags | NOT IN FIGMA | Flag |

## 4. Missing from ours (Figma patterns we lack)

1. Top navigation bar (74px, launcher grid icon, logo lockup with Lexend Exa module label, links w/ underline active state, avatar circle) — the real nav, absent from showcase.
2. App launcher popover (416px, sections, 100x120 tiles, selected tile #f5f5f8) + "Coming Soon" pill (r12, fill #ff8132 @ 20%, text #ff8132, Geist Medium 10, h17, px8).
3. User dropdown menu (257px, r4, layered shadow, 56px rows, icons, red Log Out).
4. Segmented control (Net/Gross).
5. Employee/pool list rows (76px rows, avatar + name/ID + pill, selected state #f5f5f8 + 4px brand bar) and pool rows with count chips.
6. Detail/position card (title row + pill + edit icon button, sub-sections "Organizational Details" 14/#7c8dac, 3-col data pairs).
7. Icon buttons: `edit` (32x32, r2, 1.5 brand border, pen icon; hover filled), trash (24px, 1px #da4d43 border r2), eye and copy (brand / orange #ff8132) icons.
8. Password field with eye toggle (dots in #005268, 4px each; revealed text #000) and the password-rules panel (#f5f5f8 r4, 12px text, #179484 check marks).
9. OTP input: six 40x64 boxes (1px #e5e7ec, r4, 16px centred) gap 8; "Resend Code" link #da4d43 14px underline with refresh icon.
10. Auth card (white r12, pad 56/72, gap 40, 384 or 417 wide) on mesh-gradient teal background (fallback #e5e7ec), logo 80x64 #005268, "Welcome Back!" 18 Regular black, helper 12 #7c8dac, underlined "Forgot Password?" link; 2FA method cards (1px #f5f5f8, r4, pad 16/24, 32px icon).
11. QR-code panel (bordered r4 panel pad 32/24).
12. Trend chips on KPI (arrow icons).
13. Data viz colour set (donut/line: red, blue, yellow #FFD / purple, orange, green, teal — fingerprint colours #00589F, #00635B, #00B8B8 seen; not mapped to named components).
14. Mobile set: gradient app header 100px, bottom tab bar (white, top r8, shadow), carousel pager dots, filter sheet ("Reset Filters"/"Apply Changes"), summary cards (393-wide, 24px gutter). CLAUDE.md says "desktop-only, no mobile": that is contradicted by the Figma "mobile" page.
15. Green-2 #3b951a (positive numbers) and Orange #ff8132 tokens; "Red light" #f0c4c1 and "dark green main" #005268 as named styles.

## 5. Invented by us (25 components, no Figma basis)
Save Bar, Textarea, Checkbox, Radio, Combobox, Filter Chips, Time Picker, File Upload, Department Badge (text version), Alert, Tooltip, Toast, Progress, Spinner, Skeleton, Confirm Dialog, Sidebar, Page Header, Breadcrumb, Tab Bar, Stepper, Pagination, Drawer, Timeline, Tag Input. Also invented: the whole dark mode, pending/approved/denied/new status variants (#fef3c7/#d97706, #f0fdf4/#16a34a), alert palettes, hover/focus ring styles (Figma shows none; the button hover state is the only documented interaction).

## 6. Foundation mismatches

| Item | Figma (measured) | Ours |
|---|---|---|
| Primary text | #000000 | #1a1a1a (everywhere) |
| Placeholder | #7c8dac | #a8b6cd |
| "Radius always 4px" claim | 4 on cards/buttons/inputs, but 12 on modals/auth cards/Coming Soon pills/one search override, 16 on status pills, 2 on icon buttons, 40 on toggle | CLAUDE.md forbids >4 |
| Typography scale | 10 / 12 / 14 / 16 / 18 / 24; weights Regular, Medium, SemiBold only; NO uppercase/letter-spaced labels anywhere | Uppercase 12/700 +0.06em labels used for table head, card title, KPI label, data label; weights 600/700/800; sizes 9.5/11/13/15/22/26/28 |
| Weights | Buttons Regular 400; labels Regular; emphasis Medium 500 | Buttons 500-600, titles 700-800 |
| Section/field labels | 14 Regular, #7c8dac (field) or #a8b6cd (section) | 12/500 uppercase |
| Card titles | 16 Regular/Medium #005268 | 12/700 uppercase #7c8dac |
| Shadows | None on cards/tables/modals; layered cool-grey (#52616b) only on popover menus; modal scrim black 50% | Card .06, table .05, modal .16, drawer, confirm, scrim .28/.36 |
| Control height | 40px for all (button, input, select, date, search) | 34/36/38/40 mix |
| Control icon | lucide 16px, stroke 1-1.5, #005268 | 14px, 2px stroke, #a8b6cd (search) |
| Positive colour | #3b951a (Green 2) for numbers/trend text; #179484 for status text and toggle-on | #179484 used for both |
| Negative fill | #f0c4c1 (Red light) | #fde8e6 |
| Strong border #c4cdd8, divider #f0f1f4, #fafafa, #d97706 etc. | Not found in Figma styles (14 paint styles: Grey 1-4, Black, White, Green light, Green, Red light, Red, Green 2, dark green #005268, Orange, gradient) | Used throughout |
| Selected row indicator | 4px solid left bar #005268 + #f5f5f8 | 3px inset shadow |
| Fonts | Geist (Regular/Medium/SemiBold); Lexend Exa only in nav module label ("HR", "P&L") | Geist OK; Lexend Exa documented as "logo wordmark only" (Figma uses it for the module label; wordmark "MAKOR X.AI" is Regular 18 black) |
| Dark mode | none | full theme |
| Mobile | exists (page "mobile", 393x852) | "desktop-only" |
| Auth screens | not re-measured in `auth-design-system` (out of this pass) | not verifiable here |

Not verifiable: hover/focus/disabled states other than button (Figma has only Button default/hover/disabled, edit default/hover); dropdown option rows; calendar popup; auth-design-system/showcase.html (not measured in this pass); exact chart colours.

## 7. Prioritised fix list

1. Rebuild the button set from the Figma `Button` component: one outline button (h40, px24, 1.5px #005268, Regular 14), hover = filled, disabled = #a8b6cd, plus grey fill secondary (#e5e7ec) and 32px `edit` icon button. Delete filled primary/CTA/outline-grey/cancel-white variants.
2. Delete Sidebar and dark mode (or mark clearly "NOT IN FIGMA / proposal"); add the real Top Nav (74px) + user menu + app launcher; fix CLAUDE.md sidebar statement.
3. Fix typography foundations: text #000, placeholder #7c8dac, kill uppercase/letter-spaced labels, weights Regular/Medium/SemiBold only; card titles 16px #005268; table header 14 Regular #a8b6cd with no fill; data labels 12 Regular #a8b6cd.
4. Rebuild status pill (r16, h20, px12, Medium 12, Inactive #f0c4c1), avatar (outlined 1.5 #000 circle 32/40/42), toggle (32x16 pill, #7c8dac/#179484), KPI card + trend chips (#3b951a / #f0c4c1), modal (r12, 616/376 wide, centred brand title, scrim 50%, no shadow/x).
5. Add missing Figma patterns: segmented control, list row with selected bar (4px), count chips, password field + rules, OTP boxes, auth card on gradient, "Coming Soon" pill, icon buttons (trash/eye/copy).
6. Mark the 25 invented components as "unspecified in Figma — do not treat as design truth" in components.md/CLAUDE.md, or get design to supply them; remove off-palette colours (#fef3c7, #d97706, #16a34a, alert tints, #c4cdd8).
7. Correct CLAUDE.md claims: "4px everywhere", "desktop only", "#1a1a1a", "uppercase labels pattern", "36/38px buttons", "dark mode #0cb8d0".

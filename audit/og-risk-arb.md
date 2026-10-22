# OG Risk Arb design system vs Figma: component audit

Figma file: VlOfBG6fJt7ijm0iKasAMP (read-only). Ours: `og-risk-arb/design-system/` (showcase measured in the browser at localhost:3456, CSS read from components.css / CLAUDE.md).
Method: Figma values come from `get_design_context` / `use_figma` read-only scripts (node ids cited). Our values come from `getComputedStyle` in the live showcase and the CSS source. The browser was at DPR 1.5 so 1px borders compute as 0.667px; the CSS-specified value (1px) is what is quoted below.

## 1. Summary

| Metric | Result |
|---|---|
| Showcase sections reviewed | 20 (3 foundation + 17 component sections) |
| MATCH | 0 |
| WRONG | 17 |
| NOT IN FIGMA (invented) | 2 (Accordion, Toast) |
| Figma components (16 on components page) present in ours | 5 in some form (Button, Button Outline, Input, Select, Search), 0 faithful, 11 absent |
| Figma patterns missing from ours | about 35 (section 3) |
| Score | **6 / 100** |

Score rationale: the only values that match Figma are border `#E5E7EC`, white surfaces, 12px label size on inputs, and the general idea of a left icon rail plus top tabs. Typeface, brand colour, radius, control heights, every component's colour/shape, icons and layout of nearly every pattern differ. Following the current CLAUDE.md would produce a UI that does not look like the Figma.

Headline: the system was built from a guess at a "generic research tool" look. Figma is a Geist 12px, deep green `#005268`, 4px-radius, 32px-control, flat, bordered UI with coloured tinted pills and blue/orange/yellow accents that our system does not know exist.

Also found: Figma has 0 local paint styles and 0 variable collections, 2 text styles ("Geist: Medium", "Geist: Regular", both 12px) and 1 effect style ("Shadow"). `get_design_context` nevertheless reports named colours ("dark green main #005268", "Grey 1 #7C8DAC", "Grey 2 #A8B6CD", "Grey 3 #E5E7EC", "Grey 4 #F5F5F8", "Green #179484", "Green light #C1F0D5", "Orange #FF8132", Black, White), so those names are usable as token names.

## 2. Component-by-component

Verdict key: WRONG / NOT IN FIGMA / (MISSING items are in section 3).

| # | Component | Figma spec (source) | Ours (measured) | Verdict | Fixes needed |
|---|---|---|---|---|---|
| 1 | **Colors** | Brand `#005268`; surface grey `#F5F5F8`; border `#E5E7EC`; text black `#000`; secondary `#7C8DAC`; tertiary/labels `#A8B6CD`; orange `#FF8132`; yellow `#ECA100`; red `#DA4D43`; green `#179484`; green light `#C1F0D5`; also blue `#3675D2` (Actual, selected day, Join meeting, links in updates), `#4162A3` on `#CAD8F4` (author link, Cash Merger chip), `#008D9A` on `#C1ECF0` (industry chip). App pages are white (Dashboard 414:2798 fill `#FFFFFF`). | Brand `#1B8C8C`, hover `#156B6B`, page bg `#F5F6F8`, text `#1A1A28`, secondary `#6B7896`, tertiary `#A0AABC`, positive `#22C55E`, negative `#EF4444`, warning `#D97706`, links teal. | WRONG (only `#E5E7EC` border and white match) | Replace whole palette; add blue, orange, yellow, light-green tokens; page bg white; remove teal ghost/focus tints. |
| 2 | **Typography** | Geist Regular/Medium (SemiBold for titles, Bold for one value), base 12px. Sizes seen: 10 (counts, timestamps, error), 12 (almost everything), 14 (list title, comment title, SemiBold section), 16 (search, headings, day numbers), 18 (deal title). Table header 12 Medium black, not uppercase. | Inter 400-700, body 14px/1.5, scale 10-24, uppercase 12px/600 headers with letter-spacing .06em, 600 for most emphasis. | WRONG | Switch to Geist (Regular/Medium/SemiBold), 12px base, drop uppercase+tracking, drop 15/20/24px sizes. Note: the DAY calendar component in Figma still uses Inter text inside cells (inconsistency inside Figma). |
| 3 | **Spacing & sizing** | Radius 4px (2px small items, 5px day-strip tiles, 8px panels/tables, 16px pills, 24px count bubble). Control heights: 24 (status pill, date-table button), 28 (pill, header button), 32 (all buttons/inputs/tabs/toggle), 40 (main search, password, nav tile). Spacing 4/8/12/16/24. | Radius 6px everywhere (4/6/8/12/999 shown); heights 22/28/32/36/40; 36px default button and input; 14px body. | WRONG | Radius token 4; collapse sizes to 24/28/32/40; default control = 32. |
| 4 | **Sidebar** | Nav min 924:3461: 72px wide, padding 16, white, 1px `#F5F5F8` border, bottom-right radius 8; OG logo mark (31x48 vector) at top; tiles 40x40 (32px icon + 4px pad), radius 4, gap 8; active bg `rgba(0,82,104,.1)`; icons are custom Noun-Project SVGs (book, task, history x2), not stroke icons. Nav max 414:2752: 219px, Oscar Gruss wordmark, "Risk Arbitrage" 14 Medium `#7C8DAC` header, 12px labels, 32px icons, group "Open Deals" 12 Medium `#005268` on active tint, sub-items 12px (active: bg `#F5F5F8`, 3px `#005268` left border, radius 0 4 4 0), groups Closed Deals/History/Reports. | 56px wide, white, 1px `#E5E7EC` border, circular teal "OG" logo 32px, tiles 40x40 radius 6, active teal tint `rgba(27,140,140,.10)`, hand-drawn 18px 1.5px-stroke icons, hover teal ghost; no labelled/expanded nav. | WRONG | 72px rail; real OG mark; tile radius 4; active `#005268` @10%; use the Figma nav icons; add expanded nav + sub-item states. |
| 5 | **Tab bar** | Dashboard 414:2891: tab height 32, top radius 4, text 12px. Fixed tabs (Dashboard, Events Calendar) px24 Medium; deal tabs pl16 pr12 gap16 Regular with 16px lucide circle-x always visible. Active tab: bg `#F5F5F8`, 3px bottom border `#005268`, text `#005268` Medium. Inactive: 1px `#F5F5F8` border, black text. | Height 40, 14px, padding 0 16, transparent bg, 2px teal underline, active text `#1A1A28` 600, 10px x-glyph only on hover, no fixed/closable distinction, no border. | WRONG | Rebuild per Figma (boxed tabs, filled active, always-visible circle-x). |
| 6 | **Buttons** | Primary 766:3215: bg `#005268`, 1.5px `#005268`, white Geist Regular 12, h32, px24, radius 4; hover = +20% white overlay; disabled bg `#A8B6CD`. Outline: 1.2px black, black text, hover bg `#E5E7EC`, disabled border `#A8B6CD` (no fill). Outline green: 1.2px `#005268`, hover `#005268`@10%. Yellow 2293:7996: bg `#ECA100`@20%, text `#ECA100` Medium, hover @35%. Orange outline 2293:8005: 1.2px `#FF8132`, hover `#FF8132`@20%. Also seen: PDF chip (1.5px black, 16px pdf icon, h32), Join-the-meeting (bg `#3675D2`@20%, text `#3675D2` Medium, 16px zoom logo, h32 or h24), 32px bell/bookmark icon buttons. | `.btn` 36px, Inter 14/600, radius 6, no border on fills; `btn-dark` `#1A1A28`; `btn-brand` `#1B8C8C`; outline 1px `#E5E7EC` black-ish text, hover teal border; ghost teal; disabled `#D1D5DB`/`#9CA3AF` (outline disabled gets a grey fill); sm 32, lg 40/15px; hover = opacity .85; `:active scale(.98)`. | WRONG | Only primary-dark-green and outline exist in Figma; remove `btn-dark`/`btn-brand`/ghost as designed; add outline-green, yellow, orange-outline; fix size/radius/font/weight/border/hover/disabled; add icon-button and chip variants only as seen in Figma. |
| 7 | **Toggles and filter pills** | (a) Open/Closed segmented control 1526:6273 (also Day/Week/Month in calendar): container bg `#F5F5F8` radius 4 gap 1px; active segment bg `#005268`, white 12 Medium, px32 h32 radius 4; inactive black Regular with 1px white left border. (b) Pills 1526:6283: active "All" bg `#005268`@10%, 1px `#005268`, text `#005268` Medium, px24 py6 radius 16; inactive bg `#F5F5F8` no border, h28, pl16 pr4 gap8, black Regular 12, count = 20x20 circle bg `#E5E7EC`, 10px Medium `#7C8DAC`. (c) ON/OFF Toggle 1375:4132: 58x16, track `#179484` on / `#7C8DAC` off, 14px white knob, "ON" Medium / "OFF" Regular 12px label. | Segmented: dark `#1A1A28` active, white inactive with 1px grey border, radius 6, 12px 600. Pills: radius 999, white + 1px border inactive, solid teal + white text active, count as bold inline text. No ON/OFF toggle. | WRONG (segmented, pills); ON/OFF toggle missing | Rebuild segmented + pills per Figma; add count bubble; add ON/OFF switch. |
| 8 | **Search bar** | Main search (1567:4505 / 836:2572): h40, bg `#F5F5F8`, 1px `#E5E7EC`, radius 4, px12 gap8, 16px lucide search, placeholder "Search" Geist 16 `#7C8DAC`. Field variants: h32, 12px, white bg (per earlier read). | h36, white bg, radius 6, Inter 14, 14px hand-drawn icon at left 10px (pad-left 32), placeholder `#A0AABC` "Search deals, companies, acquirers...", focus teal border + 3px ring, `type=search`. | WRONG | h40 grey fill, 16px lucide icon, Geist 16, `#7C8DAC` placeholder; drop teal focus ring (Figma defines none). |
| 9 | **Form inputs** | Input 830:4470: white, 1px `#E5E7EC`, radius 4, h32, px12 py7, Geist 12, placeholder `#7C8DAC`; label 12 Regular `#A8B6CD`, 4px above; Password 2159:12814: h40, 1px `#E5E7EC`, 24px eye icon, states empty/filled hidden/filled visible. Only error state in file: Password in Admin External (red border seen in screenshot; message "Incorrect password" 10px Regular `#DA4D43`, 1895:21137). Date = calendar component 831:2591 (h32, lucide calendar 16, dd/mm/yyyy placeholder). Multiline = rich text editor 1687:7037 (toolbar, 1px `#E5E7EC` border), no plain textarea seen. | h36, bg `#F5F6F8`, radius 6, Inter 14, px16, placeholder `#A0AABC`; label 12/600 `#6B7896` +.03em tracking, 6px gap; focus teal border + ring + bg white; error red `#EF4444` + ring + 12px message (any input); `type=date` uses native browser calendar glyph and "15/01/2026" native control; plain textarea min 80px. | WRONG | White bg, h32, radius 4, px12, Geist 12, `#7C8DAC` placeholder, `#A8B6CD` 12 Regular label with 4px gap; custom calendar field with lucide icon; error = `#DA4D43` 10px message (password only evidenced); replace textarea with rich-text component; add password. Focus/hover states: not verifiable (none in Figma). |
| 10 | **Select** | Select 830:4456: white, 1px `#E5E7EC`, radius 4, h32, px12, justify-between, "Please Select" 12 `#7C8DAC`, 16px lucide chevron-down; label as input. Option list/dropdown panel not read. | Native `<select>`, bg `#F5F6F8`, radius 6, h36, Inter 14, CSS-border triangle (8x5px, `#A0AABC`) instead of an icon. | WRONG | White, h32, radius 4, Geist 12, lucide chevron-down 16. Custom open panel: not verifiable. |
| 11 | **Badges** | Status/type pills on All Deals 824:8212: h24, radius 16, px16 py4, 12 Medium, per-status colour = text colour on same colour at 20-25% alpha. Status: Predeal `#3090C0`@.25, Terminated `#DC432B`@.2, Proposal `#30B2C0`@.2, Definitive `#C1F0D5` bg/`#179484` text (solid), Withdrawn `#6074A0`@.2, Spinoff-Definitive `#A752A9`@.2, Did Not Happen `#4C7794`@.25, Post-Event `#ECA100`@.2, Not Available `#F5F5F8`/`#7C8DAC`. Type: Cash Merger `#CAD8F4`/`#4162A3`, Cash Tender `#C6226C`@.1, Stock Merger `#7541A3`@.2, Dutch Auction `#DC5E2B`@.2, Investment `#179475`@.2/`#179464`, Exchange Offer `#36A30F`@.2, Cash-Stock Merger `#4199A3`@.2. Deal header chips (1720:6523): h32, same radius, Definitive `#C1F0D5`/`#179484`, Cash Merger `#CAD8F4`/`#4162A3`. Industry chip `#C1ECF0`/`#008D9A`, Sector chip `#CAD8F4`/`#4162A3`, h32. Regulatory Risk is plain text: Low `#ECA100`, Medium `#FF8132`, High `#DA4D43`. | h22, radius 999, px10, Inter 12/600; five colour families (green `#16A34A`, teal, amber `#D97706`, red `#DC2626`, grey) with .10-.12 alpha. | WRONG | Re-derive from the Figma map above, h24/32, px16, Medium; add industry/sector chips and risk text colours. Dashboard table shows Status/Type as plain text, not pills. |
| 12 | **Deal list table** | Header component 1463:6126: h32, bg `#F5F5F8`, bottom 1px `#E5E7EC`, 1px `#E5E7EC` column dividers, cell pl8 pr12 py4, 12 Medium black (not uppercase), sort glyph 12x10 and 16px lucide funnel. Row 1463:6146: h32, white, bottom 1px `#E5E7EC`, 1px `#F5F5F8` column dividers, px8 py4; deal title 12 Medium `#005268` underlined always; dates 12 Regular black DD/MM/YYYY; status/type plain text. Deal-page events table 1720:6665: radius 8, 1px `#E5E7EC`, date col 10px. | `.data-table` th 12/600 uppercase `#A0AABC` +.72px tracking, td 14px, py8 px12 (about 39px rows), no column dividers, no header fill, row highlight teal ghost, title link teal `#1B8C8C` 500 no underline, dates 12px `#6B7896`, badges in status/type columns, no sort/filter icons. | WRONG | Rebuild: 32px rows, 12px, grey header, cell dividers, underlined `#005268` title, remove pills in Dashboard table, add sort/funnel icons. Highlighted row: not found in Figma. |
| 13 | **Cards / panels** | Dashboard panels: radius 8, 1px `#F5F5F8`, no shadow; panel header 48px, title 12 Medium `#005268`, optional outline-black button h28. Recent Updates panel bg `#E2E2E2`@25%, border `#F7F7F7`, radius 8; inner cards white radius 4. Only shadow in file: "Shadow" effect (5-layer `#5B6380`, low alpha) used on the user-menu dropdown (radius 8). Header avatar "SG": outlined circle, no fill (screenshot). | `.card` radius 6, 1px `#E5E7EC`, shadow-card, title 15/600 black, header pad 12/16; `.user-avatar` teal filled circle 32px, white initials. | WRONG | Radius 8, border `#F5F5F8`, no shadow, 12 Medium `#005268` titles; avatar = outlined circle. |
| 14 | **Accordion** | No accordion found. Searched all frames on page "final" for names accordion/collapse and screens Dashboard, Deal, All Deals, Calendar, New Deal, Admin. Deal page uses a right-hand anchor menu (1720:6537) and flat section titles; closest collapsible is a "Change Password" text link with chevron in Admin External (1895:21129). | Bordered 6px-radius panels, 14/600 header, rotating chevron, `border-top` body, demo with Conditions/Dates/Description. | NOT IN FIGMA | Remove, or replace with Figma's deal-detail anchor menu (see section 3). Caveat: page "drafts" (0:1) not searched. |
| 15 | **Deal info rows** | Label-over-value stacks (1720:6592): label 12 Regular `#7C8DAC`, value 12 Regular black, gap 2px; grid columns 100px; grouped under 12 Medium `#005268` headings ("Target", "Acquirer") inside a bordered card (1px `#A8B6CD`, radius 4) with `#F5F5F8` row dividers; "Total Deal Value" value Bold. Long text blocks: same label/value stack. | Horizontal key/value rows: label 140px min-width 12/500 `#6B7896`, value 14px `#1A1A28`, bottom 1px `#E5E7EC`, py8. | WRONG | Switch to stacked label/value grid, 12px, grey labels. |
| 16 | **Comment / update feed** | Deal comments (1720:6548): card 1px `#E5E7EC` radius 4, px24 py12 gap8; author 12 Medium `#4162A3` left, date 12 Regular `#7C8DAC` right; title 14 SemiBold black; body 12 Regular; no avatars; custom scroll bar 4px (track `#E5E7EC`, thumb `#A8B6CD`, radius 16). Dashboard Recent Updates (414:2805): white radius 4, pl20 pr16 py12 gap12; type icon (lucide calendar 16) + label "New Event/Comment" 12 `#179484` + age `#A8B6CD`; bell/bookmark 24px; ticker link 12 Medium `#3675D2` underlined; author `#005268`; title 12 SemiBold; body 12. | Teal filled 28px initials avatar, author 14/600, time 12px `#A0AABC`, text 14px, no cards. | WRONG | Rebuild as the two Figma card patterns; remove avatars. |
| 17 | **Event cards** | Upcoming Events card (414:3002): white, 1px `rgba(54,117,210,.05)`, radius 4, p16, gap8; ticker link 12 Medium `#005268` underlined; status right "Actual" `#3675D2` / "Expected" `#7C8DAC` 12; title 12 SemiBold black; body 12 Regular; Join-the-meeting button; time pill (bg `#FF8132`@10%, radius 2, 10px `#FF8132` + 32px bell). Panel header `rgba(54,117,210,.05)` bg; date strip 414:2974: tiles 40.9px wide, radius 5, py16 px8, day-name 12 / date 16; default `#F5F5F8`, selected bg `#3675D2`@10% + 1px `#3675D2` text `#3675D2` Medium, past dates `#A8B6CD`/`#7C8DAC`. | List of rows with large teal day number (18/700) over uppercase month, title 14/600, description 12px, bottom dividers. | WRONG | Replace with the Figma card + date strip + month calendar. |
| 18 | **PDF attachment card** | In Figma a PDF is a chip: 1.5px black outlined button, h32, pl12 pr16 gap8, 16px pdf icon + "Merger.pdf" 12 Regular (1720:6560, inside a comment card). No size/date metadata, no download button. | 36px red-tinted icon tile + 14/500 filename + 12px meta + Download outline button in 6px bordered card. | WRONG (pattern invented around a simple chip) | Replace by the chip; red tint/meta not evidenced. |
| 19 | **Toast** | None found. Searched names (toast/snack/alert/notif/popup) and texts (saved/success/error/failed/confirm/delete) across page "final"; only hit was "Incorrect password". | Bottom-center toast, dark `#1A1A28`, green `#16A34A` / red `#DC2626` variants, 3s auto-hide. | NOT IN FIGMA | Remove or flag as undefined. Caveat: "drafts" page not searched. |
| 20 | **Section labels** | Sentence case 12 Medium: panel/section titles `#005268` ("All Deals" 14 Medium underlined, "Dates Summary", "Comments"); sub-headings `#7C8DAC` ("Target", "Acquirer", "Change Password"); field labels `#A8B6CD` Regular; action links `#FF8132` underlined ("Edit Events", "Reset All"). | Uppercase 12/700 +.72px tracking in `#A0AABC` or teal; three variants. | WRONG | Drop uppercase/tracking/bold; use the four Figma label colours. |

## 3. Figma components/patterns missing from ours

Components page (924:3460):
1. Checkbox (6 states incl. "all", disabled): 16px, radius 2, 1px `#A8B6CD` empty, `#005268` fill when checked, 12px label (754:2943)
2. Radio buttons: 12px circle, 1px `#A8B6CD`, active filled, 12px label (754:2937)
3. ON/OFF Toggle (1375:4132)
4. Calendar / date field, single and from-to, with and without label (831:2591)
5. DAY cell component for the month calendar, 10 variants incl. weekend, prev/next month, expanded (553:547)
6. Scroll bar, 4px (838:2609)
7. Rich text editor (1687:7037)
8. Password field with eye toggle, 3 states (2159:12814)
9. Outline-green button (836:2656)
10. Yellow button (2293:7996)
11. Orange outline button (2293:8005)

Screens:
12. Collapsed nav with OG logo and expanded nav with labels, header and sub-items (414:2752, 924:3461, 414:2723 "Nav open" not read)
13. Open/Closed deals top-level tab pair and closable circle-x tabs
14. A-Z letter index (24px column, 12 Medium; active letter bubble `#3675D2`@10% radius 24, 16px `#3675D2`) (1541:3215)
15. Month / week / all-events calendar views (721:2257, 721:2388, 721:2481), Day/Week/Month toggle, "Selected Event" side panel
16. Events date strip (414:2974)
17. Upcoming Events card with Join-the-meeting and time pill (414:3002)
18. Recent Updates feed cards with bell/bookmark (414:2805)
19. Deal header: title + slash-name, status chips h32, Edit Deal, bell and bookmark icon buttons (1720:6521)
20. Deal-page anchor menu (Deal Terms, Conditions, Dates Summary, Description of Deal, Disclaimer), active = bg `#F5F5F8` + 2px black left border, 12px `#7C8DAC` (1720:6537)
21. Industry and Sector chips (1720:6741)
22. Events table with Actual/Expected status text and "Edit Events" orange link (1720:6661)
23. Dividend two-column table, Disclaimer block (1720:6770)
24. All Deals filter sidebar: Filters/Reset All, checkbox groups, "Time to close" slider, Regulatory Risk checkboxes (824:8581)
25. Sort-by select, sort-direction and view-toggle icon buttons, "New Deal" button (824:8212)
26. Expanded table row with description + sparkle icon, Regulatory Risk coloured text, Deal Value bold, calendar and comment count icons
27. User avatar menu dropdown (Account Settings / Log out, 16px, radius 8, "Shadow" effect) (1895:21153)
28. Account Settings page: left tab "Profile Information" (14 SemiBold `#005268`), password-rules grey box (`#F5F5F8`, radius 4, 10px)
29. Login family (2159:13746): dark-teal network background, white card, OG wordmark + "Risk Arb DB", username/password, "Forgot Password?" link, outline-green "Sign In", 6-box OTP code input, Resend Code link, Forgot Password form
30. New Deal form (1868:10765 and variants): two-column labelled inputs with currency selects, rich-text sections, Events entry table, "Deal Preview" ON toggle, footer buttons (Cancel, Save as a Draft, Add New Deal), live preview panel
31. Admin Internal / Admin External screens (1895:17439, 1895:21099), not read in detail
32. Error text style for password ("Incorrect password", 10px `#DA4D43`) and red input border
33. Time pill with bell (414:3019), Zoom "Join the meeting" button

## 4. Invented by us (not in Figma)

- Accordion component (whole section)
- Toast (all three variants)
- Dark `#1A1A28` primary button and teal "brand" button; ghost button; `btn-link`; `btn-icon` hover teal; lg 40px and 36px sizes
- Plain textarea; generic input error with ring; teal focus ring and teal borders on focus/hover everywhere
- Comment avatars (28px teal initials circle), filled teal user avatar
- Large teal day-number "event-date-block"
- PDF card with red tile, file meta and Download button
- Card shadow tokens (card, card-lg, dialog, dropdown, focus); only one shadow exists in Figma
- Uppercase letter-spaced label styles; `.card-section-label` / `.section-label-brand`
- Teal highlighted table row / teal row hover
- Tab hover x reveal; `:active scale(.98)`; opacity hover on buttons

## 5. Foundation mismatches

| Token | Ours | Figma |
|---|---|---|
| Font | Inter (Google Fonts) | Geist Regular/Medium/SemiBold (+Bold once) |
| Base size | 14px / 1.5 | 12px |
| Brand | `#1B8C8C` | `#005268` |
| Text | `#1A1A28` | `#000000` |
| Secondary / tertiary | `#6B7896` / `#A0AABC` | `#7C8DAC` / `#A8B6CD` |
| Page bg | `#F5F6F8` | white page; `#F5F5F8` used as fills (header, inactive pill, active tab, inputs-adjacent) |
| Border | `#E5E7EC` | `#E5E7EC` (match); also `#F5F5F8` for row/panel borders, `#A8B6CD` for the deal-terms card |
| Radius | 6px | 4px (2/5/8/16/24 as noted) |
| Control height | 36 default | 32 default |
| Positive / negative / warning | `#22C55E` / `#EF4444` / `#D97706` | green `#179484` (also `#3B951A` per earlier read), red `#DA4D43`, yellow `#ECA100`, orange `#FF8132` |
| Links | teal | `#005268` (table, event card), `#3675D2` (updates, status), `#4162A3` (comment author) |
| Icons | hand-drawn 14-18px strokes, tiny x glyph | Lucide (chevron-down 16, search 16, calendar 16, circle-x 16, bell/bookmark 24-32, funnel 16, eye 24) plus Noun-Project nav icons 32 and pdf icon |
| Shadows | 6 tokens | 1 effect, only on menu dropdown |
| Hover | opacity .85 / teal border | overlay (+20% white) or tinted fill |
| Disabled | `#D1D5DB` fill / `#9CA3AF` text, also on outline | `#A8B6CD` fill (filled) or `#A8B6CD` border with no fill (outline) |

## 6. Prioritized fix list

1. Rewrite tokens: Geist 12px, `#005268`, greys `#F5F5F8/#E5E7EC/#7C8DAC/#A8B6CD`, black text, 4px radius, 32px controls, blue/orange/yellow/red/green. Everything else inherits this.
2. Rebuild controls to Figma spec: primary + outline + outline-green + yellow + orange-outline buttons (h32, Regular 12, 1.2/1.5px borders, tint hovers); input/select/search/calendar/password (white, h32, `#7C8DAC` placeholder, lucide icons); add checkbox, radio, ON/OFF toggle.
3. Rebuild navigation: 72px rail with OG mark, Noun-Project icons and `#005268`@10% active; expanded nav with sub-items; boxed closable tabs (active `#F5F5F8` + 3px `#005268`).
4. Rebuild data display: bordered 32px table with grey header, dividers, funnel/sort icons, A-Z index, Open/Closed segmented control, filter pills with count bubbles, the full badge colour map, industry/sector chips.
5. Replace invented patterns with the real ones: deal info grid, stacked comment cards, Recent Updates and Upcoming Events cards, date strip, PDF chip, Deal-Terms anchor menu; delete accordion and toast (or mark "undefined in Figma").
6. Add missing screens/patterns: month calendar (DAY cells), All Deals filter sidebar, login card with OTP, user menu with Shadow effect, rich text editor, scroll bar.
7. Rewrite CLAUDE.md and components.md "non-negotiables" (Inter, 6px, `#1B8C8C`, dark button, uppercase labels, no-text sidebar) because they actively instruct agents to build the wrong UI.

## 7. Not verified / limits

- Hover, focus, active and pressed states other than buttons (Figma defines none for inputs, tabs, pills, rows); I did not infer any.
- Page "drafts" (0:1), "Nav open" 414:2723, Events Calendar week/all-events, Admin Internal, New Deal form field-level specs, the Day/Week/Month toggle, bell/bookmark icon-button states, the user-menu item hover, and the red error border hex on the password input were seen in screenshots or listed but not read value-by-value.
- Highlighted table row and a generic textarea were not found; I cannot say whether they exist elsewhere.
- tokens.json/tokens.css were not diffed line by line; our values come from components.css, CLAUDE.md and computed styles in the browser.

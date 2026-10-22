# OG Risk Arb - asset manifest (icons, logos, raster)

Source: Figma file `VlOfBG6fJt7ijm0iKasAMP`, page "final" (48:850) SECTION "Section 1" (2496:2003) + Components page (924:3460).
Every SVG here is a byte-for-byte Figma export (`exportAsync SVG_STRING`, verified by hash after writing) or a Figma MCP `svgAssets` download
(those carry `preserveAspectRatio="none" overflow="visible" style="display:block"` wrapper attrs and `id=` attrs, path data identical).
Nothing was redrawn. `<name>.currentColor.svg` = same file with the single stroke/fill colour replaced by `currentColor` (Figma frame-border mask artefact removed where noted).
Gradient SVGs use ids like `paint0_linear_...`: if you inline two of them in one HTML page, ids must stay unique (they are, per file).
Brand tokens seen: teal `#005268`, grey-blue `#7C8DAC`, orange `#FF8132`, blue `#3675D2`, red `#DA4D43`, green-teal `#179484`, purple `#7541A3`, sky `#3090C0`, light grey-blue `#A8B6CD`, divider `#E5E7EC`, bg `#F5F5F8`.

NOTE: icon frames in Figma are *frames* (lucide/xxx) - exports keep the frame box (so glyph is positioned inside 16/20/24/32 box) and include the frame fill/tint rect when the frame has one (listed under "bg").

## 1. Logos / brand

| file | Figma name | node id | size | colours | used where | CSS |
|---|---|---|---|---|---|---|
| og-wordmark.svg | `logo` (path "Path 1814") | 414:2725 (also 2044:6399, 2139:8236) | 72x40 (72.0027) | linear-gradient #005268 > #1B9D83 (0.36) > #3675D2 (0.72) > #00C7CE, x1=66 y1=6.25 x2=34.8 y2=67.4 userSpace | Nav open / Nav max header (Frame 27 wrapper) | render at 72x40; no recolor |
| og-wordmark-login-132x72.svg | `logo` vector | 2159:13752 (+7 more on Log In/Forgot/Auth) | 132x72 | same gradient (own coords) | login/forgot/auth screens | 132x72; NOT a CSS-scaled copy - separate path coords |
| og-mark.svg | `Frame 28` > "Path 1814" (OG monogram) | 2139:8213 (same path as 1895:21102 Frame 27 in Admin External) | 26x40 in a 40x40 frame | same gradient | Nav min (collapsed), Admin External header | 26x40 centred in 40x40. Nav-min Dashboard variant is `Frame 27` 40x64 holding `logo` 40x48 / path 31x48 (same ratio, larger) - same artwork scaled 1.2x |

## 2. Navigation icons (sidebar)

| file | Figma name | node id | size | colours | used where | CSS |
|---|---|---|---|---|---|---|
| noun-book.svg (+cc) | `noun-book-7649981 1` | 414:2729 | 32 | fill #005268 | nav item 1 (all screens) | 32px, #005268 |
| noun-complete-task.svg (+cc) | `noun-complete-task-1854454 2` | 414:2736 | 32 | fill+stroke #005268, stroke 0.5 | nav item 2 | 32px, #005268 |
| noun-history-1.svg (+cc) | `noun-history-7815843 1` | 414:2748 | 32 | fill+stroke #005268, stroke 0.4 | nav item 3/4 (two layers) | stack with history-2, 32px, #005268 |
| noun-history-2.svg (+cc) | `noun-history-7815843 2` | 414:2743 | 32 | fill+stroke #005268, stroke 0.2 | nav item 3/4 (layer) | stacked on history-1 |
| nav-item-book-active-40.svg | `Frame 174` (Nav min instance) | I2044:6454;414:3310 | 40 | tint rect #005268@10% rx4 + glyph #005268 | Nav min: icon in 40x40 tinted rounded square (frames 174/175/178/179 = book / complete-task / history x2 same pattern) | 40x40 box, radius 4 |
| nav-book-grey-32.svg (+cc) | `noun-book-7649981 4` | 461:3441 | 32 | fill #7C8DAC | Search screen sidebar (inactive) | 32px, #7C8DAC |
| nav-calendar-32-grey.svg (+cc) | `noun-book-7649981 3` (really a calendar glyph - mis-named) | 461:3447 | 32 | stroke #7C8DAC, 1.2 | Search screen sidebar | 32px, #7C8DAC, stroke 1.2 |
| nav-comment-32-grey.svg (+cc) | `noun-book-7649981 2` (really a message-square - mis-named) | 461:3453 | 32 | stroke #7C8DAC, 1.2 | Search screen sidebar | 32px, #7C8DAC |
| chevron-up-24-nav.svg (+cc) | `lucide/chevron-down` (rendered pointing UP) | 414:2733 (#005268) / 414:2740 (#000000) | 24 frame, glyph 9x4 at x 0.75 | stroke #005268 (also #000000 in one variant), 1.5 | Nav open/max: section expander. Path M0.75 14L4.75 10L8.75 14 | 24px; #005268 expanded, #000 on 414:2740 |

## 3. Lucide + utility icons (per-context colour measured from Figma)

| file | Figma name | node id (example) | size | original colour | used where | recommended CSS |
|---|---|---|---|---|---|---|
| chevron-down-16.svg (+cc) | `lucide/chevron-down` 16 | 461:3419 | 16 | stroke #000000, 1px, path M3 6L8 11L13 6 | Search screen (x3 + Search comp.) | 16px, black, stroke 1 |
| chevron-down-16-select.svg (+cc) | `lucide/chevron-down` 16 | 830:4451 (Select); 824:8668, 1720:6367, I1868:10088;830:4451 | 16 | stroke #005268, **1.2**, path M2 6L8 12L14 6 | Select component (all form selects, filters in All Deals/Drafts/Deal/New Deal) | 16px, #005268, stroke 1.2 |
| chevron-up-12.svg (+cc) | `lucide/chevron-down` 12 (up shape) | 1895:21130 | 12 | stroke #7C8DAC 1.2 | Admin External row toggle | 12px, #7C8DAC |
| chevron-right-6x10.svg (+cc) | `Vector` | 2139:8211 | 6x10 | stroke #A8B6CD 1.5 | Group 212/215 (breadcrumb/collapse arrow) | 6x10, #A8B6CD |
| chevrons-updown-10x18-stepper.svg (+cc) | `Frame 1000001121` (2x lucide/chevron-down 8px) | 1868:10119 | 8x18 (export 10x18) | stroke #005268 1.2 | New Deal number-input stepper (x6) | 8px chevrons #005268 |
| search-16.svg (+cc) | `lucide/search` 16 | I1567:4505;29:1335 (14 instances) | 16 | stroke black 1 | Search input in every screen header | 16px, black |
| search-13-component.svg (+cc) | `lucide/search` 12x12 frame (glyph 13) | 836:2566 | 12 | stroke black 1 | Components page "search" (Search/40 variant) | 12px black (see inconsistencies) |
| calendar-16.svg (+cc) | `lucide/calendar` 16 | 414:2809 | 16 | stroke **#179484** | Dashboard Recent Updates (event date) (x3 Dashboard, x3 Search) | 16px #179484 |
| calendar-16-component.svg (+cc) | `lucide/calendar` 16 | 831:2579 | 16 | stroke **#005268** | date input / calendar component, Events pages, Deal, New Deal | 16px #005268 |
| (same geometry) | `lucide/calendar` 16 | 414:2847 | 16 | stroke #7C8DAC | Dashboard Recent Updates secondary date | recolour calendar-16.currentColor.svg to #7C8DAC |
| (same geometry) | `lucide/calendar` 16 | 824:8256, 1988:6777, 1988:5796 | 16 | stroke #7541A3 | All Deals / Drafts event-date tag | recolour to #7541A3 |
| circle-x-16.svg | `lucide/circle-x` | 414:2898 (39 inst.) | 16 | bg rect #E5E7EC rx8 + x stroke black 1 | clear (x) in every search/filter chip | 16px, bg #E5E7EC, glyph black |
| funnel-16.svg (+cc) | `lucide/funnel` | 1615:4796 | 16 | stroke #7C8DAC 1 | Table header filter (Description) | 16px #7C8DAC |
| funnel-13x13.svg (+cc) | `Vector` filter | 1615:4799 (9 inst.) | 13 | stroke #7C8DAC 1 | Table header filter (Status etc.) | 12px #7C8DAC |
| sort-arrows-13x11.svg (+cc) | `Vector` arrow-up-down | 1615:4418 (6 inst.) | 13x11 | stroke #7C8DAC 1 | Table header sort | 12px #7C8DAC |
| arrow-up-down-32-button.svg (+cc glyph) | `lucide/arrow-up-down` | 824:8670 | 32 | bg #F5F5F8 rx4 + stroke black 1 | All Deals/Drafts toolbar sort button | 32px box, glyph black |
| list-chevrons-toggle-64x32.svg | `Frame 1000000953` (list-chevrons-down-up / up-down toggle) | 824:8673 | 64x32 | bg #F5F5F8; off glyph #7C8DAC 1.2; on = #005268@20% fill + #005268 stroke | expand/collapse-all segmented toggle (All Deals expanded/collapsed, Drafts) | 2 x 32px segments |
| rotate-ccw-20.svg (+cc) | `lucide/rotate-ccw` 20 | I1868:10167;1687:6961 | 20 | stroke black 1 | rich-text toolbar undo (x6/x18) | 20px black |
| rotate-ccw-18-login.svg (+cc) | `lucide/rotate-ccw` 16 | 2159:13841 | 16 (export 18) | stroke black 1 (disabled variant 2159:13865 = #A8B6CD) | login (resend/refresh) | 16px black; disabled #A8B6CD |
| eye-24.svg (+cc) | `lucide/eye` | I1895:21136;29:1242 | 24 | stroke **#DA4D43** | Admin External password (error state) | 24px #DA4D43 |
| eye-24-hidden-state.svg (+cc) | `lucide/eye` | 2159:12811 (Password "filled hidden") | 24 | stroke #005268 | Password component default | 24px #005268 |
| eye-off-24-visible-state.svg (+cc) | `lucide/eye` (slashed) | 2159:12850 (Password "filled visible") | 24 | stroke #005268 | Password component revealed | 24px #005268 |
| square-user-round-24.svg (+cc) | `lucide/square-user-round` | 1895:21156 | 24 | stroke #7C8DAC 1.2 | Admin External user menu | 24px #7C8DAC |
| log-out-24.svg (+cc) | `lucide/log-out` | 1895:21161 | 24 | stroke #DA4D43 1.2 | Admin External logout | 24px #DA4D43 |
| panel-left-16.svg (+cc) | `Frame 1000001125` | 2044:6395 (2044:6403) | 16 | fill #7C8DAC | Nav open/max sidebar toggle | 16px #7C8DAC |
| square-arrow-out-up-right-10.svg (+cc) | `lucide/square-arrow-out-up-right` | 414:2860 (414:3097) | 16 | stroke #3675D2 1 | Dashboard external-link next to "MISC2/" (Frame 193 64x16) | 16px #3675D2 |
| checkbox-checked-16.svg | Checkbox `selected` | 754:2929 | 16 | rect #005268 rx2 + white check 1.5 | Checkbox component | 16px |
| checkbox-indeterminate-16.svg | Checkbox `all` | 770:3265 | 16 | rect #005268 rx2 + white dash 1.5 | table select-all (64 inst.) | 16px |
| radio-dot-active-12.svg | radio `active` | 754:2925 | 12 | ring #005268 + dot r4 #005268 | radio component | 12px |
| avatar-circle.svg (+cc) | `user-circle-02-duotone-rounded 1` vector | 1567:4506 | 40 frame / 32 circle (export 33.5) | stroke black 1.5 | header avatar (initials "SG" are live text) | 40px circle border black 1.5 |

## 4. Event/deal-card icons

| file | Figma name | node id | size | colour | used where | CSS |
|---|---|---|---|---|---|---|
| bell.svg (+cc, mask artefact removed in cc) | `lucide/bell` 32 | 414:3021 (x8) | 32 frame, glyph 12x13 | stroke #FF8132 1 | Dashboard/Search/Deal/Deal Edit: alert toggle (outline) | 32px #FF8132 |
| bell-notify-24.svg | `Frame 185` | 414:2813 (x4) | 24 | tint rect #FF8132@10% rx2 + filled bell fill/stroke #FF8132 | Recent Updates, notification state | 24px box |
| bell-14x16-orange.svg (+cc) | `Vector` | 1988:6785 (x21) | 14x16 | stroke #FF8132 1 | Drafts/All Deals rows | 14px #FF8132 |
| bookmark-24-blue.svg | `lucide/bookmark` 24 (downloaded) | 414:2831 | 24 | tint rect #3675D2@10% rx2 + fill #3675D2 | Recent Updates | 24px |
| bookmark-32-active.svg | `lucide/bookmark` 32 | 1720:6155 (1720:6534) | 32 | tint #3675D2@10% + 1px border #3675D2 rx1.5 + fill #3675D2 | Deal / Deal Edit header bookmark toggle | 32px |
| bookmark-12x15-blue.svg (+cc) | `Vector` | 1988:6786 (x21) | 12x15 | fill #3675D2 | table rows | 12px #3675D2 |
| zoom-logo.svg | `zoom logo` | 414:3014 (x17) | 16 | fill #3675D2 (+#FEFEFE) - video camera | event "Zoom" link | 16px, no recolor |
| logo-red-bars.svg | `logo` 16 | 721:2655 | 16 | fill #EE3329 | All events: third-party link button (brand not identified) | 16px |
| noun-pdf.svg | `noun-pdf-5435919 1` | 1720:6182 (x2) | 16 | fill #CC1515, white inner shapes | Deal: PDF attachment | 16px |
| noun-ai-sparkle.svg | `noun-ai-6895113 1` | 824:8266 (x8) | 16 | gradient #005268>#1B9D83>#3675D2>#00C7CE | All Deals: AI badge | 16px |
| noun-edit-24.svg (+cc glyph) | `noun-edit-8205831 1` | 1988:5804 (x21) | 24 | fill #FF8132 | Drafts row edit | 24px |
| trash-24.svg (+cc glyph) | `Frame 1000001086` | 1988:5806 (x21) | 24 | fill #DA4D43 | Drafts row delete | 24px |
| (not exported separately) comment bubble | `lucide/calendar` 16 mis-named, geometry = message-square | 824:8260 | 16 | stroke #3090C0 | comment count tag (x10, x21 on Drafts) - export via node 824:8259 only as composite with outlined text; glyph path is in section 5 below | 16px #3090C0 |

Comment-bubble path (824:8259 export, verbatim): `M15 10.844C15 11.1791 14.8525 11.5005 14.5899 11.7374 ... Z` stroke #3090C0 - re-export node 824:8260 if needed (frame 16x16).

## 5. Rich-text toolbar (Components page 1687:7037, used on Deal Edit / New Deal, 9 instances)

format-bold/italic/underline/strikethrough-20 (1693:7100/7106/7108/7104 fill black), align-left/center/right/justify-20 (1693:7120/7122/7126/7124), list-unordered/ordered-20 (1693:7118/7116), link-20 (1687:7000), sheet-20 (1687:7005), code-xml-20 (1687:6991), expand-20 (1687:7014), pilcrow-34x20 (1687:6966 - 34 wide cell incl. 1px #E5E7EC right divider, stripped in cc). All stroke/fill black, 20px, strokes 1px. Recommended: 20px, black (#000), in toolbar cells.

## 6. Raster (not SVG)

| file | node | description |
|---|---|---|
| login-background-1.jpg | image fill "59271 1" 1436x1436 on Log In (2159:13748), Log In 2 (2159:13763), Forgot Password 1440 (2159:13804), Auth (2159:13820), Auth 2 (2159:13844) | 4096x4096 JPEG source, 9.2 MB. |
| login-background-2.jpg | second image found in same node subtree | 512x512 JPEG, 200 KB (likely the one actually displayed behind/over; verify visually) |

Illustrations: none other than the login background (no SVG illustrations in the file).

## 7. Not exported / gaps

- `Frame 282` (414:2850), `Frame 193` (414:3095): composites of icons above + text (bookmark-24 + bell-notify; MISC2 label + square-arrow) - build from parts.
- Nav-min 40x40 tinted variants of complete-task / history icons (I2044:6454;414:3313/3316/3319): same glyphs as section 2 inside the same tinted rect as nav-item-book-active-40.
- Hidden instances `Icon` (plus 721:2263, chevron-down 721:2265, 20px in "Button Master") have visible=false: nothing to export.
- Password-dots (`Ellipse 11-20`, 4x4 / 6x6 #005268 / #000) are shapes not icons; "Ellipse 12" 40x40 #D9D9D9 (2139:8210) = avatar placeholder; initials "SG" are text.
- Filled check/unchecked checkbox states: unchecked = 16 rect white fill + #E5E7EC border (no glyph).
- Figma MCP rate limit was hit once mid-run (resumed OK); any node not listed above was not inspected individually.

## 8. Inconsistencies in the design

1. Chevron: nav 24px (up shape, 1.5 stroke, #005268 or #000), Search 16px (black, 1 stroke, M3 6L8 11L13 6), Select 16px (#005268, 1.2 stroke, M2 6L8 12L14 6), Admin 12px #7C8DAC 1.2, stepper 8px #005268 1.2. Layer name is always "lucide/chevron-down" although some render pointing up.
2. Search icon: 16px black in Section 1, 12px frame (13px glyph) black on Components page.
3. Calendar icon: five colours depending on context (#179484, #7C8DAC, #005268, #7541A3, #3090C0); the #3090C0 one is a comment bubble but is named lucide/calendar.
4. noun-book-7649981 2/3/4 are comment / calendar / book glyphs at 1.2 stroke (Search sidebar), unlike the 5 nav icons that are filled #005268.
5. Stroke widths drift: lucide 1px default vs 1.2 (nav inactive, select, log-out) vs 1.5 (nav chevron, avatar, chevron-right).
6. Bell appears 3 ways: outline 32 (#FF8132 1px), filled in tinted 24 box, 14x16 plain outline in tables.
7. Bookmark appears 3 ways: 32 box with border, 24 tint box, 12x15 bare fill.
8. Two "logo" sizes for the OG mark (26x40 vs 31x48 path) and two wordmark sizes (72x40 vs 132x72 separate path).
9. Frame exports for bell/pilcrow contain a 1px "inside stroke" mask artefact (white or #E5E7EC edge) - cleaned only in `.currentColor.svg`.

## 9. Derived assets (stage 2) - NOT Figma exports
Path data copied byte-for-byte from the exports above; only paint/viewBox changed so they can be used as CSS masks.
| file | derived from | change |
|---|---|---|
| x-16.currentColor.svg | circle-x-16.svg | x path only, stroke currentColor (coloured removable pills) |
| bell-filled-24.currentColor.svg | bell-notify-24.svg | tint rect removed, fill/stroke currentColor (filled "active" bell) |
| bookmark-outline-12x15.currentColor.svg | bookmark-12x15-blue.currentColor.svg | same path as 1px stroke, no fill, viewBox padded by 0.5 (inactive bookmark, 1988:6786) |
| list-chevrons-down-up-32.currentColor.svg / list-chevrons-up-down-32.currentColor.svg | list-chevrons-toggle-64x32.svg | left / right glyph path, viewBox cropped to one 32x32 segment, stroke currentColor (view-density segments; the composite only drew one state) |

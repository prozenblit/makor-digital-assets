# makorx-ai/design-system/assets - MANIFEST

Source: `makor-hr/employees.html` (inline SVG markup). Every file is the VERBATIM markup of one inline SVG from the app (attributes, paths, stroke-width unchanged). The ONLY edits: (1) added `xmlns="http://www.w3.org/2000/svg"` (required for a standalone file; the HTML parser supplies it inline), (2) removed `class`/`onclick` attributes. Nothing was redrawn or hand-written.

**Stage-3 fix (proven bug)**: `logo-mark.svg` as extracted from L1728 lacked the closing `</g>` of its outer `<g clip-path="url(#ce)">` (the HTML parser tolerates it inline; as a standalone SVG/`<img>` it failed to parse and rendered as a broken image). `</g>` was inserted before `<defs>`; all 49 SVGs now parse as XML.

Monochrome icons use `stroke="currentColor"` and are consumed through the mask utility in `components.css` (`<span class="icon icon-NAME icon-16"></span>`: colour = `color`). Coloured artwork (`logo-mark.svg`) is used with `<img>`. Icon sizes are an explicit `.icon-NN` modifier (the app sets size via the SVG width/height attribute; stroke scales with the viewBox exactly as inline).

| file | CSS class | source line(s) in employees.html | uses in app | role |
|---|---|---|---|---|
| `apps-launcher.svg` | (inline `.nav-apps-icon`) | L1727 | 1 | nav apps launcher (INLINE ONLY in dark mode: dark = filled circles, see .nav-apps-icon) |
| `moon.svg` | `.icon-moon` | L1753 | 1 | profile dropdown dark-mode row |
| `plus.svg` | `.icon-plus` | L1790 | 2 | New Employee / New Pool / + Add (14px, stroke 2) |
| `search.svg` | `.icon-search` | L1797 | 4 | toolbar search icon |
| `chevron-down.svg` | `.icon-chevron-down` | L1801 | 14 | cust-select chevron (16px, stroke 1.5) |
| `user.svg` | `.icon-user` | L1861 | 1 | detail empty state (40px, stroke 1.5) |
| `calendar-light.svg` | `.icon-calendar-light` | L2023 | 1 | timesheet placeholder (32px, stroke 1.5) |
| `calendar-dots.svg` | `.icon-calendar-dots` | L2074 | 1 | time tracking empty state (36px) |
| `briefcase.svg` | `.icon-briefcase` | L2129 | 2 | pool empty state (40px) |
| `phone.svg` | `.icon-phone` | L2151 | 1 | sidebar contact phone (14px) |
| `mobile.svg` | `.icon-mobile` | L2155 | 1 | sidebar contact mobile |
| `mail.svg` | `.icon-mail` | L2159 | 1 | sidebar contact mail |
| `pencil.svg` | `.icon-pencil` | L2163 | 1 | sidebar role |
| `calendar-compact.svg` | `.icon-calendar-compact` | L2171 | 7 | sidebar hire date / balance cards (path variant) |
| `star.svg` | `.icon-star` | L2210 | 3 | upcoming time off |
| `chevron-down-sm.svg` | `.icon-chevron-down-sm` | L2340 | 4 | phone-code arrow (12px, stroke 2.5) |
| `calendar.svg` | `.icon-calendar` | L2434 | 5 | datepicker input icon (16px, stroke 2) |
| `chevron-left.svg` | `.icon-chevron-left` | L2440 | 5 | datepicker prev |
| `chevron-right.svg` | `.icon-chevron-right` | L2444 | 5 | datepicker next |
| `search-line.svg` | `.icon-search-line` | L2604 | 1 | directory search (line variant) |
| `chevron-left-bold.svg` | `.icon-chevron-left-bold` | L2634 | 1 | wfh month prev (polyline) |
| `chevron-right-bold.svg` | `.icon-chevron-right-bold` | L2636 | 1 | wfh month next (polyline) |
| `arrow-up-right.svg` | `.icon-arrow-up-right` | L2761 | 3 | balance card action |
| `calculator.svg` | `.icon-calculator` | L2762 | 2 | balance card calculator action |
| `home.svg` | `.icon-home` | L2766 | 2 | balance/home (path with arcs) |
| `activity.svg` | `.icon-activity` | L2775 | 2 | balance card (polyline pulse) |
| `plus-bold.svg` | `.icon-plus-bold` | L2798 | 3 | small primary buttons (13/12px, stroke 2.5) |
| `user-sm.svg` | `.icon-user-sm` | L3180 | 1 | calc/time-off category icon |
| `heart.svg` | `.icon-heart` | L3181 | 1 | time-off category icon |
| `briefcase-sm.svg` | `.icon-briefcase-sm` | L3182 | 1 | time-off category icon |
| `book-open.svg` | `.icon-book-open` | L3183 | 1 | time-off category icon |
| `close.svg` | `.icon-close` | L3203 | 5 | modal-close (16px, stroke 2) |
| `check.svg` | `.icon-check` | L3229 | 2 | wfh day box + success icon (polyline, stroke 2.5) |
| `chevron-down-md.svg` | `.icon-chevron-down-md` | L3295 | 1 | time-off/calc category select chevron (16px, stroke 2) |
| `sort-unsorted.svg` | `.icon-sort-unsorted` | L3601 | 1 | table sort icon (unsorted) |
| `sort-asc.svg` | `.icon-sort-asc` | L3602 | 1 | sort ascending |
| `sort-desc.svg` | `.icon-sort-desc` | L3603 | 1 | sort descending |
| `request-annual.svg` | `.icon-request-annual` | L3815 | 2 | request type: annual leave |
| `request-sick.svg` | `.icon-request-sick` | L3816 | 2 | request type: sick leave |
| `request-wfh.svg` | `.icon-request-wfh` | L3817 | 1 | request type: WFH |
| `request-location.svg` | `.icon-request-location` | L3818 | 2 | request type: remote office / location |
| `pool-holder.svg` | `.icon-pool-holder` | L4411 | 1 | pool badge: holders (20px) |
| `pool-members.svg` | `.icon-pool-members` | L4412 | 1 | pool badge: members (22x20) |
| `close-bold.svg` | `.icon-close-bold` | L4511 | 3 | tt-fillall-close / inline remove (stroke 2.5) |
| `pin-qcard.svg` | `.icon-pin-qcard` | L4731 | 1 | quick card location row (no width/height in source) |
| `reports-to.svg` | `.icon-reports-to` | L4734 | 1 | quick card second row (no width/height in source) |
| `copy.svg` | `.icon-copy` | L4758 | 2 | quick card copy action (no width/height in source) |
| `mail-envelope.svg` | `.icon-mail-envelope` | L4761 | 1 | quick card mailto action (no width/height in source) |
| `logo-mark.svg` | (img) | L1728 | 1 | MAKOR X.AI brand tile 32x32 (coloured, use as <img>; same artwork light+dark) |

## Inline-only artwork
- `apps-launcher.svg`: stroke is hard-coded `#1a1a1a` (light). In dark mode the app does NOT recolour the stroke - it switches the circles to filled (`.nav-apps-icon circle{fill:rgba(255,255,255,0.55);stroke:none}`, L1058). Use the inline markup in components.md with class `.nav-apps-icon`; the file exists as the verbatim record.
- `logo-mark.svg`: contains blurred blobs (feGaussianBlur 4.3) clipped to the 32x32 rx4 tile; identical in light and dark.

## Inline SVGs deliberately NOT extracted (duplicates / unusable)
- #1d4ed8-stroked calendar (static request modal tile): same geometry as request-annual, hard-coded stroke
- #7c3aed-stroked pin: same geometry as request-location, hard-coded stroke
- tt approved tag check (path form): same geometry as check
- directory mail 13px: same as mail
- directory phone 13px: same as phone
- directory user 13px: same as user
- home outline, stroke inherited from wrapper (no stroke attr)
- briefcase outline, stroke inherited from wrapper (no stroke attr)

## Not icons
The app has no icon font/sprite. Emoji are used in a few places (reminder icons, phone flags) and are text, not assets.

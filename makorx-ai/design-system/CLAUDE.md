# MakorX.AI HR — Design System (agent brief)

Load this file first for ANY work on the MakorX.AI HR platform (`makor-hr/`). Every statement is proven by the built app `makor-hr/employees.html` ("src: L<n>" = that file). Do not invent, round, "improve" or substitute values. Rebuild rules: `audit/BUILD_RULES.md` (§11 = HTML-source variant).

## 1. What the platform is
The desktop **HR application of Makor Capital** (sub-app "HR" of the Makor platform, with a "My Profile" self-service area). Views: **Employee** (list + detail), **Pool**, **Time Tracking**, **Requests** (HR role) and the **My Profile overlay** (My Info, People directory + quick card, WFH schedule, Timesheets, Time Off). Dense, data-forward, light AND dark (one system), no left sidebar, no mobile. It is one HTML file (CSS L10-1720, dark rules L1046-1719, JS L3506+).

## 2. Source of truth and owner decisions
- **The HTML is the truth** (Figma is irrelevant by owner decision). The spec behind this system: `makorx-ai/html-spec/{foundations,controls,screens-employees,screens-profile,reconciliation}.md`; stage notes + the 42 bugs: `makorx-ai/html-spec/build-notes.md`; test results: `makorx-ai/html-spec/VERIFICATION.md`.
- Owner decisions (2026-10-14): (1) **document, don't reproduce** source bugs (dead CSS, invalid CSS, broken behaviour, leaked rules are NOT built; they are listed in §10 with file + line and the intended behaviour chosen); (2) **effective values win** (the cascade result, not duplicate rules); (3) **light + dark are ONE system** (light on `:root`, dark pairs on `body.dark` / `.theme-dark`); (4) cross-system differences are notes, not unified.
- `makorx-ai/auth-design-system/` (login screens) is a SEPARATE system - do not mix it in. Token names here are unprefixed.
- Files: `tokens.json` / `tokens.css` (690 custom properties, 243 colour roles, 222 with dark pairs), `components.css` (PART 1 controls + PART 2 patterns, ~1400 lines, no raw colours), `components.md` (copy-paste HTML + JS), `showcase.html` (live light/dark, 16 screen frames, 75 demos), `assets/` (49 SVGs + `MANIFEST.md`).
- Class names = the app's own (design-system markup == app markup). Added names only: `.icon .icon-* .avatar .avatar-NN .type-* .scroll-thin* .theme-* .is-* ` and the EXTENDED set (§7).

## 3. Non-negotiables (each proven)
- **Font Geist** everywhere (400 / 500 / 600 / 700 / 800; Google Fonts, src L9, L13). **Lexend Exa** only in the nav lock-up: `.nav-wordmark` (18/400) and `.nav-sub` (14/400) (L22-23). Browser monospace once (`.mf-value.mono`); `.fc-value.mono` is NOT monospace.
- **Brand = #005268 (light) / #0cb8d0 (dark)**. Text on a filled brand surface = #fff (light) / **#111214** (dark); exceptions that keep #fff on #0cb8d0: `.btn-req-send:hover`, `.btn-close-calc:hover`, `.btn-save.ready:hover`, `.dp-day.selected` (L1089, L1392, L1444, L1511, L1597).
- **Radius 4px on everything** (125 declarations). Real exceptions: `50%` (avatars, nav avatar, circular close buttons `.modal-backdrop .modal-close / .emp-qcard-close / .tt-fillall-close`, `.bal-action-btn`, `.entry-remove`, `.req-success-icon`, `.dm-thumb`, `.tt-section-dot`, today disc), `8px` `.dm-switch` track, `2px` (scrollbar thumbs, `.wfh-legend-dot`, `.mini-bar` 2 3 0 0), phone-field halves (4 0 0 4 / 0 4 4 0). No radius above 8 exists. `.calc-user-avatar` is a 44px SQUARE (radius 4).
- **Top nav is a fixed 74px bar** (padding 0 40, bottom 1px divider, z 100). **The app has NO left sidebar.** `.sidebar` is the WHITE 360px profile card of My Profile.
- **Search input = 40px** (not 38; 38px is only `.dir-search` / `.dir-select` at 13px). Control heights: 24 / 28 / 30 / 32 / 34 / 36 / 38 / 40 / 44 (§6).
- **Dark mode = class `dark` on `<body>`** (JS `toggleDarkMode`, `localStorage['makor-dm']`), never a media query.
- **Desktop only**: ZERO `@media`; page gutters 210px at every width; the employee table needs >= ~2200px (§8).
- **No gradients** (only the logo's own blurred blobs). Motion = opacity / transform / colour transitions with the implicit `ease` (.10-.25s) plus ONE keyframe (`dir-flash`, 1.4s); hover of filled buttons = opacity .85.
- Radius, shadow and colour come from tokens; use `var(--…)` only (no raw hex in components).
- **The app has NO custom focus, :active or error styles** (0 `:focus-visible`, 0 `:active`, 22 `outline:none`). The system adds an EXTENDED keyboard ring + invalid state (§7); do not claim they are in the app.

## 3b. How to work with this system
1. Look the component up in `showcase.html` (live, light + dark, "Source: employees.html L…") or `components.md` (copy-paste markup + JS) BEFORE writing CSS. Use `components.css` classes; add no new CSS for something that exists.
2. Colours / sizes / shadows / durations come from `tokens.css` (`var(--…)`); names are by ROLE and flip in dark automatically.
3. Where the app is silent (error, tooltip, loading, empty…), derive ONLY from existing tokens and mark it `/* EXTENDED — not in app: <derivation> */` + an "Extended" badge; never invent hues, fonts, radii or breakpoints.
4. Re-verify against the live app (`html-spec/VERIFICATION.md` describes the method: computed styles, both themes, forced vs real hover).

## 4. Tokens
Light on `:root`; dark overrides on `body.dark` (or `.theme-dark` on a container). A custom property that contains `var()` is resolved where it is declared: aliases/shadows that embed a colour var are re-declared in the dark block - do the same for any token you add.

### Surfaces
| token | light | dark | role |
|---|---|---|---|
| `--color-page-bg` | #ffffff | #111214 | body |
| `--color-nav-bg` | #ffffff | #18181c | top nav |
| `--color-surface` | #ffffff | #202226 | cards / split panes / tables / detail |
| `--color-surface-elevated` | #ffffff | #26292e | dropdowns, modals, datepicker, quick card, toast(dark) |
| `--color-canvas` | #f5f5f8 | #111214 | My Profile page canvas |
| `--color-pane-muted` | #f5f5f8 | #202226 | pool right pane |
| `--color-table-head-bg` | #f5f5f8 | #111214 | emp-table / records / group rows / section band family (dark #111214) |
| `--color-table-head-bg-alt` | #f5f5f8 | #202226 | rv / tt / req / hist tables, calendars (dark #202226) |
| `--color-section-band-bg` | #ffffff | #111214 | section band |
| `--color-row-hover` | #f5f5f8 | rgba(255,255,255,0.03) | row hover |
| `--color-row-active` | #f5f5f8 | rgba(255,255,255,0.04) | selected row |
| `--color-row-new` | #edf7f5 | rgba(12,184,208,0.06) | new HR request row |
| `--color-menu-hover` | #f5f5f8 | rgba(255,255,255,0.05) | menu / option hover |
| `--color-fill-subtle` | #f5f5f8 | rgba(255,255,255,0.04) | readonly field, sidebar-profile |
| `--color-fill-neutral` | #f5f5f8 | rgba(255,255,255,0.06) | neutral icon tiles |
| `--color-fill-badge` | #e5e7ec | rgba(255,255,255,0.07) | record-badge, empty mini-bar |
| `--color-input-bg` | #ffffff | transparent | text inputs (dark transparent) |
| `--color-control-bg-elevated` | #ffffff | #26292e | outline buttons, circle buttons |
| `--color-toast-bg` | #1a1a1a | #26292e | toast |

### Text
| token | light | dark | role |
|---|---|---|---|
| `--color-text-primary` | #1a1a1a | #e2e8f4 | body |
| `--color-text-item` | #1a1a1a | #c8d4e8 | menu items, options, outline-button text |
| `--color-text-secondary` | #7c8dac | #8a97aa | subtitles, cancel buttons, icons, form labels |
| `--color-text-tertiary` | #a8b6cd | #505a6c | table headers, labels, muted values |
| `--color-text-placeholder` | #a8b6cd | #505a6c | input placeholder |
| `--color-text-placeholder-control` | #7c8dac | #505a6c | search / time / select placeholder-state |
| `--color-text-nav-link` | #000000 | #c8d4e8 | nav links |
| `--color-text-on-brand` | #ffffff | #111214 | text on brand fill |
Black-in-light names/avatars use `--color-text-black` (#000 / #e2e8f4). Muted greys written inline in the app map to `.type-secondary` (#7c8dac) and `.type-muted` (#a8b6cd; dark #505a6c).

### Borders (BY ROLE - there is no single border token)
| token | light | dark | role |
|---|---|---|---|
| `--color-border-divider` | #e5e7ec | rgba(255,255,255,0.12) | nav / header / tab / footer / section lines |
| `--color-border-card` | #e5e7ec | rgba(255,255,255,0.07) | card & panel outline, stat separators |
| `--color-border-control` | #e5e7ec | rgba(255,255,255,0.10) | inputs, triggers, secondary buttons |
| `--color-border-row` | #e5e7ec | rgba(255,255,255,0.09) | main table row separators |
| `--color-border-popover` | #e5e7ec | rgba(255,255,255,0.08) | popover / modal outline |
| `--color-border-line` | #e5e7ec | rgba(255,255,255,0.06) | reminder / quick-card rows |
| `--color-border-line-faint` | #f5f5f8 | rgba(255,255,255,0.04) | day-row, bal-sidebar-item |
| `--color-border-row-soft` | #f5f5f8 | rgba(255,255,255,0.03) | req / hist table rows |
| `--color-border-strong` | #c4cdd8 | rgba(255,255,255,0.10) | cancel button (dark: none) |
| `--color-border-hover` | #a8b6cd | rgba(255,255,255,0.20) | input hover |
| `--color-border-avatar-ring` | rgba(0,0,0,0.30) | rgba(255,255,255,0.28) | initial avatars |
Dark border alphas in use: .04 .06 .07 .08 .09 .10 .12 .20 .28 (0.14 is never used; the old "0.08 / 0.14" pair is wrong).

### Brand, focus, status
| token | light | dark | role |
|---|---|---|---|
| `--color-brand` | #005268 | #0cb8d0 | buttons, active tab/link, focus border, icons |
| `--color-brand-hover-solid` | #004257 | #0aacc3 | dp-day.selected:hover |
| `--color-brand-deep` | #003d50 | #0aacc3 | dir-name hover (light) |
| `--color-tint-selected` | #f0f8fa | rgba(12,184,208,0.10) | selected option / tile / hover |
| `--color-tint-chip` | rgba(0,82,104,0.08) | rgba(12,184,208,0.12) | active .req-tab fill |
| `--color-focus-ring` | rgba(0,82,104,0.12) | rgba(12,184,208,0.12) | 3px ring on focused inputs |
| `--color-success-bg` | #c1f0d5 | rgba(45,212,191,0.16) | Active |
| `--color-success-text` | #179484 | #2dd4bf | Active |
| `--color-danger-bg` | #fde8e6 | rgba(248,113,113,0.15) | Inactive / denied |
| `--color-danger-text` | #da4d43 | #f87171 | Inactive, required star |
| `--color-warning-bg` | #fef3c7 | rgba(251,191,36,0.15) | pending |
| `--color-warning-text` | #d97706 | #fbbf24 | pending |
| `--color-info-bg` | #dbeafe | rgba(96,165,250,0.18) | office pill |
| `--color-info-text` | #1d4ed8 | #60a5fa | office pill |
| `--color-danger-strong` | #dc2626 | #f87171 | Deny, invalid border |
| `--color-approve` | #16a34a | #34d399 | Approve button |
| `--color-request-new-bg` | #d4eee9 | rgba(12,184,208,0.15) | "New" is #d4eee9 (NOT rgba(0,82,104,.08)) |
| `--color-request-new-text` | #005268 | #0cb8d0 | "New" |
| `--color-request-pending-bg` | #fff8ec | rgba(251,191,36,0.15) | HR pending |
| `--color-request-approved-bg` | #f0fdf4 | rgba(52,211,153,0.15) | HR approved |
| `--color-request-denied-bg` | #f5f5f8 | rgba(255,255,255,0.06) | HR denied |
| `--color-timesheet-pending-bg` | #fef3c7 | rgba(251,191,36,0.16) | TT pending |
| `--color-timesheet-pending-text` | #92400e | #fbbf24 | TT pending |
| `--color-timesheet-approved-bg` | #d1fae5 | rgba(52,211,153,0.15) | TT approved |
| `--color-timesheet-approved-text` | #065f46 | #34d399 | TT approved |
Several status palettes coexist ON PURPOSE (employee / HR requests / my requests / timesheet / WFH / calendar): 71 status tokens. Department + request-type maps: `components.md` §6.

### Overlays and shadows
| token | light | dark |
|---|---|---|
| `--color-overlay-modal` | rgba(0,0,0,0.28) | rgba(0,0,0,0.55) |
| `--color-overlay-dialog` | rgba(0,0,0,0.45) | rgba(0,0,0,0.60) |
| `--color-overlay-timesheet` | rgba(0,0,0,0.28) | = |
| `--color-overlay-success` | rgba(20,30,48,0.35) | rgba(0,5,20,0.65) |
| `--shadow-page` | 0 2px 8px rgba(0,0,0,0.06) | 0 4px 24px rgba(0,0,0,0.50) |
| `--shadow-view` | 0 2px 8px rgba(0,0,0,0.06) | 0 2px 8px rgba(0,0,0,0.06) |
| `--shadow-card` | 0 2px 8px rgba(0,0,0,0.06) | none |
| `--shadow-card-sm` | 0 2px 8px rgba(0,0,0,0.05) | none |
| `--shadow-popover` | 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06) | 0 8px 32px rgba(0,0,0,0.50) |
| `--shadow-popover-sm` | 0 8px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06) | 0 8px 24px rgba(0,0,0,0.50) |
| `--shadow-combo` | 0 6px 20px rgba(0,0,0,0.12) | 0 6px 20px rgba(0,0,0,0.50) |
| `--shadow-modal` | 0 8px 40px rgba(0,0,0,0.16) | 0 8px 40px rgba(0,0,0,0.16) |
| `--shadow-dialog-box` | 0 8px 40px rgba(0,0,0,0.14) | 0 8px 40px rgba(0,0,0,0.14) |
| `--shadow-confirm-box` | 0 8px 32px rgba(0,0,0,0.14) | 0 8px 32px rgba(0,0,0,0.14) |
| `--shadow-dialog` | 0 24px 60px rgba(0,0,0,0.2) | 0 24px 60px rgba(0,0,0,0.60) |
| `--shadow-success` | 0 24px 64px rgba(0,0,0,0.30) | 0 24px 64px rgba(0,0,0,0.60) |
| `--shadow-thumb` | 0 1px 3px rgba(0,0,0,0.20) | = |
| `--shadow-focus` | 0 0 0 3px var(--color-focus-ring) | = |
| `--shadow-focus-dir` | 0 0 0 3px var(--color-focus-ring-dir) | = |
| `--shadow-focus-sm` | 0 0 0 2px var(--color-focus-ring-sm) | = |
| `--shadow-row-marker` | inset 3px 0 0 var(--color-brand) | = |
`--shadow-modal / -dialog-box / -confirm-box / -view` and `--color-overlay-timesheet` have NO dark rule in the app (kept as rendered; §11).

## 5. Typography
Body 14px / 1.5, Geist 400, colour `--color-text-primary`; form controls keep `line-height:normal`. Sizes (px): 9.5 10 11 12 13 **14** 15 16 17 18 20 21 22 26 28. Weights: 400 body, 500 buttons / values / labels / dept badge, 600 cancel / names / active tab / status pills, 700 headings 14-16 / th / modal title A / section band, 800 titles 16-28 / dialog titles / big numbers.
| role | tuple (weight size/line-height) | where |
|---|---|---|
| `.type-page-title` | 800 16px/1.5 Geist | .left-title, .rv-title, .tt-title, .member-name. colour text-primary. L54,236,284,450 |
| `.type-detail-name` | 800 18px/1.2 Geist | .drawer-name. L137 |
| `.type-modal-title` | 700 16px/1.5 Geist | .modal-title (family A). L395 |
| `.type-dialog-title` | 800 18px/1.5 Geist brand | .modal-backdrop .modal-title. L982 |
| `.type-stat-xl` | 800 28px/1 Geist | .bal-number (calc-result-number is brand). L888,1018 |
| `.type-stat-md` | 700 22px/1 Geist | .wfh-stat-num. L769 |
| `.type-section-band` | 700 14px/1.5 Geist | .section-band. L167 |
| `.type-label-l` | 700 12px/1.5 Geist uppercase 0.06em tertiary | table headers, fill-modal-label, time-label. L104,845,993. (group header / modal-section-title / pool-group-lbl / card-title use secondary colour) |
| `.type-label-m` | 700 11px/1.5 Geist uppercase 0.07em | tt-section-lbl, tt-cal-title (secondary), tt-fillall-lbl, req/hist th (0.06em). L291,326,371,799 |
| `.type-label-s` | 700 10px/1.5 Geist uppercase 0.06em tertiary | field-label, tt-stat-lbl (600 for detail-stat-label). L631,325,152 |
| `.type-field-label` | 500 12px/1.5 Geist tertiary | .fc-label, .pool-meta-label, .mf-label. L195 |
| `.type-field-value` | 500 14px/1.5 Geist primary | .fc-value (600 for .mf-value/.pool-meta-value). L205 |
| `.type-form-label` | 500 12px/1.5 Geist secondary | .modal-label. L408 (.req-label: 600 12px primary) |
| `.type-body` | 400 14px/1.5 Geist | table cells, body. L13 |
| `.type-body-sm` | 400 13px/1.5 Geist | tt/rv/req cells. L297 |
| `.type-meta` | 400 12px/1.5 Geist secondary | .emp-email, .drawer-email, .reminder-detail. L121 |
| `.type-meta-sm` | 400 11px/1.5 Geist secondary | .req-type-desc, .tt-emp-dept, .profile-drop-email. L821,306,1033 |
| `.type-badge` | 600 12px/1.5 Geist | status pills, drawer-dept-badge, tt/rv badges (dept-badge is 500). L123 |
| `.type-badge-sm` | 700 11px/1.5 Geist | .req-status, .wfh-prefs-badge. L805 |
| `.type-badge-xs` | 700 10px/1.5 Geist 0.04em | .app-drop-item-badge, .dir-you, .wfh-status-pill (uppercase). L39,702,782 |
| `.type-button` | 500 14px/normal Geist | btn-primary, btn-outline, btn-cta (cancel 600). L56-63 |
| `.type-tab` | 500 14px/normal Geist secondary -> active 600 brand | .detail-tab (profile-tab 600 -> 700). L156,534 |
| `.type-nav-link` | 400 14px/1.5 Geist | .nav-link (active 600 + underline offset 3px thickness 2px). L25-26 |
| `.type-wordmark` | 400 18px/1 Lexend Exa | .nav-wordmark. L22 |
| `.type-nav-sub` | 400 14px/1 Lexend Exa secondary | .nav-sub. L23 |
Uppercase labels: letter-spacing .06em (th, field labels, modal-section-title), .07em (tt-section-lbl, tt-cal-title, ts-stat-label), .08em (sidebar-label), .10em (app-drop-section, dir-alpha-header), .05em (tt-cal-head), .04em (badge-xs). Label colours: tertiary for th / field labels, secondary for modal-section-title / card-title / pool-group-lbl.

## 6. Spacing, controls, sizes
- **Spacing is observed, not a scale**: 2 3 4 5 6 7 8 9 10 11 12 13 14 16 18 20 22 24 28 32 36 40 60 80 px (`--space-N`; 7, 9, 11, 13, 22 are real).
- **Control heights**: 24 `.inline-list-item-remove`; 28 `.dp-nav .bal-action-btn .entry-remove .req-icon-sm`; 30 `.rv-btn-* .btn-add-member .rv-type-icon .period-icon`; 32 `.modal-close .wfh-nav-btn .eqa-btn .req-tab .tt-fill-* .tt-fillall-close`; 34 `.btn-save-bar .btn-discard-bar .dp-day`; **36** `.btn-primary .btn-outline .hist-range-picker`; **38** `.btn-cancel .btn-cta .ts-btn* .tt-btn-* .tt-confirm-* .dir-search .dir-select .phone-code-btn`; **40** `.search-input .cust-select__trigger .modal-input .field-value .datepicker-input .phone-input-wrap .time-input .btn-req-send .btn-save .btn-close-calc .btn-inline-add`; 44 `.tt-fillall-input`.
- **Avatars** (initials, transparent, 1px ring `--color-border-avatar-ring`; no palette): manager 32, tt 34, emp / rv 36, holder 38, nav 42 (fill + border), dir / tt-det 44, drawer 48, sp 52, qcard 64.
- Sizes: nav 74; gutters 210; split-left 54%; tt-list 56%; My Profile body-wrap max 1400, left col 360 (sticky top 16, NOT 90), content card height `calc(100vh - 108px)`; modal A 740 (inline 440 / 620 / 680, max-height 82vh), B 560 (460 / 620), fill-all 420, confirm 340, success 360, quick card 520; datepicker 280; phone drop min 200 / max-h 240; select panel z 500; dropdown 226 / 220 at top 82. Full list: `tokens.json` → `size` (61).
- **z-index**: sticky th 1, save-bar 10, profile-view 50, nav 100, datepicker 200, phone drop 300, quick card 300, select panel 500, modal-backdrop (B) 800, modal-overlay (A) + success 900, tt overlays 1000, app / profile drop 9000, combobox + toast 9999.
- **Motion**: durations .10 (row / menu bg), .12 (buttons, tabs, inputs), .15 (field borders, chevron, overlays C), .18 (modal A fade + slide 10px, switch), .20 (toast), .25 (success fade), 1.4s ease-out (`dir-flash`); toast visible 2800 ms. Tabs, view switching, dropdown panels, family-B modals = no animation.

## 7. Components (rules). Tags: [app] = defined in the app; [EXTENDED] = added, not in the app
- **Buttons [app]**: filled brand (`.btn-primary` 36, `.btn-cta` 38, `.ts-btn-primary`, `.tt-btn-approve`, `.tt-confirm-ok`, `.tt-fill-save` 32, `.btn-add-member` 30, `.btn-inline-add` 40) hover .85; cancel family (`.btn-cancel` 38; dark = fill, NO border; `.btn-req-cancel .ts-btn .tt-btn-fill-all .tt-confirm-cancel .tt-fill-cancel` keep a 1px border in dark); outline `.btn-outline` 36; outline-brand `.btn-req-send .btn-close-calc` (1.5px brand, fill on hover, text stays #fff), `.calc-accrual-btn`, `.btn-save` (disabled-looking until `.ready`); `.rv-btn-approve/-deny`; save-bar buttons (white-on-brand in both themes); icon-only (`.modal-close` square 4px; `.modal-backdrop .modal-close`, `.emp-qcard-close`, `.tt-fillall-close`, `.bal-action-btn`, `.entry-remove` circles). **Disabled** = `:disabled`/`.is-disabled` (light opacity .45, dark explicit colours), hover suppressed.
- **Inputs [app]**: `.search-input` 40 / `.modal-input` / `.modal-select` / `.field-value` (My Info, 10px uppercase label) / `.time-input` + `.ampm-select` / `.req-date-input` / `.req-amount-input` / `.fill-modal-input` / `.tt-fill-input` (2px ring) / `.tt-fillall-input` 44 / `.dir-search` 38. Focus = brand border + `--shadow-focus` 3px (textarea: border only). Readonly = `.readonly-field`. `.modal-textarea` is styled like `.req-textarea-to` (bug #8).
- **Select [app]**: `.cust-select` trigger 40, panel NO border, options 10/16, `.selected` brand 500, chevron rotates .15s; fixed widths by wrapper class (`.cs-dept 152 .cs-office 124 .cs-status 114 .cs-group 136 .pool-cs-company 138 .pool-cs-team 120 .pool-cs-desk 112`). Combobox `.pool-emp-drop` (fixed, z 9999). Datepicker (280, `.dp-day` 34, 16-year grid), phone picker (wrap 40 + button 38).
- **Switch / tiles [app]**: `.dm-switch` 32×18 (off-track dark is DERIVED); `.wfh-day-check` 38px box (+ `.pending-day`); `.req-type-btn` tiles (2px border). **Checkbox / radio [EXTENDED]**.
- **Tabs [app]**: `.detail-tab` (2px underline, 44px bar), `.profile-tab` (2.5px, 600 → 700), `.req-tab` pills (32px); sortable `.emp-table th`.
- **Badges [app]**: status pills (4 / 11-12px families), `.dept-badge[data-dept]`, `.pool-badge`, request-type tiles `[data-reqtype]`; see §4.
- **Modals [app]**: A `.modal-overlay > .modal` (fade+slide .18s), B `.modal-backdrop > .modal` (no animation), C `.tt-fillall-overlay / .tt-confirm-overlay`, D success popup (2800 ms, no buttons), E quick card. **Toast [app]**: text only, 2800 ms.
- **Tables [app]**: six families - `.emp-table` (header #111214 dark), `.records-table` (th 600, not uppercase), `.rv-table / .tt-table / .req-table / .hist-table` (header #202226 dark), group-header row, sticky th z 1.
- **Patterns [app]** (PART 2): nav, 54/46 split frame, employee list + detail, HR requests, time tracking (calendar, fill bar), pool, My Profile (cards, directory, WFH, timesheet, time off).
- **EXTENDED (20)**: Keyboard focus ring; .is-invalid, .field-error; Disabled text inputs / selects; .tooltip; .spinner, .skeleton; .checkbox, .radio; .tag, .tag-remove; .alert-success/danger/warning/info; .progress; .pagination, .page-btn; .breadcrumb; .file-drop; .theme-light/.theme-dark, .scroll-thin*, .is-*, .icon*, .avatar-NN, .type-*; .top-nav.is-static; Row :focus-visible; .state-empty / .state-loading / .state-error; .emp-table tr.emp-empty; .skeleton-row .skeleton; .cust-select.is-invalid, .phone-input-wrap.is-invalid, *.is-invalid:focus; .is-scroll-x + responsive guidance. Derivations: `components.md` §7. Each carries `/* EXTENDED — not in app */` in CSS and an "Extended" badge in the showcase.

## 8. Layout / shell geometry (1920×1080)
Nav 74 → `.page` (padding 74 / 210) → `.page-center` (margin 12 0, 1px card border, radius 4, shadow-page) → `.split-left` 54% (left-header 20/20/12, toolbar gap 8, list padding 16) + `.split-right`. Requests / Time Tracking views reuse the frame chrome (`.requests-view / .timetracking-view`). My Profile = fixed overlay under the nav (canvas, z 50): 360px column of white cards + one content card with tab bar. **Table constraint**: Employee column = 0.54×(W−422)−715 px → 0 at ≤1440, 94 at 1920, 245 at 2200, 440 at 2560: design for ≥ ~2200px (no breakpoint exists or was invented; `.is-scroll-x` opt-in).

## 9. Icons
49 verbatim SVGs in `assets/` (`MANIFEST.md` lists file, class, source line, role). Recipe: `<span class="icon icon-NAME icon-16"></span>` (mask, colour = `color`) or the app's inline `<svg stroke="currentColor">`. Coloured: `<img src="assets/logo-mark.svg">` (32×32, rx 4). Apps launcher stays inline (dark = filled circles). Emoji (flags, 🎂 🎉) and glyphs (✕ × ‹ ▶ ⊕ ＋ ⏱) are text. Never redraw icons. (`logo-mark.svg` was missing a closing `</g>` in the extracted file and is fixed.)

## 10. Known source bugs and decisions (42; full table: showcase "Known source bugs & decisions" and `build-notes.md`)
Chosen intended behaviour in the DS - do NOT reproduce the defect:
- #1 .phone-code-val renders #e2e8f4 in LIGHT mode: unscoped second selector in body.dark .phone-flag,.phone-code-val{…}… → --color-text-primary (light #1a1a1a / dark #e2e8f4), same as .phone-flag
- #2 Dark inactive-employee department badges are not grey: body.dark .dept-badge[data-dept=…]!important out-ranks the grey… → grey in BOTH themes (--color-dept-inactive-*; [data-inactive="true"] / .is-inactive)
- #3 .nav-sub ("HR") has no dark rule (stays #7c8dac) → dark = --color-text-secondary (#8a97aa)
- #5 .req-star #da4d43 has no dark rule → dark = --color-danger-text (#f87171)
- #7 .req-sub-cell / .req-date-cell colour overrides never apply (.req-table td out-ranks them); .req-date-cell is never em… → intended: the Details column is secondary grey (td.req-sub-cell)
- #8 <textarea class="modal-textarea"> has NO CSS (UA #767676 border, black text in dark) → styled exactly like .req-textarea-to (selector list)
- #12 The history table is rendered TWICE: stray duplicate rows after </tbody> → rendered once
- #14 A select / datepicker opened inside a modal sets .modal-body{overflow-y:visible} (JS), so at tall viewports the footer… → .modal-body stays overflow-y:auto; popups inside modals need a portal (as .pool-emp-drop already does)
- #16 Light disabled = inline style="opacity:0.45;cursor:not-allowed" only; dark = class :disabled → class / attribute based in both themes: light opacity .45 + not-allowed, dark explicit colours + opacity 1
- #17 Hover still changes a disabled button (no :disabled guard) → hover suppressed on :disabled / .is-disabled
- #18 Dark .dir-select / .ampm-select keep the light #005268 chevron (no dark image rule) → dark chevron #0cb8d0
- #19 Missing placeholder rules (.time-input, .req-textarea-to, .field-value) and no dark colour for .req-date-native… → placeholder tokens (--color-text-placeholder, --color-text-placeholder-control); .req-date-native tertiary unt
- #20 Inline-colour remap layer body.dark [style*="color:#7c8dac"]…!important (grep-style attribute selectors) → not reproduced: colours flip through tokens/classes; any inline grey becomes .type-secondary / .type-muted
- #21 .pool-badge count is an inline color:#000 span; dark span{color:inherit!important} → one CSS rule (black light / inherit dark)
- #22 Department / request-type colours are injected as inline JS styles with dark !important overrides → data-dept / data-reqtype CSS maps (both themes)
- #29 .group-header-row:hover td{cursor:default} is out-ranked by .emp-table tr:hover td{cursor:pointer}: a hovered group he… → cursor:default
- #36 .req-table td.req-type-cell{display:flex} targets a td class the markup never emits (an inline flex div is written ins… → .req-type-cell is defined for the inner div; .req-type-title added for the title span (DS-only)
- #38 Inline greys in the HTML (timesheet placeholder, pool empty icon, sidebar em dash, optional tags, status-history "· Hi… → DS markup uses classes: .type-secondary for #7c8dac, .type-muted for #a8b6cd (dark #505a6c; the app's remapped
- Kept on purpose (what the user sees): always-on vertical page scrollbar; `.cust-select__panel` has no border; dark `.btn-cancel` borderless; `.nav-link:hover` dims the active link (#27); pre-selected timesheet period renders in placeholder grey (no `.has-value`); pool toolbar triggers are auto-sized by JS in the app (the DS keeps the CSS widths).
- Documented limitation: employee table collapses below ~2200px (#28).

## 11. Open decisions for the owner
1. **3 GUESSED dark values (no source value exists)** - (1) switch off-track rgba(255,255,255,0.07); (2) calendar out-of-period text / date #2a3548 (bug #4); (3) dir-flash dark tint rgba(12,184,208,0.15). Also derived: the light "any other request type" tile #f5f5f8 / #7c8dac. Confirm or give the intended values.
2. **Dark overlay / shadow holes (#23 / #33)** - The .tt-fillall / .tt-confirm scrim stays .28, .modal / .tt-fillall-box / .tt-confirm-box shadows stay light-theme values, #requests-view / #timetracking-view shadow .06 in dark. Kept as rendered; should dark get its own?
3. **Scrollbar colours (#30)** - The dark thumb colours (white .09; hover .28) are applied by token; they were NOT measured in a browser (light rgba(0,0,0,.06-.12)).
4. **.sidebar-text small in dark (#32)** - The hire-date tenure line stays #a8b6cd in dark (brighter than the dark tertiary #505a6c). Keep or flip?
5. **Inline greys remapped to .type-secondary / .type-muted (#38)** - The app's dark remap shows those greys as #8a97aa; .type-muted shows #505a6c in dark. Confirm.
6. **Details column in "My requests" and New Request textarea (#7/#35, #8/#34)** - INTENTIONALLY differ from the app: Details column is grey (the app's override never applies), the modal textarea is styled (the app's has no CSS, modal 52px taller). Confirm both.
7. **Employee table below ~2200px (#28)** - The table is unusable at <= 1440 (Employee column 0). No breakpoint was invented; the fix belongs in the app (fluid columns or a min-width + horizontal scroll via .is-scroll-x).
8. **Native alert() validation (#15)** - Replaced by EXTENDED .is-invalid / .field-error / .alert-*; confirm the visual treatment.
9. **Cosmetic data (#26)** - "Polina Rozenblit" vs "Rachel Sternberg", "All Companys", count 40 vs 41, undefined modal title for "location": copy fixes for the app owner.

## 12. Dead code excluded / invented items dropped
Never build: the dead classes of bug #10 / #42 (`.dept-chip`, `.dept-filters`, `.rv-details-*`, `.tt-badge-none`, `.req-success-actions / -btn-new / -btn-back`, `.fields-1`, …), the hidden Today panel (`#panel-today`: `.today-* .event-row .ev-* .announce-* .stat-row .card-count`), `.btn-ghost` (referenced, no CSS). Invented by the OLD system and not in the app: `.sidebar` nav shell, `.filter-chip`, `.confirm-* / .btn-confirm-danger`, `.kpi-card`, `.empty-state` (64/32), `.page-header`, `.time-wrap` + steppers, `.daterange-*`, `.combo-*` + `mark`, `.data-label` uppercase, `.avatar-sm` 13px, drawer (right slide), timeline, stepper, tag input.

## 13. What NOT to do (old claims that the app contradicts)
- Do NOT add a left sidebar, a dark `#111214` nav shell, a `#f5f5f8` sidebar or a "220px sidebar" (the app has none; `.sidebar` = white 360px card).
- Do NOT use a 38px search (40px), "radius 4 only / no exceptions" (see §3), "Lexend Exa wordmark only" (also `.nav-sub`).
- Do NOT use dark borders `rgba(255,255,255,0.08)` / `0.14` as single tokens, a dark modal shadow `0 8px 40px rgba(0,0,0,0.5)` (does not exist), or "43 components".
- Do NOT use status "New" = `rgba(0,82,104,0.08)` (real `#d4eee9 / #005268`), a 5-state status system (several palettes), `.avatar-sm` 13px / `.card-body` padding 20 / `.modal-footer` flex-end (real: `.emp-avatar` 14px, `.card-body` `0 20px`, `.modal-footer` space-between).
- Do NOT use inline colours / inline `opacity:.45`; use `data-dept`, `data-reqtype`, classes and `disabled`.
- Do NOT use Tailwind or any CSS framework, `@media` breakpoints, or `linear`/spring easing; do NOT nest `.theme-light` inside `body.dark`.
- Do NOT touch `makorx-ai/auth-design-system/` or the hub from this system.

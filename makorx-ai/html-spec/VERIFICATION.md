# VERIFICATION — MakorX.AI HR design system, stage 3 final run (showcase vs LIVE app)

Date of run: 2026-10-14. Live app: `http://localhost:3456/makor-hr/employees.html` (1920×1080). Showcase: `http://localhost:3456/makorx-ai/design-system/showcase.html`. Browser: headless Chrome driven over CDP (own tabs; the Browser pane was hidden, so all screenshots were taken with headless Chrome, not the pane; the pane tab used for the hub-viewer check was opened by this run and closed afterwards). Fonts: Geist + Lexend Exa loaded from Google Fonts on both sides (verified loaded).

## 1. Method
- Two pages in one browser: **A** = the live app, **B** = the showcase. Both set to light, then to dark (`body.dark`, the app's own switch).
- For each probe an element is located in A (after driving the app into the state with its OWN functions: `showRequestsView()`, `selectTimesheet(id)`, `openEmpModal()`, `csToggle()`, …) and the equivalent element in B (a screen frame or a component demo). **52 computed properties** per element (font family/size/weight/line-height/letter-spacing, colour, background, 4 border widths/styles/colours, 4 radii, padding, margin, box-shadow, opacity, text-transform/decoration/align, display, cursor, overflow, position, z-index, transition property + duration, gap, flex props) plus `offsetHeight` / `offsetWidth` for fixed-size controls (offset sizes are unaffected by the showcase's `transform: scale`). Border colours of sides without a border are ignored.
- **Hover**: real mouse hover over the app element (CDP `Input.dispatchMouseEvent`) vs the forced `.is-hover` class in the showcase; all running transitions are finished through the Web Animations API (`getAnimations().finish()`) before reading, because a headless tab does not advance transitions.
- Open states (menus, modals families A/B/C/D/E, toast, datepicker, phone drop, select panel, save bar, request form page, grouped list) are driven in A by the app's functions and compared with the matching showcase demo.
- Harness (not shipped): `verify.js` (11 screen states), `verify2.js` (24 overlay / popup / open states + 25 hover pairs) and a CDP driver; the app page and the showcase page are RELOADED before each theme pass so no state leaks between light and dark; the JSON results are kept in the scratchpad.

## 2. Result summary
| | light | dark |
|---|---|---|
| probes (element × state) | 659 | 659 |
| probes with ≥1 differing property | 32 | 32 |
| **UNEXPLAINED differences** | **0** | **0** |

Total: **1318 probes**, **70,436 computed-property comparisons** (light + dark), 64 probes with a difference, of which **0 unexplained**; every other difference is an intentional / expected one (section 5).

Per state:

| state | probes (both themes) | probes with a difference | unexplained property diffs |
|---|---|---|---|
| employees | 112 | 9 | 0 |
| detail | 62 | 0 | 0 |
| requests | 66 | 6 | 0 |
| timetracking | 114 | 0 | 0 |
| pool | 76 | 10 | 0 |
| myinfo | 108 | 3 | 0 |
| people | 40 | 6 | 0 |
| wfh | 68 | 0 | 0 |
| timesheet | 60 | 0 | 0 |
| timeoff | 68 | 2 | 0 |
| newemp modal | 38 | 2 | 0 |
| app-drop | 18 | 0 | 0 |
| profile-drop | 18 | 1 | 0 |
| request modal (A) | 44 | 4 | 0 |
| holder modal | 18 | 0 | 0 |
| fill modal (B) | 24 | 0 | 0 |
| calc modal (B) | 30 | 0 | 0 |
| ts modal (B) | 38 | 0 | 0 |
| fill-all overlay (C) | 26 | 0 | 0 |
| confirm overlay (C) | 16 | 0 | 0 |
| success popup (D) | 10 | 0 | 0 |
| toast | 2 | 0 | 0 |
| quick card (E) | 28 | 2 | 0 |
| datepicker open | 24 | 2 | 0 |
| phone drop open | 24 | 3 | 0 |
| select open | 10 | 4 | 0 |
| save bar | 8 | 0 | 0 |
| request form page | 50 | 2 | 0 |
| grouped list | 4 | 0 | 0 |
| pool empty | 4 | 0 | 0 |
| new pool modal | 36 | 0 | 0 |
| combobox open | 8 | 0 | 0 |
| records tab | 12 | 0 | 0 |
| timesheet placeholder | 2 | 0 | 0 |
| rv-empty | 2 | 0 | 0 |
| hover | 50 | 8 | 0 |

## 3. Key measurements — property | live app | showcase | result (light and dark)
288 comparisons below (each row = one element/state/property in light AND dark; PASS = identical computed value; EXPLAINED = an intentional difference from section 5). Colours shown as hex / rgba. "n/a" = probe not present in that run.

| group | element / state | property | app (light) | showcase (light) | light | app (dark) | showcase (dark) | dark |
|---|---|---|---|---|---|---|---|---|
| employees | btn New Employee | background | #005268 | #005268 | PASS | #0cb8d0 | #0cb8d0 | PASS |
| employees | btn New Employee | height | 36px | 36px | PASS | 36px | 36px | PASS |
| employees | btn New Employee | radius | 4px | 4px | PASS | 4px | 4px | PASS |
| employees | search-input | height | 40px | 40px | PASS | 40px | 40px | PASS |
| employees | search-input | border-color | #e5e7ec | #e5e7ec | PASS | rgba(255,255,255,0.1) | rgba(255,255,255,0.1) | PASS |
| employees | search-icon | color | #005268 | #005268 | PASS | #505a6c | #505a6c | PASS |
| employees | cs-dept trigger | width | 152px | 152px | PASS | 152px | 152px | PASS |
| employees | cs-dept trigger | height | 40px | 40px | PASS | 40px | 40px | PASS |
| employees | cs-office trigger | width | 124px | 124px | PASS | 124px | 124px | PASS |
| employees | cs-status trigger | width | 114px | 114px | PASS | 114px | 114px | PASS |
| employees | cs-group trigger | width | 136px | 136px | PASS | 136px | 136px | PASS |
| employees | th sorted | color | #005268 | #005268 | PASS | #0cb8d0 | #0cb8d0 | PASS |
| employees | th | background | #f5f5f8 | #f5f5f8 | PASS | #111214 | #111214 | PASS |
| employees | th | letter-spacing | 0.72px | 0.72px | PASS | 0.72px | 0.72px | PASS |
| employees | td first | height | 64.5px | 64.5px | PASS | 64.5px | 64.5px | PASS |
| employees | emp-avatar | width | 36px | 36px | PASS | 36px | 36px | PASS |
| employees | emp-avatar | border-color | rgba(0,0,0,0.3) | rgba(0,0,0,0.3) | PASS | rgba(255,255,255,0.28) | rgba(255,255,255,0.28) | PASS |
| employees | emp-name | font-weight | 600 | 600 | PASS | 600 | 600 | PASS |
| employees | emp-email | color | #7c8dac | #7c8dac | PASS | #8a97aa | #8a97aa | PASS |
| employees | dept-badge Equities | background | #cad8f4 | #cad8f4 | PASS | rgba(99,152,255,0.16) | rgba(99,152,255,0.16) | PASS |
| employees | dept-badge Equities | color | #2456a0 | #2456a0 | PASS | #7aabff | #7aabff | PASS |
| employees | dept-badge Fixed Income | background | #c1ecf0 | #c1ecf0 | PASS | rgba(45,212,191,0.14) | rgba(45,212,191,0.14) | PASS |
| employees | dept-badge Technology | background | #c8f0e0 | #c8f0e0 | PASS | rgba(52,211,153,0.14) | rgba(52,211,153,0.14) | PASS |
| employees | dept-badge Operations | background | #fce8d0 | #fce8d0 | PASS | rgba(251,146,60,0.16) | rgba(251,146,60,0.16) | PASS |
| employees | dept-badge Compliance | background | #f0eafc | #f0eafc | PASS | rgba(167,139,250,0.16) | rgba(167,139,250,0.16) | PASS |
| employees | dept-badge Finance | background | #d8eef8 | #d8eef8 | PASS | rgba(96,186,240,0.16) | rgba(96,186,240,0.16) | PASS |
| employees | status-pill active | background | #c1f0d5 | #c1f0d5 | PASS | rgba(45,212,191,0.16) | rgba(45,212,191,0.16) | PASS |
| employees | status-pill inactive | color | #da4d43 | #da4d43 | PASS | #f87171 | #f87171 | PASS |
| employees | inactive name | color | #a8b6cd | #a8b6cd | PASS | #505a6c | #505a6c | PASS |
| employees | nav bar | height | 74px | 74px | PASS | 74px | 74px | PASS |
| employees | nav bar | background | #ffffff | #ffffff | PASS | #18181c | #18181c | PASS |
| employees | nav link active | font-weight | 600 | 600 | PASS | 600 | 600 | PASS |
| employees | nav avatar | width | 42px | 42px | PASS | 42px | 42px | PASS |
| employees | wordmark | fontFamily | "Lexend Exa", sans-serif | "Lexend Exa", sans-serif | PASS | "Lexend Exa", sans-serif | "Lexend Exa", sans-serif | PASS |
| employees | split-left | background | #ffffff | #ffffff | PASS | #202226 | #202226 | PASS |
| employees | page-center | box-shadow | rgba(0, 0, 0, 0.06) 0px 2px 8px 0px | rgba(0, 0, 0, 0.06) 0px 2px 8px 0px | PASS | rgba(0, 0, 0, 0.5) 0px 4px 24px 0px | rgba(0, 0, 0, 0.5) 0px 4px 24px 0px | PASS |
| employees | emp-table-wrap | box-shadow | rgba(0, 0, 0, 0.05) 0px 2px 8px 0px | rgba(0, 0, 0, 0.05) 0px 2px 8px 0px | PASS | none | none | PASS |
| detail | drawer-avatar | width | 48px | 48px | PASS | 48px | 48px | PASS |
| detail | drawer-name | font-size | 18px | 18px | PASS | 18px | 18px | PASS |
| detail | record-badge | background | #e5e7ec | #e5e7ec | PASS | rgba(255,255,255,0.07) | rgba(255,255,255,0.07) | PASS |
| detail | drawer-dept-badge | font-weight | 600 | 600 | PASS | 600 | 600 | PASS |
| detail | detail-stat-label | letter-spacing | 0.6px | 0.6px | PASS | 0.6px | 0.6px | PASS |
| detail | detail-tab active | color | #005268 | #005268 | PASS | #0cb8d0 | #0cb8d0 | PASS |
| detail | detail-tab active | height | 44px | 44px | PASS | 44px | 44px | PASS |
| detail | section-band first | height | 54px | 54px | PASS | 54px | 54px | PASS |
| detail | section-band | background | #ffffff | #ffffff | PASS | #111214 | #111214 | PASS |
| detail | fc-label | color | #a8b6cd | #a8b6cd | PASS | #505a6c | #505a6c | PASS |
| detail | fc-value | font-size | 14px | 14px | PASS | 14px | 14px | PASS |
| detail | active-row td first | box-shadow | rgb(0, 82, 104) 3px 0px 0px 0px inset | rgb(0, 82, 104) 3px 0px 0px 0px inset | PASS | rgb(12, 184, 208) 3px 0px 0px 0px inset | rgb(12, 184, 208) 3px 0px 0px 0px inset | PASS |
| requests | rv th | background | #f5f5f8 | #f5f5f8 | PASS | #202226 | #202226 | PASS |
| requests | rv td new | background | #edf7f5 | #edf7f5 | PASS | rgba(12,184,208,0.06) | rgba(12,184,208,0.06) | PASS |
| requests | rv-status new | background | #d4eee9 | #d4eee9 | PASS | rgba(12,184,208,0.15) | rgba(12,184,208,0.15) | PASS |
| requests | rv-status pending | color | #d97706 | #d97706 | PASS | #fbbf24 | #fbbf24 | PASS |
| requests | rv-status approved | background | #f0fdf4 | #f0fdf4 | PASS | rgba(52,211,153,0.15) | rgba(52,211,153,0.15) | PASS |
| requests | rv-type-icon annual | background | #eff6ff | #eff6ff | PASS | rgba(37,99,235,0.16) | rgba(37,99,235,0.16) | PASS |
| requests | rv-type-icon location | color | #3b5fc0 | #3b5fc0 | PASS | #c4b5fd | #c4b5fd | PASS |
| requests | rv-btn-approve | border-color | #16a34a | #16a34a | PASS | #34d399 | #34d399 | PASS |
| requests | rv-btn-deny | height | 30px | 30px | PASS | 30px | 30px | PASS |
| timetracking | tt-badge-pending | background | #fef3c7 | #fef3c7 | PASS | rgba(251,191,36,0.16) | rgba(251,191,36,0.16) | PASS |
| timetracking | tt-section-lbl pending | color | #92400e | #92400e | PASS | #fbbf24 | #fbbf24 | PASS |
| timetracking | tt-selected td first | box-shadow | rgb(0, 82, 104) 3px 0px 0px 0px inset | rgb(0, 82, 104) 3px 0px 0px 0px inset | PASS | rgb(12, 184, 208) 3px 0px 0px 0px inset | rgb(12, 184, 208) 3px 0px 0px 0px inset | PASS |
| timetracking | cc-normal | background | #f0fdf8 | #f0fdf8 | PASS | rgba(52,211,153,0.1) | rgba(52,211,153,0.1) | PASS |
| timetracking | cc-low hrs | color | #d97706 | #d97706 | PASS | #fbbf24 | #fbbf24 | PASS |
| timetracking | cc-missing | background | #fff5f5 | #fff5f5 | PASS | rgba(248,113,113,0.1) | rgba(248,113,113,0.1) | PASS |
| timetracking | tt-btn-approve | height | 38px | 38px | PASS | 38px | 38px | PASS |
| timetracking | tt-stat-val | font-size | 18px | 18px | PASS | 18px | 18px | PASS |
| pool | pool-row active | borderLeftColor | #005268 | #005268 | PASS | #0cb8d0 | #0cb8d0 | PASS |
| pool | pool-badge holders | background | #cad8f4 | #cad8f4 | PASS | rgba(99,152,255,0.16) | rgba(99,152,255,0.16) | PASS |
| pool | pool-badge members | color | #0d6e7a | #0d6e7a | PASS | #22d3ee | #22d3ee | PASS |
| pool | btn-add-member | height | 30px | 30px | PASS | 30px | 30px | PASS |
| pool | holder-avatar | width | 38px | 38px | PASS | 38px | 38px | PASS |
| pool | member-card | borderBottomColor | #e5e7ec | #e5e7ec | PASS | rgba(255,255,255,0.12) | rgba(255,255,255,0.12) | PASS |
| pool | active-badge | background | #c1f0d5 | #c1f0d5 | PASS | rgba(45,212,191,0.16) | rgba(45,212,191,0.16) | PASS |
| myinfo | sidebar | box-shadow | rgba(0, 0, 0, 0.06) 0px 2px 8px 0px | rgba(0, 0, 0, 0.06) 0px 2px 8px 0px | PASS | none | none | PASS |
| myinfo | sp-avatar | width | 52px | 52px | PASS | 52px | 52px | PASS |
| myinfo | sp-name | letter-spacing | -0.3px | -0.3px | PASS | -0.3px | -0.3px | PASS |
| myinfo | reminder-icon birthday | background | #fef3ec | #fef3ec | PASS | rgba(251,146,60,0.14) | rgba(251,146,60,0.14) | PASS |
| myinfo | profile-tab active | color | #005268 | #005268 | PASS | #0cb8d0 | #0cb8d0 | PASS |
| myinfo | field-value | height | 40px | 40px | PASS | 40px | 40px | PASS |
| myinfo | field-value readonly | background | #f5f5f8 | #f5f5f8 | PASS | rgba(255,255,255,0.04) | rgba(255,255,255,0.04) | PASS |
| myinfo | phone-input-wrap | height | 40px | 40px | PASS | 40px | 40px | PASS |
| myinfo | card-title | font-size | 14px | 14px | PASS | 14px | 14px | PASS |
| people | dir-search | height | 38px | 38px | PASS | 38px | 38px | PASS |
| people | dir-select | height | 38px | 38px | PASS | 38px | 38px | PASS |
| people | dir-you | background | #f0f8fa | #f0f8fa | PASS | rgba(12,184,208,0.12) | rgba(12,184,208,0.12) | PASS |
| wfh | wfh-day-box | width | 38px | 38px | PASS | 38px | 38px | PASS |
| wfh | wfh-status-pill wfh | background | #c1f0d5 | #c1f0d5 | PASS | rgba(45,212,191,0.18) | rgba(45,212,191,0.18) | PASS |
| wfh | wfh-stat-icon wfh | background | #c1f0d5 | #c1f0d5 | PASS | rgba(23,148,132,0.22) | rgba(23,148,132,0.22) | PASS |
| wfh | wfh-cell weekend | background | #fafafa | #fafafa | PASS | rgba(255,255,255,0.01) | rgba(255,255,255,0.01) | PASS |
| wfh | wfh-nav-btn | width | 32px | 32px | PASS | 32px | 32px | PASS |
| timesheet | day-chip today | background | #005268 | #005268 | PASS | rgba(12,184,208,0.12) | rgba(12,184,208,0.12) | PASS |
| timesheet | day-chip | width | 68px | 68px | PASS | 68px | 68px | PASS |
| timesheet | ts-stat-value | font-size | 26px | 26px | PASS | 26px | 26px | PASS |
| timesheet | mini-bar filled | background | #005268 | #005268 | PASS | #0cb8d0 | #0cb8d0 | PASS |
| timeoff | balance-card | height | 121px | 121px | PASS | 121px | 121px | PASS |
| timeoff | bal-number | font-size | 28px | 28px | PASS | 28px | 28px | PASS |
| timeoff | bal-action-btn | width | 28px | 28px | PASS | 28px | 28px | PASS |
| timeoff | req-tab active | background | rgba(0,82,104,0.08) | rgba(0,82,104,0.08) | PASS | rgba(12,184,208,0.12) | rgba(12,184,208,0.12) | PASS |
| timeoff | req-status approved | color | #179484 | #179484 | PASS | #34d399 | #34d399 | PASS |
| timeoff | hist td pos | color | #179484 | #179484 | PASS | #34d399 | #34d399 | PASS |
| timeoff | hist-range-picker | height | 36px | 36px | PASS | 36px | 36px | PASS |
| newemp modal | modal | width | 740px | 740px | PASS | 740px | 740px | PASS |
| newemp modal | modal | box-shadow | rgba(0, 0, 0, 0.16) 0px 8px 40px 0px | rgba(0, 0, 0, 0.16) 0px 8px 40px 0px | PASS | rgba(0, 0, 0, 0.16) 0px 8px 40px 0px | rgba(0, 0, 0, 0.16) 0px 8px 40px 0px | PASS |
| newemp modal | modal-input | height | 40px | 40px | PASS | 40px | 40px | PASS |
| newemp modal | btn-cta | height | 38px | 38px | PASS | 38px | 38px | PASS |
| newemp modal | :scope | background | rgba(0,0,0,0.28) | rgba(0,0,0,0.28) | PASS | rgba(0,0,0,0.55) | rgba(0,0,0,0.55) | PASS |
| app-drop | :scope | box-shadow | rgba(0, 0, 0, 0.12) 0px 8px 32px 0px, rgba(0, 0, 0, 0.06) 0px 2px 8px 0px | rgba(0, 0, 0, 0.12) 0px 8px 32px 0px, rgba(0, 0, 0, 0.06) 0px 2px 8px 0px | PASS | rgba(0, 0, 0, 0.5) 0px 8px 32px 0px | rgba(0, 0, 0, 0.5) 0px 8px 32px 0px | PASS |
| app-drop | app-drop-item-current | background | #f0f8fa | #f0f8fa | PASS | rgba(12,184,208,0.1) | rgba(12,184,208,0.1) | PASS |
| profile-drop | dm-switch | width | 32px | 32px | PASS | 32px | 32px | PASS |
| request modal (A) | req-type-btn selected | border-color | #005268 | #005268 | PASS | #0cb8d0 | #0cb8d0 | PASS |
| request modal (A) | modal-input date | height | 40px | 40px | PASS | 40px | 40px | PASS |
| fill modal (B) | modal | box-shadow | rgba(0, 0, 0, 0.2) 0px 24px 60px 0px | rgba(0, 0, 0, 0.2) 0px 24px 60px 0px | PASS | rgba(0, 0, 0, 0.6) 0px 24px 60px 0px | rgba(0, 0, 0, 0.6) 0px 24px 60px 0px | PASS |
| fill modal (B) | close | radius | 50% | 50% | PASS | 50% | 50% | PASS |
| calc modal (B) | calc-result-number | color | #005268 | #005268 | PASS | #0cb8d0 | #0cb8d0 | PASS |
| calc modal (B) | calc-user-avatar | radius | 4px | 4px | PASS | 4px | 4px | PASS |
| ts modal (B) | time-input | width | 80px | 80px | PASS | 80px | 80px | PASS |
| fill-all overlay (C) | box | width | 420px | 420px | PASS | 420px | 420px | PASS |
| confirm overlay (C) | box | width | 340px | 340px | PASS | 340px | 340px | PASS |
| success popup (D) | card | box-shadow | rgba(0, 0, 0, 0.3) 0px 24px 64px 0px | rgba(0, 0, 0, 0.3) 0px 24px 64px 0px | PASS | rgba(0, 0, 0, 0.6) 0px 24px 64px 0px | rgba(0, 0, 0, 0.6) 0px 24px 64px 0px | PASS |
| success popup (D) | icon | background | #e8f5f3 | #e8f5f3 | PASS | rgba(23,148,132,0.18) | rgba(23,148,132,0.18) | PASS |
| toast | :scope | background | #1a1a1a | #1a1a1a | PASS | #26292e | #26292e | PASS |
| quick card (E) | qcard | width | 520px | 520px | PASS | 520px | 520px | PASS |
| quick card (E) | qcard | box-shadow | rgba(0, 0, 0, 0.2) 0px 24px 60px 0px | rgba(0, 0, 0, 0.2) 0px 24px 60px 0px | PASS | rgba(0, 0, 0, 0.6) 0px 24px 60px 0px | rgba(0, 0, 0, 0.6) 0px 24px 60px 0px | PASS |
| datepicker open | cal | width | 280px | 280px | PASS | 280px | 280px | PASS |
| datepicker open | dp-day selected | background | #005268 | #005268 | PASS | #0cb8d0 | #0cb8d0 | PASS |
| phone drop open | drop | box-shadow | rgba(0, 0, 0, 0.1) 0px 8px 24px 0px, rgba(0, 0, 0, 0.06) 0px 2px 6px 0px | rgba(0, 0, 0, 0.1) 0px 8px 24px 0px, rgba(0, 0, 0, 0.06) 0px 2px 6px 0px | PASS | rgba(0, 0, 0, 0.5) 0px 8px 24px 0px | rgba(0, 0, 0, 0.5) 0px 8px 24px 0px | PASS |
| select open | panel | box-shadow | rgba(0, 0, 0, 0.12) 0px 8px 32px 0px, rgba(0, 0, 0, 0.06) 0px 2px 8px 0px | rgba(0, 0, 0, 0.12) 0px 8px 32px 0px, rgba(0, 0, 0, 0.06) 0px 2px 8px 0px | PASS | rgba(0, 0, 0, 0.5) 0px 8px 32px 0px | rgba(0, 0, 0, 0.5) 0px 8px 32px 0px | PASS |
| save bar | :scope | background | #005268 | #005268 | PASS | #0cb8d0 | #0cb8d0 | PASS |
| request form page | send | border-color | #005268 | #005268 | PASS | #0cb8d0 | #0cb8d0 | PASS |
| request form page | sidebar | width | 320px | 320px | PASS | 320px | 320px | PASS |
| hover | btn-primary hover | opacity | 0.85 | 0.85 | PASS | 0.85 | 0.85 | PASS |
| hover | rv approve hover | background | #f0fdf4 | #f0fdf4 | PASS | rgba(52,211,153,0.1) | rgba(52,211,153,0.1) | PASS |
| hover | rv deny hover | background | #fef2f2 | #fef2f2 | PASS | rgba(248,113,113,0.1) | rgba(248,113,113,0.1) | PASS |
| hover | emp row hover td | background | #f5f5f8 | #f5f5f8 | PASS | rgba(255,255,255,0.03) | rgba(255,255,255,0.03) | PASS |
| hover | cust-select hover | border-color | #a8b6cd | #a8b6cd | PASS | rgba(255,255,255,0.2) | rgba(255,255,255,0.2) | PASS |
| hover | th hover | color | #005268 | #005268 | PASS | #0cb8d0 | #0cb8d0 | PASS |
| hover | detail-tab hover | color | #1a1a1a | #1a1a1a | PASS | #e2e8f4 | #e2e8f4 | PASS |
| hover | pool-row hover | background | #f5f5f8 | #f5f5f8 | PASS | rgba(255,255,255,0.03) | rgba(255,255,255,0.03) | PASS |
| hover | dir-row hover | background | #f5f7fa | #f5f7fa | PASS | rgba(255,255,255,0.03) | rgba(255,255,255,0.03) | PASS |
| hover | dir-row hover name | color | #003d50 | #003d50 | PASS | #0cb8d0 | #0cb8d0 | PASS |
| hover | profile-tab hover | color | #1a1a1a | #1a1a1a | PASS | #e2e8f4 | #e2e8f4 | PASS |
| hover | bal-action-btn hover | border-color | #7c8dac | #7c8dac | PASS | rgba(255,255,255,0.2) | rgba(255,255,255,0.2) | PASS |
| hover | modal-close hover | background | #f5f5f8 | #f5f5f8 | PASS | rgba(255,255,255,0.06) | rgba(255,255,255,0.06) | PASS |
| hover | btn-cancel hover | background | #f5f5f8 | #f5f5f8 | PASS | rgba(255,255,255,0.13) | rgba(255,255,255,0.13) | PASS |

## 4. Hub viewer
`http://localhost:3456/hub/ds-viewer.html#makor-hr` fetches `../makorx-ai/design-system/tokens.json` (the hub's platform id is `makorxai` but the viewer path uses the folder name; the hub's own links already point at `../makorx-ai/design-system/*`): **colours (11 groups incl. dark: 465 swatches), typography (3 families + 15 sizes), spacing (24) and border radius (10) render; no console errors.**

## 5. Intentional / expected differences (all other values are identical)
| explanation | property diffs |
|---|---|
| EXTENDED `.top-nav.is-static` (position:relative in documentation pages; the app nav is fixed) | 2 |
| icon recipe: mask `<span class="icon">` vs the app's inline `<svg>` (visible colour is identical) | 54 |
| the DS row shows the forced hover state (pointer) | 2 |
| the DS row shows the forced hover state (`.is-hover`), the app row is at rest | 8 |
| app JS (`poolPopulateDynamic`) overwrites the trigger width inline (widest option + 48); DS keeps the CSS class width | 6 |
| probe artefact: first `<span>` in the DS badge is the mask icon | 4 |
| bug #1: the app leaks the dark #e2e8f4 into light mode; DS = primary text | 1 |
| `margin-left:auto` resolves against the toolbar width (frame vs app) | 2 |
| the app's New Employee icon carries inline `cursor:pointer;pointer-events:auto`; DS click falls through to the input (same result) | 2 |
| bug #3: `.nav-sub` has no dark rule in the app; DS = secondary text | 1 |
| bug #34 (textarea styled, +76px) / 82vh rounding | 2 |
| decision #22: tile colour through `data-reqtype` (the app colours the inline svg stroke; visible icon colour is identical) | 2 |
| demo width (240px) vs the app's grid cell | 2 |
| bug #1 (phone code value) | 1 |
| demo shows a picked value (has-value) while the app's open-state demo is still the placeholder | 2 |
| context: flex item (block) in the app vs standalone inline-block demo | 6 |
| demo sets margin-bottom:0 | 2 |
| bug #6: the off-track has no dark rule in the app (a light #e5e7ec track on the dark menu); DS = DERIVED rgba(255,255,255,0.07) (guessed value, flagged) | 1 |
| bug #5: `.req-star` has no dark rule in the app (#da4d43 leaks); DS = danger text #f87171 | 1 |
| bug #19: `.req-date-native` has no dark colour in the app; DS = tertiary until `.has-date` | 1 |

## 6. Console / assets / coverage
- Showcase: **0 console errors, 0 failed requests** (checked after load in light and dark); every asset loads (49 icons through CSS masks, `logo-mark.svg` as `<img>`, fonts, `tokens.css`, `components.css`). **Defect found and fixed by this run: `assets/logo-mark.svg` was not well-formed XML (missing `</g>`) and showed as a broken image** (17 of 17 `<img>` instances); all 49 SVGs now parse.
- Every section renders in light and dark (screenshots reviewed: Employee list / detail (1920 and 2560), Requests, Time Tracking, Pool, My Info, People + quick card, WFH, Timesheet, Time Off, nav menus, modals, components).

## 7. Remaining deviations / not verifiable (honest list)
1. **Text content differs** (sample data), so widths of content-sized elements are not compared (only fixed-size controls and layout boxes are).
2. **Pool toolbar select widths** (137 / 173 / 171 in the app) are JS-measured; the DS keeps the CSS class widths 138 / 120 / 112 (documented).
3. **Scrollbar colours** were not measured (WebKit scrollbar pseudo-elements are not readable through computed style).
4. **Glyph shapes / emoji flags** (phone flags render as two letters on Windows) are font-dependent, identical on both sides.
5. **Hover** was compared for 25 element pairs per theme; the app has no focus / active / invalid styles, so the EXTENDED states (focus ring, invalid, disabled inputs, tooltip, spinner, skeleton, alert, tag, pagination, breadcrumb, file drop, empty states) have NO app counterpart to compare against: they were checked visually and for computed token values only.
6. **Derived dark values** (switch off-track, calendar out-of-period text, dir-flash tint) have no source value in the app (the app leaks / lacks them); they are flagged, not verified.
7. The two JS-driven animations (modal slide, dir-flash) were verified by their declared properties (transition / animation names and durations), not by frame capture.
8. Inline overrides inside the app (e.g. `style="width:100%"` on some selects) are reproduced where visible; none were needed as inline colours.

# Enigma X AUTH design system — VERIFICATION (stage B final run, 2026-10-14)

Target: `http://localhost:3456/enigma-x/auth-design-system/showcase.html` (own Chrome tab, DPR 1.5, window 1440x900 → CSS viewport 2321 wide). Live truth: `hub/auth/enigma-signin.html` (1440x900 iframe) and `hub/auth/enigma-authenticator.html` (1200x1000 iframe), same origin, same browser, driven through their own JS (`goToView`, `setupOTP`, `showFaceIDOverlay`, `showPushBanner`, `showSignInSheet`, `copyCode`, `handleCodeUsed`, `signOutSession`, `showToast`, `goToPwFallback`); the prototypes' `transition` was set to none so states compare settled values. Method: `getComputedStyle` + `getBoundingClientRect`, in-page comparison (no manual transcription).

## Summary

| check set | comparisons | pass | fail |
|---|---|---|---|
| A. PARITY vs live prototype: element probes (each compares 24 computed props + width/height) | 118 probes = 2,658 property comparisons | 118 | 0 real (see "artefacts" below) |
| B. Spec numbers (web-signin.md / authenticator.md, exact values) | 101 web + 139 app + 27 forced-state = 267 | 267 | 0 |
| C. Console | showcase page: 0 errors, 0 warnings | pass | — |
| D. Assets | 36 SVG requests, 0 HTTP errors, 0 broken `<img>`, 271 mask icons all resolve a `mask-image` url | pass | — |
| E. Coverage | 29 sections render (none empty), 29 nav links, 104 Copy-HTML demos, 28 component blocks, 11 Extended badges in sections | pass | — |
| F. Hub viewer | see end | n/a | — |

Fonts loaded in the page: DM Sans 400/500/600/700, DM Mono 500 (synthetic bold on 600 as designed).

## A. PARITY probes (prototype value = showcase value, all compared props equal)

Web, login (showcase "Screens > Web sign-in flow" card 1 vs prototype login view): card (440 x 545.16, padding `0 40px 36px`, radius 8, shadow), logo header (136 tall) + logo svg (72), title, sub, email label, email input, password input, password toggle + icon, field `--tight`, row, checkbox row + box + tick + label, link button, primary button, hidden field error.
Web, OTP (card 2): card (537.33 tall), eyebrow, h2, sub, slots row, slot (rest), separator, timer row, timer label, clock icon, timer value, resend link, Verify (disabled), back button + arrow.
Web, success (card 3): card (238.06 tall, padding 32), ring, check icon, title, sub.
Web states: input error (border + ring), button disabled, slot filled, slot error, OTP error message.
App (390x844 frames vs prototype states): home — shell, status bar + time + icons, banner, logo tile + logo + name, header, title, scroll, group label, session row + flag + loc + meta + Sign out, screens, home screen; launch — container, logo, name; Face ID — overlay, blur layer, wrap, card, 180 box, label, bottom, "Use Passcode" pill; push — banner, inner, top row, app name, time, content, icon, logo, title, sub; sheet — overlay, sheet, handle, map, map img, pill, dot, body, section title, grid, item, label, value, code card, header, label, countdown, OTP code, copy button + icon, block link; urgent countdown + copied button; confirmed — block, icon, check, title, text; London — active label, card, head, dot, location, detail grid, label, value, IP; dialog — overlay, dialog, title, body, actions, cancel, danger; toast (default, danger); password fallback — status bar (no chrome), screen, header, back + arrow, eyebrow, title, sub, form, group, label, email input, password input, toggle + icon, submit, button.

Artefacts (not deviations), all explained:
- Container `color` / `borderTopColor` / `outlineColor`: the prototypes' `body` has no colour (black), the shell here sets `#1A1F36`; no element renders this (border widths 0, text-bearing elements set their own colour). 86 such property diffs ignored.
- Icon colour/background: prototypes use inline `<svg>` (stroke/fill) and this system uses CSS masks (`background-color: currentColor`). The resolved colours match (logo `#7AEFEF`, tick `#000`, toggle `#9CA3AF`, back `#6B7280`, clock `#9CA3AF`) and `color` computes equal wherever it is set on the host.
- Map `<img>` is `display:block`, the prototype SVG is inline: identical box (358 x 160).
- London card in the prototype was captured mid-reveal (`opacity:0; scale(.97)`, requestAnimationFrame does not run in a hidden iframe); every size is exactly 0.97x ours (342 vs 331.74 etc.), i.e. identical at scale 1.
- Web timer value initially measured before the DM Mono face loaded in the iframe; re-measured after `document.fonts.ready`: equal.

## B. Spec numbers (selection by component; all passed)

| component | property | spec / live value | measured | result |
|---|---|---|---|---|
| web card | width / padding / radius / shadow | 440 / 0 40 36 / 8 / `0 4px 24px rgba(0,0,0,.08), 0 2px 4px rgba(0,0,0,.04)` | same | pass |
| web card | height login / OTP / success | 545.16 / 537.33 / 238.06 | same | pass |
| web card @375px (iframe) | padding / width | `0 24px 28px` / 343.33 | 24px, 28px, 343 | pass |
| logo | header / mark | 136 tall / 72x72, `#7AEFEF` | same | pass |
| title / sub | 24/700, lh 28.8, `#1A1F36` / 14, lh 21.7, `#6B7280`, mb 28 | same | pass |
| field label | 12/600, .04em = 0.48px | same | pass |
| input | 360 x 48, radius 4, bg `#F5F5F5`, padding 14, pw padding-right 44, border `#E2E2E2` | same | pass |
| input focus / error | border `#7AEFEF` + bg `#FFFFFF` + ring 4px `#7AEFEF18` / `#EF4444` + ring `rgba(239,68,68,.08)` | same | pass |
| toggle | 44x44, icon 18, `#9CA3AF` | same | pass |
| checkbox | box 16, radius 2, tick 10, checked `#7AEFEF`, row 142.34 | same | pass |
| link button | `#5ADADA`, 600, 123.55 wide | same | pass |
| primary button | 50 tall, radius 4, `#7AEFEF`, `#1A1A1A`, 16/600; hover `#5ADADA`; active scale .98; disabled `#D1D5DB`/`#6B7280`; loading spinner 18, `.65s`, label hidden; focus outline `#7AEFEF` offset 2 | same | pass |
| OTP slot | 58 tall, 50.41 wide at 360, radius 8, DM Mono 24/600; focus scale 1.05 + `#7AEFEF`; filled; error `#fef2f2` + shake .35s | same | pass |
| separator / error msg / eyebrow | 9.55 wide, 22px / 14/500, min-height 20 / .08em = 1.12px uppercase | same | pass |
| timer / back / success | clock 14, DM Mono value, warn `#EF4444` / 360 x 38.67, icon 16 / ring 72 `#7AEFEF18`, icon 34, title 22, pop-in | same | pass |
| app shell | 390 x 844, radius 44 (at 2321 wide), shadow `0 24px 64px rgba(0,0,0,.18), 0 0 0 2px rgba(0,0,0,.07)` | same | pass |
| status bar | 44, padding 14 / 28, chrome `#3DBFBF`, text `rgba(255,255,255,.9)`, icons 16 gap 6, pw screen transparent | same | pass |
| launch | logo 108 `#3DBFBF`, gap 40, padding-bottom 70.2, name 18, -.36px, 186.34 wide, z 40 | same | pass |
| Face ID | z 50, box 180x180, wrap pb 80, label 16 / 219.68 wide / -.16px, pill 147.68 x 42.67, `rgba(0,0,0,.06)`, hover .10 + `#1A1F36`, active .15, blur 6px, tint, fade .65s | same | pass |
| home | banner 72 `#3DBFBF`, tile 44 radius 10 `rgba(255,255,255,.22)`, logo 30, title 20 lh 24, header ~66 | same | pass |
| session row | 342 x 64.67, radius 8, gap 12, flag 36 radius 4, Sign out 76.44 x 36 `#E5686A` | same | pass |
| London card | 342 x 188, border `#DEE8ED`, dot 8, dotpulse 2.4s, grid padding 14 radius 8, label `#4DCC9B`, IP DM Mono | same | pass |
| push | 390 x 97.33, inner 370 x 87.33, radius 22, blur 48, z 300, icon radius 12, logo 22, lh 18.2 / 16.8 | same | pass |
| sheet | 390 x 578.67, z 101, radius 8, overlay `.45`, handle 36x4, map 358x160, pill 174.93 x 28 | same | pass |
| code card | 350 x 178.67, OTP 38px `.18em` = 6.84px, box 50, copy 52 radius 8 `#000`, icon 18; copied `#A8BECD`/`#7C9CAC`; urgent `#E5686A`; block 14 `#E5686A` | same | pass |
| confirmed | 138 tall, icon 56, check 28 | same | pass |
| dialog | 320 x 184.21, radius 14, shadow, overlay `.4`, z 200, buttons 136 x 46.67, cancel `#F7F8F8`, danger `#E5686A` | same | pass |
| toast | 358 x 46.67, `#000`, radius 4, z 999, bottom 32; danger `#E5686A` | same | pass |
| password fallback | header 215.79, back 44 + icon 15, eyebrow `#3DBFBF`, title 22, input 48 / pr 44, group 70, toggle 44 + icon 18, button 52 radius 4; hover `#5ADADA`, active scale .98, disabled `#A8BECD`; focus outline `#3DBFBF` offset 2; input focus `#7AEFEF` + double ring | same | pass |
| decided-behaviour states | copy focus keeps radius 8, block link focus radius 4, `.is-removing` / `.is-entering` opacity 0, web link hover .75 / disabled .45, checkbox focus outline (EXTENDED), input hover (EXTENDED), toggle pressed hides eye-show | same | pass |

(Heights ending in .67 / .21 / .16 are line-box dependent and were captured by the spec at DPR 1.5, the same DPR as this run. Border widths `1.5px` compute as 1.3333px at DPR 1.5 and were not compared numerically; authored value kept.)

## Findings during the run

- Reproduced live: prototype `copyCode()` logs `Uncaught (in promise) NotAllowedError ... Document is not focused` while the UI still says "Copied" (bug A2). This is the only console message of the run and it comes from the PROTOTYPE iframe, not the showcase.
- Prototype: the whole Face ID → home cold flow finished within the 6.5s wait (launch hold 1800 + scan 2200 + the duplicate start) as documented.

## Remaining deviations / not verifiable

1. **Hover/active of real `:hover`** cannot be triggered from script; forced classes (`.is-hover`, `.is-active`) were measured against spec numbers instead of live hover. The prototype's `:hover` rules were read from source.
2. **Copy HTML clipboard success** could not be confirmed in the automated tab: `navigator.clipboard.writeText` needs focus/permission there (a script click shows the failure path "Copy failed"; a real click leaves the write pending on the permission prompt). The button implements an awaited write with "Copied" only on success. Verify once in a normal browser.
3. **Face ID Lottie** is not rendered by design (documented dependency + labelled placeholder). Its timings, size (180x180 box), card colour `#404042` are documentation only; not verifiable offline.
4. **Radius of the shell** is `min(44px,4vw)`: 44px at this 2321px-wide viewport; the 24px (600px) and 15px (375px) values are not re-measured in this run (stage A measured them).
5. **Phone frames in the showcase** are fixed 390x844 by a showcase wrapper (the component itself uses `min(390px,100vw) x min(844px,100dvh)`); crops of 120/260/300/460px are showcase-only and noted on each demo.
6. **Spinner element**: `<span class="web-btn-spinner">` replaces the prototype's `<div>` inside a `<button>` (valid HTML); computed identical.
7. **ARIA additions** (`aria-pressed`, `aria-invalid`, `role=dialog`, `role=status`) are recommendations from the bug table, not in the source; no visual effect.
8. DM Mono 600 synthetic bold, the app input double focus ring, `.link-btn` contrast: reproduced as rendered and flagged (open decisions).
9. Props not compared: `transform` on animated elements (ring pop-in, slot shake, London reveal) and animation-in-progress rects; compared by name/duration instead.

## F. Hub viewer

`http://localhost:3456/hub/ds-viewer.html#enigma-x` loads the MAIN Enigma X app tokens (`../enigma-x/design-system/tokens.json`, title "Enigma X Design System"): the viewer builds `../${platformId}/design-system/tokens.json` from the hash and has no auth path. Auth tokens cannot be shown in the viewer through any existing route (a hash like `enigma-x/auth-design-system` would resolve to `.../auth-design-system/design-system/tokens.json`, which does not exist). The hub project page already links the auth files (Download CSS/JSON, View CLAUDE.md, View components.md, Open showcase from `../enigma-x/auth-design-system/`). `tokens.json` keeps the viewer-compatible schema (`color.<group>.<token>`, `font`, `fontSize`, `spacing`, `borderRadius`), so wiring it later needs only a viewer path change. Hub files were not edited.

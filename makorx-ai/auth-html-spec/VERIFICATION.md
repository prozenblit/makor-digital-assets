# MAKOR (MakorX.AI) auth design system - stage B verification (final run)

Date 2026-10-14. Page under test: `http://localhost:3456/makorx-ai/auth-design-system/showcase.html` (own Browser-pane tab, viewport emulated 1440x900, DPR 1.5). Live references: `hub/auth/makor-signin.html`, `makor-authenticator.html`, `makor-authenticator-dark.html`, each loaded in a same-origin 1440x900 iframe inside the test tab and driven through their own functions (`goToView`, `handleLogin`, `showPushBanner`, `showSignInSheet`, `signOutSession`, `showToast`, `goToPwFallback`, `revealCurrentSession`...), so every comparison is `getComputedStyle` / `getBoundingClientRect` of the showcase element against the live element at the same viewport (DPR-independent: both measured in the same context). Positions (x, y) are relative to the card / phone shell.

## Totals
| run | comparisons | pass | explained non-bugs |
|---|---|---|---|
| web login view vs live (card, logo, title, sub, 2 inputs, toggle, checkbox, link, row, button, terms, page, footer, watermark, canvas) | 141 | 132 | 9 (see below) |
| web OTP view vs live | 131 | 131 | 0 |
| web success view vs live | 33 | 33 | 0 |
| web error / loading / OTP-error states vs live | 31 | 31 | 0 |
| web login + OTP re-run after the final components.css fix | 154 | 154 | 0 |
| authenticator LIGHT vs live (launch, Face ID, home, active session, banner, sheet, confirm, toast, password) | 718 | 717 | 1 (live clock text) |
| authenticator DARK vs live (same 9 states) | 718 | 716 | 2 (live clock text; harness selector) |
| spec-number checks of forced states the live files cannot show (hover/active/focus/disabled/loading/EXTENDED/z-index/sizes, light + dark) | 124 | 121 | 3 (wrong expectations, see below) |
| **total** | **~1,900** | all real mismatches fixed | |

Also: console errors **0**; resources **43 loaded, 0 failed**; 15 mask-icon URLs fetched **200**, 0 icons without a mask; every one of the 13 sections and 29 article cards rendered (none empty); fonts Geist and EB Garamond loaded; Copy-HTML verified (copies clean markup: no `sc-*` classes, light pane + dark-scope note); the real `@media (max-width:560px)` verified in a 375px iframe (card padding `0 32px 40px`). Screenshots reviewed in light and dark: web backdrop/logo/inputs, login and OTP stages, Face ID (light + dark glass card), home (active session), bottom sheet.

## Results by component (key properties; "measured" = showcase computed value; live/spec equal within 0.6px)
### Web sign-in
| component | property | spec / live | measured | |
|---|---|---|---|---|
| card | width / padding / radius / bg | 460 (inner 364) / 0 48 48 / 16 / #EDF3F6 | same | pass |
| card | shadow | `0 2px 40px rgba(0,30,50,.10), 0 1px 4px rgba(0,30,50,.05)` | same | pass |
| card login height | 535.52 (spec) | 535.19 live and showcase (DPR text rounding) | pass |
| card @375 | padding | 0 32 40 | 0 32 40 (iframe) | pass |
| logo | size | 90 x 72 | 90 x 72 | pass |
| logo header | padding / gap | 36 0 24 / 10 | same | pass |
| title | tuple | EB Garamond 38/500 lh 41.8 ls .38 small-caps #0B2530 mb 8 | same | pass |
| OTP title | size / lh | 30 / 33 | same | pass |
| sub | tuple | Geist 14/400 lh 22.4 #537380 mb 28 | same | pass |
| eyebrow | tuple | 11/600 .14em uppercase #005268 mb 10 | same | pass |
| input | h / radius / border / bg / font | 48 / 8 / 1.5 transparent / #FFF / 14 | same | pass |
| input focus | border / ring | #005268 / 0 0 0 3px rgba(0,82,104,.07) | same | pass |
| input error | border / ring | #B53A3A / 0 0 0 3px rgba(181,58,58,.07) | same (live with transitions disabled) | pass |
| field error | tuple | 12px #B53A3A mt 4 | same | pass |
| toggle | box / icon / colour / hover | 44 / 18 / #90AEBC / #537380 | same | pass |
| checkbox | box / radius / checked bg / unchecked bg+border | 16 / 3 / #005268 / #EDF3F6 + #CCDDE4 | same | pass |
| checkbox focus (E) | outline | 2px #005268 offset 2 | same | pass |
| link button | tuple / hover / disabled | 13/600 #005268 / opacity .7 / .4 | same | pass |
| primary button | h / radius / font / ls | 50 / 8 / 15/600 / .15px | same | pass |
| primary hover / active | bg / transform | #003D4F / scale(.99) | same | pass |
| primary focus | outline / radius | 2px offset 2 / **8** (decided) | same | pass |
| primary disabled | bg / label | #7FA0AB / rgba(255,255,255,.65) | same | pass |
| primary loading | bg / spinner | #7FA0AB / 18px .65s linear | same | pass |
| terms | tuple | 12/400 lh 18 #90AEBC mt 18; links 500 | same | pass |
| back link | tuple / icon | 13/500 #537380 mb 28 / 15 | same | pass |
| OTP slot | size / radius / border / font | **54 x 68** / 12 / 1.5 #CCDDE4 / serif 30/500 | same; x positions 48 + n*62 | pass |
| OTP slot focus | transform / ring | scale(1.03) / 3px ghost | same | pass |
| OTP slot filled / error | border / bg / anim | #005268 / #B53A3A + rgba(181,58,58,.04) / shake .35s | same | pass |
| OTP error message | tuple | 13/500 #B53A3A min-h 20 mb 4 | same | pass |
| timer | row / value / clock | 13px #90AEBC / serif 13/500 #537380 / 14px | same | pass |
| timer warn / expired | colour | #B53A3A | same | pass |
| resend note | tuple | 13 #90AEBC mt 16; strong 700 | same | pass |
| verify (disabled) | size / bg | 364 x 50 / #7FA0AB | same | pass |
| success | card / ring / tick / title | 460 x 271.46 / 68 / 32 / serif 30 normal | same | pass |
| success ring anim | duration / easing | .45s cubic-bezier(.34,1.56,.64,1) | same | pass |
| footer | tuple / opacity | 10/600 .1em uppercase .7 | same | pass |
| watermark | size / opacity | 360 x 288 / .045 | same | pass |

### Mobile authenticator (light and dark each)
| component | property | spec / live | measured | |
|---|---|---|---|---|
| shell | size / radius / shadow / bg | 390x844 / 44 (pinned in the showcase) / light + dark shadows / app-bg + dark glow | same | pass |
| status bar | height / padding / home bg | 44 / 14 28 0 / #0D8090, white .9 | same | pass |
| launch | z / padding-bottom / gap / bg | 40 / 70.2 / 20 / #C8D8DF or dark gradients | same | pass |
| launch tile | size / radius / shadow / glyph | 96 / 22 / light + dark / 56x45 | same | pass |
| launch name | tuple | 20 (500 light, 400 dark) lh 28 .2px | same | pass |
| Face ID | z / frame / label | 50 / 180x180 r12 / 20/400 | same | pass |
| Face ID dark card | size / radius / padding / bg / blur | 229.33 x 225.33 / 28 / 24 24 20 / rgba(18,28,38,.70) / 12 | same | pass |
| Face ID veil | bg / blur | light rgba(235,235,235,.12) 6; dark rgba(7,12,18,.42) 8 | same | pass |
| secondary button | size / fill / hover / active | 148.51 x 42 / .06 / .10 / .15 (dark .07/.12/.17) | same | pass |
| home banner / glass icon | 74 / 44 r10 | same | pass |
| home card | radius / bg | 20 20 0 0 / app-bg | same | pass |
| home title / label | 18/500 / 12/700 .1em | same | pass |
| session row | size / radius / padding | 342 x 64 / 8 / 14 | same | pass |
| flag / chip | 36 r4 / 77.18 x 36 | same | pass |
| active session | card / dot / grid | 342 x 184.67 / 8px pulse 2.4s / 307.33 x 98 | same | pass |
| banner | size / z / inner / blur / radius | 390 x 96.67 / 300 / 370 x 86.67 / 48 / 22 | same | pass |
| sheet | size / radius / z | 390 x 583.33 (dark 585.33) / 8 8 0 0 / 101 | same | pass |
| sheet parts | handle / map / pill / info cells / code card | 36x4 / 358x160 / 173.36x27.33 / 170x34.67 / padding 16 | same | pass |
| OTP code | size / ls / height | 44 / 9.68px / 56.67 | same | pass |
| copy button | size / radius / gap | 100% x 52 / 8 / 10 | same | pass |
| block link | size | 350 x 38 | same | pass |
| confirmed block | ring / glyph | 56 / 28 | same | pass |
| confirm dialog | size / radius / z | 320 x 183.54 / 14 / 200 | same | pass |
| confirm buttons | size | 136 x 46 | same | pass |
| toast | size / bottom / z / dark border | 358 x 46 (dark 47.33) / 32 / 999 / 1px #1E2F3C | same | pass |
| toast danger | bg | #DA4D43 / dark #FF6B6B | same | pass |
| password screen | top / back / input / toggle / button | 227.13 / 131.68x44 / 48 r4 / 44 / 52 | same | pass |
| button hover / active / loading / focus | bg / transform | #003D4F (dark #10A898) / .98 / #A8B6CD / outline 2px radius 4 | same | pass |
| input focus | border / ring | primary / 0 0 0 4px ghost (light .0784, dark .13) | same | pass |
| z-index stack | launch 40, Face ID 50, scrim 100, sheet 101, confirm 200, banner 300, toast 999 | same | pass |

## Remaining deviations (explained, none is a defect of the design system)
1. **Positioned overrides in the showcase** (deliberate): web footer / watermark / canvas are `position:absolute` inside a clipped stage (the source uses `fixed`); the canvas is window-sized as in the source and clipped. The phone shell radius is pinned to 44px (source `min(44px,4vw)`, 44 at >= 1100px).
2. **Live clock:** the status-bar time width differs by < 1px because the live file shows the real time (3 comparisons).
3. **`border-top-color` of borderless elements** (Face ID card, dialog, sheet, code card in light): `border:none` leaves the colour as `currentColor`, which inherits from different parents (harness artifact, not rendered).
4. **Hidden-pane timeline:** transitions and animations are frozen in the hidden Browser pane. For live comparisons `*{transition:none!important}` was injected into the live frame; the live "Active now" reveal animation was reset to `transform:none; opacity:1` before measuring. Animations are verified by computed name / duration / easing / iteration (names differ by prefix: `mauth-spin` vs `spin`), not by playback.
5. **DPR 1.5 snapping:** a source `1.5px` border computes 1.33px and `2.5px` 2.67px; both sides are measured in the same context. A 1px stage border makes a 414px stage inner 364.67 (0.67 over 364): ignored by the 0.6px tolerance only in that one stage.
6. **Three wrong test expectations of mine** (not mismatches): web back-link height 17.33 (I had 15.33), success ring measured at animation start (scale .2 -> 13.6 = 68 x .2, timeline frozen), app focus ring alpha serialised `0.08` for `#00526814` (= .0784).
7. Fixes made during this run: `components.css` `.mauth-web` / `.mauth-app` root now sets `line-height: normal; font-size: var(--mauth-text-16)` (host-page inheritance leak: label lh 18.85px vs normal; active-session head 35.33 vs 38px); showcase home label "Recent sign-ins" is `--spaced` (inline margin-top 16 in the source). No other `components.css` / `tokens.*` change.

## Not verifiable / not verified
- The **Face ID dotLottie** (remote; documented only; no visual comparison possible) and the Lottie byte size.
- **Playback** of animations, the constellation visual (parameters identical to the source; dots are random per run) and the hover/active states of the live prototypes (forced classes are compared with the spec numbers instead).
- Contrast ratios (taken from the spec formula, not re-measured), reduced-motion behaviour (EXTENDED, no source), real touch devices, Safari / Firefox, `file://` (masks blocked), print.
- Offline font fallback, Enigma X auth cross-check, hub `ds-viewer.html` / `projects.js` wiring (outside this stage).
- The real screenshot of the **short-viewport footer overlap** (source bug, documented; reproduced as rendered).

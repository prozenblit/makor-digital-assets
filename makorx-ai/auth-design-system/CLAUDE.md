# MAKOR (MakorX.AI) Auth - agent brief

Load this file first for ANY work on the Makor sign-in web page or the Makor mobile authenticator. Then `components.md` (copy-paste HTML + JS), `tokens.css` / `tokens.json`, `components.css`, `constellation.js`, `showcase.html` (live reference), `assets/`.

## 1. What this is
- **Auth design system of MakorX.AI**, rebuilt (2026-10-14) from the HTML prototypes - there is no Figma. Two surfaces: **web sign-in** (`hub/auth/makor-signin.html`; **light only**; login -> OTP -> success) and the **mobile authenticator** (`makor-authenticator.html` light + `makor-authenticator-dark.html` dark; one system, dark = a `data-theme="dark"` scope).
- **Relation to the HR app:** a SEPARATE system (`makorx-ai/design-system/`). Same brand teal `#005268` and Geist, but different radii (card 16, field 8, slot 12), controls (input 48, button 50/52) and palette. Tokens are prefixed `--mauth-*`, classes `.mauth-web-*` / `.mauth-app-*` / `.mauth-icon` - never mix with `--color-*`, `.btn`, etc. Do not use HR components in auth flows.
- **Relation to Enigma X auth** (`enigma-x/auth-design-system`): same flow and timings (login -> OTP -> success; 180 s code, 30 s resend, 5 s redirect, 9 s banner), different palette and fonts (Enigma: DM Sans / DM Mono). Differences are recorded, not unified (owner decision). The legacy `enigma_auth` BroadcastChannel name in these prototypes is replaced by `makor_auth`.

## 2. Source of truth
`hub/auth/makor-signin.html` (S, 702 lines), `makor-authenticator.html` (A, 1291), `makor-authenticator-dark.html` (D, 1363) and the harvested specs `makorx-ai/auth-html-spec/web-signin.md` + `authenticator.md` (line numbers, computed values, copy). Stage notes: `makorx-ai/auth-html-spec/build-notes.md`. Measured result: `makorx-ai/auth-html-spec/VERIFICATION.md`. Every rule block in `components.css` starts with `src: file Lline`. Effective (rendered) values win. **Owner decision 2026-10-14: DOCUMENT, DON'T REPRODUCE** source bugs; **EXTEND** only from existing tokens and mark it `EXTENDED`.

## 3. Non-negotiables (each proven by the spec)
1. **Fonts:** Geist 400/500/600/700 everywhere. **EB Garamond 500 ONLY in the web sign-in** (titles "Welcome back" / "Verify it's you" / "Identity verified" in small-caps, OTP digits, timer value). **The authenticator has NO serif** (the source declares `--font-serif` but never loads or uses it). No Lexend Exa (HR nav wordmark).
2. **Web is light only** (no dark web theme, no `prefers-color-scheme`). Brand `#005268`; dark authenticator brand `#17C3AF` (not the HR dark `#0cb8d0`).
3. **Dark = `[data-theme="dark"]` on any ancestor** (phone wrapper or `<html>`). There is no `body.dark`, `[data-mode]`, media query or code ring.
4. **Web card:** 460 max (inner 364), r16, shadow `0 2px 40px rgba(0,30,50,.10), 0 1px 4px rgba(0,30,50,.05)`, padding `0 48px 48px` (`0 32px 40px` at <= 560px: the only media query). Inputs 48 r8 (1.5px transparent border), button 50 r8 15/600, OTP slot **54 x 68** r12 (six separate inputs), logo mark 90x72 (no wordmark text).
5. **Phone shell** `min(390px,100vw) x min(844px,100dvh)`, radius `min(44px,4vw)`; no notch, dynamic island, bezel, home indicator or tab bar. Status bar 44px.
6. **App radii:** controls 4 (buttons, input, toast, chips, flag, map, handle); sheet copy button **8** (not 4); cards 8; dialog 14; banner and launch tile 22; home card top 20; sheet top 8; Face ID dark card 28. **Toast and primary button stay 4.**
7. **Focus:** keyboard focus = 2px solid brand outline, offset 2px, **radius unchanged** (the source's 4px override is a bug). Inputs: border + ring only (web 3px ghost, app 4px ghost); web error ring `rgba(181,58,58,.07)` wins over focus.
8. **OTP (web):** focus `scale(1.03)`; filled keeps the brand border; error = danger border + `rgba(181,58,58,.04)` fill + shake .35s; expired/disabled has **no style** in the source. **OTP (app sheet):** static code `482 716` (44/500, ls .22em), copy writes `482716`; there is **no ring, progress bar or 30 s refresh**.
9. **Spring easing** `cubic-bezier(.34,1.56,.64,1)` exists once (web success ring pop-in .45s).
10. **Loading looks disabled** on the web primary button (grey `#7FA0AB`, white spinner), because the source disables it while loading.
11. **Face ID** is a remote dotLottie: documented, never imitated (section 9).
12. Masks need http(s). Never redraw icon paths; use `assets/`.

## 4. Tokens (`tokens.css` on `:root`, dark overrides under `[data-theme="dark"]`; `tokens.json` mirrors 1:1)
### 4.1 Web (light only)
| token | value | role |
|---|---|---|
| `--mauth-web-bg` | `#C8D8DF` | Page backdrop (solid colour, no gradient). html+body. |
| `--mauth-web-surface` | `#EDF3F6` | Card background; unchecked checkbox bg. |
| `--mauth-web-field` | `#FFFFFF` | Input background and OTP slot background (white on the #EDF3F6 card). |
| `--mauth-web-primary` | `#005268` | Brand: primary button, links, focus border, filled slot border, caret, eyebrow accent, su... |
| `--mauth-web-primary-hover` | `#003D4F` | Primary button hover only. |
| `--mauth-web-primary-ghost` | `rgba(0,82,104,0.07)` | Focus ring (3px) on input + OTP slot; success-ring fill. |
| `--mauth-web-text` | `#0B2530` | Headings, input text, slot digits, back-link hover. |
| `--mauth-web-text-2` | `#537380` | Sub text, eyebrow, labels, back link, timer value, footer text, toggle hover. |
| `--mauth-web-text-3` | `#90AEBC` | Placeholders, terms text, timer label, resend note, toggle rest colour. Low contrast on s... |
| `--mauth-web-border` | `#CCDDE4` | OTP slot border (rest), checkbox border (unchecked). |
| `--mauth-web-danger` | `#B53A3A` | Field error + OTP error text/border, timer warn. |
| `--mauth-web-disabled` | `#7FA0AB` | Disabled primary button background (also what a loading button looks like: JS sets disabl... |
| `--mauth-web-danger-ghost` | `rgba(181,58,58,.07)` | Error ring (3px) on inputs. Raw in source (no variable). |
| `--mauth-web-danger-tint` | `rgba(181,58,58,.04)` | OTP slot error background tint. Raw in source. |
| `--mauth-web-on-primary` | `#fff` | Text/spinner top on primary button; checkbox tick. Raw in source. |
| `--mauth-web-on-disabled` | `rgba(255,255,255,.65)` | Disabled primary button label. Raw in source. |
| `--mauth-web-spinner-track` | `rgba(255,255,255,.3)` | Spinner ring track on the primary button. Raw in source. |
| `--mauth-web-constellation` | `#002D46` | Canvas ink = rgb(0,45,70). Dots rgba(...,.3), links rgba(...,.1*(1-d/155)). Consumed by c... |

### 4.2 Authenticator - light | dark pairs
| token | light | dark | role |
|---|---|---|---|
| `--mauth-app-bg` | `#F5F5F8` | `#0C1219` | Shell background, home content card, page bg (light). |
| `--mauth-app-surface` | `#FFFFFF` | `#121C26` | Cards, sheet, dialog, password screen, session rows. |
| `--mauth-app-surface-2` | `#F5F5F8` | `#192533` | Flag tile, input bg, code card, cancel button, spec grid. E... |
| `--mauth-app-primary` | `#005268` | `#17C3AF` | CTA fill, eyebrow, dots, loc-dot, launch app name, confirme... |
| `--mauth-app-primary-hover` | `#003D4F` | `#10A898` | Primary button hover. Raw in source. |
| `--mauth-app-primary-ghost` | `#00526814` | `rgba(23,195,175,0.13)` | Pulse-dot ring, input focus ring, confirmed-icon bg. 8-digi... |
| `--mauth-app-text` | `#000000` | `#E6EFF4` | Primary text. |
| `--mauth-app-text-2` | `#7C8DAC` | `#87A8B5` | Secondary text, subtitle, labels. |
| `--mauth-app-text-3` | `#A8B6CD` | `#4E6A78` | Tertiary text, meta, section labels, disabled button bg. |
| `--mauth-app-border` | `#E5E7EC` | `#1E2F3C` | Input border, sheet handle, dividers, map placeholder. |
| `--mauth-app-danger` | `#DA4D43` | `#FF6B6B` | Sign out, block link, danger toast + confirm button, urgent... |
| `--mauth-app-success` | `#179484` | `#2DD4BF` | "Active now" label only. |
| `--mauth-app-page-bg` | `#F5F5F8` | `#080F15` | Document backdrop outside the phone shell. |
| `--mauth-app-toast-bg` | `#000000` | `#192533` | Toast background (source used --c-black). |
| `--mauth-app-toast-text` | `#fff` | `#E6EFF4` | Toast text. Raw in source. |
| `--mauth-app-launch-bg` | `#C8D8DF` | `radial-gradient(ellipse at 50% 22%, rgba(10,115,132,0.72)...` | Launch screen background (opaque; same hex as web-bg but a... |
| `--mauth-app-faceid-blur-bg` | `rgba(235,235,235,.12)` | `rgba(7,12,18,0.42)` | Face ID overlay veil (with blur(6px)). |
| `--mauth-app-faceid-card-bg` | `transparent` | `rgba(18,28,38,0.70)` | Face ID card background (light = transparent; the glass car... |
| `--mauth-app-faceid-tint` | `transparent` | `rgba(10,35,55,0.72)` | Dark-only blend tint over the Lottie; light has none (a tra... |
| `--mauth-app-fallback-bg` | `rgba(0,0,0,.06)` | `rgba(255,255,255,.07)` | Secondary "Use Passcode" button bg. |
| `--mauth-app-fallback-bg-hover` | `rgba(0,0,0,.10)` | `rgba(255,255,255,.12)` | Secondary button hover bg. |
| `--mauth-app-fallback-bg-active` | `rgba(0,0,0,.15)` | `rgba(255,255,255,.17)` | Secondary button active bg. |
| `--mauth-app-banner-bg` | `rgba(0,0,0,0.20)` | `rgba(0,0,0,0.55)` | Push banner glass bg (with blur(48px)). |
| `--mauth-app-banner-border` | `rgba(255,255,255,0.14)` | `rgba(255,255,255,0.10)` | Push banner 1px border. |
| `--mauth-app-banner-time` | `rgba(255,255,255,0.60)` | `rgba(255,255,255,0.55)` | Push banner "now". |
| `--mauth-app-banner-sub` | `rgba(255,255,255,0.78)` | `rgba(255,255,255,0.65)` | Push banner subtitle. |
| `--mauth-app-overlay-confirm` | `rgba(0,0,0,.4)` | `rgba(0,0,0,.6)` | Confirm dialog scrim. |
| `--mauth-app-overlay-sheet` | `rgba(0,0,0,.45)` | `rgba(0,0,0,.60)` | Bottom sheet scrim. |
| `--mauth-app-map-bg` | `#E5E7EC` | `#152030` | Sheet map placeholder bg under the map art (= app-border). |
| `--mauth-app-pill-bg` | `rgba(255,255,255,.92)` | `rgba(18,28,38,.94)` | Map location pill bg (with blur(8px)). |

### 4.3 Authenticator - same in both themes
`--mauth-app-on-primary` `#fff` · `--mauth-app-on-danger` `#fff` · `--mauth-app-status-home-bg` `#0D8090` · `--mauth-app-status-home-fg` `rgba(255,255,255,0.9)` · `--mauth-app-home-grad-1` `#0D8090` · `--mauth-app-home-grad-2` `#0A5888` · `--mauth-app-home-grad-3` `#1E3578` · `--mauth-app-on-gradient` `#fff` · `--mauth-app-glass-bg` `rgba(255,255,255,0.14)` · `--mauth-app-glass-border` `rgba(255,255,255,0.22)` · `--mauth-app-glass-inset` `rgba(255,255,255,0.25)` · `--mauth-app-banner-appname` `rgba(255,255,255,0.80)` · `--mauth-app-banner-title` `rgba(255,255,255,1.0)` · `--mauth-app-logo-glyph` `#fff` · `--mauth-app-logo-base` `#005268` · `--mauth-app-logo-g1` `rgba(0,89,159,0.9)` · `--mauth-app-logo-g2` `rgba(0,99,91,0.85)` · `--mauth-app-logo-g3` `rgba(0,184,184,0.75)` · `--mauth-app-faceid-lottie-card` `#404042`

### 4.4 Other families
- **Fonts:** `--mauth-font-sans` 'Geist', -apple-system, sans-serif; `--mauth-font-serif` 'EB Garamond', Georgia, serif (web only); `--mauth-font-mono` = alias of sans.
- **Sizes (px):** `--mauth-text-N` N = 10 11 12 13 14 15 16 18 20 30 32 38 44. Weights `regular 400, medium 500, semibold 600, bold 700`. Leading `web-title 1.1, web-body 1.6, web-terms 1.5, app-heading 1.2, app-body 1.55, app-compact 1.45, app-snug 1.4, app-tight 1.3`. Tracking `title .01em, eyebrow-web .14em, footer .1em, eyebrow-app .12em, label .04em, spec .09em, code .08em, info .07em, banner .02em, tight -.01em, otp .22em`.
- **Spacing (OBSERVED literals; the source defines no spacing tokens):** `--mauth-space-N` for N = 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 28, 32, 36, 40, 44, 48, 80.
- **Radii:** `checkbox` 3px (Web checkbox box.) · `control` 4px (App controls: primary/secondary/chip/confirm buttons...) · `web-field` 8px (Web input + web primary button.) · `card-sm` 8px (App session card, spec grid, code card, copy button.) · `sheet` 8px 8px 0 0 (App bottom sheet (top corners only).) · `home-icon` 10px (App home glass logo icon.) · `otp-slot` 12px (Web OTP slot.) · `faceid` 12px (App Face ID frame (and dark ::after tint).) · `banner-icon` 12px (App push banner app icon.) · `dialog` 14px (App confirm dialog.) · `web-card` 16px (Web sign-in card.) · `home-card` 20px 20px 0 0 (App home content card (top corners).) · `banner` 22px (App push banner inner.) · `launch-icon` 22px (App launch logo tile.) · `faceid-card` 28px (App Face ID glass card, DARK only (light card has no r...) · `shell` min(44px, 4vw) (Phone frame (44px at >=1100px wide; 15-17px on phone-w...) · `round` 50% (Success ring, spinner, status dots, confirmed icon.).
- **Heights:** `web-field` 48px · `web-button` 50px · `web-otp-slot` 68px · `app-button` 52px · `app-input` 48px · `app-confirm-button` 44px · `app-chip` 36px · `app-back` 44px. **Sizes:** `web-card-max` 460px · `web-logo-w` 90px · `web-logo-h` 72px · `web-watermark-w` 360px · `web-watermark-h` 288px · `web-watermark-offset` -40px · `web-toggle` 44px · `web-toggle-icon` 18px · `web-checkbox` 16px · `web-checkbox-tick` 10px · `web-spinner` 18px · `web-clock` 14px · `web-back-icon` 15px · `web-success-ring` 68px · `web-success-icon` 32px · `web-footer-bottom` 22px · `app-shell-w` min(390px, 100vw) · `app-shell-h` min(844px, 100dvh) · `app-status-bar` 44px · `app-status-icon` 16px · `app-launch-icon` 96px · `app-launch-glyph-w` 56px · `app-launch-glyph-h` 45px · `app-faceid` 180px · `app-faceid-bleed` 14px · `app-home-icon` 44px · `app-home-glyph-w` 28px · `app-home-glyph-h` 22px · `app-banner-icon` 44px · `app-banner-glyph-w` 24px · `app-banner-glyph-h` 19px · `app-flag` 36px · `app-toggle` 44px · `app-toggle-icon` 18px · `app-back-icon` 15px · `app-dialog-max` 320px · `app-handle-w` 36px · `app-handle-h` 4px · `app-map-h` 160px · `app-sheet-max-h` 88% · `app-dot` 8px · `app-copy-icon` 18px · `app-confirmed-icon` 56px · `app-confirmed-glyph` 28px.
- **Borders:** field 1.5px, hairline 1px, spinner 2.5px, focus outline 2px offset 2px. **Opacity:** watermark .045, footer .7, link hover .7 / disabled .4, pressed confirm .7 / copy .85. **Scale:** press web .99, press app .98, OTP focus 1.03, dialog rest .95, row exit .97.
- Shadows, blurs, gradients: `--mauth-shadow-*`, `--mauth-blur-*` (banner 48, glass icon 16, pill 8, Face ID veil 6 / 8 dark, glass card 12 dark), `--mauth-app-logo-gradient`, `--mauth-app-home-gradient` (see tokens.css).

## 5. Typography (every tuple: showcase "Typography")
Web: title 38/500 serif small-caps lh 1.1 ls .01em (OTP title 30, success title 30 lh normal ls normal); sub 14/400 lh 1.6; eyebrow 11/600 .14em uppercase; input 14; error 12; labels/links/back/timer 13 (link 600, back 500); button 15/600; terms 12 lh 1.5; footer 10/600 .1em uppercase opacity .7; OTP digit serif 30/500; timer value serif 13/500. App: status time 16/600; launch name 20 (light 500 / dark 400); "Locked" 20/400; home title 18/500; password title 32/500; sub 14 lh 1.55; eyebrow 10/700 .12em; section label 12/700 .1em; session loc 14/600, meta 12; chip 12/600; input 16; button 16/600; banner title 14/700, sub 12; confirm title 16/700; sheet labels 10; OTP code 44/500; toast 14/500.

## 6. Sizes, layout, breakpoints
Web: `.page` flex-centred, padding 80 16, min-height 100vh; footer fixed bottom 22, padding 0 36; watermark fixed 360x288 at -40/-40 opacity .045. **Only breakpoint: 560px** (card padding). App: no media queries (fixed phone). Shell stack inside the phone (z-index): `web-canvas` 0 · `web-watermark` 0 · `web-page` 1 · `web-footer` 2 · `app-faceid-content` 1 · `app-faceid-tint` 2 · `app-launch` 40 · `app-faceid` 50 · `app-sheet-overlay` 100 · `app-sheet` 101 · `app-confirm` 200 · `app-banner` 300 · `app-toast` 999.

## 7. Components (S = source-defined, E = EXTENDED part). Full markup in `components.md`
| component | class root | notes |
|---|---|---|
| Web backdrop, canvas, watermark, footer, card (+`--success`) | `.mauth-web-page/-canvas/-watermark/-footer/-card` | S. Footer overlaps the card < ~700px tall (flagged) |
| Web logo | `.mauth-web-logo` | S. 90x72 mask |
| Web input, toggle, checkbox | `.mauth-web-input(--no-toggle)/-toggle/-checkbox` | S; hover, disabled, aria-invalid, checkbox focus ring = E |
| Web buttons / links | `.mauth-web-btn--primary/-link-btn(--strong)/-back/-terms` | S; terms-link focus = E. Only ONE button variant exists |
| Web OTP slots, error, timer, resend | `.mauth-web-otp(-slot)/-otp-error/-timer-row/-resend-note` | S. `.is-expired` = decided copy |
| Web success | `.mauth-web-success(-ring/-title/-sub)` | S |
| Phone frame, status bar, screen stack | `.mauth-app-shell/-status-bar(--home)/-screens/-screen` | S |
| Launch, Face ID card, secondary button | `.mauth-app-launch/-faceid/-btn-secondary` | S; placeholder = E |
| Home, session rows, active session | `.mauth-app-home-*/-session(--active)` | S |
| Push banner, bottom sheet + code card, confirm dialog, toast | `.mauth-app-banner/-sheet/-code-card/-confirm/-toast` | S |
| Password fallback (input, label, primary button) | `.mauth-app-pw-*/-input/-btn` | S; input hover/invalid = E |
| Icons | `.mauth-icon--<asset>` | 16 masks |
| Reduced motion, constellation `stop()` | - | E |

Forced state classes: `.is-hover .is-focus .is-active .is-disabled .is-loading .is-error .is-filled .is-warn .is-expired .is-shown .is-show .is-open .is-hidden .is-checked .is-revealed .is-urgent .is-copied .is-removing .is-before`.

## 8. Motion & timings
| what | value |
|---|---|
| login -> OTP loading | 1300 ms; OTP verify 1100 ms; wrong-code slots clear 600 ms (focus s0 650 ms) |
| code expiry | 180 s (`m:ss`, warn <= 30 s); resend cooldown 30 s ("Resend in {n}s"); redirect countdown 5 s |
| launch | 1800 ms; Face ID scan 2200 ms (`.active` after 60 ms); password verify 1400 ms; sheet opens 400 ms after unlock |
| banner auto-hide | 9000 ms (slide .42s `cubic-bezier(.32,0,.04,1)`); toast 3000 ms (.28s); copy "Copied!" 2000 ms |
| confirmed auto-close | 2800 ms (+220 ms fade, +500 ms reveal); row removal 230 ms; sheet reset 450 ms |
| UI transitions | field .18s, hover .12s, button bg .15s, press .08s, OTP scale .1s, shake .35s, pop-in .45s spring, spinner .65s linear, dot pulse 2.4s, screen slide .38s `cubic-bezier(.4,0,.2,1)` + fade .3s, dialog .2s, sheet scrim .35s, Face ID overlay .25s, veil .65s, content .2s delay .25s |
Durations: `press-web` .08s · `otp-scale` .1s · `hover` .12s · `button-bg` .15s · `field` .18s · `press-app` .08s · `dialog` .2s · `faceid-content` .2s · `faceid-content-delay` .25s · `faceid-overlay` .25s · `session-row` .23s · `toast` .28s · `fade` .3s · `shake` .35s · `sheet-overlay` .35s · `screen` .38s · `slide` .42s · `pop-in` .45s · `spin` .65s · `blur-in` .65s · `pulse` 2.4s. Easings: `default` ease · `linear` linear · `standard` cubic-bezier(.4,0,.2,1) · `slide` cubic-bezier(.32,0,.04,1) · `spring` cubic-bezier(.34,1.56,.64,1). No `prefers-reduced-motion` exists in the source (EXTENDED block added).

## 9. Documented dependencies (not copied, not imitated)
- **Face ID dotLottie** `https://lottie.host/2c89c12e-4c0d-41a6-ae13-30b2ce7a964a/kjwDIWFPeM.lottie`, played by `<dotlottie-player loop>` from `unpkg.com/@dotlottie/player-component@latest` (UNPINNED). Layer "iOS Face ID - Prompt", artboard 150x148, 60 fps, 244.66 frames (4.08 s loop); JS stops at 2200 ms. Tile `#404042`, white glyphs, blue scanning ring. Frame 180x180 r12 overflow hidden; player `inset:-14px`, 208x208 (`.mauth-app-faceid-lottie`). Dark: glass card (r28, padding 24 24 20, `rgba(18,28,38,.70)`, blur 12, border `rgba(255,255,255,.08)`) + frame `::after` tint `rgba(10,35,55,.72)` `mix-blend-mode:color` z2. States: idle -> scanning -> checkmark -> unlock. **No failure/retry state.** Byte size not recorded. Docs show a labelled placeholder (`.mauth-app-faceid-lottie--placeholder`).
- **Google Fonts** Geist (both), EB Garamond (web only). **Constellation canvas** = `constellation.js` presets `web` / `app-light` / `app-dark` (parameters in components.md section 20).

## 10. Known source bugs & decisions (document, don't reproduce)
| # | source (file Lline) | bug -> decision in the DS |
|---|---|---|
| 1 | signin L376 | "Forgot password?" `.link-btn` has no handler -> rendered as designed (link button); destination/flow undefined, product must wire it |
| 2 | signin L644-660 | timer expiry reads "Code expires in Expired", `.warn` left on -> label becomes "Code expired"; value `.is-expired` (danger colour); slots + Verify disabled together |
| 3 | signin L31-35 / L34 | `button:focus-visible{border-radius:4px}` changes the 8px button to 4px -> outline only (2px, offset 2px), radius unchanged (web and app) |
| 4 | signin L370-375 | fake checkbox (label+div): not focusable, no form value, block-in-label -> real `<input type=checkbox>` (hidden) + box; initial state checked; focus ring EXTENDED |
| 5 | signin L591 | paste always fills from slot 1 -> paste fills from the focused slot onward; a 6-digit paste fills all slots (behaviour note, no CSS) |
| 6 | signin L537/L627, auth L1230 | shared BroadcastChannel `enigma_auth` (legacy product name) -> recommended `makor_auth` for web + app; not in CSS |
| 7 | signin L636 | redirect to non-existent `makor-dashboard.html` (404) -> configurable target; documented only |
| 8 | signin L526-530 | "Incorrect credentials" shown for a password shorter than 4 chars -> copy kept for a server rejection; client-empty should read a "please enter" message (like the username one) |
| 9 | signin 4.15 | field/OTP errors never clear on typing -> intended: clear on input (state classes `.is-error`/`.is-shown` toggled by the app) |
| 10 | signin L694-699 | global Enter handler double-acts + no re-entry guard -> intended: Enter submits only the active view, ignore while `.is-loading` |
| 11 | signin L260-261, L99-104, L31, L286 | dead: `.otp-sep` (+markup), `.brand-name`, `[tabindex]` web rule, `.resend-note strong`, `--font-mono` use -> not carried |
| 12 | signin L381/L420/L371 | invalid HTML (div in button/label) -> spinner is a `<span>`; checkbox as in 4 |
| 13 | signin L350 | `#email` id on a "Username" field -> name it `username` in markup |
| 14 | signin 4.23-24 | page footer `position:fixed; z:2` overlaps the card < ~700px tall; wraps to 2 lines at 375 -> **kept as rendered, flagged** (owner decides; suggested in-flow footer on short viewports) |
| 15 | signin L395/L303 | title sizes via inline style / different line-height (38/1.1, 30/1.1, success 30/normal) -> reproduced as three rendered variants (`-title`, `--compact`, `-success-title`) |
| 16 | signin L424 etc. | inline style overrides (padding-right, margin-bottom, 13px/700) -> turned into modifiers (`--no-toggle`, `--compact`, `--strong`) |
| 17 | auth L27, L16-17 | `--font-serif` never loaded/used; `--c-primary-dark/-dim` duplicates (dark `#0A7A8E` dead) -> serif is web-only; dead tokens dropped; focus colour = `app-primary` |
| 18 | auth L19 / D19 | `--c-primary-ghost` 8-digit hex (.08) vs rgba .13 -> light kept as `#00526814`, dark `rgba(23,195,175,0.13)` |
| 19 | auth L156-164, L346-350, L355-387, L598, L696, L421+L782, JS `.active/.completed` | dead: `.btn-danger`, `.home-avatar`, `.session-current*/.session-row*`, `.sheet-otp.used`, `.faceid-sub`, `.sessions-empty` + empty-state markup, no-CSS state classes -> **excluded** |
| 20 | auth L782 | empty state never shown -> would show "No other active sessions." when the last Recent row is removed; excluded per owner list, recorded |
| 21 | brief "#other-sessions selector" | **not found** in the source: the sessions container is `#all-sessions` -> recorded; nothing built |
| 22 | auth L32-36 + L450 | double focus ring on inputs (global outline + ring) -> ring only; `outline:none` |
| 23 | auth L591 vs L599 | `.urgent` declared before the base rule (works via specificity) -> base first, `.is-urgent` after |
| 24 | auth L83-122 | push banner is a non-focusable `div onclick` -> add `tabindex=0 role=button` in markup (ring comes from the kept rule) |
| 25 | auth 4.8 | sheet/dialog: no Esc, scrim tap or drag dismissal -> recorded; intended Esc/scrim close the dialog (cancel), sheet drag/scrim optional; JS only |
| 26 | auth L1042 | Face ID click-to-restart guarded by a never-removed class -> dead interaction; documented |
| 27 | auth L334-338 | status bar colour swap with `!important`, no transition -> modifier `--home`, same hex, no transition |
| 28 | auth 3.1 | launch canvas never restarts; light/dark scripts differ -> `constellation.js` presets reproduce both; `stop()` exposed |
| 29 | auth L119 | banner icon attr 28x22 vs CSS 24x19 -> CSS value (24x19) |
| 30 | auth 4.7, 4.22 | static code, frozen sheet time, banner time literal "now" -> documentation only |
| 31 | auth L366 | password toggle never swaps the icon (no eye-off in the app) -> single eye icon kept; flagged |
| 32 | contrast (auth 4.18, signin 1.1) | white on dark `#17C3AF` ~2.2:1, white on `#FF6B6B` ~2.8:1, web/app text-3 ~2.1:1 -> **reproduced as designed, flagged for the owner** |
| 33 | auth L50 | shell radius `min(44px,4vw)` becomes 15-17px on phones -> reproduced (verified 375 wide -> 15.01px) |
| 34 | signin L6/L346 | brand spelling "Makor-X.AI" vs "Makor X.AI" -> copy kept verbatim |
| 35 | auth L201 / D211 | launch-name weight 500 (light) vs 400 (dark) -> themed token `--mauth-app-launch-name-weight` |
| 36 | old DS | `body.dark`, code ring, 26 name clashes, EB Garamond in app, invalid CSS (`body.dark @keyframes`, stray `-webkit-font-smoothing`) -> none carried; keyframes are valid top-level rules using the themed `--mauth-app-primary-ghost` |

## 11. Dead code excluded
- (web) `.otp-sep` (+ the "·" div between slots 3 and 4) - S L260-261, L402 - display:none, "kept for JS compatibility", no JS reads it
- (web) `.brand-name` - S L99-104 - no markup (the page has no wordmark text)
- (web) `[tabindex]:focus-visible` rule - S L31 - no element has tabindex
- (web) `.resend-note strong` - S L286 - no matching markup
- (web) `--font-mono` use - S L26 - defined, never used
- (web) plain `.eyebrow` colour - S L111-116 - only ever used with `.accent`
- (web) repeated `outline:none` on inputs; `-webkit-appearance` without `appearance`; redundant `:focus, :focus-visible` pair - S L36, L143, L145, L247, L249, L251, L255 - redundant / unprefixed duplicates
- (web) EB Garamond italic 400 and weights 400/600 - S L9 - loaded, never used (only 500 renders)
- (app) `.btn-danger` (+ hover) - A L156-164 - no markup
- (app) `.home-avatar` - A L346-350 - no markup (the old DS listed an avatar component; it does not exist)
- (app) `.session-current*`, `.session-row*` - A L355-387 - a different "current session" card that is never rendered
- (app) `.sheet-otp.used` (26px strike-through) - A L598 - CSS only, never applied by JS
- (app) `.faceid-sub` + its empty `<p>` - A L696 - display:none, empty
- (app) `.sessions-empty` + "No other active sessions." markup - A L421, L782 - never shown by JS (recorded as an owner decision)
- (app) `.fid-wrapper.active / .completed` - JS L1042 - classes added by JS, no CSS
- (app) Face ID click-to-restart - A L1042-1045 - guarded by a class that is never removed
- (app) `--c-primary-dark`, `--c-primary-dim`, `--c-black`, `--font-serif` use - A L16-18, L27; D L33, L138 - duplicates of primary / never referenced / never loaded (dark `#0A7A8E` is overridden)
- (old DS) `body.dark`, `[data-mode="dark"]`, `body.dark @keyframes` (invalid CSS), stray `-webkit-font-smoothing` rules, a "code ring", EB Garamond in the app, 26 token names clashing with the HR app - old makorx-ai/auth-design-system/* - none exists in the prototypes

## 12. Open decisions for the owner
1. **Footer overlap on short viewports.** The web page footer is `position:fixed; z-index:2` and overlaps the card when the viewport is shorter than ~700px (observed at 559 x 597); at 375 wide each span wraps to 2 lines. Reproduced as rendered. Suggested: an in-flow footer below the card on short viewports.
2. **White-on-teal and low-contrast text.** White on the dark brand `#17C3AF` is ~2.2:1 (primary and copy buttons), white on dark danger `#FF6B6B` ~2.8:1 (danger confirm button, danger toast), web `--mauth-web-text-3` `#90AEBC` on the card 2.09:1, app light `--mauth-app-text-3` `#A8B6CD` on white ~2.05:1, white on web disabled `#7FA0AB` 2.79:1. Reproduced as designed; the owner decides whether to darken the fills or switch to dark labels.
3. **Missing eye-off icon in the app.** The password toggle in the authenticator never swaps its icon (only the eye glyph exists in the app; the web has eye-off). Decide: reuse `web-icon-eye-off.svg` for the app (then add `.mauth-icon--app-eye-off`) or keep a single icon and rely on `aria-pressed`.
4. **"Forgot password?" target.** The link button has no handler and no destination; no forgot/reset screens exist. Rendered as designed (a link button); the product must define the flow.
5. **Redirect target after success.** After the 5 s countdown the page navigates to `makor-dashboard.html`, which does not exist (404). The DS documents a configurable target.
6. **Copy for empty password and for clipboard failure.** The authenticator shows "Enter your email and password." for an empty password (and for < 4 chars); the web shows "Incorrect credentials. Please try again." for a password shorter than 4 chars (no real credential check). Need distinct copy: a "please enter" message for empty fields and a server-rejection message. No copy exists for a clipboard failure (the source swallows the error in try/catch).
7. **Face ID failure / retry design.** The animation never errors: there is no failure state, no retry limit, no lockout; the only exit besides success is "Use Passcode". A designer must supply the failure/retry visual (the Lottie cannot show one).
8. **Lottie byte size and hosting.** The file size of the dotLottie is not recorded; the animation and the player (`@dotlottie/player-component@latest`) are remote and unpinned. Decide: pin the player version and self-host a copy, or accept the dependency.
9. **BroadcastChannel name migration.** Decided: `makor_auth` for web and app. The prototypes still use the legacy `enigma_auth` (S L537, L627; A L1230; D L1353-1360) and share the channel with the Enigma X prototypes. Prototype files must be changed together.
10. **Brand spelling.** "Makor-X.AI" (page title, app name), "Makor X.AI" (web sub copy) and "MakorX.AI" (brief) all appear. Copy is reproduced verbatim; the owner should choose one.
11. **Sheet / dialog dismissal and empty state.** Esc, scrim tap and drag-to-close are missing for the sheet and dialog (decided as intended behaviour; JS only). The "No other active sessions." empty state exists in markup but is never shown (excluded; decide if wanted).
12. **Hub wiring.** `hub/projects.js` and `hub/ds-viewer.html` resolve `../<platformId>/design-system/tokens.json`; this system lives in `makorx-ai/auth-design-system/`. Wiring is outside the design-system stages.

## 13. What NOT to do (old drifted claims, all false for the source)
- **No EB Garamond in the authenticator** (the old brief said OTP digits/headings); **no `body.dark` / `[data-mode="dark"]`** (use `[data-theme="dark"]`); **no code ring, progress bar or 30 s refresh** in the app; no "avatar / initials badge" (dead CSS); no `.btn-danger`.
- Do not reuse the HR names (`--color-bg`, `--text-*`, `--h-input`, `--space-*`, `--radius-pill`, `.btn`, `.input`...): 26 of them clashed in the old system. Use only `--mauth-*` and `.mauth-*`.
- Do not use `#0cb8d0` (HR dark brand) in auth; dark brand is `#17C3AF`. Do not give the sheet copy button radius 4 or the toast / primary button radius 8. Do not use 4px on the web card (16).
- Do not add a secondary/outline/danger WEB button, a web toast, forgot/reset screens, a tab bar, a notch or a home indicator: none exist. Do not invent a Face ID failure visual or imitate the Lottie.
- Do not reproduce the bugs in section 10 (4px focus radius, "Code expires in Expired", fake checkbox, paste from slot 1, `enigma_auth`, double focus ring, 404 redirect, no re-entry guard, errors that never clear).
- Do not round or merge near-equal values (e.g. `#C8D8DF` web-bg vs launch-bg are two roles). Do not add responsive breakpoints to the phone. Do not use the hub-wide `design-system/` viewer paths for this folder without wiring them (open decision 12).
- Do not touch `makorx-ai/design-system/` (the HR app system).

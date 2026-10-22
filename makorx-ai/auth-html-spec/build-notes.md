# MAKOR (MakorX.AI) AUTH design system - stage A build notes (handoff for stage B)

Folder: `makorx-ai/auth-design-system/`. Stage A wrote `tokens.json`, `tokens.css`, `components.css`, `constellation.js`, this file. **Still OLD / stale (stage B overwrites): `components.md`, `CLAUDE.md`, `showcase.html`.** Rules: `audit/BUILD_RULES.md` incl. section 11. Source of truth = the prototypes + `auth-html-spec/{web-signin,authenticator}.md`. `tokens.css` and `tokens.json` are generated from one data set (mirror 1:1; generator is in the scratchpad, not shipped).

## 1. Tokens (prefix `--mauth-`, none of the 26 HR-clashing names reused)
`tokens.css`: 283 light declarations on `:root`, 2 composite tokens re-resolved on `:root, [data-theme="dark"]`, 49 dark overrides on `[data-theme="dark"]`. `tokens.json`: 352 `{value, comment}` tokens, hub-viewer shape (`color.<group>`, `font`, `fontSize`, `spacing` (keys = bare numbers), `borderRadius`) plus `fontWeight, lineHeight, letterSpacing, border, controlHeight, size, breakpoints, shadow, blur, opacity, scale, gradient, duration, easing, animation, timing, zIndex`. Comments carry `src: file Lline` (`D<line>` = dark file).

| group (JSON `color.*`) | CSS names | notes |
|---|---|---|
| `web-light` (18) | `--mauth-web-bg/surface/field/primary/primary-hover/primary-ghost/text/text-2/text-3/border/danger/disabled/danger-ghost/danger-tint/on-primary/on-disabled/spinner-track/constellation` | WEB IS LIGHT ONLY. Map from prototype: `--c-bg`->`web-bg`, `--c-surface-2`->`web-field`, ... |
| `app-light` (30) / `app-dark` (30) | `--mauth-app-bg/surface/surface-2/primary/primary-hover/primary-ghost/text/text-2/text-3/border/danger/success/page-bg/toast-bg/toast-text/launch-bg/faceid-blur-bg/faceid-card-bg/faceid-tint/fallback-bg(-hover,-active)/banner-bg/banner-border/banner-time/banner-sub/overlay-confirm/overlay-sheet/map-bg/pill-bg` | identical keys = light/dark pairs. Non-colour dark pairs in JSON are keyed `<name>--dark`. |
| `app-fixed` (19) | `--mauth-app-on-primary/on-danger/status-home-bg/status-home-fg/home-grad-1..3/on-gradient/glass-*/banner-appname/banner-title/logo-glyph/logo-base/logo-g1..g3/faceid-lottie-card` | same in both themes |

Other families: `--mauth-text-10..44` (13 sizes), `--mauth-weight-*`, `--mauth-leading-*`, `--mauth-tracking-*`, `--mauth-space-N` (19 OBSERVED literals; source has no spacing tokens), `--mauth-radius-*` (17, each mapped to its element in the comment: checkbox 3, control 4, web-field 8, card-sm 8, sheet, home-icon 10, otp-slot 12, faceid 12, banner-icon 12, dialog 14, web-card 16, home-card, banner 22, launch-icon 22, faceid-card 28 (dark only), shell `min(44px, 4vw)`, round 50%), `--mauth-border-*` (widths + dark-only border shorthands), `--mauth-height-*`, `--mauth-size-*`, `--mauth-shadow-*` (name prefix `shadow-`), `--mauth-blur-*`, `--mauth-opacity-*`, `--mauth-scale-*`, `--mauth-duration-*` (21), `--mauth-ease-*` (default, linear, standard, slide, spring), `--mauth-animation-*` (spin, shake, pop-in, blur-in, faceid-content, dot-pulse), `--mauth-z-*` (web 0/0/1/2; app 40/50/100/101/200/300/999 + faceid inner 1/2), `--mauth-breakpoint-web-card` (560px, documentation only: custom properties cannot be used inside `@media`, components.css repeats the literal). JSON-only: `timing` (flow timings: 1300/1100 ms, 180 s, 30 s, 5 s, 482716, launch 1800, scan 2200, 1400, 9000, 3000, 2000, 2800).
Pitfall solved: a `var()` inside a custom property resolves where it is declared, so `--mauth-app-home-gradient` / `--mauth-app-logo-gradient` live in a `:root, [data-theme="dark"]` block, and `app-shell-bg` / `app-toast-text` / dark borders are re-declared inside the dark block.
Dropped (dead/duplicate, see 5): `--c-primary-dark`, `--c-primary-dim`, `--c-black`, `--font-mono` as a real mono font (kept only as alias).

## 2. Class scheme (components.css, 987 lines, 174 `.mauth-*` classes, 8 keyframes, 10 EXTENDED markers)
Web = `.mauth-web-*`, app = `.mauth-app-*`, icons = `.mauth-icon` + `.mauth-icon--<asset>` (mask, 16 icons). State classes mirror pseudo-classes: `.is-hover .is-focus .is-active .is-disabled .is-loading .is-error .is-filled .is-warn .is-expired .is-shown/.is-show .is-open .is-hidden .is-checked .is-revealed .is-urgent .is-copied .is-removing .is-active/.is-before` (screens). Theme: `data-theme="dark"` on any ancestor (web has none). All class names are listed in `components.css`; every block starts with a `src:` comment.

**Web components built:** root `.mauth-web`, page `.mauth-web-page`, backdrop (`-canvas`, `-watermark`, `-footer`, `-footer-text`), card (`-card`, `--success`), logo (`-card-logo`, `-logo`), view switch (`-view`), eyebrow (`--accent`), title (`-title`, `--compact`), sub, field (`-field`, `--compact`, `-field-wrap`), input (`-input`, `--no-toggle`, states rest/focus/error/hover*/disabled*/aria-invalid*), show/hide toggle (`-toggle`, `.is-revealed`), field error, row, checkbox (`-checkbox*`), link button (`-link-btn`, `--strong`), primary button (`-btn`, `--primary`, `-btn-label`, `-spinner`; hover/active/disabled/loading/focus), terms, back link, OTP (`-otp`, `-otp-slot` rest/focus/filled/error, `-otp-error`), timer (`-timer-row/-label/-value` + `.is-warn/.is-expired`), resend note, success (`-success`, `-ring`, `-title`, `-sub`), 560px behaviour (card padding), `constellation.js`.
**App components built:** page/shell/status bar (`-page`, `-shell`, `-status-bar`, `--home`, `-status-time`, `-status-icons`), screen stack, launch (`-launch*`), Face ID (`-faceid*`: veil, wrap, card, frame, `-lottie` placeholder, label, bottom) + secondary button, home (`-home-*`, section labels, session card `-session*`, active session `--active` + specs grid, pulse dot), push banner (`-banner*`), password screen (`-pw-*`, `-eyebrow`, `-title`, `-subtitle`, `-field`, `-label`, `-input`, `-input-toggle`), primary button `-btn`, confirm dialog (`-confirm*`), bottom sheet (`-sheet*`, handle, map + pill, info grid, `-code-card`, `-otp` display, `-code-expiry.is-urgent`, `-btn-copy`, `-block-link`, `-confirmed*`), toast (`-toast`, `--danger`), nav/back (`-pw-back`, screen slide classes).
Not in the prototypes, therefore NOT built: web secondary/outline/danger buttons, toast/alert/tooltip on web, divider, forgot/reset screens, app tab/nav bar (there is none), notch/home indicator.

## 3. EXTENDED (not in prototypes; derived only from existing tokens; each is marked `EXTENDED` in components.css)
| item | derivation |
|---|---|
| web input `:hover`/`.is-hover` | border = `web-border` token |
| web input `:disabled`/`.is-disabled` | opacity `.4` (link-button disabled recipe) + not-allowed |
| web input `[aria-invalid="true"]` | same look as `.is-error` |
| web checkbox keyboard focus ring (+ real `<input>`) | 2px `web-primary` outline, offset 2px (button recipe) |
| web terms-link `:focus-visible` | same outline recipe |
| app input hover / invalid | hover border `app-text-3`; invalid border `app-danger` (no danger-ghost token exists) |
| `.mauth-app-faceid-lottie--placeholder` | flat tile in the documented Lottie card colour + text label |
| `prefers-reduced-motion` | collapses animation/transition durations; `constellation.js` draws one static frame |
| `constellation.js` `stop()` / reduced-motion | source never stopped the web canvas; app stopped on `#s-launch.hidden` |
| `[tabindex]:focus-visible` inside `.mauth-app` | already in source (global rule); kept so a focusable banner gets the ring |

## 4. Source bugs: DOCUMENT, DON'T REPRODUCE (chosen intended behaviour)
| # | source (file Lline) | bug | chosen intended behaviour in the DS |
|---|---|---|---|
| 1 | signin L376 | "Forgot password?" `.link-btn` has no handler | rendered as designed (link button); destination/flow undefined, product must wire it |
| 2 | signin L644-660 | timer expiry reads "Code expires in Expired", `.warn` left on | label becomes "Code expired"; value `.is-expired` (danger colour); slots + Verify disabled together |
| 3 | signin L31-35 / L34 | `button:focus-visible{border-radius:4px}` changes the 8px button to 4px | outline only (2px, offset 2px), radius unchanged (web and app) |
| 4 | signin L370-375 | fake checkbox (label+div): not focusable, no form value, block-in-label | real `<input type=checkbox>` (hidden) + box; initial state checked; focus ring EXTENDED |
| 5 | signin L591 | paste always fills from slot 1 | paste fills from the focused slot onward; a 6-digit paste fills all slots (behaviour note, no CSS) |
| 6 | signin L537/L627, auth L1230 | shared BroadcastChannel `enigma_auth` (legacy product name) | recommended `makor_auth` for web + app; not in CSS |
| 7 | signin L636 | redirect to non-existent `makor-dashboard.html` (404) | configurable target; documented only |
| 8 | signin L526-530 | "Incorrect credentials" shown for a password shorter than 4 chars | copy kept for a server rejection; client-empty should read a "please enter" message (like the username one) |
| 9 | signin 4.15 | field/OTP errors never clear on typing | intended: clear on input (state classes `.is-error`/`.is-shown` toggled by the app) |
| 10 | signin L694-699 | global Enter handler double-acts + no re-entry guard | intended: Enter submits only the active view, ignore while `.is-loading` |
| 11 | signin L260-261, L99-104, L31, L286 | dead: `.otp-sep` (+markup), `.brand-name`, `[tabindex]` web rule, `.resend-note strong`, `--font-mono` use | not carried |
| 12 | signin L381/L420/L371 | invalid HTML (div in button/label) | spinner is a `<span>`; checkbox as in 4 |
| 13 | signin L350 | `#email` id on a "Username" field | name it `username` in markup |
| 14 | signin 4.23-24 | page footer `position:fixed; z:2` overlaps the card < ~700px tall; wraps to 2 lines at 375 | **kept as rendered, flagged** (owner decides; suggested in-flow footer on short viewports) |
| 15 | signin L395/L303 | title sizes via inline style / different line-height (38/1.1, 30/1.1, success 30/normal) | reproduced as three rendered variants (`-title`, `--compact`, `-success-title`) |
| 16 | signin L424 etc. | inline style overrides (padding-right, margin-bottom, 13px/700) | turned into modifiers (`--no-toggle`, `--compact`, `--strong`) |
| 17 | auth L27, L16-17 | `--font-serif` never loaded/used; `--c-primary-dark/-dim` duplicates (dark `#0A7A8E` dead) | serif is web-only; dead tokens dropped; focus colour = `app-primary` |
| 18 | auth L19 / D19 | `--c-primary-ghost` 8-digit hex (.08) vs rgba .13 | light kept as `#00526814`, dark `rgba(23,195,175,0.13)` |
| 19 | auth L156-164, L346-350, L355-387, L598, L696, L421+L782, JS `.active/.completed` | dead: `.btn-danger`, `.home-avatar`, `.session-current*/.session-row*`, `.sheet-otp.used`, `.faceid-sub`, `.sessions-empty` + empty-state markup, no-CSS state classes | **excluded** |
| 20 | auth L782 | empty state never shown | would show "No other active sessions." when the last Recent row is removed; excluded per owner list, recorded |
| 21 | brief "#other-sessions selector" | **not found** in the source: the sessions container is `#all-sessions` | recorded; nothing built |
| 22 | auth L32-36 + L450 | double focus ring on inputs (global outline + ring) | ring only; `outline:none` |
| 23 | auth L591 vs L599 | `.urgent` declared before the base rule (works via specificity) | base first, `.is-urgent` after |
| 24 | auth L83-122 | push banner is a non-focusable `div onclick` | add `tabindex=0 role=button` in markup (ring comes from the kept rule) |
| 25 | auth 4.8 | sheet/dialog: no Esc, scrim tap or drag dismissal | recorded; intended Esc/scrim close the dialog (cancel), sheet drag/scrim optional; JS only |
| 26 | auth L1042 | Face ID click-to-restart guarded by a never-removed class | dead interaction; documented |
| 27 | auth L334-338 | status bar colour swap with `!important`, no transition | modifier `--home`, same hex, no transition |
| 28 | auth 3.1 | launch canvas never restarts; light/dark scripts differ | `constellation.js` presets reproduce both; `stop()` exposed |
| 29 | auth L119 | banner icon attr 28x22 vs CSS 24x19 | CSS value (24x19) |
| 30 | auth 4.7, 4.22 | static code, frozen sheet time, banner time literal "now" | documentation only |
| 31 | auth L366 | password toggle never swaps the icon (no eye-off in the app) | single eye icon kept; flagged |
| 32 | contrast (auth 4.18, signin 1.1) | white on dark `#17C3AF` ~2.2:1, white on `#FF6B6B` ~2.8:1, web/app text-3 ~2.1:1 | **reproduced as designed, flagged for the owner** |
| 33 | auth L50 | shell radius `min(44px,4vw)` becomes 15-17px on phones | reproduced (verified 375 wide -> 15.01px) |
| 34 | signin L6/L346 | brand spelling "Makor-X.AI" vs "Makor X.AI" | copy kept verbatim |
| 35 | auth L201 / D211 | launch-name weight 500 (light) vs 400 (dark) | themed token `--mauth-app-launch-name-weight` |
| 36 | old DS | `body.dark`, code ring, 26 name clashes, EB Garamond in app, invalid CSS (`body.dark @keyframes`, stray `-webkit-font-smoothing`) | none carried; keyframes are valid top-level rules using the themed `--mauth-app-primary-ghost` |

## 5. Documented dependencies (not copied, not imitated)
- **Face ID Lottie**: `https://lottie.host/2c89c12e-4c0d-41a6-ae13-30b2ce7a964a/kjwDIWFPeM.lottie`, played by `<dotlottie-player id="fid-lottie" loop>` from `https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs` (UNPINNED `@latest`). Facts (authenticator.md section 0, measured in a browser): layer "iOS Face ID - Prompt", artboard 150x148, 60 fps, 244.66 frames (4.08 s loop), Lottie v5.7.0; the JS stops the flow at 2200 ms (~2.2 s: scanning ring -> checkmark; there is no failure state). Card colour `rgb(64,64,66)` = `#404042` (token `--mauth-app-faceid-lottie-card`), glyphs white, scanning ring blue. States: idle (first frame) -> `.active` +60 ms + `play()` -> scanning -> white ring + checkmark (~2 s) -> `.completed` + `stop()` at 2200 ms. Geometry: frame 180x180 r12 overflow hidden; player `position:absolute; inset:-14px; width/height calc(100% + 28px)` (208x208) -> class `.mauth-app-faceid-lottie`. Dark: glass card (r28, padding 24 24 20, blur 12) + `::after` tint `rgba(10,35,55,.72)` `mix-blend-mode:color`. Offline => no visual (fonts fall back to `-apple-system, sans-serif`). File byte size is NOT in the spec.
- **Google Fonts**: Geist 400/500/600/700 (both), EB Garamond `ital,wght@0,400;0,500;0,600;1,400` (web only; only 500 used, italic never).
- **Constellation canvas**: `constellation.js` presets (all parameters given by the spec/source): `web` 55 dots, link 155, speed (rand-.5)*.22, r rand*1.2+.8, rgb 0,45,70, dot .3, link .1*(1-d/155), lineWidth .7, wrap, window-sized; `app-light` 45 / 120 / .22 / r 1.2+.8 / dot .28 / link .12 / wrap / element-sized (fallback 390x800); `app-dark` 52 / 90 / speed .28 / r rand*1.4+.8 / teal 23,195,175 / dot .55 + glow r*2.5 @ .08 / link (1-d/90)*.22 / bounce / parent-rect-sized (fallback 390x844), links drawn before dots.
- Masks need http(s) (CSS `mask` of local SVGs is blocked on `file://`).

## 6. Verification (own tab `tab-24`, `http://localhost:3456/makorx-ai/auth-design-system/_stageA-test.html`; page deleted)
~270 computed-property / bounding-box comparisons against the spec numbers, light and dark: web card 460 wide / inner 364 / height 535.19 (spec 535.52), padding 0 48 48, shadow, radius 16, logo 90x72, title Garamond 38/500/41.8/.38/small-caps, input 48 r8 1.5px, toggle 44, checkbox 16 r3, button 50 r8 15/600, OTP slot **54x68, gap 8**, slot r12/border/caret/focus ring+scale/filled/error (+shake .35 s), timer, clock 14, success ring 68 / tick 32 / card 460x271.46 / pop-in .45 s spring, watermark 360x288 @-40/-40 opacity .045, footer, button hover/active/disabled/loading/focus (radius stays 8); app **shell 390x844 / r44 (r=min(44,4vw), 15.01 px at 375)**, status bar 44 / home bar, home gradient, home icon 44 r10 glass, session row **342x64**, flag 36 r4, chip 77.8x36, active card, spec grid, dot pulse 2.4 s, banner 390x96.67 / inner 370x86.67 / r22 / blur 48 / z300, toast 358 (+border dark) bottom 32, pw screen (top 227.13, back 131.7x44, input 48 r4, focus ring, button 52), sheet 390x583.33 (dark +2), handle 36x4, map 358x160, pill, info cells 170x34.67, OTP 44/500/9.68 h56.67, copy r8 52, block link 350x38, confirmed 56 / 28, dialog 320 x 183.54 r14, buttons 136x46, launch 96 r22 / 56x45 glyph / pad 70.2, Face ID frame 180 r12 / player 208, dark card 229.33x225.33 r28, tint `color`, secondary 148.51x42, z-index 40/50/100/101/200/300/999, all themed colours. Result: **0 unexplained mismatches**. Explained deltas (not bugs): measurement DPR 1 here vs 1.5 in the spec (text-driven heights round differently: active session card 187 vs 184.67, spec grid 100 vs 98, card 535.19 vs 535.52; 1.5px borders read 1.33/spec 1.33 at DPR 1.5); expectations that I wrote wrongly were corrected after inspection (copy button is 318 wide inside the code card; dark confirm 184.88 = light + 2 borders). One real defect found and fixed: a `*/` inside a CSS comment swallowed the `.mauth-app-session` rule. Animations were verified by computed name/duration/easing (the hidden tab freezes the timeline), not by playback.

## 7. Unresolved / for stage B and the owner
1. Stage B: write `components.md` (copy-paste HTML per component incl. the intended checkbox / expired-timer markup), `CLAUDE.md`, `showcase.html` (light + dark side by side, Source = file + lines, Known source bugs section from table 4); old versions are still in the folder and wrong.
2. `hub/projects.js` / `ds-viewer.html` resolve `../<platformId>/design-system/tokens.json`; the auth folder is `makorx-ai/auth-design-system/` - the hub wiring is outside stage A.
3. Footer overlap on short viewports (#14), contrast failures (#32), missing app eye-off icon (#31): owner decisions.
4. Lottie file byte size not recorded; Lottie/dotlottie are remote and unpinned.
5. Dark-scope structural selectors in components.css (only two): `[data-theme="dark"] .mauth-app-faceid-card` (radius/padding) and `.mauth-app-sheet-map` (map art swap).
6. `--mauth-app-surface-2` equals `app-bg` in light (kept as two roles).

## 8. Stage B addendum (2026-10-14)
Stage B wrote `showcase.html`, `components.md`, `CLAUDE.md` and `auth-html-spec/VERIFICATION.md`, and moved this file here (it was `auth-design-system/_build-notes.md`). Two proven fixes to the "done" `components.css` (both are host-page inheritance leaks found by comparing the showcase against the live prototypes): `.mauth-web` and `.mauth-app` now set `line-height: normal` and `font-size: var(--mauth-text-16)` like the prototypes' `body` (before: label line-height 18.85px vs `normal`; active-session head 35.33 vs 38px). Nothing else in `components.css` / `tokens.*` changed. The `home` demo label "Recent sign-ins" is `--spaced` (margin-top 16, inline in the source) even when "Active now" is absent.

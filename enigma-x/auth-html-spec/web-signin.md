# Enigma X — WEB SIGN-IN prototype spec (harvested)

Source of truth: `hub/auth/enigma-signin.html` (713 lines + trailing newline; single file CSS + markup + JS). Line refs are to that file. "(computed)" = read in a real browser (Chromium, DPR 1.5, tab at 1440x900 and 375/501 wide), not authored.
Page `<title>`: `Enigma — Sign In`. Light only: no dark theme, no `prefers-reduced-motion`, no theme toggle. One `@media` only (line 87).
Device-pixel note (computed): authored `1.5px` borders compute as `1.33333px`, `1px` as `0.666667px`, `2.5px` spinner border as `2px` at DPR 1.5. Authored values below are the truth.

---------------------------------------------------------------------------
## 1. FOUNDATIONS

### 1.1 Custom properties (`:root`, lines 11-27) — complete list
| name | value | role |
|---|---|---|
| `--c-bg` | `#EBEBEB` | page background (html/body) |
| `--c-surface` | `#FFFFFF` | card, checkbox box, OTP slot bg, focused input bg |
| `--c-surface-2` | `#F5F5F5` | input resting bg, session-chip (dead) |
| `--c-primary` | `#7AEFEF` | brand teal: primary btn bg, focus border, filled slot border, caret, checkbox checked, success ring icon, focus outline |
| `--c-primary-dim` | `#5ADADA` | primary btn hover bg; link-btn text colour (!) |
| `--c-primary-ghost` | `#7AEFEF18` | 8-digit hex = rgba(122,239,239,0.094) (computed): focus ring 4px, success ring bg |
| `--c-black` | `#1A1A1A` | text on primary btn, spinner arc, (dead: nav icon, btn-black, phone pill) |
| `--c-text` | `#1A1F36` | body/headings/input text |
| `--c-text-2` | `#6B7280` | sub text, labels, eyebrow, timer value, disabled btn text, back button |
| `--c-text-3` | `#9CA3AF` | placeholder, toggle icon rest, timer row text, OTP separator, secure/divider (dead) |
| `--c-border` | `#E2E2E2` | input border, slot border, (dead nav border, divider) |
| `--c-danger` | `#EF4444` | error text, error borders, expiring timer |
| `--c-disabled` | `#D1D5DB` | disabled primary button bg |
| `--font-sans` | `'DM Sans', -apple-system, sans-serif` | everything |
| `--font-mono` | `'DM Mono', monospace` | OTP slots, `#web-timer` |

Un-tokenised literal colours in use: `rgba(239,68,68,.08)` (line 133 error ring), `#fef2f2` (line 268 slot error bg), `rgba(0,0,0,.15)` (spinner track, line 184), `stroke="black"` (checkbox tick SVG, line 397), `rgba(0,0,0,.08)`/`rgba(0,0,0,.04)` (card shadow). Dead only: `rgba(255,255,255,.85)`, `rgba(45,218,197,.3)`, `rgba(255,255,255,.5)`, `#fff`.

### 1.2 Fonts
Google Fonts link (line 9, verbatim): `https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@500;600&display=swap` (+ preconnects lines 7-8).
Loaded faces (computed): DM Sans 400/500/600/700; **DM Mono 500 only** (600 does not exist at Google, so every `font-weight:600` DM Mono text is synthetic bold).
`html, body`: `font-family: var(--font-sans); color: var(--c-text); background: var(--c-bg); min-height:100vh; -webkit-font-smoothing:antialiased` (lines 36-42).

### 1.3 Type tuples (family / size / weight / line-height / letter-spacing / transform / colour)
| use | selector, line | tuple |
|---|---|---|
| h1 login title | `.card-title` 105 | sans / 24px / 700 / 1.2 (28.8px computed) / normal / none / #1A1F36; mb 6px; centered in login (107-109) |
| h2 OTP title | inline 414 | sans / 20px / 700 / 1.2 (24px computed) / normal / #1A1F36; mb 6px; centered |
| eyebrow (OTP only) | `.eyebrow` 100 + inline 413 | sans / 14px / 600 / normal (18.67px computed) / .08em (1.12px computed) / uppercase / #6B7280; inline mb 6px, centered |
| login sub | `.card-sub` 106 | sans / 14px / 400 / 1.55 (21.7px) / normal / #6B7280; mb 28px; centered |
| OTP sub | inline `<p>` 415 | sans / 14px / 400 / normal (18.67px) / #6B7280; mb 0; centered; wraps to 2 lines (37.33px) |
| field label | `.field-label` 113 | sans / 12px / 600 / normal / .04em (0.48px) / none (text typed in caps in markup) / #6B7280 |
| input text | `.field-input` 122 | sans / 16px / 400 / normal / normal / #1A1F36 |
| placeholder | 132 | inherits 16px / #9CA3AF |
| field error | `.field-error` 143 | sans / 12px / 400 / normal / #EF4444; mt 4px |
| checkbox label | `.cb-label` 158 | sans / 14px / 400 / #1A1F36 |
| link btn | `.link-btn` 159-165 | sans / 14px / 600 / normal / #5ADADA / underline, `text-underline-offset:4px` |
| button label | `.btn` 173 | sans / 16px / 600 / normal / centered |
| OTP digit | `.otp-slot` 252-255 | mono / 24px / 600 (synthetic) / normal / centered / #1A1F36; caret `#7AEFEF` |
| OTP separator | `.otp-sep` 271-274 | sans / 22px / 700 / #9CA3AF, glyph `·` |
| OTP error msg | `.otp-error-msg` 277 | sans / 14px / 500 / normal / #EF4444 / centered; min-height 20px; mb 8px |
| timer row | `.timer-row` 285-288 | sans / 14px / 400 / #9CA3AF |
| timer value | `#web-timer` 292 | mono / 14px / 600 (synthetic) / #6B7280; `.warn` #EF4444 |
| back button | inline 444-448 | sans / 14px / 500 / #6B7280 (DM Sans 500 is loaded) |
| success title | `.success-title` 331 | sans / 22px / 700 / normal / #1A1F36; mb 6px |
| success sub | `.success-sub` 332 | sans / 14px / 400 / 1.55 (21.7px) / #6B7280 |

### 1.4 Radii
card 8px (line 83); input 4px (120); primary btn 4px (172); OTP slot 8px (251); checkbox box 2px (150); focus-visible outline radius 4px (32); success ring 50%; spinner 50%. Dead: nav icon 4px, phone pill 8px, phone icon 12px, chips/badges 999px.

### 1.5 Borders
input `1.5px solid #E2E2E2` (119); slot `1.5px solid #E2E2E2` (250); checkbox `1px solid #9CA3AF` (151); no card border; spinner `2.5px solid rgba(0,0,0,.15)` + `border-top-color #1A1A1A` (184).

### 1.6 Shadows / rings
- card: `0 4px 24px rgba(0,0,0,.08), 0 2px 4px rgba(0,0,0,.04)` (84)
- input focus ring: `0 0 0 4px #7AEFEF18` (130); input error ring `0 0 0 4px rgba(239,68,68,.08)` (133); slot focus ring `0 0 0 4px #7AEFEF18` (263)
- button focus-visible: `outline: 2px solid #7AEFEF; outline-offset: 2px; border-radius: 4px` (29-33, applies to `button:focus-visible, [tabindex]:focus-visible`); inputs: `input:focus-visible { outline:none }` (35).

### 1.7 Transitions / animations
| item | value |
|---|---|
| `.field-input` | `border-color .18s, box-shadow .18s` |
| `.field-toggle` | `color .12s` |
| `.cb-box` | `background .12s, border-color .12s`; `.cb-box svg` `opacity .12s` |
| `.link-btn` | `opacity .12s` |
| `.btn` | `background .12s, transform .08s, opacity .12s` |
| `.otp-slot` | `border-color .15s, box-shadow .15s, background .15s, transform .1s` |
| spinner | `animation: spin .65s linear infinite` (`@keyframes spin { to { transform: rotate(360deg) } }`) |
| slot error | `animation: shake .35s ease` (`0%,100%{translateX(0)} 25%{translateX(-6px)} 75%{translateX(6px)}`) |
| success ring | `animation: pop-in .45s cubic-bezier(.34,1.56,.64,1)` (`0%{scale(.2);opacity:0} 100%{scale(1);opacity:1}`) |
| dead | `pulse-dot 2s ease-in-out infinite` (0%,100% opacity 1 scale 1; 50% opacity .4 scale 1.4); `dot-bounce .9s` (0%,100% translateY(0) opacity .4; 50% translateY(-4px) opacity 1) |
View switching has no transition (`display:none/block`).

### 1.8 Layout / spacing / z-index / gradients
- `*,*::before,*::after { box-sizing:border-box; margin:0; padding:0 }` (28)
- `.page` (45-52): `min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:24px 16px`
- no gradients, no background images, no blur on live elements. z-index only in dead `.top-nav` (100).
- Spacing in use (px): 4, 6, 8, 12, 14, 16, 20(dead), 24, 28, 32, 36, 40, 44, 48, 50, 58.

---------------------------------------------------------------------------
## 2. COMPONENTS

### 2.1 Sign-in card (`.card`, 79-87)
`width:100%; max-width:440px; background:#FFFFFF; border-radius:8px; box-shadow` (1.6); `padding: 0 40px 36px`. `@media (max-width:500px) { .card { padding: 0 24px 28px } }` (87). Content width 360px at desktop (computed), 295.33px at 375 (computed; card 343.33 = 375.33 - 2x16 page padding). Card centred vertically + horizontally by `.page`. At 1440x900 login card rect (computed): x500 y177.42 w440 h545.16; OTP card h537.33; success card h238.06 (y330.97).
Top of card has 0 padding; the logo header supplies the top spacing.
Success view: JS sets inline `card.style.padding = '32px'` (478) and hides logo header; resets to `''` on other views.

### 2.2 Logo (no wordmark) — `.card-logo-header` (90-93, markup 360-364)
`display:flex; justify-content:center; padding:36px 0 28px` (136px tall computed incl. 72px svg). Hidden (`display:none` inline) on success view.
Markup: `<svg width="72" height="72" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="…" fill="#7AEFEF"/></svg>` — one `<path>`, fill `#7AEFEF` (hard-coded, not token). Full path data: `enigma-x/auth-design-system/assets/web-logo-enigma-mark.svg` (verbatim lines 361-363). Rendered 72x72 at x684 y213.42 (computed). The word "Enigma X" appears only in copy ("Welcome back to Enigma X").
(Dead CSS defines a 28x28 #1A1A1A nav icon square + 16px "nav-name" 700 .04em wordmark; no markup uses it.)

### 2.3 Login view (`#view-login`, 367-409)
DOM, in order: `h1.card-title` "Welcome back to Enigma X" → `p.card-sub` "Sign in to access your trading dashboard." → `.field` email → `.field` (inline `margin-bottom:12px`) password → `.row-between` (checkbox + link) → `button#btn-login.btn.btn-primary`.
Vertical rhythm at 1440 (computed, y): title 313.42 h28.79 (mb6) → sub 348.21 h21.7 (mb28) → email label 397.91 h16 → input 419.91 h48 → [field mb16] → pw label 483.91 → pw input 505.91 h48 → [mb12] → row 565.91 h30.67 (mb40) → button 636.57 h50 → card pad-bottom 36.

#### Field (`.field`, 112; label 113; wrap 114)
`.field { display:flex; flex-direction:column; gap:6px; margin-bottom:16px }`; `.field-wrap { position:relative }`.
Label text typed in caps: "EMAIL ADDRESS", "PASSWORD"; `<label for>`. 12px/600/.04em/#6B7280.
#### Input (`.field-input`, 115-133)
`width:100%; height:48px; padding:0 44px 0 14px; background:#F5F5F5; border:1.5px solid #E2E2E2; border-radius:4px; font: 16px DM Sans; color:#1A1F36; outline:none; transition; -webkit-appearance:none`.
Email input has inline `style="padding-right: 14px;"` (376); password inline `padding-right:44px` (385, same as CSS). Email: `type=email placeholder="you@enigma.io" autocomplete=email autocapitalize=off spellcheck=false`. Password: `type=password placeholder="Enter your password" autocomplete=current-password`.
States (computed):
| state | border | bg | ring |
|---|---|---|---|
| rest | #E2E2E2 | #F5F5F5 | none |
| hover | no rule (none) | | |
| focus | #7AEFEF | #FFFFFF | 0 0 0 4px rgba(122,239,239,0.094); placeholder stays #9CA3AF |
| error (`.error`) | #EF4444 | #F5F5F5 | 0 0 0 4px rgba(239,68,68,0.08) |
| error + focus | #EF4444 (error wins by source order) | #FFFFFF | red ring |
| disabled | no rule | | |
#### Error text (`.field-error`, 143-144)
`display:none` → `.show {display:block}`; 12px #EF4444; `margin-top:4px` (+ field gap 6px = 10px below input). Email: "Please enter a valid email address."; password: "Incorrect credentials. Please try again." Both appear together on empty submit; error classes are removed only on the next submit (not on typing).
#### Password toggle (`.field-toggle`, 134-142; markup 386-389)
`<button class="field-toggle" id="pw-tog" onclick="togglePw()" aria-label="Show or hide password">`; absolute `right:6px; top:50%; translateY(-50%)`; 44x44; transparent, no border; colour `#9CA3AF`, hover `#6B7280` (`color .12s`); svg 18x18 block. Rect (computed) x850 y507.91 44x44 inside 360 field. Two SVGs, stroke `currentColor`, `stroke-width:1.8`: `#pw-show` eye (`<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`), `#pw-hide` eye-off (`style="display:none"` initially). Files: `assets/web-icon-eye-show.svg`, `web-icon-eye-hide.svg`. Focus-visible: 2px #7AEFEF outline, offset 2px, radius 4px (computed, keyboard Tab from password).
#### Row (`.row-between`, 147)
`display:flex; align-items:center; justify-content:space-between; margin-bottom:40px`.
#### Checkbox (`.checkbox-row` 148, `.cb-box` 149-157, `.cb-label` 158)
Markup: `<label class="checkbox-row checked" onclick="this.classList.toggle('checked')"><div class="cb-box"><svg viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div><span class="cb-label">Keep me signed in</span></label>` (no real input; label itself not keyboard-focusable).
Row: flex, gap 8px, pointer, user-select none. Box 16x16, radius 2px, border 1px #9CA3AF, bg #FFFFFF; tick svg 10x10 opacity 0. Checked (default on load): bg #7AEFEF, border #7AEFEF, tick opacity 1 (stroke black). Transitions .12s. Row rect (computed) 142.34x18.67; label 118.34 wide.
#### Link button (`.link-btn`, 159-167)
`background:none; border:none; font 14px/600 DM Sans; color:#5ADADA; cursor:pointer; padding:6px 2px; text-decoration:underline; text-underline-offset:4px`. Hover `opacity:.75`. Disabled `opacity:.45; cursor:not-allowed; pointer-events:none`. "Forgot password?" has no handler (rect 123.55x30.67 computed).
#### Primary button (`.btn` 170-177, `.btn-primary` 178-182)
`width:100%; height:50px; border:none; border-radius:4px; 16px/600 DM Sans; flex centred; gap:8px; position:relative; overflow:hidden`. Primary: bg #7AEFEF, text #1A1A1A. Hover bg #5ADADA. Active `transform:scale(.98)`. Disabled: bg #D1D5DB, text #6B7280, `cursor:not-allowed`; disabled wins over hover (computed). No focus style beyond the global focus-visible outline.
Markup: `<button class="btn btn-primary" id="btn-login" onclick="handleLogin()"><span class="btn-label">Sign In</span><div class="spinner"></div></button>`.
Loading (`.loading`, JS also sets `disabled`): label `visibility:hidden`; spinner `display:block; position:absolute`, 18x18, `border:2.5px solid rgba(0,0,0,.15); border-top-color:#1A1A1A; border-radius:50%`, spin .65s linear infinite; because disabled the bg is #D1D5DB (grey) during loading (computed).

### 2.4 OTP view (`#view-otp`, 412-453) — "Authenticator wait"
DOM: `.eyebrow` "Two-factor authentication" → `h2.card-title` "Enter your 6-digit code" → `p` "Open the Enigma Authenticator on your phone and enter the code below." → `.otp-slots#otp-slots[role=group aria-label="6-digit verification code"]` → `p.otp-error-msg#otp-err[role=alert]` → `.timer-row` → `button#btn-verify` (inline `margin-top:40px`, initially `disabled`) → back button.
Vertical rhythm (computed, 1440): eyebrow y317.33 h18.67 → h2 342 h24 → p 372 h37.33 → slots 437.33 h58 (margin `28px 0 12px`) → timer row 507.33 h30.67 (mb16) → verify 578 h50 → back 644 h38.67 → card pad-bottom 36 (card h537.33). Hidden error `p` takes 0 height (display none), shown it pushes content by 20px + 8px mb.
#### Slots (`.otp-slots` 243-246, `.otp-slot` 247-268, `.otp-sep` 271-274)
`display:flex; gap:8px`. 6 inputs `id=s0…s5`, `maxlength=1 type=text inputmode=numeric pattern="[0-9]*" aria-label="Digit N"`, only s0 has `autocomplete="one-time-code"`. Separator `<div class="otp-sep" aria-hidden="true">·</div>` between s2 and s3 (`display:flex; align-items:center; padding:0 2px; 22px/700 #9CA3AF`; 9.55px wide computed).
Slot: `flex:1; min-width:0; height:58px; bg #FFFFFF; border:1.5px solid #E2E2E2; radius 8px; DM Mono 24px/600; #1A1F36; centred; caret-color #7AEFEF; outline none`. Width is fluid: 50.41px at 360 content width (computed: (360 - 6x8 gaps... 7 items => 6 gaps x 8 - sep 9.55)/6); 39.63px at 375 viewport.
States (computed):
| state | diff |
|---|---|
| rest | border #E2E2E2, bg #FFFFFF |
| focus / focus-visible (260-266) | border #7AEFEF; bg #FFFFFF; ring `0 0 0 4px rgba(122,239,239,0.094)`; `transform:scale(1.05)` (matrix 1.05) |
| filled (`.filled`) | border #7AEFEF; bg #FFFFFF (no ring, no scale) |
| error (`.has-error`) | border #EF4444; bg #fef2f2 (rgb 254,242,242); `shake .35s ease` |
| disabled (expired) | no styling (looks like rest; cursor default) |
| hover | no rule |
Auto-focus on s0 50ms after entering view. Slots get no value `filled` removal beyond JS below.
#### OTP error message (`.otp-error-msg`, 277-282)
`display:none` / `.show{block}`; 14px/500 #EF4444; centred; min-height 20px; mb 8px. Copy: "Incorrect code — please try again." (em dash). Rect shown (computed): y493.33 360x20.
#### Timer row (`.timer-row` 285-293; markup 431-437)
`display:flex; align-items:center; justify-content:space-between; font 14px #9CA3AF; margin-bottom:16px`. Left `.timer-label` flex gap 6px: clock svg 14x14 + text "Code expires in " + `<span id="web-timer">3:00</span>` (mono 14px/600 #6B7280; `.warn` #EF4444). Clock svg verbatim: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>` → `assets/web-icon-clock.svg`. Right: `<button class="link-btn" id="resend-link" onclick="resendCode()">Resend notification</button>` (134.5x30.67 computed); during cooldown text "Resend in {n}s" with `disabled` (opacity .45, pointer-events none, 96.69 wide at 28s).
#### Verify button
`<button class="btn btn-primary" id="btn-verify" onclick="handleVerify()" disabled style="margin-top:40px;"><span class="btn-label">Verify &amp; Sign In</span><div class="spinner"></div></button>`. Disabled until 6 digits: bg #D1D5DB / #6B7280 / not-allowed; enabled: bg #7AEFEF / #1A1A1A; hover #5ADADA. Loading same as 2.3.
#### Back button (inline styles 444-448, no class)
`<button onclick="goToView('view-login')" aria-label="Back to sign in" style="background:none;border:none;cursor:pointer;width:100%;margin-top:16px;padding:10px 0;color:var(--c-text-2);display:flex;align-items:center;justify-content:center;gap:6px;font-family:var(--font-sans);font-size:14px;font-weight:500;-webkit-tap-highlight-color:transparent;">` + 16x16 arrow svg `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>` + text "Back to sign in" (`assets/web-icon-arrow-left.svg`). No hover/active style. Rect 360x38.67 (computed).

### 2.5 Success view (`#view-success`, 456-464; CSS 319-332)
Markup: `.success-center` (flex column, centred, text-align center, padding 0) → `.success-ring` (72x72, radius 50%, bg #7AEFEF18, flex centred, mb24, pop-in) containing 34x34 svg `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>` (colour #7AEFEF, `assets/web-icon-check-success.svg`) → `h2.success-title` "Identity verified" (22px/700 #1A1F36 mb6) → `p.success-sub` "You've successfully signed in.<br/>Redirecting to your dashboard in <span id="redirect-countdown">5</span>s…" (14px/1.55 #6B7280; "…" is U+2026).
Logo header hidden; card padding 32px inline; card 440 x 238.06 (computed). Countdown decrements every 1000ms from 5 and navigates to `enigma-dashboard.html` at 0 (that file does not exist in the repo).

### 2.6 Toast / alert / divider / footer / nav
None rendered. Page has no toast, no banner alert, no footer, no top nav markup (CSS only, dead: see 5). The only error surfaces are `.field-error` and `.otp-error-msg`.

---------------------------------------------------------------------------
## 3. JS BEHAVIOUR (lines 469-710)
| behaviour | exact |
|---|---|
| view switch `goToView(id)` | removes `.active` from all `.view`, adds to target; `.card-logo-header` `display:none` only for success; `.card` inline padding `32px` on success else `''` |
| pw toggle | flips `#password` type password/text and swaps `#pw-show`/`#pw-hide` `style.display` |
| email validation | trimmed value must match `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |
| pw validation | `pw.length < 4` fails (message "Incorrect credentials. Please try again.") |
| submit | clears previous errors; on failure shows both applicable errors, no loading; on success adds `.loading`, `disabled=true`, waits **1300ms**, then: remove loading/enable, `goToView('view-otp')`, `BroadcastChannel('enigma_auth').postMessage({type:'sign_in_request'})` (try/catch), clear resend cooldown, reset resend link to "Resend notification" enabled, focus `s0` after **50ms**, `startWebTimer()`, `setupOTP()` |
| OTP setup | clears 6 values, removes `filled`/`has-error`, enables, attaches input/keydown/paste listeners once (`otpListenersAttached`), clears + hides error text, updates verify button |
| slot input | strips non-digits, keeps last char, toggles `.filled`, removes `.has-error`, hides error msg, auto-advances to next slot if filled and not last, updates verify enabled (`getCode().length < 6` => disabled) |
| keydown | Backspace on empty slot (idx>0): clear previous slot + its `.filled`, focus previous; ArrowLeft/ArrowRight move focus |
| paste | preventDefault; digits only, max 6; fills from s0 (adds `.filled`), focuses `min(pasted.length, 5)`, hides error, updates verify. Tested with "48 27-16xx" => "482716", focus s5 |
| verify | adds `.loading`, disabled; **1100ms** later: wrong code (demo code is `'482716'`) => remove loading/enable, add `.has-error` to all 6 slots (shake .35s), error text shown, after **600ms** per slot: remove `.has-error`, clear value, remove `.filled`; after **650ms** focus `s0` + `updateVerifyBtn()`. Right code => `clearInterval(webTimerInterval)`, `BroadcastChannel('enigma_auth').postMessage({type:'code_used'})`, `goToView('view-success')`, 5s countdown (1000ms tick) then `location.href='enigma-dashboard.html'` |
| expiry timer | 180s, tick 1000ms, format `m:ss` (`3:00`, `2:58`); `.warn` toggled when `webSecs <= 30`; at 0: text "Expired", all slots `disabled=true` (no visual change), timer stays `.warn` red |
| resend | disables link, restarts timer, clears/enables slots, hides error, focus s0 after 50ms, link text `Resend in 30s` counting down each 1000ms to "Resend notification" and enabled; verified in browser (28s read after ~2.3s) |
| Enter key (document keydown) | on login view calls `handleLogin()`; on OTP view calls `handleVerify()` only if 6 digits |
| `resetAll()` | defined (695-702), never called |

---------------------------------------------------------------------------
## 4. COMPARISON vs MAKOR WEB SIGN-IN (`hub/auth/makor-signin.html`, 702 lines)
| aspect | Enigma | Makor |
|---|---|---|
| flow / JS | login -> OTP -> success; identical functions, timings (1300/1100/600/650/50ms, 180s, 30s, 5s), `DEMO_CODE '482716'`, `BroadcastChannel('enigma_auth')` messages | identical (also channel name `enigma_auth`!); redirect `makor-dashboard.html` (vs `enigma-dashboard.html`); email check is `!email` (any non-empty username) vs email regex |
| fonts | DM Sans + DM Mono | Geist + EB Garamond (display), `--font-mono = sans` |
| palette | bg #EBEBEB, surface #FFFFFF, primary #7AEFEF (hover #5ADADA), text #1A1F36, text-2 #6B7280, text-3 #9CA3AF, border #E2E2E2, danger #EF4444, disabled #D1D5DB | bg #C8D8DF, surface #EDF3F6 (inputs #FFFFFF), primary #005268 (hover #003D4F), text #0B2530, text-2 #537380, text-3 #90AEBC, border #CCDDE4, danger #B53A3A, disabled #7FA0AB |
| card | 440px max, radius 8, pad 0 40 36, mobile <=500px pad 0 24 28, shadow 0 4 24 + 0 2 4 | 460px max, radius 16, pad 0 48 48, mobile <=560px pad 0 32 40, soft blue shadow |
| logo | 72x72 svg mark only, centred | 90x72 svg mark + `.brand-name` style defined (unused in markup) |
| background extras | none | constellation canvas, watermark svg, fixed footer text |
| title | h1 24px sans 700; OTP h2 20px | h1 38px serif small-caps 500; OTP 30px |
| inputs | with visible caps labels, bg #F5F5F5, border 1.5px #E2E2E2, radius 4, 16px, focus ring 4px | no labels (placeholders "Username"/"Password"), bg white, border transparent, radius 8, 14px, ring 3px; username text not email |
| button | 4px radius, 16px, label colour #1A1A1A on teal | 8px radius, 15px, white on dark teal |
| OTP slots | 58px tall, radius 8, DM Mono 24/600, fluid, visible `·` separator, focus scale 1.05 + bg transition | 68px, radius 12, serif 30/500, separator hidden, focus scale 1.03 |
| OTP chrome | eyebrow "Two-factor authentication", back link at bottom ("Back to sign in", inline styles), "Resend notification" link in timer row only | back link at top (`.back-link` "Back"), eyebrow "Step 2 of 2", extra "Didn't get a code? Resend" row, timer font serif |
| login extras | "Keep me signed in" | "Remember me" + terms line "By continuing you accept our Terms and Privacy." |
| success | ring 72, check 34, title 22 sans; card padding 32 | ring 68, check 32, title 30 serif small-caps; card padding 40 |
| copy | "Welcome back to Enigma X" / "Sign in to access your trading dashboard." | "Welcome back" / "Continue to your Makor X.AI workspace." |

### Cross-system note (not truth for auth): Enigma X main trading app (Figma) uses Geist / Geist Mono with brand #7AEFEF. This auth prototype uses DM Sans / DM Mono for all text but the same brand colour #7AEFEF; radius is 4px on controls (button/input) and 8px on card/slots. Geist/Geist Mono do not appear anywhere in the file. (Geist appears only in the sibling Makor sign-in.)

---------------------------------------------------------------------------
## 5. ODDITIES / BUGS / DEAD CODE (kept as-found)
1. Dead CSS, no markup: `.top-nav`, `.nav-brand/.nav-icon/.nav-name` (55-76); `.divider*` (191-194); `.secure-row*` (197-202); `.phone-graphic/.phone-pill/.phone-app-icon/.phone-notif-*` (208-236); `.waiting-badge/.waiting-dots` (296-314); `.session-chip/.live-dot` (333-343); `.btn-black` (344-346); keyframes `pulse-dot`, `dot-bounce` only used by those. `#view-login .eyebrow` (107) has no login eyebrow.
2. Line 9: `DM+Mono:wght@500;600` — 600 not published; slots and timer use synthetic bold on DM Mono 500 (computed).
3. Line 223 dead `rgba(45,218,197,.3)` teal not in palette.
4. Hard-coded colours not tokenised: lines 133, 184, 268, 362 (`fill="#7AEFEF"`), 397 (`stroke="black"`).
5. `.link-btn` colour is `--c-primary-dim` #5ADADA (contrast on white is low); `.waiting-badge` text uses #7AEFEF on near-white (dead).
6. Inline styles override/duplicate CSS: 376 (`padding-right:14px`), 381 (`margin-bottom:12px`), 385 (redundant `padding-right:44px`), 413-415 (OTP eyebrow/h2/p styled inline, h2 20px not 24px), 439 (`margin-top:40px`), 444-448 (back button entirely inline, no hover state).
7. Password error copy "Incorrect credentials. Please try again." shows for any password shorter than 4 chars (client-side), before any credential check.
8. Errors persist while typing (cleared only on next submit); `.field-input.error` + `:focus` gives white bg with red border.
9. Checkbox is a `<label>`+`<div>` with `onclick`, no `<input>`: not keyboard accessible; "Forgot password?" has no handler.
10. Document-level Enter handler (705-710) also fires when Enter is pressed on a focused button (e.g. toggle, Back), running `handleLogin()`/`handleVerify()` in addition to the button's click.
11. `goToView('view-login')` from the OTP back button does not stop `webTimerInterval` / `resendCooldownTimer`; timers keep running hidden.
12. Expiry disables slots with no visual disabled style; verify stays as-is; timer stays red "Expired".
13. Resend does not clear `#otp-err` text (hides only); `setupOTP` clears text.
14. `resetAll()` unused (695); `otpListenersAttached` reset only there.
15. `onSlotPaste` does not remove `.has-error` on slots; `onSlotKeydown` Backspace clears previous slot without hiding error msg.
16. `role="alert"` on `p#otp-err` while empty.
17. `html, body` both set `min-height:100vh` and `background`.
18. `BroadcastChannel('enigma_auth')` is shared by Makor pages and both authenticators (cross-talk).
19. Redirect target `enigma-dashboard.html` does not exist; success countdown navigates away after 5s.
20. Source line count header: file has 713 lines (+ trailing newline = 714 in Read).
21. Derived `enigma-x/auth-design-system/*` (not truth) renames tokens to `--auth-*`, adds mobile values; source token prefix is `--c-*`. Its CLAUDE.md lists as live web components: top nav (56px), waiting badge, security badge ("Secured by 256-bit TLS"), divider ("OR"), but the sign-in page has no markup for any of these (CSS only; the security-badge text and "OR" text do not exist anywhere in the file). It also says "border-radius always 4px, OTP slots 8px only exception"; in source the card is also 8px. It says OTP view heading 20px (matches inline 414) and "Eyebrow web 0.08em 14px" (matches).

---------------------------------------------------------------------------
## 6. GAPS (searched and absent)
- No dark theme / `prefers-color-scheme`; no reduced-motion handling; no print.
- No toast / snackbar / banner alert (searched for toast, alert, banner, snack).
- No wordmark markup (only SVG mark); no footer; no top-nav markup.
- No disabled style for inputs/OTP slots; no hover for inputs, slots, checkbox, back button.
- No tab/tablet/large breakpoints (only `max-width:500px`).
- No password-strength, caps-lock, lockout, rate-limit, SSO/social buttons, terms/privacy links, forgot-password flow, language switch.
- No `focus-visible` styling for checkbox/label; no skip link; no autocomplete beyond fields listed.
- No icon set beyond the 6 inline icons (assets/MANIFEST-web.md).
- No font-size scale tokens, spacing tokens, radius tokens, shadow tokens, motion tokens (all literals).

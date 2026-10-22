# MakorX.AI web sign-in — harvested spec

Source of truth: `hub/auth/makor-signin.html` (702 lines, single file: CSS L10-313, markup L315-440, JS L442-700). Served `http://localhost:3456/hub/auth/makor-signin.html`.
Conventions: "L123" = source line; "(computed)" = measured in a browser tab (own tab, `getComputedStyle` + `getBoundingClientRect`). Measurements taken at 1440x900 emulation (desktop), 375x812 emulation (mobile) and the natural pane 559x597 (DPR 1.5). NOTE DPR 1.5: a source `1.5px` border reads `1.33333px` in computed output; `2.5px` reads `2.66667px`; read all of these as the source value. The page is **light only** (no theme toggle, no `prefers-color-scheme`, no `body.dark`). Fonts load live from Google Fonts (L7-9): EB Garamond `ital,wght@0,400;0,500;0,600;1,400` + Geist `wght@400;500;600;700`, `display=swap`. Flow: `#view-login` -> `#view-otp` -> `#view-success`.

---
## 1. Foundations

### 1.1 CSS custom properties (:root, L11-27) — the ONLY tokens in the file
| name | value | role / where used |
|---|---|---|
| `--c-bg` | `#C8D8DF` | page backdrop (html, body L41) |
| `--c-surface` | `#EDF3F6` | card bg (L87); unchecked checkbox bg (L176) |
| `--c-surface-2` | `#FFFFFF` | input bg (L139), OTP slot bg (L241) |
| `--c-primary` | `#005268` | primary button, links, focus border, filled slot border, caret, eyebrow accent, success tick, logo fill (hard-coded in SVG), checked checkbox, outline |
| `--c-primary-hover` | `#003D4F` | `.btn-primary:hover` only (L204) |
| `--c-primary-ghost` | `rgba(0,82,104,0.07)` | focus ring (3px) on `.field-input`/`.otp-slot`; success-ring fill (L295) |
| `--c-text` | `#0B2530` | headings, input text, slot digits, `.back-link:hover`, `.resend-note strong` |
| `--c-text-2` | `#537380` | sub text, labels, back link, timer value, footer text, toggle hover |
| `--c-text-3` | `#90AEBC` | placeholders, terms text, timer label, resend note, toggle rest colour |
| `--c-border` | `#CCDDE4` | OTP slot border (rest), checkbox border (unchecked) |
| `--c-danger` | `#B53A3A` | field/OTP error text + border, timer warn |
| `--c-disabled` | `#7FA0AB` | disabled primary button bg |
| `--font-serif` | `'EB Garamond', Georgia, serif` | titles, OTP digits, timer, brand-name |
| `--font-sans` | `'Geist', -apple-system, sans-serif` | everything else |
| `--font-mono` | `var(--font-sans)` | **defined, never used** |

Hard-coded colours outside the variables: `rgba(181,58,58,.07)` (error focus ring L152), `rgba(181,58,58,.04)` (slot error bg L258), `#fff` (button text L203, spinner top L209), `rgba(255,255,255,.3)` (spinner track L209), `rgba(255,255,255,.65)` (disabled button text L206), `rgba(0,30,50,.10)` + `rgba(0,30,50,.05)` (card shadow L89), `stroke="white"` (checkbox tick L372), `#005268` (SVG fills L323/L339), canvas `RGB='0,45,70'` (L448).
Contrast (computed by formula, light): text `#0B2530` on surface 14.19; text-2 on surface 4.54; primary on surface 7.79; danger on surface 5.16; white on primary 8.73; **text-3 on surface 2.09 / on white 2.34**; white on disabled `#7FA0AB` 2.79.

### 1.2 Typography tuples (family / size / weight / line-height / letter-spacing / transform / colour)
| use | selector (line) | tuple |
|---|---|---|
| Login title | `.card-title` (L119-124) in `#view-login` | EB Garamond / 38px / 500 / 1.1 (=41.8px computed) / .01em (=0.38px) / `font-variant-caps: small-caps` (text-transform none) / `#0B2530`, centred (L129-131), mb 8px. Rendered text "Welcome back" |
| OTP title | `h2.card-title` + inline `style="text-align:center; font-size:30px;"` (L395) | same as above at 30px (line-height 33px, letter-spacing 0.3px computed) |
| Success title | `.success-title` (L301-306) | EB Garamond / 30px / 500 / **normal** (38.67px computed) / **normal** / small-caps / `#0B2530`, mb 8px |
| Card sub | `.card-sub` (L125-128) | Geist / 14px / 400 / 1.6 (22.4px) / normal / `#537380`, mb 28px, centred in login; inline centred in OTP (L396) |
| Success sub | `.success-sub` (L307) | Geist 14px/400/1.6 `#537380` |
| Eyebrow | `.eyebrow` (L111-116), `.accent` colour `#005268` | Geist / 11px / 600 / normal / .14em (1.54px) / uppercase / `#537380` (accent `#005268`) / mb 10px / centred. Only used as "Step 2 of 2" with `.accent` |
| Brand name (UNUSED) | `.brand-name` (L99-104) | EB Garamond 15px / 600 / .22em / uppercase / `#005268` — no markup |
| Input text | `.field-input` (L142) | Geist 14px, colour `#0B2530`, weight 400 (inherited) |
| Placeholder | `::placeholder` (L151) | `#90AEBC` (opacity 1 computed), 14px |
| Field error | `.field-error` (L162) | Geist 12px / 400 / normal / `#B53A3A`, mt 4px |
| Checkbox label | `.cb-label` (L183) | Geist 13px / 400 / `#537380` |
| Link button | `.link-btn` (L185-190) | Geist 13px / 600 / `#005268`, padding 4px 0 |
| Primary button | `.btn` (L195-202) | Geist 15px / 600 / letter-spacing .01em (0.15px) / `#fff` |
| Terms | `.terms-row` (L216-219) | Geist 12px / 400 / 1.5 (18px) / `#90AEBC` centred; links weight 500 `#005268` no underline (hover underline) |
| Back link | `.back-link` (L224-231) | Geist 13px / 500 / `#537380` (hover `#0B2530`) |
| OTP digit | `.otp-slot` (L244-246) | EB Garamond 30px / 500 / `#0B2530` centred; `caret-color #005268` |
| OTP error | `.otp-error-msg` (L264-269) | Geist 13px / 500 / `#B53A3A` centred, min-height 20px, mb 4px |
| Timer row | `.timer-row` (L272-275) | Geist 13px / `#90AEBC`; value `#web-timer` EB Garamond 13px/500 `#537380` (warn `#B53A3A`) |
| Resend note | `.resend-note` (L282-286) | 13px `#90AEBC`, mt 16px, centred; `strong` 600 `#0B2530` (unused in markup) |
| Footer | `.footer-text` (L69-73) | Geist 10px / 600 / .1em (1px) / uppercase / `#537380`, opacity .7 |
| Resend (inline note) | `#resend-link-2` inline `style="font-size:13px; font-weight:700;"` (L424) | 700 weight (the only 700 in the file) |
Weights used: Garamond 500 (600 only in unused `.brand-name`); Geist 400/500/600/700. Italic 400 Garamond is loaded (L9) but never used. `-webkit-font-smoothing: antialiased` on html,body (L43). The `<h1>`/`<h2>` carry no default weight (computed 500 from class).

### 1.3 Radii / borders / shadows
| thing | value (line) |
|---|---|
| card radius | 16px (L88) |
| input / primary button radius | 8px (L141 / L197) |
| OTP slot radius | 12px (L243) |
| checkbox box | 3px (L175) |
| success ring / spinner | 50% (L294 / L210) |
| focus-visible radius override | 4px (L34) — see oddity 4.4 |
| input border | `1.5px solid transparent` (L140); focus `border-color #005268`; error `border-color #B53A3A` |
| OTP slot border | `1.5px solid #CCDDE4` (L242); filled `#005268`; error `#B53A3A` |
| checkbox border | `1.5px solid #CCDDE4`; checked `#005268` |
| card shadow | `0 2px 40px rgba(0,30,50,.10), 0 1px 4px rgba(0,30,50,.05)` (L89); no border |
| focus ring | `0 0 0 3px rgba(0,82,104,0.07)` (inputs L149, slots L253) |
| error ring | `0 0 0 3px rgba(181,58,58,.07)` (L152, inputs only; slots get bg tint instead) |
| focus-visible outline (buttons) | `2px solid #005268`, `outline-offset 2px`, `border-radius 4px` (L31-35) — buttons only (computed on #pw-tog, .link-btn, #btn-login) |
| inputs | `input:focus-visible { outline: none }` (L36); no outline on inputs/slots, ring via box-shadow |

### 1.4 Spacing / sizes (computed, 1440x900)
- Page: `.page` flex column, centred both axes, `padding: 80px 16px 80px`, `min-height:100vh`, `position:relative; z-index:1` (L76-82).
- Card: `width:100%; max-width:460px; padding: 0 48px 48px` (L86,L90) -> **460 wide, inner 364** at desktop; `@media (max-width: 560px) { .card { padding: 0 32px 40px } }` (L92, the ONLY media query). At 375 wide the card is 343.33 wide (viewport − 2x16), inner 279.33. Card at 1440x900: x 490, y 182.24, h **535.52** (login), 580.46 (OTP), 271.46 (success).
- Logo header `.card-logo-header` flex column centre, `padding: 36px 0 24px; gap:10px` -> 132px tall; logo SVG 90x72.
- Login vertical stack (computed card top 182.24): logo hdr 132 / title 41.79 + mb8 / sub 22.4 + mb28 / field 48 (gap 14) / field 48 (+mb10 inline) / row-between 25.33 + mb24 / button 50 / terms mt18 h18 / card pb48. (Sums to 535.52.)
- `.field`: flex column, `gap:6px`, `margin-bottom:14px` (L134). `.field-input`: `height:48px; padding:0 44px 0 16px` (L137-138), username input overrides to `padding-right:16px` inline (L352), password repeats 44px inline (L360).
- `.field-toggle`: abs, `right:6px; top:50%; translateY(-50%)`, 44x44 hit area (rect x 852,y 478.43), icon 18x18, colour `#90AEBC` -> hover `#537380`, transition `color .12s`.
- `.row-between`: flex, space-between, align centre, mb 24px. `.checkbox-row` gap 8px; `.cb-box` 16x16, tick svg 10x10.
- `.btn`: `width:100%; height:50px; gap:8px`, flex centred. Spinner 18x18, border 2.5px.
- `.otp-slots`: flex, `gap:8px`, `margin:24px 0 8px` (L236-237). Slot `flex:1; min-width:0; height:68px` -> **54 x 68** at 1440 (inner 364), **59.33 x 68** at 396 inner (559 pane) and 279.33-inner mobile (computed: (inner − 40)/6). Slot x positions at 1440: 538, 600, 662, 724, 786, 848.
- `.timer-row` mb 24px; `.timer-label` gap 6px, clock svg 14x14.
- `.back-link` mb 28px, arrow svg 15x15, gap 6px.
- Success: `.card` gets inline `padding:40px` (JS L498); `.success-center` padding `8px 0 0`; `.success-ring` 68x68 mb 24px; tick svg 32x32 stroke-width 2.5.
- Page footer: `position:fixed; bottom:22px; left:0; right:0; padding:0 36px; display:flex; justify-content:space-between; z-index:2; pointer-events:none` (L63-68). Texts at 1440: left x 36 (w 248.75), right ends at 1404.
- Watermark: `position:fixed; bottom:-40px; right:-40px; width:360px; height:288px; opacity:.045; z-index:0; pointer-events:none` (L54-59); rect 1120,652,360x288 at 1440x900.
- Canvas: `position:fixed; top/left 0; 100% x 100%; z-index:0; pointer-events:none` (L47-51).
- z-index stack: canvas 0, watermark 0, `.page` 1, footer 2.

### 1.5 Backgrounds / decoration
- Page backdrop: solid `#C8D8DF` (no gradient).
- Constellation canvas (JS L444-490): 55 dots, link distance 155px, colour `rgba(0,45,70, …)`: dot fill alpha .3, radius `Math.random()*1.2+.8` (0.8-2.0), velocity `(rand-.5)*.22` per frame on x and y (+-0.11 px/frame), edges wrap (left->right, top->bottom); links `strokeStyle rgba(0,45,70, .1*(1-dist/155))`, `lineWidth .7`; `requestAnimationFrame` loop forever; `resize` handler only resizes the canvas (dots are not re-seeded); no reduced-motion handling.
- Watermark: the same logo path as the card logo (verified identical `d`), `fill #005268`, svg `viewBox 0 0 80 64`, 100% of a 360x288 box, opacity .045, clipped by the bottom-right edge.

### 1.6 Transitions & animations (L309-312 + per rule)
| target | declaration |
|---|---|
| `.field-input` | `transition: border-color .18s, box-shadow .18s` (default ease) |
| `.field-toggle` | `color .12s` |
| `.cb-box` | `background .12s, border-color .12s`; its svg `opacity .12s` |
| `.link-btn` | `opacity .12s` |
| `.btn` | `background .15s, transform .08s, opacity .12s` |
| `.back-link` | `color .12s` |
| `.otp-slot` | `border-color .15s, box-shadow .15s, transform .1s` |
| `@keyframes spin` | `to { transform: rotate(360deg) }` — spinner `.65s linear infinite` |
| `@keyframes shake` | `0%,100% translateX(0); 25% translateX(-6px); 75% translateX(6px)` — `.otp-slot.has-error` `.35s ease` |
| `@keyframes pop-in` | `0% scale(.2) opacity 0 -> 100% scale(1) opacity 1` — `.success-ring` `.45s cubic-bezier(.34,1.56,.64,1)` (no fill-mode) |
| View switch | none (display none/block, instant) |
| States | `.btn-primary:active { transform: scale(.99) }`; `.otp-slot:focus { transform: scale(1.03) }` (computed `matrix(1.03,0,0,1.03,0,0)`) |

---
## 2. Components, states, DOM, JS, copy

### 2.1 Sign-in card
`<div class="page"><div class="card">` : bg `#EDF3F6`, radius 16, shadow above, 460 max-width, padding `0 48px 48px` (`0 32px 40px` <=560px viewport width; `40px` all round on success via inline style). Contains: `#card-logo-header` (hidden only on success) + three `.view` siblings (only `.active` is `display:block`).

### 2.2 Logo / wordmark
- Mark only; **no wordmark text on the page** (`.brand-name` is dead CSS). Card logo (L338-340): `<svg width="90" height="72" viewBox="0 0 80 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="…(single path, 3021 chars)…" fill="#005268"/></svg>` — exact markup extracted to `makorx-ai/auth-design-system/assets/web-makor-logo-mark.svg`. Rendered 90x72 centred (x 675, y 218.24 at 1440). Not wrapped in a link; no `<title>`/aria-label.
- Watermark SVG (L322-324): same path, no width/height attributes -> `web-makor-watermark.svg`.
- Page `<title>`: "Makor-X.AI — Sign In" (L6).

### 2.3 Inputs (login)
DOM (L348-367): `.field > .field-wrap > input.field-input + (button.field-toggle) ; .field-error#…-err`.
- Username: `<input class="field-input" id="email" type="text" placeholder="Username" autocomplete="username" autocapitalize="off" spellcheck="false" style="padding-right:16px;">`; error `#email-err` "Please enter your username."
- Password: `<input class="field-input" id="password" type="password" placeholder="Password" autocomplete="current-password" style="padding-right:44px;">`; `.field` has inline `margin-bottom:10px`; error `#pw-err` "Incorrect credentials. Please try again."
- No `<label>` elements; placeholder is the label (no aria-label on the inputs). No `<form>` element.
- Rest: bg `#FFFFFF`, border `1.5px transparent` (so the field is white on `#EDF3F6` with no visible border), radius 8, height 48, 14px Geist.
- Focus (computed, real click): `border-color rgb(0,82,104)`, `box-shadow rgba(0,82,104,.07) 0 0 0 3px`, outline none (`outline-style none`); caret = text colour `#0B2530` (no caret-color on `.field-input`).
- Error (computed, after submit with empty/short fields): `border 1.5px solid rgb(181,58,58)`, `box-shadow rgba(181,58,58,.07) 0 0 0 3px`, bg stays `#FFF`; message `.field-error.show` display block, 12px `#B53A3A`, `margin-top:4px` (inside a flex column with `gap:6px`, so message sits 10px below the field: field total 48+6+4+15.33 = 73.33). Error persists on typing; only cleared on the next submit (JS L516-519).
- Error + focus: `.field-input.error` (later in source, same specificity) wins -> red border and red ring remain while focused.
- Hover: none defined. Disabled: none defined.
- Show/hide toggle: `<button class="field-toggle" id="pw-tog" onclick="togglePw()" aria-label="Show or hide password">` with two svgs `#pw-show` (eye) / `#pw-hide` (eye-off, `style="display:none"`), both `viewBox 0 0 24 24 fill none stroke currentColor stroke-width 1.8 round caps/joins`, CSS 18x18. Rest colour `#90AEBC`, hover `#537380`, keyboard focus-visible = 2px `#005268` outline offset 2px radius 4px (computed). Toggle sets `input.type` text/password and swaps icon display. No `aria-pressed`, label static. Pointer-style: `cursor:pointer`, `-webkit-tap-highlight-color:transparent`.
- Icons: `web-icon-eye.svg`, `web-icon-eye-off.svg`.

### 2.4 Checkbox "Remember me" (L370-375) — fake checkbox
`<label class="checkbox-row checked" onclick="this.classList.toggle('checked')"><div class="cb-box"><svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div><span class="cb-label">Remember me</span></label>` — **initially checked**. No `<input>`; not in the tab order (confirmed: Tab goes toggle -> Forgot password); no focus style. Unchecked: bg `#EDF3F6`, border `1.5px #CCDDE4`, tick opacity 0. Checked (computed): bg `rgb(0,82,104)`, border `rgb(0,82,104)`, tick opacity 1, tick 10x10 white stroke 3. Box 16x16 radius 3; row gap 8; `cursor:pointer; user-select:none`. Label text 13px/400 `#537380`. Icon: `web-icon-checkbox-check.svg` (+ `.currentColor` copy).

### 2.5 Buttons
- Primary `.btn.btn-primary` (L195-206): `width:100%; height:50px; border:none; radius 8; Geist 15/600; letter-spacing .01em; flex centred gap 8; position relative; overflow hidden`; bg `#005268`, text `#fff`. Hover (computed) bg `rgb(0,61,79)` = `#003D4F`; active `transform: scale(.99)`; disabled: bg `#7FA0AB` (rgb 127,160,171), text `rgba(255,255,255,.65)`, `cursor:not-allowed` (computed on `#btn-verify` initial state); keyboard focus: `outline 2px solid #005268; offset 2px; radius 4px` (computed; the 4px radius replaces the 8px — oddity 4.4).
- Markup: `<button class="btn btn-primary" id="btn-login" onclick="handleLogin()"><span class="btn-label">Sign in</span><div class="spinner"></div></button>`; verify: `id="btn-verify" onclick="handleVerify()" disabled` with label "Verify and continue".
- Loading `.btn.loading`: label `visibility:hidden`, `.spinner{display:block; position:absolute}`; spinner 18x18, `border:2.5px solid rgba(255,255,255,.3); border-top-color:#fff; radius 50%; animation spin .65s linear infinite`. JS also sets `disabled=true` at the same time, so the loading button is **grey `#7FA0AB`** with a white spinner (screenshot-verified).
- Secondary / outline / danger buttons: **none on this page**.
- Link button `.link-btn` (L185-192): no bg/border, Geist 13/600 `#005268`, `padding:4px 0`, hover `opacity .7`, disabled `opacity .4; cursor:not-allowed; pointer-events:none` (computed on resend cooldown), focus-visible outline as above. Instances: "Forgot password?" (dead, no handler), "Resend notification" (`#resend-link`), "Resend" (`#resend-link-2`, inline 13px/700).
- Text links: `.terms-row a` `#005268`, 500, no underline, hover underline; `href="#"` (Terms, Privacy).
- Back link `.back-link` (L224-232): `<button class="back-link" onclick="goToView('view-login')">` + arrow svg 15x15 `stroke-width 2.2` + "Back"; inline-flex gap 6; 13/500 `#537380`, hover `#0B2530`, mb 28px. Icon: `web-icon-arrow-left.svg`.

### 2.6 OTP step (DOM L388-426)
```
.view#view-otp
  button.back-link  ← icon + "Back"
  p.eyebrow.accent  "Step 2 of 2"
  h2.card-title (inline centred 30px)  "Verify it's you"
  p.card-sub (inline centred)  "We sent a 6-digit code to your device. Enter it below to continue."
  #otp-slots.otp-slots[role=group aria-label="6-digit verification code"]
     input.otp-slot#s0…#s5 (maxlength=1 type=text inputmode=numeric pattern="[0-9]*" aria-label="Digit N"; autocomplete="one-time-code" only on s0)
     (+ hidden div.otp-sep "·" between s2 and s3, display:none)
  p.otp-error-msg#otp-err[role=alert]
  .timer-row
     .timer-label > svg(clock 14x14) "Code expires in&nbsp;" span#web-timer "3:00"
     button.link-btn#resend-link  "Resend notification"
  button.btn.btn-primary#btn-verify[disabled]  "Verify and continue"
  p.resend-note  "Didn't get a code? " button.link-btn#resend-link-2 "Resend"
```
Note the logo header stays visible above "Back" on this step (it lives outside the views).
- Slot (computed, 1440): 54x68, bg `#FFF`, `1.5px solid #CCDDE4`, radius 12, EB Garamond 30/500 `#0B2530`, centred, `caret-color #005268`, outline none.
- Focus: `border-color #005268; box-shadow 0 0 0 3px rgba(0,82,104,.07); transform scale(1.03)` (computed: 59.33x68 slot -> 61.11x70.04 bounding box).
- Filled (`.filled` added on input): `border-color #005268` (stays after blur, computed). Transition .15s/.1s.
- Error (`.has-error`): `border-color #B53A3A; background rgba(181,58,58,.04)` + `shake .35s ease`; `.filled` remains alongside but has-error is later in source and wins (computed). During `:focus` + has-error the focus ring/scale also applies.
- Disabled (timer expired): no CSS; computed identical to rest (white bg, `#CCDDE4`, `cursor default`).
- Error message: `.otp-error-msg.show` block, 13/500 `#B53A3A` centred, `min-height 20px`, `mb 4px`; copy "Incorrect code — please try again."; it inserts after the slots (slots mb 8) and pushes timer row down by 24px; it stays visible after slots are cleared until the next input/paste/resend.
- Timer: `#web-timer` Garamond 13/500 `#537380`, `.warn` -> `#B53A3A` at <=30s; at 0 text becomes "Expired" and `warn` is left on (computed `rgb(181,58,58)`) -> reads "Code expires in Expired".
- Resend cooldown: both buttons `disabled` (opacity .4) with text "Resend in {n}s" counting 30->1, then restored to "Resend notification" / "Resend".
- Clock icon: `web-icon-clock.svg` (circle r10 + path M12 6v6l4 2, stroke-width 2, round cap).

### 2.7 Success step (L429-437)
```
.view#view-success > .success-center
   .success-ring > svg (tick polyline 20 6 9 17 4 12, stroke currentColor 2.5)
   h2.success-title "Identity verified"
   p.success-sub "You've successfully signed in.<br/>Redirecting to your dashboard in <span id=redirect-countdown>5</span>s…"
```
Ring 68x68 circle `rgba(0,82,104,.07)`, tick 32x32 `#005268`, `pop-in` .45s springy. Card is 460x271.46 (computed): padding 40, no logo. Countdown number is unstyled (inherits 400 `#537380`). Icon: `web-icon-success-check.svg` (same polyline as the checkbox tick, different stroke/width).

### 2.8 Footer
`<div class="page-footer"><span class="footer-text">Trading Intelligence · SOC 2 · ISO 27001</span><span class="footer-text">Secure Portal · V.1.0</span></div>` (rendered uppercase). Fixed to the viewport bottom, above the card in z-order (z 2): on short viewports (e.g. 559x597) the footer text overlaps the card content (screenshot-verified). At 375 wide the two spans wrap to 2 lines each (rects 198.97 / 104.36 wide, 25.33 tall) and overlap the watermark.

### 2.9 Toast / alert / divider / tooltip
**None exist.** The only feedback is inline: `.field-error`, `.otp-error-msg` (role=alert), timer colour, and the success view.

### 2.10 Copy inventory (verbatim)
Login: title "Welcome back"; sub "Continue to your Makor X.AI workspace."; placeholders "Username", "Password"; errors "Please enter your username." / "Incorrect credentials. Please try again."; "Remember me"; "Forgot password?"; button "Sign in"; terms "By continuing you accept our Terms and Privacy."
OTP: "Back"; "Step 2 of 2"; "Verify it's you"; "We sent a 6-digit code to your device. Enter it below to continue."; slot labels "Digit 1".."Digit 6"; "Code expires in 3:00"; "Resend notification"; "Resend in 30s"…; "Verify and continue"; "Didn't get a code? Resend"; error "Incorrect code — please try again."; "Expired".
Success: "Identity verified"; "You've successfully signed in." + "Redirecting to your dashboard in 5s…".
Footer: "Trading Intelligence · SOC 2 · ISO 27001" / "Secure Portal · V.1.0". Title tag "Makor-X.AI — Sign In".
Brand spellings in the file: "Makor-X.AI" (title L6) vs "Makor X.AI" (L346) — brief says "MakorX.AI".

### 2.11 JS behaviour (L442-700)
- `goToView(id)` (L493-499): removes `.active` from all `.view`, adds to target; hides `#card-logo-header` only for `view-success`; sets `.card` inline padding to `40px` for success else `''`.
- `togglePw()` L502-507.
- `handleLogin()` L510-546: trims username; error if empty; error if `pw.length < 4` (any characters; the "Incorrect credentials" message is shown for a SHORT password, no real credential check); clears errors first on every submit; on pass: `.loading` + `disabled`, after **1300ms** -> remove loading, `goToView('view-otp')`, `BroadcastChannel('enigma_auth').postMessage({type:'sign_in_request'})` (try/catch), reset resend buttons ("Resend notification"/"Resend", enabled, clear cooldown timer), focus `#s0` after **50ms**, `startWebTimer()`, `setupOTP()`.
- `setupOTP()` L553-567: for s0-s5 clear value, remove `filled`/`has-error`, `disabled=false`, attach `input`/`keydown`/`paste` listeners once (`otpListenersAttached`); clear + hide `#otp-err`; `updateVerifyBtn()`.
- `onSlotInput` L569: keep only the last digit (`replace(/\D/g,'').slice(-1)`), toggle `.filled`, remove `.has-error`, hide `#otp-err`, auto-advance to next slot when a digit was entered (not past s5), update verify button. **No auto-submit** when the 6th digit is entered. Non-digits are stripped.
- `onSlotKeydown` L579: Backspace on an empty slot clears + un-fills the previous slot and focuses it; ArrowLeft/ArrowRight move focus. Delete/Home/End not handled.
- `onSlotPaste` L591: `preventDefault`, strips non-digits, first 6 digits are written into **s0..s5 starting from s0 regardless of which slot received the paste** (computed: pasting "123" into s2 overwrote s0-s2: 482716 -> 123716); focus goes to `min(len, 5)`; hides error; no auto-submit (computed: "48-27 16xx9" -> 482716, focus s5, verify enabled).
- `updateVerifyBtn` L604: `#btn-verify.disabled = getCode().length < 6`.
- `DEMO_CODE = '482716'` (L550); `handleVerify()` L607-640: loading + disabled; after **1100ms**: wrong code -> remove loading, enable button, add `.has-error` to all 6 slots (each cleared + un-`filled` + `has-error` removed after **600ms**), show "Incorrect code — please try again." (stays), focus s0 + `updateVerifyBtn()` after **650ms** (so the button goes disabled again). Correct code -> `clearInterval(webTimerInterval)`, `BroadcastChannel postMessage({type:'code_used'})`, `goToView('view-success')`, 5-second countdown via `setInterval(1000)` updating `#redirect-countdown` (4,3,2,1,0) and at `<=0` `window.location.href = 'makor-dashboard.html'` — **that file does not exist** (`hub/auth/` has no dashboard; computed: navigates to `/hub/auth/makor-dashboard` 404).
- Timer `startWebTimer()` L644-660: 180s, text format `${m}:${ss}`, 1s interval; `warn` class at `<=30`; at 0: text "Expired", interval cleared, all 6 slots `disabled=true` (the verify button state is not touched).
- `resendCode()` L664-691: disables `#resend-link`; restarts the 3:00 timer; clears/enables slots, hides OTP error, updates verify button, focuses s0 after 50ms; 30s cooldown: both resend buttons show "Resend in {secs}s" and are disabled; at 0 they return to "Resend notification"/"Resend". No message is broadcast and no loading state.
- Global Enter handler (L694-699): Enter anywhere calls `handleLogin()` when the login view is active, `handleVerify()` when the OTP view is active and 6 digits are entered (computed: Enter on the focused show/hide toggle both validated the form and toggled the password).
- Constellation canvas: see 1.5.

---
## 3. Assets
See `makorx-ai/auth-design-system/assets/MANIFEST.md` (or `MANIFEST-web.md`): 8 inline SVGs extracted as `web-*.svg` (+ 3 `.currentColor.svg` copies). Paths are untouched.

---
## 4. Source oddities / bugs / dead CSS (kept as found; owner to decide)
1. L26 `--font-mono` defined, never used.
2. L99-104 `.brand-name` and L111-116 plain `.eyebrow` colour: `.brand-name` has no markup; `.eyebrow` only ever used with `.accent`.
3. L31 `[tabindex]:focus-visible` — no element has `tabindex`.
4. L31-35 `button:focus-visible { border-radius: 4px }` changes the primary button radius 8px -> 4px while keyboard-focused (computed on `#btn-login`) and sets 4px on link buttons/toggle.
5. L36 + L143 + L247 + L255 repeated `outline:none` on inputs; L251 `.otp-slot:focus, .otp-slot:focus-visible` redundant pair.
6. L145/L249 `-webkit-appearance: none` without unprefixed `appearance`.
7. L260-261 `.otp-sep` `display:none` ("kept for JS compatibility") but no JS references it; the `·` div at L402 is dead markup.
8. Hard-coded colours bypass tokens (list in 1.1): error ring/bg alphas, spinner, disabled text, shadow, canvas RGB `0,45,70` (not a token; `#002D46`).
9. Inline styles overriding CSS: L352 `padding-right:16px`, L357 `margin-bottom:10px`, L360 `padding-right:44px` (= default), L395 `text-align:center; font-size:30px`, L396 `text-align:center`, L424 `font-size:13px; font-weight:700`.
10. Title inconsistency: `.card-title` 38px/1.1/.01em vs OTP inline 30px vs `.success-title` 30px with `line-height:normal`, no letter-spacing (computed 38.67px high vs 33px).
11. Text-align centring for login via `#view-login …` selectors (L129-131) but inline for OTP; `.eyebrow` has own `text-align:center`.
12. Invalid HTML: `<div class="spinner">` inside `<button>` (L381, L420) and `<div class="cb-box">` inside `<label>` (L371) — block content in phrasing parents; `<label>` has no control (fake checkbox, not keyboard accessible, no form value).
13. `#email` id for a "Username" field (type=text) — id/placeholder mismatch.
14. Misleading error: "Incorrect credentials. Please try again." for password shorter than 4 chars (L526-530).
15. Errors never clear on input (login field errors only at next submit; OTP error message persists after slots auto-clear).
16. Enter-key global handler double-acts with focused buttons (toggle: validates + toggles; fine on #btn-login only because the button becomes disabled before click is dispatched); Enter during the 1300ms/1100ms delay can re-enter `handleLogin/handleVerify` (no re-entry guard; duplicate timers/BroadcastChannel posts possible).
17. Timer expiry leaves `.warn` on and produces "Code expires in Expired"; Verify remains enabled if 6 digits were present when it expired while slots become disabled.
18. Paste always starts at s0 (see 2.11); a filled slot rejects a new digit (`maxlength=1` + no select-on-focus — inferred, not tested with real keystrokes).
19. `BroadcastChannel('enigma_auth')` (L537, L627) — leftover "enigma" product naming; sibling prototypes also use it.
20. `window.location.href = 'makor-dashboard.html'` (L636) points to a non-existent page (404 observed).
21. "Forgot password?" `.link-btn` (L376) has no handler; Terms/Privacy `href="#"` (L384).
22. `.resend-note strong` (L286) has no matching markup. L9 loads Garamond italic 400 that is never used.
23. Page footer is `position:fixed; z-index:2` and overlaps the card when viewport height < ~700px (observed at 559x597).
24. At <=375 wide the footer wraps to 2 lines per span; only one media query exists (L92).
25. Both `html` and `body` carry `min-height:100vh; background; color; font-family` (L38-44).
26. `.field-toggle` (button) sits inside `.field-wrap` but the Remember/Forgot row has no relation to focus order beyond DOM order (Tab order: username, password, toggle, Forgot password, Sign in, terms links).
27. `body` visible title spelled "Makor-X.AI" vs "Makor X.AI" (L6 vs L346).
28. Success/OTP step reuse of `.card-logo-header`: on OTP the logo stays above the Back link (by design?), on success it is removed (JS L497).
29. `:active` only defined for `.btn-primary`; other buttons lack pressed states.
30. Canvas animation never pauses (no visibility/reduced-motion guard); dots not re-seeded on resize.

## 5. GAPS (searched; the page does not define)
- Theming: no dark mode / `prefers-color-scheme` / theme toggle (grep `prefers-`, `dark`: 0 hits). `prefers-reduced-motion`: none.
- No `<form>`, no `<label>` for inputs, no `aria-invalid`, `aria-describedby`, `aria-pressed`, `aria-live` (only `role="alert"` on `#otp-err`, `role="group"` + `aria-label` on slots, `aria-label` on toggle).
- No hover state on inputs/slots; no disabled input style; no input success/valid state; no password-strength, caps-lock or show-label text.
- No toast/alert/banner/tooltip/title attributes (grep `toast`, `tooltip`, `title=`: 0).
- No secondary/outline/danger button; no loading state for resend; no lockout / rate-limit / attempts UI; no forgot-password, reset-password, registration, error-page or sign-out screens; no divider/"or" separator; no SSO buttons.
- Focus: no focus ring for the fake checkbox (not focusable); no focus-visible for `a` (terms links) beyond the browser default (global rule only targets `button`/`[tabindex]`).
- No spacing/radius/shadow/font-size/z-index/duration tokens (only 15 variables, colours + fonts); no responsive step besides one `max-width:560px` card padding rule.
- No `autocomplete="one-time-code"` on s1-s5; no copy-to-clipboard; no network calls (`fetch`/`XMLHttpRequest`: 0) — all logic simulated (demo code `482716`).

## 6. vs the main HR app (note only)
Matches: brand `#005268`, Geist family, `-webkit-font-smoothing: antialiased`. Differs (see `makorx-ai/html-spec/auth.md` for the full token diff): EB Garamond on titles/digits (HR has none), blue-grey `#C8D8DF/#EDF3F6/#CCDDE4/#0B2530/#537380/#90AEBC` palette, 16px card / 8px field / 12px slot radii, 48px field and 50px button (HR 36-38px controls), focus ring 0.07 alpha (HR 0.12).

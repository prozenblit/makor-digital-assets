# Enigma X AUTH design system - stage A build notes (handoff to stage B)

Stage A wrote: `tokens.json`, `tokens.css`, `components.css`, this file. NOT yet rewritten (stage B): `components.md`, `CLAUDE.md`, `showcase.html` (the versions currently in the folder are the OLD drifted ones - overwrite, do not reuse values). `_stageA-test.html` (temporary) was deleted after verification.

Rule set: `audit/BUILD_RULES.md` incl. section 11. Truth = prototypes `hub/auth/enigma-signin.html` (W) and `hub/auth/enigma-authenticator.html` (A), specs `enigma-x/auth-html-spec/web-signin.md`, `authenticator.md`. Light only (no dark theme, no prefers-color-scheme in either prototype).

## 1. Tokens (`--eauth-*`, 205 CSS vars, tokens.json generated from the same table so they are identical)
Prototype variables are `--c-*` (web 15, app 14, same names with DIFFERENT values per surface), so colours are split per surface. The faithful map is `tokens.json > prototypeVariables.{web,app}` (`--c-bg -> --eauth-web-bg` etc.).
| group (tokens.json) | CSS names |
|---|---|
| color.brand | `--eauth-brand` #7AEFEF, `-brand-chrome` #3DBFBF (app only), `-brand-hover` #5ADADA, `-brand-ghost` #7AEFEF18, `-white` |
| color.web | `--eauth-web-{bg #EBEBEB, surface #FFFFFF, surface-2 #F5F5F5, black #1A1A1A, text #1A1F36, text-2 #6B7280, text-3 #9CA3AF, border #E2E2E2, danger #EF4444, disabled #D1D5DB, danger-ring, danger-bg #fef2f2, spinner-track, tick #000000}` |
| color.app | `--eauth-app-{bg #F7F8F8, surface, surface-2 #F7F8F8, black #000000, text #1A1F36, text-2 #7C9CAC, text-3 #A8BECD, border #DEE8ED, danger #E5686A, success #4DCC9B, disabled-bg, disabled-text}` |
| color.app-overlays | raw rgba literals of the app (pill, faceid tint, logo tile, push glass/border/highlight/text, on-chrome, map pill, sheet + confirm overlays) |
| color.dependency | `--eauth-dep-faceid-card` #404042 (documentation only) |
| font | `--eauth-font-sans` DM Sans stack, `--eauth-font-mono` DM Mono stack |
| fontSize / fontWeight / lineHeight / letterSpacing | `--eauth-fs-{10,12,14,16,18,20,22,24,38}`, `--eauth-fw-{regular,medium,semibold,bold}`, `--eauth-lh-{tight 1.2, push-title 1.3, push-sub 1.4, confirm-body 1.45, body 1.55}`, `--eauth-ls-*` (10 values) |
| spacing | `--eauth-space-{2..40}` observed values (documentation tokens; components use literal px with src comments) |
| borderRadius | `--eauth-radius-{checkbox 2, control 4, card 8, logo-tile 10, icon-tile 12, dialog 14, banner 22, circle 50%, shell min(44px,4vw)}` |
| controlHeight / size | `--eauth-h-*`, `--eauth-size-*` (card 440, pads, shell `min(390px,100vw)` x `min(844px,100dvh)`, icon sizes ...) |
| border / shadow / blur | `--eauth-border-*` (width+style; colour separate), `--eauth-shadow-*`, `--eauth-blur-*` |
| duration / easing / animation / zIndex / breakpoints | `--eauth-dur-{80..2400}`, `--eauth-ease-{screen,sheet,pop,ease,linear}`, `--eauth-anim-{spin,shake,pop-in,blur-fade-in,faceid-content-in,dotpulse}`, `--eauth-z-{faceid-content 1, launch 40, faceid 50, sheet-overlay 100, sheet 101, confirm 200, push 300, toast 999}` |
| timing (JSON only) | behaviour constants: 180s expiry, 30s resend, 5s redirect, 1300/1100/600/650/50 ms (web), 1800/2200/9000/3000/2000 ms ... (app) |
| gradient | none exist (explicit `none` entry) |
Unused-by-components tokens (documentation only): spacing, most `h-`/`size-` keys, `web-danger-ring`, `app-push-highlight` (both are embedded in shadow tokens), `dep-faceid-card`, `border-focus-outline`, `bp-web-narrow`, `ease-pop/linear`, `dur-450/650/2400` (used only inside `--eauth-anim-*`).
No `semantic` alias groups (text/surface/border): names are already role-based and per surface.
tokens.json keeps the hub viewer schema (`color.<group>.<token>`, `font.primary/mono`, `fontSize`, `spacing`, `borderRadius`) and adds `{value, comment, css}` everywhere. `meta` has no `$schema`.

## 2. Class scheme
- Web `.web-*` (46 classes), mobile `.app-*` (109), shared icons `.eauth-icon` + `.eauth-i-<name>` (14, mask icons from assets; logo = one class for web 72px / launch 108px / white tiles because the path is byte-identical).
- Real pseudo-classes plus forced `.is-hover .is-focus .is-active .is-disabled`.
- JS state classes renamed (prototype name -> here): `.active`(view)->`.is-active`; `.error`/`.has-error`->`.is-error`; `.filled`->`.is-filled`; `.loading`->`.is-loading`; `.checked`->`.is-checked`; `.warn`->`.is-warn`; `.urgent`->`.is-urgent`; `.show`->`.is-show`; `.open`->`.is-open`; `.hidden`->`.is-hidden`; `.status-bar--teal`->`.app-status-bar.is-chrome`; plus new hooks `.is-pressed` (pw toggle), `.is-copied`, `.is-fading`, `.is-removing`, `.is-entering`, `.is-current/.is-before/.is-after` (screen navigation).
- Containers: web `.web-page` (page backdrop, = html/body) > `.web-card`; mobile `.app-stage` (= body) > `.app-shell`.
- Every rule block has a `/* src: file Lxx */` comment; no raw hex/rgba in rules (colours all via tokens; three keyframe sets + @media use literal values).

## 3. Components built
Web (W): page backdrop; sign-in card (+`--success`, 500px behaviour); logo header + logo; view switch; eyebrow/title/sub (+`--otp`); field + label + input (+password variant, focus/error, EXTENDED hover/aria-invalid) + field error; password toggle (show/hide swap); row; checkbox ("Keep me signed in", real input); link button (hover/disabled); button (primary: hover/active/disabled/loading + spinner; `--spaced`); OTP slots (rest/focus/filled/error+shake) + separator; OTP error message; timer row (clock icon, value, warn); back button; success view (ring pop-in, icon, title, sub); keyboard focus ring.
No secondary button, footer, toast or nav exist in W (searched; spec section 6).
Mobile (A): stage; phone frame (shell, no notch/home indicator); status bar (+chrome); launch; Face ID overlay (blur, wrap, card, 180px anim box, EXTENDED placeholder, label, "Use Passcode" pill with hover/active); screen stack + navigation classes; home logo banner; header/title; list labels; session row (+removing); current-device card (dot pulse, detail grid, entering); empty state; push banner; bottom sheet (overlay, sheet, handle, map img, map pill, details grid); OTP code card (label, countdown +urgent, code, copy button +copied/disabled, block link, fading); confirmed state; confirm dialog; toast (default + `--danger`); password-fallback screen (top, back, eyebrow, title, sub, form, input group, input, toggle, submit); primary button; focus ring.

## 4. EXTENDED (not in the prototypes; derived only from existing tokens)
| item | what | derivation |
|---|---|---|
| `.web-page--contained`, `.app-stage--contained` | drop the viewport min-height so a page/stage can sit in a showcase frame | layout only |
| `.web-input:hover/.is-hover`, `.app-input:hover/.is-hover` | hover border `text-3` | source has no input hover; uses the surface's own placeholder grey |
| `.web-input[aria-invalid="true"]` | same look as `.is-error` | alias |
| `.web-checkbox-input:focus-visible + box` / `.is-focus` | 2px brand outline, offset 2px, radius unchanged | the page's own focus-ring recipe (source has no checkbox focus style) |
| `.app-faceid-placeholder` | labelled dashed box in place of the external Lottie | never an imitation; dashed `app-text-3`, `app-surface`, `app-text-2` |
| `@media (prefers-reduced-motion: reduce)` | transitions/animations ~0 | none in either prototype |
Not added on purpose: app input error state (the old docs claimed one; none exists), avatar, secondary buttons, hover for sign-out/back/toggle/block link/banner/rows (none in source).

## 5. Source bugs -> chosen intended behaviour (DOCUMENT, DON'T REPRODUCE)
Line refs: W = enigma-signin.html, A = enigma-authenticator.html.
| # | bug (where) | components.css / intended behaviour |
|---|---|---|
| W1 | Checkbox is `<label onclick>` + div, no input; not keyboard reachable (W395-400) | markup = label > `input[type=checkbox].web-checkbox-input` (visually hidden) + `.web-checkbox-box`; `:checked` and `.is-checked` give the same look; EXTENDED focus ring |
| W2 | Any password < 4 chars shows "Incorrect credentials. Please try again." before any check (W validation, spec 5.7) | that message only after a real credentials failure; empty-field copy is UNRESOLVED (owner) |
| W3 | Errors persist while typing; cleared only on next submit (spec 5.8) | clear `.is-error` + hide message on `input` of that field |
| W4 | Document-level Enter handler also fires on focused buttons (W705-710) | Enter submits only from inside an input/slot (or use a real `<form>`) |
| W5 | Back button leaves expiry + resend timers running (W444, goToView) | stop both timers when leaving the OTP view |
| W6 | Timer reads "Code expires in Expired" at 0 (W expiry handler) | at 0 replace the whole label with "Code expired" (copy to be confirmed), keep `.is-warn` red, keep Resend |
| W7 | Resend does not clear `#otp-err` text; paste does not clear `.has-error`; Backspace-clear leaves error msg (spec 5.13, 5.15) | all three clear error state |
| W8 | `role="alert"` on an empty `<p>` (W429) | keep, populate only on error |
| W9 | Success redirects to non-existent `enigma-dashboard.html` after 5s (spec 5.19) | target UNRESOLVED; countdown 5s kept |
| W10 | "Forgot password?" has no handler (W401) | styled link kept; destination UNRESOLVED |
| W11 | `.field-input.error` + `:focus` = white bg + red border (cascade accident) | kept as rendered (error ring wins); flagged, harmless |
| W12 | `button:focus-visible{border-radius:4px}` silently changes radius (W29-33) | ring only; 4px applied solely to radius-0 controls (link, toggle, back) so nothing changes shape |
| W13 | DM Mono 600 not published: OTP digits + timer use synthetic bold (W9) | reproduced (declares 600) and flagged; owner may prefer 500 |
| W14 | `.link-btn` colour #5ADADA on white: low contrast | kept (designed), flagged |
| A1 | Empty state: selector `#other-sessions .session-compact` matches nothing, so "No other active sessions." appears after the FIRST sign-out (A1177) | `.app-sessions-empty.is-show` only when zero `.app-session` rows remain after excluding the current-device card (`#sess-london`) |
| A2 | `navigator.clipboard.writeText` not awaited, rejection uncaught, UI says Copied anyway (A1259) | `await` inside try/catch; `.is-copied` only on success; failure toast copy UNRESOLVED |
| A3 | Face ID retry unreachable: handler needs `!.active`, `.active` always set (A1091-1096); `.active/.completed` have no CSS | tap-to-retry only after a scan ended; failure/retry visuals do not exist in source (UNRESOLVED) |
| A4 | Face ID started twice on cold load (`setTimeout(startFaceID,600)` A1099 + launch callback A989) | single start after the 1800ms launch hold |
| A5 | Banner covers status bar and sits above sheet/dialog (z 300) | kept (designed) |
| A6 | `button/input:focus-visible{border-radius:4px}` (A32-36) would shrink the 8px copy button | ring only; 4px only on radius-0 controls (back, toggle, block link) |
| A7 | App text inputs show a double ring (border+shadow plus 2px #3DBFBF outline) because A has no `input:focus-visible{outline:none}` (W has it) | kept as rendered and flagged (unsure bug vs design) |
| A8 | Hard-coded code `482 716`/`482716` (A921, A1222, A1258) | placeholder value; real generation is out of scope |
| A9 | Eye toggle never changes icon (no eye-off asset) (A808-809) | icon stays; type flips; flagged |
| A10 | Overlays/sheet cannot be dismissed by tap; no gestures | as designed |
| A11 | Accessibility gaps: no `role=dialog/aria-modal`, no `aria-live` toast, no focus trap (spec 6) | stage B should recommend `role="dialog" aria-modal="true"` on `.app-confirm`, `role="status"` on `.app-toast`; no CSS change |
| X1 | `BroadcastChannel('enigma_auth')` is shared by Makor pages and BOTH Enigma pages (cross-talk) | intended: a channel per product, e.g. `enigma_x_auth` for Enigma pages (messages `{type:'sign_in_request'}` / `{type:'code_used'}`); Makor keeps its own |
| X2 | `@dotlottie/player-component@latest` unpinned + remote Lottie (A10, A677) | pin the version; see dependencies |

## 6. Dead code excluded (no markup in source)
Web: `.top-nav`, `.nav-brand/.nav-icon/.nav-name`, `.divider*`, `.secure-row*`, `.phone-graphic/.phone-pill/.phone-app-icon/.phone-notif-*`, `.waiting-badge/.waiting-dots`, `.session-chip/.live-dot`, `.btn-black`, keyframes `pulse-dot` + `dot-bounce`, `rgba(45,218,197,.3)`, `#view-login .eyebrow` selector, `resetAll()`. (The old CLAUDE.md listed top nav 56px, waiting badge, "Secured by 256-bit TLS", "OR" divider as live: they do not exist.)
App: `.btn-danger`(+hover), `.home-header-left .eyebrow`, `.home-avatar`, `.session-current*`/`.session-rows`/`.session-row*`, `.sheet-otp.used`, `[tabindex]:focus-visible`, `.faceid-sub`, `.fid-wrapper.active/.completed`, `--c-primary-dim`, inert `flex-shrink` on the (block) sheet, base `.screen-title` 24px (never effective), `.session-dot` is live (kept).

## 7. Documented external dependencies (not copied, not imitated)
- Fonts: Google Fonts link `https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@500;600&display=swap` (W9, A9). Loaded: DM Sans 400/500/600/700, DM Mono 500 only.
- dotLottie player: `https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs` (A10, unpinned).
- Face ID animation: `https://lottie.host/2c89c12e-4c0d-41a6-ae13-30b2ce7a964a/kjwDIWFPeM.lottie` (A677, third-party host, same URL in the Makor authenticator). 150x148 viewBox rendered in a 180x180 box (fills 180 x 177.6), 244 frames @ 60fps = 4.0667s loop, composition "Flow 2". Dark rounded card `#404042` (radius 9.02 units = 10.824px at 1.2 scale) with white strokes/fills `#FFFFFF`, label "Face ID". States seen: face glyph (~frame 30) -> circle/scan -> circle with check (~frame 150). Player `loop`; JS plays it 60ms after reset and cuts at 2200ms (~frame 132) then `afterAuthSuccess`; cold open effective scan 1800 -> ~4000ms. The app breaks offline (no card renders). CSS here only reserves the 180px box (`.app-faceid-anim`) and offers a labelled placeholder.
- Map: `assets/app-map-london.svg` (illustration, shown 358x160, `preserveAspectRatio` slice => `object-fit:cover`).

## 8. Cross-system notes (not unified)
- Enigma main trading app (Figma, `enigma-x/design-system/`, untouched) uses Geist / Geist Mono with the same brand #7AEFEF; auth keeps DM Sans / DM Mono (owner decision 2026-10-14).
- Within auth, web and app differ and are kept separate: text-2 #6B7280 vs #7C9CAC, text-3 #9CA3AF vs #A8BECD, border #E2E2E2 vs #DEE8ED, danger #EF4444 vs #E5686A, bg #EBEBEB vs #F7F8F8, surface-2 #F5F5F5 vs #F7F8F8, label colour on brand #1A1A1A vs #000; hover #5ADADA exists only as a token on web (hard-coded on app); #3DBFBF (chrome) exists only on app; radii: web card 8/controls 4/slots 8, app card 8/controls 4/dialog 14/banner 22.
- The old DS claimed `#3DBFBF` is the mobile hover colour (false: `#5ADADA`), dot-pulse 2s ease-in-out (true value 2.4s ease), live avatar/session-current/top nav/waiting badge/security badge/divider (not rendered), an input error on the authenticator (none), "always 4px radius" (card/slots 8px).

## 9. Verification (stage A)
`_stageA-test.html` rendered every component/state (web login/OTP/success/states in a desktop frame; a 375px iframe for the 500px behaviour; 15 phone frames 600x900 for launch, Face ID, home, empty, push, sheet, urgent+copied, confirmed, dialog, both toasts, password screen + states). 403 computed-property / bounding-box checks, 0 mismatches: 314 against the spec numbers (card 440, padding `0 40px 36px`, content 360, 500px padding `0 24px 28px`, slot 50.41, shell 390x844 radius 24px at 600px, banner/sheet/dialog/toast geometry, every colour/type tuple, animations name/duration/easing) and 89 PARITY checks against the live prototypes in the same browser. 27 spec numbers that are line-box-rounding dependent (captured at DPR 1.5: 18.67 vs 18, 30.67 vs 30, ...) fail at DPR 1 and were replaced by the PARITY checks (they pass exactly at DPR 1.5 too). Border widths: `1.5px` computes 1.33333px at DPR 1.5 (device-pixel snapping), authored value kept.

## 10. Unresolved (owner / stage B)
1. Copy for: empty-password error, expired label ("Code expired"), clipboard failure.
2. Targets: "Forgot password?", post-login redirect.
3. Face ID failure/retry/lockout/biometric-unavailable states do not exist; the Lottie cannot be shown (placeholder only).
4. Decide whether DM Mono 600 (synthetic bold) stays; whether the app input double ring stays.
5. App password toggle needs an eye-off asset if the icon should change (none exists).
6. Stage B: `components.md` (markup from this file's class scheme + JS state map + intended behaviours), `CLAUDE.md`, `showcase.html` (use `.web-page--contained` / `.app-stage--contained`; phone frames fixed 390x844 - the shell uses `100dvh`, so give it an iframe/viewport >= 844px tall or override `height` in the showcase).
7. The showcase must show an "Extended" badge on the table in section 4 and a "Known source bugs" section from section 5.

## Appendix - reference markup (verified templates from the stage A test page; stage B: derive components.md / showcase from these)
State variants are produced by the option flags (is-* classes). `ICON(name, extraClass)` = `<span class="eauth-icon eauth-i-NAME extraClass"></span>`.
Note: ids `e${id}`/`p${id}` are test-only; use real ids. Phone frames need a >= 844px-tall viewport (shell height is `min(844px,100dvh)`).

```js
const ICON = (c, extra = '') => `<span class="eauth-icon eauth-i-${c} ${extra}"></span>`;

function webLogin(o = {}) {
  return `<div class="web-card" id="${o.id || ''}">
  <div class="web-card-logo">${ICON('logo', 'web-logo')}</div>
  <div class="web-view is-active">
    <h1 class="web-title">Welcome back to Enigma X</h1>
    <p class="web-sub">Sign in to access your trading dashboard.</p>
    <div class="web-field">
      <label class="web-field-label" for="e${o.id}">EMAIL ADDRESS</label>
      <div class="web-field-wrap"><input class="web-input ${o.emailCls || ''}" id="e${o.id}" type="email" placeholder="you@enigma.io" /></div>
      <div class="web-field-error ${o.err ? 'is-show' : ''}">Please enter a valid email address.</div>
    </div>
    <div class="web-field web-field--tight">
      <label class="web-field-label" for="p${o.id}">PASSWORD</label>
      <div class="web-field-wrap"><input class="web-input web-input--password ${o.pwCls || ''}" id="p${o.id}" type="password" placeholder="Enter your password" />
        <button class="web-field-toggle ${o.togCls || ''}" aria-label="Show or hide password">${ICON('eye-show')}${ICON('eye-hide')}</button></div>
      <div class="web-field-error ${o.err ? 'is-show' : ''}">Incorrect credentials. Please try again.</div>
    </div>
    <div class="web-row-between">
      <label class="web-checkbox ${o.checked === false ? '' : 'is-checked'}"><input class="web-checkbox-input" type="checkbox" ${o.checked === false ? '' : 'checked'}><span class="web-checkbox-box">${ICON('check-checkbox', 'web-checkbox-tick')}</span><span class="web-checkbox-label">Keep me signed in</span></label>
      <button class="web-link-btn">Forgot password?</button>
    </div>
    <button class="web-btn web-btn--primary ${o.btnCls || ''}" ${o.btnDisabled ? 'disabled' : ''}><span class="web-btn-label">Sign In</span><div class="web-btn-spinner"></div></button>
  </div></div>`;
}
function webOtp(o = {}) {
  const slots = (o.vals || ['', '', '', '', '', '']).map((v, i) => {
    const cls = (o.cls && o.cls[i]) || (v ? 'is-filled' : '');
    return `<input class="web-otp-slot ${cls}" maxlength="1" value="${v}" aria-label="Digit ${i + 1}">` + (i === 2 ? '<div class="web-otp-sep" aria-hidden="true">·</div>' : '');
  }).join('');
  return `<div class="web-card" id="${o.id || ''}">
  <div class="web-card-logo">${ICON('logo', 'web-logo')}</div>
  <div class="web-view is-active">
    <div class="web-eyebrow">Two-factor authentication</div>
    <h2 class="web-title web-title--otp">Enter your 6-digit code</h2>
    <p class="web-sub web-sub--otp">Open the Enigma Authenticator on your phone and enter the code below.</p>
    <div class="web-otp-slots" role="group">${slots}</div>
    <p class="web-otp-error ${o.err ? 'is-show' : ''}" role="alert">${o.err ? 'Incorrect code — please try again.' : ''}</p>
    <div class="web-timer-row"><div class="web-timer-label">${ICON('clock')} Code expires in <span class="web-timer-value ${o.warn ? 'is-warn' : ''}">${o.warn ? '0:25' : '3:00'}</span></div>
      <button class="web-link-btn">Resend notification</button></div>
    <button class="web-btn web-btn--primary web-btn--spaced ${o.btnCls || ''}" ${o.btnDisabled === false ? '' : 'disabled'}><span class="web-btn-label">Verify &amp; Sign In</span><div class="web-btn-spinner"></div></button>
    <button class="web-back-btn" aria-label="Back to sign in">${ICON('arrow-left')} Back to sign in</button>
  </div></div>`;
}
function webSuccess(o = {}) {
  return `<div class="web-card web-card--success" id="${o.id || ''}"><div class="web-view is-active"><div class="web-success"><div class="web-success-ring">${ICON('check-success', 'web-success-icon')}</div>
    <h2 class="web-success-title">Identity verified</h2>
    <p class="web-success-sub">You've successfully signed in.<br/>Redirecting to your dashboard in <span>5</span>s…</p></div></div></div>`;
}

function appShell(o = {}) {
  const logoBanner = `<div class="app-home-banner"><div class="app-home-banner-left"><div class="app-home-logo-tile">${ICON('logo', 'app-home-logo')}</div><p class="app-home-logo-name">Enigma Authenticator</p></div></div>`;
  const detail = (l, v, mono) => `<div><div class="app-session-detail-label">${l}</div><div class="app-session-detail-value ${mono ? 'app-session-detail-value--mono' : ''}">${v}</div></div>`;
  const row = (c, loc, meta, id) => `<div class="app-session" id="${id}"><div class="app-session-flag">${c}</div><div class="app-session-body"><div class="app-session-loc">${loc}</div><div class="app-session-meta">${meta}</div></div><button class="app-signout">Sign out</button></div>`;
  const home = `<div class="app-screen app-screen--home ${o.screen === 'pw' ? 'is-before' : ''}" id="s-home">${logoBanner}
    <div class="app-home-header"><div class="app-home-header-left"><h1 class="app-home-title">Your devices</h1></div></div>
    <div class="app-home-scroll"><div>
      ${o.london ? `<p class="app-list-label app-list-label--active" id="label-active">Active now</p>
      <div class="app-session app-session--current" id="sess-london"><div class="app-session-head"><div class="app-session-dot"></div><div class="app-session-head-body"><span class="app-session-loc">London, UK</span><div class="app-session-meta" style="margin-top:2px;"><span>just now</span></div></div></div>
        <div class="app-session-detail">${detail('Browser', 'Chrome 126')}${detail('Device', 'MacBook Pro')}${detail('OS', 'macOS 14')}${detail('IP Address', '82.43.201.15', 1)}</div></div>` : ''}
      <p class="app-list-label app-list-label--spaced">Recent sign-ins</p>
      ${row('US', 'New York, US', 'Firefox · Windows · 2h ago', 'sess-ny')}${row('SG', 'Singapore', 'Safari · iPhone · 5h ago', 'sess-sg')}${row('NL', 'Amsterdam, NL', 'Chrome · Windows · 1d ago', 'sess-am')}
      <p class="app-sessions-empty ${o.empty ? 'is-show' : ''}">No other active sessions.</p>
    </div></div></div>`;
  const pw = `<div class="app-screen app-screen--pw ${o.screen === 'pw' ? 'is-current' : ''}" id="s-pwfallback">
    <div class="app-fb-top"><button class="app-fb-back ${o.backCls || ''}">${ICON('back-arrow')} Back to Face ID</button>
      <p class="app-eyebrow">Identity Verification</p><h2 class="app-screen-title">Sign in with password</h2>
      <p class="app-screen-sub">Face ID wasn't available. Enter your credentials to continue.</p></div>
    <div class="app-fb-form">
      <div class="app-input-group" id="g1"><label class="app-input-label" for="fb-email">Email Address</label><div class="app-input-wrap"><input type="email" class="app-input ${o.inCls || ''}" id="fb-email" placeholder="you@enigma.io"></div></div>
      <div class="app-input-group" id="g2"><label class="app-input-label" for="fb-pw">Password</label><div class="app-input-wrap"><input type="password" class="app-input" id="fb-pw" placeholder="Enter your password"><button class="app-input-toggle" type="button" aria-label="Toggle password visibility">${ICON('eye')}</button></div></div>
      <div class="app-fb-submit"><button class="app-btn app-btn--primary ${o.btnCls || ''}" id="fb-btn">Confirm Identity</button></div>
    </div></div>`;
  return `<div class="app-shell">
    <div class="app-launch ${o.launch ? '' : 'is-hidden'}" id="s-launch">${ICON('logo', 'app-launch-logo')}<p class="app-launch-name">Enigma Authenticator</p></div>
    <div class="app-status-bar ${o.screen === 'pw' ? '' : 'is-chrome'}"><span class="app-status-time">9:41</span><div class="app-status-icons">${ICON('wifi')}${ICON('battery')}</div></div>
    <div class="app-push ${o.push ? 'is-show' : ''}" id="push"><div class="app-push-inner"><div class="app-push-top"><span class="app-push-appname">Enigma Authenticator</span><span class="app-push-time">now</span></div>
      <div class="app-push-content"><div class="app-push-icon">${ICON('logo', 'app-push-logo')}</div><div class="app-push-body"><div class="app-push-title">Sign-in requested</div><div class="app-push-sub">London · Chrome · 82.43.201.15</div></div></div></div></div>
    <div class="app-faceid ${o.faceid ? '' : 'is-hidden'}" id="s-faceid"><div class="app-faceid-blur"></div><div class="app-faceid-wrap">
      <div class="app-faceid-card"><div class="app-faceid-anim"><div class="app-faceid-placeholder">Face ID animation<br>(external dotLottie, not included)</div></div></div>
      <p class="app-faceid-label">Enigma Authenticator locked</p>
      <div class="app-faceid-bottom"><button class="app-faceid-fallback ${o.fbCls || ''}">Use Passcode</button></div></div></div>
    <div class="app-screens">${home}${pw}</div>
    <div class="app-confirm ${o.confirm ? 'is-show' : ''}" id="confirm"><div class="app-confirm-dialog"><p class="app-confirm-title">Sign out New York session?</p><p class="app-confirm-body">This will immediately end the New York session and require re-authentication on that device.</p>
      <div class="app-confirm-actions"><button class="app-confirm-btn app-confirm-btn--cancel">Cancel</button><button class="app-confirm-btn app-confirm-btn--danger">Sign out</button></div></div></div>
    <div class="app-sheet-overlay ${o.sheet ? 'is-show' : ''}"></div>
    <div class="app-sheet ${o.sheet ? 'is-open' : ''}" id="sheet"><div class="app-sheet-handle"></div>
      <div class="app-sheet-map"><img src="assets/app-map-london.svg" alt=""><div class="app-map-pill"><div class="app-map-dot"></div>London, United Kingdom</div></div>
      <div class="app-sheet-body"><p class="app-sheet-title">Sign-in details</p>
        <div class="app-sheet-grid">${['Browser|Chrome 126', 'OS|macOS 14', 'IP Address|82.43.201.15', 'Time|9:41 AM'].map(x => { const [l, v] = x.split('|'); return `<div class="app-sheet-item"><span class="app-sheet-item-label">${l}</span><span class="app-sheet-item-value">${v}</span></div>`; }).join('')}</div>
        ${o.confirmed ? `<div class="app-confirmed" id="confirmed"><div class="app-confirmed-icon">${ICON('check-confirmed', 'app-confirmed-check')}</div><h3 class="app-confirmed-title">Sign-in confirmed</h3><p class="app-confirmed-text">You're now signed in on Chrome · London</p></div>` :
        `<div class="app-code-card" id="codecard"><div class="app-code-header"><span class="app-code-label">One-time code</span><span class="app-code-expiry ${o.urgent ? 'is-urgent' : ''}" id="expiry">${o.urgent ? '0:25' : '3:00'}</span></div>
          <div class="app-code-otp" id="otp">482 716</div>
          <button class="app-copy-btn ${o.copied ? 'is-copied' : ''}" id="copy" ${o.copied ? 'disabled' : ''}>${o.copied ? '✓ Copied!' : ICON('copy') + 'Copy code'}</button></div>
        <button class="app-block-link ${o.blockCls || ''}">This wasn't me — Block sign-in</button>`}
      </div></div>
    <div class="app-toast ${o.toast ? 'is-show' : ''} ${o.toastDanger ? 'app-toast--danger' : ''}" id="toast">${o.toastDanger ? 'Sign-in blocked. Attempt has been logged.' : 'Code copied to clipboard.'}</div>
  </div>`;
}
```

## Stage B addendum (2026-10-14)
Moved here from `auth-design-system/_build-notes.md` (content above unchanged). Stage B wrote `components.md`, `CLAUDE.md`, `showcase.html` (all overwritten) and `VERIFICATION.md`; `tokens.*` and `components.css` were not changed (no proven bug found: 118 prototype-parity probes and 267 spec-number checks pass).
- Showcase nav: Foundations (Colours, Typography, Radii, Spacing (observed), Shadows & effects, Motion, Sizes & layout, Icons & logos), Components (Web sign-in: backdrop & card, logo, inputs, buttons, OTP slots, timer/resend, states; Mobile authenticator: phone frame & status bar, launch, Face ID card, home & session cards, push banner, bottom sheet & OTP code, confirm dialog, toasts, password fallback), Screens (web flow, authenticator flow), Reference (bugs, dead code, open decisions).
- Markup differences vs the stage-A reference markup (visual result identical): spinner is `<span class="web-btn-spinner">` (valid in a button); toggle has `type="button"` + `aria-pressed`; checkbox row carries no `.is-checked` (real input `:checked`); inline `style="margin-top:2px"` on the London meta removed (class already sets it); `role="dialog" aria-modal` / `role="status"` added as recommended (bug A11).
- Showcase-only wrappers (not part of the system): `.sc-card-pad` (card padding 24px 40px), `.sc-phone` (fixed 390x844 shell, crops 120/260/300/460), `.sc-strip` (state strips on a plain shell).
- Hub viewer cannot show auth tokens (it reads `../<hash>/design-system/tokens.json`); no hub file was edited.

# MAKOR (MakorX.AI) Auth - components (copy-paste HTML + behaviour)

Companion of `tokens.css` / `tokens.json` / `components.css` / `showcase.html` / `CLAUDE.md`. Source of truth: the three prototypes (`hub/auth/makor-signin.html` = **S**, `makor-authenticator.html` = **A**, `makor-authenticator-dark.html` = **D**) and `makorx-ai/auth-html-spec/{web-signin,authenticator}.md`. Rule (owner, 2026-10-14): **reproduce what renders, document the bugs.** The HTML below uses the DECIDED intended behaviour (see "Known source bugs" in CLAUDE.md), not the buggy source behaviour.

Class scheme: web = `.mauth-web-*`, mobile authenticator = `.mauth-app-*`, icons = `.mauth-icon` + `.mauth-icon--<asset>`. All tokens `--mauth-*`. Nothing clashes with the main HR app (`makorx-ai/design-system`).

## 0. Setup

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<!-- Geist 400/500/600/700 everywhere; EB Garamond 500 ONLY for the web sign-in (titles, OTP digits, timer). -->
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Geist:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components.css">
```

- **Web** pages wrap everything in `<div class="mauth-web">` (the source's `html, body`: bg `--mauth-web-bg`, Geist, antialiased). Web is **light only**: there is no dark web theme.
- **Mobile** screens live inside `<div class="mauth-app">` (typography reset + root). The root sets `font-size: 16px; line-height: normal` like the source `body` (stage-B fix of an inheritance leak: without it the demo inherited the host page's values).
- **Theme scope (authenticator only):** light values are on `:root`; the dark pairs are overrides under `[data-theme="dark"]`. Put the attribute on ANY ancestor (the phone wrapper or `<html>`):

```html
<div class="mauth-app" data-theme="dark">  <!-- everything inside is dark -->
  <div class="mauth-app-shell"> ... </div>
</div>
```
  There is **no** `body.dark`, `[data-mode]` or media-query switch. Dark-scope structural selectors in components.css: only `[data-theme="dark"] .mauth-app-faceid-card` (radius 28 / padding) and `.mauth-app-sheet-map` (dark map art). Everything else flips through tokens.
- Page wrapper (optional): `<div class="mauth-app mauth-app-page"><div class="mauth-app-shell">...</div></div>` centres the phone in a `100dvh` page on `--mauth-app-page-bg`. Shell = `min(390px,100vw) x min(844px,100dvh)`, radius `min(44px,4vw)`.
- State classes mirror the pseudo-classes so documentation can force them: `.is-hover .is-focus .is-active .is-disabled .is-loading .is-error .is-filled .is-warn .is-expired .is-shown .is-show .is-open .is-hidden .is-checked .is-revealed .is-urgent .is-copied .is-removing .is-before`.

## 1. Icons (recipe)

Monochrome icons are **CSS masks** coloured by `currentColor`: `.mauth-icon` (background-color currentColor + mask) plus one modifier. Never redraw or hand-write paths; add new icons by dropping an SVG in `assets/`, then a modifier rule `.mauth-icon--x { -webkit-mask-image: url(assets/x.svg); mask-image: url(assets/x.svg); }`. The size comes from the component (or an inline `width/height`). Masks need http(s) (CSS `mask` of local SVGs is blocked on `file://`).

```html
<span class="mauth-icon mauth-icon--web-eye"></span>
<span class="mauth-icon mauth-icon--app-copy"></span>
<span class="mauth-icon mauth-icon--app-logo-mark mauth-app-logo-mark"></span>
```

| modifier | file | CSS size | used in |
|---|---|---|---|
| `--web-eye`, `--web-eye-off` | web-icon-eye(.svg), web-icon-eye-off.svg | 18x18 | web password toggle |
| `--web-checkbox-check` | web-icon-checkbox-check.currentColor.svg | 10x10 | checkbox tick |
| `--web-arrow-left` | web-icon-arrow-left.svg | 15x15 | web back link |
| `--web-clock` | web-icon-clock.svg | 14x14 | web timer |
| `--web-success-check` | web-icon-success-check.svg | 32x32 | success ring |
| `--web-logo-mark` / `--web-watermark` | web-makor-logo-mark / web-makor-watermark .currentColor.svg | 90x72 / 360x288 | card logo / watermark |
| `--app-logo-mark` | app-makor-logo-mark.currentColor.svg | 56x45 launch, 28x22 home, 24x19 banner | launch, home, banner |
| `--app-status-wifi`, `--app-status-battery` | app-status-*.currentColor.svg | 16x16 | status bar |
| `--app-arrow-left` | app-icon-arrow-left.svg | 15x15 | "Back to Face ID" |
| `--app-eye` | app-icon-eye.svg | 18x18 | app password toggle (no eye-off exists in the app: owner decision) |
| `--app-copy` | app-icon-copy.svg | 18x18 | copy button |
| `--app-confirmed-check` | app-icon-confirmed-check.currentColor.svg | 28x28 | confirmed state |

Coloured assets (logo, maps) stay `<img>`: `assets/web-makor-logo-mark.svg`, `assets/app-map-light.svg`, `assets/app-map-dark.svg`. The **app icon tile** is CSS (`.mauth-app-logo-gradient`: three radial gradients over `#005268`) with a white `.mauth-app-logo-mark` inside.

---

# PART 1 - WEB SIGN-IN (light only)

## 2. Backdrop, canvas, watermark, footer, card
Source: S L47-51, L54-60, L63-73, L76-92, L443-490. z-index: canvas 0, watermark 0, page 1, footer 2. The card is max 460 wide (inner 364), r16, padding `0 48px 48px` (`0 32px 40px` at viewport <= 560px, the ONLY media query), `--success` = padding 40.

```html
<div class="mauth-web">
  <canvas class="mauth-web-canvas" id="constellation"></canvas>
  <!-- constellation.js, preset "web" -->
  <div class="mauth-web-watermark"></div>
  <div class="mauth-web-footer">
    <span class="mauth-web-footer-text">Trading Intelligence · SOC 2 · ISO 27001</span>
    <span class="mauth-web-footer-text">Secure Portal · V.1.0</span>
  </div>
  <div class="mauth-web-page">
    <div class="mauth-web-card">
      <div class="mauth-web-card-logo">
        <span class="mauth-web-logo" role="img" aria-label="Makor"></span>
      </div>
      <!-- views: only .is-active is displayed -->
    </div>
  </div>
</div>
```

Known source bug kept as rendered (owner decides): the footer is `position:fixed; z-index:2` and overlaps the card when the viewport is shorter than ~700px; at 375px wide it wraps to two lines.

## 3. Logo
Mask (recolourable, 90x72, `--mauth-web-primary`) or the original asset. Mark only: no wordmark text exists.

```html
<div class="mauth-web-card-logo">
  <span class="mauth-web-logo" role="img" aria-label="Makor"></span>
</div>
<img src="assets/web-makor-logo-mark.svg" width="90" height="72" alt="Makor">
```

## 4. Login view (inputs, toggle, checkbox, link button, primary button, terms)
Source: S L343-385. Copy verbatim: "Welcome back" / "Continue to your Makor X.AI workspace." / placeholders "Username", "Password" / errors "Please enter your username." and (server rejection) "Incorrect credentials. Please try again." / "Remember me" / "Forgot password?" / "Sign in" / "By continuing you accept our Terms and Privacy.".

```html
<div class="mauth-web-view is-active">
  <h1 class="mauth-web-title">Welcome back</h1>
  <p class="mauth-web-sub">Continue to your Makor X.AI workspace.</p>
  <div class="mauth-web-field">
    <div class="mauth-web-field-wrap">
      <input class="mauth-web-input mauth-web-input--no-toggle" type="text" placeholder="Username" aria-label="Username" name="username" autocomplete="username" autocapitalize="off" spellcheck="false">
    </div>
  </div>
  <div class="mauth-web-field mauth-web-field--compact">
    <div class="mauth-web-field-wrap">
      <input class="mauth-web-input" type="password" placeholder="Password" aria-label="Password" name="password" autocomplete="current-password">
      <button type="button" class="mauth-web-toggle" aria-label="Show password" aria-pressed="false">
        <span class="mauth-icon mauth-icon--web-eye"></span>
        <span class="mauth-icon mauth-icon--web-eye-off"></span>
      </button>
    </div>
  </div>
  <div class="mauth-web-row">
    <label class="mauth-web-checkbox">
      <input class="mauth-web-checkbox-input" type="checkbox" checked>
      <span class="mauth-web-checkbox-box"></span>
      <span class="mauth-web-checkbox-label">Remember me</span>
    </label>
    <button class="mauth-web-link-btn" type="button">Forgot password?</button>
  </div>
  <button class="mauth-web-btn mauth-web-btn--primary" type="button">
    <span class="mauth-web-btn-label">Sign in</span>
    <span class="mauth-web-spinner"></span>
  </button>
  <p class="mauth-web-terms">By continuing you accept our
    <a href="#">Terms</a> and
    <a href="#">Privacy</a>.
  </p>
</div>
```

Decided vs the source:
- The checkbox is a **real focusable `<input type="checkbox">`** (visually hidden) + `.mauth-web-checkbox-box` (the source is a fake label+div); initial state **checked**.
- Inputs get `aria-label` (the source has none; placeholder is the label); the username input is `name="username"` (the source id is `email`).
- The toggle is a button with `aria-pressed`; JS toggles `input.type` and `.is-revealed` (two icons, eye / eye-off).
- The spinner is a `<span>` (the source puts a `<div>` in a `<button>`).
- "Forgot password?" has no destination in the source (rendered as designed).

Input states: rest (white field, 1.5px transparent border), `:hover`/`.is-hover` (EXTENDED), `:focus`/`.is-focus` (primary border + 3px ghost ring), `.is-error` or `[aria-invalid="true"]` with `.mauth-web-field-error.is-shown` below (danger border + 3px danger ring; **error wins over focus**), `:disabled`/`.is-disabled` (EXTENDED, opacity .4). Heights: input 48, button 50, toggle 44x44.

Buttons: `.mauth-web-btn--primary` rest, `:hover`/`.is-hover` (`--mauth-web-primary-hover`), `:active`/`.is-active` (scale .99), `:disabled`/`.is-disabled` (`--mauth-web-disabled`, white .65), `.is-loading` (label hidden, 18px spinner; **looks disabled** because the source disables the button while loading), `:focus-visible`/`.is-focus` (2px outline, offset 2px; **radius stays 8px**, the source's 4px is a bug). `.mauth-web-link-btn`: rest, hover (opacity .7), disabled (opacity .4, no pointer events), focus, `--strong` (700). Back link: `.mauth-web-back` (hover = text colour).

```html
<!-- loading -->
<button class="mauth-web-btn mauth-web-btn--primary is-loading" type="button" disabled><span class="mauth-web-btn-label">Sign in</span><span class="mauth-web-spinner"></span></button>
```

## 5. OTP view (back link, eyebrow, title, slots, error, timer, resend)
Source: S L387-426, L235-286. Six separate inputs, **54 x 68** at 364 inner, gap 8, r12, EB Garamond 30/500. Copy: "Back" / "Step 2 of 2" / "Verify it's you" / "We sent a 6-digit code to your device. Enter it below to continue." / "Code expires in 3:00" / "Resend notification" / "Verify and continue" / "Didn't get a code? Resend" / error "Incorrect code — please try again.".

```html
<div class="mauth-web-view is-active">
  <button class="mauth-web-back" type="button">
    <span class="mauth-icon mauth-icon--web-arrow-left"></span>Back
  </button>
  <p class="mauth-web-eyebrow mauth-web-eyebrow--accent">Step 2 of 2</p>
  <h2 class="mauth-web-title mauth-web-title--compact">Verify it's you</h2>
  <p class="mauth-web-sub">We sent a 6-digit code to your device. Enter it below to continue.</p>
  <div class="mauth-web-otp" role="group" aria-label="6-digit verification code" data-live="otp">
    <input class="mauth-web-otp-slot" maxlength="1" type="text" inputmode="numeric" pattern="[0-9]*" autocomplete="one-time-code" aria-label="Digit 1">
    <input class="mauth-web-otp-slot" maxlength="1" type="text" inputmode="numeric" pattern="[0-9]*" aria-label="Digit 2">
    <input class="mauth-web-otp-slot" maxlength="1" type="text" inputmode="numeric" pattern="[0-9]*" aria-label="Digit 3">
    <input class="mauth-web-otp-slot" maxlength="1" type="text" inputmode="numeric" pattern="[0-9]*" aria-label="Digit 4">
    <input class="mauth-web-otp-slot" maxlength="1" type="text" inputmode="numeric" pattern="[0-9]*" aria-label="Digit 5">
    <input class="mauth-web-otp-slot" maxlength="1" type="text" inputmode="numeric" pattern="[0-9]*" aria-label="Digit 6">
  </div>
  <p class="mauth-web-otp-error" role="alert"></p>
  <div class="mauth-web-timer-row">
    <div class="mauth-web-timer-label">
      <span class="mauth-icon mauth-icon--web-clock"></span>Code expires in&nbsp;
      <span class="mauth-web-timer-value">3:00</span>
    </div>
    <button class="mauth-web-link-btn" type="button">Resend notification</button>
  </div>
  <button class="mauth-web-btn mauth-web-btn--primary" type="button" disabled>
    <span class="mauth-web-btn-label">Verify and continue</span>
    <span class="mauth-web-spinner"></span>
  </button>
  <p class="mauth-web-resend-note">Didn't get a code?
    <button class="mauth-web-link-btn mauth-web-link-btn--strong" type="button">Resend</button>
  </p>
</div>
```

Slot states: rest; `:focus`/`.is-focus` (primary border, 3px ghost ring, `scale(1.03)`); `.is-filled` (primary border, stays after blur); `.is-error` (danger border + `--mauth-web-danger-tint` fill + shake .35s). **Disabled / expired has no style in the source** (identical to rest). The error message `.mauth-web-otp-error` is hidden until `.is-shown` (`role="alert"`).

Timer (decided): counts **180 s** as `m:ss`; `.is-warn` at <= 30 s; at 0 the label text becomes **"Code expired"** and the value stays "0:00" with `.is-expired` (the source printed "Code expires in Expired" with warn left on - bug, not reproduced); slots and Verify are disabled together.

```html
<div class="mauth-web-timer-row">
  <div class="mauth-web-timer-label">
    <span class="mauth-icon mauth-icon--web-clock"></span>Code expired&nbsp;
    <span class="mauth-web-timer-value is-expired">0:00</span>
  </div>
  <button class="mauth-web-link-btn" type="button">Resend notification</button>
</div>
```

Resend cooldown **30 s**: both resend buttons become disabled and read "Resend in {n}s".

## 6. Success view
Source: S L428-437, L289-307. The card gets `.mauth-web-card--success` (padding 40) and the logo header is omitted. Ring 68 (`--mauth-web-primary-ghost`, pop-in .45s spring), tick 32, title EB Garamond 30/500 small-caps (line-height normal), copy "Identity verified" / "You've successfully signed in." / "Redirecting to your dashboard in 5s…".

```html
<div class="mauth-web-card mauth-web-card--success">
  <div class="mauth-web-view is-active">
    <div class="mauth-web-success">
      <div class="mauth-web-success-ring" data-anim="pop">
        <span class="mauth-icon mauth-icon--web-success-check"></span>
      </div>
      <h2 class="mauth-web-success-title">Identity verified</h2>
      <p class="mauth-web-success-sub">You've successfully signed in.
        <br>Redirecting to your dashboard in
        <span>5</span>s…
      </p>
    </div>
  </div>
</div>
```

## 7. Web behaviour (reference JS - the DECIDED intended behaviour)

```js
const DEMO_CODE = '482716';                    // demo only: the prototype has no backend
const REDIRECT = window.MAUTH_REDIRECT || '/'; // source target "makor-dashboard.html" returns 404: make it configurable
const bc = new BroadcastChannel('makor_auth'); // decided name (source: legacy 'enigma_auth')

function goToView(id) {                        // instant switch, no transition
  document.querySelectorAll('.mauth-web-view').forEach(v => v.classList.toggle('is-active', v.id === id));
  const ok = id === 'view-success';
  document.querySelector('.mauth-web-card-logo').hidden = ok;
  document.querySelector('.mauth-web-card').classList.toggle('mauth-web-card--success', ok);
}

let busy = false;
async function handleLogin() {                 // 1300 ms "loading" then the OTP step
  if (busy) return;                             // re-entry guard (source has none)
  const u = username.value.trim(), p = password.value;
  clearFieldErrors();
  if (!u) return showFieldError(username, 'Please enter your username.');
  if (!p) return showFieldError(password, 'Please enter your password.');   // distinct copy for "empty" (owner decision pending)
  busy = true; btnLogin.classList.add('is-loading'); btnLogin.disabled = true;
  await new Promise(r => setTimeout(r, 1300));
  busy = false; btnLogin.classList.remove('is-loading'); btnLogin.disabled = false;
  goToView('view-otp'); bc.postMessage({ type: 'sign_in_request' });
  resetResend(); slots[0].focus(); startTimer(); setupOtp();
}
// errors clear on input (source: never cleared)
[username, password].forEach(i => i.addEventListener('input', () => clearFieldError(i)));

// ---- OTP slots
slots.forEach((s, i) => {
  s.addEventListener('input', () => {
    s.value = s.value.replace(/\D/g, '').slice(-1);        // digits only, keep the last
    s.classList.toggle('is-filled', !!s.value); s.classList.remove('is-error'); hideOtpError();
    if (s.value && i < 5) slots[i + 1].focus();            // NO auto-submit on the 6th digit
    verifyBtn.disabled = code().length < 6;
  });
  s.addEventListener('keydown', e => {
    if (e.key === 'Backspace' && !s.value && i > 0) { slots[i-1].value = ''; slots[i-1].classList.remove('is-filled'); slots[i-1].focus(); }
    if (e.key === 'ArrowLeft' && i > 0) slots[i-1].focus();
    if (e.key === 'ArrowRight' && i < 5) slots[i+1].focus();
  });
  s.addEventListener('paste', e => {                        // DECIDED: from the FOCUSED slot (source always starts at slot 1)
    e.preventDefault();
    const d = e.clipboardData.getData('text').replace(/\D/g, '');
    const start = d.length === 6 ? 0 : i;                   // a full 6-digit code fills all slots
    for (let k = 0; k < d.length && start + k < 6; k++) { slots[start+k].value = d[k]; slots[start+k].classList.add('is-filled'); }
    slots[Math.min(start + d.length, 5)].focus(); hideOtpError(); verifyBtn.disabled = code().length < 6;
  });
});

async function handleVerify() {                 // 1100 ms, then ok / error
  if (busy || code().length < 6) return; busy = true;
  verifyBtn.classList.add('is-loading'); verifyBtn.disabled = true;
  await new Promise(r => setTimeout(r, 1100));
  busy = false; verifyBtn.classList.remove('is-loading');
  if (code() !== DEMO_CODE) {                    // wrong code
    slots.forEach(s => s.classList.add('is-error')); showOtpError('Incorrect code — please try again.');
    setTimeout(() => { slots.forEach(s => { s.value = ''; s.classList.remove('is-filled', 'is-error'); }); slots[0].focus(); verifyBtn.disabled = true; }, 600);
    return;
  }
  clearInterval(timerId); bc.postMessage({ type: 'code_used' }); goToView('view-success');
  let n = 5; const t = setInterval(() => { redirectCount.textContent = --n; if (n <= 0) { clearInterval(t); location.href = REDIRECT; } }, 1000);
}

function startTimer() {                          // 180 s
  let left = 180; const el = document.querySelector('.mauth-web-timer-value'), label = document.querySelector('.mauth-web-timer-label-text');
  el.classList.remove('is-warn', 'is-expired'); label.textContent = 'Code expires in';
  clearInterval(timerId);
  timerId = setInterval(() => {
    left--; el.textContent = Math.floor(left/60) + ':' + String(left%60).padStart(2, '0');
    el.classList.toggle('is-warn', left <= 30 && left > 0);
    if (left <= 0) { clearInterval(timerId); label.textContent = 'Code expired'; el.classList.add('is-expired');
      slots.forEach(s => s.disabled = true); verifyBtn.disabled = true; }   // slots + Verify together
  }, 1000);
}
function resendCooldown() {                      // 30 s: "Resend in {n}s"
  let s = 30; resendBtns.forEach(b => b.disabled = true);
  const t = setInterval(() => { s--; resendBtns.forEach(b => b.textContent = s > 0 ? 'Resend in ' + s + 's' : b.dataset.label);
    if (s <= 0) { clearInterval(t); resendBtns.forEach(b => b.disabled = false); } }, 1000);
}
// Enter submits ONLY the active view and is ignored while loading
document.addEventListener('keydown', e => { if (e.key !== 'Enter' || busy) return;
  if (viewLogin.classList.contains('is-active')) handleLogin(); else if (viewOtp.classList.contains('is-active') && code().length === 6) handleVerify(); });
```
(the timer label needs a text span: `<span class="mauth-web-timer-label-text">Code expires in</span>` instead of a bare text node.)

---

# PART 2 - MOBILE AUTHENTICATOR (light + dark)

Structure of one phone (z-index inside the shell: launch 40, Face ID 50, sheet scrim 100, sheet 101, confirm 200, banner 300, toast 999):

```html
<div class="mauth-app" data-theme="dark"> <!-- omit data-theme for light -->
  <div class="mauth-app-shell">
    <div class="mauth-app-launch">...</div>          <!-- covers the status bar -->
    <div class="mauth-app-status-bar">...</div>
    <div class="mauth-app-banner">...</div>
    <div class="mauth-app-faceid">...</div>
    <div class="mauth-app-screens"> <div class="mauth-app-screen mauth-app-screen--home is-active">...</div> <div class="mauth-app-screen mauth-app-screen--pw">...</div> </div>
    <div class="mauth-app-confirm">...</div>
    <div class="mauth-app-sheet-overlay"></div><div class="mauth-app-sheet">...</div>
    <div class="mauth-app-toast"></div>
  </div>
</div>
```

## 8. Phone frame &amp; status bar
Source: A L46-66, L334-338. Status bar 44px: live clock `h:mm` (refresh every 10 s) + wifi + battery. `--home` is on while the home screen is active (bg `#0D8090`, white .9, no transition). Screens slide: active = `.is-active`, earlier = `.is-before`, later = default (translateX(100%)); .38s `cubic-bezier(.4,0,.2,1)` + opacity .3s.

```html
<div class="mauth-app-status-bar mauth-app-status-bar--home">
  <span class="mauth-app-status-time">9:41</span>
  <div class="mauth-app-status-icons">
    <span class="mauth-icon mauth-icon--app-status-wifi"></span>
    <span class="mauth-icon mauth-icon--app-status-battery"></span>
  </div>
</div>
```

## 9. Launch screen
Source: A L181-205 (+ D L185-215). Light bg `--mauth-app-launch-bg` (#C8D8DF); dark = two teal radial gradients on #071018. `.is-hidden` fades it out (.3s). Name weight light 500 / dark 400 (token `--mauth-app-launch-name-weight`). The canvas is drawn by `constellation.js` (`app-light` / `app-dark`).

```html
<div class="mauth-app-launch">
  <canvas class="mauth-app-launch-canvas" data-constellation="app-light"></canvas>
  <div class="mauth-app-launch-icon mauth-app-logo-gradient">
    <span class="mauth-icon mauth-icon--app-logo-mark mauth-app-logo-mark"></span>
  </div>
  <p class="mauth-app-launch-name">Makor-X.AI
    <br>Authenticator
  </p>
</div>
```

## 10. Face ID (documented dependency)
Source: A L206-290, L264-268 (+ D L220-320). **The animation is a remote dotLottie that is documented, not copied.** In production replace the placeholder by the real player (see section 17); in design docs keep the labelled placeholder - never draw an imitation.

```html
<div class="mauth-app-faceid">
  <div class="mauth-app-faceid-blur"></div>
  <div class="mauth-app-faceid-wrap">
    <div class="mauth-app-faceid-card">
      <div class="mauth-app-faceid-frame">
        <div class="mauth-app-faceid-lottie mauth-app-faceid-lottie--placeholder">dotLottie placeholder
          <br>remote animation, documented only
        </div>
      </div>
    </div>
    <p class="mauth-app-faceid-label">Locked</p>
    <div class="mauth-app-faceid-bottom">
      <button class="mauth-app-btn-secondary" type="button">Use Passcode</button>
    </div>
  </div>
</div>
```

Real markup (production):

```html
<script type="module" src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"></script> <!-- UNPINNED @latest in the source -->
<div class="mauth-app-faceid-card"><div class="mauth-app-faceid-frame">
  <dotlottie-player class="mauth-app-faceid-lottie" src="https://lottie.host/2c89c12e-4c0d-41a6-ae13-30b2ce7a964a/kjwDIWFPeM.lottie" loop></dotlottie-player>
</div></div>
```

Dark: the card becomes a glass card (r28, padding 24 24 20, `rgba(18,28,38,.70)`, blur 12, border 1px `rgba(255,255,255,.08)`) and `.mauth-app-faceid-frame::after` tints the grey Lottie (`rgba(10,35,55,.72)`, `mix-blend-mode: color`, z 2) - already in components.css via the tokens. Veil: light `rgba(235,235,235,.12)` + blur 6; dark `rgba(7,12,18,.42)` + blur 8. Secondary button "Use Passcode": `.mauth-app-btn-secondary` (hover/active = darker fill).

## 11. Home, sessions, section labels
Source: A L293-352, L394-420, L728-757 (+ D L346-354). Gradient header, glass logo icon 44x44 r10, content card (r 20 20 0 0), session rows (342 x 64: flag tile 36 r4, sign-out chip 36 tall). "Active now" card is a column card (1.5px border, pulsing 8px dot, 2-col spec grid) revealed 500 ms after a sign-in is confirmed.

```html
<div class="mauth-app-screen mauth-app-screen--home is-active">
  <div class="mauth-app-home-banner">
    <div class="mauth-app-home-banner-left">
      <div class="mauth-app-home-icon">
        <span class="mauth-icon mauth-icon--app-logo-mark mauth-app-logo-mark"></span>
      </div>
      <p class="mauth-app-home-name">Makor-X.AI Authenticator</p>
    </div>
  </div>
  <div class="mauth-app-home-card">
    <div class="mauth-app-home-header">
      <div class="mauth-app-home-header-left">
        <h1 class="mauth-app-home-title">Your devices</h1>
      </div>
    </div>
    <div class="mauth-app-home-scroll">
      <p class="mauth-app-section-label mauth-app-section-label--active">Active now</p>
      <div class="mauth-app-session mauth-app-session--active">
        <div class="mauth-app-session-head">
          <div class="mauth-app-dot"></div>
          <div class="mauth-app-session-main">
            <span class="mauth-app-session-loc">London, UK</span>
            <div class="mauth-app-session-meta">just now</div>
          </div>
        </div>
        <div class="mauth-app-session-specs">
          <div>
            <div class="mauth-app-session-spec-label">Browser</div>
            <div class="mauth-app-session-spec-value">Chrome 126</div>
          </div>
          <div>
            <div class="mauth-app-session-spec-label">Device</div>
            <div class="mauth-app-session-spec-value">MacBook Pro</div>
          </div>
          <div>
            <div class="mauth-app-session-spec-label">OS</div>
            <div class="mauth-app-session-spec-value">macOS 14</div>
          </div>
          <div>
            <div class="mauth-app-session-spec-label">IP Address</div>
            <div class="mauth-app-session-spec-value mauth-app-session-spec-value--mono">82.43.201.15</div>
          </div>
        </div>
      </div>
      <p class="mauth-app-section-label mauth-app-section-label--spaced">Recent sign-ins</p>
      <div class="mauth-app-session">
        <div class="mauth-app-session-flag">US</div>
        <div class="mauth-app-session-body">
          <div class="mauth-app-session-loc">New York, US</div>
          <div class="mauth-app-session-meta">Firefox · Windows · 2h ago</div>
        </div>
        <button class="mauth-app-session-signout" type="button">Sign out</button>
      </div>
      <div class="mauth-app-session">
        <div class="mauth-app-session-flag">SG</div>
        <div class="mauth-app-session-body">
          <div class="mauth-app-session-loc">Singapore</div>
          <div class="mauth-app-session-meta">Safari · iPhone · 5h ago</div>
        </div>
        <button class="mauth-app-session-signout" type="button">Sign out</button>
      </div>
      <div class="mauth-app-session">
        <div class="mauth-app-session-flag">NL</div>
        <div class="mauth-app-session-body">
          <div class="mauth-app-session-loc">Amsterdam, NL</div>
          <div class="mauth-app-session-meta">Chrome · Windows · 1d ago</div>
        </div>
        <button class="mauth-app-session-signout" type="button">Sign out</button>
      </div>
    </div>
  </div>
</div>
```

## 12. Push banner
Source: A L87-122. Slides in .42s, z 300, auto-hides after **9000 ms**. Decided: focusable `tabindex="0" role="button"`.

```html
<div class="mauth-app-banner is-show" tabindex="0" role="button" aria-label="Sign-in requested. Open details">
  <div class="mauth-app-banner-inner">
    <div class="mauth-app-banner-top">
      <span class="mauth-app-banner-appname">Makor-X.AI</span>
      <span class="mauth-app-banner-time">now</span>
    </div>
    <div class="mauth-app-banner-content">
      <div class="mauth-app-banner-icon mauth-app-logo-gradient">
        <span class="mauth-icon mauth-icon--app-logo-mark mauth-app-logo-mark"></span>
      </div>
      <div class="mauth-app-banner-body">
        <div class="mauth-app-banner-title">Sign-in requested</div>
        <div class="mauth-app-banner-sub">London · Chrome · 82.43.201.15</div>
      </div>
    </div>
  </div>
</div>
```

## 13. Bottom sheet &amp; OTP code
Source: A L513-619, L626-633. The code is a **static "482 716"** (44/500, letter-spacing .22em; no ring, no progress, no 30 s refresh); expiry counts 180 s, `.is-urgent` at <= 30 s; copy writes `482716`. The map is the `.mauth-app-sheet-map` background (no SVG markup; `app-map-light.svg` / `app-map-dark.svg` swap with the theme).

```html
<div class="mauth-app-sheet-overlay is-show"></div>
<div class="mauth-app-sheet is-open" role="dialog" aria-modal="true" aria-label="Sign-in request">
  <div class="mauth-app-sheet-handle"></div>
  <div class="mauth-app-sheet-map">
    <div class="mauth-app-map-pill">
      <div class="mauth-app-map-pill-dot"></div>London, United Kingdom
    </div>
  </div>
  <div class="mauth-app-sheet-body">
    <p class="mauth-app-sheet-title">Sign-in details</p>
    <div class="mauth-app-info-grid">
      <div class="mauth-app-info-item">
        <span class="mauth-app-info-label">Browser</span>
        <span class="mauth-app-info-value">Chrome 126</span>
      </div>
      <div class="mauth-app-info-item">
        <span class="mauth-app-info-label">OS</span>
        <span class="mauth-app-info-value">macOS 14</span>
      </div>
      <div class="mauth-app-info-item">
        <span class="mauth-app-info-label">IP Address</span>
        <span class="mauth-app-info-value">82.43.201.15</span>
      </div>
      <div class="mauth-app-info-item">
        <span class="mauth-app-info-label">Time</span>
        <span class="mauth-app-info-value">9:41 AM</span>
      </div>
    </div>
    <div class="mauth-app-code-card">
      <div class="mauth-app-code-header">
        <span class="mauth-app-code-label">One-time code</span>
        <span class="mauth-app-code-expiry">3:00</span>
      </div>
      <div class="mauth-app-otp">482 716</div>
      <button class="mauth-app-btn-copy" type="button">
        <span class="mauth-icon mauth-icon--app-copy"></span> Copy code
      </button>
    </div>
    <button class="mauth-app-block-link" type="button">This wasn't me — Block sign-in</button>
  </div>
</div>
```

States of the code card: default; urgent (`.is-urgent` on the expiry); copied (`<button class="mauth-app-btn-copy is-copied" disabled>✓ Copied!</button>`, 2000 ms); confirmed (replaces the card):

```html
<div class="mauth-app-confirmed">
  <div class="mauth-app-confirmed-icon">
    <span class="mauth-icon mauth-icon--app-confirmed-check"></span>
  </div>
  <h3 class="mauth-app-confirmed-title">Sign-in confirmed</h3>
  <p class="mauth-app-confirmed-text">You're now signed in on Chrome · London</p>
</div>
```

## 14. Confirm dialog
Source: A L471-511. Copy: "Sign out {location} session?" / "This will immediately end the {location} session and require re-authentication on that device." Buttons 136 x 46 (min 44). Decided: Esc and scrim tap = Cancel.

```html
<div class="mauth-app-confirm is-show">
  <div class="mauth-app-confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title">
    <p class="mauth-app-confirm-title" id="confirm-title">Sign out New York session?</p>
    <p class="mauth-app-confirm-body">This will immediately end the New York session and require re-authentication on that device.</p>
    <div class="mauth-app-confirm-actions">
      <button class="mauth-app-confirm-btn mauth-app-confirm-btn--cancel" type="button">Cancel</button>
      <button class="mauth-app-confirm-btn mauth-app-confirm-btn--danger" type="button">Sign out</button>
    </div>
  </div>
</div>
```

## 15. Toast
Source: A L167-178. Visible **3000 ms** (single timer, a new toast resets it). Copy: "Enter your email and password." / "Code copied to clipboard." / "Code expired. Please request a new sign-in." / "Signed out of {location} session." / "Sign-in blocked. Attempt has been logged." (`--danger`). Add `role="status"`.

```html
<div class="mauth-app-toast is-show" role="status">Code copied to clipboard.</div>
<div class="mauth-app-toast mauth-app-toast--danger is-show" role="status">Sign-in blocked. Attempt has been logged.</div>
```

## 16. Password fallback
Source: A L423-468. Inputs 48 tall (1.5px border, r4, 16px), focus = primary border + 4px ghost ring + surface fill - **ring only** (no second outline). Button 100% x 52, r4, hover `--mauth-app-primary-hover`, active scale .98, loading "Verifying…" (1400 ms). Validation = toast only. No eye-off icon exists (owner decision).

```html
<div class="mauth-app-screen mauth-app-screen--pw is-active">
  <div class="mauth-app-pw-top">
    <button class="mauth-app-pw-back" type="button">
      <span class="mauth-icon mauth-icon--app-arrow-left"></span>Back to Face ID
    </button>
    <p class="mauth-app-eyebrow">Identity Verification</p>
    <h2 class="mauth-app-title">Sign in with password</h2>
    <p class="mauth-app-subtitle">Face ID wasn't available. Enter your credentials to continue.</p>
  </div>
  <div class="mauth-app-pw-form">
    <div class="mauth-app-field">
      <label class="mauth-app-label" for="pwe1">Email Address</label>
      <div class="mauth-app-input-wrap">
        <input class="mauth-app-input" id="pwe1" type="email" placeholder="you@makor-x.ai" autocomplete="email">
      </div>
    </div>
    <div class="mauth-app-field">
      <label class="mauth-app-label" for="pwp2">Password</label>
      <div class="mauth-app-input-wrap">
        <input class="mauth-app-input" id="pwp2" type="password" placeholder="Enter your password" autocomplete="current-password">
        <button class="mauth-app-input-toggle" type="button" aria-label="Toggle password visibility" aria-pressed="false">
          <span class="mauth-icon mauth-icon--app-eye"></span>
        </button>
      </div>
    </div>
    <div class="mauth-app-pw-submit">
      <button class="mauth-app-btn" type="button">Confirm Identity</button>
    </div>
  </div>
</div>
```

## 17. Mobile behaviour (reference JS - the DECIDED intended behaviour)

```js
const bc = new BroadcastChannel('makor_auth');                  // decided (source: 'enigma_auth')
bc.onmessage = ({ data }) => { if (data.type === 'sign_in_request') showPushBanner(); if (data.type === 'code_used') handleCodeUsed(); };

// Launch (1800 ms) -> Face ID (2200 ms scan) -> home
showLaunch(); setTimeout(() => { faceid.classList.remove('is-hidden'); startFaceId(); }, 1800);
function startFaceId() { /* idle -> after 60 ms play() -> at 2200 ms stop(), afterAuthSuccess() */ setTimeout(afterAuthSuccess, 2200); }
function afterAuthSuccess() { faceid.classList.add('is-hidden'); launch.classList.add('is-hidden'); constellation.stop(); goToScreen('s-home'); }

function goToScreen(id) {                                       // slide stack
  const order = ['s-home', 's-pwfallback'], t = order.indexOf(id);
  order.forEach((sid, i) => { const el = document.getElementById(sid);
    el.classList.toggle('is-active', i === t); el.classList.toggle('is-before', i < t); });
  statusBar.classList.toggle('mauth-app-status-bar--home', id === 's-home');
}
const showPushBanner = () => { banner.classList.add('is-show'); clearTimeout(bt); bt = setTimeout(() => banner.classList.remove('is-show'), 9000); };
function toast(msg, danger) { t.textContent = msg; t.className = 'mauth-app-toast is-show' + (danger ? ' mauth-app-toast--danger' : ''); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('is-show'), 3000); }

// Bottom sheet: 180 s countdown, urgent <= 30 s, auto-close at 0 with a toast
function startExpiry() { let s = 180; clearInterval(ex); ex = setInterval(() => { s--; expiry.textContent = Math.floor(s/60) + ':' + String(s%60).padStart(2,'0');
  expiry.classList.toggle('is-urgent', s <= 30); if (s <= 0) { clearInterval(ex); closeSheet(); toast('Code expired. Please request a new sign-in.'); } }, 1000); }
async function copyCode() {
  try { await navigator.clipboard.writeText('482716'); } catch (e) { /* no copy exists for failure: owner decision */ }
  copyBtn.classList.add('is-copied'); copyBtn.disabled = true; copyBtn.textContent = '✓ Copied!'; toast('Code copied to clipboard.');
  setTimeout(() => { copyBtn.classList.remove('is-copied'); copyBtn.disabled = false; copyBtn.innerHTML = '<span class="mauth-icon mauth-icon--app-copy"></span> Copy code'; }, 2000);
}
const openSheet = () => { sheetOverlay.classList.add('is-show'); sheet.classList.add('is-open'); startExpiry(); };
const closeSheet = () => { sheetOverlay.classList.remove('is-show'); sheet.classList.remove('is-open'); setTimeout(resetCodeCard, 450); };
function handleCodeUsed() { /* fade the code card (.2s), after 220 ms show the confirmed block, close after 2800 ms, 500 ms later revealCurrentSession() */ }
// decided additions: Esc / scrim tap close the sheet and cancel the dialog; focus moves into the dialog and returns on close
document.addEventListener('keydown', e => { if (e.key === 'Escape') { if (confirmEl.classList.contains('is-show')) cancelSignOut(); else closeSheet(); } });
sheetOverlay.addEventListener('click', closeSheet);

// Sign out: ask first, then fade (230 ms) and remove the row
function confirmSignOut() { row.classList.add('is-removing'); setTimeout(() => { row.remove(); toast('Signed out of ' + loc + ' session.'); }, 230); }
```

## 18. Extended (not in the prototypes)
Every extension is derived only from existing tokens and is marked `EXTENDED` in `components.css` and with an "Extended" badge in the showcase.

| name | what | derivation |
|---|---|---|
| web input hover | `.mauth-web-input:hover` / `.is-hover` | border = `--mauth-web-border` (the OTP slot rest border) |
| web input disabled | `.mauth-web-input:disabled` / `.is-disabled` | opacity .4 (link-button disabled recipe) + `not-allowed` |
| web input invalid | `[aria-invalid="true"]` | same look as `.is-error` |
| web checkbox | keyboard focus ring + real `<input>` | 2px `--mauth-web-primary` outline, offset 2px (button recipe) |
| web terms links | `:focus-visible` | same outline recipe |
| app input hover / invalid | `.mauth-app-input:hover`, `[aria-invalid]`/`.is-error` | hover border `--mauth-app-text-3`; invalid border `--mauth-app-danger` (no danger-ghost token exists) |
| Face ID placeholder | `.mauth-app-faceid-lottie--placeholder` | flat tile in the documented Lottie card colour (#404042) + text label |
| reduced motion | `@media (prefers-reduced-motion: reduce)` | collapses animation/transition durations; adds no values |
| constellation | `stop()` + reduced-motion static frame | helper behaviour only |
| `[tabindex]:focus-visible` in `.mauth-app` | focus ring for the banner | already in the source (global rule), kept |

## 19. Dependencies (documented, not copied)
- **Face ID dotLottie:** `https://lottie.host/2c89c12e-4c0d-41a6-ae13-30b2ce7a964a/kjwDIWFPeM.lottie` (layer "iOS Face ID - Prompt", 150x148 artboard, 60 fps, 244.66 frames = 4.08 s loop, Lottie v5.7.0, tile #404042, white glyphs, blue scanning ring; JS stops at 2200 ms). Player: `@dotlottie/player-component@latest` from unpkg (unpinned). File byte size not recorded. Offline = no visual. There is no failure/retry state.
- **Google Fonts:** Geist 400/500/600/700 (web + app); EB Garamond `ital,wght@0,400;0,500;0,600;1,400` (web only; only 500 is used, italic never).
- **Constellation canvas:** drawn in JS, not an asset. Use `constellation.js`.
- Masks need http(s) (not `file://`).

## 20. constellation.js
Reproduces the three canvases of the prototypes with their exact parameters.

```html
<canvas class="mauth-web-canvas" id="bg"></canvas>
<script src="constellation.js"></script>
<script>
  const c = MauthConstellation.start(document.getElementById('bg'), 'web');   // 'web' | 'app-light' | 'app-dark'
  // c.stop();  // call when the canvas is hidden (the app stopped it when #s-launch got .hidden; the source never restarted it)
</script>
```

| preset | dots | link distance | speed | radius | ink | dot / link alpha | edges | size source |
|---|---|---|---|---|---|---|---|---|
| `web` | 55 | 155 | (rand-.5)*.22 | rand*1.2+.8 | rgb 0,45,70 | .3 / .1*(1-d/155) | wrap | window (not re-seeded on resize) |
| `app-light` | 45 | 120 | (rand-.5)*.22 | rand*1.2+.8 | rgb 0,45,70 | .28 / .12*(1-d/120) | wrap | canvas offset size (fallback 390x800) |
| `app-dark` | 52 | 90 | (rand-.5)*.28 | rand*1.4+.8 | rgb 23,195,175 | .55 + glow r*2.5 @.08 / (1-d/90)*.22 | bounce | parent rect (fallback 390x844); links drawn before dots |

Line width .7 in all presets. Under `prefers-reduced-motion` one static frame is drawn (EXTENDED). Canvas CSS: `.mauth-web-canvas` (fixed, full viewport, z 0, pointer-events none) and `.mauth-app-launch-canvas` (absolute, inset 0).

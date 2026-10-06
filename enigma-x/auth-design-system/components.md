# Enigma X Auth — Component HTML Reference

Copy-paste HTML for every auth component. Load alongside `CLAUDE.md` in any Claude session.

**Imports required:**
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@500;600&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="tokens.css" />
<link rel="stylesheet" href="components.css" />
```

---

## Web Sign-In Portal

### 1. Top Navigation Bar

```html
<nav class="auth-nav">
  <div class="auth-nav-brand">
    <div class="auth-nav-icon">
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Enigma X logo path: fill="#7AEFEF" -->
      </svg>
    </div>
    <span class="auth-nav-name">Enigma <span>X</span></span>
  </div>
</nav>
```

---

### 2. Sign-In Card (wrapper)

```html
<div class="auth-page">
  <div class="auth-card">
    <!-- Card logo header -->
    <div class="auth-card-logo-header">
      <svg width="72" height="72" viewBox="0 0 40 40" fill="none"><!-- logo --></svg>
    </div>
    <!-- Views go here -->
  </div>
</div>
```

---

### 3. Text Input Field

```html
<div class="auth-field">
  <label class="auth-field-label" for="email">EMAIL ADDRESS</label>
  <div class="auth-field-wrap">
    <input class="auth-field-input" id="email" type="email"
      placeholder="you@enigma.io"
      autocomplete="email" autocapitalize="off" spellcheck="false"
      style="padding-right: 14px;" />
  </div>
  <div class="auth-field-error" id="email-err">Please enter a valid email address.</div>
</div>
```

**States:**
- Default: `background #F5F5F5`, border `#E2E2E2`
- Focus: add class — or style via `:focus` — border `#7AEFEF`, shadow `0 0 0 4px rgba(122,239,239,0.094)`
- Error: add `.error` class to input + `.show` to error message

---

### 4. Password Input with Toggle

```html
<div class="auth-field">
  <label class="auth-field-label" for="password">PASSWORD</label>
  <div class="auth-field-wrap">
    <input class="auth-field-input" id="password" type="password"
      placeholder="Enter your password"
      autocomplete="current-password" style="padding-right:44px;" />
    <button class="auth-field-toggle" id="pw-tog" onclick="togglePw()" aria-label="Show or hide password">
      <svg id="pw-show" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
      </svg>
      <svg id="pw-hide" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="display:none">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
      </svg>
    </button>
  </div>
  <div class="auth-field-error" id="pw-err">Incorrect credentials. Please try again.</div>
</div>

<script>
function togglePw() {
  const i = document.getElementById('password');
  const show = document.getElementById('pw-show'), hide = document.getElementById('pw-hide');
  if (i.type === 'password') { i.type = 'text'; show.style.display='none'; hide.style.display=''; }
  else { i.type = 'password'; show.style.display=''; hide.style.display='none'; }
}
</script>
```

---

### 5. Checkbox (Remember Me)

```html
<label class="auth-checkbox-row checked" onclick="this.classList.toggle('checked')">
  <div class="auth-cb-box">
    <svg viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  </div>
  <span class="auth-cb-label">Keep me signed in</span>
</label>
```

**States:** Add/remove `.checked` class on the label. Checked: teal bg + teal border. Unchecked: white bg + `#9CA3AF` border.

---

### 6. Link Button

```html
<button class="auth-link-btn">Forgot password?</button>
<button class="auth-link-btn">Resend notification</button>
```

**Disabled state:**
```html
<button class="auth-link-btn" disabled>Resend in 30s</button>
```

---

### 7. Primary Button (web)

```html
<button class="auth-btn auth-btn-primary" id="btn-login" onclick="handleLogin()">
  <span class="auth-btn-label">Sign In</span>
  <div class="auth-spinner"></div>
</button>
```

**Loading state:** add `.loading` class to button → label hides, spinner shows.
**Disabled state:** add `disabled` attribute.

```html
<!-- Verify button (disabled until all 6 OTP digits entered) -->
<button class="auth-btn auth-btn-primary" id="btn-verify" disabled>
  <span class="auth-btn-label">Verify &amp; Sign In</span>
  <div class="auth-spinner"></div>
</button>
```

**Dark variant (btn-black):**
```html
<button class="auth-btn auth-btn-black">Go to Dashboard</button>
```

---

### 8. OTP Digit Slots (6-digit, auto-advance)

```html
<div class="auth-otp-slots" id="otp-slots" role="group" aria-label="6-digit verification code">
  <input class="auth-otp-slot" id="s0" maxlength="1" type="text" inputmode="numeric" pattern="[0-9]*" autocomplete="one-time-code" aria-label="Digit 1"/>
  <input class="auth-otp-slot" id="s1" maxlength="1" type="text" inputmode="numeric" pattern="[0-9]*" aria-label="Digit 2"/>
  <input class="auth-otp-slot" id="s2" maxlength="1" type="text" inputmode="numeric" pattern="[0-9]*" aria-label="Digit 3"/>
  <div class="auth-otp-sep" aria-hidden="true">·</div>
  <input class="auth-otp-slot" id="s3" maxlength="1" type="text" inputmode="numeric" pattern="[0-9]*" aria-label="Digit 4"/>
  <input class="auth-otp-slot" id="s4" maxlength="1" type="text" inputmode="numeric" pattern="[0-9]*" aria-label="Digit 5"/>
  <input class="auth-otp-slot" id="s5" maxlength="1" type="text" inputmode="numeric" pattern="[0-9]*" aria-label="Digit 6"/>
</div>
<p class="auth-otp-error-msg" id="otp-err" role="alert"></p>
```

**Slot states:**
- Default: white bg, border `#E2E2E2`
- Focus: `.focus-visible` → scale(1.05), border `#7AEFEF`, shadow `0 0 0 4px rgba(122,239,239,0.094)`
- Filled: add `.filled` → border `#7AEFEF`
- Error: add `.has-error` → border `#EF4444`, bg `#fef2f2`, shake animation

**JS — Auto-advance, backspace, paste, arrow keys:**
```javascript
const SLOTS = ['s0','s1','s2','s3','s4','s5'];
let otpListenersAttached = false;

function setupOTP() {
  SLOTS.forEach(id => {
    const el = document.getElementById(id);
    el.value = '';
    el.classList.remove('filled','has-error');
    el.disabled = false;
    if (!otpListenersAttached) {
      el.addEventListener('input',   onSlotInput);
      el.addEventListener('keydown', onSlotKeydown);
      el.addEventListener('paste',   onSlotPaste);
    }
  });
  otpListenersAttached = true;
  document.getElementById('otp-err').textContent = '';
  document.getElementById('otp-err').classList.remove('show');
}

function onSlotInput(e) {
  const idx = SLOTS.indexOf(e.target.id);
  e.target.value = e.target.value.replace(/\D/g,'').slice(-1);
  e.target.classList.toggle('filled', !!e.target.value);
  e.target.classList.remove('has-error');
  document.getElementById('otp-err').classList.remove('show');
  if (e.target.value && idx < SLOTS.length - 1) document.getElementById(SLOTS[idx+1]).focus();
}

function onSlotKeydown(e) {
  const idx = SLOTS.indexOf(e.target.id);
  if (e.key === 'Backspace' && !e.target.value && idx > 0) {
    document.getElementById(SLOTS[idx-1]).value = '';
    document.getElementById(SLOTS[idx-1]).classList.remove('filled');
    document.getElementById(SLOTS[idx-1]).focus();
  }
  if (e.key === 'ArrowLeft'  && idx > 0) document.getElementById(SLOTS[idx-1]).focus();
  if (e.key === 'ArrowRight' && idx < SLOTS.length-1) document.getElementById(SLOTS[idx+1]).focus();
}

function onSlotPaste(e) {
  e.preventDefault();
  const pasted = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g,'').slice(0,6);
  pasted.split('').forEach((ch, i) => {
    if (SLOTS[i]) { const el = document.getElementById(SLOTS[i]); el.value = ch; el.classList.add('filled'); }
  });
  const focus = Math.min(pasted.length, SLOTS.length-1);
  document.getElementById(SLOTS[focus]).focus();
  document.getElementById('otp-err').classList.remove('show');
}
```

---

### 9. Waiting Badge

```html
<div class="auth-waiting-badge">
  <div class="auth-waiting-dots">
    <span></span><span></span><span></span>
  </div>
  Waiting for approval
</div>
```

---

### 10. Timer Row

```html
<div class="auth-timer-row">
  <div class="auth-timer-label">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
    </svg>
    Code expires in <span id="web-timer" class="auth-timer-value">3:00</span>
  </div>
  <button class="auth-link-btn" id="resend-link">Resend notification</button>
</div>
```

**Warn state:** add `.warn` class to `auth-timer-value` when `≤ 30` seconds remain → color turns `#EF4444`.

---

### 11. Step Indicator / Eyebrow

```html
<div class="auth-step-eyebrow">Two-factor authentication</div>
```

---

### 12. Success Ring

```html
<div class="auth-success-center">
  <div class="auth-success-ring">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  </div>
  <h2 class="auth-success-title">Identity verified</h2>
  <p class="auth-success-sub">You've successfully signed in.<br/>Redirecting to your dashboard in <span id="redirect-countdown">5</span>s…</p>
</div>
```

**Animation:** `auth-pop-in 0.45s cubic-bezier(0.34,1.56,0.64,1)` — auto-applied via CSS class.

---

### 13. Back Button

```html
<button class="auth-back-btn" onclick="goToView('view-login')" aria-label="Back to sign in">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
  Back to sign in
</button>
```

---

### 14. Divider

```html
<div class="auth-divider">
  <div class="auth-divider-line"></div>
  <span class="auth-divider-text">OR</span>
  <div class="auth-divider-line"></div>
</div>
```

---

### 15. Security Badge

```html
<div class="auth-secure-row">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
  <span>Secured by 256-bit TLS</span>
</div>
```

---

## Mobile Authenticator App

### 16. Mobile Shell (wrapper)

```html
<div class="auth-shell">
  <!-- Status bar -->
  <div class="auth-status-bar auth-status-bar--teal" id="status-bar">
    <span class="auth-status-time" id="sb-time">9:41</span>
    <div class="auth-status-icons">
      <svg viewBox="0 0 24 24"><path d="M1.5 8.5C4 5.5 7.8 3.5 12 3.5s8 2 10.5 5l-2 2C18.5 8 15.5 6.5 12 6.5S5.5 8 3.5 10.5l-2-2zm3.5 3.5C6.5 9.5 9 8 12 8s5.5 1.5 7 4l-2 2c-1-1.5-2.8-3-5-3s-4 1.5-5 3l-2-2zm3.5 3.5c1-1 2.2-1.5 3.5-1.5s2.5.5 3.5 1.5l-3.5 4-3.5-4z"/></svg>
      <svg viewBox="0 0 24 24"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
    </div>
  </div>
  <!-- Screens -->
  <div class="auth-screens"><!-- screens here --></div>
  <!-- Overlays -->
</div>
```

---

### 17. Launch Screen

```html
<div id="s-launch" class="auth-launch-screen">
  <svg width="108" height="108" viewBox="0 0 40 40" fill="none"><!-- Enigma X logo --></svg>
  <p class="auth-launch-app-name">Enigma Authenticator</p>
</div>
```

**JS — hide after delay:**
```javascript
function hideLaunchScreen() {
  document.getElementById('s-launch').classList.add('hidden');
}
```

---

### 18. Face ID Overlay

```html
<div id="s-faceid" class="auth-faceid-overlay hidden">
  <div class="auth-faceid-blur-bg"></div>
  <div class="auth-faceid-wrap">
    <div class="auth-faceid-card" id="fid-frame-wrap">
      <div class="auth-fid-wrapper" id="fid-wrapper">
        <!-- Lottie player -->
        <dotlottie-player
          id="fid-lottie"
          src="https://lottie.host/2c89c12e-4c0d-41a6-ae13-30b2ce7a964a/kjwDIWFPeM.lottie"
          loop
          style="display:block;width:180px;height:180px;"
        ></dotlottie-player>
      </div>
    </div>
    <p class="auth-faceid-locked-label">Enigma Authenticator locked</p>
    <div class="faceid-bottom" style="display:flex;flex-direction:column;align-items:center;margin-top:32px;">
      <button class="auth-faceid-fallback-link" onclick="goToPwFallback()">Use Passcode</button>
    </div>
  </div>
</div>
```

**Note:** Requires `<script type="module" src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"></script>`

**Show/hide JS:**
```javascript
function showFaceIDOverlay() { document.getElementById('s-faceid').classList.remove('hidden'); }
function hideFaceIDOverlay()  { document.getElementById('s-faceid').classList.add('hidden'); }
```

---

### 19. Push Notification Banner

```html
<div class="auth-push-banner" id="push-banner" onclick="openFromBanner()">
  <div class="auth-push-banner-inner">
    <div class="auth-push-banner-top">
      <span class="auth-push-banner-appname">Enigma Authenticator</span>
      <span class="auth-push-banner-time">now</span>
    </div>
    <div class="auth-push-banner-content">
      <div class="auth-push-banner-app-icon">
        <svg viewBox="0 0 40 40" fill="none" width="22" height="22"><!-- Enigma logo white --></svg>
      </div>
      <div class="auth-push-banner-body">
        <div class="auth-push-banner-title">Sign-in requested</div>
        <div class="auth-push-banner-sub">London · Chrome · 82.43.201.15</div>
      </div>
    </div>
  </div>
</div>
```

**Show/hide JS:**
```javascript
let bannerDismissTimer;
function showPushBanner() {
  document.getElementById('push-banner').classList.add('show');
  clearTimeout(bannerDismissTimer);
  bannerDismissTimer = setTimeout(() => hidePushBanner(), 9000); // auto-dismiss 9s
}
function hidePushBanner() {
  clearTimeout(bannerDismissTimer);
  document.getElementById('push-banner').classList.remove('show');
}
```

---

### 20. Home Logo Banner

```html
<div class="auth-home-logo-banner">
  <div class="auth-home-logo-banner-left">
    <div class="auth-home-logo-icon">
      <svg width="30" height="30" viewBox="0 0 40 40" fill="none"><!-- logo white --></svg>
    </div>
    <p class="auth-home-logo-name">Enigma Authenticator</p>
  </div>
</div>
```

---

### 21. Avatar / Initials

```html
<div class="auth-avatar">PR</div>
```

---

### 22. Session Live Dot

```html
<div class="auth-session-dot"></div>
```

---

### 23. Session Compact Card (mobile)

```html
<div class="auth-session-compact" id="sess-london">
  <div class="auth-session-compact-flag">UK</div>
  <div class="auth-session-compact-body">
    <div class="auth-session-compact-loc">London, UK</div>
    <div class="auth-session-compact-meta">Chrome · macOS · just now</div>
  </div>
  <button class="auth-session-compact-signout" onclick="signOutSession('sess-london','London')">Sign out</button>
</div>
```

---

### 24. Toast

```html
<div class="auth-toast" id="toast"></div>
```

**JS:**
```javascript
let toastTimer;
function showToast(msg, type='') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = 'auth-toast' + (type ? ' '+type : '') + ' show';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 3000);
}
// Usage:
showToast('Code copied to clipboard.');
showToast('Sign-in blocked. Attempt has been logged.', 'danger');
```

---

### 25. Bottom Sheet

```html
<div class="auth-sheet-overlay" id="sheet-overlay"></div>
<div class="auth-bottom-sheet" id="sign-in-sheet">
  <div class="auth-sheet-handle"></div>
  <!-- Sheet content here -->
</div>
```

**JS:**
```javascript
function showSignInSheet() {
  document.getElementById('sheet-overlay').classList.add('show');
  document.getElementById('sign-in-sheet').classList.add('open');
}
function dismissSignInSheet() {
  document.getElementById('sign-in-sheet').classList.remove('open');
  document.getElementById('sheet-overlay').classList.remove('show');
}
// Overlay click to dismiss:
document.getElementById('sheet-overlay').addEventListener('click', dismissSignInSheet);
```

---

### 26. OTP Code Display (inside bottom sheet)

```html
<div class="auth-sheet-code-card" id="sheet-code-section">
  <div class="auth-sheet-code-header">
    <span class="auth-sheet-code-label">One-time code</span>
    <span class="auth-sheet-code-expiry" id="sheet-expiry">3:00</span>
  </div>
  <div class="auth-sheet-otp" id="sheet-otp">482 716</div>
  <button class="auth-sheet-copy-btn" id="sheet-copy-btn" onclick="copyCode()">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
    </svg>
    Copy code
  </button>
</div>
<button class="auth-sheet-block-link" onclick="blockRequest()">This wasn't me — Block sign-in</button>
```

**Urgent state:** add `.urgent` class to `auth-sheet-code-expiry` when `≤ 30s` remain.

**Used state (code consumed):**
```javascript
// Fade out code card, show confirmed state
codeSection.style.transition = 'opacity .2s';
codeSection.style.opacity = '0';
setTimeout(() => {
  codeSection.style.display = 'none';
  const confirmed = document.createElement('div');
  confirmed.className = 'auth-sheet-confirmed';
  confirmed.innerHTML = `
    <div class="auth-sheet-confirmed-icon">
      <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
    </div>
    <h3>Sign-in confirmed</h3>
    <p>You're now signed in on Chrome · London</p>
  `;
  codeSection.parentNode.insertBefore(confirmed, codeSection.nextSibling);
}, 220);
```

---

### 27. Sheet Confirmed State (standalone)

```html
<div class="auth-sheet-confirmed">
  <div class="auth-sheet-confirmed-icon">
    <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
  </div>
  <h3>Sign-in confirmed</h3>
  <p>You're now signed in on Chrome · London</p>
</div>
```

---

### 28. Sign-Out Confirmation Dialog

```html
<div class="auth-confirm-overlay" id="confirm-overlay">
  <div class="auth-confirm-dialog">
    <p class="auth-confirm-title" id="confirm-title">Sign out session?</p>
    <p class="auth-confirm-body" id="confirm-body">This will immediately end the session and require re-authentication on that device.</p>
    <div class="auth-confirm-actions">
      <button class="auth-confirm-btn auth-confirm-btn-cancel" onclick="cancelSignOut()">Cancel</button>
      <button class="auth-confirm-btn auth-confirm-btn-danger" onclick="confirmSignOut()">Sign out</button>
    </div>
  </div>
</div>
```

**JS:**
```javascript
function showSignOutConfirm(sessionId, location) {
  document.getElementById('confirm-title').textContent = `Sign out ${location} session?`;
  document.getElementById('confirm-body').textContent = `This will immediately end the ${location} session and require re-authentication on that device.`;
  document.getElementById('confirm-overlay').classList.add('show');
}
function cancelSignOut()  { document.getElementById('confirm-overlay').classList.remove('show'); }
```

---

### 29. Primary Button (mobile)

```html
<button class="auth-btn-primary-mobile">Confirm Identity</button>
```

**Disabled state:** add `disabled` attribute.

---

### 30. Danger Button (mobile)

```html
<button class="auth-btn-danger">Block sign-in attempt</button>
```

---

### 31. Mobile Eyebrow

```html
<p class="auth-eyebrow-mobile">Identity Verification</p>
```

---

### 32. Password Fallback Form (mobile)

```html
<div class="auth-mobile-input-group">
  <label for="fb-email">Email Address</label>
  <div class="auth-mobile-input-wrap">
    <input type="email" class="auth-mobile-input-field" id="fb-email"
      placeholder="you@enigma.io" autocomplete="email" />
  </div>
</div>
<div class="auth-mobile-input-group">
  <label for="fb-pw">Password</label>
  <div class="auth-mobile-input-wrap">
    <input type="password" class="auth-mobile-input-field" id="fb-pw"
      placeholder="Enter your password" autocomplete="current-password" />
    <button class="auth-mobile-input-toggle" type="button"
      onclick="this.previousElementSibling.type=this.previousElementSibling.type==='password'?'text':'password'"
      aria-label="Toggle password visibility">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    </button>
  </div>
</div>
<div style="margin-top:auto;padding-top:16px;">
  <button class="auth-btn-primary-mobile" id="fb-btn">Confirm Identity</button>
</div>
```

---

## JS Behavior Notes

### BroadcastChannel (cross-tab communication)
The web sign-in and authenticator communicate via `BroadcastChannel('enigma_auth')`:
- Sign-in page sends `{ type: 'sign_in_request' }` → authenticator shows push banner
- Sign-in page sends `{ type: 'code_used' }` → authenticator marks code as consumed
```javascript
try {
  const authChannel = new BroadcastChannel('enigma_auth');
  authChannel.onmessage = (e) => {
    if (e.data?.type === 'sign_in_request') showPushBanner();
    if (e.data?.type === 'code_used') handleCodeUsed();
  };
} catch(e) {}
```

### OTP expiry timer (3 min, warns at 30s)
```javascript
let webTimerInterval, webSecs = 180;
function startWebTimer() {
  webSecs = 180;
  clearInterval(webTimerInterval);
  const el = document.getElementById('web-timer');
  el.textContent = '3:00';
  el.classList.remove('warn');
  webTimerInterval = setInterval(() => {
    webSecs--;
    const m = Math.floor(webSecs/60), s = webSecs%60;
    el.textContent = `${m}:${String(s).padStart(2,'0')}`;
    el.classList.toggle('warn', webSecs <= 30);
    if (webSecs <= 0) {
      clearInterval(webTimerInterval);
      el.textContent = 'Expired';
    }
  }, 1000);
}
```

### Resend cooldown (30s)
```javascript
let resendCooldownTimer = null;
function resendCode() {
  const btn = document.getElementById('resend-link');
  btn.disabled = true;
  startWebTimer();
  let secs = 30;
  btn.textContent = `Resend in ${secs}s`;
  clearInterval(resendCooldownTimer);
  resendCooldownTimer = setInterval(() => {
    secs--;
    if (secs <= 0) { clearInterval(resendCooldownTimer); btn.textContent = 'Resend notification'; btn.disabled = false; }
    else btn.textContent = `Resend in ${secs}s`;
  }, 1000);
}
```

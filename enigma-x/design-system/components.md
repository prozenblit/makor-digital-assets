# Enigma X — Component Reference
HTML + usage notes for every component. Use these exact patterns — do not write new CSS for anything listed here.

---

## Buttons

### Primary (cyan fill)
```html
<button class="btn btn-primary">
  <span class="btn-label">Sign In</span>
  <span class="btn-spinner"></span>
</button>
```
Loading state: add `.loading` to `.btn` — label hides, spinner shows.  
Disabled: add `disabled` attribute.

### Outlined
```html
<button class="btn btn-outline">Cancel</button>
```

### Dark
```html
<button class="btn btn-dark">Confirm</button>
```

### Danger (outlined red)
```html
<button class="btn btn-danger">Sign Out</button>
```

### Small
```html
<button class="btn btn-outline btn-sm">Edit</button>
<button class="btn btn-primary btn-sm">Save</button>
```

### Icon button (no label)
```html
<button class="btn-icon" title="Refresh">
  <svg><!-- refresh icon --></svg>
</button>
```

### Link button
```html
<button class="btn-link">Forgot password?</button>
```

---

## Option Toggle (pill-style radio group)

```html
<div class="option-group" role="radiogroup">
  <button class="option" role="radio" aria-checked="false">Option</button>
  <button class="option active" role="radio" aria-checked="true">Option</button>
  <button class="option" role="radio" aria-checked="false">Option</button>
</div>
```
JS: toggle `.active` on click, update `aria-checked`.

### Standalone option chip
```html
<button class="option-chip active">BUY</button>
<button class="option-chip">SELL</button>
```

### BUY / SELL toggle (trading form)
```html
<div class="option-group" role="radiogroup">
  <button class="option" onclick="setSide('sell')">SELL</button>
  <button class="option active" onclick="setSide('buy')">BUY</button>
</div>
```

---

## Inputs

### Text input (standard)
```html
<div class="field">
  <label class="field-label">Email address</label>
  <div class="field-wrap">
    <input type="email" class="field-input" placeholder="you@company.com" />
  </div>
  <span class="field-error">Please enter a valid email.</span>
</div>
```
Error state: add `.error` to `.field-input`, add `.show` to `.field-error`.

### Password input (with toggle)
```html
<div class="field">
  <label class="field-label">Password</label>
  <div class="field-wrap">
    <input type="password" class="field-input" id="pw" placeholder="••••••••" />
    <button class="field-toggle" onclick="togglePw()" type="button" aria-label="Show password">
      <svg><!-- eye icon --></svg>
    </button>
  </div>
</div>
```

### Search input
```html
<div class="field-wrap">
  <span class="field-prefix-icon">
    <svg><!-- search icon --></svg>
  </span>
  <input type="search" class="field-input with-prefix" placeholder="Search" />
</div>
```

### Quantity / number input
```html
<div class="field">
  <label class="field-label">Quantity</label>
  <div class="field-wrap">
    <input type="number" class="field-input input-qty" placeholder="0" min="0" step="0.01" />
  </div>
</div>
```

---

## Select / Dropdown

```html
<div class="field">
  <label class="field-label">Order type</label>
  <div class="select-wrap">
    <select class="select-native">
      <option value="" disabled selected>Please select</option>
      <option value="market">Market</option>
      <option value="limit">Limit</option>
      <option value="fok">FOK</option>
      <option value="gtc">GTC</option>
    </select>
  </div>
</div>
```

---

## Checkbox

### Unchecked
```html
<label class="checkbox-row" onclick="this.classList.toggle('checked')">
  <span class="cb-box">
    <svg class="cb-check" viewBox="0 0 10 10" fill="none">
      <polyline points="1.5,5 4,7.5 8.5,2.5" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </span>
  <span class="cb-label">Remember me</span>
</label>
```
Checked: add `.checked` to `.checkbox-row`.  
Indeterminate: add `.indeterminate` instead of `.checked`.

---

## Badges

### Order type
```html
<span class="badge badge-market">Market</span>
<span class="badge badge-limit">Limit</span>
```

### Trade side (inline text style)
```html
<span class="badge-buy">BUY</span>
<span class="badge-sell">SELL</span>
```

### Status
```html
<span class="badge badge-success">Active</span>
<span class="badge badge-danger">Failed</span>
<span class="badge badge-pending">Pending</span>
<span class="badge badge-active">Live</span>
```

### Environment
```html
<span class="badge-env">UAT</span>
```

### Currency chip (e.g. in RFQ form)
```html
<span class="currency-chip">BTC</span>
<span class="currency-chip">USD</span>
```

---

## Section Labels

### Standard section label (table/panel heading)
```html
<span class="section-label">Spot Balances</span>
```

### Teal eyebrow (above screen title)
```html
<span class="eyebrow">Step 1 of 2</span>
<h1 class="screen-title">Verify your identity</h1>
```

---

## Tabs

```html
<div class="tab-bar" role="tablist">
  <button class="tab active" role="tab" aria-selected="true">Trades Blotter</button>
  <button class="tab" role="tab" aria-selected="false">Balance Movement</button>
</div>
```
JS: on click, add `.active` + `aria-selected="true"` to clicked tab, remove from siblings.

---

## Data Tables

### Trades blotter
```html
<table class="data-table">
  <thead>
    <tr>
      <th>ID</th>
      <th>Order Id</th>
      <th>Instrument</th>
      <th>Order Type</th>
      <th>Time In Force</th>
      <th>Side</th>
      <th class="col-qty">Quantity</th>
      <th class="col-price">Executed Price</th>
      <th>User</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="col-id">UAT-TRD-000...</td>
      <td class="col-id">UAT-ORD-000...</td>
      <td>BTC-USD</td>
      <td><span class="badge badge-limit">Limit</span></td>
      <td>GTC</td>
      <td><span class="badge-sell">SELL</span></td>
      <td class="col-qty">1.00</td>
      <td class="col-price">60,943.75</td>
      <td>uat_trader_1</td>
    </tr>
  </tbody>
</table>
```

### Bid / Ask order book
```html
<table class="data-table">
  <thead>
    <tr>
      <th class="col-bid">BID</th>
      <th class="col-qty">Qty</th>
      <th class="col-ask">ASK</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="col-bid col-price">61,349.29</td>
      <td class="col-qty">1</td>
      <td class="col-ask col-price">61,447.52</td>
    </tr>
  </tbody>
</table>
```
BID column always uses `.col-bid` (red). ASK column always uses `.col-ask` (teal). Never swap.

### Balances
```html
<table class="data-table">
  <thead>
    <tr><th>Asset</th><th class="col-qty">Quantity</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>USD</td>
      <td class="col-qty" style="color: var(--color-status-success);">2,000,000.00</td>
    </tr>
    <tr>
      <td>BTC</td>
      <td class="col-qty" style="color: var(--color-status-danger);">-12.50</td>
    </tr>
  </tbody>
</table>
```

---

## BID / ASK Price Panel (Spot Trader)

```html
<div class="price-panel">
  <div class="price-side price-side-bid" role="button" tabindex="0">
    <span class="price-label">BID</span>
    <span class="price-value">61,349</span>
    <span class="price-sub">.29000000</span>
  </div>
  <div class="price-side price-side-ask" role="button" tabindex="0">
    <span class="price-label">ASK</span>
    <span class="price-value">61,447</span>
    <span class="price-sub">.52000000</span>
  </div>
</div>
```

---

## Ticker Bar

```html
<div class="ticker-bar" role="list">
  <div class="ticker-item" role="listitem">
    <span class="ticker-pair">BTC-USD</span>
    <span class="ticker-price">64,988</span>
    <span class="ticker-delta down">-1.98%</span>
  </div>
  <div class="ticker-item" role="listitem">
    <span class="ticker-pair">ETH-USD</span>
    <span class="ticker-price">1,667.32</span>
    <span class="ticker-delta up">+0.27%</span>
  </div>
</div>
```

---

## Navigation Bar

```html
<nav class="top-nav">
  <div class="nav-brand">
    <!-- Enigma logo SVG here -->
    <span class="nav-logo-text">ENIGMA</span>
  </div>
  <span class="badge-env">UAT</span>
  <div class="nav-spacer"></div>
  <div class="nav-actions">
    <div class="nav-exposure">
      <span class="nav-exposure-label">Exposure</span>
      <span class="nav-exposure-value">$5,000,000</span>
    </div>
    <span class="nav-avatar" title="User initials">YH</span>
  </div>
</nav>
```

---

## Card / Panel

```html
<div class="card">
  <div class="card-header">
    <span class="card-title">Spot Trader</span>
    <button class="btn-icon" title="Refresh">
      <svg><!-- refresh --></svg>
    </button>
  </div>
  <div class="card-body">
    <!-- content -->
  </div>
</div>
```

---

## Divider (with label)

```html
<div class="divider">
  <span class="divider-line"></span>
  <span class="divider-text">or</span>
  <span class="divider-line"></span>
</div>
```

---

## Toast

```html
<div class="toast" id="toast" role="alert" aria-live="polite"></div>
```
```js
function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast' + (type ? ' ' + type : '');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}
// Usage:
showToast('Signed in successfully');
showToast('Authentication failed', 'danger');
```

---

## OTP Input (Authenticator)

```html
<div class="otp-row" role="group" aria-label="One-time code">
  <input class="otp-slot" type="text" inputmode="numeric" maxlength="1" aria-label="Digit 1" />
  <input class="otp-slot" type="text" inputmode="numeric" maxlength="1" aria-label="Digit 2" />
  <input class="otp-slot" type="text" inputmode="numeric" maxlength="1" aria-label="Digit 3" />
  <input class="otp-slot" type="text" inputmode="numeric" maxlength="1" aria-label="Digit 4" />
  <input class="otp-slot" type="text" inputmode="numeric" maxlength="1" aria-label="Digit 5" />
  <input class="otp-slot" type="text" inputmode="numeric" maxlength="1" aria-label="Digit 6" />
</div>
```
JS behavior: on input of a digit, focus next slot; on backspace when empty, focus previous slot; add `.filled` class when slot has a value; add `.error` to all slots on wrong code.

---

## Instrument Selector

```html
<button class="instrument-select">
  <svg class="instrument-icon"><!-- search/globe icon --></svg>
  <span>BTC-USD</span>
  <svg><!-- chevron down --></svg>
</button>
```

---

## Balance Row

```html
<div class="balance-row">
  <span class="balance-asset">USD</span>
  <span class="balance-qty positive">2,000,000.00</span>
</div>
<div class="balance-row">
  <span class="balance-asset">BTC</span>
  <span class="balance-qty negative">-12.50</span>
</div>
```

---

## Typography — Quick Reference

```html
<!-- Page/screen title -->
<h1 style="font-size:24px; font-weight:700; color:var(--color-text-primary);">Sign In</h1>

<!-- Section subtitle -->
<p style="font-size:14px; color:var(--color-text-secondary); line-height:1.55;">Enter your credentials to continue.</p>

<!-- Table header (uppercase label) -->
<span class="section-label">Spot Balances</span>

<!-- Mono price display -->
<span style="font-family:var(--font-mono); font-size:32px; font-weight:600; color:var(--color-status-danger);">61,349.29</span>

<!-- Timestamp / metadata -->
<span style="font-family:var(--font-mono); font-size:12px; color:var(--color-text-tertiary);">2026-07-22 13:44:30</span>
```

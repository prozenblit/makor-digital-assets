# FX Engine Room — Component Reference
HTML + usage notes for every component. Use these exact patterns — do not write new CSS for anything listed here.

---

## Buttons

### Brand / Lavender (Log In, primary)
```html
<button class="btn btn-brand">
  <span class="btn-label">Log In</span>
  <span class="btn-spinner"></span>
</button>

<!-- Large login variant (full-width) -->
<button class="btn btn-brand btn-lg">
  <span class="btn-label">Log In</span>
  <span class="btn-spinner"></span>
</button>
```
Loading state: add `.loading` to `.btn` — label hides, spinner shows.

### Teal (New Trade, primary teal)
```html
<button class="btn btn-teal">New Trade</button>
```

### Teal Outlined (Give-Up, Add Permissions)
```html
<button class="btn btn-teal-outline">Give-Up</button>
<button class="btn btn-teal-outline">Add Permissions</button>
```

### Cancel / White
```html
<button class="btn btn-cancel">Close</button>
<button class="btn btn-cancel">Cancel</button>
```

### Save Changes (outlined white)
```html
<button class="btn btn-save">Save Changes</button>
```

### Dark / Tertiary
```html
<button class="btn btn-dark">Secondary Action</button>
```

### Danger
```html
<button class="btn btn-danger">Remove</button>
```

### Small
```html
<button class="btn btn-teal btn-sm">Add</button>
<button class="btn btn-dark btn-sm">Edit</button>
```

### Amber "+" Add Button
```html
<button class="btn-add" title="Add item">+</button>
```

### Icon Button (sidebar, toolbar)
```html
<button class="btn-icon" title="Refresh">
  <svg><!-- icon SVG --></svg>
</button>
```

### Link Button (breadcrumb, navigation)
```html
<button class="btn-link">Entities</button>
```

---

## Inputs

### Text input (standard)
```html
<div class="field">
  <label class="field-label">Makor Entity</label>
  <div class="field-wrap">
    <input type="text" class="field-input" placeholder="Select entity..." />
  </div>
</div>
```

### Error state
```html
<div class="field">
  <label class="field-label">Password</label>
  <div class="field-wrap">
    <input type="password" class="field-input error" value="wrongpassword" />
  </div>
  <span class="field-error show">Incorrect Password</span>
</div>
```
Error: add `.error` to `.field-input`, add `.show` to `.field-error`.

### Password input (with toggle)
```html
<div class="field">
  <label class="field-label">Password</label>
  <div class="field-wrap">
    <input type="password" class="field-input" id="pw" placeholder="••••••••" />
    <button class="field-toggle" onclick="togglePw()" type="button" aria-label="Show password">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    </button>
  </div>
</div>
```

### Search input
```html
<div class="field-wrap">
  <span class="field-prefix-icon">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  </span>
  <input type="search" class="field-input with-prefix" placeholder="Search entities..." />
</div>
```

### Mono input (account IDs, codes)
```html
<div class="field">
  <label class="field-label">Account ID</label>
  <div class="field-wrap">
    <input type="text" class="field-input input-mono" placeholder="B4TYDEB6GKMZO031MB27" />
  </div>
</div>
```

---

## Select / Dropdown

```html
<div class="field">
  <label class="field-label">Makor Entity</label>
  <div class="select-wrap">
    <select class="select-native">
      <option value="" disabled selected>Select entity...</option>
      <option value="makor-uk">Makor UK</option>
      <option value="makor-us">Makor US</option>
    </select>
  </div>
</div>
```

---

## Toggle (Active / Inactive)

```html
<!-- Inactive -->
<label class="toggle-wrap" onclick="this.classList.toggle('active')">
  <span class="toggle-track">
    <span class="toggle-thumb"></span>
  </span>
  <span class="toggle-label">Inactive</span>
</label>

<!-- Active -->
<label class="toggle-wrap active">
  <span class="toggle-track">
    <span class="toggle-thumb"></span>
  </span>
  <span class="toggle-label">Active</span>
</label>
```
JS: toggle `.active` on `.toggle-wrap` on click. Update label text if needed.

---

## Radio Buttons (Client / Market Maker)

```html
<div style="display:flex; gap:20px;">
  <label class="radio-row selected">
    <span class="radio-circle"><span class="radio-dot"></span></span>
    <span class="radio-label">Client</span>
  </label>
  <label class="radio-row" onclick="selectRadio(this)">
    <span class="radio-circle"><span class="radio-dot"></span></span>
    <span class="radio-label">Market Maker</span>
  </label>
</div>
```
JS: on click, remove `.selected` from all siblings, add to clicked one.

---

## Checkbox (Default Booking Recipients)

```html
<!-- Unchecked -->
<label class="checkbox-row" onclick="this.classList.toggle('checked')">
  <span class="cb-box">
    <svg class="cb-check" viewBox="0 0 10 10" fill="none">
      <polyline points="1.5,5 4,7.5 8.5,2.5" stroke="#000" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </span>
  <span class="cb-label">RBS EDGE BOA</span>
</label>

<!-- Checked -->
<label class="checkbox-row checked">
  <span class="cb-box">
    <svg class="cb-check" viewBox="0 0 10 10" fill="none">
      <polyline points="1.5,5 4,7.5 8.5,2.5" stroke="#000" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </span>
  <span class="cb-label">HSBC Primary</span>
</label>
```

---

## Section Label (Lavender — FX Engine Room style)

```html
<span class="section-label">Trading Accounts</span>
<span class="section-label">Traders</span>
<span class="section-label">Product Permissions</span>
```
Note: Color is `--color-brand` (lavender), not tertiary gray like Enigma X.

---

## Breadcrumb

```html
<nav class="breadcrumb" aria-label="Breadcrumb">
  <button class="breadcrumb-link">Entities</button>
  <span class="breadcrumb-sep">›</span>
  <span class="breadcrumb-current">Bank of America</span>
</nav>
```

---

## Badges

### Group badge (amber)
```html
<span class="badge badge-group">Group</span>
```

### Review badge variants
```html
<span class="badge badge-review-filled">Review</span>
<span class="badge badge-review-teal">Review</span>
<span class="badge badge-review-dark">Review</span>
<span class="badge badge-review-outlined">Review</span>
```

### Status badges
```html
<span class="badge badge-active">Active</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-danger">Error</span>
<span class="badge badge-pending">Pending</span>
```

### Account type badge
```html
<span class="badge badge-type">RBS</span>
<span class="badge badge-type">Client</span>
<span class="badge badge-type">Market Maker</span>
```

---

## List Panel (Master / Entity List)

```html
<div class="list-panel">

  <!-- Group header -->
  <div class="list-group-header">
    <span>RBS Group</span>
  </div>

  <!-- Section label within list -->
  <div class="list-section-label">
    <span class="section-label">Trading Accounts</span>
  </div>

  <!-- List item — default -->
  <div class="list-item" onclick="selectItem(this)">
    <div class="list-item-name">RBS EDGE BOA</div>
    <div class="list-item-sub">Client · Bank of America</div>
  </div>

  <!-- List item — active/selected -->
  <div class="list-item active">
    <div class="list-item-name">RBS EDGE BOA</div>
    <div class="list-item-sub">Client · Bank of America</div>
  </div>

  <!-- Section label for Traders -->
  <div class="list-section-label">
    <span class="section-label">Traders</span>
  </div>

  <!-- Trader item -->
  <div class="list-item">
    <div class="list-item-name">John Smith</div>
    <div class="list-item-sub">Trader</div>
  </div>

</div>
```
JS: on click, add `.active` to clicked item, remove from siblings. 

---

## Detail Panel (Entity / Account Detail)

```html
<div class="detail-panel">

  <!-- Breadcrumb -->
  <nav class="breadcrumb" style="margin-bottom:16px;">
    <button class="breadcrumb-link">Entities</button>
    <span class="breadcrumb-sep">›</span>
    <span class="breadcrumb-current">Bank of America</span>
  </nav>

  <!-- Header -->
  <div class="detail-header">
    <div>
      <div class="detail-title">RBS EDGE BOA</div>
      <div style="display:flex; align-items:center; gap:8px; margin-top:6px;">
        <span class="badge badge-type">RBS</span>
        <span style="font-size:13px; color:var(--color-text-secondary);">Bank of America</span>
      </div>
    </div>
    <label class="toggle-wrap active">
      <span class="toggle-track"><span class="toggle-thumb"></span></span>
      <span class="toggle-label">Active</span>
    </label>
  </div>

  <!-- Account Type Radio -->
  <div class="detail-section">
    <div style="display:flex; gap:24px; margin-bottom:16px;">
      <label class="radio-row selected">
        <span class="radio-circle"><span class="radio-dot"></span></span>
        <span class="radio-label">Client</span>
      </label>
      <label class="radio-row">
        <span class="radio-circle"><span class="radio-dot"></span></span>
        <span class="radio-label">Market Maker</span>
      </label>
    </div>
  </div>

  <!-- Field pairs -->
  <div class="detail-section">
    <div class="field-pair">
      <span class="field-pair-label">Prime Broker / Mapping Value</span>
      <input class="field-input" type="text" value="RBS" />
    </div>
    <div class="field-pair">
      <span class="field-pair-label">Makor Entity</span>
      <div class="select-wrap">
        <select class="select-native">
          <option>Makor UK</option>
        </select>
      </div>
    </div>
    <div class="field-pair">
      <span class="field-pair-label">Lucera Drop Value</span>
      <input class="field-input" type="text" placeholder="Enter value..." />
    </div>
    <div class="field-pair">
      <span class="field-pair-label">Structured</span>
      <label class="checkbox-row">
        <span class="cb-box">
          <svg class="cb-check" viewBox="0 0 10 10" fill="none">
            <polyline points="1.5,5 4,7.5 8.5,2.5" stroke="#000" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <span class="cb-label">Structured product</span>
      </label>
    </div>
    <div class="field-pair">
      <span class="field-pair-label">Give-Up</span>
      <button class="btn btn-teal-outline btn-sm">Give-Up</button>
    </div>
  </div>

  <!-- Default Booking Recipients -->
  <div class="detail-section">
    <div class="detail-section-head">
      <span class="section-label">Default Booking Recipients</span>
      <button class="btn-add" title="Add recipient">+</button>
    </div>
    <div style="display:flex; flex-direction:column; gap:6px;">
      <label class="checkbox-row checked">
        <span class="cb-box">
          <svg class="cb-check" viewBox="0 0 10 10" fill="none">
            <polyline points="1.5,5 4,7.5 8.5,2.5" stroke="#000" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <span class="cb-label">RBS EDGE BOA</span>
      </label>
      <label class="checkbox-row">
        <span class="cb-box">
          <svg class="cb-check" viewBox="0 0 10 10" fill="none">
            <polyline points="1.5,5 4,7.5 8.5,2.5" stroke="#000" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <span class="cb-label">HSBC Primary</span>
      </label>
    </div>
  </div>

  <!-- Product Permissions Grid -->
  <div class="detail-section">
    <div class="detail-section-head">
      <span class="section-label">Product Permissions</span>
      <button class="btn btn-teal-outline btn-sm">Add Permissions</button>
    </div>
    <table class="permissions-grid">
      <thead>
        <tr>
          <th>Product</th>
          <th>Limit</th>
          <th>Currency / Tenor</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="perm-product">Spot</span></td>
          <td><input class="field-input" type="number" value="10000000" style="width:120px;height:28px;" /></td>
          <td><span class="perm-code">USD / —</span></td>
        </tr>
        <tr>
          <td><span class="perm-product">Forwards</span></td>
          <td><input class="field-input" type="number" value="5000000" style="width:120px;height:28px;" /></td>
          <td><span class="perm-code">USD / 1Y</span></td>
        </tr>
        <tr>
          <td><span class="perm-product">Vanilla Options</span></td>
          <td><input class="field-input" type="number" value="2000000" style="width:120px;height:28px;" /></td>
          <td><span class="perm-code">USD / 6M</span></td>
        </tr>
        <tr>
          <td><span class="perm-product">Exotic Options</span></td>
          <td><input class="field-input" type="number" placeholder="—" style="width:120px;height:28px;" /></td>
          <td><span class="perm-code">USD / 3M</span></td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Action buttons -->
  <div style="display:flex; gap:8px; justify-content:flex-end; padding-top:16px; border-top:1px solid var(--color-divider);">
    <button class="btn btn-cancel">Close</button>
    <button class="btn btn-save">Save Changes</button>
  </div>

</div>
```

---

## Sidebar (Icon Navigation)

```html
<aside class="app-sidebar">
  <!-- Menu icon -->
  <div class="sidebar-icon active" title="Entities">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  </div>
  <div class="sidebar-icon" title="Documents">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14,2 14,8 20,8"/>
    </svg>
  </div>
  <div class="sidebar-icon" title="Trades">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="17,1 21,5 17,9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/>
      <polyline points="7,23 3,19 7,15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
    </svg>
  </div>
  <div class="sidebar-icon" title="Archive">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="21,8 21,21 3,21 3,8"/><rect x="1" y="3" width="22" height="5"/>
      <line x1="10" y1="12" x2="14" y2="12"/>
    </svg>
  </div>
  <div class="sidebar-icon" title="Entities">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9,22 9,12 15,12 15,22"/>
    </svg>
  </div>
  <div class="sidebar-spacer"></div>
  <!-- Settings gear at bottom -->
  <div class="sidebar-icon" title="Settings">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  </div>
</aside>
```
JS: on click, add `.active` to clicked `.sidebar-icon`, remove from siblings.

---

## Footer Bar

```html
<footer class="app-footer">
  <div class="footer-logo">M</div>
  <span class="footer-text">FX Engine Room | Operated by Makor Group</span>
  <div class="footer-spacer"></div>
  <div class="footer-live">
    <span class="footer-dot"></span>
    <span>Live</span>
  </div>
</footer>
```

---

## Tag Input (with chips)

```html
<div class="field">
  <label class="field-label">Counterparties</label>
  <div class="tag-input-wrap">
    <span class="tag-chip">
      RBS EDGE BOA
      <button class="tag-chip-remove" onclick="removeTag(this)" type="button">×</button>
    </span>
    <span class="tag-chip">
      HSBC PRIMARY
      <button class="tag-chip-remove" onclick="removeTag(this)" type="button">×</button>
    </span>
    <input class="tag-input" type="text" placeholder="Add..." />
  </div>
</div>
```

---

## Card / Panel

```html
<div class="card">
  <div class="card-header">
    <span class="card-title">Entity Details</span>
    <button class="btn-icon" title="Refresh">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="23,4 23,10 17,10"/>
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
      </svg>
    </button>
  </div>
  <div class="card-body">
    <!-- content -->
  </div>
</div>
```

---

## Login Card (full pattern)

```html
<div class="login-page">
  <div class="login-card">
    <div class="login-brand">
      <span class="login-brand-fx">FX</span>
      <span class="login-brand-sub">Engine Room</span>
    </div>
    <div class="login-form">
      <div class="field">
        <label class="field-label">Username</label>
        <div class="field-wrap">
          <input type="text" class="field-input" placeholder="Enter username" />
        </div>
      </div>
      <div class="field">
        <label class="field-label">Password</label>
        <div class="field-wrap">
          <input type="password" class="field-input error" placeholder="••••••••" />
          <button class="field-toggle" type="button" aria-label="Show password">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
        </div>
        <span class="field-error show">Incorrect Password</span>
      </div>
      <button class="login-forgot" type="button">Forgot Password?</button>
      <button class="btn btn-brand btn-lg">
        <span class="btn-label">Log In</span>
        <span class="btn-spinner"></span>
      </button>
    </div>
  </div>
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
showToast('Changes saved successfully', 'success');
showToast('Failed to save changes', 'danger');
showToast('Entity updated');
```

---

## Typography — Quick Reference

```html
<!-- Page/screen title -->
<h1 style="font-size:22px; font-weight:700; color:var(--color-text-primary);">Bank of America</h1>

<!-- Section subtitle / description -->
<p style="font-size:14px; color:var(--color-text-secondary); line-height:1.5;">Select a trading account to view details.</p>

<!-- Section label (lavender uppercase) -->
<span class="section-label">Trading Accounts</span>

<!-- Mono account ID -->
<span style="font-family:var(--font-mono); font-size:13px; color:var(--color-text-secondary); letter-spacing:0.04em;">B4TYDEB6GKMZO031MB27</span>

<!-- Breadcrumb link -->
<span style="color:var(--color-brand); font-weight:500; cursor:pointer;">Entities</span>

<!-- Product name (lavender, medium weight) -->
<span style="color:var(--color-brand); font-weight:500; font-size:14px;">Vanilla Options</span>

<!-- Active list item text -->
<span style="color:var(--color-brand); font-weight:500;">RBS EDGE BOA</span>

<!-- Muted label -->
<span style="font-size:12px; color:var(--color-text-tertiary);">Last updated 3 min ago</span>
```

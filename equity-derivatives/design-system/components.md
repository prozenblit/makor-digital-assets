# Equity Derivatives Auction — Component Reference
HTML + usage notes for every component. Use these exact patterns — do not write new CSS for anything listed here.

---

## App Shell

```html
<div class="app-shell">
  <!-- Left icon sidebar -->
  <aside class="sidebar">
    <div class="sidebar-logo">M</div>
    <button class="sidebar-nav-btn active" title="Auctions">
      <svg><!-- auctions/list icon --></svg>
    </button>
    <button class="sidebar-nav-btn" title="Reports">
      <svg><!-- reports/document icon --></svg>
    </button>
    <button class="sidebar-nav-btn" title="Admin">
      <svg><!-- admin/people icon --></svg>
    </button>
  </aside>

  <!-- Right: header + content -->
  <div class="app-content">
    <!-- Top header bar -->
    <header class="top-header">
      <div class="header-title">Equity Derivatives Auction</div>
      <nav class="breadcrumb">
        <span class="breadcrumb-item">Equities</span>
        <span class="breadcrumb-sep">›</span>
        <span class="breadcrumb-item">Cash Auctions</span>
        <span class="breadcrumb-sep">›</span>
        <span class="breadcrumb-item current">Auction Name</span>
      </nav>
      <div class="header-spacer"></div>
      <div class="header-actions">
        <span class="user-avatar" title="User name">PR</span>
      </div>
    </header>

    <!-- Page content -->
    <main style="flex:1;overflow-y:auto;padding:24px;">
      <!-- auction session cards go here -->
    </main>
  </div>
</div>
```

---

## Buttons

### Primary — teal fill (Confirm / Save Changes / Add New)
```html
<button class="btn btn-primary">Confirm</button>
<button class="btn btn-primary">Save Changes</button>
<button class="btn btn-primary">Add New</button>
```
Disabled: add `disabled` attribute.

### Cancel Auction — coral fill (dropdown trigger)
```html
<div style="position:relative;display:inline-block;">
  <button class="btn btn-cancel-dropdown" onclick="toggleCancelDropdown(this)">
    Cancel
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M2 4l3 3 3-3"/>
    </svg>
  </button>
  <div class="cancel-dropdown" style="display:none;">
    <button class="cancel-dropdown-item">All Bid</button>
    <button class="cancel-dropdown-item">All Ask</button>
    <button class="cancel-dropdown-item danger">All</button>
  </div>
</div>
```
JS: toggle `display` of `.cancel-dropdown` on button click; close on outside click.

### Reject — outlined coral
```html
<button class="btn btn-reject">Reject</button>
```

### White — modal Cancel/Close
```html
<button class="btn btn-white">Cancel</button>
```

### Ghost / outlined
```html
<button class="btn btn-ghost">Add Row</button>
```

### Small
```html
<button class="btn btn-primary btn-sm">Save</button>
<button class="btn btn-white btn-sm">Cancel</button>
```

### Icon button (no label)
```html
<!-- Generic icon button -->
<button class="btn-icon" title="Refresh">
  <svg><!-- icon --></svg>
</button>

<!-- Delete row (red circle ×) — use .row-delete-btn instead -->
<button class="row-delete-btn" title="Remove row">
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M2 2l6 6M8 2l-6 6"/>
  </svg>
</button>
```

---

## Auction Session Card

```html
<div class="session-card">
  <!-- Session header -->
  <div class="session-header">
    <span class="session-name">Europe Equities — Cash Close</span>
    <span class="badge-session-type">Cash Close</span>
    <span class="badge-timer">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="6" cy="6" r="5"/><path d="M6 3v3l2 1"/>
      </svg>
      Time Left: 04:32
    </span>
    <div class="session-header-spacer"></div>
    <div class="session-header-actions">
      <div style="position:relative;display:inline-block;">
        <button class="btn btn-cancel-dropdown">
          Cancel
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 4l3 3 3-3"/></svg>
        </button>
        <!-- .cancel-dropdown here when open -->
      </div>
    </div>
  </div>

  <!-- Instrument rows -->
  <div class="instrument-row">
    <div class="instrument-header">
      <span class="instrument-name">FTSE 100 IDX FUT Sep25</span>
      <span class="instrument-meta">min size: 350</span>
      <div class="instrument-eq">
        <span class="instrument-eq-label">Eq:</span>
        <span class="instrument-eq-value">7,643.00</span>
      </div>
      <div class="instrument-header-spacer"></div>
      <div style="position:relative;display:inline-block;">
        <button class="btn btn-cancel-dropdown btn-sm">
          Cancel
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 4l3 3 3-3"/></svg>
        </button>
      </div>
    </div>

    <!-- Bid/Ask table -->
    <table class="auction-table">
      <thead>
        <tr>
          <th>Size</th>
          <th>Bid</th>
          <th>Ask</th>
          <th>Spread</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="col-size">500</td>
          <td class="col-bid">
            <input type="number" class="input-inline" value="7641" placeholder="0">
          </td>
          <td class="col-ask">
            <input type="number" class="input-inline" value="7645" placeholder="0">
          </td>
          <td class="col-spread">
            <span style="font-size:13px;color:var(--color-text-secondary);font-variant-numeric:tabular-nums;">4</span>
          </td>
          <td style="text-align:right;">
            <button class="row-delete-btn" title="Remove row">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M2 2l6 6M8 2l-6 6"/>
              </svg>
            </button>
          </td>
        </tr>
        <!-- "In the mix" example row -->
        <tr>
          <td colspan="5" style="padding-top:0;">
            <span class="badge-in-the-mix">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M2 6l3 3 5-5"/>
              </svg>
              In the mix
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Instrument row — error state example -->
  <div class="instrument-row">
    <div class="instrument-header">
      <span class="instrument-name">CAC40 IDX FUT Sep25</span>
      <span class="instrument-meta">min size: 200</span>
      <div class="instrument-header-spacer"></div>
    </div>
    <table class="auction-table">
      <tbody>
        <tr>
          <td class="col-size">200</td>
          <td class="col-bid">
            <input type="number" class="input-inline" value="7710" placeholder="0">
          </td>
          <td class="col-ask">
            <input type="number" class="input-inline error" value="7700" placeholder="0">
          </td>
          <td class="col-spread"></td>
          <td style="text-align:right;">
            <button class="row-delete-btn" title="Remove row">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M2 2l6 6M8 2l-6 6"/>
              </svg>
            </button>
          </td>
        </tr>
        <!-- Warning row -->
        <tr>
          <td colspan="5" style="padding-top:0;">
            <span class="warning-inline">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M6 1L11 10H1L6 1z"/><path d="M6 5v2M6 8.5v.5"/>
              </svg>
              Bid should be lower than Ask
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

---

## Timer Badges

### Time Left (active auction)
```html
<span class="badge-timer">
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5">
    <circle cx="6" cy="6" r="5"/><path d="M6 3v3l2 1"/>
  </svg>
  Time Left: 04:32
</span>
```

### Starting In (upcoming auction)
```html
<span class="badge-timer">
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5">
    <circle cx="6" cy="6" r="5"/><path d="M6 3v3l2 1"/>
  </svg>
  Starting In: 12:00
</span>
```

---

## Order Confirmation Notification

```html
<div class="order-notification">
  <div>
    <div class="order-notification-label">Orders placed</div>
    <div class="order-notification-text">
      Your Buy EURO STOXX 50 Sep25 CC: 400 @ 41
    </div>
  </div>
  <div class="order-notification-actions">
    <button class="btn btn-reject">Reject</button>
    <button class="btn btn-primary">Confirm</button>
  </div>
</div>
```

---

## Toggle Switch (Active/Inactive)

```html
<!-- Active state -->
<div class="toggle-wrap" onclick="this.querySelector('.toggle-track').classList.toggle('on')">
  <div class="toggle-track on">
    <div class="toggle-thumb"></div>
  </div>
  <span class="toggle-label">Active</span>
</div>

<!-- Inactive state -->
<div class="toggle-wrap" onclick="this.querySelector('.toggle-track').classList.toggle('on')">
  <div class="toggle-track">
    <div class="toggle-thumb"></div>
  </div>
  <span class="toggle-label">Inactive</span>
</div>
```
JS: add/remove `.on` class on `.toggle-track` to switch state. Update `toggle-label` text accordingly.

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
  <span class="cb-label">Admin</span>
</label>
```
Checked: add `.checked` to `.checkbox-row`.  
Indeterminate: add `.indeterminate` instead of `.checked`.

---

## Inputs — Modal Form Fields

### Text input
```html
<div class="field">
  <label class="field-label">Username</label>
  <div class="field-wrap">
    <input type="text" class="field-input" placeholder="Enter username">
  </div>
</div>
```

### Error state
```html
<div class="field">
  <label class="field-label">Email</label>
  <div class="field-wrap">
    <input type="email" class="field-input error" value="invalid">
  </div>
  <span class="field-error show">Please enter a valid email address.</span>
</div>
```

### Search input (client user list)
```html
<div class="field-wrap">
  <span class="field-prefix-icon">
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
      <circle cx="6" cy="6" r="4"/><path d="M10 10l2.5 2.5"/>
    </svg>
  </span>
  <input type="search" class="field-input with-prefix" placeholder="Search users...">
</div>
```

---

## Modals

### New Internal User
```html
<div class="modal-overlay">
  <div class="modal">
    <div class="modal-header">
      <h2 class="modal-title">New Internal User</h2>
    </div>
    <div class="modal-body">
      <div class="field">
        <label class="field-label">Username</label>
        <div class="field-wrap">
          <input type="text" class="field-input" placeholder="Enter username">
        </div>
      </div>
      <label class="checkbox-row">
        <span class="cb-box">
          <svg class="cb-check" viewBox="0 0 10 10" fill="none">
            <polyline points="1.5,5 4,7.5 8.5,2.5" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <span class="cb-label">Admin</span>
      </label>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        <div class="field">
          <label class="field-label">First Name</label>
          <div class="field-wrap">
            <input type="text" class="field-input" placeholder="First name">
          </div>
        </div>
        <div class="field">
          <label class="field-label">Last Name</label>
          <div class="field-wrap">
            <input type="text" class="field-input" placeholder="Last name">
          </div>
        </div>
      </div>
      <div class="field">
        <label class="field-label">Email</label>
        <div class="field-wrap">
          <input type="email" class="field-input" placeholder="user@company.com">
        </div>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <span style="font-size:14px;color:var(--color-text-secondary);">Status</span>
        <div class="toggle-wrap">
          <div class="toggle-track">
            <div class="toggle-thumb"></div>
          </div>
          <span class="toggle-label">Inactive</span>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-white">Cancel</button>
      <button class="btn btn-primary">Add New</button>
    </div>
  </div>
</div>
```

### Edit Internal User
```html
<div class="modal-overlay">
  <div class="modal">
    <div class="modal-header">
      <h2 class="modal-title">Edit Internal User</h2>
    </div>
    <div class="modal-body">
      <!-- same fields, pre-filled, toggle shows Active -->
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <span style="font-size:14px;color:var(--color-text-secondary);">Status</span>
        <div class="toggle-wrap">
          <div class="toggle-track on">
            <div class="toggle-thumb"></div>
          </div>
          <span class="toggle-label">Active</span>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-white">Cancel</button>
      <button class="btn btn-primary">Save Changes</button>
    </div>
  </div>
</div>
```

### Edit Client
```html
<div class="modal-overlay">
  <div class="modal" style="max-width:680px;">
    <div class="modal-header">
      <h2 class="modal-title">Edit Client</h2>
    </div>
    <div class="modal-body">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        <div class="field">
          <label class="field-label">Client Name</label>
          <div class="field-wrap">
            <input type="text" class="field-input" value="Acme Capital">
          </div>
        </div>
        <div class="field">
          <label class="field-label">Makor X ID</label>
          <div class="field-wrap">
            <input type="text" class="field-input" value="MX-00412">
          </div>
        </div>
      </div>
      <div>
        <div style="font-size:13px;font-weight:600;color:var(--color-text-secondary);margin-bottom:8px;">Client User List</div>
        <div class="field-wrap" style="margin-bottom:12px;">
          <span class="field-prefix-icon">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
              <circle cx="6" cy="6" r="4"/><path d="M10 10l2.5 2.5"/>
            </svg>
          </span>
          <input type="search" class="field-input with-prefix" placeholder="Search users...">
        </div>
        <table class="admin-table" style="border:1px solid var(--color-border);border-radius:8px;overflow:hidden;">
          <thead>
            <tr>
              <th class="col-check"><input type="checkbox"></th>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Address</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="col-check">
                <label class="checkbox-row checked">
                  <span class="cb-box">
                    <svg class="cb-check" viewBox="0 0 10 10" fill="none">
                      <polyline points="1.5,5 4,7.5 8.5,2.5" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                </label>
              </td>
              <td>jsmith</td>
              <td>John</td>
              <td>Smith</td>
              <td style="color:var(--color-text-secondary);">j.smith@acme.com</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <span style="font-size:14px;color:var(--color-text-secondary);">Status</span>
        <div class="toggle-wrap">
          <div class="toggle-track on">
            <div class="toggle-thumb"></div>
          </div>
          <span class="toggle-label">Active</span>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-white">Cancel</button>
      <button class="btn btn-primary">Save Changes</button>
    </div>
  </div>
</div>
```

---

## Admin Table (User/Client List)

```html
<table class="admin-table">
  <thead>
    <tr>
      <th class="col-check">
        <label class="checkbox-row indeterminate">
          <span class="cb-box">
            <svg class="cb-check" viewBox="0 0 10 10" fill="none" style="opacity:1;">
              <path d="M2 5h6" stroke="var(--color-brand)" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </span>
        </label>
      </th>
      <th>Username</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Email Address</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="col-check">
        <label class="checkbox-row checked" onclick="this.classList.toggle('checked')">
          <span class="cb-box">
            <svg class="cb-check" viewBox="0 0 10 10" fill="none">
              <polyline points="1.5,5 4,7.5 8.5,2.5" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </label>
      </td>
      <td>jsmith</td>
      <td>John</td>
      <td>Smith</td>
      <td style="color:var(--color-text-secondary);">j.smith@company.com</td>
    </tr>
    <tr>
      <td class="col-check">
        <label class="checkbox-row" onclick="this.classList.toggle('checked')">
          <span class="cb-box">
            <svg class="cb-check" viewBox="0 0 10 10" fill="none">
              <polyline points="1.5,5 4,7.5 8.5,2.5" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </label>
      </td>
      <td>amiller</td>
      <td>Alice</td>
      <td>Miller</td>
      <td style="color:var(--color-text-secondary);">a.miller@company.com</td>
    </tr>
  </tbody>
</table>
```

---

## Badges

### Session type
```html
<span class="badge-session-type">Cash Close</span>
<span class="badge-session-type">EFP</span>
```

### Timer (Time Left / Starting In)
```html
<span class="badge-timer">
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5">
    <circle cx="6" cy="6" r="5"/><path d="M6 3v3l2 1"/>
  </svg>
  Time Left: 04:32
</span>
```

### Status badges
```html
<span class="badge badge-success">Active</span>
<span class="badge badge-warning">Pending</span>
<span class="badge badge-danger">Error</span>
<span class="badge badge-brand">Live</span>
```

### Review badge
```html
<span class="badge-review">Review (12)</span>
```

### "In the mix"
```html
<span class="badge-in-the-mix">
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M2 6l3 3 5-5"/>
  </svg>
  In the mix
</span>
```

### Warning inline (validation)
```html
<span class="warning-inline">
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M6 1L11 10H1L6 1z"/><path d="M6 5v2M6 8.5v.5"/>
  </svg>
  Bid should be lower than Ask
</span>
```

---

## Card / Panel

```html
<div class="card">
  <div class="card-header">
    <span class="card-title">User Management</span>
    <button class="btn btn-primary btn-sm">Add New User</button>
  </div>
  <div class="card-body">
    <!-- content -->
  </div>
</div>
```

---

## Section Label

```html
<span class="section-label">Active Auctions</span>
```

---

## Pagination

```html
<div class="pagination">
  <button class="page-btn" disabled>
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 3L5 7l4 4"/></svg>
  </button>
  <button class="page-btn active">1</button>
  <button class="page-btn">2</button>
  <button class="page-btn">3</button>
  <button class="page-btn">
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 3l4 4-4 4"/></svg>
  </button>
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
  void t.offsetWidth;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}
// Usage:
showToast('Orders placed successfully.', 'success');
showToast('Failed to cancel auction.', 'danger');
```

---

## Typography — Quick Reference

```html
<!-- Session heading -->
<h2 style="font-size:16px; font-weight:700; color:var(--color-text-primary);">Europe Equities — Cash Close</h2>

<!-- Instrument name -->
<span style="font-size:14px; font-weight:700; color:var(--color-text-primary);">FTSE 100 IDX FUT Sep25</span>

<!-- Metadata (min size, etc.) -->
<span style="font-size:13px; color:var(--color-text-secondary);">min size: 350</span>

<!-- Column header -->
<span style="font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:0.08em; color:var(--color-text-secondary);">Bid</span>

<!-- Equilibrium price -->
<span style="font-size:13px; color:var(--color-text-secondary);">Eq: </span>
<span style="font-size:13px; font-weight:600; color:var(--color-eq-price); font-variant-numeric:tabular-nums;">7,643.00</span>

<!-- Modal title -->
<h2 style="font-size:20px; font-weight:700; color:var(--color-text-primary);">New Internal User</h2>

<!-- Placeholder text -->
<span style="font-size:14px; color:var(--color-text-tertiary);">Enter value...</span>
```

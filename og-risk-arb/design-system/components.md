# OG Risk Arb — Component Reference
HTML + usage notes for every component. Use these exact patterns — do not write new CSS for anything listed here.

---

## Sidebar (left icon-only nav)

```html
<aside class="sidebar">
  <!-- OG logo circle -->
  <div class="sidebar-logo" title="OG Risk Arb">OG</div>

  <!-- Nav items -->
  <button class="sidebar-item active" title="Dashboard">
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="2" width="6" height="6" rx="1"/><rect x="10" y="2" width="6" height="6" rx="1"/>
      <rect x="2" y="10" width="6" height="6" rx="1"/><rect x="10" y="10" width="6" height="6" rx="1"/>
    </svg>
  </button>
  <button class="sidebar-item" title="Open Deals">
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
      <polyline points="3,9 7,13 15,5"/>
    </svg>
  </button>
  <button class="sidebar-item" title="Deal History">
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
      <circle cx="9" cy="9" r="7"/><polyline points="9,5 9,9 12,11"/>
    </svg>
  </button>
  <button class="sidebar-item" title="Reports">
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
      <path d="M4 2h7l4 4v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/>
      <polyline points="11,2 11,6 15,6"/><line x1="7" y1="10" x2="11" y2="10"/><line x1="7" y1="13" x2="11" y2="13"/>
    </svg>
  </button>

  <div class="sidebar-spacer"></div>

  <div class="sidebar-bottom">
    <button class="sidebar-item" title="User Behaviour">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
        <circle cx="9" cy="6" r="3"/><path d="M3 16a6 6 0 0 1 12 0"/>
      </svg>
    </button>
  </div>
</aside>
```
JS: toggle `.active` on click, update `aria-current`.

---

## Tab Bar (deal tabs)

```html
<div class="tab-bar" role="tablist">
  <!-- Fixed/pinned tab -->
  <button class="tab active" role="tab" aria-selected="true">
    Dashboard
  </button>
  <!-- Deal tab with close button -->
  <button class="tab" role="tab" aria-selected="false">
    Makor Group / Acme Corp
    <button class="tab-close" aria-label="Close tab" onclick="closeTab(event, this)">
      <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
        <path d="M2 2l6 6M8 2l-6 6"/>
      </svg>
    </button>
  </button>
  <button class="tab" role="tab" aria-selected="false">
    TechCorp / GlobalFund
    <button class="tab-close" aria-label="Close tab" onclick="closeTab(event, this)">
      <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
        <path d="M2 2l6 6M8 2l-6 6"/>
      </svg>
    </button>
  </button>
</div>
```
JS: on tab click, add `.active` + `aria-selected="true"`, remove from siblings. Close button stops propagation.

---

## Buttons

### Dark fill — "Edit Deal", "Save Changes"
```html
<button class="btn btn-dark">Edit Deal</button>
<button class="btn btn-dark">Save Changes</button>
```

### Brand fill — teal
```html
<button class="btn btn-brand">Add Deal</button>
```

### Outlined — "Cancel", secondary
```html
<button class="btn btn-outline">Cancel</button>
```

### Ghost — teal text, no border
```html
<button class="btn btn-ghost">View All</button>
```

### Large (primary action)
```html
<button class="btn btn-dark btn-lg">Save Changes</button>
```

### Small (compact)
```html
<button class="btn btn-outline btn-sm">Download</button>
<button class="btn btn-dark btn-sm">Edit</button>
```

### Icon button
```html
<button class="btn-icon" title="Filter">
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
    <path d="M2 4h12M4 8h8M6 12h4"/>
  </svg>
</button>
```

### Link style
```html
<button class="btn-link">View deal details</button>
<a class="btn-link" href="#">Open in Figma</a>
```

### Disabled
```html
<button class="btn btn-dark" disabled>Saving...</button>
```

---

## Open / Closed Toggle (segmented control)

```html
<div class="toggle-group" role="radiogroup">
  <button class="toggle-btn active" role="radio" aria-checked="true" onclick="setDeals(this,'open')">Open</button>
  <button class="toggle-btn" role="radio" aria-checked="false" onclick="setDeals(this,'closed')">Closed</button>
</div>
```
JS: toggle `.active` on click.

---

## Filter Pills (deal type chips)

```html
<div style="display:flex; flex-wrap:wrap; gap:8px;" role="group">
  <button class="filter-pill active">All</button>
  <button class="filter-pill">Cash Deals <span class="filter-pill-count">21</span></button>
  <button class="filter-pill">Cash-Stock Deals <span class="filter-pill-count">15</span></button>
  <button class="filter-pill">Stock Deals <span class="filter-pill-count">8</span></button>
  <button class="filter-pill">Other <span class="filter-pill-count">4</span></button>
</div>
```
JS: toggle `.active` on click. Only one active at a time.

---

## Search Bar

```html
<div class="search-wrap">
  <span class="search-icon">
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
      <circle cx="6" cy="6" r="4"/><path d="M10 10l2.5 2.5"/>
    </svg>
  </span>
  <input type="search" class="search-input" placeholder="Search deals, companies...">
</div>
```

---

## Form Inputs

### Text input (standard)
```html
<div class="field">
  <label class="field-label">Deal Name</label>
  <div class="field-wrap">
    <input type="text" class="field-input" placeholder="Enter deal name">
  </div>
</div>
```

### Textarea
```html
<div class="field">
  <label class="field-label">Description</label>
  <div class="field-wrap">
    <textarea class="field-input field-textarea" placeholder="Enter deal description..."></textarea>
  </div>
</div>
```

### Error state
```html
<div class="field">
  <label class="field-label">Deal Value</label>
  <div class="field-wrap">
    <input type="text" class="field-input error" value="abc">
  </div>
  <span class="field-error show">Please enter a valid dollar amount.</span>
</div>
```

---

## Select / Dropdown

```html
<div class="field">
  <label class="field-label">Deal Status</label>
  <div class="select-wrap">
    <select class="select-native">
      <option value="" disabled selected>Select status</option>
      <option value="definitive">Definitive Agreement</option>
      <option value="proposal">Proposal</option>
      <option value="pending">Pending</option>
      <option value="closed">Closed</option>
      <option value="terminated">Terminated</option>
    </select>
  </div>
</div>
```

---

## Deal Status Badges

```html
<!-- Definitive Agreement / Closed -->
<span class="badge badge-definitive">Definitive Agreement</span>
<span class="badge badge-definitive">Closed</span>

<!-- Cash Merger / Deal type -->
<span class="badge badge-cash">Cash Merger</span>
<span class="badge badge-cash">Cash</span>

<!-- Proposal / Pending -->
<span class="badge badge-proposal">Proposal</span>
<span class="badge badge-proposal">Pending</span>

<!-- Terminated / Withdrawn -->
<span class="badge badge-terminated">Terminated</span>
<span class="badge badge-terminated">Withdrawn</span>

<!-- Neutral — sector tags, labels -->
<span class="badge badge-neutral">Technology</span>
<span class="badge badge-neutral">Healthcare</span>
<span class="badge badge-neutral">Cash-Stock</span>
```

### % Change values (inline text, not badges)
```html
<span class="badge-positive">+3.24%</span>
<span class="badge-negative">-1.87%</span>
```

---

## Deal List Table

```html
<table class="data-table">
  <thead>
    <tr>
      <th class="sortable">Deal Title <span class="sort-icon">▲▼</span></th>
      <th class="sortable">Start Date</th>
      <th class="sortable">End Date</th>
      <th>Status</th>
      <th>Deal Type</th>
    </tr>
  </thead>
  <tbody>
    <tr class="highlighted">
      <td><a class="col-deal-title" href="#">Makor Group / Acme Corporation</a></td>
      <td class="col-date">Jan 15, 2026</td>
      <td class="col-date">Jun 30, 2026</td>
      <td><span class="badge badge-definitive">Definitive</span></td>
      <td><span class="badge badge-cash">Cash</span></td>
    </tr>
    <tr>
      <td><a class="col-deal-title" href="#">TechCorp / Global Fund Partners</a></td>
      <td class="col-date">Feb 01, 2026</td>
      <td class="col-date">Aug 15, 2026</td>
      <td><span class="badge badge-proposal">Proposal</span></td>
      <td><span class="badge badge-neutral">Cash-Stock</span></td>
    </tr>
    <tr>
      <td><a class="col-deal-title" href="#">Alpha Industries / Beta Holdings</a></td>
      <td class="col-date">Mar 10, 2026</td>
      <td class="col-date">—</td>
      <td><span class="badge badge-terminated">Terminated</span></td>
      <td><span class="badge badge-cash">Cash</span></td>
    </tr>
  </tbody>
</table>
```
`.highlighted` class on a row applies the teal ghost background.

---

## Card / Panel

```html
<div class="card">
  <div class="card-header">
    <span class="card-title">Upcoming Events</span>
    <button class="btn-icon" title="Filter">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
        <path d="M2 4h12M4 8h8M6 12h4"/>
      </svg>
    </button>
  </div>
  <div class="card-body">
    <!-- content -->
  </div>
</div>
```

---

## Accordion (deal detail sections)

```html
<div class="accordion open" id="acc-conditions">
  <div class="accordion-header" onclick="toggleAccordion('acc-conditions')">
    Conditions
    <svg class="accordion-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
      <polyline points="4,6 8,10 12,6"/>
    </svg>
  </div>
  <div class="accordion-body">
    <p style="font-size:14px; color:var(--color-text-primary); line-height:1.6;">
      Regulatory approval from FTC required. Shareholder vote scheduled for Q3 2026.
      Material adverse change clause applies.
    </p>
  </div>
</div>

<div class="accordion" id="acc-dates">
  <div class="accordion-header" onclick="toggleAccordion('acc-dates')">
    Dates Summary
    <svg class="accordion-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
      <polyline points="4,6 8,10 12,6"/>
    </svg>
  </div>
  <div class="accordion-body">
    <!-- dates content -->
  </div>
</div>
```
```js
function toggleAccordion(id) {
  document.getElementById(id).classList.toggle('open');
}
```

---

## Deal Info Rows (key-value pairs)

```html
<div class="info-row">
  <span class="info-label">Acquirer</span>
  <span class="info-value">Makor Group</span>
</div>
<div class="info-row">
  <span class="info-label">Target</span>
  <span class="info-value">Acme Corporation</span>
</div>
<div class="info-row">
  <span class="info-label">Deal Value</span>
  <span class="info-value">$2.4B</span>
</div>
<div class="info-row">
  <span class="info-label">Premium</span>
  <span class="info-value"><span class="badge-positive">+24.3%</span></span>
</div>
<div class="info-row">
  <span class="info-label">Industry</span>
  <span class="info-value">
    <span class="badge badge-neutral">Technology</span>
  </span>
</div>
```

---

## Comment / Update Feed

```html
<div class="comment-list">
  <div class="comment">
    <div class="comment-avatar">PR</div>
    <div class="comment-body">
      <div class="comment-meta">
        <span class="comment-author">Polina Rozenblit</span>
        <span class="comment-time">Today at 2:34 PM</span>
      </div>
      <p class="comment-text">Updated deal terms — regulatory approval timeline pushed to Q4. Shareholder vote confirmed for September 15.</p>
    </div>
  </div>
  <div class="comment">
    <div class="comment-avatar">OG</div>
    <div class="comment-body">
      <div class="comment-meta">
        <span class="comment-author">Oscar Gruss</span>
        <span class="comment-time">Yesterday at 11:22 AM</span>
      </div>
      <p class="comment-text">Initial deal analysis complete. Spread currently at 3.2%. Recommend monitoring for competing bids.</p>
    </div>
  </div>
</div>
```

---

## PDF Attachment Card

```html
<div class="attachment-card">
  <div class="attachment-icon">
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
      <path d="M4 2h7l4 4v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/>
      <polyline points="11,2 11,6 15,6"/>
    </svg>
  </div>
  <div class="attachment-info">
    <div class="attachment-name">Merger_Agreement_MakorGroup_2026.pdf</div>
    <div class="attachment-meta">PDF · 2.4 MB · Added Jan 16, 2026</div>
  </div>
  <button class="btn btn-outline btn-sm">Download</button>
</div>
```

---

## Event Card (upcoming events)

```html
<div class="event-card">
  <div class="event-date-block">
    <span class="event-date-day">15</span>
    <span class="event-date-month">Sep</span>
  </div>
  <div class="event-info">
    <div class="event-title">Shareholder Vote — Makor / Acme</div>
    <div class="event-desc">Special meeting of Acme Corporation shareholders to vote on merger approval.</div>
  </div>
</div>
<div class="event-card">
  <div class="event-date-block">
    <span class="event-date-day">28</span>
    <span class="event-date-month">Sep</span>
  </div>
  <div class="event-info">
    <div class="event-title">FTC Filing Deadline</div>
    <div class="event-desc">Hart-Scott-Rodino Act filing deadline for TechCorp / Global Fund transaction.</div>
  </div>
</div>
```

---

## User Avatar (top-right)

```html
<div class="user-avatar" title="Polina Rozenblit">PR</div>
```

---

## Section Labels

```html
<!-- Gray section label (table/panel headings) -->
<span class="section-label">Deal Pipeline</span>

<!-- Teal section label (emphasized) -->
<span class="section-label-brand">Active Deals</span>
```

---

## Divider

```html
<!-- Simple divider -->
<div class="divider"></div>

<!-- Labeled divider -->
<div class="divider-labeled">
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
  void t.offsetWidth;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}
// Usage:
showToast('Deal updated successfully.', 'positive');
showToast('Failed to save changes.', 'negative');
showToast('Deal exported to PDF.');
```

---

## Typography — Quick Reference

```html
<!-- Page heading -->
<h1 style="font-size:24px; font-weight:700; color:var(--color-text-primary); letter-spacing:-0.02em;">Deal Monitor</h1>

<!-- Section heading -->
<h2 style="font-size:18px; font-weight:600; color:var(--color-text-primary);">Upcoming Events</h2>

<!-- Card title -->
<span style="font-size:15px; font-weight:600; color:var(--color-text-primary);">Makor Group / Acme Corp</span>

<!-- Body / description -->
<p style="font-size:14px; color:var(--color-text-secondary); line-height:1.6;">Deal terms and conditions text goes here.</p>

<!-- Table header -->
<span class="section-label">Deal Title</span>

<!-- Deal title link -->
<a style="color:var(--color-text-link); font-weight:500; text-decoration:none;" href="#">Makor Group / Acme Corp</a>

<!-- Metadata / timestamp -->
<span style="font-size:12px; color:var(--color-text-tertiary);">Jan 15, 2026 · 2:34 PM</span>

<!-- Positive % change -->
<span class="badge-positive">+3.24%</span>

<!-- Negative % change -->
<span class="badge-negative">-1.87%</span>
```

---

## User Behaviour Table (expandable rows)

```html
<table class="data-table">
  <thead>
    <tr>
      <th>Company / Client</th>
      <th>Deals Viewed</th>
      <th>Last Activity</th>
      <th>Session Duration</th>
    </tr>
  </thead>
  <tbody>
    <!-- Group header row -->
    <tr style="background:var(--color-surface-2); cursor:pointer;" onclick="toggleGroup(this)">
      <td colspan="4">
        <span style="font-weight:600; color:var(--color-text-primary);">Makor Capital</span>
        <span style="font-size:12px; color:var(--color-text-tertiary); margin-left:8px;">3 users</span>
      </td>
    </tr>
    <!-- Child rows -->
    <tr>
      <td style="padding-left:32px;">Polina Rozenblit</td>
      <td>24</td>
      <td class="col-date">Today, 2:34 PM</td>
      <td>1h 42m</td>
    </tr>
    <tr>
      <td style="padding-left:32px;">Oscar Gruss</td>
      <td>18</td>
      <td class="col-date">Yesterday, 11:22 AM</td>
      <td>55m</td>
    </tr>
  </tbody>
</table>
```

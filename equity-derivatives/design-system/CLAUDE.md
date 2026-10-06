# Equity Derivatives Auction — Design System
**For Claude agents building or modifying this platform**

Load this file at the start of any session working on equity-derivatives. All design decisions must follow these rules. Do not invent, substitute, or "improve" values.

## Companion files — load these too
- `components.css` — full CSS for all components, all states
- `components.md` — copy-paste HTML for every component with JS behavior notes
- `tokens.css` — all design tokens as CSS custom properties
- `tokens.json` — same tokens in JSON for programmatic access

**When implementing any UI:** check `components.md` first. If the component exists there, use that exact HTML + the corresponding CSS class. Do not write new CSS for something already in the component library.

---

## What this platform is

Equity Derivatives Auction is a dark-mode, desktop-only web platform for institutional traders running equity derivatives auctions (Cash Close, EFP, and similar session types). Traders place bid/ask prices across multiple instruments (FTSE 100 IDX FUT, CAC40, EURO STOXX 50) with real-time equilibrium price calculation and countdown timers.

The platform has two main runtime contexts:
- **Auction view** — the primary trading view; shows active/upcoming auction session cards grouped by session, each with an instrument table and inline bid/ask inputs
- **Admin view** — manages internal users and client accounts; features user list tables, modals for creating/editing users and clients

The "M" (Makor) logo appears in teal (`#7AEFEF`) in the top-left of the narrow left sidebar.

---

## Non-negotiables

- **Dark mode only.** The entire platform is dark. `#151729` page background, `#1E2035` cards, `#252740` modals. Do not add light mode or media-query overrides.
- **Desktop only.** No responsive breakpoints. Minimum width is effectively ~1200px. Do not add mobile layouts.
- **Brand color is `#7AEFEF` (teal).** Used on Confirm/Save/Add buttons, the M logo, equilibrium price labels, focus borders, checkbox checked states, and active toggles.
- **Cancel/danger color is `#E57373` (coral/salmon).** Used on the Cancel auction dropdown button and Reject button. Never use `#EF4444` red for the cancel button — that is exclusively for input error states.
- **Error input border is `#EF4444`.** Only for validation errors (e.g. Bid >= Ask). Do not confuse with coral cancel.
- **Timer / warning amber is `#F59E0B`.** Used on Time Left badge text, Starting In badge text, and warning tooltips (e.g. "Bid should be lower than Ask").
- **Success / "in the mix" green is `#4DCC9B`.** Used on the "In the mix" badge only.
- **Border radius is 6px for buttons and inputs, 8px for cards, 10px for modals.** Do not use 4px except for inner micro-badges.
- **Font is Inter.** Clean sans-serif throughout. Bid/ask numeric inputs should use `font-variant-numeric: tabular-nums` to ensure consistent character width.
- **No gradients.** No decorative effects. Flat dark surfaces only.
- **No Tailwind or CSS frameworks.** All styles are custom.

---

## Color Reference

### Brand
| Token | Value | Use |
|---|---|---|
| `--color-brand` | `#7AEFEF` | Confirm/Save/Add buttons, M logo, equilibrium price label, focus borders, active toggles, checked checkboxes |
| `--color-brand-hover` | `#5ADADA` | Button hover background |
| `--color-brand-ghost` | `rgba(122,239,239,0.10)` | Focus rings, subtle bg tints |
| `--color-brand-ghost-border` | `rgba(122,239,239,0.25)` | Subtle teal borders |

### Surfaces (dark)
| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#151729` | Page background — dark navy |
| `--color-surface` | `#1E2035` | Cards, auction session cards |
| `--color-surface-raised` | `#252740` | Modals, dialogs |
| `--color-input-bg` | `#1A1B2E` | Inline bid/ask inputs, modal text inputs |
| `--color-sidebar-bg` | `#0F1123` | Narrow left sidebar |

### Text
| Token | Value | Use |
|---|---|---|
| `--color-text-primary` | `#F0F0F8` | All body text, instrument names, prices |
| `--color-text-secondary` | `#8B8EA8` | Labels, metadata, column headers, min size text |
| `--color-text-tertiary` | `#5A5C70` | Placeholders, dim metadata |
| `--color-text-on-brand` | `#000000` | Text ON teal buttons |
| `--color-text-on-coral` | `#FFFFFF` | Text on coral Cancel button |

### Borders
| Token | Value | Use |
|---|---|---|
| `--color-border` | `#2D2F4A` | All cards, inputs, table dividers |
| `--color-border-focus` | `#7AEFEF` | Input focus border |

### Cancel / Auction Cancel (coral)
| Token | Value | Use |
|---|---|---|
| `--color-cancel` | `#E57373` | Cancel auction dropdown button bg, Reject button border/text |
| `--color-cancel-hover` | `#EF5350` | Cancel button hover |

### Status
| Token | Value | Use |
|---|---|---|
| `--color-status-success` | `#4DCC9B` | "In the mix" badge text |
| `--color-status-success-bg` | `rgba(77,204,155,0.15)` | "In the mix" badge background |
| `--color-status-danger` | `#EF4444` | Error input border (Bid >= Ask validation) |
| `--color-status-warning` | `#F59E0B` | Timer badge text, warning tooltip text |
| `--color-status-warning-bg` | `rgba(245,158,11,0.12)` | Timer badge background |
| `--color-status-warning-border` | `rgba(245,158,11,0.25)` | Timer badge border |

### Toggle / Checkbox
| Token | Value | Use |
|---|---|---|
| `--color-toggle-active` | `#7AEFEF` | Active toggle track, checked checkbox bg |
| `--color-toggle-inactive` | `#4A4B60` | Inactive toggle track, unchecked checkbox border |

---

## Typography

- **Body base:** 14px (`--text-md`) / 1.5 / Inter / weight 400
- **Instrument names:** 14px bold (`--font-bold`)
- **Metadata (min size, etc.):** 13px (`--text-base`) / `--color-text-secondary`
- **Column headers:** 12px (`--text-sm`) / uppercase / `letter-spacing: 0.08em` / `--color-text-secondary`
- **Bid/Ask inputs:** 14px / `font-variant-numeric: tabular-nums` — ensures aligned columns
- **Session heading:** 16px bold
- **Modal heading:** 20–24px bold
- **Timer badge text:** 12–13px / `--color-status-warning`

### Size scale
```
10px  --text-xs    micro labels, secondary metadata
12px  --text-sm    column headers, badges, timestamps
13px  --text-base  table metadata, min size, secondary values
14px  --text-md    body, buttons, inputs, instrument names     ← standard UI text
16px  --text-lg    platform title, session heading
18px  --text-xl    page headings
22px  --text-2xl   large section titles
24px  --text-3xl   modal headings
```

---

## Spacing

```
4px   --space-1   icon gaps, badge padding
6px   --space-2   tight row gaps
8px   --space-3   small row gap, checkbox gap
10px  --space-4
12px  --space-5   table cell padding (tight)
14px  --space-6
16px  --space-7   standard card/input padding, column gap
18px  --space-8
20px  --space-9   section gap, card padding
24px  --space-10  card section gap
28px  --space-12
32px  --space-14  modal padding
40px  --space-16  page padding
```

---

## Control heights

```
24px  --h-chip       inline badges
28px  --h-badge      timer badge, type badge (EFP, Cash Close)
32px  --h-btn-sm     compact icon-only or tight buttons
36px  --h-btn        standard buttons (Confirm, Cancel, Save Changes, Add New)
36px  --h-input      auction bid/ask inline inputs
40px  --h-input-modal modal form inputs (Username, Email, Name)
52px  --h-nav        top header bar
```

---

## Border radius

```
4px   --radius-sm   inner badges, micro chips
6px   --radius      buttons, inputs, small dropdowns
8px   --radius-md   auction session cards, panels
10px  --radius-lg   modals, dialogs
999px --radius-pill  pill badges
50%   --radius-full  avatars, toggle thumbs
```

---

## Shadows (dark theme)

```
Card:         0 2px 12px rgba(0,0,0,0.30)
Card LG:      0 4px 24px rgba(0,0,0,0.40), 0 2px 4px rgba(0,0,0,0.20)
Modal:        0 8px 40px rgba(0,0,0,0.50), 0 2px 8px rgba(0,0,0,0.30)
Dropdown:     0 4px 20px rgba(0,0,0,0.40)
Tooltip:      0 4px 16px rgba(0,0,0,0.50)
Focus:        0 0 0 3px rgba(122,239,239,0.20)
Notification: 0 8px 32px rgba(0,0,0,0.45)
```

---

## Transitions

```
0.08s  --duration-instant   button :active scale
0.12s  --duration-fast      color/opacity changes, hover
0.15s  --duration-base      borders, backgrounds
0.18s  --duration-normal    inputs, focus rings
0.20s  --duration-enter     element entry
0.28s  --duration-slide     dropdown slide
0.22s  --duration-modal     modal fade in/out
```

Easing: `ease` for most. `cubic-bezier(0.0,0.0,0.2,1)` for dropdowns.

---

## Components — Key Rules

### Buttons
- **Primary (teal — Confirm / Save Changes / Add New):** `background #7AEFEF`, `color #000`, `height 36px`, `px 16px`, `border-radius 6px`, hover → `#5ADADA`
- **Cancel auction (coral — dropdown trigger):** `background #E57373`, `color #FFF`, `height 36px`, `border-radius 6px`, hover → `#EF5350`
- **Reject (outlined coral):** `border 1.5px solid #E57373`, `color #E57373`, `background transparent`, hover → `rgba(229,115,115,0.10)`
- **Modal Cancel / Close (white):** `background #FFFFFF`, `color #1A1B2E`, `height 36px`, `border-radius 6px`, hover → `rgba(255,255,255,0.85)`
- All buttons: `font-size 14px`, `font-weight 600`, `:active scale(0.98)`

### Inline Bid/Ask Inputs (auction table)
- Height: `36px`, background: `#1A1B2E`, border: `1px solid #2D2F4A`, radius: `6px`
- Font: `14px`, `font-variant-numeric: tabular-nums`, `text-align: right`
- Focus: `border-color #7AEFEF`, `box-shadow: 0 0 0 3px rgba(122,239,239,0.20)`
- Error (Bid >= Ask): `border-color #EF4444`, `box-shadow: 0 0 0 3px rgba(239,68,68,0.15)`
- Placeholder: `color #5A5C70`

### Modal Form Inputs
- Height: `40px`, background: `#1A1B2E`, border: `1px solid #2D2F4A`, radius: `6px`
- Same focus + error states as auction inputs

### Session Card (auction card)
- Background: `#1E2035`, border: `1px solid #2D2F4A`, border-radius: `8px`
- Shadow: `var(--shadow-card)`
- Session header row: left — session name (bold, 16px) + type badge (EFP/Cash Close) + timer badge; right — Cancel dropdown button (coral)
- Instrument sub-rows: instrument name (14px bold) + min size (13px secondary) + equilibrium price (teal label)

### Timer Badge (Time Left / Starting In)
- Background: `rgba(245,158,11,0.12)`, border: `1px solid rgba(245,158,11,0.25)`
- Text: `#F59E0B`, `font-size 12px`, `font-weight 600`, border-radius: `6px`
- Contains a clock icon and the countdown string

### Session Type Badge (EFP / Cash Close)
- Background: `rgba(122,239,239,0.10)`, border: `1px solid rgba(122,239,239,0.25)`
- Text: `#7AEFEF`, `font-size 12px`, `font-weight 600`, border-radius: `6px`

### "In the mix" Badge
- Background: `rgba(77,204,155,0.15)`, text: `#4DCC9B`
- Displays a green checkmark icon + "In the mix" text, `font-size 12px bold`
- Appears inline below a bid row when the order is competitive

### Warning Tooltip (Bid > Ask validation)
- Background: `rgba(245,158,11,0.12)`, border: `1px solid rgba(245,158,11,0.25)`
- Text: `#F59E0B`, `font-size 12px`
- Contains a ⚠ warning icon + "Bid should be lower than Ask"
- Appears inline below the input row when validation fails

### Cancel Dropdown Menu
- Background: `#252740`, border: `1px solid #2D2F4A`, border-radius: `8px`
- Shadow: `var(--shadow-dropdown)`
- Options: "All Bid" / "All Ask" / "All" — each is a `14px` clickable row, hover → `rgba(255,255,255,0.05)` bg
- Trigger: coral button with a chevron-down icon on the right

### Order Confirmation Notification (top-right)
- Background: `#252740`, border: `1px solid #2D2F4A`, border-radius: `10px`
- Shadow: `var(--shadow-notification)`
- "Orders placed: Your Buy EURO STOXX 50 Sep25 CC: 400 @ 41" — `14px text-primary`
- Two buttons: "Reject" (outlined coral) + "Confirm" (teal fill), both `height 36px`

### Toggle Switch (Active/Inactive)
- Track: `40px × 22px`, border-radius: `999px`
- Active: track `#7AEFEF`, thumb `#FFFFFF`
- Inactive: track `#4A4B60`, thumb `#FFFFFF`
- Transition: `0.15s ease`

### Checkbox
- Size: `16×16px`, border-radius: `4px`
- Unchecked: `border 1px solid #4A4B60`, background: `#1A1B2E`
- Checked: background `#7AEFEF`, border-color `#7AEFEF`, black checkmark inside

### Modals (New/Edit User, Edit Client)
- Background: `#252740`, border-radius: `10px`, shadow: `var(--shadow-modal)`
- Overlay: `rgba(0,0,0,0.55)`
- Header: modal title in `20px bold text-primary`
- Form fields: standard modal inputs (`40px`, dark bg)
- Footer: Cancel (white btn) + primary action (teal btn)

### Admin User Table
- Header: `12px uppercase secondary`, `letter-spacing 0.08em`
- Row: `14px text-primary`, row hover: `rgba(255,255,255,0.03)` bg
- First column: checkbox, then Username, First Name, Last Name, Email Address

### Left Sidebar (icon-only nav)
- Width: `56px`, background: `#0F1123`
- M logo at top: teal `#7AEFEF`
- Icon buttons: `40×40px`, border-radius `8px`, icon color `--color-text-secondary`
- Active nav icon: icon color `#7AEFEF`, background `rgba(122,239,239,0.10)`

### Top Header Bar
- Height: `52px`, background: `#1E2035`, border-bottom: `1px solid #2D2F4A`
- Left: platform title ("Equity Derivatives Auction", `16px semibold`) + breadcrumb
- Right: user avatar (32px circle, initials)

### Breadcrumb Navigation
- `13px text-secondary` with `›` separators
- Active/current page: `text-primary`, `font-weight 500`

---

## What NOT to do

- Do not use light mode or add `prefers-color-scheme: light` overrides
- Do not use Tailwind or any CSS framework
- Do not use border-radius above 10px (modals) or below 4px (except `50%` for circles)
- Do not use colors outside this system without designer approval
- Do not use `#EF4444` (error red) for the Cancel button — that color is only for validation errors
- Do not use `#E57373` (coral) for validation errors — that is the Cancel/Reject color
- Do not hardcode hex values in component CSS — always reference `var(--color-*)` tokens
- Do not add gradients or decorative shadows beyond what is defined above
- Do not make the layout responsive — desktop only, fixed-width sidebar
- Do not change the teal `#7AEFEF` for the M logo or Confirm button — it must match across components

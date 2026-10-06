# OG Risk Arb — Design System
**For Claude agents building or modifying this platform**

Load this file at the start of any session working on og-risk-arb. All design decisions must follow these rules. Do not invent, substitute, or "improve" values.

## Companion files — load these too
- `components.css` — full CSS for all components, all states
- `components.md` — copy-paste HTML for every component with JS behavior notes
- `tokens.css` — all design tokens as CSS custom properties
- `tokens.json` — same tokens in JSON for programmatic access

**When implementing any UI:** check `components.md` first. If the component exists there, use that exact HTML + the corresponding CSS class. Do not write new CSS for something already in the component library.

---

## What this platform is

OG Risk Arb is a **desktop-only, light-mode research and deal monitoring platform** for Oscar Gruss Risk Arbitrage (mergers & acquisitions). It is NOT a trading platform — it is a deal tracker and research tool for risk arbitrage professionals.

Users track M&A deals, monitor deal status (Definitive Agreement, Proposal, Terminated), view upcoming events and timelines, read recent updates/commentary, and analyze deal details including acquirer/target info, conditions, dates, and descriptions.

The aesthetic is professional, data-dense, and clean — suited for institutional research. Reference: Bloomberg research portal, Refinitiv Eikon research views, FactSet deal monitor.

The brand is "Oscar Gruss" with an "OG" circular teal logo.

---

## Non-negotiables

- **Primary font is Inter.** Clean, modern sans-serif. No DM Sans, no DM Mono.
- **Brand color is `#1B8C8C`.** Deep teal — not bright cyan. This is a research tool, not a trading terminal.
- **Border radius is 6px** for cards, buttons, inputs, dropdowns. Status badges use `999px` (pill). The OG logo is circular (`50%`).
- **Light mode only.** No dark mode.
- **No trading colors.** There is no BID/ASK convention here. Green (`#22C55E`) means positive % change. Red (`#EF4444`) means negative % change.
- **No gradients, no decorative effects.** Flat surfaces.
- **No Tailwind or CSS frameworks.** All styles are custom.
- **No monospace for body copy.** Inter everywhere. Numerical data (dates, percentages) uses Inter as well — this is a research tool, not a price feed.
- **Sidebar is icon-only, 56px wide.** Active icon gets teal fill/background. No text labels in sidebar.
- **Tab bar uses underline-only active state** — no background fill on tabs. Teal underline `2px solid #1B8C8C`.

---

## Color System

### Brand
| Token | Value | Use |
|---|---|---|
| `--color-brand` | `#1B8C8C` | Active sidebar icons, active tab underline, links, focus, buttons |
| `--color-brand-hover` | `#156B6B` | Hover states |
| `--color-brand-ghost` | `rgba(27,140,140,0.08)` | Highlighted row backgrounds, subtle bg tints |
| `--color-brand-focus` | `rgba(27,140,140,0.12)` | Focus rings |
| `--color-brand-ghost-border` | `rgba(27,140,140,0.24)` | Subtle teal borders |

### Surfaces
| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#F5F6F8` | Page background |
| `--color-surface` | `#FFFFFF` | Cards, panels, sidebar, modals |
| `--color-surface-2` | `#F5F6F8` | Inputs default bg, raised areas |

### Text
| Token | Value | Use |
|---|---|---|
| `--color-text-primary` | `#1A1A28` | All body text, headings |
| `--color-text-secondary` | `#6B7896` | Labels, subtitles, column headers |
| `--color-text-tertiary` | `#A0AABC` | Placeholders, metadata, timestamps |
| `--color-text-on-brand` | `#FFFFFF` | Text ON the teal (active sidebar icon areas) |
| `--color-text-link` | `#1B8C8C` | Deal title links, teal anchor text |

### Borders
| Token | Value | Use |
|---|---|---|
| `--color-border` | `#E5E7EC` | All inputs, cards, table cells |
| `--color-border-focus` | `#1B8C8C` | Input focus border |

### Status & % Change
| Token | Value | Use |
|---|---|---|
| `--color-status-positive` | `#22C55E` | Positive % change |
| `--color-status-negative` | `#EF4444` | Negative % change |
| `--color-status-warning` | `#D97706` | Warning / pending |

### Deal Status Badges
| Badge type | Background | Text |
|---|---|---|
| Definitive / Closed | `rgba(34,197,94,0.12)` | `#16A34A` |
| Cash Merger / Cash | `rgba(27,140,140,0.12)` | `#1B8C8C` |
| Proposal / Pending | `rgba(245,158,11,0.12)` | `#D97706` |
| Terminated / Withdrawn | `rgba(239,68,68,0.10)` | `#DC2626` |
| Neutral (sector tags) | `rgba(107,120,150,0.10)` | `#6B7896` |

---

## Typography

- **Body base:** 14px / 1.5 / Inter / weight 400
- **Section titles / card headings:** 14–16px, weight 600
- **Page headings:** 18–24px, weight 700
- **Table headers:** 12px, weight 600, uppercase, `letter-spacing: 0.06em`, `--color-text-tertiary`
- **Timestamps / metadata:** 12px, weight 400, `--color-text-tertiary`
- **Deal title links:** 14px, weight 500, `--color-text-link`, underline on hover

### Size scale
```
10px  micro labels
12px  badges, table headers, timestamps, form labels
14px  body, buttons, inputs, table cell data  ← standard UI text
15px  emphasized body, card titles
16px  section headings
18px  panel headings
20px  page titles
24px  screen headings
```

---

## Layout

- **Left sidebar:** 56px wide, icon-only, white background, border-right `#E5E7EC`
- **Top tab bar:** pinnable deal tabs, white background, border-bottom `#E5E7EC`, tab height ~40px
- **Main area:** `#F5F6F8` background, 16–24px padding
- **Cards/panels:** white surface, `1px solid #E5E7EC`, 6px radius, `var(--shadow-card)`
- **Two-column deal detail:** left col = deal info + acquirer; right col = deal terms/conditions sidebar

---

## Spacing

```
4px   --space-1   tight icon gaps
6px   --space-2
8px   --space-3   checkbox gap, small row gap
10px  --space-4
12px  --space-5   table cell padding (tight)
14px  --space-6
16px  --space-7   standard card padding, table cell padding
20px  --space-8   card section gap
24px  --space-9   panel gap
28px  --space-10
32px  --space-11  card padding LG
40px  --space-12  page section gap
48px  --space-13  page padding top
```

---

## Control Heights

```
22px  --h-badge     inline badges
24px  --h-chip      deal status badges, filter pills
32px  --h-btn-sm    compact/icon buttons
36px  --h-btn       standard action button
36px  --h-input     text inputs, search bar
40px  --h-btn-lg    primary action button
40px  --h-tab       top tab bar
56px  sidebar width (icon-only left nav)
```

---

## Shadows

```
SM:       0 1px 3px rgba(0,0,0,0.06)
Card:     0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)
Card LG:  0 4px 20px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)
Dialog:   0 8px 40px rgba(0,0,0,0.16)
Dropdown: 0 4px 16px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06)
Focus:    0 0 0 3px rgba(27,140,140,0.12)
```

---

## Transitions

```
0.08s  --duration-instant   button :active scale
0.12s  --duration-fast      color/opacity changes, hover
0.15s  --duration-base      borders, backgrounds
0.20s  --duration-normal    inputs, focus rings
0.22s  --duration-enter     panel entry
0.28s  --duration-slide     slide transitions
```

Easing: `ease` for most. `cubic-bezier(0.0,0,0.2,1)` for enter transitions.

---

## Components — Key Rules

### Sidebar (left nav)
- 56px wide, white background, `border-right: 1px solid #E5E7EC`
- Icon-only — no text labels
- Each nav item: 40×40px clickable area, centered icon, `border-radius: 6px`
- Default icon: `color #A0AABC`
- Active: `background rgba(27,140,140,0.10)`, `color #1B8C8C`
- Hover: `background rgba(27,140,140,0.06)`, `color #1B8C8C`
- OG logo circle at top: 32px, `background #1B8C8C`, white "OG" text, `border-radius: 50%`

### Tab bar (deal tabs)
- White background, `border-bottom: 1px solid #E5E7EC`
- Each tab: `height: 40px`, `padding: 0 16px`, `font-size: 14px`
- Default: `color #6B7896`, no border
- Active: `color #1A1A28`, `border-bottom: 2px solid #1B8C8C`, `font-weight: 600`, `margin-bottom: -1px`
- Hover: `color #1A1A28`
- Close button (×): small, appears on hover, `color #A0AABC`
- Pinned/fixed tab (e.g. Dashboard): always visible

### Buttons
- **Primary (dark fill):** `background #1A1A28`, `color #FFFFFF`, `height: 36px`, `padding: 0 16px`, `border-radius: 6px`, hover `opacity: 0.85`
- **Outlined:** `border: 1px solid #E5E7EC`, `color #1A1A28`, hover `border-color #1B8C8C`, `color #1B8C8C`
- **Brand fill:** `background #1B8C8C`, `color #FFFFFF`, hover `background #156B6B`
- **Ghost / teal text:** no border, `color #1B8C8C`, hover `background rgba(27,140,140,0.08)`
- All buttons: `border-radius: 6px`, `font-size: 14px`, `font-weight: 600`, `:active scale(0.98)`

### Search bar
- Full-width, `height: 36px`, `border: 1px solid #E5E7EC`, `border-radius: 6px`, `background #FFFFFF`
- Prefix search icon: `color #A0AABC`
- Focus: `border-color #1B8C8C`, `box-shadow: var(--shadow-focus)`

### Form inputs
- `height: 36px`, `border: 1px solid #E5E7EC`, `border-radius: 6px`, `background #F5F6F8`
- Focus: `border-color #1B8C8C`, `box-shadow: var(--shadow-focus)`, `background #FFFFFF`
- Placeholder: `color #A0AABC`

### Deal list table
- Columns: Deal Title (link), Start Date, End Date, Status badge, Deal Type badge — plus sort/filter icons
- Header: 12px, weight 600, uppercase, `color #A0AABC`, `letter-spacing: 0.06em`
- Cell: 14px, `color #1A1A28`
- Deal title cell: teal link (`color #1B8C8C`, `font-weight: 500`, underline on hover)
- Row hover: `background rgba(27,140,140,0.04)`
- Highlighted row (e.g. Makor Group): `background rgba(27,140,140,0.08)`

### Deal type filter pills
- Pill-style chips: `border-radius: 999px`, `height: 28px`, `padding: 0 12px`
- Default: `background #FFFFFF`, `border: 1px solid #E5E7EC`, `color #6B7896`
- Active: `background #1B8C8C`, `border-color #1B8C8C`, `color #FFFFFF`
- Count badge inline: `font-weight: 600`

### Open/Closed toggle
- Two-button segmented control
- Active: dark fill `background #1A1A28`, `color #FFFFFF`
- Inactive: `background #FFFFFF`, `border: 1px solid #E5E7EC`, `color #6B7896`

### Status badges
- All badges: `border-radius: 999px`, `height: 22px`, `padding: 0 10px`, `font-size: 12px`, `font-weight: 600`
- See "Deal Status Badges" table above for per-type colors

### Sector / industry tags
- Same pill shape as status badges: `border-radius: 999px`
- Use neutral badge style: `background rgba(107,120,150,0.10)`, `color #6B7896`

### % change display
- Positive: `color #22C55E`, `font-weight: 600`
- Negative: `color #EF4444`, `font-weight: 600`
- Always shown with + or − prefix

### Accordion sections (deal detail)
- Panel with `border: 1px solid #E5E7EC`, `border-radius: 6px`
- Header: `padding: 12px 16px`, `font-weight: 600`, chevron icon rotates on expand
- Body: `padding: 12px 16px`, `border-top: 1px solid #E5E7EC`

### Comment / update feed
- Each entry: avatar circle (initials, teal bg) + name + timestamp + body text
- Avatar: 28px, `border-radius: 50%`, `background #1B8C8C`, `color #FFFFFF`, 12px initials
- Timestamp: 12px, `color #A0AABC`

### PDF attachment card
- `border: 1px solid #E5E7EC`, `border-radius: 6px`, `padding: 12px`
- PDF icon + filename + file size
- Download button: outlined small

### User avatar pill (top right)
- 32px circle, `background #1B8C8C`, `color #FFFFFF`, initials, `border-radius: 50%`

---

## What NOT to do

- Do not use Tailwind or any CSS framework — all styles are custom
- Do not use DM Sans or DM Mono — Inter only
- Do not use bright cyan `#7AEFEF` — that is Enigma X's brand. OG Risk Arb is `#1B8C8C` deep teal
- Do not add dark mode — light mode only
- Do not add trading UI patterns (BID/ASK panels, order book, price ticker) — this is a research tool
- Do not hardcode hex values in component CSS — always reference `var(--color-*)` tokens
- Do not use gradients or decorative shadows beyond what is defined above
- Do not use border-radius above 12px except for pills (999px) and the OG logo circle (50%)
- Do not make the sidebar wider than 56px or add text labels to sidebar icons

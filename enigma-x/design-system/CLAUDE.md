# Enigma X — Design System
**For Claude agents building or modifying this platform**

Load this file at the start of any session working on enigma-x. All design decisions must follow these rules. Do not invent, substitute, or "improve" values.

## Companion files — load these too
- `components.css` — full CSS for all components, all states
- `components.md` — copy-paste HTML for every component with JS behavior notes
- `tokens.css` — all design tokens as CSS custom properties
- `tokens.json` — same tokens in JSON for programmatic access

**When implementing any UI:** check `components.md` first. If the component exists there, use that exact HTML + the corresponding CSS class. Do not write new CSS for something already in the component library.

---

## What this platform is

Enigma X is a real-time spot trading platform for institutional/professional crypto traders (BTC-USD, ETH-USD, etc.). The UI is data-dense: live bid/ask order books, trades blotter, balance panels, RFQ flow. The aesthetic is professional fintech — clean, precise, high-contrast. Reference: Bloomberg Terminal light, Refinitiv Eikon, but minimal and modern.

It has two runtime contexts:
- **Trading web app** — desktop-only, `DM Sans` + `DM Mono`, light mode only
- **Mobile authenticator** — iOS-style shell, same design tokens, touch-optimized controls

---

## Non-negotiables

- **Border radius is always 4px.** Buttons, inputs, badges, cards, dropdowns, toasts — everything. The only exceptions are the mobile shell (variable, `min(44px, 4vw)`) and OTP slots (`8px`).
- **Primary font is DM Sans.** DM Mono is for prices, numbers, codes, and mono-spaced data only — never for labels or UI copy.
- **Brand color is `#7AEFEF`.** The deeper teal `#3DBFBF` is for hover states, eyebrows, and header elements. Never swap them.
- **No gradients.** No decorative effects. Flat surfaces only.
- **Light mode only.** No dark mode — do not add media-query dark mode overrides.
- **BID is always red. ASK is always teal.** This is a financial convention — never reverse it.
- **Prices and quantities always use DM Mono.** This ensures consistent character width in live-updating tables.
- **No Tailwind or CSS frameworks.** All styles are custom.

---

## Figma Color Styles → Token Mapping

| Figma Name | Token | Value |
|---|---|---|
| White | `--color-surface` | `#FFFFFF` |
| Grey 0 | `--color-bg` | `#F7F8F8` |
| Grey 1 | `--color-border` | `#DEE8ED` |
| Grey 2 | `--color-text-secondary` | `#7C9CAC` |
| Grey 3 | `--color-text-primary` | `#1A1F36` |
| Main color | `--color-brand` | `#7AEFEF` |
| Main color hover | `--color-brand-dim` | `#5ADADA` |
| Main color transp | `--color-brand-ghost` | `rgba(122,239,239,0.094)` |
| Main color darker | `--color-brand-dark` | `#3DBFBF` |
| Red | `--color-status-danger` | `#E5686A` |
| Red for text | `--color-status-danger` | `#E5686A` (same — use for text and borders) |
| green | `--color-status-success` | `#4DCC9B` |
| green for text | `--color-status-success` | `#4DCC9B` (same) |
| Black | `--color-text-on-dark` | `#000000` |
| Orange | `--color-status-pending` | `#F59E0B` |

---

## Colors

### Brand
| Token | Value | Use |
|---|---|---|
| `--color-brand` | `#7AEFEF` | Buttons, active states, ASK prices, focus borders, checkmarks |
| `--color-brand-dark` | `#3DBFBF` | Hover states, eyebrow labels, header brand elements |
| `--color-brand-dim` | `#5ADADA` | Button hover background |
| `--color-brand-ghost` | `rgba(122,239,239,0.094)` | Focus rings, subtle bg tints, active chip bg |
| `--color-brand-ghost-border` | `rgba(61,191,191,0.30)` | Subtle teal borders |

### Surfaces
| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#F7F8F8` | Page background |
| `--color-surface` | `#FFFFFF` | Cards, modals, input backgrounds |
| `--color-surface-2` | `#F7F8F8` | Inputs default bg, secondary panels |

### Text
| Token | Value | Use |
|---|---|---|
| `--color-text-primary` | `#1A1F36` | All body text, prices (dark) |
| `--color-text-secondary` | `#7C9CAC` | Labels, subtitles, column headers |
| `--color-text-tertiary` | `#A8BECD` | Placeholders, metadata, section labels |
| `--color-text-on-brand` | `#000000` | Text ON the cyan brand color (button labels) |

### Borders
| Token | Value | Use |
|---|---|---|
| `--color-border` | `#DEE8ED` | All inputs, cards, table cells |
| `--color-border-focus` | `#7AEFEF` | Input focus border |

### Status / Trading
| Token | Value | Use |
|---|---|---|
| `--color-status-success` | `#4DCC9B` | Gain, profit, positive P&L, success |
| `--color-status-danger` | `#E5686A` | Loss, error, negative P&L, BID prices |
| `--color-status-pending` | `#F59E0B` | Pending orders, warnings |
| `--color-status-active` | `#7AEFEF` | Active session, ASK prices, BUY side |

### Trading conventions — do not deviate
- **BID price** → `--color-status-danger` (`#E5686A`)
- **ASK price** → `--color-status-active` (`#7AEFEF`) / `--color-brand`
- **SELL side** → `--color-status-danger`
- **BUY side** → `--color-status-success` or `--color-brand`
- **Positive P&L** → `--color-status-success`
- **Negative P&L** → `--color-status-danger`

---

## Typography

- **Body base:** 14px / 1.5 / DM Sans / weight 400
- **Price display:** DM Mono — always for prices, quantities, IDs, codes, timestamps
- **Eyebrow labels:** 10–12px, weight 700, uppercase, `letter-spacing: 0.08–0.12em`, `--color-brand-dark`
- **Section titles:** 14–16px, weight 600–700
- **Table headers:** 12px, weight 600, uppercase, `letter-spacing: 0.06em`, `--color-text-tertiary`

### Size scale
```
10px  eyebrows (mobile), section micro-labels
12px  badges, form labels, table headers, timestamps
13px  table cell data, secondary values
14px  body, buttons, inputs                ← standard UI text
16px  primary inputs (auth), prominent buttons, screen titles
18px  screen titles (mobile)
20px  section headings
24px  screen titles, OTP display (heading)
38px  OTP code display (mono)
```

---

## Spacing

```
4px   --space-1   tight icon gaps
6px   --space-2
8px   --space-3   checkbox gap, small row gap
10px  --space-4
12px  --space-5   table cell padding (tight), card padding SM
14px  --space-6
16px  --space-7   standard card padding, table cell padding
18px  --space-8
20px  --space-9   section gap
24px  --space-10  card section gap
28px  --space-12
32px  --space-14  card padding LG
40px  --space-16  page padding top
```

---

## Control heights

```
32px  --h-chip       pill badges, chips
36px  --h-btn-sm     compact buttons, session-level actions
48px  --h-input      all text inputs
48px  --h-btn-danger danger outline button
50px  --h-btn        primary action button (desktop/web)
52px  --h-btn-mobile mobile primary button (authenticator)
56px  --h-nav        top navigation bar
```

---

## Shadows

```
Card:     0 2px 10px rgba(0,0,0,0.06)
Card LG:  0 4px 24px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)
Dialog:   0 8px 40px rgba(0,0,0,0.20)
Sheet:    0 -8px 40px rgba(0,0,0,0.18)
Mobile:   0 24px 64px rgba(0,0,0,0.18), 0 0 0 2px rgba(0,0,0,0.07)
Focus:    0 0 0 4px rgba(122,239,239,0.094)
```

---

## Transitions

```
0.08s  --duration-instant   button :active scale
0.12s  --duration-fast      color/opacity changes, hover
0.15s  --duration-base      borders, backgrounds
0.18s  --duration-normal    inputs, focus rings
0.20s  --duration-enter     toast entry
0.28s  --duration-slide     screen slide (screen-to-screen push)
0.38s  --duration-screen    screen transitions
0.42s  --duration-sheet     bottom sheet slide
```

Easing: `ease` for most. `cubic-bezier(0.4,0,0.2,1)` for screen push. `cubic-bezier(0.32,0,0.04,1)` for sheets.

---

## Components — Key Rules

### Buttons
- **Primary:** `background #7AEFEF`, `color #000`, `height 50px (desktop) / 52px (mobile)`, `px 20px`, hover → `#5ADADA`
- **Outlined:** `border 1.5px solid --color-border`, `color --color-text-primary`, hover → border + text darken
- **Dark:** `background --color-text-primary (#1A1F36)`, `color #fff`
- **Danger outline:** `border 1.5px solid --color-status-danger`, `color --color-status-danger`, height 48px
- All buttons: `border-radius 4px`, `font-size 14–16px`, `font-weight 600`, `:active scale(0.98)`

### Inputs
- Height: `48px`, border: `1.5px solid #DEE8ED`, background: `#F7F8F8`, radius: `4px`
- Focus: `border-color #7AEFEF`, `box-shadow: 0 0 0 4px rgba(122,239,239,0.094)`
- Placeholder: `color #A8BECD`
- Error: `border-color #E5686A`, `box-shadow: 0 0 0 4px rgba(229,104,106,0.08)`

### Option toggles (pill-style radio)
- Outlined by default: `border 1px solid #DEE8ED`, `color #1A1F36`, `border-radius 4px`
- Active/selected: `background #7AEFEF`, `border-color #7AEFEF`, `color #000`, `font-weight 600`

### Checkboxes
- Size: `16×16px`, `border-radius 2px`, `border 1px solid #A8BECD`
- Checked: `background #7AEFEF`, `border-color #7AEFEF`, white checkmark inside
- Indeterminate (All): dash icon

### Select / Dropdown
- Same height/border as inputs (48px, 1.5px border)
- Custom chevron: `#A8BECD`, rotates on open
- Options list: `background #fff`, `border 1px solid #DEE8ED`, `box-shadow: 0 8px 32px rgba(0,0,0,0.10)`, `radius 4px`
- Option hover: `background #F7F8F8`
- Selected option: `color #7AEFEF`, `font-weight 600`

### Tables (trading data)
- Header: `12px`, weight `600`, uppercase, `letter-spacing 0.06em`, `color #A8BECD`
- Cell: `13px`, `color #1A1F36`, DM Mono for price/quantity columns
- Row hover: `background #F7F8F8`
- Bid column: `color #E5686A` — always
- Ask column: `color #7AEFEF` — always

### Order type badges (Trades Blotter)
- Badge base: `font-size 12px`, `font-weight 600`, `border-radius 4px`, `padding 2px 8px`
- Market: `background rgba(122,239,239,0.15)`, `color #3DBFBF`
- Limit: light lavender — exact value TBD from Figma (not in color styles panel; may be a component-level hardcoded value)

### Trade side (Buy/Sell) labels
- BUY: `color #4DCC9B`, `font-weight 600`
- SELL: `color #E5686A`, `font-weight 600`

### Tabs (e.g. Trades Blotter | Balance Movement)
- Active: `color #1A1F36`, `border-bottom 2px solid #7AEFEF`, `font-weight 600`
- Inactive: `color #A8BECD`, `border-bottom 2px solid transparent`, `font-weight 500`
- Hover inactive: `color #7C9CAC`

### Section labels (eyebrow pattern)
```css
font-size: 12px;
font-weight: 700;
text-transform: uppercase;
letter-spacing: 0.06em;
color: #A8BECD;
```

### Toast
- `background #000000`, `color #fff`, `border-radius 4px`, `padding 14px 16px`
- Entry: `translateY(80px) → 0` + `opacity 0 → 1` over `0.28s`
- Danger variant: `background #E5686A`

---

## What NOT to do

- Do not use Tailwind or any CSS framework — all styles are custom
- Do not use border-radius above 4px on any UI element (except mobile shell and OTP slots)
- Do not use colors outside this system without designer approval
- Do not use DM Mono for labels, buttons, or UI copy — only for numbers and codes
- Do not reverse BID/ASK colors — BID is always red, ASK is always teal
- Do not add dark mode — light mode only
- Do not add hover animations longer than 0.20s on inputs/buttons
- Do not hardcode hex values in component CSS — always reference `var(--color-*)` tokens
- Do not use gradients or decorative shadows beyond what is defined above

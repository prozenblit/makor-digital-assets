# FX Engine Room — Design System
**For Claude agents building or modifying this platform**

Load this file at the start of any session working on fx-engine-room. All design decisions must follow these rules. Do not invent, substitute, or "improve" values.

## Companion files — load these too
- `components.css` — full CSS for all components, all states
- `components.md` — copy-paste HTML for every component with JS behavior notes
- `tokens.css` — all design tokens as CSS custom properties
- `tokens.json` — same tokens in JSON for programmatic access

**When implementing any UI:** check `components.md` first. If the component exists there, use that exact HTML + the corresponding CSS class. Do not write new CSS for something already in the component library.

---

## What this platform is

FX Engine Room is a **dark-mode desktop-only** FX operations platform operated by Makor Group. It manages trading entities, counterparties, and product permissions for FX operations. Key capabilities:

- **Entity management** — Bank/entity hierarchy (e.g., "Bank of America → RBS EDGE BOA")
- **Trading account setup** — Client and Market Maker account types
- **Product permissions** — Spot, Forwards, Vanilla Options, Exotic Options per account
- **Trader management** — assigning traders to accounts
- **FX trade execution** — "New Trade" entry flow

Layout pattern: icon-only left sidebar + master-detail (list panel + detail panel).  
The brand logo "FX Engine Room" appears in lavender/periwinkle in the top-left corner.  
Footer bar: "M" Makor logo + "FX Engine Room | Operated by Makor Group" + green live dot.

---

## Non-negotiables

- **Dark mode only.** Never add light mode. Background is `#0F0F1E`. Do not use any light-mode values.
- **Desktop only.** No mobile breakpoints, no touch optimizations.
- **Primary font is Inter.** JetBrains Mono (or fallback) is for account IDs, currency codes, and financial data only — never for labels or UI copy.
- **Brand primary is `#8080CC` (lavender/periwinkle).** Used for: logo text, section labels, active list item text, breadcrumb links, focus borders, Log In button fill, product labels.
- **Teal secondary is `#7AEFEF`.** Used for: active toggles, checked checkboxes, Give-Up outlined button, "Add Permissions" outlined button, primary teal action buttons.
- **Amber accent is `#F59E0B`.** Used for: "+" add icon buttons, Group badges.
- **Border radius is 6px** for buttons and inputs. 8px for cards/panels. 12px for modals and the login card. 4px for small badges.
- **No gradients.** Flat dark surfaces only.
- **No Tailwind or CSS frameworks.** All styles are custom, referencing `var(--*)` tokens.
- **All CSS values must reference tokens.** Never hardcode hex values in component CSS.
- **Error state uses `#EF4444` (red)** for border, error text, and "Forgot Password?" link.

---

## Color System

### Brand (Lavender / Periwinkle)
| Token | Value | Use |
|---|---|---|
| `--color-brand` | `#8080CC` | Logo, section labels, active text, breadcrumbs, Log In button, focus border |
| `--color-brand-hover` | `#6B6BB8` | Brand hover state |
| `--color-brand-ghost` | `rgba(128,128,204,0.12)` | Hover bg, subtle tints |
| `--color-brand-dim` | `rgba(128,128,204,0.08)` | Very subtle bg tint |
| `--color-brand-border` | `rgba(128,128,204,0.30)` | Subtle lavender border |

### Secondary (Teal)
| Token | Value | Use |
|---|---|---|
| `--color-teal` | `#7AEFEF` | Active toggles, checkboxes, Give-Up button, Add Permissions button |
| `--color-teal-ghost` | `rgba(122,239,239,0.10)` | Teal tinted bg |
| `--color-teal-border` | `rgba(122,239,239,0.30)` | Teal outlined button border |

### Accent (Amber)
| Token | Value | Use |
|---|---|---|
| `--color-amber` | `#F59E0B` | "+" add icon buttons, Group badges |
| `--color-amber-ghost` | `rgba(245,158,11,0.12)` | Amber tinted bg |

### Surfaces (Dark)
| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#0F0F1E` | Page/shell background |
| `--color-sidebar-bg` | `#101020` | Left icon sidebar |
| `--color-surface` | `#1A1B2E` | Main content area, panels |
| `--color-surface-raised` | `#1E2035` | List items, cards |
| `--color-surface-active` | `#252740` | Selected list item, input bg |

### Text
| Token | Value | Use |
|---|---|---|
| `--color-text-primary` | `#EEEEF8` | Main body text (near-white, cool) |
| `--color-text-secondary` | `#8A8AAA` | Labels, subtitles (muted lavender-gray) |
| `--color-text-tertiary` | `#5A5A78` | Placeholders, metadata |
| `--color-text-on-brand` | `#FFFFFF` | Text ON brand lavender (Log In button) |

### Borders
| Token | Value | Use |
|---|---|---|
| `--color-border` | `#2A2A42` | Inputs, cards, dividers |
| `--color-border-focus` | `#8080CC` | Input focus border |
| `--color-divider` | `#1E1E32` | Subtle section separators |

### Status
| Token | Value | Use |
|---|---|---|
| `--color-status-success` | `#4DCC9B` | Live indicator dot, active states |
| `--color-status-danger` | `#EF4444` | Error input border, error text, Forgot Password link |
| `--color-status-pending` | `#F59E0B` | Warning states |

---

## Typography

- **Body base:** 14px / 1.5 / Inter / weight 400
- **Section labels** (e.g., "Trading Accounts", "Traders"): 12px, weight 600, uppercase, `letter-spacing: 0.06em`, `--color-brand`
- **Product labels** (Spot, Forwards, Vanilla Options): 14px, `--color-brand`, weight 500
- **Active list item:** `--color-brand`, weight 500
- **Breadcrumb links:** `--color-brand`, weight 500
- **Group headers in list:** 14px, weight 600, `--color-text-primary`
- **Account IDs, currency codes:** JetBrains Mono / monospace

### Size scale
```
10px  micro labels, icon tooltips
12px  section labels, badges, timestamps, form field labels
14px  body, buttons, list items, inputs     ← standard UI text
15px  slightly larger inputs
16px  panel titles, tab labels
18px  section headings
22px  screen/page titles
28px  brand "FX" logo in login card
40px  large brand display
```

---

## Spacing

```
4px   --space-1   tight icon gaps
6px   --space-2   compact internal spacing
8px   --space-3   checkbox gap, small row gap
10px  --space-4
12px  --space-5   tight cell padding
14px  --space-6
16px  --space-7   standard panel padding, input padding
18px  --space-8
20px  --space-9   section gap
24px  --space-10  card section gap, content padding
28px  --space-12
32px  --space-14  panel padding
40px  --space-16  large gaps
```

---

## Control Heights

```
24px  --h-chip        Badges and chips
28px  --h-btn-sm      Compact / inline buttons
36px  --h-input       Dark inputs (compact for data-dense UI)
36px  --h-btn         Primary action button
42px  --h-btn-lg      Login button
44px  --h-list-item   Entity/account list row
36px  --h-footer      Bottom status bar
48px  --h-nav         Top navigation bar
```

---

## Border Radius

```
4px   --radius-sm    Badges, small chips
6px   --radius       Buttons, inputs, list items
8px   --radius-md    Cards, panels, dropdowns
12px  --radius-lg    Login card, modals
16px  --radius-xl    Large surface cards
999px --radius-pill  Pill buttons, tags
50%   --radius-full  Avatars, status dots
```

---

## Shadows (dark mode — stronger opacity)

```
SM:     0 1px 4px rgba(0,0,0,0.30)
Card:   0 2px 12px rgba(0,0,0,0.40)
CardLG: 0 4px 32px rgba(0,0,0,0.50)
Dialog: 0 8px 48px rgba(0,0,0,0.60)
Focus (brand): 0 0 0 3px rgba(128,128,204,0.30)
Focus (teal):  0 0 0 3px rgba(122,239,239,0.25)
```

---

## Components — Key Rules

### Buttons
- **Brand/Primary (Log In):** `background #8080CC`, `color #fff`, `height 42px (login) / 36px (standard)`, `border-radius 6px`, hover → `#6B6BB8`
- **Teal Primary (New Trade, primary actions):** `background #7AEFEF`, `color #000`, `height 36px`, `border-radius 6px`
- **Teal Outlined (Give-Up, Add Permissions):** `border 1.5px solid #7AEFEF`, `color #7AEFEF`, `background transparent`, hover → `background rgba(122,239,239,0.10)`
- **Cancel/Close (white):** `background #FFFFFF`, `color #0F0F1E`, `height 36px`, `border-radius 6px`
- **Save Changes (outlined white):** `border 1.5px solid #FFFFFF`, `color #FFFFFF`, `background transparent`
- **Amber icon button ("+"):** `background #F59E0B`, `color #000`, `width 28px height 28px`, `border-radius 6px`
- All buttons: `:active scale(0.98)`

### Inputs
- Height: `36px`, background: `--color-surface-active (#252740)`, border: `1px solid --color-border`, border-radius: `6px`
- Focus: `border-color #8080CC`, `box-shadow: 0 0 0 3px rgba(128,128,204,0.30)`
- Placeholder: `color --color-text-tertiary`
- Error: `border-color #EF4444`, `box-shadow: 0 0 0 3px rgba(239,68,68,0.08)`

### Toggles (active/inactive)
- Track inactive: `background --color-surface-raised`, `border 1px solid --color-border`
- Track active: `background --color-teal`
- Thumb: white circle
- Animate: 0.15s ease

### Radio Buttons (Client / Market Maker)
- Default: `border 1.5px solid --color-border`, `background transparent`
- Selected: `border-color --color-teal`, inner dot `background --color-teal`

### Checkboxes (Default Booking Recipients)
- Size: `16×16px`, `border-radius 4px`, `border 1px solid --color-border`, `background transparent`
- Checked: `background --color-teal`, `border-color --color-teal`, white checkmark inside

### List Items (Master Panel)
- Default: `background --color-surface-raised`, `border-bottom 1px solid --color-divider`
- Hover: `background --color-surface-active`
- Active/selected: `background --color-surface-active`, primary text `color --color-brand`, weight 500
- Group headers: `background --color-surface`, bold text, no left indent
- Section labels within list: `--color-brand`, uppercase, 12px, weight 600

### Section Labels
```css
font-size: 12px;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.06em;
color: var(--color-brand);   /* lavender — NOT tertiary like Enigma X */
```

### Breadcrumb
- Parent link: `color --color-brand`, no underline, weight 500
- Separator: `color --color-text-tertiary` (›)
- Current: `color --color-text-primary`

### Badges
- Group badge (amber filled): `background --color-amber`, `color #000`, `border-radius 4px`, `padding 2px 8px`, `font-size 12px`, `font-weight 600`
- Review badge variants:
  - Orange filled: `background --color-amber`, `color #000`
  - Teal outlined: `border 1px solid --color-teal`, `color --color-teal`, transparent bg
  - Dark filled: `background --color-surface-raised`, `color --color-text-primary`
  - Dark outlined: `border 1px solid --color-border`, `color --color-text-secondary`

### Product Permissions Grid
- Product name: `color --color-brand`, weight 500
- Limit input: standard input style
- Currency code: `font-family --font-mono`

### Footer Bar
- `background --color-sidebar-bg`, `height 36px`, `border-top 1px solid --color-divider`
- "M" logo: white, weight 700
- Text "FX Engine Room | Operated by Makor Group": `--color-text-secondary`
- Live dot: `--color-status-success` (green), 8px, `border-radius 50%`

### Login Card
- Outer bg: `--color-bg` (pure dark)
- Card: `background --color-surface`, `border-radius 12px`, `padding 40px`, `box-shadow: 0 8px 48px rgba(0,0,0,0.60)`
- Brand logo: "FX" large (28px+ bold), "Engine Room" below, both `color --color-brand`
- Inputs: standard dark input style
- Error input: `border-color --color-status-danger` + error text below in `--color-status-danger`
- "Forgot Password?" link: `color --color-status-danger`
- Log In button: `background --color-brand`, `color #fff`, `height 42px`, full-width

---

## What NOT to do

- Do not use light backgrounds — this is dark mode only
- Do not use Tailwind or any CSS framework — all styles are custom
- Do not use border-radius above 12px on UI elements (except login card at 12px which is already the max)
- Do not use colors outside this system without designer approval
- Do not use monospace font for labels, buttons, or UI copy — only for financial data, account IDs, currency codes
- Do not hardcode hex values in component CSS — always reference `var(--color-*)` tokens
- Do not reverse brand colors — lavender (`#8080CC`) is primary, teal (`#7AEFEF`) is secondary
- Do not add animations longer than 0.20s on inputs/buttons
- Do not add gradients or decorative shadows beyond what is defined above
- Do not add mobile breakpoints — desktop only

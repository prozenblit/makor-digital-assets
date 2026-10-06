# Enigma X Auth — Design System
**For Claude agents building or modifying the Enigma X authentication flows**

Load this file at the start of any session working on `enigma-x/auth/`. All design decisions must follow these rules. Do not invent, substitute, or "improve" values.

## Scope — what this DS covers

This is the **auth-specific** design system for Enigma X. It covers:
- **Web sign-in portal** (`enigma-signin.html`) — desktop, username/password form, 2-step OTP flow
- **Mobile authenticator app** (`enigma-authenticator.html`) — Face ID unlock, push notification approval, OTP code display sheet, session management

It does **NOT** cover trading desktop components. For those, load:
- `enigma-x/design-system/CLAUDE.md` — agent rules for the trading platform
- `enigma-x/design-system/tokens.css` — trading DS tokens
- `enigma-x/design-system/components.css` — order books, bid/ask panels, tickers, blotter, etc.

## Companion files — load these too
- `tokens.css` — all auth design tokens as CSS custom properties (`--auth-*` prefix)
- `tokens.json` — same tokens in JSON for programmatic access
- `components.css` — full CSS for all auth components, all states
- `components.md` — copy-paste HTML for every auth component with JS behavior notes
- `showcase.html` — live interactive reference, open in browser

**When implementing any auth UI:** check `components.md` first. If the component exists there, use that exact HTML + the corresponding CSS class.

---

## Non-negotiables

### Fonts
- **DM Sans everywhere** — body, labels, buttons, headings, inputs, eyebrows. No exceptions.
- **DM Mono ONLY for OTP code display** — the 6-digit code in the bottom sheet (`font-size: 38px`, `letter-spacing: 0.18em`). Also used for: timer countdown, web timer (`font-family: var(--auth-font-mono)`). Never use DM Mono for UI labels, button text, or descriptions.

### Border radius — always 4px
- Buttons: `4px`
- Inputs (text fields, password): `4px`
- Toasts: `4px`
- Waiting badge / pill badge: `999px` (pill)
- Nav icon (web): `4px`
- OTP input slots (web): `8px` — only exception on web
- Bottom sheet top corners: `8px 8px 0 0`
- Code card (inside sheet): `8px`
- Sign-out confirm dialog: `14px`
- Push notification banner inner: `22px`
- Mobile shell: `min(44px, 4vw)` — responsive
- Avatars / live dots: `50%`
- Checkbox: `2px`
- Session compact card (mobile): `8px`

### Brand color — always `#7AEFEF`
- Buttons, active borders, focus rings, live dots, eyebrow text (web), checkmarks, OTP slot filled state
- Deeper teal `#3DBFBF` is for: mobile eyebrow text, header banner background, push banner app icon bg, drop pin on map, hover states on mobile
- Hover on web portal primary button: `#5ADADA`
- Never swap these values or use them in reverse context

### Mode — light only
- No dark mode. No `prefers-color-scheme` media query. No toggling.

### No trading components
- Do not include order books, bid/ask panels, tickers, blotters, or any trading-specific UI in auth pages
- Auth DS is mobile-first / authentication-first in purpose

### Input focus pattern
```css
border-color: #7AEFEF;
background: #FFFFFF;
box-shadow: 0 0 0 4px rgba(122, 239, 239, 0.094);
```

### Input error pattern
```css
border-color: #E5686A;   /* authenticator */
/* or #EF4444 on web portal */
box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.08);  /* web */
/* or rgba(229, 104, 106, 0.06) on authenticator */
```

---

## Color system

### Brand
| Value | Use |
|---|---|
| `#7AEFEF` | Buttons, active borders, focus rings, live dots, filled OTP slots, checkbox checked |
| `#3DBFBF` | Mobile eyebrow, header banner bg, drop pin, hover states (mobile) |
| `#5ADADA` | Primary button hover (web portal) |
| `rgba(122,239,239,0.094)` | Focus ring shadow, waiting badge bg, ghost fills |

### Surfaces
| Value | Use |
|---|---|
| `#EBEBEB` | Web sign-in page background |
| `#F7F8F8` | Mobile shell background, input default bg, code card bg |
| `#FFFFFF` | Cards, modals, bottom sheets, OTP slot default, nav bg |

### Text — authenticator canonical
| Value | Use |
|---|---|
| `#1A1F36` | All body text, headings |
| `#7C9CAC` | Labels, subtitles, muted text |
| `#A8BECD` | Placeholders, timestamps, fine print |

### Text — web portal
| Value | Use |
|---|---|
| `#6B7280` | Muted text (card subtitle, field labels) |
| `#9CA3AF` | Placeholders |
| `#1A1A1A` | Black (nav icon bg, btn-black variant) |

### Status
| Value | Use |
|---|---|
| `#E5686A` | Error — authenticator danger border, destructive actions |
| `#EF4444` | Error — web portal field error |
| `#4DCC9B` | Success — active session label (authenticator) |
| `#D1D5DB` | Disabled button background |

### Borders
| Value | Use |
|---|---|
| `#DEE8ED` | Authenticator — all inputs, cards |
| `#E2E2E2` | Web portal — inputs, card (warmer tone) |
| `#7AEFEF` | Focus border (both platforms) |

---

## Typography

### Font stack
```
DM Sans: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif
DM Mono: 'DM Mono', 'Courier New', monospace
```

### Size / weight scale (from source)
| Size | Weight | Use |
|---|---|---|
| `10px` | `700` | Mobile eyebrow, sheet section label |
| `12px` | `600–700` | Form labels, badges, push banner app name, session labels |
| `14px` | `400–700` | Body, buttons, link buttons, push notification text, card subtitle |
| `16px` | `700` | Nav brand name, primary buttons, status bar time |
| `18px` | `700` | Launch app name |
| `20px` | `700` | Home screen title, OTP view heading |
| `22px` | `700` | Success title, password fallback heading |
| `24px` | `700` | Sign-in card title |
| `38px` | `600` | OTP code display (DM Mono) |

### Letter-spacing
| Pattern | Value | Applied to |
|---|---|---|
| Eyebrow web | `0.08em` | 14px, uppercase |
| Eyebrow mobile | `0.12em` | 10px, uppercase |
| Field labels | `0.04em` | 12px, uppercase |
| OTP mono | `0.18em` | 38px DM Mono |
| Session labels | `0.07–0.10em` | 10–12px uppercase |
| Logo name mobile | `-0.02em` | 16px bold |

---

## Control heights

```
48px  text inputs
50px  primary button (web)
52px  primary button (mobile)
48px  danger outline button
36px  compact session sign-out buttons
58px  OTP input slots
56px  top navigation bar
32px  pill badges / chips
44px  iOS status bar
```

---

## Component inventory

### Web sign-in portal
1. Top navigation bar — logo + brand name, frosted glass, height 56px
2. Sign-in card — max-width 440px, border-radius 8px, shadow
3. Text input — height 48px, 1.5px border, radius 4px
4. Password input with toggle — eye icon, 18px svg
5. Checkbox (remember me) — 16×16px, radius 2px, teal when checked
6. Link button — underlined, color #5ADADA, font-weight 600
7. Primary button — height 50px, teal bg, spinner loading state
8. OTP digit slots (6) — height 58px, radius 8px, DM Mono, auto-advance
9. Waiting badge — pill, teal ghost bg, animated dots
10. Timer row — DM Mono countdown, warn state (red when ≤30s)
11. Success ring — 72px, teal ghost bg, pop-in animation
12. Back button — text + arrow icon, color text-secondary
13. Eyebrow label — 14px, uppercase, letter-spacing 0.08em
14. Security badge — lock icon + "Secured by 256-bit TLS" text
15. Divider — hairline with "OR" label

### Mobile authenticator app
16. Mobile shell — 390×844px, border-radius min(44px,4vw), shadow
17. Launch screen — white, centered logo + app name
18. Face ID overlay — frosted blur bg + lottie animation
19. Passcode fallback link — pill button, rgba(0,0,0,0.06) bg
20. Push notification banner — glass morphism, slide-in from top
21. Home logo banner — teal #3DBFBF, brand icon + name
22. Avatar / initials — 36px circle, teal bg, initials in black
23. Session dot (live) — 8px, teal, pulsing glow animation
24. Session compact card — border-radius 8px, flag + info + sign-out btn
25. Bottom sheet — slides up, handle bar, max-height 88%
26. Sheet map area — 160px, city blocks SVG + location pill
27. OTP code card — font-size 38px DM Mono, letter-spacing 0.18em
28. Copy code button — height 52px, teal, border-radius 8px
29. Sheet confirmed state — 56px circle, checkmark, fade-in
30. Sign-out confirmation dialog — border-radius 14px, scale animation
31. Toast — black bg, radius 4px, slide up, danger variant
32. Password fallback form — standard input + btn-primary
33. Step indicator / eyebrow — 10px, 700, uppercase, teal-dark

---

## Animations — exact values

| Animation | Duration | Easing | Notes |
|---|---|---|---|
| Button hover | `0.12s` | `ease` | color change |
| Button :active | `0.08s` | `ease` | `scale(0.98)` |
| Input focus | `0.18s` | `ease` | border + shadow |
| OTP slot focus | `0.15s` | `ease` | + `scale(1.05)` |
| OTP shake | `0.35s` | `ease` | translateX ±6px |
| Spinner | `0.65s` | `linear` | infinite rotate |
| Success pop-in | `0.45s` | `cubic-bezier(0.34,1.56,0.64,1)` | scale 0.2→1 |
| Screen push | `0.38s` | `cubic-bezier(0.4,0,0.2,1)` | translateX |
| Bottom sheet | `0.42s` | `cubic-bezier(0.32,0,0.04,1)` | translateY |
| Push banner | `0.42s` | `cubic-bezier(0.32,0,0.04,1)` | translateY(-130%→0) |
| Toast slide | `0.28s` | `cubic-bezier(0.4,0,0.2,1)` | translateY(80px→0) |
| Face ID blur | `0.65s` | `ease` | opacity 0→1 |
| Face ID content | `0.20s` | `ease` | opacity, 0.25s delay |
| Confirm dialog | `0.20s` | `ease` | scale 0.95→1 |
| Live dot pulse | `2s` | `ease-in-out` | infinite, shadow glow |
| Waiting dots | `0.9s` | `ease-in-out` | bounce, staggered delays |
| Notif dot | `2s` | `ease-in-out` | opacity + scale pulse |
| Session remove | `0.23s` | `ease` | opacity + scale |
| Code used | `0.30s` | `ease` | opacity fade-out |

---

## What NOT to do

- Do not use Tailwind or any CSS framework — all styles are custom
- Do not use DM Mono for labels, buttons, or UI copy — DM Mono is OTP codes and timers only
- Do not use border-radius above 4px on buttons, inputs, toasts (use the exceptions table above)
- Do not add dark mode — light mode only
- Do not swap `#7AEFEF` and `#3DBFBF` — primary is always the bright teal, dark is always the deeper teal
- Do not hardcode hex values in component CSS — always reference `var(--auth-*)` tokens
- Do not include trading components (order books, tickers, bid/ask) in auth pages
- Do not use gradients or decorative shadows beyond what is defined above
- Do not reference `var(--color-*)` tokens from the parent trading DS in auth components — use `var(--auth-color-*)` from this DS
- Do not animate longer than 0.20s on hover interactions (hover should feel instant)

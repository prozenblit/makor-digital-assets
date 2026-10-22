# MAKOR (Makor-X.AI) Mobile Authenticator - harvested spec (light + dark)

Source of truth: `hub/auth/makor-authenticator.html` (1291 lines, "L") and `hub/auth/makor-authenticator-dark.html` (1363 lines, "D").
Harvested read-only from the built prototypes and verified in a real browser (computed styles + bounding boxes, DPR 1.5; every state captured in both modes).
Conventions: `L123` = light file line 123, `D123` = dark file line 123. "(computed)" = browser-measured / inferred, not literally in source. CSS px. Borders written `1px` in source report `0.666667px` (or `1.33333px` for 1.5px) in computed output only because DPR = 1.5; the source values are 1px / 1.5px.
Asset exports: `makorx-ai/auth-design-system/assets/app-*.svg` + `MANIFEST-app.md`.

The two files are structurally identical (same DOM, same IDs, same JS state machine). They differ in the palette, a handful of added dark-only decorations (see section 1.9) and the launch-screen canvas script. There is NO toggle: light and dark are separate documents.

---------------------------------------------------------------------------------------------------

## 0. What the prototype actually is (vs. what the derived design system claims)

* A single-page phone mock: a `.shell` 390 x 844 containing a launch splash, a Face ID overlay, a "Your devices" home, a password-fallback screen, a push-notification banner, a sign-in bottom sheet with a static OTP, a confirm dialog and a toast.
* There is NO code ring, NO progress bar and NO 30-second refresh. The OTP is the hard-coded string `482 716`; the "countdown" is plain text `3:00 -> 0:00` (180 s). Copy writes `482716`.
* Headings are NOT EB Garamond. `--font-serif: 'EB Garamond'` is declared (L27) but the font is never loaded and never used. Everything is Geist (400/500/600/700 from Google Fonts, L9). `--font-mono` is an alias of Geist (L29).
* The Face ID visual is a remote dotLottie (not inline SVG): `https://lottie.host/2c89c12e-4c0d-41a6-ae13-30b2ce7a964a/kjwDIWFPeM.lottie`, played by `@dotlottie/player-component@latest` from unpkg (L10). Not exported (external, binary). Facts read in-browser: layer name "iOS Face ID - Prompt", artboard 150 x 148, 60 fps, 244.66 frames (4.08 s), loop, Lottie v5.7.0, 8 sub-assets (face, eyes, nose, mouth, ring-1, ring-2, checkmark, bg). Prompt background fill rgb(64,64,66) = `#404042`, glyphs white, scanning ring blue. The JS stops the flow at 2200 ms (after ~2.2 s of the 4.08 s loop = scanning ring -> checkmark).
* Dark brand teal is `#17C3AF` (D16/D17). Light brand is `#005268`.

---------------------------------------------------------------------------------------------------

## 1. Foundations

### 1.1 Colour tokens (`:root`: L12-30 light; D12-30 dark, values D13-26)

| Custom property | Light (L) | Dark (D) | Role as used |
|---|---|---|---|
| `--c-bg` | `#F5F5F8` | `#0C1219` | shell bg, home content card, page bg (light only), map road colour (dark) |
| `--c-surface` | `#FFFFFF` | `#121C26` | cards, sheet, dialog, pw screen, session rows |
| `--c-surface-2` | `#F5F5F8` | `#192533` | flag tile, input bg, code card, cancel button, spec grid |
| `--c-primary` | `#005268` | `#17C3AF` | CTA fill, eyebrow, dots, links accent |
| `--c-primary-dark` | `#005268` | `#0A7A8E` | light: focus outline + eyebrow; dark: UNUSED (overridden to `--c-primary`, D33/D138) |
| `--c-primary-dim` | `#005268` | `#17C3AF` | declared, never referenced (L18) |
| `--c-primary-ghost` | `#00526814` (8-digit hex, = rgba(0,82,104,.08) computed) | `rgba(23,195,175,0.13)` | pulse dot ring, input focus ring, confirmed-icon bg |
| `--c-black` | `#000000` | `#0C1219` | toast bg (light only; dark toast hard-codes `#192533`) |
| `--c-text` | `#000000` | `#E6EFF4` | primary text |
| `--c-text-2` | `#7C8DAC` | `#87A8B5` | secondary text, subtitle, labels |
| `--c-text-3` | `#A8B6CD` | `#4E6A78` | tertiary text, meta, section labels, disabled bg (L154: `.btn-primary:disabled{background:var(--c-text-3)}`) |
| `--c-border` | `#E5E7EC` | `#1E2F3C` | input border, handle, dividers |
| `--c-danger` | `#DA4D43` | `#FF6B6B` | sign out, block link, danger toast, urgent timer |
| `--c-success` | `#179484` | `#2DD4BF` | "Active now" label only (L728) |

Other custom properties: `--font-serif: 'EB Garamond', Georgia, serif` (L27, unused), `--font-sans: 'Geist', -apple-system, sans-serif` (L28), `--font-mono: var(--font-sans)` (L29).

### 1.2 Hard-coded colours outside the tokens

| Where | Light | Dark |
|---|---|---|
| Page backdrop `body` L39 / D39 | `var(--c-bg)` `#F5F5F8` | `#080F15` |
| Status bar on home (`.status-bar--dark`, L334-338, `!important`) | bg `#0D8090`, text/icons `rgba(255,255,255,0.9)` | same |
| Home header gradient `#s-home` L330 | `linear-gradient(180deg, #0D8090 0px, #0A5888 50px, #1E3578 110px, var(--c-bg) 170px)` | same (ends in dark `--c-bg`) |
| Home logo-name | `#fff` L325 | same |
| Primary hover L152 / D154 | `#003D4F` | `#10A898` |
| Danger hover L164 / D166 | `rgba(218,77,67,.06)` | `rgba(255,107,107,.10)` |
| Launch bg L184 / D187-190 | `#C8D8DF` | `radial-gradient(ellipse at 50% 22%, rgba(10,115,132,0.72) 0%, rgba(8,90,108,0.30) 38%, transparent 60%), radial-gradient(ellipse at 80% 85%, rgba(5,75,92,0.38) 0%, transparent 40%), #071018` |
| Shell bg L49 / D49-51 | `var(--c-bg)` | `radial-gradient(ellipse at 50% -5%, rgba(10,115,132,0.48) 0%, transparent 55%), var(--c-bg)` |
| Launch app name colour L202 | `var(--c-primary)` | same token = `#17C3AF` |
| Toast L169 / D171-172 | `var(--c-black)`, `#fff` | bg `#192533`, text `var(--c-text)`, `border:1px solid #1E2F3C` |
| Map SVG | see 1.8 | see 1.8 |
| White text on buttons | `#fff` L148/L603/L511 | same `#fff` (white on `#17C3AF`, see gaps) |

### 1.3 Logo gradient ("logo color.svg" mirror, `.logo-gradient` L125-131 - identical in both files)

```
background:
  radial-gradient(ellipse at 82% 10%, rgba(0,89,159,0.9) 0%, transparent 55%),
  radial-gradient(ellipse at 73% 68%, rgba(0,99,91,0.85) 0%, transparent 55%),
  radial-gradient(ellipse at 25% 83%, rgba(0,184,184,0.75) 0%, transparent 50%),
  #005268;
```
Used on `.launch-logo-icon` (96 x 96, r22) and `.push-banner-app-icon` (44 x 44, r12). The home-header icon is glass instead (see 2.4).

### 1.4 Typography (all Geist; fallback `-apple-system, sans-serif`; `-webkit-font-smoothing: antialiased` L42)

| Element | size / weight / line-height / letter-spacing / transform | colour (L -> D) |
|---|---|---|
| Status-bar time `.status-bar .time` L64 | 16 / 600 / normal | home: `rgba(255,255,255,.9)`; pw screen: `--c-text` |
| Launch app name L200 | 20 / L500, D400 (D211) / 1.4 / .01em (=.2px) / center | `--c-primary` |
| Face ID "Locked" L270 | 20 / 400 / normal / .01em | `--c-text` |
| "Use Passcode" L277 | 14 / 600 / -.01em (=-.14px) | `--c-text-2` |
| Home logo name L323 | 20 / 400 / .01em | `#fff` |
| Home title "Your devices" `.home-header-left .screen-title` L345 | 18 / 500 / 1.2 (=21.6px) / margin-top 6 | `--c-text-2` |
| Pw title `.screen-title` L138 | 32 / 500 / 1.2 (=38.4px) / mt 0 mb 6 (inline L796) | `--c-text` |
| Pw sub `.screen-sub` L142 | 14 / 400 / 1.55 (=21.7px) | `--c-text-2` |
| Eyebrow `.eyebrow` L134 | 10 / 700 / .12em (=1.2px) / uppercase | `--c-primary-dark` -> D138 `--c-primary` |
| "Active now" / "Recent sign-ins" label L390 | 12 / 700 / .1em (=1.2px) / uppercase / mb 10 | `--c-success` (inline) / `--c-text-3` |
| Session loc L411 | 14 / 600 | `--c-text` |
| Session meta L412 | 12 / 400 / mt 2 | `--c-text-3` |
| Flag tile L406 | 12 / 700 / .04em (=.48px) | `--c-text-2` |
| Sign-out chip L415 | 12 / 600 | `--c-danger` |
| London grid label (inline L739) | 10 / 700 / .09em / uppercase / mb 4 | `--c-text-3` |
| London grid value (inline L740) | 12 / 600 (IP value `font-family:var(--font-mono)` = Geist) | `--c-text` |
| Back link L434 | 14 / 500 | `--c-text-3` |
| Input label L441 | 12 / 600 / .04em (=.48px) / uppercase | `--c-text-2` |
| Input text L451 | 16 / 400 | `--c-text` (placeholder `--c-text-3`) |
| `.btn-primary` L148 | 16 / 600 | `#fff` |
| Banner app name L109 | 12 / 600 / .02em (=.24px) / uppercase | `rgba(255,255,255,.80)` |
| Banner time L112 | 12 / 400 | L `rgba(255,255,255,.60)` D `.55` |
| Banner title L121 | 14 / 700 / 1.3 (=18.2px) | `#fff` |
| Banner sub L122 | 12 / 400 / 1.4 (=16.8px) / mt 2 | L `.78` D `.65` |
| Confirm title L492 | 16 / 700 / -.01em (=-.16px) / mb 6 | `--c-text` |
| Confirm body L497 | 14 / 400 / 1.45 (=20.3px) / mb 18 | `--c-text-2` |
| Confirm button L504 | 14 / 600 | cancel `--c-text-2`, danger `#fff` |
| Sheet pill (map) L554 | 12 / 600 | `--c-text` |
| Sheet section title L569 | 10 / 700 / .1em (=1px) / uppercase / mb 10 | `--c-text-3` |
| Sheet info label L578 | 10 / 600 / .07em (=.7px) / uppercase | `--c-text-3` |
| Sheet info value L579 | 14 / 600 | `--c-text` |
| Code label L590 | 12 / 700 / .08em (=.96px) / uppercase | `--c-text-3` |
| Code expiry L599 | 16 / 500 | `--c-text-2`; `.urgent` `--c-danger` |
| OTP `.sheet-otp` L592-597 | 44 / 500 / normal / .22em (=9.68px) / flex-centered; text `482 716` (one normal space, grouped 3 + 3) | `--c-text` |
| OTP `.used` (never applied by JS, L598) | 26 / 500 / .1em (=2.6px) / line-through | `--c-text-3` |
| Copy button L603 | 16 / 600 / gap 10 | `#fff` |
| Block link L610 | 14 / 500 / underline, offset 4px | `--c-danger` |
| Confirmed h3 L632 | 18 / 700 / mb 4 | `--c-text` |
| Confirmed p L633 | 14 / 400 | `--c-text-2` |
| Toast L171 | 14 / 500 / center | `#fff` (D: `--c-text`) |

### 1.5 Radii (px) -> element

| Radius | Element |
|---|---|
| `min(44px, 4vw)` | `.shell` L50 (computed 44px at viewport >= 1100 wide; 40px at 1000; 17.2px at 430; 15.01px at 375) |
| 28 | dark only `.faceid-card` (D260-265) |
| 22 | `.launch-logo-icon` L196; `.push-banner-inner` L99 |
| 20 (top corners only) | `.home-content-card` `20px 20px 0 0` L302 |
| 14 | `.confirm-dialog` L482 |
| 12 | `.push-banner-app-icon` L115; `.fid-wrapper` (+ dark `::after`) L262 |
| 10 | `.home-logo-icon` L314 |
| 8 | `.session-compact` L396; London spec grid (inline L737); `.sheet-code-card` L583; `.sheet-copy-btn` L602; `.bottom-sheet` top corners `8px 8px 0 0` L526 |
| 4 | buttons `.btn-primary` L147, `.btn-danger` L159, `.faceid-fallback-link` L281, `.confirm-btn` L503, `.session-compact-signout` L415, `.toast` L170, `.input-field` L450, `.session-compact-flag` L402, `.session-row-icon` L380, `.sheet-map` L545, `.map-location-pill` L552, `.sheet-handle` L537, focus ring L35 |
| 50% | `.home-avatar` (dead), `.session-dot` L366, `.loc-dot` L558, `.sheet-confirmed-icon` L626 |
| 3 / 4 (SVG rx) | map blocks rx=3, green park rx=4 (see map files) |

### 1.6 Borders and dividers

| Element | Value |
|---|---|
| Input | `1.5px solid var(--c-border)`; focus `border-color: var(--c-primary)` L449/L456 |
| `.btn-danger` (unused) | `1.5px solid var(--c-danger)` L158 |
| Sign-out chip | `1px solid var(--c-danger)` L414 |
| London card | `1.5px solid var(--c-border)` (inline L729) |
| Pw header divider `.fb-top` | `border-bottom: 1px solid var(--c-border)` L430 |
| Banner inner | L `1px solid rgba(255,255,255,0.14)`, D `...0.10` |
| Home logo icon | `1px solid rgba(255,255,255,0.22)` L320 |
| Dark-only adds | `.faceid-card` `1px solid rgba(255,255,255,.08)`; `.confirm-dialog` `1px solid var(--c-border)` (D511); `.bottom-sheet` `border-top:1px solid var(--c-border)` (D562); `.map-location-pill` `1px solid rgba(255,255,255,.09)` (D582); `.sheet-code-card` `1px solid var(--c-border)` (D615); `.toast` `1px solid #1E2F3C` (D172) |
| Focus ring (global) L32-36 | `outline:2px solid var(--c-primary-dark); outline-offset:2px; border-radius:4px` on `button/input/[tabindex]:focus-visible`; D33 uses `var(--c-primary)` |

### 1.7 Shadows / blur

| Element | Light | Dark |
|---|---|---|
| `.shell` L51 | `0 24px 64px rgba(0,0,0,.18), 0 0 0 2px rgba(0,0,0,.07)` | `0 24px 64px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.06)` (D53) |
| Push banner inner L102 | `0 6px 32px rgba(0,0,0,0.18), inset 0 2px 0 rgba(255,255,255,0.22)`; bg `rgba(0,0,0,0.20)`; `backdrop-filter: blur(48px)` | `0 6px 32px rgba(0,0,0,.40), inset 0 2px 0 rgba(255,255,255,.08)`; bg `rgba(0,0,0,0.55)` |
| Launch logo L198 | `0 8px 28px rgba(0,82,104,0.30)` | `0 8px 32px rgba(0,82,104,0.55), 0 0 0 1px rgba(255,255,255,.06)` |
| Face ID blur bg L218 | `rgba(235,235,235,.12)`, `blur(6px)` | `rgba(7,12,18,0.42)`, `blur(8px)` |
| Dark faceid-card | n/a (transparent) | bg `rgba(18,28,38,0.70)`, `blur(12px)`, shadow `0 8px 32px rgba(0,0,0,.28)` |
| Home logo icon L317-321 | bg `rgba(255,255,255,0.14)`, `blur(16px)`, `inset 0 1px 0 rgba(255,255,255,0.25)` | same |
| `.session-current` (dead) L359 | `0 2px 10px rgba(0,0,0,.06)` | `.18` (D387) |
| Input focus L458 | `0 0 0 4px var(--c-primary-ghost)` | same token |
| Confirm overlay L473 / dialog L486 | `rgba(0,0,0,.4)` / `0 8px 40px rgba(0,0,0,.2)` | `rgba(0,0,0,.6)` / `0 8px 40px rgba(0,0,0,.45)` |
| Sheet overlay L516 / sheet L532 | `rgba(0,0,0,.45)` / `0 -8px 40px rgba(0,0,0,.18)` | `rgba(0,0,0,.60)` / `0 -8px 40px rgba(0,0,0,.40)` |
| Map pill L551-555 | bg `rgba(255,255,255,.92)`, `blur(8px)`, `0 2px 8px rgba(0,0,0,.12)` | bg `rgba(18,28,38,.94)`, `blur(8px)`, `0 2px 8px rgba(0,0,0,.35)` |
| `.session-dot` L368 | `0 0 0 4px var(--c-primary-ghost)` (animated) | same |

### 1.8 Motion

| Name / selector | Property / easing / duration | Source |
|---|---|---|
| Screen slide `.screen` | `transform .38s cubic-bezier(.4,0,.2,1), opacity .3s ease`; `will-change: transform`; off-screen: `translateX(+/-100%)`, opacity 0 | L78-79, L83-84, JS L938-939 |
| Push banner | `transform .42s cubic-bezier(.32,0,.04,1)`; hidden `translateY(-130%)`, shown `translateY(0)`; auto-dismiss 9000 ms | L91, L90, JS L991 |
| Bottom sheet | `transform .42s cubic-bezier(.32,0,.04,1)`; `translateY(100%)` -> `0` | L528 |
| Sheet overlay | `opacity .35s ease` | L518 |
| Confirm overlay / dialog | `opacity .2s ease` / `transform .2s ease` (`scale(.95)` -> `1`) | L477, L488 |
| Toast | `transform .28s cubic-bezier(.4,0,.2,1), opacity .28s ease`; hidden `translateY(80px)`, opacity 0; visible 3000 ms | L173, JS L980 |
| Launch fade-out | `opacity .3s ease` | L189 |
| Face ID overlay | `opacity .25s ease` | L211 |
| `@keyframes blurFadeIn` (L236-239) on `.faceid-blur-bg` | `from{opacity:0} to{opacity:1}`, `.65s ease both` | L234 |
| `@keyframes faceIDContentIn` (L243-246) on `.faceid-wrap` | `from{opacity:0} to{opacity:1}`, `.2s ease .25s both` | L241 |
| `@keyframes dotpulse` (L371-374) on `.session-dot` | `0%,100%{box-shadow:0 0 0 4px var(--c-primary-ghost)} 50%{box-shadow:0 0 0 6px transparent}`, `2.4s ease infinite` | L369 |
| `.btn-primary` | `transition: background .12s, transform .08s`; `:active{transform:scale(.98)}` | L150, L153 |
| `.btn-danger` (dead) | `background .12s` | L162 |
| `.faceid-fallback-link` | `background .15s, color .15s` | L286 |
| `.confirm-btn` | `opacity .15s`; `:active{opacity:.7}` | L505, L509 |
| `.input-field` | `border-color .18s, box-shadow .18s` | L452 |
| `.session-compact` | `opacity .23s, transform .23s` (base); sign-out removal inline `opacity .23s ease, transform .23s ease` -> opacity 0, `scale(.97)`, `el.remove()` after 230 ms | L399, JS L1118-1120 |
| London reveal (JS L1094-1100) | `display:flex`, opacity 0 + `scale(.97)` -> next frame `transition: opacity .3s ease, transform .3s ease` to 1 / none | JS |
| Confirmed swap (JS L1207-1226) | code card `transition: opacity .2s` -> 0; after 220 ms card hidden, confirmed block inserted; auto-close after 2800 ms | JS |
| Copy button `.sheet-copy-btn:active` | `opacity .85` (no transition) | L608 |
| Face ID Lottie | 60 fps, 244.66 frames, loop | external |
| Launch canvas (rAF) | see 3.1 | JS |

No `prefers-reduced-motion` handling anywhere.

### 1.9 Light -> dark: complete non-palette difference list

Palette-only swaps are in 1.1/1.2/1.7. Everything else that differs structurally (nothing else differs):

1. Title: `<title>Makor-X.AI Authenticator</title>` vs `Makor-X.AI Authenticator — Dark` (D6).
2. D38-39 `body` bg `#080F15` (light uses `--c-bg`).
3. D49-51 shell gets a top teal radial glow; D53 shadow ring is 1px white 6% (light 2px black 7%).
4. D33 focus-visible outline uses `--c-primary` (light `--c-primary-dark`); D138 eyebrow uses `--c-primary`.
5. Dark toast has a border and `--c-text` on `#192533`; `.toast.danger` adds `border-color: var(--c-danger); color:#fff` (D181).
6. Launch: bg is two radial gradients on `#071018`; `.launch-app-name` weight 400 (light 500); logo-box shadow stronger + 1px ring (D208).
7. Face ID: dark adds a glass card (`.faceid-card` bg/blur/border/radius 28/padding `24px 24px 20px`/shadow; D260-270) and a `.fid-wrapper::after` blue tint layer: `content:''; position:absolute; inset:0; background:rgba(10,35,55,0.72); mix-blend-mode:color; z-index:2; pointer-events:none; border-radius:12px` (D287-296) to recolour the grey Lottie. Light has neither (the Lottie shows its native `#404042` tile).
8. `.faceid-fallback-link` bg `rgba(255,255,255,.07)`, hover `.12`, active `.17` (light `rgba(0,0,0,.06/.10/.15)`).
9. `.home-content-card` rule moved after `.home-logo-name` (D346-354) - no visual effect.
10. `.sheet-handle`/`.sheet-map` bg: sheet-map `#152030` (D576) vs `var(--c-border)`; `.sheet-handle` same token.
11. Map SVG fully re-coloured (see below) and the comment changed to "Map - dark night-mode palette".
12. JS: the dark launch constellation is a different script (see 3.1); the `BroadcastChannel` block is relocated to the end (D1353-1360). Everything else (state machine, timers, copy text) is identical.

Map SVG colours (light -> dark): bg `#DDE6EA` -> `#0F1A24`; blocks `#C4D2DA` -> `#172230`; river `#A8BDC9` (opacity .9) -> `#0A1520`; river outline `#8AAABB` -> `#081320`; bridge `#A8BDC9` -> `#0A1520`; roads `#F5F5F8` -> `#0C1219`; park `#7BC9B8` opacity .4 -> `#17C3AF` opacity .22; pin halo `#005268` op .15 -> `#17C3AF` op .18; pin `#005268` -> `#17C3AF`; pin centre white (both); pin stem `#005268` -> `#17C3AF`.

---------------------------------------------------------------------------------------------------

## 2. Screens and components (as rendered)

### 2.1 Phone frame ("shell"), status bar, home indicator

* `.shell` L46-55: `width:min(390px,100vw); height:min(844px,100dvh); border-radius:min(44px,4vw); overflow:hidden; display:flex; flex-direction:column; position:relative; bg var(--c-bg)`. `body` is a flex-centred 100dvh page (L37-43). Viewport meta has `viewport-fit=cover` (L5); no safe-area insets used.
* Scaling (computed): 1400x1000 -> 390x844 at (505,78), r44. 1200x900 -> 390x844, r44. 1000x900 -> r40. 430x860 -> 390x844, r17.2, centred. 375x667 -> 375.33x667.33 full-bleed, x0,y0, r15.01 (so on a real phone the shell fills the screen but keeps a 4vw radius). No media queries.
* No notch / dynamic island / bezel / home indicator exist. Only a status bar: `.status-bar` L58-63 `height:44px; flex-shrink:0; display:flex; align-items:center; justify-content:space-between; padding:14px 28px 0; color:var(--c-text)`. Time: `<span class="time" id="sb-time">9:41</span>`, replaced by live clock `h:mm` (12 h, no AM/PM, refreshed every 10 s, JS L955-961). Icons: two 16 x 16 SVGs (wifi, battery - `app-status-wifi.svg`, `app-status-battery.svg`), gap 6, `fill: var(--c-text)` (L66). Computed positions at 1200x900: time at x433,y46.67 (35 x 20.67); icons at x729/751,y49.
* State `.status-bar--dark` (added at load L962 and when screen = `s-home`, toggled by `goToScreen` L942): `background:#0D8090 !important; color:rgba(255,255,255,.9) !important`, icons `fill: rgba(255,255,255,.9)`. On the pw screen it returns to transparent with `--c-text`. No transition on the toggle.
* Stack order inside shell: `#s-launch` z40, `#s-faceid` z50 (both `position:absolute; inset:0`, so they cover the status bar), status bar (in-flow), `.push-banner` z300, `.screens` (flex:1, relative), `.confirm-overlay` z200, `.sheet-overlay` z100, `.bottom-sheet` z101, `.toast` z999.

### 2.2 Launch / splash (`#s-launch`, L181-205)

DOM: `div#s-launch > canvas#launch-canvas + div.launch-logo-icon.logo-gradient > svg(56x45 logo) + p.launch-app-name "Makor-X.AI<br>Authenticator"`.
* `position:absolute; inset:0; z-index:40; flex column; center/center; gap:20px; padding-bottom:18%` (computed 70.2px at 390 wide: % of width); transition `opacity .3s ease`; `.hidden` = opacity 0 + `pointer-events:none`.
* bg light `#C8D8DF` (solid, opaque); dark: radial gradients on `#071018` (see 1.2).
* Logo tile: 96 x 96, r22, `.logo-gradient`, shadow (1.7), centred 56 x 45 white logo mark (`app-makor-logo-mark.svg`). Computed box (430 viewport): tile (167,308.9), glyph (187,334.4) 56x45, name (149.58,424.9) 130.82x56 (2 lines, line-height 28).
* Canvas: `position:absolute; inset:0; width/height:100%; pointer-events:none`; constellation animation (see 3.1). Visible 0 - ~1.8 s alone; the Face ID overlay then fades in OVER it (the splash stays underneath, blurred) until ~4.0 s.
* Timeline measured in browser (since load): 0.0 launch; ~0.6 s `startFaceID()` first call (overlay still hidden); ~1.8 s overlay shown + restart; ~4.0 s `completed` -> overlay + launch hidden, home visible.

### 2.3 Face ID unlock (`#s-faceid`, L207-290)

DOM:
```
div#s-faceid.hidden
  div.faceid-blur-bg
  div.faceid-wrap
    div.faceid-card#fid-frame-wrap
      div.fid-wrapper#fid-wrapper
        dotlottie-player#fid-lottie[src=lottie.host/... loop style="display:block;width:180px;height:180px;"]
    p.faceid-locked-label  "Locked"
    p.faceid-sub#faceid-sub (display:none; empty)
    div.faceid-bottom
      button.faceid-fallback-link "Use Passcode"
```
* `#s-faceid`: `position:absolute; inset:0; z-index:50; flex column; transition opacity .25s`. `.hidden` -> opacity 0, no pointer events.
* `.faceid-blur-bg`: light `rgba(235,235,235,.12)` + `blur(6px)`; dark `rgba(7,12,18,0.42)` + `blur(8px)`; animates `blurFadeIn .65s ease both` while visible. It blurs everything beneath (home UI, status bar, launch).
* `.faceid-wrap`: `flex:1; centred; padding:0 24px 80px; text-align:center`; `faceIDContentIn .2s ease .25s both`.
* `.faceid-card`: light transparent, `margin-bottom:20px; cursor:pointer`; dark: glass card (1.7). Computed light: card = fid-wrapper = 180 x 180 at (125,234) in the 430 viewport. Dark: card 229.33 x 225.33 (24 padding + 1px border), wrapper at (125,236).
* `.fid-wrapper`: 180 x 180, `overflow:hidden; border-radius:12px`. Inner `dotlottie-player`: `position:absolute; inset:-14px; width/height: calc(100% + 28px) !important` = 208 x 208 box, the Lottie (150x148 aspect, `meet`) fills it and the 14px overflow is cropped to hide the Lottie edge.
* States (visual = Lottie frames): idle/stopped (first frame) -> `.active` class added 60 ms after `startFaceID()` + `lottie.play()` -> scanning (blue ring wobble, face glyph, label "Face ID" baked into the Lottie) -> success (white ring + checkmark, seen at ~2 s) -> at 2200 ms JS adds `.completed`, `lottie.stop()`, runs `afterAuthSuccess()`. `.active` / `.completed` have NO CSS. There is no failure state: the animation never errors; the only exit besides success is the "Use Passcode" button.
* Label `.faceid-locked-label` "Locked": 20/400, `--c-text`, `letter-spacing:.01em`. Computed (430 vp): (181.14,434) 67.73 x 26.
* `.faceid-bottom { margin-top:32px }`. Button `.faceid-fallback-link`: `font 14/600 Geist; color var(--c-text-2); bg rgba(0,0,0,.06); border:none; radius 4; padding 12px 28px; letter-spacing:-.01em; margin-top:12px; transition background .15s, color .15s`; hover `bg rgba(0,0,0,.10); color var(--c-text)`; active `bg rgba(0,0,0,.15)` (dark: white .07/.12/.17). Computed size 148.51 x 42. No focus style except global.
* Tapping the card re-starts only if `.fid-wrapper` lacks `.active` (L1042-1045) - effectively a no-op after the first start.

### 2.4 Home / "Your devices" (`#s-home`, L329-421)

DOM:
```
div.screen#s-home           (bg: the 4-stop gradient, overflow hidden)
  div.home-logo-banner > div.home-logo-banner-left > div.home-logo-icon > svg(28x22 logo) + p.home-logo-name "Makor-X.AI Authenticator"
  div.home-content-card
    div.home-header > div.home-header-left > h1.screen-title "Your devices"
    div.home-scroll > div#all-sessions
        p.other-sessions-label#label-active "Active now" (hidden until reveal; inline color var(--c-success))
        div.session-compact#sess-london (hidden until reveal; see below)
        p.other-sessions-label "Recent sign-ins" (inline margin-top:16px; margin-bottom:10px)
        div.session-compact#sess-ny / #sess-sg / #sess-am
        p.sessions-empty#sessions-empty "No other active sessions." (display:none; never shown)
```
* `.screen`: `position:absolute; inset 0; flex column; overflow-y:auto; overflow-x:hidden; scrollbar hidden`. `#s-home` `overflow:hidden; padding:0`.
* Home header (logo banner) `.home-logo-banner`: `flex row; align-items:center; justify-content:space-between; padding:14px 20px 16px; gap:10px; bg transparent` = 74 px tall (computed). Logo icon `.home-logo-icon` 44 x 44, r10, glass (1.7), holding the 28 x 22 white mark. Name 20/400/#fff.
* `.home-content-card`: bg `--c-bg`, `border-radius:20px 20px 0 0`, `flex:1`, overflow hidden. Computed (1200 vp): y146, 390 x 726.
* `.home-header` `padding:24px 24px 12px` (63.59 tall). `.home-scroll` `flex:1; overflow-y:auto; padding:0 24px 32px; scrollbar hidden`.
* Compact session row `.session-compact` L394: `bg var(--c-surface); border-radius:8px; padding:14px; display:flex; align-items:center; gap:12px; margin-bottom:8px` -> computed 342 x 64 at 24 px margins. Children: flag tile 36 x 36 r4 `--c-surface-2` (text 12/700 `--c-text-2`, e.g. "US", "SG", "NL"); body (loc 14/600, meta 12 `--c-text-3` mt 2); `Sign out` chip: `bg none; border 1px solid var(--c-danger); r4; 12/600 --c-danger; padding 8px 14px; min-height 36px; nowrap` -> 77.18 x 36. No hover/active style on the chip. Dark: row has no border/shadow (bg `#121C26`).
* Active session card `#sess-london` (inline style L729): `display:none` until `revealCurrentSession()`; then `display:flex; flex-direction:column; align-items:stretch; gap:0; padding:16px; border:1.5px solid var(--c-border)` on a `.session-compact` (white, r8). Header row: `display:flex; gap:10px; margin-bottom:14px` with `.session-dot` 8 x 8 (`margin-top:6px`, pulse animation, bg `--c-primary`) + loc "London, UK" (14/600) and meta = `sess-london-time` (set to the current `h:mm AM/PM`, initial text "just now"). Spec grid (inline L737): `display:grid; grid-template-columns:1fr 1fr; gap:10px 16px; background:var(--c-surface-2); border-radius:8px; padding:12px 14px` with label/value pairs Browser "Chrome 126", Device "MacBook Pro", OS "macOS 14", IP Address "82.43.201.15" (label 10/700 `.09em` uppercase `--c-text-3` mb 4; value 12/600 `--c-text`). Computed 342 x 184.67; grid 307.33 x 98.
* Copy verbatim: "Your devices", "Active now", "Recent sign-ins", "New York, US" / "Firefox · Windows · 2h ago" / "US", "Singapore" / "Safari · iPhone · 5h ago" / "SG", "Amsterdam, NL" / "Chrome · Windows · 1d ago" / "NL", "Sign out", "No other active sessions.", "London, UK", "just now".
* Empty state: markup + CSS exist (`.sessions-empty`: 14px `--c-text-3`, centred, padding 20px 0, `display:none`) but no JS ever shows it: signing out all rows leaves just the "Recent sign-ins" label.
* Dead CSS for a different "current session" card: `.session-current*`, `.session-row*` (L355-387), `.home-avatar` (L346-350).

### 2.5 Sign-out confirm dialog (`.confirm-overlay#confirm-overlay`, L471-511)

DOM: `div.confirm-overlay > div.confirm-dialog > p.confirm-title#confirm-title + p.confirm-body#confirm-body + div.confirm-actions > button.confirm-btn.confirm-btn-cancel "Cancel" + button.confirm-btn.confirm-btn-danger "Sign out"`.
* Overlay `position:absolute; inset:0; bg rgba(0,0,0,.4) (D .6); z200; flex centre; opacity 0 -> 1 (.show); transition .2s`.
* Dialog `bg --c-surface; r14; width:calc(100% - 48px); max-width:320px; padding:20px 20px 12px; text-align:center; shadow; scale(.95) -> 1` -> computed 320 x 183.54 (light) at (55,338.23). Actions `display:flex; gap:8px`; buttons `flex:1; padding:14px 8px; r4; 14/600; border:none; min-height:44px` (computed 136 x 46); cancel `bg --c-surface-2; color --c-text-2`; danger `bg --c-danger; color #fff`; `:active{opacity:.7}`.
* Copy: title `Sign out ${location} session?` (initial markup "Sign out session?"), body `This will immediately end the ${location} session and require re-authentication on that device.` (initial markup "This will immediately end the session and require re-authentication on that device."). Overlay click does NOT dismiss.

### 2.6 Push-notification banner (`.push-banner#push-banner`, L87-122)

DOM:
```
div.push-banner#push-banner[onclick=openFromBanner()]
  div.push-banner-inner
    div.push-banner-top > span.push-banner-appname "Makor-X.AI" + span.push-banner-time "now"
    div.push-banner-content
      div.push-banner-app-icon.logo-gradient > svg(24x19 CSS, attrs 28x22) logo
      div.push-banner-body > div.push-banner-title "Sign-in requested" + div.push-banner-sub "London · Chrome · 82.43.201.15"
```
* `.push-banner`: `position:absolute; top/left/right 0; z-index:300; padding:10px 10px 0; transform:translateY(-130%)`; `.show` -> `translateY(0); pointer-events:auto`; `transition transform .42s cubic-bezier(.32,0,.04,1)`. It overlays the status bar. Computed 390 x 96.67.
* Inner: bg light `rgba(0,0,0,0.20)` / dark `0.55`; `backdrop-filter: blur(48px)`; `r22; padding:10px 12px 12px; cursor:pointer`; border/shadow in 1.6/1.7. Computed 370 x 86.67 at (30,18).
* Top row: `flex; align-items:center; gap:8px; margin-bottom:4px`; appname `flex:1` uppercase. Content row: `flex; gap:10px`; icon 44 x 44 r12 (the `svg { width:24px; height:19px }` rule L119 overrides the 28x22 attributes).
* Behaviour: appears when a `sign_in_request` message arrives on BroadcastChannel (3.4); auto-hides after 9000 ms; tap -> `openFromBanner()`.

### 2.7 Bottom sheet with OTP (`.bottom-sheet#sign-in-sheet` + `.sheet-overlay`, L513-619)

DOM:
```
div.sheet-overlay#sheet-overlay
div.bottom-sheet#sign-in-sheet
  div.sheet-handle
  div.sheet-map > svg(358x160, app-map-*.svg) + div.map-location-pill > div.loc-dot + "London, United Kingdom"
  div.sheet-body
    p.sheet-section-title "Sign-in details"
    div.sheet-info-grid > 4 x div.sheet-info-item > span.sheet-info-label + span.sheet-info-val
        Browser "Chrome 126" | OS "macOS 14" | IP Address "82.43.201.15" | Time #sheet-time (page-load time "h:mm AM")
    div.sheet-code-card#sheet-code-section
      div.sheet-code-header > span.sheet-code-label "One-time code" + span.sheet-code-expiry#sheet-expiry "3:00"
      div.sheet-otp#sheet-otp "482 716"
      button.sheet-copy-btn#sheet-copy-btn > svg(18x18 copy) + " Copy code"
    button.sheet-block-link "This wasn't me — Block sign-in"
```
* Overlay: `absolute inset 0; rgba(0,0,0,.45) (D .60); z100; opacity .35s`.
* Sheet: `position:absolute; bottom/left/right:0; bg --c-surface; r 8px 8px 0 0; translateY(100%) -> 0; max-height:88%; overflow:hidden; z101` (no flex; content-height). Computed light: 390 x 583.33 at (20,268.67) in the 430 vp (dark 585.33, 2px from the code-card border).
* Handle 36 x 4 r4 `--c-border`, `margin:12px auto 4px` at (197,280.67).
* Map block: `height:160px; margin:0 16px; border-radius:4px; overflow:hidden; background:var(--c-border)`; SVG `width/height:100%`, `viewBox 358x160`, `preserveAspectRatio="xMidYMid slice"` -> 358 x 160 at (36,288.67). Pill: `absolute; bottom:10px; left:50%; translateX(-50%); padding:6px 12px 6px 8px; r4; gap 6; nowrap` (173.36 x 27.33); loc-dot 8 x 8 `--c-primary` (D `#17C3AF`).
* `.sheet-body`: `padding:16px 20px 32px; overflow-y:auto; scrollbar hidden`. Section title mb 10; info grid `grid 1fr 1fr; gap:10px; mb 18` (cells 170 x 34.67; label 10/600, value 14/600; `gap:4px` column).
* Code card: `bg --c-surface-2; r8; padding:16px; margin-bottom:10px` (dark + 1px border). Header `flex; space-between; mb 10`. OTP `flex centred; mb 12` (56.67 tall). Copy button `width:100%; height:52px; bg --c-primary; border:none; r8; 16/600 #fff; flex centre; gap:10px; margin-top:16px`; `:active{opacity:.85}`; `:disabled{bg --c-text-3; color --c-text-2; cursor:not-allowed}`. No hover. Block link `display:block; width:100%; centre; 14/500 --c-danger; underline; offset 4px; padding:16px 0 4px; bg none` (350 x 38).
* States:
  * Default: expiry `3:00`, OTP `482 716`, copy "Copy code" with icon.
  * Counting: expiry text ticks `m:ss` every 1000 ms from 180 s.
  * Urgent (<= 30 s): `.sheet-code-expiry.urgent` colour `--c-danger` (rule L591 precedes the base rule L599; works via specificity).
  * Copied: button innerHTML `✓ Copied!`, `disabled` (bg `--c-text-3`, text `--c-text-2`) for 2000 ms, then restored; toast "Code copied to clipboard.".
  * Used (`.sheet-otp.used`, 26px strike-through `--c-text-3`): CSS only, never applied.
  * Expired (0:00): sheet closes, toast "Code expired. Please request a new sign-in.".
  * Confirmed (`handleCodeUsed`, triggered by the sign-in page): code card fades (opacity .2s), after 220 ms it is hidden and `div.sheet-confirmed` is inserted: `text-align:center; padding:12px 0`; icon 56 x 56 circle bg `--c-primary-ghost` holding 28 x 28 check (`app-icon-confirmed-check.svg`, `fill:var(--c-primary)`), `margin:0 auto 12px`; h3 "Sign-in confirmed" 18/700; p "You're now signed in on Chrome · London" 14 `--c-text-2`. The block link is hidden. After 2800 ms the sheet closes and 500 ms later `revealCurrentSession()` runs.
  * Block: `blockRequest()` closes the sheet, then after 150 ms `goToScreen('s-home')` + danger toast "Sign-in blocked. Attempt has been logged.".
* Overlay tap / handle drag / Esc do NOT close the sheet (no handlers).

### 2.8 Toast (`.toast#toast`, L167-178)

`position:absolute; bottom:32px; left:16px; right:16px; padding:14px 16px; r4; 14/500; centre; z999; pointer-events:none; transform:translateY(80px); opacity:0`; `.show` -> `translateY(0); opacity:1`. Variants: default (light `--c-black` bg / white; dark `#192533` bg, `--c-text`, 1px `#1E2F3C`), `.danger` (bg `--c-danger`; dark adds border + white text). Computed 358 x 46 (light) / 358 x 47.33 (dark), at x36, y = shell bottom - 32 - h. Auto-hide 3000 ms (single timer; a new toast resets it; class string rebuilt each call).
All toast copy (verbatim): "Enter your email and password." / "Code copied to clipboard." / "Code expired. Please request a new sign-in." / "Signed out of ${location} session." / "Sign-in blocked. Attempt has been logged." (danger).

### 2.9 Password fallback (`#s-pwfallback`, L423-468)

DOM:
```
div.screen#s-pwfallback (bg --c-surface; flex column; translateX(100%), opacity 0 when inactive)
  div.fb-top
    button.fb-back[onclick=backToFaceID()] > svg(15x15 arrow-left) + "Back to Face ID"
    p.eyebrow "Identity Verification"           (inline margin-bottom:6px)
    h2.screen-title "Sign in with password"     (inline margin-top:0; margin-bottom:6px)
    p.screen-sub "Face ID wasn't available. Enter your credentials to continue."   (inline margin:0; font-size:14px)
  div.fb-form
    div.input-group > label[for=fb-email] "Email Address" + div.input-wrap > input#fb-email.input-field[type=email placeholder="you@makor-x.ai" autocomplete=email]
    div.input-group > label[for=fb-pw] "Password" + div.input-wrap > input#fb-pw.input-field[type=password placeholder="Enter your password" autocomplete=current-password] + button.input-toggle[type=button aria-label="Toggle password visibility"] > svg(eye)
    div.fb-submit > button.btn-primary#fb-btn "Confirm Identity"
```
* Measurements (computed, 1200x900-equivalent frame, shell x=20 in the 430 vp): `.fb-top` padding `32px 24px 28px`, border-bottom `1px --c-border`, 227.13 tall; back button `padding:10px 8px 10px 0; min-height:44px; gap:6px; mb 16; 14/500 --c-text-3` (131.68 x 44); form `padding:28px 24px 32px; flex:1`; `.input-group` `flex column; gap:6px; mb 16`; label 12/600 `.04em` uppercase; `.input-field` `width:100%; height:48px; padding:0 44px 0 14px; bg --c-surface-2; border:1.5px solid --c-border; r4; 16px; outline:none; appearance none; transition border-color .18s, box-shadow .18s`; toggle `absolute; right:6px; top:50%; translateY(-50%); 44 x 44; color --c-text-3; svg 18 x 18` (stroke-width 2); submit wrapper `margin-top:auto; padding-top:16px`; `.btn-primary` `100% x 52; bg --c-primary; r4; 16/600 #fff; flex centre; gap 8; transition background .12s, transform .08s`; hover bg `#003D4F` (D `#10A898`); `:active{transform:scale(.98)}`; `:disabled{bg --c-text-3; color --c-text-2; cursor:not-allowed}`.
* Focus (verified with a real click): `.input-field:focus` gives `border-color --c-primary; bg --c-surface; box-shadow 0 0 0 4px --c-primary-ghost` AND the global `input:focus-visible` (specificity 0,1,1 beats `.input-field{outline:none}`) adds `outline:2px solid; offset 2px` (light `--c-primary-dark` = `#005268`, dark `--c-primary` = `#17C3AF`) => a double ring. Buttons get only the global ring (`outline:2px solid ..; offset 2px; radius 4px`).
* Error handling: only a toast "Enter your email and password." when email is empty or password < 4 chars. No inline error styles, no field-invalid state, no wrong-password failure (any email + 4 chars succeeds).
* Loading: submit text becomes "Verifying…" (U+2026) and `disabled` (bg `--c-text-3`, text `--c-text-2`), after 1400 ms resets to "Confirm Identity" and calls `afterAuthSuccess()`.
* Password toggle: inline `onclick` swaps `type` between `password`/`text`; icon does not change (only the eye glyph exists, no eye-off).
* Entering the screen (`goToPwFallback`) clears both inputs, resets the button; the Face ID overlay and launch are hidden.

### 2.10 Navigation / transitions

Two stacked screens only: `SCREEN_ORDER = ['s-home','s-pwfallback']`. `goToScreen(id)` slides: target `translateX(0); opacity 1`, others `translateX(-100%)` (before target) or `translateX(+100%)` (after), opacity 0; `.38s cubic-bezier(.4,0,.2,1)` + opacity `.3s`. "Back to Face ID" -> `goToScreen('s-home')` + show overlay + `startFaceID()` after 200 ms (the overlay appears OVER the home, not over the launch). There is no tab bar / nav bar / home indicator.

### 2.11 Buttons inventory

| Button | Class / id | Size | Fill | Radius | Notes |
|---|---|---|---|---|---|
| Primary CTA | `.btn-primary` | 100% x 52 | `--c-primary` | 4 | pw "Confirm Identity"; hover/active/disabled above |
| Sheet copy | `.sheet-copy-btn` | 100% x 52 | `--c-primary` | 8 | active opacity .85; disabled; "✓ Copied!" state |
| Secondary (Use Passcode) | `.faceid-fallback-link` | auto x 42 | `rgba(0,0,0,.06)` | 4 | text `--c-text-2` |
| Chip outline danger | `.session-compact-signout` | auto x 36 | transparent + 1px danger | 4 | no hover |
| Dialog cancel / confirm | `.confirm-btn-*` | flex x 46 (min 44) | `--c-surface-2` / `--c-danger` | 4 | active opacity .7 |
| Text link | `.sheet-block-link` | 100% x 38 | none | - | underline, danger |
| Back | `.fb-back` | auto x 44 | none | - | icon 15px + text |
| Icon toggle | `.input-toggle` | 44 x 44 | none | - | |
| Outline danger (unused) | `.btn-danger` | 100% x 48 | transparent + `1.5px solid --c-danger` | 4 | 14/600; hover `rgba(218,77,67,.06)` (D `rgba(255,107,107,.10)`) |

---------------------------------------------------------------------------------------------------

## 3. JavaScript behaviour

### 3.1 Launch constellation canvas (L1237-1288 light, D~1262-1352 dark)

| | Light | Dark |
|---|---|---|
| Dots | `COUNT=45` | `NODE_COUNT=52` |
| Link distance | `DIST=120` | `CONNECT_DIST=90` |
| Speed | `vx,vy = (rand-.5)*.22` | `(rand-.5)*SPEED`, `SPEED=0.28` |
| Radius | `rand*1.2+.8` | `rand*1.4+.8` |
| Colour | `rgb 0,45,70`: dot fill `rgba(0,45,70,.28)`; line `rgba(0,45,70,.12*(1-d/DIST))`, lineWidth .7 | teal `rgba(23,195,175,..)`: dot `0.55`, glow circle `r*2.5` at `0.08`; line alpha `(1-d/90)*0.22`, lineWidth 0.7 |
| Edges of canvas | wrap-around | bounce (velocity flips) |
| Canvas size | `canvas.offsetWidth \|\| 390` x `offsetHeight \|\| 800` | `canvas.parentElement.getBoundingClientRect()` (`\|\| 390` x `\|\| 844`) |
| Stop | MutationObserver on `#s-launch.hidden` -> `running=false; cancelAnimationFrame` | same, cancels raf. Neither restarts on re-show (later launch screens show a static bg) |

### 3.2 Flow state machine

Globals: `currentScreen='s-home'`, `faceIDContext='unlock'`, `appUnlocked=false`.
1. Load: `showLaunch(cb)` (launch visible, `setTimeout(cb,1800)`); also `setTimeout(startFaceID,600)`. After 1800 ms: `showFaceIDOverlay(); resetFrame(); startFaceID()`.
2. `startFaceID()`: reset classes/lottie, 60 ms later add `.active` + `lottie.play()`; `faceIDTimer = setTimeout(..., 2200)` -> add `.completed`, `lottie.stop()`, `afterAuthSuccess()`.
3. `afterAuthSuccess()`: hide Face ID overlay, hide launch, `goToScreen('s-home')`, `appUnlocked=true`; if `faceIDContext==='signin'` -> after 400 ms `showSignInSheet()`; reset context to `'unlock'`.
4. "Use Passcode" -> `goToPwFallback()` (cancel timers, hide overlay+launch, reset form, slide to pw). "Confirm Identity" -> validation -> 1400 ms "Verifying…" -> `afterAuthSuccess()`.
5. Push (BroadcastChannel `enigma_auth`, message `{type:'sign_in_request'}`) -> `showPushBanner()` (9000 ms). Tap -> `openFromBanner()`: hide banner, `faceIDContext='signin'`, hide overlay; if already unlocked, show overlay + Face ID again (-> sheet after success), else show launch again (1800 ms) then Face ID.
6. `{type:'code_used'}` -> `handleCodeUsed()` (3.3 confirmed state), even if the sheet is not open.
7. Sign out: tap chip -> `signOutSession(id,loc)` builds dialog copy, shows; Cancel clears; Confirm hides dialog, fades the row (230 ms) and removes it, toast `Signed out of ${loc} session.`.
8. Sheet timers: `EXPIRY_SECS=180`, `setInterval(1000)`, urgent at `<= 30`, at 0 auto-dismiss + toast; `dismissSignInSheet()` closes and `setTimeout(resetCodeCard,450)`.
9. `copyCode()`: `navigator.clipboard.writeText('482716')` (try/catch); button "✓ Copied!" 2000 ms.
10. Clock: `updateClock()` on load + every 10 s (status bar only). `sheet-time` is computed once at load.

### 3.3 Timings summary

launch 1800 ms (+ Face ID scan 2200 ms = ~4.0 s to home) | Face ID `.active` delay 60 ms | pw verify 1400 ms | back-to-Face-ID delay 200 ms | sign-in sheet after unlock 400 ms | banner auto-hide 9000 ms | toast 3000 ms | copy reset 2000 ms | sheet reset after close 450 ms | code expiry 180 s, urgent <= 30 s | confirmed auto-close 2800 ms (+220 ms fade, +500 ms reveal) | block toast delay 150 ms | row removal 230 ms.

### 3.4 Cross-document coupling

`new BroadcastChannel('enigma_auth')` (legacy "enigma" name, L1230). The web sign-in page (`makor-signin.html`) posts `sign_in_request` and `code_used`. Open tabs of either authenticator (light or dark) all react. (Observed while harvesting: another tab's sign-in flow popped the banner / "Sign-in confirmed" in this prototype.) Gestures: none (no swipe, drag, long-press); only click handlers.

---------------------------------------------------------------------------------------------------

## 4. Source oddities, bugs and inconsistencies (kept as found; owner decides)

1. `--font-serif: 'EB Garamond'` (L27) never loaded / never used; no serif anywhere. The derived system's "EB Garamond headings" claim is not in this source.
2. `--c-primary-dark` and `--c-primary-dim` are duplicates of `--c-primary` in light (L16-17); in dark `--c-primary-dark:#0A7A8E` is dead (D33, D138 override to `--c-primary`); `--c-primary-dim` is never referenced in either file.
3. `--c-primary-ghost:#00526814` (8-digit hex) in light vs `rgba(23,195,175,0.13)` in dark: inconsistent notation and alpha (.08 vs .13).
4. `--c-black` is `#0C1219` in dark (a bg tone, not black); dark toast ignores it and hard-codes `#192533` / `#1E2F3C`, which equal `--c-surface-2` / `--c-border`.
5. Many un-tokenised colours (see 1.2): home gradient `#0D8090/#0A5888/#1E3578`, hover `#003D4F` / `#10A898`, launch `#C8D8DF` / `#071018`, body `#080F15`, sheet-map `#152030`, map palette. Home gradient's indigo `#1E3578` stop is identical in dark.
6. Dead / unreachable CSS: `.btn-danger` (L156-164, no markup), `.session-current*` + `.session-row*` (L355-387), `.home-avatar` (L346-350), `.sheet-otp.used` (L598, never applied), `.faceid-sub` (display:none, empty `<p>` L696), `.sessions-empty` (never shown), `.fid-wrapper.active/.completed` (JS adds, no CSS), `.screen-sub`/`.eyebrow` only used on pw screen.
7. The OTP is static (`482 716`); sheet "Time" is frozen at page-load time; banner time is the literal "now"; there is no code regeneration, no ring/progress UI.
8. Cancel-by-overlay / swipe-down / Esc absent for the sheet and the dialog although the sheet has a drag handle.
9. `.sheet-code-expiry.urgent` (L591) is declared before `.sheet-code-expiry` (L599) - works only via specificity.
10. Double focus ring on inputs (global outline + `.input-field:focus` ring) and `.input-field{outline:none}` is overridden by `input:focus-visible`.
11. `.shell` radius `min(44px,4vw)` becomes 15-17px on phone-width viewports (visible rounded corners on a real device).
12. Push banner `svg` attrs 28 x 22 but CSS forces 24 x 19 (L119); the home icon uses 28 x 22; launch 56 x 45.
13. `.faceid-card` click-to-restart is guarded by `.active` which is never removed => dead interaction (L1042-1045).
14. Status-bar colour swaps with `!important` and no transition; the Face ID overlay blur covers the status bar (it is blurred while locked).
15. BroadcastChannel name `enigma_auth` (legacy product name) in a Makor file; hub entry in `projects.js` still ships `enigma-authenticator.html` too.
16. Remote runtime dependencies: Google Fonts (Geist), `unpkg.com/@dotlottie/player-component@latest` (unpinned), `lottie.host` Lottie. Offline => no Face ID visual, fonts fall back to `-apple-system, sans-serif`.
17. Light vs dark launch-name weight differs (500 vs 400); home-logo-name is 400 in both.
18. Contrast (computed, approximate WCAG): white on dark `#17C3AF` buttons ~2.2:1; white on dark `#FF6B6B` (danger confirm, danger toast) ~2.8:1; light `--c-text-3` `#A8B6CD` on white ~2.05:1 for meta/labels; white on light `#DA4D43` toast ~4.1:1.
19. Light `--c-surface-2` equals `--c-bg` (`#F5F5F8`); on the pw screen (white) it reads as a tinted input, but on the home page the flag tile / spec grid sit on white so it works only because the parent is `--c-surface`.
20. The prompt's "body.dark @keyframes" invalid-CSS pattern does NOT exist in this source (all three `@keyframes` are top-level, valid).
21. Inline styles carry real design (London card L729-755, pw header L795-797, `label-active` colour L728) instead of classes.
22. Time pill in the sheet is "9:41 AM" by default in markup but replaced at load; status-bar default text is "9:41".

---------------------------------------------------------------------------------------------------

## 5. GAPS (searched for, not present)

* `prefers-reduced-motion`: none (0 matches). Many motions would need it (screen slide, sheet, banner, pulse, constellation, Lottie).
* `@media` queries: none (0). No `prefers-color-scheme` switching: dark is a second document.
* ARIA / semantics: one `aria-label` (password toggle). No `role="dialog"/"alertdialog"` on confirm/sheet, no `aria-modal`, no `aria-live` on toast/countdown/status, no `role=status`; banner is a clickable `div` (not focusable, no key handler); `[tabindex]` appears only in the focus-visible selector; lottie shadow root has `role="img"` with generic label. No focus trap or focus return for dialog/sheet.
* Focus-visible: exists (global rule L32-36) but no per-component design (cards, chips use the global ring only).
* Hover / pressed states missing: sign-out chip, sheet copy hover, back link, input-toggle, session rows, block link; only `.btn-primary`, fallback link, `.btn-danger` (dead) have hover.
* Safe-area insets (`env(safe-area-inset-*)`): none despite `viewport-fit=cover`; no home indicator or notch; status bar is a fixed 44 px.
* Spacing / size / radius / shadow / z-index / motion tokens: none (only 14 colour tokens and 3 fonts). All numeric values are literals.
* Error states: no input-invalid style, no wrong-password failure, no network/expired-code error UI beyond toast, no Face ID failure / retry-limit state, no lockout.
* Empty state wired: none (markup only). Loading skeleton: none. Offline: none.
* OTP: no refresh cycle/ring/progress, no `text-selection` or `user-select` policy, no copy fallback UI.
* Disabled/readonly input styles, checkbox/radio/switch/select components: none (not part of this app).
* Tablet / landscape: none; reduced-transparency fallback for `backdrop-filter`: none.
* Icons: only 7 inline icons; no eye-off glyph, no `fill` classes; the Face ID art is an external Lottie with no local fallback.

---------------------------------------------------------------------------------------------------

## 6. Drift observed vs the derived `makorx-ai/auth-design-system/CLAUDE.md` (not trusted as truth)

* It says dark mode is activated by `body.dark` / `[data-mode="dark"]`: the source has NO such selector; dark is a separate HTML file with a different `:root`.
* It lists the mobile "Avatar / initials badge" as an in-scope component: in the source `.home-avatar` is dead CSS with no markup (L346-350).
* It lists "Mobile focus ring `0 0 0 4px rgba(0,82,104,0.078)`": source token is `#00526814` (= rgba(0,82,104,.0784)) - matches numerically, but dark uses `rgba(23,195,175,0.13)`.
* It states primary buttons are 4px radius on mobile: true for `.btn-primary`, but the sheet copy button is 8px (L602).
* It states "Do not use border-radius above 4px on toasts or primary buttons in mobile": the source toast is 4px, but `.sheet-copy-btn` is 8px.
* It treats the OTP display as having used/expired styling in use: `.sheet-otp.used` exists in CSS only.
* Face ID Lottie URL, wrapper 180x180 r12, inset -14px, dark tint `rgba(10,35,55,0.72)` + `mix-blend-mode:color`, banner values, sheet easing: all match the source.

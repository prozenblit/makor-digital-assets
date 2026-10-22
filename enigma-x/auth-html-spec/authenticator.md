# Enigma X Mobile Authenticator — harvested spec (source of truth = built prototype)

Source: `hub/auth/enigma-authenticator.html` (1315 lines). Served: `http://localhost:3456/hub/auth/enigma-authenticator.html`.
Method: whole file read, then driven in a real browser tab; effective values measured with `getComputedStyle` / `getBoundingClientRect`. Values are quoted as written in the source; anything only seen in the browser is marked **(computed)**.
Notation: `L123` = source line 123. Alpha hex `#7AEFEF18` is alpha 0x18 = 24/255 = `rgba(122,239,239,0.094)` (computed).
Capture note: viewport used 600x900 (shell 390x844 fully visible), DPR 2 (computed). Chrome snaps borders to device pixels: `1.5px` borders report as `1.33333px`, `1px` as `0.666667px` (computed) — source values are 1.5px / 1px.

---------------------------------------------------------------------------------------------------

## 0. Page, fonts, external dependencies

| Item | Value | Ref |
|---|---|---|
| `<title>` | `Enigma Authenticator` | L6 |
| viewport meta | `width=device-width, initial-scale=1.0, viewport-fit=cover` | L5 |
| Google Fonts | `https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@500;600&display=swap` (loaded faces, computed: DM Sans 400/500/600/700, DM Mono 500) | L9 |
| dotLottie player | `<script type="module" src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs">` (unpinned `@latest`) | L10 |
| Face ID Lottie | `https://lottie.host/2c89c12e-4c0d-41a6-ae13-30b2ce7a964a/kjwDIWFPeM.lottie` (third-party hosted, same URL in the Makor authenticator) | L677 |
| Page `lang` | `en` | L2 |
| Media queries | **none** (no `@media` anywhere). Responsiveness is only `min()` in `.shell` | — |
| Dark mode | none | — |

Font tuples (as written):
- `--font-sans: 'DM Sans', -apple-system, sans-serif;` (L27)
- `--font-mono: 'DM Mono', monospace;` (L28)
- Body = `var(--font-sans)` (L38). Mono is used on: status-bar time (L64), OTP code (L577), OTP countdown (L583), London-card IP address inline style (L747).
- Cross-system: Enigma MAIN trading app Figma uses **Geist / Geist Mono**; this authenticator uses **DM Sans / DM Mono**. (The Makor authenticator uses Geist for everything, see section 3.)

---------------------------------------------------------------------------------------------------

## 1. Foundations as used

### 1.1 CSS custom properties (`:root`, L12-L29)

| Property | Value | Role | var() use count in file (computed) |
|---|---|---|---|
| `--c-bg` | `#F7F8F8` | page + shell + home-screen background | 3 |
| `--c-surface` | `#FFFFFF` | cards, sheet, dialog, pw screen | 6 |
| `--c-surface-2` | `#F7F8F8` | inputs default bg, flag tiles, code card, cancel btn (same value as `--c-bg`) | 6 |
| `--c-primary` | `#7AEFEF` | primary button bg, focus border, live dot, loc dot, avatar, confirmed-check | 8 |
| `--c-primary-dark` | `#3DBFBF` | home banner bg, status-bar bg (home), eyebrow, push-banner icon bg, focus-visible outline | 5 |
| `--c-primary-dim` | `#3DBFBF` | **never used** (0 uses) | 0 |
| `--c-primary-ghost` | `#7AEFEF18` | focus ring shadow, live-dot halo, confirmed-icon bg | 4 |
| `--c-black` | `#000000` | toast bg, avatar text, copy-button text | 3 |
| `--c-text` | `#1A1F36` | body text, headings | 18 |
| `--c-text-2` | `#7C9CAC` | secondary text/labels | 11 |
| `--c-text-3` | `#A8BECD` | tertiary, placeholders, timestamps, disabled bg | 18 |
| `--c-border` | `#DEE8ED` | card/input borders, dividers, sheet handle, map base | 5 |
| `--c-danger` | `#E5686A` | sign-out, block link, urgent timer, danger toast, confirm destructive | 8 |
| `--c-success` | `#4DCC9B` | "Active now" label | 1 |
| `--font-sans` / `--font-mono` | see 0 | | 11 / 4 |

Hard-coded colours (not tokenised):
`#000` (btn-primary text L143), `#fff` (toast text L164, launch bg L180, home logo name L307, confirm danger text L494), `#5ADADA` btn-primary hover (L147), `rgba(229,104,106,.06)` btn-danger hover (L159, class unused), `rgba(0,0,0,.06/.10/.15)` Use-Passcode pill states (L276, L285-286), `rgba(235,235,235,.12)` Face-ID blur tint (L209), `rgba(255,255,255,.22)` home logo tile (L301), `rgba(0,0,0,0.20)` push-banner glass (L99), `rgba(255,255,255,0.14)` banner border (L104), `rgba(255,255,255,0.22)` banner inset highlight (L107), `rgba(255,255,255,0.92)` map pill (L534), `rgba(0,0,0,.45)` sheet overlay (L500), `rgba(0,0,0,.4)` confirm overlay (L449), `rgba(255,255,255,0.9)` status bar on teal (L313-314), `#404042` Face-ID Lottie card (computed from Lottie SVG `fill="rgb(64,64,66)"`).

### 1.2 Palette (roles)
- Brand light teal `#7AEFEF` — action fills. Dark teal `#3DBFBF` — chrome (banner/status bar), eyebrow text, drop pin, push icon, focus-visible outline. Hover teal `#5ADADA` (hard-coded L147; applies to the only `.btn-primary`, the password "Confirm Identity").
- Text on brand fill is black (`#000`) for both buttons (`.btn-primary` L143, `.sheet-copy-btn` L587).
- Status: danger `#E5686A`, success `#4DCC9B`. There is no warning/info colour.
- Disabled: bg `#A8BECD`, text `#7C9CAC` (L149, L593).
- Map illustration colours: see section 4/assets (`#DEE8ED`, `#C8D6DF`, `#A8BECD`, `#94AABB`, `#F7F8F8`, `#8BEEC8`, `#3DBFBF`).

### 1.3 Typography scale actually used (family DM Sans unless noted; `line-height` is `normal` unless stated)

| Element (selector, line) | size / weight | letter-spacing | colour | other |
|---|---|---|---|---|
| status time `.status-bar .time` L64 | 16px / 600 **DM Mono** | normal | inherits `#1A1F36` (or `rgba(255,255,255,0.9)` on home) | |
| launch name `.launch-app-name` L189 | 18px / 700 | -.02em (-0.36px computed) | `#1A1F36` | |
| Face-ID label `.faceid-locked-label` L265 | 16px / 600 | -.01em (-0.16px) | `#1A1F36` | |
| Use Passcode `.faceid-fallback-link` L273 | 14px / 600 | -.01em | `#7C9CAC` | |
| home banner name `.home-logo-name` L306 | 16px / 700 | -.02em (-0.32px) | `#fff` | |
| home title `.home-header-left .screen-title` L136+L321 | 20px / 700, line-height 1.2 (24px) | normal | `#1A1F36` | margin-top 6px |
| pw title (inline L792) | 22px / 700, line-height 1.2 (26.4px) | normal | `#1A1F36` | `margin-top:0; margin-bottom:6px` |
| pw sub `.screen-sub` L137 | 14px / 400, line-height 1.55 (21.7px) | normal | `#7C9CAC` | inline `margin:0; font-size:14px` |
| eyebrow `.eyebrow` L132 | 10px / 700 | .12em (1.2px) | `#3DBFBF` | uppercase |
| list group label `.other-sessions-label` L366 | 12px / 700 | .1em (1.2px) | `#A8BECD` (active label inline `#4DCC9B`) | uppercase |
| session loc `.session-compact-loc` L387 | 14px / 600 | normal | `#1A1F36` | |
| session meta `.session-compact-meta` L388 | 12px / 400 | normal | `#A8BECD` | margin-top 2px |
| flag tile `.session-compact-flag` L377 | 12px / 700 | .04em (0.48px) | `#7C9CAC` | centred |
| sign-out btn `.session-compact-signout` L389 | 12px / 600 | normal | `#E5686A` | |
| London detail label (inline L734) | 10px / 700 | .09em | `#A8BECD` | uppercase |
| London detail value (inline L735) | 12px / 600 | normal | `#1A1F36` | IP value uses DM Mono (L747) |
| push app name L114 | 12px / 600 | .02em (0.24px) | `rgba(255,255,255,0.80)` | uppercase |
| push time L118 | 12px / 400 | normal | `rgba(255,255,255,0.60)` | |
| push title L128 | 14px / 700, line-height 1.3 (18.2px) | normal | `rgba(255,255,255,1.0)` | |
| push sub L129 | 12px / 400, line-height 1.4 (16.8px) | normal | `rgba(255,255,255,0.78)` | margin-top 2px |
| `.btn-primary` L139 | 16px / 600 | normal | `#000` | |
| input label `.input-group label` L417 | 12px / 600 | .04em (0.48px) | `#7C9CAC` | uppercase |
| input text `.input-field` L422 | 16px / 400 | normal | `#1A1F36` | placeholder `#A8BECD` (L436) |
| back link `.fb-back` L408 | 14px / 500 | normal | `#A8BECD` | |
| confirm title L468 | 16px / 700 | -.01em (-0.16px) | `#1A1F36` | |
| confirm body L473 | 14px / 400, line-height 1.45 (20.3px) | normal | `#7C9CAC` | |
| confirm button L480 | 14px / 600 | normal | cancel `#7C9CAC`, danger `#fff` | |
| sheet pill text L538 | 12px / 600 | normal | `#1A1F36` | |
| sheet section title L552 | 10px / 700 | .1em (1px) | `#A8BECD` | uppercase |
| sheet info label L562 | 10px / 600 | .07em (0.7px) | `#A8BECD` | uppercase |
| sheet info value L563 | 14px / 600 | normal | `#1A1F36` | |
| code label L574 | 12px / 700 | .08em (0.96px) | `#A8BECD` | uppercase |
| countdown L583 | 14px / 600 **DM Mono** | normal | `#7C9CAC`; `.urgent` `#E5686A` (L575) | |
| OTP L577 | **38px / 600 DM Mono** | .18em (6.84px) | `#1A1F36` | flex-centred, margin-bottom 12px |
| copy button L584 | 16px / 600 | normal | `#000` | |
| block link L594 | 14px / 500 | normal | `#E5686A` | underline, offset 4px |
| confirmed h3 L616 | 18px / 700 | normal | `#1A1F36` | margin-bottom 4px |
| confirmed p L617 | 14px / 400 | normal | `#7C9CAC` | |
| toast L162 | 14px / 500 | normal | `#fff` | centred |
| empty `.sessions-empty` L397 | 14px / 400 | normal | `#A8BECD` | centred, padding 20px 0 |

Sizes in use: 10, 12, 14, 16, 18, 20, 22, 24 (declared base `.screen-title`, never effective), 26 (`.sheet-otp.used`, never applied), 38.

### 1.4 Radii (map to element)

| Radius | Element |
|---|---|
| `min(44px, 4vw)` | `.shell` (L50). 24px at 600px viewport; 15px at 375px viewport; 44px at >=1100px viewport (computed) |
| 22px | `.push-banner-inner` (L102) |
| 14px | `.confirm-dialog` (L458) |
| 12px | `.push-banner-app-icon` (L122) |
| 10px | `.home-logo-icon` (L302) |
| 8px | `.session-compact` (L372), London detail grid (inline L732), `.sheet-code-card` (L567), `.sheet-copy-btn` (L586), `.bottom-sheet` top corners `8px 8px 0 0` (L510) |
| 4px | buttons (`.btn-primary` L142, `.btn-danger` L154, sign-out L391, Use Passcode L277, confirm btns L481), inputs (L426), toast (L165), flag tile (L356 row icon, L378 flag), `.sheet-map` (L529), `.map-location-pill` (L536), `.sheet-handle` (L521), focus-visible outline (L35) |
| 50% | `.session-dot`, `.loc-dot`, `.sheet-confirmed-icon`, `.home-avatar` (unused) |
| 0 | status bar, screens, home banner, launch, overlays |

### 1.5 Borders
- Input: `1.5px solid #DEE8ED` (L425); focus colour `#7AEFEF`.
- London card: inline `border: 1.5px solid var(--c-border)` (L722) — the only card with a border; `.session-compact` itself has none.
- Sign-out button: `1px solid #E5686A` (L390). `.btn-danger` (unused): `1.5px solid #E5686A` (L152).
- pw header divider: `border-bottom: 1px solid #DEE8ED` (L406).
- Push banner: `1px solid rgba(255,255,255,0.14)` (L104).
- Focus-visible global: `outline: 2px solid #3DBFBF; outline-offset: 2px; border-radius: 4px` (L32-36), applied to buttons and inputs.

### 1.6 Shadows
| Element | Value |
|---|---|
| `.shell` L51 | `0 24px 64px rgba(0,0,0,.18), 0 0 0 2px rgba(0,0,0,.07)` |
| `.session-current` (unused) L335 | `0 2px 10px rgba(0,0,0,.06)` |
| push banner inner L105-107 | `0 6px 32px rgba(0,0,0,0.18), inset 0 2px 0 rgba(255,255,255,0.22)` |
| `.confirm-dialog` L462 | `0 8px 40px rgba(0,0,0,.2)` |
| `.bottom-sheet` L516 | `0 -8px 40px rgba(0,0,0,.18)` |
| `.map-location-pill` L539 | `0 2px 8px rgba(0,0,0,.12)` |
| input focus L434 | `0 0 0 4px #7AEFEF18` |
| `.session-dot` L344 | `0 0 0 4px #7AEFEF18` (animated, see 1.8) |
There are no gradients in CSS (none in the whole file).

### 1.7 Blur / glass
- `.push-banner-inner`: `backdrop-filter: blur(48px)` + `-webkit-` (L100-101), bg `rgba(0,0,0,0.20)`.
- `.faceid-blur-bg`: `backdrop-filter: blur(6px)` + `-webkit-` (L210-211), bg `rgba(235,235,235,.12)`.
- `.map-location-pill`: `backdrop-filter: blur(8px)` (no `-webkit-`, L535), bg `rgba(255,255,255,.92)`.

### 1.8 Transitions and animations (exact)

| Target | Value | Ref |
|---|---|---|
| `.screen` (home/pw) | `transform .38s cubic-bezier(.4,0,.2,1), opacity .3s ease` | L79 |
| `.push-banner` | `transform .42s cubic-bezier(.32,0,.04,1)`; hidden `translateY(-130%)`, shown `translateY(0)` | L93, L92, L96 |
| `.toast` | `transform .28s cubic-bezier(.4,0,.2,1), opacity .28s ease`; hidden `translateY(80px)` + opacity 0 | L168 |
| `#s-launch` | `opacity .3s ease` (hide = opacity 0) | L185 |
| `#s-faceid` | `opacity .25s ease` | L201 |
| `.faceid-blur-bg` enter | `animation: blurFadeIn .65s ease both` (0% opacity 0 -> 100% opacity 1) | L226-232 |
| `.faceid-wrap` enter | `animation: faceIDContentIn .2s ease .25s both` (opacity 0 -> 1, delay .25s) | L234-240 |
| `.btn-primary` | `background .12s, transform .08s`; `:hover` bg `#5ADADA`; `:active` `transform: scale(.98)` | L145-148 |
| `.btn-danger` (unused) | `background .12s` | L157 |
| `.faceid-fallback-link` | `background .15s, color .15s` | L282 |
| `.session-compact` | `opacity .23s, transform .23s` (+ inline `opacity .23s ease, transform .23s ease` on removal, scale(.97)) | L375, L1172-1174 |
| London card reveal (JS) | inline `transition: opacity .3s ease, transform .3s ease`, from `opacity:0; transform:scale(.97)` | L1148-1151 |
| `.input-field` | `border-color .18s, box-shadow .18s` | L428 |
| `.confirm-overlay` | `opacity .2s ease` | L453 |
| `.confirm-dialog` | `transform .2s ease`; `scale(.95)` -> `scale(1)` | L463-467 |
| `.confirm-btn` | `opacity .15s`; `:active` opacity .7 | L483, L487 |
| `.sheet-overlay` | `opacity .35s ease` | L502 |
| `.bottom-sheet` | `transform .42s cubic-bezier(.32,0,.04,1)`; closed `translateY(100%)`, `.open` `translateY(0)` | L512, L511, L518 |
| code card fade (JS) | inline `transition: opacity .2s` | L1284 |
| `.session-dot` | `animation: dotpulse 2.4s ease infinite` | L345 |
| `@keyframes dotpulse` | `0%,100% { box-shadow: 0 0 0 4px var(--c-primary-ghost) } 50% { box-shadow: 0 0 0 6px transparent }` | L347-350 |
| Face ID scan | not CSS — dotLottie `Flow 2`, 150x148, 244 frames @ 60fps = 4.0667s loop (computed from `getLottie()`); JS cuts it at 2200ms (~frame 132) | L254-262, L1072-1088 |

Note: there is **no code ring / progress bar / spinner** and no keyframe for the OTP; the countdown is text only. There is no `prefers-reduced-motion` handling.

### 1.9 Z-index map
`#s-launch` 40 (L179) < `#s-faceid` 50 (L199) < `.sheet-overlay` 100 (L503) < `.bottom-sheet` 101 (L513) < `.confirm-overlay` 200 (L450) < `.push-banner` 300 (L91) < `.toast` 999 (L169). `.faceid-wrap` 1 (inside overlay, L217). Status bar / screens: auto (sit under the launch, Face-ID overlay, sheet overlay and banner, i.e. banner and overlays cover the status bar).

### 1.10 Spacing / sizes inventory
Shell 390 x 844 (`min(390px,100vw)` x `min(844px,100dvh)`); status bar 44px; home banner 72px (padding 14px 20px, content 44px); home header padding `24px 24px 12px` (66px tall); list padding `0 24px 32px`; card gaps 8px (margin-bottom between compact cards), 10px label bottom; sheet body padding `16px 20px 32px`; sheet handle 36x4 margin `12px auto 4px`; map 160px tall margin `0 16px`; buttons 52px (primary, copy), 48px (danger, unused), 44px min (confirm btns, back, toggle), 36px (sign-out, flag tile, avatar); input 48px, padding `0 44px 0 14px`; toast `bottom:32px; left:16px; right:16px; padding:14px 16px`; dialog `width: calc(100% - 48px); max-width: 320px; padding 20px 20px 12px` (measured 320x184.208, computed); fid wrapper 180x180; launch svg 108x108; push icon tile 44x44 with svg 22x22 (CSS, overrides the `width="26" height="26"` attributes); home logo tile 44x44 with svg 30x30; flag tile 36x36; confirmed icon 56x56 with svg 28x28; status icons 16x16 with gap 6px; password toggle button 44x44 (right 6px) with svg 18x18; dots 8x8 with halo 4px (to 6px).

---------------------------------------------------------------------------------------------------

## 2. Screens and components

### 2.0 DOM order inside `.shell` (L622-934)
`#s-launch` -> `.status-bar` -> `#push-banner` -> `#s-faceid.hidden` -> `.screens` { `#s-home.screen`, `#s-pwfallback.screen` } -> `#confirm-overlay` -> `#sheet-overlay` -> `#sign-in-sheet.bottom-sheet` -> `#toast`.

### 2.1 Phone frame (`.shell`, L46-55)
- `width: min(390px, 100vw); height: min(844px, 100dvh); background: #F7F8F8; border-radius: min(44px, 4vw); box-shadow: 0 24px 64px rgba(0,0,0,.18), 0 0 0 2px rgba(0,0,0,.07); overflow: hidden; display:flex; flex-direction:column; position:relative`.
- Body: `min-height:100dvh; display:flex; align-items:center; justify-content:center; background:#F7F8F8; -webkit-font-smoothing:antialiased` (L37-43). Shell is centred, **not scaled**: at windows smaller than 390x844 it shrinks to the window (full-bleed, radius 4vw), at larger it stays 390x844 (computed: 600x900 window -> shell 105,28 390x844 radius 24px; 1400x1000 -> 505,78 radius 44px; 375x812 -> 0,0 375x812 radius 15px).
- There is **no notch / dynamic island, no home indicator, no bezel**. The "phone" is just the rounded rectangle + status bar row.

### 2.2 Status bar (`.status-bar`, L58-66; DOM L633-639)
- `height:44px; flex-shrink:0; display:flex; align-items:center; justify-content:space-between; padding:14px 28px 0; color:#1A1F36`.
- Content: `<span class="time" id="sb-time">9:41</span>` (DM Mono 16/600) + two 16x16 SVG icons (Wi-Fi, battery; `fill: var(--c-text)`) with `gap:6px`. No signal bars, no percentage.
- Time text = real clock `h:mm` 12-hour, no AM/PM (L977-984), refreshed every 10000ms (L985). Initial markup `9:41`.
- State `.status-bar--teal` (L313-314): `background:#3DBFBF !important; color:rgba(255,255,255,0.9) !important`, icons `fill: rgba(255,255,255,0.9) !important`. Added on load (L986) and toggled by `goToScreen` (on for `s-home`, off for `s-pwfallback`, L954). On the pw screen the bar has no background of its own (shows shell `#F7F8F8` above the white screen).
- The launch screen, Face-ID overlay, sheet overlay and push banner all paint over the status bar.

### 2.3 Launch / splash (`#s-launch`, L176-192; DOM L625-630)
- `position:absolute; inset:0; z-index:40; background:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:40px; padding-bottom:18%` (= 70.1979px at 390 width, computed — percentage of width); `transition:opacity .3s ease`.
- Children: Enigma logo `svg width=108 height=108 viewBox="0 0 40 40"` filled `#3DBFBF` (asset `app-enigma-logo-teal.svg`) and `<p class="launch-app-name">Enigma Authenticator</p>` (18/700, -.02em, `#1A1F36`).
- Measured (computed): logo at x 246..354 / y 329.23 (page, shell y offset 28 -> 301.23 in shell), name box 186.34 x 23.33 at y 477.23 (page). Gap logo->name 40px.
- `.hidden`: `opacity:0; pointer-events:none`.
- Stays visible UNDER the Face-ID overlay on a cold open (so the blurred backdrop of the first Face-ID prompt is white, not the home screen).

### 2.4 Face ID unlock (`#s-faceid`, L194-262; DOM L664-693)
Structure: `#s-faceid.hidden` > `.faceid-blur-bg` + `.faceid-wrap` > [`.faceid-card#fid-frame-wrap` > `.fid-wrapper#fid-wrapper` > `dotlottie-player#fid-lottie`] + `<p class="faceid-locked-label">Enigma Authenticator locked</p>` + `<p class="faceid-sub" id="faceid-sub">` (empty, `display:none` L270) + `.faceid-bottom` > `<button class="faceid-fallback-link">Use Passcode</button>`.
- `#s-faceid`: `position:absolute; inset:0; z-index:50; opacity:1; pointer-events:auto; transition:opacity .25s ease; display:flex; flex-direction:column`. `.hidden`: `opacity:0; pointer-events:none`. Initial DOM state is `hidden`.
- Blur layer: `rgba(235,235,235,.12)` + `blur(6px)`; fades in `.65s ease both`.
- `.faceid-wrap`: `position:relative; z-index:1; flex:1; min-height:0; flex column; align-items:center; justify-content:center; padding:0 24px 80px; text-align:center; gap:0`; fades in `.2s ease .25s both`.
- `.faceid-card`: transparent, `margin-bottom:20px; cursor:pointer; -webkit-tap-highlight-color:transparent` (180x180 computed).
- `.fid-wrapper`: `width:180px; height:180px; position:relative; cursor:pointer; flex-shrink:0; display:block`. Player inline style `display:block;width:180px;height:180px;`.
- The Lottie renders an SVG (viewBox 0 0 150 148) = dark rounded card `fill #404042` (corner radius 9.02 units = 10.824px at 1.2 scale) with white strokes/fills `#FFFFFF`, label text "Face ID" in the card. Sequence seen: face glyph (frame ~30) -> circle/scan -> circle with check mark (frame ~150). Card fills the whole 180px square (computed: 180 x 177.6). The Lottie is not extractable as inline SVG (third-party); only its URL is recorded.
- Measured (computed, page coords at shell x=105,y=28): card 210,256.33 180x180; label 190.16,456.33 219.68x20.67; fallback pill 226.16,521 147.68x42.67; `.faceid-bottom` margin-top 32px; fallback `margin-top:12px`.
- Label text colour `#1A1F36`, 16/600. Fallback pill: `background:rgba(0,0,0,.06); color:#7C9CAC; border:none; border-radius:4px; padding:12px 28px; 14px/600; letter-spacing -.01em`; hover `rgba(0,0,0,.10)` + `#1A1F36`; active `rgba(0,0,0,.15)`.
- States: (a) hidden; (b) scanning (face glyph -> scan); (c) success (check) lasting until `afterAuthSuccess` ~2.2s after start -> overlay fades out. There is no failure/retry visual state and no "Face ID failed" text.
- Class hooks `.active` / `.completed` on `#fid-wrapper` are set by JS (L1079, L1084) but **have no CSS** (dead hooks).
- Tapping the card calls `startFaceID()` only if wrapper lacks `.active` (L1091-1096) — in practice `.active` is always set, so retry is unreachable.

### 2.5 Home / "Your devices" (`#s-home`, L311-397; DOM L698-780)
- `.screen` base (L74-81): `position:absolute; inset:0 (top/left/right/bottom 0); display:flex; flex-direction:column; overflow-y:auto; overflow-x:hidden; scrollbar-width:none; will-change:transform`; `::-webkit-scrollbar{display:none}`. `#s-home`: `transform:translateX(0); opacity:1; background:#F7F8F8; padding:0` (L85, L312). Size (computed): 390 x 800 at y=44 inside shell.
- **Logo banner** `.home-logo-banner` (L289-295): `display:flex; flex-direction:row; align-items:center; justify-content:space-between; padding:14px 20px 14px; gap:10px; background:#3DBFBF; flex-shrink:0` (72px tall computed). Left group `gap:10px`: `.home-logo-icon` 44x44 `background:rgba(255,255,255,0.22); border-radius:10px` containing the white Enigma logo svg 30x30 (asset `app-enigma-logo-white-banner.svg`), then `<p class="home-logo-name">Enigma Authenticator</p>` (16/700, -.02em, `#fff`). Status bar above is the same `#3DBFBF` so they read as one header.
- **Header** `.home-header` padding `24px 24px 12px`, flex; `.home-header-left` column gap 2px; `<h1 class="screen-title">Your devices</h1>` (20/700 `#1A1F36`, margin-top 6px). No avatar rendered (`.home-avatar` CSS unused), no eyebrow.
- **Scroll** `.home-scroll`: `flex:1; overflow-y:auto; padding:0 24px 32px; scrollbar-width:none`.
- **List** `#all-sessions`:
  1. `<p class="other-sessions-label" id="label-active" style="display:none; color: var(--c-success);">Active now</p>` (hidden until a sign-in is confirmed).
  2. **Current session card** `#sess-london.session-compact` with inline `display:none; border:1.5px solid var(--c-border); flex-direction:column; align-items:stretch; gap:0; padding:16px` (white, radius 8px). Header row inline `display:flex; align-items:flex-start; gap:10px; margin-bottom:14px`: `.session-dot` (8x8 `#7AEFEF`, halo `0 0 0 4px #7AEFEF18`, `dotpulse 2.4s ease infinite`, inline `flex-shrink:0; margin-top:6px`) + column: `<span class="session-compact-loc">London, UK</span>` (14/600) and `<div class="session-compact-meta" style="margin-top:2px"><span id="sess-london-time">just now</span></div>` (12px `#A8BECD`; JS writes time as `h:mm AM/PM`). Detail grid inline: `display:grid; grid-template-columns:1fr 1fr; gap:10px 16px; background:var(--c-surface-2); border-radius:8px; padding:12px 14px` with 4 cells: label (10/700 `#A8BECD` uppercase .09em, margin-bottom 4px) + value (12/600 `#1A1F36`): **Browser** `Chrome 126`; **Device** `MacBook Pro`; **OS** `macOS 14`; **IP Address** `82.43.201.15` (DM Mono). Card measured 342 x 188 (computed).
  3. `<p class="other-sessions-label" style="margin-top:16px; margin-bottom:10px;">Recent sign-ins</p>`.
  4. Three **compact session rows** `.session-compact` (white, radius 8px, padding 14px, gap 12px, margin-bottom 8px, flex row centre; 342 x 64.67 computed): flag tile (36x36, `#F7F8F8`, radius 4px, 12/700 `#7C9CAC` country code) + body (loc 14/600, meta 12px `#A8BECD`) + `Sign out` button (12/600 `#E5686A`, `1px solid #E5686A`, transparent, radius 4px, padding `8px 14px`, min-height 36px; computed 76.44 x 36). Rows (verbatim): `US` / `New York, US` / `Firefox · Windows · 2h ago` (`id=sess-ny`, `signOutSession('sess-ny','New York')`); `SG` / `Singapore` / `Safari · iPhone · 5h ago` (`sess-sg`); `NL` / `Amsterdam, NL` / `Chrome · Windows · 1d ago` (`sess-am`, location arg `Amsterdam`). Sign-out buttons have **no hover/active style**.
  5. Empty state `<p class="sessions-empty" id="sessions-empty" style="display:none;">No other active sessions.</p>` (14px `#A8BECD`, centred, padding 20px 0).
- The "current device" never shows on first load; it appears only after a web sign-in is confirmed (`revealCurrentSession`).

### 2.6 Push-notification banner (`#push-banner`, L88-129; DOM L643-661)
- Container: `position:absolute; top:0; left:0; right:0; z-index:300; padding:10px 10px 0; transform:translateY(-130%); transition:transform .42s cubic-bezier(.32,0,.04,1); pointer-events:none`; `.show`: `translateY(0); pointer-events:auto`. Whole banner is clickable `onclick="openFromBanner()"`. Measured 390 x 97.33 (computed), shown at shell top (covering the status bar).
- Inner (iOS "liquid glass" per source comment): `background:rgba(0,0,0,0.20); backdrop-filter:blur(48px); border-radius:22px; padding:10px 12px 12px; border:1px solid rgba(255,255,255,0.14); box-shadow:0 6px 32px rgba(0,0,0,0.18), inset 0 2px 0 rgba(255,255,255,0.22); cursor:pointer`; 370 x 87.33 (computed).
- Top row (`display:flex; align-items:center; gap:8px; margin-bottom:4px`): `ENIGMA AUTHENTICATOR` (source text `Enigma Authenticator`, CSS uppercase, 12/600, .02em, 80% white, flex:1) + `now` (12px, 60% white).
- Content row (`gap:10px; align-items:center`): icon tile 44x44 `#3DBFBF` radius 12px with white logo svg (22x22 CSS; asset `app-enigma-logo-white-push.svg`) + body: title `Sign-in requested` (14/700 white, lh 1.3), sub `London · Chrome · 82.43.201.15` (12px 78% white, lh 1.4, mt 2px).
- Behaviour: shown by BroadcastChannel `sign_in_request`; auto-dismiss 9000ms (L1024); tap -> `openFromBanner`. Layers above the sheet/dialog (z 300).
- No swipe-to-dismiss, no hover style.

### 2.7 Bottom sheet — sign-in request (`#sign-in-sheet`, L497-559; DOM L836-930)
- Overlay `.sheet-overlay`: `position:absolute; inset:0; background:rgba(0,0,0,.45); opacity:0; pointer-events:none; transition:opacity .35s ease; z-index:100`; `.show` -> opacity 1, pointer-events auto. Not clickable to dismiss (no handler).
- Sheet `.bottom-sheet`: `position:absolute; bottom:0; left:0; right:0; background:#fff; border-radius:8px 8px 0 0; transform:translateY(100%); transition:transform .42s cubic-bezier(.32,0,.04,1); z-index:101; max-height:88%; overflow:hidden; box-shadow:0 -8px 40px rgba(0,0,0,.18)`; `.open` `translateY(0)`. Measured open: 390 x 578.67, top at y=265.33 shell-relative (bottom-anchored at 844) (computed). It is `display:block` (not flex), so the `flex-shrink:0` on `.sheet-map`/`.sheet-handle` is inert.
- Handle: 36x4, radius 4px, `#DEE8ED`, margin `12px auto 4px`. No drag gesture; no swipe-down; no close button.
- Map `.sheet-map`: `height:160px; margin:0 16px; border-radius:4px; background:#DEE8ED; overflow:hidden; position:relative` (358 x 160). Inline SVG `viewBox="0 0 358 160" preserveAspectRatio="xMidYMid slice"` (asset `app-map-london.svg`). Pill `.map-location-pill` `position:absolute; bottom:10px; left:50%; transform:translateX(-50%); background:rgba(255,255,255,.92); backdrop-filter:blur(8px); radius 4px; padding:6px 12px 6px 8px; gap:6px; 12/600 #1A1F36; shadow 0 2px 8px rgba(0,0,0,.12); nowrap` containing `.loc-dot` 8x8 `#7AEFEF` and text `London, United Kingdom` (174.93 x 28 computed).
- Body `.sheet-body`: `overflow-y:auto; padding:16px 20px 32px; scrollbar-width:none`.
  - Section title `Sign-in details` (10/700 .1em uppercase `#A8BECD`, mb 10px).
  - Info grid `display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:18px`; items flex column gap 4px: **Browser** `Chrome 126`; **OS** `macOS 14`; **IP Address** `82.43.201.15`; **Time** (`id=sheet-time`, JS fills current `h:mm AM/PM`, markup default `9:41 AM`). Values DM Sans 14/600 (IP not mono here).
  - Code card `#sheet-code-section.sheet-code-card`: `background:#F7F8F8; border-radius:8px; padding:16px; margin-bottom:10px` (350 x 178.67 computed).
    - Header row flex space-between: label `One-time code` (12/700 .08em uppercase `#A8BECD`) and `#sheet-expiry` countdown `3:00` (DM Mono 14/600 `#7C9CAC`; `.urgent` -> `#E5686A`).
    - OTP `#sheet-otp`: text **`482 716`** (one literal space; 3+3 grouping), `font-family:DM Mono; font-size:38px; font-weight:600; color:#1A1F36; letter-spacing:.18em; display:flex; justify-content:center; align-items:center; margin-bottom:12px` (computed box 318 x 50). The code is hard-coded and never regenerates.
    - Copy button `#sheet-copy-btn.sheet-copy-btn`: `width:100%; height:52px; background:#7AEFEF; border:none; border-radius:8px; 16/600 #000; display:flex; center; gap:10px; margin-top:16px`; content = 18x18 copy icon (`fill=currentColor`, asset `app-copy.svg`) + `Copy code`. `:active` opacity .85. No transition declared.
  - Block link `.sheet-block-link`: `This wasn't me — Block sign-in` (14/500 `#E5686A`, underline, `text-underline-offset:4px`, `padding:16px 0 4px`, full-width centred, transparent). No hover.
- States: **open** (as above); **copied** (button `✓ Copied!` (plain text char U+2713, no svg), `disabled`, 2000ms, then original icon+label restored; toast `Code copied to clipboard.`); **urgent** (<=30s, countdown red `#E5686A`); **expired** (0s -> sheet dismissed + toast `Code expired. Please request a new sign-in.`); **used/confirmed** (code card faded out 0.2s then replaced by confirmed block, below); **blocked** (sheet dismissed, `Sign-in blocked. Attempt has been logged.` danger toast). `.sheet-otp.used` (`color:#A8BECD; text-decoration:line-through; letter-spacing:.1em; font-size:26px`, L582) exists in CSS but nothing ever adds the class (dead).
- Disabled copy button: `background:#A8BECD; color:#7C9CAC; cursor:not-allowed` (L593) — computed visible during the 2s "Copied" window.

### 2.8 Confirmed state (inside sheet; created by JS L1289-1298, CSS L605-617)
- Markup: `<div class="sheet-confirmed"><div class="sheet-confirmed-icon"><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></div><h3>Sign-in confirmed</h3><p>You're now signed in on Chrome · London</p></div>` inserted after the code card; block link hidden (`display:none`).
- Styles: `.sheet-confirmed{text-align:center;padding:12px 0}` (350 x 138 computed); icon `56x56; border-radius:50%; background:#7AEFEF18; margin:0 auto 12px; flex centre`; svg `28x28; fill:#7AEFEF` (light check on a barely-tinted disc — low contrast, as-found); h3 `18/700 #1A1F36 mb 4px`; p `14px #7C9CAC`.
- Timeline: code card opacity -> 0 (.2s) -> after 220ms hidden + confirmed block inserted -> after 2800ms `dismissSignInSheet()` -> after 500ms more `revealCurrentSession()` (London card fades in with `scale(.97)`->1, `.3s ease`).

### 2.9 Sign-out confirmation dialog (`#confirm-overlay`, L446-495; DOM L824-833)
- Overlay: `position:absolute; inset:0; background:rgba(0,0,0,.4); z-index:200; flex centre; opacity:0; pointer-events:none; transition:opacity .2s ease`; `.show` opacity 1.
- Dialog: `background:#fff; border-radius:14px; width:calc(100% - 48px); max-width:320px; padding:20px 20px 12px; box-shadow:0 8px 40px rgba(0,0,0,.2); transform:scale(.95)` -> `scale(1)` on show; `transition:transform .2s ease; text-align:center` (320 x 184.208 with a 3-line body, computed).
- Title `#confirm-title` default text `Sign out session?` -> JS: `Sign out ${location} session?` (e.g. `Sign out New York session?`).
- Body `#confirm-body` default `This will immediately end the session and require re-authentication on that device.` -> JS: `This will immediately end the ${location} session and require re-authentication on that device.`
- Actions `display:flex; gap:8px`: `Cancel` (`.confirm-btn-cancel` bg `#F7F8F8`, text `#7C9CAC`) and `Sign out` (`.confirm-btn-danger` bg `#E5686A`, text `#fff`). `.confirm-btn`: `flex:1; padding:14px 8px; border-radius:4px; 14/600; border:none; min-height:44px; transition:opacity .15s` (136 x 46.67 computed); `:active` opacity .7. Overlay tap does not dismiss.
- Confirm: dialog closes; row fades (`opacity 0`, `scale(.97)`, .23s) and is removed at 230ms; toast `Signed out of ${location} session.` (e.g. `Signed out of New York session.`).

### 2.10 Toast (`.toast#toast`, L161-173)
- `position:absolute; bottom:32px; left:16px; right:16px; background:#000; color:#fff; border-radius:4px; padding:14px 16px; 14/500; text-align:center; z-index:999; pointer-events:none; transform:translateY(80px); opacity:0; transition:transform .28s cubic-bezier(.4,0,.2,1), opacity .28s ease`; `.show` -> `translateY(0); opacity:1`; `.toast.danger{background:#E5686A}`. Measured 358 x 46.67 at y shell-relative 765.33 (computed). Auto-hide 3000ms (L1010-1012). Single instance (re-trigger resets timer + text + class). Variants: default (black), danger (red). Messages (verbatim): `Enter your email and password.`, `Code copied to clipboard.`, `Code expired. Please request a new sign-in.`, `Sign-in blocked. Attempt has been logged.` (danger), `Signed out of ${location} session.`. No icon, no action button, no stacking.

### 2.11 Password fallback (`#s-pwfallback`, L399-444; DOM L783-819)
- Screen: `background:#fff; display:flex; flex-direction:column`; off-screen state `transform:translateX(100%); opacity:0` (L86); shown via `goToScreen`. Home goes to `translateX(-100%); opacity 0` when pw is current (push-left navigation, `.38s`).
- Header `.fb-top` `padding:32px 24px 28px; border-bottom:1px solid #DEE8ED` (215.79 tall):
  - Back button `.fb-back` (`background:none; border:none; 14/500 #A8BECD; padding:10px 8px 10px 0; display:flex; align-items:center; gap:6px; margin-bottom:16px; min-height:44px`): arrow svg 15x15 (`stroke=currentColor`, asset `app-back-arrow.svg`) + `Back to Face ID`. No hover.
  - Eyebrow `Identity Verification` (inline mb 6px) ; title `Sign in with password` (22/700); sub `Face ID wasn't available. Enter your credentials to continue.` (14px `#7C9CAC`, lh 1.55).
- Form `.fb-form` `padding:28px 24px 32px; flex:1; flex column`:
  - Group `.input-group` `flex column; gap:6px; margin-bottom:16px` (70px tall): label (12/600 uppercase .04em `#7C9CAC`) + `.input-wrap{position:relative}`.
  - Email: `<input type="email" class="input-field" id="fb-email" placeholder="you@enigma.io" autocomplete="email">`, label `Email Address`.
  - Password: `<input type="password" id="fb-pw" placeholder="Enter your password" autocomplete="current-password">`, label `Password`, plus toggle button `.input-toggle` (`position:absolute; right:6px; top:50%; transform:translateY(-50%); 44x44; color:#A8BECD; background:none; border:none`), eye svg 18x18 (asset `app-eye.svg`; stroke currentColor). Toggle flips `type` password<->text via inline onclick (L808); **the icon does not change** (no eye-off state). Button font is browser default (Arial 13.33px computed; no `font-family` set).
  - `.input-field`: `width:100%; height:48px; padding:0 44px 0 14px; background:#F7F8F8; border:1.5px solid #DEE8ED; border-radius:4px; 16px DM Sans; color:#1A1F36; outline:none; transition:border-color .18s, box-shadow .18s; -webkit-appearance:none`. Placeholder `#A8BECD`.
  - Focus (computed on click): `border-color:#7AEFEF; background:#fff; box-shadow:0 0 0 4px #7AEFEF18`. Because of the global `input:focus-visible` rule (L32-36) a `2px solid #3DBFBF` outline with `outline-offset:2px` also draws on keyboard/click focus of text inputs — visible double ring (computed `rgb(61,191,191) solid 2px`).
  - No error state exists for inputs (no `.error`, no helper text).
- Submit `.fb-submit{margin-top:auto; padding-top:16px}` pins to the bottom; `#fb-btn.btn-primary` `Confirm Identity` (see 2.12).
- No "forgot password", no keyboard mock.

### 2.12 Buttons (all variants)
| Variant | Spec | States |
|---|---|---|
| `.btn-primary` (L139, used once: `#fb-btn`) | `width:100%; height:52px; background:#7AEFEF; color:#000; border:none; radius 4px; 16/600; flex centre; gap 8px` | hover `#5ADADA`; active `transform:scale(.98)`; disabled `#A8BECD` bg + `#7C9CAC` text + `cursor:not-allowed` (settled values computed); loading = text `Verifying…` + disabled (no spinner) |
| `.sheet-copy-btn` (L584) | as primary but radius 8px, `gap:10px`, `margin-top:16px`, no transition | active opacity .85; disabled as above; success label `✓ Copied!` |
| `.faceid-fallback-link` pill (L273) | see 2.4 | hover / active defined |
| `.session-compact-signout` (L389) | outline danger small | none defined |
| `.confirm-btn-cancel` / `-danger` (L488-495) | see 2.9 | active opacity .7 |
| `.sheet-block-link` text button (L594) | underlined danger text | none |
| `.fb-back`, `.input-toggle` | ghost icon/text buttons | none |
| `.btn-danger` (L151) | outline 48px — **unused** | hover bg `rgba(229,104,106,.06)` |
Focus: global `button:focus-visible` outline `2px solid #3DBFBF; offset 2px; radius 4px` for all of the above (L32-36). Tap highlight removed with `-webkit-tap-highlight-color:transparent` on most buttons.

### 2.13 Navigation model
Two stacked `.screen`s slide horizontally by inline `transform`/`opacity` (`goToScreen`, L945-955): `SCREEN_ORDER = ['s-home','s-pwfallback']`; the non-target screens move to `translateX(-100%)` (earlier in order) or `translateX(100%)` (later) with `opacity 0`. Face ID is an **overlay**, not a screen. There is no tab bar, no header nav bar, no settings. Back: `Back to Face ID` on the pw screen only.

### 2.14 Empty states
Only `No other active sessions.` (see JS bug in section 5, it is shown prematurely).

---------------------------------------------------------------------------------------------------

## 2B. JS behaviour (L936-1312)

State: `SCREEN_ORDER`, `currentScreen`, `faceIDContext` (`'unlock'` | `'signin'`), `appUnlocked` (false until first successful auth), timers `toastTimer`, `bannerDismissTimer`, `faceIDTimer`, `fbLoginTimer`, `expiryInterval`; constants `EXPIRY_SECS = 180`.

| Trigger | Behaviour | Timing |
|---|---|---|
| Page load | `showLaunch(cb)` (launch already visible) -> cb after **1800ms**: show Face-ID overlay, `resetFrame()`, `startFaceID()`. Separately `setTimeout(startFaceID, 600)` (fires while overlay still hidden). | observed (computed): overlay visible ~1.8-1.95s, `completed` at ~4.1s |
| `startFaceID()` | reset wrapper class, Lottie `stop()`, force reflow, after **60ms** add `.active` + Lottie `play()`; after **2200ms** add `.completed`, Lottie `stop()`, `afterAuthSuccess()` | 2200ms scan |
| `afterAuthSuccess()` | hide overlay (.25s fade), hide launch (.3s fade), `goToScreen('s-home')`, `appUnlocked=true`; if context `'signin'` -> `showSignInSheet()` after **400ms**; context reset to `'unlock'` | |
| `showPushBanner()` | add `.show`; auto `hidePushBanner()` after **9000ms** | 9s |
| Banner tap `openFromBanner()` | hide banner; context `'signin'`; hide overlay; if `appUnlocked`: immediately show Face ID over the (blurred) home, else show launch 1800ms then Face ID | |
| `goToPwFallback()` ("Use Passcode") | clear Face-ID timer, reset Lottie, hide overlay + launch, clear button/inputs, `goToScreen('s-pwfallback')` | slide .38s |
| `backToFaceID()` | reset button, `goToScreen('s-home')`, show overlay, `startFaceID` after **200ms** | |
| `doFbLogin()` | validate: `email` non-empty AND `pw.length >= 4`, else toast `Enter your email and password.`; valid: button text `Verifying…` + disabled, after **1400ms** reset button + `afterAuthSuccess()`. No actual credential check. | 1400ms |
| `signOutSession(id, loc)` | store pending; fill dialog texts; show dialog | |
| `confirmSignOut()` | hide dialog; fade row `.23s`; remove at **230ms**; toast; empty-state check (buggy, section 5) | |
| `cancelSignOut()` | hide dialog, clear pending | |
| `showSignInSheet()` | `resetCodeCard()`, show overlay + `.open`, `startExpiryTimer()` | slide .42s |
| `startExpiryTimer()` | every 1000ms decrement; text via `formatCountdown` (`m:ss`, e.g. `3:00`); at `<=30` add `.urgent`; at `<=0` clear, `dismissSignInSheet()`, toast `Code expired. Please request a new sign-in.` | 180s |
| `dismissSignInSheet()` | clear interval; remove `.open`/`.show`; `resetCodeCard` after **450ms** | |
| `copyCode()` | `navigator.clipboard.writeText('482716')` in try/catch (no `await`); button -> `✓ Copied!` + disabled; toast `Code copied to clipboard.`; restore after **2000ms** | |
| `blockRequest()` | clear interval, dismiss sheet, after **150ms** `goToScreen('s-home')` + danger toast `Sign-in blocked. Attempt has been logged.` | |
| `handleCodeUsed()` (BroadcastChannel `code_used`) | confirmed state flow (2.8) | 220 / 2800 / 500ms |
| `showToast(msg, type)` | set text + class `toast [type] show`; hide after **3000ms** | |
| `revealCurrentSession()` | write time, show `Active now` label and London card with fade/scale | .3s |
| clock | `updateClock()` every **10000ms** | |
| `BroadcastChannel('enigma_auth')` | `{type:'sign_in_request'}` -> banner; `{type:'code_used'}` -> confirmed. Sent by `hub/auth/enigma-signin.html` L518 and L622. The authenticator never posts back. | |

Gestures: **none** (no swipe, no drag, no long-press). Clicks only.

---------------------------------------------------------------------------------------------------

## 3. Comparison vs Makor authenticator (`hub/auth/makor-authenticator.html`, light)

| Aspect | Enigma | Makor (light) | Verdict |
|---|---|---|---|
| Screens / flow (launch -> Face ID -> home; banner -> Face ID -> sheet; pw fallback; confirm dialog; toast) | as above | same set, same function names, same timings (1800 / 2200 / 9000 / 180s / 2000 / 3000ms), same state machine | identical |
| DOM structure / shell / status bar / sheet / dialog / toast CSS | | same CSS (shell, radii, shadows, sheet, dialog, toast, z-indexes, transitions) | identical |
| BroadcastChannel name | `enigma_auth` | `enigma_auth` (same, so Makor and Enigma authenticators + both web pages cross-talk) | identical (flag) |
| Fonts | DM Sans + DM Mono (L9) | Geist 400-700 only; `--font-mono: var(--font-sans)`; `--font-serif: 'EB Garamond'` declared, not loaded | different |
| Page title / names | `Enigma Authenticator` | `Makor-X.AI Authenticator`; banner app name `Makor-X.AI`; launch `Makor-X.AI<br>Authenticator`; face label `Locked` | different |
| `--c-bg` / `--c-surface-2` | `#F7F8F8` | `#F5F5F8` | different |
| `--c-primary` (= dark = dim) | `#7AEFEF` (dark `#3DBFBF`) | `#005268` (all three) | different |
| `--c-primary-ghost` | `#7AEFEF18` | `#00526814` | different |
| `--c-text` | `#1A1F36` | `#000000` | different |
| `--c-text-2` / `--c-text-3` | `#7C9CAC` / `#A8BECD` | `#7C8DAC` / `#A8B6CD` | different |
| `--c-border` | `#DEE8ED` | `#E5E7EC` | different |
| `--c-danger` / `--c-success` | `#E5686A` / `#4DCC9B` | `#DA4D43` / `#179484` | different |
| Primary button text / hover | text `#000`; hover `#5ADADA` | text `#fff`; hover `#003D4F` | different |
| Copy button text | `#000` | `#fff` | different |
| `.screen-title` base | 24px/700 (home 20, pw 22 inline) | 32px/500 (home 18/500 `#7C9CAC`; pw title no inline override) | different |
| Launch screen | white bg, flat teal logo svg 108x108, name 18/700 under, gap 40 | bg `#C8D8DF` + `<canvas id="launch-canvas">`, gradient tile 96x96 radius 22 (shadow `0 8px 28px rgba(0,82,104,0.30)`), name 20/500 primary, gap 20 | different |
| Logo | Enigma maze-cube mark (`viewBox 40x40`) | Makor mark (`viewBox 80x64`) on `.logo-gradient` (3 radial gradients over `#005268`) | different |
| Face ID wrapper | plain 180x180 | `overflow:hidden; border-radius:12px`; player `inset:-14px; width/height calc(100% + 28px) !important` | different |
| Face-ID label | `Enigma Authenticator locked` 16/600 -.01em | `Locked` 20/400 .01em | different |
| Home header treatment | solid `#3DBFBF` banner + status bar `#3DBFBF` (`status-bar--teal`) | `#s-home` gradient `linear-gradient(180deg,#0D8090 0,#0A5888 50px,#1E3578 110px,#F5F5F8 170px)`; transparent banner (padding 14 20 16); `.home-content-card` radius `20px 20px 0 0`; `status-bar--dark #0D8090`; name 20/400 | different |
| Home logo tile | `rgba(255,255,255,0.22)` flat | glass: `rgba(255,255,255,0.14)` + blur 16px + `1px rgba(255,255,255,.22)` + inset highlight | different |
| Push app icon tile | flat `#3DBFBF`, svg 22x22 CSS | `.logo-gradient`, svg 24x19 CSS | different |
| OTP | 38px/600 DM Mono, .18em; countdown 14/600 mono | 44px/500 Geist, .22em; countdown 16/500 sans | different |
| Map SVG colours | `#DEE8ED #C8D6DF #A8BECD #94AABB #F7F8F8 #8BEEC8 #3DBFBF` | `#DDE6EA #C4D2DA #A8BDC9 #8AAABB #F5F5F8 #7BC9B8 #005268` | different |
| Email placeholder | `you@enigma.io` | `you@makor-x.ai` | different |
| `confirmSignOut` empty-state logic | contains selector bug (section 5) | no empty-state toggle at all | different |
| `resetCodeCard` | also sets `copyBtn.textContent=''` first | omits that | trivial |
| Push banner / dialog / sheet / toast / pw-screen layout values | identical numbers | identical numbers | identical |

---------------------------------------------------------------------------------------------------

## 4. Inline SVGs / icons

Exported as-found to `enigma-x/auth-design-system/assets/app-*.svg` (paths untouched; `xmlns` added where the inline element had none; `.currentColor` copies for the monochrome ones). Manifest: `enigma-x/auth-design-system/assets/MANIFEST-app.md`.

| Name | Source lines | Notes |
|---|---|---|
| Enigma logo teal | L626-628 | launch screen, fill `#3DBFBF` |
| Enigma logo white (push) | L653 | `width="26" height="26"` attrs; CSS forces 22x22 |
| Enigma logo white (banner) | L704-706 | `width="30" height="30"` |
| Status Wi-Fi | L636 | no fill attr (CSS `fill`) |
| Status battery | L637 | no fill attr (CSS `fill`) |
| Back arrow | L788 | stroke 2.2 round |
| Eye | L809 | stroke 2 round |
| Copy | L923 (+ duplicated as a JS string L1227 and L1265) | `fill=currentColor` |
| Check (confirmed) | L1293 (JS template) | no fill attr (CSS `fill:#7AEFEF`) |
| London map | L845-886 | multi-colour illustration + pin |
The Face-ID graphic is the external Lottie (not exportable here). No hand-drawn/emoji icons except the literal character `✓` in `✓ Copied!` (L1261) and the separator `·` in copy strings.
All Enigma-logo path data is byte-identical to the web sign-in mark `web-logo-enigma-mark.svg` (computed comparison).

---------------------------------------------------------------------------------------------------

## 5. Source oddities, bugs, dead / duplicate / invalid CSS (kept as found)

1. **Premature empty state** (L1177): `document.querySelectorAll('#other-sessions .session-compact')` — no element has `id="other-sessions"` (the container is `#all-sessions`), so the selector is always empty and `No other active sessions.` appears after the FIRST sign-out even with two rows left (reproduced). 
2. **Unhandled clipboard rejection** (L1259): `try { navigator.clipboard.writeText(code) } catch(e){}` does not catch the async rejection; console shows `NotAllowedError ... Document is not focused` when the page lacks focus. UI still shows "Copied".
3. **Face-ID retry unreachable** (L1091-1096): handler requires `!classList.contains('active')`, but `startFaceID` always adds `active`; `.active` / `.completed` have no CSS (dead hooks).
4. **Double Face-ID start on cold load**: `setTimeout(startFaceID, 600)` (L1099) runs while the overlay is hidden and dotLottie not loaded (console warns `stop() Can't use whilst loading`, `Player unable to play whilst loading`), then the launch callback restarts it at 1800ms (L989-993). Effective scan = 1800 -> ~4000ms.
5. **Dead CSS** (no matching element): `.btn-danger` + `:hover` (L151-159), `.home-header-left .eyebrow` (L320), `.home-avatar` (L322-326), the whole "current session card" family `.session-current*` / `.session-rows` / `.session-row*` (L331-363), `.sheet-otp.used` (L582, class never added), `[tabindex]:focus-visible` (L32; no tabindex elements), `.faceid-sub` (empty and hidden, L270, L686), `.fid-wrapper.active/.completed` (no CSS). `--c-primary-dim` unused and identical to `--c-primary-dark`. `ampm` computed but unused in `updateClock` (L980).
6. **Inert declarations**: `flex-shrink:0` on `.sheet-handle` (L523) and `.sheet-map` (L528) — the sheet is `display:block`, not flex. `.faceid-card{background:transparent;padding:0;gap:0}` redundant.
7. **Inline-style overrides** of component CSS (L721-749, L791-793): London card border/padding/flex, detail grid and cell typography are all inline styles, not classes; pw eyebrow/title/sub styled inline. `.screen-title` base is 24px but never effective (home 20px override, pw 22px inline).
8. **Attribute vs CSS size**: push icon `<svg width="26" height="26">` but CSS `.push-banner-app-icon svg{width:22px;height:22px}` wins (L126, L653). `.status-icons svg` and `.session-compact-flag` fine.
9. **Missing font on toggle**: `.input-toggle` (button) has no `font-family`, so it falls back to browser default (Arial 13.33px computed) — invisible since it only holds an svg.
10. **Contrast**: confirmed check icon is `#7AEFEF` on `#7AEFEF18` (L609-615); brand-light button text is black by design; `.btn-primary:disabled` text `#7C9CAC` on `#A8BECD`; London meta/labels `#A8BECD` on white.
11. **`.faceid-locked-label`** sits on the blurred layer; on cold open the backdrop is the opaque white launch (`#s-launch` z 40 under Face ID z 50), the CSS comment "Home screen logo — visible through the blur" (L288) only holds on later Face-ID prompts.
12. **Banner covers the status bar and renders above sheet/dialog** (z 300 vs 101/200); stale comment (L84) says Face ID is "a separate overlay at shell level" (true) but duplicates "Layer" numbering comments (L194, L206, L243) mention a dark card that is actually the Lottie.
13. **Redundant `-webkit-` prefix mismatch**: `.map-location-pill` has `backdrop-filter` without `-webkit-` (L535).
14. **Cross-talk**: `BroadcastChannel('enigma_auth')` is shared with `makor-authenticator.html`, `makor-authenticator-dark.html`, `makor-signin.html`, `enigma-signin.html` — all receive each other's `sign_in_request` / `code_used`. During harvest an unrelated tab's request triggered the banner here.
15. **Unpinned runtime deps**: `@dotlottie/player-component@latest` (L10) and Google-hosted Lottie asset (L677). Prototype breaks offline (Face ID card would not render).
16. **Hard-coded OTP** `482 716` / `482716` (L921, L1222, L1258) — no generation, no rotate-on-expiry (expiry closes the sheet).
17. `.shell` `0 0 0 2px rgba(0,0,0,.07)` ring is in `box-shadow` (not border); on phone-sized windows the ring + 4vw radius still render (full-bleed rounded rectangle).
18. Fractional borders: `1.5px` renders `1.33333px` at DPR 2 in this Chrome (device-pixel snapping); do not copy computed values.

---------------------------------------------------------------------------------------------------

## 6. GAPS (searched for; not present in the source)

- **No design tokens for**: spacing, radii, font sizes, shadows, durations, easings, z-index (only 14 colour/font vars exist; everything else hard-coded).
- **No** hover / pressed styles for: sign-out buttons, back link, password toggle, block link, banner, session rows.
- **No** input error / success / helper-text state; no field validation visuals (only toast).
- **No** Face ID failed / retry / "try again" / lockout state; no biometric-unavailable state; no passcode number pad (the "passcode" is an email+password form).
- **No** loading skeleton / spinner (loading = disabled text `Verifying…`).
- **No** OTP countdown ring / progress bar, no code regeneration, no "code used" strike state in use.
- **No** swipe/drag gestures on the sheet, banner or rows; no pull-to-refresh; no sheet-close affordance other than timeout/block/confirm.
- **No** bottom nav, settings, account/profile, avatar (CSS exists, unused), empty-state illustration, list for >3 sessions/scroll hint.
- **No** dark mode, no `@media`, no `prefers-reduced-motion`, no `prefers-color-scheme`.
- **No** notch/dynamic island/home indicator/device bezel mock.
- **No** iconography set (6 inline icons only); no eye-off icon; no close icon.
- **No** localisation/RTL; copy hard-coded in English; no plural/time-ago logic (static `2h ago`).
- **No** accessibility beyond `aria-label` on the password toggle (L808); no `role=dialog`/`aria-modal`/focus trap on dialog or sheet; no `aria-live` on toast.
- **No** token for the Face-ID Lottie card colour/size (`#404042`, 180px) — only inside the third-party asset.
- **No** disabled/hover colour tokens (`#5ADADA` hard-coded, no `--c-primary-hover`).

---------------------------------------------------------------------------------------------------

## 7. Drift of the derived DS (`enigma-x/auth-design-system/CLAUDE.md`) vs this prototype (mobile only; prototype wins)

- Live-dot pulse: DS says `2s ease-in-out`; source is `dotpulse 2.4s ease infinite` (L345).
- Mobile hover colour: DS says `#3DBFBF` for "hover states (mobile)"; the only mobile hover in source is `.btn-primary:hover { background:#5ADADA }` (L147).
- DS lists "Avatar / initials 36px circle" (item 22) and a session-current card as components; in the prototype both CSS blocks exist but nothing renders them (`.home-avatar`, `.session-current*`, section 5.5).
- DS "Face ID overlay" Lottie is described without the fact that the card colour `#404042` / 180px come from the external asset.
- DS "Input error pattern" for the authenticator (`#E5686A`, `rgba(229,104,106,0.06)`): no such state exists in the prototype (section 6).
- DS "Do not hardcode hex values": the prototype itself hard-codes `#5ADADA`, `#000`, `#fff` and many `rgba()` (section 1.1).
- Confirmed matches: fonts, 4px/8px/14px/22px radii, `min(44px,4vw)`, 38px/.18em OTP, 52px button, toast/sheet/banner timings and easings, palette values.

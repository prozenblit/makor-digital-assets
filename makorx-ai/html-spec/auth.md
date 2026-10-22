# Auth design system — harvest of `makorx-ai/auth-design-system/`

Harvested as its own source: `CLAUDE.md` (201 lines), `tokens.css` (322), `tokens.json` (231), `components.css` (1470), `components.md` (653), `showcase.html` (1136). Cross-checked against the prototypes it claims to be extracted from: `hub/auth/makor-signin.html` (702 lines), `hub/auth/makor-authenticator.html` (1291), `hub/auth/makor-authenticator-dark.html` (1363). `employees.html` (the HR app) has no auth surface at all (section 6).
Values are quoted from CSS; "(computed)" = measured in a browser tab on `auth-design-system/showcase.html` (transitions disabled; DPR 1.5 so `1.5px` borders read `1.33333px`). `file:line` refs are to `makorx-ai/auth-design-system/` unless stated.

## 1. What the system defines

Two surfaces (CLAUDE.md 24-39):

| Surface | Source | Mode | Screens / states |
|---|---|---|---|
| **Web sign-in portal** (desktop) | `hub/auth/makor-signin.html` | light only | `#view-login` (username, password with show/hide, "Remember me", "Forgot password?" link, Sign in, terms row) -> `#view-otp` (back link, "Step 2 of 2", 6 OTP slots, 3:00 timer, resend, "Verify and continue") -> `#view-success` (ring + title + sub). States: field error (`.field-input.error` + `.field-error.show`: "Please enter your username." / "Incorrect credentials. Please try again."), OTP error (`.otp-slot.has-error` shake 0.35s + `.otp-error-msg`), OTP filled, timer warn, button disabled (`#btn-verify` starts disabled), button loading (`.btn.loading` spinner). Background: canvas "constellation" (JS), bottom-right watermark, fixed page footer text. |
| **Mobile authenticator** (iOS shell 390x844) | `makor-authenticator.html` (light), `-dark.html` (dark) | light + dark | Launch (`.launch-screen`) -> Face ID overlay (`.faceid-overlay`, Lottie) -> Home / "Your devices" (`#s-home`, session cards) -> Password fallback (`#s-pwfallback`). Overlays: push banner, bottom sheet (sign-in details + OTP code, "confirmed" state, used/expired code), sign-out confirm dialog, toast. |

**Not defined anywhere (no screen, no CSS, no source):** forgot-password / reset-password screens (the "Forgot password?" `.link-btn` at makor-signin.html:376 is a dead button), registration, lockout, error page, "OTP verified" separate from success, sign-out screen (web), dark web portal. The earlier request "login / forgot / reset / OTP / success / error" resolves to: login, OTP, success exist; error exists only as inline field/OTP/toast states; forgot/reset do not exist.

Components in scope (`components.css` sections 1-19; `components.md` 20 entries): page shell (`.auth-page`, canvas, watermark, footer), sign-in card, form fields (web + mobile), checkbox, buttons (web primary, mobile primary, danger/outline, link button, back link), terms row, OTP slots + error + timer + resend, success state, phone shell + status bar, screen stack, launch screen, Face ID overlay, home screen + header + avatar, session cards, push banner, bottom sheet (handle, map, info grid, OTP code card, large digits, copy button, block link, confirmed), confirm dialog, toast, password-fallback screen, keyframes.

## 2. Token differences vs the main HR system

Fonts / colours / radii are **not the same**. Diff computed by script over `auth tokens.css` vs `design-system/tokens.css` (166 auth tokens vs ~190 HR tokens).

**Identical value (16):** `--color-brand #005268`, `--text-body 14px`, `--text-lg 16px`, `--text-xl 18px`, `--font-normal/medium/semibold/bold`, `--leading-relaxed 1.6`, `--radius 4px`, `--radius-full 50%`, `--space-1 4px`, `--duration-base 0.12s`, `--duration-normal 0.15s`, `--duration-slow 0.18s`, `--ease-default ease`.

**Same token NAME, different value (26) — importing both files on one page silently corrupts one of them:**
`--color-brand-hover` #003D4F vs #004257 · `--color-brand-focus-ring` 0.07 vs 0.12 · `--color-bg` #F5F5F8 vs #ffffff · `--text-xs` 11 vs 10 · `--text-sm` 12 vs 11 · `--text-base` 13 vs 12 · `--text-md` 15 vs 13 · `--text-2xl` 20 vs 22 · `--text-3xl` 30 vs 26 · `--text-4xl` 32 vs 28 · `--leading-tight` 1.1 vs 1.2 · `--leading-snug` 1.2 vs 1.4 · `--leading-normal` 1.3 vs 1.5 · `--tracking-badge` 0.04em vs 0.02em · `--tracking-section` 0.07em vs 0.08em · `--radius-pill` 22px vs 8px · `--h-input` 48px vs 38px · `--space-2..-10` (6/8/10/12/14/18/24 vs 8/12/16/20/24/32/40: different scale, 16 steps vs 8) · `--duration-fast` 0.08s vs 0.10s. (`--color-border` differs only in letter case.)

**Fonts:** Geist everywhere (same as HR) + **EB Garamond** (`--font-serif`, tokens.css:70) for web-portal `.brand-name` (15px/600/0.22em), `.card-title` (38px/500, `font-variant-caps:small-caps`), `.success-title` (30px/500 small-caps), `.otp-slot` (30px/500), `.timer-value`. Not in HR (HR uses Lexend Exa for the wordmark; auth forbids it). Font load: `EB+Garamond:ital,wght@0,400;0,500;0,600;1,400` + Geist 400-700 (signin:9). HR loads Geist 100-900 + Lexend Exa.

**Colour palettes (three families):**
- *Mobile authenticator* reuses the HR neutrals exactly: bg `#F5F5F8`, surface `#FFFFFF`, text `#000000`, text-2 `#7C8DAC`, text-3 `#A8B6CD`, border `#E5E7EC`, danger `#DA4D43`, success `#179484`, brand `#005268` (`tokens.css:39-65`).
- *Web portal* has its own blue-grey set, none in HR: page `#C8D8DF`, card `#EDF3F6`, input `#FFFFFF`, text `#0B2530`, text-2 `#537380`, text-3/placeholder `#90AEBC`, border/OTP slot `#CCDDE4`, danger `#B53A3A`, disabled button `#7FA0AB`, hover `#003D4F`.
- *Dark* (authenticator only): brand `#17C3AF` (HR dark is `#0cb8d0`), hover `#10A898`, brand-dark `#0A7A8E`, ghost `rgba(23,195,175,0.13)`, bg `#0C1219`, surface `#121C26`, surface-2 `#192533`, text `#E6EFF4`, text-2 `#87A8B5`, text-3 `#4E6A78`, border `#1E2F3C`, danger `#FF6B6B`, success `#2DD4BF`. HR dark: bg `#111214`, card `#202226`, elevated `#26292e`, text `#e2e8f4/#8a97aa/#505a6c`. No value overlaps except `#2DD4BF` (= HR dark active `#2dd4bf`).
- Gradients (HR forbids them): `--gradient-home-screen` `linear-gradient(180deg,#0D8090 0px,#0A5888 50px,#1E3578 110px,var(--color-bg) 170px)` (tokens.css:266), `--gradient-logo` 3 radial layers on `#005268` (267-270), `--gradient-launch-dark` (318-321).

**Radius scale** (CLAUDE.md 81-96; tokens.css:131-146) — HR is 4px only: 3px checkbox, 4px buttons-mobile/inputs-mobile/toast/session flag, 8px web inputs, web buttons, session cards, code card, bottom-sheet top, 12px OTP slots / Face ID wrapper / push icon, 14px confirm dialog, 16px web card, 20px home card top, 22px push banner + launch icon, 28px dark Face ID card, 44px phone shell (`min(44px,4vw)`), 50% avatar/rings. NB CLAUDE.md line 84 says "Buttons, inputs ... 4px" but **web** input and button are 8px (components.css:182, 343) — the 4px claim is true only for the mobile variants. `--radius-md` comment says OTP slots 8px but they are `--radius-otp-slot 12px`.

**Other scales:** heights 48 input / 50 web btn / 52 mobile btn / 48 danger / 44 confirm / 68 OTP slot / 44 status bar (HR: 36-40); input border `1.5px` (HR `1px`); focus ring web `0 0 0 3px rgba(0,82,104,0.07)`, mobile `0 0 0 4px rgba(0,82,104,0.078)`, error `0 0 0 3px rgba(181,58,58,0.07)` (HR `3px 0.12`); shadows: card `0 2px 40px rgba(0,30,50,0.10), 0 1px 4px rgba(0,30,50,0.05)` (tinted blue-black), shell `0 24px 64px rgba(0,0,0,0.18), 0 0 0 2px rgba(0,0,0,0.07)`, sheet `0 -8px 40px rgba(0,0,0,0.18)`, confirm `0 8px 40px rgba(0,0,0,0.20)`, push `0 6px 32px rgba(0,0,0,0.18)`; motion: `.08 / .12 / .15 / .18 / .20 / .28 / .35 / .38 / .42 / .45 / .65` s plus `cubic-bezier(0.4,0,0.2,1)`, `(0.32,0,0.04,1)`, spring `(0.34,1.56,0.64,1)` (HR: ease only, <=0.20s, no springs).

**Responsive:** auth has `@media (max-width:560px){.auth-card{padding:0 32px 40px}}` (components.css:100) and `min()/100dvh` shell sizing; HR is desktop-only with no media queries.

## 3. Component spec (CSS values, light unless stated)

All from `components.css` (lines), verified identical to the `hub/auth` sources; where the showcase deviates it is noted in section 7.

| Component | Class (line) | Values |
|---|---|---|
| Page shell | `.auth-page` 33 | `min-height:100vh; padding:80px 16px; flex column center; background:#C8D8DF; color:#0B2530`; fixed `#constellation-canvas` z0; `.bg-watermark` 360x288 `opacity:0.045` bottom/right `-40px`; `.page-footer` fixed `bottom:22px; padding:0 36px`; `.footer-text` 10px/600, `0.10em`, uppercase, `opacity:0.7`, `#537380`. |
| Sign-in card | `.auth-card` 92 | `max-width:460px; width:100%; background:#EDF3F6; border-radius:16px; padding:0 48px 48px` (`0 32px 40px` <=560px); shadow `0 2px 40px rgba(0,30,50,0.10), 0 1px 4px rgba(0,30,50,0.05)` (computed identical). |
| Card logo header | `.card-logo-header` 105, `.brand-name` 112 | `padding:36px 0 24px; gap:10px; column center`; SVG 90x72; brand-name Garamond 15px/600 `0.22em` UPPERCASE `#005268`. |
| Eyebrow | `.auth-eyebrow` 126 | 11px/600, `0.14em`, uppercase, `#537380`, mb 10px, centred; `.accent` `#005268`. |
| Card title / sub | `.card-title` 138, `.card-sub` 150 | title Garamond 38px/500, lh 1.1, small-caps, `0.01em`, mb 8px, `#0B2530` (OTP view overrides inline to 30px, signin:~399); sub 14px, lh 1.6, `#537380`, mb 28px. |
| Web field | `.field` 168, `.field-input` 176, `.field-toggle` 201, `.field-error` 220 | field `gap:6px; mb:14px`; input `height:48px; padding:0 44px 0 16px; background:#FFFFFF; border:1.5px solid transparent; radius 8px; 14px Geist; color #0B2530`; hover none; **focus** `border-color:#005268; box-shadow:0 0 0 3px rgba(0,82,104,0.07)` (transition `border-color .18s, box-shadow .18s`); placeholder `#90AEBC`; **error** `border-color:#B53A3A; box-shadow:0 0 0 3px rgba(181,58,58,0.07)`; toggle 44x44 absolute `right:6px`, icon 18px `#90AEBC` -> hover `#537380`; error text 12px `#B53A3A` mt 4px (hidden until `.show`). No visible labels (placeholder only). |
| Mobile field | `.input-group` 229, `.input-field` 243, `.input-toggle` 264 | label 12px/600, `0.04em`, uppercase, `#7C8DAC`; input `height:48px; padding:0 44px 0 14px; background:#F5F5F8; border:1.5px solid #E5E7EC; radius 4px; font 16px; color #000`; **focus** `border-color:#005268; background:#FFFFFF; box-shadow:0 0 0 4px rgba(0,82,104,0.078)`; placeholder `#A8B6CD`. No error state defined for mobile field. |
| Checkbox | `.checkbox-row` 292, `.cb-box` 299 | 16x16, radius 3px, `1.5px solid #CCDDE4`, bg `#EDF3F6`; checked: bg+border `#005268`, check svg 10px white (opacity transition .12s); label 13px `#537380`. (Source prototype used `--c-border` for the border; same `#CCDDE4` on web.) |
| Web primary button | `.btn` 339 + `.btn-primary-web` 357 | `width:100%; height:50px; radius 8px; 15px/600; letter-spacing 0.01em; gap 8px; transition background .15s, transform .08s, opacity .12s`; bg `#005268` / hover `#003D4F` / active `scale(0.99)` / disabled `bg #7FA0AB; color rgba(255,255,255,0.65)`; loading: `.btn.loading .btn-label{visibility:hidden}` + `.spinner` 18px, `2.5px solid rgba(255,255,255,0.3)`, top `#fff`, `spin 0.65s linear infinite`. |
| Mobile primary button | `.btn-primary` 382 | `height:52px; radius 4px; 16px/600; transition background .12s, transform .08s`; hover `#003D4F`, active `scale(0.98)`, disabled `bg #A8B6CD; color #7C8DAC`. **Class name collides with HR `.btn-primary` (36px).** |
| Danger/outline | `.btn-danger` 408 | `height:48px; transparent; border:1.5px solid #DA4D43; radius 4px; 14px/600; color #DA4D43`; hover `rgba(218,77,67,0.06)`. |
| Link button | `.link-btn` 324 | 13px/600 `#005268`, `padding:4px 0`, hover `opacity:.7`, disabled `.4` + no pointer. |
| Back link | `.back-link` 427 | 13px/500 `#537380`, icon 15px, gap 6px, mb 28px, hover `#0B2530`. **Collides with HR `.back-link`** (14px, `#7c8dac`, mb 18px). |
| Terms row | `.terms-row` 445 | 12px `#90AEBC` lh 1.5 centred, mt 18px; links `#005268`/500, underline on hover. |
| OTP slots (web) | `.otp-slots` 464, `.otp-slot` 469 | row `gap:8px; margin:24px 0 8px`; each `<input maxlength=1>` flex 1, `height:68px; bg #FFFFFF; border:1.5px solid #CCDDE4; radius 12px; Garamond 30px/500; text-align center; caret-color #005268`; **focus** `border-color:#005268; shadow 0 0 0 3px rgba(0,82,104,0.07); transform:scale(1.03)`; **filled** `border-color:#005268`; **error** `border-color:#B53A3A; background:rgba(181,58,58,0.04); animation: shake .35s ease` (keyframes: `translateX(0 -> -6px at 25% -> 6px at 75% -> 0)`). Error message `.otp-error-msg` 13px/500 `#B53A3A` centred min-h 20px. Timer row 13px `#90AEBC`, clock icon 14px, value Garamond 500 `#537380` (`.warn` `#B53A3A`), expiry 3:00. Resend note 13px `#90AEBC` centred mt 16px. |
| Success | `.success-center` 544, `.success-ring` 551, `.success-title` 562 | ring 68x68 circle `rgba(0,82,104,0.07)`, icon 32px `#005268`, `animation: pop-in .45s cubic-bezier(0.34,1.56,0.64,1)` (scale .2->1, opacity 0->1); title Garamond 30px/500 small-caps; sub 14px `#537380` lh 1.6. |
| Phone shell | `.shell` 577, `.status-bar` 590 | `width:min(390px,100vw); height:min(844px,100dvh); radius min(44px,4vw); shadow 0 24px 64px rgba(0,0,0,0.18), 0 0 0 2px rgba(0,0,0,0.07)`; status bar 44px, `padding:14px 28px 0`, time 16px/600; home variant `.status-bar--dark{background:#0D8090!important}`. |
| Screens | `.screen` 621 | absolute stack, `transition: transform .38s cubic-bezier(0.4,0,0.2,1), opacity .3s ease`. |
| Launch | `.launch-screen` 639, `.launch-logo-icon` 654, `.launch-app-name` 664, `.logo-gradient` 675 | bg `#C8D8DF` (web page colour); icon 96x96 radius 22px shadow `0 8px 28px rgba(0,82,104,0.30)`; name 20px/500 `#005268` (dark source 400); gradient = 3 radials + `#005268`. |
| Face ID | `.faceid-*` 688-812 | overlay z50, blur bg `rgba(235,235,235,0.12)` + `blur(6px)`; wrapper 180x180 radius 12px (Lottie `inset:-14px`, `calc(100%+28px)`); locked label 20px/400; fallback link `bg rgba(0,0,0,0.06)`, 14px/600 `#7C8DAC`, radius 4px, `12px 28px`; dark: glass card `rgba(18,28,38,0.70)` + `blur(12px)`, `1px solid rgba(255,255,255,0.08)`, radius 28px, `24px 24px 20px`, colour-overlay `rgba(10,35,55,0.72)` `mix-blend-mode:color`. |
| Home | `.home-screen` 819, `.home-logo-banner` 825, `.home-logo-icon` 837, `.home-content-card` 858, `.home-header` 868, `.screen-eyebrow/-title/-sub` 876-896, `.home-avatar` 899 | gradient header; logo tile 44x44 radius 10px glass (`rgba(255,255,255,0.14)`, blur 16, border `rgba(255,255,255,0.22)`); content card top radius `20px 20px 0 0`; eyebrow 10px/700 `0.12em` `#005268`; title 32px/500 (home "Your devices" overrides to 18px/500 `#7C8DAC` via `.home-header-left .screen-title`, **missing in components.css**); avatar 36x36 circle `#005268` 14px/700 white. |
| Session cards | `.session-compact` 949, `-flag` 959, `-signout` 976, `.session-dot` 936, `.other-sessions-label` 926 | card `bg #FFFFFF; radius 8px; padding 14px; gap 12px; mb 8px`; flag 36x36 radius 4px `#F5F5F8`, 12px/700 `0.04em`; loc 14px/600; meta 12px `#A8B6CD`; sign-out `1px solid #DA4D43`, 12px/600, `8px 14px`, `min-height:36px`; dot 8px with `dotpulse 2.4s ease infinite` ring `rgba(0,82,104,0.078)`. |
| Push banner | `.push-banner*` 1004-1060 | slide `translateY(-130%) -> 0`, `.42s cubic-bezier(0.32,0,0.04,1)`; inner `rgba(0,0,0,0.20)` + `blur(48px)`, radius 22px, `1px solid rgba(255,255,255,0.14)`, shadow `0 6px 32px rgba(0,0,0,0.18), inset 0 2px 0 rgba(255,255,255,0.22)`; icon 44x44 radius 12px; title 14px/700 white, sub 12px `rgba(255,255,255,0.78)`. Dark: `rgba(0,0,0,0.55)`, border `0.10`. |
| Bottom sheet | `.sheet-overlay` 1067, `.bottom-sheet` 1079, `.sheet-handle` 1097, `.sheet-map` 1106, `.sheet-code-card` 1181, `.sheet-otp` 1206, `.sheet-copy-btn` 1234, `.sheet-block-link` 1259, `.sheet-confirmed` 1276 | overlay `rgba(0,0,0,0.45)` (dark 0.60) fade .35s; sheet radius `8px 8px 0 0`, slide .42s, `max-height:88%`, shadow `0 -8px 40px rgba(0,0,0,0.18)`; handle 36x4 radius 4px `#E5E7EC` margin `12px auto 4px`; map 160px radius 4px; code card `#F5F5F8` radius 8px padding 16px; **OTP digits 44px/500, letter-spacing 0.22em** (used/expired 26px, 0.10em, line-through, `#A8B6CD`); expiry 16px/500 `#7C8DAC` (`.urgent` `#DA4D43`); copy button 52px radius **8px** (mobile primary is 4px) 16px/600; block link 14px/500 `#DA4D43` underline offset 4px; confirmed icon 56px circle `rgba(0,82,104,0.078)`, h3 18px/700. |
| Confirm dialog | `.confirm-overlay` 1296, `.confirm-dialog` 1311, `.confirm-btn*` 1343 | overlay `rgba(0,0,0,0.40)` (dark 0.60); dialog radius **14px**, `max-width:320px; padding:20px 20px 12px; transform scale(.95)->1 .2s`, shadow `0 8px 40px rgba(0,0,0,0.20)`; title 16px/700 `-0.01em`; body 14px lh 1.45; buttons `min-height:44px; padding 14px 8px; radius 4px; 14px/600`; cancel `#F5F5F8`/`#7C8DAC`, danger `#DA4D43`/white. **Collides with HR `.confirm-*`** (HR DS: 440px, radius 4px). |
| Toast | `.toast` 1364 | absolute, `bottom:32px; left/right:16px; bg #000000; white; radius 4px; padding 14px 16px; 14px/500; centred`; enter `translateY(80px) -> 0`, `.28s cubic-bezier(0.4,0,0.2,1)`; `.danger` `#DA4D43`; dark `#192533` + `1px solid #1E2F3C`. **Collides with HR `.toast`** (fixed centre, `#1a1a1a`, 0.2s). |
| Password fallback | `.pwfallback-screen` 1401, `.fb-top` 1406, `.fb-back` 1410, `.fb-form` 1425 | bg surface; top `32px 24px 28px` + bottom border; back button `min-height:44px`; form `28px 24px 32px`; submit pinned bottom. |
| Focus visible | 17-23 | `button/[tabindex]:focus-visible{outline:2px solid var(--color-brand); outline-offset:2px; border-radius:4px}`; inputs `outline:none` (ring via box-shadow). HR app has no `:focus-visible` rules. |

Z-index: launch 40, Face ID 50, sheet overlay 100, sheet 101, confirm 200, push 300, toast 999. Keyframes: `spin`, `shake`, `pop-in`, `blurFadeIn`, `faceIDContentIn`, `dotpulse`.

## 4. Dark mode (authenticator only)

Activated by `body.dark` **or** `[data-mode="dark"]` (tokens.css:280-281); the DS merges what are two separate prototype files (`-dark.html` differs from light by ~190 diff lines: shell radial-gradient background `radial-gradient(ellipse at 50% -5%, rgba(10,115,132,0.48) 0%, transparent 55%)`, body bg `#080F15`, shell ring `0 0 0 1px rgba(255,255,255,0.06)`, launch gradient, glass Face ID card, toast border, outline colour `--c-primary`). Values in section 2. Component dark overrides in `components.css`: `.faceid-card`, `.fid-wrapper::after`, `.faceid-fallback-link`, `.session-dot`, `.push-banner-inner/-time/-sub`, `.sheet-overlay`, `.bottom-sheet`, `.map-location-pill`, `.sheet-code-card`, `.sheet-confirmed-icon`, `.confirm-overlay/-dialog`, `.toast`, plus token flips. Computed in the dark showcase: `.btn-web/.btn-mobile` bg `#17c3af` with **white** text (low contrast; the dark prototype `.btn-primary` keeps `color:#fff` too), input `#192533` border `#1e2f3c`, session card `#121c26`, confirm shadow `rgba(0,0,0,0.45) 0 8px 40px`, toast `#192533`.

**Defects found:**
1. Web portal tokens `--color-web-bg/-surface/-surface-2` have **no dark counterparts** but `--color-text` flips to `#E6EFF4`: in `body.dark` the web card/input stay light (`#edf3f6`/`#ffffff`) with near-white text (computed in the dark showcase: `.field-input-demo` bg `#ffffff`, color `#e6eff4`). The web portal is therefore light-only, as CLAUDE.md says, but nothing prevents mixing.
2. `components.css:15` `-webkit-font-smoothing: antialiased;` is outside any rule (invalid CSS, ignored); `components.css:1467` `body.dark @keyframes dotpulse {...}` is invalid (at-rules cannot be scoped), so the dark pulse colour is never applied.
3. `.status-bar--dark` and the home gradient hard-code `#0D8090` etc. and do not change in dark mode (they are the same in both source prototypes).

## 5. Showcase and docs: fidelity notes

- `showcase.html` does **not** link `tokens.css` or `components.css` (computed: 1 stylesheet link = Google Fonts); it re-implements components with `*-demo` classes and its own `--c-*` variables. It has 3 sections (Colors, Typography, Components) with ~22 component groups.
- Showcase drift vs `components.css` (computed): web card title demo **32px** (CSS 38px); `.sess-signout` height **32.67px** (CSS `min-height:36px`); `.sheet-otp-demo` colour `#0b2530` (mobile text is `#000000`).
- `tokens.json` has 40 value tokens (tokens.css has 166); only 1 string (`dangerMobileHover rgba(218,77,67,0.06)`) is absent from tokens.css. 144 of 166 CSS variables are **never referenced** by `components.css` (147 `var()` uses; components hard-code most values), so tokens are documentation, not the source the components consume.
- CLAUDE.md fixes: radius table says "Buttons, inputs ... 4px" (true only for mobile); "Web focus ring 0.07", "mobile 0.078" verified in CSS; `components.md` context guide consistent with sources.

## 6. What the HR app (`employees.html`) uses or references

**Nothing.** Searched (case-insensitive) for `login|logout|log out|sign out|signin|password|2FA|OTP|auth|security`: zero hits in CSS, HTML or JS. The only account UI is the profile dropdown (`.profile-drop`, lines 1747-1757) with a name, an email and a single "Dark mode" switch — no sign-out, no security tab. The app switcher `.app-drop` lists Platform Apps (HR, My Profile, Compliance, Derivatives, Cash Equity, Ticketing, IT). `hub/projects.js` lines ~161-196 register auth as a separate hub project with the three prototypes and a download link to `makorx-ai/auth-design-system/tokens.css|json`. The HR app is always "already signed in" (`PR`/Polina Rozenblit hard-coded, nav avatar 1745).

## 7. Decision: fold into the main design system or keep separate?

**Keep separate (own folder, own tokens), cross-referenced from the main system. Do not merge `tokens.css`/`components.css`.** Evidence:

| Factor | Finding |
|---|---|
| Token name collisions | 26 same-name tokens with different values (section 2) incl. `--color-bg`, `--text-*`, `--h-input`, `--space-*`, `--radius-pill`. |
| Class collisions | auth `components.css` vs HR app: `.btn-primary`, `.toast`, `.back-link`, `.card-title` (+ `.confirm-overlay/-title/-body`, `.spinner` vs HR DS). `.btn-primary` is 52px/full-width/4px in auth and 36px inline in HR; `.card-title` is 38px Garamond vs 12px uppercase label. |
| Fonts | EB Garamond (auth-web) not in HR; HR Lexend Exa banned in auth. |
| Radii | auth 3/4/8/12/14/16/20/22/28/44px vs HR "4px only". |
| Motion | auth springs/0.42s/cubic-béziers vs HR ease <=0.20s. |
| Responsiveness | auth has `@media` + `100dvh` shell; HR desktop-only. |
| Palette | web portal blue-greys and dark `#17C3AF` share nothing with HR; only mobile-light neutrals + `#005268` coincide. |
| Dark mode | auth dark brand differs (`#17C3AF` vs `#0cb8d0`), dark surfaces differ; web portal has no dark. |
| Context | different product surfaces (public sign-in + phone prototype) vs logged-in dense desktop app; auth never co-exists in a page with HR UI (CLAUDE.md 186). |
| What IS shared | `#005268`, Geist, 4px base radius on mobile controls, `body.dark` activation, HR neutrals in the mobile variant, status `#179484`/`#DA4D43`. |

Recommended treatment: (a) **Option A (chosen):** keep `auth-design-system/` as its own system; in the main system add only a pointer ("Authentication: see auth-design-system") and, if wanted, a documented "brand constants shared" table (`#005268`, Geist, `#7C8DAC/#A8B6CD/#E5E7EC/#F5F5F8/#DA4D43/#179484`). (b) If the owner insists on one system, prefix auth tokens `--auth-*` and auth classes `.auth-*` (e.g. `.btn-primary` -> `.auth-btn`), keep it a clearly separated "Authentication" section with its own dark theme scope, and resolve the collisions first. (c) Fix the invalid CSS and the missing `.home-header-left .screen-title` rule regardless.

## GAPS

- No source defines forgot/reset password, lockout, registration, web-dark or a mobile input *error* state; if needed they are EXTENDED work.
- Hover/active states of the mobile prototype (`:active` scale/opacity) verified by CSS only, not by synthetic events; Face ID Lottie (`lottie.host` URL, CLAUDE.md 148) and constellation canvas drawing code were not measured (external asset / JS).
- Computed measurements were taken on the showcase's `*-demo` classes, not on the live prototypes in a phone shell; component-level values were verified against `components.css` and the three `hub/auth` sources by reading.
- The `hub/auth/enigma-*.html` prototypes (`enigma-signin.html`, `enigma-authenticator.html`, also in the same folder) are a different product skin and were not harvested.
- Authenticator light vs dark prototype differences beyond the ~190-line diff summarized in section 4 were not itemised.
- JS behaviours (OTP auto-advance, 3:00 timer, 9s push auto-dismiss, keyboard navigation) are described only as stated in CLAUDE.md/components.md, not re-verified.

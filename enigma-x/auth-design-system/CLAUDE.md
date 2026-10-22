# Enigma X Auth — Design System (agent brief)

Load this file before building or changing any Enigma X sign-in or authenticator UI. Every value here is traced to the prototypes; where the source is silent the system EXTENDS and says so. Do not invent, round, "improve" or merge values.

## 1. What this is

The authentication system of Enigma X: a **web sign-in portal** (login, two-factor code, success) and a **mobile Authenticator** (launch, Face ID, "Your devices", push banner, sign-in approval sheet with a one-time code, sign-out dialog, password fallback). Light only.

- **Relation to the Enigma X trading app** (`enigma-x/design-system/`, Figma, Geist / Geist Mono): same brand colour `#7AEFEF`, different system. Auth keeps **DM Sans / DM Mono** (owner decision 2026-10-14: the prototypes are the truth for auth). Do not load trading tokens in auth pages and do not put order books, tickers, blotters in auth.
- **Relation to Makor auth** (`makor-x`, Geist + EB Garamond, teal `#005268`): the same flow, functions and timings (1300 / 1100 / 600 / 650 / 50ms, 180s, 30s, 5s, 1800 / 2200 / 9000ms) and the same demo code, but a different palette, fonts, radii and layout. Cross-system differences are recorded, not unified.

## 2. Source of truth

1. `hub/auth/enigma-signin.html` (**W**, 713 lines) and `hub/auth/enigma-authenticator.html` (**A**, 1315 lines). Re-check values there when in doubt.
2. Harvested specs: `enigma-x/auth-html-spec/web-signin.md`, `authenticator.md` (line numbers, computed values); stage notes `build-notes.md`; run results `VERIFICATION.md`.
3. Rules: `audit/BUILD_RULES.md` section 11 (HTML-source variant). Owner decisions: **document, don't reproduce source bugs**; **document external dependencies, never copy/imitate them**; **Enigma auth keeps DM Sans / DM Mono**.

Files in this folder: `tokens.json` / `tokens.css` (`--eauth-*`, 205 vars), `components.css` (`.web-*` 46 classes, `.app-*` 109 classes, `.eauth-icon` + 14 `.eauth-i-*`), `components.md` (copy-paste HTML + intended JS), `showcase.html` (live reference, Copy HTML per demo), `assets/` (SVGs + `MANIFEST-web.md`, `MANIFEST-app.md`). Check `components.md` first; reuse its markup and classes exactly.

## 3. Non-negotiables (each proven by the spec)

- **Light only.** No dark theme, no `prefers-color-scheme` in either prototype.
- **Fonts: DM Sans for all text; DM Mono only for** the web OTP digits and timer value, and the app status-bar time, OTP code, code countdown and London-card IP value. Loaded faces: DM Sans 400/500/600/700, **DM Mono 500 only**.
- **Brand `#7AEFEF`** = actions: primary button, focus/filled borders, caret, checkbox checked, live dot, success icons. **Chrome teal `#3DBFBF`** (app only) = home banner + status bar, eyebrow text, push icon tile, keyboard focus outline, launch logo, map pin. **Hover `#5ADADA`** is the ONLY hover colour in either prototype (web primary-button hover; app primary-button hover, hard-coded); it is also the web link text colour. `#3DBFBF` is NOT a hover colour.
- **Text on the brand fill is black**: `#1A1A1A` on web, `#000000` on the app.
- **Radii:** controls 4px (button, input, toast, flag tile, map, pill, handle, focus ring); web card 8px, OTP slot 8px; app session card, code card, copy button, sheet top, detail grid 8px; checkbox 2px; icon tile 12px; logo tile 10px; dialog 14px; push banner 22px; shell `min(44px,4vw)`; dots/rings 50%.
- **Web and app palettes differ** for the same role (text-2, text-3, border, danger, bg, surface-2, label-on-brand): use the matching group (`--eauth-web-*` vs `--eauth-app-*`), never mix.
- **No gradients, no wordmark, no secondary buttons, no footer, no top nav, no avatar** exist in the live UI. The app has **no input error state** and **no media query**; the web has exactly one (`max-width:500px`).
- **Hover** exists only on: web primary button, web link, web password toggle, app primary button ("Confirm Identity"), app "Use Passcode" pill. Everything else has none (input hover is EXTENDED).
- The phone shell is 390x844, not scaled; no notch, no home indicator, no bezel.
- Icons: mask recipe `<span class="eauth-icon eauth-i-NAME">` coloured by `currentColor`. Never hand-write icon paths.
- No Tailwind/framework; no raw hex in component CSS (tokens only).

## 4. Tokens (`tokens.css`; same values in `tokens.json`)

Prototype variables are `--c-*` (web 15, app 14, same names with different values). Faithful map: `tokens.json > prototypeVariables`.

### Brand (shared)
| token | value | role |
|---|---|---|
| `--eauth-brand` | #7AEFEF | action fills, focus / filled borders, caret, live dot |
| `--eauth-brand-chrome` | #3DBFBF | app chrome (banner, status bar, eyebrow, push tile, focus outline); app only |
| `--eauth-brand-hover` | #5ADADA | hover; web link text |
| `--eauth-brand-ghost` | #7AEFEF18 | focus ring, success ring bg, confirmed-icon bg |
| `--eauth-white` | #FFFFFF | toast text, launch bg, logo on chrome, danger-button text |

### Web (`enigma-signin.html`)
| token | value | role |
|---|---|---|
| `--eauth-web-bg` | #EBEBEB | page backdrop |
| `--eauth-web-surface` | #FFFFFF | card, checkbox, OTP slot, focused input |
| `--eauth-web-surface-2` | #F5F5F5 | input resting bg |
| `--eauth-web-black` | #1A1A1A | text on primary button, spinner arc |
| `--eauth-web-text` | #1A1F36 | body, headings, input text |
| `--eauth-web-text-2` | #6B7280 | sub text, labels, eyebrow, timer value, disabled text |
| `--eauth-web-text-3` | #9CA3AF | placeholder, toggle rest, timer row, separator, checkbox border |
| `--eauth-web-border` | #E2E2E2 | input + slot border |
| `--eauth-web-danger` | #EF4444 | error text / borders, expiring timer |
| `--eauth-web-disabled` | #D1D5DB | disabled / loading button bg |
| `--eauth-web-danger-ring` | rgba(239,68,68,.08) | error ring (raw in source) |
| `--eauth-web-danger-bg` | #fef2f2 | OTP slot error bg (raw) |
| `--eauth-web-spinner-track` | rgba(0,0,0,.15) | spinner track (raw) |
| `--eauth-web-tick` | #000000 | checkbox tick stroke (raw; differs from web-black) |

### App (`enigma-authenticator.html`)
| token | value | role |
|---|---|---|
| `--eauth-app-bg` | #F7F8F8 | shell, home, stage |
| `--eauth-app-surface` | #FFFFFF | cards, sheet, dialog, pw screen |
| `--eauth-app-surface-2` | #F7F8F8 | input bg, flag tile, code card, cancel button, detail grid |
| `--eauth-app-black` | #000000 | toast bg, label on brand fill |
| `--eauth-app-text` | #1A1F36 | body, headings |
| `--eauth-app-text-2` | #7C9CAC | secondary text, labels, disabled text |
| `--eauth-app-text-3` | #A8BECD | tertiary, placeholders, timestamps, disabled bg, back link |
| `--eauth-app-border` | #DEE8ED | input border, London card, divider, handle, map base |
| `--eauth-app-danger` | #E5686A | sign out, block link, urgent timer, danger toast |
| `--eauth-app-success` | #4DCC9B | "Active now" label only |
| `--eauth-app-disabled-bg` | #A8BECD | disabled button bg |
| `--eauth-app-disabled-text` | #7C9CAC | disabled button text |

App overlays are raw rgba literals tokenised by role (`--eauth-app-pill-bg*` .06/.10/.15, `-faceid-tint`, `-logo-tile`, `-push-*`, `-on-chrome`, `-map-pill-bg`, `-sheet-overlay` .45, `-confirm-overlay` .4); see `tokens.css`. `--eauth-dep-faceid-card` `#404042` is documentation only (the colour inside the Face ID Lottie), never used in components.

## 5. Typography

Families: `--eauth-font-sans` `'DM Sans', -apple-system, sans-serif`; `--eauth-font-mono` `'DM Mono', monospace`. Google Fonts link in `components.md` section 0 (verbatim from the prototypes).

**Synthetic-bold flag:** DM Mono 600 is not published; every `font-weight:600` on DM Mono (OTP digits, timer, status time, OTP code, countdown, IP) is a synthetic bold on the loaded 500. Reproduced as rendered; owner may prefer 500 (open decision).

Scale (`--eauth-fs-*`): 10, 12, 14, 16, 18, 20, 22, 24, 38. Weights: 400 / 500 / 600 / 700. Line-heights: titles 1.2; push title 1.3; push sub 1.4; confirm body 1.45; sub text 1.55; everything else `normal`. Letter-spacing: field label .04em; web eyebrow + code label .08em; app eyebrow .12em; group label + sheet title .1em; detail label .09em; sheet info label .07em; OTP code .18em; push app name .02em; launch/home name -.02em; Face ID label / pill / dialog title -.01em.

Key tuples (full tables with specimens: `showcase.html` > Typography):
| use | tuple |
|---|---|
| web title | DM Sans 24/700, lh 1.2, `#1A1F36` (OTP title 20/700) |
| web eyebrow | 14/600, .08em, uppercase, `#6B7280` |
| web field label | 12/600, .04em, `#6B7280`, typed in caps |
| web input / button | 16/400 / 16/600 |
| web OTP digit | DM Mono 24/600 (synthetic), `#1A1F36` |
| web link button | 14/600, `#5ADADA`, underline offset 4px |
| app home title / pw title | 20/700 / 22/700, lh 1.2 |
| app eyebrow | 10/700, .12em, uppercase, `#3DBFBF` |
| app group label | 12/700, .1em, uppercase, `#A8BECD` |
| app OTP code | DM Mono 38/600, .18em, `#1A1F36` |
| app countdown | DM Mono 14/600, `#7C9CAC` (urgent `#E5686A`) |
| app button | 16/600, `#000` |

## 6. Sizes, breakpoints, geometry

- Web: card max 440px (content 360), padding `0 40px 36px`; at `max-width:500px` `0 24px 28px`; success padding 32px; page padding `24px 16px`; logo 72px, header padding `36px 0 28px`; input 48px; button 50px; OTP slot 58px (fluid width, gap 8px); toggle 44x44; checkbox 16px; spinner 18px; success ring 72px (icon 34px).
- App: shell `min(390px,100vw) x min(844px,100dvh)`; status bar 44px; home banner 72px; buttons 52px (primary, copy); input 48px; confirm buttons / back / toggle 44px min; sign-out + flag tile 36px; launch logo 108px; Face ID box 180x180; push tile 44px (logo 22px); home tile 44px (logo 30px); sheet handle 36x4; map 160px tall; dialog max 320px; toast bottom 32px, sides 16px.
- Breakpoints: only `(max-width:500px)` on the web card. Hug/fixed/fill: heights are fixed as listed; slots flex; cards fill to their max.
- Spacing is observed (no tokens in source): 2 4 6 8 10 12 14 16 18 20 24 28 32 36 40 (`--eauth-space-*`, documentation tokens).

## 7. Components (S = defined in the source, E = EXTENDED)

Web: page backdrop + card (S; `--contained` E) · logo header (S) · view switch (S) · eyebrow/title/sub (S) · field + input (S; hover E, aria-invalid E) · password toggle (S) · field error (S) · checkbox (S behaviour, real input = decided; focus ring E) · link button (S) · primary button + spinner (S) · OTP slots + separator + error message (S) · timer row (S; "Code expired" label = decided) · back button (S) · success view (S).
Mobile: stage + phone shell (S) · status bar (S) · launch (S) · Face ID overlay + "Use Passcode" pill (S; placeholder box E; Lottie = dependency) · screen stack (S) · home banner + header (S) · group label (S) · session row (S) · current-device card (S, promoted from inline) · empty state (S) · push banner (S) · bottom sheet + map + details (S) · OTP code card + copy + block link (S) · confirmed state (S) · confirm dialog (S) · toast, 2 variants (S) · password-fallback screen + input + toggle + primary button (S; input hover E).
Not built (dead or absent): see section 12. Per-component values: `components.md` and `showcase.html`.

Class scheme: web `.web-*`, mobile `.app-*`, icons `.eauth-icon .eauth-i-<name>`. States: real pseudo-classes plus forced `.is-hover .is-focus .is-active .is-disabled` and JS state classes `.is-error .is-filled .is-loading .is-checked .is-warn .is-urgent .is-show .is-open .is-hidden .is-active(view) .is-pressed .is-copied .is-fading .is-removing .is-entering .is-current/.is-before/.is-after` (map in `components.md`). Every CSS rule block cites `/* src: file Lxx */`.

Focus: web buttons/link/toggle/back `outline 2px #7AEFEF, offset 2px`; web inputs/slots border + ring (outline none); app buttons AND inputs `outline 2px #3DBFBF, offset 2px` (inputs also keep border + ring: double ring, flag A7). The source's `border-radius:4px` on `:focus-visible` is applied only to radius-0 controls (no component changes shape when focused).

## 8. Motion and timings

| item | value |
|---|---|
| web button | background .12s, transform .08s, opacity .12s; hover `#5ADADA`; active `scale(.98)` |
| web input | border-color/box-shadow .18s; link/toggle/checkbox .12s |
| web OTP slot | border/ring/bg .15s, transform .1s; focus `scale(1.05)` |
| web spinner | `spin .65s linear infinite` |
| web slot error | `shake .35s ease` (translateX 0, -6px, 6px) |
| web success ring | `pop-in .45s cubic-bezier(.34,1.56,.64,1)` (scale .2 to 1, opacity 0 to 1) |
| web views | no transition |
| app screens | transform .38s `cubic-bezier(.4,0,.2,1)` + opacity .3s ease |
| app push / sheet | transform .42s `cubic-bezier(.32,0,.04,1)` (push from -130%) |
| app toast | transform .28s `cubic-bezier(.4,0,.2,1)` + opacity .28s ease |
| app launch / Face ID | opacity .3s / .25s; blur-in .65s ease; content-in .2s ease .25s |
| app overlays | sheet overlay .35s; confirm overlay + dialog .2s ease (dialog `scale(.95)` to 1) |
| app live dot | `dotpulse 2.4s ease infinite` (ring 4px to 6px transparent). NOT 2s ease-in-out |
| app pill / confirm btn / session | .15s / .15s / .23s |

Behaviour constants: login to OTP **1300ms**; verify **1100ms**; wrong code clear **600ms**, refocus **650ms**; autofocus **50ms**; expiry **180s** (warn/urgent at 30s); resend cooldown **30s**; redirect **5s**; launch hold **1800ms**; Face ID scan **2200ms** (cold open effective ~1800 to ~4000ms); banner dismiss **9000ms**; toast **3000ms**; copied **2000ms**; confirmed flow **220 / 2800 / 500ms**; password verify **1400ms**; row removal **230ms**; clock **10000ms**. EXTENDED: `prefers-reduced-motion` collapses everything to ~0.

## 9. z-index (app only; web has none)

launch 40 < Face ID 50 (content 1 inside) < sheet overlay 100 < sheet 101 < confirm 200 < push banner 300 < toast 999. Status bar and screens are auto (everything above covers the status bar, including the banner).

## 10. Documented dependencies (never copy or imitate)

- **Face ID animation**: dotLottie `https://lottie.host/2c89c12e-4c0d-41a6-ae13-30b2ce7a964a/kjwDIWFPeM.lottie` (A L677, third-party, same URL in Makor). Composition "Flow 2", 150x148 rendered in a 180x180 box (fills 180 x 177.6), 244 frames @ 60 fps = 4.0667s loop, dark rounded card `#404042` with white `#FFFFFF` strokes, label "Face ID"; states: face glyph, scan circle, circle with check; prototype cuts at 2200ms. Breaks offline. CSS reserves the 180px box and ships a labelled dashed placeholder (EXTENDED); never draw an imitation.
- **Player**: `https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs` (A L10): unpinned `@latest` (pin it).
- **Fonts**: Google Fonts (DM Sans, DM Mono). **Map**: `assets/app-map-london.svg` (illustration, `object-fit: cover`).
- **BroadcastChannel** `enigma_auth` is shared with Makor (cross-talk): use `enigma_x_auth` per product.

## 11. Known source bugs and decisions (document, don't reproduce)

W = enigma-signin.html, A = enigma-authenticator.html. The system builds the intended behaviour; the originals can be fixed from this table.

| # | where | bug (in the source) | chosen behaviour |
|---|---|---|---|
| **W1** | W L395-400 | Checkbox "Keep me signed in" is a <label onclick> + <div>, no <input>; not keyboard reachable. | Real hidden <input type="checkbox"> + visual box; :checked and .is-checked look identical; EXTENDED keyboard focus ring. |
| **W2** | W validation (spec 5.7) | Any password under 4 characters shows "Incorrect credentials. Please try again." before any credential check. | That message only after a real credentials failure. Empty-field copy is UNRESOLVED (open decision). |
| **W3** | W spec 5.8 | Field errors persist while typing; cleared only on the next submit. | Clear .is-error and hide the message on `input` of that field. |
| **W4** | W L705-710 | Document-level Enter handler also fires on focused buttons (toggle, Back, links). | Enter submits only when the event target is an input / OTP slot (or use a real <form>). |
| **W5** | W L444, goToView | Back to sign in leaves the expiry and resend timers running. | Back stops both timers (and resets the OTP view). |
| **W6** | W expiry handler | At 0 the label reads "Code expires in Expired". | Replace the whole label with "Code expired" (copy to be confirmed), keep .is-warn red, keep Resend. |
| **W7** | W spec 5.13, 5.15 | Resend does not clear #otp-err text; paste does not clear .has-error; Backspace-clear leaves the error message. | Resend, paste and Backspace-clear all clear error state (message + slot errors). |
| **W8** | W L429 | role="alert" on an empty <p>. | Keep, populate only on error. |
| **W9** | W spec 5.19 | Success redirects to enigma-dashboard.html after 5s; the file does not exist. | Target UNRESOLVED (open decision); 5s countdown kept. |
| **W10** | W L401 | "Forgot password?" has no handler. | Styled link kept; destination UNRESOLVED (open decision). |
| **W11** | W L127-133 | .field-input.error + :focus renders white bg + red border (cascade accident). | Kept as rendered (error ring wins); flagged, harmless. |
| **W12** | W L29-33 | button:focus-visible{border-radius:4px} silently changes a control's radius while focused. | Ring only; 4px is applied solely to radius-0 controls (link, toggle, back) so no component changes shape. |
| **W13** | W L9 | DM Mono 600 is not published: OTP digits + timer use synthetic bold on DM Mono 500. | Reproduced (font-weight 600 declared) and flagged; owner may prefer 500. |
| **W14** | W L161 | .link-btn colour #5ADADA on white has low contrast. | Kept (designed), flagged. |
| **A1** | A L1177 | Empty-state selector `#other-sessions .session-compact` matches nothing, so "No other active sessions." appears after the FIRST sign-out. | Show .app-sessions-empty only when zero .app-session rows remain (excluding the current-device card). |
| **A2** | A L1259 | navigator.clipboard.writeText is not awaited, the rejection is uncaught, UI says Copied anyway. | await inside try/catch; .is-copied + "Copied" only on success; failure toast copy UNRESOLVED. |
| **A3** | A L1091-1096 | Face ID retry is unreachable (handler needs !.active, .active is always set); .active/.completed have no CSS. | Tap-to-retry only after a scan ended; failure/retry visuals do not exist in source (UNRESOLVED). |
| **A4** | A L989, L1099 | Face ID started twice on cold load (setTimeout 600ms + launch callback). | Single start, after the 1800ms launch hold. |
| **A5** | A L91 | Push banner covers the status bar and sits above the sheet and dialog (z 300). | Kept (designed). |
| **A6** | A L32-36 | button/input:focus-visible{border-radius:4px} would shrink the 8px copy button while focused. | Ring only; 4px only on radius-0 controls (back, toggle, block link). |
| **A7** | A L32-36, L434 | App text inputs show a double ring (border + 4px shadow + 2px #3DBFBF outline): the app lacks the web's input:focus-visible{outline:none}. | Kept as rendered and flagged (unsure bug vs design). |
| **A8** | A L921, L1222, L1258 | Code is hard-coded "482 716" / "482716". | Placeholder value; real code generation is out of scope. |
| **A9** | A L808-809 | Password eye toggle flips the input type but never changes the icon (no eye-off asset). | Icon stays; type flips; flagged. |
| **A10** | A L497-543 | Sheet, overlay, banner and dialog cannot be dismissed by tap; no gestures at all. | As designed (documented). |
| **A11** | A spec 6 | No role=dialog / aria-modal, no aria-live toast, no focus trap. | Recommended markup: role="dialog" aria-modal="true" on .app-confirm, role="status" on .app-toast (used in this system's snippets); no CSS change. |
| **X1** | W L518, L622; A L1307 | BroadcastChannel("enigma_auth") is shared by Makor pages and BOTH Enigma pages (cross-talk). | One channel per product: "enigma_x_auth" for the Enigma pages (messages {type:"sign_in_request"} / {type:"code_used"}); Makor keeps its own. |
| **X2** | A L10, L677 | @dotlottie/player-component@latest is unpinned; Face ID Lottie is third-party hosted. | Pin the player version; see "documented dependencies". |

## 12. Dead code excluded (no markup in the source; not built)

Web: `.top-nav, .nav-brand, .nav-icon, .nav-name` (W L55-76); `.divider*` (W L191-194); `.secure-row*` (W L197-202); `.phone-graphic, .phone-pill, .phone-app-icon, .phone-notif-*` (W L208-236); `.waiting-badge, .waiting-dots` (W L296-314); `.session-chip, .live-dot` (W L333-343); `.btn-black` (W L344-346); `@keyframes pulse-dot, dot-bounce` (W L83); `rgba(45,218,197,.3)` (W L223); `#view-login .eyebrow` (W L107); `resetAll() / otpListenersAttached reset` (W L695-702).
App: `.btn-danger (+ :hover)` (A L151-159); `.home-header-left .eyebrow` (A L320); `.home-avatar` (A L322-326); `.session-current*, .session-rows, .session-row*` (A L331-363); `.sheet-otp.used (26px, line-through)` (A L582); `[tabindex]:focus-visible` (A L32); `.faceid-sub` (A L270, L686); `.fid-wrapper.active / .completed` (A L1079, L1084); `--c-primary-dim (#3DBFBF)` (A L18); `flex-shrink on .sheet-handle / .sheet-map` (A L523, L528); `.screen-title base 24px` (A L136).

## 13. Open decisions for the owner

1. **Empty-password error copy.** The source shows "Incorrect credentials. Please try again." for a short password (bug W2). Which copy should an empty/short password show (e.g. "Enter your password.")?
2. **Expired-code label.** Web timer at 0: proposed "Code expired" (replaces the whole label, bug W6). Confirm the copy.
3. **Clipboard-failure message.** Authenticator copy button when the Clipboard API rejects (bug A2): toast copy not designed (e.g. "Couldn't copy. Select the code and copy it manually.").
4. **Target of "Forgot password?".** No handler or destination exists (bug W10).
5. **Post-login redirect target.** Success redirects to enigma-dashboard.html, which does not exist (bug W9). 5s countdown kept.
6. **Face ID failure / retry.** No failure, retry, lockout or "biometric unavailable" design exists; tap-to-retry is unreachable in source (bug A3). Design needed.
7. **Eye-off icon for the app.** The app password toggle never changes its icon; no eye-off asset exists in the app (the web has web-icon-eye-hide.svg). Reuse the web asset or draw a new one?
8. **DM Mono 600 (synthetic bold).** OTP digits, timer, status time, OTP code and countdown declare 600 on a font that only has 500 loaded. Keep the synthetic bold (as rendered) or switch to 500?
9. **App input double focus ring.** Border + 4px ring + 2px #3DBFBF outline (bug A7). Keep or remove the outline like the web?
10. **Cross-system font note.** Enigma main trading app (Figma) uses Geist / Geist Mono with the same brand #7AEFEF; auth keeps DM Sans / DM Mono (owner decision 2026-10-14). Recorded, not unified.
11. **Shared BroadcastChannel name.** Confirm the per-product channel name "enigma_x_auth" (bug X1) and that Makor gets its own.

## 14. EXTENDED items (not in the prototypes)

| name | what | derivation |
|---|---|---|
| `.web-page--contained, .app-stage--contained` | drop the viewport min-height so a page/stage can sit inside a frame (showcase, docs, embeds) | layout only, no visual value |
| `.web-input:hover / .is-hover, .app-input:hover / .is-hover` | hover border colour | the source has no input hover; uses the surface's own placeholder grey (--eauth-web-text-3 / --eauth-app-text-3) |
| `.web-input[aria-invalid="true"]` | same look as .is-error | alias for accessibility-correct markup |
| `.web-checkbox-input:focus-visible + .web-checkbox-box / .web-checkbox.is-focus` | 2px brand outline, offset 2px, radius unchanged | the page's own focus-ring recipe (the source has no checkbox focus style) |
| `.app-faceid-placeholder` | labelled dashed box standing in for the external Face ID Lottie | never an imitation: dashed --eauth-app-text-3, --eauth-app-surface, --eauth-app-text-2 |
| `@media (prefers-reduced-motion: reduce)` | transitions and animations collapse to ~0 | neither prototype handles reduced motion |

## 15. What NOT to do (claims of the old docs that the prototypes disprove)

- Top navigation bar (56px, frosted), "Waiting badge", "Secured by 256-bit TLS" badge and "OR" divider as live web components: none has markup; CSS only (dead).
- Avatar / initials circle and a "session-current" card as live mobile components: the CSS exists, nothing renders it.
- "Border radius always 4px": the web card, OTP slots and app cards/code card/copy button are 8px; dialog 14px; banner 22px; icon tiles 10/12px.
- "#3DBFBF is the mobile hover colour": the only mobile hover is #5ADADA (.btn-primary:hover, hard-coded). #3DBFBF is chrome (banner, status bar, eyebrow, push tile, focus outline).
- "Live dot pulse 2s ease-in-out": the live dot is dotpulse 2.4s ease infinite (2s ease-in-out belongs to the dead web pulse-dot).
- "Input error pattern" on the authenticator (#E5686A + rgba(229,104,106,.06)): the app has no input error state at all.
- "Never hardcode hex" / `--auth-*` token names: the prototypes use `--c-*` (and hard-code #5ADADA, #000, #fff and many rgba()); this system names tokens `--eauth-*`.
- "DM Mono only for the OTP code and timers" is incomplete: DM Mono is also the app status-bar time and the London-card IP value (and the web OTP digits).
- "Never animate longer than 0.20s on hover" is an invented rule, not in the source (actual hover transitions: 0.12s buttons/links/toggle, 0.15s passcode pill, 0.18s inputs).
- Do not use `--auth-*` token names or reference `--color-*` from the trading system in auth components; use `--eauth-*`.
- Do not use DM Mono for labels, buttons or UI copy; do not use Geist in auth.
- Do not add dark mode, gradients, a top nav, avatar, waiting badge, security badge, "OR" divider, secondary buttons, or an app input error state.
- Do not hand-draw the Face ID animation or any icon; do not copy the Lottie.
- Do not reproduce the listed source bugs (dead buttons, "Code expires in Expired", wrong empty-state selector, un-awaited clipboard, double Face ID start, shared channel name, focus radius change).
- Do not invent copy for the open decisions (empty-password error, expired label, clipboard failure) or targets (forgot password, redirect).

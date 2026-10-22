# Auth design system showcase: migration to the shared showcase kit

Date: 2026-10-15. File changed: `makorx-ai/auth-design-system/showcase.html` only (368,226 B -> 482,284 B). `tokens.css`, `components.css`, `constellation.js`, `assets/`, `components.md`, `CLAUDE.md`, the kit, other platforms and the hub are untouched.
Generator (kept): `scratchpad/auth/gen-showcase.js` with `page.css`, `page.js`, `minidom.js` (offset-preserving parser). Run: `node gen-showcase.js showcase.old.html baseline/copies.json <out>`. The old file copy is `scratchpad/auth/showcase.old.html`; `baseline/copies.json` is the Copy HTML text produced by the old page's own handler.

## 1. What changed

* Chrome: `.sk-app` (top bar, generated left nav, hash routing, `?all`, search, prev/next, Copy HTML, lazy scale-to-fit frames). Old `.sc-*` chrome rules, hand-written nav, scroll-spy, copy handler and flash toast removed.
* Top bar: logo = `assets/web-makor-logo-mark.svg`; title "Makor auth design system"; source line "Source: Makor auth prototypes (hub/auth/makor-signin.html, makor-authenticator.html, makor-authenticator-dark.html) · harvested 2026-10-14".
* `--sk-*` mapped from `--mauth-*` on `.sk-app` (page `--mauth-web-surface`, cards `--mauth-web-field`, accent `--mauth-web-primary`, badges extended/documented from primary/danger). Fonts: the existing Geist + EB Garamond `<link>`. Platform `tokens.css`, `components.css`, `constellation.js` links kept; kit CSS/JS added with `../../shared/showcase-kit/...`.
* Demo markup (everything inside `[data-demo]` and the context wrappers `.sc-stage*`, `.sc-webstage`, `.sc-iframe`, `.sc-phone`/`.sc-ph-*`) is copied byte for byte by the generator. Wrapper rules and the body defaults (Geist 14px/1.45) were kept in `page.css`; the old global resets are scoped to demo/specimen areas with `:where()` at unchanged specificity.
* Platform script kept and moved after the kit: password toggles, OTP slots, replay buttons, Light/Dark/Both switches, constellation start/stop. Demos inside lazy frames are wired on the kit's `sk:frame` event.

## 2. Old -> new mapping

Foundations (ids `f-*`; old ids kept as empty anchors): Colours = `f-colors`, Typography = `f-type`; Radii, Spacing, Shadows, Motion, Sizes, Icons unchanged ids. Old blocks became kit blocks: 73 swatches, 61 samples (56 tiles + 5 keyframe items), 70 type rows, 39 icon figures, token tables; spacing rows and the two z-index stacks became tables (all text kept).

Components by role (card ids unchanged; one nav item per family):

| Group | Nav item (section id) | Card | Old group |
|---|---|---|---|
| Actions | Buttons (`c-actions-buttons`) | `c-web-buttons` | Web sign-in |
| Forms & inputs | Inputs (`c-forms-inputs`) | `c-web-inputs` | Web sign-in |
| Forms & inputs | OTP slots (`c-forms-otp`) | `c-web-otp` | Web sign-in |
| Feedback | Timer / resend (`c-feedback-timer`) | `c-web-timer` | Web sign-in |
| Feedback | States (`c-feedback-states`) | `c-web-states` | Web sign-in |
| Feedback | Toasts (`c-feedback-toasts`) | `c-app-toast` | Mobile authenticator |
| Overlays | Confirm dialog (`c-overlays-confirm`) | `c-app-confirm` | Mobile authenticator |
| Platform patterns | Backdrop & card, Logo (`c-patterns-backdrop`, `c-patterns-logo`) | `c-web-backdrop`, `c-web-logo` | Web sign-in |
| Platform patterns | Phone frame & status bar, Launch, Face ID card, Home & session cards, Push banner, Bottom sheet & OTP code, Password fallback (`c-patterns-frame`, `-launch`, `-faceid`, `-home`, `-banner`, `-sheet`, `-pw`) | `c-app-frame` ... `c-app-pw` | Mobile authenticator |

Screens: `s-web` (3 cards: login, OTP, success) and `s-app` (10 cards) keep their section ids and card ids. Reference: `r-decisions` = old `n-bugs` (36 rows), `r-dead-code` = `n-dead` (18 rows), `r-open-decisions` = `n-open` (12 items), `r-extended-index` generated (8 Extended rows, 1 Documented dependency row listed separately). Old ids `n-bugs`, `n-dead`, `n-open`, `f-colors`, `f-type` remain as anchors. The mapping is also shown on the Overview ("Component map").

## 3. Verification (http://localhost via a static server and via `npx serve`)

* SKSnap (kit tool), roots `[data-demo]` (every demo root and descendant, 2,242 elements) in the three global modes Both / Light / Dark: old page and new page, animations paused at t=0 and canvases reset so time and viewport state do not leak in. Old-vs-old noise = 0. Old-vs-new differences, all explained: (a) 3 dialog + 3 title elements whose duplicate id was made unique (section 4.4); (b) resolved `left`/`right` offsets of 3 constellation canvases and 3 watermarks inside the web screen frames (container 1440 px instead of the old ~1056 px column). Wrapper and demo-root elements (169: `[data-demo]`, `.sc-stage*`, `.sc-webstage`, `.sc-iframe`, `.sc-phone`) are identical. The kit's `SKSnap.diff` pairs same-key elements by document order and the regrouping reorders sections, so an order-independent comparison of the same `SKSnap.take` data was used.
* Foundation specimens (167 elements): 91 type specimens differ only by `overflow-wrap: anywhere`, inherited from the kit's `.sk-type__sample`; swatch/sample/icon content identical.
* `SK.problems` = `[]`; console errors/warnings 0; 45 requests, none non-200 (local assets and mask SVGs 200; Google Fonts CSS loads); favicon 404 of the old page removed with a data-URI icon.
* 31 nav items each open exactly one non-empty section with `aria-current` on the item; 9 deep links (`#f-colours`, `#c-actions-buttons`, card ids `#c-web-inputs`, `#c-app-faceid`, screen card `#s-app-toast`, old ids `#f-colors`, `#n-bugs`, unknown hash) resolve correctly; `…/showcase?all` shows all 31 sections under `npx serve`.
* Copy HTML: 29/29 outputs equal the old handler's output (whitespace-normalised); button shows "Copied ✓".
* Frames: 23 (3 web 1440x802, 20 phones 390x844); scaled box height = h x scale within 1.5 px for all; all 23 unrendered on load and rendered on scroll; Fit/100% toggle works on the web frames. Constellation canvases animate in component cards and inside lazily rendered frames; OTP typing and password reveal work in cards and in frames; ease replay works.
* Global and per-card Light/Dark/Both switches: pane visibility and `aria-pressed` correct in every sequence tested.
* Text inventory (3,849 old text nodes): nothing lost; the only old strings absent are the three part headings (now nav groups), the old table header words, and the z-index lines (now table cells).

Counts old -> new: sections 17 -> 31 (30 counted by the kit + overview); cards 29 -> 29 (16 components + 13 screens); `[data-demo]` 105 -> 105 (82 in the DOM, 23 inside lazy frames); variants 53 + 50 panes -> 83 `.sk-variant` (53 + 30 panes in component cards) + 20 pane frames; Extended badges 8 -> 8 (kit chip 8; one more badge exists only in the legend); Documented dependency 1 -> 1 (+ legend); Copy buttons 29 -> 29; "Source:" lines 29 -> 29; swatches 73, type rows 70, icons 39, decision rows 36, open decisions 12 unchanged; images 25 -> 26 (top-bar logo is now an `<img>`; the old one was a CSS mask); canvases 12 -> 12; iframes 1 -> 1; table rows 219 -> 282. Assets chip: 24 (SVG files; the two MANIFEST files excluded).

Size: 482,284 B (old 368,226 B). Tallest section: `s-app`, 11,444 px (next: `f-typography` 10,610 px). Old single page: 64,125 px; new `?all` page: 69,885 px.

Screenshots (headless Chrome over CDP, 1400 px wide): `scratchpad/auth/shots/*.png` (overview, colours, typography, inputs, faceid, toasts in Dark mode, backdrop, s-web, s-app, decisions, ext-index, icons, shadows, motion).

## 4. Deviations and decisions

1. No kit theme toggle. The page has no page-level theme (chrome is light only; `[data-theme="dark"]` exists only on the authenticator demos). Its "theme" control is the Light/Dark/Both demo-pane switch (global in the top bar, one per authenticator card); it is kept as `.sk-seg`, so `SK.onThemeToggle` is not used. The old global switch was broken after its first click (it overwrote the `data-mode` of its own buttons, so Dark/Both read "light"); the handler now skips buttons.
2. Copy HTML uses `<template data-sk-source>` per card holding the old handler's output (no `sc-*` classes, no `data-demo`, light pane only, plus the "add data-theme=dark" comment for both-theme cards). The old handler returned empty text in Dark mode for dual-pane cards; the new one always returns the canonical light markup.
3. "Source-defined" (16) has no kit badge: kept as a plain muted tag (`.sk-id`) in each card head, with one sentence in the Overview. No Alt / Outside canonical items exist in this source.
4. Old `id="confirm-title"` occurred 4 times (invalid HTML, ambiguous `aria-labelledby`). Kept on the first demo; the others became `confirm-title-dark`, `confirm-title-screen`, `confirm-title-screen-dark` (id and `aria-labelledby`). Needed for `SK.problems = []`. Copy HTML keeps the original id.
5. The old file had one stray `</div>` in `c-web-states` that pushed the last caption out of its figure; fixed (the caption sits under the success-view demo).
6. Screens sit inside `article.sk-card` (Copy HTML and the Source line exist only on cards) with a `figure.sk-screen` per card; light and dark phones are two 390x844 frames side by side (Fit/100% toggle off, they never scale up). The shell's box-shadow outside 390x844 is clipped by the frame. Web frames are 1440x802 (1:1 slice of a 1440x800 viewport plus the stage border); the canvas stays window-sized (`100vw x 100vh`, as in the source).
7. Component cards: per-variant context wrappers (`.sc-stage*`) stay inside `.sk-demo`; app cards use `sk-stage--visible` so phone shadows are not clipped; the Light/Dark tag moved from above the phone to the caption; sub-headings are `h4.sk-h4` inside the stage. In the Face ID card, the dependency callout and the facts table moved from between the demos into the card notes.
8. Decisions table: the old table had no status. Status is derived: "Open" for rows that correspond to an item of "Open decisions for the owner" (#1, 7, 8, 14, 20, 25, 31, 32, 34), "Decided" for the rest. Column labels follow the kit (# / Source (file + line) / What / Chosen behaviour / Status).
9. Foundation swatches: the old role text's second line (source) is shown as the source line without a "Source:" prefix; tuple and size rows keep their original wording, with usage/source text in the row meta.
10. Overview additions: the old part leads ("Parts of this page"), the component map table, the badge legend and the Source-defined sentence.
11. New in the Extended index: the Overview mention and the Motion lead are listed (they carry the 1st and 2nd of the 8 badges).

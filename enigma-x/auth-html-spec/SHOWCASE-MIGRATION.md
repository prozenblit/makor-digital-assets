# Enigma X AUTH showcase: migration to the shared showcase kit

Date: 2026-10-15. File changed: `enigma-x/auth-design-system/showcase.html` only (686,379 B -> 746,436 B). `tokens.css`, `components.css`, `components.md`, `CLAUDE.md`, `tokens.json`, `assets/`, the kit and all other platforms are untouched. Structure rules: `shared/showcase-kit/STRUCTURE.md`; procedure: `shared/showcase-kit/MIGRATION.md`.

The page was generated, not hand-edited. Generator: `build-showcase.js` (+ `minidom.js`, `page.css`, `page.js`) in the session scratchpad (`.../scratchpad/eauthmig/`); it parses the old file with an offset-preserving parser and copies every demo as an exact source slice. Verification scripts (`snap.mjs`, `cmp.mjs`, `verify.mjs`, `copytest.mjs`, headless Chrome over CDP) are in the same folder.

## 1. What changed

- Chrome: `.sk-app` shell, top bar (Enigma mark = the same `.eauth-icon.eauth-i-logo` mask used before, title "Enigma X auth design system", source line "Source: Enigma X auth prototypes (hub/auth/enigma-signin.html, enigma-authenticator.html) . harvested 2026-10-14", search), generated left nav, prev/next, Copy HTML. No theme toggle (light only). The old hand-written nav, scroll-spy, copy handler, `html{scroll-behavior:smooth}` and all `.sc-*` chrome rules are gone.
- Head: Google Fonts link (DM Sans + DM Mono), `tokens.css`, `components.css` kept; added `../../shared/showcase-kit/showcase-kit.css` and, at the end of body, `../../shared/showcase-kit/showcase-kit.js`; `<link rel="icon" href="data:,">` (the old page logged a 404 for `/favicon.ico`).
- `--sk-*` mapped from `--eauth-*` on `.sk-app`: bg `--eauth-app-bg`; surface / surface-2 / border / text / text-muted from `--eauth-web-*`; stage background `--eauth-web-bg` (what web demos sit on); fonts `--eauth-font-sans` / `--eauth-font-mono`; radius `--eauth-radius-card`; focus `--eauth-brand-chrome`. The accent and the Extended / Outside badge colours are `color-mix()` of `--eauth-brand-chrome` and `--eauth-web-text` (contrast; see open decision in `r-open-decisions`). Documented-dependency badge = `--eauth-web-text`, Alt = `--eauth-web-text-2`.
- Body styles that demos inherit are unchanged (`body{margin:0;background;color;font-family;-webkit-font-smoothing}`).
- A `/* demo support */` block keeps the showcase-only wrapper rules (`sc-phone`, `sc-strip`, `sc-web-screen`, `sc-iframe`, `sc-spec-cell`, `sc-ico`, motion boxes, the 440 / 472 / 438 / 390 / 375 px width helpers on `.sk-variant`). Flagged as decision M1 in `r-decisions`.
- Platform script (after the kit): password toggle (unchanged), motion replay (adapted to the new markup), per-state / per-screen Copy HTML, and a guard that keeps `data-sk-theme="light"` (the kit remembers a dark choice from another showcase of the same origin).
- Content blocks re-expressed as kit blocks: colour swatches -> `.sk-swatches` (48, role text restored from the `title` where the visible text was cut with "..."); type tuples -> `.sk-type` rows (60, specimens kept verbatim); radii / shadows / spacing / motion -> `.sk-samples` (9 / 9 / 15 / 6); mask icons, all 23 exported files and the 4 logo tiles -> `.sk-icons` (13 / 23 / 4); z-index stack -> token table; all other tables -> `.sk-table--compact`; bug list -> `.sk-table--decisions` with a Status column (derived: text containing UNRESOLVED = Open, otherwise Decided); badges -> `sk-badge--extended` / `--documented`, "Decided behaviour" -> `sk-status`, "Recipe" and "synthetic bold" -> plain `sk-badge`.
- Cards: one old `sc-comp` = one `.sk-card` (title + badges, Source line, stage, Copy HTML, notes = old meta/desc/h4+table). One old figure = one `.sk-variant` (demo inside `.sk-demo` byte for byte, label + badges + note under it).

## 2. Old -> new mapping

Old section ids stay alive as empty anchors inside the new section (kit resolves any id in a section). The old code `<details>` view is replaced by Copy HTML.

### Foundations (always 8; extras are `h3` sub-headings)

| Old | New | Content |
|---|---|---|
| `f-colors` | `f-colours` | Brand, Web, Authenticator, overlays, Documented dependency colour, prototype-variable tables |
| `f-type` | `f-typography` | Font families, scale tokens, tuples (web, app), specimen block |
| `f-radii` / `f-spacing` / `f-shadows` | same ids | samples (+ blur / stroke tables under Shadows) |
| `f-motion` | `f-motion` | 6 motion boxes with Replay, durations, easings, animations, Reduced motion (Extended) |
| `f-sizes` | `f-sizes` | control heights, geometry, breakpoints, z-index, shell geometry |
| `f-icons` | `f-icons` | mask recipe, 23 files, logo per surface |

### Components (by role)

| Old section (by-app group) | New section (group) | Cards (ids) |
|---|---|---|
| `c-web-buttons` Buttons | `c-actions-buttons` (Actions) | `-primary`, `-link`, `-back` |
| `c-web-inputs` (field, password) | `c-forms-inputs` (Forms & inputs) | `c-forms-inputs-field`, `-password` |
| `c-web-otp` OTP slots | `c-forms-otp` (Forms & inputs) | `c-forms-otp-slots` |
| `c-web-inputs` (checkbox) | `c-selection-checkbox` (Selection controls) | `c-selection-checkbox-keep-signed-in` |
| `c-web-timer` Timer / resend | `c-feedback-timer` (Feedback) | `c-feedback-timer-row` |
| `c-web-states` States | `c-feedback-states` (Feedback) | `c-feedback-states-card` |
| `c-app-toast` Toasts | `c-feedback-toast` (Feedback) | `c-feedback-toast-default-danger` |
| `c-app-confirm` Confirm dialog | `c-overlays-confirm` (Overlays) | `c-overlays-confirm-dialog` |
| `c-web-card` Backdrop & card | `c-patterns-web-card` (Platform patterns) | `c-patterns-web-card-backdrop` |
| `c-web-logo` Logo | `c-patterns-web-logo` | `c-patterns-web-logo-header` |
| `c-app-frame` Phone frame & status bar | `c-patterns-phone-frame` | `c-patterns-phone-frame-status-bar` |
| `c-app-launch` Launch | `c-patterns-launch` | `c-patterns-launch-splash` |
| `c-app-faceid` Face ID card | `c-patterns-faceid` | `-overlay` (Extended, Documented dependency), `-passcode-pill` |
| `c-app-home` Home & session cards | `c-patterns-home` | `-screen`, `-session-row`, `-current-device` |
| `c-app-push` Push banner | `c-patterns-push` | `c-patterns-push-banner` |
| `c-app-sheet` Bottom sheet & OTP code | `c-patterns-sheet` | `-bottom-sheet`, `-code-card` |
| `c-app-pw` Password fallback | `c-patterns-password` | `-screen`, `-input`, `-button` |

The old cards had no ids; the ids above are new (`<section id>-<name>`).

### Screens (one nav item per flow, `figure.sk-screen` + `sk-frame`)

| Old | New | Frames |
|---|---|---|
| `s-web` | `s-web` | `s-web-login` 472x593, `s-web-otp` 472x583, `s-web-success` 472x287 (real heights measured in the old page: 592.5 / 582 / 286.4) |
| `s-app` | `s-app` | 10 screens `s-app-launch`, `-faceid`, `-home`, `-push`, `-sheet`, `-confirmed`, `-active`, `-signout-confirm`, `-signed-out-toast`, `-password`, each 390x844 |

### Reference

| Old | New |
|---|---|
| `bugs` | `r-decisions`: 27 source bugs (W1-W14, A1-A11, X1-X2) + 7 migration rows M1-M7; the "Extended (not in the prototypes)" CSS table (id `r-extended-css`) and the "old docs that drifted" list stay here |
| `dead` | `r-dead-code` (web + authenticator tables unchanged) |
| (new) | `r-extended-index`: 11 Extended rows generated from the page, linked to their card; then 5 Documented-dependency rows listed separately |
| `open` | `r-open-decisions`: the 11 old questions + 3 from this migration |

## 3. Verification (headless Chrome 1440 wide, `npx serve`, clean URL)

1. **Computed styles (kit `SKSnap`).** Baseline from the old page (roots: every demo wrapper, mask icons, logo glyphs, gallery images; 3,516 elements) vs the new page (kit default roots, 3,517 elements). Both snapshots taken with animations paused at t=0 (otherwise spinner / pop-in / dot-pulse / blur fade are caught mid-flight) and compared as multisets per element key, because the plain index-wise `SKSnap.diff` pairs the i-th element of identical markup and the section regrouping reorders elements that sit in different states (186 spurious pairs, all vanish when compared as multisets). Result: **onlyBefore 0; onlyAfter 1; changed 27, all explained**:
   - onlyAfter `div.undefined` x1: the demo wrapper `class="undefined"` of the 375px iframe demo now sits inside `.sk-demo` (it was the excluded root in the old snapshot); no style.
   - 23 gallery `img` and 4 logo-tile glyphs: only inherited properties from the old chrome containers differ (table cell: `font-size` 13px -> 16px, `border-collapse` collapse -> separate, border-spacing 2px -> 0; logo tile label `font-size` 11px -> 16px). Same markup and own styles.
   - Every element in the 104 demos (components and screens): identical.
2. **Kit and runtime.** `SK.problems` = `[]`. Console: 0 errors, 0 warnings (the old page logged a favicon 404; the 33 Chrome "verbose" notices "Password field is not contained in a form" come from the demo password inputs, as before). Network: 71 requests, 0 non-200; all 23 asset files 200; images rendered 47 = old 47. All 32 nav items open exactly one non-empty section; 15/15 deep links resolve (section, card id, screen id, old ids `#c-web-inputs`, `#f-colors`, `#f-type`, `#bugs`, `#dead`, `#open`, `#c-app-pw`, `#r-extended-css`); `…/showcase?all` and `?all#s-app-sheet` work under `npx serve` (32 sections visible, target scrolled to top); search, Home / End / Arrow keys, prev/next, Fit / 100% toggle, lazy frames (frames 3-8 of `s-app` empty until scrolled), password toggle, motion replay work; a stored `sk-theme=dark` does not leak in (`data-sk-theme` stays `light`). Frame check: 13/13 scaled heights equal h x scale.
3. **Copy HTML (clipboard permission granted via CDP `Browser.grantPermissions`).** 100/100 per-state buttons write exactly the old source (Windows clipboard turns LF into CRLF; compared after normalising) and show `Copied ✓`; 26/26 card buttons write the card template (`Copied ✓`); labels return to "Copy HTML" after 1.8 s; with the Clipboard API and `execCommand` forced to fail, both button kinds show `Copy failed` (kit adds its selectable fallback textarea). This is the first confirmed Copy-success run for this page.
4. **Counts old -> new.**

| | old | new |
|---|---|---|
| sections (excluding overview) | 29 | 31 (+1 checkbox split, +1 Extended index) |
| component blocks | 28 (26 + 2 screens blocks) | 26 cards + 13 screens |
| demos with Copy HTML | 104 | 104 sources: 91 variants + 13 screens (26 card buttons + 100 per-state buttons) |
| Extended badges | 12 (11 + 1 in the intro sentence) | 11 (kit chip) |
| Documented-dependency badges | 6 (5 + intro) | 5 (+1 in the legend) |
| Decided behaviour / Recipe / synthetic-bold flags | 8 / 1 / 6 | 8 / 1 / 6 |
| `<img>` rendered / distinct asset files | 47 / 23 | 47 / 23 (chip "23 assets") |
| source lines | 39 `sc-srcline` | 37 `sk-card__src` + 13 `sk-screen__src` (the 2 screens' lines repeat per screen) |
| swatches / type rows / radii / shadows / spacing / motion / mask icons / logos / files | 48 / 60 / 9 / 9 / 15 / 6 / 13 / 4 / 23 | same |
| decision rows | 27 | 27 + 7 migration rows |

   Text check: 1,490 old text items (headings, source lines, meta, labels, notes, swatch fields, table cells, list items) searched in the new page: 13 not found as such, all restructured on purpose (split Inputs title, 4 renamed table headers, 8 z-index rows now table cells).
5. **Screenshots** (headless Chrome, 1440x900; scratchpad `eauthmig/shots/`): Overview, Colours, Typography, Icons, Buttons card, Backdrop & card, Face ID, Inputs, Bottom sheet, Web sign-in flow, Authenticator flow, Known inconsistencies, Extended index. Viewed; no layout defects.
6. **Size.** `showcase.html` 746,436 B (old 686,379 B). Tallest section at 1440 px: `s-app` 9,333 px (then `f-typography` 7,806, `f-colours` 4,728, `c-patterns-sheet` 3,361); every section is below the 15,000 px guideline. Full `?all` page: about 66.7k px.

## 4. Deviations from the kit rules (and why)

1. **Per-state Copy HTML.** The kit has one Copy HTML per card; the old page had one per state (104). The card button (kit, `<template data-sk-source>`) copies all states of the card joined by a blank line. Cards with several states and every screen also have a per-state button (`data-eauth-copy`, platform script, source in `<script type="text/plain" data-eauth-source="v-N">`, N = old figure number). Decision M4.
2. **Copy fidelity of the card button (M6).** The kit reads `template.innerHTML`, which serialises `checked` / `disabled` as `checked=""` / `disabled=""` (9 cards, 18 of the 104 sources differ from the source text only by that). Per-state buttons are byte exact. Listed as open decision.
3. **Checkbox moved** from Inputs to Selection controls (role grouping); section count 29 -> 31 (M7). The h2 of the Inputs section was shortened accordingly.
4. **Showcase-only wrappers kept** (`sc-*` classes, M1), including the old `<div class="undefined">` slip (M2); no demo markup was changed.
5. **Screens**: the phone wrapper `.sc-phone` gets the modifier `.sc-phone--bare` (no 24 px margin) so the frame is exactly 390x844; component-card phone demos keep the old 438x892 wrapper inside `.sk-stage` (not framed).
6. **Code view removed** (M5); the old stat "9 Extended badges" dropped from the intro (it was stale, 11 present; M3).
7. **Derived values**: swatch names (token without the `--eauth-` prefix, capitalised), Status column, accent / badge colours (`color-mix`), Overview text.
8. Not present in this platform: Alt and Outside-canonical badges (legend only), Selection / Navigation / Data / Extended-states groups (omitted, no items).
9. `CLAUDE.md` and `components.md` still quote the old page structure ("29 sections, 28 components, 104 demos"); the owner updates them.

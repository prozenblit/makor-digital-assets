# Design-system rebuild: where things stand and what is left (2026-10-15)

## Done
Seven design systems rebuilt from their sources and verified numerically (computed styles / bounding boxes vs the Figma or HTML source). Details per system are in `<platform>/figma-spec/VERIFICATION.md` (or `html-spec/`, `auth-html-spec/`).

| System | Source | Folder | Showcase |
|---|---|---|---|
| OG Risk Arb | Figma "Section 1" | `og-risk-arb/` | `design-system/showcase.html` (on kit) |
| Equity Derivatives | Figma "Section2" | `equity-derivatives/` | `design-system/showcase.html` (on kit) |
| FX Engine Room | Figma "Section 3" | `fx-engine-room/` | `design-system/showcase.html` (on kit) |
| Enigma X trading app | Figma page "final" | `enigma-x/design-system/` | `showcase.html` (built on kit) |
| MakorX.AI HR app | `makor-hr/employees.html` | `makorx-ai/design-system/` | `showcase.html` (on kit; migration notes in `html-spec/SHOWCASE-MIGRATION.md`) |
| Makor auth | `hub/auth/makor-*.html` | `makorx-ai/auth-design-system/` | `showcase.html` (on kit) |
| Enigma X auth | `hub/auth/enigma-*.html` | `enigma-x/auth-design-system/` | `showcase.html` (on kit) |

Shared pieces: `audit/BUILD_RULES.md` (the rules every rebuild followed), `shared/showcase-kit/` (common showcase chrome, structure, migration guide), `audit/<platform>.md` (the original audit that found the old systems wrong). Reusable agent kit for future projects lives in `~/.claude/agents/` and `~/.claude/design-system-kit/`.

## Not done (known, deliberate)
1. **Kit patch.** The kit was not patched after the migrations reported these gaps (each showcase works around them with small page scripts or support CSS):
   - Copy HTML per state on multi-state cards, and for `.sk-screen` frames.
   - Card-level copy writes `checked=""` / `disabled=""` instead of the source's bare attributes (fidelity gap; per-state buttons are exact).
   - No Fit/100% toggle for a frame inside a component card (only for `.sk-screen`).
   - Nav search cannot open collapsed groups when a platform CSS sets `[hidden]{display:none!important}` (OG).
   - Badge wording: OG keeps "Alternate"/"Outside Section 1" instead of the kit's "Alt"/"Outside canonical"; no kit badge for "Source-defined".
   - No per-stage background modifier; `width:100%` components need an inline width in a variant; `.sk-demo` flex context needed by Equity demos.
   - MakorX.AI showcase: no scroll margin on `.sk-screen` and no frame-width option in the kit (worked around in the page); 14 card-level Copy HTML outputs differ from source only by `disabled=""` serialisation.
   - The hub design-system viewer (`hub/ds-viewer.html`) can only show a platform's main tokens, not the auth systems' tokens.
2. **Nothing is committed or pushed.** `git status` is dirty across the repo. NOTE: the MakorX.AI and Makor auth design systems now live in `makorx-ai/` (moved out of `makor-hr/` on 2026-10-22) and are part of this repo. The HR app itself (`makor-hr/`) is a separate project with its own repo and stays ignored here. Showcases were removed from the hub (see `archive/showcases/`).
3. Deploy (Vercel) was deferred by the owner earlier.

## Decisions that are the owner's
**MakorX.AI app** (`makorx-ai/html-spec/build-notes.md`, 42 source-bug rows):
- 3 dark-mode values were guessed because the app has none: switch track, calendar out-of-period text, `dir-flash` tint.
- Scrollbar colours not measured; dark overlay/shadow gaps kept as rendered.
- Confirm that the "Details" column in "My requests" and the New Request textarea are meant to differ from the app.
- Fix the original HTML bugs when convenient (phone-code colour leaking into light mode, inactive dept badges in dark, missing dark overrides, native `alert()` validation, 0px Employee column below ~2200px, select/datepicker-in-modal overflow).

**Makor auth** (`makorx-ai/auth-html-spec/`): footer overlaps the card on short viewports; white-on-teal contrast failures; no eye-off icon in the app; "Forgot password?" and post-login redirect targets (`makor-dashboard.html` 404s); copy for empty-password and clipboard-failure messages; Face ID failure/retry design; Lottie byte size.

**Enigma X auth** (`enigma-x/auth-html-spec/`): the same copy/target/Face-ID questions, no eye-off asset, DM Sans/DM Mono vs the trading app's Geist/Geist Mono (decided: keep DM Sans for auth), DM Mono 600 is a synthetic bold (reproduced, flagged).

**Enigma X trading app** (`enigma-x/figma-spec/build-notes.md`): the three unnamed "Variant2" component states were treated as hover; spread frame sizing (392x32 vs the 40-high wrapper); orange dark-theme refresh/filter icons not mapped; dark theme is sampled from a raster capture (13 values derived by documented rules); Status column and stale-ticker "!" badge were left out by decision.

**FX Engine Room** (`fx-engine-room/figma-spec/build-notes.md`): 5 glyphs not exported from Figma (Blotters status, Prices toggle, 3 context-menu glyphs); requires `text-box: trim-both` (Chrome 133+/Safari 18.2+); some sample copy in the showcase is illustrative.

**OG Risk Arb**: "changes for Laura" shell and Admin Internal are outside Section 1 (Laura shell not built; Admin Internal patterns included and labelled); Deal Edit Events, New Deal Expanded and Admin Internal are not rebuilt as full screens; Figma's own inconsistencies are kept as drawn and listed (card radius 12 vs 8, label grey #7C8DAC vs #A8B6CD, table header Medium 10 vs SemiBold 12, ...).

**Equity Derivatives**: "LOGGED IN AS" label left out (owner decision); no pixel-diff against Figma screenshots, only numeric checks.

## Verification limits (all systems)
Hug widths of text-sized elements differ from Figma by about 0.1 to 5 px (browser font metrics). Hover/focus states are measured via forced classes (real :hover can't be triggered from script) except where noted. Animations were checked by declared name/duration/easing, not live playback. The Face ID Lottie is documented only (placeholder).

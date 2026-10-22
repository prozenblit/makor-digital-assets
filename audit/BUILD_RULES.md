# Design-system rebuild rules (apply to every platform)

Applies to OG Risk Arb, Equity Derivatives, FX Engine Room (source = Figma harvest) and MakorX.AI (source = the existing HTML we built).

## 0. Why
The hub's purpose: let an AI agent rebuild a platform's UI faithfully from `tokens.*`, `components.*`, `CLAUDE.md` and the showcase. The previous systems were wrong (audit/*.md). The owner's rule: **values that exist in the source are reproduced PRECISELY; where the source is silent we EXTEND, and every extension is clearly marked.**

## 1. Sources and their priority
1. `<platform>/figma-spec/*.md` — harvested ground truth with Figma node ids. (MakorX.AI: its own HTML/CSS.)
2. `<platform>/design-system/assets/` (SVG icons/logos + `MANIFEST.md`).
3. Nothing else. The OLD files in `<platform>/design-system/` (`tokens.json`, `tokens.css`, `components.css`, `components.md`, `CLAUDE.md`, `showcase.html`) are WRONG for the Figma platforms — do not reuse their values. You may read the old `showcase.html` only to see how the hub-style showcase page is structured.

## 2. Precision
- Copy values exactly: hex, opacity, px, letter-spacing, line-height, border weights. No rounding, no "cleaning", no merging of near-equal values (e.g. two slightly different greens stay two values; note it).
- Start every CSS rule block with `/* figma: <node id(s)> */` naming where the numbers came from.
- If the spec says "(visual estimate)", reproduce it and keep the comment `/* visual estimate */`.
- When the spec lists conflicting versions (duplicate frames, older vs newer, inconsistent screens): use the version the spec marks canonical / the Section the owner designated / the most frequent one; keep the alternative value as a documented alternate (CSS custom property or modifier class named `--alt-…`) and list the conflict in "Known Figma inconsistencies" (CLAUDE.md + showcase). Never silently pick.
- Font weights: use only the weights/styles Figma uses. (Lato = Regular only; do not synthesise bold in Figma-defined components.)

## 3. Extending (where the source is silent)
Needed for a usable system: hover/focus/active/disabled/error states not drawn, missing components (toast, tooltip, textarea, dropdown menu, etc.), missing responsive details.
- Derive only from EXISTING tokens/patterns of that platform (e.g. a focus ring = the brand border colour at the same radius; hover = the platform's own hover recipe such as "white overlay @0.2"). No new hues, fonts or radii.
- Mark in CSS: `/* EXTENDED — not in Figma: <derivation> */`. Mark in the showcase with a visible "Extended" badge. List all extensions in a table in `components.md` (name | what | derivation).
- Keep extensions visually modest and consistent with neighbouring Figma-defined components.

## 4. Naming and tokens
- `tokens.json` schema must stay compatible with the hub's design-system viewer (`hub/ds-viewer.html`):
  `{ "color": { "<group>": { "<token>": { "value": "#hex or rgba()", "comment": "role / source node ids" } } }, "font": { "primary": {"value": "'Family', fallbacks"}, "mono": {"value": "..."} }, "fontSize": { "<key>": {"value":"12px","comment":""} }, "spacing": { "<key>": {"value":"8px"} }, "borderRadius": { "<key>": {"value":"4px","comment":""} } }` plus optional groups (`fontWeight`, `lineHeight`, `letterSpacing`, `controlHeight`, `shadow`, `border`, `duration`, `easing`, `zIndex`, `breakpoints`…) in the same `{value, comment}` shape. Spacing = the OBSERVED padding/gap values used in Figma (say so in comments) — Figma defines no spacing tokens.
- Where Figma has names (variables, styles like "Grey 1", "dark green main", "bg lighter"), keep them: CSS vars `--color-<figma-name-kebab>` and in tokens.json group `figma` (exact Figma name → value). Add semantic aliases (`--color-text-primary: var(--color-…)`) in separate groups (`text`, `surface`, `border`, `brand`, `status`, …) so agents can pick by role.
- `tokens.css`: `:root { … }` custom properties for everything in tokens.json (+ `--font-primary`, type-scale vars, radii, control heights, shadows, durations if defined).
- Fonts: the platform's real font (Geist / Lato / Nunito…). Showcase loads it via Google Fonts `<link>`; `components.css` uses `var(--font-primary)`.

## 5. Components CSS
- One file `components.css` (all components and patterns), using only `var(--…)` tokens — no raw hex in rules (exception: if the spec lists an unbound raw colour with no token, create a token for it named after its role and note "raw in Figma").
- Class names follow Figma component names (`.btn`, `.btn-outline-green`, `.input`, `.select`, `.search`, …). States: real pseudo-classes plus forced classes `.is-hover`, `.is-focus`, `.is-disabled`, `.is-active` so the showcase can display them.
- Icons: use files from `assets/`. Monochrome icons: `.icon { width/height; background-color: currentColor; mask: url(assets/<name>.currentColor.svg) center / contain no-repeat; }` (add `-webkit-mask` too). Coloured/gradient assets (logos): `<img src="assets/…svg">`. Never redraw or hand-write icon paths.
- Sizes: fixed heights/widths exactly as in Figma; respect hug vs fixed vs fill sizing (note it).

## 6. Showcase (`showcase.html`)
Single static page, relative links to `tokens.css`, `components.css`, `assets/`; no frameworks; sidebar nav + sections (hub style, but styled with the platform's own tokens). Required:
- Foundations: named colour palette (Figma name + hex + role), type scale (every real tuple), radii, observed spacing, shadows/effects, icon gallery (every exported asset with file name).
- Every Figma component and pattern: title, a "Figma: node ids" line, all variants and states drawn in Figma (forced state classes), "Extended" badge where applicable, Copy-HTML button.
- Screens: at least the platform's primary screen(s) re-assembled from the components at the Figma frame size (scaled to fit) to prove fidelity.
- A "Known Figma inconsistencies & decisions" section.
- A top bar note: "Source: Figma <file> · Section <name> · harvested <date>".

## 7. components.md
Copy-paste HTML for every component/pattern + behaviour notes (JS where needed), plus the Extended table.

## 8. CLAUDE.md (agent brief)
Sections: What the platform is · Source of truth (file key, section node ids, decisions made by the owner) · Non-negotiables (only facts proven by the spec) · Tokens (named + semantic, hex) · Typography · Spacing/controls · Components (key rules; mark each `Figma-defined` or `EXTENDED`) · Layout/shell geometry · Icons · Known Figma inconsistencies · What NOT to do. No claim without a spec source.

## 9. Verification (before finishing a stage)
Load the showcase in the browser pane (own tab via tabs_create, never tab "seed"; server `http://localhost:3456/<platform>/design-system/showcase.html`; if down, `npx serve . --listen 3456` from the project root in the background) and read computed styles with javascript_tool. Compare ≥ 40 key properties (font-family/size/weight, height, radius, bg, colour, border, padding, icon size/colour) against spec values; fix every mismatch; report remaining ones honestly. Screenshots for the final check.

## 10. Hygiene
Only write inside `<platform>/design-system/` (and your own stage notes). Do not touch other platforms, the hub files, `projects.js`, or git. Keep filenames: `tokens.json`, `tokens.css`, `components.css`, `components.md`, `CLAUDE.md`, `showcase.html`, `assets/`.

## 11. HTML-source variant (MakorX.AI app, Makor auth, Enigma X auth)
When the source of truth is built HTML (no Figma): specs live in `<platform>/html-spec/*.md` (app) or `<platform>/auth-html-spec/*.md` (auth); assets in `<platform>/<design-system dir>/assets/` with `MANIFEST*.md`.
- Instead of `/* figma: <node ids> */` start every rule block with `/* src: <file> L<line(s)> */` (add `computed` when the number came from a browser measurement). The precision, EXTENDED, token-naming, mask-icon and verification rules above apply unchanged. "Figma: node ids" lines in the showcase become "Source: file + lines".
- Effective values win: the spec records the cascade result (what the browser renders), not every duplicate/dead rule.
- Owner decision on source bugs (2026-10-14): **DOCUMENT, DON'T REPRODUCE.** Reproduce everything the user actually sees and designed (rendered colours, sizes, spacing, type, motion). Do NOT build into components: dead CSS/markup with no visual effect, invalid CSS, broken behaviour (dead buttons, wrong copy such as a timer reading "Code expires in Expired", wrong selectors, focus styles that silently change radius, unreachable states, leaked rules such as a dark-mode value showing in light mode). Each is listed in a "Known source bugs" section (CLAUDE.md, showcase, `figma-spec`-equivalent `build-notes.md`) with file + line and the chosen intended behaviour, so the original HTML can be fixed later. When unsure whether something is a bug or a design, keep what renders and flag it.
- External runtime dependencies (e.g. a remote Lottie animation) are DOCUMENTED (URL, size, duration, states, card colours), not copied; the showcase shows a clearly labelled placeholder, never a hand-drawn imitation.
- Themes: if the source ships light and dark as separate files, the design system is ONE system: light tokens on `:root`, dark pairs on a `[data-theme="dark"]` (or `.theme-dark`) scope, and the showcase displays both side by side.
- Cross-system differences (e.g. two platforms using different fonts for similar screens) are recorded as notes, not unified, unless the owner decides otherwise. Owner decision: Enigma X auth keeps DM Sans / DM Mono (the prototypes are the truth for auth).

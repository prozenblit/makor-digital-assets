# Migrating an existing showcase to the kit

Goal: same content, same demos, new shared chrome and structure (`STRUCTURE.md`). The demos themselves are **never edited**: if a computed style inside a stage changes, the migration is wrong.

Applies to: `og-risk-arb`, `equity-derivatives`, `fx-engine-room`, `makor-hr` (app + auth), `enigma-x` (auth + trading), and every future platform.

## 0. Before touching anything

1. Open the current showcase in a browser tab (use `http://localhost:3456/<platform>/design-system/showcase.html`; start `npx serve . --listen 3456` from the project root if it is down).
2. Record the baseline: `SK`-independent counts and the style snapshot.
   ```js
   // paste style-snapshot.js (or: eval(await (await fetch('/shared/showcase-kit/style-snapshot.js')).text()))
   // then, with the OLD page's demo containers:
   SKSnap.save('before', { roots: '.sc-stage, .sc-fit__in, .sc-fit-s__in' })   // adjust to the old chrome's demo containers
   ({ cards: document.querySelectorAll('.sc-card, .sc-spec').length,
      ext:   document.querySelectorAll('[class*="ext"]').length,
      imgs:  document.images.length, svgUse: document.querySelectorAll('use').length })
   ```
   Write the counts down (cards, variants, Extended badges, screens, assets, sections). The snapshot lives in `sessionStorage`, so it survives reloads **in the same tab and origin**.
3. Save a copy of the old file as `showcase.old.html` next to it while you work (delete before finishing).

## 1. Head: load the kit, map tokens (the only CSS you write)

Keep the platform's `tokens.css`, `components.css`, fonts. Delete the old chrome rules (`.sc-top`, `.sc-nav`, `.sc-main`, `.sc-card…`, `.sc-hero`, `.sc-sw…`, `.sc-tbl`, `.sc-fit…`, …) — keep only rules that style something **inside a demo** (there should be none; if some exist they are demo support and move to a `/* demo support */` block, flagged in `r-decisions`).

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components.css">
<link rel="stylesheet" href="../../shared/showcase-kit/showcase-kit.css">
<style>
body { margin: 0; }                      /* the kit sets no global resets; the platform's components.css usually already does */
.sk-app {                                /* map on .sk-app, NOT :root: a body.dark / [data-theme] switch must reach the mapping */
  --sk-bg: var(--color-surface-page);        --sk-surface: var(--color-surface-default);  --sk-surface-2: var(--color-surface-subtle);
  --sk-border: var(--color-border-default);  --sk-text: var(--color-text-primary);       --sk-text-muted: var(--color-text-secondary);
  --sk-accent: var(--color-brand-primary);   --sk-accent-text: var(--color-on-brand);    --sk-code-bg: var(--color-surface-subtle);
  --sk-badge-extended: var(--color-orange);  --sk-badge-alt: var(--color-text-secondary);
  --sk-badge-documented: var(--color-teal);  --sk-badge-outside: var(--color-blue);
  --sk-font: var(--font-family);             --sk-mono-font: ui-monospace, Consolas, monospace;
  --sk-radius: var(--radius-8);              --sk-stage-bg: var(--color-surface-page);     /* what demos sit on */
}
</style>
```

Variable reference (all optional; defaults are neutral grey + one blue accent):

| Variable | Used for |
|---|---|
| `--sk-bg` · `--sk-surface` · `--sk-surface-2` · `--sk-border` | page, cards/nav/top bar, tinted fills (table heads, search), hairlines |
| `--sk-text` · `--sk-text-muted` | chrome text |
| `--sk-accent` · `--sk-accent-text` | active nav item, toggles, links, focus ring (`--sk-focus` overrides the ring only) |
| `--sk-code-bg` | inline code, code blocks |
| `--sk-badge-extended/-alt/-documented/-outside` | badge colours (fill and outline are derived with `color-mix`) |
| `--sk-info` `--sk-warn` `--sk-ok` `--sk-bad` | callouts, status, copy feedback |
| `--sk-radius` · `--sk-shadow` | card radius and elevation |
| `--sk-font` · `--sk-mono-font` | chrome fonts (the platform's own font; keep its Google Fonts `<link>`) |
| `--sk-nav-w` · `--sk-topbar-h` | geometry (defaults 264 px / 56 px) |
| `--sk-stage-bg` | background behind demos (default `--sk-surface`) — set it to the colour the platform's screens normally sit on |

Dark platforms (Enigma X trading, FX…) and light platforms use the same mapping; pick the platform tokens that play the same role. Do not copy a platform's colours into the kit CSS.

## 2. Body: replace the chrome

Top bar (logo slot · title · source · theme toggle · search):

```html
<div class="sk-app">
<header class="sk-top">
  <span class="sk-top__logo"><img src="assets/logo.svg" alt="Makor"></span>
  <span class="sk-top__title">OG Risk Arb design system</span>
  <span class="sk-top__src">Source: Figma OG Risk Arb · Section 1 · harvested 2026-10-14</span>
  <div class="sk-top__actions">
    <input class="sk-search" type="search" data-sk-search placeholder="Search sections ( / )" aria-label="Search sections">
    <!-- only for platforms with a runtime theme: -->
    <button class="sk-btn" type="button" data-sk-theme-toggle aria-pressed="false">Dark mode</button>
  </div>
</header>
<div class="sk-shell">
  <nav class="sk-nav" data-sk-nav aria-label="Sections"></nav>
  <main class="sk-main"> …sections… </main>
</div>
</div>
<script src="../../shared/showcase-kit/showcase-kit.js"></script>
<!-- platform scripts (demo interactivity) AFTER the kit -->
```

Delete the old hand-written `<nav>`, its scroll-spy/active-class code, the old copy/fit handlers, `html { scroll-behavior: smooth }` (the kit scrolls instantly) and the page-level `hero` (its text moves into `#overview`). **Keep** the platform's demo scripts (tabs, toggles, password reveal, calendars…).

Theme toggle hooks (platform owns its theme; the kit only calls back, remembers the choice in `localStorage['sk-theme']` and re-applies it on load):

```js
// body.dark systems (MakorX.AI HR app) — keep the app's own storage key if other pages share it
SK.onThemeToggle(function (dark) { document.body.classList.toggle('dark', dark); localStorage.setItem('makor-dm', dark ? '1' : '0'); });
// [data-theme="dark"] systems (auth)
SK.onThemeToggle(function (dark) { document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light'); });
// manual call from a platform control: SK.setTheme('dark')
```
Remove the old switch (`.sc-dm`, `.dm-switch`). Auth showcases that show light and dark **side by side** keep their per-demo `[data-theme]` scopes unchanged; the global toggle only themes the page chrome (and any demo that follows the page theme).

## 3. Map existing sections into the canonical nav

**Foundations — always these 8 ids; platform extras become `h3.sk-h3` inside:**

| Old section (examples) | New |
|---|---|
| Colour palette · Colours · Colours (light \| dark pairs) · Figma variables (39) · Raw colours · Semantic aliases · Input-fill rule · Pill colour map | `f-colours` (each old section = an `h3.sk-h3` block) |
| Type scale · Typography | `f-typography` |
| Radii | `f-radii` |
| Spacing (observed) | `f-spacing` |
| Shadows, blur, strokes · Shadows and blur · Shadows & effects · Effects & strokes | `f-shadows` |
| Motion (durations / easings / keyframes) | `f-motion` (platforms without any: `Not defined in the source.`) |
| Grid geometry · Control heights · Shell geometry · Sizes & layout (z-index, nav, gutters…) | `f-sizes` |
| Icon gallery · Logos · Icons · Icons, logos, flags · Icons & logos | `f-icons` |

**Components — by role.** Typical assignment: Buttons → `c-actions-*` · Fields, Text input, Search, Date, Time, Dropdown field, OTP → `c-forms-*` · Check, Radio, Toggle, Segmented → `c-selection-*` · Chips & tags, pills, status → `c-indicators-*` · Toast, tooltip, banner, progress → `c-feedback-*` · Modals, open menus, popovers → `c-overlays-*` · Tabs, sidebar/nav, anchor menu, pagination → `c-navigation-*` · Tables, lists, cards → `c-data-*` · Shell, Auth, Entities, Widgets, Blotter, Deal terms, Calendar-style composites → `c-patterns-*` · cross-family extra states → `c-extended-*`. One old card stays one `.sk-card` (keep its `id`); old "groups" (Equity's 5 sub-groups, HR's 12 groups, FX's flat list, auth's by-app groups) are regrouped into the roles above — **by-app** auth groups (Web sign-in / Authenticator) become the `patterns` group, with one nav item per sub-flow. Several cards of one family go into **one** section (one nav item).

**Screens** → one `s-*` section per screen/flow. **Old "Decisions", "Decisions & notes", "Reference", "Known … inconsistencies"** → `r-decisions`; dead-code / dropped / invented lists → `r-dead-code`; the list of Extended badges → `r-extended-index` (generate it from the page; one row per badge); owner questions → `r-open-decisions`.

If other documents link to old section ids (`#f-colors`…), keep them alive with an empty anchor inside the new section: `<a id="f-colors"></a>` — the kit resolves any id inside a section.

## 4. Markup recipes

Section wrapper (every section):

```html
<section class="sk-section" id="c-actions-buttons" data-sk-title="Buttons">
  <header class="sk-section__head"><h2 class="sk-section__title">Buttons</h2><p class="sk-section__lead">One sentence, optional.</p></header>
  …blocks…
</section>
```

Component card — see `STRUCTURE.md §6` (old `sc-card__head h3` → `sk-card__title`; old "Figma: set 766:3215" → `p.sk-card__src`; each old variant `figure > .demo + figcaption` → `figure.sk-variant > .sk-demo + figcaption.sk-variant__cap`; the old note paragraph → `.sk-card__notes`). If an old demo wrapper has styles (not just a hook), keep that wrapper inside `.sk-demo` rather than deleting it.

Colour swatch:
```html
<div class="sk-swatches"><figure class="sk-swatch"><div class="sk-swatch__chip" style="--sk-chip: var(--color-brand-primary)"></div>
<figcaption class="sk-swatch__meta"><span class="sk-swatch__name">Brand primary</span><code class="sk-swatch__token">--color-brand-primary</code><span class="sk-swatch__value">#005268</span><span class="sk-swatch__role">Primary action fill</span><span class="sk-swatch__src">Source: node 12:3</span></figcaption></figure></div>
```
Type specimen row:
```html
<div class="sk-type"><div class="sk-type__row"><div class="sk-type__meta"><span class="sk-type__use">Heading 24</span><span class="sk-type__tuple">Geist · 24px · 500 · 1.2 · normal · #26395E</span><span>Source: node 3:1</span></div>
<div class="sk-type__sample" style="font: var(--type-medium-24)">The quick brown fox</div></div></div>
```
Token table: `<div class="sk-table-wrap"><table class="sk-table sk-table--compact"><thead><tr><th>Token</th><th>Value</th><th>Used for</th></tr></thead><tbody>…</tbody></table></div>`.
Radius / shadow / spacing sample: `<div class="sk-samples"><figure class="sk-sample"><div class="sk-sample__bed"><div class="sk-sample__box" style="border-radius: var(--radius-8)"></div></div><figcaption class="sk-sample__label"><code>--radius-8</code><span>8px · cards</span></figcaption></figure></div>`.
Icon gallery: `<div class="sk-icons"><figure class="sk-icon"><div class="sk-icon__sample"><i class="icon icon-search"></i></div><figcaption class="sk-icon__meta"><span class="sk-icon__name">search.currentColor.svg</span><span>currentColor</span></figcaption></figure></div>`.
Screen: see `STRUCTURE.md §8`; wrap the old frame content in `<template>`; give `data-sk-w/h` from the old `data-w`/aspect-ratio values.
Decision table: `table.sk-table.sk-table--decisions` with `# · Source · What · Chosen behaviour · Status`. Callout: `<div class="sk-callout sk-callout--warn"><p>…</p></div>`. Badges: `Extended`, `Alt`, `Documented dependency`, `Outside canonical` (`sk-badge sk-badge--*`).

Old chrome-class → kit-class quick map: `sc-top`→`sk-top`, `sc-nav*`→(generated), `sc-main`→`sk-main`, `sc-hero`→`#overview`, `sc-section`→`sk-section`, `sc-section > h2`→`sk-section__title`, `sc-card`/`sc-spec`→`sk-card`, `sc-card__head`→`sk-card__head`, `sc-fig`/"Figma: …"→`sk-card__src`, `sc-copy`→`sk-btn` + `data-sk-copy`, `sc-stage`→`sk-stage`, `sc-variants`/`sc-row`→`sk-variants`, `sc-v`/`sc-variant`→`sk-variant`, `sc-v__demo`→`sk-demo`, `sc-ext`/`sc-badge--ext`→`sk-badge sk-badge--extended`, `sc-alt`→`sk-badge--alt`, `sc-outside`→`sk-badge--outside`, `sc-sw*`→`sk-swatch*`, `sc-tbl`/`sc-table`→`sk-table`, `sc-fit`/`sc-frame`→`sk-frame`, `sc-screen`→`sk-screen`, `sc-id`→`sk-id`, `sc-note`→`sk-card__notes`, `sc-intro`→`sk-section__lead` / `sk-prose`.

## 5. What must NOT change

* Every demo's markup, classes, attributes, inline styles, states (forced `.is-*` classes), text and order.
* Every source line (node ids / file+line), every **Extended / Alt / Outside** badge and its wording, every note, every decision row, every verification result, every asset reference and asset count.
* Card ids; the platform's `tokens.css`, `components.css`, `assets/`, `components.md`, `CLAUDE.md`, `tokens.json` (only `showcase.html` changes — plus, if the platform wants the nav counts stated, `CLAUDE.md` is updated by the owner, not here).
* No demo may be re-drawn, re-sized or "tidied". If a demo needs a wrapper to scale, use `.sk-frame`, not CSS on the demo.

## 6. Very large sections

Only the active section is rendered, so page height is no longer the problem; per-section weight is. Guidelines: split a section when it exceeds roughly 40 cards or 150 KB of markup (one nav item per component family keeps this natural); put every full-size screen or heavy composite inside `<template>` in a `.sk-frame` (renders on demand and stays out of the DOM until visible); keep large icon galleries as one section but let the grid wrap. Platform demo scripts that measure elements (fit, truncation, charts) must not run while the section is hidden (`display: none` gives 0 width): run them on `document.addEventListener('sk:route', …)` and `frame.addEventListener('sk:frame', …)`; delete any old resize/fit code the kit replaces.

## 7. Checklist

- [ ] Only `showcase.html` changed; `showcase.old.html` removed.
- [ ] Head: platform CSS first, kit CSS after; `.sk-app` token mapping present; no leftover `.sc-*` chrome rules.
- [ ] Top bar has logo, title, `Source: … · harvested <ISO date>`, search (and theme toggle if the platform has a theme).
- [ ] `#overview` with lead, `data-sk-counts` chips, four-badge legend.
- [ ] All 8 Foundations ids present (empty ones say "Not defined in the source."); extras are sub-headings.
- [ ] Components grouped by role in canonical order; ids `c-<group>-<name>`; each card: title+badges, Source line, stage with captions, Copy HTML, notes, alternates.
- [ ] One nav item per screen; frames have `data-sk-w/h`, content in `<template>`.
- [ ] All 4 Reference sections present; Extended index lists every Extended item; decisions table has `# · source · what · chosen · status`.
- [ ] Platform scripts load after the kit; theme toggle wired with `SK.onThemeToggle`.
- [ ] `SK.problems` is `[]`; zero console errors (and warnings from the kit); all assets load (no 404).
- [ ] Counts before == after (cards, variants, Extended badges, screens, assets).
- [ ] `SKSnap.diff('before')` reports `ok: true`.

## 8. Verification

1. **Console and network** — open `…/showcase.html?all` (on the local `serve` server use the clean URL `…/showcase?all`, because `serve` redirects `.html` and drops the query string). `read_console_messages` must show no errors; `read_network_requests` no 404/failed assets; `SK.problems` must be `[]`.
2. **Counts**
   ```js
   ({ sections: document.querySelectorAll('.sk-section').length, cards: document.querySelectorAll('.sk-card').length,
      variants: document.querySelectorAll('.sk-variant').length, extended: document.querySelectorAll('.sk-badge--extended').length,
      screens: document.querySelectorAll('.sk-screen').length, assets: document.images.length })
   ```
3. **Demo styles unchanged** — in the same tab as step 0 (so `sessionStorage` still holds the baseline), reload the migrated page with `?all`, load `style-snapshot.js` again and run `SKSnap.diff('before')` (pass `{roots}` only if you changed the container classes; the default `roots` are the kit's). `ok: true` is required. If `changed` lists elements, fix the migration (never the demo): `groups` tells which kind of property differs (`font`, `colour`, `background`, `border`, `layout`); `onlyBefore` / `onlyAfter` list elements that vanished or appeared. The snapshot hashes **every** computed property of every element inside the stages (sizes resolved by layout — `width`, `height`, `inline-size`, `block-size` — and custom properties are skipped because the new card chrome legitimately changes the available width). Elements with `sc-*` / `sk-*` chrome classes are ignored.
4. **Frames** — scaled height is correct (no leftover unscaled height):
   ```js
   [...document.querySelectorAll('.sk-frame')].map(f => ({ id: (f.closest('.sk-screen')||f).id, scale: +f.dataset.skScale,
     ok: Math.abs(f.querySelector('.sk-frame__box').getBoundingClientRect().height - f._sk.h * f.dataset.skScale) < 1.5 }))
   ```
   Check the Fit / 100 % toggle, and that a frame far down the page is empty until scrolled to (`f._sk.done`).
5. **Behaviour** — open `#f-colours`, `#c-<group>-<name>`, a card id and a screen id directly; arrow/Home/End in the nav; search; `?all`; Copy HTML on three cards (paste somewhere and compare with the card's markup); theme toggle (if any) in both directions and after reload.
6. **Screenshots** — one Foundations page, one component page, one screen, in each theme, at 1280 px wide; view them.
7. Report: counts before/after, `SKSnap.diff` result, console/network result, any section you split, any decision the migration surfaced (add it to `r-open-decisions`).

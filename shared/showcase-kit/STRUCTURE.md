# Showcase structure (canonical, binding for every design-system showcase)

Every `showcase.html` in the Digital Assets hub uses the same page chrome, the same left-nav groups in the same order, the same section ids and the same card anatomy. Platforms differ only in their tokens, their components and their content. Working example: `template.html`. Conversion steps: `MIGRATION.md`.

Files a showcase loads: `<platform>/design-system/tokens.css`, `components.css` (platform), then `../../shared/showcase-kit/showcase-kit.css` and, at the end of `<body>`, `showcase-kit.js`. (Paths are relative; the kit has no build step and works from `file://`.)

## 1. Page skeleton

```html
<div class="sk-app">
  <header class="sk-top">…</header>
  <div class="sk-shell">
    <nav class="sk-nav" data-sk-nav aria-label="Sections"></nav>   <!-- empty: the kit builds it -->
    <main class="sk-main">
      <section class="sk-section" id="overview" …>…</section>
      <section class="sk-section" id="f-colours" …>…</section>
      …
    </main>
  </div>
</div>
```

Only the **active** section is visible (hash routed). `?all` shows every section (print, Ctrl-F). The kit builds the nav, the prev/next links and the count chips from the sections, sorts the sections into canonical order, and auto-creates any missing Foundations / Reference section with the text "Not defined in the source." / "None recorded." (and prints a `console.warn` listing the issue — a finished showcase must have none: check `SK.problems`).

## 2. Top bar (`header.sk-top`)

In this order: **logo slot** (`.sk-top__logo`, any inline SVG or `<img>` up to 28 px tall) · **`<Platform> design system`** (`.sk-top__title`) · **source line** (`.sk-top__src`: `Source: Figma <file> · Section <name> · harvested 2026-10-15` or `Source: <file(s)> · harvested <ISO date>`) · right side `.sk-top__actions`: optional **theme toggle** (`<button class="sk-btn" data-sk-theme-toggle aria-pressed="false">Dark mode</button>`) and the **search** (`<input class="sk-search" type="search" data-sk-search placeholder="Search sections ( / )">`). Press `/` anywhere to focus the search, Enter opens the first match, Esc clears.

## 3. Overview (`id="overview"`, the page that opens when there is no hash)

`<section class="sk-section" id="overview" data-sk-title="Overview">` with: an `h2.sk-section__title` (platform name), a `p.sk-section__lead` (what this is, where values come from, the Extended rule), the count chips `<div class="sk-counts" data-sk-counts data-sk-assets="125"></div>` and the badge legend. The kit fills the chips: **sections / components / screens / extended** are counted from the page (every `.sk-section` except the overview; every `.sk-card` in Components sections; every `.sk-screen`; every `.sk-badge--extended` outside the legend and the Extended index); **assets** comes from the attribute. Any chip can be overridden with `data-sk-<name>="n"` (only when the count genuinely differs, and say why in the lead).

Badge legend (always these four, always these wordings):

| Badge | Class | Meaning |
|---|---|---|
| Extended | `sk-badge sk-badge--extended` | Not drawn in the source; built from existing tokens. |
| Alt | `sk-badge sk-badge--alt` | Alternate treatment present in the source next to the canonical one. |
| Documented dependency | `sk-badge sk-badge--documented` | External runtime dependency (remote animation, font, API): documented, not copied. |
| Outside canonical | `sk-badge sk-badge--outside` | Drawn in the source but outside the canonical section/page. |

Markup: `<dl class="sk-legend"><dt><span class="sk-badge sk-badge--extended">Extended</span></dt><dd>…</dd>…</dl>`.

## 4. Left nav — fixed groups and order

The nav is generated; this is what it will contain. Navigation labels of Foundations and Reference items are fixed by the kit.

**Overview** (ungrouped, first)

**Foundations** — exactly these 8, in this order, always present. If the source has nothing, the section holds `<p class="sk-empty">Not defined in the source.</p>`.

| # | id | Nav label |
|---|---|---|
| 1 | `f-colours` | Colours |
| 2 | `f-typography` | Typography |
| 3 | `f-radii` | Radii |
| 4 | `f-spacing` | Spacing (observed) |
| 5 | `f-shadows` | Shadows & effects |
| 6 | `f-motion` | Motion |
| 7 | `f-sizes` | Sizes & layout |
| 8 | `f-icons` | Icons & logos |

Platform extras are **sub-headings (`h3.sk-h3`) inside these sections, never nav items**: named variables, raw colours, semantic aliases, pill/status colour maps, input-fill rules → inside Colours · control heights, shell geometry, grid, z-index, nav/gutter sizes → inside Sizes & layout · strokes, blur → inside Shadows & effects · logos, flags, coins → inside Icons & logos · light/dark pairs → inside Colours.

**Components** — nested groups by role, in this order; omit empty groups. An item = one component family (one nav entry, one section, one or more cards). Section id = `c-<group>-<name>`:

| Group slug | Nav group | Put here |
|---|---|---|
| `actions` | Actions | buttons, icon buttons, links-as-actions, button groups |
| `forms` | Forms & inputs | text/number/password/search/date/time fields, selects, dropdown fields, OTP, textarea |
| `selection` | Selection controls | checkbox, radio, toggle/switch, segmented control, chip-selectors, sliders |
| `indicators` | Indicators | badges, chips, pills, tags, status dots |
| `feedback` | Feedback | toast, alert, tooltip, banner, progress, skeleton, empty state |
| `overlays` | Overlays | modal, menu, dropdown list, popover, drawer, calendar popup |
| `navigation` | Navigation | nav bar/sidebar, tabs, breadcrumb, pagination, anchor menu |
| `data` | Data display | tables, lists, cards, key-value, charts |
| `patterns` | Platform patterns | domain composites (blotter, deal terms, auth card, widgets, panels) |
| `extended` | Extended states | states/variants the source does not draw that don't belong to a single family |

**Screens** — one nav item per screen or flow; id `s-<name>`; each holds one or more `figure.sk-screen`.

**Reference** — fixed, always present:

| id | Nav label | Content |
|---|---|---|
| `r-decisions` | Known inconsistencies & decisions | decision table (§9) |
| `r-dead-code` | Dead code & dropped items | dead CSS/markup excluded; invented items dropped |
| `r-extended-index` | Extended index | one row per Extended item, linking to its card |
| `r-open-decisions` | Open decisions for the owner | numbered questions |

## 5. Required attributes

| Attribute | On | Meaning |
|---|---|---|
| `data-sk-title` | every `section.sk-section` | nav label (ignored for the canonical Foundations / Reference ids, whose labels are fixed) |
| `data-sk-keywords` | section (optional) | extra words for the nav search |
| `data-sk-group`, `data-sk-sub` | section (optional) | override the group / component group derived from the id |
| `data-sk-copy` | `button` in `.sk-card__foot` / `.sk-alt` | Copy HTML |
| `<template data-sk-source>` | card (optional) | exact text that Copy HTML copies instead of the rendered demos |
| `data-sk-w`, `data-sk-h` | `.sk-frame` | frame size in px (required) |
| `data-sk-max-scale`, `data-sk-toggle="off"` | `.sk-frame` (optional) | allow upscaling above 1 (default never) / hide the Fit–100% toggle |
| `data-sk-nav`, `data-sk-search`, `data-sk-theme-toggle`, `data-sk-counts` | chrome | hooks the kit wires |

Ids: kebab-case, unique per page, prefixed `f-` / `c-` / `s-` / `r-`. Card ids keep their existing values when a showcase is migrated (other documents link to them). Deep links: `#f-colours`, `#c-actions-buttons`, `#c-actions-buttons-primary` (a card inside a section opens the section and scrolls to the card).

## 6. Component card anatomy (fixed order)

```html
<article class="sk-card" id="c-actions-buttons-primary">
  <header class="sk-card__head">                                      <!-- 1 title + badges -->
    <h3 class="sk-card__title">Button (primary)</h3>
    <span class="sk-badge sk-badge--extended">Extended</span>
  </header>
  <p class="sk-card__src">Source: Figma set 766:3215</p>              <!-- 2 source line (node ids or file Lline) -->
  <div class="sk-stage">                                              <!-- 3 demo stage: variants grid -->
    <div class="sk-variants">
      <figure class="sk-variant">
        <div class="sk-demo"><button class="btn">Button</button></div>  <!-- platform markup, untouched -->
        <figcaption class="sk-variant__cap">Default <span class="sk-id">766:3214</span></figcaption>   <!-- label under each state -->
      </figure>
    </div>
  </div>
  <div class="sk-card__foot"><button class="sk-btn" type="button" data-sk-copy>Copy HTML</button></div>   <!-- 4 -->
  <div class="sk-card__notes sk-prose"><p>Behaviour, tokens used, constraints.</p></div>                   <!-- 5 notes -->
  <div class="sk-card__alts">                                                                            <!-- 6 alternates (Alt badge) -->
    <div class="sk-alt"><div class="sk-alt__head"><span class="sk-badge sk-badge--alt">Alt</span> Title</div>
      <div class="sk-stage">…</div><div class="sk-card__foot"><button class="sk-btn" type="button" data-sk-copy>Copy HTML</button></div></div>
  </div>
</article>
```

Rules: the Source line and the Copy HTML button are mandatory (the kit lints for them). Omit `__notes` / `__alts` when empty. Variants: `.sk-variants` (row, wraps) · `--col` (stacked) · `--grid` (equal columns, `style="--sk-min:280px"`). Wide demos scroll inside the stage; popover demos use `.sk-stage--visible`; edge-to-edge demos use `.sk-stage--flush`. **Copy HTML** copies the `innerHTML` of every `.sk-demo` in the card (outside `.sk-alt`), joined by blank lines — i.e. the component's exact markup — or the `<template data-sk-source>` content if present. A `.sk-alt` has its own button that copies only that alternate. Per-state `Extended` badges go in the caption.

`.sk-demo` is a hook with **no styles**; do not put layout on it. `.sk-stage` only sets padding, a background (`--sk-stage-bg`) and horizontal overflow: it sets **no font, colour or line-height**, so the platform's `components.css` governs everything inside it.

## 7. Foundation blocks

| Block | Markup (classes) |
|---|---|
| **Colour swatch card** (name · token · value · role · source) | `.sk-swatches` > `figure.sk-swatch` > `.sk-swatch__chip` (`style="--sk-chip: var(--platform-token)"`, alpha shows a checkerboard) + `figcaption.sk-swatch__meta` > `.sk-swatch__name`, `code.sk-swatch__token`, `.sk-swatch__value`, `.sk-swatch__role`, `.sk-swatch__src` |
| **Type specimen row** (tuple · live sample) | `.sk-type` > `.sk-type__row` > `.sk-type__meta` (`.sk-type__use`, `.sk-type__tuple` = `family · size · weight · lh · ls · colour`, source) + `.sk-type__sample` (the live text, with the full tuple declared on it) |
| **Token table** | `.sk-table-wrap > table.sk-table.sk-table--compact` |
| **Radius / shadow / spacing sample** | `.sk-samples` > `figure.sk-sample` > `.sk-sample__bed > .sk-sample__box` (inline `border-radius` / `box-shadow` from the platform token) + `figcaption.sk-sample__label` (`code` token, value·use) |
| **Icon gallery card** (file name · rendered sample · colour variant) | `.sk-icons` > `figure.sk-icon` > `.sk-icon__sample` (the platform's own icon markup) + `figcaption.sk-icon__meta` > `.sk-icon__name` (file name), colour variant text |
| **z-index / size tables** | token table, with the value and the component that uses it |

Rows state `Not defined in the source` (`p.sk-empty`) rather than being invented.

## 8. Screens

```html
<figure class="sk-screen" id="s-dashboard-default">
  <figcaption class="sk-screen__cap"><span class="sk-screen__name">Dashboard</span><span class="sk-screen__src">Source: Figma frame 20:1</span></figcaption>
  <div class="sk-frame" data-sk-w="1440" data-sk-h="900"><template>…frame markup at its real size…</template></div>
</figure>
```

The kit adds the size/scale label and the Fit / 100 % toggle to the caption, scales the frame to the column width with `transform: scale()`, and sets the wrapper to the **scaled** size (layout height = h × scale, never the unscaled height). Content in the `<template>` is rendered only when the frame is near the viewport (IntersectionObserver; `sk:frame` event fires on the frame afterwards — attach demo behaviour there). Without a `<template>` the frame's children are used directly (rendered immediately). Frames are never upscaled beyond 100 %.

## 9. Decision tables, callouts, code

* Bug / decision row: `table.sk-table.sk-table--decisions` with columns **# · Source (file + line) · What · Chosen behaviour · Status**; status = `<span class="sk-status" data-status="open|decided|fixed">…</span>`.
* Callouts: `div.sk-callout` (info) / `div.sk-callout.sk-callout--warn`. Code: `<pre class="sk-code"><code>…</code></pre>`; inline code is plain `<code>` inside `.sk-prose`, tables, notes and captions.
* Prose: wrap running text in `.sk-prose` (never put a `.sk-stage` inside `.sk-prose`).

## 10. Content rules

1. Every demo uses **only** documented platform classes (from the platform's `components.css`); no showcase-only styling on or inside a demo.
2. Page text is neutral and factual: no marketing language, no first person, no claim without a source.
3. Dates are ISO (`2026-10-15`). Sources are cited per card (node ids or `file L<line>`).
4. Nothing is deleted when migrating: the counts of cards, variants, Extended badges, assets and screens do not drop (see `MIGRATION.md`).
5. One showcase page per platform design system; the page is a static file with relative links.

## 11. Accessibility and behaviour contract (provided by the kit)

Nav: `aria-current="page"` on the active item, `aria-expanded` on collapsible group buttons, roving tab stop, Up/Down/Home/End move focus, Left/Right collapse/expand a group. Component groups open automatically for the active item and while searching. Copy shows `Copied ✓` / `Copy failed` (with a selectable text area as last resort). Events: `document` receives `sk:route` (`detail.id/section/target`) after every navigation. Printing shows every section and renders every frame.

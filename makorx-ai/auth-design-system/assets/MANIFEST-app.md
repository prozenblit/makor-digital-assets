# MANIFEST-app - inline SVG assets of the Makor-X.AI Mobile Authenticator

Extracted programmatically (regex copy, no redraw) from `hub/auth/makor-authenticator.html` (L) and `hub/auth/makor-authenticator-dark.html` (D). Path data is byte-identical to the source. Only change: `xmlns="http://www.w3.org/2000/svg"` added where the inline source omitted it (required for standalone files) and indentation of multi-line files normalised. `.currentColor` copies only change the fill colour attribute noted below.

| File | Where used (source line) | Native size | Colours | Light/dark differences |
|---|---|---|---|---|
| `app-makor-logo-mark.svg` | Launch tile 56x45 (L644-646); banner icon attrs 28x22, CSS 24x19 (L669-671, L119); home glass icon 28x22 (L711-713) | `width=56 height=45 viewBox="0 0 80 64"` (as in launch; other uses only change width/height) | `fill="white"` (sits on the `.logo-gradient` / glass bg) | none (path md5-identical x6 in both files, also identical to `web-makor-logo-mark.svg` path) |
| `app-makor-logo-mark.currentColor.svg` | recolourable copy | same | `fill="currentColor"` | n/a |
| `app-status-wifi.svg` | status bar icon 1 (L655), CSS 16x16 `fill: var(--c-text)` / home `rgba(255,255,255,.9)` | `viewBox 0 0 24 24`, no fill attr (default black; colour comes from CSS) | CSS driven | none |
| `app-status-wifi.currentColor.svg` | recolourable copy | same | `fill="currentColor"` | n/a |
| `app-status-battery.svg` | status bar icon 2 (L656) | `viewBox 0 0 24 24`, no fill attr | CSS driven | none |
| `app-status-battery.currentColor.svg` | recolourable copy | same | `fill="currentColor"` | n/a |
| `app-icon-arrow-left.svg` | "Back to Face ID" button (L792) | `width=15 height=15 viewBox 0 0 24 24` | `stroke="currentColor" stroke-width="2.2" round caps/joins`, fill none | none (inherits `--c-text-3`: `#A8B6CD` / `#4E6A78`) |
| `app-icon-eye.svg` | password toggle (L811) | `viewBox 0 0 24 24` (CSS 18x18) | `stroke="currentColor" stroke-width="2"`, fill none; two shapes (path + circle r3) | none (inherits `--c-text-3`) |
| `app-icon-copy.svg` | "Copy code" button (L914) and its JS-restored copy (L1158, L1189) | `width=18 height=18 viewBox 0 0 24 24` | `fill="currentColor"` (white on primary) | none |
| `app-icon-confirmed-check.svg` | "Sign-in confirmed" icon (JS string L1216), CSS 28x28 `fill: var(--c-primary)` | `viewBox 0 0 24 24`, no fill attr | CSS driven: `#005268` light / `#17C3AF` dark | none (colour only through token) |
| `app-icon-confirmed-check.currentColor.svg` | recolourable copy | same | `fill="currentColor"` | n/a |
| `app-map-light.svg` | bottom-sheet map (L844-878), 358x160 | `viewBox 0 0 358 160`, `preserveAspectRatio="xMidYMid slice"` | bg `#DDE6EA`, blocks `#C4D2DA`, river `#A8BDC9` (.9) + line `#8AAABB`, roads `#F5F5F8`, park `#7BC9B8` (.4), pin `#005268` (halo .15) + white centre | light palette |
| `app-map-dark.svg` | same slot in dark (D877-907) | same | bg `#0F1A24`, blocks `#172230`, river `#0A1520` (.9) + line `#081320`, roads `#0C1219`, park `#17C3AF` (.22), pin `#17C3AF` (halo .18) + white centre | dark palette; identical geometry (rect/line/path coordinates unchanged) |

## Not exported (not inline SVG)

* Face ID animation - external dotLottie `https://lottie.host/2c89c12e-4c0d-41a6-ae13-30b2ce7a964a/kjwDIWFPeM.lottie` (150x148, 60 fps, 244.66 frames, loop, bg tile `#404042`, white glyphs). Dark file overlays a `mix-blend-mode:color` tint `rgba(10,35,55,0.72)` (D287-296).
* App icon tile (logo mark on `.logo-gradient`) is CSS, not an SVG: see `authenticator.md` section 1.3 for the exact gradient.
* Launch constellation is a `<canvas>` (JS), see `authenticator.md` 3.1.

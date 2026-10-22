# Enigma Authenticator (mobile app) — SVG asset manifest

Source: `hub/auth/enigma-authenticator.html`. SVG markup is exported exactly as written inline (path data untouched). Only change: `xmlns="http://www.w3.org/2000/svg"` added to the inline elements that had none (status icons, back, eye, copy, check) so the files open standalone. `.currentColor` copies replace/insert the fill with `currentColor`. Size column = size the element renders at in the app (CSS size / attribute size).

| File | Where used (source line) | Size (viewBox) | Colours |
|---|---|---|---|
| `app-enigma-logo-teal.svg` | Launch screen logo, `#s-launch` (L626-628) | 108x108 attr (viewBox 0 0 40 40) | fill `#3DBFBF` |
| `app-enigma-logo.currentColor.svg` | derived from the above | 108x108 (40x40) | fill `currentColor` |
| `app-enigma-logo-white-push.svg` | Push banner icon tile, 44x44 `#3DBFBF` tile (L653) | attrs 26x26, CSS forces 22x22 (40x40) | fill `white` |
| `app-enigma-logo-white-banner.svg` | Home logo banner tile (L704-706) | 30x30 (40x40) | fill `white` |
| `app-status-wifi.svg` | Status bar (L636) | CSS 16x16 (24x24) | none in file (CSS `fill: #1A1F36`; `rgba(255,255,255,0.9)` on teal) |
| `app-status-wifi.currentColor.svg` | derived | 16x16 (24x24) | `currentColor` |
| `app-status-battery.svg` | Status bar (L637) | CSS 16x16 (24x24) | none in file (CSS fill as above) |
| `app-status-battery.currentColor.svg` | derived | 16x16 (24x24) | `currentColor` |
| `app-back-arrow.svg` | "Back to Face ID" button (L788) | 15x15 (24x24) | stroke `currentColor`, width 2.2, round caps/joins (CSS colour `#A8BECD`) |
| `app-eye.svg` | Password visibility toggle (L809) | CSS 18x18 (24x24) | stroke `currentColor`, width 2, round (CSS colour `#A8BECD`); no eye-off variant exists |
| `app-copy.svg` | "Copy code" button (L923; same markup inlined as JS strings L1227, L1265) | 18x18 (24x24) | fill `currentColor` (button text `#000`; `#7C9CAC` when disabled) |
| `app-check-confirmed.svg` | "Sign-in confirmed" icon (JS template L1293) | CSS 28x28 (24x24) | none in file (CSS `fill: #7AEFEF` on `#7AEFEF18` disc) |
| `app-check-confirmed.currentColor.svg` | derived | 28x28 (24x24) | `currentColor` |
| `app-map-london.svg` | Bottom-sheet map (L845-886), `preserveAspectRatio="xMidYMid slice"`, shown at 358x160 | 358x160 (viewBox 0 0 358 160) | `#DEE8ED` base, `#C8D6DF` blocks, `#A8BECD` river (opacity .9) + bridge, `#94AABB` river stroke, `#F7F8F8` roads (strokes 5/5/4/3.5), `#8BEEC8` park (opacity .5), `#3DBFBF` pin (halo opacity .18, dot, stem), `white` pin centre. Illustration, not monochrome — no currentColor copy. Original HTML comments inside the SVG kept. |

Not exportable: the Face ID animation is a third-party dotLottie (`https://lottie.host/2c89c12e-4c0d-41a6-ae13-30b2ce7a964a/kjwDIWFPeM.lottie`, 150x148, 244 frames @ 60fps, dark card `#404042` + white), referenced at L677.

Notes
- The Enigma logo path data is byte-identical to `web-logo-enigma-mark.svg` (web sign-in) — same mark.
- The inline `✓` in the "Copied!" button label (L1261) is a text character, not an SVG.
- Monochrome files whose CSS supplies the colour have no fill in the base file; use the `.currentColor` copy or set `fill` by CSS.

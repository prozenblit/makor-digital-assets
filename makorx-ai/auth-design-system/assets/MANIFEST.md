# Web sign-in assets (harvested from hub/auth/makor-signin.html)

Extracted verbatim (path data untouched; `xmlns` added to files that lacked it so they open standalone; ids/width/height kept as written).

| file | where used (source line) | size | colours |
|---|---|---|---|
| web-makor-logo-mark.svg | card logo header, `#card-logo-header` (L338-340) | 90x72 (viewBox 0 0 80 64), 3166 B | fill `#005268` |
| web-makor-logo-mark.currentColor.svg | same, monochrome copy | 90x72 | fill `currentColor` |
| web-makor-watermark.svg | `.bg-watermark` bottom-right, opacity .045 (L322-324); same path as logo, no width/height | box 360x288 via CSS (viewBox 0 0 80 64), 3135 B | fill `#005268` |
| web-makor-watermark.currentColor.svg | same, monochrome copy | viewBox 0 0 80 64 | fill `currentColor` |
| web-icon-eye.svg | password show icon `#pw-show` (L362) | CSS 18x18 (viewBox 0 0 24 24), stroke-width 1.8 | stroke `currentColor` (rest `#90AEBC`, hover `#537380`) |
| web-icon-eye-off.svg | password hide icon `#pw-hide` (L363) | CSS 18x18, stroke-width 1.8 | stroke `currentColor` |
| web-icon-checkbox-check.svg | "Remember me" tick (L372) | CSS 10x10 (viewBox 0 0 24 24), stroke-width 3 | stroke `white` |
| web-icon-checkbox-check.currentColor.svg | same, monochrome copy | 10x10 | stroke `currentColor` |
| web-icon-arrow-left.svg | OTP "Back" link (L390) | width/height 15, stroke-width 2.2 | stroke `currentColor` (`#537380`) |
| web-icon-clock.svg | OTP timer label (L412) | CSS 14x14, stroke-width 2 | stroke `currentColor` (`#90AEBC`) |
| web-icon-success-check.svg | success ring tick (L432) | CSS 32x32, stroke-width 2.5 | stroke `currentColor` (`#005268`) |

No raster images, no external image URLs, no icon font. Constellation background is drawn by canvas JS (L444-490), not an asset.

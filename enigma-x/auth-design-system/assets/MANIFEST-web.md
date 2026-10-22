# Enigma X web sign-in — SVG manifest

Source: `hub/auth/enigma-signin.html`. Paths/attributes copied verbatim from the page. Only two mechanical edits so each file stands alone: removed the `id="..."` attributes and the inline `style="display:none"` (eye-hide), and added `xmlns="http://www.w3.org/2000/svg"` where missing. No width/height added: use the "rendered size" below.

| file | where used (source line) | viewBox / rendered size | colours |
|---|---|---|---|
| `web-logo-enigma-mark.svg` | card logo header, all views except success (361-363) | `0 0 40 40`, width/height 72x72 | fill `#7AEFEF` (hard-coded) |
| `web-logo-enigma-mark.currentColor.svg` | copy: fill -> `currentColor` | same | currentColor |
| `web-icon-eye-show.svg` | password toggle, `#pw-show` (387) | `0 0 24 24`, 18x18 | stroke `currentColor`, width 1.8, round caps/joins; rest #9CA3AF, hover #6B7280 |
| `web-icon-eye-hide.svg` | password toggle, `#pw-hide` (388) | `0 0 24 24`, 18x18 | stroke `currentColor`, width 1.8, round |
| `web-icon-check-checkbox.svg` | checkbox tick inside `.cb-box` (397) | `0 0 24 24`, 10x10 | stroke `black` (hard-coded), width 3, round |
| `web-icon-check-checkbox.currentColor.svg` | copy: stroke -> `currentColor` | same | currentColor |
| `web-icon-clock.svg` | OTP timer label (433) | `0 0 24 24`, 14x14 | stroke `currentColor`, width 2, round cap; colour #9CA3AF |
| `web-icon-arrow-left.svg` | OTP "Back to sign in" (449) | `0 0 24 24`, attrs width/height 16 in source (not copied; 16x16) | stroke `currentColor`, width 2.2, round; colour #6B7280 |
| `web-icon-check-success.svg` | success ring (459) | `0 0 24 24`, 34x34 | stroke `currentColor`, width 2.5, round; colour #7AEFEF |

Note: `web-icon-arrow-left.svg` and the logo keep their original `width`/`height` attributes (16 and 72); other icons have none in source (size set by CSS). Monochrome currentColor icons need no extra copy (already currentColor).

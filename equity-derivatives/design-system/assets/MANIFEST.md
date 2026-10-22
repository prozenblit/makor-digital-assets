# Equity Derivatives Auction - icon / logo manifest

Source: Figma file `vtP9aj7XLJ292TjETXmrum`, page "final" (48:1021) -> Section2 (1033:172). Every SVG below is the raw output of `node.exportAsync({format:'SVG_STRING'})`, copied byte-for-byte (verified by hash against a fresh Figma export; the only differences are the `clip0_*` ids in the two checkbox files, which come from the drafts-page main components 85:127/85:129 - identical to the Section2 instances 282:2664/282:2677). Nothing was redrawn.

`<name>.currentColor.svg` = same file with the single colour swapped for `currentColor` (all other attributes untouched; `fill-opacity="0.6"` on the logo is kept). Not generated for multi-colour files (checkbox, status-active-check, status-check-circle, minimize-button, download-button).

No bitmap images exist in Section2 (no IMAGE fills). There are NO country flags, instrument icons, bell, trash/delete, key-only, warning-on-input, clock, or order-matched icons in the canonical screens. The only "delete"-like glyph is the red x-circle; the only clock is a draft-only icon.

Palette seen on icons (raw hex as read from the SVG export; variable bindings were not inspected): `#7590FF` brand blue, `#9597AD` nav idle / neutral, `#F8F7FF` nav active, `#FF982A` edit orange, `#FF6565` danger red, `#FF7553` warning orange, `#FFCE53` partial yellow, `#3FF3C0` success green, `#373746` / `#18181C` dark glyph on coloured fill, `#5B5D72` disabled, `#383D58` icon-button fill. Sidebar bg `#2D2E3B`; login card `#22222C`.

| file | Figma name | node id (example) | size | original colour(s) | used where (Section2 counts) | recommended CSS |
|---|---|---|---|---|---|---|
| makor-logo.svg | Path 1852 | 170:793 | 40x32 | fill #7590FF @ 0.6 opacity | sidebar top, every screen except Log In (13) | `width:40px;height:32px;color:#7590FF` (opacity .6 baked in); at left 12px (64px sidebar) / 20px (80px sidebar), top 20px |
| makor-logo-login.svg | Path 1852 | 131:722 | 70x56 | fill #7590FF @ 0.6 | Log In card, centred, top of card (1) | `width:70px;height:56px`; card 312px wide, logo x=121 |
| nav-auctions.svg / .active.svg | Union (bank/institution) | 170:794 idle, 189:1327 active | 24x24 | idle #9597AD, active #F8F7FF | sidebar item 1, y=92 (13) | 24x24, idle `#9597AD`, active `#F8F7FF` |
| nav-statics.svg / .active.svg | Union (document/newspaper) | 189:1336 idle, 170:803 active | 24x24 | idle #9597AD, active #F8F7FF | sidebar item 2, y=148 (13) | 24x24, same colours |
| nav-profile.svg | Group (user circle) | 170:800 | 32x32 | #9597AD (two paths) | sidebar bottom, y=960 (y=1016 on the 1080-high screen) (13) | 32x32, `#9597AD`, left 16px |
| eye.svg | Vector (show password) | 131:739 | 18x13 (12.4 tall path) | #7590FF | Log In password field, right (1) | 18x13, `#7590FF` |
| checkbox-unchecked.svg | check / Property 1=uchecked | 282:2664 (drafts main 85:127) | 16x16 | rect rx2 #373746 | Edit Client / Internal User / New Client modals (6) | 16x16, radius 2, `#373746` |
| checkbox-checked.svg | check / Property 1=checked | 282:2677 (drafts main 85:129) | 16x16 | rect #7590FF, tick stroke #373746 w2 | same (5) | 16x16, bg `#7590FF`, tick `#373746` 2px |
| status-active-check.svg | check (Active column) | 170:771 | 16x16 | circle #3FF3C0, tick #373746 w1.5 | Clients / External / Internal tables, "Active" column (12) | 16x16 |
| edit-square-pen.svg | lucide/square-pen | 170:777 | 24x24 (glyph 16x16 inset 4) | stroke #FF982A w1.5 round | table Actions column, every admin table (24) | 24x24, `#FF982A`, stroke 1.5 |
| rotate-ccw-key.svg | lucide/rotate-ccw-key | 166:342 | 24x24 (glyph 18x18) | stroke #7590FF w1.5 round | Actions column, reset password/key (16) | 24x24, `#7590FF` |
| search.svg | lucide/search | I170:786;134:215 | 16x16 | stroke #7590FF w1.5 round | search input leading icon (11) | 16x16 `#7590FF`; empty/placeholder state uses #5B5D72 (New Client I282:2527;134:215); drafts also have a 12x12 version |
| calendar.svg | lucide/calendar | I1008:820;1001:741 | 16x16 | stroke #7590FF w1.3 | date input, Client Auctions 1008:687 (2) | 16x16 `#7590FF`, stroke 1.3 |
| minimize-button.svg | lucide/minimize on tile | 189:1254 | 24x24 (glyph 10x10, stroke w1) | tile #383D58 r4, stroke #7590FF | auction card header (Trade 1, Client Auctions 5, New lever 3, Summary 4 = 13) | 24x24 |
| download-button.svg | lucide/download on tile | 1008:824 | 32x32 | tile #383D58 r4 + 1px border #7590FF, glyph stroke #7590FF w1 | Client Auctions 1008:687 toolbar (1) | 32x32 |
| chevron-down.on-primary.svg | Frame 108 / Vector 1 | I273:633;261:1702 | 12x12 (path 8x4) | stroke #18181C w1 round | "button with arrow" (primary, dark glyph) (5) | 12x12 |
| chevron-down.neutral.svg | Frame 107 | I273:808;261:1543 | 12x12 | stroke #9597AD | "button with arrow" neutral/secondary (3) | 12x12 |
| chevron-down.danger.svg | Frame 108 | 273:617 | 12x12 | stroke #FF6565 | "button with arrow" danger (cancel auction dropdown) (9) | 12x12 |
| chevron-down.disabled.svg | Frame 108 | 273:764 | 12x12 | stroke #5B5D72 | "button with arrow" disabled (9) | 12x12 |
| chevron-down.currentColor.svg | (from on-primary) | - | 12x12 | currentColor | generic | NOTE y-offset, see inconsistencies |
| dropdown-chevron.svg | Group / Vector (dropdown) | I189:1342;115:699 | 11x6 | fill #9597AD | `dropdown` select component caret (Trade Auction, New Auction) (2) | 11x6 `#9597AD` |
| time-spinner-arrows.svg | Frame 16 (up + down) | I115:1927;85:93 | 10x24 | fill #9597AD both | `time` input up/down stepper, New Auction modal (2 frames) | 10x24 |
| arrow-big-down.svg | lucide/arrow-big-down | I115:1927;85:87 | 10x12 | fill #9597AD | single stepper arrow (4) | 10x12 (flip vertically for up) |
| status-x-circle.svg | Vector | 273:619 | 12x12 | fill #FF6565 | Client Auctions / New: Client Auctions + New lever small status badges inside "Frame 8 / Frame 14" (14, meaning inferred from position, not from layer names) | 12x12 |
| status-plus-circle.svg | Vector | 273:1214 | 12x12 | fill #7590FF | New lever added + Summary status badges (6, meaning inferred) | 12x12 |
| status-check-circle.svg | check (12px) | 273:1151 | 12x12 | circle #3FF3C0, tick #18181C w1 | Client Auctions status (1) | 12x12 |
| status-warning.svg | Vector (triangle !) | 273:1142 | 14x12 | fill #FF7553 | Client Auctions status/warning (1) | 14x12 |
| status-partial-fill.svg | Group 108 (half-filled circle) | 273:1387 | 14x12 | #FFCE53 fill+stroke (uses SVG masks) | New lever added + partial fill (1) | 14x12 |
| file-up.svg | lucide/file-up | drafts 81:181 (Section2 copy 115:1921) | 16x20 | fill #7590FF | New Auction modal "Upload File" button (1) | 16x20 |
| clock.drafts.svg | Group (clock) | drafts 11:215 | 24x24 | fill #7590FF (2 paths) | DRAFTS ONLY (frame "4"), not in canonical screens | 24x24 |

## Could not export / not available
- Section2 `lucide/file-up` (115:1921): its parent Frame 6 is `visible:false`, so Figma refuses to export ("no visible layers"). The identical visible node on the drafts page (81:181) was exported instead.
- The checkbox tick inside the unchecked variant (lucide/check) has no visible layer - the unchecked state is a plain square.
- Not present anywhere in the file: bell, trash/delete, key (standalone), clock (canonical), warning-on-input, order-matched/arrow glyphs, flags, instrument icons, illustrations, photos. Drafts page `image 1` / `image 2` are screenshot rectangles (2054x1064 / 1911x962), not assets. "page for Isaak" (738:152) contains only re-drawn copies of Trade/Client Auctions/Summary screens using the same icons.

## Inconsistencies in the Figma file
1. Sidebar width: 64px on most screens, 80px on New Client (170:792) and Edit Client (282:2602) - icons shifted +8px (x=20/28/24 instead of 12/20/16). Auctions/Statics highlight: Auctions active on auction screens, Statics active on admin screens.
2. Nav active/idle files differ in decimals only (nav-auctions idle vs active paths are two separate hand-drawn exports, e.g. y 21.0518 vs 21.0508); use either shape - they are visually identical. Statics icon paths are identical.
3. Chevron: variants differ by 1px vertical position - on-primary and neutral use `M2 4 L6 8 L10 4`, danger and disabled use `M2 5 L6 9 L10 5`. Same icon, different instances/sub-component (Frame 107 vs Frame 108). Not normalised here.
4. Search icon: 16px (stroke 1.5) in the final screens vs 12px version in drafts; colour #7590FF vs placeholder #5B5D72 in New Client.
5. Check marks: three different "check" glyphs - 16px tick (stroke 1.5, #373746, in green circle), checkbox tick (stroke 2, path `M12 5L6.5 11L4 8.27`), 12px status tick (stroke 1, #18181C). Drafts additionally have a 32px rounded-square green check.
6. Drafts page uses an older icon set that differs from the final screens: filled 16px circle-x `#FF982A`/`#FF6565`, filled 16px circle-plus (#7590FF / #5B5D72), 18x16 warning triangle (final: 14x12), 28x28 minimize tile (final 24x24), edit icon as a fill-based vector (final: lucide square-pen stroke). Use only the final (Section2) versions.
7. Stroke weights vary by icon: 1.5 (square-pen, search, rotate-ccw-key, check), 1.3 (calendar), 1 (minimize, download, chevrons). Keep per-icon values; do not normalise.
8. Variable bindings on icon vectors were not inspected; treat the hex values above as the source of truth.

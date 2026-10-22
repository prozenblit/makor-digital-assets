# FX Engine Room - Auth flows + App shell (Figma harvest)

File yuJA7DtjFKnqTZQcu2vKYN, page 0:1. Source: use_figma reads (exact values) + screenshots. "(visual estimate)" = read from a screenshot only.
All text is Nunito. Every text node has line-height AUTO, letter-spacing 0%. Variable names are the bound Figma variables.
No node in these screens has a drop shadow (login cards: effects = none).

## 0. Variables seen (bound)
BG #000000 | BG Grey 1 #171719 | Modal BG #242428 | Menu bar #39393C (sidebar) | Separators #39393C | Inputs on modal #39393C |
Primary purple #A4A4FF | Primary text #FFFFFF | Secondary text #707079 | Light grey text #BABEC7 | Black #000000 (button label) |
Cancel Button #E6E6E6 | Edit #FF9747 | Active #2BDF68 | Add New #30F0D6 | Red #FF7272 (login error; the same hex is also var "delete") |
blue #60A8FF (breadcrumb links) | Purple 2 #39394E | Purple 3 #7373BB | yellow #FEE274.

## 1. Auth flows - screens (all 1440x1024 frames, fill BG #000000, containing ONLY a centred-ish card; no sidebar, top bar or footer)

### Section "New User Log In Flow" 2211:1976 (3207x1224)
1. **Log In** 2211:1942 (x100). Card "Frame 22" 2211:1943: username filled "mshepley", password filled (10 dots, hidden), "Forgot Password?" link, Log In button. No empty or focus state drawn.
2. **Change Password (New User)** 2211:1877 (x1667). Card 2211:1878 583x309: title "Change password", New Password (hidden, 10 dots), Confirm Password (visible, "password12?"), rules box "Must contain at least:" with 3 satisfied rules, Cancel + Save Changes.

### Section "Log In Forgot Password Flow" 2211:1977 (7345x1224)
3. **Log In Error** 2211:1835 (x100). Same as Log In + password field red border, "Incorrect Password" message.
4. **Reset Password** (step 1, email entry) 2192:1761 (x1667). Card 2192:1762 296x289.
5. **Reset Password** (step 2, "Email Sent!") 2259:1398 (x3186). Card "Frame 23" 2281:1391 371x255.
6. **New Password** 2201:1724 (x4748). Card 2201:1725 583x309, identical in geometry/content to screen 2 except title "New password" and primary button "Save" (79 wide) at x472 instead of "Save Changes" (139 wide) at x412.

Not drawn: empty login, focus, loading, success/confirmation after save, session/2FA, any "step indicator" (none exists), page-level header/logo outside the card.

### Card common
- Fill #242428 {Modal BG}, radius 12, no stroke, no shadow, no auto-layout (absolute children).
- Card is NOT exactly centred in its 1440x1024 frame as drawn: Log In card at (532,304) 312x388 (centre 688,498 vs frame centre 720,512); Reset step 1 at (572,367); Email Sent at (535,384); Change/New password at (429,325). Reproduce by centring; offsets are drawing slop (visual judgement).
- Inner left/right padding: Log In 48 (fields x48, w216 => card 312). Change/New password: left col x32, right col rules box ends x551 (card 583 => 32 right pad). Reset step 1: x32, input w232 (card 296 => 32 right pad). Email Sent: x32, text w307 (371 => 32 right).

### 1.1 Log In card (312x388) - elements (y relative to card)
- Logo group "logo" 52x61.26 at (130, 38.51) (centred: 130+26=156). Three vector paths all fill #A4A4FF {Primary purple}. Wordmark: "FX" over "Engine Room" (stacked; see section 4).
- Username field instance "Input with label" 216x44 at (48,152): label "Username" Nunito Regular 12, #707079, at top (y0, h8); input box "Frame 9" 216x32 at y12, fill #39393C {Inputs on modal}, radius 4, auto-layout H gap 8, padding 8/12/8/12, text "mshepley" Nunito Regular 14 #FFFFFF at x12.
- Password field instance (State=Hidden / Password) 216x44 at (48,220): label "Password" 12 #707079; box 216x32 fill #39393C r4, padding T8 R12 B8 L8; dots = 10 ellipses 6x6 fill #BABEC7 {Light grey text}, pitch 12 (x12,24,...,120 ; y25 of the 44-high instance), group 114x6; eye icon vector 18x12.43 at (186,22) fill #A4A4FF (visible-state icon is eye-slash 18x18 at (186,19)).
- "Forgot Password?" text at (167,272) 97x8: Nunito Regular 12, fill #A4A4FF {Primary purple}, UNDERLINE (purple, not red). Right-aligned to field right edge (167+97=264=48+216).
- Primary button instance "Purple" (state=Default) 216x32 at (48,324): fill #A4A4FF {Primary purple}, radius 4, padding 11/24/11/24, gap 10, centred; label "Log In" Nunito SemiBold 14, fill #000000 {Black}, centred.
- Vertical rhythm: logo bottom ~100 -> username field y152; field pitch 68 (152, 220); link row y272; button y324; bottom margin 388-356 = 32.

### 1.2 Error variant (Log In Error)
Identical to 1.1 plus:
- Password box "Frame 9": stroke #FF7272 {Red} weight 1, align INSIDE (fill remains #39393C). Username field has NO error stroke.
- Message "Incorrect Password" text at (48,272) 103x8: Nunito Regular 12, fill #FF7272 {Red}, no underline, left aligned, on the same row as the right-aligned "Forgot Password?" link (purple underline, unchanged).
- Screenshot confirms: red 1px rounded border, red message left, purple link right (same line).

### 1.3 Change password / New password card (583x309)
- Title (Change password: 146x13 at x231,y40; New password: 122x13 at x231,y40): Nunito Regular 18, #FFFFFF, align LEFT. Visually centred but 12.5px right of the card centre (centre 304 vs 291.5) (visual estimate: reads as centred).
- Left column x32 (w216): "New Password" field (State=Hidden) at y85; "Confirm Password" field (State=Visible, text "password12?" Nunito Regular 14 #FFFFFF at x12,y22, eye-slash 18x18 #A4A4FF at (186,19)) at y161. Same field style as 1.1 (box fill #39393C r4, label 12 #707079). Field pitch 76.
- Rules box (Group 103) 279x120 at (272,85): rectangle fill #171719 {BG Grey 1}, radius 4. Heading "Must contain at least:" Nunito Regular 12 #707079 at (16,12 inside box). Three rules, each: bullet ellipse 4x4 fill #A4A4FF at x16 (inside box), text Nunito Regular 12 fill #BABEC7 {Light grey text} at +12 from bullet, green check vector 12x9 fill #2BDF68 {Active} at x251 (right-aligned). Rule rows (relative to card y): "8 characters" y121, "1 number (1,2,3,4,5,6,7,8,9,0)" y142, "1 Non-alphanumeric ASCII characters (!@#$%^& *.:;~'`\"*/\\+?- _|=()[] {}<>)" wraps to 2 lines (text box 203x24) y163. Row pitch 21. All three shown satisfied; the unsatisfied state is not drawn.
- Buttons row y245 (h32): Cancel instance at x32 w92 (Property 1=Default / Cancel): fill #E6E6E6 {Cancel Button}, radius 4, padding 11/24, label "Cancel" SemiBold 14 #000000. Primary right-aligned: "Save Changes" 139 wide ends x551 (screen 2) / "Save" 79 wide ends x551 (screen 6). Fill #A4A4FF r4, label SemiBold 14 #000000.

### 1.4 Reset Password step 1 (296x289)
- Title "Reset your password" Nunito Regular 18 #FFFFFF at (63,40) 170x13 (centred: 63+85=148).
- Body "Please enter your email address to receive a link confirmation to reset your password." at (32,93) 230x24 (2 lines): Nunito Regular 12, #BABEC7 {Light grey text}.
- Email input instance "Input" 232x32 at (32,145): fill #39393C {Inputs on modal} r4, padding T8 R12 B8 L8, gap 8; placeholder "email@example.com" Nunito Regular 14 fill #707079 {Secondary text} (no label).
- Buttons y225 (h32): "Back" Cancel button at x32 w79 (fill #E6E6E6, label SemiBold 14 #000000, r4, padding 11/24); "Continue" primary at x156 w106 (fill #A4A4FF r4, label SemiBold 14 #000000). Right edge 262 (card 296, 34 right gap).

### 1.5 Reset Password step 2 - "Email Sent!" (371x255)
- Envelope-with-check icon vector 56x48 at (157,40), fill #30F0D6 {Add New} (teal) (outline envelope with check badge; visual estimate for style).
- "Email Sent!" Nunito Regular 18 #FFFFFF, centred, at (137,120) 91x13.
- Body "Please check your email for the confirmation link." Nunito Regular 14 #BABEC7 at (32,157) 307x10.
- Buttons y191: "Back" (Cancel style) x32 w79; "Resend Link" at x213 w126 using the Primary button component with fill overridden to #FF9747 {Edit} (orange), label SemiBold 14 #000000, r4. NOTE: orange primary used here, unlike other screens.

### 1.6 Auth gaps in design detail
- Text boxes are tiny in Figma (e.g. 12px text node h=8; 14px h=10): line-height auto; reproduce using normal line-height, do not copy heights.
- Hover/focus/disabled of inputs and buttons on these screens: not drawn here (component variants exist in the library - other harvester).

## 2. App shell (identical across all main screens)

Reference frames: Trading Account 1920x1080 (4031:18455) and 1440x1024 frames (Entity 3648:7418, Trading Account 3657:4471, Trader 3769:8602, Static Users 3648:7322, Reports 6878:14782, Blotters 2281:1414). Screen frame itself fill #FFFFFF (hidden behind children).
Structure = three sibling frames: "Frame 1" sidebar (56 wide, full height), "Frame 2" logo block (72x56), "Frame 3" content (x56, w = W-56, full height, radius [16,0,0,0], fill #000000 {BG}).

### 2.1 Sidebar ("Frame 1")
- 56 x full height (1080 / 1024), fill #39393C {Menu bar}, no stroke, no effects.
- Icons: 24x24 at x16 (16px side padding), no tiles/backgrounds. Vertical positions (top of icon): 72, 128, 184, 240, 296, 352 => pitch 56, first at 72 (16px below the 56px logo block).
- Fill colours: inactive #BABEC7 {Light grey text}; ACTIVE = icon recoloured #A4A4FF {Primary purple}. No active tile, bar, hover, or pressed state drawn.
- Icon order / names (layer name -> meaning, visual estimate from screenshots):
  1. y72 "Menu tab 1" (instance of main component Menu tab 1 16:131; list/grid-rows icon)
  2. y128 "Subtract"/"trade" (swap-arrows / Trades Blotter icon)
  3. y184 "csv" (download arrow)
  4. y240 "deleted trades" (trash)
  5. y296 "entities" (building)
  6. y352 file icon (Reports only; "file-02-solid-rounded 1" frame 24x32 containing vector 24.01x32)
- Active mapping drawn: Entities screens (Entity, Trading Account, Trader, Static Users, 1920 Trading Account) -> icon 5 (entities) purple; Blotters -> icon 2 (Subtract) purple; Reports -> file icon (y352) #A4A4FF and entities icon #BABEC7. Note Reports has 6 icons; Entities screens have 5 (no file icon); Blotters has 4 + 2 status icons and no entities icon.
- Settings (bottom): instance of component "Settings" (16:133), 24x24 at x16, y = H-40 (1040 on 1080; 984 on 1024). Gear icon, grey (visual estimate ~#BABEC7). Absent on Blotters.
- Blotters only: two bottom status icons 24x24 at x16: y936 fill #FFDC51 (yellow "V"-like glyph) and y976 fill #707079 {Secondary text} (grey same glyph) (connection-status icons; visual estimate. Tooltips "Bloomberg Disconnected"/"Unallocated trade" exist elsewhere).
- Logo block ("Frame 2" 4031:18474): 72x56 at (0,0), fill #A4A4FF {Primary purple}; child "Frame 5" 56x56 holding "logo" group 32x40 at (12,8) with all three paths fill #000000 {Black} (black FX/Engine Room mark on purple). The block is 72 wide, i.e. extends 16px beyond the sidebar under the content frame's 16px top-left radius, so the purple shows through the rounded corner (visual confirmed).

### 2.2 Top bar ("Frame 4" inside content frame)
- Full content width x 56 high at (0,0) of content; fill none (shows #000000 of Frame 3); stroke #39393C {Separators} 1px bottom only (T0 R0 B1 L0), align INSIDE.
- Title: Nunito Medium 20, #FFFFFF {Primary text}, at x24,y21 (text box 14 high; vertical centre of 56).
- User icon "User" vector 32x32 at (W_content-48, 12) i.e. 16px from right edge: x1816 on 1864, x1336 on 1384; fill #BABEC7 {Light grey text}. Filled circle-person avatar (visual estimate). Single colour, no ring/badge.
- Trader screen only: environment badge "DEV" frame 81x32 at (652,12) (centred ~ x692 of 1384): fill #FFB800 @ 0.15, stroke #FEE274 {yellow} 1px (default centre/inside as drawn), radius 4, auto-layout H padding 11/24/11/24 gap 10 centred; label "DEV" Nunito SemiBold 16 fill #FEE274 {yellow}. Only the Trader frame has it.
- Blotters top bar additionally holds summary "Option Premium 0.00 / Total P&L 3,646.52" pills (Rectangle 11 351x32 fill #39394E at x755; labels Nunito Medium 14 #7373BB, values Nunito Medium 14 #A4A4FF) and a Dropdown 203x32 fill #242428 at x1122 - content, not shell.

### 2.3 Breadcrumb strip (only on Entities-family screens; no strip on Reports/Blotters)
- No container: texts sit directly on the content frame (#000000) between the top bar (ends y56) and the body panel "Frame 7" (starts y104-105). Strip effectively 56-105 (~48-49), no divider, no fill.
- Items at y73, Nunito Medium 18. Link segments fill #60A8FF {blue} with UNDERLINE; current (last) segment fill #BABEC7 {Light grey text}, no underline.
- Separator: chevron-right vector 8x14, fill #BABEC7 {Light grey text}, at y73, 8px gap each side (e.g. "Entities" x24 w61 -> chevron x93 -> "Bank of America" x109).
- Trader screen chain: Entities (x24, blue) > Bank of America (x109, blue) > Traders (x267, blue) > Max Shepley (x352, #BABEC7 current). Chevrons x93, x251, x336.
- Entity/Trading Account screens: Entities (blue, underlined) > Bank of America (#BABEC7). On the 1920 Trading Account Entities is blue, Bank of America #BABEC7.

### 2.4 Body panel ("Frame 7")
- Fill #171719 {BG Grey 1}, full content width, from y104/105 (y56 on Reports) to bottom; no stroke.

### 2.5 Footer ("Frame 8" at bottom of Frame 7)
- Full content width x 46 high, at y = H-46 (873 on 1024 body; 929 within Frame 7 on 1080). Fill #171719 {BG Grey 1}; stroke #39393C {Separators} 1px TOP only (T1 R0 B0 L0) INSIDE.
- Auto-layout H, padding T8 R12 B8 L12, main SPACE_BETWEEN, cross CENTER.
- Left group "Group 24" 315x19.6: Makor "M" mark vector 24x19.6 fill #BABEC7 {Light grey text} at x12 + text "FX Engine Room | Operated by Makor Group" Nunito Medium 14, fill #BABEC7 at x47 (gap 11 between mark and text).
- Right: "Animation" instance 30x30 (component "1" 38:152) at right pad 12 => three stacked 8x8 ellipses (a, b, c, pulse frames) fill #2BDF68 {Active}, at (11,11) in the 30x30; static render = a solid green dot ~8px (visual: dot centre ~27px from the right edge). The 3 ellipses are drawn identical/overlapping (animation implied, not specified: no sizes/opacity per frame).
- Present on all main screens listed (Static Clients/Users/Currency pairs, Entity, Trading Account, Trader, Reports, Blotters, CSV, Deleted trades, New Deal modals frames etc.).

### 2.6 User menu (drawn once: Static Clients 1:2 / "Frame 23" 2277:1379)
- Dropdown "Frame 23" 134x40 at (1234,48) in a 1384-wide content frame (right-aligned: right edge 1368 = 16px from edge, directly under the 56px top bar, overlapping by 8).
- Fill #39393C {Inputs on modal}, radius 4, DROP_SHADOW #000000 @0.4, offset (-1,2), blur 4, spread 0.
- Item: 16x16 logout vector fill #FF7272 {delete} at (12,12) + label "Log Out" Nunito Regular 14 fill #FFFFFF at x36 (gap 8). Single item only; no hover state, no name/email header, no other items.

### 2.7 Tooltips (found while searching; component-library harvester owns details)
- "tooltip" frames: fill #39393C {Inputs on modal}, radius 4, auto-layout H padding 11/16/11/16 gap 10, height 32; text Nunito Regular 14 fill #FF9747 {Edit} (e.g. "Bloomberg Disconnected" 191x32, "Unallocated trade" 145x32). Shadow: either DROP_SHADOW #000000@0.4 (-1,2) blur 4 spread 0 (widgets dashboard), or @0.5 (-2,2) blur 4 spread 1 (blotter 3107:6489).

## 3. Shell consistency check across screens
Identical: sidebar fill/width/icon x,y,size/colours (#BABEC7 inactive, #A4A4FF active), logo block 72x56 #A4A4FF with 32x40 black logo at (12,8), content frame radius [16,0,0,0] fill #000, top bar 56 high with #39393C bottom stroke, title Medium 20 at (24,21), user icon 32x32 at 16px from right, footer 46 high #171719 + #39393C top stroke.
Differences:
- Active icon varies (entities / Subtract / file icon) - expected.
- Reports: extra 6th icon at y352; body panel starts y56 (no breadcrumb strip); Static Users / Reports frames have no breadcrumb.
- Blotters: sidebar lacks entities + Settings icons, has 2 status icons (y936 #FFDC51, y976 #707079); first icon is an instance of "Menu tab 1", not the boolean shape.
- Entity vs Trading Account vs Static: body panel y=104 (Entity, Trader 105? Entity 104, Trading Account 105, Trader 105, Blotters 104) = 1px drift in drawing; treat as 104/105 ~ same. Footer text 14 Medium.
- 1920x1080 variant: same shell, width 1864 content, Settings at y1040, footer at y1034.
- Trader: DEV badge in top bar and 4-level breadcrumb; Blotters: P&L pills + dropdown in top bar.

## 4. Logos (Section 3 children)
- 4407:16446 "logo" group 457x571.76, all 3 paths fill #A4A4FF (master full-size lockup: FX over "Engine Room"). Paths: Path 5 (FX) 457x296.12; Group 4 = Path 2 456.97x140.66 + Path 1 457x110.66 (the "Engine"/"Room" lines), group 457x243.71 at y+328.05.
- 7067:14470 same geometry, paths fill #3B3B5C (dark/tonal variant, low-contrast).
- 2259:1419 horizontal lockup 272.16x73 (FX mark 113.21x73 + two-line text 146.61x72.57 at x125.55), fill #000000, placed on 2259:1415 "Rectangle 23" 1425x137 fill #A4A4FF (banner/lockup preview).
- 7017:14457 "logo FXER" 50x50 frame: Path 5 (FX mark) 50x32 at (0,9), fill #A4A4FF with stroke #4B4B76 weight 1.5.
- 2586:2776 "Frame 24" 512x512 frame: Path 5 512x320 at (0,96), fill #A4A4FF (FX mark app-icon source).
- 1945:2555 "Group 93" = unrelated "Chips with few rows" widget (not a logo).
- Logo in use: login 52x61.26 (#A4A4FF) on card; shell 32x40 (#000) on purple 72x56 block. Aspect 457:571.76 = 0.7993 (52/61.26 = 0.849 login, 32/40 = 0.8 shell: slightly different crops, as drawn).

## GAPS (searched, not drawn)
- Hover / focus / pressed / selected states for sidebar icons, top-bar user icon, breadcrumb links (only colour for active icon and blue/underlined links).
- Active-nav tile or indicator bar; tooltips on sidebar icons (searched "tooltip": only widget/blotter tooltips exist).
- User menu beyond a single "Log Out" row (no name, email, profile, settings, avatar image); no opened-state of the user icon.
- Notifications / bell / toasts / snackbars (searched names notification|toast|snackbar|bell and text notification|toast: none).
- Session timeout / expired session / 2FA-MFA-OTP / lockout / "invalid username" / success-after-save screens (searched names and text: none; only "Incorrect Password").
- Login empty, focused, loading, disabled-button states; password-rule unsatisfied states; email validation error on reset; resend-confirm feedback.
- Step indicators / progress (none anywhere in either flow).
- Page header/branding outside login card; footer/top bar on login screens (none).
- Responsive/mobile variants of shell or auth (only 1440x1024 and 1920x1080 drawn).
- Exact fill of Settings gear and Blotters status icons not read numerically (settings is an instance with no readable fill: visual estimate only).

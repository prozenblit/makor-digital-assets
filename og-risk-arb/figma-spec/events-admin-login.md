# OG Risk Arb Figma — Events Calendar, Admin, Login/Auth, Extra Sections

File key `VlOfBG6fJt7ijm0iKasAMP`, page "final" `48:850`. All values read via Plugin API (exact) unless marked "(visual estimate)".
Conventions: `pad` = top/right/bottom/left; `g` = item spacing; fills `#HEX@alpha`; stroke "INSIDE/OUTSIDE" = strokeAlign; Geist unless stated.
Colour recap used throughout: brand `#005268`, greys `#F5F5F8` `#E5E7EC` `#7C8DAC` `#A8B6CD`, blue `#3675D2`, orange `#FF8132`, red `#DA4D43`, black `#000000`.

---------------------------------------------------------------------------
## 1. EVENTS CALENDAR (3 screens, all 1920x1080 FRAMEs in Section 1)

| Screen | id | Mode |
|---|---|---|
| Events Calendar month | `721:2257` | "Month" toggle active, date label "April, 2026" |
| Events Calendar week  | `721:2388` | "Week" toggle active, label "March 29, 2026 - April 3, 2026" |
| All events            | `721:2481` | "Day" toggle active (this is the LIST / table view), label "April 2, 2026" |

Common shell (each frame): `Nav min` instance `0,0 72x1032` (other harvester); top bar `Frame 15` `72,0 1848x64` fill #FFFFFF, auto-layout H, pad 16/48/8/16, SPACE_BETWEEN, cross CENTER (Search instance 840x40 at 16,16: fill #F5F5F8, stroke #E5E7EC 1 INSIDE, r4, pad 7/12/7/12 g8, placeholder Geist Regular 16 #7C8DAC; avatar 40x40 at x1760, "SG" Geist Regular 14 #000 centred, circle vector stroke #000 1.5); tab strip `Frame 80` `88,72 1784x32`; panel outline `Rectangle 9` `88,104 1784x928` no fill, stroke #E5E7EC 1 INSIDE, radius [0,12,12,12] (TL,TR,BR,BL).

Tab strip (position notes only; belongs to nav harvester): H auto-layout g0 cross CENTER, tabs 32 tall radius [4,4,0,0]; active tab "Events Calendar" fill #F5F5F8 + bottom stroke #005268 3px (INSIDE, only bottom), pad 12/24/12/24, Geist Medium 12 #000; inactive tabs stroke #F5F5F8 1, pad 12/16 (12/12/12/16 with close icon), Geist Regular 12 #000 (Dashboard tab Geist Medium 12); close icon = 16x16 circle fill #E5E7EC r16 with 4x4 x vector stroke #000 1.

### 1.1 Toolbar row (y=120 inside the 1920 frame)
- **Date label** `Date` (`721:2328` month; `721:2429` week; `721:3020` list): H auto-layout, HUG x FIXED 32, pad 0/8/0/16, g16, cross CENTER, stroke #E5E7EC 1 INSIDE, r4, no fill. At x=104,y=120. Contents: `Title` (HUG) text + `lucide/calendar` 16x16 (vector 14x12, stroke #005268 1). Title text is mixed: date parts "Geist Medium 12 #000000", year/continuation "Geist Regular 12 #7C8DAC" (e.g. "April," Medium #000 + " 2026" Regular #7C8DAC; "March 29," M#000 + " 2026" R#7C8DAC + " - April 3," M + " 2026" R). lh auto, ls 0. Widths: 118 / 228 / 128.
- **View switcher** `Day Toggle` (`721:2260` / `721:2389` / `721:2482`): 346x32 at x=1510,y=120; fill #F5F5F8, radius 4, H auto-layout g0 pad 0, three `Button` frames each 115.33x32 FILL (equal thirds), each containing `Button Master` (FILL/FILL, H auto-layout pad 4/16/4/16 g8 centred) with text Geist Medium 12 / lh 20px / ls 0%.
  - Inactive: no fill, text #7C8DAC, `Button Master` radius 8 (as built; the active one is radius 4 — inconsistency in source).
  - Active: fill #005268, radius 4, text #FFFFFF. Order Day | Week | Month.
- Month grid origin `month` frame at 104,168 (1502x864 month / 1489x864 week / 1752x864 list); right "Selected Event" panel at 1625,168 231x848 (month & week only).

### 1.2 Month grid maths (`721:2276`, 1502x864, clip)
- Two stacked children: weekday header `Frame 3` (`721:2277`, 1502x32, fill #FFFFFF, radius [4,4,0,0], layout GRID 1 row (HUG) x 7 cols) and day grid `week` (`721:2292`, 1502x864 at y=32, clipsContent, layout **GRID**, 4 rows x 7 cols, row/col gap 0, rows all FLEX 1 → each row 216 px, columns FLEX 1,1,1,1,1,0.75,0.75).
- Column widths: Mon-Fri = 231.08 each, Sat/Sun = 173.31 each (5x231.08 + 2x173.31 = 1502.02). Cell height 216 (4 rows = 864, then clipped by the 864 frame; more rows exist in content but only 4 visible; the visible panel bottom cuts off the 4th row's chips = overflow clipping).
- Weekday header cell (`Frame 2..7`, `Frame 1` Sun): 231.08 / 173.31 x 32, fill #FFFFFF, stroke #F5F5F8 INSIDE weights t0/r1/b1/l0 (Sun: only bottom 1), pad 8/12/8/12, g10, V auto-layout SPACE_BETWEEN. Label: Geist Medium 12, lh auto, ls 0, colour #A8B6CD, uppercase text typed in: "MON TUE WED THUR FRI SAT SUN" (note "THUR" 4 letters on Thursday).
- Visible month data: 29 30 (prev-month), 1-30 (April), 26 grid shows through 26 (row 4).

### 1.3 DAY component (set `553:547` "DAY", page "components" `924:3460`) — all variants (component size 211x216 / 167x216 unless noted)
Common anatomy: V auto-layout, pad **8/12/12/12**, g8, MIN/MIN, FIXED/FIXED; stroke on **right + bottom only, 1px INSIDE** (t0 r1 b1 l0); no radius.
Header `Frame 1000000899` (FILL x HUG 24, H auto-layout g4, SPACE_BETWEEN in cells that have View More, MIN otherwise): day number text **Geist Medium 14** lh auto ls 0 (18px tall) + optional `Tags` "View More".
`Items` frame: V auto-layout g4 (month variants) / g8 (week variants), pad 0, FILL/FILL (month) or FILL/HUG (week).

| Variant (id) | size | fill | stroke | day number | chips |
|---|---|---|---|---|---|
| `regular day` (`553:546`) | 211x216 | #FFFFFF | #F5F5F8 | #000 | bg #F5F5F8, text #000 |
| `prev month` (`553:548`) | 211x216 | **#F5F5F8** | **#E5E7EC** | **#7C8DAC** | bg **#E5E7EC**, text **#7C8DAC** |
| `next month` (`553:566`) | 211x216 | #F5F5F8 | #E5E7EC | #000 | bg #FFFFFF, text #000 |
| `weekend` (`553:3081`) | 167x216 | #FFFFFF | #F5F5F8 | #000 | bg #F5F5F8, text #000; header has no View More (g0, MIN) |
| `weekend next month` (`553:3370`) | 167x216 | #F5F5F8 | #E5E7EC | #000 | bg #FFFFFF, text #000 |
| `Variant7` (`599:2200`) week Mon, prev-month look | 211x1048 HUG | #F5F5F8 | #E5E7EC | #000 | bg #E5E7EC; code text #7C8DAC, desc text #7C8DAC |
| `10` (`609:2183`) week Tue, prev-month look, no View More | 211x1048 | #F5F5F8 | #E5E7EC | #000 | same as Variant7 |
| `Variant8` (`599:2500`) week regular | 211x1092 | #FFFFFF | #F5F5F8 | #000 | bg #F5F5F8; code #005268, desc #000 |
| `Variant10` (`595:4253`) week regular with View More (used for "today" Thu 2 and Fri 3) | 211x1092 | #FFFFFF | #F5F5F8 | #000 | same as Variant8 |
| `Variant9` (`599:2716`) week weekend | 167x564 | #FFFFFF | #F5F5F8 | #000 | same; chips pad 8, text FILL (wraps) |

Instances are resized by the grid (231.08x216 / 173.31x216 in month; 226.2 / 179 wide in week). In prev-month instances the "View More" tag is still present.

**Month event chip** (`Tags` inside `Items`): FILL x FIXED 24, V auto-layout pad **3/4/3/4**, g10, MIN/MIN, radius 4, text **Inter Regular 12** lh auto ls 0 #000, HUG (truncated with "..." typed into the string; no truncation property — textTruncation DISABLED). Chip fill varies by cell state (table above).
**"View More" chip**: `Tags` 109x24 HUG x FIXED, fill #3675D2@0.1, radius 4, V auto-layout pad 3/24/3/24 g10 centred, text **Inter Medium 12** #3675D2 (note Inter, not Geist). Sits right-aligned in the day-number row (SPACE_BETWEEN).
**Selected chip** (month Thu 2 third chip, `I721:2296;553:534`): same chip, fill #F5F5F8, **stroke #005268 1px OUTSIDE**, radius 4; text "JHG/Trian Fund Management...". This is the "selected event" state; the Selected Event panel shows its data.
**Overflow**: month cells show max 6 chips (6x24 + 5x4 = 164 = Items height) with "View More" button as the overflow affordance; further chips are clipped by FILL height. No "+N more" text.
**Other-month cells**: row 1 Mon/Tue (29, 30) use `prev month`; 3 next-month variants exist (unused in April frame). **Weekend**: Sat/Sun are narrower (0.75 flex) and use `weekend` (header without View More); Sat 4 / Sun 5 contain chips; Sat 18 / Sun 26 empty. There is no distinct weekend background (white).
**Today / selected marker**: month: none for today; selected = outlined chip. Week: today column (Thu 2, `721:2425`) = DAY `Variant10` instance with **stroke #005268 1px INSIDE on all four sides** (t1 r1 b1 l1, whole column frame outlined).

### 1.4 Week view (`721:2388`)
- `month` wrapper (`721:2405`) 1489x864 at 104,168, clip, V layout: header `Frame 4` (`721:2406`, 1489x32 H auto-layout, cells 226.2 x5 + 179 x2 (Sun has only bottom stroke 0/0/1/0)) then `week` (`721:2421` 1489x**1103**, H auto-layout g0, clipped by wrapper) with 7 DAY instances (226.2x832 weekdays / 179x831 weekend). **There is NO time grid and no hourly rows** — the week view is 7 tall day columns of stacked two-line event cards; the user's mention of "time grid" does not exist in Figma.
- Header cells same as month (pad 8/12/8/12, Geist Medium 12 #A8B6CD, strokes t0/r1/b1/l0).
- Columns used: Mon 29 `Variant7` (prev look), Tue 30 `10` (prev look), Wed 1 `Variant8`, Thu 2 `Variant10` (today outline), Fri 3 `Variant10`, Sat 4 `Variant9`, Sun 5 `Variant9`.
- **Week event card** (`Tags`): FILL x HUG, V auto-layout pad **8/8/8/8**, g4, radius 4. Line 1 = deal code **Geist Medium 12 UNDERLINE** (colour #005268 on current days; #7C8DAC on past/muted days); Line 2 = description **Inter Regular 10** (lh auto) colour #000 (current) / #7C8DAC (muted). Card fill #F5F5F8 (current) / #E5E7EC (muted). Card height 48 (one-line desc) / 60 (two-line desc in 143-wide weekend card). Items g8 between cards.
- Weekday/weekend widths: 226.2 / 179.
- "View More" in week: header of Mon 29, Thu 2, Fri 3 (Variant7/Variant10); same chip as month.

### 1.5 Selected Event panel (`Frame 1000000903` `721:2333` month; `721:2434` week) 231x848 at 1625,168
Stroke #E5E7EC 1 INSIDE, radius 8, clip, V auto-layout pad 8/0/8/0 g10, no fill.
Content (month, selected): header `Frame 1000000907` FILL x HUG, pad 0/16/8/16, g8, bottom stroke #F5F5F8 1 — text "Selected Event" Geist Regular 12 #7C8DAC. Then block (pad 0/16/0/16, g8): **#Deal Title** Geist Medium 12 #005268 UNDERLINE (wraps, FILL); **#Status** "Actual" Geist Regular 12 #3675D2. Then "Agency / Event" label Geist Regular 12 #A8B6CD + value Geist Regular 12 #000 (g8, groups g16 between blocks). Then "Description" label #A8B6CD + body Geist Regular 12 #000 (lh auto, wraps).
Empty state (week frame): same panel with centred text "No event selected" Geist Regular 12 #A8B6CD (header "Selected Event" #7C8DAC).

### 1.6 All events = Day view (`721:2481`, list table `Table - Events` `721:2499` 1752x1197 in `month` frame 1752x864 at 104,168)
Table = V auto-layout g0 fill #FFFFFF. Columns (px): Deal Title 498 | Agency/Event 554 | Status 99 | Comments 300.5 (FILL; header 308) | Related Links 300.5 (FILL; header 293).
- **Header** `Table Header (Component)` 1752x25 (HUG height), fill #F5F5F8, bottom stroke #F5F5F8 1 INSIDE, H layout cross CENTER. Cells: V auto-layout pad **4/12/4/12**, centred vertically, right stroke #E5E7EC 1 INSIDE, 24 tall. Text **Geist SemiBold 12** #000 lh auto.
- **Row** `Table Row (Instance)`: FILL x HUG (25 normal, 33 with Join-meeting button/link), fill #FFFFFF, bottom stroke #F5F5F8 1 INSIDE; cells same pad 4/12/4/12 + right stroke #E5E7EC. No hover/zebra variant present.
- Cell text: Deal Title **Geist Medium 12 UNDERLINE #005268**; Agency/Event & Comments **Geist Regular 12 #000**; Status "Actual" Geist Regular 12 **#3675D2**, "Expected" Geist Regular 12 **#7C8DAC**.
- **Join the meeting button** (`Button` 132x24 HUG x FIXED): fills [#FFFFFF, #3675D2@0.2], radius 4, H pad **7/8/7/8** g4 cross CENTER; zoom logo 16x16 (vector #3675D2 body, #FEFEFE inner) + text Geist Medium 12 #3675D2.
- **Related link chip** (`Button` FILL x 24): fill #F5F5F8, radius 4, pad 7/8/7/8 g4; icon 16x16 (Honeywell red `#EE3329`) + text Geist Regular 12 #000 UNDERLINE.
- 33 rows listed; last row clipped by the frame. Row heights seen: 25, 33.
- Day view has no calendar grid, no filters/legend: the only filters are the toggle and date label. **No event-type colour legend exists**; event chips have no per-type colours (only muted/current/blue "View More"/status colour text).

---------------------------------------------------------------------------
## 2. LOGIN / AUTH (SECTION `2159:13746` "log in", 4663x2426)

### 2.1 Screens / states (all FRAMEs 1440x1024, fill #E5E7EC behind a background image)
| Node | Pos in section | Contains |
|---|---|---|
| `2159:13747` "Log In" | 100,100 | 1 card (`Frame 32` `2159:13749`): username filled "prozenblit", password filled-hidden (10 dots), enabled Sign In |
| `2159:13762` "Log In 2" | 100,1302 | 3 cards: `Frame 33` `2159:13777` (x104) **empty** username placeholder, password `empty`, Sign In **disabled**; `Frame 32` `2159:13764` (x528) filled-hidden + Sign In default; `Frame 34` `2159:13790` (x952) filled **visible** ("makoristhebest10", eye-off icon) + Sign In default |
| `2159:13803` "Forgot Password" | 3123,100 | card `Frame 31` `2159:13805` 384x566: title/body + Username + Email Address inputs + "Send" |
| `2159:13819` "Auth " | 1626,100 | OTP card `Frame 33` `2159:13821` 425x547.62: 6 filled slots "1 2 3 4 5 6", Verify Code enabled, Resend Code enabled |
| `2159:13843` "Auth 2" | 1626,1302 | 2 cards: `Frame 32` `2159:13845` (x279) OTP **empty/disabled** ("0" x6 placeholders #7C8DAC, Verify disabled, Resend disabled); `Frame 33` `2159:13867` (x736) = filled enabled (same as Auth) |
**No error states, no success state, no focus state, no loading state in the login section.** The only error pattern is the Admin External "Incorrect password" (section 3).

### 2.2 Background
`59271 1` RECTANGLE (Log In: 1436x1436 at x4,y-301; others 1440x1440 at 0,-303), single fill **IMAGE, scaleMode FILL, opacity 1** (imageHash `ea159abd9f8dede65c185f0e35f072bd5c24fa64`). Parent frame fill #E5E7EC (visible only at frame edges). The image is a raster: dark-teal vertical gradient with a **network/constellation of thin lines and cyan dots** (polygon mesh, brightest dots #00E5FF-ish (visual estimate), dot sizes 3-12px). Sampled colours (pixel samples of the 1440x1024 render): top centre `#00656F` (y5) → `#006E79` (y150, lightest glow) → centre `#006974` → y850 `#013B54` → bottom `#002947`; left edge mid `#013243`, right edge mid `#003245`; top-left corner `#003646`, top-right `#013847`, bottom-left `#013145`, bottom-right `#002F43`. I.e. radial glow at top centre fading to deep navy-teal at bottom/corners. Reproduce with the exported image if possible; CSS fallback (approximation): `radial-gradient(ellipse at 50% 0%, #006E79 0%, #005E6A 30%, #013B54 70%, #002947 100%)`.

### 2.3 Card (shared)
- Frame: fill #FFFFFF, **radius 12**, no stroke, **no shadow/effect**, V auto-layout pad **56/72/56/72**, centre/centre, FIXED x HUG.
- Width: **384** (login, forgot password), **425** (OTP). Heights: 501 (login), 566 (forgot), 547.62 (OTP). Gap between header block and body: **g48** (login) / **g40** (forgot password & OTP).
- Position: centred horizontally in 1440 frame (x528 for 384 wide; x508 for 425; vertical y262 login / 228.5 forgot / 238 OTP — vertically centred in 1024 frame).
- In multi-card frames cards are 424 apart (x104, 528, 952; OTP: 279, 736).
- **Header block** `Frame 1000001133` FILL x HUG, V auto-layout g12: (a) `Frame 1000001132` FILL x FIXED 72, V centred, pad 0/65/0/65, containing `logo` VECTOR 132x72 (fill GRADIENT_LINEAR stops #005268@0, #1B9D83@0.36, #3675D2@0.72, #00C7CE@1, transform [[-0.48,0.51,0.36],[-0.48,-0.43,1.01]]) centred (x54 in 240-wide inner; x74.5 in 281-wide OTP); (b) `Frame 66` FILL x HUG centred containing text **"  Risk Arb DB"** (note two leading spaces) **Geist Medium 24**, lh auto, ls 0, colour **#7C8DAC**, centred.
- Inner content width = 240 (login/forgot) and 281 (OTP).

### 2.4 Login body (`Frame 1000001134` FILL x HUG, V g48, 240x226)
- `Frame 9` V g16 → `Frame 65` V g24 (fields) + "Forgot Password?" link.
- **Username input**: `Input` instance (set `830:4470` "Input", variant "no label"), FILL x FIXED **40**; inner frame fill #FFFFFF, stroke #E5E7EC 1 INSIDE, radius 4, H pad **7/12/7/12**, g32, cross CENTER. Text **Geist Regular 14**, lh auto: placeholder "username" #A8B6CD (Log In 2 empty) / value #000. (Component default text is Geist Regular 12 #7C8DAC "Placeholder", 32 tall; the login overrides size 14 and height 40.)
- **Password input**: instance of set `2159:12814` "Password"; variants `filled hidden` (`2159:12813`), `filled visible` (`2159:12829`), `empty` (`2159:12853`). 240x40, fill #FFFFFF, stroke #E5E7EC 1 INSIDE, radius 4, pad 7/12/7/12, g8, SPACE_BETWEEN centre. Hidden state = `Group 12` (112x4): 10 ellipses 4x4 fill #005268, spaced 12 (visible: first at x12). Visible state = text Geist Regular 14 #000 "makoristhebest10"; empty = "password" Geist Regular 14 #A8B6CD. Trailing icon `lucide/eye` 24x24 (vector 16x12 stroke #005268 1; visible state shows eye-off 16x16 stroke #005268 1).
- Fields to link gap: g24 between username/password; password→link g16.
- **"Forgot Password?"**: Geist Regular 14, UNDERLINE, #000, FIXED 240 wide, left aligned.
- **Sign In** = `Button Outline green` (set `836:2656`) FILL x FIXED 40, H pad **7/24/7/24** g8 centred, radius 4, no fill. Variants: `Default` stroke #005268 **1.2** INSIDE, text Geist Regular 14 #005268; `disabled` stroke **#A8B6CD 1.5**, text #A8B6CD; `hover` fill #005268@0.1 + stroke #005268 1.2, text #005268. (Component default text is Geist Regular 12, 85x32; login overrides to 14 / 40 tall.) Used text: "Sign In", "Send", "Verify Code".

### 2.5 Forgot Password body
Title+body block `Frame 66` V g12 centred: **"Forgot Password"** Geist Regular **18** #000 centred; **"Enter your username and email address to receive a temporary password"** Geist Regular **12** #7C8DAC centred (wraps to 2 lines, FILL width 240). Then `Frame 1000001135` V g48: fields `Frame 65` V g24: two `Input` instances with placeholders **"Username"**, **"Email Address"** (Geist Regular 14 #7C8DAC, field 40 tall, same style as login input; here Input instance spacing g0), then **"Send"** button (Default). No back-to-login link, no error/success message shown.

### 2.6 OTP / 2FA body (card 425 wide)
- `Group 9` (280 x 158.62): title **"Enter Verification Code"** Geist Regular **16** #000 centred; sub-line **"Check you email at\npr***@makor-capital.com"** (sic "you") Geist Regular 16 #A8B6CD centred, 2 lines (42 high); `Frame 70` slots row H auto-layout g8 pad 0, 280x64: six `Input` instances (component `2159:12500` "Input"), each **40x64**, fill #FFFFFF, stroke #E5E7EC 1 INSIDE, **radius 4** (instance override; main component radius 12), pad 7/12/7/12, centred; digit text Geist Regular **16** #000 centred (empty/disabled slots show "0" in **#7C8DAC** as placeholder).
- `Group 11` (281x82): **Verify Code** button 281x40 (Default / disabled as above, Geist Regular 14) then **Resend Code** group 110x18: `lucide/rotate-ccw` 16x16 (vector 17x17 stroke #000 1) + text "Resend Code" Geist Regular 14 UNDERLINE #000 (disabled: icon stroke and text #A8B6CD). Gap between button and Resend ≈ 24 (button bottom y449.62, text y473.62).
- Gap title→sub 12, sub→slots ≈ 20 (y244+42=286 → slots 305.62), slots→button 40.

---------------------------------------------------------------------------
## 3. ADMIN EXTERNAL (SECTION `1895:21099`, 2324x1280) — one frame

`Profile Information` `1895:21100` 1920x1080 at 100,100, fill #FFFFFF (Account Settings page).
- `Nav min` `1895:21101` 72x1032 (nav harvester), top bar `Frame 15` `1895:21164` (as in 1.x).
- Panel `Frame 1000000981` `1895:21118` 1784x960 at 88,72: stroke #E5E7EC 1 INSIDE, radius **[12,8,8,8]**. Header `Frame 1000001010` 1768x61: bottom stroke #E5E7EC 1, pad 20/24/20/24, text **"Account Settings" Geist Medium 16 #000**. Left rail item **"Profile Information"** `#Description` Geist **SemiBold 14 #005268** at 24,85; vertical divider `Line 18` stroke #E5E7EC 1 (rotated; x≈219 from panel left).
- Form column `Frame 1000001009` 544x383 at x259,y85, V auto-layout g32:
  - Group g24: two labelled inputs (`Input` "w label"): label Geist Regular 12 #A8B6CD (16 tall), g4, field 260x32 fill #FFFFFF stroke #E5E7EC 1 INSIDE r4 pad 7/12/7/12; value Geist Regular **12 #000** ("Sourabh Gupta", "sgupta@makorsecurities.com").
  - `Frame 1000001007` V g16: collapsible heading "Change Password" Geist Medium 12 #7C8DAC + `lucide/chevron-down` 12x12 (stroke #7C8DAC 1.2), g2; then H g24: left column 260 V g24: **Password variants** (set `1400:…` "Password": `Default`, `filled`, `filled opened`): 260x32, fill #FFFFFF stroke #E5E7EC r4 pad 7/12/7/12 g8 SPACE_BETWEEN, text Geist Regular **12**; **ERROR variant** = instance `filled` with stroke overridden to **#DA4D43 1px INSIDE**, eye icon vector stroke #DA4D43, dots group 132x6 black, followed by error text **"Incorrect password" Geist Regular 10 #DA4D43** (g2 under field). Order: Current (error) / New (filled opened = visible "makoristhebest10", eye-off) / "Confirm New password" (Default, placeholder Geist Regular 12 #A8B6CD, eye icon stroke #005268 1) — field gaps g8 inside group `Frame 1000001005` 87 tall plus g24.
  - **Password rules box** `Frame 1000001000` 260x143 FILL height: fill #F5F5F8, radius 4, V pad 12/16/12/16 g8; title "Must contain at least:" **Geist Medium 10 #7C8DAC**; items (g4) **Geist Regular 10 #7C8DAC**: "8 characters", "1 lowercase letter", "1 uppercase letter", "1 number (1,2,3,4,5,6,7,8,9,0)", "1 Non-alphanumeric ASCII characters (!@#$%^& *.:;~'`\"*/\\+?- _|=()[] {}<>)".
  - Button row `Frame 1000001001` 544x32 H SPACE_BETWEEN: `Button Outline` (87x32, stroke **#000000 1.2** INSIDE, r4, pad 7/24/7/24, text Geist Regular 12 #000 "Cancel"); `Button` default 127x32 fill **#005268**, stroke #005268 1.5 INSIDE, r4, pad 7/24/7/24, text Geist Regular 12 #FFFFFF "Save Changes".
- **Account menu popover** `Frame 1000000998` `1895:21153` 236x112 at 1661,64: fill #FFFFFF radius 8, V g0, shadow stack (all DROP_SHADOW colour #5B6380): `2,1 blur5 @0.17`, `7,6 blur9 @0.15`, `3,4 blur12 @0.09`, `-3,24 blur14 @0.03`, `42,37 blur16 @0`. Rows 236x56 pad 16/0/16/16, g16; row 1 "Account Settings" fill #F5F5F8 (hover/active) icon `lucide/square-user-round` 24x24 stroke #7C8DAC 1.2; row 2 "Log out" fill #FFFFFF icon `lucide/log-out` stroke **#DA4D43** 1.2; labels Geist Regular **16 #000** (both black).
States present: default, error (Incorrect password), password visible/hidden, collapsed-chevron (chevron-down, screenshot shows up chevron when open – only the down variant is dumped, visual estimate). No success/toast state.

---------------------------------------------------------------------------
## 4. EXTRA SECTIONS (survey)

### 4.1 SECTION "Admin Internal" `1895:17439` (19988x2499; at x-1172,y7413 — OUTSIDE Section 1)
Frames (all 1920x1080 except Nav max 217x1032), shared shell: `Nav min` 72 wide with the **5th nav item active/selected (users icon)** at y≈272 (fill ≈#E5E7EC-teal tint (visual estimate)) — the admin items are only added to nav here; `Nav max` ×2 expanded nav (217x1032); top bar identical; tab strip with extra closable tab per page; panel `Frame 1000000981` 1784x929 at 88,103/104, stroke #E5E7EC 1, radius [0,8,8,8]; page title Geist Medium 14 #005268 at 24,24 (inside panel).
| Frame | id | Content |
|---|---|---|
| Admin > Analytics | `1895:18053` | "User Interactions": search 326x32 + "Sort by: Clients" select 197x32 + sort button 32x32; grouped table Company groups → users; columns Logins, Logged in for (hours), Login Attempts, Reset Password Count; custom scrollbar |
| Admin > Readership Data > Deals | `1895:17760` | "User Behaviour" tab title; same table grouped by company (Makor Group, Oscar Gruss) with Client Name / Total Views / Percentage Change, expandable user rows showing deal rows (link, Total Views, Last Accessed) |
| Admin > Readership Data > User Behaviour | `1895:18543` | flat table: Client Name, Company Name, Total Views, Percentage Change; expandable row open for Max Shepley |
| Admin > Static Data > Deals | `1895:19076` | "Deals": two cards **Deal Status** and **Deal Type** with category rows of coloured pills + dashed "+ Add" pill |
| Admin > Static Data > Deals (modal) | `1895:19315` | same + blurred overlay + **"Add New Deal Status" modal** |
| Admin > Static Data > Currencies & Exchanges | `1895:19560` | "Market" tab: Dividend Status pills (grey), two side-by-side editable tables Currency (Code/Symbol/Country) and Exchange (Code/MIC/Region) with inline cell edit (Canada cell focused: stroke) |
| Admin > Disclamer / > Edit | `1895:20029` / `1895:20079` | Read-only disclaimer text with orange **Edit** outline button; edit mode = rich-text toolbar + textarea + Cancel/Save |
| Admin > Mailing list | `1895:20250` | table with checkboxes (New deal is added / Event is happening / Update to the deal) |
| Admin > Static Data > Sectors / (modal) | `1895:20357` / `1895:20645` | A-Z index, 4-column grouped sector list with count pills, hover row with edit/delete, "Add Sector" button; "Sector Name" modal |

#### Distinctive patterns (exact)
**Page header** `Frame 1000000981`: panel stroke #E5E7EC 1 INSIDE, radius [0,8,8,8]; title text Geist Medium 14 #005268 (e.g. "User Interactions", 1483x18 at 24,24).
**Search** `search` instance (set "no label"): 326x32 (analytics) / 200x32 (sectors): fill #FFFFFF, stroke #E5E7EC 1 INSIDE, r4, pad 7/12/7/12 g8, icon 12x12, placeholder Geist Regular 12 #7C8DAC.
**Select** 197x32: fill #FFFFFF, stroke #E5E7EC 1 INSIDE, r4, pad 7/12/7/12 g8 SPACE_BETWEEN; text "Sort by: " Geist Regular 12 #7C8DAC + value Geist Regular 12 #000; chevron-down 16x16 (vector 12x6 stroke #005268 1.5). Sort button `lucide/arrow-up-down` 32x32 fill #F5F5F8 r4 (vector 16x12 stroke #000 1).
**Admin table** (`Frame 1000000931` 1728x864, stroke #E5E7EC 1 OUTSIDE, r4, V g0; right edge scrollbar `Scroll` 4x787: track #E5E7EC r16, thumb #A8B6CD r16):
- Header row 32 tall, fill #F5F5F8, bottom stroke #E5E7EC 1; leading 24x24 `lucide/chevron-down` slot (chevron vector 8x4); header cell pad 4/8/4/8, text Geist Medium 12 #000 ("Company Name").
- **Group row**: 32 tall, fill **#005268@0.1**, bottom stroke #E5E7EC; label Geist Medium 12 **#005268** (e.g. "Goldman Sachs").
- **Sub-header row**: 32 tall, fill **#EAEBED@0.3**, bottom #F5F5F8, cells right-stroke #F5F5F8; labels Geist Medium 12 **#A8B6CD** (centre-aligned numeric columns 200 wide).
- **Data row**: 32 tall, fill #FFFFFF, bottom stroke #E5E7EC (some rows stroke-less), cells pad 4/8/4/8 right-stroke #F5F5F8, text Geist Medium 12 #000 (numbers centred, 200 wide columns; first col 904).
- **Expanded child row**: 25 tall, fill #EAEBED@0.3, bottom #F5F5F8, cell pad 4/16/4/16; deal link Geist Medium 12 **UNDERLINE #005268**; numeric cells Geist Medium 12 #000 centre.
- Percentage change: Geist Medium 12 centred, positive **#3B951A**, negative **#DA4D43**.
**Mailing-list checkbox** (16x16, radius 2): checked = fill #005268 + white check vector 8x6 stroke #FFFFFF 1.5; unchecked = stroke **#A8B6CD 1 INSIDE**, no fill; cell centred, pad 4/8/4/8. Table columns: 540 / 540 / 200 / 200 / 200.
**Deal Status/Type cards** (`Frame 1000001012` 1728x280 / `…13` 1728x320): stroke #F5F5F8 1 INSIDE, radius 8; header 48 tall pad 16, bottom stroke #F5F5F8, title Geist Medium 12 #000; body V pad 16/16/32/16 g16; each row H g16: category label Geist Medium 12 #A8B6CD then pill group H g8.
- **Pill** (`#Status`): HUG x 24, radius **16**, fill = colour@**0.2**, H pad **4/16/4/16** g10 centred, text Geist Medium 12 in the same solid colour. Removable/selected pill: pad 4/4/4/16 g8, stroke same colour 1 INSIDE, trailing `lucide/circle-x` 16x16 (fill colour@0.2 r16, x vector 4x4 stroke colour 1).
- **"+ Add" pill**: 59x24 radius 16, no fill, stroke #E5E7EC 1 **dashed [2,2]**, text #A8B6CD.
- Colours (bg@0.2 / text): Pre-deal `#30B2C0`; Active `#179484`; Spin-offs `#A752A9`; Closed `#3090C0`; Failed: "Did Not Happen" `#4C7794`, rest `#DC432B`. Deal Type: M&A `#4162A3`; Tender/Exchange `#C6226C`; Spin-offs & Splits `#179464`; Distressed `#DC5E2B`; Shareholder `#ECA100`; Securities `#36A30F`, "Not Available" `#4C7794`. Dividend Status pills (Currencies frame) are grey (visual estimate: #E5E7EC bg, #000 text).
**Overlay** `Rectangle 11` 1848x1016 at 72,64 (covers everything right of the nav and below the top bar): fill **#E5E7EC@0.2** + **BACKGROUND_BLUR radius 20**.
**Modal** `Frame 1000001083` 386x158 at 767,461 (centred in overlay): fill #FFFFFF, radius **8**, shadow stack as menu above, V auto-layout pad **25/24/25/24** g24. Content: `Input` "w label" 338x52 (label "Deal Status"/"Sector Name" Geist Regular 12 #A8B6CD; field 338x32 white, stroke #E5E7EC, r4, placeholder "Type here" Geist Regular 12 #7C8DAC); button row H SPACE_BETWEEN 338x32: **Cancel** 87x32 fill **#7C8DAC** r4 text Geist Regular 12 #FFFFFF; **Add New Deal Status / Add New Sector** (165x32 / 138?) fill **#005268** r4 text #FFFFFF, pad 7/24/7/24. No close X, no title.
**Sectors list** (`Section_Sectors` 928x469 + index): group `LG_A` 220x161 V g8 pad 0/8/0/8: header H g8 SPACE_BETWEEN: chevron (vector 8x4 stroke #005268 1.2) + letter **Geist SemiBold 12 #005268** (g6) | count pill 31x17 fill #E5E7EC r16 pad 2/8/2/8 text **Geist SemiBold 10 #7C8DAC**; items Geist Regular 12 #000, 24 tall rows; **hover row** fill **#005268@0.1**, radius 2, pad 4/4/4/8 with two 16x16 icon buttons r2 g4: edit fill #005268@0.2 icon #005268; delete fill **#F0C4C1** icon #DA4D43. **A-Z index** (24 wide column at x24): letters Geist Medium 12 default #A8B6CD; letters with sectors #3675D2@0.9 Medium 14; current/selected "E" Medium 16 #3675D2 in 24x24 circle fill #3675D2@0.1 r24 (first "A" black Medium 12). **Add Sector** = `Button Outline green` 110x32.
**Disclaimer**: read view text is **Inter Regular 12 #000** (816 wide, 165 tall) — Inter again; **Edit** button 70x32 `Button Outline green` with orange override: stroke **#FF8132 1.2**, text #FF8132. Edit mode editor `Frame 1000001071` 816x327: fill #FFFFFF, stroke #E5E7EC 1 OUTSIDE, r4; `rich text` toolbar instance 816x28 fill #F5F5F8, bottom stroke #E5E7EC, pad 4/0/4/0 (undo/redo, paragraph, B/I/U/S, alignment, lists, link, table, code, fullscreen; icon-only); body `Input` 816x189 pad 12/16/12/16 g12; Cancel (#7C8DAC fill) 87x32 + Save Changes (#005268) 127x32 below at y401.
**Inline edit cell** (Currencies): focused cell has stroke (dark teal #005268-ish (visual estimate)) 1px; symbol column text #7C8DAC (visual estimate).

### 4.2 SECTION "changes for Laura" `2159:13682` (4136x3138; at x15309,y-661 — OUTSIDE Section 1)
Contains 3 frames: `Deal` `2141:9786` (1920x2902), `Dashboard` `2241:7172` (1920x1080, "Announced Date" dropdown OPEN), `Dashboard` `2241:7787` (1920x1080, date-range picker OPEN). ID numbers (2141/2241) are higher than every Section 1 frame (≤2139 except the later login 2159), i.e. later-created.
**Shell differs from Section 1**: no `Nav min` side rail; top bar is a 1920x80 bar (pad 16/32/24/32) with logo+search `Frame 1000001136` 1312x40 at 32,16 and avatar at 1848; content starts x=32 (tabs `Frame 80` at 32,80 1856x32; panel `Frame 1000001046` 1856x929 at 32,112); the tab strip has extra tabs **History, Reports**; dashboard has **Drafts (148)** (yellow #ECA100-tint), **New Deal** (filled #005268), **Open/Closed Deals** toggles, deal table columns **Ticker | Deal Title | Status | Deal Type** with A-Z index, and Upcoming Events / Recent Updates panels (feeds same as Section 1).
Deal page: content is textually identical to Section 1 `Deal` `1720:6515` (diff only: tabs "History", "Reports", "AHL / 8630 JT" vs "SSTK / GETY") but laid out in the 1856-wide shell (frames at 454/48/1418 columns, 1928 tall) — a width/shell re-layout, not new content. (Section 1 `Deal Edit Events (Internal)` `1720:6136` carries the edit-events form; Laura's Deal has only the read view with "Edit Events" link.)
**Supersession verdict**: the Laura frames are **later revisions of Dashboard and Deal** with a different (older-looking, side-rail-less) shell. They **supersede Section 1 only for (a) the dashboard date filter and deal-table columns and (b) are otherwise NOT a drop-in replacement** — Section 1 Dashboard (`414:2798`) has "Start Date / End Date" columns and no date filter, no Drafts/New Deal/History/Reports, and keeps the Nav rail; Laura has the opposite. Treat Laura as an alternate/next-iteration spec: take its NEW components (date filter dropdown + range picker, Drafts/New Deal buttons) and keep Section 1 shell/nav. **Confirm with the user which shell is authoritative.**
New components in Laura:
- **Filter select** `Select` 171x32 ("Announced Date") fill #FFFFFF stroke #E5E7EC r4 pad 7/12/7/12 g16, text Geist Regular 12 #000; **active/open date range select** 216x32 same but stroke **#005268**, text "Jan 20, 2026 - Feb 09, 2026"; calendar icon right.
- **Dropdown menu** `Frame 1000001148` 173x80 at (998,222): fill #FFFFFF, stroke #F5F5F8 1 INSIDE, r4, shadows `2,1 b5 @0.17`, `7,6 b9 @0.15`, `-3,24 b14 @0.03` (#5B6380); two rows 173x40 pad 12 g10: selected "Announced Date" Geist Medium 12 #005268 on fill #005268@0.1; "Expected Close Date" Geist Regular 12 #000; separator `Line 20`.
- **Range date picker** `Frame 1000001143` 477x364 at (1052,225): fill #FFFFFF, stroke #F5F5F8 1, **radius 8**, 5-layer shadow (as menu), V auto-layout pad **16/12/16/12** g16. Rows: presets row (pad 0/8, bottom stroke #F5F5F8, padding-bottom 16): four pills 100.25x28 fill #F5F5F8 radius 16 g12 text Geist Regular 12 #000 ("All Time", "This Month", "This Quarter", "Last Quarter"); date inputs row `Frame 1000001145` 453x32 g32: two `calendar` "one date" selects 178.5x32 (fill #FFFFFF stroke #E5E7EC r4 pad 7/12/7/12 SPACE_BETWEEN) joined by `Line 20` 16px stroke #A8B6CD 1; two month grids 210 wide, gap 17, each: `MonthHeader` 210x32 (pad 0/4/0/4 SPACE_BETWEEN: chevron 16x16 stroke #18181B 1.5, title **Inter Medium 14 #0E0E12**), `DayHeaders` 30px cells **Inter Regular 12 #A8B6CD** (Su Mo Tu We Th Fr Sa), `Week` rows 30 tall (g2 between rows) with 30x30 cells **Inter Regular 13** #0E0E12; **range start/end** cell = fill **#005268**, radius **8**, text **#FFFFFF Inter Medium 13**; **in-range** cells = row segment fill **#E5E7EC** radius 8, text #000. Uses Inter (not Geist) — likely a pasted library component.

---------------------------------------------------------------------------
## GAPS (not in Figma / could not read)
- **Events**: no time grid in week view, no event-type colours or legend, no today marker in month, no hover/focus/pressed states for day cells/chips, no "+N more" text, no empty-day state beyond blank cells, no loading/empty list state, no filters beyond Day/Week/Month; prev/next arrows for the date label do not exist (only a calendar icon). Day toggle inactive radius (8) vs active (4) is inconsistent in source.
- **Login**: no error (wrong password / invalid OTP / rate-limit), success, loading, focus, hover (except Button `hover` variant), or password-reset-sent state. Input focus/error styles must be extended (use Admin External error: stroke #DA4D43, message Geist Regular 10 #DA4D43).
- Background image is raster (imageHash given) — not exported; sampled colours above only.
- Admin External: only one state (error) of password; no success toast, no disabled Save.
- Admin Internal: modal has no close/title; no validation error in modals; dividend/currency inline-edit exact focus stroke and Dividend pill colours are visual estimates; Nav selected-item colour not dumped.
- Laura: only layout/shape/colour dumped for the new components; shell differences are at overview level (full dashboard/deal internals not re-dumped; text-diff vs Section 1 only).
- Screenshots: pixel colours of the login background sampled from a 1440 render via GDI (exact for those pixels).

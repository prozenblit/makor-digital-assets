# Showcase kit

Shared page chrome for every design-system `showcase.html` in the Digital Assets hub: same top bar, same left nav (Foundations · Components · Screens · Reference), same card anatomy, same behaviour. Vanilla CSS + JS, no dependencies, no build, works from `file://` and `http://localhost:3456/shared/showcase-kit/template`.

| File | Purpose |
|---|---|
| `STRUCTURE.md` | The canonical information architecture. Binding. |
| `showcase-kit.css` | Chrome and card layout. Classes prefixed `sk-`; theme via `--sk-*`; nothing leaks into demos. |
| `showcase-kit.js` | Hash routing (`?all` = everything), nav, search, prev/next, Copy HTML, theme hook, scale-to-fit lazy frames. `window.SK`. |
| `template.html` | Minimal complete showcase using every feature, with a light and a dark token set. Start new platforms from it. |
| `MIGRATION.md` | How to convert an existing showcase, with recipes, checklist and verification. |
| `style-snapshot.js` | Console tool: snapshot / diff computed styles of all demos before and after a migration. |

Use: link the platform's `tokens.css` + `components.css`, then `showcase-kit.css`; map `--sk-*` from the platform tokens on `.sk-app`; load `showcase-kit.js` at the end of `<body>`; write sections as in `STRUCTURE.md`. API: `SK.onThemeToggle(fn(isDark, mode))`, `SK.setTheme('dark'|'light')`, `SK.refit()`, `SK.lint()` / `SK.problems`; events `sk:route`, `sk:frame`.

Notes: with `npx serve` open `…/showcase?all` (clean URL) because `serve` drops the query string when it redirects `.html`. The kit adds no global CSS rules; the page needs `body { margin: 0 }` (normally already in the platform's `components.css`).

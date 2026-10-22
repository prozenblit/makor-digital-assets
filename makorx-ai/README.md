# makorx-ai (hub-owned design systems)

Design systems for the MakorX.AI HR app and the Makor auth screens. They belong to the hub repo; the HR app itself lives in its own project (`../makor-hr/`, own GitHub repo, ignored by this repo).

- `design-system/`, `html-spec/`: MakorX.AI HR app system and its extraction specs.
- `auth-design-system/`, `auth-html-spec/`: Makor auth system (source: `hub/auth/makor-*.html`).

Moved here from `makor-hr/` on 2026-10-22. Spec files cite `makor-hr/employees.html` by line number (e.g. "L1046"). Those citations are valid only while that file is unchanged; if the app is edited, re-check the cited lines before trusting them.

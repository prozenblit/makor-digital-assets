import fs from 'node:fs';
import { launch } from './cdp.mjs';
const snapSrc = fs.readFileSync('C:/Users/PolinaRozenblit/OneDrive - Makor Ltd/Desktop/claude code/Digital Assets/shared/showcase-kit/style-snapshot.js', 'utf8');
const SETTLE = `window.__settle = function(){ document.getAnimations().forEach(function(a){ if (a.transitionProperty !== undefined) a.finish(); else { a.pause(); a.currentTime = 0; } }); }`;
const ROOTS = '.sc-pair, .sc-grid3, .sc-sp-list, .sc-fxrow, .sc-layout, .sc-z, .sc-row, .sc-ic__pair, .sc-kv';
const base = 'http://localhost:3456/makorx-ai/design-system/';
const c = await launch(9470);
const out = {};
for (const [name, url, tog] of [['old', base + 'showcase.old', 'toggleDarkMode()'], ['new', base + 'showcase?all', "SK.setTheme('dark')"]]) {
  await c.goto(url, 1600, 1000); await c.ev('localStorage.clear()'); await c.goto(url, 1600, 1000);
  await c.ev(snapSrc); await c.ev(SETTLE);
  out[name] = {};
  for (const theme of ['light', 'dark']) {
    if (theme === 'dark') await c.ev(tog);
    await c.wait(1200); await c.ev('__settle()');
    out[name][theme] = JSON.parse(await c.ev(`JSON.stringify(SKSnap.take({ roots: ${JSON.stringify(ROOTS)}, self: '.never' }))`));
  }
}
for (const theme of ['light', 'dark']) {
  const a = out.old[theme], b = out.new[theme]; let onlyB = 0, onlyA = 0, changed = 0; const ex = [];
  for (const k in a.map) { if (!b.map[k]) { onlyB++; ex.push(a.labels[k]); continue; } const A = a.map[k], B = b.map[k]; if (A.length !== B.length) onlyB++; else if ([...A].sort().join() !== [...B].sort().join()) { changed++; ex.push(a.labels[k]); } }
  for (const k in b.map) if (!a.map[k]) onlyA++;
  console.log(theme, JSON.stringify({ before: a.count, after: b.count, onlyBefore: onlyB, onlyAfter: onlyA, changed, ex: ex.slice(0, 8) }));
}
c.close();

import fs from 'node:fs';
import { launch } from './cdp.mjs';
const snapSrc = fs.readFileSync('C:/Users/PolinaRozenblit/OneDrive - Makor Ltd/Desktop/claude code/Digital Assets/shared/showcase-kit/style-snapshot.js', 'utf8');
const SETTLE = `window.__settle = function(){ document.getAnimations().forEach(function(a){ if (a.transitionProperty !== undefined) a.finish(); else { a.pause(); a.currentTime = 0; } }); }`;
const c = await launch(9461);
const url = 'http://localhost:3456/makorx-ai/design-system/showcase.old';
await c.goto(url, 1600, 1000);
await c.ev('localStorage.clear()');
await c.goto(url, 1600, 1000);
await c.ev(snapSrc); await c.ev(SETTLE);
const counts = await c.ev(`({ sections: document.querySelectorAll('.sc-sec').length, cards: document.querySelectorAll('.sc-demo').length,
  variants: document.querySelectorAll('.sc-v').length, extended: document.querySelectorAll('.sc-ext').length,
  screens: document.querySelectorAll('.sc-fit').length, images: document.images.length, svgUse: document.querySelectorAll('use').length,
  bugRows: document.querySelectorAll('.sc-bugs tbody tr').length, extIndexRows: document.querySelectorAll('#x-index + table tbody tr').length,
  copyBtns: document.querySelectorAll('.sc-copy').length, height: document.documentElement.scrollHeight, bodyDark: document.body.classList.contains('dark') })`);
console.log('counts', JSON.stringify(counts));
async function take(roots) {
  await c.wait(1200); await c.ev('__settle()');
  return JSON.parse(await c.ev(`JSON.stringify(SKSnap.take({ roots: ${JSON.stringify(roots)}, self: '.never' }))`));
}
const out = {};
for (const theme of ['light', 'dark']) {
  if (theme === 'dark') await c.ev('toggleDarkMode()');
  out[theme] = await take('.sc-stage, .sc-fit__inner');
  console.log(theme, 'dark?', await c.ev('document.body.classList.contains("dark")'), 'elements', out[theme].count, 'keys', Object.keys(out[theme].map).length);
}
const wide = {};
for (const w of [2200, 2560]) {
  const ids = w === 2200 ? ['d-scr-employees', 'd-scr-detail'] : ['d-scr-employees', 'd-scr-detail', 'd-scr-group', 'd-scr-detail-records'];
  await c.ev(`(function(){ ${JSON.stringify(ids)}.forEach(function(id){ document.querySelector('#'+id+' .sc-fit').dataset.w = '${w}'; }); fit(); })()`);
  for (const theme of ['light', 'dark']) {
    await c.ev(`if (${theme === 'light'} === document.body.classList.contains('dark')) toggleDarkMode();`);
    const roots = ids.map(id => '#' + id + ' .sc-fit__inner').join(',');
    wide[w + '-' + theme] = await take(roots);
    console.log('wide', w, theme, wide[w + '-' + theme].count);
  }
  await c.ev(`(function(){ ${JSON.stringify(ids)}.forEach(function(id){ document.querySelector('#'+id+' .sc-fit').dataset.w = '1920'; }); fit(); })()`);
}
fs.writeFileSync('baseline.json', JSON.stringify({ counts, snaps: out, wide }));
console.log('logs', JSON.stringify(c.logs.slice(0, 10)), 'netfail', JSON.stringify(c.net.filter(n => n.status >= 400 || n.status === 0)));
c.close();

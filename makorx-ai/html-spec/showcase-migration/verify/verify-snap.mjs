import fs from 'node:fs';
import { launch } from './cdp.mjs';
const snapSrc = fs.readFileSync('C:/Users/PolinaRozenblit/OneDrive - Makor Ltd/Desktop/claude code/Digital Assets/shared/showcase-kit/style-snapshot.js', 'utf8');
const SETTLE = `window.__settle = function(){ document.getAnimations().forEach(function(a){ if (a.transitionProperty !== undefined) a.finish(); else { a.pause(); a.currentTime = 0; } }); }`;
const base = JSON.parse(fs.readFileSync('baseline.json', 'utf8'));
const c = await launch(9462);
const url = 'http://localhost:3456/makorx-ai/design-system/showcase?all';
await c.goto(url, 1600, 1000);
await c.ev('localStorage.clear()');
await c.goto(url, 1600, 1000);
console.log('console after load:', JSON.stringify(c.logs));
console.log('net problems:', JSON.stringify(c.net.filter(n => n.status >= 400 || n.status === 0)));
console.log('SK.problems:', JSON.stringify(await c.ev('SK.problems')));
await c.ev(snapSrc); await c.ev(SETTLE);

const isCaption = l => /^figcaption/.test(l);
function cmp(a, b) {
  const onlyBefore = [], onlyAfter = [], pos = [], set = [];
  let capBefore = 0;
  for (const k in a.map) {
    if (!b.map[k]) { if (isCaption(a.labels[k])) capBefore += a.map[k].length; else onlyBefore.push(a.labels[k] + ' x' + a.map[k].length); continue; }
    const A = a.map[k], B = b.map[k];
    if (A.length !== B.length) onlyBefore.push(a.labels[k] + ' count ' + A.length + '->' + B.length);
    for (let i = 0; i < Math.min(A.length, B.length); i++) if (A[i] !== B[i]) pos.push(a.labels[k]);
    if (A.length === B.length && [...A].sort().join() !== [...B].sort().join()) set.push(a.labels[k]);
  }
  for (const k in b.map) if (!a.map[k]) onlyAfter.push(b.labels[k] + ' x' + b.map[k].length);
  return { before: a.count, after: b.count, captionsReclassedAsChrome: capBefore, onlyBefore: onlyBefore.length, onlyAfter: onlyAfter.length, positional: pos.length, multiset: set.length,
    sample: { onlyBefore: onlyBefore.slice(0, 15), onlyAfter: onlyAfter.slice(0, 15), positional: [...new Set(pos)].slice(0, 20), multiset: [...new Set(set)].slice(0, 20) } };
}
async function take(roots) {
  await c.wait(1200); await c.ev('__settle()');
  return await c.ev(`JSON.stringify(SKSnap.take({ roots: ${JSON.stringify(roots)}, self: '.never' }))`);
}
const report = {};
const ROOTS = '.sk-stage:not(:has(.sk-frame)), .sk-frame[data-sk-w="1920"] .sk-frame__inner';
for (const theme of ['light', 'dark']) {
  if (theme === 'dark') await c.ev(`SK.setTheme('dark')`);
  const r = await take(ROOTS);
  report[theme] = cmp(base.snaps[theme], JSON.parse(r));
  console.log('\n== ' + theme + ' (body.dark=' + await c.ev('document.body.classList.contains("dark")') + ') ==', JSON.stringify({ ...report[theme], sample: undefined }));
  console.log(JSON.stringify(report[theme].sample, null, 1));
}
for (const w of [2200, 2560]) for (const theme of ['light', 'dark']) {
  await c.ev(`if (${theme === 'light'} === document.body.classList.contains('dark')) SK.setTheme('${theme}')`);
  const ids = w === 2200 ? ['d-scr-employees', 'd-scr-detail'] : ['d-scr-employees', 'd-scr-detail', 'd-scr-group', 'd-scr-detail-records'];
  const roots = ids.map(id => `#${id} .sk-frame[data-sk-w="${w}"] .sk-frame__inner`).join(',');
  const out = cmp(base.wide[w + '-' + theme], JSON.parse(await take(roots)));
  report['wide-' + w + '-' + theme] = out;
  console.log('\n== wide ' + w + ' ' + theme + ' ==', JSON.stringify({ ...out, sample: undefined }));
  if (out.onlyBefore || out.onlyAfter || out.positional || out.multiset) console.log(JSON.stringify(out.sample, null, 1));
}
console.log('console at end:', JSON.stringify(c.logs));
fs.writeFileSync('verify-report.json', JSON.stringify(report));
c.close();

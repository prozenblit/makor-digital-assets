import fs from 'node:fs';
import { launch } from './cdp.mjs';
const outDir = process.argv[2] || 'shots-final';
fs.mkdirSync(outDir, { recursive: true });
const base = 'http://localhost:3456/makorx-ai/design-system/showcase';
const c = await launch(9469);
const list = [
  ['01-overview', '#overview', 'light', 'top'],
  ['02-colours-light', '#f-colours', 'light', 'top'],
  ['03-colours-dark', '#f-colours', 'dark', 'top'],
  ['04-radii-light', '#f-radii', 'light', 'top'],
  ['05-component-card-buttons', '#d-btn-filled', 'light', 'card'],
  ['06-component-card-select-dark', '#d-sel-states', 'dark', 'card'],
  ['07-screen-employees-light', '#d-scr-employees', 'light', 'card'],
  ['08-screen-employees-dark', '#d-scr-employees', 'dark', 'card'],
  ['09-screen-timetracking-dark', '#d-scr-tt', 'dark', 'card'],
  ['10-reference-decisions', '#r-decisions', 'light', 'top'],
  ['11-reference-extended-index', '#r-extended-index', 'dark', 'top']
];
let i = 0;
for (const [name, hash, theme, kind] of list) {
  await c.goto(base + '?s=' + (++i) + hash, 1280, 900);
  await c.ev(`SK.setTheme('${theme}')`);
  await c.wait(1500);
  if (kind === 'card') { await c.ev(`document.querySelector(${JSON.stringify(hash)}).scrollIntoView({block:'start'})`); await c.wait(1800); }
  else { await c.ev('window.scrollTo(0,0)'); await c.wait(700); }
  await c.shot(outDir + '/' + name + '.png');
  console.log(name);
}
console.log('console:', JSON.stringify(c.logs));
c.close();

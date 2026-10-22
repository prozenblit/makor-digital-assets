import fs from 'node:fs';
import { launch } from './cdp.mjs';
const base = 'http://localhost:3456/makorx-ai/design-system/';
const R = {};
const c = await launch(9465);
const ok = (name, v, extra) => { R[name] = extra === undefined ? v : { ok: v, ...extra }; console.log((v === true ? 'PASS ' : v === false ? 'FAIL ' : '     ') + name, extra === undefined ? (v === true || v === false ? '' : JSON.stringify(v)) : JSON.stringify(extra)); };

/* ---- old page: expected copy sources and frame markup ---- */
await c.goto(base + 'showcase.old', 1600, 1000);
const old = await c.ev(`(function(){ var o={}; document.querySelectorAll('.sc-demo').forEach(function(d){ var k=d.querySelector('.sc-copy').dataset.snip; var fr=d.querySelector('.sc-frame'); o[d.id]={ key:k, text: fr ? fr.innerHTML.trim() : SNIP[k] }; }); return o; })()`);
ok('old demos', Object.keys(old).length);

/* ---- new page ---- */
const url = base + 'showcase';
await c.goto(url, 1280, 900);
await c.ev('localStorage.clear()');
await c.goto(url, 1280, 900);
ok('console clean at load', c.logs.length === 0, { logs: c.logs });
ok('SK.problems empty', JSON.stringify(await c.ev('SK.problems')) === '[]', { problems: await c.ev('SK.problems') });
const counts = await c.ev(`({ sections: document.querySelectorAll('.sk-section').length, sectionsNoOverview: document.querySelectorAll('.sk-section:not(#overview)').length,
  cards: document.querySelectorAll('.sk-card').length,
  componentCards: [...document.querySelectorAll('.sk-section[id^="c-"] .sk-card')].length,
  screenCards: [...document.querySelectorAll('.sk-section[id^="s-"] .sk-card')].length,
  variants: document.querySelectorAll('.sk-variant').length, screens: document.querySelectorAll('.sk-screen').length, frames: document.querySelectorAll('.sk-frame').length,
  extendedAll: document.querySelectorAll('.sk-badge--extended').length,
  extendedChip: [...document.querySelectorAll('[data-sk-counts] .sk-chip')].map(x=>x.textContent),
  extendedCounted: [...document.querySelectorAll('.sk-badge--extended')].filter(function(b){return !b.closest('#r-extended-index, .sk-legend');}).length,
  extendedInIndex: document.querySelectorAll('#r-extended-index .sk-badge--extended').length,
  extendedDemoCards: [...document.querySelectorAll('.sk-card__head .sk-badge--extended')].length,
  bugRows: document.querySelectorAll('#r-decisions tbody tr').length, flagged: document.querySelectorAll('#r-decisions tr.sc-flagrow').length,
  extIndexRows: document.querySelectorAll('#r-extended-index tbody tr').length, deadRows: document.querySelectorAll('#r-dead-code tbody tr').length, openItems: document.querySelectorAll('#r-open-decisions li').length,
  copyButtons: document.querySelectorAll('[data-sk-copy]').length, templates: document.querySelectorAll('template[data-sk-source]').length,
  sourceLines: [...document.querySelectorAll('.sk-card__src')].filter(function(p){return /^Source: employees.html|^Source: EXTENDED/.test(p.textContent);}).length,
  navLinks: document.querySelectorAll('.sk-nav__link').length, assetsSvgInDom: [...document.images].map(function(i){return i.getAttribute('src');}).length })`);
console.log(JSON.stringify(counts, null, 1)); R.counts = counts;

/* ---- every nav item: opens a non-empty section; section heights ---- */
const ids = await c.ev(`[...document.querySelectorAll('.sk-nav__link')].map(function(a){return a.getAttribute('data-sk-id');})`);
const heights = []; let allNonEmpty = true;
for (const id of ids) {
  await c.ev(`location.hash = '#${id}'`); await c.wait(450);
  const r = await c.ev(`(function(){ var s=document.getElementById('${id}'); var act=document.querySelectorAll('.sk-section.is-active'); return { active: act.length, same: act[0] && act[0].id==='${id}', h: Math.round(s.getBoundingClientRect().height), text: s.textContent.trim().length, cur: (document.querySelector('.sk-nav__link[aria-current=page]')||{}).getAttribute && document.querySelector('.sk-nav__link[aria-current=page]').getAttribute('data-sk-id'), frames: s.querySelectorAll('.sk-frame').length }; })()`);
  heights.push({ id, ...r });
  if (!(r.active === 1 && r.same && r.h > 80 && r.text > 20 && r.cur === id)) { allNonEmpty = false; console.log('  bad nav item', id, JSON.stringify(r)); }
}
ok('every nav item opens a non-empty, single active section', allNonEmpty, { items: ids.length });
const tall = [...heights].sort((a, b) => b.h - a.h).slice(0, 5);
ok('tallest sections @1280', true, { top5: tall.map(t => t.id + ':' + t.h) });
R.heights = heights;
/* frame scale check on a screen section (frame sizes are scaled, not unscaled) */
await c.ev(`location.hash = '#s-employee-list'`); await c.wait(900);
const fr = await c.ev(`[...document.querySelectorAll('#s-employee-list .sk-frame')].map(function(f){ var b=f.querySelector('.sk-frame__box'); return { w: f._sk.w, h: f._sk.h, scale: +f.dataset.skScale, done: f._sk.done, ok: Math.abs(b.getBoundingClientRect().height - f._sk.h * f.dataset.skScale) < 1.5 }; })`);
ok('frame boxes use scaled height', fr.every(x => x.ok), { fr });

/* ---- deep links ---- */
const deep = {};
for (const [h, expectSection] of [['f-colours', 'f-colours'], ['c-actions-buttons', 'c-actions-buttons'], ['d-btn-filled', 'c-actions-buttons'], ['d-scr-employees', 's-employee-list'], ['d-scr-employees-2560', 's-employee-list'],
  ['s-pool', 's-pool'], ['f-colors', 'f-colours'], ['c-buttons', 'c-actions-buttons'], ['d-scr-nav', 's-nav'], ['s-screens', 's-nav'], ['bugs', 'r-decisions'], ['x-index', 'r-extended-index'], ['d-pick-date-popup', 'c-overlays-calendar'], ['d-x-focus', 'c-extended-states'], ['f-colors-status', 'f-colours']]) {
  await c.goto(url + '#' + h, 1280, 900); await c.wait(600);
  const r = await c.ev(`(function(){ var a=document.querySelector('.sk-section.is-active'); var t=document.getElementById('${h}'); var rect=t&&t.getBoundingClientRect(); return { active: a&&a.id, inView: rect ? (rect.top < innerHeight && rect.bottom >= 0 && rect.top >= 40) : null }; })()`);
  deep[h] = r; if (r.active !== expectSection || r.inView === false) { deep[h].FAIL = true; }
}
ok('deep links', Object.values(deep).every(d => !d.FAIL), { deep: Object.entries(deep).filter(([k, v]) => v.FAIL) });

/* ---- ?all ---- */
await c.goto(url + '?all', 1280, 900); await c.wait(500);
const all = await c.ev(`({ visible: [...document.querySelectorAll('.sk-section')].filter(function(s){return s.offsetHeight>0;}).length, total: document.querySelectorAll('.sk-section').length, all: SK.all, problems: SK.problems, imgs: document.images.length })`);
ok('?all shows every section', all.visible === all.total && all.all === true, all);
/* all frames rendered (print path) and assets load */
await c.ev(`window.dispatchEvent(new Event('beforeprint'))`); await c.wait(2500);
const imgs = await c.ev(`({ n: document.images.length, broken: [...document.images].filter(function(i){return !(i.complete && i.naturalWidth>0);}).map(function(i){return i.getAttribute('src');}), srcs: [...new Set([...document.images].map(function(i){return i.getAttribute('src');}))] })`);
ok('images all loaded (after rendering every frame)', imgs.broken.length === 0, { total: imgs.n, distinct: imgs.srcs, broken: imgs.broken });
const bad = c.net.filter(n => n.status >= 400 || n.status === 0);
ok('network: no 4xx/5xx/failed', bad.length === 0, { requests: c.net.length, assets: c.net.filter(n => /assets\//.test(n.url)).map(n => n.status), bad });
ok('console clean after all frames rendered', c.logs.length === 0, { logs: c.logs });

/* ---- Copy HTML for every card ---- */
await c.ev(`Object.defineProperty(navigator,'clipboard',{value:{writeText:function(t){window.__clip=t;return Promise.resolve();}},configurable:true})`);
const cardIds = await c.ev(`[...document.querySelectorAll('.sk-card')].map(function(x){return x.id;})`);
const copyRes = { match: 0, mismatch: [] };
const pickText = old['d-pick-date'].text.split(/\n\n(?=<!-- )/);
for (const id of cardIds) {
  let expected = id === 'd-pick-date' ? pickText.slice(0, 2).join('\n\n') : id === 'd-pick-date-popup' ? pickText.slice(2).join('\n\n') : (old[id] && old[id].text);
  await c.ev(`window.__clip = null; document.querySelector('#${id} [data-sk-copy]').click()`); await c.wait(40);
  const got = await c.ev('window.__clip');
  if (got !== null && expected !== undefined && got.trim() === expected.trim()) copyRes.match++;
  else if (got !== null && expected !== undefined && await c.ev('(function(){ var t=document.createElement("template"); t.innerHTML=' + JSON.stringify(expected) + '; return t.innerHTML.trim()===' + JSON.stringify(got.trim()) + '; })()')) copyRes.boolAttr = (copyRes.boolAttr || 0) + 1;
  else copyRes.mismatch.push({ id, gotLen: got && got.length, expLen: expected && expected.length, firstDiff: got && expected ? [...got].findIndex((ch, i) => ch !== expected[i]) : -1 });
}
ok('Copy HTML == pre-migration source for every card', copyRes.mismatch.length === 0, { cards: cardIds.length, exact: copyRes.match, equalExceptBooleanAttrSerialisation: copyRes.boolAttr || 0, mismatch: copyRes.mismatch.slice(0, 12) });
R.copyRes = copyRes;
const copyState = await c.ev(`(function(){ var b=document.querySelector('#d-btn-filled [data-sk-copy]'); b.click(); return new Promise(function(r){ setTimeout(function(){ r({ text:b.textContent, state:b.getAttribute('data-state') }); }, 100); }); })()`);
ok('Copy button feedback', copyState.text === 'Copied ✓', copyState);

/* ---- theme toggle ---- */
await c.goto(url + '#s-nav', 1280, 900); await c.wait(1000);
const probe = `(function(){ var q=function(s){var e=document.querySelector(s);return e?getComputedStyle(e).backgroundColor:null;}; var f=document.querySelector('.sk-frame__inner');
  return { dark: document.body.classList.contains('dark'), attr: document.documentElement.getAttribute('data-sk-theme'), pressed: document.querySelector('[data-sk-theme-toggle]').getAttribute('aria-pressed'), top: q('.sk-top'), main: q('.sk-app'), frame: f&&getComputedStyle(f).backgroundColor, frameNav: f && getComputedStyle(f.querySelector('.top-nav')).backgroundColor, ls: [localStorage.getItem('sk-theme'), localStorage.getItem('makor-dm')], sw: [...document.querySelectorAll('.dm-switch')].filter(function(s){return s.classList.contains('on');}).length }; })()`;
const t0 = await c.ev(probe);
await c.ev(`document.querySelector('[data-sk-theme-toggle]').click()`); await c.wait(700);
const t1 = await c.ev(probe);
await c.ev(`document.querySelector('[data-sk-theme-toggle]').click()`); await c.wait(700);
const t2 = await c.ev(probe);
ok('theme toggle light->dark flips chrome + frames', t0.dark === false && t1.dark === true && t1.attr === 'dark' && t1.pressed === 'true' && t0.top !== t1.top && t0.frame !== t1.frame && t0.frameNav !== t1.frameNav, { t0, t1 });
ok('theme toggle dark->light restores everything', t2.dark === false && t2.attr === 'light' && t2.pressed === 'false' && t2.top === t0.top && t2.frame === t0.frame && t2.main === t0.main, { t2 });
await c.ev(`SK.setTheme('dark')`); await c.wait(300);
await c.goto(url + '#c-actions-buttons', 1280, 900); await c.wait(800);
const t3 = await c.ev(probe.replace("document.querySelector('.sk-frame__inner')", 'null'));
ok('dark persists across reload', t3.dark === true && t3.attr === 'dark' && t3.pressed === 'true', { t3 });
// theme toggle from inside the app's profile menu row still flips the page (old behaviour)
await c.ev(`localStorage.clear()`);
await c.goto(url + '?r=1#s-nav', 1280, 900); await c.wait(1500);
const viaMenu = await c.ev(`(function(){ var it=document.querySelector('.sk-frame__inner .profile-drop-item'); if(!it) return 'no row'; it.click(); return { dark: document.body.classList.contains('dark'), pressed: document.querySelector('[data-sk-theme-toggle]').getAttribute('aria-pressed') }; })()`);
ok('profile-menu row (app behaviour) toggles theme and the top-bar button follows', viaMenu.dark === true && viaMenu.pressed === 'true', viaMenu);
await c.ev(`localStorage.clear()`);

/* ---- keyboard / search ---- */
await c.goto(url, 1280, 900);
await c.ev(`document.querySelector('.sk-nav__link').focus()`);
await c.key('ArrowDown'); await c.key('ArrowDown');
const foc = await c.ev(`document.activeElement.textContent`);
await c.key('End'); const endFoc = await c.ev(`document.activeElement.textContent`);
await c.key('Home'); const homeFoc = await c.ev(`document.activeElement.textContent`);
ok('nav arrow/Home/End', foc === 'Colours' && /Open decisions/.test(endFoc) && homeFoc === 'Overview', { foc, endFoc, homeFoc });
await c.ev(`var i=document.querySelector('[data-sk-search]'); i.focus(); i.value='datepicker'; i.dispatchEvent(new Event('input',{bubbles:true}))`);
const srch = await c.ev(`[...document.querySelectorAll('.sk-nav__link:not(.is-hidden)')].map(function(a){return a.textContent;})`);
ok('search filters nav', srch.length >= 2 && srch.some(s => /Calendar popup/.test(s)) && srch.some(s => /Datepicker/.test(s)), { srch });

/* ---- lazy frames ---- */
await c.goto(url + '#s-employee-list', 1280, 900); await c.wait(900);
const lazy = await c.ev(`[...document.querySelectorAll('#s-employee-list .sk-frame')].map(function(f){return f._sk.done;})`);
ok('frames far down render lazily', lazy[0] === true && lazy.includes(false), { lazy });
/* 100% toggle keeps fixed overlays inside the frame */
await c.goto(url + '#s-new-employee', 1280, 900); await c.wait(900);
const modalPos = await c.ev(`(function(){ var f=document.querySelector('#s-new-employee .sk-frame'); f.closest('.sk-screen').querySelector('[data-sk-frame-mode="100"]').click(); var m=f.querySelector('.modal-overlay'); if(!m) return 'no overlay'; var r=m.getBoundingClientRect(), fr=f.querySelector('.sk-frame__inner').getBoundingClientRect(); return { inside: r.left>=fr.left-1 && r.top>=fr.top-1 && r.right<=fr.right+1 && r.bottom<=fr.bottom+1, r:[r.left,r.top,r.right,r.bottom].map(Math.round), fr:[fr.left,fr.top,fr.right,fr.bottom].map(Math.round) }; })()`);
ok('100% mode keeps position:fixed overlays inside the frame', modalPos && modalPos.inside === true, { modalPos });

console.log('console at end:', JSON.stringify(c.logs));
fs.writeFileSync('verify-behaviour.json', JSON.stringify(R, null, 1));
c.close();

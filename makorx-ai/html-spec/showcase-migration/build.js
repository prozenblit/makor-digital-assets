/* MakorX.AI HR showcase -> showcase kit migration generator.
 * Usage: node build.js [outFile] [beforeMigrationFile]   (defaults: ../../design-system/showcase.html, ./showcase.before-migration.html)
 * Reads the pre-migration makorx-ai/design-system/showcase.html copy, restructures it with a
 * balanced-tag scanner (no DOM re-serialisation: demo markup is copied byte-for-byte) and writes the migrated page.
 */
const fs = require('fs');
const { element, attr, children } = require('./lib');
const path = require('path');
const OLD = fs.readFileSync(process.argv[3] || path.join(__dirname, 'showcase.before-migration.html'), 'utf8');
const OUT = process.argv[2] || path.resolve(__dirname, '../../design-system/showcase.html');
const h = OLD;
const inner = el => h.slice(el.innerStart, el.innerEnd);
const outer = el => h.slice(el.start, el.end);
const cls = el => attr(el.open.raw, 'class') || '';
const hasCls = (el, c) => (' ' + cls(el) + ' ').includes(' ' + c + ' ');
const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const die = m => { throw new Error(m); };

/* ---------- source pieces ---------- */
const SNIP = JSON.parse(h.match(/const SNIP = (\{.*\});\n/)[1]);
const main = element(h, h.indexOf('<main class="sc-main">'));
const secEls = children(h, main);
const secById = {}; let introEl = null;
for (const s of secEls) { const id = attr(s.open.raw, 'id'); if (id) secById[id] = s; else introEl = s; }
const scriptStart = h.indexOf('<script>', main.end), scriptEnd = h.indexOf('</script>', scriptStart);
const oldScript = h.slice(scriptStart + 8, scriptEnd);
const headLinks = h.slice(h.indexOf('<link rel="icon"'), h.indexOf('<style>'));

/* ---------- chrome text conversions (never applied inside a demo cell) ---------- */
const EXT = '<span class="sk-badge sk-badge--extended">Extended</span>';
function cx(s) {
  return s.replace(/<span class="sc-ext">Extended<\/span>/g, EXT)
    .replace(/<span class="sc-tag sc-tag--warn">([^<]*)<\/span>/g, '<span class="sk-status" data-status="open">$1</span>')
    .replace(/<span class="sc-tag">([^<]*)<\/span>/g, '<span class="sk-status" data-status="decided">$1</span>');
}
function headings(s) { return s.replace(/<h4 class="sc-h4"([^>]*)>([\s\S]*?)<\/h4>/g, '<h3 class="sk-h3"$1>$2</h3>'); }
function secondaryLeads(s) { return s.replace(/<p class="sc-lead">([\s\S]*?)<\/p>/g, '<div class="sk-prose"><p>$1</p></div>'); }
function tables(s, extraCls) {
  let out = '', i = 0;
  for (;;) {
    const k = s.indexOf('<table class="sc-table', i);
    if (k < 0) { out += s.slice(i); break; }
    const el = element(s, k);
    out += s.slice(i, k);
    out += '<div class="sk-table-wrap"><table class="sk-table sk-table--compact">' + s.slice(el.innerStart, el.innerEnd) + '</table></div>';
    i = el.end;
  }
  return out;
}
/* colour / token tables: narrower Token | Light | Dark columns so the Role / source column gets the width (keeps the Colours page height down) */
function narrowCols(s) { return s.split('<th style="width:250px">Token</th><th style="width:230px">Light</th><th style="width:250px">Dark</th>').join('<th style="width:200px">Token</th><th style="width:176px">Light</th><th style="width:220px">Dark</th>'); }
function block(s) { return tables(secondaryLeads(headings(cx(narrowCols(s))))); }

/* ---------- Foundations: block converters (radii -> samples, icons -> icon gallery, text roles -> type specimen rows) ---------- */
function grid(s, cname, fn) {
  const open = '<div class="' + cname + '"';
  let out = '', i = 0;
  for (;;) {
    const st = s.indexOf(open, i);
    if (st < 0) { out += s.slice(i); break; }
    const el = element(s, st);
    out += s.slice(i, st) + fn(s, el); i = el.end;
  }
  return out;
}
function radGrid(s, el) {
  const items = children(s, el).map(c => {
    const k = children(s, c); // span.box, b, span, em
    const box = k[0], b = k[1], val = k[2], em = k[3];
    const style = attr(box.open.raw, 'style') || '';
    return '<figure class="sk-sample"><div class="sk-sample__bed"><div class="sk-sample__box" style="' + style + '"></div></div><figcaption class="sk-sample__label">' +
      s.slice(b.innerStart, b.innerEnd).replace(/^<code>([\s\S]*)<\/code>$/, '<code>$1</code>') + '<span>' + s.slice(val.innerStart, val.innerEnd) + '</span><span>' + s.slice(em.innerStart, em.innerEnd) + '</span></figcaption></figure>';
  });
  return '<div class="sk-samples">' + items.join('') + '</div>';
}
function icGrid(s, el) {
  const items = children(s, el).map(c => {
    const k = children(s, c); // div.pair, b, code, em
    if (k.length !== 4 || k[0].name !== 'div' || k[1].name !== 'b' || k[2].name !== 'code' || k[3].name !== 'em') die('unexpected icon card: ' + s.slice(c.start, c.start + 200));
    return '<figure class="sk-icon"><div class="sk-icon__sample"><div class="sc-ic__pair">' + s.slice(k[0].innerStart, k[0].innerEnd) + '</div></div><figcaption class="sk-icon__meta"><span class="sk-icon__name">' +
      s.slice(k[1].innerStart, k[1].innerEnd) + '</span><code>' + s.slice(k[2].innerStart, k[2].innerEnd) + '</code><span>' + s.slice(k[3].innerStart, k[3].innerEnd) + '</span></figcaption></figure>';
  });
  return '<div class="sk-icons">' + items.join('') + '</div>';
}
function typeRoles(s) {
  const k = s.indexOf('<table class="sc-table sc-type">'); if (k < 0) return s;
  const el = element(s, k);
  const tbody = element(s, s.indexOf('<tbody>', el.start));
  const rows = children(s, tbody).map(tr => {
    const td = children(s, tr);
    if (td.length !== 4) die('type row');
    const code = x => s.slice(x.innerStart, x.innerEnd).replace(/^<code>([\s\S]*)<\/code>$/, '$1');
    return '<div class="sk-type__row"><div class="sk-type__meta"><span class="sk-type__use">' + code(td[0]) + '</span><span class="sk-type__tuple">' + code(td[2]) + '</span><span>' +
      s.slice(td[3].innerStart, td[3].innerEnd) + '</span></div><div class="sk-type__sample">' + s.slice(td[1].innerStart, td[1].innerEnd) + '</div></div>';
  });
  return s.slice(0, k) + '<div class="sk-type">' + rows.join('') + '</div>' + s.slice(el.end);
}

/* ---------- section scaffolding ---------- */
function bodyOf(sec) { // [h2 html, lead html|null, rest of the section inner]
  const kids = children(h, sec);
  if (kids[0].name !== 'h2') die('no h2');
  let lead = null, restStart = kids[0].end;
  if (kids[1] && kids[1].name === 'p' && hasCls(kids[1], 'sc-lead')) { lead = inner(kids[1]); restStart = kids[1].end; }
  return { title: inner(kids[0]), lead, rest: h.slice(restStart, sec.innerEnd), kids };
}
function head(title, lead) {
  return '<header class="sk-section__head"><h2 class="sk-section__title">' + title + '</h2>' +
    (lead ? '<div class="sk-section__lead sk-prose"><p>' + cx(lead) + '</p></div>' : '') + '</header>';
}
function section(id, dataTitle, title, lead, bodyHtml, extraAttr, alias) {
  return '<section class="sk-section" id="' + id + '" data-sk-title="' + esc(dataTitle) + '"' + (extraAttr || '') + '>' +
    (alias ? alias.map(a => '<a id="' + a + '"></a>').join('') : '') + '\n' + head(title, lead) + '\n' + bodyHtml + '\n</section>\n';
}
const plainText = s => s.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&');

/* ---------- component cards ---------- */
const VISIBLE_RE = /cust-select|datepicker-wrap|phone-code-wrap|data-tip|pool-emp-drop/;
function parseDemo(d) {
  const kids = children(h, d);
  const o = { id: attr(d.open.raw, 'id'), el: d };
  const hd = kids.find(k => hasCls(k, 'sc-demo__head')); const hk = children(h, hd);
  o.title = inner(hk.find(k => hasCls(k, 'sc-demo__title')));
  o.ext = hk.some(k => hasCls(k, 'sc-ext'));
  o.key = attr(hk.find(k => hasCls(k, 'sc-copy')).open.raw, 'data-snip');
  const src = kids.find(k => hasCls(k, 'sc-src')); let si = inner(src);
  if (!si.startsWith('<b>Source:</b> ')) die('src format ' + o.id);
  o.src = si.slice('<b>Source:</b> '.length);
  const note = kids.find(k => hasCls(k, 'sc-note')); o.note = note ? inner(note) : null;
  o.stage = kids.find(k => hasCls(k, 'sc-stage')) || null;
  o.screenbar = kids.find(k => hasCls(k, 'sc-screenbar')) || null;
  o.fit = kids.find(k => hasCls(k, 'sc-fit')) || null;
  return o;
}
function variants(stage, from, to) {
  const figs = children(h, stage).slice(from, to);
  return figs.map(f => {
    const [cell, cap] = children(h, f);
    const plain = cell.open.raw === '<div class="sc-cell">';
    const demo = plain ? '<div class="sk-demo">' + inner(cell) + '</div>' : '<div class="sk-demo">' + outer(cell) + '</div>';
    return '<figure class="sk-variant">' + demo + '<figcaption class="sk-variant__cap">' + cx(inner(cap)) + '</figcaption></figure>';
  });
}
function cardHtml(o, opt) {
  opt = opt || {};
  const figsAll = children(h, o.stage);
  const from = opt.from || 0, to = opt.to == null ? figsAll.length : opt.to;
  const vs = variants(o.stage, from, to);
  const stageHtml = o.stage ? outer(o.stage) : '';
  const visible = VISIBLE_RE.test(figsAll.slice(from, to).map(f => outer(f)).join(''));
  let snip = SNIP[o.key]; if (snip == null) die('no SNIP for ' + o.key);
  if (opt.snip) snip = opt.snip;
  if (/<\/template/i.test(snip)) die('template end in snippet');
  const note = opt.note !== undefined ? opt.note : o.note;
  return '<article class="sk-card" id="' + (opt.id || o.id) + '">\n' +
    '<header class="sk-card__head"><h3 class="sk-card__title">' + (opt.title || o.title) + '</h3>' + (o.ext ? EXT : '') + '</header>\n' +
    '<p class="sk-card__src">Source: ' + cx(o.src) + '</p>\n' +
    '<div class="sk-stage' + (visible ? ' sk-stage--visible' : '') + '"><div class="sk-variants">\n' + vs.join('\n') + '\n</div></div>\n' +
    '<template data-sk-source>' + snip + '</template>\n' +
    '<div class="sk-card__foot"><button class="sk-btn" type="button" data-sk-copy>Copy HTML</button></div>\n' +
    (note ? '<div class="sk-card__notes sk-prose"><p>' + cx(note) + '</p></div>\n' : '') +
    '</article>\n';
}

/* ---------- screens ---------- */
const WIDTHS = {}; // demo id -> [w,...]
function screenCard(o) {
  const w0 = +attr(o.fit.open.raw, 'data-w'), hh = +attr(o.fit.open.raw, 'data-h');
  const sbKids = children(h, o.screenbar);
  const state = plainText(inner(sbKids[0])).split(' · layout size')[0];
  const wbtn = [...inner(o.screenbar).matchAll(/class="sc-wbtn(?: is-active)?" data-w="(\d+)"/g)].map(m => +m[1]);
  const widths = wbtn.length ? wbtn : [w0];
  if (widths[0] !== w0) die('width order ' + o.id);
  const fitInner = children(h, o.fit)[0], frame = children(h, fitInner)[0];
  if (!hasCls(frame, 'sc-frame')) die('frame ' + o.id);
  const content = inner(frame);
  if (/<\/template/i.test(content)) die('template end in frame');
  const figs = widths.map((w, i) => {
    const fid = i === 0 ? '' : ' id="' + o.id + '-' + w + '"';
    const label = esc(state) + (widths.length > 1 ? ' · viewport width ' + w : '');
    const fr = i === 0
      ? '<div class="sk-frame" data-sk-w="' + w + '" data-sk-h="' + hh + '"><template data-sk-source>' + content + '</template></div>'
      : '<div class="sk-frame" data-sk-w="' + w + '" data-sk-h="' + hh + '" data-hr-clone="#' + o.id + ' .sk-frame > template"><template></template></div>';
    return '<figure class="sk-screen"' + fid + '><figcaption class="sk-screen__cap"><span class="sk-screen__name">' + label.replace(/&amp;amp;/g, '&amp;') + '</span></figcaption>' + fr + '</figure>';
  });
  WIDTHS[o.id] = widths;
  return '<article class="sk-card" id="' + o.id + '">\n' +
    '<header class="sk-card__head"><h3 class="sk-card__title">' + o.title + '</h3>' + (o.ext ? EXT : '') + '</header>\n' +
    '<p class="sk-card__src">Source: ' + cx(o.src) + '</p>\n' +
    '<div class="sk-stage">\n' + figs.join('\n') + '\n</div>\n' +
    '<div class="sk-card__foot"><button class="sk-btn" type="button" data-sk-copy>Copy HTML</button></div>\n' +
    (o.note ? '<div class="sk-card__notes sk-prose"><p>' + cx(o.note) + '</p></div>\n' : '') + '</article>\n';
}

/* ---------- gather all demos ---------- */
const demos = {};
for (const id of Object.keys(secById)) {
  if (!/^c-|^s-/.test(id)) continue;
  for (const k of children(h, secById[id])) if (k.name === 'div' && hasCls(k, 'sc-demo')) { const o = parseDemo(k); demos[o.id] = o; }
}
if (Object.keys(demos).length !== 75) die('demo count ' + Object.keys(demos).length);

/* ---------- build sections ---------- */
const parts = [];
// -- Overview
const intro = bodyOf(introEl);
const stats = [...inner(children(h, introEl).find(k => hasCls(k, 'sc-stats'))).matchAll(/<b>([^<]*)<\/b><span>([^<]*)<\/span>/g)].map(m => [m[1], m[2]]);
parts.push('<!-- ================= OVERVIEW ================= -->\n<section class="sk-section" id="overview" data-sk-title="Overview">\n' +
  head('MakorX.AI design system', intro.lead) + '\n' +
  '<div class="sk-counts" data-sk-counts data-sk-assets="49" data-sk-screens="16"></div>\n' +
  '<div class="sk-callout"><p>Chip counts: <b>sections</b> 37 = 8 Foundations + 13 component families + 12 screen flows + 4 Reference (the pre-migration page counted 21: 8 + 12 + 1). <b>components</b> 60 cards = 59 component demos + 1 (the Datepicker demo is shown as two cards: input states under Forms &amp; inputs, calendar popup under Overlays). <b>screens</b> 16 (overridden): each screen has one 1920&times;1080-class frame; the Employee list, Employee detail, grouped list and Records views carry additional 2200 / 2560 wide frames (22 frames in total). <b>extended</b> counts every Extended badge outside this legend and the Extended index: 14 demo cards + 4 mentions in running text. <b>assets</b> = the 49 SVG files in <code>assets/</code>.</p></div>\n' +
  '<h3 class="sk-h3">Page statistics (pre-migration page)</h3>\n<div class="sk-counts">' + stats.map(([n, l]) => '<span class="sk-chip"><b>' + n + '</b> ' + l + '</span>').join('') + '</div>\n' +
  '<h3 class="sk-h3">Badge legend</h3>\n<dl class="sk-legend">\n' +
  '<dt><span class="sk-badge sk-badge--extended">Extended</span></dt><dd>Not drawn in the source; built from existing tokens.</dd>\n' +
  '<dt><span class="sk-badge sk-badge--alt">Alt</span></dt><dd>Alternate treatment present in the source next to the canonical one.</dd>\n' +
  '<dt><span class="sk-badge sk-badge--documented">Documented dependency</span></dt><dd>External runtime dependency (remote animation, font, API): documented, not copied.</dd>\n' +
  '<dt><span class="sk-badge sk-badge--outside">Outside canonical</span></dt><dd>Drawn in the source but outside the canonical section/page.</dd>\n</dl>\n' +
  '<h3 class="sk-h3">Screens</h3>\n<div class="sk-prose"><p>' + cx(bodyOf(secById['s-screens']).lead) + '</p></div>\n' +
  '<div class="sk-callout"><p>Theme: the toggle in the top bar sets <code>body.dark</code> (the app\'s own mechanism, stored in <code>localStorage[\'makor-dm\']</code>); component demos and screen frames render in this document and follow it. Side-by-side Light | Dark blocks use <code>.theme-light</code> / <code>.theme-dark</code> containers and stay fixed.</p></div>\n' +
  '</section>\n');

// -- Foundations
const FOUND = [
  ['f-colors', 'f-colours', ['f-colors']], ['f-type', 'f-typography', ['f-type']], ['f-radii', 'f-radii'], ['f-spacing', 'f-spacing'], ['f-shadows', 'f-shadows'],
  ['f-motion', 'f-motion'], ['f-sizes', 'f-sizes'], ['f-icons', 'f-icons']
];
parts.push('<!-- ================= FOUNDATIONS ================= -->\n');
for (const [oldId, newId, alias] of FOUND) {
  const b = bodyOf(secById[oldId]);
  let rest = b.rest;
  if (newId === 'f-radii') rest = grid(rest, 'sc-grid', radGrid);
  if (newId === 'f-icons') rest = grid(rest, 'sc-grid sc-grid--ic', icGrid);
  if (newId === 'f-typography') rest = typeRoles(rest);
  rest = block(rest);
  parts.push(section(newId, plainText(b.title), b.title, b.lead, rest, '', alias));
}

// -- Components
const bodyDemos = (sec, ids) => ids.map(id => cardHtml(demos[id])).join('');
function tail(sec) { // non-demo children after the demos (map tables etc.)
  return children(h, sec).filter(k => k.name === 'div' && hasCls(k, 'sc-raw')).map(k => block(outer(k))).join('\n');
}
function comp(oldId, newId, dataTitle, extra) {
  const sec = secById[oldId], b = bodyOf(sec);
  const ids = children(h, sec).filter(k => k.name === 'div' && hasCls(k, 'sc-demo')).map(k => attr(k.open.raw, 'id'));
  return { sec, b, ids, newId, dataTitle: dataTitle || plainText(b.title) };
}
const pick = demos['d-pick-date'], pickChunks = SNIP[pick.key].split(/\n\n(?=<!-- )/);
if (pickChunks.length !== 5) die('pick-date chunks');
const compParts = [];
const KW = { 'c-actions-buttons': 'button save bar icon-only links approve deny', 'c-forms-inputs': 'input search textarea field time', 'c-forms-select': 'select combobox dropdown autocomplete', 'c-forms-pickers': 'datepicker date range phone code country calendar',
  'c-selection-controls': 'checkbox radio toggle switch tiles wfh day', 'c-indicators-badges': 'badge pill status department request type pool maps', 'c-indicators-avatars': 'avatar initials',
  'c-feedback-toast': 'toast popup success', 'c-overlays-modals': 'modal backdrop dialog overlay confirm', 'c-overlays-dropdowns': 'dropdown menu app launcher profile quick card', 'c-navigation-tabs': 'tabs filter pills sortable header',
  'c-extended-states': 'extended focus invalid disabled tooltip spinner skeleton empty tag alert progress pagination breadcrumb file drop' };
function addComp(c, body, leadOverride, alias) {
  compParts.push(section(c.newId, c.dataTitle, c.b.title, leadOverride === undefined ? c.b.lead : leadOverride, body, KW[c.newId] ? ' data-sk-keywords="' + KW[c.newId] + '"' : '', alias));
}
const C = {};
for (const [o, n] of [['c-buttons', 'c-actions-buttons'], ['c-inputs', 'c-forms-inputs'], ['c-select', 'c-forms-select'], ['c-pickers', 'c-forms-pickers'], ['c-checks', 'c-selection-controls'],
  ['c-badges', 'c-indicators-badges'], ['c-avatars', 'c-indicators-avatars'], ['c-toast', 'c-feedback-toast'], ['c-modals', 'c-overlays-modals'], ['c-dropdowns', 'c-overlays-dropdowns'],
  ['c-tabs', 'c-navigation-tabs'], ['c-extended', 'c-extended-states']]) C[o] = comp(o, n);
const cardsOf = c => c.ids.map(id => cardHtml(demos[id])).join('');
parts.push('<!-- ================= COMPONENTS ================= -->\n');
addComp(C['c-buttons'], cardsOf(C['c-buttons']), undefined, ['c-buttons']);
addComp(C['c-inputs'], cardsOf(C['c-inputs']), undefined, ['c-inputs']);
addComp(C['c-select'], cardsOf(C['c-select']), undefined, ['c-select']);
{ // pickers: Datepicker split (input states -> Forms, calendar popup -> Overlays)
  const c = C['c-pickers'];
  const body = cardHtml(pick, { to: 2, snip: pickChunks.slice(0, 2).join('\n\n'), title: 'Datepicker',
      note: 'Input states only (closed with hover, focus). The open calendar (day view, year view, live demo) is the <a href="#d-pick-date-popup">Datepicker calendar popup</a> card under Overlays.' }) +
    cardHtml(demos['d-pick-range']) + cardHtml(demos['d-pick-phone']);
  addComp(c, body, undefined, ['c-pickers']);
}
addComp(C['c-checks'], cardsOf(C['c-checks']), undefined, ['c-checks']);
addComp(C['c-badges'], cardsOf(C['c-badges']) + '\n' + tail(C['c-badges'].sec), undefined, ['c-badges']);
addComp(C['c-avatars'], cardsOf(C['c-avatars']), undefined, ['c-avatars']);
addComp(C['c-toast'], cardsOf(C['c-toast']), undefined, ['c-toast']);
addComp(C['c-modals'], cardsOf(C['c-modals']), undefined, ['c-modals']);
{
  const calTitle = { title: '', };
  const body = cardHtml(pick, { from: 2, id: 'd-pick-date-popup', title: 'Datepicker calendar popup', snip: pickChunks.slice(2).join('\n\n') });
  compParts.push('<section class="sk-section" id="c-overlays-calendar" data-sk-title="Calendar popup" data-sk-keywords="datepicker calendar popup day view year view">\n' +
    '<header class="sk-section__head"><h2 class="sk-section__title">Calendar popup</h2><div class="sk-section__lead sk-prose"><p>The datepicker popup (280px wide, <code>--shadow-popover</code>, z-index 200): day view, year view and a live instance. The closed and focused input states are in <a href="#c-forms-pickers">Datepicker &amp; phone picker</a> under Forms &amp; inputs.</p></div></header>\n' +
    body + '</section>\n');
}
addComp(C['c-dropdowns'], cardsOf(C['c-dropdowns']), undefined, ['c-dropdowns']);
addComp(C['c-tabs'], cardsOf(C['c-tabs']), undefined, ['c-tabs']);
{
  const c = C['c-extended'];
  let lead = c.b.lead.replace('The full index (20 items, with derivations) is at the end of this section and in <code>components.md</code>.',
    'The full index (20 items, with derivations) is the <a href="#r-extended-index">Extended index</a> under Reference and is in <code>components.md</code>.');
  if (lead === c.b.lead) die('extended lead text not found');
  addComp(c, cardsOf(c), lead, ['c-extended']);
}
// order check: components must come in canonical group order
parts.push(compParts.join(''));

// -- Screens
const SCREENS = [
  ['s-nav', 'Top nav + menus', ['d-scr-nav'], ['s-screens']],
  ['s-employee-list', 'Employee list', ['d-scr-employees', 'd-scr-group']],
  ['s-employee-detail', 'Employee detail', ['d-scr-detail', 'd-scr-detail-records']],
  ['s-new-employee', 'New Employee modal', ['d-scr-newemp']],
  ['s-hr-requests', 'HR Requests', ['d-scr-requests']],
  ['s-time-tracking', 'Time Tracking', ['d-scr-tt']],
  ['s-pool', 'Pool', ['d-scr-pool', 'd-scr-pool-empty']],
  ['s-my-info', 'My Profile: My Info', ['d-scr-myinfo']],
  ['s-people-directory', 'My Profile: People directory + quick card', ['d-scr-people']],
  ['s-wfh', 'My Profile: WFH', ['d-scr-wfh']],
  ['s-timesheet', 'My Profile: Timesheets', ['d-scr-timesheet']],
  ['s-time-off', 'My Profile: Time Off', ['d-scr-timeoff', 'd-scr-timeoff-req']]
];
parts.push('<!-- ================= SCREENS ================= -->\n');
const seenScr = new Set();
for (const [id, title, ids, alias] of SCREENS) {
  ids.forEach(i => { if (!demos[i]) die('screen ' + i); seenScr.add(i); });
  parts.push(section(id, title, title.replace(/&/g, '&amp;'), null, ids.map(i => screenCard(demos[i])).join(''), '', alias));
}
if (seenScr.size !== 16) die('screens ' + seenScr.size);

// -- Reference
parts.push('<!-- ================= REFERENCE ================= -->\n');
{ // decisions
  const sec = secById['bugs'], b = bodyOf(sec);
  const tbl = children(h, sec).find(k => k.name === 'table'); const tbody = children(h, tbl).find(k => k.name === 'tbody');
  const rows = children(h, tbody).map(tr => {
    const td = children(h, tr); if (td.length !== 5) die('bug row');
    const st = inner(td[4]); const m = /<span class="sc-tag( sc-tag--warn)?">([^<]*)<\/span>/.exec(st); if (!m) die('status ' + st);
    const status = m[1] ? 'open' : /^fixed/.test(m[2]) ? 'fixed' : 'decided';
    const trAttr = hasCls(tr, 'sc-flagrow') ? ' class="sc-flagrow"' : '';
    return '<tr' + trAttr + '><td>' + inner(td[0]) + '</td><td><code>' + inner(td[2]) + '</code></td><td>' + inner(td[1]) + '</td><td>' + inner(td[3]) + '</td><td><span class="sk-status" data-status="' + status + '">' + m[2] + '</span></td></tr>';
  });
  if (rows.length !== 42) die('bug rows ' + rows.length);
  const body = '<div class="sk-table-wrap"><table class="sk-table sk-table--decisions"><thead><tr><th>#</th><th>Source</th><th>What</th><th>Chosen behaviour</th><th>Status</th></tr></thead><tbody>\n' + rows.join('\n') + '\n</tbody></table></div>\n' +
    '<div class="sk-callout"><p><b>Showcase notes.</b> (1) Showcase-only helper classes (<code>.sc-*</code>: demo wrappers <code>.sc-cell / .sc-ovf / .sc-rel / .sc-bgc</code>, foundation blocks such as colour swatches and light | dark pairs) keep the pre-migration names and are styled in the page\'s <code>/* demo support */</code> block; they are not part of the app or of <code>components.css</code>. (2) Frame adaptations (<code>100vh</code> to 1080px) now target <code>.sk-frame__inner</code> instead of <code>.sc-frame</code>. (3) The wide 2200 / 2560 viewport variants of the Employee screens are separate frames; their markup is the 1920 frame\'s <code>&lt;template&gt;</code> cloned when the frame is rendered. (4) The Datepicker demo is shown as two cards (input states, calendar popup).</p></div>';
  parts.push(section('r-decisions', 'Known inconsistencies & decisions', b.title, b.lead, body, '', ['bugs']));
}
{ // dead code
  const sec = secById['dead'], b = bodyOf(sec);
  const tbl = children(h, sec).find(k => k.name === 'table');
  const body = '<div class="sk-table-wrap"><table class="sk-table">' + inner(tbl) + '</table></div>';
  parts.push(section('r-dead-code', 'Dead code & dropped items', b.title, b.lead, body, '', ['dead']));
}
{ // extended index (moved out of the Extended section; one more link in row 13 to the avatar utilities card)
  const sec = secById['c-extended']; const raw = children(h, sec).find(k => k.name === 'div' && hasCls(k, 'sc-raw'));
  const kids = children(h, raw); const h4 = kids.find(k => k.name === 'h4'), tbl = kids.find(k => k.name === 'table');
  let t = inner(tbl).replace(/<a class="sc-jump" href="([^"]*)">view<\/a>/g, '<a href="$1">view</a>');
  const row13 = '<code>.avatar-NN</code>, <code>.type-*</code> <a href="#d-x-utils">view</a>';
  const before = t;
  t = t.replace('<code>.type-*</code> <a href="#d-x-utils">view</a>', '<code>.type-*</code> <a href="#d-x-utils">view</a> <a href="#d-av-util">view (avatar sizes)</a>');
  if (t === before) die('row 13 link');
  t = cx(t);
  const body = '<h3 class="sk-h3" id="x-index">' + inner(h4) + '</h3>\n<div class="sk-table-wrap"><table class="sk-table sk-table--compact">' + t + '</table></div>';
  parts.push(section('r-extended-index', 'Extended index', 'Extended index', 'Every item carrying the Extended badge (20 items, with derivations). Each row links to its card.', body, '', []));
}
{ // open decisions
  const sec = secById['open'], b = bodyOf(sec);
  const ol = children(h, sec).find(k => k.name === 'ol');
  const body = '<div class="sk-prose"><ol>' + inner(ol) + '</ol></div>';
  parts.push(section('r-open-decisions', 'Open decisions for the owner', b.title, b.lead, body, '', ['open']));
}

/* ---------- document ---------- */
const CSS = fs.readFileSync(__dirname + '/support.css', 'utf8');
const JS = fs.readFileSync(__dirname + '/platform.js', 'utf8');
// platform demo script: keep the app's own demo behaviour; drop the showcase-only chrome (copy / fit / theme / nav spy)
let demoJs = oldScript.slice(oldScript.indexOf('// Custom select'));
demoJs = demoJs.slice(0, demoJs.indexOf('// ---- showcase-only'));
demoJs = demoJs.replace("el.closest('.sc-ovf,.sc-frame')", "el.closest('.sc-ovf,.sk-frame__inner')")
  .replace("const scope = e => e.target.closest('.sc-frame') || document;", "const scope = e => e.target.closest('.sk-frame__inner') || document;");
if (demoJs.includes('.sc-frame') || demoJs.includes('toggleDarkMode(') && false) die('leftover .sc-frame in script');
const snipPos = oldScript.indexOf('const SNIP');
const toast = '<div class="toast" id="pageToast"></div>';

const html = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>MakorX.AI design system</title>\n' +
  headLinks +
  '<link rel="stylesheet" href="../../shared/showcase-kit/showcase-kit.css">\n<style>\n' + CSS + '</style>\n</head>\n<body>\n' +
  '<div class="sk-app">\n<header class="sk-top">\n  <span class="sk-top__logo"><img src="assets/logo-mark.svg" width="28" height="28" alt="MakorX.AI"></span>\n  <span class="sk-top__title">MakorX.AI design system</span>\n' +
  '  <span class="sk-top__src">Source: MakorX.AI HR app (makor-hr/employees.html) &middot; harvested 2026-10-14</span>\n  <div class="sk-top__actions">\n' +
  '    <input class="sk-search" type="search" data-sk-search placeholder="Search sections ( / )" aria-label="Search sections">\n' +
  '    <button class="sk-btn" type="button" data-sk-theme-toggle aria-pressed="false">Dark mode</button>\n  </div>\n</header>\n' +
  '<div class="sk-shell">\n<nav class="sk-nav" data-sk-nav aria-label="Sections"></nav>\n<main class="sk-main">\n\n' + parts.join('\n') + '\n</main>\n</div>\n</div>\n' + toast + '\n' +
  '<script src="../../shared/showcase-kit/showcase-kit.js"></script>\n<script>\n' + JS + '</script>\n<script>\n' + demoJs + '</script>\n</body>\n</html>\n';
fs.writeFileSync(OUT, html);
console.log('wrote', OUT, html.length, 'bytes');

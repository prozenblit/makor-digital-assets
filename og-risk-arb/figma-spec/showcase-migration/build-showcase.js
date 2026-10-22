/* OG Risk Arb showcase -> shared showcase kit migration generator.
 * Input : og.old.html  (the pre-migration showcase.html, 29 sc-* sections)
 * Output: showcase.html (kit structure, see shared/showcase-kit/STRUCTURE.md)
 * Usage : node build.js <old.html> <out.html>
 * Requires: npm i jsdom
 * Demos are moved, never edited: only chrome classes (sc-*) are renamed to kit classes (sk-*).
 */
const { JSDOM } = require('jsdom');
const fs = require('fs');
const SRC = process.argv[2] || 'og.old.html';
const OUT = process.argv[3] || 'showcase.new.html';

const dom = new JSDOM(fs.readFileSync(SRC, 'utf8'));
const doc = dom.window.document;
const $ = (s, r) => (r || doc).querySelector(s);
const $$ = (s, r) => [...(r || doc).querySelectorAll(s)];
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const sq = s => String(s).replace(/\s+/g, ' ').trim();
const log = [];
function warn(m) { log.push(m); console.warn('WARN ' + m); }

/* ---------------------------------------------------------------- badges / captions */
const BADGE = { 'sc-ext': 'extended', 'sc-alt': 'alt', 'sc-outside': 'outside' };
function badgeHTML(sp) {
  const k = Object.keys(BADGE).find(c => sp.classList.contains(c));
  const t = sp.getAttribute('title');
  return `<span class="sk-badge sk-badge--${BADGE[k]}"${t ? ` title="${esc(t)}"` : ''}>${sp.innerHTML}</span>`;
}
function convertCaption(cap) {
  cap.className = 'sk-variant__cap';
  [...cap.querySelectorAll('span')].forEach(sp => {
    if (sp.classList.contains('sc-id')) sp.className = 'sk-id';
    else if (Object.keys(BADGE).some(c => sp.classList.contains(c))) {
      const n = doc.createElement('template'); n.innerHTML = badgeHTML(sp); sp.replaceWith(n.content.firstElementChild);
    }
  });
}

/* ---------------------------------------------------------------- frames inside component cards (sc-fit-s) */
function frameFromFitS(fs_) {
  const inn = $(':scope > .sc-fit-s__in', fs_);
  const w = parseFloat(inn.style.width), h = parseFloat(inn.style.height);
  const fr = doc.createElement('div');
  fr.className = 'sk-frame';
  fr.setAttribute('data-sk-w', w); fr.setAttribute('data-sk-h', h); fr.setAttribute('data-sk-toggle', 'off');
  fr.setAttribute('style', `width:${fs_.style.width}`);
  while (inn.firstChild) fr.appendChild(inn.firstChild);
  return fr;
}
function replaceFitS(root) { $$('.sc-fit-s', root).forEach(f => f.replaceWith(frameFromFitS(f))); }

/* ---------------------------------------------------------------- stage / variants */
function convertFigure(f) {
  f.className = 'sk-variant';
  const demo = $(':scope > .sc-v__demo', f); demo.className = 'sk-demo';
  replaceFitS(demo);
  convertCaption($(':scope > figcaption', f));
}
function convertVariants(v, col) {
  v.className = 'sk-variants' + (col || v.classList.contains('sc-variants--col') || v.classList.contains('sc-col') ? ' sk-variants--col' : '');
  [...v.children].forEach(c => {
    if (c.matches('figure.sc-v')) convertFigure(c);
    else if (c.classList.contains('sc-col')) convertVariants(c, true);
    /* else: bare demo wrapper, untouched */
  });
}
function convertStage(stage) {
  stage.className = 'sk-stage';
  [...stage.children].forEach(c => {
    if (c.classList.contains('sc-variants') || c.classList.contains('sc-row')) convertVariants(c);
    else if (c.classList.contains('sc-fit-s')) c.replaceWith(frameFromFitS(c));
    /* sc-sp handled below; bare divs untouched */
  });
  [...stage.children].forEach(c => {
    if (!c.classList.contains('sc-sp')) return;
    const n = c.nextElementSibling;
    if (n && n.classList.contains('sk-variants')) { n.setAttribute('style', 'margin-top:16px' + (n.getAttribute('style') ? ';' + n.getAttribute('style') : '')); c.remove(); }
    else { warn('sc-sp without following variants in ' + (stage.closest('article') || {}).id); c.className = 'sk-variants'; c.setAttribute('style', 'height:16px'); }
  });
}
/* text the OLD Copy HTML button produced, with sc-fit-s scale wrappers unwrapped to the component markup */
function copyTextOld(stage) {
  const clone = stage.cloneNode(true);
  $$('.sc-fit-s', clone).forEach(f => { const inn = $(':scope > .sc-fit-s__in', f); const frag = doc.createDocumentFragment(); while (inn.firstChild) frag.appendChild(inn.firstChild); f.replaceWith(frag); });
  const demos = $$('.sc-v__demo', clone);
  return demos.length ? demos.map(d => d.innerHTML.trim()).join('\n\n') : clone.innerHTML.trim();
}

function convertCard(card) {
  const head = $(':scope > .sc-card__head', card);
  const title = $('h3', head).innerHTML;
  const badges = $$('.sc-ext,.sc-alt,.sc-outside', head).map(badgeHTML).join('');
  const fig = sq($('.sc-fig', head).textContent);
  const note = $(':scope > .sc-note', card);
  const stage = $(':scope > .sc-stage', card);
  let tpl = '';
  if ($('.sc-fit-s', stage)) {
    const t = doc.createElement('template'); t.setAttribute('data-sk-source', ''); t.textContent = ''; t.innerHTML = copyTextOld(stage);
    tpl = t.outerHTML;
  }
  convertStage(stage);
  return `<article class="sk-card" id="${card.id}"><header class="sk-card__head"><h3 class="sk-card__title">${title}</h3>${badges}</header>` +
    `<p class="sk-card__src">Source: ${esc(fig)}</p>${stage.outerHTML}${tpl}` +
    `<div class="sk-card__foot"><button class="sk-btn" type="button" data-sk-copy>Copy HTML</button></div>` +
    (note ? `<div class="sk-card__notes sk-prose"><p>${note.innerHTML}</p></div>` : '') + `</article>`;
}

/* ---------------------------------------------------------------- section helpers */
function lead(html) {
  if (!html) return { head: '', after: '' };
  return /<code|<b>|<a /.test(html) ? { head: '', after: `<div class="sk-prose"><p>${html}</p></div>` } : { head: `<p class="sk-section__lead">${html}</p>`, after: '' };
}
function section(id, title, leadHTML, body, o) {
  o = o || {};
  const l = lead(leadHTML);
  const anchors = (o.anchors || []).map(a => `<a id="${a}"></a>`).join('');
  return `<section class="sk-section" id="${id}" data-sk-title="${esc(title)}"${o.kw ? ` data-sk-keywords="${esc(o.kw)}"` : ''}>${anchors}` +
    `<header class="sk-section__head"><h2 class="sk-section__title">${esc(title)}</h2>${l.head}</header>${l.after}${body}</section>`;
}
const oldSec = id => { const s = doc.getElementById(id); if (!s) throw new Error('missing old section ' + id); return s; };
const intro = s => { const p = $(':scope > p.sc-intro', s); return p ? p.innerHTML : ''; };
function cardsOf(s, ids) {
  const all = $$(':scope > article.sc-card', s);
  return (ids ? ids.map(i => { const c = all.find(x => x.id === i); if (!c) throw new Error('missing card ' + i); return c; }) : all);
}
const cardTitles = cs => cs.map(c => sq($('h3', $(':scope > .sc-card__head', c)).textContent)).join(' ');
function componentSection(id, title, oldId, cards, o) {
  o = o || {};
  const s = oldSec(oldId);
  const cs = cards || cardsOf(s);
  const body = cs.map(convertCard).join('');
  return section(id, title, o.noLead ? '' : intro(s), body, { anchors: o.anchors === undefined ? [oldId] : o.anchors, kw: cardTitles(cs) + (o.kw ? ' ' + o.kw : '') });
}

/* ---------------------------------------------------------------- foundations */
function swatch(sw) {
  const tile = $('.sc-sw__tile', sw).getAttribute('style').replace(/^background:\s*/, '').replace(/;$/, '');
  const chip = /^var\(--[\w-]+\)$/.test(tile) || /^(#|rgb)/.test(tile) ? `style="--sk-chip: ${tile}"` : `style="background-image: ${tile}"`;
  const name = $('.sc-sw__name', sw).innerHTML, code = $('code', sw).textContent, hex = $('.sc-sw__hex', sw).innerHTML;
  const roleEl = $('.sc-sw__role', sw).cloneNode(true);
  const ids = $$('.sc-id', roleEl).map(i => { const t = i.textContent.trim(); i.remove(); return t; });
  const role = roleEl.innerHTML.trim();
  const src = ids.length ? 'Source: node ' + ids.join(', ') : 'Source: tokens.css (alias)';
  return `<figure class="sk-swatch"><div class="sk-swatch__chip" ${chip}></div><figcaption class="sk-swatch__meta"><span class="sk-swatch__name">${name}</span>` +
    `<code class="sk-swatch__token">${esc(code)}</code><span class="sk-swatch__value">${hex}</span><span class="sk-swatch__role">${role}</span><span class="sk-swatch__src">${esc(src)}</span></figcaption></figure>`;
}
const swGrid = g => `<div class="sk-swatches">${$$(':scope > .sc-sw', g).map(swatch).join('')}</div>`;
const proseP = html => `<div class="sk-prose"><p>${html}</p></div>`;
const table = (heads, rows, cls) => `<div class="sk-table-wrap"><table class="sk-table ${cls || 'sk-table--compact'}"><thead><tr>${heads.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table></div>`;

function fColours() {
  const s = oldSec('f-colour');
  let body = '', first = true;
  for (const c of [...s.children]) {
    if (c.tagName === 'H2') continue;
    if (c.matches('p.sc-intro')) { if (first) { first = false; continue; } body += proseP(c.innerHTML); }
    else if (c.matches('h4.sc-h4')) body += `<h3 class="sk-h3">${c.innerHTML}</h3>`;
    else if (c.matches('h5.sc-h5')) body += `<h4 class="sk-h4">${c.innerHTML}</h4>`;
    else if (c.classList.contains('sc-sw-grid')) body += swGrid(c);
    else throw new Error('f-colour unexpected ' + c.outerHTML.slice(0, 80));
  }
  const p = oldSec('f-pills'), t = $('table', p);
  const rows = $$('tbody tr', t).map(tr => {
    const td = [...tr.children];
    return '<tr>' + td.map(x => x.classList.contains('sc-id') ? `<td><span class="sk-id">${x.innerHTML}</span></td>` : `<td>${x.innerHTML}</td>`).join('') + '</tr>';
  });
  const heads = $$('thead th', t).map(h => h.textContent === 'Figma' ? 'Source (node)' : h.innerHTML);
  body += `<h3 class="sk-h3" id="f-pills">Pill &amp; priority colour map</h3>` + proseP(intro(p)) + table(heads, rows);
  return section('f-colours', 'Colours', intro(s), body, { anchors: ['f-colour'], kw: 'palette swatches tints alias pill priority' });
}

function typeRows(tbl, kind) {
  return $$('tbody tr', tbl).map(tr => {
    const td = [...tr.children];
    if (kind === 'scale') {
      return `<div class="sk-type__row"><div class="sk-type__meta"><span class="sk-type__use">${td[0].innerHTML}</span><span class="sk-type__tuple">${td[1].innerHTML}</span><span>${td[2].innerHTML}</span></div>` +
        `<div class="sk-type__sample" style="white-space:nowrap;overflow-x:auto">${td[3].innerHTML}</div></div>`;
    }
    return `<div class="sk-type__row"><div class="sk-type__meta"><span class="sk-type__use">${td[0].innerHTML}</span><span class="sk-type__tuple">${td[1].innerHTML}</span></div><div class="sk-type__sample">${td[2].innerHTML}</div></div>`;
  }).join('');
}
function fTypography() {
  const s = oldSec('f-type');
  const roles = $('#f-roles', s);
  let body = `<div class="sk-type">${typeRows($('table.sc-tbl--type', s), 'scale')}</div>`;
  body += `<h3 class="sk-h3" id="f-roles">${$('.sc-sub__title', roles).innerHTML}</h3><div class="sk-type">${typeRows($('table', roles), 'roles')}</div>`;
  return section('f-typography', 'Typography', intro(s), body, { anchors: ['f-type'], kw: 'type scale geist inter fonts text roles links' });
}

function fRadii() {
  const s = oldSec('f-radius');
  const items = $$('.sc-rad', s).map(r => {
    const box = $('.sc-rad__box', r).getAttribute('style'), code = $('code', r).textContent;
    const val = $$(':scope > div', r)[1].innerHTML, role = $('.sc-sw__role', r).innerHTML;
    return `<figure class="sk-sample"><div class="sk-sample__bed"><div class="sk-sample__box" style="${box}"></div></div><figcaption class="sk-sample__label"><code>${esc(code)}</code><span>${val} · ${role}</span></figcaption></figure>`;
  });
  return section('f-radii', 'Radii', intro(s), `<div class="sk-samples" style="grid-template-columns:repeat(auto-fill,minmax(200px,1fr))">${items.join('')}</div>`, { anchors: ['f-radius'] });
}

function fSpacing() {
  const s = oldSec('f-space');
  const items = $$('.sc-space', s).map(r => {
    const code = $('code', r).textContent, val = $(':scope > span', r).innerHTML, w = $('i', r).getAttribute('style'), role = $('.sc-sw__role', r).innerHTML;
    return `<figure class="sk-sample"><div class="sk-sample__bed"><div class="sk-sample__box" style="${w};height:8px;background:var(--color-surface-brand);border:0;border-radius:var(--radius-2)"></div></div><figcaption class="sk-sample__label"><code>${esc(code)}</code><span>${val} · ${role}</span></figcaption></figure>`;
  });
  return section('f-spacing', 'Spacing (observed)', intro(s), `<div class="sk-samples" style="grid-template-columns:repeat(auto-fill,minmax(200px,1fr))">${items.join('')}</div>`, { anchors: ['f-space'] });
}

function sizeRows(divs) {
  return divs.map(d => {
    const code = $('code', d).textContent, i = $('i', d), spans = $$(':scope > span', d);
    const bar = i ? `<i style="display:inline-block;background:var(--color-surface-brand);border-radius:var(--radius-2);${i.getAttribute('style')}"></i>` : '';
    return `<tr><td><code>${esc(code)}</code></td><td>${spans[0].innerHTML}</td><td>${bar}</td><td>${$('.sc-sw__role', d).innerHTML}</td></tr>`;
  });
}
function fShadows() {
  const s = oldSec('f-shadow'), row = $('.sc-shadow-row', s), strokes = $('#f-strokes', s);
  const cards = $$('.sc-shadow-card', row).map(c => {
    const sh = c.getAttribute('style').replace(/^box-shadow:\s*/, '').replace(/;$/, '');
    const nm = c.childNodes[0].textContent.trim(), sub = $('.sc-id', c).innerHTML;
    const tok = (sh.match(/var\((--[\w-]+)\)/) || [])[1];
    return `<figure class="sk-sample"><div class="sk-sample__bed"><div class="sk-sample__box" style="background:var(--color-surface-default);border:0;border-radius:var(--radius-8);box-shadow:${sh}"></div></div><figcaption class="sk-sample__label"><code>${tok}</code><span>${nm} · ${sub}</span></figcaption></figure>`;
  });
  const lt = $('table', row);
  const layers = table($$('thead th', lt).map(h => h.innerHTML), $$('tbody tr', lt).map(tr => '<tr>' + [...tr.children].map(x => `<td>${x.innerHTML}</td>`).join('') + '</tr>'));
  const blur = $('.sc-blur-demo', row).outerHTML;
  const strokeRows = sizeRows($$('.sc-size', strokes).filter(d => /^--stroke-/.test($('code', d).textContent)));
  const body = `<h3 class="sk-h3">Effect styles</h3><div class="sk-samples" style="grid-template-columns:repeat(auto-fill,minmax(260px,1fr))">${cards.join('')}</div>` +
    `<h3 class="sk-h3">Shadow layers (effect style "Shadow")</h3>${layers}` +
    `<h3 class="sk-h3">Background blur</h3>${blur}` +
    `<h3 class="sk-h3" id="f-strokes">Stroke weights (inside-aligned)</h3>${proseP($('.sc-intro', strokes).innerHTML)}` +
    table(['Token', 'Value', 'Sample', 'Used for'], strokeRows);
  return section('f-shadows', 'Shadows & effects', intro(s), body, { anchors: ['f-shadow'], kw: 'blur strokes scrim drop shadow' });
}

function fMotion() { return `<section class="sk-section" id="f-motion" data-sk-title="Motion"><header class="sk-section__head"><h2 class="sk-section__title">Motion</h2></header><p class="sk-empty">Not defined in the source.</p></section>`; }

function fSizes() {
  const strokes = $('#f-strokes'), g = oldSec('f-grid');
  const cols = $$('.sc-size-cols > div', strokes);
  const hRows = sizeRows($$('.sc-size', cols[0])), wRows = sizeRows($$('.sc-size', cols[1]).filter(d => /^--w-/.test($('code', d).textContent)));
  const fit = $('.sc-fit', g), inn = $('.sc-fit__in', fit);
  const w = fit.getAttribute('data-w'), h = fit.getAttribute('data-h');
  const hd = ['Token', 'Value', 'Sample', 'Used for'];
  const body = `<h3 class="sk-h3">Control heights</h3>${table(hd, hRows)}<h3 class="sk-h3">Control widths</h3>${table(hd, wRows)}` +
    `<h3 class="sk-h3" id="f-grid">Grid &amp; shell geometry</h3>${proseP(intro(g))}` +
    `<div class="sk-frame" data-sk-w="${w}" data-sk-h="${h}" data-sk-toggle="off"><template><div class="sc-gridmap" style="width:${w}px;height:${h}px">${inn.innerHTML}</div></template></div>`;
  return section('f-sizes', 'Sizes & layout', 'Control heights and widths, and the shell geometry measured on the 1920x1080 frames.', body, { anchors: [], kw: 'control heights widths grid shell geometry nav top bar layout' });
}

function fIcons() {
  const s = oldSec('f-icons'), lg = oldSec('f-logos');
  const cards = [];
  $$('.sc-ico', s).forEach(ico => {
    const nm = $('.sc-ico__name', ico).textContent.trim(), idt = $('.sc-id', ico).textContent.trim();
    if (ico.classList.contains('sc-ico--raster')) {
      cards.push(`<figure class="sk-icon"><div class="sk-icon__sample">${$('.sc-ico__row', ico).innerHTML}</div><figcaption class="sk-icon__meta"><span class="sk-icon__name">${esc(nm)}</span><span>${esc(idt)}</span></figcaption></figure>`);
      return;
    }
    const size = (idt.match(/·\s*([\dx]+)\s*$/) || [])[1] || '';
    $$('.sc-ico__cell', ico).forEach(cell => {
      const lab = $('i', cell).textContent.trim();
      const node = $('img, span.icon', cell);
      let file;
      if (node.tagName === 'IMG') file = node.getAttribute('src').replace(/^assets\//, '');
      else file = ((node.getAttribute('style') || '').match(/url\(assets\/([^)]+)\)/) || [])[1];
      const cls = $('i', cell); cls.remove();
      cards.push(`<figure class="sk-icon"><div class="sk-icon__sample">${cell.innerHTML}</div><figcaption class="sk-icon__meta"><span class="sk-icon__name">${esc(file)}</span><span>${esc(lab)}${size ? ' · ' + size : ''}</span></figcaption></figure>`);
    });
  });
  const logos = $$('.sc-logo', lg).map(l => `<figure class="sk-icon"><div class="sk-icon__sample">${$('.sc-logo__box', l).innerHTML}</div><figcaption class="sk-icon__meta"><span class="sk-icon__name">${$('.sc-ico__name', l).innerHTML}</span><span>${$('.sc-id', l).innerHTML}</span></figcaption></figure>`);
  const body = `<h3 class="sk-h3">Icon gallery</h3><div class="sk-icons" style="grid-template-columns:repeat(auto-fill,minmax(168px,1fr))">${cards.join('')}</div>` +
    `<h3 class="sk-h3" id="f-logos">Logos &amp; brand assets</h3>${proseP(intro(lg))}<div class="sk-icons" style="grid-template-columns:repeat(auto-fill,minmax(220px,1fr))">${logos.join('')}</div>`;
  return { html: section('f-icons', 'Icons & logos', intro(s), body, { anchors: [], kw: 'assets svg logos wordmark monogram mask currentColor' }), cards: cards.length, logos: logos.length };
}

/* ---------------------------------------------------------------- components */
const SEC = [];
function pushSec(html) { SEC.push(html); }
function compSections() {
  const out = [];
  const c = (id, title, oldId, cards, o) => out.push(componentSection(id, title, oldId, cards, o));
  /* actions */
  c('c-actions-buttons', 'Buttons', 'c-buttons');
  const pills = oldSec('c-pills');
  c('c-actions-links', 'Links', 'c-pills', cardsOf(pills, ['p-links']), { anchors: [], noLead: true });
  /* forms */
  c('c-forms-fields', 'Form fields', 'c-fields');
  c('c-forms-rich-text', 'Rich text', 'c-rich');
  /* selection */
  c('c-selection-controls', 'Selection controls & scroll', 'c-selection');
  c('c-selection-day-cell', 'DAY calendar cell', 'c-day');
  c('c-selection-segmented', 'Segmented toggles', 'c-pills', cardsOf(pills, ['p-seg']), { anchors: [], noLead: true });
  /* indicators */
  c('c-indicators-pills-chips', 'Pills, chips & status text', 'c-pills', cardsOf(pills, ['p-pills', 'p-text', 'p-chips']), { noLead: true });
  /* overlays */
  const tb = oldSec('c-topbar');
  c('c-overlays-search-menus', 'Search dropdown & menus', 'c-topbar', cardsOf(tb, ['tb-search', 'tb-account']), { anchors: [], noLead: true });
  /* navigation */
  c('c-navigation-nav', 'Navigation', 'c-nav');
  c('c-navigation-tabs', 'Tabs', 'c-tabs');
  c('c-navigation-top-bar', 'Top bar', 'c-topbar', cardsOf(tb, ['tb-topbar']), { noLead: true });
  /* data display */
  c('c-data-tables', 'Tables', 'c-tables');
  /* platform patterns */
  c('c-patterns-dashboard-panels', 'Dashboard panels', 'c-dashboard');
  c('c-patterns-all-deals-list', 'All Deals list page', 'c-lists');
  c('c-patterns-deal-page', 'Deal page patterns', 'c-deal');
  c('c-patterns-new-deal-form', 'Forms (New Deal / Edit Deal)', 'c-forms');
  c('c-patterns-events-calendar', 'Events calendar', 'c-events');
  c('c-patterns-login-auth', 'Login & auth', 'c-login');
  c('c-patterns-admin', 'Admin patterns', 'c-admin');
  /* extended */
  c('c-extended-generics', 'Extended generics', 'c-extended');
  return out;
}

/* ---------------------------------------------------------------- screens */
function screens() {
  const sc = oldSec('screens'), out = [];
  $$(':scope > figure.sc-screen', sc).forEach((f, n) => {
    const cap = $('figcaption', f), name = $('b', cap).textContent, src = sq($('.sc-id', cap).textContent);
    const note = $(':scope > .sc-note', f), fit = $(':scope > .sc-fit', f), inn = $('.sc-fit__in', fit);
    const w = fit.getAttribute('data-w'), h = parseFloat(inn.style.height);
    const sz = sq($('.sc-size', cap).textContent);
    if (sz !== w + 'x' + h) warn(`screen ${f.id}: size label ${sz} != ${w}x${h}`);
    const fig = `<figure class="sk-screen"><figcaption class="sk-screen__cap"><span class="sk-screen__name">${esc(name)}</span><span class="sk-screen__src">Source: ${esc(src)}</span></figcaption>` +
      `<div class="sk-frame" data-sk-w="${w}" data-sk-h="${h}"><template>${inn.innerHTML}</template></div></figure>`;
    out.push(section(f.id, name, note ? note.innerHTML : '', fig, { anchors: n === 0 ? ['screens'] : [], kw: 'screen frame ' + src }));
  });
  return out;
}

/* ---------------------------------------------------------------- reference */
function rDecisions() {
  const s = oldSec('inconsistencies'), t = $('table', s);
  const rows = $$('tbody tr', t).map((tr, i) => {
    const td = [...tr.children];
    return `<tr><td>${i + 1}</td><td>${td[3].innerHTML}</td><td>${td[0].innerHTML}<br>${td[1].innerHTML}</td><td>${td[2].innerHTML}</td><td><span class="sk-status" data-status="decided">Decided</span></td></tr>`;
  });
  const mig = [
    ['Showcase chrome', 'Old chrome (.sc-* rules, hand-written nav, scroll-spy, fit script, copy handler, hero) replaced by the shared showcase kit.', 'Kit structure per STRUCTURE.md; every demo moved untouched.', 'decided', 'Decided'],
    ['Demo support CSS', 'Two showcase-only illustration rule groups remain in showcase.html: .sc-g* / .sc-gridmap (grid-geometry map), .sc-blur-demo* (scrim blur sample).', 'Kept in a /* demo support */ block because those foundation illustrations are built from chrome-less boxes; not part of components.css.', 'decided', 'Decided'],
    ['Component frames', 'Old scale-to-fit wrappers .sc-fit-s (26 mini-frames inside cards) and .sc-fit (16 screens + grid map) replaced by .sk-frame with data-sk-w/h.', 'Mini-frames keep their old fixed scale (explicit frame width); screens scale to the column and render lazily.', 'decided', 'Decided'],
    ['Copy HTML on framed cards', 'The old button copied the scale wrappers together with the component markup.', 'Cards containing frames carry a template data-sk-source with the component markup only (scale wrappers removed).', 'decided', 'Decided'],
    ['Badge wording', 'Kit legend names the badges Extended / Alt / Documented dependency / Outside canonical.', 'Card badges keep their Figma wording and tooltip: "Alternate" = Alt, "Outside Section 1" = Outside canonical.', 'open', 'Open'],
    ['Component sections', 'Two old sections span several roles: Pills, chips, toggles & links; Top bar, search & menus.', 'Split by role: pills and chips to Indicators, segmented toggles to Selection controls, links to Actions; search dropdown and account menu to Overlays, top bar to Navigation. Card ids unchanged.', 'decided', 'Decided'],
    ['Icon gallery', 'Old gallery: one card per file with five colour cells.', 'Kit icon cards: one card per rendered sample (original + four colour variants), file name and variant on each.', 'decided', 'Decided'],
    ['[hidden] vs kit nav search', 'components.css sets [hidden] { display: none !important }, which defeats the kit rule that expands collapsed nav groups while searching.', 'One compat rule on .sk-nav.is-filtering in the page style block (page-level, kit untouched).', 'open', 'Open']
  ].map((m, i) => `<tr><td>M${i + 1}</td><td>showcase migration</td><td><b>${m[0]}</b><br>${m[1]}</td><td>${m[2]}</td><td><span class="sk-status" data-status="${m[3]}">${m[4]}</span></td></tr>`);
  const body = table(['#', 'Source (class / token)', 'What', 'Chosen behaviour', 'Status'], rows, 'sk-table--decisions') +
    `<h3 class="sk-h3">Showcase migration notes</h3>` + table(['#', 'Source', 'What', 'Chosen behaviour', 'Status'], mig, 'sk-table--decisions');
  return { html: section('r-decisions', 'Known inconsistencies & decisions', intro(s), body, { anchors: ['inconsistencies'] }), rows: rows.length };
}

function rDeadCode() {
  const R = (a, b, c, d) => `<tr><td>${a}</td><td>${b}</td><td>${c}</td><td>${d}</td></tr>`;
  const t1 = table(['Item', 'Treatment', 'Source', 'Why'], [
    R('Laura shell (section "changes for Laura" 2159:13682: no side nav, History / Reports tabs, Drafts / New Deal buttons, date-range picker + dropdown)', 'Not built', 'build-notes.md section 3; CLAUDE.md section 2', 'Owner decision: documented alternate only; build only when the owner asks.'),
    R('Page "final fonts 2px up" 2079:13698 (body 14, nav open 203)', 'Not used', 'build-notes.md section 5; CLAUDE.md section 2', 'Owner decision: 12px body.'),
    R('Figma text styles "Geist: Medium" / "Geist: Regular"', 'Not used', 'build-notes.md section 5', 'They exist in the file but are applied to 0 nodes.'),
    R('.deals-panel__scroll (stage 2 class, position: absolute)', 'Dead CSS, unused', 'VERIFICATION.md remaining deviations', 'The 4px .scroll is placed as a normal flex item inside .deals-panel__main, which matches Figma (x924 in a 928 row).'),
    R('login-background-1.jpg (4096px, 9.2 MB)', 'Shipped, not loaded', 'build-notes.md (Login); VERIFICATION.md', 'login-background-2.jpg (512px, 200 KB) is the default; the full-resolution file is selectable via --login-background-image.'),
    R('Full screens for Deal Edit Events, New Deal expanded, Admin Internal', 'Not re-assembled', 'VERIFICATION.md "Not verified numerically"', 'Their components exist (Deal page, Forms, Admin patterns); no full-screen reconstruction was made.'),
    R('Week-view time grid', 'Not built', 'build-notes.md section 4; CLAUDE.md section 10', 'Figma has no time grid; the week is seven day columns.'),
    R('Corner smoothing ("smooth 1" on Button Master)', 'Not reproducible', 'build-notes.md section 5', 'CSS has no equivalent; --radius-smooth-8 is a plain 8px.'),
    R('Temporary test pages _stage1-test.html, _stage2-test.html', 'Deleted', 'build-notes.md', 'Verification scaffolding.'),
    R('Old showcase chrome (.sc-* rules, hand-written nav and scroll-spy, fit script, copy handler, stats strip)', 'Removed in migration', 'SHOWCASE-MIGRATION.md', 'Replaced by the shared showcase kit.')
  ]);
  const t2 = table(['Invented by the previous design system', 'Treatment', 'Source', 'Why'], [
    R('Inter as UI font, 14px body, monospace', 'Dropped', 'CLAUDE.md section 10', 'Geist 12px body; Inter only in DAY cells.'),
    R('Teal #1B8C8C, bright cyan, any "trading" palette, BID / ASK colours, #22C55E / #EF4444', 'Dropped', 'CLAUDE.md section 10', 'Brand is #005268; green / red are #179484 / #DA4D43.'),
    R('6px radius, 999px pills, circular "OG" badge nav, 56px icon-only sidebar', 'Dropped', 'CLAUDE.md section 10', 'Controls radius 4, panels 8, pills 16; nav is 72 / 191 / 219 px.'),
    R('Dark #1A1A28 / navy primary button, 36px / 40px default button, opacity hovers, scale(.98) pressed', 'Dropped', 'CLAUDE.md section 10', 'Primary is #005268, 32 high, hover = white 20% overlay.'),
    R('Uppercase section labels, letter-spacing, 600-weight 12px headers everywhere', 'Dropped', 'CLAUDE.md section 10', 'Header weight depends on the table.'),
    R('Card shadows, gradients (except logo / AI icon), dark mode, border: strokes', 'Dropped', 'CLAUDE.md section 10', 'Panels are flat; strokes are inset box-shadows; light UI only.'),
    R('Invented states', 'Dropped', 'CLAUDE.md section 10', 'Only Extended classes derived from existing tokens remain (see Extended index).')
  ]);
  return section('r-dead-code', 'Dead code & dropped items', 'What the source does not use or the build does not contain, and what the previous design system invented and was removed.',
    `<h3 class="sk-h3">Not built, not used, unused CSS</h3>${t1}<h3 class="sk-h3">Invented items dropped</h3>${t2}`, { anchors: [] });
}

function rExtendedIndex(mainEl) {
  const rows = []; const alt = [], out = [];
  const secTitle = b => { const s = b.closest('.sk-section'); return s.getAttribute('data-sk-title'); };
  const itemOf = b => {
    if (b.closest('.sk-card__head')) return { item: sq($('.sk-card__title', b.closest('.sk-card')).textContent) + ' (whole card)', kind: 'card' };
    const cap = b.closest('.sk-variant__cap');
    if (cap) { const c = cap.cloneNode(true); $$('.sk-badge,.sk-id', c).forEach(x => x.remove()); const id = $('.sk-id', cap); return { item: sq(c.textContent), id: id ? id.textContent : '', kind: 'variant' }; }
    return { item: '(inline)', kind: 'other' };
  };
  $$('.sk-badge', mainEl).forEach(b => {
    const card = b.closest('.sk-card'); if (!card) return;
    const m = b.className.match(/sk-badge--(extended|alt|outside)/); if (!m) return;
    const it = itemOf(b);
    const where = `<a href="#${card.id}">${esc(secTitle(b))} &rsaquo; ${esc(sq($('.sk-card__title', card).textContent))}</a>`;
    const why = esc(b.getAttribute('title') || '');
    const row = `<tr><td>${esc(it.item)}${it.id ? ` <span class="sk-id">${esc(it.id)}</span>` : ''}</td><td>${where}</td><td>${why}</td></tr>`;
    (m[1] === 'extended' ? rows : m[1] === 'alt' ? alt : out).push(row);
  });
  const hd = ['Item', 'Where', 'Why'];
  const body = table(['Item', 'Where', 'Why Extended'], rows) +
    `<h3 class="sk-h3">Alt items (Alternate badge)</h3>${table(hd.map((h, i) => i === 2 ? 'Why Alt' : h), alt)}` +
    `<h3 class="sk-h3">Outside canonical items (Outside Section 1 badge)</h3>${table(hd.map((h, i) => i === 2 ? 'Why outside' : h), out)}`;
  return { html: section('r-extended-index', 'Extended index', 'Every item carrying the Extended badge (one row per badge), with its card; then the Alt and Outside canonical items.', body, { anchors: [] }), ext: rows.length, alt: alt.length, out: out.length };
}

function rOpen() {
  const items = [
    'Laura shell: keep it as a documented alternate only, or build it (no side nav, History / Reports tabs, Drafts / New Deal buttons, date-range picker + dropdown)? Not built today by owner decision.',
    'Extended states (85 badges): confirm that every state Figma does not draw (hover, focus, pressed, error, disabled, tooltip, toast, skeleton, empty state, accordion, menu) stays as derived from existing tokens, or supply Figma designs.',
    'Not drawn in Figma and therefore not verifiable: date-picker popover, select option list, tooltip, toast, pagination, loading and empty states. Supply designs or approve the Extended versions.',
    'Visual estimates not read from the Figma API: comment-bubble 16px glyph, Morning-note card icon, table "active bell" 14px, inactive bookmark outline, 12px trash, Admin sector edit / delete glyph size, table-detail text indent 22px, "+ Add" dashed pill, scrim blur(10px) (Figma radius 20), "Icons gradient" angle 207deg, slider natural height 62 vs 58, Deal-page Frame 1000001078 3px y-offset, Admin inline-edit stroke colour, grey Dividend pills. Confirm or supply values.',
    'Screens not re-assembled in full: Deal Edit Events, New Deal expanded, Admin Internal. Add them?',
    'Sample copy tuned to Figma heights only for the event card (132), key-terms card (441) and list rows (41); Deal comments and Recent Updates were not tuned and may differ from the Figma heights. Tune them?',
    'Inter in DAY tags, View More and the Admin disclaimer is kept as drawn (probable unintended fallback). Keep Inter or switch to Geist?',
    'Text-hug widths differ from Figma by less than 1.5px (Figma rounds text boxes) and corner smoothing has no CSS equivalent. Accept?',
    'Should card badges keep the Figma wording ("Alternate", "Outside Section 1") or take the kit wording ("Alt", "Outside canonical")?',
    'The 9.2 MB login-background-1.jpg is shipped but not loaded; keep the 512px / 200 KB file as the default background?'
  ];
  return section('r-open-decisions', 'Open decisions for the owner', '', `<div class="sk-prose"><ol>${items.map(i => `<li>${i}</li>`).join('')}</ol></div>`, { anchors: [] });
}

/* ---------------------------------------------------------------- overview */
function overview() {
  const heroP = $('.sc-hero p').textContent.replace(/\s+/g, ' ').trim();
  const screensIntro = sq($('#screens > p.sc-intro').textContent);
  const leadText = heroP.replace('carries the Extended badge', 'carries the Extended badge')
    .replace(/Extended\. Figma alternates carry Alternate; Admin patterns carry Outside Section 1\./, 'Extended.');
  return `<section class="sk-section" id="overview" data-sk-title="Overview"><header class="sk-section__head"><h2 class="sk-section__title">OG Risk Arb design system</h2>` +
    `<p class="sk-section__lead">Rebuilt from the Figma file VlOfBG6fJt7ijm0iKasAMP: canonical "Section 1" (node 2496:2003) on page "final" and page "components" (924:3460). Values are copied from Figma exactly; anything Figma does not draw is built only from existing tokens and carries the Extended badge. Figma alternates carry the Alternate badge; Admin patterns carry the Outside Section 1 badge. The page holds 245 component variants and 16 full screens (261 in total).</p></header>` +
    `<div class="sk-counts" data-sk-counts data-sk-assets="125"></div>` +
    `<p class="sk-prose" style="margin:0 0 16px">125 asset files: 123 SVG and 2 JPG.</p>` +
    `<h3 class="sk-h3">Badge legend</h3><dl class="sk-legend">` +
    `<dt><span class="sk-badge sk-badge--extended">Extended</span></dt><dd>Not drawn in the source; built from existing tokens.</dd>` +
    `<dt><span class="sk-badge sk-badge--alt">Alt</span></dt><dd>Alternate treatment present in the source next to the canonical one. Shown on cards as "Alternate".</dd>` +
    `<dt><span class="sk-badge sk-badge--documented">Documented dependency</span></dt><dd>External runtime dependency (remote animation, font, API): documented, not copied. On this platform the Geist and Inter fonts load from Google Fonts; no card carries this badge.</dd>` +
    `<dt><span class="sk-badge sk-badge--outside">Outside canonical</span></dt><dd>Drawn in the source but outside the canonical section/page. Shown on cards as "Outside Section 1" (Admin Internal / Admin External / Laura alternate).</dd></dl>` +
    `<div class="sk-callout"><p><b>Screens.</b> ${esc(screensIntro)}</p></div>` +
    `<div class="sk-callout"><p><b>Fonts.</b> Geist everywhere (Regular 400 / Medium 500 / SemiBold 600 / Bold 700); Inter only in calendar DAY tags, View More and the Admin disclaimer; Times New Roman only in the rich-text toolbar glyphs.</p></div></section>`;
}

/* ---------------------------------------------------------------- head, style, script */
const STYLE = `
body { margin: 0; }
.sk-app {   /* kit tokens mapped from the platform tokens (light only; the platform has no dark theme) */
  --sk-bg: var(--color-surface-subtle);        --sk-surface: var(--color-surface-default);  --sk-surface-2: var(--color-surface-subtle);
  --sk-border: var(--color-border-default);    --sk-text: var(--color-text-primary);
  --sk-text-muted: color-mix(in srgb, var(--color-text-secondary) 70%, var(--color-text-primary));
  --sk-accent: var(--color-brand-default);     --sk-accent-text: var(--color-text-on-brand); --sk-code-bg: var(--color-surface-subtle);
  --sk-focus: var(--color-border-brand);
  --sk-badge-extended: color-mix(in srgb, var(--color-orange) 68%, var(--color-black));
  --sk-badge-alt: color-mix(in srgb, var(--color-text-secondary) 70%, var(--color-text-primary));
  --sk-badge-documented: color-mix(in srgb, var(--color-green) 72%, var(--color-black));
  --sk-badge-outside: color-mix(in srgb, var(--color-blue) 85%, var(--color-black));
  --sk-info: var(--color-blue); --sk-warn: color-mix(in srgb, var(--color-orange) 68%, var(--color-black));
  --sk-ok: color-mix(in srgb, var(--color-green) 72%, var(--color-black)); --sk-bad: var(--color-red);
  --sk-font: var(--font-primary);              --sk-mono-font: var(--font-primary);
  --sk-radius: var(--radius-8);                --sk-shadow: none;
  --sk-stage-bg: var(--color-surface-default);
}
/* compat: components.css sets [hidden] { display: none !important }, which would keep collapsed nav groups closed while searching */
.sk-nav.is-filtering .sk-nav__items[hidden] { display: block !important; }
/* demo support (foundation illustrations; not part of components.css) */
.sc-gridmap { background: var(--color-surface-default); }
.sc-g { position: absolute; display: flex; align-items: flex-start; padding: 8px 12px; box-shadow: inset 0 0 0 3px var(--color-border-strong); font: var(--type-regular-12); font-size: 24px; line-height: 30px; color: var(--color-text-secondary); }
.sc-g--nav { background: var(--color-surface-brand-tint); }
.sc-g--bar, .sc-g--tab { background: var(--color-surface-subtle); }
.sc-g--frame { box-shadow: inset 0 0 0 3px var(--color-border-brand); }
.sc-g--p1 { background: var(--color-surface-subtle); }
.sc-g--p2 { background: var(--color-surface-events-panel); }
.sc-g--p3 { background: var(--color-surface-comments-panel); }
.sc-g--strip { background: var(--color-surface-muted); }
.sc-blur-demo { position: relative; width: 280px; height: 96px; overflow: hidden; border-radius: var(--radius-8); }
.sc-blur-demo__bg { position: absolute; inset: 0; background: repeating-linear-gradient(45deg, var(--color-surface-brand) 0 8px, var(--color-blue) 8px 16px); }
.sc-blur-demo__scrim { position: absolute; inset: 0; background: var(--color-surface-scrim); -webkit-backdrop-filter: blur(calc(var(--backdrop-blur) / 2)); backdrop-filter: blur(calc(var(--backdrop-blur) / 2)); }
.sc-blur-demo > span { position: absolute; left: 12px; bottom: 8px; right: 12px; font: var(--type-medium-10); }
`;

const SCRIPT = `
/* Platform demo behaviour (unchanged logic). wire(root) is also run on every lazily rendered frame (sk:frame). */
(function () {
  function group(root, sel, itemSel) {
    root.querySelectorAll(sel).forEach(function (g) {
      g.addEventListener('click', function (e) {
        var it = e.target.closest(itemSel); if (!it || !g.contains(it) || e.target.closest('.tab__close')) return;
        if (itemSel === '.chip') { g.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('is-active'); }); it.classList.add('is-active'); return; }
        g.querySelectorAll(itemSel).forEach(function (c) { c.classList.remove('is-active'); c.removeAttribute('aria-selected'); c.removeAttribute('aria-pressed'); });
        it.classList.add('is-active'); if (itemSel === '.tab') it.setAttribute('aria-selected', 'true');
      });
    });
  }
  function wire(root) {
    /* exclusive-active groups: tabs, chips, segmented, view toggle, day toggle, day tiles, A-Z, anchor menu, nav sub-items */
    group(root, '.tabbar', '.tab'); group(root, '.chip-row', '.chip'); group(root, '.segmented', '.segmented__item'); group(root, '.view-toggle', '.view-toggle__item'); group(root, '.day-toggle', '.day-toggle__item');
    group(root, '.day-strip', '.day-tile'); group(root, '.az-rail', '.az-rail__letter'); group(root, '.anchor-menu', '.anchor-menu__item'); group(root, '.nav-sub', '.nav-subitem');
    /* nav section chevrons */
    root.querySelectorAll('.nav-item').forEach(function (it) { it.addEventListener('click', function (e) { e.preventDefault(); if (!it.querySelector('.nav-item__chevron')) return; var open = it.classList.toggle('is-expanded'); var sub = it.nextElementSibling; if (sub && sub.classList.contains('nav-sub')) sub.style.display = open ? '' : 'none'; }); });
    root.querySelectorAll('a[href="#"]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); }); });
    /* calendar day / tag selection */
    root.querySelectorAll('.calendar__grid').forEach(function (g) { g.addEventListener('click', function (e) { var t = e.target.closest('.day__tag'); if (!t) return; g.querySelectorAll('.day__tag.is-selected').forEach(function (x) { x.classList.remove('is-selected'); }); t.classList.add('is-selected'); }); });
    /* password show/hide */
    root.querySelectorAll('[data-pwd]').forEach(function (p) {
      var eye = p.querySelector('.icon'); var shown = false;
      function flip() { shown = !shown; p.querySelector('.password__dots, .password__text').outerHTML = shown ? '<span class="password__text">makoristhebest10</span>' : '<span class="password__dots"></span>'; eye.className = 'icon ' + (shown ? 'icon-eye-off-24-visible-state' : 'icon-eye-24-hidden-state'); }
      eye.addEventListener('click', flip); eye.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } });
    });
    /* rich-text toolbar pressed state */
    root.querySelectorAll('.rt-btn').forEach(function (b) { b.addEventListener('click', function () { if (/Bold|Italic|Underline|Strikethrough/.test(b.getAttribute('aria-label') || '')) { var on = b.classList.toggle('is-active'); b.setAttribute('aria-pressed', on); } }); });
    /* accordion */
    root.querySelectorAll('.accordion__head').forEach(function (h) { h.addEventListener('click', function () { h.parentNode.classList.toggle('is-open'); }); });
  }
  wire(document);
  document.addEventListener('sk:frame', function (e) { var s = e.target && e.target._sk; if (s) wire(s.inner); });
  /* closable tabs (delegated) */
  document.addEventListener('click', function (e) { var c = e.target.closest('.tab__close'); if (c) { var t = c.closest('.tab'); t.parentNode.removeChild(t); } });
})();
`;

/* ---------------------------------------------------------------- assemble */
const fi = fIcons();
const comp = compSections();
const scr = screens();
const dec = rDecisions();

const body1 = [overview(), fColours(), fTypography(), fRadii(), fSpacing(), fShadows(), fMotion(), fSizes(), fi.html, ...comp, ...scr, dec.html];
/* extended index needs the new DOM */
const tmpDoc = new JSDOM('<main>' + body1.join('') + '</main>').window.document;
const idx = rExtendedIndex(tmpDoc.querySelector('main'));
const body = [...body1, rDeadCode(), idx.html, rOpen()].join('\n');
// order: reference must be decisions, dead-code, extended-index, open (kit sorts anyway)
const reorder = body; // kit sorts sections into canonical order

const headOld = $('head');
const keep = $$('meta, link', headOld).map(e => e.outerHTML).join('\n');
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>OG Risk Arb design system</title>
<link rel="icon" href="data:,">
${$$('link', headOld).map(e => e.outerHTML).join('\n')}
<link rel="stylesheet" href="../../shared/showcase-kit/showcase-kit.css">
<style>${STYLE}</style>
</head>
<body>
<div class="sk-app">
<header class="sk-top">
  <span class="sk-top__logo"><img src="assets/og-wordmark.svg" alt="Oscar Gruss"></span>
  <span class="sk-top__title">OG Risk Arb design system</span>
  <span class="sk-top__src">Source: Figma OG Risk Arb · Section 1 · harvested 2026-10-14</span>
  <div class="sk-top__actions">
    <input class="sk-search" type="search" data-sk-search placeholder="Search sections ( / )" aria-label="Search sections">
  </div>
</header>
<div class="sk-shell">
<nav class="sk-nav" data-sk-nav aria-label="Sections"></nav>
<main class="sk-main">
${reorder}
</main>
</div>
</div>
<script src="../../shared/showcase-kit/showcase-kit.js"></script>
<script>${SCRIPT}</script>
</body>
</html>
`;
fs.writeFileSync(OUT, html);
console.log(JSON.stringify({ out: OUT, bytes: html.length, iconCards: fi.cards, logos: fi.logos, decisionRows: dec.rows, extendedRows: idx.ext, altRows: idx.alt, outsideRows: idx.out, warnings: log }, null, 1));

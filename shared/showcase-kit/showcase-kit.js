/*! Makor showcase kit v1.0 - vanilla JS, no dependencies. API: window.SK. Markup contract: STRUCTURE.md */
(function () {
  'use strict';
  var D = document, W = window, H = D.documentElement;
  function q(s, r) { return (r || D).querySelector(s); }
  function qa(s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)); }
  function el(tag, cls, txt) { var e = D.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
  function raf(fn) { W.requestAnimationFrame(fn); }

  /* ---- canonical information architecture (STRUCTURE.md) ---- */
  var FOUND = [['f-colours', 'Colours'], ['f-typography', 'Typography'], ['f-radii', 'Radii'], ['f-spacing', 'Spacing (observed)'],
    ['f-shadows', 'Shadows & effects'], ['f-motion', 'Motion'], ['f-sizes', 'Sizes & layout'], ['f-icons', 'Icons & logos']];
  var REF = [['r-decisions', 'Known inconsistencies & decisions'], ['r-dead-code', 'Dead code & dropped items'],
    ['r-extended-index', 'Extended index'], ['r-open-decisions', 'Open decisions for the owner']];
  var SUBS = [['actions', 'Actions'], ['forms', 'Forms & inputs'], ['selection', 'Selection controls'], ['indicators', 'Indicators'],
    ['feedback', 'Feedback'], ['overlays', 'Overlays'], ['navigation', 'Navigation'], ['data', 'Data display'],
    ['patterns', 'Platform patterns'], ['extended', 'Extended states']];
  var GROUPS = [['home', ''], ['foundations', 'Foundations'], ['components', 'Components'], ['screens', 'Screens'], ['reference', 'Reference']];
  var PREFIX = { f: 'foundations', c: 'components', s: 'screens', r: 'reference' };
  function idx(list, key) { for (var i = 0; i < list.length; i++) if (list[i][0] === key) return i; return list.length; }

  var ALL = /[?&]all(=|&|$)/.test(location.search);
  var app, main, navEl, order = [], byId = {}, current = null, inited = false, ro, io, spyLast;
  var themeCbs = [], THEME_KEY = 'sk-theme';

  /* ================= init ================= */
  function init() {
    app = q('.sk-app'); if (!app) return;
    main = q('.sk-main', app); navEl = q('[data-sk-nav]', app) || q('.sk-nav', app);
    app.classList.add('sk-js'); if (ALL) app.classList.add('sk-all');
    var secs = qa('.sk-section', main);
    ensure(FOUND, 'foundations', 'Not defined in the source.', secs);
    ensure(REF, 'reference', 'None recorded.', secs);
    secs = qa('.sk-section', main);
    secs.forEach(function (s, i) {
      var id = s.id, canon = FOUND.concat(REF)[idx(FOUND.concat(REF), id)];
      var group = s.getAttribute('data-sk-group') || (id === 'overview' ? 'home' : PREFIX[id.charAt(0)] || 'components');
      var sub = s.getAttribute('data-sk-sub') || (group === 'components' ? (id.split('-')[1] || '') : '');
      var h = q('.sk-section__title', s);
      var it = { id: id, sec: s, i: i, group: group, sub: sub, canon: !!canon,
        title: canon ? canon[1] : (s.getAttribute('data-sk-title') || (h && h.textContent.trim()) || id),
        kw: (s.getAttribute('data-sk-keywords') || '') };
      order.push(it); byId[id] = it;
    });
    order.sort(function (a, b) {
      return (idx(GROUPS, a.group) - idx(GROUPS, b.group)) ||
        (a.group === 'foundations' ? idx(FOUND, a.id) - idx(FOUND, b.id) : 0) ||
        (a.group === 'reference' ? idx(REF, a.id) - idx(REF, b.id) : 0) ||
        (a.group === 'components' ? idx(SUBS, a.sub) - idx(SUBS, b.sub) : 0) || (a.i - b.i);
    });
    var cur = qa('.sk-section', main);
    if (order.some(function (it, n) { return cur[n] !== it.sec; })) {   // reorder DOM only when needed (iframes reload on move)
      var ref = cur[cur.length - 1].nextSibling;
      order.forEach(function (it) { main.insertBefore(it.sec, ref); });
    }
    buildNav(); buildPager(); fillCounts(); initFrames(); initSearch(); initTheme(); lint();
    D.addEventListener('click', onClick);
    W.addEventListener('hashchange', function () { route(); });
    W.addEventListener('beforeprint', function () { qa('.sk-frame').forEach(render); });
    if (ALL) W.addEventListener('scroll', spy, { passive: true });
    inited = true; route(true);
  }
  function ensure(list, group, msg, secs) {
    var have = {}; secs.forEach(function (s) { have[s.id] = 1; });
    list.forEach(function (c) {
      if (have[c[0]]) return;
      var s = el('section', 'sk-section'); s.id = c[0]; s.setAttribute('data-sk-auto', '');
      var hd = el('header', 'sk-section__head'); hd.appendChild(el('h2', 'sk-section__title', c[1]));
      s.appendChild(hd); s.appendChild(el('p', 'sk-empty', msg)); main.appendChild(s);
    });
  }

  /* ================= nav ================= */
  function buildNav() {
    navEl.textContent = ''; navEl.setAttribute('aria-label', 'Sections');
    var map = {};
    function grp(key, label, parent, sub) {
      if (map[key]) return map[key];
      var w = el('div', sub ? 'sk-nav__sub' : 'sk-nav__group'), b = el('button', sub ? 'sk-nav__shead' : 'sk-nav__ghead', label), c = el('div', 'sk-nav__items');
      b.type = 'button'; c.id = 'sk-nav-' + key.replace(/\W/g, '-'); b.setAttribute('aria-controls', c.id);
      b.setAttribute('aria-expanded', sub ? 'false' : 'true'); c.hidden = !!sub;
      w.appendChild(b); w.appendChild(c); parent.appendChild(w);
      return (map[key] = c);
    }
    order.forEach(function (it) {
      var a = el('a', 'sk-nav__link', it.title); a.href = '#' + it.id; a.setAttribute('data-sk-id', it.id);
      a.setAttribute('data-sk-text', (it.title + ' ' + it.kw).toLowerCase());
      var parent = navEl;
      if (it.group !== 'home') {
        parent = grp(it.group, GROUPS[idx(GROUPS, it.group)][1], navEl, false);
        if (it.group === 'components') parent = grp('c-' + it.sub, (SUBS[idx(SUBS, it.sub)] || [0, it.sub || 'Other'])[1], parent, true);
      }
      parent.appendChild(a); it.link = a;
    });
    var foot = el('div', 'sk-nav__foot'), fa = el('a', '', ALL ? 'Back to one-section view' : 'Show all sections (print / Ctrl-F)');
    fa.href = location.pathname + (ALL ? '' : '?all') + location.hash; foot.appendChild(fa); navEl.appendChild(foot);
    navEl.appendChild(el('div', 'sk-nav__empty is-hidden', 'No matching sections.'));
    navEl.addEventListener('click', function (e) {
      var b = e.target.closest('.sk-nav__ghead, .sk-nav__shead'); if (b) toggle(b);
      var a = e.target.closest('.sk-nav__link');
      if (a && a.getAttribute('href') === location.hash) route();      // re-click on the active item: scroll to top
    });
    navEl.addEventListener('keydown', navKeys);
    navEl.addEventListener('focusin', function (e) { rove(e.target); });
  }
  function toggle(b, open) {
    var c = D.getElementById(b.getAttribute('aria-controls')); if (!c) return;
    var o = open == null ? b.getAttribute('aria-expanded') !== 'true' : open;
    b.setAttribute('aria-expanded', String(o)); c.hidden = !o;
  }
  function navFocusables() {
    return qa('.sk-nav__link, .sk-nav__ghead, .sk-nav__shead', navEl).filter(function (x) { return x.offsetParent !== null; });
  }
  function rove(t) {
    qa('.sk-nav__link, .sk-nav__ghead, .sk-nav__shead', navEl).forEach(function (x) { x.tabIndex = x === t ? 0 : -1; });
  }
  function navKeys(e) {
    var list = navFocusables(), i = list.indexOf(D.activeElement), t = null, k = e.key;
    if (i < 0) return;
    if (k === 'ArrowDown') t = list[Math.min(i + 1, list.length - 1)];
    else if (k === 'ArrowUp') t = list[Math.max(i - 1, 0)];
    else if (k === 'Home') t = list[0];
    else if (k === 'End') t = list[list.length - 1];
    else if (/^Arrow(Left|Right)$/.test(k)) {
      var f = D.activeElement;
      if (f.getAttribute('aria-controls')) { toggle(f, k === 'ArrowRight'); e.preventDefault(); return; }
      if (k === 'ArrowLeft') { var c = f.closest('.sk-nav__items'); t = c && D.querySelector('[aria-controls="' + c.id + '"]'); }
    } else return;
    if (t) { e.preventDefault(); t.focus(); }
  }

  /* ================= routing ================= */
  function mark(it) {
    if (spyLast === it) return; spyLast = it;
    order.forEach(function (o) { if (o.link) o.link.removeAttribute('aria-current'); });
    it.link.setAttribute('aria-current', 'page');
    var c = it.link.closest('.sk-nav__items');
    while (c) { var b = D.querySelector('[aria-controls="' + c.id + '"]'); if (b) toggle(b, true); c = c.parentNode.closest('.sk-nav__items'); }
    rove(it.link); if (it.link.scrollIntoView) it.link.scrollIntoView({ block: 'nearest' });
  }
  function route(first) {
    var raw = location.hash.slice(1), id; try { id = decodeURIComponent(raw); } catch (e) { id = raw; }
    var t = id ? D.getElementById(id) : null, sec = t && (t.classList.contains('sk-section') ? t : t.closest('.sk-section'));
    var it = sec && byId[sec.id]; if (!it) { it = order[0]; t = null; }
    spyLast = null;
    if (!ALL) order.forEach(function (o) { o.sec.classList.toggle('is-active', o === it); });
    mark(it); current = it; fitAll(it.sec);
    D.title = (it.title ? it.title + ' · ' : '') + (D.title.split(' · ').pop());
    if (t && (ALL || t !== it.sec)) t.scrollIntoView({ behavior: 'instant', block: 'start' });
    else if (!ALL) W.scrollTo({ top: 0, behavior: 'instant' });
    var i = order.indexOf(it); pagerSet(order[i - 1], order[i + 1]);
    D.dispatchEvent(new CustomEvent('sk:route', { detail: { id: it.id, section: it.sec, target: t } }));
  }
  function spy() {
    if (spy.t) return; spy.t = 1;
    raf(function () {
      spy.t = 0; var y = 140, c = order[0];
      order.forEach(function (o) { if (o.sec.getBoundingClientRect().top <= y) c = o; }); mark(c);
    });
  }
  function buildPager() {
    var p = el('nav', 'sk-pager'); p.setAttribute('aria-label', 'Previous and next section'); p.setAttribute('data-sk-pager', '');
    main.appendChild(p);
  }
  function pagerSet(prev, next) {
    var p = q('[data-sk-pager]', main); p.textContent = '';
    function a(it, rel, dir) { if (!it) { p.appendChild(el('span')); return; } var x = el('a'); x.rel = rel; x.href = '#' + it.id; x.appendChild(el('small', '', dir)); x.appendChild(D.createTextNode(it.title)); p.appendChild(x); }
    a(prev, 'prev', '← Previous'); a(next, 'next', 'Next →');
  }

  /* ================= counts ================= */
  function fillCounts() {
    qa('[data-sk-counts]').forEach(function (c) {
      var body = order.filter(function (o) { return o.group !== 'home'; });
      var comps = body.filter(function (o) { return o.group === 'components'; });
      var n = {
        sections: body.filter(function (o) { return !o.sec.hasAttribute('data-sk-auto'); }).length,
        components: comps.reduce(function (s, o) { return s + qa('.sk-card', o.sec).length; }, 0),
        screens: qa('.sk-screen').length,
        extended: qa('.sk-badge--extended', main).filter(function (b) { return !b.closest('#r-extended-index, .sk-legend'); }).length
      };
      c.textContent = '';
      ['sections', 'components', 'screens', 'extended', 'assets'].forEach(function (k) {
        var v = c.getAttribute('data-sk-' + k); if (v == null) v = n[k]; if (v == null || v === '') return;
        var s = el('span', 'sk-chip'); s.appendChild(el('b', '', String(v))); s.appendChild(D.createTextNode(' ' + k)); c.appendChild(s);
      });
    });
  }

  /* ================= search ================= */
  function initSearch() {
    var inp = q('[data-sk-search]'); if (!inp) return;
    function run() {
      var v = inp.value.trim().toLowerCase(), shown = 0;
      navEl.classList.toggle('is-filtering', !!v);
      qa('.sk-nav__link', navEl).forEach(function (a) {
        var m = !v || a.getAttribute('data-sk-text').indexOf(v) >= 0; a.classList.toggle('is-hidden', !m); if (m) shown++;
      });
      qa('.sk-nav__sub, .sk-nav__group', navEl).reverse().forEach(function (g) {
        g.classList.toggle('is-hidden', !!v && !q('.sk-nav__link:not(.is-hidden)', g));
      });
      q('.sk-nav__empty', navEl).classList.toggle('is-hidden', !(v && !shown));
    }
    inp.addEventListener('input', run);
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { var a = q('.sk-nav__link:not(.is-hidden)', navEl); if (a && inp.value.trim()) { location.hash = a.getAttribute('href'); } }
      if (e.key === 'Escape') { inp.value = ''; run(); inp.blur(); }
      if (e.key === 'ArrowDown') { var f = navFocusables()[0]; if (f) { e.preventDefault(); f.focus(); } }
    });
    D.addEventListener('keydown', function (e) {
      if (e.key === '/' && !/^(INPUT|TEXTAREA|SELECT)$/.test((D.activeElement || {}).tagName) && !(D.activeElement || {}).isContentEditable) { e.preventDefault(); inp.focus(); inp.select(); }
    });
  }

  /* ================= copy HTML ================= */
  function onClick(e) {
    var b = e.target.closest('[data-sk-copy]'); if (b) copy(b);
    var t = e.target.closest('[data-sk-theme-toggle]'); if (t) setTheme(themeNow() === 'dark' ? 'light' : 'dark');
    var s = e.target.closest('[data-sk-frame-mode]'); if (s) frameMode(s);
  }
  function sourceFor(scope) {
    var tpl = q('template[data-sk-source]', scope); if (tpl) return tpl.innerHTML.trim();
    var demos = qa('.sk-demo', scope).filter(function (d) { return d.closest('.sk-alt, .sk-card') === scope; });
    if (demos.length) return demos.map(function (d) { return d.innerHTML.trim(); }).join('\n\n');
    var st = q('.sk-stage', scope); return st ? st.innerHTML.trim() : '';
  }
  function legacyCopy(txt) {
    return new Promise(function (ok, no) {
      var ta = el('textarea'); ta.value = txt; ta.readOnly = true; ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
      D.body.appendChild(ta); ta.select(); ta.setSelectionRange(0, txt.length);
      var r = false; try { r = D.execCommand('copy'); } catch (x) { r = false; }
      ta.remove(); r ? ok() : no();
    });
  }
  function copy(btn) {
    var scope = btn.closest('.sk-alt, .sk-card') || app, txt = sourceFor(scope), label = btn.getAttribute('data-sk-label') || btn.textContent;
    btn.setAttribute('data-sk-label', label);
    function state(s, msg) {
      btn.setAttribute('data-state', s); btn.textContent = msg; clearTimeout(btn._t);
      btn._t = setTimeout(function () { btn.removeAttribute('data-state'); btn.textContent = label; }, 1800);
    }
    var p = (navigator.clipboard && navigator.clipboard.writeText) ? navigator.clipboard.writeText(txt).catch(function () { return legacyCopy(txt); }) : legacyCopy(txt);
    p.then(function () { state('ok', 'Copied ✓'); }, function () {
      state('fail', 'Copy failed');
      var foot = btn.closest('.sk-card__foot') || btn.parentNode, ta = q('.sk-copy-fallback', foot) || foot.appendChild(el('textarea', 'sk-copy-fallback'));
      ta.value = txt; ta.readOnly = true; ta.setAttribute('aria-label', 'HTML source (press Ctrl+C)'); ta.focus(); ta.select();
    });
  }

  /* ================= theme ================= */
  function stored() { try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; } }
  function themeNow() { return H.getAttribute('data-sk-theme') === 'dark' ? 'dark' : 'light'; }
  function setTheme(m, quiet) {
    H.setAttribute('data-sk-theme', m); try { localStorage.setItem(THEME_KEY, m); } catch (e) {}
    qa('[data-sk-theme-toggle]').forEach(function (b) { b.setAttribute('aria-pressed', String(m === 'dark')); });
    if (!quiet) themeCbs.forEach(function (fn) { fn(m === 'dark', m); });
  }
  function initTheme() {
    var st = stored(); if (st === 'dark' || st === 'light') setTheme(st); else setTheme(themeNow(), true);
  }

  /* ================= frames: scale-to-fit, fit/100%, lazy ================= */
  function initFrames() {
    ro = W.ResizeObserver ? new ResizeObserver(function (es) { es.forEach(function (x) { raf(function () { fit(x.target); }); }); }) : null;
    io = W.IntersectionObserver ? new IntersectionObserver(function (es) {
      es.forEach(function (x) { if (x.isIntersecting) { render(x.target); io.unobserve(x.target); } });
    }, { rootMargin: '400px 0px' }) : null;
    qa('.sk-frame').forEach(function (f) {
      var w = +f.getAttribute('data-sk-w'), h = +f.getAttribute('data-sk-h');
      if (!w || !h) return;
      var tpl = q(':scope > template', f), box = el('div', 'sk-frame__box'), inner = el('div', 'sk-frame__inner');
      inner.style.width = w + 'px'; inner.style.height = h + 'px';
      if (!tpl) while (f.firstChild) inner.appendChild(f.firstChild);
      box.appendChild(inner); f.appendChild(box);
      var s = f._sk = { w: w, h: h, tpl: tpl, box: box, inner: inner, mode: 'fit', done: !tpl, max: +f.getAttribute('data-sk-max-scale') || 1 };
      if (!tpl) box.classList.add('is-rendered');
      var cap = f.closest('.sk-screen') && q('.sk-screen__cap', f.closest('.sk-screen'));
      if (cap && f.getAttribute('data-sk-toggle') !== 'off') {
        s.scaleEl = el('span', 'sk-screen__scale'); var seg = el('div', 'sk-seg'); seg.setAttribute('role', 'group'); seg.setAttribute('aria-label', 'Frame size');
        [['fit', 'Fit'], ['100', '100%']].forEach(function (m) { var b = el('button', '', m[1]); b.type = 'button'; b.setAttribute('data-sk-frame-mode', m[0]); b.setAttribute('aria-pressed', String(m[0] === 'fit')); seg.appendChild(b); });
        cap.appendChild(s.scaleEl); cap.appendChild(seg);
      }
      if (ro) ro.observe(f);
      if (io && tpl) io.observe(f); else render(f);
    });
    fitAll(main);
  }
  function render(f) {
    var s = f._sk; if (!s || s.done) return; s.done = true;
    s.inner.appendChild(s.tpl.content.cloneNode(true)); s.box.classList.add('is-rendered');
    f.dispatchEvent(new CustomEvent('sk:frame', { bubbles: true }));
  }
  function fit(f) {
    var s = f._sk, avail = f.clientWidth; if (!s || !avail) return;       // hidden (display:none) -> measured again on route
    var sc = s.mode === '100' ? 1 : Math.min(s.max, avail / s.w);
    f.classList.toggle('is-100', s.mode === '100');
    if (s.mode === '100') { s.box.style.width = s.box.style.height = ''; s.inner.style.transform = ''; }
    else { s.box.style.width = Math.round(s.w * sc) + 'px'; s.box.style.height = Math.round(s.h * sc) + 'px'; s.inner.style.transform = 'scale(' + sc + ')'; }
    f.setAttribute('data-sk-scale', sc.toFixed(3));
    if (s.scaleEl) s.scaleEl.textContent = s.w + ' × ' + s.h + ' · ' + Math.round(sc * 100) + '%';
  }
  function fitAll(scope) { qa('.sk-frame', scope || main).forEach(fit); }
  function frameMode(btn) {
    var shot = btn.closest('.sk-screen'), f = shot && q('.sk-frame', shot); if (!f || !f._sk) return;
    f._sk.mode = btn.getAttribute('data-sk-frame-mode');
    qa('[data-sk-frame-mode]', shot).forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
    fit(f);
  }

  /* ================= lint (console.warn only) ================= */
  function lint() {
    var out = [], seen = {};
    qa('[id]', app).forEach(function (n) { if (seen[n.id]) out.push('duplicate id #' + n.id); seen[n.id] = 1; });
    order.forEach(function (o) {
      var s = o.sec, g = o.group;
      if (s.hasAttribute('data-sk-auto')) out.push(o.id + ': missing (auto-created as empty)');
      if (!o.canon && (g === 'foundations' || g === 'reference')) out.push(o.id + ': not a canonical ' + g + ' id');
      if (g === 'components' && idx(SUBS, o.sub) === SUBS.length) out.push(o.id + ': unknown component group (id = c-<group>-<name>)');
      qa('.sk-card', s).forEach(function (c) {
        if (!q('.sk-card__src', c)) out.push((c.id || o.id) + ': no .sk-card__src');
        if (!q('[data-sk-copy]', c)) out.push((c.id || o.id) + ': no Copy HTML button');
      });
    });
    qa('.sk-frame').forEach(function (f) { if (!f._sk) out.push('.sk-frame without data-sk-w/h'); });
    SK.problems = out; if (out.length) console.warn('[showcase-kit] ' + out.length + ' issue(s):\n- ' + out.join('\n- '));
    return out;
  }

  /* ================= public API ================= */
  var SK = W.SK = {
    version: '1.0',
    onThemeToggle: function (fn) { themeCbs.push(fn); var st = inited && stored(); if (st) fn(st === 'dark', st); },
    setTheme: setTheme, theme: themeNow,
    refit: function () { fitAll(main); },
    lint: lint, problems: [], all: ALL
  };
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', init); else init();
})();

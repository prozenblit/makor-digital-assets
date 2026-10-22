/* Makor showcase kit — computed-style snapshot / diff for migrations (paste into the console or evaluate via javascript_tool).
 *
 *   BEFORE editing:  open the ORIGINAL showcase with ?all (or with every section visible), then
 *                    SKSnap.save('before', { roots: '<css selector of the OLD demo containers>' })
 *   AFTER editing:   reload the migrated page with ?all (same tab/origin), paste again, then
 *                    SKSnap.diff('before')            // default roots = the kit's: .sk-stage, .sk-frame__inner, ...
 *   Result: { ok, before, after, onlyBefore:[...], onlyAfter:[...], changed:[{ el, n, groups }] }  ok === true means no demo changed.
 *
 * What is compared: every element inside the roots (the roots themselves are chrome and skipped), matched by
 * (tag + attributes + own text) so DOM order / section order may change. For each element the FULL computed style is hashed
 * in 5 groups (font, colour, background/mask, border/shadow, everything else). Layout-resolved sizes (width, height,
 * inline-size, block-size, transform-origin, perspective-origin) and custom properties are skipped because the new card chrome
 * legitimately changes available width. State is kept in sessionStorage (same tab + same origin survives a reload).
 * Cost: ~10-30 s for 25k elements. Elements carrying old/new chrome classes (sc-*, sk-*) are ignored.
 */
(function () {
  var SKIP = /^(--|width$|height$|inline-size$|block-size$|perspective-origin$|transform-origin$)/;
  var GRP = [/^(font|letter-spacing|line-height|text-|white-space|word-|-webkit-text)/, /^(color|fill|stroke|opacity|caret|accent)/,
    /^(background|mask|-webkit-mask|filter|backdrop)/, /^(border|outline|box-shadow)/];
  var NAMES = ['font', 'colour', 'background', 'border', 'layout'];
  var DEF = '.sk-stage, .sk-frame__inner, .sk-type__sample, .sk-icon__sample, .sk-sample__bed', SELF = '.sk-type__sample';
  function fnv(s) { var x = 2166136261; for (var i = 0; i < s.length; i++) { x ^= s.charCodeAt(i); x = Math.imul(x, 16777619); } return (x >>> 0).toString(36); }
  function own(e) { var t = ''; for (var n = e.firstChild; n; n = n.nextSibling) if (n.nodeType === 3) t += n.nodeValue.trim(); return t; }
  function chrome(e) { return /(^|\s)(sc|sk)-/.test(e.getAttribute('class') || ''); }
  function styleSig(e) {
    var cs = getComputedStyle(e), p = ['', '', '', '', ''], i, k, g, n;
    for (i = 0; i < cs.length; i++) {
      n = cs[i]; if (SKIP.test(n)) continue; g = 4;
      for (k = 0; k < 4; k++) if (GRP[k].test(n)) { g = k; break; }
      p[g] += n + ':' + cs.getPropertyValue(n) + ';';
    }
    return p.map(fnv).join('.');
  }
  function take(opt) {
    opt = opt || {}; var set = new Set(), map = {}, labels = {}, count = 0;
    window.dispatchEvent(new Event('beforeprint'));            // the kit renders every lazy frame on this event
    document.querySelectorAll(opt.roots || DEF).forEach(function (r) {
      r.querySelectorAll('*').forEach(function (e) { set.add(e); });
      if (r.matches(opt.self || SELF)) set.add(r);
    });
    set.forEach(function (e) {
      if (chrome(e) || e.closest('template')) return;
      var key = fnv(e.cloneNode(false).outerHTML + '|' + own(e));
      (map[key] = map[key] || []).push(styleSig(e)); count++;
      labels[key] = labels[key] || (e.tagName.toLowerCase() + (e.getAttribute('class') ? '.' + e.getAttribute('class').trim().split(/\s+/).join('.') : '') + (own(e) ? ' "' + own(e).slice(0, 24) + '"' : '')).slice(0, 90);
    });
    return { count: count, map: map, labels: labels };
  }
  window.SKSnap = {
    take: take,
    save: function (name, opt) { var s = take(opt); sessionStorage.setItem('sksnap:' + name, JSON.stringify(s)); return { saved: name, elements: s.count, bytes: JSON.stringify(s).length }; },
    diff: function (name, opt) {
      var a = JSON.parse(sessionStorage.getItem('sksnap:' + name) || 'null'); if (!a) return 'no snapshot named ' + name;
      var b = take(opt), onlyBefore = [], onlyAfter = [], changed = [], k, i;
      for (k in a.map) {
        if (!b.map[k]) { onlyBefore.push(a.labels[k] + ' x' + a.map[k].length); continue; }
        var A = a.map[k], B = b.map[k];
        if (A.length !== B.length) onlyBefore.push(a.labels[k] + ' count ' + A.length + '->' + B.length);
        for (i = 0; i < Math.min(A.length, B.length); i++) if (A[i] !== B[i]) {
          var x = A[i].split('.'), y = B[i].split('.');
          changed.push({ el: a.labels[k], n: i, groups: NAMES.filter(function (_, j) { return x[j] !== y[j]; }) });
        }
      }
      for (k in b.map) if (!a.map[k]) onlyAfter.push(b.labels[k] + ' x' + b.map[k].length);
      return { ok: !onlyBefore.length && !onlyAfter.length && !changed.length, before: a.count, after: b.count,
        onlyBefore: onlyBefore.slice(0, 40), onlyAfter: onlyAfter.slice(0, 40), changed: changed.slice(0, 60), changedTotal: changed.length };
    }
  };
  return 'SKSnap ready: SKSnap.save(name, {roots}) / SKSnap.diff(name, {roots})';
})();

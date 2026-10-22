// minimal HTML scanner: finds balanced element ranges without re-serialising anything
const VOID = new Set('area base br col embed hr img input link meta param source track wbr'.split(' '));
const RAW = new Set(['script', 'style', 'textarea', 'title']);
function* tags(html, from = 0, to = html.length) {
  let i = from;
  while (i < to) {
    const lt = html.indexOf('<', i);
    if (lt < 0 || lt >= to) return;
    if (html.startsWith('<!--', lt)) { const e = html.indexOf('-->', lt + 4); i = e < 0 ? to : e + 3; continue; }
    if (html.startsWith('<!', lt)) { const e = html.indexOf('>', lt); i = e + 1; continue; }
    const m = /^<(\/?)([a-zA-Z][a-zA-Z0-9-]*)/.exec(html.slice(lt, lt + 40));
    if (!m) { i = lt + 1; continue; }
    let j = lt + m[0].length, q = null;
    for (; j < to; j++) { const c = html[j]; if (q) { if (c === q) q = null; } else if (c === '"' || c === "'") q = c; else if (c === '>') break; }
    const raw = html.slice(lt, j + 1), name = m[2].toLowerCase();
    const selfClose = raw.endsWith('/>');
    yield { start: lt, end: j + 1, name, close: !!m[1], raw, void: VOID.has(name) || selfClose };
    i = j + 1;
    if (!m[1] && RAW.has(name) && !selfClose) { const re = new RegExp('</' + name + '\\s*>', 'ig'); re.lastIndex = i; const r = re.exec(html); i = r ? r.index : to; }
  }
}
// given the index of an opening tag, return {start,end,innerStart,innerEnd,open}
function element(html, start) {
  let depth = 0, first = null;
  for (const t of tags(html, start)) {
    if (!first) { first = t; if (t.void) return { start, end: t.end, innerStart: t.end, innerEnd: t.end, open: t }; depth = 1; continue; }
    if (t.void) continue;
    if (!t.close) { if (t.name === first.name) depth++; }
    else if (t.name === first.name) { depth--; if (depth === 0) return { start, end: t.end, innerStart: first.end, innerEnd: t.start, open: first }; }
  }
  throw new Error('unbalanced element at ' + start + ': ' + html.slice(start, start + 80));
}
function attr(openRaw, name) {
  const m = new RegExp('\\s' + name + '\\s*=\\s*("([^"]*)"|\'([^\']*)\')').exec(openRaw);
  return m ? (m[2] !== undefined ? m[2] : m[3]) : null;
}
// direct child elements of an element range
function children(html, el) {
  const out = []; let depth = 0;
  for (const t of tags(html, el.innerStart, el.innerEnd)) {
    if (t.void) { if (depth === 0) out.push({ start: t.start, end: t.end, name: t.name, open: t, innerStart: t.end, innerEnd: t.end }); continue; }
    if (!t.close) { if (depth === 0) out.push({ start: t.start, name: t.name, open: t }); depth++; }
    else { depth--; if (depth === 0) { const c = out[out.length - 1]; c.end = t.end; c.innerStart = c.open.end; c.innerEnd = t.start; } }
  }
  return out;
}
module.exports = { tags, element, attr, children, VOID };

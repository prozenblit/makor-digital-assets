// Shared read-only extractor for use_figma. Paste into the `code` param, edit TARGETS / DEPTH / PAGE_ID.
// Dumps every node's exact visual properties as compact JSON. Returns a JSON string.
const PAGE_ID = '48:850';            // page that contains the targets (set once per call)
const TARGETS = ['414:2798'];        // node ids to dump
const DEPTH = 4;                     // recursion depth (keep output < ~25k chars: lower DEPTH or fewer TARGETS)
const MAX_TEXT = 80;

await figma.setCurrentPageAsync(await figma.getNodeByIdAsync(PAGE_ID));
const r2 = x => (typeof x === 'number' ? Math.round(x * 100) / 100 : x);
const hex = c => '#' + [c.r, c.g, c.b].map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('').toUpperCase();
const paint = p => {
  if (p.visible === false) return null;
  if (p.type === 'SOLID') return hex(p.color) + (p.opacity !== undefined && p.opacity < 1 ? '@' + r2(p.opacity) : '');
  if (p.type.startsWith('GRADIENT')) return p.type + '[' + p.gradientStops.map(s => hex(s.color) + '@' + r2(s.color.a) + ' ' + r2(s.position)).join(', ') + ']';
  return p.type;
};
const paints = a => (Array.isArray(a) ? a.map(paint).filter(Boolean) : undefined);
const num = v => (typeof v === 'number' ? r2(v) : undefined);

async function dump(n, d) {
  const o = { id: n.id, name: n.name, type: n.type, w: r2(n.width), h: r2(n.height) };
  if (n.visible === false) o.hidden = true;
  if (typeof n.opacity === 'number' && n.opacity < 1) o.opacity = r2(n.opacity);
  if ('fills' in n) { const f = paints(n.fills); if (f && f.length) o.fills = f; }
  if ('strokes' in n) {
    const s = paints(n.strokes);
    if (s && s.length) {
      o.strokes = s;
      o.strokeW = typeof n.strokeWeight === 'number' ? r2(n.strokeWeight) : { t: n.strokeTopWeight, r: n.strokeRightWeight, b: n.strokeBottomWeight, l: n.strokeLeftWeight };
      o.strokeAlign = n.strokeAlign;
      if (n.dashPattern && n.dashPattern.length) o.dash = n.dashPattern;
    }
  }
  if ('cornerRadius' in n) {
    if (typeof n.cornerRadius === 'number') { if (n.cornerRadius) o.radius = r2(n.cornerRadius); }
    else o.radius = [n.topLeftRadius, n.topRightRadius, n.bottomRightRadius, n.bottomLeftRadius].map(r2);
  }
  if ('effects' in n && n.effects.length) o.effects = n.effects.filter(e => e.visible !== false).map(e => ({ t: e.type, c: e.color ? hex(e.color) + '@' + r2(e.color.a) : undefined, x: e.offset && e.offset.x, y: e.offset && e.offset.y, blur: e.radius, spread: e.spread }));
  if ('layoutMode' in n && n.layoutMode !== 'NONE') {
    o.layout = { dir: n.layoutMode, gap: n.itemSpacing, pad: [n.paddingTop, n.paddingRight, n.paddingBottom, n.paddingLeft], main: n.primaryAxisAlignItems, cross: n.counterAxisAlignItems };
    if (n.layoutWrap === 'WRAP') o.layout.wrap = true;
  }
  if ('layoutSizingHorizontal' in n) o.sizing = [n.layoutSizingHorizontal, n.layoutSizingVertical];
  if ('clipsContent' in n && n.clipsContent) o.clip = true;
  if (n.type === 'TEXT') {
    o.text = n.characters.slice(0, MAX_TEXT);
    const fn = n.fontName, fs = n.fontSize;
    o.font = typeof fn === 'object' && fn ? fn.family + ' ' + fn.style : 'mixed';
    o.size = typeof fs === 'number' ? fs : 'mixed';
    o.lh = typeof n.lineHeight === 'object' && n.lineHeight ? (n.lineHeight.unit === 'AUTO' ? 'auto' : r2(n.lineHeight.value) + (n.lineHeight.unit === 'PERCENT' ? '%' : 'px')) : 'mixed';
    o.ls = typeof n.letterSpacing === 'object' && n.letterSpacing ? r2(n.letterSpacing.value) + (n.letterSpacing.unit === 'PERCENT' ? '%' : 'px') : 'mixed';
    if (n.textCase !== 'ORIGINAL') o.case = n.textCase;
    if (typeof n.textDecoration === 'string' && n.textDecoration !== 'NONE') o.deco = n.textDecoration;
    o.align = n.textAlignHorizontal;
  }
  if (n.type === 'INSTANCE') { try { const mc = await n.getMainComponentAsync(); if (mc) o.main = mc.name + (mc.parent && mc.parent.type === 'COMPONENT_SET' ? ' / ' + mc.parent.name : ''); } catch (e) {} }
  if (n.type === 'COMPONENT' || n.type === 'COMPONENT_SET') o.desc = n.description || undefined;
  if (d > 0 && 'children' in n) o.kids = (await Promise.all(n.children.filter(c => c.visible !== false).map(c => dump(c, d - 1))));
  else if ('children' in n && n.children.length) o.kidCount = n.children.length;
  return o;
}
const out = [];
for (const id of TARGETS) out.push(await dump(await figma.getNodeByIdAsync(id), DEPTH));
return JSON.stringify(out);

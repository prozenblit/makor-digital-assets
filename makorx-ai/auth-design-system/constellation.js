/* =====================================================================
   MAKOR auth - constellation canvas helper (optional).
   Reproduces the three JS canvases of the prototypes with their EXACT parameters:
     "web"        src: makor-signin.html L443-490          (full-viewport canvas, light page)
     "app-light"  src: makor-authenticator.html L1237-1288 (launch screen, light)
     "app-dark"   src: makor-authenticator-dark.html D1262-1352 (launch screen, dark)
   Usage:  const c = MauthConstellation.start(document.getElementById('x'), 'web');  c.stop();
   Canvas CSS lives in components.css (.mauth-web-canvas / .mauth-app-launch-canvas).
   EXTENDED (not in the prototypes): under prefers-reduced-motion a single static frame is drawn and
   nothing animates; stop() is exposed for any preset (the web page never stopped; the app stopped
   when #s-launch got .hidden - call stop() at that moment, it is never restarted in the source).
   ===================================================================== */
(function (root) {
  var PRESETS = {
    /* count/dist: dot count + link distance (px). speed: velocity factor, v = (rand-.5)*speed per frame.
       r: radius = rand*rMul + rMin. rgb: ink. dot/line: alpha (line alpha = line*(1-d/dist), or (1-d/dist)*line for dark).
       edges: 'wrap' (leaves left -> enters right) | 'bounce' (velocity flips). lineWidth in px. */
    'web':       { count: 55, dist: 155, speed: .22, rMul: 1.2, rMin: .8, rgb: '0,45,70',   dot: .3,  line: .1,  lineWidth: .7, edges: 'wrap',   glow: 0,   size: 'window', fallback: [0, 0],     order: 'dots-first' },
    'app-light': { count: 45, dist: 120, speed: .22, rMul: 1.2, rMin: .8, rgb: '0,45,70',   dot: .28, line: .12, lineWidth: .7, edges: 'wrap',   glow: 0,   size: 'offset', fallback: [390, 800], order: 'dots-first' },
    'app-dark':  { count: 52, dist: 90,  speed: .28, rMul: 1.4, rMin: .8, rgb: '23,195,175', dot: .55, line: .22, lineWidth: .7, edges: 'bounce', glow: .08, size: 'rect',   fallback: [390, 844], order: 'links-first' }
  };

  function start(canvas, presetName) {
    var P = PRESETS[presetName];
    if (!canvas || !P) throw new Error('MauthConstellation: canvas + preset (web | app-light | app-dark) required');
    var ctx = canvas.getContext('2d');
    var w = 0, h = 0, dots = [], raf = 0, running = true;
    var reduce = root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize() {
      if (P.size === 'window') { w = canvas.width = root.innerWidth; h = canvas.height = root.innerHeight; }
      else if (P.size === 'offset') { w = canvas.width = canvas.offsetWidth || P.fallback[0]; h = canvas.height = canvas.offsetHeight || P.fallback[1]; }
      else { var r = canvas.parentElement.getBoundingClientRect(); w = canvas.width = r.width || P.fallback[0]; h = canvas.height = r.height || P.fallback[1]; }
    }
    function makeDot() {
      return { x: Math.random() * w, y: Math.random() * h,
               vx: (Math.random() - .5) * P.speed, vy: (Math.random() - .5) * P.speed,
               r: Math.random() * P.rMul + P.rMin };
    }
    function move(d) {
      d.x += d.vx; d.y += d.vy;
      if (P.edges === 'wrap') {
        if (d.x < 0) d.x = w; if (d.x > w) d.x = 0;
        if (d.y < 0) d.y = h; if (d.y > h) d.y = 0;
      } else {
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
      }
    }
    function drawDots() {
      dots.forEach(function (d) {
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + P.rgb + ',' + P.dot + ')'; ctx.fill();
        if (P.glow) { ctx.beginPath(); ctx.arc(d.x, d.y, d.r * 2.5, 0, Math.PI * 2); ctx.fillStyle = 'rgba(' + P.rgb + ',' + P.glow + ')'; ctx.fill(); }
      });
    }
    function drawLinks() {
      for (var i = 0; i < dots.length; i++) {
        for (var j = i + 1; j < dots.length; j++) {
          var dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < P.dist) {
            ctx.beginPath(); ctx.moveTo(dots[i].x, dots[i].y); ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = 'rgba(' + P.rgb + ',' + (P.line * (1 - dist / P.dist)) + ')';
            ctx.lineWidth = P.lineWidth; ctx.stroke();
          }
        }
      }
    }
    function frame(animate) {
      ctx.clearRect(0, 0, w, h);
      if (animate) dots.forEach(move);
      if (P.order === 'links-first') { drawLinks(); drawDots(); } else { drawDots(); drawLinks(); }
    }
    function loop() { if (!running) return; frame(true); raf = root.requestAnimationFrame(loop); }
    function onResize() { resize(); }   /* source: the web page only resizes the canvas, dots are NOT re-seeded */

    resize();
    dots = Array.from({ length: P.count }, makeDot);
    if (reduce) { frame(false); }
    else { loop(); }
    if (P.size === 'window') root.addEventListener('resize', onResize);
    return { stop: function () { running = false; root.cancelAnimationFrame(raf); root.removeEventListener('resize', onResize); } };
  }
  root.MauthConstellation = { start: start, presets: PRESETS };
})(window);

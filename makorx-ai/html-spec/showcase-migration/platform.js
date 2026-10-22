/* Platform wiring for the showcase page (runs after showcase-kit.js).
 * The app's own theme mechanism is class "dark" on <body> (key localStorage['makor-dm']); the kit only calls back. */
(function () {
  var booted = false, swState = null;
  window.addEventListener('load', function () { booted = true; });
  /* as before the migration: a theme change flips every .dm-switch (.on); the initial restore only does so for dark */
  function syncSwitches(scope, dark) { scope.querySelectorAll('.dm-switch').forEach(function (s) { s.classList.toggle('on', dark); }); }
  SK.onThemeToggle(function (dark) {
    document.body.classList.toggle('dark', dark);
    try { localStorage.setItem('makor-dm', dark ? '1' : '0'); } catch (e) {}
    if (dark || booted) { swState = dark; syncSwitches(document, dark); }
  });
  window.toggleDarkMode = function () { SK.setTheme(SK.theme() === 'dark' ? 'light' : 'dark'); };
  try { if (!localStorage.getItem('sk-theme') && localStorage.getItem('makor-dm') === '1') SK.setTheme('dark'); } catch (e) {}
  /* demo links (href="#") must not trigger the kit's hash routing */
  document.addEventListener('click', function (e) { var a = e.target.closest && e.target.closest('a[href="#"]'); if (a && a.closest('.sk-stage')) e.preventDefault(); });
  /* frames render lazily: wide viewport variants (2200 / 2560) reuse the 1920 frame's markup, and a frame rendered after a theme change gets the switch state */
  document.addEventListener('sk:frame', function (e) {
    var f = e.target, sel = f.getAttribute && f.getAttribute('data-hr-clone');
    if (sel) { var t = document.querySelector(sel), inner = f.querySelector('.sk-frame__inner'); if (t && inner) inner.appendChild(t.content.cloneNode(true)); }
    if (swState !== null) syncSwitches(f, swState);
  });
})();

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

export async function launch(port = 9444, opts = {}) {
  const dir = path.join(os.tmpdir(), 'hrmig-chrome-' + port);
  const proc = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--disable-gpu', '--remote-debugging-port=' + port, '--user-data-dir=' + dir,
    '--window-size=1400,900', '--hide-scrollbars', '--force-color-profile=srgb', '--disable-features=Translate', ...(opts.args || []), 'about:blank'
  ], { stdio: 'ignore' });
  let ws;
  for (let i = 0; i < 80; i++) {
    try { const r = await fetch(`http://127.0.0.1:${port}/json`); const t = (await r.json()).find(x => x.type === 'page'); if (t) { ws = t.webSocketDebuggerUrl; break; } } catch (e) {}
    await new Promise(r => setTimeout(r, 250));
  }
  if (!ws) throw new Error('chrome did not start');
  const sock = new WebSocket(ws); await new Promise(r => sock.onopen = r);
  let id = 0; const pend = {}; const logs = []; const net = [];
  const listeners = {};
  sock.onmessage = e => {
    const m = JSON.parse(e.data);
    if (m.id && pend[m.id]) { pend[m.id](m); delete pend[m.id]; return; }
    if (m.method === 'Runtime.consoleAPICalled') logs.push({ type: m.params.type, text: m.params.args.map(a => a.value ?? a.description).join(' ') });
    else if (m.method === 'Runtime.exceptionThrown') logs.push({ type: 'exception', text: JSON.stringify(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text) });
    else if (m.method === 'Log.entryAdded') logs.push({ type: 'log-' + m.params.entry.level, text: m.params.entry.text + ' ' + (m.params.entry.url || '') });
    else if (m.method === 'Network.responseReceived') net.push({ url: m.params.response.url, status: m.params.response.status, type: m.params.type });
    else if (m.method === 'Network.loadingFailed') net.push({ url: m.params.requestId, status: 0, failed: m.params.errorText, type: m.params.type });
    if (listeners[m.method]) listeners[m.method].forEach(f => f(m.params));
  };
  const send = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; sock.send(JSON.stringify({ id: i, method, params })); });
  await send('Runtime.enable'); await send('Page.enable'); await send('Log.enable'); await send('Network.enable');
  const api = {
    logs, net, send,
    async goto(url, w = 1400, h = 900) {
      await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: false });
      logs.length = 0; net.length = 0;
      const loaded = new Promise(r => { (listeners['Page.loadEventFired'] = listeners['Page.loadEventFired'] || []).push(() => r()); setTimeout(r, 20000); });
      await send('Page.navigate', { url }); await loaded;
      await new Promise(r => setTimeout(r, 800));
    },
    async ev(expr) {
      const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
      if (r.result.exceptionDetails) return { __error: JSON.stringify(r.result.exceptionDetails.exception?.description || r.result.exceptionDetails.text) };
      return r.result.result.value;
    },
    async shot(file, opts = {}) {
      const params = { format: 'png' };
      if (opts.full) { const m = await send('Page.getLayoutMetrics'); const cs = m.result.cssContentSize || m.result.contentSize; params.clip = { x: 0, y: 0, width: cs.width, height: Math.min(cs.height, opts.maxH || 6000), scale: 1 }; params.captureBeyondViewport = true; }
      if (opts.clip) { params.clip = { ...opts.clip, scale: opts.scale || 1 }; params.captureBeyondViewport = true; }
      const r = await send('Page.captureScreenshot', params); fs.writeFileSync(file, Buffer.from(r.result.data, 'base64'));
    },
    async key(key, code, mod = 0) { for (const t of ['keyDown', 'keyUp']) await send('Input.dispatchKeyEvent', { type: t, key, code: code || key, windowsVirtualKeyCode: ({ ArrowDown: 40, ArrowUp: 38, ArrowLeft: 37, ArrowRight: 39, Home: 36, End: 35, Enter: 13, Tab: 9, Escape: 27 }[key] || key.charCodeAt(0)), modifiers: mod }); },
    async click(x, y) { for (const t of ['mouseMoved', 'mousePressed', 'mouseReleased']) await send('Input.dispatchMouseEvent', { type: t, x, y, button: 'left', clickCount: 1 }); },
    wait: ms => new Promise(r => setTimeout(r, ms)),
    close() { try { sock.close(); } catch (e) {} proc.kill(); }
  };
  return api;
}

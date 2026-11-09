/* som3aware · TUI-inspired portfolio
   Reads the semantic content in #content and turns it into a two-pane workspace.
   With no JS (or ?plain) the same content reads as a normal page. */
(function () {
  'use strict';
  const root = document.documentElement;
  if (!root.classList.contains('tui')) return; // plain view: nothing to do

  try { init(); } catch (err) {
    console.error(err);
    root.className = 'plain';
  }

  function init() {
    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => [...r.querySelectorAll(s)];
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const store = {
      get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } },
      set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} },
    };
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = matchMedia('(max-width: 760px)');
    const THEMES = window.TUI_THEMES || [];
    const DEFAULT_THEME = window.TUI_DEFAULT_THEME || 'rose-pine-main';
    const themeById = id => THEMES.find(t => t.id === id);
    const FONTS = window.TUI_FONTS || [{ id: 'jetbrains-mono', name: 'JetBrains Mono', size: 13, css: [] }];
    const fontById = id => FONTS.find(f => f.id === id) || FONTS[0];
    const CV = $('#btn-cv').href;
    const MOD = /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘' : 'Ctrl+';
    $('#k-mod').textContent = MOD + 'K';

    /* ---------- model, read from the content markup ---------- */
    const TABS = $$('#content > section[data-tab]').map(s => ({
      id: s.dataset.tab,
      layout: s.dataset.layout || 'split',
      single: ['single', 'dash'].includes(s.dataset.layout),
      items: $$(':scope > article', s).map(a => ({
        key: a.dataset.key,
        meta: a.dataset.meta || '',
        slug: a.id.split('/').pop(),
        role: a.dataset.role || '',
        result: a.dataset.result || '',
        group: a.dataset.group || '',
        now: !!a.dataset.now,
        lead: (a.querySelector('.tu-lead') || a.querySelector('dd') || {}).textContent || '',
        html: a.innerHTML,
        copy: a.dataset.copy || (a.querySelector('.tu-link[href^="http"]') || {}).href || '',
      })),
    }));
    if (!TABS.length) throw new Error('no content');
    const tabIndex = id => TABS.findIndex(t => t.id === id);

    /* ---------- elements ---------- */
    const app = $('#app'), tabsEl = $('#tabs'), list = $('#list'), det = $('#det');
    const listPane = $('#listpane'), detPane = $('#detpane');
    const modalEl = $('#modal'), modalBody = $('#modal-body'), findEl = $('#find'), q = $('#q');
    const modeEl = $('#mode'), keysEl = $('#keys'), msgEl = $('#msg'), posEl = $('#pos');

    /* ---------- state ---------- */
    const st = { tab: 0, idx: TABS.map(() => 0), pane: 'list', zoom: false, modal: null, mdet: false };
    const cur = () => TABS[st.tab].items[st.idx[st.tab]];
    const single = () => TABS[st.tab].single;
    const hashFor = () => single() ? `#/${TABS[st.tab].id}` : `#/${TABS[st.tab].id}/${cur().slug}`;

    tabsEl.innerHTML = TABS.map((t, i) =>
      `<button class="tu-tab" role="tab" type="button" id="tab-${t.id}" data-tab="${i}" aria-controls="detpane"><span aria-hidden="true">${i + 1}</span> ${t.id}</button>`).join('');

    /* ---------- render ---------- */
    function renderList() {
      const t = TABS[st.tab];
      ['single', 'dash', 'table', 'graph'].forEach(c => app.classList.toggle(c, c === 'single' ? t.single : t.layout === c));
      list.classList.toggle('tbl', t.layout === 'table');
      list.classList.toggle('graph', t.layout === 'graph');
      $('#btn-zoom').hidden = t.single;
      let g = null;
      list.innerHTML = (t.layout === 'table' ? '<div class="tu-thead" role="presentation" aria-hidden="true"><span></span><span>name</span><span>year</span><span class="c-role">role</span><span>result</span></div>' : '')
        + t.items.map((x, k) => {
          const head = t.layout === 'table' && x.group !== g ? `<div class="tu-grp" role="presentation">${esc(g = x.group)}</div>` : '';
          const cells = t.layout === 'table'
            ? `<span>${esc(x.key)}</span><span class="meta">${esc(x.meta)}</span><span class="meta c-role">${esc(x.role)}</span><span class="res">${esc(x.result)}</span>`
            : t.layout === 'graph'
              ? `<span class="node${x.now ? ' now' : ''}" aria-hidden="true">${x.now ? '●' : '○'}</span><span>${esc(x.key)}${x.now ? ' <i class="head">HEAD</i>' : ''}</span><span class="meta">${esc(x.meta)}</span>`
              : `<span>${esc(x.key)}</span><span class="meta">${esc(x.meta)}</span>`;
          return `${head}<button class="tu-it" role="option" type="button" tabindex="-1" id="opt-${t.id}-${x.slug}" data-i="${k}"><span class="mk" aria-hidden="true">▸</span>${cells}</button>`;
        }).join('');
      $('#list-title').textContent = t.id;
      $$('.tu-tab', tabsEl).forEach((b, k) => { b.setAttribute('aria-selected', k === st.tab); b.tabIndex = k === st.tab ? 0 : -1; });
      const on = $$('.tu-tab', tabsEl)[st.tab];
      if (on && tabsEl.scrollWidth > tabsEl.clientWidth) tabsEl.scrollLeft = on.offsetLeft - tabsEl.offsetLeft - (tabsEl.clientWidth - on.offsetWidth) / 2;
    }
    function renderSel() {
      const t = TABS[st.tab], i = st.idx[st.tab], it = cur();
      $$('.tu-it', list).forEach((b, k) => b.setAttribute('aria-selected', k === i));
      const opt = $(`#opt-${t.id}-${it.slug}`);
      list.setAttribute('aria-activedescendant', opt ? opt.id : '');
      opt && opt.scrollIntoView({ block: 'nearest' });
      $('#list-count').textContent = `${i + 1}/${t.items.length}`;
    }
    function renderDetail() {
      const it = cur(), t = TABS[st.tab];
      $('#det-title').textContent = single() ? t.id : it.key;
      $('#det-crumb').textContent = single() ? '' : `${t.id} / `;
      det.innerHTML = `<div class="tu-det">${it.html}</div>`;
      det.scrollTop = 0;
      $('#btn-copy').hidden = !it.copy;
      posEl.textContent = single() ? `~/${t.id}` : `~/${t.id}/${it.slug}`;
      const d = $('.tu-det', det);
      $$('[id]', d).forEach(n => { n.dataset.anchor = n.id.split('/').pop(); n.removeAttribute('id'); });
      document.title = st.tab === 0 ? 'Ahmed Abu Qahf · som3aware' : `${single() ? t.id : it.key} · Ahmed Abu Qahf`;
      dither(d);
    }
    function render(full) { if (full) renderList(); renderSel(); renderDetail(); hints(); }

    /* contextual key hints: only what works right now; ? has the full list */
    function hints() {
      const H = st.modal === 'help' ? [['esc', 'close']]
        : st.modal ? [['↑↓', 'move'], ['⏎', st.modal === 'palette' ? 'run' : 'apply'], ['esc', 'cancel']]
        : small.matches ? []
        : single() ? [['j/k', 'scroll'], [`1-${TABS.length}`, 'section'], [MOD + 'K', 'commands'], ['?', 'keys']]
        : st.zoom ? [['j/k', 'scroll'], ['z', 'collapse'], ['esc', 'back'], ['?', 'keys']]
        : st.pane === 'list' ? [['j/k', 'move'], ['⏎', 'open'], ['l', 'read'], ['/', 'search'], ['?', 'keys']]
        : [['j/k', 'scroll'], ['h', 'list'], ['z', 'expand'], cur().copy ? ['y', 'copy'] : null, ['?', 'keys']];
      keysEl.innerHTML = H.filter(Boolean).map(([k, v]) => `<b>${k}</b> ${v}`).join('<i aria-hidden="true">  </i>');
    }

    function setPane(p, moveFocus = true) {
      if (single()) p = 'det';
      st.pane = p;
      listPane.classList.toggle('focus', p === 'list');
      detPane.classList.toggle('focus', p === 'det');
      if (moveFocus) (p === 'list' ? list : det).focus({ preventScroll: true });
      hints();
    }
    // mobile: one pane at a time
    function showDet(on) {
      st.mdet = on && !single();
      app.classList.toggle('mdet', st.mdet);
      if (st.mdet) setPane('det'); else if (!single()) setPane('list');
    }
    function setZoom(on) {
      if (on && single()) return;
      st.zoom = on;
      app.classList.toggle('zoom', on);
      $('#zoom-label').textContent = on ? 'collapse' : 'expand';
      setMode();
      if (on) setPane('det'); else hints();
    }
    function setMode() { modeEl.textContent = st.modal ? st.modal.toUpperCase() : st.zoom ? 'READ' : 'NORMAL'; }

    let msgT;
    function say(t) { msgEl.textContent = t; clearTimeout(msgT); msgT = setTimeout(() => (msgEl.textContent = ''), 3200); }

    /* ---------- navigation + url ---------- */
    function syncUrl(push) {
      const h = hashFor();
      if (location.hash === h) return;
      if (!location.hash && st.tab === 0 && st.idx[0] === 0) return; // keep the bare url on first screen
      history[push ? 'pushState' : 'replaceState'](null, '', h);
    }
    function goTab(i) {
      if (i < 0 || i >= TABS.length) return;
      const changed = i !== st.tab;
      st.tab = i;
      if (st.zoom) setZoom(false);
      render(true); showDet(false); setPane('list');
      if (changed) syncUrl(true);
    }
    function move(d) {
      if (st.pane === 'det') { det.scrollBy({ top: d * 64, behavior: reduce ? 'auto' : 'smooth' }); return; }
      const n = TABS[st.tab].items.length;
      st.idx[st.tab] = (st.idx[st.tab] + d + n) % n;
      renderSel(); renderDetail(); hints(); syncUrl(false);
    }
    function jump(end) {
      if (st.pane === 'det') { det.scrollTo({ top: end ? det.scrollHeight : 0, behavior: reduce ? 'auto' : 'smooth' }); return; }
      select(end ? TABS[st.tab].items.length - 1 : 0);
    }
    function select(k) { st.idx[st.tab] = k; renderSel(); renderDetail(); hints(); syncUrl(false); }
    function open() {
      if (small.matches && !st.mdet) return showDet(true);
      if (st.pane === 'list') return setPane('det');
      const link = $('.tu-link', det);
      if (link && link.href && !link.getAttribute('href').startsWith('#')) {
        link.classList.add('armed'); setTimeout(() => link.classList.remove('armed'), 300);
        link.click();
      }
    }
    async function copy() {
      const v = cur().copy;
      if (!v) return say('nothing to copy here');
      try { await navigator.clipboard.writeText(v); say(`✓ copied ${v.replace(/^https?:\/\//, '')}`); }
      catch (e) {
        const lead = $('.tu-lead', det);
        if (lead) { const r = document.createRange(); r.selectNodeContents(lead); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }
        say(`▲ copy blocked. press ${MOD}C`);
      }
    }

    // parse #/tab/item. returns null if empty, false if unknown
    function parse(hash) {
      if (!hash || hash === '#' || hash === '#/') return null;
      const m = hash.match(/^#\/([\w-]+)(?:\/([\w-]+))?\/?$/);
      if (!m) return false;
      const ti = tabIndex(m[1] === 'philosophy' ? 'about' : m[1]); // old links
      if (ti < 0) return false;
      if (!m[2]) return { tab: ti, idx: 0, item: false, anchor: m[1] === 'philosophy' ? 'principles' : '' };
      const ii = TABS[ti].items.findIndex(x => x.slug === m[2]);
      if (ii >= 0) return { tab: ti, idx: ii, item: true };
      // single-pane tabs: the second part is an anchor inside the page (#/about/education)
      return TABS[ti].single ? { tab: ti, idx: 0, item: false, anchor: m[2] } : false;
    }
    // go to a route. read: open the item in the detail pane (zoomed for case studies)
    function route(hash, { read = false, push = false } = {}) {
      if (hash === '#/cv') { window.open(CV, '_blank', 'noopener'); return; }
      const r = parse(hash);
      if (r === null) return;
      if (r === false) { say(`✗ no such page: ${hash.slice(1)}`); return; }
      const tabChanged = r.tab !== st.tab;
      st.tab = r.tab; st.idx[r.tab] = r.idx;
      render(tabChanged || !list.children.length);
      const z = read && r.item && TABS[r.tab].id === 'work' && !small.matches;
      if (z) setZoom(true);
      else { if (st.zoom && tabChanged) setZoom(false); showDet(r.item && read); setPane(r.item && read ? 'det' : 'list'); }
      if (r.anchor) toAnchor(r.anchor);
      if (push) history.pushState(null, '', r.anchor ? hash : hashFor());
    }
    function toAnchor(a) {
      const el = det.querySelector(`[data-anchor="${CSS.escape(a)}"]`);
      if (!el) return say(`✗ no such section: ${a}`);
      el.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' });
      el.classList.add('flash'); setTimeout(() => el.classList.remove('flash'), 1200);
    }
    const onHistory = () => {
      const r = parse(location.hash);
      if (r === null) { if (st.tab !== 0 || st.idx[0] !== 0) { st.tab = 0; st.idx[0] = 0; setZoom(false); render(true); showDet(false); } return; }
      if (r === false) { say(`✗ no such page: ${location.hash.slice(1)}`); history.replaceState(null, '', hashFor()); return; }
      if (r.tab === st.tab && r.idx === st.idx[st.tab] && !r.anchor) return;
      route(location.hash);
    };
    addEventListener('popstate', onHistory);
    addEventListener('hashchange', onHistory);

    /* ---------- theme ---------- */
    function applyTheme(id, save) {
      const t = themeById(id) || themeById(DEFAULT_THEME);
      if (!t) return;
      root.dataset.theme = t.id;
      $('#theme-name').textContent = `${t.name}`;
      if (save) store.set('tui-theme', t.id);
      requestAnimationFrame(() => dither(det, true));
    }

    /* ---------- font ---------- */
    function applyFont(id, save) {
      const f = window.TUI_SET_FONT ? window.TUI_SET_FONT(id) : fontById(id);
      $('#font-name').textContent = f.name;
      if (save) store.set('tui-font', f.id);
    }

    /* ---------- dithered screenshots (ordered Bayer dither in two theme colours) ---------- */
    const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(v => (v + .5) / 16);
    const grayCache = new Map();
    const hexRgb = h => { h = h.trim().replace('#', ''); return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)); };
    const lum = ([r, g, b]) => .2126 * r + .7152 * g + .0722 * b;
    function gray(img) {
      // one dither dot per 2 css px (1 on small images), so the pattern never gets scaled down into moire
      const css = img.getBoundingClientRect().width || 200;
      const w = Math.max(40, Math.min(img.naturalWidth, Math.floor(css / (css < 170 ? 1 : 2))));
      const key = img.src + '@' + w;
      if (grayCache.has(key)) return grayCache.get(key);
      const h = Math.round(img.naturalHeight * w / img.naturalWidth);
      const c = document.createElement('canvas'); c.width = w; c.height = h;
      const x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(img, 0, 0, w, h);
      const px = x.getImageData(0, 0, w, h).data, g = new Float32Array(w * h);
      for (let i = 0; i < g.length; i++) g[i] = Math.pow((px[i * 4] * .2126 + px[i * 4 + 1] * .7152 + px[i * 4 + 2] * .0722) / 255, 1.15);
      const out = { w, h, g, key }; grayCache.set(key, out); return out;
    }
    function paint(cv, { w, h, g }) {
      const cs = getComputedStyle(root);
      const bg = hexRgb(cs.getPropertyValue('--background')), ink = hexRgb(cs.getPropertyValue('--foreground'));
      const dark = lum(bg) < lum(ink); // on dark themes invert, so bright screens sink into the background
      const lo = dark ? bg : ink, hi = dark ? ink : bg;
      cv.width = w; cv.height = h;
      const x = cv.getContext('2d'), im = x.createImageData(w, h), d = im.data;
      for (let y = 0; y < h; y++) for (let i = 0; i < w; i++) {
        const k = y * w + i, v = dark ? 1 - g[k] : g[k], c = v > BAYER[(y & 3) * 4 + (i & 3)] ? hi : lo;
        d[k * 4] = c[0]; d[k * 4 + 1] = c[1]; d[k * 4 + 2] = c[2]; d[k * 4 + 3] = 255;
      }
      x.putImageData(im, 0, 0);
    }
    function dither(scope, repaint) {
      if (repaint) { $$('canvas[data-src]', scope).forEach(cv => { const g = grayCache.get(cv.dataset.key); g && paint(cv, g); }); return; }
      $$('img[data-dither]', scope).forEach(img => {
        const go = () => {
          try {
            const cv = document.createElement('canvas');
            const g = gray(img);
            cv.className = 'dith'; cv.dataset.src = img.src; cv.dataset.key = g.key; cv.setAttribute('role', 'img'); cv.setAttribute('aria-label', img.alt);
            paint(cv, g); img.replaceWith(cv);
          } catch (e) { /* keep the plain image */ }
        };
        img.loading = 'eager';
        img.complete && img.naturalWidth ? go() : img.addEventListener('load', go, { once: true });
      });
    }

    /* ---------- modals: theme picker, command palette, help ---------- */
    let mItems = [], mIdx = 0, themeBefore = null, fontBefore = null;
    const curFont = () => root.dataset.font || FONTS[0].id;
    const loadAllFonts = () => FONTS.forEach(f => window.TUI_LOAD_FONT && window.TUI_LOAD_FONT(f)); // picker rows render in their own face
    const fontRows = filter => FONTS.map((f, i) => ({ id: f.id, label: f.name, meta: `${f.size}px${i ? '' : ' · default'}`, font: f }))
      .filter(r => !filter || r.label.toLowerCase().includes(filter.toLowerCase()));
    const swatch = t => `<span class="sw" aria-hidden="true">${t.sw.map(c => `<i style="background:${c}"></i>`).join('')}</span>`;
    function themeRows(filter) {
      const f = filter.toLowerCase();
      const rows = [{ kind: 'reset', label: 'restore default', meta: themeById(DEFAULT_THEME)?.name || '', run: () => DEFAULT_THEME, group: '' }];
      THEMES.forEach(t => rows.push({ kind: 'theme', id: t.id, group: t.scheme, label: t.name + (t.variant !== 'main' && !t.name.toLowerCase().includes(t.variant) ? ` ${t.variant}` : ''), meta: t.appearance, t }));
      return rows.filter(r => !f || `${r.label} ${r.group} ${r.meta}`.toLowerCase().includes(f));
    }
    function paletteRows(filter) {
      const f = filter.toLowerCase(), rows = [];
      TABS.forEach((t, i) => rows.push({ group: 'go to', label: t.id, meta: `${i + 1}`, run: () => goTab(i) }));
      TABS.filter(t => !t.single).forEach(t => t.items.forEach(x =>
        rows.push({ group: t.id, label: x.key, meta: x.meta, run: () => route(`#/${t.id}/${x.slug}`, { read: true, push: true }) })));
      rows.push({ group: 'actions', label: 'open cv', meta: '↗', run: () => window.open(CV, '_blank', 'noopener') });
      rows.push({ group: 'actions', label: 'email ahmed', meta: '↗', run: () => (location.href = 'mailto:abokahfa@gmail.com') });
      rows.push({ group: 'actions', label: 'change theme', meta: 't', run: () => setTimeout(() => openModal('theme')) });
      rows.push({ group: 'actions', label: 'change font', meta: 'f', run: () => setTimeout(() => openModal('font')) });
      FONTS.forEach(f => rows.push({ group: 'fonts', label: `font: ${f.name}`, meta: '', run: () => applyFont(f.id, true) }));
      rows.push({ group: 'actions', label: 'show keys', meta: '?', run: () => setTimeout(() => openModal('help')) });
      THEMES.forEach(t => rows.push({ group: 'themes', label: `theme: ${t.name}`, meta: t.appearance, run: () => applyTheme(t.id, true), t }));
      return f ? rows.filter(r => `${r.label} ${r.group}`.toLowerCase().includes(f)) : rows.filter(r => r.group !== 'themes' && r.group !== 'fonts');
    }
    function drawModal() {
      const kind = st.modal, rows = mItems;
      let g = null;
      modalBody.innerHTML = rows.length ? rows.map((r, k) => {
        const head = r.group && r.group !== g ? `<div class="tu-grp" role="presentation">${esc(g = r.group)}</div>` : '';
        const selNow = (kind === 'theme' && r.id === themeBefore) || (kind === 'font' && r.id === fontBefore);
        return `${head}<button class="tu-it" type="button" role="option" tabindex="-1" id="m-${k}" data-m="${k}" aria-selected="${k === mIdx}"><span class="mk" aria-hidden="true">▸</span><span${r.font ? ` style="font-family:'${r.font.name}',var(--mono-fallback);font-size:${r.font.size}px"` : ''}>${r.t ? swatch(r.t) : ''}${esc(r.label)}${r.font ? ' <i class="ff-sample">{ } 0O 1lI</i>' : ''}</span><span class="meta">${selNow ? '<b class="cur">✓ current</b> ' : ''}${esc(r.meta || '')}</span></button>`;
      }).join('') : `<p class="tu-empty">no match for “${esc(q.value)}”</p>`;
      modalBody.setAttribute('aria-activedescendant', rows.length ? `m-${mIdx}` : '');
      q.setAttribute('aria-activedescendant', rows.length ? `m-${mIdx}` : '');
      $('#modal-count').textContent = rows.length ? `${mIdx + 1}/${rows.length}` : '0';
      const on = $(`#m-${mIdx}`); on && on.scrollIntoView({ block: 'nearest' });
      if (kind === 'theme' && rows[mIdx]) applyTheme(rows[mIdx].id || DEFAULT_THEME, false); // live preview
      if (kind === 'font' && rows[mIdx]) applyFont(rows[mIdx].id, false);
    }
    function filterModal() {
      mItems = st.modal === 'theme' ? themeRows(q.value) : st.modal === 'font' ? fontRows(q.value) : paletteRows(q.value);
      mIdx = Math.min(mIdx, Math.max(0, mItems.length - 1));
      if (st.modal === 'theme' && !q.value) mIdx = Math.max(0, mItems.findIndex(r => r.id === themeBefore));
      if (st.modal === 'font' && !q.value) mIdx = Math.max(0, mItems.findIndex(r => r.id === fontBefore));
      drawModal();
    }
    function moveModal(d) { if (!mItems.length) return; mIdx = (mIdx + d + mItems.length) % mItems.length; drawModal(); }
    function openModal(kind, seed = '') {
      if (st.modal) closeModal(false);
      st.modal = kind; modalEl.hidden = false; modalEl.dataset.kind = kind; setMode(); hints();
      const isList = kind !== 'help';
      findEl.hidden = !isList; $('#modal-count').hidden = !isList;
      if (kind === 'theme') {
        themeBefore = root.dataset.theme;
        $('#modal-title').textContent = 'theme';
        q.placeholder = `search ${THEMES.length} themes`;
        $('#modal-hint').innerHTML = '<b>↑↓</b> preview  <b>⏎</b> apply  <b>esc</b> cancel';
      } else if (kind === 'font') {
        fontBefore = curFont(); loadAllFonts();
        $('#modal-title').textContent = 'font';
        q.placeholder = `search ${FONTS.length} fonts`;
        $('#modal-hint').innerHTML = '<b>↑↓</b> preview  <b>⏎</b> apply  <b>esc</b> cancel';
      } else if (kind === 'palette') {
        $('#modal-title').textContent = 'commands';
        q.placeholder = 'go to, search work, themes…';
        $('#modal-hint').innerHTML = '<b>↑↓</b> move  <b>⏎</b> run  <b>esc</b> close';
      } else {
        $('#modal-title').textContent = 'keys';
        modalBody.innerHTML = `<dl class="help">${[
          [`1–${TABS.length}`, 'go to section'], ['j / k', 'move, or scroll the reading pane'], ['h / l', 'list pane / reading pane'],
          ['⇥', 'switch pane'], ['⏎', 'open item, or its link'], ['gg / G', 'first / last'], ['/', 'search'],
          [MOD + 'K', 'command palette'], ['t', 'theme'], ['f', 'font'], ['y', 'copy link or address'], ['z', 'expand the reading pane'],
          ['esc', 'close · collapse · back'], ['?', 'this help'],
        ].map(([a, b]) => `<dt><kbd>${a}</kbd></dt><dd>${b}</dd>`).join('')}</dl>
        <p class="tu-empty">Mouse and touch work everywhere too. <a href="?plain">Read as a plain page</a>.</p>`;
        $('#modal-hint').innerHTML = '<b>esc</b> close';
        modalBody.tabIndex = -1; modalBody.focus({ preventScroll: true });
        return;
      }
      q.value = seed; mIdx = 0; filterModal();
      q.focus({ preventScroll: true });
    }
    function runModal() {
      const r = mItems[mIdx];
      if (!r) return;
      if (st.modal === 'font') { closeModal(true, r.id); say(`✓ font ${fontById(r.id).name}`); return; }
      if (st.modal === 'theme') { const id = r.id || DEFAULT_THEME; closeModal(true, id); say(`✓ theme ${themeById(id).name}`); return; }
      closeModal(false); r.run();
    }
    function closeModal(keep, id) {
      if (st.modal === 'theme') applyTheme(keep ? id : themeBefore, keep);
      if (st.modal === 'font') applyFont(keep ? id : fontBefore, keep);
      st.modal = null; modalEl.hidden = true; setMode();
      setPane(st.pane);
    }
    q.addEventListener('input', () => { mIdx = 0; filterModal(); });

    /* ---------- pointer ---------- */
    app.addEventListener('click', e => {
      const a = e.target.closest('a[href^="#/"]');
      if (a) { e.preventDefault(); route(a.getAttribute('href'), { read: true, push: true }); return; }
      const tab = e.target.closest('.tu-tab');
      if (tab) return goTab(+tab.dataset.tab);
      const m = e.target.closest('[data-m]');
      if (m) { mIdx = +m.dataset.m; return runModal(); }
      if (e.target === modalEl) return closeModal(false);
      const it = e.target.closest('#list .tu-it');
      if (it) {
        const k = +it.dataset.i;
        if (small.matches) { select(k); return showDet(true); }
        if (k === st.idx[st.tab] && st.pane === 'list') return open(); // click the selected item again to read
        setPane('list'); select(k); return;
      }
      if (e.target.closest('#btn-back')) return showDet(false);
      if (e.target.closest('#btn-zoom')) return setZoom(!st.zoom);
      if (e.target.closest('#btn-copy')) return copy();
      if (e.target.closest('#btn-theme')) return openModal('theme');
      if (e.target.closest('#btn-font')) return openModal('font');
      if (e.target.closest('#btn-palette')) return openModal('palette');
      if (e.target.closest('#btn-help')) return openModal('help');
      if (e.target.closest('#detpane') && !e.target.closest('a, button')) setPane('det', false);
      else if (e.target.closest('#listpane')) setPane('list', false);
    });
    // live preview on hover in the theme picker
    modalBody.addEventListener('pointermove', e => {
      const m = e.target.closest('[data-m]');
      if (m && +m.dataset.m !== mIdx && (st.modal === 'theme' || st.modal === 'font')) { mIdx = +m.dataset.m; drawModal(); }
    });
    small.addEventListener('change', () => { showDet(false); hints(); });

    /* ---------- keys ---------- */
    let lastG = 0;
    addEventListener('keydown', e => {
      const k = e.key;
      if ((e.metaKey || e.ctrlKey) && k.toLowerCase() === 'k') { e.preventDefault(); return st.modal === 'palette' ? closeModal(false) : openModal('palette'); }
      if (st.modal) {
        if (k === 'Escape') { e.preventDefault(); return closeModal(false); }
        if (st.modal === 'help') { if (k === '?' || k === 'q') { e.preventDefault(); closeModal(false); } else if (k === 'Tab') e.preventDefault(); return; }
        if (k === 'ArrowDown' || (e.ctrlKey && k === 'n')) { e.preventDefault(); return moveModal(1); }
        if (k === 'ArrowUp' || (e.ctrlKey && k === 'p')) { e.preventDefault(); return moveModal(-1); }
        if (k === 'Enter') { e.preventDefault(); return runModal(); }
        if (k === 'Tab') { e.preventDefault(); q.focus(); } // keep focus inside the dialog
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.target.closest('input, textarea, select, [contenteditable]')) return;
      if (k.length === 1 || /^(Arrow|Tab|Enter)/.test(k)) app.classList.add('kbd');
      const onControl = e.target.closest('a, button:not(.tu-it)');
      if (/^[1-9]$/.test(k) && +k <= TABS.length) { e.preventDefault(); return goTab(+k - 1); }
      if (k === 'j' || k === 'ArrowDown') { e.preventDefault(); return move(1); }
      if (k === 'k' || k === 'ArrowUp') { e.preventDefault(); return move(-1); }
      if (k === 'g') { if (Date.now() - lastG < 500) { lastG = 0; jump(false); } else lastG = Date.now(); return; }
      if (k === 'G') return jump(true);
      if (k === 'h' || k === 'ArrowLeft') { if (!st.zoom) { e.preventDefault(); small.matches ? showDet(false) : setPane('list'); } return; }
      if (k === 'l' || k === 'ArrowRight') { e.preventDefault(); return small.matches ? showDet(true) : setPane('det'); }
      if (k === 'Tab' && !onControl && !st.zoom && !single() && !small.matches) { e.preventDefault(); return setPane(st.pane === 'list' ? 'det' : 'list'); }
      if (k === 'Enter' && !onControl) { e.preventDefault(); return open(); }
      if (k === '/') { e.preventDefault(); return openModal('palette'); }
      if (k === 'z') return setZoom(!st.zoom);
      if (k === 'y') return copy();
      if (k === 't') return openModal('theme');
      if (k === 'f') return openModal('font');
      if (k === '?') return openModal('help');
      if (k === 'Escape') { if (st.zoom) setZoom(false); else if (st.mdet) showDet(false); else setPane('list'); }
    });

    /* ---------- start ---------- */
    applyFont(curFont(), false);
    applyTheme(themeById(root.dataset.theme) ? root.dataset.theme : DEFAULT_THEME, false);
    render(true);
    setPane('list', false);
    if (location.hash) route(location.hash, { read: true });
    if (location.hash && parse(location.hash) === false) history.replaceState(null, '', location.pathname + location.search);
    window.__tui = { st, TABS };
  }
})();

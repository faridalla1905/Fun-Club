// Fun Club — content loader, gallery lightbox, and help widget
(function () {
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }

  // Mark active nav link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === path) a.setAttribute('aria-current', 'page');
  });

  // Year in footer
  const y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();

  // Inject help widget on every page
  injectHelpWidget();

  // Inject lightbox modal
  injectLightbox();

  // Dynamic content
  const targets = document.querySelectorAll('[data-render]');
  if (targets.length) {
    fetch('data/content.json')
      .then((r) => {
        if (!r.ok) throw new Error('content.json fetch failed: ' + r.status);
        return r.json();
      })
      .then((data) => targets.forEach((el) => render(el, data)))
      .catch((err) => {
        console.warn('[Fun Club] Could not load content.json.', err);
        targets.forEach((el) => {
          el.innerHTML =
            '<p class="hand" style="color:var(--coral);font-size:1.3rem">Content can\'t load when opening this file directly from your computer. Please serve the site (see README).</p>';
        });
      });
  }

  function render(el, data) {
    const kind = el.dataset.render;
    if (kind === 'stats') {
      el.innerHTML = data.stats
        .map(
          (s) =>
            `<div class="card stat ${tilt()}"><div class="num">${s.value}</div><span class="lbl">${s.label}</span></div>`
        )
        .join('');
    } else if (kind === 'news') {
      el.innerHTML = data.news
        .map(
          (n) => `
        <article class="card news ${tilt()}">
          <div><span class="tag">${n.tag}</span><span class="date">${n.date}</span></div>
          <h3>${n.title}</h3>
          <p>${n.body}</p>
        </article>`
        )
        .join('');
    } else if (kind === 'programs-preview') {
      el.innerHTML = data.programsPreview
        .map(
          (p, i) => `
        <article class="card program ${['yellow','mint','sky','paper'][i%4]} ${tilt()}">
          <div class="icon" aria-hidden="true">${p.icon}</div>
          <h3>${p.title}</h3>
          <p>${p.body}</p>
        </article>`
        )
        .join('');
    } else if (kind === 'programs') {
      el.innerHTML = data.programs
        .map(
          (p, i) => `
        <article class="card program ${['yellow','mint','sky','paper'][i%4]}">
          <div class="icon" aria-hidden="true" style="font-size:2.4rem">${p.icon}</div>
          <h3>${p.title}</h3>
          <p>${p.body}</p>
        </article>`
        )
        .join('');
    } else if (kind === 'gallery') {
      const videos = data.gallery.filter((g) => g.video);
      const photos = data.gallery.filter((g) => !g.video);
      const videoCards = videos
        .map(
          (g, i) => `
        <figure class="card gallery-item ${g.color} ${tilt()}" data-media="video" data-src="${g.video}" data-title="${escapeAttr(g.title)}" tabindex="0" role="button" aria-label="Play video: ${escapeAttr(g.title)}">
          <video src="${g.video}" preload="metadata" playsinline muted></video>
          <span class="play-badge" aria-hidden="true">▶</span>
          <figcaption class="title">${g.title}</figcaption>
        </figure>`
        )
        .join('');
      const photoCards = photos
        .map(
          (g) => `
        <figure class="card gallery-item ${g.color} ${tilt()}" data-media="image" data-src="${g.image}" data-title="${escapeAttr(g.title)}" tabindex="0" role="button" aria-label="View photo: ${escapeAttr(g.title)}">
          <img src="${g.image}" alt="${escapeAttr(g.title)}" loading="lazy" />
          <figcaption class="title">${g.title}</figcaption>
        </figure>`
        )
        .join('');

      let html = '';
      if (videos.length) {
        html += `
          <section class="gallery-group">
            <header class="gallery-group-header">
              <span class="eyebrow">Spring Session</span>
              <h2>Spring Session Presentation</h2>
              <p class="section-lead">A look at our members sharing what they learned with families and friends.</p>
            </header>
            <div class="grid cols-2 gallery-videos">${videoCards}</div>
          </section>`;
      }
      if (photos.length) {
        html += `<div class="grid cols-3" style="margin-top:2.5rem">${photoCards}</div>`;
      }
      el.innerHTML = html;

      // Bind clicks for lightbox
      el.querySelectorAll('.gallery-item').forEach((node) => {
        const open = () => openLightbox(node.dataset.media, node.dataset.src, node.dataset.title);
        node.addEventListener('click', open);
        node.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
        });
      });
    }
  }

  function escapeAttr(s) { return String(s).replace(/"/g, '&quot;'); }

  function tilt() {
    const r = Math.random();
    if (r < 0.33) return 'tilt-l';
    if (r > 0.66) return 'tilt-r';
    return '';
  }

  // -------- Lightbox --------
  function injectLightbox() {
    const wrap = document.createElement('div');
    wrap.className = 'lb-backdrop';
    wrap.setAttribute('hidden', '');
    wrap.innerHTML = `
      <div class="lb-inner" role="dialog" aria-modal="true" aria-label="Media viewer">
        <button class="lb-close" aria-label="Close">×</button>
        <div class="lb-media"></div>
        <div class="lb-caption"></div>
      </div>`;
    document.body.appendChild(wrap);
    wrap.addEventListener('click', (e) => { if (e.target === wrap) closeLightbox(); });
    wrap.querySelector('.lb-close').addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
  }

  function openLightbox(kind, src, title) {
    const wrap = document.querySelector('.lb-backdrop');
    if (!wrap) return;
    const media = wrap.querySelector('.lb-media');
    const cap = wrap.querySelector('.lb-caption');
    if (kind === 'video') {
      media.innerHTML = `<video src="${src}" controls autoplay playsinline></video>`;
    } else {
      media.innerHTML = `<img src="${src}" alt="${escapeAttr(title || '')}" />`;
    }
    cap.textContent = title || '';
    wrap.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    const wrap = document.querySelector('.lb-backdrop');
    if (!wrap) return;
    wrap.setAttribute('hidden', '');
    wrap.querySelector('.lb-media').innerHTML = '';
    document.body.style.overflow = '';
  }

  // -------- Help widget --------
  function injectHelpWidget() {
    const btn = document.createElement('button');
    btn.className = 'help-fab';
    btn.setAttribute('aria-label', 'Open help');
    btn.innerHTML = '<span aria-hidden="true">?</span>';

    const panel = document.createElement('div');
    panel.className = 'help-panel';
    panel.setAttribute('hidden', '');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Help & support');
    panel.innerHTML = `
      <div class="help-header">
        <div>
          <div class="help-title">Need a hand?</div>
          <div class="help-sub">Search or pick a quick link below.</div>
        </div>
        <button class="help-close" aria-label="Close help">×</button>
      </div>
      <form class="help-search">
        <input type="search" placeholder="Search FAQs…" aria-label="Search FAQs" />
        <button type="submit" aria-label="Search">🔍</button>
      </form>
      <div class="help-results" hidden></div>
      <div class="help-links">
        <a href="volunteer.html" class="help-link" data-tags="volunteer join help apply signup form application">🙌 How to volunteer</a>
        <a href="programs.html" class="help-link" data-tags="programs english learning stem leadership toolkit classes lessons">📚 Our programs</a>
        <a href="contact.html" class="help-link" data-tags="contact email instagram linkedin location dallas message">✉️ Contact the team</a>
        <a href="about.html" class="help-link" data-tags="about story mission founders farid gulara history">🌱 Our story</a>
        <a href="impact.html" class="help-link" data-tags="impact stats hours members results outcomes">📈 Our impact</a>
        <a href="gallery.html" class="help-link" data-tags="gallery photos videos pictures events sessions">🖼️ Gallery</a>
      </div>
      <div class="help-footer">Still stuck? <a href="mailto:funclub2020@gmail.com">Email us</a></div>
    `;
    document.body.appendChild(btn);
    document.body.appendChild(panel);

    const allLinks = () => Array.from(panel.querySelectorAll('.help-link'));
    const resultsBox = panel.querySelector('.help-results');
    const searchForm = panel.querySelector('.help-search');
    const searchInput = searchForm.querySelector('input');

    const runSearch = () => {
      const q = searchInput.value.trim().toLowerCase();
      const links = allLinks();
      if (!q) {
        links.forEach((l) => (l.style.display = ''));
        resultsBox.setAttribute('hidden', '');
        resultsBox.textContent = '';
        return;
      }
      let matches = 0;
      links.forEach((l) => {
        const hay = ((l.dataset.tags || '') + ' ' + l.textContent).toLowerCase();
        const hit = hay.includes(q);
        l.style.display = hit ? '' : 'none';
        if (hit) matches++;
      });
      resultsBox.removeAttribute('hidden');
      resultsBox.innerHTML = matches
        ? `<strong>${matches}</strong> result${matches === 1 ? '' : 's'} for "${escapeAttr(q)}"`
        : `No matches for "${escapeAttr(q)}". Try "volunteer", "programs", or <a href="mailto:funclub2020@gmail.com">email us</a>.`;
    };
    searchForm.addEventListener('submit', (e) => { e.preventDefault(); runSearch(); });
    searchInput.addEventListener('input', runSearch);

    const toggle = () => {
      const open = !panel.hasAttribute('hidden');
      if (open) { panel.setAttribute('hidden', ''); btn.classList.remove('open'); }
      else { panel.removeAttribute('hidden'); btn.classList.add('open'); }
    };
    btn.addEventListener('click', toggle);
    panel.querySelector('.help-close').addEventListener('click', toggle);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !panel.hasAttribute('hidden')) toggle();
    });
  }
})();

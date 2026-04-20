/* App: render content, toc, tabs, search, tweaks */
(function(){
  'use strict';

  const main = document.getElementById('main');
  const tocEl = document.getElementById('toc');
  const search = document.getElementById('q');

  /* -------- renderers -------- */
  function cardHTML(c, idx) {
    return `
      <article class="card" data-search="${escapeAttr((c.name||'') + ' ' + stripMath(c.math||'') + ' ' + (c.tip||''))}">
        <div class="lbl"><span class="name">${c.name||''}</span><span class="idx">${idx}</span></div>
        <div class="math">${c.math||''}</div>
        ${c.tip ? `<div class="tip">${c.tip}</div>` : ''}
      </article>`;
  }

  function distHTML(d) {
    const rows = [];
    if (d.fmp) rows.push(['fmp / fdp', d.fmp]);
    if (d.fda) rows.push(['fda', d.fda]);
    if (d.mean) rows.push(['media', d.mean]);
    if (d.var) rows.push(['varianza', d.var]);
    return `
      <div class="dist" data-search="${escapeAttr(d.name + ' ' + d.notation + ' ' + (d.use||''))}">
        <h4>${d.name}</h4>
        <div class="notation">$${d.notation}$</div>
        <div class="use">${d.use||''}</div>
        <dl class="rows">
          ${rows.map(([k,v]) => `<dt>${k}</dt><dd><div class="math">${v}</div></dd>`).join('')}
        </dl>
        ${d.tip ? `<div class="tip">${d.tip}</div>` : ''}
      </div>`;
  }

  function tableHTML(t) {
    return `
      <table class="ref">
        <thead><tr>${t.head.map(h=>`<th>${h}</th>`).join('')}</tr></thead>
        <tbody>${t.rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
      </table>`;
  }

  function calloutHTML(c) {
    return `
      <div class="callout" data-search="${escapeAttr(c.cap + ' ' + c.items.join(' '))}">
        <div class="cap">${c.cap}</div>
        <ul>${c.items.map(i=>`<li>${i}</li>`).join('')}</ul>
      </div>`;
  }

  function sectionHTML(s, temaNum) {
    // Distribution section (single dist item)
    if (s.dist) return distHTML(s.dist);

    let body = '';
    if (s.cards && s.cards.length) {
      const idxPad = (i) => String(i+1).padStart(2,'0');
      body += `<div class="grid">${s.cards.map((c,i)=>cardHTML(c, temaNum+'.'+idxPad(i))).join('')}</div>`;
    }
    if (s.table) body += tableHTML(s.table);
    if (s.callouts) body += s.callouts.map(calloutHTML).join('');

    return `
      <div class="subsec" data-subsec="${s.id}">
        ${s.title ? `<h3 class="sub" id="${s.id}">${s.title}</h3>` : ''}
        ${body}
      </div>`;
  }

  function temaHTML(t) {
    // Group consecutive dist-sections under an automatic heading if needed
    let content = '';
    let inDistGroup = false;
    t.sections.forEach((s,i)=>{
      if (s.dist) {
        if (!inDistGroup) {
          content += `<h3 class="sub">Distribuciones</h3><div class="grid two" data-distgrid="1">`;
          inDistGroup = true;
        }
        content += `<div id="${s.id}">${distHTML(s.dist)}</div>`;
      } else {
        if (inDistGroup) { content += `</div>`; inDistGroup = false; }
        content += sectionHTML(s, t.num);
      }
    });
    if (inDistGroup) content += `</div>`;

    return `
      <section class="tema" id="${t.id}">
        <div class="tema-header">
          <span class="tema-num">TEMA · ${t.num}</span>
          <h2>${t.title}</h2>
          <span class="meta">${t.subtitle||''}</span>
        </div>
        ${content}
      </section>`;
  }

  /* -------- helpers -------- */
  function escapeAttr(s) { return (s||'').replace(/"/g,'&quot;').replace(/</g,'&lt;').toLowerCase(); }
  function stripMath(s) {
    return (s||'').replace(/\$+/g,'').replace(/\\[a-zA-Z]+/g,' ').replace(/[{}\\]/g,' ');
  }

  /* -------- build TOC -------- */
  function buildTOC() {
    tocEl.innerHTML = window.FORM.map(t => {
      const subs = t.sections
        .filter(s => s.title && !s.dist)
        .map(s => `<li><a href="#${s.id}" data-sub>${s.title}</a></li>`).join('');
      return `<li>
        <a href="#${t.id}" data-tema="${t.id}">${t.title}</a>
        ${subs ? `<ul>${subs}</ul>` : ''}
      </li>`;
    }).join('');
  }

  /* -------- build MAIN -------- */
  function buildMain() {
    main.innerHTML = window.FORM.map(temaHTML).join('') +
      `<div id="none" class="search-none" style="display:none">Sin resultados. Prueba otro término.</div>`;
  }

  /* -------- search -------- */
  let searchTimeout;
  search.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(runSearch, 100);
  });
  search.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { search.value = ''; runSearch(); search.blur(); }
  });

  function runSearch() {
    const q = search.value.trim().toLowerCase();
    const none = document.getElementById('none');
    const cards = main.querySelectorAll('[data-search]');
    const subsecs = main.querySelectorAll('.subsec');
    const temas = main.querySelectorAll('section.tema');

    if (!q) {
      cards.forEach(c => c.classList.remove('hidden'));
      subsecs.forEach(s => s.classList.remove('hidden'));
      temas.forEach(t => t.classList.remove('hidden'));
      none.style.display = 'none';
      return;
    }
    let hits = 0;
    cards.forEach(c => {
      const match = c.getAttribute('data-search').includes(q);
      c.classList.toggle('hidden', !match);
      if (match) hits++;
    });
    subsecs.forEach(sec => {
      const anyVisible = sec.querySelectorAll('[data-search]:not(.hidden)').length > 0;
      sec.classList.toggle('hidden', !anyVisible);
    });
    temas.forEach(t => {
      const anyVisible = t.querySelectorAll('[data-search]:not(.hidden)').length > 0;
      t.classList.toggle('hidden', !anyVisible);
    });
    none.style.display = hits === 0 ? 'block' : 'none';
  }

  /* -------- scroll spy -------- */
  function initScrollSpy() {
    const temaLinks = tocEl.querySelectorAll('a[data-tema]');
    const subLinks = tocEl.querySelectorAll('a[data-sub]');
    const temas = Array.from(document.querySelectorAll('section.tema'));
    const subs = Array.from(document.querySelectorAll('h3.sub[id]'));

    function onScroll() {
      const y = window.scrollY + 120;
      // active tema
      let activeT = temas[0];
      for (const t of temas) if (t.offsetTop <= y) activeT = t;
      temaLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#'+activeT.id));
      // active sub
      let activeS = subs[0];
      for (const s of subs) if (s.offsetTop <= y) activeS = s;
      subLinks.forEach(a => a.classList.toggle('is-active', activeS && a.getAttribute('href') === '#'+activeS.id));
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* -------- toolbar (density + theme) -------- */
  function initToolbar() {
    const saved = JSON.parse(localStorage.getItem('formulario.prefs') || '{}');
    if (saved.density) document.body.dataset.density = saved.density;
    if (saved.theme)   document.body.dataset.theme   = saved.theme;
    syncToolbar();

    document.querySelectorAll('.toolbar button').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.dataset.density) document.body.dataset.density = btn.dataset.density;
        if (btn.dataset.theme)   document.body.dataset.theme   = btn.dataset.theme;
        const prefs = { density: document.body.dataset.density, theme: document.body.dataset.theme };
        localStorage.setItem('formulario.prefs', JSON.stringify(prefs));
        syncToolbar();
      });
    });
  }
  function syncToolbar() {
    document.querySelectorAll('.toolbar button').forEach(btn => {
      const active = (btn.dataset.density && btn.dataset.density === document.body.dataset.density)
                  || (btn.dataset.theme   && btn.dataset.theme   === document.body.dataset.theme);
      btn.classList.toggle('active', !!active);
    });
  }

  /* -------- keyboard -------- */
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === '/') { e.preventDefault(); search.focus(); }
    if (e.key === 'j' || e.key === 'k') {
      const temas = Array.from(document.querySelectorAll('section.tema'));
      const y = window.scrollY + 100;
      let idx = 0;
      for (let i=0;i<temas.length;i++) if (temas[i].offsetTop <= y) idx = i;
      const next = e.key === 'j' ? Math.min(idx+1, temas.length-1) : Math.max(idx-1, 0);
      window.scrollTo({ top: temas[next].offsetTop - 20, behavior: 'smooth' });
    }
  });

  /* -------- init -------- */
  buildTOC();
  buildMain();
  initToolbar();
  initScrollSpy();

  /* Retypeset math after dynamic injection */
  function typeset() {
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise([main]).catch(()=>{});
    } else {
      setTimeout(typeset, 200);
    }
  }
  typeset();
})();

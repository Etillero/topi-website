(function(){
  document.documentElement.classList.add('js');
  setTimeout(function(){ document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in'); }); }, 3000);
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- hero: rotación de fotos --- */
  var slides = document.querySelectorAll('.hero-shot .slide');
  var hdots = document.querySelectorAll('#heroDots button');
  var hi = 0, htimer;
  function showHero(i){
    hi = (i + slides.length) % slides.length;
    slides.forEach(function(s,k){ s.classList.toggle('on', k===hi); });
    hdots.forEach(function(d,k){ d.classList.toggle('on', k===hi); });
  }
  function startHero(){ if(reduce) return; clearInterval(htimer); htimer = setInterval(function(){ showHero(hi+1); }, 4200); }
  hdots.forEach(function(d,k){ d.addEventListener('click', function(){ showHero(k); startHero(); }); });
  startHero();

  /* --- nav: compacta + sección activa + menú mobile --- */
  var topbar = document.getElementById('topbar');
  var links = document.querySelectorAll('.menu a');
  var sections = ['top','services','about','projects','reviews','contact'].map(function(id){ return document.getElementById(id); });
  function onScroll(){
    var y = window.scrollY || document.documentElement.scrollTop;
    topbar.classList.toggle('small', y > 80);
    document.getElementById('totop').classList.toggle('on', y > 700);
    var current = 'top';
    sections.forEach(function(s){ if(s && s.getBoundingClientRect().top <= 140) current = s.id; });
    links.forEach(function(a){ a.classList.toggle('active', a.getAttribute('href') === '#'+current); });
  }
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();

  var burger = document.getElementById('burger'), drawer = document.getElementById('drawer');
  burger.addEventListener('click', function(){ drawer.classList.toggle('open'); });
  drawer.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ drawer.classList.remove('open'); }); });

  /* --- reveal al entrar en pantalla --- */
  if('IntersectionObserver' in window){
    var ro = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); ro.unobserve(e.target); } });
    }, {threshold:.15});
    document.querySelectorAll('.reveal').forEach(function(el){ ro.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in'); });
  }

  /* --- pestañas de servicios --- */
  var tabs = document.querySelectorAll('#tabs button');
  var panels = document.querySelectorAll('.panel');
  tabs.forEach(function(b){
    b.addEventListener('click', function(){
      var i = b.getAttribute('data-tab');
      tabs.forEach(function(x){ x.classList.remove('on'); });
      b.classList.add('on');
      panels.forEach(function(p){ p.classList.toggle('on', p.getAttribute('data-panel') === i); });
    });
  });

  /* --- contadores --- */
  var statsEl = document.getElementById('stats');
  function runCounters(){
    statsEl.querySelectorAll('b').forEach(function(b){
      var to = parseInt(b.getAttribute('data-to'),10), suf = b.getAttribute('data-suffix') || '';
      if(isNaN(to)) return; // no confirmed number yet — leave the placeholder text as-is
      if(reduce){ b.textContent = to + suf; return; }
      b.textContent = '0' + suf;
      var t0 = null, dur = 1200;
      function step(ts){
        if(!t0) t0 = ts;
        var p = Math.min((ts - t0)/dur, 1);
        b.textContent = Math.round(to * (1 - Math.pow(1-p,3))) + suf;
        if(p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }
  if('IntersectionObserver' in window){
    var so = new IntersectionObserver(function(e){ if(e[0].isIntersecting){ runCounters(); so.disconnect(); } }, {threshold:.4});
    so.observe(statsEl);
  } else { runCounters(); }

  /* --- antes / después --- */
  var ba = document.getElementById('ba'), baBefore = document.getElementById('baBefore'), baHandle = document.getElementById('baHandle');
  var dragging = false;
  function setBA(clientX){
    var r = ba.getBoundingClientRect();
    var pct = Math.max(4, Math.min(96, ((clientX - r.left) / r.width) * 100));
    baBefore.style.width = pct + '%';
    baHandle.style.left = pct + '%';
  }
  ba.addEventListener('pointerdown', function(e){ dragging = true; ba.setPointerCapture(e.pointerId); setBA(e.clientX); });
  ba.addEventListener('pointermove', function(e){ if(dragging) setBA(e.clientX); });
  ba.addEventListener('pointerup', function(){ dragging = false; });
  ba.addEventListener('pointercancel', function(){ dragging = false; });

  /* --- carrusel de proyectos --- */
  var track = document.getElementById('track');
  var cards = track.querySelectorAll('.slide-card');
  var dots = document.getElementById('dots');
  cards.forEach(function(_, i){
    var b = document.createElement('button');
    b.setAttribute('aria-label','Proyecto ' + (i+1));
    if(i === 0) b.classList.add('on');
    b.addEventListener('click', function(){ track.scrollTo({left: cards[i].offsetLeft - track.offsetLeft, behavior: reduce ? 'auto' : 'smooth'}); });
    dots.appendChild(b);
  });
  function step(dir){
    var w = cards[0].getBoundingClientRect().width + 22;
    var maxScroll = track.scrollWidth - track.clientWidth;
    if(dir === 1 && track.scrollLeft >= maxScroll - 2){
      track.scrollTo({left: 0, behavior: reduce ? 'auto' : 'smooth'});
    } else if(dir === -1 && track.scrollLeft <= 2){
      track.scrollTo({left: maxScroll, behavior: reduce ? 'auto' : 'smooth'});
    } else {
      track.scrollBy({left: dir * w, behavior: reduce ? 'auto' : 'smooth'});
    }
  }
  document.getElementById('prev').addEventListener('click', function(){ step(-1); });
  document.getElementById('next').addEventListener('click', function(){ step(1); });
  track.addEventListener('scroll', function(){
    var w = cards[0].getBoundingClientRect().width + 22;
    var i = Math.round(track.scrollLeft / w);
    dots.querySelectorAll('button').forEach(function(d,k){ d.classList.toggle('on', k===i); });
  }, {passive:true});

  /* --- reseñas --- */
  var quotes = document.querySelectorAll('.quote');
  var qdots = document.getElementById('qdots');
  var qi = 0, qtimer;
  quotes.forEach(function(_, i){
    var b = document.createElement('button');
    b.setAttribute('aria-label','Review ' + (i+1));
    if(i === 0) b.classList.add('on');
    b.addEventListener('click', function(){ showQuote(i); startQuotes(); });
    qdots.appendChild(b);
  });
  function showQuote(i){
    qi = (i + quotes.length) % quotes.length;
    quotes.forEach(function(q,k){ q.classList.toggle('on', k===qi); });
    qdots.querySelectorAll('button').forEach(function(d,k){ d.classList.toggle('on', k===qi); });
  }
  function startQuotes(){ if(reduce) return; clearInterval(qtimer); qtimer = setInterval(function(){ showQuote(qi+1); }, 5200); }
  startQuotes();

  /* --- formulario de muestra --- */
  document.getElementById('form').addEventListener('submit', function(e){
    e.preventDefault();
    document.getElementById('formMsg').classList.add('on');
  });

  /* --- volver arriba --- */
  document.getElementById('totop').addEventListener('click', function(){
    window.scrollTo({top:0, behavior: reduce ? 'auto' : 'smooth'});
  });
})();
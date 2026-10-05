document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('intro');
  const main = document.getElementById('main');
  const openBtn = document.getElementById('open');
  const startJourney = document.getElementById('startJourney');
  const routeBtn = document.getElementById('route');
  const target = new Date('2026-10-17T17:00:00-06:00').getTime();

  function openInvitation(event) {
    event?.preventDefault();
    intro?.classList.add('gone');
    setTimeout(() => {
      if (intro) intro.style.display = 'none';
      main?.classList.remove('hide');
      document.body.classList.add('invitation-open');
      window.scrollTo(0, 0);
    }, 650);
  }

  openBtn?.addEventListener('click', openInvitation);
  startJourney?.addEventListener('click', () => document.getElementById('mapa')?.scrollIntoView({behavior:'smooth'}));
  routeBtn?.addEventListener('click', () => document.querySelector('.message-section')?.scrollIntoView({behavior:'smooth'}));

  // Cuenta regresiva al 17 de octubre de 2026, 5:00 PM (CDMX, UTC-6).
  function tick() {
    let left = Math.max(0, target - Date.now());
    const values = [
      ['d', Math.floor(left / 86400000)],
      ['h', Math.floor((left % 86400000) / 3600000)],
      ['m', Math.floor((left % 3600000) / 60000)],
      ['s', Math.floor((left % 60000) / 1000)]
    ];
    values.forEach(([id, value]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(value).padStart(2, '0');
    });
  }
  tick();
  setInterval(tick, 1000);

  // Calendario real de octubre de 2026: el 17 cae en sábado.
  const calendar = document.getElementById('calendarDays');
  if (calendar) {
    const year = 2026, month = 9;
    const firstDay = new Date(year, month, 1).getDay();
    const days = new Date(year, month + 1, 0).getDate();
    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement('span');
      empty.className = 'empty';
      empty.textContent = '0';
      calendar.appendChild(empty);
    }
    for (let day = 1; day <= days; day++) {
      const cell = document.createElement('span');
      cell.textContent = day;
      if (day === 17) {
        cell.className = 'selected';
        cell.title = '17 de octubre de 2026 — 5:00 PM';
      }
      calendar.appendChild(cell);
    }
  }

  // Revelado de secciones al hacer scroll.
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, {threshold: 0.14});
  document.querySelectorAll('.reveal-section').forEach(el => observer.observe(el));

  // Barra de progreso de lectura.
  const progress = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  }, {passive:true});

  // Pequeño efecto parallax en el mapa y portada.
  const map = document.querySelector('.map-section');
  window.addEventListener('scroll', () => {
    if (!map) return;
    const y = Math.max(0, window.scrollY - map.offsetTop);
    map.querySelector('.map-ship')?.style.setProperty('transform', `translate(${Math.sin(y/120)*18}px, ${Math.cos(y/140)*10}px)`);
  }, {passive:true});
});

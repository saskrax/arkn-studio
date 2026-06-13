/* ============================================
   DENTALY · Clínica Dental Mérida — interactions
   ============================================ */
(function () {
  'use strict';

  var WHATSAPP = '529999606652';

  /* ---------- Year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Nav scroll state ---------- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 12) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('mobileMenu');
  function closeMenu() { toggle.classList.remove('open'); menu.classList.remove('open'); }
  toggle.addEventListener('click', function () {
    toggle.classList.toggle('open');
    menu.classList.toggle('open');
  });
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Booking: slots by weekday ---------- */
  // Horarios: 0=Dom (urgencias), 1-4 Lun-Jue 8:30-21:30, 5 Vie 8:30-22:00, 6 Sab 9:00-17:00
  var HOURS = {
    0: null,
    1: [8.5, 21.5], 2: [8.5, 21.5], 3: [8.5, 21.5], 4: [8.5, 21.5],
    5: [8.5, 22], 6: [9, 17]
  };

  var dateInput = document.getElementById('bk-date');
  var slotsBox = document.getElementById('bk-slots');
  var selectedSlot = null;

  // min date = today (local)
  var today = new Date();
  var tzOffset = today.getTimezoneOffset() * 60000;
  dateInput.min = new Date(today - tzOffset).toISOString().slice(0, 10);

  function fmt(h) {
    var hr = Math.floor(h);
    var min = h % 1 ? '30' : '00';
    var ampm = hr >= 12 ? 'PM' : 'AM';
    var h12 = hr % 12 || 12;
    return h12 + ':' + min + ' ' + ampm;
  }

  function renderSlots() {
    selectedSlot = null;
    slotsBox.innerHTML = '';
    var val = dateInput.value;
    if (!val) { slotsBox.innerHTML = '<p class="slots-hint">Selecciona una fecha para ver los horarios.</p>'; return; }

    // parse as local date
    var parts = val.split('-');
    var d = new Date(parts[0], parts[1] - 1, parts[2]);
    var day = d.getDay();
    var range = HOURS[day];

    if (!range) {
      slotsBox.innerHTML = '<p class="slots-hint">Los domingos solo atendemos <strong>urgencias con cita previa</strong>. Selecciona “⚡ Urgencia dental” o elige otro día.</p>';
      return;
    }

    var start = range[0], end = range[1];
    var nowH = new Date().getHours() + new Date().getMinutes() / 60;
    var isToday = val === dateInput.min;
    var made = 0;

    for (var h = start; h <= end - 1; h += 1.5) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'slot';
      btn.textContent = fmt(h);
      if (isToday && h <= nowH + 1) { btn.classList.add('closed'); btn.disabled = true; }
      else {
        (function (label, el) {
          el.addEventListener('click', function () {
            slotsBox.querySelectorAll('.slot').forEach(function (s) { s.classList.remove('active'); });
            el.classList.add('active');
            selectedSlot = label;
          });
        })(btn.textContent, btn);
        made++;
      }
      slotsBox.appendChild(btn);
    }
    if (made === 0) slotsBox.innerHTML = '<p class="slots-hint">No hay horarios disponibles ese día. Prueba con otra fecha o escríbenos por WhatsApp.</p>';
  }

  dateInput.addEventListener('change', renderSlots);

  /* ---------- Booking submit -> WhatsApp ---------- */
  var form = document.getElementById('bookingForm');
  var serviceEl = document.getElementById('bk-service');
  var nameEl = document.getElementById('bk-name');

  function flagError(el, on) { el.classList.toggle('field-error', on); }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    flagError(serviceEl, !serviceEl.value); if (!serviceEl.value) ok = false;
    flagError(dateInput, !dateInput.value); if (!dateInput.value) ok = false;
    flagError(nameEl, !nameEl.value.trim()); if (!nameEl.value.trim()) ok = false;

    var isUrgency = serviceEl.value && serviceEl.value.indexOf('Urgencia') !== -1;
    if (!selectedSlot && !isUrgency) {
      slotsBox.classList.add('field-error');
      ok = false;
    } else {
      slotsBox.classList.remove('field-error');
    }

    if (!ok) {
      var firstErr = form.querySelector('.field-error');
      if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Pretty date
    var p = dateInput.value.split('-');
    var dObj = new Date(p[0], p[1] - 1, p[2]);
    var prettyDate = dObj.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' });

    var lines = [
      '¡Hola Dentaly! 🦷 Quiero agendar una cita:',
      '',
      '• Nombre: ' + nameEl.value.trim(),
      '• Tratamiento: ' + serviceEl.value,
      '• Fecha: ' + prettyDate,
    ];
    if (selectedSlot) lines.push('• Horario: ' + selectedSlot);
    if (isUrgency) lines.push('• ⚡ Es una URGENCIA, agradezco prioridad.');
    lines.push('', '¿Me confirman disponibilidad? ¡Gracias!');

    var url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(lines.join('\n'));
    window.open(url, '_blank', 'noopener');
  });

  // Clear error styling on input
  [serviceEl, dateInput, nameEl].forEach(function (el) {
    el.addEventListener('input', function () { flagError(el, false); });
  });
})();

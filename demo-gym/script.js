/* ═══════════════════════════════
   IRON GYM — Script
   Arkn Studio Demo
═══════════════════════════════ */

// ── NAV SCROLL ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const open = mobileMenu.classList.contains('open');
  hamburger.querySelectorAll('span')[0].style.transform = open ? 'rotate(45deg) translate(5px, 5px)' : '';
  hamburger.querySelectorAll('span')[1].style.opacity = open ? '0' : '1';
  hamburger.querySelectorAll('span')[2].style.transform = open ? 'rotate(-45deg) translate(5px, -5px)' : '';
  document.body.style.overflow = open ? 'hidden' : '';
});
document.querySelectorAll('.mm-link').forEach(l => {
  l.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    document.body.style.overflow = '';
  });
});

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// ── REVEAL ON SCROLL ──
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── HORARIOS DATA ──
const horariosData = {
  lunes: [
    { hora: '6:00 AM', nombre: 'Funcional Matutino', coach: 'Marco Reyes', cupos: '8 cupos' },
    { hora: '7:30 AM', nombre: 'Spinning Intenso', coach: 'Sofía Mendoza', cupos: '6 cupos' },
    { hora: '9:00 AM', nombre: 'Yoga & Movilidad', coach: 'Ana Torres', cupos: '12 cupos' },
    { hora: '12:00 PM', nombre: 'HIIT Express', coach: 'Marco Reyes', cupos: '10 cupos' },
    { hora: '6:00 PM', nombre: 'Funcional Grupal', coach: 'Luis Carrillo', cupos: '8 cupos' },
    { hora: '7:30 PM', nombre: 'Spinning Nocturno', coach: 'Sofía Mendoza', cupos: '5 cupos' },
  ],
  martes: [
    { hora: '6:00 AM', nombre: 'Pesas & Fuerza', coach: 'Marco Reyes', cupos: '10 cupos' },
    { hora: '8:00 AM', nombre: 'Zumba Fitness', coach: 'Carmen Vega', cupos: '15 cupos' },
    { hora: '10:00 AM', nombre: 'Pilates Core', coach: 'Ana Torres', cupos: '10 cupos' },
    { hora: '5:00 PM', nombre: 'Boxeo Básico', coach: 'Marco Reyes', cupos: '8 cupos' },
    { hora: '7:00 PM', nombre: 'Funcional Avanzado', coach: 'Luis Carrillo', cupos: '6 cupos' },
  ],
  miercoles: [
    { hora: '6:00 AM', nombre: 'Funcional Matutino', coach: 'Marco Reyes', cupos: '8 cupos' },
    { hora: '7:30 AM', nombre: 'Spinning Intenso', coach: 'Sofía Mendoza', cupos: '6 cupos' },
    { hora: '11:00 AM', nombre: 'Yoga Restaurativo', coach: 'Ana Torres', cupos: '12 cupos' },
    { hora: '6:00 PM', nombre: 'HIIT & Cardio', coach: 'Sofía Mendoza', cupos: '10 cupos' },
    { hora: '8:00 PM', nombre: 'Stretching Nocturno', coach: 'Ana Torres', cupos: '15 cupos' },
  ],
  jueves: [
    { hora: '6:00 AM', nombre: 'Pesas & Hipertrofia', coach: 'Marco Reyes', cupos: '10 cupos' },
    { hora: '9:00 AM', nombre: 'Zumba Fitness', coach: 'Carmen Vega', cupos: '15 cupos' },
    { hora: '5:00 PM', nombre: 'Boxeo Básico', coach: 'Marco Reyes', cupos: '8 cupos' },
    { hora: '6:30 PM', nombre: 'Spinning Power', coach: 'Sofía Mendoza', cupos: '6 cupos' },
    { hora: '8:00 PM', nombre: 'Funcional Grupal', coach: 'Luis Carrillo', cupos: '8 cupos' },
  ],
  viernes: [
    { hora: '6:00 AM', nombre: 'Funcional Viernes', coach: 'Marco Reyes', cupos: '8 cupos' },
    { hora: '7:00 AM', nombre: 'Spinning Matutino', coach: 'Sofía Mendoza', cupos: '6 cupos' },
    { hora: '12:00 PM', nombre: 'HIIT Mediodía', coach: 'Luis Carrillo', cupos: '10 cupos' },
    { hora: '6:00 PM', nombre: 'Funcional Happy Hour', coach: 'Marco Reyes', cupos: '12 cupos' },
    { hora: '7:30 PM', nombre: 'Zumba Nocturna', coach: 'Carmen Vega', cupos: '15 cupos' },
  ],
  sabado: [
    { hora: '7:00 AM', nombre: 'Bootcamp Sabatino', coach: 'Marco Reyes', cupos: '10 cupos' },
    { hora: '9:00 AM', nombre: 'Spinning Weekend', coach: 'Sofía Mendoza', cupos: '8 cupos' },
    { hora: '11:00 AM', nombre: 'Yoga & Meditación', coach: 'Ana Torres', cupos: '15 cupos' },
    { hora: '1:00 PM', nombre: 'Funcional Grupal', coach: 'Luis Carrillo', cupos: '8 cupos' },
  ],
};

function renderHorario(day) {
  const grid = document.getElementById('horariosGrid');
  const clases = horariosData[day] || [];
  grid.innerHTML = clases.map(c => `
    <div class="clase-card">
      <div class="clase-hora">${c.hora}</div>
      <div class="clase-nombre">${c.nombre}</div>
      <div class="clase-coach">${c.coach}</div>
      <span class="clase-cupos">${c.cupos}</span>
    </div>
  `).join('');
}

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderHorario(btn.dataset.day);
  });
});

// Init horarios with Monday
renderHorario('lunes');

// ── FORM → WHATSAPP ──
document.getElementById('gymForm').addEventListener('submit', e => {
  e.preventDefault();
  const nombre   = document.getElementById('gNombre').value.trim();
  const telefono = document.getElementById('gTelefono').value.trim();
  const clase    = document.getElementById('gClase').value || 'Sin especificar';
  const horario  = document.getElementById('gHorario').value || 'Sin especificar';

  if (!nombre || !telefono) {
    alert('Por favor ingresa tu nombre y WhatsApp.');
    return;
  }

  const msg =
`🏋️ ¡Hola Iron Gym!

Me gustaría agendar mi *clase de prueba GRATIS*.

👤 *Nombre:* ${nombre}
📱 *WhatsApp:* ${telefono}
🏃 *Clase de interés:* ${clase}
⏰ *Horario preferido:* ${horario}

¿Cuándo puedo ir?`;

  window.open(`https://wa.me/526681234567?text=${encodeURIComponent(msg)}`, '_blank');
});

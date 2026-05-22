// DentalCare Mochis — Script

// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile nav toggle
document.getElementById('navToggle').addEventListener('click', () => {
  const links = document.querySelector('.nav-links');
  links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth scroll para todos los links del nav
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Formulario → WhatsApp
document.getElementById('citaForm').addEventListener('submit', e => {
  e.preventDefault();
  const nombre   = document.getElementById('nombre').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const servicio = document.getElementById('servicio').value || 'Consulta general';
  const fecha    = document.getElementById('fecha').value;

  if (!nombre || !telefono) {
    alert('Por favor llena tu nombre y teléfono.');
    return;
  }

  const fechaStr = fecha
    ? new Date(fecha + 'T12:00:00').toLocaleDateString('es-MX', { weekday:'long', year:'numeric', month:'long', day:'numeric' })
    : 'a convenir';

  const msg = `Hola DentalCare Mochis! 👋

Me llamo *${nombre}* y quisiera agendar una cita.

📋 *Servicio:* ${servicio}
📅 *Fecha preferida:* ${fechaStr}
📞 *Mi teléfono:* ${telefono}

¿Tienen disponibilidad? Gracias!`;

  const numero = '526681234567'; // Cambiar por número real
  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`, '_blank');
});

// Animación de entrada en scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .testimonial-card, .why-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

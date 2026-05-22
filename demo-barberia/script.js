// ═══════════════════════════════════════════════════════════
// BLADE & CO. — ANIMACIONES PREMIUM
// GSAP + ScrollTrigger + Custom Cursor + Particles
// ═══════════════════════════════════════════════════════════

gsap.registerPlugin(ScrollTrigger);

// ─── LOADER ──────────────────────────────────────────────────
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    initHeroAnimations();
  }, 2000);
});

// ─── CURSOR PERSONALIZADO ────────────────────────────────────
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
const isDesktop = window.matchMedia('(min-width: 1025px)').matches && window.matchMedia('(pointer: fine)').matches;

if (isDesktop) {
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.5;
    cursorY += (mouseY - cursorY) * 0.5;
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;

    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
    follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover targets
  const hoverEls = document.querySelectorAll('a, button, .servicio-card, .galeria-item, .flip-card, input, select, textarea, .tilt-card, .stat');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-hover');
      follower.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-hover');
      follower.classList.remove('cursor-hover');
    });
  });

  document.addEventListener('mousedown', () => cursor.classList.add('cursor-click'));
  document.addEventListener('mouseup', () => cursor.classList.remove('cursor-click'));
}

// ─── PARTÍCULAS DEL HERO ─────────────────────────────────────
function initParticles() {
  const canvas = document.getElementById('particlesCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201, 168, 76, ${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
}
initParticles();

// ─── ANIMACIONES DEL HERO (GSAP) ─────────────────────────────
function initHeroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Badge slide in
  tl.from('.reveal-badge', { y: 30, opacity: 0, duration: 0.7 });

  // Title words stagger
  tl.to('.title-word', {
    y: 0,
    duration: 0.9,
    stagger: 0.07,
    ease: 'power4.out'
  }, '-=0.4');

  // Subtítulo
  tl.to('.hero-sub', { opacity: 1, y: 0, duration: 0.6 }, '-=0.6');

  // Botones
  tl.from('.hero-actions a', {
    y: 20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1
  }, '-=0.3');

  // Stats
  tl.to('.hero-stats', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');

  // Hero image
  tl.to('.hero-img-wrapper', { opacity: 1, y: 0, duration: 0.8 }, '-=1');

  // Quick book
  tl.to('.quick-book', { opacity: 1, y: 0, duration: 0.6 }, '-=0.5');

  // Animar números (contadores)
  animateCounters();
}

// ─── CONTADORES NUMÉRICOS ────────────────────────────────────
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimal || '0');

    gsap.to(el, {
      innerText: target,
      duration: 2,
      ease: 'power2.out',
      snap: { innerText: decimals ? 0.1 : 1 },
      onUpdate: function() {
        const val = parseFloat(el.innerText);
        if (decimals > 0) {
          el.innerText = val.toFixed(decimals);
        } else if (target >= 1000) {
          el.innerText = Math.floor(val).toLocaleString('en-US');
        } else {
          el.innerText = Math.floor(val);
        }
      }
    });
  });
}

// ─── PARALLAX HERO IMG ───────────────────────────────────────
const heroImg = document.getElementById('heroImgWrapper');
if (heroImg && isDesktop) {
  const heroLeft = document.querySelector('.hero-left');
  document.querySelector('.section-hero').addEventListener('mousemove', e => {
    const rect = document.querySelector('.section-hero').getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    gsap.to(heroImg, { x: x * 15, y: y * 15, duration: 1, ease: 'power2.out' });
    gsap.to(heroLeft, { x: x * -8, duration: 1, ease: 'power2.out' });
  });
}

// ─── SECTION HEADERS REVEAL ──────────────────────────────────
gsap.utils.toArray('.section-header').forEach(header => {
  const title = header.querySelector('.section-title');
  const tag = header.querySelector('.section-tag');

  ScrollTrigger.create({
    trigger: header,
    start: 'top 80%',
    onEnter: () => {
      header.classList.add('revealed');
      gsap.from(tag, { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' });
      gsap.from(title, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power4.out',
        delay: 0.1
      });
    },
    once: true,
  });
});

// ─── SERVICIO CARDS ──────────────────────────────────────────
gsap.utils.toArray('.servicio-card').forEach((card, i) => {
  ScrollTrigger.create({
    trigger: card,
    start: 'top 90%',
    onEnter: () => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: i * 0.08,
        ease: 'power3.out'
      });
      card.classList.add('in-view');
    },
    once: true,
  });

  // Card shine follow mouse
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  });

  // 3D tilt
  if (card.classList.contains('tilt-card')) {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      gsap.to(card, {
        rotationY: x * 8,
        rotationX: -y * 8,
        transformPerspective: 1200,
        duration: 0.6,
        ease: 'power2.out',
      });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.6)',
      });
    });
  }
});

// ─── GALERÍA ─────────────────────────────────────────────────
gsap.utils.toArray('.galeria-item').forEach((item, i) => {
  ScrollTrigger.create({
    trigger: item,
    start: 'top 90%',
    onEnter: () => {
      gsap.to(item, {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        delay: i * 0.08,
        ease: 'power3.out'
      });
      item.classList.add('in-view');
    },
    once: true,
  });
});

// ─── EQUIPO CARDS ────────────────────────────────────────────
gsap.utils.toArray('.flip-card').forEach((card, i) => {
  ScrollTrigger.create({
    trigger: card,
    start: 'top 90%',
    onEnter: () => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: i * 0.12,
        ease: 'power3.out'
      });
      card.classList.add('in-view');
    },
    once: true,
  });
});

// ─── RESERVAR REVEAL ─────────────────────────────────────────
ScrollTrigger.create({
  trigger: '.section-reservar',
  start: 'top 70%',
  onEnter: () => {
    gsap.from('.reservar-left > *', {
      x: -40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    });
    gsap.from('.reservar-form', {
      x: 40,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out'
    });
  },
  once: true,
});

// ─── MAGNETIC BUTTONS ────────────────────────────────────────
if (isDesktop) {
  document.querySelectorAll('[data-magnetic]').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.5, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
    });
  });
}

// ─── BUTTON RIPPLE EFFECT ────────────────────────────────────
document.querySelectorAll('.btn-submit, .btn-primary').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${e.clientX - rect.left - size/2}px;
      top: ${e.clientY - rect.top - size/2}px;
      background: rgba(255,255,255,0.4);
      border-radius: 50%;
      transform: scale(0);
      pointer-events: none;
      animation: ripple 0.7s ease-out;
    `;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

// ─── ACTIVE NAV ON SCROLL ────────────────────────────────────
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === id);
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => navObserver.observe(s));

// ─── HAMBURGER MOBILE ────────────────────────────────────────
const hamburger = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

// ─── FECHA MÍNIMA ────────────────────────────────────────────
const fechaInput = document.getElementById('fecha');
if (fechaInput) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  fechaInput.min = tomorrow.toISOString().split('T')[0];
}

// ─── FORMULARIO WHATSAPP ─────────────────────────────────────
const form = document.getElementById('reservarForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const servicio = document.getElementById('servicio').value;
    const barbero = document.getElementById('barbero').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const notas = document.getElementById('notas').value.trim();

    if (!nombre || !telefono || !servicio || !fecha || !hora) {
      // Shake animation
      gsap.fromTo(form, { x: -8 }, { x: 8, duration: 0.08, repeat: 5, yoyo: true, onComplete: () => gsap.to(form, { x: 0 }) });
      return;
    }

    const fechaFormatted = new Date(fecha + 'T12:00:00').toLocaleDateString('es-MX', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    let msg = `Hola Blade & Co.! 👋\n\nQuiero reservar un turno:\n`;
    msg += `📋 *Servicio:* ${servicio}\n`;
    msg += `👤 *Nombre:* ${nombre}\n`;
    msg += `📞 *Teléfono:* ${telefono}\n`;
    msg += `📅 *Fecha:* ${fechaFormatted}\n`;
    msg += `⏰ *Hora:* ${hora}\n`;
    if (barbero !== 'Sin preferencia') msg += `✂️ *Barbero:* ${barbero}\n`;
    if (notas) msg += `📝 *Notas:* ${notas}\n`;
    msg += `\n¡Gracias! Espero confirmación.`;

    const url = `https://wa.me/526681234567?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}

// ─── TEXT SCRAMBLE EN NAV LINKS ──────────────────────────────
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.original = el.textContent;
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.textContent;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise(resolve => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 15);
      const end = start + Math.floor(Math.random() * 15);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)];
          this.queue[i].char = char;
        }
        output += `<span style="color:#C9A84C;opacity:0.7">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
}

if (isDesktop) {
  document.querySelectorAll('.nav-link').forEach(link => {
    const scrambler = new TextScramble(link);
    const original = link.textContent;
    link.addEventListener('mouseenter', () => scrambler.setText(original));
  });
}

// ─── SMOOTH SCROLL EN ANCLAS ─────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

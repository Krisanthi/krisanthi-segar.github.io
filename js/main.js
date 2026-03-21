/* Krisanthi Segar — Portfolio JS v3 */

// cursor
const cur = document.getElementById('cursor');
if (cur) {
  document.addEventListener('mousemove', e => {
    cur.style.left = e.clientX + 'px';
    cur.style.top  = e.clientY + 'px';
  });
  document.querySelectorAll('a,button,.pcard,.csoc,.inv-item').forEach(el => {
    el.addEventListener('mouseenter', () => { cur.style.transform = 'translate(-50%,-50%) scale(3)'; cur.style.opacity = '.5'; });
    el.addEventListener('mouseleave', () => { cur.style.transform = 'translate(-50%,-50%) scale(1)'; cur.style.opacity = '1'; });
  });
}

// nav scroll
const nav = document.getElementById('nav');
if (nav) window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 30), { passive: true });

// tape strip — seamless infinite loop via CSS; JS builds the content
const PHOTOS = ['assets/ev1.jpg','assets/ev2.jpg','assets/ev3.jpg','assets/ev4.jpg','assets/ev5.jpg','assets/ev6.jpg','assets/ev7.jpg','assets/ev8.jpg'];

function buildTape() {
  const track = document.getElementById('tapeTrack');
  if (!track) return;
  // 3x to fill wide screens and loop perfectly
  [...PHOTOS, ...PHOTOS, ...PHOTOS].forEach(src => {
    const wrap = document.createElement('div');
    wrap.className = 'tape-photo';
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'event';
    img.loading = 'lazy';
    img.onerror = () => { wrap.style.background = '#1a1a1a'; img.remove(); };
    wrap.appendChild(img);
    track.appendChild(wrap);
  });
}
buildTape();

// scroll reveal
const els = document.querySelectorAll('.sg-block,.pcard,.inv-item,.csoc,.cert-row,.contact-email-btn,.contact-phone');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
}, { threshold: 0.06, rootMargin: '0px 0px -28px 0px' });
els.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = (i % 4 * 0.07) + 's';
  obs.observe(el);
});

// smooth anchor
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

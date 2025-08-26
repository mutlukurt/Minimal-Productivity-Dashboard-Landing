/* App interactions for Lumen landing page */
document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* Mobile nav toggle with body scroll lock */
  const navToggle = document.getElementById('nav-toggle');
  const primaryMenu = document.getElementById('primary-menu');
  const body = document.body;

  function setMenu(open) {
    navToggle.setAttribute('aria-expanded', String(open));
    primaryMenu.setAttribute('data-visible', String(open));
    primaryMenu.setAttribute('aria-hidden', String(!open));
    if (open) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
  }

  if (navToggle && primaryMenu) {
    navToggle.addEventListener('click', () => setMenu(navToggle.getAttribute('aria-expanded') !== 'true'));
  }

  /* Smooth scroll for anchor links */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
        // close mobile menu if open
        if (navToggle && navToggle.getAttribute('aria-expanded') === 'true') setMenu(false);
      }
    });
  });

  /* Back to top button */
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (!backToTop) return;
    if (window.scrollY > 600) backToTop.hidden = false; else backToTop.hidden = true;
  }, {passive: true});
  if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));

  /* Reveal on scroll with stagger */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = Array.from(document.querySelectorAll('.reveal'));
  if (!prefersReduced && reveals.length) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const children = el.querySelectorAll('*');
          el.classList.add('reveal--visible');
          // stagger children
          children.forEach((c, i) => {
            c.style.transitionDelay = `${i * 60}ms`;
          });
          obs.unobserve(el);
        }
      });
    }, {threshold: 0.12});
    reveals.forEach(r => io.observe(r));
  } else {
    // show immediately
    reveals.forEach(r => r.classList.add('reveal--visible'));
  }

  /* FAQ accordion with keyboard support */
  document.querySelectorAll('.faq__item').forEach(item => {
    const btn = item.querySelector('.faq__toggle');
    const panel = item.querySelector('.faq__panel');
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      if (!open) panel.hidden = false; else panel.hidden = true;
    });
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); const next = item.nextElementSibling; if (next) next.querySelector('.faq__toggle').focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); const prev = item.previousElementSibling; if (prev) prev.querySelector('.faq__toggle').focus(); }
    });
  });

  /* Pricing toggle (monthly/yearly) */
  const billingToggle = document.getElementById('billing-toggle');
  function updatePricing(yearly) {
    document.querySelectorAll('.price-amount').forEach(el => {
      const month = el.getAttribute('data-month');
      const year = el.getAttribute('data-year');
      if (yearly && year) el.textContent = `$${year}`; else if (month) el.textContent = `$${month}`;
    });
  }
  if (billingToggle) {
    billingToggle.addEventListener('change', () => updatePricing(billingToggle.checked));
    updatePricing(billingToggle.checked);
  }

  /* Form handling with validation and toast */
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  const feedback = document.getElementById('form-feedback');
  function showToast(message, timeout = 3000) {
    if (!toast) return;
    toast.textContent = message; toast.hidden = false;
    setTimeout(() => { toast.hidden = true; }, timeout);
  }

  function setFieldError(id, message) {
    const el = document.getElementById(id);
    const err = document.getElementById('err-' + id);
    if (err) err.textContent = message || '';
    if (el) {
      if (message) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid');
    }
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const message = form.querySelector('#message');
      let ok = true;

      // name
      if (!name.value.trim()) { setFieldError('name', 'Please enter your name'); ok = false; } else setFieldError('name', '');

      // email basic
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim()) { setFieldError('email', 'Please enter your email'); ok = false; }
      else if (!re.test(email.value)) { setFieldError('email', 'Please enter a valid email'); ok = false; }
      else setFieldError('email', '');

      // message
      if (!message.value.trim() || message.value.trim().length < 10) { setFieldError('message', 'Message must be at least 10 characters'); ok = false; } else setFieldError('message', '');

      if (!ok) {
        feedback.classList.remove('visually-hidden');
        feedback.textContent = 'Please fix the errors above.';
        return;
      }

      feedback.classList.remove('visually-hidden');
      feedback.textContent = 'Sending…';
      const submitBtn = document.getElementById('contact-submit');
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.disabled = false;
        form.reset();
        feedback.textContent = '';
        feedback.classList.add('visually-hidden');
        showToast("Thanks — we'll reply soon.");
      }, 900);
    });
  }
});


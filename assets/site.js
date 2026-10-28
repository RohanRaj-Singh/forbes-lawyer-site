(() => {
  'use strict';

  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('is-solid', window.scrollY > 26);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- mobile navigation ---------------------------------- */
  const toggle = document.querySelector('.nav-toggle');
  const drawer = document.querySelector('.mnav');

  if (toggle && drawer) {
    const close = () => {
      document.body.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
    };
    const open = () => {
      document.body.classList.add('nav-open');
      toggle.setAttribute('aria-expanded', 'true');
      drawer.setAttribute('aria-hidden', 'false');
      const first = drawer.querySelector('a');
      if (first) first.focus({ preventScroll: true });
    };

    toggle.addEventListener('click', () => {
      document.body.classList.contains('nav-open') ? close() : open();
    });
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
        close();
        toggle.focus();
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1040) close();
    });
  }

  /* ---- reveal on scroll ------------------------------------ */
  const items = Array.from(document.querySelectorAll('.reveal'));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!items.length) {
    /* nothing to animate */
  } else if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = Number(el.dataset.delay || 0);
        window.setTimeout(() => el.classList.add('is-in'), delay);
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(el => io.observe(el));
  }

  /* ---- preview forms --------------------------------------- */
  document.querySelectorAll('form[data-preview]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let status = form.querySelector('.form-status');
      if (!status) {
        status = document.createElement('p');
        status.className = 'form-status form-note';
        status.setAttribute('role', 'status');
        form.appendChild(status);
      }
      status.textContent =
        'This is a design preview. Connect this form to your form handler in WordPress (Elementor Forms, WPForms or Gravity Forms) to receive enquiries.';
    });
  });
})();

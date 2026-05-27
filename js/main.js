/* ================================================================
   MGStudio — Main JavaScript
   ================================================================ */

(function () {
  'use strict';

  // ----------------------------------------------------------------
  // MOBILE MENU
  // ----------------------------------------------------------------
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  function openMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger?.classList.add('open');
    hamburger?.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    hamburger?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
  }

  hamburger?.addEventListener('click', () => {
    mobileMenu?.classList.contains('open') ? closeMenu() : openMenu();
  });

  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // ----------------------------------------------------------------
  // NAV SCROLL SHADOW
  // ----------------------------------------------------------------
  const navEl = document.querySelector('.site-nav');
  if (navEl) {
    const onScroll = () => {
      navEl.classList.toggle('scrolled', window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ----------------------------------------------------------------
  // SCROLL REVEAL
  // ----------------------------------------------------------------
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  // ----------------------------------------------------------------
  // FAQ ACCORDION
  // ----------------------------------------------------------------
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all open items
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-btn')?.setAttribute('aria-expanded', 'false');
      });

      // Open current if it was closed
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ----------------------------------------------------------------
  // COOKIE BANNER
  // ----------------------------------------------------------------
  const cookieBanner = document.getElementById('cookie-banner');
  const cookieAccept = document.getElementById('cookie-accept');

  if (cookieBanner) {
    if (!localStorage.getItem('mg-cookies-ok')) {
      setTimeout(() => {
        cookieBanner.style.display = 'flex';
      }, 1400);
    }
  }

  cookieAccept?.addEventListener('click', () => {
    localStorage.setItem('mg-cookies-ok', '1');
    if (cookieBanner) {
      cookieBanner.style.opacity = '0';
      setTimeout(() => { cookieBanner.style.display = 'none'; }, 350);
    }
  });

  // ----------------------------------------------------------------
  // FILTER BUTTONS (CASOS PAGE)
  // ----------------------------------------------------------------
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.filter;

      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.querySelectorAll('.project-card').forEach(card => {
        const cat = card.dataset.category;
        const show = category === 'all' || cat === category;

        if (show) {
          card.style.display = '';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // ----------------------------------------------------------------
  // ASIDE SCROLL SPY (COOKIES PAGE)
  // ----------------------------------------------------------------
  const asideLinks = document.querySelectorAll('.aside-nav a[href^="#"]');

  if (asideLinks.length > 0) {
    // Smooth scroll
    asideLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target?.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Scroll spy
    window.addEventListener('scroll', () => {
      const sections = document.querySelectorAll('section[id]');
      let current = '';

      sections.forEach(section => {
        if (window.scrollY + 180 >= section.offsetTop) {
          current = section.id;
        }
      });

      asideLinks.forEach(link => {
        const isActive = link.getAttribute('href') === '#' + current;
        link.classList.toggle('active', isActive);
        link.classList.toggle('aside-link', true);
      });
    }, { passive: true });
  }

  // ----------------------------------------------------------------
  // CONTACT FORM
  // ----------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('[type="submit"]');
    const originalHTML = submitBtn.innerHTML;

    submitBtn.innerHTML = 'Enviando&hellip;';
    submitBtn.disabled = true;

    // Replace with real endpoint (Formspree, Web3Forms, etc.)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      contactForm.style.display = 'none';
      if (formSuccess) formSuccess.style.display = 'block';
    } catch {
      submitBtn.innerHTML = originalHTML;
      submitBtn.disabled = false;
    }
  });

  // ----------------------------------------------------------------
  // HERO SCROLL HINT FADE
  // ----------------------------------------------------------------
  const scrollHint = document.querySelector('.scroll-hint');
  if (scrollHint) {
    window.addEventListener('scroll', () => {
      const opacity = Math.max(0, 1 - window.scrollY / 150);
      scrollHint.style.opacity = String(opacity);
    }, { passive: true });
  }

})();

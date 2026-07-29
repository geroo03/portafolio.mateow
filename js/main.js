/* =============================================
   MAIN JS — Portfolio
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  // ——— NAV SCROLL EFFECT ———
  const nav = document.getElementById('nav');
  const handleScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ——— BACK TO TOP ———
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    const handleBackToTopVisibility = () => {
      backToTop.classList.toggle('is-visible', window.scrollY > 500);
    };
    window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });
    handleBackToTopVisibility();

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ——— MOBILE MENU ———
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('active');
    document.body.style.overflow = links.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu on link click
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      links.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ——— ACTIVE NAV LINK ———
  const sections = document.querySelectorAll('section[id]');
  const navLinks = links.querySelectorAll('a[href^="#"]');

  const setActiveLink = () => {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = links.querySelector(`a[href="#${id}"]`);
        if (active) active.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', setActiveLink, { passive: true });

  // ——— INTERSECTION OBSERVER (Scroll Animations) ———
  const animatedElements = document.querySelectorAll('[data-animate]');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || 0, 10);
            setTimeout(() => {
              entry.target.classList.add('is-visible');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    animatedElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: show everything
    animatedElements.forEach(el => el.classList.add('is-visible'));
  }

  // ——— SMOOTH SCROLL (for older browsers) ———
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 72;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }
    });
  });

  // ——— TYPING EFFECT ON HERO (subtle) ———
  const greeting = document.querySelector('.hero__greeting');
  if (greeting) {
    const text = greeting.textContent;
    greeting.textContent = '';
    greeting.style.opacity = '1';
    greeting.style.transform = 'translateY(0)';
    let i = 0;
    const type = () => {
      if (i < text.length) {
        greeting.textContent += text.charAt(i);
        i++;
        setTimeout(type, 60);
      }
    };
    // Start typing after animations settle
    setTimeout(type, 600);
  }
});

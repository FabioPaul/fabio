/**
 * Portfolio Fabio Areco — JavaScript principal
 */

(function () {
  'use strict';

  /* --- Año actual en el footer --- */
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* --- Navbar: sombra al hacer scroll --- */
  const navbar = document.getElementById('mainNavbar');

  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  /* --- Navbar: link activo según sección visible --- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#navbarNav .nav-link');

  function setActiveNavLink() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveNavLink, { passive: true });

  /* --- Cerrar menú mobile al hacer click en un link --- */
  const navbarCollapse = document.getElementById('navbarNav');
  const toggler = document.querySelector('.navbar-toggler');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navbarCollapse.classList.contains('show')) {
        toggler.click();
      }
    });
  });

  /* --- Animaciones fade-in al scroll --- */
  const animatedElements = document.querySelectorAll(
    '.service-card, .project-card, .process-step, .skill-badge, .about-avatar, .contact-form, .contact-info'
  );

  animatedElements.forEach(function (el) {
    el.classList.add('fade-in');
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  };

  const fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(function (el) {
    fadeObserver.observe(el);
  });

  /* --- Formulario de contacto: envío vía WhatsApp --- */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nombre = document.getElementById('nombre').value.trim();
      const contacto = document.getElementById('contactoInput').value.trim();
      const mensaje = document.getElementById('mensaje').value.trim();

      if (!nombre || !contacto || !mensaje) {
        alert('Por favor completá todos los campos.');
        return;
      }

      const texto =
        'Hola Fabio, soy ' + nombre + '.\n' +
        'Contacto: ' + contacto + '\n\n' +
        mensaje;

      const whatsappURL =
        'https://wa.me/595985903081?text=' + encodeURIComponent(texto);

      window.open(whatsappURL, '_blank', 'noopener,noreferrer');
    });
  }

})();

/**
 * La Brasa Dorada — Demo Landing Restaurante
 */
(function () {
  'use strict';

  var WHATSAPP = '595985903081';

  var MENU = [
    { name: 'Bife de chorizo premium', desc: 'Corte de 400g con papas rústicas y chimichurri de la casa.', price: 'Gs. 95.000', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&h=400&fit=crop' },
    { name: 'Risotto de hongos', desc: 'Arroz arborio, mix de hongos silvestres y parmesano reggiano.', price: 'Gs. 68.000', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500&h=400&fit=crop' },
    { name: 'Salmón a la parrilla', desc: 'Filete fresco con vegetales asados y salsa de alcaparras.', price: 'Gs. 82.000', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&h=400&fit=crop' },
    { name: 'Pasta casera al pesto', desc: 'Fettuccine artesanal con albahaca fresca, piñones y aceite de oliva.', price: 'Gs. 55.000', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&h=400&fit=crop' },
    { name: 'Tabla de embutidos', desc: 'Selección de jamón serrano, salame, quesos y frutos secos.', price: 'Gs. 72.000', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=400&fit=crop' },
    { name: 'Tiramisú artesanal', desc: 'Postre clásico italiano con café espresso y mascarpone.', price: 'Gs. 32.000', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&h=400&fit=crop' }
  ];

  var GALLERY = [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=450&fit=crop'
  ];

  var TESTIMONIALS = [
    { name: 'María González', initials: 'MG', text: 'La mejor parrilla de Asunción. El bife de chorizo es espectacular y el ambiente muy acogedor. Volveremos seguro.' },
    { name: 'Carlos Benítez', initials: 'CB', text: 'Celebramos nuestro aniversario aquí y fue perfecto. Atención impecable y la carta de vinos es excelente.' },
    { name: 'Ana Rodríguez', initials: 'AR', text: 'El risotto de hongos es una obra de arte. Porciones generosas y precios justos para la calidad que ofrecen.' }
  ];

  function renderMenu() {
    var grid = document.getElementById('menuGrid');
    if (!grid) return;
    grid.innerHTML = MENU.map(function (item) {
      return (
        '<div class="col-md-6 col-lg-4">' +
          '<article class="menu-card fade-up">' +
            '<div class="menu-card-img"><img src="' + item.image + '" alt="' + item.name + '" loading="lazy"></div>' +
            '<div class="menu-card-body">' +
              '<h3>' + item.name + '</h3>' +
              '<p class="text-muted small mb-2">' + item.desc + '</p>' +
              '<span class="menu-price">' + item.price + '</span>' +
            '</div>' +
          '</article>' +
        '</div>'
      );
    }).join('');
  }

  function renderGallery() {
    var grid = document.getElementById('galleryGrid');
    if (!grid) return;
    grid.innerHTML = GALLERY.map(function (src, i) {
      var col = i === 0 ? 'col-md-8' : 'col-md-4';
      return (
        '<div class="' + col + ' col-6">' +
          '<div class="gallery-item fade-up">' +
            '<img src="' + src + '" alt="Galería ' + (i + 1) + '" loading="lazy">' +
          '</div>' +
        '</div>'
      );
    }).join('');
  }

  function renderTestimonials() {
    var grid = document.getElementById('testimonialsGrid');
    if (!grid) return;
    grid.innerHTML = TESTIMONIALS.map(function (t) {
      return (
        '<div class="col-md-4">' +
          '<div class="testimonial-card fade-up">' +
            '<div class="testimonial-stars"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></div>' +
            '<p class="testimonial-text">"' + t.text + '"</p>' +
            '<div class="testimonial-author">' +
              '<div class="testimonial-avatar">' + t.initials + '</div>' +
              '<strong>' + t.name + '</strong>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
    }).join('');
  }

  function initScrollAnimations() {
    var els = document.querySelectorAll('.fade-up');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { observer.observe(el); });
  }

  function initNavbar() {
    var nav = document.getElementById('mainNav');
    function onScroll() {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    document.querySelectorAll('.nav-link, .btn-gold').forEach(function (link) {
      link.addEventListener('click', function () {
        var collapse = document.getElementById('navMenu');
        if (collapse.classList.contains('show')) {
          bootstrap.Collapse.getInstance(collapse)?.hide();
        }
      });
    });
  }

  function initReservation() {
    var form = document.getElementById('reservationForm');
    var dateInput = document.getElementById('resDate');
    if (dateInput) {
      var today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
    }

    form?.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('resName').value.trim();
      var phone = document.getElementById('resPhone').value.trim();
      var date = document.getElementById('resDate').value;
      var time = document.getElementById('resTime').value;
      var guests = document.getElementById('resGuests').value;
      var notes = document.getElementById('resNotes').value.trim();

      if (!name || !phone || !date || !time || !guests) {
        alert('Por favor completá todos los campos obligatorios.');
        return;
      }

      var msg = [
        'Hola! Quiero reservar una mesa en La Brasa Dorada.',
        '',
        'Nombre: ' + name,
        'Teléfono: ' + phone,
        'Fecha: ' + date,
        'Hora: ' + time,
        'Personas: ' + guests
      ];
      if (notes) msg.push('Notas: ' + notes);

      var url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg.join('\n'));
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  document.getElementById('year').textContent = new Date().getFullYear();

  renderMenu();
  renderGallery();
  renderTestimonials();
  initScrollAnimations();
  initNavbar();
  initReservation();
})();

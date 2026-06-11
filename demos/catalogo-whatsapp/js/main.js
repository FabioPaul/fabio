/**
 * Boutique Luna — Demo Catálogo WhatsApp
 */
(function () {
  'use strict';

  var WHATSAPP = '595985903081';
  var FAV_KEY = 'boutique_luna_favorites';

  var PRODUCTS = [
    { id: 1, name: 'Vestido floral verano', category: 'Mujer', price: 185000, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop', description: 'Vestido ligero con estampado floral, ideal para días cálidos. Tallas S a XL.' },
    { id: 2, name: 'Blazer elegante negro', category: 'Mujer', price: 320000, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop', description: 'Blazer de corte moderno, perfecto para oficina o eventos formales.' },
    { id: 3, name: 'Jean mom fit', category: 'Mujer', price: 145000, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop', description: 'Jean de tiro alto con corte relajado. Denim de alta calidad.' },
    { id: 4, name: 'Camisa lino blanca', category: 'Hombre', price: 120000, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop', description: 'Camisa de lino 100% natural, fresca y cómoda para el verano.' },
    { id: 5, name: 'Pantalón chino beige', category: 'Hombre', price: 135000, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop', description: 'Pantalón chino clásico, versátil para look casual o smart casual.' },
    { id: 6, name: 'Polo premium', category: 'Hombre', price: 89000, image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400&h=400&fit=crop', description: 'Polo de algodón pima con cuello reforzado. Colores surtidos.' },
    { id: 7, name: 'Conjunto niño deportivo', category: 'Niños', price: 95000, image: 'https://images.unsplash.com/photo-1503341450422-884f0e2e8c0e?w=400&h=400&fit=crop', description: 'Set de buzo y pantalón deportivo. Talles 4 a 14 años.' },
    { id: 8, name: 'Vestido niña fiesta', category: 'Niños', price: 110000, image: 'https://images.unsplash.com/photo-1519238263530-99bdd884c2bd?w=400&h=400&fit=crop', description: 'Vestido elegante para ocasiones especiales. Incluye cinturón.' },
    { id: 9, name: 'Bolso de cuero', category: 'Accesorios', price: 210000, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d1283d?w=400&h=400&fit=crop', description: 'Bolso de cuero genuino con correa ajustable. Compartimento principal amplio.' },
    { id: 10, name: 'Cinturón reversible', category: 'Accesorios', price: 65000, image: 'https://images.unsplash.com/photo-1624222247344-550fb60583fd?w=400&h=400&fit=crop', description: 'Cinturón de cuero reversible negro/marrón. Hebilla metálica.' },
    { id: 11, name: 'Gafas de sol UV400', category: 'Accesorios', price: 78000, image: 'https://images.unsplash.com/photo-1572635196233-14bfa7bd3d69?w=400&h=400&fit=crop', description: 'Protección UV400 con montura de acetato. Estuche incluido.' },
    { id: 12, name: 'Bufanda de lana', category: 'Accesorios', price: 55000, image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=400&fit=crop', description: 'Bufanda suave de lana merino. Ideal para invierno.' },
    { id: 13, name: 'Sweater oversize', category: 'Mujer', price: 165000, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop', description: 'Sweater de punto grueso, corte oversize muy cómodo.' },
    { id: 14, name: 'Zapatillas urbanas', category: 'Hombre', price: 198000, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop', description: 'Zapatillas casuales con suela de goma antideslizante.' }
  ];

  var favorites = loadFavorites();
  var showFavoritesOnly = false;
  var quickViewModal;

  function formatPrice(n) {
    return 'Gs. ' + n.toLocaleString('es-PY');
  }

  function loadFavorites() {
    try {
      return JSON.parse(localStorage.getItem(FAV_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveFavorites() {
    localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
    updateFavCount();
  }

  function isFavorite(id) {
    return favorites.indexOf(id) !== -1;
  }

  function toggleFavorite(id) {
    var idx = favorites.indexOf(id);
    if (idx === -1) favorites.push(id);
    else favorites.splice(idx, 1);
    saveFavorites();
    renderProducts();
  }

  function updateFavCount() {
    var el = document.getElementById('favCount');
    if (el) el.textContent = favorites.length;
  }

  function getFiltered() {
    var search = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
    var category = document.getElementById('categoryFilter')?.value || '';

    return PRODUCTS.filter(function (p) {
      var matchSearch = !search || p.name.toLowerCase().includes(search) || p.category.toLowerCase().includes(search);
      var matchCat = !category || p.category === category;
      var matchFav = !showFavoritesOnly || isFavorite(p.id);
      return matchSearch && matchCat && matchFav;
    });
  }

  function whatsappLink(product) {
    var msg = 'Hola! Me interesa consultar por:\n\n' +
      '*' + product.name + '*\n' +
      'Categoría: ' + product.category + '\n' +
      'Precio: ' + formatPrice(product.price) + '\n\n' +
      '¿Está disponible?';
    return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg);
  }

  function productCardHTML(p) {
    var favClass = isFavorite(p.id) ? 'active' : '';
    return (
      '<div class="col-6 col-md-4 col-lg-3">' +
        '<article class="catalog-card" data-id="' + p.id + '">' +
          '<div class="catalog-card-img">' +
            '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy">' +
            '<button class="btn-fav ' + favClass + '" data-fav="' + p.id + '" aria-label="Favorito">' +
              '<i class="bi bi-heart' + (favClass ? '-fill' : '') + '"></i>' +
            '</button>' +
          '</div>' +
          '<div class="catalog-card-body">' +
            '<span class="catalog-category">' + p.category + '</span>' +
            '<h3 class="catalog-title">' + p.name + '</h3>' +
            '<div class="catalog-price">' + formatPrice(p.price) + '</div>' +
            '<div class="catalog-actions">' +
              '<button class="btn btn-outline-secondary btn-sm" data-quick="' + p.id + '">' +
                '<i class="bi bi-eye"></i> Vista rápida' +
              '</button>' +
              '<a href="' + whatsappLink(p) + '" class="btn btn-consult btn-sm" target="_blank" rel="noopener noreferrer">' +
                '<i class="bi bi-whatsapp"></i> Consultar' +
              '</a>' +
            '</div>' +
          '</div>' +
        '</article>' +
      '</div>'
    );
  }

  function renderProducts() {
    var grid = document.getElementById('productsGrid');
    var noResults = document.getElementById('noResults');
    var info = document.getElementById('resultsInfo');
    if (!grid) return;

    var list = getFiltered();
    if (info) {
      info.textContent = list.length + ' producto' + (list.length !== 1 ? 's' : '');
      if (showFavoritesOnly) info.textContent += ' en favoritos';
    }

    if (list.length === 0) {
      grid.innerHTML = '';
      noResults?.classList.remove('d-none');
    } else {
      grid.innerHTML = list.map(productCardHTML).join('');
      noResults?.classList.add('d-none');
    }
  }

  function openQuickView(id) {
    var product = PRODUCTS.find(function (p) { return p.id === id; });
    if (!product) return;

    var content = document.getElementById('quickViewContent');
    var favClass = isFavorite(id) ? 'active' : '';

    content.innerHTML = (
      '<div class="row g-0">' +
        '<div class="col-md-6 quick-view-img">' +
          '<img src="' + product.image + '" alt="' + product.name + '">' +
        '</div>' +
        '<div class="col-md-6 quick-view-body">' +
          '<span class="catalog-category">' + product.category + '</span>' +
          '<h2 class="h4 fw-bold mt-1 mb-2">' + product.name + '</h2>' +
          '<div class="catalog-price mb-3">' + formatPrice(product.price) + '</div>' +
          '<p class="text-muted">' + product.description + '</p>' +
          '<div class="d-flex gap-2 mt-4">' +
            '<button class="btn btn-outline-danger" data-fav-modal="' + id + '">' +
              '<i class="bi bi-heart' + (favClass ? '-fill' : '') + '"></i> Favorito' +
            '</button>' +
            '<a href="' + whatsappLink(product) + '" class="btn btn-consult flex-grow-1" target="_blank" rel="noopener noreferrer">' +
              '<i class="bi bi-whatsapp me-1"></i> Consultar por WhatsApp' +
            '</a>' +
          '</div>' +
        '</div>' +
      '</div>'
    );

    if (!quickViewModal) {
      quickViewModal = new bootstrap.Modal(document.getElementById('quickViewModal'));
    }
    quickViewModal.show();
  }

  function initCategories() {
    var select = document.getElementById('categoryFilter');
    var pills = document.getElementById('categoryPills');
    var cats = [];
    PRODUCTS.forEach(function (p) {
      if (cats.indexOf(p.category) === -1) cats.push(p.category);
    });
    cats.sort();

    cats.forEach(function (cat) {
      var opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat;
      select.appendChild(opt);

      var pill = document.createElement('button');
      pill.type = 'button';
      pill.className = 'pill';
      pill.textContent = cat;
      pill.dataset.category = cat;
      pills.appendChild(pill);
    });

    var allPill = document.createElement('button');
    allPill.type = 'button';
    allPill.className = 'pill active';
    allPill.textContent = 'Todos';
    allPill.dataset.category = '';
    pills.insertBefore(allPill, pills.firstChild);
  }

  function setCategory(cat) {
    document.getElementById('categoryFilter').value = cat;
    document.querySelectorAll('.pill').forEach(function (p) {
      p.classList.toggle('active', p.dataset.category === cat);
    });
    renderProducts();
  }

  document.getElementById('searchInput')?.addEventListener('input', renderProducts);
  document.getElementById('categoryFilter')?.addEventListener('change', function () {
    setCategory(this.value);
  });

  document.getElementById('categoryPills')?.addEventListener('click', function (e) {
    var pill = e.target.closest('.pill');
    if (pill) setCategory(pill.dataset.category);
  });

  document.getElementById('btnFavorites')?.addEventListener('click', function () {
    showFavoritesOnly = !showFavoritesOnly;
    this.classList.toggle('btn-outline-danger', !showFavoritesOnly);
    this.classList.toggle('btn-danger', showFavoritesOnly);
    renderProducts();
  });

  document.addEventListener('click', function (e) {
    var favBtn = e.target.closest('[data-fav]');
    if (favBtn) {
      e.preventDefault();
      toggleFavorite(parseInt(favBtn.dataset.fav, 10));
      return;
    }

    var quickBtn = e.target.closest('[data-quick]');
    if (quickBtn) {
      openQuickView(parseInt(quickBtn.dataset.quick, 10));
      return;
    }

    var favModal = e.target.closest('[data-fav-modal]');
    if (favModal) {
      toggleFavorite(parseInt(favModal.dataset.favModal, 10));
      openQuickView(parseInt(favModal.dataset.favModal, 10));
    }
  });

  initCategories();
  updateFavCount();
  renderProducts();
})();

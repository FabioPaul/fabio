/**
 * TiendaNova — Demo Ecommerce
 */
(function () {
  'use strict';

  var CART_KEY = 'tiendanova_cart';
  var ORDER_KEY = 'tiendanova_last_order';
  var SHIPPING = 25000;

  var PAYMENT_LABELS = {
    card: 'Tarjeta de crédito / débito',
    cash: 'Efectivo contra entrega',
    transfer: 'Transferencia bancaria'
  };

  var PRODUCTS = [
    { id: 1, name: 'Auriculares Bluetooth Pro', category: 'Electrónica', price: 189000, oldPrice: 249000, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', description: 'Sonido premium con cancelación de ruido activa. Batería de 30 horas y estuche de carga rápida.', featured: true },
    { id: 2, name: 'Smartwatch Deportivo X200', category: 'Electrónica', price: 320000, oldPrice: null, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', description: 'Monitoreo de salud, GPS integrado y resistencia al agua IP68. Ideal para deportistas.', featured: true },
    { id: 3, name: 'Notebook Ultra Slim 14"', category: 'Electrónica', price: 2890000, oldPrice: 3200000, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop', description: 'Procesador de última generación, 16GB RAM y SSD 512GB. Perfecta para trabajo y estudio.', featured: false },
    { id: 4, name: 'Camiseta Premium Algodón', category: 'Ropa', price: 89000, oldPrice: null, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop', description: '100% algodón orgánico, corte moderno unisex. Disponible en varios colores.', featured: true },
    { id: 5, name: 'Zapatillas Running Air', category: 'Deportes', price: 245000, oldPrice: 299000, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', description: 'Amortiguación avanzada y suela antideslizante. Diseño ligero para máximo rendimiento.', featured: true },
    { id: 6, name: 'Mochila Urbana 25L', category: 'Accesorios', price: 125000, oldPrice: null, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop', description: 'Compartimento para laptop, material impermeable y correas ergonómicas acolchadas.', featured: false },
    { id: 7, name: 'Cafetera Automática', category: 'Hogar', price: 450000, oldPrice: 520000, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop', description: 'Espresso y cappuccino con un toque. Depósito de agua de 1.5L y apagado automático.', featured: false },
    { id: 8, name: 'Set Ollas Antiadherentes', category: 'Hogar', price: 198000, oldPrice: null, image: 'https://images.unsplash.com/photo-1584990347499-76c07f2a9e0c?w=400&h=400&fit=crop', description: 'Set de 5 piezas con recubrimiento cerámico. Aptas para todo tipo de cocinas.', featured: false },
    { id: 9, name: 'Pelota de Fútbol Profesional', category: 'Deportes', price: 75000, oldPrice: null, image: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=400&h=400&fit=crop', description: 'Material sintético de alta calidad, costuras reforzadas. Tamaño oficial FIFA.', featured: false },
    { id: 10, name: 'Reloj Clásico de Cuero', category: 'Accesorios', price: 165000, oldPrice: 195000, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop', description: 'Correa de cuero genuino, cristal mineral y movimiento de cuarzo suizo.', featured: true },
    { id: 11, name: 'Lámpara LED Escritorio', category: 'Hogar', price: 68000, oldPrice: null, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop', description: 'Luz regulable en intensidad y temperatura. Puerto USB para cargar dispositivos.', featured: false },
    { id: 12, name: 'Teclado Mecánico RGB', category: 'Electrónica', price: 210000, oldPrice: null, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop', description: 'Switches mecánicos, retroiluminación RGB personalizable y reposamuñecas magnético.', featured: false },
    { id: 13, name: 'Jean Slim Fit', category: 'Ropa', price: 142000, oldPrice: 178000, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop', description: 'Denim elástico de alta calidad. Corte slim que combina comodidad y estilo.', featured: false },
    { id: 14, name: 'Botella Térmica 750ml', category: 'Deportes', price: 45000, oldPrice: null, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop', description: 'Mantiene bebidas frías 24h y calientes 12h. Acero inoxidable libre de BPA.', featured: false }
  ];

  var cart = loadCart();
  var currentView = 'inicio';
  var detailProductId = null;

  function formatPrice(n) {
    return 'Gs. ' + n.toLocaleString('es-PY');
  }

  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
  }

  function getProduct(id) {
    return PRODUCTS.find(function (p) { return p.id === id; });
  }

  function getCartCount() {
    return cart.reduce(function (sum, item) { return sum + item.qty; }, 0);
  }

  function updateCartBadge() {
    var badge = document.getElementById('cartBadge');
    if (badge) badge.textContent = getCartCount();
  }

  function productCardHTML(product) {
    var oldPriceHTML = product.oldPrice
      ? '<span class="product-price-old">' + formatPrice(product.oldPrice) + '</span>'
      : '';
    var badgeHTML = product.oldPrice
      ? '<span class="product-badge">Oferta</span>'
      : '';

    return (
      '<div class="col-sm-6 col-lg-4 col-xl-3">' +
        '<article class="product-card">' +
          '<div class="product-card-img">' +
            badgeHTML +
            '<img src="' + product.image + '" alt="' + product.name + '" loading="lazy">' +
          '</div>' +
          '<div class="product-card-body">' +
            '<span class="product-category">' + product.category + '</span>' +
            '<h3 class="product-title">' + product.name + '</h3>' +
            '<div class="product-price">' + formatPrice(product.price) + oldPriceHTML + '</div>' +
            '<div class="product-card-actions">' +
              '<button class="btn btn-outline-primary btn-sm" data-action="detail" data-id="' + product.id + '">Ver</button>' +
              '<button class="btn btn-primary btn-sm" data-action="add" data-id="' + product.id + '">' +
                '<i class="bi bi-cart-plus"></i> Agregar' +
              '</button>' +
            '</div>' +
          '</div>' +
        '</article>' +
      '</div>'
    );
  }

  function renderFeatured() {
    var el = document.getElementById('featuredProducts');
    if (!el) return;
    var featured = PRODUCTS.filter(function (p) { return p.featured; }).slice(0, 4);
    el.innerHTML = featured.map(productCardHTML).join('');
  }

  function getFilteredProducts() {
    var search = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
    var category = document.getElementById('categoryFilter')?.value || '';
    var sort = document.getElementById('sortFilter')?.value || 'default';

    var list = PRODUCTS.filter(function (p) {
      var matchSearch = !search || p.name.toLowerCase().includes(search) || p.category.toLowerCase().includes(search);
      var matchCat = !category || p.category === category;
      return matchSearch && matchCat;
    });

    if (sort === 'price-asc') list.sort(function (a, b) { return a.price - b.price; });
    else if (sort === 'price-desc') list.sort(function (a, b) { return b.price - a.price; });
    else if (sort === 'name') list.sort(function (a, b) { return a.name.localeCompare(b.name); });

    return list;
  }

  function renderCatalog() {
    var grid = document.getElementById('productsGrid');
    var noResults = document.getElementById('noResults');
    var count = document.getElementById('resultsCount');
    if (!grid) return;

    var list = getFilteredProducts();
    if (count) count.textContent = list.length + ' producto' + (list.length !== 1 ? 's' : '') + ' encontrado' + (list.length !== 1 ? 's' : '');

    if (list.length === 0) {
      grid.innerHTML = '';
      noResults?.classList.remove('d-none');
    } else {
      grid.innerHTML = list.map(productCardHTML).join('');
      noResults?.classList.add('d-none');
    }
  }

  function renderDetail(id) {
    var product = getProduct(id);
    var el = document.getElementById('productDetail');
    if (!product || !el) return;

    var oldPriceHTML = product.oldPrice
      ? '<span class="text-muted text-decoration-line-through ms-2 fs-5">' + formatPrice(product.oldPrice) + '</span>'
      : '';

    el.innerHTML = (
      '<nav aria-label="breadcrumb" class="mb-4">' +
        '<ol class="breadcrumb">' +
          '<li class="breadcrumb-item"><a href="#catalogo" data-nav="catalogo">Productos</a></li>' +
          '<li class="breadcrumb-item active">' + product.name + '</li>' +
        '</ol>' +
      '</nav>' +
      '<div class="row g-4 align-items-start">' +
        '<div class="col-md-6">' +
          '<div class="detail-img"><img src="' + product.image + '" alt="' + product.name + '"></div>' +
        '</div>' +
        '<div class="col-md-6">' +
          '<span class="badge bg-light text-dark mb-2">' + product.category + '</span>' +
          '<h1 class="h2 fw-bold mb-3">' + product.name + '</h1>' +
          '<div class="detail-price mb-3">' + formatPrice(product.price) + oldPriceHTML + '</div>' +
          '<p class="detail-desc mb-4">' + product.description + '</p>' +
          '<div class="d-flex align-items-center gap-3 mb-4">' +
            '<span class="fw-medium">Cantidad:</span>' +
            '<div class="qty-control" id="detailQty">' +
              '<button type="button" data-qty="minus">−</button>' +
              '<span id="detailQtyVal">1</span>' +
              '<button type="button" data-qty="plus">+</button>' +
            '</div>' +
          '</div>' +
          '<div class="d-flex flex-wrap gap-2">' +
            '<button class="btn btn-primary btn-lg" id="btnAddDetail" data-id="' + product.id + '">' +
              '<i class="bi bi-cart-plus me-2"></i>Agregar al carrito' +
            '</button>' +
            '<a href="#catalogo" class="btn btn-outline-secondary btn-lg" data-nav="catalogo">Seguir comprando</a>' +
          '</div>' +
        '</div>' +
      '</div>'
    );

    var qty = 1;
    var qtyVal = document.getElementById('detailQtyVal');
    document.getElementById('detailQty')?.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-qty]');
      if (!btn) return;
      if (btn.dataset.qty === 'plus') qty = Math.min(qty + 1, 99);
      else qty = Math.max(qty - 1, 1);
      if (qtyVal) qtyVal.textContent = qty;
    });

    document.getElementById('btnAddDetail')?.addEventListener('click', function () {
      addToCart(product.id, qty);
    });
  }

  function addToCart(id, qty) {
    qty = qty || 1;
    var existing = cart.find(function (item) { return item.id === id; });
    if (existing) existing.qty += qty;
    else cart.push({ id: id, qty: qty });
    saveCart();
    showToast('Producto agregado al carrito');
  }

  function showToast(msg) {
    var toast = document.createElement('div');
    toast.className = 'position-fixed bottom-0 start-50 translate-middle-x mb-4 px-4 py-2 bg-dark text-white rounded-pill shadow';
    toast.style.zIndex = '9999';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(function () { toast.remove(); }, 2000);
  }

  function getCartTotals() {
    var subtotal = 0;
    var items = [];

    cart.forEach(function (item) {
      var product = getProduct(item.id);
      if (!product) return;
      var lineTotal = product.price * item.qty;
      subtotal += lineTotal;
      items.push({ product: product, qty: item.qty, lineTotal: lineTotal });
    });

    return {
      items: items,
      subtotal: subtotal,
      shipping: SHIPPING,
      total: subtotal + SHIPPING
    };
  }

  function updateCartSummary(totals) {
    var subEl = document.getElementById('subtotalAmount');
    var shipEl = document.getElementById('shippingAmount');
    var totalEl = document.getElementById('totalAmount');
    if (subEl) subEl.textContent = formatPrice(totals.subtotal);
    if (shipEl) shipEl.textContent = formatPrice(totals.shipping);
    if (totalEl) totalEl.textContent = formatPrice(totals.total);
  }

  function updateCheckoutSummary(totals) {
    var subEl = document.getElementById('checkoutSubtotal');
    var shipEl = document.getElementById('checkoutShipping');
    var totalEl = document.getElementById('checkoutTotal');
    if (subEl) subEl.textContent = formatPrice(totals.subtotal);
    if (shipEl) shipEl.textContent = formatPrice(totals.shipping);
    if (totalEl) totalEl.textContent = formatPrice(totals.total);
  }

  function renderCart() {
    var itemsEl = document.getElementById('cartItems');
    var emptyEl = document.getElementById('emptyCart');
    var summaryEl = document.getElementById('cartSummary');
    var btnGoCheckout = document.getElementById('btnGoCheckout');
    if (!itemsEl) return;

    if (cart.length === 0) {
      itemsEl.innerHTML = '';
      emptyEl?.classList.remove('d-none');
      summaryEl?.classList.add('d-none');
      return;
    }

    emptyEl?.classList.add('d-none');
    summaryEl?.classList.remove('d-none');

    var totals = getCartTotals();
    itemsEl.innerHTML = totals.items.map(function (entry) {
      var product = entry.product;
      return (
        '<div class="cart-item" data-cart-id="' + product.id + '">' +
          '<img src="' + product.image + '" alt="' + product.name + '" class="cart-item-img">' +
          '<div class="cart-item-info">' +
            '<div class="cart-item-title">' + product.name + '</div>' +
            '<div class="text-muted small">' + formatPrice(product.price) + ' c/u</div>' +
            '<div class="cart-item-price mt-1">' + formatPrice(entry.lineTotal) + '</div>' +
          '</div>' +
          '<div class="qty-control">' +
            '<button type="button" data-cart-qty="minus" data-id="' + product.id + '">−</button>' +
            '<span>' + entry.qty + '</span>' +
            '<button type="button" data-cart-qty="plus" data-id="' + product.id + '">+</button>' +
          '</div>' +
          '<button class="btn btn-outline-danger btn-sm" data-cart-remove="' + product.id + '">' +
            '<i class="bi bi-trash"></i>' +
          '</button>' +
        '</div>'
      );
    }).join('');

    updateCartSummary(totals);
    if (btnGoCheckout) btnGoCheckout.disabled = false;
  }

  function renderCheckout() {
    if (cart.length === 0) {
      navigate('carrito');
      window.location.hash = 'carrito';
      return;
    }

    var totals = getCartTotals();
    var listEl = document.getElementById('checkoutItems');
    if (listEl) {
      listEl.innerHTML = totals.items.map(function (entry) {
        var product = entry.product;
        return (
          '<div class="checkout-item">' +
            '<img src="' + product.image + '" alt="' + product.name + '">' +
            '<div class="checkout-item-info">' +
              '<div class="checkout-item-name">' + product.name + '</div>' +
              '<div class="checkout-item-meta">' + entry.qty + ' x ' + formatPrice(product.price) + '</div>' +
            '</div>' +
            '<strong>' + formatPrice(entry.lineTotal) + '</strong>' +
          '</div>'
        );
      }).join('');
    }

    updateCheckoutSummary(totals);
  }

  function updateCartQty(id, delta) {
    var item = cart.find(function (i) { return i.id === id; });
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter(function (i) { return i.id !== id; });
    saveCart();
    renderCart();
    if (currentView === 'checkout') renderCheckout();
  }

  function getCheckoutData() {
    var payment = document.querySelector('input[name="paymentMethod"]:checked');
    var method = payment ? payment.value : 'cash';
    return {
      name: document.getElementById('checkoutName').value.trim(),
      phone: document.getElementById('checkoutPhone').value.trim(),
      email: document.getElementById('checkoutEmail').value.trim(),
      address: document.getElementById('checkoutAddress').value.trim(),
      city: document.getElementById('checkoutCity').value.trim(),
      ref: document.getElementById('checkoutRef').value.trim(),
      notes: document.getElementById('checkoutNotes').value.trim(),
      paymentMethod: method,
      paymentLabel: PAYMENT_LABELS[method] || method,
      cardNumber: document.getElementById('cardNumber')?.value.replace(/\s/g, '') || '',
      cardName: document.getElementById('cardName')?.value.trim() || '',
      cardExpiry: document.getElementById('cardExpiry')?.value.trim() || '',
      cardCvv: document.getElementById('cardCvv')?.value.trim() || ''
    };
  }

  function isCardPayment() {
    var payment = document.querySelector('input[name="paymentMethod"]:checked');
    return payment && payment.value === 'card';
  }

  function formatCardNumber(value) {
    var digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  }

  function formatCardExpiry(value) {
    var digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
  }

  function updateCardPreview() {
    var number = document.getElementById('cardNumber')?.value || '•••• •••• •••• ••••';
    var name = document.getElementById('cardName')?.value.trim() || 'NOMBRE APELLIDO';
    var expiry = document.getElementById('cardExpiry')?.value.trim() || 'MM/AA';
    var numEl = document.getElementById('cardPreviewNumber');
    var nameEl = document.getElementById('cardPreviewName');
    var expEl = document.getElementById('cardPreviewExpiry');
    if (numEl) numEl.textContent = number || '•••• •••• •••• ••••';
    if (nameEl) nameEl.textContent = name.toUpperCase();
    if (expEl) expEl.textContent = expiry || 'MM/AA';
  }

  function togglePaymentFields() {
    var cardFields = document.getElementById('cardPaymentFields');
    var btnText = document.getElementById('btnConfirmText');
    var isCard = isCardPayment();
    if (cardFields) cardFields.classList.toggle('d-none', !isCard);
    if (btnText) {
      btnText.textContent = isCard ? 'Pagar con tarjeta y confirmar' : 'Confirmar pedido';
    }
  }

  function validateCard(data) {
    if (!isCardPayment()) return true;
    if (data.cardNumber.length !== 16) {
      showToast('Ingresá un número de tarjeta válido (16 dígitos)');
      return false;
    }
    if (!data.cardName) {
      showToast('Ingresá el nombre en la tarjeta');
      return false;
    }
    if (!/^\d{2}\/\d{2}$/.test(data.cardExpiry)) {
      showToast('Ingresá una fecha de vencimiento válida (MM/AA)');
      return false;
    }
    if (data.cardCvv.length < 3) {
      showToast('Ingresá el CVV de la tarjeta');
      return false;
    }
    return true;
  }

  function generateOrderRef() {
    var now = new Date();
    var code = 'TN-' + now.getFullYear().toString().slice(-2) +
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0') + '-' +
      String(Math.floor(Math.random() * 9000) + 1000);
    return code;
  }

  function showPaymentOverlay(show, title, text) {
    var overlay = document.getElementById('paymentOverlay');
    if (!overlay) return;
    overlay.classList.toggle('d-none', !show);
    overlay.setAttribute('aria-hidden', show ? 'false' : 'true');
    if (title) document.getElementById('overlayTitle').textContent = title;
    if (text) document.getElementById('overlayText').textContent = text;
  }

  function buildOrder(customer) {
    var totals = getCartTotals();
    var now = new Date();
    return {
      orderRef: customer.orderRef,
      date: now.toLocaleString('es-PY', {
        day: '2-digit', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      }),
      status: 'Confirmado',
      customer: {
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        address: customer.address,
        city: customer.city,
        ref: customer.ref,
        notes: customer.notes
      },
      payment: {
        method: customer.paymentMethod,
        label: customer.paymentLabel,
        cardLast4: customer.paymentMethod === 'card' ? customer.cardNumber.slice(-4) : null
      },
      items: totals.items.map(function (entry) {
        return {
          id: entry.product.id,
          name: entry.product.name,
          qty: entry.qty,
          price: entry.product.price,
          lineTotal: entry.lineTotal,
          image: entry.product.image
        };
      }),
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      total: totals.total
    };
  }

  function saveOrder(order) {
    localStorage.setItem(ORDER_KEY, JSON.stringify(order));
  }

  function loadLastOrder() {
    try {
      return JSON.parse(localStorage.getItem(ORDER_KEY));
    } catch (e) {
      return null;
    }
  }

  function renderOrderReceipt() {
    var order = loadLastOrder();
    var el = document.getElementById('orderReceipt');
    var msgEl = document.getElementById('confirmationMessage');
    if (!order || !el) return;

    var paymentInfo = order.payment.label;
    if (order.payment.cardLast4) {
      paymentInfo += ' · **** ' + order.payment.cardLast4;
    }

    if (msgEl) {
      msgEl.textContent = order.payment.method === 'card'
        ? 'Tu pago fue procesado correctamente. Recibirás un email con los detalles del envío.'
        : 'Tu orden fue registrada. Te contactaremos para coordinar el pago y la entrega.';
    }

    var itemsHTML = order.items.map(function (item) {
      return (
        '<tr>' +
          '<td><strong>' + item.name + '</strong></td>' +
          '<td class="text-center">' + item.qty + '</td>' +
          '<td class="text-end">' + formatPrice(item.price) + '</td>' +
          '<td class="text-end fw-semibold">' + formatPrice(item.lineTotal) + '</td>' +
        '</tr>'
      );
    }).join('');

    var totalLabel = order.payment.method === 'card' ? 'Total pagado' : 'Total a pagar';

    el.innerHTML = (
      '<div class="order-receipt-header">' +
        '<div>' +
          '<h2>Orden de compra</h2>' +
          '<p class="mb-0 opacity-75 small">TiendaNova</p>' +
        '</div>' +
        '<div class="text-end">' +
          '<span class="order-status-badge"><i class="bi bi-check-circle-fill"></i> ' + order.status + '</span>' +
          '<p class="mb-0 mt-2 fw-bold">' + order.orderRef + '</p>' +
          '<p class="mb-0 small opacity-75">' + order.date + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="order-receipt-body">' +
        '<div class="row g-4">' +
          '<div class="col-md-6">' +
            '<div class="order-receipt-section">' +
              '<h3>Cliente</h3>' +
              '<div class="order-receipt-row"><span>' + order.customer.name + '</span></div>' +
              '<div class="order-receipt-row"><span class="text-muted">' + order.customer.phone + '</span></div>' +
              (order.customer.email ? '<div class="order-receipt-row"><span class="text-muted">' + order.customer.email + '</span></div>' : '') +
            '</div>' +
          '</div>' +
          '<div class="col-md-6">' +
            '<div class="order-receipt-section">' +
              '<h3>Entrega</h3>' +
              '<div class="order-receipt-row"><span>' + order.customer.address + '</span></div>' +
              '<div class="order-receipt-row"><span class="text-muted">' + order.customer.city + '</span></div>' +
              (order.customer.ref ? '<div class="order-receipt-row"><span class="text-muted">Ref: ' + order.customer.ref + '</span></div>' : '') +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="order-receipt-section">' +
          '<h3>Productos</h3>' +
          '<div class="table-responsive">' +
            '<table class="order-receipt-table">' +
              '<thead><tr><th>Producto</th><th class="text-center">Cant.</th><th class="text-end">Precio</th><th class="text-end">Subtotal</th></tr></thead>' +
              '<tbody>' + itemsHTML + '</tbody>' +
            '</table>' +
          '</div>' +
        '</div>' +
        '<div class="order-receipt-section">' +
          '<h3>Pago</h3>' +
          '<div class="order-receipt-row"><span>Método</span><span>' + paymentInfo + '</span></div>' +
          (order.customer.notes ? '<div class="order-receipt-row mt-2"><span class="text-muted">Notas: ' + order.customer.notes + '</span></div>' : '') +
        '</div>' +
      '</div>' +
      '<div class="order-receipt-total">' +
        '<div class="order-receipt-row"><span class="text-muted">Subtotal</span><span>' + formatPrice(order.subtotal) + '</span></div>' +
        '<div class="order-receipt-row"><span class="text-muted">Envío</span><span>' + formatPrice(order.shipping) + '</span></div>' +
        '<div class="order-receipt-row fw-bold fs-5 mt-2"><span>' + totalLabel + '</span><span class="text-primary">' + formatPrice(order.total) + '</span></div>' +
      '</div>'
    );
  }

  function simulateOrder(customer, onComplete) {
    var steps = customer.paymentMethod === 'card'
      ? [
          { title: 'Procesando pago...', text: 'Verificando datos de la tarjeta', delay: 1200 },
          { title: 'Autorizando transacción...', text: 'Conectando con el banco emisor', delay: 1500 },
          { title: '¡Pago aprobado!', text: 'Generando orden de compra', delay: 800 }
        ]
      : [
          { title: 'Registrando pedido...', text: 'Validando información de entrega', delay: 1000 },
          { title: 'Confirmando orden...', text: 'Preparando comprobante', delay: 1200 }
        ];

    var stepIndex = 0;

    function runStep() {
      if (stepIndex >= steps.length) {
        showPaymentOverlay(false);
        onComplete();
        return;
      }
      var step = steps[stepIndex];
      showPaymentOverlay(true, step.title, step.text);
      stepIndex += 1;
      setTimeout(runStep, step.delay);
    }

    runStep();
  }

  function navigate(view, productId) {
    currentView = view;
    detailProductId = productId || null;

    document.querySelectorAll('.view').forEach(function (v) { v.classList.remove('active'); });
    var viewEl = document.getElementById('view-' + view);
    if (viewEl) viewEl.classList.add('active');

    document.querySelectorAll('[data-nav]').forEach(function (link) {
      link.classList.toggle('active', link.dataset.nav === view);
    });

    if (view === 'catalogo') renderCatalog();
    if (view === 'detalle' && productId) renderDetail(productId);
    if (view === 'carrito') renderCart();
    if (view === 'checkout') {
      renderCheckout();
      togglePaymentFields();
    }
    if (view === 'confirmacion') renderOrderReceipt();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function parseHash() {
    var hash = window.location.hash.slice(1) || 'inicio';
    if (hash.startsWith('producto/')) {
      var id = parseInt(hash.split('/')[1], 10);
      navigate('detalle', id);
    } else {
      navigate(hash);
    }
  }

  function initCategories() {
    var select = document.getElementById('categoryFilter');
    if (!select) return;
    var cats = [];
    PRODUCTS.forEach(function (p) {
      if (cats.indexOf(p.category) === -1) cats.push(p.category);
    });
    cats.sort().forEach(function (cat) {
      var opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat;
      select.appendChild(opt);
    });
  }

  /* Event listeners */
  document.addEventListener('click', function (e) {
    var nav = e.target.closest('[data-nav]');
    if (nav) {
      e.preventDefault();
      navigate(nav.dataset.nav);
      window.location.hash = nav.dataset.nav;
      return;
    }

    var action = e.target.closest('[data-action]');
    if (action) {
      var id = parseInt(action.dataset.id, 10);
      if (action.dataset.action === 'detail') {
        window.location.hash = 'producto/' + id;
        navigate('detalle', id);
      } else if (action.dataset.action === 'add') {
        addToCart(id, 1);
      }
      return;
    }

    var qtyBtn = e.target.closest('[data-cart-qty]');
    if (qtyBtn) {
      var cartId = parseInt(qtyBtn.dataset.id, 10);
      updateCartQty(cartId, qtyBtn.dataset.cartQty === 'plus' ? 1 : -1);
      return;
    }

    var removeBtn = e.target.closest('[data-cart-remove]');
    if (removeBtn) {
      cart = cart.filter(function (i) { return i.id !== parseInt(removeBtn.dataset.cartRemove, 10); });
      saveCart();
      renderCart();
    }
  });

  document.getElementById('searchInput')?.addEventListener('input', renderCatalog);
  document.getElementById('categoryFilter')?.addEventListener('change', renderCatalog);
  document.getElementById('sortFilter')?.addEventListener('change', renderCatalog);

  document.getElementById('btnGoCheckout')?.addEventListener('click', function () {
    if (cart.length === 0) return;
    window.location.hash = 'checkout';
    navigate('checkout');
  });

  document.getElementById('btnBackCart')?.addEventListener('click', function () {
    window.location.hash = 'carrito';
    navigate('carrito');
  });

  document.getElementById('checkoutForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    if (cart.length === 0) {
      showToast('Tu carrito está vacío');
      navigate('carrito');
      return;
    }

    var customer = getCheckoutData();
    if (!customer.name || !customer.phone || !customer.address || !customer.city) {
      showToast('Completá los campos obligatorios');
      return;
    }

    if (!validateCard(customer)) return;

    var btnConfirm = document.getElementById('btnConfirmOrder');
    if (btnConfirm) btnConfirm.disabled = true;

    customer.orderRef = generateOrderRef();
    var orderSnapshot = buildOrder(customer);

    simulateOrder(customer, function () {
      saveOrder(orderSnapshot);
      cart = [];
      saveCart();

      if (btnConfirm) btnConfirm.disabled = false;
      window.location.hash = 'confirmacion';
      navigate('confirmacion');
    });
  });

  document.querySelectorAll('input[name="paymentMethod"]').forEach(function (radio) {
    radio.addEventListener('change', togglePaymentFields);
  });

  document.getElementById('cardNumber')?.addEventListener('input', function () {
    this.value = formatCardNumber(this.value);
    updateCardPreview();
  });
  document.getElementById('cardName')?.addEventListener('input', updateCardPreview);
  document.getElementById('cardExpiry')?.addEventListener('input', function () {
    this.value = formatCardExpiry(this.value);
    updateCardPreview();
  });
  document.getElementById('cardCvv')?.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '').slice(0, 4);
  });

  document.getElementById('btnPrintOrder')?.addEventListener('click', function () {
    window.print();
  });

  document.getElementById('btnClearCart')?.addEventListener('click', function () {
    if (confirm('¿Vaciar el carrito?')) {
      cart = [];
      saveCart();
      renderCart();
    }
  });

  window.addEventListener('hashchange', parseHash);

  /* Init */
  initCategories();
  renderFeatured();
  updateCartBadge();
  togglePaymentFields();
  parseHash();
})();

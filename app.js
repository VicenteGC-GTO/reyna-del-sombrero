// ================================
// REYNA DEL SOMBRERO - app.js
// ================================

// ================================
// EMAILJS CONFIGURATION
// ================================
// ⬇️ PEGA TU PUBLIC KEY AQUÍ ⬇️
emailjs.init("4jh3P4taCUmWOj27f");

// Array de productos
const products = [
  { id: 1, name: 'Sombrero Charro', nameEn: 'Charro Hat', price: 850, emoji: '🤠', badge: 'Popular', origin: 'León, Gto.' },
  { id: 2, name: 'Sombrero Vaquero', nameEn: 'Cowboy Hat', price: 650, emoji: '🎩', badge: 'Nuevo', origin: 'León, Gto.' },
  { id: 3, name: 'Sombrero Fino', nameEn: 'Fine Hat', price: 1200, emoji: '👒', badge: 'Premium', origin: 'León, Gto.' },
  { id: 4, name: 'Sombrero Norteño', nameEn: 'Northern Hat', price: 750, emoji: '🤠', badge: '', origin: 'León, Gto.' },
  { id: 5, name: 'Sombrero de Palma', nameEn: 'Palm Hat', price: 450, emoji: '👒', badge: 'Oferta', origin: 'León, Gto.' },
  { id: 6, name: 'Sombrero Elegante', nameEn: 'Elegant Hat', price: 980, emoji: '🎩', badge: 'Exclusivo', origin: 'León, Gto.' },
];

// Carrito vacío al inicio
let cart = [];

// Función para mostrar los productos en el catálogo
function renderProducts() {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = products.map(p => `
    <div class="product-card">
      <div class="product-img">
        ${p.emoji}
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
      </div>
      <div class="product-info">
        <div class="product-name">${p.name} / ${p.nameEn}</div>
        <div class="product-origin">📍 ${p.origin}</div>
        <div class="product-bottom">
          <div class="product-price">$${p.price} MXN</div>
          <button class="add-btn" onclick="addToCart(${p.id})">+ Agregar</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Función para agregar al carrito
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCart();
  document.getElementById('carrito').scrollIntoView({ behavior: 'smooth' });
}

// Función para eliminar del carrito
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

// Función para actualizar el carrito
function updateCart() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById('cart-count').textContent = count;

  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="cart-empty">🎩 Tu carrito está vacío / Your cart is empty</div>';
    cartTotal.innerHTML = '';
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <span class="cart-item-emoji">${item.emoji}</span>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name} x${item.qty}</div>
        <div class="cart-item-price">$${item.price * item.qty} MXN</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Eliminar</button>
    </div>
  `).join('');

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  cartTotal.innerHTML = `
    <div class="cart-total">Total: $${total} MXN</div>
    <button class="checkout-btn">Realizar pedido / Place Order 🎩</button>
  `;
}

// Función para ir al carrito
function scrollToCart() {
  document.getElementById('carrito').scrollIntoView({ behavior: 'smooth' });
}

// ================================
// EMAILJS - FORMULARIO DE CONTACTO
// ================================
document.querySelector('.form-btn').addEventListener('click', function() {
  const from_name = document.querySelectorAll('.form-input')[0].value;
  const from_email = document.querySelectorAll('.form-input')[1].value;
  const subject = document.querySelectorAll('.form-input')[2].value;
  const message = document.querySelector('textarea.form-input').value;

  // Validar que todos los campos estén llenos
  if (!from_name || !from_email || !subject || !message) {
    alert('Por favor llena todos los campos / Please fill all fields');
    return;
  }

  // Cambiar texto del botón mientras envía
  const btn = document.querySelector('.form-btn');
  btn.textContent = 'Enviando... / Sending...';
  btn.disabled = true;

  // ⬇️ PEGA TU SERVICE ID Y TEMPLATE ID AQUÍ ⬇️
  emailjs.send("service_0nt7rsm", "template_0zsmme5", {
    from_name: from_name,
    from_email: from_email,
    subject: subject,
    message: message
  })
  .then(function() {
    alert('¡Mensaje enviado con éxito! / Message sent successfully! ✅');
    // Limpiar el formulario
    document.querySelectorAll('.form-input').forEach(input => input.value = '');
    btn.textContent = 'Enviar mensaje / Send message';
    btn.disabled = false;
  })
  .catch(function(error) {
    alert('Error al enviar / Error sending: ' + error);
    btn.textContent = 'Enviar mensaje / Send message';
    btn.disabled = false;
  });
});

// Iniciar la página
renderProducts();
updateCart();

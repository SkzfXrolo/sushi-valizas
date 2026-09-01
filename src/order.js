import { waLink } from './config.js'
import { getCart, cartCount, cartTotal, addToCart, setQty, removeFromCart, clearCart } from './cart.js'

function money(n) {
  return `$${n}`
}

function openCart() {
  document.body.classList.add('cart-open')
  renderCartPanel()
}

function closeCart() {
  document.body.classList.remove('cart-open')
}

function buildOrderMessage(form) {
  const items = getCart()
  const lines = items.map((i) => `• ${i.qty}x ${i.name} — ${money(i.price * i.qty)}`)
  const mode = form.mode === 'mesa' ? 'Mesa' : 'Para llevar'
  return [
    '*PEDIDO SUSHI VALIZAS*',
    '',
    `Nombre: ${form.name}`,
    `Tel: ${form.phone}`,
    `Modalidad: ${mode}`,
    '',
    '*Sushi*',
    ...lines,
    '',
    `*Total: ${money(cartTotal())}*`,
    form.notes ? `Notas: ${form.notes}` : '',
  ]
    .filter(Boolean)
    .join('\n')
}

function buildReserveMessage(form) {
  return [
    '*RESERVA DE MESA — SUSHI VALIZAS*',
    '',
    `Nombre: ${form.name}`,
    `Tel: ${form.phone}`,
    `Fecha: ${form.date}`,
    `Hora: ${form.time}`,
    `Personas: ${form.people}`,
    form.notes ? `Notas: ${form.notes}` : '',
  ]
    .filter(Boolean)
    .join('\n')
}

function sendWhatsApp(message) {
  window.open(waLink(message), '_blank', 'noopener,noreferrer')
}

function renderCartPanel() {
  const list = document.getElementById('cart-list')
  const totalEl = document.getElementById('cart-total')
  const empty = document.getElementById('cart-empty')
  const form = document.getElementById('cart-form')
  if (!list) return

  const items = getCart()
  if (empty) empty.hidden = items.length > 0
  if (form) form.hidden = items.length === 0

  list.innerHTML = items
    .map(
      (i) => `
    <li class="cart-item" data-id="${i.id}">
      <div>
        <strong>${i.name}</strong>
        <span>${money(i.price)} c/u</span>
      </div>
      <div class="cart-qty">
        <button type="button" data-qty="-1" aria-label="-">−</button>
        <span>${i.qty}</span>
        <button type="button" data-qty="1" aria-label="+">+</button>
      </div>
      <strong class="cart-line">${money(i.price * i.qty)}</strong>
      <button type="button" class="cart-remove" data-remove aria-label="Quitar">×</button>
    </li>`,
    )
    .join('')

  if (totalEl) totalEl.textContent = money(cartTotal())
  updateBadge()
}

function updateBadge() {
  const badge = document.querySelector('[data-cart-count]')
  const n = cartCount()
  if (!badge) return
  badge.textContent = String(n)
  badge.hidden = n === 0
}

function mountCartUi() {
  if (document.getElementById('cart-root')) return

  const root = document.createElement('div')
  root.id = 'cart-root'
  root.innerHTML = `
    <button type="button" class="cart-fab" data-cart-open aria-label="Carrito">
      🛒 <span data-cart-count hidden>0</span>
    </button>
    <div class="cart-backdrop" data-cart-close></div>
    <aside class="cart-drawer" aria-label="Carrito">
      <header class="cart-drawer-head">
        <h2 data-i18n="cart.title">Tu pedido</h2>
        <button type="button" class="icon-btn" data-cart-close aria-label="Cerrar">×</button>
      </header>
      <p class="cart-empty" id="cart-empty" data-i18n="cart.empty">El carrito está vacío. Sumá rolls o combinados desde el menú.</p>
      <ul class="cart-list" id="cart-list"></ul>
      <form class="cart-form" id="cart-form" hidden>
        <div class="cart-total-row">
          <span data-i18n="cart.total">Total</span>
          <strong id="cart-total">$0</strong>
        </div>
        <label>
          <span data-i18n="cart.name">Nombre</span>
          <input name="name" required autocomplete="name" />
        </label>
        <label>
          <span data-i18n="cart.phone">Celular</span>
          <input name="phone" required autocomplete="tel" placeholder="094..." />
        </label>
        <fieldset class="cart-mode">
          <legend data-i18n="cart.mode">Modalidad</legend>
          <label class="chip"><input type="radio" name="mode" value="llevar" checked /> <span data-i18n="cart.takeaway">Para llevar</span></label>
          <label class="chip"><input type="radio" name="mode" value="mesa" /> <span data-i18n="cart.table">Mesa</span></label>
        </fieldset>
        <label>
          <span data-i18n="cart.notes">Notas</span>
          <textarea name="notes" rows="2" placeholder=""></textarea>
        </label>
        <button type="submit" class="btn btn-primary" data-i18n="cart.send">Enviar pedido por WhatsApp</button>
        <p class="cart-hint" data-i18n="cart.hint">Se abre WhatsApp con el pedido armado para confirmar.</p>
      </form>
    </aside>
  `
  document.body.appendChild(root)

  root.querySelector('[data-cart-open]')?.addEventListener('click', openCart)
  root.querySelectorAll('[data-cart-close]').forEach((el) => el.addEventListener('click', closeCart))

  root.querySelector('#cart-list')?.addEventListener('click', (e) => {
    const row = e.target.closest('.cart-item')
    if (!row) return
    const id = row.dataset.id
    if (e.target.closest('[data-remove]')) {
      removeFromCart(id)
      return
    }
    const btn = e.target.closest('[data-qty]')
    if (!btn) return
    const item = getCart().find((i) => i.id === id)
    if (!item) return
    setQty(id, item.qty + Number(btn.dataset.qty))
  })

  root.querySelector('#cart-form')?.addEventListener('submit', (e) => {
    e.preventDefault()
    if (!getCart().length) return
    const fd = new FormData(e.currentTarget)
    const payload = {
      name: String(fd.get('name') || '').trim(),
      phone: String(fd.get('phone') || '').trim(),
      mode: String(fd.get('mode') || 'llevar'),
      notes: String(fd.get('notes') || '').trim(),
    }
    sendWhatsApp(buildOrderMessage(payload))
    clearCart()
    closeCart()
  })

  window.addEventListener('sushi:cart', () => {
    renderCartPanel()
  })

  updateBadge()
  renderCartPanel()
}

export function initCartSystem() {
  mountCartUi()

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-add-cart]')
    if (!btn) return
    e.preventDefault()
    addToCart({
      id: btn.dataset.id,
      name: btn.dataset.name,
      price: Number(btn.dataset.price),
      qty: 1,
    })
    openCart()
  })
}

export function initReserveForm() {
  const form = document.getElementById('reserve-form')
  if (!form) return

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const fd = new FormData(form)
    sendWhatsApp(
      buildReserveMessage({
        name: String(fd.get('name') || '').trim(),
        phone: String(fd.get('phone') || '').trim(),
        date: String(fd.get('date') || '').trim(),
        time: String(fd.get('time') || '').trim(),
        people: String(fd.get('people') || '').trim(),
        notes: String(fd.get('notes') || '').trim(),
      }),
    )
  })
}

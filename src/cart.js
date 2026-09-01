const KEY = 'sushi-valizas-cart'

function read() {
  try {
    const raw = localStorage.getItem(KEY)
    const data = raw ? JSON.parse(raw) : []
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

function write(items) {
  localStorage.setItem(KEY, JSON.stringify(items))
  window.dispatchEvent(new CustomEvent('sushi:cart', { detail: { items } }))
}

export function getCart() {
  return read()
}

export function cartCount() {
  return read().reduce((n, i) => n + i.qty, 0)
}

export function cartTotal() {
  return read().reduce((n, i) => n + i.price * i.qty, 0)
}

export function addToCart(item) {
  const items = read()
  const existing = items.find((i) => i.id === item.id)
  if (existing) existing.qty += item.qty || 1
  else items.push({ id: item.id, name: item.name, price: item.price, qty: item.qty || 1 })
  write(items)
}

export function setQty(id, qty) {
  let items = read()
  items = items
    .map((i) => (i.id === id ? { ...i, qty: Math.max(0, qty) } : i))
    .filter((i) => i.qty > 0)
  write(items)
}

export function removeFromCart(id) {
  write(read().filter((i) => i.id !== id))
}

export function clearCart() {
  write([])
}

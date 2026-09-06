export const SITE = {
  name: 'Sushi Valizas',
  slogan: 'Come rico, come local',
  by: 'Valizas Hostel',
  hostelUrl: 'https://valizashostel.com',
  instagram: 'https://www.instagram.com/sushivalizas/',
  instagramHandle: '@sushivalizas',
  phoneDisplay: '094 873 428',
  phoneTel: '+59894873428',
  waNumber: '59894873428',
  waCatalog: '',
  guestDiscount: 10,
  team: {
    sushimen: {
      name: 'Rubén Fernández',
      role: 'Sushimen',
      school: 'Gato Dumas',
      specialty: 'La Obreria',
    },
  },
}

/** Menu from brand materials (prices UYU) */
export const MENU = {
  combos: [
    { id: 'c10', pieces: 10, flavors: 1, price: 500, img: '/assets/menu/combo-10.webp' },
    { id: 'c20', pieces: 20, flavors: 2, price: 900, img: '/assets/menu/combo-20.webp' },
    { id: 'c30', pieces: 30, flavors: 3, price: 1400, img: '/assets/menu/combo-30.webp' },
    { id: 'c40', pieces: 40, flavors: 4, price: 1800, img: '/assets/menu/combo-40.webp' },
  ],
  rollPrice: 500,
  rollPieces: 10,
  rolls: [
    { id: 'pollo', name: 'Pollo Roll', img: '/assets/menu/pollo.webp', desc: { es: 'Pollo crispy, palta y queso crema.', en: 'Crispy chicken, avocado and cream cheese.', pt: 'Frango crispy, abacate e cream cheese.' } },
    { id: 'camaron', name: 'Camarón Roll', img: '/assets/menu/camaron.webp', desc: { es: 'Camarón crudo, palta y queso crema.', en: 'Raw shrimp, avocado and cream cheese.', pt: 'Camarão cru, abacate e cream cheese.' } },
    { id: 'siri', name: 'Siri Roll', img: '/assets/menu/siri.webp', desc: { es: 'Siri (pulpa de cangrejo), queso crema y palta.', en: 'Crab, cream cheese and avocado.', pt: 'Siri (polpa de caranguejo), cream cheese e abacate.' } },
    { id: 'vegetariano', name: 'Vegetariano Roll', img: '/assets/menu/vegetariano.webp', desc: { es: 'Queso crema, palta, morrón, pepino y ciboulette.', en: 'Cream cheese, avocado, pepper, cucumber and chives.', pt: 'Cream cheese, abacate, pimentão, pepino e ciboulette.' } },
    { id: 'california', name: 'California Roll', img: '/assets/menu/california.webp', desc: { es: 'Salmón, queso crema, palta y sésamo negro.', en: 'Salmon, cream cheese, avocado and black sesame.', pt: 'Salmão, cream cheese, abacate e gergelim preto.' } },
    { id: 'philadelphia', name: 'Philadelphia Roll', img: '/assets/menu/philadelphia.webp', desc: { es: 'Queso crema, salmón, palta y salsa de queso.', en: 'Cream cheese, salmon, avocado and cheese sauce.', pt: 'Cream cheese, salmão, abacate e molho de queijo.' } },
    { id: 'valizas', name: 'Valizas Roll', img: '/assets/menu/valizas.webp', desc: { es: 'Camarón crispy, palta y salsa hot de Tabasco.', en: 'Crispy shrimp, avocado and Tabasco hot sauce.', pt: 'Camarão crispy, abacate e molho hot de Tabasco.' } },
    { id: 'newyork', name: 'New York Roll', img: '/assets/menu/newyork.webp', desc: { es: 'Panceta caramelizada, palta y queso crema.', en: 'Caramelized bacon, avocado and cream cheese.', pt: 'Bacon caramelizado, abacate e cream cheese.' } },
    { id: 'vegano', name: 'Vegano Roll', img: '/assets/menu/vegano.webp', desc: { es: 'Palta, pepino, morrón y zanahoria.', en: 'Avocado, cucumber, pepper and carrot.', pt: 'Abacate, pepino, pimentão e cenoura.' } },
    { id: 'panceta', name: 'Panceta Roll', img: '/assets/menu/panceta.webp', desc: { es: 'Panceta, ciboulette y queso crema.', en: 'Bacon, chives and cream cheese.', pt: 'Bacon, ciboulette e cream cheese.' } },
    { id: 'spicy', name: 'Spicy Tuna Roll', img: '/assets/menu/spicy.webp', desc: { es: 'Atún, queso crema, palta y salsa hot.', en: 'Tuna, cream cheese, avocado and hot sauce.', pt: 'Atum, cream cheese, abacate e molho hot.' } },
    { id: 'kani', name: 'Kani Roll', img: '/assets/menu/kani.webp', desc: { es: 'Kani kama, queso crema, palta y sésamo blanco.', en: 'Kani kama, cream cheese, avocado and white sesame.', pt: 'Kani kama, cream cheese, abacate e gergelim branco.' } },
    { id: 'mango', name: 'Mango Roll', img: '/assets/menu/mango.webp', desc: { es: 'Salmón, mango y queso crema.', en: 'Salmon, mango and cream cheese.', pt: 'Salmão, manga e cream cheese.' } },
  ],
}

/** Bebidas — precios UYU. name puede ser string o {es,en,pt} */
export const DRINKS = [
  { id: 'nami-jarra', group: 'jugos', name: 'Nami Citrus · Jarra 1 L', note: { es: 'Limón, menta y jengibre', en: 'Lemon, mint & ginger', pt: 'Limão, menta e gengibre' }, price: 290, img: '/assets/menu/drink-nami.webp' },
  { id: 'nami-vaso', group: 'jugos', name: 'Nami Citrus · Vaso 500 cc', price: 150, img: '/assets/menu/drink-nami.webp' },
  { id: 'rikulima-jarra', group: 'jugos', name: 'Rikulima Zen · Jarra 1 L', note: { es: 'Naranja y jengibre', en: 'Orange & ginger', pt: 'Laranja e gengibre' }, price: 290, img: '/assets/menu/drink-rikulima.webp' },
  { id: 'rikulima-vaso', group: 'jugos', name: 'Rikulima Zen · Vaso 500 cc', price: 150, img: '/assets/menu/drink-rikulima.webp' },
  { id: 'agua-cgas', group: 'soft', name: { es: 'Agua con gas 500 cc', en: 'Sparkling water 500 cc', pt: 'Água com gás 500 cc' }, price: 100 },
  { id: 'agua-sgas', group: 'soft', name: { es: 'Agua sin gas 500 cc', en: 'Still water 500 cc', pt: 'Água sem gás 500 cc' }, price: 100 },
  ...['Coca-Cola', 'Coca-Cola Zero', 'Sprite', 'Sprite Zero', 'Pomelo', 'Pomelo Zero', 'Naranja', 'Naranja Zero', 'Guaraná', 'Guaraná Zero'].map((f) => ({
    id: 'lata-' + f.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    group: 'soft',
    name: f + ' · lata',
    price: 150,
  })),
]

export function waLink(message = '') {
  if (!SITE.waNumber) return SITE.instagram
  const digits = SITE.waNumber.replace(/\D/g, '')
  const q = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${digits}${q}`
}

export function catalogLink() {
  if (SITE.waCatalog) return SITE.waCatalog
  return waLink()
}

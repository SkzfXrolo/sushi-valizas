const NAV = [
  { href: '/rocha', key: 'nav.local', page: 'rocha' },
  { href: '/menu', key: 'nav.menu', page: 'menu' },
  { href: '/fotos', key: 'nav.gallery', page: 'fotos' },
  { href: '/sushimen', key: 'nav.chef', page: 'sushimen' },
  { href: '/reservas', key: 'nav.reserve', page: 'reservas' },
  { href: '/contacto', key: 'nav.contact', page: 'contacto' },
]

function mountIntro() {
  // Mobile-only welcome moment, once per session. CSS hides it on desktop
  // and for prefers-reduced-motion; a CSS keyframe auto-dismisses it even
  // if this JS never runs.
  if (window.matchMedia('(min-width: 769px), (prefers-reduced-motion: reduce)').matches) return
  let seen = false
  try {
    seen = sessionStorage.getItem('sv-intro') === '1'
    sessionStorage.setItem('sv-intro', '1')
  } catch {
    /* private mode — just show it */
  }
  if (seen) return
  const intro = document.createElement('div')
  intro.className = 'intro'
  intro.setAttribute('aria-hidden', 'true')
  intro.innerHTML = `
    <div class="intro-inner">
      <img class="intro-logo" src="/assets/brand/sushi-valizas.webp" alt="" />
      <p class="intro-title">Sushi Valizas</p>
      <p class="intro-tag">Come rico, come local</p>
      <div class="intro-line"></div>
    </div>
  `
  intro.addEventListener('click', () => intro.classList.add('is-dismissed'))
  document.body.prepend(intro)
  setTimeout(() => intro.remove(), 3600)
}

export function mountShell() {
  mountIntro()
  const page = document.body.dataset.page || 'home'
  const header = document.getElementById('site-header')
  const footer = document.getElementById('site-footer')
  if (!header || !footer) return

  header.innerHTML = `
    <div class="container header-inner">
      <a class="brand" href="/" aria-label="Sushi Valizas">
        <img src="/assets/brand/sushi-valizas.webp" alt="" width="42" height="42" />
        <span>Sushi Valizas</span>
      </a>
      <nav class="nav" aria-label="Primary">
        ${NAV.map(
          (item) =>
            `<a href="${item.href}" data-i18n="${item.key}" ${item.page === page ? 'aria-current="page"' : ''}>${item.key}</a>`,
        ).join('')}
      </nav>
      <div class="header-actions">
        <div class="lang-switch" role="group" aria-label="Language">
          <button type="button" data-lang="es" aria-pressed="false">ES</button>
          <button type="button" data-lang="en" aria-pressed="false">EN</button>
          <button type="button" data-lang="pt" aria-pressed="false">PT</button>
        </div>
        <button type="button" class="icon-btn" data-theme-toggle aria-pressed="false" aria-label="Theme" title="Theme">◐</button>
        <button type="button" class="icon-btn nav-toggle" data-nav-toggle aria-label="Menu">☰</button>
      </div>
    </div>
  `

  footer.innerHTML = `
    <div class="container footer-inner">
      <span data-i18n="footer.by">By Valizas Hostel · Barra de Valizas, Rocha, Uruguay</span>
      <span data-i18n="footer.rights">Sushi Valizas</span>
    </div>
  `

  // Mobile-only sticky action bar (CSS hides it on desktop)
  if (!document.querySelector('.mobile-bar')) {
    const bar = document.createElement('div')
    bar.className = 'mobile-bar'
    bar.setAttribute('aria-label', 'Acciones rápidas')
    bar.innerHTML = `
      <a class="mobile-bar-btn mobile-bar-btn--wa" data-cta="takeaway" href="#" target="_blank" rel="noopener noreferrer">
        <span aria-hidden="true">💬</span><span data-i18n="bar.order">Pedí take away</span>
      </a>
      <button type="button" class="mobile-bar-btn mobile-bar-btn--cart" data-cart-open>
        <span aria-hidden="true">🛒</span><span data-i18n="bar.cart">Carrito</span><span class="mobile-bar-total" data-bar-total hidden></span>
      </button>
    `
    document.body.appendChild(bar)
  }
}

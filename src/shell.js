const NAV = [
  { href: '/rocha', key: 'nav.local', page: 'rocha' },
  { href: '/menu', key: 'nav.menu', page: 'menu' },
  { href: '/fotos', key: 'nav.gallery', page: 'fotos' },
  { href: '/sushimen', key: 'nav.chef', page: 'sushimen' },
  { href: '/reservas', key: 'nav.reserve', page: 'reservas' },
  { href: '/contacto', key: 'nav.contact', page: 'contacto' },
]

export function mountShell() {
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
}

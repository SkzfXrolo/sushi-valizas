import { SITE, MENU, DRINKS, waLink } from './config.js'
import { applyI18n, getLang, setLang, t } from './i18n.js'
import { initTheme, toggleTheme } from './theme.js'
import { mountShell } from './shell.js'
import { initCarousels, initReveal, initFloaties, revealFresh } from './motion.js'
import { initCartSystem, initReserveForm } from './order.js'
import './style.css'

function money(n) {
  return `$${n}`
}

function renderMenu() {
  const lang = getLang()
  const comboGrid = document.getElementById('combo-grid')
  const rollGrid = document.getElementById('roll-grid')
  if (!comboGrid || !rollGrid) return

  const comboColors = ['coral', 'mango', 'wasabi']
  comboGrid.innerHTML = MENU.combos
    .map(
      (c, i) => `
      <article class="combo-card combo-card--${comboColors[i % comboColors.length]} reveal" style="--delay:${i * 100}ms">
        <img class="menu-thumb" src="${c.img}" alt="${t('menu.comboOf', { n: c.pieces })}" loading="lazy" />
        <span class="combo-pieces">${t('menu.comboPieces', { n: c.pieces })}${c.flavors ? ` · ${c.flavors === 1 ? t('menu.comboFlavor1') : t('menu.comboFlavors', { n: c.flavors })}` : ''}</span>
        <strong>${t('menu.comboOf', { n: c.pieces })}</strong>
        <span class="price">${money(c.price)}</span>
        <button type="button" class="btn btn-primary btn-sm" data-add-cart
          data-id="combo-${c.pieces}" data-name="Combinado de ${c.pieces}" data-price="${c.price}">
          ${t('cart.add')}
        </button>
      </article>`,
    )
    .join('')

  const accents = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']
  rollGrid.innerHTML = MENU.rolls
    .map((r, i) => {
      const desc = r.desc[lang] || r.desc.es
      return `
      <article class="roll-card roll-card--${accents[i % accents.length]} reveal" style="--delay:${(i % 6) * 70}ms">
        <img class="menu-thumb" src="${r.img}" alt="${r.name}" loading="lazy" />
        <div class="roll-card-top">
          <strong>${r.name}</strong>
          <span class="roll-price">${money(MENU.rollPrice)}</span>
        </div>
        <p>${desc}</p>
        <button type="button" class="btn btn-ghost btn-sm" data-add-cart
          data-id="roll-${r.id}" data-name="${r.name}" data-price="${MENU.rollPrice}">
          ${t('cart.add')}
        </button>
      </article>`
    })
    .join('')

  revealFresh(comboGrid)
  revealFresh(rollGrid)
  renderDrinks()
}

function renderDrinks() {
  const host = document.getElementById('drink-list')
  if (!host) return
  const lang = getLang()
  const titles = { jugos: t('menu.drinkJugos'), soft: t('menu.drinkSoft') }
  const byGroup = {}
  for (const d of DRINKS) (byGroup[d.group] ||= []).push(d)
  host.innerHTML = Object.entries(byGroup)
    .map(
      ([g, items]) => `
      <div class="drink-group reveal">
        <h3>${titles[g] || g}</h3>
        <ul>
          ${items
            .map((d) => {
              const nm = typeof d.name === 'string' ? d.name : d.name[lang] || d.name.es
              const note = d.note ? `<span class="drink-note">${d.note[lang] || d.note.es}</span>` : ''
              const thumb = d.img ? `<img class="drink-thumb" src="${d.img}" alt="${nm}" loading="lazy" />` : ''
              return `<li class="drink-row${d.img ? ' drink-row--img' : ''}">
                ${thumb}
                <span class="drink-name">${nm}${note}</span>
                <span class="drink-price">${money(d.price)}</span>
                <button type="button" class="btn btn-ghost btn-sm" data-add-cart
                  data-id="drink-${d.id}" data-name="${nm}" data-price="${d.price}">${t('cart.add')}</button>
              </li>`
            })
            .join('')}
        </ul>
      </div>`,
    )
    .join('')
  revealFresh(host)
}

function wireLinks() {
  const reserveMsg = {
    es: 'Hola! Quiero reservar mesa en Sushi Valizas.',
    en: 'Hi! I want to reserve a table at Sushi Valizas.',
    pt: 'Olá! Quero reservar mesa no Sushi Valizas.',
  }
  const takeawayMsg = {
    es: 'Hola! Quiero pedir take away en Sushi Valizas.',
    en: 'Hi! I want to order takeaway from Sushi Valizas.',
    pt: 'Olá! Quero pedir take away no Sushi Valizas.',
  }
  const lang = getLang()
  const reserveHref = waLink(reserveMsg[lang] || reserveMsg.es)
  const takeawayBase = takeawayMsg[lang] || takeawayMsg.es

  document.querySelectorAll('[data-cta="reserve"]').forEach((a) => {
    a.href = reserveHref
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
  })

  document.querySelectorAll('[data-cta="takeaway"], [data-cta="catalog"]').forEach((a) => {
    const order = a.getAttribute('data-order')
    const msg = order ? `${takeawayBase} Pedido: ${order}.` : takeawayBase
    a.href = waLink(msg)
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
  })

  document.querySelectorAll('[data-cta="ig"]').forEach((a) => {
    a.href = SITE.instagram
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
  })
  document.querySelectorAll('[data-cta="hostel"]').forEach((a) => {
    a.href = SITE.hostelUrl
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
  })

  const phoneLink = document.querySelector('[data-phone-link]')
  const phonePending = document.querySelector('[data-phone-pending]')
  if (SITE.phoneTel && SITE.phoneDisplay && phoneLink) {
    phoneLink.href = `tel:${SITE.phoneTel}`
    phoneLink.textContent = SITE.phoneDisplay
    phoneLink.hidden = false
    if (phonePending) phonePending.hidden = true
  } else if (phoneLink) {
    phoneLink.hidden = true
    if (phonePending) {
      phonePending.hidden = false
      phonePending.textContent = t('contact.phonePending')
    }
  }
}

function wireControls() {
  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setLang(btn.getAttribute('data-lang'))
      renderMenu()
      wireLinks()
    })
  })
  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => toggleTheme())
  })
  document.querySelectorAll('[data-nav-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.body.classList.toggle('nav-open')
    })
  })
  document.querySelectorAll('.nav a').forEach((a) => {
    a.addEventListener('click', () => document.body.classList.remove('nav-open'))
  })
}

initTheme()
mountShell()
document.documentElement.lang = getLang()
applyI18n()
renderMenu()
wireLinks()
wireControls()
initCarousels()
initReveal()
initFloaties()
initCartSystem()
initReserveForm()
applyI18n()

window.addEventListener('sushi:lang', () => {
  applyI18n()
  renderMenu()
  wireLinks()
})

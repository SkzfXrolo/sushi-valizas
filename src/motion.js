const DISHES = [
  { src: '/assets/gallery/live-01.webp', alt: 'Combinado Sushi Valizas' },
  { src: '/assets/gallery/live-02.webp', alt: 'Rolls con salsa' },
  { src: '/assets/gallery/live-03.webp', alt: 'Combinado en pizarra' },
  { src: '/assets/gallery/live-04.webp', alt: 'Hot rolls' },
  { src: '/assets/gallery/plato-01.webp', alt: 'Sushi de autor' },
]

export function initCarousels() {
  document.querySelectorAll('[data-carousel]').forEach((root) => {
    const track = root.querySelector('[data-carousel-track]')
    const dots = root.querySelector('[data-carousel-dots]')
    const prev = root.querySelector('[data-carousel-prev]')
    const next = root.querySelector('[data-carousel-next]')
    if (!track) return

    if (!track.children.length) {
      track.innerHTML = DISHES.map(
        (d) => `
        <figure class="carousel-slide">
          <img src="${d.src}" alt="${d.alt}" loading="lazy" draggable="false" />
        </figure>`,
      ).join('')
    }

    const slides = [...track.children]
    let index = 0
    let timer

    if (dots) {
      dots.innerHTML = slides
        .map((_, i) => `<button type="button" class="carousel-dot" data-i="${i}" aria-label="Slide ${i + 1}"></button>`)
        .join('')
    }

    const go = (i) => {
      index = (i + slides.length) % slides.length
      track.style.transform = `translateX(-${index * 100}%)`
      dots?.querySelectorAll('.carousel-dot').forEach((d, di) => {
        d.classList.toggle('is-active', di === index)
      })
    }

    const play = () => {
      clearInterval(timer)
      timer = setInterval(() => go(index + 1), 3800)
    }

    prev?.addEventListener('click', () => {
      go(index - 1)
      play()
    })
    next?.addEventListener('click', () => {
      go(index + 1)
      play()
    })
    dots?.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-i]')
      if (!btn) return
      go(Number(btn.dataset.i))
      play()
    })

    root.addEventListener('pointerenter', () => clearInterval(timer))
    root.addEventListener('pointerleave', play)

    // swipe
    let startX = 0
    track.addEventListener(
      'pointerdown',
      (e) => {
        startX = e.clientX
      },
      { passive: true },
    )
    track.addEventListener(
      'pointerup',
      (e) => {
        const dx = e.clientX - startX
        if (Math.abs(dx) < 40) return
        go(index + (dx < 0 ? 1 : -1))
        play()
      },
      { passive: true },
    )

    go(0)
    play()
  })
}

export function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-stagger > *')
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'))
    return
  }

  // stagger children
  document.querySelectorAll('.reveal-stagger').forEach((group) => {
    ;[...group.children].forEach((child, i) => {
      child.classList.add('reveal')
      child.style.setProperty('--delay', `${i * 80}ms`)
    })
  })

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return
        e.target.classList.add('is-in')
        io.unobserve(e.target)
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  )

  document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
}

export function initFloaties() {
  document.querySelectorAll('[data-parallax]').forEach((el) => {
    const speed = Number(el.dataset.parallax) || 0.15
    const onScroll = () => {
      const y = window.scrollY * speed
      el.style.transform = `translate3d(0, ${y}px, 0)`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
  })
}

/** Re-run reveal after dynamic menu inject */
export function revealFresh(root = document) {
  const els = root.querySelectorAll('.reveal:not(.is-in)')
  if (!els.length) return
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'))
    return
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return
        e.target.classList.add('is-in')
        io.unobserve(e.target)
      })
    },
    { threshold: 0.08 },
  )
  els.forEach((el) => io.observe(el))
}

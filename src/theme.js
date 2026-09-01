const THEME_KEY = 'sushi-valizas-theme'

export function getTheme() {
  const saved = localStorage.getItem(THEME_KEY)
  if (saved === 'night' || saved === 'day') return saved
  return 'day'
}

export function setTheme(theme) {
  const next = theme === 'night' ? 'night' : 'day'
  localStorage.setItem(THEME_KEY, next)
  document.documentElement.dataset.theme = next
  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(next === 'night'))
  })
}

export function toggleTheme() {
  setTheme(getTheme() === 'night' ? 'day' : 'night')
}

export function initTheme() {
  setTheme(getTheme())
}

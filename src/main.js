import './style.css'
import { getLang, setLang, applyI18n, pick } from './i18n.js'
import { content } from './data/content.js'
import { buildSlider, playVideo } from './video-slider.js'
import { initReveal } from './reveal.js'

function markActiveLang() {
  const lang = getLang()
  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.lang === lang)
  })
}

function initLangToggle() {
  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setLang(btn.dataset.lang)
      applyI18n()
      renderContent()
      markActiveLang()
    })
  })
}

function initSmoothAnchors() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) return
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'))
      if (!target) return
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth' })
    })
  })
}

function setHtml(id, html) {
  const el = document.getElementById(id)
  if (!el) return
  el.innerHTML = html
}

function renderContent() {
  setHtml(
    'highlights',
    content.highlights
      .map((h) => `<li class="hl"><span class="hl__value">${h.value}</span><span class="hl__label">${pick(h.label)}</span></li>`)
      .join('')
  )

  setHtml(
    'timeline',
    content.timeline
      .map(
        (t) =>
          `<li class="tl"><span class="tl__period">${t.period}</span><div class="tl__body"><h4 class="tl__role">${pick(t.role)}</h4><p class="tl__detail">${pick(t.detail)}</p></div></li>`
      )
      .join('')
  )

  setHtml('skills', content.skills.map((s) => `<li class="chip">${pick(s)}</li>`).join(''))
  setHtml('education', content.education.map((e) => `<li class="edu__item">${pick(e)}</li>`).join(''))

  const c = content.contact
  setHtml(
    'booking-contact',
    `<a class="contact__item" href="mailto:${c.email}">${c.email}</a>` +
      `<a class="contact__item" href="tel:${c.phone.replace(/\s/g, '')}">${c.phone}</a>` +
      `<a class="contact__item" href="${c.instagramUrl}" target="_blank" rel="noopener">${c.instagram}</a>`
  )
}

function initVideoSlider() {
  const container = document.getElementById('video-slider')
  if (!container) return
  buildSlider(container, content.videos)
  container.addEventListener('click', (e) => {
    const button = e.target.closest('button[data-video-id]')
    if (!button) return
    playVideo(button)
  })
}

setLang(getLang())
applyI18n()
renderContent()
markActiveLang()
initLangToggle()
initSmoothAnchors()
initVideoSlider()

initReveal(document.querySelectorAll('.reveal'))

const yearEl = document.getElementById('footer-year')
if (yearEl) yearEl.textContent = String(new Date().getFullYear())

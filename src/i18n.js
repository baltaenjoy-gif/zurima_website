const STORAGE_KEY = 'zurima-lang'

export const strings = {
  es: {
    nav_booking: 'Booking',
    eyebrow: 'En escena',
    tagline: 'Vocalista & Bandleader',
    hero_stats: '1000+ shows · 400+ canciones · 5 géneros',
    cta_book: 'Contratar',
    scroll_cue: 'Bajá · empieza el show',
    about_kicker: 'Sobre mí',
    about_title: 'Una voz para cada escenario',
    about_bio:
      'Soy cantante y bandleader argentina, con más de cuatro años de experiencia en cruceros y un repertorio de 400 canciones. Cómoda tanto liderando como acompañando, me presenté en una amplia gama de estilos y escenarios —siempre con foco en la presencia, la consistencia, la musicalidad y la conexión.',
    about_quote: 'Mantener al equipo firme, manteniendo viva la música.',
    music_kicker: 'Mi música',
    music_title: 'Mirá y escuchá',
    editorial_caption: 'Pop · Rock · Latin · Soul · Ballroom',
    career_kicker: 'Trayectoria',
    career_title: 'Mil escenarios, una profesional',
    career_skills: 'Lo que llevo al escenario',
    career_education: 'Formación vocal',
    booking_kicker: 'Contrataciones',
    booking_lead: 'Disponible para cruceros, eventos, venues y residencias.',
    booking_email: 'Escribime',
    footer_role: 'Vocalista & Bandleader'
  },
  en: {
    nav_booking: 'Booking',
    eyebrow: 'Now appearing',
    tagline: 'Vocalist & Bandleader',
    hero_stats: '1000+ shows · 400+ songs · 5 genres',
    cta_book: 'Book now',
    scroll_cue: 'Scroll · the show begins',
    about_kicker: 'About',
    about_title: 'One voice for every stage',
    about_bio:
      "I'm an Argentinian singer and bandleader with over four years of cruise ship experience and a 400-song repertoire. Comfortable both leading and supporting, I've performed across a wide range of styles and settings — always with a focus on presence, consistency, musicality and connection.",
    about_quote: 'Keep the team grounded while keeping the music alive.',
    music_kicker: 'My music',
    music_title: 'Watch & listen',
    editorial_caption: 'Pop · Rock · Latin · Soul · Ballroom',
    career_kicker: 'Career',
    career_title: 'A thousand stages, one professional',
    career_skills: 'What I bring to the stage',
    career_education: 'Vocal training',
    booking_kicker: 'Booking',
    booking_lead: 'Available for cruises, events, venues and residencies.',
    booking_email: 'Get in touch',
    footer_role: 'Vocalist & Bandleader'
  }
}

export function getLang() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'es' || saved === 'en') return saved
  return 'es'
}

export function setLang(lang) {
  if (lang !== 'es' && lang !== 'en') return
  localStorage.setItem(STORAGE_KEY, lang)
  document.documentElement.lang = lang
}

export function pick(val) {
  if (typeof val === 'string') return val
  return val[getLang()]
}

export function applyI18n(root = document) {
  const lang = getLang()
  const dict = strings[lang]
  root.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n
    if (!dict[key]) return
    el.textContent = dict[key]
  })
}

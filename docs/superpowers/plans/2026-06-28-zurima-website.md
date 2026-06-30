# ZURIMA Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir el sitio one-page de presentación (EPK) de la cantante Zurima, concepto Headliner/Marquee, oscuro+oro, bilingüe ES/EN, con slider de videos de YouTube.

**Architecture:** Sitio estático con Vite. HTML semántico único + CSS con tokens (variables semánticas) + módulos JS vanilla (ES Modules) para i18n, slider de video con facade de YouTube y reveals con IntersectionObserver. Contenido estructurado en un módulo de datos. Sin backend en v1.

**Tech Stack:** HTML5, CSS3, JavaScript vanilla (ES Modules), Vite, Vitest (+ jsdom) para los módulos con lógica. Deploy estático (Vercel, lo conecta Baltasar aparte).

## Global Constraints

- Raíz del proyecto: `clientes/ZURIMA/`. **Nada fuera de ese árbol.**
- CSS: **solo variables semánticas**. Nunca colores ni tamaños hardcodeados.
- Early return; nunca anidar if/else. Nombres auto-descriptivos. Sin abstracciones prematuras.
- Posicionamiento: **VOZ al centro**. Nunca posicionar a Zurima como baterista/guitarrista.
- Paleta: `--bg #0D0D0D`, `--gold #EABD65`, `--gold-deep #CDA75B`, `--text #F2F0EC`, `--text-dim #8E8C88`. Nombre en gradiente oro `linear-gradient(135deg,#f3e71a,#e3a831 50%,#946714)`.
- Tipografía: Montserrat (nombre/títulos/body) + serif fina (Cormorant Garamond) solo para citas. Escala Major Third. Hero mobile nunca < `2rem`.
- Performance < 2s. Facade de YouTube (sin iframe hasta el click). `prefers-reduced-motion` respetado.
- Idioma por defecto ES; persistir en `localStorage`.
- Commits frecuentes, mensajes `feat(zurima): ...`, terminando con `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Fuente de contenido: `docs/superpowers/specs/2026-06-28-zurima-website-design.md` (§6 mapeo de contenido, §7 videos).

---

### Task 1: Scaffold Vite + tokens + esqueleto

**Files:**
- Create: `clientes/ZURIMA/package.json`
- Create: `clientes/ZURIMA/vite.config.js`
- Create: `clientes/ZURIMA/index.html`
- Create: `clientes/ZURIMA/src/style.css`
- Create: `clientes/ZURIMA/src/main.js`
- Create: `clientes/ZURIMA/.gitignore`

**Interfaces:**
- Produces: dev server funcional (`npm run dev`), `index.html` con `<main>` vacío, `style.css` con todos los tokens en `:root`.

- [ ] **Step 1: `package.json`** con deps `vite`, `vitest`, `jsdom`. Scripts: `dev`, `build`, `preview`, `test`.

```json
{
  "name": "zurima-website",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "devDependencies": {
    "vite": "^6.0.0",
    "vitest": "^2.0.0",
    "jsdom": "^25.0.0"
  }
}
```

- [ ] **Step 2: `.gitignore`** con `node_modules`, `dist`, `.vercel`, `*.local`.

- [ ] **Step 3: `vite.config.js`** con config de test (jsdom).

```js
import { defineConfig } from 'vite'

export default defineConfig({
  test: { environment: 'jsdom' }
})
```

- [ ] **Step 4: `src/style.css`** — bloque `:root` con TODOS los tokens del §3 del spec (color, tipografía, espaciado base 8px), reset mínimo, `body { background: var(--bg); color: var(--text); font-family: ... }`. Importar fuentes (Montserrat + Cormorant) vía `@import` de Google Fonts con `display=swap` (se optimiza en Task 12).

- [ ] **Step 5: `index.html`** — `<!doctype html>`, `<html lang="es">`, `<head>` con charset/viewport y `<title>` provisorio, `<body>` con `<main></main>` y `<script type="module" src="/src/main.js">`.

- [ ] **Step 6: `src/main.js`** — `import './style.css'` y un `console.log('zurima')` provisorio.

- [ ] **Step 7: Instalar y correr dev**

Run: `cd clientes/ZURIMA && npm install && npm run dev`
Expected: server en `http://localhost:5173`, fondo negro, sin errores en consola.

- [ ] **Step 8: Commit**

```bash
git add clientes/ZURIMA/package.json clientes/ZURIMA/vite.config.js clientes/ZURIMA/index.html clientes/ZURIMA/src clientes/ZURIMA/.gitignore
git commit -m "feat(zurima): scaffold vite + tokens css + esqueleto"
```

---

### Task 2: Datos estructurados de contenido

**Files:**
- Create: `clientes/ZURIMA/src/data/content.js`
- Test: `clientes/ZURIMA/src/data/content.test.js`

**Interfaces:**
- Produces: `export const content` con shape:
  - `videos`: array de `{ id, title }` (8 items, orden del §7, voz primero).
  - `timeline`: array de `{ period, role, detail }`.
  - `highlights`: array de `{ value, label }` (`1000+`/shows, `400+`/canciones, `5`/géneros).
  - `skills`: array de strings.
  - `education`: array de strings.
  - `contact`: `{ email, phone, instagram, instagramUrl }`.
  - `genres`: array de strings.

- [ ] **Step 1: Test de shape**

```js
import { describe, it, expect } from 'vitest'
import { content } from './content.js'

describe('content', () => {
  it('tiene 8 videos, voz primero', () => {
    expect(content.videos).toHaveLength(8)
    expect(content.videos[0].id).toBe('M5gabC4rIR4')
  })
  it('contacto completo', () => {
    expect(content.contact.email).toBe('Zurima.frers.musica@gmail.com')
    expect(content.contact.instagram).toBe('@zurima.frers')
  })
  it('highlights con 1000+ shows', () => {
    expect(content.highlights[0]).toEqual({ value: '1000+', label: 'shows' })
  })
})
```

- [ ] **Step 2: Run test → FAIL** (`Cannot find module './content.js'`).
Run: `cd clientes/ZURIMA && npx vitest run src/data/content.test.js`

- [ ] **Step 3: Crear `content.js`** con los datos exactos del spec §6 y §7. Videos en orden: `M5gabC4rIR4`, `bCa0MPL5k7Q`, `1CEi1C3M34E`, `tS5MwxHwPuE`, `xWdopPK94u0`, `ZJ1nnN_rZg0`, `1wciA-KslUs`, `tb4H4Qop4Go`. Contact: email `Zurima.frers.musica@gmail.com`, phone `+44 7385 619381`, instagram `@zurima.frers`, instagramUrl `https://instagram.com/zurima.frers`.

- [ ] **Step 4: Run test → PASS.**

- [ ] **Step 5: Commit**

```bash
git add clientes/ZURIMA/src/data/content.js clientes/ZURIMA/src/data/content.test.js
git commit -m "feat(zurima): datos estructurados de contenido"
```

---

### Task 3: i18n + toggle ES/EN

**Files:**
- Create: `clientes/ZURIMA/src/i18n.js`
- Test: `clientes/ZURIMA/src/i18n.test.js`

**Interfaces:**
- Consumes: nada.
- Produces:
  - `export const strings` = `{ es: {...}, en: {...} }` con claves para cada texto de UI (eyebrow, tagline, nombres de sección, CTAs, labels).
  - `export function getLang()` → lee `localStorage` o default `'es'`.
  - `export function setLang(lang)` → guarda en `localStorage`, setea `document.documentElement.lang`, y aplica textos a todos los `[data-i18n]` (cada nodo usa `el.dataset.i18n` como clave).
  - `export function applyI18n(root = document)` → aplica el idioma actual.

- [ ] **Step 1: Test**

```js
import { describe, it, expect, beforeEach } from 'vitest'
import { strings, getLang, setLang, applyI18n } from './i18n.js'

beforeEach(() => { localStorage.clear(); document.body.innerHTML = '' })

describe('i18n', () => {
  it('default es', () => { expect(getLang()).toBe('es') })
  it('persiste idioma', () => { setLang('en'); expect(getLang()).toBe('en') })
  it('aplica textos por data-i18n', () => {
    document.body.innerHTML = '<span data-i18n="cta_book"></span>'
    setLang('en'); applyI18n()
    expect(document.querySelector('span').textContent).toBe(strings.en.cta_book)
  })
})
```

- [ ] **Step 2: Run → FAIL.**
Run: `npx vitest run src/i18n.test.js`

- [ ] **Step 3: Implementar `i18n.js`** con `strings` (todas las claves ES/EN del copy del spec; bio y pull-quote incluidos) y las funciones. Early return. `setLang` aplica a `[data-i18n]`.

- [ ] **Step 4: Run → PASS.**

- [ ] **Step 5: Commit**

```bash
git add clientes/ZURIMA/src/i18n.js clientes/ZURIMA/src/i18n.test.js
git commit -m "feat(zurima): i18n es/en con toggle persistente"
```

---

### Task 4: Hero (oscuro, marquesina)

**Files:**
- Modify: `clientes/ZURIMA/index.html` (sección `#hero` dentro de `<main>`)
- Modify: `clientes/ZURIMA/src/style.css` (estilos hero + top bar)
- Modify: `clientes/ZURIMA/src/main.js` (cablear toggle ES/EN al click)
- Add asset: `clientes/ZURIMA/public/fotos/hero.jpg` (image7 optimizada; provisorio: copiar `fotos/image7.jpeg`)

**Interfaces:**
- Consumes: `i18n.js` (`setLang`, `applyI18n`, `getLang`).

- [ ] **Step 1: HTML del hero.** Top bar: wordmark `ZURIMA`, toggle con dos botones `data-lang="es"`/`data-lang="en"`, link `#booking` con `data-i18n="nav_booking"`. Hero: eyebrow `data-i18n="eyebrow"` (NOW APPEARING), `<h1 class="marquee">ZURIMA</h1>`, tagline `data-i18n="tagline"` (VOCALIST & BANDLEADER), línea stats, CTA `<a href="#booking" data-i18n="cta_book">`. Retrato `<img>` de `public/fotos/hero.jpg` con `alt` descriptivo. Indicador de scroll.

- [ ] **Step 2: CSS hero.** Layout 2 columnas (texto izq / foto der), full viewport. `.marquee` con `background: var(--gold-grad); -webkit-background-clip: text; color: transparent;`. Glow radial de oro arriba-derecha (pseudo-elemento). Foto fundida al negro por la izquierda (`mask-image: linear-gradient(to right, transparent, #000 30%)`). Hero `h1` `clamp(2.5rem,9vw,5rem)`, mobile ≥ 2rem. Responsive: en mobile la foto pasa a fondo con overlay oscuro y el texto encima.

- [ ] **Step 3: main.js — cablear toggle.** Al click en `[data-lang]`: `setLang(lang); applyI18n()`. En load: `applyI18n()` y marcar botón activo. Early return si no hay target.

- [ ] **Step 4: Verificación visual.**
Run: `npm run dev`
Expected: hero oscuro, nombre en oro, foto a la derecha fundida al negro, toggle ES/EN cambia textos sin recargar, sin scroll horizontal en mobile (DevTools 390px).

- [ ] **Step 5: Commit**

```bash
git add clientes/ZURIMA/index.html clientes/ZURIMA/src/style.css clientes/ZURIMA/src/main.js clientes/ZURIMA/public/fotos/hero.jpg
git commit -m "feat(zurima): hero oscuro marquesina + toggle es/en"
```

---

### Task 5: Sección Sobre mí

**Files:**
- Modify: `index.html` (`#sobre-mi`), `src/style.css`
- Add asset: `public/fotos/retrato.jpg` (image3 optimizada)

- [ ] **Step 1: HTML.** `<section id="sobre-mi">` con `<h2 data-i18n="about_title">`, párrafo bio `data-i18n="about_bio"`, `<blockquote class="pull-quote" data-i18n="about_quote">` (serif), `<img>` retrato con alt.

- [ ] **Step 2: CSS.** Grid texto+retrato, mucho aire. `.pull-quote` en Cormorant, tamaño lead, color `--gold-deep`, con comilla decorativa. Responsive: stack en mobile.

- [ ] **Step 3: Verificación visual.** `npm run dev` → bio legible, cita en serif, retrato integrado, escaneable.

- [ ] **Step 4: Commit**

```bash
git add clientes/ZURIMA/index.html clientes/ZURIMA/src/style.css clientes/ZURIMA/public/fotos/retrato.jpg
git commit -m "feat(zurima): seccion sobre mi con pull-quote"
```

---

### Task 6: Banda editorial (image18)

**Files:**
- Modify: `index.html` (`.editorial-band` entre Sobre mí y Mi música), `src/style.css`
- Add asset: `public/fotos/editorial.jpg` (image18 optimizada)

- [ ] **Step 1: HTML.** `<section class="editorial-band">` con `<img>` image18 a sangre completa (`alt` descriptivo). Opcional: una frase corta superpuesta `data-i18n="editorial_caption"`.

- [ ] **Step 2: CSS.** Full-bleed (`width:100vw`), `object-fit: cover`, altura controlada (`clamp(40vh,50vw,70vh)`). La foto va sobre su propio blanco (contraste deliberado). Sin recortar.

- [ ] **Step 3: Verificación visual.** Banda blanca a sangre que corta el negro, sin overflow horizontal.

- [ ] **Step 4: Commit**

```bash
git add clientes/ZURIMA/index.html clientes/ZURIMA/src/style.css clientes/ZURIMA/public/fotos/editorial.jpg
git commit -m "feat(zurima): banda editorial full-bleed"
```

---

### Task 7: Mi música — slider con facade de YouTube

**Files:**
- Create: `clientes/ZURIMA/src/video-slider.js`
- Test: `clientes/ZURIMA/src/video-slider.test.js`
- Modify: `index.html` (`#musica`), `src/style.css`, `src/main.js` (init slider)

**Interfaces:**
- Consumes: `content.videos`.
- Produces:
  - `export function thumbUrl(id)` → `https://img.youtube.com/vi/${id}/maxresdefault.jpg`.
  - `export function buildSlider(container, videos)` → renderiza miniaturas (button con `data-video-id`, `<img>` thumb, título, ícono play). No inyecta iframes.
  - `export function playVideo(button)` → reemplaza la miniatura del button por un `<iframe>` de `https://www.youtube.com/embed/${id}?autoplay=1` (facade). Early return si ya tiene iframe.

- [ ] **Step 1: Test**

```js
import { describe, it, expect, beforeEach } from 'vitest'
import { thumbUrl, buildSlider, playVideo } from './video-slider.js'

const videos = [{ id: 'M5gabC4rIR4', title: 'Cantando' }, { id: 'bCa0MPL5k7Q', title: 'Minotaura' }]

beforeEach(() => { document.body.innerHTML = '<div id="s"></div>' })

describe('video-slider', () => {
  it('thumbUrl', () => {
    expect(thumbUrl('abc')).toBe('https://img.youtube.com/vi/abc/maxresdefault.jpg')
  })
  it('buildSlider crea botones sin iframe', () => {
    buildSlider(document.getElementById('s'), videos)
    expect(document.querySelectorAll('button[data-video-id]')).toHaveLength(2)
    expect(document.querySelector('iframe')).toBeNull()
  })
  it('playVideo inyecta iframe', () => {
    buildSlider(document.getElementById('s'), videos)
    const btn = document.querySelector('button[data-video-id]')
    playVideo(btn)
    expect(btn.querySelector('iframe').src).toContain('youtube.com/embed/M5gabC4rIR4')
  })
})
```

- [ ] **Step 2: Run → FAIL.** `npx vitest run src/video-slider.test.js`

- [ ] **Step 3: Implementar `video-slider.js`.** Early return en `playVideo` si `button.querySelector('iframe')`. `loading="lazy"` en thumbs.

- [ ] **Step 4: Run → PASS.**

- [ ] **Step 5: HTML+CSS+init.** `<section id="musica">` con `<h2 data-i18n="music_title">` y `<div class="slider">`. CSS: scroll horizontal con snap (`scroll-snap-type`), miniaturas con `aspect-ratio:16/9`, ring de oro y scale en hover/activa, ícono play en oro. `main.js`: `buildSlider(...)` + listener delegado que llama `playVideo`.

- [ ] **Step 6: Verificación visual.** Miniaturas cargan, click reproduce inline, scroll/snap ok en mobile.

- [ ] **Step 7: Commit**

```bash
git add clientes/ZURIMA/src/video-slider.js clientes/ZURIMA/src/video-slider.test.js clientes/ZURIMA/index.html clientes/ZURIMA/src/style.css clientes/ZURIMA/src/main.js
git commit -m "feat(zurima): slider de musica con facade youtube"
```

---

### Task 8: Trayectoria (timeline + highlights + skills + formación)

**Files:**
- Modify: `index.html` (`#trayectoria`), `src/style.css`, `src/main.js` (render desde `content`)
- Add assets: `public/fotos/live1.jpg` (image16), `public/fotos/live2.jpg` (image9)

**Interfaces:**
- Consumes: `content.timeline`, `content.highlights`, `content.skills`, `content.education`.

- [ ] **Step 1: HTML+render.** `<section id="trayectoria">` con `<h2 data-i18n="career_title">`. `main.js` renderiza: fila de highlights (números grandes en oro + label), lista timeline (period/role/detail), skills (chips), educación (lista). Fotos en vivo (image16, image9) intercaladas con alt.

- [ ] **Step 2: CSS.** Highlights con número en `--gold` escala display. Timeline con línea/borde de oro sutil (`--line`). Chips de skills con borde oro. Responsive stack.

- [ ] **Step 3: Verificación visual.** Números en oro, timeline legible, fotos en vivo integradas, escaneable.

- [ ] **Step 4: Commit**

```bash
git add clientes/ZURIMA/index.html clientes/ZURIMA/src/style.css clientes/ZURIMA/src/main.js clientes/ZURIMA/public/fotos/live1.jpg clientes/ZURIMA/public/fotos/live2.jpg
git commit -m "feat(zurima): seccion trayectoria con highlights y timeline"
```

---

### Task 9: Booking / Contacto + footer

**Files:**
- Modify: `index.html` (`#booking`, `<footer>`), `src/style.css`, `src/main.js` (render contacto)

**Interfaces:**
- Consumes: `content.contact`.

- [ ] **Step 1: HTML.** `<section id="booking">` con marquesina `BOOK ZURIMA` (clase `.marquee`), CTA `mailto:` con el email, teléfono como `tel:`, link IG. Todo en **texto plano** (para SEO/GEO). `<footer>` con nombre, año, créditos.

- [ ] **Step 2: CSS.** Sección con leve glow de oro (CTA "iluminado"). Botones con padding correcto (`py-2.5 px-6 sm:py-4 sm:px-10` equivalente en CSS). 

- [ ] **Step 3: Verificación visual.** Email/teléfono/IG clickeables y en texto plano, CTA destacado.

- [ ] **Step 4: Commit**

```bash
git add clientes/ZURIMA/index.html clientes/ZURIMA/src/style.css clientes/ZURIMA/src/main.js
git commit -m "feat(zurima): seccion booking + footer"
```

---

### Task 10: Reveals con IntersectionObserver

**Files:**
- Create: `clientes/ZURIMA/src/reveal.js`
- Test: `clientes/ZURIMA/src/reveal.test.js`
- Modify: `src/main.js`, `src/style.css`

**Interfaces:**
- Produces: `export function initReveal(els)` → agrega clase `is-visible` cuando el elemento entra en viewport; respeta `prefers-reduced-motion` (si reduce, marca visible inmediatamente, early return sin observer).

- [ ] **Step 1: Test** (mock de IntersectionObserver en jsdom).

```js
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { initReveal } from './reveal.js'

beforeEach(() => {
  document.body.innerHTML = '<div class="reveal"></div>'
  global.IntersectionObserver = class {
    constructor(cb){ this.cb = cb }
    observe(el){ this.cb([{ target: el, isIntersecting: true }]) }
    disconnect(){}
  }
})

describe('reveal', () => {
  it('marca is-visible al intersectar', () => {
    initReveal(document.querySelectorAll('.reveal'))
    expect(document.querySelector('.reveal').classList.contains('is-visible')).toBe(true)
  })
})
```

- [ ] **Step 2: Run → FAIL.** `npx vitest run src/reveal.test.js`

- [ ] **Step 3: Implementar `reveal.js`.** Early return con `matchMedia('(prefers-reduced-motion: reduce)')`.

- [ ] **Step 4: Run → PASS.**

- [ ] **Step 5: CSS + wiring.** Clase `.reveal { opacity:0; transform: translateY(16px); transition: ... }` y `.is-visible { opacity:1; transform:none }`. En `main.js`, `initReveal(document.querySelectorAll('.reveal'))`. Agregar clase `reveal` a títulos/bloques de cada sección.

- [ ] **Step 6: Verificación visual.** Secciones aparecen al scrollear; con reduce-motion activo, todo visible sin animación.

- [ ] **Step 7: Commit**

```bash
git add clientes/ZURIMA/src/reveal.js clientes/ZURIMA/src/reveal.test.js clientes/ZURIMA/src/main.js clientes/ZURIMA/src/style.css clientes/ZURIMA/index.html
git commit -m "feat(zurima): reveals con intersection observer"
```

---

### Task 11: SEO / GEO

**Files:**
- Modify: `index.html` (`<head>` meta + JSON-LD)
- Create: `clientes/ZURIMA/public/robots.txt`
- Create: `clientes/ZURIMA/public/sitemap.xml`
- Create: `clientes/ZURIMA/public/og-image.jpg` (retrato hero recortado a 1200×630)

- [ ] **Step 1: Meta.** `<title>` y `<meta name="description">` (ES; el toggle no cambia meta en v1). Open Graph (`og:title/description/image/type/url`) y Twitter card. `<link rel="canonical">`.

- [ ] **Step 2: JSON-LD.** Script `application/ld+json` con `MusicGroup`/`Person` (name Zurima, jobTitle Singer & Bandleader, knowsLanguage es/en/it, sameAs IG) y un `VideoObject` por cada video del slider (name + embedUrl + thumbnailUrl). Contacto en texto plano ya está en Task 9.

- [ ] **Step 3: robots.txt + sitemap.xml** (una URL: home). Placeholder de dominio `https://zurima.example` documentado para reemplazar cuando Baltasar defina dominio.

- [ ] **Step 4: Verificación.** `npm run build && npm run preview`; validar JSON-LD en Rich Results Test (manual). Headings: un solo `h1`.

- [ ] **Step 5: Commit**

```bash
git add clientes/ZURIMA/index.html clientes/ZURIMA/public/robots.txt clientes/ZURIMA/public/sitemap.xml clientes/ZURIMA/public/og-image.jpg
git commit -m "feat(zurima): seo/geo meta + json-ld + sitemap"
```

---

### Task 12: Optimización de imágenes + performance

**Files:**
- Modify: assets en `public/fotos/` (reexport a tamaños reales + WebP)
- Modify: `index.html` (`srcset`/`sizes`, `loading`, `decoding`), `src/style.css` (fuentes self-host o subset)

- [ ] **Step 1: Optimizar.** Reexportar las fotos usadas a ancho real del layout (hero ~1400w, retrato ~900w, editorial ~1600w, live ~800w, thumbs los sirve YouTube). Generar WebP. `<img>` con `srcset`+`sizes`, `loading="lazy"` bajo el fold, `decoding="async"`, `width`/`height` para evitar CLS.

- [ ] **Step 2: Fuentes.** Subset Montserrat (400/500/600/700) + Cormorant (400/600), `font-display: swap`, preconnect/preload del woff2 crítico.

- [ ] **Step 3: Verificación.** `npm run build`; PageSpeed Insights (mobile) → objetivo < 2s / LCP bajo. Sin CSS/JS muerto.

- [ ] **Step 4: Commit**

```bash
git add clientes/ZURIMA/public/fotos clientes/ZURIMA/index.html clientes/ZURIMA/src/style.css
git commit -m "feat(zurima): optimizacion de imagenes y fuentes"
```

---

### Task 13: Auditoría responsive + crítica visual

**Files:**
- Modify: `src/style.css` (fixes que surjan)

- [ ] **Step 1: Responsive audit.** Probar 390 / 768 / 1024 / 1440px. Sin overflow horizontal; hero h1 ≥ 2rem en mobile; tap targets ≥ 44px; slider usable con touch.

- [ ] **Step 2: Crítica visual.** Usar skill `visual-critique` (composición, tipografía, jerarquía, brand-consistency) sobre el build. Aplicar fixes priorizados.

- [ ] **Step 3: Verificación final.** `npm run build && npm run preview`; recorrido completo ES y EN; todos los videos abren; contacto correcto.

- [ ] **Step 4: Commit**

```bash
git add clientes/ZURIMA/src/style.css
git commit -m "feat(zurima): fixes responsive y de critica visual"
```

---

## Notas de ejecución

- Los assets en `public/fotos/` arrancan como copia de `fotos/imageN.jpeg` y se optimizan en Task 12. Mapeo: hero=image7, retrato=image3, editorial=image18, live1=image16, live2=image9.
- Pendiente externo (no bloquea el plan): dominio real, repo GitHub y proyecto Vercel — los crea Baltasar aparte. El deploy no es parte de este plan.
- Validar orden de videos con la artista antes de cierre (decisión de producto, no de código).

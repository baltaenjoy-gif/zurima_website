# ZURIMA — Sitio web · Diseño (spec)

Fecha: 2026-06-28
Cliente: ZURIMA (`clientes/ZURIMA/`)
Tipo: carpeta de presentación para contrataciones (EPK) de artista musical.

---

## 1. Posicionamiento (vital)

Zurima es **cantante / vocalista y bandleader**. Ese es el producto y el trabajo que busca (+1000 shows como cantante, cruceros Celebrity/MSC, venues). Es multiinstrumentista —batería (su origen) y guitarra— pero **NO busca trabajos de instrumentista**. Esas habilidades son credenciales que suman, nunca el titular.

**Regla transversal:** en hero, tagline, orden de videos y copy, la **VOZ va al centro**. Los videos lideran con canto, no con batería.

## 2. Concepto de arte

**Headliner / Marquee.** El sitio presenta a Zurima como la atracción principal de una cartelera de show en vivo —el mundo del entretenimiento en el que ya trabaja (cruceros, salones, venues)—. El nombre es la marquesina, en oro encendido sobre negro. La voz es la estrella.

- **Aguja art↔booking: 50/50.** Hero artístico potente; cada sección entrega info directa y escaneable. Arte en la piel, claridad en el hueso.
- **Tono:** performer versátil 24/7 — energía, rango, profesionalismo. *Lee el público y se adapta. Nunca falla en el escenario.*
- **Tipografía:** moderno luxe (atemporal, no vintage).

## 3. Sistema visual

### Color (variables semánticas — nunca hardcodear)
| Token | Valor | Uso |
|-------|-------|-----|
| `--bg` | `#0D0D0D` (Raisin Black) | fondo base de todo el sitio |
| `--bg-elev` | `#161513` | superficies elevadas / cards |
| `--gold` | `#EABD65` (Golden Amber) | acento principal, highlights |
| `--gold-deep` | `#CDA75B` (Apache Gold) | acento secundario |
| `--gold-grad` | `linear-gradient(135deg,#f3e71a,#e3a831 50%,#946714)` | nombre/marquesina (logo opción 1) |
| `--gold-soft` | `linear-gradient(135deg,#dfba6b,#b38b43)` | detalles oro viejo (logo opción 3) |
| `--text` | `#F2F0EC` | texto principal sobre negro |
| `--text-dim` | `#8E8C88` (Atlantic Grey) | texto secundario |
| `--line` | `rgba(234,189,101,.18)` | divisores / bordes sutiles |

Logo: tres variantes según fondo (definidas en `logo/logo html.txt`). Como el sitio es oscuro, se usa **opción 1 (oro degradado)** para el nombre y **opción 3 (oro viejo)** para detalles. Opción 2 (negro) queda sin uso salvo footer claro futuro.

### Tipografía — escala Major Third (×1.25), base 16px
- **Display / nombre / títulos:** Montserrat (mayúsculas, `letter-spacing` amplio).
- **Citas / editorial:** una serif refinada (Cormorant Garamond o Playfair Display) solo para pull-quotes.
- **Body:** Montserrat 400.
- Jerarquía: Hero `clamp(2.5rem,9vw,5rem)` · H2 `2.44rem` · lead `1.25rem` · body `1rem` · caption `.8rem`. Mobile: hero nunca < `2rem`.

### Espaciado / grilla
- Base 8px. Grilla de 12 columnas, contenedor máx ~1200px, gutters generosos (mucho aire = luxe).
- Reglas de composición del CLAUDE.md (fit-before-build, encuadre simétrico, nunca `scale()` para encajar).

### Movimiento (contenido, no decoración; respeta `prefers-reduced-motion`)
- Reveals por sección: fade + translateY corto al entrar en viewport (IntersectionObserver).
- Marquesina: el nombre en oro con un brillo/shimmer muy sutil al cargar (una sola pasada, no loop molesto).
- Subrayado de oro que se dibuja en hover de links/CTA.
- Miniaturas de video: leve scale + ring de oro al hover/activa.
- Transiciones suaves (200–400ms, easing natural).

## 4. Hero (Ruta 2 — oscuro)

- Fondo negro. Glow de oro sutil arriba-derecha (luz de escenario).
- **Retrato sobre fondo oscuro: image7** (top de plumas, mirada intensa, fondo gris que funde a negro). Alternativa: image3. Se ubica a la derecha, fundido al negro por el borde izquierdo.
- Columna izquierda: eyebrow `NOW APPEARING` (oro) · **ZURIMA** grande en `--gold-grad` · tagline `VOCALIST & BANDLEADER` · línea `1000+ shows · 400+ canciones` · CTA `CONTRATAR / BOOK` (borde oro).
- Top bar: wordmark ZURIMA · toggle `ES / EN` · link `BOOKING`.
- Señal de scroll.
- **image18** (acostada con guitarra, fondo blanco) NO va en hero (no recorta sobre negro). Se usa como **banda editorial a sangre** entre secciones, sobre su propio blanco, como respiro de contraste.

## 5. Estructura (single-page, scroll, bilingüe ES/EN)

1. **Hero** — descrito arriba.
2. **Sobre mí** — bio del CV en tipo editorial grande + pull-quote serif (*"...keep the team grounded while keeping the music alive"*). Retrato de apoyo (image3 si image7 fue al hero).
3. *(banda editorial image18 a sangre)*
4. **Mi música** — slider de videos (ver §7).
5. **Trayectoria** — timeline de experiencia + highlights numéricos en oro + skills + formación. Fotos en vivo (image16 cantando, image9). Ver §6.
6. **Booking / Contacto** — marquesina `BOOK ZURIMA` · email · teléfono · IG · CTA. Footer.

## 6. Mapeo de contenido (desde `docs/Reese.pdf.pdf`)

- **Hero tagline:** Vocalist & Bandleader · 1000+ shows · 400+ song repertoire.
- **Sobre mí (bio):** "Cantante argentina y bandleader, +4 años de experiencia en cruceros y repertorio de 400 canciones. Cómoda liderando o acompañando, en una amplia gama de estilos y escenarios, con foco en presencia, consistencia, musicalidad y conexión. Liderazgo musical bajo presión." Pull-quote: *"...keep the team grounded while keeping the music alive."*
- **Trayectoria (timeline):**
  - 2023–2025 · Lead Singer & Band Leader — Celebrity Cruises (Magnifica). Dirección musical, repertorio, diseño de show, liderazgo escénico.
  - 2019–2023 · Vocalist, Drummer & Band Leader — Celebrity Cruises. Voz líder; dirección musical y coordinación del equipo.
  - 2007–2019 · Session Drummer & Vocalist — Buenos Aires (Teatro San Martín, Vorterix, clubes).
  - 2015–2017 · Dúo vocal bilingüe — eventos privados y venues íntimos.
- **Highlights (números grandes oro):** 1000+ shows · 400+ canciones · 5 géneros (Pop, Rock, Latin, Soul, Ballroom).
- **Skills:** lectura de público y adaptación en tiempo real · presencia escénica y conexión · arreglo vocal · batería (avanzado), guitarra (intermedio) · inglés fluido, italiano básico.
- **Formación vocal:** Ana Carfi (lírico), Mercedes Bassi (técnica), estudio privado desde 2012 (Bel Canto, Feldenkrais, Speech Level).
- **Contacto:** Zurima.frers.musica@gmail.com · +44 7385 619381 · IG @zurima.frers.

> Bio/skills se priorizan hacia el rol de **cantante**; batería/guitarra aparecen como "multiinstrumentista", no como oferta principal.

## 7. Slider de videos (Mi música)

- Embebidos de YouTube con **facade**: se muestra la miniatura (`https://img.youtube.com/vi/<ID>/maxresdefault.jpg`); el iframe de YouTube se inyecta **solo al click** (performance).
- Slider horizontal de miniaturas; click → reproduce inline (swap de miniatura por iframe, o modal).
- **Orden (liderando la voz; pendiente de validar con la artista):**
  1. Cantando full show — `M5gabC4rIR4`
  2. MINOTAURA / Prendido Fuego Voy (oficial en vivo) — `bCa0MPL5k7Q`
  3. Drums & Vocals on board — `1CEi1C3M34E`
  4. Moves like Jagger — `tS5MwxHwPuE`
  5. Drive My Car (Beatles, drum cam) — `xWdopPK94u0`
  6. Feel the Funk + Zurima — `ZJ1nnN_rZg0`
  7. Feel the Funk + Zurima on drums — `1wciA-KslUs`
  8. Feel The Funk + Zurima on drums — `tb4H4Qop4Go`
- Van los 8 (decisión de Baltasar); las 3 "Feel the Funk" quedan al final. Se mostrará el orden a la artista por si reordena.

## 8. i18n (ES / EN)

- Sitio **bilingüe** con toggle `ES / EN` en el top bar.
- Implementación simple: objeto JS con claves de texto en ES y EN; el toggle intercambia sin recargar (actualiza nodos con `data-i18n`).
- Idioma por defecto: ES. Persistir elección en `localStorage`.

## 9. SEO / GEO (obligatorio — estándar agencia)

- Heading hierarchy: un solo `h1` (ZURIMA), `h2` por sección.
- Meta title + description únicos (versión ES y EN).
- Open Graph + Twitter card (imagen: retrato hero o image18).
- `sitemap.xml` + `robots.txt`. URLs limpias.
- **Schema.org JSON-LD:** `MusicGroup`/`Person` (Zurima) con `sameAs` (IG), `jobTitle` (Singer / Bandleader), `knowsLanguage`; `VideoObject` por cada video del slider. NAP/contacto en texto plano en el HTML.
- Sección de contacto con datos en texto plano (no solo en imágenes/JS).

## 10. Performance (< 2s — parte del entregable)

- Build estático (Vite). Sin CSS/JS muerto.
- Facade de YouTube (sin iframes hasta el click).
- Imágenes optimizadas (export a tamaños reales del layout; `srcset`), lazy loading bajo el fold.
- Fuentes: subset y `font-display: swap`.
- Validar con PageSpeed Insights antes de entregar.

## 11. Stack y estructura de archivos

- HTML5 + CSS3 + **JavaScript vanilla (ES Modules)** + **Vite**. Deploy estático (Vercel).
- Estructura propuesta dentro de `clientes/ZURIMA/`:
```
index.html
src/
  main.js            → bootstrap, IntersectionObserver, toggle i18n, slider
  i18n.js            → textos ES/EN
  video-slider.js    → facade YouTube + slider
  style.css          → tokens (variables semánticas) + secciones
data/
  content.js         → contenido estructurado (bio, timeline, skills, videos)
public/
  fotos/…            → imágenes optimizadas usadas
  og-image.jpg, sitemap.xml, robots.txt
```

## 12. Assets

- **Hero:** image7 (retrato, fondo gris→negro). Alt: image3.
- **Sobre mí:** image3 (o image7 si no fue al hero).
- **Banda editorial:** image18 (acostada con guitarra, fondo blanco) — usada sobre su propio blanco como contraste, no recortada.
- **Trayectoria / live:** image16 (cantando con micrófono), image9 (en vivo).
- **Paleta/texturas:** `Paleta color/paleta de color.png` contiene texturas doradas (ondas/partículas sobre negro) reservadas por Baltasar para "terminación" — se incorporan en fase de acabado, no ahora.
- **No usar como hero:** cualquier foto de fondo blanco recortada sobre negro (image18 lo demostró: borde sucio, blanco integral a la pose).

## 13. Pendientes / fuera de alcance ahora

- Validar orden de videos con la artista.
- WhatsApp / formularios backend: fuera de alcance v1 (solo CTA mailto/IG por ahora).
- Texturas doradas de la paleta: fase de terminación.
- Dominio: pendiente (definición de Baltasar).
- Posibles secciones futuras: repertorio detallado, prensa, fechas.

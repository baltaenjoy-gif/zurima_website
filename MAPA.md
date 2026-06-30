# MAPA — Sitio web ZURIMA

Artista musical (vocalista, baterista, bandleader). Sitio web de presentación con foco en su música y trayectoria.

---

## Estructura actual de carpetas

```
clientes/ZURIMA/
  MAPA.md                       → este archivo (índice del proyecto)
  docs/
    links videos.txt            → links de YouTube para la sección "Mi música"
    Reese.pdf.pdf               → CV / curriculum de Zurima (en inglés)
  fotos/
    image0..image18.jpeg        → banco de fotos. HERO = image18.jpeg
  logo/
    logo html.txt               → 3 modelos de logo (HTML/CSS) en tipografía Montserrat
  Paleta color/
    paleta de color.png         → paleta + texturas/recursos de fondo (oro sobre negro)
```

---

## Activos clave

### Hero
`fotos/image18.jpeg` — Zurima recostada con guitarra Fender, vestido negro de lentejuelas/plumas, sobre fondo blanco. Foto horizontal (5712×3808). Estética editorial.

### Logo — `logo/logo html.txt`
Texto "ZURIMA" en **Montserrat 500**, uppercase, `letter-spacing: 2px`. Tres variantes de color (a elegir según fondo donde se ubique):
- **Opción 1 — Oro metálico degradado:** `linear-gradient(135deg, #f3e71a, #e3a831 50%, #946714)` → para fondos oscuros
- **Opción 2 — Negro sólido premium:** `#111111` → para fondos claros
- **Opción 3 — Oro viejo / champagne:** `linear-gradient(135deg, #dfba6b, #b38b43)` → para fondos oscuros, tono más suave

### Paleta de color — `Paleta color/paleta de color.png`
"The RoohVibe Color Palette — Soulful Elegance". Negro + oros. Valores muestreados:

| Nombre        | Hex aprox. | Rol sugerido |
|---------------|-----------|--------------|
| Raisin Black  | `#0D0D0D` | fondo principal |
| Atlantic Grey | `#5A5854` | texto secundario / bordes |
| Apache Gold   | `#CDA75B` | acento oro medio |
| Dark Pearl    | `#C6A35E` | acento oro |
| Golden Amber  | `#EABD65` | acento oro claro / highlights |

> El PNG **también contiene texturas de fondo** (ondas y partículas doradas sobre negro) que Baltasar pedirá usar "en terminación". Quedan reservadas.

### Videos — `docs/links videos.txt` (+ playlist expandida)
Embebidos de YouTube (alojados en YT, reproducidos dentro del sitio vía click sobre miniatura). Miniatura disponible sin descargar en `https://img.youtube.com/vi/<ID>/maxresdefault.jpg`.

Links sueltos:
1. Cantando full show — `M5gabC4rIR4`
2. Cantando y tocando la batería — `1CEi1C3M34E` *(= "Drums & Vocals on board" de la playlist; duplicado)*

Playlist "Tocando la batería full show" (`PLmIkTQXuVcuOAy6bcsU4CgYqlKLhpKrVk`) — 7 videos:
| ID | Título |
|----|--------|
| `tS5MwxHwPuE` | Drumming – Moves like Jagger |
| `1wciA-KslUs` | Feel the Funk + Zurima on drums |
| `ZJ1nnN_rZg0` | Feel the Funk + Zurima |
| `tb4H4Qop4Go` | Feel The Funk + Zurima on drums |
| `xWdopPK94u0` | Drum cam – Drive My Car (Beatles cover) |
| `1CEi1C3M34E` | Zurima – Drums & Vocals on board |
| `bCa0MPL5k7Q` | MINOTAURA / Prendido Fuego Voy (Video Oficial en Vivo) |

> **8 videos únicos** en total. Las 3 variantes "Feel the Funk" son tomas casi redundantes → para el slider conviene curar (no listar las 3).

### CV — `docs/Reese.pdf.pdf` (resumen)
- **Rol:** Vocalist / Bandleader / Performer. Argentina, residencia actual UK (tel +44).
- **Experiencia:** Lead Singer & Band Leader en MSC Magnifica / Celebrity Cruises (2019–2025); Session Drummer & Vocalist en Buenos Aires (2007–2019, Teatro San Martín, Vorterix, clubes); dúo vocal bilingüe (2015–2017).
- **Formación vocal:** Ana Carfi (lírico), Mercedes Bassi (técnica), Bel Canto, Feldenkrais, Speech Level. Batería desde 2001.
- **Skills:** Batería avanzada, guitarra intermedia, arreglo vocal. Inglés fluido, italiano básico.
- **Highlights:** +1000 shows en vivo, repertorio de +400 canciones (Pop, Rock, Latin, Soul, Ballroom).
- **Contacto:** Zurima.frers.musica@gmail.com · +44 7385 619381 · IG @zurima.frers

---

## Secciones pedidas hasta ahora
- **Hero** con foto image18 + logo.
- **Mi música** — slider con miniaturas de los 3 videos; click abre el embed de YouTube en la página.

---

## Pendiente de definir con Baltasar
- Stack/build (HTML+CSS+JS vanilla + Vite, según estándar de la agencia).
- Resto de secciones (Sobre mí / Trayectoria, Contacto, etc.).
- Uso final de las texturas doradas de la paleta.
- Idioma del sitio (ES / EN / bilingüe).

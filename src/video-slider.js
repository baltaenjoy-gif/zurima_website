export function thumbUrl(id) {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
}

export function buildSlider(container, videos) {
  container.innerHTML = videos.map(({ id, title }) => {
    const thumb = thumbUrl(id)
    return `<button class="vslide" type="button" data-video-id="${id}" aria-label="Reproducir: TITLE_PLACEHOLDER">
  <span class="vslide__thumb">
    <img src="${thumb}" alt="" loading="lazy" width="480" height="270" />
    <span class="vslide__play" aria-hidden="true"></span>
  </span>
  <span class="vslide__title">TITLE_PLACEHOLDER</span>
</button>`
  }).join('\n')

  // Use textContent for title and aria-label to avoid HTML injection
  container.querySelectorAll('button[data-video-id]').forEach((btn, i) => {
    const { title } = videos[i]
    btn.setAttribute('aria-label', `Reproducir: ${title}`)
    btn.querySelector('.vslide__title').textContent = title
  })
}

export function playVideo(button) {
  if (button.querySelector('iframe')) return

  const id = button.dataset.videoId
  const titleEl = button.querySelector('.vslide__title')
  const title = titleEl ? titleEl.textContent : ''

  const thumb = button.querySelector('.vslide__thumb')
  const iframe = document.createElement('iframe')
  iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1`
  iframe.title = title
  iframe.setAttribute('allow', 'accelerated-sensors; autoplay; encrypted-media; gyroscope; picture-in-picture')
  iframe.setAttribute('allowfullscreen', '')
  iframe.loading = 'lazy'

  thumb.innerHTML = ''
  thumb.appendChild(iframe)
}

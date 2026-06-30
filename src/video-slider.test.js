import { describe, it, expect, beforeEach } from 'vitest'
import { thumbUrl, buildSlider, playVideo } from './video-slider.js'

const videos = [
  { id: 'M5gabC4rIR4', title: 'Cantando' },
  { id: 'bCa0MPL5k7Q', title: 'Minotaura' }
]

beforeEach(() => { document.body.innerHTML = '<div id="s"></div>' })

describe('video-slider', () => {
  it('thumbUrl arma la url de miniatura de YouTube', () => {
    expect(thumbUrl('abc')).toBe('https://img.youtube.com/vi/abc/hqdefault.jpg')
  })

  it('buildSlider crea un button por video, sin iframes', () => {
    buildSlider(document.getElementById('s'), videos)
    const btns = document.querySelectorAll('button[data-video-id]')
    expect(btns).toHaveLength(2)
    expect(btns[0].dataset.videoId).toBe('M5gabC4rIR4')
    expect(document.querySelector('iframe')).toBeNull()
    expect(document.querySelector('.vslide__title').textContent).toBe('Cantando')
  })

  it('playVideo inyecta el iframe de YouTube con autoplay', () => {
    buildSlider(document.getElementById('s'), videos)
    const btn = document.querySelector('button[data-video-id]')
    playVideo(btn)
    const iframe = btn.querySelector('iframe')
    expect(iframe).not.toBeNull()
    expect(iframe.src).toContain('youtube.com/embed/M5gabC4rIR4')
    expect(iframe.src).toContain('autoplay=1')
  })

  it('playVideo es idempotente (no duplica el iframe)', () => {
    buildSlider(document.getElementById('s'), videos)
    const btn = document.querySelector('button[data-video-id]')
    playVideo(btn)
    playVideo(btn)
    expect(btn.querySelectorAll('iframe')).toHaveLength(1)
  })
})

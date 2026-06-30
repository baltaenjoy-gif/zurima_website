import { describe, it, expect } from 'vitest'
import { content } from './content.js'

describe('content', () => {
  it('tiene 8 videos y lidera con voz', () => {
    expect(content.videos).toHaveLength(8)
    expect(content.videos[0].id).toBe('M5gabC4rIR4')
    content.videos.forEach((v) => {
      expect(v.id).toMatch(/^[\w-]{11}$/)
      expect(v.title.length).toBeGreaterThan(0)
    })
  })

  it('highlights: 3 con valores correctos', () => {
    expect(content.highlights).toHaveLength(3)
    expect(content.highlights[0].value).toBe('1000+')
    content.highlights.forEach((h) => {
      expect(h.label.es).toBeTruthy()
      expect(h.label.en).toBeTruthy()
    })
  })

  it('timeline bilingüe completo', () => {
    expect(content.timeline.length).toBeGreaterThan(0)
    content.timeline.forEach((t) => {
      expect(t.period).toBeTruthy()
      expect(t.role.es && t.role.en).toBeTruthy()
      expect(t.detail.es && t.detail.en).toBeTruthy()
    })
  })

  it('contacto correcto', () => {
    expect(content.contact.email).toBe('Zurima.frers.musica@gmail.com')
    expect(content.contact.instagram).toBe('@zurima.frers')
    expect(content.contact.phone).toBe('+44 7385 619381')
  })
})

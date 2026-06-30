import { describe, it, expect, beforeEach, vi } from 'vitest'
import { initReveal } from './reveal.js'

beforeEach(() => {
  document.body.innerHTML = '<div class="reveal"></div><div class="reveal"></div>'
  vi.restoreAllMocks()
})

describe('reveal', () => {
  it('agrega is-visible cuando el elemento intersecta', () => {
    let captured
    global.IntersectionObserver = class {
      constructor(cb) { captured = cb; this.cb = cb }
      observe(el) { this.cb([{ target: el, isIntersecting: true }], this) }
      unobserve() {}
      disconnect() {}
    }
    initReveal(document.querySelectorAll('.reveal'))
    document.querySelectorAll('.reveal').forEach((el) => {
      expect(el.classList.contains('is-visible')).toBe(true)
    })
  })

  it('NO agrega is-visible si el elemento no intersecta todavia', () => {
    global.IntersectionObserver = class {
      constructor(cb) { this.cb = cb }
      observe(el) { this.cb([{ target: el, isIntersecting: false }], this) }
      unobserve() {}
      disconnect() {}
    }
    initReveal(document.querySelectorAll('.reveal'))
    expect(document.querySelector('.reveal').classList.contains('is-visible')).toBe(false)
  })

  it('con prefers-reduced-motion marca todo visible sin usar observer', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true })
    const spy = vi.fn()
    global.IntersectionObserver = class { constructor() { spy() } observe() {} unobserve() {} disconnect() {} }
    initReveal(document.querySelectorAll('.reveal'))
    document.querySelectorAll('.reveal').forEach((el) => {
      expect(el.classList.contains('is-visible')).toBe(true)
    })
    expect(spy).not.toHaveBeenCalled()
  })
})

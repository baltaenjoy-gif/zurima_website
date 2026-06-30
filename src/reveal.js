export function initReveal(els) {
  const prefersReducedMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    els.forEach((el) => el.classList.add('is-visible'))
    return
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        obs.unobserve(entry.target)
      })
    },
    { threshold: 0.15 }
  )

  els.forEach((el) => observer.observe(el))
}

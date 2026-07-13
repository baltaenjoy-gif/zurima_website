const GOLD = '234, 189, 101'
const WARM_WHITE = '242, 240, 236'

function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

function createLight() {
  const offDur = randomBetween(900, 4200)
  const fadeInDur = randomBetween(150, 450)
  const onDur = randomBetween(350, 1400)
  const fadeOutDur = randomBetween(200, 600)

  return {
    xf: Math.random(),
    yf: Math.random(),
    r: randomBetween(0.8, 2.4),
    maxAlpha: randomBetween(0.45, 1),
    color: Math.random() < 0.75 ? GOLD : WARM_WHITE,
    offDur,
    fadeInDur,
    onDur,
    fadeOutDur,
    cycle: offDur + fadeInDur + onDur + fadeOutDur,
    phase: Math.random() * (offDur + fadeInDur + onDur + fadeOutDur),
  }
}

function alphaFor(light, t) {
  const local = (t + light.phase) % light.cycle
  if (local < light.offDur) return 0

  const afterOff = local - light.offDur
  if (afterOff < light.fadeInDur) return (afterOff / light.fadeInDur) * light.maxAlpha

  const afterFadeIn = afterOff - light.fadeInDur
  if (afterFadeIn < light.onDur) return light.maxAlpha

  const afterOn = afterFadeIn - light.onDur
  if (afterOn < light.fadeOutDur) return light.maxAlpha * (1 - afterOn / light.fadeOutDur)

  return 0
}

function pageSize() {
  return {
    w: document.documentElement.clientWidth,
    h: Math.max(document.documentElement.scrollHeight, document.body.scrollHeight),
  }
}

function lightCountFor(w, h) {
  return Math.min(700, Math.max(150, Math.floor((w * h) / 9000)))
}

export function initBgLights() {
  const canvas = document.getElementById('bg-lights')
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let lights = []
  let currentW = 0
  let currentH = 0

  function applyCanvasSize(w, h) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  function drawStatic() {
    ctx.clearRect(0, 0, currentW, currentH)
    lights.forEach((light) => {
      ctx.beginPath()
      ctx.fillStyle = `rgba(${light.color}, ${light.staticAlpha})`
      ctx.arc(light.xf * currentW, light.yf * currentH, light.r, 0, Math.PI * 2)
      ctx.fill()
    })
  }

  function regenerate() {
    const { w, h } = pageSize()
    currentW = w
    currentH = h
    applyCanvasSize(w, h)

    const count = lightCountFor(w, h)
    lights = Array.from({ length: count }, createLight)

    if (reduceMotion) {
      lights.forEach((light) => {
        light.staticAlpha = light.maxAlpha * randomBetween(0.35, 0.9)
      })
      drawStatic()
    }
  }

  regenerate()

  let regenTimer = null
  function scheduleRegenerate() {
    clearTimeout(regenTimer)
    regenTimer = setTimeout(() => {
      const { w, h } = pageSize()
      if (w === currentW && h === currentH) return
      regenerate()
    }, 200)
  }

  window.addEventListener('resize', scheduleRegenerate)
  if (typeof ResizeObserver === 'function') {
    new ResizeObserver(scheduleRegenerate).observe(document.documentElement)
  }

  if (reduceMotion) return

  function draw(t) {
    const scrollY = window.scrollY
    const viewTop = scrollY - 60
    const viewBottom = scrollY + window.innerHeight + 60

    ctx.clearRect(0, viewTop, currentW, viewBottom - viewTop)

    lights.forEach((light) => {
      const y = light.yf * currentH
      if (y < viewTop || y > viewBottom) return

      const alpha = alphaFor(light, t)
      if (alpha <= 0.01) return

      const x = light.xf * currentW
      ctx.beginPath()
      ctx.fillStyle = `rgba(${light.color}, ${alpha})`
      ctx.shadowColor = `rgba(${light.color}, ${alpha * 0.8})`
      ctx.shadowBlur = light.r * 4
      ctx.arc(x, y, light.r, 0, Math.PI * 2)
      ctx.fill()
    })

    requestAnimationFrame(draw)
  }

  requestAnimationFrame(draw)
}

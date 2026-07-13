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

export function initBgLights() {
  const canvas = document.getElementById('bg-lights')
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const lightCount = Math.min(140, Math.max(60, Math.floor((window.innerWidth * window.innerHeight) / 9000)))
  const lights = Array.from({ length: lightCount }, createLight)

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  if (reduceMotion) {
    lights.forEach((light) => {
      light.staticAlpha = light.maxAlpha * randomBetween(0.35, 0.9)
    })

    const drawStatic = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)
      lights.forEach((light) => {
        ctx.beginPath()
        ctx.fillStyle = `rgba(${light.color}, ${light.staticAlpha})`
        ctx.arc(light.xf * w, light.yf * h, light.r, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    resize()
    drawStatic()
    window.addEventListener('resize', () => {
      resize()
      drawStatic()
    })
    return
  }

  function draw(t) {
    const w = window.innerWidth
    const h = window.innerHeight
    ctx.clearRect(0, 0, w, h)

    lights.forEach((light) => {
      const alpha = alphaFor(light, t)
      if (alpha <= 0.01) return

      const x = light.xf * w
      const y = light.yf * h
      ctx.beginPath()
      ctx.fillStyle = `rgba(${light.color}, ${alpha})`
      ctx.shadowColor = `rgba(${light.color}, ${alpha * 0.8})`
      ctx.shadowBlur = light.r * 4
      ctx.arc(x, y, light.r, 0, Math.PI * 2)
      ctx.fill()
    })
  }

  resize()
  window.addEventListener('resize', resize)

  function loop(t) {
    draw(t)
    requestAnimationFrame(loop)
  }
  requestAnimationFrame(loop)
}

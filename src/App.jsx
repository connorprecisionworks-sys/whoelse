import { useState, useEffect, useRef } from 'react'
import styles from './App.module.css'

// ============================================================
// REPLACE THIS with your actual signup URL
// ============================================================
const SIGNUP_URL = 'https://YOUR-SIGNUP-URL-HERE.com'

// ── Rotating phrases ─────────────────────────────────────────
const PHRASES = [
  'but us to pioneer the future',
  'to be trusted with this technology',
  'to create what comes next',
  'should be trusted to lead',
  'will build for Kingdom glory',
  'is ready to answer the call',
  'will accept this responsibility',
  'will shape the next generation',
  'can carry this forward',
  'but us to begin',
]

// ── Ticker items ─────────────────────────────────────────────
const TICKER = [
  'Faith × Innovation',
  'Genesis Studios',
  'Austin Christian University',
  'Kingdom Glory',
  'Who Else Collective',
  'Pioneer The Future',
]

function usePhrase(phrases, ms = 2800) {
  const [idx, setIdx] = useState(0)
  const [out, setOut] = useState(false)
  useEffect(() => {
    const t = setInterval(() => {
      setOut(true)
      setTimeout(() => { setIdx(i => (i + 1) % phrases.length); setOut(false) }, 350)
    }, ms)
    return () => clearInterval(t)
  }, [phrases.length, ms])
  return { phrase: phrases[idx], out }
}

// ── Gold ticker ───────────────────────────────────────────────
function Ticker() {
  const items = [...TICKER, ...TICKER, ...TICKER]
  return (
    <div className={styles.tickerWrap}>
      <div className={styles.tickerTrack}>
        {items.map((item, i) => (
          <span key={i} className={styles.tickerItem}>
            {item} <span className={styles.tickerSep}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Nav ───────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
      <span className={styles.navLogo}>W/E</span>
      <div className={styles.navLinks}>
        <span className={styles.navItem}>Genesis Studios</span>
        <span className={styles.navItem}>ACU</span>
        <button className={styles.navCta}>Apply →</button>
      </div>
    </nav>
  )
}

// ── Trophy canvas — no glass case, always glowing ────────────
function TrophyCanvas() {
  const canvasRef = useRef(null)
  const stateRef = useRef({ pulse: 0, hover: false, clicked: false, flash: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf

    function resize() {
      canvas.width = canvas.parentElement.clientWidth
      canvas.height = canvas.parentElement.clientHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function dims() {
      const W = canvas.width, H = canvas.height
      const sc = Math.min(H * 0.003, W * 0.0022)
      return { W, H, cx: W / 2, sc }
    }

    // ── Wood stand ──────────────────────────────
    function drawStand(cx, baseY, sc) {
      const sw = 160 * sc, legW = 26 * sc, legH = 28 * sc
      const footW = 46 * sc, footH = 9 * sc, sh = 16 * sc

      const g1 = ctx.createLinearGradient(0, baseY, 0, baseY + footH)
      g1.addColorStop(0, '#5c3b1e'); g1.addColorStop(1, '#3a2210')
      ctx.fillStyle = g1
      ctx.beginPath(); ctx.roundRect(cx - sw / 2 - footW * .1, baseY, footW, footH, 2); ctx.fill()
      ctx.beginPath(); ctx.roundRect(cx + sw / 2 - footW * .9, baseY, footW, footH, 2); ctx.fill()

      const g2 = ctx.createLinearGradient(0, baseY - legH, 0, baseY)
      g2.addColorStop(0, '#7a4e28'); g2.addColorStop(1, '#5c3b1e')
      ctx.fillStyle = g2
      ctx.beginPath(); ctx.roundRect(cx - sw / 2 + 4 * sc, baseY - legH, legW, legH, 2); ctx.fill()
      ctx.beginPath(); ctx.roundRect(cx + sw / 2 - legW - 4 * sc, baseY - legH, legW, legH, 2); ctx.fill()

      const g3 = ctx.createLinearGradient(0, baseY - legH - sh, 0, baseY - legH)
      g3.addColorStop(0, '#9b6434'); g3.addColorStop(.5, '#7a4e28'); g3.addColorStop(1, '#5c3b1e')
      ctx.fillStyle = g3
      ctx.beginPath(); ctx.roundRect(cx - sw / 2, baseY - legH - sh, sw, sh, 3); ctx.fill()

      // wood grain
      ctx.strokeStyle = 'rgba(0,0,0,0.12)'; ctx.lineWidth = .8
      for (let i = 0; i < 4; i++) {
        const gx = cx - sw / 2 + sw * .15 + i * sw * .18
        ctx.beginPath(); ctx.moveTo(gx, baseY - legH - sh + 2); ctx.lineTo(gx + 5 * sc, baseY - legH - 2); ctx.stroke()
      }
      ctx.strokeStyle = 'rgba(255,200,120,0.15)'; ctx.lineWidth = 1
      ctx.beginPath(); ctx.moveTo(cx - sw / 2, baseY - legH - sh); ctx.lineTo(cx + sw / 2, baseY - legH - sh); ctx.stroke()

      return baseY - legH - sh
    }

    // ── Star ────────────────────────────────────
    function drawStar(x, y, r, col) {
      ctx.save(); ctx.translate(x, y); ctx.fillStyle = col
      ctx.beginPath()
      for (let i = 0; i < 5; i++) {
        const a = Math.PI / 2 + i * 2 * Math.PI / 5
        const b = a + Math.PI / 5
        i === 0 ? ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r) : ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r)
        ctx.lineTo(Math.cos(b) * r * .42, Math.sin(b) * r * .42)
      }
      ctx.closePath(); ctx.fill(); ctx.restore()
    }

    // ── Trophy ──────────────────────────────────
    function drawTrophy(cx, plankY, sc) {
      const s = stateRef.current
      const ty = plankY - 8 * sc

      // ambient glow — always on, pulses gently
      const glowAlpha = .13 + Math.sin(s.pulse) * .05 + (s.hover ? .07 : 0)
      const glowR = 100 * sc
      const grd = ctx.createRadialGradient(cx, ty - 58 * sc, 8 * sc, cx, ty - 58 * sc, glowR)
      grd.addColorStop(0, `rgba(196,154,34,${glowAlpha + .06})`)
      grd.addColorStop(.5, `rgba(196,154,34,${glowAlpha * .4})`)
      grd.addColorStop(1, 'rgba(196,154,34,0)')
      ctx.fillStyle = grd
      ctx.beginPath(); ctx.arc(cx, ty - 58 * sc, glowR, 0, Math.PI * 2); ctx.fill()

      // floor reflection glow
      const flGrd = ctx.createRadialGradient(cx, plankY, 0, cx, plankY, 70 * sc)
      flGrd.addColorStop(0, `rgba(196,154,34,${glowAlpha * .6})`)
      flGrd.addColorStop(1, 'rgba(196,154,34,0)')
      ctx.fillStyle = flGrd
      ctx.beginPath(); ctx.ellipse(cx, plankY - 2 * sc, 70 * sc, 14 * sc, 0, 0, Math.PI * 2); ctx.fill()

      // base plate
      const bpW = 90 * sc, bpH = 10 * sc
      const bg = ctx.createLinearGradient(cx - bpW / 2, ty - bpH, cx - bpW / 2, ty)
      bg.addColorStop(0, '#b8860b'); bg.addColorStop(.5, '#daa520'); bg.addColorStop(1, '#8b6914')
      ctx.fillStyle = bg; ctx.beginPath(); ctx.roundRect(cx - bpW / 2, ty - bpH, bpW, bpH, 2); ctx.fill()

      // stem
      const stW = 18 * sc, stH = 36 * sc
      const sg = ctx.createLinearGradient(cx - stW / 2, 0, cx + stW / 2, 0)
      sg.addColorStop(0, '#8b6914'); sg.addColorStop(.35, '#daa520'); sg.addColorStop(.65, '#f0c040'); sg.addColorStop(1, '#8b6914')
      ctx.fillStyle = sg; ctx.fillRect(cx - stW / 2, ty - bpH - stH, stW, stH)

      // knot
      const knY = ty - bpH - stH
      const kg = ctx.createLinearGradient(cx - 24 * sc, 0, cx + 24 * sc, 0)
      kg.addColorStop(0, '#8b6914'); kg.addColorStop(.4, '#daa520'); kg.addColorStop(.6, '#f0c040'); kg.addColorStop(1, '#8b6914')
      ctx.fillStyle = kg; ctx.beginPath(); ctx.roundRect(cx - 24 * sc, knY - 8 * sc, 48 * sc, 16 * sc, 4); ctx.fill()

      // cup shape
      const cpBot = knY - 8 * sc, cpTopW = 80 * sc, cpBotW = 36 * sc, cpH = 68 * sc
      const cpTop = cpBot - cpH

      ctx.beginPath()
      ctx.moveTo(cx - cpBotW / 2, cpBot)
      ctx.bezierCurveTo(cx - cpBotW / 2 - 10 * sc, cpBot - cpH * .3, cx - cpTopW / 2, cpBot - cpH * .6, cx - cpTopW / 2, cpTop)
      ctx.lineTo(cx + cpTopW / 2, cpTop)
      ctx.bezierCurveTo(cx + cpTopW / 2, cpBot - cpH * .6, cx + cpBotW / 2 + 10 * sc, cpBot - cpH * .3, cx + cpBotW / 2, cpBot)
      ctx.closePath()

      const cg = ctx.createLinearGradient(cx - cpTopW / 2, 0, cx + cpTopW / 2, 0)
      cg.addColorStop(0, '#8b6914'); cg.addColorStop(.2, '#c49a22')
      cg.addColorStop(.45, '#f0c840'); cg.addColorStop(.55, '#ffe066')
      cg.addColorStop(.8, '#c49a22'); cg.addColorStop(1, '#8b6914')
      ctx.fillStyle = cg; ctx.fill()

      // rim
      const rg = ctx.createLinearGradient(cx - cpTopW / 2 - 4 * sc, 0, cx + cpTopW / 2 + 4 * sc, 0)
      rg.addColorStop(0, '#8b6914'); rg.addColorStop(.5, '#ffe066'); rg.addColorStop(1, '#8b6914')
      ctx.fillStyle = rg
      ctx.beginPath(); ctx.roundRect(cx - cpTopW / 2 - 4 * sc, cpTop - 6 * sc, cpTopW + 8 * sc, 12 * sc, 3); ctx.fill()

      // cup shine
      ctx.save(); ctx.beginPath()
      ctx.moveTo(cx - cpBotW / 2, cpBot)
      ctx.bezierCurveTo(cx - cpBotW / 2 - 10 * sc, cpBot - cpH * .3, cx - cpTopW / 2, cpBot - cpH * .6, cx - cpTopW / 2, cpTop)
      ctx.lineTo(cx + cpTopW / 2, cpTop)
      ctx.bezierCurveTo(cx + cpTopW / 2, cpBot - cpH * .6, cx + cpBotW / 2 + 10 * sc, cpBot - cpH * .3, cx + cpBotW / 2, cpBot)
      ctx.closePath(); ctx.clip()
      const shine = ctx.createLinearGradient(cx - cpTopW / 2, 0, cx + cpTopW / 2, 0)
      shine.addColorStop(0, 'rgba(255,255,255,0)'); shine.addColorStop(.3, 'rgba(255,255,255,0)')
      shine.addColorStop(.42, 'rgba(255,255,255,0.2)'); shine.addColorStop(.5, 'rgba(255,255,255,0.08)')
      shine.addColorStop(.6, 'rgba(255,255,255,0)')
      ctx.fillStyle = shine; ctx.fillRect(cx - cpTopW / 2, cpTop, cpTopW, cpH)
      ctx.restore()

      // handles
      for (const side of [-1, 1]) {
        const hx = cx + side * (cpTopW / 2 - 2 * sc)
        const hy1 = cpTop + 12 * sc, hy2 = cpTop + 44 * sc
        ctx.strokeStyle = '#c49a22'; ctx.lineWidth = 5 * sc
        ctx.beginPath(); ctx.moveTo(hx, hy1)
        ctx.bezierCurveTo(hx + side * 28 * sc, hy1, hx + side * 28 * sc, hy2, hx, hy2); ctx.stroke()
        ctx.strokeStyle = '#ffe066'; ctx.lineWidth = 2 * sc
        ctx.beginPath(); ctx.moveTo(hx, hy1)
        ctx.bezierCurveTo(hx + side * 28 * sc, hy1, hx + side * 28 * sc, hy2, hx, hy2); ctx.stroke()
      }

      // W/E engraving
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.font = `bold ${28 * sc}px 'Bebas Neue', sans-serif`
      ctx.fillStyle = 'rgba(139,105,20,0.7)'; ctx.fillText('W/E', cx + sc, cpTop + cpH * .42 + sc)
      ctx.fillStyle = 'rgba(255,224,80,0.55)'; ctx.fillText('W/E', cx, cpTop + cpH * .42)

      // star
      drawStar(cx, cpTop - 12 * sc, 8 * sc, '#ffe066')

      // hover: faint "click" label just above trophy
      if (!s.clicked) {
        const labelAlpha = s.hover
          ? .85
          : .22 + Math.sin(s.pulse * .7) * .1
        ctx.font = `600 ${9 * sc}px 'JetBrains Mono', monospace`
        ctx.textAlign = 'center'
        ctx.fillStyle = `rgba(224,184,74,${labelAlpha})`
        ctx.fillText('CLICK TO APPLY', cx, cpTop - 22 * sc)
      }

      return {
        x: cx - (cpTopW / 2 + 30 * sc),
        y: cpTop - 20 * sc,
        w: cpTopW + 60 * sc,
        h: ty - cpTop + 20 * sc,
      }
    }

    // ── Hit bounds ──────────────────────────────
    let trophyBounds = { x: 0, y: 0, w: 0, h: 0 }

    function inBounds(mx, my) {
      const tb = trophyBounds
      return mx >= tb.x && mx <= tb.x + tb.w && my >= tb.y && my <= tb.y + tb.h
    }

    function handleClick(e) {
      const s = stateRef.current
      if (s.clicked) return
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left, my = e.clientY - rect.top
      if (inBounds(mx, my)) {
        s.clicked = true
        s.flash = 1
        canvas.style.cursor = 'crosshair'
        setTimeout(() => window.open(SIGNUP_URL, '_blank'), 300)
      }
    }

    function handleMove(e) {
      const s = stateRef.current
      if (s.clicked) return
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left, my = e.clientY - rect.top
      s.hover = inBounds(mx, my)
      canvas.style.cursor = s.hover ? 'pointer' : 'crosshair'
    }

    canvas.addEventListener('click', handleClick)
    canvas.addEventListener('mousemove', handleMove)

    // ── Render loop ─────────────────────────────
    function loop() {
      const s = stateRef.current
      s.pulse += 0.038
      const { W, H, cx, sc } = dims()
      ctx.clearRect(0, 0, W, H)

      const plankY = H - 48 * sc
      drawStand(cx, plankY, sc)
      trophyBounds = drawTrophy(cx, plankY, sc)

      if (s.flash > 0) {
        ctx.fillStyle = `rgba(196,154,34,${s.flash * .45})`
        ctx.fillRect(0, 0, W, H)
        s.flash = Math.max(0, s.flash - 0.055)
      }

      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('click', handleClick)
      canvas.removeEventListener('mousemove', handleMove)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} />
}

// ── Main App ──────────────────────────────────────────────────
export default function App() {
  const { phrase, out } = usePhrase(PHRASES)
  const [hintVisible, setHintVisible] = useState(false)
  const [hintDismissed, setHintDismissed] = useState(false)
  const hintTimer = useRef(null)

  useEffect(() => {
    hintTimer.current = setTimeout(() => {
      if (!hintDismissed) setHintVisible(true)
    }, 20000)
    return () => clearTimeout(hintTimer.current)
  }, [hintDismissed])

  function dismissHint() {
    setHintVisible(false)
    setHintDismissed(true)
    clearTimeout(hintTimer.current)
  }

  return (
    <div className={styles.page}>
      <Ticker />
      <Nav />

      {/* Full-width WHO ELSE across the very top */}
      <div className={styles.wordmark}>
        <span className={styles.who}>WHO</span>
        <span className={styles.else}>ELSE</span>
      </div>

      {/* Rotating phrase */}
      <div className={styles.phraseRow}>
        <span className={`${styles.phrase} ${out ? styles.phraseOut : styles.phraseIn}`}>
          — {phrase}?
        </span>
      </div>

      {/* Spacer so trophy sits at the bottom */}
      <div className={styles.spacer} />

      {/* Trophy — no glass case */}
      <div className={styles.stage}>
        <TrophyCanvas />
      </div>

      {/* Bottom meta bar */}
      <div className={styles.heroBtm}>
        <span>Genesis Studios × ACU</span>
        <span className={styles.btmDot}>·</span>
        <span>Faith. Build. Ship.</span>
        <span className={styles.btmDot}>·</span>
        <span>Cohort 01 — Open</span>
      </div>

      {/* 20s hint */}
      <div className={`${styles.hint} ${hintVisible ? styles.hintShow : ''}`}>
        <span className={styles.hintArrow}>→</span>
        <div className={styles.hintText}>
          <strong>Click the trophy</strong>
          to sign up for Who Else
        </div>
        <button className={styles.hintClose} onClick={dismissHint}>✕</button>
      </div>
    </div>
  )
}

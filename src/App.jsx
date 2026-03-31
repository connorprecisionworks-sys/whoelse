import { useState, useEffect, useRef } from 'react'
import styles from './App.module.css'

// ============================================================
// REPLACE THIS with your actual signup URL
// e.g. 'https://forms.gle/yourformid'
//      'https://yoursite.typeform.com/to/yourform'
//      'https://whoelse.com/apply'
// ============================================================
const SIGNUP_URL = 'https://YOUR-SIGNUP-URL-HERE.com'

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

function Nav() {
  return (
    <nav className={styles.nav}>
      <span className={styles.navLogo}>W/E</span>
      <div className={styles.navLinks}>
        <span>Genesis Studios</span>
        <span>ACU</span>
        <span className={styles.navApply}>Apply →</span>
      </div>
    </nav>
  )
}

function TrophyCanvas({ onSignup }) {
  const canvasRef = useRef(null)
  const stateRef = useRef({
    lidState: 'on',   // 'on' | 'falling' | 'gone'
    lidY: 0,
    lidVY: 0,
    lidRot: 0,
    lidVRot: 0,
    pulse: 0,
    hover: false,
    clicked: false,
    flash: 0,
    frame: 0,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf

    function resize() {
      const parent = canvas.parentElement
      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function dims() {
      const W = canvas.width, H = canvas.height
      const cx = W / 2
      const sc = Math.min(H * 0.0028, W * 0.002)
      return { W, H, cx, sc }
    }

    // ── Stand ──────────────────────────────────
    function drawStand(cx, baseY, sc) {
      const sw = 160 * sc, legW = 28 * sc, legH = 32 * sc
      const footW = 48 * sc, footH = 10 * sc, sh = 18 * sc

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

      const g3 = ctx.createLinearGradient(cx, baseY - legH - sh, cx, baseY - legH)
      g3.addColorStop(0, '#9b6434'); g3.addColorStop(.5, '#7a4e28'); g3.addColorStop(1, '#5c3b1e')
      ctx.fillStyle = g3
      ctx.beginPath(); ctx.roundRect(cx - sw / 2, baseY - legH - sh, sw, sh, 3); ctx.fill()

      ctx.strokeStyle = 'rgba(0,0,0,0.12)'; ctx.lineWidth = 1
      for (let i = 0; i < 4; i++) {
        const gx = cx - sw / 2 + sw * .15 + i * sw * .18
        ctx.beginPath(); ctx.moveTo(gx, baseY - legH - sh + 2); ctx.lineTo(gx + 6 * sc, baseY - legH - 2); ctx.stroke()
      }
      ctx.strokeStyle = 'rgba(255,200,120,0.15)'; ctx.lineWidth = 1
      ctx.beginPath(); ctx.moveTo(cx - sw / 2, baseY - legH - sh); ctx.lineTo(cx + sw / 2, baseY - legH - sh); ctx.stroke()

      return baseY - legH - sh
    }

    // ── Glass case ─────────────────────────────
    function drawCase(cx, plankY, sc, lidOffY, lidOffRot) {
      const cw = 130 * sc, ch = 150 * sc, ct = 6 * sc
      const caseLeft = cx - cw / 2, caseTop = plankY - ch

      ctx.fillStyle = 'rgba(140,200,255,0.04)'
      ctx.fillRect(caseLeft, caseTop, cw, ch)

      const ig = ctx.createLinearGradient(caseLeft, caseTop, cx, caseTop)
      ig.addColorStop(0, 'rgba(180,220,255,0.06)'); ig.addColorStop(.5, 'rgba(180,220,255,0.02)'); ig.addColorStop(1, 'rgba(180,220,255,0.06)')
      ctx.fillStyle = ig; ctx.fillRect(caseLeft, caseTop, cw, ch)

      ctx.fillStyle = 'rgba(180,220,255,0.06)'
      ctx.fillRect(caseLeft, caseTop, ct, ch)
      ctx.fillRect(caseLeft + cw - ct, caseTop, ct, ch)

      ctx.strokeStyle = 'rgba(180,220,255,0.18)'; ctx.lineWidth = 1
      ctx.strokeRect(caseLeft, caseTop, cw, ch)

      ctx.save(); ctx.beginPath(); ctx.rect(caseLeft, caseTop, cw, ch); ctx.clip()
      ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 2
      ctx.beginPath(); ctx.moveTo(caseLeft + ct + 4 * sc, caseTop + 8 * sc); ctx.lineTo(caseLeft + ct + 4 * sc, plankY - 4 * sc); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(caseLeft + ct + 12 * sc, caseTop + 14 * sc); ctx.lineTo(caseLeft + ct + 12 * sc, caseTop + 40 * sc); ctx.stroke()
      ctx.restore()

      // lid
      const s = stateRef.current
      if (s.lidState !== 'gone') {
        const lidW = cw + 8 * sc, lidH = 14 * sc
        const lidX = cx - lidW / 2, lidBase = caseTop - 2

        ctx.save()
        const pivX = cx, pivY = lidBase + lidH / 2
        ctx.translate(pivX, pivY + lidOffY)
        ctx.rotate(lidOffRot)
        ctx.translate(-pivX, -pivY)

        const lg = ctx.createLinearGradient(lidX, lidBase, lidX, lidBase + lidH)
        lg.addColorStop(0, 'rgba(200,235,255,0.35)'); lg.addColorStop(1, 'rgba(160,210,255,0.18)')
        ctx.fillStyle = lg
        ctx.beginPath(); ctx.roundRect(lidX, lidBase, lidW, lidH, 3); ctx.fill()
        ctx.strokeStyle = 'rgba(200,235,255,0.5)'; ctx.lineWidth = 1
        ctx.strokeRect(lidX, lidBase, lidW, lidH)

        ctx.fillStyle = 'rgba(200,235,255,0.5)'
        ctx.beginPath(); ctx.roundRect(cx - 10 * sc, lidBase - 8 * sc, 20 * sc, 10 * sc, 3); ctx.fill()
        ctx.strokeStyle = 'rgba(200,235,255,0.6)'; ctx.lineWidth = .8
        ctx.strokeRect(cx - 10 * sc, lidBase - 8 * sc, 20 * sc, 10 * sc)

        ctx.restore()
      }

      return { caseTop, cw, ch }
    }

    // ── Star ───────────────────────────────────
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

    // ── Trophy ─────────────────────────────────
    function drawTrophy(cx, plankY, sc) {
      const s = stateRef.current
      const ty = plankY - 10 * sc

      if (s.lidState === 'gone') {
        const alpha = .12 + Math.sin(s.pulse) * .06 + (s.hover ? .08 : 0)
        const grd = ctx.createRadialGradient(cx, ty - 60 * sc, 10 * sc, cx, ty - 60 * sc, 90 * sc)
        grd.addColorStop(0, `rgba(196,154,34,${alpha + .08})`); grd.addColorStop(1, 'rgba(196,154,34,0)')
        ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(cx, ty - 60 * sc, 90 * sc, 0, Math.PI * 2); ctx.fill()
      }

      // base plate
      const bpW = 90 * sc, bpH = 10 * sc
      const bg = ctx.createLinearGradient(cx - bpW / 2, ty - bpH, cx - bpW / 2, ty)
      bg.addColorStop(0, '#b8860b'); bg.addColorStop(.5, '#daa520'); bg.addColorStop(1, '#8b6914')
      ctx.fillStyle = bg; ctx.beginPath(); ctx.roundRect(cx - bpW / 2, ty - bpH, bpW, bpH, 2); ctx.fill()

      // stem
      const stW = 18 * sc, stH = 38 * sc
      const sg = ctx.createLinearGradient(cx - stW / 2, 0, cx + stW / 2, 0)
      sg.addColorStop(0, '#8b6914'); sg.addColorStop(.35, '#daa520'); sg.addColorStop(.65, '#f0c040'); sg.addColorStop(1, '#8b6914')
      ctx.fillStyle = sg; ctx.fillRect(cx - stW / 2, ty - bpH - stH, stW, stH)

      // knot
      const knY = ty - bpH - stH
      const kg = ctx.createLinearGradient(cx - 24 * sc, 0, cx + 24 * sc, 0)
      kg.addColorStop(0, '#8b6914'); kg.addColorStop(.4, '#daa520'); kg.addColorStop(.6, '#f0c040'); kg.addColorStop(1, '#8b6914')
      ctx.fillStyle = kg; ctx.beginPath(); ctx.roundRect(cx - 24 * sc, knY - 8 * sc, 48 * sc, 16 * sc, 4); ctx.fill()

      // cup
      const cpBot = knY - 8 * sc, cpTopW = 80 * sc, cpBotW = 36 * sc, cpH = 70 * sc
      const cpTop = cpBot - cpH
      ctx.beginPath()
      ctx.moveTo(cx - cpBotW / 2, cpBot)
      ctx.bezierCurveTo(cx - cpBotW / 2 - 10 * sc, cpBot - cpH * .3, cx - cpTopW / 2, cpBot - cpH * .6, cx - cpTopW / 2, cpTop)
      ctx.lineTo(cx + cpTopW / 2, cpTop)
      ctx.bezierCurveTo(cx + cpTopW / 2, cpBot - cpH * .6, cx + cpBotW / 2 + 10 * sc, cpBot - cpH * .3, cx + cpBotW / 2, cpBot)
      ctx.closePath()

      const cg = ctx.createLinearGradient(cx - cpTopW / 2, 0, cx + cpTopW / 2, 0)
      cg.addColorStop(0, '#8b6914'); cg.addColorStop(.2, '#c49a22'); cg.addColorStop(.45, '#f0c840')
      cg.addColorStop(.55, '#ffe066'); cg.addColorStop(.8, '#c49a22'); cg.addColorStop(1, '#8b6914')
      ctx.fillStyle = cg; ctx.fill()

      // rim
      const rg = ctx.createLinearGradient(cx - cpTopW / 2 - 4 * sc, 0, cx + cpTopW / 2 + 4 * sc, 0)
      rg.addColorStop(0, '#8b6914'); rg.addColorStop(.5, '#ffe066'); rg.addColorStop(1, '#8b6914')
      ctx.fillStyle = rg; ctx.beginPath(); ctx.roundRect(cx - cpTopW / 2 - 4 * sc, cpTop - 6 * sc, cpTopW + 8 * sc, 12 * sc, 3); ctx.fill()

      // cup shine
      ctx.save(); ctx.beginPath()
      ctx.moveTo(cx - cpBotW / 2, cpBot)
      ctx.bezierCurveTo(cx - cpBotW / 2 - 10 * sc, cpBot - cpH * .3, cx - cpTopW / 2, cpBot - cpH * .6, cx - cpTopW / 2, cpTop)
      ctx.lineTo(cx + cpTopW / 2, cpTop)
      ctx.bezierCurveTo(cx + cpTopW / 2, cpBot - cpH * .6, cx + cpBotW / 2 + 10 * sc, cpBot - cpH * .3, cx + cpBotW / 2, cpBot)
      ctx.closePath(); ctx.clip()
      const shine = ctx.createLinearGradient(cx - cpTopW / 2, 0, cx + cpTopW / 2, 0)
      shine.addColorStop(0, 'rgba(255,255,255,0)'); shine.addColorStop(.3, 'rgba(255,255,255,0)')
      shine.addColorStop(.4, 'rgba(255,255,255,0.18)'); shine.addColorStop(.5, 'rgba(255,255,255,0.08)'); shine.addColorStop(.6, 'rgba(255,255,255,0)')
      ctx.fillStyle = shine; ctx.fillRect(cx - cpTopW / 2, cpTop, cpTopW, cpH); ctx.restore()

      // handles
      for (const side of [-1, 1]) {
        const hx = cx + side * (cpTopW / 2 - 2 * sc)
        const hy1 = cpTop + 12 * sc, hy2 = cpTop + 44 * sc
        ctx.strokeStyle = '#c49a22'; ctx.lineWidth = 5 * sc
        ctx.beginPath(); ctx.moveTo(hx, hy1); ctx.bezierCurveTo(hx + side * 28 * sc, hy1, hx + side * 28 * sc, hy2, hx, hy2); ctx.stroke()
        ctx.strokeStyle = '#ffe066'; ctx.lineWidth = 2 * sc
        ctx.beginPath(); ctx.moveTo(hx, hy1); ctx.bezierCurveTo(hx + side * 28 * sc, hy1, hx + side * 28 * sc, hy2, hx, hy2); ctx.stroke()
      }

      // W/E engraving
      ctx.font = `bold ${28 * sc}px 'Bebas Neue', sans-serif`
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillStyle = 'rgba(139,105,20,0.7)'; ctx.fillText('W/E', cx + sc, cpTop + cpH * .42 + sc)
      ctx.fillStyle = 'rgba(255,224,80,0.55)'; ctx.fillText('W/E', cx, cpTop + cpH * .42)

      drawStar(cx, cpTop - 12 * sc, 8 * sc, '#ffe066')

      // prompt
      if (s.lidState === 'gone' && !s.clicked) {
        const a = .45 + Math.sin(s.pulse * .8) * .2
        ctx.font = `600 ${10 * sc}px 'JetBrains Mono', monospace`
        ctx.textAlign = 'center'
        ctx.fillStyle = `rgba(224,184,74,${a})`
        ctx.fillText('CLICK THE TROPHY', cx, cpTop - 24 * sc)
      }

      return {
        x: cx - cpTopW / 2 - 30 * sc,
        y: cpTop - 20 * sc,
        w: cpTopW + 60 * sc,
        h: ty - cpTop + 20 * sc,
      }
    }

    // ── Click handler ──────────────────────────
    let trophyBounds = { x: 0, y: 0, w: 0, h: 0 }

    function handleClick(e) {
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      const { W, H, cx, sc } = dims()
      const plankY = H - 55 * sc
      const s = stateRef.current

      if (s.lidState === 'on') {
        const caseTop = plankY - 150 * sc
        const lidW = 138 * sc
        if (mx >= cx - lidW / 2 && mx <= cx + lidW / 2 && my >= caseTop - 14 * sc && my <= caseTop + 22 * sc) {
          s.lidState = 'falling'
          s.lidVY = -10
          s.lidVRot = (Math.random() > .5 ? 1 : -1) * (0.08 + Math.random() * .06)
          onSignup('lid_popped')
        }
      } else if (s.lidState === 'gone' && !s.clicked) {
        const tb = trophyBounds
        if (mx >= tb.x && mx <= tb.x + tb.w && my >= tb.y && my <= tb.y + tb.h) {
          s.clicked = true
          s.flash = 1
          canvas.style.cursor = 'crosshair'
          setTimeout(() => window.open(SIGNUP_URL, '_blank'), 350)
        }
      }
    }

    canvas.addEventListener('click', handleClick)

    // ── Mousemove ──────────────────────────────
    function handleMove(e) {
      const s = stateRef.current
      if (s.lidState !== 'gone' || s.clicked) return
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left, my = e.clientY - rect.top
      const tb = trophyBounds
      s.hover = mx >= tb.x && mx <= tb.x + tb.w && my >= tb.y && my <= tb.y + tb.h
      canvas.style.cursor = s.hover ? 'pointer' : 'crosshair'
    }
    canvas.addEventListener('mousemove', handleMove)

    // ── Render ─────────────────────────────────
    function loop() {
      const s = stateRef.current
      s.frame++
      s.pulse += 0.04
      const { W, H, cx, sc } = dims()
      ctx.clearRect(0, 0, W, H)

      const plankY = H - 55 * sc

      // lid physics
      if (s.lidState === 'falling') {
        s.lidY += s.lidVY
        s.lidVY += 1.4
        s.lidRot += s.lidVRot
        if (s.lidY > H + 80) { s.lidState = 'gone'; s.lidY = 0; s.lidRot = 0 }
      }

      drawStand(cx, plankY, sc)
      trophyBounds = drawTrophy(cx, plankY, sc)
      drawCase(cx, plankY, sc, s.lidY, s.lidRot)

      // flash overlay
      if (s.flash > 0) {
        ctx.fillStyle = `rgba(196,154,34,${s.flash * .5})`
        ctx.fillRect(0, 0, W, H)
        s.flash -= 0.06
        if (s.flash < 0) s.flash = 0
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
  }, [onSignup])

  return <canvas ref={canvasRef} className={styles.canvas} />
}

export default function App() {
  const { phrase, out } = usePhrase(PHRASES)
  const [hintVisible, setHintVisible] = useState(false)
  const [hintDismissed, setHintDismissed] = useState(false)
  const hintTimer = useRef(null)

  // start hint timer on mount
  useEffect(() => {
    hintTimer.current = setTimeout(() => {
      if (!hintDismissed) setHintVisible(true)
    }, 20000)
    return () => clearTimeout(hintTimer.current)
  }, [])

  function handleSignupEvent(event) {
    if (event === 'lid_popped') {
      // reset hint for trophy click
      clearTimeout(hintTimer.current)
      setHintVisible(false)
      setHintDismissed(false)
      hintTimer.current = setTimeout(() => setHintVisible(true), 20000)
    }
  }

  function dismissHint() {
    setHintVisible(false)
    setHintDismissed(true)
    clearTimeout(hintTimer.current)
  }

  return (
    <div className={styles.page}>
      <Nav />

      <div className={styles.wordmark}>
        <span className={styles.who}>WHO</span>
        <span className={styles.else}>ELSE</span>
      </div>

      <div className={styles.phraseRow}>
        <span className={`${styles.phrase} ${out ? styles.phraseOut : styles.phraseIn}`}>
          — {phrase}?
        </span>
      </div>

      <div className={styles.stage}>
        <TrophyCanvas onSignup={handleSignupEvent} />
      </div>

      {/* Hint strip */}
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

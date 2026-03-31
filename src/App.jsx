import { useState, useEffect, useRef } from 'react'
import styles from './App.module.css'

// ── Rotating phrases ──────────────────────────────────────────────
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

// ── Grain overlay (SVG data URI) ──────────────────────────────────
const GRAIN_URL = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`

// ── Jagged SVG path for the graffiti stroke under ELSE ────────────
function GraffitiStroke({ color = '#c93030' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 14"
      preserveAspectRatio="none"
      style={{ display: 'block', width: '100%', height: '10px', marginTop: '-4px' }}
    >
      <polyline
        fill={color}
        points="
          0,10 12,2 24,12 36,1 48,11 60,3 72,13 84,0 96,10 108,2 120,12
          132,1 144,11 156,3 168,13 180,0 192,10 204,2 216,12 228,1 240,11
          252,3 264,13 276,0 288,10 300,2 312,12 324,1 336,11 348,3 360,13
          372,0 384,10 400,4 400,14 0,14
        "
      />
    </svg>
  )
}

// ── Animated grid background ──────────────────────────────────────
function GridBg() {
  return <div className={styles.grid} aria-hidden="true" />
}

// ── Ghost watermark ───────────────────────────────────────────────
function Ghost() {
  return <div className={styles.ghost} aria-hidden="true">W/E</div>
}

// ── Rotating text hook ────────────────────────────────────────────
function useRotatingPhrase(phrases, interval = 3200) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const tick = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(i => (i + 1) % phrases.length)
        setVisible(true)
      }, 420)
    }, interval)
    return () => clearInterval(tick)
  }, [phrases.length, interval])

  return { phrase: phrases[index], visible }
}

// ── Nav ───────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
      <span className={styles.navLogo}>WHO ELSE</span>
      <span className={styles.navTag}>× Genesis Studios — ACU</span>
    </nav>
  )
}

// ── Hero ──────────────────────────────────────────────────────────
function Hero() {
  const { phrase, visible } = useRotatingPhrase(PHRASES)
  const heroRef = useRef(null)

  // Parallax on mouse move
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const onMove = (e) => {
      const { clientX, clientY } = e
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const dx = (clientX - cx) / cx
      const dy = (clientY - cy) / cy
      el.style.setProperty('--mx', `${dx * 12}px`)
      el.style.setProperty('--my', `${dy * 8}px`)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section className={styles.hero} ref={heroRef}>
      <GridBg />
      <Ghost />

      {/* Radial glow */}
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.heroInner}>

        {/* Eyebrow */}
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          Faith × Innovation × Kingdom Glory
        </p>

        {/* Main wordmark */}
        <div className={styles.wordmark}>
          {/* WHO — outline treatment */}
          <span className={styles.who}>WHO</span>

          {/* ELSE — solid + graffiti stroke */}
          <span className={styles.elseWrap}>
            <span className={styles.else}>ELSE</span>
            <GraffitiStroke />
          </span>
        </div>

        {/* Rotating question line */}
        <div className={styles.rotatingWrap} aria-live="polite">
          <span className={styles.rotatingPrefix}>— </span>
          <span
            className={`${styles.rotatingPhrase} ${visible ? styles.phraseIn : styles.phraseOut}`}
          >
            {phrase}
          </span>
          <span className={styles.cursor}>?</span>
        </div>

        {/* Divider */}
        <div className={styles.divider} aria-hidden="true" />

        {/* Sub copy */}
        <p className={styles.sub}>
          A faith-driven innovation collective for the next generation of builders.
          <br />
          Backed by <strong>Genesis Studios</strong> at Austin Christian University.
        </p>

        {/* CTA row */}
        <div className={styles.ctas}>
          <button className={styles.ctaPrimary}>Apply to Who Else</button>
          <button className={styles.ctaGhost}>Learn more</button>
        </div>

        {/* Bottom stat bar */}
        <div className={styles.statBar}>
          <div className={styles.stat}>
            <span className={styles.statNum}>ACU</span>
            <span className={styles.statLabel}>Austin Christian University</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>∞</span>
            <span className={styles.statLabel}>Kingdom Impact</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>Gen. 1</span>
            <span className={styles.statLabel}>First Cohort Open</span>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className={styles.scrollHint} aria-hidden="true">
        <span>scroll</span>
        <span className={styles.scrollLine} />
      </div>
    </section>
  )
}

// ── Mission strip ─────────────────────────────────────────────────
function MissionStrip() {
  return (
    <section className={styles.mission}>
      <div className={styles.missionInner}>
        <blockquote className={styles.missionQuote}>
          "Who else should be trusted to pioneer the future of technology?{' '}
          <em>Who else</em> will accept this responsibility with unwavering faith
          and commitment? <em>Who else</em> will make an impact that resonates
          for <strong>Kingdom glory?</strong>"
        </blockquote>
        <p className={styles.missionAttr}>— Who Else Mission Statement</p>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.footerBrand}>WHO ELSE × GENESIS STUDIOS</span>
      <span className={styles.footerTag}>
        © 2025 — Austin Christian University — Pioneering the Future for Kingdom Glory
      </span>
    </footer>
  )
}

// ── App ───────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      {/* Grain overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999,
          opacity: 0.04, backgroundImage: GRAIN_URL,
        }}
      />
      <Nav />
      <main>
        <Hero />
        <MissionStrip />
      </main>
      <Footer />
    </>
  )
}

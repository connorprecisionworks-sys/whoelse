import { useState, useEffect, useRef } from 'react'
import styles from './App.module.css'

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

function useRotatingPhrase(phrases, interval = 3000) {
  const [index, setIndex] = useState(0)
  const [state, setState] = useState('visible')

  useEffect(() => {
    const tick = setInterval(() => {
      setState('exit')
      setTimeout(() => {
        setIndex(i => (i + 1) % phrases.length)
        setState('enter')
        setTimeout(() => setState('visible'), 50)
      }, 380)
    }, interval)
    return () => clearInterval(tick)
  }, [phrases.length, interval])

  return { phrase: phrases[index], state }
}

const TICKER = [
  'Faith × Innovation',
  'Genesis Studios',
  'Austin Christian University',
  'Kingdom Glory',
  'Who Else Collective',
  'Pioneer The Future',
]

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

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
      <div className={styles.navLeft}>
        <span className={styles.navMark}>W/E</span>
        <span className={styles.navDivider} />
        <span className={styles.navSub}>Who Else</span>
      </div>
      <div className={styles.navRight}>
        <span className={styles.navItem}>Genesis Studios</span>
        <span className={styles.navItem}>ACU</span>
        <button className={styles.navCta}>Apply →</button>
      </div>
    </nav>
  )
}

function Hero() {
  const { phrase, state } = useRotatingPhrase(PHRASES)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const fn = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 18,
        y: (e.clientY / window.innerHeight - 0.5) * 10,
      })
    }
    window.addEventListener('mousemove', fn, { passive: true })
    return () => window.removeEventListener('mousemove', fn)
  }, [])

  return (
    <section className={styles.hero}>

      <span className={styles.heroIndex}>001</span>
      <span className={styles.heroYear}>EST. 2025</span>

      <div className={styles.typeBlock}>

        <div className={styles.whoRow}>
          <span className={styles.who}>WHO</span>
          <div className={styles.whoLabel}>
            <span>A faith-driven</span>
            <span>innovation collective</span>
          </div>
        </div>

        <div className={styles.elseRow}>
          <span className={styles.else}>ELSE</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 560 16"
            preserveAspectRatio="none"
            className={styles.jaggedStroke}
          >
            <polyline
              fill="#c93030"
              points="0,11 14,2 28,13 42,1 56,12 70,2 84,14 98,0 112,11 126,3 140,13 154,1 168,12 182,2 196,14 210,0 224,11 238,3 252,13 266,1 280,12 294,2 308,14 322,0 336,11 350,3 364,13 378,1 392,12 406,2 420,14 434,0 448,11 462,3 476,13 490,1 504,12 518,2 532,13 546,3 560,8 560,16 0,16"
            />
          </svg>
        </div>

        <div className={styles.phraseRow}>
          <span className={styles.phraseDash}>—</span>
          <span
            className={`${styles.phrase} ${styles[`phrase_${state}`]}`}
            aria-live="polite"
          >
            {phrase}
          </span>
          <span className={styles.phraseQ}>?</span>
        </div>

      </div>

      <div className={styles.heroMeta}>
        <div className={styles.metaCol}>
          <span className={styles.metaLabel}>Backed by</span>
          <span className={styles.metaVal}>Genesis Studios × ACU</span>
        </div>
        <div className={styles.metaCol}>
          <span className={styles.metaLabel}>Mission</span>
          <span className={styles.metaVal}>Kingdom Glory</span>
        </div>
        <div className={styles.metaCol}>
          <span className={styles.metaLabel}>Cohort</span>
          <span className={styles.metaVal}>Gen. 01 — Open</span>
        </div>
      </div>

      <div
        className={styles.ghostBg}
        aria-hidden="true"
        style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
      >
        WHO<br />ELSE
      </div>

    </section>
  )
}

function MissionSection() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className={`${styles.missionSection} ${visible ? styles.sectionVisible : ''}`} ref={ref}>
      <div className={styles.missionLeft}>
        <span className={styles.sectionNum}>002</span>
        <span className={styles.sectionLabel}>Mission</span>
      </div>
      <div className={styles.missionRight}>
        <blockquote className={styles.missionQ}>
          "Who else should be trusted to pioneer the future of technology?{' '}
          <em>Who else</em> will accept this responsibility with unwavering faith?{' '}
          <em>Who else</em> will make an impact that resonates for{' '}
          <strong>Kingdom glory?</strong>"
        </blockquote>
        <div className={styles.missionBy}>
          <span className={styles.missionLine} />
          <span>Who Else Collective — 2025</span>
        </div>
      </div>
    </section>
  )
}

function PillarsSection() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const pillars = [
    { num: '01', title: 'Faith-Driven', body: 'Every idea, every product, every line of code built with purpose rooted in Kingdom values.' },
    { num: '02', title: 'Founder-First', body: 'Genesis Studios at ACU backs the person before the pitch. Character before capital.' },
    { num: '03', title: 'Build in Public', body: 'Ship real work. Get real feedback. The work is the testimony — not the presentation deck.' },
    { num: '04', title: 'Legacy Over Exit', body: "We're not building for the acquisition. We're building for what lasts beyond us." },
  ]

  return (
    <section className={`${styles.pillarsSection} ${visible ? styles.sectionVisible : ''}`} ref={ref}>
      <div className={styles.pillarsHeader}>
        <span className={styles.sectionNum}>003</span>
        <h2 className={styles.pillarsTitle}>What we<br />stand for.</h2>
        <span className={styles.sectionLabel}>Pillars</span>
      </div>
      <div className={styles.pillarsGrid}>
        {pillars.map((p, i) => (
          <div key={p.num} className={styles.pillar} style={{ transitionDelay: `${i * 0.1}s` }}>
            <span className={styles.pillarNum}>{p.num}</span>
            <h3 className={styles.pillarTitle}>{p.title}</h3>
            <p className={styles.pillarBody}>{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function ApplySection() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className={`${styles.applySection} ${visible ? styles.sectionVisible : ''}`} ref={ref}>
      <div className={styles.applyInner}>
        <span className={styles.sectionNum} style={{ color: 'rgba(245,241,234,0.2)' }}>004</span>
        <h2 className={styles.applyTitle}>
          <span className={styles.applyWho}>WHO</span>
          <span className={styles.applyElse}>ELSE</span>
          <span className={styles.applyBut}>but you?</span>
        </h2>
        <p className={styles.applySub}>
          Genesis Studios at Austin Christian University is opening the first Who Else cohort.
          If you build, ship, and believe — this is for you.
        </p>
        <div className={styles.applyActions}>
          <button className={styles.applyBtn}>Apply to Cohort 01</button>
          <span className={styles.applyNote}>Applications reviewed on a rolling basis</span>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerBrand}>
          <span className={styles.footerMark}>W/E</span>
          <span className={styles.footerName}>Who Else</span>
        </div>
        <div className={styles.footerLinks}>
          <span>Genesis Studios</span>
          <span>Austin Christian University</span>
          <span>Apply</span>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <span>© 2025 Who Else × Genesis Studios — ACU</span>
        <span>Pioneering the Future for Kingdom Glory</span>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <Ticker />
      <main>
        <Hero />
        <MissionSection />
        <PillarsSection />
        <ApplySection />
      </main>
      <Footer />
    </>
  )
}

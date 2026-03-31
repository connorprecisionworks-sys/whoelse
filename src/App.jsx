import { useState, useEffect, useRef } from 'react'
import styles from './App.module.css'

const SIGNUP_URL = 'https://YOUR-SIGNUP-URL-HERE.com'

// ─── WHO ELSE OS ─────────────────────────────────────────────
const FILES = {
  about: {
    'README.txt': `WHO ELSE COLLECTIVE\n-------------------\n\nWho else should be trusted to pioneer the\nfuture of technology?\n\nFAITH-DRIVEN  · FOUNDER-FIRST\nBUILD IN PUBLIC · LEGACY OVER EXIT\n\nFOUNDED : 2025\nLOCATION: Austin, TX\nBACKED  : Genesis Studios @ ACU`,
    'Mission.txt': `MISSION\n-------\n\nGenesis Studios & Who Else exist to prove\nthat faith and innovation are co-architects\nof the future.\n\nPioneering the Future for Kingdom Glory.`,
    'Pillars.txt': `PILLARS\n-------\n\n01 FAITH-DRIVEN\n   The why before the what.\n\n02 FOUNDER-FIRST\n   Character before capital.\n\n03 BUILD IN PUBLIC\n   Ship real work. The work is the testimony.\n\n04 LEGACY OVER EXIT\n   Building for what lasts beyond us.`,
  },
  members: {
    'MEMBERS.txt': `MEMBERS — GEN. 01\n-----------------\n\nFounding member slots open.\n\nTo join:\n  > Run SIGNUP.EXE on the desktop`,
    '[ Your name here ].txt': `FOUNDING MEMBER SLOT\n--------------------\n\nThis slot is waiting to be filled.\n\nDouble-click SIGNUP.EXE to claim it.`,
  },
  mission: {
    'The_Call.txt': `THE CALL\n--------\n\n"Who else should be trusted to pioneer\nthe future of technology?\n\nWho else will accept this responsibility\nwith unwavering faith?\n\nWho else will make an impact that\nresonates for Kingdom glory?"\n\n            — Who Else, 2025`,
    'Values.txt': `VALUES\n------\n\nFAITH       Build from belief.\nINNOVATION  Build what never existed.\nCOMMUNITY   Iron sharpens iron.\nEXCELLENCE  Half-built ships sink.\nIMPACT      Kingdom glory is the metric.`,
  },
  genesis: {
    'About.txt': `GENESIS STUDIOS @ ACU\n---------------------\n\nThe VC studio arm of Austin Christian\nUniversity.\n\nWe back Who Else members who prove\nthemselves.\n\nReal funding. Real mentorship.`,
    'Partnership.txt': `GENESIS x WHO ELSE\n------------------\n\nWho Else is a talent pipeline for\nGenesis Studios.\n\nTop performers enter the Genesis pipeline\nfor direct mentorship and capital.`,
  },
  faq: {
    'FAQ.txt': `FAQ\n---\n\nQ: WHO CAN JOIN?\nA: Any student who builds things.\n\nQ: EXPERIENCE NEEDED?\nA: No. You need drive.\n\nQ: IS IT FREE?\nA: Yes. Resources unlock through\n   participation.\n\nQ: HOW TO APPLY?\nA: Run SIGNUP.EXE on the desktop.`,
  },
  contact: {
    'Contact.txt': `CONTACT\n-------\n\nGENERAL: hello@whoelse.co\nGENESIS: genesis@acu.edu\nPRESS  : press@whoelse.co\n\nInstagram: @whoelse.collective\nTwitter  : @whoelse\n\nAustin Christian University\nAustin, Texas`,
  },
}

const R = { borderTop:'2px solid #fff', borderLeft:'2px solid #fff', borderRight:'2px solid #808080', borderBottom:'2px solid #808080' }
const S = { borderTop:'2px solid #808080', borderLeft:'2px solid #808080', borderRight:'2px solid #fff', borderBottom:'2px solid #fff' }

function TxtIco() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28">
      <rect x="2" y="1" width="18" height="24" rx="1" fill="#fffef8"/>
      <rect x="2" y="1" width="18" height="24" rx="1" fill="none" stroke="#888" strokeWidth=".8"/>
      <path d="M16 1L20 5L16 5Z" fill="#ddd"/>
      <path d="M16 1L16 5L20 5" fill="none" stroke="#888" strokeWidth=".8"/>
      <rect x="4" y="9" width="11" height="1" fill="#aaa"/>
      <rect x="4" y="12" width="9" height="1" fill="#aaa"/>
      <rect x="4" y="15" width="10" height="1" fill="#aaa"/>
    </svg>
  )
}
function FolIco() {
  return (
    <svg width="32" height="28" viewBox="0 0 32 28">
      <path d="M1 7Q1 5 3 5L11 5L14 8L29 8Q31 8 31 10L31 25Q31 27 29 27L3 27Q1 27 1 25Z" fill="#c49a22" opacity=".9"/>
      <path d="M1 10L31 10L31 25Q31 27 29 27L3 27Q1 27 1 25Z" fill="#daa520"/>
      <path d="M1 10L31 10" stroke="rgba(255,255,255,.5)" strokeWidth=".8"/>
    </svg>
  )
}
function ExeIco() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32">
      <rect x="2" y="1" width="22" height="28" rx="1" fill="#fffef8"/>
      <rect x="2" y="1" width="22" height="28" rx="1" fill="none" stroke="#888" strokeWidth=".8"/>
      <path d="M18 1L24 7L18 7Z" fill="#ddd"/>
      <circle cx="24" cy="24" r="8" fill="#c93030"/>
      <text x="24" y="28" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="sans-serif" fontWeight="900">▶</text>
    </svg>
  )
}

function SignupExe({ onClose }) {
  const [lines, setLines] = useState([])
  const [prog, setProg] = useState(0)
  const ref = useRef(null)
  const LOG = [
    'C:\\WHOELSE> Initializing installer...',
    'Checking faith protocols.......... OK',
    'Connecting to Genesis Studios..... OK',
    'Allocating cohort slot............ OK',
    'Installing purpose.dll............ OK',
    'Writing registry entries.......... OK',
    'Installation complete!',
    'Launching application form...',
  ]
  useEffect(() => {
    let i = 0
    const t = setInterval(() => {
      if (i < LOG.length) {
        setLines(l => [...l, LOG[i]])
        setProg(Math.round((i + 1) / LOG.length * 100))
        i++
        if (ref.current) ref.current.scrollTop = 9999
      } else {
        clearInterval(t)
        setTimeout(() => { window.open(SIGNUP_URL, '_blank'); onClose() }, 700)
      }
    }, 400)
    return () => clearInterval(t)
  }, [])
  return (
    <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10, minWidth: 360 }}>
      <div style={{ fontFamily: 'var(--wf)', fontSize: 11, fontWeight: 700, color: '#c93030' }}>WHO_ELSE Setup Wizard</div>
      <div ref={ref} style={{ ...S, background: '#000', color: '#ccc', fontFamily: 'var(--wm)', fontSize: 11, padding: '6px 8px', height: 130, overflowY: 'auto', lineHeight: 1.7 }}>
        {lines.map((l, i) => <div key={i} style={{ color: i === lines.length - 1 ? '#c49a22' : '#ccc' }}>{l}</div>)}
      </div>
      <div>
        <div style={{ fontFamily: 'var(--wf)', fontSize: 11, marginBottom: 3 }}>Installing: {prog}%</div>
        <div style={{ ...S, height: 14, background: '#c0c0c0', padding: 2 }}>
          <div style={{ height: '100%', width: `${prog}%`, background: 'linear-gradient(90deg,#000080,#1084d0)', transition: 'width .3s' }} />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={onClose} style={{ fontFamily: 'var(--wf)', fontSize: 11, padding: '3px 14px', background: '#c0c0c0', ...R, cursor: 'default' }}>Cancel</button>
      </div>
    </div>
  )
}

function Notepad({ content, filename }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', padding: '2px 4px', borderBottom: '1px solid #808080', flexShrink: 0, gap: 2 }}>
        {['File', 'Edit', 'Search', 'Help'].map(m => (
          <span key={m} style={{ fontFamily: 'var(--wf)', fontSize: 11, padding: '1px 6px', cursor: 'default' }}>{m}</span>
        ))}
      </div>
      <textarea readOnly value={content} style={{ flex: 1, border: 'none', outline: 'none', resize: 'none', fontFamily: 'var(--wm)', fontSize: 11, padding: '4px 6px', background: '#fff', color: '#000', lineHeight: 1.7, minHeight: 140 }} />
      <div style={{ padding: '1px 6px', borderTop: '1px solid #808080', fontFamily: 'var(--wf)', fontSize: 11, color: '#444', flexShrink: 0 }}>{filename}</div>
    </div>
  )
}

function FolderBody({ folderKey, onOpenFile }) {
  const files = FILES[folderKey] || {}
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', gap: 4, padding: '2px 6px', borderBottom: '1px solid #808080', flexShrink: 0 }}>
        {['File', 'Edit', 'View', 'Help'].map(m => (
          <span key={m} style={{ fontFamily: 'var(--wf)', fontSize: 11, padding: '1px 6px', cursor: 'default' }}>{m}</span>
        ))}
      </div>
      <div style={{ ...S, margin: '3px 6px', padding: '1px 6px', background: '#fff', fontFamily: 'var(--wm)', fontSize: 11, flexShrink: 0 }}>
        C:\WHOELSE\{folderKey.toUpperCase()}
      </div>
      <div style={{ flex: 1, padding: 10, display: 'flex', flexWrap: 'wrap', gap: 12, alignContent: 'flex-start', overflowY: 'auto', background: '#fff' }}>
        {Object.entries(files).map(([name, content]) => (
          <div key={name} onDoubleClick={() => onOpenFile(name, content)}
            className={styles.fi}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '6px 4px', width: 68, cursor: 'default', textAlign: 'center', border: '1px solid transparent', borderRadius: 2 }}>
            {name.endsWith('.exe') ? <ExeIco /> : <TxtIco />}
            <span style={{ fontFamily: 'var(--wf)', fontSize: 10, lineHeight: 1.2, wordBreak: 'break-all', color: '#000' }}>{name}</span>
          </div>
        ))}
      </div>
      <div style={{ ...S, padding: '1px 8px', fontFamily: 'var(--wf)', fontSize: 11, color: '#444', flexShrink: 0, background: '#c0c0c0' }}>
        {Object.keys(files).length} object(s)
      </div>
    </div>
  )
}

let _topZ = 400
function OsWin({ title, icon, children, onClose, onFocus, zIndex, ix, iy, w = 420, h = 280 }) {
  const [pos, setPos] = useState({ x: ix, y: iy })
  const dragging = useRef(false), ds = useRef(null)
  function tdm(e) {
    if (e.target.dataset.wb) return
    dragging.current = true
    ds.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y }
    onFocus()
  }
  useEffect(() => {
    const mm = e => { if (!dragging.current) return; setPos({ x: ds.current.px + e.clientX - ds.current.mx, y: ds.current.py + e.clientY - ds.current.my }) }
    const mu = () => { dragging.current = false }
    window.addEventListener('mousemove', mm)
    window.addEventListener('mouseup', mu)
    return () => { window.removeEventListener('mousemove', mm); window.removeEventListener('mouseup', mu) }
  }, [])
  const isTop = zIndex >= _topZ - 1
  return (
    <div onMouseDown={onFocus} style={{ position: 'absolute', left: pos.x, top: pos.y, width: w, zIndex, background: '#c0c0c0', ...R }}>
      <div style={{ height: 22, background: `linear-gradient(90deg,${isTop ? '#000080' : '#808080'},${isTop ? '#1084d0' : '#909090'})`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 3px 0 5px', userSelect: 'none', cursor: 'default' }} onMouseDown={tdm}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, overflow: 'hidden' }}>
          {icon && <span style={{ fontSize: 11 }}>{icon}</span>}
          <span style={{ fontFamily: 'var(--wf)', fontSize: 11, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</span>
        </div>
        <button data-wb="1" onClick={onClose} style={{ width: 16, height: 14, background: '#c0c0c0', borderTop: '1px solid #fff', borderLeft: '1px solid #fff', borderRight: '1px solid #404040', borderBottom: '1px solid #404040', fontFamily: 'var(--wf)', fontSize: 10, fontWeight: 700, cursor: 'default', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
      </div>
      <div style={{ height: h, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>{children}</div>
    </div>
  )
}

function WhoElseOS() {
  const [wins, setWins] = useState([])
  const [topZ, setTopZ] = useState(400)
  const [sel, setSel] = useState(null)
  const [signup, setSignup] = useState(false)

  function nz() { const z = topZ + 1; setTopZ(z); _topZ = z; return z }
  function focus(id) { const z = nz(); setWins(ws => ws.map(w => w.id === id ? { ...w, z } : w)) }

  function open(key) {
    if (key === 'signup') { setSignup(true); return }
    if (wins.find(w => w.id === key)) { focus(key); return }
    const off = wins.length * 22, z = nz()
    const cfg = {
      about:   { t: 'About Who Else',        i: '📁', fk: 'about',   w: 400, h: 260 },
      members: { t: 'Members',               i: '📁', fk: 'members', w: 360, h: 240 },
      mission: { t: 'Mission',               i: '📁', fk: 'mission', w: 380, h: 260 },
      genesis: { t: 'Genesis Studios',       i: '📁', fk: 'genesis', w: 380, h: 240 },
      faq:     { t: 'FAQ.txt — Notepad',     i: '📄', note: true, fk: 'faq',     fn: 'FAQ.txt',     w: 360, h: 260 },
      contact: { t: 'Contact.txt — Notepad', i: '📄', note: true, fk: 'contact', fn: 'Contact.txt', w: 360, h: 240 },
    }
    const c = cfg[key]; if (!c) return
    setWins(ws => [...ws, { id: key, title: c.t, icon: c.i, type: c.note ? 'note' : 'folder', folderKey: c.fk, filename: c.fn, content: c.note ? Object.values(FILES[c.fk])[0] : null, x: 40 + off, y: 36 + off, z, w: c.w, h: c.h }])
  }

  function openFile(winId, name, content) {
    const id = `${winId}-${name}`
    if (wins.find(w => w.id === id)) { focus(id); return }
    const z = nz(), off = wins.length * 18
    setWins(ws => [...ws, { id, title: `${name} — Notepad`, icon: '📄', type: 'note', content, filename: name, x: 60 + off, y: 54 + off, z, w: 380, h: 280 }])
  }

  function close(id) { setWins(ws => ws.filter(w => w.id !== id)) }

  const ICONS = [
    { id: 'about',   l: 'About',      Ico: FolIco },
    { id: 'signup',  l: 'SIGNUP.EXE', Ico: ExeIco },
    { id: 'members', l: 'Members',    Ico: FolIco },
    { id: 'mission', l: 'Mission',    Ico: FolIco },
    { id: 'genesis', l: 'Genesis',    Ico: FolIco },
    { id: 'faq',     l: 'FAQ.txt',    Ico: TxtIco },
    { id: 'contact', l: 'Contact',    Ico: TxtIco },
  ]

  const timers = useRef({})
  function deskClick(e, id) {
    e.stopPropagation()
    setSel(id)
    if (timers.current[id]) { clearTimeout(timers.current[id]); timers.current[id] = null; open(id) }
    else { timers.current[id] = setTimeout(() => { timers.current[id] = null }, 380) }
  }

  return (
    <div onClick={() => setSel(null)} style={{ width: '100%', height: '100%', background: '#007b7b', backgroundImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,#007070 0%,#005858 100%)', position: 'relative', overflow: 'hidden', paddingBottom: 34, userSelect: 'none' }}>
      {/* watermark */}
      <div style={{ position: 'absolute', right: 10, top: 8, textAlign: 'right', pointerEvents: 'none', opacity: .1 }}>
        <div style={{ fontFamily: 'var(--wf)', fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '.1em' }}>WHO ELSE OS</div>
        <div style={{ fontFamily: 'var(--wf)', fontSize: 9, color: '#fff' }}>Genesis Studios © 2025</div>
      </div>
      {/* icons */}
      <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', flexDirection: 'column', gap: 4 }} onClick={e => e.stopPropagation()}>
        {ICONS.map(({ id, l, Ico }) => (
          <div key={id} onClick={e => deskClick(e, id)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '5px 3px', width: 62, border: sel === id ? '1px dotted rgba(255,255,255,.8)' : '1px solid transparent', background: sel === id ? '#000080' : 'transparent', cursor: 'default' }}>
            <Ico />
            <span style={{ fontFamily: 'var(--wf)', fontSize: 10, color: '#fff', textAlign: 'center', lineHeight: 1.2, textShadow: '1px 1px 1px #000,-1px -1px 1px #000', wordBreak: 'break-word', width: '100%' }}>{l}</span>
          </div>
        ))}
      </div>
      {/* windows */}
      {wins.map(w => (
        <OsWin key={w.id} title={w.title} icon={w.icon} zIndex={w.z} ix={w.x} iy={w.y} w={w.w} h={w.h} onClose={() => close(w.id)} onFocus={() => focus(w.id)}>
          {w.type === 'folder'
            ? <FolderBody folderKey={w.folderKey} onOpenFile={(n, c) => openFile(w.id, n, c)} />
            : <Notepad content={w.content} filename={w.filename} />}
        </OsWin>
      ))}
      {signup && (
        <OsWin title="WHO_ELSE Setup" icon="⚙️" zIndex={topZ + 50} ix={50} iy={36} w={390} h={220} onClose={() => setSignup(false)} onFocus={() => {}}>
          <SignupExe onClose={() => setSignup(false)} />
        </OsWin>
      )}
      {/* taskbar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 34, background: '#c0c0c0', ...R, display: 'flex', alignItems: 'center', padding: '2px 4px', gap: 4, zIndex: 9000 }}>
        <button onClick={() => open('about')} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '2px 10px', height: 26, background: '#c0c0c0', ...R, fontFamily: 'var(--wf)', fontSize: 11, fontWeight: 700, cursor: 'default', color: '#000' }}>
          <span style={{ fontSize: 13 }}>⊞</span> Start
        </button>
        <div style={{ width: 2, height: 24, borderLeft: '1px solid #808080', borderRight: '1px solid #fff' }} />
        {wins.map(w => (
          <button key={w.id} onClick={() => focus(w.id)} style={{ height: 24, padding: '0 8px', background: '#c0c0c0', ...R, fontFamily: 'var(--wf)', fontSize: 10, cursor: 'default', maxWidth: 130, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {w.icon} {w.title}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ ...S, padding: '1px 8px', fontFamily: 'var(--wf)', fontSize: 11 }}>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  )
}

// ─── HIGH-QUALITY ISOMETRIC CRT SETUP ────────────────────────
function CrtSvg() {
  return (
    <svg viewBox="0 0 300 340" className={styles.crtSvg} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="monTop" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3a3835"/><stop offset="50%" stopColor="#454340"/><stop offset="100%" stopColor="#2a2826"/>
        </linearGradient>
        <linearGradient id="monFront" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3c3a38"/><stop offset="100%" stopColor="#242220"/>
        </linearGradient>
        <linearGradient id="monSide" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#201e1c"/><stop offset="100%" stopColor="#141210"/>
        </linearGradient>
        <radialGradient id="screenGlow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#00e87a" stopOpacity="0.22"/>
          <stop offset="55%" stopColor="#00aa55" stopOpacity="0.09"/>
          <stop offset="100%" stopColor="#003322" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="box1top" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c8ac5a"/><stop offset="100%" stopColor="#a08830"/>
        </linearGradient>
        <linearGradient id="box1front" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#bc982e"/><stop offset="100%" stopColor="#8c6e18"/>
        </linearGradient>
        <linearGradient id="box1side" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7c6014"/><stop offset="100%" stopColor="#5c480c"/>
        </linearGradient>
        <linearGradient id="box2top" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#caae62"/><stop offset="100%" stopColor="#a28a3c"/>
        </linearGradient>
        <linearGradient id="box2front" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ba9a34"/><stop offset="100%" stopColor="#8a7020"/>
        </linearGradient>
        <linearGradient id="box2side" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7e641a"/><stop offset="100%" stopColor="#5c4c10"/>
        </linearGradient>
        <linearGradient id="towerTop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#343230"/><stop offset="100%" stopColor="#242220"/>
        </linearGradient>
        <linearGradient id="towerFront" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#302e2c"/><stop offset="100%" stopColor="#1e1c1a"/>
        </linearGradient>
        <linearGradient id="towerSide" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1c1a18"/><stop offset="100%" stopColor="#100e0c"/>
        </linearGradient>
      </defs>

      {/* ── FLOOR SHADOW ── */}
      <ellipse cx="148" cy="334" rx="135" ry="9" fill="rgba(0,0,0,0.6)"/>

      {/* ── BOXES ── */}
      {/* Box 1 large */}
      <polygon points="30,250 108,226 152,250 74,274" fill="url(#box1top)"/>
      <polygon points="30,250 74,274 74,322 30,298" fill="url(#box1front)"/>
      <polygon points="74,274 152,250 152,298 74,322" fill="url(#box1side)"/>
      <polygon points="46,254 108,232 108,238 46,260" fill="rgba(190,165,80,0.35)"/>
      <line x1="74" y1="274" x2="74" y2="322" stroke="rgba(0,0,0,0.18)" strokeWidth="1"/>
      <line x1="30" y1="250" x2="152" y2="250" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6"/>

      {/* Box 2 small, front-right */}
      <polygon points="112,232 168,216 200,232 144,248" fill="url(#box2top)"/>
      <polygon points="112,232 144,248 144,288 112,272" fill="url(#box2front)"/>
      <polygon points="144,248 200,232 200,272 144,288" fill="url(#box2side)"/>
      <polygon points="124,236 168,222 168,227 124,241" fill="rgba(185,160,75,0.3)"/>

      {/* ── TOWER ── */}
      <polygon points="192,172 256,152 284,168 220,188" fill="url(#towerTop)"/>
      <polygon points="192,172 220,188 220,302 192,286" fill="url(#towerFront)"/>
      <polygon points="220,188 284,168 284,282 220,302" fill="url(#towerSide)"/>
      {/* drive bays */}
      <rect x="195" y="198" width="21" height="6" rx="1" fill="#181614" stroke="#0e0c0a" strokeWidth="0.5"/>
      <rect x="195" y="207" width="21" height="5" rx="1" fill="#181614" stroke="#0e0c0a" strokeWidth="0.5"/>
      {/* power btn */}
      <circle cx="205" cy="222" r="5" fill="#1c1a18" stroke="#0e0c0a" strokeWidth="0.8"/>
      <circle cx="205" cy="222" r="3" fill="#c93030"/>
      <circle cx="205" cy="222" r="1.5" fill="#ff4444"/>
      {/* led */}
      <rect x="195" y="232" width="12" height="2" rx="1" fill="#00cc66" opacity="0.65"/>
      {/* vents */}
      {[248,256,264,272,280].map(y => (
        <line key={y} x1="195" y1={y} x2="215" y2={y} stroke="#0e0c0a" strokeWidth="0.8" opacity="0.7"/>
      ))}
      {/* side vents */}
      {[196,204,212,220,228].map((y,i) => (
        <polygon key={i} points={`${234+i*4},${y} ${254+i*4},${y-6} ${254+i*4},${y-3} ${234+i*4},${y+3}`}
          fill="none" stroke="rgba(0,0,0,0.45)" strokeWidth="0.7"/>
      ))}

      {/* ── MONITOR ── */}
      {/* top face */}
      <polygon points="56,76 166,44 210,68 100,100" fill="url(#monTop)"/>
      {/* front face */}
      <polygon points="56,76 100,100 100,216 56,192" fill="url(#monFront)"/>
      {/* right face */}
      <polygon points="100,100 210,68 210,184 100,216" fill="url(#monSide)"/>
      {/* top highlight edge */}
      <polygon points="56,76 166,44 168,48 58,80" fill="rgba(255,255,255,0.05)"/>

      {/* bezel recess front */}
      <polygon points="62,92 96,106 96,200 62,186" fill="#1a1816"/>
      {/* screen glass */}
      <polygon points="66,96 92,108 92,194 66,182" fill="#001c10"/>
      {/* phosphor glow */}
      <polygon points="66,96 92,108 92,194 66,182" fill="url(#screenGlow)"/>
      {/* scanlines */}
      {Array.from({length:14}).map((_,i) => (
        <line key={i} x1="66" y1={100+i*6.7} x2="92" y2={110+i*6.2}
          stroke="rgba(0,0,0,0.1)" strokeWidth="0.7"/>
      ))}
      {/* OS taskbar */}
      <polygon points="66,186 92,194 92,200 66,192" fill="#c0c0c0"/>
      <polygon points="68,187 76,189 76,193 68,191" fill="#d0ccc8"/>
      {/* folder icons */}
      {[0,1,2].map(i => (
        <polygon key={i}
          points={`${68+i*7},${104+i*0.5} ${74+i*7},${106+i*0.5} ${74+i*7},${112+i*0.5} ${68+i*7},${110+i*0.5}`}
          fill="#c49a22" opacity="0.8"/>
      ))}
      {/* header bar */}
      <polygon points="66,96 92,108 92,111 66,99" fill="#007070"/>
      {/* glass reflection */}
      <polygon points="66,96 76,100 70,116 66,113" fill="rgba(255,255,255,0.035)"/>

      {/* monitor side bezel detail */}
      {[112,120,128,136].map((y,i) => (
        <line key={i} x1={148+i*4} y1={y-2} x2={205-i*2} y2={y-12}
          stroke="rgba(0,0,0,0.25)" strokeWidth="1.1"/>
      ))}

      {/* monitor chin front */}
      <polygon points="56,212 100,228 100,216 56,200" fill="#222020"/>
      <polygon points="56,212 100,228 56,228" fill="#1a1818"/>
      {/* power LED on chin */}
      <circle cx="78" cy="220" r="2.5" fill="#00ff88"/>
      <circle cx="78" cy="220" r="1.5" fill="#88ffcc" opacity="0.8"/>

      {/* neck iso */}
      <polygon points="72,224 82,228 82,244 72,240" fill="#252220"/>
      <polygon points="82,228 104,222 104,238 82,244" fill="#1c1a18"/>
      <polygon points="72,224 104,216 104,222 82,228 72,224" fill="#2c2a28"/>

      {/* base iso */}
      <polygon points="48,240 116,220 138,232 70,252" fill="#2a2826"/>
      <polygon points="48,240 70,252 70,262 48,250" fill="#1e1c1a"/>
      <polygon points="70,252 138,232 138,242 70,262" fill="#161412"/>

      {/* ── KEYBOARD ── */}
      <polygon points="22,282 148,248 168,260 42,294" fill="#2e2c2a"/>
      <polygon points="22,282 42,294 42,302 22,290" fill="#222020"/>
      <polygon points="42,294 168,260 168,268 42,302" fill="#1c1a18"/>
      {/* keys */}
      {[0,1,2,3].map(row =>
        Array.from({length:10}).map((_,col) => (
          <polygon key={`${row}-${col}`}
            points={`${28+col*12+row*1.4},${278-row*8+col*0.4} ${37+col*12+row*1.4},${275-row*8+col*0.4} ${37+col*12+row*1.4},${280-row*8+col*0.4} ${28+col*12+row*1.4},${283-row*8+col*0.4}`}
            fill="#1c1a18" stroke="rgba(0,0,0,0.35)" strokeWidth="0.3"/>
        ))
      )}
      <polygon points="54,290 108,274 108,280 54,296" fill="#1c1a18" stroke="rgba(0,0,0,0.3)" strokeWidth="0.3"/>

      {/* ── MOUSE ── */}
      <ellipse cx="192" cy="278" rx="16" ry="22" fill="#2c2a28" transform="rotate(-12 192 278)"/>
      <ellipse cx="192" cy="278" rx="16" ry="22" fill="none" stroke="#1a1818" strokeWidth="0.8" transform="rotate(-12 192 278)"/>
      <line x1="184" y1="268" x2="200" y2="265" stroke="#1a1818" strokeWidth="0.8"/>
      <rect x="189" y="268" width="5" height="8" rx="2" fill="#1a1818" transform="rotate(-12 191 272)"/>

      {/* ── CABLES ── */}
      <path d="M100 216 Q112 234 140 248" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M92 180 Q106 202 128 214 Q148 222 165 244" fill="none" stroke="#0d0d0d" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

// ─── FILM GRAIN ──────────────────────────────────────────────
function GrainCanvas() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let raf
    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    function draw() {
      const w = canvas.width, h = canvas.height
      const img = ctx.createImageData(w, h)
      const d = img.data
      for (let i = 0; i < d.length; i += 4) {
        const v = Math.random() * 255 | 0
        d[i] = v; d[i+1] = v; d[i+2] = v; d[i+3] = 26
      }
      ctx.putImageData(img, 0, 0)
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className={styles.grain} />
}

// ─── MAIN SCENE ───────────────────────────────────────────────
export default function App() {
  // Phase: 'wall' | 'dollying' | 'zoomed'
  const [phase, setPhase] = useState('wall')

  function clickComputer() {
    if (phase !== 'wall') return
    setPhase('dollying')
    setTimeout(() => setPhase('zoomed'), 2400)
  }

  function exitOS() {
    setPhase('wall')
  }

  return (
    <div className={styles.scene}>

      {/* Film grain fixed over everything */}
      <GrainCanvas />

      {/* ── PERSPECTIVE CONTAINER ── */}
      <div className={`${styles.world} ${phase === 'dollying' ? styles.worldDolly : ''} ${phase === 'zoomed' ? styles.worldZoomed : ''}`}>

        {/* BRICK WALL */}
        <div className={styles.brick} />

        {/* GRAFFITI — real logo image centered on wall */}
        <div className={styles.graffiti}>
          <img
            src="/whoelse-logo.png"
            alt="Who Else"
            className={styles.graffitiImg}
            draggable={false}
          />
        </div>

        {/* SPOTLIGHT cone from ceiling */}
        <div className={styles.spotlight} aria-hidden="true" />
        {/* warm ground pool under light */}
        <div className={styles.groundLight} aria-hidden="true" />
        {/* tiny fixture dot at ceiling */}
        <div className={styles.spotlightFixture} aria-hidden="true" />

        {/* CRT COMPUTER — photo image in cardboard box */}
        <div
          className={`${styles.crt} ${phase !== 'wall' ? styles.crtFade : ''}`}
          onClick={clickComputer}
        >
          <div className={styles.crtGlow} />
          <div className={styles.crtHint}>click to enter ↓</div>

          {/* Screen glow overlay */}
          <div className={styles.screenGlow} />

          {/* The real computer photo — black bg already stripped */}
          <img
            src="/computer.png"
            alt="CRT Computer"
            className={styles.crtImg}
            draggable={false}
          />

          {/* Cardboard box SVG underneath */}
          <svg className={styles.crtBox} viewBox="0 0 440 180" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bt" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c8a84a"/><stop offset="100%" stopColor="#9e7e28"/>
              </linearGradient>
              <linearGradient id="bf" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#b8942e"/><stop offset="100%" stopColor="#7e6018"/>
              </linearGradient>
              <linearGradient id="bs" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8a6e1e"/><stop offset="100%" stopColor="#5e4c10"/>
              </linearGradient>
              <linearGradient id="bi" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#d4b050" stopOpacity="0.4"/><stop offset="100%" stopColor="#8a6820" stopOpacity="0.15"/>
              </linearGradient>
            </defs>

            {/* main box body */}
            {/* top flap — open/torn */}
            <polygon points="60,40 230,10 310,40 140,70" fill="url(#bt)"/>
            {/* front face */}
            <polygon points="60,40 140,70 140,165 60,135" fill="url(#bf)"/>
            {/* side face */}
            <polygon points="140,70 310,40 310,135 140,165" fill="url(#bs)"/>

            {/* inner box visible from top */}
            <polygon points="75,50 225,22 295,48 145,76" fill="#6a5018" opacity="0.6"/>

            {/* brown packing paper crumpled in box */}
            <path d="M80 62 Q110 55 130 65 Q155 58 175 67 Q200 60 220 68 Q240 55 265 64 Q285 56 295 62" 
              fill="none" stroke="#a07830" strokeWidth="6" strokeLinecap="round" opacity="0.7"/>
            <path d="M85 72 Q115 64 140 74 Q165 66 190 75 Q215 67 245 73 Q268 65 290 71"
              fill="none" stroke="#8a6420" strokeWidth="5" strokeLinecap="round" opacity="0.5"/>

            {/* tape strips */}
            <polygon points="155,12 235,22 235,27 155,17" fill="rgba(200,180,100,0.45)"/>
            <polygon points="60,40 140,70 140,76 60,46" fill="rgba(200,180,100,0.35)"/>

            {/* box edge wear/creases */}
            <line x1="140" y1="70" x2="140" y2="165" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5"/>
            <line x1="60" y1="40" x2="310" y2="40" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8"/>

            {/* bottom shadow */}
            <ellipse cx="185" cy="170" rx="155" ry="12" fill="rgba(0,0,0,0.45)"/>

            {/* small cable dangling out of box */}
            <path d="M290 90 Q330 85 360 100 Q390 112 410 108 Q430 104 435 115"
              fill="none" stroke="#2a2824" strokeWidth="3" strokeLinecap="round"/>
            <path d="M435 115 Q438 120 436 130"
              fill="none" stroke="#2a2824" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </div>

      </div>

      {/* ── MONITOR FRAME OVERLAY ── */}
      {phase === 'zoomed' && (
        <div className={styles.overlay}>
          <div className={styles.overlayBrick} />
          <div className={styles.monitor}>
            <div className={styles.monitorBezel}>
              <div className={styles.monitorScreen}>
                <WhoElseOS />
              </div>
            </div>
            <div className={styles.monitorChin}>
              <div className={styles.led} />
              <span className={styles.ledLabel}>WHO ELSE OS</span>
            </div>
            <div className={styles.monitorNeck} />
            <div className={styles.monitorBase} />
          </div>
          <button className={styles.exitBtn} onClick={exitOS}>← BACK TO WALL</button>
        </div>
      )}

    </div>
  )
}

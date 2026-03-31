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

// ─── CRT SVG ─────────────────────────────────────────────────
function CrtSvg() {
  return (
    <svg viewBox="0 0 240 210" className={styles.crtSvg} xmlns="http://www.w3.org/2000/svg">
      {/* shadow */}
      <ellipse cx="100" cy="205" rx="95" ry="7" fill="rgba(0,0,0,0.55)" />
      {/* tower */}
      <rect x="148" y="88" width="78" height="108" rx="5" fill="#2c2c2a" />
      <rect x="148" y="88" width="78" height="108" rx="5" fill="none" stroke="#3a3a38" strokeWidth="1" />
      <rect x="154" y="95" width="66" height="9" rx="2" fill="#1e1e1c" />
      <circle cx="210" cy="99" r="5" fill="#c93030" opacity="0.85" />
      <circle cx="210" cy="99" r="2.5" fill="#ff5555" />
      <rect x="154" y="118" width="35" height="7" rx="1.5" fill="#111" stroke="#444" strokeWidth=".5" />
      <rect x="154" y="130" width="28" height="4" rx="1" fill="#1a1a18" />
      <rect x="154" y="138" width="28" height="4" rx="1" fill="#1a1a18" />
      {/* monitor body */}
      <rect x="5" y="24" width="130" height="100" rx="9" fill="#2e2e2c" />
      <rect x="5" y="24" width="130" height="100" rx="9" fill="none" stroke="#454543" strokeWidth="1.2" />
      {/* bezel inner shadow */}
      <rect x="13" y="32" width="114" height="80" rx="5" fill="#111" />
      {/* screen */}
      <rect x="16" y="35" width="108" height="74" rx="3" fill="#001a12" />
      {/* screen glow */}
      <rect x="16" y="35" width="108" height="74" rx="3" fill="url(#sg)" />
      {/* scanlines */}
      <rect x="16" y="35" width="108" height="74" rx="3" fill="url(#sl)" opacity=".25" />
      {/* OS UI on screen */}
      <rect x="16" y="35" width="108" height="10" fill="#008080" />
      <text x="22" y="43" fill="#fff" fontSize="5.5" fontFamily="Courier New,monospace" fontWeight="700">WHO ELSE OS  v1.0</text>
      {/* taskbar strip */}
      <rect x="16" y="99" width="108" height="10" fill="#c0c0c0" />
      <rect x="18" y="101" width="26" height="6" rx="1" fill="#d4d0c8" stroke="#808080" strokeWidth=".5" />
      <text x="31" y="106" textAnchor="middle" fill="#000" fontSize="4" fontFamily="Courier New,monospace" fontWeight="700">⊞ Start</text>
      <text x="116" y="106" textAnchor="middle" fill="#000" fontSize="4" fontFamily="Courier New,monospace">12:00</text>
      {/* fake folder icons */}
      {[0, 1, 2].map(i => (
        <g key={i} transform={`translate(${22 + i * 18}, 50)`}>
          <rect width="13" height="10" rx="1" fill="#c49a22" opacity=".8" />
          <rect y="3" width="13" height="10" rx="1" fill="#daa520" opacity=".9" />
        </g>
      ))}
      {/* screen reflection */}
      <path d="M16 35L50 35L36 55L16 50Z" fill="rgba(255,255,255,.025)" />
      {/* monitor chin */}
      <rect x="5" y="124" width="130" height="12" rx="0" fill="#2a2a28" />
      <circle cx="70" cy="130" r="3.5" fill="#00cc66" opacity=".7" />
      <circle cx="70" cy="130" r="2" fill="#00ff88" />
      {/* neck */}
      <rect x="55" y="136" width="30" height="16" rx="2" fill="#272725" />
      {/* base */}
      <rect x="28" y="150" width="84" height="9" rx="3" fill="#222" />
      <rect x="32" y="145" width="76" height="7" rx="2" fill="#2c2c2a" />
      {/* keyboard */}
      <rect x="5" y="172" width="118" height="26" rx="3" fill="#2c2c2a" stroke="#3a3a38" strokeWidth=".8" />
      {[0,1,2].map(row => Array.from({length:12}).map((_, col) => (
        <rect key={`${row}-${col}`} x={9 + col * 9} y={175 + row * 7} width="7" height="5" rx="1" fill="#1e1e1c" stroke="#2e2e2c" strokeWidth=".4"/>
      )))}
      {/* mouse */}
      <rect x="132" y="175" width="24" height="32" rx="11" fill="#2c2c2a" stroke="#3a3a38" strokeWidth=".8" />
      <line x1="144" y1="175" x2="144" y2="193" stroke="#222" strokeWidth=".8" />
      {/* defs */}
      <defs>
        <radialGradient id="sg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00ff88" stopOpacity=".1" />
          <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
        </radialGradient>
        <pattern id="sl" patternUnits="userSpaceOnUse" width="1" height="4">
          <rect width="1" height="2" fill="#000" opacity="1" />
        </pattern>
      </defs>
    </svg>
  )
}

// ─── MAIN SCENE ───────────────────────────────────────────────
export default function App() {
  // Phase: 'wall' | 'dollying' | 'zoomed'
  const [phase, setPhase] = useState('wall')

  function clickComputer() {
    if (phase !== 'wall') return
    setPhase('dollying')
    // after dolly animation completes, snap to zoomed
    setTimeout(() => setPhase('zoomed'), 2200)
  }

  function exitOS() {
    setPhase('wall')
  }

  return (
    <div className={styles.scene}>

      {/* ── PERSPECTIVE CONTAINER — this is what dollies ── */}
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

        {/* SPOTLIGHT — cone of light over the computer area */}
        <div className={styles.spotlight} aria-hidden="true" />

        {/* GROUND LIGHT POOL — warm puddle under CRT */}
        <div className={styles.groundLight} aria-hidden="true" />

        {/* CRT COMPUTER — bottom left */}
        <div
          className={`${styles.crt} ${phase !== 'wall' ? styles.crtFade : ''}`}
          onClick={clickComputer}
        >
          <div className={styles.crtGlow} />
          <div className={styles.crtHint}>click to enter ↓</div>
          <CrtSvg />
        </div>

      </div>{/* /world */}

      {/* ── MONITOR FRAME OVERLAY — shown when zoomed ── */}
      {phase === 'zoomed' && (
        <div className={styles.overlay}>
          {/* brick still visible as background */}
          <div className={styles.overlayBrick} />

          {/* CRT monitor housing */}
          <div className={styles.monitor}>
            <div className={styles.monitorBezel}>
              {/* screen contains the full OS */}
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

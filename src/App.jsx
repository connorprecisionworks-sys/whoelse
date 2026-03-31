import { useState, useEffect, useRef } from 'react'
import styles from './App.module.css'

// ── REPLACE with your signup URL ──────────────────────────────
const SIGNUP_URL = 'https://YOUR-SIGNUP-URL-HERE.com'

// ═══════════════════════════════════════════════════════════════
// FILE CONTENT
// ═══════════════════════════════════════════════════════════════
const FILES = {
  about: {
    'README.txt': `WHO ELSE COLLECTIVE
-------------------

Who else should be trusted to pioneer the future
of technology? Who else will accept this
responsibility with unwavering faith and commitment?

We are the ones who will lead, innovate, and inspire.
Transforming vision into reality and leaving a legacy
of purpose and faith.

Who Else is a faith-driven innovation collective for
the next generation of builders.

FOUNDED : 2025
LOCATION: Austin, TX
BACKED  : Genesis Studios @ ACU`,

    'Mission.txt': `MISSION STATEMENT
-----------------

Genesis Studios & Who Else exist to prove that
faith and innovation are not opposites — they are
co-architects of the future.

We invest in people who build for something bigger.
The ultimate metric is not revenue or users.

It's: did we make the world more reflective of
its Creator?

Pioneering the Future for Kingdom Glory.`,

    'Pillars.txt': `WHO ELSE PILLARS
----------------

01  FAITH-DRIVEN
    Every idea built with purpose rooted in
    Kingdom values. The why before the what.

02  FOUNDER-FIRST
    We back the person before the pitch.
    Character before capital.

03  BUILD IN PUBLIC
    Ship real work. Get real feedback.
    The work is the testimony.

04  LEGACY OVER EXIT
    Not building for the acquisition.
    Building for what lasts beyond us.`,
  },

  genesis: {
    'About.txt': `GENESIS STUDIOS @ ACU
---------------------

Genesis Studios is the venture capital studio
arm of Austin Christian University.

We seed, build, and scale ventures with purpose
at their core.

Genesis Studios is the infrastructure behind
Who Else. The network. The capital. The wisdom.

SERVICES:
  - Venture Building & Investment
  - Founder Mentorship Pipeline
  - Faith x Technology Integration
  - Ecosystem & Partner Network`,

    'Partnership.txt': `GENESIS x WHO ELSE
------------------

Who Else is not just a collective — it is a
proprietary talent pipeline for Genesis Studios.

The best young founders in the country,
identified early, nurtured intentionally,
funneled into the Genesis portfolio.

HOW IT WORKS:
  1. Join Who Else collective
  2. Participate in Mission Drops
  3. Top performers enter Genesis pipeline
  4. Direct paths to mentorship + capital

The answer to "who else?" is already in the room.`,
  },

  mission: {
    'The_Call.txt': `THE CALL
--------

"Who else should be trusted to pioneer the
future of technology?

Who else will accept this responsibility with
unwavering faith and commitment?

Who else will make an impact that resonates
for Kingdom glory?

We are the ones who will lead, innovate,
and inspire — transforming vision into reality
and leaving a legacy of purpose and faith."

                        — Who Else, 2025`,

    'Values.txt': `CORE VALUES
-----------

FAITH       We build from a foundation of belief.
INNOVATION  We build what has never existed.
COMMUNITY   Iron sharpens iron. We grow together.
EXCELLENCE  Half-built ships sink. We ship complete.
IMPACT      Kingdom glory is the ultimate metric.`,
  },

  members: {
    'MEMBERS.txt': `CURRENT MEMBERS — GEN. 01
-------------------------

This folder contains founding member profiles.
Profiles are added as members join.

To add your profile here:
  > Run SIGNUP.EXE on the desktop

Current cohort: OPEN FOR APPLICATIONS

[ Founding member slots available ]`,

    '[ Add your name here ].txt': `FOUNDING MEMBER SLOT
--------------------

NAME  : [ Your Name ]
ROLE  : [ Your Role ]
COHORT: Gen. 01

This slot is waiting to be filled.

To claim it:
  > Double-click SIGNUP.EXE on the desktop
  > Complete the application
  > Join Who Else Collective`,
  },

  faq: {
    'FAQ.txt': `FREQUENTLY ASKED QUESTIONS
--------------------------

Q: WHO CAN JOIN?
A: Any student who builds things. Design,
   code, business — if you make something
   real, you belong here.

Q: DO I NEED EXPERIENCE?
A: No. You need drive. Experience follows
   action.

Q: IS IT FREE?
A: Yes. Genesis Studios resources unlock
   through participation.

Q: WHAT ARE MISSION DROPS?
A: Weekly innovation challenges. Best
   solutions get noticed by Genesis Studios.
   Some win prizes.

Q: WHAT IS GENESIS STUDIOS?
A: The VC studio arm of ACU. They back Who
   Else members who prove themselves.

Q: HOW DO I APPLY?
A: Double-click SIGNUP.EXE on the desktop.`,
  },

  contact: {
    'Contact.txt': `CONTACT WHO ELSE
----------------

GENERAL  : hello@whoelse.co
GENESIS  : genesis@acu.edu
PRESS    : press@whoelse.co

SOCIAL:
  Instagram : @whoelse.collective
  Twitter/X : @whoelse

LOCATION:
  Austin Christian University
  Austin, Texas

---
To apply: run SIGNUP.EXE`,
  },
}

// ═══════════════════════════════════════════════════════════════
// W95 ICON SVGs
// ═══════════════════════════════════════════════════════════════
function IconFolder({ gold }) {
  const c = gold ? '#c49a22' : '#c8a040'
  return (
    <svg width="32" height="28" viewBox="0 0 32 28" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 7 Q1 5 3 5 L11 5 L14 8 L29 8 Q31 8 31 10 L31 25 Q31 27 29 27 L3 27 Q1 27 1 25 Z" fill={c}/>
      <path d="M1 10 L31 10 L31 25 Q31 27 29 27 L3 27 Q1 27 1 25 Z" fill={gold ? '#daa520' : '#dba030'}/>
      {/* highlight top */}
      <path d="M1 10 L31 10" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8"/>
      {/* shadow */}
      <path d="M1 27 L29 27" stroke="rgba(0,0,0,0.3)" strokeWidth="0.5"/>
    </svg>
  )
}

function IconExe() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      {/* document */}
      <rect x="2" y="1" width="22" height="28" rx="1" fill="#fffef8"/>
      <rect x="2" y="1" width="22" height="28" rx="1" fill="none" stroke="#888" strokeWidth="0.8"/>
      {/* dog-ear */}
      <path d="M18 1 L24 7 L18 7 Z" fill="#ddd"/>
      <path d="M18 1 L18 7 L24 7" fill="none" stroke="#888" strokeWidth="0.8"/>
      {/* red gear badge */}
      <circle cx="24" cy="24" r="8" fill="#c93030"/>
      <text x="24" y="28" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="sans-serif" fontWeight="900">▶</text>
      {/* text lines */}
      <rect x="5" y="11" width="13" height="1.5" fill="#999"/>
      <rect x="5" y="15" width="10" height="1.5" fill="#999"/>
      <rect x="5" y="19" width="12" height="1.5" fill="#999"/>
    </svg>
  )
}

function IconTxt() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="1" width="22" height="28" rx="1" fill="#fffef8"/>
      <rect x="3" y="1" width="22" height="28" rx="1" fill="none" stroke="#888" strokeWidth="0.8"/>
      <path d="M19 1 L25 7 L19 7 Z" fill="#ddd"/>
      <path d="M19 1 L19 7 L25 7" fill="none" stroke="#888" strokeWidth="0.8"/>
      <rect x="6" y="11" width="13" height="1.2" fill="#aaa"/>
      <rect x="6" y="14" width="10" height="1.2" fill="#aaa"/>
      <rect x="6" y="17" width="12" height="1.2" fill="#aaa"/>
      <rect x="6" y="20" width="8" height="1.2" fill="#aaa"/>
    </svg>
  )
}

function IconPerson() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="28" height="28" rx="2" fill="#e8e0d0"/>
      <rect x="2" y="2" width="28" height="28" rx="2" fill="none" stroke="#888" strokeWidth="0.8"/>
      <circle cx="16" cy="12" r="6" fill="#bbb"/>
      <path d="M4 28 Q4 20 16 20 Q28 20 28 28" fill="#ccc"/>
    </svg>
  )
}

// ═══════════════════════════════════════════════════════════════
// W95 BEVEL helpers (inline styles)
// ═══════════════════════════════════════════════════════════════
const RAISED = {
  borderTop:    '2px solid #ffffff',
  borderLeft:   '2px solid #ffffff',
  borderRight:  '2px solid #808080',
  borderBottom: '2px solid #808080',
}

const SUNKEN = {
  borderTop:    '2px solid #808080',
  borderLeft:   '2px solid #808080',
  borderRight:  '2px solid #ffffff',
  borderBottom: '2px solid #ffffff',
}

const RAISED_SM = {
  borderTop:    '1px solid #ffffff',
  borderLeft:   '1px solid #ffffff',
  borderRight:  '1px solid #808080',
  borderBottom: '1px solid #808080',
}

// ═══════════════════════════════════════════════════════════════
// SIGNUP EXE
// ═══════════════════════════════════════════════════════════════
function SignupExe({ onClose }) {
  const [lines, setLines] = useState([])
  const [progress, setProgress] = useState(0)
  const logRef = useRef(null)

  const LOG = [
    'C:\\WHOELSE> Initializing installer...',
    'Checking system requirements... OK',
    'Verifying faith protocols......... OK',
    'Loading Kingdom modules........... OK',
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
        setProgress(Math.round(((i + 1) / LOG.length) * 100))
        i++
        if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
      } else {
        clearInterval(t)
        setTimeout(() => { window.open(SIGNUP_URL, '_blank'); onClose() }, 700)
      }
    }, 380)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12, minWidth: 420 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <IconExe />
        <div>
          <div style={{ fontFamily: 'var(--w95font)', fontSize: 11, fontWeight: 700 }}>WHO_ELSE Setup</div>
          <div style={{ fontFamily: 'var(--w95font)', fontSize: 11, color: '#444' }}>Please wait while Who Else Collective is installed.</div>
        </div>
      </div>
      <div ref={logRef} style={{ ...SUNKEN, background: '#000', color: '#c8c8c8', fontFamily: 'var(--w95mono)', fontSize: 11, padding: '8px 10px', height: 160, overflowY: 'auto', lineHeight: 1.7 }}>
        {lines.map((l, i) => (
          <div key={i} style={{ color: i === lines.length - 1 ? '#c49a22' : '#c8c8c8' }}>{l}</div>
        ))}
        {lines.length > 0 && <span style={{ color: '#fff', animation: 'blink 1s step-end infinite' }}>_</span>}
      </div>
      <div>
        <div style={{ fontFamily: 'var(--w95font)', fontSize: 11, marginBottom: 4 }}>Installing: {progress}%</div>
        <div style={{ ...SUNKEN, height: 16, background: '#c0c0c0', padding: 2 }}>
          <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg,#000080,#0000c8)', transition: 'width 0.3s' }} />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className={styles.w95btn} onClick={onClose}>Cancel</button>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// NOTEPAD VIEWER
// ═══════════════════════════════════════════════════════════════
function Notepad({ filename, content, onClose }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      {/* menu bar */}
      <div style={{ display: 'flex', gap: 0, padding: '2px 4px', borderBottom: '1px solid #808080', flexShrink: 0 }}>
        {['File', 'Edit', 'Search', 'Help'].map(m => (
          <span key={m} style={{ fontFamily: 'var(--w95font)', fontSize: 11, padding: '2px 8px', cursor: 'default' }}>{m}</span>
        ))}
      </div>
      <textarea
        readOnly
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          resize: 'none',
          fontFamily: 'var(--w95mono)',
          fontSize: 12,
          lineHeight: 1.7,
          padding: '6px 8px',
          background: '#fff',
          color: '#000',
          overflowY: 'auto',
          minHeight: 200,
        }}
        value={content}
      />
      <div style={{ padding: '2px 6px', borderTop: '1px solid #808080', fontFamily: 'var(--w95font)', fontSize: 11, color: '#444', flexShrink: 0 }}>
        {filename}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// FOLDER WINDOW BODY
// ═══════════════════════════════════════════════════════════════
function FolderBody({ folderKey, onOpenFile }) {
  const files = FILES[folderKey] || {}
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* toolbar */}
      <div style={{ display: 'flex', gap: 6, padding: '4px 6px', borderBottom: '1px solid #808080', flexShrink: 0 }}>
        {['File', 'Edit', 'View', 'Help'].map(m => (
          <span key={m} style={{ fontFamily: 'var(--w95font)', fontSize: 11, padding: '1px 6px', cursor: 'default' }}>{m}</span>
        ))}
      </div>
      {/* address bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 6px', borderBottom: '1px solid #808080', flexShrink: 0 }}>
        <span style={{ fontFamily: 'var(--w95font)', fontSize: 11, color: '#444' }}>Address</span>
        <div style={{ ...SUNKEN, flex: 1, padding: '1px 6px', background: '#fff', fontFamily: 'var(--w95mono)', fontSize: 11 }}>
          C:\WHOELSE\{folderKey.toUpperCase()}
        </div>
      </div>
      {/* file area */}
      <div style={{ flex: 1, padding: 12, display: 'flex', flexWrap: 'wrap', gap: 16, alignContent: 'flex-start', overflowY: 'auto', background: '#fff' }}>
        {Object.entries(files).map(([name, content]) => (
          <div
            key={name}
            className={styles.fileIcon}
            onDoubleClick={() => onOpenFile(name, content)}
            title={`Double-click to open ${name}`}
          >
            {name.endsWith('.exe') ? <IconExe /> : name.endsWith('MEMBERS.txt') || name.startsWith('[') ? <IconPerson /> : <IconTxt />}
            <span className={styles.fileIconLabel}>{name}</span>
          </div>
        ))}
      </div>
      {/* status bar */}
      <div style={{ ...SUNKEN, padding: '2px 8px', fontFamily: 'var(--w95font)', fontSize: 11, color: '#444', flexShrink: 0, display: 'flex', gap: 12 }}>
        <span>{Object.keys(files).length} object(s)</span>
        <span>Double-click to open</span>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// W95 WINDOW
// ═══════════════════════════════════════════════════════════════
function W95Window({ id, title, icon, children, onClose, onFocus, zIndex, initialX, initialY, width = 480, height = 340 }) {
  const [pos, setPos] = useState({ x: initialX, y: initialY })
  const [minimized, setMinimized] = useState(false)
  const dragging = useRef(false)
  const dragStart = useRef(null)
  const [active, setActive] = useState(true)

  function titleMouseDown(e) {
    if (e.target.closest('[data-wbtn]')) return
    dragging.current = true
    dragStart.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y }
    onFocus()
  }

  useEffect(() => {
    function onMove(e) {
      if (!dragging.current) return
      const dx = e.clientX - dragStart.current.mx
      const dy = e.clientY - dragStart.current.my
      setPos({ x: dragStart.current.px + dx, y: dragStart.current.py + dy })
    }
    function onUp() { dragging.current = false }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
  }, [])

  if (minimized) return null

  return (
    <div
      style={{ position: 'fixed', left: pos.x, top: pos.y, width, zIndex, ...RAISED, background: '#c0c0c0' }}
      onMouseDown={onFocus}
    >
      {/* Title bar */}
      <div
        style={{
          height: 22,
          background: zIndex > 200 ? 'linear-gradient(90deg,#000080,#1084d0)' : '#808080',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 3px 0 6px',
          cursor: 'default',
          userSelect: 'none',
        }}
        onMouseDown={titleMouseDown}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, overflow: 'hidden' }}>
          {icon && <span style={{ fontSize: 12, flexShrink: 0 }}>{icon}</span>}
          <span style={{ fontFamily: 'var(--w95font)', fontSize: 11, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {title}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
          <button data-wbtn="min" className={styles.w95winbtn} onClick={() => setMinimized(true)}>_</button>
          <button data-wbtn="max" className={styles.w95winbtn}>□</button>
          <button data-wbtn="cls" className={`${styles.w95winbtn} ${styles.w95winbtnClose}`} onClick={onClose}>✕</button>
        </div>
      </div>
      {/* Body */}
      <div style={{ height, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// DESKTOP ICON
// ═══════════════════════════════════════════════════════════════
function DesktopIcon({ id, label, IconComp, onOpen, selected, onSelect }) {
  const timer = useRef(null)

  function onClick(e) {
    e.stopPropagation()
    onSelect(id)
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = null
      onOpen()
    } else {
      timer.current = setTimeout(() => { timer.current = null }, 400)
    }
  }

  return (
    <div
      className={`${styles.deskIcon} ${selected ? styles.deskIconSel : ''}`}
      onClick={onClick}
    >
      <div className={styles.deskIconImg}><IconComp /></div>
      <span className={styles.deskIconLabel}>{label}</span>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// TASKBAR
// ═══════════════════════════════════════════════════════════════
function W95Taskbar({ windows, onTaskClick, onStartClick, startOpen, onToggleStart }) {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () => {
      const n = new Date()
      setTime(n.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    }
    tick(); const t = setInterval(tick, 10000); return () => clearInterval(t)
  }, [])

  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 36, background: '#c0c0c0', ...RAISED, display: 'flex', alignItems: 'center', padding: '2px 4px', gap: 4, zIndex: 9000 }}>
      {/* Start */}
      <button
        className={styles.startBtn}
        onClick={onToggleStart}
        style={{ background: startOpen ? '#c0c0c0' : undefined, ...(startOpen ? SUNKEN : {}) }}
      >
        <span style={{ fontSize: 14 }}>⊞</span>
        <span style={{ fontFamily: 'var(--w95font)', fontSize: 12, fontWeight: 700 }}>Start</span>
      </button>

      <div style={{ width: 2, height: 28, borderLeft: '1px solid #808080', borderRight: '1px solid #fff' }} />

      {/* Open windows */}
      <div style={{ flex: 1, display: 'flex', gap: 4, overflow: 'hidden' }}>
        {windows.map(w => (
          <button key={w.id} className={styles.taskBtn} onClick={() => onTaskClick(w.id)}
            style={{ fontFamily: 'var(--w95font)', fontSize: 11, maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {w.icon && <span style={{ marginRight: 4 }}>{w.icon}</span>}
            {w.title}
          </button>
        ))}
      </div>

      {/* Clock */}
      <div style={{ ...SUNKEN, padding: '2px 10px', fontFamily: 'var(--w95font)', fontSize: 11, flexShrink: 0 }}>
        {time}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// START MENU
// ═══════════════════════════════════════════════════════════════
function StartMenu({ onClose, onOpenItem }) {
  const items = [
    { label: 'About Who Else', key: 'about', icon: '📁' },
    { label: 'Members', key: 'members', icon: '📁' },
    { label: 'Mission', key: 'mission', icon: '📁' },
    { label: 'Genesis Studios', key: 'genesis', icon: '📁' },
    { label: 'FAQ', key: 'faq', icon: '📄' },
    { label: 'Contact', key: 'contact', icon: '📄' },
    null,
    { label: 'SIGNUP.EXE', key: 'signup', icon: '⚙️' },
  ]

  return (
    <div style={{ position: 'fixed', bottom: 36, left: 0, width: 200, background: '#c0c0c0', ...RAISED, zIndex: 9500 }}>
      {/* Brand strip */}
      <div style={{ display: 'flex', background: 'linear-gradient(180deg,#000080,#1084d0)', padding: '6px 8px', alignItems: 'flex-end' }}>
        <span style={{ fontFamily: 'var(--w95font)', fontSize: 11, fontWeight: 700, color: '#c49a22', letterSpacing: '0.1em', writingMode: 'vertical-rl', transform: 'rotate(180deg)', marginRight: 6 }}>
          Who Else OS
        </span>
        <span style={{ fontFamily: 'var(--w95font)', fontSize: 9, color: 'rgba(255,255,255,0.5)', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          Genesis Studios © 2025
        </span>
      </div>
      <div>
        {items.map((item, i) =>
          item === null ? (
            <div key={i} style={{ height: 1, background: '#808080', margin: '2px 4px' }} />
          ) : (
            <div
              key={item.key}
              className={styles.startMenuItem}
              onClick={() => { onOpenItem(item.key); onClose() }}
            >
              <span style={{ marginRight: 8 }}>{item.icon}</span>
              <span style={{ fontFamily: 'var(--w95font)', fontSize: 11 }}>{item.label}</span>
            </div>
          )
        )}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// DESKTOP ICONS CONFIG
// ═══════════════════════════════════════════════════════════════
const ICONS = [
  { id: 'about',   label: 'About Who Else',  Ico: () => <IconFolder gold />,  title: 'About Who Else',  icon: '📁', w: 480, h: 320, folderKey: 'about' },
  { id: 'signup',  label: 'SIGNUP.EXE',      Ico: IconExe,                    title: 'SIGNUP.EXE',      icon: '⚙️' },
  { id: 'members', label: 'Members',         Ico: () => <IconFolder gold />,  title: 'Members',         icon: '📁', w: 480, h: 300, folderKey: 'members' },
  { id: 'mission', label: 'Mission',         Ico: () => <IconFolder gold />,  title: 'Mission',         icon: '📁', w: 480, h: 300, folderKey: 'mission' },
  { id: 'genesis', label: 'Genesis Studios', Ico: () => <IconFolder gold />,  title: 'Genesis Studios', icon: '📁', w: 480, h: 300, folderKey: 'genesis' },
  { id: 'faq',     label: 'FAQ.txt',         Ico: IconTxt,                    title: 'FAQ — Notepad',   icon: '📄', isFile: true, fileKey: 'faq', fileName: 'FAQ.txt' },
  { id: 'contact', label: 'Contact.txt',     Ico: IconTxt,                    title: 'Contact — Notepad', icon: '📄', isFile: true, fileKey: 'contact', fileName: 'Contact.txt' },
]

// ═══════════════════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [windows, setWindows] = useState([])
  const [topZ, setTopZ] = useState(300)
  const [selected, setSelected] = useState(null)
  const [showSignup, setShowSignup] = useState(false)
  const [startOpen, setStartOpen] = useState(false)
  const [cursor, setCursor] = useState({ x: -100, y: -100 })

  useEffect(() => {
    const fn = e => setCursor({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', fn, { passive: true })
    return () => window.removeEventListener('mousemove', fn)
  }, [])

  function nextZ() {
    const z = topZ + 1; setTopZ(z); return z
  }

  function focusWin(id) {
    const z = nextZ()
    setWindows(ws => ws.map(w => w.id === id ? { ...w, z } : w))
  }

  function openItem(key) {
    if (key === 'signup') { setShowSignup(true); return }
    const cfg = ICONS.find(i => i.id === key)
    if (!cfg) return
    if (windows.find(w => w.id === key)) { focusWin(key); return }
    const offset = windows.length * 28
    const z = nextZ()

    if (cfg.isFile) {
      const content = Object.values(FILES[cfg.fileKey])[0]
      setWindows(ws => [...ws, { id: key, title: cfg.title, icon: cfg.icon, type: 'notepad', filename: cfg.fileName, content, x: 80 + offset, y: 60 + offset, z, w: 440, h: 320 }])
    } else {
      setWindows(ws => [...ws, { id: key, title: cfg.title, icon: cfg.icon, type: 'folder', folderKey: cfg.folderKey, x: 80 + offset, y: 60 + offset, z, w: cfg.w, h: cfg.h }])
    }
  }

  function openFileFromFolder(winId, filename, content) {
    const fileId = `${winId}-${filename}`
    if (windows.find(w => w.id === fileId)) { focusWin(fileId); return }
    const z = nextZ()
    const offset = windows.length * 24
    setWindows(ws => [...ws, { id: fileId, title: `${filename} — Notepad`, icon: '📄', type: 'notepad', filename, content, x: 120 + offset, y: 90 + offset, z, w: 440, h: 320 }])
  }

  function closeWin(id) {
    setWindows(ws => ws.filter(w => w.id !== id))
    if (id === 'signup-exe') setShowSignup(false)
  }

  return (
    <div
      className={styles.desktop95}
      onClick={() => { setSelected(null); setStartOpen(false) }}
    >
      {/* Cursor */}
      <div className={styles.w95cursor} style={{ left: cursor.x, top: cursor.y }}>
        <svg width="18" height="22" viewBox="0 0 18 22">
          <path d="M1 1 L1 17 L5 13 L8 20 L11 19 L8 12 L14 12 Z" fill="#fff" stroke="#000" strokeWidth="1.2" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Desktop icons */}
      <div className={styles.iconColumn} onClick={e => e.stopPropagation()}>
        {ICONS.map(ic => (
          <DesktopIcon
            key={ic.id}
            id={ic.id}
            label={ic.label}
            IconComp={ic.Ico}
            selected={selected === ic.id}
            onSelect={setSelected}
            onOpen={() => openItem(ic.id)}
          />
        ))}
      </div>

      {/* Watermark */}
      <div className={styles.w95watermark}>
        <div className={styles.w95wmTitle}>WHO ELSE OS</div>
        <div className={styles.w95wmSub}>Build {new Date().getFullYear()} · Genesis Studios · ACU</div>
      </div>

      {/* Windows */}
      {windows.map(win => (
        <W95Window
          key={win.id}
          id={win.id}
          title={win.title}
          icon={win.icon}
          zIndex={win.z}
          initialX={win.x}
          initialY={win.y}
          width={win.w}
          height={win.h}
          onClose={() => closeWin(win.id)}
          onFocus={() => focusWin(win.id)}
        >
          {win.type === 'folder' && (
            <FolderBody
              folderKey={win.folderKey}
              onOpenFile={(name, content) => openFileFromFolder(win.id, name, content)}
            />
          )}
          {win.type === 'notepad' && (
            <Notepad filename={win.filename} content={win.content} onClose={() => closeWin(win.id)} />
          )}
        </W95Window>
      ))}

      {/* Signup EXE */}
      {showSignup && (
        <W95Window
          id="signup-exe"
          title="Who Else Setup — Installation Wizard"
          icon="⚙️"
          zIndex={topZ + 50}
          initialX={Math.max(40, window.innerWidth / 2 - 220)}
          initialY={Math.max(40, window.innerHeight / 2 - 160)}
          width={460}
          height={280}
          onClose={() => setShowSignup(false)}
          onFocus={() => {}}
        >
          <SignupExe onClose={() => setShowSignup(false)} />
        </W95Window>
      )}

      {/* Start menu */}
      {startOpen && (
        <StartMenu
          onClose={() => setStartOpen(false)}
          onOpenItem={openItem}
        />
      )}

      {/* Taskbar */}
      <W95Taskbar
        windows={windows}
        onTaskClick={focusWin}
        startOpen={startOpen}
        onToggleStart={e => { e.stopPropagation(); setStartOpen(s => !s) }}
      />
    </div>
  )
}

import { useState, useEffect, useRef } from 'react'
import styles from './App.module.css'

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

const FILES = {
  about: {
    'README.txt': `WHO ELSE COLLECTIVE\n-------------------\n\nWho else should be trusted to pioneer\nthe future of technology?\n\nFAITH-DRIVEN  · FOUNDER-FIRST\nBUILD IN PUBLIC · LEGACY OVER EXIT\n\nFOUNDED : 2025\nLOCATION: Austin, TX\nBACKED  : Genesis Studios @ ACU`,
    'Mission.txt': `MISSION\n-------\n\nGenesis Studios & Who Else exist to prove\nthat faith and innovation are co-architects\nof the future.\n\nPioneering the Future for Kingdom Glory.`,
    'Pillars.txt': `PILLARS\n-------\n\n01 FAITH-DRIVEN — The why before the what.\n02 FOUNDER-FIRST — Character before capital.\n03 BUILD IN PUBLIC — The work is the testimony.\n04 LEGACY OVER EXIT — Build what lasts.`,
  },
  members: {
    'MEMBERS.txt': `MEMBERS — GEN. 01\n-----------------\n\nFounding member slots open.\n\nTo join: Run SIGNUP.EXE on the desktop`,
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
    'FAQ.txt': `FAQ\n---\n\nQ: WHO CAN JOIN?\nA: Any student who builds things.\n\nQ: EXPERIENCE NEEDED?\nA: No. You need drive.\n\nQ: IS IT FREE?\nA: Yes. Resources unlock through participation.\n\nQ: HOW TO APPLY?\nA: Run SIGNUP.EXE on the desktop.`,
  },
  contact: {
    'Contact.txt': `CONTACT\n-------\n\nGENERAL: hello@whoelse.co\nGENESIS: genesis@acu.edu\nPRESS  : press@whoelse.co\n\nInstagram: @whoelse.collective\nTwitter  : @whoelse\n\nAustin Christian University · Austin, Texas`,
  },
}

const R = { borderTop:'2px solid #fff', borderLeft:'2px solid #fff', borderRight:'2px solid #808080', borderBottom:'2px solid #808080' }
const S = { borderTop:'2px solid #808080', borderLeft:'2px solid #808080', borderRight:'2px solid #fff', borderBottom:'2px solid #fff' }

function TxtIco() {
  return <svg width="28" height="28" viewBox="0 0 28 28"><rect x="2" y="1" width="18" height="24" rx="1" fill="#fffef8"/><rect x="2" y="1" width="18" height="24" rx="1" fill="none" stroke="#888" strokeWidth=".8"/><path d="M16 1L20 5L16 5Z" fill="#ddd"/><path d="M16 1L16 5L20 5" fill="none" stroke="#888" strokeWidth=".8"/><rect x="4" y="9" width="11" height="1" fill="#aaa"/><rect x="4" y="12" width="9" height="1" fill="#aaa"/><rect x="4" y="15" width="10" height="1" fill="#aaa"/></svg>
}
function FolIco() {
  return <svg width="32" height="28" viewBox="0 0 32 28"><path d="M1 7Q1 5 3 5L11 5L14 8L29 8Q31 8 31 10L31 25Q31 27 29 27L3 27Q1 27 1 25Z" fill="#c49a22" opacity=".9"/><path d="M1 10L31 10L31 25Q31 27 29 27L3 27Q1 27 1 25Z" fill="#daa520"/><path d="M1 10L31 10" stroke="rgba(255,255,255,.5)" strokeWidth=".8"/></svg>
}
function ExeIco() {
  return <svg width="28" height="28" viewBox="0 0 32 32"><rect x="2" y="1" width="22" height="28" rx="1" fill="#fffef8"/><rect x="2" y="1" width="22" height="28" rx="1" fill="none" stroke="#888" strokeWidth=".8"/><path d="M18 1L24 7L18 7Z" fill="#ddd"/><circle cx="24" cy="24" r="8" fill="#c93030"/><text x="24" y="28" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="sans-serif" fontWeight="900">▶</text></svg>
}

// ─── EMAILJS CONFIG — fill these in ─────────────────────────
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'

function SignupExe({ onClose }) {
  const [step, setStep] = useState('install')
  const [prog, setProg] = useState(0)
  const [lines, setLines] = useState([])
  const logRef = useRef(null)
  const [err, setErr] = useState('')
  const [form, setForm] = useState({
    name: '', email: '', school: '', gradYear: '',
    links: '', interests: '', pastWork: '', goals: '',
    parentPermission: false,
  })

  const LOG = [
    'C:\\WHOELSE> Initializing...',
    'Checking faith protocols.......... OK',
    'Connecting to Genesis Studios..... OK',
    'Allocating cohort slot............ OK',
    'Loading application form.......... OK',
    'Ready.',
  ]

  useEffect(() => {
    if (step !== 'install') return
    let i = 0
    const t = setInterval(() => {
      if (i < LOG.length) {
        setLines(l => [...l, LOG[i]])
        setProg(Math.round((i + 1) / LOG.length * 100))
        i++
        if (logRef.current) logRef.current.scrollTop = 9999
      } else { clearInterval(t); setTimeout(() => setStep('form'), 500) }
    }, 340)
    return () => clearInterval(t)
  }, [step])

  async function handleSubmit() {
    if (!form.name || !form.email || !form.school || !form.gradYear || !form.pastWork || !form.goals) {
      setErr('Please fill in all required fields.'); return
    }
    if (!form.parentPermission) {
      setErr('Parent/guardian permission is required.'); return
    }
    setErr(''); setStep('sending')
    try {
      if (!window.emailjs) {
        await new Promise((res, rej) => {
          const s = document.createElement('script')
          s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js'
          s.onload = res; s.onerror = rej
          document.head.appendChild(s)
        })
        window.emailjs.init(EMAILJS_PUBLIC_KEY)
      }
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name:    form.name,
        from_email:   form.email,
        school:       form.school,
        grad_year:    form.gradYear,
        links:        form.links || '—',
        interests:    form.interests || '—',
        past_work:    form.pastWork,
        goals:        form.goals,
        parent_ok:    form.parentPermission ? 'Yes — confirmed' : 'No',
      })
      setStep('done')
    } catch (e) { console.error(e); setStep('error') }
  }

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const inputStyle = { width: '100%', fontFamily: 'var(--wm)', fontSize: 10, padding: '3px 5px', ...S, background: '#fff', color: '#000', outline: 'none', border: 'none' }
  const taStyle   = { ...inputStyle, resize: 'vertical', lineHeight: 1.55 }

  function Field({ label, k, placeholder, required, type = 'text' }) {
    return (
      <div style={{ marginBottom: 7 }}>
        <div style={{ fontFamily: 'var(--wf)', fontSize: 10, marginBottom: 2, color: '#000' }}>
          {label}{required && <span style={{ color: '#c93030' }}> *</span>}
        </div>
        <input type={type} value={form[k]} placeholder={placeholder}
          onChange={e => set(k, e.target.value)} style={inputStyle} />
      </div>
    )
  }

  function TextArea({ label, k, placeholder, required, rows = 2 }) {
    return (
      <div style={{ marginBottom: 7 }}>
        <div style={{ fontFamily: 'var(--wf)', fontSize: 10, marginBottom: 2, color: '#000' }}>
          {label}{required && <span style={{ color: '#c93030' }}> *</span>}
        </div>
        <textarea value={form[k]} placeholder={placeholder} rows={rows}
          onChange={e => set(k, e.target.value)} style={taStyle} />
      </div>
    )
  }

  // ── INSTALL ──
  if (step === 'install') return (
    <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10, minWidth: 400 }}>
      <div style={{ fontFamily: 'var(--wf)', fontSize: 11, fontWeight: 700, color: '#c93030' }}>WHO_ELSE — Loading Application</div>
      <div ref={logRef} style={{ ...S, background: '#000', color: '#ccc', fontFamily: 'var(--wm)', fontSize: 11, padding: '6px 8px', height: 100, overflowY: 'auto', lineHeight: 1.7 }}>
        {lines.map((l, i) => <div key={i} style={{ color: i === lines.length - 1 ? '#c49a22' : '#ccc' }}>{l}</div>)}
      </div>
      <div>
        <div style={{ fontFamily: 'var(--wf)', fontSize: 10, marginBottom: 2 }}>Loading: {prog}%</div>
        <div style={{ ...S, height: 12, background: '#c0c0c0', padding: 2 }}>
          <div style={{ height: '100%', width: `${prog}%`, background: 'linear-gradient(90deg,#000080,#1084d0)', transition: 'width .3s' }} />
        </div>
      </div>
    </div>
  )

  // ── FORM ──
  if (step === 'form') return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minWidth: 440 }}>
      {/* form header */}
      <div style={{ padding: '8px 14px 6px', borderBottom: '1px solid #808080', flexShrink: 0 }}>
        <div style={{ fontFamily: 'var(--wf)', fontSize: 11, fontWeight: 700, color: '#000080' }}>WHO ELSE — Cohort 01 Application</div>
        <div style={{ fontFamily: 'var(--wf)', fontSize: 9, color: '#555', marginTop: 1 }}>Fields marked <span style={{ color: '#c93030' }}>*</span> are required</div>
      </div>

      {/* scrollable fields */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px 14px 4px' }}>

        {/* row: name + email */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 0 }}>
          <Field label="Full Name" k="name" placeholder="Your full name" required />
          <Field label="Email Address" k="email" placeholder="you@email.com" required type="email" />
        </div>

        {/* row: school + grad year */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 8 }}>
          <Field label="School" k="school" placeholder="e.g. Austin High School" required />
          <Field label="Graduation Year" k="gradYear" placeholder="e.g. 2027" required />
        </div>

        <Field label="Links" k="links" placeholder="GitHub, portfolio, anything you've shipped — URLs welcome" />

        <TextArea label="Interests" k="interests" placeholder="What topics, skills, or areas light you up? (design, code, business, faith, etc)" rows={2} />

        <TextArea label="What have you built or done in the past?" k="pastWork" placeholder="Projects, clubs, jobs, anything you've created or shipped..." required rows={3} />

        <TextArea label="What do you hope to get out of Who Else?" k="goals" placeholder="Be honest. What are you looking for?" required rows={3} />

        {/* parent permission */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7, marginBottom: 8, marginTop: 2 }}>
          <input type="checkbox" id="perm" checked={form.parentPermission}
            onChange={e => set('parentPermission', e.target.checked)}
            style={{ marginTop: 2, cursor: 'default', accentColor: '#000080' }} />
          <label htmlFor="perm" style={{ fontFamily: 'var(--wf)', fontSize: 10, color: '#000', lineHeight: 1.5, cursor: 'default' }}>
            <span style={{ color: '#c93030' }}>* </span>
            I confirm that a parent or guardian is aware of and permits my participation in Who Else Collective.
          </label>
        </div>

        {err && <div style={{ fontFamily: 'var(--wf)', fontSize: 10, color: '#c93030', marginBottom: 6 }}>{err}</div>}
      </div>

      {/* footer buttons */}
      <div style={{ padding: '6px 14px 10px', borderTop: '1px solid #808080', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ fontFamily: 'var(--wf)', fontSize: 9, color: '#777' }}>Genesis Studios @ ACU · Who Else Collective</div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={onClose} style={{ fontFamily: 'var(--wf)', fontSize: 11, padding: '3px 12px', background: '#c0c0c0', ...R, cursor: 'default' }}>Cancel</button>
          <button onClick={handleSubmit} style={{ fontFamily: 'var(--wf)', fontSize: 11, padding: '3px 18px', background: '#c0c0c0', ...R, cursor: 'default', fontWeight: 700 }}>Submit Application →</button>
        </div>
      </div>
    </div>
  )

  // ── SENDING ──
  if (step === 'sending') return (
    <div style={{ padding: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, minWidth: 320 }}>
      <div style={{ fontFamily: 'var(--wf)', fontSize: 11, color: '#000' }}>Submitting your application...</div>
      <div style={{ ...S, width: '100%', height: 12, background: '#c0c0c0', padding: 2 }}>
        <div style={{ height: '100%', width: '70%', background: 'linear-gradient(90deg,#000080,#1084d0)' }} />
      </div>
      <div style={{ fontFamily: 'var(--wf)', fontSize: 10, color: '#555' }}>Connecting to Genesis Studios...</div>
    </div>
  )

  // ── DONE ──
  if (step === 'done') return (
    <div style={{ padding: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, minWidth: 340 }}>
      <div style={{ fontSize: 32, lineHeight: 1 }}>✓</div>
      <div style={{ fontFamily: 'var(--wf)', fontSize: 13, fontWeight: 700, color: '#000080' }}>Application Received.</div>
      <div style={{ ...S, padding: '8px 12px', background: '#fff', width: '100%' }}>
        <div style={{ fontFamily: 'var(--wm)', fontSize: 10, color: '#000', lineHeight: 1.7 }}>
          C:\WHOELSE{'>'} application.exe --submit<br />
          <span style={{ color: '#007b00' }}>SUCCESS</span> — Application sent to Genesis Studios<br />
          <span style={{ color: '#007b00' }}>SUCCESS</span> — Cohort slot reserved<br />
          <span style={{ color: '#c49a22' }}>PENDING</span> — Awaiting review...<br />
          <br />
          We'll be in touch, {form.name.split(' ')[0] || 'friend'}.
        </div>
      </div>
      <div style={{ fontFamily: 'var(--wf)', fontSize: 10, color: '#555', textAlign: 'center', maxWidth: 280, lineHeight: 1.6 }}>
        Who else will pioneer the future?<br />You just answered.
      </div>
      <button onClick={onClose} style={{ fontFamily: 'var(--wf)', fontSize: 11, padding: '4px 24px', background: '#c0c0c0', ...R, cursor: 'default', marginTop: 4 }}>Close</button>
    </div>
  )

  // ── ERROR ──
  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, minWidth: 320 }}>
      <div style={{ fontSize: 24 }}>⚠</div>
      <div style={{ fontFamily: 'var(--wf)', fontSize: 11, fontWeight: 700, color: '#c93030' }}>Submission Failed</div>
      <div style={{ fontFamily: 'var(--wf)', fontSize: 10, color: '#444', textAlign: 'center', lineHeight: 1.6, maxWidth: 260 }}>
        Check your EmailJS credentials in App.jsx.<br />Your answers are not lost — hit Back to try again.
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
        <button onClick={() => setStep('form')} style={{ fontFamily: 'var(--wf)', fontSize: 11, padding: '3px 14px', background: '#c0c0c0', ...R, cursor: 'default' }}>← Back</button>
        <button onClick={onClose} style={{ fontFamily: 'var(--wf)', fontSize: 11, padding: '3px 14px', background: '#c0c0c0', ...R, cursor: 'default' }}>Cancel</button>
      </div>
    </div>
  )
}

function Notepad({ content, filename }) {
  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%'}}>
      <div style={{display:'flex',padding:'2px 4px',borderBottom:'1px solid #808080',flexShrink:0,gap:2}}>
        {['File','Edit','Search','Help'].map(m=><span key={m} style={{fontFamily:'var(--wf)',fontSize:11,padding:'1px 6px',cursor:'default'}}>{m}</span>)}
      </div>
      <textarea readOnly value={content} style={{flex:1,border:'none',outline:'none',resize:'none',fontFamily:'var(--wm)',fontSize:11,padding:'4px 6px',background:'#fff',color:'#000',lineHeight:1.7,minHeight:120}}/>
      <div style={{padding:'1px 6px',borderTop:'1px solid #808080',fontFamily:'var(--wf)',fontSize:11,color:'#444',flexShrink:0}}>{filename}</div>
    </div>
  )
}

function FolderBody({ folderKey, onOpenFile }) {
  const files = FILES[folderKey] || {}
  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%'}}>
      <div style={{display:'flex',gap:4,padding:'2px 6px',borderBottom:'1px solid #808080',flexShrink:0}}>
        {['File','Edit','View','Help'].map(m=><span key={m} style={{fontFamily:'var(--wf)',fontSize:11,padding:'1px 6px',cursor:'default'}}>{m}</span>)}
      </div>
      <div style={{...S,margin:'3px 6px',padding:'1px 6px',background:'#fff',fontFamily:'var(--wm)',fontSize:11,flexShrink:0}}>C:\WHOELSE\{folderKey.toUpperCase()}</div>
      <div style={{flex:1,padding:10,display:'flex',flexWrap:'wrap',gap:12,alignContent:'flex-start',overflowY:'auto',background:'#fff'}}>
        {Object.entries(files).map(([name,content])=>(
          <div key={name} onDoubleClick={()=>onOpenFile(name,content)} className={styles.fi}
            style={{display:'flex',flexDirection:'column',alignItems:'center',gap:3,padding:'6px 4px',width:68,cursor:'default',textAlign:'center',border:'1px solid transparent',borderRadius:2}}>
            {name.endsWith('.exe')?<ExeIco/>:<TxtIco/>}
            <span style={{fontFamily:'var(--wf)',fontSize:10,lineHeight:1.2,wordBreak:'break-all',color:'#000'}}>{name}</span>
          </div>
        ))}
      </div>
      <div style={{...S,padding:'1px 8px',fontFamily:'var(--wf)',fontSize:11,color:'#444',flexShrink:0,background:'#c0c0c0'}}>{Object.keys(files).length} object(s)</div>
    </div>
  )
}

let _topZ = 400
function OsWin({ title, icon, children, onClose, onFocus, zIndex, ix, iy, w=420, h=280 }) {
  const [pos, setPos] = useState({x:ix,y:iy})
  const dragging = useRef(false), ds = useRef(null)
  function tdm(e) { if(e.target.dataset.wb)return; dragging.current=true; ds.current={mx:e.clientX,my:e.clientY,px:pos.x,py:pos.y}; onFocus() }
  useEffect(()=>{
    const mm=e=>{if(!dragging.current)return;setPos({x:ds.current.px+e.clientX-ds.current.mx,y:ds.current.py+e.clientY-ds.current.my})}
    const mu=()=>{dragging.current=false}
    window.addEventListener('mousemove',mm); window.addEventListener('mouseup',mu)
    return()=>{window.removeEventListener('mousemove',mm);window.removeEventListener('mouseup',mu)}
  },[])
  const isTop = zIndex >= _topZ - 1
  return (
    <div onMouseDown={onFocus} style={{position:'absolute',left:pos.x,top:pos.y,width:w,zIndex,background:'#c0c0c0',...R}}>
      <div style={{height:22,background:`linear-gradient(90deg,${isTop?'#000080':'#808080'},${isTop?'#1084d0':'#909090'})`,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 3px 0 5px',userSelect:'none',cursor:'default'}} onMouseDown={tdm}>
        <div style={{display:'flex',alignItems:'center',gap:4,overflow:'hidden'}}>
          {icon&&<span style={{fontSize:11}}>{icon}</span>}
          <span style={{fontFamily:'var(--wf)',fontSize:11,fontWeight:700,color:'#fff',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{title}</span>
        </div>
        <button data-wb="1" onClick={onClose} style={{width:16,height:14,background:'#c0c0c0',borderTop:'1px solid #fff',borderLeft:'1px solid #fff',borderRight:'1px solid #404040',borderBottom:'1px solid #404040',fontFamily:'var(--wf)',fontSize:10,fontWeight:700,cursor:'default',padding:0,display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>
      </div>
      <div style={{height:h,overflow:'hidden',display:'flex',flexDirection:'column'}}>{children}</div>
    </div>
  )
}

function WhoElseOS() {
  const [wins, setWins] = useState([])
  const [topZ, setTopZ] = useState(400)
  const [sel, setSel] = useState(null)
  const [signup, setSignup] = useState(false)
  function nz(){const z=topZ+1;setTopZ(z);_topZ=z;return z}
  function focus(id){const z=nz();setWins(ws=>ws.map(w=>w.id===id?{...w,z}:w))}
  function open(key){
    if(key==='signup'){setSignup(true);return}
    if(wins.find(w=>w.id===key)){focus(key);return}
    const off=wins.length*22,z=nz()
    const cfg={
      about:{t:'About Who Else',i:'📁',fk:'about',w:400,h:260},
      members:{t:'Members',i:'📁',fk:'members',w:360,h:240},
      mission:{t:'Mission',i:'📁',fk:'mission',w:380,h:260},
      genesis:{t:'Genesis Studios',i:'📁',fk:'genesis',w:380,h:240},
      faq:{t:'FAQ.txt — Notepad',i:'📄',note:true,fk:'faq',fn:'FAQ.txt',w:360,h:260},
      contact:{t:'Contact.txt — Notepad',i:'📄',note:true,fk:'contact',fn:'Contact.txt',w:360,h:240},
    }
    const c=cfg[key];if(!c)return
    setWins(ws=>[...ws,{id:key,title:c.t,icon:c.i,type:c.note?'note':'folder',folderKey:c.fk,filename:c.fn,content:c.note?Object.values(FILES[c.fk])[0]:null,x:40+off,y:36+off,z,w:c.w,h:c.h}])
  }
  function openFile(winId,name,content){
    const id=`${winId}-${name}`;if(wins.find(w=>w.id===id)){focus(id);return}
    const z=nz(),off=wins.length*18
    setWins(ws=>[...ws,{id,title:`${name} — Notepad`,icon:'📄',type:'note',content,filename:name,x:60+off,y:54+off,z,w:380,h:280}])
  }
  function close(id){setWins(ws=>ws.filter(w=>w.id!==id))}
  const ICONS=[{id:'about',l:'About',Ico:FolIco},{id:'signup',l:'SIGNUP.EXE',Ico:ExeIco},{id:'members',l:'Members',Ico:FolIco},{id:'mission',l:'Mission',Ico:FolIco},{id:'genesis',l:'Genesis',Ico:FolIco},{id:'faq',l:'FAQ.txt',Ico:TxtIco},{id:'contact',l:'Contact',Ico:TxtIco}]

  // icon grid positions — spread across desktop in a natural scattered grid
  const ICON_POS = [
    // col 1 (left edge)
    { id:'about',   x:10,  y:8   },
    { id:'members', x:10,  y:88  },
    { id:'mission', x:10,  y:168 },
    { id:'genesis', x:10,  y:248 },
    // col 2
    { id:'signup',  x:90,  y:8   },
    // right side
    { id:'faq',     x:10,  y:328 },
    { id:'contact', x:90,  y:88  },
  ]
  const timers=useRef({})
  function deskClick(e,id){
    e.stopPropagation();setSel(id)
    if(timers.current[id]){clearTimeout(timers.current[id]);timers.current[id]=null;open(id)}
    else{timers.current[id]=setTimeout(()=>{timers.current[id]=null},380)}
  }
  return (
    <div onClick={()=>setSel(null)} style={{width:'100%',height:'100%',background:'#007b7b',backgroundImage:'radial-gradient(ellipse 80% 80% at 50% 50%,#007070 0%,#005858 100%)',position:'relative',overflow:'hidden',paddingBottom:34,userSelect:'none'}}>
      <div style={{position:'absolute',right:8,top:6,textAlign:'right',pointerEvents:'none',opacity:.07}}>
        <div style={{fontFamily:'var(--wf)',fontSize:16,fontWeight:700,color:'#fff',letterSpacing:'.08em'}}>WHO ELSE OS</div>
        <div style={{fontFamily:'var(--wf)',fontSize:8,color:'#fff'}}>Genesis Studios © 2025</div>
      </div>
      {/* icons spread across desktop */}
      <div style={{position:'absolute',inset:0,pointerEvents:'none'}} onClick={e=>e.stopPropagation()}>
        {ICONS.map(({id,l,Ico})=>{
          const pos = ICON_POS.find(p=>p.id===id)||{x:8,y:8}
          return (
            <div key={id} onClick={e=>{e.stopPropagation();deskClick(e,id)}}
              style={{position:'absolute',left:pos.x,top:pos.y,display:'flex',flexDirection:'column',alignItems:'center',gap:2,padding:'4px 2px',width:68,border:sel===id?'1px dotted rgba(255,255,255,.8)':'1px solid transparent',background:sel===id?'#000080':'transparent',cursor:'default',pointerEvents:'auto'}}>
              <Ico/><span style={{fontFamily:'var(--wf)',fontSize:9,color:'#fff',textAlign:'center',lineHeight:1.2,textShadow:'1px 1px 1px #000,-1px -1px 1px #000',wordBreak:'break-word',width:'100%'}}>{l}</span>
            </div>
          )
        })}
      </div>
      {wins.map(w=>(
        <OsWin key={w.id} title={w.title} icon={w.icon} zIndex={w.z} ix={w.x} iy={w.y} w={w.w} h={w.h} onClose={()=>close(w.id)} onFocus={()=>focus(w.id)}>
          {w.type==='folder'?<FolderBody folderKey={w.folderKey} onOpenFile={(n,c)=>openFile(w.id,n,c)}/>:<Notepad content={w.content} filename={w.filename}/>}
        </OsWin>
      ))}
      {signup&&(
        <OsWin title="WHO ELSE — Application" icon="⚙️" zIndex={topZ+50} ix={60} iy={18} w={480} h={540} onClose={()=>setSignup(false)} onFocus={()=>{}}>
          <SignupExe onClose={()=>setSignup(false)}/>
        </OsWin>
      )}
      <div style={{position:'absolute',bottom:0,left:0,right:0,height:34,background:'#c0c0c0',...R,display:'flex',alignItems:'center',padding:'2px 4px',gap:4,zIndex:9000}}>
        <button onClick={()=>open('about')} style={{display:'flex',alignItems:'center',gap:5,padding:'2px 8px',height:26,background:'#c0c0c0',...R,fontFamily:'var(--wf)',fontSize:11,fontWeight:700,cursor:'default',color:'#000'}}>
          <span style={{fontSize:13}}>⊞</span> Start
        </button>
        <div style={{width:2,height:24,borderLeft:'1px solid #808080',borderRight:'1px solid #fff'}}/>
        {wins.map(w=>(
          <button key={w.id} onClick={()=>focus(w.id)} style={{height:24,padding:'0 8px',background:'#c0c0c0',...R,fontFamily:'var(--wf)',fontSize:10,cursor:'default',maxWidth:120,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
            {w.icon} {w.title}
          </button>
        ))}
        <div style={{flex:1}}/>
        <div style={{...S,padding:'1px 8px',fontFamily:'var(--wf)',fontSize:11}}>
          {new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}
        </div>
      </div>
    </div>
  )
}

function GrainCanvas() {
  const ref = useRef(null)
  useEffect(()=>{
    const canvas=ref.current,ctx=canvas.getContext('2d'); let raf
    function resize(){canvas.width=window.innerWidth;canvas.height=window.innerHeight}
    resize(); window.addEventListener('resize',resize)
    function draw(){
      const w=canvas.width,h=canvas.height,img=ctx.createImageData(w,h),d=img.data
      for(let i=0;i<d.length;i+=4){const v=Math.random()*255|0;d[i]=v;d[i+1]=v;d[i+2]=v;d[i+3]=22}
      ctx.putImageData(img,0,0); raf=requestAnimationFrame(draw)
    }
    draw()
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize)}
  },[])
  return <canvas ref={ref} className={styles.grain}/>
}

// ── CANVAS PC DRAWING ────────────────────────────────────────
function usePC(canvasRef, onScreenClick) {
  const boundsRef = useRef({})

  useEffect(()=>{
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = 720, H = 420

    function grad(x1,y1,x2,y2,stops){
      const g=ctx.createLinearGradient(x1,y1,x2,y2)
      stops.forEach(([p,c])=>g.addColorStop(p,c)); return g
    }
    function rgrad(cx,cy,r,stops){
      const g=ctx.createRadialGradient(cx,cy,0,cx,cy,r)
      stops.forEach(([p,c])=>g.addColorStop(p,c)); return g
    }
    function face(pts,fill,stroke='rgba(0,0,0,.4)',lw=.8){
      ctx.beginPath(); ctx.moveTo(pts[0][0],pts[0][1])
      for(let i=1;i<pts.length;i++) ctx.lineTo(pts[i][0],pts[i][1])
      ctx.closePath()
      if(fill){ctx.fillStyle=fill;ctx.fill()}
      if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=lw;ctx.stroke()}
    }

    function drawDesk(){
      face([[0,300],[720,300],[720,420],[0,420]],grad(0,300,0,420,[[0,'#3a2e1e'],[1,'#1a1208']]),null)
      face([[0,300],[720,300],[720,306],[0,306]],grad(0,300,0,306,[[0,'rgba(255,200,100,0.1)'],[1,'transparent']]),null)
    }
    function drawShadow(){
      ctx.save(); ctx.translate(360,308); ctx.scale(1,0.16)
      ctx.beginPath(); ctx.arc(0,0,300,0,Math.PI*2)
      ctx.fillStyle='rgba(0,0,0,0.42)'; ctx.fill(); ctx.restore()
    }
    function drawCable(){
      ctx.strokeStyle='#141416'; ctx.lineWidth=2.2; ctx.lineCap='round'
      ctx.beginPath(); ctx.moveTo(282,338); ctx.bezierCurveTo(240,356,190,346,168,296); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(282,343); ctx.bezierCurveTo(234,364,185,356,160,306); ctx.stroke()
    }

    function drawTower(){
      const tx=42,ty=82,tw=108,th=208,d=28
      face([[tx,ty],[tx+tw,ty],[tx+tw+d,ty-16],[tx+d,ty-16]],grad(tx,ty-16,tx,ty,[[0,'#323234'],[.5,'#3c3c3e'],[1,'#242426']]))
      face([[tx+tw,ty],[tx+tw+d,ty-16],[tx+tw+d,ty+th-16],[tx+tw,ty+th]],grad(tx+tw,ty,tx+tw+d,ty,[[0,'#1c1c1e'],[1,'#101012']]))
      face([[tx,ty],[tx+tw,ty],[tx+tw,ty+th],[tx,ty+th]],grad(tx,ty,tx,ty+th,[[0,'#2a2a2c'],[.35,'#252526'],[1,'#1a1a1c']]))
      face([[tx,ty],[tx+3,ty],[tx+3,ty+th],[tx,ty+th]],grad(tx,ty,tx+3,ty,[[0,'rgba(255,255,255,.05)'],[1,'transparent']]),null)
      // drive bay
      const dby=ty+24
      face([[tx+7,dby],[tx+tw-7,dby],[tx+tw-7,dby+13],[tx+7,dby+13]],grad(tx+7,dby,tx+7,dby+13,[[0,'#111'],[1,'#0a0a0a']]))
      ctx.strokeStyle='rgba(255,255,255,.07)';ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(tx+7,dby+6.5);ctx.lineTo(tx+tw-7,dby+6.5);ctx.stroke()
      face([[tx+7,dby+17],[tx+tw-7,dby+17],[tx+tw-7,dby+26],[tx+7,dby+26]],grad(tx+7,dby+17,tx+7,dby+26,[[0,'#0e0e0e'],[1,'#0a0a0a']]))
      // power button
      const pbx=tx+20,pby=ty+58
      ctx.beginPath();ctx.arc(pbx,pby,8.5,0,Math.PI*2);ctx.fillStyle='#1e1e20';ctx.fill()
      ctx.strokeStyle='rgba(255,255,255,.09)';ctx.lineWidth=.8;ctx.stroke()
      ctx.strokeStyle='rgba(100,220,140,.75)';ctx.lineWidth=1.5
      ctx.beginPath();ctx.arc(pbx,pby,4.5,Math.PI*.28,Math.PI*1.72);ctx.moveTo(pbx,pby-5.5);ctx.lineTo(pbx,pby-1.5);ctx.stroke()
      // usb
      for(let i=0;i<3;i++) face([[tx+11+i*16,ty+80],[tx+22+i*16,ty+80],[tx+22+i*16,ty+88],[tx+11+i*16,ty+88]],'#111','rgba(255,255,255,.05)',.5)
      // vents
      ctx.fillStyle='rgba(0,0,0,.65)'
      for(let r=0;r<6;r++) for(let c=0;c<7;c++){ctx.beginPath();ctx.arc(tx+14+c*13,ty+108+r*14,2.2,0,Math.PI*2);ctx.fill()}
      for(let i=0;i<9;i++){const vy=ty+8+i*20;face([[tx+tw+3,vy],[tx+tw+d-3,vy-9],[tx+tw+d-3,vy-4],[tx+tw+3,vy+5]],'rgba(0,0,0,.38)',null)}

      // ── STICKY NOTE ──
      const nx=tx+tw-38, ny=ty+145
      ctx.save()
      ctx.translate(nx,ny); ctx.rotate(-0.06)
      ctx.shadowColor='rgba(0,0,0,0.35)'; ctx.shadowBlur=6; ctx.shadowOffsetX=2; ctx.shadowOffsetY=3
      const ng=grad(0,0,0,52,[[0,'#f5e98a'],[.3,'#f0e070'],[1,'#e8d555']])
      ctx.fillStyle=ng; ctx.beginPath(); ctx.roundRect(0,0,44,52,1); ctx.fill()
      ctx.shadowColor='transparent'
      // fold corner
      ctx.beginPath();ctx.moveTo(32,0);ctx.lineTo(44,0);ctx.lineTo(44,12);ctx.fillStyle='rgba(0,0,0,.1)';ctx.fill()
      ctx.beginPath();ctx.moveTo(32,0);ctx.lineTo(44,12);ctx.lineTo(32,12);ctx.fillStyle='#d4c94a';ctx.fill()
      // ruled lines
      ctx.strokeStyle='rgba(0,0,0,.1)';ctx.lineWidth=.8
      for(let l=0;l<3;l++){ctx.beginPath();ctx.moveTo(4,18+l*12);ctx.lineTo(40,18+l*12);ctx.stroke()}
      // handwritten text — use Caveat if loaded, else cursive
      ctx.font='bold 13px Caveat, cursive'; ctx.fillStyle='rgba(60,40,10,.85)'
      ctx.fillText('4/4/26',5,16)
      ctx.font='9px Caveat, cursive'; ctx.fillStyle='rgba(60,40,10,.6)'
      ctx.fillText('launch',5,29); ctx.fillText('day ✓',5,40)
      ctx.restore()
    }

    function drawMonitor(){
      const sx=280,sy=65,sw=280,sh=198,d=14,tilt=6
      const scx=sx+sw/2+5
      face([[scx-13,sy+sh],[scx-13,sy+sh+38],[scx+13,sy+sh+38],[scx+13,sy+sh]],grad(scx-13,0,scx+13,0,[[0,'#1e1e1e'],[1,'#161616']]))
      face([[scx-26,sy+sh+36],[scx+30,sy+sh+36],[scx+30,sy+sh+44],[scx-26,sy+sh+44]],grad(0,sy+sh+36,0,sy+sh+44,[[0,'#2a2a2a'],[1,'#1a1a1a']]))
      face([[scx-42,sy+sh+42],[scx+46,sy+sh+42],[scx+46,sy+sh+48],[scx-42,sy+sh+48]],'#222',null)
      face([[sx+tilt,sy],[sx+sw-tilt,sy],[sx+sw-tilt+d,sy-10],[sx+tilt+d,sy-10]],grad(sx,sy-10,sx,sy,[[0,'#303032'],[1,'#242426']]))
      face([[sx+sw-tilt,sy],[sx+sw-tilt+d,sy-10],[sx+sw+d,sy+sh-10],[sx+sw,sy+sh]],grad(sx+sw,sy,sx+sw+d,sy,[[0,'#1c1c1e'],[1,'#101012']]))
      face([[sx,sy],[sx+sw,sy],[sx+sw,sy+sh],[sx,sy+sh]],grad(sx,sy,sx,sy+sh,[[0,'#2c2c2e'],[.5,'#262628'],[1,'#1e1e20']]))
      face([[sx,sy],[sx+sw,sy],[sx+sw,sy+2.5],[sx,sy+2.5]],grad(sx,sy,sx,sy+2.5,[[0,'rgba(255,255,255,.06)'],[1,'transparent']]),null)
      const bx=sx+13,by=sy+11,bw=sw-26,bh=sh-34
      face([[bx,by],[bx+bw,by],[bx+bw,by+bh],[bx,by+bh]],'#0e0e10')
      const scX=bx+4,scY=by+4,scW=bw-8,scH=bh-8
      face([[scX,scY],[scX+scW,scY],[scX+scW,scY+scH],[scX,scY+scH]],grad(scX,scY,scX,scY+scH,[[0,'#007878'],[.5,'#006868'],[1,'#005a5a']]))
      boundsRef.current = {x:scX,y:scY,w:scW,h:scH}
      // taskbar
      face([[scX,scY+scH-18],[scX+scW,scY+scH-18],[scX+scW,scY+scH],[scX,scY+scH]],'#c0c0c0',null)
      face([[scX+2,scY+scH-16],[scX+34,scY+scH-16],[scX+34,scY+scH-3],[scX+2,scY+scH-3]],'#d0ccc8')
      ctx.fillStyle='#000';ctx.font='bold 6px Courier New';ctx.fillText('⊞ Start',scX+4,scY+scH-7)
      ctx.textAlign='right';ctx.fillStyle='#000';ctx.font='5.5px Courier New'
      ctx.fillText(new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}),scX+scW-2,scY+scH-7)
      ctx.textAlign='left'
      for(let i=0;i<4;i++){const ix=scX+7,iy=scY+8+i*28;ctx.fillStyle='#c49a22';ctx.fillRect(ix,iy,16,11);ctx.fillStyle='#daa520';ctx.fillRect(ix,iy+3,16,10);ctx.fillStyle='rgba(255,255,255,.55)';ctx.font='4.5px Courier New';ctx.fillText(['About','Signup','Members','Mission'][i],ix-1,iy+24)}
      face([[scX+28,scY+7],[scX+scW-6,scY+7],[scX+scW-6,scY+scH-24],[scX+28,scY+scH-24]],'#ececec','#999',.5)
      face([[scX+28,scY+7],[scX+scW-6,scY+7],[scX+scW-6,scY+17],[scX+28,scY+17]],'#000080')
      ctx.fillStyle='#fff';ctx.font='bold 5.5px Courier New';ctx.fillText('WHO ELSE OS  v1.0',scX+31,scY+15)
      face([[scX+scW-18,scY+8],[scX+scW-8,scY+8],[scX+scW-8,scY+16],[scX+scW-18,scY+16]],'#c0c0c0','#808080',.4)
      ctx.fillStyle='#000';ctx.font='6px sans-serif';ctx.fillText('✕',scX+scW-16,scY+15)
      ctx.save();ctx.beginPath();ctx.rect(scX,scY,scW,scH);ctx.clip()
      const rg=ctx.createLinearGradient(scX,scY,scX+scW*.45,scY+scH*.6)
      rg.addColorStop(0,'rgba(255,255,255,.045)');rg.addColorStop(1,'rgba(255,255,255,0)')
      ctx.fillStyle=rg;ctx.fillRect(scX,scY,scW,scH);ctx.restore()
      face([[sx,sy+sh],[sx+sw,sy+sh],[sx+sw,sy+sh+11],[sx,sy+sh+11]],grad(sx,sy+sh,sx,sy+sh+11,[[0,'#282828'],[1,'#1c1c1a']]))
      ctx.beginPath();ctx.arc(sx+sw/2,sy+sh+5.5,2.5,0,Math.PI*2);ctx.fillStyle='rgba(80,220,120,.8)';ctx.fill()
    }

    function drawKeyboard(){
      const kx=245,ky=290,kw=258,kh=20,d=10
      face([[kx,ky],[kx+kw,ky],[kx+kw+d,ky-6],[kx+d,ky-6]],grad(kx,ky-6,kx,ky,[[0,'#303032'],[1,'#262628']]))
      face([[kx,ky],[kx+kw,ky],[kx+kw,ky+kh],[kx,ky+kh]],grad(kx,ky,kx,ky+kh,[[0,'#262628'],[1,'#1a1a1c']]))
      face([[kx+kw,ky],[kx+kw+d,ky-6],[kx+kw+d,ky+kh-6],[kx+kw,ky+kh]],'#161618')
      const rows=[{n:14,x:kx+6,y:ky-3.5,rw:16},{n:13,x:kx+10,y:ky+2.5,rw:17},{n:12,x:kx+14,y:ky+8.5,rw:18}]
      rows.forEach(({n,x,y,rw})=>{for(let i=0;i<n;i++) face([[x+i*(rw+1.5),y],[x+i*(rw+1.5)+rw,y],[x+i*(rw+1.5)+rw+1,y-3],[x+i*(rw+1.5)+1,y-3]],'#1e1e20','rgba(0,0,0,.5)',.3)})
      face([[kx+66,ky+14.5],[kx+192,ky+14.5],[kx+193,ky+11.5],[kx+67,ky+11.5]],'#1e1e20','rgba(0,0,0,.5)',.3)
    }

    function drawMouse(){
      const mx=552,my=286; ctx.save(); ctx.translate(mx,my)
      const sg=rgrad(8,12,28,[[0,'rgba(0,0,0,.38)'],[1,'rgba(0,0,0,0)']]); ctx.fillStyle=sg; ctx.fillRect(-18,2,50,38)
      ctx.beginPath(); ctx.moveTo(0,0); ctx.bezierCurveTo(-2,-2,26,-4,28,0); ctx.bezierCurveTo(32,6,30,28,14,32); ctx.bezierCurveTo(-2,28,-4,12,0,0); ctx.closePath()
      ctx.fillStyle=grad(-2,0,28,30,[[0,'#2e2e30'],[1,'#1c1c1e']]); ctx.fill()
      ctx.strokeStyle='rgba(255,255,255,.055)';ctx.lineWidth=.7;ctx.stroke()
      ctx.strokeStyle='rgba(0,0,0,.35)';ctx.lineWidth=.9;ctx.beginPath();ctx.moveTo(14,1);ctx.lineTo(14,14);ctx.stroke()
      ctx.beginPath();ctx.roundRect(11,5,6,9,3);ctx.fillStyle='#1a1a1c';ctx.fill();ctx.strokeStyle='rgba(255,255,255,.07)';ctx.lineWidth=.5;ctx.stroke()
      ctx.strokeStyle='#141416';ctx.lineWidth=2.5;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(14,-1);ctx.bezierCurveTo(14,-18,0,-28,-28,-26);ctx.stroke()
      ctx.restore()
    }

    drawDesk(); drawShadow(); drawCable(); drawTower(); drawMonitor(); drawKeyboard(); drawMouse()

    // click handler
    function handleClick(e) {
      const rect = canvas.getBoundingClientRect()
      const sx = W / rect.width, sy = H / rect.height
      const cx = (e.clientX - rect.left) * sx
      const cy = (e.clientY - rect.top) * sy
      const b = boundsRef.current
      if (cx>=b.x && cx<=b.x+b.w && cy>=b.y && cy<=b.y+b.h) onScreenClick()
    }
    function handleMove(e) {
      const rect = canvas.getBoundingClientRect()
      const sx = W / rect.width, sy = H / rect.height
      const cx = (e.clientX - rect.left) * sx
      const cy = (e.clientY - rect.top) * sy
      const b = boundsRef.current
      canvas.style.cursor = (cx>=b.x && cx<=b.x+b.w && cy>=b.y && cy<=b.y+b.h) ? 'pointer' : 'default'
    }
    canvas.addEventListener('click', handleClick)
    canvas.addEventListener('mousemove', handleMove)
    return () => { canvas.removeEventListener('click', handleClick); canvas.removeEventListener('mousemove', handleMove) }
  }, [onScreenClick])

  return boundsRef
}

function PcCanvas({ onScreenClick }) {
  const canvasRef = useRef(null)
  usePC(canvasRef, onScreenClick)
  return <canvas ref={canvasRef} width={720} height={420} className={styles.pcCanvas} />
}

function usePhrase() {
  const [idx, setIdx] = useState(0)
  const [out, setOut] = useState(false)
  useEffect(()=>{
    const t = setInterval(()=>{
      setOut(true)
      setTimeout(()=>{ setIdx(i=>(i+1)%PHRASES.length); setOut(false) }, 330)
    }, 2800)
    return ()=>clearInterval(t)
  },[])
  return { phrase: PHRASES[idx], out }
}

export default function App() {
  const [phase, setPhase] = useState('landing')
  const { phrase, out } = usePhrase()

  return (
    <div className={styles.page}>
      <GrainCanvas />

      {phase === 'landing' && (
        <div className={styles.landing}>
          <div className={styles.room} />

          {/* WHO ELSE big wordmark */}
          <div className={styles.wordmarkWrap}>
            <span className={styles.who}>WHO</span>
            <span className={styles.else}>ELSE</span>
          </div>

          {/* rotating phrase block */}
          <div className={styles.phraseBlock}>
            <span className={styles.phraseTag}>a faith-driven innovation collective</span>
            <div className={styles.phraseRow}>
              <span className={styles.phraseDash}>—</span>
              <span className={`${styles.phraseText} ${out ? styles.phraseOut : styles.phraseIn}`}>
                {phrase}
              </span>
              <span className={styles.phraseQ}>?</span>
            </div>
          </div>

          {/* PC */}
          <div className={styles.pcWrap}>
            <PcCanvas onScreenClick={() => setPhase('open')} />
          </div>
        </div>
      )}

      {phase === 'open' && (
        <div className={styles.osFullscreen}>
          <WhoElseOS />
          <button className={styles.exitBtn} onClick={() => setPhase('landing')}>← back to desktop</button>
        </div>
      )}
    </div>
  )
}

import { useEffect, useMemo, useRef, useState } from 'react'
import en from './data/biodata.en.json'
import mr from './data/biodata.mr.json'
import hi from './data/biodata.hi.json'
import { labels, LANGUAGES } from './i18n/labels.js'
import TopBar from './components/TopBar.jsx'
import Header from './components/Header.jsx'
import Section from './components/Section.jsx'
import InfoTable from './components/InfoTable.jsx'
import Gallery from './components/Gallery.jsx'
import Contact from './components/Contact.jsx'
import BackToTop from './components/BackToTop.jsx'
import Education from './components/Education.jsx'

const DATA = { en, mr, hi }

// Lotus corner artwork (public/lotus-left.svg, public/lotus-right.svg).
// Loaded as images so they also print correctly in the PDF.
const lotus = (side) => `${import.meta.env.BASE_URL}lotus-${side}.svg`
const CODES = LANGUAGES.map((l) => l.code)

// Order of sections, their icon and colour (colours are defined in theme.css)
const SECTIONS = [
  { id: 'personal', icon: '👤', color: 'rose' },
  { id: 'education', icon: '🎓', color: 'amber' },
  { id: 'career', icon: '💼', color: 'teal' },
  { id: 'family', icon: '👨‍👩‍👧', color: 'coral' },
  { id: 'expectations', icon: '💞', color: 'lavender' },
  { id: 'contact', icon: '📞', color: 'maroon' },
]

// Fill missing Marathi/Hindi values from English, field by field.
function withFallback(base, override) {
  if (Array.isArray(base)) {
    // Lists (education, photos) fall back item by item, so a score written
    // only in English still shows in Marathi and Hindi.
    if (!Array.isArray(override)) return base
    return base.map((item, i) => withFallback(item, override[i]))
  }
  if (base && typeof base === 'object') {
    const out = { ...base }
    for (const key of Object.keys(base)) out[key] = withFallback(base[key], override?.[key])
    return out
  }
  return override ?? base
}

function initialLang() {
  const fromUrl = new URLSearchParams(window.location.search).get('lang')
  if (CODES.includes(fromUrl)) return fromUrl
  try {
    const saved = localStorage.getItem('lang')
    if (CODES.includes(saved)) return saved
  } catch { /* storage unavailable */ }
  return 'en'
}

export default function App() {
  const [lang, setLang] = useState(initialLang)
  const [active, setActive] = useState(SECTIONS[0].id)
  const [seen, setSeen] = useState(() => new Set())
  const jumpLock = useRef(false)
  const jumpTimer = useRef(null)
  const data = useMemo(() => withFallback(en, DATA[lang]), [lang])
  const t = labels[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    try { localStorage.setItem('lang', lang) } catch { /* ignore */ }
    const url = new URL(window.location.href)
    url.searchParams.set('lang', lang)
    window.history.replaceState(null, '', url)
  }, [lang])

  // Highlight the menu chip of the section currently being read.
  // A section is "current" once its top passes a reading line. Normally the line
  // sits at 40% of the screen; in the last stretch of the page it slides down to
  // the bottom edge, so the short last sections (Expectations, Contact) each get
  // their turn even though they can never scroll up to the middle.
  useEffect(() => {
    const menuIds = SECTIONS.map((s) => s.id)
    const onScroll = () => {
      if (jumpLock.current) {
        // A menu chip was tapped: keep its highlight until the smooth scroll ends.
        clearTimeout(jumpTimer.current)
        jumpTimer.current = setTimeout(() => { jumpLock.current = false }, 150)
        return
      }
      const vh = window.innerHeight
      const remaining = document.documentElement.scrollHeight - vh - window.scrollY
      const zone = vh * 0.6
      const line = vh * 0.4 + zone * Math.max(0, 1 - remaining / zone)
      let current = menuIds[0]
      for (const id of menuIds) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      clearTimeout(jumpTimer.current)
    }
  }, [])

  const jumpTo = (id) => {
    jumpLock.current = true
    setActive(id)
    clearTimeout(jumpTimer.current)
    // Release the lock even if the page can't scroll (already in place).
    jumpTimer.current = setTimeout(() => { jumpLock.current = false }, 150)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Fade cards in the first time they scroll into view.
  useEffect(() => {
    const cards = document.querySelectorAll('[data-section]')
    const revealObs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          setSeen((prev) => new Set(prev).add(e.target.dataset.section))
          revealObs.unobserve(e.target)
        }
      }),
      { rootMargin: '0px 0px -8% 0px' },
    )
    cards.forEach((c) => revealObs.observe(c))
    return () => revealObs.disconnect()
  }, [])

  const mainPhoto = data.photos[0]
  const section = (id) => ({ ...SECTIONS.find((s) => s.id === id), title: t.sections[id], visible: seen.has(id) })

  return (
    <div className={`page lang-${lang}`}>
      {/* lotus decorations fixed to the bottom corners on wide screens */}
      <img className="floral-side floral-left" src={lotus('left')} alt="" />
      <img className="floral-side floral-right" src={lotus('right')} alt="" />

      <TopBar t={t} lang={lang} onLangChange={setLang} sections={SECTIONS} active={active} onJump={jumpTo} />
      <Header data={data} t={t} />

      <main className="layout">
        <aside className="profile">
          {mainPhoto && (
            <div className="photo-frame">
              <img
                className="profile-photo"
                src={`${import.meta.env.BASE_URL}photos/${mainPhoto}`}
                alt={`Photo of ${en.name}`}
              />
            </div>
          )}
        </aside>

        <div className="details">
          <Section {...section('personal')}>
            <InfoTable data={data.personal} fields={t.fields} />
          </Section>

          <Section {...section('education')}>
            <Education items={data.education} scoreLabel={t.score} />
          </Section>

          <Section {...section('career')}>
            <InfoTable data={data.career} fields={t.fields} />
          </Section>

          <Section {...section('family')}>
            <InfoTable data={data.family} fields={t.fields} />
          </Section>

          <Section {...section('expectations')}>
            <p className="expectations">{data.expectations}</p>
          </Section>

          <Section {...section('contact')}>
            <Contact data={data.contact} fields={t.fields} />
          </Section>

          {data.photos.length > 1 && (
            <Section id="gallery" icon="📷" color="rose" title={t.sections.gallery} visible className="no-print">
              <Gallery photos={data.photos} alt={en.name} closeLabel={t.close} />
            </Section>
          )}
        </div>
      </main>

      <footer className="footer">
        {/* smaller lotus corners at the page bottom on phones */}
        <img className="floral-footer floral-footer-left no-print" src={lotus('left')} alt="" />
        <img className="floral-footer floral-footer-right no-print" src={lotus('right')} alt="" />
        <div className="footer-ornament" aria-hidden="true"><span>❖</span></div>
      </footer>

      <BackToTop label={t.backToTop} />
    </div>
  )
}

import { useEffect, useRef } from 'react'
import LanguageToggle from './LanguageToggle.jsx'

export default function TopBar({ t, lang, onLangChange, sections, active, onJump }) {
  const menuRef = useRef(null)

  // Keep the active chip visible inside the horizontally scrolling menu
  useEffect(() => {
    const menu = menuRef.current
    const chip = menu?.querySelector(`[data-chip="${active}"]`)
    if (!menu || !chip) return
    const left = chip.offsetLeft - menu.clientWidth / 2 + chip.clientWidth / 2
    menu.scrollTo({ left, behavior: 'smooth' })
  }, [active])

  const jump = (e, id) => {
    e.preventDefault()
    onJump(id)
  }

  return (
    <div className="topbar no-print">
      <div className="topbar-row">
        <LanguageToggle lang={lang} onChange={onLangChange} />
        <button className="btn-pdf" onClick={() => window.print()} aria-label={t.downloadPdf}>
          <span aria-hidden="true">⬇</span>
          <span className="pdf-long">{t.downloadPdf}</span>
          <span className="pdf-short">{t.pdfShort}</span>
        </button>
      </div>
      <nav className="menu" ref={menuRef} aria-label="Sections">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            data-chip={s.id}
            className={`chip chip-${s.color} ${active === s.id ? 'active' : ''}`}
            aria-current={active === s.id ? 'true' : undefined}
            onClick={(e) => jump(e, s.id)}
          >
            <span aria-hidden="true">{s.icon}</span> {t.menu[s.id]}
          </a>
        ))}
      </nav>
    </div>
  )
}

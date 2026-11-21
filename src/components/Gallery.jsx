import { useEffect, useState } from 'react'

export default function Gallery({ photos, alt, closeLabel }) {
  const [open, setOpen] = useState(null)
  const src = (p) => `${import.meta.env.BASE_URL}photos/${p}`

  useEffect(() => {
    if (open === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') setOpen((i) => (i + 1) % photos.length)
      if (e.key === 'ArrowLeft') setOpen((i) => (i - 1 + photos.length) % photos.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, photos.length])

  return (
    <>
      <div className="gallery">
        {photos.map((p, i) => (
          <button key={p} className="thumb" onClick={() => setOpen(i)}>
            <img src={src(p)} alt={`${alt} ${i + 1}`} loading="lazy" />
          </button>
        ))}
      </div>
      {open !== null && (
        <div className="lightbox" onClick={() => setOpen(null)} role="dialog" aria-modal="true">
          <img src={src(photos[open])} alt={`${alt} ${open + 1}`} onClick={(e) => e.stopPropagation()} />
          <button className="lightbox-close" onClick={() => setOpen(null)}>✕ {closeLabel}</button>
        </div>
      )}
    </>
  )
}

import { useId, useMemo } from 'react'
import leftSvg from '../assets/lotus-left.svg?raw'
import rightSvg from '../assets/lotus-right.svg?raw'
import leftUrl from '../assets/lotus-left.svg?url'
import rightUrl from '../assets/lotus-right.svg?url'

const ART = { left: { svg: leftSvg, url: leftUrl }, right: { svg: rightSvg, url: rightUrl } }

// Tiny gold glints and pink pollen rising around the lotus flowers.
// Fixed values (percent of the lotus box) so it looks the same every visit.
const SPARKLES = [
  { x: 22, y: 30, size: 7, dur: 7.5, delay: 0, kind: 'glint' },
  { x: 48, y: 52, size: 5, dur: 9, delay: 1.8, kind: 'dot' },
  { x: 30, y: 70, size: 8, dur: 8, delay: 3.2, kind: 'glint' },
  { x: 60, y: 40, size: 4, dur: 6.5, delay: 4.5, kind: 'dot' },
  { x: 15, y: 82, size: 6, dur: 9.5, delay: 2.4, kind: 'dot' },
  { x: 52, y: 22, size: 6, dur: 7, delay: 5.6, kind: 'glint' },
  { x: 38, y: 90, size: 5, dur: 8.5, delay: 0.9, kind: 'dot' },
  { x: 66, y: 64, size: 7, dur: 10, delay: 6.8, kind: 'glint' },
  { x: 10, y: 50, size: 4, dur: 7, delay: 3.9, kind: 'dot' },
  { x: 44, y: 76, size: 6, dur: 9, delay: 7.5, kind: 'glint' },
]

function Sparkles() {
  return (
    <div className="lotus-sparkles" aria-hidden="true">
      {SPARKLES.map((s, i) => (
        <span
          key={i}
          className={`sparkle sparkle-${s.kind}`}
          style={{
            '--x': `${s.x}%`,
            '--y': `${s.y}%`,
            '--size': `${s.size}px`,
            '--dur': `${s.dur}s`,
            '--delay': `${s.delay}s`,
          }}
        >
          {s.kind === 'glint' && (
            <svg viewBox="0 0 10 10"><path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" /></svg>
          )}
        </span>
      ))}
    </div>
  )
}

// Lotus corner: animated inline SVG on screen, plain image for print.
export default function Lotus({ side, className = '' }) {
  const art = ART[side]
  // each copy gets its own gradient ids, so two inline copies never clash
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const svg = useMemo(
    () => art.svg.replace(/id="([^"]+)"/g, `id="$1${uid}"`).replace(/url\(#([^)]+)\)/g, `url(#$1${uid})`),
    [art.svg, uid],
  )
  return (
    <div className={`lotus ${className}`} aria-hidden="true">
      <div className="lotus-art" dangerouslySetInnerHTML={{ __html: svg }} />
      <Sparkles />
      <img className="lotus-print" src={art.url} alt="" />
    </div>
  )
}

import { useEffect, useState } from 'react'

// Education entries as tidy rows: year | degree + institution | score ring.

function percentOf(score) {
  // "78.4%" -> 78.4 ; anything else (e.g. "8.2 CGPA") -> null
  const m = /^\s*(\d+(?:\.\d+)?)\s*%\s*$/.exec(score || '')
  return m ? Math.min(100, Number(m[1])) : null
}

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// Counts from 0 up to `target` (ease-out) once `run` becomes true.
function useCountUp(target, run, ms = 1400) {
  // with reduced motion, show the final value straight away
  const [value, setValue] = useState(() => (reduceMotion() ? target ?? 0 : 0))
  useEffect(() => {
    if (!run || target == null) return
    if (reduceMotion()) { setValue(target); return }
    let raf
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - start) / ms)
      setValue(target * (1 - Math.pow(1 - t, 3)))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, target, ms])
  return value
}

function ScoreRing({ score, label, animate }) {
  const pct = percentOf(score)
  const decimals = (score.split('.')[1] || '').replace(/\D/g, '').length
  const shown = useCountUp(pct, animate)
  if (pct === null) {
    return <span className="edu-score-pill" title={label}>{score}</span>
  }
  return (
    <div className="edu-ring" style={{ '--pct': pct, '--final': pct }} title={label} aria-label={`${label}: ${score}`}>
      {/* animated number on screen; the final value is used for print */}
      <span className="count-anim" aria-hidden="true">{shown.toFixed(decimals)}%</span>
      <span className="count-final">{score}</span>
    </div>
  )
}

export default function Education({ items, scoreLabel, animate = true }) {
  return (
    <ol className="edu-list">
      {items.map((e, i) => (
        <li key={i} className="edu-item" style={{ '--i': i }}>
          <div className="edu-year">
            <span>{e.year}</span>
          </div>
          <div className="edu-body">
            <strong className="edu-degree">{e.degree}</strong>
            <span className="edu-inst">
              <span aria-hidden="true">🏛️</span>{' '}
              {e.url ? (
                <a className="edu-link" href={e.url} target="_blank" rel="noopener noreferrer">
                  {e.institution}
                  <span className="ext" aria-hidden="true"> ↗</span>
                </a>
              ) : (
                e.institution
              )}
            </span>
          </div>
          {e.score && (
            <div className="edu-score">
              <ScoreRing score={e.score} label={scoreLabel} animate={animate} />
              <span className="edu-score-label">{scoreLabel}</span>
            </div>
          )}
        </li>
      ))}
    </ol>
  )
}

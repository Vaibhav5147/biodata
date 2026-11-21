// Education entries as tidy rows: year | degree + institution | score ring.

function percentOf(score) {
  // "78.4%" -> 78.4 ; anything else (e.g. "8.2 CGPA") -> null
  const m = /^\s*(\d+(?:\.\d+)?)\s*%\s*$/.exec(score || '')
  return m ? Math.min(100, Number(m[1])) : null
}

function ScoreRing({ score, label }) {
  const pct = percentOf(score)
  if (pct === null) {
    return <span className="edu-score-pill" title={label}>{score}</span>
  }
  return (
    <div className="edu-ring" style={{ '--pct': pct }} title={label} aria-label={`${label}: ${score}`}>
      <span>{score}</span>
    </div>
  )
}

export default function Education({ items, scoreLabel }) {
  return (
    <ol className="edu-list">
      {items.map((e, i) => (
        <li key={i} className="edu-item">
          <div className="edu-year">
            <span>{e.year}</span>
          </div>
          <div className="edu-body">
            <strong className="edu-degree">{e.degree}</strong>
            <span className="edu-inst">
              <span aria-hidden="true">🏛️</span> {e.institution}
            </span>
          </div>
          {e.score && (
            <div className="edu-score">
              <ScoreRing score={e.score} label={scoreLabel} />
              <span className="edu-score-label">{scoreLabel}</span>
            </div>
          )}
        </li>
      ))}
    </ol>
  )
}

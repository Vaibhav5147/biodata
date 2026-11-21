// Soft petals drifting down across the hero banner (decorative only).
// Fixed, hand-picked values so the motion looks the same on every visit.
const PETALS = [
  { x: 6, size: 14, dur: 13, delay: 0, drift: 40, spin: 220, color: 'pink' },
  { x: 14, size: 11, dur: 11, delay: 5.5, drift: -30, spin: -180, color: 'blue' },
  { x: 23, size: 16, dur: 15, delay: 2.5, drift: 50, spin: 260, color: 'blue' },
  { x: 31, size: 10, dur: 10, delay: 8, drift: 25, spin: 160, color: 'pink' },
  { x: 40, size: 13, dur: 14, delay: 4, drift: -45, spin: -240, color: 'blue' },
  { x: 49, size: 12, dur: 12, delay: 10, drift: 35, spin: 200, color: 'pink' },
  { x: 57, size: 15, dur: 16, delay: 1, drift: -40, spin: -220, color: 'blue' },
  { x: 65, size: 11, dur: 11.5, delay: 6.5, drift: 30, spin: 180, color: 'pink' },
  { x: 73, size: 14, dur: 13.5, delay: 3, drift: -35, spin: -200, color: 'blue' },
  { x: 81, size: 10, dur: 10.5, delay: 9, drift: 40, spin: 240, color: 'pink' },
  { x: 88, size: 16, dur: 15.5, delay: 0.8, drift: -50, spin: -260, color: 'blue' },
  { x: 95, size: 12, dur: 12.5, delay: 7, drift: 28, spin: 190, color: 'pink' },
]

export default function Petals() {
  return (
    <div className="petals no-print" aria-hidden="true">
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="petal-wrap"
          style={{
            '--x': `${p.x}%`,
            '--size': `${p.size}px`,
            '--dur': `${p.dur}s`,
            '--delay': `${p.delay}s`,
            '--drift': `${p.drift}px`,
            '--spin': `${p.spin}deg`,
          }}
        >
          <svg className={`petal petal-${p.color}`} viewBox="0 0 20 28">
            <path d="M10 0 C17 6 20 15 10 28 C0 15 3 6 10 0Z" />
            <path className="vein" d="M10 4 C10.5 12 10.5 18 10 24" />
          </svg>
        </span>
      ))}
    </div>
  )
}

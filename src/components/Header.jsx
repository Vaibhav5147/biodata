import Highlights from './Highlights.jsx'

const art = (name) => `${import.meta.env.BASE_URL}${name}`

export default function Header({ data, t }) {
  return (
    <header className="hero">
      {/* watercolour flower corners (public/hero-flowers-*.svg) */}
      <img className="hero-flowers hero-flowers-left" src={art('hero-flowers-left.svg')} alt="" />
      <img className="hero-flowers hero-flowers-right" src={art('hero-flowers-right.svg')} alt="" />

      <div className="hero-inner">
        <div className="motif" aria-hidden="true">ॐ</div>
        <p className="tagline">{data.tagline}</p>
        <h1 className="title">{data.name}</h1>
        <div className="divider" aria-hidden="true"><span>✦</span></div>
        <Highlights data={data} t={t} />
      </div>
      <svg className="hero-wave" viewBox="0 0 1200 40" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 20 Q 75 0 150 20 T 300 20 T 450 20 T 600 20 T 750 20 T 900 20 T 1050 20 T 1200 20 V40 H0 Z" />
        <path className="hero-wave-line" d="M0 20 Q 75 0 150 20 T 300 20 T 450 20 T 600 20 T 750 20 T 900 20 T 1050 20 T 1200 20" />
      </svg>
    </header>
  )
}

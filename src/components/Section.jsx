export default function Section({ id, title, icon, color = 'maroon', visible = true, className = '', children }) {
  return (
    <section
      id={id}
      data-section={id}
      className={`card card-${color} ${visible ? 'in-view' : ''} ${className}`}
    >
      <h3 className="card-title">
        {icon && <span className="card-icon" aria-hidden="true">{icon}</span>}
        {title}
      </h3>
      {children}
    </section>
  )
}

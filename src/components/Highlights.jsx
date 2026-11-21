function ageFrom(iso) {
  if (!iso) return null
  const [y, m, d] = iso.split('-').map(Number)
  if (!y) return null
  const now = new Date()
  let age = now.getFullYear() - y
  if (now.getMonth() + 1 < m || (now.getMonth() + 1 === m && now.getDate() < d)) age--
  return age
}

export default function Highlights({ data, t }) {
  const age = ageFrom(data.birthDateISO)
  const items = [
    age != null && { icon: '🎂', text: t.yearsOld(age) },
    data.personal.height && { icon: '📏', text: data.personal.height },
    data.career.profession && { icon: '💼', text: data.career.profession },
    data.career.location && { icon: '📍', text: data.career.location },
  ].filter(Boolean)

  return (
    <ul className="highlights">
      {items.map((h, i) => (
        <li key={i} style={{ '--i': i }}>
          <span aria-hidden="true">{h.icon}</span> {h.text}
        </li>
      ))}
    </ul>
  )
}

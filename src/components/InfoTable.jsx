export default function InfoTable({ data, fields }) {
  const rows = Object.entries(data).filter(([, v]) => v && v !== '—')
  return (
    <dl className="info">
      {rows.map(([key, value]) => (
        <div className="info-row" key={key}>
          <dt>{fields[key] ?? key}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  )
}

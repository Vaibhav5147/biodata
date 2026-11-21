// Short, readable text for a web address: "https://www.linkedin.com/in/x/" -> "linkedin.com/in/x"
const shortUrl = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

export default function InfoTable({ data, fields }) {
  const rows = Object.entries(data).filter(([, v]) => v && v !== '—')
  return (
    <dl className="info">
      {rows.map(([key, value]) => (
        <div className="info-row" key={key}>
          <dt>{fields[key] ?? key}</dt>
          <dd>
            {/^https?:\/\//.test(value) ? (
              <a href={value} target="_blank" rel="noopener noreferrer">
                {shortUrl(value)}
                <span aria-hidden="true"> ↗</span>
              </a>
            ) : (
              value
            )}
          </dd>
        </div>
      ))}
    </dl>
  )
}

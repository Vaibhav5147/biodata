export default function Contact({ data, fields }) {
  const { contactPerson, phone, email, address } = data
  const tel = phone?.replace(/[^\d+]/g, '')
  return (
    <dl className="info">
      {contactPerson && <Row label={fields.contactPerson}>{contactPerson}</Row>}
      {phone && <Row label={fields.phone}><a href={`tel:${tel}`}>{phone}</a></Row>}
      {email && <Row label={fields.email}><a href={`mailto:${email}`}>{email}</a></Row>}
      {address && <Row label={fields.address}>{address}</Row>}
    </dl>
  )
}

function Row({ label, children }) {
  return (
    <div className="info-row">
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  )
}

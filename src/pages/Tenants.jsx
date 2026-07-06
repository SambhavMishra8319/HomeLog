import Table from '../components/common/Table'
import Status from '../components/common/Status'
import { INR, today } from '../utils/format'

export default function Tenants({ tenants, rooms, properties, query, setQuery, onAdd, onRemove }) {
  const filtered = tenants.filter(t => `${t.name} ${t.phone} ${t.room} ${t.payStatus} ${t.occupation}`.toLowerCase().includes(query.toLowerCase()))

  return <section className="panel">
    <div className="section-head">
      <div><h3>Tenant CRM</h3><p className="muted">Profiles, deposits, dues and agreement tracking.</p></div>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search tenants..." />
    </div>
    <form className="form" onSubmit={onAdd}>
      <select name="propertyId" required>{properties.map(p => <option value={p.id} key={p.id}>{p.name}</option>)}</select>
      <input name="name" placeholder="Tenant name" required />
      <input name="phone" placeholder="Phone" required />
      <input name="email" placeholder="Email" />
      <select name="room" required>{rooms.map(r => <option key={r.id}>{r.number}</option>)}</select>
      <input name="rent" type="number" placeholder="Rent" required />
      <input name="maintenance" type="number" placeholder="Maintenance" />
      <input name="deposit" type="number" placeholder="Security deposit" />
      <input name="joining" type="date" defaultValue={today()} />
      <input name="agreementEnd" type="date" />
      <input name="occupation" placeholder="Occupation" />
      <input name="documents" placeholder="Documents list" />
      <button>Add Tenant</button>
    </form>
    <Table heads={['Tenant','Room','Bill','Paid','Due','Late Fee','Status','Agreement','Docs','Action']} rows={filtered.map(t => [
      <div><b>{t.name}</b><small>{t.phone} · {t.occupation}</small></div>,
      t.room,
      INR.format(t.monthlyBill),
      INR.format(t.paid),
      INR.format(t.due),
      INR.format(t.lateFee),
      <Status value={t.payStatus}/>,
      `${t.agreementEnd || '-'} (${t.agreementDays} days)`,
      t.documents,
      <button className="ghost" onClick={() => onRemove(t.id)}>Delete</button>
    ])} />
  </section>
}

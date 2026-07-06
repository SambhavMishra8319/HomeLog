import Table from '../components/common/Table'
import { INR, monthKey, today } from '../utils/format'

export default function Payments({ tenants, payments, onAdd, onRemove }) {
  const printReceipt = (payment) => {
    const tenant = tenants.find(t => t.id === payment.tenantId)
    const html = `<html><head><title>Receipt</title><style>body{font-family:Arial;background:#f5f7fb;padding:30px}.box{background:#fff;border-radius:20px;padding:32px;max-width:620px;margin:auto;border:1px solid #e5e7eb}.brand{font-size:28px;font-weight:900;color:#1b4dff}.row{display:flex;justify-content:space-between;border-bottom:1px solid #eee;padding:12px 0}</style></head><body><div class='box'><div class='brand'>GharRent Manager</div><p>Official Rent Receipt</p>${[['Tenant',tenant?.name],['Room',tenant?.room],['Month',payment.month],['Amount','₹'+Number(payment.amount).toLocaleString('en-IN')],['Method',payment.method],['Date',payment.date]].map(r=>`<div class='row'><b>${r[0]}</b><span>${r[1] || '-'}</span></div>`).join('')}<p>System generated receipt.</p></div><script>window.print()</script></body></html>`
    const win = window.open('', '_blank')
    win.document.write(html)
    win.document.close()
  }

  return <section className="panel">
    <h3>Payments & Receipts</h3>
    <p className="muted">Record rent, maintenance and partial payments.</p>
    <form className="form" onSubmit={onAdd}>
      <select name="tenantId" required><option value="">Select tenant</option>{tenants.map(t => <option value={t.id} key={t.id}>{t.name} · {t.room}</option>)}</select>
      <input name="month" type="month" defaultValue={monthKey()} required />
      <select name="category"><option>Rent</option><option>Rent + Maintenance</option><option>Electricity</option><option>Water</option><option>Parking</option><option>Other</option></select>
      <input name="amount" type="number" placeholder="Amount" required />
      <select name="method"><option>UPI</option><option>Cash</option><option>Bank</option><option>Card</option></select>
      <input name="date" type="date" defaultValue={today()} />
      <input name="note" placeholder="Note" />
      <button>Add Payment</button>
    </form>
    <Table heads={['Tenant','Month','Category','Amount','Method','Date','Receipt','Action']} rows={payments.map(p => {
      const t = tenants.find(x => x.id === p.tenantId)
      return [t ? `${t.name} (${t.room})` : 'Unknown', p.month, p.category, INR.format(p.amount), p.method, p.date, <button className="ghost" onClick={() => printReceipt(p)}>Print</button>, <button className="ghost" onClick={() => onRemove(p.id)}>Delete</button>]
    })} />
  </section>
}

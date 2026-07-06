import Table from '../components/common/Table'
import { INR, today } from '../utils/format'

export default function Expenses({ expenses, properties, onAdd, onRemove }) {
  return <section className="panel">
    <h3>Expenses</h3>
    <p className="muted">Track electricity, repairs, cleaning, taxes and maintenance.</p>
    <form className="form" onSubmit={onAdd}>
      <select name="propertyId" required>{properties.map(p => <option value={p.id} key={p.id}>{p.name}</option>)}</select>
      <input name="title" placeholder="Expense title" required />
      <select name="category"><option>Electricity</option><option>Water</option><option>Maintenance</option><option>Cleaning</option><option>Repair</option><option>Tax</option><option>Other</option></select>
      <input name="amount" type="number" placeholder="Amount" required />
      <input name="date" type="date" defaultValue={today()} />
      <input name="note" placeholder="Note" />
      <button>Add Expense</button>
    </form>
    <Table heads={['Title','Category','Amount','Date','Note','Action']} rows={expenses.map(e => [e.title, e.category, INR.format(e.amount), e.date, e.note, <button className="ghost" onClick={() => onRemove(e.id)}>Delete</button>])} />
  </section>
}

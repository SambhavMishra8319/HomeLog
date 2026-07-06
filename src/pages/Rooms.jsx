import Table from '../components/common/Table'
import Status from '../components/common/Status'
import { INR } from '../utils/format'

export default function Rooms({ rooms, properties, onAdd, onRemove }) {
  return <section className="panel">
    <h3>Rooms & Shops</h3>
    <p className="muted">Track rent, deposit, floor, inventory and vacancy.</p>
    <form className="form" onSubmit={onAdd}>
      <select name="propertyId" required>{properties.map(p => <option value={p.id} key={p.id}>{p.name}</option>)}</select>
      <input name="number" placeholder="Room / shop no." required />
      <select name="type"><option>Single</option><option>Double</option><option>1BHK</option><option>2BHK</option><option>Shop</option><option>Office</option></select>
      <input name="floor" placeholder="Floor" />
      <input name="rent" type="number" placeholder="Rent" required />
      <input name="deposit" type="number" placeholder="Deposit" />
      <select name="status"><option>Vacant</option><option>Occupied</option><option>Reserved</option></select>
      <input name="inventory" placeholder="Inventory items" />
      <button>Add Unit</button>
    </form>
    <Table heads={['Unit','Type','Floor','Rent','Deposit','Status','Inventory','Action']} rows={rooms.map(r => [r.number, r.type, r.floor, INR.format(r.rent), INR.format(r.deposit || 0), <Status value={r.status}/>, r.inventory, <button className="ghost" onClick={() => onRemove(r.id)}>Delete</button>])} />
  </section>
}

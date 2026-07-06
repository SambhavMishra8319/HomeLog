import { useEffect, useState } from 'react'
import { addRecord, deleteRecord, updateRecord } from '../services/firestoreService'
import { Table, Status, Money } from '../components/common'
import { today, monthKey } from '../utils/format'
import { receiptPDF } from '../services/receiptService'

const numericFields = ['rent', 'deposit', 'amount', 'maintenance']

function toPayload(form) {
  const data = Object.fromEntries(new FormData(form).entries())
  numericFields.forEach((key) => {
    if (key in data) data[key] = Number(data[key] || 0)
  })
  return data
}

function useCrud(collectionName) {
  const [editing, setEditing] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const payload = toPayload(form)

    try {
      if (editing?.id) {
        await updateRecord(collectionName, editing.id, payload)
        setEditing(null)
      } else {
        await addRecord(collectionName, payload)
      }
      form.reset()
    } catch (err) {
      console.error(`${collectionName} submit error:`, err)
      alert('Something went wrong. Check console.')
    }
  }

  const cancelEdit = (formId) => {
    const form = document.getElementById(formId)
    if (form) form.reset()
    setEditing(null)
  }

  return { editing, setEditing, submit, cancelEdit }
}

function FormActions({ editing, cancel }) {
  return (
    <div className="form-actions">
      <button type="submit">{editing ? 'Update' : 'Add'}</button>
      {editing && (
        <button type="button" className="secondary" onClick={cancel}>Cancel</button>
      )}
    </div>
  )
}

function PhoneInput({ name = 'phone', placeholder, defaultValue = '', required = false, readOnly = false, value, onChange }) {
  const common = {
    name,
    type: 'tel',
    placeholder,
    pattern: '[0-9]{10}',
    maxLength: '10',
    minLength: '10',
    title: 'Phone number must be exactly 10 digits',
    required,
    readOnly,
  }
  if (value !== undefined) return <input {...common} value={value} onChange={onChange} />
  return <input {...common} defaultValue={defaultValue} />
}

export function Properties({ items }) {
  const formId = 'property-form'
  const { editing, setEditing, submit, cancelEdit } = useCrud('properties')

  return (
    <section className="panel page-panel">
      <h3>Properties</h3>
      <p className="muted">Create buildings, hostels, apartments or shops. Phone is optional but must be 10 digits if entered.</p>

      <form id={formId} className="form" onSubmit={submit} key={editing?.id || 'new-property'}>
        <input name="name" placeholder="Example: Mishra Residency" defaultValue={editing?.name || ''} required />
        <select name="type" defaultValue={editing?.type || 'Residential'}>
          <option>Residential</option>
          <option>Commercial</option>
          <option>Hostel</option>
          <option>Mixed</option>
        </select>
        <input name="address" placeholder="Example: Mandla, Madhya Pradesh" defaultValue={editing?.address || ''} />
        <input name="manager" placeholder="Example: Sambhav Mishra" defaultValue={editing?.manager || ''} />
        <PhoneInput placeholder="10-digit manager phone (optional)" defaultValue={editing?.phone || ''} />
        <input name="note" placeholder="Property notes (optional)" defaultValue={editing?.note || ''} />
        <FormActions editing={editing} cancel={() => cancelEdit(formId)} />
      </form>

      <Table
        heads={['Name', 'Type', 'Address', 'Manager', 'Phone', 'Action']}
        rows={items.map((x) => [
          x.name,
          x.type,
          x.address || '-',
          x.manager || '-',
          x.phone || '-',
          <div className="row-actions">
            <button type="button" className="secondary" onClick={() => setEditing(x)}>Edit</button>
            <button type="button" className="danger" onClick={() => deleteRecord('properties', x.id)}>Delete</button>
          </div>,
        ])}
      />
    </section>
  )
}

export function Rooms({ items, properties }) {
  const formId = 'room-form'
  const { editing, setEditing, submit, cancelEdit } = useCrud('rooms')

  return (
    <section className="panel page-panel">
      <h3>Rooms</h3>
      <p className="muted">Add units and track rent, deposit, inventory and vacancy.</p>

      <form id={formId} className="form" onSubmit={submit} key={editing?.id || 'new-room'}>
        <select name="propertyName" defaultValue={editing?.propertyName || properties[0]?.name || ''}>
          {properties.length === 0 && <option value="">Add property first</option>}
          {properties.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
        </select>
        <input name="number" placeholder="Example: A-101 / Shop-01" defaultValue={editing?.number || ''} required />
        <select name="type" defaultValue={editing?.type || 'Single'}>
          <option>Single</option><option>Double</option><option>1BHK</option><option>2BHK</option><option>Shop</option><option>Office</option>
        </select>
        <input name="floor" placeholder="Example: Ground / 1st / 2nd" defaultValue={editing?.floor || ''} />
        <input name="rent" type="number" placeholder="Monthly rent amount" defaultValue={editing?.rent || ''} />
        <input name="deposit" type="number" placeholder="Security deposit amount" defaultValue={editing?.deposit || ''} />
        <select name="status" defaultValue={editing?.status || 'Vacant'}>
          <option>Vacant</option><option>Occupied</option><option>Reserved</option>
        </select>
        <input name="inventory" placeholder="Example: Fan, Bed, Table, Chair" defaultValue={editing?.inventory || ''} />
        <input name="note" placeholder="Room notes (optional)" defaultValue={editing?.note || ''} />
        <FormActions editing={editing} cancel={() => cancelEdit(formId)} />
      </form>

      <Table
        heads={['Room', 'Property', 'Type', 'Rent', 'Status', 'Action']}
        rows={items.map((x) => [
          x.number,
          x.propertyName || '-',
          x.type,
          <Money v={x.rent} />,
          <Status value={x.status} />,
          <div className="row-actions">
            <button type="button" className="secondary" onClick={() => setEditing(x)}>Edit</button>
            <button type="button" className="danger" onClick={() => deleteRecord('rooms', x.id)}>Delete</button>
          </div>,
        ])}
      />
    </section>
  )
}

export function Tenants({ items, rooms, properties }) {
  const formId = 'tenant-form'
  const { editing, setEditing, submit, cancelEdit } = useCrud('tenants')

  return (
    <section className="panel page-panel">
      <h3>Tenants</h3>
      <p className="muted">Email, occupation, emergency phone and notes are optional. Tenant phone must be 10 digits.</p>

      <form id={formId} className="form" onSubmit={submit} key={editing?.id || 'new-tenant'}>
        <select name="propertyName" defaultValue={editing?.propertyName || properties[0]?.name || ''}>
          {properties.length === 0 && <option value="">Add property first</option>}
          {properties.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
        </select>
        <input name="name" placeholder="Example: Aman Singh" defaultValue={editing?.name || ''} required />
        <PhoneInput placeholder="10-digit tenant phone" defaultValue={editing?.phone || ''} required />
        <input name="email" type="email" placeholder="Email address (optional)" defaultValue={editing?.email || ''} />
        <select name="room" defaultValue={editing?.room || rooms[0]?.number || ''}>
          {rooms.length === 0 && <option value="">Add room first</option>}
          {rooms.map((r) => <option key={r.id} value={r.number}>{r.number}</option>)}
        </select>
        <input name="rent" type="number" placeholder="Monthly rent" defaultValue={editing?.rent || ''} />
        <input name="maintenance" type="number" placeholder="Maintenance charge" defaultValue={editing?.maintenance || ''} />
        <input name="deposit" type="number" placeholder="Security deposit" defaultValue={editing?.deposit || ''} />
        <input name="joining" type="date" defaultValue={editing?.joining || today()} />
        <input name="agreementEnd" type="date" defaultValue={editing?.agreementEnd || ''} />
        <PhoneInput name="emergencyPhone" placeholder="Emergency phone (optional)" defaultValue={editing?.emergencyPhone || ''} />
        <input name="occupation" placeholder="Occupation (optional)" defaultValue={editing?.occupation || ''} />
        <input name="note" placeholder="Tenant notes (optional)" defaultValue={editing?.note || ''} />
        <select name="status" defaultValue={editing?.status || 'Active'}>
          <option>Active</option><option>Left</option>
        </select>
        <FormActions editing={editing} cancel={() => cancelEdit(formId)} />
      </form>

      <Table
        heads={['Name', 'Phone', 'Room', 'Bill', 'Paid', 'Due', 'Status', 'Action']}
        rows={items.map((x) => [
          x.name,
          x.phone,
          x.room,
          <Money v={x.monthlyBill} />,
          <Money v={x.paid} />,
          <Money v={x.due} />,
          <Status value={x.payStatus} />,
          <div className="row-actions">
            <button type="button" className="secondary" onClick={() => setEditing(x)}>Edit</button>
            <button type="button" className="danger" onClick={() => deleteRecord('tenants', x.id)}>Delete</button>
          </div>,
        ])}
      />
    </section>
  )
}

export function Payments({ items, tenants }) {
  const formId = 'payment-form'
  const { editing, setEditing, submit, cancelEdit } = useCrud('payments')
  const [selectedTenantName, setSelectedTenantName] = useState(editing?.tenantName || tenants[0]?.name || '')

  useEffect(() => {
    if (editing?.tenantName) setSelectedTenantName(editing.tenantName)
    else if (!selectedTenantName && tenants[0]?.name) setSelectedTenantName(tenants[0].name)
  }, [editing, tenants, selectedTenantName])

  const selectedTenant = tenants.find((t) => t.name === selectedTenantName)
  const handleCancel = () => {
    cancelEdit(formId)
    setSelectedTenantName(tenants[0]?.name || '')
  }

  return (
    <section className="panel page-panel">
      <h3>Payments</h3>
      <p className="muted">Select tenant and phone/room will auto-fill. Notes are optional.</p>

      <form id={formId} className="form" onSubmit={submit} key={editing?.id || 'new-payment'}>
        <select name="tenantName" value={selectedTenantName} onChange={(e) => setSelectedTenantName(e.target.value)} required>
          {tenants.length === 0 && <option value="">Add tenant first</option>}
          {tenants.map((t) => <option key={t.id} value={t.name}>{t.name}</option>)}
        </select>
        <input name="tenantPhone" placeholder="Tenant phone auto-filled" value={selectedTenant?.phone || editing?.tenantPhone || ''} readOnly />
        <input name="room" placeholder="Room auto-filled" value={selectedTenant?.room || editing?.room || ''} readOnly />
        <input name="month" type="month" defaultValue={editing?.month || monthKey()} />
        <select name="category" defaultValue={editing?.category || 'Rent'}>
          <option>Rent</option><option>Rent + Maintenance</option><option>Electricity</option><option>Water</option><option>Parking</option><option>Other</option>
        </select>
        <input name="amount" type="number" placeholder="Amount paid" defaultValue={editing?.amount || ''} required />
        <select name="method" defaultValue={editing?.method || 'UPI'}>
          <option>UPI</option><option>Cash</option><option>Bank</option><option>Card</option>
        </select>
        <input name="date" type="date" defaultValue={editing?.date || today()} />
        <input name="note" placeholder="Payment notes (optional)" defaultValue={editing?.note || ''} />
        <FormActions editing={editing} cancel={handleCancel} />
      </form>

      <Table
        heads={['Tenant', 'Room', 'Month', 'Amount', 'Method', 'Receipt', 'Action']}
        rows={items.map((x) => [
          x.tenantName,
          x.room,
          x.month,
          <Money v={x.amount} />,
          x.method,
          <button type="button" className="secondary" onClick={() => receiptPDF(x)}>PDF</button>,
          <div className="row-actions">
            <button type="button" className="secondary" onClick={() => { setEditing(x); setSelectedTenantName(x.tenantName || '') }}>Edit</button>
            <button type="button" className="danger" onClick={() => deleteRecord('payments', x.id)}>Delete</button>
          </div>,
        ])}
      />
    </section>
  )
}

export function Expenses({ items, properties }) {
  const formId = 'expense-form'
  const { editing, setEditing, submit, cancelEdit } = useCrud('expenses')

  return (
    <section className="panel page-panel">
      <h3>Expenses</h3>
      <p className="muted">Track bills, repairs, staff cost and other expenses. Notes are optional.</p>

      <form id={formId} className="form" onSubmit={submit} key={editing?.id || 'new-expense'}>
        <select name="propertyName" defaultValue={editing?.propertyName || properties[0]?.name || ''}>
          {properties.length === 0 && <option value="">Add property first</option>}
          {properties.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
        </select>
        <input name="title" placeholder="Example: Electricity bill / Plumbing repair" defaultValue={editing?.title || ''} required />
        <select name="category" defaultValue={editing?.category || 'Electricity'}>
          <option>Electricity</option><option>Maintenance</option><option>Cleaning</option><option>Tax</option><option>Water</option><option>Repair</option><option>Staff</option><option>Other</option>
        </select>
        <input name="amount" type="number" placeholder="Expense amount" defaultValue={editing?.amount || ''} required />
        <input name="date" type="date" defaultValue={editing?.date || today()} />
        <input name="note" placeholder="Expense notes (optional)" defaultValue={editing?.note || ''} />
        <FormActions editing={editing} cancel={() => cancelEdit(formId)} />
      </form>

      <Table
        heads={['Title', 'Property', 'Category', 'Amount', 'Date', 'Action']}
        rows={items.map((x) => [
          x.title,
          x.propertyName || '-',
          x.category,
          <Money v={x.amount} />,
          x.date,
          <div className="row-actions">
            <button type="button" className="secondary" onClick={() => setEditing(x)}>Edit</button>
            <button type="button" className="danger" onClick={() => deleteRecord('expenses', x.id)}>Delete</button>
          </div>,
        ])}
      />
    </section>
  )
}

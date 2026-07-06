import { uid, today } from '../utils/format'
import { enrichTenant } from '../models/Tenant'

const numericFields = ['rent', 'deposit', 'amount', 'maintenance']

export function formToRecord(form) {
  const record = Object.fromEntries(new FormData(form).entries())
  numericFields.forEach(key => {
    if (record[key] !== undefined) record[key] = Number(record[key] || 0)
  })
  return record
}

export function addRecord(setData, type, record) {
  setData(prev => ({ ...prev, [type]: [{ id: uid(), ...record }, ...prev[type]] }))
}

export function removeRecord(setData, type, id) {
  setData(prev => ({ ...prev, [type]: prev[type].filter(item => item.id !== id) }))
}

export function addTenant(setData, record) {
  const tenant = { id: uid(), ...record, status: 'Active' }
  setData(prev => ({
    ...prev,
    tenants: [tenant, ...prev.tenants],
    rooms: prev.rooms.map(room => room.number === tenant.room ? { ...room, status: 'Occupied' } : room)
  }))
}

export function getDashboardData(data, propertyId, filterMonth) {
  const tenantsBase = data.tenants.filter(t => propertyId === 'all' || t.propertyId === propertyId)
  const roomsBase = data.rooms.filter(r => propertyId === 'all' || r.propertyId === propertyId)
  const paymentsForMonth = data.payments.filter(p => p.month === filterMonth)
  const expensesForMonth = data.expenses.filter(e => e.date?.startsWith(filterMonth) && (propertyId === 'all' || e.propertyId === propertyId))
  const tenants = tenantsBase.filter(t => t.status === 'Active').map(t => enrichTenant(t, paymentsForMonth))
  const expected = tenants.reduce((sum, t) => sum + t.monthlyBill, 0)
  const collected = paymentsForMonth.filter(p => tenantsBase.some(t => t.id === p.tenantId)).reduce((sum, p) => sum + Number(p.amount || 0), 0)
  const pending = Math.max(expected - collected, 0)
  const expenses = expensesForMonth.reduce((sum, e) => sum + Number(e.amount || 0), 0)
  return { tenantsBase, roomsBase, paymentsForMonth, expensesForMonth, tenants, expected, collected, pending, expenses }
}

export function backupJSON(data) {
  downloadFile(JSON.stringify(data, null, 2), `gharrent-backup-${today()}.json`, 'application/json')
}

export function exportTenantCSV(tenants, month) {
  const rows = [['Name','Phone','Room','Bill','Paid','Due','Late Fee','Status'], ...tenants.map(t => [t.name,t.phone,t.room,t.monthlyBill,t.paid,t.due,t.lateFee,t.payStatus])]
  downloadFile(rows.map(row => row.join(',')).join('\n'), `gharrent-report-${month}.csv`, 'text/csv')
}

function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

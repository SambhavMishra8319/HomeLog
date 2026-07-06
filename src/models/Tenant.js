import { daysBetween } from '../utils/format'

export function enrichTenant(tenant, paymentsForMonth) {
  const monthlyBill = Number(tenant.rent || 0) + Number(tenant.maintenance || 0)
  const paid = paymentsForMonth.filter(p => p.tenantId === tenant.id).reduce((sum, p) => sum + Number(p.amount || 0), 0)
  const due = Math.max(monthlyBill - paid, 0)
  const payStatus = due === 0 ? 'Paid' : paid > 0 ? 'Partial' : 'Pending'
  const lateFee = due > 0 && new Date().getDate() > 10 ? 500 : 0
  return { ...tenant, monthlyBill, paid, due, payStatus, lateFee, agreementDays: daysBetween(tenant.agreementEnd) }
}

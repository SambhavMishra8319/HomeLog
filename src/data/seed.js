import { monthKey, today } from '../utils/format'

export const seed = {
  properties: [
    { id: 'prop1', name: 'Mishra Residency', type: 'Residential', address: 'Mandla, Madhya Pradesh', manager: 'Sambhav Mishra', phone: '8319802425' },
    { id: 'prop2', name: 'GharRent Commercial', type: 'Commercial', address: 'Main Road', manager: 'Nimesh Mishra', phone: '9876501234' },
  ],
  rooms: [
    { id: 'r1', propertyId: 'prop1', number: 'A-101', type: 'Single', floor: '1st', rent: 5500, deposit: 10000, status: 'Occupied', inventory: 'Fan, Bed, Table, Chair' },
    { id: 'r2', propertyId: 'prop1', number: 'A-102', type: 'Single', floor: '1st', rent: 6200, deposit: 12000, status: 'Occupied', inventory: 'Fan, Bed, Cupboard' },
    { id: 'r3', propertyId: 'prop1', number: 'B-201', type: 'Double', floor: '2nd', rent: 7500, deposit: 15000, status: 'Occupied', inventory: 'Fan, Bed, AC, Table' },
    { id: 'r4', propertyId: 'prop1', number: 'B-202', type: 'Single', floor: '2nd', rent: 6000, deposit: 10000, status: 'Vacant', inventory: 'Fan, Bed' },
    { id: 'r5', propertyId: 'prop2', number: 'S-01', type: 'Shop', floor: 'Ground', rent: 14000, deposit: 30000, status: 'Vacant', inventory: 'Meter, Shutter' },
  ],
  tenants: [
    { id: 't1', propertyId: 'prop1', name: 'Aman Singh', phone: '9876543210', email: 'aman@example.com', room: 'A-101', rent: 5500, maintenance: 400, deposit: 10000, joining: '2026-06-01', agreementEnd: '2027-05-31', status: 'Active', occupation: 'Student', documents: 'Aadhar, Photo, Agreement' },
    { id: 't2', propertyId: 'prop1', name: 'Riya Sharma', phone: '9123456780', email: 'riya@example.com', room: 'A-102', rent: 6200, maintenance: 500, deposit: 12000, joining: '2026-06-10', agreementEnd: '2027-06-09', status: 'Active', occupation: 'Designer', documents: 'Aadhar, PAN' },
    { id: 't3', propertyId: 'prop1', name: 'Harsh Verma', phone: '9988776655', email: 'harsh@example.com', room: 'B-201', rent: 7500, maintenance: 600, deposit: 15000, joining: '2026-05-05', agreementEnd: '2026-08-05', status: 'Active', occupation: 'Engineer', documents: 'Aadhar, Agreement' },
  ],
  payments: [
    { id: 'p1', tenantId: 't1', month: monthKey(), amount: 5900, method: 'UPI', date: today(), category: 'Rent + Maintenance', note: 'Full paid' },
    { id: 'p2', tenantId: 't2', month: monthKey(), amount: 3000, method: 'Cash', date: today(), category: 'Rent', note: 'Partial' },
  ],
  expenses: [
    { id: 'e1', propertyId: 'prop1', title: 'Electricity Bill', category: 'Electricity', amount: 4500, date: today(), note: 'Monthly common bill' },
    { id: 'e2', propertyId: 'prop1', title: 'Plumbing Repair', category: 'Maintenance', amount: 1200, date: today(), note: 'Bathroom fitting' },
  ]
}

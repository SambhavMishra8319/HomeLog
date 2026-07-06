import{today,monthKey}from'../utils/format';
export const seed={
properties:[{name:'Mishra Residency',type:'Residential',address:'Mandla, MP',manager:'Sambhav Mishra',phone:'8319802425'}],
rooms:[{propertyName:'Mishra Residency',number:'A-101',type:'Single',floor:'1st',rent:5500,deposit:10000,status:'Occupied',inventory:'Fan, Bed, Table'},{propertyName:'Mishra Residency',number:'A-102',type:'Single',floor:'1st',rent:6200,deposit:12000,status:'Vacant',inventory:'Fan, Bed'}],
tenants:[{propertyName:'Mishra Residency',name:'Aman Singh',phone:'9876543210',email:'aman@example.com',room:'A-101',rent:5500,maintenance:400,deposit:10000,joining:'2026-06-01',agreementEnd:'2027-05-31',status:'Active',occupation:'Student'}],
payments:[{tenantName:'Aman Singh',tenantPhone:'9876543210',room:'A-101',month:monthKey(),amount:5900,method:'UPI',date:today(),category:'Rent + Maintenance',note:'Full paid'}],
expenses:[{propertyName:'Mishra Residency',title:'Electricity Bill',category:'Electricity',amount:4500,date:today(),note:'Common bill'}]};

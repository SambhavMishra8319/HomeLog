export const INR=new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0});
export const today=()=>new Date().toISOString().slice(0,10);
export const monthKey=()=>new Date().toISOString().slice(0,7);
export const daysBetween=d=>Math.ceil((new Date(d)-new Date(today()))/86400000);

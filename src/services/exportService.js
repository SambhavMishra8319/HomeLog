import * as XLSX from 'xlsx';
export function exportExcel(name,rows){const ws=XLSX.utils.json_to_sheet(rows);const wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,'Report');XLSX.writeFile(wb,`${name}.xlsx`)}
export function backupJSON(data){const b=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='gharrent-backup.json';a.click();URL.revokeObjectURL(a.href)}

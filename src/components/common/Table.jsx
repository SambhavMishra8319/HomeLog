export default function Table({ heads, rows }) {
  return <div className="table-wrap">
    <table>
      <thead><tr>{heads.map(head => <th key={head}>{head}</th>)}</tr></thead>
      <tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody>
    </table>
  </div>
}

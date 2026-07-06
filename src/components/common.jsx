import { INR } from "../utils/format";
export function Card({ title, value, hint }) {
  return (
    <div className="card">
      <p>{title}</p>
      <h2>{value}</h2>
      <small>{hint}</small>
    </div>
  );
}
export function Status({ value }) {
  return <span className={`pill ${String(value).toLowerCase()}`}>{value}</span>;
}
export function Table({ heads, rows }) {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {heads.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export function Money({ v }) {
  return INR.format(Number(v || 0));
}

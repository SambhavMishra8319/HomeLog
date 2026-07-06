export default function Card({ title, value, hint }) {
  return <div className="card"><p>{title}</p><h2>{value}</h2><small>{hint}</small></div>
}

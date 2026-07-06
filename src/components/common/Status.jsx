export default function Status({ value }) {
  return <span className={`pill ${String(value).toLowerCase().replaceAll(' ', '-')}`}>{value}</span>
}

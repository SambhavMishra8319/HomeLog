const label = (text) => text.charAt(0).toUpperCase() + text.slice(1);

export default function Topbar({
  tab,
  propertyId,
  setPropertyId,
  filterMonth,
  setFilterMonth,
  properties,
  onExport,
}) {
  return (
    <header className="topbar">
      <div>
        <p>Clean MVC rental management app</p>
        <h1>{label(tab)}</h1>
      </div>
      <div className="filters">
        <select
          value={propertyId}
          onChange={(e) => setPropertyId(e.target.value)}
        >
          <option value="all">All Properties</option>
          {properties.map((property) => (
            <option key={property.id} value={property.id}>
              {property.name}
            </option>
          ))}
        </select>
        <input
          type="month"
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
        />
        <button onClick={onExport}>Export CSV</button>
      </div>
    </header>
  );
}

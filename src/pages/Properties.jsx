import Table from "../components/common/Table";

export default function Properties({ properties, onAdd, onRemove }) {
  return (
    <section className="panel">
      <h3>Properties</h3>
      <p className="muted">Add residential buildings, shops or apartments.</p>
      <form className="form" onSubmit={onAdd}>
        <input name="name" placeholder="Property name" required />
        <select name="type">
          <option>Residential</option>
          <option>Commercial</option>
          <option>Hostel</option>
          <option>Mixed</option>
        </select>
        <input name="address" placeholder="Address" />
        <input name="manager" placeholder="Manager" />
        <input name="phone" placeholder="Contact" />
        <button>Add Property</button>
      </form>
      <Table
        heads={["Property", "Type", "Address", "Manager", "Phone", "Action"]}
        rows={properties.map((p) => [
          p.name,
          p.type,
          p.address,
          p.manager,
          p.phone,
          <button className="ghost" onClick={() => onRemove(p.id)}>
            Delete
          </button>,
        ])}
      />
    </section>
  );
}

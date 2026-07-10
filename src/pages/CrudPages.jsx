// import { useEffect, useState } from "react";
// import {
//   addRecord,
//   deleteRecord,
//   updateRecord,
// } from "../services/firestoreService";
// import { Table, Status, Money } from "../components/common";
// import { today, monthKey } from "../utils/format";
// import { receiptPDF } from "../services/receiptService";

// const numericFields = ["rent", "deposit", "amount", "maintenance"];

// function toPayload(form) {
//   const data = Object.fromEntries(new FormData(form).entries());
//   numericFields.forEach((key) => {
//     if (key in data) data[key] = Number(data[key] || 0);
//   });
//   return data;
// }

// function useCrud(collectionName) {
//   const [editing, setEditing] = useState(null);

//   const submit = async (e) => {
//     e.preventDefault();
//     const form = e.currentTarget;
//     const payload = toPayload(form);

//     try {
//       if (editing?.id) {
//         await updateRecord(collectionName, editing.id, payload);
//         setEditing(null);
//       } else {
//         await addRecord(collectionName, payload);
//       }
//       form.reset();
//     } catch (err) {
//       console.error(`${collectionName} submit error:`, err);
//       alert("Something went wrong. Check console.");
//     }
//   };

//   const cancelEdit = (formId) => {
//     const form = document.getElementById(formId);
//     if (form) form.reset();
//     setEditing(null);
//   };

//   return { editing, setEditing, submit, cancelEdit };
// }

// function FormActions({ editing, cancel }) {
//   return (
//     <div className="form-actions">
//       <button type="submit">{editing ? "Update" : "Add"}</button>
//       {editing && (
//         <button type="button" className="secondary" onClick={cancel}>
//           Cancel
//         </button>
//       )}
//     </div>
//   );
// }

// function PhoneInput({
//   name = "phone",
//   placeholder,
//   defaultValue = "",
//   required = false,
//   readOnly = false,
//   value,
//   onChange,
// }) {
//   const common = {
//     name,
//     type: "tel",
//     placeholder,
//     pattern: "[0-9]{10}",
//     maxLength: "10",
//     minLength: "10",
//     title: "Phone number must be exactly 10 digits",
//     required,
//     readOnly,
//   };
//   if (value !== undefined)
//     return <input {...common} value={value} onChange={onChange} />;
//   return <input {...common} defaultValue={defaultValue} />;
// }

// export function Properties({ items }) {
//   const formId = "property-form";
//   const { editing, setEditing, submit, cancelEdit } = useCrud("properties");

//   return (
//     <section className="panel page-panel">
//       <h3>Properties</h3>
//       <p className="muted">
//         Create buildings, hostels, apartments or shops. Phone is optional but
//         must be 10 digits if entered.
//       </p>

//       <form
//         id={formId}
//         className="form"
//         onSubmit={submit}
//         key={editing?.id || "new-property"}
//       >
//         <input
//           name="name"
//           placeholder="Example: Mishra Residency"
//           defaultValue={editing?.name || ""}
//           required
//         />
//         <select name="type" defaultValue={editing?.type || "Residential"}>
//           <option>Residential</option>
//           <option>Commercial</option>
//           <option>Hostel</option>
//           <option>Mixed</option>
//         </select>
//         <input
//           name="address"
//           placeholder="Example: Mandla, Madhya Pradesh"
//           defaultValue={editing?.address || ""}
//         />
//         <input
//           name="manager"
//           placeholder="Example: Sambhav Mishra"
//           defaultValue={editing?.manager || ""}
//         />
//         <PhoneInput
//           placeholder="10-digit manager phone (optional)"
//           defaultValue={editing?.phone || ""}
//         />
//         <input
//           name="note"
//           placeholder="Property notes (optional)"
//           defaultValue={editing?.note || ""}
//         />
//         <FormActions editing={editing} cancel={() => cancelEdit(formId)} />
//       </form>

//       <Table
//         heads={["Name", "Type", "Address", "Manager", "Phone", "Action"]}
//         rows={items.map((x) => [
//           x.name,
//           x.type,
//           x.address || "-",
//           x.manager || "-",
//           x.phone || "-",
//           <div className="row-actions">
//             <button
//               type="button"
//               className="secondary"
//               onClick={() => setEditing(x)}
//             >
//               Edit
//             </button>
//             <button
//               type="button"
//               className="danger"
//               onClick={() => deleteRecord("properties", x.id)}
//             >
//               Delete
//             </button>
//           </div>,
//         ])}
//       />
//     </section>
//   );
// }

// export function Rooms({ items, properties }) {
//   const formId = "room-form";
//   const { editing, setEditing, submit, cancelEdit } = useCrud("rooms");

//   return (
//     <section className="panel page-panel">
//       <h3>Rooms</h3>
//       <p className="muted">
//         Add units and track rent, deposit, inventory and vacancy.
//       </p>

//       <form
//         id={formId}
//         className="form"
//         onSubmit={submit}
//         key={editing?.id || "new-room"}
//       >
//         <select
//           name="propertyName"
//           defaultValue={editing?.propertyName || properties[0]?.name || ""}
//         >
//           {properties.length === 0 && (
//             <option value="">Add property first</option>
//           )}
//           {properties.map((p) => (
//             <option key={p.id} value={p.name}>
//               {p.name}
//             </option>
//           ))}
//         </select>
//         <input
//           name="number"
//           placeholder="Example: A-101 / Shop-01"
//           defaultValue={editing?.number || ""}
//           required
//         />
//         <select name="type" defaultValue={editing?.type || "Single"}>
//           <option>Single</option>
//           <option>Double</option>
//           <option>1BHK</option>
//           <option>2BHK</option>
//           <option>Shop</option>
//           <option>Office</option>
//         </select>
//         <input
//           name="floor"
//           placeholder="Example: Ground / 1st / 2nd"
//           defaultValue={editing?.floor || ""}
//         />
//         <input
//           name="rent"
//           type="number"
//           placeholder="Monthly rent amount"
//           defaultValue={editing?.rent || ""}
//         />
//         <input
//           name="deposit"
//           type="number"
//           placeholder="Security deposit amount"
//           defaultValue={editing?.deposit || ""}
//         />
//         <select name="status" defaultValue={editing?.status || "Vacant"}>
//           <option>Vacant</option>
//           <option>Occupied</option>
//           <option>Reserved</option>
//         </select>
//         <input
//           name="inventory"
//           placeholder="Example: Fan, Bed, Table, Chair"
//           defaultValue={editing?.inventory || ""}
//         />
//         <input
//           name="note"
//           placeholder="Room notes (optional)"
//           defaultValue={editing?.note || ""}
//         />
//         <FormActions editing={editing} cancel={() => cancelEdit(formId)} />
//       </form>

//       <Table
//         heads={["Room", "Property", "Type", "Rent", "Status", "Action"]}
//         rows={items.map((x) => [
//           x.number,
//           x.propertyName || "-",
//           x.type,
//           <Money v={x.rent} />,
//           <Status value={x.status} />,
//           <div className="row-actions">
//             <button
//               type="button"
//               className="secondary"
//               onClick={() => setEditing(x)}
//             >
//               Edit
//             </button>
//             <button
//               type="button"
//               className="danger"
//               onClick={() => deleteRecord("rooms", x.id)}
//             >
//               Delete
//             </button>
//           </div>,
//         ])}
//       />
//     </section>
//   );
// }

// export function Tenants({ items, rooms, properties }) {
//   const formId = "tenant-form";
//   const { editing, setEditing, submit, cancelEdit } = useCrud("tenants");

//   return (
//     <section className="panel page-panel">
//       <h3>Kirayadar</h3>
//       <p className="muted">
//         Email, occupation, emergency phone and notes are optional. Tenant phone
//         must be 10 digits.
//       </p>

//       <form
//         id={formId}
//         className="form"
//         onSubmit={submit}
//         key={editing?.id || "new-tenant"}
//       >
//         <select
//           name="propertyName"
//           defaultValue={editing?.propertyName || properties[0]?.name || ""}
//         >
//           {properties.length === 0 && (
//             <option value="">Add property first</option>
//           )}
//           {properties.map((p) => (
//             <option key={p.id} value={p.name}>
//               {p.name}
//             </option>
//           ))}
//         </select>
//         <input
//           name="name"
//           placeholder="Example: Aman Singh"
//           defaultValue={editing?.name || ""}
//           required
//         />
//         <PhoneInput
//           placeholder="10-digit tenant phone"
//           defaultValue={editing?.phone || ""}
//           required
//         />
//         <input
//           name="email"
//           type="email"
//           placeholder="Email address (optional)"
//           defaultValue={editing?.email || ""}
//         />
//         <select
//           name="room"
//           defaultValue={editing?.room || rooms[0]?.number || ""}
//         >
//           {rooms.length === 0 && <option value="">Add room first</option>}
//           {rooms.map((r) => (
//             <option key={r.id} value={r.number}>
//               {r.number}
//             </option>
//           ))}
//         </select>
//         <input
//           name="rent"
//           type="number"
//           placeholder="Monthly rent"
//           defaultValue={editing?.rent || ""}
//         />
//         <input
//           name="maintenance"
//           type="number"
//           placeholder="Maintenance charge"
//           defaultValue={editing?.maintenance || ""}
//         />
//         <input
//           name="deposit"
//           type="number"
//           placeholder="Security deposit"
//           defaultValue={editing?.deposit || ""}
//         />
//         <input
//           name="joining"
//           type="date"
//           defaultValue={editing?.joining || today()}
//         />
//         <input
//           name="agreementEnd"
//           type="date"
//           defaultValue={editing?.agreementEnd || ""}
//         />
//         <PhoneInput
//           name="emergencyPhone"
//           placeholder="Emergency phone (optional)"
//           defaultValue={editing?.emergencyPhone || ""}
//         />
//         <input
//           name="occupation"
//           placeholder="Occupation (optional)"
//           defaultValue={editing?.occupation || ""}
//         />
//         <input
//           name="note"
//           placeholder="Tenant notes (optional)"
//           defaultValue={editing?.note || ""}
//         />
//         <select name="status" defaultValue={editing?.status || "Active"}>
//           <option>Active</option>
//           <option>Left</option>
//         </select>
//         <FormActions editing={editing} cancel={() => cancelEdit(formId)} />
//       </form>

//       <Table
//         heads={[
//           "Name",
//           "Phone",
//           "Room",
//           "Bill",
//           "Paid",
//           "Due",
//           "Status",
//           "Action",
//         ]}
//         rows={items.map((x) => [
//           x.name,
//           x.phone,
//           x.room,
//           <Money v={x.monthlyBill} />,
//           <Money v={x.paid} />,
//           <Money v={x.due} />,
//           <Status value={x.payStatus} />,
//           <div className="row-actions">
//             <button
//               type="button"
//               className="secondary"
//               onClick={() => setEditing(x)}
//             >
//               Edit
//             </button>
//             <button
//               type="button"
//               className="danger"
//               onClick={() => deleteRecord("tenants", x.id)}
//             >
//               Delete
//             </button>
//           </div>,
//         ])}
//       />
//     </section>
//   );
// }

// export function Payments({ items, tenants }) {
//   const formId = "payment-form";
//   const { editing, setEditing, submit, cancelEdit } = useCrud("payments");
//   const [selectedTenantName, setSelectedTenantName] = useState(
//     editing?.tenantName || tenants[0]?.name || "",
//   );

//   useEffect(() => {
//     if (editing?.tenantName) setSelectedTenantName(editing.tenantName);
//     else if (!selectedTenantName && tenants[0]?.name)
//       setSelectedTenantName(tenants[0].name);
//   }, [editing, tenants, selectedTenantName]);

//   const selectedTenant = tenants.find((t) => t.name === selectedTenantName);
//   const handleCancel = () => {
//     cancelEdit(formId);
//     setSelectedTenantName(tenants[0]?.name || "");
//   };

//   return (
//     <section className="panel page-panel">
//       <h3>Payments</h3>
//       <p className="muted">
//         Select tenant and phone/room will auto-fill. Notes are optional.
//       </p>

//       <form
//         id={formId}
//         className="form"
//         onSubmit={submit}
//         key={editing?.id || "new-payment"}
//       >
//         <select
//           name="tenantName"
//           value={selectedTenantName}
//           onChange={(e) => setSelectedTenantName(e.target.value)}
//           required
//         >
//           {tenants.length === 0 && <option value="">Add tenant first</option>}
//           {tenants.map((t) => (
//             <option key={t.id} value={t.name}>
//               {t.name}
//             </option>
//           ))}
//         </select>
//         <input
//           name="tenantPhone"
//           placeholder="Tenant phone auto-filled"
//           value={selectedTenant?.phone || editing?.tenantPhone || ""}
//           readOnly
//         />
//         <input
//           name="room"
//           placeholder="Room auto-filled"
//           value={selectedTenant?.room || editing?.room || ""}
//           readOnly
//         />
//         <input
//           name="month"
//           type="month"
//           defaultValue={editing?.month || monthKey()}
//         />
//         <select name="category" defaultValue={editing?.category || "Rent"}>
//           <option>Rent</option>
//           <option>Rent + Maintenance</option>
//           <option>Electricity</option>
//           <option>Water</option>
//           <option>Parking</option>
//           <option>Other</option>
//         </select>
//         <input
//           name="amount"
//           type="number"
//           placeholder="Amount paid"
//           defaultValue={editing?.amount || ""}
//           required
//         />
//         <select name="method" defaultValue={editing?.method || "UPI"}>
//           <option>UPI</option>
//           <option>Cash</option>
//           <option>Bank</option>
//           <option>Card</option>
//         </select>
//         <input
//           name="date"
//           type="date"
//           defaultValue={editing?.date || today()}
//         />
//         <input
//           name="note"
//           placeholder="Payment notes (optional)"
//           defaultValue={editing?.note || ""}
//         />
//         <FormActions editing={editing} cancel={handleCancel} />
//       </form>

//       <Table
//         heads={[
//           "Tenant",
//           "Room",
//           "Month",
//           "Amount",
//           "Method",
//           "Receipt",
//           "Action",
//         ]}
//         rows={items.map((x) => [
//           x.tenantName,
//           x.room,
//           x.month,
//           <Money v={x.amount} />,
//           x.method,
//           <button
//             type="button"
//             className="secondary"
//             onClick={() => receiptPDF(x)}
//           >
//             PDF
//           </button>,
//           <div className="row-actions">
//             <button
//               type="button"
//               className="secondary"
//               onClick={() => {
//                 setEditing(x);
//                 setSelectedTenantName(x.tenantName || "");
//               }}
//             >
//               Edit
//             </button>
//             <button
//               type="button"
//               className="danger"
//               onClick={() => deleteRecord("payments", x.id)}
//             >
//               Delete
//             </button>
//           </div>,
//         ])}
//       />
//     </section>
//   );
// }

// export function Expenses({ items, properties }) {
//   const formId = "expense-form";
//   const { editing, setEditing, submit, cancelEdit } = useCrud("expenses");

//   return (
//     <section className="panel page-panel">
//       <h3>Expenses</h3>
//       <p className="muted">
//         Track bills, repairs, staff cost and other expenses. Notes are optional.
//       </p>

//       <form
//         id={formId}
//         className="form"
//         onSubmit={submit}
//         key={editing?.id || "new-expense"}
//       >
//         <select
//           name="propertyName"
//           defaultValue={editing?.propertyName || properties[0]?.name || ""}
//         >
//           {properties.length === 0 && (
//             <option value="">Add property first</option>
//           )}
//           {properties.map((p) => (
//             <option key={p.id} value={p.name}>
//               {p.name}
//             </option>
//           ))}
//         </select>
//         <input
//           name="title"
//           placeholder="Example: Electricity bill / Plumbing repair"
//           defaultValue={editing?.title || ""}
//           required
//         />
//         <select
//           name="category"
//           defaultValue={editing?.category || "Electricity"}
//         >
//           <option>Electricity</option>
//           <option>Maintenance</option>
//           <option>Cleaning</option>
//           <option>Tax</option>
//           <option>Water</option>
//           <option>Repair</option>
//           <option>Staff</option>
//           <option>Other</option>
//         </select>
//         <input
//           name="amount"
//           type="number"
//           placeholder="Expense amount"
//           defaultValue={editing?.amount || ""}
//           required
//         />
//         <input
//           name="date"
//           type="date"
//           defaultValue={editing?.date || today()}
//         />
//         <input
//           name="note"
//           placeholder="Expense notes (optional)"
//           defaultValue={editing?.note || ""}
//         />
//         <FormActions editing={editing} cancel={() => cancelEdit(formId)} />
//       </form>

//       <Table
//         heads={["Title", "Property", "Category", "Amount", "Date", "Action"]}
//         rows={items.map((x) => [
//           x.title,
//           x.propertyName || "-",
//           x.category,
//           <Money v={x.amount} />,
//           x.date,
//           <div className="row-actions">
//             <button
//               type="button"
//               className="secondary"
//               onClick={() => setEditing(x)}
//             >
//               Edit
//             </button>
//             <button
//               type="button"
//               className="danger"
//               onClick={() => deleteRecord("expenses", x.id)}
//             >
//               Delete
//             </button>
//           </div>,
//         ])}
//       />
//     </section>
//   );
// }
import { useEffect, useMemo, useState } from "react";

import {
  addRecord,
  deleteRecord,
  updateRecord,
} from "../services/firestoreService";

import { Table, Status, Money } from "../components/common";
import { today, monthKey } from "../utils/format";
import { receiptPDF } from "../services/receiptService";

const numericFields = [
  "rent",
  "deposit",
  "amount",
  "maintenance",
];

/**
 * Converts HTML form data into a normal object.
 * Numeric fields are converted from strings to numbers.
 */
function formToPayload(form) {
  const data = Object.fromEntries(new FormData(form).entries());

  numericFields.forEach((field) => {
    if (field in data) {
      data[field] = Number(data[field] || 0);
    }
  });

  return data;
}

/**
 * Reusable CRUD hook.
 *
 * transformPayload can be used to add related names,
 * numbers, and IDs before saving the record.
 */
function useCrud(collectionName, transformPayload) {
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    let payload = formToPayload(form);

    if (transformPayload) {
      payload = transformPayload(payload, editing);
    }

    try {
      setSubmitting(true);

      if (editing?.id) {
        await updateRecord(
          collectionName,
          editing.id,
          payload
        );

        setEditing(null);
      } else {
        await addRecord(collectionName, payload);
      }

      form.reset();
    } catch (error) {
      console.error(
        `${collectionName} submit error:`,
        error
      );

      window.alert(
        "Something went wrong. Please check the console."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const cancelEdit = (formId) => {
    const form = document.getElementById(formId);

    if (form) {
      form.reset();
    }

    setEditing(null);
  };

  return {
    editing,
    setEditing,
    submitting,
    submit,
    cancelEdit,
  };
}

function FormActions({
  editing,
  submitting,
  cancel,
}) {
  return (
    <div className="form-actions">
      <button type="submit" disabled={submitting}>
        {submitting
          ? "Saving..."
          : editing
            ? "Update"
            : "Add"}
      </button>

      {editing && (
        <button
          type="button"
          className="secondary"
          onClick={cancel}
          disabled={submitting}
        >
          Cancel
        </button>
      )}
    </div>
  );
}

function PhoneInput({
  name = "phone",
  placeholder,
  defaultValue = "",
  required = false,
}) {
  return (
    <input
      name={name}
      type="tel"
      inputMode="numeric"
      placeholder={placeholder}
      pattern="[0-9]{10}"
      maxLength={10}
      minLength={10}
      title="Phone number must contain exactly 10 digits"
      defaultValue={defaultValue}
      required={required}
    />
  );
}

function confirmDelete(label) {
  return window.confirm(
    `Are you sure you want to delete ${label}?`
  );
}

/* =====================================================
   PROPERTIES
===================================================== */

export function Properties({ items = [] }) {
  const formId = "property-form";

  const {
    editing,
    setEditing,
    submitting,
    submit,
    cancelEdit,
  } = useCrud("properties");

  const handleDelete = async (property) => {
    if (!confirmDelete(property.name || "this property")) {
      return;
    }

    try {
      await deleteRecord("properties", property.id);
    } catch (error) {
      console.error("Property delete error:", error);
      window.alert("Unable to delete property.");
    }
  };

  return (
    <section className="panel page-panel">
      <div className="page-section-heading">
        <div>
          <h3>Properties</h3>

          <p className="muted">
            Add and manage your buildings, apartments,
            hostels, shops, or offices.
          </p>
        </div>
      </div>

      <form
        id={formId}
        className="form"
        onSubmit={submit}
        key={editing?.id || "new-property"}
      >
        <input
          name="name"
          placeholder="Property name"
          defaultValue={editing?.name || ""}
          required
        />

        <select
          name="type"
          defaultValue={editing?.type || "Residential"}
          required
        >
          <option value="Residential">
            Residential
          </option>

          <option value="Commercial">
            Commercial
          </option>

          <option value="Hostel">Hostel</option>

          <option value="Mixed">Mixed</option>
        </select>

        <input
          name="address"
          placeholder="Property address"
          defaultValue={editing?.address || ""}
          required
        />

        <input
          name="manager"
          placeholder="Manager name (optional)"
          defaultValue={editing?.manager || ""}
        />

        <PhoneInput
          placeholder="Manager phone (optional)"
          defaultValue={editing?.phone || ""}
        />

        <FormActions
          editing={editing}
          submitting={submitting}
          cancel={() => cancelEdit(formId)}
        />
      </form>

      <Table
        heads={[
          "Name",
          "Type",
          "Address",
          "Manager",
          "Phone",
          "Action",
        ]}
        rows={items.map((property) => [
          property.name || "-",
          property.type || "-",
          property.address || "-",
          property.manager || "-",
          property.phone || "-",

          <div
            className="row-actions"
            key={`${property.id}-actions`}
          >
            <button
              type="button"
              className="secondary"
              onClick={() => setEditing(property)}
            >
              Edit
            </button>

            <button
              type="button"
              className="danger"
              onClick={() => handleDelete(property)}
            >
              Delete
            </button>
          </div>,
        ])}
      />
    </section>
  );
}

/* =====================================================
   ROOMS
===================================================== */

export function Rooms({
  items = [],
  properties = [],
}) {
  const formId = "room-form";

  const transformRoomPayload = (payload) => {
    const property = properties.find(
      (item) =>
        String(item.id) === String(payload.propertyId)
    );

    return {
      ...payload,

      propertyId: property?.id || "",
      propertyName: property?.name || "",

      status: payload.status || "Vacant",
    };
  };

  const {
    editing,
    setEditing,
    submitting,
    submit,
    cancelEdit,
  } = useCrud("rooms", transformRoomPayload);

  const handleDelete = async (room) => {
    if (
      !confirmDelete(
        `room ${room.number || ""}`.trim()
      )
    ) {
      return;
    }

    try {
      await deleteRecord("rooms", room.id);
    } catch (error) {
      console.error("Room delete error:", error);
      window.alert("Unable to delete room.");
    }
  };

  return (
    <section className="panel page-panel">
      <div className="page-section-heading">
        <div>
          <h3>Rooms</h3>

          <p className="muted">
            Add rental units and manage their rent,
            deposit, and occupancy status.
          </p>
        </div>
      </div>

      {properties.length === 0 && (
        <div className="empty-warning">
          Add a property before creating a room.
        </div>
      )}

      <form
        id={formId}
        className="form"
        onSubmit={submit}
        key={editing?.id || "new-room"}
      >
        <select
          name="propertyId"
          defaultValue={
            editing?.propertyId ||
            properties[0]?.id ||
            ""
          }
          required
          disabled={properties.length === 0}
        >
          {properties.length === 0 && (
            <option value="">
              No property available
            </option>
          )}

          {properties.map((property) => (
            <option
              key={property.id}
              value={property.id}
            >
              {property.name}
            </option>
          ))}
        </select>

        <input
          name="number"
          placeholder="Room number, for example A-101"
          defaultValue={editing?.number || ""}
          required
        />

        <select
          name="type"
          defaultValue={editing?.type || "Single"}
          required
        >
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="1BHK">1BHK</option>
          <option value="2BHK">2BHK</option>
          <option value="3BHK">3BHK</option>
          <option value="Shop">Shop</option>
          <option value="Office">Office</option>
        </select>

        <input
          name="floor"
          placeholder="Floor, for example Ground or 1st"
          defaultValue={editing?.floor || ""}
        />

        <input
          name="rent"
          type="number"
          min="0"
          placeholder="Monthly rent"
          defaultValue={editing?.rent ?? ""}
          required
        />

        <input
          name="deposit"
          type="number"
          min="0"
          placeholder="Security deposit"
          defaultValue={editing?.deposit ?? ""}
        />

        <select
          name="status"
          defaultValue={editing?.status || "Vacant"}
          required
        >
          <option value="Vacant">Vacant</option>
          <option value="Occupied">Occupied</option>
          <option value="Reserved">Reserved</option>
          <option value="Maintenance">
            Under Maintenance
          </option>
        </select>

        <FormActions
          editing={editing}
          submitting={submitting}
          cancel={() => cancelEdit(formId)}
        />
      </form>

      <Table
        heads={[
          "Room",
          "Property",
          "Type",
          "Floor",
          "Rent",
          "Deposit",
          "Status",
          "Action",
        ]}
        rows={items.map((room) => [
          room.number || "-",
          room.propertyName || "-",
          room.type || "-",
          room.floor || "-",
          <Money v={room.rent} />,
          <Money v={room.deposit} />,
          <Status value={room.status} />,

          <div
            className="row-actions"
            key={`${room.id}-actions`}
          >
            <button
              type="button"
              className="secondary"
              onClick={() => setEditing(room)}
            >
              Edit
            </button>

            <button
              type="button"
              className="danger"
              onClick={() => handleDelete(room)}
            >
              Delete
            </button>
          </div>,
        ])}
      />
    </section>
  );
}

/* =====================================================
   TENANTS
===================================================== */

export function Tenants({
  items = [],
  rooms = [],
  properties = [],
}) {
  const formId = "tenant-form";

  const [selectedPropertyId, setSelectedPropertyId] =
    useState("");
  

  const transformTenantPayload = (payload) => {
    const property = properties.find(
      (item) =>
        String(item.id) === String(payload.propertyId)
    );

    const room = rooms.find(
      (item) =>
        String(item.id) === String(payload.roomId)
    );

    return {
      ...payload,

      propertyId: property?.id || "",
      propertyName: property?.name || "",

      roomId: room?.id || "",
      room: room?.number || "",
      roomNumber: room?.number || "",

      status: payload.status || "Active",
    };
  };

const {
    editing,
    setEditing,
    submitting,
    submit,
    cancelEdit,
  } = useCrud("tenants", transformTenantPayload);

  const editingRoomId = editing?.roomId || "";

  useEffect(() => {
    if (editing?.propertyId) {
      setSelectedPropertyId(editing.propertyId);
      return;
    }

    if (!selectedPropertyId && properties[0]?.id) {
      setSelectedPropertyId(properties[0].id);
    }
  }, [
    editing,
    properties,
    selectedPropertyId,
  ]);
  
  const availableRooms = useMemo(() => {
    return rooms.filter((room) => {
      const belongsToProperty =
        String(room.propertyId) ===
        String(selectedPropertyId);

      const isVacant =
        room.status === "Vacant" ||
        String(room.id) === String(editingRoomId);

      return belongsToProperty && isVacant;
    });
  }, [rooms, selectedPropertyId]);

  const handlePropertyChange = (event) => {
    setSelectedPropertyId(event.target.value);
  };

  const handleCancel = () => {
    cancelEdit(formId);
    setSelectedPropertyId(properties[0]?.id || "");
  };

  const handleDelete = async (tenant) => {
    if (!confirmDelete(tenant.name || "this tenant")) {
      return;
    }

    try {
      await deleteRecord("tenants", tenant.id);
    } catch (error) {
      console.error("Tenant delete error:", error);
      window.alert("Unable to delete tenant.");
    }
  };

  return (
    <section className="panel page-panel">
      <div className="page-section-heading">
        <div>
          <h3>Tenants</h3>

          <p className="muted">
            Add tenants, assign rooms, and track their
            rent and agreement dates.
          </p>
        </div>
      </div>

      {properties.length === 0 && (
        <div className="empty-warning">
          Add a property before creating a tenant.
        </div>
      )}

      {properties.length > 0 && rooms.length === 0 && (
        <div className="empty-warning">
          Add a room before creating a tenant.
        </div>
      )}

      <form
        id={formId}
        className="form"
        onSubmit={submit}
        key={editing?.id || "new-tenant"}
      >
        <select
          name="propertyId"
          value={selectedPropertyId}
          onChange={handlePropertyChange}
          required
          disabled={properties.length === 0}
        >
          {properties.length === 0 && (
            <option value="">
              No property available
            </option>
          )}

          {properties.map((property) => (
            <option
              key={property.id}
              value={property.id}
            >
              {property.name}
            </option>
          ))}
        </select>

        <select
          name="roomId"
          defaultValue={
            editing?.roomId ||
            availableRooms[0]?.id ||
            ""
          }
          key={`${editing?.id || "new"}-${selectedPropertyId}`}
          required
          disabled={availableRooms.length === 0}
        >
          {availableRooms.length === 0 && (
            <option value="">
              No vacant room available
            </option>
          )}

          {availableRooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.number} — ₹
              {Number(room.rent || 0).toLocaleString(
                "en-IN"
              )}
            </option>
          ))}
        </select>

        <input
          name="name"
          placeholder="Tenant name"
          defaultValue={editing?.name || ""}
          required
        />

        <PhoneInput
          placeholder="10-digit tenant phone"
          defaultValue={editing?.phone || ""}
          required
        />

        <input
          name="rent"
          type="number"
          min="0"
          placeholder="Monthly rent"
          defaultValue={editing?.rent ?? ""}
          required
        />

        <input
          name="maintenance"
          type="number"
          min="0"
          placeholder="Maintenance charge"
          defaultValue={editing?.maintenance ?? 0}
        />

        <input
          name="deposit"
          type="number"
          min="0"
          placeholder="Security deposit"
          defaultValue={editing?.deposit ?? ""}
        />

        <label className="form-field">
          <span>Joining date</span>

          <input
            name="joining"
            type="date"
            defaultValue={editing?.joining || today()}
            required
          />
        </label>

        <label className="form-field">
          <span>Agreement end date</span>

          <input
            name="agreementEnd"
            type="date"
            defaultValue={editing?.agreementEnd || ""}
          />
        </label>

        <select
          name="status"
          defaultValue={editing?.status || "Active"}
          required
        >
          <option value="Active">Active</option>
          <option value="Notice">On Notice</option>
          <option value="Left">Left</option>
        </select>

        <FormActions
          editing={editing}
          submitting={submitting}
          cancel={handleCancel}
        />
      </form>

      <Table
        heads={[
          "Name",
          "Phone",
          "Property",
          "Room",
          "Monthly Bill",
          "Paid",
          "Due",
          "Payment",
          "Tenant Status",
          "Action",
        ]}
        rows={items.map((tenant) => [
          tenant.name || "-",
          tenant.phone || "-",
          tenant.propertyName || "-",
          tenant.roomNumber || tenant.room || "-",

          <Money
            v={
              tenant.monthlyBill ??
              Number(tenant.rent || 0) +
                Number(tenant.maintenance || 0)
            }
          />,

          <Money v={tenant.paid || 0} />,
          <Money v={tenant.due || 0} />,

          <Status
            value={
              tenant.payStatus ||
              tenant.paymentStatus ||
              "Pending"
            }
          />,

          <Status value={tenant.status || "Active"} />,

          <div
            className="row-actions"
            key={`${tenant.id}-actions`}
          >
            <button
              type="button"
              className="secondary"
              onClick={() => {
                setEditing(tenant);

                setSelectedPropertyId(
                  tenant.propertyId || ""
                );
              }}
            >
              Edit
            </button>

            <button
              type="button"
              className="danger"
              onClick={() => handleDelete(tenant)}
            >
              Delete
            </button>
          </div>,
        ])}
      />
    </section>
  );
}

/* =====================================================
   PAYMENTS
===================================================== */

export function Payments({
  items = [],
  tenants = [],
}) {
  const formId = "payment-form";

  const [selectedTenantId, setSelectedTenantId] =
    useState("");

  const activeTenants = useMemo(() => {
    return tenants.filter(
      (tenant) => tenant.status !== "Left"
    );
  }, [tenants]);

  const selectedTenant = useMemo(() => {
    return activeTenants.find(
      (tenant) =>
        String(tenant.id) ===
        String(selectedTenantId)
    );
  }, [activeTenants, selectedTenantId]);

  const transformPaymentPayload = (payload) => {
    const tenant = tenants.find(
      (item) =>
        String(item.id) === String(payload.tenantId)
    );

    return {
      ...payload,

      tenantId: tenant?.id || "",
      tenantName: tenant?.name || "",

      propertyId: tenant?.propertyId || "",
      propertyName: tenant?.propertyName || "",

      roomId: tenant?.roomId || "",
      room:
        tenant?.roomNumber ||
        tenant?.room ||
        "",

      month: payload.month || monthKey(),
      date: payload.date || today(),
    };
  };

  const {
    editing,
    setEditing,
    submitting,
    submit,
    cancelEdit,
  } = useCrud("payments", transformPaymentPayload);

  useEffect(() => {
    if (editing?.tenantId) {
      setSelectedTenantId(editing.tenantId);
      return;
    }

    if (
      !selectedTenantId &&
      activeTenants[0]?.id
    ) {
      setSelectedTenantId(activeTenants[0].id);
    }
  }, [
    editing,
    activeTenants,
    selectedTenantId,
  ]);

  const handleCancel = () => {
    cancelEdit(formId);

    setSelectedTenantId(
      activeTenants[0]?.id || ""
    );
  };

  const handleDelete = async (payment) => {
    const label = `${payment.tenantName || "payment"} ${
      payment.month || ""
    }`.trim();

    if (!confirmDelete(label)) {
      return;
    }

    try {
      await deleteRecord("payments", payment.id);
    } catch (error) {
      console.error("Payment delete error:", error);
      window.alert("Unable to delete payment.");
    }
  };

  return (
    <section className="panel page-panel">
      <div className="page-section-heading">
        <div>
          <h3>Rents</h3>

          <p className="muted">
            Record rent payments and generate payment
            receipts.
          </p>
        </div>
      </div>

      {activeTenants.length === 0 && (
        <div className="empty-warning">
          Add an active tenant before recording a
          payment.
        </div>
      )}

      <form
        id={formId}
        className="form"
        onSubmit={submit}
        key={editing?.id || "new-payment"}
      >
        <select
          name="tenantId"
          value={selectedTenantId}
          onChange={(event) =>
            setSelectedTenantId(event.target.value)
          }
          required
          disabled={activeTenants.length === 0}
        >
          {activeTenants.length === 0 && (
            <option value="">
              No active tenant available
            </option>
          )}

          {activeTenants.map((tenant) => (
            <option
              key={tenant.id}
              value={tenant.id}
            >
              {tenant.name} —{" "}
              {tenant.roomNumber ||
                tenant.room ||
                "No room"}
            </option>
          ))}
        </select>

        <div className="readonly-info">
          <span>Property</span>

          <strong>
            {selectedTenant?.propertyName || "-"}
          </strong>
        </div>

        <div className="readonly-info">
          <span>Room</span>

          <strong>
            {selectedTenant?.roomNumber ||
              selectedTenant?.room ||
              "-"}
          </strong>
        </div>

        <label className="form-field">
          <span>Payment month</span>

          <input
            name="month"
            type="month"
            defaultValue={
              editing?.month || monthKey()
            }
            required
          />
        </label>

        <input
          name="amount"
          type="number"
          min="1"
          placeholder="Amount paid"
          defaultValue={editing?.amount ?? ""}
          required
        />

        <select
          name="method"
          defaultValue={editing?.method || "UPI"}
          required
        >
          <option value="UPI">UPI</option>
          <option value="Cash">Cash</option>
          <option value="Bank">
            Bank Transfer
          </option>
          <option value="Card">Card</option>
        </select>

        <label className="form-field">
          <span>Payment date</span>

          <input
            name="date"
            type="date"
            defaultValue={editing?.date || today()}
            required
          />
        </label>

        <FormActions
          editing={editing}
          submitting={submitting}
          cancel={handleCancel}
        />
      </form>

      <Table
        heads={[
          "Tenant",
          "Property",
          "Room",
          "Month",
          "Amount",
          "Method",
          "Date",
          "Receipt",
          "Action",
        ]}
        rows={items.map((payment) => [
          payment.tenantName || "-",
          payment.propertyName || "-",
          payment.room || "-",
          payment.month || "-",
          <Money v={payment.amount} />,
          payment.method || "-",
          payment.date || "-",

          <button
            type="button"
            className="secondary"
            onClick={() => receiptPDF(payment)}
          >
            PDF
          </button>,

          <div
            className="row-actions"
            key={`${payment.id}-actions`}
          >
            <button
              type="button"
              className="secondary"
              onClick={() => {
                setEditing(payment);

                setSelectedTenantId(
                  payment.tenantId || ""
                );
              }}
            >
              Edit
            </button>

            <button
              type="button"
              className="danger"
              onClick={() =>
                handleDelete(payment)
              }
            >
              Delete
            </button>
          </div>,
        ])}
      />
    </section>
  );
}

/* =====================================================
   EXPENSES
===================================================== */

export function Expenses({
  items = [],
  properties = [],
}) {
  const formId = "expense-form";

  const transformExpensePayload = (payload) => {
    const property = properties.find(
      (item) =>
        String(item.id) === String(payload.propertyId)
    );

    return {
      ...payload,

      propertyId: property?.id || "",
      propertyName: property?.name || "",

      date: payload.date || today(),
    };
  };

  const {
    editing,
    setEditing,
    submitting,
    submit,
    cancelEdit,
  } = useCrud("expenses", transformExpensePayload);

  const handleDelete = async (expense) => {
    if (!confirmDelete(expense.title || "this expense")) {
      return;
    }

    try {
      await deleteRecord("expenses", expense.id);
    } catch (error) {
      console.error("Expense delete error:", error);
      window.alert("Unable to delete expense.");
    }
  };

  return (
    <section className="panel page-panel">
      <div className="page-section-heading">
        <div>
          <h3>Expenses</h3>

          <p className="muted">
            Track property bills, maintenance, repairs,
            and other costs.
          </p>
        </div>
      </div>

      {properties.length === 0 && (
        <div className="empty-warning">
          Add a property before recording an expense.
        </div>
      )}

      <form
        id={formId}
        className="form"
        onSubmit={submit}
        key={editing?.id || "new-expense"}
      >
        <select
          name="propertyId"
          defaultValue={
            editing?.propertyId ||
            properties[0]?.id ||
            ""
          }
          required
          disabled={properties.length === 0}
        >
          {properties.length === 0 && (
            <option value="">
              No property available
            </option>
          )}

          {properties.map((property) => (
            <option
              key={property.id}
              value={property.id}
            >
              {property.name}
            </option>
          ))}
        </select>

        <input
          name="title"
          placeholder="Expense title"
          defaultValue={editing?.title || ""}
          required
        />

        <select
          name="category"
          defaultValue={
            editing?.category || "Electricity"
          }
          required
        >
          <option value="Electricity">
            Electricity
          </option>

          <option value="Maintenance">
            Maintenance
          </option>

          <option value="Cleaning">
            Cleaning
          </option>

          <option value="Tax">Tax</option>
          <option value="Water">Water</option>
          <option value="Repair">Repair</option>
          <option value="Staff">Staff</option>
          <option value="Other">Other</option>
        </select>

        <input
          name="amount"
          type="number"
          min="1"
          placeholder="Expense amount"
          defaultValue={editing?.amount ?? ""}
          required
        />

        <label className="form-field">
          <span>Expense date</span>

          <input
            name="date"
            type="date"
            defaultValue={editing?.date || today()}
            required
          />
        </label>

        <FormActions
          editing={editing}
          submitting={submitting}
          cancel={() => cancelEdit(formId)}
        />
      </form>

      <Table
        heads={[
          "Title",
          "Property",
          "Category",
          "Amount",
          "Date",
          "Action",
        ]}
        rows={items.map((expense) => [
          expense.title || "-",
          expense.propertyName || "-",
          expense.category || "-",
          <Money v={expense.amount} />,
          expense.date || "-",

          <div
            className="row-actions"
            key={`${expense.id}-actions`}
          >
            <button
              type="button"
              className="secondary"
              onClick={() => setEditing(expense)}
            >
              Edit
            </button>

            <button
              type="button"
              className="danger"
              onClick={() =>
                handleDelete(expense)
              }
            >
              Delete
            </button>
          </div>,
        ])}
      />
    </section>
  );
}
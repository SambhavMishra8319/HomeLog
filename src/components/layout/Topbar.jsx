// const label = (text) => text.charAt(0).toUpperCase() + text.slice(1);

// export default function Topbar({
//   tab,
//   propertyId,
//   setPropertyId,
//   filterMonth,
//   setFilterMonth,
//   properties,
//   onExport,
// }) {
//   return (
//     <header className="topbar">
//       <div>
//         <p>Clean MVC rental management app</p>
//         <h1>{label(tab)}</h1>
//       </div>
//       <div className="filters">
//         <select
//           value={propertyId}
//           onChange={(e) => setPropertyId(e.target.value)}
//         >
//           <option value="all">All Properties</option>
//           {properties.map((property) => (
//             <option key={property.id} value={property.id}>
//               {property.name}
//             </option>
//           ))}
//         </select>
//         <input
//           type="month"
//           value={filterMonth}
//           onChange={(e) => setFilterMonth(e.target.value)}
//         />
//         <button onClick={onExport}>Export CSV</button>
//       </div>
//     </header>
//   );
// }
// import {
//   Download,
//   CalendarDays,
//   Building2,
// } from "lucide-react";

// const pageDetails = {
//   dashboard: {
//     title: "Dashboard",
//     description: "Overview of your rental business",
//   },
//   properties: {
//     title: "Properties",
//     description: "Manage all your rental properties",
//   },
//   rooms: {
//     title: "Rooms",
//     description: "Manage rooms and availability",
//   },
//   tenants: {
//     title: "Tenants",
//     description: "Manage tenant details and rent status",
//   },
//   payments: {
//     title: "Payments",
//     description: "Track rent payments and pending amounts",
//   },
//   expenses: {
//     title: "Expenses",
//     description: "Manage property-related expenses",
//   },
//   reports: {
//     title: "Reports",
//     description: "Review income, expenses and rent reports",
//   },
//   settings: {
//     title: "Settings",
//     description: "Configure your GharRent application",
//   },
// };

// export default function Topbar({
//   tab,
//   propertyId,
//   setPropertyId,
//   filterMonth,
//   setFilterMonth,
//   properties = [],
//   onExport,
// }) {
//   const currentPage = pageDetails[tab] || {
//     title: tab
//       ? tab.charAt(0).toUpperCase() + tab.slice(1)
//       : "Dashboard",
//     description: "Property management dashboard",
//   };

//   return (
//     <header className="topbar">
//       <div className="topbar-heading">
//         <p>{currentPage.description}</p>
//         <h1>{currentPage.title}</h1>
//       </div>

//       <div className="topbar-filters">
//         <label className="topbar-field">
//           <span className="sr-only">Filter by property</span>

//           <Building2 size={18} />

//           <select
//             value={propertyId}
//             onChange={(event) =>
//               setPropertyId(event.target.value)
//             }
//             aria-label="Filter by property"
//           >
//             <option value="all">All Properties</option>

//             {properties.map((property) => (
//               <option
//                 key={property.id}
//                 value={property.id}
//               >
//                 {property.name || "Unnamed Property"}
//               </option>
//             ))}
//           </select>
//         </label>

//         <label className="topbar-field month-field">
//           <span className="sr-only">Filter by month</span>

//           <CalendarDays size={18} />

//           <input
//             type="month"
//             value={filterMonth}
//             onChange={(event) =>
//               setFilterMonth(event.target.value)
//             }
//             aria-label="Filter by month"
//           />
//         </label>

//         <button
//           type="button"
//           className="export-button"
//           onClick={onExport}
//         >
//           <Download size={18} />
//           <span>Export CSV</span>
//         </button>
//       </div>
//     </header>
//   );
// }
import {
  Download,
  CalendarDays,
  Building2,
} from "lucide-react";

const pageDetails = {
  dashboard: {
    title: "Dashboard",
    description: "Overview of your rental business",
  },
  properties: {
    title: "Properties",
    description: "Manage all your rental properties",
  },
  rooms: {
    title: "Rooms",
    description: "Manage rooms and availability",
  },
  tenants: {
    title: "Kirayadar",
    description: "Manage Kirayadar details and rent status",
  },
  payments: {
    title: "Rents",
    description: "Track rent payments and pending amounts",
  },
  expenses: {
    title: "Expenses",
    description: "Manage property-related expenses",
  },
  reports: {
    title: "Reports",
    description: "Review income, expenses and rent reports",
  },
  settings: {
    title: "Settings",
    description: "Configure your GharRent application",
  },
};

export default function Topbar({
  tab,
  propertyId,
  setPropertyId,
  filterMonth,
  setFilterMonth,
  properties = [],
  onExport,
}) {
  const currentPage = pageDetails[tab] || {
    title: tab
      ? tab.charAt(0).toUpperCase() + tab.slice(1)
      : "Dashboard",
    description: "Property management dashboard",
  };

  return (
    <header className="topbar">
      <div className="topbar-heading">
        <p>{currentPage.description}</p>
        <h1>{currentPage.title}</h1>
      </div>

      <div className="topbar-filters">
        <label className="topbar-field">
          <span className="sr-only">Filter by property</span>

          <Building2 size={18} />

          <select
            value={propertyId}
            onChange={(event) =>
              setPropertyId(event.target.value)
            }
            aria-label="Filter by property"
          >
            <option value="all">All Properties</option>

            {properties.map((property) => (
              <option
                key={property.id}
                value={property.id}
              >
                {property.name || "Unnamed Property"}
              </option>
            ))}
          </select>
        </label>

        <label className="topbar-field month-field">
          <span className="sr-only">Filter by month</span>

          <CalendarDays size={18} />

          <input
            type="month"
            value={filterMonth}
            onChange={(event) =>
              setFilterMonth(event.target.value)
            }
            aria-label="Filter by month"
          />
        </label>

        <button
          type="button"
          className="export-button"
          onClick={onExport}
        >
          <Download size={18} />
          <span>Export CSV</span>
        </button>
      </div>
    </header>
  );
}
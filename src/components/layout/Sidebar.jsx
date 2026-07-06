// // // const tabs = [
// // //   "dashboard",
// // //   "properties",
// // //   "rooms",
// // //   "tenants",
// // //   "payments",
// // //   "expenses",
// // //   "settings",
// // // ];
// // // const label = (text) => text.charAt(0).toUpperCase() + text.slice(1);

// // // export default function Sidebar({ tab, setTab }) {
// // //   return (
// // //     <aside className="sidebar">
// // //       <div className="logo">
// // //         <span>GR</span>
// // //         <div>
// // //           <b>GharRent</b>
// // //           <small>MVC Version</small>
// // //         </div>
// // //       </div>
// // //       {tabs.map((item) => (
// // //         <button
// // //           key={item}
// // //           onClick={() => setTab(item)}
// // //           className={tab === item ? "active" : ""}
// // //         >
// // //           {label(item)}
// // //         </button>
// // //       ))}
// // //     </aside>
// // //   );
// // // }

// // import { useState } from "react";
// // import { Menu, X } from "lucide-react";

// // const tabs = [
// //   "dashboard",
// //   "properties",
// //   "rooms",
// //   "tenants",
// //   "payments",
// //   "expenses",
// //   "settings",
// // ];

// // const label = (text) =>
// //   text.charAt(0).toUpperCase() + text.slice(1);

// // export default function Sidebar({ tab, setTab }) {
// //   const [open, setOpen] = useState(false);

// //   return (
// //     <>
// //       {/* Mobile Header */}
// //       <header className="mobile-header">
// //         <button
// //           className="menu-btn"
// //           onClick={() => setOpen(true)}
// //         >
// //           <Menu size={24} />
// //         </button>

// //         <h2>GharRent Manager</h2>
// //       </header>

// //       {/* Overlay */}

// //       {open && (
// //         <div
// //           className="overlay"
// //           onClick={() => setOpen(false)}
// //         />
// //       )}

// //       {/* Sidebar */}

// //       <aside className={`sidebar ${open ? "open" : ""}`}>
// //         <div className="logo">
// //           <span>GR</span>

// //           <div>
// //             <b>GharRent</b>

// //             <small>MVC Version</small>
// //           </div>

// //           <button
// //             className="close-btn"
// //             onClick={() => setOpen(false)}
// //           >
// //             <X size={22} />
// //           </button>
// //         </div>

// //         {tabs.map((item) => (
// //           <button
// //             key={item}
// //             className={tab === item ? "active" : ""}
// //             onClick={() => {
// //               setTab(item);
// //               setOpen(false);
// //             }}
// //           >
// //             {label(item)}
// //           </button>
// //         ))}
// //       </aside>
// //     </>
// //   );
// // }

// import { useState } from "react";
// import {
//   Menu,
//   X,
//   LayoutDashboard,
//   Building2,
//   DoorOpen,
//   Users,
//   Wallet,
//   Receipt,
//   Settings,
//   Home,
// } from "lucide-react";

// const tabs = [
//   { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
//   { id: "properties", label: "Properties", icon: Building2 },
//   { id: "rooms", label: "Rooms", icon: DoorOpen },
//   { id: "tenants", label: "Tenants", icon: Users },
//   { id: "payments", label: "Payments", icon: Wallet },
//   { id: "expenses", label: "Expenses", icon: Receipt },
//   { id: "settings", label: "Settings", icon: Settings },
// ];

// export default function Sidebar({ tab, setTab }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       <header className="mobile-header">
//         <button className="menu-btn" onClick={() => setOpen(true)}>
//           <Menu size={22} />
//         </button>

//         <h2>GharRent</h2>
//       </header>

//       {open && (
//         <div
//           className="overlay"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       <aside className={`sidebar ${open ? "open" : ""}`}>
//         <div className="logo">
//           <div className="logo-icon">
//             <Home size={24} />
//           </div>

//           <div className="logo-text">
//             <h3>GharRent</h3>
//             <small>Property Manager</small>
//           </div>

//           <button
//             className="close-btn"
//             onClick={() => setOpen(false)}
//           >
//             <X size={20} />
//           </button>
//         </div>

//         <p className="menu-title">MAIN MENU</p>

//         <nav>
//           {tabs.map((item) => {
//             const Icon = item.icon;

//             return (
//               <button
//                 key={item.id}
//                 className={`nav-item ${
//                   tab === item.id ? "active" : ""
//                 }`}
//                 onClick={() => {
//                   setTab(item.id);
//                   setOpen(false);
//                 }}
//               >
//                 <Icon size={20} />

//                 <span>{item.label}</span>
//               </button>
//             );
//           })}
//         </nav>

//         <div className="sidebar-bottom">
//           <div className="user-card">
//             <div className="avatar">GR</div>

//             <div>
//               <b>Admin</b>
//               <small>Cloud Dashboard</small>
//             </div>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }
import { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  Building2,
  DoorOpen,
  Users,
  Wallet,
  Receipt,
  Settings,
  Home,
} from "lucide-react";

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "properties", label: "Properties", icon: Building2 },
  { id: "rooms", label: "Rooms", icon: DoorOpen },
  { id: "tenants", label: "Tenants", icon: Users },
  { id: "payments", label: "Payments", icon: Wallet },
  { id: "expenses", label: "Expenses", icon: Receipt },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ tab, setTab }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="mobile-header">
        <h2>GharRent</h2>
        <button className="menu-btn" onClick={() => setOpen(true)}>
          <Menu size={22} />
        </button>

      </header>

      {open && (
        <div
          className="overlay"
          onClick={() => setOpen(false)}
        />
      )}

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="logo">
          <div className="logo-icon">
            <Home size={24} />
          </div>

          <div className="logo-text">
            <h3>GharRent</h3>
            <small>Property Manager</small>
          </div>

          <button
            className="close-btn"
            onClick={() => setOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <p className="menu-title">MAIN MENU</p>

        <nav>
          {tabs.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className={`nav-item ${
                  tab === item.id ? "active" : ""
                }`}
                onClick={() => {
                  setTab(item.id);
                  setOpen(false);
                }}
              >
                <Icon size={20} />

                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="user-card">
            <div className="avatar">GR</div>

            <div>
              <b>Admin</b>
              <small>Cloud Dashboard</small>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
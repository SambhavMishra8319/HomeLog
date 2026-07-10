// // // // // const tabs = [
// // // // //   "dashboard",
// // // // //   "properties",
// // // // //   "rooms",
// // // // //   "tenants",
// // // // //   "payments",
// // // // //   "expenses",
// // // // //   "settings",
// // // // // ];
// // // // // const label = (text) => text.charAt(0).toUpperCase() + text.slice(1);

// // // // // export default function Sidebar({ tab, setTab }) {
// // // // //   return (
// // // // //     <aside className="sidebar">
// // // // //       <div className="logo">
// // // // //         <span>GR</span>
// // // // //         <div>
// // // // //           <b>GharRent</b>
// // // // //           <small>MVC Version</small>
// // // // //         </div>
// // // // //       </div>
// // // // //       {tabs.map((item) => (
// // // // //         <button
// // // // //           key={item}
// // // // //           onClick={() => setTab(item)}
// // // // //           className={tab === item ? "active" : ""}
// // // // //         >
// // // // //           {label(item)}
// // // // //         </button>
// // // // //       ))}
// // // // //     </aside>
// // // // //   );
// // // // // }

// // // // import { useState } from "react";
// // // // import { Menu, X } from "lucide-react";

// // // // const tabs = [
// // // //   "dashboard",
// // // //   "properties",
// // // //   "rooms",
// // // //   "tenants",
// // // //   "payments",
// // // //   "expenses",
// // // //   "settings",
// // // // ];

// // // // const label = (text) =>
// // // //   text.charAt(0).toUpperCase() + text.slice(1);

// // // // export default function Sidebar({ tab, setTab }) {
// // // //   const [open, setOpen] = useState(false);

// // // //   return (
// // // //     <>
// // // //       {/* Mobile Header */}
// // // //       <header className="mobile-header">
// // // //         <button
// // // //           className="menu-btn"
// // // //           onClick={() => setOpen(true)}
// // // //         >
// // // //           <Menu size={24} />
// // // //         </button>

// // // //         <h2>GharRent Manager</h2>
// // // //       </header>

// // // //       {/* Overlay */}

// // // //       {open && (
// // // //         <div
// // // //           className="overlay"
// // // //           onClick={() => setOpen(false)}
// // // //         />
// // // //       )}

// // // //       {/* Sidebar */}

// // // //       <aside className={`sidebar ${open ? "open" : ""}`}>
// // // //         <div className="logo">
// // // //           <span>GR</span>

// // // //           <div>
// // // //             <b>GharRent</b>

// // // //             <small>MVC Version</small>
// // // //           </div>

// // // //           <button
// // // //             className="close-btn"
// // // //             onClick={() => setOpen(false)}
// // // //           >
// // // //             <X size={22} />
// // // //           </button>
// // // //         </div>

// // // //         {tabs.map((item) => (
// // // //           <button
// // // //             key={item}
// // // //             className={tab === item ? "active" : ""}
// // // //             onClick={() => {
// // // //               setTab(item);
// // // //               setOpen(false);
// // // //             }}
// // // //           >
// // // //             {label(item)}
// // // //           </button>
// // // //         ))}
// // // //       </aside>
// // // //     </>
// // // //   );
// // // // }

// // // import { useState } from "react";
// // // import {
// // //   Menu,
// // //   X,
// // //   LayoutDashboard,
// // //   Building2,
// // //   DoorOpen,
// // //   Users,
// // //   Wallet,
// // //   Receipt,
// // //   Settings,
// // //   Home,
// // // } from "lucide-react";

// // // const tabs = [
// // //   { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
// // //   { id: "properties", label: "Properties", icon: Building2 },
// // //   { id: "rooms", label: "Rooms", icon: DoorOpen },
// // //   { id: "tenants", label: "Tenants", icon: Users },
// // //   { id: "payments", label: "Payments", icon: Wallet },
// // //   { id: "expenses", label: "Expenses", icon: Receipt },
// // //   { id: "settings", label: "Settings", icon: Settings },
// // // ];

// // // export default function Sidebar({ tab, setTab }) {
// // //   const [open, setOpen] = useState(false);

// // //   return (
// // //     <>
// // //       <header className="mobile-header">
// // //         <button className="menu-btn" onClick={() => setOpen(true)}>
// // //           <Menu size={22} />
// // //         </button>

// // //         <h2>GharRent</h2>
// // //       </header>

// // //       {open && (
// // //         <div
// // //           className="overlay"
// // //           onClick={() => setOpen(false)}
// // //         />
// // //       )}

// // //       <aside className={`sidebar ${open ? "open" : ""}`}>
// // //         <div className="logo">
// // //           <div className="logo-icon">
// // //             <Home size={24} />
// // //           </div>

// // //           <div className="logo-text">
// // //             <h3>GharRent</h3>
// // //             <small>Property Manager</small>
// // //           </div>

// // //           <button
// // //             className="close-btn"
// // //             onClick={() => setOpen(false)}
// // //           >
// // //             <X size={20} />
// // //           </button>
// // //         </div>

// // //         <p className="menu-title">MAIN MENU</p>

// // //         <nav>
// // //           {tabs.map((item) => {
// // //             const Icon = item.icon;

// // //             return (
// // //               <button
// // //                 key={item.id}
// // //                 className={`nav-item ${
// // //                   tab === item.id ? "active" : ""
// // //                 }`}
// // //                 onClick={() => {
// // //                   setTab(item.id);
// // //                   setOpen(false);
// // //                 }}
// // //               >
// // //                 <Icon size={20} />

// // //                 <span>{item.label}</span>
// // //               </button>
// // //             );
// // //           })}
// // //         </nav>

// // //         <div className="sidebar-bottom">
// // //           <div className="user-card">
// // //             <div className="avatar">GR</div>

// // //             <div>
// // //               <b>Admin</b>
// // //               <small>Cloud Dashboard</small>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </aside>
// // //     </>
// // //   );
// // // }
// // import { useState } from "react";
// // import {
// //   Menu,
// //   X,
// //   LayoutDashboard,
// //   Building2,
// //   DoorOpen,
// //   Users,
// //   Wallet,
// //   Receipt,
// //   Settings,
// //   Home,
// // } from "lucide-react";

// // const tabs = [
// //   { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
// //   { id: "properties", label: "Properties", icon: Building2 },
// //   { id: "rooms", label: "Rooms", icon: DoorOpen },
// //   { id: "tenants", label: "Tenants", icon: Users },
// //   { id: "payments", label: "Payments", icon: Wallet },
// //   { id: "expenses", label: "Expenses", icon: Receipt },
// //   { id: "settings", label: "Settings", icon: Settings },
// // ];

// // export default function Sidebar({ tab, setTab }) {
// //   const [open, setOpen] = useState(false);

// //   return (
// //     <>
// //       <header className="mobile-header">
// //         <h2>GharRent</h2>
// //         <button className="menu-btn" onClick={() => setOpen(true)}>
// //           <Menu size={22} />
// //         </button>

// //       </header>

// //       {open && (
// //         <div
// //           className="overlay"
// //           onClick={() => setOpen(false)}
// //         />
// //       )}

// //       <aside className={`sidebar ${open ? "open" : ""}`}>
// //         <div className="logo">
// //           <div className="logo-icon">
// //             <Home size={24} />
// //           </div>

// //           <div className="logo-text">
// //             <h3>GharRent</h3>
// //             <small>Property Manager</small>
// //           </div>

// //           <button
// //             className="close-btn"
// //             onClick={() => setOpen(false)}
// //           >
// //             <X size={20} />
// //           </button>
// //         </div>

// //         <p className="menu-title">MAIN MENU</p>

// //         <nav>
// //           {tabs.map((item) => {
// //             const Icon = item.icon;

// //             return (
// //               <button
// //                 key={item.id}
// //                 className={`nav-item ${
// //                   tab === item.id ? "active" : ""
// //                 }`}
// //                 onClick={() => {
// //                   setTab(item.id);
// //                   setOpen(false);
// //                 }}
// //               >
// //                 <Icon size={20} />

// //                 <span>{item.label}</span>
// //               </button>
// //             );
// //           })}
// //         </nav>

// //         <div className="sidebar-bottom">
// //           <div className="user-card">
// //             <div className="avatar">GR</div>

// //             <div>
// //               <b>Admin</b>
// //               <small>Cloud Dashboard</small>
// //             </div>
// //           </div>
// //         </div>
// //       </aside>
// //     </>
// //   );
// // }
// import { useState } from "react";
// import {
//   Menu,
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
//   {
//     id: "dashboard",
//     label: "Dashboard",
//     icon: LayoutDashboard,
//   },
//   {
//     id: "properties",
//     label: "Properties",
//     icon: Building2,
//   },
//   {
//     id: "rooms",
//     label: "Rooms",
//     icon: DoorOpen,
//   },
//   {
//     id: "tenants",
//     label: "Tenants",
//     icon: Users,
//   },
//   {
//     id: "payments",
//     label: "Payments",
//     icon: Wallet,
//   },
//   {
//     id: "expenses",
//     label: "Expenses",
//     icon: Receipt,
//   },
//   {
//     id: "settings",
//     label: "Settings",
//     icon: Settings,
//   },
// ];

// export default function Sidebar({ tab, setTab }) {
//   const [open, setOpen] = useState(false);

//   const handleToggle = () => {
//     setOpen((previous) => !previous);
//   };

//   const handleNavigation = (tabId) => {
//     setTab(tabId);
//     setOpen(false);
//   };

//   return (
//     <>
//       <header className="mobile-header">
//         <div className="mobile-brand">
//           <div className="mobile-logo-icon">
//             <Home size={20} />
//           </div>

//           <div>
//             <h2>GharRent</h2>
//             <small>Property Manager</small>
//           </div>
//         </div>

//         <button
//           type="button"
//           className="menu-btn"
//           onClick={handleToggle}
//           aria-label={open ? "Close menu" : "Open menu"}
//           aria-expanded={open}
//         >
//           <Menu size={24} />
//         </button>
//       </header>

//       <aside className={`sidebar ${open ? "open" : ""}`}>
//         <div className="logo">
//           <div className="logo-icon">
//             <Home size={24} />
//           </div>

//           <div className="logo-text">
//             <h3>GharRent</h3>
//             <small>Property Manager</small>
//           </div>
//         </div>

//         <p className="menu-title">MAIN MENU</p>

//         <nav className="sidebar-nav">
//           {tabs.map((item) => {
//             const Icon = item.icon;

//             return (
//               <button
//                 type="button"
//                 key={item.id}
//                 className={`nav-item ${
//                   tab === item.id ? "active" : ""
//                 }`}
//                 onClick={() => handleNavigation(item.id)}
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

//             <div className="user-info">
//               <b>Admin</b>
//               <small>Cloud Dashboard</small>
//             </div>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }
import { useEffect, useState } from "react";

import {
  Menu,
  LayoutDashboard,
  Building2,
  DoorOpen,
  Users,
  Wallet,
  Receipt,
  BarChart3,
  Settings,
  Home,
} from "lucide-react";

const tabs = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "properties",
    label: "Properties",
    icon: Building2,
  },
  {
    id: "rooms",
    label: "Rooms",
    icon: DoorOpen,
  },
  {
    id: "tenants",
    label: "Kirayadar",
    icon: Users,
  },
  {
    id: "payments",
    label: "Rent",
    icon: Wallet,
  },
  {
    id: "expenses",
    label: "Expenses",
    icon: Receipt,
  },
  {
    id: "reports",
    label: "Reports",
    icon: BarChart3,
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
  },
];

export default function Sidebar({ tab, setTab }) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((previous) => !previous);
  };

  const handleNavigation = (tabId) => {
    setTab(tabId);
    setOpen(false);
  };

  /*
   * Prevent the page behind the sidebar from scrolling
   * while the mobile menu is open.
   */
  useEffect(() => {
    if (open) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }

    return () => {
      document.body.classList.remove("sidebar-open");
    };
  }, [open]);

  /*
   * Close the menu when Escape is pressed.
   */
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <>
      <header className="mobile-header">
        <div className="mobile-brand">
          <div className="mobile-logo-icon">
            <Home size={20} />
          </div>

          <div className="mobile-brand-text">
            <h2>GharRent</h2>
            <small>Property Manager</small>
          </div>
        </div>

        <button
          type="button"
          className={`menu-btn ${open ? "active" : ""}`}
          onClick={handleToggle}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="main-sidebar"
        >
          <Menu size={25} />
        </button>
      </header>

      {open && (
        <button
          type="button"
          className="sidebar-overlay"
          aria-label="Close navigation menu"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        id="main-sidebar"
        className={`sidebar ${open ? "open" : ""}`}
      >
        <div className="logo">
          <div className="logo-icon">
            <Home size={24} />
          </div>

          <div className="logo-text">
            <h3>GharRent</h3>
            <small>Property Manager</small>
          </div>
        </div>

        <p className="menu-title">MAIN MENU</p>

        <nav className="sidebar-nav" aria-label="Main navigation">
          {tabs.map((item) => {
            const Icon = item.icon;
            const isActive = tab === item.id;

            return (
              <button
                type="button"
                key={item.id}
                className={`nav-item ${isActive ? "active" : ""}`}
                onClick={() => handleNavigation(item.id)}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon size={20} strokeWidth={2} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="user-card">
            <div className="avatar">GR</div>

            <div className="user-info">
              <b>Admin</b>
              <small>Cloud Dashboard</small>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
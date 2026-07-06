// import { useMemo, useState } from "react";
// import { AuthProvider, useAuth } from "./context/AuthContext";
// import AuthPage from "./pages/AuthPage";
// import Dashboard from "./pages/Dashboard";
// import Reports from "./pages/Reports";
// import Settings from "./pages/Settings";
// import Sidebar from "./components/Sidebar";

// import {
//   Properties,
//   Rooms,
//   Tenants,
//   Payments,
//   Expenses,
// } from "./pages/CrudPages";

// import { useCollection } from "./hooks/useCollection";
// import {
//   enrichTenants,
//   totals as makeTotals,
// } from "./controllers/reportController";
// import { monthKey } from "./utils/format";

// function Shell() {
//   const { user, loading } = useAuth();
//   const [tab, setTab] = useState("dashboard");
//   const [month, setMonth] = useState(monthKey());

//   const properties = useCollection("properties");
//   const rooms = useCollection("rooms");
//   const tenants = useCollection("tenants");
//   const payments = useCollection("payments");
//   const expenses = useCollection("expenses");

//   const all = {
//     properties: properties.items,
//     rooms: rooms.items,
//     tenants: tenants.items,
//     payments: payments.items,
//     expenses: expenses.items,
//   };

//   const monthExpenses = all.expenses.filter((e) =>
//     String(e.date || "").startsWith(month)
//   );

//   const enriched = useMemo(
//     () => enrichTenants(all.tenants, all.payments, month),
//     [all.tenants, all.payments, month]
//   );

//   const total = makeTotals(enriched, monthExpenses);

//   if (loading) return <div className="center">Loading...</div>;
//   if (!user) return <AuthPage />;

//   return (
//     <div className="app">
//       <Sidebar tab={tab} setTab={setTab} />

//       <main className="app-main">
//         <header className="topbar">
//           <div>
//             <h1>{tab[0].toUpperCase() + tab.slice(1)}</h1>
//             <p>Premium rent management dashboard</p>
//           </div>

//           <input
//             type="month"
//             value={month}
//             onChange={(e) => setMonth(e.target.value)}
//           />
//         </header>

//         {tab === "dashboard" && (
//           <Dashboard totals={total} tenants={enriched} rooms={all.rooms} />
//         )}

//         {tab === "properties" && <Properties items={all.properties} />}

//         {tab === "rooms" && (
//           <Rooms items={all.rooms} properties={all.properties} />
//         )}

//         {tab === "tenants" && (
//           <Tenants
//             items={enriched}
//             rooms={all.rooms}
//             properties={all.properties}
//           />
//         )}

//         {tab === "payments" && (
//           <Payments items={all.payments} tenants={all.tenants} />
//         )}

//         {tab === "expenses" && (
//           <Expenses items={monthExpenses} properties={all.properties} />
//         )}

//         {tab === "reports" && (
//           <Reports data={all} totals={total} tenants={enriched} />
//         )}

//         {tab === "settings" && <Settings />}
//       </main>
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <Shell />
//     </AuthProvider>
//   );
// }
import { useMemo, useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Sidebar from "./components/layout/Sidebar";

import {
  Properties,
  Rooms,
  Tenants,
  Payments,
  Expenses,
} from "./pages/CrudPages";

import { useCollection } from "./hooks/useCollection";
import {
  enrichTenants,
  totals as makeTotals,
} from "./controllers/reportController";
import { monthKey } from "./utils/format";

function Shell() {
  const { user, loading } = useAuth();
  const [tab, setTab] = useState("dashboard");
  const [month, setMonth] = useState(monthKey());

  const properties = useCollection("properties");
  const rooms = useCollection("rooms");
  const tenants = useCollection("tenants");
  const payments = useCollection("payments");
  const expenses = useCollection("expenses");

  const all = {
    properties: properties.items,
    rooms: rooms.items,
    tenants: tenants.items,
    payments: payments.items,
    expenses: expenses.items,
  };

  const monthExpenses = all.expenses.filter((e) =>
    String(e.date || "").startsWith(month)
  );

  const enriched = useMemo(
    () => enrichTenants(all.tenants, all.payments, month),
    [all.tenants, all.payments, month]
  );

  const total = makeTotals(enriched, monthExpenses);

  if (loading) return <div className="center">Loading...</div>;
  if (!user) return <AuthPage />;

  return (
    <div className="app">
      <Sidebar tab={tab} setTab={setTab} />

      <main className="app-main">
        {/* <header className="topbar">
          <div>
            <h1>{tab[0].toUpperCase() + tab.slice(1)}</h1>
            <p>Premium rent management dashboard</p>
          </div>

          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </header> */}

        {tab === "dashboard" && (
          <Dashboard totals={total} tenants={enriched} rooms={all.rooms} />
        )}

        {tab === "properties" && <Properties items={all.properties} />}

        {tab === "rooms" && (
          <Rooms items={all.rooms} properties={all.properties} />
        )}

        {tab === "tenants" && (
          <Tenants
            items={enriched}
            rooms={all.rooms}
            properties={all.properties}
          />
        )}

        {tab === "payments" && (
          <Payments items={all.payments} tenants={all.tenants} />
        )}

        {tab === "expenses" && (
          <Expenses items={monthExpenses} properties={all.properties} />
        )}

        {tab === "reports" && (
          <Reports data={all} totals={total} tenants={enriched} />
        )}

        {tab === "settings" && <Settings />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Shell />
    </AuthProvider>
  );
}
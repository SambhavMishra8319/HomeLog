// // import { useMemo, useState } from "react";
// // import { AuthProvider, useAuth } from "./context/AuthContext";
// // import AuthPage from "./pages/AuthPage";
// // import Dashboard from "./pages/Dashboard";
// // import Reports from "./pages/Reports";
// // import Settings from "./pages/Settings";
// // import Sidebar from "./components/Sidebar";

// // import {
// //   Properties,
// //   Rooms,
// //   Tenants,
// //   Payments,
// //   Expenses,
// // } from "./pages/CrudPages";

// // import { useCollection } from "./hooks/useCollection";
// // import {
// //   enrichTenants,
// //   totals as makeTotals,
// // } from "./controllers/reportController";
// // import { monthKey } from "./utils/format";

// // function Shell() {
// //   const { user, loading } = useAuth();
// //   const [tab, setTab] = useState("dashboard");
// //   const [month, setMonth] = useState(monthKey());

// //   const properties = useCollection("properties");
// //   const rooms = useCollection("rooms");
// //   const tenants = useCollection("tenants");
// //   const payments = useCollection("payments");
// //   const expenses = useCollection("expenses");

// //   const all = {
// //     properties: properties.items,
// //     rooms: rooms.items,
// //     tenants: tenants.items,
// //     payments: payments.items,
// //     expenses: expenses.items,
// //   };

// //   const monthExpenses = all.expenses.filter((e) =>
// //     String(e.date || "").startsWith(month)
// //   );

// //   const enriched = useMemo(
// //     () => enrichTenants(all.tenants, all.payments, month),
// //     [all.tenants, all.payments, month]
// //   );

// //   const total = makeTotals(enriched, monthExpenses);

// //   if (loading) return <div className="center">Loading...</div>;
// //   if (!user) return <AuthPage />;

// //   return (
// //     <div className="app">
// //       <Sidebar tab={tab} setTab={setTab} />

// //       <main className="app-main">
// //         <header className="topbar">
// //           <div>
// //             <h1>{tab[0].toUpperCase() + tab.slice(1)}</h1>
// //             <p>Premium rent management dashboard</p>
// //           </div>

// //           <input
// //             type="month"
// //             value={month}
// //             onChange={(e) => setMonth(e.target.value)}
// //           />
// //         </header>

// //         {tab === "dashboard" && (
// //           <Dashboard totals={total} tenants={enriched} rooms={all.rooms} />
// //         )}

// //         {tab === "properties" && <Properties items={all.properties} />}

// //         {tab === "rooms" && (
// //           <Rooms items={all.rooms} properties={all.properties} />
// //         )}

// //         {tab === "tenants" && (
// //           <Tenants
// //             items={enriched}
// //             rooms={all.rooms}
// //             properties={all.properties}
// //           />
// //         )}

// //         {tab === "payments" && (
// //           <Payments items={all.payments} tenants={all.tenants} />
// //         )}

// //         {tab === "expenses" && (
// //           <Expenses items={monthExpenses} properties={all.properties} />
// //         )}

// //         {tab === "reports" && (
// //           <Reports data={all} totals={total} tenants={enriched} />
// //         )}

// //         {tab === "settings" && <Settings />}
// //       </main>
// //     </div>
// //   );
// // }

// // export default function App() {
// //   return (
// //     <AuthProvider>
// //       <Shell />
// //     </AuthProvider>
// //   );
// // }
// import { useMemo, useState } from "react";
// import { AuthProvider, useAuth } from "./context/AuthContext";
// import AuthPage from "./pages/AuthPage";
// import Dashboard from "./pages/Dashboard";
// import Reports from "./pages/Reports";
// import Settings from "./pages/Settings";
// import Sidebar from "./components/layout/Sidebar";

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
//         {/* <header className="topbar">
//           <div>
//             <h1>{tab[0].toUpperCase() + tab.slice(1)}</h1>
//             <p>Premium rent management dashboard</p>
//           </div>

//           <input
//             type="month"
//             value={month}
//             onChange={(e) => setMonth(e.target.value)}
//           />
//         </header> */}

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
import Topbar from "./components/layout/Topbar";

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
  const [filterMonth, setFilterMonth] = useState(monthKey());
  const [propertyId, setPropertyId] = useState("all");

  const propertiesCollection = useCollection("properties");
  const roomsCollection = useCollection("rooms");
  const tenantsCollection = useCollection("tenants");
  const paymentsCollection = useCollection("payments");
  const expensesCollection = useCollection("expenses");

  const all = useMemo(
    () => ({
      properties: propertiesCollection.items || [],
      rooms: roomsCollection.items || [],
      tenants: tenantsCollection.items || [],
      payments: paymentsCollection.items || [],
      expenses: expensesCollection.items || [],
    }),
    [
      propertiesCollection.items,
      roomsCollection.items,
      tenantsCollection.items,
      paymentsCollection.items,
      expensesCollection.items,
    ]
  );

  /*
   * Filter rooms using the selected property.
   */
  const filteredRooms = useMemo(() => {
    if (propertyId === "all") {
      return all.rooms;
    }

    return all.rooms.filter(
      (room) => String(room.propertyId) === String(propertyId)
    );
  }, [all.rooms, propertyId]);

  /*
   * Store selected room IDs so tenants can also be filtered
   * when their document only contains roomId.
   */
  const selectedRoomIds = useMemo(() => {
    return new Set(filteredRooms.map((room) => String(room.id)));
  }, [filteredRooms]);

  /*
   * Filter tenants using either:
   * 1. tenant.propertyId
   * 2. tenant.roomId
   */
  const filteredTenants = useMemo(() => {
    if (propertyId === "all") {
      return all.tenants;
    }

    return all.tenants.filter((tenant) => {
      const matchesProperty =
        String(tenant.propertyId || "") === String(propertyId);

      const matchesRoom = selectedRoomIds.has(String(tenant.roomId || ""));

      return matchesProperty || matchesRoom;
    });
  }, [all.tenants, propertyId, selectedRoomIds]);

  const filteredTenantIds = useMemo(() => {
    return new Set(filteredTenants.map((tenant) => String(tenant.id)));
  }, [filteredTenants]);

  /*
   * Filter payments by the selected property.
   * Tenant payments are matched through tenantId.
   */
  const propertyPayments = useMemo(() => {
    if (propertyId === "all") {
      return all.payments;
    }

    return all.payments.filter((payment) => {
      const matchesProperty =
        String(payment.propertyId || "") === String(propertyId);

      const matchesTenant = filteredTenantIds.has(
        String(payment.tenantId || "")
      );

      return matchesProperty || matchesTenant;
    });
  }, [all.payments, propertyId, filteredTenantIds]);

  /*
   * Payments shown in the Payments page are limited
   * to the selected month.
   */
  const monthPayments = useMemo(() => {
    return propertyPayments.filter((payment) =>
      String(payment.date || "").startsWith(filterMonth)
    );
  }, [propertyPayments, filterMonth]);

  /*
   * Filter expenses by selected month and property.
   */
  const monthExpenses = useMemo(() => {
    return all.expenses.filter((expense) => {
      const matchesMonth = String(expense.date || "").startsWith(filterMonth);

      const matchesProperty =
        propertyId === "all" ||
        String(expense.propertyId || "") === String(propertyId);

      return matchesMonth && matchesProperty;
    });
  }, [all.expenses, filterMonth, propertyId]);

  /*
   * Add payment status and calculated values to tenants.
   */
  const enrichedTenants = useMemo(() => {
    return enrichTenants(
      filteredTenants,
      propertyPayments,
      filterMonth
    );
  }, [filteredTenants, propertyPayments, filterMonth]);

  const totals = useMemo(() => {
    return makeTotals(enrichedTenants, monthExpenses);
  }, [enrichedTenants, monthExpenses]);

  /*
   * Export the current filtered tenant report.
   */
  const handleExport = () => {
    if (!enrichedTenants.length) {
      window.alert("There is no data available to export.");
      return;
    }

    const getPropertyName = (tenant) => {
      const property = all.properties.find(
        (item) =>
          String(item.id) === String(tenant.propertyId || "")
      );

      return property?.name || tenant.propertyName || "";
    };

    const getRoomName = (tenant) => {
      const room = all.rooms.find(
        (item) => String(item.id) === String(tenant.roomId || "")
      );

      return room?.name || room?.roomNumber || tenant.roomName || "";
    };

    const headers = [
      "Tenant Name",
      "Phone",
      "Property",
      "Room",
      "Monthly Rent",
      "Paid Amount",
      "Due Amount",
      "Payment Status",
      "Month",
    ];

    const rows = enrichedTenants.map((tenant) => [
      tenant.name || "",
      tenant.phone || "",
      getPropertyName(tenant),
      getRoomName(tenant),
      tenant.rent || tenant.monthlyRent || 0,
      tenant.paid || tenant.paidAmount || 0,
      tenant.due || tenant.dueAmount || 0,
      tenant.paymentStatus || tenant.status || "",
      filterMonth,
    ]);

    const escapeCSVValue = (value) => {
      const stringValue = String(value ?? "");
      return `"${stringValue.replace(/"/g, '""')}"`;
    };

    const csvContent = [headers, ...rows]
      .map((row) => row.map(escapeCSVValue).join(","))
      .join("\n");

    const csvBlob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const downloadUrl = URL.createObjectURL(csvBlob);
    const link = document.createElement("a");

    link.href = downloadUrl;
    link.download = `GharRent-${filterMonth}-${
      propertyId === "all" ? "all-properties" : propertyId
    }.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(downloadUrl);
  };

  const collectionLoading =
    propertiesCollection.loading ||
    roomsCollection.loading ||
    tenantsCollection.loading ||
    paymentsCollection.loading ||
    expensesCollection.loading;

  if (loading) {
    return (
      <div className="center loading-screen">
        <div className="loader" />
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <div className="app">
      <Sidebar tab={tab} setTab={setTab} />

      <main className="app-main">
        <Topbar
          tab={tab}
          propertyId={propertyId}
          setPropertyId={setPropertyId}
          filterMonth={filterMonth}
          setFilterMonth={setFilterMonth}
          properties={all.properties}
          onExport={handleExport}
        />

        <section className="page-content">
          {collectionLoading && (
            <div className="data-loading">
              Loading dashboard data...
            </div>
          )}

          {tab === "dashboard" && (
            <Dashboard
              totals={totals}
              tenants={enrichedTenants}
              rooms={filteredRooms}
              payments={monthPayments}
              expenses={monthExpenses}
              month={filterMonth}
            />
          )}

          {tab === "properties" && (
            <Properties items={all.properties} />
          )}

          {tab === "rooms" && (
            <Rooms
              items={filteredRooms}
              properties={all.properties}
            />
          )}

          {tab === "tenants" && (
            <Tenants
              items={enrichedTenants}
              rooms={all.rooms}
              properties={all.properties}
            />
          )}

          {tab === "payments" && (
            <Payments
              items={monthPayments}
              tenants={filteredTenants}
            />
          )}

          {tab === "expenses" && (
            <Expenses
              items={monthExpenses}
              properties={all.properties}
            />
          )}

          {tab === "reports" && (
            <Reports
              data={{
                properties: all.properties,
                rooms: filteredRooms,
                tenants: filteredTenants,
                payments: monthPayments,
                expenses: monthExpenses,
              }}
              totals={totals}
              tenants={enrichedTenants}
              month={filterMonth}
              propertyId={propertyId}
            />
          )}

          {tab === "settings" && <Settings />}
        </section>
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
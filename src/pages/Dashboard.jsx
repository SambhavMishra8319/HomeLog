// // import { Card, Status } from "../components/common";
// // import { INR } from "../utils/format";
// // import { reminder } from "../controllers/reportController";
// // export default function Dashboard({ totals, tenants, rooms }) {
// //   const occupied = rooms.filter((r) => r.status === "Occupied").length;
// //   return (
// //     <>
// //       <section className="hero">
// //         <div>
// //           <span>Cloud Dashboard</span>
// //           <h2>
// //             Track tenants, rooms, dues, payments and expenses in Firestore.
// //           </h2>
// //         </div>
// //         <b>
// //           {rooms.length ? Math.round((occupied / rooms.length) * 100) : 0}%
// //           Occupancy
// //         </b>
// //       </section>
// //       <section className="cards">
// //         <Card
// //           title="Expected"
// //           value={INR.format(totals.expected)}
// //           hint="Monthly bill"
// //         />
// //         <Card
// //           title="Collected"
// //           value={INR.format(totals.collected)}
// //           hint="Paid this month"
// //         />
// //         <Card
// //           title="Pending"
// //           value={INR.format(totals.pending)}
// //           hint="Need follow-up"
// //         />
// //         <Card
// //           title="Profit"
// //           value={INR.format(totals.profit)}
// //           hint="After expenses"
// //         />
// //       </section>
// //       <section className="panel">
// //         <h3>Pending Rent</h3>
// //         {tenants
// //           .filter((t) => t.due > 0)
// //           .map((t) => (
// //             <div className="due" key={t.id}>
// //               <div>
// //                 <b>{t.name}</b>
// //                 <small>
// //                   {t.room} · {t.phone}
// //                 </small>
// //                 <p>{reminder(t)}</p>
// //               </div>
// //               <Status value={t.payStatus} />
// //             </div>
// //           ))}
// //       </section>
// //     </>
// //   );
// // }
// import { Card, Status } from "../components/common";
// import { INR } from "../utils/format";
// import { reminder } from "../controllers/reportController";

// export default function Dashboard({ totals, tenants, rooms }) {
//   const occupied = rooms.filter((r) => r.status === "Occupied").length;
//   const occupancy = rooms.length ? Math.round((occupied / rooms.length) * 100) : 0;

//   const pendingTenants = tenants.filter((t) => Number(t.due) > 0);

//   return (
//     <div className="dashboard-page">
//       {/* HERO SECTION */}
//       <section className="hero dashboard-hero">
//         {/* <div className="hero-content">
//           <span className="hero-badge">Cloud Dashboard</span>
//           <h2>Manage tenants, rooms, rent, dues, payments and expenses easily.</h2>
//           <p>
//             Get a quick overview of your monthly rent collection, pending dues,
//             occupancy and profit.
//           </p>
//         </div> */}

//         <div className="occupancy-card">
//           <strong>{occupancy}%</strong>
//           <span>Occupancy</span>
//           <small>
//             {occupied} of {rooms.length} rooms occupied
//           </small>
//         </div>
//       </section>

//       {/* STATS CARDS */}
//       <section className="cards dashboard-stats">
//         <Card
//           title="Expected Rent"
//           value={INR.format(totals.expected || 0)}
//           hint="Monthly bill"
//         />
//         <Card
//           title="Collected Rent"
//           value={INR.format(totals.collected || 0)}
//           hint="Paid this month"
//         />
//         <Card
//           title="Pending Dues"
//           value={INR.format(totals.pending || 0)}
//           hint="Need follow-up"
//         />
//         <Card
//           title="Net Profit"
//           value={INR.format(totals.profit || 0)}
//           hint="After expenses"
//         />
//       </section>

//       {/* MAIN CONTENT */}
//       <section className="dashboard-grid">
//         {/* Pending Rent */}
//         <div className="panel">
//           <div className="panel-header">
//             <div>
//               <h3>Pending Rent</h3>
//               <p>Tenants who still need payment follow-up</p>
//             </div>
//             <span className="count-pill">{pendingTenants.length}</span>
//           </div>

//           {pendingTenants.length === 0 ? (
//             <div className="empty-state">
//               <b>No pending dues 🎉</b>
//               <small>All tenants have cleared their rent.</small>
//             </div>
//           ) : (
//             <div className="due-list">
//               {pendingTenants.map((t) => (
//                 <div className="due" key={t.id}>
//                   <div className="tenant-info">
//                     <b>{t.name}</b>
//                     <small>
//                       Room {t.room || "—"} · {t.phone || "No phone"}
//                     </small>
//                     <p>{reminder(t)}</p>
//                   </div>

//                   <div className="due-right">
//                     <strong>{INR.format(t.due || 0)}</strong>
//                     <Status value={t.payStatus} />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Room Summary */}
//         <div className="panel">
//           <div className="panel-header">
//             <div>
//               <h3>Room Summary</h3>
//               <p>Current room occupancy status</p>
//             </div>
//           </div>

//           <div className="summary-list">
//             <div>
//               <span>Total Rooms</span>
//               <b>{rooms.length}</b>
//             </div>
//             <div>
//               <span>Occupied</span>
//               <b>{occupied}</b>
//             </div>
//             <div>
//               <span>Vacant</span>
//               <b>{rooms.length - occupied}</b>
//             </div>
//             <div>
//               <span>Total Tenants</span>
//               <b>{tenants.length}</b>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
import { Card, Status } from "../components/common";
import { INR } from "../utils/format";
import { reminder } from "../controllers/reportController";

export default function Dashboard({ totals, tenants, rooms }) {
  const occupied = rooms.filter((r) => r.status === "Occupied").length;
  const occupancy = rooms.length
    ? Math.round((occupied / rooms.length) * 100)
    : 0;

  const pendingTenants = tenants.filter((t) => Number(t.due) > 0);
  const vacant = rooms.length - occupied;

  return (
    <div className="dashboard-page">
      <section className="hero dashboard-hero">
        {/* <div className="hero-content">
          <span className="hero-badge">Cloud Dashboard</span>
          <h2>Manage rent, rooms, tenants and dues from one place.</h2>
          <p>
            Track monthly collection, pending rent, room occupancy and profit
            with a clean premium dashboard.
          </p>
        </div> */}

        <div className="occupancy-card">
          <strong>{occupancy}%</strong>
          <span>Occupancy</span>
          <small>
            {occupied} of {rooms.length} rooms occupied
          </small>
        </div>
      </section>

      <section className="cards dashboard-stats">
        <Card
          title="Expected Rent"
          value={INR.format(totals.expected || 0)}
          hint="Monthly bill"
        />
        <Card
          title="Collected Rent"
          value={INR.format(totals.collected || 0)}
          hint="Paid this month"
        />
        <Card
          title="Pending Dues"
          value={INR.format(totals.pending || 0)}
          hint="Need follow-up"
        />
        <Card
          title="Net Profit"
          value={INR.format(totals.profit || 0)}
          hint="After expenses"
        />
      </section>

      <section className="dashboard-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Pending Rent</h3>
              <p>Tenants who still need payment follow-up</p>
            </div>
            <span className="count-pill">{pendingTenants.length}</span>
          </div>

          {pendingTenants.length === 0 ? (
            <div className="empty-state">
              <b>No pending dues 🎉</b>
              <small>All tenants have cleared their rent.</small>
            </div>
          ) : (
            <div className="due-list">
              {pendingTenants.map((t) => (
                <div className="due" key={t.id}>
                  <div className="tenant-info">
                    <b>{t.name}</b>
                    <small>
                      Room {t.room || "—"} · {t.phone || "No phone"}
                    </small>
                    <p>{reminder(t)}</p>
                  </div>

                  <div className="due-right">
                    <strong>{INR.format(t.due || 0)}</strong>
                    <Status value={t.payStatus} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Room Summary</h3>
              <p>Current room occupancy status</p>
            </div>
          </div>

          <div className="summary-list">
            <div>
              <span>Total Rooms</span>
              <b>{rooms.length}</b>
            </div>
            <div>
              <span>Occupied</span>
              <b>{occupied}</b>
            </div>
            <div>
              <span>Vacant</span>
              <b>{vacant}</b>
            </div>
            <div>
              <span>Total Tenants</span>
              <b>{tenants.length}</b>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
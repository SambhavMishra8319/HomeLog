import { seedIfEmpty } from "../services/firestoreService";
import { seed } from "../models/seed";
import { logout } from "../services/authService";
import { useAuth } from "../context/AuthContext";
export default function Settings() {
  const { user, role } = useAuth();
  return (
    <section className="panel">
      <h3>Settings</h3>
      <p>
        Logged in as <b>{user?.email}</b> · Role: <b>{role}</b>
      </p>
      <div className="actions">
        {/* <button onClick={() => seedIfEmpty(seed)}>
          Seed demo data if empty
        </button> */}
        <button onClick={logout}>Logout</button>
      </div>
      {/* <h4>Firestore dev rules</h4> */}
      {/* <pre>{`rules_version = '2';\nservice cloud.firestore {\n  match /databases/{database}/documents {\n    match /{document=**} {\n      allow read, write: if request.auth != null;\n    }\n  }\n}`}</pre> */}
    </section>
  );
}

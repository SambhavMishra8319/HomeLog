import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { getUserRole } from "../services/authService";
const C = createContext(null);
export const useAuth = () => useContext(C);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null),
    [profile, setProfile] = useState(null),
    [loading, setLoading] = useState(true);
  useEffect(
    () =>
      onAuthStateChanged(auth, async (u) => {
        setUser(u);
        setProfile(u ? await getUserRole(u.uid) : null);
        setLoading(false);
      }),
    [],
  );
  return (
    <C.Provider
      value={{ user, profile, loading, role: profile?.role || "guest" }}
    >
      {children}
    </C.Provider>
  );
}

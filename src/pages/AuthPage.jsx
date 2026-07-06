import { useState } from "react";
import { login, register } from "../services/authService";
export default function AuthPage() {
  const [mode, setMode] = useState("login"),
    [err, setErr] = useState("");
  async function submit(e) {
    e.preventDefault();
    setErr("");
    const f = Object.fromEntries(new FormData(e.currentTarget));
    try {
      mode === "login" ? await login(f.email, f.password) : await register(f);
    } catch (x) {
      setErr(x.message);
    }
  }
  return (
    <div className="auth">
      <form onSubmit={submit}>
        <h1>GharRent Manager</h1>
        <p>Firebase powered property rent management.</p>
        {mode === "register" && (
          <input name="name" placeholder="Name" required />
        )}
        <input name="email" type="email" placeholder="Email" required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        {mode === "register" && (
          <select name="role">
            <option value="owner">Owner</option>
            <option value="manager">Manager</option>
            <option value="accountant">Accountant</option>
          </select>
        )}
        <button>{mode === "login" ? "Login" : "Create account"}</button>
        {err && <b className="err">{err}</b>}
        <span onClick={() => setMode(mode === "login" ? "register" : "login")}>
          {mode === "login" ? "Create new account" : "Already have account?"}
        </span>
      </form>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const login = async () => {
    // ✅ validation
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", { email, password });

      console.log("LOGIN RESPONSE:", res.data);

      // ✅ STORE DATA
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // 👤 STORE USER NAME (IMPORTANT)
      localStorage.setItem(
        "name",
        res.data.name || res.data.email
      );

      // ✅ NAVIGATION
      if (res.data.role?.toLowerCase() === "admin") {
        navigate("/admin");
      } else {
        navigate("/quiz");
      }

    } catch (err) {
      alert("Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign In</h2>

        <input
          className="auth-input"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="auth-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-button" onClick={login}>
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <div className="auth-link" onClick={() => navigate("/signup")}>
          Not a member? Sign Up
        </div>
      </div>
    </div>
  );
}
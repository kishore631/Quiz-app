import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/auth.css";

export default function Signup() {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const register = async () => {
    try {
      await API.post("/auth/register", data);
      alert("Registered Successfully");
      navigate("/login");
    } catch (err) {
      alert("Signup Failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign Up</h2>

        <input
          className="auth-input"
          placeholder="Email address"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          className="auth-input"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button className="auth-button" onClick={register}>
          Sign Up
        </button>

        <div className="auth-link" onClick={() => navigate("/login")}>
          Already have an account? Sign In
        </div>
      </div>
    </div>
  );
}
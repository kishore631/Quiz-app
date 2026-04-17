import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";
import "../styles/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleQuizClick = () => {
    if (!token) {
      alert("Login required 🔐");
      navigate("/login");
    } else {
      navigate("/quiz");
    }
  };

  return (
    <div className="navbar">
      {/* LOGO */}
      <div className="logo" onClick={() => navigate("/")}>
        <img src={logo} alt="Quiz Logo" />
      </div>

      {/* HAMBURGER */}
      <div className="hamburger" onClick={() => setOpen(!open)}>
        ☰
      </div>

      {/* MENU */}
      <div className={`nav-links ${open ? "open" : ""}`}>
        <span onClick={() => navigate("/")}>Home</span>

        {/* 🔒 PROTECTED CLICK */}
        <span onClick={handleQuizClick}>Quizzes</span>

        {role === "admin" && (
          <span onClick={() => navigate("/admin")}>Create</span>
        )}

        {token && (
          <div className="user-info">
            👤 {name || "User"}
          </div>
        )}

        {!token ? (
          <span onClick={() => navigate("/login")}>Login</span>
        ) : (
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
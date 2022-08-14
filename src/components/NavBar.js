import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import { Card, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { useAuth } from "./Auth";

const NavBar = () => {
  const [error, setError] = useState("");
  const { currUser, logout } = useAuth();
  const navigate = useNavigate();
  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Unable to logout");
    }
  }

  return (
    <nav className="nav">
      <Link to="/tasks" className="site-title">
        Task Tracker
      </Link>
      {currUser ? (
        <div className="sign">
          <button className="NavButton">
            <Link to="/profile">Profile</Link>
          </button>
          <button className="NavButton" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      ) : (
        <div className="sign">
          <button className="NavButton">
            <Link to="/login">Log In</Link>
          </button>
          <button className="NavButton">
            <Link to="/signup">Sign Up</Link>
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

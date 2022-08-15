import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import { Card, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { useAuth } from "./Auth";
import placeHolderAvatar from "../res/testProfile.jpg";

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
        <div className="avatar-combo">
          <div className="dropdown">
            <button className="dropbtn">Dropdown</button>
            <div className="dropdown-content">
              <Link to="/profile">Profile</Link>
              <p onClick={handleLogout}>Log Out</p>
            </div>
          </div>
          {currUser.photoURL}
          <img src={placeHolderAvatar} alt="Profile avatar" />
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

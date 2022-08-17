import { Link, useNavigate } from "react-router-dom";
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
      <Link to="/" className="site-title">
        Task Tracker
      </Link>
      {currUser ? (
        <div className="avatar-combo">
          <div className="dropdown">
            <button className="dropbtn">
              {" "}
              {currUser.email}
              <div className="nav-avatar">
              {currUser.photoURL ? (
                
                <img src={currUser.photoURL} alt="Profile avatar" />
              ) : (
                ""
              )}
              </div>
              
            </button>
            <div className="dropdown-content">
              <Link to="/profile">Profile</Link>
              <p onClick={handleLogout}>Log Out</p>
            </div>
          </div>
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

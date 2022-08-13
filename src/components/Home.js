import React from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { useAuth } from "./Auth";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
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
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong>
          {currUser.email}
          <Link to="/userdetails" className="btn btn-primary w-100 mt-3">
            Edit your details
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button varriant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
};

export default Home;

import { Form, Button, Card, Alert } from "react-bootstrap";
import React, { useRef } from "react";
import { useAuth } from "./Auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const { login, currUser, refineErr } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passRef.current.value);
      navigate("/tasks");
      console.log("Ok Im in as ", currUser.email);
    } catch (err) {
      setError(refineErr(err.message));
      console.log("error");
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={(event) => handleSubmit(event)}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passRef}
                minLength="6"
                required
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            <Link to="/forgot-password">Forgot Password ?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Dont have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
};

export default Login;

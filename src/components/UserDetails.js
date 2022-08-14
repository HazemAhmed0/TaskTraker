import { Form, Button, Card, Alert } from "react-bootstrap";
import React, { useRef } from "react";
import { useAuth } from "./Auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../res/testProfile.jpg";

const UserDetails = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const passConfRef = useRef();
  const profilePicRef = useRef();
  const { currUser, updatePassword, updateEmail, refineErr } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (passRef.current.value !== passConfRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    if (emailRef.current.value !== currUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passRef.current.value) {
      promises.push(updatePassword(passRef.current.value));
    }
    if (profilePicRef.current.value) {
      console.log(profilePicRef.current.value);
    }

    Promise.all(promises)
      .then(() => {
        navigate("/tasks");
      })
      .catch((err) => {
        setError(refineErr(err.message));
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update your details</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={(event) => handleSubmit(event)}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                defaultValue={currUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passRef}
                // minLength="6"
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                ref={passConfRef}
                // minLength="6"
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="profile-picture">
              <Form.Label>Upload Profile Picture</Form.Label>
              <Form.Control
                type="file"
                ref={profilePicRef}
                // minLength="6"
                placeholder="Leave blank to keep the same"
                accept="image/png, image/jpeg"
              />
              <img
                alt="Avatar"
                className="avatar"
                src={currUser.photoURL || avatar}
              ></img>
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/tasks">Cancel</Link>
      </div>
    </>
  );
};

export default UserDetails;

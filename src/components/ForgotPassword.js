import { Button, Card, Alert } from "react-bootstrap";
import React, { useRef } from "react";
import { useAuth } from "./Auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import axios from "axios";
const baseURL =
  "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDwv8LR0H-le2AAQYNqzWBjBWYgw_WwmIs";

const ForgotPassword = () => {
  const { resetPassword, refineErr } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const customResetPassword = async (email) => {
    await axios
      .post(baseURL, {
        requestType: "PASSWORD_RESET",
        email: email,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  const onSubmit = async (values) => {
    try {
      setError("");
      setMessage("");
      setLoading(true);
      await customResetPassword(values.email);
      setMessage("Check your inbox for further instructions");
    } catch (err) {
      setError(refineErr(err.message));
      console.log("error");
    }
    setLoading(false);
  };
  return (
    <>
      <div className="form-container">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => onSubmit(values)}
        >
          <Form>
            <h2 className="text-center mb-4">Forgot Password</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}

            <Field
              id="email"
              name="email"
              type="email"
              placeholder="Email Address"
              required
            />
            <button disabled={loading} className="w-100" type="submit">
              Reset Password
            </button>
          </Form>
        </Formik>
        <div className="w-100 text-center mt-2">
          <Link to="/login">Log In</Link>
        </div>
        <div className="w-100 text-center mt-2">
          Dont have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;

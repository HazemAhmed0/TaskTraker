import { Form, Button, Card, Alert } from "react-bootstrap";
import React, { useRef } from "react";
import { useAuth } from "./Auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

const SignUp = () => {
  const { signUp, refineErr } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    onSubmit: async (values) => {
      if (values.password !== values.passwordConfirm) {
        return setError("Passwords do not match");
      }
      try {
        setError("");
        setLoading(true);
        await signUp(values.email, values.password);
        navigate("/login");
      } catch (err) {
        setError(refineErr(err.message));
      }
      setLoading(false);
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <h2 className="text-center mb-4">Sign Up</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <div className="input-container">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={formik.handleChange}
            value={formik.values.email}
            required
          />
        </div>
        <div className="input-container">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Create a Password"
            onChange={formik.handleChange}
            value={formik.values.password}
            required
          />
        </div>
        <div className="input-container">
          <input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            placeholder="Confirm your password"
            onChange={formik.handleChange}
            value={formik.values.passwordConfirm}
            required
          />
        </div>
        <button disabled={loading} className="w-100" type="submit">
          Sign Up
        </button>
      </form>
    </>
  );
};

export default SignUp;

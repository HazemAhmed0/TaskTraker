import { Alert } from "react-bootstrap";
import { useAuth } from "./Auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import axios from "axios";
const baseSignUpURL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDwv8LR0H-le2AAQYNqzWBjBWYgw_WwmIs";

const SignUp = () => {
  const { refineErr } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const customSignUp = async (email, password) => {
    await axios
      .post(baseSignUpURL, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .then((res) => {
        console.log(res);
      });
  };

  const onSubmit = async (values) => {
    if (values.password !== values.passwordConfirm) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      //await signUp(values.email, values.password);
      await customSignUp(values.email, values.password);
      navigate("/login");
    } catch (err) {
      setError(refineErr(err.message));
    }
    setLoading(false);
  };
  return (
    <div className="form-container">
      <Formik
        initialValues={{
          email: "",
          password: "",
          passwordConfirm: "",
        }}
        onSubmit={(values) => onSubmit(values)}
      >
        <Form>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Field
            id="email"
            name="email"
            type="email"
            placeholder="Email Address"
            required
          />
          <Field
            id="password"
            name="password"
            type="password"
            placeholder="Create a Password"
            required
          />
          <Field
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            placeholder="Confirm your password"
            required
          />
          <button disabled={loading} className="w-100" type="submit">
            Sign Up
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default SignUp;

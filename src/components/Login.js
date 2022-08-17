import { Alert } from "react-bootstrap";
import { useAuth } from "./Auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";

const Login = () => {
  const { login, currUser, refineErr } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      setError("");
      setLoading(true);
      await login(values.email, values.password);
      navigate("/");
      console.log("Ok Im in as ", currUser.email);
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
            <h2 className="text-center mb-4">Log In</h2>
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
            <button disabled={loading} className="w-100" type="submit">
              Log In
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Login;

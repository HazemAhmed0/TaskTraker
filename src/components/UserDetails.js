import { Alert } from "react-bootstrap";
import React, { useEffect, useRef } from "react";
import { useAuth } from "./Auth";
import { updateProfile } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const UserDetails = () => {
  const { currUser, updatePassword, updateEmail, refineErr } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState();

  const profileChange = (e) => {
    console.log(e);
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };
  useEffect(() => {
    if (currUser?.photoURL) {
      setPhotoURL(currUser?.photoURL);
    }
  }, [currUser]);

  const upload = async (file, currUser, setLoading) => {
    const fileref = ref(getStorage(), "images/" + currUser.uid + ".png");
    setLoading(true);
    const snapshot = await uploadBytes(fileref, file);
    const photoURL = await getDownloadURL(fileref);

    updateProfile(currUser, { photoURL });
    setLoading(false);
    alert("Upload done!");
  };

  const onSubmit = (values) => {
    console.log(values);
    if (values.password !== values.passwordConfirm) {
      return setError("Passwords do not match");
    }

    const promises = [];
    if (values.email !== currUser.email) {
      promises.push(updateEmail(values.email));
    }
    if (values.password !== "") {
      promises.push(updatePassword(values.password));
    }
    if (values.name !== "") {
      promises.push(
        currUser.updateProfile({
          displayName: values.name,
        })
      );
    }

    if (values.tel !== "") {
      promises.push(
        currUser.updateProfile({
          phoneNumber: values.tel,
        })
      );
    }
    if (photo) {
      console.log("got here");
      promises.push(upload(photo, currUser, setLoading));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setError(refineErr(err.message));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="form-container">
      <Formik
        initialValues={{
          email: currUser.email,
          name: currUser.displayName,
          // tel: currUser.phoneNumber,
          password: "",
          passwordConfirm: "",
          profile: "",
        }}
        onSubmit={(values) => onSubmit(values)}
      >
        <Form>
          <h2 className="text-center mb-4">Profile Details</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="pf-container">
            <img src={photoURL}></img>
          </div>

          <Field
            id="email"
            name="email"
            placeholder="put your email"
            type="email"
          />
          <Field id="name" name="name" placeholder="put your name" />
          <Field
            id="tel"
            name="tel"
            placeholder="put your phone number"
            type="tel"
          />
          <Field
            id="password"
            name="password"
            placeholder="Leave blank to keep the same"
            type="password"
          />
          <Field
            id="passwordConfirm"
            name="passwordConfirm"
            placeholder="Leave blank to keep the same"
            type="password"
          />
          <input
            name="profile"
            id="profile"
            type="file"
            onChange={(e) => profileChange(e)}
          />

          <button disabled={loading} className="w-100" type="submit">
            Update
          </button>
        </Form>
      </Formik>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </div>
  );
};

export default UserDetails;

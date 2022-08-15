import { Form, Button, Card, Alert } from "react-bootstrap";
import React, { useEffect, useRef } from "react";
import { useAuth } from "./Auth";
import { updateProfile } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../res/testProfile.jpg";
import {
  collection,
  getFirestore,
  onSnapshot,
  getDoc,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const UserDetails = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const passConfRef = useRef();
  const NameRef = useRef();
  const TelRef = useRef();
  const profilePicRef = useRef();
  const { currUser, updatePassword, updateEmail, refineErr } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState();

  const profileChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };
  useEffect(() => {
    if (currUser?.photoURL) {
      setPhotoURL(currUser?.photoURL);
    }
  }, [currUser]);

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
    if (NameRef.current.value) {
      promises.push(
        currUser.updateProfile({
          displayName: NameRef.current.value,
        })
      );
    }

    if (TelRef.current.value) {
      promises.push(
        currUser.updateProfile({
          phoneNumber: TelRef.current.value,
        })
      );
    }
    promises.push(upload(photo, currUser, setLoading));

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
  }

  const upload = async (file, currUser, setLoading) => {
    const fileref = ref(getStorage(), "images/" + currUser.uid + ".png");
    setLoading(true);
    const snapshot = await uploadBytes(fileref, file);

    const photoURL = await getDownloadURL(fileref);

    updateProfile(currUser, { photoURL });
    setLoading(false);
    alert("Upload done!");
  };

  return (
    <>
      {" "}
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile Details</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="pf-container">
            <img src={photoURL}></img>
          </div>
          <Form onSubmit={(event) => handleSubmit(event)}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                defaultValue={currUser.email}
              />
            </Form.Group>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                ref={NameRef}
                defaultValue={currUser.displayName}
              />
            </Form.Group>
            <Form.Group id="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                ref={TelRef}
                defaultValue={currUser.phoneNumber}
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

            <input type="file" onChange={profileChange}></input>
            <Button disabled={loading} className="w-100" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
};

export default UserDetails;

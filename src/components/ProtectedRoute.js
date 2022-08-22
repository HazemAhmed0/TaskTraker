import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth";

export default function ProtectedRoute({ children, currUser }) {

  // const hasJWT = () => {
  //   let flag = false;
  //   //check user has JWT token
  //   localStorage.getItem("token") ? (flag = true) : (flag = false);
  //   return flag;
  // };

  // if (!hasJWT()) {
  //   return <Navigate to="/login" />;
  // }

  if(!currUser){
    console.log("No user currently logged in")
    return <Navigate to="/login" />;
  } else{
    console.log("In prot route, logged in as ", currUser.email)
  }

  return children;
}

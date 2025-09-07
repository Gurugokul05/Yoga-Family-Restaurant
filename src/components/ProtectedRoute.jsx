import React from "react";
import { getAdminEmail } from "../utils/checkAdmin";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { useState, useEffect } from "react";

const ProtectedRoute = () => {
  const [allow, setAllow] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAdmin = async () => {
      //get the list of email from db
      const getEmail = await getAdminEmail();
      //get the verified email from firebasedb
      const verifiedEmail = auth.currentUser?.email;
      if (getEmail.includes(verifiedEmail) && verifiedEmail) {
        setAllow(true);
      } else {
        setAllow(false);
      }
      setLoading(false);
    };
    checkAdmin();
  }, []);
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <div className="spinner"></div>
      </div>
    );
  }
  return allow ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

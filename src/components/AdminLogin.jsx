import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { getAdminEmail } from "../utils/checkAdmin";

import "./AdminLogin.css";

const AdminLogin = () => {
  const [loginStatus, setLoginStatus] = useState("");
  const [email, setEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const navigate = useNavigate();

  const checkCredentials = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, enteredPassword)
      .then(async (userCredential) => {
        const user = userCredential.user;
        if (!user.emailVerified) {
          setLoginStatus("Please Verify Email");
          return;
        }
        try {
          const adminEmails = await getAdminEmail();

          if (adminEmails.includes(user.email)) {
            navigate("/admin-pannel");
          } else {
            navigate("/home");
          }
        } catch (err) {
          console.error("Error checking admin emails:", err);
          setLoginStatus("Something went wrong. Try again.");
        }
      })
      .catch((error) => {
        setLoginStatus("Invalid Credentials");
      });
  };
  const changePassword = async () => {
    const auth = getAuth();
    if (!email) {
      setLoginStatus("Please enter the Email first");
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setLoginStatus("Password reset email sent. Check your Spam.");
    } catch (error) {
      setLoginStatus("Error sending reset email.");
    }
  };

  return (
    <div id="AdminContainer">
      <div id="AdminContainer2">
        <form onSubmit={checkCredentials}>
          <Helmet>
            <title>Login</title>
          </Helmet>
          <h1>Login</h1>
          <br />
          <input
            type="email"
            required
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            required
            placeholder="Enter Your Password"
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
          />
          <br />

          <p value={loginStatus} style={{ color: "red", fontWeight: "bold" }}>
            {loginStatus}
          </p>
          <p>
            Forgot Your Password ?<a onClick={changePassword}> Click here</a>
          </p>
          <button type="submit" id="loginbutton">
            Log in
          </button>

          <p>
            Don't have account ?<Link to="/register"> Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

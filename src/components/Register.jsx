import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import "./Register.css";

const Register = () => {
  const [step, setStep] = useState("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [otpStatus, setOtpStatus] = useState("");
  const [loading, setLoading] = useState(false); //  spinner loading
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(userCredential.user);
      setStep("otpverification");
    } catch (error) {
      console.log(error.message);
      if (error.code === "auth/email-already-in-use") {
        setMessage(
          "Email already exists. Try logging in or check your spam for a verification email."
        );
      } else {
        setMessage("Error Occurred. Try Again Later.");
      }
    }
    setLoading(false);
  };

  const handleOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await auth.currentUser.reload();
      const user = auth.currentUser;
      if (user.emailVerified) {
        navigate("/login");
      } else {
        setOtpStatus("Email not verified yet. Please check your inbox.");
      }
    } catch (error) {
      console.error(error);
      setOtpStatus("Something went wrong. Try again.");
    }
    setLoading(false);
  };

  return (
    <div id="AdminContainer">
      <div id="AdminContainer2">
        <Helmet>
          <title>Register</title>
        </Helmet>

        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
            <p>{step === "register" ? "Registering..." : "Verifying..."}</p>
          </div>
        ) : step === "register" ? (
          <form onSubmit={handleSubmit}>
            <h1>Register</h1>
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <p style={{ color: "red", fontWeight: "bold" }}>{message}</p>
            <button type="submit">Register</button>
            <p>
              Have an account? <Link to="/login" style={{textDecoration:"none"}}>Log In</Link>
            </p>
          </form>
        ) : (
          <form onSubmit={handleOtp}>
            <h2>Verify Your Email</h2>
            <br />
            <h5>Check the Spam Folder</h5>
            <p style={{ color: "red", fontWeight: "bold" }}>{otpStatus}</p>
            <button type="submit" id="otpbutton">
              Click here to verify
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;

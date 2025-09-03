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
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
  };

  const handleOtp = async (e) => {
    e.preventDefault();

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
  };
  return (
    <div>
      {step === "register" ? (
        <div id="AdminContainer">
          <div id="AdminContainer2">
            <form onSubmit={handleSubmit}>
              <Helmet>
                <title>Register</title>
              </Helmet>
              <h1>Register</h1>
              <br />
              {/* <input type="text" required  placeholder='Enter Your Name' value={name} onChange={(e)=>setName(e.target.value)}/><br/> */}
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
              <p value={message} style={{ color: "red", fontWeight: "bold" }}>
                {message}
              </p>
              <button type="submit">Register</button>
              <p>
                Have an account ?<Link to="/login"> Log In</Link>
              </p>
            </form>
          </div>
        </div>
      ) : (
        <div id="AdminContainer">
          <div id="AdminContainer2">
            <form onSubmit={handleOtp}>
              <Helmet>
                <title>Register</title>
              </Helmet>
              <h2>Verify Your Email</h2>
              <br />
              <h5>Check the Spam Folder</h5>
              {/* <input type="text" required  placeholder='Enter the otp' value={enteredOtp} onChange={(e)=>setEnteredOtp(e.target.value)}/><br/> */}
              <p style={{ color: "red", fontWeight: "bold" }}> {otpStatus}</p>
              <button type="submit" id="otpbutton">
                Click here to verify
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;

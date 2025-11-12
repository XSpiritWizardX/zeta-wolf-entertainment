// src/components/LoginFormPage/LoginFormPage.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

import "./LoginForm.css";
import { thunkLogin, thunkSignup } from "../../redux/session";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  // -----------------------------
  // State
  // -----------------------------
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState({});
  const [message] = useState(null);


  if (sessionUser) return <Navigate to="/" replace={true} />;

  // -----------------------------
  // Submit Handler
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === "login") {
      const serverResponse = await dispatch(thunkLogin({ email, password }));
      if (serverResponse) setErrors(serverResponse);
      else navigate("/");
      return;
    }

    // -----------------------------
    // Signup Validation
    // -----------------------------
    const signupErrors = {};
    if (!firstName) signupErrors.firstName = "First name is required.";
    if (!lastName) signupErrors.lastName = "Last name is required.";
    if (!email) signupErrors.email = "Email is required.";
    if (!phone) signupErrors.phone = "Phone number is required.";
    if (!password) signupErrors.password = "Password is required.";
    if (!confirmPassword)
      signupErrors.confirmPassword = "Please confirm your password.";



    if (Object.keys(signupErrors).length > 0) {
      setErrors(signupErrors);
      return;
    }


    const serverResponse = await dispatch(
      thunkSignup({
        account_type: "Customer",
        firstname: firstName,
        lastname: lastName,
        email,
        phone,
        password,

      })
    );

    if (serverResponse) setErrors(serverResponse);
    else navigate("/");
  };

  // -----------------------------
  // Demo Logins
  // -----------------------------
  const handleDemoLogin = async (email) => {
    const serverResponse = await dispatch(
      thunkLogin({ email, password: "password" })
    );
    if (serverResponse) setErrors(serverResponse);
    else navigate("/");
  };

  return (
    <div className="login-form-container">
      <div className="login-toggle-buttons">
        <button
          className={mode === "login" ? "active" : ""}
          disabled={mode === "login"}
          onClick={() => setMode("login")}
        >
          Log In
        </button>
        <button
          className={mode === "signup" ? "active" : ""}
          disabled={mode === "signup"}
          onClick={() => setMode("signup")}
        >
          Sign Up
        </button>
      </div>

      <h1>{mode === "login" ? "Log In" : "Sign Up"}</h1>
      {message && <p className="success-message">{message}</p>}

      <form onSubmit={handleSubmit} className="login-form">
        {/* -------------------------- SIGNUP FIELDS -------------------------- */}
        {mode === "signup" && (
          <>


            <label className="input-wrapper">
              <FaUser className="input-icon" />
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            {errors.firstName && <p className="error">{errors.firstName}</p>}

            <label className="input-wrapper">
              <FaUser className="input-icon" />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            {errors.lastName && <p className="error">{errors.lastName}</p>}
          </>
        )}

        {/* -------------------------- COMMON FIELDS -------------------------- */}
        <label className="input-wrapper">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="error">{errors.email}</p>}

        <label className="input-wrapper">
          <FaLock className="input-icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="error">{errors.password}</p>}

        {/* -------------------------- Forgot Password -------------------------- */}
        {/* {mode === "login" && (
          <div className="forgot-password">
            {!showForgot ? (
              <button
                type="button"
                className="forgot-btn"
                onClick={() => setShowForgot(true)}
              >
                Forgot Password?
              </button>
            ) : (
              <div className="forgot-popup">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                />
                <button type="button" onClick={handleForgotPassword}>
                  Send Reset Link
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowForgot(false)}
                >
                  Cancel
                </button>
                {errors.forgotEmail && (
                  <p className="error">{errors.forgotEmail}</p>
                )}
              </div>
            )}
          </div>
        )} */}

        {/* -------------------------- CONFIRM + PHONE -------------------------- */}
        {mode === "signup" && (
          <>
            <label className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}

            <label className="input-wrapper">
              <FaPhone className="input-icon" />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </label>
            {errors.phone && <p className="error">{errors.phone}</p>}



            {/* -------------------------- CAPTCHA -------------------------- */}

          </>
        )}

        <button type="submit" className="submit-btn">
          {mode === "login" ? "Log In" : "Sign Up"}
        </button>
      </form>

      {/* -------------------------- GOOGLE LOGIN -------------------------- */}


      {/* -------------------------- DEMO LOGINS -------------------------- */}
      {mode === "login" && (
        <>
          <button
            className="demo-btn"
            onClick={() => handleDemoLogin("demo@example.io")}
          >
            Demo Admin Login
          </button>

        </>
      )}
    </div>
  );
}

export default LoginFormPage;

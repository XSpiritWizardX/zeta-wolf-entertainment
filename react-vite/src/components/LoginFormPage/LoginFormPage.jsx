// src/components/LoginFormPage/LoginFormPage.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaIdBadge,
  FaPhone,
} from "react-icons/fa";
// import { GoogleLogin } from "@react-oauth/google";
// import ReCAPTCHA from "react-google-recaptcha";
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
  const [accountType, setAccountType] = useState("Customer");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
  const [errors, setErrors] = useState({});
  const [message] = useState(null);
  // const [showForgot, setShowForgot] = useState(false);
  // const [forgotEmail, setForgotEmail] = useState("");
  // const [captchaToken, setCaptchaToken] = useState(null);

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
    if (password && confirmPassword && password !== confirmPassword)
      signupErrors.confirmPassword = "Passwords do not match.";
    if (!acceptTerms)
      signupErrors.acceptTerms =
        "You must accept the Terms of Service & Privacy Policy.";

    // -----------------------------
    // CAPTCHA Verification
    // -----------------------------
    // if (!captchaToken) {
    //   signupErrors.captcha = "Please verify that you are not a robot.";
    // } else {
    //   try {
    //     const apiBase =
    //       import.meta.env.MODE === "production"
    //         ? "https://stainless-steel-kitchens.onrender.com"
    //         : "http://127.0.0.1:8000";

    //     const res = await fetch(`${apiBase}/api/captchas/verify-captcha`, {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({ response: captchaToken }),
    //     });

    //     const data = await res.json();
    //     if (!data.success) {
    //       signupErrors.captcha = "Captcha failed or expired. Please try again.";
    //     }
    //   } catch (err) {
    //     signupErrors.captcha = "Captcha verification failed. Please try again.";
    //   }
    // }

    if (Object.keys(signupErrors).length > 0) {
      setErrors(signupErrors);
      return;
    }

    const requiresApproval = accountType !== "Customer";
    const isVerified = !requiresApproval;

    const serverResponse = await dispatch(
      thunkSignup({
        account_type: accountType,
        firstname: firstName,
        lastname: lastName,
        email,
        phone,
        password,
        agreed_to_terms_privacy: acceptTerms,
        subscribed: subscribeNewsletter,
        is_verified: isVerified,
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

  // -----------------------------
  // Google Login / Signup
  // -----------------------------
  // const handleGoogleSuccess = async (credentialResponse) => {
  //   try {
  //     const token = credentialResponse.credential;
  //     const res = await fetch("/api/auth/google/callback", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ token }),
  //     });

  //     if (!res.ok) throw new Error("Google login failed");
  //     const data = await res.json();
  //     if (data && data.email) {
  //       dispatch(setUser(data));
  //       navigate("/");
  //     } else {
  //       console.error("Invalid user data from backend");
  //     }
  //   } catch (error) {
  //     console.error("Google login failed:", error);
  //     setErrors({ google: "Google authentication failed. Please try again." });
  //   }
  // };

  // const handleGoogleError = () => {
  //   setErrors({ google: "Google authentication was cancelled or failed." });
  // };

  // -----------------------------
  // Forgot Password
  // -----------------------------
  // const handleForgotPassword = async () => {
  //   setMessage(null);
  //   setErrors({});
  //   if (!forgotEmail) {
  //     setErrors({ forgotEmail: "Please enter your email." });
  //     return;
  //   }

  //   try {
  //     const response = await fetch("/api/auth/forgot-password", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email: forgotEmail }),
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       setMessage("A password reset link has been sent to your email.");
  //       setForgotEmail("");
  //       setShowForgot(false);
  //     } else {
  //       setErrors({ forgotEmail: data.error || "Failed to send reset link." });
  //     }
  //   } catch {
  //     setErrors({ forgotEmail: "An error occurred. Please try again." });
  //   }
  // };

  // -----------------------------
  // JSX
  // -----------------------------
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
              <FaIdBadge className="input-icon" />
              <select
                className="account-type-select"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
              >
                <option value="Customer">Customer</option>
                <option value="Contractor">Contractor</option>
                <option value="Designer">Designer</option>
              </select>
            </label>

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

            <label className="checkbox-wrapper">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />
              I accept the{" "}
              <a href="/terms-and-conditions">Terms of Service</a>,{" "}
              <a href="/privacy-policy">Privacy Policy</a> &{" "}
              <a href="/cookies-policy">Cookies Policy</a>
            </label>
            {errors.acceptTerms && (
              <p className="error">{errors.acceptTerms}</p>
            )}

            <label className="checkbox-wrapper">
              <input
                type="checkbox"
                checked={subscribeNewsletter}
                onChange={(e) => setSubscribeNewsletter(e.target.checked)}
              />
              Subscribe to our newsletter
            </label>

            {/* -------------------------- CAPTCHA -------------------------- */}
            {/* <div className="captcha-wrapper">
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={(token) => setCaptchaToken(token)}
              />
              {errors.captcha && <p className="error">{errors.captcha}</p>}
            </div> */}
          </>
        )}

        <button type="submit" className="submit-btn">
          {mode === "login" ? "Log In" : "Sign Up"}
        </button>
      </form>

      {/* -------------------------- GOOGLE LOGIN -------------------------- */}
      {/* <div className="google-auth-wrapper">
        <p className="or-divider">— or —</p>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          useOneTap
        />
        {errors.google && <p className="error">{errors.google}</p>}
      </div> */}

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

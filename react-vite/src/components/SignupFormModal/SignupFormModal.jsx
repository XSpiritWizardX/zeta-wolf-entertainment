// src/components/SignupFormModal/SignupFormModal.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupFormModal.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // client-side password match
    if (password !== confirmPassword) {
      setErrors({
        confirmPassword: "Confirm password must match password",
      });
      return;
    }

    const payload = {
      firstname,
      lastname,
      email,
      phone,
      password,
    };

    const res = await dispatch(thunkSignup(payload));

    if (res && res.errors) {
      setErrors(res.errors);
    } else {
      closeModal();
    }
  };

  return (
    <div className="sign-up-modalzs">
      <h1>Create Your Account</h1>

      <form onSubmit={handleSubmit} className="signup-form">

        {/* FIRST NAME */}
        <label>
          First Name
          <input
            className="signup-input"
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
            maxLength={40}
          />
        </label>
        {errors.firstname && <p className="error">{errors.firstname}</p>}

        {/* LAST NAME */}
        <label>
          Last Name
          <input
            className="signup-input"
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
            maxLength={40}
          />
        </label>
        {errors.lastname && <p className="error">{errors.lastname}</p>}

        {/* EMAIL */}
        <label>
          Email
          <input
            className="signup-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="error">{errors.email}</p>}

        {/* PHONE */}
        <label>
          Phone Number
          <input
            className="signup-input"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            maxLength={17}
          />
        </label>
        {errors.phone && <p className="error">{errors.phone}</p>}

        {/* PASSWORD */}
        <label>
          Password
          <input
            className="signup-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="error">{errors.password}</p>}

        {/* CONFIRM PASSWORD */}
        <label>
          Confirm Password
          <input
            className="signup-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

        <button type="submit" className="signup-btn">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;

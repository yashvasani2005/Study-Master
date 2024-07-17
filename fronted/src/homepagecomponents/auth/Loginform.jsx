import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/operations/authAPI";
import "./Loginform.css";

function Loginform() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = formData;

  function handleOnChange(e) {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  }

  return (
    <form onSubmit={handleOnSubmit} className="lf-form">
      <label className="lf-label">
        <p className="lf-label-text">
          Email Address <sup className="lf-required">*</sup>
        </p>
        <input
          required
          type="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          name="email"
          className="lf-input"
        />
      </label>

      <label className="lf-label lf-relative">
        <p className="lf-label-text">
          Password <sup className="lf-required">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          name="password"
          className="lf-input"
        />
        <span
          className="lf-icon"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>
        <Link to="/forgot-password" className="lf-forgot-password">
          Forgot Password
        </Link>
      </label>

      <button className="lf-btn">Sign In</button>
    </form>
  );
}

export default Loginform;

import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { sendOtp } from "../../services/operations/authAPI";
import { setSignupData } from "../../slices/Authslice";
import { ACCOUNT_TYPE } from "../../utils/Constant";
import Tab from "../../components/Tab";
import "./Signupform.css";

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { firstName, lastName, email, password, confirmPassword } = formData;

  // Handle input fields, when some value changes
  function handleOnChange(e) {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  // Handle Form Submission
  function handleOnSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const signupData = { ...formData, accountType };
    dispatch(setSignupData(signupData)); // Setting signup data to state To be used after otp verification
    dispatch(sendOtp(formData.email, navigate)); // Send OTP to user for verification
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    }); // Reset
    setAccountType(ACCOUNT_TYPE.STUDENT);
  }

  // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];

  return (
    <div>
      {/* Tab */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />

      {/* Form */}
      <form onSubmit={handleOnSubmit}>
        <div className="flex-row">
          <label>
            {/* First Name */}
            <p>
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter First Name"
              name="firstName"
            />
          </label>

          <label>
            {/* Last Name */}
            <p>
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter Last Name"
              name="lastName"
            />
          </label>
        </div>

        <label>
          {/* Email */}
          <p>
            Email Address<sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter Email Name"
            name="email"
          />
        </label>

        <div className="flex-row">
          <label className="relative">
            <p>
              Create Password<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleOnChange}
              value={password}
              placeholder="Enter Password"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>

          <label className="relative">
            <p>
              Confirm Password<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              onChange={handleOnChange}
              value={confirmPassword}
              placeholder="Confirm Password"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default SignupForm;

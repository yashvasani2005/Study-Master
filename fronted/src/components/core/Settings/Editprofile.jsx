import React, { useState } from "react";
import './Editprofile.css';
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../../services/operations/SettingAPi";

function Editprofile() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [firstname, setfirstname] = useState(user?.firstname || '');
  const [lastname, setlastname] = useState(user?.lastname || '');
  const [email, setemail] = useState(user?.email || '');
  const [gender, setgender] = useState(user?.additionaldetails?.gender || '');
  const [dob, setdob] = useState(user?.additionaldetails?.dateofbirth ?? "Add date of birth");
  const [contactno, setcontactno] = useState(user?.additionaldetails?.contactnumber || 'Add the contact number');
  const [errors, setErrors] = useState({}); // State for form validation errors

  const submithandle = async (e) => {
    e.preventDefault(); 

    // Basic validation
    const newErrors = {};

    // Validate Gmail
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
      newErrors.email = "Please enter a valid Gmail address";
    }

    // Validate contact number
    if (!/^\d{10}$/.test(contactno)) {
      newErrors.contactno = "Contact number must be 10 digits";
    }

    // Ensure no errors before dispatching
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const data = { firstname, lastname, email, dob, contactno, gender };
    try {
      dispatch(updateProfile(token, data));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  return (
    <div className="edit_profile_container">
      <div className="edit_profile_info">
        <h1 className="edit_profile_heading">Profile Information</h1>
        <form className="edit_profile_form" onSubmit={submithandle}>
          <div className="edit_profile_labels">
            <p className="edit_profile_p">First Name</p>
            <input
              type="text"
              className="edit_profile_input"
              value={firstname}
              onChange={(e) => setfirstname(e.target.value)}
            />
          </div>

          <div className="edit_profile_labels">
            <p className="edit_profile_p">Last Name</p>
            <input
              type="text"
              className="edit_profile_input"
              value={lastname}
              onChange={(e) => setlastname(e.target.value)}
            />
          </div>

          <div className="edit_profile_labels">
            <p className="edit_profile_p">Email</p>
            <input
              type="email"
              className="edit_profile_input"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            {errors.email && <p className="error_message">{errors.email}</p>}
          </div>

          <div className="edit_profile_labels">
            <p className="edit_profile_p">Date of Birth</p>
            <input
              type="date"
              className="edit_profile_input"
              value={dob}
              onChange={(e) => setdob(e.target.value)}
            />
          </div>

          <div className="edit_profile_labels">
            <p className="edit_profile_p">Contact Number</p>
            <input
              type="number"
              className="edit_profile_input"
              value={contactno}
              onChange={(e) => setcontactno(e.target.value)}
            />
            {errors.contactno && <p className="error_message">{errors.contactno}</p>}
          </div>

          <div className="edit_profile_labels">
            <p className="edit_profile_p">Gender</p>
            <select
              className="edit_profile_input"
              value={gender}
              onChange={(e) => setgender(e.target.value)}
            >
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
           
          <button className="edit_profile_save_button" type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

export default Editprofile;

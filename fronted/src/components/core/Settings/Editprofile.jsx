import React, { useRef, useState } from "react";
import './Editprofile.css';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { FaUpload } from "react-icons/fa";
import axios from "axios";

function Editprofile() {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const [isUploading, setIsUploading] = useState(false); // Loading state for upload
  const { user } = useSelector((state) => state.profile);

  const [firstname, setfirstname] = useState(user?.firstname || '');
  const [lastname, setlastname] = useState(user?.lastname || '');
  const [email, setemail] = useState(user?.email || '');
  const [gender, setgender] = useState(user?.gender || '');
  const [dob, setdob] = useState(user?.dob || '');
  const [contactno, setcontactno] = useState(user?.contactno || '');

  const navigate = useNavigate();

  // Handle file input change
  function handleOnChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageURL(URL.createObjectURL(file)); // Display selected image
    }
  }

  // Handle file upload
  const handleOnClick = async () => {
    if (!image) {
      setUploadError('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('image', image); // Ensure the key matches with the backend

    try {
      setIsUploading(true); // Set loading state
      const response = await axios.post('http://localhost:4000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('File uploaded successfully!');
        // Additional logic for handling successful upload
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError('Upload failed: ' + error.response?.data?.error || 'Unknown error');
    } finally {
      setIsUploading(false); // Reset loading state
    }
  };

  // Handle form submission to update profile details
  const submithandle = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/v1/profile/updateProfile?_method=PUT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstname, lastname, email, dob, contactno, gender })
      });

      const data = await response.json();

      if (data.success) {
        alert('Data saved successfully');
        // Optionally, navigate to another page or update the profile in the redux store
      } else {
        alert('Error saving data: ' + data.message);
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data. Please try again later.');
    }
  };

  return (
    <div className="main_body_of_Editprofile">
      <h1 className="heading_of_setting">Edit Profile</h1>

      {/* Profile Picture Section */}
      <div className="editprofile_section1">
        {imageURL ? (
          <img src={imageURL} alt={`profile-${user?.firstname}`} className="log_of_section1" />
        ) : (
          <img src={user?.image} alt={`profile-${user?.firstname}`} className="log_of_section1" />
        )}

        <p className="editprofile_section1_p">Change Profile Picture</p>

        {/* File input */}
        <input 
          type="file" 
          name="Select" 
          id="file-upload" 
          onChange={handleOnChange} 
          className="input_of_choosefile"
          accept="image/*" // Ensure only images are selected
        />
   
        {/* Upload button */}
        <button 
          className="editprofile_section1_button2" 
          onClick={handleOnClick} 
          disabled={isUploading} // Disable button while uploading
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
        <FaUpload className="upload_icon" />
        
        {/* Error message display */}
        {uploadError && <p className="error_message">{uploadError}</p>}
      </div>

      {/* Section 2: Edit Profile Information */}
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
              value={lastname} 
              onChange={(e) => setlastname(e.target.value)} 
              className="edit_profile_input" 
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
          </div>
          <div className="edit_profile_labels">
            <p className="edit_profile_p">Gender</p>
            <input 
              type="text" 
              className="edit_profile_input" 
              value={gender} 
              onChange={(e) => setgender(e.target.value)} 
            />
          </div>

          {/* Submit button */}
          <button className="Edit_profile_Save_button" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default Editprofile;

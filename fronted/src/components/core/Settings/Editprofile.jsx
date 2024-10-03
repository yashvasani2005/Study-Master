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
    </div>
  );
}

export default Editprofile;

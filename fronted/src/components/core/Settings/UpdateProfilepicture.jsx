
import { useEffect, useRef, useState } from 'react';
import './UpdateProfilepicture.css';
import { useDispatch,useSelector  } from 'react-redux';
import { updateDisplayPicture } from '../../../services/operations/SettingAPi';
import IconBtn from '../../../common/IconBtn';
import { FiUpload } from "react-icons/fi"


function UpdateProfilepicture() {

    const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)

  const fileInputRef = useRef(null)

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if(file){
      setImageFile(file)
      previewFile(file)
    }
    console.log(file)
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleFileUpload = () => {
    try {
      console.log("uploading...")
      setLoading(true)
      const formData = new FormData()
      formData.append("displayPicture", imageFile)
      dispatch(updateDisplayPicture(token, formData)).then(() => {setLoading(false) })
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  useEffect(() => {
    if(imageFile) {
      previewFile(imageFile)
      
    }
  }, [imageFile])

  return (

  <div className="profile-image-container">
    <img
      src={previewSource || user?.image}
      alt={`profile-${user?.firstName}`}
      className="profile-image"
    />
    <div className="profile-content">
      <p className="profile-label">Change Profile Picture</p>
      <div className="profile-actions">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="file-input"
          accept="image/png, image/gif, image/jpeg"
        />
        <button
          onClick={handleClick}
          disabled={loading}
          className="select-button"
        >
          Select
        </button>
        <IconBtn text={loading ? "Uploading..." : "Upload"} onclick={handleFileUpload}>
          {!loading && <FiUpload className="upload-icon" />}
        </IconBtn>
      </div>
    </div>
  </div>

  );
}

export default UpdateProfilepicture;

import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { useSelector } from "react-redux";

import "video-react/dist/video-react.css";
import { Player } from "video-react";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  );

  const inputRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
  });

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  useEffect(() => {
    register(name, { required: true });
  }, [register]);

  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile, setValue]);

  return (
    <div className="upload-container">
      <label className="upload-label" htmlFor={name}>
        {label} {!viewData && <sup className="required-mark">*</sup>}
      </label>

      <div
        className={`upload-dropzone ${
          isDragActive ? "active-dropzone" : "inactive-dropzone"
        }`}
        {...getRootProps()}
      >
        <input
          {...getInputProps()}
          ref={inputRef}
          id={name}
          style={{ display: "none" }}
        />
        {previewSource ? (
          <div className="preview-container">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="preview-image"
              />
            ) : (
              <Player aspectRatio="16:9" playsInline src={previewSource} />
            )}
            {!viewData && (
              <button
                type="button"
                className="cancel-button"
                onClick={() => {
                  setPreviewSource("");
                  setSelectedFile(null);
                  setValue(name, null);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div className="dropzone-content" onClick={() => inputRef.current.click()}>
            <div className="upload-icon-container">
              <FiUploadCloud className="upload-icon" />
            </div>
            <p className="upload-instructions">
              Drag and drop an {!video ? "image" : "video"}, or click to{" "}
              <span className="browse-highlight">Browse</span> a file
            </p>
            <ul className="upload-guidelines">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>

      {errors[name] && (
        <span className="error-message">{label} is required</span>
      )}
    </div>
  );
}

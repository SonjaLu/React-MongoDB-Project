import React, { useState } from 'react';
import './FileUpload.css'; 

function FileUpload() {
  const [fileName, setFileName] = useState('No picture selected');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file ? file.name : 'No picture selected');
  };

  return (
    <div className="file-upload">
      <input
        className="image"
        type="file"
        accept="image/*"
        name="image"
        id="file-input"
        onChange={handleFileChange}
        style={{ display: 'none' }} // Verstecken des echten Inputs
      />
      <label htmlFor="file-input" className="custom-file-upload">
        Select picture for upload
      </label>
      <span className="file-name">{fileName}</span>
    </div>
  );
}

export default FileUpload;

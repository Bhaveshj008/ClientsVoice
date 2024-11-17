import React from 'react';

const FileInputField = ({ label, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-white">{label}</label>
    <div className="mt-2">
      <input
        type="file"
        accept="image/*"
        id="fileInput"
        className="hidden"
        onChange={(e) => onChange(e.target.files[0])}
      />
      <label
        htmlFor="fileInput"
        className="cursor-pointer py-2 px-4 w-full inline-block text-center border border-purple-500 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
      >
        Choose a File
      </label>
    </div>
  </div>
);

export default FileInputField;

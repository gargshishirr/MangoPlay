import React from "react";
// import './App.css'; // Assuming your CSS is in a file named signUpModal.css

const signUpModal = ({ title, onClose, children }) => {
  return (
    <div className="signUpModal">
      <div className="signUpModal-header">
        <h3 className="signUpModal-title">{title}</h3>
        <button className="signUpModal-close" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="signUpModal-content">{children}</div>
    </div>
  );
};

export default signUpModal;

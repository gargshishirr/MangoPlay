import React from "react";
// import './App.css'; // Assuming your CSS is in a file named Popup.css

const Popup = ({ title, onClose, children }) => {
  return (
    <div className="popup">
      <div className="popup-header">
        <h3 className="popup-title">{title}</h3>
        <button className="popup-close" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="popup-content">{children}</div>
    </div>
  );
};

export default Popup;

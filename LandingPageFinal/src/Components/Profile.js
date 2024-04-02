import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("userMP")));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userMP");
    localStorage.removeItem("accessTokenMP");
    localStorage.removeItem("refreshTokenMP");
    setUser(null);
    navigate("/");
    toast.success("Logout successful");
  };

  return (
    <div>
      <ToastContainer />
      <Navbar />

      <div className="profile-container">
        <h1>Profile</h1>
        <div className="profile-details">
          <p>
            <strong>Username:</strong> {user.userName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Full Name:</strong> {user.fullName}
          </p>
          <p>
            <strong>Age:</strong> {user.age}
          </p>
          <p>
            <strong>Gender:</strong> {user.gender}
          </p>
          <p>
            <strong>Date of Birth:</strong> {user.dateOfBirth}
          </p>
          <p>
            <strong>Address:</strong> {user.address}
          </p>
        </div>
      </div>
      <div className="navbar-links-container">
        <button className="primary-button" onClick={handleLogout}>
          Logout <FiLogOut />
        </button>
      </div>
    </div>
  );
};

export default Profile;

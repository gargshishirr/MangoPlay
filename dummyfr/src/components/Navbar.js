import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Assuming your token is in 'authToken'
    sessionStorage.removeItem('refreshToken'); // If you use refresh tokens
    window.location.href = '/'; // Redirect to home page
  };

  return (
    <div className='navbar'>
      <div className='logo'>
        <img src  = {logo} alt = "Logo"/>
      </div>    
      <div className='nav-links'>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;


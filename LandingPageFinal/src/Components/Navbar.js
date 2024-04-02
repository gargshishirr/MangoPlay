import React, { useState, useEffect } from "react";
import Logo from "../Assets/mangoplayer.png";
import { useNavigate } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import Popup from "./Popup"; 
import SignupModal from "./SignupModal";

import { Form, Button } from "react-bootstrap";


const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [user, setUser] = useState(null);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    fullName: "",
    age: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  useEffect(() => {
    const userData = localStorage.getItem('userMP');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const [formDataL, setFormDataL] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleChangeL = (e) => {
    setFormDataL({ ...formDataL, [e.target.id]: e.target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:7000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataL),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log(data);

      localStorage.setItem("userMP", JSON.stringify(data.data.user));
      localStorage.setItem("accessTokenMP", data.data.accessToken);
      localStorage.setItem("refreshTokenMP", data.data.refreshToken);

      setFormDataL({
        userName: "",
        password: "",
      });
      setShowPopup(false);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };



  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:7000/api/v1/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log(data);

      setFormData({
        userName: "",
        email: "",
        fullName: "",
        age: "",
        gender: "",
        dateOfBirth: "",
        address: "",
        password: "",
      });

      setShowPopup(false); 
      window.location.reload();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };



  const togglePopup = () => {
    setShowPopup(!showPopup);
  };



  const handleOpenSignup = () => {
    setShowSignupModal(!showPopup); 
    setShowSignupModal(!showSignupModal);
  };



  return (
    <nav>
      <div className="nav-logo-container">
        <img src={Logo} alt="" width="200" />
      </div>
      <div className="navbar-links-container">
        <button className="demo-button" href="#">
          Demo
        </button>
        {user ? (
          <Button className="primary-button" onClick={handleProfileClick}>
            Profile
          </Button>
        ) : (
          <Button className="primary-button" onClick={togglePopup}>
            Login/SignUp
          </Button>
        )}
      </div>

      
      {showPopup && (
        <Popup onClose={togglePopup}>
          <h2>Login/Signup</h2> 
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="userName">
              <Form.Label>Username or Email Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username or email"
                value={formDataL.userName}
                onChange={handleChangeL}
                required
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={formDataL.password}
                onChange={handleChangeL}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Login
            </Button>
            <Button variant="primary" onClick={handleOpenSignup}>
              Signup
            </Button>
          </Form>
        </Popup>
      )}
      {showSignupModal && (
        <Popup onClose={handleOpenSignup}>
          <h2>Login/Signup</h2> 
          <Form onSubmit={handleSignup}>
            <Form.Group controlId="userName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={formData.userName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="age">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                value={formData.gender}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="dateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Signup
            </Button>
          </Form>
        </Popup>
      )}

      {(showPopup || showSignupModal) && <div className="overlay"></div>}
    </nav>
  );
};

export default Navbar;


import React, { useState } from "react";
import Logo from "../Assets/mangoplayer.png";
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
import Popup from "./Popup"; // Assuming you have a Popup component

// Import Bootstrap components
import { Form, Button } from "react-bootstrap";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
  const handleLogin = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log("Login form submitted!"); // Replace with actual login logic
  };
  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
    },
    {
      text: "About",
      icon: <InfoIcon />,
    },
    {
      text: "Testimonials",
      icon: <CommentRoundedIcon />,
    },
    {
      text: "Contact",
      icon: <PhoneRoundedIcon />,
    },
    {
      text: "Cart",
      icon: <ShoppingCartRoundedIcon />,
    },
  ];

  const togglePopup = () => {
    setShowPopup(!showPopup); // Toggle popup visibility
  };

  return (
    <nav>
      <div className="nav-logo-container">
        <img src={Logo} alt="" width="200" />
      </div>
      <div className="navbar-links-container">
        <a href="">Demo</a>
        <button className="primary-button" onClick={togglePopup}>
          Login/SignUp
        </button>
      </div>
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        anchor="right"
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>

      {/* Render the Popup component only if showPopup is true */}
      {showPopup && (
        <Popup onClose={togglePopup}>
        <h2>Login</h2> {/* Clearer title for the popup */}
      
        <Form onSubmit={handleLogin}> {/* Add a form for user input */}
          <Form.Group controlId="username">
            <Form.Label>Username or Email Address</Form.Label>
            <Form.Control type="text" placeholder="Enter username or email" required />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" required />
          </Form.Group>
      
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      
        <div className="popup-footer"> {/* Add optional footer content */}
          <a href="#">Forgot Password?</a>
        </div>
      </Popup>
      )}

      {/* Apply CSS to blur the background when the Popup is open */}
      {showPopup && <div className="overlay"></div>}
    </nav>
  );
};

export default Navbar;
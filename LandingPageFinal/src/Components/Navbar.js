
// import React, { useState } from "react";
// import Logo from "../Assets/mangoplayer.png";
// import { BsCart2 } from "react-icons/bs";
// import { HiOutlineBars3 } from "react-icons/hi2";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import HomeIcon from "@mui/icons-material/Home";
// import InfoIcon from "@mui/icons-material/Info";
// import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
// import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
// import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
// import Popup from "./Popup"; // Assuming you have a Popup component
// import SignupModal from './SignupModal';

// // Import Bootstrap components
// import { Form, Button } from "react-bootstrap";

// const Navbar = () => {
//   const [openMenu, setOpenMenu] = useState(false);
//   const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
//   const handleLogin = (event) => {
//     event.preventDefault(); // Prevent default form submission behavior
//     console.log("Login form submitted!"); // Replace with actual login logic
//   };
//   const togglePopup = () => {
//     setShowPopup(!showPopup); // Toggle popup visibility
//   };

//   return (
//     <nav>
//       <div className="nav-logo-container">
//         <img src={Logo} alt="" width="200" />
//       </div>
//       <div className="navbar-links-container">
//         <button className="demo-button" href="#">Demo</button>
//         <button className="primary-button" onClick={togglePopup}>
//           Login/SignUp
//         </button>
        
//       </div>
      
//       {/* Render the Popup component only if showPopup is true */}
//       {showPopup && (
//         <Popup onClose={togglePopup}>
//         <h2>Login</h2> {/* Clearer title for the popup */}
      
//         <Form onSubmit={handleLogin}> {/* Add a form for user input */}
//           <Form.Group controlId="username">
//             <Form.Label>Username or Email Address</Form.Label>
//             <Form.Control type="text" placeholder="Enter username or email" required />
//           </Form.Group>
//           <Form.Group controlId="password">
//             <Form.Label>Password</Form.Label>
//             <Form.Control type="password" placeholder="Enter password" required />
//           </Form.Group>
      
//           <Button variant="primary" type="submit">
//             Login
//           </Button>
//           <Button variant="primary" type="submit">
//             SignUp
//           </Button>
//         </Form>
      
//         <div className="popup-footer"> {/* Add optional footer content */}
//           <a href="#">Forgot Password?</a>
//         </div>
//       </Popup>
//       )}

//       {/* Apply CSS to blur the background when the Popup is open */}
//       {showPopup && <div className="overlay"></div>}
//     </nav>
//   );
// };

// export default Navbar;

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
import SignupModal from './SignupModal'; // Assuming you have a SignupModal component

// Import Bootstrap components
import { Form, Button } from "react-bootstrap";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State for login/signup popup
  const [showSignupModal, setShowSignupModal] = useState(false); // State for signup modal

  const handleLogin = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log("Login form submitted!"); // Replace with actual login logic
  };
  const handleSignup = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log("Signup form submitted!"); // Replace with actual signup logic
  };
  const togglePopup = () => {
    setShowPopup(!showPopup); // Toggle popup visibility
  };
  
  const handleOpenSignup = () => {
    setShowSignupModal(!showPopup); // Close login/signup popup
    setShowSignupModal(!showSignupModal); // Open signup modal
  };

  return (
    <nav>
      <div className="nav-logo-container">
        <img src={Logo} alt="" width="200" />
      </div>
      <div className="navbar-links-container">
        <button className="demo-button" href="#">Demo</button>
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
            {/* ... menu options */}
          </List>
          <Divider />
        </Box>
      </Drawer>

      {/* Render Login/Signup Popup conditionally */}
      {showPopup && (
        <Popup onClose={togglePopup}>
          <h2>Login/Signup</h2> {/* Clearer title */}
          <Form.Group controlId="username">
             <Form.Label>Username or Email Address</Form.Label>
             <Form.Control type="text" placeholder="Enter username or email" required />
           </Form.Group>
           
           <Form.Group controlId="password">
             <Form.Label>Password</Form.Label>
             <Form.Control type="password" placeholder="Enter password" required />
           </Form.Group>
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>
          <Button variant="primary" onClick={handleOpenSignup}>
            Signup
          </Button>
        </Popup>
      )}
      {showSignupModal && (
        <Popup onClose={handleOpenSignup}>
          <h2>Login/Signup</h2> {/* Clearer title */}
          <Form.Group controlId="username">
             <Form.Label>Username</Form.Label>
             <Form.Control type="text" placeholder="Enter username" required />
           </Form.Group>
           <Form.Group controlId="email">
             <Form.Label>Email Address</Form.Label>
             <Form.Control type="text" placeholder="Enter email" required />
           </Form.Group>
           <Form.Group controlId="name">
             <Form.Label>Full Name</Form.Label>
             <Form.Control type="text" placeholder="Enter Full Name" required />
           </Form.Group>
           <Form.Group controlId="Age">
             <Form.Label>Age</Form.Label>
             <Form.Control type="text" placeholder="Enter Age" required />
           </Form.Group>
           <Form.Group controlId="gender">
             <Form.Label>Gender</Form.Label>
             <Form.Control type="password" placeholder="Enter Gender" required />
           </Form.Group>
           <Form.Group controlId="dateofbirth">
             <Form.Label>Date of birth</Form.Label>
             <Form.Control type="text" placeholder="Enter date of birth" required />
           </Form.Group>
           <Form.Group controlId="address">
             <Form.Label>Address</Form.Label>
             <Form.Control type="text" placeholder="Enter address" required />
           </Form.Group>
           <Form.Group controlId="password">
             <Form.Label>Password</Form.Label>
             <Form.Control type="password" placeholder="Enter password" required />
           </Form.Group>
          
          <Button variant="primary" onClick={handleOpenSignup}>
            Signup
          </Button>
        </Popup>
      )}

      {/* Render Signup Modal conditionally
      {showSignupModal && (
        <SignupModal onClose={() => setShowSignupModal(false)} />
      )} */}

      {/* Apply CSS to blur the background when a modal is open */}
      {(showPopup || showSignupModal) && <div className="overlay"></div>}
    </nav>
  );
};

export default Navbar;

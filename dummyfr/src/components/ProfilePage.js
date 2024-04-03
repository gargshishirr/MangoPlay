import React, {useState} from 'react';
import UserAvatar from './UserAvatar'; 
import myprof from "../assets/myprof.png"
import BalanceContainer from './BalanceContainer';
import phone from "../assets/phone.png"
import mail from "../assets/mail.png"
import UpdateForm from './UpdateForm';

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);  // State for edit mode
  const [showUserDetails, setShowUserDetails] = useState(true);
  // Assuming you have user data
  const userData = {
    name: 'John',
    surname: 'Doe',
    city: 'New York',
    gender: 'Male',
    birthdate: '1990-01-01',
    panCard: 'ABCD12345',
  };
  
  const handleEditClick = () => {
    setIsEditing(!isEditing);  // Toggle edit mode
    setShowUserDetails(false); // Hide user details when editing
  };

  const handleCancel = () => {
    setIsEditing(false);       // Exit edit mode
    setShowUserDetails(true);  // Show user details again
  };

  const handleSave = () => {
    setIsEditing(false);       // Exit edit mode
    setShowUserDetails(true);  // Show user details again
    // Implement save logic here if needed
  };
  return (
    <div className="profile-page">
      <img src={myprof} alt="Banner Image" className="banner-image" />
      <UserAvatar />
      <span className="username">@rishi22</span>
      <div className="contact-info">
        <div className='hello-text'>Hello Rishi!</div>
        <div className="contact-item">
          <div className="contact-group">  
            <img src={phone} alt="Phone Icon" className="contact-icon" />
            <div className="contact-details">
              <span className="contact-label">Phone Number</span>
              <span className="contact-data">+91 9897654320</span>  
            </div>
          </div>
        </div>
        <div className="contact-item">
          <div className="contact-group">  
            <img src={mail} alt="Mail Icon" className="contact-icon" />
            <div className="contact-details">
              <span className="contact-label">Email id</span>
              <span className="contact-data">example@example.com</span>  
            </div>
          </div>
        </div>
      </div>
      <div>
      <BalanceContainer
        title="Available Balance"
        amount="0.00" 
        currency="INR"
      />
      </div>
      {showUserDetails && (
        <div className="user-details">
        <h3>User Details</h3>
        <div className="user-details-row">
          <div className="user-details-column">
            <div className="user-details-label">
              <strong>Name:</strong>
            </div>
            <div className="user-details-value">
              <p>John</p>
            </div>
          </div>
          <div className="user-details-column">
            <div className="user-details-label">
              <strong>Surname:</strong>
            </div>
            <div className="user-details-value">
              <p>Doe</p>
            </div>
          </div>
        </div>
        <div className="user-details-row">
          <div className="user-details-column">
            <div className="user-details-label">
              <strong>City:</strong>
            </div>
            <div className="user-details-value">
              <p>New York</p>
            </div>
          </div>
          <div className="user-details-column">
            <div className="user-details-label">
              <strong>Gender:</strong>
            </div>
            <div className="user-details-value">
              <p>Male</p>
            </div>
          </div>
        </div>
        <div className="user-details-row">
          <div className="user-details-column">
            <div className="user-details-label">
              <strong>Date of Birth:</strong>
            </div>
            <div className="user-details-value">
              <p>1990-01-01</p>
            </div>
          </div>
          <div className="user-details-column">
            <div className="user-details-label">
              <strong>PAN Card:</strong>
            </div>
            <div className="user-details-value">
              <p>ABCDE12345</p>
            </div>
          </div>
        </div>
      </div>
      
      
      )}
      <div className="info-and-form">
        {isEditing ? (
          <UpdateForm userData={userData} onCancel={handleCancel} onSave={handleSave} />
        ) : (
          <button className="edit-button" onClick={handleEditClick}>
           <h2> Edit Profile</h2>
          </button>
        )}
      </div>
    </div>

  );
}

export default ProfilePage;


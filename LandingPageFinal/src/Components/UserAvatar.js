import React from 'react';
import avatar from "../Assets/avatar.png"
function UserAvatar()  {
  return (
    <div className="user-profile-image">
      <img src={avatar} alt="User Profile" className="user-avatar" />
    </div>
  );
}

export default UserAvatar

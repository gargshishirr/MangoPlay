import React from 'react';

const RoomList = ({ rooms, onJoinRoom }) => {
  return (
    <div className="room-list">
      <h2>Join a Room</h2>
      <ul>
        {rooms.map((room, index) => (
          <li key={index}>
            <span>{room.name}</span>
            <button onClick={() => onJoinRoom(room.id)}>Join</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoomList;

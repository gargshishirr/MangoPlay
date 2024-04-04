import React from "react";

const RoomList = ({ rooms, onJoinRoom }) => {
  return (
    <div className="room-list">
      <h2>Join a Room</h2>
      <ul>
        {rooms.map((room) => (
          <div key={room._id}>
            <span>{room.name}</span>
            <button onClick={() => onJoinRoom(room._id)}>Join</button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;

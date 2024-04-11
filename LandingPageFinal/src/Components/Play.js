import "../App.css";
import Banner from "./Banner";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import CreateRoom from "./CreateRoom";
import Navbar from "./Navbar";
import RoomList from "./RoomList";
import ProfilePage from "./Profile";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const socket = io("http://localhost:7000");

// const socket = io("https://mangoplay.onrender.com");

const Play = () => {
  const [rooms, setRooms] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [roomStatus, setRoomStatus] = useState("");
  const [tossChoice, setTossChoice] = useState("");
  const [tossResult, setTossResult] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [playersList, setPlayersList] = useState([]);
  const [pickedPlayersUser1, setPickedPlayersUser1] = useState([]);
  const [pickedPlayersUser2, setPickedPlayersUser2] = useState([]);
  const [allPlayersPicked, setAllPlayersPicked] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("userMP")));

  useEffect(() => {
    fetchOpenRooms();

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socket.on("roomJoined1", ({ roomId, userName }) => {
      console.log(`Joined room ${roomId}, ${userName}`);
      setRoomId(roomId);
    });

    socket.on("roomNotFound", ({ roomId }) => {
      console.log(`Room not found ${roomId}`);
    });

    socket.on("roomNotOpen", ({ roomId }) => {
      console.log(`Room not open ${roomId}`);
    });

    socket.on("roomJoined2", ({ roomId, userName }) => {
      console.log(`Joined room ${roomId}, ${userName}`);
      setRoomId(roomId);
    });

    socket.on("errorMessage", (message) => {
      console.log(`Error: ${message}`);
      setErrorMessage(message);
    });
  
    socket.on("tossResult", ({ result, winner }) => {
      console.log(`Toss result: ${result}, winner: ${winner}`);
      setTossResult({ result, winner });
    });

    
    return () => {
      socket.off("roomJoined1");
      socket.off("roomNotFound");
      socket.off("roomNotOpen");
      socket.off("roomJoined2");
      socket.off("errorMessage");
      socket.off("tossResult");
    };
  }, [pickedPlayersUser1, pickedPlayersUser2]);

  const handleCreateRoom = () => {
    console.log("Creating room and joining as user1...");
    //console.log(user);
    const userData = {
      userId: user._id,
      userName: user.userName,
    };
    socket.emit("createRoom", userData);
    toast.success("Room Created");
  };

  const handleJoinRoom = (roomId) => {
    console.log("Joining room...");
    const data = {
      userId: user._id,
      userName: user.userName,
      roomId: roomId,
    };
    console.log(data);
    socket.emit("joinRoom", data);
    toast.success("Room Joined");
  };

  const handleToss = () => {
    const choice = prompt("Enter 'head' or 'tail' for the toss:");
    if (choice && (choice === "head" || choice === "tail")) {
      setTossChoice(choice);
      console.log("Toss initiated...");
      const data = {
        roomId: roomId,
        tossChoice: choice,
        userId: user._id,
      };
      console.log(data);
      socket.emit("conductToss", data);
    } else {
      console.error("Invalid choice for toss:", choice);
    }
  };

  const handlePickPlayer = (player) => {
    socket.emit("pickPlayer", roomId, player);
  };

  const fetchOpenRooms = async () => {
    try {
      const response = await fetch(
        "https://mangoplay.onrender.com/api/v1/rooms/openRooms"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch open rooms");
      }
      const openRooms = await response.json();
      setRooms(openRooms);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="App">
      <Navbar />
      <Banner /> {/* Banner on root path */}
      <div className="play-area">
        <CreateRoom onClick={handleCreateRoom} />
        <RoomList rooms={rooms} onJoinRoom={handleJoinRoom} />
      </div>
      {/* <button onClick={handleJoinRoom}>Create Room</button> */}
      {roomStatus && <div>{roomStatus}</div>}
      <button onClick={handleToss}>Toss</button>
      {tossResult && (
        <div>
          <p>Toss result: {tossResult.result}</p>
          <p>Winner: {tossResult.winner}</p>
        </div>
      )}
      {errorMessage && <div>Error: {errorMessage}</div>}
      <div>
        <h3>Players List:</h3>
        <ul>
          {playersList.map((player, index) => (
            <li key={index}>
              {player}
              <button onClick={() => handlePickPlayer(player)}>Pick</button>
            </li>
          ))}
        </ul>
      </div>
      {allPlayersPicked && <div>All players picked!</div>}
      {pickedPlayersUser1.length > 0 && (
        <div>
          <h3>Players Picked by User 1:</h3>
          <ul>
            {pickedPlayersUser1.map((player, index) => (
              <li key={index}>{player}</li>
            ))}
          </ul>
        </div>
      )}
      {pickedPlayersUser2.length > 0 && (
        <div>
          <h3>Players Picked by User 2:</h3>
          <ul>
            {pickedPlayersUser2.map((player, index) => (
              <li key={index}>{player}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Play;

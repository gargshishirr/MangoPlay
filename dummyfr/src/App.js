import "./App.css";
import { BrowserRouter as Router, Route, Switch, Routes } from "react-router-dom";
import Banner from "./components/Banner";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import CreateRoom from "./components/CreateRoom";
import Navbar from "./components/Navbar";
import RoomList from "./components/RoomList";
import ProfilePage from "./components/ProfilePage";
const socket = io("http://localhost:7000");

function App() {

  const [roomId, setRoomId] = useState("");
  const [roomStatus, setRoomStatus] = useState("");
  const [userId, setUserId] = useState("");
  const [tossChoice, setTossChoice] = useState("");
  const [tossResult, setTossResult] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [playersList, setPlayersList] = useState([]);
  const [pickedPlayersUser1, setPickedPlayersUser1] = useState([]);
  const [pickedPlayersUser2, setPickedPlayersUser2] = useState([]);
  const [allPlayersPicked, setAllPlayersPicked] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socket.on("roomJoined", ({ roomId, user }) => {
      console.log(`Joined room ${roomId} as ${user}`);
      setRoomStatus(`Joined room ${roomId} as ${user}`);
      setUserId(user);
    });

    socket.on("roomFull", (roomId) => {
      console.log(`Room ${roomId} is full`);
      setRoomStatus(`Room ${roomId} is full`);
    });

    socket.on("tossResult", ({ result, winner }) => {
      console.log(`Toss result: ${result}, Winner: ${winner}`);
      setTossResult(`Toss result: ${result}, Winner: ${winner}`);
      localStorage.setItem("tossResult", JSON.stringify({ result, winner }));

      const dummyPlayers = [
        "Player1",
        "Player2",
        "Player3",
        "Player4",
        "Player5",
        "Player6",
        "Player7",
      ];
      setPlayersList(dummyPlayers);
    });

    socket.on("errorMessage", (message) => {
      console.error("Error message:", message);
      setErrorMessage(message);
    });

    socket.on("playerPicked", ({ user, player }) => {
      console.log(`Player ${player} picked by ${user}`);
      setPlayersList((prevPlayers) => prevPlayers.filter((p) => p !== player));

      if (user === "user1") {
        setPickedPlayersUser1((prevPlayers) => [...prevPlayers, player]);
        localStorage.setItem(
          "pickedPlayersUser1",
          JSON.stringify([...pickedPlayersUser1, player])
        );
      } else {
        setPickedPlayersUser2((prevPlayers) => [...prevPlayers, player]);
        localStorage.setItem(
          "pickedPlayersUser2",
          JSON.stringify([...pickedPlayersUser2, player])
        );
      }
    });

    socket.on("allPlayersPicked", () => {
      console.log("All players picked");
      setAllPlayersPicked(true);
    });

    return () => {
      socket.off("roomJoined");
      socket.off("roomFull");
      socket.off("tossResult");
      socket.off("errorMessage");
      socket.off("playerPicked");
      socket.off("allPlayersPicked");
    };
  }, [pickedPlayersUser1, pickedPlayersUser2]);

  const handleJoinRoom = () => {
    console.log("Joining room:", roomId);
    socket.emit("joinRoom", roomId);
  };
  const handleCreateRoom = () => {
    // Handle creating a room
    console.log("Creating a room");
    // Implement logic to create a room
  };

  const handleToss = () => {
    const choice = prompt("Enter 'head' or 'tail' for the toss:");
    if (choice && (choice === "head" || choice === "tail")) {
      setTossChoice(choice);
      socket.emit("conductToss", roomId, choice);
    } else {
      console.error("Invalid choice for toss:", choice);
    }
  };

  const handlePickPlayer = (player) => {
    socket.emit("pickPlayer", roomId, player);
    
  };
  const rooms = [
    { id: 1, name: "Room 1" },
    { id: 2, name: "Room 2" },
    { id: 3, name: "Room 3" }
  ];

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Home page (everything except profile) */}
          <Route path="/" element={
            <>
              <Banner /> {/* Banner on root path */}
              <div className="play-area">
                <CreateRoom onClick={handleCreateRoom} />
                <RoomList rooms={rooms} onJoinRoom={handleJoinRoom} />
              </div>
            </>
          } />
          {/* Profile page (only navbar and profile content) */}
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        {/* <button onClick={handleJoinRoom}>Create Room</button> */}
        {roomStatus && <div>{roomStatus}</div>}
      
      
        <button onClick={handleToss}>Toss</button>
        {tossResult && <div>{tossResult}</div>}
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
    </Router>
  );
}

export default App;
import "../App.css";
import Banner from "./Banner";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import CreateRoom from "./CreateRoom";
import Navbar from "./Navbar";
import RoomList from "./RoomList";
import ProfilePage from "./Profile";

const socket = io("http://localhost:7000");

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

    // socket.on("roomJoined", ({ roomId, user }) => {
    //   console.log(`Joined room ${roomId} as ${user}`);
    //   setRoomStatus(`Joined room ${roomId} as ${user}`);
    // });

    // socket.on("roomFull", (roomId) => {
    //   console.log(`Room ${roomId} is full`);
    //   setRoomStatus(`Room ${roomId} is full`);
    // });

    // socket.on("tossResult", ({ result, winner }) => {
    //   console.log(`Toss result: ${result}, Winner: ${winner}`);
    //   setTossResult(`Toss result: ${result}, Winner: ${winner}`);
    //   localStorage.setItem("tossResult", JSON.stringify({ result, winner }));

    //   const dummyPlayers = [
    //     "Player1",
    //     "Player2",
    //     "Player3",
    //     "Player4",
    //     "Player5",
    //     "Player6",
    //     "Player7",
    //   ];
    //   setPlayersList(dummyPlayers);
    // });

    // socket.on("errorMessage", (message) => {
    //   console.error("Error message:", message);
    //   setErrorMessage(message);
    // });

    // socket.on("playerPicked", ({ user, player }) => {
    //   console.log(`Player ${player} picked by ${user}`);
    //   setPlayersList((prevPlayers) => prevPlayers.filter((p) => p !== player));

    //   if (user === "user1") {
    //     setPickedPlayersUser1((prevPlayers) => [...prevPlayers, player]);
    //     localStorage.setItem(
    //       "pickedPlayersUser1",
    //       JSON.stringify([...pickedPlayersUser1, player])
    //     );
    //   } else {
    //     setPickedPlayersUser2((prevPlayers) => [...prevPlayers, player]);
    //     localStorage.setItem(
    //       "pickedPlayersUser2",
    //       JSON.stringify([...pickedPlayersUser2, player])
    //     );
    //   }
    // });

    // socket.on("allPlayersPicked", () => {
    //   console.log("All players picked");
    //   setAllPlayersPicked(true);
    // });

    return () => {
      socket.off("roomJoined1");
      // socket.off("roomFull");
      // socket.off("tossResult");
      // socket.off("errorMessage");
      // socket.off("playerPicked");
      // socket.off("allPlayersPicked");
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
    //console.log("end");
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


  const fetchOpenRooms = async () => {
    try {
      const response = await fetch("http://localhost:7000/api/v1/rooms/openRooms");
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
  );
};

export default Play;

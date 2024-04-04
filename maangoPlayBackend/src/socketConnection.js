import { Server } from "socket.io";
import http from "http";
import { Room } from "./models/room.model.js";

const initializeSocketConnection = (app) => {
  const server = http.createServer(app);
  const io = new Server(server, {
    pingTimeout: 70000,
    cors: {
      origin: process.env.CORS_ORIGIN,
    },
  });

  // Socket.IO connection handler
  io.on("connection", (socket) => {
    console.log("New user connected");
    console.log("socket.id");

    socket.on("createRoom", async (userData) => {
      console.log(socket.id);
      console.log("userData");
      console.log(userData);
    });

    // Room joining
    // socket.on("createRoom", async (userId, userName) => {
    //   try {
    //     console.log("userData");
    //     //const { _id: userId, userName } = userData;
    //     console.log("userData");
    //     const room = new Room({
    //       user1: { userId: userId, name: userName },
    //       status: "open",
    //     });

    //     await room.save();
    //     const roomId = room._id;

    //     socket.join(roomId);
    //     console.log(`Room created and user1 joined: ${roomId}`);
    //     io.to(socket.id).emit("roomJoined1", { roomId, user: userName });

    //   } catch (err) {
    //     console.error("Error joining room:", err);
    //   }
    // });

    

    // Join Room
    // socket.on("joinRoom", async (userData, roomId) => {
    //   try {
    //     const { userId, userName } = userData;

    //     // Check if the room exists
    //     const existingRoom = await Room.findById(roomId);
    //     if (!existingRoom) {
    //       io.to(socket.id).emit("roomNotFound", roomId);
    //       return;
    //     }

    //     // Check if the room status is open
    //     if (existingRoom.status !== "open") {
    //       io.to(socket.id).emit("roomNotOpen", roomId);
    //       return;
    //     }

    //     // Update the room 
    //     existingRoom.user2 = { userId, name: userName };
    //     existingRoom.status = "full";
    //     await existingRoom.save();

    //     socket.join(roomId);
    //     console.log(`User2 joined room: ${roomId}`);
    //     io.to(socket.id).emit("roomJoined2", { roomId, user: "user2" });
    //   } catch (err) {
    //     console.error("Error joining room as user2:", err);
    //   }
    // });

    
    // // Toss functionality
    // socket.on("conductToss", async (roomId, tossChoice) => {
    //   try {
    //     const room = await Room.findById(roomId);
    //     if (!room) {
    //       io.to(socket.id).emit("errorMessage", "Room not found");
    //       return;
    //     }

    //     const tossResult = Math.random() < 0.5 ? "head" : "tail";
    //     const winner = tossResult === tossChoice ? "user1" : "user2";

    //     room.tossResult = winner;
    //     await room.save();

    //     io.to(roomId).emit("tossResult", { result: tossResult, winner });
    //   } catch (err) {
    //     console.error("Error conducting toss:", err);
    //     io.to(socket.id).emit("errorMessage", "Error conducting toss");
    //   }
    // });

    // // Pick player functionality
    // socket.on("pickPlayer", async (roomId, player) => {
    //   try {
    //     const dummyPlayers = [
    //       "Player1",
    //       "Player2",
    //       "Player3",
    //       "Player4",
    //       "Player5",
    //       "Player6",
    //       "Player7",
    //     ];

    //     const room = await Room.findById(roomId);
    //     if (!room) {
    //       io.to(socket.id).emit("errorMessage", "Room not found");
    //       return;
    //     }

    //     const userId = room.user1 === socket.id ? "user1" : "user2";

    //     // Ensure the pickedPlayersUser1 and pickedPlayersUser2 arrays exist
    //     if (!room.pickedPlayersUser1) {
    //       room.pickedPlayersUser1 = [];
    //     }
    //     if (!room.pickedPlayersUser2) {
    //       room.pickedPlayersUser2 = [];
    //     }

    //     // Check if the player is already picked
    //     const isPlayerPicked =
    //       userId === "user1"
    //         ? room.pickedPlayersUser1.includes(player)
    //         : room.pickedPlayersUser2.includes(player);

    //     if (isPlayerPicked) {
    //       io.to(socket.id).emit("errorMessage", "Player already picked");
    //       return;
    //     }

    //     // Update picked player list for the user
    //     if (userId === "user1") {
    //       room.pickedPlayersUser1.push(player);
    //     } else {
    //       room.pickedPlayersUser2.push(player);
    //     }
    //     await room.save();

    //     io.to(roomId).emit("playerPicked", { user: userId, player });

    //     // Check if all players are picked
    //     if (
    //       room.pickedPlayersUser1.length + room.pickedPlayersUser2.length ===
    //       dummyPlayers.length
    //     ) {
    //       io.to(roomId).emit("allPlayersPicked");
    //     }
    //   } catch (err) {
    //     console.error("Error picking player:", err);
    //     io.to(socket.id).emit("errorMessage", "Error picking player");
    //   }
    // });

    // Handle disconnect
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  return server;
};

export default initializeSocketConnection;

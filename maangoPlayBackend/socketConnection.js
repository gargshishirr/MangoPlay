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

    // Room creation and joining
  socket.on("joinRoom", async (roomId) => {
    try {
      const existingRoom = await Room.findById(roomId);
      if (!existingRoom) {
        const room = new Room({ _id: roomId, user1: socket.id });
        await room.save();
        socket.join(roomId);
        console.log(`Room created and user1 joined: ${roomId}`);
        io.to(socket.id).emit("roomJoined", { roomId, user: "user1" });
      } else if (!existingRoom.user2) {
        existingRoom.user2 = socket.id;
        await existingRoom.save();
        socket.join(roomId);
        console.log(`User2 joined room: ${roomId}`);
        io.to(socket.id).emit("roomJoined", { roomId, user: "user2" });
      } else {
        io.to(socket.id).emit("roomFull", roomId);
      }
    } catch (err) {
      console.error("Error joining room:", err);
    }
  });

  // Toss functionality
  socket.on("conductToss", async (roomId, tossChoice) => {
    try {
      const room = await Room.findById(roomId);
      if (!room) {
        io.to(socket.id).emit("errorMessage", "Room not found");
        return;
      }

      const tossResult = Math.random() < 0.5 ? "head" : "tail";
      const winner = tossResult === tossChoice ? "user1" : "user2";

      room.tossResult = winner;
      await room.save();

      io.to(roomId).emit("tossResult", { result: tossResult, winner });
    } catch (err) {
      console.error("Error conducting toss:", err);
      io.to(socket.id).emit("errorMessage", "Error conducting toss");
    }
  });

      
    // Pick player functionality
  socket.on("pickPlayer", async (roomId, player) => {
      try {
        
          const dummyPlayers = ["Player1", "Player2", "Player3", "Player4", "Player5", "Player6", "Player7"]; 
          

      const room = await Room.findById(roomId);
      if (!room) {
        io.to(socket.id).emit("errorMessage", "Room not found");
        return;
      }

      const userId = room.user1 === socket.id ? "user1" : "user2";

      // Ensure the pickedPlayersUser1 and pickedPlayersUser2 arrays exist
      if (!room.pickedPlayersUser1) {
        room.pickedPlayersUser1 = [];
      }
      if (!room.pickedPlayersUser2) {
        room.pickedPlayersUser2 = [];
      }

      // Check if the player is already picked
      const isPlayerPicked =
        userId === "user1"
          ? room.pickedPlayersUser1.includes(player)
          : room.pickedPlayersUser2.includes(player);

      if (isPlayerPicked) {
        io.to(socket.id).emit("errorMessage", "Player already picked");
        return;
      }

      // Update picked player list for the user
      if (userId === "user1") {
        room.pickedPlayersUser1.push(player);
      } else {
        room.pickedPlayersUser2.push(player);
      }
      await room.save();

      io.to(roomId).emit("playerPicked", { user: userId, player });

      // Check if all players are picked
      if (
        room.pickedPlayersUser1.length + room.pickedPlayersUser2.length ===
        dummyPlayers.length
      ) {
        io.to(roomId).emit("allPlayersPicked");
      }
    } catch (err) {
      console.error("Error picking player:", err);
      io.to(socket.id).emit("errorMessage", "Error picking player");
    }
  });

    // Handle disconnect
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  return server;
};

export default initializeSocketConnection;
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Room } from "../models/room.model.js";


const getOpenRooms = async (req, res) => {
  try {
    const openRooms = await Room.find({ status: 'open' });
    res.status(200).json(openRooms);
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while fetching open rooms"
    );
  }
};

const handleToss = async (req, res) => {
  const { roomId, tossChoice, userId } = req.body;
  
  try {
    const room = await Room.findById(roomId);
    if (!room) {
      throw new ApiError(404, "Room not found");
    }

    if (room.user1.userId.toString() !== userId) {
      throw new ApiError(403, "Only user1 can conduct the toss");
    }

    // Perform the toss
    const tossResult = Math.random() < 0.5 ? "head" : "tail";
    const winner = tossResult === tossChoice ? "user1" : "user2";

    // Update toss winner in the backend
    room.tossResult = winner;
    await room.save();

    console.log(`Toss conducted in room ${roomId}: ${winner} wins`);

    // Send the toss result to the frontend
    res.status(200).json({ result: tossResult, winner });
  } catch (error) {
    console.error("Error conducting toss:", error);
    res.status(500).json({ message: "Error conducting toss" });
  }
}


export { getOpenRooms, handleToss };

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


export { getOpenRooms };

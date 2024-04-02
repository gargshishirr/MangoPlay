import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema({
  _id: String,
  user1: String,
  user2: String,
  tossResult: String,
  pickedPlayersUser1: [String],
  pickedPlayersUser2: [String],
  teams: String,
});

export const Room = mongoose.model("Room", roomSchema);

import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema({
  user1: {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    name: String
  },
  user2: {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    name: String
  },
  tossResult: String,
  pickedPlayersUser1: [String],
  pickedPlayersUser2: [String],
  status: {
    type: String,
    enum: ['open', 'full', 'archived'],
    default: 'open'
  },
  team: String,
});

export const Room = mongoose.model("Room", roomSchema);

import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  //console.log(process.env.MONGODB_URI);
  try {
    const connectionInstance = await mongoose.connect(
      `mongodb+srv://mangoPlay:mangoPlay@cluster0.o3y0dz5.mongodb.net/MangoPlay`,
      {
        dbName: DB_NAME,
      }
    );
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection failed ", error);
    process.exit(1);
  }
};

export default connectDB;

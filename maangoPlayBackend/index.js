// require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import initializeSocketConnection from "./socketConnection.js";

dotenv.config({
  path: "/.env",
});

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERRR: ", error);
    });
    const server = initializeSocketConnection(app);
    server.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });

  })
  .catch((err) => {
    console.log("MONGO db connection falied!", err);
  });
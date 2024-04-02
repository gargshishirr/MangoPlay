import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: __dirname + "/.env" });

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
app.use(cors());


const userRoute = require("./routes/userRoute");


const connectDB = require("./config/dbconnection");
connectDB();

const port = process.env.PORT || 7000;

app.use(express.json());


app.use(notFound);
app.use(errorHandler);


const server = app.listen(port, console.log(`Server running on port ${port}`));





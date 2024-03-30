const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
dotenv.config({ path: __dirname + "/.env" });

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
app.use(cors());

const connectDB = require("./config/dbconnection");
connectDB();

const port = process.env.PORT || 7070;

app.use(express.json());


app.use(notFound);
app.use(errorHandler);


const server = app.listen(port, console.log(`Server running on port ${port}`));





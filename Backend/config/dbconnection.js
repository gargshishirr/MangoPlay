const mongoose = require('mongoose');
require('dotenv').config();


const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@`
        );

        console.log("Connected to MongoDB");
    } catch (e) {
        console.log(`Error: ${e.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;
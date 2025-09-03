const mongoose = require("mongoose");

const mongoURI = "mongodb://127.0.0.1:27017/iNotebook"; // Make sure you have a database name

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("✅ Connected to MongoDB successfully!");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error);
        process.exit(1); // Stop the server if connection fails
    }
};

module.exports = connectToMongo;

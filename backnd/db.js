const mongoose = require("mongoose");

const mongoURL = "mongodb://localhost:27017/edtech";

const connectToMongo = () => {
  mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("connected", () => {
    console.log("✅ Connected to MongoDB successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.error("❌ Error connecting to MongoDB:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("⚠️ Disconnected from MongoDB");
  });
};

module.exports = connectToMongo;

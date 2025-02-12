require("dotenv").config();
process.env.JWT_SECRET = "12345qwert"; // Replace with a strong secret key

const express = require("express");
const cors = require("cors");
const connectToMongo = require("./db"); // Import DB connection

const authRoutes = require("./routes/auth");
const applicationRoutes = require("./routes/application");
const scholarshipRoutes = require("./routes/scholarship");

const app = express();

// Connect to MongoDB
connectToMongo();

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/scholarships", scholarshipRoutes);

// Default Route
app.get("/", (req, res) => res.send("🎓 EdTech API is running..."));

// Server Listening
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

const mongoose = require("mongoose");
const Application = require("./models/Application");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Connection Error:", err));

const seedApplications = async () => {
  try {
    await Application.deleteMany(); // Optional: Clears previous data

    const applications = [
      {
        scholarshipId: "SCHL-1001",
        statement: "I am passionate about AI and need this scholarship to pursue my dreams.",
        status: "pending",
        student: "67ac2a39a73eba9e8e00e885", // Aaditya Mohit's _id
      },
      {
        scholarshipId: "SCHL-1002",
        statement: "I have a strong academic background and need financial support.",
        status: "pending",
        student: "67ac2a39a73eba9e8e00e885", // Aaditya Mohit's _id
      },
    ];

    await Application.insertMany(applications);
    console.log("Dummy applications added successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding applications:", error);
    mongoose.connection.close();
  }
};

seedApplications();

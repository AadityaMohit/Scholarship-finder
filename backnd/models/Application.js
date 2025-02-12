const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  course: String,
  university: String,
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Application", ApplicationSchema);

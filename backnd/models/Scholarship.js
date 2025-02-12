const mongoose = require("mongoose");

const ScholarshipSchema = new mongoose.Schema({
  title: String,
  description: String,
  eligibility: String,
  deadline: Date,
  amount: Number,
  country: String,
});

module.exports = mongoose.model("Scholarship", ScholarshipSchema);

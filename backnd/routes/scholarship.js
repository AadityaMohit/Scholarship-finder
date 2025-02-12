const express = require("express");
const Scholarship = require("../models/Scholarship");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Get all scholarships (public access)
router.get("/", async (req, res) => {
  const scholarships = await Scholarship.find();
  res.json(scholarships);
});

// Filter scholarships by country or amount
router.get("/search", async (req, res) => {
  const { country, minAmount } = req.query;
  const query = {};
  if (country) query.country = country;
  if (minAmount) query.amount = { $gte: Number(minAmount) };

  const scholarships = await Scholarship.find(query);
  res.json(scholarships);
});

// Admin: Add a new scholarship
router.post("/", authMiddleware(["admin"]), async (req, res) => {
  try {
    const scholarship = new Scholarship(req.body);
    await scholarship.save();
    res.status(201).json({ message: "Scholarship added successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
 
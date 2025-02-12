const express = require("express");
const Application = require("../models/Application");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Student: Submit a new application
router.post("/", authMiddleware(["student"]), async (req, res) => {
  try {
    const { course, university } = req.body;
    const application = new Application({
      student: req.user.id,
      course,
      university,
    });
    await application.save();
    res.status(201).json({ message: "Application submitted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Student: Get their own applications
router.get("/", authMiddleware(["student"]), async (req, res) => {
  try {
    const applications = await Application.find({ student: req.user.id });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Agent: Approve or reject applications
router.put("/:id", authMiddleware(["agent"]), async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) return res.status(404).json({ error: "Application not found" });

    application.status = req.body.status;
    await application.save();
    res.json({ message: "Application status updated successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin: Get all applications with student details
router.get("/all", authMiddleware(["admin"]), async (req, res) => {
  try {
    const applications = await Application.find().populate("student", "name email");
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

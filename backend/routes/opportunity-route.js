import express from "express";
import Student from "../models/opportunities.js";

const router = express.Router();

// POST /students
router.post("/", async (req, res) => {
  try {
    const opportunities = new opportunities(req.body);
    await opportunities.save();
    res.status(201).json(opportunities);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /students
router.get("/", async (req, res) => {
  try {
    const opportunities = await opportunities.find();
    res.json(opportunities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
import express from "express";
import {
  registerStudent,
  loginStudent,
  getStudentProfile,
  updateStudentProfile,
  applyOpportunity
} from "../controllers/studentController.js";
import { protect, studentOnly } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/register", registerStudent);
router.post("/login", loginStudent);

// Protected routes
router.get("/profile", protect, studentOnly, getStudentProfile);
router.put("/profile", protect, studentOnly, updateStudentProfile);
router.post("/apply/:opportunityId", protect, studentOnly, applyOpportunity);

export default router;

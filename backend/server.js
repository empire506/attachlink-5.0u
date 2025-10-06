import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import companyRoutes from "./routes/company-route.js";
import studentRoutes from "./routes/student-route.js";

dotenv.config();
const app = express();

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Parse JSON bodies
app.use(express.json());

// Mount routes
app.use("/companies", companyRoutes);
app.use("/students", studentRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import companyRoutes from "./routes/company-route.js";
import studentRoutes from "./routes/student-route.js";
import opportunityRoutes from "./routes/opportunity-route.js";

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


// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api', require('./routes/api'));

// Page routes (for navigation)
app.use('/', require('./routes/pages'));

// Fallback to index.html for unknown routes (optional for SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
// middleware/auth.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Student from "../models/studentModel.js";
import Company from "../models/companyModel.js";

dotenv.config();

// Middleware to protect routes (checks for valid JWT and sets req.user)
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Identify user type and fetch user
      if (decoded.userType === "student") {
        req.user = await Student.findById(decoded.id).select("-password");
      } else if (decoded.userType === "company") {
        req.user = await Company.findById(decoded.id).select("-password");
      }

      // If no user found
      if (!req.user) {
        return res.status(401).json({ message: "User not found or unauthorized" });
      }

      // Attach user type for easy access
      req.userType = decoded.userType;

      next();
    } catch (error) {
      console.error("Token verification failed:", error.message);
      return res.status(401).json({ message: "Not authorized, token invalid" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

// Middleware: Only Students
export const studentOnly = (req, res, next) => {
  if (req.userType === "student") {
    next();
  } else {
    res.status(403).json({ message: "Access denied: Students only" });
  }
};

// Middleware: Only Companies
export const companyOnly = (req, res, next) => {
  if (req.userType === "company") {
    next();
  } else {
    res.status(403).json({ message: "Access denied: Companies only" });
  }
};

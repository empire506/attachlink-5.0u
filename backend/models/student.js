import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  cv: { type: String, required: true }, // URL or file path
  skills: { type: [String], required: true },
  education: { type: String, required: true },
  location: { type: String, required: true }
}, { timestamps: true });

// Explicitly match the collection name in your cluster
const Student = mongoose.model("Student", studentSchema, "students");

export default Student;

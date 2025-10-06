import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  requiredSkills: { type: [String], required: true },
  internshipDuration: { type: String, required: true },
  location: { type: String, required: true }
}, { timestamps: true });

const Company = mongoose.model("Company", companySchema, "companies"); // collection matches MongoDB
export default Company;

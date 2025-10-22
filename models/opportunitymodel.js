import mongoose from "mongoose";

const opportunitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true
  },
  location: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  requiredSkills: {
    type: [String],
    default: []
  },
  applicants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student"
    }
  ]
}, {
  timestamps: true
});

const Opportunity = mongoose.model("Opportunity", opportunitySchema);

export default Opportunity;

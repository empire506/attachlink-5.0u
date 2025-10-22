import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    default: []
  },
  cv: {
    type: String // URL or file path to CV
  },
  appliedOpportunities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Opportunity"
    }
  ]
}, {
  timestamps: true
});

const Student = mongoose.model("Student", studentSchema);

export default Student;

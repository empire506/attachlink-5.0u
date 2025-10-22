import Student from '../models/studentModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Opportunity from '../models/opportunitymodel.js';

// Register new student
export const registerStudent = async (req, res) => {
  try {
    const { name, email, password, phone, skills, location, cv } = req.body;

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) return res.status(400).json({ message: 'Student already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new Student({ name, email, password: hashedPassword, phone, skills, location, cv });
    await student.save();

    const token = jwt.sign({ id: student._id, userType: 'student' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login student
export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: student._id, userType: 'student' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get student profile
export const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update student profile
export const updateStudentProfile = async (req, res) => {
  try {
    const updates = req.body;
    if (updates.password) updates.password = await bcrypt.hash(updates.password, 10);
    const student = await Student.findByIdAndUpdate(req.user.id, updates, { new: true });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Apply to opportunity
export const applyOpportunity = async (req, res) => {
  try {
    const { opportunityId } = req.params;
    const student = await Student.findById(req.user.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    if (!student.appliedOpportunities) student.appliedOpportunities = [];
    if (student.appliedOpportunities.includes(opportunityId)) return res.status(400).json({ message: 'Already applied' });

    student.appliedOpportunities.push(opportunityId);
    await student.save();

    // Update opportunity's applicants
    const opportunity = await Opportunity.findById(opportunityId);
    if (opportunity && !opportunity.applicants.includes(student._id)) {
      opportunity.applicants.push(student._id);
      await opportunity.save();
    }

    res.status(200).json({ message: 'Application successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import Company from '../models/companyModel.js';
import Opportunity from '../models/opportunitymodel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register new company
export const registerCompany = async (req, res) => {
  try {
    const { name, email, password, phone, skills, location, duration } = req.body;

    const existingCompany = await Company.findOne({ email });
    if (existingCompany) return res.status(400).json({ message: 'Company already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const company = new Company({ name, email, password: hashedPassword, phone, skills, location, duration });
    await company.save();

    const token = jwt.sign({ id: company._id, userType: 'company' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, company });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login company
export const loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;
    const company = await Company.findOne({ email });
    if (!company) return res.status(404).json({ message: 'Company not found' });

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: company._id, userType: 'company' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, company });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get company profile
export const getCompanyProfile = async (req, res) => {
  try {
    const company = await Company.findById(req.user.id);
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update company profile
export const updateCompanyProfile = async (req, res) => {
  try {
    const updates = req.body;
    if (updates.password) updates.password = await bcrypt.hash(updates.password, 10);

    const company = await Company.findByIdAndUpdate(req.user.id, updates, { new: true });
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View applicants for a specific opportunity
export const viewApplicants = async (req, res) => {
  try {
    const { opportunityId } = req.params;

    const opportunity = await Opportunity.findById(opportunityId).populate(
      'applicants',
      'name email skills cv'
    );

    if (!opportunity) return res.status(404).json({ message: 'Opportunity not found' });
    if (opportunity.company.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    res.status(200).json({ applicants: opportunity.applicants });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

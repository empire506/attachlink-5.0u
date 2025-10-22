import Opportunity from '../models/opportunitymodel.js';
import Student from '../models/studentModel.js';

// Create new opportunity (company only)
export const createOpportunity = async (req, res) => {
  try {
    const opportunity = new Opportunity({
      ...req.body,
      company: req.user.id,
    });

    await opportunity.save();
    res.status(201).json(opportunity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all opportunities (students can view)
export const getAllOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find().populate('company', 'name email');
    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single opportunity by ID
export const getOpportunityById = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id).populate('company', 'name email');
    if (!opportunity) return res.status(404).json({ message: 'Opportunity not found' });
    res.json(opportunity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update opportunity (company only)
export const updateOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity) return res.status(404).json({ message: 'Opportunity not found' });
    if (opportunity.company.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    const updated = await Opportunity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete opportunity (company only)
export const deleteOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity) return res.status(404).json({ message: 'Opportunity not found' });
    if (opportunity.company.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    await opportunity.remove();
    res.json({ message: 'Opportunity deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Apply to opportunity (student only)
export const applyToOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity) return res.status(404).json({ message: 'Opportunity not found' });

    if (opportunity.applicants.includes(req.user.id))
      return res.status(400).json({ message: 'Already applied' });

    opportunity.applicants.push(req.user.id);
    await opportunity.save();

    res.json({ message: 'Application successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all applicants for an opportunity (company only)
export const getApplicants = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id).populate('applicants', 'name email skills cv');
    if (!opportunity) return res.status(404).json({ message: 'Opportunity not found' });
    if (opportunity.company.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    res.json(opportunity.applicants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

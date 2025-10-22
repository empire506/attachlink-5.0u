import express from 'express';
import {
  createOpportunity,
  getAllOpportunities,
  getOpportunityById,
  applyToOpportunity,
} from '../controllers/opportunitycontroller.js';
import { protect, studentOnly, companyOnly } from '../middleware/auth.js';

const router = express.Router();

// Company routes
router.post('/', protect, companyOnly, createOpportunity);

// Student routes
router.get('/', protect, studentOnly, getAllOpportunities);
router.get('/:id', protect, studentOnly, getOpportunityById);
router.post('/:id/apply', protect, studentOnly, applyToOpportunity);

export default router;

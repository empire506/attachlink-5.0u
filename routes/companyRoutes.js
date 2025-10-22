import express from 'express';
import {
  registerCompany,
  loginCompany,
  getCompanyProfile,
  updateCompanyProfile,
  viewApplicants,
} from '../controllers/companyController.js';
import { protect, companyOnly } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', registerCompany);
router.post('/login', loginCompany);

// Protected routes
router.get('/profile', protect, companyOnly, getCompanyProfile);
router.put('/profile', protect, companyOnly, updateCompanyProfile);
router.get('/applicants/:opportunityId', protect, companyOnly, viewApplicants);

export default router;

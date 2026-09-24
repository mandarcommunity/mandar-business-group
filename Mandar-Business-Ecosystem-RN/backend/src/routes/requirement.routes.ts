// @ts-nocheck
import express from 'express';
import * as requirementController from '../controllers/requirement.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

// Get all active requirements
router.get('/', protect, requirementController.getAllRequirements);

// Get my requirements
router.get('/me', protect, requirementController.getMyRequirements);


// Create a requirement
router.post('/', protect, requirementController.createRequirement);

// Update a requirement
router.put('/:id', protect, requirementController.updateRequirement);

// Update a requirement status
router.put('/:id/status', protect, requirementController.updateRequirementStatus);

// Delete a requirement
router.delete('/:id', protect, requirementController.deleteRequirement);

export default router;

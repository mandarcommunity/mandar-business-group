// @ts-nocheck
import express from 'express';
import * as advertisementController from '../controllers/advertisement.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

// Get all active ads (can be public or authenticated, let's keep it authenticated for now)
router.get('/', protect, advertisementController.getAllAdvertisements);

// Get my ads
router.get('/me', protect, advertisementController.getMyAdvertisements);

// Get my likes
router.get('/me/likes', protect, advertisementController.getMyLikes);

// Get ad by ID
router.get('/:id', protect, advertisementController.getAdvertisementById);

// Create an ad
router.post('/', protect, advertisementController.createAdvertisement);

// Delete an ad
router.delete('/:id', protect, advertisementController.deleteAdvertisement);

// Update an ad
router.put('/:id', protect, advertisementController.updateAdvertisement);

// Toggle like on an ad
router.post('/:id/like', protect, advertisementController.toggleLike);

// Get comments for an ad
router.get('/:id/comments', protect, advertisementController.getComments);

// Add comment to an ad
router.post('/:id/comments', protect, advertisementController.addComment);

export default router;

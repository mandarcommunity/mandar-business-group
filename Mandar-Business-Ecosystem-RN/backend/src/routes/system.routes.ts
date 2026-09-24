// @ts-nocheck
import { Router } from "express";
import { getPlatformStats, getHomeAds, getIndustries, createSponsorEnquiry, submitFeedback, getFeedbacks, markFeedbackAsRead, getUnreadFeedbackCount, deleteFeedback } from "../controllers/system.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/stats", getPlatformStats);
router.get("/home-ads", getHomeAds);
router.post("/sponsor-enquiries", createSponsorEnquiry);

// Feedback routes
router.post("/feedback", protect, submitFeedback);
router.get("/feedback", protect, getFeedbacks); // Admin
router.get("/feedback/unread-count", protect, getUnreadFeedbackCount); // Admin
router.put("/feedback/:id/read", protect, markFeedbackAsRead); // Admin
router.delete("/feedback/:id", protect, deleteFeedback); // Admin

router.get("/industries", getIndustries);

export default router;

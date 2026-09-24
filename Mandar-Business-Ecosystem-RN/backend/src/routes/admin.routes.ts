// @ts-nocheck
import express from "express";
import * as admin from "../controllers/admin.controller";
import { requireAdmin } from "../middleware/admin.middleware";

const router = express.Router();

router.use(requireAdmin);

router.get("/dashboard", admin.getDashboardStats);
router.post("/broadcast", admin.broadcastPush);

router.get("/users", admin.getUsers);
router.patch("/users/:id/role", admin.updateUserRole);
router.patch("/users/:id/suspend", admin.suspendUser);
router.delete("/users/:id", admin.deleteUser);

router.get("/industries", admin.getIndustries);
router.post("/industries", admin.createIndustry);
router.delete("/industries/:id", admin.deleteIndustry);
router.patch("/industries/:id/toggle", admin.toggleIndustry);

router.get("/sponsored-ads", admin.getSponsoredAds);
router.post("/sponsored-ads", admin.createSponsoredAd);
router.delete("/sponsored-ads/:id", admin.deleteSponsoredAd);

router.get("/advertisements", admin.getAdvertisements);
router.delete("/advertisements/:id", admin.deleteAdvertisement);

router.get("/requirements", admin.getRequirements);
router.delete("/requirements/:id", admin.deleteRequirement);

router.get("/products", admin.getProducts);
router.delete("/products/:id", admin.deleteProduct);

router.get("/banned-keywords", admin.getBannedKeywords);
router.post("/banned-keywords", admin.addBannedKeyword);
router.delete("/banned-keywords/:id", admin.deleteBannedKeyword);

router.get("/verifications", admin.getVerifications);
router.put("/verifications/:id/approve", admin.approveVerification);
router.put("/verifications/:id/reject", admin.rejectVerification);

router.get("/sponsor-enquiries", admin.getSponsorEnquiries);
router.patch("/sponsor-enquiries/:id", admin.updateEnquiryStatus);

export default router;

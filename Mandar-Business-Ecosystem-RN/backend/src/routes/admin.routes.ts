// @ts-nocheck
import express from "express";
import { broadcastPush } from "../controllers/admin.controller";
import { requireAdmin } from "../middleware/admin.middleware";

const router = express.Router();

router.get("/dashboard", requireAdmin, async (req, res) => {
  res.json({
    success: true,
    data: {
      totalUsers: 150,
      activeBusinesses: 120,
      pendingVerifications: 5,
      totalAds: 10
    }
  });
});

router.post("/broadcast", requireAdmin, broadcastPush);

export default router;

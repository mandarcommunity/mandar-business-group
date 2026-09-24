// @ts-nocheck
import express from "express";
import { broadcastPush } from "../controllers/admin.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();
router.post("/broadcast", protect, broadcastPush);

export default router;

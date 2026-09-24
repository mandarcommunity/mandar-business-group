import express
from "express";

import {

  signup,
  login,
  forgotPassword,
  verifyResetOtp,
  resetPassword,

  refreshToken,
} from "../controllers/auth.controller";

const router =
  express.Router();

/* SIGNUP */
router.post(
  "/signup",
  signup
);

/* LOGIN */
router.post(
  "/login",
  login
);

/* FORGOT PASSWORD */
router.post(
  "/forgot-password",
  forgotPassword
);

/* VERIFY RESET OTP */
router.post(
  "/verify-reset-otp",
  verifyResetOtp
);

/* RESER PASSWORD */
router.post(
  "/reset-password",
  resetPassword
);


import { updatePushToken } from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";

/* UPDATE PUSH TOKEN */
router.put("/push-token", protect, updatePushToken);

export default router;
/* REFRESH TOKEN */
router.post("/refresh-token", refreshToken);

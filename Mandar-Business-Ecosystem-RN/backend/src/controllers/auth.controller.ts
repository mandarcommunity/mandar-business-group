// @ts-nocheck
import {

  Request,

  Response,

} from "express";

import {

  signupValidator,

  loginValidator,

  forgotPasswordValidator,

  verifyResetOtpValidator,

  resetPasswordValidator,

} from "../validators/auth.validator";

import {

  signupService,

  loginService,

  forgotPasswordService,

  verifyResetOtpService,

  resetPasswordService,

} from "../services/auth.service";

import {

  sendResponse,

} from "../utils/sendResponse";

/* =========================
   SIGNUP CONTROLLER
========================= */

export const signup =
  async (

    req: Request,

    res: Response
  ) => {

    try {

      const validatedData =
        signupValidator.parse(
          req.body
        );

      const result =
        await signupService(
          validatedData
        );

      return sendResponse({

        res,

        success: true,

        message:
          "Account created successfully",

        data: result,
      });

    } catch (error: any) {

      return sendResponse({

        res,

        success: false,

        statusCode: 400,

        message:
          error.message ||
          "Signup failed",
      });

    }

};

/* =========================
   LOGIN CONTROLLER
========================= */

export const login =
  async (

    req: Request,

    res: Response
  ) => {

    try {

      const validatedData =
        loginValidator.parse(
          req.body
        );

      const result =
        await loginService(

          validatedData.email,

          validatedData.password
        );

      return sendResponse({

        res,

        success: true,

        message:
          "Login successful",

        data: result,
      });

    } catch (error: any) {

      return sendResponse({

        res,

        success: false,

        statusCode: 400,

        message:
          error.message ||
          "Login failed",
      });

    }

};

/* =========================
   FORGOT PASSWORD
========================= */

export const forgotPassword =
  async (

    req: Request,

    res: Response
  ) => {

    try {

      const validatedData =
        forgotPasswordValidator.parse(
          req.body
        );

      await forgotPasswordService(

        validatedData.email
      );

      return sendResponse({

        res,

        success: true,

        message:
          "OTP sent successfully",
      });

    } catch (error: any) {

      return sendResponse({

        res,

        success: false,

        statusCode: 400,

        message:
          error.message ||
          "Failed to send OTP",
      });

    }

};

/* =========================
   VERIFY RESET OTP
========================= */

export const verifyResetOtp =
  async (

    req: Request,

    res: Response
  ) => {

    try {

      const validatedData =
        verifyResetOtpValidator.parse(
          req.body
        );

      await verifyResetOtpService(

        validatedData.email,

        validatedData.otp
      );

      return sendResponse({

        res,

        success: true,

        message:
          "OTP verified successfully",
      });

    } catch (error: any) {

      return sendResponse({

        res,

        success: false,

        statusCode: 400,

        message:
          error.message ||
          "OTP verification failed",
      });

    }

};

/* =========================
   RESET PASSWORD
========================= */

export const resetPassword =
  async (

    req: Request,

    res: Response
  ) => {

    try {

      const validatedData =
  resetPasswordValidator.parse(
    req.body
  );

await resetPasswordService(

  validatedData.email,

  validatedData.otp,

  validatedData.newPassword
);

      return sendResponse({

        res,

        success: true,

        message:
          "Password reset successful",
      });

    } catch (error: any) {

      return sendResponse({

        res,

        success: false,

        statusCode: 400,

        message:
          error.message ||
          "Password reset failed",
      });

    }

};
/* =========================
   REFRESH TOKEN CONTROLLER
========================= */
import { refreshTokenValidator } from "../validators/auth.validator";
import { refreshTokenService } from "../services/auth.service";

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const validatedData = refreshTokenValidator.parse(req.body);
    const result = await refreshTokenService(validatedData.refreshToken);
    return sendResponse({
      res,
      success: true,
      message: "Token refreshed successfully",
      data: result,
    });
  } catch (error: any) {
    return sendResponse({
      res,
      success: false,
      statusCode: 401,
      message: error.message || "Failed to refresh token",
    });
  }
};

export const updatePushToken = async (req: any, res: any) => {
  try {
    const { pushToken } = req.body;
    if (!pushToken) return sendResponse({ res, success: false, statusCode: 400, message: "No push token provided" });

    const { error } = await supabase
      .from('users')
      .update({ expo_push_token: pushToken })
      .eq('id', req.user.id);

    if (error) throw error;
    return sendResponse({ res, success: true, message: "Push token updated" });
  } catch (error: any) {
    return sendResponse({ res, success: false, statusCode: 500, message: error.message });
  }
};

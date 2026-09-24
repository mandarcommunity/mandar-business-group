import { z }
from "zod";

/* =========================
   SIGNUP VALIDATOR
========================= */

export const signupValidator =
  z.object({

    fullName:
      z.string()
        .min(3)
        .max(80),

    mobile:
      z.string()
        .regex(
          /^[0-9]{10}$/
        ),

    email:
      z.string()
        .email(),

    password:
      z.string()
        .min(8)
        .max(100),

    inviteCode:
      z.string()
        .min(3)
        .max(30),
  });

/* =========================
   LOGIN VALIDATOR
========================= */

export const loginValidator =
  z.object({

    email:
      z.string()
        .min(3),

    password:
      z.string()
        .min(8),
  });

/* =========================
   FORGOT PASSWORD
========================= */

export const forgotPasswordValidator =
  z.object({

    email:
      z.string()
        .email(),
  });

/* =========================
   VERIFY RESET OTP
========================= */

export const verifyResetOtpValidator =
  z.object({

    email:
      z.string()
        .email(),

    otp:
      z.string()
        .length(6),
  });

/* =========================
   RESET PASSWORD
========================= */

export const resetPasswordValidator =
  z.object({

    email:
      z.string()
        .email(),

    otp:
      z.string()
        .length(6),

    newPassword:
      z.string()
        .min(8)
        .max(100),
  });
export const refreshTokenValidator = z.object({ refreshToken: z.string() });


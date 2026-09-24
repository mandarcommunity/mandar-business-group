// @ts-nocheck
import { supabase }
from "../config/supabase";

import { hashPassword }
from "../utils/hashPassword";

import { comparePassword }
from "../utils/comparePassword";

import { generateAccessToken }
from "../utils/generateAccessToken";

import { generateRefreshToken }
from "../utils/generateRefreshToken";

import { generateOtp }
from "../utils/generateOtp";

import { sendEmail }
from "./email.service";

/* =========================
   TYPES
========================= */

interface SignupData {

  fullName: string;

  mobile: string;

  email: string;

  password: string;

  inviteCode: string;
}

/* =========================
   SIGNUP SERVICE
========================= */

export const signupService =
  async (
    data: SignupData
  ) => {

    const {

      fullName,

      mobile,

      email,

      password,

      inviteCode,

    } = data;

    /* CHECK INVITE CODE */
    const {

      data: inviteData,

    } = await supabase

      .from("invite_codes")

      .select("*")

      .eq(
        "code",
        inviteCode
      )

      .eq(
        "is_active",
        true
      )

      .single();

    if (!inviteData) {

      throw new Error(
        "Invalid invite code"
      );
    }

    /* CHECK EMAIL */
    const {

      data: existingEmail,

    } = await supabase

      .from("users")

      .select("id")

      .eq("email", email)

      .single();

    if (existingEmail) {

      throw new Error(
        "Email already exists"
      );
    }

    /* CHECK MOBILE */
    const {

      data: existingMobile,

    } = await supabase

      .from("users")

      .select("id")

      .eq(
        "mobile",
        mobile
      )

      .single();

    if (existingMobile) {

      throw new Error(
        "Mobile already exists"
      );
    }

    /* HASH PASSWORD */
    const hashedPassword =
      await hashPassword(
        password
      );

    /* CREATE USER */
    const {

      data: user,

      error,

    } = await supabase

      .from("users")

      .insert({

        full_name:
          fullName,

        mobile,

        email,

        password_hash:
          hashedPassword,

        invite_code_used:
          inviteCode,

      })

      .select()

      .single();

    if (error) {

      throw new Error(
        error.message
      );
    }

    /* UPDATE INVITE COUNT */
    await supabase

      .from("invite_codes")

      .update({

        used_count:
          inviteData.used_count +
          1,

      })

      .eq(
        "id",
        inviteData.id
      );

    /* TOKENS */
    const accessToken =
      generateAccessToken(
        user.id
      );

    const refreshToken =
      generateRefreshToken(
        user.id
      );

    /* SAVE REFRESH TOKEN */
    await supabase

      .from("refresh_tokens")

      .insert({

        user_id: user.id,

        token:
          refreshToken,

        expires_at:
          new Date(

            Date.now() +
              365 *
                24 *
                60 *
                60 *
                1000

          ).toISOString(),

      });

    /* SAFE USER */
    const safeUser = {

      id: user.id,

      full_name:
        user.full_name,

      mobile:
        user.mobile,

      email:
        user.email,

      role:
        user.role,

      status:
        user.status,

      is_email_verified:
        user.is_email_verified,

      is_mobile_verified:
        user.is_mobile_verified,

      onboarding_completed:
        user.onboarding_completed,

      created_at:
        user.created_at,

    };

    return {

      user: safeUser,

      accessToken,

      refreshToken,

    };

};

/* =========================
   LOGIN SERVICE
========================= */

export const loginService =
  async (

    emailOrMobile: string,

    password: string

  ) => {

    const {

      data: user,

    } = await supabase

      .from("users")

      .select("*")

      .or(

        `email.eq.${emailOrMobile},mobile.eq.${emailOrMobile}`

      )

      .single();

    if (!user) {
      throw new Error("Invalid credentials");
    }
    
    if (user.is_blocked) {
      throw new Error("Your account has been blocked. If you think this is a mistake, please contact us at support@mandarcommunity.in");
    }

    const isPasswordValid =
      await comparePassword(

        password,

        user.password_hash

      );

    if (!isPasswordValid) {

      throw new Error(
        "Invalid credentials"
      );
    }

    const safeUser = {

      id: user.id,

      full_name:
        user.full_name,

      mobile:
        user.mobile,

      email:
        user.email,

      role:
        user.role,

      status:
        user.status,

      is_email_verified:
        user.is_email_verified,

      is_mobile_verified:
        user.is_mobile_verified,

      onboarding_completed:
        user.onboarding_completed,

      created_at:
        user.created_at,

    };

    const accessToken =
      generateAccessToken(
        user.id
      );

    const refreshToken =
      generateRefreshToken(
        user.id
      );

    await supabase

      .from("refresh_tokens")

      .insert({

        user_id: user.id,

        token:
          refreshToken,

        expires_at:
          new Date(

            Date.now() +
              365 *
                24 *
                60 *
                60 *
                1000

          ).toISOString(),

      });

    return {

      user: safeUser,

      accessToken,

      refreshToken,

    };

};

/* =========================
   FORGOT PASSWORD
========================= */

export const forgotPasswordService =
  async (
    email: string
  ) => {

    /* CHECK USER */
    const {

      data: user,

    } = await supabase

      .from("users")

      .select("*")

      .eq("email", email)

      .single();

    if (!user) {

      throw new Error(
        "No account found with this email"
      );
    }

    /* DELETE OLD OTP */
    await supabase

      .from(
        "password_reset_otps"
      )

      .delete()

      .eq(
        "email",
        email
      );

    /* GENERATE OTP */
    const otp =
      generateOtp();

    /* SAVE OTP */
    await supabase

      .from(
        "password_reset_otps"
      )

      .insert({

        email,

        otp,

        verified: false,

        attempts: 0,

        expires_at:
          new Date(

            Date.now() +
              10 *
                60 *
                1000

          ).toISOString(),

      });

    /* SEND EMAIL */
    await sendEmail({

      to: email,

      subject:
        "Mandar Community Password Reset OTP",

      html: `

      <div style="font-family:sans-serif;padding:20px;">

        <h2>Mandar Community</h2>

        <p>Your password reset OTP is:</p>

        <h1>${otp}</h1>

        <p>
          This OTP will expire in 10 minutes.
        </p>

      </div>

      `,

    });

    return true;

};

/* =========================
   VERIFY RESET OTP
========================= */

export const verifyResetOtpService =
  async (

    email: string,

    otp: string

  ) => {

    const {

      data: otpData,

    } = await supabase

      .from(
        "password_reset_otps"
      )

      .select("*")

      .eq("email", email)

      .eq("otp", otp)

      .single();

    if (!otpData) {

      throw new Error(
        "Invalid OTP"
      );
    }

    /* CHECK EXPIRY */
    const isExpired =
      new Date() >
      new Date(
        otpData.expires_at
      );

    if (isExpired) {

      throw new Error(
        "OTP expired"
      );
    }

    /* CHECK ATTEMPTS */
    if (
      otpData.attempts >= 5
    ) {

      throw new Error(
        "Too many attempts"
      );
    }

    /* MARK VERIFIED */
    await supabase

      .from(
        "password_reset_otps"
      )

      .update({

        verified: true,

      })

      .eq(
        "id",
        otpData.id
      );

    return true;

};

/* =========================
   RESET PASSWORD
========================= */

export const resetPasswordService =
  async (

    email: string,

    otp: string,

    newPassword: string

  ) => {

    /* CHECK VERIFIED OTP */
    const {

      data: otpData,

    } = await supabase

      .from(
        "password_reset_otps"
      )

      .select("*")

      .eq("email", email)

      .eq(
        "verified",
        true
      )

      .single();

    if (!otpData) {

      throw new Error(
        "OTP verification required"
      );
    }

    /* HASH PASSWORD */
    const hashedPassword =
      await hashPassword(
        newPassword
      );

    /* UPDATE PASSWORD */
    const {

      error,

    } = await supabase

      .from("users")

      .update({

        password_hash:
          hashedPassword,

      })

      .eq(
        "email",
        email
      );

    if (error) {

      throw new Error(
        error.message
      );
    }

    /* DELETE OTP */
    await supabase

      .from(
        "password_reset_otps"
      )

      .delete()

      .eq(
        "email",
        email
      );

    return true;

};

/* =========================
   REFRESH TOKEN
========================= */
export const refreshTokenService = async (token: string) => {
  // Check if token exists in DB and is not expired
  const { data: tokenData } = await supabase
    .from("refresh_tokens")
    .select("*")
    .eq("token", token)
    .single();

  if (!tokenData || new Date(tokenData.expires_at) < new Date()) {
    throw new Error("Invalid or expired refresh token");
  }

  // Get user
  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("id", tokenData.user_id)
    .single();

  if (!user) throw new Error("User not found");

  // Generate new tokens
  const newAccessToken = generateAccessToken(user.id);
  const newRefreshToken = generateRefreshToken(user.id);

  // Update DB with new refresh token (invalidate old one)
  await supabase
    .from("refresh_tokens")
    .update({ 
      token: newRefreshToken,
      expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
    })
    .eq("id", tokenData.id);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

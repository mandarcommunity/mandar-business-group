import { API }
from "./api";

/* SIGNUP */
export const signupUser =
  async (data: any) => {

    const response =
      await API.post(

        "/auth/signup",

        data
      );

    return response.data;
};

/* LOGIN */
export const loginUser =
  async (data: any) => {

    const response =
      await API.post(

        "/auth/login",

        data
      );

    return response.data;
};

/* FORGOT PASSWORD */
export const forgotPassword =
  async (email: string) => {

    const response =
      await API.post(

        "/auth/forgot-password",

        {
          email,
        }
      );

    return response.data;
};

/* VERIFY OTP */
export const verifyOtp =
  async (

    email: string,

    otp: string
  ) => {

    const response =
      await API.post(

        "/auth/verify-reset-otp",

        {
          email,

          otp,
        }
      );

    return response.data;
};

/* CREATE BUSINESS */
export const createBusiness =
  async (

    data: any,

    token: string
  ) => {

    const response =
      await API.post(

        "/business/create",

        data,

        {

          headers: {

            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};

/* SEND RESET OTP */
export const sendResetOtp =
  async (

    email: string
  ) => {

    const response =
      await API.post(

        "/auth/forgot-password",

        { email }
      );

    return response.data;
};

/* VERIFY RESET OTP */
export const verifyResetOtp =
  async (

    email: string,

    otp: string
  ) => {

    const response =
      await API.post(

        "/auth/verify-reset-otp",

        {

          email,

          otp,
        }
      );

    return response.data;
};

/* RESET PASSWORD */
export const resetPassword =
  async (

    email: string,

    otp: string,

    newPassword: string
  ) => {

    const response =
      await API.post(

        "/auth/reset-password",

        {

          email,

          otp,

          newPassword,
        }
      );

    return response.data;
};

/* GET MY BUSINESS */
export const getMyBusiness =
  async (
    token: string
  ) => {

    const response =
      await API.get(

        "/business/me",

        {

          headers: {

            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};

/* GET BUSINESS BY ID */
export const getBusinessById = async (id: string, token: string) => {
  const response = await API.get(`/business/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/* UPDATE BUSINESS */
export const updateBusiness =
  async (

    data: any,

    token: string
  ) => {

    const response =
      await API.put(

        "/business/update",

        data,

        {

          headers: {

            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};
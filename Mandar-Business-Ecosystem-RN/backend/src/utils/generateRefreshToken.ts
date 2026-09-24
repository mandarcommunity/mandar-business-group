import jwt from "jsonwebtoken";

export const generateRefreshToken =
  (userId: string) => {

    return jwt.sign(

      { id: userId },

      process.env.JWT_REFRESH_SECRET!,

      {
        expiresIn: "365d",
      }
    );
};

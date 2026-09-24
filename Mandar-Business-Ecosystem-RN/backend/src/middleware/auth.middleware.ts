// @ts-nocheck
import {
  Request,
  Response,
  NextFunction,
} from "express";

import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

export interface AuthRequest
  extends Request {

  user?: any;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;

    // Optional: check if user is blocked
    const { supabase } = require("../config/supabase");
    const { data: user } = await supabase
      .from("users")
      .select("is_blocked")
      .eq("id", (decoded as any).id)
      .single();

    if (user && user.is_blocked) {
      return res.status(403).json({ success: false, message: "Your account has been blocked. If you think this is a mistake, please contact us at support@mandarcommunity.in" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
};


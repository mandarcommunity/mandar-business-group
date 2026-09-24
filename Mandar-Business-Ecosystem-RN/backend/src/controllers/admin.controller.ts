import { Response } from "express";
import { supabase } from "../config/supabase";
import { sendResponse } from "../utils/sendResponse";
import { sendPushNotification } from "../utils/push";

export const broadcastPush = async (req: any, res: Response) => {
  try {
    const { title, message } = req.body;
    if (!title || !message) {
      return sendResponse({ res, success: false, statusCode: 400, message: "Title and message required" });
    }

    const { data: users, error } = await supabase.from('users').select('expo_push_token').not('expo_push_token', 'is', null);
    if (error) throw error;

    let count = 0;
    for (const user of users) {
      if (user.expo_push_token) {
        await sendPushNotification(user.expo_push_token, title, message, { isBroadcast: true });
        count++;
      }
    }

    return sendResponse({ res, success: true, message: `Broadcast sent to ${count} users` });
  } catch (error: any) {
    return sendResponse({ res, success: false, statusCode: 500, message: error.message });
  }
};

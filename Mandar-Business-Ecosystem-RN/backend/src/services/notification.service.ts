import { supabase } from "../config/supabase";

export interface CreateNotificationParams {
  userId: string;
  title: string;
  body: string;
  type: string;
  relatedId?: string;
}

export const createNotification = async (params: CreateNotificationParams): Promise<boolean> => {
  try {
    const { error } = await supabase.from("notifications").insert({
      user_id: params.userId,
      title: params.title,
      body: params.body,
      type: params.type,
      related_id: params.relatedId || null,
      is_read: false
    });

    if (error) {
      console.error("Error creating notification:", error);
      return false;
    }

    // TODO: Phase 3 - Trigger Push Notification to Expo here using params.userId

    return true;
  } catch (error) {
    console.error("Error in createNotification service:", error);
    return false;
  }
};

import { supabase } from "../config/supabase";

export const checkModeration = async (textFields: string[]): Promise<boolean> => {
  try {
    const { data: keywords } = await supabase.from("banned_keywords").select("keyword");
    if (!keywords || keywords.length === 0) return true;
    
    const combinedText = textFields.join(" ").toLowerCase();
    
    for (const item of keywords) {
      if (combinedText.includes(item.keyword.toLowerCase())) {
        return false; // Found a banned keyword
      }
    }
    return true; // Clean
  } catch (err) {
    console.error("Moderation check error:", err);
    return true; // Fail open
  }
};

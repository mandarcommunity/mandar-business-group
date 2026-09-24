import crypto from "crypto";
import { supabase } from "../config/supabase";

export const generateSlug = async (
  text: string, 
  table: string = "businesses",
  appendRandom: boolean = false
): Promise<string> => {
  let baseSlug = (text || "item")
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');

  if (appendRandom) {
    const randomHex = crypto.randomBytes(3).toString("hex");
    baseSlug = `${baseSlug}-${randomHex}`;
  }

  let slug = baseSlug;
  let counter = 1;
  let isUnique = false;

  while (!isUnique) {
    const { data } = await supabase.from(table).select("id").eq("slug", slug).maybeSingle();
    if (!data) {
      isUnique = true;
    } else {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
  }

  return slug;
};

// @ts-nocheck
import sharp from "sharp";
import { supabase } from "../config/supabase";

export const uploadBase64Image = async (base64String: string, bucket: string, prefix: string): Promise<string> => {
  try {
    // If it's already a URL, return it
    if (base64String.startsWith('http')) return base64String;
    
    // Sometimes React Native base64 has data URI prefix, remove it if present
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Convert to WebP using sharp
    const webpBuffer = await sharp(buffer)
      .webp({ quality: 80 })
      .toBuffer();

    const fileName = `${prefix}_${Date.now()}.webp`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, webpBuffer, {
        contentType: 'image/webp',
        cacheControl: '31536000', // Cache for 1 year
        upsert: true
      });
      
    if (uploadError) throw uploadError;
    
    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);
      
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error(`Error uploading image to ${bucket}:`, error);
    return "";
  }
};

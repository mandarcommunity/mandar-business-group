import { generateSlug } from '../utils/slugify';
import { Request, Response } from "express";
import { supabase } from "../config/supabase";
import { checkModeration } from "../services/moderation.service";
import { uploadBase64Image } from "../services/storage.service";

export const createProduct = async (req: any, res: Response) => {
  try {
    const { name, category, description, images, business_id } = req.body;
    const userId = req.user.id;
      const isClean = await checkModeration([name, description || ""]);
      if (!isClean) return res.status(400).json({ success: false, message: "Your content contains restricted words and violates our guidelines." });

    if (!name || !category || !business_id) {
      return res.status(400).json({ success: false, message: "Name, category, and business_id are required" });
    }

    const { count, error: countError } = await supabase
      .from("products")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId);

    if (countError) throw countError;
    if (count !== null && count >= 15) {
      return res.status(400).json({ 
        success: false, 
        message: "You have reached the maximum catalog limit of 15 products. Delete an existing product to add a new one." 
      });
    }

    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          user_id: userId,
          business_id,
          name,
          category,
          description,
          images: images || [],
        }
      ])
      .select();

    if (error) throw error;

    res.status(201).json({ success: true, data: data[0] });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyProducts = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const updates = req.body;

    const { data: product, error: fetchError } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    if (product.user_id !== userId) {
      return res.status(403).json({ success: false, message: "Not authorized to update this product" });
    }

    
    const { base64Images, images, ...otherUpdates } = updates;
    let finalImages: string[] = [];
    
    // We get 'images' which contains the URIs the user wants to keep.
    // We also get 'base64Images' which contains only the base64 strings for the NEW images.
    // If an image in 'images' is already a public URL (http), we keep it.
    // For local URIs (file://), we will replace them with the newly uploaded base64 URLs.
    
    if (images && Array.isArray(images)) {
      let b64Index = 0;
      for (const uri of images) {
        if (uri.startsWith('http')) {
          finalImages.push(uri);
        } else if (base64Images && base64Images[b64Index]) {
          const newUrl = await uploadBase64Image(base64Images[b64Index], 'products', `prod_${userId}`);
          finalImages.push(newUrl);
          b64Index++;
        }
      }
    } else {
      finalImages = product.images || [];
    }
    
    const { data, error } = await supabase
      .from("products")
      .update({ ...otherUpdates, images: finalImages, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select();

    if (error) throw error;

    res.status(200).json({ success: true, data: data[0] });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const { data: product, error: fetchError } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    if (product.user_id !== userId) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this product" });
    }

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBusinessProducts = async (req: any, res: Response) => {
  try {
    const { businessId } = req.params;

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("business_id", businessId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

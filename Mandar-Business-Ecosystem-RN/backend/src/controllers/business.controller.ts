// @ts-nocheck
import {
  Request,
  Response,
} from "express";

import {
  createBusinessValidator,
} from "../validators/business.validator";

import {
  createBusinessService,
  getMyBusinessService,
  getBusinessByIdService,
  updateBusinessService,
} from "../services/business.service";

import { sendResponse }
from "../utils/sendResponse";

import { supabase } from "../config/supabase";

/* =========================
   CREATE BUSINESS
========================= */

export const createBusiness =
  async (

    req: any,

    res: Response
  ) => {

    try {

      const validatedData =
        createBusinessValidator.parse(
          req.body
        );

      const business =
        await createBusinessService(

          req.user.id,

          validatedData
        );

      return sendResponse({

        res,

        success: true,

        message:
          "Business created successfully",

        data: business,
      });

    } catch (error: any) {

      return sendResponse({

        res,

        success: false,

        statusCode: 400,

        message:
          error.message,
      });

    }

};

/* =========================
   GET MY BUSINESS
========================= */

export const getMyBusiness =
  async (

    req: any,

    res: Response
  ) => {

    try {

      const business =
        await getMyBusinessService(
          req.user.id
        );

      return sendResponse({

        res,

        success: true,

        message:
          "Business fetched successfully",

        data: business,
      });

    } catch (error: any) {

      return sendResponse({

        res,

        success: false,

        statusCode: 400,

        message:
          error.message,
      });

    }

};

/* =========================
   UPDATE BUSINESS
========================= */

export const updateBusiness =
  async (

    req: any,

    res: Response
  ) => {

    try {

      const business =
        await updateBusinessService(

          req.user.id,

          req.body
        );

      return sendResponse({

        res,

        success: true,

        message:
          "Business updated successfully",

        data: business,
      });

    } catch (error: any) {

      return sendResponse({

        res,

        success: false,

        statusCode: 400,

        message:
          error.message,
      });

    }

};

/* =========================
   GET BUSINESS BY ID
========================= */

export const getBusinessById = async (req: any, res: Response) => {
  try {
    const business = await getBusinessByIdService(req.params.id);
    return sendResponse({
      res,
      success: true,
      message: "Business fetched successfully",
      data: business,
    });
  } catch (error: any) {
    console.error("VERIFY ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllBusinesses = async (req: any, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 20;
    const page = parseInt(req.query.page as string) || 1;
    const offset = (page - 1) * limit;

    const { data, error } = await supabase
      .from("businesses")
      .select(`
        *,
        user:users!user_id(full_name)
      `)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error("VERIFY ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const submitVerification = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { documentUrl, base64Image, documentType } = req.body;

    if (!documentType || (!documentUrl && !base64Image)) {
      return res.status(400).json({ success: false, message: "Document type and image are required" });
    }

    // Get the business belonging to this user
    const { data: business, error: bizError } = await supabase
      .from("businesses")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (bizError || !business) {
      return res.status(404).json({ success: false, message: "Business not found for this user" });
    }

    let finalDocumentUrl = documentUrl;

    if (base64Image) {
      // Decode base64 and upload to Supabase Storage
      const buffer = Buffer.from(base64Image, 'base64');
      const fileName = `verification_${business.id}_${Date.now()}.jpg`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, buffer, {
          contentType: 'image/jpeg',
          upsert: true
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: publicUrlData } = supabase.storage
        .from('documents')
        .getPublicUrl(fileName);
        
      finalDocumentUrl = publicUrlData.publicUrl;
    }

    // Update the business record
    const { error: updateError } = await supabase
      .from("businesses")
      .update({
        verification_status: "pending",
        verification_document_url: finalDocumentUrl,
        verification_document_type: documentType,
        verification_submitted_at: new Date().toISOString(),
        verification_rejection_reason: null
      })
      .eq("id", business.id);

    if (updateError) {
      throw updateError;
    }

    res.status(200).json({ success: true, message: "Verification request submitted successfully" });
  } catch (error: any) {
    console.error("VERIFY ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBusinessByUserId = async (req: any, res: Response) => {
  try {
    const { data, error } = await supabase.from('businesses').select('id, business_name, mobile').eq('user_id', req.params.userId).single();
    if (error && error.code !== 'PGRST116') throw error;
    return sendResponse({ res, success: true, message: "Fetched", data });
  } catch (error: any) {
    return sendResponse({ res, success: false, statusCode: 500, message: error.message });
  }
};

export const getBusinessesByIds = async (req: any, res: any) => {
  try {
    const { ids } = req.body;
    if (!ids || ids.length === 0) return sendResponse({ res, success: true, message: "Fetched", data: [] });

    const { data, error } = await supabase
      .from("businesses")
      .select(`
        *,
        user:users!user_id(full_name)
      `)
      .in('id', ids);

    if (error) throw error;
    return sendResponse({ res, success: true, message: "Fetched", data });
  } catch (error: any) {
    return sendResponse({ res, success: false, statusCode: 400, message: error.message });
  }
};

export const getBusinessesByIndustry = async (req: any, res: any) => {
  try {
    const { industry } = req.query;
    const { data, error } = await supabase
      .from("businesses")
      .select(`
        *,
        user:users!user_id(full_name),
        products:products(*)
      `)
      .contains('industries', [industry]);

    if (error) throw error;
    return sendResponse({ res, success: true, message: "Fetched", data });
  } catch (error: any) {
    return sendResponse({ res, success: false, statusCode: 400, message: error.message });
  }
};

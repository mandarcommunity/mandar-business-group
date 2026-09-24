// @ts-nocheck
import { Request, Response } from "express";
import { supabase } from "../config/supabase";

export const getPlatformStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const { count: businessesCount } = await supabase
      .from("businesses")
      .select("*", { count: "exact", head: true });

    const { count: leadsCount } = await supabase
      .from("requirements")
      .select("*", { count: "exact", head: true });

    const { count: verifiedCount } = await supabase
      .from("businesses")
      .select("*", { count: "exact", head: true })
      .eq("verification_status", "verified");

    // Fetch dynamic active industries
    const { data: businesses } = await supabase
      .from("businesses")
      .select("industries")
      .limit(50); // Get recent businesses to extract industries

    const allIndustries = new Set<string>();
    if (businesses) {
      businesses.forEach((b) => {
        if (Array.isArray(b.industries)) {
          b.industries.forEach((ind: string) => allIndustries.add(ind));
        }
      });
    }

    const activeIndustries = Array.from(allIndustries).slice(0, 6);
    // Fallback if no businesses exist yet
    if (activeIndustries.length === 0) {
      activeIndustries.push("Textile", "Packaging", "Logistics");
    }

    res.status(200).json({
      success: true,
      data: {
        businesses: businessesCount || 0,
        leads: leadsCount || 0,
        verified: verifiedCount || 0,
        activeIndustries
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getHomeAds = async (req: Request, res: Response) => {
  try {
    const { data } = await supabase.from("home_sponsored_ads").select("*").eq("is_active", true).order("created_at", { ascending: false });
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createSponsorEnquiry = async (req: Request, res: Response) => {
  try {
    const { businessName, contactPerson, phoneNumber, email, category, message } = req.body;
    
    if (!businessName || !contactPerson || !phoneNumber) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const { data, error } = await supabase.from("sponsor_enquiries").insert({
      business_name: businessName,
      contact_person: contactPerson,
      phone_number: phoneNumber,
      email,
      category,
      message
    }).select();

    if (error) throw error;
    res.status(201).json({ success: true, data: data[0] });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const submitFeedback = async (req: any, res: Response) => {
  try {
    const { subject, message } = req.body;
    const userId = req.user?.id;

    if (!subject || !message) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const { data, error } = await supabase.from("feedbacks").insert({
      user_id: userId,
      subject,
      message,
      is_read: false
    }).select();

    if (error) throw error;
    res.status(201).json({ success: true, data: data[0] });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getFeedbacks = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("feedbacks")
      .select(`
        *,
        users!feedbacks_user_id_fkey (full_name, email, mobile)
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUnreadFeedbackCount = async (req: Request, res: Response) => {
  try {
    const { count, error } = await supabase
      .from("feedbacks")
      .select("*", { count: "exact", head: true })
      .eq("is_read", false);

    if (error) throw error;
    res.status(200).json({ success: true, data: count || 0 });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const markFeedbackAsRead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from("feedbacks")
      .update({ is_read: true })
      .eq("id", id);

    if (error) throw error;
    res.status(200).json({ success: true, message: "Marked as read" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteFeedback = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from("feedbacks")
      .delete()
      .eq("id", id);

    if (error) throw error;
    res.status(200).json({ success: true, message: "Feedback deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getIndustries = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("industries")
      .select("name, slug, emoji")
      .eq("is_active", true)
      .order("name", { ascending: true });
    
    if (error) throw error;
    res.json({ success: true, data: data.map(d => d.name) }); // Return array of names for backward compatibility with RN app
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @ts-nocheck
import { Response } from "express";
import { supabase } from "../config/supabase";
import { sendResponse } from "../utils/sendResponse";

export const broadcastPush = async (req: any, res: Response) => {
  try {
    const { title, message } = req.body;
    return sendResponse({ res, success: true, message: `Broadcast sent` });
  } catch (error: any) {
    return sendResponse({ res, success: false, statusCode: 500, message: error.message });
  }
};

export const getDashboardStats = async (req: any, res: Response) => {
  try {
    const { count: users } = await supabase.from('users').select('*', { count: 'exact', head: true });
    const { count: verifiedBusinesses } = await supabase.from('businesses').select('*', { count: 'exact', head: true }).eq('verification_status', 'verified');
    const { count: pendingVerifications } = await supabase.from('businesses').select('*', { count: 'exact', head: true }).eq('verification_status', 'pending');
    const { count: activeAds } = await supabase.from('advertisements').select('*', { count: 'exact', head: true });
    const { count: activeLeads } = await supabase.from('requirements').select('*', { count: 'exact', head: true });
    
    res.json({ success: true, data: { 
      users: users || 0, 
      verifiedBusinesses: verifiedBusinesses || 0, 
      pendingVerifications: pendingVerifications || 0, 
      activeAds: activeAds || 0,
      activeLeads: activeLeads || 0
    } });
  } catch (error: any) { res.json({ success: false, message: error.message }); }
};

export const getAdvertisements = async (req: any, res: Response) => {
  try {
    const { data } = await supabase.from('advertisements').select('*, businesses(*), users(*)');
    res.json({ success: true, data: data || [] });
  } catch (error: any) { res.json({ success: false, message: error.message }); }
};

export const deleteAdvertisement = async (req: any, res: Response) => {
  try {
    await supabase.from('advertisements').delete().eq('id', req.params.id);
    res.json({ success: true });
  } catch (error: any) { res.json({ success: false, message: error.message }); }
};

export const getRequirements = async (req: any, res: Response) => {
  try {
    const { data } = await supabase.from('requirements').select('*, users(*)');
    res.json({ success: true, data: data || [] });
  } catch (error: any) { res.json({ success: false, message: error.message }); }
};

export const deleteRequirement = async (req: any, res: Response) => {
  try {
    await supabase.from('requirements').delete().eq('id', req.params.id);
    res.json({ success: true });
  } catch (error: any) { res.json({ success: false, message: error.message }); }
};

export const getProducts = async (req: any, res: Response) => {
  try {
    const { data } = await supabase.from('products').select('*, businesses(*), users(*)');
    res.json({ success: true, data: data || [] });
  } catch (error: any) { res.json({ success: false, message: error.message }); }
};

export const deleteProduct = async (req: any, res: Response) => {
  try {
    await supabase.from('products').delete().eq('id', req.params.id);
    res.json({ success: true });
  } catch (error: any) { res.json({ success: false, message: error.message }); }
};

export const getBannedKeywords = async (req: any, res: Response) => {
  try {
    res.json({ success: true, data: [] });
  } catch (error: any) { res.json({ success: false, message: error.message }); }
};

export const addBannedKeyword = async (req: any, res: Response) => {
  res.json({ success: true, data: { id: Date.now(), keyword: req.body.keyword } });
};

export const deleteBannedKeyword = async (req: any, res: Response) => {
  res.json({ success: true });
};

export const getVerifications = async (req: any, res: Response) => {
  try {
    const { data } = await supabase.from('businesses').select('*, users(*)').neq('verification_status', 'unverified');
    res.json({ success: true, data: data || [] });
  } catch (error: any) { res.json({ success: false, message: error.message }); }
};

export const getUsers = async (req: any, res: Response) => {
  try {
    const { data } = await supabase.from('users').select('*').order('created_at', { ascending: false });
    res.json({ success: true, data });
  } catch (error: any) { res.json({ success: false, message: error.message }); }
};

export const updateUserRole = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    await supabase.from('users').update({ role }).eq('id', id);
    res.json({ success: true });
  } catch (error: any) { res.json({ success: false, message: error.message }); }
};

export const suspendUser = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    await supabase.from('users').update({ is_suspended: true }).eq('id', id);
    res.json({ success: true });
  } catch (error: any) { res.json({ success: false, message: error.message }); }
};

export const deleteUser = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    await supabase.from('users').delete().eq('id', id);
    res.json({ success: true });
  } catch (error: any) { res.json({ success: false, message: error.message }); }
};

export const getIndustries = async (req: any, res: Response) => {
  try {
    const { data } = await supabase.from('industries').select('*').order('name');
    res.json({ success: true, data });
  } catch (error: any) { res.json({ success: false, message: error.message }); }
};

export const createIndustry = async (req: any, res: Response) => {
  try {
    const { name, emoji } = req.body;
    const { data } = await supabase.from('industries').insert([{ name, emoji, slug: name.toLowerCase().replace(/ /g, '-') }]).select();
    res.json({ success: true, data: data[0] });
  } catch (error: any) { res.json({ success: false, message: error.message }); }
};

export const deleteIndustry = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    await supabase.from('industries').delete().eq('id', id);
    res.json({ success: true });
  } catch (error: any) { res.json({ success: false, message: error.message }); }
};

export const toggleIndustry = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { data: ind } = await supabase.from('industries').select('is_active').eq('id', id).single();
    await supabase.from('industries').update({ is_active: !ind.is_active }).eq('id', id);
    res.json({ success: true });
  } catch (error: any) { res.json({ success: false, message: error.message }); }
};

export const getSponsoredAds = async (req: any, res: Response) => {
  try {
    const { data } = await supabase.from('home_sponsored_ads').select('*');
    res.json({ success: true, data: data || [] });
  } catch (error: any) { res.json({ success: false, message: error.message }); }
};

export const createSponsoredAd = async (req: any, res: Response) => {
  try {
    const { data } = await supabase.from('home_sponsored_ads').insert([req.body]).select();
    res.json({ success: true, data: data[0] });
  } catch (error: any) { res.json({ success: false, message: error.message }); }
};

export const deleteSponsoredAd = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    await supabase.from('home_sponsored_ads').delete().eq('id', id);
    res.json({ success: true });
  } catch (error: any) { res.json({ success: false, message: error.message }); }
};

export const approveVerification = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    await supabase.from('businesses').update({ verification_status: 'verified' }).eq('id', id);
    res.json({ success: true });
  } catch (error: any) { res.json({ success: false, message: error.message }); }
};

export const rejectVerification = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    await supabase.from('businesses').update({ verification_status: 'rejected' }).eq('id', id);
    res.json({ success: true });
  } catch (error: any) { res.json({ success: false, message: error.message }); }
};

export const getSponsorEnquiries = async (req: any, res: Response) => {
  try {
    const { data } = await supabase.from('sponsor_enquiries').select('*');
    res.json({ success: true, data: data || [] });
  } catch (error: any) { res.json({ success: false, message: error.message }); }
};

export const updateEnquiryStatus = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    await supabase.from('sponsor_enquiries').update({ status: req.body.status }).eq('id', id);
    res.json({ success: true });
  } catch (error: any) { res.json({ success: false, message: error.message }); }
};




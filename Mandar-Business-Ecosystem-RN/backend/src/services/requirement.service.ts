import { generateSlug } from '../utils/slugify';
import { supabase } from "../config/supabase";
import { uploadBase64Image } from "../services/storage.service";

/* CREATE REQUIREMENT */
export const createRequirementService = async (userId: string, data: any) => {
  // Check usage limit first (max 5 active per month)
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const { count, error: countError } = await supabase
    .from('requirements')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', startOfMonth.toISOString());

  if (countError) throw countError;
  if (count && count >= 5) {
    throw new Error('You have reached the maximum monthly limit of 5 requirements. Deleting existing requirements does not restore your quota for this month.');
  }

  let finalImageUrl = data.image_url;
  if (data.base64Image) {
    finalImageUrl = await uploadBase64Image(data.base64Image, 'requirements', `req_${userId}`);
  }

  const { data: requirement, error } = await supabase

    .from("requirements")
    .insert({
      user_id: userId,
      title: data.title,
      description: data.description,
      tags: data.tags || [],
      industries: data.industries || [],
      city: data.city || "",
      state: data.state || "",
      image_url: finalImageUrl || "",
      status: "Active",
      is_approved: true
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return requirement;
};

/* GET MY REQUIREMENTS */
export const getMyRequirementsService = async (userId: string) => {
  const { data, error } = await supabase
    .from("requirements")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

/* GET ALL REQUIREMENTS (LEADS) */
export const getAllRequirementsService = async () => {
  // Fetch active, approved requirements
  const { data: requirements, error } = await supabase
    .from("requirements")
    .select("*")
    .eq("status", "Active")
    .eq("is_approved", true)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  if (!requirements || requirements.length === 0) {
    return [];
  }

  const userIds = [...new Set(requirements.map(req => req.user_id).filter(Boolean))];

  const { data: users } = await supabase.from('users').select('id, full_name').in('id', userIds);
  const { data: businesses } = await supabase.from('businesses').select('id, user_id, business_name').in('user_id', userIds);

  const userMap = users?.reduce((acc: any, u: any) => ({ ...acc, [u.id]: u }), {}) || {};
  const businessMap = businesses?.reduce((acc: any, b: any) => ({ ...acc, [b.user_id]: b }), {}) || {};

  const finalData = requirements.map(req => ({
    ...req,
    users: userMap[req.user_id] || null,
    businesses: businessMap[req.user_id] || null
  }));

  return finalData;
};

/* UPDATE REQUIREMENT */
export const updateRequirementService = async (userId: string, requirementId: string, data: any) => {
  let finalImageUrl = data.image_url;
  if (data.base64Image) {
    finalImageUrl = await uploadBase64Image(data.base64Image, 'requirements', `req_${userId}`);
  }

  const { data: requirement, error } = await supabase
    .from("requirements")
    .update({
      title: data.title,
      description: data.description,
      tags: data.tags || [],
      industries: data.industries || [],
      city: data.city || "",
      state: data.state || "",
      image_url: finalImageUrl || "",
    })
    .eq("id", requirementId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return requirement;
};

/* UPDATE STATUS */
export const updateRequirementStatusService = async (userId: string, requirementId: string, status: string) => {
  const { data, error } = await supabase
    .from("requirements")
    .update({ status })
    .eq("id", requirementId)
    .eq("user_id", userId) // Ensure owner
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

/* DELETE REQUIREMENT */
export const deleteRequirementService = async (userId: string, requirementId: string) => {
  const { error } = await supabase
    .from("requirements")
    .delete()
    .eq("id", requirementId)
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return true;
};

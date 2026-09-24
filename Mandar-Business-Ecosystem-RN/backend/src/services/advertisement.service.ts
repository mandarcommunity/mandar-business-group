// @ts-nocheck
import { generateSlug } from '../utils/slugify';
import { uploadBase64Image } from "./storage.service";
import { supabase } from '../config/supabase';

export const createAdvertisement = async (userId: string, advertisementData: any) => {
  const { data: businessData, error: businessError } = await supabase
    .from('businesses')
    .select('id')
    .eq('user_id', userId)
    .single();

  if (businessError) {
    throw new Error('User does not have a registered business.');
  }

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const { count, error: countError } = await supabase
    .from('advertisements')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', startOfMonth.toISOString());

  if (countError) throw countError;
  if (count && count >= 3) {
    throw new Error('You have reached the maximum monthly limit of 3 advertisements. Deleting existing ads does not restore your quota for this month.');
  }

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 15);

  const slug = generateSlug(advertisementData.title);

  let finalImageUrl = advertisementData.image_url || "";
  if (advertisementData.base64Image) {
    finalImageUrl = await uploadBase64Image(advertisementData.base64Image, 'advertisements', `ad_${userId}`);
  }
  
  const { base64Image, ...cleanData } = advertisementData;

  const { data, error } = await supabase
    .from('advertisements')
    .insert([{
      ...cleanData,
      image_url: finalImageUrl,
      user_id: userId,
      business_id: businessData.id,
      expires_at: expiresAt.toISOString(),
      status: 'Active'
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getMyAdvertisements = async (userId: string) => {
  const { data, error } = await supabase
    .from('advertisements')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getAllAdvertisements = async () => {
  const { data: ads, error } = await supabase
    .from('advertisements')
    .select('*')
    .eq('status', 'Active')
    .gte('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false });

  if (error) throw error;
  if (!ads || ads.length === 0) return ads;

  const userIds = [...new Set(ads.map(ad => ad.user_id).filter(Boolean))];
  const businessIds = [...new Set(ads.map(ad => ad.business_id).filter(Boolean))];

  const { data: users } = await supabase.from('users').select('id, full_name, profile_image').in('id', userIds);
  const { data: businesses } = await supabase.from('businesses').select('id, business_name, profile_image, contact_person').in('id', businessIds);

  const userMap = users?.reduce((acc: any, u: any) => ({ ...acc, [u.id]: u }), {}) || {};
  const businessMap = businesses?.reduce((acc: any, b: any) => ({ ...acc, [b.id]: b }), {}) || {};

  return ads.map(ad => ({
    ...ad,
    users: userMap[ad.user_id] || null,
    businesses: businessMap[ad.business_id] || null
  }));
};

export const getAdvertisementById = async (adId: string) => {
  const { data: ad, error } = await supabase
    .from('advertisements')
    .select('*')
    .eq('id', adId)
    .single();

  if (error) throw error;
  if (!ad) return null;

  const { data: user } = await supabase.from('users').select('full_name, profile_image').eq('id', ad.user_id).single();
  const { data: business } = await supabase.from('businesses').select('business_name, profile_image, contact_person').eq('id', ad.business_id).single();

  return {
    ...ad,
    users: user || null,
    businesses: business || null
  };
};

export const deleteAdvertisement = async (userId: string, id: string) => {
  const { error } = await supabase
    .from('advertisements')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);

  if (error) throw error;
};

export const updateAdvertisementService = async (userId: string, id: string, adData: any) => {
  let finalImageUrl = adData.imageUrl || adData.image_url;
  if (adData.base64Image) {
    finalImageUrl = await uploadBase64Image(adData.base64Image, 'advertisements', `ad_${userId}`);
  }

  const { data, error } = await supabase
    .from('advertisements')
    .update({
      title: adData.title,
      description: adData.description,
      cta_type: adData.ctaType || adData.cta_type,
      image_url: finalImageUrl,
      industries: adData.industries,
      city: adData.city,
      state: adData.state,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const toggleLike = async (userId: string, adId: string) => {
  const { data: existing } = await supabase
    .from('advertisement_likes')
    .select('*')
    .eq('user_id', userId)
    .eq('advertisement_id', adId)
    .single();

  if (existing) {
    const { error } = await supabase
      .from('advertisement_likes')
      .delete()
      .eq('user_id', userId)
      .eq('advertisement_id', adId);
    if (error) throw error;
    return { liked: false };
  } else {
    const { error } = await supabase
      .from('advertisement_likes')
      .insert([{ user_id: userId, advertisement_id: adId }]);
    if (error) throw error;
    return { liked: true };
  }
};

export const getLikesForUser = async (userId: string) => {
  const { data, error } = await supabase
    .from('advertisement_likes')
    .select('advertisement_id')
    .eq('user_id', userId);

  if (error) throw error;
  return data.map(l => l.advertisement_id);
};

export const addComment = async (userId: string, adId: string, comment: string, parentId?: string) => {
  const { data: newComment, error } = await supabase
    .from('advertisement_comments')
    .insert([{
      user_id: userId,
      advertisement_id: adId,
      comment,
      parent_id: parentId || null
    }])
    .select('*')
    .single();

  if (error) throw error;

  const { data: userData } = await supabase
    .from('users')
    .select('full_name, profile_image')
    .eq('id', userId)
    .single();

  return {
    ...newComment,
    users: userData || null
  };
};

export const getComments = async (adId: string) => {
  const { data: comments, error } = await supabase
    .from('advertisement_comments')
    .select('*')
    .eq('advertisement_id', adId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  if (!comments || comments.length === 0) return [];

  const userIds = [...new Set(comments.map(c => c.user_id).filter(Boolean))];

  const { data: users } = await supabase
    .from('users')
    .select('id, full_name, profile_image')
    .in('id', userIds);

  const userMap = users?.reduce((acc: any, u: any) => ({ ...acc, [u.id]: u }), {}) || {};

  return comments.map(c => ({
    ...c,
    users: userMap[c.user_id] || null
  }));
};

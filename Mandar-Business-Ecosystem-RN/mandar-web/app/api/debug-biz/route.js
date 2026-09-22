import { supabase } from '../../../lib/supabase';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data: businesses, error } = await supabase
      .from('businesses')
      .select('id, business_name, slug, profile_image, city, state, verified, industries, description, primary_phone, email, website')
      .order('created_at', { ascending: false });
      
    if (error) {
      return NextResponse.json({ success: false, error: error.message, hint: error.hint });
    }
    
    return NextResponse.json({ 
      success: true, 
      count: businesses?.length || 0,
      businesses: businesses?.slice(0, 5) // Just return a few
    });
  } catch (e) {
    return NextResponse.json({ success: false, error: e.message });
  }
}

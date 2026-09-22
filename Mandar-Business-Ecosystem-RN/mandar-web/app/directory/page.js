export const dynamic = 'force-dynamic';
import { supabase } from '../../lib/supabase';
import DirectoryClient from './DirectoryClient';
import { Suspense } from 'react';

export default async function DirectoryPage() {
  const { data: businesses, error: bizError } = await supabase
    .from('businesses')
    .select('id, business_name, slug, profile_image, city, state, verified, industries, description, contact_person')
    .order('business_name');
    
  const { data: industries, error: indError } = await supabase
    .from('industries')
    .select('*')
    .eq('is_active', true)
    .order('name');
    
  if (bizError) console.error("Error fetching businesses:", bizError);
  if (indError) console.error("Error fetching industries:", indError);

  return <DirectoryClient initialBusinesses={businesses || []} industries={industries || []} />;
}

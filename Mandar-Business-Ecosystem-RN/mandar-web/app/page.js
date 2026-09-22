export const revalidate = 60;
import { supabase } from '../lib/supabase';
import LandingPageClient from '../components/LandingPageClient';

export default async function Home() {
  const { data: industries } = await supabase.from('industries').select('*').eq('is_active', true).order('name');
  // Fetch a few featured businesses for internal linking
  const { data: businesses } = await supabase
    .from('businesses')
    .select('id, business_name, slug, profile_image, city, state, verified')
    .order('created_at', { ascending: false })
    .limit(8);

  return <LandingPageClient businesses={businesses || []} industries={industries || []} />;
}

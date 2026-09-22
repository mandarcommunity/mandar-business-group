export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { supabase } from '../lib/supabase';
import LandingPageClient from '../components/LandingPageClient';

export default async function Home() {
  // Fetch a few featured businesses for internal linking
  const { data: businesses } = await supabase
    .from('businesses')
    .select('id, business_name, slug, profile_image, city, state, verified')
    .order('created_at', { ascending: false })
    .limit(8);

  return <LandingPageClient businesses={businesses || []} />;
}

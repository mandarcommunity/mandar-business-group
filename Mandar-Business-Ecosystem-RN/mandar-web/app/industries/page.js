import { supabase } from '../../lib/supabase';
import IndustriesClient from './IndustriesClient';

export const dynamic = 'force-dynamic';

export default async function IndustriesPage() {
  const { data: industries, error } = await supabase
    .from('industries')
    .select('*')
    .eq('is_active', true)
    .order('name');
    
  if (error) {
    console.error("Error fetching industries:", error);
  }

  return <IndustriesClient initialIndustries={industries || []} />;
}

export const dynamic = 'force-dynamic';
import { supabase } from '../../lib/supabase';
import LeadsClient from './LeadsClient';

export default async function LeadsPage() {
  const { data: requirements, error } = await supabase
    .from('requirements')
    .select('id, slug, title, description, city, state, industries, created_at, status')
    .ilike('status', 'active')
    .order('created_at', { ascending: false });
    
  if (error) console.error("Error fetching leads:", error);

  return <LeadsClient leads={requirements || []} />;
}

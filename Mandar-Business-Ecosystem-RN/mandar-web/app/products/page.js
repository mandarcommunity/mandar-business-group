export const dynamic = 'force-dynamic';
import { supabase } from '../../lib/supabase';
import ProductsClient from './ProductsClient';
import { Suspense } from 'react';

export default async function ProductsPage() {
  const { data: products, error: prodError } = await supabase
    .from('products')
    .select(`
      id, name, description, price, image_url, slug, business_id,
      business:businesses(business_name, city, state, verified, slug, profile_image, industries, contact_person, mobile_number)
    `)
    .order('created_at', { ascending: false });
    
  const { data: industries, error: indError } = await supabase
    .from('industries')
    .select('*')
    .eq('is_active', true)
    .order('name');
    
  if (prodError) console.error("Error fetching products:", prodError);
  if (indError) console.error("Error fetching industries:", indError);

  return (
    <Suspense fallback={<div>Loading catalog...</div>}>
      <ProductsClient initialProducts={products || []} industries={industries || []} />
    </Suspense>
  );
}

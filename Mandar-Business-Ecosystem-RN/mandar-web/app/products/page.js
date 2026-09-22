export const dynamic = 'force-dynamic';
import { supabase } from '../../lib/supabase';
import ProductsClient from './ProductsClient';
import { Suspense } from 'react';

export default async function ProductsPage() {
  const { data: products, error: prodError } = await supabase
    .from('products')
    .select(`
      *, business:businesses(business_name, city, state, verified, slug, profile_image, industries)
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

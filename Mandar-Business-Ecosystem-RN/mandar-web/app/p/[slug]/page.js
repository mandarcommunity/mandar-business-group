import { supabase } from '../../../lib/supabase';
import { Package, ArrowLeft, Tag } from 'lucide-react';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const { slug } = params;
  const { data: product } = await supabase.from('products').select('name, description, images').eq(slug.includes('-') ? 'slug' : 'id', slug).single();
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.name} | Mandar Community`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Mandar Community`,
      description: product.description,
      images: product.images && product.images.length > 0 ? [product.images[0]] : [],
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = params;
  const isId = !slug.includes('-');

  const { data: product } = await supabase
    .from('products')
    .select(`
      *,
      business:businesses(id, slug, business_name, profile_image, city, state, mobile)
    `)
    .eq(isId ? 'id' : 'slug', slug)
    .single();

  if (!product) notFound();

  const business = product.business;
  const mainImage = product.images && product.images.length > 0 ? product.images[0] : null;

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-6">
      <div className="max-w-5xl mx-auto">
        <Link href={`/biz/${business.slug || business.id}`} className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Business
        </Link>
        
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
          {/* Image Gallery Side */}
          <div className="md:w-1/2 bg-gray-100 flex items-center justify-center min-h-[300px]">
            {mainImage ? (
              <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <Package className="w-20 h-20 text-gray-300" />
            )}
          </div>
          
          {/* Details Side */}
          <div className="md:w-1/2 p-8 md:p-10 flex flex-col">
            {product.category && (
              <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-bold w-fit mb-4">
                <Tag className="w-3.5 h-3.5" /> {product.category}
              </div>
            )}
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="prose prose-sm text-gray-600 mb-8 flex-grow whitespace-pre-wrap">
              {product.description || "No description provided."}
            </div>
            
            <div className="pt-6 border-t border-gray-100 mt-auto">
              <p className="text-sm text-gray-500 mb-3">Sold by</p>
              <Link href={`/biz/${business.slug || business.id}`} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
                  {business.profile_image ? (
                    <img src={business.profile_image} alt={business.business_name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl font-bold text-gray-400">{business.business_name.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-secondary transition-colors">{business.business_name}</h3>
                  <p className="text-sm text-gray-500">{business.city}{business.state ? `, ${business.state}` : ''}</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
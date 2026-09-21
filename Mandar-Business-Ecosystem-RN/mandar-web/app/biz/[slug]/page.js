import { supabase } from '../../../lib/supabase';
import { MapPin, Phone, MessageCircle, Briefcase, Factory, Mail, Globe, CheckCircle2, Package } from 'lucide-react';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const { slug } = params;
  
  const { data: business } = await supabase
    .from('businesses')
    .select('business_name, description, profile_image')
    .eq(slug.includes('-') ? 'slug' : 'id', slug)
    .single();

  if (!business) return { title: 'Business Not Found' };

  return {
    title: `${business.business_name} | Mandar Community`,
    description: business.description || `View the profile of ${business.business_name} on the Mandar Community Ecosystem.`,
    openGraph: {
      title: `${business.business_name} | Mandar Community`,
      description: business.description,
      images: business.profile_image && business.profile_image.startsWith("http") ? [business.profile_image] : [],
    },
  };
}

export default async function BusinessProfilePage({ params }) {
  const { slug } = params;
  
  const isId = !slug.includes('-');

  const { data: business } = await supabase
    .from('businesses')
    .select(`
      *,
      user:users!user_id(full_name, mobile, email)
    `)
    .eq(isId ? 'id' : 'slug', slug)
    .single();

  if (!business) {
    notFound();
  }

  // Fetch products
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('business_id', business.id)
    .order('created_at', { ascending: false })
    .limit(10);

  const phone = business.mobile || business.user?.mobile;
  const whatsapp = phone; // Usually the same, but can be customized later

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Cover & Profile Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="h-48 md:h-64 bg-gradient-to-r from-primary to-blue-900 relative">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-6 sm:px-8 pb-8 relative">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end -mt-16 sm:-mt-20 relative z-10">
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-2xl shadow-lg p-2 flex-shrink-0">
              {business.profile_image && business.profile_image.startsWith("http") ? (
                <img src={business.profile_image} alt={business.business_name} className="w-full h-full object-cover rounded-xl" />
              ) : (
                <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center text-primary font-bold text-4xl">
                  {business.business_name.charAt(0)}
                </div>
              )}
            </div>
            
            <div className="flex-grow pt-2 sm:pb-2">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-extrabold text-gray-900">{business.business_name}</h1>
                {business.verified && <CheckCircle2 className="w-6 h-6 text-blue-500 fill-blue-50" />}
              </div>
              <p className="text-gray-600 font-medium text-lg mb-3">by {business.contact_person || business.user?.full_name}</p>
              
              <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-gray-600">
                {(business.city || business.state) && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{business.city}{business.state ? `, ${business.state}` : ''}</span>
                  </div>
                )}
                {business.industries && business.industries.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    <Factory className="w-4 h-4 text-gray-400" />
                    <span>{business.industries.join(', ')}</span>
                  </div>
                )}
                {business.business_types && business.business_types.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    <span>{business.business_types.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="w-full sm:w-auto flex flex-col sm:flex-col gap-3 pt-4 sm:pt-0">
              {phone && (
                <a href={`tel:${phone}`} className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-primary hover:bg-gray-800 text-white px-6 py-2.5 rounded-xl font-bold transition-colors">
                  <Phone className="w-4 h-4" /> Call Now
                </a>
              )}
              {whatsapp && (
                <a href={`https://wa.me/91${whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-2.5 rounded-xl font-bold transition-colors">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - About & Contact */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About the Business</h2>
            {business.description ? (
              <p className="text-gray-600 whitespace-pre-wrap leading-relaxed text-sm">{business.description}</p>
            ) : (
              <p className="text-gray-400 italic text-sm">No description provided.</p>
            )}
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Info</h2>
            <ul className="space-y-4 text-sm">
              {business.email || business.user?.email ? (
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                  <a href={`mailto:${business.email || business.user?.email}`} className="text-blue-600 hover:underline break-all">
                    {business.email || business.user?.email}
                  </a>
                </li>
              ) : null}
              {business.website && (
                <li className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-gray-400 mt-0.5" />
                  <a href={`https://${business.website.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all">
                    {business.website}
                  </a>
                </li>
              )}
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <span className="text-gray-600">
                  {[business.address, business.city, business.state].filter(Boolean).join(', ') || 'Address not provided'}
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Right Column - Products */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Catalog</h2>
          
          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {products.map((product) => (
                <Link href={`/p/${product.slug || product.id}`} key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all group flex flex-col">
                  <div className="h-48 bg-gray-100 relative">
                    {product.images && product.images.length > 0 && product.images[0].startsWith("http") ? (
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <Package className="w-12 h-12" />
                      </div>
                    )}
                    {product.category && (
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800">
                        {product.category}
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-secondary transition-colors line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 flex-grow">{product.description}</p>
                    <div className="mt-4 text-secondary font-bold text-sm">View Details ?</div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">This business hasn't added any products yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
import { supabase } from '../../../lib/supabase';
import { ArrowLeft, MapPin, Phone, Briefcase, Factory, Mail, Globe, CheckCircle2, Package, ArrowRight, Zap, Calendar, TrendingUp } from 'lucide-react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ShareButton from '../../../components/ShareButton';
import BackButton from '../../../components/BackButton';

const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const isUUID = (str) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const isId = isUUID(slug);
  
  const { data: business } = await supabase
    .from('businesses')
    .select('business_name, description, profile_image')
    .eq(isId ? 'id' : 'slug', slug)
    .single();

  if (!business) return { title: 'Business Not Found' };

  return {
    title: `${business.business_name} | Official Website`,
    description: business.description || `Welcome to the official business page of ${business.business_name}.`,
    openGraph: {
      title: `${business.business_name} | Official Website`,
      description: business.description,
      images: business.profile_image && business.profile_image.startsWith("http") ? [business.profile_image] : [],
    },
  };
}

export default async function BusinessProfilePage({ params }) {
  const { slug } = await params;
  const isId = isUUID(slug);

  const { data: business } = await supabase
    .from('businesses')
    .select(`*, user:users!user_id(full_name, mobile, email)`)
    .eq(isId ? 'id' : 'slug', slug)
    .single();

  if (!business) notFound();

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('business_id', business.id);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Cover Area */}
      <div className="bg-blue-600 pt-6 pb-24 px-4 relative">
        <div className="max-w-3xl mx-auto flex justify-between items-center text-white">
          <BackButton />
          <ShareButton 
            title={business.business_name} 
            text={`Check out ${business.business_name} on Mandar Community`} 
            url={`https://mandarcommunity.in/biz/${business.slug || business.id}`} 
          />
        </div>
      </div>

      {/* Profile Card */}
      <div className="max-w-3xl mx-auto px-4 -mt-16">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-2xl font-bold text-gray-400 overflow-hidden shrink-0 border-4 border-white shadow-sm">
              {business.profile_image ? (
                <img src={business.profile_image} alt={business.business_name} className="w-full h-full object-cover" />
              ) : (
                business.business_name.charAt(0)
              )}
            </div>
            <div className="flex-1 pt-2">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900">{business.business_name}</h1>
                {business.verification_status === 'verified' && (
                  <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                )}
              </div>
              <p className="text-gray-500 mt-1">{business.city}, {business.state}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {business.industries?.map((ind, i) => (
              <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
                {ind}
              </span>
            ))}
          </div>

          {business.description && (
            <div className="mt-6 text-gray-600 leading-relaxed whitespace-pre-wrap">
              {business.description}
            </div>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div className="max-w-3xl mx-auto px-4 mt-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 text-gray-600">
              <Briefcase className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Owner / Contact Person</p>
                <p>{business.contact_person || business.user?.full_name}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 text-gray-600">
              <Phone className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">Phone</p>
                <p>{business.mobile || business.user?.mobile}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-gray-600">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Address</p>
                <p>{business.address ? `${business.address}, ` : ''}{business.city}, {business.state}</p>
              </div>
            </div>

            {business.website && (
              <div className="flex items-start gap-3 text-gray-600">
                <Globe className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Website</p>
                  <a href={business.website.startsWith('http') ? business.website : `https://${business.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {business.website}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Products/Services (If Any) */}
      {products && products.length > 0 && (
        <div className="max-w-3xl mx-auto px-4 mt-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-gray-900" />
              <h2 className="text-lg font-semibold text-gray-900">Products & Services</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {products.map((product) => (
                <div key={product.id} className="border border-gray-100 rounded-lg p-3 flex gap-3">
                  <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                    {product.images && product.images[0] ? (
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <Package className="w-6 h-6 text-gray-300" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{product.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fixed Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 md:hidden z-10">
        <div className="flex gap-3 max-w-3xl mx-auto">
          <a 
            href={`tel:${business.mobile || business.user?.mobile}`}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-gray-200 text-gray-700 font-medium"
          >
            <Phone className="w-4 h-4" /> Call
          </a>
          <a 
            href={`https://wa.me/91${(business.mobile || business.user?.mobile || '').replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(business.business_name)}%2C%20I%20found%20your%20business%20on%20Mandar%20Community.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-[#25D366] text-white font-medium"
          >
            <WhatsAppIcon className="w-4 h-4" /> WhatsApp
          </a>
        </div>
      </div>
      
      {/* Desktop Action Buttons */}
      <div className="hidden md:flex justify-center gap-4 max-w-3xl mx-auto mt-6">
        <a 
          href={`tel:${business.mobile || business.user?.mobile}`}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
        >
          <Phone className="w-4 h-4" /> Call Business
        </a>
        <a 
          href={`https://wa.me/91${(business.mobile || business.user?.mobile || '').replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(business.business_name)}%2C%20I%20found%20your%20business%20on%20Mandar%20Community.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#25D366] text-white font-medium hover:bg-[#20bd5a] transition-colors"
        >
          <WhatsAppIcon className="w-5 h-5" /> Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}

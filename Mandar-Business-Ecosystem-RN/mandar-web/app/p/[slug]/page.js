import { supabase } from '../../../lib/supabase';
import { Package, Tag, MessageCircle, Phone, ArrowRight, ShieldCheck, Truck, BadgeCheck, MapPin } from 'lucide-react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import BackButton from '../../../components/BackButton';
import ShareButton from '../../../components/ShareButton';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data: product } = await supabase.from('products').select('name, description, images').eq(slug.includes('-') ? 'slug' : 'id', slug).single();
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.name} | Mandar Community`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Mandar Community`,
      description: product.description,
      images: product.images && product.images.length > 0 && product.images[0].startsWith("http") ? [product.images[0]] : [],
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const isId = !slug.includes('-');

  const { data: product } = await supabase
    .from('products')
    .select(`
      *,
      business:businesses(id, slug, business_name, profile_image, city, state, mobile, verified, user:users!user_id(mobile))
    `)
    .eq(isId ? 'id' : 'slug', slug)
    .single();

  if (!product) notFound();

  const business = product.business;
  const mainImage = product.images && product.images.length > 0 && product.images[0].startsWith("http") ? product.images[0] : null;

  // Phone calculation
  const phone = business.mobile || business.user?.mobile;
  const whatsappMsg = `Hi, I came across your product '${product.name}' on Mandar Community and wanted to enquire about it.`;
  const whatsappUrl = phone ? `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMsg)}` : null;

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Mini Header */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 sticky top-0 z-50 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton />
          <div className="hidden sm:flex items-center gap-2 text-sm font-semibold text-gray-500">
            <Link href="/directory" className="hover:text-blue-600 transition-colors">Directory</Link>
            <span className="text-gray-300">/</span>
            <Link href={`/biz/${business.slug || business.id}`} className="hover:text-blue-600 transition-colors max-w-[120px] truncate">{business.business_name}</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 truncate max-w-[150px]">{product.name}</span>
          </div>
        </div>
        <ShareButton title={product.name} text={`Check out ${product.name} on Mandar Community Ecosystem`} />
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-10">
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row mb-12">
          
          {/* Left: Product Image */}
          <div className="md:w-1/2 bg-gray-100 flex items-center justify-center min-h-[400px] md:min-h-[600px] relative">
            {mainImage ? (
              <img src={mainImage} alt={product.name} className="w-full h-full object-cover absolute inset-0" />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400">
                <Package className="w-24 h-24 mb-4 opacity-50" />
                <span className="font-medium text-lg">No image available</span>
              </div>
            )}
            {product.category && (
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold text-gray-800 shadow-sm flex items-center gap-2">
                <Tag className="w-4 h-4 text-blue-600" /> {product.category}
              </div>
            )}
          </div>

          {/* Right: Product Details & Actions */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
            <Link href={`/biz/${business.slug || business.id}`} className="flex items-center gap-3 mb-6 p-3 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-colors group w-max border border-gray-100">
              <div className="w-10 h-10 bg-white rounded-full border border-gray-200 overflow-hidden flex items-center justify-center shadow-sm">
                {business.profile_image ? (
                  <img src={business.profile_image} alt={business.business_name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400 font-bold text-lg">{business.business_name.charAt(0)}</span>
                )}
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Sold By</p>
                <div className="flex items-center gap-1">
                  <p className="text-sm font-bold text-gray-900 group-hover:text-blue-700">{business.business_name}</p>
                  {business.verified && <BadgeCheck className="w-3.5 h-3.5 text-blue-600" />}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>

            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
              {product.name}
            </h1>

            {product.price && (
              <div className="mb-8">
                <span className="text-4xl font-extrabold text-blue-600 tracking-tight">?{product.price}</span>
                {product.unit && <span className="text-gray-500 font-medium ml-2">/ {product.unit}</span>}
              </div>
            )}

            <div className="prose prose-gray max-w-none mb-10">
              <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">{product.description || "No description provided for this product."}</p>
            </div>

            <div className="mt-auto space-y-4">
              {whatsappUrl && (
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="w-full bg-[#25D366] hover:bg-[#1ebd5a] text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-colors shadow-sm shadow-[#25d366]/30">
                  <MessageCircle className="w-6 h-6" /> Enquire on WhatsApp
                </a>
              )}
              {phone && (
                <a href={`tel:${phone}`} className="w-full bg-slate-900 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-colors shadow-sm">
                  <Phone className="w-6 h-6" /> Call Supplier
                </a>
              )}
              {!phone && (
                <div className="w-full bg-gray-100 text-gray-500 py-4 rounded-2xl font-bold text-lg flex items-center justify-center text-center">
                  Contact info not available
                </div>
              )}
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-100 grid grid-cols-2 gap-4">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0"><ShieldCheck className="w-5 h-5"/></div>
                 <p className="text-xs font-bold text-gray-600 leading-tight">Direct<br/>Supplier</p>
               </div>
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><MapPin className="w-5 h-5"/></div>
                 <p className="text-xs font-bold text-gray-600 leading-tight">Located in<br/>{business.city || 'India'}</p>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}